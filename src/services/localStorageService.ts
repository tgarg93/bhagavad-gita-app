import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProgress {
  userId: string;
  username: string;
  email: string;
  chaptersCompleted: number[];
  versesRead: string[];
  bookmarkedVerses: string[];
  favoriteVerses: string[];
  dailyStreak: number;
  lastReadDate: string;
  totalReadingTime: number; // in minutes
  createdAt: string;
  lastUpdated: string;
}

export interface StudyNote {
  id: string;
  userId: string;
  verseId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

export interface UserPreferences {
  language: 'en' | 'hi' | 'sa';
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
  dailyReminderEnabled: boolean;
  reminderTime: string;
  soundEnabled: boolean;
}

// Where a structured profile value came from. User edits outrank extraction:
// an 'extracted' write must never replace a 'user' value.
export type KnowledgeSource = 'onboarding' | 'extracted' | 'user';

// One structured user-knowledge value, keyed in SpiritualProfile.structuredProfile
// by a UserKnowledgeKey from src/data/userKnowledgeSchema.ts (kept as string here
// to avoid coupling storage to the schema module).
export interface StructuredField {
  value: string;
  source: KnowledgeSource;
  updatedAt: string;
}

// Who this person is spiritually — collected at onboarding, enriched over time.
// The rolling profileSummary is compacted by Gemini from reflections + progress.
export interface SpiritualProfile {
  name?: string;
  familiarity: 'new' | 'some' | 'deep';
  intentions: string[];
  interests: string[];
  dailyGoalMinutes: 5 | 10 | 15 | 20;
  profileSummary?: string;
  summaryUpdatedAt?: string;
  reflectionCountAtSummary?: number;
  // Structured facts learned over time (userKnowledgeService owns all writes —
  // updateSpiritualProfile merges shallowly, so patching this map directly
  // from elsewhere would clobber sibling entries).
  structuredProfile?: Record<string, StructuredField>;
  // file:// URI of the user's profile photo in the app documents directory
  profilePhotoUri?: string;
  onboarded: boolean;
}

export const DEFAULT_SPIRITUAL_PROFILE: SpiritualProfile = {
  familiarity: 'some',
  intentions: [],
  interests: [],
  dailyGoalMinutes: 10,
  onboarded: false,
};

// Verse-by-verse reading progress and resume position for the Gita book player
export interface VerseProgress {
  readVerses: string[]; // "chapter.verse" keys, e.g. "1.1"
  lastPageIndex: number; // page index in the continuous book to resume at
  // Version of the page layout lastPageIndex refers to; bumped when pages are
  // inserted into the book (e.g. per-chapter celebration pages) so the stored
  // index can be migrated once
  pageLayoutVersion?: number;
}

// Journey activity for the reading streak (UserProgress.dailyStreak is legacy
// and never written; this record is the live source)
export interface JourneyActivity {
  lastActiveDate: string; // YYYY-MM-DD
  streak: number;
}

// Local notification preferences (all types default ON)
export interface NotificationSettings {
  dailyWisdom: boolean;
  journeyNudge: boolean;
  festivals: boolean;
  streak: boolean;
  permissionAsked?: boolean;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  dailyWisdom: true,
  journeyNudge: true,
  festivals: true,
  streak: true,
};

// One turn in an ongoing reflection conversation (beyond the first exchange)
export interface ReflectionTurn {
  role: 'user' | 'krishna';
  text: string;
  at: string;
}

// What kind of content a reflection belongs to. Entries with no contentType
// (everything stored before Phase D) are legacy Gita chapter reflections.
export type ReflectionContentType = 'gita' | 'festival' | 'deity' | 'concept';

// A single reflection: the reader's answer to a chapter question, Krishna's
// response, and any follow-up conversation. `completed` marks the user having
// explicitly closed the conversation for this question.
export interface ReflectionEntry {
  id: string;
  userId: string;
  chapterNumber?: number; // present ⇒ Gita chapter entry (incl. all legacy entries)
  questionIndex: number;
  question: string;
  answer: string;
  contentType?: ReflectionContentType; // absent ⇒ 'gita'
  contentId?: string; // e.g. 'ganesha', 'karma', 'diwali-2025'
  contentTitle?: string; // human label for context summaries
  krishnaResponse?: string;
  thread?: ReflectionTurn[];
  completed?: boolean;
  createdAt: string;
}

export interface AppData {
  userProgress: UserProgress | null;
  studyNotes: StudyNote[];
  reflections: ReflectionEntry[];
  preferences: UserPreferences;
  analytics: {
    appOpens: number;
    lastOpened: string;
    featuresUsed: Record<string, number>;
  };
}

class LocalStorageService {
  private static readonly KEYS = {
    USER_PROGRESS: 'bhagavad_gita_user_progress',
    STUDY_NOTES: 'bhagavad_gita_study_notes',
    REFLECTIONS: 'bhagavad_gita_reflections',
    VERSE_PROGRESS: 'bhagavad_gita_verse_progress',
    SPIRITUAL_PROFILE: 'bhagavad_gita_spiritual_profile',
    PREFERENCES: 'bhagavad_gita_preferences',
    ANALYTICS: 'bhagavad_gita_analytics',
    CURRENT_USER: 'bhagavad_gita_current_user',
    READER_POSITIONS: 'content_reader_positions',
    CONTENT_COMPLETION: 'content_completion',
    JOURNEY_ACTIVITY: 'journey_activity',
    NOTIFICATION_SETTINGS: 'notification_settings',
  };

