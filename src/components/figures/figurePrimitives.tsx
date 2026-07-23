// Shared building blocks for the section-figure layer (`SectionFigure.tsx`).
//
// Two generations of figure live here, deliberately:
//
//  • `Figure` — the ORIGINAL 640-unit canvas, which the card squeezes into ~342px
//    of padded width, i.e. everything renders at 53%. That is why it carries a
//    tap-to-enlarge affordance: at 53% the labels are not readable on glass.
//    Retained only until the Foundations retrofit rescales all 29 of its figures.
//
//  • `SceneFigure` / `InsetFigure` — the CURRENT house style: authored 1:1, so a
//    13px label is 13px on glass and no enlarge modal is needed. Two widths,
//    because inset figures live inside the card's 24px padding:
//        SceneFigure → author at 390 wide (full-bleed, escapes the gutter)
//        InsetFigure → author at 342 wide (the padded drawable width)
//    Authoring an inset figure at 390 overflows the card.
//
// Arrowheads are drawn as explicit <Path> triangles rather than SVG <Marker>,
// which react-native-svg supports unevenly across platforms. react-native-svg
// also does NOT render SVG filters — simulate glow with stacked translucent
// shapes and radial gradients instead.
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  useWindowDimensions,
  Animated,
  Easing,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../../constants/DharmaDesignSystem';

export const C = DharmaDesignSystem.colors;
export const INK = C.neutrals.charcoalBlack;
export const SOFT = C.neutrals.softAsh;
export const GOLD = '#B8912F';
export const TEAL = C.primary.peacockTeal;
export const INDIGO = C.primary.indigoBlue;
export const SAFFRON = C.primary.deepSaffron;
export const PINK = C.sacred.lotusPink;
export const GREEN = C.sacred.banyanGreen;
export const TURMERIC = C.primary.turmericYellow;
export const RULE = 'rgba(0,0,0,0.14)';

// The card's horizontal padding (FoundationCard.styles.card). A full-bleed figure
// cancels it with a negative margin so the artwork reaches both screen edges.
export const CARD_GUTTER = 24;

export const Caption: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.caption}>{children}</Text>
);

// ─── Arrival staging ────────────────────────────────────────────────────────
// Plays once, when the figure's page becomes active — never while it is mounted
// off-screen in the reader's FlatList. react-native-svg won't reliably animate
// its own elements, so the motion lives on an Animated.View wrapper driven by the
// native driver; the SVG inside stays static.
//
// Memoized so the parent's per-sentence re-renders during read-along narration
// don't re-run the build-in. After it plays the Animated.Value holds at 1, so a
// later re-render (or swiping back to the page) keeps the figure drawn.
export const BuildIn: React.FC<{
  active?: boolean;
  children: React.ReactNode;
  /** Distance the figure rises from, in px. */
  from?: number;
  duration?: number;
}> = React.memo(({ active, children, from = 16, duration = 850 }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const played = useRef(false);

  useEffect(() => {
    if (!active || played.current) return;
    played.current = true;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        progress.setValue(1);
        return;
      }
      Animated.timing(progress, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
    return () => {
      cancelled = true;
    };
  }, [active, progress, duration]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [from, 0] });
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] });

  return (
    <Animated.View
      style={{ opacity: progress, transformOrigin: '50% 100%', transform: [{ translateY }, { scale }] }}
    >
      {children}
    </Animated.View>
  );
});

// ─── Bespoke figure animation ───────────────────────────────────────────────
// Two hooks for figures whose CONCEPT is a change (salt dissolving) or a rhythm
// (the breath) — more than BuildIn's fade. Both drive SVG geometry attributes, so
// they use useNativeDriver:false (the native driver can't animate SVG attrs).

/**
 * One-shot 0→1 progress that runs once when `active` first turns true, and jumps
 * straight to 1 under Reduce Motion. For dissolves / reveals whose end frame is
 * the resting state. Interpolate SVG attrs off the returned value.
 */
