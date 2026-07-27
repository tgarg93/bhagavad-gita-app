import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors } from '../constants/colors';
import { bhagavadGitaData } from '../data/bhagavadGitaData';
import { Verse } from '../types/content';
import AudioControls from '../components/AudioControls';
import TextHighlighter from '../components/TextHighlighter';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

interface RouteParams {
  chapterId: string;
  verseId: string;
}

const { width } = Dimensions.get('window');

const VerseDetailScreen: React.FC = () => {
  const route = useRoute();
  const { chapterId, verseId } = route.params as RouteParams;
  const scrollViewRef = useRef<ScrollView>(null);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showCommentary, setShowCommentary] = useState(false);
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    loadVerse();
  }, [chapterId, verseId]);

  const loadVerse = () => {
    const chapter = bhagavadGitaData.find(ch => ch.id === chapterId);
    if (chapter) {
      const foundVerse = chapter.verses?.find(v => v.id === verseId);
      setVerse(foundVerse || null);

      // Prepare audio segments when verse loads
      if (foundVerse) {
        const audioService = AudioNarrationService.getInstance();
        const content = [
          foundVerse.sanskrit,
          foundVerse.transliteration,
          foundVerse.english,
          ...(foundVerse.hindi ? [foundVerse.hindi] : []),
          ...(foundVerse.commentary?.map(c => c.text) || [])
        ];
        const segments = audioService.parseContentIntoSegments(content);
        setAudioSegments(segments);
      }
    }
  };

  const handleTextHighlight = (segmentId: string, segmentIndex: number) => {
    setHighlightedSegmentId(segmentId);
  };

  const handleScrollToSegment = (segmentIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  if (!verse) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading verse...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.verseReference}>
            Chapter {verse.chapterNumber}, Verse {verse.verseNumber}
          </Text>

          <View style={styles.audioControlsContainer}>
            {/* Audio Controls */}
            <AudioControls
              content={[
                verse.sanskrit,
                verse.transliteration,
                verse.english,
                ...(verse.hindi ? [verse.hindi] : []),
                ...(verse.commentary?.map(c => c.text) || [])
              ]}
              onTextHighlight={handleTextHighlight}
              onScrollToSegment={handleScrollToSegment}
              compact={false}
            />
          </View>
        </View>

        {/* Sanskrit Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sanskrit</Text>
          <TextHighlighter
            text={verse.sanskrit}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={styles.sanskritText}
          />
        </View>

        {/* Transliteration */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowTransliteration(!showTransliteration)}
          >
            <Text style={styles.sectionTitle}>Transliteration</Text>
            <Ionicons
              name={showTransliteration ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={DharmaColors.text.tertiary}
            />
          </TouchableOpacity>
          {showTransliteration && (
            <TextHighlighter
              text={verse.transliteration}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={styles.transliterationText}
            />
          )}
        </View>

        {/* English Translation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>English Translation</Text>
          <TextHighlighter
            text={verse.english}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={styles.englishText}
          />
        </View>

        {/* Hindi Translation */}
        {verse.hindi && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hindi Translation</Text>
            <TextHighlighter
              text={verse.hindi}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={styles.hindiText}
            />
          </View>
        )}

        {/* Commentary */}
        {verse.commentary && verse.commentary.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowCommentary(!showCommentary)}
            >
              <Text style={styles.sectionTitle}>Commentary</Text>
              <Ionicons
                name={showCommentary ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={DharmaColors.text.tertiary}
              />
            </TouchableOpacity>
            {showCommentary && (
              <View style={styles.commentaryContainer}>
                {verse.commentary.map((comment) => (
                  <View key={comment.id} style={styles.commentaryItem}>
                    <Text style={styles.commentaryAuthor}>{comment.author}</Text>
                    <Text style={styles.commentaryText}>{comment.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Tags */}
        {verse.tags && verse.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {verse.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaColors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: DharmaColors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  audioControlsContainer: {
    alignItems: 'center',
    gap: 16,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.primary[400],
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  sanskritText: {
    fontSize: 22,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    lineHeight: 36,
    textAlign: 'center',
    letterSpacing: 1,
  },
  transliterationText: {
    fontSize: 16,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  englishText: {
    fontSize: 18,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    lineHeight: 28,
    textAlign: 'center',
  },
  hindiText: {
    fontSize: 16,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 26,
    textAlign: 'center',
  },
  commentaryContainer: {
    marginTop: 16,
  },
  commentaryItem: {
    backgroundColor: DharmaColors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  commentaryAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.accent[400],
    marginBottom: 8,
  },
  commentaryText: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: DharmaColors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: DharmaColors.text.inverse,
    textTransform: 'capitalize',
  },
});

export default VerseDetailScreen;