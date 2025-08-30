// Dharma App Design System
// Ancient wisdom meets modern design

export const DharmaDesignSystem = {
  // 🌈 Color Palette
  colors: {
    // Primary Colors
    primary: {
      saffronSunset: '#FF6B35',     // Primary CTA, highlights
      turmericGold: '#F7931E',      // Secondary buttons, accents
      marigoldWarm: '#FFB627',      // Success states, celebrations
    },
    
    // Sacred Colors (Cultural Touches)
    sacred: {
      krishnaBlue: '#4A90E2',       // Trust, wisdom sections
      lotusPink: '#E91E63',         // Love, devotion elements
      sacredVermillion: '#DC143C',  // Important notifications, festivals
    },
    
    // Neutrals (Modern Foundation)
    neutrals: {
      creamCanvas: '#FFF8F0',       // Primary background
      warmIvory: '#F5F1E8',         // Card backgrounds
      charcoalInk: '#2C2C2C',       // Primary text
      softAsh: '#757575',           // Secondary text
      gentleMist: '#E8E8E8',        // Borders, dividers
      white: '#FFFFFF',             // Pure white
      black: '#000000',             // Pure black
    },
    
    // Gradients
    gradients: {
      sunriseBlend: ['#FF6B35', '#F7931E'],      // Saffron to Turmeric
      twilightWisdom: ['#4A90E2', '#E91E63'],    // Krishna Blue to Lotus Pink
      goldenHour: ['#FFB627', '#FF6B35'],        // Marigold to Saffron
      creamWarmth: ['#FFF8F0', '#F5F1E8'],       // Cream Canvas to Warm Ivory
      sacredGlow: ['#DC143C', '#E91E63'],        // Vermillion to Lotus Pink
    },
    
    // Dark Mode Adaptation
    dark: {
      bgPrimary: '#1A1A1A',
      bgSecondary: '#2D2D2D',
      textPrimary: '#F5F1E8',
      accent: '#FFB627',
      surface: '#2C2C2C',
    },
    
    // Semantic Colors
    semantic: {
      success: '#22C55E',           // Success green
      warning: '#F59E0B',           // Warning amber
      error: '#EF4444',             // Error red
      info: '#3B82F6',              // Info blue
    },
  },

  // 📝 Typography System
  typography: {
    fontFamily: {
      primary: 'Poppins',          // Modern, clean, multilingual
      cultural: 'Crimson Text',    // For quotes, scripture, elegant headings
      system: '-apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Font Hierarchy
    sizes: {
      // Headers
      headingXL: { 
        fontSize: 32, 
        lineHeight: 40, 
        fontWeight: '600',
        fontFamily: 'Poppins' 
      },
      headingLG: { 
        fontSize: 24, 
        lineHeight: 32, 
        fontWeight: '600',
        fontFamily: 'Poppins' 
      },
      headingMD: { 
        fontSize: 20, 
        lineHeight: 28, 
        fontWeight: '500',
        fontFamily: 'Poppins' 
      },
      headingSM: { 
        fontSize: 16, 
        lineHeight: 24, 
        fontWeight: '500',
        fontFamily: 'Poppins' 
      },
      
      // Body Text
      bodyLG: { 
        fontSize: 18, 
        lineHeight: 28, 
        fontWeight: '400',
        fontFamily: 'Poppins' 
      },
      bodyMD: { 
        fontSize: 16, 
        lineHeight: 24, 
        fontWeight: '400',
        fontFamily: 'Poppins' 
      },
      bodySM: { 
        fontSize: 14, 
        lineHeight: 20, 
        fontWeight: '400',
        fontFamily: 'Poppins' 
      },
      
      // Cultural/Sacred Text
      sacredQuote: { 
        fontSize: 20, 
        lineHeight: 32, 
        fontWeight: '400',
        fontFamily: 'Crimson Text',
        fontStyle: 'italic' as const
      },
      sacredSmall: { 
        fontSize: 16, 
        lineHeight: 24, 
        fontWeight: '400',
        fontFamily: 'Crimson Text',
        fontStyle: 'italic' as const
      },
      
      // Interactive Elements
      buttonText: { 
        fontSize: 16, 
        lineHeight: 24, 
        fontWeight: '500',
        letterSpacing: 0.5,
        fontFamily: 'Poppins' 
      },
      navText: { 
        fontSize: 14, 
        lineHeight: 20, 
        fontWeight: '500',
        letterSpacing: 0.3,
        fontFamily: 'Poppins' 
      },
      
      // Utility
      caption: { 
        fontSize: 12, 
        lineHeight: 16, 
        fontWeight: '400',
        fontFamily: 'Poppins' 
      },
      overline: { 
        fontSize: 10, 
        lineHeight: 14, 
        fontWeight: '600',
        letterSpacing: 1.5,
        textTransform: 'uppercase' as const,
        fontFamily: 'Poppins' 
      },
    }
  },

  // 🧩 Spacing System (8px base unit)
  spacing: {
    xs: 4,    // 0.5 units
    sm: 8,    // 1 unit
    md: 16,   // 2 units
    lg: 24,   // 3 units
    xl: 32,   // 4 units
    xxl: 48,  // 6 units
    xxxl: 64, // 8 units
  },

  // 🎨 Border Radius
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xLarge: 20,
    round: 24,
    circle: 50,
  },

  // 🌟 Shadows
  shadows: {
    // Soft shadow for cards
    soft: {
      shadowColor: 'rgba(255, 107, 53, 0.08)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 4,
    },
    
    // Lifted shadow for interactive elements
    lifted: {
      shadowColor: 'rgba(255, 107, 53, 0.15)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 30,
      elevation: 8,
    },
    
    // Button shadow
    button: {
      shadowColor: 'rgba(255, 107, 53, 0.3)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 6,
    },
    
    // Cultural shadow (softer, more organic)
    cultural: {
      shadowColor: 'rgba(74, 144, 226, 0.12)',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 5,
    },
  },

  // 🎭 Cultural Elements
  patterns: {
    madhubani: {
      borderColor: '#FF6B35',
      borderWidth: 2,
      borderStyle: 'dashed' as const,
    },
    pichwai: {
      // Subtle background pattern colors
      primary: 'rgba(247, 147, 30, 0.05)',
      secondary: 'rgba(74, 144, 226, 0.05)',
    }
  },

  // 📱 Layout Constants
  layout: {
    containerPadding: 16,     // Mobile-first side margins
    cardGap: 8,               // Gap between cards
    contentMaxWidth: 400,     // Max width for readability
    touchTarget: 44,          // Minimum touch target size
    tabBarHeight: 80,         // Bottom tab bar height
    headerHeight: 60,         // Screen header height
  },

  // 🎪 Interactive States
  opacity: {
    disabled: 0.4,
    loading: 0.6,
    inactive: 0.7,
    active: 1.0,
  },
};

