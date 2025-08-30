import React from 'react';
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

const ScriptureDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { scriptureId } = (route.params as any) || { scriptureId: 'unknown' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={DharmaDesignSystem.colors.neutrals.charcoalBlack} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Scripture Details</Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={DharmaDesignSystem.colors.gradients.goldenHour}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.title}>Scripture Details</Text>
          <Text style={styles.subtitle}>Scripture ID: {scriptureId}</Text>
        </LinearGradient>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.placeholderText}>
            Sacred scripture content and teachings will be available here.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 107, 53, 0.12)',
  },
  backButton: {
    padding: DharmaDesignSystem.spacing.sm,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
  },
  headerSpacer: {
    width: 40,
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

export default ScriptureDetailScreen;