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
import { getStoryById, UPANISHAD_JOURNEY_ORDER } from './stories';
import {
  getPartById,
  RAMAYANA_JOURNEY_ORDER,
  UPANISHAD_JOURNEY_ORDER as UPANISHAD_TEXT_JOURNEY_ORDER,
} from './scriptureTexts';

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
  'branches-of-hinduism', // the map's second half: the streams
  'dharma',
  'karma',
  'moksha',
  'three-gunas',
  'bhakti-paths',
  'ahimsa',
  'samsara',
  // The deeper beliefs, once the foundations are walked
  'maya',
  'brahman-atman',
  'prana',
  'guru',
];

const MODULE_3_DEITIES = [
  'krishna',
  'ganesha',
  'shiva',
  'hanuman',
  'durga',
  'rama',
  // The divine family completed (appended — earlier ids keep their positions)
  'brahma',
  'parvati',
  'lakshmi',
  'saraswati',
];

// Canonical route for a content ref ('gita:2' | 'concept:karma' |
// 'deity:krishna' | 'practice:bhakti-yoga' | 'festival:janmashtami') — the
// single kind→screen mapping, shared by the journey path and by citation
// links that jump from one piece of content to another.
export function routeForContentRef(
  ref: string
): { name: string; params?: Record<string, unknown> } | null {
  const sep = ref.indexOf(':');
  if (sep < 0) return null;
  const kind = ref.slice(0, sep);
  const id = ref.slice(sep + 1);
  if (!id) return null;
  switch (kind) {
    case 'gita': {
      const chapter = parseInt(id, 10);
      return Number.isFinite(chapter)
        ? { name: 'GitaVersePlayer', params: { chapter } }
        : null;
    }
    case 'concept':
      return hasReaderContent('concept', id)
        ? { name: 'ContentReader', params: { contentType: 'concept', contentId: id } }
        : { name: 'PhilosophyDetail', params: { conceptId: id } };
    case 'deity':
      return hasReaderContent('deity', id)
        ? { name: 'ContentReader', params: { contentType: 'deity', contentId: id } }
        : { name: 'DeityDetail', params: { deityId: id } };
    case 'story':
      return hasReaderContent('story', id)
        ? { name: 'ContentReader', params: { contentType: 'story', contentId: id } }
        : null;
    case 'scripture':
      return hasReaderContent('scripture', id)
        ? { name: 'ContentReader', params: { contentType: 'scripture', contentId: id } }
        : null;
    case 'practice':
      return { name: 'PracticeDetail', params: { practiceId: id } };
    case 'prayer':
      return { name: 'PrayerPlayer', params: { prayerId: id } };
    case 'festival':
      return hasReaderContent('festival', id)
        ? { name: 'ContentReader', params: { contentType: 'festival', contentId: id } }
        : { name: 'FestivalCalendar', params: { selectedFestival: id } };
    default:
      return null;
  }
}

// Open a content ref from anywhere (citation footnotes, sources card).
// Pushes a fresh screen instance when possible — the reader derives all its
// state from route params on mount, so navigating "onto itself" with new
// params (e.g. Krishna's citation → Janmashtami, both ContentReader) must
// mount a new instance rather than update the current one.
export function navigateToContentRef(navigation: any, ref: string) {
  const route = routeForContentRef(ref);
  if (!route) return;
  if (route.name === 'FestivalCalendar') {
    navigation.navigate('MainTabs', { screen: 'FestivalCalendar', params: route.params });
    return;
  }
  if (typeof navigation.push === 'function') {
    navigation.push(route.name, route.params);
  } else {
    navigation.navigate(route.name, route.params);
  }
}

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
      route: routeForContentRef(`concept:${id}`)!,
      cover: typeof concept.images.heroImage === 'number' ? concept.images.heroImage : FALLBACK_COVER,
    });
  }
  // Principal Upanishads (the texts) — appended after the concepts (append-only)
  for (const id of UPANISHAD_TEXT_JOURNEY_ORDER) {
    const part = getPartById(id);
    if (!part) continue;
    path.push({
      id: `scripture:${id}`,
      module: 1,
      title: part.name,
      route: routeForContentRef(`scripture:${id}`)!,
      cover: typeof part.coverImage === 'number' ? part.coverImage : FALLBACK_COVER,
    });
  }

  // Module 2 — Stories That Guide Us (the Gita, chapter by chapter, then the
  // Upanishad dialogues; Ramayana kandas join this module in a later wave).
  for (let ch = 1; ch <= 18; ch++) {
    const chapter = bhagavadGitaData.find(c => c.number === ch);
    path.push({
      id: `gita:${ch}`,
      module: 2,
      title: `Gita Chapter ${ch}${chapter ? ` · ${chapter.name.english}` : ''}`,
      route: routeForContentRef(`gita:${ch}`)!,
      cover: getChapterCover(ch) as number,
    });
  }
  // Appended after Gita 18 — existing journey positions never move
  for (const id of UPANISHAD_JOURNEY_ORDER) {
    const story = getStoryById(id);
    if (!story) continue;
    path.push({
      id: `story:${id}`,
      module: 2,
      title: story.title,
      route: routeForContentRef(`story:${id}`)!,
      cover: typeof story.coverImage === 'number' ? story.coverImage : FALLBACK_COVER,
    });
  }
  // Ramayana kandas — appended after the Upanishad stories (append-only)
  for (const id of RAMAYANA_JOURNEY_ORDER) {
    const part = getPartById(id);
    if (!part) continue;
    path.push({
      id: `scripture:${id}`,
      module: 2,
      title: part.name,
      route: routeForContentRef(`scripture:${id}`)!,
      cover: typeof part.coverImage === 'number' ? part.coverImage : FALLBACK_COVER,
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
      route: routeForContentRef(`deity:${id}`)!,
      cover: typeof deity.images.heroImage === 'number' ? deity.images.heroImage : FALLBACK_COVER,
    });
  }

  // Module 4 — Living the Path (practices)
  for (const practice of getYogaPathsData()) {
    path.push({
      id: `practice:${practice.id}`,
      module: 4,
      title: practice.name,
      route: routeForContentRef(`practice:${practice.id}`)!,
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
      route: routeForContentRef(`festival:${festival.id}`)!,
      cover: typeof festival.heroImageUrl === 'number' ? festival.heroImageUrl : FALLBACK_COVER,
    });
  }

  return path;
}
