// The floating Krishna avatar in the readers — the always-visible door to the
// chat sheet. Same ringed-avatar look as GuidePanel/JourneyCelebration so it
// reads as the same guide, not a new widget. Positioned by its parent: render
// it inside a flex:1 wrapper around the reader's page list and it sits above
// the playback bar automatically (the bar is a normal-flow sibling below).
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

const C = DharmaDesignSystem.colors;
const AVATAR_SIZE = 52; // GuidePanel's scale — the one Krishna size

// Image styles inside StyleSheet.create hit union errors (CLAUDE.md) — defined
// outside as a const.
const avatarStyle = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: AVATAR_SIZE / 2,
  resizeMode: 'cover',
} as const;

const KrishnaFab: React.FC<{
  onPress: () => void;
  /** Driven by the reader during page swipes (fades to ~0.6). */
  opacity?: Animated.Value;
}> = ({ onPress, opacity }) => (
  <Animated.View style={[styles.wrap, opacity ? { opacity } : null]} pointerEvents="box-none">
    <TouchableOpacity
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel="Ask Krishna about this"
    >
      <View style={styles.avatarRing}>
        <Image source={require('../../assets/krishna-avatar.png')} style={avatarStyle} />
      </View>
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  // GuidePanel's avatarRing, minus the card-shoulder offsets, plus a shadow
  // so it reads as floating.
  avatarRing: {
    width: AVATAR_SIZE + 6,
    height: AVATAR_SIZE + 6,
    borderRadius: (AVATAR_SIZE + 6) / 2,
    borderWidth: 2.5,
    borderColor: C.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.neutrals.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default KrishnaFab;
