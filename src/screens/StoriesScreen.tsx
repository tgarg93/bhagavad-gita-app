import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
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
import { AudioService } from '../services/audioService';

const { width } = Dimensions.get('window');

const StoriesScreen: React.FC = () => {
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
            'The Bhagavad Gita audio story is not available. How would you like to get it?',
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
        
        // Create audio with minimal configuration and wait for full load
        console.log('Creating audio object...');
        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: audioPath },
          { 
            shouldPlay: false, 
            isLooping: false,
            volume: 1.0,
            progressUpdateIntervalMillis: 1000,
          }
          // Don't set status callback initially to avoid conflicts
        );
        
        // Wait a moment for the sound to fully initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Get initial status to verify audio is loaded
        const status = await audioSound.getStatusAsync();
        console.log('Audio creation status:', {
          isLoaded: status.isLoaded,
          duration: status.isLoaded ? `${Math.round(status.durationMillis / 1000)}s` : 'unknown',
          uri: audioPath.split('/').pop()
        });
        
        if (!status.isLoaded) {
          console.log('First attempt failed, trying with even simpler config...');
          // Clean up the failed sound
          await audioSound.unloadAsync();
          
          // Try to reload once more with absolute minimal config
          const { sound: retrySound } = await Audio.Sound.createAsync({ uri: audioPath });
          
          // Wait for loading
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const retryStatus = await retrySound.getStatusAsync();
          console.log('Retry attempt status:', {
            isLoaded: retryStatus.isLoaded,
            duration: retryStatus.isLoaded ? `${Math.round(retryStatus.durationMillis / 1000)}s` : 'unknown'
          });
          
          if (!retryStatus.isLoaded) {
            await retrySound.unloadAsync();
            throw new Error('Audio failed to load after multiple attempts');
          }
          
          // Now set the status callback
          retrySound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          setSound(retrySound);
          return retrySound;
        }
        
        // Set the status callback after successful loading
        audioSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
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
      
      // Ensure we have a properly loaded sound before proceeding
      let currentSound = sound;
      if (!currentSound) {
        console.log('No sound loaded, loading audio...');
        currentSound = await loadAudio();
        if (!currentSound) {
          setIsLoading(false);
          return;
        }
      }
      
      // Double-check that the sound is actually loaded
      const soundStatus = await currentSound.getStatusAsync();
      if (!soundStatus.isLoaded) {
        console.log('Sound not loaded, reloading...');
        // Try to reload the audio
        await currentSound.unloadAsync();
        setSound(null);
        currentSound = await loadAudio();
        if (!currentSound) {
          setIsLoading(false);
          Alert.alert(
            'Audio Error',
            'Unable to load audio file. Please try again or select a different file.'
          );
          return;
        }
      }
      
      if (isPlaying) {
        // Pause audio
        console.log('Pausing audio...');
        try {
          await currentSound.pauseAsync();
          setIsPlaying(false);
          console.log('Audio paused');
        } catch (pauseError) {
          console.log('Error pausing audio:', pauseError);
          setIsPlaying(false);
        }
      } else {
        // Play audio with comprehensive error handling
        console.log('Starting audio playback...');
        try {
          // Final status check before playing
          const finalStatus = await currentSound.getStatusAsync();
          console.log('Final audio status before play:', {
            isLoaded: finalStatus.isLoaded,
            duration: finalStatus.isLoaded ? `${Math.round(finalStatus.durationMillis / 1000)}s` : 'unknown'
          });
          
          if (finalStatus.isLoaded && finalStatus.durationMillis > 0) {
            // Reset to beginning if at the end
            if (finalStatus.positionMillis >= finalStatus.durationMillis - 1000) {
              await currentSound.setPositionAsync(0);
              // Wait a moment after position reset
              await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            // Start playback
            console.log('Attempting to start playback...');
            await currentSound.playAsync();
            
            // Wait a moment and verify it started
            await new Promise(resolve => setTimeout(resolve, 100));
            const verifyStatus = await currentSound.getStatusAsync();
            
            if (verifyStatus.isLoaded && verifyStatus.isPlaying) {
              setIsPlaying(true);
              console.log('Audio playbook confirmed started');
            } else {
              console.log('Playback verification failed, status:', verifyStatus);
              throw new Error('Playback did not start properly');
            }
            
            // Verify playback started after a short delay
            setTimeout(async () => {
              try {
                const playStatus = await currentSound.getStatusAsync();
                if (playStatus?.isLoaded && !playStatus.isPlaying) {
                  console.log('Audio not playing after start, attempting retry...');
                  await currentSound.setPositionAsync(0);
                  await currentSound.playAsync();
                }
              } catch (verifyError) {
                console.log('Verification retry failed:', verifyError);
              }
            }, 1000);
          } else {
            throw new Error('Audio not ready for playback');
          }
        } catch (playError) {
          console.log('Error playing audio:', playError);
          setIsPlaying(false);
          
          // Try one more time with a fresh audio load
          console.log('Attempting complete audio reload...');
          try {
            await currentSound.unloadAsync();
            setSound(null);
            const freshSound = await loadAudio();
            if (freshSound) {
              const freshStatus = await freshSound.getStatusAsync();
              if (freshStatus.isLoaded) {
                await freshSound.playAsync();
                setIsPlaying(true);
                console.log('Audio started after reload');
                return;
              }
            }
          } catch (reloadError) {
            console.log('Complete reload failed:', reloadError);
          }
          
          Alert.alert(
            'Playback Error',
            'Unable to start audio playback. Please try selecting the audio file again using the long-press menu.'
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

  const changeAudioFile = async () => {
    Alert.alert(
      'Story Options',
      'Audio story options',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Audio Info',
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
          text: 'Reload Audio',
          onPress: async () => {
            try {
              setIsLoading(true);
              if (sound) {
                await sound.unloadAsync();
                setSound(null);
              }
              setIsPlaying(false);
              setStoryProgress(0);
              
              const newSound = await loadAudio();
              if (newSound) {
                Alert.alert('Success', 'Audio reloaded! Tap play to start.');
              } else {
                Alert.alert('Failed', 'Could not reload audio.');
              }
            } catch (error) {
              console.log('Force reload error:', error);
              Alert.alert('Error', 'Failed to reload audio.');
            } finally {
              setIsLoading(false);
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        
        <Text style={styles.appTitle}>🎧 Bhagavad Gita Stories</Text>
        
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
                borderTopColor: storyProgress === 100 ? '#ffd700' : '#9333ea'
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
                     storyProgress > 0 ? ['#a855f7', '#c084fc'] : 
                     ['#9333ea', '#a855f7']}
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
        
        {/* Story Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.storyTitle}>Krishna's Wisdom for Children</Text>
          <Text style={styles.storyDescription}>
            Listen to the beautiful teachings of the Bhagavad Gita told in a way that's perfect for young hearts and minds. Krishna shares his timeless wisdom through engaging stories and simple explanations.
          </Text>
        </View>
        
        {/* Status */}
        <Text style={styles.lessonStatus}>
          {isDownloading ? `Downloading... ${downloadProgress}%` :
           isLoading ? 'Loading audio...' : 
           isPlaying ? 'Playing story...' :
           storyProgress === 0 ? 'Start listening' : 
           storyProgress === 100 ? 'Story complete!' : 'Continue listening'}
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Text style={styles.hintText}>Long press the play button for more options</Text>
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
  backButton: {
    padding: 8,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#9333ea',
    flex: 1,
    textAlign: 'center',
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
    paddingHorizontal: 20,
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
    borderTopColor: '#9333ea',
  },
  giantPlayButton: {
    zIndex: 2,
    shadowColor: '#9333ea',
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
    color: '#9333ea',
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  storyDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  lessonStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 30,
    textAlign: 'center',
  },
  bottomActions: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default StoriesScreen;