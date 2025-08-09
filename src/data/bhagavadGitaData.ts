import { Chapter, Verse } from '../types/content';

// Complete Bhagavad Gita data structure
export const bhagavadGitaData: Chapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    name: {
      sanskrit: 'अर्जुन विषाद योग',
      english: 'Arjuna Vishada Yoga',
      hindi: 'अर्जुन विषाद योग'
    },
    summary: 'The first chapter introduces the setting of the Bhagavad Gita, where Arjuna is overcome with grief and confusion before the great battle of Kurukshetra. Arjuna sees his relatives, teachers, and friends on both sides of the battlefield and becomes despondent.',
    verseCount: 47,
    themes: ['Duty vs Personal Attachment', 'Moral Dilemma', 'Depression and Despair', 'Dharma'],
    verses: [
      {
        id: 'bg-1-1',
        chapterNumber: 1,
        verseNumber: 1,
        sanskrit: 'धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत संजय॥',
        transliteration: 'dhṛtarāṣṭra uvāca dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya',
        english: 'Dhritarashtra said: O Sanjaya, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?',
        hindi: 'धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित होकर युद्ध की इच्छा करने वाले मेरे और पाण्डु के पुत्रों ने क्या किया?',
        commentary: [
          {
            id: 'comm-1-1-1',
            author: 'Swami Prabhupada',
            text: 'This verse sets the stage for the entire Bhagavad Gita. The word "dharma-kshetra" (field of righteousness) is significant as it indicates that the battle about to be fought is not merely political but spiritual.',
            language: 'en'
          }
        ],
        tags: ['dharma', 'kurukshetra', 'war', 'introduction'],
        audioUrl: '/audio/bg-1-1.mp3'
      },
      // Add more verses for chapter 1...
    ]
  },
  {
    id: 'chapter-2',
    number: 2,
    name: {
      sanskrit: 'सांख्य योग',
      english: 'Sankhya Yoga',
      hindi: 'सांख्य योग'
    },
    summary: 'Krishna begins his teachings by explaining the nature of the soul, the difference between the body and soul, and the path of knowledge. This chapter contains the fundamental philosophy of the Gita.',
    verseCount: 72,
    themes: ['Soul and Body', 'Dharma', 'Equanimity', 'Action without Attachment', 'Knowledge'],
    verses: [
      {
        id: 'bg-2-47',
        chapterNumber: 2,
        verseNumber: 47,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
        english: 'You have a right to perform your prescribed duty, but do not be attached to the fruits of action. You should never be motivated by the results of action, nor should there be any attachment to not doing your duty.',
        hindi: 'तेरा अधिकार केवल कर्म में है, फल में कभी नहीं। तू कर्म के फल का हेतु मत बन और तेरी अकर्म में भी आसक्ति न हो।',
        commentary: [
          {
            id: 'comm-2-47-1',
            author: 'Swami Prabhupada',
            text: 'This verse is the essence of Bhagavad-gita. It teaches us to act according to our duty without being attached to the results.',
            language: 'en'
          },
          {
            id: 'comm-2-47-2',
            author: 'Shankaracharya',
            text: 'The right to action belongs to every individual, but the results are determined by divine will and natural laws.',
            language: 'en'
          }
        ],
        tags: ['karma yoga', 'detachment', 'duty', 'famous verse', 'action'],
        audioUrl: '/audio/bg-2-47.mp3'
      },
      {
        id: 'bg-2-20',
        chapterNumber: 2,
        verseNumber: 20,
        sanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
        transliteration: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ ajo nityaḥ śāśvato \'yaṁ purāṇo na hanyate hanyamāne śarīre',
        english: 'The soul is never born nor does it die. It is not slain when the body is slain. The soul is unborn, eternal, permanent, and primeval.',
        hindi: 'आत्मा न तो कभी जन्म लेती है और न मरती है। न तो यह होने के बाद फिर न होने वाली है। यह अजन्मा, नित्य, शाश्वत और पुराण है, शरीर के नष्ट होने पर भी यह नष्ट नहीं होती।',
        commentary: [
          {
            id: 'comm-2-20-1',
            author: 'Swami Prabhupada',
            text: 'This verse establishes the eternal nature of the soul, which is the foundation of spiritual knowledge.',
            language: 'en'
          }
        ],
        tags: ['soul', 'eternal', 'death', 'immortality', 'atman'],
        audioUrl: '/audio/bg-2-20.mp3'
      }
    ]
  },
  {
    id: 'chapter-3',
    number: 3,
    name: {
      sanskrit: 'कर्म योग',
      english: 'Karma Yoga',
      hindi: 'कर्म योग'
    },
    summary: 'This chapter focuses on the path of action (Karma Yoga), emphasizing performing duty without attachment to results. Krishna explains how work can be transformed into worship.',
    verseCount: 43,
    themes: ['Selfless Action', 'Duty', 'Sacrifice', 'Work as Worship', 'Yajna'],
    verses: [
      {
        id: 'bg-3-35',
        chapterNumber: 3,
        verseNumber: 35,
        sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
        transliteration: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ',
        english: 'Better is one\'s own duty, though imperfectly performed, than the duty of another well performed. Better is death in one\'s own duty; the duty of another is fraught with danger.',
        hindi: 'दूसरे के धर्म से अपना धर्म श्रेष्ठ है, चाहे वह गुणरहित हो। अपने धर्म में मरना भी कल्याणकारी है, दूसरे का धर्म भयप्रद है।',
        commentary: [
          {
            id: 'comm-3-35-1',
            author: 'Swami Prabhupada',
            text: 'This verse emphasizes the importance of following one\'s own nature and prescribed duties rather than imitating others.',
            language: 'en'
          }
        ],
        tags: ['svadharma', 'duty', 'dharma', 'individual nature'],
        audioUrl: '/audio/bg-3-35.mp3'
      }
    ]
  },
  {
    id: 'chapter-4',
    number: 4,
    name: {
      sanskrit: 'ज्ञान कर्म संन्यास योग',
      english: 'Jnana Karma Sannyasa Yoga',
      hindi: 'ज्ञान कर्म संन्यास योग'
    },
    summary: 'Krishna explains the relationship between knowledge and action, and reveals his divine nature and the purpose of his incarnations.',
    verseCount: 42,
    themes: ['Divine Incarnation', 'Knowledge and Action', 'Spiritual Evolution', 'Avatar'],
    verses: [
      {
        id: 'bg-4-7',
        chapterNumber: 4,
        verseNumber: 7,
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
        transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
        english: 'Whenever there is decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion, at that time I descend Myself.',
        hindi: 'हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने आप को प्रकट करता हूँ।',
        commentary: [
          {
            id: 'comm-4-7-1',
            author: 'Swami Prabhupada',
            text: 'This famous verse explains the purpose of divine incarnations - to restore righteousness when it declines.',
            language: 'en'
          }
        ],
        tags: ['avatar', 'divine incarnation', 'dharma', 'krishna', 'famous verse'],
        audioUrl: '/audio/bg-4-7.mp3'
      }
    ]
  },
  {
    id: 'chapter-18',
    number: 18,
    name: {
      sanskrit: 'मोक्ष संन्यास योग',
      english: 'Moksha Sannyasa Yoga',
      hindi: 'मोक्ष संन्यास योग'
    },
    summary: 'The final chapter summarizes all the teachings of the Gita and emphasizes complete surrender to the Divine as the ultimate path to liberation.',
    verseCount: 78,
    themes: ['Liberation', 'Surrender', 'Complete Knowledge', 'Final Teaching'],
    verses: [
      {
        id: 'bg-18-66',
        chapterNumber: 18,
        verseNumber: 66,
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
        transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
        english: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.',
        hindi: 'सम्पूर्ण धर्मों को त्यागकर केवल मेरी शरण में आ जा। मैं तुझे सम्पूर्ण पापों से मुक्त कर दूंगा, शोक मत कर।',
        commentary: [
          {
            id: 'comm-18-66-1',
            author: 'Swami Prabhupada',
            text: 'This is the ultimate instruction of the Bhagavad Gita - complete surrender to Krishna, which leads to liberation from all suffering.',
            language: 'en'
          }
        ],
        tags: ['surrender', 'liberation', 'final verse', 'sharanagati', 'moksha'],
        audioUrl: '/audio/bg-18-66.mp3'
      }
    ]
  }
];

