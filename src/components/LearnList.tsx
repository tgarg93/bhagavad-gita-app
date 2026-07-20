// The act's concept checklist, rendered identically in its three homes: the
// intro page ("You'll learn", nothing done), every waypoint (some done, the
// next one emphasized), and the celebration ("What you've just learned", all
// done). The items come from FoundationsAct.learnItems — single-sourced, so the
// three surfaces can never drift apart.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import RichText from './RichText';

const C = DharmaDesignSystem.colors;

interface Props {
  items: string[];
  // Items before this index render checked. Omit (or 0) on the intro.
  doneCount?: number;
  // Emphasize items[doneCount] as the one the reader is walking into next.
  // No pill — the ring and weight alone carry it (user call, July 2026).
  highlightNext?: boolean;
  getTextStyle?: (base: any) => any;
}

const LearnList: React.FC<Props> = ({
  items,
  doneCount = 0,
  highlightNext = false,
  getTextStyle = (b: any) => b,
}) => (
  <View style={styles.list}>
    {items.map((item, i) => {
      const done = i < doneCount;
      const next = highlightNext && i === doneCount;
      // On a waypoint, items past "next" recede so the eye lands on the tick
      // and the ring. On the intro (highlightNext false) every row reads full.
      const ahead = highlightNext && i > doneCount;
      return (
        <View key={i} style={styles.row}>
          {done ? (
            <Ionicons
              name="checkmark-circle"
              size={19}
              color={C.primary.deepSaffron}
              style={styles.icon}
            />
          ) : (
            <View style={[styles.ring, next && styles.ringNext, ahead && styles.ringAhead]} />
          )}
          <View style={styles.itemBody}>
            <RichText
              text={item}
              style={getTextStyle(
                done
                  ? styles.itemDone
                  : next
                  ? styles.itemNext
                  : ahead
                  ? styles.itemAhead
                  : styles.item
              )}
            />
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  icon: {
    marginTop: 2,
  },
  ring: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: C.primary.deepSaffron,
    marginTop: 3,
    marginHorizontal: 1,
  },
  ringNext: {
    borderColor: C.primary.peacockTeal,
    shadowColor: C.primary.peacockTeal,
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  ringAhead: {
    borderColor: '#C9BFA9',
  },
  itemBody: {
    flex: 1,
  },
  item: {
    fontSize: 15,
    lineHeight: 23,
    color: C.neutrals.charcoalBlack,
  },
  itemNext: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '600',
    color: C.neutrals.charcoalBlack,
  },
  itemDone: {
    fontSize: 15,
    lineHeight: 23,
    color: C.neutrals.softAsh,
  },
  itemAhead: {
    fontSize: 15,
    lineHeight: 23,
    color: C.neutrals.softAsh,
  },
});

export default LearnList;
