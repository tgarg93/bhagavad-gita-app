import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  citation?: string;
}

const AskKrishnaScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🙏 Namaste! I am here to share the wisdom of the scriptures with you. Ask me anything about life, dharma, or the teachings of the Bhagavad Gita. What would you like to understand today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    "What is the meaning of dharma?",
    "How can I find peace in difficult times?",
    "What does the Gita say about fear?",
    "How should I handle anger?",
    "What is the path to happiness?",
  ];

  // Simple Krishna-like responses (in a real app, this would be an AI service)
  const getKrishnaResponse = (question: string): { response: string; citation?: string } => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('dharma') || lowerQuestion.includes('duty')) {
      return {
        response: "Dharma is your righteous duty, dear one. It is better to perform your own dharma imperfectly than to perform another's dharma perfectly. Each soul has its unique path, and following it with sincerity leads to spiritual growth.",
        citation: "Bhagavad Gita 3.35"
      };
    } else if (lowerQuestion.includes('fear') || lowerQuestion.includes('afraid')) {
      return {
        response: "Fear arises from attachment and the illusion of separation. Remember, you are the eternal soul, not the temporary body. When you realize this truth, fear dissolves like darkness before the dawn.",
        citation: "Bhagavad Gita 2.20"
      };
    } else if (lowerQuestion.includes('anger') || lowerQuestion.includes('angry')) {
      return {
        response: "Anger clouds the mind and destroys wisdom. Practice patience and see the divine in all beings. When you understand that everyone is on their own journey, anger transforms into compassion.",
        citation: "Bhagavad Gita 2.63"
      };
    } else if (lowerQuestion.includes('peace') || lowerQuestion.includes('difficult') || lowerQuestion.includes('suffering')) {
      return {
        response: "True peace comes from within, not from external circumstances. Perform your duties without attachment to results. Accept both joy and sorrow with equanimity, knowing that both are temporary.",
        citation: "Bhagavad Gita 2.47"
      };
    } else if (lowerQuestion.includes('happiness') || lowerQuestion.includes('joy')) {
      return {
        response: "Lasting happiness comes from connecting with your true self and serving others selflessly. Material pleasures are like raindrops on a hot stone - they bring temporary relief but do not quench the soul's thirst.",
        citation: "Bhagavad Gita 5.21"
      };
    } else {
      return {
        response: "Every question you ask shows your sincere seeking, and that itself is beautiful. Remember, the path of wisdom begins with self-inquiry. Reflect on your question deeply, and the answer will arise from within your own heart.",
        citation: "Bhagavad Gita 4.34"
      };
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const { response, citation } = getKrishnaResponse(inputText.trim());
    
    const krishnaMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      citation,
    };

    setMessages(prev => [...prev, userMessage, krishnaMessage]);
    setInputText('');
  };

  const askSuggestedQuestion = (question: string) => {
    setInputText(question);
    // Auto-send the suggested question
    setTimeout(() => sendMessage(), 100);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.krishnaMessage
      ]}
    >
      {!message.isUser && (
        <Text style={styles.krishnaHeader}>🕉️ Krishna</Text>
      )}
      <Text style={[
        styles.messageText,
        message.isUser ? styles.userMessageText : styles.krishnaMessageText
      ]}>
        {message.text}
      </Text>
      {message.citation && (
        <Text style={styles.citation}>— {message.citation}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ask Krishna</Text>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
        
        {messages.length === 1 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Try asking:</Text>
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
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? '#ffffff' : '#9ca3af'} 
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
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#58cc02',
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1cb0f6',
    borderRadius: 24,
    borderBottomRightRadius: 8,
    padding: 20,
    shadowColor: '#1cb0f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  krishnaMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    borderBottomLeftRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  krishnaHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#58cc02',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  userMessageText: {
    color: '#ffffff',
  },
  krishnaMessageText: {
    color: '#374151',
  },
  citation: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'right',
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  suggestionButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#58cc02',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 17,
    maxHeight: 120,
    marginRight: 16,
    backgroundColor: '#f9fafb',
    fontWeight: '500',
  },
  sendButton: {
    backgroundColor: '#58cc02',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default AskKrishnaScreen;