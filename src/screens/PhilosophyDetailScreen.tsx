import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';
import AudioControls from '../components/AudioControls';
import NarrativeSections from '../components/NarrativeSections';
import SourcesCard from '../components/SourcesCard';
import ChapterReflection from '../components/ChapterReflection';
import { getPhilosophyById, PhilosophicalConcept } from '../data/philosophyAndTeachings';
import { AudioNarrationService, TextSegment } from '../services/audioNarrationService';

const { width, height } = Dimensions.get('window');

const PhilosophyDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { conceptId } = (route.params as any) || { conceptId: 'dharma' };
  const scrollViewRef = useRef<ScrollView>(null);
  const [concept, setConcept] = useState<PhilosophicalConcept | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionPositions, setSectionPositions] = useState<{[key: number]: number}>({});
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null);
  const [audioSegments, setAudioSegments] = useState<TextSegment[]>([]);
  const [showAudioControls, setShowAudioControls] = useState(false);

  useEffect(() => {
    const conceptData = getPhilosophyById(conceptId);
    setConcept(conceptData || null);
    
    // Prepare audio segments when concept loads
    if (conceptData?.sections) {
      const audioService = AudioNarrationService.getInstance();
      const segments = audioService.parseContentIntoSegments(conceptData.sections);
      setAudioSegments(segments);
    }
  }, [conceptId]);

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

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    let currentSectionInView = 0;
    Object.keys(sectionPositions).forEach(sectionNum => {
      const sectionY = sectionPositions[parseInt(sectionNum)];
      if (scrollY >= sectionY - 100) {
        currentSectionInView = parseInt(sectionNum);
      }
    });
    
    if (currentSectionInView !== currentSection) {
      setCurrentSection(currentSectionInView);
    }
  };

  const onSectionLayout = (sectionIndex: number) => (event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({
      ...prev,
      [sectionIndex]: y
    }));
  };

  const handleTextHighlight = (segmentId: string, segmentIndex: number) => {
    setHighlightedSegmentId(segmentId);
  };

  const handleScrollToSegment = (segmentIndex: number) => {
    const segment = audioSegments[segmentIndex];
    if (!segment || !concept?.sections) return;

    // Find which section this segment belongs to
    const sectionMatch = segment.id.match(/section-(\d+)/);
    if (sectionMatch) {
      const sectionIndex = parseInt(sectionMatch[1]);
      const sectionY = sectionPositions[sectionIndex];
      if (sectionY !== undefined && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: sectionY - 100, animated: true });
      }
    }
  };

  if (!concept) {
    return (
      <SafeAreaView style={styles.container}>
        <DharmaHeader
          title="Loading..."
          subtitle="Philosophy"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading concept...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getCurrentSectionTitle = () => {
    if (concept.sections && concept.sections.length > 0 && currentSection < concept.sections.length) {
      return concept.sections[currentSection]?.title || concept.name;
    }
    return concept.name;
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={getCurrentSectionTitle()}
        subtitle={concept.name}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <View style={styles.headerActions}>
            <AudioControls
              content={concept.sections || []}
              onTextHighlight={handleTextHighlight}
              onScrollToSegment={handleScrollToSegment}
              compact={true}
            />
            <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
              <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {showAudioControls && (
          <AudioControls
            content={concept.sections || []}
            onTextHighlight={handleTextHighlight}
            onScrollToSegment={handleScrollToSegment}
          />
        )}
        <View style={styles.titleSection}>
          <Text style={getTextStyle(styles.mainTitle)}>{concept.name}</Text>
          <Text style={getTextStyle(styles.sanskritMainTitle)}>{concept.sanskritName}</Text>
          <Text style={getTextStyle(styles.descriptionText)}>{concept.description}</Text>
        </View>

        {/* Render narrative sections if available, otherwise fallback to structured content */}
        {concept.sections && concept.sections.length > 0 ? (
          <NarrativeSections
            sections={concept.sections}
            highlightedSegmentId={highlightedSegmentId}
            audioSegments={audioSegments}
            getTextStyle={getTextStyle}
            onSectionLayout={onSectionLayout}
          />
        ) : (
          <View style={styles.fallbackContent}>
            <Text style={getTextStyle(styles.storyText)}>{concept.detailedExplanation}</Text>
          </View>
        )}

        {concept.sources && concept.sources.length > 0 && <SourcesCard sources={concept.sources} />}

        {concept.reflectionQuestions && concept.reflectionQuestions.length > 0 && (
          <View style={styles.reflectionContainer}>
            <ChapterReflection
              contentType="concept"
              contentId={concept.id}
              chapterTitle={concept.name}
              subtitle={concept.description}
              questions={concept.reflectionQuestions}
            />
          </View>
        )}

        <View style={styles.bottomSpacer} />
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
    padding: DharmaDesignSystem.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingVertical: DharmaDesignSystem.spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 107, 53, 0.1)',
    marginBottom: DharmaDesignSystem.spacing.lg,
  },
  mainTitle: {
    ...DharmaDesignSystem.typography.sizes.headingXL,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  sanskritMainTitle: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  descriptionText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'justify',
  },
  fallbackContent: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
  },
  reflectionContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
  },
  bottomSpacer: {
    height: DharmaDesignSystem.spacing.xxl,
  },
});

export default PhilosophyDetailScreen;