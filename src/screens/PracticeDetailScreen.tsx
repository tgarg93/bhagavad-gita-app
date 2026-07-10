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
import { getPracticeById, SpiritualPractice } from '../data/yogaAndPractices';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';
import journeyService from '../services/journeyService';

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [practice, setPractice] = useState<SpiritualPractice | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    const practiceData = getPracticeById(practiceId);
    setPractice(practiceData || null);

    // Prepare audio segments when practice loads
    if (practiceData) {
      // Journey completion for practices is visit-based (v1 semantics —
      // practices have no paged reader; an end-of-scroll upgrade can come later)
      journeyService.markCompleted(`practice:${practiceData.id}`);
      const audioService = AudioNarrationService.getInstance();
      const content = [
        practiceData.description,
        practiceData.detailedExplanation,
        practiceData.origins,
        ...practiceData.benefits,
        ...practiceData.guidelines,
        ...practiceData.practices.map(p => p.instructions.join(' '))
      ];
      const segments = audioService.parseContentIntoSegments(content);
      setAudioSegments(segments);
    }
  }, [practiceId]);

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
    // Simple scroll to top for now - could be enhanced to scroll to specific segments
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={practice?.name || "Practice Details"}
        subtitle={practice?.sanskritName || practiceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <View style={styles.headerActions}>
            {practice && (
              <AudioControls
                content={[
                  practice.description,
                  practice.detailedExplanation,
                  practice.origins,
                  ...practice.benefits,
                  ...practice.guidelines
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {practice ? (
          <>
            {/* Hero Section */}
            <LinearGradient
              colors={DharmaDesignSystem.colors.gradients.sunriseBlend}
              style={styles.heroSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={getTextStyle(styles.practiceTitle)}>{practice.name}</Text>
              <Text style={getTextStyle(styles.practiceSubtitle)}>{practice.sanskritName}</Text>
              <Text style={getTextStyle(styles.categoryText)}>
                {practice.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {practice.difficulty}
              </Text>
            </LinearGradient>

            {/* Content Sections */}
            <View style={styles.contentSection}>
              <TextHighlighter
                text={practice.description}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.descriptionText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Detailed Explanation</Text>
              <TextHighlighter
                text={practice.detailedExplanation}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            <View style={styles.contentSection}>
              <Text style={getTextStyle(styles.sectionTitle)}>Origins & History</Text>
              <TextHighlighter
                text={practice.origins}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.bodyText)}
              />
            </View>

            {practice.benefits.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Benefits</Text>
                {practice.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={DharmaDesignSystem.colors.primary.deepSaffron}
                    />
                    <TextHighlighter
                      text={benefit}
                      highlightedSegmentId={highlightedSegmentId}
                      segments={audioSegments}
                      style={getTextStyle(styles.benefitText)}
                    />
                  </View>
                ))}
              </View>
            )}

            {practice.guidelines.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Guidelines</Text>
                {practice.guidelines.map((guideline, index) => (
                  <View key={index} style={styles.guidelineItem}>
                    <Ionicons
                      name="arrow-forward-circle"
                      size={20}
                      color={DharmaDesignSystem.colors.primary.peacockTeal}
                    />
                    <TextHighlighter
                      text={guideline}
                      highlightedSegmentId={highlightedSegmentId}
                      segments={audioSegments}
                      style={getTextStyle(styles.guidelineText)}
                    />
                  </View>
                ))}
              </View>
            )}

            {practice.practices.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Practices</Text>
                {practice.practices.map((practiceItem, index) => (
                  <View key={practiceItem.id} style={styles.practiceCard}>
                    <Text style={getTextStyle(styles.practiceItemTitle)}>{practiceItem.name}</Text>
                    <Text style={getTextStyle(styles.practiceItemPurpose)}>{practiceItem.purpose}</Text>
                    <Text style={getTextStyle(styles.practiceItemDuration)}>Duration: {practiceItem.duration}</Text>

                    <Text style={getTextStyle(styles.practiceItemSubheading)}>Instructions:</Text>
                    {practiceItem.instructions.map((instruction, instrIndex) => (
                      <View key={instrIndex} style={styles.instructionItem}>
                        <Text style={getTextStyle(styles.instructionNumber)}>{instrIndex + 1}.</Text>
                        <TextHighlighter
                          text={instruction}
                          highlightedSegmentId={highlightedSegmentId}
                          segments={audioSegments}
                          style={getTextStyle(styles.instructionText)}
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading practice details...</Text>
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
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  practiceSubtitle: {
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: DharmaDesignSystem.spacing.xs,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  benefitText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginLeft: DharmaDesignSystem.spacing.sm,
    flex: 1,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: DharmaDesignSystem.spacing.xs,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  guidelineText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginLeft: DharmaDesignSystem.spacing.sm,
    flex: 1,
  },
  practiceCard: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginBottom: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  practiceItemTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  practiceItemPurpose: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontStyle: 'italic',
  },
  practiceItemDuration: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    marginBottom: DharmaDesignSystem.spacing.sm,
    fontWeight: '500',
  },
  practiceItemSubheading: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  instructionNumber: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
    marginRight: DharmaDesignSystem.spacing.xs,
    minWidth: 20,
  },
  instructionText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    flex: 1,
    lineHeight: 22,
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
});

export default PracticeDetailScreen;