import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bhagavad Gita App - Simple Test</Text>
      <StatusBar style="dark" />
    </View>
  );
}