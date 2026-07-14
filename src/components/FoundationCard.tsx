// One Foundations card: a single idea, banked.
//
// The takeaway leads — it is the sentence the reader walks away with, and the
// one an act's celebration replays back to them, so it is set large and given
// the saffron rule. Everything under it is support: ~60 words of body, an
// optional Sanskrit block, an optional figure, and an optional invitation into
// the long-form content this card is a doorway to.
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { NarrativeSection } from '../data/narrativeTypes';
import RichText from './RichText';
import FoundationFigure from './FoundationFigure';

const C = DharmaDesignSystem.colors;

interface Props {
  section: NarrativeSection;
  getTextStyle: (base: any) => any;
  onGoDeeper?: (ref: string) => void;
}

const FoundationCard: React.FC<Props> = ({ section, getTextStyle, onGoDeeper }) => {
  const { takeaway, storyText, keyVerse, citation, deeper, sectionHeader, teachingText } = section;

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{section.title}</Text>

      <Text style={getTextStyle(styles.takeaway)}>{takeaway}</Text>
      <View style={styles.rule} />

      <FoundationFigure sectionId={section.id} />

      {!!storyText && (
        <RichText text={storyText} style={getTextStyle(styles.body)} />
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
        <RichText text={teachingText} style={getTextStyle(styles.body)} />
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
