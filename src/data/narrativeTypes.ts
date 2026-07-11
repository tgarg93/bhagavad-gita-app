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
  // Bulleted list rendered after storyText — for enumerations of 3+ items.
  // Items support the same inline **bold** markers as prose.
  bullets?: string[];
  sectionHeader?: string;
  keyVerse?: NarrativeVerse;
  teachingText?: string;
  // One-line footnote for this section's claims, rendered at the foot of the
  // page ("Shiva Purana, Rudra Samhita · tr. wisdomlib.org")
  citation?: string;
  // In-app destination for the citation, in the permanent content-ref form
  // ('gita:2' | 'concept:karma' | 'deity:krishna' | 'festival:janmashtami').
  // When set, the footnote becomes tappable (routeForContentRef resolves it).
  citationLink?: string;
}

// A human-readable SOURCES entry rendered at the foot of seed content.
// Every story or claim in seed content traces to one of these.
export interface SourceNote {
  text: string; // "Bhagavata Purana"
  locator: string; // "Canto 10, Chapters 1–4"
  translation?: string; // translation consulted, e.g. "Prabhupada / wisdomlib.org"
  url?: string;
  // In-app destination when this source's text exists in the app, in the same
  // content-ref form as NarrativeSection.citationLink (e.g. 'gita:2')
  appLink?: string;
}
