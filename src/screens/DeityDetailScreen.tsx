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
import NarrativeSections from '../components/NarrativeSections';
import SourcesCard from '../components/SourcesCard';
import ChapterReflection from '../components/ChapterReflection';
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

    // Prepare audio segments when deity loads — narrative sections when
    // authored, otherwise the classic description/mythology/significance text
    if (deityData) {
      const audioService = AudioNarrationService.getInstance();
      const content = deityData.sections?.length
        ? deityData.sections
        : [deityData.description, deityData.mythology, deityData.significance];
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
                content={
                  deity.sections?.length
                    ? deity.sections
                    : [deity.description, deity.mythology, deity.significance]
                }
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
                {deity.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                {deity.titles.length > 0 ? ` • ${deity.titles[0]}` : ''}
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

            {/* Immersive narrative when authored (seed content) */}
            {deity.sections && deity.sections.length > 0 && (
              <NarrativeSections
                sections={deity.sections}
                highlightedSegmentId={highlightedSegmentId}
                audioSegments={audioSegments}
                getTextStyle={getTextStyle}
              />
            )}

            {(!deity.sections || deity.sections.length === 0) && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Mythology & Stories</Text>
                <TextHighlighter
                  text={deity.mythology}
                  highlightedSegmentId={highlightedSegmentId}
                  segments={audioSegments}
                  style={getTextStyle(styles.bodyText)}
                />
              </View>
            )}

            {deity.stories.length > 0 && (
              <View style={styles.contentSection}>
                <Text style={getTextStyle(styles.sectionTitle)}>Stories</Text>
                {deity.stories.map(story => (
                  <View key={story.id} style={styles.storyCard}>
                    <Text style={getTextStyle(styles.storyTitle)}>{story.title}</Text>
                    <Text style={getTextStyle(styles.bodyText)}>{story.content}</Text>
                    <View style={styles.moralCard}>
                      <Ionicons name="leaf-outline" size={16} color={DharmaDesignSystem.colors.primary.peacockTeal} />
                      <Text style={getTextStyle(styles.moralText)}>{story.moralLesson}</Text>
                    </View>
                    {story.relatedScripture && (
                      <Text style={styles.storySource}>— {story.relatedScripture}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

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
                    <Text style={getTextStyle(styles.mantraText)}>{mantra.sanskrit}</Text>
                    <Text style={getTextStyle(styles.mantraTransliteration)}>{mantra.transliteration}</Text>
                    <Text style={getTextStyle(styles.mantraMeaning)}>{mantra.meaning}</Text>
                    {mantra.purpose ? (
                      <Text style={styles.mantraPurpose}>{mantra.purpose}</Text>
                    ) : null}
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

            {deity.sources && deity.sources.length > 0 && <SourcesCard sources={deity.sources} />}

            {deity.reflectionQuestions && deity.reflectionQuestions.length > 0 && (
              <View style={styles.reflectionContainer}>
                <ChapterReflection
                  contentType="deity"
                  contentId={deity.id}
                  chapterTitle={deity.name}
                  subtitle={deity.significance}
                  questions={deity.reflectionQuestions}
                />
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
  mantraTransliteration: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    fontWeight: '400',
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: DharmaDesignSystem.spacing.xs,
  },
  mantraMeaning: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    textAlign: 'center',
    marginTop: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  mantraPurpose: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    marginTop: DharmaDesignSystem.spacing.xs,
  },
  storyCard: {
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  storyTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  moralCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(0, 105, 92, 0.06)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginTop: DharmaDesignSystem.spacing.sm,
  },
  moralText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    flex: 1,
    fontStyle: 'italic',
  },
  storySource: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'right',
    marginTop: DharmaDesignSystem.spacing.xs,
  },
  reflectionContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
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