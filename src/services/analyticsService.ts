import LocalStorageService from './localStorageService';
import { Platform } from 'react-native';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
  platform: string;
  appVersion: string;
}

export interface AnalyticsSession {
  sessionId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  events: AnalyticsEvent[];
  userId?: string;
}

class AnalyticsService {
  private static sessionId: string;
  private static sessionStartTime: Date;
  private static events: AnalyticsEvent[] = [];
  
  static async initialize(userId?: string) {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = new Date();
    
    await this.trackEvent('app_opened', {
      userId,
      platform: Platform.OS,
      device: Platform.OS === 'ios' ? 'iOS' : 'Android'
    });
    
    // Track app open in local storage
    await LocalStorageService.trackAppOpen();
  }

  static async trackEvent(eventName: string, properties: Record<string, any> = {}, userId?: string) {
    const event: AnalyticsEvent = {
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      userId,
      sessionId: this.sessionId,
      platform: Platform.OS,
      appVersion: '1.0.0'
    };

    this.events.push(event);
    
    // Also track in local storage for feature usage
    await LocalStorageService.trackFeatureUsage(eventName);
    
    // Store events locally (could be sent to analytics service later)
    await this.storeEventLocally(event);
    
    console.log('📊 Analytics Event:', eventName, properties);
  }

