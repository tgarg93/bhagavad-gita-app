import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import CelebrationGauge from '../components/CelebrationGauge';
import OnboardingScreen from './OnboardingScreen';
import LocalStorageService, { SpiritualProfile, ReflectionEntry, NotificationSettings } from '../services/localStorageService';
import notificationService from '../services/notificationService';
import journeyService from '../services/journeyService';
import { JourneyItem, JOURNEY_MODULES, navigateToJourneyItem } from '../data/journeyPath';
import { getProgression, Progression, LEVELS } from '../services/progressionService';
import krishnaContext from '../services/krishnaContextService';
import { userKnowledge } from '../services/userKnowledgeService';
import { profilePhotoStore, useProfilePhoto } from '../services/profilePhotoStore';
import {
  CATEGORIES,
  USER_KNOWLEDGE_FIELDS,
  UserKnowledgeField,
  UserKnowledgeKey,
} from '../data/userKnowledgeSchema';

// Typed separately: inside StyleSheet.create the style resolves to a union
// that Image's style prop rejects
const PHOTO_SIZE = 112;
const photoStyle = {
  width: PHOTO_SIZE,
  height: PHOTO_SIZE,
  borderRadius: PHOTO_SIZE / 2,
  resizeMode: 'cover',
} as const;

// Image styles hit a union error inside StyleSheet.create — keep as a const.
const nextThumbStyle = { width: 44, height: 44, borderRadius: 10 } as const;

// Plain-language mirror of the points formula in progressionService (POINTS +
// CHECK_POINTS). Capstones are called out separately below — a rite confers the
// level as a floor, which matters more than its point value.
const EARN_ROWS: { label: string; pts: string }[] = [
  { label: 'Read a Gita verse', pts: '+2' },
  { label: 'Complete a chapter', pts: '+30' },
  { label: 'Write a reflection', pts: '+15' },
  { label: 'Finish a journey step', pts: '+30' },
  { label: 'Pass a knowledge check', pts: '+2' },
  { label: 'Bank a Foundations card', pts: '+1' },
];

const ProfileTabScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<SpiritualProfile | null>(null);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [nextStep, setNextStep] = useState<JourneyItem | null>(null);

  const [reminders, setReminders] = useState<NotificationSettings | null>(null);
  const [remindersPermitted, setRemindersPermitted] = useState(true);

  const load = useCallback(async () => {
    setProfile(await LocalStorageService.getSpiritualProfile());
    setProgression(await getProgression());
    setNextStep(await journeyService.getNextUnfinished());
    setReminders(await notificationService.getSettings());
    setRemindersPermitted(await notificationService.hasPermission());
  }, []);

  const toggleReminder = async (key: keyof NotificationSettings, value: boolean) => {
    const updated = await notificationService.updateSettings({ [key]: value });
    setReminders(updated);
    if (value && !(await notificationService.hasPermission())) {
      await notificationService.ensurePermissions();
      setRemindersPermitted(await notificationService.hasPermission());
    }
  };

  // Reload whenever the tab regains focus
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );


  // ---- Profile photo (Partiful-style) --------------------------------------
  const photoUri = useProfilePhoto();

  const pickProfilePhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Photos access needed',
          'Enable photo access for Dharma in iOS Settings to set a profile picture.'
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (result.canceled || !result.assets?.[0]?.uri) return;

      // Copy into the app's documents dir with a timestamped name (busts the
      // Image cache) and clean up the previous photo file
      const previous = profilePhotoStore.getUri();
      const dest = `${FileSystem.documentDirectory}profile-photo-${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: result.assets[0].uri, to: dest });
      await LocalStorageService.updateSpiritualProfile({ profilePhotoUri: dest });
      profilePhotoStore.setUri(dest);
      if (previous && previous.startsWith(FileSystem.documentDirectory ?? '')) {
        FileSystem.deleteAsync(previous, { idempotent: true }).catch(() => {});
      }
    } catch (error) {
      console.log('[profile] photo pick failed:', error);
      Alert.alert('Could not set photo', 'Something went wrong picking the image.');
    }
  };

  // ---- "What Krishna knows of you" completion card ------------------------
  const [expandedKey, setExpandedKey] = useState<UserKnowledgeKey | null>(null);
  const [draft, setDraft] = useState('');
  const [draftList, setDraftList] = useState<string[]>([]);

  const completion = profile ? userKnowledge.getCompletion(profile) : null;

  // Raw stored value for editing (canonical option values, not display labels)
  const currentSelection = (field: UserKnowledgeField): string | string[] => {
    if (!profile) return field.kind === 'multiSelect' ? [] : '';
    switch (field.key) {
      case 'name':
        return profile.name ?? '';
      case 'familiarity':
        return profile.familiarity;
      case 'intentions':
        return profile.intentions;
      case 'interests':
        return profile.interests;
      case 'dailyGoalMinutes':
        return String(profile.dailyGoalMinutes);
      default:
        return profile.structuredProfile?.[field.key]?.value ?? '';
    }
  };

  const toggleRow = (field: UserKnowledgeField) => {
    if (expandedKey === field.key) {
      setExpandedKey(null);
      return;
    }
    const current = currentSelection(field);
    if (field.kind === 'multiSelect') setDraftList(current as string[]);
    else setDraft(current as string);
    setExpandedKey(field.key);
  };

  const saveField = async (key: UserKnowledgeKey, value: string | string[]) => {
    setProfile(await userKnowledge.setField(key, value, 'user'));
    setExpandedKey(null);
  };

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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Journey</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Partiful-style photo header */}
          <View style={styles.photoHeader}>
            <View style={styles.photoWrap}>
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  style={photoStyle}
                  onError={() => profilePhotoStore.setUri(undefined)}
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="person" size={52} color={DharmaDesignSystem.colors.neutrals.softAsh} />
                </View>
              )}
              <TouchableOpacity style={styles.cameraBadge} onPress={pickProfilePhoto}>
                <Ionicons name="camera" size={17} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {!!profile?.name && <Text style={styles.photoName}>{profile.name}</Text>}
          </View>

          {progression && (
            <View style={styles.levelCard}>
              <View style={styles.levelRow}>
                <Text style={styles.levelSanskrit}>{progression.level.sanskrit}</Text>
                <Text style={styles.levelPoints}>{progression.points} pts</Text>
              </View>
              <Text style={styles.levelEnglish}>{progression.level.english} · Level {progression.level.level} of 7</Text>

              {/* The same arch gauge the completion screen uses — filled to the
                  reader's place within the current level band. Static here (no
                  sweep), so fromFrac === toFrac. */}
              <View style={styles.gaugeWrap}>
                <CelebrationGauge
                  fromFrac={progression.progressToNext}
                  toFrac={progression.progressToNext}
                  stageName={progression.level.sanskrit}
                />
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

              <TouchableOpacity
                style={styles.detailsRow}
                onPress={() => setShowDetails(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.detailsText}>How your level works</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.primary.peacockTeal} />
              </TouchableOpacity>
            </View>
          )}

          {profile && completion && (
            <View style={styles.knowCard}>
              <Text style={styles.summaryLabel}>What Krishna knows of you</Text>
              <View style={styles.knowProgressRow}>
                <View style={[styles.levelTrack, styles.knowTrack]}>
                  <View
                    style={[
                      styles.levelFill,
                      { width: `${Math.round((completion.known / completion.total) * 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.knowCount}>
                  {completion.known} of {completion.total}
                </Text>
              </View>

              {CATEGORIES.map(category => (
                <View key={category}>
                  <Text style={styles.knowCategory}>{category}</Text>
                  {USER_KNOWLEDGE_FIELDS.filter(f => f.category === category).map(field => {
                    const known = userKnowledge.getDisplayValue(profile, field.key);
                    const expanded = expandedKey === field.key;
                    return (
                      <View key={field.key}>
                        <TouchableOpacity style={styles.knowRow} onPress={() => toggleRow(field)}>
                          {known !== undefined ? (
                            <>
                              <View style={styles.knowRowText}>
                                <Text style={styles.knowLabel}>{field.label}</Text>
                                <Text style={styles.knowValue}>{known}</Text>
                              </View>
                              <Ionicons name="create-outline" size={16} color={colors.neutrals.softAsh} />
                            </>
                          ) : (
                            <>
                              <Text style={styles.knowAsk}>{field.askPrompt}</Text>
                              <Ionicons name="add-circle-outline" size={18} color={colors.primary.deepSaffron} />
                            </>
                          )}
                        </TouchableOpacity>

                        {expanded && field.kind === 'freeText' && (
                          <View style={styles.knowEditor}>
                            <TextInput
                              style={styles.knowInput}
                              value={draft}
                              onChangeText={setDraft}
                              placeholder="Share as much or as little as you like"
                              placeholderTextColor={colors.neutrals.softAsh}
                              maxLength={field.maxLen ?? 60}
                              autoFocus
                            />
                            <View style={styles.knowEditorActions}>
                              <TouchableOpacity onPress={() => setExpandedKey(null)}>
                                <Text style={styles.knowCancel}>Cancel</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                disabled={!draft.trim()}
                                onPress={() => saveField(field.key, draft)}
                              >
                                <Text style={[styles.knowSave, !draft.trim() && styles.knowSaveDisabled]}>
                                  Save
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}

                        {expanded && field.kind !== 'freeText' && (
                          <View style={styles.knowChips}>
                            {(field.options ?? []).map(option => {
                              const selected =
                                field.kind === 'multiSelect'
                                  ? draftList.includes(option.value)
                                  : draft === option.value;
                              return (
                                <TouchableOpacity
                                  key={option.value}
                                  style={[styles.knowChip, selected && styles.knowChipSelected]}
                                  onPress={() => {
                                    if (field.kind === 'multiSelect') {
                                      setDraftList(
                                        draftList.includes(option.value)
                                          ? draftList.filter(v => v !== option.value)
                                          : [...draftList, option.value]
                                      );
                                    } else {
                                      saveField(field.key, option.value);
                                    }
                                  }}
                                >
                                  <Text style={[styles.knowChipText, selected && styles.knowChipTextSelected]}>
                                    {option.label}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                            {field.kind === 'multiSelect' && (
                              <TouchableOpacity
                                style={[styles.knowDone, draftList.length === 0 && styles.knowDoneDisabled]}
                                disabled={draftList.length === 0}
                                onPress={() => saveField(field.key, draftList)}
                              >
                                <Text style={styles.knowDoneText}>Done</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          )}

          {profile?.profileSummary && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>What Krishna remembers</Text>
              <Text style={styles.summaryText}>{profile.profileSummary}</Text>
            </View>
          )}

          {reminders && (
            <View style={styles.remindersCard}>
              <Text style={styles.summaryLabel}>Reminders</Text>
              {!remindersPermitted && (
                <Text style={styles.remindersHint}>
                  Notifications are off for this app — enable them in iOS Settings for reminders to arrive.
                </Text>
              )}
              {(
                [
                  { key: 'dailyWisdom', label: 'Morning wisdom', sub: 'A daily Gita verse at 8:00' },
                  { key: 'journeyNudge', label: 'Journey nudge', sub: 'Your next step, evenings you’ve been away' },
                  { key: 'festivals', label: 'Festival reminders', sub: '3 days before and on the day' },
                  { key: 'streak', label: 'Streak protection', sub: 'A gentle 9pm nudge when a streak is at risk' },
                ] as { key: keyof NotificationSettings; label: string; sub: string }[]
              ).map(row => (
                <View key={row.key} style={styles.reminderRow}>
                  <View style={styles.reminderText}>
                    <Text style={styles.reminderLabel}>{row.label}</Text>
                    <Text style={styles.reminderSub}>{row.sub}</Text>
                  </View>
                  <Switch
                    value={!!reminders[row.key]}
                    onValueChange={v => toggleReminder(row.key, v)}
                    trackColor={{ true: colors.primary.deepSaffron, false: undefined }}
                  />
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.manageRow}
            onPress={() => (navigation as any).navigate('DataManagement')}
          >
            <View style={styles.reminderText}>
              <Text style={styles.manageLabel}>Account &amp; data</Text>
              <Text style={styles.reminderSub}>Back up, export, or delete your account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.neutrals.softAsh} />
          </TouchableOpacity>

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
              <TouchableOpacity
                style={styles.devBtn}
                onPress={async () => {
                  await userKnowledge.clearStructuredFields();
                  await load();
                  Alert.alert('Cleared', 'Structured profile fields cleared');
                }}
              >
                <Text style={styles.devBtnText}>Clear structured fields</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.devBtn}
                onPress={async () => {
                  await userKnowledge.maybeExtractFromReflection(
                    'What duty do you find hardest?',
                    "I'm a software engineer in my early career, married with a young daughter. I meditate for ten minutes early each morning on my own, but lately I'm struggling with anger when work goes badly. I grew up Hindu in Delhi and I want to become more patient."
                  );
                  await load();
                  Alert.alert('Extraction', 'Canned extraction ran (see Metro console)');
                }}
              >
                <Text style={styles.devBtnText}>Test extraction (canned answer)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.devBtn} onPress={devDumpState}>
                <Text style={styles.devBtnText}>Dump state to console</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        </KeyboardAvoidingView>

        {/* "See details" — how the journey is tracked, the seven steps, next step */}
        <Modal
          visible={showDetails}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDetails(false)}
        >
          <View style={styles.sheetBackdrop}>
            <TouchableOpacity
              style={styles.sheetDismiss}
              activeOpacity={1}
              onPress={() => setShowDetails(false)}
            />
            <View style={styles.sheet}>
              <View style={styles.sheetGrip} />
              <ScrollView contentContainerStyle={styles.sheetBody} showsVerticalScrollIndicator={false}>
                <Text style={styles.sheetTitle}>How your journey is tracked</Text>
                {progression && (
                  <Text style={styles.sheetSub}>
                    You walk as {progression.level.sanskrit} — {progression.level.english}.
                    {progression.nextLevel
                      ? ` ${progression.pointsToNext} wisdom points until ${progression.nextLevel.sanskrit}.`
                      : ' You have reached the highest step — now you guide others.'}
                  </Text>
                )}

                <Text style={styles.sheetHeading}>How you earn wisdom points</Text>
                {EARN_ROWS.map(row => (
                  <View key={row.label} style={styles.earnRow}>
                    <Text style={styles.earnLabel}>{row.label}</Text>
                    <Text style={styles.earnPts}>{row.pts}</Text>
                  </View>
                ))}
                <Text style={styles.sheetFloor}>
                  Stage capstones confer the level outright — a floor you never drop below.
                </Text>

                <Text style={styles.sheetHeading}>The seven steps</Text>
                {LEVELS.map(l => {
                  const here = progression?.level.level === l.level;
                  const done = (progression?.level.level ?? 1) > l.level;
                  return (
                    <View key={l.level} style={styles.rung}>
                      <View
                        style={[
                          styles.rungNode,
                          done && styles.rungNodeDone,
                          here && styles.rungNodeHere,
                        ]}
                      />
                      <Text style={[styles.rungName, here && styles.rungNameHere]}>
                        {l.sanskrit} — {l.english}
                      </Text>
                      <Text style={styles.rungPts}>{l.minPoints.toLocaleString()}</Text>
                    </View>
                  );
                })}

                {nextStep && (
                  <>
                    <Text style={styles.sheetHeading}>Your next step</Text>
                    <TouchableOpacity
                      style={styles.dNext}
                      activeOpacity={0.85}
                      onPress={() => {
                        setShowDetails(false);
                        navigateToJourneyItem(navigation, nextStep);
                      }}
                    >
                      <Image
                        source={typeof nextStep.cover === 'string' ? { uri: nextStep.cover } : nextStep.cover}
                        style={nextThumbStyle}
                      />
                      <View style={styles.dNextText}>
                        <Text style={styles.dNextEyebrow}>Continue your path</Text>
                        <Text style={styles.dNextTitle} numberOfLines={1}>
                          {nextStep.title} · {JOURNEY_MODULES[nextStep.module]}
                        </Text>
                      </View>
                      <View style={styles.dNextGo}>
                        <Ionicons name="play" size={15} color="#FFFFFF" style={{ marginLeft: 2 }} />
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
              <TouchableOpacity style={styles.sheetClose} onPress={() => setShowDetails(false)}>
                <Text style={styles.sheetCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Re-run onboarding inline; saving updates the profile and closes */}
        <Modal visible={showOnboarding} animationType="slide" onRequestClose={() => setShowOnboarding(false)}>
          <OnboardingScreen
            // They have met Krishna and know what the app is — the two intro
            // screens are skipped on a replay.
            mode="edit"
            onComplete={() => {
              journeyService.consumePendingStart();
              setShowOnboarding(false);
              load();
            }}
          />
        </Modal>
      </SafeAreaView>
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
  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  // Partiful-style photo header
  photoHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  photoWrap: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
  },
  photoPlaceholder: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    backgroundColor: colors.neutrals.gentleMist,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(230, 81, 0, 0.2)',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.neutrals.sandstoneBeige,
  },
  photoName: {
    ...typography.sizes.headingLG,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
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
  gaugeWrap: { alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.xs },
  levelNext: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, marginTop: spacing.sm, textAlign: 'center' },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(33, 33, 33, 0.08)',
  },
  detailsText: { fontSize: 13.5, lineHeight: 18, fontWeight: '700', color: colors.primary.peacockTeal },
  // ---- See-details bottom sheet -------------------------------------------
  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },
  sheetDismiss: { flex: 1 },
  sheet: {
    backgroundColor: colors.neutrals.sandstoneBeige,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '88%',
    paddingBottom: spacing.md,
  },
  sheetGrip: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  sheetBody: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg },
  sheetTitle: { fontSize: 19, lineHeight: 24, fontWeight: '700', color: colors.neutrals.charcoalBlack },
  sheetSub: { fontSize: 13.5, lineHeight: 19, color: colors.neutrals.softAsh, marginTop: 4 },
  sheetHeading: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.primary.peacockTeal,
    fontWeight: '800',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  earnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(33, 33, 33, 0.08)',
  },
  earnLabel: { fontSize: 14, lineHeight: 18, color: colors.neutrals.charcoalBlack },
  earnPts: { fontSize: 14, fontWeight: '800', color: colors.primary.deepSaffron },
  sheetFloor: { fontSize: 12.5, lineHeight: 17, color: colors.neutrals.softAsh, fontStyle: 'italic', marginTop: spacing.sm },
  rung: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, paddingVertical: 5 },
  rungNode: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.neutrals.gentleMist,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  rungNodeDone: { backgroundColor: colors.primary.peacockTeal, borderColor: colors.primary.peacockTeal },
  rungNodeHere: { backgroundColor: colors.primary.deepSaffron, borderColor: colors.primary.deepSaffron },
  rungName: { flex: 1, fontSize: 14, lineHeight: 18, color: colors.neutrals.charcoalBlack },
  rungNameHere: { fontWeight: '700', color: colors.primary.deepSaffron },
  rungPts: { fontSize: 12, lineHeight: 16, color: colors.neutrals.softAsh, fontVariant: ['tabular-nums'] },
  dNext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.neutrals.warmIvory,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  dNextText: { flex: 1, minWidth: 0 },
  dNextEyebrow: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary.deepSaffron,
  },
  dNextTitle: { fontSize: 14, lineHeight: 18, fontWeight: '600', color: colors.neutrals.charcoalBlack, marginTop: 1 },
  dNextGo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetClose: { alignSelf: 'center', marginTop: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl },
  sheetCloseText: { fontSize: 14, lineHeight: 18, fontWeight: '700', color: colors.neutrals.softAsh },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  stat: { alignItems: 'center', flex: 1 },
  statNum: { ...typography.sizes.headingMD, color: colors.neutrals.charcoalBlack, fontWeight: '700' },
  statLabel: { ...typography.sizes.caption, color: colors.neutrals.softAsh, marginTop: 2 },
  flex: { flex: 1 },
  knowCard: {
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    ...shadows.soft,
  },
  knowProgressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm },
  knowTrack: { flex: 1 },
  knowCount: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, fontWeight: '600' },
  knowCategory: {
    ...typography.sizes.caption,
    color: colors.neutrals.softAsh,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  knowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  knowRowText: { flex: 1 },
  knowLabel: { ...typography.sizes.caption, color: colors.primary.peacockTeal, fontWeight: '600' },
  knowValue: { ...typography.sizes.bodyMD, color: colors.neutrals.charcoalBlack, marginTop: 1 },
  knowAsk: { ...typography.sizes.bodyMD, color: colors.neutrals.softAsh, fontStyle: 'italic', flex: 1 },
  knowEditor: { paddingVertical: spacing.sm, gap: spacing.sm },
  knowInput: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.charcoalBlack,
    backgroundColor: colors.neutrals.sandstoneBeige,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  knowEditorActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.lg,
    alignItems: 'center',
  },
  knowCancel: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, fontWeight: '600' },
  knowSave: { ...typography.sizes.bodySM, color: colors.primary.deepSaffron, fontWeight: '700' },
  knowSaveDisabled: { opacity: 0.4 },
  knowChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  knowChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  knowChipSelected: {
    backgroundColor: colors.primary.deepSaffron,
    borderColor: colors.primary.deepSaffron,
  },
  knowChipText: { ...typography.sizes.bodySM, fontWeight: '400', color: colors.neutrals.charcoalBlack },
  knowChipTextSelected: { color: colors.neutrals.warmIvory, fontWeight: '600' },
  knowDone: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary.peacockTeal,
  },
  knowDoneDisabled: { opacity: 0.4 },
  knowDoneText: { ...typography.sizes.bodySM, color: colors.neutrals.warmIvory, fontWeight: '700' },
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
  remindersCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary.deepSaffron,
  },
  manageRow: {
    marginTop: spacing.lg,
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  manageLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
  },
  remindersHint: {
    ...typography.sizes.bodySM,
    fontWeight: '400',
    color: colors.primary.deepSaffron,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  reminderText: { flex: 1 },
  reminderLabel: { ...typography.sizes.bodyMD, fontWeight: '600', color: colors.neutrals.charcoalBlack },
  reminderSub: { ...typography.sizes.caption, fontWeight: '400', color: colors.neutrals.softAsh, marginTop: 1 },
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

export default ProfileTabScreen;
