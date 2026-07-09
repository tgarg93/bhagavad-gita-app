// Uniform read/write layer over everything the app knows about the user,
// backed by the registry in src/data/userKnowledgeSchema.ts. Core fields
// live on SpiritualProfile's own props (onboarding data, untouched storage);
// structured fields live in profile.structuredProfile with provenance.
//
// This service owns ALL structuredProfile writes: updateSpiritualProfile is a
// shallow merge, so the map must be re-read and merged fresh on every write.
import LocalStorageService, {
  KnowledgeSource,
  SpiritualProfile,
  StructuredField,
} from './localStorageService';
import { geminiService } from './geminiService';
import {
  fieldByKey,
  USER_KNOWLEDGE_FIELDS,
  UserKnowledgeField,
  UserKnowledgeKey,
} from '../data/userKnowledgeSchema';

const MAX_ANSWER_CHARS = 500;
const DEFAULT_MAX_LEN = 60;
// Junk the model sometimes returns instead of omitting a field
const SENTINELS = new Set(['unknown', 'n/a', 'na', 'none', 'not stated', 'not mentioned', 'null', 'nothing']);

class UserKnowledgeService {
  private static instance: UserKnowledgeService;
  private extractionInFlight = false;

  static getInstance(): UserKnowledgeService {
    if (!UserKnowledgeService.instance) {
      UserKnowledgeService.instance = new UserKnowledgeService();
    }
    return UserKnowledgeService.instance;
  }

  // ——— Read layer: one API over core + structured fields ———

  private optionLabel(field: UserKnowledgeField, value: string): string | undefined {
    return field.options?.find(o => o.value === value)?.label;
  }

  getDisplayValue(profile: SpiritualProfile, key: UserKnowledgeKey): string | undefined {
    const field = fieldByKey(key);
    if (field.storage === 'structured') {
      return profile.structuredProfile?.[key]?.value;
    }
    switch (key) {
      case 'name':
        return profile.name || undefined;
      case 'familiarity':
        return this.optionLabel(field, profile.familiarity);
      case 'intentions':
        return profile.intentions.length ? profile.intentions.join(', ') : undefined;
      case 'interests':
        return profile.interests.length ? profile.interests.join(', ') : undefined;
      case 'dailyGoalMinutes':
        return this.optionLabel(field, String(profile.dailyGoalMinutes));
      default:
        return undefined;
    }
  }

  isKnown(profile: SpiritualProfile, key: UserKnowledgeKey): boolean {
    return this.getDisplayValue(profile, key) !== undefined;
  }

  getCompletion(profile: SpiritualProfile): { known: number; total: number } {
    const known = USER_KNOWLEDGE_FIELDS.filter(f => this.isKnown(profile, f.key)).length;
    return { known, total: USER_KNOWLEDGE_FIELDS.length };
  }

  // Structured facts as label/value pairs for the Krishna context block and
  // the profile-summary prompt (core fields already have their own lines there).
  knownStructuredLines(profile: SpiritualProfile): { label: string; value: string }[] {
    return USER_KNOWLEDGE_FIELDS.filter(f => f.storage === 'structured')
      .map(f => ({ label: f.label, value: profile.structuredProfile?.[f.key]?.value }))
      .filter((l): l is { label: string; value: string } => !!l.value);
  }

  // ——— Write layer ———

  // Returns the updated profile. For structured fields, an 'extracted' write
  // never replaces a value the user set themselves.
  async setField(
    key: UserKnowledgeKey,
    value: string | string[],
    source: KnowledgeSource
  ): Promise<SpiritualProfile> {
    const field = fieldByKey(key);

    if (field.storage === 'structured') {
      const single = Array.isArray(value) ? value.join(', ') : value;
      const existing = (await LocalStorageService.getSpiritualProfile()).structuredProfile?.[key];
      if (source === 'extracted' && existing?.source === 'user') {
        return LocalStorageService.getSpiritualProfile();
      }
      return this.writeStructured({
        [key]: { value: single.trim(), source, updatedAt: new Date().toISOString() },
      });
    }

    const patch: Partial<SpiritualProfile> = {};
    switch (key) {
      case 'name':
        patch.name = (value as string).trim() || undefined;
        break;
      case 'familiarity':
        patch.familiarity = value as SpiritualProfile['familiarity'];
        break;
      case 'intentions':
        patch.intentions = value as string[];
        break;
      case 'interests':
        patch.interests = value as string[];
        break;
      case 'dailyGoalMinutes':
        patch.dailyGoalMinutes = Number(value) as SpiritualProfile['dailyGoalMinutes'];
        break;
    }
    return LocalStorageService.updateSpiritualProfile(patch);
  }

