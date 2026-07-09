import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import TextHighlighter from './TextHighlighter';
import { TextSegment } from '../services/audioNarrationService';
import { NarrativeSection, NarrativeVerse } from '../data/narrativeTypes';

// The shared immersive-reading renderer, extracted from PhilosophyDetailScreen:
// title → openingVerse → storyText → sectionHeader → keyVerse → teachingText.
// Used by philosophy concepts, festivals, and deities so all long-form content
// reads the same way (and stays compatible with AudioControls highlighting).

interface NarrativeSectionsProps {
  sections: NarrativeSection[];
  highlightedSegmentId?: string | null;
  audioSegments?: TextSegment[];
  // Font-size scaling hook from the host screen; identity when absent
  getTextStyle?: (base: any) => any;
  // Lets the host screen track section positions for scroll-sync
  onSectionLayout?: (index: number) => (event: any) => void;
}

const identity = (s: any) => s;

const NarrativeSections: React.FC<NarrativeSectionsProps> = ({
  sections,
  highlightedSegmentId = null,
  audioSegments = [],
  getTextStyle = identity,
  onSectionLayout,
}) => {
  const Verse = ({ verse }: { verse: NarrativeVerse }) => (
    <View style={styles.verseContainer}>
      <TextHighlighter
        text={verse.sanskrit}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.sanskritText)}
      />
      <TextHighlighter
        text={verse.transliteration}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.transliterationText)}
      />
      <TextHighlighter
        text={verse.meaning}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.meaningText)}
      />
      {verse.source && <Text style={styles.verseSource}>— {verse.source}</Text>}
    </View>
  );

  return (
    <>
      {sections.map((section, index) => (
        <View
          key={section.id}
          style={styles.sectionContainer}
          onLayout={onSectionLayout?.(index)}
        >
          <TextHighlighter
            text={section.title}
            highlightedSegmentId={highlightedSegmentId}
            segments={audioSegments}
            style={getTextStyle(styles.sectionTitle)}
          />
          {section.subtitle && (
            <Text style={getTextStyle(styles.sectionSubtitle)}>{section.subtitle}</Text>
          )}

          {section.openingVerse && <Verse verse={section.openingVerse} />}

          {section.storyText && (
            <TextHighlighter
              text={section.storyText}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.storyText)}
            />
          )}

          {section.sectionHeader && (
            <TextHighlighter
              text={section.sectionHeader}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.sectionHeader)}
            />
          )}

          {section.keyVerse && <Verse verse={section.keyVerse} />}

          {section.teachingText && (
            <TextHighlighter
              text={section.teachingText}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.storyText)}
            />
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  sectionSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.md,
    textAlign: 'center',
  },
  verseContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.05)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginVertical: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.turmericYellow,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    fontWeight: '500',
  },
  verseSource: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: DharmaDesignSystem.spacing.xs,
    textAlign: 'right',
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'justify',
  },
  sectionHeader: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginTop: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
    fontWeight: '600',
  },
});

export default NarrativeSections;
