import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { TextSegment } from '../services/audioNarrationService';

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
    if (!highlightedSegmentId || !blockId || segments.length === 0) {
      return <Text style={style}>{text}</Text>;
    }

    // Only highlight when the active segment belongs to this block,
    // using its offsets within the block's own text
    const highlightedSegment = segments.find(s => s.id === highlightedSegmentId);
    if (!highlightedSegment || highlightedSegment.blockId !== blockId) {
      return <Text style={style}>{text}</Text>;
    }

    const startIndex = Math.max(0, Math.min(highlightedSegment.localStart, text.length));
    const endIndex = Math.max(startIndex, Math.min(highlightedSegment.localEnd, text.length));

    const beforeText = text.substring(0, startIndex);
    const highlightedText = text.substring(startIndex, endIndex);
    const afterText = text.substring(endIndex);

    return (
      <Text style={style}>
        {beforeText}
        <Text
          style={[styles.highlight, highlightStyle]}
          onPress={() => onSegmentPress?.(highlightedSegmentId)}
        >
          {highlightedText}
        </Text>
        {afterText}
      </Text>
    );
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
