// Centralized Festival Image Mapping for Dharma App
// This file maps festival IDs to their corresponding hero images

export const FestivalImageMapping = {
  // Major festivals with dedicated cover images
  'diwali-2025': require('../../assets/images/covers/diwali-cover.png'),
  'ram-navami-2025': require('../../assets/images/covers/ramayana-cover.png'),
  'janmashtami-2025': require('../../assets/images/covers/krishna-cover.png'),
  'navratri-2025': require('../../assets/images/covers/navratri-cover.png'),

  // Festivals using general dharma cover
  'makar-sankranti-2025': require('../../assets/images/covers/dharma-cover.png'),
  'basant-panchami-2025': require('../../assets/images/covers/dharma-cover.png'),
  'maha-shivratri-2025': require('../../assets/images/covers/dharma-cover.png'),
  'holi-2025': require('../../assets/images/covers/dharma-cover.png'),
  'ganesh-chaturthi-2025': require('../../assets/images/covers/dharma-cover.png'),

  // Default fallback image
  default: require('../../assets/images/covers/dharma-cover.png'),
};

// Helper function to get festival hero image
export const getFestivalHeroImage = (festivalId: string) => {
  return FestivalImageMapping[festivalId as keyof typeof FestivalImageMapping] || FestivalImageMapping.default;
};

// Festival image categories for future organization
export const FestivalImageCategories = {
  deity_specific: [
    'janmashtami-2025', // Krishna
    'ram-navami-2025',  // Rama
    'ganesh-chaturthi-2025', // Ganesha
    'maha-shivratri-2025', // Shiva
    'navratri-2025', // Goddess Durga
  ],
  seasonal: [
    'makar-sankranti-2025', // Winter solstice/harvest
    'basant-panchami-2025', // Spring
    'holi-2025', // Spring colors
  ],
  cultural: [
    'diwali-2025', // Lights festival
  ],
} as const;

export default FestivalImageMapping;