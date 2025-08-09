# 🕉️ Bhagavad Gita Mobile App

A comprehensive React Native mobile application for learning and exploring the Bhagavad Gita with interactive features, personalized progress tracking, and modern mobile UI design. **All data is stored locally on your device** for privacy and offline access.

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)
![Storage](https://img.shields.io/badge/Storage-Local%20Only-green)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)

## ✨ Features

### 🕉️ Core Learning Features
- **Daily Verse**: Get inspired with a new verse every day with reflection prompts
- **Chapter Navigation**: Explore all 18 chapters with progress tracking
- **Interactive Verses**: Sanskrit, transliteration, translations, and commentary
- **Multi-language Support**: English, Hindi, and Sanskrit text
- **Search Functionality**: Find verses by keywords, themes, or concepts
- **Bookmarks & Favorites**: Save meaningful verses for later reference

### 📱 Mobile-Optimized Experience
- **Native Mobile UI**: Designed specifically for iOS and Android
- **Responsive Design**: Optimized for all screen sizes and orientations
- **Smooth Navigation**: Bottom tab navigation with stack navigation
- **Touch Interactions**: Intuitive gestures and touch-friendly interface
- **Offline Support**: Core functionality works without internet

### 📊 Progress Tracking
- **Reading Progress**: Track chapters and verses completed
- **Daily Streak**: Maintain consistent study habits
- **Study Statistics**: Reading time, completion rates, and insights
- **Personal Notes**: Add reflections and insights to verses

### 🔐 User Management
- **Local Authentication**: Secure local account creation
- **Guest Mode**: Use app without creating account
- **Privacy First**: No data sent to external servers
- **Data Portability**: Export/import your data anytime

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript for type safety
- **Storage**: AsyncStorage (Local device storage)
- **Navigation**: React Navigation v6
- **UI Components**: Custom components with Expo Vector Icons
- **Styling**: StyleSheet with responsive design patterns
- **State Management**: React Context API
- **Data Export**: Expo File System & Sharing
- **Analytics**: Local usage tracking

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                 # Reusable UI components
├── contexts/               # React Context providers
├── data/                   # Local JSON data structures
├── navigation/             # Navigation configuration
├── screens/                # App screens/pages
├── services/               # Local storage & export services
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (Mac) or Android Studio (for Android development)

### Installation

1. **Clone and install dependencies:**
```bash
git clone [repository-url]
cd bhagavad-gita-app
npm install
```

2. **Start the development server:**
```bash
npx expo start
```

3. **Run on device/simulator:**
   - iOS: Press `i` or scan QR with Camera app
   - Android: Press `a` or scan QR with Expo Go app
   - Web: Press `w` (for testing only)

**That's it!** No external services to set up. Everything runs locally on your device.

## 📋 Available Scripts

- `npx expo start` - Start the development server
- `npx expo run:ios` - Build and run on iOS simulator
- `npx expo run:android` - Build and run on Android emulator
- `npm run build` - Create production build
- `npm run test` - Run tests (when configured)

## 📱 Building for Production

### Using Expo Application Services (EAS)

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Configure EAS:**
```bash
eas init
eas build:configure
```

3. **Build for stores:**
```bash
# Build for iOS App Store
eas build --platform ios --profile production

# Build for Google Play Store
eas build --platform android --profile production
```

### Local Development Builds

```bash
# Create development build for iOS
eas build --platform ios --profile development --local

# Create development build for Android
eas build --platform android --profile development --local
```

## 🎨 Design System

### Colors
- **Primary Orange**: `#ea580c` - Knowledge and enlightenment
- **Sacred Purple**: `#d946ef` - Spiritual wisdom
- **Background**: `#f9fafb` - Clean, readable background
- **Text**: Various shades of gray for hierarchy

### Typography
- **Headers**: Bold system fonts
- **Body**: Regular system fonts with good line height
- **Sanskrit**: Specialized fonts for authentic display

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with touch feedback
- **Navigation**: Clean tab bar with icons

## 🔧 Mobile-Specific Features

### Navigation
- **Bottom Tab Navigation**: Home, Chapters, Search, Bookmarks, Profile
- **Stack Navigation**: Chapter details, verse details, settings
- **Deep Linking**: Support for direct verse/chapter links

### Performance
- **Optimized Rendering**: Efficient list rendering for large datasets
- **Image Optimization**: Compressed assets for faster loading
- **Memory Management**: Proper cleanup of resources

### Platform Integration
- **iOS**: Native look and feel with iOS design patterns
- **Android**: Material Design principles
- **Accessibility**: Screen reader support and high contrast

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Content Management

The app uses structured JSON data for all content:

```typescript
interface Verse {
  id: string;
  chapterNumber: number;
  verseNumber: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi?: string;
  commentary: Commentary[];
  tags: string[];
  audioUrl?: string;
}
```

Content features:
- **Complete Bhagavad Gita**: All 18 chapters with key verses
- **Multiple Translations**: Sanskrit, transliteration, English, Hindi
- **Commentary System**: Multiple scholars' interpretations
- **Search & Tags**: Find verses by themes and keywords
- **Daily Verse Rotation**: New inspiration every day

## 🔐 Privacy & Security

- **Complete Privacy**: All data stays on your device
- **No Cloud Dependencies**: Works entirely offline
- **Data Ownership**: You control all your data
- **Anonymous Usage**: Optional local analytics only

## 💾 Data Management

### Local Storage
- All user data is stored locally using AsyncStorage
- No internet connection required for core functionality
- Complete privacy - no data sent to external servers

### Export Options
- **Full Backup**: Export all user data as JSON file
- **Personal Notes**: Export study notes as text file
- **Progress Summary**: Share your learning journey

### Import Options
- Import previously exported backup files
- Restore all progress and personal notes
- Seamless data migration between devices

## 📊 Privacy & Analytics

### Local Analytics Only
- Usage statistics stored locally on device
- Track your personal learning patterns
- No external analytics services
- Complete control over your data

### What We Track (Locally)
- App usage sessions
- Feature usage frequency
- Reading progress and streaks
- Time spent in app
- Personal study patterns

## 🎯 Future Enhancements

- [ ] Audio recordings of Sanskrit verses
- [ ] Multiple commentary sources
- [ ] Meditation timer integration
- [ ] Verse sharing with beautiful graphics
- [ ] Local push notifications for daily verses
- [ ] Advanced search with filters
- [ ] Multiple language support
- [ ] Dark mode theme option
- [ ] Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sacred texts and translations from various scholarly sources
- Icons from Expo Vector Icons
- UI inspiration from modern mobile design systems
- Firebase for reliable backend infrastructure

---

*May this application serve as a digital companion on the spiritual journey, making the timeless wisdom of the Bhagavad Gita accessible to seekers everywhere.* 🕉️

## 📞 Support

For support, email support@bhagavadgitaapp.com or create an issue in this repository.