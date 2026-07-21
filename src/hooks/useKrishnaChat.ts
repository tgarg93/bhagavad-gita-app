// The one Krishna conversation, shared by every surface that renders it —
// the Ask Krishna tab and the reader chat sheet. The geminiService session is
// already a singleton; this hook is the matching singleton for the *screen*
// state around it (init, re-seed policy, quota, error handling), so the two
// surfaces can never drift on when a thread restarts or how the daily limit
// behaves.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  geminiService,
  isAuthError,
  GeminiMessage,
  GeminiChatSession,
} from '../services/geminiService';
import { isChatLimitError, DAILY_CHAT_LIMIT } from '../services/chatQuotaService';
import chatQuotaService from '../services/chatQuotaService';
import { KRISHNA_PERSONA, ERROR_MESSAGES, RATE_LIMITS } from '../config/geminiConfig';
import krishnaContext, { CurrentContent } from '../services/krishnaContextService';

// Krishna's one closing line for the day. Derived into displayMessages when
// the quota is spent — never stored, so it disappears on its own after
// midnight and renders identically on every surface.
const QUOTA_BUBBLE_TEXT =
  "You've asked your five for today — a good question deserves a night to settle. I'll be here tomorrow.";

// The chat restarts only when the *identity* of what's being read changes —
// not on every page swipe or snippet update. Module-level (not a per-instance
// ref) because two surfaces share one thread: if the sheet seeded the chat,
// the tab must not restart it just because its own stale ref disagrees.
let seededContentKey = '';

const coarseContentKey = (c: CurrentContent): string => {
  if (c.type === 'none') return 'none';
  if (c.type === 'verse' || c.type === 'chapter') return `gita:${c.chapter ?? ''}`;
  return `${c.type}:${c.title ?? ''}`;
};

export interface KrishnaChatInitError {
  isAuth: boolean;
  detail: string | null;
}

export interface KrishnaChat {
  session: GeminiChatSession;
  /** session.messages plus the derived quota bubble when today's five are spent */
  displayMessages: GeminiMessage[];
  inputText: string;
  setInputText: (t: string) => void;
  /** Sends inputText (or the given text). Handles quota, typing, and error bubbles. */
  send: (text?: string) => Promise<void>;
  /** Chip tap — fills the input, never auto-sends (protects the daily budget). */
  fillInput: (t: string) => void;
  /** Full re-init: rebuild context block and restart the thread. */
  reinitialize: () => Promise<void>;
  /** Pull the latest session/quota from the singletons (e.g. on focus). */
  refresh: () => Promise<void>;
  isInitialized: boolean;
  initError: KrishnaChatInitError | null;
  discussing: CurrentContent;
  /** null until first load */
  remainingToday: number | null;
  quotaExhausted: boolean;
}

