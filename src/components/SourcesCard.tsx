import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { SourceNote } from '../data/narrativeTypes';
import { navigateToContentRef } from '../data/journeyPath';

// Quiet footer card naming the primary texts a piece of content draws on.
// Part of the verified-citations quality bar: every seed content item ships
// with the sources it was checked against. Sources whose text lives in the
// app (appLink) are tappable and open it in the reader.

const SourcesCard: React.FC<{ sources: SourceNote[] }> = ({ sources }) => {
  const navigation = useNavigation();
  if (!sources.length) return null;
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="library-outline" size={16} color={DharmaDesignSystem.colors.neutrals.softAsh} />
        <Text style={styles.headerText}>Sources</Text>
      </View>
      {sources.map((s, i) => {
        const line = `${s.text}, ${s.locator}${s.translation ? ` · ${s.translation}` : ''}`;
        if (!s.appLink) {
          return (
            <Text key={i} style={styles.sourceLine}>
              {line}
            </Text>
          );
        }
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.6}
            onPress={() => navigateToContentRef(navigation, s.appLink!)}
          >
            <Text style={styles.sourceLine}>
              {line}
              <Text style={styles.sourceLinkText}>{'  '}Read in app ›</Text>
            </Text>
          </TouchableOpacity>
        );
      })}
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
  sourceLinkText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.primary.deepSaffron,
  },
});

export default SourcesCard;
