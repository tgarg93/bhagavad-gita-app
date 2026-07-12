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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { getPrayerById, lessonCount, lessonOfVerse, PrayerVerse } from '../data/prayers';
import LocalStorageService from '../services/localStorageService';
import journeyService from '../services/journeyService';
import krishnaContext from '../services/krishnaContextService';
import { AudioNarrationService } from '../services/audioNarrationService';
import { navigateToContentRef } from '../data/journeyPath';

const { width } = Dimensions.get('window');

// The prayer learn player — the paged-reader pattern (cover → intro → one
// verse per page → celebration) tuned for recitation rather than reading:
//   · hero text is whichever script the learner is reciting from (the Aa/अ
//     toggle swaps transliteration-first ↔ Devanagari-first)
//   · a mala-bead row shows position in the prayer, beads grouped by lesson
//   · Learn mode: stay on the verse, loop its audio ×1/×3/∞
//   · Listen mode: the whole prayer flows — audio auto-advances the pages
// Audio is the existing TTS pipeline ('sanskrit' segments → Hindi voice,
// silently skipped when no Hindi voice is installed, as everywhere else).

type PrayerPage =
  | { kind: 'cover' }
  | { kind: 'intro'; introIndex: number }
  | { kind: 'verse'; verse: PrayerVerse; verseIndex: number }
  | { kind: 'celebration' };

type PlayerMode = 'learn' | 'listen';
type ScriptEmphasis = 'roman' | 'devanagari';

const LOOP_STEPS = [1, 3, Number.POSITIVE_INFINITY];
const loopLabel = (n: number) => (Number.isFinite(n) ? `×${n}` : '∞');

const PrayerPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { prayerId } = (route.params as { prayerId: string }) || { prayerId: '' };
  const prayer = useMemo(() => getPrayerById(prayerId), [prayerId]);

  const pages = useMemo(() => {
    if (!prayer) return [] as PrayerPage[];
    const p: PrayerPage[] = [{ kind: 'cover' }];
    prayer.intro.forEach((_, introIndex) => p.push({ kind: 'intro', introIndex }));
    prayer.verses.forEach((verse, verseIndex) => p.push({ kind: 'verse', verse, verseIndex }));
    p.push({ kind: 'celebration' }); // appended last — stored positions unaffected
    return p;
  }, [prayer]);
  const verseStartPage = prayer ? 1 + prayer.intro.length : 1;

  const positionKey = `prayer:${prayerId}`;
  const listRef = useRef<FlatList<PrayerPage>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [mode, setMode] = useState<PlayerMode>('learn');
  const [script, setScript] = useState<ScriptEmphasis>('roman');
  const [loopStep, setLoopStep] = useState(0);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [timesRecited, setTimesRecited] = useState(0);

  const audioService = useRef(AudioNarrationService.getInstance()).current;

  // Refs mirror state the stable audio/viewability callbacks need
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const loopRef = useRef(LOOP_STEPS[loopStep]);
  loopRef.current = LOOP_STEPS[loopStep];
  const playingVerseRef = useRef<number | null>(null);
  const pagesRef = useRef(pages);
  pagesRef.current = pages;
  const playSessionRef = useRef(0); // bumped to orphan any in-flight onDone chain
  const autoAdvanceRef = useRef(false); // listen-mode page turns keep the audio alive
  const celebratedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const last = await LocalStorageService.getReaderPosition(positionKey);
      const idx = last > 0 && last < pages.length ? last : 0;
      setInitialIndex(idx);
      setActiveIndex(idx);
      setReady(true);
      const counts = await LocalStorageService.getPrayerRecitations();
      setTimesRecited(counts[prayerId] ?? 0);
    })();
    return () => {
      playSessionRef.current += 1;
      audioService.stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < pagesRef.current.length) {
        listRef.current?.scrollToIndex({ index, animated: true });
      }
    },
    []
  );

  // --- Audio ------------------------------------------------------------
  const stopAudio = useCallback(() => {
    playSessionRef.current += 1;
    playingVerseRef.current = null;
    setPlayingVerse(null);
    audioService.stopSpeaking();
  }, [audioService]);

  const speakVerse = useCallback(
    (verseIndex: number) => {
      const verse = prayer?.verses[verseIndex];
      if (!prayer || !verse) return;
      playSessionRef.current += 1;
      const session = playSessionRef.current;
      playingVerseRef.current = verseIndex;
      setPlayingVerse(verseIndex);
      let loopsDone = 0;
      const playOnce = () => {
        audioService.speakSequence([{ text: verse.devanagari, type: 'sanskrit' }], () => {
          if (session !== playSessionRef.current) return; // stopped or superseded
          if (modeRef.current === 'listen') {
            const next = verseIndex + 1;
            autoAdvanceRef.current = true;
            if (next < prayer.verses.length) {
              scrollToIndex(verseStartPage + next);
              speakVerse(next);
            } else {
              playingVerseRef.current = null;
              setPlayingVerse(null);
              scrollToIndex(pagesRef.current.length - 1);
            }
            return;
          }
          loopsDone += 1;
          if (loopsDone < loopRef.current) {
            playOnce();
          } else {
            playingVerseRef.current = null;
            setPlayingVerse(null);
          }
        });
      };
      playOnce();
    },
    [prayer, audioService, scrollToIndex, verseStartPage]
  );

  // --- Page tracking ------------------------------------------------------
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length === 0 || viewableItems[0].index == null) return;
    const idx = viewableItems[0].index;
    setActiveIndex(idx);
    LocalStorageService.saveReaderPosition(positionKey, idx);
    const page = pagesRef.current[idx];

    // A manual page turn while a different verse is sounding stops the audio;
    // listen-mode auto-advance announces itself and stays alive.
    if (autoAdvanceRef.current) {
      autoAdvanceRef.current = false;
    } else if (
      playingVerseRef.current != null &&
      !(page?.kind === 'verse' && page.verseIndex === playingVerseRef.current)
    ) {
      playSessionRef.current += 1;
      playingVerseRef.current = null;
      setPlayingVerse(null);
      AudioNarrationService.getInstance().stopSpeaking();
    }

    if (page?.kind === 'verse') {
      const p = getPrayerById(prayerId);
      if (p) {
        krishnaContext.setCurrentContent({
          type: 'prayer',
          title: p.title,
          snippet: `${page.verse.label}: "${page.verse.transliteration.replace(/\n/g, ' ')}" — ${page.verse.meaning}`,
        });
      }
    }

    if (page?.kind === 'celebration' && !celebratedRef.current) {
      celebratedRef.current = true;
      const p = getPrayerById(prayerId);
      if (p?.complete) {
        journeyService.markCompleted(`prayer:${p.id}`);
        LocalStorageService.incrementPrayerRecitation(p.id).then(n => {
          if (n > 0) setTimesRecited(n);
        });
      }
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  const askKrishna = () => {
    if (prayer) {
      krishnaContext.setCurrentContent({ type: 'prayer', title: prayer.title });
    }
    (navigation as any).navigate('MainTabs', { screen: 'Ask Krishna' });
  };

  if (!prayer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>This prayer is not available yet.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.fallbackBack}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalVerses = prayer.verses.length;
  const activePage = pages[activeIndex];
  const headerInfo = (() => {
    if (!activePage || activePage.kind === 'cover') return { sub: 'Prayer', progress: 0 };
    if (activePage.kind === 'intro') return { sub: 'About this prayer', progress: 0 };
    if (activePage.kind === 'verse') {
      return {
        sub: `Verse ${activePage.verseIndex + 1} of ${totalVerses}`,
        progress: (activePage.verseIndex + 1) / totalVerses,
      };
    }
    return { sub: 'Complete', progress: 1 };
  })();

  // --- Renderers ----------------------------------------------------------
  const renderCover = () => (
    <View style={styles.page}>
      <Image source={prayer.coverImage} style={coverImageStyle} />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.coverContent}>
        <View style={styles.coverBottom}>
          <Text style={styles.coverLabel}>PRAYER · {prayer.language.toUpperCase()}</Text>
          <Text style={styles.coverTitle}>{prayer.title}</Text>
          <Text style={styles.coverSubtitle}>{prayer.subtitle}</Text>
          <Text style={styles.coverAttribution}>{prayer.attribution}</Text>
          <View style={styles.coverMetaRow}>
            <Ionicons name="musical-notes-outline" size={16} color="rgba(255,255,255,0.9)" />
            <Text style={styles.coverMeta}>
              {totalVerses} verse{totalVerses === 1 ? '' : 's'} · {lessonCount(prayer)} lesson
              {lessonCount(prayer) === 1 ? '' : 's'}
            </Text>
          </View>
          {!prayer.complete && (
            <View style={styles.coverBadge}>
              <Text style={styles.coverBadgeText}>First lessons — more verses coming</Text>
            </View>
          )}
          <TouchableOpacity style={styles.coverBegin} onPress={() => scrollToIndex(1)}>
            <Text style={styles.coverBeginText}>Begin</Text>
            <Ionicons name="arrow-forward" size={18} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  const renderIntro = (introIndex: number) => {
    const intro = prayer.intro[introIndex];
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.introScroll}>
          <Text style={styles.introTitle}>{intro.title}</Text>
          <Text style={styles.introText}>{intro.text}</Text>
          {introIndex === prayer.intro.length - 1 && (
            <Text style={styles.introWhen}>{prayer.whenToRecite}</Text>
          )}
        </ScrollView>
      </View>
    );
  };

  const renderBeads = (current: number) => (
    <View style={styles.beadRow}>
      {prayer.verses.map((v, i) => (
        <View
          key={v.id}
          style={[
            styles.bead,
            i > 0 && lessonOfVerse(prayer, i) !== lessonOfVerse(prayer, i - 1) && styles.beadLessonGap,
            i < current && styles.beadDone,
            i === current && styles.beadCurrent,
          ]}
        />
      ))}
    </View>
  );

  const renderVerse = (verse: PrayerVerse, verseIndex: number) => {
    const hero = script === 'roman' ? verse.transliteration : verse.devanagari;
    const secondary = script === 'roman' ? verse.devanagari : verse.transliteration;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.verseScroll}>
          <Text style={styles.verseLabel}>
            {verse.label.toUpperCase()} · LESSON {lessonOfVerse(prayer, verseIndex) + 1}
          </Text>
          <Text style={script === 'roman' ? styles.heroRoman : styles.heroDevanagari}>{hero}</Text>
          <Text style={script === 'roman' ? styles.secondaryDevanagari : styles.secondaryRoman}>
            {secondary}
          </Text>
          <View style={styles.meaningDivider} />
          <Text style={styles.verseMeaning}>{verse.meaning}</Text>
          {renderBeads(verseIndex)}
        </ScrollView>
      </View>
    );
  };

  const deityName = prayer.deityRef
    ? prayer.deityRef.split(':')[1].charAt(0).toUpperCase() + prayer.deityRef.split(':')[1].slice(1)
    : null;

  const renderCelebration = () => (
    <View style={styles.page}>
      <View style={styles.celebration}>
        <Text style={styles.celebrationEmoji}>🙏</Text>
        <Text style={styles.celebrationTitle}>
          {prayer.complete ? `You recited the ${prayer.title}` : 'Opening lessons complete'}
        </Text>
        <Text style={styles.celebrationSub}>
          {prayer.complete
            ? timesRecited > 1
              ? `Recited ${timesRecited} times. The words are becoming yours.`
              : 'The words are becoming yours.'
            : 'Keep these verses fresh — the rest of the prayer is on its way.'}
        </Text>
        <TouchableOpacity style={styles.celebrationPrimary} onPress={() => scrollToIndex(verseStartPage)}>
          <Ionicons name="repeat" size={18} color="#FFFFFF" />
          <Text style={styles.celebrationPrimaryText}>Recite again</Text>
        </TouchableOpacity>
        {prayer.deityRef && (
          <TouchableOpacity
            style={styles.celebrationSecondary}
            onPress={() => navigateToContentRef(navigation, prayer.deityRef!)}
          >
            <Text style={styles.celebrationSecondaryText}>Read about {deityName}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.celebrationSecondary} onPress={() => navigation.goBack()}>
          <Text style={styles.celebrationSecondaryText}>Done for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: PrayerPage }) => {
    switch (item.kind) {
      case 'cover':
        return renderCover();
      case 'intro':
        return renderIntro(item.introIndex);
      case 'verse':
        return renderVerse(item.verse, item.verseIndex);
      case 'celebration':
        return renderCelebration();
    }
  };

  const onVersePage = activePage?.kind === 'verse';
  const currentVerseIndex = activePage?.kind === 'verse' ? activePage.verseIndex : -1;
  const isPlayingHere = playingVerse != null && playingVerse === currentVerseIndex;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={26} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel} numberOfLines={1}>
            {prayer.title} · {headerInfo.sub}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.round(headerInfo.progress * 100)}%` }]} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setScript(s => (s === 'roman' ? 'devanagari' : 'roman'))}
          style={styles.headerBtn}
        >
          <Text style={styles.scriptToggle}>{script === 'roman' ? 'अ' : 'Aa'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={askKrishna} style={styles.headerBtn}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color={DharmaDesignSystem.colors.primary.deepSaffron}
          />
        </TouchableOpacity>
      </View>

      {ready && (
        <FlatList
          ref={listRef}
          data={pages}
          extraData={[activeIndex, script, playingVerse]}
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

      {/* Recitation bar — only on verse pages */}
      {onVersePage && (
        <View style={styles.playbackBar}>
          <TouchableOpacity
            onPress={() => setLoopStep(s => (s + 1) % LOOP_STEPS.length)}
            style={[styles.pillBtn, mode === 'listen' && styles.pillBtnDisabled]}
            disabled={mode === 'listen'}
          >
            <Ionicons name="repeat" size={16} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            <Text style={styles.pillBtnText}>{loopLabel(LOOP_STEPS[loopStep])}</Text>
          </TouchableOpacity>
          <View style={styles.transport}>
            <TouchableOpacity onPress={() => scrollToIndex(activeIndex - 1)} style={styles.transportBtn}>
              <Ionicons name="play-skip-back" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (isPlayingHere ? stopAudio() : speakVerse(currentVerseIndex))}
              style={styles.playBtn}
            >
              <Ionicons
                name={isPlayingHere ? 'stop' : 'play'}
                size={26}
                color="#FFFFFF"
                style={isPlayingHere ? undefined : { marginLeft: 3 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToIndex(activeIndex + 1)} style={styles.transportBtn}>
              <Ionicons name="play-skip-forward" size={22} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              stopAudio();
              setMode(m => (m === 'learn' ? 'listen' : 'learn'));
            }}
            style={styles.pillBtn}
          >
            <Ionicons
              name={mode === 'learn' ? 'school-outline' : 'headset-outline'}
              size={16}
              color={DharmaDesignSystem.colors.primary.deepSaffron}
            />
            <Text style={styles.pillBtnText}>{mode === 'learn' ? 'Learn' : 'Listen'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const { colors, spacing, borderRadius, shadows } = DharmaDesignSystem;

// Typed separately: inside StyleSheet.create the style resolves to a union
// that Image's style prop rejects
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
  headerLabel: { fontSize: 14, lineHeight: 19, color: colors.neutrals.charcoalBlack, fontWeight: '600' },
  progressBar: { height: 5, borderRadius: 3, backgroundColor: colors.neutrals.gentleMist, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: colors.primary.deepSaffron },
  scriptToggle: { fontSize: 18, lineHeight: 24, fontWeight: '700', color: colors.primary.deepSaffron },
  // Pages
  page: { width, flex: 1 },
  // Cover
  coverContent: { flex: 1, justifyContent: 'flex-end' },
  coverBottom: { padding: spacing.lg, paddingBottom: spacing.xl },
  coverLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  coverTitle: { fontSize: 32, lineHeight: 40, color: '#FFFFFF', fontWeight: '700', marginBottom: spacing.xs },
  coverSubtitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  coverAttribution: { fontSize: 13, lineHeight: 18, color: 'rgba(255,255,255,0.75)', marginBottom: spacing.md },
  coverMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.md },
  coverMeta: { fontSize: 14, lineHeight: 19, fontWeight: '400', color: 'rgba(255,255,255,0.9)' },
  coverBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginBottom: spacing.md,
  },
  coverBadgeText: { fontSize: 12, lineHeight: 16, color: '#FFFFFF', fontWeight: '600' },
  coverBegin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.md,
  },
  coverBeginText: { fontSize: 16, lineHeight: 21, color: colors.primary.deepSaffron, fontWeight: '700' },
  // Intro
  introScroll: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  introTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.md,
  },
  introText: { fontSize: 16, lineHeight: 26, color: colors.neutrals.charcoalBlack },
  introWhen: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 81, 0, 0.12)',
  },
  // Verse page — recitation-first hierarchy
  verseScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  verseLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.primary.deepSaffron,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  heroRoman: {
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  heroDevanagari: {
    fontSize: 26,
    lineHeight: 42,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  secondaryRoman: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  secondaryDevanagari: {
    fontSize: 17,
    lineHeight: 28,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
  },
  meaningDivider: {
    alignSelf: 'center',
    width: 44,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(230, 81, 0, 0.35)',
    marginVertical: spacing.lg,
  },
  verseMeaning: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
  },
  // Mala beads
  beadRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: 6,
  },
  bead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(230, 81, 0, 0.4)',
    backgroundColor: 'transparent',
  },
  beadLessonGap: { marginLeft: 10 },
  beadDone: { backgroundColor: 'rgba(230, 81, 0, 0.35)', borderColor: 'transparent' },
  beadCurrent: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.deepSaffron,
    borderColor: 'transparent',
  },
  // Celebration
  celebration: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  celebrationEmoji: { fontSize: 56, lineHeight: 68, marginBottom: spacing.md },
  celebrationTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  celebrationSub: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  celebrationPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    ...shadows.button,
  },
  celebrationPrimaryText: { fontSize: 16, lineHeight: 21, color: '#FFFFFF', fontWeight: '700' },
  celebrationSecondary: { paddingVertical: spacing.sm },
  celebrationSecondaryText: { fontSize: 15, lineHeight: 20, color: colors.primary.deepSaffron, fontWeight: '600' },
  // Recitation bar
  playbackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 81, 0, 0.12)',
    backgroundColor: colors.neutrals.warmIvory,
  },
  transport: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  transportBtn: { padding: spacing.xs },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.35)',
    borderRadius: borderRadius.large,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    minWidth: 64,
    justifyContent: 'center',
  },
  pillBtnDisabled: { opacity: 0.4 },
  pillBtnText: { fontSize: 13, lineHeight: 17, fontWeight: '700', color: colors.primary.deepSaffron },
  // Fallback
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  fallbackText: { fontSize: 17, lineHeight: 24, fontWeight: '400', color: colors.neutrals.charcoalBlack },
  fallbackBack: { fontSize: 15, lineHeight: 20, color: colors.primary.deepSaffron, fontWeight: '600' },
});

export default PrayerPlayerScreen;
