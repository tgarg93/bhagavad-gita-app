import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import LocalStorageService from '../services/localStorageService';
import AnalyticsService from '../services/analyticsService';
import { deleteAccount } from '../services/supabaseClient';

const C = DharmaDesignSystem.colors;
const S = DharmaDesignSystem.spacing;
const R = DharmaDesignSystem.borderRadius;

const PRIVACY_POLICY_URL = 'https://tgarg93.github.io/bhagavad-gita-app/privacy-policy.html';

const DataManagementScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account & all data',
      'This permanently erases your progress, reflections, and notes — on this device and on our servers. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete everything',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // Server first, then local — a returning user must never see
              // stale local data after asking to be deleted.
              await deleteAccount();
              await LocalStorageService.clearAllData();
              await AnalyticsService.clearAnalyticsData();
              Alert.alert('Deleted', 'Your account and all data have been erased. Please restart the app.');
            } catch {
              Alert.alert('Something went wrong', 'We could not delete your account. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Plain-language explainer */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="lock-closed" size={18} color={C.primary.peacockTeal} />
            <Text style={styles.cardTitle}>Your data</Text>
          </View>
          <Text style={styles.bodyText}>
            Your progress and reflections stay on this device and are backed up to a
            private, encrypted account so you don't lose them. Messages you send to
            Krishna are processed by Google Gemini to generate replies. We never sell
            your data or show ads.
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_POLICY_URL)} hitSlop={8}>
            <Text style={styles.link}>Read the full Privacy Policy →</Text>
          </TouchableOpacity>
        </View>

        {/* Delete */}
        <View style={[styles.card, styles.dangerCard]}>
          <Text style={styles.dangerLabel}>Delete account</Text>
          <Text style={styles.bodyText}>
            Permanently erase your account and everything in it, on this device and on
            our servers. This can't be undone.
          </Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleDeleteAccount}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color={C.sacred.warningRed} />
            ) : (
              <Text style={styles.dangerButtonText}>Delete account &amp; all data</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.neutrals.sandstoneBeige,
  },
  body: {
    padding: S.lg,
    gap: S.md,
  },
  card: {
    backgroundColor: C.neutrals.warmIvory,
    borderRadius: R.large,
    padding: S.md,
    borderLeftWidth: 2,
    borderLeftColor: C.primary.peacockTeal,
  },
  dangerCard: {
    borderLeftColor: C.sacred.warningRed,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.sm,
    marginBottom: S.sm,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: C.neutrals.charcoalBlack,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: C.neutrals.softAsh,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: C.primary.peacockTeal,
    marginTop: S.sm,
  },
  dangerLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: C.sacred.warningRed,
    marginBottom: S.sm,
  },
  dangerButton: {
    marginTop: S.md,
    borderWidth: 1.5,
    borderColor: C.sacred.warningRed,
    borderRadius: R.medium,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.sacred.warningRed,
  },
});

export default DataManagementScreen;
