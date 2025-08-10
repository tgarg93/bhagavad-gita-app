# Vapi Voice Agent Setup

This app now integrates with Vapi to provide voice conversations with Krishna! Follow these steps to set up your voice agent.

## 🚀 Quick Setup

### 1. Get Your Vapi Credentials
1. Go to [vapi.ai](https://vapi.ai) and create an account
2. Get your **Public API Key** from the dashboard
3. Optionally, create and configure a Krishna assistant, or let the app use the built-in configuration

### 2. Configure the App
Open `src/config/vapiConfig.ts` and update:

```typescript
export const VAPI_CONFIG = {
  // Replace with your actual Vapi public API key
  publicApiKey: 'YOUR_VAPI_PUBLIC_API_KEY',
  
  // Optional: Replace with your custom assistant ID if you created one
  assistantId: 'YOUR_ASSISTANT_ID', // Or leave as is to use built-in config
  
  // ... rest of configuration
};
```

### 3. Voice Configuration (Optional)
If you want to customize Krishna's voice:
1. Go to [ElevenLabs](https://elevenlabs.io) or your preferred voice provider
2. Get a voice ID for a calm, wise-sounding voice
3. Update the `voiceId` in the config file

## 🎭 Assistant Personality

The app includes a pre-configured Krishna personality that:
- Speaks with warmth, wisdom, and divine love  
- Uses simple language accessible to children and adults
- References Bhagavad Gita teachings when relevant
- Provides practical guidance for modern life
- Maintains a loving, patient, and wise demeanor

## 📱 How It Works

1. **Talk Tab**: Main voice conversation with Krishna
   - Tap the microphone button to start talking
   - Krishna will respond with wisdom and guidance
   - Real-time conversation with natural speech

2. **Stories Tab**: Audio stories from the Bhagavad Gita
   - The original podcast/audio playback functionality
   - Perfect for listening to longer narrations

3. **Chapters & Ask Krishna**: Existing text-based features

## 🔧 Troubleshooting

### "Voice Service Error" 
- Check your API key is correct in `vapiConfig.ts`
- Ensure you have internet connection
- Verify your Vapi account has sufficient credits

### "Connection Error"
- Check internet connectivity
- Try restarting the app
- Use the long-press menu for debugging options

### Audio Not Working
- Grant microphone permissions when prompted
- Check device volume settings
- Try using headphones if speaker audio is unclear

## 💡 Features

- **Real-time voice conversations** with Krishna
- **Call duration tracking** and progress rings
- **Mute/unmute** during calls  
- **Automatic session management**
- **Graceful error handling** with fallbacks
- **Debug tools** via long-press menu

## 🎯 Next Steps

1. Set up your Vapi credentials
2. Test the voice conversation feature
3. Customize the Krishna personality if desired
4. Enjoy meaningful conversations with digital Krishna!

---

**Note**: You'll need Vapi credits for voice conversations. Check their pricing at [vapi.ai/pricing](https://vapi.ai/pricing).