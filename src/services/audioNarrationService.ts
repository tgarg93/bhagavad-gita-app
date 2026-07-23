import * as Speech from 'expo-speech';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stripInlineMarkup } from '../components/RichText';

export interface TextSegment {
  id: string;
  text: string;
  type: 'sanskrit' | 'transliteration' | 'meaning' | 'story' | 'teaching' | 'title';
  blockId: string; // Identifies the rendered text block this segment belongs to (e.g. 'section-3-story')
  localStart: number; // Offset of this segment within its block's text
  localEnd: number;
  startIndex: number;
  endIndex: number;
  duration?: number; // Estimated in milliseconds
}

export interface NarrationState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSegmentIndex: number;
  currentSegmentId: string | null;
  progress: number; // 0-100, duration-weighted
  speed: number; // 0.5 - 2.0
  totalSegments: number;
  elapsedMs: number; // estimated elapsed narration time
  totalMs: number; // estimated total narration time
}

export interface NarrationCallbacks {
  onSegmentStart: (segmentId: string, segmentIndex: number) => void;
  onSegmentEnd: (segmentId: string) => void;
  onProgressUpdate: (progress: number) => void;
  onPlaybackComplete: () => void;
  onError: (error: string) => void;
}

const NARRATION_SPEED_KEY = 'narration_speed';
const DEFAULT_SPEED = 1.0;

// Deliberate silence between pages/sections (finished page stays, then turns and
// the next page begins). Users found back-to-back pages too abrupt. One knob for
// both the prerecorded (Foundations read-along) and TTS paths.
const INTER_SECTION_PAUSE_MS = 1500;

// The section a segment belongs to, from its `section-N-...` id. Used to detect a
// page boundary so the inter-section pause only lands when crossing sections.
const sectionOf = (id: string): string | null => {
  const m = id.match(/section-(\d+)/);
  return m ? m[1] : null;
};

// --- TTS backend seam ---------------------------------------------------
// The player logic talks only to this interface, so a cloud TTS backend
// (ElevenLabs/Google TTS + audio file playback) can replace the system
// synthesizer without touching segment/queue/highlight handling.
export interface TTSSpeakOptions {
  language: string;
  pitch: number;
  rate: number;
  voice?: string;
}

export interface TTSBackend {
  speak(
    text: string,
    options: TTSSpeakOptions,
    events: { onStart: () => void; onDone: () => void; onError: (error: unknown) => void },
    // Identifies which segment is speaking. TTS ignores it; the pre-recorded
    // backend uses it to pick the clip.
    segmentId?: string
  ): Promise<void>;
  stop(): Promise<void>;
}

class SystemTTSBackend implements TTSBackend {
  async speak(
    text: string,
    options: TTSSpeakOptions,
    events: { onStart: () => void; onDone: () => void; onError: (error: unknown) => void }
  ): Promise<void> {
    await Speech.speak(text, {
      ...options,
      onStart: events.onStart,
      onDone: events.onDone,
      onError: events.onError,
    });
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}

// One section of pre-recorded narration: its clip, and the ordered sentence
// segments whose concatenated text the clip speaks.
interface PrerecordedSection {
  sectionIndex: number;
  clip: number;
  segments: TextSegment[];
  totalChars: number;
}

// Plays a bundled clip per section and drives the sentence highlight from real
// playback position — no per-word timestamps needed. As position crosses each
// sentence's proportional share of the clip (by character length), it fires
// onSegmentStart, so the highlight follows and the page turns (the first segment
// of a section carries the section index the screen scrolls to). Approximate,
// and it self-corrects every status tick, so drift can't accumulate.
class PrerecordedController {
  private sound: Audio.Sound | null = null;
  private sections: PrerecordedSection[] = [];
  private pos = 0; // index into `sections`
  private curSeg = -1;
  private durationMs = 0;
  private lastPositionMs = 0; // latest reported position, so a relative seek has a solid base
  private callbacks: NarrationCallbacks | null = null;
  private active = false;
  private paused = false;
  // Bumped whenever the current clip changes (new section, stop). A status
  // callback carries the token of the sound it was registered for, so a
  // trailing tick from a swapped-out or already-unloaded sound is ignored —
  // otherwise it could run after `pos` moves past the last section and
  // dereference an out-of-range section.
  private token = 0;

  configure(sections: PrerecordedSection[], callbacks: NarrationCallbacks) {
    this.sections = sections;
    this.callbacks = callbacks;
  }

  async start(fromSectionIndex: number): Promise<void> {
    this.active = true;
    this.paused = false;
    const at = this.sections.findIndex(s => s.sectionIndex === fromSectionIndex);
    this.pos = at >= 0 ? at : 0;
    await this.playCurrent();
  }

