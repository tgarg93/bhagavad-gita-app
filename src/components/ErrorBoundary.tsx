import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DharmaColors } from '../constants/colors';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// Crash-reporting hook point: Workstream B wires Sentry.captureException here so
// the boundary never imports Sentry directly (keeps it testable without native deps).
let reportError: (error: Error, componentStack: string | null | undefined) => void = (
  error,
  componentStack
) => {
  console.error('Uncaught render error:', error, componentStack);
};

export function setErrorReporter(
  reporter: (error: Error, componentStack: string | null | undefined) => void
): void {
  reportError = reporter;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    reportError(error, errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>🪷</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.body}>
            The app hit an unexpected problem. Your progress is saved on this
            device — nothing is lost.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaColors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: DharmaColors.primary[500],
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
});

export default ErrorBoundary;
