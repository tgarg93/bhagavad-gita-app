import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG as CONFIG, KRISHNA_PERSONA } from '../config/geminiConfig';

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

  // Auto-initialize with pre-configured key
  async autoInitialize(): Promise<boolean> {
    if (CONFIG.enabled && CONFIG.apiKey && !this.isInitialized) {
      try {
        return await this.initialize();
      } catch (error) {
        console.error('Auto-initialization failed:', error);
        return false;
      }
    }
    return this.isInitialized;
  }

  // Start a new chat session with Krishna persona
  startKrishnaChat(): void {
    if (!this.isInitialized || !this.model) {
      throw new Error('Gemini service not initialized');
    }

    this.chatSession = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: KRISHNA_PERSONA.systemPrompt }],
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

  // Get current chat session
  getCurrentSession(): GeminiChatSession {
    return this.currentSession;
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

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;