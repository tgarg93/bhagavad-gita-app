// One Foundations card: a single idea, banked.
//
// The takeaway leads — it is the sentence the reader walks away with, and the
// one an act's celebration replays back to them, so it is set large and given
// the saffron rule. Everything under it is support: ~60 words of body, an
// optional Sanskrit block, an optional figure, and an optional invitation into
// the long-form content this card is a doorway to.
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { NarrativeSection } from '../data/narrativeTypes';
import { TextSegment } from '../services/audioNarrationService';
import { stripInlineMarkup } from './RichText';
import TextHighlighter from './TextHighlighter';
import Prose from './Prose';
import FoundationFigure from './FoundationFigure';

const C = DharmaDesignSystem.colors;

interface Props {
  section: NarrativeSection;
  getTextStyle: (base: any) => any;
  onGoDeeper?: (ref: string) => void;
  // Read-along narration: when the card is being narrated, the takeaway and body
  // highlight sentence by sentence. Block ids mirror the Foundations narration
  // builder — `section-{sectionIndex}-takeaway` / `-story`. Absent → no highlight
  // (every non-narrated render is unchanged).
  highlightedSegmentId?: string | null;
  segments?: TextSegment[];
  sectionIndex?: number;
  // Read-along auto-scroll: reports the Y of the block being narrated (takeaway /
  // story / a bullet) so the page can scroll it into view. Called on every
  // segment change; the parent decides whether/how far to scroll.
  onActiveBlockLayout?: (y: number) => void;
  // True when this card is the visible page — triggers the figure's build-in
  // animation (so it plays on arrival, not while mounted off-screen).
  active?: boolean;
}

const FoundationCard: React.FC<Props> = ({
  section,
  getTextStyle,
  onGoDeeper,
  highlightedSegmentId = null,
  segments = [],
  sectionIndex,
  onActiveBlockLayout,
  active,
}) => {
  const { takeaway, storyText, keyVerse, citation, deeper, sectionHeader, teachingText } = section;
  const takeawayBlock = sectionIndex != null ? `section-${sectionIndex}-takeaway` : undefined;
  const storyBlock = sectionIndex != null ? `section-${sectionIndex}-story` : undefined;

  // Y offset of each highlightable block within the card, filled by onLayout.
  const blockYs = useRef<Record<string, number>>({});
  const setBlockY = (id: string | undefined, y: number) => {
    if (id) blockYs.current[id] = y;
  };

  // When the narrated block changes, hand its measured Y up so the page scrolls to it.
  useEffect(() => {
    if (!highlightedSegmentId || !onActiveBlockLayout) return;
    const blockId = segments.find(s => s.id === highlightedSegmentId)?.blockId;
    if (!blockId) return;
    const y = blockYs.current[blockId];
    if (y != null) onActiveBlockLayout(y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedSegmentId]);

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{section.title}</Text>

      {!!takeaway && (
        <View onLayout={e => setBlockY(takeawayBlock, e.nativeEvent.layout.y)}>
          <TextHighlighter
            text={stripInlineMarkup(takeaway)}
            blockId={takeawayBlock}
            highlightedSegmentId={highlightedSegmentId}
            segments={segments}
            style={getTextStyle(styles.takeaway)}
          />
        </View>
      )}
      <View style={styles.rule} />

      <FoundationFigure sectionId={section.id} active={active} />

      {!!storyText && (
        <View onLayout={e => setBlockY(storyBlock, e.nativeEvent.layout.y)}>
          <Prose
            text={storyText}
            blockId={storyBlock}
            highlightedSegmentId={highlightedSegmentId}
            segments={segments}
            style={getTextStyle(styles.body)}
          />
        </View>
      )}

      {/* Bullets render after the story prose, in reading order. Each bullet is
          its own Prose block (`section-{i}-bullet-{j}`) so it highlights in turn
          during read-along, exactly like the story sentences — the matching
          segments come from buildFoundationsSegments. */}
      {!!section.bullets?.length && (
        <View
          style={styles.bullets}
          onLayout={e => (blockYs.current['__bulletsTop'] = e.nativeEvent.layout.y)}
        >
          {section.bullets.map((item, j) => (
            <View
              key={j}
              style={styles.bulletRow}
              onLayout={e =>
                setBlockY(
                  sectionIndex != null ? `section-${sectionIndex}-bullet-${j}` : undefined,
                  // bullets sit inside the styles.bullets wrapper, so add its offset
                  (blockYs.current[`__bulletsTop`] ?? 0) + e.nativeEvent.layout.y
                )
              }
            >
              <View style={styles.bulletDot} />
              <View style={styles.bulletBody}>
                <Prose
                  text={item}
                  blockId={sectionIndex != null ? `section-${sectionIndex}-bullet-${j}` : undefined}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={segments}
                  style={getTextStyle(styles.bulletText)}
                />
              </View>
            </View>
          ))}
        </View>
      )}

      {!!keyVerse && (
        <View style={styles.verse}>
          <Text style={getTextStyle(styles.sanskrit)}>{keyVerse.sanskrit}</Text>
          <Text style={getTextStyle(styles.translit)}>{keyVerse.transliteration}</Text>
          <Text style={getTextStyle(styles.meaning)}>{keyVerse.meaning}</Text>
        </View>
      )}

      {!!sectionHeader && <Text style={styles.subhead}>{sectionHeader}</Text>}
      {!!teachingText && (
        <Prose text={teachingText} style={getTextStyle(styles.body)} />
      )}

      {!!deeper && (
        <TouchableOpacity
          style={styles.deeper}
          onPress={() => onGoDeeper?.(deeper.ref)}
          accessibilityRole="button"
          accessibilityLabel={`Go deeper: ${deeper.label}`}
        >
          <Ionicons name="arrow-forward-circle-outline" size={17} color={C.primary.peacockTeal} />
          <Text style={styles.deeperText}>Go deeper: {deeper.label}</Text>
        </TouchableOpacity>
      )}

      {!!citation && <Text style={styles.citation}>{citation}</Text>}
    </View>
  );
};

// Styles are written with explicit fontSize/lineHeight rather than spreading
// typography.sizes.* — spreading those unions into a Text style is the known
// tsc trap in this repo (see CLAUDE.md).
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.primary.peacockTeal,
    marginBottom: 14,
  },
  takeaway: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
  },
  rule: {
    width: 44,
    height: 2,
    backgroundColor: C.primary.deepSaffron,
    marginTop: 16,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 27,
    color: C.neutrals.charcoalBlack,
  },
  bullets: {
    marginTop: 16,
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  bulletBody: {
    flex: 1,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.primary.deepSaffron,
    marginTop: 9,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 26,
    color: C.neutrals.charcoalBlack,
  },
  verse: {
    marginTop: 20,
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderLeftColor: C.primary.turmericYellow,
  },
  sanskrit: {
    fontSize: 17,
    lineHeight: 26,
    color: C.neutrals.charcoalBlack,
    fontWeight: '600',
  },
  translit: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: C.neutrals.softAsh,
    marginTop: 2,
  },
  meaning: {
    fontSize: 14.5,
    lineHeight: 21,
    color: C.neutrals.softAsh,
    marginTop: 5,
  },
  subhead: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.primary.peacockTeal,
    marginTop: 22,
    marginBottom: 10,
  },
  deeper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
    marginTop: 22,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,121,107,0.35)',
  },
  deeperText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: '600',
    color: C.primary.peacockTeal,
  },
  citation: {
    fontSize: 11.5,
    lineHeight: 17,
    color: C.neutrals.softAsh,
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.12)',
  },
});

export default FoundationCard;
