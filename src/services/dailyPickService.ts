// Targeted daily discovery: each day's chai surfaces a specific piece of content
// the reader hasn't seen yet, chosen for relevance. This service reads the user
// snapshot ONCE (async) and hands buildDailyAtom a ranked, unseen pool so the
// actual per-date selection stays synchronous — the notification scheduler bakes
// 28 future days from a single snapshot, and HomeScreen and every notification
// agree for a given day.
//
// The card copy is AUTHORED, not generated: each candidate's headline/body come
// from src/data/discoveryTeasers.ts (an "aha" insight in the Jigyasu-track
// voice). Discovery is gated to refs that HAVE a teaser, so a flat catalog blurb
// can never ship. On top of the teaser gate the blend still applies: candidates
// are filtered to unseen + routable, scored by interest/family-stream overlap +
// journey proximity + level fit, then INTERLEAVED across content kinds (deity,
// concept, story, …) so consecutive discovery days rotate through different parts
// of the app. Within each kind, the most relevant item comes first.
import { getAllContent } from '../data/contentAggregator';
import { routeForContentRef } from '../data/journeyPath';
import { DISCOVERY_TEASERS } from '../data/discoveryTeasers';
import LocalStorageService from './localStorageService';
import { journeyService } from './journeyService';
import { getProgression } from './progressionService';
import { buildDailyAtom, DailyAtom, DailyPickSnapshot, DiscoveryCandidate } from '../data/dailyAtoms';

// ContentCard category → content-ref kind, used only to look up a card's
// tags/difficulty for scoring (the display copy comes from the teaser).
const KIND_BY_CATEGORY: Record<string, string> = {
  deities: 'deity',
  philosophy: 'concept',
  stories: 'story',
  scriptures: 'scripture',
  festivals: 'festival',
  practices: 'practice',
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

// Build every teaser-backed, routable, unseen candidate with its blend score.
// Sourced from the authored DISCOVERY_TEASERS map; the catalog is consulted only
// to pull each item's tags/difficulty for scoring.
const collectCandidates = (ctx: RankContext): Scored[] => {
  // ref → scoring signals from the browse catalog (teasers carry no tags).
  const catalog = new Map<string, { tags: string[]; difficulty: string }>();
  for (const card of getAllContent()) {
    const kind = KIND_BY_CATEGORY[card.category as string];
    if (!kind) continue;
    catalog.set(`${kind}:${card.id}`, {
      tags: card.tags ?? [],
      difficulty: (card.difficulty as string) ?? 'beginner',
    });
  }

  const out: Scored[] = [];
  for (const [ref, teaser] of Object.entries(DISCOVERY_TEASERS)) {
    if (ctx.completed.has(ref)) continue; // unseen only
    if (!routeForContentRef(ref)) continue; // must be navigable
    const kind = ref.slice(0, ref.indexOf(':'));
    const meta = catalog.get(ref) ?? { tags: [], difficulty: 'beginner' };
    out.push({
      kind,
      // eyebrow (not headline) carries the subject name, so it's the better
      // haystack for a family-stream match ("Meet Shiva" → shaiva readers).
      score: scoreCandidate(kind, meta.tags, meta.difficulty, ref, teaser.eyebrow, ctx),
      cand: {
        ref,
        tag: teaser.eyebrow,
        hook: teaser.headline,
        body: teaser.body,
        citation: teaser.citation,
        krishnaPrompt: teaser.krishnaPrompt,
      },
    });
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
