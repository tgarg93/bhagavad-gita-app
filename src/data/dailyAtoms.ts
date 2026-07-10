// Daily Chai atoms: one small, cited piece of wisdom per day. Each atom is a
// trailhead — it links into a reader item where the app has the content, and
// always hands the thread to Krishna. Selection is deterministic per date so
// the brief is stable across the day and across devices.
//
// Citation standard matches the rest of the app: every claim traces to a
// named text (famous, publicly verifiable loci only); practices without a
// scriptural source say so and cite the tradition honestly.
import { getUpcomingFestivals, getDaysUntilFestival } from './festivals';
import { hasReaderContent } from './readerContent';

export type AtomType = 'why' | 'saying' | 'word' | 'story' | 'festival';

export interface AtomLink {
  label: string;
  route: string;
  params?: Record<string, unknown>;
}

export const ATOM_TAGS: Record<AtomType, string> = {
  why: 'Why do we…?',
  saying: 'A saying to carry',
  word: 'Sanskrit word',
  story: 'Story moment',
  festival: 'Festival lens',
};

export interface DailyAtom {
  id: string;
  type: AtomType;
  hook: string; // the question or line that opens the day
  body: string; // 2-4 sentences, English-first
  citation: string;
  link?: AtomLink;
  krishnaPrompt: string; // pre-seeded question for Ask Krishna
}

const concept = (id: string, label: string): AtomLink => ({
  label,
  route: 'ContentReader',
  params: { contentType: 'concept', contentId: id },
});
const deity = (id: string, label: string): AtomLink => ({
  label,
  route: 'ContentReader',
  params: { contentType: 'deity', contentId: id },
});
const gita = (chapter: number, label: string): AtomLink => ({
  label,
  route: 'GitaVersePlayer',
  params: { chapter },
});

