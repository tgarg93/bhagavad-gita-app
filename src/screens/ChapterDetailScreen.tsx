import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getChapter } from '../data/bhagavadGitaData';
import { Chapter, Verse } from '../types/content';

interface RouteParams {
  chapterId: string;
}

const ChapterDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chapterId } = route.params as RouteParams;
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);

  useEffect(() => {
    const chapterData = getChapter(parseInt(chapterId.split('-')[1]));
    setChapter(chapterData || null);
  }, [chapterId]);

  const playChapter = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
    Alert.alert(
      isPlaying ? '⏸️ Paused' : '🔊 Playing', 
      isPlaying ? 'Audio paused' : `Playing Chapter ${chapter?.number}: ${chapter?.name.english}`
    );
  };

  const playVerse = (verseNumber: number) => {
    setCurrentVerse(verseNumber);
    // In a real app, this would play the specific verse audio
    Alert.alert('🎵 Playing Verse', `Now playing Chapter ${chapter?.number}, Verse ${verseNumber}`);
  };

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chapter not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>← Back to Chapters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.chapterTitle}>{chapter.name.english}</Text>
        </View>

        <TouchableOpacity 
          style={styles.playButton}
          onPress={playChapter}
        >
          <LinearGradient
            colors={['#58cc02', '#89e219']}
            style={styles.playButtonGradient}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color="#ffffff" 
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Simple Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{chapter.summary}</Text>
        </View>

        {/* Key Verses */}
        <View style={styles.versesContainer}>
          {chapter.verses && chapter.verses.map((verse) => (
            <View key={verse.id} style={styles.verseCard}>
              <View style={styles.verseHeader}>
                <Text style={styles.verseLabel}>
                  {verse.verseNumber}
                </Text>
                <TouchableOpacity 
                  style={styles.versePlayButton}
                  onPress={() => playVerse(verse.verseNumber)}
                >
                  <Ionicons 
                    name={currentVerse === verse.verseNumber ? "pause" : "play"} 
                    size={20} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.english}>{verse.english}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function for child-friendly explanations
const getChildFriendlyExplanation = (chapterNumber: number): string => {
  const explanations: { [key: number]: string } = {
    1: "This chapter is like when you're really scared before doing something important. Arjuna was a brave warrior, but seeing his family and friends ready to fight made him very sad and confused. Just like when you don't want to do something even though you know it's right!",
    2: "Krishna teaches Arjuna (and us!) about the soul - the special part of us that never dies. He explains that our body is like clothes we wear, but our real self (the soul) is eternal and precious. It's like how you're still 'you' even when you change your clothes!",
    3: "This chapter teaches us about doing good things without expecting rewards. It's like helping your mom clean the house just because it's good to do, not because you want candy afterward. Krishna shows us how to work with love and kindness.",
    4: "Krishna explains that he comes to Earth many times to help people when they forget how to be good. It's like how a good teacher keeps coming to help students learn. He teaches us about wisdom and how knowledge can make us free and happy.",
    18: "In the final chapter, Krishna's most important teaching is to trust in God completely. It's like when you trust your parents completely because you know they love you and want what's best for you. This trust brings peace and happiness."
  };

  return explanations[chapterNumber] || "This chapter teaches us important lessons about life, love, and how to be a good person. Every story in the Gita helps us understand how to live happily and kindly with others.";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4b5563',
    textAlign: 'center',
  },
  playButton: {
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: '#f8fafc',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryText: {
    fontSize: 17,
    color: '#4b5563',
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
  },
  versesContainer: {
    paddingHorizontal: 20,
  },
  verseCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    backgroundColor: '#58cc02',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 40,
    textAlign: 'center',
  },
  versePlayButton: {
    backgroundColor: '#1cb0f6',
    padding: 12,
    borderRadius: 24,
    shadowColor: '#1cb0f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  english: {
    fontSize: 18,
    color: '#1f2937',
    lineHeight: 28,
    marginTop: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: '#ea580c',
    textDecorationLine: 'underline',
  },
});

export default ChapterDetailScreen;