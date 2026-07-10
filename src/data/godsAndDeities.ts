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
  // Chapter-style reflection questions (exactly 3, Gita pattern)
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
      heroImage: require('../../assets/images/covers/krishna-cover.png'),
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
        storyText: 'Every deity in the tradition carries an aspect of the divine; Krishna\'s devotees make a bolder claim — that in him the whole of it came at once. He is the butter thief and the speaker of the Gita, the flute player of Vrindavan and the strategist of Kurukshetra, the child in Yashoda\'s lap and — when she looked into his mouth — the container of Yashoda, Vrindavan, and every galaxy. The Bhagavata Purana\'s tenth canto, the most beloved book in devotional Hinduism, insists on holding all of these together: the point of Krishna is that the absolute is also adorable, and the adorable is also absolute.',
        teachingText: 'Krishna\'s completeness is a teaching about your own life: the sacred does not wait for your solemn moments. It is as present in play, mischief, music, and love as in scripture and battle-duty. A spirituality with room for the flute as well as the sermon is the one this god embodies.'
      },
      {
        id: 'krishna-prison-to-pasture',
        title: 'Born in a Prison, Raised in a Pasture',
        subtitle: 'A Basket Crossing the Yamuna at Midnight',
        storyText: 'His story begins where Janmashtami\'s does: the tyrant Kamsa, the prophecy, the prison birth at midnight, the locks opening, and Vasudeva carrying the child across the flooding Yamuna to safety in Gokul (Bhagavata Purana, Canto 10, Chapters 1–4). What the tradition savors is the sequel: the rescued god grew up not in a palace preparing his revenge, but in a cowherd village — barefoot, butter-smeared, beloved. The divine chose ordinary rural childhood: churning, herding, flooding rivers, village festivals. Every dusty detail of common life was good enough for God to live in.',
        teachingText: 'Krishna\'s pastoral years dignify every unglamorous stretch of a life. If the divine spent years herding cows and stealing butter before speaking the Gita, then your own ordinary seasons — the commutes, the childcare, the unremarkable years — are not the waiting room of your real life. They may be the part heaven remembers most fondly.'
      },
      {
        id: 'krishna-butter-and-love',
        title: 'The Thief Who Steals Only from Those Who Love Him',
        subtitle: 'A Toppled Pot, White Footprints Leading Away',
        storyText: 'The butter theft is the tradition\'s most cherished paradox: the Lord of the universe, sneaking. The gopis of Vrindavan hung their butter pots higher, and he built pyramids of friends; they locked the doors, and he was inside anyway; they marched to Yashoda to complain, and stood there hoping he\'d raid their kitchens next. The Bhagavata\'s poets understood exactly what they were doing: butter is the heart\'s sweetness, churned from a whole life, and Krishna steals only what is already his — and only from homes that love him. Where there is no love, he does not even trespass.',
        teachingText: 'The butter thief inverts the whole economy of worship: the divine is not fed by your offerings — it is hungry for your love specifically, and delights in taking it playfully rather than receiving it formally. Prayer, in Vrindavan\'s dialect, is leaving the window unlatched.'
      },
      {
        id: 'krishna-flute',
        title: 'The Sound That Calls Everyone Home',
        subtitle: 'A Bamboo Flute at Dusk, Cows Turning Their Heads',
        storyText: 'Of all Krishna\'s emblems, the tradition loves the flute most. At dusk in Vrindavan he would play, and the Bhagavata describes the whole world leaning toward the sound — cows lifting their heads, rivers slowing, the gopis leaving whatever was in their hands (Canto 10, Chapter 21). The saints read the symbol lovingly: a flute is a reed emptied of itself — hollowed, holed, and only therefore musical. Whoever becomes empty enough, the divine breath plays through.',
        teachingText: 'The flute asks the question all contemplatives eventually face: what fills you that the music cannot pass through? The ego\'s knots are the reed\'s blockages. The practices — reflection, offering, remembrance — are the slow hollowing. And the promise is Vrindavan\'s: emptied, a life doesn\'t become vacant. It becomes the instrument.'
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
        storyText: 'When the great war came, Krishna made a choice that defines him: offered the pick between his armies and himself unarmed, the wise took the unarmed god. He drove Arjuna\'s chariot — held the reins, took no weapon, and in the field between two armies delivered the Bhagavad Gita. The arrangement is the theology: the divine does not fight your battle for you, and does not abandon you to it. It sits at the front of your chariot, holding the horses, speaking truth exactly when despair strikes — and near the end tells you where it has been all along: in the heart, of everyone, always (18.61).',
        teachingText: 'Whatever battlefield you are facing, Krishna\'s position is the promise: not a substitute who fights instead of you, not a spectator — a charioteer. Guidance at the reins, the fighting still yours. The Gita is what the charioteer says. This whole app, in a sense, is an attempt to keep that voice within reach of your chariot.'
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
        locator: '18.61 (the Lord in all hearts); the Gita entire as Krishna\'s teaching at Kurukshetra',
        translation: 'Swami Sivananda (public domain)',
      },
    ],
    reflectionQuestions: [
      'Krishna lived years of ordinary village life before speaking the Gita. Which "unremarkable" season of your own life might heaven remember most fondly — and what did it quietly build in you?',
      'The flute makes music only because it is empty. What fills you that the music cannot pass through — and what would one small hollowing look like?',
      'Krishna drives the chariot but does not fight the battle. In your current struggle, what belongs to the charioteer — and what part is unavoidably yours to fight?'
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
      heroImage: require('../../assets/images/covers/rama-cover.png'),
      iconImage: '/images/deities/rama-icon.jpg',
      galleryImages: ['/images/deities/rama-sita.jpg', '/images/deities/rama-court.jpg']
    },
    sections: [
      {
        id: 'rama-ideal',
        title: 'The Man Who Never Broke',
        subtitle: 'A Straight Line Drawn Through a Crooked World',
        storyText: 'Rama\'s title is unique among the gods: Maryada Purushottama — the supreme man of boundaries, the one who never once crossed the line of dharma. Where Krishna bends rules with a smile, Rama holds them with his life. The Valmiki Ramayana presents him not as a god acting a part but as a man — tempted, bereaved, furious, heartbroken — who at every fork chooses the harder right over the easier wrong. That is precisely why India gave him its highest reverence: anyone can admire a god\'s perfection; Rama\'s perfection is the kind a human being could bleed for and still choose.',
        teachingText: 'Rama\'s question for your life is the boundary question: what line would you not cross at any price — not when it costs a kingdom, not when it costs fourteen years? A person who has answered it walks differently. The Ramayana is one long demonstration of that walk.'
      },
      {
        id: 'rama-word',
        title: 'A Father\'s Word, Kept by the Son',
        subtitle: 'Royal Ornaments Set Down Without a Tremor',
        storyText: 'The exile (Ayodhya Kanda) turns on a single principle: a promise does not expire because keeping it became expensive. Dasharatha\'s old boon to Kaikeyi was legally his to break and emotionally everyone\'s to excuse — the whole city begged Rama to ignore it. He would not, because the word of the house of Raghu was the house of Raghu: "Rama does not speak two ways." He kept a promise he never made, at a price he did not owe, to preserve a thing no one could see — and the tradition judged that invisible thing worth more than the visible throne.',
        teachingText: 'Every family and institution runs on invisible collateral: the confidence that its word means something. Each kept promise deposits; each clever escape withdraws. Rama\'s extreme is a compass, not a demand — but ask what your own word is currently worth to the people who hold it, and what one expensive kept promise would do to that account.'
      },
      {
        id: 'rama-exile-years',
        title: 'Fourteen Years of Forest',
        subtitle: 'A Palace Prince Learning the Names of Trees',
        storyText: 'The exile was not an interlude; it was the making. In the forest (Aranya Kanda), the prince became something Ayodhya could never have taught him: a man acquainted with hardship, with hermits and tribal chiefs, with hunger, with the grief of losing Sita to Ravana\'s deceit. His alliances there — Guha the boatman, the vulture Jatayu who died defending Sita, Shabari with her berries, Hanuman and the vanaras — were friendships of the excluded, and they, not Ayodhya\'s armies, won the war. When he returned to rule, he ruled as a king who had slept on the ground of his own kingdom.',
        teachingText: 'The forest years reframe every derailment: the demotion, the illness, the season everything was taken away. Rama\'s exile suggests the wilderness is where your future allies are met and your real education happens — and that the ones who return from it rule differently. What did (or does) your forest teach that the palace never could?'
      },
      {
        id: 'rama-bridge',
        title: 'The Bridge and the Squirrel',
        subtitle: 'An Ocean Crossed Stone by Floating Stone',
        storyText: 'To reach Lanka and Sita, an ocean had to be crossed. The army of monkeys and bears built a bridge of floating stones (Yuddha Kanda) — and the tradition\'s favorite worker on it is the smallest: a squirrel, rolling in sand and shaking it between the stones. When the great monkeys laughed, Rama picked the squirrel up and stroked its back — the stripes squirrels carry to this day, says the beloved tale. The bridge held. The war was won by an alliance in which every contribution, from Hanuman\'s mountain-carrying to the squirrel\'s sand, counted as sacred.',
        teachingText: 'Every great work is a bridge of odd stones — and its Rama is the one who makes the smallest contributor feel stroked on the back, not laughed at. In whatever you are building, notice who is carrying sand. The leader\'s hand on the squirrel is why the army stays an army.'
      },
      {
        id: 'rama-name',
        title: 'The Name That Outlived the Man',
        subtitle: 'Two Syllables Carried Across Centuries',
        storyText: 'Rama\'s final gift to India is the smallest: his name. "Ram-nam" became the tradition\'s most portable practice — the greeting of villages, the chant of Kabir\'s weavers and Tulsidas\'s verses, the word Gandhi carried, the sound accompanying millions to the funeral ground: "Ramanama satya hai." The tradition even claims the name outweighs the man — the stones of the bridge floated, one telling goes, because his name was written on them, while stones Rama threw himself sank. Whatever else is beyond reach on a given day — scripture, temple, teacher — two syllables are not.',
        teachingText: 'The practice is as simple as it sounds and older than any app: a name, said with attention, as often as remembered — walking, waiting, worrying. Pick your name for the divine (Rama\'s or another) and let it run under a single ordinary day. That thread, the tradition promises, is strong enough to hold everything else.'
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
      'Rama had one line he would not cross at any price. Do you know yours? What has holding it — or not yet naming it — cost you?',
      'The forest, not the palace, made Rama the king he became. What has your hardest season taught you that comfort never could — and who were the allies you met only there?',
      'On Rama\'s bridge, the squirrel\'s sand counted as sacred work. In what you\'re building now, who is carrying sand — and when did you last stroke the squirrel\'s back?'
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
      // TODO cover shopping list: replace with a real ganesha-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/ganesha-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'ganesha-threshold',
        title: 'The God of Thresholds',
        subtitle: 'A Doorway Garlanded with Marigolds',
        storyText: 'Before a Hindu wedding begins, before a shop opens its first ledger, before a child writes the first letter of the alphabet, one name is spoken: Ganesha. He is Vighnaharta, the remover of obstacles, and every threshold belongs to him — doorways, journeys, new ventures, first pages. This custom traces straight back to his origin story, where Shiva decreed that the boy he had wounded and restored would be worshipped first among all the gods. The teaching hidden in the custom is quietly profound: every beginning carries fear, and the tradition answers fear not with a pep talk but with a companion.',
        teachingText: 'Notice what you do at your own thresholds. Do you rush through beginnings — new jobs, new relationships, new years — or do you pause and consecrate them? Beginning with prayer, or even a deliberate breath of intention, changes the spirit of everything that follows. That is Ganesha\'s first lesson, and you don\'t need an elephant\'s head to practice it.'
      },
      {
        id: 'ganesha-born-of-devotion',
        title: 'Born at a Door, Remade by Grace',
        subtitle: 'Parvati Shaping a Boy from Turmeric',
        storyText: 'The Shiva Purana tells Ganesha\'s birth without softening it. Parvati creates a son from the turmeric paste of her own body and posts him at her door; Shiva, unrecognized and enraged, beheads the boy; Parvati\'s grief threatens the cosmos; and the child is restored with an elephant\'s head, then raised higher than he stood before — first among the ganas, first in every prayer. It is a family story of terrible misunderstanding and greater repair, and Hindu tradition placed it at the very front of all worship.',
        teachingText: 'Every family carries a version of this story — the clash that came from not recognizing each other, the wound that seemed unforgivable. The Purana\'s answer is not that the wound didn\'t matter, but that repair can be so complete it transforms the wounded one\'s place in the family. Where in your life is a beheaded relationship waiting for an elephant\'s head — an imperfect, unlikely, generous repair that restores more than was lost?'
      },
      {
        id: 'ganesha-iconography',
        title: 'Reading the Elephant-Headed Form',
        subtitle: 'Large Ears, Small Eyes, One Tusk',
        storyText: 'Ganesha\'s form is a teaching you can read. The elephant head: wisdom, memory, and gentleness joined to strength. The large ears: listen more. The small eyes: concentrate, see one thing deeply. The trunk: strong enough to uproot a tree, delicate enough to lift a blade of grass — true skill bends to the task. The single tusk: keep what serves, sacrifice what must be given (he is Ekadanta, the one-tusked). The large belly: digest all of life, sweet and bitter alike. The modak in his hand: the sweetness of the inner life, earned by practice. And beneath this mountain of a god, his vehicle — a small mouse: even the restless, scurrying mind can carry wisdom, once wisdom is seated firmly upon it.',
        teachingText: 'Pick one feature and live it for a week. Listen like the ears. Focus like the eyes. Adapt like the trunk. The murti is not a portrait; it is a curriculum.'
      },
      {
        id: 'ganesha-wisdom-over-speed',
        title: 'Wisdom Outruns the World',
        subtitle: 'A Boy on a Mouse Beating a Peacock',
        storyText: 'In the contest with his brother Kartikeya — who circled the actual globe on a peacock — Ganesha won by walking around his parents and calling them his world. The story is beloved by children, but its edge is for adults: we spend years racing peacocks, circling the world for validation, while the thing that actually completes us sits quietly at home. Ganesha\'s prize was marriage to Siddhi and Buddhi — attainment and wisdom — the Purana\'s way of saying what insight weds you to.',
        teachingText: 'What race are you running right now, and who set its course? Sometimes the dharmic move is not to run faster but to redefine the circuit — to walk around what you love and call it enough. Ask yourself Ganesha\'s question before your next sprint: is the finish line I\'m chasing actually the world, or is my world somewhere I stopped looking?'
      },
      {
        id: 'ganesha-patron-of-learning',
        title: 'Patron of the First Page',
        subtitle: 'A Broken Tusk Held Like a Pen',
        storyText: 'It is fitting that the Mahabharata — the epic that contains the Bhagavad Gita — begins with Ganesha holding the pen. His two conditions with Vyasa carry his whole philosophy of learning: never stop the flow, and never write faster than you understand. Students across India still invoke him before study, and writers before a blank page, because both know the twin dangers he guards against — abandoning the work, and doing it mindlessly.',
        teachingText: 'Bring his two conditions to whatever you are learning now. Flow: touch the work daily, even briefly, without breaking the chain. Understanding: never let your output — notes, opinions, replies — outrun your comprehension. And when your instrument fails mid-verse, remember the tusk: the tools are replaceable; the commitment is not.'
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
      'Ganesha guards thresholds — every beginning is sacred to him. What are you beginning right now, and how might you honor that beginning instead of rushing through it?',
      'In the race with his brother, Ganesha won by circling his parents and calling them his world. What race are you running that might be the wrong circuit — and what would "walking around what you love" look like instead?',
      'Ganesha would not write faster than he understood. Where in your life is your output — words, decisions, commitments — outrunning your understanding?'
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
      // TODO cover shopping list: replace with a real shiva-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/shiva-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'shiva-stillness',
        title: 'The God Who Sits Still',
        subtitle: 'A Snow Peak, a Closed Eye, the World Below',
        storyText: 'Every other god is busy. Vishnu preserves, Brahma creates, Indra storms, Lakshmi bestows. Shiva sits. On the frozen summit of Kailasa, eyes half-closed, ash-smeared, unmoving — the tradition\'s boldest claim rendered as a posture: that beneath all doing there is a being, and the one who touches it holds more power in stillness than the busy hold in motion. He is called Mahadeva, the great god, yet owns nothing but a tiger skin, a trident, and a drum. When the demons and devas need someone to drink the world\'s poison, they do not go to the palaces. They climb to the silent one.',
        teachingText: 'Your life likely resembles the busy gods\' — preserving, creating, storming. Shiva asks a subversive question: when did you last sit with nothing to do and nothing to become? Five minutes of genuine stillness — not rest-as-recovery-for-more-work, but stillness for its own sake — is his practice. Everything else in his story flows from that seat.'
      },
      {
        id: 'shiva-poison',
        title: 'Drinking the Poison',
        subtitle: 'A Blue Throat Above a Saved World',
        storyText: 'The churning of the ocean is the tradition\'s great parable of ambition: gods and demons together, straining for the nectar of immortality. And the first yield of all that striving was poison — halahala, enough to burn the three worlds. It is an honest story about effort: churn anything hard enough — a career, a family, a country — and the poison surfaces before the nectar. Everyone fled it. Shiva, who had not churned and wanted no nectar, drank it, and Parvati held his throat so it would lodge there and go no further. The worlds resumed their churning. He kept only the blue stain.',
        teachingText: 'Every family, team, and community produces halahala — resentment, grief, blame — before it produces nectar. Someone must metabolize it without passing it on. Notice who does that where you live and work; notice when it is you. The teaching is exacting: hold it in the throat. Neither swallow it into your depths, nor spray it onward. That narrow place between suppression and transmission is where Shiva lives.'
      },
      {
        id: 'shiva-ganga-bearer',
        title: 'The One Who Breaks the Fall',
        subtitle: 'A River Landing in Matted Hair',
        storyText: 'Bhagiratha\'s ancestors could only be liberated by the Ganga\'s waters, and his penance finally persuaded her to descend. But grace at full force is indistinguishable from catastrophe: the river\'s fall from heaven would have split the earth. So Shiva stood beneath the descent, took the impact on his head, and let the torrent wander through his hair until it emerged as a river the earth could bear (Valmiki Ramayana, Bala Kanda, sargas 42–44). The Ganga that blesses the plains is the Ganga after Shiva — the same power, made survivable.',
        teachingText: 'Think of what has descended on your family line — money or its absence, expectations, old grief. Someone in every lineage stands where Shiva stood and breaks the fall, so what reaches the next generation blesses instead of shatters. Naming who did that for you is gratitude; choosing to do it for those after you is dharma.'
      },
      {
        id: 'shiva-householder',
        title: 'The Ascetic Who Married',
        subtitle: 'Kailasa as a Family Home',
        storyText: 'The wild, ash-smeared renunciant is also the tradition\'s most beloved family man. Parvati won him not by beauty — he burned Kama, desire itself, to ash with his third eye when desire was aimed at him — but by tapasya, matching his austerity with her own until he recognized an equal. Their marriage joins what the world calls opposites: the hermit and the queen\'s daughter, stillness and devotion. Their household on Kailasa — Parvati, Ganesha, Kartikeya, the bull Nandi at the door — became the model of a family built around a meditative center rather than around busyness.',
        teachingText: 'Shiva refutes the idea that depth requires leaving. He is fully ascetic and fully married; the meditation does not end when the family begins. What would it mean for your household to have a still center — one practice, one hour, one corner of the home where the churning stops? The tradition\'s answer to work-life balance is not balance but a center.'
      },
      {
        id: 'shiva-simple-offering',
        title: 'The Easily-Pleased Lord',
        subtitle: 'One Bilva Leaf and a Handful of Water',
        storyText: 'Of all the great gods, Shiva is Bholenath — the innocent, the easily pleased. His worship requires no priest, no wealth, no elaborate rite: a bilva leaf, water poured over a stone linga, his name said with attention. The tradition delights in stories of accidental worship — a hunter who unknowingly dropped bilva leaves on a linga through a night of fear and was liberated by dawn. The theological point is serious: the divine measures sincerity, not production value. The god who owns nothing cannot be impressed by what you own.',
        teachingText: 'Whatever your practice is becoming, Shiva keeps it honest: could you do it with one leaf and a palmful of water? If your spiritual life has grown elaborate — apps, courses, gear — strip it once a week to the bare act: sit, pour, say the name, mean it. Bholenath asks for nothing else, which is exactly what makes the offering complete.'
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
      'Shiva held the world\'s poison in his throat — absorbing it without passing it on. Where in your life are you swallowing poison too deep, or spraying it onward? What would holding it "in the throat" look like?',
      'The Ganga would have shattered the earth if Shiva had not broken her fall. Who broke the fall of what descended toward you — and for whom are you now the one standing beneath the river?',
      'Shiva is worshipped with one leaf and a handful of water. If your practice were stripped to a single sincere act, what would it be?'
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
      // TODO cover shopping list: replace with a real hanuman-cover.png (interim: Ramayana cover)
      heroImage: require('../../assets/images/covers/ramayana-cover.png'),
      iconImage: '/images/deities/hanuman-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'hanuman-forgotten-strength',
        title: 'The Strength You Forgot You Had',
        subtitle: 'An Old Bear Speaking to a Silent Monkey',
        storyText: 'The Ramayana\'s most quietly devastating scene is not a battle. The vanaras sit defeated at the ocean\'s edge — the strongest among them can leap ninety yojanas, and Lanka lies at a hundred. Hanuman sits apart, saying nothing. He does not volunteer because it does not occur to him that he can do it: a childhood curse made him forget his own powers until reminded. Then Jambavan, the ancient bear, walks over and does the only heroic thing left to old age — he remembers on another\'s behalf. Son of the wind. The infant who leapt for the sun. The one for whom this ocean is a puddle. And Hanuman grows with every sentence, because the words are not flattery; they are facts he had misplaced.',
        teachingText: 'The curse of forgotten strength is not mythology — it is Monday morning. Capability you demonstrated for years disappears from your self-image after one season of defeat. Hanuman\'s teaching here is double: seek your Jambavans, the ones who state your powers as facts; and be one, because reminding someone of their strength is not encouragement, it is testimony.'
      },
      {
        id: 'hanuman-whose-work',
        title: 'Strength That Serves',
        subtitle: 'A Mace Laid at Two Pairs of Feet',
        storyText: 'Everything Hanuman does is enormous — oceans leapt, cities burned, mountains carried — and none of it is for himself. This is the engineering secret of his character: strength without ego has no drag. The mighty in the epics who serve themselves — Ravana above all, with his ten heads of self-regard — spend most of their power maintaining their own image. Hanuman spends nothing on himself. Asked how he crossed the impossible ocean, his answer is always the same: by Rama\'s name and Rama\'s work. The strength is real, but the frictionlessness comes from the devotion.',
        teachingText: 'Watch what happens to your own capability when the work is genuinely for something beyond you — the meeting where you stop defending your idea and start serving the problem. Ego is drag. Hanuman\'s question for any undertaking: whose work is this? When the honest answer is "something larger than me," you will find, like him, that you are suddenly bigger than the obstacle.'
      },
      {
        id: 'hanuman-in-lanka',
        title: 'Alone in the Enemy City',
        subtitle: 'A Small Monkey in Golden Lanka at Night',
        storyText: 'Having crossed the ocean as a giant, Hanuman enters Lanka the opposite way — shrunk to the size of a cat, slipping through the golden city by night. The Sundara Kanda lingers on his searching: palace by palace, room by room, through Ravana\'s sleeping splendor, discipline holding against despair as Sita is nowhere. When he finally finds her under the ashoka tree — guarded, grieving, refusing Ravana — he faces a subtle problem: how does a monkey appear before a captive queen without terrifying her? He begins softly, from the branches, singing Rama\'s story — her own story — until hope arrives before he does. Then he presents the ring.',
        teachingText: 'Power got him to Lanka; gentleness accomplished the mission. Approaching someone in despair takes Hanuman\'s branch-singing: not bursting in with solutions, but letting the familiar story of what they love reach them first. The Sundara Kanda is recited in Indian homes precisely in seasons of crisis — a manual for carrying hope into dark places without breaking anything.'
      },
      {
        id: 'hanuman-chest',
        title: 'What Lives in the Chest',
        subtitle: 'Pearls Torn, a Chest Opened',
        storyText: 'At Rama\'s coronation, gifts flowed. Sita gave Hanuman a necklace of pearls beyond price. He held it to his ear, bit a pearl open, frowned, bit another, discarding each — searching. Asked what he was doing, he said: I keep nothing that does not contain Rama. The court laughed at the simple monkey. And Hanuman, in the telling beloved of the later tradition, tore open his own chest — and there, seated in his heart, were Rama and Sita. The court stopped laughing. Whatever one makes of the image, its claim is exact: the measure of devotion is not what you wear or say, but what an honest opening of your chest would reveal.',
        teachingText: 'This story is later tradition rather than Valmiki, and the tradition kept it because it asks the only question that matters: if your chest were opened — your calendar, your accounts, your browser history, your 3 a.m. thoughts — what would be found enthroned there? Hanuman\'s answer had the advantage of being true. The practice is to make yours true too, one relocation of the heart at a time.'
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
      'Hanuman forgot his own strength until Jambavan reminded him. What capability have you stopped believing you have — and who in your life states your strengths as facts?',
      'Hanuman\'s power had no drag because none of it served his ego. In your current work, how much of your energy goes to the task, and how much to maintaining your image?',
      'If your chest were opened like Hanuman\'s — your time, attention, and quiet thoughts examined — what would be found enthroned at the center?'
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
      // TODO cover shopping list: replace with a real durga-cover.png (interim: Navratri cover)
      heroImage: require('../../assets/images/covers/navratri-cover.png'),
      iconImage: '/images/deities/durga-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'durga-when-gods-pool',
        title: 'When the Gods Stopped Competing',
        subtitle: 'Streams of Light Fusing into a Woman on a Lion',
        storyText: 'The Devi Mahatmya opens with the divine order defeated. Mahishasura\'s boon — invulnerable to man and god — had found the loophole in heaven\'s power, and the gods, individually magnificent, were individually useless. What saved the worlds was not a bigger god but a different geometry: they combined. Radiance poured from every divine body, fused, and took the form of a woman — and then came the detail the text lingers on: each god handed her his signature weapon. Shiva gave the trident. Vishnu gave the discus. Not copies — their own. Durga rides out armed with everything heaven owns, freely given.',
        teachingText: 'Notice what the story requires before the rescue: every powerful being had to admit his individual power was not enough, and hand his best weapon to another. Where in your family or work is the crisis persisting because everyone fights it separately, each guarding their own trident? Durga is born wherever that surrender into combination happens.'
      },
      {
        id: 'durga-fierce-mother',
        title: 'The Mother Who Carries Weapons',
        subtitle: 'A Serene Face Above Ten Armed Hands',
        storyText: 'Durga\'s iconography holds a deliberate contradiction: the face of a serene mother above arms full of weapons mid-battle. India has never seen a conflict between the two. Ask anyone raised on her images — she fights like that because she is a mother; the fierceness is the tenderness, pointed at what threatens the child. The texts underline it: she battles Mahishasura with a calm face, even laughing, because rage is absent — protection is total but hatred never arrives. This is what the tradition means by fierce compassion: love with a sword, wielded without cruelty.',
        teachingText: 'Most of us split these energies — gentle until pushed into rage that we later regret, or so calm we fail to protect what needs us. Durga is the integration: total ferocity in defense of the vulnerable, zero hatred toward the attacker. Next time you must confront someone, try her posture — the serene face above the armed hands. Firm action, quiet eyes.'
      },
      {
        id: 'durga-shapeshifter',
        title: 'Fighting the Shape-Shifter',
        subtitle: 'A Buffalo Becoming a Lion Becoming a Man',
        storyText: 'Mahishasura never fought fair — that was the point of him. Buffalo, lion, swordsman, elephant, buffalo again: each form abandoned at the moment of losing, so the fight could never end. Durga\'s response was not to match his changes but to refuse their premise. She held her ground, stayed serene, and let each disguise exhaust itself — striking finally when he was caught halfway between forms, neither buffalo nor man, the deception itself exposed. The Devi Mahatmya was composed by people who understood that evil\'s chief weapon is not strength but redefinition.',
        teachingText: 'Everything destructive in a life shape-shifts when confronted: the addiction becomes "just relaxing," the cruel relationship becomes "passionate," the compromise becomes "pragmatism." Chasing each new form is exhausting by design. Durga\'s method: name the thing once, clearly, and hold that clarity while the disguises cycle. The moment of half-transformation — when the old excuse is dying and the new one isn\'t ready — is when truth can pin it.'
      },
      {
        id: 'durga-nine-nights',
        title: 'Nine Nights of the Mother',
        subtitle: 'A Lamp Lit Beside a Sprouting Pot of Grain',
        storyText: 'Twice a year, at the great turning of the seasons, India gives Durga nine nights — Navratri. A pot of grain is sprouted, a lamp kept burning, and night by night the Goddess is honored in her forms: fierce Durga, wealth-giving Lakshmi, wisdom-bestowing Saraswati, by one beloved arrangement three nights each. On Ashtami, young girls are worshipped as her living embodiment — the theology of "the Goddess abides in all beings" made into a household act. The festival ends in Vijayadashami, the day of victory, when Mahishasura falls and, in the north, Ravana burns: all the traditions agreeing that after nine nights of honoring the sacred feminine, the tenth day belongs to triumph.',
        teachingText: 'Navratri\'s structure is itself the teaching: protection first (Durga), then abundance (Lakshmi), then wisdom (Saraswati) — in that order, because abundance without protection is looted and wisdom without abundance starves. Audit your own life in her sequence. And the kanya puja asks the sharpest question: do you actually treat the ordinary beings around you as places where the Goddess lives?'
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
      'Durga was born when the gods pooled their power and handed over their own weapons. What is your "trident" — and is there a struggle in your life that persists because everyone involved is fighting it separately?',
      'Her iconography joins a serene face with armed hands: total protection, zero hatred. When you last had to be fierce, which came out — the weapons, the serenity, or both?',
      'Mahishasura survived by shape-shifting every time he was nearly caught. What in your life keeps changing its name each time you confront it — and what would naming it once, clearly, sound like?'
    ]
  }
];

// Utility functions
export const getMajorDeities = (): Deity[] => {
  return deitiesData.filter(deity => deity.category === 'major');
};

export const getDeityById = (id: string): Deity | undefined => {
  return deitiesData.find(deity => deity.id === id);
};

export const getDeitiesByCategory = (category: string): Deity[] => {
  return deitiesData.filter(deity => deity.category === category);
};

export default deitiesData;