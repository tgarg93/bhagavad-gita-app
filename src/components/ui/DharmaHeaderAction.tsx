import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../../constants/DharmaDesignSystem';

interface DharmaHeaderActionProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'subtle';
  size?: number;
  disabled?: boolean;
}

const DharmaHeaderAction: React.FC<DharmaHeaderActionProps> = ({
  iconName,
  onPress,
  variant = 'default',
  size = 20,
  disabled = false,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          ...styles.baseButton,
          backgroundColor: 'rgba(230, 81, 0, 0.12)',
          borderWidth: 1,
          borderColor: 'rgba(230, 81, 0, 0.2)',
        };
      case 'subtle':
        return {
          ...styles.baseButton,
          backgroundColor: 'rgba(117, 117, 117, 0.08)',
        };
      default:
        return styles.baseButton;
    }
  };

  const getIconColor = () => {
    if (disabled) return DharmaDesignSystem.colors.neutrals.gentleMist;
    
    switch (variant) {
      case 'primary':
        return DharmaDesignSystem.colors.primary.deepSaffron;
      case 'subtle':
        return DharmaDesignSystem.colors.neutrals.softAsh;
      default:
        return DharmaDesignSystem.colors.neutrals.charcoalBlack;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        getButtonStyle(),
        disabled && styles.disabled,
      ]}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={iconName} 
        size={size} 
        color={getIconColor()} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    padding: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  disabled: {
    opacity: DharmaDesignSystem.opacity.disabled,
  },
});

export default DharmaHeaderAction;