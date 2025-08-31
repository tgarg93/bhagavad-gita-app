// Image Manifest for Bhagavad Gita Child-Friendly Edition
// Centralized management of all visual assets

export interface ImageCategory {
  chapterHeroes: { [key: number]: string };
  chapterThumbnails: { [key: number]: string };
  characters: { [key: string]: string };
  concepts: { [key: string]: string };
  vocabulary: { [key: string]: string };
  inlineStory: { [key: string]: string };
  backgrounds: { [key: string]: string };
}

// Scripture cover images
export const scriptureCovers = {
  bhagavadGita: '/assets/images/covers/bhagavad-gita-cover.png', // Traditional Bhagavad Gita artwork
  ramayana: '/assets/images/covers/ramayana-cover.png',
  mahabharata: '/images/covers/mahabharata-cover.jpg',
  upanishads: '/images/covers/upanishads-cover.jpg'
};

// Main image manifest with placeholder paths
export const imageManifest: ImageCategory = {
  // Chapter hero images (main illustrations for each chapter)
  chapterHeroes: {
    1: '/assets/images/chapters/chapter-1-battlefield.png',  // Battle of Hastinapura - authentic traditional artwork
    2: '/images/chapters/chapter-2-hero.jpg',  // Krishna teaching about souls
    3: '/images/chapters/chapter-3-hero.jpg',  // People helping each other
    4: '/images/chapters/chapter-4-hero.jpg',  // Krishna's divine forms
    5: '/images/chapters/chapter-5-hero.jpg',  // Peaceful meditation scene
    6: '/images/chapters/chapter-6-hero.jpg',  // Yoga and meditation
    7: '/images/chapters/chapter-7-hero.jpg',  // Krishna in nature
    8: '/images/chapters/chapter-8-hero.jpg',  // Cosmic consciousness
    9: '/images/chapters/chapter-9-hero.jpg',  // Divine love and devotion
    10: '/images/chapters/chapter-10-hero.jpg', // Krishna's glories
    11: '/images/chapters/chapter-11-hero.jpg', // Universal form (gentle version)
    12: '/images/chapters/chapter-12-hero.jpg', // Devotional practices
    13: '/images/chapters/chapter-13-hero.jpg', // Knowledge and field
    14: '/images/chapters/chapter-14-hero.jpg', // Three qualities
    15: '/images/chapters/chapter-15-hero.jpg', // Tree of life
    16: '/images/chapters/chapter-16-hero.jpg', // Good vs. difficult qualities
    17: '/images/chapters/chapter-17-hero.jpg', // Faith and worship
    18: '/images/chapters/chapter-18-hero.jpg'  // Surrender and conclusion
  },

  // Chapter thumbnail icons
  chapterThumbnails: {
    1: '/images/chapters/chapter-1-thumb.jpg',
    2: '/images/chapters/chapter-2-thumb.jpg',
    3: '/images/chapters/chapter-3-thumb.jpg',
    4: '/images/chapters/chapter-4-thumb.jpg',
    5: '/images/chapters/chapter-5-thumb.jpg',
    6: '/images/chapters/chapter-6-thumb.jpg',
    7: '/images/chapters/chapter-7-thumb.jpg',
    8: '/images/chapters/chapter-8-thumb.jpg',
    9: '/images/chapters/chapter-9-thumb.jpg',
    10: '/images/chapters/chapter-10-thumb.jpg',
    11: '/images/chapters/chapter-11-thumb.jpg',
    12: '/images/chapters/chapter-12-thumb.jpg',
    13: '/images/chapters/chapter-13-thumb.jpg',
    14: '/images/chapters/chapter-14-thumb.jpg',
    15: '/images/chapters/chapter-15-thumb.jpg',
    16: '/images/chapters/chapter-16-thumb.jpg',
    17: '/images/chapters/chapter-17-thumb.jpg',
    18: '/images/chapters/chapter-18-thumb.jpg'
  },

  // Character artwork
  characters: {
    'krishna-teacher': '/images/characters/krishna-teacher.jpg',
    'krishna-charioteer': '/images/characters/krishna-charioteer.jpg',
    'krishna-divine': '/images/characters/krishna-divine.jpg',
    'krishna-child-friendly': '/images/characters/krishna-child-friendly.jpg',
    'arjuna-worried': '/images/characters/arjuna-worried.jpg',
    'arjuna-learning': '/images/characters/arjuna-learning.jpg',
    'arjuna-confident': '/images/characters/arjuna-confident.jpg',
    'arjuna-child-friendly': '/images/characters/arjuna-child-friendly.jpg',
    'sanjaya-storyteller': '/images/characters/sanjaya-storyteller.jpg',
    'dhritarashtra-listening': '/images/characters/dhritarashtra-listening.jpg'
  },

  // Abstract concept illustrations
  concepts: {
    'soul-in-body': '/images/concepts/soul-in-body.jpg',
    'eternal-flame': '/images/concepts/eternal-flame.jpg',
    'changing-clothes': '/images/concepts/changing-clothes.jpg',
    'dharma-path': '/images/concepts/dharma-path.jpg',
    'karma-circle': '/images/concepts/karma-circle.jpg',
    'selfless-service': '/images/concepts/selfless-service.jpg',
    'meditation-peace': '/images/concepts/meditation-peace.jpg',
    'divine-love': '/images/concepts/divine-love.jpg',
    'wisdom-tree': '/images/concepts/wisdom-tree.jpg',
    'surrender-trust': '/images/concepts/surrender-trust.jpg',
    'family-conflict': '/images/concepts/family-conflict.jpg',
    'moral-dilemma': '/images/concepts/moral-dilemma.jpg',
    'inner-light': '/images/concepts/inner-light.jpg',
    'good-choices': '/images/concepts/good-choices.jpg'
  },

  // Vocabulary illustration
  vocabulary: {
    'dharma-scale': '/images/vocabulary/dharma-scale.jpg',
    'warrior-shield': '/images/vocabulary/warrior-shield.jpg',
    'soul-light': '/images/vocabulary/soul-light.jpg',
    'eternal-stars': '/images/vocabulary/eternal-stars.jpg',
    'wisdom-owl': '/images/vocabulary/wisdom-owl.jpg',
    'karma-circle': '/images/vocabulary/karma-circle.jpg',
    'service-hands': '/images/vocabulary/service-hands.jpg',
    'devotion-heart': '/images/vocabulary/devotion-heart.jpg',
    'meditation-lotus': '/images/vocabulary/meditation-lotus.jpg',
    'knowledge-book': '/images/vocabulary/knowledge-book.jpg',
    'surrender-dove': '/images/vocabulary/surrender-dove.jpg'
  },

  // Inline story illustrations
  inlineStory: {
    'battlefield-scene': '/images/story/battlefield-scene.jpg',
    'chariot-conversation': '/images/story/chariot-conversation.jpg',
    'soul-changing-bodies': '/images/story/soul-changing-bodies.jpg',
    'helping-others': '/images/story/helping-others.jpg',
    'krishna-teaching': '/images/story/krishna-teaching.jpg',
    'arjuna-understanding': '/images/story/arjuna-understanding.jpg',
    'cosmic-vision-gentle': '/images/story/cosmic-vision-gentle.jpg',
    'devotional-singing': '/images/story/devotional-singing.jpg',
    'meditation-under-tree': '/images/story/meditation-under-tree.jpg',
    'family-harmony': '/images/story/family-harmony.jpg',
    'children-playing': '/images/story/children-playing.jpg',
    'sharing-love': '/images/story/sharing-love.jpg'
  },

  // Background patterns and gradients
  backgrounds: {
    'cream-texture': '/images/backgrounds/cream-texture.jpg',
    'lotus-pattern': '/images/backgrounds/lotus-pattern.jpg',
    'mandala-gentle': '/images/backgrounds/mandala-gentle.jpg',
    'sky-clouds': '/images/backgrounds/sky-clouds.jpg',
    'tree-silhouette': '/images/backgrounds/tree-silhouette.jpg',
    'stars-night': '/images/backgrounds/stars-night.jpg',
    'sunrise-golden': '/images/backgrounds/sunrise-golden.jpg',
    'peacock-feather': '/images/backgrounds/peacock-feather.jpg'
  }
};

