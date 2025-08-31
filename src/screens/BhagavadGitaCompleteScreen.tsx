import React, { useState, useRef, useEffect } from 'react';
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

const { width, height } = Dimensions.get('window');

const BhagavadGitaCompleteScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentChapter, setCurrentChapter] = useState(1);

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

  const SanskritVerse = ({ sanskrit, transliteration, meaning }: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  }) => (
    <View style={styles.verseContainer}>
      <Text style={getTextStyle(styles.sanskritText)}>{sanskrit}</Text>
      <Text style={getTextStyle(styles.transliterationText)}>{transliteration}</Text>
      <Text style={getTextStyle(styles.meaningText)}>{meaning}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DharmaHeader
        title={`Chapter ${currentChapter}`}
        subtitle="Bhagavad Gita"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity onPress={adjustFontSize} style={styles.fontButton}>
            <Ionicons name="text" size={20} color={DharmaDesignSystem.colors.primary.deepSaffron} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Book Cover */}
        <View style={styles.bookCover}>
          <Text style={getTextStyle(styles.bookTitle)}>Bhagavad Gita</Text>
          <Text style={getTextStyle(styles.bookSubtitle)}>Complete Story with Sacred Verses</Text>
        </View>

        {/* Chapter 1: The Warrior's Dilemma */}
        <View style={styles.chapterSection}>
          <Text style={getTextStyle(styles.chapterTitle)}>Chapter 1: The Warrior's Dilemma</Text>
          <Text style={getTextStyle(styles.chapterSubtitle)}>Arjuna's Crisis of Faith • 12 min read</Text>

          <SanskritVerse
            sanskrit="धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः"
            transliteration="dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ"
            meaning="On the field of dharma, on the field of the Kurus, assembled, desiring to fight"
          />

          <Text style={getTextStyle(styles.storyText)}>
            On the sacred field where right and wrong would be decided, two armies gathered, ready for war. This place, <Text style={styles.sanskritInline}>Kurukshetra</Text>, wasn't just any battlefield - it was a <Text style={styles.sanskritInline}>dharma-kshetra</Text> (field of righteousness) where the fate of dharma itself would be determined.
          </Text>

          <Text style={getTextStyle(styles.storyText)}>
            <Text style={styles.nameHighlight}>Arjuna</Text>, the greatest warrior alive, stands between two massive armies ready for battle. But when he looks across the field, he sees his teachers, cousins, and friends on the other side. His heart breaks.
          </Text>

          <Text style={getTextStyle(styles.sectionHeader)}>Arjuna's Despair</Text>

          <SanskritVerse
            sanskrit="अर्जुन उवाच"
            transliteration="arjuna uvāca"
            meaning="Arjuna said"
          />

          <Text style={getTextStyle(styles.storyText)}>
            When Arjuna spoke, his words revealed the deepest human struggle - what happens when our <Text style={styles.sanskritInline}>dharma</Text> (righteous duty) conflicts with our emotions and love for others.
          </Text>

          <Text style={getTextStyle(styles.dialogueText)}>
            "How can I fight people I love?" he asks Krishna. "What kind of victory is worth hurting your own family?"
          </Text>

          <Text style={getTextStyle(styles.storyText)}>
            Overwhelmed with doubt and confusion, this mighty warrior sits down in his chariot, unable to fight. This is called <Text style={styles.sanskritInline}>vishada</Text> (deep despair) - when we're so confused about right and wrong that we can't act at all. Sometimes even heroes feel lost and need guidance.
          </Text>
        </View>

        {/* Chapter 2: The Eternal Soul */}
        <View style={styles.chapterSection}>
          <Text style={getTextStyle(styles.chapterTitle)}>Chapter 2: The Eternal Soul</Text>
          <Text style={getTextStyle(styles.chapterSubtitle)}>The Secret of Who You Really Are • 20 min read</Text>

          <SanskritVerse
            sanskrit="अशोच्यान्न्वशोचस्त्वं प्रज्ञावादांश्च भाषसे"
            transliteration="aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase"
            meaning="You grieve for those who should not be grieved for, yet you speak words of wisdom"
          />

          <Text style={getTextStyle(styles.storyText)}>
            Krishna gently points out Arjuna's confusion: "You're worried about the wrong things, even though you understand many wise concepts." This is how <Text style={styles.sanskritInline}>viveka</Text> (discrimination between real and unreal) begins - learning what deserves our worry and what doesn't.
          </Text>

          <Text style={getTextStyle(styles.storyText)}>
            Krishna gently explains the most important truth: "Arjuna, you think you're just this body, but you're so much more. You are an eternal soul that never dies."
          </Text>

          <Text style={getTextStyle(styles.sectionHeader)}>The Eternal Soul Teaching</Text>

          <SanskritVerse
            sanskrit="वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि"
            transliteration="vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi"
            meaning="As a person puts on new clothes, giving up old ones, the soul takes new bodies, giving up old ones"
          />

          <Text style={getTextStyle(styles.storyText)}>
            Just like you change clothes when they get old, your <Text style={styles.sanskritInline}>atman</Text> (eternal soul) changes bodies. The real you - your consciousness, your essence - never dies. Understanding this truth about your <Text style={styles.sanskritInline}>atman</Text> frees you from the fear of death and the attachment to temporary things.
          </Text>

          <Text style={getTextStyle(styles.sectionHeader)}>The Path of Duty Without Attachment</Text>

          <SanskritVerse
            sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
            transliteration="karmaṇy evādhikāras te mā phaleṣu kadācana"
            meaning="You have a right to perform your prescribed duty, but not to the fruits of action"
          />

          <Text style={getTextStyle(styles.storyText)}>
            This is the golden key to happiness: Do your <Text style={styles.sanskritInline}>karma</Text> (action/duty) with love and skill, but don't demand specific results. This is <Text style={styles.sanskritInline}>nishkama karma</Text> (desireless action) - the secret to living without stress while still caring deeply about what you do.
          </Text>
        </View>

        {/* More chapters will be added here... */}

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
  },
  fontButton: {
    padding: DharmaDesignSystem.spacing.sm,
    backgroundColor: 'rgba(230, 81, 0, 0.08)',
    borderRadius: DharmaDesignSystem.borderRadius.medium,
  },
  bookCover: {
    alignItems: 'center',
    paddingVertical: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.xl,
  },
  bookTitle: {
    ...DharmaDesignSystem.typography.sizes.headingXL,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: DharmaDesignSystem.spacing.sm,
  },
  bookSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chapterSection: {
    marginBottom: DharmaDesignSystem.spacing.xxl,
  },
  chapterTitle: {
    ...DharmaDesignSystem.typography.sizes.headingLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  chapterSubtitle: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    marginBottom: DharmaDesignSystem.spacing.lg,
    fontStyle: 'italic',
  },
  sectionHeader: {
    ...DharmaDesignSystem.typography.sizes.headingMD,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    fontWeight: '600',
    marginTop: DharmaDesignSystem.spacing.xl,
    marginBottom: DharmaDesignSystem.spacing.md,
  },
  verseContainer: {
    marginVertical: DharmaDesignSystem.spacing.lg,
    paddingLeft: DharmaDesignSystem.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: DharmaDesignSystem.colors.primary.deepSaffron,
  },
  sanskritText: {
    ...DharmaDesignSystem.typography.sizes.sacredQuote,
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    marginBottom: DharmaDesignSystem.spacing.xs,
    fontWeight: '500',
  },
  transliterationText: {
    ...DharmaDesignSystem.typography.sizes.bodySM,
    color: DharmaDesignSystem.colors.neutrals.softAsh,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.xs,
  },
  meaningText: {
    ...DharmaDesignSystem.typography.sizes.bodyMD,
    color: DharmaDesignSystem.colors.primary.peacockTeal,
    fontWeight: '500',
  },
  storyText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    marginBottom: DharmaDesignSystem.spacing.lg,
    textAlign: 'justify',
  },
  dialogueText: {
    ...DharmaDesignSystem.typography.sizes.bodyLG,
    color: DharmaDesignSystem.colors.neutrals.charcoalBlack,
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: DharmaDesignSystem.spacing.lg,
    paddingLeft: DharmaDesignSystem.spacing.md,
    textAlign: 'justify',
  },
  sanskritInline: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  nameHighlight: {
    color: DharmaDesignSystem.colors.primary.deepSaffron,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: DharmaDesignSystem.spacing.xxl,
  },
});

export default BhagavadGitaCompleteScreen;