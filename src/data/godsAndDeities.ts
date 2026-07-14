// Gods and Deities Data for Dharma App
// Comprehensive collection of Hindu deities with mythology, teachings, and cultural significance

import { NarrativeSection, SourceNote } from './narrativeTypes';

export interface Deity {
  id: string;
  name: string;
  sanskritName: string;
  titles: string[]; // Various names/epithets
  category: 'major' | 'avatars' | 'goddesses' | 'celestial' | 'regional';
  description: string;
  mythology: string; // Rich story background
  attributes: string[]; // Key characteristics
  symbols: string[]; // Associated symbols/objects
  mantras: Mantra[];
  prayers: Prayer[];
  iconography: Iconography;
  teachings: string[]; // Core teachings/lessons
  festivals: string[]; // Festival IDs associated with this deity
  scriptureReferences: ScriptureReference[];
  stories: Story[];
  worship: WorshipDetails;
  audioUrl?: string; // Pronunciation guide
  podcastEpisodes: PodcastEpisode[];
  significance: string;
  modernRelevance: string;
  familyConnections: FamilyConnection[]; // Relationships with other deities
  regionalVariations: RegionalVariation[];
  images: {
    heroImage: string | number; // remote path or require()'d bundled asset
    iconImage: string;
    galleryImages: string[];
  };
  // Narrative reading experience (Gita-style sections) — seed content only
  sections?: NarrativeSection[];
  // Primary texts the content was verified against (rendered as a footer card)
  sources?: SourceNote[];
  // Reflection questions: one plain, concrete question (two only when the
  // content genuinely has two distinct hooks) — answerable from daily life
  reflectionQuestions?: string[];
}

export interface Mantra {
  id: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  purpose: string; // When to chant this mantra
  benefits: string[];
  audioUrl?: string;
}

export interface Prayer {
  id: string;
  name: string;
  text: string;
  language: 'sanskrit' | 'hindi' | 'english';
  occasion: string;
  benefits: string[];
}

export interface Iconography {
  appearance: string; // Physical description
  clothing: string;
  colors: string[];
  objects: string[]; // Items held/associated
  vehicle: string; // Vahana
  posture: string;
  facesAndArms: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  moralLesson: string;
  category: 'origin' | 'adventure' | 'teaching' | 'miracle';
  relatedScripture?: string;
  audioUrl?: string;
}

export interface WorshipDetails {
  bestTimes: string[];
  offerings: string[];
  rituals: string[];
  fasting: string[];
  pilgrimage: string[];
  dailyPractices: string[];
}

export interface FamilyConnection {
  relationTo: string; // Deity ID
  relationship: string; // Father, consort, avatar, etc.
  description: string;
}

