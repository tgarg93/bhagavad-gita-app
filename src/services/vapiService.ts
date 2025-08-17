import AsyncStorage from '@react-native-async-storage/async-storage';
import { VAPI_CONFIG } from '../config/vapiConfig';

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
  private isTransitioning: boolean = false; // Prevent rapid state changes
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
      console.error('=== VAPI ERROR DETAILS ===');
      console.error('Error object:', JSON.stringify(error, null, 2));
      console.error('Error type:', typeof error);
      console.error('Error message:', error?.message);
      console.error('=========================');
      
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

    // Prevent rapid calls
    if (this.isTransitioning) {
      console.log('Call transition in progress, ignoring request');
      return;
    }

    try {
      this.isTransitioning = true;
      
      // Request microphone permission first
      try {
        const { PermissionsAndroid, Platform } = require('react-native');
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        }
      } catch (permError) {
        console.log('Permission request not available:', permError);
      }

      console.log('Starting Krishna voice call...');
      this.currentStatus = {
        ...this.currentStatus,
        isConnecting: true,
        error: undefined,
      };
      this.eventHandlers.onStatusUpdate?.(this.currentStatus);

      // Force simulator mode for now (you can toggle this for testing)
      const FORCE_SIMULATOR_MODE = true;
      
      if (FORCE_SIMULATOR_MODE || !this.vapi) {
        console.log('Running in simulator mode - enabling voice simulation');
        setTimeout(() => {
          this.callStartTime = Date.now();
          this.currentStatus = {
            isConnecting: false,
            isConnected: true,
            isActive: true,
            callDuration: 0,
          };
          this.isTransitioning = false; // Reset transition flag
          this.eventHandlers.onCallStart?.();
          this.eventHandlers.onStatusUpdate?.(this.currentStatus);
          
          // Simulate Krishna's first message
          setTimeout(() => {
            console.log('🙏 Krishna: Namaste! I am here to guide you. What would you like to know about life or the Gita?');
            
            // Simulate some interactive responses
            setTimeout(() => {
              console.log('🙏 Krishna: Feel free to ask me about dharma, finding peace, or any verse from the Gita...');
            }, 5000);
            
            setTimeout(() => {
              console.log('🙏 Krishna: Remember, you are the eternal soul, beyond the temporary body. What troubles your mind today?');
            }, 10000);
          }, 1000);
          
          // Simulate call duration updates
          const demoInterval = setInterval(() => {
            if (this.currentStatus.isActive && this.callStartTime) {
              const elapsed = Math.floor((Date.now() - this.callStartTime) / 1000);
              this.currentStatus = {
                ...this.currentStatus,
                callDuration: elapsed,
              };
              this.eventHandlers.onStatusUpdate?.(this.currentStatus);
            } else {
              clearInterval(demoInterval);
            }
          }, 1000);
        }, 2000);
        return;
      }

      // Get stored configuration
      const configStr = await AsyncStorage.getItem(VAPI_CONFIG_KEY);
      const config = configStr ? JSON.parse(configStr) : {};

      // Simple call options with just the assistant ID
      const callOptions = {
        assistantId: assistantId || config.assistantId || VAPI_CONFIG.assistantId
      };

      await this.vapi.start(callOptions);
      console.log('Krishna call initiated');
    } catch (error) {
      console.error('Failed to start Krishna call:', error);
      this.isTransitioning = false; // Reset on error
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
    // Prevent rapid end calls
    if (this.isTransitioning) {
      console.log('Call transition in progress, ignoring end request');
      return;
    }

    try {
      this.isTransitioning = true;
      console.log('Ending voice call...');
      
      // Force demo mode for simulator
      const FORCE_SIMULATOR_MODE = true;
      
      if (FORCE_SIMULATOR_MODE || !this.vapi) {
        console.log('Ending simulator call...');
        this.callStartTime = null;
        this.currentStatus = {
          isConnecting: false,
          isConnected: false,
          isActive: false,
          callDuration: 0,
        };
        this.isTransitioning = false; // Reset transition flag
        this.eventHandlers.onCallEnd?.();
        this.eventHandlers.onStatusUpdate?.(this.currentStatus);
        return;
      }

      await this.vapi.stop();
      this.isTransitioning = false;
    } catch (error) {
      this.isTransitioning = false; // Reset on error
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