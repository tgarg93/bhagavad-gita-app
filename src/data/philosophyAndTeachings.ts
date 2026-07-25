// Philosophy and Teachings Data for Dharma App
// Core Hindu philosophical concepts and life teachings

import { NarrativeSection, SourceNote } from './narrativeTypes';

export interface PhilosophicalConcept {
  id: string;
  name: string;
  sanskritName: string;
  category: 'core_concepts' | 'life_principles' | 'spiritual_paths' | 'ethical_values';
  description: string;
  detailedExplanation: string;
  etymology: string;
  keyAspects: string[];
  practicalApplications: PracticalApplication[];
  relatedConcepts: string[];
  scriptureReferences: ScriptureReference[];
  modernRelevance: string;
  commonMisunderstandings: string[];
  examples: ConceptExample[];
  meditation: MeditationPractice;
  audioGuide: AudioGuide;
  podcastEpisodes: PodcastEpisode[];
  images: {
    heroImage: string;
    iconImage: string;
    infographics?: string[];
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  // Narrative reading experience (Gita-style sections)
  sections?: ConceptSection[];
  // Primary texts the content was verified against (rendered as a footer card)
  sources?: SourceNote[];
  // Chapter-style reflection questions (exactly 3, Gita pattern)
  reflectionQuestions?: string[];
  // ——— Jigyasu interstitials (optional; render on presence, see readerContent) ———
  // The thesis line shown on the cover in place of the bare subtitle.
  kicker?: string;
  // The "what you'll learn" checklist: rendered by the kind:'intro' page, ticked
  // by kind:'waypoint' pages (via learnIndex), and replayed checked on the
  // celebration. Sections with kind:'intro'/'waypoint' need this to render.
  learnItems?: string[];
  // Optional short one-clause recaps for the celebration (falls back to
  // learnItems when absent). Distinct from learnItems only when the recap
  // wording should differ from the promise wording.
  bankedTakeaways?: string[];
  // The "what's next" teaser shown above the next-step button on the celebration.
  handoff?: string;
}

// The shared narrative shape now lives in narrativeTypes.ts (reused by
// festivals and deities); ConceptSection remains as an alias for existing code.
export type ConceptSection = NarrativeSection;

export interface PracticalApplication {
  situation: string;
  application: string;
  benefits: string[];
  tips: string[];
}

export interface ConceptExample {
  id: string;
  title: string;
  scenario: string;
  explanation: string;
  lesson: string;
}

export interface MeditationPractice {
  technique: string;
  duration: string;
  instructions: string[];
  benefits: string[];
  audioUrl?: string;
}

export interface AudioGuide {
  narrator: string;
  duration: string;
  audioUrl: string;
  topics: string[];
}

export interface ScriptureReference {
  id: string;
  text: string;
  reference: string;
  quote: string;
  context: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  topics: string[];
}

// Philosophy and Teachings Data
export const philosophyData: PhilosophicalConcept[] = [
  {
    id: 'hinduism-overview',
    name: 'What is Hinduism?',
    sanskritName: 'सनातन धर्म',
    category: 'core_concepts',
    description: 'The map before the journey — one tradition, many rivers',
    detailedExplanation: 'Hinduism is not one religion in the way the word usually means. It has no founder, no single scripture, no central authority — and it never wanted them. It is a family of traditions that grew up together over four thousand years around one shared set of questions: What am I, really? Why is there suffering? What happens after death? And how should a person live? The tradition\'s own name for itself is Sanatana Dharma — the eternal way. This overview is the map: the books, the gods, the goal, and the many honest paths to it.',
    etymology: '"Hindu" began as geography, not theology: the Persian pronunciation of "Sindhu," the river Indus — the people who lived beyond that river. The tradition\'s own name, Sanatana Dharma, means "the eternal dharma."',
    keyAspects: [
      'No founder, no single book, no central authority — a family of traditions',
      'Shruti (heard) and Smriti (remembered): the two shelves of scripture',
      'One ultimate reality, Brahman, approached through many divine faces',
      'Four aims of life: dharma, artha, kama, moksha',
      'Many valid paths — action, devotion, knowledge, meditation',
    ],
    practicalApplications: [
      {
        situation: 'Someone asks you "so what do Hindus actually believe?"',
        application: 'Start with the questions, not the gods: Hinduism is a 4,000-year conversation about who you are and how to live, held together by shared ideas (karma, dharma, moksha) rather than a single creed',
        benefits: ['Confidence in your own tradition', 'Conversations instead of embarrassment', 'A frame the rest of your learning hangs on'],
        tips: ['One reality, many faces — lead with that', 'It\'s a library, not a book', 'Your family\'s way is one honest way among many'],
      },
    ],
    relatedConcepts: ['dharma', 'karma', 'moksha', 'bhakti-paths'],
    scriptureReferences: [
      {
        id: 'overview-rigveda-1',
        text: 'Rig Veda',
        reference: 'Mandala 1, Hymn 164, Verse 46',
        quote: 'They call him Indra, Mitra, Varuna, Agni... To what is One, sages give many a title',
        context: 'The oldest scripture\'s own answer to "why so many gods?" — Truth is one; the wise call it by many names',
      },
      {
        id: 'overview-chandogya-1',
        text: 'Chandogya Upanishad',
        reference: '6.8.7',
        quote: 'Tat tvam asi — That thou art',
        context: 'Uddalaka teaches his son that the self within and the reality behind everything are one',
      },
    ],
    modernRelevance: 'For anyone who grew up around the tradition without ever being handed the map — or anyone meeting it fresh — this overview turns a blur of gods, books, and rituals into one coherent picture, so everything you learn afterward has a place to land.',
    commonMisunderstandings: [
      'Hinduism is not polytheism in the simple sense — "Truth is one; the wise call it by many names" (Rig Veda 1.164.46)',
      'There is no single "official" Hinduism — Shaiva, Vaishnava, Shakta, and Smarta traditions are all old and all legitimate',
      'The Vedas are not "the Hindu Bible" — scripture is a library with layers, and most household practice draws on the later, more accessible layers',
      'Idol worship misreads murti practice: the image is a window for attention, not the object of it',
      'Caste as social hierarchy is a historical institution, not the spiritual core of the tradition',
    ],
    examples: [
      {
        id: 'overview-example-1',
        title: 'The blind men and the elephant',
        scenario: 'Several blind men touch one elephant: one feels a wall, one a rope, one a tree trunk',
        explanation: 'Each honestly reports the part he touched; each description differs; the elephant is one',
        lesson: 'The tradition\'s classic image for its own diversity: many honest descriptions, one reality',
      },
    ],
    meditation: {
      technique: 'The Question Beneath the Questions',
      duration: '10 minutes',
      instructions: [
        'Sit comfortably and let the breath settle',
        'Ask yourself, gently: before my name, my roles, my history — what am I?',
        'Don\'t force an answer; let the question itself do the work',
        'Notice the awareness in which every thought appears',
        'Rest there for a few breaths — that resting place is where the Upanishads point',
      ],
      benefits: ['A first taste of the tradition\'s central inquiry', 'Calm attention', 'Curiosity instead of overwhelm'],
      audioUrl: '/audio/meditations/overview-inquiry.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '18 minutes',
      audioUrl: '/audio/guides/hinduism-overview.mp3',
      topics: ['The name and the river', 'The library of scriptures', 'One truth, many faces', 'The four aims', 'The many paths'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/hinduism-overview-cover.jpg'),
      iconImage: '/images/philosophy/overview-icon.jpg',
    },
    difficulty: 'beginner',
    sections: [
      {
        id: 'overview-what-it-is',
        title: 'A Family, Not a Single Religion',
        subtitle: 'What it actually is',
        storyText:
          'So what is Hinduism, in one honest sentence? It is a large family of related traditions that grew up together across the Indian subcontinent over thousands of years.\n\nThink of an extended family rather than one person. The branches do not all worship the same way or tell the same stories. But they share a family resemblance: the same **gods**, understood as faces of one reality; the same **library** of sacred texts, with the **Vedas** at its root; the same repertoire of **practice**, from the home shrine to the festival year; and the same **core ideas** running underneath everything, like dharma, karma, rebirth, and liberation.\n\nEverything below is one branch of that family. What follows is the shape of the whole.',
        citation: 'Hinduism as a plural family of traditions sharing Vedic authority, deities, practice, and core concepts — standard scholarly framing',
      },
      {
        id: 'overview-river',
        title: 'The River That Named It',
        subtitle: 'A religion with no founder',
        storyText:
          'One thing about this family surprises almost everyone. Every other major religion can point to a beginning, a founder, a revelation, a date. Hinduism cannot.\n\nIt grew the way a river system grows: countless streams, some four thousand years old, feeding one another until no one could say where the water began.\n\nEven the name came from outside. Persian travelers used **Hindu** — their pronunciation of **Sindhu**, the river Indus — for the people who lived beyond that river. The people themselves had no single name for what they practiced, because they never thought of it as a single thing.',
        citation: '"Hindu" from Persian for the Sindhu (Indus) river — standard etymology',
      },
      {
        id: 'overview-sanatana',
        title: 'What It Calls Itself',
        subtitle: 'The eternal way',
        storyText:
          'The tradition\u2019s own name for itself is **Sanatana Dharma** — the eternal way.\n\nNot eternal because it refuses to change. It never stops changing. Eternal because it organizes itself around questions that do not age.\n\nHold onto this: Hinduism is not a set of answers you must accept. It is a very old, very patient **conversation** — and you are allowed to join it from wherever you stand.',
        citation: '"Sanatana Dharma" as the tradition\u2019s self-designation — traditional usage',
      },
      {
        id: 'overview-questions',
        title: 'The Questions That Hold It Together',
        subtitle: 'Four questions, four thousand years',
        storyText:
          'What holds a tradition together without a founder, a single book, or a central authority? A shared set of questions. For four thousand years, everything in Hinduism has circled these four:',
        bullets: [
          '**What am I, really?** — beneath the name, the roles, the body',
          '**Why is there suffering?** — and what can actually be done about it',
          '**What happens when I die?** — does anything continue, and what?',
          '**How should I live?** — today, in this family, with these duties',
        ],
        teachingText:
          'Every scripture, god, festival, and practice you will meet on this journey is an answer to one of these four. Keep them in your pocket — they are the map\u2019s legend.',
        citation: 'The framing is editorial; the questions are the classical concerns of the Upanishads and Dharmashastra',
      },
      {
        id: 'overview-shruti',
        title: 'The First Shelf: What Was Heard',
        subtitle: 'Shruti — the Vedas and their crown',
        storyText:
          'Ask "what is the Hindu Bible?" and the honest answer is: there isn\u2019t one. There is a **library**, with two great shelves.\n\nThe first shelf is called **Shruti** — **"that which was heard."** The tradition holds that these texts were not composed but received, by sages in deep states of attention. They are the four **Vedas**:',
        bullets: [
          '**Rig Veda** — the hymns; the oldest religious text still in use anywhere on earth',
          '**Sama Veda** — the hymns set to melody; the root of Indian sacred music',
          '**Yajur Veda** — the ritual formulas; how the ceremonies are actually performed',
          '**Atharva Veda** — the practical one; healing, protection, daily life',
        ],
        teachingText:
          'Folded into the final portions of the Vedas sit the **Upanishads** — the tradition\u2019s crown. The word means **"sitting down near,"** as a student sits near a teacher, and these are fearless dialogues about the nature of reality itself.',
        citation: 'Shruti/Smriti distinction and upanishad etymology ("sitting near"): standard; Vedic corpus as described',
      },
      {
        id: 'overview-smriti',
        title: 'The Second Shelf: What Is Remembered',
        subtitle: 'Smriti — the epics and the storybooks',
        storyText:
          'The second shelf is **Smriti** — **"that which is remembered."** If Shruti is the philosopher\u2019s shelf, Smriti is the family\u2019s: the texts most Hindus actually live with.\n\nHere sit the two great epics. The **Mahabharata** — the longest poem ever composed, a war within one family — carries the **Bhagavad Gita** inside it like a jewel in a setting. The **Ramayana** tells of Rama\u2019s exile, Sita\u2019s abduction, and Hanuman\u2019s devotion.\n\nAnd beside them, the **Puranas** — the vast storybooks that gave the gods their faces and the festivals their stories.',
        teachingText:
          'The stories your grandmother told are scripture too. They are simply from the shelf built for **hearts** rather than philosophers.',
        citation: 'Smriti corpus: standard classification (epics and Puranas)',
      },
      {
        id: 'overview-gita-milk',
        title: 'Why the Gita Matters So Much',
        subtitle: 'The milk of the Upanishads',
        keyVerse: {
          sanskrit: '\u0938\u0930\u094d\u0935\u094b\u092a\u0928\u093f\u0937\u0926\u094b \u0917\u093e\u0935\u094b \u0926\u094b\u0917\u094d\u0927\u093e \u0917\u094b\u092a\u093e\u0932\u0928\u0928\u094d\u0926\u0928\u0903',
          transliteration: 'sarvopani\u1e63ado g\u0101vo dogdh\u0101 gop\u0101la-nandana\u1e25',
          meaning: 'All the Upanishads are cows; the milker is Krishna, the cowherd\u2019s son',
        },
        storyText:
          'A traditional verse says the **Upanishads are cows** and the **Gita is their milk**, drawn by Krishna himself — everything essential, made drinkable.\n\nSeven hundred verses, spoken on a battlefield to a warrior who has just lost his nerve. Every big idea the tradition ever had shows up in it, applied to one man\u2019s hardest morning.',
        teachingText:
          'That is why this journey walks you through the Gita **chapter by chapter**: it is the tradition\u2019s own summary of its deepest shelf.',
        citation: 'Cows-and-milk verse: Gita Mahatmya 6 (traditional)',
      },
      {
        id: 'overview-one-truth',
        title: 'One Truth, Many Names',
        subtitle: 'The oldest answer to the oldest question',
        openingVerse: {
          sanskrit: '\u090f\u0915\u0902 \u0938\u0926\u094d\u0935\u093f\u092a\u094d\u0930\u093e \u092c\u0939\u0941\u0927\u093e \u0935\u0926\u0928\u094d\u0924\u093f',
          transliteration: 'eka\u1e43 sad vipr\u0101 bahudh\u0101 vadanti',
          meaning: 'Truth is one; the wise call it by many names',
        },
        storyText:
          '"How many gods do Hindus worship?" The **Rig Veda** — the oldest book on the oldest shelf — answered this three thousand years before anyone thought to ask it as a challenge.\n\nNaming god after god — Indra, Mitra, Varuna, Agni — the hymn suddenly stops and says the quiet part aloud: **what exists is One**. The sages simply give it many names.\n\nEverything about the gods unfolds from that single line.',
        citation: 'Rig Veda 1.164.46, tr. Griffith (public domain)',
      },
      {
        id: 'overview-faces',
        title: 'The Faces of the One',
        subtitle: 'Who you will meet',
        storyText:
          'The one reality the Upanishads call **Brahman** meets human beings through faces. The ones you will encounter most:',
        bullets: [
          '**Brahma** — the creator, who begins each cosmos',
          '**Vishnu** — the preserver, who sustains what is good',
          '**Shiva** — the transformer, who dissolves what is finished',
          '**Devi**, the Goddess — **Durga\u2019s** protection, **Lakshmi\u2019s** abundance, **Saraswati\u2019s** wisdom',
          '**The avatars** — the divine descending into history: **Rama** the ideal king, **Krishna** the friend and guide',
        ],
        teachingText:
          'When you meet the deities later in this journey, you are not being introduced to a crowd of gods. You are being shown **the same light through different windows**.',
        citationLink: 'gita:4',
        citation: 'Trimurti, Devi, and avatar doctrine: Puranic tradition; avatars: Bhagavad Gita 4.7\u20138',
      },
      {
        id: 'overview-ishta',
        title: 'The Face You Love',
        subtitle: 'Ishta-devata — devotion made personal',
        storyText:
          'The tradition has a word for the most personal part of all this: **ishta-devata** — the chosen deity. The face of the divine your own heart answers to.\n\nA family of Krishna devotees and a family of Shiva devotees are not practicing rival religions. They are loving the **same ocean** through different rivers.\n\nYou may already have an ishta-devata without knowing the word — the face that was on your family\u2019s altar, or the one whose stories quietly stayed with you.',
        citation: 'Ishta-devata: standard devotional concept across sampradayas',
      },
      {
        id: 'overview-aims',
        title: 'The Four Aims of a Life',
        subtitle: 'What is all this for?',
        storyText:
          'Hinduism is unusually generous about what a life is for. The tradition names four aims — the **purusharthas**:',
        bullets: [
          '**Dharma** — right living: acting in tune with your nature and your responsibilities',
          '**Artha** — prosperity: wealth and security are legitimate goods, not embarrassments',
          '**Kama** — pleasure: beauty, love, and enjoyment are also holy, in their place',
          '**Moksha** — liberation: the final freedom that asks what the other three were for',
        ],
        teachingText:
          'Notice the generosity. A tradition that blesses prosperity and pleasure alongside duty and liberation is not asking you to choose between a good life and a spiritual one. It is claiming they were **never two different things**.',
        citation: 'Purusharthas: Dharmashastra tradition',
      },
      {
        id: 'overview-mechanics',
        title: 'Karma, Samsara, and the Way Out',
        subtitle: 'The mechanics beneath everything',
        storyText:
          'Three ideas run the machinery. **Karma**: every action leaves a trace, and traces shape futures. **Samsara**: the self — the **atman** — travels through birth after birth, carrying those traces. **Moksha**: the exit — liberation from the whole cycle.\n\nAnd what is liberation? The Upanishads state the destination in three syllables a father once spoke to his son:',
        keyVerse: {
          sanskrit: '\u0924\u0924\u094d\u0924\u094d\u0935\u092e\u0938\u093f',
          transliteration: 'tat tvam asi',
          meaning: 'That thou art — you are That',
        },
        teachingText:
          'The **atman** within you and **Brahman** behind everything were never two. Liberation is not going somewhere after death — it is **waking up to what was always true**. Every practice in this tradition, at bottom, is an alarm clock.',
        citation: 'Tat tvam asi: Chandogya Upanishad 6.8.7, tr. M\u00fcller (public domain)',
      },
      {
        id: 'overview-which',
        title: 'Which Hinduism Is the Right One?',
        subtitle: 'Many rivers, one ocean',
        storyText:
          'By now you may suspect the answer: **there is no single right one**, and the tradition says so on purpose. Historically, Hindus have organized their devotion in great streams:',
        bullets: [
          '**Vaishnavas** — centered on Vishnu and his avatars',
          '**Shaivas** — centered on Shiva',
          '**Shaktas** — centered on the Goddess',
          '**Smartas** — honoring all the faces as one',
        ],
        sectionHeader: 'Your family\u2019s way',
        teachingText:
          'This is why your family\u2019s Hinduism may look different from your friend\u2019s — different deities on the altar, different festival foods, different fasts. None of that is confusion. **It is the design.**\n\nAnd it is why there is no belief test for belonging. Being Hindu is less a creed you sign than a family you are raised in and a practice you keep, closer to belonging to a people than to joining a club.\n\nThis is one common map; **ask your family how they walk it**. Their answers are part of the tradition too — the living part. Four thousand years of conversation are waiting. Take the next step.',
        citationLink: 'gita:4',
        citation: 'The four streams: sampradaya tradition; the Gita\u2019s pluralism: 4.11, tr. Sivananda (public domain)',
      },
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: '1.164.46 — "ekam sat viprā bahudhā vadanti"',
        translation: 'Ralph T.H. Griffith (public domain)',
      },
      {
        text: 'Chandogya Upanishad',
        locator: '6.8.7 — "tat tvam asi" (Uddalaka and Svetaketu)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:4',
        locator: '4.7–8 (avatars), 4.11 (all paths welcomed)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Gita Mahatmya',
        locator: 'Verse 6 (the Upanishads-as-cows metaphor; traditional, attributed to the Vaishnaviya Tantrasara)',
        translation: 'traditional rendering',
      },
    ],
    reflectionQuestions: [
      'Of the four aims — right living, prosperity, pleasure, liberation — which one has been running your life lately?',
    ],
  },
  {
    id: 'branches-of-hinduism',
    name: 'The Four Great Streams',
    sanskritName: 'सम्प्रदाय',
    category: 'core_concepts',
    description: 'Vaishnava, Shaiva, Shakta, Smarta — why Hinduism branches, and why that is its strength',
    detailedExplanation: 'Hinduism never had a central authority to enforce one version of itself — so instead of one church, it grew great streams: Vaishnavas who approach the divine through Vishnu and his avatars, Shaivas through Shiva, Shaktas through the Goddess, and Smartas who honor all the faces as one reality. Beneath the devotional streams run the darshanas, the classical schools of philosophy, of which Vedanta and Yoga are the living giants. None of these is a denomination in the Western sense; families blend them freely, and the same person may sing to Krishna in the morning and keep Shivratri in the spring. The branches are not fragmentation. They are the tradition\'s honest admission that people differ, and that the ocean can be entered from any shore.',
    etymology: 'Sampradaya — "that which is handed over": a lineage of teaching and practice passed teacher to student',
    keyAspects: [
      'No central authority — lineages (sampradayas) instead of a church',
      'Vaishnavism: the divine approached as Vishnu and his avatars, through love',
      'Shaivism: the divine as Shiva — ascetic stillness and dancing energy',
      'Shaktism: ultimate reality as the Goddess, power itself',
      'Smartism: all faces honored as one; choose your ishta-devata',
    ],
    practicalApplications: [
      {
        situation: 'Your family\'s practice differs from a friend\'s and you wonder who is "doing it right"',
        application: 'Identify the streams: different home deities, festivals, and rules usually mean different sampradaya inheritance, not error — ask elders which stream your family drinks from',
        benefits: ['Confidence in your own inheritance', 'Curiosity instead of comparison', 'Better questions at family gatherings'],
        tips: ['Notice which deity anchors the family altar', 'Festival emphasis is a clue (Janmashtami vs Shivratri vs Navratri)', 'Blending is normal, not confusion'],
      },
    ],
    relatedConcepts: ['hinduism-overview', 'bhakti-paths', 'dharma'],
    scriptureReferences: [
      {
        id: 'branches-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 4, Verse 11',
        quote: 'In whatever way men approach Me, even so do I reward them; My path do men tread in all ways',
        context: 'The Gita\'s own blessing of plural paths — the theological ground beneath the branches',
      },
    ],
    modernRelevance: 'Diaspora Hindus constantly meet versions of the tradition unlike their family\'s and wonder which is authentic. The branches answer: authenticity in Hinduism is lineage-deep, not uniformity-wide — knowing your stream turns confusing difference into legible inheritance.',
    commonMisunderstandings: [
      'The branches are not rival religions or "denominations" with membership — most families blend streams freely',
      'Worshiping Shiva does not mean rejecting Vishnu: Smarta practice honors all faces as one',
      'No branch is "orthodox Hinduism" — each is an old, complete, legitimate path',
      'The philosophical schools (Vedanta, Yoga) are not branches of worship but disciplines of understanding that run beneath them all',
    ],
    examples: [
      {
        id: 'branches-example-1',
        title: 'One festival calendar, two homes',
        scenario: 'One family fasts and stays up for Maha Shivratri; the neighbors barely mark it but turn Janmashtami into the year\'s biggest night',
        explanation: 'A Shaiva-leaning home and a Vaishnava-leaning home, each faithfully practicing its stream',
        lesson: 'Difference in emphasis is inheritance, not error',
      },
    ],
    meditation: {
      technique: 'Finding Your Stream',
      duration: '10 minutes',
      instructions: [
        'Bring to mind the deity images that hung in the homes of your childhood',
        'Recall which festivals your family kept with the most care',
        'Notice which stories you were told most often — Krishna\'s, Shiva\'s, the Goddess\'s',
        'Without judging, name the stream (or blend) you inherited',
        'Ask inwardly: which face of the divine does my own heart answer to now?',
      ],
      benefits: ['Clarity about your inheritance', 'Respect for other streams', 'A chosen relationship with your ishta-devata'],
      audioUrl: '/audio/meditations/branches-stream.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '16 minutes',
      audioUrl: '/audio/guides/branches-guide.mp3',
      topics: ['Why branches exist', 'The four streams', 'The six schools', 'Your family\'s inheritance'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/branches-of-hinduism-cover.jpg'),
      iconImage: '/images/philosophy/branches-icon.jpg',
    },
    difficulty: 'beginner',
    sections: [
      {
        id: 'branches-why',
        title: 'Why There Is No Hindu Pope',
        subtitle: 'Lineages instead of a church',
        storyText: 'Every tradition faces the same problem: how do you keep a teaching alive across generations without freezing it or losing it?\n\nMost religions solved it with a center — a church, a council, a chair somewhere with the final word. Hinduism solved it with lineages: **sampradayas**, living chains of teacher and student, each "handing over" (the word\'s literal meaning) a complete way of approaching the divine. No lineage could silence another; each rose or fell on the depth of its saints and the loyalty of its households.\n\nThe result, after three thousand years, is not chaos but an ecosystem — **great streams flowing side by side toward the same ocean**.',
        teachingText: 'Hold this frame and the tradition\'s bewildering variety becomes legible. When you meet a Hindu practice that looks nothing like your family\'s, you are not seeing error or dilution.\n\nYou are seeing another stream — older than most countries, carried by unbroken handover, and headed the same direction as yours.',
        citationLink: 'gita:4',
        citation: 'Sampradaya ("handing over"): standard Sanskrit etymology; the Gita\'s pluralism: Bhagavad Gita 4.11',
      },
      {
        id: 'branches-vaishnava',
        title: 'Vaishnavism: The Way of the Beloved',
        subtitle: 'The divine that descends',
        storyText: 'The largest stream approaches the ultimate as **Vishnu** — the sustainer who refuses to stay remote.\n\nVaishnavism is built on the **avatar** principle: when the world tilts, the divine descends into it, as Rama, as Krishna — walking, suffering, delighting, near. Its great text is the **Bhagavata Purana**, its method is **bhakti** — love as a spiritual technology — and its emotional register runs from the majesty of Rama\'s court to the butter-thief mischief of the child Krishna.\n\nIf your family\'s year peaks at Janmashtami or Ram Navami, if the harmonium and the kirtan feel like home, you have drunk from this stream.',
        teachingText: 'Vaishnavism\'s wager is that **love is the strongest solvent of ego** — stronger than austerity, stronger than analysis.\n\nWhere other paths climb toward the divine, the Vaishnava lets the divine come close enough to adore. Its gift to the whole tradition is warmth: the insistence that the absolute has a face that smiles back.',
        citationLink: 'gita:4',
        citation: 'Bhagavata Purana (the tradition\'s central text); avatar doctrine: Bhagavad Gita 4.7–8',
      },
      {
        id: 'branches-shaiva',
        title: 'Shaivism: The Way of the Wild God',
        subtitle: 'Stillness and the dance',
        storyText: 'The second great stream approaches the ultimate as **Shiva** — the god who fits in no palace.\n\nShaivism holds together what looks like contradiction: the motionless ascetic on Kailash and **Nataraja**, the cosmic dancer whose steps create and dissolve worlds; the householder with Parvati and the wanderer of cremation grounds. Its ancient theological root is the Shvetashvatara Upanishad, which names Rudra-Shiva as the one God; its practices run from the austere (vibhuti, vows, silence) to the ecstatic.\n\nIf your family keeps Maha Shivratri through the night, or your altar holds a **linga** — the formless marker of the formless — this is your stream.',
        teachingText: 'Shaivism\'s wager is that **the divine is found at the edges** — of comfort, of form, of the self.\n\nIt gave the tradition its yoga of transformation: nothing, not even destruction, is outside God. Its gift is fearlessness: a god who sits calmly in the cremation ground has nothing left to threaten him with.',
        citation: 'Shvetashvatara Upanishad (esp. chapters 3–4), tr. Müller (public domain); Nataraja iconography: Shaiva tradition',
      },
      {
        id: 'branches-shakta',
        title: 'Shaktism: The Way of the Mother',
        subtitle: 'Power itself, personified',
        storyText: 'The third stream makes the boldest claim of all: ultimate reality is **Shakti** — power, energy, the force that makes everything go — and Shakti is **the Goddess**.\n\nIn Shaktism, Durga, Kali, Lakshmi, and Saraswati are not consorts orbiting male gods; they are the supreme, and the male gods act only by the power she lends. Its charter text is the **Devi Mahatmya**, in which the gods, defeated, pool their energies and the Goddess emerges to do what none of them could.\n\nBengal\'s Durga Puja, the year\'s twin Navratris, the whispered power of the word "Maa" — all flow from this stream.',
        teachingText: 'Shaktism\'s wager is that the divine is not beyond the world but IS the world\'s aliveness — and therefore fiercely, maternally near.\n\nIts gift to the tradition is the theology every child already knows: **the first face of unconditional power most humans meet is a mother\'s**.',
        citationLink: 'deity:durga',
        citation: 'Devi Mahatmya (Markandeya Purana, chapters 81–93), tr. public-domain editions',
      },
      {
        id: 'branches-smarta',
        title: 'Smartism and the Schools',
        subtitle: 'All faces, one reality — and the philosophers underneath',
        storyText: 'The fourth stream, associated with the great reformer **Shankara**, refuses to choose.\n\nSmarta practice sets five (sometimes six) deities on one altar — Vishnu, Shiva, Devi, Ganesha, Surya — and worships the one Brahman through whichever face the worshiper loves: the **ishta-devata** principle made liturgy.\n\nBeneath all four streams run the **darshanas**, the six classical schools of philosophy. Two remain giants: **Vedanta**, the inquiry into Brahman and Atman that Shankara sharpened into Advaita (non-dualism), and **Yoga**, Patanjali\'s discipline of stilling the mind. The streams tell you whom to love; the schools examine what loving them means.',
        teachingText: 'Smartism is the tradition auditing itself: if Truth is one and the wise call it by many names, then the names must be interchangeable at the altar.\n\nAnd the schools are the tradition thinking: Hinduism never separated devotion from philosophy — its greatest philosophers wrote hymns, and its greatest hymns argue metaphysics.',
        citation: 'Smarta panchayatana worship: tradition attributed to Adi Shankara; the six darshanas: classical doxography',
      },
      {
        id: 'branches-yours',
        title: 'Your Family\'s Stream',
        subtitle: 'Reading your own inheritance',
        storyText: 'Now look homeward.',
        bullets: [
          'Which deity anchored your grandparents\' altar?',
          'Which festival emptied the kitchen into a week of cooking?',
          'Whose stories were told when the power went out?'
        ],
        sectionHeader: 'The living part',
        teachingText: 'The answers locate your family in this map — Vaishnava-leaning, Shaiva-leaning, Shakta-leaning, or (most common of all) **a blend the streams themselves would smile at**. There is no purity test. The blending is not confusion; it is what three thousand years of neighboring streams naturally do.\n\nThis is one common map; ask your family how they walk it. Ask which stream their parents drank from, and their parents before. The answers you gather are not trivia — they are the living part of the tradition, **the handover happening in real time, with you as the next pair of hands**.',
        citation: 'Family sampradaya practice: living tradition — the map here is descriptive, not prescriptive',
      },
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:4',
        locator: '4.7–8 (avatars), 4.11 (all paths)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Shvetashvatara Upanishad',
        locator: 'Chapters 3–4 (Rudra-Shiva as the one God)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
      {
        text: 'Devi Mahatmya',
        locator: 'Markandeya Purana, chapters 81–93 (the Goddess\'s emergence)',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'The central Vaishnava scripture (esp. Canto 10)',
        translation: 'wisdomlib.org (public)',
      },
    ],
    reflectionQuestions: [
      'What practice did you grow up with at home without ever being told its name or story?',
    ],
  },
  {
    id: 'maya',
    name: 'Maya',
    sanskritName: 'माया',
    category: 'core_concepts',
    description: 'Not "the world is fake" — the world is misread. The tradition\'s theory of illusion',
    detailedExplanation: 'Maya is the most misquoted idea in Hinduism. It does not claim the world is a hallucination; it claims the world is real but systematically misperceived — a rope read as a snake in dim light. What maya conceals is not the world\'s existence but its nature: one reality appearing as many separate things, one Self appearing as billions of rival selves. The Gita calls maya divine and hard to cross; the Advaita tradition made its analysis a science. The practical point is not to escape the world but to stop mistaking your reading of it for the thing itself.',
    etymology: 'From the root "ma" — to measure, to form: the power by which the immeasurable appears measured, bounded, many',
    keyAspects: [
      'Illusion as misreading, not hallucination — the rope really exists',
      'What is concealed: unity appearing as separateness',
      'Maya as divine power (Gita 7.14), not a hostile trick',
      'Crossing maya: refuge, inquiry, and attention',
      'Modern mayas: the engineered misreadings of the attention economy',
    ],
    practicalApplications: [
      {
        situation: 'A 9 p.m. email from your boss reads as catastrophe; by morning it was a typo-riddled question',
        application: 'Name the rope-snake moment: in dim light (fatigue, anxiety), perception overlays reality with its fears — delay the reaction until the light improves',
        benefits: ['Fewer 9 p.m. catastrophes', 'A useful gap between perception and reaction', 'Compassion for others\' misreadings'],
        tips: ['Ask "what do I actually know?" vs "what am I adding?"', 'Low light — tiredness, hunger, fear — breeds snakes', 'The rope is checkable: verify before reacting'],
      },
    ],
    relatedConcepts: ['brahman-atman', 'moksha', 'three-gunas'],
    scriptureReferences: [
      {
        id: 'maya-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 7, Verse 14',
        quote: 'Verily this divine illusion of Mine made up of the gunas is difficult to cross over; those who take refuge in Me alone cross over this illusion',
        context: 'Krishna names maya as his own power — and names the crossing',
      },
    ],
    modernRelevance: 'We live inside engineered maya: feeds tuned to make strangers look like enemies, filters that make ordinary lives look inadequate, notifications that make the trivial feel urgent. The rope-and-snake diagnosis is more useful now than ever — most modern suffering is a misreading with a business model behind it.',
    commonMisunderstandings: [
      'Maya does not mean "nothing is real" — the rope exists; the snake is the error',
      'It is not a demon or hostile force: the Gita calls it Krishna\'s own divine power',
      'Seeing through maya does not make the world worthless — it makes the world finally visible',
      'Maya is not escaped by leaving the world but by correcting the reading',
    ],
    examples: [
      {
        id: 'maya-example-1',
        title: 'The rope and the snake',
        scenario: 'At dusk a traveler leaps back from a snake on the path; a lamp reveals a coiled rope',
        explanation: 'The rope was real the whole time; the snake existed only in the misreading — yet the fear, sweat, and racing heart were fully real',
        lesson: 'Illusions have real effects; that is exactly why they must be examined',
      },
    ],
    meditation: {
      technique: 'The Lamp Check',
      duration: '10 minutes',
      instructions: [
        'Bring to mind something currently frightening or infuriating you',
        'Separate the rope from the snake: list only what you directly know',
        'Notice what your mind has added — motive, future, story',
        'Ask: in better light (rest, information, time), what might this look like?',
        'Rest a moment in the not-knowing; it is more honest than the snake',
      ],
      benefits: ['Reactivity reduced at the source', 'Cleaner perception', 'A habit of verification'],
      audioUrl: '/audio/meditations/maya-lamp.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '15 minutes',
      audioUrl: '/audio/guides/maya-guide.mp3',
      topics: ['The rope and the snake', 'What maya conceals', 'Gita 7.14', 'Modern mayas'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/philosophy/maya-icon.jpg',
    },
    difficulty: 'intermediate',
    kicker: "Not 'the world is an illusion.' A real world, misread — and someone is profiting from keeping you at dusk.",
    learnItems: [
      'Maya is not a fake world, but a real one misread',
      'The costliest misreading: that you end at your skin',
      'The veil is divine, and genuinely hard to cross',
      'We have industrialized the dusk that breeds misreadings',
    ],
    handoff:
      'Maya runs on your own moods and energies — the Gita calls it guna-mayi, woven of three strands. What are those strands, and how do they colour everything you see? That is the three gunas.',
    sections: [
      {
        id: 'maya-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'You have probably heard that Hinduism teaches "the world is an illusion." That is the most damaging mistranslation in the tradition, and maya is the word behind it.\n\nOver the next few pages, maya turns from a mystical shrug into a sharp diagnostic tool — one that is uncomfortably relevant to the feeds and screens of ordinary modern life.',
      },
      {
        id: 'maya-misquote',
        title: 'The Most Misquoted Idea in Hinduism',
        subtitle: 'What maya does not mean',
        takeaway:
          "Maya does not say the world is absent; it says the world is misread. Ask not 'is this real?' but 'is this the rope, or my snake?'",
        storyText: 'Somewhere along the way, "maya" got translated as "the world is an illusion" and a caricature was born: Hindus supposedly believe nothing is real, so nothing matters. The tradition claims almost the opposite.\n\n**Maya does not say the world is absent; it says the world is misread.**\n\nThe classic image, sharpened by the great philosopher Shankara and his followers, is exact: a traveler at dusk leaps back from a **snake** on the path. A lamp is brought — it is a **rope**. The rope was there all along, fully real. The snake was never there at all. And yet the traveler\'s terror was real, the racing heart was real, the leap was real.\n\nIllusion, in this tradition, means **real experience built on a misreading of something real**.',
        teachingText: 'Get this distinction and maya stops being mystical and becomes diagnostic.\n\nThe question it teaches you to ask — of your fears, your feeds, your certainties about other people — is not "is this real?" but **"is this the rope, or my snake?"** The two feel identical from inside. That is the whole problem, and the beginning of its solution.',
        citation: 'Rope-snake analysis: Advaita tradition (Vivekachudamani, attrib. Shankara; Shankara\'s Brahmasutra commentary)',
      },
      {
        id: 'maya-term-maya',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'माया',
          transliteration: 'māyā',
          meaning: 'the misreading of the real — not the absence of the real',
        },
        storyText:
          'The root is *ma*, to measure. Maya is the measuring-out of the immeasurable, the drawing of boundaries on the boundless.\n\nThe boundaries are useful — you cannot pour tea without a cup. The trouble is forgetting they are drawn, and then defending them with your life.',
        reappears:
          'Maya is the reason oneness can be true and still not feel true, all the way to moksha.',
        checks: [
          {
            id: 'chk:concept:maya:claim',
            kind: 'mcq',
            prompt: 'What does maya actually claim?',
            options: [
              {
                text: 'Real experience built on a misreading of something real — the rope mistaken for a snake — not that the world is fake',
                correct: true,
              },
              { text: 'That nothing exists and nothing matters' },
              { text: 'That the world is a punishment for past sins' },
            ],
            why: 'The rope was there all along; the snake never was. Yet the terror, the racing heart, and the leap were all real. Illusion here means a real reaction to a misread real.',
          },
        ],
      },
      {
        id: 'maya-conceals',
        title: 'What the Misreading Conceals',
        subtitle: 'One appearing as many',
        takeaway:
          'The misreading conceals oneness. The costliest boundary is the one that says you end at your skin, and everyone else begins as a rival.',
        storyText: 'If maya is a misreading, what is the rope — the reality being misread? The Upanishads\' answer: **oneness**.\n\nThere is one reality, Brahman, and maya is the power by which it appears as many separate things — and, most consequentially, as many separate selves.\n\nThe word\'s own root says it: **ma, to measure**. Maya is the measuring-out of the immeasurable, the drawing of boundaries on the boundless. The boundaries are useful — you cannot pour tea without a cup — but the tradition\'s claim is that we forget they are drawn, and then defend them with our lives.',
        sectionHeader: 'The costliest boundary',
        teachingText: 'The misreading that costs the most is the one at the center: the absolute conviction that **you end at your skin**, and everyone else begins as a rival. Every scarcity panic, every envy, every "us and them" runs on that reading.\n\nThe tradition does not ask you to erase the boundary — it asks you to remember, at least sometimes, who drew it.',
        citation: 'Root "ma" (to measure): standard etymology; one-appearing-as-many: Chandogya Upanishad 6 (the "one clay, many pots" teaching)',
        checks: [
          {
            id: 'chk:concept:maya:boundary',
            kind: 'mcq',
            prompt: 'Which misreading does the tradition say costs the most?',
            options: [
              {
                text: 'The conviction that you end at your skin — the boundary that turns every scarcity, envy, and "us and them" into a fight',
                correct: true,
              },
              { text: 'Believing that the physical world exists at all' },
              { text: 'Trusting your senses to tell you when it is night' },
            ],
            why: 'Maya draws useful boundaries — you cannot pour tea without a cup — but we forget they are drawn and then defend them with our lives.',
          },
        ],
      },
      {
        id: 'maya-way-1',
        kind: 'waypoint',
        title: '2 of 4 banked',
        learnIndex: 2,
        storyText:
          'Maya is a real world misread, and the deepest misreading is separateness. Next: whose power this veiling is, and why crossing it is genuinely hard.',
      },
      {
        id: 'maya-divine',
        title: 'Hard to Cross — and Whose It Is',
        subtitle: 'Gita 7.14, read slowly',
        takeaway:
          'Maya is divine, woven of the gunas, and genuinely hard to cross. You do not think your way out of a misreading with the mind that is doing the misreading.',
        openingVerse: {
          sanskrit: 'दैवी ह्येषा गुणमयी मम माया दुरत्यया',
          transliteration: 'daivī hy eṣā guṇa-mayī mama māyā duratyayā',
          meaning: 'Divine indeed is this maya of Mine, made of the gunas, hard to cross — but those who take refuge in Me cross over it',
        },
        storyText: 'The Gita\'s one-verse treatment of maya repays slow reading — four claims in a single line:',
        bullets: [
          'Maya is **divine** — mama maya, "MY maya," Krishna says. Not a demon\'s trick or a design flaw; the veiling is part of the design, the same power that makes a play possible by hiding the stage machinery.',
          'It is **guna-mayi**, woven of the three gunas — the misreadings run on your own moods and energies, which is why the world looks like a threat on a tamasic day and a market on a rajasic one.',
          'It is **duratyaya**, genuinely hard to cross. The tradition does not pretend clear seeing is easy.',
          'And the crossing: **those who take refuge cross over.**'
        ],
        teachingText: 'Refuge, inquiry, practice — the streams disagree on emphasis and agree on the point: **you do not think your way out of a misreading with the same mind that is doing the misreading.**\n\nYou need a lamp from outside the dusk — a teacher, a practice, a grace. The humility to reach for one is the first step across.',
        citationLink: 'gita:7',
        citation: 'Bhagavad Gita 7.14, tr. Sivananda (public domain)',
      },
      {
        id: 'maya-way-2',
        kind: 'waypoint',
        title: '3 of 4 banked',
        learnIndex: 3,
        storyText:
          'The veil is part of the design, and crossing it needs a lamp from outside. One idea remains, and it is uncomfortably current.',
      },
      {
        id: 'maya-modern',
        title: 'The Engineered Dusk',
        subtitle: 'Maya with a business model',
        takeaway:
          'We have industrialized the dusk. Every doomscroll is a walk down a path of ropes, at engineered dusk, with someone profiting from each leap.',
        storyText: 'The rope-and-snake needed dim light; the misreading happens at dusk, not noon.\n\nNow consider that some of the brightest engineering talent of our age works on **keeping you at dusk**: feeds that surface the most snake-like reading of every stranger, filters that make ordinary faces look inadequate, urgency signals attached to the trivial.\n\nThe tradition analyzed maya as a cosmic condition; we have industrialized it. Every doomscroll is a walk down a path of ropes, at engineered dusk, with someone profiting from each leap.',
        sectionHeader: 'The counter-practice',
        teachingText: 'Which makes the old counter-practices strangely current.\n\n**Bring the lamp**: verify before reacting. **Notice the light**: tired, hungry, anxious minds breed snakes. And **guard the dusk hours** — the tradition\'s instinct that dawn and dusk are for practice, not consumption, reads today like operational security for the mind.',
        citation: 'Application of the classical rope-snake frame; the underlying analysis as cited above',
        checks: [
          {
            id: 'chk:concept:maya:cross',
            kind: 'mcq',
            prompt: 'How does the tradition say you cross maya?',
            options: [
              {
                text: 'With a lamp from outside the dusk — a teacher, a practice, a grace — not by thinking harder with the same misreading mind',
                correct: true,
              },
              { text: 'By working out the truth alone, through sheer reasoning' },
              { text: 'By withdrawing from the world entirely' },
            ],
            why: 'You do not out-think a misreading with the mind that is doing it. The humility to reach for a lamp is the first step across.',
          },
        ],
      },
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:7',
        locator: '7.14–15 (maya and its crossing)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Vivekachudamani',
        locator: 'Attributed to Adi Shankara — the rope-snake analysis of superimposition (adhyasa)',
        translation: 'public-domain renderings',
      },
      {
        text: 'Chandogya Upanishad',
        locator: 'Chapter 6 (one clay, many pots — the one appearing as many)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
    ],
    reflectionQuestions: [
      'When did a fear of yours last vanish once you saw the full picture?',
      'Where in your day is someone profiting from keeping you at dusk — anxious, comparing, reactive?',
      'Name one "snake" you reacted to this week that turned out to be a rope.',
    ],
  },
  {
    id: 'brahman-atman',
    name: 'Brahman & Atman',
    sanskritName: 'ब्रह्मन् आत्मन्',
    category: 'core_concepts',
    description: 'The claim at the center of the Upanishads: the Self in you and the reality behind everything are one',
    detailedExplanation: 'Strip the tradition to its load-bearing wall and this is it: Brahman, the one reality behind all appearances, and Atman, the Self behind your appearances, are not two things. The Upanishads state it in experiments (dissolve salt in water; where is the salt? everywhere), in negations (neti neti — not this, not this), and in four "great sayings" that all make the same claim from different angles. Everything else in Hinduism — karma, moksha, the gods, the practices — is either a consequence of this claim or a method for realizing it.',
    etymology: 'Brahman from "brh," to expand — the vast; Atman, the self, the breath — the innermost',
    keyAspects: [
      'One reality (Brahman); one Self (Atman); the teaching: they are identical',
      'The salt-water experiment: pervading, invisible, findable by taste not sight',
      'Neti neti — knowing by removing what the Self is not',
      'The four mahavakyas: one sentence, said four ways',
      'Not belief but verification: the Upanishads assign homework',
    ],
    practicalApplications: [
      {
        situation: 'Chronic self-criticism: the inner voice that narrates your inadequacy all day',
        application: 'Apply neti neti: the voice is observable — so it is an object, not the Self. Whatever you can watch, you are not. Step back into the watcher',
        benefits: ['Distance from the inner critic', 'A stable identity beneath moods', 'The beginning of actual self-inquiry'],
        tips: ['"Am I the thought, or the one aware of it?"', 'Moods change; note what notices the changing', 'Five minutes of watching beats an hour of arguing with the voice'],
      },
    ],
    relatedConcepts: ['maya', 'moksha', 'hinduism-overview'],
    scriptureReferences: [
      {
        id: 'ba-chandogya',
        text: 'Chandogya Upanishad',
        reference: '6.13',
        quote: 'Place this salt in water and come to me in the morning... Where is the salt? — It is everywhere in the water. — Even so, my son, that subtle essence you do not perceive — in it, all that exists has its Self. That is the True. That is the Self. Tat tvam asi.',
        context: 'Uddalaka\'s salt experiment — the identity thesis taught through the tongue, not the ear',
      },
    ],
    modernRelevance: 'Beneath every modern identity crisis — the personal brand, the imposter syndrome, the fear of being found out — the Upanishads place a floor: an identity that cannot be built up and therefore cannot collapse. The teaching is not self-esteem; it is self-location.',
    commonMisunderstandings: [
      'Not pantheism ("everything is God" flattened) — the claim is subtler: one reality appearing as everything',
      '"I am Brahman" is not an ego promotion — the ego is precisely what neti neti removes first',
      'The identity is not achieved by practice; practice removes the misreading that hides it',
      'It is a testable claim in the tradition\'s eyes — the Upanishads teach by experiment, not decree',
    ],
    examples: [
      {
        id: 'ba-example-1',
        title: 'The salt in the water',
        scenario: 'Svetaketu cannot find the salt his father had him dissolve — until he tastes: every sip, salt',
        explanation: 'What pervades cannot be pointed at; it is found by a different sense than the one that lost it',
        lesson: 'The Self is not missing — it is pervasive, and therefore never an object in view',
      },
    ],
    meditation: {
      technique: 'Neti Neti Sitting',
      duration: '15 minutes',
      instructions: [
        'Settle, and let attention rest on whatever appears',
        'To each appearance — sound, sensation, thought, mood — note gently: "observable, therefore not this"',
        'Do not push anything away; just decline to be it',
        'Notice what remains as the observer that every noting presupposed',
        'Rest there without naming it — naming would make it another object',
      ],
      benefits: ['Disidentification from mental weather', 'A taste of the witness', 'The Upanishads\' method firsthand'],
      audioUrl: '/audio/meditations/neti-neti.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '18 minutes',
      audioUrl: '/audio/guides/brahman-atman-guide.mp3',
      topics: ['The identity thesis', 'The salt experiment', 'Neti neti', 'The four great sayings'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/philosophy/brahman-atman-icon.jpg',
    },
    difficulty: 'advanced',
    kicker: "The one claim the whole tradition rests on: what you call 'I' and what holds up the universe are the same thing.",
    learnItems: [
      'Brahman and atman are the same reality',
      "You can't find the Self as an object — you are what does the finding",
      'Neti neti: you are not anything you can observe',
      'The four great sayings turn the claim from heard to lived',
    ],
    handoff:
      'If all of this is one, and you are That, then the obvious question arrives: why on earth does it not feel that way? The tradition has a precise answer, and a precise word: maya.',
    sections: [
      {
        id: 'ba-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Every tradition has a center of gravity. Hinduism's is not a rule or a story but a claim about what you are — and, the Upanishads insist, one you can check from the inside.\n\nOver the next few pages you'll meet the claim, and the three great methods the tradition built to test it: an experiment, a negation, and four sentences.",
      },
      {
        id: 'ba-claim',
        title: 'The Claim at the Center',
        subtitle: 'One wall holds up the whole house',
        takeaway:
          "Hinduism's center is one claim: Brahman, the one reality, and atman, the Self you call 'I,' are the same.",
        storyText: 'Every tradition has a center of gravity. Buddhism centres on the idea that everything arises from causes and then passes away; the Abrahamic faiths (Judaism, Christianity, and Islam) centre on a covenant, a sacred promise between God and humanity. Hinduism\'s center is an identity claim.\n\n**Brahman** — the one reality that the Rig Veda (the oldest sacred hymns of Hinduism) said the wise call by many names — and **Atman** — the Self you refer to every time you say "I" — are **the same**. Not similar. Not connected. The same, the way the space in a jar and the space in the room were never actually two spaces.\n\nTake this wall out and the house falls: karma becomes bookkeeping, moksha becomes a destination, the gods become a committee. Put it in and everything else in the tradition becomes either a consequence of the claim or a method for verifying it.',
        teachingText: 'Notice what kind of claim it is: not ethical advice, not a story, but a statement about what you are — **checkable, the Upanishads insist, from the inside**.\n\nThe rest of this course is the tradition\'s three great verification methods: an experiment, a negation, and four sentences.',
        citation: 'Brahman/Atman identity: the central thesis of the principal Upanishads (Chandogya 6, Brihadaranyaka 1.4, Mandukya)',
      },
      {
        id: 'ba-salt',
        title: 'The Salt Experiment',
        subtitle: 'A father teaches through the tongue',
        takeaway:
          'You cannot find the Self as an object, any more than you can pull dissolved salt back out of the water. You are how the water tastes.',
        storyText: 'Uddalaka\'s son Svetaketu came home from twelve years of Vedic study visibly proud. His father asked whether he had learned "that by which the unheard becomes heard, the unthought thought." He had not.\n\nSo Uddalaka ran the most famous experiment in the Upanishads: put this lump of salt in water tonight. In the morning: bring me the salt. Svetaketu reaches into the water — nothing to grasp. The salt is gone.\n\nTaste from the top, says the father. Salt. From the middle. Salt. From the bottom. Salt. **The salt was not gone; it had become invisible by becoming pervasive.**\n\nJust so, says Uddalaka, that subtle essence pervades everything — and **tat tvam asi**, that is what you are.',
        sectionHeader: 'Why you cannot find your Self',
        teachingText: 'The experiment answers the modern seeker\'s complaint precisely: "I looked within and found no Self — just thoughts and sensations." Of course. Svetaketu\'s hand found no salt either.\n\nWhat pervades cannot be grasped as one object among others; it is found by a different faculty — taste, not sight; being, not introspection. You will never find the Self the way you find your keys. **You are how the water tastes.**',
        citation: 'Chandogya Upanishad 6.12–13, tr. Müller (public domain)',
      },
      {
        id: 'ba-term-tat-tvam-asi',
        kind: 'term',
        title: 'Key saying',
        keyVerse: {
          sanskrit: 'तत्त्वमसि',
          transliteration: 'tat tvam asi',
          meaning: 'you are That',
        },
        storyText:
          'Three words from a father to his son: **tat** (that, the one reality) · **tvam** (you) · **asi** (are — not "are near," not "contain," but *are*).\n\nThe subtle essence that pervades everything is not something you have. It is what you are.',
        reappears:
          'Tat tvam asi is one of the four great sayings, coming up next.',
        checks: [
          {
            id: 'chk:concept:brahman-atman:salt',
            kind: 'mcq',
            prompt: '"I looked within and found no Self — just thoughts and sensations." What did the salt experiment show?',
            options: [
              {
                text: "What pervades everything can't be grasped as one object among others — Svetaketu's hand found no salt either; it is found by tasting, not looking",
                correct: true,
              },
              { text: 'That there is, in fact, no Self to find' },
              { text: 'That the Self is a thought like any other' },
            ],
            why: 'You will never find the Self the way you find your keys, because it is what does the finding. The salt was not gone; it had become invisible by becoming everything. You are how the water tastes.',
          },
        ],
      },
      {
        id: 'ba-way-1',
        kind: 'waypoint',
        title: '2 of 4 banked',
        learnIndex: 2,
        storyText:
          "Brahman and atman are one, and the Self isn't a thing you can hold. Next comes a method for meeting it, and it works by subtraction.",
      },
      {
        id: 'ba-neti',
        title: 'Not This, Not This',
        subtitle: 'Finding the Self by removing what it is not',
        takeaway:
          'Neti neti — not this, not this. You are not anything you can observe; you are what does the observing.',
        storyText: 'The Brihadaranyaka Upanishad offers the second method, two words long: **neti neti** — not this, not this. Whatever you can observe, you are not.\n\nThe body? You watch it age — observable, so not this. Emotions? They arrive and leave while you remain to report them — not this. Thoughts? You just watched one — not this. Even the sense of being "me," the ego itself, can be caught in the act and examined — not this.\n\nThe method never says what the Self is; it strips away everything the Self is mistaken for, **the way a sculptor finds the figure by removing stone**.',
        teachingText: 'Run it on the inner critic and feel its practical teeth: the voice narrating your inadequacy is audible to you — an object in your awareness, like traffic noise. **Whatever hears it is what you are.**\n\nThe tradition\'s boldest move is to claim this remainder — the unwatchable watcher — is Brahman itself. But even before that claim, the method alone is liberating: you are not anything you can observe, and you can observe almost everything you currently call "me."',
        citation: 'Brihadaranyaka Upanishad 2.3.6 and 4.5.15 ("neti neti"), tr. Müller (public domain)',
        checks: [
          {
            id: 'chk:concept:brahman-atman:neti',
            kind: 'mcq',
            prompt: 'What is the neti-neti ("not this, not this") method?',
            options: [
              {
                text: 'Strip away everything you can observe — body, emotions, thoughts, even the ego — because whatever hears the inner critic is what you are',
                correct: true,
              },
              { text: 'Deny that anything exists at all' },
              { text: 'List the qualities that describe the Self' },
            ],
            why: 'The method never says what the Self is; it removes everything the Self is mistaken for, the way a sculptor finds the figure by removing stone. The unwatchable watcher is what remains.',
          },
        ],
      },
      {
        id: 'ba-term-neti',
        kind: 'term',
        title: 'Key saying',
        keyVerse: {
          sanskrit: 'नेति नेति',
          transliteration: 'neti neti',
          meaning: 'not this, not this',
        },
        storyText:
          'Two words, used as a tool. Point them at anything you can observe — the body, a feeling, a thought, the ego itself — and say: not this, not this.\n\nWhat is left, when nothing observable remains, is the one doing the observing. **That you cannot set aside, because it is you.**',
        reappears:
          'Neti neti is the negative path; the four great sayings, next, are the positive one.',
      },
      {
        id: 'ba-way-2',
        kind: 'waypoint',
        title: '3 of 4 banked',
        learnIndex: 3,
        storyText:
          'You are not anything you can observe. One step remains: the claim, said four ways, and what changes if it is true.',
      },
      {
        id: 'ba-mahavakyas',
        title: 'One Sentence, Said Four Ways',
        subtitle: 'The mahavakyas',
        takeaway:
          'Four great sayings say one thing with the pronoun rotated: consciousness is Brahman, you are That, I am Brahman, this Self is Brahman.',
        storyText: 'The tradition distilled the claim into four "great sayings," one from each Veda — and it is worth seeing that they are one sentence with the pronoun rotated, a curriculum in four lines: what is stated impersonally must be told to you, then found by you, then lived.',
        bullets: [
          '**Prajnanam Brahma** — consciousness is Brahman (the impersonal statement).',
          '**Tat tvam asi** — you are That (the teacher\'s statement, to a student).',
          '**Aham Brahmasmi** — I am Brahman (the student\'s discovery, in the first person).',
          '**Ayam Atma Brahma** — this Self is Brahman (the sage\'s confirmation).'
        ],
        sectionHeader: 'What changes if it is true',
        teachingText: 'Suppose it, for one day, as a working hypothesis.\n\nThen the stranger who cuts you off in traffic is the salt in the same water. Then your death is a wave subsiding, not the ocean drying. Then compassion is not a virtue you strain toward but **simple accuracy**.\n\nThe Upanishads do not ask for belief. They ask for the experiment — twelve years, or fifteen minutes tonight: what, when everything observable has been set aside, remains doing the observing?',
        citation: 'The four mahavakyas: Aitareya 3.3, Chandogya 6.8.7, Brihadaranyaka 1.4.10, Mandukya 2 — classical Vedanta enumeration',
        checks: [
          {
            id: 'chk:concept:brahman-atman:accuracy',
            kind: 'mcq',
            prompt: 'If tat tvam asi — "you are That" — is true, what does compassion become?',
            options: [
              {
                text: 'Simple accuracy — the stranger who cuts you off is the salt in the same water; your death a wave subsiding, not the ocean drying',
                correct: true,
              },
              { text: 'A virtue you must strain toward against your nature' },
              { text: 'Unnecessary, since nothing is really real' },
            ],
            why: 'The Upanishads do not ask for belief but for the experiment: when everything observable is set aside, what remains doing the observing? If the answer is one, compassion is not effort but arithmetic.',
          },
        ],
      },
    ],
    sources: [
      {
        text: 'Chandogya Upanishad',
        locator: '6.8–13 (Uddalaka and Svetaketu; the salt experiment; tat tvam asi)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
      {
        text: 'Brihadaranyaka Upanishad',
        locator: '1.4.10 (aham brahmasmi); 2.3.6, 4.5.15 (neti neti)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
      {
        text: 'Mandukya Upanishad',
        locator: 'Verses 1–2 (ayam atma brahma; Om analysis)',
        translation: 'public-domain renderings',
      },
    ],
    reflectionQuestions: [
      'When did you last feel part of something much bigger than yourself?',
      'Try neti neti now: name three things you can observe about yourself right now. Who is doing the observing?',
      'Think of one difficult person. What changes if they are the same Self, looking out of different eyes?',
    ],
  },
  {
    id: 'prana',
    name: 'Prana',
    sanskritName: 'प्राण',
    category: 'core_concepts',
    description: 'The breath beneath everything — the tradition\'s bridge between body and spirit',
    detailedExplanation: 'Prana is life-force: the energy that the tradition sees breathing in the breath, beating in the pulse, and attending in attention. The Upanishads tell a parable to rank it — the faculties quarrel over who is chief, each walks out in turn, and the body limps along without speech or sight or hearing; but when Prana rises to leave, every faculty is torn from its seat at once, and they all bow. Because breath is the one vital function that runs both automatically and voluntarily, it became the tradition\'s master handle: the place where the conscious mind can reach the autonomic body. Everything from pranayama to modern breathwork is applied prana.',
    etymology: 'Pra (forth) + an (to breathe): the breathing-forth — life as the first outward movement',
    keyAspects: [
      'Life-force known most intimately as breath',
      'The quarreling faculties: prana as the chief none can outlast',
      'Breath as the hinge between voluntary and involuntary — mind\'s handle on body',
      'Pranayama: regulating the life-force by regulating its vehicle',
      'Attention rides the breath: where prana goes, mind follows',
    ],
    practicalApplications: [
      {
        situation: 'Panic rising before a difficult conversation or presentation',
        application: 'Use the handle: exhale longer than you inhale (4 in, 8 out) for two minutes — the long exhale signals the nervous system that the emergency is over, from the body side, where arguments can\'t reach',
        benefits: ['Downshifted nervous system in minutes', 'A tool that works when thinking doesn\'t', 'Confidence from having a handle'],
        tips: ['Exhale longer than inhale to calm; even counts to steady', 'Through the nose', 'Practice calm so it\'s available in storm'],
      },
    ],
    relatedConcepts: ['brahman-atman', 'three-gunas', 'bhakti-paths'],
    scriptureReferences: [
      {
        id: 'prana-chandogya',
        text: 'Chandogya Upanishad',
        reference: '5.1',
        quote: 'When breath prepared to depart, it tore up the other senses as a great horse tears up the pegs to which it is tethered — and they said: Sir, remain; you are the best of us',
        context: 'The quarrel of the faculties — prana proven chief by subtraction',
      },
    ],
    modernRelevance: 'Modern breathwork, HRV training, and box-breathing in special forces are rediscoveries of what pranayama systematized millennia ago: the breath is the one dashboard control wired to both the conscious and autonomic systems. The tradition adds the deeper claim — tend the life-force and you tend everything it animates.',
    commonMisunderstandings: [
      'Prana is not oxygen — breath is prana\'s vehicle, not its definition',
      'Pranayama is not deep breathing for relaxation only; it is a graduated discipline with real effects and real cautions',
      'The faculties parable is not anatomy — it is a teaching about what to tend first',
      '"Energy" here is not vague: the tradition maps it (five pranas) with engineering specificity',
    ],
    examples: [
      {
        id: 'prana-example-1',
        title: 'The horse and the pegs',
        scenario: 'Each faculty leaves for a year — the body carries on, diminished; breath merely stirs to leave and all faculties start tearing loose',
        explanation: 'Chiefship is proven not by argument but by subtraction: remove each candidate and see what actually collapses',
        lesson: 'Rank your dependencies by what their absence costs — then tend the chief one first',
      },
    ],
    meditation: {
      technique: 'Counting the Chief',
      duration: '10 minutes',
      instructions: [
        'Sit and let the breath breathe itself — just watch',
        'Begin gentle counting: inhale 4, exhale 6, no strain',
        'Notice the mind\'s weather change as the count settles',
        'Ask, lightly: who is riding whom — mind on breath, or breath on mind?',
        'Close with three unforced breaths and gratitude to the quiet chief',
      ],
      benefits: ['Nervous-system regulation', 'Firsthand experience of the breath-mind hinge', 'A portable practice'],
      audioUrl: '/audio/meditations/prana-count.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '15 minutes',
      audioUrl: '/audio/guides/prana-guide.mp3',
      topics: ['The faculties\' quarrel', 'Breath as hinge', 'Pranayama\'s logic', 'Modern rediscoveries'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/philosophy/prana-icon.jpg',
    },
    difficulty: 'beginner',
    sections: [
      {
        id: 'prana-quarrel',
        title: 'The Quarrel of the Faculties',
        subtitle: 'Who is chief? Leave, and we\'ll see',
        storyText: 'The faculties of the body once argued over who was supreme — speech, sight, hearing, mind, breath, each claiming the throne. They took the dispute to the creator, who gave the only empirical answer in the history of such quarrels: **the one whose departure ruins the body is chief.**\n\nSo they left, one at a time, a year each. Speech left; the body lived on, mute but alive. Sight left; blind, but alive. Hearing left; deaf, alive. Mind left; mindless as an infant — alive.\n\nThen **Prana**, the breath, merely stirred to go — and the Upanishad gives it the tradition\'s most vivid simile: **as a great horse tearing up its tether-pegs**, breath rising tore every faculty loose at once. Remain, they said, hurriedly. You are chief.',
        teachingText: 'The parable is a ranking algorithm you can use on your own life: order your dependencies not by how loudly they claim importance but by **what actually collapses when each is subtracted**.\n\nThe tradition ran the algorithm on the body and found breath. Run it on your days — sleep, attention, relationships, phone — and see what is genuinely chief, then tend that first.',
        citation: 'Chandogya Upanishad 5.1.6–15; parallel telling in Prashna Upanishad 2 — tr. Müller (public domain)',
      },
      {
        id: 'prana-hinge',
        title: 'The Handle on the Door',
        subtitle: 'Why breath, of all things',
        storyText: 'Of everything your body does to keep you alive, almost all of it runs locked away from your will: you cannot decide your heartbeat, instruct your digestion, or negotiate with your immune system.\n\n**Breath is the great exception** — it runs perfectly on automatic, and yet the moment you attend to it, it is yours to slow, deepen, hold, release. It is the one vital process with **a handle on both sides of the door**: autonomic and voluntary.\n\nThe tradition noticed this anomaly thousands of years ago and drew the engineering conclusion — if mind and body meet anywhere, they meet here, and whoever governs the meeting place can influence both sides.',
        sectionHeader: 'Where prana goes, mind follows',
        teachingText: 'Hence the tradition\'s working axiom: **breath and mind ride together.** Agitate one and the other bolts; settle one and the other settles.\n\nYou have verified this backwards all your life — fear shortens breath, grief makes it ragged. Pranayama simply runs the causation forward on purpose: lengthen the exhale and the panic, finding its vehicle slowing, dismounts.',
        citation: 'The breath-mind coupling: Hatha and Yoga traditions (e.g., Hatha Yoga Pradipika 2.2: "when breath wanders, the mind is unsteady")',
      },
      {
        id: 'prana-discipline',
        title: 'Pranayama: The Discipline of the Handle',
        subtitle: 'From the Gita to the box breath',
        storyText: 'The Gita lists among its sacrifices "the offering of prana into apana and apana into prana" — the in-breath and out-breath poured into each other, **breath itself made the ritual**.\n\nFrom that seed grew **pranayama**, the yogic science of breath regulation: extension of the exhale, balanced counts, retention introduced gradually and with a teacher. The tradition treats it with respect bordering on caution — this is a real intervention in a real system, not a wellness garnish.\n\nTwenty-five centuries later, cardiologists measure heart-rate variability, special forces teach box breathing before combat, and therapists prescribe the long exhale for panic — **the handle, rediscovered wing by wing**.',
        teachingText: 'The modern rediscoveries validate the map but miss the destination.\n\nBreathwork as mere performance-enhancement is pranayama with the top sawn off: in the tradition, the settled breath is not the goal but the doorway — a nervous system quiet enough that the deeper inquiries (who is breathing?) can finally be heard. **Calm is the vestibule, not the temple.**',
        citationLink: 'gita:4',
        citation: 'Bhagavad Gita 4.29, tr. Sivananda (public domain); graduated pranayama: Yoga Sutras 2.49–53',
      },
      {
        id: 'prana-tending',
        title: 'Tending the Chief',
        subtitle: 'A life-force maintenance view of your day',
        storyText: 'The tradition\'s five-fold map of prana — energies of **intake, elimination, circulation, ascent, and integration** — reads like a maintenance manual: life-force is drawn in, moved, spent, and restored, and a day can be audited by its prana books.\n\nWhat genuinely restores yours — sleep, food that agrees with you, morning air, certain people? What reliably drains it — certain other people, the 1 a.m. scroll, rooms you leave tireder than you entered?\n\nThe vocabulary is ancient; the audit is uncomfortably contemporary.',
        sectionHeader: 'The audit',
        teachingText: 'For one week, keep the books: two columns, **restored** and **drained**, filled honestly each evening. The tradition\'s wager is that you already know the answers and have been overruling them — and that the chief faculty, like any chief, mostly needs you to **stop working against it**.\n\nGuard the breath\'s hours (dawn, dusk, before sleep), spend attention like the currency it is, and the whole staff of faculties works better under a well-tended chief.',
        citation: 'The five pranas (prana, apana, vyana, udana, samana): Prashna Upanishad 3; Taittiriya Upanishad 2',
      },
    ],
    sources: [
      {
        text: 'Chandogya Upanishad',
        locator: '5.1.6–15 (the quarrel of the faculties)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
      },
      {
        text: 'Prashna Upanishad',
        locator: 'Questions 2–3 (prana\'s supremacy; the five pranas)',
        translation: 'public-domain renderings',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:4',
        locator: '4.29 (breath offered into breath)',
        translation: 'Swami Sivananda (public domain)',
      },
    ],
    reflectionQuestions: [
      'What reliably restores your energy, and what reliably drains it?',
    ],
  },
  {
    id: 'guru',
    name: 'The Guru',
    sanskritName: 'गुरु',
    category: 'core_concepts',
    description: 'How wisdom actually moves between people — the tradition\'s theory of transmission',
    detailedExplanation: 'The tradition\'s deepest technological insight may be about knowledge transfer: information can be broadcast, but wisdom moves person to person, or not at all. Gu-ru — darkness-remover. The guru is not merely someone who knows more; it is someone whose presence dispels your specific not-knowing, which is why books alone were never considered sufficient and why the Upanishads are literally named after the transmission posture ("sitting down near"). The Gita gives the protocol — approach, serve, question — and the epics give the warnings: teachers can fail (Drona), and devotion can be exploited. The tradition holds both: reverence for the channel, honesty about its failures.',
    etymology: 'Gu (darkness) + ru (remover): the one who removes darkness — traditional etymology given in the Advayataraka Upanishad',
    keyAspects: [
      'Wisdom is handed over, not downloaded — parampara, the unbroken chain',
      'The Gita\'s protocol: approach, serve, question (4.34)',
      'Upanishad means "sitting down near" — the posture is the method',
      'The teacher can fail: the tradition\'s own cautionary tales',
      'Gurus today: teachers, texts, and the inner teacher',
    ],
    practicalApplications: [
      {
        situation: 'You want to learn something real (a craft, a practice, a field) and are drowning in content',
        application: 'Apply the Gita\'s filter: find someone who has walked it, put yourself usefully near them (serve), and earn the right to question — one living teacher beats a thousand tutorials',
        benefits: ['Compressed learning', 'Correction you cannot give yourself', 'A relationship, not just information'],
        tips: ['Proximity + service + questions, in that order', 'Choose teachers by their students, not their marketing', 'Verify — reverence is not the surrender of judgment'],
      },
    ],
    relatedConcepts: ['bhakti-paths', 'brahman-atman', 'dharma'],
    scriptureReferences: [
      {
        id: 'guru-gita-434',
        text: 'Bhagavad Gita',
        reference: 'Chapter 4, Verse 34',
        quote: 'Know that by prostration, by question, and by service; the wise who have realized the Truth will instruct thee in that knowledge',
        context: 'The transmission protocol: humility, inquiry, and usefulness open the channel',
      },
    ],
    modernRelevance: 'In the age of infinite tutorials, the guru principle is a filter: information is abundant, transformation is scarce, and transformation still moves the old way — through people who have it, to people positioned near them. Mentorship, apprenticeship, therapy, coaching: the sitting-down-near keeps being reinvented.',
    commonMisunderstandings: [
      'A guru is not necessarily a robed figure with followers — parents, grandmothers, and honest mentors carry the function',
      'Reverence for the guru is not surrender of judgment: the tradition\'s own stories warn against teachers who exploit',
      'Books and apps can carry information; the tradition\'s claim is that dislodging YOUR specific darkness usually takes a person',
      '"Be your own guru" is a half-truth: the inner teacher matures under outer ones',
    ],
    examples: [
      {
        id: 'guru-example-1',
        title: 'Ekalavya\'s thumb',
        scenario: 'Rejected by Drona, Ekalavya practices before a clay image of him and surpasses the master\'s own students — and Drona, protecting Arjuna\'s primacy, demands Ekalavya\'s right thumb as fee',
        explanation: 'The story honors the student\'s devotion and lets the teacher\'s act stand in all its injustice — the Mahabharata does not flinch',
        lesson: 'The tradition itself warns: the channel of transmission is sacred, and the humans in it can fail it',
      },
    ],
    meditation: {
      technique: 'Gratitude to the Chain',
      duration: '10 minutes',
      instructions: [
        'Call to mind the person who taught you the thing you most rely on',
        'Recall who might have taught them — feel the chain extend backward beyond sight',
        'Notice what in you today exists only because of that handover',
        'Ask: what am I carrying that someone downstream is waiting for?',
        'Close by naming one concrete handover you could make this month',
      ],
      benefits: ['Gratitude with structure', 'Your place in the chain made visible', 'Teaching reframed as duty, not favor'],
      audioUrl: '/audio/meditations/guru-chain.mp3',
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '16 minutes',
      audioUrl: '/audio/guides/guru-guide.mp3',
      topics: ['Why wisdom needs a person', 'The Gita\'s protocol', 'Ekalavya honestly told', 'Gurus now'],
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/philosophy/guru-icon.jpg',
    },
    difficulty: 'beginner',
    sections: [
      {
        id: 'guru-why-person',
        title: 'Why Wisdom Needs a Person',
        subtitle: 'The bandwidth problem no book solves',
        storyText: 'The tradition that produced the world\'s longest texts holds a surprising position: **texts are not enough.**\n\nThe Upanishads — the crown of the scriptures — are named not for their content but for their delivery posture: **upa-ni-shad**, to sit down near. Whatever these teachings are, the name insists, they pass at close range.\n\nThe reason is diagnostic, not mystical: your ignorance is not general but specific — a particular knot, tied by your particular history, invisible to you precisely because you see by means of it. A book addresses everyone\'s knot. Only something that can look at you — question you, catch you, wait for you — addresses yours. **Gu-ru: the remover of darkness.** Not all darkness. Yours.',
        teachingText: 'This is why the tradition ranks the living teacher above the library, and why every serious craft still does: the surgeon trains under surgeons, the pianist under pianists, the meditator under meditators.\n\n**Information scales; correction does not.** What can be broadcast was never the bottleneck.',
        citation: 'Upanishad etymology (upa-ni-shad, "sitting near"): standard; gu-ru etymology: Advayataraka Upanishad 16',
      },
      {
        id: 'guru-protocol',
        title: 'The Protocol: Approach, Serve, Question',
        subtitle: 'Gita 4.34 as an operating manual',
        openingVerse: {
          sanskrit: 'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया',
          transliteration: 'tad viddhi praṇipātena paripraśnena sevayā',
          meaning: 'Know that by prostration, by repeated question, and by service — the knowers of Truth will teach you',
        },
        storyText: 'The Gita compresses the whole transmission protocol into one verse with three verbs:',
        bullets: [
          '**Pranipata** — approach with humility. The bowed head is not self-abasement but an open port; nothing enters a vessel that arrives full.',
          '**Pariprashna** — question, repeatedly. The tradition has no use for silent nodding; the root means thorough, probing inquiry, and the entire Gita is itself one long pariprashna by Arjuna.',
          '**Seva** — serve. Put yourself usefully near the teacher, because wisdom leaks continuously from how a knower lives, and only proximity collects it.'
        ],
        teachingText: 'Three verbs — and note what is absent: no fee, no enrollment, no passive consumption.\n\nRun the protocol on your own ambitions. For whatever you most want to learn: whom could you approach with genuine humility? What service would put you in the room where their judgment is exercised? And do you have real questions — or only the wish to have already learned?\n\nThe verse is twenty-five centuries old and outperforms most modern pedagogy.',
        citationLink: 'gita:4',
        citation: 'Bhagavad Gita 4.34, tr. Sivananda (public domain)',
      },
      {
        id: 'guru-ekalavya',
        title: 'Ekalavya: The Story the Tradition Tells Against Itself',
        subtitle: 'Devotion, a clay statue, and a thumb',
        storyText: 'The Mahabharata tells it without flinching.\n\n**Ekalavya**, a tribal prince, asks **Drona** — teacher of the royal cousins — to accept him. Drona refuses; his obligations belong to the princes. Ekalavya bows, withdraws to the forest, shapes a clay image of Drona, and practices archery before it with total devotion until he surpasses every royal student.\n\nWhen Drona discovers this — and sees Arjuna\'s promised supremacy threatened — he does something the epic lets stand in its full ugliness: he claims the traditional teacher\'s fee, **guru-dakshina**, from a student he never taught. He asks for Ekalavya\'s right thumb.\n\nAnd Ekalavya, without hesitation, cuts it off and lays it at the feet of the man who refused him.',
        sectionHeader: 'Reading it honestly',
        teachingText: 'The story honors Ekalavya extravagantly — his devotion made a clay statue into a working guru, proof that **the student\'s fire matters more than the teacher\'s presence**. And it convicts Drona quietly, in the way epics convict: by consequences and by the reader\'s own recoil.\n\nThe tradition keeps this story on purpose. It is the warning label on the guru principle: the channel is sacred; the humans in it can fail it; and reverence was never meant to disable your judgment. **Honor teachers. Verify them too.**',
        citation: 'Mahabharata, Adi Parva (Sambhava sub-parva, the Ekalavya episode), tr. K.M. Ganguli (public domain)',
      },
      {
        id: 'guru-now',
        title: 'Your Gurus, Present Tense',
        subtitle: 'The chain runs through ordinary rooms',
        storyText: 'Strip the exotic costume off the word and count your actual gurus: the grandmother whose festival hands taught yours; the teacher who saw you before you were visible to yourself; the mentor whose one sentence rerouted a decade; the friend who plays Jambavan and reminds you of strength you had misfiled.\n\nThe tradition\'s claim is not that you need a robed figure on a mountain — it is that the darkness-removing function is real, distributable, and **already operating in your life, mostly unthanked**.\n\n**Guru Purnima**, the summer full moon, exists precisely for the accounting: one day a year to name the chain you hang from.',
        sectionHeader: 'Both directions',
        teachingText: 'And the chain points both ways. **Parampara** — the unbroken succession — only stays unbroken if each link accepts both roles.\n\nSomewhere downstream of you, someone is sitting in your old darkness, and what you carry — the recipe, the prayer, the hard-won professional judgment, this very tradition you are learning — is the lamp they are waiting for.\n\nThe final teaching of the guru principle is that you do not get to remain only a student. **Sit near. Then be sat near.**',
        citation: 'Guru Purnima and parampara: living tradition; the teaching function as distributed: cf. Dattatreya\'s 24 gurus, Bhagavata Purana 11.7–9',
      },
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:4',
        locator: '4.34 (the transmission protocol)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Mahabharata',
        locator: 'Adi Parva, Sambhava sub-parva (Ekalavya)',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Advayataraka Upanishad',
        locator: 'Verse 16 (gu-ru etymology)',
      },
      {
        text: 'Bhagavata Purana',
        locator: '11.7–9 (Dattatreya\'s twenty-four gurus)',
        translation: 'wisdomlib.org (public)',
      },
    ],
    reflectionQuestions: [
      'Who has been a real teacher in your life — and have you ever thanked them?',
    ],
  },
  {
    id: 'dharma',
    name: 'Dharma',
    sanskritName: 'धर्म',
    category: 'core_concepts',
    description: 'The art of righteous living and cosmic principle that upholds the universe',
    detailedExplanation: 'Dharma is the cosmic principle that upholds the universe—it\'s both the natural law that keeps planets in orbit and the moral law that guides human behavior. For each individual, dharma becomes deeply personal: the unique way you\'re meant to contribute to the world\'s harmony based on your nature, circumstances, and stage of life. It\'s not found in rigid rules but in the conscious navigation of competing responsibilities. Your dharmic journey isn\'t about reaching a destination but about becoming someone who naturally chooses love, truth, and service in each moment.',
    etymology: 'From the Sanskrit root "dhr" meaning "to hold" or "to support" - that which holds together and supports the universe',
    keyAspects: [
      'Cosmic principle that upholds the universe',
      'Personal authentic contribution to world harmony',
      'Context-sensitive navigation of competing responsibilities',
      'Evolution through different life stages',
      'Balance between individual authenticity and collective welfare'
    ],
    practicalApplications: [
      {
        situation: 'Dream job vs team loyalty',
        application: 'Consider the welfare of current team while pursuing personal growth - seek solutions that honor both',
        benefits: ['Clear conscience', 'Maintained relationships', 'Authentic growth'],
        tips: ['Look for creative solutions', 'Communicate openly with all parties', 'Consider timing and transitions']
      },
      {
        situation: 'Competing family duties',
        application: 'Balance care for parents, spouse, children according to circumstances and life stage',
        benefits: ['Family harmony', 'Personal authenticity', 'Reduced guilt'],
        tips: ['Understand your current life stage', 'Seek family council', 'Remember dharma evolves with time']
      },
      {
        situation: 'Moral dilemmas at work',
        application: 'Navigate between company loyalty and ethical principles through conscious choice-making',
        benefits: ['Personal integrity', 'Long-term trust', 'Meaningful work'],
        tips: ['Consider all stakeholders affected', 'Seek guidance from mentors', 'Remember context matters in ethics']
      }
    ],
    relatedConcepts: ['karma', 'ahimsa', 'truth', 'artha', 'moksha'],
    scriptureReferences: [
      {
        id: 'dharma-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 3, Verse 35',
        quote: 'Better is one\'s own dharma, though imperfectly performed, than the dharma of another well performed',
        context: 'Krishna teaches Arjuna about following one\'s authentic path rather than imitating others'
      },
      {
        id: 'dharma-mahabharata-1',
        text: 'Mahabharata',
        reference: 'Vana Parva',
        quote: 'Dharma is for the welfare of all beings. Hence, that by which the welfare of all living beings is sustained, that is dharma',
        context: 'Yudhishthira explains the universal nature of dharma'
      }
    ],
    modernRelevance: 'In our complex modern world, dharma offers a way to live with purpose, integrity, and hope. It teaches us that what\'s dharmic for you might not be dharmic for someone else, and that your unique talents and interests are clues to your dharmic path. Whether facing workplace dilemmas, family responsibilities, or life transitions, dharma provides a framework for authentic self-expression in service to something larger.',
    commonMisunderstandings: [
      'Dharma is not rigid religious rules but flexible ethical principles',
      'You don\'t have to be perfect to be dharmic - growth and learning are part of the path',
      'What\'s dharmic for you might not be dharmic for someone else based on nature and circumstances',
      'It\'s not about becoming someone else\'s version of success but your authentic contribution',
      'Dharma doesn\'t always align with desires but leads to meaningful living'
    ],
    examples: [
      {
        id: 'dharma-example-1',
        title: 'Arjuna\'s Moral Crisis',
        scenario: 'On the battlefield of Kurukshetra, Arjuna faces his beloved teachers and cousins as enemies',
        explanation: 'His duty as a warrior demands he fight, but his heart rebels against harming those he loves',
        lesson: 'Dharma sometimes requires difficult choices that transcend personal comfort'
      },
      {
        id: 'dharma-example-2',
        title: 'Karna\'s Choice of Loyalty',
        scenario: 'Learning he\'s the eldest Pandava, Karna could claim the crown but chooses loyalty to Duryodhana',
        explanation: 'He sacrifices legitimate birthright for gratitude and honor to someone who showed him respect',
        lesson: 'Sometimes dharma means choosing relationships and values over personal advancement'
      }
    ],
    meditation: {
      technique: 'Authentic Dharma Meditation',
      duration: '15-20 minutes',
      instructions: [
        'Bring to mind a current situation requiring a conscious choice',
        'Ask: "What would authentic love and service look like here?"',
        'Consider your unique nature, talents, and life circumstances',
        'Feel for the choice that serves both your growth and others\' welfare',
        'Release attachment to specific outcomes or others\' approval',
        'Rest in trust that dharmic action creates meaningful results'
      ],
      benefits: ['Authentic decision-making', 'Reduced people-pleasing', 'Trust in your path', 'Meaningful action'],
      audioUrl: '/audio/meditations/dharma-reflection.mp3'
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '28 minutes',
      audioUrl: '/audio/guides/dharma-guide.mp3',
      topics: ['Art of righteous living', 'Personal vs universal dharma', 'Epic stories and lessons', 'Authentic self-expression', 'Dharma through life stages']
    },
    podcastEpisodes: [
      {
        id: 'dharma-podcast-1',
        title: 'Living Your Dharma in the Modern World',
        description: 'How to apply ancient wisdom of dharma to contemporary ethical challenges',
        duration: '35 minutes',
        audioUrl: '/podcasts/dharma-modern.mp3',
        topics: ['Workplace ethics', 'Family duties', 'Social responsibility', 'Personal integrity']
      }
    ],
    images: {
      heroImage: require('../../assets/images/covers/dharma-cover.png'),
      iconImage: '/images/philosophy/dharma-icon.jpg',
      infographics: ['/images/philosophy/dharma-types.jpg', '/images/philosophy/dharma-decision-tree.jpg']
    },
    difficulty: 'intermediate',
    kicker: 'Not one rule for everyone. The right thing depends on who you are, and where you stand.',
    learnItems: [
      'Dharma means what upholds — the right thing, for you, here',
      'Your dharma is personal (svadharma), not a rule copied from a book',
      'What is right changes with your stage and role',
      "Better your own dharma imperfectly than another's perfectly",
      "You don't have to be perfect to be dharmic",
      'The highest dharma is love',
    ],
    handoff:
      'You know now what is yours to do. But every choice you make sends something out ahead of you, and one day it comes back. The tradition has a name for that returning force: karma.',
    sections: [
      {
        id: 'dharma-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'You already carry a sense of duty. What Hinduism adds is a surprising twist: there is no single rulebook that fits everyone. What is right depends on who you are, where you stand, and who is leaning on you.\n\nOver the next few pages, dharma turns from a vague word for "being good" into a working question you can ask on any ordinary day.',
      },
      {
        id: 'dharma-opening',
        title: 'The Art of Righteous Living',
        subtitle: 'A warrior frozen between two duties',
        takeaway:
          'Dharma begins where Arjuna froze: a real choice between two duties, with no easy rule to settle it.',
        storyText:
          'The most famous conversation about doing the right thing in Hinduism opens on a battlefield. Two armies face each other at a place called **Kurukshetra**, about to begin a terrible civil war. Between them, a warrior-prince named **Arjuna** stands frozen, his bow slipping from his trembling hands. He is about to hear the **Bhagavad Gita**, one of the best-loved scriptures in Hinduism.\n\nBefore him are his beloved teachers, cousins, and friends \u2014 all armed and ready for war. His duty as a warrior demands he fight. His heart rebels against harming those he loves.\n\nThis moment of moral crisis births one of humanity\u2019s greatest conversations about **dharma**.',
        citationLink: 'gita:1',
        citation: 'Bhagavad Gita, Chapter 1 (Arjuna\u2019s crisis)',
      },
      {
        id: 'dharma-meaning',
        title: 'What Dharma Really Means',
        subtitle: 'Bigger than "duty"',
        takeaway:
          'Dharma means what upholds. It is the order that holds the world together, and your own right place within it.',
        openingVerse: {
          sanskrit: '\u0927\u0930\u094d\u092e \u090f\u0935 \u0939\u0924\u094b \u0939\u0928\u094d\u0924\u093f \u0927\u0930\u094d\u092e\u094b \u0930\u0915\u094d\u0937\u0924\u093f \u0930\u0915\u094d\u0937\u093f\u0924\u0903',
          transliteration: 'dharma eva hato hanti dharmo rak\u1e63ati rak\u1e63ita\u1e25',
          meaning: 'Dharma destroys those who destroy it; dharma protects those who protect it',
        },
        storyText:
          'Dharma is often translated as **"duty"** or **"righteousness"** \u2014 but these English words are too small for it.\n\nDharma is the cosmic principle that **upholds the universe**. It is both the natural law that keeps planets in orbit and the moral law that guides human behavior. The word comes from the root **dhr** \u2014 \u201cto hold\u201d: dharma is what holds everything together.',
        citation: 'Manusmriti 8.15 (dharma protects its protectors); root "dhr": standard etymology',
      },
      {
        id: 'dharma-term-dharma',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'धर्म',
          transliteration: 'dharma',
          meaning: 'what upholds — the right thing, for you, here',
        },
        storyText:
          'The root of the word means *to uphold*. Your dharma is whatever upholds the people and the world that rest on you, and that is why it shifts when your role shifts.\n\nThe easiest way to use it is as a question. **What is mine to do?**',
        reappears:
          'Dharma is also the first of the four aims of life, and the word the Gita spends eighteen chapters on.',
        checks: [
          {
            id: 'chk:concept:dharma:meaning',
            kind: 'mcq',
            prompt: 'Dharma is often translated simply as "duty." Why is that translation too small?',
            options: [
              {
                text: 'Dharma is what upholds — the natural and moral order, and your particular place within it — of which a duty is only the smallest corner',
                correct: true,
              },
              { text: 'Because dharma actually means "religion," not duty' },
              { text: 'Because dharma applies only to priests, not ordinary people' },
            ],
            why: 'The root dhṛ means to hold. Dharma is what holds a life, a family, and a world together. "Duty" catches only one small corner of that.',
          },
        ],
      },
      {
        id: 'dharma-personal',
        title: 'Your Personal Dharma',
        subtitle: 'The universal becomes intimate',
        takeaway:
          'Your dharma is personal. It is your particular way of holding up the world, not a rule copied from someone else.',
        keyVerse: {
          sanskrit: '\u0927\u0930\u094d\u092e\u094b \u0939\u093f \u0938\u0930\u094d\u0935\u092d\u0942\u0924\u093e\u0928\u093e\u0902 \u0936\u094d\u0930\u0947\u092f\u094b \u092f\u094b \u0927\u093e\u0930\u092f\u0947\u0924\u094d',
          transliteration: 'dharmo hi sarvabh\u016bt\u0101n\u0101\u1e43 \u015breyo yo dh\u0101rayet',
          meaning: 'Dharma exists for the welfare of all beings',
        },
        storyText:
          'For each individual, dharma becomes deeply personal: the unique way **you** are meant to contribute to the world\u2019s harmony, based on your nature, your circumstances, and your stage of life.\n\nConsider this: you\u2019re offered your dream job, but accepting it means your current team will struggle through a critical project without you. What would dharma look like here?\n\nNot a rule from a book \u2014 a **conscious navigation of competing responsibilities**. That navigation is the practice.',
        citation: 'Mahabharata, Vana Parva (dharma as welfare of beings)',
      },
      {
        id: 'dharma-stages',
        title: 'Dharma Through Life\u2019s Stages',
        subtitle: 'What is right changes as you grow',
        takeaway:
          'What is right changes as you grow. Ask not only what is right, but what is right for where you now stand.',
        storyText:
          'Your relationship with dharma evolves as you mature.\n\nIn youth, dharma often feels externally imposed \u2014 parents\u2019 guidance, teachers\u2019 rules, society\u2019s expectations. The young **Rama** dutifully obeys his father\u2019s command to live in exile, even though it upends his coronation.\n\nAs a householder, dharma grows complex and personal: your needs balanced against partner, children, parents, career, community. The Ramayana shows this too \u2014 Rama\u2019s hardest choices come not in the forest but **on the throne**.',
        teachingText:
          'The same act can be dharmic at one stage of life and adharmic at another. Ask not only “what is right?” but “what is right **for where I now stand**?”',
        citation: 'Valmiki Ramayana, Ayodhya Kanda (the exile)',
      },
      {
        id: 'dharma-differences',
        title: 'When Your Dharma Differs From Others\u2019',
        subtitle: 'Svadharma \u2014 your own path',
        takeaway:
          "Better to do your own dharma imperfectly than another's perfectly. Two people can owe the world genuinely different things.",
        keyVerse: {
          sanskrit: '\u0936\u094d\u0930\u0947\u092f\u093e\u0928\u094d\u0938\u094d\u0935\u0927\u0930\u094d\u092e\u094b \u0935\u093f\u0917\u0941\u0923\u0903 \u092a\u0930\u0927\u0930\u094d\u092e\u093e\u0924\u094d\u0938\u094d\u0935\u0928\u0941\u0937\u094d\u0920\u093f\u0924\u093e\u0924\u094d',
          transliteration: '\u015brey\u0101n sva-dharmo vigu\u1e47a\u1e25 para-dharm\u0101t sv-anu\u1e63\u1e6dhit\u0101t',
          meaning: 'Better to perform one\u2019s own dharma imperfectly than another\u2019s dharma perfectly',
        },
        storyText:
          'The genius of Hindu thought is recognizing that **what\u2019s dharmic for you might not be dharmic for someone else**.\n\nKrishna encourages Arjuna to fight because Arjuna is a warrior by nature \u2014 his dharma lies in protecting others through strength and courage. But Krishna himself chooses to be Arjuna\u2019s **charioteer** rather than pick up weapons, because his dharma in that moment is to guide.\n\nSame battlefield. Two completely different dharmas. Both right.',
        citationLink: 'gita:3',
        citation: 'Bhagavad Gita 3.35, tr. Sivananda (public domain)',
      },
      {
        id: 'dharma-term-svadharma',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'स्वधर्म',
          transliteration: 'svadharma',
          meaning: 'your own dharma — the duty of your nature and role',
        },
        storyText:
          "Sva means *one's own*. Your svadharma is the right thing for your particular nature and role, which is why it can differ from your neighbor's and both be right.\n\nKrishna fights; Krishna's charioteer guides. **Same field, two right paths.**",
        reappears:
          "Svadharma is why the Gita tells Arjuna to fight rather than flee: his path is the warrior's, not the monk's.",
        checks: [
          {
            id: 'chk:concept:dharma:svadharma',
            kind: 'mcq',
            prompt:
              'Krishna urges Arjuna to fight, yet Krishna himself only drives the chariot. How can both be right?',
            options: [
              {
                text: "Each acts from his own svadharma — the duty of his nature and role — and dharma is measured against that, not one rule for all",
                correct: true,
              },
              { text: 'Krishna is exempt from dharma because he is divine' },
              { text: 'One of them must be wrong; dharma is the same for everyone' },
            ],
            why: "The right thing is role-shaped. A soldier's dharma and a guide's dharma genuinely differ, and each is judged by his own, not the other's.",
          },
        ],
      },
      {
        id: 'dharma-way-1',
        kind: 'waypoint',
        title: '4 of 6 banked',
        learnIndex: 4,
        storyText:
          'So dharma is what upholds, it is yours in particular, and it shifts as you do. Next: what to do when your dharma pulls hard against what you want.',
      },
      {
        id: 'dharma-desire',
        title: 'When Dharma Conflicts With Desire',
        subtitle: 'Karna at the crossroads',
        takeaway:
          'Dharma often cuts against desire. Doing the right thing sometimes costs you the very thing you wanted.',
        keyVerse: {
          sanskrit: '\u0915\u0930\u094d\u092e\u0923\u094d\u092f\u0947\u0935\u093e\u0927\u093f\u0915\u093e\u0930\u0938\u094d\u0924\u0947 \u092e\u093e \u092b\u0932\u0947\u0937\u0941 \u0915\u0926\u093e\u091a\u0928',
          transliteration: 'karma\u1e47y ev\u0101dhik\u0101ras te m\u0101 phale\u1e63u kad\u0101cana',
          meaning: 'You have the right to perform your prescribed duty, but not to the fruits of action',
        },
        storyText:
          'One of dharma\u2019s hardest aspects: it doesn\u2019t always align with what we want.\n\nIn the Mahabharata, **Karna** learns a shattering secret \u2014 he is actually the eldest brother of the **Pandavas** he has sworn to fight. He could claim his rightful place as crown prince. But doing so would betray **Duryodhana**, who gave him respect and friendship when no one else would.\n\nKarna chooses loyalty over birthright \u2014 sacrificing a legitimate claim for the sake of gratitude and honor.',
        teachingText:
          'The Gita\u2019s insight: dharmic action requires **detachment from outcomes**. This isn\u2019t passivity \u2014 it\u2019s trusting the process when you act from genuine dharmic motivation, even when you can\u2019t control the results.',
        citationLink: 'gita:2',
        citation: 'Karna\u2019s choice: Mahabharata, Udyoga Parva; verse: Bhagavad Gita 2.47, tr. Sivananda',
      },
      {
        id: 'dharma-authenticity',
        title: 'The Dharma of Authentic Self-Expression',
        subtitle: 'Hanuman\u2019s strength in service',
        takeaway:
          "Your dharma is your fullest self in service of something larger, not someone else's idea of success.",
        storyText:
          'Perhaps the most radical aspect of dharmic living is its call to **authenticity**. Your dharma isn\u2019t about becoming someone else\u2019s version of success \u2014 it\u2019s about becoming the fullest expression of your authentic self **in service to something larger**.\n\n**Hanuman** exemplifies this beautifully. He could have used his immense powers for personal glory. Instead, his dharma was devotional service to Rama \u2014 and his strength became meaningful precisely because it was dedicated to protecting righteousness.',
        citation: 'Hanuman\u2019s service: Valmiki Ramayana, Sundara Kanda',
      },
      {
        id: 'dharma-relationships',
        title: 'Living Dharma in Relationship',
        subtitle: 'Sita\u2019s inner light in Lanka',
        takeaway:
          'Dharma is lived between people. Your choices quietly give others permission for theirs.',
        storyText:
          'Dharma isn\u2019t a solitary pursuit. The Ramayana and Mahabharata are fundamentally stories about **relationships** \u2014 siblings, spouses, friends, teachers and students, rulers and subjects.\n\nConsider **Sita\u2019s** dharma during her captivity in Lanka. She maintains her dignity and devotion despite Ravana\u2019s threats and promises \u2014 not because she is passive, but because her inner steadfastness serves a larger purpose. It ultimately leads to Ravana\u2019s downfall and dharma\u2019s restoration.',
        teachingText:
          'In your own relationships, dharmic living means understanding that **you affect others through your choices**. When you live authentically and ethically, you give others permission to do the same.',
        citation: 'Sita in Lanka: Valmiki Ramayana, Sundara Kanda',
      },
      {
        id: 'dharma-imperfection',
        title: 'The Wisdom of Imperfection',
        subtitle: 'Even the great ones stumble',
        takeaway:
          'You do not have to be perfect to be dharmic. Even the great ones stumble, and return.',
        storyText:
          'One of dharma\u2019s most compassionate teachings: **you don\u2019t have to be perfect to be dharmic.** Even the greatest figures in the epics make real mistakes:',
        bullets: [
          '**Rama** banishes Sita based on public opinion rather than his own judgment',
          '**Yudhishthira**, the eldest and most honest of the five royal Pandava brothers (the heroes of the Mahabharata), gambles his family into exile',
          '**Arjuna** initially refuses to fight, paralyzed by attachment',
        ],
        teachingText:
          'What makes them dharmic isn\u2019t perfection \u2014 it\u2019s their willingness to **learn, grow, and return to righteousness** despite their flaws. When your own choices misfire, the dharmic response isn\u2019t self-punishment. It is honest reflection and renewed commitment.',
        citationLink: 'gita:1',
        citation: 'Episodes: Valmiki Ramayana (Uttara tradition); Mahabharata, Sabha Parva; Bhagavad Gita ch. 1',
      },
      {
        id: 'dharma-way-2',
        kind: 'waypoint',
        title: '5 of 6 banked',
        learnIndex: 5,
        storyText:
          'Dharma is not a spotless record; it is a direction you keep returning to. One idea remains, and it is the one that holds all the others.',
      },
      {
        id: 'dharma-ultimate',
        title: 'The Ultimate Dharma',
        subtitle: 'Love as the highest duty',
        takeaway:
          'The highest dharma is love. When you act from it, you act rightly without keeping score.',
        keyVerse: {
          sanskrit: '\u0938\u0930\u094d\u0935\u0927\u0930\u094d\u092e\u093e\u0928\u094d\u092a\u0930\u093f\u0924\u094d\u092f\u091c\u094d\u092f \u092e\u093e\u092e\u0947\u0915\u0902 \u0936\u0930\u0923\u0902 \u0935\u094d\u0930\u091c',
          transliteration: 'sarva-dharm\u0101n parityajya m\u0101m eka\u1e43 \u015bara\u1e47a\u1e43 vraja',
          meaning: 'Abandon all varieties of dharma and surrender unto me',
        },
        storyText:
          'In the Gita\u2019s final chapter, Krishna offers what many consider the ultimate teaching: “Abandon all varieties of dharma and surrender unto me. I shall deliver you from all sinful reactions.”\n\nThis isn\u2019t a rejection of dharma \u2014 it is its **deepest fulfillment**. When your actions arise from genuine love, compassion, and dedication to the universal good, you naturally act dharmically, without the anxiety of constantly calculating right and wrong.',
        teachingText:
          'This surrendered dharma appears in the moments when you act from pure compassion without counting the cost \u2014 when you tell the truth knowing it will complicate your life, when you choose **love over fear**. Your life becomes both uniquely yours and part of something infinitely larger.',
        citationLink: 'gita:18',
        citation: 'Bhagavad Gita 18.66, tr. Sivananda (public domain)',
        checks: [
          {
            id: 'chk:concept:dharma:ultimate',
            kind: 'mcq',
            prompt: '"Abandon all dharmas and surrender to Me." Is Krishna rejecting dharma?',
            options: [
              {
                text: "No — it is dharma's deepest fulfilment: act from love, and right action follows without anxious calculation",
                correct: true,
              },
              { text: 'Yes — the Gita ends by throwing duty out altogether' },
              { text: 'Only warriors are allowed to set dharma aside' },
            ],
            why: 'When action flows from compassion and dedication to the whole, you act rightly without constantly weighing right and wrong. Love is not the abandonment of duty; it is duty, unclenched.',
          },
        ],
      },
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:2',
        locator: 'Chapters 2–3 and 18 (verses 2.47, 3.35, 18.66)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Valmiki Ramayana & Mahabharata',
        locator: "Ayodhya Kanda (Rama's exile); Sundara Kanda (Hanuman, Sita); Udyoga Parva (Karna)",
        translation: 'episodes as cited per section',
      },
    ],
    reflectionQuestions: [
      "Where are you living someone else's dharma — a version of success that was never really yours?",
      'Think of a duty that pulls against what you want right now. What would acting from dharma, not desire, look like?',
      'Whose life are you quietly holding up? What does that person need from you this week?',
    ],
  },
  {
    id: 'karma',
    name: 'Karma',
    sanskritName: 'कर्म',
    category: 'core_concepts',
    description: 'Law of cause and effect governing all actions',
    detailedExplanation: 'Karma is the universal law that connects actions with their consequences across time and lives. It operates on three levels: immediate karma (results seen quickly), delayed karma (consequences that manifest later), and carried-over karma (effects that continue into future lives). The law is precise and impartial - positive actions generate positive results, while negative actions create suffering. Understanding karma empowers us to take responsibility for our lives and make choices that create the future we desire.',
    etymology: 'From Sanskrit "kri" meaning "to do" or "to act" - literally means "action" or "deed"',
    keyAspects: [
      'Universal law of cause and effect',
      'Personal responsibility for outcomes',
      'Actions create tendencies and habits',
      'Intention matters as much as action',
      'Opportunity for learning and growth'
    ],
    practicalApplications: [
      {
        situation: 'Relationship conflicts',
        application: 'Take responsibility for your part, respond with kindness even when hurt',
        benefits: ['Better relationships', 'Personal growth', 'Breaking negative cycles'],
        tips: ['Focus on your response, not others\' actions', 'Choose love over being right', 'Learn from every interaction']
      },
      {
        situation: 'Career challenges',
        application: 'Work diligently without being attached to immediate results',
        benefits: ['Reduced stress', 'Better performance', 'Long-term success'],
        tips: ['Focus on process over outcomes', 'Maintain high standards regardless of recognition', 'Help others succeed']
      }
    ],
    relatedConcepts: ['dharma', 'samsara', 'moksha', 'free-will'],
    scriptureReferences: [
      {
        id: 'karma-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 2, Verse 47',
        quote: 'You have the right to perform your actions, but you are not entitled to the fruits of the action',
        context: 'Krishna teaches about acting without attachment to results'
      }
    ],
    modernRelevance: 'Karma provides a framework for personal responsibility and ethical living, helping us understand that we create our own experiences through our choices',
    commonMisunderstandings: [
      'Karma is not fatalism - we have free will to change our actions',
      'It\'s not about punishment but about learning and growth',
      'Good karma doesn\'t mean life becomes easy - it means we handle difficulties with wisdom',
      'Karma operates across lifetimes, so not all consequences are immediate'
    ],
    examples: [
      {
        id: 'karma-example-1',
        title: 'The Generous Friend',
        scenario: 'Someone consistently helps friends without expecting anything back',
        explanation: 'Over time, they build a network of support and experience abundance in relationships',
        lesson: 'Generous actions create generous returns, though not always in expected ways'
      }
    ],
    meditation: {
      technique: 'Karma Purification Meditation',
      duration: '20 minutes',
      instructions: [
        'Reflect on recent actions and their underlying motivations',
        'Identify any actions done from ego, fear, or selfishness',
        'Send loving-kindness to anyone you may have hurt',
        'Commit to more conscious, compassionate actions going forward',
        'Visualize positive energy flowing from your future good deeds'
      ],
      benefits: ['Emotional cleansing', 'Increased mindfulness', 'Better decision-making'],
      audioUrl: '/audio/meditations/karma-purification.mp3'
    },
    audioGuide: {
      narrator: 'Karma Wisdom',
      duration: '22 minutes',
      audioUrl: '/audio/guides/karma-guide.mp3',
      topics: ['Understanding karma', 'Creating positive karma', 'Breaking negative patterns']
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/karma-cover.png'),
      iconImage: '/images/philosophy/karma-icon.jpg'
    },
    difficulty: 'beginner',
    kicker: 'You already use this word. You have probably been using it backwards.',
    learnItems: [
      'Karma means action, not fate',
      'Effort is yours; the outcome is not',
      'There is no opting out',
      'Skill in action is evenness',
      "Action as offering doesn't bind",
      'No sincere effort is ever wasted',
    ],
    handoff:
      'Your actions steer the wheel of life. But what is that wheel, and where does it carry you when a life ends? The tradition has a name for it: samsara.',
    // Verse translations follow Swami Sivananda's public-domain rendering
    // (bundled in gitaVerses.json), lightly trimmed for reading flow.
    sections: [
      {
        id: 'karma-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'You already use the word karma. You hear it when something bad circles back to someone who had it coming. That is not what it meant first, and the older meaning is far more useful.\n\nOver the next few pages, karma turns from a cosmic scoreboard into a plain account of how your own actions shape the life you are living.',
      },
      {
        id: 'karma-opening',
        title: 'The Weight of Every Action',
        subtitle: 'An Arrow Leaving the Bow',
        takeaway:
          'Karma starts with a plain fact. You are always acting, and every action leaves something behind.',
        storyText: 'The most famous teaching on action in Hinduism comes from a story. On the eve of a great war, a warrior-prince named Arjuna froze. His own cousins and teachers were standing in the enemy army, and he could not bear to fight them. His chariot-driver that day was Krishna — who, unknown to most on the field, was God himself in human form. Faced with his paralysed friend, Krishna did not begin with grand talk of the soul or of heaven. He began with action.\n\nThe one thing Arjuna could not escape, Krishna pointed out, was that a choice still had to be made, and even refusing to choose would itself be a choice.\n\nThis is where the teaching of **karma** begins — not as a cosmic scoreboard of rewards and punishments, but as the simple, unavoidable truth that **you are always acting**, and every action leaves something behind. An arrow, once released, cannot be called back. But the archer chooses where to aim.'
      },
      {
        id: 'karma-meaning',
        title: 'What Karma Really Means',
        subtitle: 'A Seed Becoming a Tree',
        takeaway: 'Karma just means action. Not fate, not luck, not punishment.',
        storyText: '**Karma** comes from the Sanskrit root **kri** — to do, to act. It simply means action. Yet centuries of use have buried it under misreadings: fate, luck, punishment, "what goes around comes around."\n\nThe oldest teaching is more precise and more empowering. The Brihadaranyaka Upanishad says of a person: "As is his desire, so is his will; and as is his will, so is his deed; and whatever deed he does, that he will reap."\n\n**Desire shapes intention, intention shapes action, and action shapes who you become.** Karma is not something that happens TO you. It is the trail you are laying down, one choice at a time, in the direction your attention is already pointing.',
        teachingText: 'Notice the chain begins with **desire**, not deed. This is why Hindu thought insists that intention matters as much as action: two people can perform the identical act — one from love, one from calculation — and plant entirely different seeds.\n\nIf you want to know your future, the Upanishad suggests, do not consult the stars. Watch what you are doing, and wanting, today.',
        citation: 'Brihadaranyaka Upanishad 4.4.5 (tr. Max Müller).'
      },
      {
        id: 'karma-term-karma',
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
          'In the four paths, one is karma yoga: action itself, turned into a way to the divine.',
        checks: [
          {
            id: 'chk:concept:karma:not-fate',
            kind: 'mcq',
            prompt:
              'A friend shrugs: "It\'s my karma. Nothing I can do." What has he gotten backwards?',
            options: [
              {
                text: 'Karma means his own action, so it is the one thing he can always change',
                correct: true,
              },
              { text: 'Nothing. That is roughly what karma means.' },
              { text: 'Karma is fixed at birth and cannot be altered' },
            ],
            why: 'Karma is the verb of your life, not a sentence passed on it. Read as fate, the tradition\'s biggest idea about your own power becomes an excuse. Karma is what you do, and what you do is always yours to change.',
          },
        ],
      },
      {
        id: 'karma-right-to-action',
        title: 'Your Right Is to the Action Alone',
        subtitle: 'Hands Working, Palms Open',
        takeaway:
          'Your right is to the work, never to its fruits. Effort is yours; the outcome is not.',
        keyVerse: {
          sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
          transliteration: 'karmaṇy evādhikāras te mā phaleṣhu kadāchana, mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
          meaning: 'Your right is to work only, but never to its results; let not the results of action be your motive, nor let your attachment be to inaction.',
          source: 'Bhagavad Gita 2.47 (tr. Swami Sivananda)'
        },
        storyText: 'This is the most quoted verse in the Gita, and the most misunderstood. Krishna is not telling Arjuna to stop caring about results — a general who doesn\'t care about victory should leave the field.\n\nHe is making a surgical distinction: **effort is yours; outcome is not.** A thousand factors you cannot see — other people\'s choices, timing, chance, history — stand between your action and its fruit.\n\nWhen you stake your peace on the part you cannot control, anxiety is the only possible harvest.',
        teachingText: 'Think of something you\'re working toward right now — a promotion, a child\'s happiness, a body healed. The verse asks: can you pour yourself into the work itself, wholly, and hold the outcome with open palms?\n\nThis is not lowering the bar. People who work this way usually work better — steadier under pressure, more honest about feedback, less crushed by setbacks — because their fuel is the work, not the scoreboard.',
        checks: [
          {
            id: 'chk:concept:karma:fruits',
            kind: 'mcq',
            prompt:
              '"Your right is to the action, never to its fruits" (Gita 2.47). What is Krishna actually asking of you?',
            options: [
              {
                text: 'Pour yourself fully into the work, and hold the outcome with open palms',
                correct: true,
              },
              { text: 'Stop caring whether you succeed or fail' },
              { text: 'Only act when the result is guaranteed' },
            ],
            why: 'The verse is a surgical distinction, not a shrug. Effort is yours; the outcome depends on a thousand things you do not control. Caring about the work is the point. Staking your peace on the result you cannot control is what breeds anxiety.',
          },
        ],
      },
      {
        id: 'karma-no-inaction',
        title: 'The Myth of Doing Nothing',
        subtitle: 'A River That Cannot Stop Flowing',
        takeaway: 'There is no opting out. Even doing nothing is something you did.',
        keyVerse: {
          sanskrit: 'न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्। कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥',
          transliteration: 'na hi kaśhchit kṣhaṇam api jātu tiṣhṭhaty akarma-kṛit, kāryate hy avaśhaḥ karma sarvaḥ prakṛiti-jair guṇaiḥ',
          meaning: 'Verily, no one can remain even for a moment without performing action; everyone is made to act by the qualities born of Nature.',
          source: 'Bhagavad Gita 3.5 (tr. Swami Sivananda)'
        },
        storyText: 'Arjuna\'s first instinct was to walk away — to renounce the battle and become a beggar rather than act in such a terrible situation. Krishna\'s reply dismantles the fantasy: **there is no such thing as opting out.**\n\nYour heart beats, your mind judges, your silence speaks, your absence is felt.',
        bullets: [
          'The person who "stays neutral" while a friend is slandered **has acted**.',
          'The citizen who doesn\'t vote **has voted**.',
          'Even the renunciant sitting motionless in a cave is acting — breathing, thinking, choosing to remain.'
        ],
        teachingText: 'This teaching is bracing because it removes the comfortable illusion of the sidelines. Where in your life are you telling yourself "I\'m not doing anything" — about a strained relationship, an injustice at work, a habit quietly growing?\n\nThe Gita\'s point is not to induce guilt but clarity: since you are acting either way, **act consciously**. A deliberate choice, even a hard one, plants better seeds than a drift.'
      },
      {
        id: 'karma-way-1',
        kind: 'waypoint',
        title: '3 of 6 banked',
        learnIndex: 3,
        storyText:
          'That is the ground floor: you are always acting, and your action is always yours. The rest of this is about how to act, so that action frees you instead of trapping you.',
      },
      {
        id: 'karma-skill',
        title: 'Yoga Is Skill in Action',
        subtitle: 'A Potter\'s Steady Hands at the Wheel',
        takeaway:
          'Yoga is skill in action, and the skill is evenness: fully engaged, and strangely unhurried.',
        keyVerse: {
          sanskrit: 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते। तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥',
          transliteration: 'buddhi-yukto jahātīha ubhe sukṛita-duṣhkṛite, tasmād yogāya yujyasva yogaḥ karmasu kauśhalam',
          meaning: 'Endowed with wisdom and evenness of mind, one casts off in this life both good and evil deeds; therefore devote yourself to Yoga — Yoga is skill in action.',
          source: 'Bhagavad Gita 2.50 (tr. Swami Sivananda)'
        },
        storyText: 'Krishna gives karma yoga its famous definition: **yogah karmasu kaushalam** — yoga is skill in action. The skill is not technical mastery; it is **evenness**.\n\nA verse earlier he describes it: "Perform action, abandoning attachment, balanced in success and failure; evenness of mind is called Yoga."\n\nWatch a surgeon, a musician, a parent soothing a feverish child at 3 a.m. — the ones who are truly skillful have a stillness at the center of their effort. They are fully engaged and strangely unhurried, because none of their energy is leaking into "what if this fails?"',
        teachingText: 'Evenness is trainable, and daily life is the gym.\n\nThe next time something goes well, notice the surge of "I am wonderful" — and let it pass through without grabbing it. The next time something flops, notice "I am terrible" — and let that pass too.\n\nWhat remains when both waves settle is the steady worker the Gita calls the yogi. From that steadiness, your next action is cleaner than the last.',
        citationLink: 'gita:2',
        citation: 'Bhagavad Gita 2.48 (tr. Swami Sivananda).'
      },
      {
        id: 'karma-offering',
        title: 'Action as Offering',
        subtitle: 'A Lotus Leaf Untouched by Water',
        takeaway:
          'Done as an offering, the same action stops binding you. A lotus leaf lives in the pond and is never soaked.',
        openingVerse: {
          sanskrit: 'यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः। तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर॥',
          transliteration: 'yajñārthāt karmaṇo \'nyatra loko \'yaṁ karma-bandhanaḥ, tad-arthaṁ karma kaunteya mukta-saṅgaḥ samāchara',
          meaning: 'The world is bound by actions other than those performed as sacrifice; therefore perform action for that sake alone, free from attachment.',
          source: 'Bhagavad Gita 3.9 (tr. Swami Sivananda)'
        },
        storyText: 'Here Krishna reveals karma\'s escape hatch. Action binds when it is performed for the small self — my gain, my credit, my comfort. The same action performed as **yajna**, as offering, does not bind at all.\n\nThe cook who feeds her family as an act of love, the engineer who builds as service to people he will never meet, the volunteer who asks for nothing — they act as much as anyone, often more.\n\nBut the Gita says their action leaves no residue, "as a lotus leaf is not tainted by water." The leaf lives in the pond; it is simply not soaked by it.',
        teachingText: 'Try this quiet experiment: choose one routine task tomorrow — a meeting, the dishes, a commute — and perform it deliberately as an **offering**: to God, to the people it serves, or simply to something larger than your own advantage.\n\nNothing external changes. Everything internal does. The task stops being a transaction and becomes, briefly, worship.',
        citationLink: 'gita:5',
        citation: 'Lotus-leaf image: Bhagavad Gita 5.10 (tr. Swami Sivananda).'
      },
      {
        id: 'karma-term-yajna',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'यज्ञ',
          transliteration: 'yajña',
          meaning: 'offering — action done for something larger than yourself',
        },
        storyText:
          'A yajna was once a fire ritual, an offering poured into the flames. The Gita widens the word. Any action becomes a yajna when you do it for something larger than your own gain.\n\nThe cook feeding her family, the engineer building for people he will never meet, the volunteer who asks for nothing: all of them are offering.\n\n**Yajna is not where you act. It is why you act.**',
        reappears:
          'Offering is the hinge of karma yoga, the path of action you will meet among the four ways.',
        checks: [
          {
            id: 'chk:concept:karma:offering',
            kind: 'mcq',
            prompt:
              'Why does the Gita say action done as an offering does not bind you?',
            options: [
              {
                text: 'It is done for something larger than the small self, so it leaves no residue',
                correct: true,
              },
              { text: 'Because offerings only happen in temples, not in daily work' },
              { text: 'Because the person stops acting altogether' },
            ],
            why: 'Action binds when it feeds the small self, my gain and my credit. The same act performed as offering leaves no residue, as a lotus leaf is not tainted by water. The leaf lives in the pond; it simply is not soaked by it.',
          },
        ],
      },
      {
        id: 'karma-way-2',
        kind: 'waypoint',
        title: '5 of 6 banked',
        learnIndex: 5,
        storyText:
          'Karma binds you, or it frees you, depending on why you act. One idea is left, the quiet promise that holds all of this up.',
      },
      {
        id: 'karma-mystery',
        title: 'The Deep Mystery of Action',
        subtitle: 'Paths Crossing in a Dense Forest',
        takeaway:
          'The way of action is deep. No rulebook fits it, so judge an act by three lamps.',
        openingVerse: {
          sanskrit: 'कर्मणो ह्यपि बोद्धव्यं बोद्धव्यं च विकर्मणः। अकर्मणश्च बोद्धव्यं गहना कर्मणो गतिः॥',
          transliteration: 'karmaṇo hy api boddhavyaṁ boddhavyaṁ cha vikarmaṇaḥ, akarmaṇaśh cha boddhavyaṁ gahanā karmaṇo gatiḥ',
          meaning: 'The true nature of action should be known, of forbidden action, and of inaction — the way of action is hard to understand.',
          source: 'Bhagavad Gita 4.17 (tr. Swami Sivananda)'
        },
        storyText: '**Gahana karmano gatih** — deep, dense, hard to fathom is the course of action. Even Krishna, in the middle of explaining karma, pauses to admit its mystery.\n\nA harsh word spoken in love can heal; a kind word spoken in cowardice can wound. Help given carelessly can weaken the helped. The great epics are full of this ambiguity. Even Yudhishthira, a king famous for never telling a lie, once let his honesty be used to deceive an enemy in battle. And Karna, a warrior famous for never refusing a request, gave away the armour that was keeping him alive, because someone simply asked for it.\n\nThis is why karma cannot be reduced to a rulebook. Before a significant act, the tradition suggests **three lamps** to examine it by:',
        bullets: [
          'Is my **intention** clean?',
          'Does it serve **more than myself**?',
          'Would I act this way if **no one ever knew**?'
        ],
        teachingText: 'The teaching asks for something harder than compliance: **discernment**. None of the lamps guarantees a perfect outcome; the way of action stays deep.\n\nBut a person who keeps asking becomes, over years, someone whose actions can be trusted — including by themselves.',
        checks: [
          {
            id: 'chk:concept:karma:three-lamps',
            kind: 'mcq',
            prompt:
              'The way of action is deep, and no single rule fits every case. What does the tradition offer instead of a rulebook?',
            options: [
              {
                text: 'Three lamps to examine an act by: clean intention, service beyond yourself, and whether you would do it unseen',
                correct: true,
              },
              { text: 'A fixed list of forbidden actions to memorise' },
              { text: 'A priest who decides each case for you' },
            ],
            why: 'Karma asks for discernment, not compliance. The three lamps ask three questions: is my intention clean, does it serve more than myself, and would I act this way if no one ever knew. They do not guarantee outcomes, but a person who keeps asking becomes, over years, someone whose actions can be trusted, including by themselves.',
          },
        ],
      },
      {
        id: 'karma-no-effort-lost',
        title: 'No Sincere Effort Is Ever Lost',
        subtitle: 'Rain Disappearing into Soil, Green Shoots Later',
        takeaway:
          'On this path, nothing sincere is wasted. Even a little protects from great fear.',
        keyVerse: {
          sanskrit: 'नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते। स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्॥',
          transliteration: 'nehābhikrama-nāśho \'sti pratyavāyo na vidyate, svalpam apy asya dharmasya trāyate mahato bhayāt',
          meaning: 'In this path there is no loss of effort, nor any harm; even a little of this practice protects one from great fear.',
          source: 'Bhagavad Gita 2.40 (tr. Swami Sivananda)'
        },
        storyText: 'Perhaps karma\'s gentlest promise: on this path, **nothing sincere is wasted**.\n\nThe world\'s accounting is unreliable — honest work goes unnoticed, kindness is forgotten, discipline shows no result for years. The Gita\'s accounting is different. Every genuine effort changes the one who makes it, and that change is never repossessed.\n\nThe patience you practiced in a job that ended badly is still in your hands. The steadiness you built caring for someone who didn\'t recover is still in your spine.',
        teachingText: 'Recall an effort of yours that "failed" — the venture that folded, the relationship that ended anyway, the practice you kept for a year and then dropped. Look honestly at what it left behind in you: a capacity, a scar that became sensitivity, a proof that you can endure.\n\nKarma\'s ledger records in a currency the world doesn\'t display. **Even a little**, Krishna says, **protects from great fear**.'
      },
      {
        id: 'karma-worship',
        title: 'Your Work as Worship',
        subtitle: 'Ordinary Tools on an Altar',
        takeaway:
          'Your own ordinary work, done as offering, is worship. The wheel turns either way, and the teaching hands you the wheel.',
        keyVerse: {
          sanskrit: 'यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम्। स्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः॥',
          transliteration: 'yataḥ pravṛittir bhūtānāṁ yena sarvam idaṁ tatam, sva-karmaṇā tam abhyarchya siddhiṁ vindati mānavaḥ',
          meaning: 'He from whom all beings have evolved and by whom all this is pervaded — worshiping Him with one\'s own duty, a person attains perfection.',
          source: 'Bhagavad Gita 18.46 (tr. Swami Sivananda)'
        },
        storyText: 'In the Gita\'s final chapter, the teaching of karma completes its arc.\n\nIt began with a frightened warrior being told he could not escape action. It ends with the revelation that action itself — your own ordinary work, done as offering — is a form of **worship** equal to any ritual.\n\nNot someone else\'s more impressive work: yours. **Sva-karmana**, "by one\'s own action," Krishna says, a person worships the source of all beings and finds perfection.',
        teachingText: 'And also this, from the same teaching: "One should raise oneself by one\'s own self; the self alone is one\'s friend, and the self alone is one\'s enemy."\n\nKarma places your life firmly in your own hands — not because you control outcomes, but because you always control the **next action**. And the next action is where your character, your habits, and, by the Upanishad\'s chain, your destiny are being written.\n\nThe wheel is turning either way. The teaching simply hands you the wheel.',
        citationLink: 'gita:6',
        citation: 'Bhagavad Gita 6.5 (tr. Swami Sivananda).'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:2',
        locator: 'Chapters 2–6 and 18 (verses 2.40, 2.47, 2.48, 2.50, 3.5, 3.9, 4.17, 5.10, 6.5, 18.46)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Brihadaranyaka Upanishad',
        locator: '4.4.5 (desire → will → deed → destiny)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
        url: 'https://www.brhat.in/openlibrary/special/brihadaranyaka-upanishad/4-4-5',
      },
    ],
    reflectionQuestions: [
      'Where are you working hard but gripping the result so tightly it hurts?',
      "Where in your life are you telling yourself 'I am not doing anything', when the silence is itself a choice?",
      'Pick one ordinary task tomorrow. Could you do it as an offering, for the people it serves rather than for the credit?',
    ]
  },
  {
    id: 'ahimsa',
    name: 'Ahimsa',
    sanskritName: 'अहिंसा',
    category: 'ethical_values',
    description: 'Practice of non-violence in thought, word, and action',
    detailedExplanation: 'Ahimsa is more than just avoiding physical violence - it encompasses non-harm in thoughts, words, and actions toward all living beings. This includes avoiding mental violence through hatred or judgment, verbal violence through harsh words or lies, and physical violence through harmful actions. True ahimsa extends to environmental consciousness, ethical consumption, and even being non-violent toward oneself through self-compassion and avoiding self-destructive behaviors.',
    etymology: 'From Sanskrit "a" (not) + "himsa" (violence/harm) - literally means "non-violence" or "non-harm"',
    keyAspects: [
      'Non-violence in thought, word, and deed',
      'Compassion toward all living beings',
      'Avoiding harm to environment and nature',
      'Self-compassion and non-violence toward oneself',
      'Seeking peaceful solutions to conflicts'
    ],
    practicalApplications: [
      {
        situation: 'Dealing with difficult people',
        application: 'Respond with patience and understanding rather than anger or judgment',
        benefits: ['Reduced stress', 'Better relationships', 'Inner peace'],
        tips: ['Take deep breaths before responding', 'Try to understand their perspective', 'Set boundaries kindly but firmly']
      },
      {
        situation: 'Consumer choices',
        application: 'Choose products that don\'t harm animals, environment, or exploit workers',
        benefits: ['Clear conscience', 'Supporting ethical businesses', 'Environmental protection'],
        tips: ['Research company practices', 'Buy local when possible', 'Reduce unnecessary consumption']
      },
      {
        situation: 'Self-criticism',
        application: 'Replace harsh self-judgment with compassionate self-reflection',
        benefits: ['Better mental health', 'Increased motivation', 'Self-acceptance'],
        tips: ['Speak to yourself as you would a good friend', 'Focus on learning rather than punishment', 'Practice self-forgiveness']
      }
    ],
    relatedConcepts: ['compassion', 'dharma', 'karma', 'love'],
    scriptureReferences: [
      {
        id: 'ahimsa-yoga-1',
        text: 'Yoga Sutras',
        reference: 'Sutra 2.35',
        quote: 'When ahimsa is established, hostility ceases in the presence of the practitioner',
        context: 'Patanjali describes the power of non-violence to transform relationships'
      }
    ],
    modernRelevance: 'In our interconnected world, ahimsa guides us toward sustainable living, peaceful conflict resolution, and mental health practices',
    commonMisunderstandings: [
      'Ahimsa doesn\'t mean being passive or allowing injustice',
      'It\'s not about perfection but about conscious effort to minimize harm',
      'Self-defense can be compatible with ahimsa when protecting innocent life',
      'Sometimes firm action is needed to prevent greater harm'
    ],
    examples: [
      {
        id: 'ahimsa-example-1',
        title: 'The Peaceful Activist',
        scenario: 'An environmental activist faces corporate interests destroying local habitat',
        explanation: 'They organize peaceful protests, education campaigns, and legal action rather than resorting to sabotage',
        lesson: 'Ahimsa can be a powerful force for positive change when combined with determination'
      }
    ],
    meditation: {
      technique: 'Loving-Kindness Meditation',
      duration: '15 minutes',
      instructions: [
        'Begin by sending love and peace to yourself',
        'Extend loving wishes to family and friends',
        'Send compassion to neutral people in your life',
        'Include difficult people or "enemies" in your circle of compassion',
        'Embrace all living beings with loving-kindness',
        'Rest in the feeling of universal love and non-harm'
      ],
      benefits: ['Reduced anger and hostility', 'Increased empathy', 'Inner peace', 'Better relationships'],
      audioUrl: '/audio/meditations/loving-kindness.mp3'
    },
    audioGuide: {
      narrator: 'Ahimsa Guide',
      duration: '18 minutes',
      audioUrl: '/audio/guides/ahimsa-guide.mp3',
      topics: ['Understanding non-violence', 'Practical ahimsa', 'Dealing with anger', 'Compassionate living']
    },
    podcastEpisodes: [],
    images: {
      // TODO cover shopping list: ahimsa-cover.png
      heroImage: require('../../assets/images/covers/ahimsa-cover.png'),
      iconImage: '/images/philosophy/ahimsa-icon.jpg'
    },
    difficulty: 'beginner',
    kicker: "Not weakness. The Mahabharata's highest praise, spoken on a battlefield: ahimsa is the highest dharma.",
    learnItems: [
      'Ahimsa is the absence of the wish to harm, not just non-violence',
      'Harm has three gates: hand, tongue, and thought',
      'Ahimsa purges hatred from whatever conflict dharma requires',
      'Perfected, harmlessness becomes an atmosphere others feel',
      'The subtlest harm is aimed inward, at yourself',
    ],
    handoff:
      'You have met the ideas the whole tradition is built on — dharma, karma, the wheel and the way off, the one Self, the veil, the strands, and harmlessness. Now the real test: a friend turns and asks, in plain words, so what actually is Hinduism? The next step is your own answer.',
    sections: [
      {
        id: 'ahimsa-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          '"Non-violence" undersells the word, and it is often mistaken for weakness. The Mahabharata — a text soaked in war — answers that mistake with its highest praise.\n\nOver the next few pages, ahimsa turns from a lofty ideal into a daily practice with three gates, one surprising promise, and a forgotten direction: inward.',
      },
      {
        id: 'ahimsa-opening',
        title: 'The Strength That Refuses to Wound',
        subtitle: 'An Open Hand Where a Fist Could Be',
        takeaway:
          'Ahimsa is the absence of the wish to harm, and the tradition calls it the highest dharma — praised, of all places, on a battlefield.',
        storyText: '**Ahimsa** is usually translated "non-violence," and the translation undersells it. The word is **a-himsa** — the absence of the wish to harm — and the tradition means it in full: not wounding with the hand, not wounding with the tongue, not wounding, finally, even with the thought.\n\nIt is often mistaken for weakness. The Mahabharata — a text soaked in the moral complexities of war — answers that mistake with its most sweeping superlative: **"Ahimsa is the highest dharma**, the highest self-control, the highest gift, the highest austerity, the highest sacrifice."\n\nThe epic of the great war reserves its supreme praise for the one who harms nothing.',
        citation: 'Mahabharata, Anushasana Parva 13.117 (tr. K.M. Ganguli).'
      },
      {
        id: 'ahimsa-term-ahimsa',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'अहिंसा',
          transliteration: 'ahiṃsā',
          meaning: 'a-himsa — the absence of the wish to harm',
        },
        storyText:
          'The word is built on a negation. *Himsa* is the urge to injure, and the *a-* in front of it cancels the urge.\n\nSo ahimsa is not merely holding your fist. It is not wounding with the hand, nor the tongue, nor, finally, even the thought.',
        reappears:
          "Ahimsa is the first of Patanjali's five yamas, the restraints all further practice stands on.",
      },
      {
        id: 'ahimsa-three-gates',
        title: 'Three Gates of Harm',
        subtitle: 'Thought, Word, and Hand',
        takeaway:
          "Harm passes through three gates: hand, tongue, and thought. The hand is easiest; the mind's quiet, private war is hardest of all.",
        storyText: 'The tradition analyzes violence the way a physician traces a disease: to its origin. By the time a hand strikes, the harm is old — it lived first as a thought, then as words.\n\nSo ahimsa is practiced at **three gates**:',
        bullets: [
          '**The hand\'s gate** is the easiest — most of us pass it daily.',
          '**The tongue\'s gate** is harder — the tradition counts sarcasm, gossip, and the well-aimed "honest" remark as himsa in fluent disguise.',
          '**The mind\'s gate** is hardest of all — the rehearsed grievance, the imagined argument won, the quiet wish to see someone fail.'
        ],
        teachingText: 'The Gita lists ahimsa among the marks of true knowledge and among the divine endowments — in both lists it keeps company with truthfulness and absence of anger, its gatekeeper virtues.\n\nAudit your three gates for one day, gently. Most people find the hand clean, the tongue occasionally armed, and the mind running a low-grade war no one else can see. Begin where the tradition begins: not by suppressing the violent thought, but by **noticing it without enlisting**.',
        citationLink: 'gita:13',
        citation: 'Bhagavad Gita 13.7–12, 16.2 (tr. Swami Sivananda).',
        checks: [
          {
            id: 'chk:concept:ahimsa:gates',
            kind: 'mcq',
            prompt: 'Which gate of harm does the tradition call the hardest?',
            options: [
              {
                text: "The mind's — the rehearsed grievance, the imagined argument won, the quiet wish to see someone fail",
                correct: true,
              },
              { text: "The hand's — physical violence is the deepest form of harm" },
              { text: "The tongue's — words always wound more than thoughts" },
            ],
            why: 'By the time a hand strikes, the harm is old; it lived first as a thought, then as words. Begin by noticing the violent thought without enlisting in it.',
          },
        ],
      },
      {
        id: 'ahimsa-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'Harm has three gates, and the hardest is the quiet one inside. Next, a paradox: this teaching is given on a battlefield, to a warrior told to fight.',
      },
      {
        id: 'ahimsa-gita-virtue',
        title: 'Harmlessness in the Gita\'s Lists',
        subtitle: 'A Virtue Named Among the Divine Endowments',
        takeaway:
          'Ahimsa is not the refusal of all conflict; it is purging hatred from whatever conflict dharma requires. Arjuna must fight, without the wish to harm.',
        keyVerse: {
          sanskrit: 'अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम्। दया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम्॥',
          transliteration: 'ahinsā satyam akrodhas tyāgaḥ śhāntir apaiśhunam, dayā bhūteṣhv aloluptvaṁ mārdavaṁ hrīr achāpalam',
          meaning: 'Harmlessness, truth, absence of anger, renunciation, peacefulness, absence of crookedness, compassion for beings, non-covetousness, gentleness, modesty, absence of fickleness.',
          source: 'Bhagavad Gita 16.2 (tr. Swami Sivananda)'
        },
        storyText: 'Notice the company ahimsa keeps in the Gita\'s sixteenth chapter: truth, absence of anger, compassion, gentleness. The tradition understood these as **one organism** — you cannot practice harmlessness while cultivating anger, and you cannot be truly truthful while wishing harm, because harm distorts what you are willing to see.\n\nAnd there is a paradox the Gita holds without flinching: this teaching is given on a battlefield, to a warrior being told to fight.\n\nAhimsa in the Gita is not the refusal of all conflict; it is **the purging of hatred from whatever conflict dharma requires**. Arjuna must fight — without the wish to harm.',
        teachingText: 'This is the adult version of the teaching: some roles — parent, judge, soldier, surgeon, manager — require acts that cause pain.\n\nAhimsa asks not that you abandon the role but that you empty it of cruelty: the discipline without the contempt, the boundary without the punishment, the truth without the twist of the knife.',
        checks: [
          {
            id: 'chk:concept:ahimsa:battlefield',
            kind: 'mcq',
            prompt: 'The Gita teaches ahimsa on a battlefield, to a warrior told to fight. Is that a contradiction?',
            options: [
              {
                text: 'No — ahimsa empties a necessary role of cruelty: the discipline without contempt, the boundary without punishment, the truth without the twist of the knife',
                correct: true,
              },
              { text: 'Yes — ahimsa means Arjuna should have refused to fight' },
              { text: 'No — warriors are simply exempt from ahimsa' },
            ],
            why: 'Some roles — parent, judge, surgeon, soldier — cause pain. Ahimsa asks not that you abandon the role but that you drain the hatred from it.',
          },
        ],
      },
      {
        id: 'ahimsa-yoga-sutra',
        takeaway:
          'Perfected, harmlessness becomes an atmosphere: in its presence, hostility is abandoned. And the sutra says it is trainable.',
        title: 'The Sutra\'s Astonishing Promise',
        subtitle: 'A Predator Grown Calm in a Sage\'s Presence',
        storyText: 'The **Yoga Sutras**, the classic manual of yoga compiled by an ancient sage named **Patanjali**, make ahimsa the first of the five **yamas** — the restraints on which all further practice stands — and attach to it the tradition\'s most beautiful promise: **"In the presence of one established in ahimsa, hostility is abandoned."**\n\nNot managed. Abandoned — by others.\n\nThe claim is that harmlessness, perfected, becomes an atmosphere: animals calm, arguments deflate, aggressive people find their aggression has nowhere to land. India\'s lore is full of sages whose presence tamed predators; modern life offers the same evidence at lower voltage — everyone knows one person around whom conflict simply doesn\'t escalate.',
        teachingText: 'You have felt this atmosphere around certain people, and its opposite around others. The sutra says it is **trainable**.\n\nThe training is unglamorous: a thousand small refusals to add heat — until your presence itself becomes the de-escalation. Ask yourself which rooms get calmer when you enter, and which get tenser, and treat the answer as a progress report.',
        citation: 'Yoga Sutras of Patanjali 2.35.'
      },
      {
        id: 'ahimsa-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Harmlessness can become an atmosphere others feel. One direction is left, and it is the one most people forget: inward.',
      },
      {
        id: 'ahimsa-self',
        title: 'The Forgotten Direction: Inward',
        subtitle: 'A Mirror Treated Gently',
        takeaway:
          'The subtlest harm is aimed at yourself, and it never stays contained. Befriending yourself is not indulgence; it is where ahimsa begins.',
        storyText: 'The subtlest himsa is the one aimed at yourself.\n\nThe inner voice that calls you an idiot for a small mistake, the punishing schedule, the refusal of rest, the standards you would never impose on a friend — the tradition counts all of it as violence, and notes that it never stays contained.\n\nThose who wound themselves leak the wounding outward: the harsh self-critic becomes the harsh parent; the person at war with their own body wars quietly with everyone else\'s ease. The Gita\'s counsel that "the self alone is one\'s friend, the self alone is one\'s enemy" makes the choice explicit — **befriending yourself is not indulgence; it is where ahimsa begins**.',
        teachingText: 'Listen to your inner commentary for a day as if it were spoken aloud to someone you love. Where it fails that test, it is himsa — and practicing gentler inner speech is not self-esteem homework but the **root practice** of non-violence.\n\nA person cannot give the world a peace they refuse themselves.',
        citationLink: 'gita:6',
        citation: 'Bhagavad Gita 6.5 (tr. Swami Sivananda).',
        checks: [
          {
            id: 'chk:concept:ahimsa:inward',
            kind: 'mcq',
            prompt: 'Where does the tradition say ahimsa begins?',
            options: [
              {
                text: 'Inward — the harsh inner critic is himsa too, and it leaks outward; a person cannot give the world a peace they refuse themselves',
                correct: true,
              },
              { text: 'Outward — with strict rules about how to treat others' },
              { text: 'With a vow never to feel anger again' },
            ],
            why: 'Those who wound themselves leak the wounding: the harsh self-critic becomes the harsh parent. Gentler inner speech is the root practice, not self-esteem homework.',
          },
        ],
      },
      {
        id: 'ahimsa-daily',
        title: 'A Day of Practiced Harmlessness',
        subtitle: 'Small Choices, Repeated, Becoming a Nature',
        takeaway:
          'Ahimsa is a direction, not a destination: the pause before the sharp reply, repeated, until it becomes a nature that changes every room it enters.',
        storyText: 'Because ahimsa is a direction rather than a destination, the tradition renders it as daily choices:',
        bullets: [
          'The pause before the sharp reply.',
          'The gossip declined.',
          'The benefit of the doubt extended one more time.',
          'Consumption examined — food, purchases, entertainment — for the harm hidden in its supply chain.',
          'The insect escorted out rather than crushed — less for the insect\'s sake than for what the escorting practices in you.'
        ],
        teachingText: 'Gandhi, who took this ancient vow into politics, insisted ahimsa was **"the weapon of the strong"**: it takes no strength to strike back, and all of it not to.\n\nChoose one gate and one week: a week of unarmed speech, or a week of unhostile thought toward one difficult person, or a week of gentleness toward yourself. Small, specific, finishable.\n\nThe tradition\'s claim is that harmlessness practiced narrow becomes, over years, a nature — and that nature changes every room it enters.'
      }
    ],
    sources: [
      {
        text: 'Mahabharata',
        locator: 'Anushasana Parva, 13.117.37–38 (ahimsā paramo dharmaḥ — the superlatives of ahimsa)',
        translation: 'verified via wisdomlib.org Sanskrit text',
        url: 'https://www.wisdomlib.org/hinduism/book/mahabharata-sanskrit/d/doc1034970.html',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:13',
        locator: '13.7–12 (marks of knowledge), 16.2 (divine endowments), 6.5 (the self as friend)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Yoga Sutras of Patanjali',
        locator: '2.30 (ahimsa first among the yamas), 2.35 (hostility abandoned in the presence of the harmless)',
        translation: 'standard public renderings',
      },
    ],
    reflectionQuestions: [
      'Harm can travel through hand, tongue, or thought. Which one slips for you most often?',
      'Listen to your inner commentary for a day as if it were spoken aloud to someone you love. Where would it fail that test?',
      'Which rooms get calmer when you enter, and which get tenser? Treat the answer as a progress report.',
    ]
  },
  {
    id: 'samsara',
    name: 'Samsara',
    sanskritName: 'संसार',
    category: 'core_concepts',
    description: 'Cycle of birth, death, and rebirth driven by karma',
    detailedExplanation: 'Samsara is the continuous cycle of birth, life, death, and rebirth that all souls experience until they achieve liberation. This cycle is driven by karma - our actions and their consequences that create the conditions for our next birth. While often seen as suffering, samsara is also an opportunity for learning, growth, and spiritual evolution. Each lifetime provides chances to resolve karma, develop wisdom, and progress toward moksha (liberation).',
    etymology: 'From Sanskrit "sam" (together) + "sara" (to flow) - the flowing together of births and deaths in continuous cycle',
    keyAspects: [
      'Continuous cycle of birth, death, and rebirth',
      'Driven by karma and unfulfilled desires',
      'Opportunity for spiritual learning and growth',
      'Transcended through wisdom and liberation',
      'Encompasses all forms of existence'
    ],
    practicalApplications: [
      {
        situation: 'Dealing with life challenges',
        application: 'See difficulties as opportunities for growth and karma resolution',
        benefits: ['Acceptance of hardships', 'Focus on learning', 'Reduced victim mentality'],
        tips: ['Ask what each situation teaches you', 'Focus on your response rather than circumstances', 'Trust in the process of growth']
      },
      {
        situation: 'Loss and grief',
        application: 'Remember that relationships continue beyond physical death in the eternal dance of souls',
        benefits: ['Comfort in times of loss', 'Deeper appreciation for relationships', 'Reduced fear of death'],
        tips: ['Honor memories while releasing attachment', 'Send loving thoughts to departed souls', 'Focus on how they helped your growth']
      }
    ],
    relatedConcepts: ['karma', 'moksha', 'atman', 'rebirth', 'dharma'],
    scriptureReferences: [
      {
        id: 'samsara-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 2, Verse 22',
        quote: 'As a person sheds worn-out garments and wears new ones, so does the soul discard worn-out bodies and enter others that are new',
        context: 'Krishna explains the eternal nature of the soul through the cycle of embodiment'
      }
    ],
    modernRelevance: 'Understanding samsara helps us see life\'s ups and downs in perspective, encouraging personal responsibility while reducing attachment to temporary circumstances',
    commonMisunderstandings: [
      'Samsara is not punishment but a natural process of spiritual evolution',
      'It\'s not fatalistic - our actions can influence our experience',
      'The goal isn\'t to escape life but to live consciously within it',
      'Each birth is an opportunity, not a burden'
    ],
    examples: [
      {
        id: 'samsara-example-1',
        title: 'The Growing Soul',
        scenario: 'A person experiences both success and failure across different areas of life',
        explanation: 'Each experience provides lessons that shape character and wisdom, contributing to spiritual development',
        lesson: 'All experiences in samsara serve the soul\'s evolution when approached with awareness'
      }
    ],
    meditation: {
      technique: 'Life Reflection Meditation',
      duration: '20 minutes',
      instructions: [
        'Reflect on major life events and transitions you\'ve experienced',
        'Identify the lessons and growth each situation brought',
        'See the continuity of consciousness through all changes',
        'Feel gratitude for both pleasant and difficult experiences',
        'Recognize your eternal nature beyond temporary circumstances',
        'Rest in awareness of your journey of growth'
      ],
      benefits: ['Life perspective', 'Acceptance of change', 'Gratitude for experiences', 'Spiritual insight'],
      audioUrl: '/audio/meditations/life-reflection.mp3'
    },
    audioGuide: {
      narrator: 'Cycle Teacher',
      duration: '24 minutes',
      audioUrl: '/audio/guides/samsara-guide.mp3',
      topics: ['Understanding samsara', 'Purpose of rebirth', 'Breaking negative cycles', 'Growing through experiences']
    },
    podcastEpisodes: [],
    images: {
      // TODO cover shopping list: samsara-cover.png
      heroImage: require('../../assets/images/covers/samsara-cover.png'),
      iconImage: '/images/philosophy/samsara-icon.jpg'
    },
    difficulty: 'intermediate',
    kicker: "Everything in your life already moves in circles. The tradition says the circling does not stop at the body's edge.",
    learnItems: [
      'Samsara is the wheel: birth, death, and birth again',
      'Desire is what keeps the wheel turning',
      'Even heaven is temporary — it too is on the wheel',
      'The wheel is a school, not a sentence',
      'Freedom is the still point at the center, not another place',
    ],
    handoff:
      'The wheel turns, and even heaven is on it. So is there any way off? There is a still point at the very center, and reaching it, they do not return. The tradition calls it moksha.',
    sections: [
      {
        id: 'samsara-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Seasons return. Moods return. The argument you had with your father returns, wearing your child's face. Before samsara is a doctrine about rebirth, it is something you can watch: everything in experience cycles.\n\nOver the next few pages, the wheel goes from a strange idea about past lives to a clear picture of why life repeats, and where its quiet center is.",
      },
      {
        id: 'samsara-opening',
        title: 'The Wheel That Keeps Turning',
        subtitle: 'A River Bending Back to Its Source',
        takeaway:
          'Samsara is the great circulation: birth, death, and birth again. Everything in your experience already moves this way.',
        storyText: '**Samsara** — from the Sanskrit "to flow together, to wander through" — is the tradition\'s name for the great circulation: birth, growth, decay, death, and birth again, world upon world, life upon life.\n\nBut before it is a doctrine about reincarnation, it is an observation anyone can verify: **everything in experience cycles**. Seasons return. Moods return. The argument you had with your father returns, wearing your child\'s face.\n\nThe tradition\'s claim is simply that the circulation does not stop at the body\'s edge — the traveler continues, changing vehicles.'
      },
      {
        id: 'samsara-changing-clothes',
        title: 'Worn-Out Clothes',
        subtitle: 'A Traveler Folding One Garment, Reaching for Another',
        takeaway:
          'Death changes the clothes, not the wearer. You have already outlived the child you once were.',
        keyVerse: {
          sanskrit: 'वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥',
          transliteration: 'vāsānsi jīrṇāni yathā vihāya navāni gṛihṇāti naro \'parāṇi, tathā śharīrāṇi vihāya jīrṇāny anyāni sanyāti navāni dehī',
          meaning: 'Just as a man casts off worn-out clothes and puts on new ones, so the embodied Self casts off worn-out bodies and enters others that are new.',
          source: 'Bhagavad Gita 2.22 (tr. Swami Sivananda)'
        },
        storyText: 'The Gita\'s most famous image for samsara is domestic, almost gentle: **changing clothes**.\n\nA verse earlier, Krishna points out that you have already survived several such changes within this one life: "as the embodied soul passes through childhood, youth, and old age in this body, so too does it pass into another body; the steadfast one does not grieve."\n\nThe child\'s body you once wore is gone as completely as any past life. Something continuous wore it and outlasted it — and is reading this now.',
        teachingText: 'Whatever you conclude about literal rebirth, the verse\'s comfort is empirically available: you have already died to several selves — the child, the adolescent, the person before the loss — and **the wearer persisted**.\n\nThe next great change is, on this teaching, more wardrobe than annihilation. The steadfast one does not grieve; the practical one gets acquainted with the wearer.',
        citationLink: 'gita:2',
        citation: 'Bhagavad Gita 2.13 (tr. Swami Sivananda).'
      },
      {
        id: 'samsara-term-samsara',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'संसार',
          transliteration: 'saṃsāra',
          meaning: 'the wheel — birth, death, and birth again',
        },
        storyText:
          'The word literally means *wandering through*. A soul in samsara moves from life to life the way a traveler moves from town to town.\n\nHold onto the wheel image. Everything ahead is about that wheel: first what turns it, and then how to step toward its center.',
        reappears:
          'Samsara is the problem that moksha, two ideas from now, is the answer to.',
        checks: [
          {
            id: 'chk:concept:samsara:wearer',
            kind: 'mcq',
            prompt: 'Death is "casting off worn-out clothes." In the image, who does the casting off?',
            options: [
              {
                text: 'The Self — the one who wore the child’s body, the youth’s, and this one, staying the same while the bodies change',
                correct: true,
              },
              { text: 'The body, which then receives a new soul' },
              { text: 'Nobody — the image means everything simply ends at death' },
            ],
            why: 'The clothes are the body; the wearer is the Self that has already outlived every earlier body you wore. Death changes the clothes, not the wearer.',
          },
        ],
      },
      {
        id: 'samsara-engine',
        title: 'What Drives the Wheel',
        subtitle: 'Desire as the Axle',
        takeaway:
          "Desire is what turns the wheel. Each life is the last life's unfinished wanting, given a new body to want with.",
        storyText: 'The wheel is not spun by punishment; it is spun by **wanting**.\n\nThe Brihadaranyaka Upanishad traces the mechanics in one breath: a person "consists of desires; as is the desire, so is the will; as is the will, so is the deed; and whatever deed he does, that he will reap" — and then completes the circuit: the one still holding unfinished desire returns to fulfill it, while "of the one without desire... his vital energies do not depart; being Brahman itself, he goes to Brahman."\n\nSamsara, in other words, is **unfinished business**. Each life is the previous life\'s wanting, given a new body to want with.',
        teachingText: 'Scale it down to watch it work: notice how today\'s restlessness is mostly yesterday\'s unfinished desires re-arising — the unanswered message, the unbought thing, the unproven point. That is the wheel, in miniature, turning daily.\n\nThe tradition\'s exit is not to crush desire but to **complete and outgrow it**: want deeper things until the shallow wanting quiets.',
        citation: 'Brihadaranyaka Upanishad 4.4.5–6 (tr. Max Müller).'
      },
      {
        id: 'samsara-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'So the wheel turns, and it is wanting that turns it. Next comes a surprise about how far the wheel reaches — including up, into the heavens.',
      },
      {
        id: 'samsara-even-heaven',
        title: 'Even Heaven Is on the Wheel',
        subtitle: 'Palaces of the Gods, Also Turning',
        takeaway:
          'Even heaven is on the wheel. Every earned paradise has an expiry date.',
        keyVerse: {
          sanskrit: 'आब्रह्मभुवनाल्लोकाः पुनरावर्तिनोऽर्जुन। मामुपेत्य तु कौन्तेय पुनर्जन्म न विद्यते॥',
          transliteration: 'ā-brahma-bhuvanāl lokāḥ punar āvartino \'rjuna, mām upetya tu kaunteya punar janma na vidyate',
          meaning: 'All worlds, up to the realm of Brahma, are subject to return, O Arjuna; but reaching Me, there is no rebirth.',
          source: 'Bhagavad Gita 8.16 (tr. Swami Sivananda)'
        },
        storyText: 'Hindu cosmology makes a move that startles first-time readers: **even heaven is inside samsara**.\n\nThe pleasant worlds earned by good karma are real, says the Gita — and temporary. When the merit runs out, the stay ends, and the wheel resumes.\n\nThis is the tradition\'s deepest critique of the spiritual transaction: piety aimed at reward is just shopping at a higher altitude. What the Gita calls "a place of pain and impermanence" is not earth specifically — it is **anywhere the meter is running**.',
        teachingText: 'The modern translation writes itself: every achieved paradise — the promotion, the body, the house, the reputation — is a heaven with an expiry date, enjoyable and unstable.\n\nNoticing this is not cynicism; it is accuracy. The unconditioned, says the teaching, is not another better place on the wheel. It is **the axle\'s stillness** — available, the sages insist, in the middle of any turning life.',
        citationLink: 'gita:8',
        citation: 'Bhagavad Gita 8.15–16 (tr. Swami Sivananda).',
        checks: [
          {
            id: 'chk:concept:samsara:heaven',
            kind: 'mcq',
            prompt: 'The Gita says even heaven is temporary. What is it warning against?',
            options: [
              {
                text: 'Piety aimed at reward is just shopping at a higher altitude — freedom is not a better seat on the wheel but the stillness at its center',
                correct: true,
              },
              { text: 'That heaven does not exist at all' },
              { text: 'That good actions are pointless' },
            ],
            why: 'Pleasant worlds earned by good karma are real, and temporary; when the merit runs out, the wheel resumes. The unconditioned is not a nicer place on the rim. It is the axle.',
          },
        ],
      },
      {
        id: 'samsara-not-punishment',
        title: 'A School, Not a Sentence',
        subtitle: 'The Same Lesson Returning Until Learned',
        takeaway:
          'The wheel is a school, not a sentence. It returns you, precisely, to whatever you have not yet learned.',
        storyText: 'It is easy to hear samsara as a prison sentence — trapped on the wheel until release. The tradition\'s working attitude is closer to **a school**: the wheel returns you, with great precision, to whatever you have not yet learned.\n\nThe pattern you fled in one relationship waits in the next; the lesson dodged in one decade re-enrolls you in the following one. Rebirth, on this reading, is the curriculum continuing between terms.\n\nNothing is vindictive about it — the fire that burns the hand is also the fire that cooks the food. **The wheel is neutral; the learning is optional; the repetition is not.**',
        teachingText: 'Find your own recurring curriculum: the situation that keeps arriving with different casting — the same boss twice, the same argument in every friendship, the same crisis each spring.\n\nThe tradition\'s counsel is to stop asking "why does this keep happening to me" and start asking **"what does this keep asking of me."** Wheels release what has finished learning.',
        checks: [
          {
            id: 'chk:concept:samsara:school',
            kind: 'mcq',
            prompt: 'Samsara keeps returning you to the same lesson. What question does the tradition suggest you ask instead?',
            options: [
              {
                text: 'Not "why does this keep happening to me," but "what does this keep asking of me"',
                correct: true,
              },
              { text: '"Who is to blame for this repeating?"' },
              { text: '"How do I make sure nothing ever changes?"' },
            ],
            why: 'Wheels release what has finished learning. The situation that keeps arriving with different casting is the curriculum continuing between terms.',
          },
        ],
      },
      {
        id: 'samsara-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'The wheel is neutral; the repetition is not. One idea remains, and it is the way through: the wheel has a center, and the center is the way out.',
      },
      {
        id: 'samsara-stepping-off',
        title: 'The Still Point',
        subtitle: 'The Axle at the Center of the Turning',
        takeaway:
          'The wheel has a center. Nearer the axle the same wheel turns, and you merely watch it turn.',
        storyText: 'Samsara is only half the teaching; the other half is that the wheel has an exit — or more precisely, **a center**.\n\nMoksha is not somewhere else; it is the stillness at the axle, and the Gita\'s entire counsel — act without clinging, remember the divine, love without agenda — is the inward walk from rim to hub.\n\nAt the rim, every turn of fortune flings you; nearer the center, the same wheel turns and you merely watch it turn. "Having attained Me," says Krishna, "these great souls do not take birth again." And the devotional traditions add, tenderly, that some who are free keep riding the wheel anyway — **for love of those still on it**.',
        teachingText: 'You can test the geometry today. In the next upheaval, notice where you are standing: at the rim (flung, reactive, "why me") or nearer the axle (moved, but watching).\n\nEvery practice in this app — the reading, the reflections, the remembering — is a step inward. **The wheel is not the enemy. Forgetting there is a center is.**',
        citationLink: 'gita:8',
        citation: 'Bhagavad Gita 8.15 (tr. Swami Sivananda).'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:2',
        locator: '2.13, 2.22 (the embodied one changes bodies), 8.15–16 (all worlds return; reaching Me, no rebirth)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Brihadaranyaka Upanishad',
        locator: '4.4.5–6 (desire → will → deed → destiny; the desireless go to Brahman)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
        url: 'https://www.brhat.in/openlibrary/special/brihadaranyaka-upanishad/4-4-5',
      },
    ],
    reflectionQuestions: [
      'What situation keeps repeating in your life with different people — and what might it be trying to teach you?',
      'Where are you chasing a "heaven" with an expiry date — a title, a purchase — as if it were permanent?',
      'In your next upheaval, can you notice whether you are standing at the rim (flung) or nearer the center (watching)?',
    ]
  },
  {
    id: 'moksha',
    name: 'Moksha',
    sanskritName: 'मोक्ष',
    category: 'core_concepts',
    description: 'Ultimate spiritual liberation from cycle of rebirth',
    detailedExplanation: 'Moksha represents the highest achievement in Hindu spirituality - complete liberation from the cycle of samsara (birth, death, and rebirth) through the realization of one\'s true divine nature. It is not a place to reach but a state of consciousness where the individual soul (Atman) recognizes its unity with the universal consciousness (Brahman). This liberation brings eternal peace, unlimited knowledge, and infinite bliss, free from all suffering and limitations of material existence.',
    etymology: 'From Sanskrit "moksh" meaning "to release" or "to liberate" - complete freedom from bondage',
    keyAspects: [
      'Liberation from cycle of birth and death',
      'Realization of true divine nature',
      'Unity of individual and universal consciousness',
      'Freedom from all suffering and limitation',
      'Eternal peace, knowledge, and bliss'
    ],
    practicalApplications: [
      {
        situation: 'Life transitions and losses',
        application: 'Remember the eternal nature of your true self beyond temporary circumstances',
        benefits: ['Reduced fear of death', 'Peace during changes', 'Perspective on problems'],
        tips: ['Practice meditation regularly', 'Study spiritual texts', 'Cultivate detachment from outcomes']
      },
      {
        situation: 'Material pursuits',
        application: 'Engage with the world while remembering your higher spiritual purpose',
        benefits: ['Balanced approach to success', 'Reduced anxiety about achievements', 'Inner fulfillment'],
        tips: ['Use wealth and success to serve others', 'Don\'t let possessions possess you', 'Remember what truly matters']
      }
    ],
    relatedConcepts: ['samsara', 'atman', 'brahman', 'self-realization', 'enlightenment'],
    scriptureReferences: [
      {
        id: 'moksha-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 5, Verse 24',
        quote: 'One who finds happiness within, joy within, and light within, is a yogi who attains the bliss of Brahman',
        context: 'Krishna describes the state of self-realized beings who have found inner fulfillment'
      }
    ],
    modernRelevance: 'While few may achieve complete moksha in this lifetime, the concept guides us toward inner freedom, self-understanding, and finding meaning beyond material success',
    commonMisunderstandings: [
      'Moksha is not escapism or rejection of worldly responsibilities',
      'It\'s not achieved through external practices alone but through inner transformation',
      'One can work toward liberation while living a normal life',
      'It\'s not about becoming emotionless but transcending ego-based emotions'
    ],
    examples: [
      {
        id: 'moksha-example-1',
        title: 'The Liberated Householder',
        scenario: 'A family person who fulfills all duties while maintaining inner detachment and spiritual awareness',
        explanation: 'They serve family and society with love while knowing their true nature is beyond these roles',
        lesson: 'Liberation is an inner state that can coexist with any lifestyle when properly understood'
      }
    ],
    meditation: {
      technique: 'Self-Inquiry Meditation',
      duration: '25 minutes',
      instructions: [
        'Ask yourself: "Who am I?" beyond name, roles, and identities',
        'Observe thoughts and feelings without identifying with them',
        'Look for the awareness that observes all experiences',
        'Rest in the sense of pure being beyond all labels',
        'Recognize this awareness as your true, eternal nature',
        'Abide in this recognition throughout daily activities'
      ],
      benefits: ['Self-understanding', 'Reduced ego-identification', 'Inner peace', 'Spiritual insight'],
      audioUrl: '/audio/meditations/self-inquiry.mp3'
    },
    audioGuide: {
      narrator: 'Liberation Teacher',
      duration: '30 minutes',
      audioUrl: '/audio/guides/moksha-guide.mp3',
      topics: ['Understanding liberation', 'Paths to moksha', 'Living with liberation perspective', 'Self-realization']
    },
    podcastEpisodes: [],
    images: {
      // TODO cover shopping list: replace with a real moksha-cover.png
      heroImage: require('../../assets/images/covers/moksha-cover.png'),
      iconImage: '/images/philosophy/moksha-icon.jpg'
    },
    difficulty: 'advanced',
    kicker: 'Liberation from what? Not from the world — from the cage of mistaken identity. And the door was never locked.',
    learnItems: [
      'Moksha is freedom from the cage of mistaken identity',
      'Bondage is made of clinging, so freedom is release, not gain',
      'The liberated life is lit from within',
      'You are always rehearsing — practice re-aims the mind',
      'You can be liberated while still living (jivanmukti)',
    ],
    handoff:
      'Liberation is remembering what you already are. But what are you, underneath the body and the story that fall away? The tradition answers with two words that turn out to be one: brahman and atman.',
    // Verse translations follow Swami Sivananda's public-domain rendering
    // (bundled in gitaVerses.json), lightly trimmed for reading flow.
    sections: [
      {
        id: 'moksha-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'Every teaching in this tradition eventually points at one destination: moksha, liberation. The strange part is what it frees you from, and how near it already is.\n\nOver the next few pages, moksha turns from a distant reward after death into something you have already tasted, in any moment a long-carried weight was set down.',
      },
      {
        id: 'moksha-opening',
        title: 'The Open Cage',
        subtitle: 'A Bird Beside a Door Left Ajar',
        takeaway:
          'Moksha is liberation, and the cage door was never locked. You are already free; the work is to stop believing in the bars.',
        storyText: 'Every teaching in the Hindu tradition eventually points at one destination: **moksha**, liberation. But liberation from what?\n\nNot from the world — from the cage of mistaken identity: the conviction that you are only this body, this résumé, this bundle of fears aging toward an ending.\n\nThe tradition\'s startling claim is that **the cage door is not locked. It never was.** The soul is already free — unborn, undying, untouched — and the entire spiritual project is not to earn freedom but to stop believing in the bars. Moksha is not somewhere you go after death. It is what remains when the misunderstanding drops.'
      },
      {
        id: 'moksha-term-moksha',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'मोक्ष',
          transliteration: 'mokṣa',
          meaning: 'liberation — release from the cage of mistaken identity',
        },
        storyText:
          'The root means *to loosen, to release*. Moksha is not a place you travel to after death. It is what is left when the knot of "I am only this body and story" comes loose.\n\n**You are not freed into something new. You are freed from a mistake.**',
        reappears:
          'Moksha is the goal every path in this tradition is quietly aimed at.',
      },
      {
        id: 'moksha-beyond-sorrow',
        title: 'The Place Beyond All Evil',
        subtitle: 'A Traveler Setting Down a Heavy Pack',
        takeaway:
          'Bondage is made of clinging, so freedom is made of release. Nothing is added to you; things are set down.',
        keyVerse: {
          sanskrit: 'कर्मजं बुद्धियुक्ता हि फलं त्यक्त्वा मनीषिणः। जन्मबन्धविनिर्मुक्ताः पदं गच्छन्त्यनामयम्॥',
          transliteration: 'karma-jaṁ buddhi-yuktā hi phalaṁ tyaktvā manīṣhiṇaḥ, janma-bandha-vinirmuktāḥ padaṁ gachchhanty anāmayam',
          meaning: 'The wise, having abandoned the fruits of their actions, freed from the bonds of birth, go to the place beyond all evil.',
          source: 'Bhagavad Gita 2.51 (tr. Swami Sivananda)'
        },
        storyText: 'The Gita\'s first mention of the goal comes wrapped in the teaching of karma: the wise who release the fruits of action are "freed from the bonds of birth" and reach the place **anamayam** — beyond affliction, beyond sorrow.\n\nNotice the mechanics: **bondage is made of clinging, so liberation is made of release.** Nothing is added to the liberated person; things are set down.\n\nThe Upanishads had said it a generation of texts earlier: as desire is, so is destiny — and the one whose desires have resolved into the Self "goes to the Self."',
        teachingText: 'You have tasted anamayam already — moments when a long-carried weight was set down and the world turned vivid: after honest confession, after forgiving, after finally releasing an outcome.\n\nThe tradition asks you to take those moments seriously as data. They are not moods; they are glimpses of your actual condition with the clinging briefly removed.',
        citation: 'Brihadaranyaka Upanishad 4.4.5–6 (tr. Max Müller).',
        checks: [
          {
            id: 'chk:concept:moksha:from-what',
            kind: 'mcq',
            prompt: 'Moksha is liberation — but from what?',
            options: [
              {
                text: 'From the cage of mistaken identity — the belief that you are only this body and story — not from the world itself',
                correct: true,
              },
              { text: 'From ever having to act or work again' },
              { text: 'From the body, by leaving it behind at death' },
            ],
            why: 'Bondage is made of clinging, so liberation is release, not escape. Nothing is added to the freed person; the weight is simply set down.',
          },
        ],
      },
      {
        id: 'moksha-lit-within',
        title: 'Lit from Within',
        subtitle: 'A Lamp Burning in a Windless Room',
        takeaway:
          'The liberated life is lit from within. Its happiness no longer switches on and off with praise and outcomes.',
        keyVerse: {
          sanskrit: 'योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः। स योगी ब्रह्मनिर्वाणं ब्रह्मभूतोऽधिगच्छति॥',
          transliteration: 'yo \'ntaḥ-sukho \'ntar-ārāmas tathāntar-jyotir eva yaḥ, sa yogī brahma-nirvāṇaṁ brahma-bhūto \'dhigachchhati',
          meaning: 'He who is happy within, who rejoices within, who is illuminated within — that yogi attains absolute freedom, becoming Brahman himself.',
          source: 'Bhagavad Gita 5.24 (tr. Swami Sivananda)'
        },
        storyText: 'The Gita gives liberation a diagnostic: **where does your light come from?**\n\nThe unliberated life is lit from outside — happiness switched on and off by praise, purchases, outcomes, other people\'s moods. The liberated one is **antar-jyotih**, lit from within: happy within, rejoicing within, illuminated within.\n\nThis is not a personality trait but a relocation of the source. The sage Yajnavalkya, asked what light a person sees by when sun, moon, and fire are all gone, answered: **the Self is his light**.',
        teachingText: 'Run the diagnostic honestly for a day. Track each surge of happiness and each collapse: what switched it?\n\nIf every switch is external, nothing is wrong with you — that is simply the starting condition. The practices — meditation, offering the fruits, devotion — are all ways of drilling toward the inner light until some of your illumination no longer depends on the weather.',
        citation: 'Brihadaranyaka Upanishad 4.3.6 (tr. Max Müller).',
        checks: [
          {
            id: 'chk:concept:moksha:inner-light',
            kind: 'mcq',
            prompt: "The Gita's diagnostic for freedom asks: where does your light come from?",
            options: [
              {
                text: 'The liberated one is antar-jyotiḥ, lit from within — happy within, not switched on and off by outside events',
                correct: true,
              },
              { text: 'From the approval of the people around you' },
              { text: 'From reaching a heaven after death' },
            ],
            why: "The unfree life is lit from outside, its joy toggled by praise, purchases, and other people's moods. Practice drills toward the inner light until some of your illumination no longer depends on the weather.",
          },
        ],
      },
      {
        id: 'moksha-way-1',
        kind: 'waypoint',
        title: '3 of 5 banked',
        learnIndex: 3,
        storyText:
          "Freedom is release, and it is lit from within. Next: how the mind's quiet daily rehearsal decides where it goes.",
      },
      {
        id: 'moksha-what-you-remember',
        title: 'What You Remember at the End',
        subtitle: 'A Lamp Carried Toward a Doorway',
        takeaway:
          'You are always practicing something, and the practiced thing surfaces at the end. Practice re-aims the mind.',
        keyVerse: {
          sanskrit: 'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्। यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥',
          transliteration: 'anta-kāle cha mām eva smaran muktvā kalevaram, yaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra sanśhayaḥ',
          meaning: 'Whoever, leaving the body, goes forth remembering Me alone at the time of death attains My being; of this there is no doubt.',
          source: 'Bhagavad Gita 8.5 (tr. Swami Sivananda)'
        },
        storyText: 'The Gita\'s eighth chapter faces the question directly: what happens at death? Krishna\'s answer is neither morbid nor mystical — it is about **momentum**.\n\nWhatever the mind has practiced remembering, it remembers at the end; and what it remembers at the end shapes where it goes.\n\nThe tradition drew the practical conclusion with complete seriousness: you cannot summon at the last hour a remembrance you never rehearsed. The whole of spiritual practice is, in one sense, **rehearsal** — training the mind\'s default direction so that its final movement is toward the light.',
        teachingText: 'Set aside the metaphysics and the teaching still stands: you are always practicing something, and the practiced thing is what surfaces under pressure.\n\nWhat does your mind rehearse in its idle moments — grievance, anxiety, acquisition? That is the current default. The remembrance practices — a name, a breath, a verse returned to daily — are how the tradition re-aims the arrow before it must fly.'
      },
      {
        id: 'moksha-no-return',
        title: 'The Abode Without Return',
        subtitle: 'Light That Needs No Sun',
        takeaway:
          'Moksha is the one satisfaction that does not wear off, because it is not something you have but what you are.',
        keyVerse: {
          sanskrit: 'न तद्भासयते सूर्यो न शशाङ्को न पावकः। यद्गत्वा न निवर्तन्ते तद्धाम परमं मम॥',
          transliteration: 'na tad bhāsayate sūryo na śhaśhāṅko na pāvakaḥ, yad gatvā na nivartante tad dhāma paramaṁ mama',
          meaning: 'Neither sun nor moon nor fire illumines that place; having gone there, they do not return — that is My supreme abode.',
          source: 'Bhagavad Gita 15.6 (tr. Swami Sivananda)'
        },
        storyText: 'Everything in samsara cycles — seasons, moods, fortunes, births. The tradition\'s image for conditioned existence is the wheel; even heaven, in Hindu cosmology, is temporary — a pleasant stay that ends when merit runs out.\n\n**Moksha alone is described as the place from which "they do not return."** Not because a door locks behind you, but because there is nothing left to pull you back: the fuel of returning — unfinished desire — is spent.\n\nThe light there needs no sun because it is the light by which suns are seen.',
        teachingText: 'The mark of everything unliberated is that it **wears off** — the vacation, the achievement, the purchase, each demanding a next one.\n\nMoksha is the tradition\'s name for the only satisfaction that does not wear off, because it is not an experience the self has but the self\'s own nature, uncovered. Chasing states that wear off is not wrong; it is simply the wheel. Noticing the wheel is the first step off it.'
      },
      {
        id: 'moksha-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Everything else wears off; moksha does not. One idea remains, and it is the most surprising of all: you need not wait for death.',
      },
      {
        id: 'moksha-liberated-life',
        title: 'Liberated While Living',
        subtitle: 'Serene Eyes in the Middle of the Marketplace',
        takeaway:
          'You can be free while still living. Moksha is not leaving your life; it is your life, finally unclenched.',
        keyVerse: {
          sanskrit: 'ब्रह्मभूतः प्रसन्नात्मा न शोचति न काङ्क्षति। समः सर्वेषु भूतेषु मद्भक्तिं लभते पराम्॥',
          transliteration: 'brahma-bhūtaḥ prasannātmā na śhochati na kāṅkṣhati, samaḥ sarveṣhu bhūteṣhu mad-bhaktiṁ labhate parām',
          meaning: 'Becoming Brahman, serene in the Self, he neither grieves nor desires; the same to all beings, he attains supreme devotion to Me.',
          source: 'Bhagavad Gita 18.54 (tr. Swami Sivananda)'
        },
        storyText: 'The tradition\'s boldest idea is **jivanmukti**: liberation while alive.\n\nThe liberated one does not vanish in a flash of light — she goes on cooking, working, raising children, but from a different center. The Gita\'s portrait: serene, beyond grasping and grieving, "the same to all beings" — because she no longer sorts people by what they can give or take from her.\n\nAnd then the surprise in the verse\'s last line: this freedom does not end in cool detachment but flowers into **supreme devotion**. The freed heart, wanting nothing, finally loves without agenda.',
        teachingText: 'Liberation, scaled to a Tuesday: act fully, cling to nothing, meet everyone as the same light in different lamps, and let love — not need — be what remains.\n\nYou will manage it for moments at first. The tradition\'s patient claim is that the moments join. **Moksha is not the abandonment of your life; it is your life, finally unclenched.**'
      },
      {
        id: 'moksha-term-jivanmukti',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'जीवन्मुक्ति',
          transliteration: 'jīvanmukti',
          meaning: 'liberation while still alive',
        },
        storyText:
          "Jivan means *living*; mukti means *liberation*. Jivanmukti is the tradition's boldest claim: you do not have to die to be free.\n\nThe liberated one goes on cooking, working, raising children, from a different center. **Same life, unclenched hands.**",
        reappears:
          'The jivanmukta is the quiet ideal behind every practice in this app.',
        checks: [
          {
            id: 'chk:concept:moksha:jivanmukti',
            kind: 'mcq',
            prompt: 'Jivanmukti is liberation while alive. What does that freedom flower into?',
            options: [
              {
                text: 'Not cool detachment but supreme devotion — the freed heart, wanting nothing, finally loves without agenda',
                correct: true,
              },
              { text: 'Complete withdrawal from people and work' },
              { text: 'Indifference to everyone and everything' },
            ],
            why: 'The liberated one is "the same to all beings," no longer sorting people by what they can give or take. Wanting nothing, she is finally free to love without need.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:2',
        locator: 'Verses 2.51, 5.24, 8.5, 15.6, 18.54 (also 4.9)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Brihadaranyaka Upanishad',
        locator: '4.4.5–6 (desire and destiny; the desireless reach the Self); 4.3.6 (the Self as one\'s light)',
        translation: 'Max Müller, Sacred Books of the East (public domain)',
        url: 'https://www.brhat.in/openlibrary/special/brihadaranyaka-upanishad/4-4-5',
      },
    ],
    reflectionQuestions: [
      'How much of your happiness today depended on things outside your control?',
      'What does your mind rehearse in its idle moments — grievance, worry, wanting? That is its current default direction.',
      'Recall a moment you set down a long-carried weight. What did the world look like in the minutes just after?',
    ]
  },
  {
    id: 'three-gunas',
    name: 'The Three Gunas',
    sanskritName: 'त्रिगुण',
    category: 'core_concepts',
    description: 'The three strands of nature — clarity, restlessness, and inertia — that color every mood, meal, and motive',
    detailedExplanation: 'The Gita\'s fourteenth chapter teaches that all of nature — including your moods, appetites, and motivations — is woven from three strands (gunas): sattva (clarity, lightness, harmony), rajas (restlessness, passion, drive), and tamas (inertia, dullness, darkness). None of them is you: the self is the witness the strands bind. But at any moment one predominates, and the practical art is learning to recognize which one is driving, and to feed the strand you want to grow. Freedom, finally, lies beyond all three — but the road there runs through cultivating sattva.',
    etymology: 'Guna means "strand" or "quality" — the threads a rope is twisted from; prakriti (nature) is the rope',
    keyAspects: [
      'Sattva: clarity, lightness, knowledge, harmony',
      'Rajas: passion, drive, restlessness, craving',
      'Tamas: inertia, dullness, confusion, sleep',
      'You cannot fight a guna head-on — you feed a different one',
      'The self is the witness of the strands, not the strands'
    ],
    practicalApplications: [
      {
        situation: 'A foggy, unmotivated morning (tamas)',
        application: 'Don\'t reach for willpower (rajas) or self-blame; change the inputs — light, movement, a shower, fresh food',
        benefits: ['Momentum without force', 'Self-compassion', 'Practical energy management'],
        tips: ['Sunlight and a walk beat scolding yourself', 'Tamas yields to gentle rajas, then rajas can settle into sattva']
      },
      {
        situation: 'A racing, scattered workday (rajas)',
        application: 'Schedule stillness like a meeting: one unhurried meal, one screen-free walk, three conscious breaths between tasks',
        benefits: ['Clearer decisions', 'Less burnout', 'Recovered attention'],
        tips: ['Rajas is useful for launching, terrible for judging — postpone big decisions until the mind settles']
      },
      {
        situation: 'Choosing food, media, and company',
        application: 'Everything you consume is guna-flavored; audit inputs by the state they leave behind, not the pleasure during',
        benefits: ['Deliberate mood-shaping', 'Better company', 'Cleaner attention'],
        tips: ['Ask after each input: lighter, agitated, or duller?', 'Change one input at a time']
      }
    ],
    relatedConcepts: ['karma', 'dharma', 'moksha'],
    scriptureReferences: [
      {
        id: 'gunas-gita-14-5',
        text: 'Bhagavad Gita',
        reference: 'Chapter 14, Verse 5',
        quote: 'These qualities born of Nature — sattva, rajas, and tamas — bind fast in the body the indestructible embodied one.',
        context: 'Krishna names the three strands and their binding power'
      },
      {
        id: 'gunas-gita-14-17',
        text: 'Bhagavad Gita',
        reference: 'Chapter 14, Verse 17',
        quote: 'From sattva arises knowledge, from rajas greed; heedlessness, delusion, and ignorance arise from tamas.',
        context: 'The fruits of each strand'
      },
      {
        id: 'gunas-gita-14-26',
        text: 'Bhagavad Gita',
        reference: 'Chapter 14, Verse 26',
        quote: 'He who serves Me with unwavering devotion crosses beyond the gunas and is fit to become Brahman.',
        context: 'The way beyond all three strands'
      }
    ],
    modernRelevance: 'The gunas are a working psychology of energy: why some days are clear, some frantic, some leaden — and how food, media, sleep, and company tip the balance. They replace self-blame with input management.',
    commonMisunderstandings: [
      'That tamas is "bad" — rest, sleep, and grounding are tamas rightly used; the problem is being ruled by it',
      'That sattva is the goal — the Gita\'s goal is beyond all three; sattva binds too, by attachment to happiness and knowledge (14.6)',
      'That your guna is fixed — the balance shifts hourly with inputs, and can be deliberately cultivated'
    ],
    examples: [
      {
        id: 'gunas-kitchen',
        title: 'One Kitchen, Three Meals',
        scenario: 'The same cook prepares fresh sabzi with attention (sattva), a fiery midnight snack grabbed standing up (rajas), and reheated leftovers eaten cold from the fridge (tamas).',
        explanation: 'Gita 17.8–10 classifies food by the state it produces — vitality and clarity, craving and agitation, or dullness.',
        lesson: 'You are not just what you eat but how and why you eat it.'
      }
    ],
    meditation: {
      technique: 'Guna-watching',
      duration: '10 minutes',
      instructions: [
        'Sit and simply name the current weather: clear, restless, or foggy — without judgment',
        'Watch it change even within the sitting; note what thoughts feed which strand',
        'End by resting as the one who watched all three — the witness none of them touch'
      ],
      benefits: ['Self-knowledge without self-blame', 'Emotional weather literacy', 'Glimpses of the witness'],
      audioUrl: '/audio/meditations/guna-watching.mp3'
    },
    audioGuide: {
      narrator: 'Guna Wisdom',
      duration: '20 minutes',
      audioUrl: '/audio/guides/gunas-guide.mp3',
      topics: ['The three strands', 'Feeding sattva', 'Beyond the gunas']
    },
    podcastEpisodes: [],
    images: {
      // TODO cover shopping list: replace with a real three-gunas-cover.png
      heroImage: require('../../assets/images/covers/three-gunas-cover.png'),
      iconImage: '/images/philosophy/gunas-icon.jpg'
    },
    difficulty: 'beginner',
    kicker: 'Same person, same bed, three different worlds. The tradition maps why — and how to change the weather.',
    learnItems: [
      'Three strands weave all of nature: sattva, rajas, tamas',
      'All three bind — even sattva',
      'Read a strand by its harvest',
      "You feed a guna, you don't fight it",
      'The same task, three ways, three residues',
      'Beyond the weather is the sky that holds all three',
    ],
    handoff:
      'You can name your inner weather now, and feed the clear days. The very first thing a clearer mind is asked to do is deceptively plain: cause no harm. That is ahimsa.',
    sections: [
      {
        id: 'gunas-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'Some days you wake clear, some frantic, some in fog — same person, same bed. That everyday mystery has an old and useful map.\n\nOver the next few pages you will learn to name your inner weather, read it by what it leaves behind, and change it not by willpower but by what you feed it.',
      },
      {
        id: 'gunas-opening',
        title: 'The Weather of the Mind',
        subtitle: 'Three Skies Over One Mountain',
        takeaway:
          'Three strands weave all of nature: sattva (clarity), rajas (restlessness), tamas (heaviness). One of them is colouring this very moment.',
        storyText: 'Some mornings you wake clear: the tea tastes bright, work flows, patience comes easily. Other mornings you wake already running: mind racing, jaw tight, five browser tabs before breakfast. And some mornings you wake in fog: heavy, unwilling, reaching for the phone to numb the grayness.\n\nSame person, same bed — three different worlds.\n\nThe Gita\'s fourteenth chapter gives this everyday mystery its oldest and most useful map. Three strands, three **gunas**, weave all of nature:',
        bullets: [
          '**Sattva** — clarity, light',
          '**Rajas** — restlessness, motion',
          '**Tamas** — inertia, heaviness'
        ],
        teachingText: 'At every moment, one of the three is dyeing your entire experience its color.'
      },
      {
        id: 'gunas-three-strands',
        title: 'Naming the Strands',
        subtitle: 'Three Threads Twisted into One Rope',
        takeaway:
          'All three strands bind, even sattva. You are not the rope; you are the one it binds. You cannot steer a storm you believe you are.',
        keyVerse: {
          sanskrit: 'सत्त्वं रजस्तम इति गुणाः प्रकृतिसंभवाः। निबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥',
          transliteration: 'sattvaṁ rajas tama iti guṇāḥ prakṛiti-sambhavāḥ, nibadhnanti mahā-bāho dehe dehinam avyayam',
          meaning: 'Sattva, rajas, and tamas — these qualities born of Nature bind fast in the body the indestructible embodied one.',
          source: 'Bhagavad Gita 14.5 (tr. Swami Sivananda)'
        },
        storyText: '**Guna** means strand — the threads a rope is twisted from.',
        bullets: [
          '**Sattva** is light and clear: the mind in sattva learns easily, loves easily, sees far.',
          '**Rajas** is motion and heat: the mind in rajas wants, launches, acquires, cannot sit still.',
          '**Tamas** is weight and dark: the mind in tamas postpones, numbs, sleeps, forgets why it came into the room.'
        ],
        teachingText: 'The Gita\'s crucial claim is that **all three bind** — even sattva, which "binds by attachment to happiness and knowledge." The strands are not a ladder from sin to virtue; they are a description of the rope. And you are not the rope — you are the one it binds.\n\nLearn to name your weather in real time — not "I am lazy" but "tamas is heavy this hour"; not "I am so driven" but "rajas is burning." The naming separates the witness from the weather. **You cannot steer a storm you believe you are.**',
        citationLink: 'gita:14',
        citation: 'Bhagavad Gita 14.5–6 (tr. Swami Sivananda).'
      },
      {
        id: 'gunas-term-guna',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'गुण',
          transliteration: 'guṇa',
          meaning: 'strand — a thread the rope of nature is twisted from',
        },
        storyText:
          "Name your weather in real time, and it loosens its grip. Not 'I am lazy' but 'tamas is heavy this hour'; not 'I am so driven' but 'rajas is burning.'\n\n**The naming separates the witness from the weather.**",
        reappears:
          'The three strands run underneath dharma, karma, and even maya, which the Gita calls guna-mayi.',
        checks: [
          {
            id: 'chk:concept:three-gunas:bind',
            kind: 'mcq',
            prompt: 'Are the gunas a ladder from sin (tamas) up to virtue (sattva)?',
            options: [
              {
                text: 'No — all three bind, even sattva, which binds by attachment to happiness and knowledge; they describe the rope, and you are what it binds',
                correct: true,
              },
              { text: 'Yes — the goal is to climb from tamas to pure sattva' },
              { text: 'No — only tamas binds; sattva and rajas set you free' },
            ],
            why: 'The strands are a description of nature, not a moral ranking. Even clear days bind, with silken threads.',
          },
        ],
      },
      {
        id: 'gunas-fruits',
        title: 'What Each Strand Grows',
        subtitle: 'Three Seeds, Three Harvests',
        takeaway:
          'Read the strands by their harvest. Sattva leaves knowledge, rajas leaves greed, tamas leaves fog — and rajas always looks productive from inside.',
        keyVerse: {
          sanskrit: 'सत्त्वात्सञ्जायते ज्ञानं रजसो लोभ एव च। प्रमादमोहौ तमसो भवतोऽज्ञानमेव च॥',
          transliteration: 'sattvāt sañjāyate jñānaṁ rajaso lobha eva cha, pramāda-mohau tamaso bhavato \'jñānam eva cha',
          meaning: 'From sattva arises knowledge, from rajas greed; heedlessness and delusion arise from tamas, and ignorance too.',
          source: 'Bhagavad Gita 14.17 (tr. Swami Sivananda)'
        },
        storyText: 'The strands are recognizable by their **harvests**.',
        bullets: [
          'A season ruled by **sattva** leaves knowledge behind — you end it wiser, steadier, kinder.',
          'A season ruled by **rajas** leaves greed — however much was gained, the wanting grew faster.',
          'A season ruled by **tamas** leaves confusion — time passed and nothing can quite be accounted for.'
        ],
        teachingText: 'The Gita even describes the diagnostic light: "When the light of knowledge shines through every gate of this body, know that sattva is predominant." The gates are the senses; in sattva, the eyes themselves feel washed.\n\nAudit your last year by harvest, not by activity. Which months left knowledge, which left hunger, which left fog? This is more honest than judging by busyness — **rajas always looks productive from inside**. The harvest tells you which strand was actually holding the reins.',
        citationLink: 'gita:14',
        citation: 'Bhagavad Gita 14.11, 14.17 (tr. Swami Sivananda).'
      },
      {
        id: 'gunas-way-1',
        kind: 'waypoint',
        title: '3 of 6 banked',
        learnIndex: 3,
        storyText:
          'You can name the weather and read it by its harvest. Next comes the practical mercy: how the weather actually changes.',
      },
      {
        id: 'gunas-feeding',
        title: 'You Cannot Fight a Guna — You Feed Another',
        subtitle: 'Tending a Fire Instead of Battling the Dark',
        takeaway:
          'You cannot fight a guna with willpower. Feed the strand you want, one input at a time: food, sleep, company, media.',
        storyText: 'Here is the teaching\'s great practical mercy: **the strands do not yield to willpower.**\n\nYou cannot scold tamas into clarity — the scolding just adds agitation to the fog. You cannot suppress rajas by force — suppression is itself rajasic.\n\nThe gunas respond only to **diet**, in the widest sense: food, sleep, company, media, work, and thought are each guna-flavored, and whichever strand you feed grows. The Gita\'s seventeenth chapter maps even faith and food onto the strands: fresh, nourishing food feeds sattva; bitter, burning excess feeds rajas; stale, lifeless stuff feeds tamas. The same is true of everything you consume with eyes and ears.',
        teachingText: 'Pick the strand you want more of and feed it one input at a time.\n\nFoggy? Don\'t fight the fog — add light: a walk, water, one fresh meal, ten minutes of something true. Frantic? Don\'t suppress the fire — stop fueling it: one meal seated, one hour unplugged.\n\nWorking with **inputs instead of willpower** is the whole craft, and it is why the tradition cares so much about what you eat, watch, and keep company with.',
        citationLink: 'gita:17',
        citation: 'Bhagavad Gita 17.3, 17.8–10 (tr. Swami Sivananda).',
        checks: [
          {
            id: 'chk:concept:three-gunas:feed',
            kind: 'mcq',
            prompt: 'How do you actually shift a guna?',
            options: [
              {
                text: 'Not by willpower — by diet in the widest sense: whichever strand you feed, through food, sleep, company, media, and thought, grows',
                correct: true,
              },
              { text: 'By scolding yourself out of the mood' },
              { text: 'By suppressing the feeling until it stops' },
            ],
            why: 'Scolding tamas adds agitation to the fog; suppressing rajas is itself rajasic. Work with inputs, not force.',
          },
        ],
      },
      {
        id: 'gunas-in-action',
        title: 'Three Ways of Doing the Same Task',
        subtitle: 'The Same Letter Written Three Times',
        takeaway:
          'The same task done in sattva, rajas, or tamas leaves three different residues. One breath of self-location changes the doer.',
        keyVerse: {
          sanskrit: 'नियतं सङ्गरहितमरागद्वेषतः कृतम्। अफलप्रेप्सुना कर्म यत्तत्सात्त्विकमुच्यते॥',
          transliteration: 'niyataṁ saṅga-rahitam arāga-dveṣhataḥ kṛitam, aphala-prepsunā karma yat tat sāttvikam uchyate',
          meaning: 'Action that is ordained, done without attachment, without like or dislike, without desire for reward — that is called sattvic.',
          source: 'Bhagavad Gita 18.23 (tr. Swami Sivananda)'
        },
        storyText: 'The eighteenth chapter applies the strands to work itself. The same email can be written three ways:',
        bullets: [
          '**Sattvic** — clear, needed, sent without drama.',
          '**Rajasic** — fired off to win, wound, or impress, then refreshed every minute for a reply.',
          '**Tamasic** — avoided for a week, then dashed off carelessly at midnight.'
        ],
        teachingText: 'Same task, three actors, three karmic residues. The Gita extends this to the doer, the understanding, even the happiness each strand produces: rajasic happiness is "nectar at first, poison in the end," and sattvic happiness "poison at first, nectar in the end" — the discipline that tastes bitter on day one and sweet in year one.\n\nBefore your next significant act, take one breath and ask **which of the three actors is about to do it**. The act may not change; the doer can. That single breath of self-location — am I clear, burning, or foggy right now? — is the most portable practice this teaching offers.',
        citationLink: 'gita:18',
        citation: 'Bhagavad Gita 18.23–28, 18.36–39 (tr. Swami Sivananda).',
        checks: [
          {
            id: 'chk:concept:three-gunas:actor',
            kind: 'mcq',
            prompt: 'Before a significant act, what is the one portable practice this teaching offers?',
            options: [
              {
                text: 'Take a breath and ask which of the three actors is about to do it — am I clear, burning, or foggy right now?',
                correct: true,
              },
              { text: 'Force yourself to feel calm before starting' },
              { text: 'Wait until the mood passes on its own' },
            ],
            why: 'The act may not change; the doer can. That single breath of self-location is the practice.',
          },
        ],
      },
      {
        id: 'gunas-way-2',
        kind: 'waypoint',
        title: '5 of 6 banked',
        learnIndex: 5,
        storyText:
          'Same task, three actors, three residues. One idea remains, and it is the freedom no strand can bind.',
      },
      {
        id: 'gunas-beyond',
        title: 'Beyond the Weather',
        subtitle: 'The Sky That Holds All Three',
        takeaway:
          'Beyond the weather is the sky that holds all three. Freedom is not good weather; it is no longer arguing with any of it.',
        keyVerse: {
          sanskrit: 'मां च योऽव्यभिचारेण भक्तियोगेन सेवते। स गुणान्समतीत्यैतान् ब्रह्मभूयाय कल्पते॥',
          transliteration: 'māṁ cha yo \'vyabhichāreṇa bhakti-yogena sevate, sa guṇān samatītyaitān brahma-bhūyāya kalpate',
          meaning: 'He who serves Me with unwavering devotion crosses beyond these gunas and is fit to become Brahman.',
          source: 'Bhagavad Gita 14.26 (tr. Swami Sivananda)'
        },
        storyText: 'Arjuna asks the obvious question: what does the person beyond the strands look like?\n\nKrishna\'s portrait is quietly radical: not someone who has only good weather, but someone who **no longer argues with any of it** — "he neither hates the presence of light, activity, or delusion, nor longs for them when absent."\n\nThe strands keep cycling; the watcher stops being spun. And the door beyond, Krishna says, is **devotion**: love aimed past the weather at the sky itself. Cultivate sattva, yes — but hold even sattva lightly, because clear days bind too, with silken threads.',
        teachingText: 'The practice matures in three stages: first, **name the weather**; then, **feed the weather you want**; finally, **rest as the sky**.\n\nOn some ordinary afternoon, watching irritation arise and pass without becoming it, you will taste the third stage — the freedom the whole teaching points to, which no strand can bind because it was never made of thread.',
        citationLink: 'gita:14',
        citation: 'Bhagavad Gita 14.22–26 (tr. Swami Sivananda).'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:14',
        locator: 'Chapter 14 (verses 14.5, 14.6, 14.9, 14.11, 14.17, 14.22–26); Chapter 17 (17.3, 17.8–10); Chapter 18 (18.23)',
        translation: 'Swami Sivananda (public domain)',
      },
    ],
    reflectionQuestions: [
      'Was your mind today mostly clear, restless, or foggy — and what did you feed it?',
      'Audit last year by harvest, not activity: which months left knowledge, which hunger, which fog?',
      'Pick one input tomorrow — a meal, an hour of feed, one conversation. Which strand does it feed?',
    ]
  },
  {
    id: 'bhakti-paths',
    name: 'Bhakti & the Paths of Yoga',
    sanskritName: 'भक्ति योग',
    category: 'spiritual_paths',
    description: 'The way of love — and how the paths of action, knowledge, and devotion braid into one road home',
    detailedExplanation: 'The Gita teaches not one spiritual path but several, suited to different temperaments: karma yoga, the way of selfless action; jnana yoga, the way of discriminating knowledge; dhyana yoga, the way of meditation; and bhakti yoga, the way of love. Its mature teaching is that these are not rival roads but one braided path — action offered with love, knowledge warmed by love, meditation resting in love. Bhakti, defined by the Narada Bhakti Sutras as "supreme love" for the divine, is both a path and the fragrance of every path completed: the Gita\'s final counsel is surrender in love (18.66).',
    etymology: 'Bhakti from the Sanskrit root "bhaj" — to share, to partake, to adore: love that participates in what it loves',
    keyAspects: [
      'Karma yoga: acting without attachment, as offering',
      'Jnana yoga: discerning the real from the passing',
      'Dhyana yoga: steadying the mind in meditation',
      'Bhakti yoga: loving the divine with the whole heart',
      'The paths braid — love is both a road and every road\'s destination'
    ],
    practicalApplications: [
      {
        situation: 'Choosing a practice that fits your temperament',
        application: 'Doers begin with karma yoga, thinkers with study, feelers with devotion, quiet natures with meditation — then let the paths braid',
        benefits: ['A practice you\'ll actually keep', 'No forced mold', 'Natural growth'],
        tips: ['Start where your energy already flows', 'Borrow one element from another path each month']
      },
      {
        situation: 'Devotion in a busy household',
        application: 'Offer the ordinary: cook as offering, name the divine while commuting, keep one small altar moment morning and night',
        benefits: ['Practice without extra hours', 'A warmer home', 'Steady remembrance'],
        tips: ['Gita 9.26: a leaf, a flower, water — sincerity outweighs scale']
      },
      {
        situation: 'Dry spells when love won\'t come',
        application: 'Climb down the Gita\'s ladder (12.8–12): if absorption is too much, practice; if practice fails, work for the divine; if that fails, just release the fruits',
        benefits: ['No shame in dry seasons', 'Always a next rung', 'Resilient practice'],
        tips: ['Dryness is weather, not verdict', 'The ladder goes down as graciously as up']
      }
    ],
    relatedConcepts: ['karma', 'dharma', 'moksha', 'three-gunas'],
    scriptureReferences: [
      {
        id: 'bhakti-gita-9-22',
        text: 'Bhagavad Gita',
        reference: 'Chapter 9, Verse 22',
        quote: 'For those who worship Me alone, thinking of no other, ever united — I carry what they lack and preserve what they have.',
        context: 'Krishna\'s promise to the devoted'
      },
      {
        id: 'bhakti-gita-9-26',
        text: 'Bhagavad Gita',
        reference: 'Chapter 9, Verse 26',
        quote: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or water — that offering of love from the pure-hearted, I accept.',
        context: 'The democratization of worship: sincerity over scale'
      },
      {
        id: 'bhakti-narada-2',
        text: 'Narada Bhakti Sutras',
        reference: 'Sutra 2',
        quote: 'sā tv asmin parama-prema-rūpā — It (bhakti) is of the form of supreme love for Him.',
        context: 'The classical definition of devotion'
      },
      {
        id: 'bhakti-gita-18-66',
        text: 'Bhagavad Gita',
        reference: 'Chapter 18, Verse 66',
        quote: 'Abandon all duties and take refuge in Me alone; I will liberate you from all sins — do not grieve.',
        context: 'The Gita\'s final verse of teaching: surrender in love'
      }
    ],
    modernRelevance: 'In an age that treats spirituality as self-optimization, bhakti reframes it as relationship: practice not to improve yourself but because you love something greater — which, paradoxically, transforms the self more deeply than any program.',
    commonMisunderstandings: [
      'That bhakti is for the uneducated while jnana is for the wise — the Gita ranks single-minded love as the way even the cosmic form is truly known (11.54)',
      'That the paths compete — the Gita braids them: act with love, know with love, sit with love',
      'That devotion means emotionalism — the Sutras call bhakti supreme love, which includes steadiness, service, and discipline'
    ],
    examples: [
      {
        id: 'bhakti-four-temperaments',
        title: 'Four Friends, One Mountain',
        scenario: 'Four friends climb the same mountain: one builds the trail as she goes (karma), one studies the map (jnana), one walks in silence (dhyana), one sings the whole way up (bhakti).',
        explanation: 'All four summit. The Gita\'s genius is recognizing that temperament chooses the trail, and love completes every trail.',
        lesson: 'Choose the path that matches your nature — then let it braid with the others.'
      }
    ],
    meditation: {
      technique: 'Offering meditation',
      duration: '15 minutes',
      instructions: [
        'Sit before an image, flame, or simply the felt sense of the sacred',
        'Offer, one by one: the day\'s work, a worry, a joy, a person you love — placing each in larger hands',
        'Close with the leaf-flower-fruit-water verse (9.26): offer something tiny, completely'
      ],
      benefits: ['Softened grip on outcomes', 'Warmth in practice', 'A relationship, not a regimen'],
      audioUrl: '/audio/meditations/offering.mp3'
    },
    audioGuide: {
      narrator: 'Bhakti Wisdom',
      duration: '25 minutes',
      audioUrl: '/audio/guides/bhakti-guide.mp3',
      topics: ['The four paths', 'The ladder of 12.8-12', 'Love as the final teaching']
    },
    podcastEpisodes: [],
    images: {
      heroImage: require('../../assets/images/covers/bhakti-paths-cover.png'),
      iconImage: '/images/philosophy/bhakti-icon.jpg'
    },
    difficulty: 'beginner',
    sections: [
      {
        id: 'bhakti-opening',
        title: 'The Way of Love',
        subtitle: 'A Song Rising from the Foot of the Mountain',
        storyText: 'Every tradition must answer a hard question: is the spiritual summit only for spiritual athletes — the ones who can renounce, reason, and meditate for decades?\n\nThe Gita\'s answer transformed India: **no**. There is a path that asks for nothing you don\'t already have, because its only instrument is the heart.\n\n**Bhakti** — from the root **bhaj**, to share, to adore — is the way of love. The Narada Bhakti Sutras, the classical manual of this path, define it in five Sanskrit words: **sā tv asmin parama-prema-rūpā** — "it is of the form of supreme love for Him." Not technique. Not attainment. Love, aimed all the way up.',
        citation: 'Narada Bhakti Sutra 2.'
      },
      {
        id: 'bhakti-four-paths',
        title: 'Four Roads Up One Mountain',
        subtitle: 'Trailhead Signs Pointing to the Same Peak',
        storyText: 'The Gita is a map of several **yogas** — several disciplines of union, one for each human temperament:',
        bullets: [
          '**Karma yoga** — for the doer, whose temple is work offered without clinging.',
          '**Jnana yoga** — for the thinker, who discriminates the eternal from the passing until only the real remains.',
          '**Dhyana yoga** — for the quiet one, who stills the restless mind "as a lamp in a windless place."',
          '**Bhakti yoga** — for the lover, who simply cannot stop adoring.'
        ],
        teachingText: 'The tradition\'s honesty here is remarkable — it looked at human beings, saw four temperaments, and refused to force one mold on all. The question is not "which path is highest?" but **"which trailhead is nearest to where you already stand?"**\n\nIdentify your native trailhead honestly. When life is hardest, do you cope by doing, understanding, quieting, or loving? That reflex is your yoga. Start there — a practice aligned with temperament survives; a borrowed one impresses for a month and dies.',
        citationLink: 'gita:6',
        citation: 'Lamp image: Bhagavad Gita 6.19 (tr. Swami Sivananda).'
      },
      {
        id: 'bhakti-carried',
        title: 'The Promise of Being Carried',
        subtitle: 'Strong Hands Beneath a Tired Traveler',
        keyVerse: {
          sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
          transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate, teṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmy aham',
          meaning: 'For those who worship Me alone, thinking of no other, ever united — I secure what they lack and preserve what they have.',
          source: 'Bhagavad Gita 9.22 (tr. Swami Sivananda)'
        },
        storyText: 'Nine chapters into the Gita, Krishna makes the promise on which the whole devotional tradition stands: **yoga-kshemam vahamy aham** — "I carry their acquisition and their security."\n\nEvery other path leaves the seeker holding the project of themselves. Bhakti alone transfers the luggage.\n\nGenerations of India\'s householders — farmers, mothers, clerks with no leisure for philosophy — have run their lives on this verse: do your part with love, and what you cannot manage is managed. It is not a license for passivity; it is **the end of carrying everything alone**.',
        teachingText: 'Make the experiment the verse invites: pick one worry you have white-knuckled for months, do your honest part today, and each time the mind reaches to re-grip it, say inwardly: **carried**.\n\nThe devotional claim is not that problems vanish but that the aloneness inside them does.'
      },
      {
        id: 'bhakti-leaf',
        title: 'A Leaf, a Flower, a Fruit, Some Water',
        subtitle: 'Small Offerings on an Open Palm',
        keyVerse: {
          sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति। तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥',
          transliteration: 'patraṁ puṣhpaṁ phalaṁ toyaṁ yo me bhaktyā prayachchhati, tad ahaṁ bhakty-upahṛitam aśhnāmi prayatātmanaḥ',
          meaning: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or water — that offering of love from the pure-hearted, I accept.',
          source: 'Bhagavad Gita 9.26 (tr. Swami Sivananda)'
        },
        storyText: 'With this verse the Gita quietly overthrew religious economics.\n\nIn a world of costly sacrifices and priestly gatekeeping, Krishna names a complete offering: **a leaf. A flower. A fruit. Water.** Things the poorest person on earth can find in an hour. The only ingredient that matters — **bhaktya**, with love — cannot be bought at any price.\n\nThe tradition\'s stories delight in this inversion: Krishna choosing the widow Shabari\'s tasted berries over royal feasts, Vidura\'s simple greens over Duryodhana\'s banquet. The size of the gift measures the giver\'s wealth; the love in it measures the gift.',
        teachingText: 'Whatever your practice, this verse keeps it honest and possible. No time, no money, no Sanskrit? **A glass of water placed with full attention is a complete act of worship.**\n\nDo one leaf-sized offering daily — food cooked with love, a task done as gift — and watch how the smallness of the vessel stops mattering.'
      },
      {
        id: 'bhakti-ladder',
        title: 'The Ladder That Reaches All the Way Down',
        subtitle: 'Rungs Descending into Reach',
        storyText: 'The twelfth chapter contains the Gita\'s gentlest engineering: **a ladder for those who cannot do the highest thing.**\n\nFix your mind wholly on Me, Krishna begins — and immediately anticipates the honest reply: I can\'t. Then he descends, rung by rung:',
        bullets: [
          'Can\'t fix the mind? **Practice** remembering, forgetting, and remembering again.',
          'Can\'t sustain the practice? **Work for Me** — let your hands do what your mind cannot hold.',
          'Even that too much? **Do your own work and release the fruits.**'
        ],
        teachingText: 'Every rung is honored; no one is turned away for starting low. And the chapter ends with love\'s portrait: the devotee "from whom the world feels no fear" — friendly, compassionate, free of possessiveness — beloved not for feats but for gentleness.\n\nIn dry seasons, **climb down with dignity** instead of quitting in shame. Can\'t feel devotion? Practice remembering. Can\'t practice? Offer your work. Can\'t offer? Just release one outcome today. The ladder\'s lowest rung is available on your worst day, and it is still the path.',
        citationLink: 'gita:12',
        citation: 'Bhagavad Gita 12.8–12, 12.13–15 (tr. Swami Sivananda).'
      },
      {
        id: 'bhakti-braid',
        title: 'Where All the Paths Braid',
        subtitle: 'Three Streams Becoming One River',
        keyVerse: {
          sanskrit: 'भक्त्या त्वनन्यया शक्यमहमेवंविधोऽर्जुन। ज्ञातुं द्रष्टुं च तत्त्वेन प्रवेष्टुं च परंतप॥',
          transliteration: 'bhaktyā tv ananyayā śhakyam aham evaṁ-vidho \'rjuna, jñātuṁ draṣhṭuṁ cha tattvena praveṣhṭuṁ cha parantapa',
          meaning: 'But by single-minded devotion I can be known, seen, and in truth entered into, O Arjuna.',
          source: 'Bhagavad Gita 11.54 (tr. Swami Sivananda)'
        },
        storyText: 'After granting Arjuna the overwhelming vision of the cosmic form — the vision philosophy strains toward — Krishna reveals what actually opened the door: not austerity, not study, not sacrifice, "but by single-minded devotion I can be known."\n\nThe paths, walked far enough, **braid**. Karma yoga matures when action becomes offering — which is love. Jnana matures when the knower falls silent before what is known — which is love. Meditation matures when stillness becomes presence with the beloved — which is love.\n\nAnd the Gita\'s very last teaching verse hands Arjuna the braided rope: "Abandon all dharmas and take refuge in Me alone... do not grieve."',
        teachingText: 'Wherever you started — doing, thinking, sitting — notice love quietly becoming the point. The task done for its own sake starts feeling like a gift to someone.\n\nThat shift is not a distraction from your path; **it is your path ripening**. Follow the warmth. Every road on the map was always a road home.',
        citationLink: 'gita:18',
        citation: 'Bhagavad Gita 18.66 (tr. Swami Sivananda).'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:9',
        locator: 'Verses 9.22, 9.26, 11.54, 12.8–12, 12.13–19, 18.66; path chapters 2–6 (karma/jnana/dhyana)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Narada Bhakti Sutras',
        locator: 'Sutras 1–2 (bhakti defined as parama-prema, supreme love)',
        translation: 'cross-checked against public translations',
        url: 'https://vedabase.net/nbs/2.htm',
      },
    ],
    reflectionQuestions: [
      'When life gets hard, what do you naturally reach for first — action, understanding, stillness, or love?'
    ]
  }
];

// Utility functions
export const getPhilosophyByCategory = (category: string): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.category === category);
};

export const getPhilosophyById = (id: string): PhilosophicalConcept | undefined => {
  return philosophyData.find(concept => concept.id === id);
};

export const getBeginnerConcepts = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.difficulty === 'beginner');
};

export const getIntermediateConcepts = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.difficulty === 'intermediate');
};

export const getAdvancedConcepts = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.difficulty === 'advanced');
};

export const getCoreConceptsData = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.category === 'core_concepts');
};

export const getEthicalValuesData = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.category === 'ethical_values');
};

export const getSpiritualPathsData = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.category === 'spiritual_paths');
};

export const getLifePrinciplesData = (): PhilosophicalConcept[] => {
  return philosophyData.filter(concept => concept.category === 'life_principles');
};

export default philosophyData;