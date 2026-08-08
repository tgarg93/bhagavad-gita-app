import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  AccessibilityInfo,
} from 'react-native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

interface KrishnaGuideProps {
  message: string;
  size?: number; // avatar size
  children?: React.ReactNode; // optional content under the message inside the bubble
  // Reveal the message one character at a time, as if Krishna were writing it.
  // OFF by default — the Profile tab's greeting card re-renders on every focus
  // and would re-type itself on each visit, which gets irritating fast.
  typewriter?: boolean;
  onTypingDone?: () => void;
}

const CHAR_MS = 22; // ~150 chars ≈ 3.3s — a read-along pace, not a wait

// Krishna as the consistent guide across the app (onboarding, reflections,
// level-ups) — avatar + speech bubble, in the spirit of Duolingo's Duo.
const KrishnaGuide: React.FC<KrishnaGuideProps> = ({
  message,
  size = 64,
  children,
  typewriter = false,
  onTypingDone,
}) => {
  const [revealed, setRevealed] = useState(typewriter ? 0 : message.length);
  const doneRef = useRef(false);

  // Keyed on the MESSAGE, not on mount. OnboardingScreen re-renders on every
  // keystroke of the name field, so a mount-keyed effect would restart the
  // typing mid-word. The message string is stable within a step (the name
  // step's line is static, and every name-interpolated line belongs to a later
  // step), so a keystroke cannot reset this — but a step change does.
  useEffect(() => {
    doneRef.current = false;

    if (!typewriter) {
      setRevealed(message.length);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (cancelled) return;
      if (reduced) {
        setRevealed(message.length);
        doneRef.current = true;
        onTypingDone?.();
        return;
      }
      setRevealed(0);
      let i = 0;
      timer = setInterval(() => {
        i += 1;
        setRevealed(i);
        if (i >= message.length) {
          if (timer) clearInterval(timer);
          doneRef.current = true;
          onTypingDone?.();
        }
      }, CHAR_MS);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, typewriter]);

  const finishNow = () => {
    if (doneRef.current) return;
    setRevealed(message.length);
    doneRef.current = true;
    onTypingDone?.();
  };

  const typing = typewriter && revealed < message.length;

  return (
    <View style={styles.row}>
      <Image
        source={require('../../assets/krishna-avatar.png')}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
      <View style={styles.bubbleWrap}>
        <View style={styles.bubbleTail} />
        <Pressable
          style={styles.bubble}
          onPress={finishNow}
          disabled={!typing}
          accessibilityRole={typing ? 'button' : undefined}
          accessibilityLabel={typing ? 'Show the rest' : undefined}
        >
          {typewriter ? (
            // One Text lays out the WHOLE message; the not-yet-revealed tail is
            // just colored transparent. Because it's a single text block, the
            // bubble reserves its final height and wraps identically as it fills
            // — no second copy to line up. The earlier approach stacked an
            // invisible full copy under an absolutely-positioned revealed slice;
            // on Android nested-Text opacity leaked and the two layers wrapped
            // differently, drawing text over text.
            <Text style={styles.bubbleText}>
              {message.slice(0, revealed)}
              <Text style={styles.hidden}>{message.slice(revealed)}</Text>
            </Text>
          ) : (
            <Text style={styles.bubbleText}>{message}</Text>
          )}
          {children}
        </Pressable>
      </View>
    </View>
  );
};

const { colors, typography, spacing, borderRadius, shadows } = DharmaDesignSystem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  bubbleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleTail: {
    width: 0,
    height: 0,
    marginTop: spacing.lg,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.neutrals.white,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    ...shadows.soft,
  },
  bubbleText: {
    ...typography.sizes.bodyLG,
    color: colors.neutrals.charcoalBlack,
    lineHeight: 26,
  },
  hidden: {
    // Transparent (not opacity:0) so the unrevealed tail reserves layout while
    // staying invisible — reliable inside a nested Text on Android.
    color: 'transparent',
  },
});

export default KrishnaGuide;
