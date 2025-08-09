export interface Verse {
  id: string;
  chapterNumber: number;
  verseNumber: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi?: string;
  commentary: Commentary[];
  tags: string[];
  audioUrl?: string;
}

export interface Commentary {
  id: string;
  author: string;
  text: string;
  language: 'en' | 'hi' | 'sa';
}

export interface Chapter {
  id: string;
  number: number;
  name: {
    sanskrit: string;
    english: string;
    hindi?: string;
  };
  summary: string;
  verseCount: number;
  verses?: Verse[];
  themes: string[];
}

export interface UserProgress {
  userId: string;
  chaptersCompleted: number[];
  versesRead: string[];
  bookmarkedVerses: string[];
  favoriteVerses: string[];
  dailyStreak: number;
  lastReadDate: Date;
  totalReadingTime: number; // in minutes
}

export interface StudyNote {
  id: string;
  userId: string;
  verseId: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export interface DailyQuote {
  verse: Verse;
  reflection: string;
  date: string;
}