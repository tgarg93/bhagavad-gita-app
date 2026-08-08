// Batch-generate ElevenLabs narration for the Foundations course.
//
// Text is DERIVED from src/data/foundations.ts (no more hand-maintained copy):
// each non-waypoint section's takeaway + storyText + bullets + teachingText, in
// the same order the reader narrates (buildFoundationsSegments), **markdown**
// stripped, and Sanskrit terms respelled via scripts/lib/pronunciation.mjs.
// This guarantees the audio always matches the on-screen text (no highlight
// drift) and keeps pronunciation consistent with the Ramayana reader.
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs            # all
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs f-wheel    # ids containing "f-wheel"
//   node scripts/generate-foundations-audio.mjs --dry-run [filter]                   # write derived text; NO API, NO credits
//
// One MP3 per section id, into assets/audio/foundations/ (bundled via
// src/data/foundationsAudioManifest.ts). Re-running overwrites, so iterate freely.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { extractSections } from './lib/extract-sections.mjs';
import { assembleClipText, assembleCapstoneRecap, isNarratable } from './lib/assemble.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'assets', 'audio', 'foundations');
const DATA = join(__dirname, '..', 'src', 'data', 'foundations.ts');

const VOICE_ID = 'L1aJrPa7pLJEyYlh3Ilq'; // Oliver — clean, British, steady
const MODEL_ID = 'eleven_v3';
const OUTPUT_FORMAT = 'mp3_44100_128';
const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 1.0, use_speaker_boost: true };

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const filter = args.find((a) => !a.startsWith('--'));

const all = extractSections(DATA);
const entries = all
  .filter((s) => isNarratable(s, 'foundations'))
  .filter((s) => !filter || s.id.includes(filter))
  .map((s) => ({ id: s.id, ...assembleClipText(s, 'foundations') }));

// f-capstone-recap is assembled at runtime from every banked takeaway, so it
// isn't in the narratable set above — rebuild it from the same rule.
if (!filter || 'f-capstone-recap'.includes(filter)) {
  entries.push({ id: 'f-capstone-recap', ...assembleCapstoneRecap(all) });
}

if (entries.length === 0) {
  console.error(`No narratable sections match "${filter}".`);
  process.exit(1);
}

// Surface capitalized terms not in the pronunciation dict — verify each is
// English, otherwise add a respelling before spending credits.
const unmapped = new Set();
entries.forEach((e) => e.unmapped.forEach((w) => unmapped.add(w)));
if (unmapped.size) {
  console.log(`Terms not in the pronunciation dict (confirm English, else add to scripts/lib/pronunciation.mjs):\n  ${[...unmapped].sort().join(', ')}\n`);
}

if (dryRun) {
  const outFile = join(__dirname, '..', 'foundations-clips.dryrun.txt');
  writeFileSync(outFile, entries.map((e) => `===== ${e.id} =====\n${e.text}`).join('\n\n'));
  console.log(`DRY RUN: ${entries.length} clip texts → ${outFile}  (no API call, no credits)`);
  process.exit(0);
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY. Run:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs');
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });
console.log(`Generating ${entries.length} clip(s)${filter ? ` matching "${filter}"` : ''} with voice ${VOICE_ID}…\n`);

for (const { id, text } of entries) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  });
  if (!res.ok) {
    console.error(`✗ ${id}: ${res.status} ${res.statusText}\n${await res.text()}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(join(OUT_DIR, `${id}.mp3`), buf);
  console.log(`✓ ${id}.mp3  (${(buf.length / 1024).toFixed(0)} KB)`);
}
console.log(`\nDone. ${entries.length} clips in assets/audio/foundations/.`);
