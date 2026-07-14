// Grades a reader's free-recall answer against a rubric.
//
// Used by both the in-track `recall` checks and the capstone — same shape,
// different rubric size. Deliberately NOT reusing geminiService's reflection
// methods: those are instructed to "never grade or judge", which is right for a
// reflection and exactly wrong here.
//
// Two rules this service exists to enforce:
//   1. The model marks which rubric points are PRESENT. It never decides the
//      verdict — pass/fail is computed in code from hit.length >= passCount.
//   2. A grader failure is never a dead end. Returning null puts the caller on
//      the offline path (reveal the model answer, let the reader self-mark),
//      because the capstone must never be the one screen that blocks a level-up.
import geminiService from './geminiService';
import { RecallCheck, Capstone } from '../data/checkTypes';

const MAX_ANSWER_CHARS = 1200;

export interface GradeResult {
  hit: number[]; // 0-based rubric indices the reader clearly expressed
  missed: number[];
  feedback: string; // two warm sentences, in Krishna's voice
  passed: boolean; // computed here, in code — never taken from the model
}

const buildPrompt = (check: RecallCheck | Capstone, answer: string): string => `
You are marking a beginner's free-recall answer in a Hindu learning app.

Be generous. This is a first-time learner explaining an idea in their own words,
not a student sitting an exam. Credit a rubric point if the idea is there in ANY
words at all — clumsy, informal, partial, or using the wrong technical term is
fine, as long as the idea is present. Do not require Sanskrit. Do not penalise
spelling, grammar, or brevity. When you are genuinely unsure, credit it.

The question they were asked:
"${check.prompt}"

The rubric — the ideas a good answer contains:
${check.rubric.map((r, i) => `${i + 1}. ${r}`).join('\n')}

What they wrote:
"${answer.slice(0, MAX_ANSWER_CHARS)}"

Return STRICT JSON only — no markdown, no code fences, no commentary:
{"hit":[<1-based rubric numbers they clearly expressed>],
 "missed":[<the remaining rubric numbers>],
 "feedback":"<exactly two warm sentences, second person, naming ONE thing they got right and ONE thing worth adding. Never say correct, incorrect, right, wrong, or pass. Never give them a score.>"}
`.trim();

// Tolerant of fences, surrounding prose, and out-of-range indices. Anything
// unparseable returns null rather than throwing — the caller degrades.
const parseGrade = (raw: string, rubricLength: number): Omit<GradeResult, 'passed'> | null => {
  let parsed: any;
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('no JSON object in response');
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  } catch (error) {
    console.log('[check] could not parse grade response:', error);
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || !Array.isArray(parsed.hit)) return null;

  // Model returns 1-based; we work 0-based. Drop anything out of range or dupe.
  const hit = Array.from(
    new Set(
      parsed.hit
        .map((n: unknown) => (typeof n === 'number' ? n - 1 : NaN))
        .filter((n: number) => Number.isInteger(n) && n >= 0 && n < rubricLength)
    )
  ) as number[];

  const missed = Array.from({ length: rubricLength }, (_, i) => i).filter(i => !hit.includes(i));

  const feedback =
    typeof parsed.feedback === 'string' && parsed.feedback.trim()
      ? parsed.feedback.trim()
      : 'You have the shape of it. Sit with the pieces you have not said yet.';

  return { hit, missed, feedback };
};

class CheckService {
  private static instance: CheckService;

  static getInstance(): CheckService {
    if (!CheckService.instance) {
      CheckService.instance = new CheckService();
    }
    return CheckService.instance;
  }

  // null ⇒ the grader is unreachable (no API key, offline, unparseable output).
  // The caller must fall back to self-marking, never to a dead end.
  async gradeRecall(check: RecallCheck | Capstone, answer: string): Promise<GradeResult | null> {
    if (!answer.trim()) return null;
    try {
      const raw = await geminiService.generateOneOff(buildPrompt(check, answer), {
        // 2.5-flash spends reasoning tokens against this budget; every
        // structured-JSON caller in this codebase passes 4096 for that reason.
        maxOutputTokens: 4096,
      });
      const parsed = parseGrade(raw, check.rubric.length);
      if (!parsed) return null;
      return { ...parsed, passed: parsed.hit.length >= check.passCount };
    } catch (error) {
      console.log('[check] grader unavailable:', error);
      return null;
    }
  }
}

export const checkService = CheckService.getInstance();
export default checkService;
