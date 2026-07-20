import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import SourcesCard from '../components/SourcesCard';
import ChapterReflection from '../components/ChapterReflection';
import deviceCalendarService from '../services/deviceCalendarService';
import {
  festivalData,
  getNextOccurrence,
  getDaysUntilFestival,
  Festival,
} from '../data/festivals';

type CalendarSyncStatus = 'idle' | 'syncing' | 'added' | 'denied';

type FestivalDetailParams = {
  FestivalDetail: { festivalId: string };
};

const FestivalDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<FestivalDetailParams, 'FestivalDetail'>>();
  const festival = festivalData.find(f => f.id === route.params?.festivalId);

  if (!festival) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.bodyText}>Festival not found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.notFoundBack}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const nextOccurrence = getNextOccurrence(festival);
  const daysUntil = getDaysUntilFestival(festival);
  const [calendarStatus, setCalendarStatus] = useState<CalendarSyncStatus>('idle');

  const handleAddToCalendar = async () => {
    setCalendarStatus('syncing');
    const granted = await deviceCalendarService.ensurePermissions();
    if (!granted) {
      setCalendarStatus('denied');
      return;
    }
    await deviceCalendarService.syncFestival(festival);
    setCalendarStatus('added');
  };

  const formatOccurrenceDate = (): string => {
    const date = nextOccurrence ? nextOccurrence.start : new Date(festival.date);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const daysUntilLabel = (): string | null => {
    if (daysUntil === null) return null;
    if (daysUntil === 0) return 'Happening now';
    if (daysUntil === 1) return 'Tomorrow';
    return `In ${daysUntil} days`;
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image
            source={festival.heroImageUrl || require('../../assets/images/covers/generic-cover.jpg')}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.35)', 'transparent', 'rgba(0,0,0,0.75)']}
            style={styles.heroGradient}
          />
          <SafeAreaView style={styles.heroOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{festival.name}</Text>
              {festival.sanskritName && (
                <Text style={styles.heroSanskrit}>{festival.sanskritName}</Text>
              )}
            </View>
          </SafeAreaView>
        </View>

        {/* Date banner */}
        <View style={styles.dateBanner}>
          <View style={styles.dateBannerLeft}>
            <Text style={styles.dateEmoji}>{festival.emoji}</Text>
            <View>
              <Text style={styles.dateText}>{formatOccurrenceDate()}</Text>
              {festival.duration > 1 && (
                <Text style={styles.durationText}>
                  {festival.duration}-day celebration
                </Text>
              )}
            </View>
          </View>
          {daysUntilLabel() && (
            <View style={styles.daysChip}>
              <Text style={styles.daysChipText}>{daysUntilLabel()}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.calendarButton, calendarStatus === 'added' && styles.calendarButtonDone]}
          onPress={handleAddToCalendar}
          disabled={calendarStatus === 'syncing' || calendarStatus === 'added'}
        >
          <Ionicons
            name={calendarStatus === 'added' ? 'checkmark-circle' : 'calendar-outline'}
            size={18}
            color={calendarStatus === 'added' ? colors.primary.peacockTeal : colors.primary.deepSaffron}
          />
          <Text style={[styles.calendarButtonText, calendarStatus === 'added' && styles.calendarButtonTextDone]}>
            {calendarStatus === 'added'
              ? 'Added to your calendar'
              : calendarStatus === 'syncing'
              ? 'Adding…'
              : 'Add to Calendar'}
          </Text>
        </TouchableOpacity>
        {calendarStatus === 'denied' && (
          <Text style={styles.calendarHint}>
            Calendar access needed — enable it for Dharma in Settings to add festivals.
          </Text>
        )}

        <View style={styles.content}>
          {/* Seed festivals open the story in the paged reader — prominent, right under the date */}
          {festival.sections && festival.sections.length > 0 && (
            <TouchableOpacity
              style={styles.readStoryCard}
              onPress={() =>
                (navigation as any).navigate('ContentReader', {
                  contentType: 'festival',
                  contentId: festival.id,
                })
              }
            >
              <View style={styles.readStoryIcon}>
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.readStoryText}>
                <Text style={styles.readStoryTitle}>Read the story</Text>
                <Text style={styles.readStorySub}>
                  {festival.sections.length} parts · the origin of {festival.name}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={22} color={colors.primary.deepSaffron} />
            </TouchableOpacity>
          )}

          {festival.significance &&
            renderSection('Significance', (
              <View style={styles.accentBlock}>
                <Text style={styles.accentText}>{festival.significance}</Text>
              </View>
            ))}

          {festival.description &&
            renderSection('About the Festival', (
              <Text style={styles.bodyText}>{festival.description}</Text>
            ))}

          {festival.traditions?.length > 0 &&
            renderSection('Traditions', (
              <View style={styles.card}>
                {festival.traditions.map((tradition, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={styles.bulletMark}>•</Text>
                    <Text style={styles.bulletText}>{tradition}</Text>
                  </View>
                ))}
              </View>
            ))}

          {festival.foods?.length > 0 &&
            renderSection('Traditional Foods', (
              <View style={styles.chipRow}>
                {festival.foods.map((food, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{food}</Text>
                  </View>
                ))}
              </View>
            ))}

          {(festival.deity || festival.region || festival.colors?.length > 0) &&
            renderSection('At a Glance', (
              <View style={styles.card}>
                {festival.deity && (
                  <View style={styles.glanceRow}>
                    <Text style={styles.glanceLabel}>Deity</Text>
                    <Text style={styles.glanceValue}>{festival.deity}</Text>
                  </View>
                )}
                {festival.region && (
                  <View style={styles.glanceRow}>
                    <Text style={styles.glanceLabel}>Region</Text>
                    <Text style={styles.glanceValue}>{festival.region}</Text>
                  </View>
                )}
                {festival.colors?.length > 0 && (
                  <View style={styles.glanceRow}>
                    <Text style={styles.glanceLabel}>Colors</Text>
                    <Text style={styles.glanceValue}>{festival.colors.join(', ')}</Text>
                  </View>
                )}
              </View>
            ))}

          {/* Flat story for festivals without reader sections */}
          {!festival.sections?.length && festival.fullStory &&
            renderSection('The Story', (
              <Text style={styles.storyText}>{festival.fullStory}</Text>
            ))}

          {festival.mythology?.length > 0 &&
            renderSection('Mythology & Legends', (
              <View>
                {festival.mythology.map((myth, index) => (
                  <View key={index} style={styles.accentBlock}>
                    <Text style={styles.bodyText}>{myth}</Text>
                  </View>
                ))}
              </View>
            ))}

          {festival.scriptureReferences?.length > 0 &&
            renderSection('Scripture References', (
              <View>
                {festival.scriptureReferences.map((ref, index) => (
                  <View key={index} style={styles.scriptureCard}>
                    <Text style={styles.scriptureTitle}>
                      {ref.text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      {ref.chapter ? ` ${ref.chapter}:${ref.verse}` : ''}
                    </Text>
                    <Text style={styles.scriptureQuote}>"{ref.quote}"</Text>
                    <Text style={styles.scriptureRelevance}>{ref.relevance}</Text>
                  </View>
                ))}
              </View>
            ))}

          {festival.rituals?.length > 0 &&
            renderSection('Rituals & How to Celebrate', (
              <View>
                {festival.rituals.map(ritual => (
                  <View key={ritual.id} style={styles.card}>
                    <Text style={styles.ritualName}>{ritual.name}</Text>
                    <Text style={styles.ritualSignificance}>{ritual.significance}</Text>
                    {ritual.materials.length > 0 && (
                      <Text style={styles.ritualMaterials}>
                        You'll need: {ritual.materials.join(', ')}
                      </Text>
                    )}
                    {ritual.steps.map(step => (
                      <View key={step.stepNumber} style={styles.bulletRow}>
                        <Text style={styles.stepNumber}>{step.stepNumber}.</Text>
                        <Text style={styles.bulletText}>{step.instruction}</Text>
                      </View>
                    ))}
                    {ritual.mantras?.map((mantra, i) => (
                      <View key={i} style={styles.ritualMantra}>
                        <Text style={styles.ritualMantraSanskrit}>{mantra.sanskrit}</Text>
                        <Text style={styles.ritualMantraTranslit}>{mantra.transliteration}</Text>
                        <Text style={styles.ritualMantraMeaning}>{mantra.meaning}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}

          {festival.familyActivities?.length > 0 &&
            renderSection('With Family', (
              <View>
                {festival.familyActivities.map(activity => (
                  <View key={activity.id} style={styles.card}>
                    <Text style={styles.ritualName}>{activity.title}</Text>
                    <Text style={styles.bodyText}>{activity.description}</Text>
                    <Text style={styles.activityMeta}>
                      {activity.ageGroup.replace(/_/g, ' ')} · {activity.duration}
                    </Text>
                  </View>
                ))}
              </View>
            ))}

          {festival.culturalImpact &&
            renderSection('Cultural Impact', (
              <Text style={styles.bodyText}>{festival.culturalImpact}</Text>
            ))}

          {/* Sources live on the reader's final page for seed festivals */}
          {festival.sources && festival.sources.length > 0 && !festival.sections?.length && (
            <View style={styles.narrativeBlock}>
              <SourcesCard sources={festival.sources} />
            </View>
          )}

          {festival.reflectionQuestions && festival.reflectionQuestions.length > 0 && (
            <ChapterReflection
              contentType="festival"
              contentId={festival.id}
              chapterTitle={festival.name}
              subtitle={festival.significance}
              questions={festival.reflectionQuestions}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const { colors, typography, spacing, borderRadius, shadows, layout } = DharmaDesignSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundBack: {
    ...typography.sizes.buttonText,
    color: colors.primary.deepSaffron,
    marginTop: spacing.md,
  },
  // Hero
  heroContainer: {
    height: 320,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: spacing.md,
    marginLeft: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  heroTitle: {
    ...typography.sizes.headingXL,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  heroSanskrit: {
    ...typography.sizes.bodyLG,
    fontFamily: typography.fontFamily.cultural,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.9,
  },
  // Date banner
  dateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutrals.warmIvory,
    marginHorizontal: layout.containerPadding,
    marginTop: -spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    ...shadows.lifted,
  },
  dateBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  dateEmoji: {
    fontSize: 28,
  },
  dateText: {
    ...typography.sizes.bodyMD,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
  },
  durationText: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.softAsh,
    marginTop: 2,
  },
  daysChip: {
    backgroundColor: colors.primary.deepSaffron,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    marginLeft: spacing.sm,
  },
  daysChipText: {
    ...typography.sizes.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Add-to-calendar action, under the date banner
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginHorizontal: layout.containerPadding,
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    backgroundColor: colors.neutrals.warmIvory,
  },
  calendarButtonDone: {
    borderColor: 'rgba(0, 121, 107, 0.3)',
  },
  calendarButtonText: {
    ...typography.sizes.bodySM,
    fontWeight: '600',
    color: colors.primary.deepSaffron,
  },
  calendarButtonTextDone: {
    color: colors.primary.peacockTeal,
  },
  calendarHint: {
    ...typography.sizes.caption,
    color: colors.neutrals.softAsh,
    textAlign: 'center',
    marginHorizontal: layout.containerPadding,
    marginTop: spacing.xs,
  },
  // Content
  content: {
    paddingHorizontal: layout.containerPadding,
    paddingTop: spacing.lg,
  },
  // SourcesCard pads itself (spacing.lg); cancel the content container's
  // padding so its gutters match the other screens
  narrativeBlock: {
    marginHorizontal: -layout.containerPadding,
  },
  readStoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.3)',
    padding: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  readStoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.deepSaffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readStoryText: { flex: 1 },
  readStoryTitle: { ...typography.sizes.headingSM, color: colors.neutrals.charcoalBlack, fontWeight: '700' },
  readStorySub: { ...typography.sizes.bodySM, fontWeight: '400', color: colors.neutrals.softAsh, marginTop: 2 },
  ritualName: {
    ...typography.sizes.headingSM,
    color: colors.primary.deepSaffron,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  ritualSignificance: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.charcoalBlack,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  ritualMaterials: {
    ...typography.sizes.bodySM,
    fontWeight: '400',
    color: colors.neutrals.softAsh,
    marginBottom: spacing.sm,
  },
  stepNumber: {
    ...typography.sizes.bodyMD,
    color: colors.primary.deepSaffron,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  ritualMantra: {
    backgroundColor: 'rgba(255, 193, 7, 0.05)',
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.turmericYellow,
  },
  ritualMantraSanskrit: {
    ...typography.sizes.sacredQuote,
    color: colors.primary.deepSaffron,
    textAlign: 'center',
  },
  ritualMantraTranslit: {
    ...typography.sizes.bodySM,
    fontWeight: '400',
    color: colors.neutrals.softAsh,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  ritualMantraMeaning: {
    ...typography.sizes.bodyMD,
    color: colors.primary.peacockTeal,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  activityMeta: {
    ...typography.sizes.caption,
    color: colors.neutrals.softAsh,
    marginTop: spacing.sm,
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.sizes.headingSM,
    color: colors.primary.deepSaffron,
    marginBottom: spacing.sm,
  },
  bodyText: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.charcoalBlack,
  },
  storyText: {
    ...typography.sizes.bodyLG,
    color: colors.neutrals.charcoalBlack,
    textAlign: 'justify',
  },
  accentBlock: {
    borderLeftWidth: 2,
    borderLeftColor: colors.primary.deepSaffron,
    paddingLeft: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
  },
  accentText: {
    ...typography.sizes.bodyLG,
    fontFamily: typography.fontFamily.cultural,
    fontStyle: 'italic',
    color: colors.neutrals.charcoalBlack,
  },
  card: {
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    ...shadows.soft,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  bulletMark: {
    ...typography.sizes.bodyMD,
    color: colors.primary.deepSaffron,
    marginRight: spacing.sm,
  },
  bulletText: {
    ...typography.sizes.bodyMD,
    color: colors.neutrals.charcoalBlack,
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.neutrals.warmIvory,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.large,
  },
  chipText: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.charcoalBlack,
  },
  glanceRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  glanceLabel: {
    ...typography.sizes.bodySM,
    fontWeight: '600',
    color: colors.neutrals.softAsh,
    width: 72,
  },
  glanceValue: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.charcoalBlack,
    flex: 1,
  },
  scriptureCard: {
    backgroundColor: colors.neutrals.warmIvory,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary.peacockTeal,
  },
  scriptureTitle: {
    ...typography.sizes.bodyMD,
    fontWeight: '600',
    color: colors.primary.peacockTeal,
    marginBottom: spacing.xs,
  },
  scriptureQuote: {
    ...typography.sizes.bodyMD,
    fontFamily: typography.fontFamily.cultural,
    fontStyle: 'italic',
    color: colors.neutrals.charcoalBlack,
    marginBottom: spacing.xs,
  },
  scriptureRelevance: {
    ...typography.sizes.bodySM,
    color: colors.neutrals.softAsh,
  },
});

export default FestivalDetailScreen;
