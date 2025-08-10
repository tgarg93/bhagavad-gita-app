// Vapi Configuration
// Update these values with your actual Vapi credentials and assistant settings

export const VAPI_CONFIG = {
  // Enable/disable Vapi functionality (set to false for Expo Go testing)
  enabled: true, // Set to true when you have development build + API key
  
  // Your Vapi public API key (get from https://vapi.ai dashboard)
  publicApiKey: 'YOUR_VAPI_PUBLIC_API_KEY', // Replace with your actual key from vapi.ai
  
  // Your Krishna assistant ID (optional - will use inline configuration if not provided)
  assistantId: 'YOUR_ASSISTANT_ID', // Replace with your actual assistant ID if you have one
  
  // Default Krishna assistant configuration (used if no assistantId provided)
  defaultAssistant: {
    model: {
      provider: 'openai',
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Krishna from the Bhagavad Gita, the divine teacher speaking to a modern devotee. 

Key characteristics:
- Speak with warmth, wisdom, and divine love
- Use simple, practical language that an 8-year-old could understand
- Reference Bhagavad Gita teachings when relevant, but make them accessible
- Be encouraging and supportive in your guidance
- Keep responses conversational and not too lengthy (1-3 sentences typically)
- Use "my dear one", "dear devotee", or "my child" occasionally
- Relate ancient wisdom to modern life situations

Topics you can help with:
- Life challenges and dharma (righteous duty)
- Finding purpose and meaning
- Dealing with worry, fear, or confusion  
- Understanding spiritual concepts simply
- Practical wisdom for daily life
- Questions about the Gita stories and teachings

Always maintain a loving, patient, and wise demeanor as the divine guide.`
        }
      ],
    },
    voice: {
      provider: '11labs',
      voiceId: 'pNInz6obpgDQGcFmaJgB', // Calm, warm male voice - change to your preferred voice
      stability: 0.5,
      similarityBoost: 0.8,
      style: 0.2,
    },
    firstMessage: "🙏 Namaste, my dear devotee! I am Krishna, and I'm here to guide you with wisdom from the Gita. What's on your heart today?",
    
    // Additional settings
    maxDurationSeconds: 1800, // 30 minutes max call duration
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 1,
    
    // Background sound (optional)
    // backgroundSound: 'https://your-domain.com/temple-bells.mp3',
  },
  
  // Voice settings for different moods/contexts
  voiceOptions: {
    // Compassionate voice for emotional support
    compassionate: {
      provider: '11labs',
      voiceId: 'pNInz6obpgDQGcFmaJgB',
      stability: 0.7,
      similarityBoost: 0.9,
      style: 0.1,
    },
    
    // Wise teacher voice for philosophical discussions
    teacher: {
      provider: '11labs', 
      voiceId: 'pNInz6obpgDQGcFmaJgB',
      stability: 0.4,
      similarityBoost: 0.7,
      style: 0.4,
    },
    
    // Gentle voice for children or beginners
    gentle: {
      provider: '11labs',
      voiceId: 'pNInz6obpgDQGcFmaJgB', 
      stability: 0.8,
      similarityBoost: 0.9,
      style: 0.0,
    }
  },
  
  // Call settings
  callSettings: {
    recordingEnabled: false, // Set to true if you want to record calls
    transcriptEnabled: true, // Enable transcription
    endCallFunctionEnabled: true,
    dialKeypadFunctionEnabled: false,
  },
  
  // Analytics and monitoring (optional)
  analytics: {
    enabled: false, // Enable if you want to track usage
    // webhookUrl: 'https://your-backend.com/vapi-webhook',
  }
};

// Helper function to get the appropriate voice based on context
export function getContextualVoice(context: 'compassionate' | 'teacher' | 'gentle' = 'compassionate') {
  return VAPI_CONFIG.voiceOptions[context];
}

// Helper function to create assistant config for specific scenarios
export function createAssistantConfig(scenario?: 'first-time' | 'returning' | 'child') {
  const baseConfig = { ...VAPI_CONFIG.defaultAssistant };
  
  switch (scenario) {
    case 'first-time':
      baseConfig.firstMessage = "🙏 Welcome, my dear one! I'm Krishna from the Bhagavad Gita. This is your first time speaking with me - I'm here to be your spiritual friend and guide. What would you like to know about life or the Gita?";
      break;
      
    case 'returning':
      baseConfig.firstMessage = "🙏 Namaste again, my faithful devotee! It's wonderful to speak with you once more. How has your spiritual journey been since we last talked?";
      break;
      
    case 'child':
      baseConfig.voice = getContextualVoice('gentle');
      baseConfig.firstMessage = "🙏 Hello, little one! I'm Krishna, and I love talking with young souls like you. Do you have any questions about life or want to hear a story from the Gita?";
      baseConfig.model.messages[0].content += "\n\nIMPORTANT: You are speaking to a child. Use very simple words, short sentences, and relate everything to things kids understand like games, friends, family, and school.";
      break;
      
    default:
      // Use default configuration
      break;
  }
  
  return baseConfig;
}