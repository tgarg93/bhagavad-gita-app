import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/ui/Card';

interface Chapter {
  id: number;
  sanskrit: string;
  english: string;
  summary: string;
  verseCount: number;
  progress: number; // 0-100
}

const chapters: Chapter[] = [
  {
    id: 1,
    sanskrit: 'अर्जुन विषाद योग',
    english: 'Arjuna Vishada Yoga',
    summary: 'Arjuna\'s dejection and moral crisis on the battlefield',
    verseCount: 47,
    progress: 100,
  },
  {
    id: 2,
    sanskrit: 'सांख्य योग',
    english: 'Sankhya Yoga',
    summary: 'The path of knowledge and analytical study of the soul',
    verseCount: 72,
    progress: 85,
  },
  {
    id: 3,
    sanskrit: 'कर्म योग',
    english: 'Karma Yoga',
    summary: 'The path of action and selfless service',
    verseCount: 43,
    progress: 60,
  },
  {
    id: 4,
    sanskrit: 'ज्ञान कर्म संन्यास योग',
    english: 'Jnana Karma Sannyasa Yoga',
    summary: 'The path of knowledge and renunciation of actions',
    verseCount: 42,
    progress: 30,
  },
  {
    id: 5,
    sanskrit: 'कर्म संन्यास योग',
    english: 'Karma Sannyasa Yoga',
    summary: 'The path of renunciation of actions',
    verseCount: 29,
    progress: 15,
  },
  {
    id: 6,
    sanskrit: 'आत्म संयम योग',
    english: 'Atma Samyama Yoga',
    summary: 'The path of meditation and self-control',
    verseCount: 47,
    progress: 0,
  },
];

const ChaptersScreen: React.FC = () => {
  const renderChapterItem = ({ item }: { item: Chapter }) => (
    <TouchableOpacity style={styles.chapterItem}>
      <Card style={styles.chapterCard}>
        <View style={styles.chapterHeader}>
          <View style={styles.chapterNumber}>
            <Text style={styles.chapterNumberText}>{item.id}</Text>
          </View>
          <View style={styles.chapterInfo}>
            <Text style={styles.chapterTitle}>{item.english}</Text>
            <Text style={styles.chapterSanskrit}>{item.sanskrit}</Text>
          </View>
          {item.progress === 100 && (
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
          )}
        </View>

        <Text style={styles.chapterSummary}>{item.summary}</Text>

        <View style={styles.chapterMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={16} color="#6b7280" />
            <Text style={styles.metaText}>{item.verseCount} verses</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.metaText}>{Math.ceil(item.verseCount * 1.5)} min</Text>
          </View>
        </View>

        {item.progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressPercent}>{item.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={['#ea580c', '#f97316']}
                style={[styles.progressFill, { width: `${item.progress}%` }]}
              />
            </View>
          </View>
        )}

        <View style={styles.chapterActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={[styles.actionText, styles.primaryAction]}>
              {item.progress === 0 ? 'Start Reading' : 
               item.progress === 100 ? 'Review' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Chapters</Text>
        <Text style={styles.headerSubtitle}>18 chapters of eternal wisdom</Text>
      </View>

      <FlatList
        data={chapters}
        renderItem={renderChapterItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chapterItem: {
    marginBottom: 16,
  },
  chapterCard: {
    padding: 20,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ea580c',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  chapterSanskrit: {
    fontSize: 14,
    color: '#ea580c',
    fontWeight: '500',
  },
  chapterSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  chapterMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  chapterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryAction: {
    color: '#ea580c',
  },
});

export default ChaptersScreen;