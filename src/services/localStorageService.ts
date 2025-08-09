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

export interface AppData {
  userProgress: UserProgress | null;
  studyNotes: StudyNote[];
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
    PREFERENCES: 'bhagavad_gita_preferences',
    ANALYTICS: 'bhagavad_gita_analytics',
    CURRENT_USER: 'bhagavad_gita_current_user',
  };

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
      const [userProgress, studyNotes, preferences, analyticsJson] = await Promise.all([
        AsyncStorage.getItem(this.KEYS.USER_PROGRESS),
        AsyncStorage.getItem(this.KEYS.STUDY_NOTES),
        AsyncStorage.getItem(this.KEYS.PREFERENCES),
        AsyncStorage.getItem(this.KEYS.ANALYTICS),
      ]);

      return {
        userProgress: userProgress ? JSON.parse(userProgress) : null,
        studyNotes: studyNotes ? JSON.parse(studyNotes) : [],
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
        this.KEYS.PREFERENCES,
        this.KEYS.ANALYTICS,
        this.KEYS.CURRENT_USER,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export default LocalStorageService;