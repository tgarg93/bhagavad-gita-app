import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import DharmaHeader from '../components/ui/DharmaHeader';

const { width } = Dimensions.get('window');

const BhagavadGitaChapter1Screen: React.FC = () => {
  const navigation = useNavigation();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const adjustFontSize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const getTextStyle = (baseStyle: any) => {
    const multiplier = fontSize === 'small' ? 0.9 : fontSize === 'large' ? 1.15 : 1;
    return {
      ...baseStyle,
      fontSize: baseStyle.fontSize * multiplier,
      lineHeight: baseStyle.lineHeight * multiplier,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title="Chapter 1"
        subtitle="The Warrior's Dilemma"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
            <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Chapter Cover Image */}
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: '/assets/images/bhagavadGita/chapters/01/battlefield-armies.jpg' }}
            style={styles.coverImage}
            defaultSource={require('../../assets/images/chapters/chapter-1-battlefield.png')}
          />
        </View>

        {/* Reading Time */}
        <View style={styles.metaInfo}>
          <View style={styles.readingTime}>
            <Ionicons name="time-outline" size={16} color={DharmaDesignSystem.colors.primary.deepSaffron} />
            <Text style={styles.readingTimeText}>12 min read</Text>
          </View>
        </View>

        {/* Opening Verse */}
        <View style={styles.verseSection}>
          <Text style={getTextStyle(styles.sanskritText)}>
            धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः
          </Text>
          <Text style={getTextStyle(styles.transliterationText)}>
            dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ
          </Text>
          <Text style={getTextStyle(styles.verseTranslation)}>
            On the field of dharma, on the field of the Kurus, assembled, desiring to fight
          </Text>
        </View>

        {/* Story Content */}
        <Text style={getTextStyle(styles.storyText)}>
          On the sacred field where right and wrong would be decided, two armies gathered, ready for war. This place, <Text style={styles.sanskritInline}>Kurukshetra</Text>, wasn't just any battlefield - it was a <Text style={styles.sanskritInline}>dharma-kshetra</Text> (field of righteousness) where the fate of dharma itself would be determined.
        </Text>

        <Text style={getTextStyle(styles.storyText)}>
          <Text style={styles.boldText}>Arjuna</Text>, the greatest warrior alive, stands between two massive armies ready for battle. But when he looks across the field, he sees his teachers, cousins, and friends on the other side. His heart breaks.
        </Text>

        {/* Arjuna's Despair Section */}
        <View style={styles.sectionHeader}>
          <Text style={getTextStyle(styles.sectionTitle)}>Arjuna's Despair</Text>
        </View>

        <View style={styles.verseSection}>
          <Text style={getTextStyle(styles.sanskritText)}>अर्जुन उवाच</Text>
          <Text style={getTextStyle(styles.transliterationText)}>arjuna uvāca</Text>
          <Text style={getTextStyle(styles.verseTranslation)}>Arjuna said</Text>
        </View>

        <Text style={getTextStyle(styles.storyText)}>
          When Arjuna spoke, his words revealed the deepest human struggle - what happens when our <Text style={styles.sanskritInline}>dharma</Text> (righteous duty) conflicts with our emotions and love for others.
        </Text>

        <Text style={getTextStyle(styles.dialogueText)}>
          "How can I fight people I love?" he asks Krishna. "What kind of victory is worth hurting your own family?"
        </Text>

        <Text style={getTextStyle(styles.storyText)}>
          Overwhelmed with doubt and confusion, this mighty warrior sits down in his chariot, unable to fight. This is called <Text style={styles.sanskritInline}>vishada</Text> (deep despair) - when we're so confused about right and wrong that we can't act at all. Sometimes even heroes feel lost and need guidance.
        </Text>

        {/* Spacer for bottom navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DharmaDesignSystem.colors.neutrals.sandstoneBeige,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DharmaDesignSystem.spacing.lg,
    paddingBottom: DharmaDesignSystem.spacing.xl,
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  coverImageContainer: {
    marginVertical: DharmaDesignSystem.spacing.lg,
    borderRadius: DharmaDesignSystem.borderRadius.large,
    overflow: 'hidden',
    ...DharmaDesignSystem.shadows.soft,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  readingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 182, 39, 0.12)',
    paddingHorizontal: DharmaDesignSystem.spacing.md,
    paddingVertical: DharmaDesignSystem.spacing.sm,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  readingTimeText: {
    ...DharmaDesignSystem.typography.sizes.caption,
    color: DharmaDesignSystem.colors.primary.turmericYellow,
    marginLeft: DharmaDesignSystem.spacing.xs,
    fontWeight: '600',
  },
  verseSection: {
    backgroundColor: 'rgba(255, 248, 240, 0.6)',
    padding: DharmaDesignSystem.spacing.lg,
    borderRadius: DharmaDesignSystem.borderRadius.medium,
    borderLeftWidth: 4,
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
    marginVertical: DharmaDesignSystem.spacing.lg,
    alignItems: 'center',
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
    fontWeight: '500',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  verseTranslation: {
    ...DharmaDesignSystem.typography.sizes.sacredSmall,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionHeader: {
    marginTop: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  sectionTitle: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    textAlign: 'center',
    fontWeight: '600',
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 28,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'left',
  },
  dialogueText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.lg,
    paddingLeft: DharmaDesignSystem.spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(74, 144, 226, 0.3)',
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    padding: DharmaDesignSystem.spacing.md,
    borderRadius: DharmaDesignSystem.borderRadius.small,
  },
  sanskritInline: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: '700',
    color: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  bottomSpacer: {
    height: DharmaDesignSystem.spacing.xxl,
  },
});

export default BhagavadGitaChapter1Screen;