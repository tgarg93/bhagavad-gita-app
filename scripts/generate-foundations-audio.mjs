// Batch-generate ElevenLabs narration for the Foundations course.
//
// One MP3 per section (keyed by the section's stable id), written into
// assets/audio/foundations/. The app bundles those and plays one per reader
// page — see src/data/foundationsAudioManifest.ts.
//
// Run it yourself (it uses YOUR key and bills YOUR account):
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs
//
// Re-running overwrites the files, so it's safe to iterate on the voice.
// Scoped to Act 1 for now; add more sections to SCRIPTS to extend.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'assets', 'audio', 'foundations');

// The voice you chose (Oliver — Clean, British and Steady).
const VOICE_ID = 'L1aJrPa7pLJEyYlh3Ilq';

// Match the read you liked in the sample (sp100 · s100 · sb100 · se45 · v2).
// Tweak here and re-run to re-record everything in one go.
const MODEL_ID = 'eleven_multilingual_v2'; // handles the phonetic Sanskrit terms best
const OUTPUT_FORMAT = 'mp3_44100_128'; // 128 kbps mono — same as your sample, good for bundling
const VOICE_SETTINGS = {
  stability: 1.0,
  similarity_boost: 1.0,
  style: 0.45,
  use_speaker_boost: true,
  speed: 1.0,
};

// Act 1 — "What Hinduism Is". id → the narration script: the card's TAKEAWAY
// first, a beat, then its BODY — verbatim with what's on screen and in reading
// order, so the sentence highlight lines up. Sanskrit is spelled phonetically so
// the voice says it rather than stumbling. Mirrors docs/foundations-narration-script.md.
const SCRIPTS = {
  'f-name-no-founder':
    'Hinduism has no founder, no single book, and nobody in charge. Start with what it is not. Every other major religion can name the person who started it; this one cannot, because nobody did. It is a family of traditions that grew up alongside one another over three thousand years and were filed under a single name much later — largely by outsiders, for their own convenience.',
  'f-name-river':
    'Even the name is not its own. It is a river, mispronounced. Those outsiders named it after water. Sanskrit called the great river the Sindhu; Persians to the west could not manage the S and said Hindu, meaning simply the people over there. The Greeks then dropped the H. Hindu, India and Indus are one word — and for most of history it named a place, not a faith.',
  'f-name-sanatana':
    'The name it gives itself is Sanatana Dharma — the eternal way. Strip off what strangers called it and this is underneath. Not a religion you sign up to, but an order that was always here and will still be here: something you notice rather than join. Which explains the missing founder — nobody founds the weather.',
  'f-name-sanskrit':
    'An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. For centuries there was no page to keep it on. Samskrita means refined, perfected: a language engineered for the ear, with exact metre, exact pitch and redundancy deliberately built in, so that two reciters a thousand miles apart still land on the same syllable. The Vedas were chanted long before anyone wrote them down.',
};

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY. Run:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const entries = Object.entries(SCRIPTS);
console.log(`Generating ${entries.length} clips with voice ${VOICE_ID}…\n`);

for (const [id, text] of entries) {
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
  const file = join(OUT_DIR, `${id}.mp3`);
  writeFileSync(file, buf);
  console.log(`✓ ${id}.mp3  (${(buf.length / 1024).toFixed(0)} KB)`);
}

console.log(`\nDone. ${entries.length} clips in assets/audio/foundations/.`);
