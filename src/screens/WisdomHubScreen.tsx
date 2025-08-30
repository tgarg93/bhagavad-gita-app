import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem, createTextStyle, createGradientColors } from '../constants/DharmaDesignSystem';
import { getContentSections, getFeaturedContent, searchContent } from '../data/contentAggregator';
import { ContentSection, ContentCard, ContentCategory } from '../types/contentTypes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_SPACING = DharmaDesignSystem.spacing.md;

const WisdomHubScreen: React.FC = () => {
  const navigation = useNavigation();
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [featuredContent, setFeaturedContent] = useState<ContentCard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ContentCard[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchContent(searchQuery);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadContent = () => {
    setSections(getContentSections());
    setFeaturedContent(getFeaturedContent());
  };

  const handleCardPress = (card: ContentCard) => {
    // Navigate to appropriate detail screen based on category
    switch (card.category) {
      case 'scriptures':
        if (card.id === 'bhagavad-gita') {
          (navigation as any).navigate('BhagavadGitaChapters');
        } else {
          (navigation as any).navigate('ScriptureDetail', { scriptureId: card.id });
        }
        break;
      case 'festivals':
        // This will open the festival modal from FestivalCalendarScreen
        (navigation as any).navigate('FestivalCalendar', { selectedFestival: card.id });
        break;
      case 'deities':
        (navigation as any).navigate('DeityDetail', { deityId: card.id });
        break;
      case 'philosophy':
        (navigation as any).navigate('PhilosophyDetail', { conceptId: card.id });
        break;
      case 'practices':
        (navigation as any).navigate('PracticeDetail', { practiceId: card.id });
        break;
      default:
        console.log('Unknown category:', card.category);
    }
  };

  const handleViewAll = (section: ContentSection) => {
    if (section.viewAllRoute) {
      (navigation as any).navigate(section.viewAllRoute);
    }
  };

  const renderContentCard = ({ item }: { item: ContentCard }) => {
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'beginner': return DharmaDesignSystem.colors.primary.marigoldWarm;
        case 'intermediate': return DharmaDesignSystem.colors.sacred.krishnaBlue;
        case 'advanced': return DharmaDesignSystem.colors.primary.saffronSunset;
        default: return DharmaDesignSystem.colors.neutrals.softAsh;
      }
    };

    const getCategoryIcon = (category: ContentCategory) => {
      switch (category) {
        case 'scriptures': return 'library';
        case 'festivals': return 'calendar';
        case 'deities': return 'flower';
        case 'philosophy': return 'bulb';
        case 'practices': return 'leaf';
        default: return 'book';
      }
    };

    return (
      <TouchableOpacity 
        style={styles.contentCard}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardImageContainer}>
          <Image
            source={typeof item.heroImage === 'string' ? { uri: item.heroImage } : item.heroImage}
            style={styles.cardImage}
            defaultSource={{ uri: '/images/default-content.jpg' }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.cardOverlay}
          />
          
          {/* Category Icon */}
          <View style={styles.categoryBadge}>
            <Ionicons 
              name={getCategoryIcon(item.category) as any} 
              size={16} 
              color={DharmaDesignSystem.colors.neutrals.white} 
            />
          </View>

          {/* New Badge */}
          {item.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}

          {/* Progress Indicator */}
          {item.progress && item.progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${item.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{item.progress}%</Text>
            </View>
          )}
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          
          {item.sanskritName && (
            <Text style={styles.cardSanskrit} numberOfLines={1}>
              {item.sanskritName}
            </Text>
          )}
          
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.description}
          </Text>
          
          {/* Tags and Metadata */}
          <View style={styles.cardFooter}>
            <View style={styles.cardTags}>
              {item.tags.slice(0, 2).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.cardMeta}>
              {item.estimatedTime && (
                <Text style={styles.metaText}>{item.estimatedTime}</Text>
              )}
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(item.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>
                  {item.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (section: ContentSection) => {
    return (
      <View key={section.id} style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons 
              name={section.icon as any} 
              size={24} 
              color={DharmaDesignSystem.colors.primary.saffronSunset} 
              style={styles.sectionIcon}
            />
            <View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionDescription}>{section.description}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => handleViewAll(section)}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color={DharmaDesignSystem.colors.primary.saffronSunset} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={section.cards}
          renderItem={renderContentCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>
    );
  };

  const renderSearchResults = () => {
    return (
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>
          Search Results ({searchResults.length})
        </Text>
        <FlatList
          data={searchResults}
          renderItem={renderContentCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Dharma Wisdom</Text>
            <Text style={styles.headerSubtitle}>Your journey to spiritual understanding</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons 
            name="search" 
            size={20} 
            color={DharmaDesignSystem.colors.neutrals.softAsh} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search scriptures, festivals, deities..."
            placeholderTextColor={DharmaDesignSystem.colors.neutrals.softAsh}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color={DharmaDesignSystem.colors.neutrals.softAsh} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Results or Regular Content */}
        {isSearching ? (
          searchResults.length > 0 ? (
            renderSearchResults()
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={48} color={DharmaDesignSystem.colors.neutrals.softAsh} />
              <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
              <Text style={styles.noResultsSubtext}>Try different keywords or browse categories below</Text>
            </View>
          )
        ) : (
          <>
            {/* Featured Content Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Ionicons 
                    name="star" 
                    size={24} 
                    color={DharmaDesignSystem.colors.sacred.lotusPink} 
                    style={styles.sectionIcon}
                  />
                  <View>
                    <Text style={styles.sectionTitle}>Featured</Text>
                    <Text style={styles.sectionDescription}>Curated content for your spiritual journey</Text>
                  </View>
                </View>
              </View>

              <FlatList
                data={featuredContent}
                renderItem={renderContentCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            </View>

            {/* Content Sections */}
            {sections.map(renderSection)}
          </>
        )}
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
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingTop: DharmaDesignSystem.spacing.md,
    paddingBottom: DharmaDesignSystem.spacing.md,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    letterSpacing: 1,
    marginBottom: DharmaDesignSystem.spacing.xs / 2,
  },
  headerSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    letterSpacing: 0.5,
  },
  searchContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.md,
    borderWidth: 1,
    borderColor: DharmaDesignSystem.colors.neutrals.gentleMist,
    ...DharmaDesignSystem.shadows.soft,
  },
  searchIcon: {
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
  },
  clearButton: {
    padding: DharmaDesignSystem.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: DharmaDesignSystem.spacing.xl,
  },
  section: {
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginBottom: DharmaDesignSystem.spacing.xs / 2,
  },
  sectionDescription: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    letterSpacing: 0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.sm,
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.small,
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  viewAllText: {
    ...DharmaDesignSystem.typography.sizes.navText,
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    marginRight: DharmaDesignSystem.spacing.xs,
  },
  cardsContainer: {
    paddingLeft: DharmaDesignSystem.spacing.lg,
    paddingRight: DharmaDesignSystem.spacing.sm,
  },
  contentCard: {
    width: CARD_WIDTH,
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    marginRight: CARD_SPACING,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.08)',
    ...DharmaDesignSystem.shadows.lifted,
  },
  cardImageContainer: {
    height: 180,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  categoryBadge: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.sm,
    left: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(44, 44, 44, 0.75)',
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.sm,
  },
  newBadge: {
    position: 'absolute',
    top: DharmaDesignSystem.spacing.sm,
    right: DharmaDesignSystem.spacing.sm,
    backgroundColor: DharmaDesignSystem.colors.sacred.lotusPink,
    borderRadius: DharmaDesignSystem.borderRadius.small,
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
    paddingVertical: DharmaDesignSystem.spacing.xs / 2,
  },
  newBadgeText: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.neutrals.white,
    fontSize: 9,
  },
  progressContainer: {
    position: 'absolute',
    bottom: DharmaDesignSystem.spacing.sm,
    left: DharmaDesignSystem.spacing.sm,
    right: DharmaDesignSystem.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: DharmaDesignSystem.colors.primary.marigoldWarm,
    borderRadius: 2,
  },
  progressText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.white,
  },
  cardContent: {
    padding: DharmaDesignSystem.spacing.md,
  },
  cardTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    fontWeight: '600',
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginBottom: DharmaDesignSystem.spacing.xs,
    lineHeight: 22,
  },
  cardSanskrit: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    color: DharmaDesignSystem.colors.primary.turmericGold,
    marginBottom: DharmaDesignSystem.spacing.sm,
    fontSize: 13,
  },
  cardDescription: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 20,
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardTags: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.small,
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
    paddingVertical: DharmaDesignSystem.spacing.xs / 2,
    marginRight: DharmaDesignSystem.spacing.xs,
    marginBottom: DharmaDesignSystem.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  tagText: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.primary.saffronSunset,
    fontSize: 10,
  },
  cardMeta: {
    alignItems: 'flex-end',
  },
  metaText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  difficultyBadge: {
    borderRadius: DharmaDesignSystem.borderRadius.small,
    paddingHorizontal: DharmaDesignSystem.spacing.xs,
    paddingVertical: DharmaDesignSystem.spacing.xs / 2,
  },
  difficultyText: {
    ...DharmaDesignSystem.typography.sizes.overline,
    color: DharmaDesignSystem.colors.neutrals.white,
    fontSize: 9,
  },
  searchResultsContainer: {
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  searchResultsTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.xxl,
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
  },
  noResultsText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalInk,
    marginTop: DharmaDesignSystem.spacing.md,
    marginBottom: DharmaDesignSystem.spacing.sm,
    textAlign: 'center',
  },
  noResultsSubtext: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WisdomHubScreen;