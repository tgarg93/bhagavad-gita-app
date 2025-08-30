// Dharma App Color Palette - Ancient wisdom meets modern design
// Updated design system with culturally authentic colors

export const DharmaColors = {
  // Primary Colors - Saffron Gradient System
  primary: {
    50: '#FFF8F0',   // Cream Canvas (background)
    100: '#FFE8D1',  // Very light saffron
    200: '#FFD1A3',  // Light saffron warmth
    300: '#FFB627',  // Marigold Warm (celebrations)
    400: '#F7931E',  // Turmeric Gold (accents)
    500: '#FF6B35',  // Saffron Sunset (primary CTA)
    600: '#E55A2B',  // Deep saffron
    700: '#CC4A21',  // Darker saffron
    800: '#B33A17',  // Very dark saffron
    900: '#992A0D',  // Deepest saffron
  },

  // Secondary Colors - Sacred Blue System (Krishna Blue)
  secondary: {
    50: '#EBF3FF',   // Very light Krishna blue
    100: '#D7E7FF',  // Light Krishna blue
    200: '#B8D4FF',  // Soft Krishna blue
    300: '#8BB8FF',  // Medium Krishna blue
    400: '#6BA4F5',  // Vibrant Krishna blue
    500: '#4A90E2',  // Krishna Blue (trust, wisdom)
    600: '#3A7BD1',  // Deep Krishna blue
    700: '#2A66C0',  // Dark Krishna blue
    800: '#1A51AF',  // Very dark blue
    900: '#0A3C9E',  // Deepest blue
  },

  // Accent Colors - Lotus Pink System (Love & Devotion)
  accent: {
    50: '#FDF2F8',   // Very light lotus pink
    100: '#FCE7F3',  // Light lotus pink
    200: '#FBCFE8',  // Soft lotus pink
    300: '#F9A8D4',  // Medium lotus pink
    400: '#F472B6',  // Vibrant lotus pink
    500: '#E91E63',  // Lotus Pink (love, devotion)
    600: '#DB1A5C',  // Deep lotus pink
    700: '#BE185D',  // Dark lotus pink
    800: '#9D174D',  // Very dark pink
    900: '#831843',  // Deepest pink
  },

  // Sacred Colors (Cultural Elements)
  sacred: {
    vermillion: '#DC143C',  // Sacred Vermillion (festivals, notifications)
    krishnaBlue: '#4A90E2', // Krishna Blue (wisdom, trust)
    lotusPink: '#E91E63',   // Lotus Pink (love, devotion)
    turmericGold: '#F7931E', // Turmeric Gold (purity, prosperity)
    marigoldWarm: '#FFB627', // Marigold Warm (celebrations)
    saffronSunset: '#FF6B35', // Saffron Sunset (spiritual energy)
  },

  // Nature Colors (Elements)
  nature: {
    earth: '#a16207',      // Earth brown
    water: '#0ea5e9',      // Water blue
    fire: '#f97316',       // Fire orange
    air: '#e5e7eb',        // Air light gray
    space: '#1e3a8a',      // Space deep blue
  },

  // UI Colors - Light Mode (New Design System)
  background: {
    primary: '#FFF8F0',    // Cream Canvas (primary background)
    secondary: '#F5F1E8',  // Warm Ivory (card backgrounds)
    tertiary: '#E8E8E8',   // Gentle Mist (borders, dividers)
    paper: '#FFFFFF',      // Pure white paper
    overlay: 'rgba(44, 44, 44, 0.8)', // Dark overlay for modals
  },

  text: {
    primary: '#2C2C2C',    // Charcoal Ink (primary text)
    secondary: '#757575',  // Soft Ash (secondary text)
    tertiary: '#9CA3AF',   // Light gray (muted text)
    muted: '#D1D5DB',      // Very light gray
    inverse: '#FFFFFF',    // White text (on dark backgrounds)
    link: '#4A90E2',       // Krishna Blue for links
  },

  // Semantic Colors
  semantic: {
    success: '#16a34a',    // Success green
    warning: '#f59e0b',    // Warning amber
    error: '#dc2626',      // Error red
    info: '#0ea5e9',       // Info blue
  },

  // Cultural Gradients (New Design System)
  gradients: {
    sunriseBlend: ['#FF6B35', '#F7931E'],    // Saffron Sunset to Turmeric Gold
    twilightWisdom: ['#4A90E2', '#E91E63'],  // Krishna Blue to Lotus Pink
    goldenHour: ['#FFB627', '#FF6B35'],      // Marigold Warm to Saffron Sunset
    creamWarmth: ['#FFF8F0', '#F5F1E8'],     // Cream Canvas to Warm Ivory
    sacredGlow: ['#DC143C', '#E91E63'],      // Sacred Vermillion to Lotus Pink
    culturalBlend: ['#4A90E2', '#F7931E'],   // Krishna Blue to Turmeric Gold
  },

  // Special Effects
  effects: {
    shadow: 'rgba(0, 0, 0, 0.1)',
    glow: 'rgba(249, 115, 22, 0.3)', // Saffron glow
    highlight: 'rgba(234, 179, 8, 0.2)', // Gold highlight
    divider: '#e7e5e4',
    border: '#d6d3d1',
  },
};

// Theme Variants
export const DharmaThemes = {
  light: {
    background: DharmaColors.background.primary,
    surface: DharmaColors.background.secondary,
    primary: DharmaColors.primary[500],
    secondary: DharmaColors.secondary[600],
    accent: DharmaColors.accent[500],
    text: DharmaColors.text.primary,
    textSecondary: DharmaColors.text.secondary,
    border: DharmaColors.effects.border,
    shadow: DharmaColors.effects.shadow,
  },
  
  festival: {
    background: DharmaColors.accent[50],
    surface: DharmaColors.background.primary,
    primary: DharmaColors.accent[600],
    secondary: DharmaColors.primary[500],
    accent: DharmaColors.sacred.sindoor,
    text: DharmaColors.text.primary,
    textSecondary: DharmaColors.text.secondary,
    border: DharmaColors.accent[200],
    shadow: DharmaColors.effects.shadow,
  },
};

// Navigation Colors (Cultural Design System)
export const NavigationColors = {
  home: DharmaColors.gradients.sunriseBlend,      // Home - Saffron energy
  learn: DharmaColors.gradients.twilightWisdom,   // Learn - Krishna wisdom
  festivals: DharmaColors.gradients.goldenHour,   // Festivals - Celebration warmth
  askKrishna: DharmaColors.gradients.culturalBlend, // Ask Krishna - Cultural blend
};

export default DharmaColors;