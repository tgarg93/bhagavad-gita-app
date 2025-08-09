import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login, register, loginAsGuest } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await loginAsGuest();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to continue as guest');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fff7ed', '#fed7aa', '#fdba74']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.logo}>🕉️</Text>
              <Text style={styles.title}>Bhagavad Gita</Text>
              <Text style={styles.subtitle}>
                {isLogin ? 'Welcome back!' : 'Begin your journey'}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
              />
              
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
              />

              <Button
                title={loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
                onPress={handleSubmit}
                disabled={loading}
                style={styles.submitButton}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <Button
                title="Continue as Guest"
                onPress={handleGuestLogin}
                variant="outline"
                disabled={loading}
              />
            </View>

            {/* Switch Mode */}
            <TouchableOpacity 
              style={styles.switchMode}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text style={styles.switchLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Additional Info */}
            <TouchableOpacity style={styles.guestButton}>
              <Text style={styles.guestText}>All data stored locally on your device</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#92400e',
    opacity: 0.8,
  },
  form: {
    marginBottom: 32,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(146, 64, 14, 0.3)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#92400e',
    fontSize: 14,
  },
  switchMode: {
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    fontSize: 14,
    color: '#92400e',
  },
  switchLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestText: {
    fontSize: 14,
    color: '#92400e',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;