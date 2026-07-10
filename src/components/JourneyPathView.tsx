import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import journeyService from '../services/journeyService';
import { JourneyItem, JourneyModule, JOURNEY_MODULES } from '../data/journeyPath';

// The full guided journey as five module milestone cards — progress ring,
// expandable checklist, cover-art tiles. Used as the onboarding finale
// (inert rows, embedded in onboarding's own ScrollView) and as the
// JourneyPath screen (its own ScrollView, rows navigate).

interface JourneyPathViewProps {
  onItemPress?: (item: JourneyItem) => void;
  scrollable?: boolean;
  // Bump to re-read completion (e.g. on screen focus). The view can't use
  // useFocusEffect itself — onboarding renders it outside any navigator.
  refreshSignal?: number;
}

const MODULE_EMOJI: Record<JourneyModule, string> = {
  1: '🪔',
  2: '📖',
  3: '🕉️',
  4: '🧘',
  5: '🎉',
};

const { colors, typography, spacing, borderRadius } = DharmaDesignSystem;

const RING = 46;
const RING_STROKE = 4;
const R = RING / 2;

// Circular progress from plain Views (no SVG dependency): a pie built from
// two rotating half-disc wedges (each clipped to its half of the circle,
// with the rotation origin moved to the circle center via a translate
// sandwich), then an inner disc turns the pie into a ring.
const ProgressRing: React.FC<{ fraction: number; emoji: string }> = ({ fraction, emoji }) => {
  const pct = Math.max(0, Math.min(1, fraction));
  const color = pct >= 1 ? colors.primary.peacockTeal : colors.primary.deepSaffron;
  const rightDeg = Math.min(pct * 360, 180); // sweeps the right half first
  const leftDeg = Math.max(pct * 360 - 180, 0);
  return (
    <View style={ringStyles.circle}>
      <View style={ringStyles.rightWrap} pointerEvents="none">
        <View
          style={[
            ringStyles.leftHalfDisc,
            {
              backgroundColor: color,
              transform: [{ translateX: R / 2 }, { rotate: `${rightDeg}deg` }, { translateX: -R / 2 }],
            },
          ]}
        />
      </View>
      <View style={ringStyles.leftWrap} pointerEvents="none">
        <View
          style={[
            ringStyles.rightHalfDisc,
            {
              backgroundColor: color,
              transform: [{ translateX: -R / 2 }, { rotate: `${leftDeg}deg` }, { translateX: R / 2 }],
            },
          ]}
        />
      </View>
      <View style={ringStyles.inner}>
        <Text style={ringStyles.emoji}>{emoji}</Text>
      </View>
    </View>
  );
};

const ringStyles = StyleSheet.create({
  circle: {
    width: RING,
    height: RING,
    borderRadius: R,
    backgroundColor: 'rgba(230, 81, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Clips to the right half of the circle
  rightWrap: {
    position: 'absolute',
    left: R,
    top: 0,
    width: R,
    height: RING,
    overflow: 'hidden',
  },
  // A left-half disc parked (invisible) in the clipped-away zone; rotating
  // it about the circle center sweeps a wedge into view
  leftHalfDisc: {
    position: 'absolute',
    left: -R,
    top: 0,
    width: R,
    height: RING,
    borderTopLeftRadius: R,
    borderBottomLeftRadius: R,
  },
  leftWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: R,
    height: RING,
    overflow: 'hidden',
  },
  rightHalfDisc: {
    position: 'absolute',
    left: R,
    top: 0,
    width: R,
    height: RING,
    borderTopRightRadius: R,
    borderBottomRightRadius: R,
  },
  inner: {
    width: RING - RING_STROKE * 2,
    height: RING - RING_STROKE * 2,
    borderRadius: R - RING_STROKE,
    backgroundColor: colors.neutrals.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 17,
  },
});

const coverStyle = { width: '100%', height: '100%' } as const;

