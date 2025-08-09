import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import LocalStorageService from '../services/localStorageService';

export interface LocalUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  currentUser: LocalUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Simple local authentication with stored users
const USERS_KEY = 'bhagavad_gita_users';

interface StoredUser {
  id: string;
  email: string;
  username: string;
  password: string; // In a real app, this would be hashed
  createdAt: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const getStoredUsers = async (): Promise<StoredUser[]> => {
    try {
      const usersJson = await LocalStorageService.getCurrentUser();
      // For simplicity, we'll use a simple array in AsyncStorage
      const usersData = await require('@react-native-async-storage/async-storage').default.getItem(USERS_KEY);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error getting stored users:', error);
      return [];
    }
  };

  const saveStoredUsers = async (users: StoredUser[]) => {
    try {
      await require('@react-native-async-storage/async-storage').default.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving stored users:', error);
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    try {
      const users = await getStoredUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      const newUser: StoredUser = {
        id: generateId(),
        email,
        username: username || email.split('@')[0],
        password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await saveStoredUsers(users);

      const localUser: LocalUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        createdAt: newUser.createdAt,
      };

      setCurrentUser(localUser);
      await LocalStorageService.saveCurrentUser(localUser);
      await LocalStorageService.createDefaultUserProgress(localUser.id, localUser.username, localUser.email);
      await LocalStorageService.trackFeatureUsage('user_registration');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const users = await getStoredUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const localUser: LocalUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      };

      setCurrentUser(localUser);
      await LocalStorageService.saveCurrentUser(localUser);
      await LocalStorageService.trackFeatureUsage('user_login');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginAsGuest = async () => {
    try {
      const guestUser: LocalUser = {
        id: 'guest_' + generateId(),
        email: 'guest@local.app',
        username: 'Guest User',
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(guestUser);
      await LocalStorageService.saveCurrentUser(guestUser);
      await LocalStorageService.createDefaultUserProgress(guestUser.id, guestUser.username, guestUser.email);
      await LocalStorageService.trackFeatureUsage('guest_login');
    } catch (error) {
      console.error('Guest login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await LocalStorageService.clearCurrentUser();
      setCurrentUser(null);
      await LocalStorageService.trackFeatureUsage('user_logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        setLoading(true);
        const user = await LocalStorageService.getCurrentUser();
        setCurrentUser(user);
        
        if (user) {
          await LocalStorageService.trackAppOpen();
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    loginAsGuest,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};