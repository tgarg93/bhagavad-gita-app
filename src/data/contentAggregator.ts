// Content Aggregator for Dharma App
// Centralized system to combine all content types into unified interface

import { ContentCard, ContentSection, ContentCategory } from '../types/contentTypes';
import { PRAYERS, lessonCount } from './prayers';
import { getStoriesByCollection, Story } from './stories';
import { expandedScripturesData } from './expandedScriptures';
import { getMajorFestivals } from './festivals';
import { getAllDeities } from './godsAndDeities';
import { getCoreConceptsData, getEthicalValuesData, getSpiritualPathsData } from './philosophyAndTeachings';
import { getYogaPathsData, getBeginnerPractices } from './yogaAndPractices';

// Convert data to unified ContentCard format
const convertPrayersToCards = (): ContentCard[] => {
  try {
    return PRAYERS.map(prayer => ({
      id: prayer.id,
      title: prayer.title,
      description: prayer.subtitle,
      category: 'mantras' as ContentCategory,
      difficulty: 'beginner' as const,
      heroImage: prayer.coverImage,
      iconImage: prayer.coverImage,
      tags: [prayer.language, prayer.attribution],
      estimatedTime: `${lessonCount(prayer)} lesson${lessonCount(prayer) === 1 ? '' : 's'}`,
      progress: 0,
      isFavorite: false,
      isNew: true,
    }));
  } catch (error) {
    console.log('Error converting prayers:', error);
    return [];
  }
};

const convertStoriesToCards = (stories: Story[]): ContentCard[] => {
  try {
    return stories.map(story => ({
      id: story.id,
      title: story.title,
      sanskritName: story.sanskritTitle,
      description: story.subtitle,
      category: 'stories' as ContentCategory,
      difficulty: 'beginner' as const,
      heroImage: story.coverImage,
      iconImage: story.coverImage,
      tags: [story.collection === 'upanishad' ? 'Upanishad' : 'Katha'],
      estimatedTime: `${story.sections.length} parts`,
      progress: 0,
      isFavorite: false,
      isNew: false,
    }));
  } catch (error) {
    console.log('Error converting stories:', error);
    return [];
  }
};

const convertScripturesToCards = (): ContentCard[] => {
  try {
    return expandedScripturesData.map(scripture => ({
      id: scripture.id,
      title: scripture.name,
      sanskritName: scripture.sanskritName,
      description: scripture.description,
      category: 'scriptures' as ContentCategory,
      difficulty: scripture.difficulty,
      heroImage: scripture.images.heroImage,
      iconImage: scripture.images.iconImage,
      tags: scripture.mainThemes,
      estimatedTime: scripture.readingGuide.timeCommitment.total,
      progress: 0, // Will be populated from user data
      isFavorite: false, // Will be populated from user data
      isNew: false
    }));
  } catch (error) {
    console.log('Error converting scriptures:', error);
    return [];
  }
};

