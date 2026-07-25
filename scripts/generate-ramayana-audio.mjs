// Batch-generate ElevenLabs narration for the Ramayana (Oliver voice).
//
// One MP3 per section (keyed by the section's stable id), written into
// assets/audio/ramayana/. The app bundles those and plays one per reader page
// via src/data/scriptureAudioManifest.ts — same pipeline as the Foundations
// read-along (see scripts/generate-foundations-audio.mjs).
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs         # all
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs bala    # just Bala Kanda
//
// Re-running overwrites the files, so it's safe to iterate on the voice.
//
// Text is TRANSFORMED FROM THE ON-SCREEN PROSE (scriptureTexts.ts), kept verbatim
// with the page so the sentence-highlight stays in sync: **bold** markup stripped,
// » dialogue read as the spoken line only, openingVerse read as its English meaning
// (not chanted), and tricky Sanskrit names respelled phonetically (v3's fallback,
// like the Foundations "Maaya"), since Oliver is a British reader.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'assets', 'audio', 'ramayana');

// The same preferred voice as Foundations (Oliver — clean, British, steady).
const VOICE_ID = 'L1aJrPa7pLJEyYlh3Ilq';
const MODEL_ID = 'eleven_v3';
const OUTPUT_FORMAT = 'mp3_44100_128';
const VOICE_SETTINGS = {
  stability: 0.5, // "Natural"
  similarity_boost: 1.0,
  use_speaker_boost: true,
};

