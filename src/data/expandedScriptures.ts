// Expanded Scriptures Data for Dharma App
// Comprehensive collection of Hindu scriptures beyond Bhagavad Gita

// Image imports for proper asset handling
const bhagavadGitaCover = require('../../assets/images/covers/bhagavad-gita-cover.jpg');

export interface Scripture {
  id: string;
  name: string;
  sanskritName: string;
  category: 'vedas' | 'upanishads' | 'puranas' | 'epics' | 'sutras' | 'tantras';
  description: string;
  significance: string;
  historicalContext: string;
  language: 'sanskrit' | 'mixed';
  estimatedDate: string;
  totalChapters?: number;
  totalVerses?: number;
  mainThemes: string[];
  keyTeachings: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  chapters: ScriptureChapter[];
  audioBook: AudioBook;
  podcastSeries: PodcastSeries[];
  relatedScriptures: string[];
  images: {
    heroImage: string;
    iconImage: string;
    manuscriptImages?: string[];
  };
  modernRelevance: string;
  readingGuide: ReadingGuide;
}

export interface ScriptureChapter {
  id: string;
  number: number;
  name: string;
  sanskritName?: string;
  summary: string;
  keyPoints: string[];
  verses?: ScriptureVerse[];
  audioUrl?: string;
  duration?: string; // Reading/listening time
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  practicalApplications: string[];
}

export interface ScriptureVerse {
  id: string;
  number: number;
  sanskrit?: string;
  transliteration?: string;
  english: string;
  commentary: string;
  practicalMeaning: string;
  audioUrl?: string;
}

export interface AudioBook {
  narrator: string;
  totalDuration: string;
  language: 'english' | 'hindi' | 'sanskrit';
  chapters: AudioChapter[];
}

export interface AudioChapter {
  chapterNumber: number;
  duration: string;
  audioUrl: string;
}

export interface PodcastSeries {
  id: string;
  title: string;
  description: string;
  host: string;
  totalEpisodes: number;
  episodes: PodcastEpisode[];
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  topics: string[];
  chapterReference?: number;
}

export interface ReadingGuide {
  recommendedOrder: string[];
  timeCommitment: {
    daily: string;
    weekly: string;
    total: string;
  };
  prerequisites?: string[];
  studyTips: string[];
  discussionQuestions: string[];
}

