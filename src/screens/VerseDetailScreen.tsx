import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors } from '../constants/colors';
import { bhagavadGitaData } from '../data/bhagavadGitaData';
import { Verse } from '../types/content';
import { VapiService } from '../services/vapiService';

interface RouteParams {
  chapterId: string;
  verseId: string;
}

const { width } = Dimensions.get('window');

const VerseDetailScreen: React.FC = () => {
  const route = useRoute();
  const { chapterId, verseId } = route.params as RouteParams;
  const [verse, setVerse] = useState<Verse | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showCommentary, setShowCommentary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vapiService] = useState(() => VapiService.getInstance());

  useEffect(() => {
    loadVerse();
  }, [chapterId, verseId]);

  const loadVerse = () => {
    const chapter = bhagavadGitaData.find(ch => ch.id === chapterId);
    if (chapter) {
      const foundVerse = chapter.verses?.find(v => v.id === verseId);
      setVerse(foundVerse || null);
    }
  };

  const handlePlayNarration = async () => {
    if (!verse) return;
    
    try {
      setIsPlaying(true);
      
      // Create narration text combining Sanskrit, transliteration, and English
      const narrationText = `
        Chapter ${verse.chapterNumber}, Verse ${verse.verseNumber} of the Bhagavad Gita.
        
        Sanskrit verse: ${verse.sanskrit}
        
        Transliteration: ${verse.transliteration}
        
        English translation: ${verse.english}
      `;

      await vapiService.startCall(narrationText);
      
      // Set up call end listener
      vapiService.onCallEnd(() => {
        setIsPlaying(false);
      });
      
    } catch (error) {
      console.error('Error starting narration:', error);
      setIsPlaying(false);
    }
  };

  const handleStopNarration = async () => {
    try {
      await vapiService.endCall();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping narration:', error);
      setIsPlaying(false);
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
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.verseReference}>
            Chapter {verse.chapterNumber}, Verse {verse.verseNumber}
          </Text>
          
          {/* Voice Narration Button */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={isPlaying ? handleStopNarration : handlePlayNarration}
            disabled={isPlaying}
          >
            <Ionicons
              name={isPlaying ? 'stop' : 'play'}
              size={24}
              color={DharmaColors.text.inverse}
            />
            <Text style={styles.playButtonText}>
              {isPlaying ? 'Stop Narration' : 'Listen'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sanskrit Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sanskrit</Text>
          <Text style={styles.sanskritText}>{verse.sanskrit}</Text>
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
            <Text style={styles.transliterationText}>{verse.transliteration}</Text>
          )}
        </View>

        {/* English Translation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>English Translation</Text>
          <Text style={styles.englishText}>{verse.english}</Text>
        </View>

        {/* Hindi Translation */}
        {verse.hindi && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hindi Translation</Text>
            <Text style={styles.hindiText}>{verse.hindi}</Text>
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
  verseReference: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.primary[400],
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DharmaColors.primary[500],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
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