// A checkpoint page after each concept — a NarrativeSection with
// kind: 'waypoint'. Same celebration-card surface as the intro and the
// completion screen (GuidePanel): Krishna banks what was just learned in one
// bridge line, and the act's learn list returns with the finished items ticked
// and the next one emphasized. Point-free by construction (no takeaway →
// never banks), and quiet (no narration, no transport bar).
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { NarrativeSection } from '../data/narrativeTypes';
import GuidePanel from './GuidePanel';
import LearnList from './LearnList';

const C = DharmaDesignSystem.colors;

interface Props {
  section: NarrativeSection;
  learnItems: string[];
  getTextStyle: (base: any) => any;
}

const WaypointCard: React.FC<Props> = ({ section, learnItems, getTextStyle }) => (
  <View style={styles.card}>
    <Text style={styles.eyebrow}>{section.title}</Text>
    <GuidePanel>
      {!!section.storyText && (
        <Text style={getTextStyle(styles.framing)}>{section.storyText}</Text>
      )}
      <LearnList
        items={learnItems}
        doneCount={section.learnIndex ?? 0}
        highlightNext
        getTextStyle={getTextStyle}
      />
    </GuidePanel>
  </View>
);

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
    marginBottom: 18,
  },
  framing: {
    fontSize: 14.5,
    lineHeight: 22,
    color: C.neutrals.charcoalBlack,
    marginBottom: 16,
  },
});

export default WaypointCard;
