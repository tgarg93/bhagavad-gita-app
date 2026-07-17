// A knowledge check, as a page in the reader.
//
// Two behaviours worth knowing:
//   • A wrong MCQ answer still advances. Nothing is locked (CLAUDE.md) — the
//     check exists to make the idea land, not to bar the door. The explanation
//     shows either way, which is where the teaching actually happens. MCQ stays
//     a tap: options in, result card out. It is deliberately NOT a chat.
//   • A recall check is a conversation with Krishna: he asks, you say it back,
//     he answers in his own voice. The grading underneath is unchanged — it
//     still marks the rubric and records a pass — only the feedback now lands
//     as a reply bubble instead of a verdict card. If the grader is
//     unreachable it degrades rather than dead-ends: the model answer appears
//     and the reader self-marks against the rubric.
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { McqCheck, RecallCheck } from '../data/checkTypes';
import { foundationsService } from '../services/foundationsService';
import { checkService, GradeResult } from '../services/checkService';
import { geminiService } from '../services/geminiService';
import krishnaContext from '../services/krishnaContextService';
import { Bubble } from './Bubble';

const C = DharmaDesignSystem.colors;
const GOOD = C.sacred.banyanGreen;
const MISS = C.sacred.warningRed;

type Turn = { role: 'user' | 'krishna'; text: string };

interface Props {
  check: McqCheck | RecallCheck;
  getTextStyle: (base: any) => any;
  onResolved: () => void; // the reader unlocks "continue" on this
  onContinue?: () => void; // advance the pager to the next page
  // Content title, woven into the multi-turn follow-up prompt so Krishna knows
  // what was just read. Recall only; MCQ ignores it.
  contentTitle?: string;
}

const CheckPage: React.FC<Props> = ({ check, getTextStyle, onResolved, onContinue, contentTitle }) => {
  return check.kind === 'mcq' ? (
    <Mcq check={check} getTextStyle={getTextStyle} onResolved={onResolved} onContinue={onContinue} />
  ) : (
    <Recall check={check} getTextStyle={getTextStyle} onResolved={onResolved} onContinue={onContinue} contentTitle={contentTitle} />
  );
};

