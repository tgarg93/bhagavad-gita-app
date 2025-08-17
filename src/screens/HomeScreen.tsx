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
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { vapiService, VapiCallStatus } from '../services/vapiService';
import { VAPI_CONFIG, createAssistantConfig } from '../config/vapiConfig';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { currentUser, loginAsGuest } = useAuth();
  const navigation = useNavigation();
  const [callStatus, setCallStatus] = useState<VapiCallStatus>({
    isConnecting: false,
    isConnected: false,
    isActive: false,
    callDuration: 0,
  });
  const [isInitializing, setIsInitializing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [totalCallTime, setTotalCallTime] = useState(0); // Total time spent talking to Krishna
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Prevent rapid button presses

  useEffect(() => {
    // Initialize Vapi service and set up event handlers
    const initializeVapi = async () => {
      try {
        setIsInitializing(true);
        
        // Initialize Vapi service with configuration (works in both real and demo modes)
        if (!vapiService.isReady()) {
          await vapiService.initialize(
            VAPI_CONFIG.publicApiKey,
            VAPI_CONFIG.assistantId,
            createAssistantConfig('first-time')
          );
        }

        // Set up event handlers
        vapiService.setEventHandlers({
          onCallStart: () => {
            console.log('Voice call with Krishna started');
            setCallStatus(vapiService.getCallStatus());
          },
          onCallEnd: () => {
            console.log('Voice call with Krishna ended');
            setCallStatus(vapiService.getCallStatus());
            setIsMuted(false);
          },
          onError: (error) => {
            console.error('Voice call error:', error);
            setCallStatus(vapiService.getCallStatus());
          },
          onStatusUpdate: (status) => {
            setCallStatus(status);
          },
        });

        console.log('Vapi service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
        Alert.alert(
          'Voice Service Error',
          'Unable to initialize voice calling service. Some features may not work properly.'
        );
      } finally {
        setIsInitializing(false);
      }
    };

    initializeVapi();

    // Update call duration every second when call is active
    const interval = setInterval(() => {
      if (callStatus.isActive) {
        setCallStatus(vapiService.getCallStatus());
      }
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Load total call time from storage
  useEffect(() => {
    const loadCallTime = async () => {
      try {
        const savedTime = await require('@react-native-async-storage/async-storage').default.getItem('total_call_time');
        if (savedTime) {
          setTotalCallTime(parseInt(savedTime, 10));
        }
      } catch (error) {
        console.log('Error loading call time:', error);
      }
    };
    loadCallTime();
  }, []);

  // Start or end voice conversation with Krishna
  const toggleKrishnaCall = async () => {
    // Prevent rapid button presses
    if (isButtonDisabled) {
      console.log('Button disabled, ignoring press');
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000); // Re-enable after 2 seconds

    if (!currentUser) {
      // Auto-login as guest if not logged in
      try {
        await loginAsGuest();
      } catch (error) {
        Alert.alert('Error', 'Unable to start. Please try again.');
        setIsButtonDisabled(false);
        return;
      }
    }

    try {
      console.log('Current call status:', {
        isActive: callStatus.isActive,
        isConnecting: callStatus.isConnecting,
        isConnected: callStatus.isConnected
      });

      if (callStatus.isActive) {
        // End the current call
        console.log('Ending call with Krishna...');
        await vapiService.endCall();
      } else if (callStatus.isConnecting) {
        // Cancel connecting call
        console.log('Canceling call...');
        await vapiService.endCall();
      } else {
        // Start a new call
        console.log('Starting call with Krishna...');
        await vapiService.startKrishnaCall();
      }
    } catch (error) {
      console.error('Error with Krishna call:', error);
      setIsButtonDisabled(false);
      Alert.alert(
        'Connection Error',
        'Unable to connect to Krishna right now. Please check your internet connection and try again.'
      );
    }
  };

  // Toggle mute during call
  const toggleMute = async () => {
    try {
      const newMutedState = !isMuted;
      await vapiService.setMuted(newMutedState);
      setIsMuted(newMutedState);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  // Save total call time when call ends
  useEffect(() => {
    if (!callStatus.isActive && callStatus.callDuration > 0) {
      const updateTotalTime = async () => {
        const newTotal = totalCallTime + callStatus.callDuration;
        setTotalCallTime(newTotal);
        try {
          await require('@react-native-async-storage/async-storage').default.setItem('total_call_time', newTotal.toString());
        } catch (error) {
          console.log('Error saving call time:', error);
        }
      };
      updateTotalTime();
    }
  }, [callStatus.isActive]);

  // Navigate to different sections
  const continueLearning = () => {
    navigation.navigate('Chapters' as never);
  };

  const openCallOptions = async () => {
    Alert.alert(
      'Krishna Call Options',
      'Voice calling options',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Status',
          onPress: async () => {
            const status = vapiService.getCallStatus();
            const statusInfo = {
              isConnected: status.isConnected,
              isActive: status.isActive,
              callDuration: status.isActive ? `${status.callDuration}s` : 'N/A',
              totalCallTime: `${Math.floor(totalCallTime / 60)}m ${totalCallTime % 60}s`,
              error: status.error || 'None'
            };
            console.log('=== VOICE CALL STATUS ===');
            console.log('Vapi service ready:', vapiService.isReady());
            console.log('Status:', status);
            console.log('========================');
            Alert.alert('Voice Call Status', JSON.stringify(statusInfo, null, 2));
          }
        },
        {
          text: 'Reset Call History',
          onPress: async () => {
            try {
              await require('@react-native-async-storage/async-storage').default.removeItem('total_call_time');
              setTotalCallTime(0);
              Alert.alert('Success', 'Call history has been reset.');
            } catch (error) {
              console.log('Error resetting call history:', error);
              Alert.alert('Error', 'Failed to reset call history.');
            }
          }
        },
        { 
          text: 'Go to Stories', 
          onPress: () => {
            navigation.navigate('Stories' as never);
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
        {/* Giant Call Button with Call Duration Ring */}
        <View style={styles.playContainer}>
          {(callStatus.isActive || totalCallTime > 0) && (
            <View style={styles.progressRing}>
              <View style={[styles.progressArc, { 
                transform: [{ rotate: `${Math.min((totalCallTime / 3600) * 360, 360) - 90}deg` }],
                borderTopColor: callStatus.isActive ? '#ff9600' : totalCallTime > 1800 ? '#ffd700' : '#58cc02'
              }]} />
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.giantPlayButton} 
            onPress={toggleKrishnaCall}
            onLongPress={openCallOptions}
            disabled={isInitializing || isButtonDisabled}
          >
            <LinearGradient
              colors={callStatus.isActive ? ['#ff4444', '#ff6b6b'] : 
                     callStatus.isConnecting ? ['#ff9600', '#ffb84d'] : 
                     totalCallTime > 1800 ? ['#ffd700', '#ffed4e'] :
                     ['#58cc02', '#89e219']}
              style={styles.playButtonCircle}
            >
              <Ionicons 
                name={isInitializing ? 'hourglass-outline' :
                     callStatus.isConnecting ? 'call-outline' : 
                     callStatus.isActive ? 'call' : 'mic'} 
                size={60} 
                color="#ffffff" 
              />
            </LinearGradient>
          </TouchableOpacity>
          
          {callStatus.isActive && (
            <Text style={styles.progressLabel}>
              {vapiService.formatCallDuration ? 
                vapiService.formatCallDuration(callStatus.callDuration) : 
                `${Math.floor(callStatus.callDuration / 60)}:${(callStatus.callDuration % 60).toString().padStart(2, '0')}`}
            </Text>
          )}
          
          {totalCallTime > 0 && !callStatus.isActive && (
            <Text style={styles.totalTimeLabel}>
              Total: {Math.floor(totalCallTime / 60)}m {totalCallTime % 60}s with Krishna
            </Text>
          )}
        </View>
        
        {/* Call Controls */}
        {callStatus.isActive && (
          <View style={styles.callControls}>
            <TouchableOpacity 
              style={[styles.controlButton, isMuted && styles.mutedButton]} 
              onPress={toggleMute}
            >
              <Ionicons 
                name={isMuted ? 'mic-off' : 'mic'} 
                size={24} 
                color={isMuted ? '#ff4444' : '#ffffff'} 
              />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Connection Status */}
        <Text style={styles.lessonStatus}>
          {isInitializing ? 'Initializing voice service...' :
           !VAPI_CONFIG.enabled ? 'Demo Mode - UI Preview Only' :
           callStatus.error ? `Error: ${callStatus.error}` :
           callStatus.isConnecting ? 'Connecting to Krishna...' :
           callStatus.isActive ? 'Speaking with Krishna 🙏' :
           totalCallTime === 0 ? 'Talk to Krishna' : 
           'Ready to talk again'}
        </Text>
        
        {!VAPI_CONFIG.enabled && (
          <Text style={styles.demoModeText}>
            Create a development build to enable voice calls
          </Text>
        )}
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
          onPress={() => navigation.navigate('Stories' as never)}
        >
          <LinearGradient
            colors={['#9333ea', '#a855f7']}
            style={styles.bottomButtonGradient}
          >
            <Ionicons name="headset" size={24} color="#ffffff" />
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
  totalTimeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#58cc02',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mutedButton: {
    backgroundColor: '#ff4444',
    shadowColor: '#ff4444',
  },
  lessonStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 30,
  },
  demoModeText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 30,
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