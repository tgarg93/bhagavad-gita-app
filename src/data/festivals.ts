// Hindu Festival Calendar Data for Dharma App
// Comprehensive collection of Hindu festivals, observances, and sacred days

export interface Festival {
  id: string;
  name: string;
  sanskritName?: string;
  date: string; // YYYY-MM-DD format
  dateType: 'fixed' | 'lunar' | 'solar'; // How the date is calculated
  type: FestivalType;
  significance: string;
  description: string;
  traditions: string[];
  prayers: string[];
  foods: string[];
  colors: string[];
  deity?: string;
  scripture?: string;
  duration: number; // Days
  region?: string; // Primary region where celebrated
  importance: 'major' | 'regional' | 'minor';
  rituals: Ritual[];
  imageUrl?: string;
  videoUrl?: string;
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
  | 'ancestor_worship';

export interface Ritual {
  id: string;
  name: string;
  description: string;
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'all_day';
  materials: string[];
  steps: string[];
  mantras?: string[];
}

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
    significance: 'Marks the sun\'s transition into Capricorn, beginning of longer days',
    description: 'A harvest festival celebrating the sun god and marking the end of winter solstice',
    traditions: [
      'Flying colorful kites',
      'Taking holy dips in rivers',
      'Donating sesame seeds and jaggery',
      'Visiting temples'
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
      'Pongal (South India)'
    ],
    colors: ['Yellow', 'Orange', 'Red'],
    deity: 'Surya (Sun God)',
    duration: 1,
    importance: 'major',
    rituals: [
      {
        id: 'sankranti-morning-ritual',
        name: 'Morning Sun Worship',
        description: 'Offer prayers to the rising sun',
        timeOfDay: 'dawn',
        materials: ['Water', 'Flowers', 'Incense', 'Til and gur'],
        steps: [
          'Face the rising sun',
          'Offer water (arghya) to the sun',
          'Chant Surya mantras',
          'Distribute til-gur to family'
        ],
        mantras: ['ॐ सूर्याय नमः', 'ॐ आदित्याय नमः']
      }
    ]
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
    significance: 'Festival of lights, victory of light over darkness',
    description: 'The most important Hindu festival celebrating the return of Lord Rama to Ayodhya',
    traditions: [
      'Lighting diyas and candles',
      'Fireworks',
      'Rangoli designs',
      'Lakshmi Puja',
      'Gift exchanges',
      'House cleaning and decoration'
    ],
    prayers: [
      'Lakshmi Puja',
      'Ganesha Puja',
      'Diwali mantras'
    ],
    foods: [
      'Sweets (mithai)',
      'Dry fruits',
      'Chakli',
      'Karanji',
      'Soan papdi'
    ],
    colors: ['Gold', 'Red', 'Yellow', 'Orange'],
    deity: 'Goddess Lakshmi',
    duration: 5,
    importance: 'major',
    rituals: []
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
  return festivalData.filter(festival => festival.importance === 'major');
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