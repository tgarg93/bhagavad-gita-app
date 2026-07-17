// The act's on-ramp — a NarrativeSection with kind: 'intro', by convention
// sections[0]. Rides GuidePanel (the celebration-card surface shared with the
// waypoints and the completion screen): a few small framing sentences, then
// the "You'll learn" checklist that the waypoints tick off and the celebration
// replays checked.
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
  // Whole-act reading estimate, shown under the list ("6 ideas · about 13 min").
  minutes?: number;
  getTextStyle: (base: any) => any;
}

const IntroCard: React.FC<Props> = ({ section, learnItems, minutes, getTextStyle }) => (
  <View style={styles.card}>
    <Text style={styles.eyebrow}>{section.title}</Text>
    <GuidePanel>
      {!!section.storyText && (
        <Text style={getTextStyle(styles.framing)}>{section.storyText}</Text>
      )}
      <Text style={styles.learnHead}>You'll learn</Text>
      <LearnList items={learnItems} getTextStyle={getTextStyle} />
      {!!minutes && (
        <Text style={styles.meta}>
          {learnItems.length} ideas · about {minutes} min
        </Text>
      )}
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
  // Same label treatment as the celebration's "What you've just learned".
  learnHead: {
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.neutrals.softAsh,
    marginBottom: 10,
  },
  meta: {
    fontSize: 12,
    lineHeight: 17,
    color: C.neutrals.softAsh,
    marginTop: 16,
  },
});

export default IntroCard;
