// STAGE CAPSTONES — the thing that ends each stage of the journey.
//
// Every stage states what you'll be able to DO when you finish it. A capstone is
// that promise, made testable: the rubric IS the objective. You don't finish a
// stage by scrolling to the end of it; you finish it by doing the thing.
//
// Passing one confers the stage's level directly (a RITE — see progressionService,
// where a rite is a FLOOR and never a ceiling). That is also what makes Rishi and
// Guru reachable at all: the whole journey only ever yielded 2,962 points against
// thresholds of 3,000 and 5,000, so the top two levels were unreachable by any
// amount of reading.
//
// Foundations (module 0) has its own capstone inside foundations.ts — it was the
// first consumer of this mechanism and predates the generalisation. This file is
// stages 1–5.
//
// The five ids below are PERMANENT — completion is keyed on them (CLAUDE.md).
import { NarrativeSection } from './narrativeTypes';
import { Capstone } from './checkTypes';
// Type-only: journeyPath imports this file back (for the path), so a value
// import here would be a runtime cycle. `import type` is erased.
import type { JourneyModule } from './journeyPath';

export interface StageCapstone {
  id: string; // journey id is `capstone:${id}` — PERMANENT
  module: JourneyModule;
  // The stage's name, carried here rather than looked up from JOURNEY_MODULES:
  // journeyPath already imports readerContent, so readerContent importing
  // journeyPath back would be a runtime cycle. Keep it in sync with
  // JOURNEY_MODULES.
  stageName: string;
  title: string;
  subtitle: string;
  // The stage's objective, in the second person. Shown on the journey stage card
  // as a promise, and on this capstone's celebration as something earned.
  objective: string;
  kicker: string;
  intro: string[];
  coverImage: number;
  // One recap page. Deliberately carries NO `takeaway`, so it is not banked as a
  // card and cannot disturb any point arithmetic.
  recap: NarrativeSection;
  capstone: Capstone;
}

