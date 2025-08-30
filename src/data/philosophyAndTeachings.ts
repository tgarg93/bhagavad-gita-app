// Philosophy and Teachings Data for Dharma App
// Core Hindu philosophical concepts and life teachings

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
}

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
    id: 'dharma',
    name: 'Dharma',
    sanskritName: 'धर्म',
    category: 'core_concepts',
    description: 'The righteous path - duty, moral law, and the natural order that sustains life and society',
    detailedExplanation: 'Dharma is perhaps the most fundamental concept in Hindu thought, encompassing duty, righteousness, moral law, and the natural order. It operates on multiple levels: universal dharma (principles that apply to all beings), social dharma (duties based on one\'s position in society), personal dharma (individual moral obligations), and situational dharma (appropriate action in specific circumstances). Dharma is not rigid rules but rather flexible principles that guide us toward actions that support harmony, truth, and the wellbeing of all.',
    etymology: 'From the Sanskrit root "dhr" meaning "to hold" or "to support" - that which holds together and supports the universe',
    keyAspects: [
      'Universal principles of righteousness',
      'Duty according to one\'s role and capabilities',
      'Context-sensitive ethical decision making',
      'Balance between individual and collective good',
      'Alignment with natural and cosmic order'
    ],
    practicalApplications: [
      {
        situation: 'Workplace conflicts',
        application: 'Act with integrity, speak truth, consider all stakeholders\' welfare',
        benefits: ['Personal integrity', 'Trust building', 'Sustainable solutions'],
        tips: ['Consider long-term consequences', 'Seek win-win solutions', 'Consult wise mentors']
      },
      {
        situation: 'Family responsibilities',
        application: 'Balance care for parents, spouse, children, and self according to circumstances',
        benefits: ['Family harmony', 'Role model for children', 'Peace of mind'],
        tips: ['Communicate openly', 'Set healthy boundaries', 'Seek support when needed']
      },
      {
        situation: 'Career choices',
        application: 'Choose work that aligns with your values and serves society positively',
        benefits: ['Job satisfaction', 'Contribution to society', 'Spiritual fulfillment'],
        tips: ['Assess your natural talents', 'Consider societal impact', 'Avoid purely selfish motivations']
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
    modernRelevance: 'In our complex modern world, dharma provides a framework for ethical decision-making that considers individual authenticity, social responsibility, and universal wellbeing',
    commonMisunderstandings: [
      'Dharma is not rigid religious rules but flexible ethical principles',
      'It\'s not about blindly following tradition but making conscious moral choices',
      'Dharma can sometimes require difficult decisions that challenge social expectations',
      'It\'s not one-size-fits-all but context-sensitive and person-specific'
    ],
    examples: [
      {
        id: 'dharma-example-1',
        title: 'The Honest Merchant',
        scenario: 'A shopkeeper discovers a pricing error that would save customers money but cost him profit',
        explanation: 'Following dharma, he corrects the price despite the financial loss, maintaining honesty and fairness',
        lesson: 'Truth and fairness are more valuable than immediate material gain'
      },
      {
        id: 'dharma-example-2',
        title: 'The Difficult Family Decision',
        scenario: 'A person must choose between a prestigious job abroad and staying to care for aging parents',
        explanation: 'Dharma involves weighing duties to family against personal growth, seeking creative solutions that honor both',
        lesson: 'Dharma often requires finding balance rather than choosing extremes'
      }
    ],
    meditation: {
      technique: 'Dharma Reflection Meditation',
      duration: '15-20 minutes',
      instructions: [
        'Sit comfortably and bring to mind a current moral dilemma or decision',
        'Breathe deeply and ask: "What would be the most righteous action here?"',
        'Consider the welfare of all affected parties',
        'Listen for inner wisdom beyond ego and fear',
        'Visualize yourself acting with complete integrity',
        'Feel the peace that comes from alignment with dharma'
      ],
      benefits: ['Clarity in decision-making', 'Reduced moral confusion', 'Increased integrity', 'Inner peace'],
      audioUrl: '/audio/meditations/dharma-reflection.mp3'
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '25 minutes',
      audioUrl: '/audio/guides/dharma-guide.mp3',
      topics: ['Understanding dharma', 'Practical applications', 'Common dilemmas', 'Living dharma daily']
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
      heroImage: '/images/philosophy/dharma-hero.jpg',
      iconImage: '/images/philosophy/dharma-icon.jpg',
      infographics: ['/images/philosophy/dharma-types.jpg', '/images/philosophy/dharma-decision-tree.jpg']
    },
    difficulty: 'intermediate'
  },
  {
    id: 'karma',
    name: 'Karma',
    sanskritName: 'कर्म',
    category: 'core_concepts',
    description: 'The law of cause and effect - every action has consequences that shape our future experiences',
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
      heroImage: '/images/philosophy/karma-hero.jpg',
      iconImage: '/images/philosophy/karma-icon.jpg'
    },
    difficulty: 'beginner'
  },
  {
    id: 'ahimsa',
    name: 'Ahimsa',
    sanskritName: 'अहिंसा',
    category: 'ethical_values',
    description: 'Non-violence - the practice of not causing harm through thought, word, or action',
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
      heroImage: '/images/philosophy/ahimsa-hero.jpg',
      iconImage: '/images/philosophy/ahimsa-icon.jpg'
    },
    difficulty: 'beginner'
  },
  {
    id: 'moksha',
    name: 'Moksha',
    sanskritName: 'मोक्ष',
    category: 'spiritual_paths',
    description: 'Liberation - the ultimate goal of spiritual life, freedom from the cycle of birth and death',
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
      heroImage: '/images/philosophy/moksha-hero.jpg',
      iconImage: '/images/philosophy/moksha-icon.jpg'
    },
    difficulty: 'advanced'
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