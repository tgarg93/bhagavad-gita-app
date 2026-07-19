// Remote observability: Sentry (crashes) + PostHog (anonymous product analytics).
// Both are gated on env vars and silently no-op when unset, so development and
// TestFlight builds without keys behave exactly like before this service existed.
//
// Privacy contract (docs/product-spec + privacy policy): events carry ids, counts,
// and levels — never reflection text, chat messages, or profile fields. PostHog
// runs on an auto-generated anonymous id; no account linkage until Workstream C
// decides otherwise.
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';
import { setErrorReporter } from '../components/ErrorBoundary';

// extra first: the only channel that reliably reaches Xcode release bundles
// in this project (see app.config.js); EXPO_PUBLIC_ works in dev.
const extra = Constants.expoConfig?.extra ?? {};
const SENTRY_DSN = extra.sentryDsn || process.env.EXPO_PUBLIC_SENTRY_DSN || '';
const POSTHOG_API_KEY = extra.posthogApiKey || process.env.EXPO_PUBLIC_POSTHOG_API_KEY || '';
const POSTHOG_HOST = extra.posthogHost || process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let posthog: PostHog | null = null;
let initialized = false;

export const sentryEnabled = !!SENTRY_DSN;

// Called once from App.tsx before anything renders. Safe to call twice.
export function initTelemetry(): void {
  if (initialized) return;
  initialized = true;

  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      // Errors only for now — tracing/profiling can come later if ever needed.
      tracesSampleRate: 0,
    });
    setErrorReporter((error, componentStack) => {
      Sentry.captureException(error, { extra: { componentStack } });
    });
  }

  if (POSTHOG_API_KEY) {
    posthog = new PostHog(POSTHOG_API_KEY, {
      host: POSTHOG_HOST,
      captureAppLifecycleEvents: true, // Application Opened / Backgrounded for free
    });
  }
}

// Fire-and-forget; must never throw into a feature code path.
export function capture(event: string, properties?: Record<string, string | number | boolean>): void {
  try {
    posthog?.capture(event, properties);
  } catch {
    // analytics must never break the app
  }
}

// $screen event for navigation funnels — wired to NavigationContainer's
// onStateChange in AppNavigator. Screen names only, never params.
export function trackScreen(name: string): void {
  try {
    posthog?.screen(name);
  } catch {
    // analytics must never break the app
  }
}
