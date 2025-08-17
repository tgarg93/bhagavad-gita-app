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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { DharmaColors, NavigationColors } from '../constants/colors';
import { getTodaysInsight, getCurrentWeekTheme, getRandomInsight } from '../data/dailyInsights';
import { getTodaysFestivals, getUpcomingFestivals } from '../data/festivals';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { currentUser } = useAuth();
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
    navigation.navigate('Chapters' as never);
  };

  const navigateToFestivals = () => {
    navigation.navigate('Stories' as never);
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
          <Text style={styles.appTitle}>Dharma</Text>
        </View>

        {/* Daily Wisdom Card - Centered */}
        <View style={styles.wisdomContainer}>
          <View style={styles.wisdomCard}>
            <TouchableOpacity onPress={refreshInsight} style={styles.refreshButton}>
              <Ionicons name="refresh" size={18} color={DharmaColors.text.tertiary} />
            </TouchableOpacity>
            
            <View style={styles.wisdomContent}>
              {todaysInsight.sanskrit && (
                <Text style={styles.sanskritText}>{todaysInsight.sanskrit}</Text>
              )}
              
              {todaysInsight.translation && (
                <Text style={styles.translationText}>{todaysInsight.translation}</Text>
              )}
              
              <Text style={styles.meaningText}>{todaysInsight.content}</Text>
              
              <Text style={styles.sourceText}>{todaysInsight.source}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaColors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    letterSpacing: 2,
  },
  wisdomContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  wisdomCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
  },
  refreshButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  wisdomContent: {
    alignItems: 'center',
    paddingTop: 16,
  },
  sanskritText: {
    fontSize: 20,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
    letterSpacing: 1,
  },
  translationText: {
    fontSize: 18,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
    fontStyle: 'italic',
  },
  meaningText: {
    fontSize: 16,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;