// Daily verses rotation
export const getDailyVerse = (): Verse => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Collect all verses
  const allVerses: Verse[] = [];
  bhagavadGitaData.forEach(chapter => {
    if (chapter.verses) {
      allVerses.push(...chapter.verses);
    }
  });
  
  // Return verse based on day of year
  const verseIndex = dayOfYear % allVerses.length;
  return allVerses[verseIndex];
};

// Search functionality
export const searchVerses = (query: string): Verse[] => {
  const allVerses: Verse[] = [];
  bhagavadGitaData.forEach(chapter => {
    if (chapter.verses) {
      allVerses.push(...chapter.verses);
    }
  });

  const lowerQuery = query.toLowerCase();
  return allVerses.filter(verse => 
    verse.english.toLowerCase().includes(lowerQuery) ||
    verse.sanskrit.includes(query) ||
    verse.transliteration.toLowerCase().includes(lowerQuery) ||
    (verse.hindi && verse.hindi.includes(query)) ||
    verse.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Get chapter by number
export const getChapter = (chapterNumber: number): Chapter | undefined => {
  return bhagavadGitaData.find(chapter => chapter.number === chapterNumber);
};

// Get verse by ID
export const getVerse = (verseId: string): Verse | undefined => {
  for (const chapter of bhagavadGitaData) {
    if (chapter.verses) {
      const verse = chapter.verses.find(v => v.id === verseId);
      if (verse) return verse;
    }
  }
  return undefined;
};

// Get verses by tags
export const getVersesByTag = (tag: string): Verse[] => {
  const allVerses: Verse[] = [];
  bhagavadGitaData.forEach(chapter => {
    if (chapter.verses) {
      allVerses.push(...chapter.verses);
    }
  });

  return allVerses.filter(verse => 
    verse.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

// Get popular tags
export const getPopularTags = (): string[] => {
  const tagCounts: Record<string, number> = {};
  
  bhagavadGitaData.forEach(chapter => {
    if (chapter.verses) {
      chapter.verses.forEach(verse => {
        verse.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
    }
  });

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);
};

export default bhagavadGitaData;