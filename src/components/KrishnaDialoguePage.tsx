// The end-of-chapter dialogue, as a page in the reader. Krishna walks the reader
// through a concept as a branching, Socratic conversation (data + interpreter in
// krishnaDialogues.ts). Every path is valid, all authored — no network, no quota.
//
// Shape: a fixed Skip bar on top (nothing is locked — the reader can leave any
// time), then a growing transcript of bubbles. At each node Krishna speaks, the
// reader taps a stance (or types their murti at the free-text ending), Krishna
// replies, and a Continue carries them to the next node. The last node offers
// "Ask Krishna more" (opens the live chat) and a Continue that advances the pager
// to the celebration.
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import RichText from './RichText';
import { Bubble } from './Bubble';
import { KrishnaDialogue, DialogueNode, DialogueChoice } from '../data/krishnaDialogues';
import LocalStorageService from '../services/localStorageService';
import { capture } from '../services/telemetryService';

const C = DharmaDesignSystem.colors;

type Entry =
  | { kind: 'krishna'; text: string }
  | { kind: 'user'; text: string }
  | { kind: 'citation'; text: string }
  | { kind: 'practice'; text: string };

type Mode = 'choose' | 'input' | 'continue' | 'done';

interface Props {
  dialogue: KrishnaDialogue;
  getTextStyle: (base: any) => any;
  onContinue: () => void; // advance the reader pager (to the celebration)
  onAskKrishna?: () => void; // open the reader's Ask Krishna sheet
}

