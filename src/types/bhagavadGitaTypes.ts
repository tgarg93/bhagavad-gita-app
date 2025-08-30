// Enhanced Bhagavad Gita Types for Child-Friendly Experience

export interface AudioContent {
  fullChapter: string;         // Complete audiobook URL
  childNarration: string;      // Kid-friendly narrator version
  duration: string;            // "25 minutes"
  narrator: string;            // Voice actor name
  samplingRate?: string;       // Audio quality info
}

export interface PodcastContent {
  episodeUrl: string;          // Podcast discussion URL
  hosts: string[];             // Discussion leaders
  duration: string;            // "30 minutes"
  description: string;         // What they discuss
  thumbnailImage: string;      // Podcast episode thumbnail
  transcriptUrl?: string;      // Optional transcript
}

export interface ChapterImages {
  heroImage: string;           // Main chapter illustration
  thumbnailImage: string;      // Small icon for lists
  inlineImages: string[];      // Images throughout the chapter
  characterArt: string[];      // Krishna, Arjuna illustrations
  conceptIllustrations: string[]; // Abstract concept visuals
}

export interface ChildFriendlyVerse {
  // Original content (preserved)
  originalSanskrit: string;
  originalEnglish: string;
  originalHindi?: string;
  
  // Child adaptation
  childStory: string;          // "Once upon a time..." narrative
  simpleExplanation: string;   // Easy concepts for 8-year-olds
  realLifeExample: string;     // Modern examples kids relate to
  questionToThink: string;     // Reflection question
  
  // Visual elements
  illustrationImage?: string;   // Supporting image
  characterDialogue?: string;   // Krishna/Arjuna speaking to kids
  
  // Metadata
  verseId: string;
  verseNumber: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  parentalGuidance?: boolean;  // Needs adult discussion
}

export interface ChapterSummary {
  whatHappened: string;
  whyItMatters: string;
  theBigQuestion: string;
  whatsNext: string;
}

export interface EnhancedChapter {
  // Basic Info
  id: string;
  number: number;
  name: {
    sanskrit: string;
    english: string;
    childFriendly: string;     // "Arjuna's Big Worry" instead of "Arjuna Vishada Yoga"
  };
  
  // Content
  adultSummary: string;        // Current summary
  childSummary: string;        // 8-year-old friendly explanation
  mainLesson: string;          // Key takeaway for kids
  storyHook: string;           // Opening narrative hook
  fullStoryContent?: string;   // Complete rich narrative content with markdown
  chapterSummary?: ChapterSummary; // Structured summary
  
  // Visual Elements
  images: ChapterImages;
  colorTheme: string[];        // Gradient colors [primary, secondary]
  
  // Multimedia
  audioBook: AudioContent;
  podcast: PodcastContent;
  
  // Engagement
  estimatedReadingTime: {
    child: string;             // "10-15 minutes"
    adult: string;             // "20-25 minutes"
    audio: string;             // "18 minutes"
  };
  
  // Content Classification
  difficulty: 'easy' | 'medium' | 'advanced';
  ageAppropriate: boolean;     // Safe for 8-year-olds without guidance
  parentDiscussionStarters: string[]; // Family conversation prompts
  
  // Learning Elements
  keyVocabulary: Array<{
    word: string;
    childDefinition: string;
    image?: string;
  }>;
  
  // Verses (both original and child-friendly)
  verses: ChildFriendlyVerse[];
  
  // Interactive Elements
  reflectionQuestions: string[];
  familyActivities: string[];
  connectionsToOtherChapters: string[];
}

export interface ReadingProgress {
  chapterId: string;
  userId: string;
  
  // Progress tracking
  versesRead: number;
  totalVerses: number;
  percentComplete: number;
  
  // Time tracking
  timeSpent: number;          // in minutes
  lastReadDate: Date;
  
  // Engagement
  bookmarkedVerses: string[];
  favoritePassages: string[];
  notes: Array<{
    verseId: string;
    note: string;
    createdAt: Date;
  }>;
  
  // Achievement
  completed: boolean;
  completedDate?: Date;
  readingMode: 'text' | 'audio' | 'mixed'; // How they consumed it
}

export interface UserPreferences {
  userId: string;
  preferredMode: 'child' | 'adult' | 'mixed';
  fontSize: 'small' | 'medium' | 'large';
  audioSpeed: number;         // 1.0 = normal speed
  showSanskrit: boolean;
  showTransliteration: boolean;
  enableNotifications: boolean;
  dailyReadingGoal: number;   // minutes per day
}

// Audio player state management
export interface AudioPlayerState {
  isPlaying: boolean;
  currentChapter?: number;
  currentVerse?: number;
  position: number;           // seconds
  duration: number;           // seconds
  playbackRate: number;       // 0.5x to 2x speed
  mode: 'audiobook' | 'podcast';
}