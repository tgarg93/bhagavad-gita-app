// Shared shapes for the immersive "Gita-style" reading experience, reused by
// festivals, deities, and philosophy concepts. NarrativeSection mirrors the
// philosophy ConceptSection shape (philosophyAndTeachings.ts re-exports an
// alias) so existing Dharma content is already valid NarrativeSection[].
//
// Pure types (checkTypes is itself import-free), safe to require from anywhere.

import { KnowledgeCheck } from './checkTypes';

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

  // ——— Bite-sized card mode (Foundations). All optional: existing content that
  // sets none of these renders exactly as before, through NarrativeSections. ———

  // The one line the reader banks from this page. When present, the reader
  // renders the section as a card (takeaway first, short body under it) rather
  // than as a prose section. Act summaries replay these, so each must stand
  // alone as a sentence someone could say out loud, out of context.
  takeaway?: string;
  // "Go deeper" — an invitation into existing long-form content, in the same
  // permanent content-ref form as citationLink ('concept:maya'). Distinct from
  // citation/citationLink, which are provenance rather than an invitation.
  deeper?: { ref: string; label: string };
  // Checks that fire as their own pages immediately AFTER this section's page.
  // This is the interleaving mechanism — see ContentReaderScreen's page builder.
  checks?: KnowledgeCheck[];
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
