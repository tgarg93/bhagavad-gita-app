// Hindu Festival Calendar Data for Dharma App
// Comprehensive collection of Hindu festivals, observances, and sacred days

import { NarrativeSection, SourceNote } from './narrativeTypes';

export interface Festival {
  id: string;
  name: string;
  sanskritName?: string;
  date: string; // YYYY-MM-DD format — repointed at load to the next/ongoing occurrence (see bottom of file)
  occurrences: string[]; // YYYY-MM-DD start date per year; occurrence spans `duration` days from each start
  emoji: string; // marker shown on calendar days and festival lists
  dateType: 'fixed' | 'lunar' | 'solar';
  type: FestivalType;
  significance: string;
  description: string;
  fullStory: string; // Rich, detailed background story
  mythology: string[]; // Array of mythological stories
  historicalContext: string;
  traditions: string[];
  prayers: string[];
  foods: string[];
  colors: string[];
  deity?: string;
  scripture?: string;
  scriptureReferences: ScriptureReference[]; // Deep links to relevant texts
  duration: number;
  region?: string;
  regionalVariations: RegionalVariation[];
  importance: 'major' | 'regional' | 'minor';
  rituals: Ritual[];
  starterPack?: StarterPack; // commerce concept, currently unrendered — only the deep festivals carry one
  imageUrl?: string;
  heroImageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
  audioUrl?: string; // Pronunciation guide
  modernAdaptations: string[];
  familyActivities: FamilyActivity[];
  culturalImpact: string;
  relatedFestivals: string[]; // IDs of related festivals
  // Narrative reading experience (Gita-style sections) — seed content only
  sections?: NarrativeSection[];
  // Primary texts the content was verified against (rendered as a footer card)
  sources?: SourceNote[];
  // Chapter-style reflection questions — not authored yet for festivals;
  // the detail screen renders them if/when present
  reflectionQuestions?: string[];
}

export type FestivalType = 
  | 'spiritual'
  | 'harvest'
  | 'seasonal'
  | 'deity_celebration'
  | 'fast'
  | 'pilgrimage'
  | 'cultural'
  | 'new_year'
  | 'eclipse'
  | 'ancestor_worship'
  | 'victory_celebration'
  | 'nature_worship'
  | 'community_celebration'
  | 'life_cycle'
  | 'lunar_observance';

export interface Ritual {
  id: string;
  name: string;
  description: string;
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'all_day';
  materials: string[];
  steps: DetailedStep[];
  mantras?: Mantra[];
  significance: string;
  tips: string[];
  commonMistakes: string[];
}

export interface DetailedStep {
  stepNumber: number;
  instruction: string;
  explanation: string;
  tips?: string[];
  imageUrl?: string;
}

