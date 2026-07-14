// The capstone: a friend asks what Hinduism is, and the reader answers.
//
// Passing it confers Shishya. Three rules the UI enforces:
//   • It never says "fail". A short answer is "you've got most of it", and every
//     missed idea names the act that taught it, so the miss is actionable.
//   • Unlimited retries, no cooldown, no penalty. Nothing is locked.
//   • It cannot dead-end. If the grader is unreachable, the model answer is
//     revealed and the reader self-marks — a spinner that never resolves would
//     be the one screen in the app that blocks a level-up, which is unacceptable.
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
import { Capstone } from '../data/checkTypes';
import { foundationsService } from '../services/foundationsService';
import { checkService, GradeResult } from '../services/checkService';

const C = DharmaDesignSystem.colors;
const GOOD = C.sacred.banyanGreen;

interface Props {
  capstone: Capstone;
  getTextStyle: (base: any) => any;
  onPassed: () => void; // reveals the celebration page and fires the level-up
  onDefer: () => void; // "leave it for now" — completes the item, grants no rite
}

const CapstonePage: React.FC<Props> = ({ capstone, getTextStyle, onPassed, onDefer }) => {
  const [answer, setAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [selfMark, setSelfMark] = useState<Set<number> | null>(null);
  const [passed, setPassed] = useState(false);

  // A capstone passed in an earlier session stays passed. Looked up by riteId —
  // there is one capstone per stage, not one in the app.
  useEffect(() => {
    (async () => {
      const prior = await foundationsService.getCapstone(capstone.riteId);
      if (prior?.passed) {
        setPassed(true);
        setAnswer(prior.answer);
        onPassed();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capstone.riteId]);

  const pass = useCallback(
    async (graded: 'ai' | 'self', text: string) => {
      setPassed(true);
      await foundationsService.recordCapstone({
        riteId: capstone.riteId,
        passed: true,
        graded,
        answer: text,
      });
      onPassed();
    },
    [capstone.riteId, onPassed]
  );

  const submit = useCallback(async () => {
    if (!answer.trim() || grading) return;
    setGrading(true);
    const result = await checkService.gradeRecall(capstone, answer);
    setGrading(false);

    if (!result) {
      setSelfMark(new Set()); // grader unreachable → self-mark, never a dead end
      return;
    }
    setGrade(result);
    if (result.passed) await pass('ai', answer);
  }, [answer, grading, capstone, pass]);

  const retry = () => {
    setGrade(null);
    setSelfMark(null);
  };

  const toggleSelf = async (i: number) => {
    if (!selfMark || passed) return;
    const next = new Set(selfMark);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelfMark(next);
    if (next.size >= capstone.passCount) await pass('self', answer);
  };

  const showingResult = !!grade || selfMark !== null;
  const shortBy = grade ? capstone.passCount - grade.hit.length : 0;

  const rubricRow = (idea: string, i: number, hit: boolean, onPress?: () => void) => {
    const Row: any = onPress ? TouchableOpacity : View;
    return (
      <Row
        key={idea}
        style={[styles.rubricRow, hit && styles.rubricHit]}
        onPress={onPress}
        accessibilityRole={onPress ? 'checkbox' : undefined}
        accessibilityState={onPress ? { checked: hit } : undefined}
      >
        <View style={[styles.box, hit && styles.boxHit]}>
          {hit && <Ionicons name="checkmark" size={11} color="#fff" />}
        </View>
        <View style={styles.rubricBody}>
          <Text style={[getTextStyle(styles.rubricText), hit && styles.rubricTextHit]}>{idea}</Text>
          {/* A miss names where it was taught. Present is enough on its own. */}
          {!hit && !!capstone.rubricSource?.[i] && (
            <Text style={styles.rubricSource}>{capstone.rubricSource[i]}</Text>
          )}
        </View>
      </Row>
    );
  };

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>The capstone</Text>
      <Text style={getTextStyle(styles.prompt)}>{capstone.prompt}</Text>

      <TextInput
        style={getTextStyle(styles.input)}
        value={answer}
        onChangeText={setAnswer}
        placeholder="So, Hinduism is…"
        placeholderTextColor={C.neutrals.softAsh}
        multiline
        editable={!passed}
        textAlignVertical="top"
      />

      {!showingResult && !passed && (
        <>
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
              <Text style={styles.submitText}>That’s my answer</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onDefer} style={styles.defer} accessibilityRole="button">
            <Text style={styles.deferText}>Leave it for now</Text>
          </TouchableOpacity>
        </>
      )}

      {showingResult && (
        <View style={styles.result}>
          <View style={styles.rubric}>
            {capstone.rubric.map((idea, i) =>
              grade
                ? rubricRow(idea, i, grade.hit.includes(i))
                : rubricRow(idea, i, !!selfMark?.has(i), () => toggleSelf(i))
            )}
          </View>

          {selfMark !== null && !passed && (
            <View style={styles.offline}>
              <Ionicons name="cloud-offline-outline" size={15} color={C.neutrals.softAsh} />
              <Text style={styles.offlineText}>
                Krishna couldn’t reach you just now. Mark it yourself — tick the ideas you actually
                said. {capstone.passCount} of {capstone.rubric.length} is enough.
              </Text>
            </View>
          )}

          <View style={[styles.verdict, passed && styles.verdictPass]}>
            {passed ? (
              <>
                <Text style={styles.verdictTitle}>You just explained Hinduism.</Text>
                <Text style={getTextStyle(styles.verdictBody)}>
                  Not a definition you memorised — a thing you can say. That is the whole of Jigyasu,
                  and it is done.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.verdictTitle}>You’ve got most of it.</Text>
                <Text style={getTextStyle(styles.verdictBody)}>
                  {grade
                    ? `${grade.feedback} ${shortBy > 0 ? `${shortBy} more piece${shortBy > 1 ? 's' : ''} and it’s whole.` : ''}`
                    : 'Nothing here is locked. Go back for the pieces you haven’t said yet, then come straight back.'}
                </Text>
              </>
            )}
          </View>

          {!passed && (
            <>
              <View style={styles.model}>
                <Text style={styles.modelLabel}>Here’s how I’d have said it</Text>
                <Text style={getTextStyle(styles.modelText)}>{capstone.modelAnswer}</Text>
              </View>
              <TouchableOpacity style={styles.retry} onPress={retry} accessibilityRole="button">
                <Ionicons name="refresh" size={16} color={C.primary.deepSaffron} />
                <Text style={styles.retryText}>Say it again</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDefer} style={styles.defer} accessibilityRole="button">
                <Text style={styles.deferText}>Leave it for now</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.primary.deepSaffron,
    marginBottom: 14,
  },
  prompt: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
    marginBottom: 20,
  },
  input: {
    minHeight: 130,
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
    paddingVertical: 15,
    borderRadius: 4,
    backgroundColor: C.primary.deepSaffron,
  },
  submitOff: { opacity: 0.45 },
  submitText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  defer: { alignSelf: 'center', paddingVertical: 14 },
  deferText: { fontSize: 13.5, color: C.neutrals.softAsh, textDecorationLine: 'underline' },
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
  rubricBody: { flex: 1 },
  rubricText: { fontSize: 14, lineHeight: 20, color: C.neutrals.softAsh },
  rubricTextHit: { color: C.neutrals.charcoalBlack },
  rubricSource: {
    fontSize: 11,
    lineHeight: 15,
    color: C.primary.peacockTeal,
    fontWeight: '600',
    marginTop: 3,
  },
  verdict: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
    backgroundColor: C.neutrals.warmIvory,
  },
  verdictPass: { borderColor: GOOD, backgroundColor: 'rgba(56,142,60,0.09)' },
  verdictTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
    marginBottom: 5,
  },
  verdictBody: { fontSize: 14.5, lineHeight: 22, color: C.neutrals.softAsh },
  model: {
    padding: 14,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: C.primary.turmericYellow,
    backgroundColor: C.neutrals.warmIvory,
  },
  modelLabel: {
    fontSize: 10.5,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: C.neutrals.softAsh,
    marginBottom: 6,
  },
  modelText: { fontSize: 14.5, lineHeight: 22, color: C.neutrals.charcoalBlack },
  retry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: C.primary.deepSaffron,
  },
  retryText: { fontSize: 14.5, fontWeight: '700', color: C.primary.deepSaffron },
  offline: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingHorizontal: 2 },
  offlineText: { flex: 1, fontSize: 13, lineHeight: 19, color: C.neutrals.softAsh },
});

export default CapstonePage;