// ---------------------------------------------------------------------------
// Why do we…? — the questions people get asked at family gatherings
// ---------------------------------------------------------------------------
const WHY_ATOMS: DailyAtom[] = [
  {
    id: 'why:charan-sparsh',
    type: 'why',
    hook: 'Why do we touch our elders’ feet?',
    body:
      'Charan sparsh is a physical act of humility — you lower the highest part of yourself to the humblest part of someone whose years hold wisdom, and receive their ashirvada, their blessing, in return. The Upanishads make the reverence formal: honor your mother, your father, and your teacher as you would the divine.',
    citation: 'Taittiriya Upanishad 1.11 — “matru devo bhava, pitru devo bhava, acharya devo bhava”',
    link: concept('dharma', 'Read: Dharma'),
    krishnaPrompt: 'Why does Hinduism place so much weight on honoring elders — and how do I do it sincerely, not just as a ritual?',
  },
  {
    id: 'why:diya-at-dusk',
    type: 'why',
    hook: 'Why do we light a lamp at dusk?',
    body:
      'The diya is the tradition’s oldest metaphor made physical: a single flame standing against the dark. Lighting it at the day’s turning is a small daily enactment of one of the Upanishads’ most loved prayers — lead me from darkness to light.',
    citation: 'Brihadaranyaka Upanishad 1.3.28 — “tamaso ma jyotir gamaya”',
    link: { label: 'Read: Diwali', route: 'FestivalDetail', params: { festivalId: 'diwali-2025' } },
    krishnaPrompt: 'What does the lamp actually stand for — and is there a right way to light one at home?',
  },
  {
    id: 'why:prasad',
    type: 'why',
    hook: 'Why do we eat prasad?',
    body:
      'Food offered first and eaten after is food transformed: the meal stops being fuel and becomes grace returned. The Gita puts it sharply — those who eat what was first offered are freed; those who cook only for themselves, it says, “eat their own sin.”',
    citation: 'Bhagavad Gita 3.13',
    link: gita(3, 'Read: Gita Chapter 3'),
    krishnaPrompt: 'What makes offered food different from ordinary food? Is the change in the food or in me?',
  },
  {
    id: 'why:coconut',
    type: 'why',
    hook: 'Why do we break a coconut at the temple?',
    body:
      'A hard, rough shell; soft white flesh; sweet water hidden inside. Breaking it before the deity is a temple tradition of South India in which the coconut stands for the ego — cracked open so what is pure inside can be offered. The instinct is straight from the Gita: what matters in an offering is never the object, but the surrender.',
    citation: 'South Indian temple tradition; the spirit of offering is Bhagavad Gita 9.26 — “a leaf, a flower, a fruit, or water”',
    link: gita(9, 'Read: Gita Chapter 9'),
    krishnaPrompt: 'If the offering is really about surrender, what should I be “breaking open” in daily life?',
  },
  {
    id: 'why:fasting',
    type: 'why',
    hook: 'Why do we fast on festival days?',
    body:
      'A vrat is not a hunger strike against the body — it is an experiment in who is in charge. For one day, appetite asks and you answer no, and the tradition claims something subtle: when the senses quiet down, what you actually long for becomes audible.',
    citation: 'Vrata tradition; the principle is Bhagavad Gita 2.59 — objects recede for the abstinent, and even the taste for them fades on seeing the Supreme',
    link: gita(2, 'Read: Gita Chapter 2'),
    krishnaPrompt: 'I find fasting hard. What is it supposed to be teaching me beyond willpower?',
  },
  {
    id: 'why:rangoli',
    type: 'why',
    hook: 'Why do we draw rangoli at the doorstep?',
    body:
      'Rice flour and colored powder, laid down at dawn, walked over and gone by night — and redrawn the next morning anyway. The threshold art welcomes guests and goddess alike, and quietly teaches the tradition’s hardest lesson: make something beautiful, then let it go.',
    citation: 'Pan-Indian folk tradition (kolam, muggu, alpana); the non-attachment it enacts is Bhagavad Gita 2.14',
    link: { label: 'Read: Diwali', route: 'FestivalDetail', params: { festivalId: 'diwali-2025' } },
    krishnaPrompt: 'Why does so much Hindu art get deliberately destroyed — rangoli, sand mandalas, visarjan? What is that teaching?',
  },
  {
    id: 'why:tilak',
    type: 'why',
    hook: 'Why do we wear a tilak on the forehead?',
    body:
      'The mark sits where the tradition locates the inner eye — the point between the brows a meditator returns to. Its shapes are a quiet declaration of path: the upward lines of Vishnu’s devotees, the three horizontal lines of ash for Shiva’s. One glance at a forehead once told you someone’s whole spiritual lineage.',
    citation: 'Sampradaya tradition; the Shaiva tripundra is described in the Brihajjabala Upanishad',
    link: deity('shiva', 'Read: Shiva'),
    krishnaPrompt: 'What do the different tilak marks mean, and does wearing one matter if my family never did?',
  },
];

