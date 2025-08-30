import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);

  // Handle splash animation completion
  const handleSplashComplete = () => {
    setSplashAnimationComplete(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Show splash screen during initial load
  if (isLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // Show main app after splash
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
