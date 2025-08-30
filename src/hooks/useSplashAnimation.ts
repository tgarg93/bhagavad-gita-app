import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export interface SplashAnimationValues {
  logoOpacity: Animated.Value;
  logoScale: Animated.Value;
  logoTranslateY: Animated.Value;
  textOpacity: Animated.Value;
  textTranslateY: Animated.Value;
  contentOpacity: Animated.Value;
  backgroundOpacity: Animated.Value;
}

export interface SplashAnimationConfig {
  onAnimationComplete: () => void;
  autoStart?: boolean;
}

export const useSplashAnimation = ({ 
  onAnimationComplete, 
  autoStart = true 
}: SplashAnimationConfig) => {
  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  const animationValues: SplashAnimationValues = {
    logoOpacity,
    logoScale,
    logoTranslateY,
    textOpacity,
    textTranslateY,
    contentOpacity,
    backgroundOpacity,
  };

  // Animation sequence
  const startAnimation = () => {
    // Phase 1: Logo fade-in and scale-up (0-1.8s)
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        delay: 200,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Phase 2: Text appear (1.8-2.3s)
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Phase 3: Focus pause (2.3-3.8s)
        setTimeout(() => {
          // Phase 4: Slide up to header position (3.8-5.0s)
          Animated.parallel([
            Animated.timing(logoTranslateY, {
              toValue: -200, // Approximate distance to header
              duration: 1200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(textTranslateY, {
              toValue: -200,
              duration: 1200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            // Phase 5: Content reveal (4.2-5.0s overlapping)
            Animated.timing(contentOpacity, {
              toValue: 1,
              duration: 800,
              delay: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            // Background fade to reveal main app
            Animated.timing(backgroundOpacity, {
              toValue: 0,
              duration: 800,
              delay: 800,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Animation complete - notify parent
            setTimeout(() => {
              onAnimationComplete();
            }, 200);
          });
        }, 1500); // Focus pause duration
      });
    });
  };

  // Auto-start animation on mount
  useEffect(() => {
    if (autoStart) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  return {
    animationValues,
    startAnimation,
  };
};