// ---------------------------------------------------------------------------
// A saying to carry — mahavakyas and lines the tradition never stopped quoting
// ---------------------------------------------------------------------------
const SAYING_ATOMS: DailyAtom[] = [
  {
    id: 'saying:tat-tvam-asi',
    type: 'saying',
    hook: '“Tat tvam asi” — You are That.',
    body:
      'Three words a father, Uddalaka, repeats nine times to his son Svetaketu in the Chandogya Upanishad. “That” is Brahman — the reality behind everything. The claim is staggering: the divine you search for outside is what you already are. Much of Hindu philosophy is a two-thousand-year response to this one sentence.',
    citation: 'Chandogya Upanishad 6.8.7',
    link: concept('moksha', 'Read: Moksha'),
    krishnaPrompt: 'If I am already “That,” why do I feel so ordinary? What is tat tvam asi actually asking me to see?',
  },
  {
    id: 'saying:aham-brahmasmi',
    type: 'saying',
    hook: '“Aham Brahmasmi” — I am Brahman.',
    body:
      'Not a boast — a discovery. The Brihadaranyaka Upanishad places these words at the moment a seeker realizes the self they have been protecting and polishing was never separate from the whole. It is one of the four “great sayings” every school of Vedanta must wrestle with.',
    citation: 'Brihadaranyaka Upanishad 1.4.10',
    link: concept('moksha', 'Read: Moksha'),
    krishnaPrompt: 'How is “I am Brahman” different from arrogance? Where does the ego end and this truth begin?',
  },
  {
    id: 'saying:tena-tyaktena',
    type: 'saying',
    hook: '“Tena tyaktena bhunjithah” — Renounce, and enjoy.',
    body:
      'The very first verse of the Isha Upanishad hands you a paradox: everything belongs to the divine, so give it up — and in that letting go, enjoy it fully. Gandhi said that if all the scriptures vanished and only this verse survived, Hinduism would live on.',
    citation: 'Isha Upanishad, verse 1',
    link: concept('karma', 'Read: Karma'),
    krishnaPrompt: 'How can renouncing something let me enjoy it more? Give me an everyday example.',
  },
  {
    id: 'saying:deep-desire',
    type: 'saying',
    hook: '“You are what your deep, driving desire is.”',
    body:
      'The Brihadaranyaka traces a straight line: as your desire is, so is your will; as your will, so your deed; as your deed, so your destiny. Karma begins long before action — it begins in what you quietly want most.',
    citation: 'Brihadaranyaka Upanishad 4.4.5',
    link: concept('karma', 'Read: Karma'),
    krishnaPrompt: 'How do I find out what my deepest desire actually is — and change it if I don’t like the answer?',
  },
  {
    id: 'saying:vasudhaiva',
    type: 'saying',
    hook: '“Vasudhaiva kutumbakam” — The world is one family.',
    body:
      'Small-minded people ask “ours or theirs?”, says the verse; for the large-hearted, the whole earth is kin. Coined in Sanskrit centuries ago, it now hangs in the halls of India’s parliament — the tradition’s answer to every tribalism, ancient and modern.',
    citation: 'Maha Upanishad 6.71–73; also Hitopadesha 1.3.71',
    link: concept('dharma', 'Read: Dharma'),
    krishnaPrompt: 'How do I actually treat strangers as family without being naive about the world?',
  },
  {
    id: 'saying:ahimsa-paramo',
    type: 'saying',
    hook: '“Ahimsa paramo dharmah” — Non-violence is the highest duty.',
    body:
      'The Mahabharata — an epic about a war — is also the text that declares non-violence the highest dharma. That tension is the point: the tradition holds both the battlefield and the vow of harmlessness, and asks you to know which one your moment calls for.',
    citation: 'Mahabharata, Anushasana Parva 117.37',
    link: concept('ahimsa', 'Read: Ahimsa'),
    krishnaPrompt: 'If non-violence is the highest dharma, why does the Gita tell Arjuna to fight?',
  },
  {
    id: 'saying:satyameva',
    type: 'saying',
    hook: '“Satyameva jayate” — Truth alone triumphs.',
    body:
      'You have seen these words your whole life without noticing: they sit beneath the lion capital on every Indian passport and rupee note. They come from the Mundaka Upanishad, which continues — by truth the path of the gods is laid, the path the sages walk to reach the highest.',
    citation: 'Mundaka Upanishad 3.1.6',
    link: concept('dharma', 'Read: Dharma'),
    krishnaPrompt: 'Truth doesn’t always seem to win in real life. What does “satyameva jayate” really claim?',
  },
];

