// Bhagavad Gita Chapter 1: The Warrior's Dilemma
// Complete story format for immersive reading experience

export interface ReadingSection {
  id: string;
  type: 'opening_verse' | 'story_section' | 'teaching_section' | 'image_break';
  title?: string;
  content: string;
  sanskrit?: {
    verse: string;
    transliteration: string;
    meaning: string;
  };
  imageUrl?: string;
  audioSyncMarkers?: number[]; // For future audio highlighting
  deepLinkId?: string; // For future deep linking
}

export interface ChapterContent {
  id: string;
  number: 1;
  title: {
    main: string;
    subtitle: string;
  };
  readingTime: string;
  coverImage: string;
  sections: ReadingSection[];
  exercises?: any[]; // For future reflection exercises
  podcastEpisode?: any; // For future podcast integration
}

export const chapter01: ChapterContent = {
  id: 'chapter-1',
  number: 1,
  title: {
    main: 'The Warrior\'s Dilemma',
    subtitle: 'Arjuna\'s Crisis of Faith'
  },
  readingTime: '12 min read',
  coverImage: '/assets/images/bhagavadGita/chapters/01/cover.jpg',
  sections: [
    {
      id: 'battlefield-image',
      type: 'image_break',
      imageUrl: '/assets/images/bhagavadGita/chapters/01/battlefield-armies.jpg',
      content: 'Vast battlefield scene in Madhubani style, two armies with colorful banners, sense of epic tension and anticipation'
    },
    {
      id: 'opening-verse',
      type: 'opening_verse',
      title: 'Opening Verse',
      content: 'On the sacred field where right and wrong would be decided, two armies gathered, ready for war. This place, Kurukshetra, wasn\'t just any battlefield - it was a dharma-kshetra (field of righteousness) where the fate of dharma itself would be determined.',
      sanskrit: {
        verse: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः',
        transliteration: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ',
        meaning: 'On the field of dharma, on the field of the Kurus, assembled, desiring to fight'
      },
      deepLinkId: 'opening-verse'
    },
    {
      id: 'battlefield-description',
      type: 'image_break',
      imageUrl: '/assets/images/bhagavadGita/chapters/01/two-armies-formation.jpg',
      content: 'Wide battlefield with two armies in formation, ornate banners and elephants, sense of magnitude and destiny'
    },
    {
      id: 'story-begins',
      type: 'story_section',
      title: 'The Story Begins',
      content: 'Arjuna, the warrior alive, stands between two massive armies ready for battle. But when he looks across the field, he sees his teachers, cousins, and friends on the other side. His heart breaks.',
      deepLinkId: 'story-begins'
    },
    {
      id: 'arjunas-despair',
      type: 'teaching_section',
      title: 'Arjuna\'s Despair',
      content: 'When Arjuna spoke, his words revealed the deepest human struggle - what happens when our dharma (righteous duty) conflicts with our emotions and love for others.\n\n"How can I fight people I love?" he asks Krishna. "What kind of victory is worth hurting your own family?"',
      sanskrit: {
        verse: 'अर्जुन उवाच',
        transliteration: 'arjuna uvāca',
        meaning: 'Arjuna said'
      },
      deepLinkId: 'arjunas-despair'
    },
    {
      id: 'arjuna-anguish-image',
      type: 'image_break',
      imageUrl: '/assets/images/bhagavadGita/chapters/01/arjuna-anguished.jpg',
      content: 'Close-up of Arjuna\'s anguished face, bow slipping from trembling hands, internal conflict visible in his expression'
    },
    {
      id: 'warrior-breakdown',
      type: 'story_section',
      content: 'Overwhelmed with doubt and confusion, this mighty warrior sits down in his chariot, unable to fight. This is called vishada (deep despair) - when we\'re so confused about right and wrong that we can\'t act at all. Sometimes even heroes feel lost and need guidance.',
      deepLinkId: 'warrior-breakdown'
    }
  ]
};