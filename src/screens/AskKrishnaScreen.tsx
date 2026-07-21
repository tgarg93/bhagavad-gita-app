import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';
import DharmaHeaderAction from '../components/ui/DharmaHeaderAction';
import { Bubble } from '../components/ChapterReflection';
import { geminiService, GeminiMessage } from '../services/geminiService';
import { RATE_LIMITS, ERROR_MESSAGES } from '../config/geminiConfig';
import { getDailyAtom } from '../data/dailyAtoms';
import { useKrishnaChat, buildSuggestedChips, DAILY_CHAT_LIMIT } from '../hooks/useKrishnaChat';
import { capture } from '../services/telemetryService';

const AskKrishnaScreen: React.FC = () => {
  // Today's chai question leads the suggestions — the brief's hand-off
  const todaysPrompt = React.useRef(getDailyAtom().krishnaPrompt).current;
  const isFocused = useIsFocused();
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const chat = useKrishnaChat({
    active: isFocused,
    onNotReady: () => {
      Alert.alert('Error', ERROR_MESSAGES.API_KEY_MISSING);
      setShowApiKeyInput(true);
    },
  });

  // The chat core surfaces init failures; this screen owns the recovery UI
  useEffect(() => {
    setShowApiKeyInput(chat.initError !== null);
  }, [chat.initError]);

  useEffect(() => {
    if (isFocused) capture('ask_krishna_opened', { source: 'tab' });
  }, [isFocused]);

  // Follow both new messages AND the last bubble growing as a reply streams in.
  const lastMessageLength =
    chat.displayMessages[chat.displayMessages.length - 1]?.text.length ?? 0;
  useEffect(() => {
    if (chat.displayMessages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chat.displayMessages.length, lastMessageLength]);

  const setupGeminiAPI = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter a valid Gemini API key');
      return;
    }

    try {
      await geminiService.initialize(apiKey.trim());
      geminiService.startKrishnaChat();
      await chat.refresh();
      setShowApiKeyInput(false);
      Alert.alert('Success', 'Connected to Krishna! You can now start chatting.');
    } catch (error) {
      console.error('Failed to initialize Gemini:', error);
      Alert.alert('Error', 'Failed to connect. Please check your API key and try again.');
    }
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Conversation',
      'Are you sure you want to clear this conversation with Krishna?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            geminiService.clearChat();
            // Rebuilds the context block and restarts the thread. The daily
            // quota is untouched — it's per-day, not per-thread.
            chat.reinitialize();
          }
        }
      ]
    );
  };

  // Same bubbles as the reflection conversations — avatar beside the bubble
  const renderMessage = (message: GeminiMessage) => (
    <View key={message.id} style={styles.messageSpacing}>
      <Bubble role={message.isUser ? 'user' : 'krishna'} text={message.text} />
    </View>
  );

  if (showApiKeyInput) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>Connection Issue</Text>
          <Text style={styles.setupDescription}>
            {chat.initError?.isAuth
              ? 'Krishna needs a valid Gemini API key. Add one below, or set EXPO_PUBLIC_GEMINI_API_KEY in the app configuration.'
              : 'Unable to connect to Krishna. Please check your internet connection and try again.'}
          </Text>
          {chat.initError?.detail && !chat.initError.isAuth && (
            <Text style={styles.setupErrorDetail} numberOfLines={3}>{chat.initError.detail}</Text>
          )}

          <TouchableOpacity style={styles.setupButton} onPress={chat.reinitialize}>
            <Text style={styles.setupButtonText}>Retry Connection</Text>
          </TouchableOpacity>

          {chat.initError?.isAuth && (
            <>
              <Text style={styles.dividerText}>or</Text>

              <TextInput
                style={styles.apiKeyInput}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="Enter custom Gemini API key..."
                placeholderTextColor={DharmaColors.text.tertiary}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity style={styles.secondaryButton} onPress={setupGeminiAPI}>
                <Text style={styles.secondaryButtonText}>Use Custom Key</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.helpButton}
                onPress={() => Alert.alert(
                  'Get API Key',
                  'Visit https://aistudio.google.com/apikey to get your free Gemini API key'
                )}
              >
                <Text style={styles.helpButtonText}>How to get API key?</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title="Ask Krishna"
        rightActions={
          <DharmaHeaderAction
            iconName="refresh"
            onPress={clearChat}
            variant="subtle"
          />
        }
      />

      {chat.discussing.type === 'verse' && chat.discussing.chapter && (
        <View style={styles.discussingChip}>
          <Ionicons name="book-outline" size={14} color={DharmaDesignSystem.colors.primary.peacockTeal} />
          <Text style={styles.discussingText}>
            Discussing: Chapter {chat.discussing.chapter}
            {chat.discussing.verse ? ` · Verse ${chat.discussing.verse}` : ''}
          </Text>
        </View>
      )}

      <View style={styles.contentSpacer} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {chat.displayMessages.map(renderMessage)}

        {chat.session.isTyping && (
          <View style={styles.typingRow}>
            <ActivityIndicator size="small" color={DharmaDesignSystem.colors.primary.deepSaffron} />
            <Text style={styles.typingText}>Krishna is reflecting…</Text>
          </View>
        )}

        {chat.session.messages.length === 1 && !chat.session.isTyping && !chat.quotaExhausted && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Ask Krishna about:</Text>
            {buildSuggestedChips(chat.discussing, todaysPrompt, 'tab').map((question, index) => (
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
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
              size={20}
              color={chat.inputText.trim() && !chat.quotaExhausted ? DharmaColors.text.inverse : DharmaColors.text.tertiary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  contentSpacer: {
    height: DharmaDesignSystem.spacing.lg,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messageSpacing: {
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // Aligns the indicator with Krishna's bubbles (avatar 36 + gap 4)
    marginLeft: 40,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  typingText: {
    fontSize: 14,
    color: DharmaColors.text.secondary,
    fontStyle: 'italic',
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.secondary,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  suggestionButton: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  suggestionText: {
    fontSize: 14,
    color: DharmaColors.text.primary,
    fontWeight: '300',
  },
  inputContainer: {
    backgroundColor: DharmaColors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: DharmaColors.background.tertiary,
    padding: 20,
  },
  quotaCaption: {
    fontSize: 11,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: DharmaColors.background.primary,
    color: DharmaColors.text.primary,
    fontWeight: '300',
  },
  sendButton: {
    backgroundColor: DharmaColors.primary[500],
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: DharmaColors.background.tertiary,
  },
  // Setup screen styles
  setupContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  setupTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  setupDescription: {
    fontSize: 16,
    color: DharmaColors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  discussingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    marginTop: DharmaDesignSystem.spacing.sm,
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.xs,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    backgroundColor: 'rgba(0, 121, 107, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 121, 107, 0.25)',
  },
  discussingText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    fontWeight: '600',
  },
  setupErrorDetail: {
    fontSize: 13,
    color: DharmaColors.text.tertiary,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  apiKeyInput: {
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: DharmaColors.background.secondary,
    color: DharmaColors.text.primary,
    marginBottom: 24,
  },
  setupButton: {
    backgroundColor: DharmaColors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  setupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
  dividerText: {
    fontSize: 14,
    color: DharmaColors.text.tertiary,
    textAlign: 'center',
    marginVertical: 16,
  },
  secondaryButton: {
    backgroundColor: DharmaColors.background.tertiary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: DharmaColors.text.primary,
  },
  helpButton: {
    alignItems: 'center',
    padding: 8,
  },
  helpButtonText: {
    fontSize: 14,
    color: DharmaColors.primary[400],
    textDecorationLine: 'underline',
  },
});

export default AskKrishnaScreen;