// ---------------------------------------------------------------------------
// Sanskrit word — the vocabulary you already half-know
// ---------------------------------------------------------------------------
const WORD_ATOMS: DailyAtom[] = [
  {
    id: 'word:guru',
    type: 'word',
    hook: 'Guru — the one who removes darkness',
    body:
      'Gu, darkness; ru, its remover. Not merely “teacher” — a guru is anyone whose presence dispels your not-knowing. The word you hear in yoga studios carries a whole theory of how wisdom moves: it cannot be downloaded, only handed over, person to person.',
    citation: 'Traditional etymology given in the Advayataraka Upanishad 16',
    link: concept('bhakti-paths', 'Read: Paths of Bhakti'),
    krishnaPrompt: 'Do I need a guru to grow spiritually, or can books and apps be enough?',
  },
  {
    id: 'word:namaste',
    type: 'word',
    hook: 'Namaste — the bow you say out loud',
    body:
      'Namas, a bow (from nam, to bend), plus te, to you: “I bow to you.” The folded hands are the word made visible. The traditional gloss deepens it: the light in me recognizes the light in you — a theology of equality hiding inside a greeting.',
    citation: 'Sanskrit etymology (nam, “to bow”); namas as reverence appears throughout the Vedas, e.g. the Rudram’s repeated “namah”',
    krishnaPrompt: 'When I say namaste, what am I actually acknowledging in the other person?',
  },
  {
    id: 'word:karma',
    type: 'word',
    hook: 'Karma — the word everyone uses and no one defines',
    body:
      'From kri, “to do.” Karma is simply action — and the tradition’s claim that no action ends when it ends. Every deed plants something. What the West turned into cosmic payback, the Gita treats as physics of the soul: you choose the act, never the fruit.',
    citation: 'Root kri (“to do”); the law of action articulated in Bhagavad Gita 2.47',
    link: concept('karma', 'Read: Karma'),
    krishnaPrompt: 'Is karma punishment, or cause and effect? How should it change what I do today?',
  },
  {
    id: 'word:yoga',
    type: 'word',
    hook: 'Yoga — it never meant stretching',
    body:
      'From yuj, “to yoke, to join.” Yoga is union — of the small self with the vast one — and the disciplines that get you there. The Gita names several: the yoga of action, of devotion, of knowledge. The mat came four thousand years later.',
    citation: 'Root yuj (“to yoke”); the Gita’s working definition at 2.48 — “evenness of mind is called yoga”',
    link: concept('bhakti-paths', 'Read: Paths of Bhakti'),
    krishnaPrompt: 'Which yoga fits my temperament — action, devotion, or knowledge? How do I tell?',
  },
  {
    id: 'word:om',
    type: 'word',
    hook: 'Om — the syllable the universe hums in',
    body:
      'The Mandukya Upanishad devotes itself entirely to this one sound: A-U-M, mapped to waking, dreaming, and deep sleep — and the silence after it, to what you are beyond all three. “Om is all this,” the text begins. Every mantra in the tradition rides on it.',
    citation: 'Mandukya Upanishad 1',
    link: concept('moksha', 'Read: Moksha'),
    krishnaPrompt: 'What is actually happening when I chant Om? Why this sound and not another?',
  },
  {
    id: 'word:avatar',
    type: 'word',
    hook: 'Avatar — a word that descended into English',
    body:
      'Ava-tri: “to cross down.” An avatar is the divine descending into the world when it is needed most. Krishna states the job description himself: whenever dharma declines, “I send myself forth, age after age.” Silicon Valley borrowed the word; the Gita wrote its contract.',
    citation: 'Bhagavad Gita 4.7–8',
    link: deity('krishna', 'Read: Krishna'),
    krishnaPrompt: 'Why does the divine descend as avatars instead of just fixing the world directly?',
  },
  {
    id: 'word:mantra',
    type: 'word',
    hook: 'Mantra — an instrument for the mind',
    body:
      'Man, the mind; tra, a tool — or, by another reading, that which protects. A mantra is a phrase engineered to be repeated until it steadies the one repeating it. The tradition’s insight is practical: the mind will chatter regardless, so give it something worth saying.',
    citation: 'Traditional etymology (man + tra); mantra practice runs from the Rig Veda’s hymns to japa in the Gita (10.25 — “of sacrifices I am japa”)',
    krishnaPrompt: 'How do I start a simple mantra practice — which one, and what should I expect?',
  },
];

