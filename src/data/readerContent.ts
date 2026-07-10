// Adapter that presents concepts, deities, and festivals to the generic paged
// ContentReaderScreen as one uniform shape. Pure data mapping — no React.
import { NarrativeSection, SourceNote } from './narrativeTypes';
import { getPhilosophyById } from './philosophyAndTeachings';
import { getDeityById } from './godsAndDeities';
import { festivalData } from './festivals';

export type ReaderContentType = 'concept' | 'deity' | 'festival';

export interface ReaderContent {
  contentType: ReaderContentType;
  id: string;
  title: string;
  sanskritTitle?: string;
  subtitle: string;
  coverImage: number; // require()'d asset (string paths fall back to the shared cover)
  sections: NarrativeSection[];
  reflectionQuestions: string[];
  sources: SourceNote[];
  // Where the ⋮ menu's "Details & practices" leads (mantras/rituals/worship etc.)
  detailRoute: { name: string; params: Record<string, string> };
  readerLabel: string; // cover eyebrow, e.g. 'Philosophy'
}

const FALLBACK_COVER = require('../../assets/images/covers/generic-cover.jpg');

const asCover = (img: unknown): number =>
  typeof img === 'number' ? img : FALLBACK_COVER;

// Deity stories read naturally as extra narrative pages after the sections
const storyToSection = (story: {
  id: string;
  title: string;
  content: string;
  moralLesson: string;
  relatedScripture?: string;
}): NarrativeSection => ({
  id: `story-${story.id}`,
  title: story.title,
  subtitle: story.relatedScripture ? `from the ${story.relatedScripture}` : undefined,
  storyText: story.content,
  sectionHeader: 'What this teaches',
  teachingText: story.moralLesson,
});

export function getReaderContent(
  contentType: ReaderContentType,
  contentId: string
): ReaderContent | null {
  if (contentType === 'concept') {
    const concept = getPhilosophyById(contentId);
    if (!concept?.sections?.length) return null;
    return {
      contentType,
      id: concept.id,
      title: concept.name,
      sanskritTitle: concept.sanskritName,
      subtitle: concept.description,
      coverImage: asCover(concept.images.heroImage),
      sections: concept.sections,
      reflectionQuestions: concept.reflectionQuestions ?? [],
      sources: concept.sources ?? [],
      detailRoute: { name: 'PhilosophyDetail', params: { conceptId: concept.id } },
      readerLabel: 'Philosophy',
    };
  }

  if (contentType === 'deity') {
    const deity = getDeityById(contentId);
    if (!deity?.sections?.length) return null;
    return {
      contentType,
      id: deity.id,
      title: deity.name,
      sanskritTitle: deity.sanskritName,
      subtitle: deity.description,
      coverImage: asCover(deity.images.heroImage),
      sections: [...deity.sections, ...deity.stories.map(storyToSection)],
      reflectionQuestions: deity.reflectionQuestions ?? [],
      sources: deity.sources ?? [],
      detailRoute: { name: 'DeityDetail', params: { deityId: deity.id } },
      readerLabel: 'Deity',
    };
  }

  const festival = festivalData.find(f => f.id === contentId);
  if (!festival?.sections?.length) return null;
  return {
    contentType,
    id: festival.id,
    title: festival.name,
    sanskritTitle: festival.sanskritName,
    subtitle: festival.significance,
    coverImage: asCover(festival.heroImageUrl),
    sections: festival.sections,
    reflectionQuestions: festival.reflectionQuestions ?? [],
    sources: festival.sources ?? [],
    detailRoute: { name: 'FestivalDetail', params: { festivalId: festival.id } },
    readerLabel: 'Festival',
  };
}

export function hasReaderContent(contentType: ReaderContentType, contentId: string): boolean {
  return getReaderContent(contentType, contentId) !== null;
}

// Convert NarrativeSection[] into the {title, blocks} shape that
// AudioNarrationService.parseContentIntoSegments understands. Blocks are
// emitted at FIXED positions (0 openingVerse, 1 storyText, 2 sectionHeader,
// 3 keyVerse, 4 teachingText) — empty blocks yield no segments but keep the
// indices stable, so blockIds are deterministic:
//   section-{i}-title · section-{i}-block-0-sanskrit/-meaning ·
//   section-{i}-block-1 (story sentences) · section-{i}-block-2 (header) ·
//   section-{i}-block-3-... · section-{i}-block-4 (teaching sentences)
export function sectionsToNarrationContent(sections: NarrativeSection[]) {
  return sections.map(section => ({
    title: section.title,
    blocks: [
      {
        type: 'verse',
        verse: {
          sanskrit: section.openingVerse?.sanskrit ?? '',
          transliteration: '', // not narrated (matches Gita player behavior)
          meaning: section.openingVerse?.meaning ?? '',
        },
      },
      { type: 'prose', text: section.storyText ?? '' },
      { type: 'header', text: section.sectionHeader ?? '' },
      {
        type: 'verse',
        verse: {
          sanskrit: section.keyVerse?.sanskrit ?? '',
          transliteration: '',
          meaning: section.keyVerse?.meaning ?? '',
        },
      },
      { type: 'teaching', text: section.teachingText ?? '' },
    ],
  }));
}
