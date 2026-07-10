// The app's opinionated curriculum: one ordered path through everything,
// grouped into five modules. "Next" anywhere in the app means the next
// unfinished item on this path (journeyService owns completion state).
import { bhagavadGitaData } from './bhagavadGitaData';
import { getPhilosophyById } from './philosophyAndTeachings';
import { getDeityById } from './godsAndDeities';
import { festivalData, getUpcomingFestivals } from './festivals';
import { getYogaPathsData } from './yogaAndPractices';
import { hasReaderContent } from './readerContent';
import { getChapterCover } from './gitaChapterCovers';

export type JourneyModule = 1 | 2 | 3 | 4 | 5;

export interface JourneyItem {
  id: string; // 'concept:karma' | 'gita:3' | 'deity:shiva' | 'practice:bhakti-yoga' | 'festival:diwali-2025'
  module: JourneyModule;
  title: string;
  route: { name: string; params?: Record<string, unknown> };
  cover: number | string; // hero image for the Continue card
}

export const JOURNEY_MODULES: Record<JourneyModule, string> = {
  1: 'Why We Believe',
  2: 'Stories That Guide Us',
  3: 'Divine Connections',
  4: 'Living the Path',
  5: 'Unity in Diversity',
};

const FALLBACK_COVER = require('../../assets/images/covers/generic-cover.jpg');

const MODULE_1_CONCEPTS = [
  'hinduism-overview', // Module 0 in spirit: the map before the journey
  'dharma',
  'karma',
  'moksha',
  'three-gunas',
  'bhakti-paths',
  'ahimsa',
  'samsara',
];

const MODULE_3_DEITIES = ['krishna', 'ganesha', 'shiva', 'hanuman', 'durga', 'rama'];

// Navigate to a journey item, handling the one tab-route (FestivalCalendar
// lives inside MainTabs and cannot be pushed/replaced on the stack)
export function navigateToJourneyItem(navigation: any, item: JourneyItem, replace = false) {
  if (item.route.name === 'FestivalCalendar') {
    navigation.navigate('MainTabs', { screen: 'FestivalCalendar', params: item.route.params });
    return;
  }
  if (replace && typeof navigation.replace === 'function') {
    navigation.replace(item.route.name, item.route.params);
  } else {
    navigation.navigate(item.route.name, item.route.params);
  }
}

export function buildJourneyPath(): JourneyItem[] {
  const path: JourneyItem[] = [];

  // Module 1 — Why We Believe (core philosophy)
  for (const id of MODULE_1_CONCEPTS) {
    const concept = getPhilosophyById(id);
    if (!concept) continue;
    path.push({
      id: `concept:${id}`,
      module: 1,
      title: concept.name,
      route: hasReaderContent('concept', id)
        ? { name: 'ContentReader', params: { contentType: 'concept', contentId: id } }
        : { name: 'PhilosophyDetail', params: { conceptId: id } },
      cover: typeof concept.images.heroImage === 'number' ? concept.images.heroImage : FALLBACK_COVER,
    });
  }

  // Module 2 — Stories That Guide Us (the Gita, chapter by chapter;
  // Ramayana kandas join this module in a later wave)
  for (let ch = 1; ch <= 18; ch++) {
    const chapter = bhagavadGitaData.find(c => c.number === ch);
    path.push({
      id: `gita:${ch}`,
      module: 2,
      title: `Gita Chapter ${ch}${chapter ? ` · ${chapter.name.english}` : ''}`,
      route: { name: 'GitaVersePlayer', params: { chapter: ch } },
      cover: getChapterCover(ch) as number,
    });
  }

  // Module 3 — Divine Connections (the gods)
  for (const id of MODULE_3_DEITIES) {
    const deity = getDeityById(id);
    if (!deity) continue;
    path.push({
      id: `deity:${id}`,
      module: 3,
      title: deity.name,
      route: hasReaderContent('deity', id)
        ? { name: 'ContentReader', params: { contentType: 'deity', contentId: id } }
        : { name: 'DeityDetail', params: { deityId: id } },
      cover: typeof deity.images.heroImage === 'number' ? deity.images.heroImage : FALLBACK_COVER,
    });
  }

  // Module 4 — Living the Path (practices)
  for (const practice of getYogaPathsData()) {
    path.push({
      id: `practice:${practice.id}`,
      module: 4,
      title: practice.name,
      route: { name: 'PracticeDetail', params: { practiceId: practice.id } },
      cover:
        typeof (practice as any).images?.heroImage === 'number'
          ? (practice as any).images.heroImage
          : FALLBACK_COVER,
    });
  }

  // Module 5 — Unity in Diversity (festivals, in true calendar order —
  // computed each call so the order follows the actual upcoming calendar)
  const ordered = getUpcomingFestivals(festivalData.length);
  const seen = new Set(ordered.map(f => f.id));
  const rest = festivalData.filter(f => !seen.has(f.id)); // festivals with no upcoming occurrence
  for (const festival of [...ordered, ...rest]) {
    path.push({
      id: `festival:${festival.id}`,
      module: 5,
      title: festival.name,
      route: hasReaderContent('festival', festival.id)
        ? { name: 'ContentReader', params: { contentType: 'festival', contentId: festival.id } }
        : { name: 'FestivalCalendar', params: { selectedFestival: festival.id } },
      cover: typeof festival.heroImageUrl === 'number' ? festival.heroImageUrl : FALLBACK_COVER,
    });
  }

  return path;
}
