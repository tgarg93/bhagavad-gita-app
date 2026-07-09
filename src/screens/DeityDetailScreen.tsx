import React, { useState, useRef, useEffect } from 'react';
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
import AudioControls from '../components/AudioControls';
import TextHighlighter from '../components/TextHighlighter';
import { getDeityById, Deity } from '../data/godsAndDeities';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

const DeityDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { deityId } = (route.params as any) || { deityId: 'unknown' };
  const scrollViewRef = useRef<ScrollView>(null);
  const [deity, setDeity] = useState<Deity | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    const deityData = getDeityById(deityId);
    setDeity(deityData || null);

    // Prepare audio segments when deity loads
    if (deityData) {
      const audioService = AudioNarrationService.getInstance();
      const content = [
        deityData.description,
        deityData.detailedDescription,
        deityData.mythology,
        deityData.worship,
        deityData.significance,
        ...deityData.mantras,
        ...deityData.attributes
      ];
      const segments = audioService.parseContentIntoSegments(content);
      setAudioSegments(segments);
    }
  }, [deityId]);

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const getTextStyle = (baseStyle: any) => {
    const multiplier = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.15 : 1;
    return {
      ...baseStyle,
      fontSize: baseStyle.fontSize * multiplier,
      lineHeight: baseStyle.lineHeight * multiplier,
    };
  };

  const handleTextHighlight = (segmentId: string, segmentIndex: number) => {
    setHighlightedSegmentId(segmentId);
  };

  const handleScrollToSegment = (segmentIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={deity?.name || "Deity Details"}
        subtitle={deity?.sanskritName || deityId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <View style={styles.headerActions}>
            {deity && (
              <AudioControls
                content={[
                  deity.description,
                  deity.detailedDescription,
                  deity.mythology,
                  deity.worship,
                  deity.significance
                ]}
                onTextHighlight={handleTextHighlight}
                onScrollToSegment={handleScrollToSegment}
                compact={true}
              />
            )}
            <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
              <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {deity ? (
          <>
            <LinearGradient
              colors={DharmaDesignSystem.colors.gradients.twilightWisdom}
              style={styles.heroSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={getTextStyle(styles.title)}>{deity.name}</Text>
              <Text style={getTextStyle(styles.subtitle)}>{deity.sanskritName}</Text>
              <Text style={getTextStyle(styles.categoryText)}>
                {deity.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {deity.domain}
              </Text>
            </LinearGradient>

            <View style={styles.contentSection}>
              <TextHighlighter
                text={deity.description}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.descriptionText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Detailed Description</Text>
              <TextHighlighter
                text={deity.detailedDescription}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Mythology & Stories</Text>
              <TextHighlighter
                text={deity.mythology}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Worship & Devotion</Text>
              <TextHighlighter
                text={deity.worship}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Spiritual Significance</Text>
              <TextHighlighter
                text={deity.significance}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            {deity.mantras.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Sacred Mantras</Text>
                {deity.mantras.map((mantra, index) => (
                  <View key={index} style={styles.mantraCard}>
                    <TextHighlighter
                      text={mantra}
                      highlightedSegmentId={highlightedSegmentId}
                      segments={audioSegments}
                      style={getTextStyle(styles.mantraText)}
                    />
                  </View>
                ))}
              </View>
            )}

            {deity.attributes.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Divine Attributes</Text>
                {deity.attributes.map((attribute, index) => (
                  <View key={index} style={styles.attributeItem}>
                    <Ionicons
                      name="star-outline"
                      size={20}
                      color={DharmaDesignSystem.colors.primary.deepSaffron}
                    />
                    <TextHighlighter
                      text={attribute}
                      highlightedSegmentId={highlightedSegmentId}
                      segments={audioSegments}
                      style={getTextStyle(styles.attributeText)}
                    />
                  </View>
                ))}
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading deity details...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.xs,
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
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
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  subtitle: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.neutrals.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  categoryText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.white,
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  contentSection: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xl,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.md,
    fontWeight: '600',
  },
  descriptionText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 28,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  bodyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    textAlign: 'justify',
  },
  mantraCard: {
    backgroundColor: 'rgba(255, 193, 7, 0.05)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginBottom: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.turmericYellow,
  },
  mantraText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    textAlign: 'center',
    fontWeight: '500',
  },
  attributeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: DharmaDesignSystem.spacing.xs,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  attributeText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginLeft: DharmaDesignSystem.spacing.sm,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.xxl,
  },
  loadingText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  bottomSpacer: {
    height: DharmaDesignSystem.spacing.xxl,
  },
});

export default DeityDetailScreen;