  private static readonly TOTAL_GITA_VERSES = 700;

  // User Authentication (Local)
  static async saveCurrentUser(user: { id: string; username: string; email: string; createdAt: string }) {
    try {
      await AsyncStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  }

  static async getCurrentUser(): Promise<{ id: string; username: string; email: string; createdAt: string } | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.KEYS.CURRENT_USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async clearCurrentUser() {
    try {
      await AsyncStorage.removeItem(this.KEYS.CURRENT_USER);
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  }

  // User Progress
  static async saveUserProgress(progress: UserProgress) {
    try {
      progress.lastUpdated = new Date().toISOString();
      await AsyncStorage.setItem(this.KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  }

  static async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      const progressJson = await AsyncStorage.getItem(this.KEYS.USER_PROGRESS);
      if (progressJson) {
        const progress = JSON.parse(progressJson);
        return progress.userId === userId ? progress : null;
      }
      return null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  static async createDefaultUserProgress(userId: string, username: string, email: string): Promise<UserProgress> {
    const defaultProgress: UserProgress = {
      userId,
      username,
      email,
      chaptersCompleted: [],
      versesRead: [],
      bookmarkedVerses: [],
      favoriteVerses: [],
      dailyStreak: 0,
      lastReadDate: new Date().toISOString(),
      totalReadingTime: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    await this.saveUserProgress(defaultProgress);
    return defaultProgress;
  }

  // Study Notes
  static async saveStudyNote(note: StudyNote) {
    try {
      const notes = await this.getAllStudyNotes();
      const existingIndex = notes.findIndex(n => n.id === note.id);
      
      if (existingIndex >= 0) {
        notes[existingIndex] = { ...note, updatedAt: new Date().toISOString() };
      } else {
        notes.push(note);
      }
      
      await AsyncStorage.setItem(this.KEYS.STUDY_NOTES, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving study note:', error);
    }
  }

  static async getAllStudyNotes(): Promise<StudyNote[]> {
    try {
      const notesJson = await AsyncStorage.getItem(this.KEYS.STUDY_NOTES);
      return notesJson ? JSON.parse(notesJson) : [];
    } catch (error) {
      console.error('Error getting study notes:', error);
      return [];
    }
  }

  static async getUserStudyNotes(userId: string): Promise<StudyNote[]> {
    try {
      const allNotes = await this.getAllStudyNotes();
      return allNotes.filter(note => note.userId === userId);
    } catch (error) {
      console.error('Error getting user study notes:', error);
      return [];
    }
  }

  static async deleteStudyNote(noteId: string) {
    try {
      const notes = await this.getAllStudyNotes();
      const filteredNotes = notes.filter(note => note.id !== noteId);
      await AsyncStorage.setItem(this.KEYS.STUDY_NOTES, JSON.stringify(filteredNotes));
    } catch (error) {
      console.error('Error deleting study note:', error);
    }
  }

  // Spiritual profile (onboarding answers + rolling summary)
  static async getSpiritualProfile(): Promise<SpiritualProfile> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.SPIRITUAL_PROFILE);
      if (json) return { ...DEFAULT_SPIRITUAL_PROFILE, ...JSON.parse(json) };
    } catch (error) {
      console.error('Error getting spiritual profile:', error);
    }
    return { ...DEFAULT_SPIRITUAL_PROFILE };
  }

  static async saveSpiritualProfile(profile: SpiritualProfile) {
    try {
      await AsyncStorage.setItem(this.KEYS.SPIRITUAL_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving spiritual profile:', error);
    }
  }

  static async updateSpiritualProfile(patch: Partial<SpiritualProfile>): Promise<SpiritualProfile> {
    const profile = { ...(await this.getSpiritualProfile()), ...patch };
    await this.saveSpiritualProfile(profile);
    return profile;
  }

  // Verse reading progress + resume position (auth-independent)
  static async getVerseProgress(): Promise<VerseProgress> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.VERSE_PROGRESS);
      if (json) return JSON.parse(json);
    } catch (error) {
      console.error('Error getting verse progress:', error);
    }
    return { readVerses: [], lastPageIndex: 0 };
  }

  private static async saveVerseProgress(progress: VerseProgress) {
    try {
      await AsyncStorage.setItem(this.KEYS.VERSE_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving verse progress:', error);
    }
  }

  static async markVerseRead(chapter: number, verse: number) {
    const key = `${chapter}.${verse}`;
    const progress = await this.getVerseProgress();
    if (!progress.readVerses.includes(key)) {
      progress.readVerses.push(key);
      await this.saveVerseProgress(progress);
    }
  }

  static async saveLastPage(index: number) {
    const progress = await this.getVerseProgress();
    if (progress.lastPageIndex !== index) {
      progress.lastPageIndex = index;
      await this.saveVerseProgress(progress);
    }
  }

  static async getLastPage(): Promise<number> {
    return (await this.getVerseProgress()).lastPageIndex;
  }

  // One-time remap of the stored book position when page kinds are inserted
  // into the Gita layout (stamps the layout version so it runs only once)
  static async migrateLastPageIndex(newIndex: number, layoutVersion: number) {
    const progress = await this.getVerseProgress();
    progress.lastPageIndex = newIndex;
    progress.pageLayoutVersion = layoutVersion;
    await this.saveVerseProgress(progress);
  }

  // Resume positions for the generic content reader, keyed `${contentType}:${contentId}`
  static async getReaderPosition(key: string): Promise<number> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.READER_POSITIONS);
      const positions: Record<string, number> = json ? JSON.parse(json) : {};
      return positions[key] ?? 0;
    } catch (error) {
      console.error('Error getting reader position:', error);
      return 0;
    }
  }