// 🧩 Component Style Generators
export const createButtonStyle = (variant: 'primary' | 'secondary' | 'cultural' | 'ghost' = 'primary') => {
  const baseStyle = {
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    paddingVertical: DharmaDesignSystem.spacing.md,
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: DharmaDesignSystem.layout.touchTarget,
    flexDirection: 'row' as const,
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.primary.saffronSunset,
        ...DharmaDesignSystem.shadows.button,
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: DharmaDesignSystem.colors.primary.saffronSunset,
      };
    case 'cultural':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.sacred.krishnaBlue,
        borderRadius: DharmaDesignSystem.borderRadius.small,
        ...DharmaDesignSystem.shadows.cultural,
      };
    case 'ghost':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        paddingVertical: DharmaDesignSystem.spacing.sm,
        paddingHorizontal: DharmaDesignSystem.spacing.md,
      };
    default:
      return baseStyle;
  }
};

export const createCardStyle = (variant: 'primary' | 'wisdom' | 'festival' | 'cultural' = 'primary') => {
  const baseStyle = {
    borderRadius: DharmaDesignSystem.borderRadius.large,
    padding: DharmaDesignSystem.spacing.lg,
    marginBottom: DharmaDesignSystem.spacing.md,
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.neutrals.creamCanvas,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.12)',
        ...DharmaDesignSystem.shadows.soft,
      };
    case 'wisdom':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
        borderLeftWidth: 4,
        borderLeftColor: DharmaDesignSystem.colors.primary.saffronSunset,
        borderRadius: DharmaDesignSystem.borderRadius.medium,
      };
    case 'festival':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.primary.marigoldWarm,
        borderRadius: DharmaDesignSystem.borderRadius.xLarge,
      };
    case 'cultural':
      return {
        ...baseStyle,
        backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
        borderWidth: 2,
        borderColor: DharmaDesignSystem.colors.sacred.krishnaBlue,
        ...DharmaDesignSystem.shadows.cultural,
      };
    default:
      return baseStyle;
  }
};

// Text style helpers
export const createTextStyle = (variant: keyof typeof DharmaDesignSystem.typography.sizes, color?: string) => {
  const style = DharmaDesignSystem.typography.sizes[variant];
  return {
    ...style,
    color: color || DharmaDesignSystem.colors.neutrals.charcoalInk,
  };
};

// Gradient helpers
export const createGradientColors = (gradientName: keyof typeof DharmaDesignSystem.colors.gradients) => {
  return DharmaDesignSystem.colors.gradients[gradientName];
};

export default DharmaDesignSystem;