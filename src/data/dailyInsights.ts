// Daily Insights Data Structure for Dharma App
// Contains wisdom, quotes, practices, and spiritual guidance

import { Verse } from '../types/content';

export interface DailyInsight {
  id: string;
  date: string; // YYYY-MM-DD format
  type: 'verse' | 'wisdom' | 'practice' | 'reflection';
  title: string;
  content: string;
  sanskrit?: string;
  translation?: string;
  source: string; // Scripture or teacher source
  category: DailyCategory;
  meditation?: string; // Guided meditation text
  action?: string; // Daily action to practice
  tags: string[];
  imageUrl?: string;
}

export type DailyCategory = 
  | 'dharma' 
  | 'karma' 
  | 'bhakti' 
  | 'jnana' 
  | 'peace' 
  | 'service' 
  | 'wisdom' 
  | 'compassion' 
  | 'detachment' 
  | 'devotion';

export interface WeeklyTheme {
  week: number; // Week of year
  theme: string;
  description: string;
  focus: DailyCategory;
  scripture: string;
  practices: string[];
}

export interface MonthlyReflection {
  month: number; // 1-12
  year: number;
  theme: string;
  overview: string;
  keyLessons: string[];
  practices: string[];
  scripture: string;
}

// Sample daily insights data
export const dailyInsightsData: DailyInsight[] = [
  {
    id: 'insight-2025-01-01',
    date: '2025-01-01',
    type: 'verse',
    title: 'New Beginnings with Divine Grace',
    content: 'As we begin this new year, remember that every moment offers a fresh start. The divine grace of Krishna guides us toward righteousness and inner peace.',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    translation: 'You have the right to perform your prescribed duty, but not to the fruits of action',
    source: 'Bhagavad Gita 2.47',
    category: 'dharma',
    meditation: 'Sit quietly and reflect on your intentions for this year. Ask Krishna to guide your actions toward dharma.',
    action: 'Set one spiritual goal for today and dedicate its success to the Divine.',
    tags: ['new year', 'dharma', 'intention', 'divine grace'],
  },
  {
    id: 'insight-2025-01-02',
    date: '2025-01-02',
    type: 'wisdom',
    title: 'The Power of Self-Discipline',
    content: 'True freedom comes not from doing whatever we want, but from disciplining our minds and senses toward higher purposes.',
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्',
    translation: 'One should lift up the self by the self and not degrade the self',
    source: 'Bhagavad Gita 6.5',
    category: 'wisdom',
    meditation: 'Observe your thoughts without judgment. Notice how discipline in small things leads to greater inner strength.',
    action: 'Practice one small act of self-discipline today, such as mindful eating or speech.',
    tags: ['discipline', 'mind control', 'freedom', 'self-mastery'],
  },
  {
    id: 'insight-2025-01-03',
    date: '2025-01-03',
    type: 'practice',
    title: 'Cultivating Gratitude',
    content: 'Gratitude transforms ordinary moments into sacred experiences. When we appreciate the divine gifts around us, our hearts naturally open to love.',
    sanskrit: 'कृतज्ञता सर्वगुणानां मूलम्',
    translation: 'Gratitude is the root of all virtues',
    source: 'Chanakya Niti 15.6',
    category: 'devotion',
    meditation: 'Before sleep, mentally thank the Divine for three specific blessings from your day.',
    action: 'Express genuine gratitude to someone who has helped you recently.',
    tags: ['gratitude', 'devotion', 'appreciation', 'sacred living'],
  },
  {
    id: 'insight-2025-01-04',
    date: '2025-01-04',
    type: 'reflection',
    title: 'Seeing Unity in Diversity',
    content: 'The same divine consciousness that flows through you flows through every being. When we see this unity, compassion naturally arises.',
    sanskrit: 'सर्वभूतेषु चात्मानं सर्वभूतानि चात्मनि',
    translation: 'One who sees the Self in all beings and all beings in the Self',
    source: 'Bhagavad Gita 6.29',
    category: 'compassion',
    meditation: 'Look into someone\'s eyes today and silently acknowledge the divine presence within them.',
    action: 'Practice treating everyone you meet as a reflection of the Divine.',
    tags: ['unity', 'compassion', 'divine consciousness', 'equality'],
  },
  {
    id: 'insight-2025-01-05',
    date: '2025-01-05',
    type: 'wisdom',
    title: 'The Art of Letting Go',
    content: 'Attachment to outcomes creates suffering. When we perform our duties with devotion but surrender the results to the Divine, we find peace.',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
    translation: 'Abandon all varieties of dharma and just surrender unto Me',
    source: 'Bhagavad Gita 18.66',
    category: 'detachment',
    meditation: 'Identify one worry or attachment. Visualize placing it in Krishna\'s hands with complete trust.',
    action: 'Do your best work today, then consciously release attachment to the outcome.',
    tags: ['detachment', 'surrender', 'peace', 'trust'],
  },
];

// Weekly themes for 2025
export const weeklyThemes: WeeklyTheme[] = [
  {
    week: 1,
    theme: 'New Beginnings & Sacred Intentions',
    description: 'Start the year by aligning your actions with dharmic principles',
    focus: 'dharma',
    scripture: 'Bhagavad Gita Chapter 2',
    practices: ['Morning intention setting', 'Evening self-reflection', 'Mindful action'],
  },
  {
    week: 2,
    theme: 'Cultivating Inner Discipline',
    description: 'Develop the mental strength needed for spiritual growth',
    focus: 'wisdom',
    scripture: 'Bhagavad Gita Chapter 6',
    practices: ['Meditation practice', 'Mindful eating', 'Speech awareness'],
  },
  {
    week: 3,
    theme: 'Opening the Heart to Devotion',
    description: 'Experience the joy and peace that comes from loving the Divine',
    focus: 'bhakti',
    scripture: 'Bhagavad Gita Chapter 12',
    practices: ['Kirtan or chanting', 'Gratitude practice', 'Loving kindness meditation'],
  },
  {
    week: 4,
    theme: 'Service as Spiritual Practice',
    description: 'Transform everyday actions into offerings to the Divine',
    focus: 'service',
    scripture: 'Bhagavad Gita Chapter 3',
    practices: ['Selfless service', 'Seeing divine in all', 'Offering fruits of action'],
  },
];

// Utility functions
export const getTodaysInsight = (): DailyInsight | null => {
  const today = new Date().toISOString().split('T')[0];
  return dailyInsightsData.find(insight => insight.date === today) || null;
};

export const getInsightByDate = (date: string): DailyInsight | null => {
  return dailyInsightsData.find(insight => insight.date === date) || null;
};

export const getInsightsByCategory = (category: DailyCategory): DailyInsight[] => {
  return dailyInsightsData.filter(insight => insight.category === category);
};

export const getRandomInsight = (): DailyInsight => {
  const randomIndex = Math.floor(Math.random() * dailyInsightsData.length);
  return dailyInsightsData[randomIndex];
};

export const getCurrentWeekTheme = (): WeeklyTheme => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + 1) / 7);
  
  return weeklyThemes.find(theme => theme.week === weekNumber) || weeklyThemes[0];
};

// Generate insights for the year (placeholder function)
export const generateYearlyInsights = (year: number): DailyInsight[] => {
  // This would be implemented to generate 365 insights
  // For now, returning the sample data
  return dailyInsightsData;
};

export default dailyInsightsData;