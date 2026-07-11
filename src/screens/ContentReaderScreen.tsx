import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  ViewToken,
  Image,
  ImageStyle,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import {
  getReaderContent,
  sectionsToNarrationContent,
  ReaderContentType,
} from '../data/readerContent';
import { NarrativeSection } from '../data/narrativeTypes';
import LocalStorageService from '../services/localStorageService';
import krishnaContext from '../services/krishnaContextService';
import { AudioNarrationService, NarrationCallbacks } from '../services/audioNarrationService';
import NarrativeSections from '../components/NarrativeSections';
import SourcesCard from '../components/SourcesCard';
import ChapterReflection from '../components/ChapterReflection';
import JourneyCelebration from '../components/JourneyCelebration';
import journeyService from '../services/journeyService';
import { navigateToJourneyItem } from '../data/journeyPath';

const { width } = Dimensions.get('window');

// Rough spoken-word reading time across a section's text fields
const readingMinutes = (sections: NarrativeSection[]): number => {
  const words = sections
    .flatMap(s => [s.storyText, s.teachingText, s.openingVerse?.meaning, s.keyVerse?.meaning])
    .filter(Boolean)
    .join(' ')
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
};

// The paged "book" experience for concepts, deities, and festivals — same
// pattern as GitaVersePlayerScreen: cover → one section per page → reflection
// → sources, swiped horizontally with narration and resume position.
type ReaderPage =
  | { kind: 'cover' }
  | { kind: 'section'; section: NarrativeSection; sectionIndex: number }
  | { kind: 'reflection'; questionIndex: number } // one page per question
  | { kind: 'celebration' };

const ContentReaderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contentType, contentId } = (route.params as {
    contentType: ReaderContentType;
    contentId: string;
  }) || { contentType: 'concept', contentId: '' };

  const content = useMemo(() => getReaderContent(contentType, contentId), [contentType, contentId]);

  const pages = useMemo(() => {
    if (!content) return [] as ReaderPage[];
    const pages: ReaderPage[] = [{ kind: 'cover' }];
    content.sections.forEach((section, sectionIndex) =>
      pages.push({ kind: 'section', section, sectionIndex })
    );
    content.reflectionQuestions.forEach((_, questionIndex) =>
      pages.push({ kind: 'reflection', questionIndex })
    );
    pages.push({ kind: 'celebration' }); // appended last — stored positions unaffected
    return pages;
  }, [content]);

  const positionKey = `${contentType}:${contentId}`;

  const listRef = useRef<FlatList<ReaderPage>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showMenu, setShowMenu] = useState(false);

  // Playback
  const audioService = useRef(AudioNarrationService.getInstance()).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);

  const narrationContent = useMemo(
    () => (content ? sectionsToNarrationContent(content.sections) : []),
    [content]
  );
  const audioSegments = useMemo(
    () => (narrationContent.length ? audioService.parseContentIntoSegments(narrationContent) : []),
    [narrationContent, audioService]
  );

  // Resume last spot on mount
  useEffect(() => {
    (async () => {
      const last = await LocalStorageService.getReaderPosition(positionKey);
      const idx = last > 0 && last < pages.length ? last : 0;
      setInitialIndex(idx);
      setActiveIndex(idx);
      setReady(true);
    })();
    return () => { audioService.cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const pagesRef = useRef(pages);
  pagesRef.current = pages;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      const idx = viewableItems[0].index;
      setActiveIndex(idx);
      LocalStorageService.saveReaderPosition(positionKey, idx);
      const page = pagesRef.current[idx];
      if (page?.kind === 'section' && content) {
        // Keep the Krishna context aware of what's on screen
        krishnaContext.setCurrentContent({
          type: contentType,
          title: content.title,
          snippet: `${page.section.title}. ${page.section.storyText ?? ''}`,
        });
      }
      if (page?.kind === 'celebration') {
        // Reaching the celebration page IS completing the content
        journeyService.markCompleted(positionKey);
      }
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  const scrollToIndex = useCallback((index: number) => {
    if (index >= 0 && index < pages.length) {
      listRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [pages.length]);

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    setFontSize(prev => sizes[(sizes.indexOf(prev) + 1) % sizes.length]);
  };

  const getTextStyle = useCallback((base: any) => {
    const m = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.15 : 1;
    return { ...base, fontSize: base.fontSize * m, lineHeight: base.lineHeight * m };
  }, [fontSize]);

  // --- Playback ---------------------------------------------------------
  const startPlayback = useCallback(async (fromSectionIndex: number) => {
    const startFromIndex = Math.max(
      0,
      audioSegments.findIndex(s => s.id.startsWith(`section-${fromSectionIndex}-`))
    );
    const callbacks: NarrationCallbacks = {
      onSegmentStart: (segmentId) => {
        setHighlightedSegmentId(segmentId);
        const m = segmentId.match(/section-(\d+)/);
        if (m) {
          const sectionIdx = parseInt(m[1]);
          listRef.current?.scrollToIndex({ index: 1 + sectionIdx, animated: true });
        }
      },
      onSegmentEnd: () => {},
      onProgressUpdate: () => {},
      onPlaybackComplete: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setHighlightedSegmentId(null);
      },
      onError: (e) => console.warn('Narration error:', e),
    };
    setIsPlaying(true);
    setIsPaused(false);
    await audioService.startNarration(narrationContent, callbacks, startFromIndex);
  }, [audioSegments, narrationContent, audioService]);

  const handlePlayPause = useCallback(async () => {
    if (isPlaying) {
      await audioService.pauseNarration();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }
    if (isPaused) {
      await audioService.resumeNarration();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }
    // Fresh start from the active page; covers/reflection/sources start at part 1
    const page = pages[activeIndex];
    const from = page?.kind === 'section' ? page.sectionIndex : 0;
    if (page?.kind !== 'section') scrollToIndex(1);
    await startPlayback(from);
  }, [isPlaying, isPaused, pages, activeIndex, startPlayback, audioService, scrollToIndex]);

  // --- Transport: keep the voice and the page in sync --------------------
  const narrationActive = isPlaying || isPaused;

  const firstSegmentOfSection = useCallback(
    (sectionIdx: number) => audioSegments.findIndex(s => s.id.startsWith(`section-${sectionIdx}-`)),
    [audioSegments]
  );

  // Page skip: when narrating, move the voice with the page (or stop it when
  // leaving the sections); when idle, just turn the page
  const skipPage = useCallback(async (direction: 1 | -1) => {
    const target = activeIndex + direction;
    if (target < 0 || target >= pages.length) return;
    const page = pages[target];
    if (narrationActive) {
      if (page.kind === 'section') {
        const segIdx = firstSegmentOfSection(page.sectionIndex);
        if (segIdx >= 0) {
          setHighlightedSegmentId(audioSegments[segIdx].id); // covers the paused case
          await audioService.seekToSegment(segIdx);
        }
      } else {
        // Skipping onto cover/reflection/sources ends the narration
        await audioService.stopNarration();
        setIsPlaying(false);
        setIsPaused(false);
        setHighlightedSegmentId(null);
      }
    }
    scrollToIndex(target);
  }, [activeIndex, pages, narrationActive, firstSegmentOfSection, audioSegments, audioService, scrollToIndex]);

  // Podcast-style ±10 seconds, resolved to the nearest segment boundary
  const seekBySeconds = useCallback(async (deltaSeconds: number) => {
    if (!narrationActive) return;
    const total = audioService.getEstimatedTotalDuration();
    if (total <= 0) return;
    const targetMs = Math.max(0, Math.min(audioService.getElapsedDuration() + deltaSeconds * 1000, total - 1));
    await audioService.seekToProgress(targetMs / total);
    const seg = audioSegments[audioService.getCurrentState().currentSegmentIndex];
    if (seg) {
      setHighlightedSegmentId(seg.id);
      const m = seg.id.match(/section-(\d+)/);
      if (m) scrollToIndex(1 + parseInt(m[1]));
    }
  }, [narrationActive, audioService, audioSegments, scrollToIndex]);

  const askKrishnaAboutThis = () => {
    setShowMenu(false);
    if (!content) return;
    const page = pages[activeIndex];
    if (page?.kind !== 'section') {
      krishnaContext.setCurrentContent({ type: contentType, title: content.title });
    }
    (navigation as any).navigate('MainTabs', { screen: 'Ask Krishna' });
  };

  const openDetails = () => {
    setShowMenu(false);
    if (!content) return;
    (navigation as any).navigate(content.detailRoute.name, content.detailRoute.params);
  };

  // Defensive fallback — content missing or has no sections
  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>This reading is not available yet.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.fallbackBack}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- Header info for the active page ----------------------------------
  const partCount = content.sections.length;
  const activePage = pages[activeIndex];
  const headerInfo = (() => {
    if (!activePage || activePage.kind === 'cover') return { sub: content.readerLabel, progress: 0 };
    if (activePage.kind === 'section') {
      return {
        sub: `Part ${activePage.sectionIndex + 1} of ${partCount}`,
        progress: partCount > 0 ? (activePage.sectionIndex + 1) / partCount : 0,
      };
    }
    if (activePage.kind === 'reflection') {
      return {
        sub: `Reflection ${activePage.questionIndex + 1} of ${content.reflectionQuestions.length}`,
        progress: 1,
      };
    }
    return { sub: 'Complete', progress: 1 };
  })();

  // --- Renderers --------------------------------------------------------
  const renderCover = () => (
    <View style={styles.page}>
      <Image source={content.coverImage} style={coverImageStyle} />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.coverContent}>
        <View style={styles.coverBottom}>
          <Text style={styles.coverLabel}>{content.readerLabel}</Text>
          <Text style={styles.coverTitle}>{content.title}</Text>
          {content.sanskritTitle && <Text style={styles.coverSanskrit}>{content.sanskritTitle}</Text>}
          <Text style={styles.coverSubtitle}>{content.subtitle}</Text>
          <View style={styles.coverMetaRow}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.9)" />
            <Text style={styles.coverMeta}>
              {readingMinutes(content.sections)} min · {partCount} parts
            </Text>
          </View>
          <TouchableOpacity
            style={styles.coverBegin}
            onPress={() => {
              // Begin = turn the page AND start the voice
              scrollToIndex(1);
              startPlayback(0);
            }}
          >
            <Text style={styles.coverBeginText}>Begin</Text>
            <Ionicons name="arrow-forward" size={18} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderSection = (section: NarrativeSection, sectionIndex: number) => (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pageScroll}>
        <NarrativeSections
          sections={[section]}
          sectionIndexOffset={sectionIndex}
          highlightedSegmentId={highlightedSegmentId}
          audioSegments={audioSegments}
          getTextStyle={getTextStyle}
        />
        {/* Bibliography rides at the foot of the final text page — sources
            are footnotes here, not a destination of their own */}
        {sectionIndex === content.sections.length - 1 && content.sources.length > 0 && (
          <View style={styles.sourcesCardWrap}>
            <SourcesCard sources={content.sources} />
          </View>
        )}
      </ScrollView>
    </View>
  );

  // Jump past the reflection block, straight to the celebration
  const skipReflections = () => {
    scrollToIndex(pages.length - 1);
  };

  const renderReflection = (questionIndex: number) => (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.reflectionScroll}
        keyboardShouldPersistTaps="handled"
      >
        <ChapterReflection
          contentType={contentType}
          contentId={content.id}
          chapterTitle={content.title}
          subtitle={content.subtitle}
          questions={content.reflectionQuestions}
          singleQuestionIndex={questionIndex}
          onQuestionComplete={() => scrollToIndex(activeIndex + 1)}
          onSkipAll={skipReflections}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderCelebration = () => (
    <View style={styles.page}>
      <JourneyCelebration
        completedItemId={positionKey}
        completedTitle={content.title}
        active={pages[activeIndex]?.kind === 'celebration'}
        onNext={next => navigateToJourneyItem(navigation, next, true)}
        onBackToLearn={() => (navigation as any).navigate('MainTabs', { screen: 'Scriptures' })}
      />
    </View>
  );

  const renderItem = ({ item }: { item: ReaderPage }) => {
    switch (item.kind) {
      case 'cover': return renderCover();
      case 'section': return renderSection(item.section, item.sectionIndex);
      case 'reflection': return renderReflection(item.questionIndex);
      case 'celebration': return renderCelebration();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={26} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>{content.title} · {headerInfo.sub}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.round(headerInfo.progress * 100)}%` }]} />
          </View>
        </View>
        <TouchableOpacity onPress={adjustFontSize} style={styles.headerBtn}>
          <Ionicons name="text" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
      </View>

      {ready && (
        <FlatList
          ref={listRef}
          data={pages}
          extraData={activeIndex}
          keyExtractor={(_, i) => `p-${i}`}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          initialScrollIndex={initialIndex}
          windowSize={5}
          maxToRenderPerBatch={3}
        />
      )}

      {/* Playback bar — transport lives inside the content only */}
      {(activePage?.kind === 'section' || activePage?.kind === 'reflection') && (
      <View style={styles.playbackBar}>
        <View style={styles.transport}>
          <TouchableOpacity onPress={() => skipPage(-1)} style={styles.transportBtn}>
            <Ionicons name="play-skip-back" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => seekBySeconds(-10)}
            style={styles.transportBtn}
            disabled={!narrationActive}
          >
            <MaterialIcons
              name="replay-10"
              size={26}
              color={DharmaDesignSystem.colors.primary.deepSaffron}
              style={!narrationActive && styles.transportDisabled}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playBtn}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={26}
              color="#FFFFFF"
              style={isPlaying ? undefined : { marginLeft: 3 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => seekBySeconds(10)}
            style={styles.transportBtn}
            disabled={!narrationActive}
          >
            <MaterialIcons
              name="forward-10"
              size={26}
              color={DharmaDesignSystem.colors.primary.deepSaffron}
              style={!narrationActive && styles.transportDisabled}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => skipPage(1)} style={styles.transportBtn}>
            <Ionicons name="play-skip-forward" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        </View>
      </View>
      )}

      {/* 3-dot menu */}
      <Modal visible={showMenu} transparent animationType="fade" onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity style={styles.menuBackdrop} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuSheet}>
            <TouchableOpacity style={styles.menuItem} onPress={askKrishnaAboutThis}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
              <Text style={styles.menuItemText}>Ask Krishna about this</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={openDetails}>
              <Ionicons name="information-circle-outline" size={22} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
              <Text style={styles.menuItemText}>Details & practices</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

// Typed separately: inside StyleSheet.create the style resolves to a
// ViewStyle|TextStyle|ImageStyle union that Image's style prop rejects
const coverImageStyle: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutrals.sandstoneBeige },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 81, 0, 0.12)',
  },
  headerBtn: { padding: spacing.xs },
  headerCenter: { flex: 1, gap: spacing.xs, paddingHorizontal: spacing.xs },
  headerLabel: { ...typography.sizes.bodySM, color: colors.neutrals.charcoalBlack, fontWeight: '600' },
  progressBar: { height: 5, borderRadius: 3, backgroundColor: colors.neutrals.gentleMist, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: colors.primary.deepSaffron },
  // Pages
  page: { width, flex: 1 },
  pageScroll: { paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  reflectionScroll: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  // Cover
  coverContent: { flex: 1, justifyContent: 'flex-end' },
  coverBottom: { padding: spacing.lg, paddingBottom: spacing.xl },
  coverLabel: {
    ...typography.sizes.caption,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  coverTitle: { ...typography.sizes.headingXL, color: '#FFFFFF', fontWeight: '700', marginBottom: spacing.xs },
  coverSanskrit: { ...typography.sizes.sacredQuote, fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: spacing.xs },
  coverSubtitle: { ...typography.sizes.bodyLG, fontWeight: '400', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginBottom: spacing.md },
  coverMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.lg },
  coverMeta: { ...typography.sizes.bodySM, fontWeight: '400', color: 'rgba(255,255,255,0.9)' },
  coverBegin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.md,
  },
  coverBeginText: { ...typography.sizes.buttonText, color: colors.primary.deepSaffron, fontWeight: '700' },
  // Reflection page reuses pageScroll padding; ChapterReflection pads itself
  sourcesCardWrap: {
    alignSelf: 'stretch',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  // Playback bar
  playbackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 81, 0, 0.12)',
    backgroundColor: colors.neutrals.warmIvory,
  },
  transport: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  transportBtn: { padding: spacing.xs },
  transportDisabled: { opacity: 0.35 },
  playBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.button,
  },
  // Menu
  menuBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  menuSheet: {
    marginTop: 100, marginRight: spacing.md,
    backgroundColor: '#FFFFFF', borderRadius: borderRadius.medium,
    paddingVertical: spacing.xs, minWidth: 200,
    ...shadows.lifted,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  menuItemText: { ...typography.sizes.bodyMD, fontWeight: '400', color: colors.neutrals.charcoalBlack },
  // Fallback
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  fallbackText: { ...typography.sizes.bodyLG, fontWeight: '400', color: colors.neutrals.charcoalBlack },
  fallbackBack: { ...typography.sizes.bodyMD, color: colors.primary.deepSaffron, fontWeight: '600' },
});

export default ContentReaderScreen;
