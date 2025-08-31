import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { getAllChildChapters } from '../data/bhagavadGitaChildFriendly';
import { getChapterHeroImage, getChapterThumbnail } from '../data/imageManifest';
import { EnhancedChapter } from '../types/bhagavadGitaTypes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (DharmaDesignSystem.spacing.lg * 2);

const BhagavadGitaChaptersScreen: React.FC = () => {
  const navigation = useNavigation();
  const chapters = getAllChildChapters();

  const handleChapterPress = (chapter: EnhancedChapter) => {
    if (chapter.number === 1) {
      (navigation as any).navigate('BhagavadGitaChapter1');
    } else {
      (navigation as any).navigate('ChapterReading', { 
        chapterId: chapter.id,
        chapterNumber: chapter.number
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return DharmaDesignSystem.colors.primary.turmericYellow;
      case 'medium': return DharmaDesignSystem.colors.primary.peacockTeal;
      case 'advanced': return DharmaDesignSystem.colors.primary.deepSaffron;
      default: return DharmaDesignSystem.colors.neutrals.softAsh;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'happy-outline';
      case 'medium': return 'school-outline';
      case 'advanced': return 'library-outline';
      default: return 'book-outline';
    }
  };

  const renderChapterCard = ({ item: chapter }: { item: EnhancedChapter }) => {
    return (
      <TouchableOpacity 
        style={styles.chapterCard}
        onPress={() => handleChapterPress(chapter)}
        activeOpacity={0.8}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={typeof chapter.images.heroImage === 'string' ? 
              { uri: chapter.images.heroImage } : 
              chapter.images.heroImage}
            style={styles.heroImage}
            defaultSource={{ uri: '/images/default/chapter-hero.jpg' }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          
          {/* Chapter Number Badge */}
          <View style={styles.chapterNumberBadge}>
            <Text style={styles.chapterNumberText}>{chapter.number}</Text>
          </View>

          {/* Difficulty Badge */}
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(chapter.difficulty) }]}>
            <Ionicons 
              name={getDifficultyIcon(chapter.difficulty) as any} 
              size={16} 
              color={DharmaDesignSystem.colors.neutrals.white} 
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          {/* Title Section */}
          <Text style={styles.englishTitle}>{chapter.name.english}</Text>
          <Text style={styles.childFriendlyTitle}>{chapter.name.childFriendly}</Text>
          <Text style={styles.sanskritTitle}>{chapter.name.sanskrit}</Text>

          {/* Main Lesson */}
          <Text style={styles.mainLesson} numberOfLines={2}>
            {chapter.mainLesson}
          </Text>

          {/* Reading Time & Audio Info */}
          <View style={styles.metaInfo}>
            <View style={styles.readingTime}>
              <Ionicons name="time-outline" size={16} color={DharmaDesignSystem.colors.primary.deepSaffron} />
              <Text style={styles.timeText}>
                {chapter.estimatedReadingTime.child}
              </Text>
            </View>
            
            <View style={styles.audioInfo}>
              <Ionicons name="volume-high-outline" size={16} color={DharmaDesignSystem.colors.primary.peacockTeal} />
              <Text style={styles.audioText}>{chapter.estimatedReadingTime.audio}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.readButton}
              onPress={() => handleChapterPress(chapter)}
            >
              <Ionicons name="book-outline" size={18} color={DharmaDesignSystem.colors.neutrals.white} />
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="headset-outline" size={18} color={DharmaDesignSystem.colors.primary.peacockTeal} />
              <Text style={styles.audioButtonText}>Listen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={DharmaDesignSystem.colors.neutrals.charcoalBlack} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Bhagavad Gita</Text>
            <Text style={styles.headerSubtitle}>18 Chapters of Wisdom</Text>
          </View>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* Intro Message */}
      <View style={styles.introMessage}>
        <Text style={styles.introText}>
          📚 Ready for an amazing journey? Each chapter teaches us something special about life, wisdom, and being kind. Discover timeless teachings that have guided seekers for thousands of years.
        </Text>
      </View>

      {/* Chapters List */}
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        renderItem={renderChapterCard}
        contentContainerStyle={styles.chaptersContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
  },
  headerSubtitle: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  headerSpacer: {
    width: 40,
  },
  introMessage: {
    marginHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
    padding: DharmaDesignSystem.spacing.md,
    backgroundColor: 'rgba(255, 182, 39, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.turmericYellow,
  },
  introText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 20,
  },
  chaptersContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.xl,
  },
  chapterCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    overflow: 'hidden',
    ...DharmaDesignSystem.shadows.lifted,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.08)',
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  chapterNumberBadge: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.sm,
    left: DharmaDesignSystem.spacing.sm,
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumberText: {
    ...DharmaDesignSystem.typography.sizes.navText,
    color: DharmaDesignSystem.colors.neutrals.white,
    fontWeight: '600',
  },
  difficultyBadge: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.sm,
    right: DharmaDesignSystem.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: DharmaDesignSystem.spacing.lg,
  },
  englishTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs / 2,
  },
  childFriendlyTitle: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  sanskritTitle: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    color: DharmaDesignSystem.colors.primary.turmericYellow,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  mainLesson: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 22,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  readingTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginLeft: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    marginLeft: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: DharmaDesignSystem.spacing.sm,
  },
  readButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    ...DharmaDesignSystem.shadows.button,
  },
  audioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: DharmaDesignSystem.colors.primary.peacockTeal,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  buttonText: {
    ...DharmaDesignSystem.typography.sizes.buttonText,
    color: DharmaDesignSystem.colors.neutrals.white,
    marginLeft: DharmaDesignSystem.spacing.xs,
  },
  audioButtonText: {
    ...DharmaDesignSystem.typography.sizes.buttonText,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    marginLeft: DharmaDesignSystem.spacing.xs,
  },
  cardSeparator: {
    height: DharmaDesignSystem.spacing.lg,
  },
});

export default BhagavadGitaChaptersScreen;