// The key-word flashcard page — a NarrativeSection with kind: 'term'. Visually
// its own species in the flow: a warm-ivory panel on the sandstone page, the
// word set huge in Devanagari, one-line meaning, then the "hold onto this"
// framing. keyVerse carries the word; storyText the hold; bullets the optional
// word-by-word trio ("**tat** — that: the one reality"); reappears the forward
// pointer. Point-free by construction (no takeaway → never banks).
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { NarrativeSection } from '../data/narrativeTypes';
import Prose from './Prose';
import RichText from './RichText';

const C = DharmaDesignSystem.colors;

interface Props {
  section: NarrativeSection;
  getTextStyle: (base: any) => any;
}

const TermCard: React.FC<Props> = ({ section, getTextStyle }) => {
  const { keyVerse, storyText, bullets, reappears } = section;
  return (
    <View style={styles.card}>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>{section.title}</Text>
        {!!keyVerse && (
          <>
            <Text style={getTextStyle(styles.sanskrit)}>{keyVerse.sanskrit}</Text>
            <Text style={getTextStyle(styles.translit)}>{keyVerse.transliteration}</Text>
            <View style={styles.rule} />
            <Text style={getTextStyle(styles.meaning)}>{keyVerse.meaning}</Text>
          </>
        )}
        {!!bullets?.length && (
          <View style={styles.trio}>
            {bullets.map((item, i) => (
              <View key={i} style={styles.trioRow}>
                <RichText text={item} style={getTextStyle(styles.trioText)} />
              </View>
            ))}
          </View>
        )}
        {!!storyText && (
          <View style={styles.hold}>
            <Prose text={storyText} style={getTextStyle(styles.holdText)} />
          </View>
        )}
        {!!reappears && (
          <View style={styles.reappears}>
            <Text style={styles.reappearsArrow}>↳</Text>
            <Text style={getTextStyle(styles.reappearsText)}>{reappears}</Text>
          </View>
        )}
        {!!keyVerse?.source && <Text style={styles.source}>{keyVerse.source}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  panel: {
    backgroundColor: C.neutrals.warmIvory,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.09)',
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 22,
  },
  // Saffron, not the cards' teal — "Key word" reads as its own species.
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.primary.deepSaffron,
    textAlign: 'center',
    marginBottom: 20,
  },
  sanskrit: {
    fontSize: 48,
    lineHeight: 64,
    fontWeight: '600',
    color: C.neutrals.charcoalBlack,
    textAlign: 'center',
  },
  translit: {
    fontSize: 17,
    lineHeight: 24,
    fontStyle: 'italic',
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginTop: 6,
  },
  rule: {
    width: 44,
    height: 2,
    backgroundColor: C.primary.deepSaffron,
    alignSelf: 'center',
    marginVertical: 18,
  },
  meaning: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '600',
    color: C.neutrals.charcoalBlack,
    textAlign: 'center',
  },
  trio: {
    marginTop: 20,
    gap: 10,
  },
  trioRow: {
    backgroundColor: C.neutrals.sandstoneBeige,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  trioText: {
    fontSize: 14.5,
    lineHeight: 21,
    color: C.neutrals.charcoalBlack,
  },
  hold: {
    marginTop: 20,
  },
  holdText: {
    fontSize: 14.5,
    lineHeight: 24,
    color: C.neutrals.charcoalBlack,
  },
  reappears: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.09)',
  },
  reappearsArrow: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
    color: C.primary.deepSaffron,
  },
  reappearsText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    color: C.primary.peacockTeal,
  },
  source: {
    fontSize: 11.5,
    lineHeight: 16,
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginTop: 14,
  },
});

export default TermCard;
