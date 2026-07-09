// Novice → Guru progression. The level is a pure function of data the app
// already stores (verse progress, chapter completion, reflections) — no new
// write paths, no drift. Krishna acts as the mentor across levels.
import LocalStorageService from './localStorageService';

export interface GitaLevel {
  level: number;
  sanskrit: string;
  english: string;
  minPoints: number;
}

export const LEVELS: GitaLevel[] = [
  { level: 1, sanskrit: 'Jigyasu', english: 'The Curious', minPoints: 0 },
  { level: 2, sanskrit: 'Shishya', english: 'The Student', minPoints: 100 },
  { level: 3, sanskrit: 'Sadhaka', english: 'The Practitioner', minPoints: 300 },
  { level: 4, sanskrit: 'Bhakta', english: 'The Devoted', minPoints: 700 },
  { level: 5, sanskrit: 'Jnani', english: 'The Knower', minPoints: 1500 },
  { level: 6, sanskrit: 'Rishi', english: 'The Sage', minPoints: 3000 },
  { level: 7, sanskrit: 'Guru', english: 'The Guide', minPoints: 5000 },
];

const POINTS = {
  versesRead: 2,
  chaptersCompleted: 30,
  reflections: 15,
};

export interface Progression {
  points: number;
  level: GitaLevel;
  nextLevel: GitaLevel | null;
  pointsToNext: number; // 0 when at Guru
  progressToNext: number; // 0-1 within the current level band
  stats: {
    versesRead: number;
    chaptersCompleted: number;
    reflections: number;
  };
}

export const levelForPoints = (points: number): GitaLevel => {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (points >= l.minPoints) current = l;
  }
  return current;
};

export const getProgression = async (): Promise<Progression> => {
  const [verseProgress, reflections, user] = await Promise.all([
    LocalStorageService.getVerseProgress(),
    LocalStorageService.getAllReflections(),
    LocalStorageService.getCurrentUser(),
  ]);
  const userProgress = user
    ? await LocalStorageService.getUserProgress(user.id)
    : await LocalStorageService.getUserProgress('guest');

  const stats = {
    versesRead: verseProgress.readVerses.length,
    chaptersCompleted: userProgress?.chaptersCompleted.length ?? 0,
    reflections: reflections.length,
  };

  const points =
    stats.versesRead * POINTS.versesRead +
    stats.chaptersCompleted * POINTS.chaptersCompleted +
    stats.reflections * POINTS.reflections;

  const level = levelForPoints(points);
  const nextLevel = LEVELS.find(l => l.level === level.level + 1) ?? null;
  const pointsToNext = nextLevel ? Math.max(0, nextLevel.minPoints - points) : 0;
  const band = nextLevel ? nextLevel.minPoints - level.minPoints : 1;
  const progressToNext = nextLevel ? Math.min(1, (points - level.minPoints) / band) : 1;

  return { points, level, nextLevel, pointsToNext, progressToNext, stats };
};