// ---------------------------------------------------------------------------
// Story moment — three sentences that make you want the whole story
// ---------------------------------------------------------------------------
const STORY_ATOMS: DailyAtom[] = [
  {
    id: 'story:ganesha-race',
    type: 'story',
    hook: 'The race around the world',
    body:
      'Ganesha and his brother Kartikeya were challenged: whoever circles the world first wins the prize. Kartikeya launched at once on his peacock. Ganesha walked one slow circle around his parents, folded his hands, and said, “You are my world.” He won. What did the judges see that Kartikeya didn’t?',
    citation: 'Shiva Purana, Rudra Samhita',
    link: deity('ganesha', 'Read the full story: Ganesha'),
    krishnaPrompt: 'What does Ganesha’s trick in the race really teach — cleverness, or something deeper about what “the world” is?',
  },
  {
    id: 'story:ganesha-head',
    type: 'story',
    hook: 'The boy at the door',
    body:
      'Parvati shaped a boy from turmeric paste and set him to guard her door. He was so loyal he refused entry even to Shiva — who, unknowing and furious, struck off the child’s head. What follows — a mother’s grief, a father’s remorse, and the head of an elephant — explains the most beloved face in all of Hinduism.',
    citation: 'Shiva Purana, Rudra Samhita (Kumara Khanda)',
    link: deity('ganesha', 'Read the full story: Ganesha'),
    krishnaPrompt: 'The Ganesha story starts with a terrible mistake by a god. Why does the tradition tell it that way?',
  },
  {
    id: 'story:hanuman-leap',
    type: 'story',
    hook: 'The leap he didn’t know he could make',
    body:
      'The ocean to Lanka was a hundred yojanas wide, and the monkeys despaired — until old Jambavan turned to Hanuman and reminded him of what a curse had made him forget: his own strength. Hanuman grew vast, pressed the mountain flat beneath his feet, and leapt. He had the power all along; he needed someone to say so.',
    citation: 'Valmiki Ramayana, Sundara Kanda 1 (the reminder: Kishkindha Kanda 66)',
    link: deity('hanuman', 'Read the full story: Hanuman'),
    krishnaPrompt: 'Hanuman forgot his own strength until reminded. What strength might I be forgetting?',
  },
  {
    id: 'story:samudra-manthan',
    type: 'story',
    hook: 'The ocean that gave poison before nectar',
    body:
      'Gods and demons churned the cosmic ocean for the nectar of immortality — and the first thing to surface was halahala, a poison that could end the world. Shiva drank it and held it in his throat, which turned blue forever. The tradition’s quiet warning: every great churning yields poison before it yields nectar, and someone must be willing to swallow it.',
    citation: 'Bhagavata Purana, Canto 8; Vishnu Purana 1.9',
    link: deity('shiva', 'Read: Shiva, the Neelakantha'),
    krishnaPrompt: 'What does the churning of the ocean say about the hard middle of any worthwhile effort?',
  },
  {
    id: 'story:prahlada',
    type: 'story',
    hook: 'The boy who wouldn’t stop praying',
    body:
      'A demon king demanded to be worshipped as god; his own small son Prahlada kept praying to Vishnu instead. Poison, elephants, a bonfire in the arms of the fireproof aunt Holika — nothing touched the boy. Holika burned; Prahlada walked out singing. That bonfire is why Holi begins with one.',
    citation: 'Bhagavata Purana, Canto 7',
    link: { label: 'Read: Holi', route: 'FestivalDetail', params: { festivalId: 'holi-2025' } },
    krishnaPrompt: 'Prahlada defied his own father out of devotion. How does the tradition think about faith versus family?',
  },
  {
    id: 'story:govardhan',
    type: 'story',
    hook: 'The mountain held up on a little finger',
    body:
      'When the villagers of Vraja skipped Indra’s worship, the storm god answered with a deluge meant to drown them. Krishna — a boy of seven — lifted Govardhan hill on the little finger of one hand and held it as an umbrella for seven days. The lesson under the miracle: shelter what shelters you, and old powers do not get worship merely for being old.',
    citation: 'Bhagavata Purana, Canto 10 (chapters 24–25)',
    link: deity('krishna', 'Read the full story: Krishna'),
    krishnaPrompt: 'Why did Krishna stop the worship of Indra? What was he teaching the villagers about worship itself?',
  },
  {
    id: 'story:savitri',
    type: 'story',
    hook: 'The woman who argued with Death',
    body:
      'Savitri married Satyavan knowing he had one year to live. When Yama, god of death, came to collect, she simply followed him — and debated dharma so flawlessly, step after step, that Yama granted her boons until the only consistent outcome left was her husband’s life. Death himself, out-reasoned by devotion.',
    citation: 'Mahabharata, Vana Parva (the Pativrata-mahatmya, ch. 293–299)',
    krishnaPrompt: 'Savitri won her husband back through reasoning with Death. What does her story say about persistence and dharma?',
  },
];

