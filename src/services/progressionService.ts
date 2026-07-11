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

// What each name on the path means — shown when the name is first conferred
// (Jigyasu, in onboarding) and again at every level-up ceremony. One source
// for onboarding, celebrations, and the profile card.
export const LEVEL_MEANINGS: Record<number, string> = {
  1: 'The one who asks. In this tradition the wish to know — jigyasa — is itself sacred: every seeker in every Upanishad began exactly here. Nothing is required of a Jigyasu except sincere questions.',
  2: 'The one who sits near. Questions have become study — upa-ni-shad, sitting close to the teaching, is now what you do. The foundations are yours; the story begins.',
  3: 'The one who practices. Knowledge is becoming sadhana — something done, not only read. The Gita is the long climb, and you are on it.',
  4: 'The one whose practice has warmed into love. The faces of the divine are familiar now; what began as curiosity returns as devotion.',
  5: 'The one in whom the knowing has settled. The teachings are no longer information; they are how you see. Practice has made the knowing yours.',
  6: 'The one others sit near. What you carry has begun to light other rooms — the questions come to you now, and you recognize them as your own old ones.',
  7: 'The remover of darkness. The chain of handing-over — parampara — now runs through you. Sit near; then be sat near.',
};

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

// 0–1 progress through the band the given point total sits in. Lets the
// celebration animate its rung fill from a before-reading snapshot to now.
export const progressWithinBand = (points: number): number => {
  const level = levelForPoints(points);
  const nextLevel = LEVELS.find(l => l.level === level.level + 1) ?? null;
  if (!nextLevel) return 1;
  return Math.min(1, (points - level.minPoints) / (nextLevel.minPoints - level.minPoints));
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
