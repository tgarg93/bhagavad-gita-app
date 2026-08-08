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
      "expo-notifications",
      "expo-calendar"
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
      // Remote push (win-back, §4.1). Declared here so a future `expo prebuild`
      // regenerates the entitlement; the committed ios/Dharma.entitlements
      // carries it for the current build (EAS builds the committed native dir
      // without re-running prebuild). 'development' → archive builds promote to
      // production APNs automatically at signing.
      entitlements: {
        "aps-environment": "development",
      },
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        // Keep narration playing when the app is backgrounded / the phone locks
        // / it's on car Bluetooth. Paired with staysActiveInBackground:true in
        // audioNarrationService (setAudioModeAsync REJECTS that flag without this
        // entitlement, so the two must ship in the same build).
        UIBackgroundModes: ["audio"],
        NSPhotoLibraryUsageDescription: "Choose a profile photo from your library",
        NSCalendarsUsageDescription: "Add festival dates to your calendar",
        NSCalendarsFullAccessUsageDescription: "Add festival dates to your calendar",
        NSRemindersUsageDescription: "Add festival dates to your calendar",
        NSRemindersFullAccessUsageDescription: "Add festival dates to your calendar"
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#fff7ed"
      },
      edgeToEdgeEnabled: true,
      package: "com.tushargarg.dharma",
      // Play Store build number. Bump by 1 before every Android upload (the
      // Android analog of iOS CFBundleVersion). Play rejects a re-used code.
      versionCode: 1
    },
    extra: {
      // The `extra` block is the config channel PROVEN to survive the Xcode
      // release bundling (dotenv/config above runs when EXConstants embeds this
      // file's output). Plain EXPO_PUBLIC_ babel inlining does NOT reliably
      // reach release bundles in this project — always mirror new runtime
      // config here and read it via Constants.expoConfig.extra first.
      appEnv: process.env.EXPO_PUBLIC_APP_ENV,
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      posthogApiKey: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
      posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST,
      eas: {
        projectId: "0cbde64b-e5b1-4bce-bdcd-e723aecb1a57"
      }
    }
  }
};