export interface RegionalVariation {
  region: string;
  localName: string;
  uniqueAspects: string[];
  localTraditions: string[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  topics: string[];
}

export interface ScriptureReference {
  id: string;
  text: 'bhagavad_gita' | 'ramayana' | 'mahabharata' | 'puranas' | 'vedas' | 'upanishads';
  chapter?: number;
  verse?: number;
  section?: string;
  relevance: string;
  quote?: string;
}

// Major Hindu Deities Data
export const deitiesData: Deity[] = [
  {
    id: 'krishna',
    name: 'Krishna',
    sanskritName: 'कृष्ण',
    titles: ['Govinda', 'Gopala', 'Madhava', 'Vasudeva', 'Yadunandana', 'Murari'],
    category: 'major',
    description: 'Divine teacher and eighth avatar of Vishnu',
    mythology: 'Krishna, born in Mathura to Devaki and Vasudeva, was raised by foster parents Nanda and Yashoda in Vrindavan. His childhood was filled with divine miracles - from lifting the Govardhan hill to protect villagers from Indra\'s wrath, to his enchanting flute playing that captivated all living beings. As a youth, he performed the Raas Lila with the gopis, symbolizing the soul\'s longing for the divine. Later, as a prince and warrior, he served as Arjuna\'s charioteer in the Kurukshetra war, delivering the profound teachings of the Bhagavad Gita that form the philosophical foundation of Hindu thought.',
    attributes: ['Divine Love', 'Wisdom', 'Protection', 'Joy', 'Compassion', 'Righteousness'],
    symbols: ['Flute', 'Peacock Feather', 'Discus (Sudarshan Chakra)', 'Conch Shell', 'Lotus', 'Cow'],
    mantras: [
      {
        id: 'krishna-main-mantra',
        sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
        transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare',
        meaning: 'O Lord Krishna, O Lord Rama, please engage me in your service',
        purpose: 'For spiritual purification and divine connection',
        benefits: ['Mental peace', 'Spiritual awakening', 'Protection from negativity', 'Divine love'],
        audioUrl: '/audio/mantras/hare-krishna.mp3'
      },
      {
        id: 'krishna-gayatri',
        sanskrit: 'ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि। तन्नो कृष्ण प्रचोदयात्॥',
        transliteration: 'Om Devakinandanaya Vidmahe Vasudevaya Dhimahi, Tanno Krishna Prachodayat',
        meaning: 'We meditate on the son of Devaki, we focus on Vasudeva, may Krishna inspire and guide us',
        purpose: 'For wisdom and spiritual guidance',
        benefits: ['Enhanced wisdom', 'Divine guidance', 'Spiritual strength', 'Clarity of thought']
      }
    ],
    prayers: [
      {
        id: 'krishna-morning-prayer',
        name: 'Morning Invocation to Krishna',
        text: 'O Krishna, dark-complexioned one, dressed in yellow silk, with lotus eyes and peacock feather crown, destroyer of sins, protector of devotees, grant me your divine love and guidance throughout this day.',
        language: 'english',
        occasion: 'Daily morning worship',
        benefits: ['Divine protection', 'Spiritual strength', 'Inner joy']
      }
    ],
    iconography: {
      appearance: 'Dark blue or black complexioned, eternally youthful, enchantingly beautiful',
      clothing: 'Yellow or saffron dhoti, ornate jewelry',
      colors: ['Dark Blue', 'Yellow', 'Saffron'],
      objects: ['Flute', 'Sudarshan Chakra', 'Conch Shell'],
      vehicle: 'Garuda (sometimes shown)',
      posture: 'Often standing in tribhanga (three-curve pose) while playing flute',
      facesAndArms: 'One face, two arms (sometimes shown with multiple arms in divine form)'
    },
    teachings: [
      'Perform your duty without attachment to results (Nishkama Karma)',
      'Surrender to the divine will while taking action',
      'Love and devotion (Bhakti) are the highest paths to realization',
      'The soul is eternal and beyond birth and death',
      'See the divine in all beings and treat all equally',
      'Balance material responsibilities with spiritual growth'
    ],
    festivals: ['janmashtami-2025', 'holi-2025', 'govardhan-puja-2025'],
    scriptureReferences: [
      {
        id: 'bg-krishna-1',
        text: 'bhagavad_gita',
        chapter: 4,
        verse: 7,
        relevance: 'Krishna explains his divine incarnation',
        quote: 'Whenever dharma declines and adharma increases, I manifest myself'
      },
      {
        id: 'krishna-mahabharata',
        text: 'mahabharata',
        section: 'Udyoga Parva',
        relevance: 'Krishna as peace ambassador',
        quote: 'Peace is the highest virtue, peace is the highest tapas'
      }
    ],
    stories: [
      {
        id: 'govardhan-lift',
        title: 'Lifting Govardhan Hill',
        content: 'When the villagers of Vrindavan, at young Krishna\'s urging, redirected their annual offering from Indra, the storm-king, to Govardhan hill itself — the land that actually fed their cows — Indra answered with seven days of annihilating rain. Krishna lifted the entire hill on the little finger of his left hand and held it, a stone umbrella over every villager, calf, and bird of Vrindavan, until Indra\'s pride broke before his clouds did. The proud god descended and begged forgiveness of the boy.',
        moralLesson: 'Honor what actually sustains you rather than what merely demands tribute — and true protection shelters everyone under one roof, without asking who deserves it.',
        category: 'miracle',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapters 24–25'
      },
      {
        id: 'krishna-mouthful-of-universe',
        title: 'The Universe in His Mouth',
        content: 'The village boys came complaining to Yashoda: your son has been eating dirt. Krishna denied it with a toddler\'s wounded innocence, and Yashoda, unconvinced, commanded him: open your mouth. He did. And inside the small muddy mouth she saw the whole of it — the wheeling galaxies, the oceans, the mountains, time itself, Vrindavan, herself standing there looking into the mouth of her son who contained her. For one unbearable moment the cowherd mother saw everything. Then Krishna, out of kindness, spread his maya of mother-love over her again, and she forgot — and picked him up, and worried only whether he was hungry.',
        moralLesson: 'The infinite hides inside the ordinary things we scold and feed and put to bed. And forgetting can be a mercy: love needs someone to hold, not everything to comprehend.',
        category: 'miracle',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapter 8'
      },
      {
        id: 'krishna-kaliya',
        title: 'Dancing on the Serpent',
        content: 'The serpent Kaliya had poisoned the Yamuna\'s deepest pool; trees on its banks died, birds fell from the air above it. Krishna dove in. Dragged under, wrapped in coils, the boy expanded until the serpent\'s grip broke — and then, rather than kill him, Krishna rose onto Kaliya\'s many hoods and danced. Each time a hood rose in defiance, his foot found it in rhythm, until the serpent, exhausted, understood, and his wives rose from the water to sing to the dancer. Krishna spared him, and sent him where his poison could harm no one.',
        moralLesson: 'What poisons your waters must be confronted — but the goal is the poison\'s end, not the poisoner\'s destruction. Grace defeats venom by dancing on it, not by becoming it.',
        category: 'adventure',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapter 16'
      }
    ],
    worship: {
      bestTimes: ['Early morning (Brahma Muhurta)', 'Sunset', 'Midnight (birth time)'],
      offerings: ['Butter', 'Milk', 'Tulsi leaves', 'Yellow flowers', 'Sweets', 'Fruits'],
      rituals: ['Aarti', 'Bhajan singing', 'Flute playing', 'Reading Bhagavad Gita'],
      fasting: ['Ekadashi', 'Janmashtami', 'Mondays'],
      pilgrimage: ['Vrindavan', 'Mathura', 'Dwarka', 'Kurukshetra'],
      dailyPractices: ['Chanting Hare Krishna mantra', 'Reading Gita verses', 'Offering food before eating']
    },
    audioUrl: '/audio/pronunciation/krishna.mp3',
    podcastEpisodes: [
      {
        id: 'krishna-ep-1',
        title: 'Understanding Krishna: The Divine Cowherd',
        description: 'Exploring the childhood stories of Krishna and their spiritual significance',
        duration: '45 minutes',
        audioUrl: '/podcasts/krishna-childhood.mp3',
        topics: ['Vrindavan life', 'Miracles', 'Divine play', 'Spiritual lessons']
      }
    ],
    significance: 'Krishna represents the perfect balance of divine transcendence and human relatability, teaching us how to live spiritually while fulfilling worldly duties',
    modernRelevance: 'In our complex modern world, Krishna\'s teachings on duty, ethics, and spiritual living provide practical guidance for navigating career, relationships, and personal growth while maintaining inner peace and purpose',
    familyConnections: [
      {
        relationTo: 'vishnu',
        relationship: 'Avatar',
        description: 'Krishna is considered the eighth and most complete avatar of Vishnu'
      },
      {
        relationTo: 'radha',
        relationship: 'Divine Consort',
        description: 'Radha represents the soul\'s devotion to Krishna, the supreme divine'
      }
    ],
    regionalVariations: [
      {
        region: 'Bengal',
        localName: 'Kanha',
        uniqueAspects: ['Focus on childhood stories', 'Radha-Krishna devotion'],
        localTraditions: ['Jhulan Yatra', 'Kirtan', 'Raas festival']
      },
      {
        region: 'Gujarat',
        localName: 'Ranchhod',
        uniqueAspects: ['Dwarkadhish form', 'Royal aspect'],
        localTraditions: ['Janmashtami celebrations', 'Govardhan Puja', 'Annakut']
      }
    ],
    images: {
      heroImage: require('../../assets/images/covers/krishna-cover.jpg'),
      iconImage: '/images/deities/krishna-icon.jpg',
      galleryImages: [
        '/images/deities/krishna-flute.jpg',
        '/images/deities/krishna-govardhan.jpg',
        '/images/deities/krishna-gita.jpg'
      ]
    },
    sections: [
      {
        id: 'krishna-whole-divine',
        title: 'The God Who Is Everything at Once',
        subtitle: 'A Flute, a Chariot, a Mountain, a Mouthful of Stars',
        storyText: 'Every deity in the tradition carries an aspect of the divine; Krishna\'s devotees make a bolder claim — that in him **the whole of it came at once**.\n\nHe is the butter thief and the speaker of the Gita, the flute player of Vrindavan and the strategist of Kurukshetra, the child in Yashoda\'s lap and — when she looked into his mouth — the container of Yashoda, Vrindavan, and every galaxy.\n\nThe **Bhagavata Purana**\'s tenth canto, the most beloved book in devotional Hinduism, insists on holding all of these together: the point of Krishna is that **the absolute is also adorable, and the adorable is also absolute**.',
        teachingText: 'Krishna\'s completeness is a teaching about your own life: the sacred does not wait for your solemn moments.\n\nIt is as present in play, mischief, music, and love as in scripture and battle-duty. A spirituality with room for the flute as well as the sermon is the one this god embodies.',
        citation: 'Bhagavata Purana, Canto 10 (the vision in the child\'s mouth: Chapter 8).'
      },
      {
        id: 'krishna-prison-to-pasture',
        title: 'Born in a Prison, Raised in a Pasture',
        subtitle: 'A Basket Crossing the Yamuna at Midnight',
        storyText: 'His story begins where Janmashtami\'s does: the tyrant Kamsa, the prophecy, the prison birth at midnight, the locks opening, and Vasudeva carrying the child across the flooding Yamuna to safety in Gokul.\n\nWhat the tradition savors is the sequel: the rescued god grew up not in a palace preparing his revenge, but in a cowherd village — **barefoot, butter-smeared, beloved**.\n\nThe divine chose ordinary rural childhood: churning, herding, flooding rivers, village festivals. Every dusty detail of common life was good enough for God to live in.',
        teachingText: 'Krishna\'s pastoral years dignify every unglamorous stretch of a life.\n\nIf the divine spent years herding cows and stealing butter before speaking the Gita, then your own ordinary seasons — the commutes, the childcare, the unremarkable years — are not the waiting room of your real life. **They may be the part heaven remembers most fondly.**',
        citationLink: 'festival:janmashtami-2025',
        citation: 'Bhagavata Purana, Canto 10, Chapters 1–4 (the birth), 5–10 (Gokul).'
      },
      {
        id: 'krishna-butter-and-love',
        title: 'The Thief Who Steals Only from Those Who Love Him',
        subtitle: 'A Toppled Pot, White Footprints Leading Away',
        storyText: 'The butter theft is the tradition\'s most cherished paradox: **the Lord of the universe, sneaking**.\n\nThe gopis of Vrindavan hung their butter pots higher, and he built pyramids of friends; they locked the doors, and he was inside anyway; they marched to Yashoda to complain, and stood there hoping he\'d raid their kitchens next.\n\nThe Bhagavata\'s poets understood exactly what they were doing: **butter is the heart\'s sweetness**, churned from a whole life, and Krishna steals only what is already his — and only from homes that love him. Where there is no love, he does not even trespass.',
        teachingText: 'The butter thief inverts the whole economy of worship: the divine is not fed by your offerings — it is hungry for **your love specifically**, and delights in taking it playfully rather than receiving it formally.\n\nPrayer, in Vrindavan\'s dialect, is leaving the window unlatched.',
        citation: 'Butter-thief episodes: Bhagavata Purana, Canto 10, Chapters 8–9.'
      },
      {
        id: 'krishna-flute',
        title: 'The Sound That Calls Everyone Home',
        subtitle: 'A Bamboo Flute at Dusk, Cows Turning Their Heads',
        storyText: 'Of all Krishna\'s emblems, the tradition loves the **flute** most.\n\nAt dusk in Vrindavan he would play, and the Bhagavata describes the whole world leaning toward the sound — cows lifting their heads, rivers slowing, the gopis leaving whatever was in their hands.\n\nThe saints read the symbol lovingly: **a flute is a reed emptied of itself** — hollowed, holed, and only therefore musical. Whoever becomes empty enough, the divine breath plays through.',
        teachingText: 'The flute asks the question all contemplatives eventually face: **what fills you that the music cannot pass through?**\n\nThe ego\'s knots are the reed\'s blockages. The practices — reflection, offering, remembrance — are the slow hollowing. And the promise is Vrindavan\'s: emptied, a life doesn\'t become vacant. It becomes the instrument.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 21 (the Venu Gita).'
      },
      {
        id: 'krishna-charioteer',
        title: 'The God Who Took the Reins',
        subtitle: 'Two Armies Waiting, a Conversation Beginning',
        keyVerse: {
          sanskrit: 'ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति। भ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया॥',
          transliteration: 'īśhvaraḥ sarva-bhūtānāṁ hṛid-deśhe \'rjuna tiṣhṭhati, bhrāmayan sarva-bhūtāni yantrārūḍhāni māyayā',
          meaning: 'The Lord dwells in the hearts of all beings, O Arjuna, causing all beings to revolve by His power, as if mounted on a machine.',
          source: 'Bhagavad Gita 18.61 (tr. Swami Sivananda)'
        },
        storyText: 'When the great war came, Krishna made a choice that defines him: offered the pick between his armies and himself unarmed, the wise took the unarmed god.\n\nHe drove Arjuna\'s chariot — held the reins, took no weapon, and in the field between two armies delivered the **Bhagavad Gita**.\n\nThe arrangement is the theology: the divine does not fight your battle for you, and does not abandon you to it. It sits at the front of your chariot, holding the horses, speaking truth exactly when despair strikes — and near the end tells you where it has been all along: **in the heart, of everyone, always**.',
        teachingText: 'Whatever battlefield you are facing, Krishna\'s position is the promise: not a substitute who fights instead of you, not a spectator — **a charioteer**. Guidance at the reins, the fighting still yours.\n\nThe Gita is what the charioteer says. This whole app, in a sense, is an attempt to keep that voice within reach of your chariot.'
      }
    ],
    sources: [
      {
        text: 'Bhagavata Purana (Srimad Bhagavatam)',
        locator: 'Canto 10 — Chapters 1–4 (birth), 8 (universe in his mouth), 16 (Kaliya), 21 (the flute), 24–25 (Govardhan)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
        url: 'https://vedabase.io/en/library/sb/10/8/',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:18',
        locator: '18.61 (the Lord in all hearts); the Gita entire as Krishna\'s teaching at Kurukshetra',
        translation: 'Swami Sivananda (public domain)',
      },
    ],
    reflectionQuestions: [
      'Krishna spent years on ordinary village chores before speaking the Gita. What ordinary part of your day deserves more care?'
    ]
  },
  {
    id: 'rama',
    name: 'Rama',
    sanskritName: 'राम',
    titles: ['Maryada Purushottama', 'Raghunandan', 'Raghupati', 'Sita Ram'],
    category: 'major',
    description: 'Seventh avatar of Vishnu embodying perfect dharma',
    mythology: 'Prince Rama of Ayodhya, born to King Dasharatha and Queen Kausalya, lived the perfect life of dharma. His story, told in the epic Ramayana, includes his exile for 14 years, the abduction of his wife Sita by the demon king Ravana, the alliance with Hanuman and the vanaras (monkeys), the great battle in Lanka, and Sita\'s rescue. Rama\'s life exemplifies the highest ideals of kingship, husband, and human behavior, earning him the title "Maryada Purushottama" - the perfect man who never crossed moral boundaries.',
    attributes: ['Righteousness', 'Honor', 'Duty', 'Compassion', 'Leadership', 'Devotion to Truth'],
    symbols: ['Bow and Arrow', 'Lotus', 'Crown', 'Blue Lotus'],
    mantras: [
      {
        id: 'rama-main-mantra',
        sanskrit: 'श्री राम जय राम जय जय राम',
        transliteration: 'Sri Rama Jaya Rama Jaya Jaya Rama',
        meaning: 'Glory to Lord Rama, Victory to Lord Rama',
        purpose: 'For righteousness and strength in difficult times',
        benefits: ['Inner strength', 'Moral clarity', 'Protection', 'Peace of mind']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Dark complexioned, tall, graceful, eternally youthful',
      clothing: 'Royal attire or simple ascetic clothes during exile',
      colors: ['Green', 'Blue', 'Yellow'],
      objects: ['Bow (Kodanda)', 'Arrows', 'Crown'],
      vehicle: 'Usually on foot or chariot',
      posture: 'Standing with bow, often with Sita, Lakshmana, and Hanuman',
      facesAndArms: 'One face, two arms'
    },
    teachings: [
      'Dharma must be upheld even at personal cost',
      'Truth and honor are more valuable than life itself',
      'A leader must sacrifice for their people',
      'Family bonds and loyalty are sacred',
      'Respect and protect women and the innocent',
      'Keep your promises no matter the consequences'
    ],
    festivals: ['dussehra-2025', 'rama-navami-2025'],
    scriptureReferences: [
      {
        id: 'ramayana-rama-1',
        text: 'ramayana',
        section: 'Ayodhya Kanda',
        relevance: 'Rama accepts exile for dharma',
        quote: 'I will gladly go to the forest to honor my father\'s word'
      }
    ],
    stories: [
      {
        id: 'rama-exile',
        title: 'Accepting Exile with Grace',
        content: 'On the eve of his coronation, Rama learned that his father\'s old promise to Queen Kaikeyi had been called in: fourteen years of forest exile for him, the throne for his brother Bharata. The court wept; the city wept; his father collapsed. Rama\'s face, the Valmiki Ramayana insists, did not change. He unbuckled the royal ornaments as calmly as he had put them on, touched his father\'s feet, comforted the very queen who had ruined him, and walked out of Ayodhya the same man who was to have ruled it that morning. His crown was never the source of his stature.',
        moralLesson: 'Character is what remains when position is stripped away. The one who is the same person crowned or exiled has something no decree can revoke.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Ayodhya Kanda'
      },
      {
        id: 'rama-bharata-sandals',
        title: 'The Sandals on the Throne',
        content: 'Bharata, for whom the throne was seized, wanted none of it. He marched to the forest with the whole court to beg Rama\'s return. Rama refused — the fourteen years were his father\'s word, and his father\'s word did not die with his father. So Bharata asked for Rama\'s sandals, carried them back on his own head, and placed them on the throne of Ayodhya. For fourteen years Bharata ruled from a hut outside the city, as regent to a pair of sandals, refusing the royal umbrella, waiting. Two brothers each refusing a kingdom for the other\'s sake — the tradition ranks this contest of renunciation among its most sacred scenes.',
        moralLesson: 'Power is safest with those who genuinely do not want it. And an institution can be held faithfully in trust — authority as service rendered to something absent — when love, not appetite, sits on the throne.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Ayodhya Kanda (sandals: sargas 112–115 region)'
      },
      {
        id: 'rama-shabari',
        title: 'Shabari\'s Tasted Berries',
        content: 'Searching for the abducted Sita, grief-worn and far from every comfort, Rama came to the ashram of Shabari — an old tribal woman who had waited decades for this visit, told by her departed guru that Rama himself would one day come. She had nothing to offer but wild berries, and she offered them in the only way her love knew: tasting each one first, keeping only the sweet ones for him. By every rule of ritual purity, half-eaten food from a forest woman was unofferable. Rama ate them as the finest meal of his exile, and the tradition never tired of the scene: the prince of dharma, schooled in every scripture, honoring a devotion that broke the rules because it kept the only rule that matters.',
        moralLesson: 'Love\'s etiquette outranks ritual\'s etiquette. What is offered with a whole heart is pure by definition — and the truly great receive it that way.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Aranya Kanda, sarga 74 (and the beloved retellings)'
      }
    ],
    worship: {
      bestTimes: ['Morning', 'Evening', 'Tuesdays'],
      offerings: ['Tulsi leaves', 'Flowers', 'Fruits', 'Simple vegetarian food'],
      rituals: ['Reciting Ramayana', 'Aarti', 'Bhajans'],
      fasting: ['Ram Navami', 'Tuesdays'],
      pilgrimage: ['Ayodhya', 'Rameswaram', 'Chitrakoot', 'Hampi'],
      dailyPractices: ['Chanting Ram naam', 'Reading Ramayana passages']
    },
    audioUrl: '/audio/pronunciation/rama.mp3',
    podcastEpisodes: [],
    significance: 'Rama represents the ideal human being, showing how to live with perfect dharma in all relationships and circumstances',
    modernRelevance: 'Rama\'s example teaches modern leaders about integrity, sacrifice for the greater good, and maintaining ethical standards in positions of power',
    familyConnections: [
      {
        relationTo: 'vishnu',
        relationship: 'Avatar',
        description: 'Rama is the seventh avatar of Vishnu'
      },
      {
        relationTo: 'sita',
        relationship: 'Consort',
        description: 'Sita is the incarnation of Lakshmi, Vishnu\'s consort'
      }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/rama-cover.jpg'),
      iconImage: '/images/deities/rama-icon.jpg',
      galleryImages: ['/images/deities/rama-sita.jpg', '/images/deities/rama-court.jpg']
    },
    sections: [
      {
        id: 'rama-ideal',
        title: 'The Man Who Never Broke',
        subtitle: 'A Straight Line Drawn Through a Crooked World',
        storyText: 'Rama\'s title is unique among the gods: **Maryada Purushottama** — the supreme man of boundaries, the one who never once crossed the line of dharma.\n\nWhere Krishna bends rules with a smile, Rama holds them with his life. The Valmiki Ramayana presents him not as a god acting a part but as **a man** — tempted, bereaved, furious, heartbroken — who at every fork chooses the harder right over the easier wrong.\n\nThat is precisely why India gave him its highest reverence: anyone can admire a god\'s perfection; Rama\'s perfection is the kind a human being could bleed for and still choose.',
        teachingText: 'Rama\'s question for your life is the boundary question: **what line would you not cross at any price** — not when it costs a kingdom, not when it costs fourteen years?\n\nA person who has answered it walks differently. The Ramayana is one long demonstration of that walk.',
        citation: 'Valmiki Ramayana (throughout); Maryada Purushottama: traditional epithet.'
      },
      {
        id: 'rama-word',
        title: 'A Father\'s Word, Kept by the Son',
        subtitle: 'Royal Ornaments Set Down Without a Tremor',
        storyText: 'The exile turns on a single principle: **a promise does not expire because keeping it became expensive.**\n\nDasharatha\'s old boon to Kaikeyi was legally his to break and emotionally everyone\'s to excuse — the whole city begged Rama to ignore it. He would not, because the word of the house of Raghu was the house of Raghu: **"Rama does not speak two ways."**\n\nHe kept a promise he never made, at a price he did not owe, to preserve a thing no one could see — and the tradition judged that invisible thing worth more than the visible throne.',
        teachingText: 'Every family and institution runs on invisible collateral: the confidence that its word means something. Each kept promise deposits; each clever escape withdraws.\n\nRama\'s extreme is a compass, not a demand — but ask what your own word is currently worth to the people who hold it, and what one expensive kept promise would do to that account.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda.'
      },
      {
        id: 'rama-exile-years',
        title: 'Fourteen Years of Forest',
        subtitle: 'A Palace Prince Learning the Names of Trees',
        storyText: 'The exile was not an interlude; **it was the making.**\n\nIn the forest, the prince became something Ayodhya could never have taught him: a man acquainted with hardship, with hermits and tribal chiefs, with hunger, with the grief of losing Sita to Ravana\'s deceit.\n\nHis alliances there — **Guha** the boatman, the vulture **Jatayu** who died defending Sita, **Shabari** with her berries, **Hanuman** and the vanaras — were friendships of the excluded, and they, not Ayodhya\'s armies, won the war. When he returned to rule, he ruled as a king who had slept on the ground of his own kingdom.',
        teachingText: 'The forest years reframe every derailment: the demotion, the illness, the season everything was taken away.\n\nRama\'s exile suggests the wilderness is where your future allies are met and your real education happens — and that the ones who return from it rule differently. **What did (or does) your forest teach that the palace never could?**',
        citation: 'Valmiki Ramayana, Aranya Kanda.'
      },
      {
        id: 'rama-bridge',
        title: 'The Bridge and the Squirrel',
        subtitle: 'An Ocean Crossed Stone by Floating Stone',
        storyText: 'To reach Lanka and Sita, an ocean had to be crossed. The army of monkeys and bears built a **bridge of floating stones** — and the tradition\'s favorite worker on it is the smallest: a squirrel, rolling in sand and shaking it between the stones.\n\nWhen the great monkeys laughed, Rama picked the squirrel up and stroked its back — the stripes squirrels carry to this day, says the beloved tale.\n\nThe bridge held. The war was won by an alliance in which **every contribution, from Hanuman\'s mountain-carrying to the squirrel\'s sand, counted as sacred**.',
        teachingText: 'Every great work is a bridge of odd stones — and its Rama is the one who makes the smallest contributor feel stroked on the back, not laughed at.\n\nIn whatever you are building, notice who is carrying sand. **The leader\'s hand on the squirrel is why the army stays an army.**',
        citation: 'Valmiki Ramayana, Yuddha Kanda (the bridge); the squirrel: later devotional tellings (not Valmiki).'
      },
      {
        id: 'rama-name',
        title: 'The Name That Outlived the Man',
        subtitle: 'Two Syllables Carried Across Centuries',
        storyText: 'Rama\'s final gift to India is the smallest: **his name.**\n\n"Ram-nam" became the tradition\'s most portable practice — the greeting of villages, the chant of Kabir\'s weavers and Tulsidas\'s verses, the word Gandhi carried, the sound accompanying millions to the funeral ground: **"Ramanama satya hai."**\n\nThe tradition even claims the name outweighs the man — the stones of the bridge floated, one telling goes, because his name was written on them, while stones Rama threw himself sank. Whatever else is beyond reach on a given day — scripture, temple, teacher — two syllables are not.',
        teachingText: 'The practice is as simple as it sounds and older than any app: **a name, said with attention, as often as remembered** — walking, waiting, worrying.\n\nPick your name for the divine (Rama\'s or another) and let it run under a single ordinary day. That thread, the tradition promises, is strong enough to hold everything else.',
        citation: 'Ram-nam: living tradition (Kabir, Tulsidas, Gandhi); the floating-stones telling: devotional tradition.'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Ayodhya Kanda (exile; Bharata and the sandals, sargas 112–115 region); Aranya Kanda (forest years; Shabari, sarga 74); Yuddha Kanda (the bridge, war, and return)',
        translation: 'valmikiramayan.net (public); the squirrel and floating-name stones are beloved later tradition, labeled as such',
        url: 'https://www.valmikiramayan.net/',
      },
      {
        text: 'Devotional tradition',
        locator: 'Ram-nam practice: Kabir, Tulsidas (Ramcharitmanas), Gandhi — named as tradition, not scripture quotation',
      },
    ],
    reflectionQuestions: [
      'Rama had one line he would never cross. What is one line you won\'t cross, no matter what?'
    ]
  },
  {
    id: 'ganesha',
    name: 'Ganesha',
    sanskritName: 'गणेश',
    titles: ['Ganapati', 'Vinayaka', 'Vighnaharta', 'Lambodara', 'Ekadanta'],
    category: 'major',
    description: 'Elephant-headed remover of obstacles and lord of beginnings',
    mythology: 'Born to Lord Shiva and Goddess Parvati, Ganesha received his elephant head after Shiva, not recognizing his own son who was guarding Parvati\'s bath, beheaded him in anger. To restore life, Shiva replaced the head with that of an elephant. Ganesha became the lord of Shiva\'s ganas (attendants) and the remover of obstacles. His wisdom and diplomatic skills made him the deity invoked before beginning any important task.',
    attributes: ['Wisdom', 'Prosperity', 'Good Fortune', 'Arts and Learning', 'Problem Solving'],
    symbols: ['Elephant Head', 'Large Belly', 'Mouse (Mushika)', 'Modak (sweet)', 'Lotus', 'Axe', 'Rope'],
    mantras: [
      {
        id: 'ganesha-main-mantra',
        sanskrit: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gam Ganapataye Namaha',
        meaning: 'Salutations to Lord Ganesha',
        purpose: 'For removing obstacles and new beginnings (from the Ganapati Atharvashirsha)',
        benefits: ['Obstacle removal', 'Success in ventures', 'Wisdom', 'Good fortune']
      },
      {
        id: 'ganesha-gayatri',
        sanskrit: 'एकदन्ताय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्तिः प्रचोदयात्॥',
        transliteration: 'ekadantāya vidmahe vakratuṇḍāya dhīmahi, tanno dantiḥ pracodayāt',
        meaning: 'May we know the one-tusked lord; may we meditate on the one with the curved trunk; may that tusked one inspire and illumine us',
        purpose: 'The Ganesha Gayatri — for clarity and inspiration in study and work (from the Ganapati Atharvashirsha)',
        benefits: ['Mental clarity', 'Focus in learning', 'Inspiration']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Elephant head on human body, large belly, usually red or pink',
      clothing: 'Dhoti, ornate jewelry',
      colors: ['Red', 'Orange', 'Yellow'],
      objects: ['Modak', 'Axe', 'Rope', 'Lotus'],
      vehicle: 'Mushika (mouse/rat)',
      posture: 'Seated or standing, one hand in blessing pose',
      facesAndArms: 'Elephant face, four arms typically'
    },
    teachings: [
      'Wisdom overcomes all obstacles',
      'Humility despite great power (large form, small vehicle)',
      'Enjoy life\'s sweetness in moderation',
      'Learning and arts are sacred pursuits',
      'Help others overcome their difficulties',
      'Begin everything with prayer and right intention'
    ],
    festivals: ['ganesh-chaturthi-2025'],
    scriptureReferences: [
      {
        id: 'ganesha-purana-1',
        text: 'puranas',
        section: 'Ganesha Purana',
        relevance: 'Origin and glory of Ganesha',
        quote: 'He is the lord of obstacles, both creator and destroyer of impediments'
      }
    ],
    stories: [
      {
        id: 'ganesha-birth',
        title: 'The Boy at the Door',
        content: 'Before her bath, Parvati shaped a boy from the turmeric paste of her own body and breathed life into him — a son entirely her own. She set him at the door with one instruction: let no one enter. When Shiva himself returned to Kailasa, the boy — who had never seen him — barred the way. Words became a standoff, the standoff a battle, and in his fury Shiva severed the boy\'s head with his trident. Parvati\'s grief shook the three worlds, and her condition for their survival was absolute: her son would live again. Shiva\'s attendants were sent north and returned with the head of an elephant, which Shiva joined to the boy\'s body, restoring his life. He then did something greater than repair — he adopted the boy fully, named him Ganesha, lord of his own ganas, and decreed that in every undertaking, this child would be honored first.',
        moralLesson: 'Even a terrible rupture can end in a larger belonging: what began in anger ended with the wounded one honored first among all. Devotion to duty — even a doorkeeper\'s — is never wasted.',
        category: 'origin',
        relatedScripture: 'Shiva Purana, Rudra Samhita, Kumara Khanda, chapters 13–18'
      },
      {
        id: 'ganesha-race',
        title: 'The Race Around the World',
        content: 'When the time came for Ganesha and his brother Kartikeya to marry, a contest was set: whoever first circled the world would wed first. Kartikeya mounted his peacock and streaked across oceans and mountains. Ganesha, astride a mouse, could never win such a race — so he did not run it. He walked slowly around his seated parents, Shiva and Parvati, folded his hands, and declared his circuit complete: "My parents are the whole world." The assembly fell silent, then erupted — the wisdom was undeniable. Ganesha was married first, to Siddhi (attainment) and Buddhi (wisdom), whose names describe exactly what his insight had won.',
        moralLesson: 'Understanding outruns speed. The one who grasps what truly matters finishes first without hurrying — and reverence for those who gave you life is itself a way of holding the whole world.',
        category: 'teaching',
        relatedScripture: 'Shiva Purana, Rudra Samhita, Kumara Khanda, chapters 19–20'
      },
      {
        id: 'ganesha-scribe',
        title: 'The Scribe of the Mahabharata',
        content: 'When the sage Vyasa prepared to compose the Mahabharata — a poem vaster than anything yet attempted — he needed a scribe who could keep pace with his mind. Ganesha agreed, on one condition: Vyasa must dictate without pausing, or Ganesha would stop writing forever. Vyasa accepted — with a counter-condition of his own: Ganesha must fully understand every verse before setting it down. So whenever Vyasa needed to think ahead, he would speak a verse so dense and knotted that even Ganesha had to pause to unravel it, and in those pauses the sage composed on. Between the two conditions — unbroken flow and complete understanding — the world\'s longest epic was written. A beloved tradition adds that when his pen failed mid-verse, Ganesha broke off his own tusk to keep writing rather than break his word.',
        moralLesson: 'Never write — or speak, or act — faster than you understand. And a commitment sincerely made is worth more than the instrument you sacrifice to keep it.',
        category: 'teaching',
        relatedScripture: 'Mahabharata, Adi Parva, Section 1 (K.M. Ganguli translation)'
      }
    ],
    worship: {
      bestTimes: ['Tuesday', 'Wednesday', 'Morning'],
      offerings: ['Modak', 'Red flowers', 'Durva grass', 'Coconut'],
      rituals: ['Aarti', '108 names recitation', 'Modak offering'],
      fasting: ['Ganesh Chaturthi', 'Tuesdays'],
      pilgrimage: ['Ashtavinayak temples', 'Siddhivinayak Mumbai'],
      dailyPractices: ['Om Gam mantra', 'Seeking blessings before important tasks']
    },
    audioUrl: '/audio/pronunciation/ganesha.mp3',
    podcastEpisodes: [],
    significance: 'Ganesha teaches that wisdom, humility, and divine grace can overcome any obstacle in life',
    modernRelevance: 'As patron of education and remover of obstacles, Ganesha is especially relevant for students, entrepreneurs, and anyone facing challenges',
    familyConnections: [
      {
        relationTo: 'shiva',
        relationship: 'Son',
        description: 'Son of Lord Shiva and Goddess Parvati'
      }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/ganesha-cover.jpg'),
      iconImage: '/images/deities/ganesha-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'ganesha-threshold',
        title: 'The God of Thresholds',
        subtitle: 'A Doorway Garlanded with Marigolds',
        storyText: 'Before a Hindu wedding begins, before a shop opens its first ledger, before a child writes the first letter of the alphabet, one name is spoken: **Ganesha**.\n\nHe is **Vighnaharta**, the remover of obstacles, and every threshold belongs to him — doorways, journeys, new ventures, first pages. This custom traces straight back to his origin story, where Shiva decreed that the boy he had wounded and restored would be **worshipped first among all the gods**.\n\nThe teaching hidden in the custom is quietly profound: every beginning carries fear, and the tradition answers fear not with a pep talk but with a companion.',
        teachingText: 'Notice what you do at your own thresholds. Do you rush through beginnings — new jobs, new relationships, new years — or do you pause and consecrate them?\n\nBeginning with prayer, or even a deliberate breath of intention, changes the spirit of everything that follows. That is Ganesha\'s first lesson, and you don\'t need an elephant\'s head to practice it.',
        citation: 'The first-worship decree: Shiva Purana, Rudra Samhita (Kumara Khanda).'
      },
      {
        id: 'ganesha-born-of-devotion',
        title: 'Born at a Door, Remade by Grace',
        subtitle: 'Parvati Shaping a Boy from Turmeric',
        storyText: 'The Shiva Purana tells Ganesha\'s birth without softening it.\n\nParvati creates a son from the turmeric paste of her own body and posts him at her door; Shiva, unrecognized and enraged, beheads the boy; Parvati\'s grief threatens the cosmos; and the child is restored with an elephant\'s head, then **raised higher than he stood before** — first among the ganas, first in every prayer.\n\nIt is a family story of terrible misunderstanding and greater repair, and Hindu tradition placed it at the very front of all worship.',
        teachingText: 'Every family carries a version of this story — the clash that came from not recognizing each other, the wound that seemed unforgivable.\n\nThe Purana\'s answer is not that the wound didn\'t matter, but that **repair can be so complete it transforms the wounded one\'s place in the family**. Where in your life is a beheaded relationship waiting for an elephant\'s head — an imperfect, unlikely, generous repair that restores more than was lost?',
        citationLink: 'festival:ganesh-chaturthi-2025',
        citation: 'Shiva Purana, Rudra Samhita (Kumara Khanda).'
      },
      {
        id: 'ganesha-iconography',
        title: 'Reading the Elephant-Headed Form',
        subtitle: 'Large Ears, Small Eyes, One Tusk',
        storyText: 'Ganesha\'s form is a teaching you can read:',
        bullets: [
          '**The elephant head** — wisdom, memory, and gentleness joined to strength.',
          '**The large ears** — listen more.',
          '**The small eyes** — concentrate; see one thing deeply.',
          '**The trunk** — strong enough to uproot a tree, delicate enough to lift a blade of grass; true skill bends to the task.',
          '**The single tusk** — keep what serves, sacrifice what must be given (he is Ekadanta, the one-tusked).',
          '**The large belly** — digest all of life, sweet and bitter alike.',
          '**The modak in his hand** — the sweetness of the inner life, earned by practice.',
          '**The mouse beneath him** — even the restless, scurrying mind can carry wisdom, once wisdom is seated firmly upon it.'
        ],
        teachingText: 'Pick one feature and live it for a week. Listen like the ears. Focus like the eyes. Adapt like the trunk.\n\n**The murti is not a portrait; it is a curriculum.**',
        citation: 'Standard Puranic iconography; Ekadanta epithet: Ganesha tradition.'
      },
      {
        id: 'ganesha-wisdom-over-speed',
        title: 'Wisdom Outruns the World',
        subtitle: 'A Boy on a Mouse Beating a Peacock',
        storyText: 'In the contest with his brother Kartikeya — who circled the actual globe on a peacock — Ganesha won by **walking around his parents and calling them his world**.\n\nThe story is beloved by children, but its edge is for adults: we spend years racing peacocks, circling the world for validation, while the thing that actually completes us sits quietly at home.\n\nGanesha\'s prize was marriage to **Siddhi and Buddhi** — attainment and wisdom — the Purana\'s way of saying what insight weds you to.',
        teachingText: 'What race are you running right now, and who set its course?\n\nSometimes the dharmic move is not to run faster but to **redefine the circuit** — to walk around what you love and call it enough. Ask yourself Ganesha\'s question before your next sprint: is the finish line I\'m chasing actually the world, or is my world somewhere I stopped looking?',
        citation: 'The contest: Shiva Purana and Ganesha Purana tellings.'
      },
      {
        id: 'ganesha-patron-of-learning',
        title: 'Patron of the First Page',
        subtitle: 'A Broken Tusk Held Like a Pen',
        storyText: 'It is fitting that the Mahabharata — the epic that contains the Bhagavad Gita — begins with **Ganesha holding the pen**.\n\nHis two conditions with Vyasa carry his whole philosophy of learning: **never stop the flow**, and **never write faster than you understand**.\n\nStudents across India still invoke him before study, and writers before a blank page, because both know the twin dangers he guards against — abandoning the work, and doing it mindlessly.',
        teachingText: 'Bring his two conditions to whatever you are learning now. Flow: touch the work daily, even briefly, without breaking the chain. Understanding: never let your output — notes, opinions, replies — outrun your comprehension.\n\nAnd when your instrument fails mid-verse, remember the tusk: **the tools are replaceable; the commitment is not.**',
        citation: 'The scribe tradition: Mahabharata, Adi Parva (in some recensions).'
      }
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Rudra Samhita, Kumara Khanda, chapters 13–20 (birth, restoration, and marriage of Ganesha)',
        translation: 'J.L. Shastri, Motilal Banarsidass / wisdomlib.org',
        url: 'https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226120.html',
      },
      {
        text: 'Mahabharata',
        locator: 'Adi Parva, Section 1 (Ganesha as Vyasa\'s scribe)',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Ganapati Atharvashirsha (Ganapati Upanishad)',
        locator: 'Om Gam Ganapataye mantra; Ganesha Gayatri',
        translation: 'traditional text',
      },
    ],
    reflectionQuestions: [
      'What are you starting right now, and what would a good, unhurried beginning look like?'
    ]
  },
  {
    id: 'shiva',
    name: 'Shiva',
    sanskritName: 'शिव',
    titles: ['Mahadeva', 'Neelakantha', 'Nataraja', 'Bholenath', 'Shankara'],
    category: 'major',
    description: 'The auspicious one — destroyer of what must end, lord of meditation and transformation',
    mythology: 'Shiva is the great paradox of the Hindu imagination: the ascetic who sits in unbroken meditation on Mount Kailasa and the householder devoted to Parvati and their sons; the destroyer whose destruction clears the ground for every new beginning; the wild dancer whose steps keep the cosmos in rhythm. He drank the world\'s poison to save it, carries the Ganga\'s crushing descent in his hair, and answers the simplest sincere offering — a leaf, a little water — faster than any elaborate rite. In him the tradition holds together everything it knows about endings: that they are terrifying, necessary, and in the deepest sense compassionate.',
    attributes: ['Meditation', 'Transformation', 'Detachment', 'Compassion', 'Cosmic rhythm'],
    symbols: ['Trishula (trident)', 'Damaru (drum)', 'Crescent moon', 'Third eye', 'Serpent', 'Ganga in his hair', 'Rudraksha beads'],
    mantras: [
      {
        id: 'shiva-panchakshari',
        sanskrit: 'ॐ नमः शिवाय',
        transliteration: 'oṁ namaḥ śivāya',
        meaning: 'Om, salutations to Shiva (the auspicious one)',
        purpose: 'The five-syllable (panchakshari) mantra — the heart of Shaiva practice, rooted in the Yajurveda\'s Rudradhyaya',
        benefits: ['Inner stillness', 'Letting go', 'Steadiness in change']
      },
      {
        id: 'shiva-mahamrityunjaya',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
        transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam, urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt',
        meaning: 'We worship the three-eyed one, fragrant, who nourishes all beings; as a ripe cucumber is released from its stem, may he free us from death, for immortality',
        purpose: 'The Mahamrityunjaya ("great death-conquering") mantra — Rig Veda 7.59.12 — chanted for healing, protection, and fearlessness before endings',
        benefits: ['Fearlessness', 'Healing', 'Peace with mortality']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Ash-smeared ascetic with matted hair holding the crescent moon and the Ganga, a third eye on his forehead, serpent around his neck',
      clothing: 'Tiger skin, rudraksha beads',
      colors: ['White (ash)', 'Blue (throat)'],
      objects: ['Trishula', 'Damaru'],
      vehicle: 'Nandi (bull)',
      posture: 'Seated in meditation, or dancing as Nataraja within a ring of fire',
      facesAndArms: 'Commonly one face, two or four arms; as Nataraja, four arms in the cosmic dance'
    },
    teachings: [
      'Destruction is a form of compassion — endings clear the ground for beginnings',
      'Hold the world\'s poison in your throat: absorb harm without passing it on',
      'The greatest power sits perfectly still',
      'Bear what descends on you the way Shiva bears the Ganga — break its fall for others',
      'The sincere and simple offering outweighs the elaborate one'
    ],
    festivals: ['maha-shivratri-2025'],
    scriptureReferences: [
      {
        id: 'shiva-rigveda',
        text: 'vedas',
        section: 'Rig Veda 7.59.12 (Tryambakam / Mahamrityunjaya)',
        relevance: 'The oldest layer of Shiva devotion — Rudra, the three-eyed one, invoked to free us from death',
        quote: 'We worship the three-eyed one... as a ripe cucumber is released from its stem, may he free us from death, for immortality'
      },
      {
        id: 'shiva-bhagavata-poison',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 8, Chapters 6–7',
        relevance: 'The churning of the ocean and Shiva drinking the halahala poison'
      }
    ],
    stories: [
      {
        id: 'shiva-neelakantha',
        title: 'The Blue-Throated God',
        content: 'When the gods and demons churned the cosmic ocean for the nectar of immortality, the first thing that surfaced was not nectar but halahala — a poison so virulent it began to burn the three worlds. The churners fled. The poison spread. And Shiva, who wanted nothing from the churning — no nectar, no treasure, no share — came forward and gathered the world\'s poison into his palm and drank it. Parvati pressed his throat so the poison would lodge there, harming no one, not even him fatally. It stained his throat blue forever, and the worlds went back to churning for their nectar. He kept nothing but the mark: Neelakantha, the blue-throated one.',
        moralLesson: 'Greatness is measured by what you are willing to absorb, not what you manage to acquire. To hold pain in your throat — neither swallowing it into yourself nor spitting it onto others — is the rarest strength.',
        category: 'teaching',
        relatedScripture: 'Bhagavata Purana, Canto 8, Chapters 6–7 (also Shiva Purana)'
      },
      {
        id: 'shiva-ganga',
        title: 'Bearing the River',
        content: 'King Bhagiratha performed centuries of penance to bring the celestial river Ganga down to earth, so her waters could liberate the souls of his ancestors. But Ganga\'s descent posed a problem no one could solve: falling from heaven at full force, she would shatter the earth itself. Only one being could break that fall. Shiva stood beneath the plunging river and received her full force on his head, where she wandered, tamed, through the labyrinth of his matted hair before flowing gently to the plains. The impact that would have destroyed the world became, on his head, an ornament.',
        moralLesson: 'Sometimes love means standing where the blow will land. Whoever absorbs the shock so that others receive only the blessing — a parent, a leader, a friend — is doing Shiva\'s work with the Ganga.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Bala Kanda, sargas 42–44'
      },
      {
        id: 'shiva-nataraja',
        title: 'The Lord of the Dance',
        content: 'As Nataraja, Shiva dances the cosmos into being and out of it. In his upper right hand, the damaru drum beats creation into rhythm; in his upper left burns the fire of dissolution. His lower right hand is raised: "do not fear." His lower left points to his lifted foot: "here is refuge." And beneath his dancing feet lies the dwarf Apasmara — forgetfulness, ignorance — subdued not by rage but by rhythm. The ring of flames around him is the universe itself, rising and falling with his steps. The image, beloved of the South Indian Shaiva tradition, holds the whole teaching in bronze: creation and destruction are one dance, and at its center is a face of perfect calm.',
        moralLesson: 'Life creates and destroys in the same motion — resisting the rhythm is what hurts. Find the still face at the center of your own dance, and even loss becomes a step.',
        category: 'teaching',
        relatedScripture: 'Shaiva tradition (Chidambaram; Ananda Tandava iconography)'
      }
    ],
    worship: {
      bestTimes: ['Monday', 'Pradosh (twilight)', 'Maha Shivratri'],
      offerings: ['Bilva (bel) leaves', 'Water and milk on the linga', 'White flowers'],
      rituals: ['Abhishekam (pouring water/milk)', 'Om Namah Shivaya japa', 'Night vigil on Shivratri'],
      fasting: ['Mondays', 'Maha Shivratri'],
      pilgrimage: ['Kashi Vishwanath (Varanasi)', 'Kedarnath', 'The twelve Jyotirlingas'],
      dailyPractices: ['Meditation', 'Panchakshari mantra']
    },
    audioUrl: '/audio/pronunciation/shiva.mp3',
    podcastEpisodes: [],
    significance: 'Shiva teaches that transformation — even painful endings — is sacred, and that the deepest power is still, simple, and willing to absorb the world\'s poison for love of it',
    modernRelevance: 'For anyone navigating loss, change, or burnout, Shiva models absorbing difficulty without transmitting it, letting endings compost into beginnings, and the discipline of stillness',
    familyConnections: [
      { relationTo: 'ganesha', relationship: 'Father', description: 'Father of Ganesha, whose elephant head he gave' },
      { relationTo: 'krishna', relationship: 'Fellow aspect of the divine', description: 'In the Gita (10.23) Krishna names Shiva (Shankara) as his own splendor among the Rudras' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/shiva-cover.jpg'),
      iconImage: '/images/deities/shiva-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'shiva-stillness',
        title: 'The God Who Sits Still',
        subtitle: 'A Snow Peak, a Closed Eye, the World Below',
        storyText: 'Every other god is busy. Vishnu preserves, Brahma creates, Indra storms, Lakshmi bestows. **Shiva sits.**\n\nOn the frozen summit of Kailasa, eyes half-closed, ash-smeared, unmoving — the tradition\'s boldest claim rendered as a posture: that beneath all doing there is a being, and the one who touches it holds more power in stillness than the busy hold in motion.\n\nHe is called **Mahadeva**, the great god, yet owns nothing but a tiger skin, a trident, and a drum. When the demons and devas need someone to drink the world\'s poison, they do not go to the palaces. **They climb to the silent one.**',
        teachingText: 'Your life likely resembles the busy gods\' — preserving, creating, storming. Shiva asks a subversive question: **when did you last sit with nothing to do and nothing to become?**\n\nFive minutes of genuine stillness — not rest-as-recovery-for-more-work, but stillness for its own sake — is his practice. Everything else in his story flows from that seat.'
      },
      {
        id: 'shiva-poison',
        title: 'Drinking the Poison',
        subtitle: 'A Blue Throat Above a Saved World',
        storyText: 'The churning of the ocean is the tradition\'s great parable of ambition: gods and demons together, straining for the nectar of immortality. And the first yield of all that striving was **poison** — halahala, enough to burn the three worlds.\n\nIt is an honest story about effort: churn anything hard enough — a career, a family, a country — and **the poison surfaces before the nectar**.\n\nEveryone fled it. Shiva, who had not churned and wanted no nectar, drank it, and Parvati held his throat so it would lodge there and go no further. The worlds resumed their churning. He kept only the blue stain.',
        teachingText: 'Every family, team, and community produces halahala — resentment, grief, blame — before it produces nectar. **Someone must metabolize it without passing it on.** Notice who does that where you live and work; notice when it is you.\n\nThe teaching is exacting: hold it in the throat. Neither swallow it into your depths, nor spray it onward. That narrow place between suppression and transmission is where Shiva lives.',
        citation: 'Samudra manthan: Bhagavata Purana, Canto 8, Chapters 6–7.'
      },
      {
        id: 'shiva-ganga-bearer',
        title: 'The One Who Breaks the Fall',
        subtitle: 'A River Landing in Matted Hair',
        storyText: 'Bhagiratha\'s ancestors could only be liberated by the Ganga\'s waters, and his penance finally persuaded her to descend. But **grace at full force is indistinguishable from catastrophe**: the river\'s fall from heaven would have split the earth.\n\nSo Shiva stood beneath the descent, took the impact on his head, and let the torrent wander through his hair until it emerged as a river the earth could bear.\n\nThe Ganga that blesses the plains is **the Ganga after Shiva** — the same power, made survivable.',
        teachingText: 'Think of what has descended on your family line — money or its absence, expectations, old grief. Someone in every lineage stands where Shiva stood and **breaks the fall**, so what reaches the next generation blesses instead of shatters.\n\nNaming who did that for you is gratitude; choosing to do it for those after you is dharma.',
        citation: 'Valmiki Ramayana, Bala Kanda, sargas 42–44.'
      },
      {
        id: 'shiva-householder',
        title: 'The Ascetic Who Married',
        subtitle: 'Kailasa as a Family Home',
        storyText: 'The wild, ash-smeared renunciant is also the tradition\'s most beloved family man.\n\nParvati won him not by beauty — he burned Kama, desire itself, to ash with his third eye when desire was aimed at him — but by **tapasya**, matching his austerity with her own until he recognized an equal.\n\nTheir marriage joins what the world calls opposites: the hermit and the queen\'s daughter, stillness and devotion. Their household on Kailasa — Parvati, Ganesha, Kartikeya, the bull Nandi at the door — became the model of **a family built around a meditative center** rather than around busyness.',
        teachingText: 'Shiva refutes the idea that depth requires leaving. He is fully ascetic and fully married; the meditation does not end when the family begins.\n\nWhat would it mean for your household to have a still center — one practice, one hour, one corner of the home where the churning stops? The tradition\'s answer to work-life balance is not balance but **a center**.',
        citationLink: 'deity:parvati',
        citation: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa, Kumarasambhava.'
      },
      {
        id: 'shiva-simple-offering',
        title: 'The Easily-Pleased Lord',
        subtitle: 'One Bilva Leaf and a Handful of Water',
        storyText: 'Of all the great gods, Shiva is **Bholenath** — the innocent, the easily pleased.\n\nHis worship requires no priest, no wealth, no elaborate rite: a bilva leaf, water poured over a stone linga, his name said with attention. The tradition delights in stories of accidental worship — a hunter who unknowingly dropped bilva leaves on a linga through a night of fear and was liberated by dawn.\n\nThe theological point is serious: **the divine measures sincerity, not production value.** The god who owns nothing cannot be impressed by what you own.',
        teachingText: 'Whatever your practice is becoming, Shiva keeps it honest: **could you do it with one leaf and a palmful of water?**\n\nIf your spiritual life has grown elaborate — apps, courses, gear — strip it once a week to the bare act: sit, pour, say the name, mean it. Bholenath asks for nothing else, which is exactly what makes the offering complete.',
        citationLink: 'festival:maha-shivratri-2025',
        citation: 'The hunter\'s night of bilva leaves: Shiva Purana (Shivratri mahatmya tellings).'
      }
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: '7.59.12 (Tryambakam / Mahamrityunjaya mantra)',
        translation: 'public-domain renderings; cross-checked',
        url: 'https://greenmesg.org/stotras/vedas/rigveda/mandala7/sukta59/rudra-om_tryambakam_yajamahe.php',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 8, Chapters 6–7 (churning of the ocean; halahala)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
      },
      {
        text: 'Valmiki Ramayana',
        locator: 'Bala Kanda, sargas 42–44 (Bhagiratha and the descent of the Ganga)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/utf8/baala/sarga43/bala_43_prose.htm',
      },
      {
        text: 'Shaiva tradition',
        locator: 'Nataraja / Ananda Tandava iconography (Chidambaram); Bholenath and bilva-leaf devotion',
        translation: 'traditional; presented as tradition, not scripture quotation',
      },
    ],
    reflectionQuestions: [
      'Shiva absorbed poison without passing it on. When you\'re stressed, how could you avoid passing it to the people around you?'
    ]
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    sanskritName: 'हनुमान्',
    titles: ['Maruti', 'Anjaneya', 'Pavanputra', 'Bajrangbali', 'Sankata Mochana'],
    category: 'major',
    description: 'The devoted one — boundless strength in perfect service, remover of distress',
    mythology: 'Son of the wind god Vayu and Anjana, Hanuman is the Ramayana\'s greatest devotee and its mightiest hero — and the tradition\'s insistence that those are the same thing. He leapt an ocean on the strength of remembering whose work he was doing, burned Lanka with the tail meant to humiliate him, and carried a mountain when he could not identify a herb. Yet his defining image is not any feat: it is Hanuman kneeling, hands folded, eyes on Rama. His strength is total because his ego is absent; nothing of him is spent maintaining himself.',
    attributes: ['Devotion', 'Strength', 'Courage', 'Humility', 'Service', 'Celibate discipline'],
    symbols: ['Gada (mace)', 'Mountain in hand', 'Open chest revealing Rama and Sita', 'Flying posture'],
    mantras: [
      {
        id: 'hanuman-mula',
        sanskrit: 'ॐ श्री हनुमते नमः',
        transliteration: 'oṁ śrī hanumate namaḥ',
        meaning: 'Om, salutations to Shri Hanuman',
        purpose: 'For courage, protection, and strength in service',
        benefits: ['Courage under fear', 'Strength for duty', 'Protection']
      },
      {
        id: 'hanuman-chalisa',
        sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि। बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥',
        transliteration: 'śrī-guru carana saroja raja nija manu mukuru sudhāri, baranaū̃ raghubara bimala jasu jo dāyaku phala cāri',
        meaning: 'Cleansing the mirror of my mind with the dust of my guru\'s lotus feet, I sing the pure glory of the best of Raghus — the giver of life\'s four fruits (opening of the Hanuman Chalisa)',
        purpose: 'The Hanuman Chalisa (Tulsidas, 16th century) — forty verses recited daily by millions for strength and protection',
        benefits: ['Daily discipline', 'Fearlessness', 'Devotional focus']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Powerful monkey-faced figure, often colored sindoor-orange, muscular and humble at once',
      clothing: 'Loincloth of a renunciant, sacred thread',
      colors: ['Orange (sindoor)', 'Red'],
      objects: ['Gada (mace)', 'Sanjivani mountain'],
      vehicle: 'None — he flies by his own power, son of the wind',
      posture: 'Kneeling before Rama, flying with the mountain, or tearing open his chest to reveal Rama and Sita within',
      facesAndArms: 'One face, two arms (Panchamukhi five-faced form in some traditions)'
    },
    teachings: [
      'Strength exists for service, not display',
      'You are stronger than you remember — you only need to be reminded of whose work you do',
      'Devotion turns obstacles into milestones',
      'When you cannot tell which herb heals, carry the whole mountain',
      'The servant\'s seat is higher than the throne'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'hanuman-sundara',
        text: 'ramayana',
        section: 'Sundara Kanda',
        relevance: 'The "beautiful chapter" — Hanuman\'s leap to Lanka and the finding of Sita; recited whole for courage in crisis'
      }
    ],
    stories: [
      {
        id: 'hanuman-leap',
        title: 'The Leap Across the Ocean',
        content: 'A hundred yojanas of ocean lay between the searching vanaras and Lanka, where Sita was held. The mightiest among them weighed their strength aloud and fell short. Hanuman sat apart, silent — he had forgotten what he could do. As a child he had been cursed to forget his powers until someone reminded him of them. The old bear Jambavan came to him and simply recounted who he was: son of the wind, who once leapt for the sun itself. As the words landed, Hanuman began to grow. He grew until the mountain he stood on sank beneath his gathering force, and then he threw himself across the sky — outracing his father the wind, meeting tests from the serpent-mother Surasa and the shadow-demon Simhika midair, refusing rest on the golden mountain Mainaka — until Lanka rose before him.',
        moralLesson: 'Most of what we call inability is forgetting. Everyone needs a Jambavan — and everyone must sometimes be one: the friend who reminds another of powers they have stopped believing in.',
        category: 'adventure',
        relatedScripture: 'Valmiki Ramayana, Sundara Kanda, sarga 1 (Jambavan\'s reminder: Kishkindha Kanda, sargas 65–67)'
      },
      {
        id: 'hanuman-sun',
        title: 'The Child Who Leapt for the Sun',
        content: 'As an infant, Hanuman woke hungry and saw the rising sun — round, glowing, surely the ripest fruit ever hung in a tree. So he leapt for it. The child of the wind rose through the sky toward the sun itself, and the alarmed king of the gods struck him down with the thunderbolt, breaking his jaw — hanu — giving him the name he carries. His father Vayu, the wind, withdrew from the world in grief until the gods made amends the only way that could satisfy a father: each granted the child a boon. Strength beyond measure, speed beyond the wind, life beyond death. The appetite that looked like recklessness became, blessed and disciplined, the power that would one day cross an ocean.',
        moralLesson: 'The hungers that get children into trouble are the same energies that, rightly directed, become greatness. Do not curse the leap — train it.',
        category: 'origin',
        relatedScripture: 'Valmiki Ramayana, Uttara Kanda (Hanuman\'s childhood, as recounted to Rama)'
      },
      {
        id: 'hanuman-mountain',
        title: 'Carrying the Mountain',
        content: 'When Lakshmana lay dying on the battlefield, only one herb could save him — sanjivani, growing on a single Himalayan slope a subcontinent away, and only before dawn. Hanuman crossed the distance in the dark, reached the mountain, and faced an honest problem: the herbs all looked alike, and there was no time to be wrong. So he made the choice that has delighted India ever since — he wrapped his arms around the mountain, tore it from the earth, and carried the whole thing back across the sky, letting the physicians find the herb while Lakshmana still breathed.',
        moralLesson: 'When you cannot identify the one thing that will help someone you love, bring everything you have. Wholeheartedness forgives imprecision; hesitation does not.',
        category: 'adventure',
        relatedScripture: 'Valmiki Ramayana, Yuddha Kanda (sanjivani episode)'
      }
    ],
    worship: {
      bestTimes: ['Tuesday', 'Saturday', 'Hanuman Jayanti'],
      offerings: ['Sindoor', 'Ladoo and bananas', 'Oil lamps'],
      rituals: ['Hanuman Chalisa recitation', 'Sundara Kanda reading in times of difficulty'],
      fasting: ['Tuesdays'],
      pilgrimage: ['Hanuman Garhi (Ayodhya)', 'Sankata Mochana (Varanasi)', 'Namakkal Anjaneyar'],
      dailyPractices: ['Chalisa', 'Physical discipline offered as service']
    },
    audioUrl: '/audio/pronunciation/hanuman.mp3',
    podcastEpisodes: [],
    significance: 'Hanuman embodies the union the tradition prizes most: limitless capability wholly surrendered to loving service — strength that never curdles into ego because it never serves itself',
    modernRelevance: 'The patron of everyone who doubts their own capacity: his powers return the moment someone reminds him whose work he is doing. Beloved of students, athletes, and anyone facing what looks like an uncrossable ocean',
    familyConnections: [
      { relationTo: 'rama', relationship: 'Beloved lord', description: 'Hanuman\'s entire being is organized around service to Rama' },
      { relationTo: 'shiva', relationship: 'Aspect/blessing', description: 'Widely revered in tradition as an aspect or blessing of Shiva (Rudra)' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/hanuman-cover.jpg'),
      iconImage: '/images/deities/hanuman-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'hanuman-forgotten-strength',
        title: 'The Strength You Forgot You Had',
        subtitle: 'An Old Bear Speaking to a Silent Monkey',
        storyText: 'The Ramayana\'s most quietly devastating scene is not a battle.\n\nThe vanaras sit defeated at the ocean\'s edge — the strongest among them can leap ninety yojanas, and Lanka lies at a hundred. Hanuman sits apart, saying nothing. He does not volunteer because **it does not occur to him that he can do it**: a childhood curse made him forget his own powers until reminded.\n\nThen **Jambavan**, the ancient bear, walks over and does the only heroic thing left to old age — **he remembers on another\'s behalf**. Son of the wind. The infant who leapt for the sun. The one for whom this ocean is a puddle. And Hanuman grows with every sentence, because the words are not flattery; they are facts he had misplaced.',
        teachingText: 'The curse of forgotten strength is not mythology — it is Monday morning. Capability you demonstrated for years disappears from your self-image after one season of defeat.\n\nHanuman\'s teaching here is double: **seek your Jambavans**, the ones who state your powers as facts; and **be one**, because reminding someone of their strength is not encouragement, it is testimony.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda, sargas 65–67.'
      },
      {
        id: 'hanuman-whose-work',
        title: 'Strength That Serves',
        subtitle: 'A Mace Laid at Two Pairs of Feet',
        storyText: 'Everything Hanuman does is enormous — oceans leapt, cities burned, mountains carried — and **none of it is for himself**.\n\nThis is the engineering secret of his character: **strength without ego has no drag.** The mighty in the epics who serve themselves — Ravana above all, with his ten heads of self-regard — spend most of their power maintaining their own image. Hanuman spends nothing on himself.\n\nAsked how he crossed the impossible ocean, his answer is always the same: by Rama\'s name and Rama\'s work. The strength is real, but the frictionlessness comes from the devotion.',
        teachingText: 'Watch what happens to your own capability when the work is genuinely for something beyond you — the meeting where you stop defending your idea and start serving the problem. **Ego is drag.**\n\nHanuman\'s question for any undertaking: whose work is this? When the honest answer is "something larger than me," you will find, like him, that you are suddenly bigger than the obstacle.',
        citation: 'Valmiki Ramayana, Sundara Kanda (the crossing).'
      },
      {
        id: 'hanuman-in-lanka',
        title: 'Alone in the Enemy City',
        subtitle: 'A Small Monkey in Golden Lanka at Night',
        storyText: 'Having crossed the ocean as a giant, Hanuman enters Lanka the opposite way — **shrunk to the size of a cat**, slipping through the golden city by night.\n\nThe Sundara Kanda lingers on his searching: palace by palace, room by room, through Ravana\'s sleeping splendor, discipline holding against despair as Sita is nowhere.\n\nWhen he finally finds her under the ashoka tree — guarded, grieving, refusing Ravana — he faces a subtle problem: how does a monkey appear before a captive queen without terrifying her? **He begins softly, from the branches, singing Rama\'s story** — her own story — until hope arrives before he does. Then he presents the ring.',
        teachingText: 'Power got him to Lanka; **gentleness accomplished the mission**.\n\nApproaching someone in despair takes Hanuman\'s branch-singing: not bursting in with solutions, but letting the familiar story of what they love reach them first. The Sundara Kanda is recited in Indian homes precisely in seasons of crisis — a manual for carrying hope into dark places without breaking anything.',
        citation: 'Valmiki Ramayana, Sundara Kanda.'
      },
      {
        id: 'hanuman-chest',
        title: 'What Lives in the Chest',
        subtitle: 'Pearls Torn, a Chest Opened',
        storyText: 'At Rama\'s coronation, gifts flowed. Sita gave Hanuman a necklace of pearls beyond price.\n\nHe held it to his ear, bit a pearl open, frowned, bit another, discarding each — searching. Asked what he was doing, he said: **I keep nothing that does not contain Rama.** The court laughed at the simple monkey.\n\nAnd Hanuman, in the telling beloved of the later tradition, **tore open his own chest** — and there, seated in his heart, were Rama and Sita. The court stopped laughing. Whatever one makes of the image, its claim is exact: the measure of devotion is not what you wear or say, but what an honest opening of your chest would reveal.',
        teachingText: 'This story is later tradition rather than Valmiki, and the tradition kept it because it asks the only question that matters: **if your chest were opened** — your calendar, your accounts, your browser history, your 3 a.m. thoughts — **what would be found enthroned there?**\n\nHanuman\'s answer had the advantage of being true. The practice is to make yours true too, one relocation of the heart at a time.',
        citation: 'The opened chest: later devotional tradition (not Valmiki), widely told.'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Sundara Kanda, sarga 1 (the leap); Kishkindha Kanda, sargas 65–67 (Jambavan\'s reminder); Yuddha Kanda (sanjivani); Uttara Kanda (childhood)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/utf8/sundara/sarga1/sundara_1_prose.htm',
      },
      {
        text: 'Hanuman Chalisa',
        locator: 'Tulsidas (16th century), opening doha',
        translation: 'traditional Awadhi text',
      },
      {
        text: 'Later tradition',
        locator: 'The pearl-necklace / opened-chest story — devotional tradition, labeled as such (not Valmiki)',
      },
    ],
    reflectionQuestions: [
      'Hanuman forgot his own strength until a friend reminded him. What are you good at that you tend to forget?'
    ]
  },
  {
    id: 'durga',
    name: 'Durga',
    sanskritName: 'दुर्गा',
    titles: ['Devi', 'Ambika', 'Chandika', 'Mahishasura-Mardini', 'Sherawali'],
    category: 'major',
    description: 'The invincible mother — the combined power of all the gods, fierce in protection, tender in love',
    mythology: 'When the buffalo demon Mahishasura, unbeatable by any man or god, overran the heavens, the gods did something unprecedented: they pooled their essence. From their combined radiance a light gathered and took form — a woman of blinding beauty riding a lion, each of her many arms carrying a god\'s own weapon, given freely. Durga is not one god\'s consort or another\'s daughter in this, her defining story: she is what the divine looks like when everything holy stops competing and combines. She laughed at the demon\'s marriage proposals, fought him through his shape-shifting deceits, and freed the worlds. The Devi Mahatmya, recited every Navratri, calls her the one who is present in all beings — as consciousness, as power, as mother, as peace.',
    attributes: ['Protection', 'Fierce compassion', 'Courage', 'Motherly love', 'Righteous power'],
    symbols: ['Lion or tiger mount', 'Trident', 'Discus, sword, bow — the gods\' pooled weapons', 'Lotus', 'Conch'],
    mantras: [
      {
        id: 'durga-ya-devi',
        sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
        transliteration: 'yā devī sarva-bhūteṣhu śhakti-rūpeṇa saṁsthitā, namas tasyai namas tasyai namas tasyai namo namaḥ',
        meaning: 'To the Goddess who abides in all beings in the form of power — salutations to her, salutations to her, salutations to her, again and again',
        purpose: 'From the Devi Mahatmya, Chapter 5 — the great litany recognizing the Goddess in every being',
        benefits: ['Recognizing sacred power everywhere', 'Strength', 'Reverence for all beings']
      },
      {
        id: 'durga-bija',
        sanskrit: 'ॐ दुं दुर्गायै नमः',
        transliteration: 'oṁ duṁ durgāyai namaḥ',
        meaning: 'Om, salutations to Durga (with her seed syllable duṁ)',
        purpose: 'Durga\'s bija mantra — for protection and courage in difficulty',
        benefits: ['Protection', 'Fearlessness', 'Resolve']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Radiant golden goddess with eight to ten arms, serene face above weapons in motion',
      clothing: 'Red sari, crown, warrior\'s ornaments',
      colors: ['Red', 'Gold'],
      objects: ['Trident (from Shiva)', 'Discus (from Vishnu)', 'Bow (from Vayu)', 'Sword', 'Conch', 'Lotus'],
      vehicle: 'Lion (or tiger)',
      posture: 'Riding the lion mid-battle, spear poised over Mahishasura — or enthroned as the serene mother',
      facesAndArms: 'One serene face; eight, ten, or eighteen arms bearing the gods\' weapons'
    },
    teachings: [
      'When the holy combine instead of compete, the impossible becomes routine',
      'Fierceness and motherliness are one love in two weathers',
      'Evil shape-shifts; clarity must outlast every disguise',
      'The Goddess abides in all beings — treat every being accordingly',
      'Do not fight on the deceiver\'s terms; hold your ground until the true form shows'
    ],
    festivals: ['navratri-2025'],
    scriptureReferences: [
      {
        id: 'durga-dm-birth',
        text: 'puranas',
        section: 'Devi Mahatmya (Markandeya Purana, ch. 81–93), Chapter 2',
        relevance: 'Durga\'s birth from the combined radiance of all the gods, each granting her their weapon'
      },
      {
        id: 'durga-dm-mahisha',
        text: 'puranas',
        section: 'Devi Mahatmya, Chapters 2–3',
        relevance: 'The battle with Mahishasura through his shape-shifting, ending with the buffalo demon slain'
      },
      {
        id: 'durga-dm-yadevi',
        text: 'puranas',
        section: 'Devi Mahatmya, Chapter 5',
        relevance: 'The Ya Devi litany: the Goddess present in all beings as power, consciousness, peace, and mother',
        quote: 'To the Goddess who abides in all beings in the form of power — salutations to her, again and again'
      }
    ],
    stories: [
      {
        id: 'durga-birth',
        title: 'Born of Combined Light',
        content: 'Mahishasura had a boon: no man and no god could kill him. Armed with that loophole, the buffalo demon drove the gods from heaven. Defeated, they gathered — Vishnu, Shiva, Brahma, Indra, all of them — and their anger and resolve poured out of them as light. The streams of radiance fused into a single blaze, and the blaze took form: a woman. Shiva\'s light became her face, Vishnu\'s her arms, Agni\'s her eyes. Then, one by one, the gods handed her their own weapons — Shiva his trident, Vishnu his discus, Vayu his bow, Himavan a lion to ride. She was not created as their servant; she was revealed as their source. The demon\'s loophole had missed her entirely: she was no man and no mere god.',
        moralLesson: 'What no power can do alone, pooled power does easily — but pooling requires each god to hand over his own weapon. The rarest strength in any family or team is the willingness to give your best tool to someone better positioned to wield it.',
        category: 'origin',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapter 2'
      },
      {
        id: 'durga-mahishasura',
        title: 'The Slaying of Mahishasura',
        content: 'The battle was a study in deception against clarity. Mahishasura came as a buffalo, and when cornered became a lion, then a man with a sword, then an elephant, then a buffalo again — each form abandoned the instant it began to lose. Durga fought unhurried, her face serene above the storm of her arms, drinking from her cup between blows, laughing at his transformations. The texts insist on that serenity: fury in her limbs, calm in her eyes. Finally, as the demon struggled halfway out of the buffalo form — caught mid-deception, neither one thing nor the other — she pinned him with her foot, pierced him with the trident, and ended it.',
        moralLesson: 'Deceit survives by changing shape the moment it is nearly caught — in a manipulator, an addiction, a self-justification. Durga\'s method: do not chase each new form; hold steady, stay calm above the effort, and strike when the deception is caught between disguises.',
        category: 'adventure',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapters 2–3'
      },
      {
        id: 'durga-in-all-beings',
        title: 'The Goddess in All Beings',
        content: 'After the victory, the gods did not merely thank her — they sang the hymn that became the Devi Mahatmya\'s heart: "To the Goddess who abides in all beings as consciousness... as power... as peace... as faith... as memory... as compassion... as mother — salutations to her, salutations to her, salutations to her, again and again." Verse upon verse, the same structure, a different presence each time. The theology is radical: Durga is not only on the battlefield. She is in every being — in the neighbor as patience, in the stranger as hunger, in the child as sleep, in you as whatever power you have ever felt move through you.',
        moralLesson: 'If the Goddess abides in all beings, then reverence is not a temple activity — every encounter is an encounter with her. The hymn is a training: to see power, patience, and peace in others as visitations, and treat them accordingly.',
        category: 'teaching',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapter 5'
      }
    ],
    worship: {
      bestTimes: ['Navratri (both spring and autumn)', 'Friday', 'Ashtami days'],
      offerings: ['Red flowers (hibiscus)', 'Red chunri (cloth)', 'Fruits and halwa-puri'],
      rituals: ['Devi Mahatmya (Durga Saptashati) recitation', 'Kanya puja (honoring young girls)', 'Ghatasthapana at Navratri'],
      fasting: ['Navratri fasts', 'Fridays'],
      pilgrimage: ['Vaishno Devi', 'Kamakhya', 'The Shakti Pithas'],
      dailyPractices: ['Ya Devi recitation', 'Honoring the feminine as sacred']
    },
    audioUrl: '/audio/pronunciation/durga.mp3',
    podcastEpisodes: [],
    significance: 'Durga is the tradition\'s answer to whether the sacred can be both mother and warrior: one love, expressed as tenderness toward the vulnerable and as fire toward whatever threatens them',
    modernRelevance: 'For anyone who must be both gentle and unyielding — parents, caregivers, leaders, anyone protecting something fragile in a hard world — Durga models fierce compassion without cruelty and calm without passivity',
    familyConnections: [
      { relationTo: 'shiva', relationship: 'Consort (as Parvati)', description: 'Durga is the fierce form of the Goddess who is also Parvati, Shiva\'s consort' },
      { relationTo: 'ganesha', relationship: 'Mother (as Parvati)', description: 'As Parvati, mother of Ganesha' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/durga-cover.jpg'),
      iconImage: '/images/deities/durga-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'durga-when-gods-pool',
        title: 'When the Gods Stopped Competing',
        subtitle: 'Streams of Light Fusing into a Woman on a Lion',
        storyText: 'The Devi Mahatmya opens with the divine order defeated. Mahishasura\'s boon — invulnerable to man and god — had found the loophole in heaven\'s power, and the gods, individually magnificent, were individually useless.\n\nWhat saved the worlds was not a bigger god but **a different geometry: they combined.** Radiance poured from every divine body, fused, and took the form of a woman.\n\nAnd then came the detail the text lingers on: **each god handed her his signature weapon.** Shiva gave the trident. Vishnu gave the discus. Not copies — their own. Durga rides out armed with everything heaven owns, freely given.',
        teachingText: 'Notice what the story requires before the rescue: every powerful being had to admit his individual power was not enough, and hand his best weapon to another.\n\nWhere in your family or work is the crisis persisting because everyone fights it separately, each guarding their own trident? **Durga is born wherever that surrender into combination happens.**',
        citation: 'Devi Mahatmya (Markandeya Purana), Chapters 2–3.'
      },
      {
        id: 'durga-fierce-mother',
        title: 'The Mother Who Carries Weapons',
        subtitle: 'A Serene Face Above Ten Armed Hands',
        storyText: 'Durga\'s iconography holds a deliberate contradiction: **the face of a serene mother above arms full of weapons mid-battle.**\n\nIndia has never seen a conflict between the two. Ask anyone raised on her images — she fights like that because she is a mother; the fierceness is the tenderness, pointed at what threatens the child.\n\nThe texts underline it: she battles Mahishasura with a calm face, even laughing, because rage is absent — protection is total but hatred never arrives. This is what the tradition means by **fierce compassion**: love with a sword, wielded without cruelty.',
        teachingText: 'Most of us split these energies — gentle until pushed into rage that we later regret, or so calm we fail to protect what needs us. Durga is the integration: **total ferocity in defense of the vulnerable, zero hatred toward the attacker.**\n\nNext time you must confront someone, try her posture — the serene face above the armed hands. Firm action, quiet eyes.',
        citation: 'Devi Mahatmya, Chapter 3.'
      },
      {
        id: 'durga-shapeshifter',
        title: 'Fighting the Shape-Shifter',
        subtitle: 'A Buffalo Becoming a Lion Becoming a Man',
        storyText: 'Mahishasura never fought fair — that was the point of him. Buffalo, lion, swordsman, elephant, buffalo again: each form abandoned at the moment of losing, so **the fight could never end**.\n\nDurga\'s response was not to match his changes but to **refuse their premise**. She held her ground, stayed serene, and let each disguise exhaust itself — striking finally when he was caught halfway between forms, neither buffalo nor man, the deception itself exposed.\n\nThe Devi Mahatmya was composed by people who understood that evil\'s chief weapon is not strength but **redefinition**.',
        teachingText: 'Everything destructive in a life shape-shifts when confronted: the addiction becomes "just relaxing," the cruel relationship becomes "passionate," the compromise becomes "pragmatism." Chasing each new form is exhausting by design.\n\nDurga\'s method: **name the thing once, clearly, and hold that clarity while the disguises cycle.** The moment of half-transformation — when the old excuse is dying and the new one isn\'t ready — is when truth can pin it.',
        citation: 'Devi Mahatmya, Chapter 3 (the slaying of Mahishasura).'
      },
      {
        id: 'durga-nine-nights',
        title: 'Nine Nights of the Mother',
        subtitle: 'A Lamp Lit Beside a Sprouting Pot of Grain',
        storyText: 'Twice a year, at the great turning of the seasons, India gives Durga nine nights — **Navratri**.\n\nA pot of grain is sprouted, a lamp kept burning, and night by night the Goddess is honored in her forms: fierce **Durga**, wealth-giving **Lakshmi**, wisdom-bestowing **Saraswati** — by one beloved arrangement, three nights each. On Ashtami, young girls are worshipped as her living embodiment — the theology of "the Goddess abides in all beings" made into a household act.\n\nThe festival ends in **Vijayadashami**, the day of victory, when Mahishasura falls and, in the north, Ravana burns: all the traditions agreeing that after nine nights of honoring the sacred feminine, the tenth day belongs to triumph.',
        teachingText: 'Navratri\'s structure is itself the teaching: **protection first (Durga), then abundance (Lakshmi), then wisdom (Saraswati)** — in that order, because abundance without protection is looted and wisdom without abundance starves.\n\nAudit your own life in her sequence. And the kanya puja asks the sharpest question: do you actually treat the ordinary beings around you as places where the Goddess lives?',
        citationLink: 'festival:navratri-2025',
        citation: 'Navratri: living tradition; the three-by-three arrangement and kanya puja: widespread devotional practice.'
      }
    ],
    sources: [
      {
        text: 'Devi Mahatmya (Markandeya Purana, chapters 81–93)',
        locator: 'Chapter 2 (birth from combined radiance; the gods\' weapons), Chapters 2–3 (Mahishasura battle and slaying), Chapter 5 (Ya Devi litany)',
        translation: 'cross-checked against public translations (devimahatmya.com, wisdomlib.org)',
        url: 'https://devimahatmya.com/book/chapter-3-the-slaying-of-mahisasura/',
      },
      {
        text: 'Navratri tradition',
        locator: 'Nine-nights structure, kanya puja, Vijayadashami — living tradition, labeled as such',
      },
    ],
    reflectionQuestions: [
      'Durga is fierce without hatred. When did you last have to stand firm — and did you manage it without anger?'
    ]
  },
  {
    id: 'brahma',
    name: 'Brahma',
    sanskritName: 'ब्रह्मा',
    titles: ['Prajapati', 'Svayambhu (Self-Born)', 'Chaturmukha (Four-Faced)', 'Vidhata'],
    category: 'major',
    description: 'The creator the world forgot to worship — and why that is the point',
    mythology: 'Brahma is the maker: born from a lotus that grew out of Vishnu\'s navel as the new cosmos stirred, he shaped the worlds, the sages, and the beings who fill them. His four heads face the four directions and voice the four Vedas. And yet — the question every child eventually asks — for the creator of everything, he has almost no temples. The Puranas tell of pride corrected: a lie told in a contest with Shiva, a curse earned at a great yajna. The deeper answer is structural: creation happens once, but preservation and transformation never stop. The tradition worships the work that is still going on.',
    attributes: ['Creation', 'Knowledge of the Vedas', 'Time in vast cycles', 'The mind\'s generative power'],
    symbols: ['Lotus', 'Four Vedas', 'Kamandalu (water pot)', 'Prayer beads'],
    mantras: [
      {
        id: 'brahma-gayatri-note',
        sanskrit: 'ॐ वेदात्मनाय विद्महे हिरण्यगर्भाय धीमहि। तन्नो ब्रह्मा प्रचोदयात्॥',
        transliteration: 'oṁ vedātmanāya vidmahe hiraṇyagarbhāya dhīmahi, tanno brahmā pracodayāt',
        meaning: 'We know the soul of the Vedas; we meditate on the golden womb; may Brahma inspire us',
        purpose: 'Brahma Gayatri — invoked for learning and creative work',
        benefits: ['Clarity in study', 'Creative beginnings', 'Reverence for knowledge']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A mature, bearded figure with four faces, calm and scholarly rather than martial',
      clothing: 'Red or gold garments of a priest',
      colors: ['Red', 'Gold'],
      objects: ['The four Vedas', 'Kamandalu', 'Akshamala (rosary)', 'Lotus'],
      vehicle: 'Hamsa — the swan said to separate milk from water, discrimination itself',
      posture: 'Seated on a lotus',
      facesAndArms: 'Four faces, four arms'
    },
    teachings: [
      'Beginning is divine work — but nothing runs on its founding energy forever',
      'Knowledge (his consort is Saraswati) must sit beside creation or creation misfires',
      'Even gods answer for pride',
      'Time is vaster than any project: a day of Brahma outlasts civilizations'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'brahma-bhagavata',
        text: 'puranas',
        section: 'Canto 3, Chapters 8–9',
        relevance: 'The lotus from Vishnu\'s navel and Brahma\'s awakening as the cosmos begins'
      }
    ],
    stories: [
      {
        id: 'brahma-lotus',
        title: 'The Lotus from the Navel',
        content: 'Between cosmic ages, Vishnu rests on the serpent Shesha upon the causal waters — everything that will exist, folded and sleeping. As creation stirs, a lotus grows from his navel, rises through the dark, and opens. Seated in it is Brahma, blinking at an empty universe. He climbs down the stem to find its source and cannot reach the bottom; he rises and cannot find its top. So he does the first act of the new creation: he sits where he is and turns inward. In that meditation he perceives Vishnu, receives the knowledge folded into the waters, and begins to make the worlds.',
        moralLesson: 'Even the creator begins by admitting what he does not know and sitting still with the question. Every genuine beginning starts in humility, not certainty.',
        category: 'origin',
        relatedScripture: 'Bhagavata Purana, Canto 3, Chapters 8–9'
      },
      {
        id: 'brahma-pillar',
        title: 'The Pillar Without End',
        content: 'Brahma and Vishnu once argued over which of them was supreme. As they quarreled, an immense pillar of light erupted between them, without visible top or bottom. They agreed to search: Vishnu dove as a boar toward its base, Brahma flew as a swan toward its summit. Vishnu returned and admitted he found no bottom. Brahma, unable to reach the top, met a falling ketaki flower and persuaded it to testify that he had — a small, polished lie. The pillar split open: it was Shiva, the light itself. For the lie, Brahma lost the right to be worshipped; the honest Vishnu was honored. The flower, for its part, was banned from Shiva\'s altars.',
        moralLesson: 'The tradition\'s explanation for its own empty Brahma temples is a warning it aims at every creator: the maker who must also be declared supreme unmakes himself. Honesty about your limits is worth more than your greatest work.',
        category: 'teaching',
        relatedScripture: 'Shiva Purana, Vidyeshvara Samhita (the Lingodbhava story)'
      }
    ],
    worship: {
      bestTimes: ['Kartik Purnima (at Pushkar)'],
      offerings: ['Lotus flowers'],
      rituals: ['Rare — the Pushkar temple in Rajasthan is his one major living shrine'],
      fasting: [],
      pilgrimage: ['Brahma Temple, Pushkar (Rajasthan)'],
      dailyPractices: ['Study itself is his worship — beginning any learning with reverence']
    },
    audioUrl: '/audio/pronunciation/brahma.mp3',
    podcastEpisodes: [],
    significance: 'Brahma completes the Trimurti — creation beside Vishnu\'s preservation and Shiva\'s dissolution — and his near-absence from worship is itself one of the tradition\'s sharpest teachings about pride, and about honoring ongoing work over founding glory',
    modernRelevance: 'Every founder, artist, and parent knows Brahma\'s predicament: the beginning is essential and then the beginning is over. His story asks what a creator is for after the creating — and answers: knowledge, humility, and letting the work be maintained by others',
    familyConnections: [
      { relationTo: 'saraswati', relationship: 'Consort', description: 'Creation keeps knowledge beside it — Brahma is rarely depicted without Saraswati\'s wisdom nearby' },
      { relationTo: 'shiva', relationship: 'Trimurti', description: 'The pillar-of-light story binds their roles: creation humbled before the unmeasurable' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: brahma-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/brahma-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'brahma-question',
        title: 'The God With No Temples',
        subtitle: 'The question every child asks first',
        storyText: 'Here is a puzzle the tradition planted on purpose: Hinduism worships the preserver in ten thousand temples and the destroyer in ten thousand more — and **the creator of everything has, for practical purposes, one**, at Pushkar in Rajasthan.\n\nAsk why and you will hear the stories: the contest with Shiva where Brahma\'s pride produced a small lie, or the yajna where a curse fell.\n\nBut sit with it longer and a structural answer emerges. **Creation is finished.** Preservation and transformation are happening right now, in your body, your family, your world — and the tradition pours its devotion toward the work that is still going on.',
        teachingText: 'This is not disrespect; Brahma opens the cosmology of nearly every Purana. It is a priority: **honor beginnings, worship continuations.**\n\nAny parent who has launched a child, any founder who has handed off a company, knows the Brahma position — essential, then over. The tradition\'s quiet counsel to everyone in it: what you started must matter less to you than what it became.',
        citation: 'Shiva Purana, Vidyeshvara Samhita (Lingodbhava); Padma Purana (the Pushkar tradition)'
      },
      {
        id: 'brahma-lotus-section',
        title: 'Born on a Lotus, Looking for the Bottom',
        subtitle: 'The first act of the first being',
        storyText: 'The Bhagavata Purana opens creation like this: Vishnu rests on the cosmic waters, and from his navel grows a lotus. In it wakes Brahma — **alone, in the dark, with no memory and no instructions.**\n\nHe climbs down the stem to find where it comes from and finds no bottom. He climbs up and finds no top.\n\nAnd so the first conscious act of the new universe is not making; **it is meditation.** Brahma sits in his lotus and turns inward, and only after perceiving the one he grew from does he begin to create.',
        sectionHeader: 'Creation begins in humility',
        teachingText: 'The tradition could have made its creator omniscient from the first instant. Instead it gave him our situation: waking into a world he did not choose, unable to see his own source, having to begin anyway.\n\nHis answer — **sit, look inward, then work** — is the pattern for every creative act since. You do not need to see the bottom of the stem to make something worthy on top of it.',
        citation: 'Bhagavata Purana, Canto 3, Chapters 8–9'
      },
      {
        id: 'brahma-heads',
        title: 'Four Heads, Four Vedas, One Swan',
        subtitle: 'What the iconography is saying',
        storyText: 'Brahma\'s four heads face the four directions and speak the four Vedas — **knowledge looking every way at once**.\n\nIn his hands: the Vedas, a rosary counting time, a water pot holding the causal waters, a lotus. **No weapons; he is the only major deity who carries none.**\n\nAnd beneath him, his vahana: the **hamsa**, the swan the tradition credits with the ability to drink milk mixed with water and leave the water behind — discrimination, the power to separate what matters from what merely surrounds it.',
        teachingText: 'Read as a diagram, Brahma is a theory of creative work: wide attention, deep sources, patience with time, and no force — **creation cannot be done at swordpoint.**\n\nThe swan completes it: a maker\'s central skill is neither speed nor volume but knowing, in the mixture of everything available, **which part is the milk**.',
        citation: 'Standard Puranic iconography; the hamsa-discrimination motif is proverbial across Sanskrit literature'
      },
      {
        id: 'brahma-time',
        title: 'A Day of Brahma',
        subtitle: 'The largest clock ever imagined',
        storyText: 'The Puranas measure the universe in Brahma\'s time.\n\nOne day of Brahma — one **kalpa** — is a thousand cycles of the four ages: **4.32 billion human years**. At its end the worlds dissolve into night; at dawn they are made again. Brahma lives a hundred such years, and then he too ends, and after a pause, another begins.\n\nThe tradition arrived at time-spans of this scale — with cosmoses born and dissolved in endless series — while most of the world still counted history in a few thousand years.',
        sectionHeader: 'What the big clock is for',
        teachingText: 'This is not trivia; it is therapy. Every anxiety you have is happening inside an afternoon of a single day of a being who has days without number.\n\nThe scale is not meant to make you feel small — atman was never small — but to **right-size the things that claim to be enormous**: this quarter, this failure, this feud. The tradition keeps a clock that makes empires look brief, precisely so its people can hold their crises lightly.',
        citation: 'Kalpa reckoning: Bhagavata Purana, Canto 3, Chapter 11; Vishnu Purana, Book 1'
      }
    ],
    sources: [
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 3, Chapters 8–11 (lotus birth, creation, time reckoning)',
        translation: 'wisdomlib.org (public)',
      },
      {
        text: 'Shiva Purana',
        locator: 'Vidyeshvara Samhita (Lingodbhava — the pillar of light and the ketaki lie)',
        translation: 'J.L. Shastri edition / wisdomlib.org',
      },
      {
        text: 'Padma Purana',
        locator: 'Srishti Khanda (the Pushkar yajna tradition)',
      },
    ],
    reflectionQuestions: [
      'A single day of Brahma outlasts empires. Does this week\'s biggest worry look smaller from that distance?'
    ]
  },
  {
    id: 'parvati',
    name: 'Parvati',
    sanskritName: 'पार्वती',
    titles: ['Uma', 'Gauri', 'Shailaputri (Daughter of the Mountain)', 'Annapurna', 'Aparna'],
    category: 'goddesses',
    description: 'The mountain\'s daughter who out-disciplined the great ascetic — love as tapasya',
    mythology: 'Parvati is Shakti choosing a human-scale story. In a former life she was Sati, who died defending her husband Shiva\'s honor at her father\'s sacrifice. Reborn as the daughter of Himavan, king of mountains, she loved Shiva again from childhood — but Shiva had become the arch-ascetic, sealed in grief and meditation. Beauty did not move him; the love-god who tried was burned to ash. So Parvati matched him: she went into the mountains and practiced austerities so fierce the sages came to learn from her, until Shiva himself came down to test, and then to marry, the one being whose discipline equaled his. Their household — with Ganesha and Kartikeya — is the tradition\'s image of divinity domesticated: the absolute, at home.',
    attributes: ['Devotion as discipline', 'Motherhood', 'Persistence', 'The power (Shakti) within stillness'],
    symbols: ['Mountain', 'Lion', 'Trident (shared with Shiva)', 'The half of Ardhanarishvara'],
    mantras: [
      {
        id: 'parvati-mula',
        sanskrit: 'ॐ पार्वत्यै नमः',
        transliteration: 'oṁ pārvatyai namaḥ',
        meaning: 'Om, salutations to Parvati',
        purpose: 'For steadfast love, family harmony, and strength in commitment',
        benefits: ['Perseverance', 'Harmony at home', 'Devoted focus']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A serene golden-complexioned goddess, often beside Shiva or with her sons',
      clothing: 'Red sari of the auspicious married woman',
      colors: ['Red', 'Gold', 'Green'],
      objects: ['Lotus', 'Mirror', 'Trident when fierce'],
      vehicle: 'Lion',
      posture: 'Seated with Shiva on Kailash, or standing in austerity on one foot',
      facesAndArms: 'One face, two or four arms; as Ardhanarishvara, the left half of Shiva\'s own body'
    },
    teachings: [
      'What beauty cannot win, discipline can',
      'Love is not a feeling but a practice sustained through winters',
      'The householder\'s life is a spiritual arena equal to the ascetic\'s cave',
      'Shakti — power — is the goddess\'s to give: Shiva without Parvati, says the tradition, is shava, a corpse'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'parvati-shiva-purana',
        text: 'puranas',
        section: 'Rudra Samhita, Parvati Khanda',
        relevance: 'Her birth, austerities, the burning of Kama, and the marriage to Shiva'
      }
    ],
    stories: [
      {
        id: 'parvati-tapasya',
        title: 'The Girl Who Out-Fasted the Ascetic',
        content: 'When beauty failed and the love-god lay in ashes for trying, Parvati changed strategy entirely. She left the palace for the mountain and began tapasya: summers inside four fires under the naked sun, winters standing in freezing streams, years eating only leaves — until she gave up even leaves, earning the name Aparna, "she of not even a leaf." The sages who thought they knew austerity came to watch a princess redefine it. At last a young brahmin arrived and tested her, cataloguing Shiva\'s flaws: an ash-smeared, snake-wearing, graveyard-haunting beggar. Parvati rose to leave rather than hear him slandered — and the brahmin caught her hand, revealing himself as Shiva, won.',
        moralLesson: 'She did not wait to be chosen; she became impossible to overlook — not by adornment but by discipline. And the final test was loyalty: she won him the moment she refused to profit from his criticism.',
        category: 'adventure',
        relatedScripture: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa\'s Kumarasambhava, Canto 5'
      },
      {
        id: 'parvati-annapurna',
        title: 'The Day Shiva Begged for Food',
        content: 'Shiva once declared, in the way of ascetics, that the world was maya — illusion — and food merely part of it. Parvati, goddess of the manifest world, decided to demonstrate. She vanished, and with her all nourishment vanished from the three worlds. Crops stood empty; hunger arrived like a season. The great renouncer discovered that transcendence is easier on a full stomach, took up a begging bowl, and walked to Kashi — where Parvati had set up a kitchen and was feeding everyone. Shiva held out his bowl. She filled it, smiling. He has acknowledged the necessity of Annapurna, the food-filled one, ever since.',
        moralLesson: 'A gentle correction to every spirituality that scorns the material: the body is the vehicle of every realization, and whoever feeds beings serves the absolute as surely as whoever meditates on it.',
        category: 'teaching',
        relatedScripture: 'Annapurna tradition of Kashi (Skanda Purana, Kashi Khanda; devotional tradition)'
      }
    ],
    worship: {
      bestTimes: ['Teej', 'Navratri (as forms of Devi)', 'Mondays with Shiva'],
      offerings: ['Red flowers', 'Bangles and sindoor', 'Sweets'],
      rituals: ['Teej fasts kept by women for marital wellbeing', 'Gauri puja'],
      fasting: ['Hartalika Teej'],
      pilgrimage: ['Kailash-Mansarovar', 'Annapurna Temple (Varanasi)', 'Meenakshi Temple (Madurai — as Meenakshi)'],
      dailyPractices: ['Care of the household offered as sadhana']
    },
    audioUrl: '/audio/pronunciation/parvati.mp3',
    podcastEpisodes: [],
    significance: 'Parvati is Shakti — the power without which, the tradition says outright, Shiva is a corpse — choosing marriage, motherhood, and the household as her arena, and thereby consecrating ordinary family life as a full spiritual path',
    modernRelevance: 'The patron of everyone whose spiritual practice looks like packed lunches and sustained commitment rather than mountaintops: Parvati\'s claim is that the household, done with her intensity, is the mountaintop',
    familyConnections: [
      { relationTo: 'shiva', relationship: 'Consort', description: 'Won through austerity; together they are Ardhanarishvara, one body halved' },
      { relationTo: 'ganesha', relationship: 'Mother', description: 'Shaped him from turmeric paste as guardian of her door' },
      { relationTo: 'durga', relationship: 'Fierce form', description: 'Durga and Kali arise from the same Shakti Parvati embodies gently' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: parvati-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/parvati-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'parvati-love-as-discipline',
        title: 'Love as a Discipline',
        subtitle: 'What do you do when beauty fails?',
        storyText: 'The story begins with a strategy that fails.\n\nParvati, advised by the gods, first approaches Shiva the conventional way: presence, charm, flowers in season, the love-god Kama enlisted to loose his arrow at the meditating ascetic. **Shiva opens his third eye and burns Kama to ash without rising.**\n\nThe lesson lands on Parvati like a door closing — and she makes the decision that defines her: if the ascetic cannot be moved by beauty, **she will meet him in his own arena**. She walks into the mountains and begins austerities that shame the professionals: fire in summer, ice-water in winter, then not even leaves for food.',
        sectionHeader: 'The proposal that was a test',
        teachingText: 'When Shiva finally comes to her, disguised, he tries one last door: he insults himself, listing every reason a princess should not marry a graveyard ascetic. Parvati turns to leave rather than hear it — loyalty even against apparent self-interest — and the disguise falls.\n\nThe tradition is precise about what won him: not the fasting itself but what the fasting proved — that **her love was a discipline and not a mood**. It is the least sentimental great love story ever told, and the most useful.',
        citation: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa, Kumarasambhava, Cantos 3–5'
      },
      {
        id: 'parvati-half-of-shiva',
        title: 'Half of God\'s Own Body',
        subtitle: 'Ardhanarishvara — the argument in one image',
        storyText: 'In one of the tradition\'s boldest images, Shiva and Parvati are shown as **a single standing figure split down the middle**: his half ash-white, matted-locked, still; her half golden, silk-clad, ornamented.\n\n**Ardhanarishvara** — the Lord who is half woman. The image is a theological argument: consciousness and energy, stillness and manifestation, the ascetic and the world are not rivals but halves of one body, and neither is complete alone.\n\nThe tradition says it in a proverb sharp enough to sting: **Shiva without Shakti is shava — a corpse.**',
        teachingText: 'Whatever your own polarity — the contemplative half that wants the cave and the engaged half that loves the world — Ardhanarishvara refuses the choice.\n\nThe complete life is not won by amputating either half but by **letting them share a spine**. Every householder who meditates and every meditator who shows up for family dinner is practicing this image.',
        citation: 'Ardhanarishvara iconography: Puranic and Agamic tradition; the Shiva/shava wordplay is proverbial in Shakta texts (cf. Saundarya Lahari 1)'
      },
      {
        id: 'parvati-annapurna-section',
        title: 'The Goddess of the Full Plate',
        subtitle: 'When the renouncer held out a bowl',
        storyText: 'The Annapurna story is Parvati\'s wit at its sharpest.\n\nShiva, in ascetic mood, dismisses the material world as illusion — food included. Parvati does not argue; **she withdraws.** And with the goddess of manifestation gone, food itself goes.\n\nThe world hungers, and eventually the great transcender of maya walks to Kashi with a begging bowl, to the kitchen his wife has opened there, and holds it out. **She serves him with a smile that has lasted three thousand years.** In Varanasi her temple stands to this day: Annapurna, she who is full of food.',
        sectionHeader: 'The holiness of the ordinary',
        teachingText: 'This is the tradition auditing its own excesses. Wherever spirituality drifts toward contempt for the body, the meal, the household — Annapurna is the correction: **try transcending without lunch.**\n\nFeeding people is not the errand you run so that someone else can do the real spiritual work. It is the real spiritual work, done in its most honest form.',
        citation: 'Annapurna of Kashi: Skanda Purana (Kashi Khanda) and living Varanasi tradition'
      },
      {
        id: 'parvati-mother',
        title: 'The Mother of New Beginnings',
        subtitle: 'A household on a mountaintop',
        storyText: 'Kailash, as the Puranas paint it, is **the strangest household in literature**: the ascetic father with snakes for ornaments, the mountain-princess mother, one son with an elephant\'s head shaped by her own hands from turmeric paste, another born to command the armies of heaven, a lion, a bull, a mouse, and a peacock in the yard.\n\nIt should not work, and it is the most beloved family in the tradition.\n\n**Parvati is its center of gravity** — the one who turned the great renouncer into a father, absolute stillness into a home.',
        teachingText: 'The tradition could have left divinity solitary and abstract. Instead its most worshipped god is half of a marriage, and the goddess who arranged that is the patron of everyone who has ever **built a family out of unlikely materials**.\n\nAsk her blessing not for a perfect household but for a whole one — held together, like hers, by a love that outlasted every winter it stood in.',
        citationLink: 'deity:ganesha',
        citation: 'The Kailash household: Shiva Purana, Rudra Samhita (Kumara Khanda); Ganesha\'s shaping: same, Kumara Khanda'
      }
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Rudra Samhita — Sati Khanda and Parvati Khanda (rebirth, tapasya, marriage); Kumara Khanda (Ganesha, Kartikeya)',
        translation: 'J.L. Shastri edition / wisdomlib.org',
      },
      {
        text: 'Kumarasambhava (Kalidasa)',
        locator: 'Cantos 3–5 (Kama\'s burning; Parvati\'s austerities; the disguised test) — classical literary retelling',
      },
      {
        text: 'Skanda Purana',
        locator: 'Kashi Khanda (the Annapurna tradition of Varanasi)',
      },
    ],
    reflectionQuestions: [
      'Parvati won Shiva through quiet, steady effort. What goal of yours needs steady practice more than attention?'
    ]
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    sanskritName: 'लक्ष्मी',
    titles: ['Shri', 'Padma (Lotus)', 'Chanchala (The Restless)', 'Bhagyalakshmi'],
    category: 'goddesses',
    description: 'Wealth as a current, not a pond — the goddess who stays only where she flows',
    mythology: 'When the gods and asuras churned the ocean of milk for the nectar of immortality, treasures rose one by one — and among the last, seated on a blooming lotus, came Shri Lakshmi, radiance itself. Every power in the universe wanted her; she looked past them all and chose Vishnu, the preserver — beauty and abundance electing to stand beside responsibility. She is the goddess of wealth in every sense the word will bear: money, yes, and also harvest, health, children, beauty, and the luster on a well-kept doorstep. Her nickname is the tradition\'s economics lesson: Chanchala, the restless one. Lakshmi does not stay where she is hoarded. She stays where she moves.',
    attributes: ['Abundance', 'Auspiciousness', 'Generosity', 'Beauty in order', 'Restlessness where hoarded'],
    symbols: ['Lotus', 'Gold coins flowing from her palm', 'Elephants pouring water', 'Owl'],
    mantras: [
      {
        id: 'lakshmi-mula',
        sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
        transliteration: 'oṁ śrīṁ mahālakṣmyai namaḥ',
        meaning: 'Om, with the seed-syllable of abundance, salutations to great Lakshmi',
        purpose: 'For prosperity that circulates — invoked at Diwali and on Fridays',
        benefits: ['Material wellbeing', 'Generosity of spirit', 'Gratitude for what flows']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A golden goddess of serene beauty seated or standing on a red lotus',
      clothing: 'Red and gold sari — the colors of auspicious abundance',
      colors: ['Gold', 'Red', 'Pink'],
      objects: ['Lotuses in two hands', 'Gold coins streaming from one palm', 'A blessing gesture in the last'],
      vehicle: 'Owl (Uluka) — seeing in darkness, a warning about wealth\'s blindness',
      posture: 'On a lotus above the waters, flanked by elephants pouring water over her',
      facesAndArms: 'One face, four arms'
    },
    teachings: [
      'Wealth is a current: dam it and it stagnates, circulate it and it multiplies',
      'Abundance chooses responsibility — Lakshmi picked Vishnu the sustainer',
      'Prosperity enters clean, lit, welcoming spaces: order is an offering',
      'The owl\'s warning: riches without vision is night'
    ],
    festivals: ['diwali-2025'],
    scriptureReferences: [
      {
        id: 'lakshmi-vishnu-purana',
        text: 'puranas',
        section: 'Book 1, Chapter 9',
        relevance: 'Her emergence from the churning ocean and choice of Vishnu'
      }
    ],
    stories: [
      {
        id: 'lakshmi-churning',
        title: 'Risen from the Churned Ocean',
        content: 'The churning of the milk ocean had already yielded wonders and horrors — the moon, the wish-giving cow, the world-poison that Shiva swallowed. Then the waters parted and Shri rose: seated on an open lotus, radiant enough that the churning stopped. The sages hymned her; celestial elephants poured sacred water over her; every god and asura straightened his posture. She held a garland, the choosing kind, and walked past power after power — past strength, past wealth, past cleverness — and placed it on Vishnu, the one whose work is to sustain. Abundance, given a free choice, chose the maintainer.',
        moralLesson: 'Prosperity is not won by the strongest grip; it settles on whoever can be trusted to sustain things. Become the kind of steward Lakshmi garlands.',
        category: 'origin',
        relatedScripture: 'Vishnu Purana, Book 1, Chapter 9; Bhagavata Purana, Canto 8'
      },
      {
        id: 'lakshmi-restless',
        title: 'Why She Is Called the Restless One',
        content: 'A proverb-story told across India: a miser once prayed so hard that Lakshmi consented to live in his house. He sealed his doors so she could never leave, stopped giving, stopped spending, stopped even lighting the lamps lest the oil run down. The house grew dark and airless — and one morning the miser found it empty of everything: comfort, guests, laughter, and finally the goddess herself, gone through the crack no lock can close. Lakshmi is Chanchala, the restless. She is not offended by wealth — she IS wealth. She is offended by stagnation.',
        moralLesson: 'The tradition\'s whole economics in one image: abundance is a flow that dies in a sealed vessel. Generosity is not the opposite of prosperity but its maintenance.',
        category: 'teaching',
        relatedScripture: 'Pan-Indian proverb tradition; the Chanchala epithet appears throughout Sanskrit devotional literature'
      }
    ],
    worship: {
      bestTimes: ['Diwali night (Lakshmi Puja)', 'Fridays', 'Sharad Purnima'],
      offerings: ['Lotus', 'Rice and coins', 'Sweets', 'Lit lamps in rows'],
      rituals: ['Diwali Lakshmi Puja with the house cleaned and lit', 'Kolam/rangoli at the threshold to welcome her'],
      fasting: ['Vaibhav Lakshmi vrat (Fridays)'],
      pilgrimage: ['Padmavati Temple (Tiruchanur)', 'Mahalakshmi (Kolhapur)', 'Ashtalakshmi (Chennai)'],
      dailyPractices: ['Keeping the threshold clean and lit', 'Giving before accumulating']
    },
    audioUrl: '/audio/pronunciation/lakshmi.mp3',
    podcastEpisodes: [],
    significance: 'Lakshmi sanctifies prosperity — the tradition refuses to make wealth shameful — while binding it to motion, stewardship, and light: she is why Diwali\'s lamps are lit and why the miser\'s dark house empties',
    modernRelevance: 'In an economy of hoarded fortunes and anxious scarcity, Lakshmi\'s theology reads like radical advice: wealth is a current to be kept moving, order and generosity are how you invite it, and an owl rides with it to warn you what riches without vision become',
    familyConnections: [
      { relationTo: 'krishna', relationship: 'Consort across avatars', description: 'Where Vishnu descends, she follows — as Sita beside Rama, as Rukmini beside Krishna' },
      { relationTo: 'saraswati', relationship: 'Counterpart', description: 'Wealth and wisdom, the tradition jokes, rarely share a house — a proverb about balancing both' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: lakshmi-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/lakshmi-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'lakshmi-choice',
        title: 'What Abundance Chooses',
        subtitle: 'A garland walked past every power',
        storyText: 'When Lakshmi rose from the churned ocean, the entire assembly of gods and demons stood as suitors.\n\nThe story slows down here on purpose: she carries a garland — the ancient gesture by which a woman chose — and reviews the candidates. Strength is there, and cunning, and raw force fresh from the churning.\n\nShe passes them all and garlands **Vishnu**: the god whose entire job description is **maintenance**. Not the most dazzling. The most reliable.',
        sectionHeader: 'The steward\'s secret',
        teachingText: 'The tradition is telling you how prosperity actually works. **Abundance does not stay with whoever grabs hardest; it settles where things are sustained** — the tended shop, the maintained friendship, the balanced ledger, the kept promise.\n\nIf you want Lakshmi\'s garland, the story says, do not perform brilliance. Demonstrate stewardship.',
        citation: 'Vishnu Purana 1.9; Bhagavata Purana, Canto 8 (samudra manthan)'
      },
      {
        id: 'lakshmi-flow',
        title: 'The Restless One',
        subtitle: 'Why hoarded wealth goes stale',
        storyText: 'Of all her thousand names, the tradition\'s most honest is **Chanchala** — the restless, the one who does not stay put.\n\nFolk tale after folk tale repeats the pattern: the miser who seals the goddess into his house and wakes to find everything gone; the generous household whose lamps somehow never run out of oil.\n\nHer iconography says it without words: coins stream from her open palm continuously. **Not a vault. A fountain.**',
        teachingText: 'This is a complete theory of wealth in one epithet. Money, energy, knowledge, love — everything Lakshmi governs behaves the same way: **it lives in circulation and dies in storage.**\n\nThe practical instruction hiding in the theology: build channels, not dams. Give from the flow and the flow continues; pinch it shut and you are the miser in the dark house, holding a full vault and nothing else.',
        citation: 'Chanchala epithet: pan-Indian devotional and proverb tradition; flowing-coin iconography is standard Lakshmi imagery'
      },
      {
        id: 'lakshmi-diwali',
        title: 'Why the Lamps Are for Her',
        subtitle: 'The theology of a clean, lit house',
        storyText: 'On Diwali night, hundreds of millions of households do the same three things: **clean the house to its corners, draw a welcome at the threshold, and set lamps in every window.**\n\nThe stated reason is one of the tradition\'s loveliest images — Lakshmi walks the earth that night, and she enters homes that are clean, bright, and open.\n\nLedgers are opened fresh; doorways are decorated; the dark and cluttered corner is, for one night at least, abolished.',
        sectionHeader: 'Order as invitation',
        teachingText: 'Strip the metaphor and it still runs: prosperity in every form favors **prepared, ordered, welcoming systems**. The cleaned house is the audited ledger, the maintained tool, the answered email, the tidy codebase.\n\nLakshmi Puja is the annual rehearsal of a daily truth — abundance is not summoned by wanting; it is welcomed by readiness. **Light the corner you have been avoiding.**',
        citationLink: 'festival:diwali-2025',
        citation: 'Diwali Lakshmi Puja: pan-Indian living tradition; see also Sri Sukta (Rig Veda khila) — the ancient hymn recited at her worship'
      },
      {
        id: 'lakshmi-owl',
        title: 'The Owl at Her Feet',
        subtitle: 'The warning built into the blessing',
        storyText: 'It is easy to miss, at the foot of all that gold: Lakshmi\'s vahana is **an owl**.\n\nThe tradition chose it deliberately and lets the double meaning stand. The owl sees in the dark — wealth rightly held illuminates places nothing else reaches. And the owl is blind in daylight — **the being who cannot see precisely when everything is bright.**\n\nSanskrit proverb sharpened the point long ago: riches without wisdom is an owl at noon.',
        teachingText: 'Every gift in this tradition ships with its own warning label, and the owl is Lakshmi\'s. **Wealth amplifies; it does not educate.** It will light the dark or blind you at noon depending entirely on what you bring to it.\n\nWhich is why the goddess of fortune is traditionally worshipped alongside Ganesha, remover of obstacles and lord of wisdom — the tradition refusing to hand you the gold without the sight.',
        citation: 'Uluka vahana: standard Lakshmi iconography, especially in Bengal; the paired Lakshmi–Ganesha Diwali worship is living tradition'
      }
    ],
    sources: [
      {
        text: 'Vishnu Purana',
        locator: 'Book 1, Chapter 9 (emergence from the ocean, choice of Vishnu)',
        translation: 'H.H. Wilson (public domain) / wisdomlib.org',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 8 (samudra manthan)',
        translation: 'wisdomlib.org (public)',
      },
      {
        text: 'Sri Sukta',
        locator: 'Rig Veda khila (appendix hymn) — the classical Lakshmi hymn',
        translation: 'traditional; public-domain renderings',
      },
    ],
    reflectionQuestions: [
      'Lakshmi stays where things keep flowing. What do you have plenty of — time, money, knowledge — that you could share more freely?'
    ]
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    sanskritName: 'सरस्वती',
    titles: ['Sharada', 'Vagdevi (Goddess of Speech)', 'Veenapani', 'Hamsavahini'],
    category: 'goddesses',
    description: 'The river that became the goddess of everything that flows: speech, music, learning',
    mythology: 'Saraswati is the oldest of the great goddesses still worshipped — she enters the Rig Veda as a mighty river, praised as "best of mothers, best of rivers, best of goddesses," and as the waters themselves went underground in legend, she flowed instead into everything else that moves like water: speech, thought, music, learning. She is the tradition\'s statement that knowledge is sacred in itself. Dressed in white with no gold at all, seated on a white lotus with a veena in her hands, a book and a rosary beside her, a swan at her feet — she is the one great deity who owns almost nothing, and the one whom students, musicians, and writers cannot do without.',
    attributes: ['Knowledge', 'Speech and eloquence', 'Music', 'Purity of focus', 'The wealth that grows when given'],
    symbols: ['Veena', 'Book', 'White lotus', 'Swan', 'Flowing water'],
    mantras: [
      {
        id: 'saraswati-vandana',
        sanskrit: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता',
        transliteration: 'yā kundendu-tuṣāra-hāra-dhavalā yā śubhra-vastrāvṛtā',
        meaning: 'She who is white as jasmine, the moon, and snow, robed in white… (opening of the Saraswati Vandana)',
        purpose: 'Recited before study, music practice, and examinations',
        benefits: ['Clarity of mind', 'Eloquence', 'Steadiness in learning']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A luminous goddess in plain white, serene and absorbed, without ornament',
      clothing: 'White sari — the absence of distraction',
      colors: ['White'],
      objects: ['Veena (played with two hands)', 'Book (the Vedas)', 'Crystal rosary'],
      vehicle: 'Hamsa — the swan of discrimination; sometimes the peacock, warned against vanity',
      posture: 'Seated on a white lotus by flowing water',
      facesAndArms: 'One face, four arms'
    },
    teachings: [
      'Knowledge is the one wealth that grows when you give it away',
      'Plain white amid the golden gods: learning needs no ornament',
      'Speech is a river — it nourishes or floods depending on its banks',
      'Music and mathematics sit in the same lap'
    ],
    festivals: ['basant-panchami-2025'],
    scriptureReferences: [
      {
        id: 'saraswati-rigveda',
        text: 'vedas',
        section: '6.61; 2.41.16',
        relevance: 'The river hymns — "best of mothers, best of rivers, best of goddesses" — the goddess\'s oldest layer'
      }
    ],
    stories: [
      {
        id: 'saraswati-river',
        title: 'The River That Went Underground',
        content: 'In the Rig Veda, Saraswati is no metaphor: she is a vast river of the northwest, "surpassing in majesty and might all other waters," on whose banks the hymns themselves were composed. Tradition holds that as ages passed the river dwindled and vanished into the desert — and the tradition\'s response is the whole story: the goddess did not die with her waters. She went underground like her river and surfaced as every other kind of flow — the stream of speech, the current of thought, the river of music running through a raga. At Prayag, where two visible rivers meet, the tradition insists a third joins them invisibly: Saraswati, still flowing where only the mind can see.',
        moralLesson: 'What is truly essential does not perish when its first form does — it changes channel. The river became learning itself, and her worshippers dip into it daily.',
        category: 'origin',
        relatedScripture: 'Rig Veda 6.61, 7.95; the Triveni Sangam tradition of Prayag'
      },
      {
        id: 'saraswati-basant',
        title: 'The Day the Books Rest',
        content: 'On Vasant Panchami, the fifth day of spring, Saraswati\'s worshippers do something almost paradoxical: students place their books, pens, and instruments at her altar — and do not study. The tools rest at the goddess\'s feet for the day. Small children are brought to write their first letters that morning, a grain of rice or a slate under a guiding hand, the alphabet begun as a sacrament. Mustard fields bloom yellow, her devotees wear yellow, and for one day the whole apparatus of learning is treated not as a grind but as a grace.',
        moralLesson: 'The tradition knows that tools become burdens unless regularly re-consecrated. Rest the instruments, honor the source, and begin again as if writing your first letter.',
        category: 'teaching',
        relatedScripture: 'Vasant Panchami / Vidyarambham living tradition across India'
      }
    ],
    worship: {
      bestTimes: ['Vasant Panchami', 'Before examinations and performances', 'Navratri\'s final days (South India: Saraswati Puja)'],
      offerings: ['White flowers', 'Yellow sweets on Vasant Panchami', 'The tools of one\'s learning, laid at the altar'],
      rituals: ['Vidyarambham — a child\'s first letters written at her altar', 'Books and instruments rested and honored'],
      fasting: [],
      pilgrimage: ['Basar Saraswati Temple (Telangana)', 'Sharada Peeth (tradition)', 'Koothanur (Tamil Nadu)'],
      dailyPractices: ['Saraswati Vandana before study or practice', 'Treating books and instruments with physical respect']
    },
    audioUrl: '/audio/pronunciation/saraswati.mp3',
    podcastEpisodes: [],
    significance: 'Saraswati consecrates knowledge as an end in itself — the tradition\'s oldest goddess presiding over its most renewable wealth, the only treasure that multiplies by being given away',
    modernRelevance: 'Patron of every student, musician, coder, and writer: her plain white amid the golden pantheon is a standing argument that in an economy of noise and ornament, undivided attention is the rarest luxury',
    familyConnections: [
      { relationTo: 'brahma', relationship: 'Consort', description: 'Creation keeps knowledge beside it; what Brahma makes, Saraswati makes intelligible' },
      { relationTo: 'lakshmi', relationship: 'Counterpart', description: 'Wisdom and wealth — the tradition\'s proverb jokes that they rarely share a roof, a warning to court both' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: saraswati-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/saraswati-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'saraswati-oldest',
        title: 'The Oldest Goddess Still Worshipped',
        subtitle: 'From riverbank to raga',
        storyText: 'Before she held a veena, Saraswati held a watershed.\n\nIn the **Rig Veda** — humanity\'s oldest religious text in continuous use — she is a physical river, hymned with awe: best of mothers, best of rivers, best of goddesses. The sages composed on her banks; her water was the first thing the tradition called sacred.\n\nThen, over centuries, the river of legend dwindled into the desert — and the goddess performed **the most graceful pivot in religious history**. She went underground and resurfaced as every flow that remained: speech, memory, mathematics, music. The river became the current of thought itself.',
        teachingText: 'There is a teaching in the transformation beyond the history: **what is essential survives the loss of its original container.**\n\nWhen a chapter of your life dries up — a career, a role, a place — the Saraswati move is not to mourn the riverbed but to ask **where the water went**. It is usually still flowing, one channel over.',
        citation: 'Rig Veda 6.61 and 2.41.16, tr. Griffith (public domain); the vanished-river and Triveni traditions'
      },
      {
        id: 'saraswati-white',
        title: 'Why She Wears No Gold',
        subtitle: 'The iconography of attention',
        storyText: 'Stand her beside the other great goddesses and the contrast is the message. Lakshmi streams gold; Durga bristles with borrowed weapons; **Saraswati wears plain white** and owns, by divine standards, almost nothing. Every element is about undivided attention:',
        bullets: [
          '**White** — the color before distraction.',
          '**The veena** — mastery that takes ten thousand quiet hours.',
          '**The book** — the patient accumulation of understanding.',
          '**The rosary** — repetition.',
          '**The swan** — discrimination; the fabled ability to drink the milk and leave the water.'
        ],
        sectionHeader: 'The luxury of focus',
        teachingText: 'The tradition dressed its knowledge-goddess in the absence of ornament on purpose: **learning does not need decoration, and mostly cannot survive it.** In an age engineered to shatter attention, Saraswati\'s plain white is almost political.\n\nThe instruction hiding in the image: to learn anything real, **subtract**. One instrument, one book, one repetition at a time, and the swan\'s ruthless question of everything you consume — milk, or water?',
        citation: 'Standard Saraswati iconography; Saraswati Vandana (traditional invocation) for the whiteness imagery'
      },
      {
        id: 'saraswati-speech',
        title: 'The Goddess in Your Mouth',
        subtitle: 'Speech as a river with banks',
        storyText: 'Her deepest identification is with **vak** — speech, the power of the word.\n\nThe Vedic tradition regarded speech not as labels pasted on things but as **a creative force**: the hymns were heard, not composed, and to speak truly was to participate in the world\'s making.\n\nSaraswati is that power personified, which is why she is **Vagdevi**, goddess of the word, and why a traditional blessing says she should dwell on a person\'s tongue. When someone speaks with unusual grace or truth, the old idiom is literal: Saraswati sits in their mouth.',
        teachingText: 'A river nourishes when it has banks and floods when it does not — and speech is exactly such a river.\n\nThe daily practice her tradition suggests is **an audit of the word**: is what I am about to say true? Is it useful? Does it flow toward or away from understanding? To honor Saraswati is not to speak beautifully; it is to treat the power of the word as sacred enough to bank.',
        citation: 'Vak in the Vedic tradition: Rig Veda 10.125 (the Vak Sukta); Vagdevi epithet, traditional'
      },
      {
        id: 'saraswati-giving',
        title: 'The Wealth That Grows When Given',
        subtitle: 'Vasant Panchami and the first letters',
        storyText: 'On Vasant Panchami, when the mustard fields turn the color of her festival, small children across India are carried to her altar to **write their first letters** — a finger guided through the alphabet in a plate of rice.\n\nThe tradition calls it **Vidyarambham**, the beginning of knowledge, and treats it with the gravity of a sacrament, because it is one.\n\nThe child is being inducted into the one form of wealth with a miraculous property: **split any other treasure and each share shrinks. Split knowledge — teach it — and both shares grow.**',
        sectionHeader: 'The teacher\'s economy',
        teachingText: 'A Sanskrit proverb states her economics plainly: knowledge is the wealth that **thieves cannot steal, kings cannot tax, and giving cannot diminish** — it grows by being spent.\n\nThis is why the guru sits so high in this tradition, and why the truest Saraswati worship is not the flowers but the explaining: every time you teach what you know, you are performing her puja in its original form.',
        citationLink: 'festival:basant-panchami-2025',
        citation: 'Vidyarambham / Vasant Panchami: living tradition; the knowledge-wealth proverb: Subhashita tradition (traditional Sanskrit verse)'
      }
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: '6.61 and 2.41.16 (the river hymns); 10.125 (Vak Sukta, the speech hymn)',
        translation: 'Ralph T.H. Griffith (public domain)',
      },
      {
        text: 'Saraswati Vandana',
        locator: 'Traditional invocation ("yā kundendu…") recited before study',
        translation: 'traditional text',
      },
      {
        text: 'Living tradition',
        locator: 'Vasant Panchami / Vidyarambham first-letters ceremony; Triveni Sangam (Prayag) tradition of the invisible river',
      },
    ],
    reflectionQuestions: [
      'Saraswati\'s knowledge grows by being given away. What do you know well that you\'ve never taught anyone?'
    ]
  }
];

// Utility functions

// Every deity, for browse surfaces. This used to be `getMajorDeities()`, which
// filtered to `category === 'major'` and so silently hid Parvati, Lakshmi and
// Saraswati (all `goddesses`) from the Learn tab. They were reachable only via
// the guided journey — so trimming the journey would have orphaned them with no
// entry point anywhere in the app. Browse shows everything; the journey curates.
export const getAllDeities = (): Deity[] => deitiesData;

export const getDeityById = (id: string): Deity | undefined => {
  return deitiesData.find(deity => deity.id === id);
};

export const getDeitiesByCategory = (category: string): Deity[] => {
  return deitiesData.filter(deity => deity.category === category);
};

export default deitiesData;