  async clearStructuredFields(): Promise<void> {
    await LocalStorageService.updateSpiritualProfile({ structuredProfile: {} });
  }

  // Fresh read-merge-write of the structuredProfile map — never hand a stale
  // map to updateSpiritualProfile's shallow top-level merge.
  private async writeStructured(
    patch: Record<string, StructuredField>
  ): Promise<SpiritualProfile> {
    const fresh = await LocalStorageService.getSpiritualProfile();
    return LocalStorageService.updateSpiritualProfile({
      structuredProfile: { ...(fresh.structuredProfile ?? {}), ...patch },
    });
  }

  // ——— Opportunistic extraction ———

  // Called fire-and-forget on every first reflection answer, from any content.
  // One cheap Gemini call asks only for the still-unknown extractable fields;
  // skipped entirely once everything is known. Never throws.
  async maybeExtractFromReflection(question: string, answer: string): Promise<void> {
    if (this.extractionInFlight) return;
    try {
      const profile = await LocalStorageService.getSpiritualProfile();
      const unknown = USER_KNOWLEDGE_FIELDS.filter(
        f => f.extraction && !this.isKnown(profile, f.key)
      );
      if (unknown.length === 0) {
        console.log('[knowledge] all extractable fields known — extraction skipped');
        return;
      }

      this.extractionInFlight = true;
      const raw = await geminiService.generateOneOff(this.buildExtractionPrompt(unknown, question, answer), {
        maxOutputTokens: 4096, // thinking tokens count against the cap; 800 default truncates JSON
      });

      const extracted = this.parseExtraction(raw, unknown);
      if (Object.keys(extracted).length === 0) {
        console.log('[knowledge] nothing extractable in this answer');
        return;
      }

      // Re-read before writing: drop anything that became known meanwhile
      const latest = await LocalStorageService.getSpiritualProfile();
      const patch: Record<string, StructuredField> = {};
      const now = new Date().toISOString();
      for (const [key, value] of Object.entries(extracted)) {
        if (this.isKnown(latest, key as UserKnowledgeKey)) continue;
        patch[key] = { value, source: 'extracted', updatedAt: now };
      }
      if (Object.keys(patch).length === 0) return;

      await this.writeStructured(patch);
      console.log('[knowledge] extracted:', Object.keys(patch).join(', '));
    } catch (error) {
      console.log('[knowledge] extraction failed (will retry on a later answer):', error);
    } finally {
      this.extractionInFlight = false;
    }
  }

  private buildExtractionPrompt(
    unknown: UserKnowledgeField[],
    question: string,
    answer: string
  ): string {
    const fieldLines = unknown.map(f => `- ${f.key}: ${f.extraction}`).join('\n');
    return `You extract personal facts from a private journal reflection, to respectfully personalize a spiritual learning app. Below are the ONLY fields you may fill. Include a field ONLY if the person's answer CLEARLY and explicitly states it — do not guess, do not infer from tone, do not stretch. Most answers contain none of these facts; returning an empty object is the normal, correct outcome.

Fields (key: what to extract):
${fieldLines}

Reflection question they were answering:
"${question}"

What they wrote:
"${answer.slice(0, MAX_ANSWER_CHARS)}"

Return STRICT JSON only: a single object using only the keys above, every value a short string of at most 8 words. No markdown, no commentary. Return {} if nothing is clearly stated.`;
  }

  // Tolerant of fences, surrounding prose, and junk values; each field is
  // validated independently so one bad value doesn't discard the rest.
  private parseExtraction(
    raw: string,
    unknown: UserKnowledgeField[]
  ): Record<string, string> {
    const result: Record<string, string> = {};
    let parsed: unknown;
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start < 0 || end <= start) throw new Error('no JSON object in response');
      parsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch (error) {
      console.log('[knowledge] could not parse extraction response:', error);
      return result;
    }
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return result;

    const byKey = new Map(unknown.map(f => [f.key as string, f]));
    for (const [key, rawValue] of Object.entries(parsed)) {
      const field = byKey.get(key);
      if (!field || typeof rawValue !== 'string') continue;
      const value = rawValue.trim();
      if (!value || value.length > (field.maxLen ?? DEFAULT_MAX_LEN)) continue;
      if (SENTINELS.has(value.toLowerCase())) continue;

      if (field.kind === 'singleSelect' || field.kind === 'multiSelect') {
        const match = (field.options ?? []).find(
          o =>
            o.value.toLowerCase() === value.toLowerCase() ||
            o.label.toLowerCase() === value.toLowerCase()
        );
        if (!match) continue;
        result[key] = match.value;
      } else {
        result[key] = value;
      }
    }
    return result;
  }
}

export const userKnowledge = UserKnowledgeService.getInstance();
export default userKnowledge;
