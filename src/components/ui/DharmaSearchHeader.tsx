import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../../constants/DharmaDesignSystem';

interface DharmaSearchHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  rightActions?: React.ReactNode;
}

const DharmaSearchHeader: React.FC<DharmaSearchHeaderProps> = ({
  title,
  subtitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  rightActions,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
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
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons 
            name="search" 
            size={20} 
            color={DharmaDesignSystem.colors.neutrals.softAsh} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder}
            placeholderTextColor={DharmaDesignSystem.colors.neutrals.softAsh}
            value={searchValue}
            onChangeText={onSearchChange}
            returnKeyType="search"
          />
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
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
  searchContainer: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DharmaDesignSystem.colors.neutrals.white,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.12)',
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    shadowColor: 'rgba(230, 81, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: DharmaDesignSystem.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    height: 24,
  },
});

export default DharmaSearchHeader;