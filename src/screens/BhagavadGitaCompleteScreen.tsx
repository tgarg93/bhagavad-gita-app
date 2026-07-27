import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';
import AudioControls from '../components/AudioControls';
import TextHighlighter from '../components/TextHighlighter';
import { bhagavadGitaData } from '../data/bhagavadGitaData';
import { gitaPreface, gitaChapters, GitaBlock, GitaChapterContent } from '../data/bhagavadGitaContent';
import { getVerseCount } from '../data/gitaVerses';
import { gitaReflections } from '../data/bhagavadGitaContent';
import ChapterReflection from '../components/ChapterReflection';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

const { width, height } = Dimensions.get('window');

// Preface is section index 0 in the narration content; chapters occupy indices 1-18.
// All reading content lives in src/data/bhagavadGitaContent.ts.
const PREFACE_KEY = 0; // chapterPositions key for the preface section

const chapterName = (chapterNumber: number): string =>
  bhagavadGitaData.find(ch => ch.number === chapterNumber)?.name.english || '';

const BhagavadGitaCompleteScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentChapter, setCurrentChapter] = useState(PREFACE_KEY);
  const [chapterPositions, setChapterPositions] = useState<{[key: number]: number}>({});
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);
  const [showToc, setShowToc] = useState(false);

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const getTextStyle = (baseStyle: any) => {
    const multiplier = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.15 : 1;
    return {
      ...baseStyle,
      fontSize: baseStyle.fontSize * multiplier,
      lineHeight: baseStyle.lineHeight * multiplier,
    };
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Find which chapter is currently in view (0 = preface)
    let currentChapterInView = PREFACE_KEY;
    Object.keys(chapterPositions).forEach(chapterNum => {
      const chapterY = chapterPositions[parseInt(chapterNum)];
      if (scrollY >= chapterY - 100) { // 100px buffer for header
        currentChapterInView = parseInt(chapterNum);
      }
    });

    if (currentChapterInView !== currentChapter) {
      setCurrentChapter(currentChapterInView);
    }
  };

  // Narration content: preface at section index 0, chapter N at section index N,
  // so segment ids (`section-{i}-...`) line up with chapterPositions keys
  const narrationContent = useMemo(() => [
    { title: 'Before You Begin', blocks: gitaPreface.blocks },
    ...gitaChapters.map(chapter => ({
      title: `Chapter ${chapter.number}: ${chapterName(chapter.number)}`,
      blocks: chapter.blocks,
    })),
  ], []);

  useEffect(() => {
    const audioService = AudioNarrationService.getInstance();
    setAudioSegments(audioService.parseContentIntoSegments(narrationContent));
  }, [narrationContent]);

  const handleTextHighlight = useCallback((segmentId: string, segmentIndex: number) => {
    setHighlightedSegmentId(segmentId);
  }, []);

  const handlePlaybackFinished = useCallback(() => {
    setHighlightedSegmentId(null);
  }, []);

  const audioSegmentsRef = useRef<TextSegment[]>([]);
  audioSegmentsRef.current = audioSegments;
  const chapterPositionsRef = useRef<{[key: number]: number}>({});
  chapterPositionsRef.current = chapterPositions;

  const handleScrollToSegment = useCallback((segmentIndex: number) => {
    const segment = audioSegmentsRef.current[segmentIndex];
    if (!segment) return;

    // Section index in segment ids maps directly to chapterPositions keys (0 = preface)
    const sectionMatch = segment.id.match(/section-(\d+)/);
    if (sectionMatch) {
      const sectionKey = parseInt(sectionMatch[1]);
      const chapterY = chapterPositionsRef.current[sectionKey];
      if (chapterY !== undefined && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: Math.max(0, chapterY - 100), animated: true });
      }
    }
  }, []);

  const jumpToChapter = (sectionKey: number) => {
    setShowToc(false);
    const y = chapterPositionsRef.current[sectionKey];
    if (y !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, y - 12), animated: true });
    }
  };

  const onChapterLayout = (chapterNumber: number) => (event: any) => {
    const { y } = event.nativeEvent.layout;
    setChapterPositions(prev => ({
      ...prev,
      [chapterNumber]: y
    }));
  };

  const SanskritVerse = ({ sanskrit, transliteration, meaning, reference, blockPrefix }: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
    reference?: string; // e.g. '2.47' — shown as a citation caption
    blockPrefix?: string; // narration block id of this verse, e.g. 'section-2-block-5'
  }) => (
    <View style={styles.verseContainer}>
      <TextHighlighter
        text={sanskrit}
        blockId={blockPrefix ? `${blockPrefix}-sanskrit` : undefined}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.sanskritText)}
      />
      <TextHighlighter
        text={transliteration}
        blockId={blockPrefix ? `${blockPrefix}-transliteration` : undefined}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.transliterationText)}
      />
      <TextHighlighter
        text={meaning}
        blockId={blockPrefix ? `${blockPrefix}-meaning` : undefined}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.meaningText)}
      />
      {reference && (
        <Text style={styles.verseReference}>
          {/^\d/.test(reference) ? `Bhagavad Gita ${reference}` : reference}
        </Text>
      )}
    </View>
  );

  // Renders one section's ordered content blocks; blockIds match the narration
  // parser's `section-{sectionIndex}-block-{blockIndex}` scheme
  const renderBlocks = (sectionIndex: number, blocks: GitaBlock[]) =>
    blocks.map((block, blockIndex) => {
      const blockId = `section-${sectionIndex}-block-${blockIndex}`;
      switch (block.type) {
        case 'header':
          return (
            <TextHighlighter
              key={blockId}
              text={block.text}
              blockId={blockId}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.sectionHeader)}
            />
          );
        case 'verse':
          return (
            <SanskritVerse
              key={blockId}
              sanskrit={block.verse.sanskrit}
              transliteration={block.verse.transliteration}
              meaning={block.verse.meaning}
              reference={block.verse.reference}
              blockPrefix={blockId}
            />
          );
        case 'prose':
        case 'teaching':
          return (
            <TextHighlighter
              key={blockId}
              text={block.text}
              blockId={blockId}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.storyText)}
            />
          );
        default:
          return null;
      }
    });

  const renderChapter = (chapter: GitaChapterContent) => {
    const section = `section-${chapter.number}`; // preface occupies section-0

    return (
      <View
        key={`chapter-${chapter.number}`}
        style={styles.chapterSection}
        onLayout={onChapterLayout(chapter.number)}
      >
        <TextHighlighter
          text={`Chapter ${chapter.number}: ${chapterName(chapter.number)}`}
          blockId={`${section}-title`}
          highlightedSegmentId={highlightedSegmentId}
          segments={audioSegments}
          style={getTextStyle(styles.chapterTitle)}
        />
        <Text style={getTextStyle(styles.chapterSubtitle)}>
          {chapter.subtitle} • {getEstimatedReadingTime(chapter.number)} min read
        </Text>

        {renderBlocks(chapter.number, chapter.blocks)}

        {/* End-of-chapter reflection prompts */}
        {gitaReflections[chapter.number] && (
          <ChapterReflection
            chapterNumber={chapter.number}
            chapterTitle={chapterName(chapter.number)}
            subtitle={chapter.subtitle}
            questions={gitaReflections[chapter.number]}
          />
        )}
      </View>
    );
  };


  // Reading time computed from actual content length; ~110 wpm reflects the slow,
  // contemplative pace of scripture with Sanskrit verses. 0 = preface
  const getEstimatedReadingTime = (sectionKey: number): number => {
    const blocks =
      sectionKey === PREFACE_KEY
        ? gitaPreface.blocks
        : gitaChapters.find(ch => ch.number === sectionKey)?.blocks || [];
    const text = blocks
      .map(block => (block.type === 'verse' ? block.verse.meaning : block.text))
      .join(' ');
    const words = text.trim().split(/\s+/).length;
    // Each Sanskrit verse adds ~half a minute of slow reading beyond its English meaning
    const verseCount = blocks.filter(block => block.type === 'verse').length;
    return Math.max(2, Math.round(words / 110 + verseCount * 0.5));
  };

  const tocEntries = useMemo(() => [
    {
      key: PREFACE_KEY,
      title: 'Before You Begin',
      subtitle: 'Preface',
    },
    ...gitaChapters.map(chapter => ({
      key: chapter.number,
      title: chapterName(chapter.number),
      subtitle: chapter.subtitle,
    })),
  ], []);

  const renderTocModal = () => (
    <Modal
      visible={showToc}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowToc(false)}
    >
      <SafeAreaView style={styles.tocContainer}>
        <View style={styles.tocHeader}>
          <Text style={styles.tocTitle}>Contents</Text>
          <TouchableOpacity onPress={() => setShowToc(false)} style={styles.tocCloseButton}>
            <Ionicons name="close" size={24} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tocList}>
          {tocEntries.map(entry => {
            const isActive = currentChapter === entry.key;
            return (
              <TouchableOpacity
                key={entry.key}
                style={[styles.tocItem, isActive && styles.tocItemActive]}
                onPress={() => jumpToChapter(entry.key)}
              >
                <View style={[styles.tocBadge, isActive && styles.tocBadgeActive]}>
                  <Text style={[styles.tocBadgeText, isActive && styles.tocBadgeTextActive]}>
                    {entry.key === PREFACE_KEY ? 'ॐ' : entry.key}
                  </Text>
                </View>
                <View style={styles.tocDetails}>
                  <Text style={[styles.tocName, isActive && styles.tocNameActive]}>{entry.title}</Text>
                  <Text style={styles.tocSubtitle} numberOfLines={1}>{entry.subtitle}</Text>
                </View>
                <Text style={styles.tocTime}>{getEstimatedReadingTime(entry.key)} min</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={currentChapter === PREFACE_KEY ? 'Preface' : `Chapter ${currentChapter}`}
        subtitle="Bhagavad Gita"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <View style={styles.headerActions}>
            <AudioControls
              content={narrationContent}
              onTextHighlight={handleTextHighlight}
              onScrollToSegment={handleScrollToSegment}
              onPlaybackFinished={handlePlaybackFinished}
              compact={true}
            />
            <TouchableOpacity onPress={() => setShowToc(true)} style={styles.fontButton}>
              <Ionicons name="list" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
            <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
              <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
            {/* Flip back to the verse-by-verse (Verse view) */}
            <TouchableOpacity
              onPress={() => (navigation as any).navigate('GitaVersePlayer')}
              style={styles.fontButton}
            >
              <Ionicons name="albums-outline" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Book Cover */}
        <View style={styles.bookCover}>
          <Text style={getTextStyle(styles.bookTitle)}>Bhagavad Gita</Text>
          <Text style={getTextStyle(styles.bookSubtitle)}>Complete Story with Sacred Verses</Text>
        </View>

        {/* Preface */}
        <View style={styles.chapterSection} onLayout={onChapterLayout(PREFACE_KEY)}>
          <TextHighlighter
            text="Before You Begin"
            blockId={`section-${PREFACE_KEY}-title`}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={getTextStyle(styles.chapterTitle)}
          />
          <Text style={getTextStyle(styles.chapterSubtitle)}>
            {gitaPreface.subtitle} • {getEstimatedReadingTime(PREFACE_KEY)} min read
          </Text>
          {renderBlocks(PREFACE_KEY, gitaPreface.blocks)}
        </View>

        {/* Dynamic Chapter Rendering */}
        {gitaChapters.map(chapter => renderChapter(chapter))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Docked playback bar — renders only while narration is playing/paused */}
      <View style={styles.playerBarContainer} pointerEvents="box-none">
        <AudioControls
          content={narrationContent}
          onTextHighlight={handleTextHighlight}
          onScrollToSegment={handleScrollToSegment}
          onPlaybackFinished={handlePlaybackFinished}
        />
      </View>

      {renderTocModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.xs,
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  bookCover: {
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  bookTitle: {
    ...DharmaDesignSystem.typography.sizes.headingXL,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  bookSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chapterSection: {
    marginBottom: DharmaDesignSystem.spacing.xxl,
  },
  allVersesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.sm,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    paddingVertical: DharmaDesignSystem.spacing.md,
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.md,
  },
  allVersesText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
    flex: 1,
  },
  chapterTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  chapterSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginBottom: DharmaDesignSystem.spacing.lg,
    fontStyle: 'italic',
  },
  sectionHeader: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginTop: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  verseContainer: {
    marginVertical: DharmaDesignSystem.spacing.lg,
    paddingLeft: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    fontWeight: '500',
  },
  verseReference: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: DharmaDesignSystem.spacing.xs,
    letterSpacing: 0.4,
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'justify',
  },
  dialogueText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.lg,
    paddingLeft: DharmaDesignSystem.spacing.md,
    textAlign: 'justify',
  },
  sanskritInline: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  nameHighlight: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 140, // room for the docked playback bar
  },
  playerBarContainer: {
    position: 'absolute',
    left: DharmaDesignSystem.spacing.md,
    right: DharmaDesignSystem.spacing.md,
    bottom: DharmaDesignSystem.spacing.lg,
  },
  // Table of contents
  tocContainer: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  tocHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 81, 0, 0.15)',
  },
  tocTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
  },
  tocCloseButton: {
    padding: DharmaDesignSystem.spacing.xs,
  },
  tocList: {
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.md,
    paddingBottom: DharmaDesignSystem.spacing.xxl,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.sm,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  tocItemActive: {
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
  },
  tocBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DharmaDesignSystem.spacing.md,
  },
  tocBadgeActive: {
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    borderColor: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  tocBadgeText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  tocBadgeTextActive: {
    color: DharmaDesignSystem.colors.neutrals.white,
  },
  tocDetails: {
    flex: 1,
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  tocName: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
  },
  tocNameActive: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  tocSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: 2,
  },
  tocTime: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontWeight: '600',
  },
});

export default BhagavadGitaCompleteScreen;