import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { getChildChapter } from '../data/bhagavadGitaChildFriendly';
import { getChapterHeroImage, getStoryImage } from '../data/imageManifest';
import { getAudiobook, getPodcast } from '../data/audioContent';
import { EnhancedChapter, ChildFriendlyVerse } from '../types/bhagavadGitaTypes';

const { width } = Dimensions.get('window');

interface RouteParams {
  chapterId: string;
  chapterNumber: number;
}

const ChapterReadingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chapterNumber } = (route.params as RouteParams) || { chapterNumber: 1 };
  
  const [chapter, setChapter] = useState<EnhancedChapter | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    const chapterData = getChildChapter(chapterNumber);
    setChapter(chapterData || null);
  }, [chapterNumber]);

  const playAudiobook = () => {
    setIsAudioPlaying(!isAudioPlaying);
    setIsPodcastPlaying(false); // Stop podcast if playing
    const audiobook = getAudiobook(chapterNumber);
    
    Alert.alert(
      isAudioPlaying ? '⏸️ Paused Audiobook' : '🎵 Playing Audiobook',
      isAudioPlaying 
        ? 'Audiobook paused' 
        : `Playing ${audiobook?.title || `Chapter ${chapterNumber} Audiobook`}`
    );
  };

  const playPodcast = () => {
    setIsPodcastPlaying(!isPodcastPlaying);
    setIsAudioPlaying(false); // Stop audiobook if playing
    const podcast = getPodcast(chapterNumber);
    
    Alert.alert(
      isPodcastPlaying ? '⏸️ Paused Podcast' : '🎙️ Playing Podcast',
      isPodcastPlaying 
        ? 'Podcast paused' 
        : `Playing ${podcast?.title || `Chapter ${chapterNumber} Discussion`}`
    );
  };

  const toggleVocabulary = () => {
    setShowVocabulary(!showVocabulary);
  };

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const renderVerse = (verse: ChildFriendlyVerse, index: number) => {
    return (
      <View key={verse.verseId} style={styles.verseContainer}>
        {/* Verse Number */}
        <View style={styles.verseHeader}>
          <View style={styles.verseNumberBadge}>
            <Text style={styles.verseNumberText}>{verse.verseNumber}</Text>
          </View>
          
          {verse.difficulty && (
            <View style={[styles.difficultyIndicator, {
              backgroundColor: verse.difficulty === 'easy' 
                ? DharmaDesignSystem.colors.primary.marigoldWarm
                : verse.difficulty === 'medium'
                ? DharmaDesignSystem.colors.sacred.krishnaBlue
                : DharmaDesignSystem.colors.primary.saffronSunset
            }]}>
              <Text style={styles.difficultyText}>
                {verse.difficulty.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Illustration Image */}
        {verse.illustrationImage && (
          <View style={styles.illustrationContainer}>
            <Image 
              source={{ uri: verse.illustrationImage }}
              style={styles.illustrationImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Main Content - Shows both child-friendly and original text */}
        <View style={styles.verseContent}>
          {/* Character Dialogue */}
          {verse.characterDialogue && (
            <View style={styles.dialogueBox}>
              <Ionicons name="chatbubble-outline" size={16} color={DharmaDesignSystem.colors.sacred.krishnaBlue} />
              <Text style={[styles.characterDialogue, { fontSize: getFontSize() }]}>
                {verse.characterDialogue}
              </Text>
            </View>
          )}

          {/* Child Story */}
          <Text style={[styles.childStory, { fontSize: getFontSize() + 2 }]}>
            {verse.childStory}
          </Text>

          {/* Simple Explanation */}
          <Text style={[styles.simpleExplanation, { fontSize: getFontSize() }]}>
            {verse.simpleExplanation}
          </Text>

          {/* Original Sanskrit & English */}
          <View style={styles.originalTextBox}>
            <Text style={[styles.sanskritVerse, { fontSize: getFontSize() }]}>
              {verse.originalSanskrit}
            </Text>
            <Text style={[styles.englishTranslation, { fontSize: getFontSize() }]}>
              {verse.originalEnglish}
            </Text>
          </View>

          {/* Real Life Example */}
          <View style={styles.exampleBox}>
            <Ionicons name="lightbulb-outline" size={16} color={DharmaDesignSystem.colors.primary.marigoldWarm} />
            <Text style={[styles.realLifeExample, { fontSize: getFontSize() }]}>
              <Text style={styles.exampleLabel}>Real Life Example: </Text>
              {verse.realLifeExample}
            </Text>
          </View>

          {/* Question to Think */}
          <View style={styles.questionBox}>
            <Ionicons name="help-circle-outline" size={16} color={DharmaDesignSystem.colors.sacred.lotusPink} />
            <Text style={[styles.questionToThink, { fontSize: getFontSize() }]}>
              <Text style={styles.questionLabel}>Think About This: </Text>
              {verse.questionToThink}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const getFontSize = (): number => {
    switch (fontSize) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 18;
      default: return 16;
    }
  };

  const renderVocabularyModal = () => (
    <Modal
      visible={showVocabulary}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Key Words</Text>
          <TouchableOpacity onPress={toggleVocabulary}>
            <Ionicons name="close" size={24} color={DharmaDesignSystem.colors.neutrals.charcoalInk} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.vocabularyList}>
          {chapter?.keyVocabulary.map((item, index) => (
            <View key={index} style={styles.vocabularyItem}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.vocabularyImage} />
              )}
              <View style={styles.vocabularyText}>
                <Text style={styles.vocabularyWord}>{item.word}</Text>
                <Text style={styles.vocabularyDefinition}>{item.childDefinition}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading chapter...</Text>
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
          <Ionicons name="chevron-back" size={24} color={DharmaDesignSystem.colors.neutrals.charcoalInk} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Chapter {chapter.number}</Text>
          <Text style={styles.headerSubtitle}>
            {chapter.name.childFriendly}
          </Text>
        </View>
        
        {/* Audio Controls in Header */}
        <View style={styles.headerControls}>
          <TouchableOpacity 
            onPress={playAudiobook} 
            style={[styles.controlButton, isAudioPlaying && styles.controlButtonActive]}
          >
            <Ionicons 
              name={isAudioPlaying ? "pause" : "headset-outline"} 
              size={20} 
              color={isAudioPlaying ? DharmaDesignSystem.colors.primary.saffronSunset : DharmaDesignSystem.colors.neutrals.softAsh} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={playPodcast} 
            style={[styles.controlButton, isPodcastPlaying && styles.controlButtonActive]}
          >
            <Ionicons 
              name={isPodcastPlaying ? "pause" : "radio-outline"} 
              size={20} 
              color={isPodcastPlaying ? DharmaDesignSystem.colors.sacred.krishnaBlue : DharmaDesignSystem.colors.neutrals.softAsh} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={adjustFontSize} style={styles.controlButton}>
            <Ionicons name="text-outline" size={20} color={DharmaDesignSystem.colors.neutrals.softAsh} />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Chapter Hero */}
        <View style={styles.chapterHero}>
          <Image
            source={{ uri: getChapterHeroImage(chapter.number) }}
            style={styles.chapterHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.heroOverlay}
          />
          <View style={styles.chapterTitleOverlay}>
            <Text style={styles.chapterTitle}>
              {mode === 'child' ? chapter.name.childFriendly : chapter.name.english}
            </Text>
            <Text style={styles.chapterSanskrit}>{chapter.name.sanskrit}</Text>
          </View>
        </View>

        {/* Story Hook */}
        <View style={styles.contentContainer}>
          <View style={styles.storyHookContainer}>
            <Text style={[styles.storyHook, { fontSize: getFontSize() + 2 }]}>
              {chapter.storyHook}
            </Text>
          </View>

          {/* Main Lesson */}
          <View style={styles.mainLessonContainer}>
            <Ionicons name="star-outline" size={20} color={DharmaDesignSystem.colors.primary.marigoldWarm} />
            <Text style={[styles.mainLessonText, { fontSize: getFontSize() }]}>
              <Text style={styles.mainLessonLabel}>Key Teaching: </Text>
              {chapter.mainLesson}
            </Text>
          </View>

          {/* Verses */}
          <View style={styles.versesContainer}>
            <Text style={styles.versesTitle}>Chapter Content</Text>
            {chapter.verses.map((verse, index) => renderVerse(verse, index))}
          </View>

        </View>
      </ScrollView>

      {/* Vocabulary Modal */}
      {renderVocabularyModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.creamCanvas,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 107, 53, 0.12)',
  },
  backButton: {
    padding: DharmaDesignSystem.spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  headerSubtitle: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  headerControls: {
    flexDirection: 'row',
    gap: DharmaDesignSystem.spacing.sm,
  },
  controlButton: {
    padding: DharmaDesignSystem.spacing.sm,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: DharmaDesignSystem.borderRadius.small,
  },
  scrollView: {
    flex: 1,
  },
  chapterHero: {
    height: 200,
    position: 'relative',
  },
  chapterHeroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  chapterTitleOverlay: {
    position: 'absolute',
    bottom: DharmaDesignSystem.spacing.lg,
    left: DharmaDesignSystem.spacing.lg,
    right: DharmaDesignSystem.spacing.lg,
  },
  chapterTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.white,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  chapterSanskrit: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    color: DharmaDesignSystem.colors.neutrals.white,
    opacity: 0.9,
  },
  contentContainer: {
    padding: DharmaDesignSystem.spacing.lg,
  },
  storyHookContainer: {
    backgroundColor: 'rgba(255, 182, 39, 0.12)',
    padding: DharmaDesignSystem.spacing.lg,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    marginBottom: DharmaDesignSystem.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.marigoldWarm,
  },
  storyHook: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    lineHeight: 24,
    fontWeight: '500',
  },
  mainLessonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    padding: DharmaDesignSystem.spacing.lg,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  mainLessonText: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    lineHeight: 22,
  },
  mainLessonLabel: {
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.saffronSunset,
  },
  versesContainer: {
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  versesTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  verseContainer: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.lg,
    ...DharmaDesignSystem.shadows.soft,
    position: 'relative',
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  verseNumberBadge: {
    backgroundColor: DharmaDesignSystem.colors.primary.saffronSunset,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  verseNumberText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.white,
    fontWeight: '600',
  },
  difficultyIndicator: {
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.neutrals.white,
    fontSize: 8,
  },
  illustrationContainer: {
    marginBottom: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    overflow: 'hidden',
  },
  illustrationImage: {
    width: '100%',
    height: 150,
  },
  verseContent: {
    gap: DharmaDesignSystem.spacing.md,
  },
  originalTextBox: {
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    padding: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderLeftWidth: 3,
    borderLeftColor: DharmaDesignSystem.colors.sacred.krishnaBlue,
  },
  dialogueBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    padding: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderLeftWidth: 3,
    borderLeftColor: DharmaDesignSystem.colors.sacred.krishnaBlue,
  },
  characterDialogue: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.sacred.krishnaBlue,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  childStory: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    lineHeight: 26,
  },
  simpleExplanation: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    lineHeight: 22,
  },
  exampleBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 182, 39, 0.08)',
    padding: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  realLifeExample: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    lineHeight: 20,
  },
  exampleLabel: {
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.marigoldWarm,
  },
  questionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(233, 30, 99, 0.08)',
    padding: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  questionToThink: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    lineHeight: 20,
  },
  questionLabel: {
    fontWeight: '600',
    color: DharmaDesignSystem.colors.sacred.lotusPink,
  },
  sanskritVerse: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.turmericGold,
    textAlign: 'center',
    lineHeight: 28,
  },
  englishTranslation: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    lineHeight: 24,
  },
  verseAudioButton: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.md,
    right: DharmaDesignSystem.spacing.md,
  },
  discussionContainer: {
    backgroundColor: 'rgba(233, 30, 99, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  discussionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.sacred.lotusPink,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  discussionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  discussionQuestion: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    lineHeight: 20,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  activitiesContainer: {
    backgroundColor: 'rgba(255, 182, 39, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  activitiesTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.primary.marigoldWarm,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  activityText: {
    flex: 1,
    marginLeft: DharmaDesignSystem.spacing.sm,
    lineHeight: 20,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.creamCanvas,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: DharmaDesignSystem.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 107, 53, 0.12)',
  },
  modalTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  vocabularyList: {
    flex: 1,
    padding: DharmaDesignSystem.spacing.lg,
  },
  vocabularyItem: {
    flexDirection: 'row',
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginBottom: DharmaDesignSystem.spacing.md,
    ...DharmaDesignSystem.shadows.soft,
  },
  vocabularyImage: {
    width: 50,
    height: 50,
    borderRadius: DharmaDesignSystem.borderRadius.small,
    marginRight: DharmaDesignSystem.spacing.md,
  },
  vocabularyText: {
    flex: 1,
  },
  vocabularyWord: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  vocabularyDefinition: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    lineHeight: 20,
  },
});

export default ChapterReadingScreen;