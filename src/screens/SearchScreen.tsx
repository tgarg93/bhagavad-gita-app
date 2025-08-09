import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/ui/Card';

interface SearchResult {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  english: string;
  transliteration: string;
  tags: string[];
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockSearchResults: SearchResult[] = [
    {
      id: '2-47',
      chapter: 2,
      verse: 47,
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      english: 'You have a right to perform your prescribed duty, but do not be attached to the fruits of action.',
      transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
      tags: ['karma', 'duty', 'attachment', 'action'],
    },
    {
      id: '4-7',
      chapter: 4,
      verse: 7,
      sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
      english: 'Whenever there is decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion, at that time I descend Myself.',
      transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata',
      tags: ['dharma', 'divine incarnation', 'righteousness'],
    },
  ];

  const popularSearches = [
    'dharma', 'karma', 'yoga', 'soul', 'duty', 'meditation', 'devotion', 'knowledge'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setSearchResults(mockSearchResults);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Card style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View style={styles.verseLabel}>
            <Text style={styles.verseLabelText}>
              Chapter {item.chapter}, Verse {item.verse}
            </Text>
          </View>
        </View>

        <Text style={styles.sanskritText}>{item.sanskrit}</Text>
        <Text style={styles.transliterationText}>{item.transliteration}</Text>
        <Text style={styles.englishText}>{item.english}</Text>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.resultActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderPopularSearch = (search: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.popularSearchChip}
      onPress={() => handleSearch(search)}
    >
      <Text style={styles.popularSearchText}>{search}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Search</Text>
        <Text style={styles.headerSubtitle}>Find verses by keywords or themes</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search verses, keywords, or themes..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results or Popular Searches */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : searchQuery.length > 2 && isSearching ? (
        <View style={styles.searchingContainer}>
          <Text style={styles.searchingText}>Searching...</Text>
        </View>
      ) : searchQuery.length > 2 && !isSearching ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching for keywords like "dharma", "karma", or "soul"
          </Text>
        </View>
      ) : (
        <View style={styles.popularContainer}>
          <Text style={styles.popularTitle}>Popular Searches</Text>
          <View style={styles.popularChips}>
            {popularSearches.map(renderPopularSearch)}
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Search Tips</Text>
            <Text style={styles.tipText}>• Try keywords like "duty", "soul", "meditation"</Text>
            <Text style={styles.tipText}>• Search for concepts like "karma yoga", "dharma"</Text>
            <Text style={styles.tipText}>• Look for themes like "devotion", "knowledge"</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultItem: {
    marginBottom: 16,
  },
  resultCard: {
    padding: 16,
  },
  resultHeader: {
    marginBottom: 12,
  },
  verseLabel: {
    backgroundColor: '#ea580c',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  verseLabelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  sanskritText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6b7280',
    marginBottom: 8,
  },
  englishText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  popularContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  popularChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  popularSearchChip: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  popularSearchText: {
    fontSize: 14,
    color: '#374151',
  },
  tipsContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
});

export default SearchScreen;