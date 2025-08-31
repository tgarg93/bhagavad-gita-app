import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';

const DeityDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { deityId } = (route.params as any) || { deityId: 'unknown' };
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title="Deity Details"
        subtitle={deityId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
            <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={DharmaDesignSystem.colors.gradients.twilightWisdom}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.title}>Deity Details</Text>
          <Text style={styles.subtitle}>ID: {deityId}</Text>
        </LinearGradient>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.placeholderText}>
            Comprehensive deity information will be available here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xxl,
    alignItems: 'center',
  },
  title: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.white,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  subtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  contentSection: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xl,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  placeholderText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 24,
  },
});

export default DeityDetailScreen;