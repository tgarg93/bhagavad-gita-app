// A knowledge check, as a page in the reader.
//
// Two behaviours worth knowing:
//   • A wrong MCQ answer still advances. Nothing is locked (CLAUDE.md) — the
//     check exists to make the idea land, not to bar the door. The explanation
//     shows either way, which is where the teaching actually happens.
//   • A recall check degrades rather than dead-ends. If the grader is
//     unreachable, we reveal the model answer and let the reader self-mark
//     against the rubric.
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

const C = DharmaDesignSystem.colors;
const GOOD = C.sacred.banyanGreen;
const MISS = C.sacred.warningRed;

interface Props {
  check: McqCheck | RecallCheck;
  getTextStyle: (base: any) => any;
  onResolved: () => void; // the reader unlocks "continue" on this
  onContinue?: () => void; // advance the pager to the next page
}

const CheckPage: React.FC<Props> = ({ check, getTextStyle, onResolved, onContinue }) => {
  return check.kind === 'mcq' ? (
    <Mcq check={check} getTextStyle={getTextStyle} onResolved={onResolved} onContinue={onContinue} />
  ) : (
    <Recall check={check} getTextStyle={getTextStyle} onResolved={onResolved} onContinue={onContinue} />
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
const Recall: React.FC<{ check: RecallCheck; getTextStyle: any; onResolved: () => void; onContinue?: () => void }> = ({
  check,
  getTextStyle,
  onResolved,
  onContinue,
}) => {
  const [answer, setAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  // Set when the grader was unreachable — the reader marks their own rubric.
  const [selfMark, setSelfMark] = useState<Set<number> | null>(null);

  useEffect(() => {
    (async () => {
      const prior = await foundationsService.getCheckResult(check.id);
      if (prior?.correct) onResolved();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check.id]);

  const submit = useCallback(async () => {
    if (!answer.trim() || grading) return;
    setGrading(true);
    const result = await checkService.gradeRecall(check, answer);
    setGrading(false);

    if (!result) {
      // Grader unreachable. Not a dead end — reveal the answer and self-mark.
      setSelfMark(new Set());
      return;
    }
    setGrade(result);
    await foundationsService.recordCheck(check.id, result.passed);
    onResolved();
  }, [answer, grading, check, onResolved]);

  const toggleSelf = async (i: number) => {
    if (!selfMark) return;
    const next = new Set(selfMark);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelfMark(next);
    const passed = next.size >= check.passCount;
    if (passed) {
      await foundationsService.recordCheck(check.id, true);
      onResolved();
    }
  };

  const resolved = !!grade || (selfMark !== null && selfMark.size >= check.passCount);

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>Say it back</Text>
      <Text style={getTextStyle(styles.prompt)}>{check.prompt}</Text>

      <TextInput
        style={getTextStyle(styles.input)}
        value={answer}
        onChangeText={setAnswer}
        placeholder="However you'd say it out loud. A couple of sentences is plenty."
        placeholderTextColor={C.neutrals.softAsh}
        multiline
        editable={!grade && selfMark === null}
        textAlignVertical="top"
      />

      {!grade && selfMark === null && (
        <TouchableOpacity
          style={[styles.submit, (!answer.trim() || grading) && styles.submitOff]}
          onPress={submit}
          disabled={!answer.trim() || grading}
          accessibilityRole="button"
        >
          {grading ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.submitText}>Krishna is reading…</Text>
            </>
          ) : (
            <Text style={styles.submitText}>Show me</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Graded by Krishna */}
      {grade && (
        <View style={styles.result}>
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
          <View style={[styles.verdict, grade.passed && styles.verdictPass]}>
            <Text style={styles.verdictTitle}>
              {grade.passed ? 'That’s it.' : 'You’ve got most of it.'}
            </Text>
            <Text style={getTextStyle(styles.verdictBody)}>{grade.feedback}</Text>
          </View>
        </View>
      )}

      {/* Grader unreachable — self-mark */}
      {selfMark !== null && (
        <View style={styles.result}>
          <View style={styles.offline}>
            <Ionicons name="cloud-offline-outline" size={15} color={C.neutrals.softAsh} />
            <Text style={styles.offlineText}>
              Krishna couldn’t reach you just now. Mark it yourself — which of these did you say?
            </Text>
          </View>
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
          <View style={[styles.verdict, resolved && styles.verdictPass]}>
            <Text style={styles.verdictTitle}>Here’s how I’d have said it</Text>
            <Text style={getTextStyle(styles.verdictBody)}>{check.modelAnswer}</Text>
          </View>
        </View>
      )}

      {(grade || selfMark !== null) && onContinue && (
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
  input: {
    minHeight: 120,
    padding: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
    backgroundColor: C.neutrals.warmIvory,
    fontSize: 15.5,
    lineHeight: 23,
    color: C.neutrals.charcoalBlack,
  },
  submit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 4,
    backgroundColor: C.primary.deepSaffron,
  },
  submitOff: { opacity: 0.45 },
  submitText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  result: { marginTop: 20, gap: 14 },
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
  verdict: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
    backgroundColor: C.neutrals.warmIvory,
  },
  verdictPass: { borderColor: GOOD, backgroundColor: 'rgba(56,142,60,0.09)' },
  verdictTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
    marginBottom: 5,
  },
  verdictBody: { fontSize: 14.5, lineHeight: 22, color: C.neutrals.softAsh },
  offline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 2,
  },
  offlineText: { flex: 1, fontSize: 13, lineHeight: 19, color: C.neutrals.softAsh },
});

export default CheckPage;
