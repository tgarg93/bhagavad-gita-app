// Complete Bhagavad Gita verse text — all 700 verses across 18 chapters.
// Source: gita/gita (github.com/gita/gita), Unlicense / public domain.
// English translation: Swami Sivananda (public domain).
// The narrative reading experience lives in bhagavadGitaContent.ts; this file
// backs the per-chapter verse browser (every verse, verbatim).
import raw from './gitaVerses.json';

export interface GitaFullVerse {
  verse: number; // verse number within the chapter
  sanskrit: string; // Devanagari, may contain line breaks
  transliteration: string; // IAST
  english: string; // Swami Sivananda translation
}

export interface GitaFullChapter {
  number: number;
  verseCount: number;
  verses: GitaFullVerse[];
}

interface GitaVersesFile {
  source: string;
  chapters: GitaFullChapter[];
}

const data = raw as GitaVersesFile;

export const gitaVersesSource = data.source;

export const getChapterVerses = (chapterNumber: number): GitaFullVerse[] =>
  data.chapters.find(c => c.number === chapterNumber)?.verses ?? [];

export const getVerseCount = (chapterNumber: number): number =>
  data.chapters.find(c => c.number === chapterNumber)?.verseCount ?? 0;

export default data;
