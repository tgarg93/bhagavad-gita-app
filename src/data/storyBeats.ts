// Dialogue-aware story formatting.
//
// A story `storyText` can be written as a sequence of paragraphs (split on a
// blank line). A paragraph that begins with the marker `»` is a SPOKEN line and
// renders as a set-apart speech block (saffron tick + speaker label + italic
// line); every other paragraph is narration prose. This lets the dialogue-heavy
// Upanishad tales (Nachiketa↔Yama, Svetaketu↔Uddalaka) read as a conversation
// instead of a wall of text.
//
// The SAME parser drives BOTH the on-screen renderer (NarrativeSections) and the
// audio-narration block builder (sectionsToNarrationContent), so read-along
// highlighting can never drift from what's rendered — the two used to share a
// hand-kept "fixed block positions" convention; now they share this function.
//
// `»` (U+00BB) is deliberate: it never begins real prose, and unlike a straight
// apostrophe it is safe inside a single-quoted TS string.

export interface StoryBeat {
  kind: 'narration' | 'speech';
  speaker?: string; // speech only; omitted for an unattributed spoken line
  text: string; // clean line (marker + "Speaker:" stripped); may carry **bold**/*italic*
}

const SPEECH_MARKER = '»';

// storyText renders as dialogue beats only when it actually contains a spoken
// line. Plain multi-paragraph prose keeps the legacy single-block render (RN
// <Text> already honors the \n\n paragraph breaks), so all existing content is
// untouched — only stories authored with `»` take the beat path.
export const hasStoryBeats = (storyText?: string): boolean =>
  !!storyText && storyText.includes(SPEECH_MARKER);

// storyText beats occupy narration/render block indices starting HERE, appended
// after the six fixed blocks (0 verse, 1 storyText, 2 bullets, 3 header,
// 4 keyVerse, 5 teaching). Keeping them past the fixed range means the load-
// bearing positional convention for the other blocks is never disturbed.
export const DIALOGUE_BLOCK_BASE = 6;

export const parseStoryBeats = (storyText: string): StoryBeat[] =>
  storyText
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
    .map((para): StoryBeat => {
      if (!para.startsWith(SPEECH_MARKER)) return { kind: 'narration', text: para };
      const rest = para.slice(SPEECH_MARKER.length).trim();
      // Optional "Speaker: line" — the speaker is a short label before the first
      // colon (no sentence punctuation), so a colon inside the line itself is safe.
      const m = rest.match(/^([^:.!?]{1,32}):\s*([\s\S]+)$/);
      return m
        ? { kind: 'speech', speaker: m[1].trim(), text: m[2].trim() }
        : { kind: 'speech', text: rest };
    });
