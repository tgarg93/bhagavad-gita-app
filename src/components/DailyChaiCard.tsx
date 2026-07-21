import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { DailyAtom, ATOM_TAGS } from '../data/dailyAtoms';
import { TextSegment } from '../services/audioNarrationService';
import RichText, { stripInlineMarkup } from './RichText';

// The unified Daily Chai card: one slot on Home (and the onboarding preview)
// whose content type rotates by weekday. Every type shares the same chrome —
// white card, tag row, bare header icons — and takes its own inner layout
// plus a per-type accent (border tint + tag/icon color).
//
// Product rules that bind here: bare icons only (no chips/circles, no chat
// bubble); the card body is never tappable; ▶ appears only when the parent
// passes onToggleAudio, 📖 only when the atom links deeper.

export interface SpeakablePart {
  text: string;
  type?: TextSegment['type'];
}

// What ▶ says for each type. Sanskrit-bearing cards speak the Devanagari
// first (Hindi voice — skipped by the audio service when none is installed),
// then the English. Verse cards stay English-first per the product spec.
export const speakableSequence = (atom: DailyAtom): SpeakablePart[] => {
  if (atom.type === 'verse') {
    const reference = atom.citation.split('·')[0].trim();
    return [{ text: `${stripInlineMarkup(atom.hook)} ${reference}` }];
  }
  const parts: SpeakablePart[] = [];
  if (atom.sanskrit) {
    parts.push({ text: atom.sanskrit.devanagari, type: 'sanskrit' });
  }
  // Body/hook may carry **bold** / *italic* markers for the card — strip them so
  // the voice never reads "star star".
  if (atom.type === 'word' && atom.sanskrit?.meaning) {
    parts.push({ text: `${atom.sanskrit.transliteration} — ${atom.sanskrit.meaning}. ${stripInlineMarkup(atom.body)}` });
  } else {
    parts.push({ text: stripInlineMarkup(`${atom.hook} ${atom.body}`) });
  }
  return parts;
};

export const isSpeakable = (atom: DailyAtom): boolean => speakableSequence(atom).length > 0;

const ACCENTS: Record<string, { border: string; text: string }> = {
  word: { border: 'rgba(230, 81, 0, 0.18)', text: DharmaDesignSystem.colors.primary.deepSaffron },
  saying: { border: 'rgba(14, 124, 123, 0.25)', text: '#0E7C7B' },
  verse: { border: 'rgba(184, 134, 11, 0.30)', text: '#A87908' },
  question: { border: 'rgba(109, 90, 142, 0.26)', text: '#6D5A8E' },
  story: { border: 'rgba(230, 81, 0, 0.14)', text: DharmaDesignSystem.colors.primary.deepSaffron },
  why: { border: 'rgba(230, 81, 0, 0.14)', text: DharmaDesignSystem.colors.primary.deepSaffron },
  festival: { border: 'rgba(230, 81, 0, 0.14)', text: DharmaDesignSystem.colors.primary.deepSaffron },
  compare: { border: 'rgba(46, 88, 148, 0.24)', text: '#2E5894' },
  discovery: { border: 'rgba(14, 124, 123, 0.25)', text: '#0E7C7B' },
};

