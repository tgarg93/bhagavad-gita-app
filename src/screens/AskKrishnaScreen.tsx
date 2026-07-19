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
import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';
import DharmaHeaderAction from '../components/ui/DharmaHeaderAction';
import { Bubble } from '../components/ChapterReflection';
import { geminiService, isAuthError, GeminiMessage, GeminiChatSession } from '../services/geminiService';
import { KRISHNA_PERSONA, ERROR_MESSAGES, RATE_LIMITS } from '../config/geminiConfig';
import { useFocusEffect } from '@react-navigation/native';
import krishnaContext, { CurrentContent } from '../services/krishnaContextService';
import { getDailyAtom } from '../data/dailyAtoms';
import { posthog } from '../config/posthog';

const AskKrishnaScreen: React.FC = () => {
  // Today's chai question leads the suggestions — the brief's hand-off
  const todaysPrompt = React.useRef(getDailyAtom().krishnaPrompt).current;
  const [chatSession, setChatSession] = useState<GeminiChatSession>({
    messages: [],
    isActive: false,
    isTyping: false,
  });
  const [inputText, setInputText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [initErrorIsAuth, setInitErrorIsAuth] = useState(false);
  const [initErrorDetail, setInitErrorDetail] = useState<string | null>(null);
  const [discussing, setDiscussing] = useState<CurrentContent>({ type: 'none' });
  const seededContentRef = useRef<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestedQuestions = [todaysPrompt, ...KRISHNA_PERSONA.conversationStarters];

  useEffect(() => {
    initializeChat();
  }, []);

  // When the user arrives via "Ask Krishna about this", restart the chat
  // seeded with the new content context so Krishna knows what they're reading
  useFocusEffect(
    React.useCallback(() => {
      const current = krishnaContext.getCurrentContent();
      const key = JSON.stringify(current);
      if (isInitialized && current.type !== 'none' && key !== seededContentRef.current) {
        initializeChat();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialized])
  );


  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (chatSession.messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatSession.messages.length]);

  const initializeChat = async () => {
    try {
      await geminiService.autoInitialize();
      const contextBlock = await krishnaContext.buildContextBlock();
      const current = krishnaContext.getCurrentContent();
      seededContentRef.current = JSON.stringify(current);
      setDiscussing(current);
      geminiService.startKrishnaChat(contextBlock);
      krishnaContext.maybeRefreshSummary();
      setChatSession(geminiService.getCurrentSession());
      setIsInitialized(true);
      setShowApiKeyInput(false);
      setInitErrorDetail(null);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      // Only offer the API-key form for auth problems; otherwise show what
      // actually failed (model/network) with a retry
      setInitErrorIsAuth(isAuthError(error));
      setInitErrorDetail(error instanceof Error ? error.message : String(error));
      setShowApiKeyInput(true);
    }
  };

  const setupGeminiAPI = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter a valid Gemini API key');
      return;
    }

    try {
      await geminiService.initialize(apiKey.trim());
      geminiService.startKrishnaChat();
      setChatSession(geminiService.getCurrentSession());
      setIsInitialized(true);
      setShowApiKeyInput(false);
      Alert.alert('Success', 'Connected to Krishna! You can now start chatting.');
    } catch (error) {
      console.error('Failed to initialize Gemini:', error);
      Alert.alert('Error', 'Failed to connect. Please check your API key and try again.');
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = (typeof text === 'string' ? text : inputText).trim();
    if (!messageText) return;

    if (!isInitialized || !geminiService.isReady()) {
      Alert.alert('Error', ERROR_MESSAGES.API_KEY_MISSING);
      setShowApiKeyInput(true);
      return;
    }

    if (messageText.length > RATE_LIMITS.maxMessageLength) {
      Alert.alert('Error', ERROR_MESSAGES.MESSAGE_TOO_LONG);
      return;
    }

    setInputText('');

    posthog.capture('ask_krishna_message_sent', {
      message_length: messageText.length,
      is_suggested_question: suggestedQuestions.includes(messageText),
      conversation_length: chatSession.messages.length,
    });

    try {
      // Update UI to show user message and typing indicator
      setChatSession(prev => ({
        ...prev,
        isTyping: true,
      }));

      // Send message to Gemini
      await geminiService.sendMessage(messageText);
      
      // Update UI with latest session
      setChatSession(geminiService.getCurrentSession());
    } catch (error) {
      console.error('Error sending message:', error);
      setChatSession(prev => ({
        ...prev,
        isTyping: false,
      }));
      
      // Add error message to chat
      const errorMessage: GeminiMessage = {
        id: `error-${Date.now()}`,
        text: 'I apologize, but I am having trouble responding right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setChatSession(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  const askSuggestedQuestion = (question: string) => {
    setInputText(question);
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
            if (geminiService.isReady()) {
              geminiService.startKrishnaChat();
              setChatSession(geminiService.getCurrentSession());
            }
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
            {initErrorIsAuth
              ? 'Krishna needs a valid Gemini API key. Add one below, or set EXPO_PUBLIC_GEMINI_API_KEY in the app configuration.'
              : 'Unable to connect to Krishna. Please check your internet connection and try again.'}
          </Text>
          {initErrorDetail && !initErrorIsAuth && (
            <Text style={styles.setupErrorDetail} numberOfLines={3}>{initErrorDetail}</Text>
          )}

          <TouchableOpacity style={styles.setupButton} onPress={initializeChat}>
            <Text style={styles.setupButtonText}>Retry Connection</Text>
          </TouchableOpacity>

          {initErrorIsAuth && (
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

      {discussing.type === 'verse' && discussing.chapter && (
        <View style={styles.discussingChip}>
          <Ionicons name="book-outline" size={14} color={DharmaDesignSystem.colors.primary.peacockTeal} />
          <Text style={styles.discussingText}>
            Discussing: Chapter {discussing.chapter}
            {discussing.verse ? ` · Verse ${discussing.verse}` : ''}
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
        {chatSession.messages.map(renderMessage)}
        
        {chatSession.isTyping && (
          <View style={styles.typingRow}>
            <ActivityIndicator size="small" color={DharmaDesignSystem.colors.primary.deepSaffron} />
            <Text style={styles.typingText}>Krishna is reflecting…</Text>
          </View>
        )}
        
        {chatSession.messages.length === 1 && !chatSession.isTyping && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Ask Krishna about:</Text>
            {(discussing.type === 'verse'
              ? ['Explain this verse to me', 'How does this apply to my life right now?', 'What should I take away from this chapter?']
              : suggestedQuestions
            ).map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => askSuggestedQuestion(question)}
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
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Krishna anything..."
            placeholderTextColor={DharmaColors.text.tertiary}
            multiline
            maxLength={RATE_LIMITS.maxMessageLength}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || chatSession.isTyping}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? DharmaColors.text.inverse : DharmaColors.text.tertiary} 
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