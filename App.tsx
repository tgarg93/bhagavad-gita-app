import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from '@sentry/react-native';
import * as Notifications from 'expo-notifications';
import { initTelemetry, capture } from './src/services/telemetryService';
import { initSupabaseAuth } from './src/services/supabaseClient';
import AppNavigator, { navigationRef } from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { AudioNarrationService } from './src/services/audioNarrationService';
import LocalStorageService from './src/services/localStorageService';
import krishnaContext from './src/services/krishnaContextService';
import journeyService from './src/services/journeyService';
import notificationService from './src/services/notificationService';
import { profilePhotoStore } from './src/services/profilePhotoStore';

initTelemetry();

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
    // never waits on it — see supabaseClient.ts)
    initSupabaseAuth();

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
    return () => tapSub.remove();
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
      <ErrorBoundary>
        <OnboardingScreen
          onComplete={() => {
            capture('onboarding_completed');
            setNeedsOnboarding(false);
          }}
        />
        <StatusBar style="dark" />
      </ErrorBoundary>
    );
  }

  // Show main app after splash
  return (
    <ErrorBoundary>
      <AppNavigator />
      <StatusBar style="dark" />
    </ErrorBoundary>
  );
}

export default Sentry.wrap(App);
