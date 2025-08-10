import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export class AudioService {
  static async findAudioFile(filename: string): Promise<string | null> {
    const possiblePaths = [
      // App's document directory Downloads folder
      `${FileSystem.documentDirectory}Downloads/${filename}`,
      
      // iOS specific paths
      ...(Platform.OS === 'ios' ? [
        `${FileSystem.documentDirectory}../Downloads/${filename}`,
        `${FileSystem.documentDirectory}../../../Downloads/${filename}`,
      ] : []),
      
      // Android specific paths
      ...(Platform.OS === 'android' ? [
        `/storage/emulated/0/Download/${filename}`,
        `/storage/emulated/0/Downloads/${filename}`,
        `/sdcard/Download/${filename}`,
        `/sdcard/Downloads/${filename}`,
      ] : []),
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
        console.log(`Failed to check path: ${path}`, error);
      }
    }

    return null;
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