export interface Mantra {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  pronunciation?: string;
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

export interface RegionalVariation {
  region: string;
  localName?: string;
  uniqueTraditions: string[];
  specialFoods: string[];
  localCustoms: string;
}

export interface StarterPack {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedCost: string;
  timeRequired: string;
  essentialItems: Product[];
  optionalItems: Product[];
  stepByStepGuide: CelebrationStep[];
  tips: string[];
  safetyNotes?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  culturalSignificance: string;
  price: number;
  currency: string;
  imageUrl: string;
  vendor: Vendor;
  category: ProductCategory;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  isEssential: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  story: string;
  location: string;
  specialization: string;
  yearsOfExperience: number;
  artisanStory: string;
  businessEthos: string;
  imageUrl?: string;
  sustainabilityPractices?: string[];
}

export interface CelebrationStep {
  stepNumber: number;
  title: string;
  description: string;
  timeOfDay: string;
  duration: string;
  materialsNeeded: string[];
  detailedInstructions: string[];
  culturalContext: string;
  tips: string[];
  imageUrl?: string;
}

export interface FamilyActivity {
  id: string;
  title: string;
  description: string;
  ageGroup: 'toddlers' | 'children' | 'teenagers' | 'adults' | 'seniors' | 'all_ages';
  duration: string;
  materials: string[];
  instructions: string[];
  learningObjective: string;
}

export type ProductCategory = 
  | 'ritual_items'
  | 'decorations'
  | 'food_ingredients'
  | 'clothing'
  | 'books'
  | 'music'
  | 'art'
  | 'incense_candles'
  | 'flowers'
  | 'gifts';

export interface Ekadashi {
  id: string;
  name: string;
  date: string;
  significance: string;
  story: string;
  fastingRules: string[];
  benefits: string[];
}

export interface TithiCalendar {
  date: string;
  tithi: string; // Lunar day name
  paksha: 'shukla' | 'krishna'; // Bright or dark fortnight
  nakshatra: string; // Constellation
  yoga: string;
  karana: string;
  festivals: string[]; // Festival IDs for this date
}

// Major Hindu Festivals for 2025
export const festivalData: Festival[] = [
  {
    id: 'makar-sankranti-2025',
    name: 'Makar Sankranti',
    sanskritName: 'मकर संक्रान्ति',
    date: '2025-01-14',
    occurrences: ['2025-01-14', '2026-01-14', '2027-01-15', '2028-01-15'], // verified vs Drik Panchang, Jul 2026
    emoji: '🪁',
    dateType: 'solar',
    type: 'harvest',
    significance: 'Marks the sun\'s transition into Capricorn, beginning of longer days and the harvest season',
    description: 'A joyous harvest festival celebrating the sun god Surya and marking the end of winter solstice',
    fullStory: 'Makar Sankranti is one of the few Hindu festivals that follows the solar calendar, making it fall on the same date every year. This sacred day marks the sun\'s northward journey (Uttarayana) and entry into the zodiac sign of Capricorn (Makar). According to Hindu astronomy, this transition is highly auspicious as it signifies the beginning of the gods\' day and the gradual lengthening of daylight hours. The festival celebrates the triumph of light over darkness, both literally and metaphorically, representing spiritual awakening and the soul\'s journey towards enlightenment.',
    sections: [
      {
        id: 'sankranti-sun-turns',
        title: 'The Day the Sun Turns Home',
        subtitle: 'A Low Winter Sun Beginning Its Long Climb',
        keyVerse: {
          sanskrit: 'अग्निर्ज्योतिरहः शुक्लः षण्मासा उत्तरायणम्। तत्र प्रयाता गच्छन्ति ब्रह्म ब्रह्मविदो जनाः॥',
          transliteration: 'agnir jyotir ahaḥ śhuklaḥ ṣhaṇ-māsā uttarāyaṇam, tatra prayātā gachchhanti brahma brahma-vido janāḥ',
          meaning: 'Fire, light, daytime, the bright fortnight, the six months of the sun\'s northern path — departing then, the knowers of Brahman go to Brahman.',
          source: 'Bhagavad Gita 8.24 (tr. Swami Sivananda)'
        },
        storyText: 'Most Hindu festivals ride the moon; Makar Sankranti rides **the sun** — which is why it alone lands on nearly the same date every year.\n\nIt marks the sun\'s entry into Makara (Capricorn) and the felt beginning of **uttarayana**, the six-month northern journey when days lengthen and light gains. The tradition ranked this half of the year as the gods\' own daytime, and the Gita numbers the northern path among the luminous circumstances of a blessed departure.\n\n**Sankranti means "transition"** — and the festival\'s quiet teaching is that transitions themselves can be holy.',
        teachingText: 'The year\'s light turns on this day by a few seconds — **imperceptible, and decisive**. Most real turnarounds look like this: no drama on the day itself, only a changed direction that compounds.\n\nSankranti honors the turn, not the arrival. What direction, turned today by one degree, would change your year by June?'
      },
      {
        id: 'sankranti-bhishma',
        title: 'The Grandfather Who Waited for the Light',
        subtitle: 'An Old Warrior on a Bed of Arrows, Watching the Sky',
        storyText: 'The Mahabharata gives uttarayana its most solemn witness.\n\n**Bhishma** — grandsire of both armies, bound by the boon of choosing his own hour of death — fell in battle pierced by countless arrows, and lay on that **bed of arrows** for weeks, alive by will alone.\n\nHe was waiting: the sun was still in its southern course, and he had resolved to release his life only when it turned north. When uttarayana came, he taught his final teachings to Yudhishthira and let go — **timing even his death to the side of the light**.',
        teachingText: 'Bhishma\'s vigil is the festival\'s deepest layer: some things should not be ended in the dark season — a role, a relationship, a chapter.\n\nIf an ending is yours to time, time it like Bhishma: settle your teachings, wait for the light to turn, and leave on the upswing. And where you cannot choose the timing, you can still choose his posture — **patience, clarity, and a last act of generosity**.',
        citation: 'Mahabharata, Bhishma Parva (the bed of arrows); his passing: Anushasana Parva (tr. K.M. Ganguli).'
      },
      {
        id: 'sankranti-tilgul',
        title: 'Sesame, Jaggery, and a Yearly Peace Treaty',
        subtitle: 'Sweets Pressed into a Neighbor\'s Palm',
        storyText: 'In Maharashtra the festival travels in a phrase: **"Til-gul ghya, god god bola"** — take this sesame and jaggery, and speak sweetly.\n\nNeighbors, rivals, and estranged relatives press the little sweets into each other\'s hands as a one-line annual treaty: whatever bitterness the old year held, **let the new light begin with sweet speech**. The ingredients are winter\'s own medicine — warming sesame, iron-rich jaggery — so that the custom feeds body and bond in one gesture.\n\nAcross India the day takes other names and pots — Pongal boiling over in the south, Lohri\'s bonfire in Punjab, Magh Bihu\'s feasts in Assam — one turning sun, many kitchens.',
        teachingText: 'The genius of til-gul is that it makes reconciliation **cheap, sweet, and expected** — no summit required, just a sweet and a sentence.\n\nKeep the custom literally: choose one person the year soured, and open with sweetness before the light gets any older.'
      },
      {
        id: 'sankranti-kites',
        title: 'A Sky Full of Kites',
        subtitle: 'Ten Thousand Paper Birds over Winter Rooftops',
        storyText: 'On Sankranti morning, the skies of Gujarat and Rajasthan fill edge to edge with **kites** — a festival of aspiration flown from every rooftop.\n\nThe custom began, tradition says, as a way to spend the day in the newly-strengthening sun, and became India\'s most exuberant metaphor: the string in your hand, the paper self climbing the returning light.\n\nThere is craft in it that any practitioner recognizes — too slack and the kite falls, too tight and it snaps; **height comes from reading the wind, not fighting it**.',
        teachingText: 'Kite-flying is the festival\'s take-home physics of the spirit: **lift requires both anchoring and release.** Your practice is the string — hold it too loosely and the aspiration drifts off; grip it and it breaks.\n\nOn the day the light turns, fly something: name one aspiration for the brightening half of the year, and give it exactly enough string.'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:8',
        locator: '8.24 (the northern path of the sun)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Mahabharata',
        locator: 'Bhishma Parva (the bed of arrows); Anushasana Parva (Bhishma\'s passing at uttarayana)',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Living tradition',
        locator: 'Til-gul exchange (Maharashtra), kite flying (Gujarat/Rajasthan), Pongal/Lohri/Magh Bihu parallels — festival practice, labeled as tradition',
      },
    ],
    mythology: [
      'Legend of King Bhagiratha who brought the sacred Ganga to earth, and devotees take holy dips to purify their souls',
      'Story of Lord Vishnu vanquishing the demon Sankrasur, hence the name Sankranti meaning "transition"',
      'Tale of how sesame seeds (til) were blessed by Lord Vishnu to grant prosperity when shared with love'
    ],
    historicalContext: 'Archaeological evidence suggests this festival has been celebrated for over 1000 years. Ancient texts like the Mahabharata mention the significance of Uttarayana. The tradition of kite flying originated in Gujarat and spread across India as a symbol of freedom and reaching new heights.',
    traditions: [
      'Flying colorful kites (Patang) symbolizing freedom and aspirations',
      'Taking holy dips in sacred rivers like Ganga, Yamuna, and Godavari',
      'Donating sesame seeds and jaggery to the needy (Til-Gul distribution)',
      'Visiting temples and performing Surya worship',
      'Preparing special dishes with sesame and jaggery',
      'Community kite-flying competitions and festivals'
    ],
    prayers: [
      'Surya Mantras',
      'Gayatri Mantra',
      'Makar Sankranti special prayers'
    ],
    foods: [
      'Til ladoo (sesame seed sweets)',
      'Gur (jaggery)',
      'Khichdi',
      'Pongal (South India)',
      'Puran poli',
      'Undhiyu (Gujarat special)'
    ],
    colors: ['Yellow', 'Orange', 'Red', 'Saffron'],
    deity: 'Surya (Sun God)',
    scriptureReferences: [
      {
        id: 'bg-7-8',
        text: 'bhagavad_gita',
        chapter: 7,
        verse: 8,
        relevance: 'Krishna describes himself as the taste in water and light in the moon and sun',
        quote: 'I am the taste in water, the light in the moon and sun'
      },
      {
        id: 'surya-sukta',
        text: 'vedas',
        section: 'Rig Veda - Surya Sukta',
        relevance: 'Ancient hymns praising the Sun God, recited during Makar Sankranti',
        quote: 'May the golden sun god protect us from all directions'
      }
    ],
    duration: 1,
    region: 'Pan-India',
    regionalVariations: [
      {
        region: 'Gujarat',
        localName: 'Uttarayan',
        uniqueTraditions: ['International Kite Festival', 'Undhiyu feast'],
        specialFoods: ['Undhiyu', 'Jalebi', 'Gujarati Thali'],
        localCustoms: 'Rooftop kite flying competitions lasting all day'
      },
      {
        region: 'Tamil Nadu',
        localName: 'Pongal',
        uniqueTraditions: ['Cooking Pongal in new pots', 'Cattle worship'],
        specialFoods: ['Sweet Pongal', 'Ven Pongal', 'Sugarcane'],
        localCustoms: 'Four-day celebration with different themes each day'
      },
      {
        region: 'Punjab',
        localName: 'Maghi',
        uniqueTraditions: ['Khichdi preparation', 'Community feasts'],
        specialFoods: ['Khichdi', 'Sarson da saag'],
        localCustoms: 'Celebrating the end of extremely cold weather'
      }
    ],
    importance: 'major',
    rituals: [
      {
        id: 'sankranti-morning-ritual',
        name: 'Morning Sun Worship (Surya Arghya)',
        description: 'Traditional offering of water to the rising sun with gratitude and prayers',
        timeOfDay: 'dawn',
        materials: ['Copper vessel with water', 'Red flowers', 'Incense sticks', 'Til and gur', 'Red cloth'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Wake up before sunrise and take a ritual bath',
            explanation: 'Purification of body and mind before worship',
            tips: ['Use natural oils like sesame oil', 'Face east while bathing']
          },
          {
            stepNumber: 2,
            instruction: 'Fill copper vessel with clean water and add red flowers',
            explanation: 'Copper has purifying properties, red flowers represent devotion',
            tips: ['Use marigold or red roses', 'Add tulsi leaves for extra sanctity']
          },
          {
            stepNumber: 3,
            instruction: 'Stand facing the rising sun and offer water (arghya)',
            explanation: 'Direct connection with solar energy and gratitude',
            tips: ['Pour water slowly in a thin stream', 'Maintain focus on the sun']
          },
          {
            stepNumber: 4,
            instruction: 'Chant Surya mantras with devotion',
            explanation: 'Sacred vibrations align with solar frequencies',
            tips: ['Repeat 108 times for maximum benefit', 'Feel the warmth and energy']
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ सूर्याय नमः',
            transliteration: 'Om Suryaya Namah',
            meaning: 'Salutations to the Sun God',
            pronunciation: 'ohm-soor-ya-ya-na-mah'
          },
          {
            sanskrit: 'ॐ आदित्याय नमः',
            transliteration: 'Om Adityaya Namah',
            meaning: 'Salutations to the son of Aditi (Sun)',
            pronunciation: 'ohm-ah-dit-ya-ya-na-mah'
          }
        ],
        significance: 'Connects devotee with cosmic energy and removes negative influences',
        tips: ['Best performed between 6-8 AM', 'Wear yellow or orange clothes', 'Face should not have soap/cream'],
        commonMistakes: ['Looking directly at sun for too long', 'Performing after sunrise', 'Using plastic containers']
      }
    ],
    starterPack: {
      id: 'makar-sankranti-starter',
      title: 'Complete Makar Sankranti Celebration Kit',
      description: 'Everything you need to celebrate this auspicious harvest festival with authentic traditions',
      difficulty: 'beginner',
      estimatedCost: '$45-65',
      timeRequired: '3-4 hours preparation, full day celebration',
      essentialItems: [
        {
          id: 'copper-vessel',
          name: 'Traditional Copper Water Vessel (Kalash)',
          description: 'Handcrafted copper vessel for sun worship rituals',
          culturalSignificance: 'Copper purifies water and has antimicrobial properties valued in Ayurveda',
          price: 25,
          currency: 'USD',
          imageUrl: '/images/products/copper-kalash.jpg',
          vendor: {
            id: 'artisan-copper-works',
            name: 'Artisan Copper Works',
            story: 'Founded by master craftsman Ramesh Kumar in 1985',
            location: 'Moradabad, Uttar Pradesh',
            specialization: 'Traditional copper and brass items',
            yearsOfExperience: 40,
            artisanStory: 'Ramesh learned the art from his father and grandfather, keeping alive 200-year-old family techniques',
            businessEthos: 'Preserving traditional craftsmanship while providing fair wages to local artisans',
            sustainabilityPractices: ['Using recycled copper', 'Natural finishing processes', 'Supporting local communities']
          },
          category: 'ritual_items',
          materials: ['Pure copper', 'Hand-forged'],
          dimensions: '6" height x 4" diameter',
          weight: '0.8 lbs',
          isEssential: true
        },
        {
          id: 'til-ladoo-kit',
          name: 'Organic Til Ladoo Making Kit',
          description: 'Premium sesame seeds, jaggery, and recipe card for authentic til ladoos',
          culturalSignificance: 'Sesame represents abundance and jaggery symbolizes sweet relationships',
          price: 18,
          currency: 'USD',
          imageUrl: '/images/products/til-ladoo-kit.jpg',
          vendor: {
            id: 'organic-traditions',
            name: 'Organic Traditions Co-op',
            story: 'Women farmers collective promoting organic agriculture',
            location: 'Gujarat, India',
            specialization: 'Organic sesame and traditional sweets ingredients',
            yearsOfExperience: 15,
            artisanStory: 'Collective of 200+ women farmers growing chemical-free sesame using ancient methods',
            businessEthos: 'Empowering rural women through sustainable agriculture and fair trade',
            sustainabilityPractices: ['Chemical-free farming', 'Water conservation', 'Women empowerment']
          },
          category: 'food_ingredients',
          materials: ['Organic white sesame', 'Pure jaggery', 'Ghee'],
          isEssential: true
        },
        {
          id: 'kite-set',
          name: 'Traditional Fighter Kites Set (6 kites)',
          description: 'Colorful tissue paper kites with manjha (string) for authentic kite flying',
          culturalSignificance: 'Kites represent freedom, aspiration, and connection with the divine sky',
          price: 15,
          currency: 'USD',
          imageUrl: '/images/products/traditional-kites.jpg',
          vendor: {
            id: 'gujarat-kites',
            name: 'Gujarat Patang House',
            story: '50-year-old family business specializing in traditional kites',
            location: 'Ahmedabad, Gujarat',
            specialization: 'Handmade paper kites and manjha',
            yearsOfExperience: 50,
            artisanStory: 'Three generations of kite makers using traditional bamboo and tissue paper techniques',
            businessEthos: 'Keeping alive the art of kite making and promoting healthy outdoor activities',
            sustainabilityPractices: ['Biodegradable materials', 'Natural dyes', 'Minimal packaging']
          },
          category: 'art',
          materials: ['Tissue paper', 'Bamboo', 'Natural manjha'],
          isEssential: true
        }
      ],
      optionalItems: [
        {
          id: 'marigold-garland',
          name: 'Fresh Marigold Garland',
          description: 'Fragrant yellow marigolds for decoration and offerings',
          culturalSignificance: 'Marigolds are considered sacred and attract positive energy',
          price: 8,
          currency: 'USD',
          imageUrl: '/images/products/marigold-garland.jpg',
          vendor: {
            id: 'temple-flowers',
            name: 'Sacred Flowers Direct',
            story: 'Temple flower suppliers for 25+ years',
            location: 'Bangalore, Karnataka',
            specialization: 'Fresh temple flowers and garlands',
            yearsOfExperience: 25,
            artisanStory: 'Family business supplying flowers to major temples across South India',
            businessEthos: 'Providing freshest flowers for divine worship',
            sustainabilityPractices: ['Chemical-free flowers', 'Biodegradable packaging']
          },
          category: 'flowers',
          isEssential: false
        }
      ],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Early Morning Preparation',
          description: 'Begin your Makar Sankranti celebration with purification and preparation',
          timeOfDay: '5:00-6:00 AM',
          duration: '1 hour',
          materialsNeeded: ['Sesame oil', 'Clean clothes', 'Copper vessel'],
          detailedInstructions: [
            'Take an oil bath using sesame oil - this purifies the body and mind',
            'Wear clean yellow, orange, or white clothes',
            'Fill the copper vessel with clean water',
            'Arrange the puja area facing east'
          ],
          culturalContext: 'Oil baths on festivals are considered highly auspicious in Hindu tradition',
          tips: ['Heat sesame oil slightly for better absorption', 'Chant prayers while bathing'],
          imageUrl: '/images/guides/morning-preparation.jpg'
        },
        {
          stepNumber: 2,
          title: 'Surya Arghya (Sun Worship)',
          description: 'Offer water to the rising sun with gratitude and devotion',
          timeOfDay: '6:00-7:00 AM',
          duration: '30 minutes',
          materialsNeeded: ['Copper vessel with water', 'Red flowers', 'Incense'],
          detailedInstructions: [
            'Stand facing the rising sun',
            'Hold the copper vessel at chest level',
            'Pour water slowly while chanting mantras',
            'Offer flowers and light incense',
            'Bow with gratitude for sun\'s energy'
          ],
          culturalContext: 'Sun worship connects us with the cosmic energy and removes negativity',
          tips: ['Never look directly at the sun', 'Pour water in a thin, steady stream'],
          imageUrl: '/images/guides/surya-arghya.jpg'
        },
        {
          stepNumber: 3,
          title: 'Til-Gul Preparation & Distribution',
          description: 'Prepare sesame sweets and share with family and neighbors',
          timeOfDay: '7:00-10:00 AM',
          duration: '3 hours',
          materialsNeeded: ['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom'],
          detailedInstructions: [
            'Roast sesame seeds until aromatic',
            'Melt jaggery with a little water to make syrup',
            'Mix roasted sesame with jaggery syrup',
            'Add ghee and cardamom powder',
            'Shape into small balls (ladoos)',
            'Share with family saying "Til-gul ghya, god god bola" (Take til-gul, speak sweetly)'
          ],
          culturalContext: 'Sharing sweets represents spreading joy and sweetness in relationships',
          tips: ['Test jaggery syrup consistency by dropping in water', 'Grease hands with ghee while shaping'],
          imageUrl: '/images/guides/til-gul-making.jpg'
        },
        {
          stepNumber: 4,
          title: 'Kite Flying Celebration',
          description: 'Enjoy the traditional kite flying festivities',
          timeOfDay: '10:00 AM - Sunset',
          duration: 'Full day',
          materialsNeeded: ['Kites', 'Manjha (string)', 'Snacks', 'Water'],
          detailedInstructions: [
            'Choose an open space away from electrical wires',
            'Start with simple kite flying techniques',
            'Participate in friendly competitions',
            'Enjoy traditional snacks and music',
            'Share the joy with community members'
          ],
          culturalContext: 'Kite flying symbolizes freedom and reaching for higher spiritual goals',
          tips: ['Check wind direction before flying', 'Keep first aid kit handy'],
          imageUrl: '/images/guides/kite-flying.jpg'
        }
      ],
      tips: [
        'Start preparations 2-3 days before the festival',
        'Invite neighbors and friends to join the celebration',
        'Take photos to preserve memories',
        'Donate food to the less fortunate',
        'Teach children about the cultural significance'
      ],
      safetyNotes: [
        'Never look directly at the sun during worship',
        'Be careful with kite strings - they can cut',
        'Stay hydrated during outdoor activities',
        'Keep away from electrical lines while flying kites'
      ]
    },
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'),
    galleryImages: [
      '/images/festivals/kite-flying.jpg',
      '/images/festivals/til-ladoo.jpg',
      '/images/festivals/surya-worship.jpg',
      '/images/festivals/pongal-cooking.jpg'
    ],
    audioUrl: '/audio/makar-sankranti-pronunciation.mp3',
    modernAdaptations: [
      'Apartment rooftop kite flying sessions',
      'Virtual kite flying games for children',
      'Healthy versions of traditional sweets using dates instead of jaggery',
      'Community events in local parks',
      'Online streaming of traditional music and dance'
    ],
    familyActivities: [
      {
        id: 'kite-making',
        title: 'DIY Kite Making Workshop',
        description: 'Teach children to make colorful tissue paper kites',
        ageGroup: 'children',
        duration: '2 hours',
        materials: ['Tissue paper', 'Bamboo sticks', 'Glue', 'Colors'],
        instructions: [
          'Cut tissue paper in diamond shape',
          'Create bamboo frame',
          'Attach paper to frame',
          'Decorate with colors',
          'Attach string for flying'
        ],
        learningObjective: 'Understanding traditional crafts and developing creativity'
      },
      {
        id: 'til-counting-game',
        title: 'Sesame Seed Counting Game',
        description: 'Educational game to teach numbers and math using sesame seeds',
        ageGroup: 'toddlers',
        duration: '30 minutes',
        materials: ['Sesame seeds', 'Small bowls', 'Number cards'],
        instructions: [
          'Show number cards to children',
          'Ask them to count corresponding sesame seeds',
          'Place seeds in bowls',
          'Reward with til ladoo pieces'
        ],
        learningObjective: 'Number recognition and counting skills'
      }
    ],
    culturalImpact: 'Makar Sankranti strengthens community bonds, celebrates agricultural abundance, promotes environmental awareness through biodegradable kites, and maintains connection with solar cycles and natural rhythms.',
    relatedFestivals: ['basant-panchami-2025', 'baisakhi-2025']
  },
  {
    id: 'basant-panchami-2025',
    name: 'Basant Panchami',
    sanskritName: 'बसन्त पञ्चमी',
    date: '2025-02-03',
    occurrences: ['2025-02-03', '2026-01-23', '2027-02-11', '2028-01-31'], // verified vs Drik Panchang, Jul 2026
    emoji: '🪷',
    dateType: 'lunar',
    type: 'spiritual',
    significance: 'Celebration of knowledge, wisdom, and arrival of spring',
    description: 'Festival dedicated to Goddess Saraswati, the deity of knowledge, music, and arts',
    traditions: [
      'Wearing yellow clothes',
      'Worshiping Goddess Saraswati',
      'Teaching children to write first letters',
      'Flying kites'
    ],
    prayers: [
      'Saraswati Vandana',
      'Saraswati Chalisa',
      'Vidya mantras'
    ],
    foods: [
      'Yellow sweets',
      'Saffron rice',
      'Sweet boondi',
      'Kesari halwa'
    ],
    colors: ['Yellow', 'White'],
    deity: 'Goddess Saraswati',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'saraswati-puja',
        name: 'Saraswati Puja — Blessing the Tools of Learning',
        description: 'The heart of the day: books, instruments, and pens placed before the goddess of knowledge for her blessing.',
        timeOfDay: 'morning',
        materials: ['Yellow flowers (marigold, mustard blossom)', 'Books, notebooks, and musical instruments', 'A Saraswati image on white or yellow cloth', 'Yellow sweets (kesari halwa, boondi)'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the study or work corner and spread a fresh white or yellow cloth.',
            explanation: 'Saraswati is invited into the place where learning actually happens — the desk is the altar.'
          },
          {
            stepNumber: 2,
            instruction: 'Place her image, and before it the family\'s books, instruments, brushes, and pens.',
            explanation: 'The tools of knowledge themselves receive the worship — they rest, honored, for the day.'
          },
          {
            stepNumber: 3,
            instruction: 'Offer yellow flowers and sweets, and recite the Saraswati Vandana together.',
            explanation: 'Yellow is spring\'s color — the mustard fields in bloom — and the color of ripened understanding.'
          },
          {
            stepNumber: 4,
            instruction: 'Read a few lines from a beloved book or play a few phrases of music as the closing offering.',
            explanation: 'Knowledge is honored by being used beautifully, not only bowed to.'
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
            transliteration: 'oṁ aiṁ sarasvatyai namaḥ',
            meaning: 'Om, salutations to Saraswati (with her seed syllable aiṁ)',
            pronunciation: 'om aim sa-ras-wat-yai na-mah'
          },
          {
            sanskrit: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता',
            transliteration: 'yā kundendu-tuṣhāra-hāra-dhavalā yā śhubhra-vastrāvṛitā',
            meaning: 'She who is fair as jasmine, the moon, and a garland of snow, robed in radiant white… (opening of the Saraswati Vandana)',
            pronunciation: 'yaa kun-den-du tu-shaa-ra haa-ra dha-va-laa'
          }
        ],
        significance: 'Saraswati Puja consecrates the year\'s learning: students traditionally rest their books before her today and begin new studies tomorrow with her blessing.',
        tips: ['Let each family member place one tool of their craft — laptop, ladle, or flute all qualify'],
        commonMistakes: ['Treating it as students-only — Saraswati blesses every craft that requires skill and understanding']
      },
      {
        id: 'vidyarambha',
        name: 'Vidyarambha — A Child\'s First Letters',
        description: 'The tender initiation rite: a young child writes their first letters on this day, guided by an elder\'s hand.',
        timeOfDay: 'morning',
        materials: ['A tray of rice or a slate', 'The child\'s first pencil or a golden ring to trace with'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Seat the child on a parent\'s or grandparent\'s lap facing the Saraswati image.',
            explanation: 'Learning begins held — knowledge enters a child through relationship before it enters through books.'
          },
          {
            stepNumber: 2,
            instruction: 'Guide the child\'s finger to trace the first letters (traditionally "ॐ" or the start of the alphabet) in the rice.',
            explanation: 'The first act of writing is made sacred, unhurried, and celebrated — the opposite of a test.'
          },
          {
            stepNumber: 3,
            instruction: 'End with sweets and loud applause — the child should remember this as a day of delight.',
            explanation: 'The rite\'s whole purpose: welding the memory of learning to the feeling of joy.'
          }
        ],
        significance: 'Vidyarambha ("the beginning of knowledge") makes a child\'s entry into literacy a blessing rather than a hurdle — education framed from the first stroke as sacred inheritance.',
        tips: ['It\'s never too late — adults beginning a new skill can trace their own "first letters" today'],
        commonMistakes: ['Correcting the child\'s strokes — today, every mark they make is perfect']
      }
    ],
    fullStory: 'Basant Panchami marks the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music, arts, and learning. This auspicious day falls on the fifth day (Panchami) of the bright fortnight in the Hindu month of Magha. Yellow is the predominant color of the festival, symbolizing the mustard fields that bloom during this time of year. Students place their books and musical instruments near the goddess to seek her blessings for wisdom and skill.',
    sections: [
      {
        id: 'basant-spring-fifth',
        title: 'The Fifth Day of Spring',
        subtitle: 'Mustard Fields Turning Gold to the Horizon',
        storyText: 'Basant Panchami arrives on the fifth day of the waxing moon of Magha, when north India\'s winter first loosens its grip and **the mustard fields turn the plains yellow to the horizon**.\n\nThe festival\'s color is taken straight from those fields: yellow clothes, yellow rice, yellow sweets, marigolds everywhere.\n\nBut the tradition made a striking choice about what spring\'s first day should celebrate — not fertility, not harvest, but **knowledge**. As the earth wakes, the mind is asked to wake with it: new studies begun, instruments blessed, children taught their first letters. Spring, says the festival, is above all **the season of the opening mind**.'
      },
      {
        id: 'basant-saraswati',
        title: 'The Goddess Born of Thought',
        subtitle: 'A White-Robed Figure with a Veena by a River',
        storyText: 'Saraswati is unlike any other great goddess: **she carries no weapon.**\n\nBorn, the Puranas tell, from the mind of Brahma the creator — who found his new universe silent and formless until **she gave it speech, music, and order** — she holds instead a veena, a book, and a rosary, and rides a white swan said to be able to separate milk from water: discrimination itself, the mind\'s power to tell the true from the mixed. Her white robes refuse ornament; knowledge needs none.\n\nShe is also the memory of a real river — the Saraswati of the Rig Veda, "best of mothers, best of rivers, best of goddesses" — whose waters became, in the tradition\'s imagination, **the flowing of wisdom itself**.',
        teachingText: 'The unarmed goddess is the festival\'s quiet thesis: **knowledge is a power that needs no weapon**, and the swan\'s discrimination — telling truth from noise — may be the most protective skill a person can own.\n\nAsk what your swan currently drinks: what mixture of milk and water does your daily attention take in undivided?',
        citationLink: 'deity:saraswati',
        citation: 'Saraswati\'s birth: Puranic tradition; the river: Rig Veda 6.61 (tr. Griffith, public domain).'
      },
      {
        id: 'basant-first-letters',
        title: 'First Letters in a Tray of Rice',
        subtitle: 'A Grandparent\'s Hand Guiding a Small Finger',
        storyText: 'The festival\'s most tender custom is **vidyarambha**: a young child, seated in a grandparent\'s lap before the goddess, traces their first-ever letters in a tray of rice, everyone applauding as if a kingdom had been won.\n\nThe tradition understood something modern education sometimes forgets — that **a person\'s relationship with learning is set by its first emotional taste**. So it engineered the first taste to be sweet: lap, laughter, sweets, blessing.\n\nBooks themselves rest before the goddess today; even they get a holiday, honored as vessels.',
        teachingText: 'Whatever your age, you have "first letters" waiting — the language not started, the instrument in its case, the skill postponed.\n\nBasant Panchami\'s counsel is to begin it the vidyarambha way: held by encouragement, celebrated for the first clumsy stroke, sweet from the first taste. **Beginnings deserve ceremony, not judgment.**'
      },
      {
        id: 'basant-kites',
        title: 'Yellow Kites on a New Wind',
        subtitle: 'A Spring Sky Stitched with Color',
        storyText: 'In Punjab and across the north, Basant Panchami fills the sky with **kites** — spring\'s first winds put to joyful use.\n\nThe pairing is old and apt: the festival of the mind and the sport of the string. **A kite is thought made visible** — it climbs on invisible currents, needs both anchor and freedom, and falls the moment its holder stops paying attention.\n\nChildren learn the year\'s first lesson in the physics of aspiration off their own rooftops, dressed in yellow, shouting at the sky.',
        teachingText: 'Fly something today — literally if you can, or the inner kind: one aspiration for the bright half of the year, named and given its first length of string.\n\nSaraswati\'s festival adds the condition that makes aspirations fly: **study the wind**. Enthusiasm without knowledge is a kite without a tail.'
      }
    ],
    sources: [
      {
        text: 'Puranic tradition',
        locator: 'Saraswati\'s emergence from Brahma (Matsya Purana and others); her iconography — veena, book, swan — traditional',
      },
      {
        text: 'Rig Veda',
        locator: '2.41.16 (ambitame, nadītame, devitame Sarasvati — best of mothers, rivers, goddesses)',
        translation: 'public-domain renderings',
      },
      {
        text: 'Living tradition',
        locator: 'Vidyarambha first-letters rite; yellow of the Magha mustard bloom; Punjab kite-flying — festival practice, labeled as tradition',
      },
    ],
    mythology: [
      'Birth of Goddess Saraswati from the consciousness of Brahma',
      'Legend of the sacred river Saraswati flowing on this day',
      'Story of how knowledge was gifted to humanity'
    ],
    historicalContext: 'Ancient festival celebrating the transition from winter to spring and the beginning of the learning season.',
    scriptureReferences: [],
    regionalVariations: [],
    modernAdaptations: [
      'School celebrations with cultural programs',
      'Online music and art competitions',
      'Digital learning platforms special offerings'
    ],
    familyActivities: [],
    culturalImpact: 'Promotes education, arts, and cultural learning among all age groups.',
    relatedFestivals: ['makar-sankranti-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'),
  },
  {
    id: 'maha-shivratri-2025',
    name: 'Maha Shivratri',
    sanskritName: 'महाशिवरात्रि',
    date: '2025-02-26',
    occurrences: ['2025-02-26', '2026-02-15', '2027-03-06', '2028-02-23'], // verified vs Drik Panchang, Jul 2026
    emoji: '🔱',
    dateType: 'lunar',
    type: 'spiritual',
    significance: 'Great night of Lord Shiva, convergence of Shiva and Shakti',
    description: 'Most important festival dedicated to Lord Shiva, observed with fasting and night-long prayers',
    traditions: [
      'Night-long vigil',
      'Fasting',
      'Visiting Shiva temples',
      'Chanting Om Namah Shivaya',
      'Abhishekam with milk, honey, water'
    ],
    prayers: [
      'Mahamrityunjaya Mantra',
      'Shiva Chalisa',
      'Rudrashtakam',
      'Lingashtakam'
    ],
    foods: [
      'Fruits (for those fasting)',
      'Milk and milk products',
      'Simple vegetarian food'
    ],
    colors: ['White', 'Orange', 'Rudraksha brown'],
    deity: 'Lord Shiva',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'shiva-abhishekam',
        name: 'Abhishekam — Bathing the Linga',
        description: 'The night\'s central act: pouring water, milk, and the five nectars over the Shiva linga while the name is chanted.',
        timeOfDay: 'night',
        materials: ['A Shiva linga (or any stone consecrated for the night)', 'Water, milk, yogurt, honey, ghee', 'Bilva (bel) leaves', 'Incense and a ghee lamp'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the linga and the space; sit for one silent minute before beginning.',
            explanation: 'Shivratri is a night of stillness — the ritual begins in the quiet it points to.'
          },
          {
            stepNumber: 2,
            instruction: 'Pour water, then milk, then the remaining offerings slowly over the linga, chanting Om Namah Shivaya throughout.',
            explanation: 'The continuous pouring is a meditation: attention held in an unbroken stream, like the offering itself.'
          },
          {
            stepNumber: 3,
            instruction: 'Offer bilva leaves — ideally whole three-leafed sprigs, placed stem-down.',
            explanation: 'The trifoliate bilva is Shiva\'s dearest offering, honored as his three eyes or the three gunas surrendered.'
          },
          {
            stepNumber: 4,
            instruction: 'Light the lamp and incense, and either keep vigil in rounds of chanting or sit in silent meditation.',
            explanation: 'Each of the night\'s four praharas (watches) traditionally gets its own round of worship.'
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ नमः शिवाय',
            transliteration: 'oṁ namaḥ śhivāya',
            meaning: 'Om, salutations to Shiva',
            pronunciation: 'om na-mah shi-vaa-ya'
          },
          {
            sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
            transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣhṭi-vardhanam, urvārukam iva bandhanān mṛityor mukṣhīya māmṛitāt',
            meaning: 'We worship the three-eyed one, fragrant, who nourishes all beings; as a ripe cucumber is released from its stem, may he free us from death, for immortality (Rig Veda 7.59.12)',
            pronunciation: 'om tri-yam-ba-kam ya-jaa-ma-hey'
          }
        ],
        significance: 'The abhishekam re-enacts the world\'s gratitude to the god who drank its poison — cooling streams poured over the one who holds the halahala in his throat.',
        tips: ['A single glass of water poured with full attention is a complete abhishekam — Shiva is Bholenath, the easily pleased'],
        commonMistakes: ['Rushing the pour — the slowness IS the offering']
      },
      {
        id: 'shivratri-vigil',
        name: 'The Night Vigil (Jagarana)',
        description: 'Staying awake through the Great Night — in chanting, meditation, or quiet reading — traditionally in four watches.',
        timeOfDay: 'night',
        materials: ['A lamp kept burning', 'A mala for japa', 'Warm covering for the long sitting'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'After the evening abhishekam, resolve (sankalpa) to keep watch — the whole night, or honestly as much as you can.',
            explanation: 'The vigil is a metaphor enacted: staying awake in the world\'s deepest dark is the spiritual project itself.'
          },
          {
            stepNumber: 2,
            instruction: 'Divide the night into watches: chant one round, meditate one round, read or listen to Shiva\'s stories in another.',
            explanation: 'The traditional four praharas each carry their own worship — variety keeps the watcher awake.'
          },
          {
            stepNumber: 3,
            instruction: 'Break the fast and the vigil at dawn, with gratitude.',
            explanation: 'The night ends the way every dark night ends — and having watched it through changes the watcher.'
          }
        ],
        significance: 'Legend says even accidental wakefulness this night bears fruit — the Shiva Purana tells of a hunter who stayed awake in a bilva tree, unknowingly dropping its leaves on a linga below, and was liberated by dawn. Attention itself, however imperfect, is the offering.',
        tips: ['Keeping vigil with family or a temple community makes the night joyful rather than grim'],
        commonMistakes: ['Turning the vigil into an endurance contest — a loving half-night outweighs a resentful whole one']
      }
    ],
    fullStory: 'Maha Shivratri, the Great Night of Shiva, is the most sacred festival dedicated to Lord Shiva. It occurs on the fourteenth night of the waning moon in the month of Phalguna, when devotees observe fasting, vigil, and worship throughout the night. This festival celebrates the marriage of Shiva and Parvati and commemorates the divine dance of creation, preservation, and destruction.',
    sections: [
      {
        id: 'shivratri-great-night',
        title: 'The Great Night',
        subtitle: 'One Lamp Burning Against the Darkest Sky',
        storyText: 'Most festivals celebrate a day; Maha Shivratri consecrates **a night** — the fourteenth of the waning moon of Phalguna, one of the darkest nights of the year, when devotees deliberately stay awake.\n\nEvery other festival fills the dark with lamps and firecrackers; **Shivratri lets the dark stand**, and asks you to remain conscious inside it.\n\nThe tradition offers several stories for why — the night Shiva married Parvati, the night he danced the Tandava, the night he drank the poison — but the practice beneath them all is one: **fasting, vigil, and the name**, through the four watches until dawn.'
      },
      {
        id: 'shivratri-why-vigil',
        title: 'Why Stay Awake?',
        subtitle: 'Eyes Open in the Fourth Watch',
        storyText: 'The vigil is the festival\'s teaching in physical form.\n\nThe yogic traditions hold that on this night the planet\'s energies favor inner ascent, and that remaining awake — spine vertical, attention gathered — lets a person receive what sleep would spill. The devotional traditions say it more simply: **love keeps watch.**\n\nAnyone who has sat through the night beside a sick child or waited for a dawn train knows the strange clarity of the small hours; Shivratri claims those hours for the deepest kind of waiting. Shiva is the still point, and the night\'s stillness is the year\'s best doorway to him.',
        teachingText: 'You need not manage the whole night to taste the teaching. Sit awake, intentionally, **one hour past your usual sleep** tonight — no screen, one lamp, the name or the breath.\n\nThe hour that follows tiredness, watchers report, is where the quiet lives. Shivratri institutionalizes that discovery once a year.'
      },
      {
        id: 'shivratri-hunter',
        title: 'The Hunter in the Bilva Tree',
        subtitle: 'Leaves Falling One by One onto a Stone Below',
        storyText: 'The Shiva Purana\'s beloved Shivratri story stars no sage but **a hunter** — a rough man who had never worshiped anything.\n\nBenighted in the forest and afraid of beasts, he climbed a bilva tree and, to stay awake through the cold night, plucked its leaves one by one and dropped them below. Unknown to him, **a Shiva linga stood at the tree\'s foot**; unknowing, hungry, and frightened, he kept an accidental all-night vigil, showering it with Shiva\'s favorite leaves on Shiva\'s own night.\n\nBy dawn, the story insists, his heart had changed — and heaven counted the night as perfect worship.',
        teachingText: 'The hunter\'s story is the tradition at its most generous: intention matters, but **attention counts even when it doesn\'t know itself as worship**.\n\nWhatever kept you awake and watchful through your own hard nights — grief, fear, care — may have been closer to prayer than you knew. Tonight, do knowingly what the hunter did by accident.',
        citationLink: 'deity:shiva',
        citation: 'Shiva Purana (Shivratri mahatmya tellings).',
        checks: [
          {
            id: 'chk:festival:shivratri:hunter',
            kind: 'mcq',
            practice: true,
            prompt: 'A hunter stuck in a bilva tree all night kept dropping leaves that happened to land on a Shiva linga below, and the story says Shiva was pleased. What does that teach?',
            options: [
              { text: 'Shiva responds to sincerity over show, even worship offered by accident reaches him', correct: true },
              { text: 'You must drop exactly the right number of leaves' },
              { text: 'Only trained priests can worship Shiva correctly' },
            ],
            why: 'The hunter did not even mean to worship. Shiva is Bholenath, the easily pleased, moved by a wakeful, sincere heart far more than by correct ritual.',
          },
        ],
      },
      {
        id: 'shivratri-wedding',
        title: 'The Marriage of Stillness and Power',
        subtitle: 'A Wild Bridegroom Arriving to Meet a Radiant Bride',
        storyText: 'The night\'s most joyful reading: Maha Shivratri as **the wedding anniversary of Shiva and Parvati**.\n\nParvati won the unwinnable — the ash-smeared ascetic who had burned desire itself — not by beauty but by matching his discipline with her own tapasya. Their wedding procession is the tradition\'s wildest scene: Shiva arriving on his bull with an entourage of ghosts and misfits, the mountain-king\'s court aghast, Parvati serene.\n\n**Shakti — power, energy, life — married Shiva — stillness, consciousness** — and the philosophers have read the whole cosmos as that marriage ever since.',
        teachingText: 'The union is also inner counsel: **your stillness and your power are meant to be wedded, not alternated.** Meditation that never acts is Shiva without Shakti; action that never stills is Shakti without Shiva.\n\nShivratri, falling weeks before the action-festival of Holi, holds the still pole of the pair. Ask which pole your life over-weights, and what a wedding of the two would change.',
        citationLink: 'deity:parvati',
        citation: 'Shiva Purana, Rudra Samhita (the wedding).',
        checks: [
          {
            id: 'chk:festival:shivratri:wedding',
            kind: 'mcq',
            practice: true,
            prompt: 'Maha Shivratri also marks the wedding of Shiva and Parvati. What does that union represent?',
            options: [
              { text: 'Stillness joined with power, pure awareness (Shiva) and the energy that acts (Parvati), each needing the other', correct: true },
              { text: 'The end of Shiva’s role as a god' },
              { text: 'A purely historical royal marriage' },
            ],
            why: 'Shiva is stillness and awareness; Parvati is Shakti, the power that moves. The marriage says the two belong together: awareness without power does nothing, and power without awareness runs wild.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Koti Rudra Samhita (the hunter\'s Shivratri legend); Rudra Samhita (the marriage of Shiva and Parvati)',
        translation: 'J.L. Shastri, Motilal Banarsidass / wisdomlib.org',
      },
      {
        text: 'Rig Veda',
        locator: '7.59.12 (Mahamrityunjaya mantra, chanted through the vigil)',
        translation: 'public-domain renderings',
      },
      {
        text: 'Living tradition',
        locator: 'Four-prahara night worship, bilva offering, fasting and jagarana — festival practice, labeled as tradition',
      },
    ],
    mythology: [
      'Divine marriage of Shiva and Parvati',
      'Night when Shiva performed the cosmic dance of Tandava',
      'Legend of the hunter who unknowingly worshiped Shiva all night'
    ],
    historicalContext: 'One of the oldest festivals in Hinduism, mentioned in Puranas and celebrated for thousands of years.',
    scriptureReferences: [],
    regionalVariations: [],
    modernAdaptations: [
      'Meditation and yoga sessions',
      'Classical music and dance performances',
      'Digital darshan from famous Shiva temples'
    ],
    familyActivities: [],
    culturalImpact: 'Promotes spiritual awakening, self-discipline, and devotion to the divine.',
    relatedFestivals: ['holi-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'),
  },
  {
    id: 'holi-2025',
    name: 'Holi',
    sanskritName: 'होली',
    date: '2025-03-14',
    // Start = Holika Dahan evening; Rangwali Holi is the following day
    occurrences: ['2025-03-13', '2026-03-03', '2027-03-21', '2028-03-10'], // verified vs Drik Panchang, Jul 2026 (2027 corrected 03-22→03-21)
    emoji: '🎨',
    dateType: 'lunar',
    type: 'cultural',
    significance: 'Festival of colors, love, and spring',
    description: 'Vibrant celebration of the victory of good over evil, love and color',
    traditions: [
      'Playing with colors (gulal)',
      'Water fights',
      'Holika Dahan (bonfire)',
      'Dancing and music',
      'Visiting friends and family'
    ],
    prayers: [
      'Holika Dahan prayers',
      'Krishna mantras',
      'Spring celebration songs'
    ],
    foods: [
      'Gujiya',
      'Mathri',
      'Malpua',
      'Bhang lassi',
      'Papri chaat'
    ],
    colors: ['All colors', 'Especially red, yellow, green, blue'],
    deity: 'Lord Krishna',
    duration: 2,
    importance: 'major',
    rituals: [
      {
        id: 'holika-dahan',
        name: 'Holika Dahan — The Bonfire of Devotion',
        description: 'The eve-of-Holi bonfire commemorating Prahlada\'s deliverance: what was meant to burn the devotee burned the deception instead.',
        timeOfDay: 'evening',
        materials: ['Wood and dried leaves (community pyre or a small home fire)', 'A coconut', 'New grains of the spring harvest (wheat, chana)', 'Roli, rice, and a thread for the pyre'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Before lighting, circle the pyre with water or thread and offer roli, rice, and flowers.',
            explanation: 'The pyre is consecrated first — this is a rite about fire\'s moral direction, not just a blaze.'
          },
          {
            stepNumber: 2,
            instruction: 'Light the fire after sunset at the muhurta; offer the coconut and roast the new grains in the flames.',
            explanation: 'The first grains of spring pass through the fire — harvest gratitude woven into the Prahlada story.'
          },
          {
            stepNumber: 3,
            instruction: 'Circle the fire (parikrama), and name — aloud or silently — one "Holika" of your own: a deception, fear, or resentment you are handing to the flames.',
            explanation: 'Holika sat in the fire wearing stolen protection; whatever in us survives only by deception belongs in this fire.'
          },
          {
            stepNumber: 4,
            instruction: 'Carry a little of the fire\'s warmth home — traditionally an ember or ash — and greet the night as the eve of color.',
            explanation: 'The night burns away the old; the morning paints the new.'
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ नमो भगवते नरसिंहाय',
            transliteration: 'oṁ namo bhagavate narasiṁhāya',
            meaning: 'Om, salutations to Lord Narasimha (the protector of Prahlada)',
            pronunciation: 'om na-mo bha-ga-va-te na-ra-sim-haa-ya'
          }
        ],
        significance: 'Holika Dahan enacts the Bhagavata\'s promise: devotion is fireproof, and the trap set for the innocent consumes its setter.',
        tips: ['If a community pyre isn\'t available, a single candle with the same intention keeps the rite complete'],
        commonMistakes: ['Treating the fire as spectacle and skipping the naming — the parikrama with intention is the ritual\'s heart']
      },
      {
        id: 'rangwali-holi',
        name: 'Rangwali Holi — The Play of Colors',
        description: 'The morning of color-play: hierarchy suspended, grievances dissolved, everyone repainted equal.',
        timeOfDay: 'morning',
        materials: ['Natural gulal (herbal colors)', 'Water, pichkaris (water guns) if playing wet', 'Old white clothes', 'Gujiya and thandai for afterward'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Begin by putting color on your elders\' feet, then let them smear your cheeks in blessing.',
            explanation: 'The play opens with respect — color flows down as blessing before it flies in all directions.'
          },
          {
            stepNumber: 2,
            instruction: 'Play — generously, gently, and with anyone: the tradition\'s rule is "bura na mano, Holi hai" (take no offense, it\'s Holi).',
            explanation: 'For one morning, status, age, and old quarrels are all the same color.'
          },
          {
            stepNumber: 3,
            instruction: 'Before washing, seek out anyone you\'ve been distant from this year and mark them with color.',
            explanation: 'Holi is the traditional day of mending: a smear of gulal has ended feuds no apology could.'
          }
        ],
        significance: 'Under the colors, everyone is the same — the festival\'s enacted theology of equality and forgiveness.',
        tips: ['Natural colors (turmeric, beetroot, flower-based) honor both skin and rivers'],
        commonMistakes: ['Forcing color on the unwilling — consent is part of the play\'s sweetness']
      }
    ],
    fullStory: 'Holi, the Festival of Colors, celebrates the victory of good over evil and the arrival of spring. Based on the legend of Prahlada and the demoness Holika, this joyous festival brings people together to play with colors, dance, and celebrate love and harmony. The festival begins with Holika Dahan, a bonfire ceremony, followed by the colorful celebration known as Rangwali Holi.',
    sections: [
      {
        id: 'holi-fire-first',
        title: 'The Fire Before the Color',
        subtitle: 'A Bonfire at Dusk, Gulal Waiting for Dawn',
        storyText: 'Holi is remembered as India\'s most joyful morning — clouds of pink and green, drenched laughter, strangers made family by pigment.\n\nBut the festival begins the night before, **with fire**. Holika Dahan, the burning of Holika, is the sober root beneath the riot of color: a story about a child who would not stop loving God, the father who tried to kill him for it, and **the fire that could tell the difference between them**.\n\nThe tradition insists on the order — the fire first, then the color. Something must burn before the celebration is honest.'
      },
      {
        id: 'holi-prahlada',
        title: 'The Boy Who Would Not Stop',
        subtitle: 'A Child Serene in a Furious Court',
        storyText: 'The Bhagavata Purana\'s seventh canto tells of **Hiranyakashipu**, a king whose boon made him nearly unkillable and whose pride made him demand worship as God himself.\n\nHis own small son, **Prahlada**, gently refused — he loved Vishnu, and said so, in his father\'s court, again and again. The king tried everything: poison, trampling elephants, serpents, cliffs. The boy, absorbed in remembrance, kept surviving.\n\nSo the king\'s sister **Holika**, who owned a boon that fire could not burn her, took the child onto her lap and sat in a pyre. The fire made its judgment: the protection left the deceiver and shielded the innocent. Holika burned; Prahlada walked out untouched, still praying.',
        teachingText: 'Notice what protected Prahlada: not strength, not cleverness — **remembrance**. His mind was so given to the divine that fear found no purchase.\n\nAnd notice what failed: a real magical protection, voided by misuse. The story\'s law is exact — **grace stolen for cruelty stops being grace.** Whatever advantage you hold, its protection lasts only as long as its purpose is clean.',
        citation: 'Bhagavata Purana, Canto 7, Chapters 5–8.'
      },
      {
        id: 'holi-narasimha',
        title: 'The Pillar That Opened',
        subtitle: 'Neither Man Nor Beast, Neither Day Nor Night',
        storyText: 'The story\'s climax answers the tyrant\'s boon **point by point**. Hiranyakashipu could not be killed by man or beast, indoors or out, by day or night, on earth or sky, by any weapon.\n\n"Where is your Vishnu?" he roared, striking a palace pillar. "Is he in this?" **The pillar split — and Narasimha emerged.**',
        bullets: [
          'Not by man or beast — **half man, half lion, neither**.',
          'Not by day or night — **at twilight**.',
          'Not indoors or out — **on the threshold**.',
          'Not on earth or sky — **lifted onto his lap**.',
          'By no weapon — **with claws**.'
        ],
        teachingText: 'The loopholes that made a tyrant fearless became the exact coordinates of his ending. Then the terrible form grew gentle for one person only: the boy, who came forward without fear and was blessed.\n\nEvery fortress of self-justification has the same architecture as the boon — clauses and conditions that feel airtight. The story\'s warning is that **reality honors the letter of our rationalizations while ending their spirit**. And its comfort is the counter-image: what terrifies the arrogant is tender toward the trusting.',
        citation: 'Bhagavata Purana, Canto 7, Chapters 8–10.',
        checks: [
          {
            id: 'chk:festival:holi:narasimha',
            kind: 'mcq',
            practice: true,
            prompt: 'Hiranyakashipu had a boon that no man or beast could kill him, indoors or out, by day or night. How did Vishnu get past it?',
            options: [
              { text: 'As Narasimha, half man and half lion, at dusk on the threshold, slipping through every gap in the boon', correct: true },
              { text: 'By sending a human warrior to defeat him in open battle at noon' },
              { text: 'By waiting for the boon to expire on its own' },
            ],
            why: 'Vishnu came as Narasimha, neither fully man nor beast, at twilight, on the doorway’s threshold, defeating him inside the boon’s own loopholes.',
          },
        ],
      },
      {
        id: 'holi-krishna-colors',
        title: 'Why the Colors',
        subtitle: 'A Dark-Skinned Boy Painting a Fair-Skinned Girl',
        storyText: 'The color-play\'s beloved origin is a Krishna story, kept warm in the Braj tradition.\n\nThe dark-skinned child Krishna complained to his mother Yashoda: **why is Radha so fair while I am dark?** Yashoda, laughing, offered a mother\'s solution — go paint her whatever color you like. Krishna did, gleefully, and Radha painted him back, and the cowherd village dissolved into the first Holi.\n\nIn Braj — Mathura, Vrindavan, Barsana — Holi still runs for days, the great equalizer descended from one mother\'s joke: **if the difference bothers you, color over it with love.**',
        teachingText: 'The theology hiding in the play: smeared with gulal, every face — rich, poor, old, young, every shade — turns the same colors. For one morning, India repaints itself into what the sages said it always was: **one consciousness in a billion disguises.**\n\n**"Bura na mano, Holi hai"** — take no offense — is the day\'s liturgy: the permission to touch, laugh, and forgive across every line the other 364 days maintain.',
        citationLink: 'deity:krishna',
        citation: 'The Braj Holi (Mathura, Vrindavan, Barsana): living tradition.',
        checks: [
          {
            id: 'chk:festival:holi:colors',
            kind: 'mcq',
            practice: true,
            prompt: 'Once everyone at Holi is smeared in the same colors, what happens to the usual differences between people?',
            options: [
              { text: 'They wash out, for a day rank, age, and old grudges stop mattering and everyone meets as equals', correct: true },
              { text: 'They sharpen, since each color marks a person’s status' },
              { text: 'Nothing, the colors are only decorative' },
            ],
            why: 'Under the gulal you cannot tell rich from poor or friend from rival. Holi levels everyone for a day, which is why people settle old scores with color instead of anger.',
          },
        ],
      },
      {
        id: 'holi-spring',
        title: 'The Festival of Beginning Again',
        subtitle: 'New Wheat Roasting Over the Embers',
        storyText: 'Beneath the stories, Holi is **spring itself made ritual**.\n\nIt falls on the full moon of Phalguna, winter\'s funeral: the new wheat is roasted in the Holika embers, tasted as the year\'s first offering; the fire consumes the old season\'s deadwood; and the next morning the world is repainted from scratch.\n\nFarmers, poets, and sages have all read it the same way — the year turns, the ledger closes, the colors start over. **Old grudges are traditionally settled by nightfall of Rangwali Holi**, because carrying last year\'s grievance into the new spring is considered a failure of the festival itself.',
        teachingText: 'Holi\'s two days are a complete curriculum of renewal: **burn what deceives (the fire), then color what remains (the play).**\n\nMost of us attempt renewal in the wrong order — repainting over what should have burned, or burning without ever getting to the joy. This spring, honor the sequence: name the thing for the fire first. The colors land brighter on cleared ground.'
      }
    ],
    mythology: [
      'Story of Prahlada, Hiranyakashipu, and Holika',
      'Krishna and Radha\'s divine love play with colors',
      'Legend of the ogress Dhundhi being driven away by children\'s noise'
    ],
    historicalContext: 'Ancient spring festival mentioned in Vedic texts, evolving into the modern celebration of unity and joy.',
    scriptureReferences: [
      {
        id: 'holi-bhagavata-prahlada',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 7, chapters 5–8',
        relevance: 'Prahlada\'s unshakable devotion and the attempts on his life — the festival\'s core story'
      },
      {
        id: 'holi-bhagavata-narasimha',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 7, chapters 8–10',
        relevance: 'Narasimha\'s emergence from the pillar and the end of Hiranyakashipu'
      }
    ],
    regionalVariations: [],
    modernAdaptations: [
      'Eco-friendly natural colors',
      'Water conservation initiatives',
      'Community celebrations in parks and societies'
    ],
    familyActivities: [
      {
        id: 'holi-natural-colors',
        title: 'Make Your Own Gulal',
        description: 'Grind and mix natural colors the old way — turmeric for yellow, beetroot for pink, dried flowers and herbs for the rest.',
        ageGroup: 'all_ages',
        duration: '1 hour',
        materials: ['Turmeric + gram flour (yellow)', 'Beetroot juice + cornstarch (pink)', 'Dried rose or marigold petals', 'Mixing bowls'],
        instructions: [
          'Mix each color with a base of flour or cornstarch until powder-soft',
          'Dry in the sun on trays, then bottle and label together',
          'Tell the Krishna-Radha story while you grind: the first Holi colors were homemade too'
        ],
        learningObjective: 'Celebration and care for skin, rivers, and earth are not opposites — the oldest way was the gentlest'
      },
      {
        id: 'holi-one-mending',
        title: 'The Mending Color',
        description: 'Each family member privately chooses one person they\'ve grown distant from this year, and marks them with gulal on Holi morning.',
        ageGroup: 'all_ages',
        duration: 'Ongoing through Holi morning',
        materials: ['A pinch of gulal reserved for the purpose'],
        instructions: [
          'Choose the person the night before, at the Holika fire',
          'On Holi morning, approach first — before they do — and offer the color with both hands',
          '"Bura na mano, Holi hai" does the rest'
        ],
        learningObjective: 'The festival\'s deepest tradition: a smear of color mends what months of silence could not'
      }
    ],
    culturalImpact: 'Breaks social barriers, promotes unity, and celebrates the diversity of life through colors.',
    relatedFestivals: ['maha-shivratri-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'), // TODO cover shopping list: holi-cover.png
    reflectionQuestions: [
      'Holi burns the old year and forgives what was in it. What would you actually have to let go of, to play?',
    ],
    sources: [
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 7, chapters 5–10 (Prahlada, Holika episode, Narasimha)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
      },
      {
        text: 'Braj tradition',
        locator: 'Krishna–Radha color play; Barsana/Vrindavan Holi — living tradition, labeled as such',
      },
    ],
  },
  {
    id: 'ugadi-gudi-padwa-2025',
    name: 'Ugadi & Gudi Padwa',
    sanskritName: 'युगादि · गुढी पाडवा',
    date: '2025-03-30',
    occurrences: ['2025-03-30', '2026-03-19', '2027-04-07', '2028-03-27'], // Chaitra Shukla Pratipada; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '🚩',
    dateType: 'lunar',
    type: 'new_year',
    significance: 'The lunar new year of the Deccan — Ugadi in Telugu and Kannada lands, Gudi Padwa in Maharashtra',
    description: 'One spring morning when half of India starts its year, tastes all six flavors at once, and raises a victory flag',
    traditions: [
      'Ugadi pachadi (the six-taste chutney)',
      'Raising the gudi at the door or balcony',
      'Oil bath before sunrise',
      'Panchanga shravanam (hearing the year\'s almanac read)',
      'Fresh mango-leaf torans on doorways'
    ],
    prayers: [
      'Panchanga shravanam',
      'Prayers to Brahma and to the new year itself'
    ],
    foods: [
      'Ugadi pachadi',
      'Bobbatlu / holige / puran poli',
      'Shrikhand with puri',
      'Raw mango dishes'
    ],
    colors: ['Yellow', 'Mango green', 'Saffron'],
    deity: 'Brahma',
    scripture: 'Brahma Purana',
    duration: 1,
    region: 'Andhra Pradesh, Telangana, Karnataka, Maharashtra, Goa',
    importance: 'regional',
    rituals: [
      {
        id: 'ugadi-pachadi-making',
        name: 'Ugadi Pachadi',
        description: 'The new year\'s first food: a small bowl mixing six tastes, eaten by every member of the family before anything sweet-only is touched.',
        timeOfDay: 'morning',
        materials: ['Neem flowers (bitter)', 'Jaggery (sweet)', 'Raw mango (tang)', 'Tamarind (sour)', 'Salt', 'Green chili or pepper (heat)', 'A small bowl of water to bind it'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'After an oil bath and fresh clothes, mix all six ingredients into one loose chutney.',
            explanation: 'Nothing is left out on purpose. The year ahead will contain all six experiences, so the dish does too.'
          },
          {
            stepNumber: 2,
            instruction: 'Offer the first spoon to the family deity or simply set it before a lamp.',
            explanation: 'The year is received as a gift before it is consumed.'
          },
          {
            stepNumber: 3,
            instruction: 'Each family member eats a spoonful, tasting every flavor together, and only then moves to the festive meal.',
            explanation: 'Eating bitterness and sweetness in the same mouthful is the whole teaching. You accept the year whole, in advance.'
          }
        ],
        significance: 'The pachadi is a philosophy served as food: joy, grief, surprise, anger, fear, and zest will all visit this year, and the family agrees to taste them all.',
        tips: ['Let children guess which ingredient stands for which experience', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Sweetening it until the neem disappears; the bitter note is the point, not a flaw']
      }
    ],
    fullStory: 'Ugadi and Gudi Padwa are one day with two names: Chaitra Shukla Pratipada, the first day after the new moon of Chaitra, when the lunar new year begins for the Telugu, Kannada, Marathi, and Konkani worlds. Tradition holds that Brahma began creation on this day. Telugu and Kannada homes greet the year with ugadi pachadi, a chutney of six tastes eaten so that the whole year, bitter and sweet alike, is accepted in advance. Marathi homes raise the gudi, a silk-draped pole crowned with an upturned pot, as a flag of victory and welcome. The same day opens Chaitra Navratri, and nine days later comes Ram Navami.',
    sections: [
      {
        id: 'ugadi-new-year',
        title: 'The Morning the Year Begins',
        subtitle: 'One Day, Two Names',
        storyText: 'When does the Hindu year begin? The honest answer is that it depends on where your family is from, and one of the great answers is today.\n\n**Chaitra Shukla Pratipada** is the first day after the new moon of the month of Chaitra, in early spring. On this morning the Telugu and Kannada worlds celebrate **Ugadi**, from yuga and adi, meaning the beginning of the age. Maharashtra and Goa celebrate the same day as **Gudi Padwa**.\n\nThe day carries an old weight. Tradition holds that Brahma, the creator, began the making of the universe on this morning, so every new year since is a small echo of the first one.\n\nThe same sunrise also opens Chaitra Navratri, nine nights of the Goddess, and on the ninth day Rama is born. The spring calendar is built like a staircase, and today is its first step.',
        citationLink: 'festival:ram-navami-2025',
        citation: 'Brahma Purana — creation beginning on Chaitra Shukla Pratipada; purana tradition.'
      },
      {
        id: 'ugadi-pachadi',
        title: 'Six Tastes in One Spoon',
        subtitle: 'The New Year, Served as a Chutney',
        storyText: 'Before the feasting, a Telugu or Kannada home does something quietly profound. It serves the year.\n\n**Ugadi pachadi** is a small bowl of chutney with six ingredients, one for each taste the tongue knows. Neem flowers for the bitter. Jaggery for the sweet. Raw mango for the tang. Tamarind for the sour. Salt for itself. Chili for the heat.\n\nEvery member of the family eats a spoonful, all six tastes at once, before anything else. The meaning is spoken aloud to children every year. The months ahead will bring sweetness, and they will also bring bitterness, sourness, and heat, and the family accepts all of it in advance, together, in one bite.\n\nMost new year customs promise a good year. This one promises a whole year, and calls that better.',
        citation: 'Ugadi pachadi — festival practice, labeled as tradition.'
      },
      {
        id: 'ugadi-gudi',
        title: 'The Flag at the Window',
        subtitle: 'A Silk Banner and an Upturned Pot',
        storyText: 'In Maharashtra the day announces itself from the balconies.\n\nAt sunrise a household raises the **gudi**: a tall bamboo pole wrapped in a bright silk cloth, topped with neem leaves, a garland of flowers, sometimes a string of sugar crystals, and crowned with an upturned copper or silver pot. It leans out of a window or stands by the door, visible to the whole street.\n\nThe gudi is a victory flag, and the traditions behind it are plural. Some homes call it **Brahmadhvaj**, the flag of Brahma, for the first morning of creation. Others raise it for remembered victories, of good over harm, of new over stale. Nobody is required to pick one story. The flag means the household expects good things and is not shy about saying so.\n\nUnder it, the day fills with rangoli at the threshold, shrikhand and puran poli at the table, and mango leaves over every door.',
        citation: 'The gudi and its tellings — Marathi tradition; the stories vary by family and are given here as tradition.'
      },
      {
        id: 'ugadi-panchanga',
        title: 'Hearing the Year Out Loud',
        subtitle: 'The Almanac Read to the Family',
        storyText: 'The old centerpiece of the evening is a custom called **panchanga shravanam**, which means hearing the almanac.\n\nThe **panchanga** is the traditional Hindu calendar, the book that holds the year\'s festival dates, eclipses, auspicious windows, and forecasts. On Ugadi evening, at temples and in homes, someone reads the new year\'s panchanga aloud while the family listens. Rain prospects, harvest prospects, the year\'s character.\n\nUnderneath the astrology sits a simple habit worth keeping. Once a year, the whole household sits down and looks at the entire year ahead, out loud, together.',
        teachingText: 'You could keep this new year in one evening. Taste something bitter and something sweet in the same bite, and say what you are accepting in advance. Then talk through the year ahead as a household, plans and festivals and hard months alike.\n\nThe day\'s two customs, the pachadi and the almanac, are the same teaching twice. Meet the year whole, with your eyes open.',
        citation: 'Panchanga shravanam — festival practice, labeled as tradition.'
      }
    ],
    sources: [
      {
        text: 'Brahma Purana',
        locator: 'Creation beginning on Chaitra Shukla Pratipada — purana tradition for the day\'s significance',
        translation: 'named as tradition; the festival\'s customs are practice, not liturgy',
      },
      {
        text: 'Festival practice',
        locator: 'Ugadi pachadi, the gudi, panchanga shravanam — living regional tradition of the Deccan, labeled as tradition',
      },
      {
        text: 'Drik Panchang',
        locator: 'Ugadi / Gudi Padwa dates 2025–2028 (Chaitra Shukla Pratipada)',
      },
    ],
    mythology: [
      'Brahma beginning creation on this morning',
      'The gudi as Brahmadhvaj, the creator\'s flag',
      'The Shalivahana era, counted from this day'
    ],
    historicalContext: 'The day begins the Shalivahana Shaka era used across the Deccan, and remains the civil new year for Telugu, Kannada, Marathi, and Konkani communities. Parallel new years fall nearby for other regions: Cheti Chand for Sindhis on the following day, and the solar new years of Baisakhi, Vishu, and Puthandu in mid-April.',
    scriptureReferences: [
      {
        id: 'ugadi-brahma-purana',
        text: 'puranas',
        section: 'Brahma Purana — creation narrative',
        relevance: 'The tradition that Brahma began creation on Chaitra Shukla Pratipada, making this the anniversary of the world'
      }
    ],
    regionalVariations: [
      {
        region: 'Andhra Pradesh, Telangana, Karnataka',
        localName: 'Ugadi / Yugadi',
        uniqueTraditions: ['Ugadi pachadi', 'Panchanga shravanam at temples', 'Kavi sammelanam (new year poetry gatherings)'],
        specialFoods: ['Ugadi pachadi', 'Bobbatlu / holige', 'Pulihora'],
        localCustoms: 'The day opens with an oil bath and ends, in many towns, with poets reading new work for the new year.'
      },
      {
        region: 'Maharashtra and Goa',
        localName: 'Gudi Padwa / Samvatsar Padvo',
        uniqueTraditions: ['Raising the gudi at sunrise', 'Rangoli at thresholds', 'New ventures begun on the day'],
        specialFoods: ['Shrikhand-puri', 'Puran poli', 'Neem with jaggery'],
        localCustoms: 'Counted among the year\'s most auspicious days, when new homes are entered and new businesses opened without consulting the calendar further.'
      }
    ],
    modernAdaptations: [
      'New year poetry meets (kavi sammelanam) broadcast on Telugu television',
      'Gudi-raising photos as the day\'s social media ritual',
      'Six-tastes reflections used in classrooms and family WhatsApp groups'
    ],
    familyActivities: [
      {
        id: 'ugadi-six-tastes',
        title: 'Name Your Six Tastes',
        description: 'While eating the pachadi, each person names one hope (sweet), one worry (bitter), and one thing that will take real effort (heat) for the year ahead.',
        ageGroup: 'all_ages',
        duration: '30 minutes',
        materials: ['The ugadi pachadi, or simply a piece of jaggery and a neem or bitter-gourd sliver'],
        instructions: [
          'Pass the bowl around the table',
          'With each spoonful, the eater names their sweet, their bitter, and their heat for the coming year',
          'Nobody fixes or answers anyone; the year is tasted, not solved'
        ],
        learningObjective: 'A year accepted whole in advance is easier to live through than a year negotiated month by month'
      }
    ],
    culturalImpact: 'The Deccan\'s new year keeps alive one of the tradition\'s most practical philosophies: the six-taste teaching that a good life is a complete one, not a uniformly sweet one.',
    relatedFestivals: ['ram-navami-2025', 'makar-sankranti-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'), // TODO cover shopping list: ugadi-gudi-padwa-cover.png
  },
  {
    id: 'ram-navami-2025',
    name: 'Ram Navami',
    sanskritName: 'राम नवमी',
    date: '2025-04-06',
    occurrences: ['2025-04-06', '2026-03-26', '2027-04-15', '2028-04-03'], // verified vs Drik Panchang, Jul 2026
    emoji: '🏹',
    dateType: 'lunar',
    type: 'deity_celebration',
    significance: 'Birth anniversary of Lord Rama',
    description: 'Celebration of the birth of Lord Rama, the seventh avatar of Vishnu',
    traditions: [
      'Reading Ramayana',
      'Ram Katha recitation',
      'Processions with Ram idols',
      'Visiting Ram temples',
      'Charitable activities'
    ],
    prayers: [
      'Ram Raksha Stotra',
      'Hanuman Chalisa',
      'Ramayana recitation'
    ],
    foods: [
      'Panakam (sweet drink)',
      'Kosambari',
      'Sweet pongal',
      'Fruits'
    ],
    colors: ['Yellow', 'Red', 'Orange'],
    deity: 'Lord Rama',
    scripture: 'Ramayana',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'ram-navami-noon',
        name: 'The Noon Birth Celebration',
        description: 'Rama was born at midday — the festival\'s central worship happens as the sun reaches its height, with a cradle, the Ram Raksha, and panakam.',
        timeOfDay: 'afternoon',
        materials: ['A small murti or picture of baby Rama (or Rama with Sita, Lakshmana, and Hanuman)', 'A cradle or swing decorated with flowers', 'Panakam (jaggery-lime-cardamom water) and fruits', 'Tulsi leaves, a ghee lamp'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'In the morning, bathe and dress the murti and prepare the flower-decked cradle.',
            explanation: 'Rama is welcomed as Ayodhya welcomed him — as the longed-for child of the whole house.'
          },
          {
            stepNumber: 2,
            instruction: 'As noon approaches, place the baby Rama in the cradle and rock it gently while singing bhajans.',
            explanation: 'Madhyahna — midday — is the traditional hour of the birth; the rocking marks the moment.'
          },
          {
            stepNumber: 3,
            instruction: 'Offer panakam and fruit, perform arati, and recite the Ram Raksha Stotra or a Ramayana passage.',
            explanation: 'Panakam, the cooling jaggery drink, suits the spring heat of Chaitra — celebration matched to season.'
          },
          {
            stepNumber: 4,
            instruction: 'Share the prasad, and if you can, read aloud one story of Rama before evening.',
            explanation: 'Ram Navami is above all a storytelling festival — the epic is the worship.'
          }
        ],
        mantras: [
          {
            sanskrit: 'श्री राम जय राम जय जय राम',
            transliteration: 'śhrī rāma jaya rāma jaya jaya rāma',
            meaning: 'Glory to Rama, victory to Rama — the thirteen-syllable Ram mantra beloved of saints from Samartha Ramdas to Gandhi',
            pronunciation: 'shree raa-ma ja-ya raa-ma ja-ya ja-ya raa-ma'
          }
        ],
        significance: 'The noon celebration marks the moment the Valmiki Ramayana gives for Rama\'s birth — Chaitra Shukla Navami, the ninth day of the bright fortnight, under the Punarvasu star.',
        tips: ['South Indian homes often also celebrate Sita-Rama kalyanam (their wedding) today — a family day end to end'],
        commonMistakes: ['Letting the day pass without a story told aloud — the Ramayana was composed to be heard']
      }
    ],
    fullStory: 'Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu and the epitome of righteousness (dharma). Born to King Dasharatha and Queen Kausalya in Ayodhya, Rama\'s life story as told in the Ramayana exemplifies the ideal qualities of a son, husband, king, and human being. This festival marks the culmination of nine days of spiritual observance and is celebrated with great devotion across India.',
    sections: [
      {
        id: 'ram-navami-ninth-day',
        title: 'The Ninth Day of Spring\'s New Year',
        subtitle: 'Ayodhya Decked in Mango Leaves at Midday',
        storyText: 'Ram Navami crowns the nine days of **Chaitra Navratri**: the Hindu lunar year opens, nine nights honor the Goddess, and on the ninth day — Chaitra Shukla Navami — **Rama is born at noon** in Ayodhya.\n\nThe placement is deliberate poetry: the year begins, the divine feminine is honored, and then **dharma itself takes human birth**.\n\nAcross India the day is kept with cradles rocked at midday, the Ram Raksha recited, panakam cooling the first spring heat, and everywhere — in temples, courtyards, and now car stereos — the story being told again.'
      },
      {
        id: 'ram-navami-yajna',
        title: 'The King Who Longed for a Son',
        subtitle: 'Sacred Fire, and a Golden Vessel of Kheer',
        storyText: 'The Valmiki Ramayana opens the story with an ache: **Dasharatha**, king of Ayodhya, mighty and beloved, has three queens and no child.\n\nOn his sages\' counsel he performs the **putrakameshti yajna** — the fire rite for offspring. From the flames rises a radiant being bearing a vessel of divine kheer for the queens. Kausalya bears Rama, Kaikeyi bears Bharata, Sumitra bears the twins Lakshmana and Shatrughna.\n\nHeaven, meanwhile, has its own reason: the gods, oppressed by Ravana — untouchable by divine hands through his boon — have asked **Vishnu to be born as a man**. The king\'s longing and the world\'s need meet in one child.',
        teachingText: 'The tradition loves this convergence: Rama is born because a father ached for a son AND because the world ached for a rescuer — **private longing and cosmic purpose in one birth**.\n\nIt reads every birth that way. The child given to you, or the one you were, arrives carrying both a family\'s hope and some purpose the family cannot yet see.',
        citationLink: 'deity:rama',
        citation: 'Valmiki Ramayana, Bala Kanda, sargas 8–16.'
      },
      {
        id: 'ram-navami-noon-birth',
        title: 'Born at Noon',
        subtitle: 'The Sun at Its Height Over Ayodhya',
        storyText: 'Krishna arrives at midnight in a prison; **Rama arrives at high noon in a rejoicing palace** — Chaitra Shukla Navami, Punarvasu nakshatra, the sun exalted.\n\nThe tradition reads the contrast as a teaching about how dharma comes into the world: sometimes as hidden rescue in the dark, sometimes as **open glory in full daylight**. Rama is the noon-born — the standard held up publicly, the ideal that does not hide.\n\nAyodhya\'s celebration lasted days; the Ramayana lingers on the city\'s joy the way it will later linger on the city\'s grief at his exile.',
        teachingText: 'Midnight births and noon births both happen in a life — some of your best chapters begin in secret difficulty, others in open blessing.\n\nRam Navami honors the noon kind: **the visible commitments, publicly made** — a marriage, a vow, a stand taken in daylight. What in your life needs to be born at noon, where everyone can see it and hold you to it?',
        citation: 'Valmiki Ramayana, Bala Kanda, sarga 18.'
      },
      {
        id: 'ram-navami-story-festival',
        title: 'A Festival Made of Story',
        subtitle: 'A Katha Teller\'s Raised Hand, an Audience Leaning In',
        storyText: 'More than any ritual, Ram Navami is kept by **narration**.\n\nFor centuries the days around it have been the great season of **Ram Katha** — the Ramayana told aloud by kathakars to town squares, Tulsidas\'s **Ramcharitmanas** sung in Awadhi, nine-day recitation marathons ending today.\n\nThe tradition\'s insight is that Rama\'s power is transmitted narratively: you cannot summarize a character into someone\'s heart, you can only **tell the story** until the listener has walked the exile, waited with Bharata, leapt with Hanuman, and come home. The epic ends with its own instruction: this story, heard, purifies.',
        teachingText: 'Keep the festival its own way: **tell someone the story**. A child at bedtime, a friend over dinner — the exile, the sandals, Shabari\'s berries, the bridge.\n\nYou will find the teller receives the story again in the telling. That, for three thousand years, is how Rama has traveled.'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Bala Kanda, sargas 8–16 (putrakameshti yajna), sarga 18 (the birth: Chaitra Shukla Navami, Punarvasu)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/',
      },
      {
        text: 'Ramcharitmanas',
        locator: 'Tulsidas (16th c.) — the Ram Katha tradition and noon-birth celebration; named as devotional tradition',
      },
      {
        text: 'Drik Panchang',
        locator: 'Ram Navami dates 2026–2028 and madhyahna muhurta convention',
      },
    ],
    mythology: [
      'Divine birth of Rama to destroy evil and establish dharma',
      'The story of King Dasharatha\'s penance for a son',
      'Rama\'s life journey from prince to perfect king'
    ],
    historicalContext: 'Celebration dating back to ancient times, with the Ramayana being one of India\'s greatest epics.',
    scriptureReferences: [],
    regionalVariations: [],
    modernAdaptations: [
      'Ramayana recitation marathons',
      'Digital storytelling for children',
      'Community service in Rama\'s honor'
    ],
    familyActivities: [],
    culturalImpact: 'Teaches moral values, righteousness, and the importance of duty and honor.',
    relatedFestivals: ['diwali-2025', 'hanuman-jayanti-2025', 'ugadi-gudi-padwa-2025', 'dussehra-2025'],
    heroImageUrl: require('../../assets/images/covers/ramayana-cover.png'),
  },
  {
    id: 'hanuman-jayanti-2025',
    name: 'Hanuman Jayanti',
    sanskritName: 'हनुमान जयन्ती',
    date: '2025-04-12',
    occurrences: ['2025-04-12', '2026-04-02', '2027-04-20', '2028-04-09'], // Chaitra Purnima; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '⛰️',
    dateType: 'lunar',
    type: 'deity_celebration',
    significance: 'The birth of Hanuman, on the full moon of Chaitra',
    description: 'The birthday of the servant who forgot his own strength, six days after his lord\'s',
    traditions: [
      'Sunrise celebrations (Hanuman was born at dawn)',
      'Reciting the Hanuman Chalisa',
      'Reading the Sundara Kanda aloud',
      'Offering sindoor and oil',
      'Boondi and besan laddus as prasad'
    ],
    prayers: [
      'Hanuman Chalisa',
      'Sundara Kanda recitation',
      'Bajrang Baan'
    ],
    foods: [
      'Boondi laddu',
      'Besan laddu',
      'Bananas',
      'Paan (offered, then shared)'
    ],
    colors: ['Sindoor orange', 'Red', 'Saffron'],
    deity: 'Hanuman',
    scripture: 'Ramayana',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'hanuman-chalisa-recitation',
        name: 'The Chalisa at Dawn',
        description: 'Hanuman was born at sunrise, so his day begins there: a lamp, a little sindoor, and the forty verses that most of North India knows by heart.',
        timeOfDay: 'dawn',
        materials: ['A picture or murti of Hanuman', 'A ghee or mustard-oil lamp', 'Sindoor and a few drops of oil', 'Boondi or besan laddus for prasad', 'The Hanuman Chalisa text (or memory)'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Bathe, light the lamp, and touch a little sindoor to Hanuman\'s image (or simply to the base of the picture).',
            explanation: 'Sindoor recalls the story of Hanuman covering his whole body in it for Rama\'s sake, told below in this reader.'
          },
          {
            stepNumber: 2,
            instruction: 'Recite the Hanuman Chalisa once, slowly enough to hear the words.',
            explanation: 'Forty verses by the poet Tulsidas. Speed is traditional on hard days; on his birthday, take your time.'
          },
          {
            stepNumber: 3,
            instruction: 'Offer the laddus, then share them as prasad.',
            explanation: 'Prasad is an offering returned as blessing; Hanuman\'s is famously sweet and simple.'
          },
          {
            stepNumber: 4,
            instruction: 'Before you rise, name one strength you have been talking yourself out of.',
            explanation: 'Hanuman\'s story turns on being reminded of what he could already do. The birthday works best as that reminder.'
          }
        ],
        mantras: [
          {
            sanskrit: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
            transliteration: 'manojavaṁ māruta-tulya-vegaṁ jitendriyaṁ buddhimatāṁ variṣṭham, vātātmajaṁ vānara-yūtha-mukhyaṁ śrī-rāma-dūtaṁ śaraṇaṁ prapadye',
            meaning: 'Swift as thought, fast as the wind, master of his senses, first among the wise — son of the wind, chief of the vanaras, messenger of Rama: in him I take refuge',
            pronunciation: 'ma-no-ja-vam maa-ru-ta-tul-ya-ve-gam ji-ten-dri-yam bud-dhi-ma-taam va-rish-tham'
          }
        ],
        significance: 'The dhyana shloka recited before Hanuman worship across traditions, gathering his qualities into four lines: speed, discipline, wisdom, service.',
        tips: ['Tuesdays and Saturdays are Hanuman\'s weekly days; the Jayanti is their once-a-year crown', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Racing the Chalisa; the verses are a portrait, not a countdown']
      }
    ],
    fullStory: 'Hanuman Jayanti celebrates the birth of Hanuman on the full moon of Chaitra, six days after Ram Navami. Son of Anjana and the wind god Vayu, Hanuman is the Ramayana\'s greatest devotee: the vanara who leapt the ocean to find Sita, carried a mountain to save a life, and asked for nothing but service. His story carries one of the tradition\'s most loved teachings — as a child he was made to forget his own powers, and at the shore of the ocean an old friend had to remind him who he was before he could leap.',
    sections: [
      {
        id: 'hanuman-jayanti-birth',
        title: 'Born of the Wind',
        subtitle: 'A Full Moon, Six Days After Ram Navami',
        storyText: 'Walk through almost any town in India and count the temples. In much of the country, the god you will meet most often is not one of the great three. He has a monkey\'s face, a mace on his shoulder, and a mountain in his hand.\n\n**Hanuman Jayanti**, on the full moon of Chaitra, is his birthday. The calendar\'s placement is quiet poetry: Rama is born on the ninth day, and his greatest servant six days later, as if the story were already assembling itself.\n\nHanuman is the son of **Anjana**, a vanara queen, and of **Vayu**, the wind itself. His other names remember this. Maruti and Pavan-putra both mean son of the wind, and the wind\'s gifts, speed and breath and tirelessness, run through everything he does.',
        citation: 'Valmiki Ramayana — Hanuman\'s parentage; birth-day observance per Drik Panchang convention (Chaitra Purnima).'
      },
      {
        id: 'hanuman-jayanti-sun',
        title: 'The Baby Who Leapt at the Sun',
        subtitle: 'A Fruit Too Bright to Resist',
        storyText: 'The Ramayana\'s final book tells his childhood in one astonishing scene.\n\nThe infant Hanuman wakes hungry. Through the trees he sees the rising sun, round and golden, and takes it for a ripe fruit. So he jumps for it. Not toward the treetops. Toward the sun, gaining on it, while the sky gods watch in alarm.\n\nIndra, king of the gods, hurls his thunderbolt. It strikes the child\'s jaw and drops him to the earth, and from that broken jaw, hanu in Sanskrit, comes the name **Hanuman**. His father the wind, in grief, pulls the air out of the world until the gods relent. They heap the boy with boons: strength no weapon can undo, life no fight can end.\n\nBut power like that in a child is chaos, and after some well-aimed mischief at the hermitages, the sages set one final condition on him. **Hanuman would forget what he could do, until someone reminded him.**',
        citation: 'Valmiki Ramayana, Uttara Kanda, sargas 35–36 — the childhood story, as the epic\'s tradition tells it.'
      },
      {
        id: 'hanuman-jayanti-leap',
        title: 'The Friend Who Reminded Him',
        subtitle: 'At the Shore of a Hundred-Yojana Sea',
        storyText: 'Years later that condition becomes the hinge of the whole epic.\n\nThe search parties looking for the kidnapped Sita reach the southern shore and stop dead. The ocean to Lanka is a hundred yojanas wide. No monkey on the beach can jump it, and the mission is hours from failing.\n\nThen **Jambavan**, the old bear king, turns to the quiet one sitting apart and begins to speak. He tells Hanuman his own story back to him. Son of the wind. The child who leapt at the sun. Strength without measure, sleeping only because you forgot it. Why do you sit silent, he asks, when you alone can do this?\n\nAnd Hanuman remembers. He grows until the mountain he stands on groans under him, and he leaps, and the next book of the Ramayana, the **Sundara Kanda**, the beautiful chapter, is his alone: the crossing, the finding of Sita, the burning of Lanka, the return.',
        teachingText: 'The tradition has held onto this scene for thousands of years because everyone is standing on that beach eventually.\n\nHanuman\'s strength was never gone. It was forgotten, and it took a friend naming it out loud to bring it back. Some years you are Hanuman, talked out of your own capacity. Some years your only job is to be Jambavan for somebody else.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda, sargas 66–67; Sundara Kanda, sarga 1.'
      },
      {
        id: 'hanuman-jayanti-devotee',
        title: 'The Perfect Servant',
        subtitle: 'Sindoor, a Torn-Open Heart, and Forty Verses',
        storyText: 'For all his power, what the tradition worships in Hanuman is not strength. It is what the strength is for.\n\nHe asks Rama for no kingdom and no boon, only to serve. Later tradition tells two stories that devotees love. In one, Hanuman sees Sita put sindoor in her hair for Rama\'s long life, and covers his entire body in it, reasoning that more must be better. In the other, asked what Rama means to him, he tears open his chest, and Rama and Sita are seated in his heart. Both are later devotional tellings rather than Valmiki\'s text, and both are told because they are true to him.\n\nIn the sixteenth century the poet **Tulsidas** gathered this devotion into forty Hindi verses, the **Hanuman Chalisa**, now recited daily by more people than almost any poem on earth. On Hanuman Jayanti it is sung at sunrise, because that is when he was born.',
        teachingText: 'Hanuman is the tradition\'s answer to a hard question: what does power look like when the ego is gone from it? It looks like this. Immense capacity, complete devotion, and no interest at all in credit.',
        citation: 'Sindoor and heart stories — later devotional tradition, labeled as such; Hanuman Chalisa, Tulsidas (16th c.).'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Kishkindha Kanda 66–67 (Jambavan\'s reminder), Sundara Kanda (the leap and search), Uttara Kanda 35–36 (childhood and the sun)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/',
      },
      {
        text: 'Hanuman Chalisa',
        locator: 'Tulsidas (16th c.) — devotional tradition; sindoor and opened-chest stories named as later tradition',
      },
      {
        text: 'Drik Panchang',
        locator: 'Hanuman Jayanti dates 2025–2028 (Chaitra Purnima); regional observances noted',
      },
    ],
    mythology: [
      'The infant\'s leap at the sun and Indra\'s thunderbolt',
      'The boon-and-forgetting that shaped his life',
      'The leap to Lanka and the burning of the city',
      'Carrying the mountain of herbs to save Lakshmana'
    ],
    historicalContext: 'Hanuman worship is among the most widespread in Hinduism, with wayside shrines outnumbering those of most major deities across North India. The Chalisa tradition dates to Tulsidas in the sixteenth century.',
    scriptureReferences: [
      {
        id: 'hanuman-sundara-kanda',
        text: 'ramayana',
        section: 'Sundara Kanda',
        relevance: 'The book named for its beauty is Hanuman\'s book: the crossing of the ocean, the finding of Sita, and the proof of what remembered strength can do'
      }
    ],
    regionalVariations: [
      {
        region: 'Tamil Nadu',
        localName: 'Hanumath Jayanti',
        uniqueTraditions: ['Observed in Margashirsha (December–January) on the new moon, by a different reckoning of his birth'],
        specialFoods: ['Vada mala (garlands of savory vadas)'],
        localCustoms: 'The vada garland draped on Hanuman\'s murti is the distinctive southern offering.'
      },
      {
        region: 'Andhra Pradesh and Telangana',
        localName: 'Hanuman Jayanti (Deeksha)',
        uniqueTraditions: ['A 41-day deeksha (vow) ending on Bahula Dashami in Vaishakha'],
        specialFoods: ['Simple sattvic meals through the deeksha'],
        localCustoms: 'Devotees keep an austere vow for 41 days, the festival arriving as its completion rather than a single morning.'
      }
    ],
    modernAdaptations: [
      'Chalisa recitation streaks kept on apps and family groups',
      'Sundara Kanda parayana (full readings) organized in housing societies',
      'Hanuman as the icon of gyms and akharas across North India'
    ],
    familyActivities: [
      {
        id: 'hanuman-jayanti-jambavan',
        title: 'Play Jambavan',
        description: 'Around the table, each person is reminded of a strength they have stopped using — by someone else, out loud, the way Jambavan did it.',
        ageGroup: 'all_ages',
        duration: '20 minutes',
        materials: ['None'],
        instructions: [
          'Go around the circle; for each person, someone else names a real capacity they have seen them use',
          'The rule from the story: it must be a reminder of something true, not flattery',
          'End with each person saying what they will do with the reminded strength this month'
        ],
        learningObjective: 'Hanuman\'s teaching in practice: most forgotten strength comes back when a friend names it'
      }
    ],
    culturalImpact: 'Hanuman gives the tradition its model of strength without ego and devotion without transaction, and his Chalisa is arguably the most-recited poem in the world.',
    relatedFestivals: ['ram-navami-2025', 'dussehra-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'), // TODO cover shopping list: hanuman-jayanti-cover.png
  },
  {
    id: 'ratha-yatra-2025',
    name: 'Ratha Yatra',
    sanskritName: 'रथ यात्रा',
    date: '2025-06-27',
    occurrences: ['2025-06-27', '2026-07-16', '2027-07-05', '2028-06-24'], // Ashadha Shukla Dwitiya; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '🛞',
    dateType: 'lunar',
    type: 'pilgrimage',
    significance: 'Jagannath\'s chariot journey at Puri — the day the god leaves his temple to meet everyone',
    description: 'Three colossal wooden chariots, a million hands on the ropes, and a deity who comes out to the street',
    traditions: [
      'Pulling the chariot ropes',
      'Chhera Pahanra (the king sweeps the chariots)',
      'Nine days at the Gundicha temple',
      'Bahuda Yatra (the return journey)',
      'Kirtan and mahaprasad'
    ],
    prayers: [
      'Jagannath ashtakam',
      'Hare Krishna kirtan along the route'
    ],
    foods: [
      'Mahaprasad from the temple kitchen',
      'Khaja (layered sweet)',
      'Dalma (dal with vegetables)',
      'Poda pitha'
    ],
    colors: ['Red and yellow (Nandighosha)', 'Black and white (Jagannath\'s round eyes)', 'Green'],
    deity: 'Jagannath (Krishna), with Balabhadra and Subhadra',
    scripture: 'Skanda Purana',
    duration: 9,
    region: 'Odisha (Puri), now worldwide',
    importance: 'regional',
    rituals: [
      {
        id: 'ratha-yatra-joining',
        name: 'Joining a Ratha Yatra',
        description: 'The festival\'s only real ritual is participation: being in the crowd, touching the rope, and pulling. Most large cities now have one.',
        timeOfDay: 'afternoon',
        materials: ['Comfortable clothes for a crowd', 'Water', 'Something to offer the prasad line (optional)'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Find the nearest Ratha Yatra — Puri if you are lucky, otherwise the local ISKCON or Odia association procession.',
            explanation: 'The festival went global in 1968 when ISKCON held one in San Francisco; London, New York, and hundreds of cities now roll chariots every summer.'
          },
          {
            stepNumber: 2,
            instruction: 'When the chariot passes, take hold of the rope and pull, even for a few steps.',
            explanation: 'Pulling the ratha is the heart of the festival and is open to absolutely anyone; tradition holds the act itself to be purifying.'
          },
          {
            stepNumber: 3,
            instruction: 'Accept the prasad, stay for the kirtan, and look up at the eyes.',
            explanation: 'Jagannath\'s huge round eyes are the point of the journey: darshan, the exchange of seeing, offered to the whole street at once.'
          }
        ],
        significance: 'On the street there is no doorway, no queue, and no restriction; the rope is the same thickness in every hand.',
        tips: ['Go early; the chariot moves in surges with long pauses that are themselves part of the tradition', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Treating it as a spectacle to photograph rather than a rope to hold']
      }
    ],
    fullStory: 'Every summer at Puri, on the second day of the bright fortnight of Ashadha, the deities Jagannath, Balabhadra, and Subhadra leave their temple and ride three newly built wooden chariots down the Grand Road to the Gundicha temple, where they stay nine days before the return journey. It is one of the oldest continuously celebrated processions on earth, the origin of the English word "juggernaut," and its meaning is radical hospitality: the god who is normally approached through temple doors comes out to be seen by everyone, and anyone at all may pull his chariot.',
    sections: [
      {
        id: 'ratha-yatra-out',
        title: 'The Day the God Comes Out',
        subtitle: 'Grand Road, Puri, a Sea of Hands',
        storyText: 'A temple is a house with a threshold, and a threshold can be a barrier. For centuries, not everyone could enter the great temple at Puri.\n\nOnce a year, the temple answers that problem in the most direct way imaginable. **The god comes out.**\n\nOn Ratha Yatra morning, **Jagannath**, whose name means Lord of the Universe, is carried out of his sanctum with his elder brother **Balabhadra** and his sister **Subhadra**, and the three are seated on three enormous wooden chariots, as tall as buildings, on the Grand Road. Then a million people take up the ropes and pull them, three kilometers, to the Gundicha temple where they will spend nine days.\n\nOn the road there is no doorway and no restriction of caste, creed, or faith. Whoever reaches the rope, pulls. Nineteenth-century British observers, staggered by the scale of the unstoppable chariots, took one of Jagannath\'s names into English: **juggernaut**.',
        citation: 'Skanda Purana, Purushottama Kshetra Mahatmya — the festival\'s charter; "juggernaut" etymology, documented history.'
      },
      {
        id: 'ratha-yatra-jagannath',
        title: 'The Unfinished God',
        subtitle: 'Great Round Eyes in Neem Wood',
        storyText: 'Jagannath does not look like other murtis, and that is the first thing everyone notices. A great blocky form of painted neem wood, stumps for arms, and enormous round eyes that never blink.\n\nOdia tradition tells why with a story. The divine craftsman **Vishwakarma** agreed to carve the deity on one condition: the door stays shut until the work is done. Weeks passed in silence. The king, unable to bear it, opened the door early, and the craftsman vanished, leaving the form unfinished. The unfinished form is what has been worshiped ever since.\n\nThe tradition kept the accident as a teaching. The god does not require completion to be present, and neither does anything else you are waiting to finish before you show it.\n\nHe is understood as **Krishna** in his Puri form, and unlike stone deities, the wooden bodies are periodically remade in a rite called Nabakalebara, the new embodiment. The god stays; the form is allowed to be replaced.',
        citation: 'The unfinished-murti story — Odia tradition, labeled as tradition; Jagannath as Krishna, per the Puri tradition.'
      },
      {
        id: 'ratha-yatra-king-sweeps',
        title: 'The King Sweeps the Floor',
        subtitle: 'A Golden Broom on a Chariot Platform',
        storyText: 'Before a single rope is pulled, the festival performs its sharpest teaching.\n\nThe **Gajapati**, the hereditary king of Puri, arrives in state. He climbs onto each chariot in turn. And then, with a gold-handled broom, the king sweeps the chariot platforms clean, like the lowest servant of the house. The rite is called **Chhera Pahanra**.\n\nThe crowd watches the region\'s most exalted man do a sweeper\'s work for the god, and the message needs no sermon. Before Jagannath, the king of Puri holds the same rank as everyone else holding the rope.\n\nThe chariots themselves carry a related lesson. All three, Nandighosha, Taladhwaja, and Darpadalana, are built new every single year, by hereditary carpenter families working to measurements passed down for centuries, and dismantled after. Nothing about the festival is stored. It is rebuilt, every year, by hand.',
        teachingText: 'A festival is a machine for saying something too big for words. This one says: rank ends where the rope begins.\n\nThe king sweeping is the old society inverting itself on purpose, once a year, in public, so nobody forgets it can.',
        citation: 'Chhera Pahanra and the yearly chariot-building — documented Puri temple tradition.'
      },
      {
        id: 'ratha-yatra-journey',
        title: 'Nine Days at the Aunt\'s House',
        subtitle: 'There, a Stay, and the Ride Home',
        storyText: 'Where are the chariots going? Tradition gives the warmest possible answer: to the aunt\'s house.\n\nThe **Gundicha temple**, three kilometers away, is described as the home of the deities\' aunt, and by some tellings the garden where they were first carved. The three stay nine days, fed and fussed over, and then ride home on the **Bahuda Yatra**, the return journey, pausing on the way for poda pitha, a rustic burnt rice cake said to be Jagannath\'s favorite, exactly the kind of thing an aunt would make.\n\nThe theology inside the sweetness is real. For nine days the Lord of the Universe keeps a family visit, because in the Krishna tradition, God is not primarily a judge or a king. He is a relative. The festival lets the whole city walk along on the family errand.\n\nSince 1968, when devotees rolled a chariot through San Francisco, Ratha Yatra has gone wherever Odias and the Hare Krishna movement have gone. There is likely one within reach of you every summer.',
        teachingText: 'You do not have to travel to Puri. Find a local yatra, put a hand on the rope, and pull. The festival\'s whole teaching passes through the palm: grace does not wait indoors for the qualified. Once a year, at minimum, it comes down your street.',
        citation: 'Gundicha stay and Bahuda Yatra — Puri tradition; ISKCON\'s 1968 San Francisco yatra, documented history.'
      }
    ],
    sources: [
      {
        text: 'Skanda Purana',
        locator: 'Purushottama Kshetra Mahatmya — the sanctity of Puri and the chariot festival; purana tradition',
        translation: 'named as tradition; cross-checked against public summaries (wisdomlib.org)',
      },
      {
        text: 'Puri temple tradition',
        locator: 'Chhera Pahanra, yearly chariot construction, Nabakalebara, the Gundicha stay — documented living tradition of the Jagannath temple',
      },
      {
        text: 'Documented history',
        locator: '"Juggernaut" entering English (19th c.); ISKCON\'s first overseas Ratha Yatra, San Francisco, 1968',
      },
      {
        text: 'Drik Panchang',
        locator: 'Ratha Yatra dates 2025–2028 (Ashadha Shukla Dwitiya)',
      },
    ],
    mythology: [
      'The unfinished murti and the impatient king',
      'Jagannath as Krishna, with Balabhadra and Subhadra',
      'The journey to the Gundicha temple and the return'
    ],
    historicalContext: 'The Puri Ratha Yatra is among the oldest continuously observed processions in the world, recorded by travelers for many centuries, and the source of the English word "juggernaut." ISKCON carried the festival worldwide beginning in 1968.',
    scriptureReferences: [
      {
        id: 'ratha-yatra-skanda',
        text: 'puranas',
        section: 'Skanda Purana, Purushottama Kshetra Mahatmya',
        relevance: 'The purana\'s praise of Puri and its festival, the traditional charter for the yatra'
      }
    ],
    regionalVariations: [
      {
        region: 'Puri, Odisha',
        localName: 'Shri Gundicha Yatra',
        uniqueTraditions: ['Chhera Pahanra by the Gajapati king', 'Three chariots built new each year', 'Nabakalebara in designated years'],
        specialFoods: ['Mahaprasad from the world\'s largest temple kitchen', 'Poda pitha on the return'],
        localCustoms: 'The original: a million or more pilgrims on the Grand Road, and the deities treated as family members on a family visit.'
      },
      {
        region: 'Worldwide (ISKCON and Odia associations)',
        localName: 'Festival of the Chariots',
        uniqueTraditions: ['City-center processions with kirtan', 'Free feast distribution'],
        specialFoods: ['Vegetarian feast plates'],
        localCustoms: 'From Trafalgar Square to Fifth Avenue, the chariot rolls through secular downtowns, which is precisely the point.'
      }
    ],
    modernAdaptations: [
      'Live broadcast of the Puri yatra watched by tens of millions',
      'City Ratha Yatras on every continent each summer',
      'Volunteer-run free kitchens along procession routes'
    ],
    familyActivities: [
      {
        id: 'ratha-yatra-pull',
        title: 'Find Your Local Yatra',
        description: 'Look up the nearest summer Ratha Yatra, go as a family, and make sure every member, from the youngest up, gets a hand on the rope.',
        ageGroup: 'all_ages',
        duration: 'Half a day',
        materials: ['Nothing but the trip'],
        instructions: [
          'Search for a Ratha Yatra or "Festival of the Chariots" in your city or the nearest large one',
          'Explain the one rule before you go: anyone may pull, which is the entire teaching',
          'Afterward, ask each person what they noticed from inside the crowd'
        ],
        learningObjective: 'Some teachings are transmitted by rope rather than by explanation'
      }
    ],
    culturalImpact: 'Ratha Yatra is Hinduism\'s great festival of access: the deity out of the sanctum, the king with a broom, and a rope that makes no distinctions, now enacted in cities on every continent.',
    relatedFestivals: ['janmashtami-2025'],
    heroImageUrl: require('../../assets/images/covers/ratha-yatra-cover.png'),
  },
  {
    id: 'guru-purnima-2025',
    name: 'Guru Purnima',
    sanskritName: 'गुरु पूर्णिमा',
    date: '2025-07-10',
    occurrences: ['2025-07-10', '2026-07-29', '2027-07-18', '2028-07-06'], // Ashadha Purnima; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '📿',
    dateType: 'lunar',
    type: 'spiritual',
    significance: 'The full moon of Ashadha, honoring the guru — and Vyasa, the tradition\'s first great teacher',
    description: 'A whole holiday for saying thank you to whoever taught you',
    traditions: [
      'Guru puja and pada puja',
      'Visiting or writing to one\'s teachers',
      'Reading from Vyasa\'s works',
      'Beginning of chaturmasya (the monsoon study season)',
      'Offering dakshina (a gift of gratitude)'
    ],
    prayers: [
      'Guru Brahma verse',
      'Guru vandana',
      'Readings from the Gita'
    ],
    foods: [
      'Simple sattvic meals',
      'Fruit and sweets offered to teachers',
      'Khichdi (monsoon season fare)'
    ],
    colors: ['White', 'Saffron', 'Gold'],
    deity: 'Vyasa',
    scripture: 'Mahabharata',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'guru-purnima-vandana',
        name: 'A Guru Vandana at Home',
        description: 'A short evening rite of gratitude: a lamp, the Guru Brahma verse, and the naming, out loud, of the people who actually taught you.',
        timeOfDay: 'evening',
        materials: ['A lamp', 'Flowers or a single fruit', 'Photographs of teachers, living or gone, if you have them', 'Paper for a thank-you note'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Light the lamp and place before it whatever stands for your teachers: photos, a parent\'s letter, a worn textbook.',
            explanation: 'The guru of this festival is not only the robed kind. Anyone who moved you from not-knowing to knowing qualifies.'
          },
          {
            stepNumber: 2,
            instruction: 'Recite the Guru Brahma verse once, slowly.',
            explanation: 'The verse is given with this ritual; its meaning is the day\'s teaching in four lines.'
          },
          {
            stepNumber: 3,
            instruction: 'Name your teachers aloud, one by one, and what each gave you. Include the hard ones.',
            explanation: 'The tradition counts difficult teachers among the real ones; some lessons only they could give.'
          },
          {
            stepNumber: 4,
            instruction: 'Before the lamp burns down, write to one living teacher and tell them what stuck.',
            explanation: 'Dakshina, the student\'s gift, need not be money. For most teachers the rarest gift is learning what became of the seed.'
          }
        ],
        mantras: [
          {
            sanskrit: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥',
            transliteration: 'gurur brahmā gurur viṣṇuḥ gurur devo maheśvaraḥ, guruḥ sākṣāt paraṁ brahma tasmai śrī-gurave namaḥ',
            meaning: 'The guru is Brahma, the guru is Vishnu, the guru is Shiva; the guru is the supreme reality itself made visible — to that guru, salutation',
            pronunciation: 'gu-rur brah-maa gu-rur vish-nuh gu-rur de-vo ma-hesh-va-rah'
          }
        ],
        significance: 'The most recited of all guru verses, attributed to the Guru Gita of the Skanda Purana tradition: the claim that the teacher does for a mind what the great gods do for the cosmos — creates, sustains, and transforms it.',
        tips: ['If your teacher is gone, the letter still works; read it to the lamp', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Reserving the day for spiritual gurus only; the school teacher, the grandmother, and the strict coach all belong in the naming']
      }
    ],
    fullStory: 'Guru Purnima, the full moon of Ashadha, is the tradition\'s day of gratitude to teachers. It is also called Vyasa Purnima, for tradition holds it as the birthday of Vyasa — the sage who arranged the one Veda into four, composed the Mahabharata with the Gita inside it, and compiled the Puranas. Hinduism reserves one of its holiest full moons not for a warrior or king but for its editor, and every teaching lineage since traces its authority through him. Students honor their gurus, and the guru honored can be anyone who ever genuinely taught you.',
    sections: [
      {
        id: 'guru-purnima-day',
        title: 'A Holiday for Teachers',
        subtitle: 'The Full Moon of Ashadha',
        storyText: 'Every culture thanks its heroes. Hinduism went further and scheduled a full moon for thanking its **teachers**.\n\n**Guru Purnima** falls on the full moon of Ashadha, as the monsoon breaks over India. The word guru is usually translated as teacher, and a beloved traditional etymology, given in the Guru Gita, reads it as two syllables: **gu**, darkness, and **ru**, its removal. The one who removes darkness.\n\nThe tradition means the word generously. The sage on a riverbank is a guru, and so is the woman who taught you to read, the father who taught you to drive, the senior who showed you how the job is really done. Today is for all of them.\n\nWhy this full moon? The rains were when India\'s wandering teachers stopped wandering. For four months, the **chaturmasya**, monks settled in one place, and students gathered. The year\'s great season of learning opened tonight.',
        citation: 'Guru Gita (Skanda Purana tradition) — the gu-ru etymology, given as traditional; chaturmasya, monastic tradition.'
      },
      {
        id: 'guru-purnima-vyasa',
        title: 'The Editor the Tradition Worships',
        subtitle: 'Vyasa Purnima',
        storyText: 'The day\'s older name is **Vyasa Purnima**, because tradition holds it as the birthday of **Vyasa**, and his resume explains the honor.\n\nTradition credits Vyasa with arranging the single ocean of the Veda into the **four Vedas**, so that human memory could carry them. With composing the **Mahabharata**, the world\'s longest epic, holding the Bhagavad Gita inside it. With compiling the great **Puranas**. His name literally means the arranger, the editor.\n\nNotice what the tradition did here. Of all its kings, warriors, and miracle-workers, it gave one of the year\'s holiest days to the man who **organized knowledge and passed it on**.\n\nTo this day, the seat a traditional teacher speaks from is called the **vyasa-pitha**, Vyasa\'s seat, and every guru lineage, the parampara, traces its line back through him. When anyone teaches dharma anywhere, the tradition says, they are sitting in his chair.',
        citation: 'Mahabharata, Adi Parva — Vyasa as arranger of the Vedas and author of the epic (tr. Ganguli); his jayanti on this day, tradition.'
      },
      {
        id: 'guru-purnima-parampara',
        title: 'Hand to Hand, for Three Thousand Years',
        subtitle: 'How Knowledge Traveled Before Books',
        storyText: 'For most of its history, Hinduism\'s deepest knowledge was never written down. It moved from one living person to another.\n\nThe oldest texts are called **shruti**, "the heard," because that is how you received them: sitting close to someone who knew, listening, repeating, for years. The very word **Upanishad** means sitting down near. The chain of teacher to student to student\'s student is the **guru-shishya parampara**, and some chains alive today claim an unbroken line running back thousands of years.\n\nThe Gita states the method in one verse. Approach the wise, Krishna tells Arjuna. Ask your questions. Serve, and be humble. **Those who have seen the truth will teach it to you.** Knowledge, in this tradition, is not found. It is handed over, person to person, like a flame passed from lamp to lamp.',
        teachingText: 'You are already inside a parampara, whether you noticed or not. Everything you know arrived through somebody: a parent, a teacher, an author, a stranger who took ten minutes.\n\nGuru Purnima asks you to see the chain, and then to be a link and not an endpoint. What you were given, someone is waiting to receive from you.',
        citationLink: 'gita:4',
        citation: 'Bhagavad Gita 4.34 (tr. Sivananda).'
      },
      {
        id: 'guru-purnima-keeping',
        title: 'How to Keep It',
        subtitle: 'A Verse, a Visit, a Letter',
        storyText: 'The day\'s observance is as simple as its idea.\n\nStudents visit their teachers, or write to them, bringing fruit, a gift, or just the report every teacher actually wants: here is what you taught me, and here is what it became. Ashrams hold **guru puja**, ceremonial honoring of the lineage. Homes recite the **Guru Brahma** verse, which dares to say that the teacher is Brahma, Vishnu, and Shiva at once, because creating, sustaining, and transforming a mind is the same work those gods do for a world.\n\nThe day is also shared beyond Hinduism. Buddhists honor this same full moon as the day the Buddha gave his first sermon at Sarnath, five weeks after his awakening, and Jains remember Mahavira accepting his first disciple. Across traditions, the same instinct: the moment teaching begins is worth a festival.',
        teachingText: 'Keep it in one act. Find the teacher who changed your direction and tell them, today, specifically, what they did.\n\nIf they are gone, tell their story to someone younger. That is the parampara doing what it has always done.',
        citation: 'Guru Brahma verse — Guru Gita, Skanda Purana tradition, attribution as traditional; Sarnath first sermon, Buddhist tradition.'
      }
    ],
    sources: [
      {
        text: 'Bhagavad Gita',
        locator: '4.34 — the method of approaching a teacher',
        translation: 'Swami Sivananda (public)',
        url: 'https://www.gitasupersite.iitk.ac.in/',
      },
      {
        text: 'Mahabharata',
        locator: 'Adi Parva — Vyasa as arranger of the Vedas and composer of the epic',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Guru Gita',
        locator: 'Skanda Purana tradition — the Guru Brahma verse and gu-ru etymology; attribution given as traditional',
      },
      {
        text: 'Drik Panchang',
        locator: 'Guru Purnima / Vyasa Purnima dates 2025–2028 (Ashadha Purnima)',
      },
    ],
    mythology: [
      'Vyasa\'s birth to the sage Parashara and Satyavati',
      'The dividing of the one Veda into four',
      'Ganesha as the scribe who wrote the Mahabharata to Vyasa\'s dictation'
    ],
    historicalContext: 'The guru-shishya parampara predates writing in India, and Guru Purnima remains the day new students are traditionally accepted and the four-month monsoon study season begins. The same full moon is sacred to Buddhists (the first sermon at Sarnath) and Jains.',
    scriptureReferences: [
      {
        id: 'guru-purnima-gita-434',
        text: 'bhagavad_gita',
        chapter: 4,
        verse: 34,
        relevance: 'Krishna\'s instruction on how knowledge is received: approach, inquire, serve — and the seers of truth will teach you',
        quote: 'Know that by long prostration, by question and by service; the wise who have realised the Truth will instruct thee in that knowledge.'
      }
    ],
    regionalVariations: [
      {
        region: 'Maharashtra',
        localName: 'Vyasa Puja',
        uniqueTraditions: ['Honoring the whole chain of one\'s teachers in a single rite', 'Warkari kirtans in the Pandharpur pilgrimage season'],
        specialFoods: ['Simple monsoon fare, khichdi and kadhi'],
        localCustoms: 'The day falls amid the great Pandharpur wari pilgrimage, when the saints\' songs make every walker both student and teacher.'
      },
      {
        region: 'Nepal',
        localName: 'Guru Purnima (Teacher\'s Day)',
        uniqueTraditions: ['Observed nationally as the day to honor schoolteachers'],
        specialFoods: ['Sweets brought to teachers'],
        localCustoms: 'Students garland their schoolteachers and offer colored tika, the classroom becoming the temple for a day.'
      }
    ],
    modernAdaptations: [
      'Gratitude messages to old teachers as the day\'s social ritual',
      'Yoga schools worldwide honoring their lineage on this full moon',
      'Alumni groups organizing visits to retired teachers'
    ],
    familyActivities: [
      {
        id: 'guru-purnima-chain',
        title: 'Draw the Chain',
        description: 'Map your family\'s parampara: who taught whom what, going back as far as anyone can remember.',
        ageGroup: 'all_ages',
        duration: '45 minutes',
        materials: ['A big sheet of paper', 'Pens'],
        instructions: [
          'Start with each family member and one real skill or value they carry',
          'Trace each one backward: who taught it, and who taught them, as far as the story goes',
          'Circle the links who are still alive, and pick one to thank this week'
        ],
        learningObjective: 'Knowledge has a genealogy, and children who can see the chain treat their own learning as something held in trust'
      }
    ],
    culturalImpact: 'Guru Purnima institutionalizes gratitude for teaching itself, and its choice of hero — an editor and teacher over any conqueror — says more about the tradition\'s values than almost any other holiday.',
    relatedFestivals: ['basant-panchami-2025'],
    heroImageUrl: require('../../assets/images/covers/guru-purnima-cover.png'),
  },
  {
    id: 'raksha-bandhan-2025',
    name: 'Raksha Bandhan',
    sanskritName: 'रक्षाबन्धन',
    date: '2025-08-09',
    occurrences: ['2025-08-09', '2026-08-28', '2027-08-17', '2028-08-05'], // Shravana Purnima; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '🧵',
    dateType: 'lunar',
    type: 'cultural',
    significance: 'The bond of protection — a thread tied on the wrist, and a promise renewed',
    description: 'A sister ties a thread, a brother makes a promise, and a one-day festival holds a family together all year',
    traditions: [
      'Tying the rakhi on the brother\'s wrist',
      'Aarti and tilak for the brother',
      'Gifts and sweets exchanged',
      'Rakhis mailed across the world',
      'Upakarma (sacred-thread renewal) in the south'
    ],
    prayers: [
      'The raksha mantra (yena baddho balī rājā)',
      'Aarti for the sibling'
    ],
    foods: [
      'Kaju katli',
      'Laddus',
      'Ghevar (the Shravana sweet)',
      'The brother\'s favorite dish, by custom'
    ],
    colors: ['Red', 'Gold', 'Yellow'],
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'raksha-bandhan-tying',
        name: 'Tying the Rakhi',
        description: 'The whole festival in five minutes: a decorated thread, a tilak, a sweet, and a promise said or unsaid.',
        timeOfDay: 'morning',
        materials: ['A rakhi (the decorated thread)', 'A thali with roli (vermilion), rice grains, and a diya', 'Sweets', 'A gift from the brother\'s side'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'The sister marks the brother\'s forehead with a roli tilak and a few grains of rice, and circles the diya before him in aarti.',
            explanation: 'The aarti honors the person before the promise is asked of him.'
          },
          {
            stepNumber: 2,
            instruction: 'She ties the rakhi on his right wrist, speaking the raksha mantra or her own words.',
            explanation: 'The thread is the visible form of an invisible agreement; the wrist is where he will see it for weeks.'
          },
          {
            stepNumber: 3,
            instruction: 'She feeds him a sweet; he gives his gift, and with it the promise of protection.',
            explanation: 'The gift is not payment. It is his side of a bond that the tradition insists must run both ways.'
          },
          {
            stepNumber: 4,
            instruction: 'Where distance separates, the rakhi goes by mail and the aarti happens over a call.',
            explanation: 'India\'s postal service runs special rakhi envelopes every Shravana; the bond has never required the same room.'
          }
        ],
        mantras: [
          {
            sanskrit: 'येन बद्धो बली राजा दानवेन्द्रो महाबलः। तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥',
            transliteration: 'yena baddho balī rājā dānavendro mahābalaḥ, tena tvām anubadhnāmi rakṣe mā cala mā cala',
            meaning: 'By that which bound Bali, the mighty king of the danavas, I bind you — O protection, do not waver, do not waver',
            pronunciation: 'ye-na bad-dho ba-lee raa-jaa daa-na-ven-dro ma-haa-ba-lah'
          }
        ],
        significance: 'The traditional raksha mantra invokes the binding of King Bali — the same generous king Onam welcomes home — as the strongest of all bonds.',
        tips: ['Sisters, cousins, and friends all tie; the ritual has always stretched to fit the family at hand', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Letting the gift become the point; the thread outranks everything in the thali']
      }
    ],
    fullStory: 'Raksha Bandhan, on the full moon of Shravana, ties the year\'s most visible knot: a sister fastens a decorated thread, a rakhi, on her brother\'s wrist, and he renews a promise of protection. The name says exactly what it is — raksha, protection; bandhan, the bond. The old sources remember the rite before it belonged to siblings: in the Bhavishya Purana it is a wife, Indra\'s queen, who ties the consecrated thread that turns a losing war. Over centuries the thread found its home between brothers and sisters, and it has stretched gladly ever since — to cousins, friends, neighbors, and wrists on the far side of the world.',
    sections: [
      {
        id: 'raksha-bandhan-thread',
        title: 'A Thread Against the World',
        subtitle: 'The Full Moon of Shravana',
        storyText: 'Can a piece of thread protect anyone?\n\nEvery Shravana full moon, millions of families answer yes. A sister circles a lamp before her brother, marks his forehead, and ties a **rakhi**, a decorated thread, on his right wrist. He gives a gift, and with it renews an old promise: whatever comes, you can call me.\n\nThe festival\'s name is its definition. **Raksha** means protection. **Bandhan** means the bond, the tie. The bond of protection.\n\nThe thread itself costs almost nothing, and that is part of the teaching. What is being tied is not the cotton. It is the promise, made visible, renewed annually, worn where the man will see it every day for weeks. In the days before the full moon, India\'s post offices run special envelopes, because the promise has to reach wrists in London and New Jersey too.',
        citation: 'Raksha Bandhan practice — pan-Indian tradition; postal rakhi, documented custom.'
      },
      {
        id: 'raksha-bandhan-indra',
        title: 'The First Rakhi Was Not a Sister\'s',
        subtitle: 'A Queen, a Losing War, and a Consecrated Thread',
        storyText: 'The oldest story attached to the day surprises most people: the first raksha was tied by a wife.\n\nThe **Bhavishya Purana** tells of a war the gods were losing. Indra, their king, faced the asura Bali\'s forces and was being driven back. His queen, **Shachi**, prepared a thread, consecrated by prayer, and bound it to her husband\'s wrist on the full moon of Shravana. Indra returned to the field and won.\n\nThe same purana gives the rite its mantra, still recited today, which swears by the binding of **King Bali**, the same generous demon king whom Kerala\'s Onam welcomes home every year. The traditions braid into each other like this constantly.\n\nSo before the rakhi belonged to siblings, it was simply a **raksha**: a protection any loving hand could tie onto any wrist being sent out into danger. Priests tied them to patrons. Wives to husbands. Mothers to sons. The sister-brother form came to hold the center, but the older, wider meaning never left.',
        citationLink: 'festival:onam-2025',
        citation: 'Bhavishya Purana, Uttara Parva — the Indra-Shachi raksha and the yena baddho mantra.'
      },
      {
        id: 'raksha-bandhan-draupadi',
        title: 'A Strip of Silk, Repaid Without Limit',
        subtitle: 'Krishna and Draupadi',
        storyText: 'The story most families tell over the thali is about Krishna and **Draupadi**.\n\nKrishna\'s finger is bleeding, cut by his own discus in one telling. Court remedies are sent for, but Draupadi does not wait. She tears a strip from the end of her own sari, silk she is wearing, and binds the wound on the spot.\n\nKrishna, the story says, counted the torn strip as a rakhi, and declared the debt open-ended. Years later, when Draupadi is dragged into the Kaurava court and a hand grips her sari to strip her before the assembly, she calls his name. The sari becomes endless. The hall fills with cloth, and the man pulling at it collapses exhausted. One strip of silk, repaid without limit.\n\nBe honest about the source, as this app tries to be: the rakhi framing of this story is later devotional tradition, not the critical text of the Mahabharata. It is told every Shravana anyway, because it teaches what the thread means better than any definition: protection flows toward spontaneous love, and it returns multiplied.',
        citation: 'Krishna-Draupadi rakhi — later devotional tradition, labeled as such; the court scene, Mahabharata, Sabha Parva (tr. Ganguli).'
      },
      {
        id: 'raksha-bandhan-many-threads',
        title: 'One Full Moon, Many Threads',
        subtitle: 'What Else Shravana Purnima Carries',
        storyText: 'Step outside the brother-sister frame and the same full moon is tying threads all over the map.\n\nIn the south, this is **Upakarma** day, when those who wear the sacred thread, the janeu, ceremonially replace it for the year and renew the student\'s vow that came with it. On the Konkan coast it is **Narali Purnima**, when fishing communities offer coconuts to the sea and reopen it for the season after the monsoon\'s fury, a raksha asked of the ocean itself.\n\nAnd in 1905, when the British moved to partition Bengal along religious lines, Rabindranath **Tagore** answered with this festival: he called Hindus and Muslims to tie rakhis on each other\'s wrists in the streets of Calcutta, protection promised across the exact line the empire was drawing.',
        bullets: [
          '**Rakhi** for siblings, the festival\'s beating heart',
          '**Upakarma**, the south\'s sacred-thread renewal, same moon',
          '**Narali Purnima**, coconuts to the sea on the Konkan coast',
          '**Rakhi Purnima** in Bengal, with Tagore\'s 1905 protest in its memory'
        ],
        teachingText: 'The forms differ, and the grammar underneath does not. A thread is tied, and a relationship is renewed with it, between siblings, between a student and a vow, between a coast and its sea, between neighbors an empire wanted separated.\n\nTie yours wide this year. The festival has always let you.',
        citation: 'Upakarma, Narali Purnima — regional tradition; Tagore\'s 1905 rakhi movement — documented history.'
      }
    ],
    sources: [
      {
        text: 'Bhavishya Purana',
        locator: 'Uttara Parva — the Indra-Shachi raksha episode and the yena baddho raksha mantra',
        translation: 'named as purana tradition; cross-checked against public summaries (wisdomlib.org)',
      },
      {
        text: 'Mahabharata',
        locator: 'Sabha Parva — Draupadi in the Kaurava court; the rakhi framing of the sari story is later devotional tradition, labeled as such',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Documented history',
        locator: 'Tagore\'s rakhi bandhan movement against the 1905 partition of Bengal',
      },
      {
        text: 'Drik Panchang',
        locator: 'Raksha Bandhan dates 2025–2028 (Shravana Purnima, aparahna observance)',
      },
    ],
    mythology: [
      'Shachi\'s thread and Indra\'s turned battle',
      'Draupadi\'s strip of silk and the endless sari',
      'Yama and the Yamuna\'s rakhi, in some tellings'
    ],
    historicalContext: 'The raksha rite appears in purana literature as a protection blessing tied by priests and wives; its sibling-centered form rose to prominence over the medieval period and is now among the most widely kept Hindu festivals, including across religious lines in parts of the subcontinent.',
    scriptureReferences: [
      {
        id: 'raksha-bhavishya',
        text: 'puranas',
        section: 'Bhavishya Purana, Uttara Parva',
        relevance: 'The Indra-Shachi episode: the oldest scriptural anchor for the consecrated protection thread and its mantra'
      }
    ],
    regionalVariations: [
      {
        region: 'South India',
        localName: 'Avani Avittam / Upakarma',
        uniqueTraditions: ['Annual replacement of the sacred thread', 'Renewal of Vedic study vows'],
        specialFoods: ['Payasam', 'Vadai'],
        localCustoms: 'The same full moon renews a different thread: the janeu, and with it the wearer\'s identity as a lifelong student.'
      },
      {
        region: 'Konkan coast (Maharashtra, Goa)',
        localName: 'Narali Purnima',
        uniqueTraditions: ['Coconuts offered to the sea', 'Fishing season reopened after the monsoon'],
        specialFoods: ['Narali bhat (sweet coconut rice)'],
        localCustoms: 'Fishing families ask the calmed sea for protection before the boats go back out — a raksha at civilizational scale.'
      },
      {
        region: 'Bengal',
        localName: 'Rakhi Purnima / Jhulan Purnima',
        uniqueTraditions: ['Rakhi across communities, remembering 1905', 'Jhulan swing festival for Radha-Krishna'],
        specialFoods: ['Sandesh', 'Rasgulla'],
        localCustoms: 'Tagore\'s protest gave the Bengali rakhi a second meaning it has never lost: the tied wrist as an act of unity.'
      }
    ],
    modernAdaptations: [
      'Sisters tying rakhis to sisters, friends, and mentors',
      'Video-call aartis with mailed rakhis timed for the day',
      'Rakhis tied to soldiers, police, and trees in civic campaigns'
    ],
    familyActivities: [
      {
        id: 'raksha-bandhan-promises',
        title: 'Say the Promise Out Loud',
        description: 'After the tying, each pair states one concrete way they will show up for each other this year — specific, not ceremonial.',
        ageGroup: 'all_ages',
        duration: '20 minutes',
        materials: ['The rakhis already tied'],
        instructions: [
          'Each protected person asks: what is one thing you actually need from me this year?',
          'The answer must be concrete (a monthly call, help with an application, showing up in December)',
          'Write the two promises on the rakhi packaging and keep it until next year'
        ],
        learningObjective: 'The thread lasts weeks; a named, specific promise is what lasts the year'
      }
    ],
    culturalImpact: 'Raksha Bandhan keeps kinship in repair on an annual schedule, and its thread has proven elastic enough to bind siblings, students to vows, coasts to seas, and communities to each other.',
    relatedFestivals: ['janmashtami-2025', 'onam-2025'],
    heroImageUrl: require('../../assets/images/covers/raksha-bandhan-cover.png'),
  },
  {
    id: 'janmashtami-2025',
    name: 'Krishna Janmashtami',
    sanskritName: 'कृष्ण जन्माष्टमी',
    date: '2025-08-16',
    // 2027 splits by tradition: Smarta Aug 24, Vaishnava Aug 25 (we list Vaishnava)
    occurrences: ['2025-08-16', '2026-09-04', '2027-08-25', '2028-08-13'], // verified vs Drik Panchang, Jul 2026
    emoji: '🦚',
    dateType: 'lunar',
    type: 'deity_celebration',
    significance: 'Birth anniversary of Lord Krishna',
    description: 'Celebration of the birth of Lord Krishna, the eighth avatar of Vishnu',
    traditions: [
      'Midnight celebrations',
      'Dahi Handi',
      'Krishna Leela performances',
      'Jhulanotsav (swinging ceremony)',
      'Fast until midnight'
    ],
    prayers: [
      'Krishna mantras',
      'Bhagavad Gita recitation',
      'Krishna bhajans'
    ],
    foods: [
      'Makhan (butter)',
      'Mishri (rock sugar)',
      'Panchamrit',
      'Kheer',
      'Ladoo'
    ],
    colors: ['Blue', 'Yellow', 'Peacock colors'],
    deity: 'Lord Krishna',
    scripture: 'Bhagavad Gita',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'janmashtami-midnight-puja',
        name: 'Midnight Birth Celebration (Nishita Puja)',
        description: 'The heart of Janmashtami: welcoming Krishna at the midnight hour of his birth with bathing, dressing, offerings, and arati.',
        timeOfDay: 'night',
        materials: [
          'A small murti or picture of baby Krishna (Laddu Gopal)',
          'Panchamrit (milk, yogurt, ghee, honey, sugar)',
          'Fresh clothes and a small cradle or swing (jhula)',
          'Makhan (white butter) and mishri (rock sugar)',
          'Tulsi leaves, flowers, incense, and a ghee lamp'
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Before midnight, gently bathe the baby Krishna murti with panchamrit, then with clean water.',
            explanation: 'The abhishek recreates the loving welcome of a newborn; the five nectars represent the sweetness of devotion.'
          },
          {
            stepNumber: 2,
            instruction: 'Dress Krishna in new clothes, adorn with a peacock feather if you have one, and place him in the cradle.',
            explanation: 'Devotees receive Krishna not as a distant god but as a child of the house.'
          },
          {
            stepNumber: 3,
            instruction: 'At midnight, rock the cradle gently, offer makhan-mishri and tulsi, and perform arati with the ghee lamp.',
            explanation: 'Krishna was born at midnight in Mathura; the arati at that exact hour is the festival\'s central moment.'
          },
          {
            stepNumber: 4,
            instruction: 'Sing a bhajan or simply chant the mantra 108 times (or any number you can offer with attention), then share the prasad.',
            explanation: 'The celebration ends by distributing the sweetness — prasad is blessing made shareable.'
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ नमो भगवते वासुदेवाय',
            transliteration: 'oṁ namo bhagavate vāsudevāya',
            meaning: 'Om, salutations to the Blessed Lord Vasudeva (Krishna)',
            pronunciation: 'om na-mo bha-ga-va-te vaa-su-de-vaa-ya'
          }
        ],
        significance: 'Marks the exact midnight hour of Krishna\'s birth in Kamsa\'s prison, as told in the Bhagavata Purana (Canto 10, Chapter 3).',
        tips: [
          'If midnight is impractical with young children, hold the celebration at their bedtime and explain the midnight tradition',
          'Keep the arati simple and unhurried — attention matters more than elaborateness'
        ],
        commonMistakes: [
          'Treating the puja as a performance rather than a welcome',
          'Skipping the sharing of prasad, which completes the offering'
        ]
      },
      {
        id: 'janmashtami-fast-and-jhanki',
        name: 'The Day-long Fast and Jhanki',
        description: 'Many devotees fast until midnight and spend the day preparing a jhanki — a small tableau of Krishna\'s birth and childhood scenes.',
        timeOfDay: 'all_day',
        materials: [
          'Fruits, milk, and water for a phalahar (fruit) fast',
          'Craft materials for the jhanki: a small prison scene, the Yamuna river, Gokul village',
          'Krishna storybook or the Bhagavata Purana\'s tenth canto'
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Begin the day with a sankalpa (intention): a simple fast — fruits and milk — offered for the day.',
            explanation: 'The fast turns ordinary hunger into remembrance; every pang points to midnight.'
          },
          {
            stepNumber: 2,
            instruction: 'Through the day, build the jhanki together: Kamsa\'s prison, baby Krishna in a basket, Vasudeva crossing the rain-swollen Yamuna, and peaceful Gokul on the far shore.',
            explanation: 'Building the scenes is embodied storytelling — the story enters through the hands.'
          },
          {
            stepNumber: 3,
            instruction: 'Read or tell the birth story aloud in the evening, then keep vigil with bhajans until the midnight arati.',
            explanation: 'The vigil recreates the waiting of Devaki and Vasudeva through the long imprisoned night.'
          }
        ],
        significance: 'The fast-until-midnight and vigil mirror the story itself: darkness, waiting, and the sudden arrival of joy.',
        tips: ['Those who cannot fast strictly may simply eat lightly and skip grains — the remembrance is the point'],
        commonMistakes: ['Making the fast a feat of endurance rather than an act of attention']
      }
    ],
    fullStory: 'Krishna Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Vishnu, born in Mathura to Devaki and Vasudeva. Krishna\'s birth at midnight in a prison cell, his miraculous escape to Gokul, and his divine childhood filled with miracles and teachings form the essence of this celebration. The festival includes fasting, midnight prayers, and joyous celebrations that recreate the scenes from Krishna\'s life.',
    sections: [
      {
        id: 'janmashtami-midnight',
        title: 'The Darkest Night of the Month',
        subtitle: 'Why this festival happens at midnight',
        storyText:
          'Janmashtami falls on the **eighth night of the waning moon** of Bhadrapada \u2014 close to the month\u2019s darkest hour. The timing is the first teaching.\n\nKrishna is not born at dawn in a palace. He is born at **midnight**, in a **prison**, to parents chained by a tyrant.\n\nThe tradition placed the year\u2019s most joyous birth in the year\u2019s heaviest darkness deliberately: **divinity arrives precisely where things look most hopeless.** Devotees who fast through the day and keep vigil to midnight are rehearsing the story\u2019s deepest claim \u2014 that the night is worth waiting through.',
        citation: 'Timing: Bhadrapada Krishna Ashtami \u2014 traditional reckoning (Drik Panchang)',
      },
      {
        id: 'janmashtami-prophecy',
        title: 'The Wedding-Day Prophecy',
        subtitle: 'A voice from the sky stops a chariot',
        storyText:
          'The story opens at a wedding. **Kamsa**, the ruthless king of Mathura, is lovingly driving the chariot of his newly married sister **Devaki** \u2014 a rare tender moment for a hard man.\n\nThen a voice from the sky stops him cold: **the eighth child of this very sister will be his death.**\n\nIn an instant, affection becomes terror. Kamsa raises his sword against his own sister on her wedding day. Her husband **Vasudeva** saves her life with a desperate bargain: every child they bear will be handed to the king.',
        teachingText:
          'Kamsa\u2019s tragedy is instructive: **the prophecy did not doom him \u2014 his response to it did.** Fear made him cruel, and his cruelty manufactured the very enemy he feared. When threatening news arrives, watch what it makes of you.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 1 (vedabase.io / wisdomlib.org)',
        checks: [
          {
            id: 'chk:festival:janmashtami:prophecy',
            kind: 'mcq',
            practice: true,
            prompt: 'Why did the tyrant Kamsa imprison his own sister Devaki and kill her babies?',
            options: [
              { text: 'A voice from the sky warned him that her eighth child would be the one to kill him', correct: true },
              { text: 'She had committed a crime against his kingdom' },
              { text: 'It was an ancient royal custom' },
            ],
            why: 'On Devaki’s wedding day a prophecy told Kamsa her eighth child would kill him. He locked her away and killed each newborn, trying to outrun the very fate he was busy bringing about.',
          },
        ],
      },
      {
        id: 'janmashtami-prison-years',
        title: 'The Prison Years',
        subtitle: 'Six cradles, and an eighth hope',
        storyText:
          'Kamsa imprisons Devaki and Vasudeva. Then he keeps the bargain in the cruelest way possible: **one by one, six newborns are taken from their mother\u2019s arms and killed.**\n\nThe **seventh** child is mysteriously lost before birth \u2014 the tradition says the unborn **Balarama** was moved to another womb, beyond the king\u2019s reach.\n\nAnd then Devaki conceives an **eighth** time. The texts say her face began to glow; the guards doubled; and the prison began, impossibly, to feel like a temple. Everyone \u2014 the terrified king most of all \u2014 was now waiting for the same child.',
        citationLink: 'deity:krishna',
        citation: 'Bhagavata Purana, Canto 10, Chapters 1\u20132',
      },
      {
        id: 'janmashtami-birth',
        title: 'The Midnight Birth',
        subtitle: 'A prison fills with light',
        storyText:
          'At **midnight**, in the blackest hour of the month, the child is born \u2014 and the Bhagavata Purana says the prison **filled with light**.\n\nFor one moment, Devaki and Vasudeva behold their newborn in his **four-armed divine form** \u2014 crowned, holding conch, discus, club, and lotus. Then, at their prayer, he becomes what a hunted child must be: an ordinary, impossibly beautiful baby.\n\nAnd the world quietly unlocks. The guards fall into enchanted sleep. The **shackles open** on their own. The barred doors swing wide.',
        teachingText:
          'When the divine chooses to move, the story insists, **every lock in the world is already open.** The chains and doors were never the real obstacle.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 3',
      },
      {
        id: 'janmashtami-crossing',
        title: 'The Crossing',
        subtitle: 'A father, a basket, a river in flood',
        storyText:
          'Carrying his son in a **basket on his head**, Vasudeva walks out of the open prison into a monsoon night.\n\nThe rain hammers down. Ahead lies the **Yamuna**, swollen and black. He steps in anyway \u2014 and the river **parts** to give him passage, while the great serpent **Shesha** rises behind him, spreading his hoods over the basket as an umbrella.\n\nOn the far shore lies sleeping **Gokul**, the cowherd village where a child could grow up unnoticed, loved, and free.',
        teachingText:
          'Grace opened every lock, parted the river, held off the rain \u2014 but notice what actually carries the child to safety: **a father\u2019s trembling, faithful walk through the storm.** Grace opens the way; someone still has to do the walking.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 3',
      },
      {
        id: 'janmashtami-swap',
        title: 'The Swap and the Warning',
        subtitle: 'The goddess laughs at the king',
        storyText:
          'In Gokul, Vasudeva lays Krishna beside the sleeping cowherd queen **Yashoda** \u2014 and lifts her newborn **daughter** into the basket for the journey back. By dawn, the swap is invisible; even Yashoda believes the boy is her own.\n\nWhen word reaches Kamsa that the eighth child is born, he storms the prison and seizes the infant girl.\n\nShe **slips from his hands** and rises into the air as the goddess **Yogamaya**, blazing and laughing: \u201cThe one who will destroy you is already born \u2014 elsewhere.\u201d',
        teachingText:
          'Kamsa spent eight years guarding one door, and destiny walked out another. **Control is the tyrant\u2019s illusion** \u2014 the story\u2019s quiet verdict on every attempt to cage the future.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 4',
        checks: [
          {
            id: 'chk:festival:janmashtami:swap',
            kind: 'mcq',
            practice: true,
            prompt: 'Krishna was secretly carried to safety and a baby girl left in the prison. When Kamsa tried to kill her, what happened?',
            options: [
              { text: 'She slipped from his hands as the goddess and warned him his killer was already born and beyond his reach', correct: true },
              { text: 'She defeated Kamsa’s whole army single-handed' },
              { text: 'Nothing, Kamsa spared her and repented' },
            ],
            why: 'The substitute child revealed herself as the goddess, telling Kamsa the one who would end him was already alive and safe. No prison could hold what was coming.',
          },
        ],
      },
      {
        id: 'janmashtami-why-born',
        title: 'Why God Takes Birth',
        subtitle: 'The child explains his own arrival',
        keyVerse: {
          sanskrit: '\u092f\u0926\u093e \u092f\u0926\u093e \u0939\u093f \u0927\u0930\u094d\u092e\u0938\u094d\u092f \u0917\u094d\u0932\u093e\u0928\u093f\u0930\u094d\u092d\u0935\u0924\u093f \u092d\u093e\u0930\u0924\u0964 \u0905\u092d\u094d\u092f\u0941\u0924\u094d\u0925\u093e\u0928\u092e\u0927\u0930\u094d\u092e\u0938\u094d\u092f \u0924\u0926\u093e\u0966\u0966\u0924\u094d\u092e\u093e\u0928\u0902 \u0938\u0943\u091c\u093e\u092e\u094d\u092f\u0939\u092e\u094d\u0965',
          transliteration: 'yad\u0101 yad\u0101 hi dharmasya gl\u0101nir bhavati bh\u0101rata, abhyutth\u0101nam adharmasya tad\u0101tm\u0101na\u1e43 s\u1e5bij\u0101my aham',
          meaning: 'Whenever there is a decline of righteousness and a rise of unrighteousness, O Arjuna, then I manifest Myself \u2014 for the protection of the good, for the destruction of the wicked, and for the establishment of righteousness, I am born in every age.',
          source: 'Bhagavad Gita 4.7\u20138 (tr. Swami Sivananda)',
        },
        storyText:
          'Decades after that midnight, the child born in Kamsa\u2019s prison stood on the battlefield of Kurukshetra as Arjuna\u2019s charioteer \u2014 and explained his own birth.\n\nThese verses, recited in millions of homes every Janmashtami, are Krishna\u2019s answer to why the infinite takes a body at all: **not a one-time miracle, but a standing promise.** Whenever darkness gathers past bearing, in every age, the light is born again.',
        teachingText:
          'The promise has an inner reading too. The prison is any heart shut tight by fear; midnight is any hour when hope runs lowest. Janmashtami asks you to **keep one lamp lit in that darkness** \u2014 because that is exactly when and where the divine chooses to be born.',
        citationLink: 'gita:4',
        citation: 'Bhagavad Gita 4.7\u20138, tr. Sivananda (public domain)',
      },
      {
        id: 'janmashtami-butter',
        title: 'The God Who Steals Butter',
        subtitle: 'Joy, too, is worship',
        storyText:
          'The story does not end at the rescue \u2014 it erupts into joy. In Gokul and Vrindavan, the divine child grows up as a mischievous cowherd boy who raids every kitchen for fresh **makhan**, white butter.\n\nThe Bhagavata\u2019s tenth canto lovingly records the cowherd women lining up to complain to Yashoda \u2014 while secretly hoping he raids their homes next.\n\nThis is why Janmashtami tastes of butter and rock sugar, and why in Maharashtra young men build swaying human pyramids to smash a **dahi handi** hung high above the street \u2014 recreating the toddler gangs Krishna organized to reach the hanging pots.',
        teachingText:
          'The tradition\u2019s boldest move is here: the same God who parts rivers wants to be loved as **the baby you rock, the child you scold, the friend whose mischief you forgive.** Let your practice this Janmashtami include delight \u2014 sweetness shared, songs sung too loudly, a pot broken open. Joy, too, is worship.',
        citationLink: 'deity:krishna',
        citation: 'Bhagavata Purana, Canto 10, Chapters 8\u20139 (the butter stories)',
      },
    ],
    reflectionQuestions: [
      'The divine arrives at midnight, in a prison, unnoticed by the powerful. Where in your life might something important be arriving quietly?',
    ],
    sources: [
      {
        text: 'Bhagavata Purana (Srimad Bhagavatam)',
        locator: 'Canto 10, Chapters 1–4 (Kamsa\'s prophecy, the birth, the crossing to Gokul, Yogamaya); Chapters 8–9 (the butter stories)',
        translation: 'Retold from the Sanskrit tradition; cross-checked against public translations (vedabase.io, wisdomlib.org)',
        url: 'https://vedabase.io/en/library/sb/10/3/',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:4',
        locator: '4.7–8 (why the divine takes birth)',
        translation: 'Swami Sivananda (public domain)',
      },
      {
        text: 'Drik Panchang',
        locator: 'Janmashtami dates 2026–2028 (Smarta/Vaishnava conventions noted)',
        url: 'https://www.drikpanchang.com/dashavatara/lord-krishna/krishna-janmashtami-date-time.html',
      },
    ],
    mythology: [
      'Divine birth in Kamsa\'s prison to destroy evil',
      'Miraculous escape to Gokul and childhood with Yashoda',
      'Krishna\'s divine leelas (pastimes) and teachings'
    ],
    historicalContext: 'Ancient festival celebrating one of Hinduism\'s most beloved deities, central to Bhagavad Gita teachings.',
    scriptureReferences: [
      {
        id: 'janmashtami-gita-4-7',
        text: 'bhagavad_gita',
        chapter: 4,
        verse: 7,
        relevance: 'Krishna\'s own explanation of why the divine takes birth — recited across homes on Janmashtami',
        quote: 'Whenever there is a decline of righteousness and an increase of unrighteousness, O Arjuna, then I manifest Myself.'
      },
      {
        id: 'janmashtami-gita-4-8',
        text: 'bhagavad_gita',
        chapter: 4,
        verse: 8,
        relevance: 'The standing promise of divine descent in every age',
        quote: 'For the protection of the good, for the destruction of the wicked, and for the establishment of righteousness, I am born in every age.'
      },
      {
        id: 'janmashtami-bhagavata-birth',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 10, Chapters 1–4',
        relevance: 'The full birth narrative: Kamsa\'s prophecy, the midnight birth in prison, Vasudeva crossing the Yamuna, and Yogamaya\'s warning'
      }
    ],
    regionalVariations: [],
    modernAdaptations: [
      'Dahi Handi competitions with safety measures',
      'Krishna themed cultural programs',
      'Bhagavad Gita study circles'
    ],
    familyActivities: [
      {
        id: 'janmashtami-jhanki',
        title: 'Build a Janmashtami Jhanki Together',
        description: 'Create a small tableau of the birth story: Kamsa\'s prison, baby Krishna in a basket, the parting Yamuna, and Gokul on the far shore. Tell the story as you build each scene.',
        ageGroup: 'all_ages',
        duration: '1-2 hours',
        materials: ['A tray or table corner', 'Clay or paper figures', 'Blue cloth or paper for the Yamuna', 'A tiny basket', 'Flowers and diyas'],
        instructions: [
          'Lay out the four scenes left to right so the story reads like a journey',
          'Let children place Vasudeva\'s basket in the river and "part" the waters',
          'Finish by placing baby Krishna in Gokul and lighting a diya beside him',
          'Tell or read the birth story aloud over the completed jhanki'
        ],
        learningObjective: 'Children absorb the birth narrative through their hands, and learn that darkness in the story is always crossed, never final'
      },
      {
        id: 'janmashtami-home-dahi-handi',
        title: 'A Home Dahi Handi',
        description: 'Hang a small pot with makhan-mishri just out of the children\'s reach and let them work together — stools, teamwork, laughter — to bring it down, the way young Krishna\'s friends did.',
        ageGroup: 'children',
        duration: '30 minutes',
        materials: ['A small clay pot or bowl', 'White butter and rock sugar', 'String to hang it', 'Cushions for safe landings'],
        instructions: [
          'Hang the pot at a stretch-but-reachable height',
          'The rule: it can only be reached by helping each other',
          'Share the makhan-mishri as prasad afterward'
        ],
        learningObjective: 'The sweetest things are reached together — and God enjoys being played with, not only prayed to'
      },
      {
        id: 'janmashtami-midnight-lamp',
        title: 'The Midnight Lamp',
        description: 'Before bed (or at midnight for older children), each family member lights one diya in the darkest corner of the home and names one dark thing they are trusting will pass.',
        ageGroup: 'all_ages',
        duration: '15 minutes',
        materials: ['One diya or candle per person'],
        instructions: [
          'Turn the lights off first and sit in the dark for one quiet minute',
          'Light the lamps one by one, each person speaking their hope aloud or silently',
          'Leave the lamps burning together while a Krishna bhajan plays'
        ],
        learningObjective: 'The festival\'s core teaching, embodied: light is born exactly where the dark feels heaviest'
      }
    ],
    culturalImpact: 'Teaches devotion, divine love, and the importance of dharma through Krishna\'s teachings.',
    relatedFestivals: ['holi-2025', 'diwali-2025', 'raksha-bandhan-2025', 'ratha-yatra-2025'],
    heroImageUrl: require('../../assets/images/covers/janmashtami-cover.jpg'),
  },
  {
    id: 'ganesh-chaturthi-2025',
    name: 'Ganesh Chaturthi',
    sanskritName: 'गणेश चतुर्थी',
    date: '2025-08-29',
    occurrences: ['2025-08-29', '2026-09-14', '2027-09-04', '2028-08-23'], // verified vs Drik Panchang, Jul 2026 (2026 corrected 09-07→09-14)
    emoji: '🐘',
    dateType: 'lunar',
    type: 'deity_celebration',
    significance: 'Birth celebration of Lord Ganesha',
    description: 'Festival celebrating Lord Ganesha, the remover of obstacles',
    traditions: [
      'Installing Ganesha idols',
      'Daily prayers for 11 days',
      'Modak offerings',
      'Cultural programs',
      'Immersion procession (Visarjan)'
    ],
    prayers: [
      'Ganesha Atharvashirsha',
      'Ganesha Chalisa',
      'Vakratunda Mahakaya'
    ],
    foods: [
      'Modak',
      'Ladoo',
      'Puran poli',
      'Coconut sweets'
    ],
    colors: ['Red', 'Yellow', 'Orange'],
    deity: 'Lord Ganesha',
    duration: 11,
    importance: 'major',
    rituals: [
      {
        id: 'ganesh-sthapana',
        name: 'Sthapana — Welcoming Ganesha Home',
        description: 'Installing the Ganesha murti with pranapratishtha (invoking the living presence), the festival\'s opening act.',
        timeOfDay: 'morning',
        materials: [
          'A clay Ganesha murti (eco-friendly, unpainted or natural colors)',
          'A raised platform (chowki) with red or yellow cloth',
          'Durva grass, red flowers, sindoor',
          'Modak or ladoo for the first offering',
          'Incense, ghee lamp, and a small bell'
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the space, lay the cloth on the chowki, and place the murti facing into the home.',
            explanation: 'Ganesha is received as an honored guest — the home\'s best corner becomes his seat.'
          },
          {
            stepNumber: 2,
            instruction: 'Invoke him with the mantra and offer durva grass, flowers, and sindoor.',
            explanation: 'Durva grass is Ganesha\'s signature offering — humble, common, and dearest to him.'
          },
          {
            stepNumber: 3,
            instruction: 'Offer 21 modaks (or however many you made) and perform arati with the family.',
            explanation: 'The modak\'s hard shell and sweet heart mirror the effort and reward of practice.'
          },
          {
            stepNumber: 4,
            instruction: 'Commit to a daily rhythm for his stay: morning and evening arati, fresh offerings.',
            explanation: 'For 1½, 5, 7, or 11 days the murti is family — daily attention is the point of hosting him.'
          }
        ],
        mantras: [
          {
            sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
            transliteration: 'vakratuṇḍa mahākāya sūryakoṭi samaprabha, nirvighnaṁ kuru me deva sarva-kāryeṣhu sarvadā',
            meaning: 'O curved-trunk, mighty-bodied one, radiant as ten million suns — make all my endeavors free of obstacles, always',
            pronunciation: 'vak-ra-tun-da ma-haa-kaa-ya soor-ya-ko-ti sa-ma-pra-bha'
          }
        ],
        significance: 'Pranapratishtha treats the murti not as a statue but as a guest whose living presence transforms the home for the festival\'s duration.',
        tips: ['Choose natural clay over plaster — the immersion returns him to the earth cleanly'],
        commonMistakes: ['Installing the murti and then neglecting the daily rhythm — the hosting, not the installing, is the practice']
      },
      {
        id: 'ganesh-visarjan',
        name: 'Visarjan — The Farewell',
        description: 'The immersion procession that ends the festival: Ganesha is danced to the water and released, with the promise "come again early next year."',
        timeOfDay: 'evening',
        materials: ['The murti', 'A bucket or tub of water for home visarjan', 'Final modak offering', 'Flowers'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Perform the final arati and offer the last modak; each family member speaks a private farewell or request.',
            explanation: 'The farewell makes the festival\'s teaching explicit: even the divine guest is not clung to.'
          },
          {
            stepNumber: 2,
            instruction: 'Carry the murti in procession — around the block or just around the home — singing "Ganpati Bappa Morya, pudhchya varshi laukar ya!"',
            explanation: '"Beloved Ganesha, come again early next year!" — grief and joy in a single chant.'
          },
          {
            stepNumber: 3,
            instruction: 'Immerse the murti in water (a home tub for clay murtis) and watch it dissolve.',
            explanation: 'The clay returns to earth and water: form dissolving back into the formless, the festival\'s deepest lesson made visible.'
          }
        ],
        significance: 'Visarjan enacts non-attachment: welcome wholeheartedly, host lovingly, release completely — the whole spiritual art in one procession.',
        tips: ['A clay murti dissolved in a home tub can water the garden afterward — the cycle completed'],
        commonMistakes: ['Treating visarjan as disposal rather than farewell — the send-off deserves as much love as the welcome']
      }
    ],
    fullStory: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha, the beloved elephant-headed deity who removes obstacles and grants wisdom. This festival involves bringing beautifully crafted Ganesha idols into homes and communities, worshiping them for 1-11 days, and then ceremonially immersing them in water bodies. The festival combines devotion, artistry, community spirit, and environmental consciousness.',
    sections: [
      {
        id: 'ganesh-chaturthi-guest',
        title: 'The God Who Comes to Stay',
        subtitle: 'A Clay Murti Crossing a Threshold in Someone\'s Arms',
        storyText: 'Most festivals visit a temple; Ganesh Chaturthi **brings the temple home**.\n\nFor up to eleven days, households across India host Ganesha bodily — a clay murti carried in over the threshold, seated in the best corner, woken with arati, fed modaks, sung to at dusk.\n\nThe theology is in the hospitality: through **pranapratishtha**, the invocation of living presence, the family does not worship a statue but **hosts a guest**. Children learn the divine not as an abstraction but as someone staying in the house — someone you make sweets for.'
      },
      {
        id: 'ganesh-chaturthi-birth',
        title: 'The Birthday Being Celebrated',
        subtitle: 'Parvati\'s Hands Shaping a Boy from Turmeric',
        storyText: 'The birth the festival honors is the Shiva Purana\'s fierce and tender story: Parvati shaping a son from the turmeric paste of her own body, the boy\'s unbending loyalty at her door, Shiva\'s terrible mistake, and **the repair that outgrew the wound** — an elephant\'s head, command of the ganas, and the decree that this child would be worshiped first among all gods.\n\n**Chaturthi**, the fourth day of the waxing moon of Bhadrapada, is kept as the day that grace took form.',
        teachingText: 'Every murti brought home on Chaturthi re-enacts the story\'s ending: **the wounded one enthroned first**.\n\nFamilies who have weathered their own ruptures know why India loves this birthday — it celebrates not a perfect family, but a repaired one.',
        citationLink: 'deity:ganesha',
        citation: 'Shiva Purana, Rudra Samhita, Kumara Khanda, Chapters 13–18.',
        checks: [
          {
            id: 'chk:festival:ganesh:birth',
            kind: 'mcq',
            practice: true,
            prompt: 'How was Ganesha created, in the popular story?',
            options: [
              { text: 'Parvati shaped a boy from turmeric to guard her door; Shiva, not knowing him, beheaded him, then restored him with an elephant’s head', correct: true },
              { text: 'He was born fully grown from Shiva’s third eye' },
              { text: 'He emerged from the churning of the ocean' },
            ],
            why: 'Parvati made a boy from the paste of her own body to stand guard. Shiva, refused entry by a child he did not recognize, struck off his head, then brought him back to life with the head of an elephant.',
          },
        ],
      },
      {
        id: 'ganesh-chaturthi-moon',
        title: 'Why You Don\'t Watch the Moon Tonight',
        subtitle: 'A Laughing Moon Behind a Cloud',
        storyText: 'Tradition holds that on one Chaturthi night, **the moon laughed at Ganesha** — at the elephant-headed god astride a mouse, his belly full of modaks.\n\nGanesha\'s response was a curse: whoever looks at the moon this night will suffer **false accusation**. The tradition\'s proof-story is Krishna himself, who glimpsed the Chaturthi moon and was promptly accused of stealing the Syamantaka jewel — a slander he had to labor to disprove.\n\nTo this day, devout families avoid the moon on Ganesh Chaturthi.',
        teachingText: 'Beneath the folk charm sits a sharp teaching about mockery: the moon — beautiful, high, cool — laughed at a form it found absurd, and the curse it earned is the one mockery always earns: **mistrust**.\n\nWhoever laughs at appearances will be judged by appearances. The elephant head the moon mocked belongs to the god of wisdom; the joke was on the laugher.',
        citation: 'The Syamantaka episode: Bhagavata Purana, Canto 10, Chapters 56–57.'
      },
      {
        id: 'ganesh-chaturthi-public',
        title: 'The Festival That Built a Movement',
        subtitle: 'A Pandal Rising in a City Square',
        storyText: 'For centuries Ganesh Chaturthi was a household affair. In **1893**, with the British Raj banning political assembly, **Lokmanya Tilak** saw what the colonial law could not touch: a religious gathering.\n\nHe transformed the family festival into **sarvajanik** — public — Ganeshotsav: huge community murtis, pandals in every neighborhood, ten days of lectures, music, and unity that the Raj could not disperse. The festival became a school of self-rule.\n\nThe great public celebrations of Mumbai and Pune — lakhs of people dancing one murti to the sea — descend directly from that act of devotional defiance.',
        teachingText: 'Tilak\'s insight was Ganesha\'s own teaching in political form: when the direct road is blocked, **the remover of obstacles finds the door no one can close**.\n\nAsk what gathering, festival, or shared joy in your own community could carry more weight than it appears to — celebration is an underrated form of strength.',
        citation: 'The sarvajanik Ganeshotsav of 1893: documented history of the Indian independence movement.'
      },
      {
        id: 'ganesh-chaturthi-visarjan',
        title: 'The Art of Letting Go',
        subtitle: 'A Murti Dissolving into Water at Dusk',
        storyText: 'The festival\'s genius is its ending.\n\nAfter days of intimacy — feeding, singing, decorating — the family carries their guest to the water and **lets him dissolve**. The chant on every procession holds both halves of the heart: **"Ganpati Bappa Morya, pudhchya varshi laukar ya"** — beloved Ganesha, come again early next year. Grief and trust in one breath.\n\nThe clay returns to the riverbed it came from; the form returns to the formless; and the family walks home lighter, having practiced, with their own hands, **the hardest spiritual skill there is**.',
        teachingText: 'Visarjan is rehearsal for every farewell your life will ask of you: children leaving, seasons ending, the body itself one day returned.\n\nThe festival\'s instruction is precise — love fully while the guest is here, release fully when the time comes, and trust the return. **Welcome. Host. Release. Repeat.**',
        checks: [
          {
            id: 'chk:festival:ganesh:visarjan',
            kind: 'mcq',
            practice: true,
            prompt: 'After days of hosting the clay Ganesha as a guest, families immerse the murti in water. What does this visarjan teach?',
            options: [
              { text: 'Everything you love is welcomed fully, then released, love it while it is here and let go when it is time', correct: true },
              { text: 'The murti was never really sacred' },
              { text: 'Water is the only proper place to store a murti' },
            ],
            why: 'Visarjan is a rehearsal for every farewell. You make the guest with your own hands, host him with love, then let the clay dissolve back into the river. Welcome, host, release, and trust the return.',
          },
        ],
      }
    ],
    mythology: [
      'Birth of Ganesha from Parvati\'s turmeric paste',
      'How Ganesha got his elephant head',
      'Ganesha as the scribe of the Mahabharata'
    ],
    historicalContext: 'Originally a family celebration, transformed into a public festival by Lokmanya Tilak during India\'s freedom struggle.',
    scriptureReferences: [
      {
        id: 'ganesh-chaturthi-shiva-purana',
        text: 'puranas',
        section: 'Shiva Purana, Rudra Samhita, Kumara Khanda, chapters 13–18',
        relevance: 'The birth of Ganesha, the elephant head, and the decree of first worship — the story the festival celebrates'
      },
      {
        id: 'ganesh-chaturthi-syamantaka',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 10, chapters 56–57',
        relevance: 'The Syamantaka jewel episode — Krishna falsely accused after seeing the Chaturthi moon, the basis of the moon-avoidance tradition'
      }
    ],
    regionalVariations: [],
    modernAdaptations: [
      'Eco-friendly clay idols',
      'Water-soluble paints',
      'Community environmental initiatives'
    ],
    familyActivities: [
      {
        id: 'ganesh-clay-murti',
        title: 'Shape Your Own Clay Ganesha',
        description: 'Make the family murti from natural clay, the way Parvati made her son from turmeric paste — imperfect, handmade, and entirely yours.',
        ageGroup: 'all_ages',
        duration: '1-2 hours',
        materials: ['Natural clay (river or craft clay)', 'A board to work on', 'Water bowl', 'Durva grass and flowers to decorate'],
        instructions: [
          'Tell the birth story while shaping: body first, then the head placed on — the story in clay',
          'Let each child add one feature: the trunk, the big ears, the modak in his hand',
          'Dry, install with the family sthapana, and immerse this same murti at visarjan'
        ],
        learningObjective: 'What you shape with your own hands you love differently — and releasing it teaches the festival\'s whole lesson'
      },
      {
        id: 'ganesh-modak-making',
        title: 'A Modak Assembly Line',
        description: 'Make ukdiche modak (steamed rice-flour dumplings with jaggery-coconut filling) together — the sweet Ganesha loves best.',
        ageGroup: 'all_ages',
        duration: '1 hour',
        materials: ['Rice flour', 'Jaggery and grated coconut', 'Cardamom', 'A steamer'],
        instructions: [
          'Elders make the dough, children fill and pleat (crooked pleats taste the same)',
          'Offer the first 21 to Ganesha before anyone eats',
          'Tell the story of the modak: hard shell, sweet heart — effort outside, reward within'
        ],
        learningObjective: 'Offering the first and best of what you make — before tasting it yourself — is the oldest form of gratitude'
      }
    ],
    culturalImpact: 'Promotes community unity, artistic expression, and environmental awareness.',
    relatedFestivals: ['diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/ganesh-chaturthi-cover.png'),
    reflectionQuestions: [
      'Ganesha is welcomed in as a guest — and then, deliberately, given back to the water. What would it take for you to hold something that lightly?',
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Rudra Samhita, Kumara Khanda, chapters 13–18 (birth and first-worship decree)',
        translation: 'J.L. Shastri, Motilal Banarsidass / wisdomlib.org',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 10, chapters 56–57 (Syamantaka jewel; the moon-curse tradition)',
        translation: 'cross-checked against public translations',
      },
      {
        text: 'Modern history',
        locator: 'Lokmanya Tilak\'s sarvajanik Ganeshotsav, 1893 — documented history, not scripture',
      },
    ],
  },
  {
    id: 'onam-2025',
    name: 'Onam',
    sanskritName: 'ഓണം (Thiruvonam)',
    date: '2025-09-05',
    occurrences: ['2025-09-05', '2026-08-26', '2027-09-12', '2028-09-01'], // Thiruvonam day; verified vs Drik Panchang, Jul 2026 (celebrations begin 10 days earlier, on Atham)
    emoji: '🌼',
    dateType: 'solar',
    type: 'harvest',
    significance: 'Kerala\'s harvest festival and the annual homecoming of King Mahabali',
    description: 'Ten days of flower carpets, boat races, and feasting that welcome a beloved king back to his people',
    traditions: [
      'Pookalam flower carpets',
      'Onasadya feast on banana leaves',
      'Vallam kali snake-boat races',
      'Onakkodi new clothes',
      'Kaikottikali dance'
    ],
    prayers: [
      'Onappattu (Onam songs)',
      'Vamana puja at Thrikkakara temple'
    ],
    foods: [
      'Onasadya (the full feast)',
      'Avial',
      'Sambar and rice',
      'Olan and thoran',
      'Sharkara varatti (jaggery banana chips)',
      'Payasam'
    ],
    colors: ['Yellow', 'Cream and gold (kasavu)', 'Marigold orange'],
    deity: 'Vamana (Vishnu) and King Mahabali',
    scripture: 'Bhagavata Purana',
    duration: 2,
    region: 'Kerala',
    importance: 'regional',
    rituals: [
      {
        id: 'onam-pookalam',
        name: 'The Pookalam',
        description: 'The flower carpet laid at the front door across the days of Onam, growing by one ring of petals each morning until Thiruvonam.',
        timeOfDay: 'morning',
        materials: ['Fresh flower petals in several colors (marigold, chrysanthemum, ixora, rose)', 'A swept patch of floor at the entrance', 'A simple circular design to start from', 'A small lamp for the center (optional)'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'On Atham morning, sweep and wash the space at the front door and lay a small circle of yellow petals.',
            explanation: 'The carpet begins humbly. Yellow is traditional for the first day.'
          },
          {
            stepNumber: 2,
            instruction: 'Each following morning, add one new ring of a different color around yesterday\'s circle.',
            explanation: 'The growing carpet counts down the days of welcome, and new flowers and bolder designs join as Thiruvonam nears.'
          },
          {
            stepNumber: 3,
            instruction: 'On Thiruvonam morning, complete the largest ring and set a lamp or small clay cones at the center.',
            explanation: 'The clay cones, called Onathappan, stand for Vamana and Mahabali in many homes. The finished carpet says the house is ready for its guest.'
          },
          {
            stepNumber: 4,
            instruction: 'Keep the carpet fresh through the day of the feast, then let it go without ceremony.',
            explanation: 'Like the visit itself, the pookalam is beautiful and brief, made to be renewed next year.'
          }
        ],
        significance: 'The pookalam is Kerala\'s welcome mat for Mahabali, a visible and growing signal that the household is expecting its king.',
        tips: ['Children own this ritual in most homes; let them design the rings', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Making it a competition of size; a small fresh carpet honors the day better than a large stale one']
      }
    ],
    fullStory: 'Onam is Kerala\'s harvest festival and its grandest celebration, ten days of flower carpets, boat races, and feasting that welcome the annual homecoming of King Mahabali. The Bhagavata Purana tells how the generous asura king surrendered everything to Vishnu in his Vamana avatar, keeping his word at the cost of his kingdom, and was granted the boon of visiting his people once a year. On Thiruvonam day Kerala lays flower carpets at its thresholds and serves the Onasadya feast, so the returning king finds his land as happy and as equal as he left it.',
    sections: [
      {
        id: 'onam-banished-king',
        title: 'The Festival for a Banished King',
        subtitle: 'Kerala Waits for a Guest',
        storyText: 'Every year, as the monsoon ends, Kerala prepares for a guest.\n\nHouses are cleaned. New clothes are bought. Flower carpets appear on doorsteps and grow larger every morning for ten days. And then comes the strangest part. The guest everyone is waiting for is an **asura**, a being from the family that Hindu stories usually cast as the villains.\n\nHis name is **Mahabali**, or Maveli for short, and Malayalis will tell you with real affection that he was the best king their land ever had. An old Onam song says that when Maveli ruled, all people were equal, nobody cheated anybody, and nobody went hungry.\n\nOnam is the time of year his people believe he comes back to visit them. The whole festival is a welcome.',
        citation: 'The Maveli song (Onappattu) — Malayalam folk tradition, not scripture.'
      },
      {
        id: 'onam-vamana',
        title: 'The Small Boy at the Sacrifice',
        subtitle: 'Three Paces of Land',
        storyText: 'So how did a beloved king end up banished? The story is told in the **Bhagavata Purana**.\n\nBali was the grandson of **Prahlada**, the boy devotee the Holi story remembers. Like his grandfather he was devoted to Vishnu, and he was generous almost beyond sense. By strength and by virtue he won all three worlds, and the unseated gods went looking for help.\n\nVishnu came, but not with a weapon. He was born as **Vamana**, a small brahmin boy with an umbrella, and he walked into the great sacrifice where Bali was giving gifts to anyone who asked.\n\nThe boy asked for something absurdly small. Three paces of land, measured by his own little feet. Bali smiled and agreed. His teacher Shukracharya pulled him aside and warned him that the boy was Vishnu himself and that the gift would cost him everything. Bali gave his word anyway. A king who breaks a promise, he said, loses more than land.',
        citationLink: 'festival:holi-2025',
        citation: 'Bhagavata Purana, Canto 8, chapters 15–19.'
      },
      {
        id: 'onam-three-steps',
        title: 'Two Steps Cover the Worlds',
        subtitle: 'And a King Offers His Head',
        storyText: 'Then the small boy began to grow.\n\nHe grew until his first stride covered the whole earth. His second stride covered the heavens. Then he looked down at Bali and asked, politely, where the third pace should go, since everything Bali owned had been used up in two.\n\nThe watching crowd expected excuses. Instead the king bowed and offered the one thing still his. **He asked Vishnu to place the third step on his own head.**\n\nVishnu did, and pressed him down out of this world, to a realm below called Sutala. But the Purana does not tell it as a defeat. Vishnu was won over by the king who kept his word when it cost him everything. He promised to guard Bali\'s realm himself, and he granted the fallen king a boon. Once a year, Bali may come home and see his people.',
        teachingText: 'The tradition reads the foot on Bali\'s head as a blessing, because for a devotee the touch of the god is the goal, whatever form it arrives in.\n\nBali\'s flaw was small and very human. He had begun to believe his own generosity made him untouchable. What survived his fall was the part of him that was actually great, the kept promise. That is the king Kerala remembers.',
        citation: 'Bhagavata Purana, Canto 8, chapters 20–23.'
      },
      {
        id: 'onam-ten-days',
        title: 'Ten Days of Welcome',
        subtitle: 'A Flower Carpet Grows at the Door',
        storyText: 'How do you prepare for a king\'s visit? Kerala answers with ten days of it, from the day of **Atham** to the day of **Thiruvonam**, the star under which the visit happens.\n\nThe most beautiful of the customs is the **pookalam**, a carpet of fresh flower petals laid on the ground at the front door. It starts small on Atham morning, and every morning a new ring of color is added, so that by Thiruvonam it has grown into a great circle. The idea is plain and warm. The house is telling its king, from a distance, that he is expected.',
        bullets: [
          '**Pookalam**, the flower carpet at the threshold, one new ring each morning',
          '**Onakkodi**, new clothes for the whole family, worn on Thiruvonam day',
          '**Vallam kali**, the snake-boat races on the backwaters, a hundred rowers to a boat',
          '**Kaikottikali**, the clap dance performed in a circle around the pookalam',
          'Swings hung from high branches, games, and songs that fill the ten days'
        ],
        citation: 'Onam customs — festival practice, labeled as tradition.'
      },
      {
        id: 'onam-sadya',
        title: 'A Feast Where Everyone Sits Together',
        subtitle: 'Rows of Banana Leaves',
        storyText: 'Thiruvonam afternoon belongs to the **Onasadya**, and for many Malayalis the feast is the point of the whole festival.\n\nIt is a spread of two dozen or more vegetarian dishes served on a fresh banana leaf. Rice, sambar, avial, olan, thoran, crisp banana chips, and payasam to finish. There is an old saying that a Malayali will sell all he has to celebrate Onam with a feast, and it is quoted every year with pride.\n\nThe deeper rule of the sadya is where the old song comes back. Everyone sits in the same rows, eats the same food, off the same leaf. On the day Mahabali visits, his people show him the kingdom he remembers, one where all are equal.\n\nOnam long ago outgrew any one religion. In Kerala it is kept by Hindu, Christian, and Muslim families alike, and the state government celebrates it as the official festival of Kerala. A festival that began with a king keeping his word has become a yearly rehearsal of his kingdom.',
        teachingText: 'Keep Onam the way Kerala does, by feeding people. Cook more than you need, lay the food out in one row, and let there be no head of the table.\n\nUnderneath the flowers and the feast, the festival asks one quiet question. If the good king came back this year and looked around your home, would he recognize his kingdom in it?',
        citation: 'Onasadya and public celebration — Kerala tradition; Onam is attested as early as Tamil Sangam-era literature.'
      }
    ],
    sources: [
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 8, chapters 15–23 (Vamana avatara: Bali\'s sacrifice, the three steps, the boon of return)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
        url: 'https://vedabase.io/en/library/sb/8/',
      },
      {
        text: 'Onappattu (the Maveli song)',
        locator: '"Maveli nadu vanidum kalam…" — Malayalam folk tradition, labeled as tradition',
      },
      {
        text: 'Drik Panchang',
        locator: 'Thiruvonam dates 2025–2028 (Thiruvonam nakshatra in Chingam)',
      },
    ],
    mythology: [
      'King Mahabali\'s golden reign and his yearly return to Kerala',
      'Vishnu\'s Vamana avatar and the three paces of land',
      'Bali as grandson of Prahlada, the great devotee of the Holi story'
    ],
    historicalContext: 'Onam is attested remarkably early; Tamil Sangam-era literature already mentions the festival, and it has been Kerala\'s defining celebration for well over a millennium. Today it is the official state festival, kept across religious lines.',
    scriptureReferences: [
      {
        id: 'onam-bhagavata-8',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 8, chapters 15–23',
        relevance: 'The Vamana avatar: Bali\'s gift of three paces, the two strides that covered the worlds, and the boon that lets the king visit his people once a year'
      }
    ],
    regionalVariations: [
      {
        region: 'Thrikkakara (Kochi)',
        localName: 'Thrikkakara Onam',
        uniqueTraditions: ['Ten-day festival at the Vamana temple that anchors the legend', 'Onathappan clay cones placed at the pookalam center'],
        specialFoods: ['The full 20+ dish sadya'],
        localCustoms: 'Thrikkakara temple, dedicated to Vamana, is held to stand at the seat of Mahabali\'s old capital; its flag-raising on Atham day opens Onam for the whole state.'
      },
      {
        region: 'Malayali diaspora',
        localName: 'Community Onam',
        uniqueTraditions: ['Community sadyas in rented halls from the Gulf to New Jersey', 'Pookalam competitions'],
        specialFoods: ['Catered sadya on banana leaf'],
        localCustoms: 'Outside Kerala, Onam functions as the great annual gathering of Malayali associations, kept by families of every faith.'
      }
    ],
    modernAdaptations: [
      'Government-run Onam week with pookalam competitions',
      'Televised vallam kali races',
      'Community sadyas organized by diaspora associations'
    ],
    familyActivities: [
      {
        id: 'onam-mini-sadya',
        title: 'A Mini Sadya on Banana Leaves',
        description: 'Cook a scaled-down Onam feast together and serve it the traditional way, everyone in one row, same dishes, same leaves.',
        ageGroup: 'all_ages',
        duration: '2-3 hours',
        materials: ['Banana leaves (or large plates)', 'Rice and three or four sadya dishes', 'Payasam or another sweet'],
        instructions: [
          'Assign every family member one dish to make or plate',
          'Lay the leaves in a single row, narrow tips pointing left',
          'Serve everyone the same items in the same order, and eat with your hands'
        ],
        learningObjective: 'The sadya\'s rule of equality is easier to feel than to explain when everyone shares one row and one menu'
      }
    ],
    culturalImpact: 'Onam carries Kerala\'s founding ideal of an equal society, rehearsed each year in the shared sadya row, and holds the rare distinction of a purana story kept as a festival by an entire multi-religious state.',
    relatedFestivals: ['holi-2025', 'makar-sankranti-2025'],
    heroImageUrl: require('../../assets/images/covers/onam-cover.png'),
  },
  {
    id: 'navratri-2025',
    name: 'Navratri',
    sanskritName: 'नवरात्रि',
    date: '2025-09-22',
    occurrences: ['2025-09-22', '2026-10-11', '2027-09-30', '2028-09-19'], // verified vs Drik Panchang, Jul 2026 (2026 corrected 10-10→10-11, Ghatasthapana)
    emoji: '🦁',
    dateType: 'lunar',
    type: 'deity_celebration',
    significance: 'Nine sacred nights celebrating Goddess Durga and her nine divine forms',
    description: 'The most vibrant festival honoring the divine feminine power through nine nights of worship, dance, and spiritual devotion',
    fullStory: 'Navratri, meaning "nine nights," is one of the most significant Hindu festivals dedicated to the worship of Goddess Durga and her nine manifestations known as Navdurga. This festival celebrates the victory of good over evil, as embodied by Goddess Durga\'s triumph over the buffalo demon Mahishasura. Each of the nine days is dedicated to a different form of the goddess, representing various aspects of divine feminine energy (Shakti). The festival is observed through fasting, prayer, dance (Garba and Dandiya), and community celebrations that bring people together in joyous worship. Navratri occurs twice a year, with Sharad Navratri (autumn) being the most widely celebrated, marking the triumph of light over darkness as winter approaches.',
    sections: [
      {
        id: 'navratri-nine-nights',
        title: 'Nine Nights for the Mother',
        subtitle: 'A Sprouting Pot Beside an Unbroken Flame',
        storyText: 'Twice a year, at the hinge of the seasons, India clears **nine nights** for the Goddess.\n\nSharad Navratri opens with **Ghatasthapana**: a clay pot is filled with soil and sown with barley, a lamp is lit beside it and — in many homes — kept burning through all nine nights. By Vijayadashami the pot is green with shoots.\n\nThe symbols do the teaching before a single prayer is spoken: the Goddess as the pot of life sprouting in the dark, the vigil-flame as devotion that does not go out. **Nights, not days** — because the festival honors power exactly where it is hardest to see.'
      },
      {
        id: 'navratri-why-she-fights',
        title: 'The Battle Being Remembered',
        subtitle: 'Durga\'s Lion Mid-Leap Against the Buffalo Demon',
        storyText: 'The nine nights commemorate the Devi Mahatmya\'s central war.\n\n**Mahishasura**, the shape-shifting buffalo demon, held a boon protecting him from man and god alike. **Durga** — born of the pooled radiance of every deva, armed with all their weapons — fought him through nine nights of shifting forms and slew him as the tenth day dawned.\n\n**Vijayadashami**, "the tenth of victory," is that dawn. The whole structure of the festival is the battle\'s shape: nine nights of holding steady while the deception cycles, and then the morning where truth pins it.',
        teachingText: 'Whatever you are contending with this season — a habit, a fear, a long injustice — Navratri\'s counsel is the Goddess\'s method: **do not chase every disguise it wears. Keep the vigil.**\n\nNine nights of steadiness beat nine days of frantic pursuit, and the tenth morning belongs to the one who did not waver.',
        citationLink: 'deity:durga',
        citation: 'Devi Mahatmya (Markandeya Purana), Chapters 2–3.',
        checks: [
          {
            id: 'chk:festival:navratri:mahishasura',
            kind: 'mcq',
            practice: true,
            prompt: 'The nine nights of Navratri remember the Goddess’s battle against whom?',
            options: [
              { text: 'Mahishasura, the buffalo demon no single god could defeat, so the gods pooled their power into Durga', correct: true },
              { text: 'Ravana, the ten-headed king of Lanka' },
              { text: 'Kamsa, the tyrant who imprisoned Krishna’s parents' },
            ],
            why: 'When no god could beat the buffalo demon Mahishasura, they poured their combined power into one being, and Durga arose to fight him across the nine nights.',
          },
        ],
      },
      {
        id: 'navratri-garba',
        title: 'Dancing Around the Lamp',
        subtitle: 'Concentric Circles Turning Around a Clay Lantern',
        storyText: 'In Gujarat, the nine nights become **the world\'s largest dance**.\n\nGarba takes its name from the **garbha-deep** — the "womb lamp," a perforated clay pot with a flame inside — placed at the center while dancers circle it in rings, hundreds or thousands turning as one.\n\nThe choreography is cosmology: the lamp is the Goddess as the still light of life; the circling dancers are creation itself, wheeling around her. Every clap and turn says what the philosophers wrote in Sanskrit — **the divine feminine is the unmoving center of all this motion.**',
        teachingText: 'Notice that no one dances AT the lamp; they dance around it, together, in rings open to anyone. It is worship as community joy — the theology made kinetic.\n\nWhatever your tradition of celebration, Navratri asks: **what is at the center of your circling?** A garba circle with nothing at the center is just exercise.'
      },
      {
        id: 'navratri-kanya-vijaya',
        title: 'The Goddess at the Door',
        subtitle: 'Young Girls Seated as Honored Guests',
        storyText: 'On Ashtami or Navami, the festival performs its most literal theology: **kanya puja**.\n\nYoung girls are invited in, their feet washed, tikka placed on their brows, and fed the best food in the house — worshiped, for one morning, as living embodiments of the Goddess. It is the Devi Mahatmya\'s great litany — **"to the Goddess who abides in ALL beings"** — enforced at household scale, and it lands with an edge in a world that does not always treat its daughters as divine.\n\nThen comes Vijayadashami: the demon falls, Ravana burns in the north, and the sprouted barley from the first night is distributed — nine nights of the dark made visibly, tenderly green.',
        teachingText: 'Kanya puja asks the festival\'s sharpest question on its way out the door: **is your reverence portable?**\n\nIt is easy to honor the Goddess in a pandal; the practice is honoring her in the beings around you — starting with the ones your culture is most tempted to overlook.',
        checks: [
          {
            id: 'chk:festival:navratri:kanya',
            kind: 'mcq',
            practice: true,
            prompt: 'Near the end of Navratri, families invite young girls in and honor them with food and gifts. What does this custom express?',
            options: [
              { text: 'The Goddess is seen as present in them, the divine feminine honored as near and living', correct: true },
              { text: 'The girls are being asked to perform the rituals for the adults' },
              { text: 'It is a fundraiser for the temple' },
            ],
            why: 'In kanya puja the girls are honored as forms of the Goddess herself, the festival’s reminder that the same power that beat the demon is also the child at your door.',
          },
        ],
      }
    ],
    reflectionQuestions: [
      'Nine nights of the Goddess — fierce, nurturing, wise by turns. Which of her faces do you most need right now, and why that one?',
    ],
    sources: [
      {
        text: 'Devi Mahatmya (Markandeya Purana)',
        locator: 'Chapters 2–3 (Durga\'s birth and the Mahishasura battle); Chapter 5 (the Goddess in all beings)',
        translation: 'cross-checked against public translations (devimahatmya.com / wisdomlib.org)',
      },
      {
        text: 'Living tradition',
        locator: 'Ghatasthapana, garba/garbha-deep, kanya puja, Vijayadashami — festival practice, labeled as tradition',
      },
    ],
    mythology: [
      'The epic battle between Goddess Durga and the shape-shifting demon Mahishasura, who could only be defeated by divine feminine power',
      'The emergence of the nine forms of Durga (Navdurga) from the combined energies of all gods to restore cosmic balance',
      'The story of how Goddess Durga was created when the gods were unable to defeat Mahishasura, who had obtained a boon that no man could kill him',
      'Legend of how each day represents the goddess destroying different negative qualities and bestowing divine virtues upon devotees'
    ],
    historicalContext: 'Navratri has been celebrated for over 2,000 years, with references found in ancient texts like the Devi Mahatmya and Markandeya Purana. The festival gained prominence during medieval times and became a cornerstone of regional cultural identity, particularly in Gujarat, Bengal, and North India. Historical records show that kings and rulers patronized elaborate Navratri celebrations, making it both a religious and cultural phenomenon.',
    traditions: [
      'Nine days of fasting and spiritual purification',
      'Daily worship of different forms of Goddess Durga',
      'Traditional Garba and Dandiya Raas dance celebrations',
      'Wearing specific colors associated with each day',
      'Setting up elaborate Durga pandals and decorations',
      'Reciting Durga Chalisa and other devotional prayers',
      'Community feasting and sharing of prasadam',
      'Kanya Puja (worship of young girls) on the final days'
    ],
    prayers: [
      'Durga Chalisa',
      'Aigiri Nandini',
      'Mahishasura Mardini Stotram',
      'Navdurga Mantras',
      'Devi Mahatmya recitation'
    ],
    foods: [
      'Sabudana khichdi (for fasting)',
      'Kuttu ka atta dishes (buckwheat flour)',
      'Samak rice preparations',
      'Fruits and milk products',
      'Traditional sweets like kheer and halwa',
      'Regional specialties: Gujarati thali, Bengali bhog'
    ],
    colors: ['Day 1: Orange', 'Day 2: White', 'Day 3: Red', 'Day 4: Royal Blue', 'Day 5: Yellow', 'Day 6: Green', 'Day 7: Gray', 'Day 8: Purple', 'Day 9: Peacock Green'],
    deity: 'Goddess Durga (Nine Forms: Navdurga)',
    scriptureReferences: [
      {
        id: 'devi-mahatmya',
        text: 'puranas',
        section: 'Devi Mahatmya (Durga Saptashati)',
        relevance: 'Primary scripture narrating the glories and victories of Goddess Durga',
        quote: 'Sarva swaroope sarveshe sarva shakti samanvite, bhayebhyas trahi no devi durge devi namostute'
      },
      {
        id: 'bg-divine-feminine',
        text: 'bhagavad_gita',
        chapter: 7,
        verse: 14,
        relevance: 'Krishna describes the divine energy (Maya) which manifests as the supreme goddess',
        quote: 'This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome'
      }
    ],
    duration: 9,
    region: 'Pan-India',
    regionalVariations: [
      {
        region: 'Gujarat',
        localName: 'Navratri Garba',
        uniqueTraditions: ['Elaborate Garba and Dandiya Raas', 'Community dancing till late night', 'Garba venues and competitions'],
        specialFoods: ['Gujarati thali', 'Dhokla', 'Fafda', 'Sabudana dishes'],
        localCustoms: 'Nine nights of continuous dancing and celebration with elaborate decorations and traditional attire'
      },
      {
        region: 'West Bengal',
        localName: 'Durga Puja',
        uniqueTraditions: ['Magnificent clay idols in pandals', 'Cultural programs and performances', 'Sindoor Khela on final day'],
        specialFoods: ['Bhog prasad', 'Fish curry', 'Bengali sweets', 'Khichuri'],
        localCustoms: 'Focus on artistic idol creation, cultural celebrations, and community bonding'
      },
      {
        region: 'North India',
        localName: 'Navratri Vrat',
        uniqueTraditions: ['Strict fasting practices', 'Kanya Puja ceremony', 'Daily goddess worship'],
        specialFoods: ['Kuttu ka atta rotis', 'Sabudana preparations', 'Fruits and dairy'],
        localCustoms: 'Emphasis on spiritual purification through fasting and daily prayers'
      },
      {
        region: 'South India',
        localName: 'Golu Navratri',
        uniqueTraditions: ['Displaying dolls and figurines', 'Kalash sthapana', 'Classical music and dance'],
        specialFoods: ['Sundal varieties', 'Payasam', 'Traditional South Indian meals'],
        localCustoms: 'Setting up elaborate doll displays (Golu) and celebrating with classical arts'
      }
    ],
    importance: 'major',
    rituals: [
      {
        id: 'navratri-kalash-sthapana',
        name: 'Kalash Sthapana (Pot Installation)',
        description: 'Sacred ritual to invoke Goddess Durga by establishing a consecrated pot',
        timeOfDay: 'morning',
        materials: ['Copper or brass kalash', 'Mango leaves', 'Coconut', 'Red cloth', 'Rice', 'Coins', 'Sacred thread'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the worship area and place a wooden platform',
            explanation: 'Create a pure space for divine energy to manifest',
            tips: ['Use a red cloth as base', 'Face east or north direction']
          },
          {
            stepNumber: 2,
            instruction: 'Fill kalash with holy water and place mango leaves',
            explanation: 'Water represents life force, mango leaves symbolize fertility',
            tips: ['Use Ganga water if available', 'Arrange 5 mango leaves around rim']
          },
          {
            stepNumber: 3,
            instruction: 'Place coconut on top and tie with red thread',
            explanation: 'Coconut represents divine consciousness, red thread offers protection',
            tips: ['Keep coconut intact with husk', 'Chant mantras while tying']
          },
          {
            stepNumber: 4,
            instruction: 'Invoke Goddess Durga with prayers and offerings',
            explanation: 'Invite divine presence into the kalash for nine days',
            tips: ['Light incense and diya', 'Offer flowers and fruits']
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ दुर्गायै नमः',
            transliteration: 'Om Durgayai Namah',
            meaning: 'Salutations to Goddess Durga',
            pronunciation: 'ohm-dur-ga-yai-na-mah'
          },
          {
            sanskrit: 'सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते',
            transliteration: 'Sarvaswaroope Sarveshe Sarva Shakti Samanvite',
            meaning: 'To her who is the embodiment of all forms and all powers',
            pronunciation: 'sar-va-swa-roo-pe-sar-ve-she-sar-va-shak-ti-sa-man-vi-te'
          }
        ],
        significance: 'Establishes divine presence and creates sacred space for nine-day worship',
        tips: ['Perform during auspicious muhurat', 'Maintain purity throughout', 'Keep kalash undisturbed for nine days'],
        commonMistakes: ['Using plastic kalash', 'Disturbing setup during festival', 'Not maintaining cleanliness']
      },
      {
        id: 'navratri-daily-worship',
        name: 'Daily Navdurga Worship',
        description: 'Nine-day cycle of worshiping different forms of Goddess Durga',
        timeOfDay: 'morning',
        materials: ['Flowers specific to each day', 'Incense', 'Oil lamps', 'Offerings', 'Red cloth'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Wake up early and take ritual bath',
            explanation: 'Purification before approaching the divine',
            tips: ['Use natural oils', 'Wear fresh clothes']
          },
          {
            stepNumber: 2,
            instruction: 'Worship the specific Navdurga form of the day',
            explanation: 'Each day honors different aspect of divine feminine',
            tips: ['Learn about the day\'s goddess form', 'Offer specific flowers and colors']
          },
          {
            stepNumber: 3,
            instruction: 'Chant specific mantras and prayers',
            explanation: 'Sacred sounds invoke divine blessings',
            tips: ['Maintain focus and devotion', 'Use prayer beads for counting']
          },
          {
            stepNumber: 4,
            instruction: 'Perform aarti and offer prasadam',
            explanation: 'Complete the worship with light ceremony and blessed food',
            tips: ['Share prasadam with family', 'Keep some for evening']
          }
        ],
        significance: 'Systematic worship of all aspects of divine feminine energy',
        tips: ['Follow daily color themes', 'Maintain consistency', 'Include family members'],
        commonMistakes: ['Skipping days', 'Not learning about each goddess form', 'Rushing through rituals']
      }
    ],
    starterPack: {
      id: 'navratri-celebration-kit',
      title: 'Complete Navratri Celebration Kit',
      description: 'Everything needed to celebrate nine nights of divine feminine worship with traditional authenticity',
      difficulty: 'intermediate',
      estimatedCost: '$75-95',
      timeRequired: '9 days celebration, 2 hours daily preparation',
      essentialItems: [
        {
          id: 'navratri-kalash-set',
          name: 'Sacred Kalash with Accessories',
          description: 'Complete brass kalash set with mango leaves, coconut, and red cloth for Durga invocation',
          culturalSignificance: 'The kalash represents the universe and serves as the seat of Goddess Durga during Navratri',
          price: 35,
          currency: 'USD',
          imageUrl: '/images/products/navratri-kalash.jpg',
          vendor: {
            id: 'sacred-vessels',
            name: 'Sacred Vessels Co.',
            story: 'Traditional brass workers specializing in religious items for 60+ years',
            location: 'Varanasi, Uttar Pradesh',
            specialization: 'Handcrafted brass kalash and ritual vessels',
            yearsOfExperience: 60,
            artisanStory: 'Master craftsmen preserving ancient techniques of brass work passed down through generations',
            businessEthos: 'Creating sacred vessels that enhance spiritual practice and devotion',
            sustainabilityPractices: ['Pure brass without chemical coating', 'Traditional hand-forging methods', 'Supporting local artisan families']
          },
          category: 'ritual_items',
          materials: ['Pure brass', 'Natural coconut', 'Fresh mango leaves', 'Red cotton cloth'],
          dimensions: '8" height x 6" diameter',
          weight: '2 lbs',
          isEssential: true
        },
        {
          id: 'navdurga-photo-set',
          name: 'Navdurga Nine Forms Photo Collection',
          description: 'Beautiful printed images of all nine forms of Goddess Durga for daily worship',
          culturalSignificance: 'Visual representation helps devotees connect with specific aspects of divine feminine energy',
          price: 25,
          currency: 'USD',
          imageUrl: '/images/products/navdurga-photos.jpg',
          vendor: {
            id: 'divine-prints',
            name: 'Divine Art Prints',
            story: 'Creating spiritual artwork and deity images for temples and homes since 1995',
            location: 'Nathdwara, Rajasthan',
            specialization: 'High-quality deity photographs and spiritual artwork',
            yearsOfExperience: 30,
            artisanStory: 'Artists working closely with temples to create authentic deity representations',
            businessEthos: 'Bringing divine presence into homes through sacred art',
            sustainabilityPractices: ['Eco-friendly inks', 'Recycled paper options', 'Supporting traditional artists']
          },
          category: 'art',
          materials: ['High-quality photo paper', 'Fade-resistant inks', 'Protective frames'],
          dimensions: '8" x 10" each photo',
          isEssential: true
        },
        {
          id: 'garba-dandiya-set',
          name: 'Traditional Garba Dandiya Sticks',
          description: 'Colorfully decorated wooden dandiya sticks for traditional Navratri dancing',
          culturalSignificance: 'Dandiya represents the swords of warriors and the rhythmic dance celebrates victory of good over evil',
          price: 20,
          currency: 'USD',
          imageUrl: '/images/products/dandiya-sticks.jpg',
          vendor: {
            id: 'gujarat-crafts',
            name: 'Gujarat Traditional Crafts',
            story: 'Family business creating authentic Gujarati cultural items for 40+ years',
            location: 'Ahmedabad, Gujarat',
            specialization: 'Garba and Dandiya accessories, traditional Gujarati crafts',
            yearsOfExperience: 40,
            artisanStory: 'Preserving Gujarat\'s rich cultural heritage through traditional craft techniques',
            businessEthos: 'Keeping alive the joy and spirit of Gujarati festivals',
            sustainabilityPractices: ['Natural wood from sustainable sources', 'Non-toxic paints', 'Handmade by local artisans']
          },
          category: 'art',
          materials: ['Natural wood', 'Bright non-toxic paints', 'Decorative elements'],
          dimensions: '12" length, lightweight design',
          isEssential: true
        }
      ],
      optionalItems: [
        {
          id: 'navratri-fast-foods',
          name: 'Navratri Fasting Food Kit',
          description: 'Special ingredients for preparing traditional fasting meals during nine days',
          culturalSignificance: 'Fasting during Navratri purifies body and mind, bringing devotee closer to divine',
          price: 30,
          currency: 'USD',
          imageUrl: '/images/products/fast-food-kit.jpg',
          vendor: {
            id: 'pure-ingredients',
            name: 'Pure & Natural Ingredients',
            story: 'Providing pure, unprocessed ingredients for religious observances',
            location: 'Rishikesh, Uttarakhand',
            specialization: 'Fasting foods and pure ingredients for religious practices',
            yearsOfExperience: 25,
            artisanStory: 'Sourcing pure ingredients from Himalayan regions for spiritual practices',
            businessEthos: 'Supporting spiritual journeys through pure, sattvic foods',
            sustainabilityPractices: ['Organic farming methods', 'Minimal processing', 'Direct farmer partnerships']
          },
          category: 'food_ingredients',
          materials: ['Sabudana', 'Kuttu atta', 'Samak rice', 'Rock salt', 'Pure ghee'],
          isEssential: false
        }
      ],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Day 1 - Shailaputri Worship (Orange Day)',
          description: 'Begin Navratri by invoking Goddess Shailaputri, the daughter of mountains',
          timeOfDay: 'Early morning (6:00-8:00 AM)',
          duration: '2 hours',
          materialsNeeded: ['Kalash setup', 'Orange flowers', 'Orange clothes', 'Jasmine oil'],
          detailedInstructions: [
            'Perform Kalash Sthapana in auspicious muhurat',
            'Wear orange colored clothes',
            'Offer jasmine flowers and light ghee lamp',
            'Chant Shailaputri mantras 108 times',
            'Begin your fasting regimen',
            'Participate in community Garba if available'
          ],
          culturalContext: 'Shailaputri represents pure energy and new beginnings, perfect for starting Navratri',
          tips: ['Start early morning for maximum benefit', 'Maintain purity throughout the day'],
          imageUrl: '/images/guides/day1-shailaputri.jpg'
        },
        {
          stepNumber: 2,
          title: 'Day 2 - Brahmacharini Worship (White Day)',
          description: 'Honor Goddess Brahmacharini, the seeker of knowledge and penance',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['White flowers', 'White clothes', 'Sugar offering', 'White sandalwood'],
          detailedInstructions: [
            'Wear white or light colored clothes',
            'Offer white flowers like jasmine or white lotus',
            'Light white candles or ghee lamps',
            'Meditate on knowledge and wisdom',
            'Read spiritual texts or scriptures',
            'Prepare simple, pure meals'
          ],
          culturalContext: 'Brahmacharini represents dedication to learning and spiritual growth',
          tips: ['Focus on study and meditation', 'Offer sugar as prasadam'],
          imageUrl: '/images/guides/day2-brahmacharini.jpg'
        },
        {
          stepNumber: 3,
          title: 'Day 3 - Chandraghanta Worship (Red Day)',
          description: 'Worship Goddess Chandraghanta for courage and strength',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Red flowers', 'Red clothes', 'Milk and sweets', 'Red sandalwood'],
          detailedInstructions: [
            'Dress in red colored attire',
            'Offer red flowers like roses or hibiscus',
            'Prepare milk-based sweets as offering',
            'Pray for courage and fearlessness',
            'Participate in energetic Garba dances',
            'Share sweets with neighbors'
          ],
          culturalContext: 'Chandraghanta destroys evil and grants courage to devotees',
          tips: ['Red symbolizes energy and power', 'Focus on overcoming fears'],
          imageUrl: '/images/guides/day3-chandraghanta.jpg'
        },
        {
          stepNumber: 4,
          title: 'Day 4 - Kushmanda Worship (Royal Blue Day)',
          description: 'Honor Goddess Kushmanda, the creator of the universe',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Blue flowers', 'Royal blue clothes', 'Malpua offering', 'Blue decorations'],
          detailedInstructions: [
            'Wear royal blue or navy blue clothes',
            'Offer blue flowers and fruits',
            'Prepare malpua as special offering',
            'Meditate on cosmic creation and abundance',
            'Decorate with blue lights and fabrics',
            'Practice gratitude for life\'s blessings'
          ],
          culturalContext: 'Kushmanda represents cosmic energy and the power of creation',
          tips: ['Blue represents divine consciousness', 'Focus on creativity and abundance'],
          imageUrl: '/images/guides/day4-kushmanda.jpg'
        },
        {
          stepNumber: 5,
          title: 'Day 5 - Skandamata Worship (Yellow Day)',
          description: 'Worship Goddess Skandamata, the mother of Lord Kartikeya',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Yellow flowers', 'Yellow clothes', 'Banana offering', 'Yellow decorations'],
          detailedInstructions: [
            'Dress in bright yellow attire',
            'Offer yellow flowers like marigolds',
            'Place bananas and yellow fruits as offering',
            'Pray for protection and motherly blessings',
            'Include children in worship rituals',
            'Prepare yellow colored foods'
          ],
          culturalContext: 'Skandamata represents divine motherhood and protection',
          tips: ['Yellow symbolizes knowledge and peace', 'Special day for mothers and children'],
          imageUrl: '/images/guides/day5-skandamata.jpg'
        },
        {
          stepNumber: 6,
          title: 'Day 6 - Katyayani Worship (Green Day)',
          description: 'Honor Goddess Katyayani, the warrior form who destroys evil',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Green flowers', 'Green clothes', 'Honey offering', 'Green decorations'],
          detailedInstructions: [
            'Wear green colored clothing',
            'Offer green flowers and leaves',
            'Present honey as sweet offering',
            'Pray for strength against obstacles',
            'Perform vigorous Garba and Dandiya',
            'Seek blessings for marriage and relationships'
          ],
          culturalContext: 'Katyayani is especially worshiped by unmarried women seeking good husbands',
          tips: ['Green represents growth and harmony', 'Powerful day for removing obstacles'],
          imageUrl: '/images/guides/day6-katyayani.jpg'
        },
        {
          stepNumber: 7,
          title: 'Day 7 - Kalaratri Worship (Gray Day)',
          description: 'Worship Goddess Kalaratri, the fierce form who destroys ignorance',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Dark flowers', 'Gray clothes', 'Jaggery offering', 'Oil lamps'],
          detailedInstructions: [
            'Wear gray or dark colored clothes',
            'Offer dark colored flowers',
            'Light multiple oil lamps',
            'Pray for removal of fear and ignorance',
            'Perform protective mantras',
            'Offer jaggery as prasadam'
          ],
          culturalContext: 'Kalaratri destroys darkness and negative energies',
          tips: ['Gray represents neutrality and balance', 'Focus on overcoming inner darkness'],
          imageUrl: '/images/guides/day7-kalaratri.jpg'
        },
        {
          stepNumber: 8,
          title: 'Day 8 - Mahagauri Worship (Purple Day)',
          description: 'Honor Goddess Mahagauri, the epitome of purity and peace',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Purple/white flowers', 'Purple clothes', 'Coconut offering', 'Pure ghee'],
          detailedInstructions: [
            'Dress in purple or violet colored attire',
            'Offer white and purple flowers',
            'Present fresh coconut as offering',
            'Perform special purification rituals',
            'Practice meditation and inner cleansing',
            'Share pure, sattvic food'
          ],
          culturalContext: 'Mahagauri grants purity, peace, and compassion to devotees',
          tips: ['Purple represents spiritual transformation', 'Focus on inner purity'],
          imageUrl: '/images/guides/day8-mahagauri.jpg'
        },
        {
          stepNumber: 9,
          title: 'Day 9 - Siddhidatri Worship (Peacock Green Day)',
          description: 'Complete Navratri by worshiping Goddess Siddhidatri, the grantor of supernatural powers',
          timeOfDay: 'Morning to evening',
          duration: '3 hours',
          materialsNeeded: ['Peacock green flowers', 'Green/blue clothes', 'Nine types of food', 'Kanya Puja items'],
          detailedInstructions: [
            'Wear peacock green or turquoise clothes',
            'Offer rare and beautiful flowers',
            'Prepare nine different food items',
            'Perform Kanya Puja (worship of young girls)',
            'Complete all pending prayers and wishes',
            'Plan for Dussehra celebration next day',
            'Thank goddess for nine days of blessings'
          ],
          culturalContext: 'Siddhidatri completes the cycle of divine feminine worship and grants spiritual achievements',
          tips: ['Most auspicious day of Navratri', 'Kanya Puja brings special blessings'],
          imageUrl: '/images/guides/day9-siddhidatri.jpg'
        }
      ],
      tips: [
        'Maintain the same time daily for worship consistency',
        'Learn about each goddess form to deepen connection',
        'Follow color themes to enhance spiritual energy',
        'Participate in community celebrations when possible',
        'Keep fasting sustainable - listen to your body',
        'Document your nine-day spiritual journey'
      ],
      safetyNotes: [
        'Consult doctor before starting intensive fasting',
        'Stay hydrated during fasting periods',
        'Use safe, non-toxic colors for decorations',
        'Be cautious with oil lamps and fire',
        'Avoid overexertion during dancing'
      ]
    },
    heroImageUrl: require('../../assets/images/covers/navratri-cover.png'),
    galleryImages: [
      '/images/festivals/navratri-garba.jpg',
      '/images/festivals/durga-idol.jpg',
      '/images/festivals/navdurga-nine-forms.jpg',
      '/images/festivals/dandiya-dance.jpg',
      '/images/festivals/kalash-sthapana.jpg'
    ],
    audioUrl: '/audio/navratri-pronunciation.mp3',
    modernAdaptations: [
      'Virtual Garba classes and online dance competitions',
      'Digital Navdurga apps with daily reminders and mantras',
      'Eco-friendly Garba venues with sustainable decorations',
      'Live streaming of Durga Puja pandals for global devotees',
      'Modern fusion dance forms incorporating traditional Garba steps',
      'Healthy fasting food delivery services for working professionals'
    ],
    familyActivities: [
      {
        id: 'navdurga-learning',
        title: 'Nine Goddess Forms Learning Activity',
        description: 'Teach children about different forms of Goddess Durga through stories and art',
        ageGroup: 'children',
        duration: '45 minutes daily',
        materials: ['Coloring books', 'Crayons', 'Story books', 'Goddess photos'],
        instructions: [
          'Read story of the day\'s goddess form',
          'Show picture and explain her attributes',
          'Let children color or draw the goddess',
          'Teach simple mantras and prayers',
          'Create a nine-day goddess journal'
        ],
        learningObjective: 'Cultural knowledge, artistic skills, and spiritual understanding'
      },
      {
        id: 'family-garba-dance',
        title: 'Home Garba Dance Sessions',
        description: 'Learn traditional Garba steps as a family activity',
        ageGroup: 'all_ages',
        duration: '1 hour evening',
        materials: ['Traditional music', 'Colorful clothes', 'Dandiya sticks', 'Space for dancing'],
        instructions: [
          'Play traditional Garba music',
          'Start with simple circular movements',
          'Teach basic hand and foot coordinations',
          'Practice with dandiya sticks',
          'Create family dance videos'
        ],
        learningObjective: 'Physical fitness, cultural appreciation, and family bonding'
      },
      {
        id: 'kalash-decoration',
        title: 'Sacred Kalash Decoration Workshop',
        description: 'Involve children in decorating the worship kalash with traditional motifs',
        ageGroup: 'children',
        duration: '1 hour',
        materials: ['Plain kalash', 'Natural colors', 'Flower petals', 'Rice', 'Decorative items'],
        instructions: [
          'Explain significance of kalash in worship',
          'Let children create rangoli around kalash',
          'Decorate with flowers and natural materials',
          'Teach proper way to handle sacred items',
          'Encourage daily maintenance responsibility'
        ],
        learningObjective: 'Religious understanding, artistic creativity, and responsibility'
      }
    ],
    culturalImpact: 'Navratri transcends religious boundaries to become a celebration of feminine power, community unity, and cultural heritage. It promotes gender equality by honoring the divine feminine, supports local economies through festivals and shopping, preserves traditional dance forms like Garba and Dandiya, and strengthens social bonds through community celebrations. The festival also encourages spiritual discipline through fasting and prayer, while providing a platform for artistic expression and cultural continuity across generations.',
    relatedFestivals: ['dussehra-2025', 'diwali-2025', 'chaitra-navratri-2025']
  },
  {
    id: 'dussehra-2025',
    name: 'Dussehra',
    sanskritName: 'विजयादशमी',
    date: '2025-10-02',
    occurrences: ['2025-10-02', '2026-10-20', '2027-10-09', '2028-09-27'], // Ashvina Shukla Dashami; verified vs Drik Panchang (New Delhi), Jul 2026 — lands at the close of each verified Navratri span
    emoji: '🔥',
    dateType: 'lunar',
    type: 'victory_celebration',
    significance: 'Vijayadashami, the tenth of victory: Rama\'s defeat of Ravana, and evil burned in effigy',
    description: 'The evening India burns a ten-headed king, and why it has to do it again every year',
    traditions: [
      'Burning effigies of Ravana, Meghnada, and Kumbhakarna',
      'Ramlila performances in the preceding days',
      'Ayudha Puja (honoring the tools of one\'s work)',
      'Shami and apta leaves exchanged as "gold"',
      'Vidyarambham (children\'s first letters) in Kerala'
    ],
    prayers: [
      'Rama aarti at the effigy grounds',
      'Aparajita puja',
      'Shami tree prayer'
    ],
    foods: [
      'Jalebi and fafda',
      'Sondesh and festival sweets',
      'The season\'s first jaggery preparations'
    ],
    colors: ['Fire orange', 'Red', 'Gold'],
    deity: 'Rama',
    scripture: 'Ramayana',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'dussehra-ayudha-puja',
        name: 'Ayudha Puja at Home',
        description: 'The southern custom of honoring the instruments of your livelihood — once swords and ploughs, today laptops, ladles, and vehicles.',
        timeOfDay: 'morning',
        materials: ['The real tools of your work (laptop, instruments, kitchen knives, vehicle keys, textbooks)', 'A cloth to lay them on', 'Turmeric, kumkum, and flowers', 'A lamp'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean the tools of your trade properly, then lay them together on a fresh cloth.',
            explanation: 'The cleaning is the puja\'s first half; a tool maintained is a tool respected.'
          },
          {
            stepNumber: 2,
            instruction: 'Mark each with a dab of turmeric or kumkum, lay a flower on them, and light the lamp.',
            explanation: 'The gesture treats your instruments as partners in your dharma rather than possessions.'
          },
          {
            stepNumber: 3,
            instruction: 'Let them rest for the day; take the day off from them if you can.',
            explanation: 'One day of deliberate rest marks the difference between using your tools and being used by them.'
          },
          {
            stepNumber: 4,
            instruction: 'Before picking them up again tomorrow, name what you intend to build with them this year.',
            explanation: 'Vijayadashami is the traditional day for beginnings; ventures started today are held to carry the day\'s victory in them.'
          }
        ],
        significance: 'Ayudha Puja extends the day\'s victory to ordinary work: the tools that feed a family are honored as weapons in the daily fight for a good life.',
        tips: ['Children\'s school books belong on the cloth too; in Kerala, today is the day children write their very first letters', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Honoring the tools and skipping the rest day; the pause is half the point']
      }
    ],
    fullStory: 'Dussehra, or Vijayadashami, falls on the tenth day of Ashvina\'s bright fortnight, immediately after Navratri\'s nine nights. Two great victories share the day: Durga\'s over the buffalo demon, told in the Navratri story, and Rama\'s over the ten-headed Ravana, told here. For weeks beforehand, towns across North India stage the Ramlila, the epic performed by neighbors; on Dussehra evening, colossal effigies of Ravana and his brothers, packed with fireworks, burn before roaring crowds. The south keeps the day as Ayudha Puja, honoring the tools of work; Kerala\'s children write their first letters; and everywhere the day is held auspicious for beginnings, because it is the anniversary of good winning.',
    sections: [
      {
        id: 'dussehra-tenth-day',
        title: 'The Tenth of Victory',
        subtitle: 'When the Nine Nights End',
        storyText: 'For nine nights, India honors the Goddess. Then comes the tenth day, and it has its own name: **Vijayadashami**, the tenth of victory.\n\nTwo victories share this one date, and the tradition sees them as the same victory wearing two faces. In the Goddess\'s story, this is the dawn when **Durga** finally pins the shape-shifting buffalo demon. In the Ramayana, this is the day **Rama** kills **Ravana**, the ten-headed king of Lanka who stole his wife.\n\nThe northern name of the day comes from the second story. **Dussehra**, from dasha-hara, the destruction of the ten-headed one.\n\nNavratri\'s reader tells the Goddess\'s war. This one tells Rama\'s, and what a billion people do with its ending.',
        citationLink: 'festival:navratri-2025',
        citation: 'Vijayadashami as the shared victory day — Devi Mahatmya tradition and Ramayana tradition.',
        checks: [
          {
            id: 'chk:festival:dussehra:victory',
            kind: 'mcq',
            practice: true,
            prompt: 'Dussehra, or Vijayadashami, marks the tenth-day victory in which story?',
            options: [
              { text: 'Rama’s defeat of Ravana, the same tenth day the Goddess is said to have beaten Mahishasura', correct: true },
              { text: 'Krishna lifting Mount Govardhan' },
              { text: 'The churning of the cosmic ocean' },
            ],
            why: 'Vijayadashami is the shared victory day: Rama over Ravana, and Durga over Mahishasura, both falling on the tenth day after the nine nights.',
          },
        ],
      },
      {
        id: 'dussehra-lanka',
        title: 'The Last Day of the War',
        subtitle: 'Rama and Ravana on the Field of Lanka',
        storyText: 'The Valmiki Ramayana builds its final duel like a storm gathering.\n\nThe bridge has been crossed, the armies broken, Kumbhakarna and Meghnada fallen. At last **Ravana** himself rides out, and for a day the fight is even, because Ravana is no cartoon villain. He is a scholar of the Vedas, a devotee whose austerities once shook the gods, a king whose city is golden. That is the horror of him: so much greatness, bent entirely around its own wanting.\n\nRama\'s arrows cut down head after head, and the heads return. The ten heads will not stay severed, and the war cannot be won a head at a time.\n\nThen the charioteer sage Matali reminds Rama of the **Brahmastra**, the weapon given him by the sage Agastya. Rama looses it with the full focus of everything he is, and it takes Ravana not in the head but in the chest, in the heart of the wanting itself, and the ten-headed king falls. Later tellings, like Tulsidas\'s beloved Ramcharitmanas, aim the arrow at Ravana\'s navel, where his stolen immortality pooled. Every version agrees on the lesson: you do not defeat such an enemy by trimming his heads.',
        citation: 'Valmiki Ramayana, Yuddha Kanda, sargas 102–111; navel telling — Ramcharitmanas, later tradition.'
      },
      {
        id: 'dussehra-ramlila',
        title: 'Why the Effigy Burns Every Year',
        subtitle: 'Ramlila Grounds at Dusk',
        storyText: 'For weeks before Dussehra, in thousands of towns, the Ramayana is not read. It is **performed**.\n\nThe **Ramlila** is the epic staged by ordinary neighbors: the schoolteacher as Dasharatha, the wrestler as Hanuman, boys as the princes. UNESCO lists it among humanity\'s cultural treasures, and Varanasi\'s Ramnagar Ramlila runs a full month with the whole town as its stage. By the ninth night, everyone, performer and audience, has walked the exile again.\n\nThen, on Dussehra evening, the crowds gather on open grounds where three towering effigies stand: **Ravana** with his ten heads, flanked by his brother Kumbhakarna and son Meghnada, all packed with fireworks. The actor playing Rama looses a flaming arrow, and the ten-headed king goes up in a roar of fire and light.\n\nAnd next year they will build him again, and burn him again. That is not a failure of the ritual. It is the ritual\'s honest heart.',
        teachingText: 'A popular reading gives Ravana\'s ten heads names: lust, anger, greed, pride, envy, and their cousins. Take the reading or leave it; the burning teaches the same thing either way.\n\nEvil does not stay defeated. It regrows, in the world and in a person, which is why the arrow has to be loosed again every single year. The festival is not a monument to one old victory. It is scheduled practice.',
        citation: 'Ramlila — UNESCO Intangible Cultural Heritage (2008), documented tradition; ten-vices reading, popular tradition, labeled as such.',
        checks: [
          {
            id: 'chk:festival:dussehra:ten-heads',
            kind: 'mcq',
            practice: true,
            prompt: 'A popular reading says the ten heads of the burning Ravana effigy stand for what?',
            options: [
              { text: 'Ten faults every person carries, ego, greed, anger, lust and the rest, burned away each year', correct: true },
              { text: 'The ten kingdoms Ravana ruled' },
              { text: 'The ten days of the festival' },
            ],
            why: 'The effigy burns every year because those ten heads, read as ego, greed, anger and other vices, grow back in everyone. Burning Ravana is a yearly nudge to burn your own.',
          },
        ],
      },
      {
        id: 'dussehra-other-keepings',
        title: 'The Same Day, Kept Four Ways',
        subtitle: 'Weapons, Tools, First Letters, and Leaves of Gold',
        storyText: 'Travel the country on Vijayadashami and the day changes shape, while its meaning holds.\n\nThe Mahabharata adds the day\'s second great scene. The Pandavas, ending their year in disguise, return to the **shami tree** where they had hidden their weapons, take them back, and reveal themselves. Victory day is therefore also reclamation day: the day you take back what your hard years made you set down.',
        bullets: [
          '**Ayudha Puja** in the south: the tools of one\'s work, from lathes to laptops, cleaned, marked, and honored',
          '**Vidyarambham** in Kerala: small children write their first-ever letters, traced in rice, on the day of victory',
          '**Shami and apta leaves** exchanged as "gold" in Maharashtra, remembering the tree that kept the weapons safe',
          '**Mysore Dasara**: the old royal procession, elephants and lamps, a documented tradition of the Wodeyar court for four centuries'
        ],
        teachingText: 'Every version is the same sentence in a different dialect: the good fight has instruments, and today you honor yours.\n\nSo begin something today. The tradition holds Vijayadashami auspicious for first steps, first letters, first ventures, precisely because beginnings are the form victory takes in an ordinary life.',
        citation: 'Mahabharata, Virata Parva (tr. Ganguli) — the shami tree; regional observances, documented tradition.'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Yuddha Kanda, sargas 102–111 — the duel and Ravana\'s fall by the Brahmastra',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/',
      },
      {
        text: 'Mahabharata',
        locator: 'Virata Parva — the Pandavas reclaim their weapons from the shami tree on Vijayadashami',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Ramcharitmanas',
        locator: 'Tulsidas (16th c.) — the navel telling and the Ramlila tradition; named as devotional tradition',
      },
      {
        text: 'Documented history',
        locator: 'Ramlila inscribed by UNESCO (2008); Mysore Dasara of the Wodeyar court',
      },
      {
        text: 'Drik Panchang',
        locator: 'Vijayadashami dates 2025–2028 (Ashvina Shukla Dashami, Vijay Muhurat convention)',
      },
    ],
    mythology: [
      'Rama\'s defeat of the ten-headed Ravana',
      'The Pandavas\' weapons in the shami tree',
      'Durga\'s victory dawn, shared with this day'
    ],
    historicalContext: 'Ramlila traditions are documented across North India for centuries and recognized by UNESCO; the Mysore Dasara procession has run under royal patronage since the early 17th century. The day\'s auspiciousness for beginnings (seemollanghana, first ventures, first letters) is pan-Indian.',
    scriptureReferences: [
      {
        id: 'dussehra-yuddha-kanda',
        text: 'ramayana',
        section: 'Yuddha Kanda, sargas 102–111',
        relevance: 'The war\'s final duel: the regrowing heads, the Brahmastra, and the fall of Ravana'
      },
      {
        id: 'dussehra-virata-parva',
        text: 'mahabharata',
        section: 'Virata Parva',
        relevance: 'The weapons reclaimed from the shami tree — Vijayadashami as the day of taking back what exile made you set down'
      }
    ],
    regionalVariations: [
      {
        region: 'North India',
        localName: 'Dussehra',
        uniqueTraditions: ['Ramlila cycles ending in effigy burning', 'Fairs on the burning grounds'],
        specialFoods: ['Jalebi (by custom, Rama\'s favorite as "shashkuli")'],
        localCustoms: 'The effigy grounds fair, with the year\'s biggest crowds standing shoulder to shoulder for the arrow.'
      },
      {
        region: 'Karnataka (Mysore)',
        localName: 'Dasara / Nadahabba',
        uniqueTraditions: ['The illuminated palace', 'The Jamboo Savari elephant procession with the goddess Chamundeshwari'],
        specialFoods: ['Mysore pak'],
        localCustoms: 'The state festival of Karnataka: the goddess rides a golden howdah through the city her hill overlooks.'
      },
      {
        region: 'Kerala',
        localName: 'Vidyarambham',
        uniqueTraditions: ['Children initiated into letters, tracing the first aksharas in rice'],
        specialFoods: ['Payasam'],
        localCustoms: 'Writers, teachers, and grandparents guide thousands of small hands through their first letters on victory day.'
      },
      {
        region: 'Himachal (Kullu)',
        localName: 'Kullu Dussehra',
        uniqueTraditions: ['The festival begins when others end: a week of village deities processing to meet Raghunath'],
        specialFoods: ['Siddu and mountain fare'],
        localCustoms: 'Hundreds of local deities travel by palanquin to the valley floor — the epic\'s victory kept as a gathering of gods.'
      }
    ],
    modernAdaptations: [
      'Eco-effigies and reduced-firework burnings',
      'Office Ayudha Puja for servers, code, and instruments',
      'Ramlila streamed for diaspora audiences'
    ],
    familyActivities: [
      {
        id: 'dussehra-name-the-head',
        title: 'Name One Head',
        description: 'Before watching an effigy burn (in person or on screen), each family member privately names one habit they are burning this year — and one thing they are reclaiming from the shami tree.',
        ageGroup: 'all_ages',
        duration: '15 minutes',
        materials: ['Paper slips', 'A bowl'],
        instructions: [
          'Each person writes one "head" to burn and folds it into the bowl; no reading aloud required',
          'Each person also names, out loud, one set-down thing they are taking back: an instrument, a friendship, a practice',
          'Burn or discard the slips together when the effigy goes up'
        ],
        learningObjective: 'The festival\'s two scenes made personal: what regrows must be fought yearly, and what was set down can be taken back'
      }
    ],
    culturalImpact: 'Dussehra turns moral struggle into civic theater: an entire society rehearses, every single year, that evil regrows and must be re-defeated, and that the day of victory is the right day to begin.',
    relatedFestivals: ['navratri-2025', 'ram-navami-2025', 'diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/dussehra-cover.png'),
  },
  {
    id: 'karva-chauth-2025',
    name: 'Karwa Chauth',
    sanskritName: 'करवा चौथ',
    date: '2025-10-10',
    occurrences: ['2025-10-10', '2026-10-29', '2027-10-18', '2028-10-07'], // Kartika Krishna Chaturthi; verified vs Drik Panchang (New Delhi), Jul 2026
    emoji: '🌙',
    dateType: 'lunar',
    type: 'fast',
    significance: 'The day-long fast broken only by moonrise, kept for a spouse\'s long life',
    description: 'Rooftops at dusk, a sieve raised to the sky, and a marriage given one day of complete attention',
    traditions: [
      'Nirjala fast from sunrise to moonrise',
      'Sargi (the pre-dawn meal from the mother-in-law)',
      'The evening katha circle with karwa pots',
      'Viewing the moon, then the spouse, through a sieve',
      'Mehndi and bridal dress for the day'
    ],
    prayers: [
      'The Karwa Chauth vrat katha',
      'Gauri-Ganesh puja before the katha'
    ],
    foods: [
      'Sargi: fruits, feni, sweets before dawn',
      'The fast itself through the day',
      'The first sip of water at moonrise',
      'A full family dinner after'
    ],
    colors: ['Bridal red', 'Maroon', 'Gold'],
    deity: 'Parvati (Gauri) and Chauth Mata',
    duration: 1,
    region: 'North and Northwest India',
    importance: 'major',
    rituals: [
      {
        id: 'karva-chauth-moonrise',
        name: 'The Moonrise',
        description: 'The fast\'s famous final scene: the moon sighted through a sieve, the spouse seen through the same sieve, and the first water in a day.',
        timeOfDay: 'night',
        materials: ['A sieve (chalni)', 'A diya placed in the sieve', 'A karwa (small clay pot) of water', 'A plate with a sweet'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'When the moon is sighted, go to the roof or courtyard with the thali; place the lit diya in the sieve.',
            explanation: 'Moonrise on Chaturthi is late and often maddeningly cloud-hidden; the shared waiting is part of the ritual\'s memory.'
          },
          {
            stepNumber: 2,
            instruction: 'View the moon through the sieve, offer water from the karwa toward it, and pray.',
            explanation: 'The sieve softens the moon\'s brightness through a hundred small windows; the custom\'s meaning is explained many ways, and honestly, no single official one exists.'
          },
          {
            stepNumber: 3,
            instruction: 'Turn and view your spouse through the same sieve.',
            explanation: 'The fast\'s quiet climax: the person prayed for, seen in the same frame as the moon just prayed to.'
          },
          {
            stepNumber: 4,
            instruction: 'The spouse offers the first sip of water and the first bite, and the fast ends.',
            explanation: 'The day of abstaining closes with being fed by the very person it was kept for.'
          }
        ],
        significance: 'The moonrise ritual compresses the whole vrat into one image: devotion held all day, released only when the sky itself signs off.',
        tips: ['Many couples now keep the fast for each other, both abstaining and both breaking it together', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Spending the wait scanning the sky alone; the katha circle and the rooftop crowd are the festival']
      }
    ],
    fullStory: 'Karwa Chauth falls on the fourth day of Kartika\'s dark fortnight, eleven days before Diwali. Married women, dressed in bridal finery, keep a fast without food or water from sunrise until the moon rises, for the long life of their husbands. The day is named for its two instruments: the karwa, a small clay pot, and chauth, the fourth. Its evening katha tells of Veervati, whose fast was broken by a trick and whose steadfastness won her husband\'s life back; its rooftop climax, moon and spouse seen through the same sieve, is one of the most photographed moments in Hindu domestic life. Increasingly, couples keep the fast for each other.',
    sections: [
      {
        id: 'karva-chauth-rooftops',
        title: 'Waiting for the Moon',
        subtitle: 'Dusk, a Rooftop, a Sieve',
        storyText: 'On one October evening a year, the rooftops of North India fill with women in bridal red, holding sieves, watching the horizon.\n\nThey have not eaten since before sunrise. Most have not taken water. This is **Karwa Chauth**, the fourth day of Kartika\'s dark fortnight, and the fast, among the strictest in the Hindu year, is kept by married women for one stated purpose: the long life of their husbands.\n\nThe name is domestic on purpose. A **karwa** is a small clay water pot, the kind every old kitchen held. **Chauth** just means the fourth. No cosmic vocabulary, because the festival\'s subject is not the cosmos. It is a marriage.\n\nThe fast ends only when the moon rises, and Chaturthi moons rise late. So the day builds toward the year\'s most patient hour: everyone on the roof, hungry and laughing, scanning the clouds for a rim of silver.',
        citation: 'Karwa Chauth vrat — North Indian tradition; the fast\'s form is folk practice, stated as such.'
      },
      {
        id: 'karva-chauth-veervati',
        title: 'The Story Told at the Fast',
        subtitle: 'Veervati and the False Moon',
        storyText: 'Every vrat, every ritual fast, carries a story that is retold while it is kept. Karwa Chauth\'s is the katha of **Veervati**.\n\nVeervati, the only sister of seven brothers, keeps her first Karwa Chauth at her parents\' home. By late afternoon she is faint with thirst, and her brothers cannot bear to watch. So they stage a mercy: one climbs a distant tree with a lamp and a sieve, and they tell her the moon has risen. She breaks her fast.\n\nWith the first bite, word arrives that her husband is dead.\n\nThe rest of the katha is her refusal to accept it. In the telling most families use, she keeps vigil by his body for a year of fourth-days, fasting each one fully, until the goddess **Parvati** is moved and restores his life. Other tellings bring Yama, the death god, into the negotiation, as with Savitri of the Mahabharata, the scriptural grandmother of every wife-versus-death story.\n\nSay it plainly, as the katha tradition itself would: this is a folk story, not scripture. It is told because it teaches the vrat\'s one rule about devotion: kept fully, it holds; interrupted kindly, it breaks.',
        citation: 'Karwa Chauth vrat katha — folk tradition, labeled as such; Savitri and Yama — Mahabharata, Vana Parva (tr. Ganguli).'
      },
      {
        id: 'karva-chauth-day',
        title: 'How the Day Runs',
        subtitle: 'From Sargi to the Sieve',
        storyText: 'The fast has an architecture, and it begins in the dark.\n\nBefore dawn comes **sargi**: a meal of fruits, sweets, and feni sent by the mother-in-law, eaten before the first light. The gesture matters more than the menu. The fast for her son opens with the older woman feeding the younger one.\n\nThrough the day, life continues, work, errands, children, carried on without food or water. By afternoon the women gather for the **katha circle**: dressed in wedding finery, mehndi on their hands, karwa pots exchanged in a circle as the Veervati story is told aloud.\n\nThen the rooftop, the sighted moon, the offered water, and the sieve: the moon viewed through it, and then the husband viewed through the same sieve, prayed-for and moonlit in one frame. He offers her the first water and the first bite, and the day ends with the household eating together.',
        citation: 'Sargi, katha circle, and moonrise sequence — festival practice, labeled as tradition.'
      },
      {
        id: 'karva-chauth-now',
        title: 'One Day of Complete Attention',
        subtitle: 'What the Fast Means Now',
        storyText: 'Karwa Chauth sits in the middle of a live conversation, and honesty requires saying so.\n\nSome see in it an asymmetry: why does she fast for him? Others answer from inside the practice: because it is hers, chosen, and no one else\'s to grade. Both voices exist within Hindu households, and the tradition, being plural, holds them both.\n\nMeanwhile the practice itself has been quietly rewriting the script. In many homes the husband now fasts too, the two of them hungry together and breaking the fast face to face. Unmarried women keep it for intended partners. The Bollywood rooftop scene made the festival famous far beyond the northwest, and diaspora couples time video calls to two different moonrises.\n\nUnder all the change, the vrat\'s core has not moved. For one day, a marriage, the thing most easily taken for granted in a busy life, is the object of complete, deliberate, hungry attention.',
        teachingText: 'Whether or not you ever keep this fast, it asks a portable question. What would it look like to give your most important relationship one full day of undivided attention a year, on the calendar, non-negotiable?\n\nThe moon rises either way. The attention is the offering.',
        citation: 'Contemporary practice — described as such; the plurality of views stated per the tradition\'s own diversity.'
      }
    ],
    sources: [
      {
        text: 'Karwa Chauth vrat katha',
        locator: 'The Veervati katha and its variants — folk vrat tradition, told at the fast itself; labeled as tradition, not scripture',
      },
      {
        text: 'Mahabharata',
        locator: 'Vana Parva (the Savitri-Satyavan episode) — the scriptural archetype of the wife\'s vigil against death',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Drik Panchang',
        locator: 'Karwa Chauth dates 2025–2028 (Kartika Krishna Chaturthi, moonrise-dependent)',
      },
    ],
    mythology: [
      'Veervati and the false moon',
      'Karwa, who bound a crocodile with cotton thread and argued with Yama for her husband\'s life',
      'Savitri, the archetype who followed Death and won'
    ],
    historicalContext: 'A northwest-Indian vrat tradition (Punjab, Haryana, Rajasthan, UP) that cinema carried to pan-Indian and diaspora prominence in the 1990s; its practice is visibly evolving toward mutual fasting.',
    scriptureReferences: [
      {
        id: 'karva-chauth-savitri',
        text: 'mahabharata',
        section: 'Vana Parva — the Savitri episode',
        relevance: 'The epic ancestor of the vrat: a wife\'s single-pointed devotion contested with Death himself, and winning'
      }
    ],
    regionalVariations: [
      {
        region: 'Punjab',
        localName: 'Karwa Chauth',
        uniqueTraditions: ['Sargi from the mother-in-law', 'Baya gifts sent to the daughter\'s home'],
        specialFoods: ['Feni and seviyan at sargi'],
        localCustoms: 'The fullest form of the festival, with the sargi and katha circle at its heart.'
      },
      {
        region: 'Rajasthan',
        localName: 'Karwa Chauth',
        uniqueTraditions: ['Elaborate karwa pots exchanged seven times in the katha circle'],
        specialFoods: ['Ghevar'],
        localCustoms: 'The katha circle\'s pot exchange is at its most formal, with the story punctuated by the passing karwas.'
      }
    ],
    modernAdaptations: [
      'Couples fasting for each other',
      'Moonrise apps and video-call moon sightings across time zones',
      'Karwa Chauth mehndi evenings as community events'
    ],
    familyActivities: [
      {
        id: 'karva-chauth-attention',
        title: 'The Attention Hour',
        description: 'While the fast waits for the moon, the couple answers three questions in writing and swaps: what I most value in you this year, what I most miss, what I want us to build next year.',
        ageGroup: 'adults',
        duration: '1 hour',
        materials: ['Two pens, two cards'],
        instructions: [
          'Write the three answers separately, without discussing',
          'Exchange at moonrise, after the fast is broken',
          'Keep the cards with the karwa for next year\'s comparison'
        ],
        learningObjective: 'The fast\'s modern core, made explicit: scheduled, undivided attention to the relationship itself'
      }
    ],
    culturalImpact: 'Karwa Chauth gives a marriage an annual day of deliberate attention, and its evolving practice — from one spouse fasting to both — is Hindu tradition adapting in real time while keeping its center.',
    relatedFestivals: ['diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'), // TODO cover shopping list: karva-chauth-cover.png
  },
  {
    id: 'diwali-2025',
    name: 'Diwali',
    sanskritName: 'दीपावली',
    date: '2025-10-20',
    occurrences: ['2025-10-20', '2026-11-08', '2027-10-29', '2028-10-17'], // verified vs Drik Panchang, Jul 2026
    emoji: '🪔',
    dateType: 'lunar',
    type: 'spiritual',
    significance: 'Festival of lights representing the victory of light over darkness, good over evil, and knowledge over ignorance',
    description: 'The most celebrated Hindu festival, known as the Festival of Lights, marking the return of Lord Rama to Ayodhya after 14 years of exile',
    fullStory: 'Diwali, derived from "Deepavali" meaning "row of lights," is celebrated over five days, each with its own significance. The festival commemorates multiple legends: Lord Rama\'s return to Ayodhya after defeating Ravana, Lord Krishna\'s victory over the demon Narakasura, and Goddess Lakshmi\'s emergence from the ocean of milk. The lighting of diyas (oil lamps) symbolizes the inner light that protects us from spiritual darkness. This festival transcends religious boundaries and is celebrated with great enthusiasm across India and the world.',
    sections: [
      {
        id: 'diwali-darkest-night',
        title: 'Lamps on the Darkest Night',
        subtitle: 'A Single Diya Multiplied into Ten Thousand',
        storyText: '**Deepavali** — "a row of lamps" — falls, by design, on **Amavasya**: the new-moon night of Kartika, the darkest night of one of the year\'s darkest months.\n\nThe festival\'s founding gesture is **defiance rendered in clay and ghee**: precisely when the sky gives no light, every threshold, window, and rooftop answers with its own. One diya is a flame; a row of diyas is a philosophy.\n\nThe Upanishads had already given the night its prayer: **tamaso mā jyotir gamaya** — "from darkness, lead me to light." Diwali is that verse, performed by a billion hands.',
        citation: 'Brihadaranyaka Upanishad 1.3.28 (tr. Max Müller).'
      },
      {
        id: 'diwali-return',
        title: 'The Return of the King',
        subtitle: 'Ayodhya Lit End to End for a Homecoming',
        storyText: 'The most beloved of Diwali\'s stories is **a homecoming**.\n\nFourteen years of exile — the forest, the abduction of Sita, the bridge to Lanka, the war, Ravana\'s fall — and then, at last, the flight home. Tradition holds that Rama, Sita, and Lakshmana returned to Ayodhya on the new-moon night of Kartika, and the city, refusing to let its king come home in darkness, **lit every street and sill with rows of lamps**.\n\nThe diyas of every Diwali since are Ayodhya\'s welcome, renewed: light kept burning for the good that is on its way back.',
        teachingText: 'Everyone has an exile running — a person, a hope, a version of themselves that has been fourteen years in the forest.\n\nAyodhya\'s posture is the teaching: **prepare the welcome before the return is visible.** Light the lamp for what you are still waiting for; the lamp is how the waiting stays alive.',
        citationLink: 'deity:rama',
        citation: 'Valmiki Ramayana, Yuddha Kanda; the lamplit return: living tradition.',
        checks: [
          {
            id: 'chk:festival:diwali:homecoming',
            kind: 'mcq',
            practice: true,
            prompt: 'Diwali’s rows of lamps most famously trace back to which homecoming?',
            options: [
              { text: 'Rama returning to Ayodhya after fourteen years of exile, the city lighting every street to welcome him', correct: true },
              { text: 'Krishna returning to Vrindavan after defeating Kamsa' },
              { text: 'The gods returning to heaven after the churning of the ocean' },
            ],
            why: 'Tradition holds that Ayodhya lit rows of lamps to guide Rama, Sita, and Lakshmana home on the new-moon night. Every Diwali since renews that welcome.',
          },
        ],
      },
      {
        id: 'diwali-lakshmi',
        title: 'Inviting the Goddess of Abundance',
        subtitle: 'A Doorway Rangoli, Small Footprints Walking In',
        storyText: 'On the main night, homes across India perform **Lakshmi Puja** — for the goddess of wealth and well-being who, the Puranas tell, emerged radiant from the churning of the cosmic ocean.\n\nDoorways are washed and painted with rangoli; tiny footprints are stenciled walking inward; windows glow; account books open to new pages. The theology of the customs is precise: Lakshmi visits homes that are clean, lit, and harmonious — **abundance is invited, not seized**.\n\nThe same churning that yielded poison first (Shiva\'s story) yields the goddess later: prosperity, the sequence says, comes to those who stayed through the difficult part.',
        teachingText: 'The customs are a checklist worth taking literally once a year: clear the clutter, settle the quarrels, light the entrance, open a fresh page.\n\nWhether or not the goddess walks in, the household that did those four things has already prospered. **Lakshmi\'s footprints point inward — abundance is a direction, not an amount.**',
        citationLink: 'deity:lakshmi',
        citation: 'Lakshmi from the churning: Vishnu Purana 1.9; Diwali Lakshmi Puja: living tradition.',
        checks: [
          {
            id: 'chk:festival:diwali:lakshmi',
            kind: 'mcq',
            practice: true,
            prompt: 'Families clean and light the whole house before Lakshmi Puja. What idea is that custom built on?',
            options: [
              { text: 'Abundance is invited, not seized, Lakshmi enters a home that is clean, lit, and harmonious', correct: true },
              { text: 'The brighter your house, the more money you are guaranteed' },
              { text: 'Lakshmi only visits temples, never homes' },
            ],
            why: 'The customs say it precisely: Lakshmi visits homes that are clean, lit, and settled. So the household clears clutter, ends quarrels, and opens a fresh page, abundance is invited, not grabbed.',
          },
        ],
      },
      {
        id: 'diwali-five-days',
        title: 'Five Days, One Arc',
        subtitle: 'A Festival Shaped like a Complete Life',
        storyText: 'Diwali is not a night but **an arc of five days**:',
        bullets: [
          '**Dhanteras** — honoring health, and the wealth that serves it.',
          '**Naraka Chaturdashi** — Krishna slays the demon Narakasura at dawn and sixteen thousand captives walk free; evil ended, dawn baths taken in celebration.',
          '**Lakshmi Puja** — on the dark moon itself, the goddess invited into the lit and readied home.',
          '**Govardhan Puja** — remembering Krishna lifting the mountain to shelter his village.',
          '**Bhai Dooj** — sisters and brothers blessing one another to close the arc.'
        ],
        teachingText: 'Health, liberation, abundance, protection, family — the five days are **a complete curriculum of what a lit life contains**, and the arc\'s order is its wisdom: health before wealth, freeing what is captive before inviting abundance, gratitude and family as the closing note.\n\nUse the five days as an annual audit — one evening per theme — and Diwali becomes less a party than a yearly re-consecration of everything the lamps stand for.',
        citationLink: 'deity:krishna',
        citation: 'Narakasura: Bhagavata Purana, Canto 10, Chapter 59; Govardhan: Canto 10, Chapters 24–25; the five-day arc: living tradition.'
      }
    ],
    reflectionQuestions: [
      'Diwali is a homecoming — the lamps are lit for someone returning. Who, or what, are you hoping comes home to you this year?',
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Yuddha Kanda (Ravana\'s fall and the return to Ayodhya); the lamp-lit welcome is tradition built on this return',
        translation: 'valmikiramayan.net (public)',
      },
      {
        text: 'Brihadaranyaka Upanishad',
        locator: '1.3.28 (tamaso mā jyotir gamaya — from darkness, lead me to light)',
        translation: 'standard public-domain rendering',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 10, chapter 59 (Narakasura); Canto 8 (Lakshmi from the churning); Canto 10, chapters 24–25 (Govardhan)',
        translation: 'cross-checked against public translations',
      },
    ],
    mythology: [
      'Return of Lord Rama to Ayodhya: After 14 years of exile and victory over Ravana, the people of Ayodhya lit oil lamps to welcome their beloved king',
      'Victory over Narakasura: Lord Krishna defeated the demon king Narakasura, freeing 16,000 captive princesses and bringing peace to the world',
      'Emergence of Lakshmi: During the churning of the cosmic ocean, Goddess Lakshmi emerged on this auspicious day, bringing wealth and prosperity',
      'Govardhan Puja: Lord Krishna lifted Mount Govardhan to protect villagers from Indra\'s wrath, celebrated on the fourth day of Diwali'
    ],
    historicalContext: 'Diwali has been celebrated for over 2,500 years, with mentions in ancient Sanskrit texts. Archaeological evidence shows the festival was celebrated during the Gupta period. The tradition spread globally through Indian diaspora and is now celebrated in over 40 countries as a festival of universal values like hope, peace, and prosperity.',
    traditions: [
      'Lighting diyas (clay oil lamps) and candles throughout homes',
      'Creating intricate rangoli patterns at entrances',
      'Performing Lakshmi Puja for wealth and prosperity',
      'Bursting fireworks and celebrating with family',
      'Exchanging gifts and sweets with loved ones',
      'Deep cleaning and decorating homes',
      'Wearing new clothes and jewelry',
      'Gambling (as it\'s considered auspicious)'
    ],
    prayers: [
      'Lakshmi Puja mantras',
      'Ganesha invocation',
      'Diwali Aarti',
      'Prosperity prayers'
    ],
    foods: [
      'Mithai (assorted Indian sweets)',
      'Dry fruits and nuts',
      'Chakli and murukku',
      'Karanji and gujiya',
      'Soan papdi',
      'Ladoos',
      'Barfi varieties'
    ],
    colors: ['Gold', 'Red', 'Yellow', 'Orange', 'Deep Purple'],
    deity: 'Goddess Lakshmi (wealth), Lord Ganesha (wisdom)',
    scriptureReferences: [
      {
        id: 'ramayana-return',
        text: 'ramayana',
        section: 'Yuddha Kanda',
        relevance: 'Describes Rama\'s victorious return to Ayodhya and the celebration with lights',
        quote: 'The city of Ayodhya was illuminated with countless lamps welcoming their beloved king'
      },
      {
        id: 'bg-light-darkness',
        text: 'bhagavad_gita',
        chapter: 14,
        verse: 11,
        relevance: 'Krishna speaks about the qualities of light (sattva) overcoming darkness (tamas)',
        quote: 'When the light of knowledge shines through all the gates of the body, then one should know that sattva is predominant'
      }
    ],
    duration: 5,
    region: 'Pan-India and Global',
    regionalVariations: [
      {
        region: 'North India',
        localName: 'Diwali',
        uniqueTraditions: ['Rama\'s return celebration', 'Gambling traditions', 'Fireworks displays'],
        specialFoods: ['Gujiya', 'Mathri', 'Aloo Tikki'],
        localCustoms: 'Five-day celebration with each day having specific significance'
      },
      {
        region: 'Bengal',
        localName: 'Kali Puja',
        uniqueTraditions: ['Goddess Kali worship', 'Cultural programs', 'Community celebrations'],
        specialFoods: ['Kheer', 'Luchi', 'Fish curry'],
        localCustoms: 'Coincides with Diwali but focuses on Goddess Kali worship'
      },
      {
        region: 'South India',
        localName: 'Deepavali',
        uniqueTraditions: ['Oil bath at dawn', 'New clothes', 'Visiting temples'],
        specialFoods: ['Murukku', 'Mysore Pak', 'Payasam'],
        localCustoms: 'Celebrations begin at 4 AM with oil bath and prayers'
      },
      {
        region: 'Gujarat',
        localName: 'Chopada Puja',
        uniqueTraditions: ['Business account book worship', 'Gujarati thali', 'Community celebrations'],
        specialFoods: ['Dhokla', 'Khandvi', 'Gujarati sweets'],
        localCustoms: 'New Year celebration for business community'
      }
    ],
    importance: 'major',
    rituals: [
      {
        id: 'lakshmi-puja',
        name: 'Lakshmi Puja (Wealth Worship)',
        description: 'Main ritual of Diwali invoking Goddess Lakshmi for prosperity',
        timeOfDay: 'evening',
        materials: ['Lakshmi idol/image', 'Gold coins', 'Red cloth', 'Lotus flowers', 'Ghee diyas', 'Incense', 'Sweets'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Clean and decorate the puja area with rangoli',
            explanation: 'Create a sacred space to welcome the goddess',
            tips: ['Use rice flour and colored powders', 'Make lotus patterns']
          },
          {
            stepNumber: 2,
            instruction: 'Place Lakshmi idol on red cloth with gold coins',
            explanation: 'Red symbolizes prosperity, gold represents wealth',
            tips: ['Face the idol towards the entrance', 'Arrange coins in a pattern']
          },
          {
            stepNumber: 3,
            instruction: 'Light ghee diyas and offer lotus flowers',
            explanation: 'Light attracts positive energy, lotus is Lakshmi\'s favorite',
            tips: ['Use pure ghee for best results', 'Arrange diyas in odd numbers']
          },
          {
            stepNumber: 4,
            instruction: 'Chant Lakshmi mantras and perform aarti',
            explanation: 'Sacred sounds invoke divine presence',
            tips: ['Sing with devotion', 'Use brass or copper aarti plate']
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ श्री लक्ष्म्यै नमः',
            transliteration: 'Om Shri Lakshmyai Namah',
            meaning: 'Salutations to Goddess Lakshmi',
            pronunciation: 'ohm-shree-laksh-my-ai-na-mah'
          },
          {
            sanskrit: 'या लक्ष्मीर्या च विद्या या शान्ता या क्षमा',
            transliteration: 'Ya Lakshmirya Cha Vidya Ya Shanta Ya Kshama',
            meaning: 'She who is wealth, knowledge, peace, and forgiveness',
            pronunciation: 'ya-laksh-meer-ya-cha-vid-ya-ya-shaan-ta-ya-ksha-ma'
          }
        ],
        significance: 'Invites prosperity, removes financial obstacles, and brings abundance',
        tips: ['Perform after sunset', 'Keep the puja area lit all night', 'Offer favorite sweets'],
        commonMistakes: ['Using artificial flowers', 'Incomplete rangoli', 'Not keeping area clean']
      }
    ],
    starterPack: {
      id: 'diwali-celebration-kit',
      title: 'Complete Diwali Celebration Kit',
      description: 'Transform your home into a festival of lights with authentic traditional items',
      difficulty: 'intermediate',
      estimatedCost: '$85-120',
      timeRequired: '2 days preparation, 5 days celebration',
      essentialItems: [
        {
          id: 'diyas-set',
          name: 'Handcrafted Clay Diyas (50 pieces)',
          description: 'Traditional earthen oil lamps made by skilled potters',
          culturalSignificance: 'Clay diyas represent the earth element and create positive energy when lit with mustard oil',
          price: 35,
          currency: 'USD',
          imageUrl: '/images/products/clay-diyas-set.jpg',
          vendor: {
            id: 'potter-collective',
            name: 'Artisan Potter Collective',
            story: 'Traditional potters from Uttar Pradesh keeping alive 500-year-old craft',
            location: 'Khurja, Uttar Pradesh',
            specialization: 'Handmade clay diyas and pottery',
            yearsOfExperience: 30,
            artisanStory: 'Five generations of potters creating beautiful diyas using traditional wheel techniques',
            businessEthos: 'Preserving traditional pottery while providing sustainable livelihoods',
            sustainabilityPractices: ['Natural clay from local sources', 'Wood-fired kilns', 'Zero waste production']
          },
          category: 'ritual_items',
          materials: ['Natural clay', 'Traditional glazing'],
          dimensions: '2.5" diameter each',
          weight: '5 lbs total',
          isEssential: true
        },
        {
          id: 'lakshmi-puja-set',
          name: 'Complete Lakshmi Puja Kit',
          description: 'Everything needed for traditional wealth worship ritual',
          culturalSignificance: 'Lakshmi puja brings prosperity and removes financial obstacles from life',
          price: 45,
          currency: 'USD',
          imageUrl: '/images/products/lakshmi-puja-kit.jpg',
          vendor: {
            id: 'spiritual-essentials',
            name: 'Sacred Ritual Essentials',
            story: 'Temple suppliers curating authentic puja items for 40+ years',
            location: 'Varanasi, Uttar Pradesh',
            specialization: 'Complete puja kits and spiritual items',
            yearsOfExperience: 40,
            artisanStory: 'Family business serving major temples and devotees with pure, consecrated items',
            businessEthos: 'Maintaining purity and authenticity in all spiritual products',
            sustainabilityPractices: ['Eco-friendly packaging', 'Natural ingredients only', 'Fair trade practices']
          },
          category: 'ritual_items',
          materials: ['Brass items', 'Pure ghee', 'Organic flowers', 'Natural incense'],
          isEssential: true
        },
        {
          id: 'rangoli-kit',
          name: 'Traditional Rangoli Design Kit',
          description: 'Natural colored powders and stencils for beautiful floor art',
          culturalSignificance: 'Rangoli welcomes prosperity and creates positive vibrations at the entrance',
          price: 25,
          currency: 'USD',
          imageUrl: '/images/products/rangoli-kit.jpg',
          vendor: {
            id: 'natural-colors',
            name: 'Natural Colors Co.',
            story: 'Producing organic rangoli colors from flowers and minerals',
            location: 'Rajasthan, India',
            specialization: 'Natural color powders and art supplies',
            yearsOfExperience: 20,
            artisanStory: 'Creating vibrant colors using traditional methods passed down through generations',
            businessEthos: 'Promoting eco-friendly art while supporting rural artisans',
            sustainabilityPractices: ['Plant-based dyes', 'Biodegradable materials', 'Chemical-free production']
          },
          category: 'art',
          materials: ['Natural color powders', 'Reusable stencils', 'Instruction booklet'],
          isEssential: true
        }
      ],
      optionalItems: [
        {
          id: 'premium-sweets-box',
          name: 'Artisan Diwali Sweets Collection',
          description: 'Assorted traditional Indian sweets made by master halwais',
          culturalSignificance: 'Sharing sweets spreads joy and strengthens relationships',
          price: 40,
          currency: 'USD',
          imageUrl: '/images/products/diwali-sweets.jpg',
          vendor: {
            id: 'heritage-sweets',
            name: 'Heritage Sweet Makers',
            story: '100-year-old sweet shop famous for traditional recipes',
            location: 'Delhi, India',
            specialization: 'Traditional Indian sweets and mithai',
            yearsOfExperience: 100,
            artisanStory: 'Four generations perfecting secret family recipes for authentic flavors',
            businessEthos: 'Maintaining taste traditions while ensuring quality and hygiene',
            sustainabilityPractices: ['Pure ghee and milk', 'Minimal preservatives', 'Traditional packaging']
          },
          category: 'food_ingredients',
          isEssential: false
        }
      ],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Dhanteras Preparation (Day 1)',
          description: 'Begin Diwali celebrations by purchasing gold/silver and cleaning home',
          timeOfDay: 'Morning onwards',
          duration: 'Full day',
          materialsNeeded: ['Cleaning supplies', 'Gold/silver item', 'Diyas'],
          detailedInstructions: [
            'Deep clean entire house from top to bottom',
            'Purchase gold, silver or new utensils (auspicious)',
            'Light 13 diyas in evening to ward off negativity',
            'Perform small puja to welcome prosperity'
          ],
          culturalContext: 'Dhanteras marks the beginning of Diwali and is dedicated to wealth',
          tips: ['Buy even small silver coins if budget is tight', 'Clean storage areas thoroughly'],
          imageUrl: '/images/guides/dhanteras-prep.jpg'
        },
        {
          stepNumber: 2,
          title: 'Naraka Chaturdashi (Day 2)',
          description: 'Take early morning oil bath and prepare for main celebrations',
          timeOfDay: '4:00-6:00 AM',
          duration: '2 hours',
          materialsNeeded: ['Sesame oil', 'Ubtan paste', 'New clothes'],
          detailedInstructions: [
            'Wake up before sunrise for oil massage',
            'Take ritual bath with sesame oil and herbs',
            'Wear new or special clothes',
            'Light diyas and burst small fireworks',
            'Share sweets with neighbors'
          ],
          culturalContext: 'Celebrates Krishna\'s victory over demon Narakasura',
          tips: ['Use warm oil for massage', 'Keep celebrations eco-friendly'],
          imageUrl: '/images/guides/naraka-chaturdashi.jpg'
        },
        {
          stepNumber: 3,
          title: 'Main Diwali Lakshmi Puja (Day 3)',
          description: 'The principal day of Diwali with elaborate Lakshmi worship',
          timeOfDay: '6:00-9:00 PM',
          duration: '3 hours',
          materialsNeeded: ['Complete puja kit', 'Diyas', 'Rangoli materials', 'Sweets'],
          detailedInstructions: [
            'Create elaborate rangoli at entrance',
            'Set up Lakshmi puja altar with gold coins',
            'Light diyas throughout the house',
            'Perform detailed Lakshmi puja with family',
            'Distribute sweets and exchange gifts',
            'Burst fireworks (eco-friendly options)'
          ],
          culturalContext: 'Main day when Lakshmi visits clean, well-lit homes',
          tips: ['Keep all lights on throughout night', 'Open doors and windows'],
          imageUrl: '/images/guides/lakshmi-puja.jpg'
        },
        {
          stepNumber: 4,
          title: 'Govardhan Puja (Day 4)',
          description: 'Honor Lord Krishna and nature\'s abundance',
          timeOfDay: 'Morning',
          duration: '2 hours',
          materialsNeeded: ['Food items', 'Cow dung (optional)', 'Flowers'],
          detailedInstructions: [
            'Create small Govardhan hill replica',
            'Offer 56 different food items (Chhappan Bhog)',
            'Worship cows and nature',
            'Share community meals',
            'Tell stories of Krishna lifting Govardhan'
          ],
          culturalContext: 'Celebrates Krishna\'s protection of villagers from Indra\'s wrath',
          tips: ['Use clay instead of cow dung in urban areas', 'Focus on gratitude to nature'],
          imageUrl: '/images/guides/govardhan-puja.jpg'
        },
        {
          stepNumber: 5,
          title: 'Bhai Dooj (Day 5)',
          description: 'Celebrate sibling bond with special rituals and gifts',
          timeOfDay: 'Morning',
          duration: '1 hour',
          materialsNeeded: ['Tilaka materials', 'Sweets', 'Gifts'],
          detailedInstructions: [
            'Sisters apply tilaka on brothers\' foreheads',
            'Pray for brothers\' long life and prosperity',
            'Exchange gifts and sweets',
            'Share festive meal together',
            'Brothers promise to protect sisters'
          ],
          culturalContext: 'Similar to Raksha Bandhan but celebrates protective bond',
          tips: ['Include all siblings, not just biological ones', 'Make it inclusive celebration'],
          imageUrl: '/images/guides/bhai-dooj.jpg'
        }
      ],
      tips: [
        'Start shopping for items 2 weeks before Diwali',
        'Plan meals and invite relatives in advance',
        'Use eco-friendly fireworks to protect environment',
        'Involve children in rangoli making and decoration',
        'Take photos to preserve family memories',
        'Donate to charity to share prosperity'
      ],
      safetyNotes: [
        'Keep fire extinguisher handy when lighting diyas',
        'Supervise children around fireworks',
        'Use LED lights mixed with diyas for safety',
        'Keep pathways well-lit to prevent accidents',
        'Store oil and ghee away from heat sources'
      ]
    },
    heroImageUrl: require('../../assets/images/covers/diwali-cover.png'),
    galleryImages: [
      '/images/festivals/diwali-diyas.jpg',
      '/images/festivals/rangoli-designs.jpg',
      '/images/festivals/lakshmi-puja.jpg',
      '/images/festivals/fireworks-celebration.jpg',
      '/images/festivals/sweets-exchange.jpg'
    ],
    audioUrl: '/audio/diwali-pronunciation.mp3',
    modernAdaptations: [
      'LED diyas for apartment living',
      'Digital rangoli designs using apps',
      'Eco-friendly fireworks and light shows',
      'Virtual family celebrations via video calls',
      'Online puja services for busy professionals',
      'Diwali-themed corporate events and team building'
    ],
    familyActivities: [
      {
        id: 'diya-painting',
        title: 'Diya Decoration Workshop',
        description: 'Let children paint and decorate clay diyas with colors and glitter',
        ageGroup: 'children',
        duration: '2 hours',
        materials: ['Plain clay diyas', 'Acrylic paints', 'Brushes', 'Glitter', 'Varnish'],
        instructions: [
          'Give each child 5-10 plain diyas',
          'Let them paint with bright colors',
          'Add glitter and decorative elements',
          'Apply varnish when dry',
          'Use decorated diyas for celebration'
        ],
        learningObjective: 'Creativity, fine motor skills, and cultural appreciation'
      },
      {
        id: 'rangoli-competition',
        title: 'Family Rangoli Making Contest',
        description: 'Create beautiful rangoli designs with family members competing in teams',
        ageGroup: 'all_ages',
        duration: '3 hours',
        materials: ['Colored powders', 'Flower petals', 'Rice', 'Stencils'],
        instructions: [
          'Divide family into teams',
          'Assign different areas for each team',
          'Set theme like "flowers" or "geometric"',
          'Judge based on creativity and execution',
          'Take photos and create family album'
        ],
        learningObjective: 'Teamwork, artistic skills, and family bonding'
      },
      {
        id: 'diwali-story-time',
        title: 'Traditional Diwali Stories Session',
        description: 'Share mythological stories behind Diwali with interactive storytelling',
        ageGroup: 'children',
        duration: '1 hour',
        materials: ['Story books', 'Props', 'Costumes (optional)'],
        instructions: [
          'Gather children in circle',
          'Tell story of Rama\'s return to Ayodhya',
          'Use props and dramatic expressions',
          'Ask children to act out scenes',
          'End with moral lessons discussion'
        ],
        learningObjective: 'Cultural knowledge, listening skills, and values education'
      }
    ],
    culturalImpact: 'Diwali transcends religious boundaries, promoting universal values of light over darkness, good over evil. It strengthens family bonds, supports local economies through increased commerce, and spreads messages of hope, prosperity, and renewal. The festival has become a global celebration of Indian culture and values.',
    relatedFestivals: ['dhanteras-2025', 'karva-chauth-2025', 'govardhan-puja-2025', 'bhai-dooj-2025', 'dussehra-2025', 'chhath-puja-2025']
  },
  {
    id: 'chhath-puja-2025',
    name: 'Chhath Puja',
    sanskritName: 'छठ पूजा',
    date: '2025-10-27',
    occurrences: ['2025-10-27', '2026-11-15', '2027-11-04', '2028-10-23'], // Kartika Shukla Shashthi (Sandhya Arghya day); verified vs Drik Panchang (New Delhi), Jul 2026 — the four days run Nahay Khay (Shashthi minus 2) through Usha Arghya (the morning after)
    emoji: '🌅',
    dateType: 'lunar',
    type: 'nature_worship',
    significance: 'The great sun festival of Bihar and Mithila — four days of austerity, ending waist-deep in a river at dawn',
    description: 'No priest, no murti, no temple: the oldest god in the book, worshipped face to face',
    traditions: [
      'The 36-hour nirjala fast of the vratis',
      'Sandhya Arghya (offering to the setting sun)',
      'Usha Arghya (offering to the rising sun)',
      'Thekua and offerings carried in bamboo soops',
      'Riverbanks and ghats cleaned by volunteers'
    ],
    prayers: [
      'Chhath geet (the folk songs of the festival)',
      'Arghya to Surya',
      'Prayers to Chhathi Maiya'
    ],
    foods: [
      'Thekua (the festival\'s signature wheat-jaggery cookie)',
      'Kheer-roti at Kharna',
      'Sugarcane, whole fruits, and coconut in the soop',
      'Kaddu-bhat at Nahay Khay'
    ],
    colors: ['Sunrise gold', 'Turmeric yellow', 'River silver'],
    deity: 'Surya and Chhathi Maiya',
    scripture: 'Rig Veda (the sun hymns)',
    duration: 2,
    region: 'Bihar, Jharkhand, Eastern UP, and the Nepal Terai',
    importance: 'regional',
    rituals: [
      {
        id: 'chhath-arghya',
        name: 'A Simple Arghya',
        description: 'The festival\'s essential act, scaled to any home: water offered to the rising sun with full attention.',
        timeOfDay: 'dawn',
        materials: ['A small vessel of clean water (a lota if you have one)', 'A place with a clear view of the sunrise', 'Flowers or a few grains of rice (optional)'],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Rise before dawn, bathe, and stand facing the eastern horizon.',
            explanation: 'Chhath\'s vratis stand in rivers; standing anywhere deliberate, at the actual hour, keeps the form\'s heart.'
          },
          {
            stepNumber: 2,
            instruction: 'As the sun clears the horizon, pour the water slowly toward it from raised hands.',
            explanation: 'The arghya is the oldest gesture in the tradition\'s repertoire: an offering to the one deity every eye can see.'
          },
          {
            stepNumber: 3,
            instruction: 'Stand for a moment of thanks before turning away.',
            explanation: 'Chhath\'s distinctive teaching is gratitude to the setting sun as well; if you can, watch this evening\'s sunset with the same attention.'
          }
        ],
        mantras: [
          {
            sanskrit: 'ॐ सूर्याय नमः',
            transliteration: 'oṁ sūryāya namaḥ',
            meaning: 'Salutation to Surya, the sun',
            pronunciation: 'om soor-yaa-ya na-mah'
          }
        ],
        significance: 'The arghya needs no intermediary and no image, which is the whole point of Chhath: between the worshipper and this god stands nothing at all.',
        tips: ['The full vrat (the 36-hour fast) is undertaken with family support and preparation; the simple arghya is the honest entry point', 'This is one common way — ask your family how they walk it.'],
        commonMistakes: ['Treating the sunset offering as optional; honoring the descending sun first is the festival\'s signature']
      }
    ],
    fullStory: 'Chhath Puja, kept on the sixth day of Kartika\'s bright fortnight, is the great festival of Bihar, Jharkhand, eastern Uttar Pradesh, and the Nepal Terai — four days of escalating austerity in worship of Surya, the sun, and Chhathi Maiya, the mother of the sixth. It is Hinduism at its most stripped down: no priest officiates, no murti is dressed, no temple is required. The vrati — usually a mother, fasting even from water for thirty-six hours — stands waist-deep in a river and offers arghya first to the setting sun and then, after a night of vigil, to the rising one. Everything offered is handmade, everything is cleaned, and every class and caste stands in the same water.',
    sections: [
      {
        id: 'chhath-ghat',
        title: 'The Festival With Nothing in Between',
        subtitle: 'A River Ghat at Dusk',
        storyText: 'Picture a festival with no priest, no idol, and no temple. What is left?\n\nEverything, it turns out. At dusk on Kartika\'s sixth day, the riverbanks of Bihar fill with thousands of families. Women in turmeric-yellow saris walk into the water until it reaches their waists. In their raised hands are winnowing baskets of fruit and homemade sweets. Facing them: the setting sun. Nothing stands between the worshipper and the worshipped, and that is the design.\n\nThis is **Chhath**, from the word for sixth. It honors **Surya**, the sun, the one deity in the Hindu world no one has ever needed a murti to see, together with **Chhathi Maiya**, the mother goddess of the sixth day, protector of children. Most vratis, the fasting worshippers, are mothers, and the blessing most asked is not for themselves. It is for their children\'s lives and health.\n\nThe sun is the oldest god in the tradition\'s book. The Rig Veda, its most ancient text, sings to him again and again. Chhath\'s form is folk and regional; its object is as old as the scriptures get.',
        citation: 'Rig Veda 1.50 (to Surya, tr. Griffith); the festival\'s form — regional tradition of Bihar and Mithila, labeled as such.'
      },
      {
        id: 'chhath-four-days',
        title: 'Four Days, Climbing',
        subtitle: 'From a Clean Meal to an Empty Cup',
        storyText: 'Chhath is built like a staircase of increasing discipline, and every household knows its steps by heart.',
        bullets: [
          '**Nahay Khay** (day one): the vrati bathes, the house is scrubbed, and one pure meal is eaten — traditionally kaddu-bhat, pumpkin and rice',
          '**Kharna** (day two): a day\'s fast, broken at dusk with kheer and roti; after that final bite begins the full fast, without food or water, for roughly thirty-six hours',
          '**Sandhya Arghya** (day three): the evening offering — the vrati stands in the river as the sun sets, family passing the soop baskets of thekua, sugarcane, and fruit for the offering',
          '**Usha Arghya** (day four): after a night of vigil and song, the same water, the rising sun, the morning offering — and only then is the fast broken'
        ],
        teachingText: 'Notice the order, because it is the festival\'s most quoted teaching. Chhath honors the **setting** sun first, and the rising one only after.\n\nGratitude that faces only what is rising is half a gratitude. The sun that is leaving gave you today; you thank it first, and trust it back at dawn.',
        citation: 'The four-day sequence — Chhath tradition of Bihar and Mithila, labeled as tradition.'
      },
      {
        id: 'chhath-discipline',
        title: 'Everything by Hand, Everyone in the Water',
        subtitle: 'Thekua, Scrubbed Ghats, and No Officials',
        storyText: 'Two disciplines give Chhath its character, and neither requires a single official.\n\nThe first is **purity by labor**. Everything offered is made at home, by hand: the thekua, the festival\'s dense wheat-and-jaggery cookie, is shaped by the family and cooked over a mud stove kept only for this. Wheat is washed and dried in the courtyard, guarded from birds by children assigned the job as an honor. In the days before, volunteers scrub the public ghats until riverbanks that carry a city\'s traffic all year are, for one week, spotless.\n\nThe second is **the leveling**. Because there is no priest, every family conducts its own worship, and because there is one river, everyone stands in it together. Officials and laborers, side by side, waist-deep in the same cold water, holding up the same baskets. Bihar\'s great folk voice Sharda Sinha, whose Chhath geet float over every ghat, sang for exactly this festival because it is the one that belongs to everybody.\n\nFor the vast Bihari and Purvanchali diaspora, Chhath is the homecoming festival, and where home is too far, the festival adapts: arghya is offered from the Yamuna\'s ghats in Delhi, from Mumbai\'s beaches, from inflatable pools in New Jersey parking lots, which is not a compromise but the point. The sun rises everywhere.',
        teachingText: 'Chhath argues, by demonstration, that the holiest things need the fewest intermediaries. A clean bank, handmade food, a standing family, and the actual sun.\n\nIts portable practice fits any life: watch one sunset and the next sunrise with complete attention, and say thank you at both. That is Chhath, scaled to one.',
        citation: 'Chhath practice and diaspora observance — documented living tradition; Sharda Sinha\'s Chhath geet, documented cultural history.'
      }
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: 'Mandala 1, hymn 50 (to Surya), among the sun hymns — the scriptural anchor of sun worship',
        translation: 'R.T.H. Griffith (public domain)',
      },
      {
        text: 'Chhath tradition',
        locator: 'The four-day vrat, Chhathi Maiya, thekua, and ghat practice — regional folk tradition of Bihar, Jharkhand, eastern UP, and the Nepal Terai, labeled as tradition (no scriptural liturgy claim)',
      },
      {
        text: 'Drik Panchang',
        locator: 'Chhath (Surya Shashthi) dates 2025–2028; Sandhya Arghya on Kartika Shukla Shashthi',
      },
    ],
    mythology: [
      'Chhathi Maiya as guardian of children and the sixth day after birth',
      'Draupadi and the Pandavas keeping a sun vrat in exile, in regional tellings',
      'Karna, the Mahabharata\'s sun-born hero and a king of this region, offering arghya daily'
    ],
    historicalContext: 'Chhath is among the rare major festivals conducted entirely without priestly mediation, and has become the signature festival of the Bihari and Purvanchali diaspora worldwide, reshaping public space (ghats, beaches, city parks) wherever it travels.',
    scriptureReferences: [
      {
        id: 'chhath-rigveda',
        text: 'vedas',
        section: 'Rig Veda 1.50',
        relevance: 'The ancient hymn to Surya — the god of Chhath is the oldest continuously worshipped deity in the tradition'
      }
    ],
    regionalVariations: [
      {
        region: 'Bihar and Jharkhand',
        localName: 'Chhath / Dala Chhath',
        uniqueTraditions: ['The full four-day vrat', 'Ghats cleaned and decorated by neighborhood committees'],
        specialFoods: ['Thekua', 'Kasar (rice laddus)'],
        localCustoms: 'The state\'s defining festival; cities empty toward the rivers, and the diaspora books trains home months ahead.'
      },
      {
        region: 'Delhi, Mumbai, and the diaspora',
        localName: 'Chhath',
        uniqueTraditions: ['Arghya from urban riverbanks, beaches, and constructed pools'],
        specialFoods: ['Thekua made in apartment kitchens'],
        localCustoms: 'Municipal ghats on the Yamuna and artificial ponds in public parks — the festival remaking whatever geography it finds.'
      },
      {
        region: 'Nepal (Terai / Mithila)',
        localName: 'Chhathi',
        uniqueTraditions: ['A national holiday in Nepal\'s Terai; Janakpur\'s ponds as the great gathering points'],
        specialFoods: ['Thekua', 'Bhusawa'],
        localCustoms: 'Mithila keeps Chhath on both sides of the border, one festival across two countries.'
      }
    ],
    modernAdaptations: [
      'Municipal artificial ponds and cleaned urban ghats for arghya',
      'Chhath geet playlists carrying the ghats into headphones',
      'Community thekua-making evenings for apartment-dwelling families'
    ],
    familyActivities: [
      {
        id: 'chhath-two-suns',
        title: 'The Two-Sun Day',
        description: 'Keep Chhath\'s essential discipline as a family: one sunset and the next sunrise, both watched together, with a thank-you said at each.',
        ageGroup: 'all_ages',
        duration: 'Two short outings',
        materials: ['A view of the horizon', 'A small vessel of water for the morning arghya'],
        instructions: [
          'At sunset, watch until the sun is fully down; each person thanks the day for one specific thing it gave',
          'Wake before dawn; watch the sun rise and offer the water toward it',
          'On the walk home, talk about which was harder to attend to, the ending or the beginning'
        ],
        learningObjective: 'Chhath\'s signature teaching in one exercise: gratitude faces what is leaving as well as what is arriving'
      }
    ],
    culturalImpact: 'Chhath demonstrates that grandeur needs no apparatus: a festival with no priests, no idols, and no temples that nonetheless moves millions, cleans rivers, levels social rank in cold water, and calls a diaspora home every Kartika.',
    relatedFestivals: ['diwali-2025', 'makar-sankranti-2025'],
    heroImageUrl: require('../../assets/images/covers/generic-cover.jpg'), // TODO cover shopping list: chhath-puja-cover.png
  }
];

