import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { TextSegment } from '../services/audioNarrationService';
import { parseInlineRuns } from './RichText';

interface TextHighlighterProps {
  text: string;
  blockId?: string; // Which narration block this component renders (e.g. 'section-3-story')
  highlightedSegmentId?: string | null;
  segments?: TextSegment[];
  style?: any;
  highlightStyle?: any;
  onSegmentPress?: (segmentId: string) => void;
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({
  text,
  blockId,
  highlightedSegmentId,
  segments = [],
  style,
  highlightStyle,
  onSegmentPress
}) => {
  const renderHighlightedText = useMemo(() => {
    // Parse inline **bold**/*italic* into runs so emphasis survives while a block
    // is being narrated. Runs concatenate to the marker-stripped text, so the
    // highlight's stripped-space offsets map straight onto them. Plain text (no
    // markers) yields a single run — identical output to before for every caller
    // that passes unformatted strings (verses, meanings, etc.).
    const runs = parseInlineRuns(text);
    const total = runs.reduce((n, r) => n + r.text.length, 0);

    // Highlight only when the active segment belongs to this block (unchanged rules);
    // -1/-1 means no highlight here.
    let hlStart = -1;
    let hlEnd = -1;
    const seg = highlightedSegmentId && blockId
      ? segments.find(s => s.id === highlightedSegmentId)
      : undefined;
    if (seg && seg.blockId === blockId) {
      hlStart = Math.max(0, Math.min(seg.localStart, total));
      hlEnd = Math.max(hlStart, Math.min(seg.localEnd, total));
    }

    const nodes: React.ReactNode[] = [];
    let offset = 0;
    runs.forEach((run, ri) => {
      const emphasis = {
        ...(run.bold ? { fontWeight: '700' as const } : null),
        ...(run.italic ? { fontStyle: 'italic' as const } : null),
      };
      const rs = offset;
      const re = offset + run.text.length;
      offset = re;
      const hs = Math.max(rs, hlStart);
      const he = Math.min(re, hlEnd);
      if (hlStart < 0 || he <= hs) {
        nodes.push(<Text key={ri} style={emphasis}>{run.text}</Text>);
        return;
      }
      const before = run.text.slice(0, hs - rs);
      const inside = run.text.slice(hs - rs, he - rs);
      const after = run.text.slice(he - rs);
      if (before) nodes.push(<Text key={`${ri}a`} style={emphasis}>{before}</Text>);
      nodes.push(
        <Text
          key={`${ri}b`}
          style={[emphasis, styles.highlight, highlightStyle]}
          onPress={() => onSegmentPress?.(highlightedSegmentId!)}
        >
          {inside}
        </Text>
      );
      if (after) nodes.push(<Text key={`${ri}c`} style={emphasis}>{after}</Text>);
    });

    return <Text style={style}>{nodes}</Text>;
  }, [text, blockId, highlightedSegmentId, segments, style, highlightStyle, onSegmentPress]);

  return <View>{renderHighlightedText}</View>;
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: DharmaDesignSystem.colors.primary.turmericYellow,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
    shadowColor: DharmaDesignSystem.colors.primary.deepSaffron,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default TextHighlighter;
