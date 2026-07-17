// Adapter that presents concepts, deities, and festivals to the generic paged
// ContentReaderScreen as one uniform shape. Pure data mapping — no React.
import { NarrativeSection, SourceNote } from './narrativeTypes';
import { Capstone } from './checkTypes';
import { getPhilosophyById } from './philosophyAndTeachings';
import { getDeityById } from './godsAndDeities';
import { festivalData } from './festivals';
import { getStoryById } from './stories';
import { getPartById, getCollection } from './scriptureTexts';
import { getFoundationsAct, takeawaysForAct, FOUNDATIONS_ACTS } from './foundations';
import { getStageCapstone } from './stageCapstones';

export type ReaderContentType =
  | 'concept'
  | 'deity'
  | 'festival'
  | 'story'
  | 'scripture'
  | 'foundations'
  | 'capstone';

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
  // Where the ⋮ menu's "Details & practices" leads (mantras/rituals/worship
  // etc.). Absent for content types with no detail screen (e.g. stories) —
  // the reader hides the menu item then.
  detailRoute?: { name: string; params: Record<string, string> };
  readerLabel: string; // cover eyebrow, e.g. 'Philosophy'

  // ——— Foundations only ———
  // The act's thesis line and the two paragraphs on its cover, so a Foundations
  // cover can say what the act is for rather than just naming it.
  kicker?: string;
  intro?: string[];
  // Replayed on this act's celebration ("you can now say…").
  bankedTakeaways?: string[];
  // The act's concept checklist (FoundationsAct.learnItems): rendered by the
  // intro page, ticked off by waypoints, and replayed checked on the
  // celebration. Absent on acts without the depth rework.
  learnItems?: string[];
  // The question the next act answers, shown above the celebration's next-step
  // button so the reader walks straight into it.
  handoff?: string;
  // Present only on a capstone item. Its page is appended after the sections.
  capstone?: Capstone;
  // The stage objective — what the reader can now do. Shown on the capstone's
  // celebration, where it reads as earned rather than promised.
  objective?: string;
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

  if (contentType === 'story') {
    const story = getStoryById(contentId);
    if (!story?.sections?.length) return null;
    return {
      contentType,
      id: story.id,
      title: story.title,
      sanskritTitle: story.sanskritTitle,
      subtitle: story.subtitle,
      coverImage: asCover(story.coverImage),
      sections: story.sections,
      reflectionQuestions: story.reflectionQuestions ?? [],
      sources: story.sources ?? [],
      // No detail screen for stories — the reader is the whole experience
      readerLabel: story.collection === 'upanishad' ? 'Upanishad Story' : 'Story',
    };
  }

  if (contentType === 'scripture') {
    const part = getPartById(contentId);
    if (!part?.sections?.length) return null;
    const collection = getCollection(part.collection);
    return {
      contentType,
      id: part.id,
      title: part.name,
      sanskritTitle: part.sanskritName,
      subtitle: part.subtitle,
      coverImage: asCover(part.coverImage),
      sections: part.sections,
      reflectionQuestions: part.reflectionQuestions ?? [],
      sources: part.sources ?? [],
      // No detail screen — the reader is the whole experience
      readerLabel: collection?.title ?? 'Scripture',
    };
  }

  if (contentType === 'foundations') {
    const act = getFoundationsAct(contentId);
    if (!act?.sections?.length) return null;
    return {
      contentType,
      id: act.id,
      title: act.title,
      subtitle: act.subtitle,
      coverImage: act.coverImage,
      sections: act.sections,
      reflectionQuestions: act.reflectionQuestions,
      sources: act.sources,
      readerLabel: `Foundations · Part ${act.order} of ${FOUNDATIONS_ACTS.length}`,
      kicker: act.kicker,
      intro: act.intro,
      bankedTakeaways: takeawaysForAct(act.id),
      learnItems: act.learnItems,
      handoff: act.handoff,
      capstone: act.capstone,
    };
  }

  if (contentType === 'capstone') {
    const cap = getStageCapstone(contentId);
    if (!cap) return null;
    return {
      contentType,
      id: cap.id,
      title: cap.title,
      subtitle: cap.subtitle,
      coverImage: cap.coverImage,
      sections: [cap.recap],
      reflectionQuestions: [],
      sources: [],
      readerLabel: `${cap.stageName} · The capstone`,
      kicker: cap.kicker,
      intro: cap.intro,
      objective: cap.objective,
      capstone: cap.capstone,
    };
  }

  // NOTE: this is the FALLTHROUGH branch — anything that isn't matched above
  // lands here and is treated as a festival. New content types must be added
  // ABOVE this line, or they resolve as a festival and silently return null.
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

// Inline **bold** markers are display-only: narration and highlight offsets
// operate on stripped text (RichText strips identically on the display side,
// so substring offsets align).
const stripMarkup = (text: string): string => text.replace(/\*\*/g, '');

// Convert NarrativeSection[] into the {title, blocks} shape that
// AudioNarrationService.parseContentIntoSegments understands. Blocks are
// emitted at FIXED positions (0 openingVerse, 1 storyText, 2 bullets,
// 3 sectionHeader, 4 keyVerse, 5 teachingText) — empty blocks yield no
// segments but keep the indices stable, so blockIds are deterministic.
// This order is a CONVENTION shared with NarrativeSections' bid() mapping —
// change both together or audio highlighting drifts.
export function sectionsToNarrationContent(sections: NarrativeSection[]) {
  return sections.map(section => ({
    title: section.title,
    // Waypoints are quiet checkpoints — the voice parks on them and never reads
    // them (ContentReaderScreen pauses there, like a check page). An empty
    // block list yields no segments while keeping section indices stable.
    blocks: section.kind === 'waypoint' ? [] : [
      {
        type: 'verse',
        verse: {
          sanskrit: section.openingVerse?.sanskrit ?? '',
          transliteration: '', // not narrated (matches Gita player behavior)
          meaning: stripMarkup(section.openingVerse?.meaning ?? ''),
        },
      },
      { type: 'prose', text: stripMarkup(section.storyText ?? '') },
      { type: 'prose', text: stripMarkup((section.bullets ?? []).join('. ')) },
      { type: 'header', text: stripMarkup(section.sectionHeader ?? '') },
      {
        type: 'verse',
        verse: {
          sanskrit: section.keyVerse?.sanskrit ?? '',
          transliteration: '',
          meaning: stripMarkup(section.keyVerse?.meaning ?? ''),
        },
      },
      { type: 'teaching', text: stripMarkup(section.teachingText ?? '') },
    ],
  }));
}
