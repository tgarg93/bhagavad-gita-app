// The prayer library: liturgical text meant to be LEARNED, not just read —
// the "skills" content shape (learn-by-repetition). Each prayer carries its
// full text verse by verse (Devanagari + transliteration + meaning), an
// origin intro, and an honest attribution: scriptural mantras cite their
// locus; compositions name their author and century; folk aartis say
// "traditional" plainly.
//
// Ids are permanent (completion is keyed on 'prayer:<id>' in the
// content_completion map) — never rename one.

export type PrayerLanguage = 'sanskrit' | 'awadhi' | 'hindi' | 'marathi';

export interface PrayerVerse {
  id: string; // stable within the prayer: 'doha-1', 'chaupai-3', 'verse-1'
  label: string; // shown above the text: 'Opening Doha 1', 'Chaupai 3 of 40'
  devanagari: string;
  transliteration: string;
  meaning: string;
}

export interface PrayerIntroPage {
  title: string;
  text: string;
}

export interface Prayer {
  id: string; // 'hanuman-chalisa' → journey-style id 'prayer:hanuman-chalisa'
  title: string;
  subtitle: string;
  deityRef?: string; // content ref for "learn about the deity" ('deity:hanuman')
  language: PrayerLanguage;
  attribution: string; // the citation line shown on the cover and cards
  whenToRecite: string;
  intro: PrayerIntroPage[];
  verses: PrayerVerse[];
  lessonSize: number; // verses per learning chunk (bead-row grouping)
  // False while only the opening lessons are authored: the player teaches
  // what exists but does not mark the prayer complete in content_completion.
  complete: boolean;
  coverImage: number;
}

const GENERIC_COVER = require('../../assets/images/covers/generic-cover.jpg');
const COVER_MAHAMRITYUNJAYA = require('../../assets/images/covers/mahamrityunjaya-cover.jpg');
const COVER_HANUMAN_CHALISA = require('../../assets/images/covers/hanuman-chalisa-cover.jpg');

