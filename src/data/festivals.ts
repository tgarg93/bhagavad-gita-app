// Hindu Festival Calendar Data for Dharma App
// Comprehensive collection of Hindu festivals, observances, and sacred days

export interface Festival {
  id: string;
  name: string;
  sanskritName?: string;
  date: string; // YYYY-MM-DD format
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
    heroImageUrl: '/images/festivals/makar-sankranti-hero.jpg',
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
    ]
  },
  {
    id: 'maha-shivratri-2025',
    name: 'Maha Shivratri',
    sanskritName: 'महाशिवरात्रि',
    date: '2025-02-26',
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
    ]
  },
  {
    id: 'holi-2025',
    name: 'Holi',
    sanskritName: 'होली',
    date: '2025-03-14',
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
    ]
  },
  {
    id: 'ram-navami-2025',
    name: 'Ram Navami',
    sanskritName: 'राम नवमी',
    date: '2025-04-06',
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
    rituals: []
  },
  {
    id: 'janmashtami-2025',
    name: 'Krishna Janmashtami',
    sanskritName: 'कृष्ण जन्माष्टमी',
    date: '2025-08-16',
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
    rituals: []
  },
  {
    id: 'ganesh-chaturthi-2025',
    name: 'Ganesh Chaturthi',
    sanskritName: 'गणेश चतुर्थी',
    date: '2025-08-29',
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
    rituals: []
  },
  {
    id: 'diwali-2025',
    name: 'Diwali',
    sanskritName: 'दीपावली',
    date: '2025-10-20',
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

// Ekadashi dates for 2025
export const ekadashiData: Ekadashi[] = [
  {
    id: 'paush-putrada-ekadashi-2025',
    name: 'Paush Putrada Ekadashi',
    date: '2025-01-10',
    significance: 'Grants children and fulfills desires',
    story: 'Associated with the story of King Suketuman and the blessing of a child',
    fastingRules: [
      'Complete fast from sunrise to sunrise next day',
      'Only water allowed',
      'Break fast after sunrise on Dwadashi'
    ],
    benefits: [
      'Blessing of children',
      'Purification of sins',
      'Spiritual advancement'
    ]
  },
  {
    id: 'shattila-ekadashi-2025',
    name: 'Shattila Ekadashi',
    date: '2025-01-25',
    significance: 'Use of sesame seeds in six ways',
    story: 'Story of the power of sesame seeds and devotion',
    fastingRules: [
      'Fast with fruits and milk',
      'Use sesame seeds in worship',
      'Avoid grains and beans'
    ],
    benefits: [
      'Liberation from sins',
      'Health and longevity',
      'Spiritual purification'
    ]
  }
];

// Utility functions
export const getTodaysFestivals = (): Festival[] => {
  const today = new Date().toISOString().split('T')[0];
  return festivalData.filter(festival => festival.date === today);
};

export const getUpcomingFestivals = (days: number = 30): Festival[] => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return festivalData.filter(festival => {
    const festivalDate = new Date(festival.date);
    return festivalDate >= today && festivalDate <= futureDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getFestivalsByMonth = (month: number, year: number): Festival[] => {
  return festivalData.filter(festival => {
    const festivalDate = new Date(festival.date);
    return festivalDate.getMonth() === month - 1 && festivalDate.getFullYear() === year;
  });
};

export const getFestivalsByType = (type: FestivalType): Festival[] => {
  return festivalData.filter(festival => festival.type === type);
};

export const getMajorFestivals = (): Festival[] => {
  const today = new Date();
  return festivalData
    .filter(festival => festival.importance === 'major')
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Calculate days from today
      const daysFromTodayA = Math.ceil((dateA.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const daysFromTodayB = Math.ceil((dateB.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // If festival is in the past (negative days), treat as next year
      const adjustedDaysA = daysFromTodayA < 0 ? daysFromTodayA + 365 : daysFromTodayA;
      const adjustedDaysB = daysFromTodayB < 0 ? daysFromTodayB + 365 : daysFromTodayB;
      
      return adjustedDaysA - adjustedDaysB;
    });
};

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