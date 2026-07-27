import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getChapter } from '../data/bhagavadGitaData';
import { Chapter, Verse } from '../types/content';
import AudioControls from '../components/AudioControls';
import TextHighlighter from '../components/TextHighlighter';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

interface RouteParams {
  chapterId: string;
}

const ChapterDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chapterId } = route.params as RouteParams;
  const scrollViewRef = useRef<ScrollView>(null);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    const chapterData = getChapter(parseInt(chapterId.split('-')[1]));
    setChapter(chapterData || null);

    // Prepare audio segments when chapter loads
    if (chapterData) {
      const audioService = AudioNarrationService.getInstance();
      const content = [
        chapterData.summary,
        getChildFriendlyExplanation(chapterData.number),
        ...chapterData.verses?.map(v => v.english) || []
      ];
      const segments = audioService.parseContentIntoSegments(content);
      setAudioSegments(segments);
    }
  }, [chapterId]);

  const handleTextHighlight = (segmentId: string, segmentIndex: number) => {
    setHighlightedSegmentId(segmentId);
  };

  const handleScrollToSegment = (segmentIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
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

        {chapter && (
          <AudioControls
            content={[
              chapter.summary,
              getChildFriendlyExplanation(chapter.number),
              ...chapter.verses?.map(v => v.english) || []
            ]}
            onTextHighlight={handleTextHighlight}
            onScrollToSegment={handleScrollToSegment}
            compact={true}
          />
        )}
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Simple Summary */}
        <View style={styles.summaryContainer}>
          <TextHighlighter
            text={chapter.summary}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={styles.summaryText}
          />
        </View>

        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Simple Explanation</Text>
          <TextHighlighter
            text={getChildFriendlyExplanation(chapter.number)}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={styles.explanationText}
          />
        </View>

        {/* Key Verses */}
        <View style={styles.versesContainer}>
          {chapter.verses && chapter.verses.map((verse) => (
            <View key={verse.id} style={styles.verseCard}>
              <View style={styles.verseHeader}>
                <Text style={styles.verseLabel}>
                  {verse.verseNumber}
                </Text>
              </View>

              <TextHighlighter
                text={verse.english}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={styles.english}
              />
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
  explanationContainer: {
    backgroundColor: '#fef3c7',
    margin: 20,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  explanationTitle: {
    fontSize: 18,
    color: '#92400e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: '#92400e',
    lineHeight: 24,
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