const ATOMS_BY_TYPE: Record<Exclude<AtomType, 'festival'>, DailyAtom[]> = {
  why: WHY_ATOMS,
  saying: SAYING_ATOMS,
  word: WORD_ATOMS,
  story: STORY_ATOMS,
};

export const ALL_AUTHORED_ATOMS: DailyAtom[] = [
  ...WHY_ATOMS,
  ...SAYING_ATOMS,
  ...WORD_ATOMS,
  ...STORY_ATOMS,
];

// Weekday → atom type. Two why-days and two story/word days keep the week
// varied; sayings and stories sit where there's weekend reading time.
const WEEKDAY_TYPE: Exclude<AtomType, 'festival'>[] = [
  'story', // Sun
  'why', // Mon
  'saying', // Tue
  'word', // Wed
  'story', // Thu
  'why', // Fri
  'word', // Sat
];

const dayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
};

// Within 7 days of a festival, the brief turns toward it: countdown + the
// festival's own hook, built from data rather than authored per-day.
const festivalAtomFor = (date: Date): DailyAtom | null => {
  const next = getUpcomingFestivals(1)[0];
  if (!next) return null;
  const days = getDaysUntilFestival(next);
  if (days === null || days < 0 || days > 7) return null;
  const when = days === 0 ? 'is today' : days === 1 ? 'is tomorrow' : `is in ${days} days`;
  return {
    id: `festival:${next.id}:${days}`,
    type: 'festival',
    hook: `${next.name} ${when}`,
    body: next.significance
      ? `${next.significance} Read the story now, so the day itself needs no explaining.`
      : `${next.name} is approaching — read its story now so the day itself needs no explaining.`,
    citation: 'From the festival guide',
    link: hasReaderContent('festival', next.id)
      ? {
          label: `Read: ${next.name}`,
          route: 'ContentReader',
          params: { contentType: 'festival', contentId: next.id },
        }
      : { label: `Read: ${next.name}`, route: 'FestivalDetail', params: { festivalId: next.id } },
    krishnaPrompt: `What should I know about ${next.name} before it arrives — and how do I celebrate it well?`,
  };
};

// Deterministic pick for a date: festival lens wins near a festival;
// otherwise the weekday's type, indexed by a stable hash of the date.
export const getDailyAtom = (date: Date = new Date()): DailyAtom => {
  const festival = festivalAtomFor(date);
  if (festival) return festival;
  const pool = ATOMS_BY_TYPE[WEEKDAY_TYPE[date.getDay()]];
  const index = (dayOfYear(date) + date.getFullYear()) % pool.length;
  return pool[index];
};
