// Yoga and Spiritual Practices Data for Dharma App
// Comprehensive collection of Hindu spiritual practices and yoga paths

export interface SpiritualPractice {
  id: string;
  name: string;
  sanskritName: string;
  category: 'yoga_paths' | 'meditation' | 'rituals' | 'breathing' | 'mantras' | 'devotional';
  description: string;
  detailedExplanation: string;
  origins: string;
  benefits: string[];
  suitableFor: string[]; // Beginner, intermediate, advanced
  timeCommitment: {
    minimum: string;
    recommended: string;
    advanced: string;
  };
  practices: Practice[];
  techniques: Technique[];
  guidelines: string[];
  precautions: string[];
  scriptureReferences: ScriptureReference[];
  relatedPractices: string[];
  modernAdaptations: string[];
  audioGuides: AudioGuide[];
  videoGuides: VideoGuide[];
  images: {
    heroImage: string;
    iconImage: string;
    instructionalImages?: string[];
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Practice {
  id: string;
  name: string;
  purpose: string;
  duration: string;
  instructions: string[];
  benefits: string[];
  bestTime: string[];
  materials?: string[];
  audioUrl?: string;
}

export interface Technique {
  id: string;
  name: string;
  sanskritName?: string;
  description: string;
  steps: string[];
  benefits: string[];
  variations?: string[];
  commonMistakes: string[];
}

export interface AudioGuide {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  audioUrl: string;
  description: string;
}

export interface VideoGuide {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  videoUrl: string;
  description: string;
}

export interface ScriptureReference {
  text: string;
  reference: string;
  quote: string;
  relevance: string;
}

// Yoga and Practices Data
export const yogaPracticesData: SpiritualPractice[] = [
  {
    id: 'bhakti-yoga',
    name: 'Bhakti Yoga',
    sanskritName: 'भक्ति योग',
    category: 'yoga_paths',
    description: 'The path of devotion - connecting with the divine through love, surrender, and emotional purification',
    detailedExplanation: 'Bhakti Yoga is the path of pure devotion and surrender to the divine. It transforms human emotions into divine love through practices like chanting, singing, prayer, and ritual worship. This path recognizes that the heart\'s natural tendency to love can be directed toward the divine, leading to spiritual purification and union. Bhakti is considered the most accessible path as it requires no special intellectual abilities or physical capabilities, only a sincere heart seeking divine connection.',
    origins: 'Ancient Vedic traditions, systematized in texts like Bhagavata Purana and Narada Bhakti Sutras around 500-1000 CE',
    benefits: [
      'Heart Opening',
      'Divine Love',
      'Inner Peace',
      'Ego Surrender',
      'Divine Connection',
      'Emotional Healing',
      'Spiritual Joy'
    ],
    suitableFor: ['Beginner', 'Intermediate', 'Advanced', 'All ages', 'Emotional temperaments'],
    timeCommitment: {
      minimum: '15-20 minutes daily',
      recommended: '30-60 minutes daily',
      advanced: '2-4 hours daily'
    },
    practices: [
      {
        id: 'kirtan-practice',
        name: 'Kirtan (Devotional Singing)',
        purpose: 'Opening the heart through musical devotion',
        duration: '20-60 minutes',
        instructions: [
          'Choose devotional songs or mantras',
          'Sing with full attention and emotional engagement',
          'Focus on the meaning and feeling rather than musical perfection',
          'Allow yourself to be moved by the divine names',
          'End in silent meditation on the divine presence'
        ],
        benefits: ['Heart opening', 'Emotional release', 'Joy and bliss', 'Community connection'],
        bestTime: ['Evening', 'Early morning', 'Any time of emotional need'],
        materials: ['Hymn book', 'Musical instruments (optional)', 'Audio recordings'],
        audioUrl: '/audio/practices/kirtan-guide.mp3'
      },
      {
        id: 'puja-practice',
        name: 'Puja (Ritual Worship)',
        purpose: 'Expressing devotion through sacred rituals',
        duration: '15-45 minutes',
        instructions: [
          'Set up a clean sacred space with deity image or symbol',
          'Light incense and lamp/candle',
          'Offer flowers, water, and food with love',
          'Recite prayers or mantras',
          'Meditate on the divine presence',
          'Express gratitude and surrender'
        ],
        benefits: ['Sacred mindfulness', 'Devotional focus', 'Blessing and protection', 'Daily spiritual routine'],
        bestTime: ['Morning', 'Evening', 'Before meals'],
        materials: ['Deity image/symbol', 'Flowers', 'Incense', 'Lamp/candle', 'Water', 'Simple food offerings']
      }
    ],
    techniques: [
      {
        id: 'surrender-technique',
        name: 'Surrender Practice',
        sanskritName: 'शरणागति',
        description: 'Complete surrender of ego and personal will to divine will',
        steps: [
          'Acknowledge your limitations and the divine\'s unlimited nature',
          'Offer all actions and their results to the divine',
          'Accept whatever comes as divine grace',
          'Release the need to control outcomes',
          'Trust in divine wisdom and timing',
          'Cultivate gratitude for all experiences'
        ],
        benefits: ['Peace of mind', 'Freedom from anxiety', 'Divine guidance', 'Ego dissolution'],
        variations: ['Gradual surrender', 'Complete surrender', 'Situational surrender'],
        commonMistakes: ['Confusing surrender with inaction', 'Surrendering only when convenient', 'Using surrender to avoid responsibility']
      }
    ],
    guidelines: [
      'Cultivate genuine love and devotion rather than mechanical practice',
      'Choose a form of the divine that resonates with your heart',
      'Practice regularly and consistently',
      'Maintain humility and avoid spiritual pride',
      'Serve others as expressions of divine love',
      'Study devotional literature to deepen understanding'
    ],
    precautions: [
      'Avoid fanaticism or extremism in practice',
      'Don\'t neglect worldly responsibilities in the name of devotion',
      'Maintain discrimination and avoid blind following',
      'Balance emotional expression with wisdom'
    ],
    scriptureReferences: [
      {
        text: 'Bhagavad Gita',
        reference: 'Chapter 9, Verse 34',
        quote: 'Fix your mind on Me, be devoted to Me, sacrifice to Me, bow down to Me',
        relevance: 'Krishna outlines the core practices of Bhakti Yoga'
      },
      {
        text: 'Narada Bhakti Sutras',
        reference: 'Sutra 2',
        quote: 'Bhakti is intense love for God',
        relevance: 'Definition of devotional practice'
      }
    ],
    relatedPractices: ['mantra-meditation', 'karma-yoga', 'jnana-yoga'],
    modernAdaptations: [
      'Contemporary devotional music and kirtan bands',
      'Online spiritual communities and virtual satsangs',
      'Interfaith devotional practices',
      'Devotional journaling and gratitude practices',
      'Service-oriented spiritual communities'
    ],
    audioGuides: [
      {
        id: 'bhakti-intro',
        title: 'Introduction to Bhakti Yoga',
        narrator: 'Devotional Teacher',
        duration: '30 minutes',
        audioUrl: '/audio/guides/bhakti-intro.mp3',
        description: 'Overview of the path of devotion and its practices'
      }
    ],
    videoGuides: [
      {
        id: 'bhakti-practices',
        title: 'Daily Bhakti Practices',
        instructor: 'Bhakti Master',
        duration: '45 minutes',
        videoUrl: '/video/guides/bhakti-practices.mp4',
        description: 'Demonstration of puja, kirtan, and surrender practices'
      }
    ],
    images: {
      heroImage: '/images/practices/bhakti-hero.jpg',
      iconImage: '/images/practices/bhakti-icon.jpg',
      instructionalImages: ['/images/practices/puja-setup.jpg', '/images/practices/kirtan.jpg']
    },
    difficulty: 'beginner'
  },
  {
    id: 'karma-yoga',
    name: 'Karma Yoga',
    sanskritName: 'कर्म योग',
    category: 'yoga_paths',
    description: 'The path of selfless action - spiritual growth through dedicated work without attachment to results',
    detailedExplanation: 'Karma Yoga is the path of selfless service and action performed without ego or attachment to outcomes. It transforms ordinary work into spiritual practice by dedicating all actions to the divine and serving others as expressions of the divine. This path is especially suitable for active personalities who find fulfillment through work and service. The key principle is performing all duties with excellence while surrendering the results to the divine.',
    origins: 'Systematic presentation in Bhagavad Gita around 400 BCE-400 CE, with roots in ancient Vedic concepts of yajna (sacrifice)',
    benefits: [
      'Mind Purification',
      'Skillful Action',
      'Ego Freedom',
      'Stress Relief',
      'Service Growth',
      'Life Integration',
      'Leadership Skills'
    ],
    suitableFor: ['Beginners', 'Active personalities', 'Professionals', 'Parents', 'Community leaders'],
    timeCommitment: {
      minimum: 'Integration into existing work and duties',
      recommended: 'Additional 30 minutes daily service',
      advanced: '2+ hours daily dedicated service'
    },
    practices: [
      {
        id: 'nishkama-karma',
        name: 'Nishkama Karma (Desireless Action)',
        purpose: 'Performing work without attachment to personal gain',
        duration: 'Throughout work activities',
        instructions: [
          'Before starting work, offer the activity to the divine',
          'Perform tasks with full attention and best ability',
          'Avoid ego-involvement or taking personal credit',
          'Accept results, success or failure, with equanimity',
          'Use skills and outcomes to serve others',
          'End work with gratitude and surrender of results'
        ],
        benefits: ['Stress reduction', 'Better performance', 'Inner peace', 'Spiritual growth'],
        bestTime: ['During all work activities', 'Professional tasks', 'Household duties'],
        audioUrl: '/audio/practices/nishkama-karma.mp3'
      },
      {
        id: 'seva-practice',
        name: 'Seva (Selfless Service)',
        purpose: 'Spiritual growth through serving others',
        duration: '1-3 hours weekly minimum',
        instructions: [
          'Choose service that matches your skills and interests',
          'Serve without expectation of recognition or reward',
          'See the divine in those you serve',
          'Maintain humility and gratitude for the opportunity to serve',
          'Reflect on lessons learned through service',
          'Gradually expand service to include all interactions'
        ],
        benefits: ['Compassion development', 'Ego reduction', 'Community connection', 'Spiritual merit'],
        bestTime: ['Weekends', 'Free time', 'Throughout daily interactions'],
        materials: ['Skills and time', 'Service opportunity', 'Humble attitude']
      }
    ],
    techniques: [
      {
        id: 'yajna-buddhi',
        name: 'Yajna Buddhi (Sacrificial Attitude)',
        sanskritName: 'यज्ञ बुद्धि',
        description: 'Approaching all work as sacred offering and service',
        steps: [
          'Begin each task with dedication to the divine',
          'Perform work as worship rather than mere duty',
          'Maintain focus on service rather than personal benefit',
          'Offer the fruits of action as sacrifice',
          'Accept outcomes as divine grace',
          'Use results to benefit others and continue service'
        ],
        benefits: ['Sacred approach to work', 'Reduced selfish motivation', 'Spiritual progress', 'Inner fulfillment'],
        variations: ['Work-specific yajna', 'Daily life yajna', 'Service yajna'],
        commonMistakes: ['Becoming attached to being detached', 'Using detachment to avoid responsibility', 'Spiritual pride about selfless service']
      }
    ],
    guidelines: [
      'Start with small acts of selfless service',
      'Maintain excellence in work while releasing attachment to outcomes',
      'Serve according to your abilities and circumstances',
      'Cultivate the attitude of being an instrument of the divine',
      'Balance service to others with necessary self-care',
      'Study scriptures to understand the philosophy behind practices'
    ],
    precautions: [
      'Don\'t neglect family responsibilities for external service',
      'Maintain discrimination in choosing service opportunities',
      'Avoid spiritual pride or superiority complex',
      'Don\'t suppress natural human emotions in the name of detachment'
    ],
    scriptureReferences: [
      {
        text: 'Bhagavad Gita',
        reference: 'Chapter 3, Verse 19',
        quote: 'Therefore, always perform your duty efficiently and without attachment',
        relevance: 'Core teaching of Karma Yoga practice'
      }
    ],
    relatedPractices: ['bhakti-yoga', 'raja-yoga', 'jnana-yoga'],
    modernAdaptations: [
      'Corporate social responsibility programs',
      'Volunteer organizations and NGOs',
      'Environmental service and sustainability projects',
      'Professional mentorship and skill sharing',
      'Community service and social activism'
    ],
    audioGuides: [
      {
        id: 'karma-yoga-intro',
        title: 'Living Karma Yoga in Daily Life',
        narrator: 'Service Teacher',
        duration: '35 minutes',
        audioUrl: '/audio/guides/karma-yoga-intro.mp3',
        description: 'Practical guide to integrating selfless service into modern life'
      }
    ],
    videoGuides: [],
    images: {
      heroImage: '/images/practices/karma-yoga-hero.jpg',
      iconImage: '/images/practices/karma-yoga-icon.jpg',
      instructionalImages: ['/images/practices/seva.jpg', '/images/practices/work-worship.jpg']
    },
    difficulty: 'beginner'
  },
  {
    id: 'raja-yoga',
    name: 'Raja Yoga',
    sanskritName: 'राज योग',
    category: 'yoga_paths',
    description: 'The royal path - systematic meditation and mental discipline leading to self-realization',
    detailedExplanation: 'Raja Yoga, as systematized by Patanjali in the Yoga Sutras, is the scientific approach to spiritual realization through mental discipline and meditation. It consists of eight limbs (Ashtanga): ethical restraints (yama), observances (niyama), physical postures (asana), breath control (pranayama), withdrawal of senses (pratyahara), concentration (dharana), meditation (dhyana), and absorption (samadhi). This comprehensive system addresses all aspects of human development - ethical, physical, mental, and spiritual.',
    origins: 'Systematized by Patanjali in Yoga Sutras around 400 CE, with practices dating back to ancient Vedic times',
    benefits: [
      'Mental Control',
      'Deep Meditation',
      'Spiritual Powers',
      'Physical Health',
      'Emotional Balance',
      'Higher Consciousness',
      'Self-Realization'
    ],
    suitableFor: ['Serious spiritual seekers', 'Those with disciplined temperament', 'Intermediate to advanced practitioners'],
    timeCommitment: {
      minimum: '30 minutes daily practice',
      recommended: '1-2 hours daily practice',
      advanced: '4-6 hours daily intensive practice'
    },
    practices: [
      {
        id: 'pranayama-practice',
        name: 'Pranayama (Breath Control)',
        purpose: 'Controlling life energy through breathing techniques',
        duration: '15-30 minutes',
        instructions: [
          'Sit in comfortable meditation posture',
          'Begin with natural breath observation',
          'Practice specific breathing techniques (Anulom-Vilom, Kapalabhati, etc.)',
          'Maintain steady rhythm and focus',
          'Gradually increase duration and complexity',
          'End with normal breathing and meditation'
        ],
        benefits: ['Energy control', 'Mental clarity', 'Emotional balance', 'Preparation for meditation'],
        bestTime: ['Early morning', 'Evening', 'Empty stomach'],
        materials: ['Quiet space', 'Comfortable seat', 'Fresh air'],
        audioUrl: '/audio/practices/pranayama.mp3'
      },
      {
        id: 'dharana-practice',
        name: 'Dharana (Concentration)',
        purpose: 'Developing one-pointed focus of mind',
        duration: '10-20 minutes',
        instructions: [
          'Choose a single object of concentration (breath, mantra, visualization)',
          'Maintain unwavering focus on the chosen object',
          'When mind wanders, gently return attention to the object',
          'Gradually increase duration of sustained focus',
          'Progress to more subtle objects of concentration',
          'Achieve periods of unbroken concentration'
        ],
        benefits: ['Mental discipline', 'Increased focus', 'Preparation for meditation', 'Mind control'],
        bestTime: ['After pranayama', 'Early morning', 'Quiet evening'],
        materials: ['Meditation object', 'Quiet space', 'Stable posture']
      }
    ],
    techniques: [
      {
        id: 'ashtanga-system',
        name: 'Ashtanga (Eight Limbs)',
        sanskritName: 'अष्टांग',
        description: 'Complete eight-fold system of yogic development',
        steps: [
          'Yama: Ethical restraints (non-violence, truth, celibacy, etc.)',
          'Niyama: Observances (cleanliness, contentment, discipline, etc.)',
          'Asana: Physical postures for stability and health',
          'Pranayama: Breath control and energy regulation',
          'Pratyahara: Withdrawal of senses from external objects',
          'Dharana: Concentration and one-pointed focus',
          'Dhyana: Uninterrupted meditation and contemplation',
          'Samadhi: Absorption and union with the object of meditation'
        ],
        benefits: ['Complete spiritual development', 'Systematic progress', 'Balanced growth', 'Self-realization'],
        variations: ['Beginner adaptations', 'Intensive retreat practice', 'Gradual lifestyle integration'],
        commonMistakes: ['Skipping ethical foundations', 'Rushing to advanced practices', 'Neglecting physical health', 'Forcing meditation states']
      }
    ],
    guidelines: [
      'Begin with ethical foundation (yama and niyama)',
      'Establish regular daily practice routine',
      'Progress gradually through the eight limbs',
      'Find qualified teacher for advanced practices',
      'Maintain balance between effort and relaxation',
      'Integrate practice with daily life activities'
    ],
    precautions: [
      'Don\'t attempt advanced practices without proper preparation',
      'Avoid developing psychic pride or attachment to powers',
      'Maintain physical and mental health throughout practice',
      'Be cautious with intensive breathing techniques',
      'Seek guidance for unusual experiences or difficulties'
    ],
    scriptureReferences: [
      {
        text: 'Yoga Sutras',
        reference: 'Sutra 2.29',
        quote: 'The eight limbs of yoga are: yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, and samadhi',
        relevance: 'Patanjali\'s systematic outline of Raja Yoga'
      }
    ],
    relatedPractices: ['hatha-yoga', 'meditation', 'jnana-yoga'],
    modernAdaptations: [
      'Modern yoga classes focusing on physical postures',
      'Mindfulness and meditation apps',
      'Corporate wellness programs',
      'Scientific research on meditation benefits',
      'Integration with psychotherapy and mental health treatment'
    ],
    audioGuides: [
      {
        id: 'raja-yoga-intro',
        title: 'Introduction to Raja Yoga',
        narrator: 'Yoga Master',
        duration: '40 minutes',
        audioUrl: '/audio/guides/raja-yoga-intro.mp3',
        description: 'Complete overview of the eight-limbed path of Raja Yoga'
      }
    ],
    videoGuides: [
      {
        id: 'ashtanga-practice',
        title: 'Ashtanga Yoga Practice Guide',
        instructor: 'Classical Yoga Teacher',
        duration: '60 minutes',
        videoUrl: '/video/guides/ashtanga.mp4',
        description: 'Systematic practice of the eight limbs with detailed instructions'
      }
    ],
    images: {
      heroImage: '/images/practices/raja-yoga-hero.jpg',
      iconImage: '/images/practices/raja-yoga-icon.jpg',
      instructionalImages: ['/images/practices/meditation-posture.jpg', '/images/practices/pranayama-technique.jpg']
    },
    difficulty: 'intermediate'
  }
];

// Utility functions
export const getPracticesByCategory = (category: string): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.category === category);
};

export const getPracticeById = (id: string): SpiritualPractice | undefined => {
  return yogaPracticesData.find(practice => practice.id === id);
};

export const getBeginnerPractices = (): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.difficulty === 'beginner');
};

export const getIntermediatePractices = (): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.difficulty === 'intermediate');
};

export const getAdvancedPractices = (): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.difficulty === 'advanced');
};

export const getYogaPathsData = (): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.category === 'yoga_paths');
};

export const getMeditationPracticesData = (): SpiritualPractice[] => {
  return yogaPracticesData.filter(practice => practice.category === 'meditation');
};

export default yogaPracticesData;