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

interface PracticeDetailScreenProps {
  route: {
    params: {
      practiceId: string;
    };
  };
}

const PracticeDetailScreen: React.FC<PracticeDetailScreenProps> = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { practiceId } = (route.params as any) || { practiceId: 'unknown' };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={DharmaDesignSystem.colors.neutrals.charcoalInk} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Practice Details</Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <LinearGradient
          colors={DharmaDesignSystem.colors.gradients.sunriseBlend}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.practiceTitle}>Practice Details</Text>
          <Text style={styles.practiceSubtitle}>ID: {practiceId}</Text>
        </LinearGradient>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.placeholderText}>
            This practice detail screen will contain comprehensive information about:
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons 
                name="book-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.saffronSunset} 
              />
              <Text style={styles.featureText}>Detailed practice instructions</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="play-circle-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.saffronSunset} 
              />
              <Text style={styles.featureText}>Audio and video guides</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="heart-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.saffronSunset} 
              />
              <Text style={styles.featureText}>Benefits and spiritual significance</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.saffronSunset} 
              />
              <Text style={styles.featureText}>Time commitments and schedules</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.creamCanvas,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: DharmaDesignSystem.spacing.xl,
  },
  heroSection: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xxl,
    alignItems: 'center',
  },
  practiceTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.white,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  practiceSubtitle: {
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
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  placeholderText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 24,
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  featureList: {
    gap: DharmaDesignSystem.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderLeftWidth: 3,
    borderLeftColor: DharmaDesignSystem.colors.primary.saffronSunset,
  },
  featureText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginLeft: DharmaDesignSystem.spacing.sm,
  },
});

export default PracticeDetailScreen;