  private async playCurrent(): Promise<void> {
    if (!this.active) return;
    if (this.pos >= this.sections.length) {
      // Reached the end: tear down the finished clip (its status callback would
      // otherwise fire one more tick against an out-of-range section) before
      // reporting completion.
      this.active = false;
      await this.unload();
      this.callbacks?.onPlaybackComplete();
      return;
    }
    const sec = this.sections[this.pos];
    this.curSeg = -1;
    this.durationMs = 0;
    this.lastPositionMs = 0;
    await this.unload();
    const myToken = ++this.token;
    try {
      const { sound, status } = await Audio.Sound.createAsync(sec.clip, {
        // Respect a standing pause: a rewind (-10s) that crosses back into the
        // previous card while paused must load it without auto-playing, or the
        // screen's play/pause icon desyncs. Every other caller has cleared
        // `paused` before it wants sound, so this is `true` for them.
        shouldPlay: !this.paused,
        progressUpdateIntervalMillis: 120,
      });
      this.sound = sound;
      let dur = status.isLoaded && status.durationMillis ? status.durationMillis : 0;
      // durationMillis is frequently absent on createAsync's initial status (the file
      // isn't parsed yet), and until it's known onStatus can't map position → sentence,
      // so the highlight freezes on the first line. Fetch it up front (resolves in a
      // tick or two) so advancement is deterministic instead of racing the clip's load.
      for (let tries = 0; !dur && this.token === myToken && tries < 12; tries++) {
        await new Promise((r) => setTimeout(r, 40));
        const s = await sound.getStatusAsync();
        if (s.isLoaded && s.durationMillis) dur = s.durationMillis;
      }
      if (this.token !== myToken) return; // clip was swapped out while we polled
      this.durationMs = dur;
      this.fireSegment(0); // highlight + page scroll for the section's first sentence
      sound.setOnPlaybackStatusUpdate((st) => this.onStatus(st, myToken));
    } catch {
      this.callbacks?.onError('Could not play narration clip');
      this.advanceSection();
    }
  }

  private onStatus(st: any, token: number): void {
    // Drop callbacks from a swapped-out sound, or any that arrive after we've
    // stopped or run off the end of the sections.
    if (token !== this.token || !this.active || this.pos >= this.sections.length) return;
    if (!st?.isLoaded) {
      if (st?.error) this.callbacks?.onError(String(st.error));
      return;
    }
    if (this.durationMs === 0 && st.durationMillis) this.durationMs = st.durationMillis;
    if (st.didJustFinish) {
      this.advanceSection();
      return;
    }
    if (this.paused || this.durationMs === 0) return;
    if (typeof st.positionMillis === 'number') this.lastPositionMs = st.positionMillis;
    const frac = Math.min(1, st.positionMillis / this.durationMs);
    const target = this.segAtFraction(frac);
    if (target !== this.curSeg) this.fireSegment(target);
  }

  private segAtFraction(frac: number): number {
    const sec = this.sections[this.pos];
    if (!sec) return 0;
    const targetChars = frac * sec.totalChars;
    let cum = 0;
    for (let k = 0; k < sec.segments.length; k++) {
      cum += sec.segments[k].text.length;
      if (targetChars < cum) return k;
    }
    return sec.segments.length - 1;
  }

  private fireSegment(k: number): void {
    this.curSeg = k;
    const seg = this.sections[this.pos]?.segments[k];
    if (seg) this.callbacks?.onSegmentStart(seg.id, k);
  }

  private advanceSection(): void {
    // Signal that the section that just finished has ended, BEFORE moving on.
    // The screen uses this (onSegmentEnd) to PARK the voice on a following check
    // or waypoint page instead of rolling past it — the TTS path fires the same
    // callback; without this the pre-recorded read-along would auto-scroll past a
    // quiz. Pass the section's LAST segment id so the screen's section-boundary
    // guard matches (the ids are the same objects it built its map from).
    const finished = this.sections[this.pos];
    if (finished && finished.segments.length) {
      this.callbacks?.onSegmentEnd(finished.segments[finished.segments.length - 1].id);
    }
    this.pos++;
    this.callbacks?.onProgressUpdate((this.pos / Math.max(1, this.sections.length)) * 100);
    if (this.pos >= this.sections.length) {
      // End of act — no inter-page pause; playCurrent handles teardown + onPlaybackComplete.
      this.playCurrent();
      return;
    }
    // The screen parked us: onSegmentEnd synchronously called pauseNarration (which
    // sets this.paused before its first await), so hold here — don't load the next
    // clip. Tear down the finished clip and bump the token so a resume starts the
    // next section fresh via playCurrent, rather than replaying the just-ended clip
    // (a playAsync at end-position can immediately re-fire didJustFinish → double-advance).
    if (this.paused) {
      this.token++;
      this.unload();
      return;
    }
    // Hold a beat of silence on the finished page before the next clip loads and
    // the page turns. Bump the token so any late status tick from the clip we just
    // finished is dropped, and re-check active/paused/token when the timer fires so
    // a stop/seek/pause during the gap wins.
    const myToken = ++this.token;
    setTimeout(() => {
      if (!this.active || this.paused || this.token !== myToken) return;
      this.playCurrent();
    }, INTER_SECTION_PAUSE_MS);
  }

