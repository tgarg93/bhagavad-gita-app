import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
            iconName = 'home-outline';
          } else if (route.name === 'Scriptures') {
            iconName = 'library-outline';
          } else if (route.name === 'FestivalCalendar') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Ask Krishna') {
            iconName = 'chatbubble-outline';
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