// Pilot: Bala Kanda (Book 1). Ids match scriptureTexts.ts section ids exactly.
const SCRIPTS = {
  'bala-preface':
    `[warmly] The Rah-MAH-yuh-nuh is one of India's two great epics, and for millions of people it is the very first story they ever learn. It follows Rama, a prince of Ah-YOHD-yuh — a kingdom in northern India — through a wedding, a sudden exile, the kidnapping of his wife, and a long war to win her back.\n\nThis first book is the Bala Kanda, the Book of Childhood. It is the origin story: how the poem itself came to be written, how Rama came to be born at all, and the day he won his wife, Sita. We will follow the events as the poet Vaal-MEE-kee tells them… stopping now and then to notice what they mean.`,

  'bala-question':
    `[thoughtful] Who in this world today is truly good and truly strong — one who knows what is right, remembers every kindness, speaks only truth, and holds firm to his vows?\n\nThe whole epic begins not with a battle but with a question. A poet named Vaal-MEE-kee asks a wandering sage named NAH-ruh-duh whether a truly good person exists anywhere in the world.\n\nIs there a man alive who is genuinely good — brave and truthful and kind all at once, and unshakable?\n\nNAH-ruh-duh did not hesitate.\n\nThere is. His name is Rama, of the house of Ick-SHVAH-koo.\n\n[warmly] Everything that follows is the poem trying to show what that one name means… once a real life has to carry it.`,

  'bala-birthless-poem':
    `Soon after, Vaal-MEE-kee was walking beside a river when a hunter shot down one of a pair of birds in the middle of their courtship. The surviving bird's cry of grief cut straight through him, and to his own surprise his grief came back out of his mouth already shaped into rhythm — the first SHLOH-kuh, a verse couplet, ever spoken.\n\nThen the creator-god BRAH-mah appeared before him.\n\n[gently] That meter came to you for a reason. Now use it. Tell the whole story of Rama.\n\nThe Sanskrit keeps the two words a breath apart: grief is SHOH-kuh… and the verse it turned into is SHLOH-kuh.`,

  'bala-why-start':
    `[thoughtful] It is worth pausing on how the epic opens. Not with a hero, but with a longing: someone asking out loud whether goodness this complete is even possible. And not with triumph, but with grief. The poem admits that its very first note came from refusing to look away from one small creature's death. Before Rama lifts a finger, we have already been told what kind of story this is going to be.`,

  'bala-term-adikavya':
    `The key word here is AH-dee KAAV-yuh — the first poem. [short pause]\n\nBecause of that morning by the river, the Rah-MAH-yuh-nuh is called the AH-dee KAAV-yuh, the first poem: not the oldest story ever told, but the first one composed as deliberate poetry, in the SHLOH-kuh meter that grief handed to Vaal-MEE-kee.`,

  'bala-birth':
    `Far to the north, in Ah-YOHD-yuh, King Duh-shuh-RUT-huh had everything a ruler could want except the one thing he wanted most: a child. At last he performed the poo-truh-kuh-MESH-tee — a great fire-sacrifice for a son — and out of the flames rose a shining figure holding a bowl of sacred PAH-yuh-sum, a sweet rice pudding, for his queens to share.\n\nAt that very moment, far away, the gods were desperate. A demon-king named RAH-vuh-nuh had grown unstoppable, and they went to Vishnu, the god who preserves the world, for help.\n\nRAH-vuh-nuh torments all three worlds, and the boon he holds has made him deaf to any fear. Only you can end this.\n\n[resolute] Then I will go down myself, and be born as a man.\n\nSo when Duh-shuh-RUT-huh's queens drank the PAH-yuh-sum, it was Vishnu himself quietly entering the world. Rama was born… along with his three brothers.`,

  'bala-blindspot':
    `[thoughtful] Here is the hinge the whole epic turns on. RAH-vuh-nuh's boon had made him untouchable by gods and demons, but in his pride he had never bothered to include humans on the list. Why fear something so small? That single blind spot is why God comes down through the one door left open, born as an ordinary man. Pride tends to guard against its equals… and forget about the ordinary.`,

  'bala-vishwamitra':
    `Years passed, and one day a fierce sage named Vish-wuh-MEE-truh strode into the court with a demand no father wants to hear.\n\nDemons are fouling my forest rituals. Send your son Rama to guard them.\n\n[pleading] He is barely more than a boy. Take my whole army instead, take me — but not him.\n\nIt must be Rama. No one else.\n\nDuh-shuh-RUT-huh had waited a lifetime for this son. But you do not refuse a sage like Vish-wuh-MEE-truh, and so Rama and his brother Lakshmana walked into the forest. There the boy's real education began: he faced down a demoness named TAH-tuh-kuh, was taught to use celestial weapons, and stood guard over the sage's fire.`,

  'bala-ahalya':
    `On that same journey, they came upon a strange grey shape lying beside the path. It was Uh-HULL-yuh — a woman who, after a bitter scandal of blame, had been cursed to lie as a stone for years, unseen and unforgiven.\n\n[warmly] Rama simply stepped up to her and offered his respect… and the curse broke. She rose out of the stone and back into her life.`,

  'bala-drawn-out':
    `[thoughtful] Two quiet things get set up in the forest. First, Rama's greatness is never something he generates alone. It gets drawn out of him by teachers who ask more of him than his own parents dared, while his father's hardest act of love is letting his cherished son walk toward danger.\n\nSecond, notice what the very first use of Rama's power is, long before any war: he gives someone frozen by shame her life back. Hold onto that. His is the power that restores… not only the power that destroys.`,

  'bala-term-svayamvara':
    `The key word here is swuh-YUM-vuh-ruh — a bride's own choosing. [short pause]\n\nA swuh-YUM-vuh-ruh is an old custom in which a bride chooses her own husband, often by way of a test the suitors must pass. The word means, literally, self-choice. Sita's hand comes with a test almost no one can pass, which is how the story makes sure the right man is the one who wins her.`,

  'bala-bow':
    `[thoughtful] Then the radiant Rama, best of men, took up Shiva's bow… and in the sight of all the mighty, bent it until it broke.\n\nIn the kingdom of MITH-ih-luh, King JUN-uh-kuh had set a single condition for his daughter's marriage.\n\nWhoever can lift the great bow of the god Shiva, and string it, may marry my daughter Sita.\n\nThe bow was an heirloom so massive that grown kings had failed even to make it shift on its stand. And Sita herself was no ordinary bride. Years earlier, JUN-uh-kuh had found her as a baby lying in a furrow of a freshly plowed field — a daughter of the earth itself.\n\n[warmly] Rama walked up to the bow, lifted it as though it weighed nothing, and as he bent it to string, it snapped clean in two with a crack like thunder. Sita chose him. The weddings of all four brothers followed, and the Book of Childhood came to a close… on a day of celebration.`,

  'bala-quiet-power':
    `[thoughtful] Watch how Rama passes the test, not just that he passes it. There is no straining, no showing off. The strength is simply complete, and the whole thing is over in a moment. The epic will keep drawing him exactly this way: powerful without ever needing to prove it.\n\nAnd Sita, born of the earth, is matched to the one man who can lift what the earth's own weight resists. The bond that the rest of this long story will tear apart and then slowly reunite… is founded right here.`,
};

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY. Run:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs bala');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const filter = process.argv[2];
const entries = Object.entries(SCRIPTS).filter(([id]) => !filter || id.includes(filter));
if (entries.length === 0) {
  console.error(`No sections match "${filter}". Known ids:\n  ${Object.keys(SCRIPTS).join('\n  ')}`);
  process.exit(1);
}
console.log(`Generating ${entries.length} clip(s)${filter ? ` matching "${filter}"` : ''} with voice ${VOICE_ID}…\n`);

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

console.log(`\nDone. ${entries.length} clips in assets/audio/ramayana/.`);
