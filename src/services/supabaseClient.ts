// Supabase client + silent anonymous identity.
//
// The app's account model (see the production plan): every install gets an
// anonymous Supabase user on first launch — no sign-up screen, onboarding is
// untouched. The session persists in AsyncStorage, so the same anonymous user
// survives relaunches. C5 later links Sign in with Apple onto this same user.
//
// Everything here is fail-soft: no network, missing env keys, or anonymous
// sign-ins still disabled on the project all leave the app fully functional —
// AsyncStorage remains the source of truth for all user data.
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { AppState } from 'react-native';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// extra first: the only channel that reliably reaches Xcode release bundles
// in this project (see app.config.js); EXPO_PUBLIC_ works in dev.
const extra = Constants.expoConfig?.extra ?? {};
// Exported for the streaming chat path, which bypasses supabase-js (it buffers
// responses) and hits the edge function with a raw XHR to read SSE tokens.
export const SUPABASE_URL = extra.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = extra.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseEnabled = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

let signInInFlight = false;

// Idempotent: reuses the persisted session when there is one, otherwise creates
// the anonymous user. Called on launch and again on every app foreground, so a
// first launch without network (or before anonymous auth was enabled on the
// project) heals itself on a later foreground.
export async function ensureSignedIn(): Promise<void> {
  if (!supabase || signInInFlight) return;
  signInInFlight = true;
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) return;
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.log('[supabase] anonymous sign-in unavailable:', error.message);
    } else {
      console.log('[supabase] anonymous session created');
    }
  } catch (e) {
    console.log('[supabase] sign-in attempt failed (offline is fine):', e);
  } finally {
    signInInFlight = false;
  }
}

// Wire the foreground retry once, from App.tsx.
export function initSupabaseAuth(): void {
  if (!supabase) return;
  ensureSignedIn();
  AppState.addEventListener('change', state => {
    if (state === 'active') ensureSignedIn();
  });
}

// Hard-delete the current user's server account + all synced rows (App Store
// 5.1.1(v)). Server-side cascade wipes user_data/ai_usage; here we also sign
// out so the local session is cleared. Returns false (rather than throwing) if
// there is nothing to delete or the call fails — the caller still wipes local
// data either way. A fresh anonymous user is created on the next foreground.
export async function deleteAccount(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return false; // never signed in — nothing on the server
    const { error } = await supabase.functions.invoke('delete-account', { body: {} });
    if (error) {
      console.log('[supabase] account deletion failed:', error.message);
      return false;
    }
    await supabase.auth.signOut();
    return true;
  } catch (e) {
    console.log('[supabase] account deletion error:', e);
    return false;
  }
}
