import 'dotenv/config';

// Custom fonts the design system names (DharmaDesignSystem.typography). Until
// now these were never bundled, so both platforms fell back to their system
// font — on Android that's Roboto, which renders larger/looser than iOS SF and
// made the whole app look oversized. The expo-font plugin embeds them natively.
// On Android we register per-weight faces UNDER the family name (fontDefinitions
// → app:fontWeight), because Android does NOT synthesize weights for custom
// fonts — the app sets fontWeight in hundreds of styles, so each weight needs a
// real face or bold would silently render regular. iOS matches weight from the
// faces' own metadata, so it just takes the flat path list.
const poppinsDir = './node_modules/@expo-google-fonts/poppins';
const crimsonDir = './node_modules/@expo-google-fonts/crimson-text';
const poppinsDefs = [
  { path: `${poppinsDir}/300Light/Poppins_300Light.ttf`, weight: 300, style: 'normal' },
  { path: `${poppinsDir}/400Regular/Poppins_400Regular.ttf`, weight: 400, style: 'normal' },
  { path: `${poppinsDir}/500Medium/Poppins_500Medium.ttf`, weight: 500, style: 'normal' },
  { path: `${poppinsDir}/600SemiBold/Poppins_600SemiBold.ttf`, weight: 600, style: 'normal' },
  { path: `${poppinsDir}/700Bold/Poppins_700Bold.ttf`, weight: 700, style: 'normal' },
  { path: `${poppinsDir}/800ExtraBold/Poppins_800ExtraBold.ttf`, weight: 800, style: 'normal' },
  { path: `${poppinsDir}/900Black/Poppins_900Black.ttf`, weight: 900, style: 'normal' },
  { path: `${poppinsDir}/400Regular_Italic/Poppins_400Regular_Italic.ttf`, weight: 400, style: 'italic' },
  { path: `${poppinsDir}/600SemiBold_Italic/Poppins_600SemiBold_Italic.ttf`, weight: 600, style: 'italic' },
];
const crimsonDefs = [
  { path: `${crimsonDir}/400Regular/CrimsonText_400Regular.ttf`, weight: 400, style: 'normal' },
  { path: `${crimsonDir}/600SemiBold/CrimsonText_600SemiBold.ttf`, weight: 600, style: 'normal' },
  { path: `${crimsonDir}/700Bold/CrimsonText_700Bold.ttf`, weight: 700, style: 'normal' },
  { path: `${crimsonDir}/400Regular_Italic/CrimsonText_400Regular_Italic.ttf`, weight: 400, style: 'italic' },
  { path: `${crimsonDir}/600SemiBold_Italic/CrimsonText_600SemiBold_Italic.ttf`, weight: 600, style: 'italic' },
  { path: `${crimsonDir}/700Bold_Italic/CrimsonText_700Bold_Italic.ttf`, weight: 700, style: 'italic' },
];
const iosFontPaths = [...poppinsDefs, ...crimsonDefs].map((d) => d.path);

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
      "expo-calendar",
      [
        "expo-font",
        {
          android: {
            fonts: [
              { fontFamily: "Poppins", fontDefinitions: poppinsDefs },
              { fontFamily: "Crimson Text", fontDefinitions: crimsonDefs },
            ],
          },
          ios: { fonts: iosFontPaths },
        },
      ],
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
      versionCode: 2
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