const ItemTile: React.FC<{ item: JourneyItem; state: 'done' | 'current' | 'todo' }> = ({
  item,
  state,
}) => {
  const gitaChapter = item.id.startsWith('gita:') ? item.id.split(':')[1] : null;
  const source = typeof item.cover === 'string' ? { uri: item.cover } : item.cover;
  return (
    <View style={[styles.tile, state === 'current' && styles.tileCurrent]}>
      <Image source={source} style={coverStyle} resizeMode="cover" />
      {gitaChapter && (
        <View style={styles.tileScrim}>
          <Text style={styles.tileChapterNum}>{gitaChapter}</Text>
        </View>
      )}
      {state === 'done' && <View style={styles.tileDoneOverlay} />}
      {state === 'done' && (
        <View style={styles.tileDoneBadge}>
          <Ionicons name="checkmark" size={11} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

const JourneyPathView: React.FC<JourneyPathViewProps> = ({
  onItemPress,
  scrollable = true,
  refreshSignal = 0,
}) => {
  const path = useMemo(() => journeyService.getPath(), []);
  const [completion, setCompletion] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Partial<Record<JourneyModule, boolean>>>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const map = await journeyService.getCompletionMap();
    setCompletion(map);
    if (!loaded) {
      // Open the module the walker is currently in (first unfinished item)
      const current = path.find(item => !map[item.id]);
      setExpanded({ [(current ?? path[0]).module]: true });
      setLoaded(true);
    }
  }, [path, loaded]);

  useEffect(() => {
    load();
  }, [load, refreshSignal]);

  const currentId = path.find(item => !completion[item.id])?.id;

  const modules = ([1, 2, 3, 4, 5] as JourneyModule[]).map(module => {
    const items = path.filter(item => item.module === module);
    return { module, items, done: items.filter(item => completion[item.id]).length };
  });

  const body = (
    <View style={styles.container}>
      {/* Why the path is ordered this way — the map before the walking */}
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>How this path is laid</Text>
        <Text style={styles.introLead}>
          Not a syllabus — a walk. Each stage prepares the ground for the next.
        </Text>
        {[
          'Ideas first — dharma, karma, moksha are the grammar; everything else speaks it.',
          'Then one story that uses them all: the Gita, walked chapter by chapter.',
          'With the ideas in hand, the gods stop being a crowd and become faces.',
          'Knowing becomes doing — the practices, matched to your temperament.',
          'And finally the festivals, where it all turns into lamps, food, and family.',
        ].map((line, i) => (
          <View key={i} style={styles.introRow}>
            <Text style={styles.introNum}>{i + 1}</Text>
            <Text style={styles.introLine}>{line}</Text>
          </View>
        ))}
      </View>

      {modules.map(({ module, items, done }) => {
        const isOpen = !!expanded[module];
        return (
          <View key={module} style={styles.card}>
            <TouchableOpacity
              style={styles.cardHead}
              onPress={() => setExpanded(prev => ({ ...prev, [module]: !prev[module] }))}
              activeOpacity={0.7}
            >
              <ProgressRing fraction={items.length ? done / items.length : 0} emoji={MODULE_EMOJI[module]} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardEyebrow}>Stage {module}</Text>
                <Text style={styles.cardName}>{JOURNEY_MODULES[module]}</Text>
                <Text style={styles.cardProgress}>
                  {done} of {items.length}
                  {done === items.length && items.length > 0 ? ' · complete' : ''}
                </Text>
              </View>
              <Ionicons
                name={isOpen ? 'chevron-down' : 'chevron-forward'}
                size={18}
                color={colors.neutrals.softAsh}
              />
            </TouchableOpacity>

            {isOpen && (
              <View style={styles.items}>
                {items.map(item => {
                  const state: 'done' | 'current' | 'todo' = completion[item.id]
                    ? 'done'
                    : item.id === currentId
                      ? 'current'
                      : 'todo';
                  const row = (
                    <>
                      <ItemTile item={item} state={state} />
                      <Text
                        style={[
                          styles.itemTitle,
                          state === 'done' && styles.itemTitleDone,
                          state === 'current' && styles.itemTitleCurrent,
                        ]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                      {state === 'current' && (
                        <View style={styles.nextPill}>
                          <Text style={styles.nextPillText}>Next</Text>
                        </View>
                      )}
                    </>
                  );
                  return onItemPress ? (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.itemRow}
                      onPress={() => onItemPress(item)}
                      activeOpacity={0.7}
                    >
                      {row}
                    </TouchableOpacity>
                  ) : (
                    <View key={item.id} style={styles.itemRow}>
                      {row}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );

  if (!scrollable) return body;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {body}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  introCard: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    padding: spacing.md + 2,
    marginBottom: spacing.sm + 4,
  },
  introTitle: {
    ...typography.sizes.headingSM,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginBottom: 2,
  },
  introLead: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    color: colors.neutrals.softAsh,
    marginBottom: spacing.sm + 2,
  },
  introRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: 7,
  },
  introNum: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(230, 81, 0, 0.1)',
    color: colors.primary.deepSaffron,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 18,
    overflow: 'hidden',
    marginTop: 1,
  },
  introLine: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.neutrals.charcoalBlack,
  },
  card: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    shadowColor: 'rgba(33, 33, 33, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardInfo: {
    flex: 1,
    minWidth: 0,
  },
  cardEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.neutrals.softAsh,
  },
  cardName: {
    ...typography.sizes.headingSM,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
  },
  cardProgress: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutrals.softAsh,
    marginTop: 1,
  },
  items: {
    marginTop: spacing.sm + 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(33, 33, 33, 0.07)',
    paddingTop: spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
  },
  tile: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(33, 33, 33, 0.08)',
  },
  tileCurrent: {
    borderWidth: 2,
    borderColor: colors.primary.deepSaffron,
    shadowColor: colors.primary.deepSaffron,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  tileScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(33, 33, 33, 0.32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileChapterNum: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tileDoneOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250, 243, 224, 0.62)',
  },
  tileDoneBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 16,
    height: 16,
    borderTopLeftRadius: 8,
    backgroundColor: colors.primary.peacockTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.charcoalBlack,
    flex: 1,
    lineHeight: 18,
  },
  itemTitleDone: {
    color: colors.neutrals.softAsh,
  },
  itemTitleCurrent: {
    color: colors.primary.deepSaffron,
    fontWeight: '700',
  },
  nextPill: {
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  nextPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default JourneyPathView;
