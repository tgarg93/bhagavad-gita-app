// Novice → Guru progression. The level is a pure function of data the app
// already stores (verse progress, chapter completion, reflections, and the
// Foundations track) — no new write paths, no drift. Krishna acts as the mentor
// across levels.
import LocalStorageService from './localStorageService';
import { foundationsService, EMPTY_FOUNDATIONS_STATS } from './foundationsService';
import { CHECK_POINTS } from '../data/checkTypes';
import { STAGE_RITES } from '../data/stageCapstones';

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
  3: 'The one who practices. Knowledge is becoming sadhana — something done, not only read. The eight ideas the tradition turns on are yours now, whole.',
  4: 'The one whose practice has warmed into love. The faces of the divine are familiar now; what began as curiosity returns as devotion.',
  5: 'The one in whom the knowing has settled. You have read the Gita entire — seven hundred verses — and it is no longer information. It is how you see.',
  6: 'The one others sit near. What you carry has begun to light other rooms — the questions come to you now, and you recognize them as your own old ones.',
  7: 'The remover of darkness. The chain of handing-over — parampara — now runs through you. Sit near; then be sat near.',
};

const POINTS = {
  versesRead: 2,
  chaptersCompleted: 30,
  reflections: 15,
  // Completing a journey item — worth what finishing a Gita chapter is worth.
  // Excludes Foundations and capstone items; see getProgression.
  journeyItem: 30,
};

// A rite is earned, not accumulated: passing it confers a level directly.
//
// Rites are a FLOOR, never a ceiling — the level a reader holds is
// max(what their points earn, what their rites confer). This is the whole trick:
//   • Nobody is demoted. A rite can only raise a level, so an existing user who
//     has never seen a capstone keeps exactly the level they had.
//   • Nobody is trapped. A reader who skips Foundations entirely still reaches
//     Shishya on points, so no content is ever locked behind the capstone.
// A ceiling (level = min(points, cap)) would break both of those, which is why
// this is a floor.
//
// One rite per stage of the journey. Each stage ends with a capstone that tests
// the stage's stated objective; passing it confers that stage's level.
//
// This is also the only reason Rishi and Guru are reachable at all. The entire
// journey yields ~2,962 points against thresholds of 3,000 and 5,000 — before
// rites existed, the top two levels could not be earned by any amount of reading.
const RITES: { riteId: string; conferLevel: number }[] = [
  { riteId: 'foundations-capstone', conferLevel: 2 }, // Shishya  — Foundations
  ...STAGE_RITES, // Sadhaka, Bhakta, Jnani, Rishi, Guru — stages 1-5
];

export interface Progression {
  points: number;
  level: GitaLevel;
  nextLevel: GitaLevel | null;
  pointsToNext: number; // 0 when at Guru
  progressToNext: number; // 0-1 within the current level band
  // True when the current level was conferred by a rite rather than earned on
  // points alone — i.e. points < level.minPoints. The profile card uses this to
  // avoid showing a progress bar that reads as empty.
  levelConferred: boolean;
  stats: {
    versesRead: number;
    chaptersCompleted: number;
    reflections: number;
    cardsBanked: number;
    checksPassed: number;
    ritesPassed: number;
    journeyItemsCompleted: number;
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
  return clamp01((points - level.minPoints) / (nextLevel.minPoints - level.minPoints));
};

// Both bounds matter. The upper one always did; the lower one became reachable
// when rites landed — a reader who passes the capstone at 87 points is conferred
// Shishya (minPoints 100), so points - level.minPoints goes NEGATIVE and an
// unclamped value renders a backwards progress bar in ProgressRungs.
const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

export const getProgression = async (): Promise<Progression> => {
  const [verseProgress, reflections, user, foundationsStats, passedRites, completion] =
    await Promise.all([
      LocalStorageService.getVerseProgress(),
      LocalStorageService.getAllReflections(),
      LocalStorageService.getCurrentUser(),
      foundationsService.getStats().catch(() => EMPTY_FOUNDATIONS_STATS),
      foundationsService.getPassedRites().catch(() => [] as string[]),
      LocalStorageService.getContentCompletion().catch(() => ({} as Record<string, string>)),
    ]);
  const userProgress = user
    ? await LocalStorageService.getUserProgress(user.id)
    : await LocalStorageService.getUserProgress('guest');

  // Finishing a journey item is worth something. It was worth ZERO until now,
  // which meant a user could complete every festival and every practice and move
  // no needle at all.
  //
  // Foundations items are EXCLUDED, and that exclusion is load-bearing. Its eight
  // parts are already scored per card (32 cards + 20 checks × 2 + 1 reflection = 87),
  // and the 87-under-100 gap is exactly what makes the Foundations capstone the
  // thing that tips a reader into Shishya. Paying another 8 × 30 there would put
  // the track at 327 and the reader would level up mid-way, deflating the whole
  // ceremony. Capstone items are excluded for the same reason — they pay a rite.
  const journeyItemsCompleted = Object.keys(completion).filter(
    id => !id.startsWith('foundations:') && !id.startsWith('capstone:')
  ).length;

  const stats = {
    versesRead: verseProgress.readVerses.length,
    chaptersCompleted: userProgress?.chaptersCompleted.length ?? 0,
    reflections: reflections.length,
    cardsBanked: foundationsStats.cardsBanked,
    checksPassed: foundationsStats.checksPassed,
    ritesPassed: foundationsStats.ritesPassed,
    journeyItemsCompleted,
  };

  // Every term is additive and non-negative. A user with none of this activity has
  // exactly the point total they had before the formula gained the term — nobody is
  // re-levelled by the change itself, only by new activity. Never add a term that
  // can subtract, and never raise a threshold: either one demotes somebody.
  const points =
    stats.versesRead * POINTS.versesRead +
    stats.chaptersCompleted * POINTS.chaptersCompleted +
    stats.reflections * POINTS.reflections +
    stats.cardsBanked * CHECK_POINTS.card +
    stats.checksPassed * CHECK_POINTS.mcq +
    stats.ritesPassed * CHECK_POINTS.rite +
    stats.journeyItemsCompleted * POINTS.journeyItem;

  const earned = levelForPoints(points);
  const conferred = RITES.filter(r => passedRites.includes(r.riteId)).reduce(
    (max, r) => Math.max(max, r.conferLevel),
    1
  );
  const levelNumber = Math.max(earned.level, conferred);
  const level = LEVELS.find(l => l.level === levelNumber) ?? LEVELS[0];

  const nextLevel = LEVELS.find(l => l.level === level.level + 1) ?? null;
  const pointsToNext = nextLevel ? Math.max(0, nextLevel.minPoints - points) : 0;
  const band = nextLevel ? nextLevel.minPoints - level.minPoints : 1;
  const progressToNext = nextLevel ? clamp01((points - level.minPoints) / band) : 1;

  return {
    points,
    level,
    nextLevel,
    pointsToNext,
    progressToNext,
    levelConferred: points < level.minPoints,
    stats,
  };
};