export function useKrishnaChat(opts: {
  active: boolean;
  /** Called when a send is attempted before the service is ready (tab shows its key form). */
  onNotReady?: () => void;
}): KrishnaChat {
  const { active, onNotReady } = opts;
  const [session, setSession] = useState<GeminiChatSession>({
    messages: [],
    isActive: false,
    isTyping: false,
  });
  const [inputText, setInputText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<KrishnaChatInitError | null>(null);
  const [discussing, setDiscussing] = useState<CurrentContent>({ type: 'none' });
  const [remainingToday, setRemainingToday] = useState<number | null>(null);
  const initRunning = useRef(false);
  // Coalesces the per-token re-renders during streaming so a fast chunk stream
  // doesn't thrash React.
  const lastTokenRenderRef = useRef(0);

  const loadQuota = useCallback(async () => {
    setRemainingToday(await chatQuotaService.getRemainingToday());
  }, []);

  const reinitialize = useCallback(async () => {
    if (initRunning.current) return;
    initRunning.current = true;
    try {
      await geminiService.autoInitialize();
      const contextBlock = await krishnaContext.buildContextBlock();
      const current = krishnaContext.getCurrentContent();
      seededContentKey = coarseContentKey(current);
      setDiscussing(current);
      geminiService.startKrishnaChat(contextBlock);
      krishnaContext.maybeRefreshSummary();
      setSession(geminiService.getCurrentSession());
      setIsInitialized(true);
      setInitError(null);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setInitError({
        isAuth: isAuthError(error),
        detail: error instanceof Error ? error.message : String(error),
      });
    } finally {
      initRunning.current = false;
    }
    await loadQuota();
  }, [loadQuota]);

  const refresh = useCallback(async () => {
    if (geminiService.isReady()) {
      setSession(geminiService.getCurrentSession());
      setIsInitialized(true);
      setInitError(null);
      setDiscussing(krishnaContext.getCurrentContent());
    }
    await loadQuota();
  }, [loadQuota]);

  // Init / re-seed while this surface is the active one. A content-identity
  // change restarts the thread; anything else just refreshes from the shared
  // singletons (picking up messages the other surface sent).
  useEffect(() => {
    if (!active) return;
    // Wake a cold edge instance the moment the surface opens, so the first send
    // lands on a warm one. Costs nothing upstream.
    geminiService.warmProxy();
    const current = krishnaContext.getCurrentContent();
    if (!isInitialized && !initError) {
      reinitialize();
    } else if (
      isInitialized &&
      current.type !== 'none' &&
      coarseContentKey(current) !== seededContentKey
    ) {
      reinitialize();
    } else if (isInitialized) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const send = useCallback(
    async (text?: string) => {
      const messageText = (typeof text === 'string' ? text : inputText).trim();
      if (!messageText) return;

      if (!isInitialized || !geminiService.isReady()) {
        onNotReady?.();
        return;
      }

      if (messageText.length > RATE_LIMITS.maxMessageLength) {
        Alert.alert('Error', ERROR_MESSAGES.MESSAGE_TOO_LONG);
        return;
      }

      setInputText('');
      try {
        setSession(prev => ({ ...prev, isTyping: true }));
        // onToken fires as the reply streams in; throttle the re-renders and
        // always flush the final state right after the await below.
        const onToken = () => {
          const now = Date.now();
          if (now - lastTokenRenderRef.current < 60) return;
          lastTokenRenderRef.current = now;
          setSession(geminiService.getCurrentSession());
        };
        await geminiService.sendMessage(messageText, onToken);
        setSession(geminiService.getCurrentSession());
        setRemainingToday(await chatQuotaService.getRemainingToday());
      } catch (error) {
        if (isChatLimitError(error)) {
          // Blocked before any mutation (stale counter, midnight race, the
          // other surface spent the last one): give the typed text back and
          // flip to the exhausted state — no apology bubble.
          setSession(prev => ({ ...prev, isTyping: false }));
          setInputText(messageText);
          setRemainingToday(0);
          return;
        }
        console.error('Error sending message:', error);
        const errorMessage: GeminiMessage = {
          id: `error-${Date.now()}`,
          text: 'I apologize, but I am having trouble responding right now. Please try again in a moment.',
          isUser: false,
          timestamp: new Date(),
        };
        setSession(prev => ({
          ...prev,
          isTyping: false,
          messages: [...prev.messages, errorMessage],
        }));
      }
    },
    [inputText, isInitialized, onNotReady]
  );

  const fillInput = useCallback((t: string) => setInputText(t), []);

  const quotaExhausted = remainingToday === 0;
  const displayMessages = quotaExhausted
    ? [
        ...session.messages,
        {
          id: 'quota-msg',
          text: QUOTA_BUBBLE_TEXT,
          isUser: false,
          timestamp: new Date(),
        } as GeminiMessage,
      ]
    : session.messages;

  return {
    session,
    displayMessages,
    inputText,
    setInputText,
    send,
    fillInput,
    reinitialize,
    refresh,
    isInitialized,
    initError,
    discussing,
    remainingToday,
    quotaExhausted,
  };
}

// Suggested chips, shared so both surfaces stay in step. The tab keeps its
// historical behavior exactly; the sheet leads with one page-aware question
// built from what's being read right now.
export function buildSuggestedChips(
  discussing: CurrentContent,
  todaysPrompt: string,
  surface: 'tab' | 'sheet'
): string[] {
  if (discussing.type === 'verse') {
    return [
      'Explain this verse to me',
      'How does this apply to my life right now?',
      'What should I take away from this chapter?',
    ];
  }
  const base = [todaysPrompt, ...KRISHNA_PERSONA.conversationStarters];
  if (surface === 'sheet') {
    const pageAware =
      discussing.type === 'prayer' && discussing.title
        ? `What does the ${discussing.title} mean?`
        : discussing.type !== 'none' && discussing.title
        ? `Tell me more about ${discussing.title}`
        : null;
    if (pageAware) return [pageAware, ...base.slice(0, 2)];
    return base.slice(0, 3);
  }
  return base;
}

export { DAILY_CHAT_LIMIT };
