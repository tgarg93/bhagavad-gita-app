import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

interface AnimatedLogoProps {
  size?: number;
  opacity?: Animated.Value;
  scale?: Animated.Value;
  translateY?: Animated.Value;
  style?: ViewStyle;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 80,
  opacity,
  scale,
  translateY,
  style,
}) => {
  const animatedStyle = {
    opacity: opacity || 1,
    transform: [
      { scale: scale || 1 },
      { translateY: translateY || 0 },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Animated.Image
        source={require('../../assets/dharma-lotus-logo.png')}
        style={[
          styles.logoImage,
          {
            width: size,
            height: size,
          }
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...DharmaDesignSystem.shadows.cultural,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    backgroundColor: 'transparent',
  },
});

export default AnimatedLogo;