// Ekadashi observances — 2025 entries removed; repopulate with current dates when the feature returns
export const ekadashiData: Ekadashi[] = [];

// Utility functions
const DAY_MS = 24 * 60 * 60 * 1000;

// Parse YYYY-MM-DD as local midnight (new Date('YYYY-MM-DD') is UTC and can shift a day)
// Exported for display formatting: `new Date('YYYY-MM-DD')` parses as UTC
// midnight and shows the previous day in western timezones — always parse
// festival date strings through this instead.
export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export interface FestivalOccurrence {
  start: Date;
  end: Date; // inclusive last day
}

const getOccurrenceRange = (festival: Festival, start: string): FestivalOccurrence => {
  const startDate = parseLocalDate(start);
  return {
    start: startDate,
    end: new Date(startDate.getTime() + (festival.duration - 1) * DAY_MS),
  };
};

// Earliest occurrence that is ongoing or upcoming; null if all occurrences are past
export const getNextOccurrence = (festival: Festival): FestivalOccurrence | null => {
  const today = startOfToday();
  const upcoming = festival.occurrences
    .map(start => getOccurrenceRange(festival, start))
    .filter(range => range.end >= today)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  return upcoming[0] ?? null;
};

// Days until the festival's next occurrence starts (0 if ongoing/today); null if none upcoming
export const getDaysUntilFestival = (festival: Festival): number | null => {
  const next = getNextOccurrence(festival);
  if (!next) return null;
  return Math.max(0, Math.round((next.start.getTime() - startOfToday().getTime()) / DAY_MS));
};

