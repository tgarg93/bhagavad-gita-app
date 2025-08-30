import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import AnimatedLogo from '../components/AnimatedLogo';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const { animationValues } = useSplashAnimation({
    onAnimationComplete,
    autoStart: true,
  });

  const {
    logoOpacity,
    logoScale,
    logoTranslateY,
    textOpacity,
    textTranslateY,
    backgroundOpacity,
  } = animationValues;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Animated Background */}
      <Animated.View style={[styles.backgroundContainer, { opacity: backgroundOpacity }]}>
        <LinearGradient
          colors={[
            DharmaDesignSystem.colors.neutrals.creamCanvas,
            DharmaDesignSystem.colors.neutrals.warmIvory,
            DharmaDesignSystem.colors.neutrals.creamCanvas,
          ]}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Animated Logo */}
        <AnimatedLogo
          size={120}
          opacity={logoOpacity}
          scale={logoScale}
          translateY={logoTranslateY}
          style={styles.logo}
        />

        {/* Animated App Name */}
        <Animated.Text
          style={[
            styles.appTitle,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          Dharma
        </Animated.Text>

        {/* Subtle tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          Ancient Wisdom, Modern Life
        </Animated.Text>
      </View>

      {/* Decorative Elements */}
      <Animated.View 
        style={[
          styles.decorativeElement, 
          styles.topElement,
          { opacity: logoOpacity }
        ]}
      >
        <View style={styles.decorativeDot} />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.decorativeElement, 
          styles.bottomElement,
          { opacity: logoOpacity }
        ]}
      >
        <View style={styles.decorativeDot} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.xl,
  },
  logo: {
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  appTitle: {
    ...DharmaDesignSystem.typography.sizes.headingXL,
    fontSize: 42,
    fontWeight: '300',
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
    textShadowColor: 'rgba(255, 107, 53, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: DharmaDesignSystem.spacing.xs,
  },
  decorativeElement: {
    position: 'absolute',
    width: 6,
    height: 6,
  },
  topElement: {
    top: height * 0.2,
    right: width * 0.15,
  },
  bottomElement: {
    bottom: height * 0.2,
    left: width * 0.15,
  },
  decorativeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DharmaDesignSystem.colors.primary.turmericGold,
    opacity: 0.6,
  },
});

export default SplashScreen;