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
  starterPack: StarterPack;
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
    heroImageUrl: require('../../assets/images/covers/dharma-cover.png'),
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
      'Worshipping Goddess Saraswati',
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
        name: 'Saraswati Worship',
        description: 'Worship of knowledge and wisdom',
        timeOfDay: 'morning',
        materials: ['Yellow flowers', 'Books', 'Musical instruments', 'White cloth'],
        steps: [
          'Clean and decorate study area',
          'Place Saraswati image/idol',
          'Offer yellow flowers and sweets',
          'Read from sacred texts',
          'Play music or recite prayers'
        ],
        mantras: ['ॐ सरस्वत्यै नमः', 'या कुन्देन्दु तुषार हार धवला']
      }
    ],
    fullStory: 'Basant Panchami marks the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music, arts, and learning. This auspicious day falls on the fifth day (Panchami) of the bright fortnight in the Hindu month of Magha. Yellow is the predominant color of the festival, symbolizing the mustard fields that bloom during this time of year. Students place their books and musical instruments near the goddess to seek her blessings for wisdom and skill.',
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
    heroImageUrl: require('../../assets/images/covers/dharma-cover.png'),
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
        name: 'Shiva Abhishekam',
        description: 'Ritual bathing of Shiva Lingam',
        timeOfDay: 'all_day',
        materials: ['Milk', 'Honey', 'Ghee', 'Yogurt', 'Water', 'Bel leaves'],
        steps: [
          'Clean the Shiva Lingam',
          'Pour milk while chanting mantras',
          'Follow with honey, ghee, yogurt',
          'Offer bel leaves',
          'Light incense and lamps'
        ],
        mantras: ['ॐ नमः शिवाय', 'ॐ त्र्यम्बकं यजामहे']
      }
    ],
    fullStory: 'Maha Shivratri, the Great Night of Shiva, is the most sacred festival dedicated to Lord Shiva. It occurs on the new moon night in the month of Phalguna, when devotees observe fasting, vigil, and worship throughout the night. This festival celebrates the marriage of Shiva and Parvati and commemorates the divine dance of creation, preservation, and destruction.',
    mythology: [
      'Divine marriage of Shiva and Parvati',
      'Night when Shiva performed the cosmic dance of Tandava',
      'Legend of the hunter who unknowingly worshipped Shiva all night'
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
    heroImageUrl: require('../../assets/images/covers/dharma-cover.png'),
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
        name: 'Holika Dahan',
        description: 'Bonfire ceremony on Holi eve',
        timeOfDay: 'evening',
        materials: ['Wood', 'Dried leaves', 'Coconut', 'Grains'],
        steps: [
          'Collect wood and combustible materials',
          'Arrange in bonfire formation',
          'Light the fire after sunset',
          'Offer prayers for good over evil',
          'Sing traditional Holi songs'
        ]
      }
    ],
    fullStory: 'Holi, the Festival of Colors, celebrates the victory of good over evil and the arrival of spring. Based on the legend of Prahlada and the demoness Holika, this joyous festival brings people together to play with colors, dance, and celebrate love and harmony. The festival begins with Holika Dahan, a bonfire ceremony, followed by the colorful celebration known as Rangwali Holi.',
    mythology: [
      'Story of Prahlada, Hiranyakashipu, and Holika',
      'Krishna and Radha\'s divine love play with colors',
      'Legend of the ogress Dhundhi being driven away by children\'s noise'
    ],
    historicalContext: 'Ancient spring festival mentioned in Vedic texts, evolving into the modern celebration of unity and joy.',
    scriptureReferences: [],
    regionalVariations: [],
    modernAdaptations: [
      'Eco-friendly natural colors',
      'Water conservation initiatives',
      'Community celebrations in parks and societies'
    ],
    familyActivities: [],
    culturalImpact: 'Breaks social barriers, promotes unity, and celebrates the diversity of life through colors.',
    relatedFestivals: ['maha-shivratri-2025'],
    heroImageUrl: require('../../assets/images/covers/dharma-cover.png'),
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
    rituals: [],
    fullStory: 'Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu and the epitome of righteousness (dharma). Born to King Dasharatha and Queen Kausalya in Ayodhya, Rama\'s life story as told in the Ramayana exemplifies the ideal qualities of a son, husband, king, and human being. This festival marks the culmination of nine days of spiritual observance and is celebrated with great devotion across India.',
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
    relatedFestivals: ['diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/ramayana-cover.png'),
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
        subtitle: 'A Prison Cell Lit from Within',
        storyText: 'Janmashtami falls on the eighth night of the waning moon of Bhadrapada — close to the month\'s darkest hour. The timing is the first teaching. Krishna is not born at dawn in a palace; he is born at midnight in a prison, to parents chained by a tyrant. Hindu tradition placed the year\'s most joyous birth in the year\'s heaviest darkness deliberately: divinity arrives precisely where things look most hopeless. Devotees who fast through the day and keep vigil to midnight are not performing an austerity — they are rehearsing the story\'s deepest claim, that the night is worth waiting through.'
      },
      {
        id: 'janmashtami-prophecy',
        title: 'The Prophecy and the Prison',
        subtitle: 'Kamsa Gripping the Reins of His Sister\'s Chariot',
        storyText: 'The Bhagavata Purana (Canto 10, Chapter 1) opens the story at a wedding. Kamsa, the ruthless king of Mathura, is lovingly driving the chariot of his newly married sister Devaki when a voice from the sky stops him cold: the eighth child of this very sister will be his death. In an instant, affection becomes terror. He raises his sword against Devaki; her husband Vasudeva saves her with a desperate promise — every child they bear will be handed to Kamsa. The king imprisons them both, and one by one, six newborns are taken and killed. The seventh is mysteriously lost. And then Devaki conceives an eighth time, and the prison begins, impossibly, to feel like a temple.',
        teachingText: 'Kamsa\'s tragedy is instructive: the prophecy did not doom him — his response to it did. Fear made him cruel, and his cruelty manufactured the very enemy he feared. When you receive threatening news, watch what it makes of you. Fear that turns to control and harm builds the prison; and it is always the fearful one who ends up living in it.'
      },
      {
        id: 'janmashtami-birth',
        title: 'The Midnight Birth',
        subtitle: 'Vasudeva Carrying a Basket Across the Yamuna',
        storyText: 'At midnight, in the blackest hour, the child is born — and the Bhagavata Purana says the prison filled with light. Devaki and Vasudeva behold their newborn for a moment in his four-armed divine form, crowned and holding conch, discus, club, and lotus, before he becomes an ordinary, impossibly beautiful baby (Canto 10, Chapter 3). The guards fall into enchanted sleep. The shackles open. The barred doors swing wide. Carrying his son in a basket on his head, Vasudeva walks out into a monsoon night, and the rain-swollen Yamuna parts to give him passage while the great serpent Shesha spreads his hoods as an umbrella. In sleeping Gokul, he lays Krishna beside the cowherd queen Yashoda and returns with her newborn daughter. When Kamsa comes to kill the eighth child, she slips from his hands and rises as the goddess Yogamaya, laughing: "The one who will destroy you is already born, elsewhere" (Canto 10, Chapter 4).',
        teachingText: 'Notice what the story insists on: when the divine chooses to move, every lock in the world is already open. The chains, the doors, the river — none of them were ever the real obstacle. What actually carries the child to safety is a father\'s trembling, faithful walk through the rain. Grace opens the way; someone still has to do the walking.'
      },
      {
        id: 'janmashtami-why-born',
        title: 'Why God Takes Birth',
        subtitle: 'The Charioteer Revealing Himself',
        keyVerse: {
          sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदाऽऽत्मानं सृजाम्यहम्॥ परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय संभवामि युगे युगे॥',
          transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata, abhyutthānam adharmasya tadātmānaṁ sṛijāmy aham; paritrāṇāya sādhūnāṁ vināśhāya cha duṣhkṛitām, dharma-sansthāpanārthāya sambhavāmi yuge yuge',
          meaning: 'Whenever there is a decline of righteousness and a rise of unrighteousness, O Arjuna, then I manifest Myself. For the protection of the good, for the destruction of the wicked, and for the establishment of righteousness, I am born in every age.',
          source: 'Bhagavad Gita 4.7–8 (tr. Swami Sivananda)'
        },
        storyText: 'Decades after that midnight, the child born in Kamsa\'s prison stood on the battlefield of Kurukshetra as Arjuna\'s charioteer and explained his own birth. These two verses — recited in millions of homes every Janmashtami — are Krishna\'s answer to why the infinite takes a body at all: not as a one-time miracle, but as a standing promise. Whenever darkness gathers past bearing, in every age, the light is born again.',
        teachingText: 'The promise has an inner reading too. The prison is any heart shut tight by fear; midnight is any hour when hope runs lowest. Janmashtami asks you to keep one lamp lit in that darkness — because the story\'s whole claim is that this is exactly when and where the divine chooses to be born.'
      },
      {
        id: 'janmashtami-butter',
        title: 'The God Who Steals Butter',
        subtitle: 'A Clay Pot Hanging High, Boys Climbing in a Pyramid',
        storyText: 'The story does not end at the rescue — it erupts into joy. In Gokul and Vrindavan, the divine child grows up as a mischievous cowherd boy who raids every kitchen for fresh makhan, white butter — the Bhagavata\'s tenth canto lovingly records the exasperated cowherd women lining up to complain to Yashoda while secretly hoping he raids their homes next. This is why Janmashtami tastes of butter and rock sugar, and why in Maharashtra young men build swaying human pyramids to smash a dahi handi hung high above the street — recreating the toddler gangs Krishna organized to reach the hanging pots.',
        teachingText: 'Hindu tradition\'s boldest move is here: the same God who parts rivers wants to be loved as the baby you rock, the child you scold, the friend whose mischief you forgive. The butter thief teaches that the divine is not only approached through awe — sometimes it climbs through your kitchen window. Let your practice this Janmashtami include delight: sweetness shared, songs sung too loudly, a pot broken open. Joy, too, is worship.'
      }
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
        locator: '4.7–8 (why the divine takes birth)',
        translation: 'Swami Sivananda (public domain; bundled gitaVerses.json)',
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
    relatedFestivals: ['holi-2025', 'diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/krishna-cover.png'),
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
    rituals: [],
    fullStory: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha, the beloved elephant-headed deity who removes obstacles and grants wisdom. This festival involves bringing beautifully crafted Ganesha idols into homes and communities, worshipping them for 1-11 days, and then ceremonially immersing them in water bodies. The festival combines devotion, artistry, community spirit, and environmental consciousness.',
    mythology: [
      'Birth of Ganesha from Parvati\'s turmeric paste',
      'How Ganesha got his elephant head',
      'Ganesha as the scribe of the Mahabharata'
    ],
    historicalContext: 'Originally a family celebration, transformed into a public festival by Lokmanya Tilak during India\'s freedom struggle.',
    scriptureReferences: [],
    regionalVariations: [],
    modernAdaptations: [
      'Eco-friendly clay idols',
      'Water-soluble paints',
      'Community environmental initiatives'
    ],
    familyActivities: [],
    culturalImpact: 'Promotes community unity, artistic expression, and environmental awareness.',
    relatedFestivals: ['diwali-2025'],
    heroImageUrl: require('../../assets/images/covers/dharma-cover.png'),
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
    colors: ['Day 1: Orange', 'Day 2: White', 'Day 3: Red', 'Day 4: Royal Blue', 'Day 5: Yellow', 'Day 6: Green', 'Day 7: Grey', 'Day 8: Purple', 'Day 9: Peacock Green'],
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
        description: 'Nine-day cycle of worshipping different forms of Goddess Durga',
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
          culturalContext: 'Katyayani is especially worshipped by unmarried women seeking good husbands',
          tips: ['Green represents growth and harmony', 'Powerful day for removing obstacles'],
          imageUrl: '/images/guides/day6-katyayani.jpg'
        },
        {
          stepNumber: 7,
          title: 'Day 7 - Kalaratri Worship (Grey Day)',
          description: 'Worship Goddess Kalaratri, the fierce form who destroys ignorance',
          timeOfDay: 'Morning',
          duration: '1.5 hours',
          materialsNeeded: ['Dark flowers', 'Grey clothes', 'Jaggery offering', 'Oil lamps'],
          detailedInstructions: [
            'Wear grey or dark colored clothes',
            'Offer dark colored flowers',
            'Light multiple oil lamps',
            'Pray for removal of fear and ignorance',
            'Perform protective mantras',
            'Offer jaggery as prasadam'
          ],
          culturalContext: 'Kalaratri destroys darkness and negative energies',
          tips: ['Grey represents neutrality and balance', 'Focus on overcoming inner darkness'],
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
          description: 'Complete Navratri by worshipping Goddess Siddhidatri, the grantor of supernatural powers',
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
    relatedFestivals: ['dhanteras-2025', 'karva-chauth-2025', 'govardhan-puja-2025', 'bhai-dooj-2025']
  }
];

// Ekadashi observances — 2025 entries removed; repopulate with current dates when the feature returns
export const ekadashiData: Ekadashi[] = [];

// Utility functions
const DAY_MS = 24 * 60 * 60 * 1000;

// Parse YYYY-MM-DD as local midnight (new Date('YYYY-MM-DD') is UTC and can shift a day)
const parseLocalDate = (dateStr: string): Date => {
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