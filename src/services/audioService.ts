import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUDIO_CONFIG } from '../config/audioConfig';

const SELECTED_AUDIO_KEY = 'selected_audio_path';
const CACHED_AUDIO_KEY = 'cached_audio_path';
const AUDIO_VERSION_KEY = 'audio_version';

export class AudioService {
  // Download audio file from cloud with progress callback
  static async downloadAudioFromCloud(
    onProgress?: (progress: number) => void
  ): Promise<string | null> {
    try {
      // Check if we already have a cached version
      const cachedPath = await this.getCachedAudioPath();
      if (cachedPath) {
        console.log('Using cached audio file:', cachedPath);
        return cachedPath;
      }

      // Try different cloud sources in order of preference
      const sources = AUDIO_CONFIG.cloudSources.filter(source => source.active);

      if (sources.length === 0) {
        throw new Error('No active cloud sources configured');
      }

      for (const source of sources) {
        try {

          console.log(`Trying to download from ${source.name}:`, source.url);
          
          const downloadPath = `${FileSystem.documentDirectory}${AUDIO_CONFIG.filename}`;
          
          const downloadResult = await FileSystem.downloadAsync(
            source.url,
            downloadPath,
            {
              progressCallback: onProgress ? (progress) => {
                const percentage = (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100;
                onProgress(Math.round(percentage));
              } : undefined
            }
          );

          if (downloadResult.status === 200) {
            console.log(`Successfully downloaded from ${source.name}`);
            
            // Cache the file path and version
            await AsyncStorage.setItem(CACHED_AUDIO_KEY, downloadPath);
            await AsyncStorage.setItem(AUDIO_VERSION_KEY, Date.now().toString());
            
            return downloadPath;
          }
        } catch (error) {
          console.log(`Failed to download from ${source.name}:`, error);
          continue; // Try next source
        }
      }

      throw new Error('All cloud sources failed');
    } catch (error) {
      console.log('Error downloading from cloud:', error);
      return null;
    }
  }

  // Get cached audio file path if it exists and is valid
  static async getCachedAudioPath(): Promise<string | null> {
    try {
      const cachedPath = await AsyncStorage.getItem(CACHED_AUDIO_KEY);
      if (cachedPath) {
        const fileInfo = await FileSystem.getInfoAsync(cachedPath);
        if (fileInfo.exists) {
          return cachedPath;
        } else {
          // Cached file no longer exists, clear cache
          await AsyncStorage.removeItem(CACHED_AUDIO_KEY);
          await AsyncStorage.removeItem(AUDIO_VERSION_KEY);
        }
      }
    } catch (error) {
      console.log('Error getting cached audio path:', error);
    }
    return null;
  }

  // Check if we have a previously selected audio file
  static async getSavedAudioPath(): Promise<string | null> {
    try {
      const savedPath = await AsyncStorage.getItem(SELECTED_AUDIO_KEY);
      if (savedPath) {
        const fileInfo = await FileSystem.getInfoAsync(savedPath);
        if (fileInfo.exists) {
          return savedPath;
        } else {
          // File no longer exists, remove from storage
          await AsyncStorage.removeItem(SELECTED_AUDIO_KEY);
        }
      }
    } catch (error) {
      console.log('Error getting saved audio path:', error);
    }
    return null;
  }

  // Let user pick audio file from their device
  static async pickAudioFile(): Promise<string | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const selectedPath = asset.uri;
        
        // Save the selected path for future use
        await AsyncStorage.setItem(SELECTED_AUDIO_KEY, selectedPath);
        console.log('Audio file selected:', selectedPath);
        return selectedPath;
      }
    } catch (error) {
      console.log('Error picking audio file:', error);
    }
    return null;
  }

  // Try to find audio file, with cloud download and file picker fallbacks
  static async findAudioFile(
    filename: string,
    onDownloadProgress?: (progress: number) => void
  ): Promise<string | null> {
    // First, check if we have a cached cloud download
    const cachedPath = await this.getCachedAudioPath();
    if (cachedPath) {
      return cachedPath;
    }

    // Second, check if we have a saved audio file path (from file picker)
    const savedPath = await this.getSavedAudioPath();
    if (savedPath) {
      return savedPath;
    }

    // Try some common locations (limited due to sandboxing)
    const possiblePaths = [
      // App's document directory
      `${FileSystem.documentDirectory}${filename}`,
      `${FileSystem.documentDirectory}Downloads/${filename}`,
    ];

    for (const path of possiblePaths) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(path);
        if (fileInfo.exists) {
          console.log(`Found audio file at: ${path}`);
          return path;
        }
      } catch (error) {
        // Continue to next path
      }
    }

    // Try to download from cloud as a fallback
    console.log('No local file found, attempting cloud download...');
    const cloudPath = await this.downloadAudioFromCloud(onDownloadProgress);
    if (cloudPath) {
      return cloudPath;
    }

    return null;
  }

  // Clear saved audio file path
  static async clearSavedAudioPath(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SELECTED_AUDIO_KEY);
    } catch (error) {
      console.log('Error clearing saved audio path:', error);
    }
  }

  static formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  static getProgressPercentage(position: number, duration: number): number {
    if (duration === 0) return 0;
    return Math.round((position / duration) * 100);
  }
}