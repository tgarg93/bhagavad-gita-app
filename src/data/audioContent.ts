// Audio and Multimedia Content for Child-Friendly Bhagavad Gita

export interface AudioTrack {
  id: string;
  title: string;
  url: string;
  duration: string;
  size?: string;           // File size for download info
  narrator: string;
  language: 'en' | 'hi' | 'mixed';
  ageGroup: 'child' | 'adult' | 'family';
  type: 'audiobook' | 'podcast' | 'music' | 'meditation';
}

export interface PodcastEpisode {
  id: string;
  title: string;
  url: string;
  duration: string;
  description: string;
  hosts: string[];
  thumbnailImage: string;
  transcript?: string;
  season?: number;
  episode?: number;
  ageRating: string;       // 'All Ages', '8+', 'Family', etc.
}

// Audiobook content for all 18 chapters
export const audiobookContent: AudioTrack[] = [
  {
    id: 'audiobook-ch1',
    title: 'Chapter 1: Arjuna\'s Big Worry',
    url: '/audio/children/chapter-1-full.mp3',
    duration: '15:32',
    size: '22 MB',
    narrator: 'Maya Patel',
    language: 'en',
    ageGroup: 'child',
    type: 'audiobook'
  },
  {
    id: 'audiobook-ch2',
    title: 'Chapter 2: The Secret About Souls',
    url: '/audio/children/chapter-2-full.mp3',
    duration: '18:45',
    size: '27 MB',
    narrator: 'Ravi Storyteller',
    language: 'en',
    ageGroup: 'child',
    type: 'audiobook'
  },
  {
    id: 'audiobook-ch3',
    title: 'Chapter 3: How to Do Good Things',
    url: '/audio/children/chapter-3-full.mp3',
    duration: '16:22',
    size: '24 MB',
    narrator: 'Aunt Radha',
    language: 'en',
    ageGroup: 'child',
    type: 'audiobook'
  },
  // Additional chapters would continue here...
  {
    id: 'audiobook-ch4',
    title: 'Chapter 4: Krishna\'s Special Secret',
    url: '/audio/children/chapter-4-full.mp3',
    duration: '17:10',
    size: '25 MB',
    narrator: 'Uncle Gopal',
    language: 'en',
    ageGroup: 'child',
    type: 'audiobook'
  },
  {
    id: 'audiobook-ch18',
    title: 'Chapter 18: The Most Important Teaching',
    url: '/audio/children/chapter-18-full.mp3',
    duration: '22:30',
    size: '32 MB',
    narrator: 'Grandma Kamala',
    language: 'en',
    ageGroup: 'child',
    type: 'audiobook'
  }
];

// Podcast episodes for family discussions
export const podcastContent: PodcastEpisode[] = [
  {
    id: 'podcast-ch1',
    title: 'When Good People Feel Confused',
    url: '/audio/podcast/chapter-1-discussion.mp3',
    duration: '20:15',
    description: 'Dr. Ravi and Ms. Priya discuss why even brave people sometimes feel scared and confused, and what we can do when facing difficult choices.',
    hosts: ['Dr. Ravi Sharma', 'Ms. Priya Children\'s Author'],
    thumbnailImage: '/images/podcast/chapter-1-thumb.jpg',
    ageRating: 'All Ages',
    season: 1,
    episode: 1
  },
  {
    id: 'podcast-ch2',
    title: 'The Amazing Secret Inside You',
    url: '/audio/podcast/chapter-2-discussion.mp3',
    duration: '24:50',
    description: 'What makes you "you"? A gentle exploration of souls, bodies, and the special light that lives inside everyone.',
    hosts: ['Dr. Maya Spiritual Teacher', 'Uncle Gopal Kid Expert'],
    thumbnailImage: '/images/podcast/chapter-2-thumb.jpg',
    ageRating: 'All Ages',
    season: 1,
    episode: 2
  },
  {
    id: 'podcast-ch3',
    title: 'How Kids Can Be Everyday Heroes',
    url: '/audio/podcast/chapter-3-discussion.mp3',
    duration: '21:30',
    description: 'Discovering how children can help others and make the world better through simple acts of kindness.',
    hosts: ['Teacher Arjun', 'Ms. Kamala Service Expert'],
    thumbnailImage: '/images/podcast/chapter-3-thumb.jpg',
    ageRating: 'All Ages',
    season: 1,
    episode: 3
  }
];

// Meditation and music tracks for peaceful listening
export const meditationContent: AudioTrack[] = [
  {
    id: 'meditation-peace',
    title: 'Finding Peace Like Arjuna',
    url: '/audio/meditation/inner-peace.mp3',
    duration: '10:00',
    narrator: 'Peaceful Voice',
    language: 'en',
    ageGroup: 'family',
    type: 'meditation'
  },
  {
    id: 'meditation-kindness',
    title: 'Growing Kindness in Your Heart',
    url: '/audio/meditation/loving-kindness.mp3',
    duration: '12:30',
    narrator: 'Gentle Guide',
    language: 'en',
    ageGroup: 'child',
    type: 'meditation'
  },
  {
    id: 'music-krishna-songs',
    title: 'Krishna\'s Happy Songs for Children',
    url: '/audio/music/krishna-children-songs.mp3',
    duration: '25:45',
    narrator: 'Children\'s Choir',
    language: 'mixed',
    ageGroup: 'child',
    type: 'music'
  }
];

// Voice narrators information
export const narratorsInfo = {
  'Maya Patel': {
    bio: 'Award-winning children\'s audiobook narrator with over 200 books recorded',
    specialty: 'Emotional storytelling for young listeners',
    languages: ['English', 'Hindi'],
    image: '/images/narrators/maya-patel.jpg'
  },
  'Ravi Storyteller': {
    bio: 'Traditional storyteller who brings ancient wisdom to life for modern children',
    specialty: 'Making complex concepts simple and engaging',
    languages: ['English', 'Hindi', 'Sanskrit'],
    image: '/images/narrators/ravi-storyteller.jpg'
  },
  'Aunt Radha': {
    bio: 'Beloved teacher and children\'s content creator',
    specialty: 'Gentle guidance and practical wisdom',
    languages: ['English'],
    image: '/images/narrators/aunt-radha.jpg'
  }
};

// Helper functions
export const getAudiobook = (chapterNumber: number): AudioTrack | undefined => {
  return audiobookContent.find(track => 
    track.id === `audiobook-ch${chapterNumber}`
  );
};

export const getPodcast = (chapterNumber: number): PodcastEpisode | undefined => {
  return podcastContent.find(episode => 
    episode.id === `podcast-ch${chapterNumber}`
  );
};

export const getAllAudiobooks = (): AudioTrack[] => {
  return audiobookContent;
};

export const getAllPodcasts = (): PodcastEpisode[] => {
  return podcastContent;
};

export const getMeditationTracks = (): AudioTrack[] => {
  return meditationContent;
};

export const getTotalAudioDuration = (): string => {
  const totalMinutes = audiobookContent.reduce((total, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    return total + minutes + (seconds / 60);
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  
  return `${hours}h ${minutes}m`;
};

export const getAudioContentByAge = (ageGroup: 'child' | 'adult' | 'family'): AudioTrack[] => {
  return [...audiobookContent, ...meditationContent].filter(
    track => track.ageGroup === ageGroup
  );
};

export default {
  audiobooks: audiobookContent,
  podcasts: podcastContent,
  meditation: meditationContent,
  narrators: narratorsInfo
};