// Helper functions to get images
export const getChapterHeroImage = (chapterNumber: number): string => {
  return imageManifest.chapterHeroes[chapterNumber] || '/images/default/chapter-hero.jpg';
};

export const getChapterThumbnail = (chapterNumber: number): string => {
  return imageManifest.chapterThumbnails[chapterNumber] || '/images/default/chapter-thumb.jpg';
};

export const getCharacterImage = (characterId: string): string => {
  return imageManifest.characters[characterId] || '/images/default/character.jpg';
};

export const getConceptImage = (conceptId: string): string => {
  return imageManifest.concepts[conceptId] || '/images/default/concept.jpg';
};

export const getVocabularyImage = (wordId: string): string => {
  return imageManifest.vocabulary[wordId] || '/images/default/vocabulary.jpg';
};

export const getStoryImage = (storyId: string): string => {
  return imageManifest.inlineStory[storyId] || '/images/default/story.jpg';
};

export const getBackgroundImage = (backgroundId: string): string => {
  return imageManifest.backgrounds[backgroundId] || '/images/default/background.jpg';
};

// Image preloading for performance
export const getPreloadImages = (): string[] => {
  const essentialImages: string[] = [];
  
  // Preload first 3 chapter heroes
  for (let i = 1; i <= 3; i++) {
    essentialImages.push(getChapterHeroImage(i));
    essentialImages.push(getChapterThumbnail(i));
  }
  
  // Preload main character images
  essentialImages.push(
    getCharacterImage('krishna-teacher'),
    getCharacterImage('arjuna-worried'),
    getCharacterImage('krishna-child-friendly'),
    getCharacterImage('arjuna-child-friendly')
  );
  
  // Preload common concept images
  essentialImages.push(
    getConceptImage('soul-in-body'),
    getConceptImage('dharma-path'),
    getConceptImage('inner-light')
  );
  
  return essentialImages;
};

// Helper function to get scripture cover images
export const getScriptureCover = (scriptureId: string): string => {
  switch (scriptureId) {
    case 'bhagavad-gita':
      return scriptureCovers.bhagavadGita;
    case 'ramayana':
      return scriptureCovers.ramayana;
    case 'mahabharata':
      return scriptureCovers.mahabharata;
    case 'upanishads':
      return scriptureCovers.upanishads;
    default:
      return '/images/default/scripture-cover.jpg';
  }
};

export default imageManifest;