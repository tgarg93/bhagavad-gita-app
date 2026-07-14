import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import journeyService from '../services/journeyService';
import { getProgression } from '../services/progressionService';
import { ALL_MODULES, JourneyItem, JourneyModule, JOURNEY_MODULES, MODULE_OBJECTIVES } from '../data/journeyPath';

// The guided journey as one continuous rail: spiritual-title milestones and
// accordion stage cards hang on a single vertical line — teal where the
// walker has been, saffron ahead. One central tracker only (the host screen's
// "n of m steps"); position is carried by the rail itself. Used by the
// onboarding finale (inert rows) and the JourneyPath screen (rows navigate).

interface JourneyPathViewProps {
  onItemPress?: (item: JourneyItem) => void;
  scrollable?: boolean;
  // Bump to re-read completion (e.g. on screen focus). The view can't use
  // useFocusEffect itself — onboarding renders it outside any navigator.
  refreshSignal?: number;
  // Onboarding hand-off: the Jigyasu identity card just morphed into this
  // view, so the first milestone lands with a settle-in pulse and the rest
  // of the rail fades in beneath it.
  entrance?: boolean;
}

const MODULE_EMOJI: Record<JourneyModule, string> = {
  0: '🌱',
  1: '🪔',
  2: '🕉️',
  3: '📖',
  4: '🏹',
  5: '🎉',
};

// Why each stage sits where it does — the rationale lives on the card itself
const MODULE_WHY: Record<JourneyModule, string> = {
  0: 'Start here. In one sitting, enough to explain Hinduism to a friend.',
  1: 'The eight ideas everything else speaks in — this time, read whole.',
  2: 'With the ideas in hand, the gods become faces, not a crowd.',
  3: 'One text that uses every idea. Seven hundred verses, and worth all of them.',
  4: 'The stories a Hindu child grows up inside.',
  5: 'Knowing becomes doing — a path, a puja, and a year of festivals.',
};

// Spiritual titles as rail milestones. Jigyasu sits above Foundations, which is
// the stage that actually earns you the next name: the capstone at the end of
// Module 0 confers Shishya.
//
// INVARIANT: every module in ALL_MODULES must have a milestone here, or the
// rail lookup below returns undefined. Adding Module 0 without adding a sixth
// milestone is exactly how this crashed once.
const MILESTONES: { beforeModule: JourneyModule | null; level: number; label: string; sub: string }[] = [
  { beforeModule: 0, level: 1, label: 'Jigyasu — The Curious', sub: 'Every walker starts here.' },
  { beforeModule: 1, level: 2, label: 'Shishya — The Student', sub: 'The foundations are yours; the story begins.' },
  { beforeModule: 2, level: 3, label: 'Sadhaka — The Practitioner', sub: 'The ideas are yours. Knowledge is becoming practice.' },
  { beforeModule: 3, level: 4, label: 'Bhakta — The Devoted', sub: 'The faces of the divine are familiar now.' },
  { beforeModule: 4, level: 5, label: 'Jnani — The Knower', sub: 'You have read the whole of it. The teaching is how you see now.' },
  { beforeModule: 5, level: 6, label: 'Rishi — The Sage', sub: 'The questions come to you now.' },
  { beforeModule: null, level: 7, label: 'Guru — The Guide', sub: 'For those who keep returning.' },
];

const { colors, typography, spacing, borderRadius } = DharmaDesignSystem;

const RAIL_TEAL = colors.primary.peacockTeal;
const RAIL_AHEAD = 'rgba(230, 81, 0, 0.22)';

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

// One row of the rail: a fixed-width column drawing the vertical line
// (optionally with a milestone dot), then the block content beside it
const RailRow: React.FC<{
  walked: boolean;
  dot?: 'attained' | 'ahead';
  children: React.ReactNode;
}> = ({ walked, dot, children }) => (
  <View style={styles.railRow}>
    <View style={styles.railCol}>
      <View style={[styles.railLine, { backgroundColor: walked ? RAIL_TEAL : RAIL_AHEAD }]} />
      {dot && (
        <View
          style={[
            styles.railDot,
            dot === 'attained' ? styles.railDotAttained : styles.railDotAhead,
          ]}
        />
      )}
    </View>
    <View style={styles.railContent}>{children}</View>
  </View>
);