// The festival "lens" for a given date: the festival whose EVE (start − 1) or
// PRINCIPAL day (start) the date falls on — computed relative to the passed
// `date`, not today, so notification pre-baking for future days is correct.
//
// Deliberately bounded to eve + principal day (NOT the whole multi-day run):
// getDaysUntilFestival clamps to 0 for every day an occurrence is ongoing, so a
// 9-day festival like Ratha Yatra used to own the daily brief for ~16 days
// straight (7-day pre-roll + 9-day duration). Keying strictly off each
// occurrence's start caps the lens at two days per festival, an accent rather
// than a takeover. `days` is 0 (today) or 1 (tomorrow/eve).
export const getFestivalLensFor = (date: Date): { festival: Festival; days: number } | null => {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  let best: { festival: Festival; days: number } | null = null;
  for (const festival of festivalData) {
    for (const startStr of festival.occurrences) {
      const days = Math.round((parseLocalDate(startStr).getTime() - day) / DAY_MS);
      // Prefer the principal day (0) over an eve (1); among equals, the first
      // festival in data order wins — fully deterministic across devices.
      if ((days === 0 || days === 1) && (!best || days < best.days)) {
        best = { festival, days };
      }
    }
  }
  return best;
};

export const getTodaysFestivals = (): Festival[] => {
  const today = startOfToday();
  return festivalData.filter(festival =>
    festival.occurrences.some(start => {
      const range = getOccurrenceRange(festival, start);
      return today >= range.start && today <= range.end;
    })
  );
};

