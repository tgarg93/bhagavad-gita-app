// Shared shapes for the immersive "Gita-style" reading experience, reused by
// festivals, deities, and philosophy concepts. NarrativeSection mirrors the
// philosophy ConceptSection shape (philosophyAndTeachings.ts re-exports an
// alias) so existing Dharma content is already valid NarrativeSection[].
//
// Pure types: no imports, safe to require from anywhere.

export interface NarrativeVerse {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  // Citation locator, e.g. "Bhagavad Gita 2.47" or "Devi Mahatmya 1.75" —
  // optional because pre-existing content predates the sources requirement.
  source?: string;
}

export interface NarrativeSection {
  id: string;
  title: string;
  subtitle?: string;
  openingVerse?: NarrativeVerse;
  storyText?: string;
  sectionHeader?: string;
  keyVerse?: NarrativeVerse;
  teachingText?: string;
}

// A human-readable SOURCES entry rendered at the foot of seed content.
// Every story or claim in seed content traces to one of these.
export interface SourceNote {
  text: string; // "Bhagavata Purana"
  locator: string; // "Canto 10, Chapters 1–4"
  translation?: string; // translation consulted, e.g. "Prabhupada / wisdomlib.org"
  url?: string;
}
