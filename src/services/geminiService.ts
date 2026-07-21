// All Gemini traffic goes through the authenticated Supabase edge function
// `gemini-proxy` — the API key never ships in the app (C2 of the production
// plan). Prompts and the Krishna persona are still built HERE, client-side:
// the proxy is deliberately dumb so prompt iteration never needs a deploy.
//
// The public surface of this service is frozen: AskKrishnaScreen, checkService,
// krishnaContextService, CheckPage and ChapterReflection all call it exactly as
// they did when it wrapped the Google SDK directly.
import { GEMINI_CONFIG as CONFIG, CHAT_GENERATION_CONFIG, KRISHNA_PERSONA } from '../config/geminiConfig';
import { supabase, supabaseEnabled, ensureSignedIn, SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseClient';
import { capture } from './telemetryService';
import chatQuotaService, { ChatLimitError } from './chatQuotaService';

export interface GeminiMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface GeminiChatSession {
  messages: GeminiMessage[];
  isActive: boolean;
  isTyping: boolean;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Chat turns sent per request are capped so a long conversation can't outgrow
// the proxy's request-size guard. The system prompt always rides along.
const MAX_HISTORY_TURNS = 40;

class GeminiService {
  private isInitialized = false;
  // Full model-format history for the active Krishna chat (system turn first);
  // rebuilt per request because the proxy is stateless.
  private chatHistory: GeminiContent[] | null = null;
  private currentSession: GeminiChatSession = {
    messages: [],
    isActive: false,
    isTyping: false,
  };

  // The proxy holds the key; "initialized" now means the Supabase client exists
  // and has (or can get) a session. Kept async + throwing so callers'
  // error-recovery UI keeps working unchanged. The legacy apiKey parameter is
  // accepted and ignored.
  async initialize(_apiKey?: string): Promise<boolean> {
    if (!supabaseEnabled || !supabase) {
      this.isInitialized = false;
      throw new Error('AI proxy is not configured (missing Supabase settings)');
    }
    // Make sure a session exists before the first real call; harmless if
    // offline — the actual request will fail into the callers' fallbacks.
    await ensureSignedIn();
    this.isInitialized = true;
    return true;
  }

  async autoInitialize(): Promise<boolean> {
    if (!this.isInitialized) {
      return await this.initialize();
    }
    return this.isInitialized;
  }

  // Single path to the proxy. Returns the generated text, throws on any failure
  // (callers already treat throw as "fall back / show error state").
  private async invokeProxy(
    contents: GeminiContent[],
    generationConfig: Record<string, unknown> = CONFIG.generationConfig
  ): Promise<string> {
    if (!supabase) {
      throw new Error('AI proxy is not configured');
    }
    const { data, error } = await supabase.functions.invoke('gemini-proxy', {
      body: {
        contents,
        generationConfig,
        safetySettings: CONFIG.safetySettings,
      },
    });
    if (error) {
      // FunctionsHttpError carries the HTTP response; surface the status so
      // isAuthError()/rate-limit handling can pattern-match the message.
      const status = (error as { context?: { status?: number } }).context?.status;
      if (status === 429) {
        throw new Error('429 rate limited: please slow down for a moment');
      }
      throw new Error(`Proxy error${status ? ` ${status}` : ''}: ${error.message}`);
    }
    const text = (data as { text?: string } | null)?.text;
    if (!text) {
      throw new Error('Empty response from AI proxy');
    }
    return text;
  }

  // Fire-and-forget container warm-up: wakes a cold edge instance so the real
  // send lands on a warm one. Costs nothing upstream (the proxy returns before
  // calling Gemini). Safe to call on chat open; failures are ignored.
  warmProxy(): void {
    if (!supabase) return;
    supabase.functions.invoke('gemini-proxy', { body: { warm: true } }).catch(() => {});
  }

  // Streaming path to the proxy. supabase-js buffers the whole response, and
  // React Native's fetch can't expose a readable body, so we use XMLHttpRequest
  // — its responseText accumulates and is readable while the request is still
  // open. The proxy pipes Gemini's SSE straight through; we parse each
  // `data: {json}` line and surface the growing text via onToken. Returns the
  // full text; throws on non-2xx or an empty/blocked stream, matching
  // invokeProxy's error shapes so callers' handling is unchanged.
  private invokeProxyStream(
    contents: GeminiContent[],
    generationConfig: Record<string, unknown>,
    onToken: (fullText: string) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      (async () => {
        if (!supabase || !SUPABASE_URL) {
          reject(new Error('AI proxy is not configured'));
          return;
        }
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session?.access_token ?? SUPABASE_ANON_KEY;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${SUPABASE_URL}/functions/v1/gemini-proxy`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);

        let processed = 0; // chars of responseText already parsed
        let assembled = '';
        let finishReason = '';
        let settled = false;

        // Parse any complete `data:` SSE lines that have arrived since last time,
        // leaving an incomplete trailing line in the buffer for the next event.
        // On flush (stream closed) consume everything, including a final line
        // that may lack a trailing newline.
        const drain = (flush = false) => {
          const text = xhr.responseText;
          const end = flush ? text.length : text.lastIndexOf('\n') + 1;
          if (end <= processed) return;
          const chunk = text.slice(processed, end);
          processed = end;
          for (const line of chunk.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;
            try {
              const parsed = JSON.parse(payload);
              const cand = parsed?.candidates?.[0];
              const delta: string = (cand?.content?.parts ?? [])
                .map((p: { text?: string }) => p.text ?? '')
                .join('');
              if (delta) {
                assembled += delta;
                onToken(assembled);
              }
              if (cand?.finishReason) finishReason = cand.finishReason;
            } catch {
              // Incomplete/again-partial JSON — ignore; the full stream is
              // re-read at readyState 4 as a fallback.
            }
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 3) {
            drain();
          } else if (xhr.readyState === 4) {
            if (settled) return;
            settled = true;
            if (xhr.status === 429) {
              reject(new Error('429 rate limited: please slow down for a moment'));
              return;
            }
            if (xhr.status < 200 || xhr.status >= 300) {
              reject(new Error(`Proxy error ${xhr.status}: stream failed`));
              return;
            }
            drain(true); // flush any final buffered lines
            if (!assembled) {
              reject(new Error(finishReason ? `No content (${finishReason})` : 'Empty response from AI proxy'));
              return;
            }
            resolve(assembled);
          }
        };
        xhr.onerror = () => {
          if (settled) return;
          settled = true;
          reject(new Error('Network error contacting AI proxy'));
        };

        xhr.send(JSON.stringify({
          contents,
          generationConfig,
          safetySettings: CONFIG.safetySettings,
          stream: true,
        }));
      })().catch(reject);
    });
  }

  // Start a new chat session with Krishna persona. Optionally seed it with a
  // compact context block about the person and what they're currently reading.
  startKrishnaChat(contextBlock?: string): void {
    if (!this.isInitialized) {
      throw new Error('Gemini service not initialized');
    }

    const systemText = contextBlock
      ? `${KRISHNA_PERSONA.systemPrompt}\n\nContext about this person and what they're reading (weave in naturally when relevant — never recite it back). If their name is known, address them by it naturally, though not in every message:\n${contextBlock}`
      : KRISHNA_PERSONA.systemPrompt;

    this.chatHistory = [
      { role: 'user', parts: [{ text: systemText }] },
      { role: 'model', parts: [{ text: KRISHNA_PERSONA.welcomeMessage }] },
    ];

    this.currentSession = {
      messages: [
        {
          id: 'welcome-msg',
          text: KRISHNA_PERSONA.welcomeMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ],
      isActive: true,
      isTyping: false,
    };

    console.log('Krishna chat session started with updated persona');
  }

  // Send a message to Krishna. When onToken is supplied the reply streams: a
  // placeholder Krishna message is appended and its text grows as tokens arrive
  // (onToken fires after each update so the caller can re-render). Without it,
  // the buffered path is used. The chat path uses CHAT_GENERATION_CONFIG
  // (thinking off, short cap) — grading/reflection keep the shared config.
  async sendMessage(message: string, onToken?: () => void): Promise<GeminiMessage> {
    if (!this.isInitialized || !this.chatHistory) {
      throw new Error('Chat session not started');
    }

    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
    }

    // Free-tier gate: 5 conversational sends per device-local day, checked
    // BEFORE any history mutation so a blocked send leaves no phantom user
    // bubble and needs no rollback. One-off paths (reflections, summaries)
    // bypass this by design. The server ai_usage RPC (10/min, 60/day) stays
    // the hard backstop behind it.
    if ((await chatQuotaService.getRemainingToday()) <= 0) {
      throw new ChatLimitError();
    }

    // Counts only — chat content never leaves the Gemini pipeline
    capture('krishna_message_sent', { messageLength: message.length });

    // Add user message to session
    const userMessage: GeminiMessage = {
      id: `user-${Date.now()}`,
      text: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    this.currentSession.messages.push(userMessage);
    this.currentSession.isTyping = true;

    // A holder (not a bare let) so it survives assignment inside the streaming
    // closure without TypeScript narrowing it to null — and so the catch can
    // drop a partially-streamed bubble on error.
    const streamed: { msg: GeminiMessage | null } = { msg: null };

    try {
      this.chatHistory.push({ role: 'user', parts: [{ text: message }] });

      // System turn + welcome always lead; recent turns follow.
      const [systemTurn, welcomeTurn, ...rest] = this.chatHistory;
      const contents = [systemTurn, welcomeTurn, ...rest.slice(-MAX_HISTORY_TURNS)];

      let responseText: string;

      if (onToken) {
        // Streaming: the placeholder appears on the first token (until then the
        // "reflecting…" indicator shows), and grows in place as text arrives.
        const handleToken = (fullText: string) => {
          if (!streamed.msg) {
            streamed.msg = {
              id: `krishna-${Date.now()}`,
              text: fullText,
              isUser: false,
              timestamp: new Date(),
            };
            this.currentSession.messages.push(streamed.msg);
            this.currentSession.isTyping = false;
          } else {
            streamed.msg.text = fullText;
          }
          onToken();
        };
        responseText = await this.invokeProxyStream(contents, CHAT_GENERATION_CONFIG, handleToken);
      } else {
        responseText = await this.invokeProxy(contents, CHAT_GENERATION_CONFIG);
      }

      // Spend quota on success only — offline failures, proxy errors, and
      // server 429s never burn one of the day's five. Awaited (not fire-and-
      // forget) so the caller's very next quota read reflects this send; a
      // storage failure is still swallowed locally so it can't cost Krishna's
      // reply.
      try {
        await chatQuotaService.consume();
      } catch {
        // best-effort — never blocks the reply
      }
      this.chatHistory.push({ role: 'model', parts: [{ text: responseText }] });

      // Finalize the reply. In the streaming path the placeholder already
      // exists (handleToken fires at least once at stream close); reconcile its
      // text to the authoritative full response. Otherwise create it now.
      if (streamed.msg) {
        streamed.msg.text = responseText;
      } else {
        streamed.msg = {
          id: `krishna-${Date.now()}`,
          text: responseText,
          isUser: false,
          timestamp: new Date(),
        };
        this.currentSession.messages.push(streamed.msg);
      }
      this.currentSession.isTyping = false;

      return streamed.msg;
    } catch (error) {
      // The failed user turn stays visible in the UI session but must not stay
      // in the model history, or a retry would double it.
      this.chatHistory.pop();
      // Drop a half-streamed Krishna bubble so the caller's error message isn't
      // left sitting beside a truncated reply.
      if (streamed.msg) {
        this.currentSession.messages = this.currentSession.messages.filter(m => m !== streamed.msg);
      }
      this.currentSession.isTyping = false;
      console.error('Error sending message to Krishna:', error);
      throw error;
    }
  }

  // Generic one-off generation (no chat session). Used for profile summaries
  // and other single-shot tasks.
  async generateOneOff(prompt: string, opts?: { maxOutputTokens?: number }): Promise<string> {
    if (!this.isInitialized) {
      await this.autoInitialize();
    }
    // Thinking models spend reasoning tokens against maxOutputTokens, so
    // structured-output tasks need more headroom than chat replies
    const generationConfig = opts?.maxOutputTokens
      ? { ...CONFIG.generationConfig, maxOutputTokens: opts.maxOutputTokens }
      : CONFIG.generationConfig;
    const text = await this.invokeProxy(
      [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig
    );
    return text.trim();
  }

  // One-off Krishna response to a content reflection (Gita chapter, festival,
  // deity, or concept) — does NOT touch the persistent Ask-Krishna chat session.
  async generateReflectionResponse(context: {
    chapterNumber?: number; // present for Gita chapters only
    chapterTitle: string; // content title otherwise
    subtitle: string;
    question: string;
    answer: string;
    contextBlock?: string;
  }): Promise<string> {
    const readingLine =
      context.chapterNumber != null
        ? `The reader has just finished reading Chapter ${context.chapterNumber} of the Bhagavad Gita, "${context.chapterTitle}" (${context.subtitle}).`
        : `The reader has just finished reading about ${context.chapterTitle} (${context.subtitle}).`;

    const prompt = `${KRISHNA_PERSONA.systemPrompt}
${context.contextBlock ? `\nContext about this person (weave in naturally when relevant — never recite it back). If their name is known, address them by it naturally, though not in every message:\n${context.contextBlock}\n` : ''}
You are responding to a personal reflection, not a chat message. ${readingLine}

Reflection question they were asked:
"${context.question}"

What they wrote:
"${context.answer}"

Respond as Krishna in 2-4 warm, personal sentences. Engage genuinely with what THEY actually wrote — reflect it back, don't lecture. Connect it gently to the teaching they just read. End with one soft thought or question that invites them to look a little deeper. Never grade or judge their answer. Do not use markdown formatting.`;

    return this.generateOneOff(prompt);
  }

  // Continue a reflection conversation (follow-up turns after the first exchange)
  async continueReflection(context: {
    chapterNumber?: number; // present for Gita chapters only
    chapterTitle: string; // content title otherwise
    question: string;
    transcript: { role: 'user' | 'krishna'; text: string }[];
    contextBlock?: string;
  }): Promise<string> {
    const convo = context.transcript
      .map(t => (t.role === 'user' ? `They said: "${t.text}"` : `You (Krishna) said: "${t.text}"`))
      .join('\n');

    const afterLine =
      context.chapterNumber != null
        ? `after Chapter ${context.chapterNumber} of the Bhagavad Gita ("${context.chapterTitle}")`
        : `after reading about ${context.chapterTitle}`;

    const prompt = `${KRISHNA_PERSONA.systemPrompt}
${context.contextBlock ? `\nContext about this person (weave in naturally when relevant — never recite it back). If their name is known, address them by it naturally, though not in every message:\n${context.contextBlock}\n` : ''}
You are in an ongoing personal reflection conversation ${afterLine}. The reflection question was:
"${context.question}"

Conversation so far:
${convo}

Continue the conversation as Krishna in 2-4 warm sentences. Respond to their latest message specifically. Never grade or judge. Do not use markdown formatting.`;

    return this.generateOneOff(prompt);
  }

  // Get current chat session — returns a fresh object so React state updates
  // always see a new identity (the service mutates its session in place)
  getCurrentSession(): GeminiChatSession {
    return {
      ...this.currentSession,
      messages: [...this.currentSession.messages],
    };
  }

  // Clear chat history
  clearChat(): void {
    this.currentSession.messages = [];
    this.currentSession.isActive = false;
    this.currentSession.isTyping = false;
    this.chatHistory = null;
  }

  // Check if service is ready
  isReady(): boolean {
    return this.isInitialized && supabaseEnabled;
  }

  // Get configuration
  getConfig() {
    return {
      enabled: supabaseEnabled,
      model: CONFIG.model,
      hasApiKey: supabaseEnabled, // legacy field: "credentials available" now means the proxy is reachable
    };
  }

  // Legacy runtime key entry — the proxy owns the key now; kept so old callers
  // simply re-run initialization.
  async setApiKey(_apiKey: string): Promise<boolean> {
    return await this.initialize();
  }
}

// True when an error is an authentication/authorization problem (bad or missing
// credentials/session) rather than a model/network failure — drives which
// recovery UI to show
export const isAuthError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return /api key|API_KEY_INVALID|PERMISSION_DENIED|\b401\b|\b403\b/i.test(message);
};

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;
