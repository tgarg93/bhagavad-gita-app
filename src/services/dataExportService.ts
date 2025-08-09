import LocalStorageService, { AppData } from './localStorageService';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export class DataExportService {
  
  /**
   * Export all user data to a JSON file
   */
  static async exportUserData(): Promise<string> {
    try {
      const data = await LocalStorageService.exportAllData();
      const exportData = {
        ...data,
        exportedAt: new Date().toISOString(),
        appVersion: '1.0.0',
        format: 'bhagavad-gita-backup-v1'
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const fileName = `bhagavad-gita-backup-${new Date().toISOString().split('T')[0]}.json`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export Bhagavad Gita Data'
        });
      }

      return fileUri;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  /**
   * Import user data from a JSON file
   */
  static async importUserData(): Promise<void> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const importedData = JSON.parse(fileContent);

      // Validate the data format
      if (!importedData.format || !importedData.format.startsWith('bhagavad-gita-backup')) {
        throw new Error('Invalid backup file format');
      }

      // Extract the app data
      const appData: AppData = {
        userProgress: importedData.userProgress,
        studyNotes: importedData.studyNotes || [],
        preferences: importedData.preferences,
        analytics: importedData.analytics || {
          appOpens: 0,
          lastOpened: new Date().toISOString(),
          featuresUsed: {}
        }
      };

      await LocalStorageService.importAllData(appData);
      
      // Track the import
      await LocalStorageService.trackFeatureUsage('data_import');

    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data. Please check the file format.');
    }
  }

  /**
   * Export specific user notes as text file
   */
  static async exportUserNotes(userId: string): Promise<string> {
    try {
      const userProgress = await LocalStorageService.getUserProgress(userId);
      const studyNotes = await LocalStorageService.getUserStudyNotes(userId);

      let content = `# Bhagavad Gita - Personal Study Notes\n\n`;
      content += `Export Date: ${new Date().toLocaleString()}\n`;
      content += `User: ${userProgress?.username || 'Unknown'}\n\n`;

      content += `## Progress Summary\n`;
      content += `- Chapters Completed: ${userProgress?.chaptersCompleted.length || 0}\n`;
      content += `- Verses Read: ${userProgress?.versesRead.length || 0}\n`;
      content += `- Daily Streak: ${userProgress?.dailyStreak || 0} days\n`;
      content += `- Total Reading Time: ${Math.floor((userProgress?.totalReadingTime || 0) / 60)} hours\n\n`;

      if (studyNotes.length > 0) {
        content += `## Personal Notes (${studyNotes.length})\n\n`;
        
        studyNotes
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .forEach((note, index) => {
            content += `### Note ${index + 1} - Verse ${note.verseId}\n`;
            content += `**Created:** ${new Date(note.createdAt).toLocaleDateString()}\n`;
            content += `**Updated:** ${new Date(note.updatedAt).toLocaleDateString()}\n`;
            content += `**Content:** ${note.note}\n\n`;
            content += `---\n\n`;
          });
      }

      const fileName = `bhagavad-gita-notes-${new Date().toISOString().split('T')[0]}.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, content);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Export Personal Notes'
        });
      }

      await LocalStorageService.trackFeatureUsage('notes_export');
      return fileUri;
    } catch (error) {
      console.error('Error exporting notes:', error);
      throw new Error('Failed to export notes');
    }
  }

  /**
   * Export user progress as a shareable summary
   */
  static async exportProgressSummary(userId: string): Promise<string> {
    try {
      const userProgress = await LocalStorageService.getUserProgress(userId);
      
      if (!userProgress) {
        throw new Error('No user progress found');
      }

      let content = `🕉️ My Bhagavad Gita Journey\n\n`;
      content += `📊 Progress Summary:\n`;
      content += `• Chapters Completed: ${userProgress.chaptersCompleted.length}/18\n`;
      content += `• Verses Read: ${userProgress.versesRead.length}\n`;
      content += `• Daily Streak: ${userProgress.dailyStreak} days 🔥\n`;
      content += `• Reading Time: ${Math.floor(userProgress.totalReadingTime / 60)} hours\n`;
      content += `• Bookmarked Verses: ${userProgress.bookmarkedVerses.length}\n`;
      content += `• Favorite Verses: ${userProgress.favoriteVerses.length}\n\n`;
      
      const completionPercentage = ((userProgress.chaptersCompleted.length / 18) * 100).toFixed(1);
      content += `🎯 Overall Completion: ${completionPercentage}%\n\n`;
      
      content += `"The mind is restless and difficult to restrain, but it is subdued by practice." - Bhagavad Gita 6.35\n\n`;
      content += `Shared from Bhagavad Gita Learning App 📱`;

      const fileName = `my-gita-journey-${new Date().toISOString().split('T')[0]}.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, content);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Share My Spiritual Journey'
        });
      }

      await LocalStorageService.trackFeatureUsage('progress_share');
      return fileUri;
    } catch (error) {
      console.error('Error exporting progress summary:', error);
      throw new Error('Failed to export progress summary');
    }
  }

  /**
   * Create a backup reminder check
   */
  static async shouldShowBackupReminder(): Promise<boolean> {
    try {
      const lastBackupKey = 'last_backup_reminder';
      const lastBackupJson = await require('@react-native-async-storage/async-storage').default.getItem(lastBackupKey);
      
      if (!lastBackupJson) {
        return true; // First time, show reminder
      }

      const lastBackup = new Date(JSON.parse(lastBackupJson));
      const daysSinceBackup = (Date.now() - lastBackup.getTime()) / (1000 * 60 * 60 * 24);
      
      return daysSinceBackup >= 30; // Show reminder every 30 days
    } catch (error) {
      console.error('Error checking backup reminder:', error);
      return false;
    }
  }

  static async markBackupReminderShown(): Promise<void> {
    try {
      const lastBackupKey = 'last_backup_reminder';
      await require('@react-native-async-storage/async-storage').default.setItem(
        lastBackupKey, 
        JSON.stringify(new Date().toISOString())
      );
    } catch (error) {
      console.error('Error marking backup reminder:', error);
    }
  }
}

export default DataExportService;