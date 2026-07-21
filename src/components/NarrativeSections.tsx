import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import TextHighlighter from './TextHighlighter';
import RichText from './RichText';
import { TextSegment } from '../services/audioNarrationService';
import { NarrativeSection, NarrativeVerse } from '../data/narrativeTypes';
import { navigateToContentRef } from '../data/journeyPath';
import { hasStoryBeats, parseStoryBeats, DIALOGUE_BLOCK_BASE } from '../data/storyBeats';

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
  // Global index of sections[0] within the narration content built by
  // sectionsToNarrationContent (readerContent.ts). When set, deterministic
  // blockIds are passed to TextHighlighter so audio highlighting works:
  //   section-{gi}-title · block-0 openingVerse · block-1 story ·
  //   block-2 bullets · block-3 header · block-4 keyVerse · block-5 teaching
  // (shared convention with sectionsToNarrationContent — change together).
  // When undefined, behavior is identical to before (no highlighting).
  sectionIndexOffset?: number;
}

const identity = (s: any) => s;

const NarrativeSections: React.FC<NarrativeSectionsProps> = ({
  sections,
  highlightedSegmentId = null,
  audioSegments = [],
  getTextStyle = identity,
  onSectionLayout,
  sectionIndexOffset,
}) => {
  const navigation = useNavigation();
  // Prose renderer: rich (bold) normally; while THIS block is being narrated,
  // fall back to TextHighlighter, which parses the same markup so bold/italic
  // survive the highlight (its runs concatenate to the stripped text, keeping the
  // highlight's substring offsets exact)
  const Prose = ({ text, blockId, style }: { text: string; blockId?: string; style: any }) => {
    const activeHere =
      blockId != null &&
      highlightedSegmentId != null &&
      audioSegments.some(s => s.id === highlightedSegmentId && s.blockId === blockId);
    if (activeHere) {
      return (
        <TextHighlighter
          text={text}
          blockId={blockId}
          highlightedSegmentId={highlightedSegmentId}
          segments={audioSegments}
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
  const Verse = ({ verse, blockId }: { verse: NarrativeVerse; blockId?: string }) => (
    <View style={styles.verseContainer}>
      <TextHighlighter
        text={verse.sanskrit}
        blockId={blockId ? `${blockId}-sanskrit` : undefined}
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
        blockId={blockId ? `${blockId}-meaning` : undefined}
        highlightedSegmentId={highlightedSegmentId}
        segments={audioSegments}
        style={getTextStyle(styles.meaningText)}
      />
      {verse.source && <Text style={styles.verseSource}>— {verse.source}</Text>}
    </View>
  );

  return (
    <>
      {sections.map((section, index) => {
        const gi = sectionIndexOffset != null ? sectionIndexOffset + index : null;
        const bid = (suffix: string) => (gi != null ? `section-${gi}-${suffix}` : undefined);
        return (
          <View
            key={section.id}
            style={styles.sectionContainer}
            onLayout={onSectionLayout?.(index)}
          >
            <TextHighlighter
              text={section.title}
              blockId={bid('title')}
              highlightedSegmentId={highlightedSegmentId}
              segments={audioSegments}
              style={getTextStyle(styles.sectionTitle)}
            />
            {section.subtitle && (
              <Text style={getTextStyle(styles.sectionSubtitle)}>{section.subtitle}</Text>
            )}

            {section.openingVerse && (
              <Verse verse={section.openingVerse} blockId={bid('block-0')} />
            )}

            {/* Dialogue stories render storyText as set-apart beats: narration
                paragraphs + spoken lines (saffron tick + speaker label). Each
                beat is its own narration block (block-6, 7, 8…) so read-along
                highlights line up 1:1 with sectionsToNarrationContent. Plain
                storyText keeps the single block-1 render (paragraph breaks in
                the string just work). */}
            {section.storyText && hasStoryBeats(section.storyText)
              ? parseStoryBeats(section.storyText).map((beat, bi) => {
                  const beatBid = bid(`block-${DIALOGUE_BLOCK_BASE + bi}`);
                  if (beat.kind === 'speech') {
                    return (
                      <View key={bi} style={styles.speechBlock}>
                        {beat.speaker && (
                          <Text style={styles.speechSpeaker}>{beat.speaker}</Text>
                        )}
                        <Prose
                          text={beat.text}
                          blockId={beatBid}
                          style={getTextStyle(styles.speechLine)}
                        />
                      </View>
                    );
                  }
                  return (
                    <View key={bi} style={styles.beatNarration}>
                      <Prose text={beat.text} blockId={beatBid} style={getTextStyle(styles.storyText)} />
                    </View>
                  );
                })
              : section.storyText && (
                  <Prose
                    text={section.storyText}
                    blockId={bid('block-1')}
                    style={getTextStyle(styles.storyText)}
                  />
                )}

            {section.bullets && section.bullets.length > 0 && (
              <View style={styles.bulletList}>
                {section.bullets.map((item, bi) => (
                  <View key={bi} style={styles.bulletRow}>
                    <Text style={styles.bulletGlyph}>•</Text>
                    <View style={styles.bulletBody}>
                      <RichText text={item} style={getTextStyle(styles.bulletText)} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {section.sectionHeader && (
              <TextHighlighter
                text={section.sectionHeader}
                blockId={bid('block-3')}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.sectionHeader)}
              />
            )}

            {section.keyVerse && <Verse verse={section.keyVerse} blockId={bid('block-4')} />}

            {section.teachingText && (
              <Prose
                text={section.teachingText}
                blockId={bid('block-5')}
                style={getTextStyle(styles.storyText)}
              />
            )}

            {section.citation && (
              <View style={styles.citationRule}>
                {section.citationLink ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigateToContentRef(navigation, section.citationLink!)}
                  >
                    <Text style={styles.citationText}>
                      {section.citation}
                      <Text style={styles.citationLinkText}>{'  '}Read More ›</Text>
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.citationText}>{section.citation}</Text>
                )}
              </View>
            )}
          </View>
        );
      })}
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
    marginBottom: DharmaDesignSystem.spacing.md,
    fontWeight: '600',
  },
  // Matches the Gita reader's chapterSubtitle so every subtitle in the app
  // shares one treatment: bodyLG italic softAsh, left-aligned under the title
  sectionSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.md,
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
    // Left-aligned (was 'justify'): justified body forced even edges and dense
    // rivers of space that read as a wall — the core story-readability fix.
  },
  // A single narration paragraph inside a dialogue-beat story. Owns its own
  // bottom gap (storyText's marginBottom would double up otherwise).
  beatNarration: {
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  // A spoken line, lifted out of the narration: saffron tick + speaker label +
  // italic line. Border/label styles are written inline (no typography spread)
  // to stay clear of the style-union tsc trap.
  speechBlock: {
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  speechSpeaker: {
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    marginBottom: 4,
  },
  speechLine: {
    fontSize: 17,
    lineHeight: 28,
    fontStyle: 'italic',
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
  },
  bulletList: {
    marginBottom: DharmaDesignSystem.spacing.lg,
    gap: DharmaDesignSystem.spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: DharmaDesignSystem.spacing.sm,
  },
  bulletGlyph: {
    fontSize: 18,
    lineHeight: 28,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '700',
  },
  bulletBody: {
    flex: 1,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 28,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
  },
  sectionHeader: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginTop: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
    fontWeight: '600',
  },
  citationRule: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(33, 33, 33, 0.1)',
    paddingTop: DharmaDesignSystem.spacing.sm,
    marginTop: DharmaDesignSystem.spacing.xs,
  },
  citationText: {
    fontSize: 12,
    lineHeight: 17,
    fontStyle: 'italic',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  citationLinkText: {
    fontSize: 12,
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
  },
});

export default NarrativeSections;
