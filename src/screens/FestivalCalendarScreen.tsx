import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaColors, NavigationColors } from '../constants/colors';
import { 
  festivalData, 
  getTodaysFestivals, 
  getUpcomingFestivals, 
  getFestivalsByMonth,
  getMajorFestivals,
  Festival 
} from '../data/festivals';

const { width } = Dimensions.get('window');

const FestivalCalendarScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'calendar' | 'list'>('cards');
  const [todaysFestivals, setTodaysFestivals] = useState<Festival[]>([]);
  const [upcomingFestivals, setUpcomingFestivals] = useState<Festival[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'story' | 'celebrate' | 'shop'>('overview');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    loadFestivalData();
  }, [selectedMonth, selectedYear]);

  const loadFestivalData = () => {
    setTodaysFestivals(getTodaysFestivals());
    setUpcomingFestivals(getUpcomingFestivals(365)); // Next year
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getFestivalsForDate = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return festivalData.filter(festival => festival.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === selectedMonth && 
           today.getFullYear() === selectedYear;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderCalendarDay = (day: number) => {
    const festivals = getFestivalsForDate(day);
    const isCurrentDay = isToday(day);

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          isCurrentDay && styles.todayDay,
          festivals.length > 0 && styles.festivalDay,
        ]}
        onPress={() => {
          if (festivals.length > 0) {
            setSelectedFestival(festivals[0]);
          }
        }}
      >
        <Text style={[
          styles.dayNumber,
          isCurrentDay && styles.todayDayNumber,
          festivals.length > 0 && styles.festivalDayNumber,
        ]}>
          {day}
        </Text>
        {festivals.length > 0 && (
          <View style={styles.festivalIndicator}>
            <View style={styles.festivalDot} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(renderCalendarDay(day));
    }

    return (
      <View style={styles.calendarGrid}>
        {/* Day headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, index) => (
          <View key={dayName + index} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{dayName}</Text>
          </View>
        ))}
        {days}
      </View>
    );
  };

  const renderCardsView = () => {
    const allFestivals = getMajorFestivals();

    return (
      <FlatList
        data={allFestivals}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.festivalCard}
            onPress={() => setSelectedFestival(item)}
          >
            {/* Hero Image */}
            <View style={styles.festivalImageContainer}>
              <Image
                source={{ uri: item.heroImageUrl || '/images/festivals/default-hero.jpg' }}
                style={styles.festivalHeroImage}
                defaultSource={{ uri: '/images/festivals/default-hero.jpg' }}
              />
              <View style={styles.festivalOverlay}>
                <View style={styles.festivalDateBadge}>
                  <Text style={styles.festivalDateText}>
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Content */}
            <View style={styles.festivalCardContent}>
              <Text style={styles.festivalCardTitle}>{item.name}</Text>
              {item.sanskritName && (
                <Text style={styles.festivalCardSanskrit}>{item.sanskritName}</Text>
              )}
              
              <Text style={styles.festivalCardDescription} numberOfLines={3}>
                {item.fullStory || item.description}
              </Text>
              
              {/* Tags */}
              <View style={styles.festivalTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.importance}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.duration} day{item.duration > 1 ? 's' : ''}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.type.replace('_', ' ')}</Text>
                </View>
              </View>
              
              {/* Action Buttons */}
              <View style={styles.festivalCardActions}>
                <TouchableOpacity style={styles.learnMoreButton}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.celebrateButton}>
                  <Text style={styles.celebrateText}>Celebrate</Text>
                  <Ionicons name="arrow-forward" size={16} color={DharmaColors.text.inverse} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      />
    );
  };

  const renderListView = () => {
    const monthFestivals = getFestivalsByMonth(selectedMonth + 1, selectedYear);

    return (
      <ScrollView style={styles.listView}>
        {monthFestivals.map((festival) => (
          <TouchableOpacity
            key={festival.id}
            style={styles.festivalListItem}
            onPress={() => setSelectedFestival(festival)}
          >
            <View style={styles.festivalListDate}>
              <Text style={styles.festivalListDay}>
                {new Date(festival.date).getDate()}
              </Text>
              <Text style={styles.festivalListMonth}>
                {new Date(festival.date).toLocaleDateString('en-US', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.festivalListDetails}>
              <Text style={styles.festivalListName}>{festival.name}</Text>
              {festival.sanskritName && (
                <Text style={styles.festivalListSanskrit}>{festival.sanskritName}</Text>
              )}
              <Text style={styles.festivalListSignificance} numberOfLines={2}>
                {festival.significance}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={DharmaColors.text.tertiary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderTabContent = () => {
    if (!selectedFestival) {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.modalText}>No festival selected</Text>
        </View>
      );
    }

    console.log('Rendering tab content for:', selectedTab, selectedFestival.name);

    switch (selectedTab) {
      case 'overview':
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalDate}>{formatDate(selectedFestival.date)}</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Significance</Text>
              <Text style={styles.modalText}>{selectedFestival.significance || 'No significance information available'}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Description</Text>
              <Text style={styles.modalText}>{selectedFestival.description || 'No description available'}</Text>
            </View>

            {selectedFestival.traditions && selectedFestival.traditions.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Traditions</Text>
                {selectedFestival.traditions.map((tradition, index) => (
                  <Text key={index} style={styles.modalBullet}>• {tradition}</Text>
                ))}
              </View>
            )}

            {selectedFestival.foods && selectedFestival.foods.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Traditional Foods</Text>
                {selectedFestival.foods.map((food, index) => (
                  <Text key={index} style={styles.modalBullet}>• {food}</Text>
                ))}
              </View>
            )}

            {selectedFestival.colors && selectedFestival.colors.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Festival Colors</Text>
                <Text style={styles.modalText}>{selectedFestival.colors.join(', ')}</Text>
              </View>
            )}

            {selectedFestival.deity && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Deity</Text>
                <Text style={styles.modalText}>{selectedFestival.deity}</Text>
              </View>
            )}

            {(selectedFestival as any).region && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Region</Text>
                <Text style={styles.modalText}>{(selectedFestival as any).region}</Text>
              </View>
            )}

            {(selectedFestival as any).culturalImpact && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Cultural Impact</Text>
                <Text style={styles.modalText}>{(selectedFestival as any).culturalImpact}</Text>
              </View>
            )}

            <View style={styles.modalBottomPadding} />
          </ScrollView>
        );

      case 'story':
        const festival = selectedFestival as any;
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {festival.fullStory && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>The Complete Story</Text>
                <Text style={styles.modalText}>{festival.fullStory}</Text>
              </View>
            )}

            {festival.mythology && festival.mythology.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Mythology & Legends</Text>
                {festival.mythology.map((myth: string, index: number) => (
                  <View key={index} style={styles.mythologyItem}>
                    <Text style={styles.modalText}>{myth}</Text>
                  </View>
                ))}
              </View>
            )}

            {festival.scriptureReferences && festival.scriptureReferences.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Scripture References</Text>
                {festival.scriptureReferences.map((ref: any, index: number) => (
                  <TouchableOpacity key={index} style={styles.scriptureReference}>
                    <Text style={styles.scriptureTitle}>
                      {ref.text.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      {ref.chapter && ` ${ref.chapter}:${ref.verse}`}
                    </Text>
                    <Text style={styles.scriptureQuote}>"{ref.quote}"</Text>
                    <Text style={styles.scriptureRelevance}>{ref.relevance}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!festival.fullStory && (!festival.mythology || festival.mythology.length === 0) && (!festival.scriptureReferences || festival.scriptureReferences.length === 0) && (
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>Story content coming soon...</Text>
              </View>
            )}

            <View style={styles.modalBottomPadding} />
          </ScrollView>
        );

      case 'celebrate':
        const celebrateFestival = selectedFestival as any;
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {celebrateFestival.starterPack?.stepByStepGuide && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Step-by-Step Celebration Guide</Text>
                {celebrateFestival.starterPack.stepByStepGuide.map((step: any, index: number) => (
                  <View key={index} style={styles.celebrationStep}>
                    <View style={styles.stepHeader}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                      </View>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>
                    <Text style={styles.stepDescription}>{step.description}</Text>
                    <Text style={styles.stepTiming}>{step.timeOfDay} • {step.duration}</Text>
                  </View>
                ))}
              </View>
            )}

            {celebrateFestival.modernAdaptations && celebrateFestival.modernAdaptations.length > 0 && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Modern Celebrations</Text>
                {celebrateFestival.modernAdaptations.map((adaptation: string, index: number) => (
                  <Text key={index} style={styles.modalBullet}>• {adaptation}</Text>
                ))}
              </View>
            )}

            {(!celebrateFestival.starterPack?.stepByStepGuide) && (!celebrateFestival.modernAdaptations || celebrateFestival.modernAdaptations.length === 0) && (
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>Celebration guide coming soon...</Text>
              </View>
            )}

            <View style={styles.modalBottomPadding} />
          </ScrollView>
        );

      case 'shop':
        const shopFestival = selectedFestival as any;
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {shopFestival.starterPack && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Festival Starter Pack</Text>
                <Text style={styles.starterPackTitle}>{shopFestival.starterPack.title}</Text>
                <Text style={styles.starterPackDescription}>{shopFestival.starterPack.description}</Text>
                
                <View style={styles.starterPackInfo}>
                  <Text style={styles.starterPackCost}>💰 {shopFestival.starterPack.estimatedCost}</Text>
                  <Text style={styles.starterPackTime}>⏰ {shopFestival.starterPack.timeRequired}</Text>
                  <Text style={styles.starterPackDifficulty}>📊 {shopFestival.starterPack.difficulty}</Text>
                </View>

                <TouchableOpacity style={styles.buyStarterPackButton}>
                  <Text style={styles.buyStarterPackText}>🛒 Add Complete Kit to Cart</Text>
                </TouchableOpacity>

                <Text style={styles.modalSectionTitle}>Essential Items</Text>
                {shopFestival.starterPack.essentialItems?.map((item: any, index: number) => (
                  <View key={index} style={styles.productCard}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productSignificance}>✨ {item.culturalSignificance}</Text>
                    <TouchableOpacity style={styles.addToCartButton}>
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {!shopFestival.starterPack && (
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>Shopping options coming soon...</Text>
              </View>
            )}

            <View style={styles.modalBottomPadding} />
          </ScrollView>
        );

      default:
        return (
          <View style={styles.tabContent}>
            <Text style={styles.modalText}>Content not available</Text>
          </View>
        );
    }
  };

  const renderFestivalModal = () => {
    if (!selectedFestival) return null;

    return (
      <Modal
        visible={!!selectedFestival}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setSelectedFestival(null);
          setSelectedTab('overview');
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Hero Image Header */}
          <View style={styles.modalHeroContainer}>
            <View style={styles.modalHeroImageFallback}>
              <View style={styles.modalHeroGradient} />
            </View>
            <View style={styles.modalHeroOverlay}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setSelectedFestival(null);
                  setSelectedTab('overview');
                }}
              >
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.modalHeroContent}>
                <Text style={styles.modalHeroTitle}>{selectedFestival.name}</Text>
                {selectedFestival.sanskritName && (
                  <Text style={styles.modalHeroSanskrit}>{selectedFestival.sanskritName}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabNavigation}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
              onPress={() => setSelectedTab('overview')}
            >
              <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'story' && styles.activeTab]}
              onPress={() => setSelectedTab('story')}
            >
              <Text style={[styles.tabText, selectedTab === 'story' && styles.activeTabText]}>
                Stories
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'celebrate' && styles.activeTab]}
              onPress={() => setSelectedTab('celebrate')}
            >
              <Text style={[styles.tabText, selectedTab === 'celebrate' && styles.activeTabText]}>
                Celebrate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'shop' && styles.activeTab]}
              onPress={() => setSelectedTab('shop')}
            >
              <Text style={[styles.tabText, selectedTab === 'shop' && styles.activeTabText]}>
                Shop
              </Text>
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Festivals</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity
            style={[styles.viewToggle, viewMode === 'cards' && styles.activeViewToggle]}
            onPress={() => setViewMode('cards')}
          >
            <Ionicons name="grid" size={20} color={viewMode === 'cards' ? DharmaColors.text.inverse : DharmaColors.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggle, viewMode === 'calendar' && styles.activeViewToggle]}
            onPress={() => setViewMode('calendar')}
          >
            <Ionicons name="calendar" size={20} color={viewMode === 'calendar' ? DharmaColors.text.inverse : DharmaColors.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggle, viewMode === 'list' && styles.activeViewToggle]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list" size={20} color={viewMode === 'list' ? DharmaColors.text.inverse : DharmaColors.text.tertiary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditional Month Navigation - only for calendar view */}
      {viewMode === 'calendar' && (
        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color={DharmaColors.text.primary} />
          </TouchableOpacity>
          
          <Text style={styles.monthYear}>
            {months[selectedMonth]} {selectedYear}
          </Text>
          
          <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color={DharmaColors.text.primary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Today's Festivals Banner - only for cards and calendar view */}
      {viewMode !== 'list' && todaysFestivals.length > 0 && (
        <View style={styles.todayBanner}>
          <Text style={styles.todayBannerTitle}>Today's Celebrations</Text>
          {todaysFestivals.map((festival) => (
            <TouchableOpacity
              key={festival.id}
              style={styles.todayFestival}
              onPress={() => setSelectedFestival(festival)}
            >
              <Text style={styles.todayFestivalName}>{festival.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* View Content */}
      {viewMode === 'cards' && renderCardsView()}
      {viewMode === 'calendar' && renderCalendarView()}
      {viewMode === 'list' && renderListView()}

      {/* Festival Detail Modal */}
      {renderFestivalModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaColors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    letterSpacing: 1,
  },
  headerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  viewToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: DharmaColors.background.secondary,
  },
  activeViewToggle: {
    backgroundColor: DharmaColors.primary[500],
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  navButton: {
    padding: 8,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    letterSpacing: 0.5,
  },
  todayBanner: {
    backgroundColor: DharmaColors.primary[500],
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  todayBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
    marginBottom: 8,
  },
  todayFestival: {
    paddingVertical: 4,
  },
  todayFestivalName: {
    fontSize: 14,
    color: DharmaColors.text.inverse,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flex: 1,
  },
  dayHeader: {
    width: width / 7 - 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.tertiary,
  },
  calendarDay: {
    width: width / 7 - 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    marginVertical: 2,
    borderRadius: 8,
    position: 'relative',
  },
  emptyDay: {
    width: width / 7 - 6,
    height: 50,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  todayDay: {
    backgroundColor: DharmaColors.secondary[500],
  },
  festivalDay: {
    backgroundColor: DharmaColors.primary[500],
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '400',
    color: DharmaColors.text.primary,
  },
  todayDayNumber: {
    color: DharmaColors.text.inverse,
    fontWeight: '600',
  },
  festivalDayNumber: {
    color: DharmaColors.text.inverse,
    fontWeight: '600',
  },
  festivalIndicator: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
  },
  festivalDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: DharmaColors.text.inverse,
  },
  listView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  festivalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DharmaColors.background.tertiary,
  },
  festivalListDate: {
    width: 60,
    alignItems: 'center',
    marginRight: 16,
  },
  festivalListDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DharmaColors.primary[400],
  },
  festivalListMonth: {
    fontSize: 12,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  festivalListDetails: {
    flex: 1,
  },
  festivalListName: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 2,
  },
  festivalListSanskrit: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    marginBottom: 4,
    fontStyle: 'italic',
  },
  festivalListSignificance: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 18,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: DharmaColors.background.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DharmaColors.background.tertiary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  modalSanskrit: {
    fontSize: 20,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  modalDate: {
    fontSize: 16,
    fontWeight: '500',
    color: DharmaColors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '300',
    color: DharmaColors.text.primary,
    lineHeight: 22,
  },
  modalBullet: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  // Enhanced Festival Cards
  cardsContainer: {
    padding: 16,
  },
  festivalCard: {
    backgroundColor: DharmaColors.background.secondary,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  festivalImageContainer: {
    position: 'relative',
  },
  festivalHeroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  festivalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  festivalDateBadge: {
    backgroundColor: DharmaColors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  festivalDateText: {
    color: DharmaColors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  festivalCardContent: {
    padding: 20,
  },
  festivalCardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 4,
  },
  festivalCardSanskrit: {
    fontSize: 16,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    marginBottom: 12,
    fontStyle: 'italic',
  },
  festivalCardDescription: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  festivalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: DharmaColors.background.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
    textTransform: 'capitalize',
  },
  festivalCardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  learnMoreButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DharmaColors.primary[500],
    alignItems: 'center',
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.primary[500],
  },
  celebrateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: DharmaColors.primary[500],
    gap: 8,
  },
  celebrateText: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
  // Enhanced Modal Styles
  modalHeroContainer: {
    height: 300,
    position: 'relative',
  },
  modalHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalHeroImageFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: DharmaColors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeroGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: DharmaColors.primary[500],
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeroContent: {
    justifyContent: 'flex-end',
  },
  modalHeroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: DharmaColors.text.inverse,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalHeroSanskrit: {
    fontSize: 18,
    fontWeight: '400',
    color: DharmaColors.text.inverse,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.9,
  },
  // Tab Navigation
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: DharmaColors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: DharmaColors.background.tertiary,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: DharmaColors.primary[500],
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
  },
  activeTabText: {
    color: DharmaColors.primary[500],
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalBottomPadding: {
    height: 40,
  },
  // Story Tab
  mythologyItem: {
    backgroundColor: DharmaColors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: DharmaColors.primary[500],
  },
  scriptureReference: {
    backgroundColor: DharmaColors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DharmaColors.accent[500],
  },
  scriptureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.accent[400],
    marginBottom: 8,
  },
  scriptureQuote: {
    fontSize: 14,
    fontWeight: '400',
    color: DharmaColors.text.primary,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20,
  },
  scriptureRelevance: {
    fontSize: 13,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 18,
  },
  // Celebrate Tab
  celebrationStep: {
    backgroundColor: DharmaColors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DharmaColors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DharmaColors.text.inverse,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  stepTiming: {
    fontSize: 12,
    fontWeight: '500',
    color: DharmaColors.text.tertiary,
    backgroundColor: DharmaColors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  // Shop Tab
  starterPackTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: 8,
  },
  starterPackDescription: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  starterPackInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  starterPackCost: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.accent[400],
  },
  starterPackTime: {
    fontSize: 14,
    fontWeight: '500',
    color: DharmaColors.text.secondary,
  },
  starterPackDifficulty: {
    fontSize: 14,
    fontWeight: '500',
    color: DharmaColors.text.secondary,
  },
  buyStarterPackButton: {
    backgroundColor: DharmaColors.primary[500],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buyStarterPackText: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
  productCard: {
    backgroundColor: DharmaColors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: DharmaColors.background.tertiary,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DharmaColors.accent[400],
  },
  productDescription: {
    fontSize: 14,
    fontWeight: '300',
    color: DharmaColors.text.secondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  productSignificance: {
    fontSize: 13,
    fontWeight: '400',
    color: DharmaColors.primary[400],
    lineHeight: 18,
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: DharmaColors.secondary[500],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
  },
});

export default FestivalCalendarScreen;