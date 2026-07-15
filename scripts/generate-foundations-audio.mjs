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
// first, a beat, then its BODY (including on-screen bullets, read as a list) —
// verbatim with what's on screen and in reading order, so the sentence highlight
// lines up. Sanskrit is spelled phonetically so the voice says it rather than
// stumbling. Mirrors docs/foundations-narration-script.md (teaching-voice rewrite).
//
// `<break time="0.9s" />` tags insert real silence so each idea lands — they are
// sent to the API but never spoken. Keep them ≤ ~1s and few per clip; overuse
// destabilizes the voice. Template literals (not '') so apostrophes and the tags'
// double quotes both survive untouched.
const SCRIPTS = {
  'f-name-no-founder':
    `Hinduism has no founder, no single book, and no one in charge. <break time="0.9s" /> Let's start with what Hinduism is not. Think of Christianity (Jesus), Islam (Muhammad), or Buddhism (the Buddha) — each has a founder you can name. <break time="0.6s" /> Hinduism has none. Nobody started it. Instead, many local traditions grew up side by side across India over more than three thousand years. Only much later were they gathered under one name — mostly by outsiders, to keep things simple. <break time="0.6s" /> So what you're left with is: no founder, no single person who began it; <break time="0.4s" /> no one holy book, a whole library instead; <break time="0.4s" /> and no central authority — nobody decides what counts as correct.`,
  'f-name-river':
    `Even the name isn't its own — it's a river, mispronounced. <break time="0.9s" /> So where did the word Hindu even come from? Not from Hindus. It began as the name of a river. <break time="0.6s" /> In Sanskrit, the great river to the northwest was called the Sindhu. Persians living west of it couldn't pronounce the S and said Hindu instead — they just meant the people over there, past the river. Later, the Greeks dropped the H too. <break time="0.6s" /> That single river-name became three words we still use: Hindu, India, and Indus. For most of history, Hindu pointed to a place — not a religion.`,
  'f-name-sanatana':
    `The name it gives itself is Sanatana Dharma — the eternal way. <break time="0.9s" /> If outsiders supplied the word Hindu, what do followers call it themselves? Sanatana Dharma — usually translated as the eternal way. <break time="0.6s" /> The idea behind the name: this isn't a club you sign up for. It's more like a natural order that was always here and always will be — something you wake up to and live by, not something you join. <break time="0.6s" /> That's also why there's no founder. Nobody invents the sunrise; you just notice it.`,
  'f-name-sanskrit':
    `An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. <break time="0.9s" /> But it still had to be passed down somehow. For centuries there was no book to keep it in — writing wasn't used for it yet. <break time="0.6s" /> So how did it survive? People memorized it, word for word, and recited it aloud — one generation teaching the next. The language they used is Sanskrit — Samskrita, meaning put together properly. <break time="0.6s" /> It was practically built for the ear: exact rhythm, so a wrong word breaks the beat; <break time="0.4s" /> exact pitch, fixed for every syllable; <break time="0.4s" /> and repetition woven in as a backup. <break time="0.6s" /> The result: two reciters a thousand miles apart would land on the very same syllable. These spoken texts are the Vedas — chanted for centuries before anyone finally wrote them down.`,
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
