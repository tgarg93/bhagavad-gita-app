import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../../constants/DharmaDesignSystem';

interface DharmaHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightActions?: React.ReactNode;
}

const DharmaHeader: React.FC<DharmaHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightActions,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={DharmaDesignSystem.colors.primary.deepSaffron} 
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
        
        {rightActions && (
          <View style={styles.rightActionsContainer}>
            {rightActions}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
    paddingTop: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 81, 0, 0.12)',
    shadowColor: 'rgba(230, 81, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    minHeight: 44,
  },
  backButton: {
    marginRight: DharmaDesignSystem.spacing.md,
    padding: DharmaDesignSystem.spacing.xs,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginTop: DharmaDesignSystem.spacing.xs / 2,
    textAlign: 'left',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DharmaDesignSystem.spacing.sm,
  },
});

export default DharmaHeader;