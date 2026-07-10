// Tiny module-level store for the profile photo URI, so components far from
// the profile screen (the tab-bar icon, chat bubbles) re-render the moment
// the photo changes. Initialized from the stored profile at app startup.
import { useSyncExternalStore } from 'react';
import LocalStorageService from './localStorageService';

type Listener = () => void;

let uri: string | undefined;
const listeners = new Set<Listener>();

export const profilePhotoStore = {
  getUri(): string | undefined {
    return uri;
  },
  setUri(next: string | undefined) {
    if (uri === next) return;
    uri = next;
    listeners.forEach(l => l());
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  // Load the persisted URI once at startup
  async init() {
    try {
      const profile = await LocalStorageService.getSpiritualProfile();
      profilePhotoStore.setUri(profile.profilePhotoUri);
    } catch {
      // fallback icon remains
    }
  },
};

export function useProfilePhoto(): string | undefined {
  return useSyncExternalStore(
    profilePhotoStore.subscribe,
    profilePhotoStore.getUri,
    profilePhotoStore.getUri
  );
}
