import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from 'react-native';

// A one-shot fall of marigold petals — the flower shower that marks a
// milestone. Spawns its petals when `play` turns true, animates them once,
// then unmounts them all; nothing loops or lingers.

interface MarigoldShowerProps {
  play: boolean;
}

const PETAL_COUNT = 16;

// Marigold hues, deep to golden (the design system's goldenHour range)
const PETAL_COLORS = ['#E65100', '#FB8C00', '#FFC107'];
const CENTER_COLORS = ['#FFD54F', '#FFE082'];

interface PetalSpec {
  size: number;
  color: string;
  centerColor: string;
  leaf: boolean; // asymmetric petal shape vs. round pom
  leftPct: number; // horizontal spawn position, % of width
  sway: number; // total horizontal drift, px
  spin: number; // total rotation, deg
  delay: number;
  duration: number;
}

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

const makePetals = (): PetalSpec[] =>
  Array.from({ length: PETAL_COUNT }, () => ({
    size: rand(10, 17),
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    centerColor: CENTER_COLORS[Math.floor(Math.random() * CENTER_COLORS.length)],
    leaf: Math.random() < 0.45,
    leftPct: rand(2, 92),
    sway: rand(-34, 34),
    spin: rand(-540, 540),
    delay: rand(150, 1100),
    duration: rand(1700, 2500),
  }));

const FALL_EASING = Easing.bezier(0.35, 0, 0.75, 0.6);

const Petal: React.FC<{ spec: PetalSpec; height: number; progress: Animated.Value }> = ({
  spec,
  height,
  progress,
}) => {
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, height + 30],
  });
  const translateX = progress.interpolate({
    inputRange: [0, 0.62, 1],
    outputRange: [0, spec.sway * 0.6, spec.sway],
  });
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${spec.spin}deg`],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [1, 1, 0.55],
  });

  const petalShape = spec.leaf
    ? {
        width: spec.size,
        height: spec.size * 0.72,
        borderTopLeftRadius: spec.size * 0.62,
        borderTopRightRadius: spec.size * 0.38,
        borderBottomRightRadius: spec.size * 0.6,
        borderBottomLeftRadius: spec.size * 0.4,
      }
    : {
        width: spec.size,
        height: spec.size,
        borderRadius: spec.size / 2,
      };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: `${spec.leftPct}%`,
        opacity,
        transform: [{ translateY }, { translateX }, { rotate }],
      }}
    >
      <View style={[petalShape, { backgroundColor: spec.color, overflow: 'hidden' }]}>
        {/* lighter golden center, offset for a hint of depth */}
        <View
          style={{
            position: 'absolute',
            top: spec.size * 0.14,
            left: spec.size * 0.16,
            width: spec.size * 0.45,
            height: spec.size * 0.45,
            borderRadius: spec.size * 0.225,
            backgroundColor: spec.centerColor,
          }}
        />
      </View>
    </Animated.View>
  );
};

const MarigoldShower: React.FC<MarigoldShowerProps> = ({ play }) => {
  const [height, setHeight] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  const petals = useMemo(makePetals, []);
  const progressValues = useRef(petals.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!play || startedRef.current || height === 0) return;
    startedRef.current = true;

    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (cancelled) return;
      if (reduced) {
        setDone(true);
        return;
      }
      let finished = 0;
      petals.forEach((spec, i) => {
        Animated.timing(progressValues[i], {
          toValue: 1,
          duration: spec.duration,
          delay: spec.delay,
          easing: FALL_EASING,
          useNativeDriver: true,
        }).start(() => {
          finished += 1;
          if (finished === petals.length) setDone(true);
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, [play, height, petals, progressValues]);

  if (done) return null;

  return (
    <View
      style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
      pointerEvents="none"
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      {height > 0 &&
        play &&
        petals.map((spec, i) => (
          <Petal key={i} spec={spec} height={height} progress={progressValues[i]} />
        ))}
    </View>
  );
};

export default MarigoldShower;
