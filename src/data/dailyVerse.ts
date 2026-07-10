// Verse of the day, drawn deterministically from the bundled 700 Gita verses
// (public-domain Sivananda translation). Deterministic by calendar date so the
// Home card and the morning notification agree, cycling the whole Gita ~every
// two years. Never runs dry — unlike the 5-item dailyInsights seed data.
import gitaVersesJson from './gitaVerses.json';

export interface DailyVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  reference: string; // "Bhagavad Gita 2.47"
}

interface RawChapter {
  number: number;
  verses: { verse: number; sanskrit: string; transliteration?: string; english: string }[];
}

const chapters = (gitaVersesJson as { chapters: RawChapter[] }).chapters;
const TOTAL = chapters.reduce((sum, ch) => sum + ch.verses.length, 0);

const verseAt = (flatIndex: number): DailyVerse => {
  let remaining = ((flatIndex % TOTAL) + TOTAL) % TOTAL;
  for (const ch of chapters) {
    if (remaining < ch.verses.length) {
      const v = ch.verses[remaining];
      return {
        chapter: ch.number,
        verse: v.verse,
        sanskrit: v.sanskrit,
        transliteration: v.transliteration ?? '',
        english: v.english,
        reference: `Bhagavad Gita ${ch.number}.${v.verse}`,
      };
    }
    remaining -= ch.verses.length;
  }
  // Unreachable, but keeps the type honest
  const first = chapters[0].verses[0];
  return {
    chapter: 1,
    verse: first.verse,
    sanskrit: first.sanskrit,
    transliteration: first.transliteration ?? '',
    english: first.english,
    reference: `Bhagavad Gita 1.${first.verse}`,
  };
};

export function getDailyVerse(date: Date = new Date()): DailyVerse {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  );
  return verseAt(dayNumber);
}

export function getRandomVerse(): DailyVerse {
  return verseAt(Math.floor(Math.random() * TOTAL));
}
