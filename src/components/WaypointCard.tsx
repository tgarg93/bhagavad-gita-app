// A checkpoint page after each concept — a NarrativeSection with
// kind: 'waypoint'. Same celebration-card surface as the intro and the
// completion screen (GuidePanel): Krishna banks what was just learned in one
// bridge line, and the act's learn list returns with the finished items ticked
// and the next one emphasized. Point-free by construction (no takeaway →
// never banks), and quiet (no narration, no transport bar). A tap-through
// Continue button still advances the pager explicitly — swiping wasn't
// discoverable here either (same reasoning as CheckPage's).
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { NarrativeSection } from '../data/narrativeTypes';
import GuidePanel from './GuidePanel';
import LearnList from './LearnList';

const C = DharmaDesignSystem.colors;

interface Props {
  section: NarrativeSection;
  learnItems: string[];
  getTextStyle: (base: any) => any;
  onContinue?: () => void;
}

const WaypointCard: React.FC<Props> = ({ section, learnItems, getTextStyle, onContinue }) => (
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
    {onContinue && (
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel="Continue"
      >
        <Text style={styles.continueBtnText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    )}
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
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: C.primary.deepSaffron,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});

export default WaypointCard;
