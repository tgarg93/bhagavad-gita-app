// The free-tier allowance for Krishna conversation: five user-sent messages
// per device-local calendar day, shared by every chat surface (the Ask Krishna
// tab and the reader sheet) because they all funnel through
// geminiService.sendMessage — the single enforcement point. One-off Gemini
// work (reflection grading, knowledge summaries) never touches this pool.
//
// This is a product limit, not abuse protection — the server-side ai_usage
// RPC (10/min, 60/day per anonymous user) remains the hard backstop.
// Counting is fail-open: a missing or corrupt record reads as a fresh day.
import LocalStorageService, { KrishnaChatQuota } from './localStorageService';
import { capture } from './telemetryService';

export const DAILY_CHAT_LIMIT = 5;

// Thrown by geminiService.sendMessage before any history mutation. The
// message must never match geminiService.isAuthError's regex — callers detect
// it with instanceof, never string matching.
export class ChatLimitError extends Error {
  constructor() {
    super('daily chat limit reached');
    this.name = 'ChatLimitError';
  }
}

export const isChatLimitError = (e: unknown): e is ChatLimitError => e instanceof ChatLimitError;

// Local YYYY-MM-DD — the same device-local convention as journeyService's
// todayKey / daily_chai_last_opened. Not toISOString(), which is UTC.
const todayKey = (): string => {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
};

const usedToday = async (): Promise<number> => {
  const quota = await LocalStorageService.getKrishnaChatQuota();
  if (!quota || quota.date !== todayKey()) return 0;
  return quota.count;
};

class ChatQuotaService {
  async getRemainingToday(): Promise<number> {
    return Math.max(0, DAILY_CHAT_LIMIT - (await usedToday()));
  }

  // Records one successful send; returns how many remain afterwards.
  // Fires the limit telemetry exactly once — on the send that spends the last
  // message of the day.
  async consume(): Promise<number> {
    const count = (await usedToday()) + 1;
    const record: KrishnaChatQuota = { date: todayKey(), count };
    await LocalStorageService.saveKrishnaChatQuota(record);
    const remaining = Math.max(0, DAILY_CHAT_LIMIT - count);
    if (remaining === 0 && count === DAILY_CHAT_LIMIT) {
      capture('krishna_chat_limit_reached');
    }
    return remaining;
  }
}

export const chatQuotaService = new ChatQuotaService();
export default chatQuotaService;
