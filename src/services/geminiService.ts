// All Gemini traffic goes through the authenticated Supabase edge function
// `gemini-proxy` — the API key never ships in the app (C2 of the production
// plan). Prompts and the Krishna persona are still built HERE, client-side:
// the proxy is deliberately dumb so prompt iteration never needs a deploy.
//
// The public surface of this service is frozen: AskKrishnaScreen, checkService,
// krishnaContextService, CheckPage and ChapterReflection all call it exactly as
// they did when it wrapped the Google SDK directly.
import { GEMINI_CONFIG as CONFIG, KRISHNA_PERSONA } from '../config/geminiConfig';
import { supabase, supabaseEnabled, ensureSignedIn } from './supabaseClient';
import { capture } from './telemetryService';

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

  // Send a message to Krishna
  async sendMessage(message: string): Promise<GeminiMessage> {
    if (!this.isInitialized || !this.chatHistory) {
      throw new Error('Chat session not started');
    }

    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
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

    try {
      this.chatHistory.push({ role: 'user', parts: [{ text: message }] });

      // System turn + welcome always lead; recent turns follow.
      const [systemTurn, welcomeTurn, ...rest] = this.chatHistory;
      const contents = [systemTurn, welcomeTurn, ...rest.slice(-MAX_HISTORY_TURNS)];

      const responseText = await this.invokeProxy(contents);
      this.chatHistory.push({ role: 'model', parts: [{ text: responseText }] });

      // Add Krishna's response to session
      const krishnaMessage: GeminiMessage = {
        id: `krishna-${Date.now()}`,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      this.currentSession.messages.push(krishnaMessage);
      this.currentSession.isTyping = false;

      return krishnaMessage;
    } catch (error) {
      // The failed user turn stays visible in the UI session but must not stay
      // in the model history, or a retry would double it.
      this.chatHistory.pop();
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
