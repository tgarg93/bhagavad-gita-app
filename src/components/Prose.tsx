import React from 'react';
import { View } from 'react-native';
import RichText, { stripInlineMarkup } from './RichText';
import TextHighlighter from './TextHighlighter';
import { TextSegment } from '../services/audioNarrationService';

// Body prose that reads as rich text (bold/italic) normally, and — while THIS
// block is the one being narrated — swaps to TextHighlighter on marker-stripped
// text so the highlight's substring offsets (computed against stripped narration
// text) line up exactly. Extracted from NarrativeSections so FoundationCard can
// use the same behavior.
const Prose: React.FC<{
  text: string;
  blockId?: string;
  style: any;
  highlightedSegmentId?: string | null;
  segments?: TextSegment[];
}> = ({ text, blockId, style, highlightedSegmentId = null, segments = [] }) => {
  const activeHere =
    blockId != null &&
    highlightedSegmentId != null &&
    segments.some(s => s.id === highlightedSegmentId && s.blockId === blockId);

  if (activeHere) {
    return (
      <TextHighlighter
        text={stripInlineMarkup(text)}
        blockId={blockId}
        highlightedSegmentId={highlightedSegmentId}
        segments={segments}
        style={style}
      />
    );
  }
  return (
    <View>
      <RichText text={text} style={style} />
    </View>
  );
};

export default Prose;
