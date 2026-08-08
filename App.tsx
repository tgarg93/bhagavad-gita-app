import React, { useState, useEffect } from 'react';
import { AppState, AppStateStatus, Text as RNText, TextInput as RNTextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import * as Notifications from 'expo-notifications';
import { initTelemetry, capture } from './src/services/telemetryService';
import { initSupabaseAuth } from './src/services/supabaseClient';
import syncService from './src/services/syncService';
import AppNavigator, { navigationRef } from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { AudioNarrationService } from './src/services/audioNarrationService';
import LocalStorageService from './src/services/localStorageService';
import krishnaContext from './src/services/krishnaContextService';
import journeyService from './src/services/journeyService';
import notificationService from './src/services/notificationService';
import { navigateToContentRef } from './src/data/journeyPath';
import { profilePhotoStore } from './src/services/profilePhotoStore';

initTelemetry();

// --- App-wide typography defaults -------------------------------------------
const RNTextAny = RNText as unknown as {
  defaultProps?: Record<string, unknown>;
  render?: (...args: unknown[]) => any;
  __poppinsPatched?: boolean;
};
const RNTextInputAny = RNTextInput as unknown as { defaultProps?: Record<string, unknown> };

// Cap OS font scaling. Without this the device "Font size / Display size"
// accessibility setting multiplies every label with no ceiling (Android
// especially), blowing up the iOS-tuned layout. 1.2 keeps text readable for
// low-vision users without letting the design break; allowFontScaling stays on.
(RNTextAny.defaultProps ??= {}).maxFontSizeMultiplier = 1.2;
(RNTextInputAny.defaultProps ??= {}).maxFontSizeMultiplier = 1.2;

// Make Poppins the app-wide default family. The design system names Poppins but
// most Text styles set only fontWeight (no fontFamily), so they rendered in the
// system font — Roboto on Android, which looks oversized next to iOS. We can't
// use defaultProps.style (it does NOT merge — it's ignored whenever a style prop
// is present), so we wrap Text's render and inject Poppins as the BASE family;
// explicit styles (e.g. Crimson Text) still win because they come after it, and
// fontWeight resolves to a real Poppins face via the per-weight faces registered
// in app.config.js. Devanagari is skipped: Poppins has no such glyphs, so forcing
// it would render boxes — those keep the system font's Devanagari fallback.
const DEVANAGARI = /[ऀ-ॿ]/;
const hasDevanagari = (c: unknown): boolean =>
  typeof c === 'string' ? DEVANAGARI.test(c) : Array.isArray(c) ? c.some(hasDevanagari) : false;
const baseTextRender = RNTextAny.render;
if (baseTextRender && !RNTextAny.__poppinsPatched) {
  RNTextAny.__poppinsPatched = true;
  RNTextAny.render = function patchedTextRender(...args: unknown[]) {
    const element = baseTextRender.apply(this, args) as React.ReactElement<{ style?: unknown }>;
    const props = args[0] as { children?: unknown } | undefined;
    if (hasDevanagari(props?.children)) return element;
    return React.cloneElement(element, {
      style: [{ fontFamily: 'Poppins' }, element.props.style],
    });
  };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Initialize audio service for background playback
    const initializeAudio = async () => {
      try {
        const audioService = AudioNarrationService.getInstance();
        await audioService.initialize();
      } catch (error) {
        console.log('Audio initialization error:', error);
      }
    };

    initializeAudio();

    // Silent anonymous Supabase identity (retries on each foreground; the app
    // never waits on it — see supabaseClient.ts). Sync is push-only backup for
    // now (C3): server mirrors AsyncStorage, nothing is ever pulled.
    initSupabaseAuth();
    syncService.init();

      // Reopen a COMPLETED item — this is the one that used to land on the celebration

    // Check whether the spiritual-profile onboarding has been completed,
    // and opportunistically refresh the rolling profile summary
    LocalStorageService.getSpiritualProfile()
      .then(profile => setNeedsOnboarding(!profile.onboarded))
      .catch(() => setNeedsOnboarding(false));
    krishnaContext.maybeRefreshSummary();

    // Journey streak + notification refresh (reschedules only when permission
    // is already granted — the prompt itself happens at warmer moments)
    profilePhotoStore.init();
    notificationService.init();
    journeyService.touchActivity().then(() => {
      notificationService.rescheduleAll();
    });

    // Notification taps deep-link into the app. Retries briefly on cold
    // start until the navigation container is mounted and ready.
    const navigateFromNotification = (data: Record<string, unknown> | undefined, attempt = 0) => {
      if (!data?.url) return;
      if (!navigationRef.isReady()) {
        if (attempt < 20) setTimeout(() => navigateFromNotification(data, attempt + 1), 250);
        return;
      }
      const nav = navigationRef as any;
      if (data.url === 'dailychai') nav.navigate('MainTabs', { screen: 'Home' });
      else if (data.url === 'journey') nav.navigate('JourneyPath');
      else if (data.url === 'festival' && data.festivalId) {
        nav.navigate('FestivalDetail', { festivalId: data.festivalId });
      } else if (data.url === 'contentref' && typeof data.ref === 'string') {
        // The daily chai tap lands directly on the content it named (reader,
        // Gita player, deity/concept detail, …) via the shared ref router.
        navigateToContentRef(nav, data.ref);
      }
    };
    const tapSub = Notifications.addNotificationResponseReceivedListener(response => {
      navigateFromNotification(response.notification.request.content.data as any);
    });
    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (response) navigateFromNotification(response.notification.request.content.data as any);
      })
      .catch(() => {});

    // Top up the one-shot notification window on every real foreground resume.
    // The schedule is 28 days of future-dated one-shots, but the mount effect
    // above only runs on a COLD start — on iOS the app stays resident, so weeks
    // of warm resumes would otherwise drain the window to zero and everything
    // goes silent. Throttled so rapid app-switching doesn't churn it.
    let prevAppState = AppState.currentState;
    let lastForegroundReschedule = Date.now(); // mount already reschedules
    const RESCHEDULE_THROTTLE_MS = 2 * 60 * 60 * 1000; // 2h
    const appStateSub = AppState.addEventListener('change', (next: AppStateStatus) => {
      const resumed = prevAppState.match(/inactive|background/) && next === 'active';
      prevAppState = next;
      if (!resumed) return;
      if (Date.now() - lastForegroundReschedule < RESCHEDULE_THROTTLE_MS) return;
      lastForegroundReschedule = Date.now();
      journeyService.touchActivity().then(() => notificationService.rescheduleAll());
    });

    return () => {
      tapSub.remove();
      appStateSub.remove();
    };
  }, []);

  // Handle splash animation completion
  const handleSplashComplete = () => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Show splash screen during initial load
  if (isLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // First launch: Krishna-guided onboarding before the main app
  if (needsOnboarding) {
    return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <OnboardingScreen
            onComplete={() => {
              capture('onboarding_completed');
              setNeedsOnboarding(false);
            }}
          />
          <StatusBar style="dark" />
        </ErrorBoundary>
      </SafeAreaProvider>
    );
  }

  // Show main app after splash
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AppNavigator />
        <StatusBar style="dark" />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
