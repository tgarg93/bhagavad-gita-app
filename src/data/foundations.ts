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
// ─── THE POINT ARITHMETIC IS LOAD-BEARING — AND FROZEN AT 87 ─────────────────
//   32 banked cards   × 1  = 32
//   20 scored checks  × 2  = 40   (18 mcq + 2 recall; the 1 reflect scores via
//    1 reflect        × 15 = 15    the existing reflections × 15 term)
//                          ────
//                           87   ← must stay UNDER 100, the Shishya threshold.
//
// The capstone confers Shishya *and* adds 30 (→117), so the level then holds on
// points alone. That gap is the gate: a reader who does every card and check but
// skips the capstone sits at 87 and stays Jigyasu. ADDING A REFLECTION (×15), OR
// ANY NEW SCORED POINTS, levels the reader up mid-track and deflates the capstone.
//
// DEPTH-EXPANSION POLICY (July 2026, Act 3 first): the 32 banked cards and 20
// scored checks are the PERMANENT scored set. Everything added since is
// point-free by construction —
//   • intro / term / waypoint pages carry kind: and never a scoring takeaway,
//   • supporting cards set banked: false (isBankedCard gates the bank call
//     and every recap),
//   • new checks set practice: true (excluded from checksPassed via
//     PRACTICE_CHECK_IDS at the foot of this file).
// Follow the same pattern when reworking the other seven acts, and this sum
// never needs redoing.
// ─────────────────────────────────────────────────────────────────────────────
import { NarrativeSection, SourceNote, isBankedCard } from './narrativeTypes';
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
  // The act's concept checklist, one line per big idea, in teaching order.
  // Single-sourced: the intro page, every waypoint, and the celebration's
  // "What you've just learned" all render THIS list. Absent on acts that have
  // not had the depth rework yet (they keep the classic takeaway recap).
  learnItems?: string[];
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
      takeaway: "What makes someone Hindu isn't a belief — it's what they practice.",
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
            { text: 'What they practice — how they live, worship, and mark the year', correct: true },
          ],
          why: 'Practice, not creed. It is why one family can hold a monotheist, a polytheist and a skeptic, and nobody is a heretic.',
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
        "If no one polices belief, you might expect Hinduism to have split into rival churches, the way Christianity did. It never did.\n\nThere was no council with the power to expel anyone, so nobody was expelled. It simply branched — into four broad streams, each centered on a different face of the divine. Most Hindus never announce which one they belong to; the shrine at home quietly shows you.",
      bullets: [
        '**Vaishnavas** center on Vishnu — and so on Rama and Krishna.',
        '**Shaivas** center on Shiva.',
        '**Shaktas** center on the Goddess (Devi).',
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
  subtitle: 'Brahman, atman, tat tvam asi, maya, prana, and the three gunas',
  intro: [
    'This part is the deep end of the whole tradition, and it is friendlier than it sounds. Six ideas, taken one at a time, each with its own picture.',
    'The ocean and the drop carry the first half: **Brahman**, the one reality · **atman**, the watcher · **tat tvam asi**, the claim that they are one · **maya**, why it doesn’t feel that way · then **prana** and the **three gunas**, the two working ideas you keep.',
  ],
  coverImage: COVER_CLAIM,
  // Single source for the intro page, all five waypoints, and the celebration's
  // "What you've just learned" — one line per big idea, in teaching order.
  learnItems: [
    '**Brahman** — the one reality behind every god',
    '**Atman** — the watcher behind your eyes',
    '**Tat tvam asi** — “you are that,” the tradition’s biggest claim',
    '**Maya** — why oneness doesn’t feel true',
    '**Prana** — the current your breath rides on',
    '**The three gunas** — the three strands of every mood',
  ],
  sections: [
    // ── on-ramp ──────────────────────────────────────────────────────────────
    {
      id: 'f-claim-intro',
      kind: 'intro',
      title: 'Part 3 · What’s ahead',
      storyText:
        'This part is the deep end of the whole tradition, and it is friendlier than it sounds. There are six ideas. We will take them one at a time, and I will check each one off with you as we go.',
    },
    // ── concept 1 · Brahman ──────────────────────────────────────────────────
    {
      id: 'f-claim-brahman',
      title: 'Brahman',
      takeaway: 'Behind every god and every form is a single reality. It is called Brahman.',
      storyText:
        'Behind the thousands of gods, is there one thing? Hinduism says yes, and it has a name for it.\n\nStart with a picture. Imagine the whole universe as one huge ocean. Waves rise and fall on it. Foam gathers and scatters. Drops leap into the air and land again. Every one of those is a shape the water takes for a while, and every one of them is water.\n\n**Brahman** is the ocean. Brahman is not a god sitting somewhere in the sky, watching you. Brahman is the single reality that everything is made of, including every person, every object, and every god.\n\nThe oldest scripture Hindus have, the Rig Veda, says it in a single line:',
      keyVerse: {
        sanskrit: 'एकं सद्विप्रा बहुधा वदन्ति',
        transliteration: 'ekaṃ sad viprā bahudhā vadanti',
        meaning: 'Truth is one; the wise call it by many names.',
        source: 'Rig Veda 1.164.46',
      },
      teachingText:
        'The gods are the many names. Everything you will ever meet is a wave, and **Brahman is the water underneath every one of them.**',
      citation: 'Rig Veda 1.164.46',
      deeper: { ref: 'concept:brahman-atman', label: 'Brahman & Atman' },
    },
    {
      id: 'f-claim-term-brahman',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'ब्रह्मन्',
        transliteration: 'brahman',
        meaning: 'the one reality',
      },
      storyText:
        'Be careful with two look-alike words. **Brahma** is a god, one face among many, and you will meet him in Part 5. **Brahmin** is a social class, a human category.\n\n**Brahman** is neither of those. Brahman is the one reality that everything is made of, gods included.',
      reappears:
        'You will meet this word again in Part 5, The Gods, where every deity turns out to be a face on it.',
    },
    {
      id: 'f-claim-brahman-faces',
      title: 'One current, many lamps',
      banked: false,
      takeaway: 'The gods are not rivals to the one reality — they are its faces, shaped for human hands.',
      storyText:
        'If there is only one reality, why are there so many gods? The answer is sitting in the room with you.\n\nOne electric current runs through your home. You have never seen it, and you never will. What you see is a lamp, a fan, a kettle. Each one takes the same invisible current and gives it a shape you can actually use.\n\nThe gods work the same way. Brahman is the current, and each god is a lamp. The one reality is given a form that a person can love, pray to, and hold onto, because the formless is hard to love and a face is not.\n\nSo many gods never meant many truths. It has always been one current, shining through many lamps.',
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
          why: 'Brahman is not one god among many, and it is not the same word as “Brahmin,” the priesthood. It is the ground of everything, and every deity is a face placed on it.',
        },
      ],
    },
    {
      id: 'f-claim-way-1',
      kind: 'waypoint',
      title: 'Part 3 · 1 of 6 banked',
      learnIndex: 1,
      storyText:
        'That is Brahman, banked. You have the ocean. Now, who is looking out at it from behind your eyes?',
    },
    // ── concept 2 · Atman ────────────────────────────────────────────────────
    {
      id: 'f-claim-atman',
      title: 'Atman',
      takeaway: 'The same one reality is also what looks out from inside you — your true self, atman.',
      storyText:
        'Brahman is the ocean out there. But what about in here? Who is reading this sentence right now?\n\nWatch your own mind for a moment. A thought arrives, stays a little while, and leaves. The thoughts keep changing, but the watching of them does not. Your body keeps changing too. And still you say “when **I** was eight,” and the word *I* keeps pointing at the same someone.\n\nHinduism has a name for that someone. It is **atman**, your true self. Atman is not your thoughts, and it is not your body. **Atman is the one who has been watching them both, the whole time.**',
    },
    {
      id: 'f-claim-atman-drop',
      title: 'The drop and the ocean',
      banked: false,
      takeaway: 'Take one drop from the ocean: smaller than the sea, yet nothing in it but sea. That is atman.',
      storyText:
        'So there is Brahman, the ocean, and there is you. How are the two of you related? Go back to the water.\n\nTake a single drop out of the ocean. The drop is small and the ocean is vast. But look inside the drop. It is the same water, the same salt, the same taste. Nothing in the drop is anything other than ocean.\n\n**Atman is that drop.** Your deepest self is not a fragment that broke off the one reality, and it is not a visitor sent from it. Atman is Brahman, in a drop-sized shape.\n\nHold onto the drop. The next pages give this exact idea its three famous words.',
    },
    {
      id: 'f-claim-term-atman',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'आत्मन्',
        transliteration: 'ātman',
        meaning: 'the self — the one who is aware',
      },
      storyText:
        'Run a quick checklist for this word. Your body changes. Your personality changes. Your moods change by the hour.\n\nAtman is what is left when you take away everything that changes. It is **the watcher that stays.**',
      reappears:
        'This word carries the whole of Part 4, which asks what happens to the watcher when the body it wears dies.',
      checks: [
        {
          id: 'chk:foundations:atman',
          kind: 'mcq',
          practice: true,
          prompt:
            'Your body has changed, your opinions have changed, your moods change by the hour. What is atman?',
          options: [
            { text: 'The personality that makes you you — your memories and character' },
            { text: 'The awareness that has been watching all of those changes happen', correct: true },
            { text: 'A divine spark placed in your body at birth, separate from the world' },
          ],
          why: 'Atman is the watcher, not the watched. Your body, your personality, your memories, and your moods all change, and something noticed every one of those changes. That watcher is what the tradition says you really are.',
        },
      ],
    },
    {
      id: 'f-claim-way-2',
      kind: 'waypoint',
      title: 'Part 3 · 2 of 6 banked',
      learnIndex: 2,
      storyText:
        'That is atman, banked. You now have the ocean and the drop. Next come the three words that say the drop is water.',
    },
    // ── concept 3 · Tat tvam asi ─────────────────────────────────────────────
    {
      id: 'f-claim-tat-tvam-asi',
      title: 'You are that',
      takeaway: 'Brahman and atman are not two things — they are one. That is the whole claim.',
      storyText:
        'The drop is ocean. Now say the same thing about yourself. Brahman is the one reality out there, and atman is the watcher in here. The whole tradition turns on what comes next.\n\n**They are not two things.** The reality out there and the watcher in here are one and the same. The Upanishads say it in three Sanskrit words:',
      keyVerse: {
        sanskrit: 'तत्त्वमसि',
        transliteration: 'tat tvam asi',
        meaning: 'You are that.',
        source: 'Chandogya Upanishad 6.8.7',
      },
      teachingText:
        'This does not mean you are close to that, and it does not mean a piece of that lives inside you. It is plain identity. The drop is not near the ocean, and it is not on loan from it. The drop simply is water. **You are that.**',
      citation: 'Chandogya Upanishad 6.8.7',
    },
    {
      id: 'f-claim-term-tat-tvam-asi',
      kind: 'term',
      title: 'Key saying',
      keyVerse: {
        sanskrit: 'तत्त्वमसि',
        transliteration: 'tat tvam asi',
        meaning: 'You are that.',
        source: 'Chandogya Upanishad 6.8.7',
      },
      bullets: [
        '**tat** — that: the one reality, Brahman',
        '**tvam** — you: the watcher, atman',
        '**asi** — are: not “are near,” not “contain.” Are.',
      ],
      reappears:
        'Every road out of the wheel in Part 4 is a way of making these three words felt, not just heard.',
    },
    {
      id: 'f-claim-tta-salt',
      title: 'The father and the son',
      banked: false,
      takeaway: 'You cannot find the salt anywhere in the water — and there is nowhere in the water it isn’t.',
      storyText:
        'Where do those three words come from? They come from a father teaching his son, in the Chandogya Upanishad.\n\nShvetaketu comes home at twenty-four, proud of twelve years of schooling. His father, Uddalaka, asks him one question. “Did they teach you the one thing by which everything is known?” The son does not even understand the question.\n\nSo the father teaches him. “Put this lump of salt in water, and come back in the morning.” In the morning he says, “Bring me the salt.” Shvetaketu reaches into the bowl, and the salt is gone. “Sip from this side. From the middle. From that side.” Salty, salty, salty.\n\n“You cannot see it, but it is everywhere in the water. The finest essence of everything is like that. And *tat tvam asi*, Shvetaketu. **You are that**.”',
      citation: 'Chandogya Upanishad 6.12–6.13 · The full story is in Stage 4 — The Stories.',
    },
    {
      id: 'f-claim-tta-pot',
      title: 'The pot and the sky',
      banked: false,
      takeaway: 'Break the pot and nothing is set free — there was only ever one space, briefly shaped.',
      storyText:
        'There is one more picture worth carrying, and this one explains why you feel separate when you are not.\n\nPicture a clay pot standing in the open air. There is space inside the pot, and there is the great space of the sky. They look like two different spaces, one small and one endless. But look again. The pot has walls. The space never did.\n\nNow break the pot. Nothing spills out, and nothing is set free, because there was only ever one space. The walls just made it look like two.\n\n**You are the space inside the pot.** The body and its story are the walls. The walls are real, but the separateness they suggest is not.',
      citation: 'The pot-space image comes from the Advaita Vedanta commentarial tradition.',
    },
    {
      id: 'f-claim-tta-so-what',
      title: 'What it changes',
      banked: false,
      takeaway: 'If you are that, so is everyone else — and the tradition built its daily greeting to say so.',
      storyText:
        'If those three words are true, what actually changes? Start with the person across from you.\n\nThe same one reality looks out from behind their eyes too. It is the same sky, sitting in a different pot. Take that seriously about a difficult person for one minute, and notice how much harder it becomes to hold onto contempt.\n\nHinduism folded this idea into its everyday hello. **Namaste**, said with the palms together and a small bow, is often translated as “the divine in me bows to the divine in you.” That is not poetry invented for yoga studios. It is *tat tvam asi*, exchanged twice a day, with everyone you meet.\n\nWhat you are, everyone else is too. The greeting simply says it out loud.',
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
          why: 'The claim is not about being close to the divine, and it is not a reward for good behavior. It is identity. The pot does not contain a piece of the sky. There was never a boundary at all, only walls that made it look like there was one.',
        },
      ],
    },
    {
      id: 'f-claim-way-3',
      kind: 'waypoint',
      title: 'Part 3 · 3 of 6 banked',
      learnIndex: 3,
      storyText:
        'You are that. It is the biggest sentence in the whole track, and you have it now. So why does it not feel true? That question has its own word.',
    },
    // ── concept 4 · Maya ─────────────────────────────────────────────────────
    {
      id: 'f-claim-maya',
      title: 'Maya',
      takeaway: "Why doesn't oneness feel true? Because the world is misread, not unreal — that misreading is maya.",
      storyText:
        'Why does the oneness not feel true? The tradition answers with an experience you may know from any long drive on a hot day.\n\nFar ahead, the road is shining with water. You can see it clearly. But when you reach that spot, the road is dry, and now the water is shining farther ahead.\n\nThe road is real. The light is real. Only the reading was wrong, because there was never any water.\n\nSanskrit has a word built on this exact picture. *Mṛgatṛṣṇā* means “deer’s thirst,” for the deer that chases that water until it drops. The world is not fake. The mistake is in what you take it to be. **That mistake is maya.**',
      citation:
        'Mṛgatṛṣṇā (the mirage, “deer’s thirst”) is a standard illustration of maya in the Vedanta commentarial tradition.',
      deeper: { ref: 'concept:maya', label: 'Maya' },
    },
    {
      id: 'f-claim-maya-teaches',
      title: 'What the mirage teaches',
      banked: false,
      takeaway: 'The shimmer stays even after you know the road is dry. Knowing about maya does not switch it off.',
      storyText:
        '“Maya means the world is an illusion.” You will hear that sentence often, and it is the mistranslation that has done the most damage. The mirage shows what is wrong with it.\n\nThe road was never fake, and the light was never fake. Only your reading of them was false. Maya works the same way. The world is real. What is false is how you read it, as many separate things, with you as one more separate thing among them, small and apart.\n\nThe road has one more lesson. Even after you know the shimmer is not water, it still looks like water. **Knowing about maya does not switch it off.** That is why oneness can be true and still not feel true, and why the tradition built practices instead of stopping at arguments.\n\nSo maya, said plainly, is not a fake world. It is a real one, misread.',
    },
    {
      id: 'f-claim-term-maya',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'माया',
        transliteration: 'māyā',
        meaning: 'the misreading — not the thing',
      },
      storyText:
        'Test every translation you meet against the mirage. “Illusion” says the road itself is fake. Maya says the road is real, and that calling it water was your mistake.\n\nIn the same way, the world is the road, and **the separateness is the water.**',
      reappears:
        'Maya returns in Part 4, because the wheel of rebirth keeps turning exactly as long as the misreading holds.',
      checks: [
        {
          id: 'chk:foundations:maya-misread',
          kind: 'mcq',
          prompt:
            'On a hot drive, the road ahead shines with water — but it is dry when you get there. In this picture, what is maya?',
          options: [
            { text: 'The road — which was never really there' },
            {
              text: 'Your reading of the shimmer as water — the light was real, the “water” was not',
              correct: true,
            },
            { text: 'The heat, which made you hallucinate a road' },
          ],
          why: 'Maya does not say the world is fake. The road and the light are real, and calling them water was the misreading. The world is real in just the same way. The separateness is the water.',
        },
      ],
    },
    {
      id: 'f-claim-way-4',
      kind: 'waypoint',
      title: 'Part 3 · 4 of 6 banked',
      learnIndex: 4,
      storyText:
        'That is maya, banked. Four big ideas down, two to go. The last two are working ideas, and both of them live in your own body.',
    },
    // ── concept 5 · Prana ────────────────────────────────────────────────────
    {
      id: 'f-claim-prana',
      title: 'Prana',
      takeaway: 'One living current runs through all of it — breath, body, wind. It is called prana.',
      storyText:
        'Set maya aside for a moment and feel something instead. Feel your breath. It has been going all day without any help from you.\n\nHinduism’s name for the current behind it is **prana**. Prana means breath, but it does not only mean the air. Prana is the life energy that the breath rides on, the same aliveness that moves in a body, in a tree, and in a gust of wind.',
      keyVerse: {
        sanskrit: 'प्राण',
        transliteration: 'prāṇa',
        meaning: 'breath — the life that moves',
      },
      teachingText:
        'Why give it a name at all? Because the breath is the one place where you can actually touch everything this part has been saying. **Steady the breath, and the mind steadies with it.** That is why nearly every Hindu practice, from yoga to meditation to chanting, begins there.',
      citation: 'Chandogya Upanishad 5.1 — the vital powers quarrel, and prana wins',
      deeper: { ref: 'concept:prana', label: 'Prana' },
    },
    {
      id: 'f-claim-prana-try',
      title: 'Try it now',
      banked: false,
      takeaway: 'The breath is the one current that is both automatic and steerable — that is why every practice starts there.',
      storyText:
        'The fastest proof of prana takes about thirty seconds, and you can run it right now.\n\nFirst, notice your next breath. Do not change it, just watch it. It arrives on its own and it leaves on its own. You never decided to take it. Something in you is breathing whether you pay attention or not.\n\nNow change it on purpose. Take one slow breath in, and let out a slower breath. Do that twice, and notice the small drop in your shoulders.\n\nYou have just used the one lever in the body that is both automatic and steerable. The breath is the handle where the body and the mind meet, and in Part 7, every practice you see will pick it up first.',
    },
    {
      id: 'f-claim-term-prana',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'प्राण',
        transliteration: 'prāṇa',
        meaning: 'the life-current the breath rides on',
      },
      storyText:
        'The word is bigger than “breath” and smaller than “soul.” Prana is the aliveness that moves, in your lungs, in a tree, and in the wind. The breath is simply the place where you can take hold of it.',
      reappears:
        'You will work with this word in Part 7, Rituals & Festivals, where the practices begin at the breath.',
      checks: [
        {
          id: 'chk:foundations:prana',
          kind: 'mcq',
          practice: true,
          prompt:
            'Why does nearly every Hindu practice — yoga, meditation, chanting — begin with the breath?',
          options: [
            { text: 'Because the lungs are considered the most sacred organ' },
            {
              text: 'Because the breath is the one bodily current that is both automatic and steerable — steady it, and the mind steadies',
              correct: true,
            },
            { text: 'Because the priests required breathing exercises before worship' },
          ],
          why: 'Prana is the life current, and the breath is its handle. It runs by itself, yet you can take the controls at any moment. That is what makes it the practical doorway to the mind.',
        },
      ],
    },
    {
      id: 'f-claim-way-5',
      kind: 'waypoint',
      title: 'Part 3 · 5 of 6 banked',
      learnIndex: 5,
      storyText:
        'That is prana, banked. One idea left. It explains why the same you can feel clear at breakfast and foggy by three o’clock.',
    },
    // ── concept 6 · The three gunas ──────────────────────────────────────────
    {
      id: 'f-claim-gunas',
      title: 'The three gunas',
      takeaway: 'Everything nature makes is woven from three strands — the three gunas.',
      storyText:
        'Why does the same day feel so different at different hours? You woke up foggy. By noon you were racing. On the evening walk, everything felt clear and light. It was the same you all day, moving through three kinds of weather.\n\nHinduism says that every mood, every person, and every thing nature makes is woven from **three strands**. They are called the **gunas**, which is simply the Sanskrit word for strands:',
      bullets: [
        '**Sattva** — clarity, lightness, balance. The evening-walk feeling.',
        '**Rajas** — heat, drive, restlessness. The racing noon.',
        '**Tamas** — inertia, heaviness, fog. The 7 a.m. blanket.',
      ],
      teachingText:
        'All three strands run in everyone, all the time, and only the mix changes. The gunas are not three types of people. **They are the three threads that every moment is woven from.**',
      citation: 'Bhagavad Gita, Chapter 14',
      citationLink: 'gita:14',
      deeper: { ref: 'concept:three-gunas', label: 'The Three Gunas' },
    },
    {
      id: 'f-claim-gunas-day',
      title: 'A day, in three strands',
      banked: false,
      takeaway: 'None of the three strands is the enemy. The practice is noticing which one is steering you right now.',
      storyText:
        'What do the strands look like in an ordinary day? Watch one go by, hour by hour.\n\n**7:00 a.m.** The alarm rings and your body votes no. Everything feels heavy, slow, and fogged. That is **tamas** in the lead. Tamas is not evil. It is also the strand that lets you sleep, rest, and heal.\n\n**11:30 a.m.** A deadline, a coffee, three arguments open in your head. Your heart is quick and your thoughts are quicker. Now **rajas** has taken over, and rajas is not evil either. Nothing gets built without it.\n\n**9:00 p.m.** A walk after dinner. The mind is quiet, kind, and clear, with **sattva** out in front. This is the strand the practices try to feed.\n\nThe teaching is not that you should be sattvic all day and never rest or strive. The teaching is simply to notice which strand is steering you right now, because once you can see it, you can work with it.',
      citation: 'Bhagavad Gita 14.11–14.13 describes the marks of each guna’s dominance.',
    },
    {
      id: 'f-claim-term-gunas',
      kind: 'term',
      title: 'Key words',
      keyVerse: {
        sanskrit: 'त्रिगुण',
        transliteration: 'triguṇa',
        meaning: 'the three strands of nature',
      },
      bullets: [
        '**sattva** — सत्त्व · clarity, lightness, balance',
        '**rajas** — रजस् · heat, drive, restlessness',
        '**tamas** — तमस् · weight, inertia, rest',
      ],
      storyText:
        'These are not good, better, and best. They are three threads in one weave, all running in you right now, and only the mix changes.',
      reappears:
        'The Gita gives these three strands a whole chapter, Chapter 14, and you will read it later on this journey.',
      checks: [
        {
          id: 'chk:foundations:gunas',
          kind: 'mcq',
          practice: true,
          prompt:
            'At 7 a.m. you are foggy, at noon you are racing, and on the evening walk you are clear. What does the gunas teaching say is happening?',
          options: [
            { text: 'You are moving between three personality types until you find your true one' },
            {
              text: 'The mix of the three strands — tamas, rajas, sattva — keeps shifting; all three are always in you',
              correct: true,
            },
            { text: 'Your good and bad karma are fighting for control of the day' },
          ],
          why: 'Nobody is a tamas person or a sattva person. All three strands run in everyone, and only the ratio shifts. The practice is to notice which one is steering you right now.',
        },
      ],
    },
  ],
  reflectionQuestions: [],
  handoff:
    'And if that witness is what you really are — what, exactly, happens when the body it is wearing dies?',
  sources: [
    {
      text: 'Chandogya Upanishad',
      locator:
        '6.8.7 — "tat tvam asi"; 6.12–6.13 — Shvetaketu and the salt; 5.1 — the contest of the vital powers',
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
    'The philosophy is settled. Now comes the machinery: how a life leads to another life, what steers it, what you owe while you are here, and where the exit is.',
    'Seven ideas — **samsara**, **karma**, **dharma**, **ahimsa**, **moksha**, the four aims of a life, and the four roads out. This is the part your friend will ask you about first.',
  ],
  coverImage: COVER_WHEEL,
  learnItems: [
    '**Samsara** — the wheel of birth, death, and birth again',
    '**Karma** — action, and why it isn’t fate',
    '**Dharma** — “what is mine to do?”',
    '**Ahimsa** — cause no harm you don’t have to',
    '**Moksha** — the way off the wheel',
    '**The four aims** — permission to live well',
    '**The four roads** — a path for how you’re built',
  ],
  sections: [
    // ── on-ramp ──────────────────────────────────────────────────────────────
    {
      id: 'f-wheel-intro',
      kind: 'intro',
      title: 'Part 4 · What’s ahead',
      storyText:
        'Part 3 gave you the picture. There is one ocean, and you are a drop of it. This part is about the machinery. It explains how one life leads to another, what steers that, and where the way off is. There are seven ideas here, and they are the ones your friends will ask you about first.',
    },
    // ── concept 1 · Samsara ──────────────────────────────────────────────────
    {
      id: 'f-wheel-samsara',
      title: 'Samsara',
      takeaway: 'If the witness is what you truly are, death changes the clothes, not the wearer.',
      storyText:
        'So what happens when the body dies? Part 3 said that you are the watcher, not the body. If you take that seriously, death changes its meaning.\n\nDeath is not the end of the watcher. It is a change of clothes. The body wears out, and the one inside it steps into another. The Bhagavad Gita says it in a single image:',
      keyVerse: {
        sanskrit: 'वासांसि जीर्णानि यथा विहाय',
        transliteration: 'vāsāṃsi jīrṇāni yathā vihāya',
        meaning: 'As one casts off worn-out clothes and puts on new ones…',
        source: 'Bhagavad Gita 2.22',
      },
      teachingText:
        'This endless round of birth, a life, death, and birth again is called **samsara**, the wheel. Samsara is not a punishment, and it is not a reward. It is simply how things are. **The wheel turns, until one day it doesn’t.**',
      citation: 'Bhagavad Gita 2.22',
      citationLink: 'gita:2',
      deeper: { ref: 'concept:samsara', label: 'Samsara' },
    },
    {
      id: 'f-wheel-term-samsara',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'संसार',
        transliteration: 'saṃsāra',
        meaning: 'the wheel — birth, death, and birth again',
      },
      storyText:
        'The word literally means *wandering through*. A soul in samsara moves from life to life the way a traveler moves from town to town.\n\nHold onto the wheel image, because everything in this part is about that wheel. First what turns it, and then how to step off.',
      reappears:
        'Samsara is the problem that every other idea in this part is solving, so keep it in view all the way to moksha.',
    },
    {
      id: 'f-wheel-carryover',
      title: 'What carries over',
      banked: false,
      takeaway: 'The body stays behind; the record travels. What carries over is what you did.',
      storyText:
        'If the clothes change, does anything come along for the ride? One thing does, and it sets up the next idea.\n\nThink of moving between schools as a child. You leave behind the building, the desks, and the uniform. What moves with you is your report card, the record of how you worked.\n\nRebirth works the same way. The body, the house, and the name all stay behind. What travels is the record of your actions. The tradition has a name for that record, and it is the next word: karma.',
      checks: [
        {
          id: 'chk:foundations:samsara',
          kind: 'mcq',
          practice: true,
          prompt: 'In the Gita’s image, death is “casting off worn-out clothes.” Who is doing the casting off?',
          options: [
            { text: 'The body, which then receives a new soul' },
            { text: 'The watcher — the atman, which stays the same while bodies change', correct: true },
            { text: 'Nobody — the image means everything ends at death' },
          ],
          why: 'The clothes are the body, and the wearer is atman, the watcher from Part 3. Death changes the clothes and not the wearer. That is the whole claim of samsara.',
        },
      ],
    },
    {
      id: 'f-wheel-way-1',
      kind: 'waypoint',
      title: 'Part 4 · 1 of 7 banked',
      learnIndex: 1,
      storyText:
        'That is samsara, banked. The wheel turns. Next comes the thing that steers it, and it is not fate.',
    },
    // ── concept 2 · Karma ────────────────────────────────────────────────────
    {
      id: 'f-wheel-karma',
      title: 'Karma',
      takeaway: 'What steers the wheel is what you do. Karma means action, not fate.',
      storyText:
        'So what steers the wheel? Who decides what the next life looks like?\n\nNobody does. There is no judge keeping score. There is only **karma**.\n\nKarma is a Sanskrit word, and it simply means **action**. Something you do. Hindus believe that every action has consequences, and that those consequences do not end when this life ends. They travel with you into the next life, just like the report card that followed you from one school to the next.\n\nOnce you see this, a common saying falls apart. People sigh and say, “It is my karma, there is nothing I can do.” That has the word backwards. Karma is not something that happens to you. Karma is what you do. **And what you do is the one thing in your life that is always yours to change.**',
      deeper: { ref: 'concept:karma', label: 'Karma' },
    },
    {
      id: 'f-wheel-term-karma',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'कर्म',
        transliteration: 'karma',
        meaning: 'action — the deed itself',
      },
      storyText:
        'People misread this word in two ways. Karma is not fate, because fate is what you cannot change, and karma is what you do. And karma is not cosmic revenge, because nobody is punishing you. Consequences are simply growing from seeds you planted.\n\n**Karma is the verb of your life.**',
      reappears:
        'The four roads at the end of this part include karma yoga, which is action itself, turned into a path.',
    },
    {
      id: 'f-wheel-seed',
      title: 'Seed and harvest',
      banked: false,
      takeaway: 'Plant a mango seed and mangoes come up. Actions grow true to their kind — that is the whole mechanism.',
      storyText:
        'How do actions carry their consequences forward? The oldest picture the tradition has for it belongs to a farmer.\n\nPlant a mango seed, and mangoes come up. Not apples, and not thorns. The harvest is true to the seed, every single time. And the harvest is never instant, because you plant in one season and reap in another.\n\nKarma works like that field. A kind action grows into something kind, and a cruel one grows into something cruel. The growing takes time, sometimes longer than one life. **Nobody is sentencing you. You are farming.**',
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
          why: 'Karma is the verb, not the sentence. Treating it as fate turns the tradition’s biggest idea about your own power into an excuse, and that is the single most common mistake outsiders and insiders both make.',
        },
      ],
    },
    {
      id: 'f-wheel-way-2',
      kind: 'waypoint',
      title: 'Part 4 · 2 of 7 banked',
      learnIndex: 2,
      storyText:
        'That is karma, banked. Your actions steer the wheel. So which actions are the right ones? That question has its own word too.',
    },
    // ── concept 3 · Dharma ───────────────────────────────────────────────────
    {
      id: 'f-wheel-dharma',
      title: 'Dharma',
      takeaway: "The real question isn't “what is the rule?” but “what is mine to do?” That is dharma.",
      storyText:
        'If your actions steer the wheel, the next question matters a great deal. Which actions are the right ones? Hinduism answers with a question of its own.\n\nThe question is not “what is the rule?” The question is **“what is mine to do?”** That question, together with its answer for your particular life, is **dharma**.\n\nDharma is not a set of ten commandments handed to everyone alike. A soldier’s dharma and a mother’s dharma are genuinely different, and both are right. **The right thing depends on who you are, where you stand, and who depends on you.**',
      deeper: { ref: 'concept:dharma', label: 'Dharma' },
    },
    {
      id: 'f-wheel-term-dharma',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'धर्म',
        transliteration: 'dharma',
        meaning: 'what upholds — the right thing, for you, here',
      },
      storyText:
        'The root of the word means *to uphold*. Your dharma is whatever upholds the people and the world that rest on you, and that is why it changes when your role changes.\n\nThe easiest way to use it is as a question. What is mine to do?',
      reappears:
        'Dharma is also the first of the four aims, coming two ideas from now, and it is the word the Gita spends eighteen chapters on.',
    },
    {
      id: 'f-wheel-roles',
      title: 'Same person, three duties',
      banked: false,
      takeaway: 'In one afternoon you owe three different things to three different people — and meeting each one is dharma.',
      storyText:
        'Maybe “it depends on your role” sounds slippery to you. If it does, watch yourself for one afternoon.\n\nAt three o’clock you are a parent, and your duty is patience with a child who is learning slowly. At four you are an employee, and your duty is honest work, delivered on time. At six you are a driver in traffic, and your duty is to pull aside and let the ambulance pass, even though you are late.\n\nThat is three hours, three roles, and three different right things. You already navigate all of it without calling it philosophy. Dharma simply says that this is what ethics really is. Not one rule for everybody, but the right thing for the role you are standing in.',
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
          why: 'Dharma answers the question “what is mine to do?” rather than “what is the universal rule?” A rule that fits every life ends up fitting no life particularly well.',
        },
      ],
    },
    {
      id: 'f-wheel-way-3',
      kind: 'waypoint',
      title: 'Part 4 · 3 of 7 banked',
      learnIndex: 3,
      storyText:
        'That is dharma, banked. The right thing depends on where you stand. But one duty comes close to standing everywhere.',
    },
    // ── concept 4 · Ahimsa ───────────────────────────────────────────────────
    {
      id: 'f-wheel-ahimsa',
      title: 'Ahimsa',
      takeaway: "One duty comes close to universal: cause no harm you don't have to. That is ahimsa.",
      storyText:
        'If duty changes with your role, is anything constant across all of them? One thing comes closest, and it is called **ahimsa**.\n\nAhimsa literally means **non-harming**. It asks you to cause no harm you do not have to cause. It is the nearest thing the tradition has to a commandment, and the Mahabharata ranks it above everything else:',
      keyVerse: {
        sanskrit: 'अहिंसा परमो धर्मः',
        transliteration: 'ahiṃsā paramo dharmaḥ',
        meaning: 'Non-harming is the highest duty.',
        source: 'Mahabharata, Anushasana Parva 115.1',
      },
      teachingText:
        'Ahimsa is a discipline rather than a mood. It is harmlessness deliberately chosen by someone who is perfectly capable of doing otherwise. Gandhi built a whole freedom movement on it. **Cause no harm you don’t have to.** That is the entire rule.',
      citation: 'Mahabharata, Anushasana Parva 115.1',
      deeper: { ref: 'concept:ahimsa', label: 'Ahimsa' },
    },
    {
      id: 'f-wheel-term-ahimsa',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'अहिंसा',
        transliteration: 'ahiṃsā',
        meaning: 'non-harming — chosen, not accidental',
      },
      storyText:
        'The *a-* at the front of the word is a negation. *Himsa* is harm, and *ahimsa* is its deliberate absence.\n\nMildness is not the point here. **Strength held back is the point.** A person with no power to harm is merely harmless. Ahimsa is what you call it when the powerful choose not to.',
      reappears:
        'You will meet ahimsa wherever Gandhi comes up, and at the dinner table, where it shapes why many Hindus are vegetarian.',
    },
    {
      id: 'f-wheel-surgeon',
      title: 'The surgeon’s knife',
      banked: false,
      takeaway: 'Ahimsa is not “never cause pain.” It is “cause no harm you don’t have to” — and the last four words carry the weight.',
      storyText:
        'Does non-harming mean a surgeon must never cut? Look closely at the cut, because the answer is in it.\n\nA surgeon’s knife and an attacker’s knife can leave the same wound. What separates them is everything ahimsa cares about. One thing is the intention behind the hand. The other is whether the harm was necessary at all.\n\nThe surgeon cuts to heal, cuts as little as possible, and would rather not cut at all. That is harm, and it is still ahimsa, because none of it is harm the surgeon did not have to cause.\n\nSo read the rule with its last four words attached. Cause no harm *you don’t have to*. The discipline lives in checking, each time, whether you really have to.',
      checks: [
        {
          id: 'chk:foundations:ahimsa',
          kind: 'mcq',
          practice: true,
          prompt: 'A surgeon cuts a patient open to save her life. Has the surgeon broken ahimsa?',
          options: [
            { text: 'Yes — any harm at all breaks it' },
            {
              text: 'No — ahimsa is causing no harm you don’t have to; necessary, healing harm keeps it',
              correct: true,
            },
            { text: 'Only if the operation fails' },
          ],
          why: 'Ahimsa is a discipline of intention and necessity, not a ban on all pain. The surgeon cuts to heal and cuts no more than needed. The harm you must avoid is the kind you did not have to cause.',
        },
      ],
    },
    {
      id: 'f-wheel-way-4',
      kind: 'waypoint',
      title: 'Part 4 · 4 of 7 banked',
      learnIndex: 4,
      storyText:
        'That is ahimsa, banked. You know what steers the wheel, and you know how to steer it well. Now, where is the exit?',
    },
    // ── concept 5 · Moksha ───────────────────────────────────────────────────
    {
      id: 'f-wheel-moksha',
      title: 'Moksha',
      takeaway: 'The goal is not heaven. It is getting off the wheel altogether — moksha.',
      storyText:
        'So where does all this steering lead? What is the finish line? The answer surprises most newcomers, because the answer is not heaven.\n\nIn this picture, even heaven is temporary. It is a pleasant stop that you eventually have to leave, which makes it just another turn of the wheel. The real goal is **moksha**, which means release from the wheel altogether.\n\nMoksha is waking up out of the whole round of birth and death, because you finally see what you always were. You were the drop, and the drop was never separate from the ocean. **There is no next costume and no next classroom. You are home.**',
      deeper: { ref: 'concept:moksha', label: 'Moksha' },
    },
    {
      id: 'f-wheel-term-moksha',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'मोक्ष',
        transliteration: 'mokṣa',
        meaning: 'release — the way off the wheel',
      },
      storyText:
        'The word comes from the root *muc*, which means to let go. Moksha is not a place you travel to. It is a seeing that sets you loose, the way waking up ends a dream without moving you an inch.\n\nHeaven, in this picture, is just a better seat on the wheel. **Moksha is stepping off.**',
      reappears:
        'The last two ideas of this part are both about moksha. One asks whether you must sprint for it, and the answer is no. The other names the four roads that lead there.',
    },
    {
      id: 'f-wheel-river',
      title: 'The river reaches the sea',
      banked: false,
      takeaway: 'As rivers lose their names in the sea, the freed one loses the walls — the drop comes home to the ocean.',
      storyText:
        'What does release actually look like? The Upanishads answer with a picture you already own.\n\nWatch a river reach the sea. For a thousand miles it had a name, two banks, and a shape of its own. At the mouth, the banks fall away, and the water does not die. It simply stops being the river and goes back to being water.\n\nThe Mundaka Upanishad says exactly this. As flowing rivers merge into the sea and lose their name and form, the one who knows is freed.\n\nYou met all of this in Part 3, in the drop, the pot, and the walls. **Moksha is the walls coming down.** It is not the end of you. It is the end of the smallness you mistook for you.',
      citation: 'Mundaka Upanishad 3.2.8 — as rivers flow into the sea, losing name and form',
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
            'Karma is action, and action has consequences. That is exactly what keeps the wheel of rebirth turning. Moksha is the way off the wheel. It is not a better next life, but no next life at all.',
        },
      ],
    },
    {
      id: 'f-wheel-way-5',
      kind: 'waypoint',
      title: 'Part 4 · 5 of 7 banked',
      learnIndex: 5,
      storyText:
        'That is moksha, banked. The exit exists. But before you sprint for it, you should know that you are not actually required to.',
    },
    // ── concept 6 · The four aims ────────────────────────────────────────────
    {
      id: 'f-wheel-aims',
      title: 'The four aims',
      takeaway: 'You are not required to sprint for the exit — pleasure and prosperity are proper goals too.',
      storyText:
        'Now that you know the exit exists, must you rush for it? Should you renounce everything, starting tomorrow? Hinduism’s answer is a comfortable no.\n\nThe tradition names **four** proper aims of a human life, and together they are called the *purusharthas*. Read the list, and pay attention to what made it on:',
      bullets: [
        '**Dharma** — to live rightly.',
        '**Artha** — to prosper, to build and provide for others.',
        '**Kama** — to enjoy: desire, pleasure, love, beauty.',
        '**Moksha** — to be free of the whole cycle.',
      ],
      teachingText:
        'Prosperity is on the list, and so is pleasure. This is not an ascetic religion that grudgingly tolerates the world. **It is a world-affirming religion that keeps an exit door open at the back.**',
      citation: 'The purusharthas are a classical framework of the Dharmashastra tradition.',
    },
    {
      id: 'f-wheel-term-aims',
      kind: 'term',
      title: 'Key words',
      keyVerse: {
        sanskrit: 'पुरुषार्थ',
        transliteration: 'puruṣārtha',
        meaning: 'the four proper aims of a life',
      },
      bullets: [
        '**dharma** — धर्म · to live rightly',
        '**artha** — अर्थ · to prosper and provide',
        '**kama** — काम · to enjoy: desire, love, beauty',
        '**moksha** — मोक्ष · to be free of the wheel',
      ],
      storyText:
        'Four aims, and no apology for any of them. The first three are the world lived well. The fourth is the door out, and it stands open whenever you are ready for it.',
      reappears:
        'Artha and kama explain half of what you will see in the festivals of Part 7, because abundance and joy are worship too.',
    },
    {
      id: 'f-wheel-permission',
      title: 'Permission to live well',
      banked: false,
      takeaway: 'A tradition that lists pleasure among life’s proper aims is not a trap-escape religion — the world is a life to live rightly.',
      storyText:
        'Think about what this list does to the stereotype. The stereotype says that Eastern religion means renouncing everything, and it comes with a cave, a beard, and wanting nothing.\n\nThe purusharthas say otherwise. Build a business honestly, and that is artha, an aim fulfilled. Fall in love, cook a feast, enjoy something beautiful, and that is kama, another aim fulfilled. Neither one needs an apology, as long as dharma frames them.\n\nThe cave is real, but it is a stage of life, not the whole syllabus. Most Hindu lives are lived inside the first three aims, with the fourth kept like a door at the back of the house. It is known, it is respected, and it is walked through when its time comes.',
      checks: [
        {
          id: 'chk:foundations:aims',
          kind: 'mcq',
          practice: true,
          prompt: 'Your friend assumes Hinduism says wealth and pleasure are traps to renounce. What do the four aims actually say?',
          options: [
            { text: 'She is right — only moksha counts' },
            {
              text: 'Prosperity (artha) and pleasure (kama) are proper aims of a life, lived within dharma — with moksha as the open exit',
              correct: true,
            },
            { text: 'Wealth is a proper aim, but pleasure is forbidden' },
          ],
          why: 'The purusharthas put artha and kama on the list of life’s proper goals. This is a world-affirming tradition with an exit door, not an ascetic one with a guilt complex.',
        },
      ],
    },
    {
      id: 'f-wheel-way-6',
      kind: 'waypoint',
      title: 'Part 4 · 6 of 7 banked',
      learnIndex: 6,
      storyText:
        'Those are the four aims, banked. Live well, and keep the door in view. One idea remains, and it names the four roads that lead through that door.',
    },
    // ── concept 7 · The four roads ───────────────────────────────────────────
    {
      id: 'f-wheel-yogas',
      title: 'The four roads',
      takeaway: 'There are four roads to that exit, each matched to the kind of person you already are.',
      storyText:
        'When you are ready for that door, which way do you walk? This is the tradition’s most practical kindness, because there is no single way. There are **four roads**, called the *yogas*, and each one fits a different kind of person:',
      bullets: [
        '**Bhakti** — the path of love and devotion, if your heart leads.',
        '**Karma yoga** — the path of selfless work, if you would rather act than sit.',
        '**Jnana** — the path of knowledge, if you must reason it through.',
        '**Raja** — the path of meditation, if you can sit still.',
      ],
      teachingText:
        'None of the four outranks the others. You do not have to become someone else to arrive. **You take the road that fits how you are already built.**',
      deeper: { ref: 'concept:bhakti-paths', label: 'Bhakti & the Paths of Yoga' },
    },
    {
      id: 'f-wheel-term-yoga',
      kind: 'term',
      title: 'Key words',
      keyVerse: {
        sanskrit: 'योग',
        transliteration: 'yoga',
        meaning: 'a road to the exit — literally, a yoking',
      },
      bullets: [
        '**bhakti** — भक्ति · love and devotion, if your heart leads',
        '**karma yoga** — कर्म योग · selfless action, if you’d rather do than sit',
        '**jnana** — ज्ञान · knowledge, if you must reason it through',
        '**raja** — राज · meditation, if you can sit still',
      ],
      storyText:
        'The word that became a fitness class actually means *yoking*. It is about hitching your everyday self to the biggest thing there is. The postures you know are one small corner of one of the four roads.',
      reappears:
        'Part 7 shows these roads in action. Puja is bhakti made visible, and every practice starts at the breath you met in Part 3.',
    },
    {
      id: 'f-wheel-mountain',
      title: 'Four paths, one summit',
      banked: false,
      takeaway: 'Four trails climb one mountain. Arguing about the best trail misses the point — the summit is the same.',
      storyText:
        'Why four roads and not one? Picture a mountain with a temple at the top.\n\nFrom the east, a trail climbs up through villages, and the pilgrims walk it singing. That is bhakti. From the west there is a service road, built and maintained by people who love to work. That is karma yoga. From the north there is a steep scramble for those who have to see the truth for themselves. That is jnana. And from the south there is a silent switchback for those who climb best alone. That is raja.\n\nFour trails, one summit. A lover of God, a tireless volunteer, a philosopher, and a meditator are not four different religions. **They are four hikers, and they meet at the top.**',
      checks: [
        {
          id: 'chk:foundations:yogas',
          kind: 'mcq',
          practice: true,
          prompt: 'Your friend says: “I could never be religious — I can’t sit still and meditate.” What would this part tell her?',
          options: [
            { text: 'Meditation is the only real path, so she should keep trying' },
            {
              text: 'There are four roads matched to temperament — a doer’s road (karma yoga) and a heart’s road (bhakti) among them',
              correct: true,
            },
            { text: 'She is right — stillness is required' },
          ],
          why: 'The yogas exist precisely for someone like her. Love, action, study, and stillness are all complete roads. You take the one that fits how you are already built.',
        },
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
    {
      text: 'Mundaka Upanishad',
      locator: '3.2.8 — as rivers flow into the sea',
      translation: 'tr. Müller',
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
  learnItems: [
    '**The Trimurti** — three jobs, not three ranks',
    '**Avatars** — when Vishnu comes down',
    '**Shakti** — the power the gods act by',
    '**The family map** — six names that unlock the stories',
  ],
  sections: [
    // ── on-ramp ──────────────────────────────────────────────────────────────
    {
      id: 'f-faces-intro',
      kind: 'intro',
      title: 'Part 5 · What’s ahead',
      storyText:
        'You have the one ocean. Now come the faces, the gods themselves. Most beginners drown in the names, so we will build the map before we meet the crowd. There are four ideas, and once you have them, the whole cast becomes readable.',
    },
    // ── concept 1 · The Trimurti ─────────────────────────────────────────────
    {
      id: 'f-faces-trimurti',
      title: 'The Trimurti',
      takeaway: 'Nobody falls in love with a philosophy — so it grew faces. Start with the great three.',
      storyText:
        'Part 3 ended with lamps. The one current is given faces that a person can love. Now it is time to meet those faces, starting with the greatest three, who are together called the **Trimurti**.\n\n**Brahma** creates the universe. **Vishnu** preserves it. **Shiva** dissolves it. These are three jobs, not three ranks. No one of them outranks the others, because a universe needs all three motions.\n\nThere is one oddity worth knowing. Brahma, the creator, is barely worshiped anywhere today. Making the world, it seems, was the easy part.',
      citation: 'The Trimurti as a formal triad is a Puranic development.',
    },
    {
      id: 'f-faces-term-trimurti',
      kind: 'term',
      title: 'Key words',
      keyVerse: {
        sanskrit: 'त्रिमूर्ति',
        transliteration: 'trimūrti',
        meaning: 'the three forms — one motion, three jobs',
      },
      bullets: [
        '**Brahma** — ब्रह्मा · creates',
        '**Vishnu** — विष्णु · preserves',
        '**Shiva** — शिव · dissolves, to make room',
      ],
      storyText:
        'Be careful with the look-alikes from Part 3. **Brahman** is the one reality. **Brahma** is one face on it, with one job. One letter separates them, and a world of difference.',
      reappears:
        'Vishnu is about to matter most, because the next idea is what he does when the world goes badly wrong.',
    },
    {
      id: 'f-faces-breath',
      title: 'The universe breathes',
      banked: false,
      takeaway: 'Destruction is not evil here — it is the out-breath that makes the next in-breath possible.',
      storyText:
        'Why give dissolution a god at all? Because of what ending actually does.\n\nWatch a gardener prune a rose bush. She cuts living wood, and the cutting is not cruelty. It is exactly what lets the bush bloom again next spring. Without the pruning, there is no bloom.\n\nIn this picture, the universe breathes. Creation is the in-breath, preservation is the long holding, and dissolution is the out-breath. Then it breathes in again. Shiva’s job is the out-breath. **Ending is not the opposite of creating. It is what makes room for it.**',
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
          why: 'The universe breathes in and out. Ending is not evil, because it is what clears space for the next creation. Destruction and renewal are one motion.',
        },
      ],
    },
    {
      id: 'f-faces-way-1',
      kind: 'waypoint',
      title: 'Part 5 · 1 of 4 banked',
      learnIndex: 1,
      storyText:
        'That is the Trimurti, banked. Three jobs, one motion. Next comes the preserver’s remarkable habit of showing up in person.',
    },
    // ── concept 2 · Avatars ──────────────────────────────────────────────────
    {
      id: 'f-faces-avatar',
      title: 'Vishnu comes down',
      takeaway: 'When the world goes badly wrong, Vishnu comes down into it. Each descent is an avatar.',
      storyText:
        'Of the three, Vishnu the preserver has one remarkable habit. When the world tips badly into chaos, he does not fix it from a distance. **He comes down into it.** He is born in a body, and he walks in the mess.\n\nEach of those descents is called an **avatar**. The Sanskrit word *avatāra* literally means a crossing-down. And Vishnu announces the policy himself, in the Gita:',
      keyVerse: {
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
        transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata',
        meaning: 'Whenever dharma declines, O Bharata — then I come forth.',
        source: 'Bhagavad Gita 4.7',
      },
      teachingText:
        'Hold onto one fact and half of a beginner’s confusion clears at once. **Rama is Vishnu, and Krishna is Vishnu.** They are not rival gods. They are the same god, come down twice, into two different emergencies.',
      citation: 'Bhagavad Gita 4.7–8',
      citationLink: 'gita:4',
      deeper: { ref: 'deity:krishna', label: 'Krishna' },
    },
    {
      id: 'f-faces-term-avatar',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'अवतार',
        transliteration: 'avatāra',
        meaning: 'a crossing-down — god descended into a body',
      },
      storyText:
        'The word your phone borrowed for a profile picture means something enormous here. It means **the divine, entering the world in person, when the world needs it.**\n\nTen classical avatars are counted for Vishnu. Rama and Krishna are the two that the stories orbit.',
      reappears:
        'Every Rama and Krishna story from here on is an avatar story, and that includes the epics, the Gita, and half the festivals.',
    },
    {
      id: 'f-faces-lifeguard',
      title: 'The lifeguard dives in',
      banked: false,
      takeaway: 'A lifeguard does not shout instructions from the chair when someone is drowning. He dives. That is the avatar idea.',
      storyText:
        'Why would the preserver of the universe take a body at all? Picture a lifeguard.\n\nOn a calm day he sits high up on his chair, watching. He is present, but apart. Then someone starts drowning. He does not shout advice from above. **He dives into the same water, swims through the same waves, and pulls the swimmer out from inside the danger.**\n\nThat is the avatar’s logic. When dharma is drowning, Vishnu does not repair the world by remote control. He is born into it, once as a prince sent into exile, once as a cowherd in a violent kingdom, and he sets it right from within.',
      checks: [
        {
          id: 'chk:foundations:avatar',
          kind: 'mcq',
          practice: true,
          prompt: 'What is an avatar?',
          options: [
            { text: 'A god’s portrait, kept in the temple' },
            {
              text: 'Vishnu, descended into a body to set the world right when dharma fails',
              correct: true,
            },
            { text: 'Any especially holy priest' },
          ],
          why: 'Avatāra means crossing-down. It is the preserver entering the world in person. Rama and Krishna are the two great descents, and that one fact makes the epics and half the calendar readable.',
        },
      ],
    },
    {
      id: 'f-faces-way-2',
      kind: 'waypoint',
      title: 'Part 5 · 2 of 4 banked',
      learnIndex: 2,
      storyText:
        'That is the avatar idea, banked. The preserver dives in. Next comes the power that every one of these gods acts by.',
    },
    // ── concept 3 · Shakti ───────────────────────────────────────────────────
    {
      id: 'f-faces-shakti',
      title: 'Shakti',
      takeaway: 'Not one of the gods can act without her. The Goddess is power itself — Shakti.',
      storyText:
        'So far, the faces have all been male. Now comes the correction, and it changes everything. **Not one of those gods can act without her.**\n\n**Shakti** means power. It is energy, capability, the very ability to do anything at all. She is not a god’s wife standing politely to the side. She is the force his actions are made of. The tradition says it bluntly. Shiva without his Shakti is a corpse.\n\nAnd she is one Goddess who wears many tempers. **Parvati is Durga is Kali.** She is the gentle wife, and the lion-riding warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.',
      citation: 'Devi Mahatmya — the Goddess as the supreme power',
      deeper: { ref: 'deity:durga', label: 'Durga' },
    },
    {
      id: 'f-faces-term-shakti',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'शक्ति',
        transliteration: 'śakti',
        meaning: 'power — the ability to act at all',
      },
      storyText:
        'In most traditions, the god has power. Here it is the other way around. Power is **her**, and the god is what she moves.\n\nParvati, Durga, and Kali are one power, in three kinds of weather.',
      reappears:
        'Navaratri, coming in Part 7, is nine nights for her. The calendar’s longest festival belongs to Shakti.',
    },
    {
      id: 'f-faces-fire',
      title: 'Fire and its heat',
      banked: false,
      takeaway: 'Fire and its heat are not two things — take the heat away and only a picture of fire is left. So it is with god and Shakti.',
      storyText:
        'How can power itself be a person? The classical image is the nearest fire.\n\nThink of a flame and its heat. They are not two objects. You cannot point at the flame here and its heat over there. And yet, if you could take the heat away, what remained would not be fire at all. It would only be a picture of fire.\n\n**Shakti is the heat.** The god is the flame’s shape, and she is what makes it actually burn. That is why the fiercest forms of the Goddess, like Durga on her lion and Kali with her garland, are not departures from the gentle Parvati. They are the same heat, turned up to what the moment demands.',
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
          why: 'Shakti means energy, capability, and power. Shiva without her is described as inert. Parvati, Durga, and Kali are all her, and for millions of Hindus, She is the supreme reality.',
        },
      ],
    },
    {
      id: 'f-faces-way-3',
      kind: 'waypoint',
      title: 'Part 5 · 3 of 4 banked',
      learnIndex: 3,
      storyText:
        'That is Shakti, banked. You have the great three, the descents, and the power. One map remains, and it unlocks every story.',
    },
    // ── concept 4 · The family map ───────────────────────────────────────────
    {
      id: 'f-faces-family',
      title: 'The family map',
      takeaway: 'Learn six names and how they connect, and almost any Hindu story becomes readable.',
      storyText:
        'Now put the whole cast on one page. It comes down to six names and how they connect, because the relationships are what make the stories readable.\n\nEvery god is paired with a goddess. Vishnu comes down as **Rama** and as **Krishna**. Shiva and Parvati have a son named **Ganesha**, the elephant-headed one, who is greeted first before anything begins.\n\nAnd off to the side stands **Hanuman**, who can do absolutely anything, and who wants nothing except to serve Rama. The tradition holds him up as its ideal, and that tells you exactly what it admires.',
      deeper: { ref: 'deity:ganesha', label: 'Ganesha' },
    },
    {
      id: 'f-faces-read-one',
      title: 'Read one image',
      banked: false,
      takeaway: 'Six names in, you can walk past a festival poster and read it like a sentence.',
      storyText:
        'Does the map actually work? Test it on the next festival poster you pass.\n\nAn elephant-headed figure holds a plate of sweets. That is **Ganesha**, which means something new is being launched, and he was greeted first. A blue cowherd plays a flute. That is **Krishna**, so it is his birthday, or someone is quoting the Gita. A monkey kneels with a mountain balanced on one palm. That is **Hanuman**, caught mid-rescue, serving Rama.\n\nA month ago, that poster was decoration to you. Now it is a sentence, and you can read it. That is what the map buys you. Not trivia, but literacy.',
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
          why: 'Both are avatars of Vishnu. Hold onto this one fact, and the Ramayana, the Mahabharata, the Gita, and half the festival calendar all snap into the same frame.',
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
  learnItems: [
    '**The two shelves** — shruti “heard,” smriti “remembered”',
    '**The two epics** — one man does right; one family falls apart',
    '**The Gita’s moment** — a soldier lays down his bow',
  ],
  sections: [
    // ── on-ramp ──────────────────────────────────────────────────────────────
    {
      id: 'f-library-intro',
      kind: 'intro',
      title: 'Part 6 · What’s ahead',
      storyText:
        'You know the cast now. This short part is about where their stories live. There is one library with two shelves, two great epics, and one conversation that outgrew the war it interrupted.',
    },
    // ── concept 1 · The two shelves ──────────────────────────────────────────
    {
      id: 'f-library-shelves',
      title: 'Two shelves',
      takeaway: 'There is no one holy book. There is a library — and it has just two shelves.',
      storyText:
        'So where are the gods’ stories actually written down? Part 1 warned you that there is no single holy book. There is a whole **library**, and knowing its two shelves is most of what a beginner needs.\n\nThe top shelf is called **shruti**, which means “heard.” It holds the Vedas and, at their end, the **Upanishads**. These texts were received rather than authored, and they carry the deepest authority. Everything in Core Beliefs came from this shelf, including Brahman, atman, and *you are that*.\n\nThe bottom shelf is called **smriti**, which means “remembered.” It holds the Gita, the two epics, and the Puranas, all retold, adapted, and argued with for centuries. The deepest authority sits on the top shelf, but the stories everyone actually knows live on the bottom one.',
    },
    {
      id: 'f-library-term-shelves',
      kind: 'term',
      title: 'Key words',
      keyVerse: {
        sanskrit: 'श्रुति · स्मृति',
        transliteration: 'śruti · smṛti',
        meaning: 'heard — and remembered',
      },
      bullets: [
        '**shruti** — श्रुति · “heard”: Vedas, Upanishads — received, authoritative',
        '**smriti** — स्मृति · “remembered”: Gita, epics, Puranas — retold, beloved',
      ],
      storyText:
        'A rule of thumb that rarely fails. If a text is famous enough that your friends have heard of it, it is probably smriti. The top shelf is quieter, and it is where the philosophy came from.',
      reappears:
        'The two giants of the smriti shelf are next, and inside one of them sits the Gita.',
    },
    {
      id: 'f-library-kitchen',
      title: 'The grandmother’s kitchen',
      banked: false,
      takeaway: 'What is “heard” at the stove outranks the cookbook — and the cookbook is what everyone actually uses.',
      storyText:
        'Why would “heard” outrank “written”? Think of a family kitchen.\n\nThe real recipes were never written down. They were heard, standing at the stove, watching a grandmother’s hands, receiving what she herself once received. When a dispute breaks out about the dish, hers is the voice that settles it.\n\nThe cookbook on the shelf is the remembered version. It was written later, then adapted, expanded, and splattered with daily use. Everyone cooks from the cookbook, and nobody claims it outranks the grandmother.\n\nShruti is the stove, and smriti is the cookbook. **The kitchen runs on both.**',
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
          why: 'Shruti, meaning “heard,” carries the real authority. Smriti, meaning “remembered,” is retold and adapted. The stories everyone knows live on the smriti shelf.',
        },
      ],
    },
    {
      id: 'f-library-way-1',
      kind: 'waypoint',
      title: 'Part 6 · 1 of 3 banked',
      learnIndex: 1,
      storyText:
        'Those are the two shelves, banked. Now for the bottom shelf’s giants, the two epics that hold most of the stories.',
    },
    // ── concept 2 · The two epics ────────────────────────────────────────────
    {
      id: 'f-library-epics',
      title: 'The two epics',
      takeaway: 'Two great epics sit on that second shelf: one man does right at any cost; one family destroys itself.',
      storyText:
        'Two great epics sit on that remembered shelf, and between them they hold most of the stories you will ever hear. The fastest way to keep them apart is this.\n\nThe **Ramayana** is the tidy one. One man, **Rama**, does the right thing at any cost. He is exiled unjustly and goes without complaint. His wife Sita is stolen by the demon king Ravana. Hanuman finds her, and Ravana falls. It is a story about duty, held all the way down.\n\nThe **Mahabharata** is the messy one. Two halves of one family go to war over a throne, and almost everyone loses. It is longer, murkier, and far more honest about how people actually are. One epic shows you the ideal. **The other shows you the mirror.**',
    },
    {
      id: 'f-library-two-scenes',
      title: 'One does right, one falls apart',
      banked: false,
      takeaway: 'Carry one scene from each: Rama walking into exile without complaint; a kingdom gambled away at a dice game.',
      storyText:
        'If you carry just one scene from each epic, you will have the flavor of both.\n\nTake this one from the Ramayana. On the morning Rama is to be crowned king, the order suddenly changes. He is to spend fourteen years in exile instead, because of a promise his father once made. Rama hears the news, and he walks out of the palace the same hour, without argument. That is the whole epic in one motion. Duty is held, whatever it costs.\n\nNow take this one from the Mahabharata. A king sits down to a friendly game of dice. Throw after throw, he loses his wealth, then his kingdom, then his brothers, then himself, and finally his wife’s honor, while a hall full of elders watches in silence. That is the whole epic in one scene. Good people slide into catastrophe, one compromise at a time.',
      checks: [
        {
          id: 'chk:foundations:epics',
          kind: 'mcq',
          practice: true,
          prompt: 'Which is which? One epic shows a man doing right at any cost; the other shows a family destroying itself.',
          options: [
            { text: 'The Ramayana is the ideal; the Mahabharata is the mirror', correct: true },
            { text: 'The Mahabharata is the ideal; the Ramayana is the mirror' },
            { text: 'They tell the same story under different names' },
          ],
          why: 'Rama holds duty all the way down, and that is the ideal. The Mahabharata watches a family lose everything one compromise at a time, and that is the mirror. Between them sit most of the stories you will ever hear.',
        },
      ],
    },
    {
      id: 'f-library-way-2',
      kind: 'waypoint',
      title: 'Part 6 · 2 of 3 banked',
      learnIndex: 2,
      storyText:
        'Those are the two epics, banked. Now step inside the messy one, onto a battlefield, at the moment everything stops.',
    },
    // ── concept 3 · The Gita's moment ────────────────────────────────────────
    {
      id: 'f-library-gita',
      title: 'The Gita\'s moment',
      takeaway: 'Inside that messy epic, a soldier lays down his bow — and gets a 700-verse answer.',
      storyText:
        'Buried inside the Mahabharata is the most-read text in all of Hinduism, and it begins with a collapse.\n\nOn the morning of the great battle, the warrior **Arjuna** rides out between the two armies. He looks across the field and sees his own cousins, his teachers, and his friends standing on the other side. His bow slips from his hand. He sits down in the chariot and says that he will not fight.\n\nWhat his charioteer says next, to talk him through it, is the **Bhagavad Gita**. And the charioteer is **Krishna**, who is Vishnu descended, as you now know. The most-read text in Hinduism is seven hundred verses of a man being gently talked out of a breakdown. **That is exactly why it travels.**',
      citation: 'Bhagavad Gita 1.28–47 — Arjuna\'s despair',
      citationLink: 'gita:1',
      deeper: { ref: 'gita:1', label: 'Bhagavad Gita, Chapter 1' },
    },
    {
      id: 'f-library-bow',
      title: 'The bow slips',
      banked: false,
      takeaway: 'Everyone, sooner or later, stands where Arjuna stands: between two duties, with no clean choice.',
      storyText:
        'Slow the scene down, because the scene is the point.\n\nArjuna is not afraid of dying. He is the best archer alive. What breaks him is seeing. He sees his grandfather Bhishma, who raised him. He sees Drona, who taught him to hold the very bow in his hand. He sees cousins he grew up beside. To win this war means killing them. To walk away means abandoning his brothers and leaving injustice on the throne.\n\nTwo duties, family and justice, are pulling him in opposite directions, and every path costs something he cannot afford.\n\nYou do not need a battlefield to stand where he stands. Think of a job that feeds your family but hollows you out, or a parent who needs care and a career that cannot wait. **The Gita is read at kitchen tables because Arjuna’s field is anywhere a person freezes between two rights.**',
      checks: [
        {
          id: 'chk:foundations:arjuna',
          kind: 'recall',
          prompt:
            'What is Arjuna\'s problem on that battlefield — and why would it matter to someone who is not a warrior?',
          rubric: [
            'He has to fight a war against his own family, teachers and kin',
            'He is paralyzed — he collapses and refuses to act',
            'It is a conflict between two duties, with no clean option',
            'Anyone facing an impossible choice, where every path costs something, is standing where Arjuna stands',
          ],
          passCount: 2,
          modelAnswer:
            'Arjuna has to fight people he loves, and he freezes. It is not cowardice. It is that both choices are wrong. That is why the Gita travels so well. It is about anyone paralyzed by a decision with no clean way out.',
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
    { text: 'Mahabharata', locator: 'Sabha Parva — the dice game', translation: 'tr. Ganguli' },
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
  learnItems: [
    '**The murti** — worship as welcoming a guest',
    '**Darshan & prasad** — seeing, being seen, carrying it home',
    '**The festival year** — a calendar you can now read',
    '**The two hard questions** — and the honest answers',
  ],
  sections: [
    // ── on-ramp ──────────────────────────────────────────────────────────────
    {
      id: 'f-living-intro',
      kind: 'intro',
      title: 'Part 7 · What’s ahead',
      storyText:
        'Everything so far has been about what Hindus think. This part is about what they do, in a room, across a year, and in the hard conversations. There are four ideas, and once you have them, the doing makes sense.',
    },
    // ── concept 1 · The murti ────────────────────────────────────────────────
    {
      id: 'f-living-murti',
      title: 'The murti',
      takeaway: 'None of this is a religion you read. It is one you do — starting by welcoming a guest.',
      storyText:
        'Remember the first thing this track taught you. Being Hindu is about what you practice, not what you profess. So what does the practicing actually look like? It begins in front of a **murti**, the sculpted form of a god.\n\nCalling a murti an “idol” gets the grammar of the thing completely wrong, and one look at **puja**, which is the word for worship, shows why:',
      keyVerse: {
        sanskrit: 'मूर्ति',
        transliteration: 'mūrti',
        meaning: 'a form — something given shape so it can be met',
      },
      teachingText:
        'In puja, the murti is bathed, dressed, fed, sung to, and put to bed at night. That is exactly the care you would offer an honored guest in your home. So the question was never whether the statue is God. **The real question is warmer and simpler. Has the guest been welcomed properly?**',
      citation: 'The sixteen services of puja (shodasha-upachara) are set out in the Agama texts.',
    },
    {
      id: 'f-living-term-murti',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'मूर्ति',
        transliteration: 'mūrti',
        meaning: 'a form — shaped so the formless can be met',
      },
      storyText:
        'Part 3 said it first. The formless is hard to love, and a face is not. A murti is that idea, carved in stone or bronze.\n\nIt is not an idol claiming to be god. **It is a form where god agrees to be met.**',
      reappears:
        'Darshan, the next idea, is what you go to a murti for.',
    },
    {
      id: 'f-living-guest',
      title: 'How you treat a guest',
      banked: false,
      takeaway: 'Sixteen services of puja, and every one is something you would do for a beloved guest: a seat, water, food, a lamp.',
      storyText:
        'If worship is hosting, then the ritual should look like hospitality. Watch it happen.\n\nA guest arrives at your home. You invite them in and offer them a seat. You bring water, so they can wash the journey off. You bring something to eat and drink. There is good conversation, and maybe a song. When the evening ends, you light their way out.\n\nNow read the classical list. Puja names **sixteen services**, the *shodasha upachara*, and they describe the same evening. The deity is invited, seated, offered water, bathed, dressed, fed, entertained with song, and honored with light.\n\nNothing in the list is magic. All of it is manners. And this is one common way, so ask your family how they walk it.',
      checks: [
        {
          id: 'chk:foundations:puja-guest',
          kind: 'mcq',
          prompt: 'In puja the image is bathed, dressed, fed, and put to bed. What does that tell you worship is really about?',
          options: [
            { text: 'Welcoming and hosting the divine as an honored guest', correct: true },
            { text: 'Believing the statue is literally made of god' },
            { text: 'Keeping the temple staff busy with chores' },
          ],
          why: '“Idol” gets the grammar wrong. The question was never whether the statue is God. The question is whether the guest has been welcomed properly.',
        },
      ],
    },
    {
      id: 'f-living-way-1',
      kind: 'waypoint',
      title: 'Part 7 · 1 of 4 banked',
      learnIndex: 1,
      storyText:
        'That is the murti, banked. The guest is welcomed. Next comes what you actually go to a temple for.',
    },
    // ── concept 2 · Darshan & prasad ─────────────────────────────────────────
    {
      id: 'f-living-darshan',
      title: 'Darshan and prasad',
      takeaway: 'You go to the temple to see the god — and to be seen by them. That is darshan.',
      storyText:
        'So why go to a temple at all? The answer surprises people, because it is not mainly to ask for things.\n\nYou go for **darshan**, which means seeing. You go to look at the deity, and just as much, **to be looked at in return**. That is why a murti’s eyes are carved large and open, and why the crowd surges forward when the curtain parts. The meeting runs both ways.\n\nAsk a grandmother what she went to the temple for. She will not say that she went to request something. She will say she took darshan. She saw, and she was seen.',
    },
    {
      id: 'f-living-term-darshan',
      kind: 'term',
      title: 'Key word',
      keyVerse: {
        sanskrit: 'दर्शन',
        transliteration: 'darśana',
        meaning: 'seeing — and being seen',
      },
      storyText:
        'It is one word for both directions of a gaze. You take darshan the way you take someone’s hand, because it only works if both sides are in it.\n\n**Prasad** (प्रसाद) is what you carry home afterward. It is food offered first to the deity, then handed back to you, and people describe it as grace made edible.',
      reappears:
        'Scale this hospitality up from one room to a whole year, and you get the next idea, the festival calendar.',
    },
    {
      id: 'f-living-exchange',
      title: 'The exchange',
      banked: false,
      takeaway: 'You bring something, you see, you are seen, you carry something home. Worship here is a loop, not a letter of requests.',
      storyText:
        'Put the pieces together and look at the shape of a temple visit.\n\nYou arrive carrying something small, maybe fruit, or flowers, or a coconut. You give it. You stand before the murti, you look, and you are looked at. That is darshan. Then a portion of what was offered comes back to you as **prasad**, the deity’s own share passed onward, which is exactly as intimate as it sounds. You eat it there, or you carry it home to someone who could not come.\n\nNow trace the whole movement. You give, you see, you are seen, you receive, and you carry something home. It is a loop of hospitality, much closer to visiting a beloved elder than to filing a petition. Nobody leaves a request form. Everybody leaves with their hands full.',
      checks: [
        {
          id: 'chk:foundations:darshan',
          kind: 'mcq',
          prompt: 'What is darshan?',
          options: [
            { text: 'Reciting a fixed prayer to request a favor' },
            { text: 'Seeing the deity and being seen in return — a mutual meeting', correct: true },
            { text: 'The donation you leave at the temple' },
          ],
          why: 'Darshan means seeing. You go to look at the deity and to be looked at in return. Worship here is exchange and hospitality rather than petition. Nobody is filing a request.',
        },
      ],
    },
    {
      id: 'f-living-way-2',
      kind: 'waypoint',
      title: 'Part 7 · 2 of 4 banked',
      learnIndex: 2,
      storyText:
        'That is darshan, banked. One room, one meeting. Now stretch that welcome across a whole year.',
    },
    // ── concept 3 · The festival year ────────────────────────────────────────
    {
      id: 'f-living-year',
      title: 'The festival year',
      takeaway: 'Scale that hospitality from one room to a whole year, and the calendar becomes a story you can read.',
      storyText:
        'Now scale the welcome up from one room to a whole **year**. The Hindu calendar is crowded with festivals, and a month ago they would have been noise to you.\n\nBut you know the cast now, so each festival turns into a sentence you can read:',
      bullets: [
        '**Diwali** — lamps light the road home because Rama is returning from exile.',
        '**Holi** — spring, color thrown in the streets, and old grudges forgiven.',
        '**Navaratri** — nine nights for the Goddess, in all her forms.',
        '**Janmashtami** — Krishna, born at midnight in a prison cell.',
      ],
      teachingText:
        '**The calendar is everything you just learned, told once a year, with food.** You do not memorize it. You attend it.',
      deeper: { ref: 'festival:diwali-2025', label: 'Diwali' },
    },
    {
      id: 'f-living-diwali-read',
      title: 'One festival, read closely',
      banked: false,
      takeaway: 'Read one festival closely and the method is yours: Diwali is the Ramayana’s last chapter, re-lit every autumn.',
      storyText:
        'Take the biggest festival of all and read it with everything you now know.\n\nStart with the lamps of **Diwali**, the rows of little flames on every windowsill. Why lamps? Because this night is the Ramayana’s final page. Fourteen years of exile are over, Ravana has fallen, and **Rama is coming home tonight**. The lamps are a whole city lighting his road back.\n\nInside the houses, families welcome **Lakshmi**, Vishnu’s goddess, who is abundance herself, because a homecoming is exactly when prosperity should walk in. Sweets travel between neighbors, and that is kama, one of the four aims of life, fulfilled right on schedule.\n\nOne festival used your whole education. It needed an avatar, an epic, a goddess, and an aim. Every other festival reads the same way now.',
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
          why: 'Diwali is Rama coming home, and the city lit his way. Krishna born at midnight is a different festival, Janmashtami. Now that you know who Rama is, Diwali stops being decoration and becomes a sentence you can read.',
        },
      ],
    },
    {
      id: 'f-living-way-3',
      kind: 'waypoint',
      title: 'Part 7 · 3 of 4 banked',
      learnIndex: 3,
      storyText:
        'That is the festival year, banked. One idea remains. It covers the two questions your friends will actually ask, and how to answer them honestly.',
    },
    // ── concept 4 · The two hard questions ───────────────────────────────────
    {
      id: 'f-living-hard',
      title: 'The two hard questions',
      takeaway: 'Two questions have no tidy answer. Saying so honestly is the right move.',
      storyText:
        'One honest warning before you go. Within about ninety seconds of telling someone you are learning about Hinduism, one of two hard questions tends to arrive. Neither has a tidy answer, and pretending otherwise helps no one.\n\nThe first is **caste**. The old texts describe a fourfold ordering of society. What it hardened into was fixed at birth, brutally hierarchical, and defended with scripture. That is a real and unfinished injustice, and many Hindus have fought it from the inside for centuries. Do not defend it. Explain it.\n\nThe second is **beef**. The cow is honored as the animal that gives, in milk, without ever taking. Plenty of Hindus eat meat, but most will not eat beef.',
      sectionHeader: 'What to actually say',
      teachingText:
        '**“It is complicated, and here is how” is the honest answer, and it is a far better one than any slogan.** A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.',
      citation:
        'The fourfold varna order appears at Rig Veda 10.90 (Purusha Sukta); birth-fixed caste as practiced is a much later development.',
      checks: [
        {
          id: 'chk:foundations:hard-questions',
          kind: 'mcq',
          practice: true,
          prompt: 'A friend asks about caste, half-expecting you to defend it. What is the honest move this part recommends?',
          options: [
            { text: 'Change the subject — it is too controversial' },
            {
              text: 'Explain it honestly as a real, unfinished injustice that many Hindus have fought from the inside — and don’t defend it',
              correct: true,
            },
            { text: 'Argue that the old texts have simply been misread' },
          ],
          why: '“It is complicated, and here is how” beats any slogan. A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.',
        },
      ],
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
// slice, and the capstone's recap page replays the lot. Gated on isBankedCard,
// NOT on `!!takeaway`: supporting cards (banked: false) carry takeaways for
// display but must not enter recaps — and keeping them out keeps the capstone
// recap byte-identical, so its recorded clip (f-capstone-recap.mp3) stays valid.
export const allTakeaways = (): string[] =>
  FOUNDATIONS_ACTS.flatMap(act =>
    act.sections.filter(isBankedCard).map(s => s.takeaway as string)
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
  'f-thread-practice': 'Being Hindu is what you practice, not what you believe.',
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
    ?.sections.filter(isBankedCard)
    .map(s => RECAP_BY_ID[s.id] ?? (s.takeaway as string)) ?? [];

// Ids of practice checks (McqCheck.practice) — identical UX, zero points.
// foundationsService.getStats() subtracts these from checksPassed so the
// 20-scored-check arithmetic in the header never moves.
export const PRACTICE_CHECK_IDS: Set<string> = new Set(
  FOUNDATIONS_ACTS.flatMap(act =>
    act.sections.flatMap(s =>
      (s.checks ?? [])
        .filter(c => c.kind === 'mcq' && c.practice)
        .map(c => c.id)
    )
  )
);

export const getFoundationsAct = (id: string): FoundationsAct | null =>
  FOUNDATIONS_ACTS.find(a => a.id === id) ?? null;

// Journey ids, in path order. PERMANENT — completion is keyed on these.
export const FOUNDATIONS_JOURNEY_ORDER: string[] = FOUNDATIONS_ACTS.map(a => a.id);
