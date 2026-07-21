import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DharmaColors } from '../constants/colors';

// Persistent, visible AI disclaimer shown under every Krishna chat input
// (the Ask Krishna tab and the reader chat sheet). App Review expects a clear
// AI label on a feature where an AI speaks in a deity's voice, and users should
// see it too. The system prompt also carries safety/crisis guidance, but that
// is not visible — this is.
const AiDisclaimer: React.FC = () => (
  <Text style={styles.text}>
    AI reflection inspired by Krishna's teachings — not a real person or a
    substitute for professional advice.
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    lineHeight: 15,
    color: DharmaColors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 2,
  },
});

export default AiDisclaimer;
