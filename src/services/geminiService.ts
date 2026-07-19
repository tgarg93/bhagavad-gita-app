import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG as CONFIG, KRISHNA_PERSONA } from '../config/geminiConfig';
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

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private chatSession: any = null;
  private isInitialized = false;
  private currentSession: GeminiChatSession = {
    messages: [],
    isActive: false,
    isTyping: false,
  };

  // Initialize the service with pre-configured API key
  async initialize(apiKey?: string): Promise<boolean> {
    try {
      const keyToUse = apiKey || CONFIG.apiKey;

      if (__DEV__) {
        console.log('Initializing Gemini service, config enabled:', CONFIG.enabled, 'API key available:', !!keyToUse);
      }

      if (!keyToUse || keyToUse.trim() === '') {
        throw new Error('API key is required');
      }

      this.genAI = new GoogleGenerativeAI(keyToUse);
      this.model = this.genAI.getGenerativeModel({ 
        model: CONFIG.model,
        generationConfig: CONFIG.generationConfig,
        safetySettings: CONFIG.safetySettings,
      });

      // Test the connection
      await this.model.generateContent('Hello');
      
      this.isInitialized = true;
      
      console.log('Gemini AI service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      this.isInitialized = false;
      throw error;
    }
  }

  // Auto-initialize with pre-configured key. Throws on failure so callers can
  // distinguish auth errors (bad key) from model/network errors.
  async autoInitialize(): Promise<boolean> {
    if (!CONFIG.enabled || !CONFIG.apiKey) {
      throw new Error('API key is required');
    }
    if (!this.isInitialized) {
      return await this.initialize();
    }
    return this.isInitialized;
  }

  // Start a new chat session with Krishna persona. Optionally seed it with a
  // compact context block about the person and what they're currently reading.
  startKrishnaChat(contextBlock?: string): void {
    if (!this.isInitialized || !this.model) {
      throw new Error('Gemini service not initialized');
    }

    const systemText = contextBlock
      ? `${KRISHNA_PERSONA.systemPrompt}\n\nContext about this person and what they're reading (weave in naturally when relevant — never recite it back). If their name is known, address them by it naturally, though not in every message:\n${contextBlock}`
      : KRISHNA_PERSONA.systemPrompt;

    this.chatSession = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemText }],
        },
        {
          role: 'model',
          parts: [{ text: KRISHNA_PERSONA.welcomeMessage }],
        },
      ],
    });

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
    if (!this.isInitialized || !this.chatSession) {
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
      // Send message to Gemini
      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      const responseText = response.text();

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
      this.currentSession.isTyping = false;
      console.error('Error sending message to Krishna:', error);
      throw error;
    }
  }

  // Generic one-off generation (no chat session). Used for profile summaries
  // and other single-shot tasks.
  async generateOneOff(prompt: string, opts?: { maxOutputTokens?: number }): Promise<string> {
    if (!this.isInitialized || !this.model) {
      await this.autoInitialize();
    }
    if (!this.model) {
      throw new Error('Gemini service not initialized');
    }
    // Gemini 2.5 Flash spends thinking tokens against maxOutputTokens, so
    // structured-output tasks need more headroom than chat replies
    const request = opts?.maxOutputTokens
      ? {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { ...CONFIG.generationConfig, maxOutputTokens: opts.maxOutputTokens },
        }
      : prompt;
    const result = await this.model.generateContent(request);
    const response = await result.response;
    return response.text().trim();
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
    if (!this.isInitialized || !this.model) {
      await this.autoInitialize();
    }
    if (!this.model) {
      throw new Error('Gemini service not initialized');
    }

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

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  // Continue a reflection conversation (follow-up turns after the first exchange)
  async continueReflection(context: {
    chapterNumber?: number; // present for Gita chapters only
    chapterTitle: string; // content title otherwise
    question: string;
    transcript: { role: 'user' | 'krishna'; text: string }[];
    contextBlock?: string;
  }): Promise<string> {
    if (!this.isInitialized || !this.model) {
      await this.autoInitialize();
    }
    if (!this.model) {
      throw new Error('Gemini service not initialized');
    }

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

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
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
    this.chatSession = null;
  }

  // Check if service is ready
  isReady(): boolean {
    return this.isInitialized && CONFIG.enabled;
  }

  // Get configuration
  getConfig() {
    return {
      enabled: CONFIG.enabled,
      model: CONFIG.model,
      hasApiKey: !!CONFIG.apiKey,
    };
  }

  // Set API key (for runtime configuration)
  async setApiKey(apiKey: string): Promise<boolean> {
    return await this.initialize(apiKey);
  }
}

// True when an error is an authentication/authorization problem (bad or missing
// API key) rather than a model/network failure — drives which recovery UI to show
export const isAuthError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return /api key|API_KEY_INVALID|PERMISSION_DENIED|\b401\b|\b403\b/i.test(message);
};

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;