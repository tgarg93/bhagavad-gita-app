// Multi-part scriptures read in the Gita pattern: a collection (Ramayana,
// Principal Upanishads) is a set of ordered PARTS (kandas / individual
// Upanishads), each read as one paged-reader item — cover → narrative
// sections with cited key verses → reflection → celebration, exactly like a
// Gita chapter but via ContentReader (the shared reader), since these texts
// don't ship a full verse JSON the way the Gita does.
//
// One schema serves both collections. Part ids are GLOBALLY UNIQUE and
// permanent — the content ref is `scripture:<partId>` and completion keys on
// it. Citation discipline matches the rest of the app: famous loci only,
// every claim traced to a named text.
import { NarrativeSection, SourceNote } from './narrativeTypes';

export type ScriptureCollectionId = 'ramayana' | 'principal-upanishads';

export interface ScripturePart {
  id: string; // globally unique: 'bala-kanda', 'katha-upanishad'
  collection: ScriptureCollectionId;
  name: string;
  sanskritName?: string;
  subtitle: string;
  order: number; // position within its collection
  coverImage: number;
  sections: NarrativeSection[];
  reflectionQuestions: string[];
  sources: SourceNote[];
  // Jigyasu interstitials (optional; render on presence — see readerContent).
  kicker?: string;
  learnItems?: string[];
  bankedTakeaways?: string[];
  handoff?: string;
}

export interface ScriptureCollection {
  id: ScriptureCollectionId;
  title: string;
  sanskritName: string;
  blurb: string;
  coverImage: number;
  journeyModule: 1 | 2; // where its parts join the guided journey
  // The scripture-card id in expandedScriptures.ts that opens this collection
  cardId: string;
}

const GENERIC_COVER = require('../../assets/images/covers/generic-cover.jpg');
const RAMAYANA_COVER = require('../../assets/images/covers/ramayana-cover.png');
const MOKSHA_COVER = require('../../assets/images/covers/moksha-cover.png');
const SAMSARA_COVER = require('../../assets/images/covers/samsara-cover.png');
// Ramayana kanda covers — Modern Editorial Miniature (docs/dharma-illustration-spec.md).
const BALA_KANDA_COVER = require('../../assets/images/covers/bala-kanda-cover.jpg');
const AYODHYA_KANDA_COVER = require('../../assets/images/covers/ayodhya-kanda-cover.jpg');
const ARANYA_KANDA_COVER = require('../../assets/images/covers/aranya-kanda-cover.jpg');

export const COLLECTIONS: ScriptureCollection[] = [
  {
    id: 'ramayana',
    title: 'Ramayana',
    sanskritName: 'रामायण',
    blurb:
      'Valmiki’s epic of Rama — prince, exile, husband, king — told across seven kandas. Read one book at a time: the childhood, the exile, the abduction, the search, the leap, the war, and the long aftermath.',
    coverImage: RAMAYANA_COVER,
    journeyModule: 2,
    cardId: 'ramayana',
  },
  {
    id: 'principal-upanishads',
    title: 'Principal Upanishads',
    sanskritName: 'मुख्य उपनिषद्',
    blurb:
      'The philosophical summit of the Veda, one Upanishad at a time. Short texts, staggering claims: that the self you are and the reality behind everything are one. Start anywhere — each is complete in itself.',
    coverImage: MOKSHA_COVER,
    journeyModule: 1,
    cardId: 'upanishads-collection',
  },
];

export const getCollection = (id: ScriptureCollectionId): ScriptureCollection | undefined =>
  COLLECTIONS.find(c => c.id === id);

// The scripture-card id (from expandedScriptures) → collection it opens.
export const collectionForCardId = (cardId: string): ScriptureCollection | undefined =>
  COLLECTIONS.find(c => c.cardId === cardId);

