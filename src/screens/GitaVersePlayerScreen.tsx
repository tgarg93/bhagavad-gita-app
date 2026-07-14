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
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { bhagavadGitaData } from '../data/bhagavadGitaData';
import {
  gitaPreface,
  gitaChapters,
  gitaReflections,
  gitaVerseInsights,
  GitaBlock,
} from '../data/bhagavadGitaContent';
import { getChapterVerses, getVerseCount, GitaFullVerse } from '../data/gitaVerses';
import { getChapterCover } from '../data/gitaChapterCovers';
import LocalStorageService from '../services/localStorageService';
import krishnaContext from '../services/krishnaContextService';
import { AudioNarrationService, NarrationCallbacks } from '../services/audioNarrationService';
import TextHighlighter from '../components/TextHighlighter';
import ChapterReflection from '../components/ChapterReflection';
import JourneyCelebration from '../components/JourneyCelebration';
import journeyService from '../services/journeyService';
import { navigateToJourneyItem } from '../data/journeyPath';

const { width } = Dimensions.get('window');
const TOTAL_GITA_VERSES = 700;

const chapterName = (n: number): string =>
  bhagavadGitaData.find(ch => ch.number === n)?.name.english || '';

const tidySanskrit = (s: string): string =>
  s.split(/\n+/).map(l => l.trim()).filter(Boolean).join('\n');

const readingTimeFor = (verseCount: number): number => Math.max(3, Math.round(verseCount * 0.5));

type PlaybackMode = 'all' | 'english';

// Continuous "book" pages
type Page =
  | { kind: 'cover'; chapter: number } // chapter 0 = preface cover
  | { kind: 'preface' }
  | { kind: 'verse'; chapter: number; verse: GitaFullVerse; verseIndex: number }
  | { kind: 'reflection'; chapter: number; questionIndex: number } // one page per question
  | { kind: 'celebration'; chapter: number }; // end-of-chapter journey moment

// Layout version for VerseProgress.lastPageIndex: v2 = per-chapter celebration
// pages inserted after each reflection block
const PAGE_LAYOUT_VERSION = 2;

const GitaVersePlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapter: requestedChapter, verse: requestedVerse } =
    (route.params as { chapter?: number; verse?: number } | undefined) ?? {};

  // Build the whole-book page list + index maps once
  const { pages, coverIndex, celebrationIndex } = useMemo(() => {
    const pages: Page[] = [];
    const coverIndex: { [chapter: number]: number } = {};
    const celebrationIndex: { [chapter: number]: number } = {};
    coverIndex[0] = pages.length;
    pages.push({ kind: 'cover', chapter: 0 });
    pages.push({ kind: 'preface' });
    for (let ch = 1; ch <= 18; ch++) {
      coverIndex[ch] = pages.length;
      pages.push({ kind: 'cover', chapter: ch });
      getChapterVerses(ch).forEach((verse, verseIndex) =>
        pages.push({ kind: 'verse', chapter: ch, verse, verseIndex })
      );
      (gitaReflections[ch] || []).forEach((_, questionIndex) =>
        pages.push({ kind: 'reflection', chapter: ch, questionIndex })
      );
      celebrationIndex[ch] = pages.length;
      pages.push({ kind: 'celebration', chapter: ch });
    }
    return { pages, coverIndex, celebrationIndex };
  }, []);

  const verseStartIndex = useMemo(() => {
    const map: { [chapter: number]: number } = {};
    pages.forEach((p, i) => {
      if (p.kind === 'verse' && map[p.chapter] === undefined) map[p.chapter] = i;
    });
    return map;
  }, [pages]);

  // Where a chapter (+ optional verse) request lands. A citation that names
  // "Gita 2.47" should open ON 2.47, not on the chapter cover — so the verse
  // wins when it resolves, and the cover is the fallback.
  const requestedIndex = useMemo(() => {
    if (!requestedChapter || coverIndex[requestedChapter] == null) return null;
    if (requestedVerse != null) {
      const i = pages.findIndex(
        p => p.kind === 'verse' && p.chapter === requestedChapter && p.verse.verse === requestedVerse
      );
      if (i >= 0) return i;
    }
    return coverIndex[requestedChapter];
  }, [requestedChapter, requestedVerse, pages, coverIndex]);

  const listRef = useRef<FlatList<Page>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [totalProgress, setTotalProgress] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  // Playback
  const audioService = useRef(AudioNarrationService.getInstance()).current;
  const [mode, setMode] = useState<PlaybackMode>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [playingChapter, setPlayingChapter] = useState<number | null>(null);

  // Snapshot of progression points at mount — celebrations show session gains
  const pointsAtStartRef = useRef<number | undefined>(undefined);

  // Resume last spot on mount (or open at a requested chapter), migrating the
  // stored index once when the page layout gains new page kinds
  useEffect(() => {
    (async () => {
      let idx: number;
      if (requestedIndex != null) {
        idx = requestedIndex;
      } else {
        const progress = await LocalStorageService.getVerseProgress();
        let last = progress.lastPageIndex;
        if ((progress.pageLayoutVersion ?? 1) < PAGE_LAYOUT_VERSION) {
          // Stored index predates the inserted celebration pages: it counts
          // non-celebration pages only. Map it to the k-th non-celebration
          // page of the new layout, then stamp the version.
          let count = -1;
          let migrated = 0;
          for (let i = 0; i < pages.length; i++) {
            if (pages[i].kind === 'celebration') continue;
            count++;
            if (count === last) { migrated = i; break; }
          }
          last = migrated;
          await LocalStorageService.migrateLastPageIndex(migrated, PAGE_LAYOUT_VERSION);
        }
        idx = last > 0 && last < pages.length ? last : 0;
        // Devices already hold a celebration index, saved before the guard in
        // onViewableItemsChanged existed. Step back to the reading rather than
        // reopening the player onto "COMPLETED".
        while (idx > 0 && pages[idx]?.kind === 'celebration') idx--;
      }
      setInitialIndex(idx);
      setActiveIndex(idx);
      setTotalProgress(await LocalStorageService.getTotalProgress());
      setReady(true);
      // Snapshot progression so celebrations can show this session's gains
      const { getProgression } = require('../services/progressionService');
      pointsAtStartRef.current = (await getProgression()).points;
    })();
    return () => { audioService.cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-navigation with a different chapter/verse while already mounted
  useEffect(() => {
    if (ready && requestedIndex != null) {
      listRef.current?.scrollToIndex({ index: requestedIndex, animated: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      const idx = viewableItems[0].index;
      setActiveIndex(idx);
      const page = pages[idx];
      // A celebration is not a reading position. This one is a single GLOBAL
      // lastPageIndex (not per-chapter), so one stuck celebration index poisoned
      // every entry into the player that doesn't carry a chapter param — e.g. the
      // Gita card on the Learn tab.
      if (page?.kind !== 'celebration') {
        LocalStorageService.saveLastPage(idx);
      }
      if (page?.kind === 'verse') {
        LocalStorageService.markVerseRead(page.chapter, page.verse.verse)
          .then(() => LocalStorageService.getTotalProgress())
          .then(setTotalProgress);
        // Keep the Krishna context aware of what's on screen
        krishnaContext.setCurrentContent({
          type: 'verse',
          chapter: page.chapter,
          verse: page.verse.verse,
          title: chapterName(page.chapter),
          snippet: page.verse.english,
        });
      }
      if (page?.kind === 'celebration') {
        // Reaching the chapter's celebration page IS completing the chapter
        journeyService.markCompleted(`gita:${page.chapter}`);
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

  const getTextStyle = (base: any) => {
    const m = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.15 : 1;
    return { ...base, fontSize: base.fontSize * m, lineHeight: base.lineHeight * m };
  };

  const toggleExpanded = (key: string) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  // --- Playback ---------------------------------------------------------
  // Narrate the current chapter's verses from the active verse onward.
  const startPlayback = useCallback(async (chapter: number, fromVerseIndex: number, playMode: PlaybackMode) => {
    const verses = getChapterVerses(chapter);
    // One section per verse so segment ids map to verse index (section-{i}-...)
    const content = verses.map(v => ({
      blocks: [{
        type: 'verse',
        verse: {
          sanskrit: playMode === 'all' ? tidySanskrit(v.sanskrit) : '',
          transliteration: '',
          meaning: v.english,
        },
      }],
    }));
    // Resolve the starting segment by id rather than arithmetic — per-verse
    // segment counts can vary (e.g. a verse with no usable Sanskrit), and any
    // drift makes "play from here" start from the wrong verse
    const segments = audioService.parseContentIntoSegments(content as any);
    const startFromIndex = Math.max(
      0,
      segments.findIndex(s => s.id.startsWith(`section-${fromVerseIndex}-`))
    );

    const callbacks: NarrationCallbacks = {
      onSegmentStart: (segmentId) => {
        setHighlightedSegmentId(segmentId);
        const m = segmentId.match(/section-(\d+)/);
        if (m) {
          const vIdx = parseInt(m[1]);
          const page = verseStartIndex[chapter] + vIdx;
          listRef.current?.scrollToIndex({ index: page, animated: true });
        }
      },
      onSegmentEnd: () => {},
      onProgressUpdate: () => {},
      onPlaybackComplete: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setHighlightedSegmentId(null);
        setPlayingChapter(null);
      },
      onError: (e) => console.warn('Narration error:', e),
    };

    setPlayingChapter(chapter);
    setIsPlaying(true);
    setIsPaused(false);
    await audioService.startNarration(content, callbacks, startFromIndex);
  }, [verseStartIndex, audioService]);

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
    // Fresh start from the active page. If on a cover/preface, begin at that chapter's verse 1.
    const page = pages[activeIndex];
    let chapter = 1;
    let fromVerse = 0;
    if (page.kind === 'verse') { chapter = page.chapter; fromVerse = page.verseIndex; }
    else if (page.kind === 'cover' && page.chapter >= 1) { chapter = page.chapter; scrollToIndex(verseStartIndex[chapter]); }
    else if (page.kind === 'reflection') { chapter = page.chapter; scrollToIndex(verseStartIndex[chapter]); fromVerse = 0; }
    else { return; } // preface has no verses to narrate
    await startPlayback(chapter, fromVerse, mode);
  }, [isPlaying, isPaused, pages, activeIndex, mode, startPlayback, audioService, scrollToIndex, verseStartIndex]);

  const changeMode = useCallback(async (next: PlaybackMode) => {
    setMode(next);
    if (isPlaying || isPaused) {
      await audioService.stopNarration();
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightedSegmentId(null);
      setPlayingChapter(null);
    }
  }, [isPlaying, isPaused, audioService]);

  // --- Transport: keep the voice and the page in sync --------------------
  const narrationActive = isPlaying || isPaused;

  // Page skip: while narrating within the playing chapter, move the voice with
  // the page; leaving the chapter (cover/reflection/elsewhere) stops narration
  const skipPage = useCallback(async (direction: 1 | -1) => {
    const target = activeIndex + direction;
    if (target < 0 || target >= pages.length) return;
    const page = pages[target];
    if (narrationActive) {
      if (page.kind === 'verse' && page.chapter === playingChapter) {
        const segsPerVerse = mode === 'all' ? 2 : 1;
        setHighlightedSegmentId(
          `section-${page.verseIndex}-block-0-${mode === 'all' ? 'sanskrit' : 'meaning'}`
        );
        await audioService.seekToSegment(page.verseIndex * segsPerVerse);
      } else {
        await audioService.stopNarration();
        setIsPlaying(false);
        setIsPaused(false);
        setHighlightedSegmentId(null);
        setPlayingChapter(null);
      }
    }
    scrollToIndex(target);
  }, [activeIndex, pages, narrationActive, playingChapter, mode, audioService, scrollToIndex]);

  // Podcast-style ±10 seconds within the playing chapter's narration
  const seekBySeconds = useCallback(async (deltaSeconds: number) => {
    if (!narrationActive || playingChapter == null) return;
    const total = audioService.getEstimatedTotalDuration();
    if (total <= 0) return;
    const targetMs = Math.max(0, Math.min(audioService.getElapsedDuration() + deltaSeconds * 1000, total - 1));
    await audioService.seekToProgress(targetMs / total);
    const seg = audioService.getCurrentSegment();
    if (seg) {
      setHighlightedSegmentId(seg.id);
      const m = seg.id.match(/section-(\d+)/);
      if (m) {
        const page = verseStartIndex[playingChapter] + parseInt(m[1]);
        listRef.current?.scrollToIndex({ index: page, animated: true });
      }
    }
  }, [narrationActive, playingChapter, audioService, verseStartIndex]);

  const jumpToChapter = (chapter: number) => {
    setShowChapters(false);
    setShowMenu(false);
    scrollToIndex(coverIndex[chapter]);
  };

  const openStoryView = () => {
    setShowMenu(false);
    (navigation as any).navigate('BhagavadGitaComplete');
  };

  const askKrishnaAboutThis = () => {
    setShowMenu(false);
    // Context already set by onViewableItemsChanged for verse pages; ensure chapter context otherwise
    const page = pages[activeIndex];
    if (page.kind !== 'verse' && 'chapter' in page && page.chapter >= 1) {
      krishnaContext.setCurrentContent({ type: 'chapter', chapter: page.chapter, title: chapterName(page.chapter) });
    }
    (navigation as any).navigate('MainTabs', { screen: 'Ask Krishna' });
  };

  // --- Header info for the active page ----------------------------------
  const activePage = pages[activeIndex];
  const headerInfo = (() => {
    if (activePage.kind === 'cover' && activePage.chapter === 0) return { title: 'Before You Begin', sub: 'Preface', progress: 0 };
    if (activePage.kind === 'preface') return { title: 'Before You Begin', sub: 'Preface', progress: 0 };
    const ch = 'chapter' in activePage ? activePage.chapter : 1;
    const count = getVerseCount(ch);
    if (activePage.kind === 'verse') {
      return {
        title: `Chapter ${ch}`,
        sub: `Verse ${activePage.verseIndex + 1} of ${count}`,
        progress: count > 0 ? (activePage.verseIndex + 1) / count : 0,
      };
    }
    if (activePage.kind === 'reflection') {
      const count = (gitaReflections[ch] || []).length;
      return { title: `Chapter ${ch}`, sub: `Reflection ${activePage.questionIndex + 1} of ${count}`, progress: 1 };
    }
    if (activePage.kind === 'celebration') {
      return { title: `Chapter ${ch}`, sub: 'Complete', progress: 1 };
    }
    return { title: `Chapter ${ch}`, sub: '', progress: 0 };
  })();

  // --- Renderers --------------------------------------------------------
  const renderCover = (chapter: number) => {
    const isPreface = chapter === 0;
    const count = getVerseCount(chapter);
    return (
      <View style={styles.page}>
        <Image source={getChapterCover(chapter)} style={styles.coverImage} />
        <LinearGradient
          colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.coverContent}>
          <View style={styles.coverBottom}>
            <Text style={styles.coverLabel}>
              {isPreface ? 'Bhagavad Gita' : `Chapter ${chapter}`}
            </Text>
            <Text style={styles.coverTitle}>
              {isPreface ? 'Before You Begin' : chapterName(chapter)}
            </Text>
            <Text style={styles.coverSubtitle}>
              {isPreface ? gitaPreface.subtitle : gitaChapters.find(c => c.number === chapter)?.subtitle}
            </Text>
            <View style={styles.coverMetaRow}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.coverMeta}>
                {isPreface ? '2 min' : `${readingTimeFor(count)} min · ${count} verses`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.coverBegin}
              onPress={() => {
                // Begin = turn the page AND start the voice (preface has no verses)
                if (isPreface) {
                  scrollToIndex(activeIndex + 1);
                  return;
                }
                scrollToIndex(verseStartIndex[chapter]);
                startPlayback(chapter, 0, mode);
              }}
            >
              <Text style={styles.coverBeginText}>{isPreface ? 'Begin' : 'Begin chapter'}</Text>
              <Ionicons name="arrow-forward" size={18} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  const renderBlock = (block: GitaBlock, i: number) => {
    switch (block.type) {
      case 'header':
        return <Text key={i} style={getTextStyle(styles.blockHeader)}>{block.text}</Text>;
      case 'verse':
        return (
          <View key={i} style={styles.blockVerse}>
            <Text style={getTextStyle(styles.blockSanskrit)}>{block.verse.sanskrit}</Text>
            <Text style={getTextStyle(styles.blockTranslit)}>{block.verse.transliteration}</Text>
            <Text style={getTextStyle(styles.blockMeaning)}>{block.verse.meaning}</Text>
            {block.verse.reference && /^\d/.test(block.verse.reference) && (
              <Text style={styles.blockRef}>Bhagavad Gita {block.verse.reference}</Text>
            )}
          </View>
        );
      case 'prose':
      case 'teaching':
        return <Text key={i} style={getTextStyle(styles.blockProse)}>{block.text}</Text>;
      default:
        return null;
    }
  };

  const renderPreface = () => (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pageScroll}>
        <Text style={styles.chapterLabel}>Preface</Text>
        <Text style={getTextStyle(styles.chapterTitle)}>Before You Begin</Text>
        <Text style={getTextStyle(styles.chapterSubtitle)}>{gitaPreface.subtitle}</Text>
        {gitaPreface.blocks.map(renderBlock)}
      </ScrollView>
    </View>
  );

  const renderVerse = (chapter: number, verse: GitaFullVerse, verseIndex: number) => {
    const insight = gitaVerseInsights[`${chapter}.${verse.verse}`];
    const key = `${chapter}.${verse.verse}`;
    const isOpen = !!expanded[key];
    // Only the currently-playing chapter's cards react to the shared highlight id
    const active = playingChapter === chapter;
    const sanskrit = tidySanskrit(verse.sanskrit);
    const sanskritBlockId = `section-${verseIndex}-block-0-sanskrit`;
    const englishBlockId = `section-${verseIndex}-block-0-meaning`;
    // Whole-line segments so TextHighlighter can resolve the highlight range
    const verseSegments = [
      { id: sanskritBlockId, blockId: sanskritBlockId, localStart: 0, localEnd: sanskrit.length },
      { id: englishBlockId, blockId: englishBlockId, localStart: 0, localEnd: verse.english.length },
    ] as any;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pageScroll}>
          <View style={styles.verseBadge}>
            <Text style={styles.verseBadgeText}>{chapter}.{verse.verse}</Text>
          </View>
          <TextHighlighter
            text={sanskrit}
            blockId={active ? sanskritBlockId : undefined}
            highlightedSegmentId={active ? highlightedSegmentId : null}
            segments={active ? verseSegments : []}
            style={getTextStyle(styles.sanskritText)}
          />
          <Text style={getTextStyle(styles.transliterationText)}>{verse.transliteration}</Text>
          <TextHighlighter
            text={verse.english}
            blockId={active ? englishBlockId : undefined}
            highlightedSegmentId={active ? highlightedSegmentId : null}
            segments={active ? verseSegments : []}
            style={getTextStyle(styles.englishText)}
          />
          {insight && (
            <View style={styles.insightBlock}>
              <TouchableOpacity style={styles.insightToggle} onPress={() => toggleExpanded(key)}>
                <Text style={styles.insightToggleText}>So what does this mean?</Text>
                <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={DharmaDesignSystem.colors.primary.deepSaffron} />
              </TouchableOpacity>
              {isOpen && <Text style={getTextStyle(styles.insightText)}>{insight}</Text>}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  // Skip the reflection block — landing on the chapter's celebration page,
  // so skipping still completes the chapter on the journey
  const skipReflections = useCallback((chapter: number) => {
    scrollToIndex(celebrationIndex[chapter] ?? pages.length - 1);
  }, [celebrationIndex, pages.length, scrollToIndex]);

  const renderReflection = (chapter: number, questionIndex: number) => (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageScroll}
        keyboardShouldPersistTaps="handled"
      >
        <ChapterReflection
          chapterNumber={chapter}
          chapterTitle={chapterName(chapter)}
          subtitle={gitaChapters.find(c => c.number === chapter)?.subtitle || ''}
          questions={gitaReflections[chapter] || []}
          singleQuestionIndex={questionIndex}
          onQuestionComplete={() => scrollToIndex(activeIndex + 1)}
          onSkipAll={() => skipReflections(chapter)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderCelebration = (chapter: number) => (
    <View style={styles.page}>
      <JourneyCelebration
        completedItemId={`gita:${chapter}`}
        completedTitle={`Chapter ${chapter} · ${chapterName(chapter)}`}
        active={activeIndex === celebrationIndex[chapter]}
        pointsAtStart={pointsAtStartRef.current}
        onNext={next => {
          if (next.id === `gita:${chapter + 1}`) {
            // Next chapter of the same book — turn the page inline
            scrollToIndex(coverIndex[chapter + 1]);
          } else {
            navigateToJourneyItem(navigation, next, true);
          }
        }}
        onExit={() => navigation.goBack()}
        onReadAgain={() => scrollToIndex(coverIndex[chapter])}
      />
    </View>
  );

  const renderItem = ({ item }: { item: Page }) => {
    switch (item.kind) {
      case 'cover': return renderCover(item.chapter);
      case 'preface': return renderPreface();
      case 'verse': return renderVerse(item.chapter, item.verse, item.verseIndex);
      case 'reflection': return renderReflection(item.chapter, item.questionIndex);
      case 'celebration': return renderCelebration(item.chapter);
    }
  };

  // Transport lives inside the content only — covers stay clean
  const showPlaybackBar = activePage.kind === 'verse' || activePage.kind === 'reflection';
  const isCover = activePage.kind === 'cover';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={26} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>{headerInfo.title} · {headerInfo.sub}</Text>
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

      {/* Playback bar */}
      {showPlaybackBar && (
        <View style={styles.playbackBar}>
          <View style={styles.modeToggle}>
            <TouchableOpacity
              style={[styles.modeOption, mode === 'all' && styles.modeOptionActive]}
              onPress={() => changeMode('all')}
            >
              <Text style={[styles.modeText, mode === 'all' && styles.modeTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeOption, mode === 'english' && styles.modeOptionActive]}
              onPress={() => changeMode('english')}
            >
              <Text style={[styles.modeText, mode === 'english' && styles.modeTextActive]}>English</Text>
            </TouchableOpacity>
          </View>

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
                size={24}
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
                size={24}
                color={DharmaDesignSystem.colors.primary.deepSaffron}
                style={!narrationActive && styles.transportDisabled}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => skipPage(1)} style={styles.transportBtn}>
              <Ionicons name="play-skip-forward" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>

          <Text style={styles.totalPct}>{Math.round(totalProgress * 100)}%</Text>
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
            <TouchableOpacity style={styles.menuItem} onPress={() => { setShowMenu(false); setShowChapters(true); }}>
              <Ionicons name="list" size={22} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
              <Text style={styles.menuItemText}>Chapters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={openStoryView}>
              <Ionicons name="book-outline" size={22} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
              <Text style={styles.menuItemText}>Read as a story</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Chapter list */}
      <Modal visible={showChapters} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowChapters(false)}>
        <SafeAreaView style={styles.chaptersContainer}>
          <View style={styles.chaptersHeader}>
            <Text style={styles.chaptersTitle}>Chapters</Text>
            <TouchableOpacity onPress={() => setShowChapters(false)}>
              <Ionicons name="close" size={24} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.chaptersList} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.chapterRow} onPress={() => jumpToChapter(0)}>
              <View style={styles.chapterBadge}><Text style={styles.chapterBadgeText}>ॐ</Text></View>
              <View style={styles.chapterDetails}>
                <Text style={styles.chapterRowTitle}>Before You Begin</Text>
                <Text style={styles.chapterRowSub}>Preface</Text>
              </View>
            </TouchableOpacity>
            {gitaChapters.map(ch => (
              <TouchableOpacity key={ch.number} style={styles.chapterRow} onPress={() => jumpToChapter(ch.number)}>
                <View style={styles.chapterBadge}><Text style={styles.chapterBadgeText}>{ch.number}</Text></View>
                <View style={styles.chapterDetails}>
                  <Text style={styles.chapterRowTitle}>{chapterName(ch.number)}</Text>
                  <Text style={styles.chapterRowSub}>{ch.subtitle}</Text>
                </View>
                <Text style={styles.chapterRowTime}>{readingTimeFor(getVerseCount(ch.number))} min</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

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
  pageScroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  // Cover
  coverImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
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
  coverSubtitle: { ...typography.sizes.bodyLG, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginBottom: spacing.md },
  coverMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.lg },
  coverMeta: { ...typography.sizes.bodySM, color: 'rgba(255,255,255,0.9)' },
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
  // Preface / narrative blocks
  chapterLabel: {
    ...typography.sizes.caption,
    color: colors.primary.deepSaffron,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  chapterTitle: { ...typography.sizes.headingXL, color: colors.neutrals.charcoalBlack, fontWeight: '700', marginBottom: spacing.xs },
  chapterSubtitle: { ...typography.sizes.bodyLG, color: colors.neutrals.softAsh, fontStyle: 'italic', marginBottom: spacing.lg },
  blockHeader: { ...typography.sizes.headingMD, color: colors.neutrals.charcoalBlack, fontWeight: '600', marginTop: spacing.lg, marginBottom: spacing.sm },
  blockProse: { ...typography.sizes.bodyLG, color: colors.neutrals.charcoalBlack, lineHeight: 30, marginBottom: spacing.md },
  blockVerse: { borderLeftWidth: 2, borderLeftColor: colors.primary.deepSaffron, paddingLeft: spacing.md, marginVertical: spacing.md },
  blockSanskrit: { ...typography.sizes.sacredQuote, color: colors.primary.deepSaffron, lineHeight: 30, marginBottom: spacing.xs },
  blockTranslit: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, fontStyle: 'italic', marginBottom: spacing.xs },
  blockMeaning: { ...typography.sizes.bodyMD, color: colors.primary.peacockTeal, fontWeight: '500' },
  blockRef: { ...typography.sizes.caption, color: colors.neutrals.softAsh, marginTop: spacing.xs },
  // Verse
  verseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(230, 81, 0, 0.1)',
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginBottom: spacing.md,
  },
  verseBadgeText: { ...typography.sizes.bodySM, color: colors.primary.deepSaffron, fontWeight: '700' },
  sanskritText: { ...typography.sizes.sacredQuote, color: colors.primary.deepSaffron, lineHeight: 30, marginBottom: spacing.md },
  transliterationText: { ...typography.sizes.bodyMD, color: colors.neutrals.softAsh, fontStyle: 'italic', lineHeight: 24, marginBottom: spacing.md },
  englishText: { ...typography.sizes.bodyLG, color: colors.neutrals.charcoalBlack, lineHeight: 28 },
  insightBlock: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: 'rgba(230, 81, 0, 0.15)', paddingTop: spacing.sm },
  insightToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.xs },
  insightToggleText: { ...typography.sizes.bodyMD, color: colors.primary.deepSaffron, fontWeight: '600' },
  insightText: { ...typography.sizes.bodyLG, color: colors.neutrals.charcoalBlack, lineHeight: 28, marginTop: spacing.sm, fontStyle: 'italic' },
  // Playback bar
  playbackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 81, 0, 0.12)',
    backgroundColor: colors.neutrals.warmIvory,
  },
  modeToggle: { flexDirection: 'row', backgroundColor: 'rgba(230, 81, 0, 0.08)', borderRadius: borderRadius.large, padding: 2 },
  modeOption: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.large },
  modeOptionActive: { backgroundColor: colors.primary.deepSaffron },
  modeText: { ...typography.sizes.caption, color: colors.primary.deepSaffron, fontWeight: '600' },
  modeTextActive: { color: '#FFFFFF' },
  transport: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  transportBtn: { padding: spacing.xs },
  transportDisabled: { opacity: 0.35 },
  playBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.button,
  },
  totalPct: { ...typography.sizes.caption, color: colors.neutrals.softAsh, fontWeight: '600', minWidth: 34, textAlign: 'right' },
  // Menu
  menuBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  menuSheet: {
    marginTop: 100, marginRight: spacing.md,
    backgroundColor: '#FFFFFF', borderRadius: borderRadius.medium,
    paddingVertical: spacing.xs, minWidth: 200,
    ...shadows.lifted,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  menuItemText: { ...typography.sizes.bodyMD, color: colors.neutrals.charcoalBlack },
  // Chapters
  chaptersContainer: { flex: 1, backgroundColor: colors.neutrals.sandstoneBeige },
  chaptersHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: 'rgba(230, 81, 0, 0.15)',
  },
  chaptersTitle: { ...typography.sizes.headingMD, color: colors.neutrals.charcoalBlack, fontWeight: '600' },
  chaptersList: { padding: spacing.md, paddingBottom: spacing.xxl },
  chapterRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.sm },
  chapterBadge: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.neutrals.warmIvory,
    borderWidth: 1, borderColor: 'rgba(230, 81, 0, 0.25)',
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  chapterBadgeText: { ...typography.sizes.bodyMD, color: colors.primary.deepSaffron, fontWeight: '600' },
  chapterDetails: { flex: 1 },
  chapterRowTitle: { ...typography.sizes.bodyMD, color: colors.neutrals.charcoalBlack, fontWeight: '600' },
  chapterRowSub: { ...typography.sizes.bodySM, color: colors.neutrals.softAsh, marginTop: 2 },
  chapterRowTime: { ...typography.sizes.caption, color: colors.neutrals.softAsh, fontWeight: '600' },
});

export default GitaVersePlayerScreen;
