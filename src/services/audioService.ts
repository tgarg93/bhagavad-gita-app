import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_AUDIO_KEY = 'selected_audio_path';

export class AudioService {
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

  // Try to find audio file, with fallback to file picker
  static async findAudioFile(filename: string): Promise<string | null> {
    // First, check if we have a saved audio file path
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