// ---------------------------------------------------------------------------
// Ramayana — the seven kandas (Phase A ships Bala Kanda; B adds the rest)
// ---------------------------------------------------------------------------
const RAMAYANA_PARTS: ScripturePart[] = [
  {
    id: 'bala-kanda',
    collection: 'ramayana',
    name: 'Bala Kanda',
    sanskritName: 'बाल काण्ड',
    subtitle: 'The Book of Childhood: a poet’s question, a divine birth, and a bow that made a marriage',
    order: 1,
    coverImage: BALA_KANDA_COVER,
    kicker:
      'The epic opens with a question: can a truly good person exist? Rama is the answer, and this is where it begins.',
    handoff:
      'Rama has just won everything: a bride, his father’s blessing, and a kingdom waiting for him to inherit. In the next book, on the very morning he is to be crowned king, he loses all of it in a single conversation. That is the Ayodhya Kanda.',
    // Reworked July 2026 into a narrative reader: the actual story told faithfully with
    // character dialogue kept in (`»` speech blocks), inline word glosses, sparse
    // interpretation sections ('What this means'), two spaced MCQs at chapter breaks, and
    // two key-word term pages. Story sections carrying `»` must NOT also set
    // teachingText/keyVerse (they narrate out of visual order — see storyBeats.ts).
    sections: [
      {
        id: 'bala-preface',
        title: 'The Book of Childhood',
        storyText:
          'The **Ramayana** is one of India’s two great epics, and for millions of people it is the very first story they ever learn. It follows **Rama**, a prince of **Ayodhya (a kingdom in northern India)**, through a wedding, a sudden exile, the kidnapping of his wife, and a long war to win her back.\n\nThis first book is the **Bala Kanda (the Book of Childhood)**. It is the origin story: how the poem itself came to be written, how Rama came to be born at all, and the day he won his wife, **Sita**. We will follow the events as the poet Valmiki tells them, stopping now and then to notice what they mean.',
      },
      {
        id: 'bala-question',
        title: 'A poet’s question',
        openingVerse: {
          sanskrit: 'को न्वस्मिन्साम्प्रतं लोके गुणवान्कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥',
          transliteration:
            'ko nv asmin sāmprataṁ loke guṇavān kaśca vīryavān\ndharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ',
          meaning:
            'Who in this world today is truly good and truly strong — one who knows what is right, remembers every kindness, speaks only truth, and holds firm to his vows?',
          source: 'Valmiki Ramayana, Bala Kanda 1.2',
        },
        storyText:
          'The whole epic begins not with a battle but with a question. A poet named **Valmiki** asks a wandering sage named **Narada** whether a truly good person exists anywhere in the world:\n\n» Valmiki: Is there a man alive who is genuinely good, brave and truthful and kind all at once, and unshakable?\n\nNarada did not hesitate.\n\n» Narada: There is. His name is Rama, of the house of Ikshvaku.\n\nEverything that follows is the poem trying to show what that one name means once a real life has to carry it.',
        citation: 'Valmiki Ramayana, Bala Kanda 1 (the Narada Samvada)',
      },
      {
        id: 'bala-birthless-poem',
        title: 'How the poem was born',
        storyText:
          'Soon after, Valmiki was walking beside a river when a hunter shot down one of a pair of birds in the middle of their courtship. The surviving bird’s cry of grief cut straight through him, and to his own surprise his grief came back out of his mouth already shaped into rhythm, the first **shloka (a verse couplet)** ever spoken.\n\nThen the creator-god **Brahma** appeared before him:\n\n» Brahma: That meter came to you for a reason. Now use it. Tell the whole story of Rama.\n\nThe Sanskrit keeps the two words a breath apart: grief is *shoka*, and the verse it turned into is *shloka*.',
        citation: 'Valmiki Ramayana, Bala Kanda 2 (the shloka born of shoka)',
      },
      {
        id: 'bala-why-start',
        title: 'Why the story starts here',
        sectionHeader: 'What this means',
        teachingText:
          'It is worth pausing on how the epic opens. Not with a hero, but with a longing: someone asking out loud whether goodness this complete is even possible. And not with triumph, but with grief. The poem admits that its very first note came from refusing to look away from one small creature’s death. Before Rama lifts a finger, we have already been told what kind of story this is going to be.',
      },
      {
        id: 'bala-term-adikavya',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'आदि काव्य',
          transliteration: 'ādi kāvya',
          meaning: 'the first poem',
        },
        storyText:
          'Because of that morning by the river, the Ramayana is called the **Adi Kavya**, “the first poem”: not the oldest story ever told, but the first one composed as deliberate poetry, in the shloka meter that grief handed to Valmiki.',
        reappears:
          'Every verse you meet from here on is a **shloka** — the form born in that one moment of compassion.',
      },
      {
        id: 'bala-birth',
        title: 'A kingdom with no heir',
        storyText:
          'Far to the north, in **Ayodhya**, King **Dasharatha** had everything a ruler could want except the one thing he wanted most: a child. At last he performed the **putrakameshti (a great fire-sacrifice for a son)**, and out of the flames rose a shining figure holding a bowl of sacred **payasam (sweet rice pudding)** for his queens to share.\n\nAt that very moment, far away, the gods were desperate. A demon-king named **Ravana** had grown unstoppable, and they went to **Vishnu (the god who preserves the world)** for help:\n\n» The gods: Ravana torments all three worlds, and the boon he holds has made him deaf to any fear. Only you can end this.\n\n» Vishnu: Then I will go down myself, and be born as a man.\n\nSo when Dasharatha’s queens drank the payasam, it was Vishnu himself quietly entering the world. **Rama** was born, along with his three brothers.',
        citation: 'Valmiki Ramayana, Bala Kanda 15–18 (the boon of Ravana; the birth of Rama)',
      },
      {
        id: 'bala-blindspot',
        title: 'The crack in Ravana’s armor',
        sectionHeader: 'What this means',
        teachingText:
          'Here is the hinge the whole epic turns on. Ravana’s boon had made him untouchable by gods and demons, but in his pride he had never bothered to include humans on the list. Why fear something so small? That single blind spot is why God comes down through the one door left open, born as an ordinary man. Pride tends to guard against its equals and forget about the ordinary.',
        checks: [
          {
            id: 'chk:scripture:bala-blindspot',
            kind: 'mcq',
            prompt:
              'Ravana’s boon made him unkillable by gods and demons. So how could anyone ever defeat him?',
            options: [
              { text: 'In his pride he never bothered to fear humans, so a human could kill him', correct: true },
              { text: 'The boon quietly expired after a set number of years' },
              { text: 'The gods found a way to cancel the boon' },
            ],
            why: 'Ravana guarded against everything he respected and dismissed humans as beneath his notice. That one blind spot is exactly why Vishnu is born as the man Rama. His own pride wrote the loophole.',
          },
        ],
      },
      {
        id: 'bala-vishwamitra',
        title: 'The sage who came for the boys',
        storyText:
          'Years passed, and one day a fierce sage named **Vishwamitra** strode into the court with a demand no father wants to hear:\n\n» Vishwamitra: Demons are fouling my forest rituals. Send your son Rama to guard them.\n\n» Dasharatha: He is barely more than a boy. Take my whole army instead, take me, but not him.\n\n» Vishwamitra: It must be Rama. No one else.\n\nDasharatha had waited a lifetime for this son. But you do not refuse a sage like Vishwamitra, and so Rama and his brother **Lakshmana** walked into the forest. There the boy’s real education began: he faced down a demoness named **Tataka**, was taught to use celestial weapons, and stood guard over the sage’s fire.',
        citation: 'Valmiki Ramayana, Bala Kanda 25–48 (Tataka; the celestial weapons)',
      },
      {
        id: 'bala-ahalya',
        title: 'The woman made of stone',
        storyText:
          'On that same journey, they came upon a strange grey shape lying beside the path. It was **Ahalya**, a woman who, after a bitter scandal of blame, had been cursed to lie as a stone for years, unseen and unforgiven.\n\nRama simply stepped up to her and offered his respect, and the curse broke. She rose out of the stone and back into her life.',
        citation: 'Valmiki Ramayana, Bala Kanda 48–49 (Ahalya restored)',
      },
      {
        id: 'bala-drawn-out',
        title: 'Drawn out, not simply born great',
        sectionHeader: 'What this means',
        teachingText:
          'Two quiet things get set up in the forest. First, Rama’s greatness is never something he generates alone. It gets drawn out of him by teachers who ask more of him than his own parents dared, while his father’s hardest act of love is letting his cherished son walk toward danger.\n\nSecond, notice what the very first use of Rama’s power is, long before any war: he gives someone frozen by shame her life back. Hold onto that. His is the power that restores, not only the power that destroys.',
      },
      {
        id: 'bala-term-svayamvara',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'स्वयंवर',
          transliteration: 'svayaṁvara',
          meaning: 'a bride’s own choosing',
        },
        storyText:
          'A **svayamvara** is an old custom in which a bride chooses her own husband, often by way of a test the suitors must pass. The word means, literally, “self-choice.” Sita’s hand comes with a test almost no one can pass, which is how the story makes sure the right man is the one who wins her.',
        reappears:
          'Contests like this decide marriages across the epics — it is how a hero proves he is worthy of a queen.',
      },
      {
        id: 'bala-bow',
        title: 'The bow no one could lift',
        openingVerse: {
          sanskrit: 'तदा रामो महातेजाः सस्मारेश्वरकार्मुकम् ।\nबभञ्ज च नरश्रेष्ठो मध्ये वीर्यवतां वरः ॥',
          transliteration:
            'tadā rāmo mahātejāḥ sasmāreśvara-kārmukam\nbabhañja ca naraśreṣṭho madhye vīryavatāṁ varaḥ',
          meaning:
            'Then the radiant Rama, best of men, took up Shiva’s bow, and in the sight of all the mighty, bent it until it broke.',
          source: 'Valmiki Ramayana, Bala Kanda 67 (paraphrase of the bow-breaking)',
        },
        storyText:
          'In the kingdom of **Mithila**, King **Janaka** had set a single condition for his daughter’s marriage:\n\n» Janaka: Whoever can lift the great bow of the god Shiva, and string it, may marry my daughter Sita.\n\nThe bow was an heirloom so massive that grown kings had failed even to make it shift on its stand. And **Sita** herself was no ordinary bride. Years earlier, Janaka had found her as a baby lying in a furrow of a freshly plowed field, a daughter of the earth itself.\n\nRama walked up to the bow, lifted it as though it weighed nothing, and as he bent it to string, it snapped clean in two with a crack like thunder. Sita chose him. The weddings of all four brothers followed, and the Book of Childhood came to a close on a day of celebration.',
        citation: 'Valmiki Ramayana, Bala Kanda 66–73 (the bow of Shiva; the marriage of Sita)',
      },
      {
        id: 'bala-quiet-power',
        title: 'Strength that never performs',
        sectionHeader: 'What this means',
        teachingText:
          'Watch *how* Rama passes the test, not just that he passes it. There is no straining, no showing off. The strength is simply complete, and the whole thing is over in a moment. The epic will keep drawing him exactly this way: powerful without ever needing to prove it.\n\nAnd Sita, born of the earth, is matched to the one man who can lift what the earth’s own weight resists. The bond that the rest of this long story will tear apart and then slowly reunite is founded right here.',
        checks: [
          {
            id: 'chk:scripture:bala-quiet-power',
            kind: 'mcq',
            prompt:
              'Why does the epic make such a point of Rama stringing Shiva’s bow so easily, when grown kings could not even lift it?',
            options: [
              { text: 'To show his strength is quietly complete, and never has to perform', correct: true },
              { text: 'To show he had trained harder than the other suitors' },
              { text: 'To show the bow was lighter than everyone believed' },
            ],
            why: 'Rama lifts it “as though it weighed nothing.” The epic keeps painting his power this way: total, and completely unforced. Real strength here never needs to announce itself.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Dasharatha’s hardest act of love was letting his cherished son go where he could be tested. Where might holding on too tightly be keeping someone you love from growing?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Bala Kanda (Book 1), sargas 1–77' },
    ],
  },
  {
    id: 'ayodhya-kanda',
    collection: 'ramayana',
    name: 'Ayodhya Kanda',
    sanskritName: 'अयोध्या काण्ड',
    subtitle: 'The Book of Ayodhya: a coronation undone by two old promises, and a prince who bows to them',
    order: 2,
    coverImage: AYODHYA_KANDA_COVER,
    kicker:
      'The morning Rama was to be crowned, two forgotten promises took the kingdom away. Watch what he does with the loss.',
    handoff:
      'Three of them walk into the forest now, in bark and deerskin: Rama, Sita, and Lakshmana. What waits there is fourteen quiet years, and then a golden deer that changes everything. That is the Aranya Kanda.',
    sections: [
      {
        id: 'ayodhya-where',
        title: 'Where we are',
        storyText:
          'The Bala Kanda closed on a wedding: Rama had won **Sita**, and the four brothers of **Ayodhya** were married. Years have passed, and Rama has grown into the prince everyone hoped he would be. His old father is finally ready to hand him the crown.\n\nThis book is about the morning that was supposed to happen and did not. In a single conversation, Rama loses the throne, and we watch what a genuinely steady person does when everything is taken away.',
      },
      {
        id: 'ayodhya-eve',
        title: 'The night before the crown',
        storyText:
          'King **Dasharatha**, old and tired, named Rama his heir, and all of Ayodhya lit up for the coronation. But long ago the king had granted his youngest queen, **Kaikeyi**, two wishes she had never spent. Now her maid **Manthara** poured poison in her ear:\n\n» Manthara: Once Rama is king, you and your son are nothing. Spend your two wishes tonight, while you still can.\n\nSo on the eve of the crowning, Kaikeyi went to the king and named her price:\n\n» Kaikeyi: Give the throne not to Rama but to my son Bharata. And send Rama into the forest for fourteen years.\n\nDasharatha had given his word years ago, and a king’s word cannot be unsaid. He broke where he stood, undone not by an enemy but by his own old promise.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 7–13 (Manthara, Kaikeyi, and the two boons)',
      },
      {
        id: 'ayodhya-equanimity',
        title: 'The prince who did not flinch',
        storyText:
          'When they told Rama — no crown, fourteen years of exile instead — everyone watched his face for the collapse. It never came. The text is careful about this: the news of losing a kingdom moved him no more than the news of gaining it had.\n\nHe touched his father’s feet and went to calm his weeping mother, **Kaushalya**.\n\n» Rama: A son’s whole duty is to make his father’s word come true, whatever it costs the son. I am going gladly.\n\nHis calm frightened people more than anger would have.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 18–19 (Rama receives the news)',
        citationLink: 'deity:rama',
      },
      {
        id: 'ayodhya-equanimity-note',
        title: 'The same face for gain and loss',
        sectionHeader: 'What this means',
        teachingText:
          'This is the Gita’s great idea shown as a story, long before the Gita ever spelled it out: Rama meets gain and loss with the same face. He is not hiding his grief so much as refusing to let the outcome own him. The throne was never the thing he was living for, so losing it cannot unmake him.',
        checks: [
          {
            id: 'chk:scripture:ayodhya-equanimity',
            kind: 'mcq',
            prompt:
              'How did Rama react when he was told the crown was gone and he must live in the forest for fourteen years?',
            options: [
              { text: 'With the same calm he would have met the crown, and he set out to honor his father’s word', correct: true },
              { text: 'He raised an army and refused to go' },
              { text: 'He blamed Bharata and demanded the throne back' },
            ],
            why: 'The text says the loss moved him no more than the gain would have. The throne was never what he lived for, so losing it could not unmake him. That steadiness is the Gita’s equanimity, shown as story.',
          },
        ],
      },
      {
        id: 'ayodhya-term-dharma',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'धर्म',
          transliteration: 'dharma',
          meaning: 'duty; the right thing to do',
        },
        storyText:
          'Rama’s whole choice here turns on one word: **dharma**. It means the right thing to do — your duty, what is owed. Rama’s dharma as a son is to honor his father’s word, and he holds to it even when it costs him a kingdom.',
        reappears:
          'Dharma is the question the whole Ramayana keeps asking. You will watch Rama pay for his again and again.',
        deeper: { ref: 'concept:dharma', label: 'dharma' },
      },
      {
        id: 'ayodhya-companions',
        title: 'Two who would not stay behind',
        storyText:
          'Rama meant to go into the forest alone. **Sita** would not hear of it:\n\n» Sita: A wife’s place is beside her husband. A palace without you is the real wilderness; the forest with you is home.\n\nHis brother **Lakshmana** refused too, and took up his bow to serve Rama through every one of the fourteen years. Rama argued — the forest is danger, hardship, snakes and demons — and it only made them more certain. So three of them walked out of Ayodhya in bark and deerskin, where a king should have ridden out in gold, and the whole city followed them weeping to the river’s edge.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 26–31 (Sita and Lakshmana insist on the exile)',
      },
      {
        id: 'ayodhya-love-note',
        title: 'Love measured by what it walks into',
        sectionHeader: 'What this means',
        teachingText:
          'Sita and Lakshmana quietly change what the exile even is. What was meant as Rama’s punishment becomes their chosen loyalty. The epic’s picture of love is not staying comfortable together; it is refusing to let the person you love suffer alone. Here, devotion is measured by exactly what it is willing to walk into.',
      },
      {
        id: 'ayodhya-sandals',
        title: 'The sandals on the throne',
        storyText:
          '**Dasharatha** died of grief within days. **Bharata**, the son the throne was stolen for, had been away through all of it. He came home to find his father dead and his brother banished in his name, and he was horrified. He refused the crown completely and marched to the forest to bring Rama back.\n\n» Bharata: The throne is yours. Come home and rule. I will not touch what was taken from you.\n\n» Rama: Our father gave his word, and it must stand. Go back and hold the kingdom until my fourteen years are done.\n\nSo Bharata took Rama’s **sandals**, carried them home, and set them on the throne. For fourteen years he ruled not as king but as a caretaker for his brother’s footwear, living like a hermit outside the capital.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 100–115 (Bharata and the sandals)',
      },
      {
        id: 'ayodhya-power-note',
        title: 'Power refused',
        sectionHeader: 'What this means',
        teachingText:
          'Bharata is the epic’s portrait of power turned down. Handed a whole kingdom, he wants none of it that is not rightfully his brother’s, and he turns the throne into a seat of waiting. The sandals become the Ramayana’s emblem of authority held in trust: leadership as service to an absent, rightful claim, not a prize grabbed because it happened to be offered.',
        checks: [
          {
            id: 'chk:scripture:ayodhya-bharata',
            kind: 'mcq',
            prompt: 'Bharata came home to a throne his mother had won for him. What did he do with it?',
            options: [
              { text: 'Refused it, and ruled only as a caretaker for Rama’s sandals until Rama returned', correct: true },
              { text: 'Took it and kept it for himself' },
              { text: 'Split the kingdom in half with Rama' },
            ],
            why: 'Bharata wanted no throne that was not rightfully his brother’s. He set Rama’s sandals on the seat and governed as a regent for them, living like an ascetic. Power offered, and power refused.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Rama met the loss of a kingdom with the same face he’d have given the crown. Where in your life is a gain or loss owning your mood more than it should?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Ayodhya Kanda (Book 2)' },
    ],
  },
  {
    id: 'aranya-kanda',
    collection: 'ramayana',
    name: 'Aranya Kanda',
    sanskritName: 'अरण्य काण्ड',
    subtitle: 'The Book of the Forest: a golden deer, a drawn line, and the abduction that starts a war',
    order: 3,
    coverImage: ARANYA_KANDA_COVER,
    kicker:
      'Fourteen quiet years in the forest, and then the one temptation it had been saving. This is where the war begins.',
    handoff:
      'Sita is gone, carried south to the island of Lanka, and a dying vulture has given Rama his only clue. To follow it he needs an army he does not have, and he will find it among the broken. That is the Kishkindha Kanda.',
    sections: [
      {
        id: 'aranya-where',
        title: 'Where we are',
        storyText:
          'Rama, Sita, and Lakshmana have spent years deep in the forest now, moving among the huts of the sages. It has been a long, quiet exile.\n\nThis book is where the quiet ends: a wounded pride far to the south, a temptation too lovely to doubt, and the moment Sita is carried off, which turns a family’s exile into a war.',
      },
      {
        id: 'aranya-forest',
        title: 'Years among the sages',
        storyText:
          'For over a decade the three lived among the forest hermits, who begged Rama for protection from the **rakshasas (demons)** that hunted them. Rama gave his word to clear the forest of them, and kept it, until word of this reached the demon-city of Lanka.\n\nIt began, as these things do, with an insult. A demoness named **Surpanakha**, sister of the demon-king **Ravana**, saw Rama and wanted him. When he turned her away, and Lakshmana too, she lunged at Sita in a rage. Lakshmana cut off her nose and ears, and she fled shrieking to her brother.',
        citation: 'Valmiki Ramayana, Aranya Kanda 17–18 (Surpanakha)',
      },
      {
        id: 'aranya-war-note',
        title: 'How a war begins',
        sectionHeader: 'What this means',
        teachingText:
          'The war that ends the epic starts with a small cruelty and a fair response that pride cannot accept. Surpanakha’s humiliation is real. But her brother’s reaction turns a wound to his family’s vanity into a cosmic war. The Ramayana watches closely how an injury to the ego swells out of all proportion when power refuses to simply absorb it.',
      },
      {
        id: 'aranya-dharma-embodied',
        title: 'Even his enemies knew what he was',
        openingVerse: {
          sanskrit: 'रामो विग्रहवान्धर्मः साधुः सत्यपराक्रमः ।\nराजा सर्वस्य लोकस्य देवानामिव वासवः ॥',
          transliteration:
            'rāmo vigrahavān dharmaḥ sādhuḥ satya-parākramaḥ\nrājā sarvasya lokasya devānām iva vāsavaḥ',
          meaning:
            'Rama is dharma itself given a body — virtuous, true in valor; king of all the world as Indra is king of the gods.',
          source: 'Valmiki Ramayana, Aranya Kanda 37.13',
        },
        storyText:
          'Inflamed by his sister and by tales of Sita’s beauty, Ravana went to a demon named **Maricha** with a plan to steal her. Maricha had felt Rama’s arrow once and survived, and he tried to talk his king out of it:\n\n» Maricha: Listen to me. Rama is not just a strong man. He is dharma itself walking in a body. To move against him is to move against the order of the world. It will be the end of us.\n\nRavana would not hear it. Maricha decided that fear of his own furious king was worse than fear of Rama, and agreed to help, knowing it would kill him.',
        citation: 'Valmiki Ramayana, Aranya Kanda 37 (Maricha warns Ravana)',
        citationLink: 'deity:rama',
      },
      {
        id: 'aranya-enemy-note',
        title: 'The truth from the enemy’s mouth',
        sectionHeader: 'What this means',
        teachingText:
          'Notice where the epic’s deepest praise of its hero comes from: the very demon sent to destroy him. The Ramayana lets a rakshasa be the one to name Rama dharma embodied. And it shows tyranny’s oldest move — silencing the advisor who tells you the truth, because the truth is inconvenient.',
        checks: [
          {
            id: 'chk:scripture:aranya-maricha',
            kind: 'mcq',
            prompt:
              'The demon Maricha, sent to help trap Rama, warned Ravana with something surprising. What did he say about Rama?',
            options: [
              { text: 'That Rama is dharma itself given a body, and moving against him is the end of them', correct: true },
              { text: 'That Rama was weaker than the stories claimed' },
              { text: 'That Rama could be bought off with treasure' },
            ],
            why: 'The epic lets its deepest praise fall from an enemy’s mouth. Maricha, of all people, names Rama dharma embodied — and Ravana silences the warning because it is inconvenient, which is what tyranny always does.',
          },
        ],
      },
      {
        id: 'aranya-term-maya',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'माया',
          transliteration: 'māyā',
          meaning: 'illusion; a magical disguise',
        },
        storyText:
          'What Maricha does next is pure **maya** — illusion, a magical disguise. He becomes a deer of gold and silver, beautiful enough that no one would doubt it is real. In the epics, maya is exactly this: something that looks completely real and is not, set in your path to pull you where someone wants you to go.',
        reappears:
          'You have met this word before as a whole idea: the world read wrong, the mirage taken for water.',
        deeper: { ref: 'concept:maya', label: 'maya' },
      },
      {
        id: 'aranya-golden-deer',
        title: 'The deer that was too beautiful',
        storyText:
          '**Maricha** became a deer of gold dappled with silver, and grazed near the hut until Sita longed for it. Rama went to catch it, warning Lakshmana to guard her. When Rama’s arrow finally struck it, the dying deer cried out in Rama’s own voice:\n\n» The deer: Sita! Lakshmana! Help me!\n\nSita, terrified, drove Lakshmana to go after Rama, though he knew it was a trap. Before he left, he drew a line around the hut:\n\n» Lakshmana: Do not cross this line, whatever happens, and you will be safe.\n\nThen **Ravana** came, disguised as a wandering holy beggar, and with a beggar’s plea coaxed her across the line. He seized her and flew south for Lanka.',
        citation: 'Valmiki Ramayana, Aranya Kanda 42–49 (the golden deer and the abduction)',
      },
      {
        id: 'aranya-evil-note',
        title: 'How evil actually works',
        sectionHeader: 'What this means',
        teachingText:
          'The abduction needs three things and gets all three: a desire too lovely to doubt, a cry that turns love itself into a weapon, and a good deed — kindness to a holy man — twisted into the trap. Evil in the Ramayana rarely breaks down the gate. It wears something you were right to want and something you were right to honor, and it waits for you to step across your own line.',
      },
      {
        id: 'aranya-jatayu',
        title: 'The old bird who fought a king',
        storyText:
          'As Ravana carried Sita south through the sky, an aged vulture-king named **Jatayu**, an old friend of Dasharatha, heard her cries and rose to stop him. It was hopeless, one old bird against the lord of the demons. Jatayu fought anyway, tore Ravana’s chariot apart and wounded him, and was cut down for it, his wings severed, left dying on the ground.\n\nHe held on just long enough for Rama to find him.\n\n» Jatayu: South. He took her south, to Lanka. I could not stop him, but I saw.\n\nThen he died, and Rama cremated him with the honors owed to a father.',
        citation: 'Valmiki Ramayana, Aranya Kanda 50–68 (Jatayu’s stand and death)',
      },
      {
        id: 'aranya-fight-note',
        title: 'The fight you cannot win',
        sectionHeader: 'What this means',
        teachingText:
          'Jatayu had no chance and rose anyway. The Ramayana honors the fight you cannot win when it is the fight your dharma asks of you. His failure is not really failure, because the one true thing an old bird could still do — tell Rama which way Sita was taken — is exactly what he stayed alive to give. Some duties are measured not by whether you win, but by whether you got up.',
        checks: [
          {
            id: 'chk:scripture:aranya-abduction',
            kind: 'mcq',
            prompt: 'Ravana never broke into Rama’s hut. How did he get Sita out from its protection?',
            options: [
              { text: 'A golden deer, a cry in Rama’s voice, and a holy beggar’s plea, until she stepped across the line herself', correct: true },
              { text: 'He waited until she was asleep and carried her off' },
              { text: 'He fought past Lakshmana at the door' },
            ],
            why: 'Evil here does not storm the gate. It uses a thing you were right to want (the deer), a cry that weaponizes love, and a good deed turned into a trap (alms to a holy man), and waits for you to cross your own line.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Sita was lured across a line of safety by a desire that seemed lovely and a plea that seemed holy. What “golden deer” has recently pulled at you — and what line did it ask you to cross?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Aranya Kanda (Book 3)' },
    ],
  },
  {
    id: 'kishkindha-kanda',
    collection: 'ramayana',
    name: 'Kishkindha Kanda',
    sanskritName: 'किष्किन्धा काण्ड',
    subtitle: 'The Book of Kishkindha: an alliance of the broken, and a strength that had to be remembered',
    order: 4,
    coverImage: RAMAYANA_COVER,
    kicker:
      'Rama has no army, only grief. Watch him build a war out of others as broken as he is.',
    handoff:
      'One vanara now carries the whole hope of the search on his shoulders, and an ocean stands in his way. As Jambavan reminds him what he is, Hanuman begins to grow. That is the Sundara Kanda.',
    sections: [
      {
        id: 'kishkindha-where',
        title: 'Where we are',
        storyText:
          'Rama has one thing to go on: a dying vulture’s word that Sita was carried **south**, to the island of **Lanka**. He has no army and no allies, only his brother Lakshmana and his grief.\n\nThis book is where he starts to build a war, and he builds it out of others as broken as he is.',
      },
      {
        id: 'kishkindha-meeting',
        title: 'Two exiled kings meet',
        storyText:
          'Searching south, Rama and Lakshmana reached **Kishkindha**, kingdom of the **vanaras (the forest people, a race of monkeys)**. There they met **Hanuman**, wisest of them, minister to a deposed monkey-king named **Sugriva**. Hanuman brought them to Sugriva, himself an exile: his own brother **Vali** had driven him out and taken his wife.\n\nTwo dispossessed kings recognized each other, and over a sacred fire they swore an alliance:\n\n» Rama: Win me back Sita, and I will win you back your throne.\n\n» Sugriva: Kill Vali and set me back in Kishkindha, and every vanara I have will search the earth for your wife.\n\nGrief made them allies before anything else did.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 4–5 (Rama and Sugriva’s pact)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'kishkindha-broken-note',
        title: 'An army of the broken',
        sectionHeader: 'What this means',
        teachingText:
          'Rama does not arrive at the war with an army. He builds one out of the equally broken. The alliance with Sugriva is founded on shared loss, not on strength — the epic’s quiet claim that people who have been dispossessed understand one another, and that help most often comes from the ones who also need it.',
      },
      {
        id: 'kishkindha-term-vanara',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'वानर',
          transliteration: 'vānara',
          meaning: 'the forest people; a race of monkeys',
        },
        storyText:
          'The **vanaras** are the forest people, a race of monkeys with speech, kings, and cities of their own. They carry the whole middle of the epic: it is a vanara, Hanuman, who finds Sita, and a vanara army that builds the bridge to Lanka.',
        reappears:
          'Keep an eye on Hanuman. The quietest one in the room turns out to be the one the whole story leans on.',
      },
      {
        id: 'kishkindha-vali',
        title: 'The arrow from hiding',
        storyText:
          'To keep his side of the pact, Rama had to defeat **Vali** — and Vali was the stronger of the two. When Sugriva challenged his brother to a fight, Rama shot Vali from hiding. The dying Vali was bitter:\n\n» Vali: Is this dharma? You are called the most righteous of princes, and you kill a man from concealment while he fights another?\n\n» Rama: You seized your brother’s wife and ruled by force. Justice was owed, and a king’s justice does not always come from the front.\n\nThe tradition has argued over this killing ever since. The Ramayana does not tidy it away.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 16–18 (the killing of Vali)',
      },
      {
        id: 'kishkindha-vali-note',
        title: 'The killing readers still argue about',
        sectionHeader: 'What this means',
        teachingText:
          'Here the epic lets its hero do a troubling thing, and lets the victim say so out loud. Rama is dharma embodied, and he still acts in a way people have argued about for two thousand years. That is the Ramayana’s kind of honesty: it keeps the discomfort in the story instead of smoothing it over. You are allowed to sit with the question.',
        checks: [
          {
            id: 'chk:scripture:kishkindha-vali',
            kind: 'mcq',
            prompt:
              'Rama killed Vali with an arrow from hiding, and the dying Vali called it unfair. How does the epic handle that moment?',
            options: [
              { text: 'It leaves the discomfort in: Vali’s objection is spoken, and the killing has been debated ever since', correct: true },
              { text: 'It shows Rama was plainly right and Vali plainly wrong' },
              { text: 'It leaves the killing out of the story' },
            ],
            why: 'The Ramayana lets its hero do a hard thing and lets the victim voice the objection, unanswered to everyone’s full satisfaction. Its honesty is that it preserves the discomfort rather than erasing it.',
          },
        ],
      },
      {
        id: 'kishkindha-forgetting',
        title: 'The strength he had forgotten',
        storyText:
          'With Sugriva restored to his throne, the vanaras spread across the world to search. The southern party reached the edge of the ocean and lost heart: a hundred **yojanas** of sea lay between them and Lanka, and no one could cross it.\n\nThen old **Jambavan**, the wise bear-king, turned to **Hanuman**, who had sat silent the whole time, and reminded him of what a boyhood curse had made him forget:\n\n» Jambavan: You are the son of the wind. No distance can hold you. You have simply forgotten what you are.\n\nAs Jambavan spoke, Hanuman began to grow.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 65–66 (Jambavan reminds Hanuman)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'kishkindha-forgetting-note',
        title: 'Most of what stops us is forgetting',
        sectionHeader: 'What this means',
        teachingText:
          'The epic’s most beloved figure spends most of it not knowing what he can do. Hanuman does not lack the strength to cross the ocean; he lacks the memory of it, until a friend says plainly what he is. The Ramayana suggests that much of what stops us is not weakness but forgetting — and that the great service one person does another is to remind them who they are.',
        checks: [
          {
            id: 'chk:scripture:kishkindha-hanuman',
            kind: 'mcq',
            prompt:
              'The vanaras reached the ocean and despaired. What was actually stopping Hanuman from leaping across it?',
            options: [
              { text: 'Not a lack of strength, but that he had forgotten he had it', correct: true },
              { text: 'The ocean was simply too wide for anyone' },
              { text: 'He was too afraid of Ravana to try' },
            ],
            why: 'Hanuman had the power all along; a boyhood curse had made him forget it. Jambavan’s gift was not strength but the memory of strength. Much of what stops us is forgetting, not weakness.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Jambavan’s gift to Hanuman was not strength but the reminder of strength he already had. Who might be waiting for you to remind them of what they are — and who could remind you?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Kishkindha Kanda (Book 4)' },
    ],
  },
  {
    id: 'sundara-kanda',
    collection: 'ramayana',
    name: 'Sundara Kanda',
    sanskritName: 'सुन्दर काण्ड',
    subtitle: 'The Beautiful Book: one devotee’s leap, and the hope he carried across an ocean',
    order: 5,
    coverImage: RAMAYANA_COVER,
    kicker:
      'The most beloved book in the epic, and its hero is not Rama or Ravana. It is a servant on an errand.',
    handoff:
      'Now Rama comes with his army to the sea’s edge, and the last book begins: the bridge across the water, the war for Lanka, and the long way home. That is the Yuddha Kanda.',
    sections: [
      {
        id: 'sundara-where',
        title: 'Where we are',
        storyText:
          'Reminded of who he is, **Hanuman** has grown vast. Now he will do alone what a whole army could not: cross the ocean to **Lanka** to find **Sita**.\n\nThis is the book the tradition loves most and recites most often — the **Sundara Kanda**, the Beautiful Book. Its beauty is that its hero is not Rama or Ravana, but a servant carrying out an errand for someone he loves.',
      },
      {
        id: 'sundara-leap',
        title: 'The leap across the sea',
        storyText:
          'Hanuman climbed a mountain, pressed it flat beneath his feet, and hurled his body across a hundred yojanas of open ocean toward Lanka. The sea sent up monsters and mountains to test him along the way, and he passed each one — bursting through one, honoring another, outwitting a third. Alone, unaided, he crossed what an army could not.',
        citation: 'Valmiki Ramayana, Sundara Kanda 1 (the crossing)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'sundara-beautiful-note',
        title: 'Why the Beautiful Book is about a servant',
        sectionHeader: 'What this means',
        teachingText:
          'The most celebrated book of the whole Ramayana centers not on the hero or the villain but on a servant running an errand. Its beauty, the tradition says, is exactly that: devotion in motion, a mind so fixed on the work of the one it loves that an ocean becomes a single step. Greatness here is not rank. It is wholehearted service.',
      },
      {
        id: 'sundara-term-bhakti',
        kind: 'term',
        title: 'Key word',
        keyVerse: {
          sanskrit: 'भक्ति',
          transliteration: 'bhakti',
          meaning: 'loving devotion',
        },
        storyText:
          'What carries Hanuman across the sea is **bhakti** — loving devotion. Not duty done grudgingly, but love so complete that the hardest task feels light. Hanuman is the tradition’s clearest picture of it: the servant whose devotion makes him greater than kings.',
        reappears:
          'Bhakti is one of the great paths to the divine. You will meet it again as a whole way of living.',
      },
      {
        id: 'sundara-ashoka',
        title: 'Sita in the grove',
        storyText:
          'Shrunk now to the size of a cat, Hanuman searched Ravana’s city all night, and found Sita at last in the **Ashoka grove** — thin with grief, ringed by demon-guards, refusing Ravana’s threats and pleas alike, choosing death over dishonor. From the trees, Hanuman let **Rama’s ring** fall into her lap. She wept to know Rama was alive and coming.\n\nHanuman offered to carry her home himself, that instant, on his shoulders.\n\n» Sita: No. Rama must come himself and win me back, so that his honor and mine both stand whole. Carry him my message, not me.\n\nHe took her jewel and her words instead.',
        citation: 'Valmiki Ramayana, Sundara Kanda 36–39 (Hanuman finds Sita)',
      },
      {
        id: 'sundara-captive-note',
        title: 'The captive who cannot be bent',
        sectionHeader: 'What this means',
        teachingText:
          'Sita in the grove is not a prize waiting to be collected. She is a will that Ravana cannot bend and that even her rescuer cannot override. Her refusal of the easy escape — insisting that Rama come himself — is her own claim on her dignity: she will be won back rightly, or not at all. The Ramayana’s captive is its most unbreakable character.',
        checks: [
          {
            id: 'chk:scripture:sundara-sita',
            kind: 'mcq',
            prompt:
              'Hanuman offered to carry Sita out of Lanka on his shoulders that very moment. Why did she refuse?',
            options: [
              { text: 'She insisted Rama come and win her back himself, so his honor and hers both stood whole', correct: true },
              { text: 'She was afraid of Hanuman’s size' },
              { text: 'She had come to prefer her life in Lanka' },
            ],
            why: 'Sita is not a prize to be collected; she is a will of her own. Refusing the quick escape is her claim on her dignity — she will be won back rightly or not at all.',
          },
        ],
      },
      {
        id: 'sundara-burning',
        title: 'The tail that lit a city',
        storyText:
          'To take Ravana’s measure before he left, Hanuman let himself be captured and hauled before the throne. Ravana ordered him killed, but his own brother **Vibhishana** stopped it:\n\n» Vibhishana: You cannot kill a messenger. It is against all law.\n\nSo instead they wrapped Hanuman’s tail in cloth and set it alight to shame him. It was a mistake. Hanuman slipped his bonds and, leaping roof to roof with his burning tail, set **Lanka** ablaze — a warning written in fire across the demon-king’s own capital. Then he quenched the flame in the sea and leapt home to lay Sita’s jewel in Rama’s hands.',
        citation: 'Valmiki Ramayana, Sundara Kanda 51–55 (the burning of Lanka)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'sundara-pride-note',
        title: 'Pride arranging its own downfall',
        sectionHeader: 'What this means',
        teachingText:
          'The punishment meant to humiliate Hanuman becomes the instrument of Ravana’s own warning. The Ramayana keeps showing pride arrange its own downfall: the fire lit to mock a servant announces, in letters no one in Lanka can miss, that the reckoning has already crossed the sea.',
        checks: [
          {
            id: 'chk:scripture:sundara-mission',
            kind: 'mcq',
            prompt: 'What did Hanuman actually accomplish on his errand to Lanka?',
            options: [
              { text: 'He found Sita, gave her Rama’s ring, and left the city burning as a warning', correct: true },
              { text: 'He rescued Sita and carried her home himself' },
              { text: 'He killed Ravana in single combat' },
            ],
            why: 'Hanuman’s job was to find Sita, not free her — Sita herself insisted Rama come. He confirmed she lived, gave her Rama’s ring, and left Lanka in flames as a promise of what was coming.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Sita refused the easy rescue so that things would be set right fully, not just quickly. Where are you tempted by the quick escape when the whole and honest resolution asks more of you?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Sundara Kanda (Book 5)' },
    ],
  },
  {
    id: 'yuddha-kanda',
    collection: 'ramayana',
    name: 'Yuddha Kanda',
    sanskritName: 'युद्ध काण्ड',
    subtitle: 'The Book of War — a bridge, a fall, and a homecoming fourteen years in the making',
    order: 6,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'yuddha-refuge',
        title: 'The enemy who changed sides',
        storyText:
          'As war neared, Ravana’s own brother Vibhishana counseled him to return Sita and be spared; Ravana spurned and exiled him. Vibhishana crossed to Rama’s camp and asked for refuge. Some advisors warned it was a trap. Rama overruled them with a vow that defines him: whoever comes to me even once seeking shelter, saying “I am yours,” I will protect against all beings — this is my unbreakable rule. He granted refuge, and promised Vibhishana the throne of Lanka whatever the war’s outcome.',
        sectionHeader: 'What this teaches',
        teachingText:
          'At the edge of the decisive war, Rama’s defining act is not martial but merciful: refuge given to the enemy’s brother, against his own advisors’ fear. The Ramayana makes sharanagati — the absolute protection of one who surrenders — the deepest expression of dharma, higher than caution, higher even than winning.',
        citation: 'Valmiki Ramayana, Yuddha Kanda 17–18 (Vibhishana’s refuge)',
        citationLink: 'deity:rama',
      },
      {
        id: 'yuddha-bridge',
        title: 'The bridge of stones',
        storyText:
          'The ocean barred the way. Rama sat in appeal to the sea itself for three days; when it would not answer, he took up his bow in wrath, and the sea-god appeared and yielded a plan: let the vanaras build. So the monkey-army raised a causeway of boulders and trees across the water to Lanka — the Setu — stone by stone, each name-inscribed rock floating where it should have sunk. Across it the army poured, and the siege of Lanka began.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The bridge is the epic’s image of the impossible made passable by many hands. What one crossing (Hanuman’s leap) did by singular power, the army does by collective labor — and the war is won not by a lone hero but by the patient, unglamorous work of countless ordinary hands laying one stone at a time.',
        citation: 'Valmiki Ramayana, Yuddha Kanda 22 (the building of the bridge)',
      },
      {
        id: 'yuddha-ravana',
        title: 'The fall of Ravana',
        storyText:
          'The war was long and terrible. Rama’s ally Sugriva, his brother Lakshmana struck down and revived by a Himalayan herb Hanuman carried mountain and all, the demon-ranks falling one by one — until only Ravana remained. Rama and Ravana faced each other at last. Ravana’s heads grew back as fast as they were cut, until Rama loosed the divine weapon given by the sages, and it found the demon-king’s heart. Ten-headed Ravana — scholar, devotee, tyrant — fell, and the tradition, remarkably, has Rama order him honored in death: a great one has died, and enmity ends at the pyre.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Ravana is no cartoon: a brilliant scholar and Shiva-devotee undone by a single ungoverned appetite. The Ramayana kills him and then honors him, insisting that enmity is a thing of the living and that greatness gone wrong is still greatness mourned. Evil here is not the absence of gifts but gifts unmoored from restraint.',
        citation: 'Valmiki Ramayana, Yuddha Kanda 108–111 (the death of Ravana)',
      },
      {
        id: 'yuddha-return',
        title: 'The lamps of the homecoming',
        storyText:
          'Sita was recovered — after an ordeal by fire that the epic records unflinchingly, a test of her purity that the tradition has questioned ever since. Vibhishana was crowned in Lanka. And with the fourteen years exactly spent, Rama, Sita, and Lakshmana flew home to Ayodhya, where Bharata was waiting with the sandals and the whole city, told they were coming, lit every lamp it had to guide them in. That night of lamps for a homecoming is the night the tradition still keeps as Diwali.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The exile ends not in triumph but in return — to family, to the waiting brother, to a city that kept its light burning. The Ramayana’s deepest reward is not the throne regained but the coming home; and the lamps of Ayodhya became a festival because the tradition understood that the return of the good is worth illuminating the whole world for.',
        citation: 'Valmiki Ramayana, Yuddha Kanda 116–131 (the return to Ayodhya); Diwali: living tradition',
        citationLink: 'festival:diwali-2025',
      },
    ],
    reflectionQuestions: [
      'Rama honored Ravana at his pyre — a great life ruined by one ungoverned appetite. Which single appetite, left unchecked, could most undo the good you have built?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Yuddha Kanda (Book 6)' },
    ],
  },
  {
    id: 'uttara-kanda',
    collection: 'ramayana',
    name: 'Uttara Kanda',
    sanskritName: 'उत्तर काण्ड',
    subtitle: 'The Final Book — the hard aftermath of victory, and a queen who returns to the earth',
    order: 7,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'uttara-ramarajya',
        title: 'The reign everyone longed for',
        storyText:
          'Rama’s rule became the byword the tradition never let go of: Ram Rajya, the kingdom where dharma stands whole. The rains came on time, the earth gave freely, no parent buried a child, no one lied or lacked. For a while the Uttara Kanda lets the ideal simply exist — a realm ordered so justly that later reformers, Gandhi among them, invoked "Ram Rajya" as the name of the society still worth building.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Ramayana pauses on the reward: a whole society at peace because its ruler holds himself to the strictest account. Ram Rajya endures as an ideal precisely because it locates good governance not in power or wealth but in a leader’s unbending fidelity to dharma — and it is against that very standard that the book’s tragedy will measure Rama himself.',
        citation: 'Valmiki Ramayana, Uttara Kanda (the reign of Rama)',
      },
      {
        id: 'uttara-banishment',
        title: 'The cost of a king’s good name',
        storyText:
          'Then the epic turns bleak. A washerman’s gossip questioned whether a queen who had lived in Ravana’s city could be pure, and the whisper spread. Rama — the king whose one duty was to be above reproach in his people’s eyes — banished the pregnant, innocent Sita to the forest to protect the throne’s good name. It is the Ramayana’s most painful passage, and the text does not excuse it: the perfect man commits, by the logic of a king’s reputation, a deep injustice against the person most loyal to him.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The Uttara Kanda refuses to let its hero off. Having shown Rama as dharma embodied, it shows dharma’s duties colliding — the king’s to his people’s trust against the husband’s to his innocent wife — and lets Rama choose in a way that has troubled and angered readers for centuries. The epic’s honesty is that it records the wound instead of resolving it.',
        citation: 'Valmiki Ramayana, Uttara Kanda (the banishment of Sita)',
      },
      {
        id: 'uttara-sons',
        title: 'The twins who sang his story',
        storyText:
          'Sita took refuge in the hermitage of Valmiki — the poet himself — and there bore twin sons, Lava and Kusha. Valmiki taught the boys the Ramayana he had composed, and years later they sang it, unknowing, before Rama’s own court. Rama recognized his sons in their faces and the truth in their song. He sent for Sita, asking her to prove her purity once more before the assembly so he could take her back.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The poem folds back on itself: Rama’s own children learn his life as a song from the poet who wrote it, and carry it back to him. The Ramayana becomes a story about the power of its own telling — that a life recounted truthfully returns to teach even the one who lived it.',
        citation: 'Valmiki Ramayana, Uttara Kanda (Lava, Kusha, and the recital)',
      },
      {
        id: 'uttara-earth',
        title: 'The daughter of the earth goes home',
        storyText:
          'Sita had had enough of tests. Asked to prove herself a final time, she made a different answer. If I have been true, she said, let my mother the earth receive me — for she had been born of a furrow, the ground’s own daughter. The earth opened, a throne rose, and Sita descended into it and was gone, beyond any court’s judgment forever. Rama ruled on, bereft, until his own time came and he too laid down the human life, and the story closed.',
        sectionHeader: 'Why it matters',
        teachingText:
          'Sita’s last act is refusal dressed as return: she will not be tested again, and she takes herself beyond the reach of a world that keeps demanding she prove her worth. The Ramayana ends not in tidy reunion but in loss the hero cannot undo — the tradition’s acknowledgment that even a life lived by dharma does not escape sorrow, and that the earth’s own daughter answered injustice by going home.',
        citation: 'Valmiki Ramayana, Uttara Kanda (Sita returns to the earth)',
      },
    ],
    reflectionQuestions: [
      'Sita refused to keep proving herself to a world that kept demanding it. Where are you exhausting yourself proving your worth to people whose doubt is not yours to fix?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Uttara Kanda (Book 7)' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Principal Upanishads — Core 6 (Phase A ships Katha; C adds the rest)
// ---------------------------------------------------------------------------
const UPANISHAD_PARTS: ScripturePart[] = [
  {
    id: 'katha-upanishad',
    collection: 'principal-upanishads',
    name: 'Katha Upanishad',
    sanskritName: 'कठोपनिषद्',
    subtitle: 'A boy, the god of death, and the question no one else would answer',
    order: 3,
    coverImage: SAMSARA_COVER,
    sections: [
      {
        id: 'katha-frame',
        title: 'Given away to Death',
        storyText:
          'The Katha Upanishad hangs its entire philosophy on a story. A boy named Nachiketa, watching his father give away worthless cattle at a sacrifice, needles him — “to whom will you give me?” — until the exasperated father snaps, “To Death I give you.” The boy takes it literally and walks to the house of Yama, lord of death, where he waits three days for the absent god. Returning, Yama grants three boons to atone for the neglected guest. It is the third boon that turns a folk tale into scripture.',
        sectionHeader: 'The setup',
        teachingText:
          'The Upanishad chooses its teacher deliberately: the one being who cannot lie about death is Death. And it chooses its student deliberately too — a boy young enough to still ask the question everyone older has learned to stop asking.',
        citation: 'Katha Upanishad 1.1.1–9',
        citationLink: 'story:nachiketa',
      },
      {
        id: 'katha-shreya-preya',
        title: 'The good and the pleasant',
        openingVerse: {
          sanskrit: 'श्रेयश्च प्रेयश्च मनुष्यमेतस्\nतौ सम्परीत्य विविनक्ति धीरः ।\nश्रेयो हि धीरोऽभि प्रेयसो वृणीते\nप्रेयो मन्दो योगक्षेमाद्वृणीते ॥',
          transliteration:
            'śreyaśca preyaśca manuṣyam etas\ntau samparītya vivinakti dhīraḥ\nśreyo hi dhīro’bhi preyaso vṛṇīte\npreyo mando yogakṣemād vṛṇīte',
          meaning:
            'The good and the pleasant approach a person; the wise one, examining both, tells them apart. The wise choose the good over the pleasant; the dull choose the pleasant, for the sake of comfort and gain.',
          source: 'Katha Upanishad 1.2.2',
        },
        storyText:
          'For his third boon, Nachiketa asked what becomes of a person after death — some say he exists, some say he does not; teach me the truth. Yama flinched and tried to buy the question back: ask instead for sons and grandsons, cattle, gold, vast lands, long life, celestial maidens — anything but this. Nachiketa refused it all: these things wear out, they exhaust the senses’ vigor; even the longest life is short. Only when the boy had turned down every substitute did Yama, pleased, begin to teach. His first lesson: two paths present themselves to everyone — shreya, the good, and preya, the pleasant — and a whole life turns on learning to tell them apart.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Katha’s central distinction is brutally practical. The pleasant is not evil — it is simply what asks for comfort now. The good is what serves you across the whole arc. Wisdom, the Upanishad says, is not knowing exotic truths; it is the daily discipline of telling these two apart when they arrive dressed alike.',
        citation: 'Katha Upanishad 1.2.1–6',
        citationLink: 'concept:dharma',
      },
      {
        id: 'katha-chariot',
        title: 'The chariot of the self',
        openingVerse: {
          sanskrit: 'आत्मानं रथिनं विद्धि शरीरं रथमेव तु ।\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥',
          transliteration:
            'ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu\nbuddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca',
          meaning:
            'Know the self as the rider in the chariot, the body as the chariot itself; know the intellect as the charioteer, and the mind as the reins.',
          source: 'Katha Upanishad 1.3.3',
        },
        storyText:
          'Then Yama gives the image that every later tradition borrowed. You are a chariot in motion. The body is the vehicle; the senses are the horses; the objects they chase are the roads. The mind is the reins, and the intellect — buddhi — is the charioteer. When the charioteer is asleep and the reins slack, the horses run wild and the rider is lost. When the intellect holds firm and the mind is disciplined, the horses are governed, and the journey reaches its end: the supreme abode, the place from which there is no return.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The chariot dismantles a comforting illusion — that “you” are in charge by default. The self only rides; whether the ride ends anywhere worth reaching depends on whether the intellect is awake and the mind is held. Freedom is not doing whatever the horses want; it is the charioteer’s steady hands.',
        citation: 'Katha Upanishad 1.3.3–9',
        citationLink: 'concept:three-gunas',
      },
      {
        id: 'katha-razor',
        title: 'The razor’s edge',
        openingVerse: {
          sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया\nदुर्गं पथस्तत्कवयो वदन्ति ॥',
          transliteration:
            'uttiṣṭhata jāgrata prāpya varān nibodhata\nkṣurasya dhārā niśitā duratyayā\ndurgaṁ pathas tat kavayo vadanti',
          meaning:
            'Arise! Awake! Having reached the wise, learn. Sharp as a razor’s edge and hard to cross — a difficult path, the poets say, is this.',
          source: 'Katha Upanishad 1.3.14',
        },
        storyText:
          'Lest the chariot sound like a tidy formula, Yama warns the boy that the path is fine and treacherous as a razor’s edge. The Self is “hidden in the cave of the heart,” subtler than the subtle, not reached by cleverness or argument or much learning. It is known only by the one it chooses — which the tradition reads not as favoritism but as readiness: the truth reveals itself to the person who has actually turned toward it with their whole being. “Arise, awake,” the verse commands — the line Swami Vivekananda made a rallying cry for a nation.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Katha refuses to make wisdom cheap. It has just handed you a clear map — good over pleasant, intellect over impulse — and immediately insists the walking is razor-hard. The map is not the journey. “Arise, awake” is addressed to the part of you that already knows the difference and keeps hitting snooze.',
        citation: 'Katha Upanishad 1.2.23; 1.3.14',
      },
    ],
    reflectionQuestions: [
      'The Katha’s whole teaching turns on telling the good (shreya) from the merely pleasant (preya) when they arrive looking alike. Name one choice in front of you right now where you can feel the two pulling apart.',
    ],
    sources: [
      { text: 'Katha Upanishad', locator: 'Adhyayas 1–2 (the Nachiketa–Yama dialogue)' },
    ],
  },
  {
    id: 'isha-upanishad',
    collection: 'principal-upanishads',
    name: 'Isha Upanishad',
    sanskritName: 'ईशावास्य उपनिषद्',
    subtitle: 'Eighteen verses that hold the whole of Vedanta — renounce, and enjoy',
    order: 1,
    coverImage: MOKSHA_COVER,
    sections: [
      {
        id: 'isha-first-verse',
        title: 'Renounce, and enjoy',
        openingVerse: {
          sanskrit: 'ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
          transliteration:
            'īśāvāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam',
          meaning:
            'All this — whatever moves in this moving world — is pervaded by the Lord. Enjoy it through renunciation; do not covet, for whose is wealth?',
          source: 'Isha Upanishad 1',
        },
        storyText:
          'The Isha is the shortest of the principal Upanishads and, many hold, the deepest — one of the few placed inside a Veda itself rather than appended after. Its very first verse hands you a paradox to live in: everything belongs to the divine, so hold nothing as your own — and precisely in that letting-go, enjoy it fully. Gandhi said that if all the scriptures of Hinduism were lost and only this one verse survived, the whole tradition could be rebuilt from it.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The verse dissolves a false choice. It does not say renounce the world or enjoy the world; it says enjoy it by renouncing ownership of it. The grip is what poisons the having. What you hold with an open hand you can actually taste; what you clutch, you only guard.',
        citation: 'Isha Upanishad 1',
        citationLink: 'concept:karma',
      },
      {
        id: 'isha-all-beings',
        title: 'Seeing yourself in everything',
        storyText:
          'The Isha then makes its second great move: the one who sees all beings in the very Self, and the Self in all beings, ceases to shrink from anything. Where there is that seeing, what delusion, what sorrow can remain? For the divisions we grieve over — mine and yours, self and other, this and that — are the surface; underneath runs a single reality wearing every face. The verse does not ask you to believe this. It asks what would be left of fear if you saw it.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The Isha ties its ethics directly to its metaphysics: cruelty and grief both come from mistaking the many for the whole truth. See the one Self looking out of every pair of eyes, and there is simply no one left to harm and nothing left to lose. Non-violence, in this text, is not a rule you keep; it is what clear sight makes automatic.',
        citation: 'Isha Upanishad 6–7',
        citationLink: 'concept:ahimsa',
      },
      {
        id: 'isha-golden-disc',
        title: 'The face of truth, covered in gold',
        storyText:
          'The Isha closes with a prayer at the edge of death. The face of truth, it says, is hidden by a disc of gold — the dazzle of the world’s surface, so bright it hides what it covers. Remove it, the seeker prays, that I who love the truth may see. It is the Brihadaranyaka’s great cry too: lead me from the unreal to the real, from darkness to light, from death to immortality. The Upanishad that began by pervading everything with the divine ends by asking to see past the glitter to the divine itself.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The golden disc is a precise image: it is not darkness that hides truth from us but brilliance — the shine of wealth, success, and spectacle, lovely enough that we mistake it for the whole. The Isha’s last prayer is not for more light but for the removal of a dazzle we mistook for light.',
        citation: 'Isha Upanishad 15–18',
      },
    ],
    reflectionQuestions: [
      'The Isha says you enjoy things most by holding them without ownership. What is one thing you are gripping so tightly that the grip has spoiled the having?',
    ],
    sources: [
      { text: 'Isha Upanishad', locator: 'Complete (18 verses); part of the Shukla Yajur Veda' },
    ],
  },
  {
    id: 'kena-upanishad',
    collection: 'principal-upanishads',
    name: 'Kena Upanishad',
    sanskritName: 'केनोपनिषद्',
    subtitle: 'By whom? — the search for the power behind seeing, hearing, and knowing',
    order: 2,
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'kena-question',
        title: 'Willed by whom?',
        storyText:
          'The Kena takes its name from its first word — kena, “by whom?” A student asks the question that most people never think to ask: by whose will does the mind go where it goes? By what power does the eye see, the ear hear, the tongue speak? We use these instruments all day and never wonder what wields them. The teacher’s answer refuses to name a thing: it is the ear of the ear, the eye of the eye, the mind of the mind — the awareness behind every awareness, which the senses can never turn around to catch, because it is the one doing the looking.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Kena points at the one thing that can never become an object: the seer itself. You cannot see your own seeing the way you see a tree, because it is what is doing the seeing. The Self is not one more item in your experience to be found; it is the light in which all items appear.',
        citation: 'Kena Upanishad 1.1–1.8',
        citationLink: 'concept:brahman-atman',
      },
      {
        id: 'kena-paradox',
        title: 'If you think you know, you don’t',
        openingVerse: {
          sanskrit: 'यस्यामतं तस्य मतं मतं यस्य न वेद सः ।\nअविज्ञातं विजानतां विज्ञातमविजानताम् ॥',
          transliteration:
            'yasyāmataṁ tasya mataṁ mataṁ yasya na veda saḥ\navijñātaṁ vijānatāṁ vijñātam avijānatām',
          meaning:
            'To whom It is unknown, to him It is known; to whom It is known, he does not know. It is not understood by those who understand It; It is understood by those who do not understand It.',
          source: 'Kena Upanishad 2.3',
        },
        storyText:
          'Then the Kena turns the knife on the knower. Anyone who says “I know Brahman well” knows only a little — for they have turned the infinite into an object small enough to be possessed, and that is not it. But the one who says “I do not know, and yet not that I do not know” has come closer. The teaching is not anti-knowledge; it is a warning that the deepest reality is not a fact you bank but a presence that undoes your certainty. To be sure you have grasped it is the surest sign you have grasped something smaller.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The Kena builds humility into the pursuit of the highest truth. Every other subject rewards the confidence of mastery; this one punishes it. The verse is a permanent corrective to spiritual arrogance — the moment you are certain you have it, you have traded the living reality for a tidy idea of it.',
        citation: 'Kena Upanishad 2.1–2.3',
      },
      {
        id: 'kena-gods',
        title: 'The lesson the gods needed',
        storyText:
          'To drive it home, the Kena tells a small story. The gods won a great victory and grew proud, sure it was their own doing. A mysterious spirit appeared before them. Agni, god of fire, boasted he could burn anything — and could not scorch a single blade of grass the spirit set before him. Vayu, god of wind, could not stir it. Only Indra, approaching humbly, met the goddess Uma, who revealed the spirit was Brahman — the power by which the gods themselves had won. Even the gods had mistaken a borrowed strength for their own.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The parable catches everyone in the same error: taking the power that works through us for a power that is ours. Fire cannot burn, wind cannot blow, and no one wins anything except by a strength on loan from the source of all strength. Humility here is not modesty; it is simply accuracy about where the power comes from.',
        citation: 'Kena Upanishad 3–4 (the parable of the gods and the yaksha)',
      },
    ],
    reflectionQuestions: [
      'The Kena says the moment you are certain you have grasped the deepest truth, you have traded it for something smaller. Where has certainty been quietly closing a door you would be wiser to leave open?',
    ],
    sources: [
      { text: 'Kena Upanishad', locator: 'Complete (4 khandas); of the Sama Veda' },
    ],
  },
  {
    id: 'mundaka-upanishad',
    collection: 'principal-upanishads',
    name: 'Mundaka Upanishad',
    sanskritName: 'मुण्डक उपनिषद्',
    subtitle: 'Two knowledges, two birds, and the words on India’s own emblem',
    order: 4,
    coverImage: SAMSARA_COVER,
    sections: [
      {
        id: 'mundaka-two-knowledges',
        title: 'The higher and the lower knowledge',
        storyText:
          'The Mundaka opens by dividing all knowledge in two. There is the lower knowledge — apara vidya — and it is vast: the Vedas themselves, grammar, ritual, astronomy, every science and art. And there is the higher knowledge — para vidya — by which the imperishable is known. The text is startling in its ranking: it places the entire library of learning, sacred texts included, in the lower category, because information about reality is not the same as realizing it. One tells you about the treasure; only the other opens the chest.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Mundaka is not anti-intellectual — it calls the Vedas knowledge — but it refuses to confuse accumulation with transformation. You can master every book about water and still be thirsty. The higher knowledge is not more facts; it is the shift from knowing about the Self to being awake as it.',
        citation: 'Mundaka Upanishad 1.1.4–5',
      },
      {
        id: 'mundaka-two-birds',
        title: 'Two birds on one tree',
        storyText:
          'Then comes the image the whole tradition borrowed. Two birds, inseparable companions, perch on the same tree. One eats the tree’s fruits, sweet and bitter by turns, and is tossed by every taste. The other eats nothing — it simply watches, serene and unmoved. The eating bird is you as you live, dragged up and down by each experience. The watching bird is also you: the still awareness that has observed your whole life without being altered by any of it. And the moment the first bird looks up and sees the second, its grief falls away.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The two birds are never on separate trees and never separated — the watcher is always right there, one branch away, through your worst hour. Freedom is not escaping the tree or improving the fruit; it is the eating bird remembering to glance up. The whole of contemplative practice, the Mundaka suggests, is that glance.',
        citation: 'Mundaka Upanishad 3.1.1–2',
        citationLink: 'story:two-birds',
      },
      {
        id: 'mundaka-satyameva',
        title: 'Truth alone triumphs',
        openingVerse: {
          sanskrit: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः ।\nयेनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत्सत्यस्य परमं निधानम् ॥',
          transliteration:
            'satyam eva jayate nānṛtaṁ satyena panthā vitato devayānaḥ\nyenākramanty ṛṣayo hy āptakāmā yatra tat satyasya paramaṁ nidhānam',
          meaning:
            'Truth alone triumphs, never falsehood. By truth is stretched out the path of the gods, along which the sages who have attained all desire ascend to where truth’s supreme treasure lies.',
          source: 'Mundaka Upanishad 3.1.6',
        },
        storyText:
          'From the Mundaka comes the line you have seen your whole life without knowing its source: satyameva jayate — “truth alone triumphs.” It sits beneath the lion-capital of Ashoka on every Indian passport, coin, and government seal. In its original setting it is not a slogan about winning arguments but a description of a road: truth is the path the sages walk to reach the highest reality. Falsehood may run ahead for a while; the road itself is made of truth.',
        sectionHeader: 'What this teaches',
        teachingText:
          'A nation put this verse on its emblem, and it is easy to read it as a promise that honesty always wins in the short run — which life keeps disproving. The Mundaka means something harder: truth is the only path that actually arrives. Falsehood can win rounds; it cannot lay a road to anywhere worth reaching.',
        citation: 'Mundaka Upanishad 3.1.6',
        citationLink: 'concept:dharma',
      },
    ],
    reflectionQuestions: [
      'The Mundaka says all your learning about truth is the “lower” knowledge until it becomes something you live. Where do you know a great deal about a truth you have not yet let change how you actually live?',
    ],
    sources: [
      { text: 'Mundaka Upanishad', locator: 'Three mundakas; of the Atharva Veda' },
    ],
  },
  {
    id: 'mandukya-upanishad',
    collection: 'principal-upanishads',
    name: 'Mandukya Upanishad',
    sanskritName: 'माण्डूक्य उपनिषद्',
    subtitle: 'Twelve verses on one sound — A, U, M, and the silence that holds them',
    order: 5,
    coverImage: MOKSHA_COVER,
    sections: [
      {
        id: 'mandukya-om',
        title: 'The syllable that is everything',
        openingVerse: {
          sanskrit: 'ओमित्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं\nभूतं भवद्भविष्यदिति सर्वमोंकार एव ॥',
          transliteration:
            'oṁ ity etad akṣaram idaṁ sarvaṁ tasyopavyākhyānaṁ\nbhūtaṁ bhavad bhaviṣyad iti sarvam oṁkāra eva',
          meaning:
            'Om — this syllable is all this. Its full explanation: all that is past, present, and future is nothing but Om. And whatever is beyond the three times, that too is Om.',
          source: 'Mandukya Upanishad 1',
        },
        storyText:
          'The Mandukya is the shortest Upanishad — twelve short verses — and the tradition says that if you can only study one, study this. Its entire subject is the single syllable Om. It begins with a staggering claim: everything that is, was, or will be — and everything beyond time as well — is Om. The rest of the text unpacks how one sound could contain all of reality, by mapping its three sounds onto the three states every human being passes through every single day.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Mandukya does not treat Om as a holy noise to make. It treats it as a map of consciousness itself — a sound engineered so that saying it slowly walks you through the whole structure of experience. This is why every mantra in the tradition rides on Om: it is the one syllable that contains the territory.',
        citation: 'Mandukya Upanishad 1',
      },
      {
        id: 'mandukya-states',
        title: 'A, U, M — waking, dream, deep sleep',
        storyText:
          'The three sounds of A-U-M are the three states of the self. A is waking, where consciousness faces outward to the world of things. U is dream, where it turns inward and makes its own worlds from memory. M is deep sleep, where all forms dissolve into a dark, seamless peace and even the dreamer is gone. Each of us travels this circuit nightly without noticing it is a spiritual teaching. The Upanishad asks: who is the one continuous witness present in all three — awake, dreaming, and gone?',
        sectionHeader: 'Why it matters',
        teachingText:
          'The Mandukya finds its evidence not in scripture but in your own night. You already visit three completely different worlds every day and survive the total dissolution of deep sleep intact. That something remains continuous across waking, dream, and dreamless sleep is the text’s quiet proof that you are not only the contents of any one state.',
        citation: 'Mandukya Upanishad 3–6 (the four quarters of the Self)',
      },
      {
        id: 'mandukya-turiya',
        title: 'The fourth, and the silence after Om',
        openingVerse: {
          sanskrit: 'सर्वं ह्येतद् ब्रह्म अयमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ॥',
          transliteration: 'sarvaṁ hy etad brahma ayam ātmā brahma so’yam ātmā catuṣpāt',
          meaning:
            'All this is verily Brahman. This Self is Brahman. This same Self has four quarters.',
          source: 'Mandukya Upanishad 2',
        },
        storyText:
          'Then the Mandukya points past the three sounds to the silence that follows them — turiya, “the fourth.” Not waking, not dream, not sleep, but the pure awareness that underlies and witnesses all three; not a fourth state alongside the others but the ground of every state. That, the Upanishad says, is the Self, and this Self is Brahman — one of the four great sayings of Vedanta, ayam ātmā brahma. When you chant Om and let the sound fade, the ringing silence into which it dissolves is a taste of the fourth: what you are beneath waking, dreaming, and sleeping alike.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The most important part of Om, the Mandukya says, is the part you cannot hear — the silence after the M. The whole practice is to ride the sound down into that silence and recognize it not as absence but as your own deepest nature: the awareness that was never born, never dreams, and never sleeps.',
        citation: 'Mandukya Upanishad 2, 7 (ayam ātmā brahma; turiya)',
        citationLink: 'concept:brahman-atman',
      },
    ],
    reflectionQuestions: [
      'The Mandukya finds the sacred in something you do every night — passing through waking, dream, and dreamless sleep. What stays continuously “you” across all three? Sit with that for a moment.',
    ],
    sources: [
      { text: 'Mandukya Upanishad', locator: 'Complete (12 verses); of the Atharva Veda' },
    ],
  },
  {
    id: 'taittiriya-upanishad',
    collection: 'principal-upanishads',
    name: 'Taittiriya Upanishad',
    sanskritName: 'तैत्तिरीय उपनिषद्',
    subtitle: 'A teacher’s parting charge, five sheaths of the self, and reality as bliss',
    order: 6,
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'taittiriya-convocation',
        title: 'Speak the truth, practice dharma',
        openingVerse: {
          sanskrit: 'सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ॥',
          transliteration: 'satyaṁ vada. dharmaṁ cara. svādhyāyān mā pramadaḥ',
          meaning:
            'Speak the truth. Practice dharma. Do not neglect your own study.',
          source: 'Taittiriya Upanishad 1.11.1',
        },
        storyText:
          'The Taittiriya contains the oldest graduation address in the world. As a student finishes and leaves the teacher’s house, the teacher sends him off with a charge that has been repeated at convocations for three thousand years: Speak the truth. Practice dharma. Never neglect your learning. Treat your mother as a god, your father as a god, your teacher and your guest as gods. Do the deeds that are blameless, not the others. And where you are in doubt, watch how the wise and thoughtful act, and do as they do.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Before any metaphysics, the Taittiriya insists on conduct: the highest knowledge is sent out the door wrapped in the plainest instructions. And its guidance for hard cases is strikingly practical — when the rule is unclear, find someone of genuine wisdom and watch what they actually do. Character, the text says, is learned by imitation of the good.',
        citation: 'Taittiriya Upanishad 1.11 (the convocation address)',
        citationLink: 'concept:dharma',
      },
      {
        id: 'taittiriya-sheaths',
        title: 'The five sheaths of the self',
        storyText:
          'Then the Taittiriya goes inward, peeling the person like an onion. The outermost layer is the sheath made of food — the physical body, built of what we eat. Within it is the sheath of vital breath, the energy that animates it. Within that, the sheath of mind; within that, the sheath of intellect and discernment; and innermost, the sheath of bliss — ananda. Each layer is subtler and closer to the core than the last, and none of them is the final Self; they are its coverings, like nested garments around what wears them.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The five sheaths give a map for the question “who am I?” — and its method is subtraction. You are not merely the body of food, nor only the breath, nor even the mind or the intellect; peel each, and something subtler remains. It is the Upanishad’s answer to a life spent identifying with the outermost layer: you are not the garment, however fine.',
        citation: 'Taittiriya Upanishad 2.1–2.5 (the pancha-kosha)',
        citationLink: 'concept:prana',
      },
      {
        id: 'taittiriya-ananda',
        title: 'Reality is bliss',
        storyText:
          'At the core of the sheaths the Taittiriya finds not emptiness but bliss, and makes it the nature of reality itself: from ananda all beings are born, by ananda they live, into ananda they return. It defines Brahman as satyam jnanam anantam — truth, knowledge, infinity — and then, more intimately, as raso vai saḥ: “He is verily the flavor, the sweetness itself.” This is the conclusion the sage Bhrigu reached only after burning through matter, breath, mind, and intellect one by one — that the ground of everything is not cold and empty but joy.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Taittiriya ends on a claim the tradition treasures: dig to the bottom of reality and you strike not void but bliss. Existence is not neutral stuff we must sweeten with pleasures; sweetness is its very grain. The joy you chase in a thousand small things is a rumor of the joy you already are made of.',
        citation: 'Taittiriya Upanishad 2.7; 3.6 (ananda; the teaching to Bhrigu)',
        citationLink: 'story:bhrigu',
      },
    ],
    reflectionQuestions: [
      'The Taittiriya says when a rule is unclear, watch how the genuinely wise and good actually behave, and follow that. Whose real-life conduct is the clearest guide you have — and are you actually watching it?',
    ],
    sources: [
      { text: 'Taittiriya Upanishad', locator: 'Shiksha, Brahmananda, and Bhrigu Vallis; of the Krishna Yajur Veda' },
    ],
  },
];

export const ALL_SCRIPTURE_PARTS: ScripturePart[] = [...RAMAYANA_PARTS, ...UPANISHAD_PARTS];

export const getPartById = (id: string): ScripturePart | undefined =>
  ALL_SCRIPTURE_PARTS.find(p => p.id === id);

export const getPartsOfCollection = (id: ScriptureCollectionId): ScripturePart[] =>
  ALL_SCRIPTURE_PARTS.filter(p => p.collection === id).sort((a, b) => a.order - b.order);

// Journey order (part-id arrays) — appended to their collection's module in
// buildJourneyPath. Append-only: existing journey positions never move.
export const RAMAYANA_JOURNEY_ORDER: string[] = getPartsOfCollection('ramayana').map(p => p.id);
export const UPANISHAD_JOURNEY_ORDER: string[] = getPartsOfCollection('principal-upanishads').map(p => p.id);
