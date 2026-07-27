import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import notificationService from '../services/notificationService';
import { NotificationSettings } from '../services/localStorageService';

const C = DharmaDesignSystem.colors;
const S = DharmaDesignSystem.spacing;
const R = DharmaDesignSystem.borderRadius;

const PRIVACY_POLICY_URL = 'https://tgarg93.github.io/bhagavad-gita-app/privacy-policy.html';
const SUPPORT_EMAIL = 'tushargarg93@gmail.com';

const REMINDER_ROWS: { key: keyof NotificationSettings; label: string; sub: string }[] = [
  { key: 'dailyWisdom', label: 'Morning wisdom', sub: 'A daily Gita verse at 8:00' },
  { key: 'journeyNudge', label: 'Journey nudge', sub: 'Your next step, evenings you’ve been away' },
  { key: 'festivals', label: 'Festival reminders', sub: '3 days before and on the day' },
  { key: 'streak', label: 'Streak protection', sub: 'A gentle 9pm nudge when a streak is at risk' },
];

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [reminders, setReminders] = useState<NotificationSettings | null>(null);
  const [remindersPermitted, setRemindersPermitted] = useState(true);

  const load = useCallback(async () => {
    setReminders(await notificationService.getSettings());
    setRemindersPermitted(await notificationService.hasPermission());
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const toggleReminder = async (key: keyof NotificationSettings, value: boolean) => {
    const updated = await notificationService.updateSettings({ [key]: value });
    setReminders(updated);
    if (value && !(await notificationService.hasPermission())) {
      await notificationService.ensurePermissions();
      setRemindersPermitted(await notificationService.hasPermission());
    }
  };

  const version = Constants.expoConfig?.version ?? '1.0.0';
  const cfg = Constants.expoConfig as any;
  const build =
    (Platform.OS === 'android'
      ? cfg?.android?.versionCode
      : cfg?.ios?.buildNumber) ??
    Constants.nativeBuildVersion ??
    '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Reminders */}
        {reminders && (
          <View style={styles.card}>
            <Text style={styles.groupLabel}>Reminders</Text>
            {!remindersPermitted && (
              <Text style={styles.hint}>
                Notifications are off for this app — enable them in iOS Settings for reminders to arrive.
              </Text>
            )}
            {REMINDER_ROWS.map((row, i) => (
              <View key={row.key} style={[styles.row, i > 0 && styles.rowDivider]}>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  <Text style={styles.rowSub}>{row.sub}</Text>
                </View>
                <Switch
                  value={!!reminders[row.key]}
                  onValueChange={v => toggleReminder(row.key, v)}
                  trackColor={{ true: C.primary.deepSaffron, false: undefined }}
                />
              </View>
            ))}
          </View>
        )}

        {/* Account */}
        <View style={styles.card}>
          <Text style={styles.groupLabel}>Account</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => (navigation as any).navigate('DataManagement')}
            activeOpacity={0.6}
          >
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Account &amp; data</Text>
              <Text style={styles.rowSub}>Your data and account deletion</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.neutrals.softAsh} />
          </TouchableOpacity>
        </View>

        {/* About & Legal */}
        <View style={styles.card}>
          <Text style={styles.groupLabel}>About &amp; legal</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            activeOpacity={0.6}
          >
            <Text style={styles.rowLabel}>Privacy Policy</Text>
            <Ionicons name="open-outline" size={17} color={C.neutrals.softAsh} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.row, styles.rowDivider]}
            onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Dharma%20support`)}
            activeOpacity={0.6}
          >
            <Text style={styles.rowLabel}>Contact &amp; support</Text>
            <Ionicons name="mail-outline" size={17} color={C.neutrals.softAsh} />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>
          Dharma v{version}{build ? ` (${build})` : ''}
        </Text>
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
    paddingHorizontal: S.md,
    paddingVertical: S.xs,
  },
  groupLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: C.primary.peacockTeal,
    marginTop: S.sm,
    marginBottom: S.xs,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: C.primary.deepSaffron,
    marginBottom: S.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: S.md,
    paddingVertical: S.sm + 2,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.neutrals.gentleMist,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: C.neutrals.charcoalBlack,
  },
  rowSub: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: C.neutrals.softAsh,
    marginTop: 1,
  },
  versionText: {
    fontSize: 12,
    lineHeight: 16,
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginTop: S.sm,
  },
});

export default SettingsScreen;
