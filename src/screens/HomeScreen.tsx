import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const [dailyVerse, setDailyVerse] = useState({
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
    english: 'You have a right to perform your prescribed duty, but do not be attached to the fruits of action.',
    chapter: 2,
    verse: 47
  });

  const [userStats, setUserStats] = useState({
    dailyStreak: 7,
    chaptersRead: 3,
    totalVerses: 45,
    readingTime: 120 // minutes
  });

  const quickActions = [
    {
      icon: 'book-outline',
      title: 'Continue Reading',
      subtitle: 'Chapter 4, Verse 12',
      color: '#ea580c',
      onPress: () => console.log('Continue reading')
    },
    {
      icon: 'search-outline',
      title: 'Search Verses',
      subtitle: 'Find wisdom',
      color: '#d946ef',
      onPress: () => console.log('Search')
    },
    {
      icon: 'bookmark-outline',
      title: 'Bookmarks',
      subtitle: '12 saved verses',
      color: '#06b6d4',
      onPress: () => console.log('Bookmarks')
    },
    {
      icon: 'stats-chart-outline',
      title: 'Progress',
      subtitle: 'View insights',
      color: '#10b981',
      onPress: () => console.log('Progress')
    }
  ];

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#fff7ed', '#fed7aa']}
          style={styles.welcomeGradient}
        >
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>🕉️ Bhagavad Gita</Text>
            <Text style={styles.welcomeSubtitle}>
              Discover timeless wisdom and spiritual guidance
            </Text>
            <View style={styles.welcomeButtons}>
              <Button
                title="Get Started"
                onPress={() => console.log('Get Started')}
                variant="primary"
              />
              <Button
                title="Learn More"
                onPress={() => console.log('Learn More')}
                variant="outline"
                style={{ marginTop: 12 }}
              />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Namaste, {currentUser.username || 'Seeker'} 🙏
            </Text>
            <Text style={styles.subGreeting}>
              Continue your spiritual journey
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color="#ea580c" />
          </TouchableOpacity>
        </View>

        {/* Daily Verse */}
        <Card style={styles.dailyVerseCard}>
          <LinearGradient
            colors={['#fef3c7', '#fed7aa']}
            style={styles.dailyVerseGradient}
          >
            <Text style={styles.dailyVerseTitle}>📿 Daily Verse</Text>
            <Text style={styles.verseLabel}>
              Chapter {dailyVerse.chapter}, Verse {dailyVerse.verse}
            </Text>
            <Text style={styles.sanskritText}>{dailyVerse.sanskrit}</Text>
            <Text style={styles.transliterationText}>{dailyVerse.transliteration}</Text>
            <Text style={styles.englishText}>{dailyVerse.english}</Text>
            <Button
              title="Reflect & Learn"
              onPress={() => console.log('Daily verse')}
              variant="primary"
              size="sm"
              style={styles.verseButton}
            />
          </LinearGradient>
        </Card>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
              <Text style={styles.statNumber}>{userStats.dailyStreak}</Text>
              <Text style={styles.statLabel}>Day Streak 🔥</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#ecfdf5' }]}>
              <Text style={styles.statNumber}>{userStats.chaptersRead}</Text>
              <Text style={styles.statLabel}>Chapters</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#f0f9ff' }]}>
              <Text style={styles.statNumber}>{Math.floor(userStats.readingTime / 60)}h</Text>
              <Text style={styles.statLabel}>Reading Time</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { borderLeftColor: action.color }]}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon as any} size={24} color={action.color} />
              <View style={styles.quickActionText}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Inspiration */}
        <Card style={styles.inspirationCard}>
          <Text style={styles.inspirationTitle}>💡 Today's Reflection</Text>
          <Text style={styles.inspirationText}>
            "The mind is restless and difficult to restrain, but it is subdued by practice."
          </Text>
          <Text style={styles.inspirationSource}>- Chapter 6, Verse 35</Text>
        </Card>

        {/* Data Management */}
        <Card style={styles.dataCard}>
          <Text style={styles.dataTitle}>💾 Your Data</Text>
          <Text style={styles.dataSubtitle}>
            All your progress and notes are stored locally on this device. Export for backup.
          </Text>
          <Button
            title="Export Data"
            onPress={() => console.log('Export data')}
            variant="outline"
            size="sm"
            style={styles.dataButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  welcomeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContent: {
    padding: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  welcomeButtons: {
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
  },
  dailyVerseCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 0,
  },
  dailyVerseGradient: {
    padding: 20,
    borderRadius: 16,
  },
  dailyVerseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  verseLabel: {
    fontSize: 14,
    color: '#92400e',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  sanskritText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
    textAlign: 'center',
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#92400e',
    marginBottom: 12,
    textAlign: 'center',
  },
  englishText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  verseButton: {
    alignSelf: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
  quickActionsGrid: {
    paddingHorizontal: 20,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    flex: 1,
    marginLeft: 16,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  inspirationCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  inspirationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  inspirationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  inspirationSource: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
  },
  dataCard: {
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: '#f0f9ff',
    borderColor: '#0ea5e9',
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginBottom: 8,
    textAlign: 'center',
  },
  dataSubtitle: {
    fontSize: 14,
    color: '#0c4a6e',
    textAlign: 'center',
    marginBottom: 12,
  },
  dataButton: {
    alignSelf: 'center',
  },
});

export default HomeScreen;