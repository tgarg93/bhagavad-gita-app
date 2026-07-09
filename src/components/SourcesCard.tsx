import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { SourceNote } from '../data/narrativeTypes';

// Quiet footer card naming the primary texts a piece of content draws on.
// Part of the verified-citations quality bar: every seed content item ships
// with the sources it was checked against.

const SourcesCard: React.FC<{ sources: SourceNote[] }> = ({ sources }) => {
  if (!sources.length) return null;
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="library-outline" size={16} color={DharmaDesignSystem.colors.neutrals.softAsh} />
        <Text style={styles.headerText}>Sources</Text>
      </View>
      {sources.map((s, i) => (
        <Text key={i} style={styles.sourceLine}>
          {s.text}, {s.locator}
          {s.translation ? ` · ${s.translation}` : ''}
        </Text>
      ))}
    </View>
  );
};

const { colors, typography, spacing, borderRadius } = DharmaDesignSystem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  headerText: {
    ...typography.sizes.caption,
    color: colors.neutrals.softAsh,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sourceLine: {
    ...typography.sizes.bodySM,
    fontWeight: '400',
    color: colors.neutrals.softAsh,
    marginTop: 2,
  },
});

export default SourcesCard;
