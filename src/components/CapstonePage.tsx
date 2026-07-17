// The capstone: a friend asks what Hinduism is, and the reader answers — as a
// conversation with Krishna, the same shape as a recall check.
//
// Passing it confers the stage's rite. Three rules the UI enforces:
//   • It never says "fail". A short answer is "you've got most of it", and every
//     missed idea names the act that taught it, so the miss is actionable.
//   • Unlimited retries, no cooldown, no penalty. Nothing is locked — because it
//     is a gate, every answer the reader sends is graded afresh, so a fuller
//     second attempt can pass where the first fell short.
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
import { Bubble } from './Bubble';

const C = DharmaDesignSystem.colors;
const GOOD = C.sacred.banyanGreen;

type Turn = { role: 'user' | 'krishna'; text: string };

const PASS_BUBBLE =
  'You just explained Hinduism. Not a definition you memorised — a thing you can say. ' +
  'That is the whole of Jigyasu, and it is done.';

interface Props {
  capstone: Capstone;
  getTextStyle: (base: any) => any;
  onPassed: () => void; // reveals the celebration page and fires the level-up
  onDefer: () => void; // "leave it for now" — completes the item, grants no rite
}

const CapstonePage: React.FC<Props> = ({ capstone, getTextStyle, onPassed, onDefer }) => {
  const [answer, setAnswer] = useState('');
  // The conversation after Krishna's opening question. In memory only.
  const [transcript, setTranscript] = useState<Turn[]>([]);
  const [grade, setGrade] = useState<GradeResult | null>(null); // latest attempt
  const [grading, setGrading] = useState(false);
  const [selfMark, setSelfMark] = useState<Set<number> | null>(null);
  const [passed, setPassed] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);

  // A capstone passed in an earlier session stays passed. Looked up by riteId —
  // there is one capstone per stage, not one in the app.
  useEffect(() => {
    (async () => {
      const prior = await foundationsService.getCapstone(capstone.riteId);
      if (prior?.passed) {
        setPassed(true);
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

  // Every answer is graded — the capstone is a gate, so a fuller retry can pass.
  const submit = useCallback(async () => {
    const text = answer.trim();
    if (!text || grading) return;
    setTranscript(t => [...t, { role: 'user', text }]);
    setAnswer('');
    setRecapOpen(false);
    setGrading(true);
    const result = await checkService.gradeRecall(capstone, text);
    setGrading(false);

    if (!result) {
      // Grader unreachable → reveal the answer, self-mark. Never a dead end.
      setSelfMark(new Set());
      setTranscript(t => [
        ...t,
        {
          role: 'krishna',
          text: `I couldn’t reach you just now. Here’s how I’d have said it: ${capstone.modelAnswer} Which of these did you say?`,
        },
      ]);
      return;
    }
    setGrade(result);
    if (result.passed) {
      setTranscript(t => [...t, { role: 'krishna', text: PASS_BUBBLE }]);
      await pass('ai', text);
    } else {
      const shortBy = capstone.passCount - result.hit.length;
      const tail = shortBy > 0 ? ` ${shortBy} more piece${shortBy > 1 ? 's' : ''} and it’s whole.` : '';
      setTranscript(t => [...t, { role: 'krishna', text: `${result.feedback}${tail}` }]);
    }
  }, [answer, grading, capstone, pass]);

  const toggleSelf = async (i: number) => {
    if (!selfMark || passed) return;
    const next = new Set(selfMark);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelfMark(next);
    if (next.size >= capstone.passCount) await pass('self', answer);
  };

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

  // Input is offered until the reader passes; hidden mid-grade and offline (a
  // missing grader can't grade a retry, so self-marking takes over instead).
  const showInput = !passed && !grading && selfMark === null;

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>The capstone</Text>

      <Bubble role="krishna" text={capstone.prompt} />

      {transcript.map((turn, i) => (
        <View key={i} style={styles.afterPrompt}>
          <Bubble role={turn.role} text={turn.text} />
        </View>
      ))}

      {grading && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color={C.primary.deepSaffron} />
          <Text style={styles.typingText}>Krishna is reading…</Text>
        </View>
      )}

      {/* Graded, not passed: a quiet tappable recap → the marked rubric (with the
          act each miss came from) and how Krishna would have said it. */}
      {grade && !grade.passed && !passed && (
        <View style={styles.recapWrap}>
          <TouchableOpacity
            style={styles.recapLine}
            onPress={() => setRecapOpen(o => !o)}
            accessibilityRole="button"
            accessibilityLabel="Show what you covered"
          >
            <Text style={styles.recapText}>
              You covered {grade.hit.length} of {capstone.rubric.length}
            </Text>
            <Ionicons name={recapOpen ? 'chevron-up' : 'chevron-down'} size={14} color={C.neutrals.softAsh} />
          </TouchableOpacity>
          {recapOpen && (
            <View style={styles.recapBody}>
              <View style={styles.rubric}>
                {capstone.rubric.map((idea, i) => rubricRow(idea, i, grade.hit.includes(i)))}
              </View>
              <Text style={styles.modelLine}>Here’s how I’d have said it</Text>
              <Text style={getTextStyle(styles.modelBody)}>{capstone.modelAnswer}</Text>
            </View>
          )}
        </View>
      )}

      {/* Grader unreachable — self-mark against the rubric right in the chat. */}
      {selfMark !== null && !passed && (
        <View style={styles.recapBody}>
          <View style={styles.rubric}>
            {capstone.rubric.map((idea, i) => rubricRow(idea, i, !!selfMark.has(i), () => toggleSelf(i)))}
          </View>
        </View>
      )}

      {showInput && (
        <View style={styles.inputRow}>
          <TextInput
            style={getTextStyle(styles.input)}
            value={answer}
            onChangeText={setAnswer}
            placeholder={transcript.length === 0 ? 'So, Hinduism is…' : 'Say it again, fuller this time…'}
            placeholderTextColor={C.neutrals.softAsh}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !answer.trim() && styles.sendBtnOff]}
            onPress={submit}
            disabled={!answer.trim()}
            accessibilityRole="button"
            accessibilityLabel="Send"
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {!passed && (
        <TouchableOpacity onPress={onDefer} style={styles.defer} accessibilityRole="button">
          <Text style={styles.deferText}>Leave it for now</Text>
        </TouchableOpacity>
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
  afterPrompt: { marginTop: 16 },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginLeft: 40,
  },
  typingText: { fontSize: 13.5, lineHeight: 19, fontStyle: 'italic', color: C.neutrals.softAsh },
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
  defer: { alignSelf: 'center', marginTop: 16, paddingVertical: 10 },
  deferText: { fontSize: 13.5, color: C.neutrals.softAsh, textDecorationLine: 'underline' },
});

export default CapstonePage;
