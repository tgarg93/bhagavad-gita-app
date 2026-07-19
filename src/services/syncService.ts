// Push-only sync: mirrors the synced AsyncStorage keys to the `user_data`
// table (one jsonb row per key, RLS-scoped to the anonymous user). This is
// C3 of the production plan — the server is a write-only backup for now;
// nothing is ever pulled or merged (that's C4, after a TestFlight soak).
//
// Design rules:
// - AsyncStorage stays the source of truth. Every sync failure is silent and
//   retried later (dirty set persists across launches under `sync_state_v1`).
// - No other service imports change: localStorageService calls markDirty()
//   from its one setAndSync() helper; everything else is wired here.
// - Adding a synced key = adding it to SYNC_KEYS. Never remove entries
//   (server rows for old keys are harmless).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import { supabase, ensureSignedIn } from './supabaseClient';

// The 11 synced keys (see the production plan for the per-key rationale).
// Deliberately device-local: notification_settings, preferences, analytics,
// reader positions, audio positions, the legacy current-user record.
export const SYNC_KEYS = [
  'bhagavad_gita_user_progress',
  'bhagavad_gita_study_notes',
  'bhagavad_gita_spiritual_profile',
  'bhagavad_gita_verse_progress',
  'bhagavad_gita_reflections',
  'content_completion',
  'foundations_progress',
  'prayer_recitations',
  'journey_activity',
  'daily_chai_last_opened',
  'level_last_celebrated',
] as const;

const SYNC_STATE_KEY = 'sync_state_v1';
const PUSH_DEBOUNCE_MS = 3000;

interface SyncState {
  dirty: string[];
  lastFullPushAt?: string;
}

class SyncService {
  private dirty = new Set<string>();
  private pushTimer: ReturnType<typeof setTimeout> | null = null;
  private pushing = false;
  private loaded: Promise<void> | null = null;

  // Called once from App.tsx after initSupabaseAuth().
  init(): void {
    if (!supabase) return;
    this.loaded = this.loadState();
    AppState.addEventListener('change', state => {
      if (state === 'active') this.schedulePush();
    });
    this.schedulePush();
  }

  private async loadState(): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(SYNC_STATE_KEY);
      const state: SyncState = raw ? JSON.parse(raw) : { dirty: [] };
      state.dirty.forEach(k => this.dirty.add(k));
      // First launch with sync (or a key added to SYNC_KEYS later): mirror
      // everything once so existing users' data is backed up without waiting
      // for them to touch each feature.
      if (!state.lastFullPushAt) {
        SYNC_KEYS.forEach(k => this.dirty.add(k));
      }
    } catch {
      SYNC_KEYS.forEach(k => this.dirty.add(k));
    }
  }

  private async saveState(fullPushDone?: boolean): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(SYNC_STATE_KEY);
      const prev: SyncState = raw ? JSON.parse(raw) : { dirty: [] };
      const state: SyncState = {
        dirty: [...this.dirty],
        lastFullPushAt: fullPushDone ? new Date().toISOString() : prev.lastFullPushAt,
      };
      await AsyncStorage.setItem(SYNC_STATE_KEY, JSON.stringify(state));
    } catch {
      // sync bookkeeping must never break the app
    }
  }

  // Fire-and-forget, called from localStorageService.setAndSync on every write
  // to a synced key.
  markDirty(key: string): void {
    if (!supabase) return;
    if (!(SYNC_KEYS as readonly string[]).includes(key)) return;
    this.dirty.add(key);
    this.saveState();
    this.schedulePush();
  }

  private schedulePush(): void {
    if (!supabase) return;
    if (this.pushTimer) clearTimeout(this.pushTimer);
    this.pushTimer = setTimeout(() => {
      this.pushTimer = null;
      this.pushDirty();
    }, PUSH_DEBOUNCE_MS);
  }

  private async pushDirty(): Promise<void> {
    if (!supabase || this.pushing) return;
    this.pushing = true;
    try {
      await this.loaded;
      if (this.dirty.size === 0) return;

      await ensureSignedIn();
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id;
      if (!userId) return; // offline / not signed in yet — dirty set persists

      const wasFullPush = SYNC_KEYS.every(k => this.dirty.has(k));
      const keys = [...this.dirty];
      const rows: { user_id: string; key: string; value: unknown; updated_at: string }[] = [];
      for (const key of keys) {
        const value = await this.readForPush(key);
        if (value === undefined) {
          this.dirty.delete(key); // nothing stored locally — nothing to back up
          continue;
        }
        rows.push({ user_id: userId, key, value, updated_at: new Date().toISOString() });
      }

      if (rows.length > 0) {
        const { error } = await supabase
          .from('user_data')
          .upsert(rows, { onConflict: 'user_id,key' });
        if (error) {
          console.log('[sync] push failed (will retry):', error.message);
          return; // keep dirty set intact
        }
        rows.forEach(r => this.dirty.delete(r.key));
        console.log(`[sync] pushed ${rows.length} key(s)`);
      }
      await this.saveState(wasFullPush);
    } catch (e) {
      console.log('[sync] push attempt failed (will retry):', e);
    } finally {
      this.pushing = false;
    }
  }

  // Reads a key and returns a jsonb-ready value. Handles both JSON blobs and
  // the two raw-string keys (daily_chai_last_opened, level_last_celebrated).
  private async readForPush(key: string): Promise<unknown> {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return undefined;
    let value: unknown;
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw; // raw string keys sync as a JSON string
    }
    // The profile photo is a device-local file:// URI — meaningless on the
    // server and on any other device.
    if (key === 'bhagavad_gita_spiritual_profile' && value && typeof value === 'object') {
      const { profilePhotoUri: _omit, ...rest } = value as Record<string, unknown>;
      return rest;
    }
    return value;
  }
}

export const syncService = new SyncService();
export default syncService;