export function useOneShot(active?: boolean, duration = 2400): Animated.Value {
  const progress = useRef(new Animated.Value(0)).current;
  const played = useRef(false);
  useEffect(() => {
    if (!active || played.current) return;
    played.current = true;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        progress.setValue(1);
        return;
      }
      Animated.timing(progress, {
        toValue: 1,
        duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }).start();
    });
    return () => {
      cancelled = true;
    };
  }, [active, progress, duration]);
  return progress;
}

/**
 * A looping breath phase, expressed as normalized distance 0→1 along a path:
 * 0→`inhaleFrac` over `inhaleMs` (the in-breath), `inhaleFrac`→1 over `exhaleMs`
 * (the longer out-breath), repeating. **This is the app's ONE sanctioned ambient
 * loop** — the "Try it now" breathe-along card — so it is deliberately gated on
 * `active` (stops the moment the card isn't the visible page, never runs for
 * off-screen FlatList neighbours) and disabled under Reduce Motion. Do not copy
 * this into any other figure; the house rule is still no ambient loops.
 */
export function useBreathLoop(
  active?: boolean,
  inhaleFrac = 0.28,
  inhaleMs = 4000,
  exhaleMs = 6000
): Animated.Value {
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let cancelled = false;
    let loop: Animated.CompositeAnimation | undefined;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (!active || reduced) {
        t.setValue(0);
        return;
      }
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(t, {
            toValue: inhaleFrac,
            duration: inhaleMs,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
          Animated.timing(t, {
            toValue: 1,
            duration: exhaleMs,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
        ])
      );
      loop.start();
    });
    return () => {
      cancelled = true;
      if (loop) loop.stop();
      t.setValue(0);
    };
  }, [active, t, inhaleFrac, inhaleMs, exhaleMs]);
  return t;
}

/**
 * Continuous rotation for a figure whose concept IS endless turning (samsara).
 * **The second sanctioned exception to the no-ambient-loops rule** (after the
 * breath) — do NOT reach for this elsewhere. Unlike `useOneShot`/`useBreathLoop`
 * this spins the whole SVG via a **native-driver transform**, so it costs no
 * per-frame JS. Gated on `active` (stops when the card isn't the visible page)
 * and disabled under Reduce Motion. Wrap the (radially-drawn) SVG in the returned
 * `<Animated.View style={{ transform: [{ rotate }] }}>`; keep any labels that must
 * stay upright OUTSIDE the wrapper.
 */
export function useSpin(active?: boolean, durationMs = 14000): Animated.AnimatedInterpolation<string> {
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let cancelled = false;
    let loop: Animated.CompositeAnimation | undefined;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (!active || reduced) {
        t.setValue(0);
        return;
      }
      loop = Animated.loop(
        Animated.timing(t, { toValue: 1, duration: durationMs, easing: Easing.linear, useNativeDriver: true })
      );
      loop.start();
    });
    return () => {
      cancelled = true;
      if (loop) loop.stop();
      t.setValue(0);
    };
  }, [active, t, durationMs]);
  return t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
}

// ─── Current house style ────────────────────────────────────────────────────

/**
 * Full-bleed figure: the artwork escapes the card's 24px gutter and reaches both
 * screen edges. Author the SVG at 390 units wide. The caption stays indented to
 * the text column so it reads as part of the card, not part of the picture.
 */
export const SceneFigure: React.FC<{
  caption: string;
  children: React.ReactNode;
  active?: boolean;
  /** Arrival staging. Off for figures where motion adds nothing. */
  animate?: boolean;
}> = ({ caption, children, active, animate = true }) => {
  const body = <View style={styles.bleed}>{children}</View>;
  return (
    <View style={styles.sceneFigure}>
      {animate ? <BuildIn active={active}>{body}</BuildIn> : body}
      <Caption>{caption}</Caption>
    </View>
  );
};

/**
 * Inset figure: sits inside the card's text column. Author the SVG at 342 units
 * wide. Use for schematics — branching diagrams, tables, chains — that would look
 * odd bleeding to the screen edge.
 */