export const getCurrentlyOngoingFestivals = (): Festival[] => {
  return getTodaysFestivals(); // Same logic for now
};

// Festivals sorted by next occurrence (ongoing first, then soonest); never empty
// while the data contains future occurrences
export const getUpcomingFestivals = (limit: number = festivalData.length): Festival[] => {
  return festivalData
    .map(festival => ({ festival, next: getNextOccurrence(festival) }))
    .filter((entry): entry is { festival: Festival; next: FestivalOccurrence } => entry.next !== null)
    .sort((a, b) => a.next.start.getTime() - b.next.start.getTime())
    .slice(0, limit)
    .map(entry => entry.festival);
};

// Festivals whose occurrence spans the given YYYY-MM-DD day
export const getFestivalsOnDate = (dateStr: string): Festival[] => {
  const date = parseLocalDate(dateStr);
  return festivalData.filter(festival =>
    festival.occurrences.some(start => {
      const range = getOccurrenceRange(festival, start);
      return date >= range.start && date <= range.end;
    })
  );
};

export const getFestivalsByMonth = (month: number, year: number): Festival[] => {
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0); // last day of the month
  return festivalData.filter(festival =>
    festival.occurrences.some(start => {
      const range = getOccurrenceRange(festival, start);
      return range.start <= monthEnd && range.end >= monthStart;
    })
  );
};

