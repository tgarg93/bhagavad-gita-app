// The canonical map of what the app wants to know about a person to
// personalize their journey. Every surface that learns about the user —
// onboarding, reflection extraction, direct edits in the profile sheet —
// reads and writes through this registry (via userKnowledgeService), so
// adding a field here is all it takes to teach the whole app about it.
//
// Pure data: no imports, safe to require from anywhere.

export type UserKnowledgeKey =
  // Core — collected at onboarding, stored on SpiritualProfile's own props
  | 'name'
  | 'familiarity'
  | 'intentions'
  | 'interests'
  | 'dailyGoalMinutes'
  // Structured — learned over time, stored in SpiritualProfile.structuredProfile
  | 'occupationDomain'
  | 'lifeStage'
  | 'relationships'
  | 'recentLifeEvent'
  | 'currentStruggle'
  | 'aspiration'
  | 'existingPractice'
  | 'practiceTime'
  | 'practiceContext'
  | 'culturalContext'
  | 'mentorStyle';

export type FieldKind = 'freeText' | 'singleSelect' | 'multiSelect';

export interface FieldOption {
  value: string; // canonical stored value
  label: string; // shown in the UI
}

export interface UserKnowledgeField {
  key: UserKnowledgeKey;
  label: string; // row label and context-block fact label, e.g. "Life stage"
  category: string; // one of CATEGORIES
  kind: FieldKind;
  options?: FieldOption[];
  // Invitation shown on an unanswered row, e.g. "What fills your days?"
  askPrompt: string;
  // Instruction for Gemini extraction from reflection answers.
  // Absent = never extracted (onboarding-only or explicitly declared preferences).
  extraction?: string;
  storage: 'core' | 'structured';
  maxLen?: number; // stored-value cap, default 60
}

export const CATEGORIES = [
  'About you',
  'Life right now',
  'Inner journey',
  'Practice',
  'Guidance',
] as const;

// Option strings for core fields mirror OnboardingScreen exactly — the raw
// display strings are what's stored in the profile today.
const FAMILIARITY_OPTIONS: FieldOption[] = [
  { value: 'new', label: 'Just beginning' },
  { value: 'some', label: 'Some familiarity' },
  { value: 'deep', label: 'Well acquainted' },
];

const INTENTION_OPTIONS: FieldOption[] = [
  'Learn the Bhagavad Gita',
  'Understand Hindu philosophy',
  'Build a daily practice',
  'Stories & festivals',
  'Personal growth',
].map(v => ({ value: v, label: v }));

const INTEREST_OPTIONS: FieldOption[] = [
  'Krishna',
  'Meditation',
  'Festivals',
  'Philosophy',
  'Scriptures',
].map(v => ({ value: v, label: v }));

const GOAL_OPTIONS: FieldOption[] = [
  { value: '5', label: '5 min / day' },
  { value: '10', label: '10 min / day' },
  { value: '15', label: '15 min / day' },
  { value: '20', label: '20 min / day' },
];