  async pause(): Promise<void> {
    this.paused = true;
    if (this.sound) await this.sound.pauseAsync().catch(() => {});
  }

  async resume(): Promise<void> {
    this.paused = false;
    // Resuming during the inter-section gap: no clip is loaded yet, so kick off the
    // next section's clip instead of trying to play a sound that isn't there.
    if (!this.sound && this.active && this.pos < this.sections.length) {
      await this.playCurrent();
      return;
    }
    if (this.sound) await this.sound.playAsync().catch(() => {});
  }

  async stop(): Promise<void> {
    this.active = false;
    this.paused = false;
    this.pos = 0;
    this.curSeg = -1;
    this.token++; // invalidate any in-flight status callback
    await this.unload();
  }

  async seekToSection(sectionIndex: number): Promise<void> {
    const idx = this.sections.findIndex(s => s.sectionIndex === sectionIndex);
    if (idx < 0) return;
    this.pos = idx;
    this.active = true;
    // This is a user-driven "play this section" (e.g. Continue off a parked check),
    // so clear any lingering pause — mirroring start(). Without this the section
    // plays with paused stale-true: the highlight freezes and advanceSection's
    // park-teardown misfires at the clip's end, stranding playback on the card.
    this.paused = false;
    await this.playCurrent();
  }

  async seekRelative(deltaMs: number): Promise<void> {
    if (!this.sound || this.durationMs === 0) return;
    const st = await this.sound.getStatusAsync();
    if (!st.isLoaded) return;
    // Base the jump on the last position we actually saw tick by. A fresh status read
    // can come back with positionMillis === 0 mid-playback, which would turn a +10s
    // jump into an absolute seek to 10s — snapping the highlight back near the top.
    const base = this.lastPositionMs || (typeof st.positionMillis === 'number' ? st.positionMillis : 0);
    // Rewinding past the top of this card steps back to the previous card (from its
    // start), so -10s can walk back through the reading instead of dead-ending at 0.
    // playCurrent's fireSegment(0) scrolls the reader there and respects the pause.
    if (base + deltaMs < 0 && this.pos > 0) {
      this.pos--;
      await this.playCurrent();
      return;
    }
    const to = Math.max(0, Math.min(this.durationMs - 1, base + deltaMs));
    await this.sound.setPositionAsync(to).catch(() => {});
    this.lastPositionMs = to;
    // setPositionAsync can leave iOS playback stalled and the next status tick can
    // report the pre-seek (or a zeroed) position, which would snap the highlight back
    // to the first sentence. Re-assert playback and move the highlight to the seek
    // target now, instead of waiting on a tick that may not reflect the seek.
    if (!this.paused) await this.sound.playAsync().catch(() => {});
    const target = this.segAtFraction(Math.min(1, to / this.durationMs));
    if (target !== this.curSeg) this.fireSegment(target);
  }

  private async unload(): Promise<void> {
    const sound = this.sound;
    this.sound = null;
    if (sound) {
      try {
        sound.setOnPlaybackStatusUpdate(null); // no queued callback can land after this
      } catch {}
      try {
        await sound.stopAsync();
      } catch {}
      try {
        await sound.unloadAsync();
      } catch {}
    }
  }
}

export class AudioNarrationService {
  private static instance: AudioNarrationService;
  private segments: TextSegment[] = [];
  private currentIndex: number = 0;
  private isActive: boolean = false;
  private isPaused: boolean = false;
  private callbacks: NarrationCallbacks | null = null;
  private speed: number = DEFAULT_SPEED;
  private speechId: string | null = null;
  private backend: TTSBackend = new SystemTTSBackend();
  private currentSegmentStartedAt: number | null = null;
  // Pre-recorded narration (Foundations audio) runs through its own controller;
  // `mode` routes the shared transport (pause/resume/stop/seek) to the right one.
  private prerec = new PrerecordedController();
  private mode: 'tts' | 'prerecorded' = 'tts';

  private constructor() {
    this.loadSettings();
  }

  static getInstance(): AudioNarrationService {
    if (!AudioNarrationService.instance) {
      AudioNarrationService.instance = new AudioNarrationService();
    }
    return AudioNarrationService.instance;
  }

  private sessionActivated = false;

