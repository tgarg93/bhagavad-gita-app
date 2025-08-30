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
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors, NavigationColors } from '../constants/colors';
import { DharmaDesignSystem, createTextStyle, createCardStyle } from '../constants/DharmaDesignSystem';
import { getTodaysInsight, getCurrentWeekTheme, getRandomInsight } from '../data/dailyInsights';
import { getTodaysFestivals, getUpcomingFestivals } from '../data/festivals';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todaysInsight, setTodaysInsight] = useState(getTodaysInsight() || getRandomInsight());
  const [weekTheme, setWeekTheme] = useState(getCurrentWeekTheme());
  const [todaysFestivals, setTodaysFestivals] = useState(getTodaysFestivals());
  const [upcomingFestivals, setUpcomingFestivals] = useState(getUpcomingFestivals(7));
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDailyContent();
  }, []);

  // Load daily content
  const loadDailyContent = async () => {
    setRefreshing(true);
    try {
      setTodaysInsight(getTodaysInsight() || getRandomInsight());
      setWeekTheme(getCurrentWeekTheme());
      setTodaysFestivals(getTodaysFestivals());
      setUpcomingFestivals(getUpcomingFestivals(7));
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

  const navigateToAskKrishna = () => {
    navigation.navigate('Ask Krishna' as never);
  };

  const refreshInsight = () => {
    setTodaysInsight(getRandomInsight());
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.appTitle}>Dharma</Text>
          </View>
        </View>

        {/* Daily Wisdom Card - Centered */}
        <View style={styles.wisdomContainer}>
          <View style={styles.wisdomCard}>
            <TouchableOpacity onPress={refreshInsight} style={styles.refreshButton}>
              <Ionicons name="refresh" size={18} color={DharmaDesignSystem.colors.primary.saffronSunset} />
            </TouchableOpacity>
            
            <View style={styles.wisdomContent}>
              {todaysInsight.sanskrit && (
                <Text style={styles.sanskritText}>{todaysInsight.sanskrit}</Text>
              )}
              
              {todaysInsight.transliteration && (
                <Text style={styles.transliterationText}>{todaysInsight.transliteration}</Text>
              )}
              
              {todaysInsight.translation && (
                <Text style={styles.translationText}>{todaysInsight.translation}</Text>
              )}
              
              <Text style={styles.meaningText}>{todaysInsight.content}</Text>
              
              <Text style={styles.sourceText}>{todaysInsight.source}</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Festivals Card */}
        <View style={styles.festivalsCard}>
          <View style={styles.festivalsHeader}>
            <Text style={styles.festivalsTitle}>Upcoming festivals</Text>
            <TouchableOpacity onPress={navigateToFestivals} style={styles.viewAllButton}>
              <Ionicons name="chevron-forward" size={16} color={DharmaDesignSystem.colors.sacred.krishnaBlue} />
            </TouchableOpacity>
          </View>
          
          {upcomingFestivals.slice(0, 3).map((festival) => (
            <TouchableOpacity key={festival.id} style={styles.festivalItem} onPress={navigateToFestivals}>
              <View style={styles.festivalDate}>
                <Text style={styles.festivalDay}>{new Date(festival.date).getDate()}</Text>
                <Text style={styles.festivalMonth}>
                  {new Date(festival.date).toLocaleDateString('en-US', { month: 'short' })}
                </Text>
              </View>
              <View style={styles.festivalDetails}>
                <Text style={styles.festivalName}>{festival.name}</Text>
                <Text style={styles.festivalSignificance} numberOfLines={1}>
                  {festival.significance}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.creamCanvas,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: DharmaDesignSystem.spacing.xl,
    paddingTop: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.lg,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    ...DharmaDesignSystem.typography.sizes.headingXL,
    fontWeight: '300',
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    letterSpacing: 2,
  },
  wisdomContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xxl,
  },
  wisdomCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.xLarge,
    padding: DharmaDesignSystem.spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.12)',
    ...DharmaDesignSystem.shadows.cultural,
    position: 'relative',
    // Add subtle gradient background
    background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.9) 0%, rgba(245, 241, 232, 0.9) 100%)',
  },
  refreshButton: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.md,
    right: DharmaDesignSystem.spacing.md,
    padding: DharmaDesignSystem.spacing.sm,
    zIndex: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.circle,
  },
  wisdomContent: {
    alignItems: 'center',
    paddingTop: DharmaDesignSystem.spacing.md,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.turmericGold,
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
    color: DharmaDesignSystem.colors.sacred.krishnaBlue,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.xxl,
  },
  sourceText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  festivalsCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    marginHorizontal: DharmaDesignSystem.spacing.lg,
    marginTop: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.xxl,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
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
    color: DharmaDesignSystem.colors.primary.marigoldWarm,
  },
  festivalMonth: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.primary.turmericGold,
    fontSize: 10,
  },
  festivalDetails: {
    flex: 1,
  },
  festivalName: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginBottom: DharmaDesignSystem.spacing.xs / 2,
  },
  festivalSignificance: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 18,
  },
});

export default HomeScreen;