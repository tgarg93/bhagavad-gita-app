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
import { getCurrentWeekTheme } from '../data/dailyInsights';
import { getDailyVerse, getRandomVerse, DailyVerse } from '../data/dailyVerse';
import { getTodaysFestivals, getUpcomingFestivals, getNextOccurrence, getDaysUntilFestival, Festival } from '../data/festivals';
import journeyService from '../services/journeyService';
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
  const [todaysVerse, setTodaysVerse] = useState<DailyVerse>(getDailyVerse());
  const [weekTheme, setWeekTheme] = useState(getCurrentWeekTheme());
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
        const [next, map] = await Promise.all([
          journeyService.getNextUnfinished(),
          journeyService.getCompletionMap(),
        ]);
        const path = journeyService.getPath();
        setNextStep(next);
        setJourneyTotal(path.length);
        setJourneyDone(path.filter(item => map[item.id]).length);
      })();
    }, [])
  );

  useEffect(() => {
    loadDailyContent();
  }, []);

  // Load daily content
  const loadDailyContent = async () => {
    setRefreshing(true);
    try {
      setTodaysVerse(getDailyVerse());
      setWeekTheme(getCurrentWeekTheme());
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

  const refreshInsight = () => {
    setTodaysVerse(getRandomVerse());
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue your path — the guided journey's next step */}
        {nextStep && (
          <TouchableOpacity
            style={styles.continueCard}
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
                {JOURNEY_MODULES[nextStep.module]} · {journeyDone} of {journeyTotal}
              </Text>
            </View>
            <View style={styles.continueGo}>
              <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </TouchableOpacity>
        )}
        {!nextStep && journeyTotal > 0 && journeyDone >= journeyTotal && (
          <View style={styles.continueCard}>
            <View style={styles.continueText}>
              <Text style={styles.continueEyebrow}>THE PATH</Text>
              <Text style={styles.continueTitle}>Every step complete 🙏</Text>
              <Text style={styles.continueMeta}>{journeyTotal} of {journeyTotal} — walk it again anytime</Text>
            </View>
          </View>
        )}

        {/* Daily Wisdom Card - verse of the day */}
        <View style={styles.wisdomContainer}>
          <View style={styles.wisdomCard}>
            <TouchableOpacity
              onPress={refreshInsight}
              style={styles.refreshButton}
              activeOpacity={1}
            >
              <Ionicons name="refresh" size={16} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>

            <View style={styles.wisdomContent}>
              {!!todaysVerse.sanskrit && (
                <Text style={styles.sanskritText}>{todaysVerse.sanskrit}</Text>
              )}

              {!!todaysVerse.transliteration && (
                <Text style={styles.transliterationText}>{todaysVerse.transliteration}</Text>
              )}

              <Text style={styles.meaningText}>{todaysVerse.english}</Text>

              <Text style={styles.sourceText}>{todaysVerse.reference}</Text>
            </View>
          </View>
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.md,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    padding: DharmaDesignSystem.spacing.md,
    marginHorizontal: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.md,
    ...DharmaDesignSystem.shadows.soft,
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
  wisdomContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingTop: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  wisdomCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.xLarge,
    padding: DharmaDesignSystem.spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    ...DharmaDesignSystem.shadows.cultural,
    position: 'relative',
    // Add subtle gradient background
    background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.9) 0%, rgba(245, 241, 232, 0.9) 100%)',
  },
  refreshButton: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.md,
    right: DharmaDesignSystem.spacing.md,
    padding: DharmaDesignSystem.spacing.xs,
    zIndex: 1,
    opacity: 0.6,
  },
  wisdomContent: {
    alignItems: 'center',
    paddingTop: DharmaDesignSystem.spacing.md,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.md,
    letterSpacing: 1,
    fontWeight: '400',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '300',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.md,
    fontStyle: 'italic',
  },
  translationText: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  sourceText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
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