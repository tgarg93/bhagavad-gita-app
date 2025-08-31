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
import DharmaSearchHeader from '../components/ui/DharmaSearchHeader';
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
          (navigation as any).navigate('BhagavadGitaComplete');
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

  const formatFestivalDate = (date: string, daysUntil: number) => {
    const festivalDate = new Date(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${monthNames[festivalDate.getMonth()]} ${festivalDate.getDate()}`;
    
    if (daysUntil === 0) return `${formattedDate} • Today`;
    if (daysUntil === 1) return `${formattedDate} • Tomorrow`;
    if (daysUntil > 0) return `${formattedDate} • in ${daysUntil} days`;
    if (daysUntil === -1) return `${formattedDate} • Yesterday`;
    return `${formattedDate} • ${Math.abs(daysUntil)} days ago`;
  };

  const renderContentCard = ({ item }: { item: ContentCard }) => {
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'beginner': return DharmaDesignSystem.colors.primary.turmericYellow;
        case 'intermediate': return DharmaDesignSystem.colors.primary.peacockTeal;
        case 'advanced': return DharmaDesignSystem.colors.primary.deepSaffron;
        default: return DharmaDesignSystem.colors.neutrals.softAsh;
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
          
          {/* Festival Date for festival category */}
          {item.category === 'festivals' && item.festivalDate && item.daysUntil !== undefined && (
            <Text style={styles.festivalDate} numberOfLines={1}>
              {formatFestivalDate(item.festivalDate, item.daysUntil)}
            </Text>
          )}
          
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.description}
          </Text>
          
          {/* Reading Time */}
          <View style={styles.cardMeta}>
            {item.estimatedTime && (
              <View style={styles.readingTimeContainer}>
                <Ionicons name="time-outline" size={14} color={DharmaDesignSystem.colors.primary.deepSaffron} />
                <Text style={styles.readingTimeText}>{item.estimatedTime}</Text>
              </View>
            )}
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
              color={DharmaDesignSystem.colors.primary.deepSaffron} 
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
            <Ionicons name="chevron-forward" size={16} color={DharmaDesignSystem.colors.primary.deepSaffron} />
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
      <DharmaSearchHeader
        title="Learn"
        searchPlaceholder="Search scriptures, festivals, deities..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentSpacer} />
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
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: DharmaDesignSystem.spacing.xl,
  },
  contentSpacer: {
    height: DharmaDesignSystem.spacing.sm,
  },
  section: {
    marginBottom: DharmaDesignSystem.spacing.lg,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
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
    color: DharmaDesignSystem.colors.primary.deepSaffron,
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
    backgroundColor: DharmaDesignSystem.colors.primary.turmericYellow,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    marginBottom: DharmaDesignSystem.spacing.xs,
    lineHeight: 22,
  },
  cardSanskrit: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    color: DharmaDesignSystem.colors.primary.turmericYellow,
    marginBottom: DharmaDesignSystem.spacing.sm,
    fontSize: 13,
  },
  cardDescription: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    lineHeight: 20,
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  cardMeta: {
    alignItems: 'flex-end',
  },
  readingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readingTimeText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginLeft: DharmaDesignSystem.spacing.xs / 2,
    fontSize: 12,
    fontWeight: '500',
  },
  festivalDate: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontSize: 12,
    fontWeight: '600',
  },
  searchResultsContainer: {
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  searchResultsTitle: {
    ...DharmaDesignSystem.typography.sizes.headingSM,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
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
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
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