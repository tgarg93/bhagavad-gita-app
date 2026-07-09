import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

interface KrishnaGuideProps {
  message: string;
  size?: number; // avatar size
  children?: React.ReactNode; // optional content under the message inside the bubble
}

// Krishna as the consistent guide across the app (onboarding, reflections,
// level-ups) — avatar + speech bubble, in the spirit of Duolingo's Duo.
const KrishnaGuide: React.FC<KrishnaGuideProps> = ({ message, size = 64, children }) => (
  <View style={styles.row}>
    <Image
      source={require('../../assets/krishna-logo.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
    <View style={styles.bubbleWrap}>
      <View style={styles.bubbleTail} />
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{message}</Text>
        {children}
      </View>
    </View>
  </View>
);

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  bubbleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleTail: {
    width: 0,
    height: 0,
    marginTop: spacing.lg,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.neutrals.white,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    ...shadows.soft,
  },
  bubbleText: {
    ...typography.sizes.bodyLG,
    color: colors.neutrals.charcoalBlack,
    lineHeight: 26,
  },
});

export default KrishnaGuide;