const convertFestivalsToCards = (): ContentCard[] => {
  try {
    const today = new Date();
    return getMajorFestivals().map(festival => {
      const festivalStartDate = new Date(festival.date);
      const festivalEndDate = new Date(festivalStartDate.getTime() + ((festival.duration - 1) * 24 * 60 * 60 * 1000));
      const daysUntilStart = Math.ceil((festivalStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const daysUntilEnd = Math.ceil((festivalEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // Check if festival is currently ongoing
      const isOngoing = today >= festivalStartDate && today <= festivalEndDate;

      return {
        id: festival.id,
        title: festival.name,
        sanskritName: festival.sanskritName,
        description: festival.significance,
        category: 'festivals' as ContentCategory,
        difficulty: 'beginner' as const,
        heroImage: (festival as any).heroImageUrl || require('../../assets/images/covers/generic-cover.jpg'),
        iconImage: '/images/festivals/festival-icon.jpg',
        tags: [festival.type, festival.importance],
        estimatedTime: `${festival.duration} day${festival.duration > 1 ? 's' : ''}`,
        progress: 0,
        isFavorite: false,
        isNew: isOngoing || Math.abs(daysUntilStart) <= 7, // Mark as new if ongoing or within 7 days
        festivalDate: festival.date,
        daysUntil: isOngoing ? daysUntilEnd : daysUntilStart, // Days until end if ongoing, otherwise days until start
        isOngoing: isOngoing
      };
    });
  } catch (error) {
    console.log('Error converting festivals:', error);
    return [];
  }
};

const convertDeitiesToCards = (): ContentCard[] => {
  try {
    return getAllDeities().map(deity => ({
      id: deity.id,
      title: deity.name,
      sanskritName: deity.sanskritName,
      description: deity.description,
      category: 'deities' as ContentCategory,
      difficulty: 'beginner' as const,
      heroImage: deity.images.heroImage,
      iconImage: deity.images.iconImage,
      tags: deity.attributes,
      estimatedTime: '30-45 minutes',
      progress: 0,
      isFavorite: false,
      isNew: false
    }));
  } catch (error) {
    console.log('Error converting deities:', error);
    return [];
  }
};

const convertPhilosophyToCards = (): ContentCard[] => {
  try {
    const coreConceptsCards = getCoreConceptsData().map(concept => ({
      id: concept.id,
      title: concept.name,
      sanskritName: concept.sanskritName,
      description: concept.description,
      category: 'philosophy' as ContentCategory,
      difficulty: concept.difficulty,
      heroImage: concept.images.heroImage,
      iconImage: concept.images.iconImage,
      tags: concept.keyAspects.slice(0, 3), // Take first 3 aspects as tags
      estimatedTime: concept.audioGuide.duration,
      progress: 0,
      isFavorite: false,
      isNew: false
    }));

    const ethicalValuesCards = getEthicalValuesData().map(concept => ({
      id: concept.id,
      title: concept.name,
      sanskritName: concept.sanskritName,
      description: concept.description,
      category: 'philosophy' as ContentCategory,
      difficulty: concept.difficulty,
      heroImage: concept.images.heroImage,
      iconImage: concept.images.iconImage,
      tags: concept.keyAspects.slice(0, 3),
      estimatedTime: concept.audioGuide.duration,
      progress: 0,
      isFavorite: false,
      isNew: false
    }));

    const spiritualPathsCards = getSpiritualPathsData().map(concept => ({
      id: concept.id,
      title: concept.name,
      sanskritName: concept.sanskritName,
      description: concept.description,
      category: 'philosophy' as ContentCategory,
      difficulty: concept.difficulty,
      heroImage: concept.images.heroImage,
      iconImage: concept.images.iconImage,
      tags: concept.keyAspects.slice(0, 3),
      estimatedTime: concept.audioGuide.duration,
      progress: 0,
      isFavorite: false,
      isNew: false
    }));

    return [...coreConceptsCards, ...spiritualPathsCards, ...ethicalValuesCards];
  } catch (error) {
    console.log('Error converting philosophy:', error);
    return [];
  }
};

const convertPracticesToCards = (): ContentCard[] => {
  try {
    const yogaPathsCards = getYogaPathsData().map(practice => ({
      id: practice.id,
      title: practice.name,
      sanskritName: practice.sanskritName,
      description: practice.description,
      category: 'practices' as ContentCategory,
      difficulty: practice.difficulty,
      heroImage: practice.images.heroImage,
      iconImage: practice.images.iconImage,
      tags: practice.benefits.slice(0, 3), // Take first 3 benefits as tags
      estimatedTime: practice.timeCommitment.recommended,
      progress: 0,
      isFavorite: false,
      isNew: false
    }));

    const beginnerPracticesCards = getBeginnerPractices()
      .filter(practice => practice.category !== 'yoga_paths') // Avoid duplicates
      .map(practice => ({
        id: practice.id,
        title: practice.name,
        sanskritName: practice.sanskritName,
        description: practice.description,
        category: 'practices' as ContentCategory,
        difficulty: practice.difficulty,
        heroImage: practice.images.heroImage,
        iconImage: practice.images.iconImage,
        tags: practice.benefits.slice(0, 3),
        estimatedTime: practice.timeCommitment.recommended,
        progress: 0,
        isFavorite: false,
        isNew: false
      }));

    return [...yogaPathsCards, ...beginnerPracticesCards];
  } catch (error) {
    console.log('Error converting practices:', error);
    return [];
  }
};

// Main content sections for the homepage
export const getContentSections = (): ContentSection[] => {
  try {
    return [
      {
        id: 'philosophy-section',
        title: 'Core Concepts',
        description: 'Essential foundations of dharmic living',
        icon: 'bulb-outline',
        cards: convertPhilosophyToCards(),
      },
      {
        id: 'prayers-section',
        title: 'Prayers & Mantras',
        description: 'Learn the words, verse by verse',
        icon: 'flame-outline',
        cards: convertPrayersToCards(),
      },
      {
        id: 'scriptures-section',
        title: 'Scriptures & Epics',
        description: 'Ancient wisdom texts and sacred stories',
        icon: 'library-outline',
        cards: convertScripturesToCards(),
      },
      {
        id: 'upanishad-stories-section',
        title: 'Stories of the Upanishads',
        description: 'The dialogues where the great ideas were born',
        icon: 'sparkles-outline',
        cards: convertStoriesToCards(getStoriesByCollection('upanishad')),
      },
      {
        id: 'kathas-section',
        title: 'Timeless Kathas',
        description: 'The stories told for a thousand years',
        icon: 'book-outline',
        cards: convertStoriesToCards(getStoriesByCollection('katha')),
      },
      {
        id: 'deities-section',
        title: 'Gods',
        description: 'Divine forms and their teachings',
        icon: 'flower-outline',
        cards: convertDeitiesToCards(),
      },
      {
        id: 'practices-section',
        title: 'Practices',
        description: 'Paths and techniques for spiritual growth',
        icon: 'leaf-outline',
        cards: convertPracticesToCards(),
      },
      {
        id: 'festivals-section',
        title: 'Festivals',
        description: 'Sacred celebrations and their meanings',
        icon: 'calendar-outline',
        cards: convertFestivalsToCards(),
      }
    ];
  } catch (error) {
    console.log('Error getting content sections:', error);
    return [];
  }
};

// Get all content as flat list for search
export const getAllContent = (): ContentCard[] => {
  const sections = getContentSections();
  return sections.reduce((allContent, section) => {
    return [...allContent, ...section.cards];
  }, [] as ContentCard[]);
};

// Get content by category
export const getContentByCategory = (category: ContentCategory): ContentCard[] => {
  return getAllContent().filter(card => card.category === category);
};

// Get featured content (mix from all categories)
export const getFeaturedContent = (): ContentCard[] => {
  const allContent = getAllContent();
  
  // Take 2 items from each category, prioritizing beginner-friendly content
  const featured: ContentCard[] = [];
  const categories: ContentCategory[] = ['scriptures', 'festivals', 'deities', 'philosophy', 'practices'];
  
  categories.forEach(category => {
    const categoryContent = allContent
      .filter(card => card.category === category)
      .filter(card => card.difficulty === 'beginner' || card.difficulty === 'intermediate')
      .slice(0, 2);
    featured.push(...categoryContent);
  });
  
  return featured;
};

// Search functionality
export const searchContent = (query: string, categories?: ContentCategory[]): ContentCard[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  let content = getAllContent();
  
  // Filter by categories if provided
  if (categories && categories.length > 0) {
    content = content.filter(card => categories.includes(card.category));
  }
  
  // Search in title, description, tags, and sanskritName
  return content.filter(card => {
    const titleMatch = card.title.toLowerCase().includes(searchTerm);
    const descMatch = card.description.toLowerCase().includes(searchTerm);
    const tagMatch = card.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    const sanskritMatch = card.sanskritName?.toLowerCase().includes(searchTerm);
    
    return titleMatch || descMatch || tagMatch || sanskritMatch;
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
    return bTitle - aTitle;
  });
};

// Get recommendations based on user activity
export const getRecommendations = (userInterests: string[] = [], currentContentId?: string): ContentCard[] => {
  const allContent = getAllContent();
  
  if (userInterests.length === 0) {
    return getFeaturedContent();
  }
  
  // Score content based on tag matches with user interests
  const scored = allContent.map(card => {
    const score = card.tags.reduce((acc, tag) => {
      return acc + (userInterests.includes(tag.toLowerCase()) ? 1 : 0);
    }, 0);
    return { card, score };
  });
  
  // Sort by score and take top recommendations
  return scored
    .filter(item => item.score > 0 && item.card.id !== currentContentId)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(item => item.card);
};

// Get content progress summary
export const getProgressSummary = (userProgress: { [contentId: string]: number }) => {
  const allContent = getAllContent();
  const completedContent = Object.keys(userProgress).filter(id => userProgress[id] === 100);
  const inProgressContent = Object.keys(userProgress).filter(id => userProgress[id] > 0 && userProgress[id] < 100);
  
  return {
    totalContent: allContent.length,
    completedCount: completedContent.length,
    inProgressCount: inProgressContent.length,
    completionPercentage: Math.round((completedContent.length / allContent.length) * 100),
    byCategory: {
      scriptures: allContent.filter(c => c.category === 'scriptures').length,
      festivals: allContent.filter(c => c.category === 'festivals').length,
      deities: allContent.filter(c => c.category === 'deities').length,
      philosophy: allContent.filter(c => c.category === 'philosophy').length,
      practices: allContent.filter(c => c.category === 'practices').length
    }
  };
};

// Every function above is already declared `export const` — this block re-exported
// them a second time, which is a hard error under both tsc and esbuild (Metro's
// Babel pipeline happened to tolerate it, which is why it shipped). It accounted
// for 21 of the repo's tsc baseline errors.

// Also export as default object
export default {
  getContentSections,
  getAllContent,
  getContentByCategory,
  getFeaturedContent,
  searchContent,
  getRecommendations,
  getProgressSummary
};