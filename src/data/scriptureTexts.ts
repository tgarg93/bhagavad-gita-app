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
    subtitle: 'The Book of Childhood — a kingdom’s prayer, a divine birth, a bow that made a marriage',
    order: 1,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'bala-question',
        title: 'A poet asks: does such a man exist?',
        openingVerse: {
          sanskrit: 'को न्वस्मिन्साम्प्रतं लोके गुणवान्कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥',
          transliteration:
            'ko nv asmin sāmprataṁ loke guṇavān kaśca vīryavān\ndharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ',
          meaning:
            'Who in this world today is truly virtuous and truly mighty — one who knows what is right, remembers every kindness, speaks only truth, and holds firm to his vows?',
          source: 'Valmiki Ramayana, Bala Kanda 1.2',
        },
        storyText:
          'The whole Ramayana begins as a question. The sage Valmiki asks the divine sage Narada whether there lives, anywhere, a man complete in virtue — brave, truthful, grateful, unshakably good. It is not a rhetorical flourish; it is the seed of the epic. Narada answers with a name: Rama, of the house of Ikshvaku. Everything that follows is the poem’s attempt to show what that answer looks like when it has to walk through a human life.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Ramayana does not open with a hero; it opens with a longing for one. Before a single event, the text names the qualities it will spend 24,000 verses examining — and asks whether they can coexist in one person at once. Rama is the tradition’s sustained answer to “what would goodness actually cost?”',
        citation: 'Valmiki Ramayana, Bala Kanda 1 (the Narada Samvada)',
      },
      {
        id: 'bala-birthless-poem',
        title: 'How the first poem was born',
        storyText:
          'Walking by the Tamasa river, Valmiki saw a hunter shoot down one of a pair of mating cranes. The surviving bird’s cry of grief tore through him, and grief came out of his mouth already shaped into meter — the first shloka, born of sorrow (shoka). Brahma himself then charged him to tell Rama’s story in that new music. So the Adi Kavya, the first poem, was a form grief found for itself; the tradition has trusted ever since that the deepest things arrive as song.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The Ramayana is self-aware about its own origin: it says poetry itself was born from compassion for a killed creature. The epic that will praise dharma announces, in its first pages, that the impulse behind it is grief refusing to look away.',
        citation: 'Valmiki Ramayana, Bala Kanda 2 (the shloka born of shoka)',
      },
      {
        id: 'bala-birth',
        title: 'A kingdom without an heir',
        storyText:
          'King Dasharatha of Ayodhya had everything a ruler could want and the one thing he could not command: a child. He performed the great putrakameshti sacrifice, and from its fire rose a divine being bearing a vessel of sacred payasam for his queens. Meanwhile the gods, terrorized by the demon-king Ravana — who held a boon making him invulnerable to gods and demons but who had scorned to name mere humans — begged Vishnu to be born as a man. Vishnu agreed. Rama and his three brothers were born to Dasharatha’s queens: divinity entering the world through the one door Ravana left unguarded.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Ravana’s undoing is written into his own arrogance: he armored himself against gods and demons and could not be bothered to fear a man. The epic’s engine is set in motion by pride’s single blind spot — the enemy it considers beneath notice.',
        citation: 'Valmiki Ramayana, Bala Kanda 15–18 (the boon of Ravana; the birth of Rama)',
      },
      {
        id: 'bala-vishwamitra',
        title: 'The sage who took the boys away',
        storyText:
          'The sage Vishwamitra arrived at court and asked for the impossible: lend me your teenage son to guard my sacrifice from demons. Dasharatha, who had waited a lifetime for this child, nearly refused — but dharma to a great sage outranked a father’s fear. Rama and Lakshmana went to the forest, and there their education became real. Vishwamitra gave them celestial weapons and, more importantly, occasions to use them well: Rama killed the demoness Tataka, protected the sacrifice, and with a touch of his foot restored Ahalya, a woman turned to stone by a curse, back to life and grace.',
        sectionHeader: 'Why it matters',
        teachingText:
          'Rama’s greatness is never self-generated in the epic — it is drawn out by teachers who ask more of him than his parents would dare. Dasharatha’s hardest act of love is letting his cherished son go where he can be tested. Ahalya’s redemption sets the note early: Rama’s presence restores what shame had petrified.',
        citation: 'Valmiki Ramayana, Bala Kanda 25–48 (Tataka; the weapons; Ahalya)',
      },
      {
        id: 'bala-bow',
        title: 'The bow no one could lift',
        openingVerse: {
          sanskrit: 'तदा रामो महातेजाः सस्मारेश्वरकार्मुकम् ।\nबभञ्ज च नरश्रेष्ठो मध्ये वीर्यवतां वरः ॥',
          transliteration:
            'tadā rāmo mahātejāḥ sasmāreśvara-kārmukam\nbabhañja ca naraśreṣṭho madhye vīryavatāṁ varaḥ',
          meaning:
            'Then the radiant Rama, best of men, took up Shiva’s bow — and in the sight of all the mighty, bent it until it broke.',
          source: 'Valmiki Ramayana, Bala Kanda 67 (paraphrase of the bow-breaking)',
        },
        storyText:
          'In Mithila, King Janaka had set a condition for his daughter Sita’s hand: string the divine bow of Shiva, an heirloom so vast that kings had failed even to stir it. Sita was no ordinary princess — Janaka had found her in a furrow of the earth, the ground’s own daughter. Rama walked up to the bow, lifted it as if it were nothing, and in bending it to string, snapped it in two with a crack heard like thunder. Sita garlanded him. Their marriage — and those of the four brothers — closed the book of childhood.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The bow-test is the epic’s first portrait of Rama’s strength, and it is pointedly effortless — power so complete it needs no display. Sita, born of the earth, is matched to the one man who can lift what the earth’s own weight resists. The union that the rest of the epic will tear apart and reunite is founded here, on an act of quiet, total capability.',
        citation: 'Valmiki Ramayana, Bala Kanda 66–73 (the bow of Shiva; the marriage of Sita)',
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
    subtitle: 'The Book of Ayodhya — a coronation undone by two old promises, and a prince who bows to them',
    order: 2,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'ayodhya-eve',
        title: 'The night before the crown',
        storyText:
          'Dasharatha, old and ready to rest, named Rama his heir, and all of Ayodhya lit up for the coronation. But long ago the king had granted his youngest queen, Kaikeyi, two unnamed boons — and her maid Manthara, dripping poison in her ear, taught her when to spend them. On the eve of the crowning, Kaikeyi named her price: not Rama on the throne but her own son Bharata, and Rama into the forest for fourteen years. Dasharatha, bound by his given word, broke where he stood — a king undone not by an enemy but by his own past promise.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The catastrophe turns on a word given years earlier and forgotten. The Ramayana treats a promise as a debt that time does not cancel: Dasharatha would rather lose his son and his life than his word. Whether that is nobility or tragedy is a question the epic deliberately leaves open.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 7–13 (Manthara, Kaikeyi, and the two boons)',
      },
      {
        id: 'ayodhya-equanimity',
        title: 'The prince who did not flinch',
        storyText:
          'When Rama was told — coronation cancelled, fourteen years of exile instead — the watchers searched his face for the collapse. There was none. The Ramayana is precise about it: the news of losing a kingdom moved him no more than the news of gaining it had. He touched his father’s feet, reassured his weeping mother Kaushalya, and prepared to leave, saying a son’s duty is to make his father’s word true, whatever it costs the son. His calm frightened people more than rage would have.',
        sectionHeader: 'Why it matters',
        teachingText:
          'This is the Gita’s equanimity shown as story before the Gita named it: Rama meets gain and loss with the same face. He does not suppress grief so much as refuse to let the outcome own him. The throne was never what he was living for, so its loss cannot unmake him.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 18–19 (Rama receives the news)',
        citationLink: 'deity:rama',
      },
      {
        id: 'ayodhya-companions',
        title: 'Two who would not stay behind',
        storyText:
          'Rama meant to go alone. Sita refused: a wife’s place is beside her husband, and a palace without him is the real forest. Lakshmana refused too, taking up his bow to serve his brother through every one of the fourteen years. Rama’s arguments — the forest is danger, hardship, snakes and demons — only hardened them. So three walked out of Ayodhya in bark and deerskin where a king should have ridden, and the city followed weeping to the river’s edge.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Sita and Lakshmana redefine the exile: what looks like punishment becomes a chosen fidelity. The epic’s ideal of love is not staying comfortable together but refusing to let the other suffer alone. Devotion, here, is measured by what it walks into.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 26–31 (Sita and Lakshmana insist on the exile)',
      },
      {
        id: 'ayodhya-sandals',
        title: 'The sandals on the throne',
        storyText:
          'Dasharatha died of grief within days. Bharata, away when it all happened, returned to find his father dead and his brother banished in his name — and was horrified. He rejected the throne utterly and marched to the forest to bring Rama home. Rama would not come: their father’s word had to stand. So Bharata took Rama’s sandals, carried them back, and set them on the throne — ruling for fourteen years not as king but as regent for his brother’s footwear, himself living as an ascetic outside the capital.',
        sectionHeader: 'Why it matters',
        teachingText:
          'Bharata is the epic’s portrait of power refused. Handed a kingdom, he wants none of it that isn’t rightfully his brother’s, and turns the throne into a seat of waiting. The sandals are the Ramayana’s emblem of authority held in trust — leadership as service to an absent rightful claim, not a prize seized because it was offered.',
        citation: 'Valmiki Ramayana, Ayodhya Kanda 100–115 (Bharata and the sandals)',
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
    subtitle: 'The Book of the Forest — a golden deer, a drawn line, and the abduction that starts a war',
    order: 3,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'aranya-forest',
        title: 'Years among the sages',
        storyText:
          'For over a decade the three lived in the forest, moving between the hermitages of sages who begged Rama for protection against the demons — rakshasas — that hunted them. Rama gave his word to clear the forests of them, and kept it, until word of this reached Lanka. It began, as these things do, with an insult: the demoness Surpanakha, Ravana’s sister, propositioned Rama and then Lakshmana, and when mocked, lunged at Sita — and Lakshmana cut off her nose and ears. She fled shrieking to her brother.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The war that ends the epic begins with a small cruelty and a proportionate response that pride will not accept. Surpanakha’s humiliation is real; her brother’s reaction turns a wound to vanity into a cosmic war. The Ramayana watches how injury to ego metastasizes when power refuses to absorb it.',
        citation: 'Valmiki Ramayana, Aranya Kanda 17–18 (Surpanakha)',
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
          'Ravana, inflamed by Surpanakha and by tales of Sita’s beauty, went to the demon Maricha with a plan. Maricha had already felt Rama’s arrow once and lived; he tried to talk his king out of it, and in warning him spoke one of the epic’s most quoted lines — Rama is not merely a strong man; he is dharma walking in a body, and to move against him is to move against the order of the world itself. Ravana would not hear it. Fear of his own king, Maricha decided, was better than fear of Rama; he agreed to help, knowing it would kill him.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The tribute comes from the enemy camp — the demon sent to destroy Rama is the one who names him dharma embodied. The Ramayana lets its deepest praise of its hero fall from a rakshasa’s mouth, and shows tyranny’s signature move: silencing the advisor who tells the truth because the truth is inconvenient.',
        citation: 'Valmiki Ramayana, Aranya Kanda 37 (Maricha warns Ravana)',
        citationLink: 'deity:rama',
      },
      {
        id: 'aranya-golden-deer',
        title: 'The deer that was too beautiful',
        storyText:
          'Maricha became a golden deer, dappled with silver, and grazed near the hermitage until Sita longed for it. Rama went to catch it, warning Lakshmana to guard her. Struck at last, the deer cried out in Rama’s own voice — “Sita! Lakshmana!” — and died. Sita, terrified, drove Lakshmana to go help, though he knew it was a trap; before leaving he drew a line around the hut and begged her not to cross it. Then Ravana came, disguised as a wandering ascetic, and coaxed her across the line with a beggar’s plea. He seized her and flew for Lanka.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The abduction needs three things and gets them: a desire too lovely to doubt, a cry that weaponizes love, and a good deed — alms to a holy man — turned into the trap. Evil in the Ramayana rarely storms the gate; it wears something you were right to want and something you were right to honor, and waits for you to step across your own line.',
        citation: 'Valmiki Ramayana, Aranya Kanda 42–49 (the golden deer and the abduction)',
      },
      {
        id: 'aranya-jatayu',
        title: 'The old bird who fought a king',
        storyText:
          'As Ravana carried Sita south through the sky, the aged vulture-king Jatayu — a friend of Dasharatha — heard her cries and rose to stop him. It was hopeless: an old bird against the lord of the rakshasas. Jatayu fought anyway, tore Ravana’s chariot and wounded him, and was cut down for it, wings severed, left dying on the earth. He held on only long enough to tell Rama which way Ravana had gone — his last act a piece of the map that would bring the demon down. Rama cremated him as he would a father.',
        sectionHeader: 'Why it matters',
        teachingText:
          'Jatayu had no chance and acted anyway. The Ramayana honors the fight you cannot win when it is the fight dharma asks of you — his failure is not failure, because the one true thing an old bird could still do, the direction of Sita’s flight, is exactly what he stayed alive to give. Some duties are measured not by whether you succeed but by whether you rose.',
        citation: 'Valmiki Ramayana, Aranya Kanda 50–68 (Jatayu’s stand and death)',
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
    subtitle: 'The Book of Kishkindha — an alliance of the broken, and a strength that had to be remembered',
    order: 4,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'kishkindha-meeting',
        title: 'Two exiled kings meet',
        storyText:
          'Searching for Sita, Rama and Lakshmana reached Kishkindha, kingdom of the vanaras — the forest people — and met Hanuman, minister to the deposed monkey-king Sugriva. Hanuman brought them to Sugriva, himself an exile: his brother Vali had driven him out and taken his wife. Two dispossessed kings recognized each other, and over a sacred fire they swore an alliance — Rama would win back Sugriva’s throne, and Sugriva would turn all his armies to finding Sita. Grief made them allies before anything else did.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Rama does not arrive at the war with an army; he builds one out of the equally broken. The alliance with Sugriva is founded on shared loss, not strength — the epic’s quiet claim that those who have been dispossessed understand one another, and that help most often comes from the ones who also need it.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 4–5 (Rama and Sugriva’s pact)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'kishkindha-vali',
        title: 'The arrow from hiding',
        storyText:
          'To keep his side of the pact, Rama had to defeat Vali — and Vali was the stronger. When Sugriva challenged his brother, Rama shot Vali from concealment, and the dying Vali accused him bitterly: is this dharma, for a righteous prince to kill from ambush a warrior fighting another? Rama’s answer is one of the epic’s hardest passages — that Vali had seized his brother’s wife and ruled by sheer force, that justice was owed, and that a king’s justice does not always come from the front. The tradition has debated the killing ever since; the Ramayana does not tidy it away.',
        sectionHeader: 'Why it matters',
        teachingText:
          'The epic lets its hero do a troubling thing and lets the victim voice the objection, unanswered to everyone’s full satisfaction. Rama is dharma embodied and still acts in a way readers have argued about for two thousand years — the Ramayana’s honesty is that it preserves the discomfort rather than erasing it.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 16–18 (the killing of Vali)',
      },
      {
        id: 'kishkindha-forgetting',
        title: 'The strength he had forgotten',
        storyText:
          'With Sugriva restored, the vanaras spread out to search. The southern party reached the ocean’s edge and despaired: a hundred yojanas of sea lay between them and Lanka, and no one could cross it. Then old Jambavan turned to Hanuman — silent, unassuming Hanuman — and reminded him of what a boyhood curse had made him forget: that he was the son of the wind, that no distance could hold him, that he had powers he had simply stopped remembering he owned. As Jambavan spoke, Hanuman began to grow.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The epic’s most beloved figure spends most of it not knowing what he can do. Hanuman does not lack the strength to cross the ocean; he lacks the memory of it, until a friend’s testimony returns it to him. The Ramayana suggests that much of what stops us is not weakness but forgetting — and that the great service one person does another is to say, plainly, what they are.',
        citation: 'Valmiki Ramayana, Kishkindha Kanda 65–66 (Jambavan reminds Hanuman)',
        citationLink: 'deity:hanuman',
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
    subtitle: 'The Beautiful Book — one devotee’s leap, and the hope he carried across an ocean',
    order: 5,
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'sundara-leap',
        title: 'The leap across the sea',
        storyText:
          'Remembering himself, Hanuman climbed a mountain, pressed it flat beneath his feet, and hurled his body across a hundred yojanas of ocean toward Lanka. Sea-monsters and mountains rose to test him; he passed each — bursting through one, honoring another. This is the book the tradition loves best and recites most: the Sundara Kanda, the Beautiful Book, named for the beauty of a servant’s single-minded devotion in flight. Alone, unaided, he crossed what an army could not.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The most celebrated book of the Ramayana centers not on Rama or Ravana but on a servant carrying out an errand. Its beauty, the tradition says, is exactly that: devotion in motion, a mind so fixed on the work of the one it loves that the ocean becomes a step. Greatness here is not rank; it is wholehearted service.',
        citation: 'Valmiki Ramayana, Sundara Kanda 1 (the crossing)',
        citationLink: 'deity:hanuman',
      },
      {
        id: 'sundara-ashoka',
        title: 'Sita in the grove',
        storyText:
          'Shrunk to the size of a cat, Hanuman searched Ravana’s city through the night and found Sita at last in the Ashoka grove — thin with grief, ringed by demon-guards, refusing Ravana’s threats and pleas alike, choosing death over dishonor. From the trees Hanuman dropped Rama’s signet ring into her lap. She wept to know Rama lived and was coming. He offered to carry her back on his own shoulders that instant; she refused — Rama himself must come and win her, so that his honor and hers stood whole. Hanuman took her jewel and her message instead.',
        sectionHeader: 'Why it matters',
        teachingText:
          'Sita in the grove is not a prize awaiting rescue; she is a will that Ravana cannot bend and that even her rescuer cannot override. Her refusal of the easy escape — insisting Rama come himself — is her own claim on dignity: she will be won back rightly or not at all. The Ramayana’s captive is its most unbreakable character.',
        citation: 'Valmiki Ramayana, Sundara Kanda 36–39 (Hanuman finds Sita)',
      },
      {
        id: 'sundara-burning',
        title: 'The tail that lit a city',
        storyText:
          'To take Ravana’s measure, Hanuman let himself be captured and hauled before the throne. Ravana ordered him killed; his brother Vibhishana insisted an envoy must not be slain, so instead they set Hanuman’s tail alight to shame him. It was a mistake. Hanuman slipped his bonds, leapt roof to roof with his burning tail, and set Lanka ablaze — a warning written in fire across the demon-king’s own capital — then quenched the flame in the sea and leapt home to lay Sita’s jewel in Rama’s hands.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The punishment meant to humiliate Hanuman becomes the instrument of Ravana’s warning. The Ramayana keeps showing pride arranging its own downfall: the fire lit to mock a servant announces, in letters no one in Lanka can miss, that the reckoning has already crossed the sea.',
        citation: 'Valmiki Ramayana, Sundara Kanda 51–55 (the burning of Lanka)',
        citationLink: 'deity:hanuman',
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