export const InsetFigure: React.FC<{
  caption: string;
  children: React.ReactNode;
  active?: boolean;
  animate?: boolean;
}> = ({ caption, children, active, animate = true }) => (
  <View style={styles.figure}>
    {animate ? <BuildIn active={active}>{children}</BuildIn> : children}
    <Caption>{caption}</Caption>
  </View>
);

// ─── Legacy 640-unit canvas (retire after the Foundations retrofit) ─────────

/**
 * Wide diagrams are unreadable at phone width, so a tap opens the SAME <Svg>
 * large and rotated to landscape — the only way a ~3:1 figure fills a portrait
 * screen. We clone the figure's Svg with a big width/height; its own viewBox does
 * the scaling, so the vectors stay crisp. Aspect ratio is read off the viewBox.
 */
const FigureModal: React.FC<{
  open: boolean;
  onClose: () => void;
  svg: React.ReactElement;
  caption: string;
  viewBox?: string;
}> = ({ open, onClose, svg, caption, viewBox }) => {
  const { width, height } = useWindowDimensions();
  const vb = String(viewBox ?? (svg.props as any).viewBox ?? '0 0 640 190')
    .split(/\s+/)
    .map(Number);
  const ratio = (vb[3] || 190) / (vb[2] || 640);
  // drawW runs along the screen's tall axis once rotated; clamp so the rotated
  // drawH (which runs across the screen) still fits the width.
  const drawW = Math.min(height * 0.9, (width * 0.88) / ratio);
  const drawH = drawW * ratio;
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      supportedOrientations={['portrait']}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.expandRotate, { width: drawW }]}>
          <View style={styles.expandCard}>
            {React.cloneElement(svg, { width: drawW, height: drawH } as any)}
          </View>
          <Text style={styles.expandedCaption}>{caption}</Text>
        </View>
        <Pressable
          style={styles.closeBtn}
          onPress={onClose}
          hitSlop={14}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={30} color="#fff" />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export const Figure: React.FC<{ caption: string; children: React.ReactElement; viewBox?: string }> = ({
  caption,
  children,
  viewBox,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.figure}>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="imagebutton"
        accessibilityLabel={`Diagram: ${caption}. Tap to enlarge.`}
      >
        {children}
        <View style={styles.enlargeHint}>
          <Ionicons name="expand-outline" size={12} color={SOFT} />
          <Text style={styles.enlargeText}>Tap to enlarge</Text>
        </View>
      </Pressable>
      <Caption>{caption}</Caption>
      <FigureModal
        open={open}
        onClose={() => setOpen(false)}
        svg={children}
        caption={caption}
        viewBox={viewBox}
      />
    </View>
  );
};

// Styles are written with explicit fontSize/lineHeight rather than spreading
// typography.sizes.* — spreading those unions into a Text style is the known
// tsc trap in this repo (see CLAUDE.md).
export const styles = StyleSheet.create({
  figure: {
    marginTop: 4,
    marginBottom: 20,
  },
  sceneFigure: {
    marginTop: 4,
    marginBottom: 20,
  },
  bleed: {
    marginHorizontal: -CARD_GUTTER,
  },
  caption: {
    fontSize: 11.5,
    lineHeight: 16,
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  enlargeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 8,
  },
  enlargeText: {
    fontSize: 10.5,
    letterSpacing: 0.3,
    color: C.neutrals.softAsh,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.93)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandRotate: {
    transform: [{ rotate: '90deg' }],
    alignItems: 'center',
  },
  expandCard: {
    backgroundColor: C.neutrals.warmIvory,
    borderRadius: 20,
    padding: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 22,
  },
  expandedCaption: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
  },
  table: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: RULE,
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: RULE,
    paddingVertical: 9,
  },
  thead: {
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  th: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    color: C.neutrals.softAsh,
  },
  td: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 15,
    color: C.neutrals.softAsh,
    paddingRight: 4,
  },
  colLabel: { flex: 0.85 },
  colUs: { flex: 1.15 },
  rowLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: C.neutrals.softAsh,
  },
  tdUs: {
    color: C.neutrals.charcoalBlack,
    fontWeight: '600',
  },
});
