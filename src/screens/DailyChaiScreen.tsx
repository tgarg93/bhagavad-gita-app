import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';
import { getDailyAtom, DailyAtom, AtomType } from '../data/dailyAtoms';
import { getDailyVerse } from '../data/dailyVerse';
import { AudioNarrationService } from '../services/audioNarrationService';
import LocalStorageService from '../services/localStorageService';
import journeyService from '../services/journeyService';
import krishnaContext from '../services/krishnaContextService';

// Daily Chai: the 45-second morning brief. One cited atom of wisdom, the
// verse of the day (English first), and a question to carry to Krishna.

const ATOM_TAGS: Record<AtomType, string> = {
  why: 'Why do we…?',
  saying: 'A saying to carry',
  word: 'Sanskrit word',
  story: 'Story moment',
  festival: 'Festival lens',
};

const todayKey = (): string => {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
};

const DailyChaiScreen: React.FC = () => {
  const navigation = useNavigation();
  const audioService = useRef(AudioNarrationService.getInstance()).current;
  const [speaking, setSpeaking] = useState(false);

  const atom: DailyAtom = useMemo(() => getDailyAtom(), []);
  const verse = useMemo(() => getDailyVerse(), []);

  const dateLine = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    // Showing up counts: mark today's brief opened, keep the activity streak
    LocalStorageService.saveChaiLastOpened(todayKey());
    journeyService.touchActivity();
    return () => {
      audioService.stopNarration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openLink = () => {
    if (!atom.link) return;
    (navigation as any).navigate(atom.link.route, atom.link.params);
  };

  const hearVerse = async () => {
    if (speaking) return;
    setSpeaking(true);
    try {
      await audioService.speakOnce(`${verse.english}. ${verse.reference}`, () =>
        setSpeaking(false)
      );
    } catch {
      setSpeaking(false);
    }
  };

  const askKrishna = () => {
    krishnaContext.setCurrentContent({
      type: 'daily-chai',
      title: atom.hook,
      snippet: `${atom.hook} — ${atom.body}`.slice(0, 380),
    });
    (navigation as any).navigate('MainTabs', { screen: 'Ask Krishna' });
  };

  const readInContext = () => {
    (navigation as any).navigate('GitaVersePlayer', { chapter: verse.chapter });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Cover */}
        <LinearGradient
          colors={['#FFE0B2', '#FFCC80']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cover}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#5d3200" />
          </TouchableOpacity>
          <Text style={styles.coverDate}>{dateLine}</Text>
          <Text style={styles.coverTitle}>☕ Daily Chai</Text>
          <Text style={styles.coverSub}>One sip of wisdom with Krishna · under a minute</Text>
        </LinearGradient>

        {/* Atom of the day */}
        <View style={styles.card}>
          <Text style={styles.cardTag}>{ATOM_TAGS[atom.type]}</Text>
          <Text style={styles.hook}>{atom.hook}</Text>
          <Text style={styles.body}>{atom.body}</Text>
          <Text style={styles.citation}>{atom.citation}</Text>
          {atom.link && (
            <TouchableOpacity style={styles.chip} onPress={openLink}>
              <Text style={styles.chipText}>{atom.link.label}</Text>
              <Ionicons name="arrow-forward" size={13} color={colors.primary.deepSaffron} />
            </TouchableOpacity>
          )}
        </View>

        {/* Verse of the day — English carries, Sanskrit ornaments */}
        <View style={styles.card}>
          <Text style={styles.cardTag}>Today's verse</Text>
          <Text style={styles.verseEnglish}>“{verse.english}”</Text>
          <Text style={styles.verseSanskrit} numberOfLines={2}>
            {verse.sanskrit}
          </Text>
          <Text style={styles.citation}>{verse.reference} · Sivananda translation</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity style={styles.chip} onPress={hearVerse}>
              <Ionicons
                name={speaking ? 'volume-high' : 'play'}
                size={13}
                color={colors.primary.deepSaffron}
              />
              <Text style={styles.chipText}>{speaking ? 'Playing…' : 'Hear it'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip} onPress={readInContext}>
              <Text style={styles.chipText}>Read in context</Text>
              <Ionicons name="arrow-forward" size={13} color={colors.primary.deepSaffron} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hand the thread to Krishna */}
        <View style={styles.card}>
          <Text style={styles.cardTag}>Carry it with you</Text>
          <Text style={styles.prompt}>“{atom.krishnaPrompt}”</Text>
          <TouchableOpacity style={[styles.chip, styles.chipTeal]} onPress={askKrishna}>
            <Text style={[styles.chipText, styles.chipTextTeal]}>Ask Krishna</Text>
            <Ionicons name="arrow-forward" size={13} color={colors.primary.peacockTeal} />
          </TouchableOpacity>
        </View>

        <Text style={styles.closing}>That's today's sip. Walk well. 🙏</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const { colors, typography, spacing, borderRadius } = DharmaDesignSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutrals.sandstoneBeige,
  },
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  cover: {
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginLeft: -spacing.xs,
    marginBottom: spacing.xs,
  },
  coverDate: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8a4b00',
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#5d3200',
    marginTop: 2,
    marginBottom: 4,
  },
  coverSub: {
    fontSize: 13,
    color: '#8a4b00',
  },
  card: {
    backgroundColor: colors.neutrals.white,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(230, 81, 0, 0.14)',
    padding: spacing.md + 2,
    marginBottom: spacing.md,
  },
  cardTag: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: colors.primary.deepSaffron,
    marginBottom: 6,
  },
  hook: {
    ...typography.sizes.headingSM,
    color: colors.neutrals.charcoalBlack,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: colors.neutrals.charcoalBlack,
    lineHeight: 23,
    marginBottom: 10,
  },
  citation: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.neutrals.softAsh,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: 'rgba(230, 81, 0, 0.35)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  chipTeal: {
    borderColor: 'rgba(0, 121, 107, 0.35)',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary.deepSaffron,
  },
  chipTextTeal: {
    color: colors.primary.peacockTeal,
  },
  verseEnglish: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
    color: colors.neutrals.charcoalBlack,
    marginBottom: 8,
  },
  verseSanskrit: {
    fontSize: 13,
    color: colors.neutrals.softAsh,
    marginBottom: 6,
  },
  prompt: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.neutrals.charcoalBlack,
    lineHeight: 23,
    marginBottom: 12,
  },
  closing: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.neutrals.softAsh,
    marginTop: spacing.sm,
  },
});

export default DailyChaiScreen;
