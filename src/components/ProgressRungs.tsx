import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, AccessibilityInfo } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { GitaLevel, LEVELS } from '../services/progressionService';

// The seven-rung level strip, shared by the onboarding Jigyasu card, the
// lesson celebration, and the level-up ceremony. Semantics:
//   solid saffron = level completed · outlined saffron = where you stand
//   (the inside fills as you progress) · plain track = still ahead.
// Only the current and next rungs are large and named — the name sits in the
// same column as its rung so the labels can never drift out of alignment.

interface ProgressRungsProps {
  level: GitaLevel;
  nextLevel: GitaLevel | null;
  progressToNext: number; // 0-1 fill inside the current rung
  animateFrom?: number; // when set, the fill animates from this fraction
}

const BIG_W = 52;
const BIG_H = 10;
const SM_W = 14;
const SM_H = 6;

const { colors } = DharmaDesignSystem;
const TRACK = 'rgba(230, 81, 0, 0.16)';

const ProgressRungs: React.FC<ProgressRungsProps> = ({
  level,
  nextLevel,
  progressToNext,
  animateFrom,
}) => {
  const fillAnim = useRef(new Animated.Value(animateFrom ?? progressToNext)).current;

  useEffect(() => {
    if (animateFrom == null) {
      fillAnim.setValue(progressToNext);
      return;
    }
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        fillAnim.setValue(progressToNext);
      } else {
        Animated.timing(fillAnim, {
          toValue: progressToNext,
          duration: 900,
          delay: 350,
          useNativeDriver: false, // animates width
        }).start();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [animateFrom, progressToNext, fillAnim]);

  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BIG_W - 4], // inside the 2px outline
  });

  return (
    <View style={styles.row}>
      {LEVELS.map(l => {
        if (l.level === level.level) {
          return (
            <View key={l.level} style={styles.step}>
              <View style={styles.bigNow}>
                <Animated.View style={[styles.partial, { width: fillWidth }]} />
              </View>
              <Text style={styles.nameNow}>{l.sanskrit}</Text>
            </View>
          );
        }
        if (nextLevel && l.level === nextLevel.level) {
          return (
            <View key={l.level} style={styles.step}>
              <View style={styles.bigAhead} />
              <Text style={styles.nameNext}>{l.sanskrit}</Text>
            </View>
          );
        }
        return (
          <View
            key={l.level}
            style={[styles.small, l.level < level.level ? styles.smallDone : null]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
  },
  step: {
    alignItems: 'center',
    gap: 4,
  },
  bigNow: {
    width: BIG_W,
    height: BIG_H,
    borderRadius: BIG_H / 2,
    borderWidth: 2,
    borderColor: colors.primary.deepSaffron,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  partial: {
    height: BIG_H - 4,
    borderRadius: (BIG_H - 4) / 2,
    backgroundColor: colors.primary.deepSaffron,
  },
  bigAhead: {
    width: BIG_W,
    height: BIG_H,
    borderRadius: BIG_H / 2,
    backgroundColor: TRACK,
  },
  small: {
    width: SM_W,
    height: SM_H,
    borderRadius: SM_H / 2,
    backgroundColor: TRACK,
    marginTop: (BIG_H - SM_H) / 2,
  },
  smallDone: {
    backgroundColor: colors.primary.deepSaffron,
  },
  nameNow: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: '700',
    color: colors.primary.deepSaffron,
    width: BIG_W + 12,
    textAlign: 'center',
  },
  nameNext: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.neutrals.softAsh,
    width: BIG_W + 12,
    textAlign: 'center',
  },
});

export default ProgressRungs;
