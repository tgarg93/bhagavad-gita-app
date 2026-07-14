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
import { getDailyAtom } from '../data/dailyAtoms';
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
  | 'familyStream'
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
  'familyStream',
  'goal',
  'identity',
  'journey',
  'chai',
  'sendoff',
];

const EDIT_STEPS: StepId[] = FIRST_RUN_STEPS.filter(
  s => s !== 'introApp' && s !== 'introKrishna'
);

const FAMILIARITY_OPTIONS: { value: SpiritualProfile['familiarity']; label: string; sub: string }[] = [
  { value: 'new', label: 'Just beginning', sub: 'New to Hindu teachings' },
  { value: 'some', label: 'Some familiarity', sub: 'Grew up around it or explored a little' },
  { value: 'deep', label: 'Well acquainted', sub: 'Comfortable with scriptures and practice' },
];

const INTENTION_OPTIONS = [
  'Learn the Bhagavad Gita',
  'Understand Hindu philosophy',
  'Build a daily practice',
  'Stories & festivals',
  'Personal growth',
];

// The question only this app would ask: the family's ishta-devata. Family
// tradition is a different signal than current intentions, and it seeds the
// Branches course's "ask your family" thread.
const FAMILY_STREAM_OPTIONS: { value: string; label: string; sub: string }[] = [
  { value: 'Krishna', label: 'Krishna', sub: 'Flute, stories, Janmashtami' },
  { value: 'Shiva', label: 'Shiva', sub: 'The ascetic, Shivratri nights' },
  { value: 'The Goddess', label: 'The Goddess', sub: 'Durga, Lakshmi, Navratri' },
  { value: 'Ganesha', label: 'Ganesha', sub: 'First prayers, new beginnings' },
  { value: 'Rama & Hanuman', label: 'Rama & Hanuman', sub: 'The Ramayana household' },
  { value: 'A mix of many', label: 'A mix of many', sub: 'Different faces on one altar' },
  { value: 'Not sure', label: 'Not sure', sub: 'And that\'s perfectly fine' },
];

