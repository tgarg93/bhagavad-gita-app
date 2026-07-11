import React from 'react';
import { Text } from 'react-native';

// Minimal inline rich text for content strings: `**term**` renders bold.
// That's the whole grammar — content stays close to plain prose, and the
// narration pipeline strips the same markers so TTS and highlight offsets
// operate on clean text (see stripInlineMarkup).

export const stripInlineMarkup = (text: string): string => text.replace(/\*\*/g, '');

const RichText: React.FC<{ text: string; style?: any }> = ({ text, style }) => {
  const parts = text.split('**');
  if (parts.length === 1) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ fontWeight: '700' }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};

export default RichText;
