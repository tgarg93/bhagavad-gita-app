// FOUNDATIONS — the Jigyasu track.
//
// The first thing a new user walks. Seven parts of bite-sized cards (one idea per
// page, a few short paragraphs, one takeaway apiece), then a capstone: a friend asks them what
// Hinduism actually is, and they answer in their own words. Passing that confers
// Shishya.
//
// The user-facing word is "Part" ("Foundations · Part 3 of 8"). The type is still
// called FoundationsAct internally — renaming it buys nothing and touches four
// files.
//
// Each part is its own JOURNEY ITEM ('foundations:name', 'foundations:thread', …),
// so it gets the existing reader's cover page, its own celebration, and its own
// line in the journey path for free. Those eight ids are PERMANENT — completion
// is keyed on them (CLAUDE.md invariant).
//
// ─── THE POINT ARITHMETIC IS LOAD-BEARING ────────────────────────────────────
//   32 cards    × 1  = 32
//   20 checks   × 2  = 40   (18 mcq + 2 recall; the 1 reflect scores via the
//    1 reflect  × 15 = 15    existing reflections × 15 term)
//                     ────
//                      87   ← must stay UNDER 100, the Shishya threshold.
//
// A check is worth 2 (see CHECK_POINTS in checkTypes.ts) so that 2–3 questions per
// part still fit — 26 checks is the ceiling at value 2. The capstone confers Shishya
// *and* adds 30 (→117), so the level then holds on points alone. That gap is the
// gate: a reader who does every card and check but skips the capstone sits at 87 and
// stays Jigyasu. ADDING A REFLECTION (×15), OR ENOUGH CHECKS TO CROSS 100, levels the
// reader up mid-track and deflates the capstone. If you change the content, redo this
// sum (and lower CHECK_POINTS if you need more check headroom).
// ─────────────────────────────────────────────────────────────────────────────
import { NarrativeSection, SourceNote } from './narrativeTypes';
import { Capstone } from './checkTypes';

export interface FoundationsAct {
  // Journey id is `foundations:${id}` — PERMANENT, completion is keyed on it.
  // The slugs deliberately no longer track the titles ('faces' → "The Gods"):
  // the titles were renamed for clarity, the ids cannot be. Do not "fix" them.
  id: string;
  order: number;
  title: string;
  // The part's thesis, shown on its cover in italics.
  kicker: string;
  subtitle: string;
  // The two paragraphs on the part's cover page: why this part, and what's in it.
  intro: string[];
  coverImage: number;
  sections: NarrativeSection[];
  reflectionQuestions: string[];
  // The question the NEXT act answers. Shown on this act's celebration, right
  // above the "next step" button, so the reader walks straight into it.
  handoff?: string;
  capstone?: Capstone;
  sources: SourceNote[];
}

// Bespoke Jigyasu-track covers. Remaining acts (faces, library, living, capstone)
// still borrow the shared GENERIC until their covers land — see
// docs/dharma-illustration-spec.md.
const GENERIC = require('../../assets/images/covers/generic-cover.jpg');
const COVER_NAME = require('../../assets/images/covers/foundations-name-cover.jpg');
const COVER_THREAD = require('../../assets/images/covers/foundations-thread-cover.jpg');
const COVER_CLAIM = require('../../assets/images/covers/foundations-claim-cover.jpg');
const COVER_WHEEL = require('../../assets/images/covers/foundations-wheel-cover.jpg');

