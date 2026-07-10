import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import KrishnaGuide from '../components/KrishnaGuide';
import LocalStorageService, { SpiritualProfile } from '../services/localStorageService';

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

const INTEREST_OPTIONS = [
  'Krishna',
  'Meditation',
  'Festivals',
  'Philosophy',
  'Scriptures',
];

const GOAL_OPTIONS: { value: SpiritualProfile['dailyGoalMinutes']; label: string; sub: string }[] = [
  { value: 5, label: '5 min / day', sub: 'Gentle' },
  { value: 10, label: '10 min / day', sub: 'Steady' },
  { value: 15, label: '15 min / day', sub: 'Devoted' },
  { value: 20, label: '20 min / day', sub: 'Immersed' },
];

const TOTAL_STEPS = 5;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [familiarity, setFamiliarity] = useState<SpiritualProfile['familiarity'] | null>(null);
  const [intentions, setIntentions] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState<SpiritualProfile['dailyGoalMinutes'] | null>(null);

  const firstName = name.trim().split(/\s+/)[0] || '';

  const stepMessages = [
    'Namaste! I’m Krishna — I’ll walk beside you on this journey. What may I call you?',
    firstName
      ? `Lovely to meet you, ${firstName}. How familiar are you with Hindu teachings?`
      : 'How familiar are you with Hindu teachings?',
    'Wonderful. What brings you here? Choose all that speak to you.',
    'And what draws you most? I’ll keep these close as we walk together.',
    firstName
      ? `One last thing, ${firstName} — how much time shall we spend together each day?`
      : 'One last thing — how much time shall we spend together each day?',
  ];

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const canContinue =
    (step === 0 && firstName.length > 0) ||
    (step === 1 && familiarity !== null) ||
    (step === 2 && intentions.length > 0) ||
    (step === 3 && interests.length > 0) ||
    (step === 4 && dailyGoal !== null);

  const finish = async () => {
    // Merge, don't overwrite: replaying onboarding ("Edit my answers") must
    // preserve the rolling summary and structured knowledge learned since.
    const patch: Partial<SpiritualProfile> = {
      familiarity: familiarity ?? 'some',
      intentions,
      interests,
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
            INTEREST_OPTIONS.map(o =>
              renderOption(interests.includes(o), o, undefined, () => toggle(interests, setInterests, o), o)
            )}

          {step === 4 &&
            GOAL_OPTIONS.map(o =>
              renderOption(dailyGoal === o.value, o.label, o.sub, () => setDailyGoal(o.value), String(o.value))
            )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
        onPress={next}
        disabled={!canContinue}
      >
        <Text style={styles.continueText}>{step === TOTAL_STEPS - 1 ? "I'm committed" : 'Continue'}</Text>
      </TouchableOpacity>
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
