import AsyncStorage from '@react-native-async-storage/async-storage';

// Conditional import to avoid native module errors in Expo Go
let Vapi: any = null;
try {
  Vapi = require('@vapi-ai/react-native').default;
} catch (error) {
  console.log('Vapi not available (likely running in Expo Go)');
}

// Types for Vapi integration
export interface VapiCallStatus {
  isConnecting: boolean;
  isConnected: boolean;
  isActive: boolean;
  callDuration: number;
  error?: string;
}

export interface VapiEventHandlers {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onError?: (error: string) => void;
  onStatusUpdate?: (status: VapiCallStatus) => void;
}

const VAPI_CONFIG_KEY = 'vapi_config';

export class VapiService {
  private static instance: VapiService | null = null;
  private vapi: Vapi | null = null;
  private isInitialized: boolean = false;
  private callStartTime: number | null = null;
  private eventHandlers: VapiEventHandlers = {};
  private currentStatus: VapiCallStatus = {
    isConnecting: false,
    isConnected: false,
    isActive: false,
    callDuration: 0,
  };

  private constructor() {}

  static getInstance(): VapiService {
    if (!VapiService.instance) {
      VapiService.instance = new VapiService();
    }
    return VapiService.instance;
  }

  // Initialize Vapi with API key and assistant configuration
  async initialize(
    publicApiKey: string,
    assistantId?: string,
    assistantConfig?: any
  ): Promise<void> {
    try {
      console.log('Initializing Vapi service...');
      
      // Check if Vapi is available (for Expo Go compatibility)
      if (!Vapi) {
        console.log('Vapi SDK not available - running in demo mode');
        this.isInitialized = true;
        return;
      }
      
      // Store configuration for future use
      await AsyncStorage.setItem(VAPI_CONFIG_KEY, JSON.stringify({
        publicApiKey,
        assistantId,
        assistantConfig
      }));

      this.vapi = new Vapi(publicApiKey);
      this.setupEventListeners();
      this.isInitialized = true;
      
      console.log('Vapi service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Vapi service:', error);
      throw new Error('Vapi initialization failed');
    }
  }

  // Set up event listeners for Vapi calls
  private setupEventListeners(): void {
    if (!this.vapi) return;

    // Call started
    this.vapi.on('call-start', () => {
      console.log('Vapi call started');
      this.callStartTime = Date.now();
      this.currentStatus = {
        ...this.currentStatus,
        isConnecting: false,
        isConnected: true,
        isActive: true,
      };
      this.eventHandlers.onCallStart?.();
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);
    });

    // Call ended
    this.vapi.on('call-end', () => {
      console.log('Vapi call ended');
      this.callStartTime = null;
      this.currentStatus = {
        isConnecting: false,
        isConnected: false,
        isActive: false,
        callDuration: 0,
      };
      this.eventHandlers.onCallEnd?.();
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);
    });

    // Error occurred
    this.vapi.on('error', (error: any) => {
      console.error('Vapi error:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      this.currentStatus = {
        ...this.currentStatus,
        error: errorMessage,
        isConnecting: false,
      };
      this.eventHandlers.onError?.(errorMessage);
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);
    });

    // Speech started (user is talking)
    this.vapi.on('speech-start', () => {
      console.log('User started speaking');
    });

    // Speech ended (user stopped talking)
    this.vapi.on('speech-end', () => {
      console.log('User stopped speaking');
    });

    // Volume level updates
    this.vapi.on('volume-level', (level: number) => {
      // Can be used for visual feedback of voice activity
    });
  }

  // Start a voice call with Krishna assistant
  async startKrishnaCall(assistantId?: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vapi service not initialized');
    }

    try {
      console.log('Starting Krishna voice call...');
      this.currentStatus = {
        ...this.currentStatus,
        isConnecting: true,
        error: undefined,
      };
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);

      // Demo mode for Expo Go
      if (!this.vapi) {
        console.log('Running in demo mode - simulating call');
        setTimeout(() => {
          this.callStartTime = Date.now();
          this.currentStatus = {
            isConnecting: false,
            isConnected: true,
            isActive: true,
            callDuration: 0,
          };
          this.eventHandlers.onCallStart?.();
          this.eventHandlers.onStatusUpdate?.(this.currentStatus);
        }, 2000);
        return;
      }

      // Get stored configuration
      const configStr = await AsyncStorage.getItem(VAPI_CONFIG_KEY);
      const config = configStr ? JSON.parse(configStr) : {};

      const callOptions = {
        assistantId: assistantId || config.assistantId,
        // You can customize the assistant here or use a pre-configured one
        assistant: config.assistantConfig || {
          model: {
            provider: 'openai',
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `You are Krishna from the Bhagavad Gita, speaking to a devotee. You are wise, compassionate, and speak in a warm, loving tone. You help people understand the teachings of the Gita in simple, practical ways. Keep responses conversational and not too long. Always be encouraging and supportive. You can reference specific verses from the Bhagavad Gita when relevant.`
              }
            ],
          },
          voice: {
            provider: '11labs',
            voiceId: 'pNInz6obpgDQGcFmaJgB', // Default voice - can be customized
          },
          firstMessage: "🙏 Namaste! I am Krishna, and I'm here to guide you on your spiritual journey. How can I help you today?",
        }
      };

      await this.vapi.start(callOptions);
      console.log('Krishna call initiated');
    } catch (error) {
      console.error('Failed to start Krishna call:', error);
      this.currentStatus = {
        ...this.currentStatus,
        isConnecting: false,
        error: 'Failed to connect to Krishna. Please try again.',
      };
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);
      throw error;
    }
  }

  // End the current call
  async endCall(): Promise<void> {
    try {
      console.log('Ending voice call...');
      
      // Demo mode
      if (!this.vapi) {
        this.callStartTime = null;
        this.currentStatus = {
          isConnecting: false,
          isConnected: false,
          isActive: false,
          callDuration: 0,
        };
        this.eventHandlers.onCallEnd?.();
        this.eventHandlers.onStatusUpdate?.(this.currentStatus);
        return;
      }

      await this.vapi.stop();
    } catch (error) {
      console.error('Error ending call:', error);
    }
  }

  // Mute/unmute the call
  async setMuted(muted: boolean): Promise<void> {
    if (!this.vapi) return;

    try {
      await this.vapi.setMuted(muted);
      console.log(`Call ${muted ? 'muted' : 'unmuted'}`);
    } catch (error) {
      console.error('Error setting mute status:', error);
    }
  }

  // Send a message during the call
  async sendMessage(message: string): Promise<void> {
    if (!this.vapi) return;

    try {
      await this.vapi.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: message,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // Get current call status
  getCallStatus(): VapiCallStatus {
    if (this.callStartTime && this.currentStatus.isActive) {
      return {
        ...this.currentStatus,
        callDuration: Math.floor((Date.now() - this.callStartTime) / 1000),
      };
    }
    return this.currentStatus;
  }

  // Set event handlers
  setEventHandlers(handlers: VapiEventHandlers): void {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  // Check if Vapi is initialized and ready
  isReady(): boolean {
    return this.isInitialized && this.vapi !== null;
  }

  // Format call duration for display
  static formatCallDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Clean up resources
  destroy(): void {
    if (this.vapi) {
      this.vapi.stop();
      this.vapi = null;
    }
    this.isInitialized = false;
    this.callStartTime = null;
    this.eventHandlers = {};
    VapiService.instance = null;
  }
}

// Export singleton instance
export const vapiService = VapiService.getInstance();