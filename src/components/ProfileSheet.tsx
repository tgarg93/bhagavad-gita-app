import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import KrishnaGuide from './KrishnaGuide';
import OnboardingScreen from '../screens/OnboardingScreen';
import LocalStorageService, { SpiritualProfile, ReflectionEntry } from '../services/localStorageService';
import { getProgression, Progression } from '../services/progressionService';
import krishnaContext from '../services/krishnaContextService';

interface ProfileSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({ visible, onClose }) => {
  const [profile, setProfile] = useState<SpiritualProfile | null>(null);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const load = useCallback(async () => {
    setProfile(await LocalStorageService.getSpiritualProfile());
    setProgression(await getProgression());
  }, []);

  useEffect(() => {
    if (visible) load();
  }, [visible, load]);

  const greeting = profile?.name ? `Namaste, ${profile.name}.` : 'Namaste.';
  const levelLine = progression
    ? `You walk as a ${progression.level.sanskrit} — ${progression.level.english}.` +
      (progression.nextLevel
        ? ` ${progression.pointsToNext} wisdom points until ${progression.nextLevel.sanskrit}.`
        : ' You have reached the highest step — now you guide others.')
    : '';

  // ---- Dev tools (development builds only) --------------------------------
  const synthesizeReflections = (count: number): ReflectionEntry[] => {
    const now = Date.now();
    return Array.from({ length: count }, (_, i) => ({
      id: `dev-refl-${now}-${i}`,
      userId: 'guest',
      chapterNumber: (i % 18) + 1,
      questionIndex: i % 3,
      question: 'Dev preset question',
      answer: 'Dev preset reflection answer about letting go of outcomes at work.',
      krishnaResponse: 'A warm preset response from Krishna.',
      createdAt: new Date(now - i * 86400000).toISOString(),
    }));
  };

  const applyPreset = async (
    label: string,
    verses: number,
    chapters: number,
    reflections: number
  ) => {
    // Verse progress
    const readVerses: string[] = [];
    const perChapter = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    outer: for (let ch = 1; ch <= 18; ch++) {
      for (let v = 1; v <= perChapter[ch - 1]; v++) {
        if (readVerses.length >= verses) break outer;
        readVerses.push(`${ch}.${v}`);
      }
    }
    // Direct writes through the service's own storage keys
    await (LocalStorageService as any).saveVerseProgress?.({ readVerses, lastPageIndex: 0 });
    // saveVerseProgress is private; fall back to marking (fast enough for presets)
    if (!(LocalStorageService as any).saveVerseProgress) {
      for (const key of readVerses) {
        const [c, v] = key.split('.').map(Number);
        // eslint-disable-next-line no-await-in-loop
        await LocalStorageService.markVerseRead(c, v);
      }
    }

    let userProgress = await LocalStorageService.getUserProgress('guest');
    if (!userProgress) {
      userProgress = await LocalStorageService.createDefaultUserProgress('guest', 'Guest', '');
    }
    userProgress.chaptersCompleted = Array.from({ length: chapters }, (_, i) => i + 1);
    await LocalStorageService.saveUserProgress(userProgress);

    // Replace reflections wholesale
    const existing = await LocalStorageService.getAllReflections();
    for (const r of existing) {
      // eslint-disable-next-line no-await-in-loop
      await LocalStorageService.deleteReflection(r.id);
    }
    for (const r of synthesizeReflections(reflections)) {
      // eslint-disable-next-line no-await-in-loop
      await LocalStorageService.saveReflection(r);
    }

    await load();
    Alert.alert('Dev preset applied', label);
  };

