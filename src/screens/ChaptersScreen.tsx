import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { bhagavadGitaData } from '../data/bhagavadGitaData';

const { width } = Dimensions.get('window');


const ChaptersScreen: React.FC = () => {
  const navigation = useNavigation();

  const openChapter = (chapterId: string) => {
    navigation.navigate('ChapterDetail' as never, { chapterId } as never);
  };

  // Define colors for each chapter (Duolingo style)
  const chapterColors = [
    ['#58cc02', '#89e219'], // Green
    ['#1cb0f6', '#4fc3f7'], // Blue
    ['#ff9600', '#ffb84d'], // Orange
    ['#ce82ff', '#e0a3ff'], // Purple
    ['#ff4b4b', '#ff7979'], // Red
    ['#2dd4bf', '#5eead4'], // Teal
  ];

  const getChapterColor = (index: number) => {
    return chapterColors[index % chapterColors.length];
  };

  const getCompletionPercentage = (chapterNumber: number) => {
    // Mock completion data - in real app this would come from user progress
    const completionData: { [key: number]: number } = {
      1: 100, 2: 85, 3: 60, 4: 30, 5: 15, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    };
    return completionData[chapterNumber] || 0;
  };

  const renderChapterCircle = (item: any, index: number) => {
    const colors = getChapterColor(index);
    const completion = getCompletionPercentage(item.number);
    const isCompleted = completion === 100;
    const isLocked = index > 0 && getCompletionPercentage(bhagavadGitaData[index - 1].number) === 0;
    
    return (
      <TouchableOpacity 
        key={item.id}
        style={[styles.chapterCircle, { 
          left: (index % 2) * (width * 0.5) + (width * 0.15),
          top: Math.floor(index / 2) * 120,
        }]} 
        onPress={() => !isLocked && openChapter(item.id)}
        disabled={isLocked}
      >
        <LinearGradient
          colors={isLocked ? ['#e5e7eb', '#d1d5db'] : colors}
          style={styles.chapterButton}
        >
          {completion > 0 && completion < 100 && (
            <View style={[styles.progressRing, {
              borderTopColor: colors[1],
              transform: [{ rotate: `${(completion / 100) * 360}deg` }]
            }]} />
          )}
          
          {isCompleted ? (
            <Ionicons name="checkmark" size={28} color="#ffffff" />
          ) : isLocked ? (
            <Ionicons name="lock-closed" size={28} color="#9ca3af" />
          ) : (
            <Text style={styles.chapterNumberText}>{item.number}</Text>
          )}
        </LinearGradient>
        
        <Text style={[styles.chapterLabel, { opacity: isLocked ? 0.5 : 1 }]} numberOfLines={1}>
          {item.name.english}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chapters</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.skillTree}
        showsVerticalScrollIndicator={false}
      >
        {bhagavadGitaData.map((item, index) => renderChapterCircle(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4b5563',
  },
  scrollView: {
    flex: 1,
  },
  skillTree: {
    paddingTop: 20,
    paddingBottom: 100,
    minHeight: Math.ceil(bhagavadGitaData.length / 2) * 120 + 40,
    position: 'relative',
  },
  chapterCircle: {
    position: 'absolute',
    alignItems: 'center',
  },
  chapterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  progressRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: 'transparent',
    top: -4,
    left: -4,
  },
  chapterNumberText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  chapterLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 100,
  },
});

export default ChaptersScreen;