// The act's recurring guide surface — Krishna's ringed avatar tucked onto the
// shoulder of a white card, with the content inside the card. One component,
// three moments: the intro promises the learn list, the waypoints tick it off,
// and the celebration replays it done (JourneyCelebration draws the same shape
// with its own animations). Extracted from IntroCard when the waypoints
// adopted the design.
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

const C = DharmaDesignSystem.colors;
const AVATAR_SIZE = 52; // matches JourneyCelebration — same component, same scale

// Image styles inside StyleSheet.create hit union errors (CLAUDE.md) — defined
// outside as a const.
const avatarStyle = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: AVATAR_SIZE / 2,
  resizeMode: 'cover',
} as const;

const GuidePanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View>
    <View style={styles.avatarRing}>
      <Image source={require('../../assets/krishna-avatar.png')} style={avatarStyle} />
    </View>
    <View style={styles.panel}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  // Mirrors JourneyCelebration's avatarRing — tucked onto the card's shoulder.
  avatarRing: {
    width: AVATAR_SIZE + 6,
    height: AVATAR_SIZE + 6,
    borderRadius: (AVATAR_SIZE + 6) / 2,
    borderWidth: 2.5,
    borderColor: C.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginBottom: -14,
    zIndex: 2,
    backgroundColor: C.neutrals.white,
  },
  // Mirrors JourneyCelebration's bubble.
  panel: {
    alignSelf: 'stretch',
    backgroundColor: C.neutrals.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(230,81,0,0.12)',
    paddingTop: 24,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },
});

export default GuidePanel;
