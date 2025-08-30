import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

interface DharmaLogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const DharmaLogo: React.FC<DharmaLogoProps> = ({ size = 'medium', style }) => {
  const sizeConfig = {
    small: { width: 32, height: 32, fontSize: 16, borderRadius: 16 },
    medium: { width: 40, height: 40, fontSize: 20, borderRadius: 20 },
    large: { width: 48, height: 48, fontSize: 24, borderRadius: 24 },
  };

  const config = sizeConfig[size];

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../assets/dharma-lotus-logo.png')}
        style={[
          styles.logoImage,
          {
            width: config.width,
            height: config.height,
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...DharmaDesignSystem.shadows.soft,
  },
  logoImage: {
    // Your beautiful Krishna logo image
    backgroundColor: 'transparent',
  },
});

export default DharmaLogo;