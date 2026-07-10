import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { AudioNarrationService } from './src/services/audioNarrationService';
import LocalStorageService from './src/services/localStorageService';
import krishnaContext from './src/services/krishnaContextService';
import journeyService from './src/services/journeyService';
import notificationService from './src/services/notificationService';

export default function App() {
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

    // Check whether the spiritual-profile onboarding has been completed,
    // and opportunistically refresh the rolling profile summary
    LocalStorageService.getSpiritualProfile()
      .then(profile => setNeedsOnboarding(!profile.onboarded))
      .catch(() => setNeedsOnboarding(false));
    krishnaContext.maybeRefreshSummary();

    // Journey streak + notification refresh (reschedules only when permission
    // is already granted — the prompt itself happens at warmer moments)
    notificationService.init();
    journeyService.touchActivity().then(() => {
      notificationService.rescheduleAll();
    });
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
      <>
        <OnboardingScreen onComplete={() => setNeedsOnboarding(false)} />
        <StatusBar style="dark" />
      </>
    );
  }

  // Show main app after splash
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
