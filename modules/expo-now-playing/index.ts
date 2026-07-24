import { requireOptionalNativeModule, EventSubscription } from 'expo-modules-core';

// One of the actions the OS can send from a remote-control surface (lock screen,
// Control Center, CarPlay Now Playing, Bluetooth steering-wheel buttons).
export type RemoteCommandAction =
  | 'play'
  | 'pause'
  | 'toggle'
  | 'skipForward'
  | 'skipBackward';

export interface RemoteCommandEvent {
  action: RemoteCommandAction;
}

export interface NowPlayingMetadata {
  title?: string;
  artist?: string;
  durationSec?: number;
  elapsedSec?: number;
  rate?: number; // 1 = playing, 0 = paused
  artworkUri?: string;
}

interface NowPlayingNativeModule {
  updateMetadata(info: NowPlayingMetadata): void;
  enableCommands(): void;
  clearNowPlaying(): void;
  addListener(
    event: 'remoteCommand',
    listener: (payload: RemoteCommandEvent) => void
  ): EventSubscription;
}

// `requireOptionalNativeModule` returns null instead of throwing when the native
// module isn't present (Android, Expo Go, a stale dev client) — the JS wrapper in
// nowPlayingService.ts guards on null so nothing crashes off iOS.
const ExpoNowPlaying = requireOptionalNativeModule<NowPlayingNativeModule>('ExpoNowPlaying');

export default ExpoNowPlaying;
