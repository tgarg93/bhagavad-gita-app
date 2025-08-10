// Audio Configuration
// Update these URLs with your actual cloud storage links

export const AUDIO_CONFIG = {
  filename: '8_yo_version.m4a',
  
  // Cloud storage URLs (in order of preference)
  cloudSources: [
    {
      name: 'GitHub',
      // Audio file hosted on GitHub repository
      url: 'https://raw.githubusercontent.com/tgarg93/bhagavad-gita-app/main/assets/audio/8_yo_version.m4a',
      active: true, // ✅ Active - file is uploaded to GitHub
    },
    
    {
      name: 'Dropbox',
      // To use Dropbox:
      // 1. Upload file to Dropbox
      // 2. Get shareable link, replace 'dl=0' with 'dl=1' at the end
      // 3. Update URL below
      url: 'https://www.dropbox.com/s/your-share-id/8_yo_version.m4a?dl=1',
      active: false, // Set to true when you have a valid Dropbox link
    },
    
    {
      name: 'Google Drive',
      // To use Google Drive:
      // 1. Upload file to Google Drive
      // 2. Make it shareable to "Anyone with the link"
      // 3. Get the file ID from the share link
      // 4. Replace YOUR_FILE_ID below with actual file ID
      url: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID',
      active: false, // Set to true when you have a valid Google Drive file ID
    },
    
    {
      name: 'Direct URL',
      // Any direct HTTP/HTTPS link to the audio file
      url: 'https://your-server.com/path/to/8_yo_version.m4a',
      active: false, // Set to true if you have a direct URL
    }
  ],
  
  // Cache settings
  cacheDurationDays: 30, // How long to keep downloaded file
  maxRetries: 3, // How many times to retry failed downloads
};