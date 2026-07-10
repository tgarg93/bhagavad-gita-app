import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import LocalStorageService from '../services/localStorageService';
import journeyService from '../services/journeyService';
import { JourneyItem, JOURNEY_MODULES } from '../data/journeyPath';
import MarigoldShower from './MarigoldShower';

// The end-of-content celebration: Krishna (the app's ever-present mentor)
// marks the moment and points to the next step on the guided journey.

interface JourneyCelebrationProps {
  completedItemId: string; // journey id, e.g. 'concept:karma' or 'gita:3'
  completedTitle: string;
  onNext: (item: JourneyItem) => void;
  onBackToLearn: () => void;
  // The page mounts off-screen inside the reader's pager; the celebration
  // sequence should only start once it actually scrolls into view
  active?: boolean;
}

// Static template lines — zero-latency, offline. {name} is filled from the
// profile; nameless variants keep the grammar natural.
const CELEBRATION_LINES: { named: string; anonymous: string }[] = [
  {
    named: 'Beautifully done, {name}. Every step you take on this path, I walk beside you.',
    anonymous: 'Beautifully done. Every step you take on this path, I walk beside you.',
  },
  {
    named: 'Well walked, {name}. What you just read is now part of how you see.',
    anonymous: 'Well walked. What you just read is now part of how you see.',
  },
  {
    named: '{name}, no sincere effort is ever lost — and this one is yours forever.',
    anonymous: 'No sincere effort is ever lost — and this one is yours forever.',
  },
  {
    named: 'Another lamp lit, {name}. See how the path brightens as you go.',
    anonymous: 'Another lamp lit. See how the path brightens as you go.',
  },
  {
    named: 'I enjoyed reading this with you, {name}. Shall we keep walking?',
    anonymous: 'I enjoyed reading this with you. Shall we keep walking?',
  },
  {
    named: 'The teaching stays with those who pause for it — as you just did, {name}.',
    anonymous: 'The teaching stays with those who pause for it — as you just did.',
  },
  {
    named: 'Step by step, {name}. This is how a whole tradition becomes your own.',
    anonymous: 'Step by step. This is how a whole tradition becomes your own.',
  },
  {
    named: 'Wonderful, {name}. Carry this one into your day — it will meet you there.',
    anonymous: 'Wonderful. Carry this one into your day — it will meet you there.',
  },
];

const hashString = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const JourneyCelebration: React.FC<JourneyCelebrationProps> = ({
  completedItemId,
  completedTitle,
  onNext,
  onBackToLearn,
  active = true,
}) => {
  const [message, setMessage] = useState('');
  const [next, setNext] = useState<JourneyItem | null>(null);
  const [pathDone, setPathDone] = useState(false);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);

  // Entrance choreography: ring settles in, checkmark springs, text rises
  const ringAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  const nextAnim = useRef(new Animated.Value(0)).current;
  const backAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true; // once per arrival — no replay on swipe-back
    setStarted(true);

    const rise = (value: Animated.Value, delay: number, duration = 450) =>
      Animated.timing(value, { toValue: 1, duration, delay, useNativeDriver: true });

    Animated.parallel([
      Animated.timing(ringAnim, { toValue: 1, duration: 550, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(500),
        Animated.spring(checkAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }),
      ]),
      rise(labelAnim, 750),
      rise(titleAnim, 900),
      rise(messageAnim, 1100, 500),
      rise(nextAnim, 1350, 500),
      rise(backAnim, 1600, 500),
    ]).start();
  }, [active, ringAnim, checkAnim, labelAnim, titleAnim, messageAnim, nextAnim, backAnim]);

  const riseStyle = (value: Animated.Value) => ({
    opacity: value,
    transform: [
      { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
    ],
  });

  useEffect(() => {
    (async () => {
      const profile = await LocalStorageService.getSpiritualProfile();
      const line = CELEBRATION_LINES[hashString(completedItemId) % CELEBRATION_LINES.length];
      setMessage(
        profile.name ? line.named.replace('{name}', profile.name) : line.anonymous
      );
      const nextItem = await journeyService.getNextUnfinished(completedItemId);
      setNext(nextItem);
      setPathDone(nextItem === null);

      // A finished reading is a warm moment to ask for notification permission
      try {
        const { notificationService } = require('../services/notificationService');
        notificationService.ensurePermissions();
      } catch {
        // notifications module not built in yet — fine
      }
    })();
  }, [completedItemId]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.avatarRing,
          {
            opacity: ringAnim,
            transform: [
              { scale: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/krishna-avatar.png')}
          style={styles.avatar}
        />
        <Animated.View
          style={[
            styles.checkBadge,
            {
              opacity: checkAnim.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 1] }),
              transform: [{ scale: checkAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark" size={22} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>

      <Animated.Text style={[styles.completedLabel, riseStyle(labelAnim)]}>
        Completed
      </Animated.Text>
      <Animated.Text style={[styles.completedTitle, riseStyle(titleAnim)]}>
        {completedTitle}
      </Animated.Text>

      {!!message && (
        <Animated.Text style={[styles.message, riseStyle(messageAnim)]}>{message}</Animated.Text>
      )}

      {pathDone ? (
        <Animated.Text style={[styles.pathDone, riseStyle(nextAnim)]}>
          You have walked the entire path — every step, complete. 🙏
        </Animated.Text>
      ) : (
        next && (
          <Animated.View style={[styles.nextBtnWrap, riseStyle(nextAnim)]}>
            <TouchableOpacity style={styles.nextBtn} onPress={() => onNext(next)}>
              <View style={styles.nextText}>
                <Text style={styles.nextLabel}>
                  Next · {JOURNEY_MODULES[next.module]}
                </Text>
                <Text style={styles.nextTitle} numberOfLines={1}>
                  {next.title}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        )
      )}

      <Animated.View style={{ opacity: backAnim }}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackToLearn}>
          <Text style={styles.backBtnText}>Back to Learn</Text>
        </TouchableOpacity>
      </Animated.View>

      <MarigoldShower play={started} />
    </View>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const AVATAR_SIZE = 156;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  avatarRing: {
    width: AVATAR_SIZE + 12,
    height: AVATAR_SIZE + 12,
    borderRadius: (AVATAR_SIZE + 12) / 2,
    borderWidth: 3,
    borderColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    resizeMode: 'cover',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary.peacockTeal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.neutrals.sandstoneBeige,
  },
  completedLabel: {
    ...typography.sizes.caption,
    color: colors.primary.deepSaffron,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  completedTitle: {
    ...typography.sizes.headingLG,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    ...typography.sizes.bodyLG,
    fontWeight: '400',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: spacing.xl,
  },
  pathDone: {
    ...typography.sizes.bodyLG,
    fontWeight: '400',
    color: colors.primary.peacockTeal,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  nextBtnWrap: {
    alignSelf: 'stretch',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.large,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignSelf: 'stretch',
    ...shadows.button,
  },
  nextText: { flex: 1 },
  nextLabel: {
    ...typography.sizes.caption,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nextTitle: {
    ...typography.sizes.headingSM,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  backBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtnText: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.softAsh,
    fontWeight: '600',
  },
});

export default JourneyCelebration;
