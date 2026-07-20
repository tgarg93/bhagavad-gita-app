// The guided journey: which step comes next, what's complete, and the daily
// activity streak. Completion is a parallel system to progression points —
// the points formula in progressionService is untouched.
import LocalStorageService from './localStorageService';
import { capture } from './telemetryService';
import {
  ALL_MODULES,
  buildJourneyPath,
  JourneyItem,
  JourneyModule,
  JOURNEY_MODULES,
} from '../data/journeyPath';

const todayKey = (): string => {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
};

const yesterdayKey = (): string => {
  const y = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const m = String(y.getMonth() + 1).padStart(2, '0');
  const d = String(y.getDate()).padStart(2, '0');
  return `${y.getFullYear()}-${m}-${d}`;
};

class JourneyService {
  private static instance: JourneyService;

  static getInstance(): JourneyService {
    if (!JourneyService.instance) {
      JourneyService.instance = new JourneyService();
    }
    return JourneyService.instance;
  }

  // One-shot "Begin the path" intent. Onboarding renders outside the
  // navigator, so it can't navigate into the first item itself — it sets
  // this flag and HomeScreen consumes it on its first focus.
  private pendingStart = false;

  setPendingStart(): void {
    this.pendingStart = true;
  }

  consumePendingStart(): boolean {
    const value = this.pendingStart;
    this.pendingStart = false;
    return value;
  }

  // Read-only peek, unlike consumePendingStart — lets a screen check the flag
  // before first paint (e.g. to suppress content during the redirect) without
  // clearing it, since only the actual consumer should do that.
  hasPendingStart(): boolean {
    return this.pendingStart;
  }

  getPath(): JourneyItem[] {
    return buildJourneyPath();
  }

  async getCompletionMap(): Promise<Record<string, string>> {
    return LocalStorageService.getContentCompletion();
  }

  async isCompleted(id: string): Promise<boolean> {
    const map = await this.getCompletionMap();
    return !!map[id];
  }

  // Idempotent; refreshes scheduled notifications so nudge titles stay current
  async markCompleted(id: string): Promise<void> {
    const newlyCompleted = await LocalStorageService.markContentCompleted(id);
    if (newlyCompleted) {
      console.log('[journey] completed:', id);
      capture('journey_item_completed', { itemId: id });
      try {
        // Lazy require — notificationService imports journeyService for nudge content
        const { notificationService } = require('./notificationService');
        notificationService.rescheduleAll();
      } catch {
        // notifications not available (e.g. before native rebuild) — fine
      }
    }
  }

  // The next unfinished item on the path, scanning forward from afterId
  // (wrapping to the start); null when the whole path is complete
  async getNextUnfinished(afterId?: string): Promise<JourneyItem | null> {
    const path = this.getPath();
    const map = await this.getCompletionMap();
    const startIndex = afterId ? path.findIndex(item => item.id === afterId) + 1 : 0;
    for (let offset = 0; offset < path.length; offset++) {
      const item = path[(startIndex + offset) % path.length];
      if (!map[item.id]) return item;
    }
    return null;
  }

  async getModuleProgress(): Promise<
    { module: JourneyModule; title: string; done: number; total: number }[]
  > {
    const path = this.getPath();
    const map = await this.getCompletionMap();
    return ALL_MODULES.map(module => {
      const items = path.filter(item => item.module === module);
      return {
        module,
        title: JOURNEY_MODULES[module],
        done: items.filter(item => map[item.id]).length,
        total: items.length,
      };
    });
  }

  // Called on app open: maintains the daily activity streak
  async touchActivity(): Promise<{ streak: number }> {
    const activity = await LocalStorageService.getJourneyActivity();
    const today = todayKey();
    if (activity.lastActiveDate === today) return { streak: activity.streak };
    const streak = activity.lastActiveDate === yesterdayKey() ? activity.streak + 1 : 1;
    await LocalStorageService.saveJourneyActivity({ lastActiveDate: today, streak });
    return { streak };
  }

  async getStreak(): Promise<{ streak: number; lastActiveDate: string }> {
    const activity = await LocalStorageService.getJourneyActivity();
    return { streak: activity.streak, lastActiveDate: activity.lastActiveDate };
  }
}

export const journeyService = JourneyService.getInstance();
export default journeyService;
