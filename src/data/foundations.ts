// FOUNDATIONS — the Jigyasu track.
//
// The first thing a new user walks. Seven parts of bite-sized cards (one idea per
// page, ~60 words, one takeaway apiece), then a capstone: a friend asks them what
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
//   32 cards   × 1  = 32
//    7 checks  × 4  = 28   (5 mcq + 2 recall; the 1 reflect scores via the
//    1 reflect × 15 = 15    existing reflections × 15 term)
//                    ────
//                     75   ← must stay UNDER 100, the Shishya threshold.
//
// The capstone confers Shishya *and* adds 30 (→105), so the level then holds on
// points alone. That gap is the gate: a reader who does every card and skips the
// capstone sits at 75, four-fifths of the way and visibly short. ADDING A CARD OR
// A SECOND REFLECTION PUSHES THIS OVER 100 and the reader levels up mid-track,
// which deflates the capstone entirely. If you change the content, redo this sum.
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

// TODO cover shopping list: foundations-{name,thread,claim,wheel,faces,library,
// living,capstone}-cover.jpg — see docs/dharma-illustration-spec.md. Until they
// land, each act borrows the cover of the concept it most points at.
const GENERIC = require('../../assets/images/covers/generic-cover.jpg');

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
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-name-no-founder',
      title: 'No founder',
      takeaway: 'Hinduism has no founder, no single book, and nobody in charge.',
      storyText:
        'Start with what it is *not*. Every other major religion can name the person who started it; this one cannot, because nobody did. It is a **family of traditions** that grew up alongside one another over three thousand years and were filed under a single name much later — largely by outsiders, for their own convenience.',
      citation: 'No founding figure or single canonical text is claimed by the tradition itself.',
    },
    {
      id: 'f-name-river',
      title: 'A river, mispronounced',
      takeaway: 'Even the name is not its own. It is a river, mispronounced.',
      storyText:
        'Those outsiders named it after water. Sanskrit called the great river the *Sindhu*; Persians to the west could not manage the S and said *Hindū*, meaning simply **the people over there**. The Greeks then dropped the H. **Hindu, India and Indus are one word** — and for most of history it named a place, not a faith.',
      citation: 'Sindhu → Hindū (Old Persian) → Indós (Greek) → India (Latin)',
    },
    {
      id: 'f-name-sanatana',
      title: 'Sanatana Dharma',
      takeaway: 'The name it gives itself is Sanatana Dharma — the eternal way.',
      storyText:
        'Strip off what strangers called it and this is underneath. Not a religion you sign up to, but an order that was always here and will still be here: something you **notice** rather than join. Which explains the missing founder — nobody founds the weather.',
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
        'For centuries there was no page to keep it on. *Saṃskṛta* means **refined, perfected**: a language engineered for the ear, with exact metre, exact pitch and redundancy deliberately built in, so that two reciters a thousand miles apart still land on the same syllable. The Vedas were chanted long before anyone wrote them down.',
      keyVerse: {
        sanskrit: 'संस्कृत',
        transliteration: 'saṃskṛta',
        meaning: 'put together properly — refined',
      },
      citation: 'The Vedas were transmitted orally, with elaborate mnemonic schemes, long before manuscripts.',
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
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-thread-practice',
      title: 'Practice, not creed',
      takeaway: 'What holds it together is not a belief. It is what you do.',
      storyText:
        'There is no creed to sign, no conversion moment, no belief that gets you thrown out. A Hindu may hold that God is one, or many, or everything, or an entirely open question — and remain a Hindu in perfectly good standing. **Practice is the membership.** This is the hinge the whole tradition turns on.',
      citation: 'The tradition is orthoprax (right practice) rather than orthodox (right belief).',
      checks: [
        {
          id: 'chk:foundations:what-makes-a-hindu',
          kind: 'mcq',
          prompt: 'Your friend asks what actually makes someone a Hindu. What is the truest answer?',
          options: [
            { text: 'Believing a specific set of doctrines about God' },
            { text: 'What they practise — how they live, worship, and mark the year', correct: true },
            { text: 'Being born in India' },
          ],
          why: 'Practice, not creed. It is why one family can hold a monotheist, a polytheist and a sceptic, and nobody is a heretic.',
        },
      ],
    },
    {
      id: 'f-thread-compare',
      title: 'Beside the others',
      takeaway: 'Judaism, Christianity and Islam ask what you believe. This one asks what you do.',
      storyText:
        'Set them side by side and the real difference is not the number of gods. Those three turn on a founder, a book, a confession, and a judgement at the end. **Judaism comes closest** — it too is a practice and a people more than a creed — but it still has Sinai, a covenant, and one God. Hinduism has none of those. And instead of ending, it goes round.',
    },
    {
      id: 'f-thread-streams',
      title: 'Four streams',
      takeaway: 'Held together by practice rather than creed, it could branch without ever breaking.',
      storyText:
        'There was no council to expel anyone, so nobody was expelled. **Vaishnavas** centre Vishnu (and so Rama and Krishna). **Shaivas** centre Shiva. **Shaktas** centre the Goddess. **Smartas** keep several at once and treat them as faces of one thing. Most Hindus never announce which they are — the shrine at home simply tells you.',
      deeper: { ref: 'concept:branches-of-hinduism', label: 'The Four Great Streams' },
    },
    {
      id: 'f-thread-ishta',
      title: 'Your own god',
      takeaway: 'And nobody hands you a branch. You choose the face you love.',
      storyText:
        'Your *iṣṭa-devatā* is your **chosen deity**. A grandmother keeps Krishna, her son keeps Shiva, her granddaughter keeps Durga, all under one roof, and nothing is wrong. That is not the system straining to accommodate them. **That is the system working exactly as designed.**',
      keyVerse: {
        sanskrit: 'इष्टदेवता',
        transliteration: 'iṣṭa-devatā',
        meaning: 'the deity you choose for yourself',
      },
      citation:
        'Ishta-devata is a living practice rather than a scriptural rule — no text assigns anyone a deity.',
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
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-claim-brahman',
      title: 'Brahman',
      takeaway: 'Behind every face there is one reality. It is called Brahman.',
      storyText:
        'All four branches are reaching for this. Not a god sitting somewhere, watching — **the ground of everything that is**: awareness itself, without edges and without a face. Every deity you are about to meet is a face put on *this*, so that a human being has something to love.',
      keyVerse: {
        sanskrit: 'एकं सद्विप्रा बहुधा वदन्ति',
        transliteration: 'ekaṃ sad viprā bahudhā vadanti',
        meaning: 'Truth is one; the wise call it by many names.',
        source: 'Rig Veda 1.164.46',
      },
      citation: 'Rig Veda 1.164.46',
      deeper: { ref: 'concept:brahman-atman', label: 'Brahman & Atman' },
    },
    {
      id: 'f-claim-atman',
      title: 'Atman',
      takeaway: 'And the same reality is what is looking out of you. That is atman.',
      storyText:
        'Turn the telescope around. Notice that you can watch your own thoughts arrive — whatever is doing the watching is *ātman*. Not the body, which changes. Not the mood, which passes. **The witness that has been there the whole time.**',
      keyVerse: {
        sanskrit: 'आत्मन्',
        transliteration: 'ātman',
        meaning: 'the self — the one who is aware',
      },
    },
    {
      id: 'f-claim-tat-tvam-asi',
      title: 'You are that',
      takeaway: 'Those two are not two. That is the whole claim.',
      storyText:
        'The space inside a clay pot and the space of the sky are **not two spaces**. The pot has walls; the space does not. Break the pot and nothing is released — there was only ever one space, briefly shaped. **You are not near the divine. You are made of it, and have forgotten.**',
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
      takeaway: 'So why does it not feel that way? Because the world is misread, not fake. That is maya.',
      storyText:
        '"The world is an illusion" is the mistranslation that has done the most damage. A coiled rope at dusk **is** a rope — and you saw a serpent, and ran. The rope was never unreal. **Your reading of it was.** Maya is the misreading, not the thing; and the fear it produces is entirely genuine while it lasts.',
      keyVerse: {
        sanskrit: 'माया',
        transliteration: 'māyā',
        meaning: 'the veil — appearance mistaken for the whole',
      },
      citation: 'The rope-and-serpent illustration comes from the Advaita Vedanta commentarial tradition.',
      deeper: { ref: 'concept:maya', label: 'Maya' },
    },
    {
      id: 'f-claim-prana',
      title: 'Prana',
      takeaway: 'What the misreading hides is a single live current running through all of it: prana.',
      storyText:
        '*Prāṇa* is breath — but not only breath. It is the animating current in a body, a tree, a wind: the tradition\'s **bridge between the physical and the spiritual**. It is also the most practical idea here, and the reason nearly every Hindu practice begins at the breath. **Steady the breath and you have a handle on the mind.**',
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
      takeaway: 'And everything that current moves through is woven from three strands — the gunas.',
      storyText:
        '*Sattva*: clarity, light, balance. *Rajas*: heat, drive, restlessness. *Tamas*: inertia, heaviness, fog. Not good, better and best — and not three types of person. **Three threads in every person, every mood, every meal**, at shifting ratios. You do not eliminate any of them. You notice which one is currently running you.',
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
  coverImage: GENERIC,
  sections: [
    {
      id: 'f-wheel-samsara',
      title: 'Samsara',
      takeaway: 'If the witness is what you are, then death changes the clothes, not the wearer.',
      storyText:
        'This is *samsara* — the wheel. Birth, a life, death, birth again. The Gita says the self changes bodies **"as a person changes worn-out clothes"**. It is not a horror and it is not a reward. It is simply how things are — until they are not.',
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
      takeaway: 'The wheel is steered by what you do — and karma means action, not fate.',
      storyText:
        'The word literally means **"doing"**. What you do plants what comes back: cause and effect, running on through lives instead of stopping politely at death. Nobody is sentencing you. Which is why *"it\'s my karma, I can\'t change it"* gets it exactly backwards — **karma is precisely the part you can change.**',
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
            { text: 'Nothing — that is roughly what karma means' },
            {
              text: 'Karma is his own action, so it is the one thing he CAN do something about',
              correct: true,
            },
            { text: 'Karma only applies to the next life, not this one' },
          ],
          why: 'Karma is the verb, not the sentence. Treating it as fate turns the most agency-heavy idea in the tradition into an excuse — the single most common mistake outsiders and insiders both make.',
        },
      ],
    },
    {
      id: 'f-wheel-dharma',
      title: 'Dharma',
      takeaway: 'Which makes the urgent question not "what is the rule?" but "what is mine to do?"',
      storyText:
        'That question is *dharma*. Not ten commandments issued to everyone: a soldier\'s dharma and a mother\'s dharma are **genuinely different, and both are right**. It is why Hindu ethics feels situational to outsiders — it is situational, deliberately, because a rule that fits every life fits no life particularly well.',
      keyVerse: {
        sanskrit: 'धर्म',
        transliteration: 'dharma',
        meaning: 'what upholds — duty, order, the right thing',
      },
      deeper: { ref: 'concept:dharma', label: 'Dharma' },
    },
    {
      id: 'f-wheel-ahimsa',
      title: 'Ahimsa',
      takeaway: 'One answer, though, comes close to universal: cause no harm you do not have to.',
      storyText:
        '*Ahiṃsā* — literally **"non-harming"**. It is the nearest thing the tradition has to a commandment, and it is a discipline rather than a temperament: harmlessness **chosen** by someone perfectly capable of doing otherwise. Gandhi built a movement on it. The Jains push it further than any Hindu does.',
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
      takeaway: 'And the goal is not heaven. It is getting off the wheel altogether.',
      storyText:
        '*Moksha* — release. Waking up out of the whole round of birth and death, because you finally see what you always were. Heaven, in this system, is just another pleasant place you eventually have to leave. **Moksha is the only exit.**',
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
      takeaway: 'Though you are not required to sprint for the exit — pleasure and prosperity are on the list too.',
      storyText:
        'The *puruṣārthas*, the four proper aims of a human life: **dharma** (do right), **artha** (prosper), **kama** (enjoy, desire, love), **moksha** (be free). Look at what made the list. This is **not** an ascetic religion that grudgingly tolerates the world — it is a world-affirming one that also happens to keep a door open at the back.',
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
      takeaway: 'And there are four roads to that door, matched to the kind of person you already are.',
      storyText:
        'The *yogas*. **Bhakti** if you love. **Karma** if you would rather work. **Jnana** if you must reason it through. **Raja** if you can sit still. None outranks another; they are built for different temperaments. **You are not required to become someone else in order to arrive.**',
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
      takeaway: 'Nobody falls in love with a philosophy — so it grew faces. Start with three.',
      storyText:
        'The *Trimurti*: **Brahma makes, Vishnu keeps, Shiva dissolves.** Notice what that third job means — destruction here is not evil, it is **what makes room**. The universe breathes in, and out, and in. (Oddly, Brahma the creator is barely worshipped anywhere. Making it, apparently, was the easy part.)',
      citation: 'The Trimurti as a formal triad is a Puranic development.',
    },
    {
      id: 'f-faces-avatar',
      title: 'Vishnu comes down',
      takeaway: 'One of the three has a habit: when things go badly wrong, Vishnu comes down.',
      storyText:
        'An *avatāra* — literally a **"crossing-down"** into the world. And this single fact untangles half the confusion a beginner has: **Rama is Vishnu. Krishna is Vishnu.** They are not rival gods competing for your attention. They are the same god, twice, in two different emergencies.',
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
      takeaway: 'And not one of them can act at all without her. Shakti is the power itself.',
      storyText:
        '*Shakti* means **energy, capability, power** — and Shiva without her is famously described as inert. She is one goddess with many tempers: **Parvati is Durga is Kali** — the wife, the warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.',
      keyVerse: {
        sanskrit: 'शक्ति',
        transliteration: 'śakti',
        meaning: 'power — the ability to act at all',
      },
      citation: 'Devi Mahatmya — the Goddess as the supreme power',
      deeper: { ref: 'deity:durga', label: 'Durga' },
    },
    {
      id: 'f-faces-family',
      title: 'The family map',
      takeaway: 'Six names and their relationships, and any Hindu story becomes readable.',
      storyText:
        'Each god paired with a goddess. Vishnu descending as Rama and Krishna. Shiva and Parvati with a son — **Ganesha, greeted first, before anything at all begins**. And Hanuman, who can do absolutely anything and wants nothing except to serve Rama. **That last one is held up as the ideal**, which tells you a great deal about what the tradition actually admires.',
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
      takeaway: 'There is no one book. There is a library, and it has two shelves.',
      storyText:
        '*Shruti* — "heard" — is the Vedas and, at their end, the **Upanishads**: received rather than authored, and holding the real authority. Everything in **Core Beliefs** came from that shelf — *brahman*, *atman*, "you are that". *Smriti* — "remembered" — is the Gita, the epics, the Puranas: retold, adapted, argued with. **The stories everyone actually knows live on the second shelf.**',
    },
    {
      id: 'f-library-epics',
      title: 'The two epics',
      takeaway: 'On that second shelf sit two epics: one man does right at any cost, one family destroys itself.',
      storyText:
        'The **Ramayana**: Rama is exiled, Sita is taken, Hanuman finds her, Ravana falls — a story about holding to your duty when it costs you everything. The **Mahabharata**: two halves of one family go to war over a throne, and almost everyone loses. Far longer, far murkier, and far more honest about how people actually are.',
    },
    {
      id: 'f-library-gita',
      title: 'The Gita\'s moment',
      takeaway: 'And inside the second epic, a soldier puts down his bow and gets a 700-verse answer.',
      storyText:
        'Arjuna sees his own cousins and teachers in the army opposite, and he cannot do it. What his charioteer says next *is* the **Bhagavad Gita** — and the charioteer is Krishna, who is Vishnu, as you now know. The most-read text in Hinduism is 700 verses of a man being talked out of a breakdown. Which is precisely why it travels.',
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
      takeaway: 'None of this is a religion you read. It is one you do — beginning with a guest.',
      storyText:
        '"Idol" gets the grammar completely wrong. In *puja* the image is **bathed, dressed, fed, sung to, and put to bed** — precisely the etiquette you would offer an honoured visitor in your home. The question was never "is the statue God?" The question is: **has the guest been welcomed properly?**',
      keyVerse: {
        sanskrit: 'मूर्ति',
        transliteration: 'mūrti',
        meaning: 'a form — something given shape so it can be met',
      },
      citation: 'The sixteen services of puja (shodasha-upachara) are set out in the Agama texts.',
    },
    {
      id: 'f-living-darshan',
      title: 'Darshan and prasad',
      takeaway: 'And you go to see the guest, and to be seen by them.',
      storyText:
        '*Darshan* means **"sight"** — you go to look at the deity, and to be looked at in return. You come home with *prasad*: food that has already been offered, and tasted, by the god. Worship here is **exchange and hospitality**, not petition. Nobody is filing a request.',
      keyVerse: {
        sanskrit: 'दर्शन',
        transliteration: 'darśana',
        meaning: 'seeing — and being seen',
      },
    },
    {
      id: 'f-living-year',
      title: 'The festival year',
      takeaway: 'Scale that from one room to one year, and the calendar becomes a story you can read.',
      storyText:
        '**Diwali**: lamps light the road because Rama is coming home. **Holi**: spring, colour, forgiveness. **Navaratri**: nine nights of the Goddess. **Janmashtami**: Krishna, born at midnight, in a prison cell. You know every one of these characters now — **which means the whole year has just become legible.**',
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
      takeaway: 'And two questions have no tidy answer. Saying so is the honest move.',
      storyText:
        'Within about ninety seconds of telling anyone you are learning about Hinduism, one of these arrives.\n\n**Caste.** The old texts describe a fourfold order; what it became — fixed at birth, brutally hierarchical, defended with scripture — is a real and unfinished injustice, and Hindus have fought it from the inside for centuries. Do not defend it. Explain it.\n\n**Beef.** The cow is honoured as the one who gives without ever taking. Plenty of Hindus eat meat; most will not eat beef.',
      sectionHeader: 'What to actually say',
      teachingText:
        '**"It is complicated, and here is how" is the honest answer — and a far better one than a slogan.** A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.',
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
// disturb the 75-point arithmetic at the top of this file. It renders as an
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

export const takeawaysForAct = (actId: string): string[] =>
  FOUNDATIONS_ACTS.find(a => a.id === actId)
    ?.sections.map(s => s.takeaway)
    .filter((t): t is string => !!t) ?? [];

export const getFoundationsAct = (id: string): FoundationsAct | null =>
  FOUNDATIONS_ACTS.find(a => a.id === id) ?? null;

// Journey ids, in path order. PERMANENT — completion is keyed on these.
export const FOUNDATIONS_JOURNEY_ORDER: string[] = FOUNDATIONS_ACTS.map(a => a.id);
