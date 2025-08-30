import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import WisdomHubScreen from '../screens/WisdomHubScreen';
import FestivalCalendarScreen from '../screens/FestivalCalendarScreen';
import AskKrishnaScreen from '../screens/AskKrishnaScreen';
import ChapterDetailScreen from '../screens/ChapterDetailScreen';
import VerseDetailScreen from '../screens/VerseDetailScreen';
import PracticeDetailScreen from '../screens/PracticeDetailScreen';
import DeityDetailScreen from '../screens/DeityDetailScreen';
import PhilosophyDetailScreen from '../screens/PhilosophyDetailScreen';
import ScriptureDetailScreen from '../screens/ScriptureDetailScreen';
import BhagavadGitaChaptersScreen from '../screens/BhagavadGitaChaptersScreen';
import ChapterReadingScreen from '../screens/ChapterReadingScreen';

import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scriptures') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'FestivalCalendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Ask Krishna') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: DharmaDesignSystem.colors.primary.saffronSunset,
        tabBarInactiveTintColor: DharmaDesignSystem.colors.neutrals.softAsh,
        tabBarStyle: {
          backgroundColor: DharmaDesignSystem.colors.neutrals.white,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 107, 53, 0.12)',
          height: DharmaDesignSystem.layout.tabBarHeight,
          paddingBottom: DharmaDesignSystem.spacing.sm,
          paddingTop: DharmaDesignSystem.spacing.sm,
          shadowColor: 'rgba(255, 107, 53, 0.08)',
          shadowOffset: { width: 0, height: -2 },
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
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
        <Stack.Screen name="VerseDetail" component={VerseDetailScreen} />
        <Stack.Screen name="PracticeDetail" component={PracticeDetailScreen} />
        <Stack.Screen name="DeityDetail" component={DeityDetailScreen} />
        <Stack.Screen name="PhilosophyDetail" component={PhilosophyDetailScreen} />
        <Stack.Screen name="ScriptureDetail" component={ScriptureDetailScreen} />
        <Stack.Screen name="BhagavadGitaChapters" component={BhagavadGitaChaptersScreen} />
        <Stack.Screen name="ChapterReading" component={ChapterReadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;