import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors, NavigationColors } from '../constants/colors';
import { DharmaDesignSystem, createTextStyle, createCardStyle } from '../constants/DharmaDesignSystem';
import { getDailyAtom } from '../data/dailyAtoms';
import DailyChaiCard, { speakableSequence } from '../components/DailyChaiCard';
import { getTodaysFestivals, getUpcomingFestivals, getNextOccurrence, getDaysUntilFestival, Festival } from '../data/festivals';
import journeyService from '../services/journeyService';
import { foundationsService } from '../services/foundationsService';
import { getProgression, Progression } from '../services/progressionService';
import LocalStorageService from '../services/localStorageService';
import { AudioNarrationService } from '../services/audioNarrationService';
import { JourneyItem, JOURNEY_MODULES, navigateToJourneyItem } from '../data/journeyPath';

const { width } = Dimensions.get('window');

// Typed separately: inside StyleSheet.create the style resolves to a union
// that Image's style prop rejects
const continueThumbStyle = {
  width: 52,
  height: 52,
  borderRadius: DharmaDesignSystem.borderRadius.medium,
  resizeMode: 'cover',
} as const;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todaysAtom] = useState(getDailyAtom());
  const [speaking, setSpeaking] = useState(false);
  const audioService = React.useRef(AudioNarrationService.getInstance()).current;
  const [progression, setProgression] = useState<Progression | null>(null);
  const [todaysFestivals, setTodaysFestivals] = useState(getTodaysFestivals());
  const [upcomingFestivals, setUpcomingFestivals] = useState(getUpcomingFestivals(3));
  const [refreshing, setRefreshing] = useState(false);
  const [nextStep, setNextStep] = useState<JourneyItem | null>(null);
  const [journeyDone, setJourneyDone] = useState(0);
  const [journeyTotal, setJourneyTotal] = useState(0);

  // Refresh the journey position whenever Home regains focus
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        // Must run before getNextUnfinished: Foundations was inserted at the head
        // of the path, so an existing user would otherwise be handed Act 1 and
        // sent backwards. Idempotent — a no-op for new users and after the first
        // run. See foundationsService.init().
        await foundationsService.init();
        const [next, map] = await Promise.all([
          journeyService.getNextUnfinished(),
          journeyService.getCompletionMap(),
        ]);
        const path = journeyService.getPath();
        setNextStep(next);
        setJourneyTotal(path.length);
        setJourneyDone(path.filter(item => map[item.id]).length);
        // Spiritual status refreshes with focus; seeing Home IS reading the
        // chai, so mark it opened and credit the day's activity
        getProgression().then(setProgression);
        const today = new Date();
        const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        LocalStorageService.saveChaiLastOpened(key);
        journeyService.touchActivity();
        // "Begin the path" from onboarding lands here — carry it through
        if (journeyService.consumePendingStart() && next) {
          navigateToJourneyItem(navigation, next);
        }
      })();
      return () => {
        audioService.stopSpeaking();
        setSpeaking(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const hearAtom = async () => {
    if (speaking) {
      // expo-speech doesn't fire onDone on interrupt — reset state ourselves
      await audioService.stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    try {
      await audioService.speakSequence(speakableSequence(todaysAtom), () => setSpeaking(false));
    } catch {
      setSpeaking(false);
    }
  };

  useEffect(() => {
    loadDailyContent();
  }, []);

  // Load daily content
  const loadDailyContent = async () => {
    setRefreshing(true);
    try {
      setTodaysFestivals(getTodaysFestivals());
      setUpcomingFestivals(getUpcomingFestivals(3));
    } catch (error) {
      console.log('Error loading daily content:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Navigation functions
  const navigateToScriptures = () => {
    navigation.navigate('Scriptures' as never);
  };

  const navigateToFestivals = () => {
    navigation.navigate('FestivalCalendar' as never);
  };

  const openFestival = (festival: Festival) => {
    (navigation as any).navigate('FestivalDetail', { festivalId: festival.id });
  };

  const daysUntilLabel = (festival: Festival): string | null => {
    const days = getDaysUntilFestival(festival);
    if (days === null) return null;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  };

  const navigateToAskKrishna = () => {
    navigation.navigate('Ask Krishna' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spiritual status — identity, not streaks. Taps through to the
            Profile tab's level card for the full picture. */}
        {progression && (
          <TouchableOpacity
            style={styles.statusRow}
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Profile' })}
          >
            <Text style={styles.statusEmblem}>🪷</Text>
            <View style={styles.statusText}>
              <Text style={styles.statusLevel}>{progression.level.sanskrit}</Text>
              <Text style={styles.statusSub}>
                {progression.level.english} · Level {progression.level.level} of 7
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={DharmaDesignSystem.colors.neutrals.softAsh} />
          </TouchableOpacity>
        )}

        {/* Daily Chai — ONE slot whose type rotates by weekday (verse days
            included). Bodies aren't tappable; the bare header icons are the
            only actions. */}
        <View style={styles.chaiSlot}>
          <DailyChaiCard
            atom={todaysAtom}
            speaking={speaking}
            onToggleAudio={hearAtom}
            onOpenLink={
              todaysAtom.link
                ? () => (navigation as any).navigate(todaysAtom.link!.route, todaysAtom.link!.params)
                : undefined
            }
          />
        </View>

        {/* Continue your path — the guided journey's next step. Resume and
            "view path" live in separate full-width bands so neither steals
            taps meant for the other. */}
        {nextStep && (
          <View style={styles.continueCard}>
            <TouchableOpacity
              style={styles.continueBody}
              activeOpacity={0.85}
              onPress={() => navigateToJourneyItem(navigation, nextStep)}
            >
              <Image
                source={typeof nextStep.cover === 'string' ? { uri: nextStep.cover } : nextStep.cover}
                style={continueThumbStyle}
              />
              <View style={styles.continueText}>
                <Text style={styles.continueEyebrow}>CONTINUE YOUR PATH</Text>
                <Text style={styles.continueTitle} numberOfLines={1}>{nextStep.title}</Text>
                <Text style={styles.continueMeta} numberOfLines={1}>
                  {JOURNEY_MODULES[nextStep.module]}
                </Text>
              </View>
              <View style={styles.continueGo}>
                <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pathFooter}
              activeOpacity={0.7}
              onPress={() => (navigation as any).navigate('JourneyPath')}
            >
              <Text style={styles.pathFooterLabel}>View your journey</Text>
              <View style={styles.pathFooterRight}>
                <Text style={styles.pathFooterCount}>{journeyDone} of {journeyTotal}</Text>
                <Ionicons name="chevron-forward" size={13} color={DharmaDesignSystem.colors.primary.deepSaffron} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {!nextStep && journeyTotal > 0 && journeyDone >= journeyTotal && (
          <TouchableOpacity
            style={[styles.continueCard, styles.continueBody]}
            activeOpacity={0.85}
            onPress={() => (navigation as any).navigate('JourneyPath')}
          >
            <View style={styles.continueText}>
              <Text style={styles.continueEyebrow}>THE PATH</Text>
              <Text style={styles.continueTitle}>Every step complete 🙏</Text>
              <Text style={styles.continueMeta}>{journeyTotal} of {journeyTotal} — walk it again anytime</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Upcoming Festivals Card */}
        <View style={styles.festivalsCard}>
          <View style={styles.festivalsHeader}>
            <Text style={styles.festivalsTitle}>Upcoming festivals</Text>
            <TouchableOpacity onPress={navigateToFestivals} style={styles.viewAllButton}>
              <Ionicons name="chevron-forward" size={16} color={DharmaDesignSystem.colors.primary.peacockTeal} />
            </TouchableOpacity>
          </View>
          
          {upcomingFestivals.map((festival) => {
            const occurrenceStart = getNextOccurrence(festival)?.start ?? new Date(festival.date);
            return (
              <TouchableOpacity key={festival.id} style={styles.festivalItem} onPress={() => openFestival(festival)}>
                <View style={styles.festivalDate}>
                  <Text style={styles.festivalDay}>{occurrenceStart.getDate()}</Text>
                  <Text style={styles.festivalMonth}>
                    {occurrenceStart.toLocaleDateString('en-US', { month: 'short' })}
                  </Text>
                </View>
                <View style={styles.festivalDetails}>
                  <Text style={styles.festivalName}>{festival.emoji}  {festival.name}</Text>
                  <Text style={styles.festivalSignificance} numberOfLines={1}>
                    {festival.significance}
                  </Text>
                </View>
                {daysUntilLabel(festival) && (
                  <Text style={styles.festivalCountdown}>{daysUntilLabel(festival)}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  continueCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    marginHorizontal: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.md,
    overflow: 'hidden',
    ...DharmaDesignSystem.shadows.soft,
  },
  continueBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.md,
    padding: DharmaDesignSystem.spacing.md,
  },
  pathFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 42,
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 81, 0, 0.15)',
  },
  pathFooterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  pathFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  pathFooterCount: {
    fontSize: 12,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  continueText: { flex: 1 },
  continueEyebrow: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  continueTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginTop: 1,
  },
  continueMeta: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: 2,
  },
  continueGo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.sm,
    marginHorizontal: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.sm,
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
    paddingVertical: DharmaDesignSystem.spacing.xs,
  },
  statusEmblem: {
    fontSize: 22,
  },
  statusText: {
    flex: 1,
  },
  statusLevel: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '700',
  },
  statusSub: {
    fontSize: 12,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  chaiSlot: {
    marginHorizontal: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.sm,
  },
  festivalsCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    marginHorizontal: DharmaDesignSystem.spacing.lg,
    marginTop: DharmaDesignSystem.spacing.sm,
    marginBottom: DharmaDesignSystem.spacing.xl,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.12)',
    ...DharmaDesignSystem.shadows.soft,
  },
  festivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  festivalsTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    letterSpacing: 0.5,
  },
  viewAllButton: {
    padding: DharmaDesignSystem.spacing.xs,
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.small,
  },
  festivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 144, 226, 0.08)',
  },
  festivalDate: {
    width: 50,
    alignItems: 'center',
    marginRight: DharmaDesignSystem.spacing.md,
    backgroundColor: 'rgba(255, 182, 39, 0.12)',
    borderRadius: DharmaDesignSystem.borderRadius.small,
    paddingVertical: DharmaDesignSystem.spacing.xs,
  },
  festivalDay: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    fontWeight: '700',
    color: DharmaDesignSystem.colors.primary.turmericYellow,
  },
  festivalMonth: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.primary.turmericYellow,
    fontSize: 10,
  },
  festivalDetails: {
    flex: 1,
  },
  festivalName: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs / 2,
  },
  festivalSignificance: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 18,
  },
  festivalCountdown: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginLeft: DharmaDesignSystem.spacing.sm,
  },
});

export default HomeScreen;