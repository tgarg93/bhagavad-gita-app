import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { AudioNarrationService, NarrationState, NarrationCallbacks } from '../services/audioNarrationService';

interface AudioControlsProps {
  content: any[];
  onTextHighlight?: (segmentId: string, segmentIndex: number) => void;
  onScrollToSegment?: (segmentIndex: number) => void;
  onPlaybackFinished?: () => void;
  compact?: boolean;
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const AudioControls: React.FC<AudioControlsProps> = ({
  content,
  onTextHighlight,
  onScrollToSegment,
  onPlaybackFinished,
  compact = false
}) => {
  const [narrationState, setNarrationState] = useState<NarrationState>({
    isPlaying: false,
    isPaused: false,
    currentSegmentIndex: 0,
    currentSegmentId: null,
    progress: 0,
    speed: 1.0,
    totalSegments: 0,
    elapsedMs: 0,
    totalMs: 0,
  });

  const [pulseAnim] = useState(new Animated.Value(1));
  const progressBarWidth = useRef(0);
  const audioService = AudioNarrationService.getInstance();

  // Stop narration only when the controls unmount (leaving the screen) — this must
  // NOT re-run on prop changes or it kills speech mid-utterance on every re-render
  useEffect(() => {
    return () => {
      audioService.cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1s ticker keeps this instance in sync with the singleton service even when
  // playback was started from another AudioControls instance, and animates the
  // elapsed-time display within long segments
  useEffect(() => {
    const interval = setInterval(() => {
      setNarrationState(audioService.getCurrentState());
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePlayPause = async () => {
    try {
      if (narrationState.isPlaying) {
        await audioService.pauseNarration();
        stopPulseAnimation();
      } else if (narrationState.isPaused) {
        await audioService.resumeNarration();
        startPulseAnimation();
      } else {
        const callbacks: NarrationCallbacks = {
          onSegmentStart: (segmentId: string, segmentIndex: number) => {
            onTextHighlight?.(segmentId, segmentIndex);
            onScrollToSegment?.(segmentIndex);
            setNarrationState(audioService.getCurrentState());
          },
          onSegmentEnd: (segmentId: string) => {
            setNarrationState(audioService.getCurrentState());
          },
          onProgressUpdate: (progress: number) => {
            setNarrationState(audioService.getCurrentState());
          },
          onPlaybackComplete: () => {
            setNarrationState(audioService.getCurrentState());
            stopPulseAnimation();
            onPlaybackFinished?.();
          },
          onError: (error: string) => {
            console.warn('Audio error:', error);
            setNarrationState(audioService.getCurrentState());
          }
        };

        await audioService.startNarration(content, callbacks);
        startPulseAnimation();
      }
      setNarrationState(audioService.getCurrentState());
    } catch (error) {
      console.log('Error handling play/pause:', error);
    }
  };

  const handleStop = async () => {
    try {
      await audioService.stopNarration();
      setNarrationState(audioService.getCurrentState());
      stopPulseAnimation();
      onPlaybackFinished?.();
    } catch (error) {
      console.log('Error stopping narration:', error);
    }
  };

  const handleSpeedChange = async () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const currentSpeedIndex = speeds.indexOf(narrationState.speed);
    const nextSpeed = speeds[(currentSpeedIndex + 1) % speeds.length];

    try {
      await audioService.setSpeed(nextSpeed);
      setNarrationState(audioService.getCurrentState());
    } catch (error) {
      console.log('Error changing speed:', error);
    }
  };

  const handleSkipForward = async () => {
    try {
      await audioService.skipForward();
      setNarrationState(audioService.getCurrentState());
    } catch (error) {
      console.log('Error skipping forward:', error);
    }
  };

  const handleSkipBackward = async () => {
    try {
      await audioService.skipBackward();
      setNarrationState(audioService.getCurrentState());
    } catch (error) {
      console.log('Error skipping backward:', error);
    }
  };

  const handleSeek = async (locationX: number) => {
    if (progressBarWidth.current <= 0) return;
    try {
      await audioService.seekToProgress(locationX / progressBarWidth.current);
      setNarrationState(audioService.getCurrentState());
    } catch (error) {
      console.log('Error seeking:', error);
    }
  };

  if (compact) {
    return (
      <TouchableOpacity onPress={handlePlayPause} style={styles.compactButton}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Ionicons
            name={narrationState.isPlaying ? "pause" : "play"}
            size={20}
            color={DharmaDesignSystem.colors.primary.deepSaffron}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  // Docked player bar: hidden until narration is playing or paused
  if (!narrationState.isPlaying && !narrationState.isPaused) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Seekable progress bar with times */}
      <Pressable
        onLayout={e => { progressBarWidth.current = e.nativeEvent.layout.width; }}
        onPress={e => handleSeek(e.nativeEvent.locationX)}
        style={styles.progressTouchArea}
        hitSlop={{ top: 8, bottom: 8 }}
      >
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(100, Math.max(0, narrationState.progress))}%` }
            ]}
          />
        </View>
      </Pressable>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(narrationState.elapsedMs)}</Text>
        <Text style={styles.timeText}>{formatTime(narrationState.totalMs)}</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity onPress={handleSpeedChange} style={styles.speedButton}>
          <Text style={styles.speedText}>{narrationState.speed}x</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkipBackward} style={styles.controlButton}>
          <Ionicons
            name="play-skip-back"
            size={22}
            color={DharmaDesignSystem.colors.primary.deepSaffron}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.mainPlayButton}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Ionicons
              name={narrationState.isPlaying ? "pause" : "play"}
              size={28}
              color={DharmaDesignSystem.colors.neutrals.white}
              style={narrationState.isPlaying ? undefined : styles.playIconNudge}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkipForward} style={styles.controlButton}>
          <Ionicons
            name="play-skip-forward"
            size={22}
            color={DharmaDesignSystem.colors.primary.deepSaffron}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStop} style={styles.controlButton}>
          <Ionicons
            name="stop"
            size={22}
            color={DharmaDesignSystem.colors.sacred.warningRed}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingTop: DharmaDesignSystem.spacing.md,
    paddingBottom: DharmaDesignSystem.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.15)',
    ...DharmaDesignSystem.shadows.lifted,
  },
  compactButton: {
    padding: DharmaDesignSystem.spacing.xs,
    borderRadius: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(230, 81, 0, 0.1)',
  },
  progressTouchArea: {
    paddingVertical: 4,
  },
  progressBar: {
    height: 5,
    backgroundColor: DharmaDesignSystem.colors.neutrals.gentleMist,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  timeText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontVariant: ['tabular-nums'],
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DharmaDesignSystem.spacing.lg,
  },
  controlButton: {
    padding: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.circle,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
  },
  mainPlayButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: DharmaDesignSystem.colors.primary.deepSaffron,
    justifyContent: 'center',
    alignItems: 'center',
    ...DharmaDesignSystem.shadows.button,
  },
  playIconNudge: {
    marginLeft: 3,
  },
  speedButton: {
    paddingHorizontal: DharmaDesignSystem.spacing.sm,
    paddingVertical: DharmaDesignSystem.spacing.xs,
    borderRadius: DharmaDesignSystem.borderRadius.small,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    minWidth: 48,
    alignItems: 'center',
  },
  speedText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
  },
});

export default AudioControls;
