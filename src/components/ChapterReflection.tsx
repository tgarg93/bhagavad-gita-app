import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import LocalStorageService, { ReflectionEntry, ReflectionTurn } from '../services/localStorageService';
import { geminiService, isAuthError } from '../services/geminiService';
import krishnaContext from '../services/krishnaContextService';

interface ChapterReflectionProps {
  chapterNumber: number;
  chapterTitle: string;
  subtitle: string;
  questions: string[];
}

const genId = () => `refl-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

const FALLBACK_STARTERS = [
  'Lately at work…',
  'In my family…',
  'Honestly, I’m not sure — but…',
];

// A chat bubble with the speaker's avatar: Krishna on the left, the reader on
// the right (empty person avatar for now).
const Bubble: React.FC<{ role: 'krishna' | 'user'; text: string }> = ({ role, text }) => {
  if (role === 'krishna') {
    return (
      <View style={styles.krishnaRow}>
        <Image source={require('../../assets/krishna-logo.png')} style={styles.avatar} resizeMode="contain" />
        <View style={styles.krishnaBubble}>
          <Text style={styles.krishnaBubbleText}>{text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userBubbleText}>{text}</Text>
      </View>
      <View style={styles.userAvatar}>
        <Ionicons name="person" size={16} color={DharmaDesignSystem.colors.neutrals.softAsh} />
      </View>
    </View>
  );
};

// Inline conversational reflection: Krishna asks one question at a time; the
// reader answers (with personalized suggestion pills), can keep the exchange
// going, and taps "Complete" to move to the next question.
const ChapterReflection: React.FC<ChapterReflectionProps> = ({
  chapterNumber,
  chapterTitle,
  subtitle,
  questions,
}) => {
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[][]>([]);

  const entryFor = useCallback(
    (qIndex: number): ReflectionEntry | undefined =>
      reflections.find(r => r.questionIndex === qIndex),
    [reflections]
  );

  const loadReflections = useCallback(async () => {
    const stored = await LocalStorageService.getReflections(chapterNumber);
    setReflections(stored);
    // Active question = first not-yet-completed one (an answered-but-open
    // conversation stays active so the user can continue or complete it)
    let next = 0;
    while (next < questions.length) {
      const e = stored.find(r => r.questionIndex === next);
      if (!e || !e.completed) break;
      next++;
    }
    setQuestionIndex(next);
    setLoaded(true);
  }, [chapterNumber, questions.length]);

  useEffect(() => {
    loadReflections();
  }, [loadReflections]);

  // One batched call for personalized answer starters for all questions
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const contextBlock = await krishnaContext.buildContextBlock();
        const list = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        const raw = await geminiService.generateOneOff(
          `${contextBlock}\n\nFor each reflection question below, write 3 short first-person answer starters this specific person might genuinely begin with (max 12 words each, unfinished sentences are good). Return STRICT JSON only: an array of arrays of strings, one inner array per question, no markdown.\n\nQuestions:\n${list}`,
          { maxOutputTokens: 4096 } // thinking tokens count against the cap; 800 truncated the JSON
        );
        // Robust extraction: take the outermost JSON array even if the model
        // wraps it in prose or fences, or trails off
        const cleaned = raw.replace(/```json|```/g, '').trim();
        const start = cleaned.indexOf('[');
        const end = cleaned.lastIndexOf(']');
        if (start < 0 || end <= start) throw new Error('no JSON array in response');
        const parsed = JSON.parse(cleaned.slice(start, end + 1));
        if (!cancelled && Array.isArray(parsed)) {
          setSuggestions(parsed.map((arr: any) => (Array.isArray(arr) ? arr.slice(0, 3).map(String) : [])));
          console.log('[reflection] personalized starters loaded');
        }
      } catch (error) {
        console.log('Starter suggestions unavailable, using fallbacks:', error);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterNumber]);

  const answeredCount = useMemo(
    () => questions.filter((_, i) => entryFor(i)?.completed).length,
    [questions, entryFor]
  );
  const allDone = answeredCount >= questions.length;
  const activeQuestion = questionIndex < questions.length ? questions[questionIndex] : null;
  const activeEntry = activeQuestion !== null ? entryFor(questionIndex) : undefined;

  // Full transcript for a question: first exchange + follow-up thread
  const transcriptFor = (entry: ReflectionEntry): { role: 'user' | 'krishna'; text: string }[] => {
    const t: { role: 'user' | 'krishna'; text: string }[] = [{ role: 'user', text: entry.answer }];
    if (entry.krishnaResponse) t.push({ role: 'krishna', text: entry.krishnaResponse });
    for (const turn of entry.thread ?? []) t.push({ role: turn.role, text: turn.text });
    return t;
  };

  const send = async () => {
    if (activeQuestion === null || !answer.trim() || submitting) return;
    setSubmitting(true);
    const text = answer.trim();
    setAnswer('');

    const user = await LocalStorageService.getCurrentUser();
    const userId = user?.id || 'guest';
    const contextBlock = await krishnaContext.buildContextBlock().catch(() => undefined);

    let entry = entryFor(questionIndex);
    try {
      if (!entry) {
        // First exchange for this question
        entry = {
          id: genId(),
          userId,
          chapterNumber,
          questionIndex,
          question: activeQuestion,
          answer: text,
          createdAt: new Date().toISOString(),
        };
        await LocalStorageService.saveReflection(entry);
        await markChapterReflectedOn(userId);
        try {
          entry.krishnaResponse = await geminiService.generateReflectionResponse({
            chapterNumber, chapterTitle, subtitle,
            question: activeQuestion, answer: text, contextBlock,
          });
        } catch (error) {
          entry.krishnaResponse = isAuthError(error)
            ? undefined
            : 'I could not reach you just now — but your words are saved. Return when you are online and we will reflect on this together.';
        }
        await LocalStorageService.saveReflection(entry);
      } else {
        // Follow-up turn
        const userTurn: ReflectionTurn = { role: 'user', text, at: new Date().toISOString() };
        entry.thread = [...(entry.thread ?? []), userTurn];
        await LocalStorageService.saveReflection(entry);
        try {
          const reply = await geminiService.continueReflection({
            chapterNumber, chapterTitle,
            question: entry.question,
            transcript: transcriptFor(entry),
            contextBlock,
          });
          entry.thread = [...entry.thread, { role: 'krishna', text: reply, at: new Date().toISOString() }];
        } catch {
          entry.thread = [...entry.thread, {
            role: 'krishna',
            text: 'I could not reach you just now — your words are saved; we will pick this up again.',
            at: new Date().toISOString(),
          }];
        }
        await LocalStorageService.saveReflection(entry);
      }
      krishnaContext.maybeRefreshSummary();
    } finally {
      setSubmitting(false);
      await loadReflections();
    }
  };

  const completeQuestion = async () => {
    const entry = entryFor(questionIndex);
    if (!entry) return;
    entry.completed = true;
    await LocalStorageService.saveReflection(entry);
    await loadReflections();
  };

  const markChapterReflectedOn = async (userId: string) => {
    try {
      const progress = await LocalStorageService.getUserProgress(userId);
      if (progress && !progress.chaptersCompleted.includes(chapterNumber)) {
        progress.chaptersCompleted.push(chapterNumber);
        await LocalStorageService.saveUserProgress(progress);
      }
    } catch {
      // progress tracking is best-effort
    }
  };

  if (!loaded) return null;

  const activeSuggestions =
    (suggestions[questionIndex] && suggestions[questionIndex].length > 0
      ? suggestions[questionIndex]
      : FALLBACK_STARTERS);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="leaf-outline" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
        <Text style={styles.headerTitle}>Pause & Reflect</Text>
        <Text style={styles.headerCount}>{answeredCount}/{questions.length}</Text>
      </View>

      {/* Completed + active conversations */}
      {questions.map((question, i) => {
        const entry = entryFor(i);
        if (!entry && i !== questionIndex) return null;
        if (i > questionIndex) return null;
        return (
          <View key={i} style={styles.exchange}>
            <Bubble role="krishna" text={question} />
            {entry && transcriptFor(entry).map((turn, j) => (
              <Bubble key={j} role={turn.role} text={turn.text} />
            ))}
          </View>
        );
      })}

      {submitting && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color={DharmaDesignSystem.colors.primary.deepSaffron} />
          <Text style={styles.typingText}>Krishna is reflecting…</Text>
        </View>
      )}

      {/* Suggestion pills — pre-fill the input for editing */}
      {activeQuestion !== null && !submitting && !answer && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
          {activeSuggestions.map((s, i) => (
            <TouchableOpacity key={i} style={styles.pill} onPress={() => setAnswer(s)}>
              <Text style={styles.pillText} numberOfLines={1}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input + Complete */}
      {activeQuestion !== null && !submitting && (
        <>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
              placeholder={activeEntry ? 'Continue the conversation…' : 'Take your time. Write what comes…'}
              placeholderTextColor={DharmaDesignSystem.colors.neutrals.softAsh}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={[styles.sendBtn, !answer.trim() && styles.sendBtnDisabled]}
              onPress={send}
              disabled={!answer.trim()}
            >
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {activeEntry && (
            <TouchableOpacity style={styles.completeBtn} onPress={completeQuestion}>
              <Ionicons name="checkmark-circle-outline" size={18} color={DharmaDesignSystem.colors.primary.peacockTeal} />
              <Text style={styles.completeBtnText}>
                {questionIndex < questions.length - 1 ? 'Complete — next question' : 'Complete'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {allDone && (
        <View style={styles.exchange}>
          <Bubble
            role="krishna"
            text="Carry these thoughts with you — we will speak again in the next chapter."
          />
        </View>
      )}
    </View>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const AVATAR = 36;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.sizes.headingSM,
    color: colors.primary.deepSaffron,
    fontWeight: '700',
    flex: 1,
  },
  headerCount: {
    ...typography.sizes.caption,
    color: colors.neutrals.softAsh,
    fontWeight: '600',
  },
  exchange: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  krishnaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
    paddingRight: spacing.xl,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
  },
  krishnaBubble: {
    flex: 1,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderBottomLeftRadius: borderRadius.small,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    ...shadows.soft,
  },
  krishnaBubbleText: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.charcoalBlack,
    lineHeight: 24,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    paddingLeft: spacing.xl,
  },
  userAvatar: {
    width: AVATAR - 6,
    height: AVATAR - 6,
    borderRadius: (AVATAR - 6) / 2,
    backgroundColor: colors.neutrals.gentleMist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBubble: {
    flexShrink: 1,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.large,
    borderBottomRightRadius: borderRadius.small,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  userBubbleText: {
    ...typography.sizes.bodyMD,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    marginLeft: AVATAR + spacing.xs,
  },
  typingText: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.softAsh,
    fontStyle: 'italic',
  },
  pillsRow: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
  },
  pill: {
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxWidth: 260,
  },
  pillText: {
    ...typography.sizes.bodySM,
    color: colors.primary.deepSaffron,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  input: {
    ...typography.sizes.bodyMD,
    flex: 1,
    color: colors.neutrals.charcoalBlack,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    padding: spacing.md,
    minHeight: 72,
    lineHeight: 22,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(0, 121, 107, 0.35)',
    backgroundColor: 'rgba(0, 121, 107, 0.06)',
  },
  completeBtnText: {
    ...typography.sizes.bodyMD,
    color: colors.primary.peacockTeal,
    fontWeight: '600',
  },
});

export default ChapterReflection;