// ═══════════════════════════════════════════════════════════════════════════
// PART 1 — WHAT HINDUISM IS
// ═══════════════════════════════════════════════════════════════════════════
const ACT_NAME: FoundationsAct = {
  id: 'name',
  order: 1,
  title: 'What Hinduism Is',
  kicker: 'Before anything else, the word itself is wrong.',
  subtitle: 'Where the word came from, and what the tradition calls itself',
  intro: [
    'You already have a picture of Hinduism. Almost certainly it came from someone outside it — and so did the name.',
    'Four ideas. By the end of them you will know what it is **not**, where the word came from, what the tradition calls itself, and how something with no book survived three thousand years without one.',
  ],
  coverImage: COVER_NAME,
  sections: [
    {
      id: 'f-name-no-founder',
      title: 'No founder',
      takeaway: 'Hinduism has no founder, no single book, and no one in charge.',
      storyText:
        "Let's start with what Hinduism is *not*. Think of Christianity (Jesus), Islam (Muhammad), or Buddhism (the Buddha) — each has a founder you can name.\n\nHinduism has none. Nobody started it. Instead, many local traditions grew up side by side across India over more than three thousand years. Only much later were they gathered under one name — mostly by outsiders, to keep things simple.\n\nSo what you're left with is:",
      bullets: [
        '**No founder** — no single person who began it.',
        '**No one holy book** — a whole library instead.',
        '**No central authority** — nobody decides what counts as “correct.”',
      ],
      citation: 'No founding figure or single canonical text is claimed by the tradition itself.',
      checks: [
        {
          id: 'chk:foundations:no-founder',
          kind: 'mcq',
          prompt: 'Your friend asks, “So who founded Hinduism?” What is the most accurate reply?',
          options: [
            { text: 'A prophet in ancient India, though his name is mostly forgotten' },
            { text: 'It began as one religion and later split into many' },
            { text: 'Nobody — it is a family of traditions that grew together over thousands of years', correct: true },
          ],
          why: 'There is no founder to name. Many local traditions grew up side by side and were only later filed under one label — mostly by outsiders.',
        },
      ],
    },
    {
      id: 'f-name-river',
      title: 'A river, mispronounced',
      takeaway: "Even the name isn't its own — it's a river, mispronounced.",
      storyText:
        "So where did the word *Hindu* even come from? Not from Hindus. It began as the name of a river.\n\nIn Sanskrit, the great river to the northwest was called the *Sindhu*. Persians living west of it couldn't pronounce the S and said *Hindu* instead — they just meant “the people over there,” past the river. Later, the Greeks dropped the H too.\n\nThat single river-name became three words we still use: **Hindu, India, and Indus**. For most of history, *Hindu* pointed to a place — not a religion.",
      citation: 'Sindhu → Hindū (Old Persian) → Indós (Greek) → India (Latin)',
      checks: [
        {
          id: 'chk:foundations:river-name',
          kind: 'mcq',
          prompt: 'Where does the word “Hindu” originally come from?',
          options: [
            { text: 'The name of a river — outsiders’ word for the people living beyond it', correct: true },
            { text: 'A Sanskrit word meaning “believer”' },
            { text: 'The name of the first Hindu king' },
          ],
          why: 'It started as the river Sindhu. Persians said “Hindu” for the people over there; for most of history the word named a place, not a faith.',
        },
      ],
    },
    {
      id: 'f-name-sanatana',
      title: 'Sanatana Dharma',
      takeaway: 'The name it gives itself is Sanatana Dharma — the eternal way.',
      storyText:
        "If outsiders supplied the word *Hindu*, what do followers call it themselves? **Sanatana Dharma** — usually translated as “the eternal way.”\n\nThe idea behind the name: this isn't a club you sign up for. It's more like a natural order that was always here and always will be — something you *wake up to* and live by, not something you join.\n\nThat's also why there's no founder. Nobody invents the sunrise; you just notice it.",
      keyVerse: {
        sanskrit: 'सनातन धर्म',
        transliteration: 'sanātana dharma',
        meaning: 'the eternal, unbroken way',
      },
    },
    {
      id: 'f-name-sanskrit',
      title: 'Sanskrit',
      takeaway: 'An eternal way still has to be carried — so Sanskrit was built to be remembered, not read.',
      storyText:
        "But it still had to be passed down somehow. For centuries there was no book to keep it in — writing wasn't used for it yet.\n\nSo how did it survive? People memorized it, word for word, and recited it aloud — one generation teaching the next. The language they used is **Sanskrit** (*saṃskṛta*, “put together properly”).\n\nIt was practically built for the ear: exact rhythm, so a wrong word breaks the beat; exact pitch, fixed for every syllable; and repetition woven in as a backup.\n\nThe result: two reciters a thousand miles apart would land on the very same syllable. These spoken texts are the **Vedas** — chanted for centuries before anyone finally wrote them down.",
      keyVerse: {
        sanskrit: 'संस्कृत',
        transliteration: 'saṃskṛta',
        meaning: 'put together properly — refined',
      },
      citation: 'The Vedas were transmitted orally, with elaborate mnemonic schemes, long before manuscripts.',
      checks: [
        {
          id: 'chk:foundations:sanskrit-oral',
          kind: 'mcq',
          prompt: 'Why was Sanskrit built with such exact rhythm and pitch?',
          options: [
            { text: 'So the texts could be memorized and recited identically, since they were carried by voice, not writing', correct: true },
            { text: 'So only trained priests could ever read the script' },
            { text: 'To make the language sound more beautiful than everyday speech' },
          ],
          why: 'For centuries there was no book. The precision was a memory system — it let reciters a thousand miles apart land on the very same syllable.',
        },
      ],
    },
  ],
  reflectionQuestions: [],
  handoff:
    'With no founder, no book and no authority — what on earth is holding it together?',
  sources: [
    {
      text: 'Rig Veda',
      locator: 'Mandala 10 — the Nadistuti Sukta names the Sindhu among the rivers',
      translation: 'tr. Griffith / sacred-texts.com',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 2 — WHAT MAKES SOMEONE HINDU
// ═══════════════════════════════════════════════════════════════════════════
const ACT_THREAD: FoundationsAct = {
  id: 'thread',
  order: 2,
  title: 'What Makes Someone Hindu',
  kicker: 'It is held together by something other than belief.',
  subtitle: 'Practice over creed — and why it could branch without breaking',
  intro: [
    'This part contains the single most useful sentence in the whole track. Once you have it, every strange thing about Hinduism stops being strange.',
    'Four ideas: **what actually makes someone a Hindu**, how that compares with the traditions you already know, why it could branch without ever splitting, and why nobody assigns you a god.',
  ],
  coverImage: COVER_THREAD,
  sections: [
    {
      id: 'f-thread-practice',
      title: 'Practice, not creed',
      takeaway: "What makes someone Hindu isn't a belief — it's what they practise.",
      storyText:
        "If there's no founder, no single book, and no one in charge, what makes someone a Hindu at all?\n\nHere's the surprising part: it isn't what they believe. There's no creed to sign and no moment of conversion. A Hindu can hold that God is one, or many, or everything, or an open question — and still be a Hindu in good standing, with nobody calling them a heretic.\n\nWhat holds it all together is **practice** — how you live, what you do at the shrine, how you mark the year. Practice is the membership. That single idea is the hinge the whole tradition turns on.",
      citation: 'The tradition is orthoprax (right practice) rather than orthodox (right belief).',
      checks: [
        {
          id: 'chk:foundations:what-makes-a-hindu',
          kind: 'mcq',
          prompt: 'Your friend asks what actually makes someone a Hindu. What is the truest answer?',
          options: [
            { text: 'Believing a specific set of doctrines about God' },
            { text: 'Being born in India' },
            { text: 'What they practise — how they live, worship, and mark the year', correct: true },
          ],
          why: 'Practice, not creed. It is why one family can hold a monotheist, a polytheist and a sceptic, and nobody is a heretic.',
        },
      ],
    },
    {
      id: 'f-thread-compare',
      title: 'Beside the others',
      takeaway: 'Judaism, Christianity, and Islam ask what you believe; Hinduism asks what you do.',
      storyText:
        "Line Hinduism up against Judaism, Christianity, and Islam, and the real difference isn't the number of gods.\n\nEach of those three turns on a **founder**, a **single book**, a **confession of faith**, and a **judgement** at the end of time. Judaism comes closest to Hinduism — it too is a practice and a people more than a set of beliefs — but it still has Sinai, a covenant, and one God.\n\nHinduism has none of those fixed anchors. And instead of ending in one final judgement, it pictures time as a wheel that keeps turning.",
      checks: [
        {
          id: 'chk:foundations:practice-not-creed',
          kind: 'mcq',
          prompt: 'A friend raised Catholic asks what makes Hinduism most different from the faith she grew up in. The truest answer?',
          options: [
            { text: 'Hinduism has many gods instead of one' },
            { text: 'Hinduism has no scriptures at all' },
            { text: 'Hinduism turns on what you do — practice — more than on what you believe', correct: true },
          ],
          why: 'The number of gods is the surface difference. The deep one: Judaism, Christianity, and Islam ask what you believe; this one asks what you do.',
        },
      ],
    },
    {
      id: 'f-thread-streams',
      title: 'Four streams',
      takeaway: 'Because practice holds it together, Hinduism could branch into four streams without ever splitting.',
      storyText:
        "If no one polices belief, you might expect Hinduism to have split into rival churches, the way Christianity did. It never did.\n\nThere was no council with the power to expel anyone, so nobody was expelled. It simply branched — into four broad streams, each centred on a different face of the divine. Most Hindus never announce which one they belong to; the shrine at home quietly shows you.",
      bullets: [
        '**Vaishnavas** centre on Vishnu — and so on Rama and Krishna.',
        '**Shaivas** centre on Shiva.',
        '**Shaktas** centre on the Goddess (Devi).',
        '**Smartas** keep several at once, treating them as faces of one reality.',
      ],
      deeper: { ref: 'concept:branches-of-hinduism', label: 'The Four Great Streams' },
    },
    {
      id: 'f-thread-ishta',
      title: 'Your own god',
      takeaway: 'Nobody assigns you a god — you choose the one you love. That is your ishta-devata.',
      storyText:
        "So which stream are you? In Hinduism, nobody hands you the answer.\n\nYour **ishta-devata** (*iṣṭa-devatā*) is your *chosen deity* — the form of the divine you feel closest to. You pick it, and your worship reaches the one reality through that face.\n\nA grandmother keeps Krishna, her son keeps Shiva, her granddaughter keeps Durga — all under one roof, and nothing is wrong. That isn't the system straining to cope. **That is the system working exactly as designed.**",
      keyVerse: {
        sanskrit: 'इष्टदेवता',
        transliteration: 'iṣṭa-devatā',
        meaning: 'the deity you choose for yourself',
      },
      citation:
        'Ishta-devata is a living practice rather than a scriptural rule — no text assigns anyone a deity.',
      checks: [
        {
          id: 'chk:foundations:ishta-devata',
          kind: 'mcq',
          prompt: 'What is an ishta-devata?',
          options: [
            { text: 'The deity a person chooses for themselves, to focus their devotion', correct: true },
            { text: 'The one god every Hindu is required to worship' },
            { text: 'A family’s ancestral spirit' },
          ],
          why: 'Ishta-devata means “chosen deity.” Nobody assigns it — a grandmother’s Krishna and her granddaughter’s Durga sit under one roof, and nothing is wrong.',
        },
      ],
    },
  ],
  reflectionQuestions: [],
  handoff:
    'All four branches are reaching for the same thing behind the faces. So what is behind the faces?',
  sources: [
    {
      text: 'Rig Veda',
      locator: '1.164.46 — "Truth is one; the wise call it by many names"',
      translation: 'tr. Griffith / sacred-texts.com',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 3 — CORE BELIEFS
// ═══════════════════════════════════════════════════════════════════════════
const ACT_CLAIM: FoundationsAct = {
  id: 'claim',
  order: 3,
  title: 'Core Beliefs',
  kicker: 'One reality, one witness — and the discovery that they were never two.',
  subtitle: 'Brahman, atman, maya, prana, and the three strands of nature',
  intro: [
    'This is the deep end, and it is shorter than you fear. Everything so far was the shape of the house. This is what lives in it.',
    'Six ideas: **Brahman**, the one reality · **atman**, the one who watches · the claim that they are the same · **maya**, why you cannot see it · **prana**, the current running through it · and the **three gunas**, the threads it is all woven from.',
  ],
  coverImage: COVER_CLAIM,
  sections: [
    {
      id: 'f-claim-brahman',
      title: 'Brahman',
      takeaway: 'Behind every god and every form is a single reality. It is called Brahman.',
      storyText:
        "So what is behind all those faces? The four streams are all reaching for the same thing.\n\nThey call it **Brahman** — not a god sitting somewhere watching you, but *the ground of everything that is*: pure awareness, without edges and without a face.\n\nEvery deity you're about to meet is a face placed on Brahman, so that a human being has something to love and hold onto. The formless is hard to pray to; a face is not.",
      keyVerse: {
        sanskrit: 'एकं सद्विप्रा बहुधा वदन्ति',
        transliteration: 'ekaṃ sad viprā bahudhā vadanti',
        meaning: 'Truth is one; the wise call it by many names.',
        source: 'Rig Veda 1.164.46',
      },
      citation: 'Rig Veda 1.164.46',
      deeper: { ref: 'concept:brahman-atman', label: 'Brahman & Atman' },
      checks: [
        {
          id: 'chk:foundations:brahman',
          kind: 'mcq',
          prompt: 'What is Brahman?',
          options: [
            { text: 'The most powerful god, who rules over the smaller ones' },
            { text: 'The priestly class of Hindu society' },
            { text: 'The single formless reality underlying everything — awareness itself', correct: true },
          ],
          why: 'Brahman is not one god among many — and not the same word as “Brahmin,” the priesthood. It is the ground of everything; every deity is a face placed on it.',
        },
      ],
    },
    {
      id: 'f-claim-atman',
      title: 'Atman',
      takeaway: 'The same one reality is also what looks out from inside you — your true self, atman.',
      storyText:
        "Now turn the telescope around, from the whole universe to you.\n\nNotice that you can watch your own thoughts arrive and pass. Whatever is doing the watching — the awareness behind your eyes — is **atman**, your true self.\n\nIt isn't the body, which changes with age. It isn't your mood, which comes and goes. Atman is *the witness that has been there the whole time*, unchanged since you were a child.",
      keyVerse: {
        sanskrit: 'आत्मन्',
        transliteration: 'ātman',
        meaning: 'the self — the one who is aware',
      },
    },
    {
      id: 'f-claim-tat-tvam-asi',
      title: 'You are that',
      takeaway: 'Brahman and atman are not two things — they are one. That is the whole claim.',
      storyText:
        "Here is the turn the whole tradition is built on: Brahman — the one reality — and atman — your deepest self — are **not two things**. They are one and the same.\n\nPicture a clay pot sitting out in the open air. The space inside the pot and the vast space of the sky look separate, but they aren't. The pot has walls; the space doesn't. Break the pot and nothing is released, because there was only ever *one* space, briefly shaped.\n\nYou are the space inside the pot. **You are not standing near the divine — you are made of it, and have simply forgotten.**",
      keyVerse: {
        sanskrit: 'तत्त्वमसि',
        transliteration: 'tat tvam asi',
        meaning: 'You are that.',
        source: 'Chandogya Upanishad 6.8.7',
      },
      citation: 'Chandogya Upanishad 6.8.7',
      checks: [
        {
          id: 'chk:foundations:tat-tvam-asi',
          kind: 'mcq',
          prompt: 'What does tat tvam asi — "you are that" — actually claim?',
          options: [
            { text: 'That God lives inside your heart, watching you' },
            {
              text: 'That your innermost self and the ultimate reality are not two different things',
              correct: true,
            },
            { text: 'That you will become divine if you live well enough' },
          ],
          why: 'Not proximity, not reward — identity. The pot does not contain a piece of the sky. There was never a boundary; only walls that made it look like there was.',
        },
      ],
    },
    {
      id: 'f-claim-maya',
      title: 'Maya',
      takeaway: "Why doesn't oneness feel true? Because the world is misread, not unreal — that misreading is maya.",
      storyText:
        "If you really are one with everything, why doesn't it feel that way? The answer is **maya**.\n\n“Maya means the world is an illusion” is the mistranslation that has done the most damage. Maya isn't “fake.” It is *misreading* — seeing something as what it isn't.\n\nPicture a coiled rope on the ground at dusk. You see a snake, your heart pounds, and you run. The rope was never unreal — your **reading** of it was. That is maya: the misreading, not the thing. And notice: the fear it gave you was completely real while it lasted.",
      keyVerse: {
        sanskrit: 'माया',
        transliteration: 'māyā',
        meaning: 'the veil — appearance mistaken for the whole',
      },
      citation: 'The rope-and-serpent illustration comes from the Advaita Vedanta commentarial tradition.',
      deeper: { ref: 'concept:maya', label: 'Maya' },
      checks: [
        {
          id: 'chk:foundations:maya-misread',
          kind: 'mcq',
          prompt: 'You see a coiled rope at dusk and jump, sure it is a snake. In this famous image, what is maya?',
          options: [
            { text: 'The rope — which was never really there' },
            { text: 'Your misreading of the rope as a snake — the thing was real, your reading wasn’t', correct: true },
            { text: 'The fear you felt, which was imaginary' },
          ],
          why: 'Maya is not “the world is fake.” The rope is real; the snake was a misreading. And the fear was genuine while it lasted — that is exactly the point.',
        },
      ],
    },
    {
      id: 'f-claim-prana',
      title: 'Prana',
      takeaway: 'One living current runs through all of it — breath, body, wind. It is called prana.',
      storyText:
        "Behind the misreading, one living current runs through everything. It is called **prana**.\n\nPrana means *breath* — but not only breath. It is the animating energy in a body, a tree, a gust of wind: the tradition's **bridge between the physical and the spiritual**, the life that moves.\n\nIt is also the most practical idea in this whole part. It is why nearly every Hindu practice — yoga, meditation, chanting — begins at the breath. **Steady the breath, and you have a handle on the mind.**",
      keyVerse: {
        sanskrit: 'प्राण',
        transliteration: 'prāṇa',
        meaning: 'breath — the life that moves',
      },
      citation: 'Chandogya Upanishad 5.1 — the vital powers quarrel, and prana wins',
      deeper: { ref: 'concept:prana', label: 'Prana' },
    },
    {
      id: 'f-claim-gunas',
      title: 'The three gunas',
      takeaway: 'Everything nature makes is woven from three strands — the three gunas.',
      storyText:
        "Everything that current flows through — every person, every mood, every moment — is woven from **three strands**, called the *gunas*.\n\nThey aren't three types of person, and they aren't good, better, and best. All three run in everyone at once; only the ratio shifts through the day. The work isn't to erase any of them — it is to notice which one is running you right now:",
      bullets: [
        '**Sattva** — clarity, lightness, balance.',
        '**Rajas** — heat, drive, restlessness.',
        '**Tamas** — inertia, heaviness, fog.',
      ],
      keyVerse: {
        sanskrit: 'त्रिगुण',
        transliteration: 'triguṇa',
        meaning: 'the three strands of nature',
      },
      citation: 'Bhagavad Gita, Chapter 14',
      citationLink: 'gita:14',
      deeper: { ref: 'concept:three-gunas', label: 'The Three Gunas' },
    },
  ],
  reflectionQuestions: [],
  handoff:
    'And if that witness is what you really are — what, exactly, happens when the body it is wearing dies?',
  sources: [
    {
      text: 'Chandogya Upanishad',
      locator: '6.8.7 — "tat tvam asi"; 5.1 — the contest of the vital powers',
      translation: 'tr. Olivelle / Müller',
    },
    { text: 'Rig Veda', locator: '1.164.46', translation: 'tr. Griffith' },
    { text: 'Bhagavad Gita', locator: 'Chapter 14 — the three gunas', appLink: 'gita:14' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 4 — KARMA & REBIRTH
// ═══════════════════════════════════════════════════════════════════════════
const ACT_WHEEL: FoundationsAct = {
  id: 'wheel',
  order: 4,
  title: 'Karma & Rebirth',
  kicker: 'What happens next, and what you can do about it.',
  subtitle: 'Samsara, karma, dharma, ahimsa, moksha — and the four roads out',
  intro: [
    'The philosophy is settled. Now the machinery: how a life leads to another life, what steers it, what you owe while you are here, and where the exit is.',
    'Seven ideas — **samsara**, **karma**, **dharma**, **ahimsa**, **moksha**, the four aims of a life, and the four roads out. This is the part your friend will ask you about first.',
  ],
  coverImage: COVER_WHEEL,
  sections: [
    {
      id: 'f-wheel-samsara',
      title: 'Samsara',
      takeaway: 'If the witness is what you truly are, death changes the clothes, not the wearer.',
      storyText:
        "So what happens when the body dies? If atman — the witness — is what you really are, then death isn't the end of you. It is a change of clothes.\n\nThis endless round is called **samsara**, the wheel: birth, a life, death, and birth again. The Gita puts it exactly this way — the self changes bodies *“as a person changes worn-out clothes.”*\n\nSamsara isn't a horror, and it isn't a reward. It is simply how things are — turning on and on, until one day they don't.",
      keyVerse: {
        sanskrit: 'वासांसि जीर्णानि यथा विहाय',
        transliteration: 'vāsāṃsi jīrṇāni yathā vihāya',
        meaning: 'As one casts off worn-out clothes and puts on new ones…',
        source: 'Bhagavad Gita 2.22',
      },
      citation: 'Bhagavad Gita 2.22',
      citationLink: 'gita:2',
      deeper: { ref: 'concept:samsara', label: 'Samsara' },
    },
    {
      id: 'f-wheel-karma',
      title: 'Karma',
      takeaway: 'What steers the wheel is what you do. Karma means action, not fate.',
      storyText:
        "So what steers the wheel — what shapes the next life? Not a judge. **Karma** does.\n\nThe word *karma* literally means **“action,” or “doing.”** What you do plants what comes back to you: cause and effect, carried on through lives instead of stopping politely at death. Nobody is sentencing you; you are planting seeds.\n\nThat is why *“it's my karma, I can't change it”* gets it exactly backwards. Karma is your own action — so it is precisely the part you *can* change.",
      keyVerse: {
        sanskrit: 'कर्म',
        transliteration: 'karma',
        meaning: 'action — the deed itself',
      },
      deeper: { ref: 'concept:karma', label: 'Karma' },
      checks: [
        {
          id: 'chk:foundations:karma-not-fate',
          kind: 'mcq',
          prompt: 'Someone shrugs: "It\'s my karma. Nothing I can do." What has he misunderstood?',
          options: [
            {
              text: 'Karma is his own action, so it is the one thing he CAN do something about',
              correct: true,
            },
            { text: 'Nothing — that is roughly what karma means' },
            { text: 'Karma only applies to the next life, not this one' },
          ],
          why: 'Karma is the verb, not the sentence. Treating it as fate turns the most agency-heavy idea in the tradition into an excuse — the single most common mistake outsiders and insiders both make.',
        },
      ],
    },
    {
      id: 'f-wheel-dharma',
      title: 'Dharma',
      takeaway: "The real question isn't “what is the rule?” but “what is mine to do?” That is dharma.",
      storyText:
        "If you can change your karma by acting well, the next question is obvious: what is the *right* action? Hinduism gives a surprising answer.\n\nThe question — “what is right for *me* to do?” — is **dharma**. It isn't ten commandments handed to everyone alike. A soldier's dharma and a mother's dharma are **genuinely different, and both are right**.\n\nThis is why Hindu ethics can feel situational to outsiders. It *is* situational, on purpose — because a single rule that fits every life ends up fitting no life particularly well.",
      keyVerse: {
        sanskrit: 'धर्म',
        transliteration: 'dharma',
        meaning: 'what upholds — duty, order, the right thing',
      },
      deeper: { ref: 'concept:dharma', label: 'Dharma' },
      checks: [
        {
          id: 'chk:foundations:dharma-situational',
          kind: 'mcq',
          prompt: 'Why can a soldier’s dharma and a mother’s dharma be genuinely different — and both be right?',
          options: [
            { text: 'Because dharma is the right action for your particular role and situation, not one rule for everyone', correct: true },
            { text: 'Because soldiers are simply held to a lower standard' },
            { text: 'Because dharma only really applies to priests' },
          ],
          why: 'Dharma answers “what is mine to do?” — not “what is the universal rule?” A rule that fits every life fits no life particularly well.',
        },
      ],
    },
    {
      id: 'f-wheel-ahimsa',
      title: 'Ahimsa',
      takeaway: "One duty comes close to universal: cause no harm you don't have to. That is ahimsa.",
      storyText:
        "If duty depends on who you are, is anything close to a universal rule? One thing comes closest: **ahimsa**.\n\nAhimsa means literally **“non-harming”** — causing no harm you don't have to. It is the nearest thing the tradition has to a commandment.\n\nAnd it is a *discipline*, not a mood: harmlessness deliberately **chosen** by someone perfectly capable of doing otherwise. Gandhi built a freedom movement on it. The Jains carry it further than any Hindu does.",
      keyVerse: {
        sanskrit: 'अहिंसा परमो धर्मः',
        transliteration: 'ahiṃsā paramo dharmaḥ',
        meaning: 'Non-harming is the highest duty.',
        source: 'Mahabharata, Anushasana Parva 115.1',
      },
      citation: 'Mahabharata, Anushasana Parva 115.1',
      deeper: { ref: 'concept:ahimsa', label: 'Ahimsa' },
    },
    {
      id: 'f-wheel-moksha',
      title: 'Moksha',
      takeaway: 'The goal is not heaven. It is getting off the wheel altogether — moksha.',
      storyText:
        "So where does it all lead — what is the point of the turning wheel? Not heaven. The goal is **moksha**: getting off the wheel entirely.\n\nMoksha means *release*. It is waking up out of the whole round of birth and death, because you finally see what you always were — that space inside the pot, one with everything.\n\nEven heaven, in this system, is just another pleasant place you eventually have to leave. **Moksha is the only real exit.**",
      keyVerse: {
        sanskrit: 'मोक्ष',
        transliteration: 'mokṣa',
        meaning: 'release, liberation',
      },
      deeper: { ref: 'concept:moksha', label: 'Moksha' },
      checks: [
        {
          id: 'chk:foundations:karma-moksha',
          kind: 'recall',
          prompt: 'In your own words — how do karma and moksha fit together?',
          rubric: [
            'Karma is action, and action has consequences that carry forward',
            'Those consequences keep you turning in the cycle of rebirth (samsara)',
            'Moksha is getting out of that cycle altogether',
            'So karma keeps the wheel turning, and moksha is stepping off it',
          ],
          passCount: 2,
          modelAnswer:
            'Karma is action, and action has consequences — which is exactly what keeps the wheel of rebirth turning. Moksha is the way off the wheel: not a better next life, but no next life at all.',
        },
      ],
    },
    {
      id: 'f-wheel-aims',
      title: 'The four aims',
      takeaway: 'You are not required to sprint for the exit — pleasure and prosperity are proper goals too.',
      storyText:
        "You might expect the goal to be renouncing everything and racing for moksha. It isn't.\n\nHinduism names **four** proper aims of a human life — the *purusharthas*. Look at what made the list: this is not an ascetic religion that grudgingly tolerates the world. It is a world-affirming one that simply keeps an exit door open at the back.",
      bullets: [
        '**Dharma** — to live rightly.',
        '**Artha** — to prosper, to build and provide for others.',
        '**Kama** — to enjoy: desire, pleasure, love, beauty.',
        '**Moksha** — to be free of the whole cycle.',
      ],
      keyVerse: {
        sanskrit: 'पुरुषार्थ',
        transliteration: 'puruṣārtha',
        meaning: 'the four proper aims of a human life',
      },
      citation: 'The purusharthas are a classical framework of the Dharmashastra tradition.',
    },
    {
      id: 'f-wheel-yogas',
      title: 'The four roads',
      takeaway: 'There are four roads to that exit, each matched to the kind of person you already are.',
      storyText:
        "And there isn't just one road to that exit. There are **four** — called the *yogas* — and each suits a different kind of person.\n\nNone outranks the others. **You don't have to become someone else to arrive**; you simply take the road that fits how you are already built:",
      bullets: [
        '**Bhakti** — the path of love and devotion, if your heart leads.',
        '**Karma yoga** — the path of selfless work, if you would rather act than sit.',
        '**Jnana** — the path of knowledge, if you must reason it through.',
        '**Raja** — the path of meditation, if you can sit still.',
      ],
      deeper: { ref: 'concept:bhakti-paths', label: 'Bhakti & the Paths of Yoga' },
      checks: [
        {
          id: 'chk:foundations:reflect-landed',
          kind: 'reflect',
          questionIndex: 0,
        },
      ],
    },
  ],
  reflectionQuestions: [
    'Of everything so far — which idea landed hardest, and why that one?',
  ],
  handoff: 'And yet — nobody has ever fallen in love with a philosophy. So it grew faces.',
  sources: [
    { text: 'Bhagavad Gita', locator: '2.22 — the worn-out clothes', appLink: 'gita:2' },
    {
      text: 'Mahabharata',
      locator: 'Anushasana Parva 115.1 — "ahimsa paramo dharmah"',
      translation: 'tr. Ganguli / sacred-texts.com',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 5 — THE GODS
// ═══════════════════════════════════════════════════════════════════════════
const ACT_FACES: FoundationsAct = {
  id: 'faces',
  order: 5,
  title: 'The Gods',
  kicker: 'The gods, and — far more usefully — how they are related.',
  subtitle: 'The Trimurti, the avatars, the Goddess, and the whole family map',
  intro: [
    'Most beginners drown here: too many names, no map. So we will do the map first and the names second.',
    'Four ideas: the **three great gods** and their jobs · the one who **comes down in a body** · the **Goddess**, who is the power the others act by · and a single chart that makes almost any Hindu story readable.',
  ],
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-faces-trimurti',
      title: 'The Trimurti',
      takeaway: 'Nobody falls in love with a philosophy — so it grew faces. Start with the great three.',
      storyText:
        "All that philosophy is true — but nobody falls in love with an abstraction. So Hinduism grew **faces**: gods you can picture, name, and pray to. Start with the great three, the *Trimurti*.\n\n**Brahma** creates the universe, **Vishnu** preserves it, and **Shiva** dissolves it. Notice what that third job means: destruction here isn't evil — it is **what makes room** for the next world. The universe breathes in, and out, and in.\n\nOne oddity: Brahma, the creator, is barely worshipped anywhere today. Making the world, apparently, was the easy part.",
      citation: 'The Trimurti as a formal triad is a Puranic development.',
      checks: [
        {
          id: 'chk:foundations:shiva-destroyer',
          kind: 'mcq',
          prompt: 'Shiva’s role in the Trimurti is “the destroyer.” Why isn’t that an evil job?',
          options: [
            { text: 'Because Shiva only destroys bad people' },
            { text: 'Because Shiva is weaker than Brahma and Vishnu' },
            { text: 'Because destruction here means dissolving the old to make room for the new', correct: true },
          ],
          why: 'The universe breathes in and out. Ending is not evil — it is what clears space for the next creation. Destruction and renewal are one motion.',
        },
      ],
    },
    {
      id: 'f-faces-avatar',
      title: 'Vishnu comes down',
      takeaway: 'When the world goes badly wrong, Vishnu comes down into it. Each descent is an avatar.',
      storyText:
        "Of the three, Vishnu the preserver has a particular habit: when the world tips into chaos, he **comes down** into it, born in a body to set things right.\n\nEach of those descents is an **avatar** (*avatāra*) — literally a *“crossing-down”* into the world. And this one fact clears up half of a beginner's confusion.\n\n**Rama is Vishnu. Krishna is Vishnu.** They aren't rival gods competing for your attention — they are the same god, come down twice, into two different emergencies.",
      keyVerse: {
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
        transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata',
        meaning: 'Whenever dharma declines, O Bharata — then I come forth.',
        source: 'Bhagavad Gita 4.7',
      },
      citation: 'Bhagavad Gita 4.7–8',
      citationLink: 'gita:4',
      deeper: { ref: 'deity:krishna', label: 'Krishna' },
    },
    {
      id: 'f-faces-shakti',
      title: 'Shakti',
      takeaway: 'Not one of the gods can act without her. The Goddess is power itself — Shakti.',
      storyText:
        "So far the gods have been male. Here is the twist: **not one of them can act without her.**\n\n**Shakti** means *energy, capability, power* — the very ability to do anything at all. Shiva without his Shakti is famously pictured as *inert*, a corpse. She is the force behind every god's action.\n\nAnd she is one Goddess with many tempers: **Parvati is Durga is Kali** — the gentle wife, the lion-riding warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.",
      keyVerse: {
        sanskrit: 'शक्ति',
        transliteration: 'śakti',
        meaning: 'power — the ability to act at all',
      },
      citation: 'Devi Mahatmya — the Goddess as the supreme power',
      deeper: { ref: 'deity:durga', label: 'Durga' },
      checks: [
        {
          id: 'chk:foundations:shakti-power',
          kind: 'mcq',
          prompt: 'What does Shakti — the Goddess — represent?',
          options: [
            { text: 'The wife who stays out of the gods’ affairs' },
            { text: 'The power itself — the energy that lets any god act at all', correct: true },
            { text: 'A minor goddess of luck' },
          ],
          why: 'Shakti means energy, capability, power. Shiva without her is described as inert. Parvati, Durga, and Kali are all her — for millions, She is the supreme reality.',
        },
      ],
    },
    {
      id: 'f-faces-family',
      title: 'The family map',
      takeaway: 'Learn six names and how they connect, and almost any Hindu story becomes readable.',
      storyText:
        "You now have the main cast. The last trick is seeing how they connect — because the relationships are what make the stories readable. The chart above lays them out; here is the shape of it.\n\nEvery god is paired with a goddess. Vishnu comes down as **Rama** and **Krishna**. Shiva and Parvati have a son — **Ganesha**, the elephant-headed one, greeted first before anything at all begins.\n\nAnd off to the side stands **Hanuman**, who can do absolutely anything and wants nothing except to serve Rama. That he is held up as the ideal tells you a great deal about what the tradition actually admires.",
      deeper: { ref: 'deity:ganesha', label: 'Ganesha' },
      checks: [
        {
          id: 'chk:foundations:rama-krishna',
          kind: 'mcq',
          prompt: 'Rama and Krishna are —',
          options: [
            { text: 'Two avatars of Vishnu — the same god, descended twice', correct: true },
            { text: 'Two names for Shiva' },
            { text: 'Brothers, and sons of Brahma' },
          ],
          why: 'Both are avataras of Vishnu. Hold this one fact and the Ramayana, the Mahabharata, the Gita and half the festival calendar snap into the same frame.',
        },
      ],
    },
  ],
  reflectionQuestions: [],
  handoff: 'You know the cast. So where are their stories actually written down?',
  sources: [
    { text: 'Bhagavad Gita', locator: '4.7–8 — the promise to descend', appLink: 'gita:4' },
    { text: 'Devi Mahatmya', locator: 'Markandeya Purana, chs. 81–93', translation: 'tr. Coburn' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 6 — THE SCRIPTURES
// ═══════════════════════════════════════════════════════════════════════════
const ACT_LIBRARY: FoundationsAct = {
  id: 'library',
  order: 6,
  title: 'The Scriptures',
  kicker: 'No single book — but a library, and only two shelves.',
  subtitle: 'Shruti and smriti, the two epics, and one conversation on a battlefield',
  intro: [
    'Every Hindu text you have ever heard named sits on one of two shelves, and knowing which one is most of what a beginner needs.',
    'Three ideas: **shruti and smriti** — including the Upanishads, where **Core Beliefs** came from · the **two epics** · and the **one conversation**, inside one of them, that outgrew the war it interrupted.',
  ],
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-library-shelves',
      title: 'Two shelves',
      takeaway: 'There is no one holy book. There is a library — and it has just two shelves.',
      storyText:
        "So where are all these gods and ideas actually written down? There is no single Bible. There is a whole **library** — but knowing its two shelves is most of what a beginner needs.\n\nThe top shelf is **shruti**, meaning *“heard.”* It holds the Vedas and, at their end, the **Upanishads** — received rather than authored, and carrying the real authority. Everything back in Core Beliefs came from this shelf: *Brahman*, *atman*, “you are that.”\n\nThe bottom shelf is **smriti**, meaning *“remembered”* — the Gita, the two epics, the Puranas: retold, adapted, and argued with over centuries. **The stories everyone actually knows live on this second shelf.**",
      checks: [
        {
          id: 'chk:foundations:shruti-smriti',
          kind: 'mcq',
          prompt: 'What is the difference between the two shelves — shruti and smriti?',
          options: [
            { text: 'Shruti is for priests; smriti is for everyone else' },
            { text: 'Shruti is ancient and smriti was written in the last century' },
            { text: 'Shruti is “heard” and holds the authority (Vedas, Upanishads); smriti is “remembered” — the epics, Gita, Puranas', correct: true },
          ],
          why: 'Shruti (“heard”) carries the real authority; smriti (“remembered”) is retold and adapted. The stories everyone knows live on the smriti shelf.',
        },
      ],
    },
    {
      id: 'f-library-epics',
      title: 'The two epics',
      takeaway: 'Two great epics sit on that second shelf: one man does right at any cost; one family destroys itself.',
      storyText:
        "Two great epics sit on that second shelf, and between them they hold most of the stories you will ever hear.\n\nThe **Ramayana** is the tidy one. Rama is exiled, his wife Sita is stolen by the demon king Ravana, Hanuman finds her, and Ravana falls. At heart it is a story about holding to your duty even when it costs you everything.\n\nThe **Mahabharata** is the messy one. Two halves of one family go to war over a throne, and almost everyone loses. It is far longer, far murkier, and far more honest about how people actually are.",
    },
    {
      id: 'f-library-gita',
      title: 'The Gita\'s moment',
      takeaway: 'Inside that messy epic, a soldier lays down his bow — and gets a 700-verse answer.',
      storyText:
        "Buried inside the Mahabharata is its most famous moment. On the eve of battle, a warrior named **Arjuna** looks across the field, sees his own cousins, teachers, and friends in the enemy army — and simply cannot do it. He lays down his bow.\n\nWhat his charioteer says next, to talk him through it, *is* the **Bhagavad Gita**. And the charioteer is **Krishna** — who is Vishnu, as you now know.\n\nSo the most-read text in all of Hinduism is 700 verses of a man being gently talked out of a breakdown. That is precisely why it travels: everyone, sooner or later, freezes at a choice like Arjuna's.",
      citation: 'Bhagavad Gita 1.28–47 — Arjuna\'s despair',
      citationLink: 'gita:1',
      deeper: { ref: 'gita:1', label: 'Bhagavad Gita, Chapter 1' },
      checks: [
        {
          id: 'chk:foundations:arjuna',
          kind: 'recall',
          prompt:
            'What is Arjuna\'s problem on that battlefield — and why would it matter to someone who is not a warrior?',
          rubric: [
            'He has to fight a war against his own family, teachers and kin',
            'He is paralysed — he collapses and refuses to act',
            'It is a conflict between two duties, with no clean option',
            'Anyone facing an impossible choice, where every path costs something, is standing where Arjuna stands',
          ],
          passCount: 2,
          modelAnswer:
            'Arjuna has to fight people he loves, and he freezes — not out of cowardice, but because both choices are wrong. That is why it travels: it is about anyone paralysed by a decision with no clean way out.',
        },
      ],
    },
  ],
  reflectionQuestions: [],
  handoff:
    'But this was never a religion you read. So what does it actually look like, on an ordinary Tuesday?',
  sources: [
    { text: 'Bhagavad Gita', locator: '1.28–47 — Arjuna\'s despair', appLink: 'gita:1' },
    { text: 'Valmiki Ramayana', locator: 'Bala Kanda through Yuddha Kanda' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 7 — RITUALS & FESTIVALS
// ═══════════════════════════════════════════════════════════════════════════
const ACT_LIVING: FoundationsAct = {
  id: 'living',
  order: 7,
  title: 'Rituals & Festivals',
  kicker: 'What it looks like in a room, in a year, and in an argument.',
  subtitle: 'Puja, darshan, the festival year — and the two questions you will be asked',
  intro: [
    'Everything so far has been what Hindus think. This is what they *do* — which, as you saw early on, is the part that actually counts.',
    'Four ideas: what the **murti** really is (almost everyone gets this wrong) · what you go to a temple **for** · how the **year** becomes a story you can now read · and the **two questions** no honest account is allowed to dodge.',
  ],
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-living-murti',
      title: 'The murti',
      takeaway: 'None of this is a religion you read. It is one you do — starting by welcoming a guest.',
      storyText:
        "Remember the very first idea: Hinduism is something you *do*, not something you sign up to believe. So what does the doing look like? It begins in front of a **murti** — the sculpted image of a god.\n\nCalling a murti an “idol” gets the grammar completely wrong. In **puja** (worship), the image is **bathed, dressed, fed, sung to, and put to bed at night** — exactly the etiquette you would offer an honoured guest in your home.\n\nSo the question was never “is the statue God?” The real question is warmer and simpler: **has the guest been welcomed properly?**",
      keyVerse: {
        sanskrit: 'मूर्ति',
        transliteration: 'mūrti',
        meaning: 'a form — something given shape so it can be met',
      },
      citation: 'The sixteen services of puja (shodasha-upachara) are set out in the Agama texts.',
      checks: [
        {
          id: 'chk:foundations:puja-guest',
          kind: 'mcq',
          prompt: 'In puja the image is bathed, dressed, fed, and put to bed. What does that tell you worship is really about?',
          options: [
            { text: 'Welcoming and hosting the divine as an honoured guest', correct: true },
            { text: 'Believing the statue is literally made of god' },
            { text: 'Keeping the temple staff busy with chores' },
          ],
          why: '“Idol” gets the grammar wrong. The question was never “is the statue God?” — it is “has the guest been welcomed properly?”',
        },
      ],
    },
    {
      id: 'f-living-darshan',
      title: 'Darshan and prasad',
      takeaway: 'You go to the temple to see the god — and to be seen by them. That is darshan.',
      storyText:
        "So why go to a temple at all? Not mainly to ask for things. You go for **darshan**.\n\nDarshan means *“seeing.”* You go to *look at* the deity — and, just as much, to *be looked at* in return. The meeting runs both ways.\n\nYou come home carrying **prasad**: food that has first been offered to the god and tasted by them, then handed back to you. Worship here is **exchange and hospitality**, not petition. Nobody is filing a request.",
      keyVerse: {
        sanskrit: 'दर्शन',
        transliteration: 'darśana',
        meaning: 'seeing — and being seen',
      },
      checks: [
        {
          id: 'chk:foundations:darshan',
          kind: 'mcq',
          prompt: 'What is darshan?',
          options: [
            { text: 'Reciting a fixed prayer to request a favour' },
            { text: 'Seeing the deity and being seen in return — a mutual meeting', correct: true },
            { text: 'The donation you leave at the temple' },
          ],
          why: 'Darshan means “seeing.” You go to look at the deity and be looked at back. Worship here is exchange and hospitality, not petition — nobody is filing a request.',
        },
      ],
    },
    {
      id: 'f-living-year',
      title: 'The festival year',
      takeaway: 'Scale that hospitality from one room to a whole year, and the calendar becomes a story you can read.',
      storyText:
        "Now scale that welcome up from a single room to a whole **year**. The Hindu calendar is packed with festivals — and because you now know the characters, each one has turned into a sentence you can read:",
      bullets: [
        '**Diwali** — lamps light the road home because Rama is returning from exile.',
        '**Holi** — spring, colour thrown in the streets, and old grudges forgiven.',
        '**Navaratri** — nine nights for the Goddess, in all her forms.',
        '**Janmashtami** — Krishna, born at midnight in a prison cell.',
      ],
      deeper: { ref: 'festival:diwali-2025', label: 'Diwali' },
      checks: [
        {
          id: 'chk:foundations:diwali',
          kind: 'mcq',
          prompt: 'Why are lamps lit at Diwali?',
          options: [
            { text: 'To frighten off evil spirits on the darkest night' },
            { text: 'To light the road home for Rama, returning from exile', correct: true },
            { text: 'To mark the birth of Krishna at midnight' },
          ],
          why: 'Diwali is Rama coming home — the city lit his way. (Krishna at midnight is Janmashtami.) Now that you know who Rama is, the festival stops being decoration and becomes a sentence you can read.',
        },
      ],
    },
    {
      id: 'f-living-hard',
      title: 'The two hard questions',
      takeaway: 'Two questions have no tidy answer. Saying so honestly is the right move.',
      storyText:
        "One honest warning before you go. Within about ninety seconds of telling someone you are learning about Hinduism, one of two hard questions tends to arrive. Neither has a tidy answer, and pretending otherwise helps no one.\n\n**Caste.** The old texts describe a fourfold ordering of society. What it hardened into — fixed at birth, brutally hierarchical, defended with scripture — is a real and unfinished injustice, one that many Hindus have fought from the inside for centuries. Don't defend it. Explain it.\n\n**Beef.** The cow is honoured as the animal that gives, in milk, without ever taking. Plenty of Hindus eat meat; most will not eat beef.",
      sectionHeader: 'What to actually say',
      teachingText:
        '**“It is complicated, and here is how” is the honest answer — and a far better one than any slogan.** A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.',
      citation:
        'The fourfold varna order appears at Rig Veda 10.90 (Purusha Sukta); birth-fixed caste as practised is a much later development.',
    },
  ],
  reflectionQuestions: [],
  handoff: 'Which leaves only one thing left to do — the thing this was all for.',
  sources: [
    { text: 'Rig Veda', locator: '10.90 — the Purusha Sukta', translation: 'tr. Griffith' },
    { text: 'Valmiki Ramayana', locator: 'Yuddha Kanda — the return to Ayodhya' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PART 8 — EXPLAIN IT YOURSELF
// The recap section carries no `takeaway`, so it is NOT banked and does not
// disturb the 87-point arithmetic at the top of this file. It renders as an
// ordinary prose page (bullets) through NarrativeSections.
// ═══════════════════════════════════════════════════════════════════════════
const ACT_CAPSTONE: FoundationsAct = {
  id: 'capstone',
  order: 8,
  title: 'Explain It Yourself',
  kicker: 'A friend asks you the question. You answer it.',
  subtitle: 'Everything you are carrying — and the only test that matters',
  intro: [
    'Seven acts ago you could not have started the sentence. Now you can.',
    'One page to gather the thirty-two ideas you are carrying, and then the question itself — asked plainly, answered in your own words. **Pass it and you are no longer Jigyasu.**',
  ],
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-capstone-recap',
      title: 'You can say all of this now',
      subtitle: 'Thirty-two sentences. You arrived with none of them.',
      // No `takeaway` — this is a recap page, not a card. Deliberately not banked.
      bullets: [], // filled at module load from every act's takeaways — see below
    },
  ],
  reflectionQuestions: [],
  capstone: {
    id: 'chk:foundations:capstone',
    kind: 'capstone',
    riteId: 'foundations-capstone',
    conferLevel: 2, // Shishya
    prompt:
      'A friend asks you, properly, for the first time: "So what actually is Hinduism?"\n\nTell them. In your own words, the way you would say it out loud. A few sentences is plenty — this is a conversation, not an exam.',
    rubric: [
      'No founder, no single book — a family of traditions',
      'One reality behind many gods and forms (Brahman)',
      'Karma and rebirth — action has consequences, life repeats',
      'Dharma — the right thing depends on who and where you are',
      'Moksha — getting free of the cycle is the goal',
      'It is lived — practice, puja, festivals, stories',
    ],
    // Parallel to `rubric` — where each idea was taught, so a miss is actionable.
    rubricSource: [
      'Part 1 · What Hinduism Is',
      'Part 3 · Core Beliefs',
      'Part 4 · Karma & Rebirth',
      'Part 4 · Karma & Rebirth',
      'Part 4 · Karma & Rebirth',
      'Part 7 · Rituals & Festivals',
    ],
    passCount: 4, // 4 of 6 — generous on purpose; the point is that they can say it
    modelAnswer:
      'Hinduism is less one religion than a family of traditions — no founder, no single book. Behind its many gods it holds that there is one reality, and that your innermost self is not separate from it. Your actions carry consequences across lives, and the goal is not heaven but release from that cycle altogether. What makes someone a Hindu is not a creed but a practice — how they live, worship, and mark the year.',
  },
  sources: [],
};

// ═══════════════════════════════════════════════════════════════════════════

export const FOUNDATIONS_ACTS: FoundationsAct[] = [
  ACT_NAME,
  ACT_THREAD,
  ACT_CLAIM,
  ACT_WHEEL,
  ACT_FACES,
  ACT_LIBRARY,
  ACT_LIVING,
  ACT_CAPSTONE,
];

// Every takeaway the reader banks, in order — the act summaries replay their own
// slice, and the capstone's recap page replays the lot.
export const allTakeaways = (): string[] =>
  FOUNDATIONS_ACTS.flatMap(act =>
    act.sections.map(s => s.takeaway).filter((t): t is string => !!t)
  );

// The recap page's bullets are the full list, assembled once at module load so
// the content stays in exactly one place.
ACT_CAPSTONE.sections[0].bullets = allTakeaways();

// Short one-clause recaps for the completion screen's "What you've learned" list,
// keyed by section id. The cards themselves still show the full `takeaway`; this
// keeps the celebration recap tight so the Next button clears the fold even on
// the seven-card acts. Falls back to the full takeaway for any id not listed.
const RECAP_BY_ID: Record<string, string> = {
  // What Hinduism Is
  'f-name-no-founder': 'No founder, no single book, no one in charge.',
  'f-name-river': 'Even the name is a river, mispronounced.',
  'f-name-sanatana': 'It calls itself Sanatana Dharma — the eternal way.',
  'f-name-sanskrit': 'Sanskrit was built to be remembered, not read.',
  // What Makes Someone Hindu
  'f-thread-practice': 'Being Hindu is what you practise, not what you believe.',
  'f-thread-compare': 'Others ask what you believe; Hinduism asks what you do.',
  'f-thread-streams': 'It branched into four streams without ever splitting.',
  'f-thread-ishta': 'You choose the god you love — your ishta-devata.',
  // Core Beliefs
  'f-claim-brahman': 'Behind every form is one reality: Brahman.',
  'f-claim-atman': 'That same reality looks out from inside you: atman.',
  'f-claim-tat-tvam-asi': 'Brahman and atman are one — the whole claim.',
  'f-claim-maya': 'The world is misread, not unreal — that is maya.',
  'f-claim-prana': 'One living current runs through all of it: prana.',
  'f-claim-gunas': 'Nature is woven from three strands — the gunas.',
  // Karma & Rebirth
  'f-wheel-samsara': 'Death changes the clothes, not the wearer.',
  'f-wheel-karma': 'Karma means action, not fate.',
  'f-wheel-dharma': 'Dharma is “what is mine to do?”',
  'f-wheel-ahimsa': 'Ahimsa — cause no harm you don’t have to.',
  'f-wheel-moksha': 'Moksha — getting off the wheel altogether.',
  'f-wheel-aims': 'Pleasure and prosperity are proper goals too.',
  'f-wheel-yogas': 'Four roads out, one for each kind of person.',
  // The Gods
  'f-faces-trimurti': 'It grew faces — start with the great three.',
  'f-faces-avatar': 'When the world goes wrong, Vishnu comes down: an avatar.',
  'f-faces-shakti': 'The Goddess is power itself — Shakti.',
  'f-faces-family': 'Six names unlock almost any Hindu story.',
  // The Scriptures
  'f-library-shelves': 'Not one book — a library, on two shelves.',
  'f-library-epics': 'Two epics: one man does right; one family self-destructs.',
  'f-library-gita': 'A soldier lays down his bow — and gets the Gita.',
  // Rituals & Festivals
  'f-living-murti': 'It’s a religion you do — starting by welcoming a guest.',
  'f-living-darshan': 'You go to see the god, and to be seen: darshan.',
  'f-living-year': 'The festival calendar is a story you can read.',
  'f-living-hard': 'Two questions have no tidy answer — say so honestly.',
};

export const takeawaysForAct = (actId: string): string[] =>
  FOUNDATIONS_ACTS.find(a => a.id === actId)
    ?.sections.filter(s => !!s.takeaway)
    .map(s => RECAP_BY_ID[s.id] ?? (s.takeaway as string)) ?? [];

export const getFoundationsAct = (id: string): FoundationsAct | null =>
  FOUNDATIONS_ACTS.find(a => a.id === id) ?? null;

// Journey ids, in path order. PERMANENT — completion is keyed on these.
export const FOUNDATIONS_JOURNEY_ORDER: string[] = FOUNDATIONS_ACTS.map(a => a.id);
