// The chat bubbles every conversation with Krishna is drawn from: Krishna on
// the left behind his avatar, the reader on the right behind their profile
// photo. Shared by the reflection pages, the Ask Krishna chat, and the recall
// check / capstone pages — so a conversation with Krishna looks the same
// wherever it happens. (Lived inside ChapterReflection until the checks needed
// it too; ChapterReflection re-exports it for the existing import sites.)
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { useProfilePhoto } from '../services/profilePhotoStore';

export const Bubble: React.FC<{ role: 'krishna' | 'user'; text: string }> = ({ role, text }) => {
  if (role === 'krishna') {
    return (
      <View style={styles.krishnaRow}>
        <Image source={require('../../assets/krishna-avatar.png')} style={avatarStyle} resizeMode="cover" />
        <View style={styles.krishnaBubble}>
          <Text style={styles.krishnaBubbleText}>{text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userBubbleText}>{text}</Text>
      </View>
      <UserAvatar />
    </View>
  );
};

// The reader's own face beside their words, once a profile photo is set
const userPhotoAvatarStyle = { width: 30, height: 30, borderRadius: 15 } as const;
export const UserAvatar: React.FC = () => {
  const photoUri = useProfilePhoto();
  if (photoUri) {
    return <Image source={{ uri: photoUri }} style={userPhotoAvatarStyle} />;
  }
  return (
    <View style={styles.userAvatar}>
      <Ionicons name="person" size={16} color={DharmaDesignSystem.colors.neutrals.softAsh} />
    </View>
  );
};

const { colors, spacing, borderRadius, shadows } = DharmaDesignSystem;

export const AVATAR = 36;

// Image styles inside StyleSheet.create hit union errors — define outside.
const avatarStyle = {
  width: AVATAR,
  height: AVATAR,
  borderRadius: AVATAR / 2,
} as const;

const styles = StyleSheet.create({
  krishnaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
    paddingRight: spacing.xl,
  },
  krishnaBubble: {
    flex: 1,
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderBottomLeftRadius: borderRadius.small,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    ...shadows.soft,
  },
  krishnaBubbleText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.neutrals.charcoalBlack,
    lineHeight: 24,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    paddingLeft: spacing.xl,
  },
  userAvatar: {
    width: AVATAR - 6,
    height: AVATAR - 6,
    borderRadius: (AVATAR - 6) / 2,
    backgroundColor: colors.neutrals.gentleMist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBubble: {
    flexShrink: 1,
    backgroundColor: colors.primary.deepSaffron,
    borderRadius: borderRadius.large,
    borderBottomRightRadius: borderRadius.small,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  userBubbleText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    lineHeight: 22,
  },
});

export default Bubble;
