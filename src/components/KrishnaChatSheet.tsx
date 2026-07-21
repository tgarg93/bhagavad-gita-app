// The reader's chat sheet — the same Ask Krishna conversation (same
// geminiService session, same daily quota) risen over the page so the reader
// never loses their place. Visual pattern follows ProfileTabScreen's bottom
// sheet (backdrop + grip + tap-outside dismiss); chat internals come from
// useKrishnaChat, shared with the tab.
//
// Keyboard: the KeyboardAvoidingView must be the Modal's top-level child with
// a FIXED-height sheet inside it — a maxHeight sheet reflows when the keyboard
// opens and the input row jumps. No swipe-down dismiss by design: no gesture-
// sheet dependency in the app, and a PanResponder fighting an inner ScrollView
// is not worth it. Grip + backdrop + X + Android back all close it.
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { Bubble } from './ChapterReflection';
import { GeminiMessage } from '../services/geminiService';
import { RATE_LIMITS } from '../config/geminiConfig';
import { getDailyAtom } from '../data/dailyAtoms';
import { useKrishnaChat, buildSuggestedChips, DAILY_CHAT_LIMIT } from '../hooks/useKrishnaChat';
import AiDisclaimer from './AiDisclaimer';

const C = DharmaDesignSystem.colors;
const AVATAR = 30;

// Image styles inside StyleSheet.create hit union errors (CLAUDE.md).
const headerAvatarStyle = {
  width: AVATAR,
  height: AVATAR,
  borderRadius: AVATAR / 2,
  resizeMode: 'cover',
} as const;

const KrishnaChatSheet: React.FC<{
  visible: boolean;
  onClose: () => void;
  /** e.g. "What Hinduism Is · Card 1 of 4" — the reader's current page */
  contextLabel: string;
}> = ({ visible, onClose, contextLabel }) => {
  const todaysPrompt = useRef(getDailyAtom().krishnaPrompt).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const chat = useKrishnaChat({ active: visible });

  // Follow both new messages AND the last bubble growing as a reply streams in.
  const lastMessageLength =
    chat.displayMessages[chat.displayMessages.length - 1]?.text.length ?? 0;
  useEffect(() => {
    if (chat.displayMessages.length > 0) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [chat.displayMessages.length, lastMessageLength]);

  const renderMessage = (message: GeminiMessage) => (
    <View key={message.id} style={styles.messageSpacing}>
      <Bubble role={message.isUser ? 'user' : 'krishna'} text={message.text} />
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />
          <View style={styles.sheet}>
            <TouchableOpacity onPress={onClose} accessibilityRole="button" accessibilityLabel="Close chat">
              <View style={styles.grip} />
            </TouchableOpacity>

            <View style={styles.headerRow}>
              <View style={styles.headerAvatarRing}>
                <Image source={require('../../assets/krishna-avatar.png')} style={headerAvatarStyle} />
              </View>
              <Text style={styles.headerTitle}>Ask Krishna</Text>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={22} color={C.neutrals.softAsh} />
              </TouchableOpacity>
            </View>

            {!!contextLabel && (
              <View style={styles.contextChip}>
                <Ionicons name="book-outline" size={13} color={C.primary.peacockTeal} />
                <Text style={styles.contextText} numberOfLines={1}>{contextLabel}</Text>
              </View>
            )}

            {chat.initError ? (
              <View style={styles.retryWrap}>
                <Text style={styles.retryText}>
                  Krishna is unreachable right now — check your connection and try again.
                </Text>
                <TouchableOpacity style={styles.retryBtn} onPress={chat.reinitialize}>
                  <Text style={styles.retryBtnText}>Try again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView
                ref={scrollViewRef}
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {chat.displayMessages.map(renderMessage)}

                {chat.session.isTyping && (
                  <View style={styles.typingRow}>
                    <ActivityIndicator size="small" color={C.primary.deepSaffron} />
                    <Text style={styles.typingText}>Krishna is reflecting…</Text>
                  </View>
                )}

                {chat.session.messages.length === 1 && !chat.session.isTyping && !chat.quotaExhausted && (
                  <View style={styles.suggestions}>
                    <Text style={styles.suggestionsTitle}>Ask Krishna about:</Text>
                    {buildSuggestedChips(chat.discussing, todaysPrompt, 'sheet').map((question, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.suggestionButton}
                        onPress={() => chat.fillInput(question)}
                      >
                        <Text style={styles.suggestionText}>{question}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </ScrollView>
            )}

            {!chat.initError && (
              <>
                {chat.remainingToday !== null && (
                  <Text style={styles.quotaCaption}>
                    {chat.quotaExhausted
                      ? `0 of ${DAILY_CHAT_LIMIT} questions left · resets at midnight`
                      : `${chat.remainingToday} of ${DAILY_CHAT_LIMIT} questions left today`}
                  </Text>
                )}
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textInput}
                    value={chat.inputText}
                    onChangeText={chat.setInputText}
                    placeholder={chat.quotaExhausted ? 'Krishna returns tomorrow' : 'Ask Krishna anything...'}
                    placeholderTextColor={DharmaColors.text.tertiary}
                    multiline
                    maxLength={RATE_LIMITS.maxMessageLength}
                    editable={!chat.quotaExhausted}
                  />
                  <TouchableOpacity
                    style={[styles.sendButton, (!chat.inputText.trim() || chat.quotaExhausted) && styles.sendButtonDisabled]}
                    onPress={() => chat.send()}
                    disabled={!chat.inputText.trim() || chat.session.isTyping || chat.quotaExhausted}
                  >
                    <Ionicons
                      name="send"
                      size={18}
                      color={chat.inputText.trim() && !chat.quotaExhausted ? DharmaColors.text.inverse : DharmaColors.text.tertiary}
                    />
                  </TouchableOpacity>
                </View>
                <AiDisclaimer />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  kav: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  sheet: {
    height: '86%',
    backgroundColor: C.neutrals.sandstoneBeige,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
  },
  grip: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  headerAvatarRing: {
    width: AVATAR + 5,
    height: AVATAR + 5,
    borderRadius: (AVATAR + 5) / 2,
    borderWidth: 2,
    borderColor: C.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.neutrals.white,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
  },
  contextChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 121, 107, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 121, 107, 0.25)',
    maxWidth: '100%',
  },
  contextText: {
    fontSize: 12,
    lineHeight: 16,
    color: C.primary.peacockTeal,
    fontWeight: '600',
    flexShrink: 1,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  messageSpacing: {
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 40,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  typingText: {
    fontSize: 14,
    color: DharmaColors.text.secondary,
    fontStyle: 'italic',
  },
  suggestions: {
    marginTop: 12,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.secondary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  suggestionButton: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  suggestionText: {
    fontSize: 14,
    color: DharmaColors.text.primary,
    fontWeight: '300',
  },
  quotaCaption: {
    fontSize: 11,
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 90,
    backgroundColor: DharmaColors.background.primary,
    color: DharmaColors.text.primary,
    fontWeight: '300',
  },
  sendButton: {
    backgroundColor: DharmaColors.primary[500],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: DharmaColors.background.tertiary,
  },
  retryWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  retryText: {
    fontSize: 14,
    lineHeight: 20,
    color: DharmaColors.text.secondary,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: DharmaColors.primary[500],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  retryBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
});

export default KrishnaChatSheet;