// Expanded Scripture Data
export const expandedScripturesData: Scripture[] = [
  // Re-include Bhagavad Gita with enhanced structure
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita',
    sanskritName: 'श्रीमद्भगवद्गीता',
    category: 'epics',
    description: 'The divine song - Krishna\'s teachings to Arjuna on the battlefield of Kurukshetra, containing the essence of Hindu philosophy',
    significance: 'Considered the most important philosophical text of Hinduism, containing teachings on dharma, karma, devotion, and liberation',
    historicalContext: 'Part of the Mahabharata epic, composed between 400 BCE and 400 CE, represents the culmination of Vedic thought',
    language: 'sanskrit',
    estimatedDate: '400 BCE - 400 CE',
    totalChapters: 18,
    totalVerses: 700,
    mainThemes: ['Dharma', 'Karma Yoga', 'Bhakti Yoga', 'Jnana Yoga', 'Self-realization', 'Divine nature'],
    keyTeachings: [
      'Perform duty without attachment to results',
      'The soul is eternal and beyond birth and death',
      'Multiple paths lead to the same divine truth',
      'Devotion and surrender to God brings liberation',
      'Balance action with spiritual wisdom'
    ],
    difficulty: 'beginner',
    chapters: [], // Will be populated from existing bhagavadGitaData
    audioBook: {
      narrator: 'Dharma Studios',
      totalDuration: '8 hours 30 minutes',
      language: 'english',
      chapters: [] // Will be populated
    },
    podcastSeries: [
      {
        id: 'gita-essentials',
        title: 'Gita Essentials - Living the Teachings',
        description: 'Practical application of Bhagavad Gita teachings in modern life',
        host: 'Dr. Spiritual Guide',
        totalEpisodes: 18,
        episodes: [
          {
            id: 'gita-ep-1',
            episodeNumber: 1,
            title: 'Facing Life\'s Battles - Arjuna\'s Dilemma',
            description: 'Understanding how to face moral dilemmas with wisdom',
            duration: '25 minutes',
            audioUrl: '/podcasts/gita-ep-1.mp3',
            topics: ['Moral confusion', 'Duty vs desire', 'Seeking guidance'],
            chapterReference: 1
          }
        ]
      }
    ],
    relatedScriptures: ['mahabharata', 'upanishads-collection'],
    images: {
      heroImage: bhagavadGitaCover, // Traditional Bhagavad Gita artwork
      iconImage: bhagavadGitaCover, // Using same beautiful cover image
      manuscriptImages: ['/images/scriptures/gita-manuscript-1.jpg']
    },
    modernRelevance: 'Provides practical guidance for ethical decision-making, stress management, leadership, and spiritual growth in contemporary life',
    readingGuide: {
      recommendedOrder: ['Chapter 2', 'Chapter 4', 'Chapter 9', 'Chapter 18', 'All chapters in sequence'],
      timeCommitment: {
        daily: '15-30 minutes',
        weekly: '2-3 hours',
        total: '2-3 months for deep study'
      },
      prerequisites: ['Basic understanding of Hindu concepts'],
      studyTips: [
        'Read with an open mind and heart',
        'Reflect on each verse\'s practical application',
        'Keep a journal of insights',
        'Discuss with others or join study groups'
      ],
      discussionQuestions: [
        'How can we apply karma yoga in our daily work?',
        'What does it mean to act without attachment?',
        'How do we balance duty to family with spiritual growth?'
      ]
    }
  },
  {
    id: 'ramayana',
    name: 'Ramayana',
    sanskritName: 'रामायण',
    category: 'epics',
    description: 'The epic tale of Prince Rama\'s life, embodying ideals of dharma, devotion, and righteousness',
    significance: 'One of the greatest epics of world literature, teaching moral values, family relationships, and the triumph of good over evil',
    historicalContext: 'Composed by sage Valmiki around 300 BCE to 300 CE, consisting of nearly 24,000 verses in Sanskrit',
    language: 'sanskrit',
    estimatedDate: '300 BCE - 300 CE',
    totalChapters: 7,
    totalVerses: 24000,
    mainThemes: ['Dharma', 'Devotion', 'Honor', 'Family values', 'Good vs Evil', 'Ideal relationships'],
    keyTeachings: [
      'Truth and honor above personal gain',
      'Loyalty in relationships is sacred',
      'A ruler\'s first duty is to their people',
      'Evil ultimately destroys itself',
      'Devotion and faith overcome all obstacles'
    ],
    difficulty: 'intermediate',
    chapters: [
      {
        id: 'ramayana-bala-kanda',
        number: 1,
        name: 'Bala Kanda',
        sanskritName: 'बाल काण्ड',
        summary: 'The childhood section - birth of Rama, his education, marriage to Sita, and early adventures',
        keyPoints: [
          'Divine birth of Rama and his brothers',
          'Training under sage Vishwamitra',
          'Breaking Shiva\'s bow and marriage to Sita',
          'Return to Ayodhya'
        ],
        audioUrl: '/audio/ramayana/bala-kanda.mp3',
        duration: '2 hours 15 minutes',
        difficulty: 'beginner',
        practicalApplications: [
          'Importance of good education and mentorship',
          'Respecting teachers and elders',
          'Staying true to one\'s word',
          'The value of noble companionship'
        ]
      },
      {
        id: 'ramayana-ayodhya-kanda',
        number: 2,
        name: 'Ayodhya Kanda',
        sanskritName: 'अयोध्या काण्ड',
        summary: 'The Ayodhya section - Rama\'s exile and the grief it causes in the kingdom',
        keyPoints: [
          'Kaikeyi\'s demand for Bharata\'s coronation',
          'Rama\'s acceptance of exile',
          'Sita and Lakshmana joining Rama',
          'Bharata\'s refusal to rule'
        ],
        audioUrl: '/audio/ramayana/ayodhya-kanda.mp3',
        duration: '3 hours 30 minutes',
        difficulty: 'intermediate',
        practicalApplications: [
          'Honoring commitments even when costly',
          'Family unity in times of crisis',
          'Leadership through service, not power',
          'Grace under pressure'
        ]
      }
    ],
    audioBook: {
      narrator: 'Classic Stories Audio',
      totalDuration: '15 hours',
      language: 'english',
      chapters: [
        { chapterNumber: 1, duration: '2 hours 15 minutes', audioUrl: '/audio/ramayana/bala-kanda.mp3' },
        { chapterNumber: 2, duration: '3 hours 30 minutes', audioUrl: '/audio/ramayana/ayodhya-kanda.mp3' }
      ]
    },
    podcastSeries: [
      {
        id: 'ramayana-retold',
        title: 'Ramayana Retold - Timeless Wisdom for Modern Life',
        description: 'Exploring the deeper meanings and life lessons from the Ramayana',
        host: 'Storytelling Sage',
        totalEpisodes: 12,
        episodes: [
          {
            id: 'ramayana-ep-1',
            episodeNumber: 1,
            title: 'The Ideal Son - Rama\'s Character',
            description: 'Understanding what makes Rama the perfect role model',
            duration: '30 minutes',
            audioUrl: '/podcasts/ramayana-ep-1.mp3',
            topics: ['Character building', 'Family duty', 'Moral leadership'],
            chapterReference: 1
          }
        ]
      }
    ],
    relatedScriptures: ['mahabharata', 'vishnu-purana'],
    images: {
      heroImage: '/images/scriptures/ramayana-hero.jpg',
      iconImage: '/images/scriptures/ramayana-icon.jpg',
      manuscriptImages: ['/images/scriptures/ramayana-manuscript.jpg']
    },
    modernRelevance: 'Teaches ethical leadership, family values, integrity in relationships, and maintaining principles under pressure',
    readingGuide: {
      recommendedOrder: ['Bala Kanda', 'Ayodhya Kanda', 'Aranya Kanda', 'Kishkindha Kanda', 'Sundara Kanda', 'Yuddha Kanda', 'Uttara Kanda'],
      timeCommitment: {
        daily: '30-45 minutes',
        weekly: '4-5 hours',
        total: '4-6 months for complete study'
      },
      studyTips: [
        'Focus on character development lessons',
        'Note the ideal relationships portrayed',
        'Reflect on moral dilemmas and their resolutions',
        'Consider how ancient wisdom applies today'
      ],
      discussionQuestions: [
        'What makes Rama an ideal leader?',
        'How do we balance personal desires with duty?',
        'What can we learn from Sita\'s strength and devotion?'
      ]
    }
  },
  {
    id: 'upanishads-collection',
    name: 'Principal Upanishads',
    sanskritName: 'मुख्य उपनिषद्',
    category: 'upanishads',
    description: 'The philosophical texts that form the foundation of Vedantic thought, exploring the nature of reality and consciousness',
    significance: 'The culmination of Vedic thought, containing the highest philosophical teachings about Brahman (ultimate reality) and Atman (individual soul)',
    historicalContext: 'Composed between 800-200 BCE, these texts represent the transition from ritualistic Vedic religion to philosophical inquiry',
    language: 'sanskrit',
    estimatedDate: '800-200 BCE',
    totalChapters: 108,
    mainThemes: ['Self-realization', 'Ultimate reality (Brahman)', 'Unity of existence', 'Liberation (moksha)', 'Consciousness'],
    keyTeachings: [
      'Tat tvam asi - Thou art That (you are one with the divine)',
      'All existence is one divine consciousness',
      'The individual soul (Atman) and universal soul (Brahman) are identical',
      'Liberation comes through knowledge of one\'s true nature',
      'The world is an illusion (Maya) masking ultimate reality'
    ],
    difficulty: 'advanced',
    chapters: [
      {
        id: 'isha-upanishad',
        number: 1,
        name: 'Isha Upanishad',
        sanskritName: 'ईशावास्य उपनिषद्',
        summary: 'The shortest Upanishad, teaching renunciation, divine presence in all things, and the path to liberation',
        keyPoints: [
          'See the divine in everything',
          'Renounce to truly possess',
          'Action without attachment leads to freedom',
          'Balance material and spiritual life'
        ],
        audioUrl: '/audio/upanishads/isha.mp3',
        duration: '45 minutes',
        difficulty: 'intermediate',
        practicalApplications: [
          'Mindful consumption and minimalism',
          'Seeing divinity in nature and people',
          'Working without ego-attachment',
          'Finding contentment in simplicity'
        ]
      }
    ],
    audioBook: {
      narrator: 'Philosophy Audio',
      totalDuration: '12 hours',
      language: 'english',
      chapters: []
    },
    podcastSeries: [],
    relatedScriptures: ['bhagavad-gita', 'brahma-sutras'],
    images: {
      heroImage: '/images/scriptures/upanishads-hero.jpg',
      iconImage: '/images/scriptures/upanishads-icon.jpg'
    },
    modernRelevance: 'Provides philosophical foundation for understanding consciousness, reality, and finding meaning beyond material success',
    readingGuide: {
      recommendedOrder: ['Isha', 'Kena', 'Katha', 'Prasna', 'Mundaka', 'Mandukya'],
      timeCommitment: {
        daily: '20-30 minutes',
        weekly: '2-3 hours',
        total: '6 months to 1 year for deep understanding'
      },
      prerequisites: ['Basic meditation practice', 'Understanding of Hindu philosophical concepts'],
      studyTips: [
        'Read slowly and contemplatively',
        'Meditate on key concepts',
        'Study with a qualified teacher if possible',
        'Practice the principles in daily life'
      ],
      discussionQuestions: []
    }
  },
  {
    id: 'vishnu-purana',
    name: 'Vishnu Purana',
    sanskritName: 'विष्णु पुराण',
    category: 'puranas',
    description: 'One of the eighteen major Puranas, dedicated to Lord Vishnu and his avatars, containing cosmology, genealogies, and spiritual teachings',
    significance: 'Provides comprehensive understanding of Vishnu worship, cosmic cycles, and the divine plan for creation and preservation',
    historicalContext: 'Composed between 300-1000 CE, it systematizes much of Hindu cosmology and theology',
    language: 'sanskrit',
    estimatedDate: '300-1000 CE',
    totalChapters: 6,
    mainThemes: ['Creation and preservation', 'Avatar doctrine', 'Devotion to Vishnu', 'Cosmic cycles', 'Dharma'],
    keyTeachings: [
      'Vishnu pervades and maintains all creation',
      'Divine avatars appear to restore dharma',
      'Devotion (bhakti) leads to liberation',
      'Time moves in cosmic cycles',
      'All paths ultimately lead to the one divine'
    ],
    difficulty: 'intermediate',
    chapters: [],
    audioBook: {
      narrator: 'Purana Audio',
      totalDuration: '20 hours',
      language: 'english',
      chapters: []
    },
    podcastSeries: [],
    relatedScriptures: ['bhagavad-gita', 'bhagavata-purana'],
    images: {
      heroImage: '/images/scriptures/vishnu-purana-hero.jpg',
      iconImage: '/images/scriptures/vishnu-purana-icon.jpg'
    },
    modernRelevance: 'Helps understand the Hindu concept of time, purpose of existence, and finding divine presence in daily life',
    readingGuide: {
      recommendedOrder: ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5', 'Book 6'],
      timeCommitment: {
        daily: '30-45 minutes',
        weekly: '4-5 hours',
        total: '6-8 months'
      },
      studyTips: [
        'Focus on the stories and their deeper meanings',
        'Note the cosmological framework',
        'Understand the avatar concept',
        'Apply devotional principles'
      ],
      discussionQuestions: []
    }
  }
];

// Utility functions
export const getScripturesByCategory = (category: string): Scripture[] => {
  return expandedScripturesData.filter(scripture => scripture.category === category);
};

export const getScriptureById = (id: string): Scripture | undefined => {
  return expandedScripturesData.find(scripture => scripture.id === id);
};

export const getBeginnerScriptures = (): Scripture[] => {
  return expandedScripturesData.filter(scripture => scripture.difficulty === 'beginner');
};

export const getIntermediateScriptures = (): Scripture[] => {
  return expandedScripturesData.filter(scripture => scripture.difficulty === 'intermediate');
};

export const getAdvancedScriptures = (): Scripture[] => {
  return expandedScripturesData.filter(scripture => scripture.difficulty === 'advanced');
};

export default expandedScripturesData;