  static async saveReaderPosition(key: string, index: number) {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.READER_POSITIONS);
      const positions: Record<string, number> = json ? JSON.parse(json) : {};
      if (positions[key] !== index) {
        positions[key] = index;
        await AsyncStorage.setItem(this.KEYS.READER_POSITIONS, JSON.stringify(positions));
      }
    } catch (error) {
      console.error('Error saving reader position:', error);
    }
  }

  // ——— Journey completion (one flag per journey item, first-completion wins) ———

  static async getContentCompletion(): Promise<Record<string, string>> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.CONTENT_COMPLETION);
      return json ? JSON.parse(json) : {};
    } catch (error) {
      console.error('Error getting content completion:', error);
      return {};
    }
  }

  static async markContentCompleted(journeyItemId: string): Promise<boolean> {
    try {
      const map = await this.getContentCompletion();
      if (map[journeyItemId]) return false; // keep the first completion timestamp
      map[journeyItemId] = new Date().toISOString();
      await AsyncStorage.setItem(this.KEYS.CONTENT_COMPLETION, JSON.stringify(map));
      return true;
    } catch (error) {
      console.error('Error marking content completed:', error);
      return false;
    }
  }

  // ——— Journey activity / streak ———

  static async getJourneyActivity(): Promise<JourneyActivity> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.JOURNEY_ACTIVITY);
      if (json) return JSON.parse(json);
    } catch (error) {
      console.error('Error getting journey activity:', error);
    }
    return { lastActiveDate: '', streak: 0 };
  }

  static async saveJourneyActivity(activity: JourneyActivity) {
    try {
      await AsyncStorage.setItem(this.KEYS.JOURNEY_ACTIVITY, JSON.stringify(activity));
    } catch (error) {
      console.error('Error saving journey activity:', error);
    }
  }

  // ——— Notification settings ———

  static async getNotificationSettings(): Promise<NotificationSettings> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.NOTIFICATION_SETTINGS);
      if (json) return { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(json) };
    } catch (error) {
      console.error('Error getting notification settings:', error);
    }
    return { ...DEFAULT_NOTIFICATION_SETTINGS };
  }

  static async saveNotificationSettings(settings: NotificationSettings) {
    try {
      await AsyncStorage.setItem(this.KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  // Fraction 0-1 of a chapter's verses that have been read
  static async getChapterProgress(chapter: number, verseCount: number): Promise<number> {
    if (verseCount <= 0) return 0;
    const { readVerses } = await this.getVerseProgress();
    const prefix = `${chapter}.`;
    const read = readVerses.filter(k => k.startsWith(prefix)).length;
    return Math.min(1, read / verseCount);
  }

  // Fraction 0-1 of the whole Gita that has been read
  static async getTotalProgress(): Promise<number> {
    const { readVerses } = await this.getVerseProgress();
    return Math.min(1, readVerses.length / this.TOTAL_GITA_VERSES);
  }

  // Reflections
  static async saveReflection(entry: ReflectionEntry) {
    try {
      const all = await this.getAllReflections();
      const existingIndex = all.findIndex(r => r.id === entry.id);
      if (existingIndex >= 0) {
        all[existingIndex] = entry;
      } else {
        all.push(entry);
      }
      await AsyncStorage.setItem(this.KEYS.REFLECTIONS, JSON.stringify(all));
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  }

  static async getAllReflections(): Promise<ReflectionEntry[]> {
    try {
      const json = await AsyncStorage.getItem(this.KEYS.REFLECTIONS);
      return json ? JSON.parse(json) : [];
    } catch (error) {
      console.error('Error getting reflections:', error);
      return [];
    }
  }

  // Reflections for a chapter (or all chapters), newest first
  static async getReflections(chapterNumber?: number): Promise<ReflectionEntry[]> {
    const all = await this.getAllReflections();
    const filtered = chapterNumber === undefined
      ? all
      : all.filter(r => r.chapterNumber === chapterNumber);
    return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  // Reflections for a non-Gita content item (festival/deity/concept), newest first
  static async getReflectionsByContent(
    contentType: ReflectionContentType,
    contentId: string
  ): Promise<ReflectionEntry[]> {
    const all = await this.getAllReflections();
    return all
      .filter(r => r.contentType === contentType && r.contentId === contentId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  static async deleteReflection(id: string) {
    try {
      const all = await this.getAllReflections();
      await AsyncStorage.setItem(this.KEYS.REFLECTIONS, JSON.stringify(all.filter(r => r.id !== id)));
    } catch (error) {
      console.error('Error deleting reflection:', error);
    }
  }

  // Preferences
  static async savePreferences(preferences: UserPreferences) {
    try {
      await AsyncStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  static async getPreferences(): Promise<UserPreferences> {
    try {
      const preferencesJson = await AsyncStorage.getItem(this.KEYS.PREFERENCES);
      if (preferencesJson) {
        return JSON.parse(preferencesJson);
      }
      
      // Default preferences
      const defaultPreferences: UserPreferences = {
        language: 'en',
        fontSize: 'medium',
        theme: 'auto',
        dailyReminderEnabled: true,
        reminderTime: '08:00',
        soundEnabled: true,
      };
      
      await this.savePreferences(defaultPreferences);
      return defaultPreferences;
    } catch (error) {
      console.error('Error getting preferences:', error);
      return {
        language: 'en',
        fontSize: 'medium',
        theme: 'auto',
        dailyReminderEnabled: true,
        reminderTime: '08:00',
        soundEnabled: true,
      };
    }
  }

  // Analytics
  static async trackAppOpen() {
    try {
      const analyticsJson = await AsyncStorage.getItem(this.KEYS.ANALYTICS);
      const analytics = analyticsJson ? JSON.parse(analyticsJson) : {
        appOpens: 0,
        lastOpened: new Date().toISOString(),
        featuresUsed: {},
      };

      analytics.appOpens += 1;
      analytics.lastOpened = new Date().toISOString();

      await AsyncStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify(analytics));
    } catch (error) {
      console.error('Error tracking app open:', error);
    }
  }

  static async trackFeatureUsage(featureName: string) {
    try {
      const analyticsJson = await AsyncStorage.getItem(this.KEYS.ANALYTICS);
      const analytics = analyticsJson ? JSON.parse(analyticsJson) : {
        appOpens: 0,
        lastOpened: new Date().toISOString(),
        featuresUsed: {},
      };

      analytics.featuresUsed[featureName] = (analytics.featuresUsed[featureName] || 0) + 1;

      await AsyncStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify(analytics));
    } catch (error) {
      console.error('Error tracking feature usage:', error);
    }
  }

  // Export/Import
  static async exportAllData(): Promise<AppData> {
    try {
      const [userProgress, studyNotes, reflections, preferences, analyticsJson] = await Promise.all([
        AsyncStorage.getItem(this.KEYS.USER_PROGRESS),
        AsyncStorage.getItem(this.KEYS.STUDY_NOTES),
        AsyncStorage.getItem(this.KEYS.REFLECTIONS),
        AsyncStorage.getItem(this.KEYS.PREFERENCES),
        AsyncStorage.getItem(this.KEYS.ANALYTICS),
      ]);

      return {
        userProgress: userProgress ? JSON.parse(userProgress) : null,
        studyNotes: studyNotes ? JSON.parse(studyNotes) : [],
        reflections: reflections ? JSON.parse(reflections) : [],
        preferences: preferences ? JSON.parse(preferences) : await this.getPreferences(),
        analytics: analyticsJson ? JSON.parse(analyticsJson) : {
          appOpens: 0,
          lastOpened: new Date().toISOString(),
          featuresUsed: {},
        },
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  static async importAllData(data: AppData) {
    try {
      const promises = [];
      
      if (data.userProgress) {
        promises.push(AsyncStorage.setItem(this.KEYS.USER_PROGRESS, JSON.stringify(data.userProgress)));
      }
      
      if (data.studyNotes) {
        promises.push(AsyncStorage.setItem(this.KEYS.STUDY_NOTES, JSON.stringify(data.studyNotes)));
      }

      if (data.reflections) {
        promises.push(AsyncStorage.setItem(this.KEYS.REFLECTIONS, JSON.stringify(data.reflections)));
      }

      if (data.preferences) {
        promises.push(AsyncStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify(data.preferences)));
      }
      
      if (data.analytics) {
        promises.push(AsyncStorage.setItem(this.KEYS.ANALYTICS, JSON.stringify(data.analytics)));
      }

      await Promise.all(promises);
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  // Clear all data
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        this.KEYS.USER_PROGRESS,
        this.KEYS.STUDY_NOTES,
        this.KEYS.REFLECTIONS,
        this.KEYS.VERSE_PROGRESS,
        this.KEYS.SPIRITUAL_PROFILE,
        this.KEYS.PREFERENCES,
        this.KEYS.ANALYTICS,
        this.KEYS.CURRENT_USER,
        this.KEYS.READER_POSITIONS,
        this.KEYS.CONTENT_COMPLETION,
        this.KEYS.JOURNEY_ACTIVITY,
        this.KEYS.NOTIFICATION_SETTINGS,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export default LocalStorageService;