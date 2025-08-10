import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { AudioService } from '../services/audioService';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { currentUser, loginAsGuest } = useAuth();
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [storyProgress, setStoryProgress] = useState(0); // 0-100%
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);

  useEffect(() => {
    // Configure audio session with comprehensive fallback options
    const configureAudio = async (retryCount = 0) => {
      const maxRetries = 2;
      const audioConfigs = [
        // Most permissive configuration - should work on all devices
        {
          name: 'Minimal',
          config: {
            playsInSilentModeIOS: true,
          }
        },
        // Ultra-minimal fallback - just in case
        {
          name: 'Default',
          config: {} // Use system defaults
        }
      ];

      for (const { name, config } of audioConfigs) {
        try {
          await Audio.setAudioModeAsync(config);
          console.log(`Audio configuration successful: ${name}`);
          return true; // Success
        } catch (error) {
          console.log(`Audio config ${name} failed, trying next...`);
          // Continue to next configuration silently
        }
      }
      
      // If all configurations fail, retry once more after a delay
      if (retryCount < maxRetries) {
        setTimeout(() => configureAudio(retryCount + 1), 1000);
        return false;
      }
      
      // Final fallback - audio will work with system defaults
      console.log('Using system default audio settings');
      return true; // Don't block the app
    };
    
    configureAudio();

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async (): Promise<Audio.Sound | null> => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      
      let audioPath = await AudioService.findAudioFile('8_yo_version.m4a', (progress) => {
        setDownloadProgress(progress);
      });
      
      if (!audioPath) {
        // Show options for getting the audio file
        const choice = await new Promise<string>((resolve) => {
          Alert.alert(
            'Audio File Not Found',
            'The Bhagavad Gita audio file is not available. How would you like to get it?',
            [
              { text: 'Cancel', style: 'cancel', onPress: () => resolve('cancel') },
              { text: 'Select from Device', onPress: () => resolve('pick') },
              { text: 'Download from Cloud', onPress: () => resolve('download') }
            ]
          );
        });
        
        if (choice === 'pick') {
          audioPath = await AudioService.pickAudioFile();
        } else if (choice === 'download') {
          audioPath = await AudioService.downloadAudioFromCloud((progress) => {
            setDownloadProgress(progress);
          });
          
          if (!audioPath) {
            Alert.alert(
              'Download Failed', 
              'Could not download the audio file from cloud storage. You can try selecting the file manually if you have it on your device.'
            );
          }
        }
      }
      
      setIsDownloading(false);
      
      if (audioPath) {
        console.log('Loading audio from:', audioPath);
        
        // Check if file exists and get info
        const fileInfo = await require('expo-file-system').getInfoAsync(audioPath);
        console.log('Audio file info:', fileInfo);
        
        if (!fileInfo.exists) {
          throw new Error('Audio file does not exist at path: ' + audioPath);
        }
        
        // Create audio with minimal configuration for maximum compatibility
        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: audioPath },
          { 
            shouldPlay: false, 
            isLooping: false,
            volume: 1.0,
            progressUpdateIntervalMillis: 1000,
          },
          onPlaybackStatusUpdate
        );
        
        // Get initial status to verify audio is loaded
        const status = await audioSound.getStatusAsync();
        console.log('Audio loaded successfully. Duration:', 
          status.isLoaded ? `${Math.round(status.durationMillis / 1000)}s` : 'unknown'
        );
        
        if (!status.isLoaded) {
          // Try to reload once more with even simpler config
          const { sound: retrySound } = await Audio.Sound.createAsync(
            { uri: audioPath },
            { shouldPlay: false },
            onPlaybackStatusUpdate
          );
          
          const retryStatus = await retrySound.getStatusAsync();
          if (!retryStatus.isLoaded) {
            throw new Error('Audio failed to load after retry');
          }
          setSound(retrySound);
          return retrySound;
        }
        
        setSound(audioSound);
        return audioSound;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error loading audio:', error);
      setIsDownloading(false);
      Alert.alert(
        'Audio Load Error', 
        'Unable to load the audio file. Please make sure the file is accessible and try again.'
      );
      return null;
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    setPlaybackStatus(status);
    if (status.isLoaded) {
      // Update progress
      const progress = status.durationMillis > 0 
        ? Math.round((status.positionMillis / status.durationMillis) * 100)
        : 0;
      setStoryProgress(progress);
      
      // Sync playing state with actual playback status
      setIsPlaying(status.isPlaying);
      
      // Log status for debugging (only on significant changes)
      if (status.didJustFinish || Math.floor(status.positionMillis / 10000) !== Math.floor((status.positionMillis - 500) / 10000)) {
        console.log('Playback status:', {
          isPlaying: status.isPlaying,
          positionSeconds: Math.round(status.positionMillis / 1000),
          durationSeconds: Math.round(status.durationMillis / 1000),
          progress: progress + '%'
        });
      }
      
      if (status.didJustFinish) {
        console.log('Audio finished playing');
        setIsPlaying(false);
        setStoryProgress(100);
      }
    }
  };

  const startStory = async () => {
    if (!currentUser) {
      // Auto-login as guest if not logged in
      try {
        await loginAsGuest();
      } catch (error) {
        Alert.alert('Error', 'Unable to start. Please try again.');
        return;
      }
    }
    
    try {
      setIsLoading(true);
      
      if (!sound) {
        const loadedSound = await loadAudio();
        if (!loadedSound) {
          setIsLoading(false);
          return;
        }
      }
      
      if (isPlaying) {
        // Pause audio
        console.log('Pausing audio...');
        await sound?.pauseAsync();
        setIsPlaying(false);
        console.log('Audio paused');
      } else {
        // Play audio with retry logic
        console.log('Starting audio playback...');
        try {
          // Get current status before playing
          const currentStatus = await sound?.getStatusAsync();
          console.log('Audio status before play:', currentStatus);
          
          if (currentStatus?.isLoaded) {
            // Try to play from current position
            await sound?.playAsync();
            setIsPlaying(true);
            console.log('Audio playback started');
            
            // Verify it's actually playing after a short delay
            setTimeout(async () => {
              const playStatus = await sound?.getStatusAsync();
              if (playStatus?.isLoaded && !playStatus.isPlaying && playStatus.positionMillis === 0) {
                console.log('Audio didn\'t start properly, retrying...');
                try {
                  await sound?.setPositionAsync(0);
                  await sound?.playAsync();
                } catch (retryError) {
                  console.log('Retry failed:', retryError);
                }
              }
            }, 500);
          } else {
            throw new Error('Sound not properly loaded');
          }
        } catch (playError) {
          console.log('Error playing audio:', playError);
          setIsPlaying(false);
          Alert.alert(
            'Playback Error',
            'Unable to start audio playback. Try tapping play again.'
          );
        }
      }
    } catch (error) {
      console.log('Error playing audio:', error);
      Alert.alert('Playback Error', 'Unable to play audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const continueLearning = () => {
    navigation.navigate('Chapters' as never);
  };

  const changeAudioFile = async () => {
    Alert.alert(
      'Audio Options',
      'What would you like to do?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Test Audio Info',
          onPress: async () => {
            if (sound) {
              const status = await sound.getStatusAsync();
              const audioInfo = {
                isLoaded: status.isLoaded,
                isPlaying: status.isPlaying,
                duration: status.isLoaded ? `${Math.round(status.durationMillis / 1000)}s` : 'unknown',
                position: status.isLoaded ? `${Math.round(status.positionMillis / 1000)}s` : 'unknown',
                volume: status.isLoaded ? status.volume : 'unknown'
              };
              Alert.alert('Audio Debug Info', JSON.stringify(audioInfo, null, 2));
            } else {
              Alert.alert('No Audio', 'No audio file loaded yet.');
            }
          }
        },
        { 
          text: 'Select New File', 
          onPress: async () => {
            try {
              setIsLoading(true);
              // Stop current audio if playing
              if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
              }
              setIsPlaying(false);
              setStoryProgress(0);
              
              // Clear saved path and pick new file
              await AudioService.clearSavedAudioPath();
              const newPath = await AudioService.pickAudioFile();
              
              if (newPath) {
                Alert.alert('Success', 'New audio file selected! Tap play to start.');
              }
            } catch (error) {
              console.log('Error changing audio file:', error);
              Alert.alert('Error', 'Failed to change audio file.');
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>🕉️ Bhagavad Gita</Text>
        {currentUser && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>🔥 7</Text>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Giant Play Button with Progress Ring */}
        <View style={styles.playContainer}>
          {storyProgress > 0 && (
            <View style={styles.progressRing}>
              <View style={[styles.progressArc, { 
                transform: [{ rotate: `${(storyProgress / 100) * 360 - 90}deg` }],
                borderTopColor: storyProgress === 100 ? '#ffd700' : '#58cc02'
              }]} />
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.giantPlayButton} 
            onPress={startStory}
            onLongPress={changeAudioFile}
            disabled={isLoading || isDownloading}
          >
            <LinearGradient
              colors={storyProgress === 100 ? ['#ffd700', '#ffed4e'] : 
                     storyProgress > 0 ? ['#1cb0f6', '#4fc3f7'] : 
                     ['#58cc02', '#89e219']}
              style={styles.playButtonCircle}
            >
              <Ionicons 
                name={isDownloading ? 'cloud-download-outline' :
                     isLoading ? 'hourglass-outline' : 
                     isPlaying ? 'pause' : 'play'} 
                size={60} 
                color="#ffffff" 
              />
            </LinearGradient>
          </TouchableOpacity>
          
          {storyProgress > 0 && (
            <Text style={styles.progressLabel}>{storyProgress}% complete</Text>
          )}
        </View>
        
        {/* Lesson Status */}
        <Text style={styles.lessonStatus}>
          {isDownloading ? `Downloading... ${downloadProgress}%` :
           isLoading ? 'Loading audio...' : 
           isPlaying ? 'Playing story...' :
           storyProgress === 0 ? 'Start lesson' : 
           storyProgress === 100 ? 'Story complete!' : 'Continue lesson'}
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.bottomButton} onPress={continueLearning}>
          <LinearGradient
            colors={['#ff9600', '#ffb84d']}
            style={styles.bottomButtonGradient}
          >
            <Ionicons name="book" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomButton} 
          onPress={() => navigation.navigate('Ask Krishna' as never)}
        >
          <LinearGradient
            colors={['#1cb0f6', '#4fc3f7']}
            style={styles.bottomButtonGradient}
          >
            <Ionicons name="chatbubble" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#58cc02',
  },
  streakContainer: {
    backgroundColor: '#ff9600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 8,
    borderColor: '#e5e7eb',
    zIndex: 1,
  },
  progressArc: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: '#58cc02',
  },
  giantPlayButton: {
    zIndex: 2,
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  playButtonCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58cc02',
    marginTop: 20,
  },
  lessonStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 30,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 40,
  },
  bottomButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;