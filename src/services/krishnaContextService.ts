// The context layer that makes Krishna feel like a companion rather than a
// generic chatbot: who the person is (profile + rolling summary), where they
// are in their journey (progression), and what they are looking at right now.
// All local, all cheap — the context block is compact text fed to Gemini.
import LocalStorageService from './localStorageService';
import { getProgression } from './progressionService';
import { geminiService } from './geminiService';
import { userKnowledge } from './userKnowledgeService';

export interface CurrentContent {
  type: 'verse' | 'chapter' | 'festival' | 'deity' | 'concept' | 'daily-chai' | 'prayer' | 'story' | 'scripture' | 'none';
  chapter?: number;
  verse?: number;
  title?: string;
  snippet?: string; // e.g. the verse's English translation or section excerpt
}

const MAX_SNIPPET = 400;
const MAX_REFLECTION_CHARS = 500;

class KrishnaContextService {
  private static instance: KrishnaContextService;
  private currentContent: CurrentContent = { type: 'none' };
  private summaryRefreshInFlight = false;

  static getInstance(): KrishnaContextService {
    if (!KrishnaContextService.instance) {
      KrishnaContextService.instance = new KrishnaContextService();
    }
    return KrishnaContextService.instance;
  }

  setCurrentContent(ctx: CurrentContent) {
    this.currentContent = ctx;
  }

  getCurrentContent(): CurrentContent {
    return this.currentContent;
  }

  clearCurrentContent() {
    this.currentContent = { type: 'none' };
  }

  // Compact context block (~well under 1.5k tokens) injected into Krishna prompts
  async buildContextBlock(): Promise<string> {
    const [profile, progression] = await Promise.all([
      LocalStorageService.getSpiritualProfile(),
      getProgression(),
    ]);

    const lines: string[] = [];

    if (profile.onboarded) {
      const who: string[] = [];
      if (profile.name) who.push(`name: ${profile.name}`);
      who.push(`familiarity with Hindu teachings: ${profile.familiarity}`);
      if (profile.intentions.length) who.push(`intentions: ${profile.intentions.join(', ')}`);
      if (profile.interests.length) who.push(`interests: ${profile.interests.join(', ')}`);
      if (profile.familyStream && profile.familyStream !== 'Not sure') {
        who.push(`family's devotional tradition centers on: ${profile.familyStream}`);
      }
      who.push(`daily practice goal: ${profile.dailyGoalMinutes} minutes`);
      for (const fact of userKnowledge.knownStructuredLines(profile)) {
        who.push(`${fact.label.toLowerCase()}: ${fact.value}`);
      }
      lines.push(`About them — ${who.join('; ')}.`);
    }

    lines.push(
      `Journey — level ${progression.level.level} "${progression.level.sanskrit}" (${progression.level.english}); ` +
      `${progression.stats.versesRead} verses read, ${progression.stats.chaptersCompleted} chapters completed, ` +
      `${progression.stats.reflections} personal reflections written` +
      (progression.nextLevel ? `; ${progression.pointsToNext} wisdom points from ${progression.nextLevel.sanskrit}.` : ' — the highest level.')
    );

    if (profile.profileSummary) {
      lines.push(`What you know of their inner journey — ${profile.profileSummary}`);
    }

    const c = this.currentContent;
    if (c.type === 'verse' && c.chapter && c.verse) {
      lines.push(
        `They are currently reading Bhagavad Gita ${c.chapter}.${c.verse}` +
        (c.title ? ` (${c.title})` : '') +
        (c.snippet ? `: "${c.snippet.slice(0, MAX_SNIPPET)}"` : '')
      );
    } else if (c.type === 'chapter' && c.chapter) {
      lines.push(`They are currently reading Bhagavad Gita Chapter ${c.chapter}${c.title ? ` (${c.title})` : ''}.`);
    } else if ((c.type === 'festival' || c.type === 'deity' || c.type === 'concept') && c.title) {
      const what =
        c.type === 'festival' ? `the festival ${c.title}` :
        c.type === 'deity' ? `${c.title}` :
        `the concept of ${c.title}`;
      lines.push(
        `They are currently reading about ${what}` +
        (c.snippet ? `: "${c.snippet.slice(0, MAX_SNIPPET)}"` : '.')
      );
    }

    return lines.join('\n');
  }

  // Refresh the rolling profile summary when enough new reflections exist.
  // Fire-and-forget; at most one refresh in flight.
  async maybeRefreshSummary(): Promise<void> {
    if (this.summaryRefreshInFlight) return;
    try {
      const [profile, reflections] = await Promise.all([
        LocalStorageService.getSpiritualProfile(),
        LocalStorageService.getAllReflections(),
      ]);
      const lastCount = profile.reflectionCountAtSummary ?? 0;
      const newCount = reflections.length;
      const needsFirst = !profile.profileSummary && newCount >= 1;
      const needsRefresh = newCount - lastCount >= 3;
      if (!needsFirst && !needsRefresh) return;

      this.summaryRefreshInFlight = true;
      const recent = reflections
        .slice(0, 8)
        .map(r => {
          const where = r.chapterNumber != null ? `Ch${r.chapterNumber}` : `[${r.contentTitle ?? r.contentId ?? 'reading'}]`;
          return `${where} Q: ${r.question}\nThey wrote: ${r.answer.slice(0, MAX_REFLECTION_CHARS)}`;
        })
        .join('\n---\n');

      const factsLine = userKnowledge
        .knownStructuredLines(profile)
        .map(f => `${f.label.toLowerCase()}: ${f.value}`)
        .join('; ');

      const prompt = `You maintain a short private memory profile of a person on a spiritual learning journey through Hindu scripture and tradition. Based on their onboarding and recent personal reflections below, write an updated profile summary in under 120 words: the themes they wrestle with, what seems to matter to them, and how they engage. Plain prose, third person, warm but factual. No headers, no markdown. Do not restate the known facts; focus on themes and inner movement.

Onboarding: familiarity ${profile.familiarity}; intentions: ${profile.intentions.join(', ') || 'unknown'}; interests: ${profile.interests.join(', ') || 'unknown'}; family tradition: ${profile.familyStream || 'unknown'}.
Known facts about them: ${factsLine || 'none yet'}.
${profile.profileSummary ? `Previous summary: ${profile.profileSummary}` : ''}

Recent reflections:
${recent}`;

      const summary = await geminiService.generateOneOff(prompt);
      await LocalStorageService.updateSpiritualProfile({
        profileSummary: summary.trim(),
        summaryUpdatedAt: new Date().toISOString(),
        reflectionCountAtSummary: newCount,
      });
      console.log('[context] profile summary refreshed');
    } catch (error) {
      console.log('Profile summary refresh failed (will retry later):', error);
    } finally {
      this.summaryRefreshInFlight = false;
    }
  }
}

export const krishnaContext = KrishnaContextService.getInstance();
export default krishnaContext;
