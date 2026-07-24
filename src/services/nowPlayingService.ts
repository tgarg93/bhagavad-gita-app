import { Image, ImageSourcePropType, Platform } from 'react-native';
import ExpoNowPlaying, {
  RemoteCommandAction,
  RemoteCommandEvent,
} from '../../modules/expo-now-playing';

// JS-side wrapper over the ExpoNowPlaying native module. It owns nothing about
// playback — the audioNarrationService drives it — it just turns app metadata into
// Now Playing info and fans remote commands back out. Everything here is a no-op
// when the native module is absent (Android, Expo Go, a stale dev client), so
// callers never need to guard the platform themselves.

export type { RemoteCommandAction, RemoteCommandEvent };

export interface NowPlayingContent {
  title: string;
  subtitle?: string;
  coverImage: ImageSourcePropType; // a require()'d bundled asset id
}

export interface NowPlayingProgress {
  isPlaying: boolean;
  elapsedMs: number;
  totalMs: number;
}

type RemoteCommandHandler = (action: RemoteCommandAction) => void;

class NowPlayingService {
  private available = Platform.OS === 'ios' && ExpoNowPlaying != null;
  private handler: RemoteCommandHandler | null = null;
  private subscribed = false;
  // Held so a metadata refresh (progress tick) keeps title/artist/artwork without
  // the caller having to resend them every time.
  private artworkUri?: string;
  private title = '';
  private subtitle?: string;

  // Register the single handler that routes lock-screen / CarPlay commands into the
  // narration transport. Idempotent; the subscription lives for the app's lifetime.
  setRemoteCommandHandler(handler: RemoteCommandHandler): void {
    this.handler = handler;
    if (!this.available || this.subscribed) return;
    try {
      ExpoNowPlaying!.addListener('remoteCommand', (e: RemoteCommandEvent) => {
        this.handler?.(e.action);
      });
      this.subscribed = true;
    } catch {
      // Leave subscribed false so a later call can retry.
    }
  }

  // Publish the current track's identity (title + cover) and turn on the remote
  // commands. Call at the start of a narration session.
  setContent(content: NowPlayingContent): void {
    if (!this.available) return;
    this.title = content.title;
    this.subtitle = content.subtitle;
    this.artworkUri = Image.resolveAssetSource(content.coverImage)?.uri;
    try {
      ExpoNowPlaying!.enableCommands();
      ExpoNowPlaying!.updateMetadata({
        title: this.title,
        artist: this.subtitle,
        artworkUri: this.artworkUri,
      });
    } catch {
      // fail-soft
    }
  }

  // Refresh play/pause state + elapsed/duration. Cheap enough to call on every
  // transition and progress tick; title/artwork are re-sent so a merge on the
  // native side can't drop them.
  update(progress: NowPlayingProgress): void {
    if (!this.available) return;
    try {
      ExpoNowPlaying!.updateMetadata({
        title: this.title,
        artist: this.subtitle,
        artworkUri: this.artworkUri,
        durationSec: progress.totalMs > 0 ? progress.totalMs / 1000 : undefined,
        elapsedSec: Math.max(0, progress.elapsedMs) / 1000,
        rate: progress.isPlaying ? 1 : 0,
      });
    } catch {
      // fail-soft
    }
  }

  clear(): void {
    if (!this.available) return;
    this.artworkUri = undefined;
    this.title = '';
    this.subtitle = undefined;
    try {
      ExpoNowPlaying!.clearNowPlaying();
    } catch {
      // fail-soft
    }
  }
}

export const nowPlayingService = new NowPlayingService();
export default nowPlayingService;
