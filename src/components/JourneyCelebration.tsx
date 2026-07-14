import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import LocalStorageService from '../services/localStorageService';
import journeyService from '../services/journeyService';
import { JourneyItem, JOURNEY_MODULES } from '../data/journeyPath';
import MarigoldShower from './MarigoldShower';
import ProgressRungs from './ProgressRungs';
import {
  getProgression,
  progressWithinBand,
  levelForPoints,
  Progression,
  LEVELS,
  LEVEL_MEANINGS,
} from '../services/progressionService';

// The end-of-content celebration: Krishna (the app's ever-present mentor)
// marks the moment, shows the ground gained toward the next spiritual level,
// and points to the next step on the guided journey. Crossing a level
// threshold raises the full level-up ceremony over the top.

interface JourneyCelebrationProps {
  completedItemId: string; // journey id, e.g. 'concept:karma' or 'gita:3'
  completedTitle: string;
  onNext: (item: JourneyItem) => void;
  // Leaves the reader by going BACK to wherever the reader was opened from —
  // the journey path, usually. It used to be onBackToLearn, which jumped to the
  // Scriptures tab and popped the path off the stack, so a completed item became
  // a dead end you couldn't return from.
  onExit: () => void;
  // Pages the reader back to its cover. Absent on screens that have no cover to
  // return to, in which case the action isn't rendered.
  onReadAgain?: () => void;
  // Foundations only. The takeaways this act banked, replayed back so the reader
  // sees what they are actually carrying out of it — this is the act summary,
  // folded into the celebration rather than made a screen of its own.
  bankedTakeaways?: string[];
  // The question the next act answers, shown directly above the next-step button
  // so the reader walks straight into it rather than stopping.
  handoff?: string;
  // Stage capstones only: the stage's objective, which was a promise on the
  // journey card and is now a thing they have done.
  objective?: string;
  // The page mounts off-screen inside the reader's pager; the celebration
  // sequence should only start once it actually scrolls into view
  active?: boolean;
  // Progression points captured by the reader when it mounted — lets the
  // strip animate from where you stood to where this reading brought you
  pointsAtStart?: number;
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
  onExit,
  onReadAgain,
  bankedTakeaways,
  handoff,
  objective,
  active = true,
  pointsAtStart,
}) => {
  const [message, setMessage] = useState('');
  const [next, setNext] = useState<JourneyItem | null>(null);
  const [pathDone, setPathDone] = useState(false);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [levelUp, setLevelUp] = useState(false);
  const levelUpAnim = useRef(new Animated.Value(0)).current;

  // Entrance choreography: ring settles in, checkmark springs, text rises
  const ringAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  const progAnim = useRef(new Animated.Value(0)).current;
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
      rise(progAnim, 1250, 500),
      rise(nextAnim, 1450, 500),
      rise(backAnim, 1700, 500),
    ]).start();

    // Progress toward the next spiritual level — points landed on the pages
    // before this one, so a fresh read shows where this reading brought you.
    // Crossing a threshold raises the level-up ceremony after the entrance.
    (async () => {
      const prog = await getProgression();
      setProgression(prog);
      const lastCelebrated = await LocalStorageService.getLastCelebratedLevel();
      if (prog.level.level > lastCelebrated) {
        await LocalStorageService.saveLastCelebratedLevel(prog.level.level);
        setTimeout(() => {
          setLevelUp(true);
          Animated.timing(levelUpAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        }, 1900);
      }
    })();
  }, [active, ringAnim, checkAnim, labelAnim, titleAnim, messageAnim, progAnim, nextAnim, backAnim, levelUpAnim]);

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

      {progression && (
        <Animated.View style={[styles.progressStrip, riseStyle(progAnim)]}>
          <ProgressRungs
            level={progression.level}
            nextLevel={progression.nextLevel}
            progressToNext={progression.progressToNext}
            animateFrom={
              pointsAtStart != null
                ? levelForPoints(pointsAtStart).level === progression.level.level
                  ? progressWithinBand(pointsAtStart)
                  : 0 // crossed into a new band — fill it fresh
                : undefined
            }
          />
          <Text style={styles.progressLine}>
            {progression.nextLevel
              ? `${
                  pointsAtStart != null && progression.points - pointsAtStart > 0
                    ? `+${progression.points - pointsAtStart} points · `
                    : ''
                }${progression.pointsToNext} to ${progression.nextLevel.sanskrit}`
              : "The path's last name is yours."}
          </Text>
        </Animated.View>
      )}

      {!!objective && (
        <Animated.View style={[styles.banked, riseStyle(nextAnim)]}>
          <Text style={styles.bankedLabel}>You can now</Text>
          <Text style={styles.objectiveEarned}>{objective}</Text>
        </Animated.View>
      )}

      {!!bankedTakeaways?.length && (
        <Animated.View style={[styles.banked, riseStyle(nextAnim)]}>
          <Text style={styles.bankedLabel}>You can now say</Text>
          {bankedTakeaways.map(t => (
            <View key={t} style={styles.bankedRow}>
              <Text style={styles.bankedDot}>◆</Text>
              <Text style={styles.bankedText}>{t}</Text>
            </View>
          ))}
        </Animated.View>
      )}

      {!!handoff && (
        <Animated.Text style={[styles.handoff, riseStyle(nextAnim)]}>{handoff}</Animated.Text>
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

      <Animated.View style={[styles.exitRow, { opacity: backAnim }]}>
        {/* The way back INTO the reading. The celebration is a page in the
            reader's own pager, so this is a scroll, not a navigation. */}
        {!!onReadAgain && (
          <TouchableOpacity style={styles.backBtn} onPress={onReadAgain}>
            <Text style={styles.backBtnText}>Read it again</Text>
          </TouchableOpacity>
        )}
        {/* Goes BACK — to the journey path if that's where you came from. It used
            to jump to the Learn tab, which popped the path off the stack and made
            a completed item a dead end. */}
        <TouchableOpacity style={styles.backBtn} onPress={onExit}>
          <Text style={styles.backBtnText}>Done</Text>
        </TouchableOpacity>
      </Animated.View>

      <MarigoldShower play={started} />

      {/* Level-up ceremony: the identity card reborn with the new name — the
          same conferral the Jigyasu onboarding page performs on day one */}
      {levelUp && progression && (
        <Animated.View style={[styles.levelUpOverlay, { opacity: levelUpAnim }]}>
          <View style={styles.luCard}>
            <Text style={styles.luEyebrow}>A NEW NAME ON THE PATH</Text>
            {(() => {
              const prev = LEVELS.find(l => l.level === progression.level.level - 1);
              return prev ? <Text style={styles.luOld}>{prev.sanskrit} — {prev.english}</Text> : null;
            })()}
            <Text style={styles.luName}>{progression.level.sanskrit}</Text>
            <Text style={styles.luEnglish}>
              {progression.level.english} · Level {progression.level.level} of 7
            </Text>
            <Text style={styles.luMeaning}>{LEVEL_MEANINGS[progression.level.level]}</Text>
            <ProgressRungs
              level={progression.level}
              nextLevel={progression.nextLevel}
              progressToNext={progression.progressToNext}
            />
            <TouchableOpacity
              style={styles.luBtn}
              onPress={() =>
                Animated.timing(levelUpAnim, {
                  toValue: 0,
                  duration: 250,
                  useNativeDriver: true,
                }).start(() => setLevelUp(false))
              }
            >
              <Text style={styles.luBtnText}>Continue as {progression.level.sanskrit} →</Text>
            </TouchableOpacity>
          </View>
          <MarigoldShower play={levelUp} />
        </Animated.View>
      )}
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
  // Foundations: the act's takeaways, replayed. Explicit fontSize/lineHeight
  // rather than spreading typography.sizes.* — that union is the tsc trap here.
  banked: {
    alignSelf: 'stretch',
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.12)',
    gap: 9,
  },
  bankedLabel: {
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.neutrals.softAsh,
    marginBottom: 3,
  },
  bankedRow: { flexDirection: 'row', gap: 9 },
  bankedDot: {
    fontSize: 8,
    lineHeight: 21,
    color: colors.primary.turmericYellow,
  },
  bankedText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '500',
  },
  objectiveEarned: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
  },
  handoff: {
    fontSize: 17,
    lineHeight: 25,
    fontStyle: 'italic',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
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
  exitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
  progressStrip: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.14)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  progressLine: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.neutrals.softAsh,
    marginTop: 8,
  },
  levelUpOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.neutrals.sandstoneBeige,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  luCard: {
    alignSelf: 'stretch',
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1.5,
    borderColor: 'rgba(184, 134, 11, 0.35)',
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.soft,
  },
  luEyebrow: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: '#A87908',
    marginBottom: spacing.md,
  },
  luOld: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutrals.softAsh,
    textDecorationLine: 'line-through',
  },
  luName: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.neutrals.charcoalBlack,
    marginTop: 2,
  },
  luEnglish: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: colors.neutrals.softAsh,
    marginBottom: spacing.md,
  },
  luMeaning: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.lg,
  },
  luBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.large,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignSelf: 'stretch',
    alignItems: 'center',
    ...shadows.button,
  },
  luBtnText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default JourneyCelebration;
