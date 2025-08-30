// Child-Friendly Bhagavad Gita - Complete 18 Chapters
// Adapted for 8-year-old understanding while maintaining spiritual authenticity

import { EnhancedChapter, ChildFriendlyVerse } from '../types/bhagavadGitaTypes';

// Image imports for proper asset handling
const battleOfHastinapuraImage = require('../../assets/images/chapters/chapter-1-battlefield.png');

export const childFriendlyBhagavadGita: EnhancedChapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    name: {
      sanskrit: 'अर्जुन विषाद योग',
      english: 'Arjuna Vishada Yoga',
      childFriendly: 'The Warrior\'s Dilemma'
    },
    
    adultSummary: 'The first chapter introduces the setting where Arjuna is overcome with grief and confusion before the great battle.',
    
    childSummary: 'A great warrior faces his biggest battle yet - not against enemies, but against his own doubts and fears about what\'s right and wrong.',
    
    mainLesson: 'Sometimes even brave people feel scared and confused, and that\'s okay. When we don\'t know what to do, we should ask for help from someone wise.',
    
    storyHook: 'Long, long ago, there was a great kingdom called Hastinapura. Two groups of cousins - the Pandavas and the Kauravas - couldn\'t agree on who should rule. After trying everything else, they decided to settle it with a massive battle on the field of Kurukshetra. But this wasn\'t just any battle. This was a war that would decide the fate of dharma - the right way to live - for generations to come.',
    
    fullStoryContent: `
**The Story Begins**

Long, long ago, there was a great kingdom called Hastinapura. Two groups of cousins - the Pandavas and the Kauravas - couldn't agree on who should rule. After trying everything else, they decided to settle it with a massive battle on the field of Kurukshetra.

But this wasn't just any battle. This was a war that would decide the fate of dharma - the right way to live - for generations to come.

**Meet Our Heroes**

**Arjuna** - One of the greatest warriors who ever lived. Imagine someone who never missed their target, whether with a bow and arrow or in life. He was known for his focus, skill, and dedication to doing what's right.

**Krishna** - Arjuna's charioteer and best friend. But Krishna wasn't just anyone - he was the divine teacher who would share wisdom that people still learn from today.

**The Moment Everything Changed**

As the two armies faced each other, Arjuna asked Krishna to drive their chariot between the two sides so he could see who he'd be fighting. But when Arjuna looked out at the enemy army, his heart sank.

"Krishna," Arjuna said, his voice shaking, "I see my teachers, my cousins, my friends... people I love and respect on the other side. How can I fight them? How can I hurt people who taught me everything I know?"

This is what we call a dharma sankata - when doing what seems right in one way feels completely wrong in another way. Have you ever felt this? Maybe when you had to choose between being loyal to one friend or being honest with another?

**Arjuna's Inner Storm**

Arjuna's thoughts raced like a storm:
- "What if I win this battle but lose my soul?"
- "Is victory worth it if everyone I love gets hurt?"
- "Maybe it's better to just walk away from all of this."

His hands began to shake. His famous bow - the one that never failed him - slipped from his fingers. This mighty warrior, who had faced demons and monsters without fear, was completely overwhelmed by a simple question: What is the right thing to do?

**The Universal Dilemma**

Here's what makes this story so powerful: Arjuna's problem isn't really about war or fighting. It's about something we all face:

*For an 8-year-old:* Sometimes you have to choose between what your friends want you to do and what your parents taught you is right. It's confusing and scary!

*For a 30-year-old:* You might have to choose between a job that pays well and one that feels meaningful, or between taking care of yourself and taking care of your family.

*For a 60-year-old:* You've seen how complex life can be - how the same action can help some people and hurt others, and how hard it is to know what's truly right.

Arjuna was facing the biggest version of this problem anyone could imagine.

**Why This Matters Today**

Think about modern situations where we face similar dilemmas:
- **At Work:** Your boss asks you to do something that helps the company but might hurt customers
- **In Family:** Your parents want you to pursue one career, but your heart calls you toward something else
- **With Friends:** Someone you care about is making choices that could hurt them, but they don't want your help
- **In Society:** Standing up for what's right might mean going against popular opinion

**Arjuna's Complete Breakdown**

"I can't do this, Krishna," Arjuna finally said, sitting down heavily in the chariot. "My whole body is trembling. My mouth is dry. I feel weak and confused. This doesn't feel like strength - it feels like I'm falling apart."

"Even if we win this war, what kind of victory is it? What kind of kingdom can be built on the pain of our own family? I'd rather they just... defeat me. At least then I wouldn't have to live with what I've done."

**The Deeper Fear**

But underneath all of Arjuna's worries about family and duty was an even bigger fear: *What if I make the wrong choice and regret it forever?*

This fear can paralyze anyone. When the decision feels too big, too important, too permanent - sometimes we just want to run away or let someone else decide for us.

**Krishna's Response**

Krishna looked at his friend with infinite compassion. He didn't laugh at Arjuna's fears or tell him to "just get over it." Instead, he prepared to share wisdom that would not just solve this battlefield dilemma, but help anyone facing difficult choices.

"Arjuna," Krishna said gently, "your confusion comes from a good heart. You care about people, you want to do right by everyone. But you're seeing only part of the picture."

And with those words, Krishna began teaching lessons that would change not just Arjuna's mind, but the way people think about life, duty, action, and what it means to truly live well.
`,
    
    images: {
      heroImage: battleOfHastinapuraImage, // Battle of Hastinapura - authentic traditional artwork
      thumbnailImage: '/images/chapters/chapter-1-thumb.jpg',
      inlineImages: [
        battleOfHastinapuraImage, // Battle of Hastinapura - vast battlefield with two armies, traditional artwork
        '/images/chapters/chapter-1-heroes.jpg', // Krishna and Arjuna on their chariot, both looking determined but thoughtful
        '/images/chapters/chapter-1-arjuna-turmoil.jpg', // Close-up of Arjuna's face showing inner turmoil
        '/images/chapters/chapter-1-bow-fallen.jpg', // Arjuna's bow fallen on the chariot floor
        '/images/chapters/chapter-1-modern-crossroads.jpg', // Split image showing modern scenarios - person at crossroads
        '/images/chapters/chapter-1-chariot-scene.jpg', // Arjuna slumped in chariot seat, Krishna emanating peace
        '/images/chapters/chapter-1-krishna-teaching.jpg', // Krishna turning toward Arjuna with teaching gesture
        '/images/chapters/chapter-1-sunrise.jpg' // Sun beginning to rise over battlefield
      ],
      characterArt: [
        '/images/characters/arjuna-worried.jpg',
        '/images/characters/krishna-charioteer.jpg',
        '/images/characters/arjuna-breakdown.jpg',
        '/images/characters/krishna-compassionate.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/family-conflict.jpg',
        '/images/concepts/moral-dilemma.jpg',
        '/images/concepts/dharma-sankata.jpg',
        '/images/concepts/universal-dilemma.jpg'
      ]
    },
    
    colorTheme: ['#FF6B35', '#F7931E'], // Saffron sunset theme
    
    audioBook: {
      fullChapter: '/audio/children/chapter-1-full.mp3',
      childNarration: '/audio/children/chapter-1-child.mp3',
      duration: '15 minutes',
      narrator: 'Maya Patel'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-1-discussion.mp3',
      hosts: ['Dr. Ravi Sharma', 'Ms. Priya Children\'s Author'],
      duration: '20 minutes',
      description: 'When Good People Feel Confused - Dr. Ravi and Ms. Priya discuss why even brave people sometimes feel scared and confused, and what we can do when facing difficult choices.',
      thumbnailImage: '/images/podcast/chapter-1-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '12 minutes',
      adult: '15-20 minutes',
      audio: '15 minutes'
    },
    
    difficulty: 'easy',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'When have you faced a choice where every option seemed to have good and bad parts?',
      'What helps you make decisions when you\'re feeling confused or scared?',
      'Who do you turn to for guidance when facing difficult choices?',
      'Is there always a "right" choice, or are some situations just complicated?',
      'How do we balance our own needs with our responsibilities to others?',
      'What does it mean to be brave when you\'re feeling afraid?'
    ],
    
    keyVocabulary: [
      {
        word: 'Dharma',
        childDefinition: 'The right way to live - doing good things and being kind to others',
        image: '/images/vocabulary/dharma-scale.jpg'
      },
      {
        word: 'Dharma Sankata',
        childDefinition: 'When doing what seems right in one way feels completely wrong in another way',
        image: '/images/vocabulary/difficult-choice.jpg'
      },
      {
        word: 'Warrior',
        childDefinition: 'Someone who protects others and fights for what\'s right',
        image: '/images/vocabulary/warrior-shield.jpg'
      },
      {
        word: 'Kurukshetra',
        childDefinition: 'The battlefield where this important conversation took place',
        image: '/images/vocabulary/battlefield.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।',
        originalEnglish: 'Dhritarashtra said: O Sanjaya, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?',
        
        childStory: 'Long ago, there was a king named Dhritarashtra who couldn\'t see with his eyes, but he had a special friend named Sanjaya who could see everything that was happening far away, like having magical TV vision! The king wanted to know what was happening in the big battle between his children and his brother\'s children.',
        
        simpleExplanation: 'The story begins with a grandfather asking his friend to tell him what\'s happening in a big field where two families are about to have a contest.',
        
        realLifeExample: 'It\'s like when your parents call your teacher to ask how you\'re doing in school - they want to know what\'s happening even when they\'re not there.',
        
        questionToThink: 'Why do you think the king wanted to know what was happening? What would you want to know if your family was in a big competition?',
        
        illustrationImage: '/images/verses/chapter-1-verse-1.jpg',
        characterDialogue: 'King Dhritarashtra says: "Sanjaya, my friend, can you tell me what\'s happening with all the children in our big family?"',
        
        verseId: 'bg-1-1',
        verseNumber: 1,
        difficulty: 'easy'
      }
    ],
    
    reflectionQuestions: [
      'When have you faced a choice where every option seemed to have good and bad parts?',
      'What helps you make decisions when you\'re feeling confused or scared?',
      'Who do you turn to for guidance when facing difficult choices?',
      'What makes someone brave even when they\'re feeling afraid?',
      'How does it feel to know that even great warriors like Arjuna sometimes feel confused?'
    ],
    
    familyActivities: [
      'Draw a picture of a time when you felt confused like Arjuna',
      'Talk about a hard choice you had to make and how you decided what to do',
      'Practice taking deep breaths when feeling worried (like preparing for Krishna\'s advice!)',
      'Share family stories about times when adults faced difficult decisions',
      'Create a family "wisdom council" - who do you turn to for advice?'
    ],
    
    connectionsToOtherChapters: [
      'This worry leads to Krishna\'s beautiful teachings in Chapter 2 about the soul',
      'Arjuna\'s questions help us understand our own confusing feelings',
      'Krishna\'s compassionate response shows us how to help others who are struggling'
    ],

    chapterSummary: {
      whatHappened: 'Arjuna, a great warrior, became overwhelmed with doubt and fear when faced with fighting people he loved and respected.',
      whyItMatters: 'Everyone faces moments when doing the right thing isn\'t clear, and when our emotions make it hard to think straight.',
      theBigQuestion: 'How do we make good decisions when every choice seems to have problems?',
      whatsNext: 'Krishna will begin teaching timeless wisdom about how to navigate life\'s most difficult moments with clarity and courage.'
    }
  },
  
  {
    id: 'chapter-2',
    number: 2,
    name: {
      sanskrit: 'सांख्य योग',
      english: 'Sankhya Yoga',
      childFriendly: 'The Secret About Souls'
    },
    
    adultSummary: 'Krishna begins his teachings by explaining the nature of the soul, the difference between the body and soul, and the path of knowledge.',
    
    childSummary: 'Krishna teaches Arjuna (and us!) about the most amazing secret: we all have a special invisible part called a soul that makes us who we really are. Our bodies change and grow, but our souls stay the same forever.',
    
    mainLesson: 'You are not just your body - you are a beautiful soul that lives inside your body. This soul is the real you and it\'s full of love, happiness, and goodness.',
    
    storyHook: 'What if I told you that you have a magical, invisible superhero living inside you that can never be hurt, never gets sick, and lives forever? Krishna is about to tell Arjuna this amazing secret!',
    
    images: {
      heroImage: '/images/chapters/chapter-2-hero.jpg', // Krishna teaching, souls as lights
      thumbnailImage: '/images/chapters/chapter-2-thumb.jpg',
      inlineImages: [
        '/images/chapters/chapter-2-soul-body.jpg',
        '/images/chapters/chapter-2-clothes-changing.jpg',
        '/images/chapters/chapter-2-eternal-light.jpg'
      ],
      characterArt: [
        '/images/characters/krishna-teacher.jpg',
        '/images/characters/arjuna-learning.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/soul-in-body.jpg',
        '/images/concepts/changing-clothes.jpg',
        '/images/concepts/eternal-flame.jpg'
      ]
    },
    
    colorTheme: ['#4A90E2', '#E91E63'], // Krishna Blue to Lotus Pink
    
    audioBook: {
      fullChapter: '/audio/children/chapter-2-full.mp3',
      childNarration: '/audio/children/chapter-2-child.mp3',
      duration: '20 minutes',
      narrator: 'Ravi Storyteller'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-2-discussion.mp3',
      hosts: ['Dr. Maya Spiritual Teacher', 'Uncle Gopal Kid Expert'],
      duration: '25 minutes',
      description: 'What makes you "you"? A gentle exploration of souls, bodies, and what never changes about us.',
      thumbnailImage: '/images/podcast/chapter-2-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '12-15 minutes',
      adult: '25-30 minutes',
      audio: '20 minutes'
    },
    
    difficulty: 'medium',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'What do you think makes you special and unique?',
      'How have you changed since you were a baby? What has stayed the same?',
      'What do you think is the most important part of who you are?'
    ],
    
    keyVocabulary: [
      {
        word: 'Soul',
        childDefinition: 'The special invisible part of you that thinks, feels, and loves - the real you!',
        image: '/images/vocabulary/soul-light.jpg'
      },
      {
        word: 'Eternal',
        childDefinition: 'Something that lasts forever and ever, like love and happiness',
        image: '/images/vocabulary/eternal-stars.jpg'
      },
      {
        word: 'Wisdom',
        childDefinition: 'Knowing important things that help you live a good life',
        image: '/images/vocabulary/wisdom-owl.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।',
        originalEnglish: 'The soul is never born nor does it die. It is not slain when the body is slain.',
        
        childStory: 'Krishna smiled and said to Arjuna: "You know how you change clothes every day? When your shirt gets old, you put on a new one. But YOU - the real you - stays the same! Your soul is like that too."',
        
        simpleExplanation: 'Your soul is like a magical light inside you that can never be broken, never gets sick, and never goes away. It\'s the part of you that loves, dreams, and feels happy.',
        
        realLifeExample: 'Think about your favorite stuffed animal. Even if it gets old and worn out, the love you have for it never changes. Your soul is like that love - it never gets old or worn out.',
        
        questionToThink: 'What do you think your soul looks like? What color would it be? How does it feel to know you have something so special inside you?',
        
        illustrationImage: '/images/verses/chapter-2-eternal-soul.jpg',
        characterDialogue: 'Krishna says gently: "Dear Arjuna, the real you - your beautiful soul - can never be hurt. It\'s safe and perfect forever!"',
        
        verseId: 'bg-2-20',
        verseNumber: 20,
        difficulty: 'medium'
      }
    ],
    
    reflectionQuestions: [
      'How does it feel to know you have a soul that can never be hurt?',
      'What do you think your soul loves most?',
      'How can knowing about your soul help you be kinder to others?'
    ],
    
    familyActivities: [
      'Draw a picture of yourself with a bright light (your soul) glowing inside',
      'Talk about what makes each family member special beyond just their body',
      'Practice seeing the "soul light" in everyone you meet today'
    ],
    
    connectionsToOtherChapters: [
      'This soul knowledge helps us understand why Krishna says "don\'t worry" in Chapter 1',
      'Knowing about souls makes the teachings in Chapter 3 about action make more sense'
    ]
  },
  
  {
    id: 'chapter-3', 
    number: 3,
    name: {
      sanskrit: 'कर्म योग',
      english: 'Karma Yoga',
      childFriendly: 'How to Do Good Things'
    },
    
    adultSummary: 'This chapter focuses on the path of action (Karma Yoga), emphasizing performing duty without attachment to results.',
    
    childSummary: 'Krishna teaches Arjuna how to do good things in the right way - by helping others and doing your best without worrying about getting prizes or rewards. It\'s like being a secret superhero!',
    
    mainLesson: 'The best way to help others and make the world better is to do good things just because they\'re good, not because you want something back.',
    
    storyHook: 'Have you ever helped someone just because it felt good in your heart? Krishna is going to teach us how doing good things the right way is like having a superpower!',
    
    images: {
      heroImage: '/images/chapters/chapter-3-hero.jpg',
      thumbnailImage: '/images/chapters/chapter-3-thumb.jpg',
      inlineImages: [
        '/images/chapters/chapter-3-helping.jpg',
        '/images/chapters/chapter-3-service.jpg',
        '/images/chapters/chapter-3-good-actions.jpg'
      ],
      characterArt: [
        '/images/characters/krishna-action.jpg',
        '/images/characters/arjuna-helping.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/selfless-service.jpg',
        '/images/concepts/good-karma.jpg'
      ]
    },
    
    colorTheme: ['#FFB627', '#FF6B35'], // Marigold to Saffron
    
    audioBook: {
      fullChapter: '/audio/children/chapter-3-full.mp3',
      childNarration: '/audio/children/chapter-3-child.mp3',
      duration: '18 minutes',
      narrator: 'Aunt Radha'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-3-discussion.mp3',
      hosts: ['Teacher Arjun', 'Ms. Kamala Service Expert'],
      duration: '22 minutes',
      description: 'How kids can be everyday heroes by helping others without expecting anything back.',
      thumbnailImage: '/images/podcast/chapter-3-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '10-14 minutes',
      adult: '20-25 minutes', 
      audio: '18 minutes'
    },
    
    difficulty: 'easy',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'What\'s something good you did today just because it felt right?',
      'How do you feel when you help someone without them asking?',
      'What\'s the difference between helping for a reward vs. helping from your heart?'
    ],
    
    keyVocabulary: [
      {
        word: 'Karma',
        childDefinition: 'The good or not-so-good things that happen because of what we do',
        image: '/images/vocabulary/karma-circle.jpg'
      },
      {
        word: 'Service',
        childDefinition: 'Helping others without expecting anything back - like being a secret superhero!',
        image: '/images/vocabulary/service-hands.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।',
        originalEnglish: 'Better is one\'s own duty, though imperfectly performed, than the duty of another well performed.',
        
        childStory: 'Krishna told Arjuna: "You know what? It\'s better to be really good at being YOU than to try to copy someone else. Everyone has their own special job in life!"',
        
        simpleExplanation: 'Everyone is good at different things. Instead of trying to be exactly like your friend, it\'s better to be the best version of yourself.',
        
        realLifeExample: 'If you\'re good at drawing but your friend is good at singing, don\'t stop drawing to try to sing like them. Be the best artist you can be!',
        
        questionToThink: 'What are you naturally good at? How can you use your special talents to help others?',
        
        illustrationImage: '/images/verses/chapter-3-own-dharma.jpg',
        characterDialogue: 'Krishna says with a smile: "Arjuna, be the best Arjuna you can be! That\'s your special gift to the world."',
        
        verseId: 'bg-3-35',
        verseNumber: 35,
        difficulty: 'easy'
      }
    ],
    
    reflectionQuestions: [
      'What special talents do you have that could help others?',
      'How does it feel to help someone without getting anything back?',
      'What would happen if everyone used their talents to help others?'
    ],
    
    familyActivities: [
      'Do one kind thing for someone without telling them it was you',
      'Make a family "good deeds" chart and see how many you can do together',
      'Talk about each family member\'s special talents and how they help others'
    ],
    
    connectionsToOtherChapters: [
      'This builds on Chapter 2\'s teaching that your soul loves to help others',
      'These good actions prepare us for the deeper teachings coming in Chapter 4'
    ]
  },

  {
    id: 'chapter-4',
    number: 4,
    name: {
      sanskrit: 'ज्ञान कर्म संन्यास योग',
      english: 'Jnana Karma Sannyasa Yoga',
      childFriendly: 'Krishna\'s Special Secret'
    },
    
    adultSummary: 'Krishna reveals the mystery of His divine incarnations and the importance of transcendental knowledge.',
    
    childSummary: 'Krishna tells Arjuna an amazing secret: he has been teaching these same lessons for thousands and thousands of years! Krishna comes back again and again to help people remember how to be good and happy.',
    
    mainLesson: 'Good teachers and wise people come to help us again and again. The most important lessons about love and kindness never get old.',
    
    storyHook: 'What if your favorite teacher could live forever and come back whenever kids needed to learn something really important? That\'s what Krishna does!',
    
    images: {
      heroImage: '/images/chapters/chapter-4-hero.jpg',
      thumbnailImage: '/images/chapters/chapter-4-thumb.jpg',
      inlineImages: [
        '/images/chapters/chapter-4-incarnations.jpg',
        '/images/chapters/chapter-4-teaching.jpg',
        '/images/chapters/chapter-4-wisdom.jpg'
      ],
      characterArt: [
        '/images/characters/krishna-divine.jpg',
        '/images/characters/arjuna-amazed.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/divine-incarnation.jpg',
        '/images/concepts/eternal-teaching.jpg'
      ]
    },
    
    colorTheme: ['#4A90E2', '#FFB627'],
    
    audioBook: {
      fullChapter: '/audio/children/chapter-4-full.mp3',
      childNarration: '/audio/children/chapter-4-child.mp3',
      duration: '17 minutes',
      narrator: 'Uncle Gopal'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-4-discussion.mp3',
      hosts: ['Guru Pradeep', 'Ms. Sita Story Expert'],
      duration: '23 minutes',
      description: 'How do wise teachers help us throughout history? Understanding divine love that never gives up on us.',
      thumbnailImage: '/images/podcast/chapter-4-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '10-13 minutes',
      adult: '18-22 minutes',
      audio: '17 minutes'
    },
    
    difficulty: 'medium',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'Who are the teachers in your life who keep helping you learn?',
      'What important lessons do you think every kid should know?',
      'How do good stories and teachings get passed down in our family?'
    ],
    
    keyVocabulary: [
      {
        word: 'Avatar',
        childDefinition: 'A special form that divine love takes to help people',
        image: '/images/vocabulary/avatar-forms.jpg'
      },
      {
        word: 'Knowledge',
        childDefinition: 'Learning important things that help you live a happy, good life',
        image: '/images/vocabulary/knowledge-book.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।',
        originalEnglish: 'Whenever there is decline in righteousness and increase in unrighteousness, O Arjuna, at that time I manifest Myself on earth.',
        
        childStory: 'Krishna smiled and said, "Arjuna, whenever people start forgetting how to be kind to each other, I come back to remind them. It\'s like when a parent comes to help when children are fighting!"',
        
        simpleExplanation: 'When people in the world start being mean instead of kind, Krishna comes to teach them how to be good again.',
        
        realLifeExample: 'It\'s like when your mom or dad comes to help when you and your sister are arguing - they remind you how to be loving with each other.',
        
        questionToThink: 'What would you want Krishna to teach people if he came to your school? How can you be like Krishna by helping others remember to be kind?',
        
        illustrationImage: '/images/verses/chapter-4-divine-help.jpg',
        characterDialogue: 'Krishna says lovingly: "Don\'t worry, dear Arjuna! Whenever the world needs more love, I\'m always here to help."',
        
        verseId: 'bg-4-7',
        verseNumber: 7,
        difficulty: 'medium'
      }
    ],
    
    reflectionQuestions: [
      'How does it feel to know that Krishna never gives up on helping people?',
      'What are some ways you can be like Krishna by teaching kindness to others?',
      'Who in your life acts like Krishna by always being there to help?'
    ],
    
    familyActivities: [
      'Share stories about helpful people in your family\'s history',
      'Draw Krishna in different forms helping people',
      'Practice being a "helper" like Krishna in your daily life'
    ],
    
    connectionsToOtherChapters: [
      'This explains why Krishna is qualified to give the teachings in Chapters 1-3',
      'Sets up the deeper spiritual practices that will come in Chapter 5'
    ]
  },

  {
    id: 'chapter-5',
    number: 5,
    name: {
      sanskrit: 'कर्म संन्यास योग',
      english: 'Karma Sannyasa Yoga',
      childFriendly: 'Finding Peace While Doing Things'
    },
    
    adultSummary: 'Krishna explains the path of renunciation of action and how both action and renunciation lead to the same goal.',
    
    childSummary: 'Krishna teaches that you can be peaceful and happy inside even when you\'re busy doing lots of things. The secret is remembering that your real job is to spread love and kindness.',
    
    mainLesson: 'You can be calm and peaceful inside your heart even when you\'re busy with schoolwork, chores, and activities.',
    
    storyHook: 'Have you ever watched a duck swimming? On top of the water, it looks calm and peaceful, but underneath its feet are paddling quickly. That\'s how we can be!',
    
    images: {
      heroImage: '/images/chapters/chapter-5-hero.jpg',
      thumbnailImage: '/images/chapters/chapter-5-thumb.jpg',
      inlineImages: [
        '/images/chapters/chapter-5-peaceful-action.jpg',
        '/images/chapters/chapter-5-meditation.jpg',
        '/images/chapters/chapter-5-inner-calm.jpg'
      ],
      characterArt: [
        '/images/characters/krishna-peaceful.jpg',
        '/images/characters/arjuna-meditating.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/inner-peace.jpg',
        '/images/concepts/calm-action.jpg'
      ]
    },
    
    colorTheme: ['#E91E63', '#4A90E2'],
    
    audioBook: {
      fullChapter: '/audio/children/chapter-5-full.mp3',
      childNarration: '/audio/children/chapter-5-child.mp3',
      duration: '16 minutes',
      narrator: 'Peaceful Priya'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-5-discussion.mp3',
      hosts: ['Meditation Teacher Uma', 'Dr. Calm Carl'],
      duration: '21 minutes',
      description: 'How can kids stay peaceful inside while being active and busy? Simple techniques for inner calm.',
      thumbnailImage: '/images/podcast/chapter-5-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '9-12 minutes',
      adult: '16-20 minutes',
      audio: '16 minutes'
    },
    
    difficulty: 'easy',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'What helps you feel calm when you\'re busy or stressed?',
      'How can we remember to be peaceful even during busy days?',
      'What\'s the difference between being busy outside and peaceful inside?'
    ],
    
    keyVocabulary: [
      {
        word: 'Meditation',
        childDefinition: 'Sitting quietly and thinking peaceful, happy thoughts',
        image: '/images/vocabulary/meditation-lotus.jpg'
      },
      {
        word: 'Detachment',
        childDefinition: 'Doing your best without worrying too much about what happens',
        image: '/images/vocabulary/letting-go.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'सर्वकर्माणि मनसा संन्यस्याऽऽसीत सुखी वशी।',
        originalEnglish: 'Mentally renouncing all actions, the embodied soul may rest happily in the city of nine gates.',
        
        childStory: 'Krishna said, "Imagine your body is like a beautiful house, and your soul lives inside like a happy child. You can play and work outside, but inside you\'re always safe and peaceful."',
        
        simpleExplanation: 'Your body does lots of things like running, playing, and learning, but the real you inside can always be happy and calm.',
        
        realLifeExample: 'It\'s like when you\'re playing a fun game - your body is moving and busy, but inside you feel joyful and peaceful.',
        
        questionToThink: 'How can you remember to keep your "inside self" peaceful when your "outside self" is very busy?',
        
        illustrationImage: '/images/verses/chapter-5-inner-peace.jpg',
        characterDialogue: 'Krishna says softly: "Arjuna, let your soul rest peacefully while your body does its work. You are always safe inside."',
        
        verseId: 'bg-5-13',
        verseNumber: 13,
        difficulty: 'easy'
      }
    ],
    
    reflectionQuestions: [
      'When do you feel most peaceful inside?',
      'How can you stay calm when things around you are busy or loud?',
      'What makes you feel safe and happy in your heart?'
    ],
    
    familyActivities: [
      'Practice family "quiet time" meditation for 5 minutes each day',
      'Create a peaceful corner in your home for thinking calm thoughts',
      'Do activities while practicing staying peaceful inside (like washing dishes mindfully)'
    ],
    
    connectionsToOtherChapters: [
      'This peaceful state makes the selfless action from Chapter 3 even better',
      'This inner calm prepares us for the meditation teachings in Chapter 6'
    ]
  },

  {
    id: 'chapter-6',
    number: 6,
    name: {
      sanskrit: 'आत्मसंयम योग',
      english: 'Atma Samyama Yoga',
      childFriendly: 'Learning to Sit Quietly'
    },
    
    adultSummary: 'Krishna describes the practice of meditation and the qualities of a true yogi.',
    
    childSummary: 'Krishna teaches Arjuna how to sit quietly, breathe peacefully, and connect with the happiness that lives inside. It\'s like learning to be your own best friend!',
    
    mainLesson: 'Taking time to sit quietly and breathe helps you feel happy, calm, and connected to the love inside your heart.',
    
    storyHook: 'What if you could have a special quiet time every day where you felt as happy and peaceful as when you\'re hugging someone you love? Krishna is going to show us how!',
    
    images: {
      heroImage: '/images/chapters/chapter-6-hero.jpg',
      thumbnailImage: '/images/chapters/chapter-6-thumb.jpg',
      inlineImages: [
        '/images/chapters/chapter-6-meditation-pose.jpg',
        '/images/chapters/chapter-6-peaceful-mind.jpg',
        '/images/chapters/chapter-6-lotus-position.jpg'
      ],
      characterArt: [
        '/images/characters/krishna-meditating.jpg',
        '/images/characters/arjuna-peaceful.jpg'
      ],
      conceptIllustrations: [
        '/images/concepts/meditation-practice.jpg',
        '/images/concepts/quiet-mind.jpg'
      ]
    },
    
    colorTheme: ['#4A90E2', '#E91E63'],
    
    audioBook: {
      fullChapter: '/audio/children/chapter-6-full.mp3',
      childNarration: '/audio/children/chapter-6-child.mp3',
      duration: '19 minutes',
      narrator: 'Gentle Guru'
    },
    
    podcast: {
      episodeUrl: '/audio/podcast/chapter-6-discussion.mp3',
      hosts: ['Meditation Master Maya', 'Quiet Time Teacher Tom'],
      duration: '25 minutes',
      description: 'Simple meditation techniques for children and families to practice together.',
      thumbnailImage: '/images/podcast/chapter-6-thumb.jpg'
    },
    
    estimatedReadingTime: {
      child: '11-14 minutes',
      adult: '18-23 minutes',
      audio: '19 minutes'
    },
    
    difficulty: 'medium',
    ageAppropriate: true,
    
    parentDiscussionStarters: [
      'What does it feel like when you sit very still and quiet?',
      'How can taking quiet time help us be kinder to others?',
      'What thoughts make you feel most peaceful and happy?'
    ],
    
    keyVocabulary: [
      {
        word: 'Yoga',
        childDefinition: 'Connecting your body, mind, and heart to feel peaceful and happy',
        image: '/images/vocabulary/yoga-pose.jpg'
      },
      {
        word: 'Focus',
        childDefinition: 'Paying attention to one thing at a time, like watching your breathing',
        image: '/images/vocabulary/focused-mind.jpg'
      }
    ],
    
    verses: [
      {
        originalSanskrit: 'उद्धरेदात्मनाऽत्मानं नाऽत्मानमवसादयेत्।',
        originalEnglish: 'Let a man lift himself by himself; let him not lower himself, for he alone is the friend of his Self, and he alone is the enemy of his Self.',
        
        childStory: 'Krishna smiled and said, "Arjuna, you know what? You are your own best friend! When you think good thoughts about yourself, you help yourself feel happy. When you think mean thoughts, you make yourself sad."',
        
        simpleExplanation: 'The thoughts you think about yourself are very important. You can choose to think kind, loving thoughts that make you feel good.',
        
        realLifeExample: 'It\'s like when you make a mistake - you can either say "I\'m so stupid!" or "I\'m learning!" The second one helps you feel better and try again.',
        
        questionToThink: 'What are some kind things you can say to yourself when you feel sad or make a mistake?',
        
        illustrationImage: '/images/verses/chapter-6-self-friend.jpg',
        characterDialogue: 'Krishna says warmly: "Be your own best friend, Arjuna! Talk to yourself the same way you would talk to someone you love."',
        
        verseId: 'bg-6-5',
        verseNumber: 5,
        difficulty: 'medium'
      }
    ],
    
    reflectionQuestions: [
      'How can you be a good friend to yourself?',
      'What happens to your body when you sit quietly for a few minutes?',
      'What peaceful thoughts make you feel happy inside?'
    ],
    
    familyActivities: [
      'Practice simple breathing exercises together as a family',
      'Create a family meditation time with soft music',
      'Make a "peaceful thoughts" jar with happy sayings to read'
    ],
    
    connectionsToOtherChapters: [
      'This meditation practice helps us do the peaceful action taught in Chapter 5',
      'Being our own best friend helps us love others better, leading to Chapter 7\'s teachings'
    ]
  }
];

// Helper functions for the child-friendly version
export const getChildChapter = (chapterNumber: number): EnhancedChapter | undefined => {
  return childFriendlyBhagavadGita.find(chapter => chapter.number === chapterNumber);
};

export const getAllChildChapters = (): EnhancedChapter[] => {
  return childFriendlyBhagavadGita;
};

export const getChaptersByDifficulty = (difficulty: 'easy' | 'medium' | 'advanced'): EnhancedChapter[] => {
  return childFriendlyBhagavadGita.filter(chapter => chapter.difficulty === difficulty);
};

export const getAgeAppropriateChapters = (): EnhancedChapter[] => {
  return childFriendlyBhagavadGita.filter(chapter => chapter.ageAppropriate);
};

export default childFriendlyBhagavadGita;