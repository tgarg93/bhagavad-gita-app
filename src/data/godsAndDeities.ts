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
        content: 'When Indra sent torrential rains to punish the people of Vrindavan for not worshipping him, young Krishna lifted the entire Govardhan hill on his little finger for seven days and nights, providing shelter to all the villagers, their cattle, and animals. This miraculous act demonstrated that divine protection comes not from fear-based worship but from pure devotion and righteousness.',
        moralLesson: 'True divinity protects those who are innocent and devoted, regardless of conventional power structures',
        category: 'miracle',
        relatedScripture: 'Bhagavata Purana'
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
    }
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
        content: 'When Queen Kaikeyi demanded that Rama be exiled and Bharata be crowned instead, Rama immediately accepted without protest. He gave up his rightful throne, royal comforts, and comfortable life to honor his father\'s promise, showing that duty to parents and truth supersedes personal desires.',
        moralLesson: 'True nobility lies in sacrificing personal gain for higher principles',
        category: 'teaching'
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
    }
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
      heroImage: require('../../assets/images/covers/dharma-cover.png'),
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