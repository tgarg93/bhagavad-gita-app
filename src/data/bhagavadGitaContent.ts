// Bhagavad Gita reading content — curated retelling with key verses.
// Every verse carries its chapter.verse reference and the complete shloka
// (both lines), cross-checked against standard editions (Gita Press, IIT-K
// Gita Supersite, vedabase.io, holy-bhagavad-gita.org). Translations are
// neutral, accessible renderings — not tied to any one commentarial school.

export interface GitaVerse {
  reference: string; // e.g. '2.47' or '2.62-63'
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export type GitaBlock =
  | { type: 'header'; text: string }
  | { type: 'verse'; verse: GitaVerse }
  | { type: 'prose'; text: string } // narrative story voice
  | { type: 'teaching'; text: string }; // takeaway voice

export interface GitaChapterContent {
  number: number;
  subtitle: string;
  blocks: GitaBlock[];
  // Personal reflection prompts shown at the end of the chapter — not a quiz;
  // they connect the teaching to the reader's own life. See gitaReflections below.
  reflectionQuestions?: string[];
}

// Per-verse "so what" — a short, accessible interpretation for key verses,
// drawn from the narrative/teaching voice. Keyed by "chapter.verse". Only the
// curated key verses have an entry; other verses show translation only.
// (Seeded with Chapter 1; the rest are authored in the full build.)
export const gitaVerseInsights: { [ref: string]: string } = {
  '1.1': "The Gita's very first word names the battlefield 'the field of dharma.' Before a single arrow flies, the text tells you what's really at stake: not just a war, but what right and wrong will mean for an age. Every real crisis you face is, in its way, a field of dharma.",
  '1.28': "Notice that Arjuna's body breaks down before his mind can reason — limbs failing, mouth dry. The Gita treats this honestly: the collision between duty and love is where wisdom begins, not a weakness to be ashamed of.",
};

// Three reflection questions per chapter (54 total). Non-judgmental, no right
// answers — each ties the chapter's core teaching to the reader's own experience.
export const gitaReflections: { [chapter: number]: string[] } = {
  1: [
    "Arjuna's crisis was a collision between his duty and his love. Where in your own life do you feel torn between what you should do and what your heart wants?",
    'Arjuna froze — he simply could not act. Think of a recent moment when you felt paralyzed by a hard choice. What made it so hard to move?',
    'The Gita honors Arjuna\'s breakdown instead of shaming it. When you\'re overwhelmed, are you gentle with yourself, or do you judge the feeling? What would change if you treated it as the beginning of understanding?',
  ],
  2: [
    "Krishna says you are not your body but an unchanging self within it. When you strip away your roles, job, and appearance, who do you sense you are underneath?",
    'The famous teaching is to act fully but release your grip on results. Where in your life are you holding an outcome so tightly that the work itself has stopped bringing you joy?',
    'The anger chain begins with just dwelling on something. Can you recall a time a small resentment grew into something bigger? Where could you have caught it early?',
  ],
  3: [
    "Krishna says your own path, imperfectly walked, beats copying someone else's. Whose life are you tempted to imitate, and what might your own authentic path look like instead?",
    'He describes life as a cycle of giving — work done as an offering nourishes everyone. What is one thing you do purely to take, that you could begin doing as a gift?',
    'Krishna names craving as the hidden enemy that pushes good people into wrong action. What is one desire that, when it grips you, tends to pull you off course?',
  ],
  4: [
    'Krishna says the wise "see inaction in action" — busy on the outside, still within. When have you felt calm and centered even in the middle of intense activity? What made that possible?',
    'Real knowledge, he says, is learned with humility, honest questions, and service. Who has been a true teacher in your life, and what did your openness to them make possible?',
    'Doubt, Krishna warns, is the real destroyer. What is one doubt about yourself or your path that you keep circling — and what would it take to cut through it?',
  ],
  5: [
    'The lotus leaf lives in the water but never gets wet. Where do you want to be fully engaged in life yet less stained by its ups and downs?',
    'Krishna says true renunciation is dropping the ego, not the work. In what part of your life does your sense of "I did this" get in the way of doing it well?',
    'Peace comes, he says, from working as an offering rather than performing for the world. Whose approval are you working for right now — and how would it feel to work for something larger instead?',
  ],
  6: [
    'Krishna says the mind can be your best friend or your worst enemy. Which has yours been lately, and what is one small way you could befriend it?',
    'He validates that the mind is restless and hard to tame — but says practice and letting go slowly work. What is one daily practice you could commit to, however small?',
    '"No sincere effort is ever lost." Think of a time you tried at something and seemingly failed. Looking back, what did that effort quietly leave you with?',
  ],
  7: [
    'Krishna says he is the taste in water, the light in the sun, the ability in you. When did you last pause and sense something sacred in an ordinary moment?',
    'He welcomes four kinds of seekers — the hurting, the curious, the wanting, and the wise. Which one are you right now, and is that okay with you?',
    'What is one talent or ability you have that you tend to take full credit for? How might it feel to see it as something moving through you rather than just from you?',
  ],
  8: [
    'Krishna teaches that we become whatever we constantly dwell on. What does your mind rehearse most often — and is that the direction you actually want to grow in?',
    '"Remember me, and act" — spiritual life woven into ordinary work, not separate from it. What is one anchor-thought you could return to during a normal busy day?',
    'If your whole life is quietly shaping your final state of mind, what small shift in what you feed your attention would you want to start today?',
  ],
  9: [
    'Krishna promises to "carry what they lack and preserve what they have" for those who trust him. Where in your life are you trying to carry everything alone?',
    'A leaf or flower offered with love outweighs a fortune offered for show. What is a small, sincere act you could offer someone — where the love matters more than the size?',
    'He says even a person of bad past conduct who turns wholeheartedly is counted as good. Is there a part of your past you struggle to forgive in yourself? What would wholehearted turning look like now?',
  ],
  10: [
    'Krishna says every excellence you admire is a spark of one splendor. What is something beautiful or impressive you saw recently — and what happens if you trace that wonder back to its source?',
    'He locates the divine "in the heart of all beings," including everyone you meet. Who is someone hard for you to respect right now, and how might this shift how you see them?',
    'Where do you most easily feel awe — nature, music, people, ideas? How could you make more room for that in your everyday life?',
  ],
  11: [
    'Arjuna wanted to *see*, not just hear — and what he saw both awed and terrified him. When has a glimpse of something vast (nature, mortality, the scale of time) shifted your sense of your own problems?',
    '"I am Time." Sitting with the fact that everything passes — how does that change what you think is worth worrying about today?',
    'After the overwhelming vision, Arjuna asked for the familiar, loving face again. Where do you need the sacred to feel personal and close rather than infinite and distant?',
  ],
  12: [
    "Krishna's list of a beloved devotee is all about how you treat others — friendliness, compassion, patience, no ill will. Which of these comes naturally to you, and which needs work?",
    'He gives a ladder: if constant devotion is too much, just practice; if that\'s too much, work for something larger; if even that\'s hard, just let go of results. Where are you honestly on that ladder right now?',
    'The person "from whom the world feels no fear, and who fears no one" — what would it take for the people around you to feel completely safe with you?',
  ],
  13: [
    'Krishna distinguishes the field (everything you can observe — body, thoughts, moods) from the knower who watches it. Try it now: can you notice a feeling as something you *have* rather than something you *are*?',
    'Suffering, he suggests, comes from confusing the watcher with what it watches. What is one thing you\'ve been over-identifying with — a role, an emotion, a story about yourself?',
    'He says the same self dwells in all beings. When you look at someone very different from you, can you sense the same awareness looking back? What shifts when you try?',
  ],
  14: [
    'The three gunas — clarity, restlessness, and inertia — color every mood. Which one has been driving your days lately? What tends to tip you into it?',
    'Krishna says you can\'t fight a guna head-on, but you can feed a different one — change the food, company, and inputs. What is one input in your life that pulls you down, and what could replace it?',
    'The free person watches even their moods like passing weather. Can you recall a strong emotion recently and see it, in hindsight, as weather that moved through? How might that help next time?',
  ],
  15: [
    'Krishna pictures worldly life as an upside-down tree to be cut with non-attachment. What is one branch of craving or habit you sense you\'d be freer without?',
    'He says memory, knowledge, and even forgetting arise from the divine seated in your own heart. When have you felt guided or helped from within, as if you weren\'t working entirely alone?',
    'This chapter is recited daily by many before meals — a pause to remember the source. What is one small daily ritual of gratitude you could adopt?',
  ],
  16: [
    'Krishna lists divine qualities (fearlessness, honesty, compassion) and their shadows (arrogance, harshness, greed) as tendencies within every heart. Which divine quality do you most want to grow this year?',
    'The three gates to self-destruction are craving, anger, and greed. Which of these three has cost you the most — and what would guarding that gate look like in practice?',
    'The divine qualities begin with fearlessness — goodness done from fear isn\'t yet goodness. Where in your life are you "good" mainly because you\'re afraid, and what would freely-chosen goodness feel like?',
  ],
  17: [
    '"You are made of your faith — whatever you trust, you become." What are you placing your deepest trust in right now, and is it quietly shaping you into who you want to be?',
    'Krishna shows the same act — a meal, a gift, a discipline — can elevate or degrade depending on its spirit. Think of something you do routinely: what is the *why* underneath it?',
    'His definition of austerity of speech: words that are true, kind, and helpful. Which of those three does your speech most often miss, and with whom?',
  ],
  18: [
    'After 700 verses, Krishna says: "Reflect fully — then do as you choose." How does it feel to be trusted with your own decision rather than simply told what to do?',
    '"Letting go of all duties, take refuge in me — do not grieve." Where in your life have you been over-calculating, and what would it feel like to simply trust and let go?',
    'Sanjaya says fortune lives where skill and spirit ride the same chariot. In a challenge you\'re facing, where do you need more effort, and where do you need more surrender?',
  ],
};

export const gitaPreface: { subtitle: string; blocks: GitaBlock[] } = {
  subtitle: 'An introduction to the Song of God',
  blocks: [
    {
      type: 'verse',
      verse: {
        reference: 'Invocation',
        sanskrit: 'ॐ श्रीपरमात्मने नमः',
        transliteration: 'oṁ śrī-paramātmane namaḥ',
        meaning: 'Om — salutations to the Supreme Divine',
      },
    },
    {
      type: 'prose',
      text: `The Bhagavad Gita — the Song of God — is a seven-hundred-verse dialogue nested within the Mahabharata, India's great epic. On the battlefield of Kurukshetra, moments before a war between cousins, the greatest warrior of the age loses heart. His charioteer is Krishna, and their conversation — spanning eighteen chapters — is Krishna's answer to Arjuna's despair.

Though it opens on a battlefield, the Gita is not about war. Arjuna's crisis is every person's crisis: What is my duty? How do I act when every choice carries loss? Krishna's reply weaves the paths of action, devotion, and knowledge into a single vision of a life lived with purpose and without fear.

In this edition, each chapter unfolds as a story. Key Sanskrit verses appear with transliteration, meaning, and their verse number, so you can look up any passage in a full translation. Read straight through, or open the contents to jump to any chapter. However you enter, the Gita meets you where you are.`,
    },
  ],
};

export const gitaChapters: GitaChapterContent[] = [
  {
    number: 1,
    subtitle: "Arjuna's Crisis of Faith",
    blocks: [
      {
        type: 'verse',
        verse: {
          reference: '1.1',
          sanskrit:
            'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
          transliteration:
            'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya',
          meaning:
            'Dhritarashtra said: Gathered on the field of dharma, the field of the Kurus, eager to fight — what did my sons and the sons of Pandu do, Sanjaya?',
        },
      },
      {
        type: 'prose',
        text: "The Gita opens not with Krishna or Arjuna, but with a blind king. Dhritarashtra, whose sons have seized a kingdom that is not theirs, asks his minister Sanjaya to describe the battlefield. His very first words give the place its true name: dharma-kshetra — the field of dharma (righteousness). Whatever happens here will not just decide a war; it will decide what right and wrong mean for an entire age. Sanjaya, gifted with divine sight, begins to narrate. Conches blare on both sides. Bhishma, the grandfather of the dynasty, roars like a lion. And in the middle of it all stands a magnificent chariot bearing Arjuna, the finest archer alive, with Krishna holding the reins.",
      },
      { type: 'header', text: "Arjuna's Collapse" },
      {
        type: 'prose',
        text: "Arjuna asks Krishna to draw the chariot between the two armies so he can see who has come to fight. It is the worst thing he could have done. Across the field he sees no faceless enemy — he sees his grandfather Bhishma, his teacher Drona, cousins he grew up with, friends, uncles, in-laws. Every arrow he fires will land in his own family. The full weight of it crashes down on him at once.",
      },
      {
        type: 'verse',
        verse: {
          reference: '1.28',
          sanskrit:
            'दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् ।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ॥',
          transliteration:
            'dṛṣṭvemaṁ sva-janaṁ kṛṣṇa yuyutsuṁ samupasthitam\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati',
          meaning:
            'Arjuna said: Seeing my own people standing here eager for battle, Krishna, my limbs give way and my mouth goes dry.',
        },
      },
      {
        type: 'prose',
        text: "His body rebels before his mind can reason. His skin burns, his famous bow Gandiva slips from his hand, and his mind reels. Arjuna — the hero of a hundred battles — argues that victory won by killing family can bring no happiness, that the destruction of a family destroys its dharma itself. 'I will not fight,' he says. And casting aside his bow and arrows, he sinks down into the chariot, his heart overwhelmed with sorrow.",
      },
      {
        type: 'teaching',
        text: "This is vishada — paralyzing despair — and the Gita honors it by giving it the whole first chapter. Arjuna's breakdown is not weakness; it is the honest collision between duty and love that everyone eventually faces, whether on a battlefield or in a hospital corridor or across a kitchen table. The Gita begins where we actually live: confused, torn, and unable to act. Only a person who feels the problem this deeply is ready for the answer.",
      },
    ],
  },
  {
    number: 2,
    subtitle: 'The Secret of Who You Really Are',
    blocks: [
      {
        type: 'prose',
        text: "Krishna's first response is not gentle. He calls Arjuna's collapse unworthy of him — 'Where has this weakness come from at the hour of crisis?' When Arjuna admits he is genuinely confused and asks Krishna to teach him as a student, the tone changes completely. What follows is often called the summary of the entire Gita: the truth about who you are, and how to act once you know it.",
      },
      {
        type: 'verse',
        verse: {
          reference: '2.11',
          sanskrit:
            'अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥',
          transliteration:
            'aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ',
          meaning:
            'You grieve for those who need no grieving, yet you speak words of wisdom. The truly wise grieve neither for the living nor for the dead.',
        },
      },
      { type: 'header', text: 'You Were Never Born' },
      {
        type: 'prose',
        text: "Krishna begins with the deepest truth first. You are not this body, he tells Arjuna. The body is a garment the soul wears for a while. There was never a time when you did not exist, and there will never be a time when you cease to be. The atman (the self, the soul) cannot be cut by weapons, burned by fire, wetted by water, or dried by wind.",
      },
      {
        type: 'verse',
        verse: {
          reference: '2.13',
          sanskrit:
            'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥',
          transliteration:
            "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā\ntathā dehāntara-prāptir dhīras tatra na muhyati",
          meaning:
            'Just as the embodied soul passes in this body from childhood to youth to old age, so at death it passes into another body. The wise are not bewildered by this.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '2.22',
          sanskrit:
            'वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥',
          transliteration:
            "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī",
          meaning:
            'As a person discards worn-out clothes and puts on new ones, so the soul discards worn-out bodies and enters new ones.',
        },
      },
      { type: 'header', text: 'The Art of Action' },
      {
        type: 'prose',
        text: "Then Krishna turns from philosophy to practice. Even seen from the level of ordinary duty, he says, a warrior cannot walk away from a righteous fight. But there is a way of acting that does not bind you — and this is where Krishna gives the verse that has guided seekers, leaders, and ordinary people for millennia.",
      },
      {
        type: 'verse',
        verse: {
          reference: '2.47',
          sanskrit:
            'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
          transliteration:
            "karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
          meaning:
            'Your right is to your action alone, never to its fruits. Do not make the results your motive — and do not cling to inaction either.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '2.48',
          sanskrit:
            'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥',
          transliteration:
            'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate',
          meaning:
            'Established in yoga, do your work, letting go of attachment, staying equal in success and failure. That evenness of mind is called yoga.',
        },
      },
      { type: 'header', text: 'The Person of Steady Wisdom' },
      {
        type: 'prose',
        text: "Arjuna asks a practical question: what does such a person actually look like? How do they speak, sit, walk? Krishna's answer — the sthitaprajna (steady-wisdom) passage — is one of the most loved sections of the Gita. Such a person has let go of cravings and is content in the self alone; unshaken by sorrow, unattached in joy, free from obsessive desire, fear, and anger. And then Krishna maps, step by step, exactly how an unguarded mind falls.",
      },
      {
        type: 'verse',
        verse: {
          reference: '2.62-63',
          sanskrit:
            'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥\nक्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥',
          transliteration:
            "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate\nkrodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati",
          meaning:
            'Dwelling on the objects of the senses breeds attachment; attachment breeds desire; desire turns into anger. Anger clouds judgment, clouded judgment scrambles memory, scrambled memory destroys discernment — and when discernment is lost, a person is lost.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '2.69',
          sanskrit:
            'या निशा सर्वभूतानां तस्यां जागर्ति संयमी ।\nयस्यां जाग्रति भूतानि सा निशा पश्यतो मुनेः ॥',
          transliteration:
            'yā niśā sarva-bhūtānāṁ tasyāṁ jāgarti saṁyamī\nyasyāṁ jāgrati bhūtāni sā niśā paśyato muneḥ',
          meaning:
            'What is night for all beings, the self-controlled sage is awake in; and what all beings are awake to, the seer knows to be night.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 2 hands you the Gita's two foundation stones. First: you are an eternal soul, so fear of death and loss rests on a mistake about who you are. Second: peace does not come from controlling outcomes — it comes from pouring yourself into the work itself and releasing your grip on results. The anger chain of verses 2.62-63 is worth memorizing as a diagnostic: every meltdown starts with an unwatched thought. Catch it at 'dwelling,' and the whole cascade never happens.",
      },
    ],
  },
  {
    number: 3,
    subtitle: 'The Path of Selfless Action',
    blocks: [
      {
        type: 'prose',
        text: "Arjuna spots what looks like a contradiction: 'If wisdom is higher than action, Krishna, why are you pushing me into this terrible war?' Krishna's answer opens the path of karma yoga. Nobody can actually stop acting, he points out — even keeping the body alive is action, and a person who sits still while the mind churns with desires is not renounced, only pretending. The question is never whether to act, but how.",
      },
      {
        type: 'verse',
        verse: {
          reference: '3.19',
          sanskrit:
            'तस्मादसक्तः सततं कार्यं कर्म समाचर ।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥',
          transliteration:
            'tasmād asaktaḥ satataṁ kāryaṁ karma samācara\nasakto hy ācaran karma param āpnoti pūruṣaḥ',
          meaning:
            'Therefore, without attachment, always do the work that must be done; by acting without attachment a person attains the Supreme.',
        },
      },
      { type: 'header', text: 'The Wheel of Giving' },
      {
        type: 'prose',
        text: "Krishna then describes the universe as a great cycle of yajna (sacrifice, mutual offering). Rain feeds the crops, crops feed beings, and the spirit of offering keeps the whole wheel turning. Those who cook and consume only for themselves, he says bluntly, 'eat sin.' Work done as an offering — to the Divine, to the community, to something larger than yourself — nourishes the world and frees the worker. Work done only to grab keeps you chained. And people watch what we do far more than what we say.",
      },
      {
        type: 'verse',
        verse: {
          reference: '3.21',
          sanskrit:
            'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः ।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥',
          transliteration:
            'yad yad ācarati śreṣṭhas tat tad evetaro janaḥ\nsa yat pramāṇaṁ kurute lokas tad anuvartate',
          meaning:
            'Whatever a great person does, others do as well; whatever standard they set, the world follows.',
        },
      },
      { type: 'header', text: 'Your Path, Not Someone Else’s' },
      {
        type: 'verse',
        verse: {
          reference: '3.35',
          sanskrit:
            'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥',
          transliteration:
            'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ',
          meaning:
            "Better your own dharma done imperfectly than another's dharma done perfectly. Better even to die in your own dharma — another's path is full of fear.",
        },
      },
      {
        type: 'prose',
        text: "Svadharma means the duty that grows out of your own nature and situation — not a borrowed life that looks better from the outside. A flawed, authentic path transforms you; a polished imitation hollows you out. But Arjuna has one more question, and it may be the most honest question in the Gita: then why do good people still do wrong, as if pushed by some force?",
      },
      {
        type: 'verse',
        verse: {
          reference: '3.37',
          sanskrit:
            'काम एष क्रोध एष रजोगुणसमुद्भवः ।\nमहाशनो महापाप्मा विद्ध्येनमिह वैरिणम् ॥',
          transliteration:
            'kāma eṣa krodha eṣa rajo-guṇa-samudbhavaḥ\nmahāśano mahā-pāpmā viddhy enam iha vairiṇam',
          meaning:
            'It is desire, it is anger, born of the mode of passion — all-devouring and deeply harmful. Know this to be the enemy here.',
        },
      },
      {
        type: 'teaching',
        text: "Karma yoga in one line: act fully, offer the action, release the outcome. Krishna adds a warning label to the human condition — kama (craving) is a fire that grows the more it is fed, hiding in the senses, the mind, and the intellect. The chapter ends with a battle plan: steady the self by the Self, and slay the enemy that wears the disguise of your own wants. The enemy was never across the field; it is the craving that hijacks good people into wrong action.",
      },
    ],
  },
  {
    number: 4,
    subtitle: "The Divine Teacher's Secret",
    blocks: [
      {
        type: 'prose',
        text: "Krishna drops a bombshell: 'I taught this same eternal yoga to the sun god Vivasvan at the dawn of time; it was passed from teacher to student for ages, and then it was lost. Today I am teaching it to you.' Arjuna is baffled — Krishna was born in his own lifetime; how could he have taught anyone at the dawn of time? Krishna's answer reveals who has really been holding the reins of Arjuna's chariot.",
      },
      {
        type: 'verse',
        verse: {
          reference: '4.7',
          sanskrit:
            'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
          transliteration:
            'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
          meaning:
            'Whenever dharma declines and adharma rises, O Bharata, I bring myself into being.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '4.8',
          sanskrit:
            'परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
          transliteration:
            'paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge',
          meaning:
            'To protect the good, to end the wicked, and to re-establish dharma, I appear age after age.',
        },
      },
      { type: 'header', text: 'Action That Leaves No Residue' },
      {
        type: 'prose',
        text: "Unlike ordinary beings, Krishna says, he acts without being bound by action — and anyone can learn to act the same way. The wise person 'sees inaction in action and action in inaction': outwardly busy, inwardly still, working without the anxious sense of 'I am the doer.' Such a person's undertakings are burned clean by the fire of knowledge. Krishna surveys the many forms of yajna people practice — offering wealth, austerity, breath control, study — and declares the offering of knowledge the highest of all. Then he tells Arjuna exactly how to get it.",
      },
      {
        type: 'verse',
        verse: {
          reference: '4.34',
          sanskrit:
            'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया ।\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥',
          transliteration:
            'tad viddhi praṇipātena paripraśnena sevayā\nupadekṣyanti te jñānaṁ jñāninas tattva-darśinaḥ',
          meaning:
            'Learn it by humble approach, by sincere questioning, and by service; the wise who have seen the truth will teach you.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '4.38',
          sanskrit:
            'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥',
          transliteration:
            'na hi jñānena sadṛśaṁ pavitram iha vidyate\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati',
          meaning:
            'Nothing in this world purifies like knowledge. One who matures in yoga finds it, in time, within their own self.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 4 gives spiritual life both its cosmic promise and its practical method. The promise: the Divine does not abandon the world — whenever darkness gathers, help descends, age after age. The method: truth is learned the old way, from those who have seen it, approached with humility, honest questions, and service — and it ripens inside you with practice and time. Doubt, Krishna warns, is the real destroyer; knowledge is the sword that cuts it. Cut the doubt, and act.",
      },
    ],
  },
  {
    number: 5,
    subtitle: 'Renunciation and Action United',
    blocks: [
      {
        type: 'prose',
        text: "Arjuna is still tangled: 'Krishna, you praise renouncing action, and you praise doing action. Which one — tell me clearly!' Krishna's answer settles a debate that was ancient even then. Both paths lead to the same freedom, he says, but of the two, karma yoga — staying engaged while inwardly letting go — is the better and more practical way. True renunciation is not about quitting your work; it is about quitting the ego that clutches at it. The genuine renouncer 'neither hates nor craves.'",
      },
      {
        type: 'verse',
        verse: {
          reference: '5.10',
          sanskrit:
            'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः ।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥',
          transliteration:
            'brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ\nlipyate na sa pāpena padma-patram ivāmbhasā',
          meaning:
            'One who acts placing all actions in the Divine, abandoning attachment, is untouched by wrong — as a lotus leaf is untouched by water.',
        },
      },
      { type: 'header', text: 'The Same Self in All' },
      {
        type: 'prose',
        text: "The lotus leaf lives in the pond yet never gets wet. That is the karma yogi: fully in the world, unstained by it. Such seers, Krishna says, look with equal vision on a learned sage, a cow, an elephant, a dog, and an outcaste — because they see the same eternal self in every body. The knower of truth thinks, 'I am not really doing anything' even while seeing, hearing, touching, walking, breathing: the senses move among sense objects, while the inner self stays free. Pleasure born of outside contact, he warns, has a beginning and an end; the wise do not build their happiness on it.",
      },
      {
        type: 'verse',
        verse: {
          reference: '5.29',
          sanskrit:
            'भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् ।\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥',
          transliteration:
            'bhoktāraṁ yajña-tapasāṁ sarva-loka-maheśvaram\nsuhṛdaṁ sarva-bhūtānāṁ jñātvā māṁ śāntim ṛcchati',
          meaning:
            'Knowing me as the enjoyer of all offerings and disciplines, the great Lord of all worlds, and the friend of every being — one attains peace.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 5 dissolves a false choice that still traps people today: the idea that you must pick between a spiritual life and an active one. Krishna's answer is both — act like a monk acts, with everything offered and nothing clutched. The chapter closes with what tradition calls the peace formula (5.29): peace arrives when you stop performing for the world and start working as an offering to the friend of all beings. The lotus leaf is the whole teaching in one image: be in the water; don't let the water be in you.",
      },
    ],
  },
  {
    number: 6,
    subtitle: 'The Science of Meditation',
    blocks: [
      {
        type: 'verse',
        verse: {
          reference: '6.5',
          sanskrit:
            'उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥',
          transliteration:
            'uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ',
          meaning:
            'Lift yourself by your own self; do not let yourself sink. For the self alone is your friend, and the self alone is your enemy.',
        },
      },
      {
        type: 'prose',
        text: "No verse in the Gita places responsibility more squarely in your hands. The mind that is mastered is your best friend; the mind left unmastered is your worst enemy — and you are the only one who can decide which you carry. Krishna then teaches meditation with the precision of a manual: find a clean, quiet place; sit steady; hold body, head, and neck in a line; let the gaze rest; and bring the mind gently to one point. He is just as practical about lifestyle: yoga is not for one who eats too much or too little, sleeps too much or too little. The middle path in everything makes meditation possible.",
      },
      { type: 'header', text: 'The Lamp in a Windless Place' },
      {
        type: 'prose',
        text: "The disciplined mind, Krishna says, becomes like a lamp in a windless place — a flame that does not flicker. In that stillness the meditator finds a joy beyond the senses, held by which no sorrow can shake them, and sees the self in all beings and all beings in the self.",
      },
      {
        type: 'verse',
        verse: {
          reference: '6.30',
          sanskrit:
            'यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति ।\nतस्याहं न प्रणश्यामि स च मे न प्रणश्यति ॥',
          transliteration:
            'yo māṁ paśyati sarvatra sarvaṁ ca mayi paśyati\ntasyāhaṁ na praṇaśyāmi sa ca me na praṇaśyati',
          meaning:
            'One who sees me everywhere and sees everything in me — I am never lost to them, and they are never lost to me.',
        },
      },
      { type: 'header', text: 'But the Mind Won’t Sit Still' },
      {
        type: 'prose',
        text: "Then Arjuna interrupts with the objection every meditator has ever felt.",
      },
      {
        type: 'verse',
        verse: {
          reference: '6.34',
          sanskrit:
            'चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् ।\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् ॥',
          transliteration:
            'cañcalaṁ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham\ntasyāhaṁ nigrahaṁ manye vāyor iva su-duṣkaram',
          meaning:
            'The mind is restless, Krishna — turbulent, strong, and stubborn. Controlling it seems to me as hard as controlling the wind.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '6.35',
          sanskrit:
            'असंशयं महाबाहो मनो दुर्निग्रहं चलम् ।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥',
          transliteration:
            'asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate',
          meaning:
            'Without doubt, mighty-armed one, the mind is hard to restrain and restless. But it is tamed, son of Kunti, by practice and by dispassion.',
        },
      },
      {
        type: 'prose',
        text: "Krishna does not deny the difficulty — he validates it, then gives the two tools that every contemplative tradition since has rediscovered: abhyasa (steady, repeated practice) and vairagya (loosening the grip of craving). Arjuna pushes once more: what happens to someone who tries sincerely and still falls short?",
      },
      {
        type: 'verse',
        verse: {
          reference: '6.40',
          sanskrit:
            'पार्थ नैवेह नामुत्र विनाशस्तस्य विद्यते ।\nन हि कल्याणकृत्कश्चिद्दुर्गतिं तात गच्छति ॥',
          transliteration:
            'pārtha naiveha nāmutra vināśas tasya vidyate\nna hi kalyāṇa-kṛt kaścid durgatiṁ tāta gacchati',
          meaning:
            'O Partha, neither in this world nor the next is such a person lost. No one who does good, my friend, ever comes to a bad end.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 6 is the Gita's meditation handbook, and its kindest chapter. Three takeaways: you are your own project (6.5 — lift yourself, no one else can); the restless mind is normal and trainable (practice plus dispassion, repeated daily, wins); and no sincere effort is ever wasted (6.40) — the seeker who stumbles resumes the journey with everything gained intact. Krishna ends by ranking the yogi above the ascetic, the scholar, and the ritualist — and the yogi who loves him with inner trust as the highest of all.",
      },
    ],
  },
  {
    number: 7,
    subtitle: 'Knowing the Divine Nature',
    blocks: [
      {
        type: 'prose',
        text: "The Gita now shifts its center of gravity. The first six chapters looked inward at the self; the next six look upward at the Divine. 'Hear how, practicing yoga with your mind attached to me,' Krishna begins, 'you shall know me fully, beyond doubt.' He adds a striking note on how rare this knowledge is: among thousands of people, hardly one strives for perfection — and of those who strive, hardly one knows him in truth. Then he explains what he is made of: an outer nature of earth, water, fire, air, ether, mind, intellect, and ego — and an inner, living nature that upholds the entire universe. Everything that exists is strung on him 'like pearls on a thread.'",
      },
      {
        type: 'verse',
        verse: {
          reference: '7.8',
          sanskrit:
            'रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः ।\nप्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु ॥',
          transliteration:
            "raso 'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ\npraṇavaḥ sarva-vedeṣu śabdaḥ khe pauruṣaṁ nṛṣu",
          meaning:
            'I am the taste in water, son of Kunti, the radiance of the moon and sun, the sacred Om in all the Vedas, the sound in space, and the ability in human beings.',
        },
      },
      { type: 'header', text: 'Four Kinds of Seekers' },
      {
        type: 'prose',
        text: "Who actually turns to the Divine? Krishna names four honest doorways: the distressed, who come in pain; the curious, who come with questions; the ambitious, who come wanting something; and the wise, who come out of love for truth itself. He welcomes all four — every doorway counts.",
      },
      {
        type: 'verse',
        verse: {
          reference: '7.16',
          sanskrit:
            'चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन ।\nआर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ ॥',
          transliteration:
            "catur-vidhā bhajante māṁ janāḥ su-kṛtino 'rjuna\nārto jijñāsur arthārthī jñānī ca bharatarṣabha",
          meaning:
            'Four kinds of good people turn to me, Arjuna: the distressed, the seeker of knowledge, the seeker of wealth, and the wise.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '7.19',
          sanskrit:
            'बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते ।\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥',
          transliteration:
            'bahūnāṁ janmanām ante jñānavān māṁ prapadyate\nvāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ',
          meaning:
            "At the end of many births, the person of wisdom takes refuge in me, realizing 'all this is the Divine.' Such a great soul is very rare.",
        },
      },
      {
        type: 'teaching',
        text: "Chapter 7 retrains perception. The Divine is not hiding in some other world — it is the taste you notice in water, the light you see by, the talent working through your hands. Practice finding that signature in ordinary moments and devotion stops being an activity and becomes a way of seeing. And Krishna's list of four seekers is deeply reassuring: it doesn't matter whether you arrive in grief, curiosity, or need. Arriving is what matters; love matures on the way.",
      },
    ],
  },
  {
    number: 8,
    subtitle: 'Remembering the Divine',
    blocks: [
      {
        type: 'prose',
        text: "Arjuna opens the chapter with seven rapid-fire questions: What is Brahman? What is the self? What is karma? And — the one that gives the chapter its name — how are you known at the time of death? Krishna answers each briefly, then slows down on the last one, because it holds a law of consciousness that shapes every moment of life, not just the final one.",
      },
      {
        type: 'verse',
        verse: {
          reference: '8.5',
          sanskrit:
            'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् ।\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ॥',
          transliteration:
            'anta-kāle ca mām eva smaran muktvā kalevaram\nyaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ',
          meaning:
            'Whoever leaves the body remembering me alone at the time of death attains my nature — of this there is no doubt.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '8.6',
          sanskrit:
            'यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् ।\nतं तमेवैति कौन्तेय सदा तद्भावभावितः ॥',
          transliteration:
            'yaṁ yaṁ vāpi smaran bhāvaṁ tyajaty ante kalevaram\ntaṁ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ',
          meaning:
            'Whatever state of being one remembers when leaving the body, that state one attains, son of Kunti — for one grows into whatever one constantly dwells on.',
        },
      },
      { type: 'header', text: 'Remember Me, and Act' },
      {
        type: 'prose',
        text: "The logic is simple and sobering: the final thought is not random — it is the sum of a lifetime's dwelling. Whatever the mind rehearses daily is what it will hold at the end. So Krishna's instruction is not 'think of me when you die.' It is this:",
      },
      {
        type: 'verse',
        verse: {
          reference: '8.7',
          sanskrit:
            'तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च ।\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम् ॥',
          transliteration:
            'tasmāt sarveṣu kāleṣu mām anusmara yudhya ca\nmayy arpita-mano-buddhir mām evaiṣyasy asaṁśayam',
          meaning:
            'Therefore remember me at all times, and fight. With mind and intellect offered to me, you will come to me without doubt.',
        },
      },
      {
        type: 'prose',
        text: "Remember me and fight — the whole Gita compressed into four words. Not remembrance instead of life's battles, but remembrance in the middle of them. Krishna goes on to describe the yogic art of leaving the body, the sacred syllable Om as the vessel of that final remembrance, and the vast cosmic cycles — days and nights of Brahma, each a thousand ages long — within which every world, however high, comes and goes. Beyond all of it stands an unmanifest, imperishable reality: his supreme abode, from which there is no return to sorrow.",
      },
      {
        type: 'teaching',
        text: "Chapter 8's teaching is really about habit: you become what you dwell on. The mind is always memorizing its direction, and death only reads out the total. That turns every ordinary day into practice — smarana (remembrance) woven through work, meals, commutes, conflict. Start small: one anchor-thought returned to a hundred times a day. What you practice returning to is what you will finally rest in.",
      },
    ],
  },
  {
    number: 9,
    subtitle: 'The Most Open Secret',
    blocks: [
      {
        type: 'prose',
        text: "'Because you do not begrudge me,' Krishna tells Arjuna, 'I will share the most confidential knowledge of all — the king of knowledge, the king of secrets, directly experienceable, joyful to practice, and everlasting.' The secret is startlingly simple: the Divine pervades everything, sustains every being, and can be reached not through heroic austerity but through love. Even those who worship other forms with faith, Krishna says, are really worshiping him. But worship offered without any relationship — mechanical, transactional — keeps returning a person to the same rounds of gain and loss. Those who turn to him wholeheartedly get a promise unlike anything else in scripture:",
      },
      {
        type: 'verse',
        verse: {
          reference: '9.22',
          sanskrit:
            'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥',
          transliteration:
            'ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham',
          meaning:
            'For those who worship me with undivided heart, ever devoted, I carry what they lack and preserve what they have.',
        },
      },
      { type: 'header', text: 'A Leaf, a Flower, a Fruit, Water' },
      {
        type: 'verse',
        verse: {
          reference: '9.26',
          sanskrit:
            'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥',
          transliteration:
            'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ',
          meaning:
            'Whoever offers me a leaf, a flower, a fruit, or water with devotion — that offering of love from a pure heart, I accept.',
        },
      },
      {
        type: 'prose',
        text: "The economy of the spiritual world runs on love, not price tags. A leaf offered with a full heart outweighs a fortune offered for show. Krishna widens the door further: whatever you do — eating, giving, working, enduring — do it as an offering, and life itself becomes worship. Then comes the chapter's most radical statement about who is allowed in:",
      },
      {
        type: 'verse',
        verse: {
          reference: '9.29',
          sanskrit:
            'समोऽहं सर्वभूतेषु न मे द्वेष्योऽस्ति न प्रियः ।\nये भजन्ति तु मां भक्त्या मयि ते तेषु चाप्यहम् ॥',
          transliteration:
            "samo 'haṁ sarva-bhūteṣu na me dveṣyo 'sti na priyaḥ\nye bhajanti tu māṁ bhaktyā mayi te teṣu cāpy aham",
          meaning:
            'I am the same toward all beings; none is hateful to me, none dear. But those who worship me with love — they are in me, and I am in them.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 9 dismantles the idea that the Divine keeps a ledger of qualifications. Even a person of terrible past conduct, Krishna says, who turns to him wholeheartedly is to be counted as good, 'for they have resolved rightly' — and no devotee of his is ever lost. The practices are deliberately within everyone's reach: offer what you have, remember whom you're offering it to, and let the relationship do the transforming. The most confidential knowledge turns out to be the most democratic: love is the whole qualification.",
      },
    ],
  },
  {
    number: 10,
    subtitle: 'The Infinite in the Everyday',
    blocks: [
      {
        type: 'prose',
        text: "'Hear my supreme word once more,' Krishna says, 'because I want your good, and you are dear to me.' Neither the gods nor the great sages know his origin, for he is their origin. Whoever understands him as the unborn source of everything is freed from confusion. Then, because Arjuna asks how to actually keep him in mind, Krishna begins naming where his splendor is easiest to spot — and starts by locating himself somewhere very close.",
      },
      {
        type: 'verse',
        verse: {
          reference: '10.20',
          sanskrit:
            'अहमात्मा गुडाकेश सर्वभूताशयस्थितः ।\nअहमादिश्च मध्यं च भूतानामन्त एव च ॥',
          transliteration:
            'aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ\naham ādiś ca madhyaṁ ca bhūtānām anta eva ca',
          meaning:
            'I am the Self, Arjuna, seated in the heart of all beings; I am their beginning, their middle, and their end.',
        },
      },
      { type: 'header', text: 'The Catalog of Splendor' },
      {
        type: 'prose',
        text: "What follows is one of the most poetic passages in the Gita — a tour of the universe's excellences. Among lights, I am the radiant sun. Among mountains, Meru; among rivers, the Ganga. Among trees, the sacred fig; among sounds, the single syllable Om. Among seasons, the flower-bearing spring. I am the gambling of the cunning and the splendor of the splendid — even where the world plays rough, the energy in play is his. Of creations, I am the beginning and the end; among sciences, the science of the Self; among warriors, Arjuna himself. The list tumbles on for dozens of verses, then Krishna cuts it short: why itemize the infinite?",
      },
      {
        type: 'verse',
        verse: {
          reference: '10.41',
          sanskrit:
            'यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा ।\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसम्भवम् ॥',
          transliteration:
            "yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā\ntat tad evāvagaccha tvaṁ mama tejo-'ṁśa-sambhavam",
          meaning:
            'Whatever is glorious, beautiful, or mighty — know that it springs from but a spark of my splendor.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 10 is a training in wonder. Every excellence you admire — a mountain range, a genius, a generous act, a perfect morning — is a spark of one splendor. The practice is simple: when something stops you in your tracks, trace the beauty back to its source. Admiration becomes remembrance. And because the chapter begins at 10.20 — the Self in every heart — the grandest vibhuti (divine glory) on the list is already sitting inside you and everyone you meet.",
      },
    ],
  },
  {
    number: 11,
    subtitle: 'The Universal Form',
    blocks: [
      {
        type: 'prose',
        text: "Arjuna has heard the philosophy. Now he wants to see. 'If you think I can bear it,' he asks, 'show me your imperishable cosmic self.' Krishna grants him divya-chakshu — divine eyes — because no mortal eye could take in what comes next: the Vishvarupa, the universal form, containing every world, every god, every being, all time, in one body without beginning or end.",
      },
      {
        type: 'verse',
        verse: {
          reference: '11.12',
          sanskrit:
            'दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता ।\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥',
          transliteration:
            'divi sūrya-sahasrasya bhaved yugapad utthitā\nyadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ',
          meaning:
            'If a thousand suns were to rise in the sky at once, such brilliance might resemble the splendor of that great being.',
        },
      },
      {
        type: 'prose',
        text: "Arjuna sees the whole universe gathered in one place, with countless mouths and eyes, blazing like fire at the end of time. Wonder curdles into terror: he watches the warriors of both armies — Bhishma, Drona, Karna, and all the kings — rushing into the form's flaming mouths like rivers racing to the ocean, like moths into a flame. Trembling, he asks: 'Who are you, so fierce?' The answer is the most famous line in the Gita:",
      },
      {
        type: 'verse',
        verse: {
          reference: '11.32',
          sanskrit:
            'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः ।\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ॥',
          transliteration:
            "kālo 'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ\nṛte 'pi tvāṁ na bhaviṣyanti sarve ye 'vasthitāḥ praty-anīkeṣu yodhāḥ",
          meaning:
            'I am Time, the great destroyer of worlds, engaged here in ending all these people. Even without you, none of the warriors arrayed in the opposing ranks will survive.',
        },
      },
      {
        type: 'prose',
        text: "'Therefore arise and win your glory,' Krishna tells him. 'These warriors are already slain by me — be simply my instrument, the archer whose arrow was always going to fly.' Overwhelmed, Arjuna bows again and again, apologizing for every casual word he ever spoke to the friend who turns out to contain the universe — and then begs to see the familiar face again.",
      },
      {
        type: 'verse',
        verse: {
          reference: '11.46',
          sanskrit:
            'किरीटिनं गदिनं चक्रहस्तमिच्छामि त्वां द्रष्टुमहं तथैव ।\nतेनैव रूपेण चतुर्भुजेन सहस्रबाहो भव विश्वमूर्ते ॥',
          transliteration:
            'kirīṭinaṁ gadinaṁ cakra-hastam icchāmi tvāṁ draṣṭum ahaṁ tathaiva\ntenaiva rūpeṇa catur-bhujena sahasra-bāho bhava viśva-mūrte',
          meaning:
            'I long to see you as before, with crown, mace, and discus in hand. O thousand-armed form of the universe, appear again in that four-armed form.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 11 holds the Gita's two faces of the Divine in one frame: the infinite that dwarfs and dissolves everything — 'I am Time' — and the intimate friend with a face you can love. Krishna returns to his gentle human form and adds that this vision is not won by rituals or austerity, but by undivided devotion. The takeaway is double-edged: humility (history and time are vastly bigger than you; be an instrument, not the author) and comfort (the power running the universe is, at its heart, someone you can talk to from a chariot).",
      },
    ],
  },
  {
    number: 12,
    subtitle: 'The Path of Love',
    blocks: [
      {
        type: 'prose',
        text: "Fresh from the overwhelming cosmic vision, Arjuna asks the practical question it raises: who is better established in yoga — those who worship you with form and love, or those who pursue the formless, unmanifest Absolute? Krishna honors both paths, but is candid: the formless way is steep and hard for embodied beings, while those who fix their hearts on him with faith are quickly lifted 'out of the ocean of birth and death.' For everyone who can't yet hold their mind steadily on the Divine, he lays out a ladder anyone can climb: try constant remembrance; if that's beyond you, practice regularly; if that's beyond you, work for his sake; and if even that's too much, simply act while letting go of the results.",
      },
      { type: 'header', text: 'The Devotee Krishna Loves' },
      {
        type: 'verse',
        verse: {
          reference: '12.13-14',
          sanskrit:
            'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च ।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः ।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥',
          transliteration:
            'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ',
          meaning:
            'Free of hatred toward any being, friendly and compassionate, without possessiveness or ego, equal in sorrow and joy, forgiving, ever content, self-controlled, firm in resolve, with mind and intellect offered to me — such a devotee is dear to me.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '12.16',
          sanskrit:
            'अनपेक्षः शुचिर्दक्ष उदासीनो गतव्यथः ।\nसर्वारम्भपरित्यागी यो मद्भक्तः स मे प्रियः ॥',
          transliteration:
            'anapekṣaḥ śucir dakṣa udāsīno gata-vyathaḥ\nsarvārambha-parityāgī yo mad-bhaktaḥ sa me priyaḥ',
          meaning:
            'Free of wants, pure, skillful, impartial, untroubled, having renounced the ego in every undertaking — such a devotee of mine is dear to me.',
        },
      },
      {
        type: 'prose',
        text: "For eight verses Krishna paints this portrait, returning after each brushstroke to the same refrain — 'that one is dear to me.' The person from whom the world feels no fear, and who feels no fear of the world. Equal to friend and foe, in honor and disgrace, in heat and cold. Silent when needed, content with whatever comes, at home everywhere and nowhere. It is the sthitaprajna of Chapter 2, repainted in the warm colors of love.",
      },
      {
        type: 'teaching',
        text: "Chapter 12 is the Gita's gentlest chapter, and its checklist is worth reading slowly: no hatred, friendliness, compassion, no clinging, no ego, patience, contentment. Notice what's absent — no feats of meditation, no scriptural mastery, no austerities. The qualities Krishna calls 'dear' are all relational; devotion is measured by how you treat beings, not by how high you climb. And the ladder of 12.8-11 removes every excuse: wherever you actually are today, there is a rung within reach.",
      },
    ],
  },
  {
    number: 13,
    subtitle: 'The Field and the Knower',
    blocks: [
      {
        type: 'prose',
        text: "With Chapter 13, the Gita's final movement begins — six chapters of jnana (knowledge) that give the earlier teachings their philosophical backbone. Krishna starts with a distinction so fundamental that, once seen, it reorganizes everything: you are not the field; you are the one who knows the field.",
      },
      {
        type: 'verse',
        verse: {
          reference: '13.2',
          sanskrit:
            'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते ।\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ॥',
          transliteration:
            'idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate\netad yo vetti taṁ prāhuḥ kṣetra-jña iti tad-vidaḥ',
          meaning:
            'This body, son of Kunti, is called the field; the one who knows it, the wise call the knower of the field.',
        },
      },
      {
        type: 'prose',
        text: "The field (kshetra) is everything that can be observed: the body, the senses, the mind, the emotions, desire and aversion, pleasure and pain — the whole changing landscape of experience. The knower (kshetrajna) is the consciousness that watches it all. Krishna adds: 'Know me as the knower of the field in all fields.' Then he defines real knowledge — and it is not book-learning. Humility, non-violence, patience, honesty, service to a teacher, purity, steadiness, self-control, dispassion, absence of ego. Everything else, he says flatly, is ignorance.",
      },
      { type: 'header', text: 'The Light of All Lights' },
      {
        type: 'verse',
        verse: {
          reference: '13.18',
          sanskrit:
            'ज्योतिषामपि तज्ज्योतिस्तमसः परमुच्यते ।\nज्ञानं ज्ञेयं ज्ञानगम्यं हृदि सर्वस्य विष्ठितम् ॥',
          transliteration:
            'jyotiṣām api taj jyotis tamasaḥ param ucyate\njñānaṁ jñeyaṁ jñāna-gamyaṁ hṛdi sarvasya viṣṭhitam',
          meaning:
            'That is the light of all lights, said to be beyond darkness — knowledge itself, the object of knowledge, and the goal of knowledge, dwelling in the heart of all.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '13.28',
          sanskrit:
            'समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम् ।\nविनश्यत्स्वविनश्यन्तं यः पश्यति स पश्यति ॥',
          transliteration:
            'samaṁ sarveṣu bhūteṣu tiṣṭhantaṁ parameśvaram\nvinaśyatsv avinaśyantaṁ yaḥ paśyati sa paśyati',
          meaning:
            'One who sees the Supreme Lord dwelling equally in all beings — the imperishable within the perishing — that one truly sees.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 13's move is the oldest trick of wisdom, and the hardest: step back. Your aching knee, your racing thoughts, your bad mood — all of it is field, all of it observable, and the observer is untouched by what it observes. Suffering comes from confusing the two, like a farmer who thinks he is the soil. Practice the shift a few times a day — 'I am aware of anxiety' instead of 'I am anxious' — and 13.28 becomes practical too: the same watcher looks out of every pair of eyes you meet.",
      },
    ],
  },
  {
    number: 14,
    subtitle: 'The Three Strands of Nature',
    blocks: [
      {
        type: 'prose',
        text: "Why do the same person's days feel so different — clear and generous one morning, restless and grasping by noon, heavy and dull by night? Krishna's answer is the theory of the three gunas: three strands braided through all of material nature, coloring every mood, meal, motive, and belief.",
      },
      {
        type: 'verse',
        verse: {
          reference: '14.5',
          sanskrit:
            'सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः ।\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥',
          transliteration:
            'sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ\nnibadhnanti mahā-bāho dehe dehinam avyayam',
          meaning:
            'Sattva, rajas, and tamas — these qualities born of nature bind the imperishable soul to the body, mighty-armed one.',
        },
      },
      {
        type: 'prose',
        text: "Sattva (clarity, harmony) binds through attachment to happiness and knowledge — even goodness can be a golden chain. Rajas (passion, restlessness) binds through craving and compulsive activity. Tamas (inertia, darkness) binds through laziness, confusion, and sleep. All three are always present; the question is which one is driving. When sattva prevails, the senses light up with understanding. When rajas prevails, greed and busyness take over. When tamas prevails, everything fogs. Krishna reads even death through the gunas — and then Arjuna asks the practical question: how does someone who has gone beyond them behave?",
      },
      { type: 'header', text: 'Beyond the Three' },
      {
        type: 'verse',
        verse: {
          reference: '14.20',
          sanskrit:
            'गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान् ।\nजन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते ॥',
          transliteration:
            "guṇān etān atītya trīn dehī deha-samudbhavān\njanma-mṛtyu-jarā-duḥkhair vimukto 'mṛtam aśnute",
          meaning:
            'When the embodied soul rises above these three qualities that spring from the body, freed from birth, death, old age, and sorrow, it tastes immortality.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '14.26',
          sanskrit:
            'मां च योऽव्यभिचारेण भक्तियोगेन सेवते ।\nस गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते ॥',
          transliteration:
            "māṁ ca yo 'vyabhicāreṇa bhakti-yogena sevate\nsa guṇān samatītyaitān brahma-bhūyāya kalpate",
          meaning:
            'And one who serves me with unswerving devotion rises above these qualities and is ready for the state of Brahman.',
        },
      },
      {
        type: 'teaching',
        text: "The gunas are the Gita's psychology, and they remain startlingly useful. Instead of judging yourself — 'I'm lazy, I'm frantic' — you learn to diagnose: tamas wants sleep and junk food; rajas wants more of everything, faster; sattva wants clarity and quiet. You can't fight a guna head-on, but you can feed a different one: change the food, the company, the input, and the mind follows. The one who has gone beyond, Krishna says, watches even the gunas as weather — 'the qualities are acting among themselves' — and the express route beyond all three is steady devotion (14.26).",
      },
    ],
  },
  {
    number: 15,
    subtitle: 'The Tree of Existence and the Supreme Person',
    blocks: [
      {
        type: 'verse',
        verse: {
          reference: '15.1',
          sanskrit:
            'ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् ।\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥',
          transliteration:
            'ūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam\nchandāṁsi yasya parṇāni yas taṁ veda sa veda-vit',
          meaning:
            'They speak of an eternal ashvattha tree with its roots above and branches below, whose leaves are the Vedic hymns. One who knows this tree knows the Vedas.',
        },
      },
      {
        type: 'prose',
        text: "Picture a great fig tree growing upside down: roots in the world of spirit above, branches spreading down into human life, watered by the three gunas, its buds the objects of the senses. That is samsara — the endless, flickering world of experience. Its true form cannot be seen from inside it: no beginning, no end, no resting place. Krishna's instruction is decisive: cut this deeply-rooted tree down with the axe of non-attachment, and then seek the place from which no one returns, surrendering to the source from which the whole tree grew.",
      },
      { type: 'header', text: 'The Indweller' },
      {
        type: 'prose',
        text: "Where is that source? Closer than expected. The soul in this world, Krishna says, is 'an eternal fragment of myself.' It is he, as the fire of digestion, who processes every meal; his radiance that lights the sun and moon; and most intimately:",
      },
      {
        type: 'verse',
        verse: {
          reference: '15.15',
          sanskrit:
            'सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च ।\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥',
          transliteration:
            'sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham',
          meaning:
            'I am seated in the hearts of all; from me come memory, knowledge, and their loss. I am what all the Vedas seek to know — the author of Vedanta and the knower of the Vedas.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '15.19',
          sanskrit:
            'यो मामेवमसम्मूढो जानाति पुरुषोत्तमम् ।\nस सर्वविद्भजति मां सर्वभावेन भारत ॥',
          transliteration:
            'yo mām evam asammūḍho jānāti puruṣottamam\nsa sarva-vid bhajati māṁ sarva-bhāvena bhārata',
          meaning:
            'One who, undeluded, knows me as the Supreme Person knows everything, and worships me with their whole being, O Bharata.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 15 is short, and tradition treats it as the Gita's essence — many families recite it daily before meals. Its map has three landmarks: the perishable world (the tree), the imperishable souls caught in its branches, and beyond both, Purushottama — the Supreme Person who sustains all of it from within. The practical teaching hides in 15.15: memory, understanding, and even forgetting arise from the Divine seated in your own heart. You are never working alone; the light you think by is borrowed from the source you are looking for.",
      },
    ],
  },
  {
    number: 16,
    subtitle: 'Two Natures Within Us',
    blocks: [
      {
        type: 'verse',
        verse: {
          reference: '16.1-3',
          sanskrit:
            'अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः ।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥',
          transliteration:
            'abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam',
          meaning:
            'Fearlessness, purity of heart, steadiness in knowledge and yoga; charity, self-restraint, sacrifice, study, austerity, and honesty… (the divine endowment begins)',
        },
      },
      {
        type: 'prose',
        text: "Krishna inventories two estates a human being can inherit. The daivi sampad (divine endowment) continues: non-violence, truthfulness, freedom from anger, renunciation, tranquility, compassion for all beings, gentleness, modesty, forgiveness, fortitude, cleanliness, and freedom from malice and conceit. The asuri sampad (ungodly endowment) is its shadow: hypocrisy, arrogance, conceit, anger, harshness, and ignorance. People of that nature, Krishna says, see a world without truth or foundation, believe craving is the whole point of life, and are driven by insatiable desire — 'bound by a hundred ropes of hope.' Lest Arjuna panic mid-inventory, Krishna stops to reassure him:",
      },
      {
        type: 'verse',
        verse: {
          reference: '16.5',
          sanskrit:
            'दैवी सम्पद्विमोक्षाय निबन्धायासुरी मता ।\nमा शुचः सम्पदं दैवीमभिजातोऽसि पाण्डव ॥',
          transliteration:
            "daivī sampad vimokṣāya nibandhāyāsurī matā\nmā śucaḥ sampadaṁ daivīm abhijāto 'si pāṇḍava",
          meaning:
            'The divine endowment leads to freedom, the ungodly to bondage. But do not grieve, son of Pandu — you are born to the divine nature.',
        },
      },
      { type: 'header', text: 'The Three Gates' },
      {
        type: 'verse',
        verse: {
          reference: '16.21',
          sanskrit:
            'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः ।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥',
          transliteration:
            'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet',
          meaning:
            'Three gates lead to self-destruction: desire, anger, and greed. Therefore give up these three.',
        },
      },
      {
        type: 'teaching',
        text: "Read Chapter 16 as a mirror, not a weapon — its lists describe tendencies inside every heart, not teams of people. The divine qualities begin, tellingly, with fearlessness: goodness that comes from fear isn't yet goodness. And the chapter's exit instruction is concrete: watch the three gates (craving, anger, greed) — every genuinely self-destructive act in your life walked in through one of them. Krishna closes by handing us a compass for ambiguous moments: when in doubt, let shastra (the wisdom of scripture) rather than impulse decide what is worth doing.",
      },
    ],
  },
  {
    number: 17,
    subtitle: 'The Three Kinds of Faith',
    blocks: [
      {
        type: 'prose',
        text: "Arjuna asks a subtle question: what about people who worship with real faith but without knowing the scriptures — where do they stand? Krishna's answer widens the guna teaching of Chapter 14 into the whole of religious and daily life: faith itself comes in three colors.",
      },
      {
        type: 'verse',
        verse: {
          reference: '17.3',
          sanskrit:
            'सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत ।\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ॥',
          transliteration:
            "sattvānurūpā sarvasya śraddhā bhavati bhārata\nśraddhā-mayo 'yaṁ puruṣo yo yac-chraddhaḥ sa eva saḥ",
          meaning:
            'The faith of each person mirrors their inner nature, O Bharata. A person is made of their faith: whatever their faith is, that is what they are.',
        },
      },
      {
        type: 'prose',
        text: "Whatever you trust, you become — the verse cuts deeper every time you read it. Krishna then walks through life's ordinary departments and shows the three strands running through each. Food: sattvic food increases vitality, health, and cheerfulness; rajasic food — too bitter, sour, salty, burning — breeds pain and disease; tamasic food is stale, tasteless, left over. Sacrifice, austerity, and charity each split the same three ways: done as duty without expectation (sattva), done for show and reward (rajas), or done carelessly and harmfully (tamas). Austerity itself gets a beautiful, three-part definition: of the body — reverence, cleanliness, non-violence; of speech — words that are true, kind, and helpful; of the mind — serenity, gentleness, self-mastery.",
      },
      { type: 'header', text: 'Giving, Graded' },
      {
        type: 'verse',
        verse: {
          reference: '17.20',
          sanskrit:
            'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे ।\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥',
          transliteration:
            "dātavyam iti yad dānaṁ dīyate 'nupakāriṇe\ndeśe kāle ca pātre ca tad dānaṁ sāttvikaṁ smṛtam",
          meaning:
            'A gift given simply because giving is right — to one who cannot repay, at the fit place and time, to a worthy recipient — that giving is sattvic.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 17 is a quality-audit for everyday life. The same act — a meal, a donation, a discipline — can elevate or degrade depending on the spirit it carries; the what matters less than the how and why. Verse 17.3 is the hinge: you are made of your shraddha (faith, deep trust), so choose carefully what you give your trust to — it is quietly manufacturing you. The chapter ends with 'om tat sat,' the threefold name of the Absolute that consecrates every sincere act — and a warning that acts done without faith are 'asat': nothing here, nothing hereafter.",
      },
    ],
  },
  {
    number: 18,
    subtitle: 'The Final Teaching',
    blocks: [
      {
        type: 'prose',
        text: "The longest chapter of the Gita is its summit and its summary. Arjuna asks one final question — what is the real difference between sannyasa (renouncing action) and tyaga (renouncing in action)? Krishna's verdict gathers everything the dialogue has built: prescribed duties should never be abandoned; what must be abandoned is attachment and anxiety about results. He reviews the machinery of action, the three-fold division of knowledge, action, doers, intellect, resolve, and happiness by the gunas — sattvic happiness, he notes, tastes like poison at first and nectar in the end, while rajasic pleasure is nectar first and poison later. Then he returns to where Chapter 3 began: your own nature is your assignment.",
      },
      {
        type: 'verse',
        verse: {
          reference: '18.47',
          sanskrit:
            'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।\nस्वभावनियतं कर्म कुर्वन्नाप्नोति किल्बिषम् ॥',
          transliteration:
            'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsvabhāva-niyataṁ karma kurvan nāpnoti kilbiṣam',
          meaning:
            "Better your own dharma done imperfectly than another's done perfectly. Doing the work your own nature ordains, you incur no fault.",
        },
      },
      { type: 'header', text: 'Deliberate Fully — Then Choose' },
      {
        type: 'verse',
        verse: {
          reference: '18.63',
          sanskrit:
            'इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया ।\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु ॥',
          transliteration:
            'iti te jñānam ākhyātaṁ guhyād guhya-taraṁ mayā\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru',
          meaning:
            'Thus I have declared to you knowledge more secret than secrecy itself. Reflect on it fully — then do as you choose.',
        },
      },
      {
        type: 'prose',
        text: "Pause on what just happened: after seven hundred verses, God does not command. He hands the decision back. 'Do as you choose' — the Gita's deepest respect for human freedom. And then, because Arjuna is dear to him, Krishna leans in with the most intimate words of the entire dialogue:",
      },
      {
        type: 'verse',
        verse: {
          reference: '18.65',
          sanskrit:
            'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥',
          transliteration:
            "man-manā bhava mad-bhakto mad-yājī māṁ namaskuru\nmām evaiṣyasi satyaṁ te pratijāne priyo 'si me",
          meaning:
            'Fix your mind on me, be devoted to me, offer to me, bow to me — and you will come to me. I promise you truly, for you are dear to me.',
        },
      },
      {
        type: 'verse',
        verse: {
          reference: '18.66',
          sanskrit:
            'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
          transliteration:
            'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
          meaning:
            'Letting go of all dharmas, take refuge in me alone. I will free you from all faults — do not grieve.',
        },
      },
      {
        type: 'prose',
        text: "This is the charama-shloka — the final verse of the teaching, treasured by whole traditions as the Gita's last word: when every calculation of duty is exhausted, trust is the ground you land on. Arjuna's reply is the shortest and completest in the book: 'My delusion is destroyed; my memory is restored. I stand firm, my doubts gone. I will act by your word.' Far away, Sanjaya — who has been narrating everything to the blind king — closes the Gita with his own trembling verdict:",
      },
      {
        type: 'verse',
        verse: {
          reference: '18.78',
          sanskrit:
            'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥',
          transliteration:
            'yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama',
          meaning:
            'Where there is Krishna, the lord of yoga, and where there is Arjuna, the archer — there, surely, are fortune, victory, prosperity, and sound judgment. That is my conviction.',
        },
      },
      {
        type: 'teaching',
        text: "Chapter 18 leaves you with the Gita's three parting gifts. Freedom: 'reflect fully, then do as you choose' — wisdom invites, it never coerces. Refuge: when duty's arithmetic becomes impossible, surrender isn't defeat; it is landing on the ground that was always holding you. And partnership: Sanjaya's closing verse says victory lives where skill (Arjuna's bow) and spirit (Krishna's guidance) ride the same chariot. Effort without grace is exhausting; grace without effort is empty. Yoke them together, and — the Gita's final promise — do not grieve.",
      },
    ],
  },
];
