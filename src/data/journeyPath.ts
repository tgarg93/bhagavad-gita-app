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
import { getStoryById } from './stories';
import { FOUNDATIONS_ACTS } from './foundations';
import { capstoneForModule } from './stageCapstones';
// The six raw Upanishad texts left the journey (dense; the four dialogues in
// Stage 4 teach the same philosophy). They remain browsable via Learn →
// The Principal Upanishads → ScriptureContents.
import { getPartById, RAMAYANA_JOURNEY_ORDER } from './scriptureTexts';

// Module 0 is Foundations — the Jigyasu track, eight short acts that a new user
// walks before anything else. It sits below the Jigyasu milestone on the rail,
// which is exactly where it belongs.
export type JourneyModule = 0 | 1 | 2 | 3 | 4 | 5;

export interface JourneyItem {
  id: string; // 'foundations:name' | 'concept:karma' | 'gita:3' | 'deity:shiva' | 'festival:diwali-2025'
  module: JourneyModule;
  title: string;
  route: { name: string; params?: Record<string, unknown> };
  cover: number | string; // hero image for the Continue card
}

export const JOURNEY_MODULES: Record<JourneyModule, string> = {
  0: 'Foundations',
  1: 'The Core Ideas',
  2: 'The Gods',
  3: 'The Gita',
  4: 'The Stories',
  5: 'Living It',
};

export const ALL_MODULES: JourneyModule[] = [0, 1, 2, 3, 4, 5];

// What a walker can DO when they finish each stage. Not a description of the
// content — a capability. Every stage ends with a capstone whose rubric is this
// sentence, made testable, so the promise is kept rather than merely made.
export const MODULE_OBJECTIVES: Record<JourneyModule, string> = {
  0: 'Explain what Hinduism is to a friend.',
  1: 'Explain karma, dharma and moksha properly — and correct someone who thinks karma means fate.',
  2: "Walk into a temple and know who you're looking at, and how they're related.",
  3: "Read the Gita end to end, and say what Krishna actually tells Arjuna to do.",
  4: 'Tell the Ramayana. Know why Nachiketa questioned Death.',
  5: "Keep the festival year, know what puja is, and know which of the four paths fits how you're built.",
};

const FALLBACK_COVER = require('../../assets/images/covers/generic-cover.jpg');

// ─── THE JOURNEY IS A CURRICULUM, NOT A TABLE OF CONTENTS ────────────────────
//
// It used to contain everything the app had (82 items). It now contains only what
// a learner must walk to reach the next stage. Everything cut is still fully
// browsable in the Learn tab — the journey curates, browse shows all.
//
// Cutting an item from these lists NEVER deletes it. But before cutting anything,
// check it is reachable from `contentAggregator.getContentSections()`, or you will
// orphan it — that is exactly what nearly happened to Parvati, Lakshmi and
// Saraswati, whom the Learn tab was silently filtering out.
// ─────────────────────────────────────────────────────────────────────────────

// Stage 1 — The Core Ideas. The eight that carry weight, read whole.
// Cut to self-serve: hinduism-overview and branches-of-hinduism (Foundations
// Parts 1-2 now cover exactly this ground), prana, guru, bhakti-paths.
const STAGE_1_CONCEPTS = [
  'dharma',
  'karma',
  'samsara',
  'moksha',
  'brahman-atman',
  'maya',
  'three-gunas',
  'ahimsa',
];

// Stage 2 — The Gods. The seven you'd actually meet in a temple.
// Cut to self-serve: brahma (barely worshiped anywhere), lakshmi, saraswati.
const STAGE_2_DEITIES = [
  'krishna',
  'rama',
  'shiva',
  'ganesha',
  'hanuman',
  'durga',
  'parvati',
];

// Stage 4 — The Stories. The whole Ramayana, plus the four Upanishad dialogues
// that carry the philosophy. Cut to self-serve: the 12 kathas, the other four
// dialogues, and the six raw Upanishad texts (dense; the dialogues teach them).
const STAGE_4_DIALOGUES = ['nachiketa', 'svetaketu-salt', 'two-birds', 'maitreyi'];

// Stage 5 — Living It. Cut to self-serve: the four minor festivals.
const STAGE_5_FESTIVALS = [
  'diwali-2025',
  'holi-2025',
  'navratri-2025',
  'janmashtami-2025',
  'ganesh-chaturthi-2025',
];

