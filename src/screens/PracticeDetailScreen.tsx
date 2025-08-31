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
        title="Practice Details"
        subtitle={practiceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
            <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        }
      />

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
                color={DharmaDesignSystem.colors.primary.deepSaffron} 
              />
              <Text style={styles.featureText}>Detailed practice instructions</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="play-circle-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.deepSaffron} 
              />
              <Text style={styles.featureText}>Audio and video guides</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="heart-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.deepSaffron} 
              />
              <Text style={styles.featureText}>Benefits and spiritual significance</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={DharmaDesignSystem.colors.primary.deepSaffron} 
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
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.xs,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
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
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  featureText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginLeft: DharmaDesignSystem.spacing.sm,
  },
});

export default PracticeDetailScreen;