export const PRAYERS: Prayer[] = [
  {
    id: 'mahamrityunjaya',
    title: 'Mahamrityunjaya Mantra',
    subtitle: 'The great death-conquering mantra',
    deityRef: 'deity:shiva',
    language: 'sanskrit',
    attribution: 'Rig Veda 7.59.12 (also Yajur Veda, Rudradhyaya)',
    whenToRecite:
      'Traditionally recited for healing and protection — in illness, before surgery, in fear, at new beginnings, and on Maha Shivratri. Many recite it 108 times with a mala.',
    intro: [
      {
        title: 'The mantra that argues with death',
        text:
          'One verse from the Rig Veda, addressed to Shiva as Tryambaka, the three-eyed one. It does not ask for death to be cancelled — it asks for ripeness: as a cucumber, when fully ripe, slips effortlessly from the vine, may we come free of death’s grip and into immortality. Fear of the end, the mantra suggests, is the grip; ripeness is the release.',
      },
      {
        title: 'How to practice it',
        text:
          'Learn the sounds slowly — this is one of the few mantras where tradition prizes precise recitation. Listen to a line, repeat it, and only then join the lines. Once it is yours, it tends to surface on its own exactly when it is needed. This is one common way — ask your family how they recite it.',
      },
    ],
    verses: [
      {
        id: 'verse-1',
        label: 'The mantra',
        devanagari:
          'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
        transliteration:
          'oṁ tryambakaṁ yajāmahe\nsugandhiṁ puṣṭi-vardhanam\nurvārukam iva bandhanān\nmṛtyor mukṣīya māmṛtāt',
        meaning:
          'We worship the three-eyed one, fragrant presence, nourisher of all that grows. As the ripe cucumber slips free of the vine, may we be released from death — never from immortality.',
      },
    ],
    lessonSize: 1,
    complete: true,
    coverImage: COVER_MAHAMRITYUNJAYA,
  },
  {
    id: 'hanuman-chalisa',
    title: 'Hanuman Chalisa',
    subtitle: 'Forty verses of strength and devotion',
    deityRef: 'deity:hanuman',
    language: 'awadhi',
    attribution: 'Tulsidas, 16th century — composed in Awadhi',
    whenToRecite:
      'Recited on Tuesdays and Saturdays, in difficulty or fear, and daily by millions. Tradition holds that Hanuman is present wherever his glory is sung.',
    intro: [
      {
        title: 'Forty verses, four hundred years',
        text:
          'Chalis means forty: forty chaupais (quatrains) framed by opening and closing dohas (couplets), composed by the poet-saint Tulsidas — the author of the Ramcharitmanas — in Awadhi, the Hindi of the Ramayana heartland. Tradition tells that Tulsidas composed it in confinement and that its recitation freed him; the story is legend, told as such, and the prayer’s power in daily Hindu life is simple fact. It may be the most-recited devotional text on earth.',
      },
      {
        title: 'How to learn it',
        text:
          'Nobody learns the Chalisa in a day — it is learned four verses at a time, the way it has always been passed down: by hearing, repeating, and returning. The verses rhyme and the meter carries you; after a few lessons the lines begin completing themselves. Learn a lesson, recite it for a few days, then add the next. This is one common way — ask your family how they learned it.',
      },
    ],
    verses: [
      {
        id: 'doha-1',
        label: 'Opening Doha 1',
        devanagari:
          'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।\nबरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥',
        transliteration:
          'śrī guru charana saroja raja\nnija manu mukuru sudhāri\nbaranaũ raghubara bimala jasu\njo dāyaku phala chāri',
        meaning:
          'With the dust of my Guru’s lotus feet I polish the mirror of my mind, and tell the unstained glory of Rama, best of the Raghus — the giver of life’s four fruits.',
      },
      {
        id: 'doha-2',
        label: 'Opening Doha 2',
        devanagari:
          'बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार ।\nबल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥',
        transliteration:
          'buddhi-hīna tanu jānike\nsumirauṁ pavana-kumāra\nbala budhi bidyā dehu mohiṁ\nharahu kalesa bikāra',
        meaning:
          'Knowing myself to be without wisdom, I remember the Son of the Wind: grant me strength, intelligence, and knowledge; take from me affliction and flaw.',
      },
      {
        id: 'chaupai-1',
        label: 'Chaupai 1 of 40',
        devanagari: 'जय हनुमान ज्ञान गुन सागर ।\nजय कपीस तिहुँ लोक उजागर ॥',
        transliteration: 'jaya hanumāna jñāna guna sāgara\njaya kapīsa tihuṁ loka ujāgara',
        meaning:
          'Victory to Hanuman, ocean of wisdom and virtue; victory to the lord of the vanaras, who lights up the three worlds.',
      },
      {
        id: 'chaupai-2',
        label: 'Chaupai 2 of 40',
        devanagari: 'राम दूत अतुलित बल धामा ।\nअंजनि-पुत्र पवनसुत नामा ॥',
        transliteration: 'rāma dūta atulita bala dhāmā\nañjani-putra pavana-suta nāmā',
        meaning:
          'Messenger of Rama, home of measureless strength; son of Anjani, named Son of the Wind.',
      },
      {
        id: 'chaupai-3',
        label: 'Chaupai 3 of 40',
        devanagari: 'महाबीर बिक्रम बजरंगी ।\nकुमति निवार सुमति के संगी ॥',
        transliteration: 'mahābīra bikrama bajaraṅgī\nkumati nivāra sumati ke saṅgī',
        meaning:
          'Great hero, mighty, thunderbolt-limbed; remover of wrong thinking, companion of good sense.',
      },
      {
        id: 'chaupai-4',
        label: 'Chaupai 4 of 40',
        devanagari: 'कंचन बरन बिराज सुबेसा ।\nकानन कुंडल कुंचित केसा ॥',
        transliteration: 'kañchana barana birāja subesā\nkānana kuṇḍala kuñchita kesā',
        meaning: 'Golden-hued and splendidly adorned, earrings at his ears, hair in curls.',
      },
      {
        id: 'chaupai-5',
        label: 'Chaupai 5 of 40',
        devanagari: 'हाथ बज्र औ ध्वजा बिराजै ।\nकाँधे मूँज जनेऊ साजै ॥',
        transliteration: 'hātha bajra au dhvajā birājai\nkāṁdhe mūṁja janeū sājai',
        meaning:
          'In his hands shine the mace and the banner; across his shoulder, the sacred thread of munja grass.',
      },
      {
        id: 'chaupai-6',
        label: 'Chaupai 6 of 40',
        devanagari: 'संकर सुवन केसरीनंदन ।\nतेज प्रताप महा जग बंदन ॥',
        transliteration: 'saṅkara suvana kesarī-nandana\nteja pratāpa mahā jaga bandana',
        meaning:
          'Born of Shiva’s blessing, delight of Kesari; his radiance and majesty the whole world honors.',
      },
      {
        id: 'chaupai-7',
        label: 'Chaupai 7 of 40',
        devanagari: 'विद्यावान गुनी अति चातुर ।\nराम काज करिबे को आतुर ॥',
        transliteration: 'vidyāvāna gunī ati chātura\nrāma kāja karibe ko ātura',
        meaning: 'Learned, virtuous, supremely able — and ever eager to do Rama’s work.',
      },
      {
        id: 'chaupai-8',
        label: 'Chaupai 8 of 40',
        devanagari: 'प्रभु चरित्र सुनिबे को रसिया ।\nराम लखन सीता मन बसिया ॥',
        transliteration: 'prabhu charitra sunibe ko rasiyā\nrāma lakhana sītā mana basiyā',
        meaning:
          'He savors every telling of the Lord’s story; Rama, Lakshmana, and Sita live in his heart.',
      },
      {
        id: 'chaupai-9',
        label: 'Chaupai 9 of 40',
        devanagari: 'सूक्ष्म रूप धरि सियहिं दिखावा ।\nबिकट रूप धरि लंक जरावा ॥',
        transliteration: 'sūkṣma rūpa dhari siyahiṁ dikhāvā\nbikaṭa rūpa dhari laṅka jarāvā',
        meaning: 'In a tiny form he appeared before Sita; in a terrible form he burned Lanka.',
      },
      {
        id: 'chaupai-10',
        label: 'Chaupai 10 of 40',
        devanagari: 'भीम रूप धरि असुर सँहारे ।\nरामचंद्र के काज सँवारे ॥',
        transliteration: 'bhīma rūpa dhari asura sam̐hāre\nrāmachandra ke kāja sam̐vāre',
        meaning: 'In a mighty form he destroyed the demons and set Rama’s work right.',
      },
      {
        id: 'chaupai-11',
        label: 'Chaupai 11 of 40',
        devanagari: 'लाय सजीवन लखन जियाये ।\nश्रीरघुबीर हरषि उर लाये ॥',
        transliteration: 'lāya sajīvana lakhana jiyāye\nśrī raghubīra haraṣi ura lāye',
        meaning:
          'He brought the sanjivani herb and revived Lakshmana; overjoyed, Rama pressed him to his heart.',
      },
      {
        id: 'chaupai-12',
        label: 'Chaupai 12 of 40',
        devanagari: 'रघुपति कीन्ही बहुत बड़ाई ।\nतुम मम प्रिय भरतहि सम भाई ॥',
        transliteration: 'raghupati kīnhī bahuta baṛāī\ntuma mama priya bharatahi sama bhāī',
        meaning:
          'The lord of the Raghus praised him greatly: “You are as dear to me as my brother Bharata.”',
      },
      {
        id: 'chaupai-13',
        label: 'Chaupai 13 of 40',
        devanagari: 'सहस बदन तुम्हरो जस गावैं ।\nअस कहि श्रीपति कंठ लगावैं ॥',
        transliteration: 'sahasa badana tumharo jasa gāvaiṁ\nasa kahi śrīpati kaṇṭha lagāvaiṁ',
        meaning: '“A thousand mouths shall sing your glory” — so saying, Rama drew him into an embrace.',
      },
      {
        id: 'chaupai-14',
        label: 'Chaupai 14 of 40',
        devanagari: 'सनकादिक ब्रह्मादि मुनीसा ।\nनारद सारद सहित अहीसा ॥',
        transliteration: 'sanakādika brahmādi munīsā\nnārada sārada sahita ahīsā',
        meaning:
          'Sanaka and the ancient sages, Brahma and the lords of ascetics, Narada, Saraswati, and the king of serpents —',
      },
      {
        id: 'chaupai-15',
        label: 'Chaupai 15 of 40',
        devanagari: 'जम कुबेर दिगपाल जहाँ ते ।\nकबि कोबिद कहि सके कहाँ ते ॥',
        transliteration: 'jama kubera digapāla jahām̐ te\nkabi kobida kahi sake kahām̐ te',
        meaning:
          'Yama, Kubera, the guardians of the directions — where is the poet or scholar who could tell your full glory?',
      },
      {
        id: 'chaupai-16',
        label: 'Chaupai 16 of 40',
        devanagari: 'तुम उपकार सुग्रीवहिं कीन्हा ।\nराम मिलाय राज पद दीन्हा ॥',
        transliteration: 'tuma upakāra sugrīvahiṁ kīnhā\nrāma milāya rāja pada dīnhā',
        meaning:
          'You did Sugriva the great kindness: you brought him to Rama, and his kingship was restored.',
      },
      {
        id: 'chaupai-17',
        label: 'Chaupai 17 of 40',
        devanagari: 'तुम्हरो मंत्र बिभीषन माना ।\nलंकेस्वर भए सब जग जाना ॥',
        transliteration: 'tumharo mantra bibhīṣana mānā\nlaṅkesvara bhae saba jaga jānā',
        meaning: 'Vibhishana heeded your counsel and became lord of Lanka — the whole world knows it.',
      },
      {
        id: 'chaupai-18',
        label: 'Chaupai 18 of 40',
        devanagari: 'जुग सहस्र जोजन पर भानू ।\nलील्यो ताहि मधुर फल जानू ॥',
        transliteration: 'juga sahasra jojana para bhānū\nlīlyo tāhi madhura phala jānū',
        meaning: 'The sun, thousands of yojanas away — you swallowed it, taking it for a sweet fruit.',
      },
      {
        id: 'chaupai-19',
        label: 'Chaupai 19 of 40',
        devanagari: 'प्रभु मुद्रिका मेलि मुख माहीं ।\nजलधि लाँघि गये अचरज नाहीं ॥',
        transliteration: 'prabhu mudrikā meli mukha māhīṁ\njaladhi lām̐ghi gaye acharaja nāhīṁ',
        meaning: 'With the Lord’s ring held in your mouth you leapt the ocean — no wonder at all.',
      },
      {
        id: 'chaupai-20',
        label: 'Chaupai 20 of 40',
        devanagari: 'दुर्गम काज जगत के जेते ।\nसुगम अनुग्रह तुम्हरे तेते ॥',
        transliteration: 'durgama kāja jagata ke jete\nsugama anugraha tumhare tete',
        meaning: 'Every difficult task in this world becomes easy by your grace.',
      },
      {
        id: 'chaupai-21',
        label: 'Chaupai 21 of 40',
        devanagari: 'राम दुआरे तुम रखवारे ।\nहोत न आज्ञा बिनु पैसारे ॥',
        transliteration: 'rāma duāre tuma rakhavāre\nhota na ājñā binu paisāre',
        meaning: 'You are the keeper of Rama’s door; none enters without your leave.',
      },
      {
        id: 'chaupai-22',
        label: 'Chaupai 22 of 40',
        devanagari: 'सब सुख लहै तुम्हारी सरना ।\nतुम रच्छक काहू को डर ना ॥',
        transliteration: 'saba sukha lahai tumhārī saranā\ntuma racchaka kāhū ko ḍara nā',
        meaning: 'All joys come to those in your refuge; with you as protector, there is nothing to fear.',
      },
      {
        id: 'chaupai-23',
        label: 'Chaupai 23 of 40',
        devanagari: 'आपन तेज सम्हारो आपै ।\nतीनों लोक हाँक तें काँपै ॥',
        transliteration: 'āpana teja samhāro āpai\ntīnoṁ loka hām̐ka teṁ kām̐pai',
        meaning: 'You alone can contain your own radiance; the three worlds tremble at your roar.',
      },
      {
        id: 'chaupai-24',
        label: 'Chaupai 24 of 40',
        devanagari: 'भूत पिसाच निकट नहिं आवै ।\nमहाबीर जब नाम सुनावै ॥',
        transliteration: 'bhūta pisācha nikaṭa nahiṁ āvai\nmahābīra jaba nāma sunāvai',
        meaning: 'Ghosts and goblins come nowhere near when the great hero’s name is spoken.',
      },
      {
        id: 'chaupai-25',
        label: 'Chaupai 25 of 40',
        devanagari: 'नासै रोग हरै सब पीरा ।\nजपत निरंतर हनुमत बीरा ॥',
        transliteration: 'nāsai roga harai saba pīrā\njapata nirantara hanumata bīrā',
        meaning:
          'Disease is destroyed and every pain lifted for the one who constantly repeats brave Hanuman’s name.',
      },
      {
        id: 'chaupai-26',
        label: 'Chaupai 26 of 40',
        devanagari: 'संकट तें हनुमान छुड़ावै ।\nमन क्रम बचन ध्यान जो लावै ॥',
        transliteration: 'saṅkaṭa teṁ hanumāna chhuṛāvai\nmana krama bachana dhyāna jo lāvai',
        meaning:
          'Hanuman frees from every crisis those who turn to him in thought, deed, and word.',
      },
      {
        id: 'chaupai-27',
        label: 'Chaupai 27 of 40',
        devanagari: 'सब पर राम तपस्वी राजा ।\nतिन के काज सकल तुम साजा ॥',
        transliteration: 'saba para rāma tapasvī rājā\ntina ke kāja sakala tuma sājā',
        meaning: 'Over all reigns Rama, the ascetic king — and all his work, you carried out.',
      },
      {
        id: 'chaupai-28',
        label: 'Chaupai 28 of 40',
        devanagari: 'और मनोरथ जो कोई लावै ।\nसोइ अमित जीवन फल पावै ॥',
        transliteration: 'aura manoratha jo koī lāvai\nsoi amita jīvana phala pāvai',
        meaning: 'Whoever brings any longing to you gains the fruit of life without limit.',
      },
      {
        id: 'chaupai-29',
        label: 'Chaupai 29 of 40',
        devanagari: 'चारों जुग परताप तुम्हारा ।\nहै परसिद्ध जगत उजियारा ॥',
        transliteration: 'chāroṁ juga paratāpa tumhārā\nhai parasiddha jagata ujiyārā',
        meaning: 'Your glory fills all four ages; your light is famed throughout the world.',
      },
      {
        id: 'chaupai-30',
        label: 'Chaupai 30 of 40',
        devanagari: 'साधु संत के तुम रखवारे ।\nअसुर निकंदन राम दुलारे ॥',
        transliteration: 'sādhu santa ke tuma rakhavāre\nasura nikandana rāma dulāre',
        meaning: 'Guardian of sadhus and saints, uprooter of demons, beloved of Rama.',
      },
      {
        id: 'chaupai-31',
        label: 'Chaupai 31 of 40',
        devanagari: 'अष्ट सिद्धि नौ निधि के दाता ।\nअस बर दीन जानकी माता ॥',
        transliteration: 'aṣṭa siddhi nau nidhi ke dātā\nasa bara dīna jānakī mātā',
        meaning:
          'Giver of the eight attainments and the nine treasures — such was the boon Mother Janaki granted you.',
      },
      {
        id: 'chaupai-32',
        label: 'Chaupai 32 of 40',
        devanagari: 'राम रसायन तुम्हरे पासा ।\nसदा रहो रघुपति के दासा ॥',
        transliteration: 'rāma rasāyana tumhare pāsā\nsadā raho raghupati ke dāsā',
        meaning:
          'You hold the elixir of Rama’s name; may you remain forever the servant of the Raghu lord.',
      },
      {
        id: 'chaupai-33',
        label: 'Chaupai 33 of 40',
        devanagari: 'तुम्हरे भजन राम को पावै ।\nजनम जनम के दुख बिसरावै ॥',
        transliteration: 'tumhare bhajana rāma ko pāvai\njanama janama ke dukha bisarāvai',
        meaning:
          'Singing of you, one reaches Rama himself, and the sorrows of birth after birth are forgotten.',
      },
      {
        id: 'chaupai-34',
        label: 'Chaupai 34 of 40',
        devanagari: 'अन्तकाल रघुबर पुर जाई ।\nजहाँ जन्म हरिभक्त कहाई ॥',
        transliteration: 'antakāla raghubara pura jāī\njahām̐ janma hari-bhakta kahāī',
        meaning:
          'At the end, one goes to Rama’s own city — and wherever born again, is known as the Lord’s devotee.',
      },
      {
        id: 'chaupai-35',
        label: 'Chaupai 35 of 40',
        devanagari: 'और देवता चित्त न धरई ।\nहनुमत सेइ सर्ब सुख करई ॥',
        transliteration: 'aura devatā chitta na dharaī\nhanumata sei sarba sukha karaī',
        meaning:
          'No need to hold a crowd of gods in mind — serving Hanuman, every happiness follows.',
      },
      {
        id: 'chaupai-36',
        label: 'Chaupai 36 of 40',
        devanagari: 'संकट कटै मिटै सब पीरा ।\nजो सुमिरै हनुमत बलबीरा ॥',
        transliteration: 'saṅkaṭa kaṭai miṭai saba pīrā\njo sumirai hanumata balabīrā',
        meaning:
          'Crisis is cut away and every pain erased for the one who remembers mighty Hanuman.',
      },
      {
        id: 'chaupai-37',
        label: 'Chaupai 37 of 40',
        devanagari: 'जय जय जय हनुमान गोसाईं ।\nकृपा करहु गुरुदेव की नाईं ॥',
        transliteration: 'jaya jaya jaya hanumāna gosāīṁ\nkṛpā karahu gurudeva kī nāīṁ',
        meaning: 'Victory, victory, victory, Lord Hanuman! Bestow your grace as a guru does.',
      },
      {
        id: 'chaupai-38',
        label: 'Chaupai 38 of 40',
        devanagari: 'जो सत बार पाठ कर कोई ।\nछूटहि बंदि महा सुख होई ॥',
        transliteration: 'jo sata bāra pāṭha kara koī\nchhūṭahi bandi mahā sukha hoī',
        meaning:
          'Whoever recites this a hundred times is freed from every bondage, and great joy follows.',
      },
      {
        id: 'chaupai-39',
        label: 'Chaupai 39 of 40',
        devanagari: 'जो यह पढ़ै हनुमान चालीसा ।\nहोय सिद्धि साखी गौरीसा ॥',
        transliteration: 'jo yaha paṛhai hanumāna chālīsā\nhoya siddhi sākhī gaurīsā',
        meaning:
          'Whoever reads this Hanuman Chalisa attains fulfillment — Shiva himself stands witness.',
      },
      {
        id: 'chaupai-40',
        label: 'Chaupai 40 of 40',
        devanagari: 'तुलसीदास सदा हरि चेरा ।\nकीजै नाथ हृदय महँ डेरा ॥',
        transliteration: 'tulasīdāsa sadā hari cherā\nkījai nātha hṛdaya maham̐ ḍerā',
        meaning:
          'Tulsidas, forever the Lord’s servant, prays: O master, make your home in my heart.',
      },
      {
        id: 'doha-closing',
        label: 'Closing Doha',
        devanagari:
          'पवनतनय संकट हरन मंगल मूरति रूप ।\nराम लखन सीता सहित हृदय बसहु सुर भूप ॥',
        transliteration:
          'pavana-tanaya saṅkaṭa harana\nmaṅgala mūrati rūpa\nrāma lakhana sītā sahita\nhṛdaya basahu sura bhūpa',
        meaning:
          'Son of the Wind, remover of crisis, embodiment of all that is auspicious: with Rama, Lakshmana, and Sita, come dwell in my heart, king among the gods.',
      },
    ],
    lessonSize: 4,
    complete: true,
    coverImage: COVER_HANUMAN_CHALISA,
  },
  {
    id: 'om-namah-shivaya',
    title: 'Om Namah Shivaya',
    subtitle: 'The five-syllable mantra',
    deityRef: 'deity:shiva',
    language: 'sanskrit',
    attribution: 'The panchakshara — rooted in the Shri Rudram, Yajur Veda (Taittiriya Samhita 4.5.8)',
    whenToRecite:
      'Anytime — it is the mantra Shaivas carry through the day. Especially recited on Mondays, during Shravan, and on Maha Shivratri, often 108 times on a rudraksha mala.',
    intro: [
      {
        title: 'Five syllables',
        text:
          'Na-mah-shi-va-ya: five syllables the tradition treats as a complete map — the five elements, the five senses, the whole of a person folded into one bow. It sits at the heart of the Shri Rudram, the Yajur Veda’s great hymn to Rudra, where “namah shivaya” appears as the axis of the entire chant. Whole schools of Shaiva thought have been built on unpacking what these five syllables contain.',
      },
      {
        title: 'How to practice it',
        text:
          'This is the easiest mantra to begin with because it asks nothing but repetition. Say it slowly — let each syllable have its own beat. Many keep it running under the breath while walking or waiting; many count 108 on a mala morning or evening. This is one common way — ask your family how they recite it.',
      },
    ],
    verses: [
      {
        id: 'verse-1',
        label: 'The mantra',
        devanagari: 'ॐ नमः शिवाय',
        transliteration: 'oṁ namaḥ śivāya',
        meaning: 'Om — I bow to Shiva, the auspicious one; the stillness at the center of all things.',
      },
    ],
    lessonSize: 1,
    complete: true,
    coverImage: GENERIC_COVER,
  },
  {
    id: 'shanti-mantras',
    title: 'Shanti Mantras',
    subtitle: 'The peace invocations of the Upanishads',
    language: 'sanskrit',
    attribution: 'Upanishadic invocations — Taittiriya/Katha Upanishad and Isha Upanishad',
    whenToRecite:
      'Before study, at the start and close of gatherings, and whenever the mind needs settling. Each ends with shanti spoken three times — peace from the world, from others, and from oneself.',
    intro: [
      {
        title: 'Why peace is said three times',
        text:
          'The Upanishads open and close with these invocations, and each ends the same way: “Om, shantih, shantih, shantih.” The tradition reads the three as three directions disturbance comes from — the world around us (adhibhautika), forces beyond us (adhidaivika), and our own mind and body (adhyatmika). Peace is asked for from all three, because losing any one of them is enough to lose the lesson.',
      },
      {
        title: 'How to practice them',
        text:
          'These are prayers for beginnings — recite one before you study, read, or start something that matters, the way teacher and student once said them together before a lesson. Slow is better than fluent; the pauses are part of the prayer. This is one common way — ask your family how they say them.',
      },
    ],
    verses: [
      {
        id: 'saha-navavatu',
        label: 'Saha Navavatu — the teacher-student prayer',
        devanagari:
          'ॐ सह नाववतु ।\nसह नौ भुनक्तु ।\nसह वीर्यं करवावहै ।\nतेजस्वि नावधीतमस्तु\nमा विद्विषावहै ।\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration:
          'oṁ saha nāvavatu\nsaha nau bhunaktu\nsaha vīryaṁ karavāvahai\ntejasvi nāvadhītam astu\nmā vidviṣāvahai\noṁ śāntiḥ śāntiḥ śāntiḥ',
        meaning:
          'May it protect us both, teacher and student. May it nourish us both. May we work together with vigor; may what we study shine. May we never resent each other. Om — peace, peace, peace.',
      },
      {
        id: 'purnamadah',
        label: 'Purnamadah — the fullness verse',
        devanagari:
          'ॐ पूर्णमदः पूर्णमिदं\nपूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय\nपूर्णमेवावशिष्यते ।\nॐ शान्तिः शान्तिः शान्तिः ॥',
        transliteration:
          'oṁ pūrṇam adaḥ pūrṇam idaṁ\npūrṇāt pūrṇam udachyate\npūrṇasya pūrṇam ādāya\npūrṇam evāvaśiṣyate\noṁ śāntiḥ śāntiḥ śāntiḥ',
        meaning:
          'That is whole; this is whole. From the whole, the whole arises. Take the whole from the whole — and the whole alone remains. Om — peace, peace, peace.',
      },
    ],
    lessonSize: 1,
    complete: true,
    coverImage: GENERIC_COVER,
  },
  {
    id: 'om-jai-jagdish',
    title: 'Om Jai Jagdish Hare',
    subtitle: 'The aarti sung in every home',
    language: 'hindi',
    attribution: 'Shardha Ram Phillauri, 1870s — a modern composition, and honestly so',
    whenToRecite:
      'The closing aarti of countless family pujas — sung at the lamp-waving that ends worship, on festival evenings, and at satsangs across every tradition and region.',
    intro: [
      {
        title: 'The newest ancient prayer',
        text:
          'It feels timeless, and it is barely 150 years old: Shardha Ram Phillauri, a Punjabi writer and reformer, composed it in the 1870s, and it spread until nearly every Hindu household ended its puja with it. That history is worth knowing, not hiding — the tradition has always grown this way. A prayer becomes ancient not by its date but by how many hearts have worn it smooth.',
      },
      {
        title: 'How to sing it',
        text:
          'It is sung, not recited — to one melody almost everyone knows, while the aarti lamp circles. Learn it stanza by stanza; the refrain returns after each, so the song teaches itself. This is one common way — ask your family which stanzas they sing.',
      },
    ],
    verses: [
      {
        id: 'stanza-1',
        label: 'Refrain & Stanza 1',
        devanagari:
          'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे ।\nभक्त जनों के संकट, क्षण में दूर करे ॥',
        transliteration:
          'om jaya jagadīśa hare\nsvāmī jaya jagadīśa hare\nbhakta janoṁ ke saṅkaṭa\nkṣaṇa meṁ dūra kare',
        meaning:
          'Om, victory to the Lord of the universe! The troubles of your devotees you dissolve in an instant.',
      },
      {
        id: 'stanza-2',
        label: 'Stanza 2',
        devanagari:
          'जो ध्यावे फल पावे, दुख बिनसे मन का ।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का ॥',
        transliteration:
          'jo dhyāve phala pāve\ndukha binase mana kā\nsukha sampatti ghara āve\nkaṣṭa miṭe tana kā',
        meaning:
          'Whoever turns the mind to you receives the fruit: the heart’s sorrow ends, joy and plenty enter the home, the body’s suffering fades.',
      },
      {
        id: 'stanza-3',
        label: 'Stanza 3',
        devanagari:
          'मात पिता तुम मेरे, शरण गहूँ मैं किसकी ।\nतुम बिन और न दूजा, आस करूँ मैं जिसकी ॥',
        transliteration:
          'māta pitā tuma mere\nśaraṇa gahūm̐ maiṁ kisakī\ntuma bina aura na dūjā\nāsa karūm̐ maiṁ jisakī',
        meaning:
          'You are my mother and my father — whose refuge else would I take? Besides you there is no other in whom I place my hope.',
      },
      {
        id: 'stanza-4',
        label: 'Stanza 4',
        devanagari:
          'तुम पूरण परमात्मा, तुम अंतरयामी ।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी ॥',
        transliteration:
          'tuma pūraṇa paramātmā\ntuma antarayāmī\npārabrahma parameśvara\ntuma sabake svāmī',
        meaning:
          'You are the complete supreme soul, the knower who dwells within; supreme Brahman, highest Lord, master of all.',
      },
      {
        id: 'stanza-5',
        label: 'Stanza 5',
        devanagari:
          'तुम करुणा के सागर, तुम पालनकर्ता ।\nमैं मूरख खल कामी, कृपा करो भर्ता ॥',
        transliteration:
          'tuma karuṇā ke sāgara\ntuma pālanakartā\nmaiṁ mūrakha khala kāmī\nkṛpā karo bhartā',
        meaning:
          'You are the ocean of compassion, the sustainer of all; I am foolish, flawed, and full of craving — grant me your grace, protector.',
      },
      {
        id: 'stanza-6',
        label: 'Stanza 6',
        devanagari:
          'तुम हो एक अगोचर, सबके प्राणपति ।\nकिस विधि मिलूँ दयामय, तुमको मैं कुमति ॥',
        transliteration:
          'tuma ho eka agochara\nsabake prāṇapati\nkisa vidhi milūm̐ dayāmaya\ntumako maiṁ kumati',
        meaning:
          'You are the one no eye can see, the lord of every breath; by what path shall I, dull of mind, reach you, O merciful one?',
      },
      {
        id: 'stanza-7',
        label: 'Stanza 7',
        devanagari:
          'दीनबन्धु दुखहर्ता, ठाकुर तुम मेरे ।\nअपने हाथ उठाओ, द्वार पड़ा तेरे ॥',
        transliteration:
          'dīnabandhu dukhahartā\nṭhākura tuma mere\napane hātha uṭhāo\ndvāra paṛā tere',
        meaning:
          'Friend of the lowly, remover of sorrow, you are my master; raise your hand in blessing — I lie at your door.',
      },
      {
        id: 'stanza-8',
        label: 'Stanza 8',
        devanagari:
          'विषय विकार मिटाओ, पाप हरो देवा ।\nश्रद्धा भक्ति बढ़ाओ, संतन की सेवा ॥',
        transliteration:
          'viṣaya vikāra miṭāo\npāpa haro devā\nśraddhā bhakti baṛhāo\nsantana kī sevā',
        meaning:
          'Erase craving and its distortions, take away my wrongdoing; deepen my faith, my devotion, and my service of the good.',
      },
    ],
    lessonSize: 2,
    complete: true,
    coverImage: GENERIC_COVER,
  },
  {
    id: 'sukhkarta-dukhharta',
    title: 'Sukhkarta Dukhharta',
    subtitle: 'The Ganesha aarti of Maharashtra',
    deityRef: 'deity:ganesha',
    language: 'marathi',
    attribution: 'Samarth Ramdas, 17th century — composed in Marathi',
    whenToRecite:
      'Sung at Ganesh Chaturthi and at the start of household aartis across Maharashtra — traditionally the first aarti, because Ganesha is honored first.',
    intro: [
      {
        title: 'The saint who sang to the remover of obstacles',
        text:
          'Samarth Ramdas — the 17th-century Marathi saint remembered as Shivaji’s spiritual teacher — is credited with this aarti, and tradition tells that it came to him in a single inspired sitting before Ganesha. Four centuries later it opens the aarti sequence in millions of Marathi homes, and during Ganesh Chaturthi entire neighborhoods sing it in one voice.',
      },
      {
        title: 'How to sing it',
        text:
          'The melody rises with the refrain — jaya deva, jaya deva — and everyone joins there even if they don’t know the stanzas. Learn the refrain first, then the stanzas one at a time. This is one common way — ask your family how they sing it.',
      },
    ],
    verses: [
      {
        id: 'stanza-1',
        label: 'Stanza 1',
        devanagari:
          'सुखकर्ता दुखहर्ता वार्ता विघ्नाची ।\nनुरवी पुरवी प्रेम कृपा जयाची ।\nसर्वांगी सुंदर उटी शेंदुराची ।\nकंठी झळके माळ मुक्ताफळांची ॥',
        transliteration:
          'sukhakartā dukhahartā vārtā vighnāchī\nnuravī puravī prema kṛpā jayāchī\nsarvāṅgī sundara uṭī śendurāchī\nkaṇṭhī jhaḷake māḷa muktāphaḷāṁchī',
        meaning:
          'Giver of joy, remover of sorrow, who ends all talk of obstacles and fills us with love and grace; beautiful in every limb, anointed with vermilion, a garland of pearls gleaming at his throat.',
      },
      {
        id: 'refrain',
        label: 'Refrain',
        devanagari:
          'जय देव जय देव जय मंगलमूर्ती ।\nदर्शनमात्रे मनकामना पुरती ॥',
        transliteration:
          'jaya deva jaya deva\njaya maṅgalamūrtī\ndarśanamātre manakāmanā puratī',
        meaning:
          'Victory, victory to the god, the embodiment of auspiciousness — one glimpse of you fulfills the heart’s desires.',
      },
      {
        id: 'stanza-2',
        label: 'Stanza 2',
        devanagari:
          'रत्नखचित फरा तुज गौरीकुमरा ।\nचंदनाची उटी कुंकुमकेशरा ।\nहिरेजडित मुकुट शोभतो बरा ।\nरुणझुणती नूपुरे चरणी घागरिया ॥',
        transliteration:
          'ratnakhachita pharā tuja gaurīkumarā\nchandanāchī uṭī kuṅkumakeśarā\nhirejaḍita mukuṭa śobhato barā\nruṇajhuṇatī nūpure charaṇī ghāgariyā',
        meaning:
          'A jewel-studded seat for you, son of Gauri; sandal paste with kumkum and saffron; a diamond-set crown shines upon you; anklets and bells chime at your feet.',
      },
      {
        id: 'stanza-3',
        label: 'Stanza 3',
        devanagari:
          'लंबोदर पीतांबर फणिवरबंधना ।\nसरळ सोंड वक्रतुंड त्रिनयना ।\nदास रामाचा वाट पाहे सदना ।\nसंकटी पावावे निर्वाणी रक्षावे सुरवरवंदना ॥',
        transliteration:
          'lambodara pītāmbara phaṇivarabandhanā\nsaraḷa soṇḍa vakratuṇḍa trinayanā\ndāsa rāmāchā vāṭa pāhe sadanā\nsaṅkaṭī pāvāve nirvāṇī rakṣāve suravaravandanā',
        meaning:
          'Great-bellied one robed in yellow silk, girdled by the king of serpents; straight of trunk, curved of face, three-eyed; Ramdas your servant watches for you at the door — come in times of crisis, protect at the very end, O you whom the gods honor.',
      },
    ],
    lessonSize: 2,
    complete: true,
    coverImage: GENERIC_COVER,
  },
  {
    id: 'aarti-kunj-bihari',
    title: 'Aarti Kunj Bihari Ki',
    subtitle: 'The Krishna aarti of the groves',
    deityRef: 'deity:krishna',
    language: 'hindi',
    attribution: 'Traditional Krishna aarti of the Braj region — author unrecorded, cited as such',
    whenToRecite:
      'Sung at Krishna temples and home shrines, especially on Janmashtami and through the month of Shravan — the aarti of Vrindavan’s beloved.',
    intro: [
      {
        title: 'An aarti that paints a portrait',
        text:
          'Most aartis praise; this one paints. Stanza by stanza it dresses Krishna before your eyes — the vaijayanti garland, the flute at his lips, the peacock crown, Radha at his side — until the listener is standing in a Vrindavan grove. No author’s name survives; it belongs to the Braj tradition that produced a thousand such songs and signed none of them.',
      },
      {
        title: 'How to sing it',
        text:
          'The refrain — “āratī kuñjabihārī kī” — returns after every stanza, and the verses tumble quickly; learn the refrain until it is effortless, then add stanzas at your own pace. This is one common way — ask your family which verses they sing.',
      },
    ],
    verses: [
      {
        id: 'refrain',
        label: 'Refrain',
        devanagari:
          'आरती कुंजबिहारी की ।\nश्री गिरिधर कृष्ण मुरारी की ॥',
        transliteration:
          'āratī kuñjabihārī kī\nśrī giridhara kṛṣṇa murārī kī',
        meaning:
          'The aarti of the one who wanders the groves — of Giridhar, lifter of the mountain; of Krishna, vanquisher of Mura.',
      },
      {
        id: 'stanza-1',
        label: 'Stanza 1',
        devanagari:
          'गले में बैजंती माला, बजावै मुरली मधुर बाला ।\nश्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला ॥',
        transliteration:
          'gale meṁ baijantī mālā\nbajāvai muralī madhura bālā\nśravaṇa meṁ kuṇḍala jhalakālā\nnanda ke ānanda nandalālā',
        meaning:
          'The vaijayanti garland at his neck, the young one plays his honeyed flute; earrings flash at his ears — Nandlala, the joy of Nanda’s house.',
      },
      {
        id: 'stanza-2',
        label: 'Stanza 2',
        devanagari:
          'गगन सम अंग कांति काली, राधिका चमक रही आली ।\nलतन में ठाढ़े बनमाली, भ्रमर सी अलक, कस्तूरी तिलक, चंद्र सी झलक ॥',
        transliteration:
          'gagana sama aṅga kānti kālī\nrādhikā chamaka rahī ālī\nlatana meṁ ṭhāṛhe banamālī\nbhramara sī alaka, kastūrī tilaka, chandra sī jhalaka',
        meaning:
          'His skin glows dark as the monsoon sky, and beside him Radhika shines; the forest-garlanded one stands among the vines — curls black as bees, a musk tilak, a gleam like the moon.',
      },
      {
        id: 'stanza-3',
        label: 'Stanza 3',
        devanagari:
          'कनकमय मोर मुकुट बिलसै, देवता दरसन को तरसैं ।\nगगन सों सुमन रासि बरसै, बजे मुरचंग, मधुर मिरदंग, ग्वालिन संग ॥',
        transliteration:
          'kanakamaya mora mukuṭa bilasai\ndevatā darasana ko tarasaiṁ\ngagana soṁ sumana rāsi barasai\nbaje murachaṅga, madhura miradaṅga, gvālina saṅga',
        meaning:
          'His golden peacock crown gleams; the gods themselves ache for a glimpse; heaps of blossoms rain from the sky as the jaw-harp and sweet mridang sound among the cowherd girls.',
      },
      {
        id: 'stanza-4',
        label: 'Stanza 4',
        devanagari:
          'जहां ते प्रकट भई गंगा, कलुष कलि हारिणि श्रीगंगा ।\nस्मरन ते होत मोह भंगा, बसी शिव सीस, जटा के बीच, हरै अघ कीच ॥',
        transliteration:
          'jahāṁ te prakaṭa bhaī gaṅgā\nkaluṣa kali hāriṇi śrī gaṅgā\nsmarana te hota moha bhaṅgā\nbasī śiva sīsa, jaṭā ke bīcha, harai agha kīcha',
        meaning:
          'From his feet the Ganga sprang — the holy river that carries off this age’s stains; remembering him, delusion breaks; she dwells on Shiva’s head, amid his locks, washing away the mire of wrongdoing.',
      },
    ],
    lessonSize: 2,
    complete: true,
    coverImage: GENERIC_COVER,
  },
];

export const getPrayerById = (id: string): Prayer | undefined =>
  PRAYERS.find(p => p.id === id);

// Lesson index (0-based) a verse belongs to, per the prayer's lessonSize
export const lessonOfVerse = (prayer: Prayer, verseIndex: number): number =>
  Math.floor(verseIndex / Math.max(1, prayer.lessonSize));

export const lessonCount = (prayer: Prayer): number =>
  Math.ceil(prayer.verses.length / Math.max(1, prayer.lessonSize));
