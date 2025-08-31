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
  // New narrative structure
  sections?: ConceptSection[];
}

export interface ConceptSection {
  id: string;
  title: string;
  subtitle?: string;
  openingVerse?: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  };
  storyText?: string;
  sectionHeader?: string;
  keyVerse?: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  };
  teachingText?: string;
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
    description: 'The art of righteous living and cosmic principle that upholds the universe',
    detailedExplanation: 'Dharma is the cosmic principle that upholds the universe—it\'s both the natural law that keeps planets in orbit and the moral law that guides human behavior. For each individual, dharma becomes deeply personal: the unique way you\'re meant to contribute to the world\'s harmony based on your nature, circumstances, and stage of life. It\'s not found in rigid rules but in the conscious navigation of competing responsibilities. Your dharmic journey isn\'t about reaching a destination but about becoming someone who naturally chooses love, truth, and service in each moment.',
    etymology: 'From the Sanskrit root "dhr" meaning "to hold" or "to support" - that which holds together and supports the universe',
    keyAspects: [
      'Cosmic principle that upholds the universe',
      'Personal authentic contribution to world harmony',
      'Context-sensitive navigation of competing responsibilities',
      'Evolution through different life stages',
      'Balance between individual authenticity and collective welfare'
    ],
    practicalApplications: [
      {
        situation: 'Dream job vs team loyalty',
        application: 'Consider the welfare of current team while pursuing personal growth - seek solutions that honor both',
        benefits: ['Clear conscience', 'Maintained relationships', 'Authentic growth'],
        tips: ['Look for creative solutions', 'Communicate openly with all parties', 'Consider timing and transitions']
      },
      {
        situation: 'Competing family duties',
        application: 'Balance care for parents, spouse, children according to circumstances and life stage',
        benefits: ['Family harmony', 'Personal authenticity', 'Reduced guilt'],
        tips: ['Understand your current life stage', 'Seek family council', 'Remember dharma evolves with time']
      },
      {
        situation: 'Moral dilemmas at work',
        application: 'Navigate between company loyalty and ethical principles through conscious choice-making',
        benefits: ['Personal integrity', 'Long-term trust', 'Meaningful work'],
        tips: ['Consider all stakeholders affected', 'Seek guidance from mentors', 'Remember context matters in ethics']
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
    modernRelevance: 'In our complex modern world, dharma offers a way to live with purpose, integrity, and hope. It teaches us that what\'s dharmic for you might not be dharmic for someone else, and that your unique talents and interests are clues to your dharmic path. Whether facing workplace dilemmas, family responsibilities, or life transitions, dharma provides a framework for authentic self-expression in service to something larger.',
    commonMisunderstandings: [
      'Dharma is not rigid religious rules but flexible ethical principles',
      'You don\'t have to be perfect to be dharmic - growth and learning are part of the path',
      'What\'s dharmic for you might not be dharmic for someone else based on nature and circumstances',
      'It\'s not about becoming someone else\'s version of success but your authentic contribution',
      'Dharma doesn\'t always align with desires but leads to meaningful living'
    ],
    examples: [
      {
        id: 'dharma-example-1',
        title: 'Arjuna\'s Moral Crisis',
        scenario: 'On the battlefield of Kurukshetra, Arjuna faces his beloved teachers and cousins as enemies',
        explanation: 'His duty as a warrior demands he fight, but his heart rebels against harming those he loves',
        lesson: 'Dharma sometimes requires difficult choices that transcend personal comfort'
      },
      {
        id: 'dharma-example-2',
        title: 'Karna\'s Choice of Loyalty',
        scenario: 'Learning he\'s the eldest Pandava, Karna could claim the crown but chooses loyalty to Duryodhana',
        explanation: 'He sacrifices legitimate birthright for gratitude and honor to someone who showed him respect',
        lesson: 'Sometimes dharma means choosing relationships and values over personal advancement'
      }
    ],
    meditation: {
      technique: 'Authentic Dharma Meditation',
      duration: '15-20 minutes',
      instructions: [
        'Bring to mind a current situation requiring a conscious choice',
        'Ask: "What would authentic love and service look like here?"',
        'Consider your unique nature, talents, and life circumstances',
        'Feel for the choice that serves both your growth and others\' welfare',
        'Release attachment to specific outcomes or others\' approval',
        'Rest in trust that dharmic action creates meaningful results'
      ],
      benefits: ['Authentic decision-making', 'Reduced people-pleasing', 'Trust in your path', 'Meaningful action'],
      audioUrl: '/audio/meditations/dharma-reflection.mp3'
    },
    audioGuide: {
      narrator: 'Dharma Teacher',
      duration: '28 minutes',
      audioUrl: '/audio/guides/dharma-guide.mp3',
      topics: ['Art of righteous living', 'Personal vs universal dharma', 'Epic stories and lessons', 'Authentic self-expression', 'Dharma through life stages']
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
      heroImage: require('../../assets/images/covers/dharma-cover.png'),
      iconImage: '/images/philosophy/dharma-icon.jpg',
      infographics: ['/images/philosophy/dharma-types.jpg', '/images/philosophy/dharma-decision-tree.jpg']
    },
    difficulty: 'intermediate',
    sections: [
      {
        id: 'dharma-opening',
        title: 'The Art of Righteous Living',
        subtitle: 'Ancient Kurukshetra Battlefield Transforming into Modern City Crossroads',
        storyText: 'In the opening moments of the Bhagavad Gita, Arjuna stands paralyzed on the battlefield of Kurukshetra, his bow slipping from trembling hands. Before him are his beloved teachers, cousins, and friends—all armed and ready for war. His duty as a warrior demands he fight, but his heart rebels against harming those he loves. This moment of moral crisis births one of humanity\'s greatest conversations about dharma.'
      },
      {
        id: 'dharma-meaning',
        title: 'What Dharma Really Means',
        subtitle: 'Cosmic Wheel Showing Dharma as Universal Balance',
        openingVerse: {
          sanskrit: 'धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः',
          transliteration: 'dharma eva hato hanti dharmo rakṣati rakṣitaḥ',
          meaning: 'Dharma destroys those who destroy it; dharma protects those who protect it'
        },
        storyText: 'Dharma is often translated as "duty" or "righteousness," but these English words fail to capture its nuanced essence. Dharma is the cosmic principle that upholds the universe—it\'s both the natural law that keeps planets in orbit and the moral law that guides human behavior.',
        sectionHeader: 'Personal Dharma Discovery',
        keyVerse: {
          sanskrit: 'धर्मो हि सर्वभूतानां श्रेयो यो धारयेत्',
          transliteration: 'dharmo hi sarvabhūtānāṁ śreyo yo dhārayet',
          meaning: 'Dharma exists for the welfare of all beings'
        },
        teachingText: 'For each individual, dharma becomes deeply personal: it\'s the unique way you\'re meant to contribute to the world\'s harmony based on your nature, circumstances, and stage of life. Consider this: You\'re offered your dream job, but accepting it means your current team will struggle without you during a critical project. What would dharma look like here?'
      },
      {
        id: 'dharma-stages',
        title: 'Dharma Through Life\'s Stages',
        subtitle: 'Tree Growing Through Seasons',
        storyText: 'Your relationship with dharma evolves as you mature. In youth, dharma often feels externally imposed—following your parents\' guidance, your teachers\' rules, society\'s expectations. The young Rama dutifully obeys his father\'s command to live in exile, even though it upends his coronation. His dharma at this stage is to honor his father\'s word and develop the qualities he\'ll need as a future king.',
        sectionHeader: 'The Householder\'s Challenge',
        teachingText: 'As you enter the householder phase, dharma becomes more complex and personal. You must balance your own needs with those of your partner, children, parents, career, and community. The Ramayana shows us this through Rama\'s later struggles as king, when he must choose between his love for Sita and his subjects\' doubts about her purity.'
      },
      {
        id: 'dharma-differences',
        title: 'When Your Dharma Differs from Others',
        subtitle: 'Multiple Paths Converging on Mountain Peak',
        keyVerse: {
          sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्',
          transliteration: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt',
          meaning: 'Better to perform one\'s own dharma imperfectly than another\'s dharma perfectly'
        },
        storyText: 'The genius of Hindu thought is recognizing that what\'s dharmic for you might not be dharmic for someone else. Krishna encourages Arjuna to fight because Arjuna is a kshatriya by nature—his dharma lies in protecting others through strength and courage. But Krishna himself chooses to be Arjuna\'s charioteer rather than picking up weapons, because his dharma in that moment is to be a guide and teacher.'
      },
      {
        id: 'dharma-desire',
        title: 'When Dharma Conflicts with Desire',
        subtitle: 'Karna at Crossroads - Crown vs Loyal Friendship',
        storyText: 'One of dharma\'s most challenging aspects is that it doesn\'t always align with what we want. In the Mahabharata, Karna faces a heartbreaking choice when Krishna reveals that he\'s actually the son of Kunti, making him the eldest Pandava brother. He could claim his rightful place as the crown prince, but doing so would betray Duryodhana, who gave him respect and friendship when no one else would.',
        sectionHeader: 'The Choice of Values',
        keyVerse: {
          sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
          transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
          meaning: 'You have the right to perform your prescribed duty, but not to the fruits of action'
        },
        teachingText: 'Karna chooses loyalty over birthright, demonstrating that sometimes dharma means sacrificing legitimate claims for the sake of gratitude and honor. The Gita\'s profound insight is that dharmic action requires detachment from outcomes. This isn\'t passivity—it\'s the recognition that when you act from genuine dharmic motivation, you must trust the process even when you can\'t control the results.'
      },
      {
        id: 'dharma-authenticity',
        title: 'The Dharma of Authentic Self-Expression',
        subtitle: 'Hanuman Using Powers in Service',
        storyText: 'Perhaps the most radical aspect of dharmic living is its call to authenticity. Your dharma isn\'t about becoming someone else\'s version of success—it\'s about becoming the fullest expression of your authentic self in service to something larger. Hanuman exemplifies this beautifully. He could have used his immense powers for personal glory, but his dharma was devotional service to Rama. His strength became meaningful because it was dedicated to protecting righteousness.'
      },
      {
        id: 'dharma-relationships',
        title: 'Living Dharma in Relationship',
        subtitle: 'Sita Maintaining Inner Light in Lanka',
        storyText: 'Dharma isn\'t a solitary pursuit. The Ramayana and Mahabharata are fundamentally stories about relationships—between siblings, spouses, friends, teachers and students, rulers and subjects. Consider Sita\'s dharma during her captivity in Lanka. She maintains her dignity and devotion despite Ravana\'s threats and promises, not because she\'s passive, but because she understands that her inner strength serves a larger purpose.',
        teachingText: 'Her steadfastness isn\'t just personal virtue—it\'s a cosmic force that ultimately leads to Ravana\'s downfall and dharma\'s restoration. In your own relationships, dharmic living means understanding that you affect others through your choices. When you live authentically and ethically, you give others permission to do the same.'
      },
      {
        id: 'dharma-imperfection',
        title: 'The Wisdom of Imperfection',
        subtitle: 'Yudhishthira\'s Dice Falling',
        storyText: 'One of dharma\'s most compassionate teachings is that you don\'t have to be perfect to be dharmic. Even the greatest figures in our epics make mistakes. Rama banishes Sita based on public opinion rather than his own judgment. Yudhishthira\'s gambling addiction leads to his family\'s exile. Arjuna initially refuses to fight out of attachment to his relatives.',
        teachingText: 'What makes them dharmic isn\'t their perfection but their willingness to learn, grow, and ultimately serve righteousness despite their flaws. You will make choices that seem dharmic at the time but later reveal unintended consequences. The dharmic response isn\'t self-punishment but honest self-reflection and renewed commitment to growth.'
      },
      {
        id: 'dharma-ultimate',
        title: 'The Ultimate Dharma',
        subtitle: 'Krishna\'s Universal Form Transforming to Gentle Human',
        keyVerse: {
          sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
          transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
          meaning: 'Abandon all varieties of dharma and surrender unto me'
        },
        storyText: 'In the Gita\'s final chapter, Krishna offers what many consider the ultimate teaching: "Abandon all varieties of dharma and surrender unto me. I shall deliver you from all sinful reactions." This isn\'t a rejection of dharma but its deepest fulfillment.',
        sectionHeader: 'Love as the Highest Dharma',
        teachingText: 'When your actions arise from genuine love, compassion, and dedication to the universal good, you naturally act dharmically without the anxiety of constantly calculating right and wrong. This surrendered dharma appears in moments when you act from pure compassion without counting the cost, when you tell the truth knowing it will complicate your life, when you choose love over fear even when you can\'t see the outcome. Your life becomes both uniquely yours and part of something infinitely larger, a single note in the eternal song of righteousness that upholds the universe.'
      }
    ]
  },
  {
    id: 'karma',
    name: 'Karma',
    sanskritName: 'कर्म',
    category: 'core_concepts',
    description: 'Law of cause and effect governing all actions',
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
    description: 'Practice of non-violence in thought, word, and action',
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
    id: 'samsara',
    name: 'Samsara',
    sanskritName: 'संसार',
    category: 'core_concepts',
    description: 'Cycle of birth, death, and rebirth driven by karma',
    detailedExplanation: 'Samsara is the continuous cycle of birth, life, death, and rebirth that all souls experience until they achieve liberation. This cycle is driven by karma - our actions and their consequences that create the conditions for our next birth. While often seen as suffering, samsara is also an opportunity for learning, growth, and spiritual evolution. Each lifetime provides chances to resolve karma, develop wisdom, and progress toward moksha (liberation).',
    etymology: 'From Sanskrit "sam" (together) + "sara" (to flow) - the flowing together of births and deaths in continuous cycle',
    keyAspects: [
      'Continuous cycle of birth, death, and rebirth',
      'Driven by karma and unfulfilled desires',
      'Opportunity for spiritual learning and growth',
      'Transcended through wisdom and liberation',
      'Encompasses all forms of existence'
    ],
    practicalApplications: [
      {
        situation: 'Dealing with life challenges',
        application: 'See difficulties as opportunities for growth and karma resolution',
        benefits: ['Acceptance of hardships', 'Focus on learning', 'Reduced victim mentality'],
        tips: ['Ask what each situation teaches you', 'Focus on your response rather than circumstances', 'Trust in the process of growth']
      },
      {
        situation: 'Loss and grief',
        application: 'Remember that relationships continue beyond physical death in the eternal dance of souls',
        benefits: ['Comfort in times of loss', 'Deeper appreciation for relationships', 'Reduced fear of death'],
        tips: ['Honor memories while releasing attachment', 'Send loving thoughts to departed souls', 'Focus on how they helped your growth']
      }
    ],
    relatedConcepts: ['karma', 'moksha', 'atman', 'rebirth', 'dharma'],
    scriptureReferences: [
      {
        id: 'samsara-gita-1',
        text: 'Bhagavad Gita',
        reference: 'Chapter 2, Verse 22',
        quote: 'As a person sheds worn-out garments and wears new ones, so does the soul discard worn-out bodies and enter others that are new',
        context: 'Krishna explains the eternal nature of the soul through the cycle of embodiment'
      }
    ],
    modernRelevance: 'Understanding samsara helps us see life\'s ups and downs in perspective, encouraging personal responsibility while reducing attachment to temporary circumstances',
    commonMisunderstandings: [
      'Samsara is not punishment but a natural process of spiritual evolution',
      'It\'s not fatalistic - our actions can influence our experience',
      'The goal isn\'t to escape life but to live consciously within it',
      'Each birth is an opportunity, not a burden'
    ],
    examples: [
      {
        id: 'samsara-example-1',
        title: 'The Growing Soul',
        scenario: 'A person experiences both success and failure across different areas of life',
        explanation: 'Each experience provides lessons that shape character and wisdom, contributing to spiritual development',
        lesson: 'All experiences in samsara serve the soul\'s evolution when approached with awareness'
      }
    ],
    meditation: {
      technique: 'Life Reflection Meditation',
      duration: '20 minutes',
      instructions: [
        'Reflect on major life events and transitions you\'ve experienced',
        'Identify the lessons and growth each situation brought',
        'See the continuity of consciousness through all changes',
        'Feel gratitude for both pleasant and difficult experiences',
        'Recognize your eternal nature beyond temporary circumstances',
        'Rest in awareness of your journey of growth'
      ],
      benefits: ['Life perspective', 'Acceptance of change', 'Gratitude for experiences', 'Spiritual insight'],
      audioUrl: '/audio/meditations/life-reflection.mp3'
    },
    audioGuide: {
      narrator: 'Cycle Teacher',
      duration: '24 minutes',
      audioUrl: '/audio/guides/samsara-guide.mp3',
      topics: ['Understanding samsara', 'Purpose of rebirth', 'Breaking negative cycles', 'Growing through experiences']
    },
    podcastEpisodes: [],
    images: {
      heroImage: '/images/philosophy/samsara-hero.jpg',
      iconImage: '/images/philosophy/samsara-icon.jpg'
    },
    difficulty: 'intermediate'
  },
  {
    id: 'moksha',
    name: 'Moksha',
    sanskritName: 'मोक्ष',
    category: 'core_concepts',
    description: 'Ultimate spiritual liberation from cycle of rebirth',
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