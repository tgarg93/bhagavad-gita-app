import React from 'react';
import { Text } from 'react-native';

// Minimal inline rich text for content strings: `**term**` renders bold and
// `*term*` renders italic. That's the whole grammar — content stays close to
// plain prose, and the narration pipeline strips the same markers so TTS and
// highlight offsets operate on clean text (see stripInlineMarkup).

// Remove BOTH bold and italic markers. Order matters: strip `**` first so the
// leftover `*` pass doesn't chew through bold pairs.
export const stripInlineMarkup = (text: string): string =>
  text.replace(/\*\*/g, '').replace(/\*/g, '');

export interface InlineRun { text: string; bold?: boolean; italic?: boolean; }

// Parse `**bold**` / `*italic*` into styled runs. Concatenating run.text yields
// exactly stripInlineMarkup(raw), so highlight offsets computed on stripped text
// map straight onto these runs (see TextHighlighter). Mirrors this file's own
// rendering grammar: bold parts are bold only; italics are parsed inside non-bold
// parts. Kept in sync with RichText below by hand — the two share the grammar.
export const parseInlineRuns = (raw: string): InlineRun[] => {
  const runs: InlineRun[] = [];
  raw.split('**').forEach((part, bi) => {
    if (bi % 2 === 1) {
      if (part) runs.push({ text: part, bold: true });
    } else {
      part.split('*').forEach((seg, si) => {
        if (seg) runs.push({ text: seg, italic: si % 2 === 1 });
      });
    }
  });
  return runs;
};

// Render a chunk that may contain *italic* spans (no bold — bold is split off
// by the caller first).
const renderItalic = (chunk: string, keyBase: string): React.ReactNode => {
  const parts = chunk.split('*');
  if (parts.length === 1) return chunk;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <Text key={`${keyBase}-i${i}`} style={{ fontStyle: 'italic' }}>
        {part}
      </Text>
    ) : (
      <React.Fragment key={`${keyBase}-t${i}`}>{part}</React.Fragment>
    )
  );
};

const RichText: React.FC<{ text: string; style?: any; numberOfLines?: number }> = ({
  text,
  style,
  numberOfLines,
}) => {
  const boldParts = text.split('**');
  if (boldParts.length === 1) {
    return <Text style={style} numberOfLines={numberOfLines}>{renderItalic(text, 'r')}</Text>;
  }
  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {boldParts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ fontWeight: '700' }}>
            {part}
          </Text>
        ) : (
          <React.Fragment key={i}>{renderItalic(part, `b${i}`)}</React.Fragment>
        )
      )}
    </Text>
  );
};

export default RichText;