// Canonical route for a content ref ('gita:2' | 'concept:karma' |
// 'deity:krishna' | 'practice:bhakti-yoga' | 'festival:janmashtami') — the
// single kind→screen mapping, shared by the journey path and by citation
// links that jump from one piece of content to another.
//
// A ref may carry an optional `#fragment` naming the exact spot inside the
// item, so a citation can land on what it actually cites rather than on a
// cover:
//   'gita:2#47'                                → chapter 2, verse 47
//   'scripture:isha-upanishad#isha-first-verse' → that section of the reader
// Fragmentless refs behave exactly as before. Because this lives here, every
// citationLink in the app gets the precision, not just the Daily Chai card.
export function routeForContentRef(
  ref: string
): { name: string; params?: Record<string, unknown> } | null {
  const hash = ref.indexOf('#');
  const fragment = hash >= 0 ? ref.slice(hash + 1) : '';
  if (hash >= 0) ref = ref.slice(0, hash);

  const sep = ref.indexOf(':');
  if (sep < 0) return null;
  const kind = ref.slice(0, sep);
  const id = ref.slice(sep + 1);
  if (!id) return null;
  // The reader takes the fragment as a section id; screens that can't honor one
  // simply never receive it.
  const reader = (contentType: string, contentId: string) => ({
    name: 'ContentReader',
    params: fragment
      ? { contentType, contentId, sectionId: fragment }
      : { contentType, contentId },
  });

  switch (kind) {
    case 'foundations':
      return hasReaderContent('foundations', id) ? reader('foundations', id) : null;
    case 'capstone':
      return hasReaderContent('capstone', id) ? reader('capstone', id) : null;
    case 'gita': {
      const chapter = parseInt(id, 10);
      if (!Number.isFinite(chapter)) return null;
      const verse = fragment ? parseInt(fragment, 10) : NaN;
      return Number.isFinite(verse)
        ? { name: 'GitaVersePlayer', params: { chapter, verse } }
        : { name: 'GitaVersePlayer', params: { chapter } };
    }
    case 'concept':
      return hasReaderContent('concept', id)
        ? reader('concept', id)
        : { name: 'PhilosophyDetail', params: { conceptId: id } };
    case 'deity':
      return hasReaderContent('deity', id)
        ? reader('deity', id)
        : { name: 'DeityDetail', params: { deityId: id } };
    case 'story':
      return hasReaderContent('story', id) ? reader('story', id) : null;
    case 'scripture':
      return hasReaderContent('scripture', id) ? reader('scripture', id) : null;
    case 'practice':
      return { name: 'PracticeDetail', params: { practiceId: id } };
    case 'prayer':
      return { name: 'PrayerPlayer', params: { prayerId: id } };
    case 'festival':
      return hasReaderContent('festival', id)
        ? reader('festival', id)
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

// Each stage ends with its capstone — the test of that stage's objective, and
// the rite that confers its level. Appended last within the module, always.
const pushCapstone = (path: JourneyItem[], module: JourneyModule) => {
  const cap = capstoneForModule(module);
  if (!cap) return;
  const route = routeForContentRef(`capstone:${cap.id}`);
  if (!route) return;
  path.push({
    id: `capstone:${cap.id}`,
    module,
    title: cap.title,
    route,
    cover: cap.coverImage,
  });
};

export function buildJourneyPath(): JourneyItem[] {
  const path: JourneyItem[] = [];

  // Stage 0 — Foundations. The whole of Jigyasu, and the first thing a new user
  // walks. Its capstone lives inside foundations.ts (it predates stageCapstones),
  // so no pushCapstone here.
  for (const act of FOUNDATIONS_ACTS) {
    const route = routeForContentRef(`foundations:${act.id}`);
    if (!route) continue;
    path.push({
      id: `foundations:${act.id}`,
      module: 0,
      title: act.title,
      route,
      cover: act.coverImage,
    });
  }

  // Stage 1 — The Core Ideas. The eight concepts, read whole this time.
  for (const id of STAGE_1_CONCEPTS) {
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
  pushCapstone(path, 1);

  // Stage 2 — The Gods.
  for (const id of STAGE_2_DEITIES) {
    const deity = getDeityById(id);
    if (!deity) continue;
    path.push({
      id: `deity:${id}`,
      module: 2,
      title: deity.name,
      route: routeForContentRef(`deity:${id}`)!,
      cover: typeof deity.images.heroImage === 'number' ? deity.images.heroImage : FALLBACK_COVER,
    });
  }
  pushCapstone(path, 2);

  // Stage 3 — The Gita, whole. 18 chapters, 701 verses.
  for (let ch = 1; ch <= 18; ch++) {
    const chapter = bhagavadGitaData.find(c => c.number === ch);
    path.push({
      id: `gita:${ch}`,
      module: 3,
      title: `Gita Chapter ${ch}${chapter ? ` · ${chapter.name.english}` : ''}`,
      route: routeForContentRef(`gita:${ch}`)!,
      cover: getChapterCover(ch) as number,
    });
  }
  pushCapstone(path, 3);

  // Stage 4 — The Stories. The Ramayana entire, then the four Upanishad
  // dialogues that carry the philosophy.
  for (const id of RAMAYANA_JOURNEY_ORDER) {
    const part = getPartById(id);
    if (!part) continue;
    path.push({
      id: `scripture:${id}`,
      module: 4,
      title: part.name,
      route: routeForContentRef(`scripture:${id}`)!,
      cover: typeof part.coverImage === 'number' ? part.coverImage : FALLBACK_COVER,
    });
  }
  for (const id of STAGE_4_DIALOGUES) {
    const story = getStoryById(id);
    if (!story) continue;
    path.push({
      id: `story:${id}`,
      module: 4,
      title: story.title,
      route: routeForContentRef(`story:${id}`)!,
      cover: typeof story.coverImage === 'number' ? story.coverImage : FALLBACK_COVER,
    });
  }
  pushCapstone(path, 4);

  // Stage 5 — Living It. The four paths, then the five festivals everyone keeps,
  // in true calendar order (recomputed each call, so it follows the real year).
  for (const practice of getYogaPathsData()) {
    path.push({
      id: `practice:${practice.id}`,
      module: 5,
      title: practice.name,
      route: routeForContentRef(`practice:${practice.id}`)!,
      cover:
        typeof (practice as any).images?.heroImage === 'number'
          ? (practice as any).images.heroImage
          : FALLBACK_COVER,
    });
  }
  const ordered = getUpcomingFestivals(festivalData.length).filter(f =>
    STAGE_5_FESTIVALS.includes(f.id)
  );
  const seen = new Set(ordered.map(f => f.id));
  const rest = festivalData.filter(f => STAGE_5_FESTIVALS.includes(f.id) && !seen.has(f.id));
  for (const festival of [...ordered, ...rest]) {
    path.push({
      id: `festival:${festival.id}`,
      module: 5,
      title: festival.name,
      route: routeForContentRef(`festival:${festival.id}`)!,
      cover: typeof festival.heroImageUrl === 'number' ? festival.heroImageUrl : FALLBACK_COVER,
    });
  }
  pushCapstone(path, 5);

  return path;
}
