// Targeted daily discovery: each day's chai surfaces a specific piece of content
// the reader hasn't seen yet, chosen for relevance. This service reads the user
// snapshot ONCE (async) and hands buildDailyAtom a ranked, unseen pool so the
// actual per-date selection stays synchronous — the notification scheduler bakes
// 28 future days from a single snapshot, and HomeScreen and every notification
// agree for a given day.
//
// The blend the user asked for: candidates are filtered to unseen + routable,
// scored by interest/family-stream overlap + journey proximity + level fit, then
// INTERLEAVED across content kinds (deity, concept, story, …) so consecutive
// discovery days rotate through different parts of the app rather than serving a
// run of deities. Within each kind, the most relevant item comes first.
import { getAllContent } from '../data/contentAggregator';
import { routeForContentRef } from '../data/journeyPath';
import { FOUNDATIONS_ACTS } from '../data/foundations';
import LocalStorageService from './localStorageService';
import { journeyService } from './journeyService';
import { getProgression } from './progressionService';
import { buildDailyAtom, DailyAtom, DailyPickSnapshot, DiscoveryCandidate } from '../data/dailyAtoms';

// Which ContentCard categories become discovery candidates, and how each kind
// presents. Prayers ('mantras') are excluded: they aren't tracked in the
// completion map (so "unseen" can't be honored) and open a different player.
const CATEGORY_KINDS: Record<string, { kind: string; tag: string; citation: string }> = {
  deities: { kind: 'deity', tag: 'Meet a deity', citation: 'From the guide to the gods' },
  philosophy: { kind: 'concept', tag: 'An idea to explore', citation: 'From the teachings' },
  stories: { kind: 'story', tag: 'A story to know', citation: 'From the stories' },
  scriptures: { kind: 'scripture', tag: 'A text to open', citation: 'From the scriptures' },
  festivals: { kind: 'festival', tag: 'A festival to know', citation: 'From the festival guide' },
  practices: { kind: 'practice', tag: 'A practice to try', citation: 'From the practices' },
};

// Round-robin order for interleaving. Foundations sit last so the structured
// onboarding track never crowds out the wider catalog on a new reader's first
// discovery days.
const KIND_ORDER = ['deity', 'concept', 'story', 'festival', 'practice', 'scripture', 'foundations'];

interface Scored {
  cand: DiscoveryCandidate;
  kind: string;
  score: number;
}

interface RankContext {
  completed: Set<string>;
  interests: Set<string>;
  familyStream: string;
  nextUnfinishedId: string | null;
  nextUnfinishedKind: string | null;
  level: number;
}

// First 1–2 sentences of a description, capped, so the card body stays tight.
const teaser = (text: string): string => {
  const trimmed = (text || '').trim();
  if (trimmed.length <= 180) return trimmed;
  const cut = trimmed.slice(0, 180);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return lastStop > 80 ? cut.slice(0, lastStop + 1) : cut.trimEnd() + '…';
};

const krishnaPromptFor = (kind: string, title: string): string => {
  switch (kind) {
    case 'deity':
      return `Who is ${title}, and what does this form teach me?`;
    case 'festival':
      return `What is ${title} about, and how is it celebrated?`;
    case 'practice':
      return `How do I begin practicing ${title}, and what is it for?`;
    default:
      return `Tell me about ${title} — what should I understand about it?`;
  }
};

const scoreCandidate = (
  kind: string,
  tags: string[],
  difficulty: string,
  ref: string,
  title: string,
  ctx: RankContext
): number => {
  let score = 0;
  // Interest overlap (reuses the tag-scoring shape of contentAggregator.getRecommendations)
  for (const tag of tags) {
    if (ctx.interests.has(tag.toLowerCase())) score += 2;
  }
  // Family devotional stream — a strong, personal signal
  if (ctx.familyStream) {
    const hay = `${title} ${ref} ${tags.join(' ')}`.toLowerCase();
    if (hay.includes(ctx.familyStream)) score += 3;
  }
  // Journey proximity: the exact next step, or at least its kind
  if (ctx.nextUnfinishedId && ref === ctx.nextUnfinishedId) score += 4;
  else if (ctx.nextUnfinishedKind && kind === ctx.nextUnfinishedKind) score += 1;
  // Level fit: early readers lean beginner, advanced readers lean deeper
  if (ctx.level <= 2 && difficulty === 'beginner') score += 1;
  else if (ctx.level >= 4 && (difficulty === 'intermediate' || difficulty === 'advanced')) score += 1;
  return score;
};