const JourneyPathView: React.FC<JourneyPathViewProps> = ({
  onItemPress,
  scrollable = true,
  refreshSignal = 0,
  entrance = false,
}) => {
  const path = useMemo(() => journeyService.getPath(), []);

  // Entrance choreography (onboarding hand-off): first milestone settles in
  // from slightly oversized — the Jigyasu card "became" it — then the rest
  // of the rail rises beneath. Static when reduce-motion is on.
  const milestoneIn = useRef(new Animated.Value(entrance ? 0 : 1)).current;
  const restIn = useRef(new Animated.Value(entrance ? 0 : 1)).current;
  useEffect(() => {
    if (!entrance) return;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        milestoneIn.setValue(1);
        restIn.setValue(1);
        return;
      }
      Animated.sequence([
        Animated.spring(milestoneIn, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(restIn, { toValue: 1, duration: 450, useNativeDriver: true }),
      ]).start();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entrance]);
  const [completion, setCompletion] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Partial<Record<JourneyModule, boolean>>>({});
  const [levelNumber, setLevelNumber] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const map = await journeyService.getCompletionMap();
    setCompletion(map);
    getProgression()
      .then(p => setLevelNumber(p.level.level))
      .catch(() => {});
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
  // Module the walker stands in; 6 = whole path complete (rail fully teal)
  const currentModule: number = currentId
    ? path.find(item => item.id === currentId)!.module
    : 6;

  // Empty modules are dropped so a stage never renders as a bare header — this
  // is what keeps Module 0 honest if Foundations is ever trimmed.
  const modules = ALL_MODULES.map(module => ({
    module,
    items: path.filter(item => item.module === module),
  })).filter(m => m.items.length > 0);

  const renderStageCard = (module: JourneyModule, items: JourneyItem[]) => {
    const isOpen = !!expanded[module];
    const isCurrent = currentModule === module;
    return (
      <View style={[styles.card, isCurrent && styles.cardCurrent]}>
        <TouchableOpacity
          style={styles.cardHead}
          onPress={() => setExpanded(prev => ({ ...prev, [module]: !prev[module] }))}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmoji}>{MODULE_EMOJI[module]}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardEyebrow}>Stage {module}</Text>
            <Text style={styles.cardName}>{JOURNEY_MODULES[module]}</Text>
            <Text style={styles.cardWhy}>{MODULE_WHY[module]}</Text>
            {/* The promise. The stage's capstone is this sentence made testable,
                so it is a commitment rather than a description. */}
            <View style={styles.objective}>
              <Text style={styles.objectiveLabel}>After this you can</Text>
              <Text style={styles.objectiveText}>{MODULE_OBJECTIVES[module]}</Text>
            </View>
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
  };

  const renderMilestone = (m: (typeof MILESTONES)[number]) => {
    const attained = levelNumber >= m.level;
    return (
      <View style={styles.milestone}>
        <Text style={[styles.milestoneLabel, attained && styles.milestoneLabelAttained]}>
          {m.label}
        </Text>
        <Text style={styles.milestoneSub}>{m.sub}</Text>
      </View>
    );
  };

  // The first stage is whichever module actually leads the path — not a
  // hardcoded 1. Foundations (module 0) leads it today.
  const firstModule = modules[0]?.module ?? 0;
  const firstMilestone =
    MILESTONES.find(m => m.beforeModule === firstModule) ?? MILESTONES[0];
  const body = (
    <View style={styles.container}>
      <RailRow
        walked={currentModule >= firstModule}
        dot={levelNumber >= firstMilestone.level ? 'attained' : 'ahead'}
      >
        <Animated.View
          style={{
            opacity: milestoneIn,
            transform: [
              { scale: milestoneIn.interpolate({ inputRange: [0, 1], outputRange: [1.25, 1] }) },
            ],
          }}
        >
          {renderMilestone(firstMilestone)}
        </Animated.View>
      </RailRow>
      <Animated.View
        style={{
          opacity: restIn,
          transform: [
            { translateY: restIn.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
          ],
        }}
      >
        {modules.map(({ module, items }) => {
          const milestone = MILESTONES.find(m => m.beforeModule === module);
          // Rail is teal for everything strictly before the current stage
          const milestoneWalked = currentModule >= module;
          const cardWalked = currentModule > module;
          return (
            <React.Fragment key={module}>
              {/* The lead module's milestone is already rendered above, outside
                  the stagger, so it can carry the onboarding entrance pulse. */}
              {module !== firstModule && milestone && (
                <RailRow
                  walked={milestoneWalked}
                  dot={levelNumber >= milestone.level ? 'attained' : 'ahead'}
                >
                  {renderMilestone(milestone)}
                </RailRow>
              )}
              <RailRow walked={cardWalked}>{renderStageCard(module, items)}</RailRow>
            </React.Fragment>
          );
        })}
        <RailRow
          walked={currentModule > 5}
          dot={levelNumber >= 7 ? 'attained' : 'ahead'}
        >
          {renderMilestone(MILESTONES[MILESTONES.length - 1])}
        </RailRow>
      </Animated.View>
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
  railRow: {
    flexDirection: 'row',
  },
  railCol: {
    width: 26,
    alignItems: 'flex-start',
  },
  railLine: {
    position: 'absolute',
    left: 7,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: 2,
  },
  railDot: {
    position: 'absolute',
    left: 1,
    top: 2,
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 3,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  railDotAttained: {
    backgroundColor: colors.primary.peacockTeal,
    borderColor: colors.primary.peacockTeal,
  },
  railDotAhead: {
    borderColor: colors.primary.deepSaffron,
  },
  railContent: {
    flex: 1,
    minWidth: 0,
  },
  milestone: {
    marginBottom: spacing.sm + 2,
  },
  milestoneLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.primary.deepSaffron,
  },
  milestoneLabelAttained: {
    color: colors.primary.peacockTeal,
  },
  milestoneSub: {
    fontSize: 11,
    color: colors.neutrals.softAsh,
    marginTop: 1,
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
  cardCurrent: {
    borderColor: 'rgba(230, 81, 0, 0.5)',
    shadowColor: colors.primary.deepSaffron,
    shadowOpacity: 0.18,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  cardEmoji: {
    fontSize: 22,
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
  cardWhy: {
    fontSize: 11.5,
    lineHeight: 16,
    fontStyle: 'italic',
    color: '#6E6357',
    marginTop: 2,
  },
  objective: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.12)',
  },
  objectiveLabel: {
    fontSize: 9.5,
    lineHeight: 13,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.primary.peacockTeal,
    marginBottom: 3,
  },
  objectiveText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
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