export const USER_KNOWLEDGE_FIELDS: UserKnowledgeField[] = [
  // ——— About you ———
  {
    key: 'name',
    label: 'Name',
    category: 'About you',
    kind: 'freeText',
    askPrompt: 'What may Krishna call you?',
    storage: 'core',
    maxLen: 30,
  },
  {
    key: 'familiarity',
    label: 'Familiarity with the teachings',
    category: 'About you',
    kind: 'singleSelect',
    options: FAMILIARITY_OPTIONS,
    askPrompt: 'How familiar are you with Hindu teachings?',
    storage: 'core',
  },
  {
    key: 'intentions',
    label: 'What brings you here',
    category: 'About you',
    kind: 'multiSelect',
    options: INTENTION_OPTIONS,
    askPrompt: 'What brings you to this journey?',
    storage: 'core',
  },
  {
    key: 'interests',
    label: 'What draws you most',
    category: 'About you',
    kind: 'multiSelect',
    options: INTEREST_OPTIONS,
    askPrompt: 'What draws you most?',
    storage: 'core',
  },
  {
    key: 'culturalContext',
    label: 'Path to these teachings',
    category: 'About you',
    kind: 'freeText',
    askPrompt: 'How did you come to these teachings?',
    extraction:
      'their relationship to Hindu tradition — e.g. "grew up Hindu in India", "second-generation diaspora", "newcomer from another background" — only if explicitly indicated',
    storage: 'structured',
  },

  // ——— Life right now ———
  {
    key: 'occupationDomain',
    label: 'Occupation',
    category: 'Life right now',
    kind: 'freeText',
    askPrompt: 'What fills your days?',
    extraction:
      'their line of work or main daily occupation, as a short phrase (e.g. "software engineering", "school teacher", "caring for young children")',
    storage: 'structured',
  },
  {
    key: 'lifeStage',
    label: 'Life stage',
    category: 'Life right now',
    kind: 'singleSelect',
    options: [
      'Student',
      'Early career',
      'Establishing career',
      'Raising a family',
      'Midlife',
      'Later life',
    ].map(v => ({ value: v, label: v })),
    askPrompt: 'Where are you in life?',
    extraction:
      'EXACTLY one of "Student", "Early career", "Establishing career", "Raising a family", "Midlife", "Later life" — only if their stage of life is clearly stated',
    storage: 'structured',
  },
  {
    key: 'relationships',
    label: 'Who shares your life',
    category: 'Life right now',
    kind: 'freeText',
    askPrompt: 'Who shares your life?',
    extraction:
      'who shares their life — partner, children, parents they care for — as a short phrase (e.g. "married, two young kids")',
    storage: 'structured',
  },
  {
    key: 'recentLifeEvent',
    label: 'Recent life change',
    category: 'Life right now',
    kind: 'freeText',
    askPrompt: 'Anything big changing in your life?',
    extraction:
      'a major recent life change they explicitly mention (new job, move, loss, marriage, new child)',
    storage: 'structured',
  },

  // ——— Inner journey ———
  {
    key: 'currentStruggle',
    label: 'Current struggle',
    category: 'Inner journey',
    kind: 'freeText',
    askPrompt: 'What are you wrestling with right now?',
    extraction:
      'the difficulty or question they are currently wrestling with, in their own terms, as a short phrase',
    storage: 'structured',
  },
  {
    key: 'aspiration',
    label: 'Growing toward',
    category: 'Inner journey',
    kind: 'freeText',
    askPrompt: 'What do you hope to grow toward?',
    extraction:
      'what they hope to become or grow toward, as a short phrase (e.g. "more patient with my children", "inner steadiness")',
    storage: 'structured',
  },

  // ——— Practice ———
  {
    key: 'existingPractice',
    label: 'Existing practice',
    category: 'Practice',
    kind: 'freeText',
    askPrompt: 'Do you already keep a practice?',
    extraction:
      'any spiritual practice they already keep — meditation, puja, japa, yoga, temple visits — as a short phrase',
    storage: 'structured',
  },
  {
    key: 'practiceTime',
    label: 'When you practice',
    category: 'Practice',
    kind: 'singleSelect',
    options: [
      'Early morning',
      'Morning',
      'Midday',
      'Evening',
      'Before bed',
      'It varies',
    ].map(v => ({ value: v, label: v })),
    askPrompt: 'When in your day does practice fit best?',
    extraction:
      'EXACTLY one of "Early morning", "Morning", "Midday", "Evening", "Before bed", "It varies" — only if they clearly say when they practice or prefer to',
    storage: 'structured',
  },
  {
    key: 'practiceContext',
    label: 'How you practice',
    category: 'Practice',
    kind: 'singleSelect',
    options: [
      'On my own',
      'With family',
      'With a temple or community',
    ].map(v => ({ value: v, label: v })),
    askPrompt: 'Do you practice alone or with others?',
    extraction:
      'EXACTLY one of "On my own", "With family", "With a temple or community" — only if clearly stated',
    storage: 'structured',
  },
  {
    key: 'dailyGoalMinutes',
    label: 'Daily goal',
    category: 'Practice',
    kind: 'singleSelect',
    options: GOAL_OPTIONS,
    askPrompt: 'How much time shall we spend together each day?',
    storage: 'core',
  },

  // ——— Guidance ———
  {
    key: 'mentorStyle',
    label: 'How Krishna should speak with you',
    category: 'Guidance',
    kind: 'singleSelect',
    options: [
      'Gentle & encouraging',
      'Direct & challenging',
      'Philosophical & deep',
      'Through stories',
    ].map(v => ({ value: v, label: v })),
    askPrompt: 'How should Krishna speak with you?',
    // Deliberately not extracted: a preference the user declares, not one to infer.
    storage: 'structured',
  },
];

export function fieldByKey(key: UserKnowledgeKey): UserKnowledgeField {
  const field = USER_KNOWLEDGE_FIELDS.find(f => f.key === key);
  if (!field) throw new Error(`Unknown user-knowledge field: ${key}`);
  return field;
}