const KrishnaDialoguePage: React.FC<Props> = ({ dialogue, getTextStyle, onContinue, onAskKrishna }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeNode, setActiveNode] = useState<DialogueNode | null>(null);
  const [mode, setMode] = useState<Mode>('choose');
  const [nextRef, setNextRef] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const completedFired = useRef(false);

  // Open a node: speak its lines, then wait on its choices / input, or finish.
  const enterNode = useCallback((id: string) => {
    const node = dialogue.nodes[id];
    if (!node) { setMode('done'); return; }
    setEntries(prev => {
      const next = [...prev, ...node.krishna.map((t): Entry => ({ kind: 'krishna', text: t }))];
      if (!node.input && (node.end || !node.choices) && node.practice) {
        next.push({ kind: 'practice', text: node.practice });
      }
      return next;
    });
    if (node.input) { setActiveNode(node); setMode('input'); return; }
    if (node.end || !node.choices) { setActiveNode(null); setMode('done'); return; }
    setActiveNode(node);
    setMode('choose');
  }, [dialogue]);

  // First node on mount.
  useEffect(() => { enterNode(dialogue.start); }, [enterNode, dialogue.start]);

  // Keep the newest bubble in view.
  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [entries, mode]);

  // Completion telemetry (ids only — never the reader's picks or free text).
  useEffect(() => {
    if (mode === 'done' && !completedFired.current) {
      completedFired.current = true;
      capture('krishna_dialogue_completed', { dialogueId: dialogue.id });
    }
  }, [mode, dialogue.id]);

  const pickChoice = (choice: DialogueChoice) => {
    const node = activeNode;
    if (!node) return;
    const reply = choice.reply ?? node.reply;
    setEntries(prev => {
      const next: Entry[] = [...prev, { kind: 'user', text: choice.text }];
      if (reply) next.push({ kind: 'krishna', text: reply });
      if (node.citation) next.push({ kind: 'citation', text: node.citation });
      return next;
    });
    setActiveNode(null);
    if (choice.next) { setNextRef(choice.next); setMode('continue'); }
    else setMode('done');
  };

  const submitInput = () => {
    const node = activeNode;
    const value = draft.trim();
    if (!node || !node.input || !value) return;
    setDraft('');
    setEntries(prev => [
      ...prev,
      { kind: 'user', text: value },
      { kind: 'krishna', text: node.input!.template.replace('{answer}', value) },
      ...(node.citation ? [{ kind: 'citation', text: node.citation } as Entry] : []),
    ]);
    if (node.input.saveTo === 'familyStream') {
      LocalStorageService.updateSpiritualProfile({ familyStream: value }).catch(() => {});
    }
    setActiveNode(null);
    if (node.input.next) { setNextRef(node.input.next); setMode('continue'); }
    else setMode('done');
  };

  const advance = () => {
    const to = nextRef;
    setNextRef(null);
    if (to) enterNode(to);
    else setMode('done');
  };

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        {mode !== 'done' && (
          <TouchableOpacity onPress={onContinue} accessibilityRole="button" accessibilityLabel="Skip this dialogue">
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {entries.map((e, i) => {
          if (e.kind === 'krishna') return <View key={i} style={styles.bubbleGap}><Bubble role="krishna" text={e.text} rich /></View>;
          if (e.kind === 'user') return <View key={i} style={styles.bubbleGap}><Bubble role="user" text={e.text} /></View>;
          if (e.kind === 'citation') return <Text key={i} style={styles.citation}>{e.text}</Text>;
          return (
            <View key={i} style={styles.practiceCard}>
              <Text style={styles.practiceLabel}>Try this week</Text>
              <RichText text={e.text} style={getTextStyle(styles.practiceText)} />
            </View>
          );
        })}

        {mode === 'choose' && activeNode?.choices && (
          <View style={styles.choices}>
            {activeNode.choices.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={styles.choice}
                onPress={() => pickChoice(c)}
                activeOpacity={0.75}
                accessibilityRole="button"
              >
                <View style={styles.choiceDot} />
                <Text style={getTextStyle(styles.choiceText)}>{c.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {mode === 'input' && activeNode?.input && (
          <View style={styles.inputWrap}>
            <TextInput
              style={getTextStyle(styles.input)}
              value={draft}
              onChangeText={setDraft}
              placeholder={activeNode.input.placeholder}
              placeholderTextColor={C.neutrals.softAsh}
              returnKeyType="send"
              onSubmitEditing={submitInput}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={submitInput} accessibilityRole="button">
              <Text style={styles.primaryBtnText}>Tell Krishna</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {mode === 'continue' && (
          <TouchableOpacity style={styles.primaryBtn} onPress={advance} accessibilityRole="button" accessibilityLabel="Continue">
            <Text style={styles.primaryBtnText}>Continue</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}

        {mode === 'done' && (
          <View style={styles.endZone}>
            {onAskKrishna && (
              <TouchableOpacity style={styles.askMore} onPress={onAskKrishna} accessibilityRole="button">
                <Text style={styles.askMoreText}>Ask Krishna more ›</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.primaryBtn} onPress={onContinue} accessibilityRole="button" accessibilityLabel="Continue">
              <Text style={styles.primaryBtnText}>Continue</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 10, minHeight: 30 },
  skip: { fontSize: 13, fontWeight: '600', color: C.primary.deepSaffron, padding: 4 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  bubbleGap: { marginBottom: 14 },
  citation: {
    fontSize: 12,
    lineHeight: 17,
    fontStyle: 'italic',
    color: C.neutrals.softAsh,
    marginTop: -6,
    marginBottom: 14,
    paddingLeft: 44,
  },
  practiceCard: {
    backgroundColor: 'rgba(230, 81, 0, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.22)',
    borderRadius: 16,
    padding: 15,
    marginTop: 4,
    marginBottom: 14,
    marginLeft: 44,
  },
  practiceLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: C.primary.deepSaffron,
    marginBottom: 7,
  },
  practiceText: { fontSize: 15, lineHeight: 23, color: C.neutrals.charcoalBlack },
  choices: { gap: 10, marginTop: 4 },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.12)',
    backgroundColor: C.neutrals.white,
  },
  choiceDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D9CFC4',
  },
  choiceText: { flex: 1, fontSize: 15, lineHeight: 21, color: C.neutrals.charcoalBlack },
  inputWrap: { gap: 10, marginTop: 4 },
  input: {
    fontSize: 15,
    lineHeight: 21,
    color: C.neutrals.charcoalBlack,
    backgroundColor: C.neutrals.white,
    borderWidth: 1.5,
    borderColor: 'rgba(230, 81, 0, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 7,
    backgroundColor: C.primary.deepSaffron,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginTop: 8,
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  endZone: { gap: 8, marginTop: 6 },
  askMore: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.28)',
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  askMoreText: { fontSize: 13, fontWeight: '600', color: C.primary.deepSaffron },
});

export default KrishnaDialoguePage;
