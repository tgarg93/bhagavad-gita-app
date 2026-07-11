import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import JourneyPathView from '../components/JourneyPathView';
import journeyService from '../services/journeyService';
import { navigateToJourneyItem } from '../data/journeyPath';

// The full guided journey, browsable: five stages, every step, tap to open.

const JourneyPathScreen: React.FC = () => {
  const navigation = useNavigation();
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshSignal, setRefreshSignal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const path = journeyService.getPath();
        const map = await journeyService.getCompletionMap();
        setTotal(path.length);
        setDone(path.filter(item => map[item.id]).length);
        setRefreshSignal(n => n + 1);
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Your path</Text>
          <Text style={styles.subtitle}>
            {done} of {total} steps walked
          </Text>
        </View>
        <View style={styles.backBtn} />
      </View>
      <JourneyPathView
        scrollable
        refreshSignal={refreshSignal}
        onItemPress={item => navigateToJourneyItem(navigation, item)}
      />
    </SafeAreaView>
  );
};

const { colors, typography, spacing } = DharmaDesignSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    width: 40,
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.sizes.headingMD,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutrals.softAsh,
    marginTop: 1,
  },
});

export default JourneyPathScreen;
