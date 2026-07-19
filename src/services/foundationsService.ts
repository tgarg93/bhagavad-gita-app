// The Foundations track (the Jigyasu stage): which cards a reader has banked,
// how they did on each check, and whether they've passed the capstone.
//
// Owns the append-only `foundations_progress` key. Everything progression reads
// from here is DERIVED on each call (cardsBanked.length, count of correct
// checks, capstone.passed ? 1 : 0) — nothing is ever incrementally awarded, so
// points cannot drift out of sync with the underlying record.
import LocalStorageService, {
  FoundationsProgress,
  FoundationsCapstoneResult,
} from './localStorageService';
import { capture } from './telemetryService';


export interface FoundationsStats {
  cardsBanked: number;
  checksPassed: number;
  ritesPassed: number;
}

export const EMPTY_FOUNDATIONS_STATS: FoundationsStats = {
  cardsBanked: 0,
  checksPassed: 0,
  ritesPassed: 0,
};

// Existing users have already walked part of the path. Foundations was inserted
// at the HEAD of it, so without this they'd be sent backwards: `getNextUnfinished`
// would hand them Act 1 and Home's "Continue" card would point at content they
// never asked for.
const NOT_A_NEW_USER_THRESHOLD = 3; // completed items

class FoundationsService {
  private static instance: FoundationsService;
  private initialised = false;

  static getInstance(): FoundationsService {
    if (!FoundationsService.instance) {
      FoundationsService.instance = new FoundationsService();
    }
    return FoundationsService.instance;
  }

  // Idempotent, cheap, and safe to call on every app open.
  //
  // Someone already several items into the path is not a new user, so we mark
  // Foundations complete for them rather than rewinding them to Act 1. The stage
  // stays fully visible and re-openable from the journey — nothing is hidden, and
  // no rite is granted, so they can still take the capstone for Shishya if they
  // want it. New users (0–2 completions) are untouched and start at Act 1.
  async init(): Promise<void> {
    if (this.initialised) return;
    this.initialised = true;
    try {
      const completion = await LocalStorageService.getContentCompletion();
      const alreadyMigrated = Object.keys(completion).some(id => id.startsWith('foundations:'));
      if (alreadyMigrated) return;
      if (Object.keys(completion).length < NOT_A_NEW_USER_THRESHOLD) return;

      const { FOUNDATIONS_ACTS } = require('../data/foundations');
      for (const act of FOUNDATIONS_ACTS) {
        await LocalStorageService.markContentCompleted(`foundations:${act.id}`);
      }
      console.log('[foundations] existing user — Foundations marked complete, not rewound');
    } catch (error) {
      console.log('[foundations] migration skipped:', error);
    }
  }

  async getProgress(): Promise<FoundationsProgress> {
    return LocalStorageService.getFoundationsProgress();
  }

  // Idempotent. Called when a card page becomes active in the reader.
  async bankCard(sectionId: string): Promise<boolean> {
    const progress = await this.getProgress();
    if (progress.cardsBanked.includes(sectionId)) return false;
    progress.cardsBanked.push(sectionId);
    await LocalStorageService.saveFoundationsProgress(progress);
    return true;
  }

  async isCardBanked(sectionId: string): Promise<boolean> {
    const progress = await this.getProgress();
    return progress.cardsBanked.includes(sectionId);
  }

  // Records an attempt at a graded check. A previously-correct answer is never
  // downgraded by a later wrong one — "nothing locked" cuts both ways.
  async recordCheck(checkId: string, correct: boolean): Promise<void> {
    const progress = await this.getProgress();
    const prior = progress.checks[checkId];
    if (correct && !prior?.correct) {
      capture('knowledge_check_passed', { checkId, attempts: (prior?.attempts ?? 0) + 1 });
    }
    progress.checks[checkId] = {
      correct: prior?.correct || correct,
      attempts: (prior?.attempts ?? 0) + 1,
      firstTry: prior ? prior.firstTry : correct,
      at: new Date().toISOString(),
    };
    await LocalStorageService.saveFoundationsProgress(progress);
  }

  async getCheckResult(checkId: string) {
    const progress = await this.getProgress();
    return progress.checks[checkId];
  }

  // One capstone per stage of the journey, keyed on riteId.
  async recordCapstone(result: Omit<FoundationsCapstoneResult, 'attempts' | 'at'>): Promise<void> {
    const progress = await this.getProgress();
    const prior = progress.capstones[result.riteId];
    if (result.passed && !prior?.passed) {
      capture('capstone_passed', { riteId: result.riteId, attempts: (prior?.attempts ?? 0) + 1 });
    }
    progress.capstones[result.riteId] = {
      ...result,
      // A capstone once passed stays passed — a later attempt can't un-earn it.
      passed: prior?.passed || result.passed,
      attempts: (prior?.attempts ?? 0) + 1,
      at: new Date().toISOString(),
    };
    await LocalStorageService.saveFoundationsProgress(progress);
  }

  async getCapstone(riteId: string): Promise<FoundationsCapstoneResult | undefined> {
    const progress = await this.getProgress();
    return progress.capstones[riteId];
  }

  // Rite ids the reader has actually earned. progressionService uses these as a
  // level FLOOR — a rite can raise the level a point total already earns, never
  // lower it, so nobody is demoted and nobody is trapped.
  async getPassedRites(): Promise<string[]> {
    const progress = await this.getProgress();
    return Object.values(progress.capstones)
      .filter(c => c.passed)
      .map(c => c.riteId);
  }

  async getStats(): Promise<FoundationsStats> {
    const progress = await this.getProgress();
    // Practice checks (McqCheck.practice) record results like any other check —
    // same UX, same storage — but never count toward points. The scored set is
    // frozen at 20 (see the arithmetic in foundations.ts); every check added by
    // the depth expansion is practice, so checksPassed can never grow past it.
    const { PRACTICE_CHECK_IDS } = require('../data/foundations');
    return {
      cardsBanked: progress.cardsBanked.length,
      checksPassed: Object.entries(progress.checks).filter(
        ([id, c]) => c.correct && !PRACTICE_CHECK_IDS.has(id)
      ).length,
      ritesPassed: Object.values(progress.capstones).filter(c => c.passed).length,
    };
  }
}

export const foundationsService = FoundationsService.getInstance();
export default foundationsService;