export const getFestivalsByType = (type: FestivalType): Festival[] => {
  return festivalData.filter(festival => festival.type === type);
};

// Every festival (major AND regional), sorted by next occurrence. List surfaces
// (Learn tab, calendar list) use this — filtering on importance would hide the
// regional entries entirely, the same trap that once hid the journey-only goddesses.
export const getAllFestivals = (): Festival[] => {
  return [...festivalData].sort((a, b) => {
    const nextA = getNextOccurrence(a);
    const nextB = getNextOccurrence(b);
    const timeA = nextA ? nextA.start.getTime() : Number.MAX_SAFE_INTEGER;
    const timeB = nextB ? nextB.start.getTime() : Number.MAX_SAFE_INTEGER;
    return timeA - timeB;
  });
};

export const getMajorFestivals = (): Festival[] => {
  return festivalData
    .filter(festival => festival.importance === 'major')
    .sort((a, b) => {
      const nextA = getNextOccurrence(a);
      const nextB = getNextOccurrence(b);
      // Festivals with no future occurrence sort last
      const timeA = nextA ? nextA.start.getTime() : Number.MAX_SAFE_INTEGER;
      const timeB = nextB ? nextB.start.getTime() : Number.MAX_SAFE_INTEGER;
      return timeA - timeB;
    });
};

// Keep the legacy `date` field pointing at each festival's ongoing/next occurrence so
// call sites that read it directly (e.g. contentAggregator) stay correct as years roll over
festivalData.forEach(festival => {
  const next = getNextOccurrence(festival);
  if (next) {
    const { start } = next;
    festival.date = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
  }
});

export const getTodaysEkadashi = (): Ekadashi | null => {
  const today = new Date().toISOString().split('T')[0];
  return ekadashiData.find(ekadashi => ekadashi.date === today) || null;
};

export const getNextEkadashi = (): Ekadashi | null => {
  const today = new Date();
  const upcoming = ekadashiData.find(ekadashi => {
    const ekadashiDate = new Date(ekadashi.date);
    return ekadashiDate > today;
  });
  return upcoming || null;
};

export default festivalData;