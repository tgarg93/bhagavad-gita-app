// Dharma App Color Palette - Hindu-inspired colors
// Based on traditional Hindu spiritual and cultural symbolism

export const DharmaColors = {
  // Primary Colors - Saffron (Sacred and Spiritual)
  primary: {
    50: '#fff7ed',   // Very light saffron
    100: '#ffedd5',  // Light saffron
    200: '#fed7aa',  // Soft saffron
    300: '#fdba74',  // Medium saffron
    400: '#fb923c',  // Vibrant saffron
    500: '#f97316',  // Primary saffron
    600: '#ea580c',  // Deep saffron
    700: '#c2410c',  // Dark saffron
    800: '#9a3412',  // Very dark saffron
    900: '#7c2d12',  // Deepest saffron
  },

  // Secondary Colors - Deep Blue (Divine Wisdom)
  secondary: {
    50: '#eff6ff',   // Very light blue
    100: '#dbeafe',  // Light blue
    200: '#bfdbfe',  // Soft blue
    300: '#93c5fd',  // Medium blue
    400: '#60a5fa',  // Vibrant blue
    500: '#3b82f6',  // Primary blue
    600: '#2563eb',  // Deep blue (Krishna's color)
    700: '#1d4ed8',  // Dark blue
    800: '#1e40af',  // Very dark blue
    900: '#1e3a8a',  // Deepest blue
  },

  // Accent Colors - Gold (Prosperity and Divinity)
  accent: {
    50: '#fefce8',   // Very light gold
    100: '#fef9c3',  // Light gold
    200: '#fef08a',  // Soft gold
    300: '#fde047',  // Medium gold
    400: '#facc15',  // Vibrant gold
    500: '#eab308',  // Primary gold
    600: '#ca8a04',  // Deep gold
    700: '#a16207',  // Dark gold
    800: '#854d0e',  // Very dark gold
    900: '#713f12',  // Deepest gold
  },

  // Sacred Colors
  sacred: {
    lotus: '#fda4af',      // Lotus pink (Divine beauty)
    tulsi: '#22c55e',      // Tulsi green (Sacred plant)
    sindoor: '#dc2626',    // Sindoor red (Auspicious)
    turmeric: '#fbbf24',   // Turmeric yellow (Purification)
    sandalwood: '#d4a574', // Sandalwood beige (Sacred wood)
    ivory: '#faf7f2',      // Temple ivory (Purity)
  },

  // Nature Colors (Elements)
  nature: {
    earth: '#a16207',      // Earth brown
    water: '#0ea5e9',      // Water blue
    fire: '#f97316',       // Fire orange
    air: '#e5e7eb',        // Air light gray
    space: '#1e3a8a',      // Space deep blue
  },

  // UI Colors - Dark Mode
  background: {
    primary: '#0a0a0a',    // Very dark background
    secondary: '#1a1a1a',  // Dark gray
    tertiary: '#2a2a2a',   // Medium dark gray
    paper: '#151515',      // Paper dark
    overlay: 'rgba(0, 0, 0, 0.8)', // Modal overlay
  },

  text: {
    primary: '#ffffff',    // White text
    secondary: '#a1a1aa',  // Light gray
    tertiary: '#71717a',   // Medium gray
    muted: '#52525b',      // Dark gray
    inverse: '#000000',    // Black text
    link: '#60a5fa',       // Light blue
  },

  // Semantic Colors
  semantic: {
    success: '#16a34a',    // Success green
    warning: '#f59e0b',    // Warning amber
    error: '#dc2626',      // Error red
    info: '#0ea5e9',       // Info blue
  },

  // Gradient Combinations
  gradients: {
    sunrise: ['#f97316', '#fbbf24'],      // Saffron to gold
    divine: ['#2563eb', '#7c3aed'],       // Blue to purple
    prosperity: ['#eab308', '#f97316'],   // Gold to saffron
    peace: ['#22c55e', '#0ea5e9'],        // Green to blue
    wisdom: ['#1e3a8a', '#2563eb'],       // Deep to medium blue
    celebration: ['#dc2626', '#f97316'],  // Red to saffron
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

// Navigation Colors (for different sections)
export const NavigationColors = {
  landing: DharmaColors.gradients.sunrise,        // Home/Landing
  scriptures: DharmaColors.gradients.wisdom,      // Scriptures
  festivals: DharmaColors.gradients.celebration,  // Festival Calendar
  askKrishna: DharmaColors.gradients.divine,      // Ask Krishna (Chat)
};

export default DharmaColors;