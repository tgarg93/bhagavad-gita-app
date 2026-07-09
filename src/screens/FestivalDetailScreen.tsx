import React from 'react';
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
import {
  festivalData,
  getNextOccurrence,
  getDaysUntilFestival,
  Festival,
} from '../data/festivals';

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
            source={festival.heroImageUrl || require('../../assets/images/covers/dharma-cover.png')}
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

        <View style={styles.content}>
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

          {festival.fullStory &&
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

          {festival.culturalImpact &&
            renderSection('Cultural Impact', (
              <Text style={styles.bodyText}>{festival.culturalImpact}</Text>
            ))}
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
  // Content
  content: {
    paddingHorizontal: layout.containerPadding,
    paddingTop: spacing.lg,
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