// Build every routable, unseen candidate with its blend score.
const collectCandidates = (ctx: RankContext): Scored[] => {
  const out: Scored[] = [];
  const seenRefs = new Set<string>();

  const add = (
    kind: string,
    id: string,
    title: string,
    description: string,
    tag: string,
    citation: string,
    tags: string[],
    difficulty: string
  ) => {
    const ref = `${kind}:${id}`;
    if (seenRefs.has(ref)) return;
    if (ctx.completed.has(ref)) return; // unseen only
    if (!routeForContentRef(ref)) return; // must be navigable (some story/scripture refs aren't)
    seenRefs.add(ref);
    out.push({
      kind,
      score: scoreCandidate(kind, tags, difficulty, ref, title, ctx),
      cand: {
        ref,
        tag,
        hook: title,
        body: teaser(description),
        citation,
        krishnaPrompt: krishnaPromptFor(kind, title),
      },
    });
  };

  for (const card of getAllContent()) {
    const config = CATEGORY_KINDS[card.category as string];
    if (!config) continue;
    add(
      config.kind,
      card.id,
      card.title,
      card.description,
      config.tag,
      config.citation,
      card.tags ?? [],
      (card.difficulty as string) ?? 'beginner'
    );
  }

  for (const act of FOUNDATIONS_ACTS) {
    add(
      'foundations',
      act.id,
      act.title,
      act.kicker || act.subtitle || '',
      'A foundation to build',
      'From the Foundations',
      [],
      'beginner'
    );
  }

  return out;
};

// Rank within each kind (score desc, ref asc for a stable, cross-device order),
// then interleave kinds round-robin so the daily picks span the whole catalog.
const rankAndInterleave = (scored: Scored[]): DiscoveryCandidate[] => {
  const byKind = new Map<string, DiscoveryCandidate[]>();
  for (const kind of KIND_ORDER) byKind.set(kind, []);
  const buckets: Record<string, Scored[]> = {};
  for (const item of scored) (buckets[item.kind] ??= []).push(item);
  for (const kind of Object.keys(buckets)) {
    buckets[kind].sort((a, b) => b.score - a.score || a.cand.ref.localeCompare(b.cand.ref));
    byKind.set(kind, buckets[kind].map(s => s.cand));
  }

  const pool: DiscoveryCandidate[] = [];
  const queues = KIND_ORDER.map(kind => byKind.get(kind) ?? []);
  let remaining = queues.reduce((n, q) => n + q.length, 0);
  let i = 0;
  while (remaining > 0) {
    const q = queues[i % queues.length];
    if (q.length) {
      pool.push(q.shift()!);
      remaining--;
    }
    i++;
  }
  return pool;
};

// Read user state once and build the ranked, unseen discovery pool. Fail-soft:
// any read error yields an empty pool, and buildDailyAtom falls back to the
// authored rotation — the daily chai always renders something.
export const buildSnapshot = async (): Promise<DailyPickSnapshot> => {
  try {
    const [completionMap, profile, next, progression] = await Promise.all([
      LocalStorageService.getContentCompletion().catch(() => ({} as Record<string, string>)),
      LocalStorageService.getSpiritualProfile().catch(() => null),
      journeyService.getNextUnfinished().catch(() => null),
      getProgression().catch(() => null),
    ]);

    const nextId = next?.id ?? null;
    const ctx: RankContext = {
      completed: new Set(Object.keys(completionMap)),
      interests: new Set((profile?.interests ?? []).map(s => s.toLowerCase())),
      familyStream: (profile?.familyStream ?? '').trim().toLowerCase(),
      nextUnfinishedId: nextId,
      nextUnfinishedKind: nextId ? nextId.split(':')[0] : null,
      level: progression?.level.level ?? 1,
    };

    return { discoveryPool: rankAndInterleave(collectCandidates(ctx)) };
  } catch {
    return { discoveryPool: [] };
  }
};

// Today's chai for HomeScreen: builds a snapshot, then the atom for today.
export const getTodaysPick = async (date: Date = new Date()): Promise<DailyAtom> => {
  const snapshot = await buildSnapshot();
  return buildDailyAtom(date, snapshot);
};

export const dailyPickService = { buildSnapshot, getTodaysPick };
