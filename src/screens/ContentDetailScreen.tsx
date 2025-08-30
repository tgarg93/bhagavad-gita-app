import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaColors } from '../constants/colors';
import { ContentCard, ContentCategory } from '../types/contentTypes';

// Import data sources
import { getScriptureById } from '../data/expandedScriptures';
import { getDeityById } from '../data/godsAndDeities';
import { getPhilosophyById } from '../data/philosophyAndTeachings';
import { getPracticeById } from '../data/yogaAndPractices';

const { width } = Dimensions.get('window');

interface RouteParams {
  contentId: string;
  category: ContentCategory;
}

const ContentDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { contentId, category } = route.params as RouteParams;
  
  const [content, setContent] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [contentId, category]);

  const loadContent = () => {
    setIsLoading(true);
    let data = null;

    switch (category) {
      case 'scriptures':
        data = getScriptureById(contentId);
        break;
      case 'deities':
        data = getDeityById(contentId);
        break;
      case 'philosophy':
        data = getPhilosophyById(contentId);
        break;
      case 'practices':
        data = getPracticeById(contentId);
        break;
      default:
        console.log('Unknown category:', category);
    }

    setContent(data);
    setIsLoading(false);
  };

  const renderOverview = () => {
    if (!content) return null;

    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.descriptionText}>
          {content.description || content.detailedExplanation}
        </Text>

        {content.significance && (
          <>
            <Text style={styles.subSectionTitle}>Significance</Text>
            <Text style={styles.bodyText}>{content.significance}</Text>
          </>
        )}

        {content.keyTeachings && (
          <>
            <Text style={styles.subSectionTitle}>Key Teachings</Text>
            {content.keyTeachings.map((teaching: string, index: number) => (
              <Text key={index} style={styles.bulletText}>• {teaching}</Text>
            ))}
          </>
        )}

        {content.attributes && (
          <>
            <Text style={styles.subSectionTitle}>Attributes</Text>
            <View style={styles.tagsContainer}>
              {content.attributes.map((attr: string, index: number) => (
                <View key={index} style={styles.attributeTag}>
                  <Text style={styles.attributeText}>{attr}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (!content) return null;

    switch (category) {
      case 'scriptures':
        return renderScriptureContent();
      case 'deities':
        return renderDeityContent();
      case 'philosophy':
        return renderPhilosophyContent();
      case 'practices':
        return renderPracticeContent();
      default:
        return renderOverview();
    }
  };

  const renderScriptureContent = () => {
    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Scripture Chapters</Text>
        {content.chapters?.slice(0, 3).map((chapter: any, index: number) => (
          <TouchableOpacity key={index} style={styles.chapterCard}>
            <View style={styles.chapterHeader}>
              <View style={styles.chapterNumber}>
                <Text style={styles.chapterNumberText}>{chapter.number}</Text>
              </View>
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterTitle}>{chapter.name}</Text>
                {chapter.sanskritName && (
                  <Text style={styles.chapterSanskrit}>{chapter.sanskritName}</Text>
                )}
              </View>
            </View>
            <Text style={styles.chapterSummary} numberOfLines={2}>
              {chapter.summary}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Chapters</Text>
          <Ionicons name="chevron-forward" size={16} color={DharmaColors.primary[500]} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDeityContent = () => {
    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Stories & Mythology</Text>
        {content.stories?.slice(0, 2).map((story: any, index: number) => (
          <TouchableOpacity key={index} style={styles.storyCard}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyContent} numberOfLines={3}>
              {story.content}
            </Text>
            <Text style={styles.storyLesson}>Lesson: {story.moralLesson}</Text>
          </TouchableOpacity>
        ))}

        {content.mantras && content.mantras.length > 0 && (
          <>
            <Text style={styles.subSectionTitle}>Sacred Mantras</Text>
            {content.mantras.slice(0, 2).map((mantra: any, index: number) => (
              <View key={index} style={styles.mantraCard}>
                <Text style={styles.mantraSanskrit}>{mantra.sanskrit}</Text>
                <Text style={styles.mantraTransliteration}>{mantra.transliteration}</Text>
                <Text style={styles.mantraMeaning}>{mantra.meaning}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    );
  };

  const renderPhilosophyContent = () => {
    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Practical Applications</Text>
        {content.practicalApplications?.slice(0, 2).map((app: any, index: number) => (
          <View key={index} style={styles.applicationCard}>
            <Text style={styles.applicationSituation}>{app.situation}</Text>
            <Text style={styles.applicationText}>{app.application}</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitsTitle}>Benefits:</Text>
              {app.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                <Text key={idx} style={styles.benefitText}>• {benefit}</Text>
              ))}
            </View>
          </View>
        ))}

        {content.examples && (
          <>
            <Text style={styles.subSectionTitle}>Examples</Text>
            {content.examples.slice(0, 1).map((example: any, index: number) => (
              <View key={index} style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>{example.title}</Text>
                <Text style={styles.exampleScenario}>{example.scenario}</Text>
                <Text style={styles.exampleLesson}>Lesson: {example.lesson}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    );
  };

  const renderPracticeContent = () => {
    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Practice Guide</Text>
        {content.practices?.slice(0, 2).map((practice: any, index: number) => (
          <View key={index} style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>{practice.name}</Text>
            <Text style={styles.practicePurpose}>{practice.purpose}</Text>
            <Text style={styles.practiceDuration}>Duration: {practice.duration}</Text>
            
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            {practice.instructions.slice(0, 3).map((instruction: string, idx: number) => (
              <Text key={idx} style={styles.instructionText}>
                {idx + 1}. {instruction}
              </Text>
            ))}
          </View>
        ))}

        {content.benefits && (
          <>
            <Text style={styles.subSectionTitle}>Benefits</Text>
            <View style={styles.benefitsGrid}>
              {content.benefits.slice(0, 6).map((benefit: string, index: number) => (
                <View key={index} style={styles.benefitCard}>
                  <Text style={styles.benefitCardText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Content not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={DharmaColors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {content.name || content.title}
        </Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={DharmaColors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: content.images?.heroImage || content.heroImage }}
            style={styles.heroImage}
            defaultSource={{ uri: '/images/default-content.jpg' }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroOverlay}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{content.name || content.title}</Text>
            {content.sanskritName && (
              <Text style={styles.heroSanskrit}>{content.sanskritName}</Text>
            )}
            {content.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{content.category.toUpperCase()}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        {renderContent()}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaColors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DharmaColors.background.tertiary,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  favoriteButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: DharmaColors.text.inverse,
    marginBottom: 4,
  },
  heroSanskrit: {
    fontSize: 16,
    fontWeight: '400',
    color: DharmaColors.text.inverse,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: DharmaColors.primary[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
    letterSpacing: 0.5,
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: DharmaColors.text.primary,
    lineHeight: 24,
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 15,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  bulletText: {
    fontSize: 15,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 22,
    marginBottom: 8,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  attributeTag: {
    backgroundColor: DharmaColors.primary[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  attributeText: {
    fontSize: 14,
    fontWeight: '500',
    color: DharmaColors.primary[600],
  },
  chapterCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DharmaColors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chapterNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DharmaColors.text.inverse,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
  },
  chapterSanskrit: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    fontStyle: 'italic',
  },
  chapterSummary: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.primary[500],
    marginRight: 8,
  },
  storyCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: DharmaColors.accent[500],
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  storyLesson: {
    fontSize: 13,
    fontWeight: '500',
    color: DharmaColors.accent[600],
    fontStyle: 'italic',
  },
  mantraCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  mantraSanskrit: {
    fontSize: 18,
    fontWeight: '400',
    color: DharmaColors.primary[500],
    textAlign: 'center',
    marginBottom: 8,
  },
  mantraTransliteration: {
    fontSize: 16,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  mantraMeaning: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.primary,
    textAlign: 'center',
  },
  applicationCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  applicationSituation: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 8,
  },
  applicationText: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    marginBottom: 2,
  },
  exampleCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 8,
  },
  exampleScenario: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  exampleLesson: {
    fontSize: 13,
    fontWeight: '500',
    color: DharmaColors.accent[600],
    fontStyle: 'italic',
  },
  practiceCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 4,
  },
  practicePurpose: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.primary[500],
    marginBottom: 4,
  },
  practiceDuration: {
    fontSize: 13,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 4,
    marginLeft: 8,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 8,
    padding: 12,
    margin: 4,
    flex: 0,
    minWidth: '45%',
  },
  benefitCardText: {
    fontSize: 13,
    fontWeight: '500',
    color: DharmaColors.text.primary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: DharmaColors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: DharmaColors.primary[500],
    textDecorationLine: 'underline',
  },
  bottomPadding: {
    height: 32,
  },
});

export default ContentDetailScreen;