interface DailyChaiCardProps {
  atom: DailyAtom;
  speaking?: boolean;
  onToggleAudio?: () => void;
  // Opens the cited text. Passed as a prop, never resolved with useNavigation():
  // OnboardingScreen renders this card OUTSIDE the navigator, and a hook in here
  // would crash it. Onboarding passes nothing, so its citation stays plain.
  onOpenSource?: () => void;
  compact?: boolean; // onboarding preview: clamped body, no actions expected
}

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const DailyChaiCard: React.FC<DailyChaiCardProps> = ({
  atom,
  speaking = false,
  onToggleAudio,
  onOpenSource,
  compact = false,
}) => {
  const accent = ACCENTS[atom.type] ?? ACCENTS.story;
  const bodyLines = compact ? 3 : undefined;

  const inner = () => {
    switch (atom.type) {
      case 'word':
        return (
          <>
            {atom.sanskrit && (
              <>
                <Text style={styles.wordDevanagari}>{atom.sanskrit.devanagari}</Text>
                <Text style={styles.wordTransliteration}>{atom.sanskrit.transliteration}</Text>
                {atom.sanskrit.meaning && <Text style={styles.wordMeaning}>{atom.sanskrit.meaning}</Text>}
              </>
            )}
            {!atom.sanskrit && <Text style={styles.hook}>{atom.hook}</Text>}
            <RichText text={atom.body} style={styles.body} numberOfLines={bodyLines} />
          </>
        );
      case 'saying':
        return (
          <>
            {atom.sanskrit && <Text style={styles.sayingDevanagari}>{atom.sanskrit.devanagari}</Text>}
            <Text style={styles.sayingLine}>{atom.hook}</Text>
            <Text style={[styles.sayingEyebrow, { color: accent.text }]}>WHAT IT MEANS</Text>
            <RichText text={atom.body} style={styles.body} numberOfLines={bodyLines} />
          </>
        );
      case 'question':
        return (
          <View style={compact ? undefined : styles.questionWrap}>
            <Text style={styles.questionLine}>{atom.hook}</Text>
            <RichText text={atom.body} style={styles.questionInsight} numberOfLines={bodyLines} />
          </View>
        );
      case 'verse':
        return (
          <>
            <Text style={styles.verseEnglish}>“{atom.hook}”</Text>
            {atom.sanskrit && (
              <Text style={styles.verseSanskrit} numberOfLines={2}>{atom.sanskrit.devanagari}</Text>
            )}
          </>
        );
      case 'compare':
        // A cross-tradition maxim leads with the saying itself: the Sanskrit verse,
        // then the English quote as the hero, then the convergence note. Compare
        // atoms without sanskrit keep the title + body layout below.
        if (atom.sanskrit) {
          return (
            <>
              <Text style={styles.maximDevanagari}>{atom.sanskrit.devanagari}</Text>
              <Text style={styles.maximTranslit}>{atom.sanskrit.transliteration}</Text>
              <Text style={styles.maximLine}>{atom.hook}</Text>
              <RichText text={atom.body} style={styles.body} numberOfLines={bodyLines} />
            </>
          );
        }
        return (
          <>
            <Text style={styles.hook}>{atom.hook}</Text>
            <RichText text={atom.body} style={styles.body} numberOfLines={bodyLines} />
          </>
        );
      default:
        // story · why · festival — the original hook/body layout
        return (
          <>
            <Text style={styles.hook}>{atom.hook}</Text>
            <RichText text={atom.body} style={styles.body} numberOfLines={bodyLines} />
          </>
        );
    }
  };

  return (
    <View style={[styles.card, { borderColor: accent.border }]}>
      <View style={styles.top}>
        <Text style={[styles.tag, { color: accent.text }]}>
          ☕ DAILY CHAI · {(atom.tagOverride ?? ATOM_TAGS[atom.type]).toUpperCase()}
        </Text>
        <View style={styles.icons}>
          {onToggleAudio && isSpeakable(atom) && (
            <TouchableOpacity onPress={onToggleAudio} hitSlop={HIT_SLOP}>
              <Ionicons name={speaking ? 'volume-high' : 'play'} size={20} color={accent.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {inner()}
      {/* The citation IS the source affordance. There used to be a 📖 icon up in
          the header that opened `atom.link` — a hand-authored "further reading"
          pointer written independently of the citation — so a card citing the
          Isha Upanishad would open Karma. One source, one link, and it only
          appears when the cited text actually exists in the app. */}
      {!!atom.citation &&
        (atom.sourceRef && onOpenSource ? (
          <TouchableOpacity activeOpacity={0.6} onPress={onOpenSource}>
            <Text style={styles.citation}>
              {atom.citation}
              <Text style={[styles.citationLink, { color: accent.text }]}>{'  '}Read More ›</Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.citation}>{atom.citation}</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    borderWidth: 1,
    padding: DharmaDesignSystem.spacing.md,
    ...DharmaDesignSystem.shadows.soft,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tag: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    flexShrink: 1,
    paddingRight: DharmaDesignSystem.spacing.sm,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  hook: {
    fontSize: 16,
    lineHeight: 24,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginBottom: 6,
  },
  body: {
    fontSize: 14.5,
    lineHeight: 23,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: 8,
  },
  // compare (Across Traditions) that carries a maxim: the Sanskrit verse, then the
  // English quote as the hero, then the convergence note (styles.body).
  maximDevanagari: {
    fontSize: 22,
    lineHeight: 34,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginTop: 2,
  },
  maximTranslit: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: 3,
    marginBottom: 14,
  },
  maximLine: {
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: 12,
  },
  citation: {
    fontSize: 11.5,
    lineHeight: 16,
    fontStyle: 'italic',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  // Colour comes from the atom's accent at the call site
  citationLink: {
    fontSize: 11.5,
    lineHeight: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  // word — the Devanagari is the hero
  wordDevanagari: {
    fontSize: 42,
    lineHeight: 58,
    textAlign: 'center',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginTop: 2,
  },
  wordTransliteration: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    fontStyle: 'italic',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  wordMeaning: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginTop: 4,
    marginBottom: 10,
  },
  // saying — reads as a quotation with its interpretation beneath
  sayingDevanagari: {
    fontSize: 21,
    lineHeight: 32,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
  },
  sayingLine: {
    fontSize: 16,
    lineHeight: 24,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginBottom: 10,
  },
  sayingEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  // question — deliberately airy; the question is the content
  questionWrap: {
    paddingVertical: DharmaDesignSystem.spacing.md,
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
  },
  questionLine: {
    fontSize: 19,
    lineHeight: 28,
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'center',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: 12,
  },
  questionInsight: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginBottom: 8,
  },
  // verse — English carries, Sanskrit ornaments (ported from the old card)
  verseEnglish: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: 6,
  },
  verseSanskrit: {
    fontSize: 12,
    lineHeight: 18,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginBottom: 6,
  },
});

export default DailyChaiCard;
