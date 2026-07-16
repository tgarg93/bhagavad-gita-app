import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, AccessibilityInfo } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

// The completion screen's progress: a single arc for the CURRENT level band only
// — no next-stage stub, no future rungs. On arrival the arc (and the % in its
// centre) sweep from where the reader stood BEFORE this reading up to where it
// brought them, so the gain reads as motion rather than a separate "+N" chip.
// Scoped to the celebration; the seven-rung ProgressRungs strip is untouched and
// still used by onboarding + the level-up ceremony.

const { colors } = DharmaDesignSystem;

// Top semicircle: centre (105,105), radius 90 → endpoints (15,105)–(195,105).
const CX = 105;
const CY = 105;
const R = 90;
const STROKE = 16;
const ARC = Math.PI * R; // length of a semicircle
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

interface Props {
  fromFrac: number; // 0-1 fill before this reading
  toFrac: number; // 0-1 fill after this reading
  stageName: string; // current level's Sanskrit name
  active?: boolean; // only sweep once the page is on-screen
}

const CelebrationGauge: React.FC<Props> = ({ fromFrac, toFrac, stageName, active = true }) => {
  // Drive both the arc fill and the count-up % from one Animated.Value via a
  // listener, so the SVG takes plain numbers (react-native-svg doesn't accept an
  // Animated value for strokeDashoffset).
  const fill = useRef(new Animated.Value(fromFrac)).current;
  const [frac, setFrac] = useState(fromFrac);
  const started = useRef(false);

  useEffect(() => {
    const id = fill.addListener(({ value }) => setFrac(value));
    return () => fill.removeListener(id);
  }, [fill]);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced || fromFrac === toFrac) {
        fill.setValue(toFrac);
      } else {
        Animated.timing(fill, {
          toValue: toFrac,
          duration: 1100,
          delay: 400,
          useNativeDriver: false,
        }).start();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [active, fromFrac, toFrac, fill]);

  const dashoffset = ARC * (1 - Math.max(0, Math.min(1, frac)));

  return (
    <View style={styles.wrap}>
      <View style={styles.arcBox}>
        <Svg viewBox="0 0 210 116" width="100%" height="100%">
          <Defs>
            <LinearGradient id="celebrationGauge" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={colors.primary.turmericYellow} />
              <Stop offset="1" stopColor={colors.primary.deepSaffron} />
            </LinearGradient>
          </Defs>
          <Path
            d={ARC_PATH}
            fill="none"
            stroke="rgba(230,81,0,0.14)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          <Path
            d={ARC_PATH}
            fill="none"
            stroke="url(#celebrationGauge)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={ARC}
            strokeDashoffset={dashoffset}
          />
        </Svg>
        <View style={styles.centre}>
          <Text style={styles.num}>
            {Math.round(frac * 100)}
            <Text style={styles.pctSign}>%</Text>
          </Text>
          <Text style={styles.stage}>{stageName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  arcBox: { width: 210, height: 116 },
  // The %/stage stack sits inside the arc, with the stage label's baseline resting
  // at the arc's bottom (its endpoints are at y≈105 of the 116 viewBox).
  centre: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
  num: {
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: colors.neutrals.charcoalBlack,
  },
  pctSign: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutrals.softAsh,
  },
  stage: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.primary.deepSaffron,
    marginTop: 1,
  },
});

export default CelebrationGauge;
