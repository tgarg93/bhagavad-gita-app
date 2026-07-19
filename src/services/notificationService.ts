// Local daily notifications — no backend. Strategy: idempotent reschedule-all
// on every app open (and after journey completions), so every notification's
// content is baked fresh and the pending count stays small (~42 « iOS's 64).
//
// "Only if the app wasn't opened today" is achieved with one-shot triggers
// scheduled for FUTURE days and cancelled/rescheduled on every open: they can
// only ever fire after a day (or more) of absence.
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import LocalStorageService, { NotificationSettings } from './localStorageService';
import journeyService from './journeyService';
import { getDailyAtom } from '../data/dailyAtoms';
import { getUpcomingFestivals, getNextOccurrence } from '../data/festivals';

const at = (date: Date, hour: number, minute = 0): Date => {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const daysFromNow = (days: number): Date =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

class NotificationService {
  private static instance: NotificationService;
  private rescheduling = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Call once at startup: foreground presentation + Android channel
  init() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Daily wisdom & reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
      }).catch(() => {});
    }
  }

  async getSettings(): Promise<NotificationSettings> {
    return LocalStorageService.getNotificationSettings();
  }

  async updateSettings(patch: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const settings = { ...(await this.getSettings()), ...patch };
    await LocalStorageService.saveNotificationSettings(settings);
    await this.rescheduleAll();
    return settings;
  }

  async hasPermission(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  // Ask once, at a warm moment (onboarding finish / first celebration)
  async ensurePermissions(): Promise<boolean> {
    try {
      const settings = await this.getSettings();
      const current = await Notifications.getPermissionsAsync();
      if (current.status === 'granted') {
        if (!settings.permissionAsked) {
          await LocalStorageService.saveNotificationSettings({ ...settings, permissionAsked: true });
        }
        await this.rescheduleAll();
        return true;
      }
      if (settings.permissionAsked) return false; // don't nag; iOS won't re-prompt anyway
      const { status } = await Notifications.requestPermissionsAsync();
      await LocalStorageService.saveNotificationSettings({ ...settings, permissionAsked: true });
      if (status === 'granted') {
        await this.rescheduleAll();
        return true;
      }
      return false;
    } catch (error) {
      console.log('[notifications] permission flow failed:', error);
      return false;
    }
  }

  async rescheduleAll(): Promise<void> {
    if (this.rescheduling) return;
    this.rescheduling = true;
    try {
      if (!(await this.hasPermission())) return;
      const settings = await this.getSettings();
      await Notifications.cancelAllScheduledNotificationsAsync();
      let scheduled = 0;

      // 1) Morning Daily Chai — 28 one-shots, each with that day's atom hook,
      //    tapping deep-links straight into the brief. Four weeks (not one) so a
      //    lapsed reader keeps hearing from the app longer — there is no server
      //    push to fall back on (product-spec §4.1 interim; push itself is wave 2).
      if (settings.dailyWisdom) {
        for (let day = 0; day < 28; day++) {
          const fireDate = at(daysFromNow(day), 8, 0);
          if (fireDate.getTime() <= Date.now()) continue; // today 8am already past
          const atom = getDailyAtom(fireDate);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '☕ Your chai is ready',
              body: atom.hook,
              data: { url: 'dailychai' },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: fireDate,
            },
          });
          scheduled++;
        }
      }

      // 2) Evening journey nudge — only fires after ≥1 day of absence
      if (settings.journeyNudge) {
        const next = await journeyService.getNextUnfinished();
        if (next) {
          for (const day of [1, 3, 7, 14, 21, 28]) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Your path awaits 🛕',
                body: `Next step: ${next.title}. A few quiet minutes is all it takes.`,
                data: { url: 'journey' },
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: at(daysFromNow(day), 19, 0),
              },
            });
            scheduled++;
          }
        }
      }

      // 3) Festival reminders — next four festivals, 3 days before + morning-of
      if (settings.festivals) {
        for (const festival of getUpcomingFestivals(4)) {
          const start = getNextOccurrence(festival)?.start;
          if (!start) continue;
          const threeBefore = at(new Date(start.getTime() - 3 * 24 * 60 * 60 * 1000), 9, 0);
          if (threeBefore.getTime() > Date.now()) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: `${festival.emoji} ${festival.name} is in 3 days`,
                body: 'Read the story and get ready to celebrate.',
                data: { url: 'festival', festivalId: festival.id },
              },
              trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: threeBefore },
            });
            scheduled++;
          }
          const morningOf = at(start, 8, 30);
          if (morningOf.getTime() > Date.now()) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: `${festival.emoji} Today is ${festival.name}!`,
                body: festival.significance,
                data: { url: 'festival', festivalId: festival.id },
              },
              trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: morningOf },
            });
            scheduled++;
          }
        }
      }

      // 4) Streak protection — tomorrow 21:00 (today's open already counted)
      if (settings.streak) {
        const { streak } = await journeyService.getStreak();
        if (streak >= 1) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `🔥 ${streak}-day streak on the line`,
              body: 'One small step tonight keeps your journey unbroken.',
              data: { url: 'journey' },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: at(daysFromNow(1), 21, 0),
            },
          });
          scheduled++;
        }
      }

      console.log('[notifications] scheduled', scheduled, 'local notifications');
    } catch (error) {
      console.log('[notifications] reschedule failed:', error);
    } finally {
      this.rescheduling = false;
    }
  }
}

export const notificationService = NotificationService.getInstance();
export default notificationService;
