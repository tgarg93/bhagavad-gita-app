// Knowledge checks: the moments where a reader does something rather than just
// reads. Any content whose sections are NarrativeSection[] can carry them —
// Foundations is the first consumer, but Gita chapters, deities and festivals
// can adopt checks later without a schema change.
//
// Pure types: no imports, safe to require from anywhere (same rule as
// narrativeTypes.ts, which imports KnowledgeCheck from here).

export type CheckKind = 'mcq' | 'recall' | 'reflect';

export interface McqOption {
  text: string;
  // Exactly one option in a check sets this.
  correct?: boolean;
}

export interface McqCheck {
  id: string; // PERMANENT — results are keyed on it. 'chk:foundations:karma-fate'
  kind: 'mcq';
  prompt: string;
  options: McqOption[]; // 3–4
  // Shown after the tap, for a right answer AND a wrong one. This is where the
  // teaching actually lands, so it is required, not optional.
  why: string;
}

export interface RecallCheck {
  id: string;
  kind: 'recall';
  prompt: string;
  // The atomic ideas a good answer contains. The grader marks which are present;
  // it never scores, and it never decides the verdict — see checkService.
  rubric: string[];
  passCount: number; // how many rubric hits count as a pass
  // Shown after grading, and used as the offline path: reveal it, let the reader
  // self-mark against the rubric.
  modelAnswer: string;
}

// A reflect check points at an entry in the content's existing
// reflectionQuestions[] rather than carrying its own question. That keeps
// ChapterReflection (questions: string[] + singleQuestionIndex) and
// ReflectionEntry.questionIndex working untouched — interspersed reflections
// need no new persistence and already count toward the reflections × 15 term.
export interface ReflectCheck {
  id: string;
  kind: 'reflect';
  questionIndex: number;
}

export type KnowledgeCheck = McqCheck | RecallCheck | ReflectCheck;

// A capstone is a RecallCheck with a bigger rubric and a level attached. Passing
// it confers the level directly (see the RITES floor in progressionService).
export interface Capstone {
  id: string;
  kind: 'capstone';
  prompt: string;
  rubric: string[];
  passCount: number;
  modelAnswer: string;
  conferLevel: number; // 2 = Shishya
  riteId: string; // PERMANENT — stored in foundations_progress. 'foundations-capstone'
  // Where each rubric idea was taught, parallel to `rubric`. A missed idea names
  // its act, so the reader knows where to go back to rather than being told only
  // that something is absent.
  rubricSource?: string[];
}

// Point values for the progression terms. Only Foundations consumes `checks`, so
// these values are effectively the Foundations scoring knobs.
//
// A check is worth 2 (not 4): with 2–3 checks per part the track now holds ~20
// graded checks, so 32 cards + 20 checks × 2 + 1 reflection × 15 = 32 + 40 + 15 =
// 87 points — which must stay UNDER the 100 that buys Shishya, so that the capstone
// (a rite, +30 → ~117) is what tips the reader over. Card = 1 keeps cards cheap.
// If you add checks, keep the pre-capstone total under 100 (≤26 checks at value 2).
export const CHECK_POINTS = {
  card: 1,
  mcq: 2,
  recall: 2,
  rite: 30,
} as const;

export const isGraded = (c: KnowledgeCheck): c is McqCheck | RecallCheck =>
  c.kind === 'mcq' || c.kind === 'recall';
