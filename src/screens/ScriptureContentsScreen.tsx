import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import {
  getCollection,
  getPartsOfCollection,
  ScriptureCollectionId,
  ScripturePart,
} from '../data/scriptureTexts';
import journeyService from '../services/journeyService';

// The contents list for a multi-part scripture (Ramayana, Principal
// Upanishads): the collection's blurb up top, then one row per part
// (kanda / Upanishad) in reading order — each opens the shared paged reader.
// Mirrors the Gita's single-card → internal-contents model, but for texts
// that read through ContentReader.

const ScriptureContentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { collectionId } = (route.params as { collectionId: ScriptureCollectionId }) || {
    collectionId: 'ramayana',
  };

  const collection = getCollection(collectionId);
  const parts = getPartsOfCollection(collectionId);
  const [completion, setCompletion] = useState<Record<string, string>>({});

  // Refresh completion ticks whenever the screen regains focus (a part may
  // have been finished in the reader and popped back here)
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      journeyService.getCompletionMap().then(map => {
        if (alive) setCompletion(map);
      });
      return () => {
        alive = false;
      };
    }, [])
  );

  const openPart = (part: ScripturePart) => {
    (navigation as any).navigate('ContentReader', {
      contentType: 'scripture',
      contentId: part.id,
    });
  };

  if (!collection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>This collection is not available yet.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.fallbackBack}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const doneCount = parts.filter(p => completion[`scripture:${p.id}`]).length;

  const renderHeader = () => (
    <View style={styles.headerBlock}>
      <Text style={styles.collectionSanskrit}>{collection.sanskritName}</Text>
      <Text style={styles.collectionTitle}>{collection.title}</Text>
      <Text style={styles.collectionBlurb}>{collection.blurb}</Text>
      <Text style={styles.progressLine}>
        {doneCount} of {parts.length} read
      </Text>
    </View>
  );

  const renderPart = ({ item }: { item: ScripturePart }) => {
    const done = !!completion[`scripture:${item.id}`];
    return (
      <TouchableOpacity style={styles.row} onPress={() => openPart(item)} activeOpacity={0.85}>
        <Image source={item.coverImage} style={thumbStyle} />
        <View style={styles.rowText}>
          <Text style={styles.rowName}>{item.name}</Text>
          <Text style={styles.rowSubtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        </View>
        {done ? (
          <Ionicons name="checkmark-circle" size={24} color={DharmaDesignSystem.colors.semantic.success} />
        ) : (
          <Ionicons name="chevron-forward" size={22} color={DharmaDesignSystem.colors.neutrals.softAsh} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {collection.title}
        </Text>
        <View style={styles.backBtn} />
      </View>
      <FlatList
        data={parts}
        keyExtractor={p => p.id}
        renderItem={renderPart}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const { colors, spacing, borderRadius, shadows } = DharmaDesignSystem;

const thumbStyle: ImageStyle = {
  width: 56,
  height: 56,
  borderRadius: borderRadius.medium,
  resizeMode: 'cover',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutrals.sandstoneBeige },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 81, 0, 0.12)',
  },
  backBtn: { width: 40, padding: spacing.xs },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
  },
  listContent: { paddingBottom: spacing.xxl },
  headerBlock: { padding: spacing.lg, paddingBottom: spacing.md },
  collectionSanskrit: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.primary.deepSaffron,
    marginBottom: 2,
  },
  collectionTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.sm,
  },
  collectionBlurb: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.md,
  },
  progressLine: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.neutrals.softAsh,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.large,
    ...shadows.soft,
  },
  rowText: { flex: 1 },
  rowName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.neutrals.charcoalBlack,
    marginBottom: 2,
  },
  rowSubtitle: { fontSize: 13, lineHeight: 18, color: colors.neutrals.softAsh },
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  fallbackText: { fontSize: 17, lineHeight: 24, color: colors.neutrals.charcoalBlack },
  fallbackBack: { fontSize: 15, lineHeight: 20, color: colors.primary.deepSaffron, fontWeight: '600' },
});

export default ScriptureContentsScreen;
