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
import { getScriptureById, Scripture } from '../data/expandedScriptures';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

const ScriptureDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { scriptureId } = (route.params as any) || { scriptureId: 'unknown' };
  const scrollViewRef = useRef<ScrollView>(null);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    const scriptureData = getScriptureById(scriptureId);
    setScripture(scriptureData || null);

    // Prepare audio segments when scripture loads
    if (scriptureData) {
      const audioService = AudioNarrationService.getInstance();
      const content = [
        scriptureData.description,
        scriptureData.detailedDescription,
        scriptureData.historicalContext,
        scriptureData.culturalSignificance,
        scriptureData.philosophicalThemes,
        ...scriptureData.mainThemes,
        scriptureData.teachingsOverview
      ].filter(Boolean);
      const segments = audioService.parseContentIntoSegments(content);
      setAudioSegments(segments);
    }
  }, [scriptureId]);

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
        title={scripture?.name || "Scripture Details"}
        subtitle={scripture?.sanskritName || scriptureId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <View style={styles.headerActions}>
            {scripture && (
              <AudioControls
                content={[
                  scripture.description,
                  scripture.detailedDescription,
                  scripture.historicalContext,
                  scripture.culturalSignificance,
                  scripture.philosophicalThemes,
                  scripture.teachingsOverview
                ].filter(Boolean)}
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
        {scripture ? (
          <>
            <LinearGradient
              colors={DharmaDesignSystem.colors.gradients.goldenHour}
              style={styles.heroSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={getTextStyle(styles.title)}>{scripture.name}</Text>
              <Text style={getTextStyle(styles.subtitle)}>{scripture.sanskritName}</Text>
              <Text style={getTextStyle(styles.categoryText)}>
                {scripture.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {scripture.difficulty}
              </Text>
            </LinearGradient>

            <View style={styles.contentSection}>
              <TextHighlighter
                text={scripture.description}
                highlightedSegmentId={highlightedSegmentId}
                segments={audioSegments}
                style={getTextStyle(styles.descriptionText)}
              />
            </View>

            {scripture.detailedDescription && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Detailed Description</Text>
                <TextHighlighter
                  text={scripture.detailedDescription}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {scripture.historicalContext && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Historical Context</Text>
                <TextHighlighter
                  text={scripture.historicalContext}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {scripture.culturalSignificance && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Cultural Significance</Text>
                <TextHighlighter
                  text={scripture.culturalSignificance}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {scripture.philosophicalThemes && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Philosophical Themes</Text>
                <TextHighlighter
                  text={scripture.philosophicalThemes}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {scripture.teachingsOverview && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Teachings Overview</Text>
                <TextHighlighter
                  text={scripture.teachingsOverview}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {scripture.mainThemes.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Main Themes</Text>
                {scripture.mainThemes.map((theme, index) => (
                  <View key={index} style={styles.themeItem}>
                    <Ionicons
                      name="bookmark-outline"
                      size={20}
                      color={DharmaDesignSystem.colors.primary.deepSaffron}
                    />
                    <TextHighlighter
                      text={theme}
                      highlightedSegmentId={highlightedSegmentId}
                      segments={audioSegments}
                      style={getTextStyle(styles.themeText)}
                    />
                  </View>
                ))}
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading scripture details...</Text>
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
  themeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: DharmaDesignSystem.spacing.xs,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    marginBottom: DharmaDesignSystem.spacing.xs,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.small,
  },
  themeText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginLeft: DharmaDesignSystem.spacing.sm,
    flex: 1,
    fontWeight: '500',
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

export default ScriptureDetailScreen;