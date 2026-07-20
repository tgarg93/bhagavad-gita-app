// Writes festival dates into a dedicated on-device calendar ("Dharma
// Festivals"), so they show up alongside whatever personal calendar the
// reader actually uses — Google/Outlook/Apple, if those accounts are already
// linked in iOS Settings > Calendar > Accounts. Distinct from `syncService`,
// which is an unrelated push-only mirror of app data to Supabase.
//
// One all-day event per known occurrence, not a recurrence rule: festival
// dates are hand-curated per year (festivals.ts) and lunar/solar ones shift
// irregularly, so there's no rule that generates them correctly.
import * as Calendar from 'expo-calendar';
import LocalStorageService from './localStorageService';
import { Festival, getAllFestivals, parseLocalDate } from '../data/festivals';

const CALENDAR_TITLE = 'Dharma Festivals';
const DAY_MS = 24 * 60 * 60 * 1000;

class DeviceCalendarService {
  private static instance: DeviceCalendarService;
  private calendarIdPromise: Promise<string> | null = null;

  static getInstance(): DeviceCalendarService {
    if (!DeviceCalendarService.instance) {
      DeviceCalendarService.instance = new DeviceCalendarService();
    }
    return DeviceCalendarService.instance;
  }

  async hasPermission(): Promise<boolean> {
    try {
      const { status } = await Calendar.getCalendarPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  // Ask once, at the moment the reader taps "add to calendar" — same
  // silent, no-nag shape as notificationService.ensurePermissions.
  async ensurePermissions(): Promise<boolean> {
    try {
      const state = await LocalStorageService.getCalendarSyncState();
      const current = await Calendar.getCalendarPermissionsAsync();
      if (current.status === 'granted') {
        if (!state.permissionAsked) {
          await LocalStorageService.saveCalendarSyncState({ ...state, permissionAsked: true });
        }
        return true;
      }
      if (state.permissionAsked) return false; // don't nag; iOS won't re-prompt anyway
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      await LocalStorageService.saveCalendarSyncState({ ...state, permissionAsked: true });
      return status === 'granted';
    } catch (error) {
      console.log('[calendar] permission flow failed:', error);
      return false;
    }
  }

  // Find-or-create the dedicated calendar, caching its id so repeat syncs
  // don't re-walk the calendar list. Memoized per app session.
  private async getOrCreateDharmaCalendar(): Promise<string> {
    if (!this.calendarIdPromise) {
      this.calendarIdPromise = this.resolveDharmaCalendar().catch(error => {
        this.calendarIdPromise = null; // let the next sync attempt retry
        throw error;
      });
    }
    return this.calendarIdPromise;
  }

  private async resolveDharmaCalendar(): Promise<string> {
    const state = await LocalStorageService.getCalendarSyncState();
    if (state.calendarId) {
      // Confirm it still exists — the user may have deleted it on-device.
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      if (calendars.some(c => c.id === state.calendarId)) return state.calendarId;
    }

    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    const calendarId = await Calendar.createCalendarAsync({
      title: CALENDAR_TITLE,
      color: '#E65100',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendar.source.id,
      source: defaultCalendar.source,
      name: CALENDAR_TITLE,
      ownerAccount: CALENDAR_TITLE,
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    await LocalStorageService.saveCalendarSyncState({ ...state, calendarId });
    return calendarId;
  }

  // Skips occurrences already synced with a still-live device event;
  // recreates ones the user deleted on-device.
  async syncFestival(festival: Festival): Promise<{ added: number; skipped: number }> {
    const calendarId = await this.getOrCreateDharmaCalendar();
    const state = await LocalStorageService.getCalendarSyncState();
    const syncedEvents = { ...state.syncedEvents };
    let added = 0;
    let skipped = 0;

    for (const occurrence of festival.occurrences) {
      const mapKey = `${festival.id}:${occurrence}`;
      const existingEventId = syncedEvents[mapKey];
      if (existingEventId) {
        const stillExists = await Calendar.getEventAsync(existingEventId).then(() => true).catch(() => false);
        if (stillExists) {
          skipped++;
          continue;
        }
      }

      const start = parseLocalDate(occurrence);
      const end = new Date(start.getTime() + festival.duration * DAY_MS);
      const eventId = await Calendar.createEventAsync(calendarId, {
        title: `${festival.emoji} ${festival.name}`,
        notes: festival.significance || festival.description,
        startDate: start,
        endDate: end,
        allDay: true,
      });
      syncedEvents[mapKey] = eventId;
      added++;
    }

    await LocalStorageService.saveCalendarSyncState({ ...state, syncedEvents });
    return { added, skipped };
  }

  async syncAllUpcoming(): Promise<{ added: number; skipped: number }> {
    let added = 0;
    let skipped = 0;
    for (const festival of getAllFestivals()) {
      const result = await this.syncFestival(festival);
      added += result.added;
      skipped += result.skipped;
    }
    return { added, skipped };
  }
}

export const deviceCalendarService = DeviceCalendarService.getInstance();
export default deviceCalendarService;
