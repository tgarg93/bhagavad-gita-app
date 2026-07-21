import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  Animated,
  AccessibilityInfo,
} from 'react-native';

// Typed separately: inside StyleSheet.create the style resolves to a union
// that Image's style prop rejects
const introLogoStyle = {
  width: 76,
  height: 76,
} as const;

const transitionCoverStyle = {
  width: 120,
  height: 120,
  borderRadius: 24,
  resizeMode: 'cover',
} as const;
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import KrishnaGuide from '../components/KrishnaGuide';
import JourneyPathView from '../components/JourneyPathView';
import LocalStorageService, { SpiritualProfile } from '../services/localStorageService';
import journeyService from '../services/journeyService';
import { ONBOARDING_ATOM } from '../data/dailyAtoms';
import DailyChaiCard from '../components/DailyChaiCard';
import ProgressRungs from '../components/ProgressRungs';
import { LEVELS, LEVEL_MEANINGS } from '../services/progressionService';

interface OnboardingScreenProps {
  onComplete: () => void;
  // 'edit' = replayed from the Profile tab's "Edit my answers". Those users have
  // already met Krishna and know what the app is for, so both intro screens are
  // dropped from the sequence.
  mode?: 'firstRun' | 'edit';
}

// The steps, named. This used to be a bare `step: number` with the index
// hardcoded in seven different places — canContinue, next(), nine render blocks,
// two `step < 8` literals, and the button labels — with no shared source of
// truth, so inserting a step meant renumbering all of them by hand.
//
// Now `step` indexes into an ordered list of ids. Adding a screen is one line,
// and skipping screens (the 'edit' replay) is a filter.
type StepId =
  | 'introApp'
  | 'introKrishna'
  | 'name'
  | 'familiarity'
  | 'intentions'
  | 'goal'
  | 'identity'
  | 'journey'
  | 'chai'
  | 'sendoff';

const FIRST_RUN_STEPS: StepId[] = [
  'introApp',
  'introKrishna',
  'name',
  'familiarity',
  'intentions',
  'goal',
  'identity',
  'journey',
  'chai',
  'sendoff',
];

const EDIT_STEPS: StepId[] = FIRST_RUN_STEPS.filter(
  s => s !== 'introApp' && s !== 'introKrishna' && s !== 'sendoff'
);

// Every option label has to survive on ONE line. The label column is 290pt
// (390 screen − 48 body padding − 48 option padding − 4 border) at 18pt/600,
// which is roughly 28 characters. Subtitles (14pt) get about 40. Copy that
// busts the budget wraps to two lines and the list stops scanning.
const FAMILIARITY_OPTIONS: { value: SpiritualProfile['familiarity']; label: string; sub: string }[] = [
  { value: 'new', label: 'Just beginning', sub: 'Starting from scratch' },
  { value: 'some', label: 'Some familiarity', sub: 'I know the names, not the meanings' },
  { value: 'deep', label: 'Well acquainted', sub: "I've read and practiced before" },
];

// Outcomes, not shelves. The old list ("Learn the Bhagavad Gita", "Understand
// Hindu philosophy", "Stories & festivals", "Personal growth") was the app's own
// table of contents read back to the user — nobody's goal is "philosophy". These
// are the things people actually open this app to be able to DO, and the first
// two are the product's whole reason to exist: help Hindus become experts in
// their own religion.
//
// The strings themselves are what gets stored (see userKnowledgeSchema.ts), so
// changing them here means changing them there too.
const INTENTION_OPTIONS: { value: string; label: string; sub: string }[] = [
  { value: "Answer my kids' questions", label: "Answer my kids' questions", sub: 'Not just “that’s what we do”' },
  { value: 'Get the big picture', label: 'Get the big picture', sub: 'Curious, with no background in it' },
  { value: 'Explain Hinduism to others', label: 'Explain Hinduism to others', sub: 'In plain words, with confidence' },
  { value: 'Understand our rituals', label: 'Understand our rituals', sub: 'What we do at the temple, and why' },
  { value: 'Finally read the Gita', label: 'Finally read the Gita', sub: 'All 18 chapters, with a guide' },
  { value: 'Know the gods and stories', label: 'Know the gods and stories', sub: "Who's who, and how they connect" },
  { value: 'Steady myself in hard times', label: 'Steady myself in hard times', sub: 'The teachings, when life is heavy' },
];