const GOAL_OPTIONS: { value: SpiritualProfile['dailyGoalMinutes']; label: string; sub: string }[] = [
  { value: 5, label: '5 min / day', sub: 'Gentle' },
  { value: 10, label: '10 min / day', sub: 'Steady' },
  { value: 15, label: '15 min / day', sub: 'Devoted' },
  { value: 20, label: '20 min / day', sub: 'Immersed' },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, mode = 'firstRun' }) => {
  const steps = mode === 'edit' ? EDIT_STEPS : FIRST_RUN_STEPS;

  const [step, setStep] = useState(0);
  const [familiarity, setFamiliarity] = useState<SpiritualProfile['familiarity'] | null>(null);
  const [intentions, setIntentions] = useState<string[]>([]);
  const [familyStream, setFamilyStream] = useState<string | null>(null);
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
      'Namaste. I am Krishna.\n\nWhen Arjuna lost his way, I guided him. That conversation became the Gita.\n\nI will do the same for you — at every step, and whenever you ask.',
    name: 'So — what may I call you?',
    familiarity: firstName
      ? `Lovely to meet you, ${firstName}. How familiar are you with Hindu teachings?`
      : 'How familiar are you with Hindu teachings?',
    intentions: 'Wonderful. What brings you here? Choose all that speak to you.',
    familyStream: firstName
      ? `Every family holds the divine through a face, ${firstName}. Growing up, whose was closest in your home?`
      : 'Every family holds the divine through a face. Growing up, whose was closest in your home?',
    goal: firstName
      ? `One last thing, ${firstName} — how much time shall we spend together each day?`
      : 'One last thing — how much time shall we spend together each day?',
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
    (id === 'familyStream' && familyStream !== null) ||
    (id === 'goal' && dailyGoal !== null) ||
    id === 'identity' ||
    id === 'journey' ||
    id === 'chai';

  const finish = async () => {
    // Merge, don't overwrite: replaying onboarding ("Edit my answers") must
    // preserve the rolling summary and structured knowledge learned since.
    const patch: Partial<SpiritualProfile> = {
      familiarity: familiarity ?? 'some',
      intentions,
      familyStream: familyStream ?? '',
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

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Krishna is deliberately absent from the app intro — Dharma speaks
            first, and his own screen is his first appearance. He arrives there
            at full size, then shrinks to the talking head for the questions. */}
        {id === 'introKrishna' && (
          <KrishnaGuide size={96} message={stepMessages.introKrishna} />
        )}
        {id !== 'introApp' && id !== 'introKrishna' && !!stepMessages[id] && (
          <KrishnaGuide message={stepMessages[id]} />
        )}

        {/* Screen 1 — Dharma says what it is for. The three questions are all
            answered in Foundations (Diwali in Part 7, Ganesha in Part 5, karma
            in Part 4), so this is a teaser for content that actually exists. */}
        {id === 'introApp' && (
          <View style={styles.introWrap}>
            <Image
              source={require('../../assets/dharma-lotus-transparent.png')}
              style={introLogoStyle}
              resizeMode="contain"
            />
            <View style={styles.introQuestions}>
              <Text style={styles.introQuestion}>Why do we light lamps at Diwali?</Text>
              <Text style={styles.introQuestion}>Why is Ganesha greeted first?</Text>
              <Text style={styles.introQuestion}>What does karma actually mean?</Text>
            </View>
            <Text style={styles.introBody}>
              You have probably been asked.{'\n'}You may have guessed.
            </Text>
            <Text style={styles.introPromise}>
              Dharma is where you stop guessing — and become the one who knows.
            </Text>
          </View>
        )}

        <View style={styles.options}>
          {id === 'name' && (
            <>
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
            </>
          )}

          {id === 'familiarity' &&
            FAMILIARITY_OPTIONS.map(o =>
              renderOption(familiarity === o.value, o.label, o.sub, () => setFamiliarity(o.value), o.value)
            )}

          {id === 'intentions' &&
            INTENTION_OPTIONS.map(o =>
              renderOption(intentions.includes(o), o, undefined, () => toggle(intentions, setIntentions, o), o)
            )}

          {id === 'familyStream' &&
            FAMILY_STREAM_OPTIONS.map(o =>
              renderOption(familyStream === o.value, o.label, o.sub, () => setFamilyStream(o.value), o.value)
            )}

          {id === 'goal' &&
            GOAL_OPTIONS.map(o =>
              renderOption(dailyGoal === o.value, o.label, o.sub, () => setDailyGoal(o.value), String(o.value))
            )}
        </View>

        {id === 'identity' && (
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
            <View style={styles.jigyasuCard}>
              <Text style={styles.jigyasuEmblem}>🪷</Text>
              <Text style={styles.jigyasuEyebrow}>YOU BEGIN AS</Text>
              <Text style={styles.jigyasuName}>Jigyasu</Text>
              <Text style={styles.jigyasuEnglish}>The Curious · Level 1 of 7</Text>
              <Text style={styles.jigyasuMeaning}>{LEVEL_MEANINGS[1]}</Text>
              <ProgressRungs level={LEVELS[0]} nextLevel={LEVELS[1]} progressToNext={0} />
            </View>
          </Animated.View>
        )}

        {id === 'journey' && (
          <>
            <Text style={styles.journeyHeading}>YOUR SPIRITUAL JOURNEY</Text>
            <JourneyPathView scrollable={false} entrance />
          </>
        )}

        {id === 'chai' && (
          <View style={styles.rhythmWrap}>
            {/* Live preview of today's actual chai — the same unified card the
                Home screen shows, compact and action-less */}
            <DailyChaiCard atom={getDailyAtom()} compact />
          </View>
        )}

        {id === 'sendoff' && (
          <View style={styles.transitionWrap}>
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
          </View>
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
    gap: spacing.md,
    alignSelf: 'stretch',
  },
  introQuestion: {
    fontSize: 21,
    lineHeight: 29,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
  },
  introBody: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  introPromise: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
    color: colors.primary.deepSaffron,
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.14)',
    alignSelf: 'stretch',
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
