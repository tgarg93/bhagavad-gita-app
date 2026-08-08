// Turn an extracted section into the exact text a clip should speak.
//
// Field order mirrors the readers so the sentence-highlight stays in sync:
//   Foundations (buildFoundationsSegments): takeaway → storyText → bullets → teachingText
//   Ramayana   (storyBeats):                openingVerse-meaning → storyText → teachingText
// Then: strip **markdown**, drop "» Speaker:" dialogue prefixes (spoken line
// only), and apply the shared pronunciation dictionary.

import { applyPronunciation } from './pronunciation.mjs';

const stripMarkdown = (s) => s.replace(/\*\*/g, '').replace(/\*/g, '');

// "» Valmiki: Is there a man…" → "Is there a man…"
const stripSpeech = (s) =>
  s
    .split('\n')
    .map((line) => {
      const t = line.trimStart();
      if (!t.startsWith('»')) return line;
      const rest = t.slice(1).trimStart();
      const colon = rest.indexOf(':');
      return colon > 0 && colon < 40 ? rest.slice(colon + 1).trim() : rest;
    })
    .join('\n');

export function assembleClipText(section, mode) {
  const parts = [];
  if (mode === 'ramayana') {
    if (section.openingVerseMeaning) parts.push(section.openingVerseMeaning);
    if (section.storyText) parts.push(stripSpeech(section.storyText));
    if (section.teachingText) parts.push(section.teachingText);
  } else {
    if (section.takeaway) parts.push(section.takeaway);
    if (section.storyText) parts.push(section.storyText);
    if (section.bullets) parts.push(...section.bullets);
    if (section.teachingText) parts.push(section.teachingText);
  }
  const clean = stripMarkdown(parts.join('\n\n'));
  return applyPronunciation(clean); // { text, unmapped }
}

// The Foundations capstone recap clip (f-capstone-recap) narrates every banked
// takeaway, in order — the app assembles this at runtime (allTakeaways), so the
// static section's bullets are empty. Rebuild it here from the same rule
// (isBankedCard = has takeaway && banked !== false).
export function assembleCapstoneRecap(allSections) {
  const takeaways = allSections
    .filter((s) => s.takeaway && s.banked !== false)
    .map((s) => s.takeaway);
  return applyPronunciation(stripMarkdown(takeaways.join('\n\n')));
}

// A section should get a clip if it has narratable text and isn't a silent waypoint.
export function isNarratable(section, mode) {
  if (section.kind === 'waypoint') return false;
  const { text } = assembleClipText(section, mode);
  return text.trim().length > 0;
}