const GOAL_OPTIONS: { value: SpiritualProfile['dailyGoalMinutes']; label: string; sub: string }[] = [
  { value: 5, label: '5 min', sub: 'Great for busy days' },
  { value: 10, label: '10 min', sub: 'A comfortable daily habit' },
  { value: 15, label: '15 min', sub: 'When you want to go deeper' },
  { value: 20, label: '20 min', sub: 'For days you can linger' },
];

// Screen 1 — Dharma introduces itself, one line at a time. The three questions
// are all answered in Foundations (the "what is Hinduism" opening in Part 1,
// Diwali in Part 7, karma in Part 4), so this teases content that actually exists.
//
// A component of its own, deliberately: OnboardingScreen re-renders on every
// keystroke of the name field, so an entrance driven from a mount effect *there*
// would replay itself mid-typing. Here the effect runs once, when this screen
// mounts, and the parent's re-renders cannot reach it.
const AppIntro: React.FC = () => {
  const logo = useRef(new Animated.Value(0)).current;
  const q1 = useRef(new Animated.Value(0)).current;
  const q2 = useRef(new Animated.Value(0)).current;
  const q3 = useRef(new Animated.Value(0)).current;
  const body = useRef(new Animated.Value(0)).current;
  const promise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    const all = [logo, q1, q2, q3, body, promise];

    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        all.forEach(v => v.setValue(1));
        return;
      }
      const rise = (value: Animated.Value, delay: number, duration = 480) =>
        Animated.timing(value, { toValue: 1, duration, delay, useNativeDriver: true });

      // The promise lands last and alone — that beat is what the copy is built on.
      Animated.parallel([
        rise(logo, 0, 600),
        rise(q1, 350),
        rise(q2, 650),
        rise(q3, 950),
        rise(body, 1350),
        rise(promise, 1750, 600),
      ]).start();
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const riseStyle = (value: Animated.Value) => ({
    opacity: value,
    transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
  });

  return (
    <View style={styles.introWrap}>
      <Animated.Image
        source={require('../../assets/dharma-lotus-transparent.png')}
        style={[introLogoStyle, riseStyle(logo)]}
        resizeMode="contain"
      />
      <View style={styles.introQuestions}>
        <Animated.Text style={[styles.introQuestion, riseStyle(q1)]}>
          What is Hinduism?
        </Animated.Text>
        <Animated.Text style={[styles.introQuestion, riseStyle(q2)]}>
          Why do we light lamps at Diwali?
        </Animated.Text>
        <Animated.Text style={[styles.introQuestion, riseStyle(q3)]}>
          What does karma actually mean?
        </Animated.Text>
      </View>
      <Animated.Text style={[styles.introBody, riseStyle(body)]}>
        You have probably been asked.{'\n'}You may have guessed.
      </Animated.Text>
      <Animated.Text style={[styles.introPromise, riseStyle(promise)]}>
        Dharma is where you stop guessing — and become{' '}
        <Text style={styles.introPromiseAccent}>the one who knows.</Text>
      </Animated.Text>
    </View>
  );
};

