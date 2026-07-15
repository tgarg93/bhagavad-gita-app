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
import FoundationCard from '../components/FoundationCard';
import CheckPage from '../components/CheckPage';
import CapstonePage from '../components/CapstonePage';
import journeyService from '../services/journeyService';
import { foundationsService } from '../services/foundationsService';
import { navigateToJourneyItem, navigateToContentRef } from '../data/journeyPath';
import { prerecordedClipsFor } from '../data/foundationsAudioManifest';
import { McqCheck, RecallCheck } from '../data/checkTypes';

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

// The paged "book" experience for concepts, deities, festivals and Foundations
// acts — same pattern as GitaVersePlayerScreen: cover → one section per page →
// reflection → sources, swiped horizontally with narration and resume position.
//
// Foundations adds two page kinds. A section can carry `checks`, which are
// spliced in as their own pages immediately after it — that is the interleaving
// mechanism, and it works for any content type that adopts checks later.
type ReaderPage =
  | { kind: 'cover' }
  | { kind: 'section'; section: NarrativeSection; sectionIndex: number }
  | { kind: 'check'; check: McqCheck | RecallCheck }
  | { kind: 'reflection'; questionIndex: number } // one page per question
  | { kind: 'capstone' }
  | { kind: 'celebration' };

const ContentReaderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contentType, contentId, sectionId } = (route.params as {
    contentType: ReaderContentType;
    contentId: string;
    sectionId?: string; // deep link: open ON this section, not the cover
  }) || { contentType: 'concept', contentId: '' };

  const content = useMemo(() => getReaderContent(contentType, contentId), [contentType, contentId]);

  // On the capstone act, the celebration page does not exist until the capstone
  // is resolved (passed, or explicitly deferred). Nothing is blocked or locked —
  // there is simply nothing to the right yet.
  const [capstoneResolved, setCapstoneResolved] = useState(false);

  const pages = useMemo(() => {
    if (!content) return [] as ReaderPage[];
    const pages: ReaderPage[] = [{ kind: 'cover' }];
    content.sections.forEach((section, sectionIndex) => {
      pages.push({ kind: 'section', section, sectionIndex });
      // Checks fire immediately after the section that set them up. A 'reflect'
      // check emits the EXISTING reflection page kind, so ChapterReflection and
      // ReflectionEntry keep working untouched — one code path, one persistence
      // path, and the reflection still scores via the reflections × 15 term.
      for (const check of section.checks ?? []) {
        if (check.kind === 'reflect') {
          pages.push({ kind: 'reflection', questionIndex: check.questionIndex });
        } else {
          pages.push({ kind: 'check', check });
        }
      }
    });
    // Content with no inline reflect-checks keeps the classic end-of-book
    // reflection block, so every existing concept/deity/festival is unchanged.
    const hasInlineReflect = content.sections.some(s =>
      s.checks?.some(c => c.kind === 'reflect')
    );
    if (!hasInlineReflect) {
      content.reflectionQuestions.forEach((_, questionIndex) =>
        pages.push({ kind: 'reflection', questionIndex })
      );
    }
    if (content.capstone) pages.push({ kind: 'capstone' });
    if (!content.capstone || capstoneResolved) pages.push({ kind: 'celebration' });
    return pages;
  }, [content, capstoneResolved]);

  // Section index → page index. Narration segments are named `section-N-block-M`,
  // so anything that maps a segment back to a page has to go through this. It used
  // to be hardcoded as `1 + sectionIndex`, which was true only while cover+sections
  // were the sole page kinds — the moment a check page is spliced in, that
  // arithmetic scrolls the reader to the wrong page.
  const pageIndexForSection = useMemo(() => {
    const map: number[] = [];
    pages.forEach((p, i) => {
      if (p.kind === 'section') map[p.sectionIndex] = i;
    });
    return map;
  }, [pages]);

  const positionKey = `${contentType}:${contentId}`;

  // A citation that names a section must land ON it. This has to outrank the
  // saved reading position below — otherwise following a source link drops you
  // wherever you happened to stop reading this item last time, which is exactly
  // the arbitrariness the Daily Chai citation link exists to fix.
  const deepLinkIndex = useMemo(() => {
    if (!sectionId || !content) return null;
    const sectionIndex = content.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex < 0) return null;
    const page = pageIndexForSection[sectionIndex];
    return page != null ? page : null;
  }, [sectionId, content, pageIndexForSection]);

  // Read inside the mount effect below, which is keyed on positionKey rather
  // than on this — assigned during render, so it is current by the time the
  // effect runs. Same idiom as pageIndexForSectionRef further down.
  const deepLinkIndexRef = useRef(deepLinkIndex);
  deepLinkIndexRef.current = deepLinkIndex;

  const listRef = useRef<FlatList<ReaderPage>>(null);
  // Per-section vertical scroll views, so read-along can scroll the active page to
  // keep the narrated block in view (see FoundationCard's onActiveBlockLayout).
  const pageScrollRefs = useRef<Record<number, ScrollView | null>>({});
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

  // Pre-recorded ElevenLabs narration for this content, if any (Foundations
  // acts), keyed by section index. When present, ▶ plays one bundled clip per
  // section and the sentence highlight follows from playback position.
  const prerecordedClips = useMemo(
    () => (content ? prerecordedClipsFor(contentType, contentId, content.sections.map(s => s.id)) : null),
    [content, contentType, contentId]
  );
  // Per-sentence narration segments for a Foundations act (takeaway then story),
  // shared by the highlight (FoundationCard) and the pre-recorded controller.
  const foundationsSegments = useMemo(
    () =>
      content && contentType === 'foundations'
        ? audioService.buildFoundationsSegments(content.sections)
        : [],
    [content, contentType, audioService]
  );
  // The segment list the transport reasons over — the same one the service is
  // playing, so section indices line up for skip and seek.
  const activeSegments: { id: string }[] = prerecordedClips ? foundationsSegments : audioSegments;

  // A section finishes when its LAST segment ends. Walk the segments in order and
  // keep the last id seen per section, so onSegmentEnd can tell a section-ending
  // segment from a mid-section one.
  const lastSegmentIdOfSection = useMemo(() => {
    const map = new Map<number, string>();
    activeSegments.forEach(s => {
      const m = s.id.match(/section-(\d+)/);
      if (m) map.set(parseInt(m[1]), s.id);
    });
    return map;
  }, [activeSegments]);

  // Sections whose page is immediately followed by a check page. Narration reads
  // by segment and checks aren't segments, so without this the voice would roll
  // straight from one section into the next, scrolling past the check. Scoped to
  // `check` — inline reflect pages stay on the old skip-through behavior.
  const sectionsWithTrailingCheck = useMemo(() => {
    const set = new Set<number>();
    pageIndexForSection.forEach((pageIdx, sectionIdx) => {
      if (pages[pageIdx + 1]?.kind === 'check') set.add(sectionIdx);
    });
    return set;
  }, [pages, pageIndexForSection]);

  // Resume last spot on mount; snapshot progression points so the celebration
  // can show how far this reading moved you
  const pointsAtStartRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const [last, completion] = await Promise.all([
        LocalStorageService.getReaderPosition(positionKey),
        journeyService.getCompletionMap(),
      ]);

      // Finished means finished: opening it again is RE-READING, so start at the
      // cover. An unfinished item still resumes exactly where it was left.
      //
      // The clamp matters independently — devices already hold positions pointing
      // at a celebration page, written before the save was guarded above. Refusing
      // to restore past the last content page heals those on the next open, rather
      // than only fixing it for new readers.
      let lastContentPage = 0;
      for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i].kind !== 'celebration') { lastContentPage = i; break; }
      }
      // A deep link outranks both: you asked for this section, not for wherever
      // you left off.
      const idx =
        deepLinkIndexRef.current != null
          ? deepLinkIndexRef.current
          : completion[positionKey]
          ? 0
          : Math.min(Math.max(last, 0), lastContentPage);

      setInitialIndex(idx);
      setActiveIndex(idx);
      setReady(true);
      const { getProgression } = require('../services/progressionService');
      pointsAtStartRef.current = (await getProgression()).points;
    })();
    return () => { audioService.cleanup(); };
    // positionKey: navigateToJourneyItem uses navigate (not push), so a
    // reader → reader hop can swap params without remounting. Without this dep
    // the resume logic would keep the previous item's position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionKey]);



  const pagesRef = useRef(pages);
  pagesRef.current = pages;

  // onSegmentStart is captured in a narration callback closure, so it reads the
  // map through a ref rather than a stale binding.
  const pageIndexForSectionRef = useRef(pageIndexForSection);
  pageIndexForSectionRef.current = pageIndexForSection;

  // onSegmentEnd is captured in the same narration callback closure and needs the
  // live check-detection maps, so it reads them through refs too.
  const lastSegmentIdOfSectionRef = useRef(lastSegmentIdOfSection);
  lastSegmentIdOfSectionRef.current = lastSegmentIdOfSection;
  const sectionsWithTrailingCheckRef = useRef(sectionsWithTrailingCheck);
  sectionsWithTrailingCheckRef.current = sectionsWithTrailingCheck;

  // The section the voice is currently reading (set in onSegmentStart). Lets a
  // user swipe seek the audio while a snap-back to the same page is a no-op.
  const audioSectionRef = useRef<number | null>(null);
  // Set by onScrollBeginDrag so onMomentumScrollEnd can tell a real swipe from
  // the audio's own programmatic scrollToIndex (which never drags).
  const userSwipeRef = useRef(false);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      const idx = viewableItems[0].index;
      setActiveIndex(idx);
      const page = pagesRef.current[idx];
      // The celebration is NOT a reading position. Saving it meant the next open
      // restored you onto "COMPLETED" with the whole reading behind you and no
      // way back into it — the content was genuinely unreachable.
      if (page?.kind !== 'celebration') {
        LocalStorageService.saveReaderPosition(positionKey, idx);
      }
      if (page?.kind === 'section' && content) {
        // Keep the Krishna context aware of what's on screen
        krishnaContext.setCurrentContent({
          type: contentType,
          title: content.title,
          snippet: `${page.section.title}. ${page.section.storyText ?? ''}`,
        });
        // A Foundations card is banked simply by being read. This is the point
        // tick the reader feels on every page — and it is idempotent, so a
        // second pass over the same card awards nothing.
        if (page.section.takeaway) {
          foundationsService.bankCard(page.section.id);
        }
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
    const callbacks: NarrationCallbacks = {
      onSegmentStart: (segmentId) => {
        setHighlightedSegmentId(segmentId);
        const m = segmentId.match(/section-(\d+)/);
        if (m) {
          audioSectionRef.current = parseInt(m[1]);
          const target = pageIndexForSectionRef.current[parseInt(m[1])];
          if (target != null) listRef.current?.scrollToIndex({ index: target, animated: true });
        }
      },
      onSegmentEnd: (segmentId) => {
        // A section that ends into a check page: park the voice ON the check
        // instead of rolling into the next section. The service has already
        // incremented past this segment, so currentIndex now sits on the next
        // section's first segment — exactly where a resume should pick up.
        const m = segmentId.match(/section-(\d+)/);
        if (!m) return;
        const i = parseInt(m[1]);
        if (lastSegmentIdOfSectionRef.current.get(i) !== segmentId) return;
        if (!sectionsWithTrailingCheckRef.current.has(i)) return;
        const checkPage = pageIndexForSectionRef.current[i] + 1;
        audioService.pauseNarration();
        setIsPlaying(false);
        setIsPaused(true);
        setHighlightedSegmentId(null);
        listRef.current?.scrollToIndex({ index: checkPage, animated: true });
      },
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
    if (prerecordedClips) {
      await audioService.startPrerecorded(
        foundationsSegments,
        prerecordedClips,
        callbacks,
        Math.max(0, fromSectionIndex)
      );
    } else {
      const startFromIndex = Math.max(
        0,
        audioSegments.findIndex(s => s.id.startsWith(`section-${fromSectionIndex}-`))
      );
      await audioService.startNarration(narrationContent, callbacks, startFromIndex);
    }
  }, [audioSegments, narrationContent, audioService, prerecordedClips, foundationsSegments]);

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
    (sectionIdx: number) => activeSegments.findIndex(s => s.id.startsWith(`section-${sectionIdx}-`)),
    [activeSegments]
  );

  // Move the voice to whatever page the reader landed on — shared by the
  // transport buttons (skipPage) and a manual swipe. No-op when not narrating.
  const syncAudioToPage = useCallback(async (idx: number) => {
    const page = pages[idx];
    if (!page || !narrationActive) return;
    if (page.kind === 'section') {
      // Already reading this section (e.g. a half-swipe that snapped back) —
      // don't restart the clip.
      if (page.sectionIndex === audioSectionRef.current && !isPaused) return;
      const segIdx = firstSegmentOfSection(page.sectionIndex);
      if (segIdx >= 0) setHighlightedSegmentId(activeSegments[segIdx].id); // covers the paused case
      if (prerecordedClips) {
        await audioService.seekToSection(page.sectionIndex);
      } else if (segIdx >= 0) {
        await audioService.seekToSegment(segIdx);
      }
      // seekToSegment only auto-plays when it was already playing, so when we
      // were parked (paused) on a check page, kick the voice back on.
      if (isPaused) await audioService.resumeNarration();
      audioSectionRef.current = page.sectionIndex;
      setIsPlaying(true);
      setIsPaused(false);
    } else if (page.kind === 'check') {
      // Land on the check without leaving narration — pause the voice and stay,
      // whether we arrived here by auto-advance, a button, or a manual swipe.
      await audioService.pauseNarration();
      setIsPlaying(false);
      setIsPaused(true);
      setHighlightedSegmentId(null);
    } else {
      // Cover/reflection/sources — leaving the reading ends the narration
      await audioService.stopNarration();
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightedSegmentId(null);
    }
  }, [pages, narrationActive, isPaused, firstSegmentOfSection, activeSegments, prerecordedClips, audioService]);

  // Page skip: when narrating, move the voice with the page; when idle, just turn it
  const skipPage = useCallback(async (direction: 1 | -1) => {
    const target = activeIndex + direction;
    if (target < 0 || target >= pages.length) return;
    await syncAudioToPage(target);
    scrollToIndex(target);
  }, [activeIndex, pages.length, syncAudioToPage, scrollToIndex]);

  // Podcast-style ±10 seconds
  const seekBySeconds = useCallback(async (deltaSeconds: number) => {
    if (!narrationActive) return;
    // Pre-recorded clips seek by real position within the current section clip.
    if (prerecordedClips) {
      await audioService.prerecSeekRelative(deltaSeconds * 1000);
      return;
    }
    const total = audioService.getEstimatedTotalDuration();
    if (total <= 0) return;
    const targetMs = Math.max(0, Math.min(audioService.getElapsedDuration() + deltaSeconds * 1000, total - 1));
    await audioService.seekToProgress(targetMs / total);
    const seg = activeSegments[audioService.getCurrentState().currentSegmentIndex];
    if (seg) {
      setHighlightedSegmentId(seg.id);
      const m = seg.id.match(/section-(\d+)/);
      if (m) {
        const target = pageIndexForSection[parseInt(m[1])];
        if (target != null) scrollToIndex(target);
      }
    }
  }, [narrationActive, prerecordedClips, audioService, activeSegments, scrollToIndex, pageIndexForSection]);

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
    if (!content?.detailRoute) return;
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
  // Progress is over PAGES, not sections. The old section-based fraction hit
  // 100% at the last section — before the reflections — and would read wrong
  // now that checks and a capstone can sit between the sections and the end.
  const progress = pages.length > 1 ? activeIndex / (pages.length - 1) : 0;
  const headerInfo = (() => {
    if (!activePage || activePage.kind === 'cover') return { sub: content.readerLabel, progress: 0 };
    if (activePage.kind === 'section') {
      // In Foundations a section IS a card, and "Part" is already taken there —
      // the cover reads "Foundations · Part 3 of 8", meaning the part of the
      // track. Calling these cards keeps the two counters from colliding.
      const unit = activePage.section.takeaway ? 'Card' : 'Part';
      return { sub: `${unit} ${activePage.sectionIndex + 1} of ${partCount}`, progress };
    }
    if (activePage.kind === 'check') return { sub: 'Check yourself', progress };
    if (activePage.kind === 'capstone') return { sub: 'The capstone', progress };
    if (activePage.kind === 'reflection') {
      return {
        sub: `Reflection ${activePage.questionIndex + 1} of ${content.reflectionQuestions.length}`,
        progress,
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
          {/* A Foundations act opens on its thesis — what this act is FOR —
              rather than a bare subtitle. */}
          {content.kicker ? (
            <Text style={styles.coverKicker}>{content.kicker}</Text>
          ) : (
            <Text style={styles.coverSubtitle}>{content.subtitle}</Text>
          )}
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
      <ScrollView
        ref={r => { pageScrollRefs.current[sectionIndex] = r; }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageScroll}
      >
        {/* A section carrying a takeaway is a bite-sized card; everything else
            is prose and renders exactly as it always has. */}
        {section.takeaway ? (
          <FoundationCard
            section={section}
            getTextStyle={getTextStyle}
            onGoDeeper={ref => navigateToContentRef(navigation, ref)}
            highlightedSegmentId={highlightedSegmentId}
            segments={foundationsSegments}
            sectionIndex={sectionIndex}
            onActiveBlockLayout={y => {
              // Only the audio drives this (fires on segment change), so it won't
              // fight a manual scroll. Keep the narrated block just below the top.
              if (narrationActive) {
                pageScrollRefs.current[sectionIndex]?.scrollTo({ y: Math.max(0, y - 24), animated: true });
              }
            }}
          />
        ) : (
          <NarrativeSections
            sections={[section]}
            sectionIndexOffset={sectionIndex}
            highlightedSegmentId={highlightedSegmentId}
            audioSegments={audioSegments}
            getTextStyle={getTextStyle}
          />
        )}
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

  const renderCheck = (check: McqCheck | RecallCheck) => (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageScroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* A wrong answer still advances — the check teaches, it does not gate.
            Continue turns to the next page (and resumes narration if the voice
            was paused on this check), so the reader never has to guess to swipe. */}
        <CheckPage
          check={check}
          getTextStyle={getTextStyle}
          onResolved={() => {}}
          onContinue={() => skipPage(1)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderCapstone = () => {
    if (!content.capstone) return <View style={styles.page} />;
    // Passing reveals the celebration page (which then fires the level-up
    // ceremony); deferring completes the item without granting the rite.
    const resolve = () => {
      setCapstoneResolved(true);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 350);
    };
    return (
      <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageScroll}
          keyboardShouldPersistTaps="handled"
        >
          <CapstonePage
            capstone={content.capstone}
            getTextStyle={getTextStyle}
            onPassed={resolve}
            onDefer={resolve}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

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

  // Scrollable: a Foundations act's celebration carries the banked-takeaway list
  // and the handoff line on top of the ceremony, which overflows a fixed page.
  // flexGrow keeps the short (non-Foundations) case vertically centered as before.
  const renderCelebration = () => (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.celebrationScroll}
      showsVerticalScrollIndicator={false}
    >
      <JourneyCelebration
        completedItemId={positionKey}
        completedTitle={content.title}
        active={pages[activeIndex]?.kind === 'celebration'}
        pointsAtStart={pointsAtStartRef.current}
        // Foundations only: replay what this act banked, then hand off into the
        // question the next act answers. Inert for every other content type.
        bankedTakeaways={content.bankedTakeaways}
        handoff={content.handoff}
        // On a stage capstone: the objective, now in the past tense. It was a
        // promise on the stage card; here it is a thing they did.
        objective={content.objective}
        onNext={next => navigateToJourneyItem(navigation, next, true)}
        onExit={() => navigation.goBack()}
        // The celebration is a page in this very pager — going back to the
        // reading is a scroll, not a navigation.
        onReadAgain={() => scrollToIndex(0)}
      />
    </ScrollView>
  );

  const renderItem = ({ item }: { item: ReaderPage }) => {
    switch (item.kind) {
      case 'cover': return renderCover();
      case 'section': return renderSection(item.section, item.sectionIndex);
      case 'check': return renderCheck(item.check);
      case 'reflection': return renderReflection(item.questionIndex);
      case 'capstone': return renderCapstone();
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
          onScrollBeginDrag={() => { userSwipeRef.current = true; }}
          onMomentumScrollEnd={(e) => {
            // Only a real finger-drag moves the voice; the audio's own
            // scrollToIndex never sets userSwipeRef, so it no-ops here.
            if (!userSwipeRef.current) return;
            userSwipeRef.current = false;
            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
            syncAudioToPage(idx);
          }}
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
            {content.detailRoute && (
              <TouchableOpacity style={styles.menuItem} onPress={openDetails}>
                <Ionicons name="information-circle-outline" size={22} color={DharmaDesignSystem.colors.neutrals.charcoalBlack} />
                <Text style={styles.menuItemText}>Details & practices</Text>
              </TouchableOpacity>
            )}
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
  // flexGrow (not flex) so a short celebration still centers, while a long one
  // — a Foundations act, with its banked takeaways and handoff — can scroll.
  celebrationScroll: { flexGrow: 1, justifyContent: 'center', paddingVertical: spacing.lg },
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
  // A Foundations act's thesis line. Explicit sizes — spreading typography.sizes.*
  // into a Text style is the tsc trap called out in CLAUDE.md.
  coverKicker: { fontSize: 18, lineHeight: 26, fontWeight: '500', color: '#FFFFFF', fontStyle: 'italic', marginBottom: spacing.md },
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
