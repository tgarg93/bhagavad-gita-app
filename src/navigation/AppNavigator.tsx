import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ChaptersScreen from '../screens/ChaptersScreen';
import StoriesScreen from '../screens/StoriesScreen';
import AskKrishnaScreen from '../screens/AskKrishnaScreen';
import LoginScreen from '../screens/LoginScreen';
import ChapterDetailScreen from '../screens/ChapterDetailScreen';
import VerseDetailScreen from '../screens/VerseDetailScreen';

import { useAuth } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'Chapters') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Stories') {
            iconName = focused ? 'headset' : 'headset-outline';
          } else if (route.name === 'Ask Krishna') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#58cc02',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Talk' }}
      />
      <Tab.Screen 
        name="Chapters" 
        component={ChaptersScreen}
        options={{ tabBarLabel: 'Chapters' }}
      />
      <Tab.Screen 
        name="Stories" 
        component={StoriesScreen}
        options={{ tabBarLabel: 'Stories' }}
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
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // Or loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
            <Stack.Screen name="VerseDetail" component={VerseDetailScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;