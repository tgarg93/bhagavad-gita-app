import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DharmaColors } from '../constants/colors';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';
import DharmaHeaderAction from '../components/ui/DharmaHeaderAction';
import deviceCalendarService from '../services/deviceCalendarService';
import {
  getTodaysFestivals,
  getFestivalsOnDate,
  getFestivalsByMonth,
  getAllFestivals,
  getNextOccurrence,
  parseLocalDate,
  Festival,
} from '../data/festivals';

const { width } = Dimensions.get('window');

const FestivalCalendarScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'cards' | 'calendar' | 'list'>('calendar');
  const [todaysFestivals, setTodaysFestivals] = useState<Festival[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done' | 'denied'>('idle');
  const [syncSummary, setSyncSummary] = useState<{ added: number; skipped: number } | null>(null);

  const handleSyncAll = async () => {
    if (syncStatus === 'syncing') return;
    setSyncStatus('syncing');
    const granted = await deviceCalendarService.ensurePermissions();
    if (!granted) {
      setSyncStatus('denied');
      return;
    }
    const result = await deviceCalendarService.syncAllUpcoming();
    setSyncSummary(result);
    setSyncStatus('done');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    setTodaysFestivals(getTodaysFestivals());
  }, []);

  const openFestival = (festival: Festival) => {
    (navigation as any).navigate('FestivalDetail', { festivalId: festival.id });
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getFestivalsForDate = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getFestivalsOnDate(dateStr);
  };

  const today = new Date();
  const isToday = (day: number) => {
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

  // Start date of the festival's occurrence within the currently selected month/year,
  // falling back to the next occurrence
  const occurrenceStartForSelectedMonth = (festival: Festival): Date => {
    const monthStart = new Date(selectedYear, selectedMonth, 1);
    const monthEnd = new Date(selectedYear, selectedMonth + 1, 0);
    for (const start of festival.occurrences) {
      const [year, month, day] = start.split('-').map(Number);
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(startDate.getTime() + (festival.duration - 1) * 24 * 60 * 60 * 1000);
      if (startDate <= monthEnd && endDate >= monthStart) return startDate;
    }
    const next = getNextOccurrence(festival);
    return next ? next.start : new Date(festival.date);
  };

  const renderCalendarDay = (day: number) => {
    const festivals = getFestivalsForDate(day);
    const isCurrentDay = isToday(day);
    const hasFestival = festivals.length > 0;

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          hasFestival && styles.festivalDay,
          // Today must stay legible even on a festival day — a ring layered on
          // top of the festival tint, rather than a solid fill that would
          // otherwise be clobbered by festivalDay's background below it.
          isCurrentDay && (hasFestival ? styles.todayRing : styles.todayDay),
        ]}
        onPress={() => {
          if (hasFestival) {
            openFestival(festivals[0]);
          }
        }}
      >
        <Text style={[
          styles.dayNumber,
          hasFestival && styles.festivalDayNumber,
          isCurrentDay && !hasFestival && styles.todayDayNumber,
        ]}>
          {day}
        </Text>
        {hasFestival && (
          <Text style={styles.festivalEmoji}>{festivals[0].emoji}</Text>
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

    const monthFestivals = getFestivalsByMonth(selectedMonth + 1, selectedYear);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.calendarGrid}>
          {/* Day headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, index) => (
            <View key={dayName + index} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{dayName}</Text>
            </View>
          ))}
          {days}
        </View>

        {/* Festivals in the selected month */}
        {monthFestivals.length > 0 && (
          <View style={styles.monthFestivalList}>
            <Text style={styles.monthFestivalTitle}>This Month</Text>
            {monthFestivals.map(festival => (
              <TouchableOpacity
                key={festival.id}
                style={styles.monthFestivalItem}
                onPress={() => openFestival(festival)}
              >
                <Text style={styles.monthFestivalEmoji}>{festival.emoji}</Text>
                <View style={styles.monthFestivalDetails}>
                  <Text style={styles.monthFestivalName}>{festival.name}</Text>
                  <Text style={styles.monthFestivalDate}>
                    {occurrenceStartForSelectedMonth(festival).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={DharmaColors.text.tertiary} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderCardsView = () => {
    const allFestivals = getAllFestivals();

    return (
      <FlatList
        data={allFestivals}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.festivalCard}
            onPress={() => openFestival(item)}
          >
            {/* Hero Image */}
            <View style={styles.festivalImageContainer}>
              <Image
                source={item.heroImageUrl || require('../../assets/images/covers/generic-cover.jpg')}
                style={styles.festivalHeroImage}
              />
              <View style={styles.festivalOverlay}>
                <View style={styles.festivalDateBadge}>
                  <Text style={styles.festivalDateText}>
                    {parseLocalDate(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
            </View>

            {/* Content */}
            <View style={styles.festivalCardContent}>
              <Text style={styles.festivalCardTitle}>{item.emoji}  {item.name}</Text>
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
        {monthFestivals.length === 0 && (
          <Text style={styles.emptyListText}>
            No festivals in {months[selectedMonth]} {selectedYear}
          </Text>
        )}
        {monthFestivals.map((festival) => (
          <TouchableOpacity
            key={festival.id}
            style={styles.festivalListItem}
            onPress={() => openFestival(festival)}
          >
            <View style={styles.festivalListDate}>
              <Text style={styles.festivalListDay}>
                {occurrenceStartForSelectedMonth(festival).getDate()}
              </Text>
              <Text style={styles.festivalListMonth}>
                {occurrenceStartForSelectedMonth(festival).toLocaleDateString('en-US', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.festivalListDetails}>
              <Text style={styles.festivalListName}>{festival.emoji}  {festival.name}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title="Festivals"
        rightActions={
          <View style={styles.headerControls}>
            <DharmaHeaderAction
              iconName="grid"
              onPress={() => setViewMode('cards')}
              variant={viewMode === 'cards' ? 'primary' : 'default'}
            />
            <DharmaHeaderAction
              iconName="calendar"
              onPress={() => setViewMode('calendar')}
              variant={viewMode === 'calendar' ? 'primary' : 'default'}
            />
            <DharmaHeaderAction
              iconName="list"
              onPress={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'primary' : 'default'}
            />
            <DharmaHeaderAction
              iconName="sync-outline"
              onPress={handleSyncAll}
              disabled={syncStatus === 'syncing'}
            />
          </View>
        }
      />

      {syncStatus === 'done' && syncSummary && (
        <View style={styles.syncBanner}>
          <Ionicons name="checkmark-circle" size={16} color={DharmaColors.text.inverse} />
          <Text style={styles.syncBannerText}>
            {syncSummary.added > 0
              ? `${syncSummary.added} festival${syncSummary.added === 1 ? '' : 's'} added to your calendar`
              : 'Your calendar is already up to date'}
          </Text>
        </View>
      )}
      {syncStatus === 'denied' && (
        <View style={[styles.syncBanner, styles.syncBannerWarn]}>
          <Text style={[styles.syncBannerText, styles.syncBannerTextWarn]}>
            Calendar access needed — enable it for Dharma in Settings to sync festivals.
          </Text>
        </View>
      )}

      {/* Conditional Month Navigation - for calendar and list views */}
      {viewMode !== 'cards' && (
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
              onPress={() => openFestival(festival)}
            >
              <Text style={styles.todayFestivalName}>{festival.emoji}  {festival.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.contentSpacer} />
      {/* View Content */}
      {viewMode === 'cards' && renderCardsView()}
      {viewMode === 'calendar' && renderCalendarView()}
      {viewMode === 'list' && renderListView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  headerControls: {
    flexDirection: 'row',
    gap: DharmaDesignSystem.spacing.sm,
  },
  syncBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: DharmaColors.secondary[500],
  },
  syncBannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: DharmaColors.text.inverse,
    textAlign: 'center',
  },
  syncBannerWarn: {
    backgroundColor: 'rgba(117, 117, 117, 0.12)',
  },
  syncBannerTextWarn: {
    color: DharmaColors.text.primary,
  },
  contentSpacer: {
    height: DharmaDesignSystem.spacing.lg,
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
  },
  dayHeader: {
    width: Math.floor((width - 48) / 7) - 6, // grid has 24px padding/side; floor so 7 cells never overflow
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
    width: Math.floor((width - 48) / 7) - 6, // grid has 24px padding/side; floor so 7 cells never overflow
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    marginVertical: 2,
    borderRadius: 8,
    position: 'relative',
  },
  emptyDay: {
    width: Math.floor((width - 48) / 7) - 6, // grid has 24px padding/side; floor so 7 cells never overflow
    height: 54,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  todayDay: {
    backgroundColor: DharmaColors.secondary[500],
  },
  todayRing: {
    borderWidth: 2,
    borderColor: DharmaColors.secondary[500],
  },
  festivalDay: {
    backgroundColor: 'rgba(230, 81, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.35)',
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
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 1,
  },
  festivalEmoji: {
    fontSize: 16,
    lineHeight: 18,
  },
  monthFestivalList: {
    paddingHorizontal: 24,
    paddingTop: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.xxl,
  },
  monthFestivalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DharmaColors.text.primary,
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  monthFestivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DharmaDesignSystem.colors.neutrals.warmIvory,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    padding: DharmaDesignSystem.spacing.md,
    marginBottom: DharmaDesignSystem.spacing.sm,
    ...DharmaDesignSystem.shadows.soft,
  },
  monthFestivalEmoji: {
    fontSize: 24,
    marginRight: DharmaDesignSystem.spacing.md,
  },
  monthFestivalDetails: {
    flex: 1,
  },
  monthFestivalName: {
    fontSize: 16,
    fontWeight: '600',
    color: DharmaColors.text.primary,
  },
  monthFestivalDate: {
    fontSize: 13,
    color: DharmaColors.text.secondary,
    marginTop: 2,
  },
  listView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyListText: {
    fontSize: 14,
    color: DharmaColors.text.secondary,
    textAlign: 'center',
    paddingVertical: 32,
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
  // Festival Cards
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
});

export default FestivalCalendarScreen;
