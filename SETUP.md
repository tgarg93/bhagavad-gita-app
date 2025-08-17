# Dharma App Setup Guide

## Environment Configuration

### 1. Copy Environment File
```bash
cp .env.example .env
```

### 2. Add Your API Keys to .env

#### Gemini AI (Required for Ask Krishna feature)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to `.env`:
```
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

#### VAPI (Optional - for future voice features)
1. Go to [VAPI Dashboard](https://dashboard.vapi.ai)
2. Get your API key and assistant ID
3. Add them to `.env`:
```
EXPO_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here
EXPO_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm start
```

## Features

### Ask Krishna (Gemini AI)
- Conversational AI powered by Google Gemini
- Natural, friend-like responses about Hindu philosophy and life guidance
- Requires Gemini API key in `.env`

### Daily Wisdom
- Sanskrit verses with translations
- Hindu-inspired minimal dark design
- Weekly spiritual themes

### Festival Calendar (Coming Soon)
- Hindu festival dates and information
- Cultural significance and practices

### Scriptures (Coming Soon)
- Bhagavad Gita and other Hindu texts
- Voice features powered by VAPI

## Security

- Never commit `.env` file to git
- API keys are loaded from environment variables
- Example configuration provided in `.env.example`

## Development

- Copy `src/config/*.example.ts` files to remove `.example` if needed
- All sensitive configuration uses environment variables
- App automatically enables features when API keys are provided