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
import { getPhilosophyById, PhilosophicalConcept, ConceptSection } from '../data/philosophyAndTeachings';

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

  useEffect(() => {
    const conceptData = getPhilosophyById(conceptId);
    setConcept(conceptData || null);
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

  const SanskritVerse = ({ sanskrit, transliteration, meaning }: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  }) => (
    <View style={styles.verseContainer}>
      <Text style={getTextStyle(styles.sanskritText)}>{sanskrit}</Text>
      <Text style={getTextStyle(styles.transliterationText)}>{transliteration}</Text>
      <Text style={getTextStyle(styles.meaningText)}>{meaning}</Text>
    </View>
  );

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

  const renderSection = (section: ConceptSection, index: number) => {
    return (
      <View 
        key={section.id} 
        style={styles.sectionContainer}
        onLayout={onSectionLayout(index)}
      >
        <Text style={getTextStyle(styles.sectionTitle)}>
          {section.title}
        </Text>
        {section.subtitle && (
          <Text style={getTextStyle(styles.sectionSubtitle)}>
            {section.subtitle}
          </Text>
        )}

        {section.openingVerse && (
          <SanskritVerse
            sanskrit={section.openingVerse.sanskrit}
            transliteration={section.openingVerse.transliteration}
            meaning={section.openingVerse.meaning}
          />
        )}

        {section.storyText && (
          <Text style={getTextStyle(styles.storyText)}>
            {section.storyText}
          </Text>
        )}

        {section.sectionHeader && (
          <Text style={getTextStyle(styles.sectionHeader)}>{section.sectionHeader}</Text>
        )}

        {section.keyVerse && (
          <SanskritVerse
            sanskrit={section.keyVerse.sanskrit}
            transliteration={section.keyVerse.transliteration}
            meaning={section.keyVerse.meaning}
          />
        )}

        {section.teachingText && (
          <Text style={getTextStyle(styles.storyText)}>
            {section.teachingText}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={getCurrentSectionTitle()}
        subtitle={concept.name}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
            <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={getTextStyle(styles.mainTitle)}>{concept.name}</Text>
          <Text style={getTextStyle(styles.sanskritMainTitle)}>{concept.sanskritName}</Text>
          <Text style={getTextStyle(styles.descriptionText)}>{concept.description}</Text>
        </View>

        {/* Render narrative sections if available, otherwise fallback to structured content */}
        {concept.sections && concept.sections.length > 0 ? (
          concept.sections.map((section, index) => renderSection(section, index))
        ) : (
          <View style={styles.fallbackContent}>
            <Text style={getTextStyle(styles.storyText)}>{concept.detailedExplanation}</Text>
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
  sectionContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  sectionSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.md,
    textAlign: 'center',
  },
  verseContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.05)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginVertical: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.turmericYellow,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    fontWeight: '500',
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'justify',
  },
  sectionHeader: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginTop: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
    fontWeight: '600',
  },
  fallbackContent: {
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