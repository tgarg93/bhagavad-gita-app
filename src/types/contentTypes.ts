// Unified Content Types for Dharma App
// Common interfaces for all content categories

export interface ContentCard {
  id: string;
  title: string;
  sanskritName?: string;
  description: string;
  category: ContentCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  heroImage: string | number; // Support both URI strings and require() numbers
  iconImage: string | number;
  tags: string[];
  estimatedTime?: string;
  progress?: number; // 0-100 percentage
  isFavorite?: boolean;
  isNew?: boolean;
}

export interface ContentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  cards: ContentCard[];
  viewAllRoute?: string;
}

export type ContentCategory = 
  | 'scriptures'
  | 'festivals' 
  | 'deities'
  | 'philosophy'
  | 'practices'
  | 'stories'
  | 'mantras'
  | 'temples';

export interface DetailedContent {
  id: string;
  title: string;
  sanskritName?: string;
  category: ContentCategory;
  description: string;
  sections: ContentDetailSection[];
  audioBook?: AudioBookInfo;
  podcasts?: PodcastInfo[];
  relatedContent: string[];
  images: ImageGallery;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime?: string;
  lastUpdated: string;
}

export interface ContentDetailSection {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  duration?: string;
  subsections?: ContentSubsection[];
}

export interface ContentSubsection {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  practicalExercise?: string;
  reflectionQuestions?: string[];
}

export interface AudioBookInfo {
  narrator: string;
  totalDuration: string;
  chapters: AudioChapter[];
  language: 'english' | 'hindi' | 'sanskrit';
}

export interface AudioChapter {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
}

export interface PodcastInfo {
  id: string;
  title: string;
  host: string;
  description: string;
  episodes: PodcastEpisode[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  publishDate: string;
  topics: string[];
}

export interface ImageGallery {
  heroImage: string;
  thumbnails: string[];
  captions?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  category: ContentCategory;
  description: string;
  heroImage: string;
  relevanceScore: number;
  matchedTerms: string[];
}

export interface UserProgress {
  contentId: string;
  category: ContentCategory;
  progressPercentage: number;
  lastAccessed: string;
  completedSections: string[];
  bookmarkedSections: string[];
  notes: UserNote[];
}

export interface UserNote {
  id: string;
  sectionId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

export interface Bookmark {
  id: string;
  contentId: string;
  sectionId?: string;
  category: ContentCategory;
  title: string;
  createdAt: string;
  tags: string[];
}

// Navigation and UI Types
export interface NavigationState {
  currentSection: ContentCategory | null;
  breadcrumbs: BreadcrumbItem[];
  selectedContent: string | null;
}

export interface BreadcrumbItem {
  title: string;
  route: string;
  isActive: boolean;
}

export interface FilterOptions {
  categories: ContentCategory[];
  difficulties: ('beginner' | 'intermediate' | 'advanced')[];
  tags: string[];
  hasAudio: boolean;
  hasPodcasts: boolean;
  isCompleted?: boolean;
  isFavorite?: boolean;
}

export interface SortOptions {
  field: 'title' | 'difficulty' | 'progress' | 'lastAccessed' | 'relevance';
  direction: 'asc' | 'desc';
}