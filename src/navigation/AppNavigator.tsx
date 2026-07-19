import React, { useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { profilePhotoStore, useProfilePhoto } from '../services/profilePhotoStore';
import { PostHogProvider } from 'posthog-react-native';
import { posthog } from '../config/posthog';

import HomeScreen from '../screens/HomeScreen';
import WisdomHubScreen from '../screens/WisdomHubScreen';
import FestivalCalendarScreen from '../screens/FestivalCalendarScreen';
import FestivalDetailScreen from '../screens/FestivalDetailScreen';
import AskKrishnaScreen from '../screens/AskKrishnaScreen';
import ChapterDetailScreen from '../screens/ChapterDetailScreen';
import VerseDetailScreen from '../screens/VerseDetailScreen';
import PracticeDetailScreen from '../screens/PracticeDetailScreen';
import DeityDetailScreen from '../screens/DeityDetailScreen';
import PhilosophyDetailScreen from '../screens/PhilosophyDetailScreen';
import ScriptureDetailScreen from '../screens/ScriptureDetailScreen';
import BhagavadGitaChaptersScreen from '../screens/BhagavadGitaChaptersScreen';
import ChapterReadingScreen from '../screens/ChapterReadingScreen';
import BhagavadGitaChapter1Screen from '../screens/BhagavadGitaChapter1Screen';
import BhagavadGitaCompleteScreen from '../screens/BhagavadGitaCompleteScreen';
import GitaVersePlayerScreen from '../screens/GitaVersePlayerScreen';
import ContentReaderScreen from '../screens/ContentReaderScreen';
import PrayerPlayerScreen from '../screens/PrayerPlayerScreen';
import ScriptureContentsScreen from '../screens/ScriptureContentsScreen';
import ProfileTabScreen from '../screens/ProfileTabScreen';
import JourneyPathScreen from '../screens/JourneyPathScreen';

// Module-level ref so services (notification taps) can navigate once the
// container is ready
export const navigationRef = createNavigationContainerRef();

import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile tab icon: the user's photo when set (Partiful-style), else a person icon
const ProfileTabIcon: React.FC<{ size: number; color: string; focused: boolean }> = ({
  size,
  color,
  focused,
}) => {
  const photoUri = useProfilePhoto();
  if (photoUri) {
    return (
      <Image
        source={{ uri: photoUri }}
        style={{
          width: size + 4,
          height: size + 4,
          borderRadius: (size + 4) / 2,
          borderWidth: focused ? 2 : 0,
          borderColor: DharmaDesignSystem.colors.primary.deepSaffron,
        }}
        onError={() => profilePhotoStore.setUri(undefined)}
      />
    );
  }
  return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size + 2} color={color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Scriptures') {
            iconName = 'library-outline';
          } else if (route.name === 'FestivalCalendar') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Ask Krishna') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            return <ProfileTabIcon size={size} color={color} focused={focused} />;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: DharmaDesignSystem.colors.primary.deepSaffron,
        tabBarInactiveTintColor: DharmaDesignSystem.colors.neutrals.softAsh,
        tabBarBackground: () => (
          <LinearGradient
            colors={DharmaDesignSystem.colors.gradients.creamWarmth}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: DharmaDesignSystem.layout.tabBarHeight,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: 'rgba(230, 81, 0, 0.15)',
          height: DharmaDesignSystem.layout.tabBarHeight,
          paddingBottom: DharmaDesignSystem.spacing.sm,
          paddingTop: DharmaDesignSystem.spacing.sm,
          shadowColor: 'rgba(230, 81, 0, 0.12)',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Scriptures" 
        component={WisdomHubScreen}
        options={{ tabBarLabel: 'Learn' }}
      />
      <Tab.Screen 
        name="FestivalCalendar" 
        component={FestivalCalendarScreen}
        options={{ tabBarLabel: 'Festivals' }}
      />
      <Tab.Screen
        name="Ask Krishna"
        component={AskKrishnaScreen}
        options={{ tabBarLabel: 'Ask Krishna' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabScreen}
        options={{ tabBarLabel: 'You' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if (currentRouteName && currentRouteName !== routeNameRef.current) {
          posthog.screen(currentRouteName);
          routeNameRef.current = currentRouteName;
        }
      }}
    >
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ['testID'],
          maxElementsCaptured: 20,
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
          <Stack.Screen name="VerseDetail" component={VerseDetailScreen} />
          <Stack.Screen name="PracticeDetail" component={PracticeDetailScreen} />
          <Stack.Screen name="DeityDetail" component={DeityDetailScreen} />
          <Stack.Screen name="FestivalDetail" component={FestivalDetailScreen} />
          <Stack.Screen name="PhilosophyDetail" component={PhilosophyDetailScreen} />
          <Stack.Screen name="ScriptureDetail" component={ScriptureDetailScreen} />
          <Stack.Screen name="BhagavadGitaChapters" component={BhagavadGitaChaptersScreen} />
          <Stack.Screen name="ChapterReading" component={ChapterReadingScreen} />
          <Stack.Screen name="BhagavadGitaChapter1" component={BhagavadGitaChapter1Screen} />
          <Stack.Screen name="BhagavadGitaComplete" component={BhagavadGitaCompleteScreen} />
          <Stack.Screen name="GitaVersePlayer" component={GitaVersePlayerScreen} />
          <Stack.Screen name="ContentReader" component={ContentReaderScreen} />
          <Stack.Screen name="PrayerPlayer" component={PrayerPlayerScreen} />
          <Stack.Screen name="ScriptureContents" component={ScriptureContentsScreen} />
          <Stack.Screen name="JourneyPath" component={JourneyPathScreen} />
        </Stack.Navigator>
      </PostHogProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;