  const devDumpState = async () => {
    const [p, prog, vp, refl] = await Promise.all([
      LocalStorageService.getSpiritualProfile(),
      getProgression(),
      LocalStorageService.getVerseProgress(),
      LocalStorageService.getAllReflections(),
    ]);
    console.log('=== DEV STATE DUMP ===');
    console.log('profile:', JSON.stringify(p, null, 2));
    console.log('progression:', JSON.stringify(prog, null, 2));
    console.log('verseProgress: read', vp.readVerses.length, 'lastPage', vp.lastPageIndex);
    console.log('reflections:', refl.length);
    Alert.alert('Dumped', 'State printed to Metro console');
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Journey</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <KrishnaGuide message={`${greeting} ${levelLine}`} />

          {progression && (
            <View style={styles.levelCard}>
              <View style={styles.levelRow}>
                <Text style={styles.levelSanskrit}>{progression.level.sanskrit}</Text>
                <Text style={styles.levelPoints}>{progression.points} pts</Text>
              </View>
              <Text style={styles.levelEnglish}>{progression.level.english} · Level {progression.level.level} of 7</Text>
              <View style={styles.levelTrack}>
                <View style={[styles.levelFill, { width: `${Math.round(progression.progressToNext * 100)}%` }]} />
              </View>
              {progression.nextLevel && (
                <Text style={styles.levelNext}>
                  Next: {progression.nextLevel.sanskrit} ({progression.nextLevel.english}) at {progression.nextLevel.minPoints} pts
                </Text>
              )}

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{progression.stats.versesRead}</Text>
                  <Text style={styles.statLabel}>verses</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{progression.stats.chaptersCompleted}</Text>
                  <Text style={styles.statLabel}>chapters</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{progression.stats.reflections}</Text>
                  <Text style={styles.statLabel}>reflections</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{profile?.dailyGoalMinutes ?? 10}m</Text>
                  <Text style={styles.statLabel}>daily goal</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.editBtn} onPress={() => setShowOnboarding(true)}>
            <Ionicons name="create-outline" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            <Text style={styles.editBtnText}>Edit my answers</Text>
          </TouchableOpacity>

          {profile?.profileSummary && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>What Krishna remembers</Text>
              <Text style={styles.summaryText}>{profile.profileSummary}</Text>
            </View>
          )}

          {__DEV__ && (
            <View style={styles.devSection}>
              <Text style={styles.devTitle}>Dev Tools</Text>
              <TouchableOpacity style={styles.devBtn} onPress={() => setShowOnboarding(true)}>
                <Text style={styles.devBtnText}>Replay onboarding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.devBtn}
                onPress={async () => {
                  await LocalStorageService.clearAllData();
                  await load();
                  Alert.alert('Cleared', 'Fresh install state. Reload the app to see onboarding.');
                }}
              >
                <Text style={styles.devBtnText}>Fresh install (wipe all)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={() => applyPreset('New user (0 progress)', 0, 0, 0)}>
                <Text style={styles.devBtnText}>Preset: New user (0 pts)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={() => applyPreset('Sadhaka mid-journey', 150, 3, 5)}>
                <Text style={styles.devBtnText}>Preset: Sadhaka (~465 pts)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={() => applyPreset('Almost Rishi', 700, 18, 64)}>
                <Text style={styles.devBtnText}>Preset: Almost Rishi (~2,900 pts)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={() => applyPreset('Guru', 700, 18, 210)}>
                <Text style={styles.devBtnText}>Preset: Guru (5,000+ pts)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.devBtn}
                onPress={async () => {
                  await LocalStorageService.updateSpiritualProfile({ profileSummary: undefined, reflectionCountAtSummary: 0 });
                  await krishnaContext.maybeRefreshSummary();
                  await load();
                  Alert.alert('Summary', 'Regeneration triggered (check console / reopen sheet)');
                }}
              >
                <Text style={styles.devBtnText}>Regenerate profile summary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={devDumpState}>
                <Text style={styles.devBtnText}>Dump state to console</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Re-run onboarding inline; saving updates the profile and closes */}
        <Modal visible={showOnboarding} animationType="slide" onRequestClose={() => setShowOnboarding(false)}>
          <OnboardingScreen
            onComplete={() => {
              setShowOnboarding(false);
              load();
            }}
          />
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutrals.sandstoneBeige },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 81, 0, 0.15)',
  },
  headerTitle: { ...typography.sizes.headingMD, color: colors.neutrals.charcoalBlack, fontWeight: '600' },
  closeBtn: { padding: spacing.xs },
  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  levelCard: {
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    ...shadows.soft,
  },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  levelSanskrit: { ...typography.sizes.headingLG, color: colors.primary.deepSaffron, fontWeight: '700' },
  levelPoints: { ...typography.sizes.bodyMD, color: colors.neutrals.softAsh, fontWeight: '600' },
  levelEnglish: { ...typography.sizes.bodyMD, color: colors.neutrals.charcoalBlack, marginTop: 2, marginBottom: spacing.md },
  levelTrack: { height: 8, borderRadius: 4, backgroundColor: colors.neutrals.gentleMist, overflow: 'hidden' },
  levelFill: { height: '100%', borderRadius: 4, backgroundColor: colors.primary.deepSaffron },
  levelNext: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, marginTop: spacing.sm },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  stat: { alignItems: 'center', flex: 1 },
  statNum: { ...typography.sizes.headingMD, color: colors.neutrals.charcoalBlack, fontWeight: '700' },
  statLabel: { ...typography.sizes.caption, color: colors.neutrals.softAsh, marginTop: 2 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    backgroundColor: colors.neutrals.warmIvory,
  },
  editBtnText: { ...typography.sizes.bodyMD, color: colors.primary.deepSaffron, fontWeight: '600' },
  summaryCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary.peacockTeal,
  },
  summaryLabel: { ...typography.sizes.caption, color: colors.primary.peacockTeal, fontWeight: '700', marginBottom: spacing.xs },
  summaryText: { ...typography.sizes.bodyMD, color: colors.neutrals.charcoalBlack, lineHeight: 22, fontStyle: 'italic' },
  devSection: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.neutrals.softAsh,
    gap: spacing.sm,
  },
  devTitle: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, fontWeight: '700', textTransform: 'uppercase' },
  devBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.small,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  devBtnText: { ...typography.sizes.bodySM, color: colors.neutrals.charcoalBlack },
});

export default ProfileSheet;
