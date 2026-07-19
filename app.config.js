import 'dotenv/config';

export default {
  expo: {
    name: "Dharma",
    slug: "dharma-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    platforms: ["ios", "android"],
    description: "Comprehensive Hindu wisdom platform with scriptures, festival calendar, daily insights, and AI-powered spiritual guidance.",
    plugins: [
      "expo-dev-client",
      "expo-notifications"
    ],
    splash: {
      image: "./assets/dharma-lotus-transparent.png",
      resizeMode: "contain",
      backgroundColor: "#fff7ed"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tushargarg.dharma",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSPhotoLibraryUsageDescription: "Choose a profile photo from your library"
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#fff7ed"
      },
      edgeToEdgeEnabled: true,
      package: "com.tushargarg.dharma"
    },
    extra: {
      geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
      appEnv: process.env.EXPO_PUBLIC_APP_ENV,
    }
  }
};