// TODO cover shopping list: capstone-{ideas,gods,gita,stories,living}-cover.jpg
const GENERIC = require('../../assets/images/covers/generic-cover.jpg');

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 1 — THE CORE IDEAS  →  Sadhaka
// ═══════════════════════════════════════════════════════════════════════════
const IDEAS: StageCapstone = {
  id: 'ideas',
  stageName: 'The Core Ideas',
  module: 1,
  title: 'Put Them Right',
  subtitle: 'The one misunderstanding worth correcting',
  objective:
    'Explain karma, dharma and moksha properly — and correct someone who thinks karma means fate.',
  kicker: 'You have the ideas. Now use one.',
  intro: [
    'You have read the eight ideas the tradition actually turns on — not as cards this time, but whole.',
    'Here is the test. Not "define karma" — anyone can memorise a definition. **Someone is about to get it wrong in front of you.** Put them right.',
  ],
  coverImage: GENERIC,
  recap: {
    id: 'cap-ideas-recap',
    title: 'What you have been carrying',
    subtitle: 'Eight ideas, read whole.',
    bullets: [
      '**Dharma** — the right thing depends on who you are and where you stand. Not one rulebook.',
      '**Karma** — action, not fate. What you do plants what comes back.',
      '**Samsara** — the wheel. The body is changed; the one wearing it is not.',
      '**Moksha** — the exit. Not a better next life, but no next life at all.',
      '**Brahman & Atman** — the reality behind everything, and the witness inside you, are one thing.',
      '**Maya** — the world is misread, not fake. The rope was always a rope.',
      '**The three gunas** — sattva, rajas, tamas: three threads in every person, at shifting ratios.',
      '**Ahimsa** — harm nothing you do not have to. A discipline chosen, not a temperament.',
    ],
  },
  capstone: {
    id: 'chk:capstone:ideas',
    kind: 'capstone',
    riteId: 'stage-ideas',
    conferLevel: 3, // Sadhaka
    prompt:
      'A friend has had a rough year. He shrugs and says: **"It\'s my karma. Nothing I can do about it."**\n\nPut him right — kindly. In your own words, the way you\'d actually say it to him.',
    rubric: [
      'Karma means action — it is something you do, not something done to you',
      'So it is precisely the part he CAN change; treating it as fate gets it backwards',
      'Actions have consequences that carry forward, across lives — that is what keeps the wheel turning',
      'Dharma: what is right for him depends on his situation, not on a universal rulebook',
      'Moksha: the goal is not a better next turn of the wheel but getting off it',
    ],
    rubricSource: [
      'Karma',
      'Karma',
      'Samsara',
      'Dharma',
      'Moksha',
    ],
    passCount: 3, // 3 of 5 — the first two are the ones that matter
    modelAnswer:
      'Karma doesn\'t mean fate — it literally means action. It\'s what you do, not a sentence handed down to you, so it\'s exactly the part you can change. What you do has consequences that carry forward, and that\'s what keeps the wheel turning. What\'s right for you depends on who you are and where you stand — and the goal isn\'t a better next life, it\'s getting off the wheel altogether.',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 2 — THE GODS  →  Bhakta
// ═══════════════════════════════════════════════════════════════════════════
const GODS: StageCapstone = {
  id: 'gods',
  stageName: 'The Gods',
  module: 2,
  title: 'Who Is That?',
  subtitle: 'A temple, a murti, and a friend who asks',
  objective:
    "Walk into a temple and know who you're looking at, and how they're related.",
  kicker: 'Seven faces. You know all of them now.',
  intro: [
    'The gods stop being a crowd the moment you can see how they hang together — who descends, who is married to whom, who is the same one under another name.',
    'So: you are standing in a temple with a friend who has never been in one. **They point.**',
  ],
  coverImage: GENERIC,
  recap: {
    id: 'cap-gods-recap',
    title: 'The whole cast',
    subtitle: 'And, far more usefully, how they are related.',
    bullets: [
      '**Brahma makes, Vishnu keeps, Shiva dissolves** — three jobs, not three ranks. Destruction here makes room.',
      '**Rama and Krishna are both Vishnu**, come down in a body. Not rivals — the same god, twice.',
      '**Shakti is the power itself.** Shiva without her is described as inert. Parvati is Durga is Kali.',
      '**Ganesha is greeted first**, before anything at all begins.',
      '**Hanuman can do anything and wants nothing** except to serve Rama — which is held up as the ideal.',
      'Every god is paired with a goddess: Saraswati with Brahma, Lakshmi with Vishnu, Parvati with Shiva.',
    ],
  },
  capstone: {
    id: 'chk:capstone:gods',
    kind: 'capstone',
    riteId: 'stage-gods',
    conferLevel: 4, // Bhakta
    prompt:
      'You take a friend into a temple for the first time. They look around at all of it — the blue one with the flute, the elephant head, the one with the trident — and ask you, honestly: **"Okay… who are all these? And are they different gods, or not?"**\n\nAnswer them.',
    rubric: [
      'They are faces of one reality — many forms, not many rival gods',
      'Rama and Krishna are both Vishnu, descended (avatara)',
      'Brahma creates, Vishnu preserves, Shiva dissolves — three jobs',
      'The Goddess is not a sidekick — shakti is the power the gods act by; Parvati, Durga and Kali are one',
      'Ganesha is greeted first, before any undertaking',
    ],
    rubricSource: ['Krishna', 'Krishna', 'Shiva', 'Durga', 'Ganesha'],
    passCount: 3,
    modelAnswer:
      "They're faces of one reality, not rival gods — you pick the one you love. The big three are Brahma who makes, Vishnu who keeps, and Shiva who dissolves. Rama and Krishna are both Vishnu, come down in a body. The Goddess isn't anyone's sidekick — she's the power they act by, and Parvati, Durga and Kali are the same one in different tempers. And the elephant head is Ganesha, who you greet first, before anything begins.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 3 — THE GITA  →  Jnani
// ═══════════════════════════════════════════════════════════════════════════
const GITA: StageCapstone = {
  id: 'gita',
  stageName: 'The Gita',
  module: 3,
  title: 'What Krishna Actually Says',
  subtitle: 'Seven hundred verses, in your own words',
  objective:
    "You've read the Gita end to end, and can say what Krishna actually tells Arjuna to do.",
  kicker: 'You have read all seven hundred verses. Now say what they were for.',
  intro: [
    'Most people who quote the Gita have not read it. You have — all eighteen chapters, all seven hundred verses.',
    'Which means you can answer the question that trips almost everyone up. It is not "what is the Gita about". It is: **what does Krishna actually tell him to do?**',
  ],
  coverImage: GENERIC,
  recap: {
    id: 'cap-gita-recap',
    title: 'The argument, from one end to the other',
    subtitle: 'Eighteen chapters, compressed.',
    bullets: [
      '**Arjuna collapses** — not from cowardice, but because both choices are wrong (ch. 1).',
      '**The self does not die.** It changes bodies as a person changes worn-out clothes (ch. 2).',
      '**Act — do not withdraw.** Renouncing the action is not renunciation (ch. 3).',
      '**Act without attachment to the fruit.** Do the work; release the outcome (ch. 2–5).',
      '**Your own dharma, done badly, beats another\'s done well.** It has to be *yours* (ch. 3, 18).',
      '**The cosmic form** — Arjuna sees what he is arguing with, and it terrifies him (ch. 11).',
      '**Love is enough.** Bhakti is open to anyone, whatever their temperament (ch. 12).',
      '**Surrender, and act anyway.** He picks up the bow — resolved, not resigned (ch. 18).',
    ],
  },
  capstone: {
    id: 'chk:capstone:gita',
    kind: 'capstone',
    riteId: 'stage-gita',
    conferLevel: 5, // Jnani
    prompt:
      'Someone who has never read it asks you: **"So what does Krishna actually tell Arjuna to do?"**\n\nNot what the Gita is about — what he tells him to *do*. In your own words.',
    rubric: [
      'Act — do not withdraw. Refusing to act is not renunciation',
      'Act without attachment to the fruit — do the work, release the outcome',
      'Do your OWN duty (svadharma), not someone else\'s, even if you do it badly',
      'The self is not killed and does not die — grief for it is misplaced',
      'Surrender / devotion — bring it to me, and act anyway',
    ],
    rubricSource: [
      'Chapter 3 · The Path of Selfless Action',
      'Chapter 2 · The Secret of Who You Really Are',
      'Chapter 18 · The Final Teaching',
      'Chapter 2 · The Secret of Who You Really Are',
      'Chapter 12 · The Path of Love',
    ],
    passCount: 3,
    modelAnswer:
      "He tells him to fight — to act, not to withdraw, because refusing to act isn't renunciation, it's just another action with worse consequences. But to act without clinging to the outcome: do the work, let go of the fruit. And to do his own duty, not somebody else's, even imperfectly. Underneath it all: the self isn't killed and doesn't die, so his grief is misplaced — bring it to Krishna, and then act anyway.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 4 — THE STORIES  →  Rishi
// ═══════════════════════════════════════════════════════════════════════════
const STORIES: StageCapstone = {
  id: 'stories',
  stageName: 'The Stories',
  module: 4,
  title: 'Tell It',
  subtitle: 'The Ramayana, in a minute, from memory',
  objective: 'Tell the Ramayana. Know why Nachiketa questioned Death.',
  kicker: 'A story you have read is not yet a story you can tell.',
  intro: [
    'You have read the whole Ramayana — all seven books — and sat with the dialogues that the Upanishads are actually made of.',
    'There is a difference between having read a story and being able to **tell** it. This is the second one.',
  ],
  coverImage: GENERIC,
  recap: {
    id: 'cap-stories-recap',
    title: 'What you have read',
    subtitle: 'Seven books, and four conversations.',
    bullets: [
      '**Bala** — a bow is broken, and a marriage made.',
      '**Ayodhya** — a coronation undone by two old promises, and a prince who bows to them.',
      '**Aranya** — a golden deer, a line drawn in the dust, and an abduction.',
      '**Kishkindha** — an alliance of the broken.',
      '**Sundara** — Hanuman leaps an ocean and finds her.',
      '**Yuddha** — a bridge, a fall, and a homecoming fourteen years in the making.',
      '**Uttara** — the hard aftermath of victory.',
      '**Nachiketa** asked Death the one question no one else would answer. **Svetaketu** watched salt vanish into water and was told: *you are that*.',
    ],
  },
  capstone: {
    id: 'chk:capstone:stories',
    kind: 'capstone',
    riteId: 'stage-stories',
    conferLevel: 6, // Rishi
    prompt:
      'A child asks you to tell them the Ramayana. **You have about a minute.**\n\nTell it — and then say, in a line, what it is actually about.',
    rubric: [
      'Rama is exiled — and goes, because his father gave his word',
      'Sita is taken by Ravana',
      'Hanuman crosses the ocean and finds her',
      'Ravana falls, and Rama comes home',
      'It is about holding to what is right when it costs you everything',
    ],
    rubricSource: [
      'Ayodhya Kanda',
      'Aranya Kanda',
      'Sundara Kanda',
      'Yuddha Kanda',
      'Ayodhya Kanda',
    ],
    passCount: 3,
    modelAnswer:
      "Rama is about to be crowned when two old promises force his father to exile him instead — and he goes, without argument, because his father gave his word. In the forest his wife Sita is stolen by Ravana. Hanuman, who can do anything, leaps an ocean to find her; an army follows across a bridge of stones; Ravana falls, and Rama comes home to lamps lit all along the road. It's a story about holding to what's right when it costs you everything you have.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// STAGE 5 — LIVING IT  →  Guru
// ═══════════════════════════════════════════════════════════════════════════
const LIVING: StageCapstone = {
  id: 'living',
  stageName: 'Living It',
  module: 5,
  title: 'Your Own Path',
  subtitle: 'The last question is about you',
  objective:
    "Keep the festival year, know what puja is, and know which of the four paths fits how you're built.",
  kicker: 'Every question so far has been about the tradition. This one is about you.',
  intro: [
    'You know the four paths, what happens in a puja, and what each festival in the year is actually retelling.',
    'So there is nothing left to test — except the thing the whole tradition is for. **Which of the four roads is yours, and why that one?**',
  ],
  coverImage: GENERIC,
  recap: {
    id: 'cap-living-recap',
    title: 'What it looks like on an ordinary Tuesday',
    subtitle: 'Four paths, one welcome, and a year of stories.',
    bullets: [
      '**Bhakti** — through love. **Karma** — through work. **Jnana** — through knowledge. **Raja** — through stillness. None outranks another.',
      '**The murti is not the god.** In puja the image is bathed, dressed, fed and sung to — the etiquette of an honoured guest.',
      '**Darshan** — you go to see, and be seen. **Prasad** — you come home with food the god has already tasted.',
      '**Diwali** is Rama coming home. **Holi** is spring and forgiveness. **Navaratri** is nine nights of the Goddess. **Janmashtami** is Krishna, born at midnight in a prison.',
    ],
  },
  capstone: {
    id: 'chk:capstone:living',
    kind: 'capstone',
    riteId: 'stage-living',
    conferLevel: 7, // Guru
    prompt:
      'The last question is not about Hinduism. It is about you.\n\n**Which of the four paths fits how you are actually built — and why that one?** Say what walking it would look like, honestly, in your life as it is.',
    rubric: [
      'Names one of the four paths — bhakti (love), karma (work), jnana (knowledge) or raja (stillness)',
      'Says why it fits their temperament — not why it is best, why it is theirs',
      'Describes what practising it would actually look like for them',
      'Shows they know the paths are equal, and matched to different people',
    ],
    rubricSource: [
      'Bhakti & the Paths of Yoga',
      'Bhakti & the Paths of Yoga',
      'Bhakti & the Paths of Yoga',
      'Bhakti & the Paths of Yoga',
    ],
    passCount: 2, // the most generous of the six — there is no wrong answer here
    modelAnswer:
      "There isn't a right answer to this one — that is the whole point of there being four. Karma yoga suits someone who would rather do than sit; bhakti someone who loves before they reason; jnana someone who has to think it through to believe it; raja someone who can be still. They are not ranked. You are not required to become someone else in order to arrive.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════

export const STAGE_CAPSTONES: StageCapstone[] = [IDEAS, GODS, GITA, STORIES, LIVING];

export const getStageCapstone = (id: string): StageCapstone | null =>
  STAGE_CAPSTONES.find(c => c.id === id) ?? null;

export const capstoneForModule = (module: JourneyModule): StageCapstone | null =>
  STAGE_CAPSTONES.find(c => c.module === module) ?? null;

// Every rite this file confers, for progressionService. Foundations' own rite
// ('foundations-capstone', level 2) lives in foundations.ts and is added there.
export const STAGE_RITES: { riteId: string; conferLevel: number }[] = STAGE_CAPSTONES.map(c => ({
  riteId: c.capstone.riteId,
  conferLevel: c.capstone.conferLevel,
}));
