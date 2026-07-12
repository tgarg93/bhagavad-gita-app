import * as Speech from 'expo-speech';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    events: { onStart: () => void; onDone: () => void; onError: (error: unknown) => void }
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
      // staysActiveInBackground is intentionally off — it requires a UIBackgroundModes
      // entitlement this app doesn't have and makes the whole call reject.
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
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

  async pauseNarration(): Promise<void> {
    this.isPaused = true;
    this.currentSegmentStartedAt = null;
    if (this.speechId) {
      await this.backend.stop();
      this.speechId = null;
    }
  }

  async resumeNarration(): Promise<void> {
    if (this.isPaused && this.isActive) {
      this.isPaused = false;
      await this.playNextSegment();
    }
  }

  async stopNarration(): Promise<void> {
    this.isActive = false;
    this.isPaused = false;
    this.currentIndex = 0;
    this.currentSegmentStartedAt = null;
    if (this.speechId) {
      await this.backend.stop();
      this.speechId = null;
    }
  }

  async setSpeed(newSpeed: number): Promise<void> {
    this.speed = Math.max(0.5, Math.min(2.0, newSpeed));
    await this.saveSettings();

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

    setTimeout(() => {
      this.playNextSegment();
    }, pauseMs);
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
        }
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