// ─── MCQ ────────────────────────────────────────────────────────────────────
const Mcq: React.FC<{ check: McqCheck; getTextStyle: any; onResolved: () => void; onContinue?: () => void }> = ({
  check,
  getTextStyle,
  onResolved,
  onContinue,
}) => {
  const [picked, setPicked] = useState<number | null>(null);
  const correctIndex = check.options.findIndex(o => o.correct);

  // A check answered in an earlier session shows its resolved state on return.
  useEffect(() => {
    (async () => {
      const prior = await foundationsService.getCheckResult(check.id);
      if (prior?.correct) {
        setPicked(correctIndex);
        onResolved();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check.id]);

  const answer = async (index: number) => {
    if (picked !== null) return;
    setPicked(index);
    const correct = index === correctIndex;
    await foundationsService.recordCheck(check.id, correct);
    onResolved(); // right or wrong, the reader may continue
  };

  const answered = picked !== null;
  const answeredCorrectly = picked === correctIndex;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>Check yourself</Text>
      <Text style={getTextStyle(styles.prompt)}>{check.prompt}</Text>

      <View style={styles.options}>
        {check.options.map((opt, i) => {
          const isCorrect = i === correctIndex;
          const isPicked = i === picked;
          const state = !answered
            ? 'idle'
            : isCorrect
            ? 'right'
            : isPicked
            ? 'wrong'
            : 'dim';
          return (
            <TouchableOpacity
              key={opt.text}
              style={[styles.option, state === 'right' && styles.optRight, state === 'wrong' && styles.optWrong, state === 'dim' && styles.optDim]}
              onPress={() => answer(i)}
              disabled={answered}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ disabled: answered, selected: isPicked }}
            >
              <View
                style={[styles.dot, state === 'right' && styles.dotRight, state === 'wrong' && styles.dotWrong]}
              >
                {state === 'right' && <Ionicons name="checkmark" size={12} color="#fff" />}
                {state === 'wrong' && <Ionicons name="close" size={12} color="#fff" />}
              </View>
              <Text style={[getTextStyle(styles.optText), state === 'dim' && styles.optTextDim]}>
                {opt.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {answered && (
        <View style={[styles.resultCard, answeredCorrectly ? styles.resultGood : styles.resultMiss]}>
          <View style={styles.resultHeader}>
            <Ionicons
              name={answeredCorrectly ? 'checkmark-circle' : 'alert-circle'}
              size={20}
              color={answeredCorrectly ? GOOD : MISS}
            />
            <Text style={[styles.resultLabel, { color: answeredCorrectly ? GOOD : MISS }]}>
              {answeredCorrectly ? 'Correct!' : 'Not quite'}
            </Text>
          </View>
          <Text style={getTextStyle(styles.whyText)}>{check.why}</Text>
        </View>
      )}

      {answered && onContinue && (
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Continue"
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// ─── RECALL ─────────────────────────────────────────────────────────────────
// A conversation, not a form. Krishna asks (check.prompt), the reader says it
// back, and the grader's feedback — already written as "two warm sentences,
// naming one thing you got right and one worth adding" — becomes his reply.
const Recall: React.FC<{
  check: RecallCheck;
  getTextStyle: any;
  onResolved: () => void;
  onContinue?: () => void;
  contentTitle?: string;
}> = ({ check, getTextStyle, onResolved, onContinue, contentTitle }) => {
  const [answer, setAnswer] = useState('');
  // The conversation after Krishna's opening question: the reader's answer, his
  // feedback, and any follow-up turns. In memory only — checks persist a
  // pass/fail, not a transcript, so re-opening shows the resolved state afresh.
  const [transcript, setTranscript] = useState<Turn[]>([]);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [grading, setGrading] = useState(false); // first answer being graded
  const [sending, setSending] = useState(false); // a follow-up turn in flight
  const [recapOpen, setRecapOpen] = useState(false);
  // Set when the grader was unreachable — the reader marks their own rubric.
  const [selfMark, setSelfMark] = useState<Set<number> | null>(null);
  // Passed in an earlier session (no stored transcript to restore).
  const [priorPassed, setPriorPassed] = useState(false);

  useEffect(() => {
    (async () => {
      const prior = await foundationsService.getCheckResult(check.id);
      if (prior?.correct) {
        setPriorPassed(true);
        onResolved();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check.id]);

  // First answer → grade it. The rubric marking and pass/fail are unchanged;
  // only the presentation moved into the chat.
  const submit = useCallback(async () => {
    const text = answer.trim();
    if (!text || grading) return;
    setTranscript([{ role: 'user', text }]);
    setAnswer('');
    setGrading(true);
    const result = await checkService.gradeRecall(check, text);
    setGrading(false);

    if (!result) {
      // Grader unreachable. Not a dead end — reveal the answer, self-mark the
      // rubric. No follow-up chat is possible offline, so the input goes away.
      setSelfMark(new Set());
      setTranscript(t => [
        ...t,
        {
          role: 'krishna',
          text: `I couldn’t reach you just now. Here’s how I’d have said it: ${check.modelAnswer} Which of these did you say?`,
        },
      ]);
      return;
    }
    setGrade(result);
    setTranscript(t => [...t, { role: 'krishna', text: result.feedback }]);
    await foundationsService.recordCheck(check.id, result.passed);
    onResolved();
  }, [answer, grading, check, onResolved]);

  // Follow-up turn once graded — an ordinary Krishna conversation, reusing the
  // reflection continuation. Never re-grades; the recorded result stands.
  const sendFollowUp = useCallback(async () => {
    const text = answer.trim();
    if (!text || sending) return;
    const next: Turn[] = [...transcript, { role: 'user', text }];
    setTranscript(next);
    setAnswer('');
    setSending(true);
    const contextBlock = await krishnaContext.buildContextBlock().catch(() => undefined);
    try {
      const reply = await geminiService.continueReflection({
        chapterTitle: contentTitle ?? 'this idea',
        question: check.prompt,
        transcript: next,
        contextBlock,
      });
      setTranscript(t => [...t, { role: 'krishna', text: reply }]);
    } catch {
      setTranscript(t => [
        ...t,
        { role: 'krishna', text: 'I could not reach you just now — your words are here; we will pick this up again.' },
      ]);
    } finally {
      setSending(false);
    }
  }, [answer, sending, transcript, check.prompt, contentTitle]);

  const toggleSelf = async (i: number) => {
    if (!selfMark) return;
    const next = new Set(selfMark);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelfMark(next);
    if (next.size >= check.passCount) {
      await foundationsService.recordCheck(check.id, true);
      onResolved();
    }
  };

  const busy = grading || sending;
  // Continue is offered the moment there's a result to stand on — a fail still
  // advances (nothing is locked). Offline, it shows as soon as self-marking
  // opens. Skip is always available.
  const canContinue = grade !== null || selfMark !== null || priorPassed;
  // Input is for the first answer and for follow-ups; gone offline and mid-request.
  const showInput = selfMark === null && !busy;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>Say it back</Text>

      <Bubble role="krishna" text={check.prompt} />

      {priorPassed && transcript.length === 0 && (
        <View style={styles.afterPrompt}>
          <Bubble
            role="krishna"
            text="You’ve said this one back to me already. Continue when you’re ready, or say it again."
          />
        </View>
      )}

      {transcript.map((turn, i) => (
        <View key={i} style={styles.afterPrompt}>
          <Bubble role={turn.role} text={turn.text} />
        </View>
      ))}

      {busy && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color={C.primary.deepSaffron} />
          <Text style={styles.typingText}>Krishna is reading…</Text>
        </View>
      )}

      {/* Graded: a quiet, tappable recap of the rubric — expands to the marked
          rows and how Krishna would have said it. */}
      {grade && (
        <View style={styles.recapWrap}>
          <TouchableOpacity
            style={styles.recapLine}
            onPress={() => setRecapOpen(o => !o)}
            accessibilityRole="button"
            accessibilityLabel="Show what you covered"
          >
            <Text style={styles.recapText}>
              You covered {grade.hit.length} of {check.rubric.length}
            </Text>
            <Ionicons name={recapOpen ? 'chevron-up' : 'chevron-down'} size={14} color={C.neutrals.softAsh} />
          </TouchableOpacity>
          {recapOpen && (
            <View style={styles.recapBody}>
              <View style={styles.rubric}>
                {check.rubric.map((r, i) => {
                  const hit = grade.hit.includes(i);
                  return (
                    <View key={r} style={[styles.rubricRow, hit && styles.rubricHit]}>
                      <View style={[styles.box, hit && styles.boxHit]}>
                        {hit && <Ionicons name="checkmark" size={11} color="#fff" />}
                      </View>
                      <Text style={[getTextStyle(styles.rubricText), hit && styles.rubricTextHit]}>{r}</Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.modelLine}>Here’s how I’d have said it</Text>
              <Text style={getTextStyle(styles.modelBody)}>{check.modelAnswer}</Text>
            </View>
          )}
        </View>
      )}

      {/* Grader unreachable — self-mark against the rubric right in the chat. */}
      {selfMark !== null && (
        <View style={styles.recapBody}>
          <View style={styles.rubric}>
            {check.rubric.map((r, i) => {
              const hit = selfMark.has(i);
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.rubricRow, hit && styles.rubricHit]}
                  onPress={() => toggleSelf(i)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: hit }}
                >
                  <View style={[styles.box, hit && styles.boxHit]}>
                    {hit && <Ionicons name="checkmark" size={11} color="#fff" />}
                  </View>
                  <Text style={[getTextStyle(styles.rubricText), hit && styles.rubricTextHit]}>{r}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {showInput && (
        <View style={styles.inputRow}>
          <TextInput
            style={getTextStyle(styles.input)}
            value={answer}
            onChangeText={setAnswer}
            placeholder={
              transcript.length === 0
                ? "However you'd say it out loud. A couple of sentences is plenty."
                : 'Ask me anything about this…'
            }
            placeholderTextColor={C.neutrals.softAsh}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !answer.trim() && styles.sendBtnOff]}
            onPress={transcript.length === 0 ? submit : sendFollowUp}
            disabled={!answer.trim()}
            accessibilityRole="button"
            accessibilityLabel="Send"
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {canContinue && onContinue && (
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Complete and continue"
        >
          <Ionicons name="checkmark-circle-outline" size={18} color={C.primary.peacockTeal} />
          <Text style={styles.completeBtnText}>Complete — continue</Text>
        </TouchableOpacity>
      )}

      {onContinue && (
        <TouchableOpacity style={styles.skip} onPress={onContinue} accessibilityRole="button">
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32 },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.primary.peacockTeal,
    marginBottom: 14,
  },
  prompt: {
    fontSize: 21,
    lineHeight: 29,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
    marginBottom: 22,
  },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
    backgroundColor: C.neutrals.warmIvory,
  },
  optRight: { borderColor: GOOD, backgroundColor: 'rgba(56,142,60,0.09)' },
  optWrong: { borderColor: MISS, backgroundColor: 'rgba(198,40,40,0.07)' },
  optDim: { opacity: 0.5 },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: C.neutrals.softAsh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  dotRight: { backgroundColor: GOOD, borderColor: GOOD },
  dotWrong: { backgroundColor: MISS, borderColor: MISS },
  optText: { flex: 1, fontSize: 15, lineHeight: 21, color: C.neutrals.charcoalBlack },
  optTextDim: { color: C.neutrals.softAsh },
  whyText: { fontSize: 14.5, lineHeight: 22, color: C.neutrals.charcoalBlack },
  // One integrated result card: verdict header above the explanation, tinted by
  // correctness (replaces the old separate green banner + why box).
  resultCard: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  resultGood: { backgroundColor: 'rgba(56,142,60,0.10)', borderLeftColor: GOOD },
  resultMiss: { backgroundColor: 'rgba(198,40,40,0.08)', borderLeftColor: MISS },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  resultLabel: { fontSize: 16, lineHeight: 20, fontWeight: '700' },
  // The explicit way forward — swiping wasn't discoverable
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: C.primary.deepSaffron,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  // ─── Recall chat ───
  // Each bubble after Krishna's opening question gets a little breathing room.
  afterPrompt: { marginTop: 16 },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginLeft: 40,
  },
  typingText: { fontSize: 13.5, lineHeight: 19, fontStyle: 'italic', color: C.neutrals.softAsh },
  // The rubric, collapsed to one quiet line the reader can open.
  recapWrap: { marginTop: 16, marginLeft: 40 },
  recapLine: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  recapText: {
    fontSize: 13,
    lineHeight: 18,
    color: C.neutrals.softAsh,
    textDecorationLine: 'underline',
  },
  recapBody: { marginTop: 12, gap: 8 },
  rubric: { gap: 8 },
  rubricRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 11,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
  },
  rubricHit: { borderColor: GOOD, backgroundColor: 'rgba(56,142,60,0.09)' },
  box: {
    width: 17,
    height: 17,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: C.neutrals.softAsh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxHit: { backgroundColor: GOOD, borderColor: GOOD },
  rubricText: { flex: 1, fontSize: 14, lineHeight: 20, color: C.neutrals.softAsh },
  rubricTextHit: { color: C.neutrals.charcoalBlack },
  modelLine: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
    marginTop: 4,
  },
  modelBody: { fontSize: 13.5, lineHeight: 20, color: C.neutrals.softAsh },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 18,
  },
  input: {
    flex: 1,
    minHeight: 60,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    backgroundColor: C.neutrals.white,
    fontSize: 15.5,
    lineHeight: 22,
    color: C.neutrals.charcoalBlack,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnOff: { opacity: 0.4 },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 121, 107, 0.35)',
    backgroundColor: 'rgba(0, 121, 107, 0.06)',
  },
  completeBtnText: { fontSize: 15, fontWeight: '600', color: C.primary.peacockTeal },
  skip: { alignItems: 'center', marginTop: 12, paddingVertical: 4 },
  skipText: {
    fontSize: 13.5,
    color: C.neutrals.softAsh,
    textDecorationLine: 'underline',
  },
});

export default CheckPage;