  static async trackScreenView(screenName: string, userId?: string) {
    await this.trackEvent('screen_view', {
      screen_name: screenName,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static async trackUserAction(action: string, details: Record<string, any> = {}, userId?: string) {
    await this.trackEvent('user_action', {
      action,
      ...details
    }, userId);
  }

  static async trackLearningEvent(eventType: 'verse_read' | 'chapter_completed' | 'note_added' | 'verse_bookmarked', details: Record<string, any> = {}, userId?: string) {
    await this.trackEvent('learning_event', {
      learning_event_type: eventType,
      ...details
    }, userId);
  }

  static async trackError(error: Error, context?: string, userId?: string) {
    await this.trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static async endSession(userId?: string) {
    const endTime = new Date();
    const duration = endTime.getTime() - this.sessionStartTime.getTime();
    
    await this.trackEvent('session_ended', {
      session_duration: duration,
      events_count: this.events.length
    }, userId);

    // Store session summary
    const session: AnalyticsSession = {
      sessionId: this.sessionId,
      startTime: this.sessionStartTime.toISOString(),
      endTime: endTime.toISOString(),
      duration,
      events: this.events,
      userId
    };

    await this.storeSessionLocally(session);
    this.events = [];
  }

  private static generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private static async storeEventLocally(event: AnalyticsEvent) {
    try {
      const eventsKey = 'analytics_events';
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      const existingEventsJson = await AsyncStorage.getItem(eventsKey);
      const existingEvents: AnalyticsEvent[] = existingEventsJson ? JSON.parse(existingEventsJson) : [];
      
      existingEvents.push(event);
      
      // Keep only last 1000 events to prevent storage bloat
      const recentEvents = existingEvents.slice(-1000);
      
      await AsyncStorage.setItem(eventsKey, JSON.stringify(recentEvents));
    } catch (error) {
      console.error('Error storing analytics event:', error);
    }
  }

  private static async storeSessionLocally(session: AnalyticsSession) {
    try {
      const sessionsKey = 'analytics_sessions';
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      const existingSessionsJson = await AsyncStorage.getItem(sessionsKey);
      const existingSessions: AnalyticsSession[] = existingSessionsJson ? JSON.parse(existingSessionsJson) : [];
      
      existingSessions.push(session);
      
      // Keep only last 50 sessions
      const recentSessions = existingSessions.slice(-50);
      
      await AsyncStorage.setItem(sessionsKey, JSON.stringify(recentSessions));
    } catch (error) {
      console.error('Error storing analytics session:', error);
    }
  }

  // Get analytics summary for the user
  static async getAnalyticsSummary(): Promise<{
    totalSessions: number;
    totalEvents: number;
    mostUsedFeatures: Array<{ feature: string; count: number }>;
    averageSessionDuration: number;
    lastActive: string;
  }> {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      const [sessionsJson, eventsJson, analyticsJson] = await Promise.all([
        AsyncStorage.getItem('analytics_sessions'),
        AsyncStorage.getItem('analytics_events'),
        AsyncStorage.getItem('bhagavad_gita_analytics')
      ]);

      const sessions: AnalyticsSession[] = sessionsJson ? JSON.parse(sessionsJson) : [];
      const events: AnalyticsEvent[] = eventsJson ? JSON.parse(eventsJson) : [];
      const analytics = analyticsJson ? JSON.parse(analyticsJson) : { featuresUsed: {} };

      // Calculate average session duration
      const sessionsWithDuration = sessions.filter(s => s.duration);
      const averageSessionDuration = sessionsWithDuration.length > 0
        ? sessionsWithDuration.reduce((sum, s) => sum + (s.duration || 0), 0) / sessionsWithDuration.length
        : 0;

      // Get most used features
      const mostUsedFeatures = Object.entries(analytics.featuresUsed)
        .map(([feature, count]) => ({ feature, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Find last active time
      const lastActive = sessions.length > 0 
        ? sessions[sessions.length - 1].endTime || sessions[sessions.length - 1].startTime
        : analytics.lastOpened || new Date().toISOString();

      return {
        totalSessions: sessions.length,
        totalEvents: events.length,
        mostUsedFeatures,
        averageSessionDuration: Math.round(averageSessionDuration / 1000 / 60), // Convert to minutes
        lastActive
      };
    } catch (error) {
      console.error('Error getting analytics summary:', error);
      return {
        totalSessions: 0,
        totalEvents: 0,
        mostUsedFeatures: [],
        averageSessionDuration: 0,
        lastActive: new Date().toISOString()
      };
    }
  }

  // Export analytics data
  static async exportAnalyticsData(): Promise<any> {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      const [sessionsJson, eventsJson, analyticsJson] = await Promise.all([
        AsyncStorage.getItem('analytics_sessions'),
        AsyncStorage.getItem('analytics_events'),
        AsyncStorage.getItem('bhagavad_gita_analytics')
      ]);

      return {
        sessions: sessionsJson ? JSON.parse(sessionsJson) : [],
        events: eventsJson ? JSON.parse(eventsJson) : [],
        summary: analyticsJson ? JSON.parse(analyticsJson) : {},
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      return {
        sessions: [],
        events: [],
        summary: {},
        exportedAt: new Date().toISOString()
      };
    }
  }

  // Clear analytics data (for privacy)
  static async clearAnalyticsData(): Promise<void> {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      await AsyncStorage.multiRemove([
        'analytics_sessions',
        'analytics_events'
      ]);
      
      this.events = [];
    } catch (error) {
      console.error('Error clearing analytics data:', error);
    }
  }

  // Predefined tracking methods for common app events
  static trackChapterOpened = (chapterNumber: number, userId?: string) => 
    this.trackLearningEvent('verse_read', { chapter_number: chapterNumber }, userId);

  static trackVerseRead = (verseId: string, chapterNumber: number, verseNumber: number, userId?: string) => 
    this.trackLearningEvent('verse_read', { verse_id: verseId, chapter_number: chapterNumber, verse_number: verseNumber }, userId);

  static trackVerseBookmarked = (verseId: string, userId?: string) => 
    this.trackLearningEvent('verse_bookmarked', { verse_id: verseId }, userId);

  static trackNoteAdded = (verseId: string, noteLength: number, userId?: string) => 
    this.trackLearningEvent('note_added', { verse_id: verseId, note_length: noteLength }, userId);

  static trackSearchPerformed = (query: string, resultsCount: number, userId?: string) => 
    this.trackUserAction('search', { query, results_count: resultsCount }, userId);

  static trackDataExported = (exportType: 'full' | 'notes' | 'progress', userId?: string) => 
    this.trackUserAction('data_export', { export_type: exportType }, userId);
}

export default AnalyticsService;