  async initialize() {
    try {
      // Configure the audio session so TTS plays even with the iOS silent switch on.
      // staysActiveInBackground keeps narration going when the app is backgrounded /
      // the phone locks / it's on car Bluetooth. It REQUIRES the `UIBackgroundModes:
      // audio` entitlement (ios/Dharma/Info.plist + app.config.js) — without it this
      // whole call rejects, so the two must ship in the same build.
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.warn('Error configuring audio session:', error);
      this.callbacks?.onError('Could not configure audio output');
    }

    // setAudioModeAsync only CONFIGURES the session; iOS activates it when
    // expo-av actually plays something. expo-speech (AVSpeechSynthesizer)
    // never triggers that activation, so on device the mute switch silences
    // narration. Playing a brief silent sound once activates the Playback
    // session, after which speech ignores the silent switch.
    if (!this.sessionActivated) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/audio/silence.wav'),
          { shouldPlay: true, volume: 0 }
        );
        this.sessionActivated = true;
        setTimeout(() => {
          sound.unloadAsync().catch(() => {});
        }, 300);
        console.log('[narration] audio session activated');
      } catch (error) {
        // Never block narration on this — worst case is today's behavior
        console.warn('[narration] audio session activation failed:', error);
      }
    }
  }

  private async loadSettings() {
    try {
      const savedSpeed = await AsyncStorage.getItem(NARRATION_SPEED_KEY);
      if (savedSpeed) {
        this.speed = parseFloat(savedSpeed);
      }
    } catch (error) {
      console.log('Error loading narration settings:', error);
    }
  }

  private async saveSettings() {
    try {
      await AsyncStorage.setItem(NARRATION_SPEED_KEY, this.speed.toString());
    } catch (error) {
      console.log('Error saving narration settings:', error);
    }
  }

  parseContentIntoSegments(content: any[]): TextSegment[] {
    const segments: TextSegment[] = [];
    let globalIndex = 0;

    // A block is one rendered piece of text (a whole title, verse line, or paragraph).
    // Single-segment blocks span their full text; multi-sentence blocks get real
    // offsets within the block so the UI can highlight the current sentence.
    const pushBlock = (blockId: string, text: string, type: TextSegment['type']) => {
      if (!text || !text.trim()) return; // skip empty segments (e.g. blank transliteration)
      segments.push({
        id: blockId,
        blockId,
        text,
        type,
        localStart: 0,
        localEnd: text.length,
        startIndex: globalIndex,
        endIndex: globalIndex + text.length,
        duration: this.estimateReadingTime(text, type)
      });
      globalIndex += text.length + 1;
    };

    const pushSentences = (blockId: string, text: string, type: TextSegment['type']) => {
      if (!text || !text.trim()) return; // skip empty prose (e.g. dialogue-beat storyText, index 1)
      const sentences = this.splitIntoSentences(text);
      let cursor = 0;
      sentences.forEach((sentence, sentenceIndex) => {
        const localStart = text.indexOf(sentence, cursor);
        const start = localStart >= 0 ? localStart : cursor;
        cursor = start + sentence.length;
        segments.push({
          id: `${blockId}-${sentenceIndex}`,
          blockId,
          text: sentence,
          type,
          localStart: start,
          localEnd: start + sentence.length,
          startIndex: globalIndex,
          endIndex: globalIndex + sentence.length,
          duration: this.estimateReadingTime(sentence, type)
        });
        globalIndex += sentence.length + 1;
      });
    };

    // Sections are { title?: string, blocks: GitaBlock[] } — see src/data/bhagavadGitaContent.ts
    content.forEach((section, sectionIndex) => {
      if (!section) return; // tolerate undefined/null entries (e.g. sparse scripture fields)
      if (section.title) {
        pushBlock(`section-${sectionIndex}-title`, section.title, 'title');
      }

      (section.blocks || []).forEach((block: any, blockIndex: number) => {
        const blockId = `section-${sectionIndex}-block-${blockIndex}`;
        switch (block.type) {
          case 'header':
            pushBlock(blockId, block.text, 'title');
            break;
          case 'verse':
            pushBlock(`${blockId}-sanskrit`, block.verse.sanskrit, 'sanskrit');
            pushBlock(`${blockId}-transliteration`, block.verse.transliteration, 'transliteration');
            pushBlock(`${blockId}-meaning`, block.verse.meaning, 'meaning');
            break;
          case 'prose':
            pushSentences(blockId, block.text, 'story');
            break;
          case 'teaching':
            pushSentences(blockId, block.text, 'teaching');
            break;
        }
      });
    });

    return segments;
  }

  private splitIntoSentences(text: string): string[] {
    // Split by sentence boundaries but keep natural flow
    return text
      .split(/(?<=[.!?])\s+/)
      .filter(sentence => sentence.trim().length > 0)
      .map(sentence => sentence.trim());
  }

  private estimateReadingTime(text: string, type: string): number {
    const baseWPM = 150; // Words per minute for natural speech
    const typeMultipliers = {
      'sanskrit': 0.6, // Slower for Sanskrit pronunciation
      'transliteration': 0.8, // Moderate for phonetic reading
      'meaning': 1.0, // Normal speed for English
      'story': 1.1, // Slightly faster for narrative flow
      'teaching': 0.9, // Thoughtful pace for wisdom
      'title': 0.7 // Slower for emphasis
    };

    const words = text.split(' ').length;
    const multiplier = typeMultipliers[type as keyof typeof typeMultipliers] || 1.0;
    const adjustedWPM = baseWPM * multiplier * this.speed;
    
    return Math.max((words / adjustedWPM) * 60 * 1000, 1000); // Minimum 1 second
  }

  async startNarration(
    content: any[], 
    callbacks: NarrationCallbacks,
    startFromIndex: number = 0
  ): Promise<void> {
    try {
      await this.initialize();

      this.mode = 'tts';
      this.segments = this.parseContentIntoSegments(content);
      this.callbacks = callbacks;
      this.currentIndex = startFromIndex;
      this.isActive = true;
      this.isPaused = false;

      await this.playNextSegment();
    } catch (error) {
      console.log('Error starting narration:', error);
      this.callbacks?.onError('Failed to start audio narration');
    }
  }

  // Foundations narration segments: takeaway sentence(s), then storyText, then
  // any bullets, per section, in reading order. Block ids `section-{i}-takeaway`
  // / `section-{i}-story` match FoundationCard's TextHighlighter blocks; the
  // concatenated text is exactly what a section's clip speaks, which is what
  // lets the pre-recorded controller map playback position to a sentence.
  // Each bullet is its own block `section-{i}-bullet-{j}`, matching the per-bullet
  // Prose in FoundationCard, so bullets highlight in turn as the clip reads them
  // (and their characters count toward the clip's totalChars, so the story
  // highlight before them isn't stretched by the bullet audio).
  buildFoundationsSegments(sections: { kind?: string; takeaway?: string; storyText?: string; bullets?: string[]; teachingText?: string }[]): TextSegment[] {
    const out: TextSegment[] = [];
    sections.forEach((section, i) => {
      // Waypoint checkpoints carry no narration — the reader parks the voice on
      // them (see ContentReaderScreen) and no clip will ever be recorded.
      if (section.kind === 'waypoint') return;
      const pushBlock = (suffix: string, raw?: string) => {
        if (!raw) return;
        const blockId = `section-${i}-${suffix}`;
        const text = stripInlineMarkup(raw);
        const sentences = this.splitIntoSentences(text);
        let cursor = 0;
        sentences.forEach((sentence, k) => {
          const found = text.indexOf(sentence, cursor);
          const start = found >= 0 ? found : cursor;
          cursor = start + sentence.length;
          out.push({
            id: `${blockId}-${k}`,
            blockId,
            text: sentence,
            type: 'story',
            localStart: start,
            localEnd: start + sentence.length,
            startIndex: 0,
            endIndex: 0,
            duration: this.estimateReadingTime(sentence, 'story'),
          });
        });
      };
      pushBlock('takeaway', section.takeaway);
      pushBlock('story', section.storyText);
      section.bullets?.forEach((b, j) => pushBlock(`bullet-${j}`, b));
      // Post-verse prose (the inline-keyVerse convention: storyText before the
      // verse, teachingText after it). The clips speak it — f-living-hard
      // always did — so the highlight must cover it too.
      pushBlock('teaching', section.teachingText);
    });
    return out;
  }

  // Pre-recorded narration for a Foundations act: one bundled clip per section,
  // with the sentence highlight driven from real playback position (see
  // PrerecordedController). `foundationsSegments` come from
  // buildFoundationsSegments; `clipsBySection` maps a section INDEX to its clip.
  async startPrerecorded(
    foundationsSegments: TextSegment[],
    clipsBySection: Record<number, number>,
    callbacks: NarrationCallbacks,
    fromSectionIndex: number = 0
  ): Promise<void> {
    try {
      await this.initialize();
      this.mode = 'prerecorded';

      const bySection = new Map<number, TextSegment[]>();
      for (const seg of foundationsSegments) {
        const m = seg.blockId.match(/^section-(\d+)-/);
        if (!m) continue;
        const si = parseInt(m[1], 10);
        if (clipsBySection[si] == null) continue; // only sections that have a clip
        if (!bySection.has(si)) bySection.set(si, []);
        bySection.get(si)!.push(seg);
      }
      const sections: PrerecordedSection[] = [...bySection.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([sectionIndex, segments]) => ({
          sectionIndex,
          clip: clipsBySection[sectionIndex],
          segments,
          totalChars: segments.reduce((n, s) => n + s.text.length, 0) || 1,
        }));

      this.callbacks = callbacks;
      this.isActive = true;
      this.isPaused = false;
      this.prerec.configure(sections, callbacks);
      await this.prerec.start(fromSectionIndex);
    } catch (error) {
      console.log('Error starting pre-recorded narration:', error);
      this.callbacks?.onError('Failed to start audio narration');
    }
  }

  async pauseNarration(): Promise<void> {
    this.isPaused = true;
    if (this.mode === 'prerecorded') {
      await this.prerec.pause();
      return;
    }
    this.currentSegmentStartedAt = null;
    if (this.speechId) {
      await this.backend.stop();
      this.speechId = null;
    }
  }

  async resumeNarration(): Promise<void> {
    if (!this.isActive || !this.isPaused) return;
    this.isPaused = false;
    if (this.mode === 'prerecorded') {
      await this.prerec.resume();
      return;
    }
    await this.playNextSegment();
  }

  // Jump the pre-recorded narration to a whole section (used by page-skip).
  async seekToSection(sectionIndex: number): Promise<void> {
    if (this.mode !== 'prerecorded') return;
    this.isActive = true;
    this.isPaused = false;
    await this.prerec.seekToSection(sectionIndex);
  }

  // ±seconds within the current pre-recorded clip.
  async prerecSeekRelative(deltaMs: number): Promise<void> {
    if (this.mode !== 'prerecorded') return;
    await this.prerec.seekRelative(deltaMs);
  }

  async stopNarration(): Promise<void> {
    this.isActive = false;
    this.isPaused = false;
    this.currentIndex = 0;
    this.currentSegmentStartedAt = null;
    if (this.mode === 'prerecorded') {
      await this.prerec.stop();
      return;
    }
    if (this.speechId) {
      await this.backend.stop();
      this.speechId = null;
    }
  }

  async setSpeed(newSpeed: number): Promise<void> {
    this.speed = Math.max(0.5, Math.min(2.0, newSpeed));
    await this.saveSettings();

    // Pre-recorded clips play at their recorded rate; only TTS restarts here.
    if (this.mode === 'prerecorded') return;
    // If currently playing, restart current segment with new speed
    if (this.isActive && !this.isPaused) {
      await this.backend.stop();
      setTimeout(() => this.playCurrentSegment(), 100);
    }
  }

  private async playNextSegment(): Promise<void> {
    if (!this.isActive || this.isPaused || this.currentIndex >= this.segments.length) {
      if (this.currentIndex >= this.segments.length) {
        this.callbacks?.onPlaybackComplete();
      }
      return;
    }

    await this.playCurrentSegment();
  }

  private advanceToNextSegment(segment: TextSegment, pauseMs: number): void {
    this.callbacks?.onSegmentEnd(segment.id);
    this.currentIndex++;

    const progress = (this.currentIndex / this.segments.length) * 100;
    this.callbacks?.onProgressUpdate(progress);

    // Crossing into a new section is a page turn — give it at least the deliberate
    // inter-section beat, but keep a naturally longer type pause if one applies.
    const next = this.segments[this.currentIndex];
    const crossingSection = !!next && sectionOf(segment.id) !== sectionOf(next.id);
    const delay = crossingSection ? Math.max(pauseMs, INTER_SECTION_PAUSE_MS) : pauseMs;

    setTimeout(() => {
      this.playNextSegment();
    }, delay);
  }

  private async playCurrentSegment(): Promise<void> {
    const segment = this.segments[this.currentIndex];
    if (!segment) return;

    try {
      const voice = await this.getBestVoice(segment.type);

      // Devanagari text needs a Hindi voice — if none is installed the utterance
      // would be silent, so skip straight to the transliteration/meaning instead
      if (segment.type === 'sanskrit' && !voice) {
        this.advanceToNextSegment(segment, 0);
        return;
      }

      this.callbacks?.onSegmentStart(segment.id, this.currentIndex);

      await this.backend.speak(
        segment.text,
        {
          language: this.getSpeechLanguage(segment.type),
          pitch: this.getSpeechPitch(segment.type),
          rate: this.getSpeechRate(segment.type),
          voice,
        },
        {
          onStart: () => {
            this.speechId = segment.id;
            this.currentSegmentStartedAt = Date.now();
          },
          onDone: () => {
            if (!this.isActive || this.isPaused) return; // stopped/paused mid-utterance
            this.currentSegmentStartedAt = null;
            this.advanceToNextSegment(segment, this.getPauseDuration(segment.type));
          },
          onError: (error) => {
            console.warn('Speech error:', error);
            // Keep the narration moving rather than stalling on one bad segment
            if (this.isActive && !this.isPaused) {
              this.currentSegmentStartedAt = null;
              this.advanceToNextSegment(segment, 300);
            }
          },
        },
        segment.id
      );
    } catch (error) {
      console.warn('Error playing segment:', error);
      this.callbacks?.onError('Failed to play audio segment');
    }
  }

  private getSpeechLanguage(type: string): string {
    // Indian English for narration, Hindi for Devanagari verses
    return type === 'sanskrit' ? 'hi-IN' : 'en-IN';
  }

  // Token guarding one-off sequences: stopSpeaking() and every new sequence
  // invalidate any in-flight chain. Required, not defensive — expo-speech fires
  // no onDone on interrupt, but an onDone racing the stop must not resurrect
  // the next segment of a stopped sequence.
  private onceToken = 0;

  // Unconditional stop for one-off utterances — speakOnce/speakSequence don't
  // go through the segment queue, so stopNarration's speechId guard never
  // fires for them
  async stopSpeaking(): Promise<void> {
    this.onceToken++;
    await this.backend.stop();
  }

  // One-off utterance outside the segment queue (e.g. a Daily Chai body).
  // Uses the same session activation and voice preference as full narration.
  async speakOnce(text: string, onDone?: () => void): Promise<void> {
    await this.speakSequence([{ text }], onDone);
  }

  // One-off multi-part utterance (e.g. the Daily Chai word card: Devanagari in
  // the Hindi voice, then the meaning in English). Segments default to the
  // 'meaning' (English-India) voice; 'sanskrit' segments use the Hindi voice
  // and are skipped when no Hindi voice is installed, mirroring the queue
  // player's guard. onDone fires only when the sequence completes on its own.
  async speakSequence(
    segments: { text: string; type?: TextSegment['type'] }[],
    onDone?: () => void
  ): Promise<void> {
    await this.initialize();
    await this.backend.stop();
    const token = ++this.onceToken;
    const playFrom = async (i: number): Promise<void> => {
      if (token !== this.onceToken) return; // stopped or superseded
      if (i >= segments.length) {
        onDone?.();
        return;
      }
      const seg = segments[i];
      const type = seg.type ?? 'meaning';
      const voice = await this.getBestVoice(type);
      if (type === 'sanskrit' && !voice) {
        await playFrom(i + 1);
        return;
      }
      if (token !== this.onceToken) return;
      await this.backend.speak(
        seg.text,
        {
          language: this.getSpeechLanguage(type),
          pitch: this.getSpeechPitch(type),
          rate: this.getSpeechRate(type),
          voice,
        },
        {
          onStart: () => {},
          onDone: () => {
            void playFrom(i + 1);
          },
          onError: () => {
            void playFrom(i + 1);
          },
        }
      );
    };
    await playFrom(0);
  }

  private getSpeechPitch(type: string): number {
    const pitchMap = {
      'sanskrit': 0.95, // Slightly lower for reverence
      'transliteration': 1.0,
      'meaning': 1.0,
      'story': 1.0,
      'teaching': 0.98,
      'title': 0.95 // Slightly lower for emphasis
    };
    return pitchMap[type as keyof typeof pitchMap] || 1.0;
  }

  private getSpeechRate(type: string): number {
    // 1.0 is the synthesizer's natural rate; only verses slow down noticeably
    const rateMap = {
      'sanskrit': 0.75, // Slower for Sanskrit pronunciation
      'transliteration': 0.8,
      'meaning': 0.9,
      'story': 0.97, // Near-natural storytelling pace
      'teaching': 0.92,
      'title': 0.85
    };
    const rate = this.speed * (rateMap[type as keyof typeof rateMap] || 0.95);
    return Math.max(0.1, Math.min(1.5, rate));
  }

  private availableVoices: Speech.Voice[] | null = null;
  private voiceCache: { [key: string]: string | undefined } = {};

  // Voice preference: Indian voices first, higher quality first.
  // en-IN (Rishi/Isha on iOS) pronounces Indian names and Sanskrit-derived
  // terms far better than the default en-US compact voice.
  private async getBestVoice(type: string): Promise<string | undefined> {
    const cacheKey = type === 'sanskrit' ? 'sanskrit' : 'english';
    if (cacheKey in this.voiceCache) {
      return this.voiceCache[cacheKey];
    }

    try {
      if (!this.availableVoices) {
        this.availableVoices = await Speech.getAvailableVoicesAsync();
      }
      const voices = this.availableVoices;
      const isEnhanced = (v: Speech.Voice) =>
        v.quality === Speech.VoiceQuality.Enhanced ||
        /enhanced|premium|natural/i.test(v.name || '');
      const lang = (v: Speech.Voice) => (v.language || '').toLowerCase().replace('_', '-');

      let best: Speech.Voice | undefined;
      if (cacheKey === 'sanskrit') {
        const hindi = voices.filter(v => lang(v).startsWith('hi'));
        best = hindi.find(isEnhanced) || hindi[0]; // undefined → segment is skipped
      } else {
        const score = (v: Speech.Voice): number => {
          const l = lang(v);
          if (!l.startsWith('en')) return Infinity;
          const langScore = l.startsWith('en-in') ? 0 : 10; // Indian English strongly preferred
          const qualityScore = isEnhanced(v) ? 0 : 5;
          const tieBreak = l.startsWith('en-gb') ? 1 : l.startsWith('en-us') ? 2 : 3;
          return langScore + qualityScore + (langScore === 0 ? 0 : tieBreak);
        };
        best = [...voices].sort((a, b) => score(a) - score(b)).find(v => score(v) !== Infinity);
      }

      this.voiceCache[cacheKey] = best?.identifier;
      console.log(
        `[narration] voice for ${cacheKey}:`,
        best ? `${best.name} (${best.language}, ${best.quality || 'Default'})` : 'none available'
      );
      return best?.identifier;
    } catch (error) {
      console.log('Error getting voices:', error);
      return undefined;
    }
  }

  private getPauseDuration(type: string): number {
    // Natural pauses between different content types
    const pauseMap = {
      'sanskrit': 1000, // 1 second after Sanskrit
      'transliteration': 500, // Short pause
      'meaning': 1500, // Longer pause after meaning
      'story': 800, // Natural storytelling pause
      'teaching': 1200, // Thoughtful pause
      'title': 1500 // Longer pause after titles
    };
    return pauseMap[type as keyof typeof pauseMap] || 800;
  }

  getCurrentState(): NarrationState {
    const totalMs = this.getEstimatedTotalDuration();
    const elapsedMs = this.getElapsedDuration();
    return {
      isPlaying: this.isActive && !this.isPaused,
      isPaused: this.isPaused,
      currentSegmentIndex: this.currentIndex,
      currentSegmentId: this.segments[this.currentIndex]?.id || null,
      progress: totalMs > 0 ? (elapsedMs / totalMs) * 100 : 0,
      speed: this.speed,
      totalSegments: this.segments.length,
      elapsedMs,
      totalMs,
    };
  }

  getCurrentSegment(): TextSegment | null {
    return this.segments[this.currentIndex] || null;
  }

  async seekToSegment(segmentIndex: number): Promise<void> {
    if (segmentIndex < 0 || segmentIndex >= this.segments.length) return;
    const wasPlaying = this.isActive && !this.isPaused;
    this.currentSegmentStartedAt = null;
    await this.backend.stop();
    this.currentIndex = segmentIndex;
    this.callbacks?.onProgressUpdate((this.currentIndex / this.segments.length) * 100);
    if (wasPlaying) {
      await this.playCurrentSegment();
    }
  }

  // Seek to a position expressed as a fraction (0-1) of the estimated total duration
  async seekToProgress(ratio: number): Promise<void> {
    const total = this.getEstimatedTotalDuration();
    if (total <= 0 || this.segments.length === 0) return;
    const targetMs = Math.max(0, Math.min(1, ratio)) * total;
    let cumulative = 0;
    let targetIndex = this.segments.length - 1;
    for (let i = 0; i < this.segments.length; i++) {
      cumulative += this.segments[i].duration || 0;
      if (cumulative >= targetMs) {
        targetIndex = i;
        break;
      }
    }
    await this.seekToSegment(targetIndex);
  }

  async skipForward(): Promise<void> {
    if (this.currentIndex < this.segments.length - 1) {
      this.currentSegmentStartedAt = null;
      await this.backend.stop();
      this.currentIndex++;
      if (this.isActive && !this.isPaused) {
        await this.playCurrentSegment();
      }
    }
  }

  async skipBackward(): Promise<void> {
    if (this.currentIndex > 0) {
      this.currentSegmentStartedAt = null;
      await this.backend.stop();
      this.currentIndex = Math.max(0, this.currentIndex - 1);
      if (this.isActive && !this.isPaused) {
        await this.playCurrentSegment();
      }
    }
  }

  getEstimatedTotalDuration(): number {
    return this.segments.reduce((total, segment) => total + (segment.duration || 0), 0);
  }

  // Elapsed narration time in ms: completed segments plus (when playing) the
  // time spent inside the current segment, capped at its estimated duration
  getElapsedDuration(): number {
    const completed = this.segments
      .slice(0, this.currentIndex)
      .reduce((total, segment) => total + (segment.duration || 0), 0);
    const current = this.segments[this.currentIndex];
    let within = 0;
    if (current && this.currentSegmentStartedAt && this.isActive && !this.isPaused) {
      within = Math.min(Date.now() - this.currentSegmentStartedAt, current.duration || 0);
    }
    return completed + within;
  }

  // Clean up resources
  async cleanup(): Promise<void> {
    await this.stopNarration();
    this.callbacks = null;
    this.segments = [];
  }
}

export default AudioNarrationService;