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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import KrishnaGuide from '../components/KrishnaGuide';
import JourneyPathView from '../components/JourneyPathView';
import LocalStorageService, { SpiritualProfile } from '../services/localStorageService';
import journeyService from '../services/journeyService';
import { getDailyAtom, ATOM_TAGS } from '../data/dailyAtoms';
import { getDailyVerse } from '../data/dailyVerse';

interface OnboardingScreenProps {
  onComplete: () => void;
}

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

const TOTAL_STEPS = 7;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [familiarity, setFamiliarity] = useState<SpiritualProfile['familiarity'] | null>(null);
  const [intentions, setIntentions] = useState<string[]>([]);
  const [familyStream, setFamilyStream] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState<SpiritualProfile['dailyGoalMinutes'] | null>(null);

  const firstName = name.trim().split(/\s+/)[0] || '';

  const stepMessages = [
    'Namaste! I’m Krishna — I’ll walk beside you on this journey. What may I call you?',
    firstName
      ? `Lovely to meet you, ${firstName}. How familiar are you with Hindu teachings?`
      : 'How familiar are you with Hindu teachings?',
    'Wonderful. What brings you here? Choose all that speak to you.',
    firstName
      ? `Every family holds the divine through a face, ${firstName}. Growing up, whose was closest in your home?`
      : 'Every family holds the divine through a face. Growing up, whose was closest in your home?',
    firstName
      ? `One last thing, ${firstName} — how much time shall we spend together each day?`
      : 'One last thing — how much time shall we spend together each day?',
    firstName
      ? `Here is the road we'll walk together, ${firstName} — five stages, one step at a time.`
      : "Here is the road we'll walk together — five stages, one step at a time.",
    firstName
      ? `One more thing, ${firstName} — each morning I'll have chai waiting: one small sip of wisdom and the day's verse, right on your Home screen. Under a minute. Now — shall we take the first step together?`
      : "One more thing — each morning I'll have chai waiting: one small sip of wisdom and the day's verse, right on your Home screen. Under a minute. Now — shall we take the first step together?",
  ];

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const canContinue =
    (step === 0 && firstName.length > 0) ||
    (step === 1 && familiarity !== null) ||
    (step === 2 && intentions.length > 0) ||
    (step === 3 && familyStream !== null) ||
    (step === 4 && dailyGoal !== null) ||
    step === 5; // the path finale just needs a look, not an answer

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

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else finish();
  };

  // Send-off: the final step auto-advances into the first lesson — no button.
  // A ref guards against the timer and the escape link double-firing.
  const [firstStepTitle, setFirstStepTitle] = useState('What is Hinduism?');
  const departedRef = useRef(false);

  useEffect(() => {
    journeyService
      .getNextUnfinished()
      .then(item => item && setFirstStepTitle(item.title))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (step !== TOTAL_STEPS - 1) return;
    const timer = setTimeout(() => {
      if (departedRef.current) return;
      departedRef.current = true;
      journeyService.setPendingStart();
      finish();
    }, 4000);
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
          <View style={[styles.progressFill, { width: `${((step + 1) / TOTAL_STEPS) * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <KrishnaGuide message={stepMessages[step]} />

        <View style={styles.options}>
          {step === 0 && (
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

          {step === 1 &&
            FAMILIARITY_OPTIONS.map(o =>
              renderOption(familiarity === o.value, o.label, o.sub, () => setFamiliarity(o.value), o.value)
            )}

          {step === 2 &&
            INTENTION_OPTIONS.map(o =>
              renderOption(intentions.includes(o), o, undefined, () => toggle(intentions, setIntentions, o), o)
            )}

          {step === 3 &&
            FAMILY_STREAM_OPTIONS.map(o =>
              renderOption(familyStream === o.value, o.label, o.sub, () => setFamilyStream(o.value), o.value)
            )}

          {step === 4 &&
            GOAL_OPTIONS.map(o =>
              renderOption(dailyGoal === o.value, o.label, o.sub, () => setDailyGoal(o.value), String(o.value))
            )}
        </View>

        {step === 5 && <JourneyPathView scrollable={false} />}

        {step === 6 && (
          <View style={styles.rhythmWrap}>
            {/* Live preview of today's actual chai — show the ritual, don't describe it */}
            <View style={styles.rhythmCard}>
              <Text style={styles.rhythmTag}>
                ☕ DAILY CHAI · {ATOM_TAGS[getDailyAtom().type].toUpperCase()}
              </Text>
              <Text style={styles.rhythmHook}>{getDailyAtom().hook}</Text>
              <View style={styles.rhythmDivider} />
              <Text style={styles.rhythmTag}>TODAY'S VERSE</Text>
              <Text style={styles.rhythmVerse} numberOfLines={3}>
                “{getDailyVerse().english}”
              </Text>
            </View>

            <View style={styles.departRow}>
              <ActivityIndicator size="small" color={DharmaDesignSystem.colors.primary.deepSaffron} />
              <Text style={styles.departText}>
                Let's get started with “{firstStepTitle}”…
              </Text>
            </View>
            <TouchableOpacity onPress={exploreInstead} style={styles.skipBtn}>
              <Text style={styles.skipText}>I'll explore on my own</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {step < 6 && (
        <TouchableOpacity
          style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
          onPress={next}
          disabled={!canContinue}
        >
          <Text style={styles.continueText}>{step === 4 ? "I'm committed" : 'Continue'}</Text>
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
  rhythmCard: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.14)',
    padding: spacing.md,
    ...shadows.soft,
  },
  rhythmTag: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: colors.primary.deepSaffron,
    marginBottom: 5,
  },
  rhythmHook: {
    ...typography.sizes.headingSM,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginBottom: spacing.sm + 2,
  },
  rhythmDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(33, 33, 33, 0.08)',
    marginBottom: spacing.sm + 2,
  },
  rhythmVerse: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
  },
  departRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  departText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
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