// Rises its children in once `active` turns true. Used to hold a step's answer
// UI back until Krishna has finished speaking — he asks, *then* the options
// arrive, rather than everything landing at once and the typing becoming decor.
//
// `delay` staggers a list: pass index * ~70ms.
const Reveal: React.FC<{
  active: boolean;
  delay?: number;
  style?: any;
  children: React.ReactNode;
}> = ({ active, delay = 0, style, children }) => {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      v.setValue(0);
      return;
    }
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        v.setValue(1);
        return;
      }
      Animated.timing(v, {
        toValue: 1,
        duration: 420,
        delay,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: v,
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, mode = 'firstRun' }) => {
  const steps = mode === 'edit' ? EDIT_STEPS : FIRST_RUN_STEPS;

  const [step, setStep] = useState(0);
  const [familiarity, setFamiliarity] = useState<SpiritualProfile['familiarity'] | null>(null);
  const [intentions, setIntentions] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState<SpiritualProfile['dailyGoalMinutes'] | null>(null);

  const id = steps[step];
  const isLast = step === steps.length - 1;
  const firstName = name.trim().split(/\s+/)[0] || '';

  // Krishna's line for each step. He does NOT speak on the app intro — Dharma
  // introduces itself first, and his own screen is his first appearance.
  const stepMessages: Record<StepId, string> = {
    introApp: '',
    introKrishna:
      "Namaste. I am Krishna.\n\nIn the Bhagavad Gita, I was Arjuna's spiritual guide. Let me be yours — at every step, and whenever you ask.",
    name: 'So — what may I call you?',
    familiarity: firstName
      ? `Lovely to meet you, ${firstName}. How familiar are you with Hindu teachings?`
      : 'How familiar are you with Hindu teachings?',
    intentions: 'What would you like to be able to do? Choose all that speak to you.',
    goal: firstName
      ? `I'll check in with you each day, ${firstName}. How much time would you like to aim for?`
      : "I'll check in with you each day. How much time would you like to aim for?",
    identity: firstName
      ? `Every seeker in every Upanishad began exactly where you stand now, ${firstName}.`
      : 'Every seeker in every Upanishad began exactly where you stand now.',
    journey: firstName
      ? `Here is the road we'll walk together, ${firstName} — six stages, one step at a time.`
      : "Here is the road we'll walk together — six stages, one step at a time.",
    chai: firstName
      ? `One more thing, ${firstName} — each morning I'll have chai waiting for you: one small sip of wisdom and the day's verse, right on your Home screen. Under a minute, I promise.`
      : "One more thing — each morning I'll have chai waiting for you: one small sip of wisdom and the day's verse, right on your Home screen. Under a minute, I promise.",
    sendoff: '', // the quiet transition screen — no bubble
  };

  // A step's answer UI waits for Krishna to finish speaking. Steps where he says
  // nothing (the app intro, which animates itself; the send-off, which has no
  // bubble) must start ready — otherwise their content would wait on a
  // `onTypingDone` that never fires, and never appear at all.
  const [krishnaDone, setKrishnaDone] = useState(false);
  useEffect(() => {
    setKrishnaDone(!stepMessages[id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  // Steps that ask nothing (the two intros, the identity card, the journey
  // finale, the chai preview) just need a look, not an answer.
  const canContinue =
    id === 'introApp' ||
    id === 'introKrishna' ||
    (id === 'name' && firstName.length > 0) ||
    (id === 'familiarity' && familiarity !== null) ||
    (id === 'intentions' && intentions.length > 0) ||
    (id === 'goal' && dailyGoal !== null) ||
    id === 'identity' ||
    id === 'journey' ||
    id === 'chai';

  const finish = async () => {
    // Merge, don't overwrite: replaying onboarding ("Edit my answers") must
    // preserve the rolling summary and structured knowledge learned since.
    // familyStream is deliberately absent: the question that set it is gone, but
    // the field stays on SpiritualProfile and Krishna still reads it. Because
    // this is a merge, users who answered it before keep their answer.
    const patch: Partial<SpiritualProfile> = {
      familiarity: familiarity ?? 'some',
      intentions,
      dailyGoalMinutes: dailyGoal ?? 10,
      onboarded: true,
    };
    if (firstName) patch.name = firstName; // first name only; skip keeps any earlier name
    await LocalStorageService.updateSpiritualProfile(patch);
    // A completed onboarding is the warm moment to ask about reminders
    try {
      const { notificationService } = require('../services/notificationService');
      notificationService.ensurePermissions();
    } catch {
      // notifications module unavailable (pre-rebuild) — fine
    }
    onComplete();
  };

  // Jigyasu → journey hand-off: the identity card rises and shrinks as if it
  // becomes the rail's first milestone, then the journey view enters with
  // that milestone settling in (JourneyPathView's entrance prop).
  const jigyasuExit = useRef(new Animated.Value(0)).current;

  const next = () => {
    // The identity card is the one step with bespoke behavior: it animates into
    // the journey rail's first milestone rather than simply advancing.
    if (id === 'identity') {
      AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
        if (reduced) {
          setStep(step + 1);
          return;
        }
        Animated.timing(jigyasuExit, { toValue: 1, duration: 320, useNativeDriver: true }).start(
          () => {
            jigyasuExit.setValue(0); // reset in case the walker comes back
            setStep(step + 1);
          }
        );
      });
      return;
    }
    if (!isLast) setStep(step + 1);
    else finish();
  };

  // Send-off: the final step auto-advances into the first lesson — no button.
  // A ref guards against the timer and the escape link double-firing.
  const [firstStepTitle, setFirstStepTitle] = useState('What is Hinduism?');
  const [firstStepCover, setFirstStepCover] = useState<number | string | null>(null);
  const departedRef = useRef(false);

  useEffect(() => {
    journeyService
      .getNextUnfinished()
      .then(item => {
        if (item) {
          setFirstStepTitle(item.title);
          setFirstStepCover(item.cover);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== 'sendoff') return;
    const timer = setTimeout(() => {
      if (departedRef.current) return;
      departedRef.current = true;
      journeyService.setPendingStart();
      finish();
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const exploreInstead = () => {
    if (departedRef.current) return;
    departedRef.current = true;
    finish();
  };

  const renderOption = (
    selected: boolean,
    label: string,
    sub: string | undefined,
    onPress: () => void,
    key: string
  ) => (
    <TouchableOpacity
      key={key}
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
    >
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
      {!!sub && <Text style={styles.optionSub}>{sub}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress */}
      <View style={styles.topBar}>
        {step > 0 ? (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={DharmaDesignSystem.colors.neutrals.softAsh} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((step + 1) / steps.length) * 100}%` }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Krishna is deliberately absent from the app intro — Dharma speaks
            first, and his own screen is his first appearance. Same avatar size
            throughout: a bigger one squeezes the bubble, because the avatar is
            fixed-width next to a flex:1 bubble.
            He types every line. The effect is keyed on the message string, not
            on mount, so the name field's keystrokes cannot restart it. */}
        {id !== 'introApp' && !!stepMessages[id] && (
          <KrishnaGuide
            message={stepMessages[id]}
            typewriter
            onTypingDone={() => setKrishnaDone(true)}
          />
        )}

        {id === 'goal' && (
          <Reveal active={krishnaDone}>
            <Text style={styles.goalHint}>You can change this anytime — there's no wrong answer.</Text>
          </Reveal>
        )}

        {/* Screen 1 — Dharma says what it is for. Its own component, so its
            entrance runs once on mount; inlined here it would replay on every
            re-render of this screen. */}
        {id === 'introApp' && <AppIntro />}

        {/* Everything below waits for Krishna to stop typing: he asks, then the
            answers arrive. `krishnaDone` resets on every step change and starts
            true on the steps where he says nothing. */}
        <View style={styles.options}>
          {id === 'name' && (
            <Reveal active={krishnaDone}>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Your first name…"
                placeholderTextColor={DharmaDesignSystem.colors.neutrals.softAsh}
                autoCapitalize="words"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={() => firstName && next()}
              />
              <TouchableOpacity onPress={next} style={styles.skipBtn}>
                <Text style={styles.skipText}>I'd rather not say</Text>
              </TouchableOpacity>
            </Reveal>
          )}

          {id === 'familiarity' &&
            FAMILIARITY_OPTIONS.map((o, i) => (
              <Reveal key={o.value} active={krishnaDone} delay={i * 70}>
                {renderOption(familiarity === o.value, o.label, o.sub, () => setFamiliarity(o.value), o.value)}
              </Reveal>
            ))}

          {id === 'intentions' &&
            INTENTION_OPTIONS.map((o, i) => (
              <Reveal key={o.value} active={krishnaDone} delay={i * 70}>
                {renderOption(
                  intentions.includes(o.value),
                  o.label,
                  o.sub,
                  () => toggle(intentions, setIntentions, o.value),
                  o.value
                )}
              </Reveal>
            ))}

          {id === 'goal' && (
            <>
              {GOAL_OPTIONS.map((o, i) => (
                <Reveal key={String(o.value)} active={krishnaDone} delay={i * 70}>
                  {renderOption(dailyGoal === o.value, o.label, o.sub, () => setDailyGoal(o.value), String(o.value))}
                </Reveal>
              ))}
              <Reveal active={krishnaDone} delay={GOAL_OPTIONS.length * 70}>
                <TouchableOpacity onPress={next} style={styles.skipBtn}>
                  <Text style={styles.skipText}>Not sure yet? Set this up later</Text>
                </TouchableOpacity>
              </Reveal>
            </>
          )}
        </View>

        {id === 'identity' && (
          // Two animations on one card: Reveal brings it in after Krishna names
          // the level, jigyasuExit shrinks it away into the next step.
          <Animated.View
            style={[
              styles.jigyasuWrap,
              {
                opacity: jigyasuExit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                transform: [
                  { scale: jigyasuExit.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }) },
                  { translateY: jigyasuExit.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
                ],
              },
            ]}
          >
            <Reveal active={krishnaDone}>
              <View style={styles.jigyasuCard}>
                <Text style={styles.jigyasuEmblem}>🪷</Text>
                <Text style={styles.jigyasuEyebrow}>YOU BEGIN AS</Text>
                <Text style={styles.jigyasuName}>Jigyasu</Text>
                <Text style={styles.jigyasuEnglish}>The Curious · Level 1 of 7</Text>
                <Text style={styles.jigyasuMeaning}>{LEVEL_MEANINGS[1]}</Text>
                <ProgressRungs level={LEVELS[0]} nextLevel={LEVELS[1]} progressToNext={0} />
              </View>
            </Reveal>
          </Animated.View>
        )}

        {id === 'journey' && (
          <>
            <Reveal active={krishnaDone}>
              <Text style={styles.journeyHeading}>YOUR SPIRITUAL JOURNEY</Text>
            </Reveal>
            {/* Mounted only once Krishna is done — JourneyPathView's `entrance`
                stagger runs on ITS mount, so mounting it early would spend the
                whole animation behind Krishna's typing. */}
            {krishnaDone && <JourneyPathView scrollable={false} entrance />}
          </>
        )}

        {id === 'chai' && (
          <Reveal active={krishnaDone} style={styles.rhythmWrap}>
            {/* A curated welcome atom (not the day's) — the same unified card the
                Home screen shows, action-less. Fixed and short so the preview
                reads clean on any date instead of truncating a long daily atom. */}
            <DailyChaiCard atom={ONBOARDING_ATOM} />
          </Reveal>
        )}

        {id === 'sendoff' && (
          <Reveal active={krishnaDone} style={styles.transitionWrap}>
            <Text style={styles.transitionEyebrow}>YOUR FIRST STEP</Text>
            {firstStepCover != null && (
              <Image
                source={typeof firstStepCover === 'string' ? { uri: firstStepCover } : firstStepCover}
                style={transitionCoverStyle}
              />
            )}
            <Text style={styles.transitionTitle}>Getting started with</Text>
            <Text style={styles.transitionLesson}>“{firstStepTitle}”</Text>
            <ActivityIndicator
              size="small"
              color={DharmaDesignSystem.colors.primary.deepSaffron}
              style={styles.transitionSpinner}
            />
            <TouchableOpacity onPress={exploreInstead} style={styles.skipBtn}>
              <Text style={styles.skipText}>I'll explore on my own</Text>
            </TouchableOpacity>
          </Reveal>
        )}
      </ScrollView>

      {/* The send-off auto-advances; it has no button. */}
      {id !== 'sendoff' && (
        <TouchableOpacity
          style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
          onPress={next}
          disabled={!canContinue}
        >
          <Text style={styles.continueText}>
            {id === 'goal'
              ? "I'm committed"
              : id === 'identity'
              ? 'See your journey →'
              : 'Continue'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  backBtn: {
    width: 32,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.neutrals.gentleMist,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.primary.deepSaffron,
  },
  scroll: {
    flex: 1,
  },
  body: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  options: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  option: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 2,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionSelected: {
    borderColor: colors.primary.deepSaffron,
    backgroundColor: 'rgba(230, 81, 0, 0.06)',
  },
  optionLabel: {
    ...typography.sizes.bodyLG,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: colors.primary.deepSaffron,
  },
  optionSub: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.softAsh,
    marginTop: 2,
  },
  // Screen 1: Dharma introduces itself. Explicit fontSize/lineHeight rather than
  // spreading typography.sizes.* — that union is the tsc trap in this repo.
  introWrap: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  introQuestions: {
    marginTop: spacing.xl,
    gap: spacing.sm,
    alignSelf: 'stretch',
  },
  // The questions are the setup, not the point — muted and small so the promise
  // below carries the weight (see introPromise).
  introQuestion: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
    color: colors.neutrals.softAsh,
    textAlign: 'center',
  },
  introBody: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  // The payoff, and the visual hero of the screen: the largest, darkest element.
  // No divider — breathing room above it does the separating instead.
  introPromise: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginTop: spacing.xl,
    alignSelf: 'stretch',
  },
  introPromiseAccent: {
    color: colors.primary.deepSaffron,
  },
  nameInput: {
    ...typography.sizes.bodyLG,
    // TextInput + custom font + inherited lineHeight clips glyphs on device
    lineHeight: undefined,
    minHeight: 56,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 2,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    color: colors.neutrals.charcoalBlack,
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.softAsh,
    textDecorationLine: 'underline',
  },
  goalHint: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutrals.softAsh,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  rhythmWrap: {
    paddingHorizontal: spacing.md,
  },
  jigyasuWrap: {
    paddingHorizontal: spacing.md,
  },
  jigyasuCard: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1.5,
    borderColor: 'rgba(230, 81, 0, 0.18)',
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.soft,
  },
  jigyasuEmblem: {
    fontSize: 34,
    lineHeight: 42,
  },
  jigyasuEyebrow: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 1.6,
    color: colors.primary.deepSaffron,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  jigyasuName: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
    color: colors.neutrals.charcoalBlack,
  },
  jigyasuEnglish: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: colors.neutrals.softAsh,
    marginBottom: spacing.md,
  },
  jigyasuMeaning: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.lg,
  },
  journeyHeading: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 1.6,
    color: colors.primary.deepSaffron,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  transitionWrap: {
    alignItems: 'center',
    paddingTop: spacing.xxl * 1.5,
    paddingHorizontal: spacing.xl,
  },
  transitionEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.primary.deepSaffron,
    marginBottom: spacing.lg,
  },
  transitionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.neutrals.softAsh,
    marginTop: spacing.lg,
  },
  transitionLesson: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginTop: 4,
  },
  transitionSpinner: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  continueBtn: {
    margin: spacing.lg,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadows.button,
  },
  continueBtnDisabled: {
    opacity: 0.4,
  },
  continueText: {
    ...typography.sizes.buttonText,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default OnboardingScreen;
