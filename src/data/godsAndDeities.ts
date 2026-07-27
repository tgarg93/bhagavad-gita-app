// Gods and Deities Data for Dharma App
// Comprehensive collection of Hindu deities with mythology, teachings, and cultural significance

import { NarrativeSection, SourceNote } from './narrativeTypes';

export interface Deity {
  id: string;
  name: string;
  sanskritName: string;
  titles: string[]; // Various names/epithets
  category: 'major' | 'avatars' | 'goddesses' | 'celestial' | 'regional';
  description: string;
  mythology: string; // Rich story background
  attributes: string[]; // Key characteristics
  symbols: string[]; // Associated symbols/objects
  mantras: Mantra[];
  prayers: Prayer[];
  iconography: Iconography;
  teachings: string[]; // Core teachings/lessons
  festivals: string[]; // Festival IDs associated with this deity
  scriptureReferences: ScriptureReference[];
  stories: Story[];
  worship: WorshipDetails;
  audioUrl?: string; // Pronunciation guide
  podcastEpisodes: PodcastEpisode[];
  significance: string;
  modernRelevance: string;
  familyConnections: FamilyConnection[]; // Relationships with other deities
  regionalVariations: RegionalVariation[];
  images: {
    heroImage: string | number; // remote path or require()'d bundled asset
    iconImage: string;
    galleryImages: string[];
  };
  // Narrative reading experience (Gita-style sections) — seed content only
  sections?: NarrativeSection[];
  // Primary texts the content was verified against (rendered as a footer card)
  sources?: SourceNote[];
  // Reflection questions: one plain, concrete question (two only when the
  // content genuinely has two distinct hooks) — answerable from daily life
  reflectionQuestions?: string[];
  // ——— Jigyasu interstitials (optional; render on presence — see readerContent).
  // learnItems + kind:'intro'/'waypoint' sections light the framing pages; the
  // deity's `stories` stay a narrative coda after the teaching sections. ———
  kicker?: string;
  learnItems?: string[];
  bankedTakeaways?: string[];
  handoff?: string;
}

export interface Mantra {
  id: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  purpose: string; // When to chant this mantra
  benefits: string[];
  audioUrl?: string;
}

export interface Prayer {
  id: string;
  name: string;
  text: string;
  language: 'sanskrit' | 'hindi' | 'english';
  occasion: string;
  benefits: string[];
}

export interface Iconography {
  appearance: string; // Physical description
  clothing: string;
  colors: string[];
  objects: string[]; // Items held/associated
  vehicle: string; // Vahana
  posture: string;
  facesAndArms: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  moralLesson: string;
  category: 'origin' | 'adventure' | 'teaching' | 'miracle';
  relatedScripture?: string;
  audioUrl?: string;
}

export interface WorshipDetails {
  bestTimes: string[];
  offerings: string[];
  rituals: string[];
  fasting: string[];
  pilgrimage: string[];
  dailyPractices: string[];
}

export interface FamilyConnection {
  relationTo: string; // Deity ID
  relationship: string; // Father, consort, avatar, etc.
  description: string;
}

