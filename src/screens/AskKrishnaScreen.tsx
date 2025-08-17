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
import { geminiService, GeminiMessage, GeminiChatSession } from '../services/geminiService';
import { KRISHNA_PERSONA, ERROR_MESSAGES, RATE_LIMITS } from '../config/geminiConfig';

const AskKrishnaScreen: React.FC = () => {
  const [chatSession, setChatSession] = useState<GeminiChatSession>({
    messages: [],
    isActive: false,
    isTyping: false,
  });
  const [inputText, setInputText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestedQuestions = KRISHNA_PERSONA.conversationStarters;

  useEffect(() => {
    initializeChat();
  }, []);

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
      // Try to auto-initialize with pre-configured API key
      const autoInitSuccess = await geminiService.autoInitialize();
      
      if (autoInitSuccess || geminiService.isReady()) {
        geminiService.startKrishnaChat();
        setChatSession(geminiService.getCurrentSession());
        setIsInitialized(true);
        setShowApiKeyInput(false);
      } else {
        setShowApiKeyInput(true);
      }
    } catch (error) {
      console.error('Failed to initialize chat:', error);
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

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    if (!isInitialized || !geminiService.isReady()) {
      Alert.alert('Error', ERROR_MESSAGES.API_KEY_MISSING);
      setShowApiKeyInput(true);
      return;
    }

    if (inputText.length > RATE_LIMITS.maxMessageLength) {
      Alert.alert('Error', ERROR_MESSAGES.MESSAGE_TOO_LONG);
      return;
    }

    const messageText = inputText.trim();
    setInputText('');

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

  const renderMessage = (message: GeminiMessage) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.krishnaMessage
      ]}
    >
      {!message.isUser && (
        <Text style={styles.krishnaHeader}>Krishna</Text>
      )}
      <Text style={[
        styles.messageText,
        message.isUser ? styles.userMessageText : styles.krishnaMessageText
      ]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  if (showApiKeyInput) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>Connection Issue</Text>
          <Text style={styles.setupDescription}>
            Unable to connect to Krishna. Please check your internet connection or enter a custom API key.
          </Text>
          
          <TouchableOpacity style={styles.setupButton} onPress={initializeChat}>
            <Text style={styles.setupButtonText}>Retry Connection</Text>
          </TouchableOpacity>
          
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
              'Visit https://makersuite.google.com/app/apikey to get your free Gemini API key'
            )}
          >
            <Text style={styles.helpButtonText}>How to get API key?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ask Krishna</Text>
        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Ionicons name="refresh" size={20} color={DharmaColors.text.tertiary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {chatSession.messages.map(renderMessage)}
        
        {chatSession.isTyping && (
          <View style={styles.typingContainer}>
            <Text style={styles.krishnaHeader}>Krishna</Text>
            <View style={styles.typingBubble}>
              <ActivityIndicator size="small" color={DharmaColors.primary[400]} />
              <Text style={styles.typingText}>thinking...</Text>
            </View>
          </View>
        )}
        
        {chatSession.messages.length === 1 && !chatSession.isTyping && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Ask Krishna about:</Text>
            {suggestedQuestions.map((question, index) => (
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
            onPress={sendMessage}
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
    backgroundColor: DharmaColors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    letterSpacing: 1,
  },
  clearButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: DharmaColors.primary[500],
    borderRadius: 20,
    borderBottomRightRadius: 4,
    padding: 16,
  },
  krishnaMessage: {
    alignSelf: 'flex-start',
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  krishnaHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: DharmaColors.primary[400],
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '300',
  },
  userMessageText: {
    color: DharmaColors.text.inverse,
  },
  krishnaMessageText: {
    color: DharmaColors.text.primary,
  },
  timestamp: {
    fontSize: 10,
    color: DharmaColors.text.muted,
    marginTop: 8,
    textAlign: 'right',
  },
  typingContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    marginBottom: 20,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
    gap: 8,
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