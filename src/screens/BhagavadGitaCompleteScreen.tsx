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
import { bhagavadGitaData } from '../data/bhagavadGitaData';
import { Chapter } from '../types/content';

const { width, height } = Dimensions.get('window');

const BhagavadGitaCompleteScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterPositions, setChapterPositions] = useState<{[key: number]: number}>({});

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

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    // Find which chapter is currently in view
    let currentChapterInView = 1;
    Object.keys(chapterPositions).forEach(chapterNum => {
      const chapterY = chapterPositions[parseInt(chapterNum)];
      if (scrollY >= chapterY - 100) { // 100px buffer for header
        currentChapterInView = parseInt(chapterNum);
      }
    });
    
    if (currentChapterInView !== currentChapter) {
      setCurrentChapter(currentChapterInView);
    }
  };

  const onChapterLayout = (chapterNumber: number) => (event: any) => {
    const { y } = event.nativeEvent.layout;
    setChapterPositions(prev => ({
      ...prev,
      [chapterNumber]: y
    }));
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

  const renderChapter = (chapter: Chapter) => {
    const chapterContent = getChapterContent(chapter.number);
    
    return (
      <View 
        key={chapter.id} 
        style={styles.chapterSection}
        onLayout={onChapterLayout(chapter.number)}
      >
        <Text style={getTextStyle(styles.chapterTitle)}>
          Chapter {chapter.number}: {chapter.name.english}
        </Text>
        <Text style={getTextStyle(styles.chapterSubtitle)}>
          {chapterContent.subtitle} • {getEstimatedReadingTime(chapter.number)} min read
        </Text>

        {/* Opening Sanskrit Verse */}
        <SanskritVerse
          sanskrit={chapterContent.openingVerse.sanskrit}
          transliteration={chapterContent.openingVerse.transliteration}
          meaning={chapterContent.openingVerse.meaning}
        />

        {/* Story Content */}
        <Text style={getTextStyle(styles.storyText)}>
          {chapterContent.storyText}
        </Text>

        {/* Section Header */}
        {chapterContent.sectionHeader && (
          <Text style={getTextStyle(styles.sectionHeader)}>{chapterContent.sectionHeader}</Text>
        )}

        {/* Key Teaching Verse */}
        {chapterContent.keyVerse && (
          <SanskritVerse
            sanskrit={chapterContent.keyVerse.sanskrit}
            transliteration={chapterContent.keyVerse.transliteration}
            meaning={chapterContent.keyVerse.meaning}
          />
        )}

        {/* Teaching Content */}
        {chapterContent.teachingText && (
          <Text style={getTextStyle(styles.storyText)}>
            {chapterContent.teachingText}
          </Text>
        )}
      </View>
    );
  };

  const getChapterContent = (chapterNumber: number) => {
    const chapterContentMap: {[key: number]: any} = {
      1: {
        subtitle: "Arjuna's Crisis of Faith",
        openingVerse: {
          sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः",
          transliteration: "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ",
          meaning: "On the field of dharma, on the field of the Kurus, assembled, desiring to fight"
        },
        storyText: "On the sacred field where right and wrong would be decided, two armies gathered, ready for war. This place, Kurukshetra, wasn't just any battlefield - it was a dharma-kshetra (field of righteousness) where the fate of dharma itself would be determined. Arjuna, the greatest warrior alive, stands between two massive armies ready for battle. But when he looks across the field, he sees his teachers, cousins, and friends on the other side. His heart breaks.",
        sectionHeader: "Arjuna's Despair",
        keyVerse: {
          sanskrit: "अर्जुन उवाच",
          transliteration: "arjuna uvāca",
          meaning: "Arjuna said"
        },
        teachingText: "When Arjuna spoke, his words revealed the deepest human struggle - what happens when our dharma (righteous duty) conflicts with our emotions and love for others. Overwhelmed with doubt and confusion, this mighty warrior sits down in his chariot, unable to fight. This is called vishada (deep despair) - when we're so confused about right and wrong that we can't act at all."
      },
      2: {
        subtitle: "The Secret of Who You Really Are",
        openingVerse: {
          sanskrit: "अशोच्यान्न्वशोचस्त्वं प्रज्ञावादांश्च भाषसे",
          transliteration: "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase",
          meaning: "You grieve for those who should not be grieved for, yet you speak words of wisdom"
        },
        storyText: "Krishna gently points out Arjuna's confusion: 'You're worried about the wrong things, even though you understand many wise concepts.' This is how viveka (discrimination between real and unreal) begins - learning what deserves our worry and what doesn't. Krishna gently explains the most important truth: 'Arjuna, you think you're just this body, but you're so much more. You are an eternal soul that never dies.'",
        sectionHeader: "The Eternal Soul Teaching",
        keyVerse: {
          sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि",
          transliteration: "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi",
          meaning: "As a person puts on new clothes, giving up old ones, the soul takes new bodies, giving up old ones"
        },
        teachingText: "Just like you change clothes when they get old, your atman (eternal soul) changes bodies. The real you - your consciousness, your essence - never dies. Understanding this truth about your atman frees you from the fear of death and the attachment to temporary things."
      },
      3: {
        subtitle: "The Path of Selfless Action",
        openingVerse: {
          sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्",
          transliteration: "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt",
          meaning: "Better is one's own duty, though imperfectly performed, than the duty of another well performed"
        },
        storyText: "Krishna teaches about karma yoga - the path of selfless action. 'Your dharma (duty) might not be perfect, but it's yours to fulfill. Don't try to copy someone else's path - that leads to confusion and fear.' This is about finding your authentic purpose and living it fully.",
        sectionHeader: "The Secret of Nishkama Karma",
        keyVerse: {
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
          transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana",
          meaning: "You have a right to perform your prescribed duty, but not to the fruits of action"
        },
        teachingText: "This is the golden key to happiness: Do your karma (action/duty) with love and skill, but don't demand specific results. This is nishkama karma (desireless action) - the secret to living without stress while still caring deeply about what you do."
      },
      4: {
        subtitle: "The Divine Teacher's Secret",
        openingVerse: {
          sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
          transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata",
          meaning: "Whenever there is decline in religious practice, O descendant of Bharata"
        },
        storyText: "Krishna reveals his divine nature and the cyclical nature of his appearances on Earth. 'I am not an ordinary person, Arjuna. I am the Divine itself, appearing in human form to guide you back to truth.'",
        sectionHeader: "The Avatar's Promise",
        keyVerse: {
          sanskrit: "अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्",
          transliteration: "abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
          meaning: "And a predominant rise of irreligion, at that time I descend Myself"
        },
        teachingText: "'Whenever dharma declines and adharma rises, I manifest myself to protect the good and establish righteousness.' This promise gives hope that divine help always comes when the world needs it most."
      },
      5: {
        subtitle: "Renunciation and Action United",
        openingVerse: {
          sanskrit: "संन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि",
          transliteration: "sannyāsaṁ karmaṇāṁ kṛṣṇa punar yogaṁ ca śaṁsasi",
          meaning: "O Krishna, you praise both renunciation of action and also the yoga of action"
        },
        storyText: "Arjuna is confused: 'Krishna, you're telling me to give up action, but also to act without attachment. Which path should I follow?' Krishna clarifies that both paths lead to the same destination, but the path of selfless action (karma yoga) is more practical for most people because complete renunciation requires perfect knowledge.",
        sectionHeader: "The Practical Path",
        keyVerse: {
          sanskrit: "सर्वारम्भपरित्यागी यो मद्भक्तः स मे प्रियः",
          transliteration: "sarvārambha-parityāgī yo mad-bhaktaḥ sa me priyaḥ",
          meaning: "One who renounces all material activities and is devoted to Me is very dear to Me"
        },
        teachingText: "The secret is not to stop acting, but to act without ego and attachment. When you work as an offering to the Divine, even ordinary tasks become spiritual practice. This transforms your entire life into yoga."
      },
      6: {
        subtitle: "The Science of Meditation",
        openingVerse: {
          sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्",
          transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet",
          meaning: "One should lift oneself by one's own efforts and should not degrade oneself"
        },
        storyText: "Krishna teaches the science of meditation and self-discipline. 'The mind can be your best friend or your worst enemy. A controlled mind leads to peace and self-realization, while an uncontrolled mind creates suffering.' He describes how to sit, how to breathe, and how to focus the mind.",
        sectionHeader: "The Perfect Yogi",
        keyVerse: {
          sanskrit: "योगी युञ्जीत सततमात्मानं रहसि स्थितः",
          transliteration: "yogī yuñjīta satatam ātmānaṁ rahasi sthitaḥ",
          meaning: "The yogi should constantly engage himself in meditation in a secluded place"
        },
        teachingText: "The ideal yogi is balanced in all situations - not too happy in success, not too sad in failure. Such a person has achieved yoga (union with the Divine) and sees the same divine presence in everyone."
      },
      7: {
        subtitle: "Knowing the Divine Nature",
        openingVerse: {
          sanskrit: "मय्यासक्तमनाः पार्थ योगं युञ्जन्मदाश्रयः",
          transliteration: "mayy āsakta-manāḥ pārtha yogaṁ yuñjan mad-āśrayaḥ",
          meaning: "O Arjuna, with mind attached to Me and taking shelter in Me"
        },
        storyText: "Krishna reveals his divine nature and how he pervades all of creation. 'I am the taste in water, Arjuna. I am the light in the moon and sun. I am the sound in ether and ability in humans. Everything you experience is actually My energy in different forms.'",
        sectionHeader: "The Divine in Everything",
        keyVerse: {
          sanskrit: "रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः",
          transliteration: "raso 'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ",
          meaning: "O Arjuna, I am the taste in water, the light in the moon and sun"
        },
        teachingText: "Understanding this divine presence everywhere helps us develop devotion naturally. When you see the Divine in everything, life becomes a constant meditation and every moment becomes sacred."
      },
      8: {
        subtitle: "Remembering the Divine",
        openingVerse: {
          sanskrit: "अक्षरं ब्रह्म परमं स्वभावोऽध्यात्ममुच्यते",
          transliteration: "akṣaraṁ brahma paramaṁ svabhāvo 'dhyātmam ucyate",
          meaning: "The indestructible, transcendental living entity is called Brahman"
        },
        storyText: "Krishna explains the Supreme Brahman and the importance of remembering the Divine, especially at the moment of death. 'Whatever you think of at death, that state you will attain. So remember Me always, and fight.'",
        sectionHeader: "The Moment of Death",
        keyVerse: {
          sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्",
          transliteration: "anta-kāle ca mām eva smaran muktvā kalevaram",
          meaning: "And whoever, at the time of death, remembers Me alone while giving up the body"
        },
        teachingText: "The practice is to remember the Divine throughout life, so it becomes natural at death. This constant remembrance (smaraṇa) transforms consciousness and leads to liberation."
      },
      9: {
        subtitle: "The Most Confidential Knowledge",
        openingVerse: {
          sanskrit: "इदं तु ते गुह्यतमं प्रवक्ष्याम्यनसूयवे",
          transliteration: "idaṁ tu te guhyatamaṁ pravakṣyāmy anasūyave",
          meaning: "I shall now declare to you this most confidential knowledge"
        },
        storyText: "This chapter reveals the most confidential knowledge - bhakti yoga, the path of pure devotion. Krishna shows his incredible mercy: 'Even if you make mistakes, even if you're not perfect, if you love Me with a sincere heart, I will take care of everything.'",
        sectionHeader: "The Easy Path",
        keyVerse: {
          sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति",
          transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati",
          meaning: "Whoever offers Me with devotion a leaf, a flower, fruit or water"
        },
        teachingText: "Krishna promises that whoever offers even a leaf, flower, fruit or water with love, he accepts. This means devotion matters more than expensive offerings. Love is the currency of the spiritual world."
      },
      10: {
        subtitle: "The Infinite Manifestations",
        openingVerse: {
          sanskrit: "भूय एव महाबाहो शृणु मे परमं वचः",
          transliteration: "bhūya eva mahā-bāho śṛṇu me paramaṁ vacaḥ",
          meaning: "Listen again, O mighty-armed Arjuna, to My supreme word"
        },
        storyText: "Krishna describes his various manifestations and opulences throughout creation. 'I am the beginning, middle and end of all beings. Among lights, I am the radiant sun. Among mountains, I am Meru. Among warriors, I am Arjuna.'",
        sectionHeader: "Recognizing the Divine Everywhere",
        keyVerse: {
          sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा",
          transliteration: "yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā",
          meaning: "Whatever opulent, beautiful or glorious manifestation you see"
        },
        teachingText: "This teaching helps devotees recognize the divine presence everywhere. When you see something beautiful, powerful, or wise, remember that it's a spark of Krishna's infinite nature."
      },
      11: {
        subtitle: "The Universal Form",
        openingVerse: {
          sanskrit: "दिव्यं ददामि ते चक्षुः पश्य मे योगमैश्वरम्",
          transliteration: "divyaṁ dadāmi te cakṣuḥ paśya me yogam aiśvaram",
          meaning: "I give you divine eyes; now behold My mystic opulence"
        },
        storyText: "Arjuna requests to see Krishna's universal form. Krishna grants him divine vision to behold the cosmic form - containing all of creation within it. Arjuna sees the entire universe, past, present and future, in Krishna's form. It's both magnificent and terrifying.",
        sectionHeader: "Divine Vision and Human Limitation",
        keyVerse: {
          sanskrit: "तेनैव रूपेण चतुर्भुजेन सहस्रबाहो भव विश्वमूर्ते",
          transliteration: "tenaiva rūpeṇa catur-bhujena sahasra-bāho bhava viśva-mūrte",
          meaning: "O universal form, O thousand-armed one, please appear in that four-armed form"
        },
        teachingText: "After seeing the cosmic form, Arjuna is overwhelmed and asks Krishna to return to his familiar human form. This teaches us that while the Divine is infinite, it also appears in personal, approachable forms out of love for devotees."
      },
      12: {
        subtitle: "The Path of Love",
        openingVerse: {
          sanskrit: "एवं सततयुक्ता ये भक्तास्त्वां पर्युपासते",
          transliteration: "evaṁ satata-yuktā ye bhaktās tvāṁ paryupāsate",
          meaning: "Those devotees who are always engaged in worshiping You with love"
        },
        storyText: "Krishna explains the superiority of devotional service over impersonal meditation. 'Those who worship Me with love are closer to perfection than those who try to meditate on the impersonal Divine. Love is easier and more natural than philosophical analysis.'",
        sectionHeader: "Qualities of Pure Devotees",
        keyVerse: {
          sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च",
          transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca",
          meaning: "One who is not envious but friendly and compassionate to all"
        },
        teachingText: "The qualities of pure devotees include being friendly to all, compassionate, forgiving, always satisfied, and surrendered to the Divine. These qualities naturally develop through devotional practice."
      },
      13: {
        subtitle: "The Field and the Knower",
        openingVerse: {
          sanskrit: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते",
          transliteration: "idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate",
          meaning: "This body, O Arjuna, is called the field"
        },
        storyText: "Krishna explains the distinction between the field (body) and the knower of the field (soul). 'Your body is like a field where experiences happen, but you - the consciousness - are the farmer who witnesses everything. Don't confuse the field with the farmer.'",
        sectionHeader: "True Knowledge",
        keyVerse: {
          sanskrit: "ज्ञानं ज्ञेयं ज्ञानगम्यं हृदि सर्वस्य धिष्ठितम्",
          transliteration: "jñānaṁ jñeyaṁ jñāna-gamyaṁ hṛdi sarvasya dhiṣṭhitam",
          meaning: "Knowledge, the object of knowledge, and the goal of knowledge are situated in the heart"
        },
        teachingText: "True knowledge means understanding the difference between the temporary (body, mind, emotions) and the eternal (soul, consciousness). This discrimination leads to freedom from suffering."
      },
      14: {
        subtitle: "The Three Modes of Nature",
        openingVerse: {
          sanskrit: "परं भूयः प्रवक्ष्यामि ज्ञानानां ज्ञानमुत्तमम्",
          transliteration: "paraṁ bhūyaḥ pravakṣyāmi jñānānāṁ jñānam uttamam",
          meaning: "I shall again explain the supreme knowledge, the best of all knowledge"
        },
        storyText: "Krishna describes the three modes of material nature - sattva (goodness), rajas (passion), and tamas (ignorance) - and how they influence our thoughts, feelings, and actions. 'Understanding these modes helps you transcend their influence and achieve spiritual freedom.'",
        sectionHeader: "Transcending the Modes",
        keyVerse: {
          sanskrit: "गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान्",
          transliteration: "guṇān etān atītya trīn dehī deha-samudbhavān",
          meaning: "When the embodied being transcends these three modes"
        },
        teachingText: "By transcending the three modes through devotional service, one achieves liberation even while living in the body. Such a person is unaffected by the dualities of material existence."
      },
      15: {
        subtitle: "The Tree of Material Existence",
        openingVerse: {
          sanskrit: "ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्",
          transliteration: "ūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam",
          meaning: "They speak of an eternal banyan tree with roots upward and branches downward"
        },
        storyText: "Krishna uses the metaphor of an upside-down banyan tree to describe material existence. 'This world is like a tree with roots in the spiritual realm and branches extending into matter. To find true happiness, you must trace back to the roots.'",
        sectionHeader: "The Supreme Person",
        keyVerse: {
          sanskrit: "यो मामेवमसम्मूढो जानाति पुरुषोत्तमम्",
          transliteration: "yo mām evam asammūḍho jānāti puruṣottamam",
          meaning: "Whoever knows Me thus as the Supreme Person, without doubting"
        },
        teachingText: "Krishna reveals himself as Purushottama - the Supreme Person who transcends both the fallible and infallible. He is the source and goal of all existence."
      },
      16: {
        subtitle: "Divine and Demonic Natures",
        openingVerse: {
          sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः",
          transliteration: "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ",
          meaning: "Fearlessness, purification of consciousness, cultivation of spiritual knowledge"
        },
        storyText: "Krishna contrasts divine and demonic natures. Divine qualities include fearlessness, purity, charity, self-control, and compassion. Demonic qualities include pride, arrogance, anger, and harshness. 'Cultivate divine qualities to progress spiritually.'",
        sectionHeader: "The Path to Liberation",
        keyVerse: {
          sanskrit: "दैवी सम्पद्विमोक्षाय निबन्धायासुरी मता",
          transliteration: "daivī sampad vimokṣāya nibandhāyāsurī matā",
          meaning: "Divine nature leads to liberation, while demonic nature leads to bondage"
        },
        teachingText: "The choice is always ours - we can cultivate divine qualities through spiritual practice, or fall into demonic patterns through selfishness and ignorance. Spiritual progress requires conscious effort to develop positive qualities."
      },
      17: {
        subtitle: "The Three Types of Faith",
        openingVerse: {
          sanskrit: "ये शास्त्रविधिमुत्सृज्य यजन्ते श्रद्धयान्विताः",
          transliteration: "ye śāstra-vidhim utsṛjya yajante śraddhayānvitāḥ",
          meaning: "Those who perform sacrifice with faith but disregard scriptural injunctions"
        },
        storyText: "Krishna explains that faith exists in three types according to the three modes of nature. Even people who don't follow scriptures have faith - but the quality of faith determines the results of their spiritual practices.",
        sectionHeader: "True and False Austerity",
        keyVerse: {
          sanskrit: "श्रद्धया परया तप्तं तपस्तत्त्रिविधं नरैः",
          transliteration: "śraddhayā parayā taptaṁ tapas tat tri-vidhaṁ naraiḥ",
          meaning: "This threefold austerity is performed by men with supreme faith"
        },
        teachingText: "True austerity purifies the mind and heart, while false austerity (motivated by ego or show) only increases suffering. The key is the intention behind spiritual practices."
      },
      18: {
        subtitle: "The Ultimate Teaching",
        openingVerse: {
          sanskrit: "संन्यासस्य महाबाहो तत्त्वमिच्छामि वेदितुम्",
          transliteration: "sannyāsasya mahā-bāho tattvam icchāmi veditum",
          meaning: "O mighty-armed one, I wish to understand the truth of renunciation"
        },
        storyText: "The final chapter synthesizes all teachings. Krishna addresses Arjuna's final questions about renunciation and provides the ultimate instruction. This is the culmination of all spiritual knowledge.",
        sectionHeader: "The Final Instruction",
        keyVerse: {
          sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
          transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
          meaning: "Abandon all varieties of religion and just surrender unto Me"
        },
        teachingText: "Krishna's final instruction: 'Give up all complex spiritual calculations and simply surrender to Me with love. I will take care of everything else.' This is sharanagati - complete surrender - the essence of all spiritual practice."
      }
    };
    
    // For chapters not specifically defined, create content from the chapter data
    const fallbackContent = {
      subtitle: bhagavadGitaData.find(ch => ch.number === chapterNumber)?.summary || "",
      openingVerse: {
        sanskrit: "ॐ",
        transliteration: "oṁ",
        meaning: "The sacred sound representing the Divine"
      },
      storyText: bhagavadGitaData.find(ch => ch.number === chapterNumber)?.summary || "",
      sectionHeader: null,
      keyVerse: null,
      teachingText: null
    };
    
    return chapterContentMap[chapterNumber] || fallbackContent;
  };

  const getEstimatedReadingTime = (chapterNumber: number): number => {
    // Estimated reading times based on chapter length
    const readingTimes: {[key: number]: number} = {
      1: 12, 2: 20, 3: 18, 4: 16, 5: 14, 6: 22, 7: 15, 8: 17, 9: 19,
      10: 21, 11: 25, 12: 16, 13: 18, 14: 15, 15: 17, 16: 14, 17: 16, 18: 24
    };
    return readingTimes[chapterNumber] || 15;
  };

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
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Book Cover */}
        <View style={styles.bookCover}>
          <Text style={getTextStyle(styles.bookTitle)}>Bhagavad Gita</Text>
          <Text style={getTextStyle(styles.bookSubtitle)}>Complete Story with Sacred Verses</Text>
        </View>

        {/* Dynamic Chapter Rendering */}
        {bhagavadGitaData.map(chapter => renderChapter(chapter))}

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