export interface RegionalVariation {
  region: string;
  localName: string;
  uniqueAspects: string[];
  localTraditions: string[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  topics: string[];
}

export interface ScriptureReference {
  id: string;
  text: 'bhagavad_gita' | 'ramayana' | 'mahabharata' | 'puranas' | 'vedas' | 'upanishads';
  chapter?: number;
  verse?: number;
  section?: string;
  relevance: string;
  quote?: string;
}

// Major Hindu Deities Data
export const deitiesData: Deity[] = [
  {
    id: 'krishna',
    name: 'Krishna',
    sanskritName: 'कृष्ण',
    titles: ['Govinda', 'Gopala', 'Madhava', 'Vasudeva', 'Yadunandana', 'Murari'],
    category: 'major',
    description: 'Divine teacher and eighth avatar of Vishnu',
    mythology: 'Krishna, born in Mathura to Devaki and Vasudeva, was raised by foster parents Nanda and Yashoda in Vrindavan. His childhood was filled with divine miracles - from lifting the Govardhan hill to protect villagers from Indra\'s wrath, to his enchanting flute playing that captivated all living beings. As a youth, he performed the Raas Lila with the gopis, symbolizing the soul\'s longing for the divine. Later, as a prince and warrior, he served as Arjuna\'s charioteer in the Kurukshetra war, delivering the profound teachings of the Bhagavad Gita that form the philosophical foundation of Hindu thought.',
    attributes: ['Divine Love', 'Wisdom', 'Protection', 'Joy', 'Compassion', 'Righteousness'],
    symbols: ['Flute', 'Peacock Feather', 'Discus (Sudarshan Chakra)', 'Conch Shell', 'Lotus', 'Cow'],
    mantras: [
      {
        id: 'krishna-main-mantra',
        sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
        transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare',
        meaning: 'O Lord Krishna, O Lord Rama, please engage me in your service',
        purpose: 'For spiritual purification and divine connection',
        benefits: ['Mental peace', 'Spiritual awakening', 'Protection from negativity', 'Divine love'],
        audioUrl: '/audio/mantras/hare-krishna.mp3'
      },
      {
        id: 'krishna-gayatri',
        sanskrit: 'ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि। तन्नो कृष्ण प्रचोदयात्॥',
        transliteration: 'Om Devakinandanaya Vidmahe Vasudevaya Dhimahi, Tanno Krishna Prachodayat',
        meaning: 'We meditate on the son of Devaki, we focus on Vasudeva, may Krishna inspire and guide us',
        purpose: 'For wisdom and spiritual guidance',
        benefits: ['Enhanced wisdom', 'Divine guidance', 'Spiritual strength', 'Clarity of thought']
      }
    ],
    prayers: [
      {
        id: 'krishna-morning-prayer',
        name: 'Morning Invocation to Krishna',
        text: 'O Krishna, dark-complexioned one, dressed in yellow silk, with lotus eyes and peacock feather crown, destroyer of sins, protector of devotees, grant me your divine love and guidance throughout this day.',
        language: 'english',
        occasion: 'Daily morning worship',
        benefits: ['Divine protection', 'Spiritual strength', 'Inner joy']
      }
    ],
    iconography: {
      appearance: 'Dark blue or black complexioned, eternally youthful, enchantingly beautiful',
      clothing: 'Yellow or saffron dhoti, ornate jewelry',
      colors: ['Dark Blue', 'Yellow', 'Saffron'],
      objects: ['Flute', 'Sudarshan Chakra', 'Conch Shell'],
      vehicle: 'Garuda (sometimes shown)',
      posture: 'Often standing in tribhanga (three-curve pose) while playing flute',
      facesAndArms: 'One face, two arms (sometimes shown with multiple arms in divine form)'
    },
    teachings: [
      'Perform your duty without attachment to results (Nishkama Karma)',
      'Surrender to the divine will while taking action',
      'Love and devotion (Bhakti) are the highest paths to realization',
      'The soul is eternal and beyond birth and death',
      'See the divine in all beings and treat all equally',
      'Balance material responsibilities with spiritual growth'
    ],
    festivals: ['janmashtami-2025', 'holi-2025', 'govardhan-puja-2025'],
    scriptureReferences: [
      {
        id: 'bg-krishna-1',
        text: 'bhagavad_gita',
        chapter: 4,
        verse: 7,
        relevance: 'Krishna explains his divine incarnation',
        quote: 'Whenever dharma declines and adharma increases, I manifest myself'
      },
      {
        id: 'krishna-mahabharata',
        text: 'mahabharata',
        section: 'Udyoga Parva',
        relevance: 'Krishna as peace ambassador',
        quote: 'Peace is the highest virtue, peace is the highest tapas'
      }
    ],
    stories: [
      {
        id: 'govardhan-lift',
        title: 'Lifting Govardhan Hill',
        content: 'For as long as anyone could remember, the village of Vrindavan had sent its harvest up to Indra, the god who rules the sky and sends the rains, hoping he would send the monsoon gently. Then a cowherd boy asked a dangerous question: why thank the far-off sky-god, when it is Govardhan, the local hill, whose grass feeds the cows and whose springs fill the water-pots? So the village turned its offering to the hill instead.\n\nIndra\'s answer was fury. He loosed the clouds of the world\'s end: seven days of rain like thrown spears, rivers climbing the doorsteps, the sky gone black at noon. Cattle bawled in the rising flood, and the whole village ran to the boy who had started it.\n\nKrishna walked out to Govardhan, crouched, and lifted the entire hill on the little finger of his left hand. And there it hung — a roof of dripping stone over every man, woman, calf, and bird of Vrindavan, while the deluge shattered against its far side and ran away harmless. Seven days he held it up, and did not tire. On the seventh, Indra\'s thunder ran out before the boy\'s patience did, and the king of the gods came down through his own spent clouds to bow before a child.',
        moralLesson: 'Honour what actually sustains you, not what merely demands tribute. And real shelter covers everyone under one roof, without first asking who deserves it.',
        category: 'miracle',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapters 24–25'
      },
      {
        id: 'krishna-mouthful-of-universe',
        title: 'The Universe in His Mouth',
        content: 'One day the village boys came running to Yashoda, the woman raising Krishna as her own, with a complaint: your son has been eating dirt again. Caught, Krishna denied it with a toddler\'s wounded innocence — but his mother was not fooled. "Open your mouth," she said. And he did.\n\nInside that small, muddy mouth she saw it all: the wheeling galaxies and the dark between them, the oceans and the mountains, the turning of the seasons and of time itself — and Vrindavan, and the very house she was standing in, and herself standing in it, looking into the mouth of her son who somehow held her too. For one unbearable moment the cowherd mother beheld the whole of everything.\n\nThen Krishna, out of nothing but kindness, drew his veil of mother-love back across her eyes, and she forgot. She blinked, lifted her boy onto her hip, and worried only whether he had eaten enough.',
        moralLesson: 'The infinite hides inside the ordinary things we scold and feed and put to bed. And forgetting can be a mercy: love needs someone to hold, not everything to comprehend.',
        category: 'miracle',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapter 8'
      },
      {
        id: 'krishna-kaliya',
        title: 'Dancing on the Serpent',
        content: 'A monstrous serpent named Kaliya had made his home in the deepest pool of the river Yamuna, and his venom had turned the water black. The trees along the bank stood leafless and dead; birds that flew too low over it dropped out of the air. The whole village had learned to keep away.\n\nKrishna climbed a tree on the bank, and dived straight in.\n\nKaliya came for him in a storm of coils, wound the boy tight, and dragged him under. At the water\'s edge the villagers wept, certain he was lost. Then the coils began to strain — the boy was swelling, growing, until the grip that should have crushed him simply broke apart. Krishna rose to the surface, stepped up onto the serpent\'s crowd of hoods, and began to dance. Each time a head reared in defiance his foot came down on it in rhythm, and one by one the hoods sank, until Kaliya — beaten, and understanding at last — bowed. From the black water his serpent-wives rose with folded hands to sing for the dancer. Krishna spared him, and sent him far off, to waters where his poison could reach no one.',
        moralLesson: 'What poisons your waters must be confronted — but the goal is the poison\'s end, not the poisoner\'s destruction. Grace defeats venom by dancing on it, not by becoming it.',
        category: 'adventure',
        relatedScripture: 'Bhagavata Purana, Canto 10, Chapter 16'
      }
    ],
    worship: {
      bestTimes: ['Early morning (Brahma Muhurta)', 'Sunset', 'Midnight (birth time)'],
      offerings: ['Butter', 'Milk', 'Tulsi leaves', 'Yellow flowers', 'Sweets', 'Fruits'],
      rituals: ['Aarti', 'Bhajan singing', 'Flute playing', 'Reading Bhagavad Gita'],
      fasting: ['Ekadashi', 'Janmashtami', 'Mondays'],
      pilgrimage: ['Vrindavan', 'Mathura', 'Dwarka', 'Kurukshetra'],
      dailyPractices: ['Chanting Hare Krishna mantra', 'Reading Gita verses', 'Offering food before eating']
    },
    audioUrl: '/audio/pronunciation/krishna.mp3',
    podcastEpisodes: [
      {
        id: 'krishna-ep-1',
        title: 'Understanding Krishna: The Divine Cowherd',
        description: 'Exploring the childhood stories of Krishna and their spiritual significance',
        duration: '45 minutes',
        audioUrl: '/podcasts/krishna-childhood.mp3',
        topics: ['Vrindavan life', 'Miracles', 'Divine play', 'Spiritual lessons']
      }
    ],
    significance: 'Krishna represents the perfect balance of divine transcendence and human relatability, teaching us how to live spiritually while fulfilling worldly duties',
    modernRelevance: 'In our complex modern world, Krishna\'s teachings on duty, ethics, and spiritual living provide practical guidance for navigating career, relationships, and personal growth while maintaining inner peace and purpose',
    familyConnections: [
      {
        relationTo: 'vishnu',
        relationship: 'Avatar',
        description: 'Krishna is considered the eighth and most complete avatar of Vishnu'
      },
      {
        relationTo: 'radha',
        relationship: 'Divine Consort',
        description: 'Radha represents the soul\'s devotion to Krishna, the supreme divine'
      }
    ],
    regionalVariations: [
      {
        region: 'Bengal',
        localName: 'Kanha',
        uniqueAspects: ['Focus on childhood stories', 'Radha-Krishna devotion'],
        localTraditions: ['Jhulan Yatra', 'Kirtan', 'Raas festival']
      },
      {
        region: 'Gujarat',
        localName: 'Ranchhod',
        uniqueAspects: ['Dwarkadhish form', 'Royal aspect'],
        localTraditions: ['Janmashtami celebrations', 'Govardhan Puja', 'Annakut']
      }
    ],
    images: {
      heroImage: require('../../assets/images/covers/krishna-cover.jpg'),
      iconImage: '/images/deities/krishna-icon.jpg',
      galleryImages: [
        '/images/deities/krishna-flute.jpg',
        '/images/deities/krishna-govardhan.jpg',
        '/images/deities/krishna-gita.jpg'
      ]
    },
    kicker: "The playful cowherd boy who grows up to become God's own voice in the Bhagavad Gita.",
    learnItems: [
      'Krishna is God in human form — and somehow all of God at once',
      'God chose an ordinary, barefoot childhood',
      'God wants your love, not your offerings',
      'An empty reed makes the music — and so can an emptied life',
      'God takes the reins, but the fight stays yours',
    ],
    handoff:
      'Krishna is the divine at play, holding nothing back. The next avatar holds everything to a single line he will not cross, whatever it costs him. That is Rama.',
    sections: [
      {
        id: 'krishna-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Krishna is one of the most loved gods in Hinduism, and one of the hardest to sum up. He is a mischievous child, a young cowherd, a friend, a lover — and, grown up, the guide who speaks Hinduism's most famous scripture on a battlefield.\n\nOver the next few pages you'll meet him from the very beginning, and see why so many people feel God is easiest to love in his form.",
      },
      {
        id: 'krishna-whole-divine',
        title: 'Who Krishna Is',
        subtitle: 'God, born as a cowherd boy',
        takeaway:
          'Krishna is Vishnu — the god who protects the world — born as a human being. And unlike most gods, who stand for one thing, he somehow seems to be all of God at once.',
        storyText:
          "Hindus picture God as having three great jobs: making the world, protecting it, and dissolving it so it can begin again. The protector is called **Vishnu**. When the world is in trouble, Hindus believe Vishnu comes down and is born as a living being, usually a human. Such a birth is called an **avatar**, which simply means 'a coming-down.' There have been several, and Krishna is considered the fullest and most complete of them all.\n\nWhat makes Krishna special is how much he holds at once. Most gods stand for a single quality, like power, or wisdom, or destruction. Krishna is the giggling baby stealing butter **and** the vast power behind the whole universe. He is the flute-playing village boy everyone adores **and** the calm teacher on a battlefield.\n\nSo you never have to choose between a God who is close and lovable and a God who is awesome and infinite. Krishna is both, in one person.",
        teachingText:
          'That is the heart of why people love him. In Krishna, God is not saved up for solemn, serious moments. He turns up in play, in mischief, in music, and in ordinary love, just as much as in prayer or scripture.',
        citation: 'Krishna as the most complete avatar of Vishnu: Bhagavata Purana, Canto 10.',
        checks: [
          {
            id: 'chk:deity:krishna:whole-divine',
            kind: 'mcq',
            prompt: 'What do Krishna\'s devotees find special about him among the many Hindu gods?',
            options: [
              {
                text: 'He seems to hold all of God at once — the lovable child and the cosmic power, in one person',
                correct: true,
              },
              { text: 'That he is the only real god and all the others are false' },
              { text: 'That he never actually took a human form' },
            ],
            why: 'Most gods stand for a single quality. Krishna is the butter-stealing baby and the force behind the universe at the same time, which is why people say you never have to choose between a God who is near and one who is vast.',
          },
        ],
      },
      {
        id: 'krishna-prison-to-pasture',
        title: 'Born in a Prison, Raised in a Pasture',
        subtitle: 'A Basket Crossing the Yamuna at Midnight',
        takeaway:
          'God could have been born a prince. Instead he grew up barefoot among cowherds — which means your own ordinary life is good enough for the divine.',
        storyText:
          "Before Krishna was even born, a cruel king named **Kamsa** was warned by a prophecy that his sister's eighth son would one day kill him. So he threw his sister and her husband in prison and killed each baby they had. But when the eighth child, Krishna, was born at midnight, something impossible happened: the prison locks fell open on their own, the guards dropped into a deep sleep, and his father slipped out and carried him across a flooding river to safety.\n\nHe was hidden away in **Gokul**, and later **Vrindavan** — small villages of **cowherds** (families who raise and herd cattle) on the banks of the river Yamuna. And there the rescued god simply grew up. Not in a palace plotting his revenge, but barefoot and butter-smeared: herding cows, playing in the fields, adored by everyone around him.",
        teachingText:
          'It is a quiet but radical idea. If God himself spent years herding cattle and stealing butter before he ever spoke a word of scripture, then your own unglamorous stretches, like the commute, the childcare, the forgettable years, are not just the waiting room before your real life begins. They may be the part heaven loves most.',
        citationLink: 'festival:janmashtami-2025',
        citation: 'Bhagavata Purana, Canto 10, Chapters 1–4 (the birth), 5–10 (Gokul).'
      },
      {
        id: 'krishna-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'The whole of the divine, and it chose a cowherd village to grow up in. Next, the tradition\'s most cherished paradox: the Lord of the universe, sneaking butter.',
      },
      {
        id: 'krishna-butter-and-love',
        title: 'The Thief Who Steals Only from Those Who Love Him',
        subtitle: 'A Toppled Pot, White Footprints Leading Away',
        takeaway:
          "God isn't won over by grand offerings — he is hungry for your love, and he'd rather take it playfully. Here, prayer is just leaving a door open for him.",
        storyText:
          "As a boy, Krishna was a shameless butter thief. The **gopis** — the cowherd women and girls of the village — would hang their butter pots high from the ceiling to keep them safe, and he would build a wobbling tower of friends to reach them. They would lock their doors, and somehow he was inside anyway. They would march to his mother to complain about him, and then secretly hope he would come raid **their** kitchen next.\n\nThe poets who told these stories knew exactly what they meant by them. Butter is churned slowly out of milk, the sweetness drawn from a whole day's patient work, not unlike the love that gathers in a person's heart. And Krishna steals butter only from the homes that love him. Where there is no love, he does not so much as step inside.",
        teachingText:
          'It turns the usual idea of worship on its head. God is not fed by your gifts and rituals; he is after your love, and he would rather snatch it playfully than be handed it in a formal ceremony. In these villages, prayer was not grand ritual. It was leaving the window unlatched.',
        citation: 'Butter-thief episodes: Bhagavata Purana, Canto 10, Chapters 8–9.',
        checks: [
          {
            id: 'chk:deity:krishna:butter',
            kind: 'mcq',
            prompt: 'Krishna steals butter only from homes that love him, and will not enter where there is none. What does this turn upside down?',
            options: [
              {
                text: "The usual idea of worship — God isn't won by your offerings, he is hungry for your love, and takes it playfully",
                correct: true,
              },
              { text: 'That stealing is fine as long as you are a god' },
              { text: 'That the gods need constant formal worship to stay happy' },
            ],
            why: 'Butter is churned slowly from a whole day of work, a little like the love in a heart. Krishna takes it only where there is love. In these villages, prayer was not ceremony; it was leaving the window unlatched.',
          },
        ],
      },
      {
        id: 'krishna-flute',
        title: 'The Sound That Calls Everyone Home',
        subtitle: 'A Bamboo Flute at Dusk, Cows Turning Their Heads',
        takeaway:
          "A flute only makes music because it's hollow. Empty yourself the same way, and something greater can play through you.",
        storyText:
          "Of all the images of Krishna, the tradition loves the **flute** the most. At dusk he would stand and play, and the old stories say the whole world leaned in to listen: the cows lifting their heads, the river slowing, people setting down whatever was in their hands.\n\nThe saints found a lesson in the instrument itself. A flute is nothing but a length of bamboo that has been **hollowed out**, emptied, and pierced with a few holes. It makes music only because it is empty. Whoever empties themselves in the same way, they said, lets the breath of God play through them.",
        teachingText:
          'So it asks an honest question: what is clogging you, so the music cannot get through? Pride, grasping, and fear are the blockages in the reed. The practices in this app, like reflecting, letting go, and remembering, are the slow hollowing-out. And the promise is that an emptied life does not end up empty. It becomes an instrument.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 21 (the Venu Gita).'
      },
      {
        id: 'krishna-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'The child, the beloved, the hollow reed. One image remains, and it is the one you will reach for when your own war comes.',
      },
      {
        id: 'krishna-charioteer',
        title: 'The God Who Took the Reins',
        subtitle: 'Two Armies Waiting, a Conversation Beginning',
        takeaway:
          "When your hardest battle comes, God won't fight it for you — but he'll sit beside you, hold the reins, and tell you the truth.",
        keyVerse: {
          sanskrit: 'ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति। भ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया॥',
          transliteration: 'īśhvaraḥ sarva-bhūtānāṁ hṛid-deśhe \'rjuna tiṣhṭhati, bhrāmayan sarva-bhūtāni yantrārūḍhāni māyayā',
          meaning: 'The Lord dwells in the hearts of all beings, O Arjuna, causing all beings to revolve by His power, as if mounted on a machine.',
          source: 'Bhagavad Gita 18.61 (tr. Swami Sivananda)'
        },
        storyText:
          "When Krishna grew up, a great war came. On one side stood a warrior named **Arjuna**, sick at heart because the enemy army was full of his own cousins, teachers, and friends. Offered a choice between Krishna's entire army or Krishna alone and unarmed, Arjuna chose the unarmed Krishna.\n\nAnd Krishna became his **charioteer**, the driver of his war-chariot. He picked up no weapon. He held the horses steady, and there in the no-man's-land between the two armies, as Arjuna froze in despair, Krishna turned and spoke to him. That conversation is the **Bhagavad Gita**, Hinduism's best-loved scripture. Near its end, Krishna tells Arjuna where he has secretly been the whole time: in the heart of every living being.",
        teachingText:
          'That picture is the promise. God does not fight your battles for you, and does not leave you to fight them alone. He sits at the front of your chariot, holding the reins, steadying you, and telling you the truth exactly when you are ready to give up. The fighting is still yours. But you are not driving alone.',
        checks: [
          {
            id: 'chk:deity:krishna:charioteer',
            kind: 'mcq',
            prompt: "Krishna drove Arjuna's chariot but picked up no weapon of his own. What is the promise in Krishna as a charioteer?",
            options: [
              {
                text: 'God will not fight your battle for you, and will not leave you alone in it — he steadies you and tells you the truth, but the fighting is still yours',
                correct: true,
              },
              { text: 'That God will win every battle for you if you just ask' },
              { text: 'That you should avoid every conflict in life' },
            ],
            why: 'A charioteer holds the reins and steadies the fighter, but does not fight in his place. Krishna guides Arjuna and, near the end, tells him he has been in his heart all along.',
          },
        ],
      },
      {
        id: 'krishna-tales-intro',
        title: 'Three Tales of Krishna',
        subtitle: 'The teachings, now in motion',
        storyText:
          "You've met the teachings. Now meet Krishna in action.\n\nWhat follow are three of the best-loved stories ever told about him: a hill lifted on one finger, a mother who saw the whole universe inside her child's mouth, and a boy who danced on a deadly serpent. Each one brings a teaching you've just met to life.",
      }
    ],
    sources: [
      {
        text: 'Bhagavata Purana (Srimad Bhagavatam)',
        locator: 'Canto 10 — Chapters 1–4 (birth), 8 (universe in his mouth), 16 (Kaliya), 21 (the flute), 24–25 (Govardhan)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
        url: 'https://vedabase.io/en/library/sb/10/8/',
      },
      {
        text: 'Bhagavad Gita',
        appLink: 'gita:18',
        locator: '18.61 (the Lord in all hearts); the Gita entire as Krishna\'s teaching at Kurukshetra',
        translation: 'Swami Sivananda (public domain)',
      },
    ],
    reflectionQuestions: [
      'Krishna spent years on ordinary village chores before speaking the Gita. What ordinary part of your day deserves more care?',
      'Krishna takes love playfully, not formally. Where could you leave a window unlatched — offer your care to someone without ceremony?',
      'In your own hardest battle, would you rather a god who fights it for you, or one who takes the reins and stays beside you — and why?',
    ]
  },
  {
    id: 'rama',
    name: 'Rama',
    sanskritName: 'राम',
    titles: ['Maryada Purushottama', 'Raghunandan', 'Raghupati', 'Sita Ram'],
    category: 'major',
    description: 'Seventh avatar of Vishnu embodying perfect dharma',
    mythology: 'Prince Rama of Ayodhya, born to King Dasharatha and Queen Kausalya, lived the perfect life of dharma. His story, told in the epic Ramayana, includes his exile for 14 years, the abduction of his wife Sita by the demon king Ravana, the alliance with Hanuman and the vanaras (monkeys), the great battle in Lanka, and Sita\'s rescue. Rama\'s life exemplifies the highest ideals of kingship, husband, and human behavior, earning him the title "Maryada Purushottama" - the perfect man who never crossed moral boundaries.',
    attributes: ['Righteousness', 'Honor', 'Duty', 'Compassion', 'Leadership', 'Devotion to Truth'],
    symbols: ['Bow and Arrow', 'Lotus', 'Crown', 'Blue Lotus'],
    mantras: [
      {
        id: 'rama-main-mantra',
        sanskrit: 'श्री राम जय राम जय जय राम',
        transliteration: 'Sri Rama Jaya Rama Jaya Jaya Rama',
        meaning: 'Glory to Lord Rama, Victory to Lord Rama',
        purpose: 'For righteousness and strength in difficult times',
        benefits: ['Inner strength', 'Moral clarity', 'Protection', 'Peace of mind']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Dark complexioned, tall, graceful, eternally youthful',
      clothing: 'Royal attire or simple ascetic clothes during exile',
      colors: ['Green', 'Blue', 'Yellow'],
      objects: ['Bow (Kodanda)', 'Arrows', 'Crown'],
      vehicle: 'Usually on foot or chariot',
      posture: 'Standing with bow, often with Sita, Lakshmana, and Hanuman',
      facesAndArms: 'One face, two arms'
    },
    teachings: [
      'Dharma must be upheld even at personal cost',
      'Truth and honor are more valuable than life itself',
      'A leader must sacrifice for their people',
      'Family bonds and loyalty are sacred',
      'Respect and protect women and the innocent',
      'Keep your promises no matter the consequences'
    ],
    festivals: ['dussehra-2025', 'rama-navami-2025'],
    scriptureReferences: [
      {
        id: 'ramayana-rama-1',
        text: 'ramayana',
        section: 'Ayodhya Kanda',
        relevance: 'Rama accepts exile for dharma',
        quote: 'I will gladly go to the forest to honor my father\'s word'
      }
    ],
    stories: [
      {
        id: 'rama-exile',
        title: 'Accepting Exile with Grace',
        content: 'On the eve of his coronation, Rama learned that his father\'s old promise to Queen Kaikeyi had been called in: fourteen years of forest exile for him, the throne for his brother Bharata. The court wept; the city wept; his father collapsed. Rama\'s face, the Valmiki Ramayana insists, did not change. He unbuckled the royal ornaments as calmly as he had put them on, touched his father\'s feet, comforted the very queen who had ruined him, and walked out of Ayodhya the same man who was to have ruled it that morning. His crown was never the source of his stature.',
        moralLesson: 'Character is what remains when position is stripped away. The one who is the same person crowned or exiled has something no decree can revoke.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Ayodhya Kanda'
      },
      {
        id: 'rama-bharata-sandals',
        title: 'The Sandals on the Throne',
        content: 'Bharata, for whom the throne was seized, wanted none of it. He marched to the forest with the whole court to beg Rama\'s return. Rama refused — the fourteen years were his father\'s word, and his father\'s word did not die with his father. So Bharata asked for Rama\'s sandals, carried them back on his own head, and placed them on the throne of Ayodhya. For fourteen years Bharata ruled from a hut outside the city, as regent to a pair of sandals, refusing the royal umbrella, waiting. Two brothers each refusing a kingdom for the other\'s sake — the tradition ranks this contest of renunciation among its most sacred scenes.',
        moralLesson: 'Power is safest with those who genuinely do not want it. And an institution can be held faithfully in trust — authority as service rendered to something absent — when love, not appetite, sits on the throne.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Ayodhya Kanda (sandals: sargas 112–115 region)'
      },
      {
        id: 'rama-shabari',
        title: 'Shabari\'s Tasted Berries',
        content: 'Searching for the abducted Sita, grief-worn and far from every comfort, Rama came to the forest hut, or ashram, of Shabari — an old tribal woman who had waited decades for this visit, told by her departed guru that Rama himself would one day come. She had nothing to offer but wild berries, and she offered them in the only way her love knew: tasting each one first, keeping only the sweet ones for him. By every rule of ritual purity, half-eaten food from a forest woman was unofferable. Rama ate them as the finest meal of his exile, and the tradition never tired of the scene: the prince of dharma, schooled in every scripture, honoring a devotion that broke the rules because it kept the only rule that matters.',
        moralLesson: 'Love\'s etiquette outranks ritual\'s etiquette. What is offered with a whole heart is pure by definition — and the truly great receive it that way.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Aranya Kanda, sarga 74 (and the beloved retellings)'
      }
    ],
    worship: {
      bestTimes: ['Morning', 'Evening', 'Tuesdays'],
      offerings: ['Tulsi leaves', 'Flowers', 'Fruits', 'Simple vegetarian food'],
      rituals: ['Reciting Ramayana', 'Aarti', 'Bhajans'],
      fasting: ['Ram Navami', 'Tuesdays'],
      pilgrimage: ['Ayodhya', 'Rameswaram', 'Chitrakoot', 'Hampi'],
      dailyPractices: ['Chanting Ram naam', 'Reading Ramayana passages']
    },
    audioUrl: '/audio/pronunciation/rama.mp3',
    podcastEpisodes: [],
    significance: 'Rama represents the ideal human being, showing how to live with perfect dharma in all relationships and circumstances',
    modernRelevance: 'Rama\'s example teaches modern leaders about integrity, sacrifice for the greater good, and maintaining ethical standards in positions of power',
    familyConnections: [
      {
        relationTo: 'vishnu',
        relationship: 'Avatar',
        description: 'Rama is the seventh avatar of Vishnu'
      },
      {
        relationTo: 'sita',
        relationship: 'Consort',
        description: 'Sita is the incarnation of Lakshmi, Vishnu\'s consort'
      }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/rama-cover.jpg'),
      iconImage: '/images/deities/rama-icon.jpg',
      galleryImages: ['/images/deities/rama-sita.jpg', '/images/deities/rama-court.jpg']
    },
    kicker: 'Another human form of Vishnu — the prince who keeps his word even when it costs him his crown, his home, and fourteen years.',
    learnItems: [
      'Rama is a human form of Vishnu, whose whole life turns on keeping his word',
      "A promise doesn't expire just because keeping it got expensive",
      'His years of exile in the forest were the making of him, not an interruption',
      "Every contribution counts — even a squirrel's grains of sand",
      'His greatest gift was the smallest: a name to repeat',
    ],
    handoff:
      'Krishna and Rama are both Vishnu, the protector, walking the earth as humans. But the Hindu God wears other faces too. The next is the strangest and most powerful: the god who destroys the old world so a new one can begin — Shiva.',
    sections: [
      {
        id: 'rama-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Rama is one of Hinduism's most beloved gods, and the hero of a vast, thrilling epic called the **Ramayana** — a story of exile, a kidnapped wife, a war, and a monkey army. But at its centre is a simple idea: a good man who keeps his word no matter what it costs him.\n\nOver the next few pages you'll meet him, and the moments that made him India's model for how to live.",
      },
      {
        id: 'rama-ideal',
        title: 'Who Rama Is',
        subtitle: 'The prince who would not cross a line',
        takeaway:
          'Rama is another human form of Vishnu — a prince whose whole life turns on keeping his word and doing the right thing, even when it costs him everything.',
        storyText:
          "Like Krishna, Rama is an **avatar** of **Vishnu**, the god who protects the world — in fact the incarnation just before Krishna. But where Krishna is playful and bends the rules with a smile, Rama is his opposite: the man who never crosses a line.\n\nRama was a prince of **Ayodhya**, a north-Indian kingdom, and his life is told in the **Ramayana**, one of Hinduism's two great epic poems. It is the story of a thoroughly good man who loses almost everything — his crown, his home, and eventually his wife **Sita** — because he refuses, again and again, to take the easy wrong path.\n\nHis title says it all: **Maryada Purushottama**, which means 'the perfect man of right conduct' — the one who never once stepped over the line of what was right, whatever it cost him.",
        teachingText:
          "That is why Hindus give Rama such deep reverence. Anyone can admire a god's flawless perfection from a safe distance. Rama's kind of goodness is different: it is the sort an ordinary person could actually bleed for and still choose. His whole story asks you one question — what line would you refuse to cross, even if crossing it would win you a kingdom?",
        citation: 'Valmiki Ramayana (throughout); Maryada Purushottama: traditional epithet.'
      },
      {
        id: 'rama-word',
        title: 'A Father\'s Word, Kept by the Son',
        subtitle: 'A crown set down without a tremor',
        takeaway:
          "A promise doesn't expire just because keeping it turned expensive. Rama gave up his crown to honour a word that wasn't even his own.",
        storyText:
          "Rama's exile turns on one idea: a promise does not stop being binding just because keeping it has become painful.\n\nYears earlier, Rama's father, King **Dasharatha**, had granted his queen **Kaikeyi** two wishes, whenever she chose to claim them. Now, on the very eve of Rama's coronation, she claimed them: send Rama away to the forest for fourteen years, and crown her own son **Bharata** (Rama's younger half-brother) instead. The promise was old, the king was collapsing with grief, and the whole city begged Rama to just ignore it. He would not. His family's given word, he believed, was the family's honour itself, and he would not let it die.\n\nSo he set down a crown that was rightfully his, to keep a promise he had never personally made, at a price he did not owe — because both he and the tradition judged that invisible thing, a word kept, to be worth more than the visible throne.",
        teachingText:
          'Every family and every institution runs on invisible trust: the quiet confidence that its word means something. Each promise kept adds to that account; each clever escape drains it.\n\nRama\'s extreme is a compass, not a demand. But it is worth asking what your own word is currently worth to the people who rely on it, and what one expensive kept promise would do for that trust.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda.',
        checks: [
          {
            id: 'chk:deity:rama:word',
            kind: 'mcq',
            prompt: "Rama could have legally broken his late father's promise, and the whole city urged him to. Why did he keep it and accept exile instead?",
            options: [
              {
                text: "Because a promise doesn't stop being binding just because keeping it became painful — his family's word was its honour",
                correct: true,
              },
              { text: 'Because he was afraid of his stepmother, Kaikeyi' },
              { text: 'Because he did not really want to be king anyway' },
            ],
            why: 'Rama gave up a throne that was rightfully his to keep a word he had never even made himself. The tradition judged that invisible thing, a promise kept, to be worth more than the visible crown.',
          },
        ],
      },
      {
        id: 'rama-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'You have met Rama and the promise that cost him his crown. Now the forest, where losing everything quietly turned him into the king he would become.',
      },
      {
        id: 'rama-exile-years',
        title: 'Fourteen Years of Forest',
        subtitle: 'A palace prince learning the names of trees',
        takeaway:
          "Rama's fourteen years of exile weren't an interruption — they were the making of him. The hardest stretch is often where your real education, and your real allies, are found.",
        storyText:
          "Rama's exile was not a sad gap in his life. It was the making of him.\n\nIn the forest, the pampered prince became something the palace could never have taught him: a man who knew hardship and hunger, who lived among hermits and forest tribes, and who suffered the worst grief of his life when **Ravana**, the demon-king of the faraway island of **Lanka**, kidnapped his wife Sita.\n\nAnd the friends he made in that hard place — a humble boatman, a dying vulture who tried to save Sita, an old forest woman who fed him berries, and above all **Hanuman**, the mighty monkey-warrior, with his army of **vanaras** (a race of noble, intelligent monkey-people) — were the friendships of the overlooked. It was they, not the armies of his kingdom, who finally won his war. When Rama at last returned to rule, he ruled as a king who had slept on the bare ground of his own land.",
        teachingText:
          "The forest years reframe every setback: the demotion, the illness, the season when everything was taken. Rama's exile suggests the wilderness is exactly where your real education happens and your future allies are met, and that people who come back from it lead differently. What did your own 'forest' teach you that no comfortable stretch ever could?",
        citation: 'Valmiki Ramayana, Aranya Kanda.',
        checks: [
          {
            id: 'chk:deity:rama:exile',
            kind: 'mcq',
            prompt: "The tradition insists Rama's fourteen years of forest exile were not a sad interruption. What were they?",
            options: [
              {
                text: 'The making of him — where he learned hardship and won the friends of the overlooked who would later win his war',
                correct: true,
              },
              { text: 'A punishment he secretly deserved for a past mistake' },
              { text: 'Wasted years that he spent the rest of his life regretting' },
            ],
            why: "The forest taught the pampered prince what the palace never could, and his allies there — not his kingdom's armies — won the war. He came back a king who had slept on the bare ground of his own land.",
          },
        ],
      },
      {
        id: 'rama-bridge',
        title: 'The Bridge and the Squirrel',
        subtitle: 'An ocean crossed stone by floating stone',
        takeaway:
          'In the war to rescue Sita, even a squirrel carrying grains of sand mattered. A great leader makes the smallest helper feel honoured, not laughed at.',
        storyText: 'To reach Lanka and rescue Sita, Rama\'s army had to cross the ocean. The army of monkeys and bears built a **bridge of floating stones** — and the tradition\'s favorite worker on it is the smallest: a squirrel, rolling in sand and shaking it between the stones.\n\nWhen the great monkeys laughed, Rama picked the squirrel up and stroked its back — the stripes squirrels carry to this day, says the beloved tale.\n\nThe bridge held. The war was won by an alliance in which **every contribution, from Hanuman\'s mountain-carrying to the squirrel\'s sand, counted as sacred**.',
        teachingText: 'Every great work is a bridge of odd stones — and its Rama is the one who makes the smallest contributor feel stroked on the back, not laughed at.\n\nIn whatever you are building, notice who is carrying sand. **The leader\'s hand on the squirrel is why the army stays an army.**',
        citation: 'Valmiki Ramayana, Yuddha Kanda (the bridge); the squirrel: later devotional tellings (not Valmiki).',
        checks: [
          {
            id: 'chk:deity:rama:squirrel',
            kind: 'mcq',
            prompt: 'As the great monkeys built the bridge to Lanka, a tiny squirrel rolled in sand to help fill the gaps — and they laughed at it. What did Rama do?',
            options: [
              {
                text: 'He picked the squirrel up and stroked its back, honouring the smallest helper as much as the strongest',
                correct: true,
              },
              { text: 'He agreed the squirrel was useless and sent it away' },
              { text: 'He ignored it and kept directing the monkeys' },
            ],
            why: 'The war was won by an alliance in which every contribution counted, from Hanuman carrying whole mountains to the squirrel carrying sand. A leader who honours the smallest helper is the reason the army stays an army.',
          },
        ],
      },
      {
        id: 'rama-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Rama kept his word, grew in the forest, and honoured every helper. One gift of his remains, the smallest and most lasting of all: his name.',
      },
      {
        id: 'rama-name',
        title: 'The Name That Outlived the Man',
        subtitle: 'Two syllables carried across centuries',
        takeaway:
          "Rama's greatest gift was also his smallest: his name. Repeating a name of God, with attention, through an ordinary day is a practice anyone can carry anywhere.",
        storyText:
          "Rama's final gift to India is his smallest: his name.\n\nSimply repeating **'Ram, Ram'** became one of Hinduism's most portable practices — a village greeting, the chant of poet-saints like **Kabir** and **Tulsidas** centuries ago, the word Mahatma Gandhi kept on his lips, and the line spoken as people carry the dead to be cremated: **Ramanama satya hai**, 'the name of Rama is truth.'\n\nThere is even a saying that the name is greater than the man. The stones of the bridge to Lanka floated, one story goes, because Rama's name was written on them, while a stone Rama himself threw in sank. Whatever else is out of reach on a hard day — a temple, a teacher, a holy book — a name is not.",
        teachingText:
          "The practice is exactly as simple as it sounds, and older than any app: a name, said with attention, as often as you remember it, while walking, waiting, or worrying. Pick a name for the divine, Rama's or any other, and let it run quietly under a single ordinary day. That thin thread, the tradition promises, is strong enough to hold everything else.",
        citation: 'Ram-nam: living tradition (Kabir, Tulsidas, Gandhi); the floating-stones telling: devotional tradition.'
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Ayodhya Kanda (exile; Bharata and the sandals, sargas 112–115 region); Aranya Kanda (forest years; Shabari, sarga 74); Yuddha Kanda (the bridge, war, and return)',
        translation: 'valmikiramayan.net (public); the squirrel and floating-name stones are beloved later tradition, labeled as such',
        url: 'https://www.valmikiramayan.net/',
      },
      {
        text: 'Devotional tradition',
        locator: 'Ram-nam practice: Kabir, Tulsidas (Ramcharitmanas), Gandhi — named as tradition, not scripture quotation',
      },
    ],
    reflectionQuestions: [
      'Rama had one line he would never cross. What is one line you won\'t cross, no matter what?',
      'Think of a promise you made that has become inconvenient to keep. What would keeping it anyway do to the trust others place in you?',
      "Recall your own 'forest' — a hard stretch you didn't choose. What did it teach you, or who did it bring into your life, that comfort never would have?",
    ]
  },
  {
    id: 'ganesha',
    name: 'Ganesha',
    sanskritName: 'गणेश',
    titles: ['Ganapati', 'Vinayaka', 'Vighnaharta', 'Lambodara', 'Ekadanta'],
    category: 'major',
    description: 'Elephant-headed remover of obstacles and lord of beginnings',
    mythology: 'Born to Lord Shiva and Goddess Parvati, Ganesha received his elephant head after Shiva, not recognizing his own son who was guarding Parvati\'s bath, beheaded him in anger. To restore life, Shiva replaced the head with that of an elephant. Ganesha became the lord of Shiva\'s ganas (attendants) and the remover of obstacles. His wisdom and diplomatic skills made him the deity invoked before beginning any important task.',
    attributes: ['Wisdom', 'Prosperity', 'Good Fortune', 'Arts and Learning', 'Problem Solving'],
    symbols: ['Elephant Head', 'Large Belly', 'Mouse (Mushika)', 'Modak (sweet)', 'Lotus', 'Axe', 'Rope'],
    mantras: [
      {
        id: 'ganesha-main-mantra',
        sanskrit: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gam Ganapataye Namaha',
        meaning: 'Salutations to Lord Ganesha',
        purpose: 'For removing obstacles and new beginnings (from the Ganapati Atharvashirsha)',
        benefits: ['Obstacle removal', 'Success in ventures', 'Wisdom', 'Good fortune']
      },
      {
        id: 'ganesha-gayatri',
        sanskrit: 'एकदन्ताय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्तिः प्रचोदयात्॥',
        transliteration: 'ekadantāya vidmahe vakratuṇḍāya dhīmahi, tanno dantiḥ pracodayāt',
        meaning: 'May we know the one-tusked lord; may we meditate on the one with the curved trunk; may that tusked one inspire and illumine us',
        purpose: 'The Ganesha Gayatri — for clarity and inspiration in study and work (from the Ganapati Atharvashirsha)',
        benefits: ['Mental clarity', 'Focus in learning', 'Inspiration']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Elephant head on human body, large belly, usually red or pink',
      clothing: 'Dhoti, ornate jewelry',
      colors: ['Red', 'Orange', 'Yellow'],
      objects: ['Modak', 'Axe', 'Rope', 'Lotus'],
      vehicle: 'Mushika (mouse/rat)',
      posture: 'Seated or standing, one hand in blessing pose',
      facesAndArms: 'Elephant face, four arms typically'
    },
    teachings: [
      'Wisdom overcomes all obstacles',
      'Humility despite great power (large form, small vehicle)',
      'Enjoy life\'s sweetness in moderation',
      'Learning and arts are sacred pursuits',
      'Help others overcome their difficulties',
      'Begin everything with prayer and right intention'
    ],
    festivals: ['ganesh-chaturthi-2025'],
    scriptureReferences: [
      {
        id: 'ganesha-purana-1',
        text: 'puranas',
        section: 'Ganesha Purana',
        relevance: 'Origin and glory of Ganesha',
        quote: 'He is the lord of obstacles, both creator and destroyer of impediments'
      }
    ],
    stories: [
      {
        id: 'ganesha-birth',
        title: 'The Boy at the Door',
        content: 'Before her bath, Parvati shaped a boy from the turmeric paste of her own body and breathed life into him — a son entirely her own. She set him at the door with one instruction: let no one enter. When Shiva himself returned to Kailasa, the boy — who had never seen him — barred the way. Words became a standoff, the standoff a battle, and in his fury Shiva severed the boy\'s head with his trident. Parvati\'s grief shook the three worlds, and her condition for their survival was absolute: her son would live again. Shiva\'s attendants were sent north and returned with the head of an elephant, which Shiva joined to the boy\'s body, restoring his life. He then did something greater than repair — he adopted the boy fully, named him Ganesha, lord of his own ganas, and decreed that in every undertaking, this child would be honored first.',
        moralLesson: 'Even a terrible rupture can end in a larger belonging: what began in anger ended with the wounded one honored first among all. Devotion to duty — even a doorkeeper\'s — is never wasted.',
        category: 'origin',
        relatedScripture: 'Shiva Purana, Rudra Samhita, Kumara Khanda, chapters 13–18'
      },
      {
        id: 'ganesha-race',
        title: 'The Race Around the World',
        content: 'When the time came for Ganesha and his brother Kartikeya to marry, a contest was set: whoever first circled the world would wed first. Kartikeya mounted his peacock and streaked across oceans and mountains. Ganesha, astride a mouse, could never win such a race — so he did not run it. He walked slowly around his seated parents, Shiva and Parvati, folded his hands, and declared his circuit complete: "My parents are the whole world." The assembly fell silent, then erupted — the wisdom was undeniable. Ganesha was married first, to Siddhi (attainment) and Buddhi (wisdom), whose names describe exactly what his insight had won.',
        moralLesson: 'Understanding outruns speed. The one who grasps what truly matters finishes first without hurrying — and reverence for those who gave you life is itself a way of holding the whole world.',
        category: 'teaching',
        relatedScripture: 'Shiva Purana, Rudra Samhita, Kumara Khanda, chapters 19–20'
      },
      {
        id: 'ganesha-scribe',
        title: 'The Scribe of the Mahabharata',
        content: 'When the sage Vyasa prepared to compose the Mahabharata — a poem vaster than anything yet attempted — he needed a scribe who could keep pace with his mind. Ganesha agreed, on one condition: Vyasa must dictate without pausing, or Ganesha would stop writing forever. Vyasa accepted — with a counter-condition of his own: Ganesha must fully understand every verse before setting it down. So whenever Vyasa needed to think ahead, he would speak a verse so dense and knotted that even Ganesha had to pause to unravel it, and in those pauses the sage composed on. Between the two conditions — unbroken flow and complete understanding — the world\'s longest epic was written. A beloved tradition adds that when his pen failed mid-verse, Ganesha broke off his own tusk to keep writing rather than break his word.',
        moralLesson: 'Never write — or speak, or act — faster than you understand. And a commitment sincerely made is worth more than the instrument you sacrifice to keep it.',
        category: 'teaching',
        relatedScripture: 'Mahabharata, Adi Parva, Section 1 (K.M. Ganguli translation)'
      }
    ],
    worship: {
      bestTimes: ['Tuesday', 'Wednesday', 'Morning'],
      offerings: ['Modak', 'Red flowers', 'Durva grass', 'Coconut'],
      rituals: ['Aarti', '108 names recitation', 'Modak offering'],
      fasting: ['Ganesh Chaturthi', 'Tuesdays'],
      pilgrimage: ['Ashtavinayak temples', 'Siddhivinayak Mumbai'],
      dailyPractices: ['Om Gam mantra', 'Seeking blessings before important tasks']
    },
    audioUrl: '/audio/pronunciation/ganesha.mp3',
    podcastEpisodes: [],
    significance: 'Ganesha teaches that wisdom, humility, and divine grace can overcome any obstacle in life',
    modernRelevance: 'As patron of education and remover of obstacles, Ganesha is especially relevant for students, entrepreneurs, and anyone facing challenges',
    familyConnections: [
      {
        relationTo: 'shiva',
        relationship: 'Son',
        description: 'Son of Lord Shiva and Goddess Parvati'
      }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/ganesha-cover.jpg'),
      iconImage: '/images/deities/ganesha-icon.jpg',
      galleryImages: []
    },
    kicker: "The cheerful, elephant-headed son of Shiva — the remover of obstacles, whose name Hindus speak first before starting anything new.",
    learnItems: [
      "Ganesha is the elephant-headed remover of obstacles, worshipped first before any beginning",
      'Even a terrible rupture can end in a bigger belonging',
      'His very form is a lesson you can read',
      'Understanding outruns speed — grasp what matters and you finish first',
      'His way of learning: never stop the flow, never outrun your own understanding',
    ],
    handoff:
      "Ganesha clears the path before you begin. The next god shows what to do once you're on it — the mighty monkey-warrior whose real strength turns out to be the strength of pure devotion: Hanuman.",
    sections: [
      {
        id: 'ganesha-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Ganesha is the cheerful, elephant-headed god, and probably the most instantly loved figure in all of Hinduism. He is the one Hindus call on first, before starting anything new at all.\n\nOver the next few pages you'll meet him, hear the startling story of how he got his elephant head, and learn to read the meaning hidden in his unusual form.",
      },
      {
        id: 'ganesha-threshold',
        title: 'Who Ganesha Is',
        subtitle: 'The god you call on first',
        takeaway:
          "Ganesha is the elephant-headed son of Shiva and Parvati, the beloved 'remover of obstacles' whose name Hindus speak first before beginning anything new.",
        storyText:
          "Ganesha is the cheerful, **elephant-headed** god — the son of **Shiva** and his wife **Parvati**. He is **Vighnaharta**, which means 'the remover of obstacles,' and by long custom his is the first name Hindus speak before starting anything new.\n\nBefore a wedding begins, before a shop opens its first account book, before a child writes the very first letter of the alphabet, people call on Ganesha. Every doorway, journey, new venture, and first page belongs to him. (This goes back to his origin story, where Shiva declared this boy would be honoured first among all the gods — a story you'll hear in a moment.)\n\nThe idea hidden in the custom is quietly wise: every beginning carries a little fear, and the tradition answers that fear not with a pep talk, but with a friendly companion waiting at the door.",
        teachingText:
          "Notice what you do at your own thresholds. Do you rush through your beginnings — new jobs, new relationships, new years — or do you pause and mark them? Beginning with a prayer, or even one deliberate breath of intention, quietly changes the spirit of everything that follows. That is Ganesha's first lesson, and you don't need an elephant's head to practise it.",
        citation: 'The first-worship decree: Shiva Purana, Rudra Samhita (Kumara Khanda).'
      },
      {
        id: 'ganesha-born-of-devotion',
        title: 'Born at a Door, Remade by Grace',
        subtitle: 'A boy shaped from turmeric paste',
        takeaway:
          "Ganesha's birth was violent — his own father beheaded him, then restored him with an elephant's head and raised him higher than before. Even a terrible rupture can end in a bigger belonging.",
        storyText:
          "The Shiva Purana tells the story of Ganesha's birth without softening any of it.\n\nParvati shapes a son out of the turmeric paste from her own skin, and sets him to guard her door. Shiva comes home, does not recognise the boy, and in a rage cuts off his head. Parvati's grief threatens to destroy the whole world. So the boy is brought back to life with an elephant's head, and then raised even higher than he had been before: made the leader of Shiva's **ganas** (his band of divine attendants — which is exactly where the name Gana-esha, 'lord of the ganas,' comes from), and made first in every prayer.\n\nIt is a raw family story of a terrible misunderstanding and an even greater repair, and Hindus placed it right at the very front of all their worship.",
        teachingText: 'Every family carries a version of this story — the clash that came from not recognizing each other, the wound that seemed unforgivable.\n\nThe Purana\'s answer is not that the wound didn\'t matter, but that **repair can be so complete it transforms the wounded one\'s place in the family**. Where in your life is a beheaded relationship waiting for an elephant\'s head — an imperfect, unlikely, generous repair that restores more than was lost?',
        citationLink: 'festival:ganesh-chaturthi-2025',
        citation: 'Shiva Purana, Rudra Samhita (Kumara Khanda).',
        checks: [
          {
            id: 'chk:deity:ganesha:birth',
            kind: 'mcq',
            prompt: "Shiva beheaded the boy guarding Parvati's door, then restored him with an elephant's head. How did the story end for the boy?",
            options: [
              {
                text: "He was raised higher than before — adopted fully, made leader of Shiva's attendants, and honoured first in every prayer",
                correct: true,
              },
              { text: 'He was sent away from the family in disgrace' },
              { text: 'He was left only half-alive, as a permanent warning' },
            ],
            why: 'What began in fury ended with the wounded one honoured first of all. Even a terrible rupture can end in a larger belonging.',
          },
        ],
      },
      {
        id: 'ganesha-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'You know who he is and where he came from. Now his elephant-headed form itself, which the tradition reads like a set of lessons.',
      },
      {
        id: 'ganesha-iconography',
        title: 'Reading the Elephant-Headed Form',
        subtitle: 'Large ears, small eyes, one tusk',
        takeaway:
          'Ganesha\'s whole body is a lesson you can read: big ears to listen more, small eyes to focus, one tusk to keep only what serves, and a trunk strong enough to uproot a tree yet gentle enough to lift a blade of grass.',
        storyText: 'Every part of Ganesha\'s form carries a meaning:',
        bullets: [
          '**The elephant head** — wisdom, memory, and gentleness joined to strength.',
          '**The large ears** — listen more.',
          '**The small eyes** — concentrate; see one thing deeply.',
          '**The trunk** — strong enough to uproot a tree, delicate enough to lift a blade of grass; true skill bends to the task.',
          '**The single tusk** — keep what serves, sacrifice what must be given (he is Ekadanta, the one-tusked).',
          '**The large belly** — digest all of life, sweet and bitter alike.',
          '**The modak in his hand** (a sweet dumpling) — the sweetness of the inner life, earned by practice.',
          '**The mouse beneath him** — even the restless, scurrying mind can carry wisdom, once wisdom is seated firmly upon it.'
        ],
        teachingText: 'Pick one feature and live it for a week. Listen like the ears. Focus like the eyes. Adapt like the trunk. The statue is not a portrait to admire; it is a lesson to practise.',
        citation: 'Standard Puranic iconography; Ekadanta epithet: Ganesha tradition.'
      },
      {
        id: 'ganesha-wisdom-over-speed',
        title: 'Wisdom Outruns the World',
        subtitle: 'A boy on a mouse beating a peacock',
        takeaway:
          "Racing his brother around the world, Ganesha simply walked around his parents and said 'you are my whole world' — and won. Understanding outruns speed.",
        storyText: "Ganesha's brother **Kartikeya** once challenged him to a race: whoever circled the whole world first would win. Kartikeya sped off across oceans and mountains on his peacock. Ganesha, who rode a tiny mouse, could never win a race like that, so he did not run it.\n\nInstead, he walked slowly around his seated parents, Shiva and Parvati, folded his hands, and said his lap around the world was complete: 'My parents are the whole world to me.' The wisdom was undeniable, and he was declared the winner.\n\nThe story is loved by children, but its point is for adults: we spend years racing peacocks, circling the world chasing approval, while the thing that would actually complete us sits quietly at home. Ganesha's prize was marriage to **Siddhi and Buddhi** — 'success' and 'wisdom' — which is the tradition's way of saying what real insight weds you to.",
        teachingText: 'What race are you running right now, and who set its course?\n\nSometimes the dharmic move is not to run faster but to **redefine the circuit** — to walk around what you love and call it enough. Ask yourself Ganesha\'s question before your next sprint: is the finish line I\'m chasing actually the world, or is my world somewhere I stopped looking?',
        citation: 'The contest: Shiva Purana and Ganesha Purana tellings.',
        checks: [
          {
            id: 'chk:deity:ganesha:race',
            kind: 'mcq',
            prompt: 'In a race to circle the world, Ganesha\'s brother sped off on a peacock. Ganesha, on a tiny mouse, could not win by running. What did he do?',
            options: [
              {
                text: "He walked slowly around his parents and said 'you are my whole world' — and won, because understanding outruns speed",
                correct: true,
              },
              { text: 'He gave up and simply let his brother win the race' },
              { text: 'He took a secret shortcut and cheated' },
            ],
            why: 'The one who grasps what truly matters finishes first without hurrying. We spend years racing for approval while the thing that completes us sits quietly at home.',
          },
        ],
      },
      {
        id: 'ganesha-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'His form, and his wit. One idea remains: why students and writers everywhere still call on him before they begin.',
      },
      {
        id: 'ganesha-patron-of-learning',
        title: 'Patron of the First Page',
        subtitle: 'A broken tusk held like a pen',
        takeaway:
          "Ganesha was the scribe who wrote down the Mahabharata, on two conditions: the flow must never stop, and he'd never write a line faster than he understood it. That is his whole philosophy of learning.",
        storyText:
          "It is fitting that the **Mahabharata** — the giant epic that contains the Bhagavad Gita — was, by tradition, written down by Ganesha's own hand. When the sage **Vyasa** set out to compose the poem, Ganesha agreed to be his scribe on one condition: Vyasa must never once pause in his dictation. Vyasa agreed, but added a condition of his own: Ganesha must fully understand every verse before writing it down.\n\nThose two conditions together are Ganesha's whole philosophy of learning: never stop the flow, and never write faster than you understand.\n\nStudents across India still call on him before they study, and writers before a blank page, because both know the twin dangers he guards against: giving up on the work, and doing it mindlessly.",
        teachingText:
          "Bring his two conditions to whatever you are learning now. Flow: touch the work daily, even briefly, without breaking the chain. Understanding: never let your output — your notes, opinions, replies — outrun what you actually grasp. And when your pen fails mid-thought, remember that Ganesha snapped off his own tusk to keep writing rather than break his word: the tools are replaceable, but the commitment is not.",
        citation: 'The scribe tradition: Mahabharata, Adi Parva (in some recensions).',
        checks: [
          {
            id: 'chk:deity:ganesha:scribe',
            kind: 'mcq',
            prompt: 'Ganesha agreed to write down the Mahabharata on two conditions, taken together. What were they?',
            options: [
              {
                text: 'The dictation must never pause (keep the flow), and he must fully understand each verse before writing it (never outrun your understanding)',
                correct: true,
              },
              { text: 'He must be paid in sweets, and finish within a single year' },
              { text: 'He was free to change the story wherever he wished' },
            ],
            why: "Between unbroken flow and complete understanding, the world's longest poem was written. Never write, speak, or act faster than you understand.",
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Rudra Samhita, Kumara Khanda, chapters 13–20 (birth, restoration, and marriage of Ganesha)',
        translation: 'J.L. Shastri, Motilal Banarsidass / wisdomlib.org',
        url: 'https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226120.html',
      },
      {
        text: 'Mahabharata',
        locator: 'Adi Parva, Section 1 (Ganesha as Vyasa\'s scribe)',
        translation: 'K.M. Ganguli (public domain)',
      },
      {
        text: 'Ganapati Atharvashirsha (Ganapati Upanishad)',
        locator: 'Om Gam Ganapataye mantra; Ganesha Gayatri',
        translation: 'traditional text',
      },
    ],
    reflectionQuestions: [
      'What are you starting right now, and what would a good, unhurried beginning look like?',
      "Ganesha won the race by walking around his parents. What are you racing for that might already be sitting quietly at home?",
      'Where is your output — your opinions, replies, plans — running ahead of what you actually understand?',
    ]
  },
  {
    id: 'shiva',
    name: 'Shiva',
    sanskritName: 'शिव',
    titles: ['Mahadeva', 'Neelakantha', 'Nataraja', 'Bholenath', 'Shankara'],
    category: 'major',
    description: 'The auspicious one — destroyer of what must end, lord of meditation and transformation',
    mythology: 'Shiva is the great paradox of the Hindu imagination: the ascetic who sits in unbroken meditation on Mount Kailasa and the householder devoted to Parvati and their sons; the destroyer whose destruction clears the ground for every new beginning; the wild dancer whose steps keep the cosmos in rhythm. He drank the world\'s poison to save it, carries the Ganga\'s crushing descent in his hair, and answers the simplest sincere offering — a leaf, a little water — faster than any elaborate rite. In him the tradition holds together everything it knows about endings: that they are terrifying, necessary, and in the deepest sense compassionate.',
    attributes: ['Meditation', 'Transformation', 'Detachment', 'Compassion', 'Cosmic rhythm'],
    symbols: ['Trishula (trident)', 'Damaru (drum)', 'Crescent moon', 'Third eye', 'Serpent', 'Ganga in his hair', 'Rudraksha beads'],
    mantras: [
      {
        id: 'shiva-panchakshari',
        sanskrit: 'ॐ नमः शिवाय',
        transliteration: 'oṁ namaḥ śivāya',
        meaning: 'Om, salutations to Shiva (the auspicious one)',
        purpose: 'The five-syllable (panchakshari) mantra — the heart of Shaiva practice, rooted in the Yajurveda\'s Rudradhyaya',
        benefits: ['Inner stillness', 'Letting go', 'Steadiness in change']
      },
      {
        id: 'shiva-mahamrityunjaya',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
        transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam, urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt',
        meaning: 'We worship the three-eyed one, fragrant, who nourishes all beings; as a ripe cucumber is released from its stem, may he free us from death, for immortality',
        purpose: 'The Mahamrityunjaya ("great death-conquering") mantra — Rig Veda 7.59.12 — chanted for healing, protection, and fearlessness before endings',
        benefits: ['Fearlessness', 'Healing', 'Peace with mortality']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Ash-smeared ascetic with matted hair holding the crescent moon and the Ganga, a third eye on his forehead, serpent around his neck',
      clothing: 'Tiger skin, rudraksha beads',
      colors: ['White (ash)', 'Blue (throat)'],
      objects: ['Trishula', 'Damaru'],
      vehicle: 'Nandi (bull)',
      posture: 'Seated in meditation, or dancing as Nataraja within a ring of fire',
      facesAndArms: 'Commonly one face, two or four arms; as Nataraja, four arms in the cosmic dance'
    },
    teachings: [
      'Destruction is a form of compassion — endings clear the ground for beginnings',
      'Hold the world\'s poison in your throat: absorb harm without passing it on',
      'The greatest power sits perfectly still',
      'Bear what descends on you the way Shiva bears the Ganga — break its fall for others',
      'The sincere and simple offering outweighs the elaborate one'
    ],
    festivals: ['maha-shivratri-2025'],
    scriptureReferences: [
      {
        id: 'shiva-rigveda',
        text: 'vedas',
        section: 'Rig Veda 7.59.12 (Tryambakam / Mahamrityunjaya)',
        relevance: 'The oldest layer of Shiva devotion — Rudra, the three-eyed one, invoked to free us from death',
        quote: 'We worship the three-eyed one... as a ripe cucumber is released from its stem, may he free us from death, for immortality'
      },
      {
        id: 'shiva-bhagavata-poison',
        text: 'puranas',
        section: 'Bhagavata Purana, Canto 8, Chapters 6–7',
        relevance: 'The churning of the ocean and Shiva drinking the halahala poison'
      }
    ],
    stories: [
      {
        id: 'shiva-neelakantha',
        title: 'The Blue-Throated God',
        content: 'When the gods and demons churned the cosmic ocean for the nectar of immortality, the first thing that surfaced was not nectar but halahala — a poison so virulent it began to burn the three worlds. The churners fled. The poison spread. And Shiva, who wanted nothing from the churning — no nectar, no treasure, no share — came forward and gathered the world\'s poison into his palm and drank it. Parvati pressed his throat so the poison would lodge there, harming no one, not even him fatally. It stained his throat blue forever, and the worlds went back to churning for their nectar. He kept nothing but the mark: Neelakantha, the blue-throated one.',
        moralLesson: 'Greatness is measured by what you are willing to absorb, not what you manage to acquire. To hold pain in your throat — neither swallowing it into yourself nor spitting it onto others — is the rarest strength.',
        category: 'teaching',
        relatedScripture: 'Bhagavata Purana, Canto 8, Chapters 6–7 (also Shiva Purana)'
      },
      {
        id: 'shiva-ganga',
        title: 'Bearing the River',
        content: 'King Bhagiratha performed centuries of penance to bring the celestial river Ganga down to earth, so her waters could liberate the souls of his ancestors. But Ganga\'s descent posed a problem no one could solve: falling from heaven at full force, she would shatter the earth itself. Only one being could break that fall. Shiva stood beneath the plunging river and received her full force on his head, where she wandered, tamed, through the labyrinth of his matted hair before flowing gently to the plains. The impact that would have destroyed the world became, on his head, an ornament.',
        moralLesson: 'Sometimes love means standing where the blow will land. Whoever absorbs the shock so that others receive only the blessing — a parent, a leader, a friend — is doing Shiva\'s work with the Ganga.',
        category: 'teaching',
        relatedScripture: 'Valmiki Ramayana, Bala Kanda, sargas 42–44'
      },
      {
        id: 'shiva-nataraja',
        title: 'The Lord of the Dance',
        content: 'As Nataraja, Shiva dances the cosmos into being and out of it. In his upper right hand, the damaru drum beats creation into rhythm; in his upper left burns the fire of dissolution. His lower right hand is raised: "do not fear." His lower left points to his lifted foot: "here is refuge." And beneath his dancing feet lies the dwarf Apasmara — forgetfulness, ignorance — subdued not by rage but by rhythm. The ring of flames around him is the universe itself, rising and falling with his steps. The image, beloved of the South Indian Shaiva tradition, holds the whole teaching in bronze: creation and destruction are one dance, and at its center is a face of perfect calm.',
        moralLesson: 'Life creates and destroys in the same motion — resisting the rhythm is what hurts. Find the still face at the center of your own dance, and even loss becomes a step.',
        category: 'teaching',
        relatedScripture: 'Shaiva tradition (Chidambaram; Ananda Tandava iconography)'
      }
    ],
    worship: {
      bestTimes: ['Monday', 'Pradosh (twilight)', 'Maha Shivratri'],
      offerings: ['Bilva (bel) leaves', 'Water and milk on the linga', 'White flowers'],
      rituals: ['Abhishekam (pouring water/milk)', 'Om Namah Shivaya japa', 'Night vigil on Shivratri'],
      fasting: ['Mondays', 'Maha Shivratri'],
      pilgrimage: ['Kashi Vishwanath (Varanasi)', 'Kedarnath', 'The twelve Jyotirlingas'],
      dailyPractices: ['Meditation', 'Panchakshari mantra']
    },
    audioUrl: '/audio/pronunciation/shiva.mp3',
    podcastEpisodes: [],
    significance: 'Shiva teaches that transformation — even painful endings — is sacred, and that the deepest power is still, simple, and willing to absorb the world\'s poison for love of it',
    modernRelevance: 'For anyone navigating loss, change, or burnout, Shiva models absorbing difficulty without transmitting it, letting endings compost into beginnings, and the discipline of stillness',
    familyConnections: [
      { relationTo: 'ganesha', relationship: 'Father', description: 'Father of Ganesha, whose elephant head he gave' },
      { relationTo: 'krishna', relationship: 'Fellow aspect of the divine', description: 'In the Gita (10.23) Krishna names Shiva (Shankara) as his own splendor among the Rudras' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/shiva-cover.jpg'),
      iconImage: '/images/deities/shiva-icon.jpg',
      galleryImages: []
    },
    kicker: "The god of endings, ash-smeared and utterly still on his mountain — who drinks the world's poison so no one else has to.",
    learnItems: [
      'Shiva is the great destroyer, and his centre is perfect stillness',
      'Greatness is what you can absorb, not what you acquire',
      'Someone must break the fall so grace blesses instead of shatters',
      "Depth doesn't require leaving — the hermit is also a family man",
      'He is the easily-pleased god: sincerity matters, not show',
    ],
    handoff:
      "Shiva sits at the still centre of a family. The best-loved member of that family is his son — the cheerful, elephant-headed god that Hindus turn to before they begin anything at all: Ganesha.",
    sections: [
      {
        id: 'shiva-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Shiva is one of Hinduism's three great gods, and the one people find strangest at first: the god of destruction, who turns out to be the god of stillness, of endings that clear the way for new beginnings.\n\nOver the next few pages you'll meet him — the ash-smeared hermit on his mountain who is also a loving husband and father, and who quietly drinks the world's poison so the rest of us don't have to.",
      },
      {
        id: 'shiva-stillness',
        title: 'Who Shiva Is',
        subtitle: 'The still god of endings',
        takeaway:
          'Shiva is the great destroyer — the god who dissolves the old world so a new one can be born. And his deepest power is not action, but perfect stillness.',
        storyText:
          "Hindus often picture God's work as having three parts, shared by three great gods: **Brahma** creates the world, **Vishnu** protects it, and **Shiva** dissolves it, so it can be born fresh again. Shiva is the destroyer, but not out of cruelty. He is the god of the endings that make room for beginnings: the winter before the spring, the death before the rebirth, the letting-go before the new thing.\n\nAnd here is the surprise. The god in charge of all that cosmic destruction is, in every image, completely **still**. He sits high on the frozen mountain of **Kailasa**, his body smeared with ash, his eyes half-closed, owning almost nothing: a tiger skin, a three-pronged spear, and a small drum.\n\nThe tradition is making a bold claim through that pose: that underneath all our doing there is simply **being**, and the one who has touched it holds more real power sitting still than the busy gods hold in all their motion.",
        teachingText:
          "Your own life probably looks like the busy gods': always protecting, creating, putting out fires. Shiva asks a quietly subversive question: when did you last sit with nothing to do and nothing to become? Five minutes of genuine stillness — not rest so that you can work more, but stillness for its own sake — is his practice. Everything else in his story flows from that seat.",
        citation: 'The three gods (Brahma, Vishnu, Shiva) and Shiva as Mahadeva: pan-Hindu tradition.'
      },
      {
        id: 'shiva-poison',
        title: 'Drinking the Poison',
        subtitle: 'A blue throat above a saved world',
        takeaway:
          'When gods and demons churned the ocean, the first thing to surface was poison, not treasure. Shiva drank it to save everyone and held it in his throat — the rarest strength: to absorb pain without passing it on.',
        storyText:
          "There is a famous story called the churning of the ocean. The gods and the demons work together, churning the cosmic sea like butter, to draw out **amrita**, the nectar that makes you immortal. But the very first thing to rise from all that effort is not nectar. It is **halahala**, a poison strong enough to burn up the whole world.\n\nIt is an honest picture of effort. Churn anything hard enough — a career, a family, a country — and the poison tends to surface before the reward does.\n\nEveryone else fled. Shiva, who had not even taken part and wanted no nectar for himself, simply walked up and drank the poison down. His wife **Parvati** pressed his throat so the poison would lodge there and go no further, harming no one. The worlds went back to their churning. Shiva kept only a blue stain on his neck, and a new name: **Neelakantha**, 'the blue-throated one.'",
        teachingText:
          "Every family, team, and community makes its own poison — resentment, grief, blame — long before it makes anything sweet. Someone has to take that in and neutralise it, instead of passing it along. Notice who does that where you live and work, and notice when it is you. The teaching is exact: hold it in the throat. Do not swallow it down into yourself, and do not spray it onto others. That narrow place, between bottling it up and passing it on, is where Shiva lives.",
        citation: 'Samudra manthan (churning of the ocean): Bhagavata Purana, Canto 8, Chapters 6–7.',
        checks: [
          {
            id: 'chk:deity:shiva:poison',
            kind: 'mcq',
            prompt: 'When the churned ocean gave up a world-burning poison and everyone else fled, what did Shiva do, and what does it teach?',
            options: [
              {
                text: 'He drank the poison to save everyone and held it in his throat — greatness is what you can absorb without passing it on, not what you acquire',
                correct: true,
              },
              { text: 'He used the poison as a weapon against the demons' },
              { text: 'He refused to help, since he had not done any of the churning' },
            ],
            why: 'Shiva wanted no nectar and had not churned, yet he took in the harm so no one else would suffer it. To hold pain in the throat, neither swallowing it nor spraying it onward, is the rarest strength.',
          },
        ],
      },
      {
        id: 'shiva-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          "Still at his centre, and willing to take in the world's poison. The next story shows the same strength turned toward a river that would have shattered the earth.",
      },
      {
        id: 'shiva-ganga-bearer',
        title: 'The One Who Breaks the Fall',
        subtitle: 'A river landing in matted hair',
        takeaway:
          'The sacred river Ganga would have shattered the earth if it fell straight from heaven. Shiva stood under it and took the blow on his own head, so the world received only the blessing.',
        storyText:
          "There is a river Hindus hold sacred above all others: the **Ganga** (the Ganges). The old story says she once flowed only in heaven, and a king named **Bhagiratha** prayed for lifetimes to bring her down to earth, so her waters could free the trapped souls of his ancestors.\n\nBut there was a problem no one could solve. Falling from heaven at full force, the river would smash the earth to pieces. Grace at full strength can look exactly like catastrophe.\n\nOnly one being could take that blow. Shiva stood beneath the plunging river and caught its entire force on his head, letting the water wind slowly through his thick, matted hair until it came out the other side as a calm river the earth could safely hold. The gentle Ganga that blesses the plains today is the Ganga after Shiva broke her fall: the same power, made survivable.",
        teachingText:
          'Think of what has come down on your own family line: money or the lack of it, heavy expectations, old grief. In almost every family, someone stands where Shiva stood and breaks the fall, so that what reaches the next generation arrives as a blessing instead of a blow. Naming who did that for you is gratitude. Choosing to do it for those who come after you is dharma.',
        citation: 'Descent of the Ganga: Valmiki Ramayana, Bala Kanda, sargas 42–44.',
        checks: [
          {
            id: 'chk:deity:shiva:ganga',
            kind: 'mcq',
            prompt: 'The sacred river Ganga would have shattered the earth falling straight from heaven. What did Shiva do, and what does it model?',
            options: [
              {
                text: "He took the river's full force on his own head so the world received only the gentle blessing — someone must break the fall for others",
                correct: true,
              },
              { text: 'He turned the river away so it never reached the earth at all' },
              { text: 'He drank the whole river, the way he drank the poison' },
            ],
            why: "Grace at full force can look like catastrophe. Whoever absorbs the shock so that others receive only the blessing — a parent, a leader, a friend — is doing Shiva's work with the Ganga.",
          },
        ],
      },
      {
        id: 'shiva-householder',
        title: 'The Ascetic Who Married',
        subtitle: 'A mountain home with a still centre',
        takeaway:
          "Shiva is a wild hermit who owns nothing — and also a devoted husband and father. He shows that spiritual depth doesn't require leaving your family, but building the family around a still centre.",
        storyText:
          "Here is the twist that makes Shiva so loved. The wild, ash-smeared **ascetic** (someone who gives up comfort and pleasure to seek God) is also Hinduism's most beloved family man.\n\nHis wife **Parvati** did not win him with beauty. When desire itself, in the form of the love-god **Kama**, fired an arrow to make Shiva fall for her, Shiva burned Kama to ash with a glance of his third eye. Parvati won him instead through **tapasya** — years of the same fierce self-discipline that he practised — until he recognised her as a true equal.\n\nTheir marriage joins what the world treats as opposites: the hermit and the mountain-king's daughter, deep stillness and warm devotion. Their home on Mount Kailasa — Parvati, their sons Ganesha and Kartikeya, and Nandi the bull waiting at the door — became the model of a family built around a quiet, meditative centre rather than around constant busyness.",
        teachingText:
          "Shiva overturns the idea that spiritual depth means leaving ordinary life behind. He is fully a hermit and fully a husband, and his meditation does not stop when the family starts. What would it mean for your own home to have a still centre — one practice, one hour, one corner where the churning stops? The tradition's answer to work-life balance is not really balance. It is a centre.",
        citationLink: 'deity:parvati',
        citation: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa, Kumarasambhava.'
      },
      {
        id: 'shiva-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Destroyer, poison-drinker, fall-breaker, and family man. One idea is left, and it is the gentlest: how little Shiva actually asks of you.',
      },
      {
        id: 'shiva-simple-offering',
        title: 'The Easily-Pleased Lord',
        subtitle: 'One leaf and a handful of water',
        takeaway:
          'Shiva is the easily-pleased god. He needs no priest, no wealth, no grand ritual — just a leaf, some water, and a sincere heart. He measures your sincerity, never your show.',
        storyText:
          "Of all the great gods, Shiva is **Bholenath**, which means 'the innocent one,' the simple lord who is easily pleased.\n\nWorshipping him takes no priest, no money, and no elaborate ceremony: a single **bilva** leaf (from a tree sacred to him), some water poured over a **linga** (the smooth, rounded stone that stands for Shiva), and his name said with attention. The tradition loves stories of people who worship him by accident — like a frightened hunter who spent a night up a tree, dropping bilva leaves without knowing it onto a linga below, and was set free by morning.\n\nThe point underneath is serious: God measures your sincerity, not your production values. The god who owns nothing cannot be impressed by what you own.",
        teachingText:
          'Whatever your own practice is turning into, Shiva keeps it honest with one question: could you still do it with a single leaf and a palmful of water? If your spiritual life has grown elaborate, full of apps and courses and gear, strip it back once a week to the bare act. Sit, pour the water, say the name, and mean it. Bholenath asks for nothing more, and that is exactly what makes the offering complete.',
        citationLink: 'festival:maha-shivratri-2025',
        citation: 'The hunter\'s night of bilva leaves: Shiva Purana (Shivratri mahatmya tellings).',
        checks: [
          {
            id: 'chk:deity:shiva:simple',
            kind: 'mcq',
            prompt: 'Shiva is called Bholenath, the easily-pleased. What does his simple worship — a leaf, some water, his name — teach?',
            options: [
              {
                text: 'God measures your sincerity, not your show — the god who owns nothing cannot be impressed by what you own',
                correct: true,
              },
              { text: 'That only the poor are allowed to worship Shiva' },
              { text: 'That worship must always be elaborate and expensive to count' },
            ],
            why: 'His worship needs no priest, wealth, or grand ritual. The tradition even tells of people who please him by accident, because what he asks for is a sincere heart, not an impressive offering.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: '7.59.12 (Tryambakam / Mahamrityunjaya mantra)',
        translation: 'public-domain renderings; cross-checked',
        url: 'https://greenmesg.org/stotras/vedas/rigveda/mandala7/sukta59/rudra-om_tryambakam_yajamahe.php',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 8, Chapters 6–7 (churning of the ocean; halahala)',
        translation: 'cross-checked against public translations (vedabase.io / wisdomlib.org)',
      },
      {
        text: 'Valmiki Ramayana',
        locator: 'Bala Kanda, sargas 42–44 (Bhagiratha and the descent of the Ganga)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/utf8/baala/sarga43/bala_43_prose.htm',
      },
      {
        text: 'Shaiva tradition',
        locator: 'Nataraja / Ananda Tandava iconography (Chidambaram); Bholenath and bilva-leaf devotion',
        translation: 'traditional; presented as tradition, not scripture quotation',
      },
    ],
    reflectionQuestions: [
      'Shiva absorbed poison without passing it on. When you\'re stressed, how could you avoid passing it to the people around you?',
      'Shiva\'s real power is stillness. When did you last sit with nothing to do and nothing to become, and what keeps you from five minutes of it?',
      "Every family has someone who 'breaks the fall,' so grief or pressure reaches the next generation softened. Who did that for you? Could you do it for someone?",
    ]
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    sanskritName: 'हनुमान्',
    titles: ['Maruti', 'Anjaneya', 'Pavanputra', 'Bajrangbali', 'Sankata Mochana'],
    category: 'major',
    description: 'The devoted one — boundless strength in perfect service, remover of distress',
    mythology: 'Son of the wind god Vayu and Anjana, Hanuman is the Ramayana\'s greatest devotee and its mightiest hero — and the tradition\'s insistence that those are the same thing. He leapt an ocean on the strength of remembering whose work he was doing, burned Lanka with the tail meant to humiliate him, and carried a mountain when he could not identify a herb. Yet his defining image is not any feat: it is Hanuman kneeling, hands folded, eyes on Rama. His strength is total because his ego is absent; nothing of him is spent maintaining himself.',
    attributes: ['Devotion', 'Strength', 'Courage', 'Humility', 'Service', 'Celibate discipline'],
    symbols: ['Gada (mace)', 'Mountain in hand', 'Open chest revealing Rama and Sita', 'Flying posture'],
    mantras: [
      {
        id: 'hanuman-mula',
        sanskrit: 'ॐ श्री हनुमते नमः',
        transliteration: 'oṁ śrī hanumate namaḥ',
        meaning: 'Om, salutations to Shri Hanuman',
        purpose: 'For courage, protection, and strength in service',
        benefits: ['Courage under fear', 'Strength for duty', 'Protection']
      },
      {
        id: 'hanuman-chalisa',
        sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि। बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥',
        transliteration: 'śrī-guru carana saroja raja nija manu mukuru sudhāri, baranaū̃ raghubara bimala jasu jo dāyaku phala cāri',
        meaning: 'Cleansing the mirror of my mind with the dust of my guru\'s lotus feet, I sing the pure glory of the best of Raghus — the giver of life\'s four fruits (opening of the Hanuman Chalisa)',
        purpose: 'The Hanuman Chalisa (Tulsidas, 16th century) — forty verses recited daily by millions for strength and protection',
        benefits: ['Daily discipline', 'Fearlessness', 'Devotional focus']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Powerful monkey-faced figure, often colored sindoor-orange, muscular and humble at once',
      clothing: 'Loincloth of a renunciant, sacred thread',
      colors: ['Orange (sindoor)', 'Red'],
      objects: ['Gada (mace)', 'Sanjivani mountain'],
      vehicle: 'None — he flies by his own power, son of the wind',
      posture: 'Kneeling before Rama, flying with the mountain, or tearing open his chest to reveal Rama and Sita within',
      facesAndArms: 'One face, two arms (Panchamukhi five-faced form in some traditions)'
    },
    teachings: [
      'Strength exists for service, not display',
      'You are stronger than you remember — you only need to be reminded of whose work you do',
      'Devotion turns obstacles into milestones',
      'When you cannot tell which herb heals, carry the whole mountain',
      'The servant\'s seat is higher than the throne'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'hanuman-sundara',
        text: 'ramayana',
        section: 'Sundara Kanda',
        relevance: 'The "beautiful chapter" — Hanuman\'s leap to Lanka and the finding of Sita; recited whole for courage in crisis'
      }
    ],
    stories: [
      {
        id: 'hanuman-leap',
        title: 'The Leap Across the Ocean',
        content: 'A hundred yojanas of ocean lay between the searching vanaras and Lanka, where Sita was held. The mightiest among them weighed their strength aloud and fell short. Hanuman sat apart, silent — he had forgotten what he could do. As a child he had been cursed to forget his powers until someone reminded him of them. The old bear Jambavan came to him and simply recounted who he was: son of the wind, who once leapt for the sun itself. As the words landed, Hanuman began to grow. He grew until the mountain he stood on sank beneath his gathering force, and then he threw himself across the sky — outracing his father the wind, meeting tests from the serpent-mother Surasa and the shadow-demon Simhika midair, refusing rest on the golden mountain Mainaka — until Lanka rose before him.',
        moralLesson: 'Most of what we call inability is forgetting. Everyone needs a Jambavan — and everyone must sometimes be one: the friend who reminds another of powers they have stopped believing in.',
        category: 'adventure',
        relatedScripture: 'Valmiki Ramayana, Sundara Kanda, sarga 1 (Jambavan\'s reminder: Kishkindha Kanda, sargas 65–67)'
      },
      {
        id: 'hanuman-sun',
        title: 'The Child Who Leapt for the Sun',
        content: 'As an infant, Hanuman woke hungry and saw the rising sun — round, glowing, surely the ripest fruit ever hung in a tree. So he leapt for it. The child of the wind rose through the sky toward the sun itself, and the alarmed king of the gods struck him down with the thunderbolt, breaking his jaw — hanu — giving him the name he carries. His father Vayu, the wind, withdrew from the world in grief until the gods made amends the only way that could satisfy a father: each granted the child a boon. Strength beyond measure, speed beyond the wind, life beyond death. The appetite that looked like recklessness became, blessed and disciplined, the power that would one day cross an ocean.',
        moralLesson: 'The hungers that get children into trouble are the same energies that, rightly directed, become greatness. Do not curse the leap — train it.',
        category: 'origin',
        relatedScripture: 'Valmiki Ramayana, Uttara Kanda (Hanuman\'s childhood, as recounted to Rama)'
      },
      {
        id: 'hanuman-mountain',
        title: 'Carrying the Mountain',
        content: 'When Lakshmana lay dying on the battlefield, only one herb could save him — sanjivani, growing on a single Himalayan slope a subcontinent away, and only before dawn. Hanuman crossed the distance in the dark, reached the mountain, and faced an honest problem: the herbs all looked alike, and there was no time to be wrong. So he made the choice that has delighted India ever since — he wrapped his arms around the mountain, tore it from the earth, and carried the whole thing back across the sky, letting the physicians find the herb while Lakshmana still breathed.',
        moralLesson: 'When you cannot identify the one thing that will help someone you love, bring everything you have. Wholeheartedness forgives imprecision; hesitation does not.',
        category: 'adventure',
        relatedScripture: 'Valmiki Ramayana, Yuddha Kanda (sanjivani episode)'
      }
    ],
    worship: {
      bestTimes: ['Tuesday', 'Saturday', 'Hanuman Jayanti'],
      offerings: ['Sindoor', 'Ladoo and bananas', 'Oil lamps'],
      rituals: ['Hanuman Chalisa recitation', 'Sundara Kanda reading in times of difficulty'],
      fasting: ['Tuesdays'],
      pilgrimage: ['Hanuman Garhi (Ayodhya)', 'Sankata Mochana (Varanasi)', 'Namakkal Anjaneyar'],
      dailyPractices: ['Chalisa', 'Physical discipline offered as service']
    },
    audioUrl: '/audio/pronunciation/hanuman.mp3',
    podcastEpisodes: [],
    significance: 'Hanuman embodies the union the tradition prizes most: limitless capability wholly surrendered to loving service — strength that never curdles into ego because it never serves itself',
    modernRelevance: 'The patron of everyone who doubts their own capacity: his powers return the moment someone reminds him whose work he is doing. Beloved of students, athletes, and anyone facing what looks like an uncrossable ocean',
    familyConnections: [
      { relationTo: 'rama', relationship: 'Beloved lord', description: 'Hanuman\'s entire being is organized around service to Rama' },
      { relationTo: 'shiva', relationship: 'Aspect/blessing', description: 'Widely revered in tradition as an aspect or blessing of Shiva (Rudra)' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/hanuman-cover.jpg'),
      iconImage: '/images/deities/hanuman-icon.jpg',
      galleryImages: []
    },
    kicker: 'The mighty monkey-god who can leap oceans and lift mountains — and pours every bit of that power into loving service, keeping none for himself.',
    learnItems: [
      'Hanuman is the mighty monkey-god and the greatest devotee of Rama',
      'Most of what we call inability is really just forgetting',
      'Strength given to service has no ego, and no drag',
      'Power gets you there; gentleness accomplishes the mission',
      "Devotion is measured by what's truly in your heart",
    ],
    handoff:
      "Hanuman's power is devotion turned outward. The next face of God is power itself, fierce and protective — the warrior goddess who rides a lion into battle against the demons no one else can defeat: Durga.",
    sections: [
      {
        id: 'hanuman-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Hanuman is the beloved monkey-god — immensely strong, able to fly, and the most famous devotee in all of Hinduism. If you have ever seen a small orange shrine by an Indian roadside, it is very often his.\n\nOver the next few pages you'll meet him, and discover why a being who can leap across an ocean is worshipped above all for his humility and his heart.",
      },
      {
        id: 'hanuman-who',
        title: 'Who Hanuman Is',
        subtitle: 'The monkey-god of pure devotion',
        takeaway:
          'Hanuman is the mighty monkey-god and the greatest devotee in all of Hinduism — a being of limitless strength who uses every bit of it not for himself, but in loving service to Rama.',
        storyText:
          "Hanuman is the **monkey-god**: immensely strong, able to fly and to change his size, and the most famous devotee in all of Hinduism. He is the son of **Vayu**, the wind-god, which is why he moves like the wind itself.\n\nHis whole story sits inside the **Ramayana**, the epic of Rama you met a few gods ago. When Rama's wife Sita is kidnapped and carried across the sea to the island of Lanka, it is Hanuman who leaps the ocean, finds her, and helps win the war to bring her home.\n\nBut here is what truly makes him special: Hanuman can do almost anything, and he wants nothing for himself. Every ounce of his enormous power is poured into serving the one he loves. He is what the tradition prizes most of all — total strength, wholly given away.",
        teachingText:
          "That combination — great power and zero ego — is far rarer than either one alone. Most powerful people spend much of their strength protecting their own image. Hanuman spends none. It is worth asking, of your own strengths: how much goes into the work itself, and how much goes into looking good while you do it?",
        citation: 'Hanuman throughout the Valmiki Ramayana; son of Vayu, the wind: traditional.'
      },
      {
        id: 'hanuman-forgotten-strength',
        title: 'The Strength You Forgot You Had',
        subtitle: 'An old bear speaking to a silent monkey',
        takeaway:
          "Hanuman sat silent at the ocean's edge, having literally forgotten he was strong enough to leap it. An old friend simply reminded him who he was — and he grew with every word.",
        storyText:
          "The Ramayana's most quietly moving scene is not a battle. Rama's search party of monkey-warriors sits defeated at the edge of the ocean. Somewhere far across that sea is Lanka, where Sita is held prisoner, and it is simply too wide to jump. The strongest among them try in their minds and fall short.\n\nHanuman sits apart, saying nothing. He does not offer to try, because it genuinely does not occur to him that he can: as a child he was cursed to forget his own powers until someone reminded him of them.\n\nThen **Jambavan**, an ancient and wise bear, walks over and does the one heroic thing still left to the old — he remembers on Hanuman's behalf. You are the son of the wind, he says. You are the child who once leapt for the sun. For you, this whole ocean is a puddle. And with every sentence, Hanuman literally grows larger, because the words are not flattery. They are facts about himself that he had simply misplaced.",
        teachingText:
          "This curse of forgotten strength is not just a myth; it is Monday morning. Abilities you showed for years can vanish from your own self-image after a single season of failure. Hanuman's lesson here runs both ways: seek out your 'Jambavans,' the people who will state your strengths back to you as plain facts. And be one for others, because reminding someone of their own power is not merely encouragement. It is testimony.",
        citation: 'Valmiki Ramayana, Kishkindha Kanda, sargas 65–67.',
        checks: [
          {
            id: 'chk:deity:hanuman:strength',
            kind: 'mcq',
            prompt: 'Hanuman sat silent while the others despaired at the ocean, even though he alone could cross it. Why?',
            options: [
              {
                text: 'A childhood curse had made him forget his own powers — he needed a friend to remind him who he was',
                correct: true,
              },
              { text: 'He was too proud to help the other monkeys' },
              { text: 'He was genuinely too weak to make the leap' },
            ],
            why: 'Most of what we call inability is really forgetting. Everyone needs a Jambavan to remind them of powers they have stopped believing in — and everyone must sometimes be one.',
          },
        ],
      },
      {
        id: 'hanuman-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'His strength came back the moment he remembered whose it was for. That is the real secret of his power, and the next card names it.',
      },
      {
        id: 'hanuman-whose-work',
        title: 'Strength That Serves',
        subtitle: 'Power with nothing left over for the self',
        takeaway:
          "Everything Hanuman does is enormous, and none of it is for himself. Strength without ego has no drag: because he serves something larger, he ends up bigger than any obstacle.",
        storyText:
          "Everything Hanuman does is enormous — oceans leapt, cities burned, mountains carried — and none of it is for himself.\n\nThis is the secret engine of his character: strength without ego has no drag. The mighty figures in the epics who serve only themselves — like **Ravana**, the ten-headed demon-king who kidnapped Sita — burn most of their power simply defending their own image. Hanuman spends nothing on himself.\n\nAsked how he crossed the impossible ocean, his answer is always the same: by Rama's name, and for Rama's sake. The strength is real, but its effortlessness comes from the devotion.",
        teachingText:
          "Watch what happens to your own ability when the work is genuinely for something beyond you — the meeting where you stop defending your idea and start serving the actual problem. Ego is drag. Hanuman's question for any task is simple: whose work is this? When the honest answer is 'something larger than me,' you may find, as he did, that you have suddenly become bigger than the obstacle.",
        citation: 'Valmiki Ramayana, Sundara Kanda (the crossing).',
        checks: [
          {
            id: 'chk:deity:hanuman:service',
            kind: 'mcq',
            prompt: 'Hanuman does enormous things but keeps nothing for himself. What does the tradition say makes his strength so effortless?',
            options: [
              {
                text: 'It is given entirely to service — strength without ego has no drag, so he ends up bigger than any obstacle',
                correct: true,
              },
              { text: 'He is simply the strongest being in the universe by nature' },
              { text: 'He uses secret magic weapons the others do not have' },
            ],
            why: 'Those who serve only themselves spend most of their power protecting their own image. Hanuman spends none, so all of it reaches the work. Ego is drag.',
          },
        ],
      },
      {
        id: 'hanuman-in-lanka',
        title: 'Alone in the Enemy City',
        subtitle: 'A small monkey in golden Lanka at night',
        takeaway:
          "Hanuman crossed the ocean by force, but rescued hope by gentleness. Finding the grieving Sita, he didn't burst in — he softly sang her husband's story from the branches until hope reached her first.",
        storyText:
          "Having crossed the ocean as a giant, Hanuman enters Lanka the opposite way — shrinking himself to the size of a cat, and slipping through the glittering city by night.\n\nThe epic lingers on his search: palace by palace, room by room, through the sleeping splendour of Ravana's city, his discipline holding against despair as Sita is nowhere to be found.\n\nWhen he finally spots her, held in a grove of **ashoka** trees, guarded and grieving but still refusing Ravana, he faces a delicate problem: how does a strange monkey appear before a captive, frightened queen without terrifying her? So he doesn't. He begins softly, hidden in the branches above her, singing the story of Rama — her own story — until hope reaches her before he does. Only then does he show himself, and give her a ring that Rama had sent as proof.",
        teachingText:
          "Power got him to Lanka; gentleness accomplished the actual mission. Reaching someone in despair takes Hanuman's branch-singing: not bursting in with solutions, but letting the familiar story of what they love reach them first. This part of the epic is recited in Indian homes precisely in times of crisis, as a kind of manual for carrying hope into dark places without breaking anything.",
        citation: 'Valmiki Ramayana, Sundara Kanda.'
      },
      {
        id: 'hanuman-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          "Strength, service, and gentleness. One image of Hanuman remains, and it is the one carved deepest into the tradition's heart.",
      },
      {
        id: 'hanuman-chest',
        title: 'What Lives in the Chest',
        subtitle: 'A necklace bitten open, a chest torn wide',
        takeaway:
          "Given a priceless pearl necklace, Hanuman tore each pearl open looking for Rama inside — then tore open his own chest, and there sat Rama in his heart. Devotion is measured by what's really inside you, not what you wear or say.",
        storyText: "At Rama's coronation, gifts flowed, and Sita gave Hanuman a necklace of priceless pearls.\n\nHe held it to his ear, bit one pearl open, frowned, bit another, and threw each aside — searching for something. Asked what on earth he was doing, he answered: I keep nothing that does not contain Rama. The court laughed at the simple-minded monkey.\n\nAnd then Hanuman, in the version the later tradition loves most, tore open his own chest with his hands — and there, seated inside his heart, were Rama and Sita. The court stopped laughing. Whatever you make of the image, its claim is exact: the true measure of devotion is not what you wear or say, but what an honest look inside your chest would reveal.",
        teachingText: 'This story is later tradition rather than Valmiki, and the tradition kept it because it asks the only question that matters: **if your chest were opened** — your calendar, your accounts, your browser history, your 3 a.m. thoughts — **what would be found enthroned there?**\n\nHanuman\'s answer had the advantage of being true. The practice is to make yours true too, one relocation of the heart at a time.',
        citation: 'The opened chest: later devotional tradition (not Valmiki), widely told.',
        checks: [
          {
            id: 'chk:deity:hanuman:chest',
            kind: 'mcq',
            prompt: 'Given a priceless pearl necklace, Hanuman bit each pearl open, then tore open his own chest. Why?',
            options: [
              {
                text: 'He kept nothing that did not contain Rama — and inside his own heart sat Rama himself; devotion is what an honest look inside would reveal',
                correct: true,
              },
              { text: 'He was only checking whether the pearls were real' },
              { text: 'He wanted to prove he was stronger than the whole court' },
            ],
            why: 'The measure of devotion is not what you wear or say, but what would be found enthroned in your heart if it were opened. Hanuman\'s answer had the advantage of being true.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Valmiki Ramayana',
        locator: 'Sundara Kanda, sarga 1 (the leap); Kishkindha Kanda, sargas 65–67 (Jambavan\'s reminder); Yuddha Kanda (sanjivani); Uttara Kanda (childhood)',
        translation: 'valmikiramayan.net (public)',
        url: 'https://www.valmikiramayan.net/utf8/sundara/sarga1/sundara_1_prose.htm',
      },
      {
        text: 'Hanuman Chalisa',
        locator: 'Tulsidas (16th century), opening doha',
        translation: 'traditional Awadhi text',
      },
      {
        text: 'Later tradition',
        locator: 'The pearl-necklace / opened-chest story — devotional tradition, labeled as such (not Valmiki)',
      },
    ],
    reflectionQuestions: [
      'Hanuman forgot his own strength until a friend reminded him. What are you good at that you tend to forget?',
      "Whose 'Jambavan' could you be this week — reminding someone of a strength they've stopped believing they have?",
      'Think of a task that feels too big. How would it change if you asked Hanuman\'s question: whose work is this, really?',
    ]
  },
  {
    id: 'durga',
    name: 'Durga',
    sanskritName: 'दुर्गा',
    titles: ['Devi', 'Ambika', 'Chandika', 'Mahishasura-Mardini', 'Sherawali'],
    category: 'major',
    description: 'The invincible mother — the combined power of all the gods, fierce in protection, tender in love',
    mythology: 'When the buffalo demon Mahishasura, unbeatable by any man or god, overran the heavens, the gods did something unprecedented: they pooled their essence. From their combined radiance a light gathered and took form — a woman of blinding beauty riding a lion, each of her many arms carrying a god\'s own weapon, given freely. Durga is not one god\'s consort or another\'s daughter in this, her defining story: she is what the divine looks like when everything holy stops competing and combines. She laughed at the demon\'s marriage proposals, fought him through his shape-shifting deceits, and freed the worlds. The Devi Mahatmya, recited every Navratri, calls her the one who is present in all beings — as consciousness, as power, as mother, as peace.',
    attributes: ['Protection', 'Fierce compassion', 'Courage', 'Motherly love', 'Righteous power'],
    symbols: ['Lion or tiger mount', 'Trident', 'Discus, sword, bow — the gods\' pooled weapons', 'Lotus', 'Conch'],
    mantras: [
      {
        id: 'durga-ya-devi',
        sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
        transliteration: 'yā devī sarva-bhūteṣhu śhakti-rūpeṇa saṁsthitā, namas tasyai namas tasyai namas tasyai namo namaḥ',
        meaning: 'To the Goddess who abides in all beings in the form of power — salutations to her, salutations to her, salutations to her, again and again',
        purpose: 'From the Devi Mahatmya, Chapter 5 — the great litany recognizing the Goddess in every being',
        benefits: ['Recognizing sacred power everywhere', 'Strength', 'Reverence for all beings']
      },
      {
        id: 'durga-bija',
        sanskrit: 'ॐ दुं दुर्गायै नमः',
        transliteration: 'oṁ duṁ durgāyai namaḥ',
        meaning: 'Om, salutations to Durga (with her seed syllable duṁ)',
        purpose: 'Durga\'s bija mantra — for protection and courage in difficulty',
        benefits: ['Protection', 'Fearlessness', 'Resolve']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'Radiant golden goddess with eight to ten arms, serene face above weapons in motion',
      clothing: 'Red sari, crown, warrior\'s ornaments',
      colors: ['Red', 'Gold'],
      objects: ['Trident (from Shiva)', 'Discus (from Vishnu)', 'Bow (from Vayu)', 'Sword', 'Conch', 'Lotus'],
      vehicle: 'Lion (or tiger)',
      posture: 'Riding the lion mid-battle, spear poised over Mahishasura — or enthroned as the serene mother',
      facesAndArms: 'One serene face; eight, ten, or eighteen arms bearing the gods\' weapons'
    },
    teachings: [
      'When the holy combine instead of compete, the impossible becomes routine',
      'Fierceness and motherliness are one love in two weathers',
      'Evil shape-shifts; clarity must outlast every disguise',
      'The Goddess abides in all beings — treat every being accordingly',
      'Do not fight on the deceiver\'s terms; hold your ground until the true form shows'
    ],
    festivals: ['navratri-2025'],
    scriptureReferences: [
      {
        id: 'durga-dm-birth',
        text: 'puranas',
        section: 'Devi Mahatmya (Markandeya Purana, ch. 81–93), Chapter 2',
        relevance: 'Durga\'s birth from the combined radiance of all the gods, each granting her their weapon'
      },
      {
        id: 'durga-dm-mahisha',
        text: 'puranas',
        section: 'Devi Mahatmya, Chapters 2–3',
        relevance: 'The battle with Mahishasura through his shape-shifting, ending with the buffalo demon slain'
      },
      {
        id: 'durga-dm-yadevi',
        text: 'puranas',
        section: 'Devi Mahatmya, Chapter 5',
        relevance: 'The Ya Devi litany: the Goddess present in all beings as power, consciousness, peace, and mother',
        quote: 'To the Goddess who abides in all beings in the form of power — salutations to her, again and again'
      }
    ],
    stories: [
      {
        id: 'durga-birth',
        title: 'Born of Combined Light',
        content: 'Mahishasura had a boon: no man and no god could kill him. Armed with that loophole, the buffalo demon drove the gods from heaven. Defeated, they gathered — Vishnu, Shiva, Brahma, Indra, all of them — and their anger and resolve poured out of them as light. The streams of radiance fused into a single blaze, and the blaze took form: a woman. Shiva\'s light became her face, Vishnu\'s her arms, Agni\'s her eyes. Then, one by one, the gods handed her their own weapons — Shiva his trident, Vishnu his discus, Vayu his bow, Himavan a lion to ride. She was not created as their servant; she was revealed as their source. The demon\'s loophole had missed her entirely: she was no man and no mere god.',
        moralLesson: 'What no power can do alone, pooled power does easily — but pooling requires each god to hand over his own weapon. The rarest strength in any family or team is the willingness to give your best tool to someone better positioned to wield it.',
        category: 'origin',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapter 2'
      },
      {
        id: 'durga-mahishasura',
        title: 'The Slaying of Mahishasura',
        content: 'The battle was a study in deception against clarity. Mahishasura came as a buffalo, and when cornered became a lion, then a man with a sword, then an elephant, then a buffalo again — each form abandoned the instant it began to lose. Durga fought unhurried, her face serene above the storm of her arms, drinking from her cup between blows, laughing at his transformations. The texts insist on that serenity: fury in her limbs, calm in her eyes. Finally, as the demon struggled halfway out of the buffalo form — caught mid-deception, neither one thing nor the other — she pinned him with her foot, pierced him with the trident, and ended it.',
        moralLesson: 'Deceit survives by changing shape the moment it is nearly caught — in a manipulator, an addiction, a self-justification. Durga\'s method: do not chase each new form; hold steady, stay calm above the effort, and strike when the deception is caught between disguises.',
        category: 'adventure',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapters 2–3'
      },
      {
        id: 'durga-in-all-beings',
        title: 'The Goddess in All Beings',
        content: 'After the victory, the gods did not merely thank her — they sang the hymn that became the Devi Mahatmya\'s heart: "To the Goddess who abides in all beings as consciousness... as power... as peace... as faith... as memory... as compassion... as mother — salutations to her, salutations to her, salutations to her, again and again." Verse upon verse, the same structure, a different presence each time. The theology is radical: Durga is not only on the battlefield. She is in every being — in the neighbor as patience, in the stranger as hunger, in the child as sleep, in you as whatever power you have ever felt move through you.',
        moralLesson: 'If the Goddess abides in all beings, then reverence is not a temple activity — every encounter is an encounter with her. The hymn is a training: to see power, patience, and peace in others as visitations, and treat them accordingly.',
        category: 'teaching',
        relatedScripture: 'Devi Mahatmya (Markandeya Purana), Chapter 5'
      }
    ],
    worship: {
      bestTimes: ['Navratri (both spring and autumn)', 'Friday', 'Ashtami days'],
      offerings: ['Red flowers (hibiscus)', 'Red chunri (cloth)', 'Fruits and halwa-puri'],
      rituals: ['Devi Mahatmya (Durga Saptashati) recitation', 'Kanya puja (honoring young girls)', 'Ghatasthapana at Navratri'],
      fasting: ['Navratri fasts', 'Fridays'],
      pilgrimage: ['Vaishno Devi', 'Kamakhya', 'The Shakti Pithas'],
      dailyPractices: ['Ya Devi recitation', 'Honoring the feminine as sacred']
    },
    audioUrl: '/audio/pronunciation/durga.mp3',
    podcastEpisodes: [],
    significance: 'Durga is the tradition\'s answer to whether the sacred can be both mother and warrior: one love, expressed as tenderness toward the vulnerable and as fire toward whatever threatens them',
    modernRelevance: 'For anyone who must be both gentle and unyielding — parents, caregivers, leaders, anyone protecting something fragile in a hard world — Durga models fierce compassion without cruelty and calm without passivity',
    familyConnections: [
      { relationTo: 'shiva', relationship: 'Consort (as Parvati)', description: 'Durga is the fierce form of the Goddess who is also Parvati, Shiva\'s consort' },
      { relationTo: 'ganesha', relationship: 'Mother (as Parvati)', description: 'As Parvati, mother of Ganesha' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/durga-cover.jpg'),
      iconImage: '/images/deities/durga-icon.jpg',
      galleryImages: []
    },
    kicker: "The warrior-goddess born from the combined fire of all the gods — a serene mother's face above ten arms full of weapons, riding a lion into battle.",
    learnItems: [
      'Durga is the fierce, protective face of the Divine Mother',
      'What no god could do alone, the gods did by combining their power',
      'She is a fierce mother: total protection, zero hatred',
      'Evil survives by shape-shifting; the answer is steady clarity',
      "The Goddess lives in every being — reverence isn't only for temples",
    ],
    handoff:
      "Durga is the Goddess with her sword drawn. But the same Goddess has a gentler face — the patient mountain-daughter who won Shiva's heart and became the mother of his family: Parvati. She is the last of the gods we'll meet together.",
    sections: [
      {
        id: 'durga-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Most of the gods so far have been male, but in Hinduism God is very much a She as well. Durga is one of her most thrilling forms: a warrior-goddess who rides a lion, carries a weapon in each of her many hands, and yet wears the calm face of a loving mother.\n\nOver the next few pages you'll meet her, and the surprising idea at her heart — that fierceness and tenderness can be the very same thing.",
      },
      {
        id: 'durga-who',
        title: 'Who Durga Is',
        subtitle: 'The warrior form of the Divine Mother',
        takeaway:
          'Durga is the great warrior-goddess — the fierce, protective face of the Divine Mother, who rides a lion into battle against the evils no one else can defeat.',
        storyText:
          "In Hinduism, God is not only pictured as male. Many Hindus worship the **Divine Mother** — the Goddess, called simply **Devi** — as the supreme power behind the whole universe.\n\n**Durga** is her warrior form. She is usually shown as a calm, beautiful woman with many arms, each hand holding a different weapon, riding a lion into the middle of a battle. She was created, the stories say, to destroy a monster that all the male gods together could not defeat.\n\nAnd here is the twist that Hindus love: this fierce warrior is also a **mother**. She fights so hard precisely because she is protecting her children. Her fierceness is not the opposite of her tenderness. It *is* her tenderness, turned toward whatever threatens the ones she loves.",
        teachingText:
          "Durga answers a question many of us live with: can you be gentle and unyielding at the same time? Most of us split the two — soft until we snap into anger we later regret, or so calm that we fail to protect what needs us. Durga holds both at once, and the next few pages show exactly how.",
        citation: 'Durga as the warrior form of Devi (the Goddess): Devi Mahatmya tradition.'
      },
      {
        id: 'durga-when-gods-pool',
        title: 'When the Gods Stopped Competing',
        subtitle: 'Streams of light fusing into a woman on a lion',
        takeaway:
          'No single god could defeat the demon Mahishasura, so they combined: their light fused into Durga, and each god handed her his own weapon. Pooled power does what separate power cannot.',
        storyText:
          "The **Devi Mahatmya** — the great scripture of the Goddess — opens with heaven defeated. A buffalo-shaped demon named **Mahishasura** had won a magic promise that no man and no god could ever kill him, and with that loophole he had thrown the gods out of heaven. Each god, magnificent on his own, was useless alone.\n\nWhat saved the world was not a bigger god, but a different idea: they combined. Blazing light poured out of every god's body, fused into a single blaze, and took the shape of a woman.\n\nThen comes the detail the text lingers on: each god handed her his own signature weapon. Shiva gave his trident, Vishnu his spinning discus — not copies, but their very own. Durga rode out armed with everything heaven owned, all of it freely given. The demon's loophole had missed her completely: she was no man, and no ordinary god.",
        teachingText: 'Notice what the story requires before the rescue: every powerful being had to admit his individual power was not enough, and hand his best weapon to another.\n\nWhere in your family or work is the crisis persisting because everyone fights it separately, each guarding their own trident? **Durga is born wherever that surrender into combination happens.**',
        citation: 'Devi Mahatmya (Markandeya Purana), Chapters 2–3.',
        checks: [
          {
            id: 'chk:deity:durga:combined',
            kind: 'mcq',
            prompt: 'A demon had a magic promise that no god could kill him, and he threw the gods out of heaven. How was he finally defeated?',
            options: [
              {
                text: 'The gods combined their power and weapons into a new being, Durga — pooled power did what no single god could',
                correct: true,
              },
              { text: 'One god finally grew strong enough to beat him alone' },
              { text: 'They simply paid the demon to leave heaven in peace' },
            ],
            why: 'The promise protected him from every individual god. Durga was something new, born of all of them at once, so the loophole missed her. What no power can do alone, pooled power does easily.',
          },
        ],
      },
      {
        id: 'durga-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'Born of every god at once, and armed with all their weapons. Now the strangest thing about her: the calm mother\'s face she wears in the middle of the fight.',
      },
      {
        id: 'durga-fierce-mother',
        title: 'The Mother Who Carries Weapons',
        subtitle: 'A serene face above ten armed hands',
        takeaway:
          "Durga fights with a calm mother's face above arms full of weapons. She is fierce because she is a mother: total protection for the vulnerable, with no hatred for the attacker. That is fierce compassion.",
        storyText: "Durga's images hold a deliberate contradiction: the face of a serene mother, resting above ten arms full of weapons in the middle of battle.\n\nIndia has never seen those two things as a conflict. Ask anyone raised on her pictures, and they will tell you: she fights like that *because* she is a mother. The fierceness is the tenderness, pointed at whatever threatens the child.\n\nThe texts underline it: she battles Mahishasura with a calm face, even laughing, because rage is simply absent. Her protection is total, but hatred never arrives. This is what the tradition means by **fierce compassion**: love holding a sword, and wielding it without cruelty.",
        teachingText: 'Most of us split these energies — gentle until pushed into rage that we later regret, or so calm we fail to protect what needs us. Durga is the integration: **total ferocity in defense of the vulnerable, zero hatred toward the attacker.**\n\nNext time you must confront someone, try her posture — the serene face above the armed hands. Firm action, quiet eyes.',
        citation: 'Devi Mahatmya, Chapter 3.',
        checks: [
          {
            id: 'chk:deity:durga:fierce',
            kind: 'mcq',
            prompt: 'Durga fights the demon with a calm, even smiling face. What is the tradition showing with that serene look above her weapons?',
            options: [
              {
                text: 'Fierce compassion — total protection for the vulnerable, with no hatred toward the attacker; the fierceness is the tenderness',
                correct: true,
              },
              { text: 'That she is not really trying very hard in the fight' },
              { text: 'That she enjoys the violence for its own sake' },
            ],
            why: 'She battles so hard because she is a mother protecting her children, yet rage never arrives. It is love with a sword, wielded without cruelty.',
          },
        ],
      },
      {
        id: 'durga-shapeshifter',
        title: 'Fighting the Shape-Shifter',
        subtitle: 'A buffalo becoming a lion becoming a man',
        takeaway:
          "The demon kept changing shape the instant he was losing, so the fight could never end. Durga didn't chase his disguises — she stayed calm and steady, and struck when he was caught between forms.",
        storyText: 'Mahishasura never fought fair — that was the point of him. Buffalo, lion, swordsman, elephant, buffalo again: each form abandoned at the moment of losing, so **the fight could never end**.\n\nDurga\'s response was not to match his changes but to **refuse their premise**. She held her ground, stayed serene, and let each disguise exhaust itself — striking finally when he was caught halfway between forms, neither buffalo nor man, the deception itself exposed.\n\nThe Devi Mahatmya was composed by people who understood that evil\'s chief weapon is not strength but **redefinition**.',
        teachingText: 'Everything destructive in a life shape-shifts when confronted: the addiction becomes "just relaxing," the cruel relationship becomes "passionate," the compromise becomes "pragmatism." Chasing each new form is exhausting by design.\n\nDurga\'s method: **name the thing once, clearly, and hold that clarity while the disguises cycle.** The moment of half-transformation — when the old excuse is dying and the new one isn\'t ready — is when truth can pin it.',
        citation: 'Devi Mahatmya, Chapter 3 (the slaying of Mahishasura).'
      },
      {
        id: 'durga-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Born of all the gods, fierce yet loving, steady against every disguise. One idea remains, and it is the widest: where the Goddess actually lives.',
      },
      {
        id: 'durga-nine-nights',
        title: 'Nine Nights of the Mother',
        subtitle: 'A lamp lit beside a sprouting pot of grain',
        takeaway:
          'Twice a year, Hindus honour the Goddess for nine nights — the festival of Navratri. The order of the nights is itself a lesson: protection first, then abundance, then wisdom.',
        storyText: 'Twice a year, at the great turning of the seasons, India gives the Goddess nine nights of celebration — the festival of **Navratri** (the word simply means "nine nights").\n\nA pot of grain is sprouted, a lamp is kept burning, and night by night the Goddess is honoured in three of her forms: fierce **Durga** the protector, **Lakshmi** the giver of wealth, and **Saraswati** the giver of wisdom, three nights each by one beloved arrangement. On the eighth night, families worship young girls as the living Goddess herself — turning the idea that "the Goddess lives in all beings" into a simple household act.\n\nThe festival ends on the tenth day, **Vijayadashami** ("the victory tenth"), when Durga slays the demon and, in the north of India, giant effigies of the demon-king Ravana are burned. All the traditions agree: after nine nights of honouring the sacred feminine, the tenth day belongs to triumph.',
        teachingText: 'Navratri\'s structure is itself the teaching: **protection first (Durga), then abundance (Lakshmi), then wisdom (Saraswati)** — in that order, because abundance without protection is looted and wisdom without abundance starves.\n\nAudit your own life in her sequence. And the kanya puja asks the sharpest question: do you actually treat the ordinary beings around you as places where the Goddess lives?',
        citationLink: 'festival:navratri-2025',
        citation: 'Navratri: living tradition; the three-by-three arrangement and kanya puja: widespread devotional practice.',
        checks: [
          {
            id: 'chk:deity:durga:navratri',
            kind: 'mcq',
            prompt: 'During Navratri the Goddess is honoured in a set order — Durga, then Lakshmi, then Saraswati. What does that order teach?',
            options: [
              {
                text: 'Protection first, then abundance, then wisdom — because abundance without protection is looted, and wisdom without abundance starves',
                correct: true,
              },
              { text: 'That Durga is simply more important than the other goddesses' },
              { text: 'That the order is random and carries no meaning' },
            ],
            why: 'The sequence itself is the teaching: first make things safe, then let them grow, then understand them. It is a pattern you can audit your own life against.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Devi Mahatmya (Markandeya Purana, chapters 81–93)',
        locator: 'Chapter 2 (birth from combined radiance; the gods\' weapons), Chapters 2–3 (Mahishasura battle and slaying), Chapter 5 (Ya Devi litany)',
        translation: 'cross-checked against public translations (devimahatmya.com, wisdomlib.org)',
        url: 'https://devimahatmya.com/book/chapter-3-the-slaying-of-mahisasura/',
      },
      {
        text: 'Navratri tradition',
        locator: 'Nine-nights structure, kanya puja, Vijayadashami — living tradition, labeled as such',
      },
    ],
    reflectionQuestions: [
      'Durga is fierce without hatred. When did you last have to stand firm — and did you manage it without anger?',
      'What problem in your life keeps changing shape whenever you nearly pin it down? What would naming it once, clearly, and holding steady look like?',
      "Durga's order is protection, then abundance, then wisdom. Which of the three is your life short on right now?",
    ]
  },
  {
    id: 'brahma',
    name: 'Brahma',
    sanskritName: 'ब्रह्मा',
    titles: ['Prajapati', 'Svayambhu (Self-Born)', 'Chaturmukha (Four-Faced)', 'Vidhata'],
    category: 'major',
    description: 'The creator the world forgot to worship — and why that is the point',
    mythology: 'Brahma is the maker: born from a lotus that grew out of Vishnu\'s navel as the new cosmos stirred, he shaped the worlds, the sages, and the beings who fill them. His four heads face the four directions and voice the four Vedas. And yet — the question every child eventually asks — for the creator of everything, he has almost no temples. The Puranas tell of pride corrected: a lie told in a contest with Shiva, a curse earned at a great yajna. The deeper answer is structural: creation happens once, but preservation and transformation never stop. The tradition worships the work that is still going on.',
    attributes: ['Creation', 'Knowledge of the Vedas', 'Time in vast cycles', 'The mind\'s generative power'],
    symbols: ['Lotus', 'Four Vedas', 'Kamandalu (water pot)', 'Prayer beads'],
    mantras: [
      {
        id: 'brahma-gayatri-note',
        sanskrit: 'ॐ वेदात्मनाय विद्महे हिरण्यगर्भाय धीमहि। तन्नो ब्रह्मा प्रचोदयात्॥',
        transliteration: 'oṁ vedātmanāya vidmahe hiraṇyagarbhāya dhīmahi, tanno brahmā pracodayāt',
        meaning: 'We know the soul of the Vedas; we meditate on the golden womb; may Brahma inspire us',
        purpose: 'Brahma Gayatri — invoked for learning and creative work',
        benefits: ['Clarity in study', 'Creative beginnings', 'Reverence for knowledge']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A mature, bearded figure with four faces, calm and scholarly rather than martial',
      clothing: 'Red or gold garments of a priest',
      colors: ['Red', 'Gold'],
      objects: ['The four Vedas', 'Kamandalu', 'Akshamala (rosary)', 'Lotus'],
      vehicle: 'Hamsa — the swan said to separate milk from water, discrimination itself',
      posture: 'Seated on a lotus',
      facesAndArms: 'Four faces, four arms'
    },
    teachings: [
      'Beginning is divine work — but nothing runs on its founding energy forever',
      'Knowledge (his consort is Saraswati) must sit beside creation or creation misfires',
      'Even gods answer for pride',
      'Time is vaster than any project: a day of Brahma outlasts civilizations'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'brahma-bhagavata',
        text: 'puranas',
        section: 'Canto 3, Chapters 8–9',
        relevance: 'The lotus from Vishnu\'s navel and Brahma\'s awakening as the cosmos begins'
      }
    ],
    stories: [
      {
        id: 'brahma-lotus',
        title: 'The Lotus from the Navel',
        content: 'Between cosmic ages, Vishnu rests on the serpent Shesha upon the causal waters — everything that will exist, folded and sleeping. As creation stirs, a lotus grows from his navel, rises through the dark, and opens. Seated in it is Brahma, blinking at an empty universe. He climbs down the stem to find its source and cannot reach the bottom; he rises and cannot find its top. So he does the first act of the new creation: he sits where he is and turns inward. In that meditation he perceives Vishnu, receives the knowledge folded into the waters, and begins to make the worlds.',
        moralLesson: 'Even the creator begins by admitting what he does not know and sitting still with the question. Every genuine beginning starts in humility, not certainty.',
        category: 'origin',
        relatedScripture: 'Bhagavata Purana, Canto 3, Chapters 8–9'
      },
      {
        id: 'brahma-pillar',
        title: 'The Pillar Without End',
        content: 'Brahma and Vishnu once argued over which of them was supreme. As they quarreled, an immense pillar of light erupted between them, without visible top or bottom. They agreed to search: Vishnu dove as a boar toward its base, Brahma flew as a swan toward its summit. Vishnu returned and admitted he found no bottom. Brahma, unable to reach the top, met a falling ketaki flower and persuaded it to testify that he had — a small, polished lie. The pillar split open: it was Shiva, the light itself. For the lie, Brahma lost the right to be worshiped; the honest Vishnu was honored. The flower, for its part, was banned from Shiva\'s altars.',
        moralLesson: 'The tradition\'s explanation for its own empty Brahma temples is a warning it aims at every creator: the maker who must also be declared supreme unmakes himself. Honesty about your limits is worth more than your greatest work.',
        category: 'teaching',
        relatedScripture: 'Shiva Purana, Vidyeshvara Samhita (the Lingodbhava story)'
      }
    ],
    worship: {
      bestTimes: ['Kartik Purnima (at Pushkar)'],
      offerings: ['Lotus flowers'],
      rituals: ['Rare — the Pushkar temple in Rajasthan is his one major living shrine'],
      fasting: [],
      pilgrimage: ['Brahma Temple, Pushkar (Rajasthan)'],
      dailyPractices: ['Study itself is his worship — beginning any learning with reverence']
    },
    audioUrl: '/audio/pronunciation/brahma.mp3',
    podcastEpisodes: [],
    significance: 'Brahma completes the Trimurti — creation beside Vishnu\'s preservation and Shiva\'s dissolution — and his near-absence from worship is itself one of the tradition\'s sharpest teachings about pride, and about honoring ongoing work over founding glory',
    modernRelevance: 'Every founder, artist, and parent knows Brahma\'s predicament: the beginning is essential and then the beginning is over. His story asks what a creator is for after the creating — and answers: knowledge, humility, and letting the work be maintained by others',
    familyConnections: [
      { relationTo: 'saraswati', relationship: 'Consort', description: 'Creation keeps knowledge beside it — Brahma is rarely depicted without Saraswati\'s wisdom nearby' },
      { relationTo: 'shiva', relationship: 'Trimurti', description: 'The pillar-of-light story binds their roles: creation humbled before the unmeasurable' }
    ],
    regionalVariations: [],
    images: {
      heroImage: require('../../assets/images/covers/brahma-cover.jpg'),
      iconImage: '/images/deities/brahma-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'brahma-question',
        title: 'The God With No Temples',
        subtitle: 'The question every child asks first',
        storyText: 'Here is a puzzle the tradition planted on purpose: Hinduism worships the preserver in ten thousand temples and the destroyer in ten thousand more — and **the creator of everything has, for practical purposes, one**, at Pushkar in Rajasthan.\n\nAsk why and you will hear the stories: the contest with Shiva where Brahma\'s pride produced a small lie, or the yajna where a curse fell.\n\nBut sit with it longer and a structural answer emerges. **Creation is finished.** Preservation and transformation are happening right now, in your body, your family, your world — and the tradition pours its devotion toward the work that is still going on.',
        teachingText: 'This is not disrespect; Brahma opens the cosmology of nearly every Purana. It is a priority: **honor beginnings, worship continuations.**\n\nAny parent who has launched a child, any founder who has handed off a company, knows the Brahma position — essential, then over. The tradition\'s quiet counsel to everyone in it: what you started must matter less to you than what it became.',
        citation: 'Shiva Purana, Vidyeshvara Samhita (Lingodbhava); Padma Purana (the Pushkar tradition)'
      },
      {
        id: 'brahma-lotus-section',
        title: 'Born on a Lotus, Looking for the Bottom',
        subtitle: 'The first act of the first being',
        storyText: 'The Bhagavata Purana opens creation like this: Vishnu rests on the cosmic waters, and from his navel grows a lotus. In it wakes Brahma — **alone, in the dark, with no memory and no instructions.**\n\nHe climbs down the stem to find where it comes from and finds no bottom. He climbs up and finds no top.\n\nAnd so the first conscious act of the new universe is not making; **it is meditation.** Brahma sits in his lotus and turns inward, and only after perceiving the one he grew from does he begin to create.',
        sectionHeader: 'Creation begins in humility',
        teachingText: 'The tradition could have made its creator omniscient from the first instant. Instead it gave him our situation: waking into a world he did not choose, unable to see his own source, having to begin anyway.\n\nHis answer — **sit, look inward, then work** — is the pattern for every creative act since. You do not need to see the bottom of the stem to make something worthy on top of it.',
        citation: 'Bhagavata Purana, Canto 3, Chapters 8–9'
      },
      {
        id: 'brahma-heads',
        title: 'Four Heads, Four Vedas, One Swan',
        subtitle: 'What the iconography is saying',
        storyText: 'Brahma\'s four heads face the four directions and speak the four Vedas — **knowledge looking every way at once**.\n\nIn his hands: the Vedas, a rosary counting time, a water pot holding the causal waters, a lotus. **No weapons; he is the only major deity who carries none.**\n\nAnd beneath him, his vahana: the **hamsa**, the swan the tradition credits with the ability to drink milk mixed with water and leave the water behind — discrimination, the power to separate what matters from what merely surrounds it.',
        teachingText: 'Read as a diagram, Brahma is a theory of creative work: wide attention, deep sources, patience with time, and no force — **creation cannot be done at swordpoint.**\n\nThe swan completes it: a maker\'s central skill is neither speed nor volume but knowing, in the mixture of everything available, **which part is the milk**.',
        citation: 'Standard Puranic iconography; the hamsa-discrimination motif is proverbial across Sanskrit literature'
      },
      {
        id: 'brahma-time',
        title: 'A Day of Brahma',
        subtitle: 'The largest clock ever imagined',
        storyText: 'The Puranas measure the universe in Brahma\'s time.\n\nOne day of Brahma — one **kalpa** — is a thousand cycles of the four ages: **4.32 billion human years**. At its end the worlds dissolve into night; at dawn they are made again. Brahma lives a hundred such years, and then he too ends, and after a pause, another begins.\n\nThe tradition arrived at time-spans of this scale — with cosmoses born and dissolved in endless series — while most of the world still counted history in a few thousand years.',
        sectionHeader: 'What the big clock is for',
        teachingText: 'This is not trivia; it is therapy. Every anxiety you have is happening inside an afternoon of a single day of a being who has days without number.\n\nThe scale is not meant to make you feel small — atman was never small — but to **right-size the things that claim to be enormous**: this quarter, this failure, this feud. The tradition keeps a clock that makes empires look brief, precisely so its people can hold their crises lightly.',
        citation: 'Kalpa reckoning: Bhagavata Purana, Canto 3, Chapter 11; Vishnu Purana, Book 1'
      }
    ],
    sources: [
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 3, Chapters 8–11 (lotus birth, creation, time reckoning)',
        translation: 'wisdomlib.org (public)',
      },
      {
        text: 'Shiva Purana',
        locator: 'Vidyeshvara Samhita (Lingodbhava — the pillar of light and the ketaki lie)',
        translation: 'J.L. Shastri edition / wisdomlib.org',
      },
      {
        text: 'Padma Purana',
        locator: 'Srishti Khanda (the Pushkar yajna tradition)',
      },
    ],
    reflectionQuestions: [
      'A single day of Brahma outlasts empires. Does this week\'s biggest worry look smaller from that distance?'
    ]
  },
  {
    id: 'parvati',
    name: 'Parvati',
    sanskritName: 'पार्वती',
    titles: ['Uma', 'Gauri', 'Shailaputri (Daughter of the Mountain)', 'Annapurna', 'Aparna'],
    category: 'goddesses',
    description: 'The mountain\'s daughter who out-disciplined the great ascetic — love as tapasya',
    mythology: 'Parvati is Shakti choosing a human-scale story. In a former life she was Sati, who died defending her husband Shiva\'s honor at her father\'s sacrifice. Reborn as the daughter of Himavan, king of mountains, she loved Shiva again from childhood — but Shiva had become the arch-ascetic, sealed in grief and meditation. Beauty did not move him; the love-god who tried was burned to ash. So Parvati matched him: she went into the mountains and practiced austerities so fierce the sages came to learn from her, until Shiva himself came down to test, and then to marry, the one being whose discipline equaled his. Their household — with Ganesha and Kartikeya — is the tradition\'s image of divinity domesticated: the absolute, at home.',
    attributes: ['Devotion as discipline', 'Motherhood', 'Persistence', 'The power (Shakti) within stillness'],
    symbols: ['Mountain', 'Lion', 'Trident (shared with Shiva)', 'The half of Ardhanarishvara'],
    mantras: [
      {
        id: 'parvati-mula',
        sanskrit: 'ॐ पार्वत्यै नमः',
        transliteration: 'oṁ pārvatyai namaḥ',
        meaning: 'Om, salutations to Parvati',
        purpose: 'For steadfast love, family harmony, and strength in commitment',
        benefits: ['Perseverance', 'Harmony at home', 'Devoted focus']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A serene golden-complexioned goddess, often beside Shiva or with her sons',
      clothing: 'Red sari of the auspicious married woman',
      colors: ['Red', 'Gold', 'Green'],
      objects: ['Lotus', 'Mirror', 'Trident when fierce'],
      vehicle: 'Lion',
      posture: 'Seated with Shiva on Kailash, or standing in austerity on one foot',
      facesAndArms: 'One face, two or four arms; as Ardhanarishvara, the left half of Shiva\'s own body'
    },
    teachings: [
      'What beauty cannot win, discipline can',
      'Love is not a feeling but a practice sustained through winters',
      'The householder\'s life is a spiritual arena equal to the ascetic\'s cave',
      'Shakti — power — is the goddess\'s to give: Shiva without Parvati, says the tradition, is shava, a corpse'
    ],
    festivals: [],
    scriptureReferences: [
      {
        id: 'parvati-shiva-purana',
        text: 'puranas',
        section: 'Rudra Samhita, Parvati Khanda',
        relevance: 'Her birth, austerities, the burning of Kama, and the marriage to Shiva'
      }
    ],
    stories: [
      {
        id: 'parvati-tapasya',
        title: 'The Girl Who Out-Fasted the Ascetic',
        content: 'When beauty failed and the love-god lay in ashes for trying, Parvati changed strategy entirely. She left the palace for the mountain and began tapasya: summers inside four fires under the naked sun, winters standing in freezing streams, years eating only leaves — until she gave up even leaves, earning the name Aparna, "she of not even a leaf." The sages who thought they knew austerity came to watch a princess redefine it. At last a young brahmin arrived and tested her, cataloguing Shiva\'s flaws: an ash-smeared, snake-wearing, graveyard-haunting beggar. Parvati rose to leave rather than hear him slandered — and the brahmin caught her hand, revealing himself as Shiva, won.',
        moralLesson: 'She did not wait to be chosen; she became impossible to overlook — not by adornment but by discipline. And the final test was loyalty: she won him the moment she refused to profit from his criticism.',
        category: 'adventure',
        relatedScripture: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa\'s Kumarasambhava, Canto 5'
      },
      {
        id: 'parvati-annapurna',
        title: 'The Day Shiva Begged for Food',
        content: 'Shiva once declared, in the way of ascetics, that the world was maya — illusion — and food merely part of it. Parvati, goddess of the manifest world, decided to demonstrate. She vanished, and with her all nourishment vanished from the three worlds. Crops stood empty; hunger arrived like a season. The great renouncer discovered that transcendence is easier on a full stomach, took up a begging bowl, and walked to Kashi — where Parvati had set up a kitchen and was feeding everyone. Shiva held out his bowl. She filled it, smiling. He has acknowledged the necessity of Annapurna, the food-filled one, ever since.',
        moralLesson: 'A gentle correction to every spirituality that scorns the material: the body is the vehicle of every realization, and whoever feeds beings serves the absolute as surely as whoever meditates on it.',
        category: 'teaching',
        relatedScripture: 'Annapurna tradition of Kashi (Skanda Purana, Kashi Khanda; devotional tradition)'
      }
    ],
    worship: {
      bestTimes: ['Teej', 'Navratri (as forms of Devi)', 'Mondays with Shiva'],
      offerings: ['Red flowers', 'Bangles and sindoor', 'Sweets'],
      rituals: ['Teej fasts kept by women for marital wellbeing', 'Gauri puja'],
      fasting: ['Hartalika Teej'],
      pilgrimage: ['Kailash-Mansarovar', 'Annapurna Temple (Varanasi)', 'Meenakshi Temple (Madurai — as Meenakshi)'],
      dailyPractices: ['Care of the household offered as sadhana']
    },
    audioUrl: '/audio/pronunciation/parvati.mp3',
    podcastEpisodes: [],
    significance: 'Parvati is Shakti — the power without which, the tradition says outright, Shiva is a corpse — choosing marriage, motherhood, and the household as her arena, and thereby consecrating ordinary family life as a full spiritual path',
    modernRelevance: 'The patron of everyone whose spiritual practice looks like packed lunches and sustained commitment rather than mountaintops: Parvati\'s claim is that the household, done with her intensity, is the mountaintop',
    familyConnections: [
      { relationTo: 'shiva', relationship: 'Consort', description: 'Won through austerity; together they are Ardhanarishvara, one body halved' },
      { relationTo: 'ganesha', relationship: 'Mother', description: 'Shaped him from turmeric paste as guardian of her door' },
      { relationTo: 'durga', relationship: 'Fierce form', description: 'Durga and Kali arise from the same Shakti Parvati embodies gently' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: parvati-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/parvati-icon.jpg',
      galleryImages: []
    },
    kicker: "The gentle Mother-Goddess — Shiva's wife and Ganesha's mother — who proves that an ordinary family home can be the highest spiritual path.",
    learnItems: [
      "Parvati is the gentle Mother-Goddess, Shiva's wife and Ganesha's mother",
      'Real love is a discipline, not a mood',
      'God is half male and half female; neither half is complete alone',
      'Feeding people is real spiritual work, not a distraction from it',
      'She made an ordinary family home into a full path to God',
    ],
    handoff:
      "You've now met the great gods — Krishna, Rama, Shiva, Ganesha, Hanuman, Durga, and Parvati. So who are 'the gods,' really? Are they many separate beings, or one reality wearing many faces? That question is waiting for you next, to answer in your own words.",
    sections: [
      {
        id: 'parvati-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          "Parvati is the gentle Mother-Goddess: the wife of Shiva, the mother of Ganesha, and the warm, family-loving face of the same Goddess you just met as fierce Durga.\n\nOver the next few pages you'll meet her, and her quietly revolutionary claim — that an ordinary home, full of cooking and caring and patience, can be the deepest spiritual practice of all.",
      },
      {
        id: 'parvati-who',
        title: 'Who Parvati Is',
        subtitle: 'The gentle half of the Divine Mother',
        takeaway:
          'Parvati is the gentle Mother-Goddess — the wife of Shiva and the mother of Ganesha. She is the same divine power as fierce Durga, in her warm, family-loving form.',
        storyText:
          "You've just met **Durga**, the Goddess with her sword drawn. **Parvati** is that same Divine Mother wearing her gentlest face. She is the wife of the great god **Shiva** and the mother of **Ganesha** — the very family whose mountain home you glimpsed a few gods ago.\n\nHindus call her **Shakti**, a word that means 'power' or 'energy.' The idea is striking: Shiva may be the silent, still source of everything, but Parvati is the living power that actually makes things happen. The tradition puts it bluntly in a pun — without his Shakti, Shiva is just a *shava*, a corpse.\n\nAnd here is what makes Parvati quietly revolutionary. Of all the arenas she could have chosen, she chose marriage, motherhood, and the running of a household. And by choosing them, she declared that ordinary family life is not a lesser path to God. Done with her intensity, it is the highest one.",
        teachingText:
          "That is Parvati's whole claim, and it is a comforting one for most of us. You do not have to leave your job and family and climb a mountain to live a deep spiritual life. The packed lunches, the patience, the love sustained through hard winters — that, she insists, is the mountain.",
        citation: 'Parvati as Shakti and the gentle form of the Goddess: Shiva Purana, Shakta tradition.'
      },
      {
        id: 'parvati-love-as-discipline',
        title: 'Love as a Discipline',
        subtitle: 'What do you do when beauty fails?',
        takeaway:
          "Parvati couldn't win the great hermit Shiva with beauty, so she met him in his own arena: years of fierce self-discipline in the mountains. She won him by proving her love was a discipline, not a passing mood.",
        storyText: 'The story begins with a strategy that fails.\n\nParvati, advised by the gods, first approaches Shiva the conventional way: presence, charm, flowers in season, the love-god Kama enlisted to loose his arrow at the meditating ascetic. **Shiva opens his third eye and burns Kama to ash without rising.**\n\nThe lesson lands on Parvati like a door closing — and she makes the decision that defines her: if the ascetic cannot be moved by beauty, **she will meet him in his own arena**. She walks into the mountains and begins austerities that shame the professionals: fire in summer, ice-water in winter, then not even leaves for food.',
        sectionHeader: 'The proposal that was a test',
        teachingText: 'When Shiva finally comes to her, disguised, he tries one last door: he insults himself, listing every reason a princess should not marry a graveyard ascetic. Parvati turns to leave rather than hear it — loyalty even against apparent self-interest — and the disguise falls.\n\nThe tradition is precise about what won him: not the fasting itself but what the fasting proved — that **her love was a discipline and not a mood**. It is the least sentimental great love story ever told, and the most useful.',
        citation: 'Shiva Purana, Rudra Samhita (Parvati Khanda); Kalidasa, Kumarasambhava, Cantos 3–5',
        checks: [
          {
            id: 'chk:deity:parvati:discipline',
            kind: 'mcq',
            prompt: 'Parvati could not win Shiva, the great hermit, with beauty. How did she finally win him?',
            options: [
              {
                text: 'She met him in his own arena — years of fierce self-discipline in the mountains — proving her love was a discipline, not a passing mood',
                correct: true,
              },
              { text: 'She gave up and married someone else instead' },
              { text: 'She tricked him into it with a magic spell' },
            ],
            why: 'What won him was not the fasting itself but what it proved: that her love was steady practice, not a fleeting feeling. It is the least sentimental great love story ever told.',
          },
        ],
      },
      {
        id: 'parvati-way-1',
        kind: 'waypoint',
        title: '2 of 5 banked',
        learnIndex: 2,
        storyText:
          'She won him by discipline, not display. The next image shows just how complete their union became: a single body, half him and half her.',
      },
      {
        id: 'parvati-half-of-shiva',
        title: 'Half of God\'s Own Body',
        subtitle: 'Ardhanarishvara — the argument in one image',
        takeaway:
          'In one striking image, Shiva and Parvati are a single body split down the middle, half him and half her. It says that stillness and action, male and female, are two halves of one whole, and neither is complete alone.',
        storyText: 'In one of the tradition\'s boldest images, Shiva and Parvati are shown as **a single standing figure split down the middle**: his half ash-white, matted-locked, still; her half golden, silk-clad, ornamented.\n\n**Ardhanarishvara** — the Lord who is half woman. The image is a theological argument: consciousness and energy, stillness and manifestation, the ascetic and the world are not rivals but halves of one body, and neither is complete alone.\n\nThe tradition says it in a proverb sharp enough to sting: **Shiva without Shakti is shava — a corpse.**',
        teachingText: 'Whatever your own polarity — the contemplative half that wants the cave and the engaged half that loves the world — Ardhanarishvara refuses the choice.\n\nThe complete life is not won by amputating either half but by **letting them share a spine**. Every householder who meditates and every meditator who shows up for family dinner is practicing this image.',
        citation: 'Ardhanarishvara iconography: Puranic and Agamic tradition; the Shiva/shava wordplay is proverbial in Shakta texts (cf. Saundarya Lahari 1)',
        checks: [
          {
            id: 'chk:deity:parvati:half',
            kind: 'mcq',
            prompt: 'Shiva and Parvati are sometimes shown as one body split down the middle — half him, half her (Ardhanarishvara). What is that image arguing?',
            options: [
              {
                text: 'That stillness and energy, male and female, the hermit and the world are two halves of one whole — neither is complete alone',
                correct: true,
              },
              { text: 'That Shiva and Parvati are rivals fighting over a single body' },
              { text: 'That women are only half as important as men' },
            ],
            why: 'The proverb is blunt: without his Shakti (Parvati), Shiva is just a corpse. Consciousness needs energy; the cave needs the world. A complete life lets both halves share one spine.',
          },
        ],
      },
      {
        id: 'parvati-annapurna-section',
        title: 'The Goddess of the Full Plate',
        subtitle: 'When the renouncer held out a bowl',
        takeaway:
          'When Shiva dismissed the physical world as a mere illusion, Parvati simply vanished — and all the food in the world vanished with her. She let the great hermit go hungry until he understood: feeding people is real spiritual work.',
        storyText: "The story of Annapurna is Parvati's wit at its sharpest.\n\nIn an ascetic mood, Shiva once dismissed the whole physical world as **maya** — a passing illusion — and food along with it. Parvati did not argue. She simply withdrew from the world. And with the goddess of the physical world gone, all food quietly vanished too.\n\nThe world went hungry. Eventually the great renouncer of illusion had to pick up a begging bowl and walk to the holy city of **Kashi** (today's Varanasi), to a free kitchen his wife had opened there, and hold it out. She filled it, smiling. Her temple still stands in Varanasi to this day, to **Annapurna** — 'she who is full of food.'",
        sectionHeader: 'The holiness of the ordinary',
        teachingText: 'This is the tradition auditing its own excesses. Wherever spirituality drifts toward contempt for the body, the meal, the household — Annapurna is the correction: **try transcending without lunch.**\n\nFeeding people is not the errand you run so that someone else can do the real spiritual work. It is the real spiritual work, done in its most honest form.',
        citation: 'Annapurna of Kashi: Skanda Purana (Kashi Khanda) and living Varanasi tradition',
        checks: [
          {
            id: 'chk:deity:parvati:annapurna',
            kind: 'mcq',
            prompt: 'Shiva declared the physical world (food included) a mere illusion. How did Parvati answer him?',
            options: [
              {
                text: 'She withdrew, and all food vanished with her — letting the great hermit go hungry until he saw that feeding people is real spiritual work',
                correct: true,
              },
              { text: 'She agreed with him and stopped cooking forever' },
              { text: 'She argued with him for years until he gave in' },
            ],
            why: 'It is the tradition correcting its own excess. Wherever spirituality drifts into contempt for the body and the meal, Annapurna is the reply: try transcending without lunch.',
          },
        ],
      },
      {
        id: 'parvati-way-2',
        kind: 'waypoint',
        title: '4 of 5 banked',
        learnIndex: 4,
        storyText:
          'Love as discipline, God as two halves, the holiness of a full plate. One idea remains, and it is the one she is loved for most: the home she built.',
      },
      {
        id: 'parvati-mother',
        title: 'The Mother of New Beginnings',
        subtitle: 'A household on a mountaintop',
        takeaway:
          'Parvati took the ultimate hermit and made him a father, turning a frozen mountaintop into the most beloved family in Hinduism. She is the patron of everyone building a whole family out of unlikely materials.',
        storyText: 'Kailash, as the Puranas paint it, is **the strangest household in literature**: the ascetic father with snakes for ornaments, the mountain-princess mother, one son with an elephant\'s head shaped by her own hands from turmeric paste, another born to command the armies of heaven, a lion, a bull, a mouse, and a peacock in the yard.\n\nIt should not work, and it is the most beloved family in the tradition.\n\n**Parvati is its center of gravity** — the one who turned the great renouncer into a father, absolute stillness into a home.',
        teachingText: 'The tradition could have left divinity solitary and abstract. Instead its most worshiped god is half of a marriage, and the goddess who arranged that is the patron of everyone who has ever **built a family out of unlikely materials**.\n\nAsk her blessing not for a perfect household but for a whole one — held together, like hers, by a love that outlasted every winter it stood in.',
        citationLink: 'deity:ganesha',
        citation: 'The Kailash household: Shiva Purana, Rudra Samhita (Kumara Khanda); Ganesha\'s shaping: same, Kumara Khanda'
      }
    ],
    sources: [
      {
        text: 'Shiva Purana',
        locator: 'Rudra Samhita — Sati Khanda and Parvati Khanda (rebirth, tapasya, marriage); Kumara Khanda (Ganesha, Kartikeya)',
        translation: 'J.L. Shastri edition / wisdomlib.org',
      },
      {
        text: 'Kumarasambhava (Kalidasa)',
        locator: 'Cantos 3–5 (Kama\'s burning; Parvati\'s austerities; the disguised test) — classical literary retelling',
      },
      {
        text: 'Skanda Purana',
        locator: 'Kashi Khanda (the Annapurna tradition of Varanasi)',
      },
    ],
    reflectionQuestions: [
      'Parvati won Shiva through quiet, steady effort. What goal of yours needs steady practice more than attention?',
      "Parvati insists ordinary home life is a real spiritual path. What everyday act of care in your week could you treat as practice rather than chore?",
      'Where in your life are you trying to be all "still hermit" or all "busy doer," when Ardhanarishvara says you need both halves?',
    ]
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    sanskritName: 'लक्ष्मी',
    titles: ['Shri', 'Padma (Lotus)', 'Chanchala (The Restless)', 'Bhagyalakshmi'],
    category: 'goddesses',
    description: 'Wealth as a current, not a pond — the goddess who stays only where she flows',
    mythology: 'When the gods and asuras churned the ocean of milk for the nectar of immortality, treasures rose one by one — and among the last, seated on a blooming lotus, came Shri Lakshmi, radiance itself. Every power in the universe wanted her; she looked past them all and chose Vishnu, the preserver — beauty and abundance electing to stand beside responsibility. She is the goddess of wealth in every sense the word will bear: money, yes, and also harvest, health, children, beauty, and the luster on a well-kept doorstep. Her nickname is the tradition\'s economics lesson: Chanchala, the restless one. Lakshmi does not stay where she is hoarded. She stays where she moves.',
    attributes: ['Abundance', 'Auspiciousness', 'Generosity', 'Beauty in order', 'Restlessness where hoarded'],
    symbols: ['Lotus', 'Gold coins flowing from her palm', 'Elephants pouring water', 'Owl'],
    mantras: [
      {
        id: 'lakshmi-mula',
        sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
        transliteration: 'oṁ śrīṁ mahālakṣmyai namaḥ',
        meaning: 'Om, with the seed-syllable of abundance, salutations to great Lakshmi',
        purpose: 'For prosperity that circulates — invoked at Diwali and on Fridays',
        benefits: ['Material wellbeing', 'Generosity of spirit', 'Gratitude for what flows']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A golden goddess of serene beauty seated or standing on a red lotus',
      clothing: 'Red and gold sari — the colors of auspicious abundance',
      colors: ['Gold', 'Red', 'Pink'],
      objects: ['Lotuses in two hands', 'Gold coins streaming from one palm', 'A blessing gesture in the last'],
      vehicle: 'Owl (Uluka) — seeing in darkness, a warning about wealth\'s blindness',
      posture: 'On a lotus above the waters, flanked by elephants pouring water over her',
      facesAndArms: 'One face, four arms'
    },
    teachings: [
      'Wealth is a current: dam it and it stagnates, circulate it and it multiplies',
      'Abundance chooses responsibility — Lakshmi picked Vishnu the sustainer',
      'Prosperity enters clean, lit, welcoming spaces: order is an offering',
      'The owl\'s warning: riches without vision is night'
    ],
    festivals: ['diwali-2025'],
    scriptureReferences: [
      {
        id: 'lakshmi-vishnu-purana',
        text: 'puranas',
        section: 'Book 1, Chapter 9',
        relevance: 'Her emergence from the churning ocean and choice of Vishnu'
      }
    ],
    stories: [
      {
        id: 'lakshmi-churning',
        title: 'Risen from the Churned Ocean',
        content: 'The churning of the milk ocean had already yielded wonders and horrors — the moon, the wish-giving cow, the world-poison that Shiva swallowed. Then the waters parted and Shri rose: seated on an open lotus, radiant enough that the churning stopped. The sages hymned her; celestial elephants poured sacred water over her; every god and asura straightened his posture. She held a garland, the choosing kind, and walked past power after power — past strength, past wealth, past cleverness — and placed it on Vishnu, the one whose work is to sustain. Abundance, given a free choice, chose the maintainer.',
        moralLesson: 'Prosperity is not won by the strongest grip; it settles on whoever can be trusted to sustain things. Become the kind of steward Lakshmi garlands.',
        category: 'origin',
        relatedScripture: 'Vishnu Purana, Book 1, Chapter 9; Bhagavata Purana, Canto 8'
      },
      {
        id: 'lakshmi-restless',
        title: 'Why She Is Called the Restless One',
        content: 'A proverb-story told across India: a miser once prayed so hard that Lakshmi consented to live in his house. He sealed his doors so she could never leave, stopped giving, stopped spending, stopped even lighting the lamps lest the oil run down. The house grew dark and airless — and one morning the miser found it empty of everything: comfort, guests, laughter, and finally the goddess herself, gone through the crack no lock can close. Lakshmi is Chanchala, the restless. She is not offended by wealth — she IS wealth. She is offended by stagnation.',
        moralLesson: 'The tradition\'s whole economics in one image: abundance is a flow that dies in a sealed vessel. Generosity is not the opposite of prosperity but its maintenance.',
        category: 'teaching',
        relatedScripture: 'Pan-Indian proverb tradition; the Chanchala epithet appears throughout Sanskrit devotional literature'
      }
    ],
    worship: {
      bestTimes: ['Diwali night (Lakshmi Puja)', 'Fridays', 'Sharad Purnima'],
      offerings: ['Lotus', 'Rice and coins', 'Sweets', 'Lit lamps in rows'],
      rituals: ['Diwali Lakshmi Puja with the house cleaned and lit', 'Kolam/rangoli at the threshold to welcome her'],
      fasting: ['Vaibhav Lakshmi vrat (Fridays)'],
      pilgrimage: ['Padmavati Temple (Tiruchanur)', 'Mahalakshmi (Kolhapur)', 'Ashtalakshmi (Chennai)'],
      dailyPractices: ['Keeping the threshold clean and lit', 'Giving before accumulating']
    },
    audioUrl: '/audio/pronunciation/lakshmi.mp3',
    podcastEpisodes: [],
    significance: 'Lakshmi sanctifies prosperity — the tradition refuses to make wealth shameful — while binding it to motion, stewardship, and light: she is why Diwali\'s lamps are lit and why the miser\'s dark house empties',
    modernRelevance: 'In an economy of hoarded fortunes and anxious scarcity, Lakshmi\'s theology reads like radical advice: wealth is a current to be kept moving, order and generosity are how you invite it, and an owl rides with it to warn you what riches without vision become',
    familyConnections: [
      { relationTo: 'krishna', relationship: 'Consort across avatars', description: 'Where Vishnu descends, she follows — as Sita beside Rama, as Rukmini beside Krishna' },
      { relationTo: 'saraswati', relationship: 'Counterpart', description: 'Wealth and wisdom, the tradition jokes, rarely share a house — a proverb about balancing both' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: lakshmi-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/lakshmi-icon.jpg',
      galleryImages: []
    },
    kicker: 'The lotus-throned goddess of abundance — who slips away the moment wealth is hoarded, and stays only where it keeps flowing.',
    learnItems: [
      'Abundance settles on the steward, not the one who grabs hardest',
      'Lakshmi is Chanchala, the restless — wealth lives in flow and dies in storage',
      'Prosperity favors clean, lit, welcoming spaces — order is the invitation',
      'Riches without wisdom is an owl at noon',
    ],
    handoff:
      'Lakshmi is wealth that flows. Her counterpart is the other thing every life needs, and the two rarely share a house: Saraswati, the goddess of knowledge.',
    sections: [
      {
        id: 'lakshmi-intro',
        kind: 'intro',
        title: "What's ahead",
        storyText:
          'Lakshmi is the goddess of wealth and good fortune, the one whose lamps fill every window at Diwali. But the tradition means something sharper by "wealth" than you might expect, and it comes with a warning riding an owl.\n\nOver the next few pages: what abundance actually chooses, why hoarding it backfires, how you invite it in, and the catch hidden at her feet.',
      },
      {
        id: 'lakshmi-choice',
        title: 'What Abundance Chooses',
        subtitle: 'A garland walked past every power',
        takeaway:
          "Abundance doesn't settle on whoever grabs hardest; it stays with whoever can be trusted to sustain things.",
        storyText: 'When Lakshmi rose from the churned ocean, the entire assembly of gods and demons stood as suitors.\n\nThe story slows down here on purpose: she carries a garland — the ancient gesture by which a woman chose — and reviews the candidates. Strength is there, and cunning, and raw force fresh from the churning.\n\nShe passes them all and garlands **Vishnu**: the god whose entire job description is **maintenance**. Not the most dazzling. The most reliable.',
        sectionHeader: 'The steward\'s secret',
        teachingText: 'The tradition is telling you how prosperity actually works. **Abundance does not stay with whoever grabs hardest; it settles where things are sustained** — the tended shop, the maintained friendship, the balanced ledger, the kept promise.\n\nIf you want Lakshmi\'s garland, the story says, do not perform brilliance. Demonstrate stewardship.',
        citation: 'Vishnu Purana 1.9; Bhagavata Purana, Canto 8 (samudra manthan)',
        checks: [
          {
            id: 'chk:deity:lakshmi:choice',
            kind: 'mcq',
            practice: true,
            prompt: 'Risen from the ocean, Lakshmi could have garlanded strength or cunning. Who did abundance choose, and why?',
            options: [
              { text: 'Vishnu the sustainer, because abundance settles on whoever can be trusted to maintain things', correct: true },
              { text: 'The strongest god, since wealth follows power' },
              { text: 'No one, she stayed independent' },
            ],
            why: 'She walked past strength and cunning and chose the maintainer. Prosperity settles where things are sustained, not where they are grabbed.',
          },
        ],
      },
      {
        id: 'lakshmi-flow',
        title: 'The Restless One',
        subtitle: 'Why hoarded wealth goes stale',
        takeaway:
          'Lakshmi is Chanchala, the restless: wealth lives in circulation and dies in storage.',
        storyText: 'Of all her thousand names, the tradition\'s most honest is **Chanchala** — the restless, the one who does not stay put.\n\nFolk tale after folk tale repeats the pattern: the miser who seals the goddess into his house and wakes to find everything gone; the generous household whose lamps somehow never run out of oil.\n\nHer iconography says it without words: coins stream from her open palm continuously. **Not a vault. A fountain.**',
        teachingText: 'This is a complete theory of wealth in one epithet. Money, energy, knowledge, love — everything Lakshmi governs behaves the same way: **it lives in circulation and dies in storage.**\n\nThe practical instruction hiding in the theology: build channels, not dams. Give from the flow and the flow continues; pinch it shut and you are the miser in the dark house, holding a full vault and nothing else.',
        citation: 'Chanchala epithet: pan-Indian devotional and proverb tradition; flowing-coin iconography is standard Lakshmi imagery',
        checks: [
          {
            id: 'chk:deity:lakshmi:restless',
            kind: 'mcq',
            practice: true,
            prompt: 'Why is Lakshmi nicknamed Chanchala, “the restless one”?',
            options: [
              { text: 'The wealth she governs lives in flow and goes stale when hoarded, so she leaves a sealed house', correct: true },
              { text: 'She is easily angered and hard to please' },
              { text: 'She never appears in the same form twice' },
            ],
            why: 'Chanchala means restless. Lakshmi does not stay where she is hoarded, because abundance is a current, not a pond.',
          },
        ],
      },
      {
        id: 'lakshmi-way-1',
        kind: 'waypoint',
        title: '2 of 4 banked',
        learnIndex: 2,
        storyText:
          'You have met her and seen what she chooses, and why hoarding her backfires. Two more to go: how you actually invite her in, and the warning hidden at her feet.',
      },
      {
        id: 'lakshmi-diwali',
        title: 'Why the Lamps Are for Her',
        subtitle: 'The theology of a clean, lit house',
        takeaway:
          'Prosperity favors prepared, clean, welcoming spaces: order is how you invite it.',
        storyText: 'On Diwali night, hundreds of millions of households do the same three things: **clean the house to its corners, draw a welcome at the threshold, and set lamps in every window.**\n\nThe stated reason is one of the tradition\'s loveliest images — Lakshmi walks the earth that night, and she enters homes that are clean, bright, and open.\n\nLedgers are opened fresh; doorways are decorated; the dark and cluttered corner is, for one night at least, abolished.',
        sectionHeader: 'Order as invitation',
        teachingText: 'Strip the metaphor and it still runs: prosperity in every form favors **prepared, ordered, welcoming systems**. The cleaned house is the audited ledger, the maintained tool, the answered email, the tidy codebase.\n\nLakshmi Puja is the annual rehearsal of a daily truth — abundance is not summoned by wanting; it is welcomed by readiness. **Light the corner you have been avoiding.**',
        citationLink: 'festival:diwali-2025',
        citation: 'Diwali Lakshmi Puja: pan-Indian living tradition; see also Sri Sukta (Rig Veda khila) — the ancient hymn recited at her worship'
      },
      {
        id: 'lakshmi-way-2',
        kind: 'waypoint',
        title: '3 of 4 banked',
        learnIndex: 3,
        storyText:
          'One piece left, and it is the warning the tradition hid at her feet.',
      },
      {
        id: 'lakshmi-owl',
        title: 'The Owl at Her Feet',
        subtitle: 'The warning built into the blessing',
        takeaway:
          'Wealth amplifies but does not educate: riches without wisdom is an owl at noon.',
        storyText: 'It is easy to miss, at the foot of all that gold: Lakshmi\'s vahana is **an owl**.\n\nThe tradition chose it deliberately and lets the double meaning stand. The owl sees in the dark — wealth rightly held illuminates places nothing else reaches. And the owl is blind in daylight — **the being who cannot see precisely when everything is bright.**\n\nSanskrit proverb sharpened the point long ago: riches without wisdom is an owl at noon.',
        teachingText: 'Every gift in this tradition ships with its own warning label, and the owl is Lakshmi\'s. **Wealth amplifies; it does not educate.** It will light the dark or blind you at noon depending entirely on what you bring to it.\n\nWhich is why the goddess of fortune is traditionally worshiped alongside Ganesha, remover of obstacles and lord of wisdom — the tradition refusing to hand you the gold without the sight.',
        citation: 'Uluka vahana: standard Lakshmi iconography, especially in Bengal; the paired Lakshmi–Ganesha Diwali worship is living tradition',
        checks: [
          {
            id: 'chk:deity:lakshmi:owl',
            kind: 'mcq',
            practice: true,
            prompt: 'Why does an owl, blind in daylight, ride with the goddess of wealth?',
            options: [
              { text: 'A warning: wealth amplifies but does not educate, and riches without wisdom blinds you', correct: true },
              { text: 'The owl guards her treasure at night' },
              { text: 'It simply looked regal beside her' },
            ],
            why: 'The owl is the warning built into the blessing. Riches without wisdom is an owl at noon, which is why Lakshmi is worshipped beside Ganesha.',
          },
        ],
      }
    ],
    sources: [
      {
        text: 'Vishnu Purana',
        locator: 'Book 1, Chapter 9 (emergence from the ocean, choice of Vishnu)',
        translation: 'H.H. Wilson (public domain) / wisdomlib.org',
      },
      {
        text: 'Bhagavata Purana',
        locator: 'Canto 8 (samudra manthan)',
        translation: 'wisdomlib.org (public)',
      },
      {
        text: 'Sri Sukta',
        locator: 'Rig Veda khila (appendix hymn) — the classical Lakshmi hymn',
        translation: 'traditional; public-domain renderings',
      },
    ],
    reflectionQuestions: [
      'Lakshmi stays where things keep flowing. What do you have plenty of — time, money, knowledge — that you could share more freely?'
    ]
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    sanskritName: 'सरस्वती',
    titles: ['Sharada', 'Vagdevi (Goddess of Speech)', 'Veenapani', 'Hamsavahini'],
    category: 'goddesses',
    description: 'The river that became the goddess of everything that flows: speech, music, learning',
    mythology: 'Saraswati is the oldest of the great goddesses still worshiped — she enters the Rig Veda as a mighty river, praised as "best of mothers, best of rivers, best of goddesses," and as the waters themselves went underground in legend, she flowed instead into everything else that moves like water: speech, thought, music, learning. She is the tradition\'s statement that knowledge is sacred in itself. Dressed in white with no gold at all, seated on a white lotus with a veena in her hands, a book and a rosary beside her, a swan at her feet — she is the one great deity who owns almost nothing, and the one whom students, musicians, and writers cannot do without.',
    attributes: ['Knowledge', 'Speech and eloquence', 'Music', 'Purity of focus', 'The wealth that grows when given'],
    symbols: ['Veena', 'Book', 'White lotus', 'Swan', 'Flowing water'],
    mantras: [
      {
        id: 'saraswati-vandana',
        sanskrit: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता',
        transliteration: 'yā kundendu-tuṣāra-hāra-dhavalā yā śubhra-vastrāvṛtā',
        meaning: 'She who is white as jasmine, the moon, and snow, robed in white… (opening of the Saraswati Vandana)',
        purpose: 'Recited before study, music practice, and examinations',
        benefits: ['Clarity of mind', 'Eloquence', 'Steadiness in learning']
      }
    ],
    prayers: [],
    iconography: {
      appearance: 'A luminous goddess in plain white, serene and absorbed, without ornament',
      clothing: 'White sari — the absence of distraction',
      colors: ['White'],
      objects: ['Veena (played with two hands)', 'Book (the Vedas)', 'Crystal rosary'],
      vehicle: 'Hamsa — the swan of discrimination; sometimes the peacock, warned against vanity',
      posture: 'Seated on a white lotus by flowing water',
      facesAndArms: 'One face, four arms'
    },
    teachings: [
      'Knowledge is the one wealth that grows when you give it away',
      'Plain white amid the golden gods: learning needs no ornament',
      'Speech is a river — it nourishes or floods depending on its banks',
      'Music and mathematics sit in the same lap'
    ],
    festivals: ['basant-panchami-2025'],
    scriptureReferences: [
      {
        id: 'saraswati-rigveda',
        text: 'vedas',
        section: '6.61; 2.41.16',
        relevance: 'The river hymns — "best of mothers, best of rivers, best of goddesses" — the goddess\'s oldest layer'
      }
    ],
    stories: [
      {
        id: 'saraswati-river',
        title: 'The River That Went Underground',
        content: 'In the Rig Veda, Saraswati is no metaphor: she is a vast river of the northwest, "surpassing in majesty and might all other waters," on whose banks the hymns themselves were composed. Tradition holds that as ages passed the river dwindled and vanished into the desert — and the tradition\'s response is the whole story: the goddess did not die with her waters. She went underground like her river and surfaced as every other kind of flow — the stream of speech, the current of thought, the river of music running through a raga. At Prayag, where two visible rivers meet, the tradition insists a third joins them invisibly: Saraswati, still flowing where only the mind can see.',
        moralLesson: 'What is truly essential does not perish when its first form does — it changes channel. The river became learning itself, and her worshipers dip into it daily.',
        category: 'origin',
        relatedScripture: 'Rig Veda 6.61, 7.95; the Triveni Sangam tradition of Prayag'
      },
      {
        id: 'saraswati-basant',
        title: 'The Day the Books Rest',
        content: 'On Vasant Panchami, the fifth day of spring, Saraswati\'s worshipers do something almost paradoxical: students place their books, pens, and instruments at her altar — and do not study. The tools rest at the goddess\'s feet for the day. Small children are brought to write their first letters that morning, a grain of rice or a slate under a guiding hand, the alphabet begun as a sacrament. Mustard fields bloom yellow, her devotees wear yellow, and for one day the whole apparatus of learning is treated not as a grind but as a grace.',
        moralLesson: 'The tradition knows that tools become burdens unless regularly re-consecrated. Rest the instruments, honor the source, and begin again as if writing your first letter.',
        category: 'teaching',
        relatedScripture: 'Vasant Panchami / Vidyarambham living tradition across India'
      }
    ],
    worship: {
      bestTimes: ['Vasant Panchami', 'Before examinations and performances', 'Navratri\'s final days (South India: Saraswati Puja)'],
      offerings: ['White flowers', 'Yellow sweets on Vasant Panchami', 'The tools of one\'s learning, laid at the altar'],
      rituals: ['Vidyarambham — a child\'s first letters written at her altar', 'Books and instruments rested and honored'],
      fasting: [],
      pilgrimage: ['Basar Saraswati Temple (Telangana)', 'Sharada Peeth (tradition)', 'Koothanur (Tamil Nadu)'],
      dailyPractices: ['Saraswati Vandana before study or practice', 'Treating books and instruments with physical respect']
    },
    audioUrl: '/audio/pronunciation/saraswati.mp3',
    podcastEpisodes: [],
    significance: 'Saraswati consecrates knowledge as an end in itself — the tradition\'s oldest goddess presiding over its most renewable wealth, the only treasure that multiplies by being given away',
    modernRelevance: 'Patron of every student, musician, coder, and writer: her plain white amid the golden pantheon is a standing argument that in an economy of noise and ornament, undivided attention is the rarest luxury',
    familyConnections: [
      { relationTo: 'brahma', relationship: 'Consort', description: 'Creation keeps knowledge beside it; what Brahma makes, Saraswati makes intelligible' },
      { relationTo: 'lakshmi', relationship: 'Counterpart', description: 'Wisdom and wealth — the tradition\'s proverb jokes that they rarely share a roof, a warning to court both' }
    ],
    regionalVariations: [],
    images: {
      // TODO cover shopping list: saraswati-cover.png
      heroImage: require('../../assets/images/covers/generic-cover.jpg'),
      iconImage: '/images/deities/saraswati-icon.jpg',
      galleryImages: []
    },
    sections: [
      {
        id: 'saraswati-oldest',
        title: 'The Oldest Goddess Still Worshiped',
        subtitle: 'From riverbank to raga',
        storyText: 'Before she held a veena, Saraswati held a watershed.\n\nIn the **Rig Veda** — humanity\'s oldest religious text in continuous use — she is a physical river, hymned with awe: best of mothers, best of rivers, best of goddesses. The sages composed on her banks; her water was the first thing the tradition called sacred.\n\nThen, over centuries, the river of legend dwindled into the desert — and the goddess performed **the most graceful pivot in religious history**. She went underground and resurfaced as every flow that remained: speech, memory, mathematics, music. The river became the current of thought itself.',
        teachingText: 'There is a teaching in the transformation beyond the history: **what is essential survives the loss of its original container.**\n\nWhen a chapter of your life dries up — a career, a role, a place — the Saraswati move is not to mourn the riverbed but to ask **where the water went**. It is usually still flowing, one channel over.',
        citation: 'Rig Veda 6.61 and 2.41.16, tr. Griffith (public domain); the vanished-river and Triveni traditions'
      },
      {
        id: 'saraswati-white',
        title: 'Why She Wears No Gold',
        subtitle: 'The iconography of attention',
        storyText: 'Stand her beside the other great goddesses and the contrast is the message. Lakshmi streams gold; Durga bristles with borrowed weapons; **Saraswati wears plain white** and owns, by divine standards, almost nothing. Every element is about undivided attention:',
        bullets: [
          '**White** — the color before distraction.',
          '**The veena** — mastery that takes ten thousand quiet hours.',
          '**The book** — the patient accumulation of understanding.',
          '**The rosary** — repetition.',
          '**The swan** — discrimination; the fabled ability to drink the milk and leave the water.'
        ],
        sectionHeader: 'The luxury of focus',
        teachingText: 'The tradition dressed its knowledge-goddess in the absence of ornament on purpose: **learning does not need decoration, and mostly cannot survive it.** In an age engineered to shatter attention, Saraswati\'s plain white is almost political.\n\nThe instruction hiding in the image: to learn anything real, **subtract**. One instrument, one book, one repetition at a time, and the swan\'s ruthless question of everything you consume — milk, or water?',
        citation: 'Standard Saraswati iconography; Saraswati Vandana (traditional invocation) for the whiteness imagery'
      },
      {
        id: 'saraswati-speech',
        title: 'The Goddess in Your Mouth',
        subtitle: 'Speech as a river with banks',
        storyText: 'Her deepest identification is with **vak** — speech, the power of the word.\n\nThe Vedic tradition regarded speech not as labels pasted on things but as **a creative force**: the hymns were heard, not composed, and to speak truly was to participate in the world\'s making.\n\nSaraswati is that power personified, which is why she is **Vagdevi**, goddess of the word, and why a traditional blessing says she should dwell on a person\'s tongue. When someone speaks with unusual grace or truth, the old idiom is literal: Saraswati sits in their mouth.',
        teachingText: 'A river nourishes when it has banks and floods when it does not — and speech is exactly such a river.\n\nThe daily practice her tradition suggests is **an audit of the word**: is what I am about to say true? Is it useful? Does it flow toward or away from understanding? To honor Saraswati is not to speak beautifully; it is to treat the power of the word as sacred enough to bank.',
        citation: 'Vak in the Vedic tradition: Rig Veda 10.125 (the Vak Sukta); Vagdevi epithet, traditional'
      },
      {
        id: 'saraswati-giving',
        title: 'The Wealth That Grows When Given',
        subtitle: 'Vasant Panchami and the first letters',
        storyText: 'On Vasant Panchami, when the mustard fields turn the color of her festival, small children across India are carried to her altar to **write their first letters** — a finger guided through the alphabet in a plate of rice.\n\nThe tradition calls it **Vidyarambham**, the beginning of knowledge, and treats it with the gravity of a sacrament, because it is one.\n\nThe child is being inducted into the one form of wealth with a miraculous property: **split any other treasure and each share shrinks. Split knowledge — teach it — and both shares grow.**',
        sectionHeader: 'The teacher\'s economy',
        teachingText: 'A Sanskrit proverb states her economics plainly: knowledge is the wealth that **thieves cannot steal, kings cannot tax, and giving cannot diminish** — it grows by being spent.\n\nThis is why the guru sits so high in this tradition, and why the truest Saraswati worship is not the flowers but the explaining: every time you teach what you know, you are performing her puja in its original form.',
        citationLink: 'festival:basant-panchami-2025',
        citation: 'Vidyarambham / Vasant Panchami: living tradition; the knowledge-wealth proverb: Subhashita tradition (traditional Sanskrit verse)'
      }
    ],
    sources: [
      {
        text: 'Rig Veda',
        locator: '6.61 and 2.41.16 (the river hymns); 10.125 (Vak Sukta, the speech hymn)',
        translation: 'Ralph T.H. Griffith (public domain)',
      },
      {
        text: 'Saraswati Vandana',
        locator: 'Traditional invocation ("yā kundendu…") recited before study',
        translation: 'traditional text',
      },
      {
        text: 'Living tradition',
        locator: 'Vasant Panchami / Vidyarambham first-letters ceremony; Triveni Sangam (Prayag) tradition of the invisible river',
      },
    ],
    reflectionQuestions: [
      'Saraswati\'s knowledge grows by being given away. What do you know well that you\'ve never taught anyone?'
    ]
  }
];

// Utility functions

// Every deity, for browse surfaces. This used to be `getMajorDeities()`, which
// filtered to `category === 'major'` and so silently hid Parvati, Lakshmi and
// Saraswati (all `goddesses`) from the Learn tab. They were reachable only via
// the guided journey — so trimming the journey would have orphaned them with no
// entry point anywhere in the app. Browse shows everything; the journey curates.
export const getAllDeities = (): Deity[] => deitiesData;

export const getDeityById = (id: string): Deity | undefined => {
  return deitiesData.find(deity => deity.id === id);
};

export const getDeitiesByCategory = (category: string): Deity[] => {
  return deitiesData.filter(deity => deity.category === category);
};

export default deitiesData;