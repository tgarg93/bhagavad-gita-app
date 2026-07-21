// The story library: standalone kathas and Upanishad dialogues, told in the
// reader's narrative shape. One schema serves both collections —
// 'upanishad' stories join journey Module 2 (appended after the Gita, so
// existing item positions never move); 'katha' stories are browse-only in
// the Learn tab.
//
// Citation discipline: every story names its locus per section; genuinely
// folk episodes say "tradition" plainly. Ids are permanent (completion keys
// on 'story:<id>').
import { NarrativeSection, SourceNote } from './narrativeTypes';

export type StoryCollection = 'upanishad' | 'katha';

export interface Story {
  id: string;
  title: string;
  sanskritTitle?: string;
  subtitle: string;
  collection: StoryCollection;
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

const GENERIC_COVER = require('../../assets/images/covers/generic-cover.jpg');
const RAMAYANA_COVER = require('../../assets/images/covers/ramayana-cover.png');
const KRISHNA_COVER = require('../../assets/images/covers/krishna-cover.jpg');
const DHARMA_COVER = require('../../assets/images/covers/dharma-cover.png');
const MOKSHA_COVER = require('../../assets/images/covers/moksha-cover.png');
const SAMSARA_COVER = require('../../assets/images/covers/samsara-cover.png');

// ---------------------------------------------------------------------------
// Stories of the Upanishads — the dialogues where the big ideas were born
// ---------------------------------------------------------------------------
const UPANISHAD_STORIES: Story[] = [
  {
    id: 'nachiketa',
    title: 'Nachiketa and Death',
    sanskritTitle: 'नचिकेता',
    subtitle: 'The boy who asked Death himself what dying means',
    collection: 'upanishad',
    coverImage: SAMSARA_COVER,
    kicker: "One of Hinduism's oldest stories: a fearless boy walks up to Death himself and asks the one question we all eventually face.",
    sections: [
      {
        id: 'nachiketa-intro',
        title: 'Before the story',
        storyText:
          "This is one of the oldest and most loved stories in all of Hinduism, from an ancient scripture called the **Katha Upanishad**. It is a conversation between a fearless young boy named **Nachiketa** and **Yama**, the god of death himself.\n\nThe question at its heart is the one we all eventually face: what really happens when a person dies? Watch how the boy has to *earn* his answer.",
      },
      {
        id: 'the-sacrifice',
        title: 'A sacrifice that gave away nothing',
        storyText:
          'Vajashravasa performed the great sacrifice in which everything is given away — and gave away cows too old to graze, too dry to milk. His young son Nachiketa watched the priests lead the worthless gifts off and felt the wrongness of it in his chest. A giver who gives what costs him nothing, the boy understood, earns a joyless world. So he pressed his father with an unbearable question: “And me — to whom will you give me?” Once, twice, three times he asked, until his father snapped: “To Death I give you.”',
        citation: 'Katha Upanishad 1.1.1–4',
      },
      {
        id: 'three-nights',
        title: 'Three nights at Death’s door',
        storyText:
          'A word spoken in anger is still a word, and Nachiketa took his father at it. He walked to the house of Yama, lord of death — and found the lord away. For three nights the boy waited at the door, unfed and unwelcomed: a holy guest left hungry, the texts say, is like a fire left smouldering in the house. When Yama returned, he was ashamed. “Choose three boons,” Death said, “one for each night I kept you waiting.”',
        citation: 'Katha Upanishad 1.1.7–9',
      },
      {
        id: 'two-easy-boons',
        title: 'Two boons Death was glad to grant',
        storyText:
          'The first wish was a son’s: let my father’s anger pass; let him greet me with peace when I return. Granted. The second was a seeker’s: teach me the fire ritual that leads to heaven. Yama taught it gladly, and — delighted with the boy — named the fire after him. Two boons spent, and Death waited comfortably for the third. Then Nachiketa asked it: “When a person dies, some say he exists and some say he does not. Teach me the truth of it.”',
        citation: 'Katha Upanishad 1.1.10–20',
      },
      {
        id: 'the-bribe',
        title: 'The question Death tried to buy back',
        storyText:
          'Yama flinched. “Even the gods puzzled over this. Ask anything else — sons and grandsons who live a hundred years, cattle, elephants, gold, horses, land, life as long as you wish. Beautiful attendants such as mortals never win. But do not ask me about dying.” The boy’s reply is one of the tradition’s great moments: “These things wear out, O Death. They spend the very vigor of the senses. Even the longest life is short. Keep your chariots, your dance and song. Nachiketa asks nothing else.”',
        citation: 'Katha Upanishad 1.1.23–29',
        checks: [
          {
            id: 'chk:story:nachiketa:refusal',
            kind: 'mcq',
            prompt: 'Death offered Nachiketa endless wealth, long life, and every pleasure — if only he would drop his question about dying. What did the boy say?',
            options: [
              {
                text: 'He refused it all: these things wear out, and even the longest life is short — he would take no substitute for the real answer',
                correct: true,
              },
              { text: 'He happily took the gold and forgot all about his question' },
              { text: 'He asked Death for even more than was offered' },
            ],
            why: "The good and the pleasant look alike, but the wise learn to tell them apart. Nachiketa's greatness was his refusal — he would not settle for a smaller answer.",
          },
        ],
      },
      {
        id: 'the-teaching',
        title: 'What Death taught',
        storyText:
          'Only then did Yama begin — because only someone who has refused every substitute is ready. There are two paths, he said: shreya, the good, and preya, the pleasant, and the wise learn to tell them apart. As for the self: it is not born and does not die; it did not come from anywhere and never becomes anyone. “Weapons do not cut it, fire does not burn it.” The body is a chariot, the self its rider — and the one who learns to hold the reins reaches the end of the road that has no end.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Katha Upanishad stages its lesson in its frame: the truth about death is not hidden — it simply cannot be heard by someone still bargaining. Nachiketa’s qualification was not brilliance but refusal: he would not accept a smaller answer. The boons you settle for decide the teaching you receive.',
        citation: 'Katha Upanishad 1.2.1–2, 1.2.18–23, 1.3.3',
        checks: [
          {
            id: 'chk:story:nachiketa:self',
            kind: 'mcq',
            prompt: 'When Yama finally taught him, what did he reveal about the self — the "you" underneath the body?',
            options: [
              {
                text: 'It is not born and does not die; weapons cannot cut it and fire cannot burn it — the body is a chariot, and the self is its rider',
                correct: true,
              },
              { text: 'It dies together with the body and is gone forever' },
              { text: 'It is simply another word for the body itself' },
            ],
            why: 'The truth about death was not hidden; it just could not be heard by someone still bargaining. Nachiketa qualified not by cleverness but by refusing every comfortable substitute.',
          },
        ],
      },
    ],
    reflectionQuestions: [
      'Yama offered Nachiketa everything pleasant to avoid one hard question. What comfortable substitute are you currently accepting in place of a question you actually want answered?',
      "Nachiketa's father gave away only what cost him nothing. Where in your own life are you 'giving' only what you won't really miss?",
      'The story separates what is truly good for you from what is merely pleasant. Name one place those two are pulling you in different directions right now.',
    ],
    sources: [
      { text: 'Katha Upanishad', locator: 'Valli 1–3 (the Nachiketa dialogue)' },
    ],
  },
  {
    id: 'svetaketu-salt',
    title: 'Svetaketu and the Salt',
    sanskritTitle: 'तत्त्वमसि',
    subtitle: 'The father who dissolved his son’s pride — and the self — in water',
    collection: 'upanishad',
    coverImage: MOKSHA_COVER,
    sections: [
      {
        id: 'the-proud-return',
        title: 'The student who came home proud',
        storyText:
          'Svetaketu left home at twelve and returned at twenty-four, having mastered all the Vedas — and it showed. His father Uddalaka watched the young scholar carry himself through the door and asked one quiet question: “Since you are so learned, dear boy, did you ask for that teaching by which the unheard becomes heard, the unthought becomes thought, the unknown becomes known?” Svetaketu had no idea what his father meant. “How can there be such a teaching?” There was. His whole education had missed it.',
        citation: 'Chandogya Upanishad 6.1.1–7',
      },
      {
        id: 'clay-and-gold',
        title: 'One clay, many pots',
        storyText:
          'Uddalaka began with the world’s most ordinary things. By one lump of clay, he said, everything made of clay is known — the shapes are names, ways of speaking; the reality is clay. By one nugget of gold, all things golden. By one piece of iron, all things iron. He was handing his son a new habit of seeing: beneath the endless catalogue of forms the Vedas had taught him, look for the single substance wearing them all. Then he turned the lens around — onto existence itself, and onto the boy.',
        citation: 'Chandogya Upanishad 6.1.4–6',
      },
      {
        id: 'the-salt',
        title: 'The salt in the water',
        storyText:
          '“Put this salt in water and come to me in the morning.” Svetaketu did. “Bring me the salt.” He reached into the bowl — nothing to grasp; it had dissolved. “Sip from this side. How is it?” “Salty.” “From the middle?” “Salty.” “From that side?” “Salty.” “Throw it out and come to me.” The salt was everywhere in the water and visible nowhere. “In just that way, dear boy, you do not perceive Being here — but it is here all the same. That subtle essence is the self of all this. That is truth. That is the self. Tat tvam asi — you are That.”',
        citation: 'Chandogya Upanishad 6.13.1–3',
        citationLink: 'concept:brahman-atman',
      },
      {
        id: 'nine-times',
        title: 'Nine times, patiently',
        storyText:
          'The Chandogya repeats the refrain nine times — nine images, nine rounds, the same closing words. Rivers flowing east and west lose their names in one sea; a tree struck at the root bleeds sap but lives by what pervades it; a seed of the banyan, split open, holds a nothing from which a great tree stands. After each, the father says it again: you are That. Not “you contain it” or “you may someday earn it.” Are.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The most radical claim in the Upanishads is delivered not from a mountaintop but across a kitchen bowl of salt water, from a father to a son whose education had made him proud without making him wise. The divine you search for is not produced by learning; it is what was dissolved in you all along — everywhere present, nowhere graspable.',
        citation: 'Chandogya Upanishad 6.8–6.16 (the nine tat-tvam-asi teachings)',
      },
    ],
    reflectionQuestions: [
      'Uddalaka asked whether Svetaketu had learned “that by which the unknown becomes known.” What has all your education so far left untouched?',
    ],
    sources: [
      { text: 'Chandogya Upanishad', locator: 'Chapter 6 (Uddalaka and Svetaketu)' },
    ],
  },
  {
    id: 'satyakama',
    title: 'Satyakama Jabala',
    sanskritTitle: 'सत्यकाम',
    subtitle: 'The boy admitted for telling an unflattering truth',
    collection: 'upanishad',
    coverImage: DHARMA_COVER,
    sections: [
      {
        id: 'the-question',
        title: '“What is my family name?”',
        storyText:
          'Satyakama wanted what every serious boy of his time wanted: to live with a teacher and study. But admission required lineage — and he didn’t know his. “Mother, what is my gotra?” Jabala’s answer is one of the bravest sentences in scripture: “I don’t know, my child. I served in many households in my youth, and I had you then. I do not know your father’s line. I am Jabala; you are Satyakama. Say you are Satyakama Jabala” — Satyakama, son of Jabala, a name built from his mother alone.',
        citation: 'Chandogya Upanishad 4.4.1–2',
      },
      {
        id: 'the-answer',
        title: 'The truth, told plainly',
        storyText:
          'The boy walked to the sage Gautama and asked to be taken as a student. “Of what family are you?” And Satyakama repeated it all — the serving in many households, the unknown father, the name made from his mother’s — hiding nothing, softening nothing, in front of everyone. Gautama’s reply overturns every gatekeeping instinct the culture had: “None but a brahmana could speak so plainly. Fetch the firewood, dear boy. I will initiate you — for you have not departed from the truth.”',
        citation: 'Chandogya Upanishad 4.4.3–5',
      },
      {
        id: 'the-cows',
        title: 'Four hundred lean cows',
        storyText:
          'Then the teacher did a strange thing: he gave the new student four hundred weak, lean cows and said, “Follow these.” Satyakama drove them into the wilderness and vowed not to return until they were a thousand. Years passed in silence and grass. And in that long apprenticeship to patience, the teaching came from unexpected mouths: a bull of the herd taught him one quarter of Brahman, the fire another, a swan a third, a diving bird the fourth. He returned shining. His teacher saw it from a distance: “Dear boy, you gleam like one who knows Brahman. Who taught you?”',
        citation: 'Chandogya Upanishad 4.5–4.9',
      },
      {
        id: 'the-teaching',
        title: 'The qualification that mattered',
        storyText:
          'Beings other than men taught me, Satyakama answered — but let my teacher teach me too, for knowledge learned from one’s own teacher becomes most perfect. Gautama taught him the same truth, and the text notes with quiet satisfaction: nothing was left out. Satyakama Jabala became a great teacher himself, remembered by his mother’s name.',
        sectionHeader: 'What this teaches',
        teachingText:
          'At the exact moment when lineage could have barred the door, the Upanishad rules that truthfulness — not birth — is the mark of a brahmana. The boy whose honest answer should have disqualified him was admitted because of it. Where the truth is inconvenient is precisely where it counts.',
        citation: 'Chandogya Upanishad 4.9.1–3',
      },
    ],
    reflectionQuestions: [
      'Satyakama told the one truth that could have cost him everything. What truth about yourself do you soften when introductions matter?',
    ],
    sources: [
      { text: 'Chandogya Upanishad', locator: 'Chapter 4, sections 4–9 (Satyakama Jabala)' },
    ],
  },
  {
    id: 'maitreyi',
    title: 'Yajnavalkya and Maitreyi',
    sanskritTitle: 'मैत्रेयी',
    subtitle: '“If the whole earth were mine — would it make me immortal?”',
    collection: 'upanishad',
    coverImage: MOKSHA_COVER,
    sections: [
      {
        id: 'the-departure',
        title: 'A sage divides his estate',
        storyText:
          'The sage Yajnavalkya — the towering intellect of the Brihadaranyaka — decided to leave household life for the forest. He called Maitreyi, his wife, to settle the estate between her and Katyayani, the other wife. Maitreyi let the property talk pass and asked the question that made her immortal: “If this whole earth, filled with wealth, were mine — would I become deathless by it?” “No,” said Yajnavalkya. “Your life would be the life of the wealthy. But of immortality, there is no hope through wealth.” “Then what would I do with what cannot make me deathless? Tell me, instead, what you know.”',
        citation: 'Brihadaranyaka Upanishad 2.4.1–3',
      },
      {
        id: 'dear-for-the-self',
        title: 'Not for the husband’s sake',
        storyText:
          'Yajnavalkya’s answer began with the sentence Indian philosophy has been circling ever since. “Not for the husband’s sake is the husband dear, but for the sake of the Self. Not for the wife’s sake is the wife dear, but for the sake of the Self. Not for the children’s… not for wealth’s… not for the gods’…” — down the whole list of everything humans love. Every love, he said, is the Self loving itself through a form. Therefore: it is the Self that must be seen, heard of, reflected on, deeply known. “When the Self is known, all this is known.”',
        citation: 'Brihadaranyaka Upanishad 2.4.5',
      },
      {
        id: 'the-salt-again',
        title: 'The dissolving',
        storyText:
          'Then he pressed further, into water most listeners still find cold: as a lump of salt dropped in water dissolves and cannot be picked out again — yet wherever you sip, there is salt — so this great Being is pure consciousness without edges. Arising out of the elements, one vanishes back into them. “After death, there is no separate awareness.” Maitreyi stopped him: “Now you have bewildered me, sir.” The reply: “I say nothing bewildering. Where there seems to be another, one sees another, hears another, knows another. But where everything has become one’s own Self — who is there to see whom? By what could you know the knower?”',
        citation: 'Brihadaranyaka Upanishad 2.4.12–14',
      },
      {
        id: 'the-teaching',
        title: 'What Maitreyi chose',
        storyText:
          'The dialogue preserves no record that Maitreyi flinched. She had already made her choice in the first exchange: offered a comfortable settlement, she asked for the truth instead — and the tradition remembers her, alongside Gargi, as proof that its deepest teaching was given to a woman who asked for it point-blank.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Maitreyi’s question is a test anyone can run on any acquisition: would this make me deathless? If not, it belongs to the category of the finite, and the heart’s full weight should not rest on it. Not a rejection of wealth — Yajnavalkya divided his fairly — but a refusal to confuse its category.',
        citation: 'Brihadaranyaka Upanishad 2.4 (and its reprise at 4.5)',
      },
    ],
    reflectionQuestions: [
      'Run Maitreyi’s test honestly: which pursuit currently carries a weight of hope it cannot actually hold?',
    ],
    sources: [
      { text: 'Brihadaranyaka Upanishad', locator: '2.4 and 4.5 (the Maitreyi dialogues)' },
    ],
  },
  {
    id: 'gargi',
    title: 'Gargi’s Challenge',
    sanskritTitle: 'गार्गी',
    subtitle: 'The woman who debated the greatest sage alive — twice',
    collection: 'upanishad',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-contest',
        title: 'A thousand cows with golden horns',
        storyText:
          'King Janaka of Videha staged the great debate: a thousand cows, ten gold pieces bound to every pair of horns, for whichever scholar knew Brahman best. Yajnavalkya told his student to drive the cows home before a question had been asked. The hall erupted — and its champions rose one by one to break him. One by one he answered them into silence. Then Gargi Vachaknavi stood up, the daughter of Vachaknu, one of the only women in the hall, and everyone understood the debate had just become serious.',
        citation: 'Brihadaranyaka Upanishad 3.1.1–2',
      },
      {
        id: 'the-weaving',
        title: '“On what is it all woven?”',
        storyText:
          'Her method was a loom. Everything made of water, she said — on what is it woven, warp and woof? On air, Yajnavalkya answered. And air? On the worlds of the sky. And those? Realm by realm she wove upward — worlds of the gandharvas, of the sun, the moon, the stars, the gods, of Indra, of Prajapati — until: the worlds of Brahman. “And on what are the worlds of Brahman woven?” “Gargi,” he said, “do not ask beyond. Your head will burst. You question a divinity about which further questions cannot be asked.” Gargi fell silent — and began preparing better questions.',
        citation: 'Brihadaranyaka Upanishad 3.6',
      },
      {
        id: 'two-arrows',
        title: 'Two questions like arrows',
        storyText:
          'She rose again later with a warrior’s announcement: “As a fighting man strings his bow and rises with two arrows in hand, I rise against you with two questions.” Across all of time — past, present, future — on what is everything woven? Space, he answered. “And space?” Then Yajnavalkya delivered the teaching of the akshara, the Imperishable: neither coarse nor fine, neither short nor long, without shadow, without inside or outside. “At the command of this Imperishable, Gargi, sun and moon hold their courses, heaven and earth stay apart, and rivers run from the white mountains.”',
        citation: 'Brihadaranyaka Upanishad 3.8.1–9',
      },
      {
        id: 'the-verdict',
        title: 'The verdict she pronounced',
        storyText:
          'It was Gargi — not the king, not the male champions — who rendered the hall’s final judgment: “Venerable brahmanas, count it a great thing if you escape this man with a mere bow. None of you will ever defeat him in argument about Brahman.” The sharpest questioner in the hall certified the answer.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Gargi is the tradition’s standing rebuttal to the idea that its deepest debates excluded women — she is in the arena, armed, feared, and decisive. And her method is the method: push every answer one level deeper until you reach what questions cannot go behind. Doubt, pressed honestly and all the way, arrives at reverence.',
        citation: 'Brihadaranyaka Upanishad 3.8.12',
      },
    ],
    reflectionQuestions: [
      'Gargi pressed “and on what does that rest?” until she reached bedrock. Take one belief you hold and ask it three levels down — where does yours rest?',
    ],
    sources: [
      { text: 'Brihadaranyaka Upanishad', locator: '3.6 and 3.8 (Gargi in Janaka’s debate)' },
    ],
  },
  {
    id: 'indra-virochana',
    title: 'Indra and Virochana',
    sanskritTitle: 'इन्द्र-विरोचन',
    subtitle: 'Two students, one teaching — and why only one understood it',
    collection: 'upanishad',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-announcement',
        title: 'The Self worth seeking',
        storyText:
          'Prajapati, the creator, made an announcement that carried to both heaven and the netherworld: there is a Self free from old age, death, and sorrow — and the one who finds it obtains all worlds. Both camps sent their best. The gods chose Indra, their king; the asuras chose Virochana, theirs. The two rivals arrived at the same door with firewood in hand, and lived as ordinary students for thirty-two years — kings, side by side, hauling water.',
        citation: 'Chandogya Upanishad 8.7.1–3',
      },
      {
        id: 'the-mirror',
        title: 'The answer in the mirror',
        storyText:
          'After thirty-two years, Prajapati gave his first teaching: “Look at yourselves in a pan of water. What you see — that is the Self.” They looked: two well-dressed, well-groomed reflections looked back. Both left satisfied. Virochana carried the lesson home to the asuras and it became their gospel: the body is the self; adorn it, feed it, serve it — that is everything. The Upanishad remarks, dryly, that this is still the doctrine of those who give no gifts and live for themselves.',
        citation: 'Chandogya Upanishad 8.8.1–5',
      },
      {
        id: 'indra-returns',
        title: 'The doubt that walked back',
        storyText:
          'Indra got halfway home and stopped. If the self is the reflection, then when the body is blind, the self is blind; when the body perishes, the self perishes with it. “I see no good in this.” He turned around — and paid for the question with thirty-two more years. The dream self? But the dreamer can weep in a dream. Thirty-two more. The dreamless sleeper? But that one knows nothing at all — “he has gone to annihilation.” Five more. A hundred and one years of asking the same question better.',
        citation: 'Chandogya Upanishad 8.9–8.11',
      },
      {
        id: 'the-teaching',
        title: 'The body is the mount, not the rider',
        storyText:
          'At last Prajapati gave the real teaching: this body is mortal, always held by death — but it is the standing-place of the deathless, bodiless Self. Wind has no body; cloud, lightning, thunder have no body. As they rise from space and appear in their own form, so the serene one rises from this body and appears in its own form. That — not the reflection — is the Self.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Both students heard the same words from the same teacher. The only difference was that Indra kept interrogating his satisfaction — three times he walked back with the answer everyone else would have kept. The Upanishad’s quiet joke is that the first, flattering answer is the one whole civilizations settle for. The self you see in the mirror is the beginning of the search, not its end.',
        citation: 'Chandogya Upanishad 8.12.1–3',
      },
    ],
    reflectionQuestions: [
      'Virochana left satisfied with the first answer; Indra kept walking back. Where in your life have you accepted a first, flattering answer that deserves a second look?',
    ],
    sources: [
      { text: 'Chandogya Upanishad', locator: 'Chapter 8, sections 7–12 (Prajapati’s teaching)' },
    ],
  },
  {
    id: 'two-birds',
    title: 'The Two Birds',
    sanskritTitle: 'द्वा सुपर्णा',
    subtitle: 'One eats the fruit; one watches — both are you',
    collection: 'upanishad',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-image',
        title: 'Two birds on one tree',
        storyText:
          'The Mundaka Upanishad compresses its whole psychology into a single image, two verses long. Two birds, fast friends, forever together, cling to the same tree. One eats the tree’s fruits — some sweet, some bitter — tasting each with complete involvement. The other eats nothing. It watches. The same branch, the same weather, the same fruit falling past it; the second bird simply looks on, luminous and untouched.',
        citation: 'Mundaka Upanishad 3.1.1',
      },
      {
        id: 'the-grief',
        title: 'The bird that grieves',
        storyText:
          'The eating bird has a problem: the fruits keep changing. A sweet one, then a bitter one, then a sweeter one that ends too soon — and because it is what it eats, it is dragged up and down with every taste. “Sunk on the selfsame tree,” the text says, “the deluded one grieves, helpless.” Then comes the turn, in the very same verse: when it sees the other bird — the Lord, the adored one, the witness — and understands “all this greatness is His,” its grief falls away.',
        citation: 'Mundaka Upanishad 3.1.2',
      },
      {
        id: 'reading-it',
        title: 'Reading the image',
        storyText:
          'The tree is the body, with its roots in what you cannot see. The eating bird is you as you mostly live — the experiencer, wholly identified with each pleasure and each disappointment as it arrives. The watching bird is also you: the still awareness that has observed every experience of your life without being altered by a single one of them. The image’s genius is the phrase “fast friends on the same tree” — the two are never separated, not even in your worst hour. One of them is simply forgotten.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Every contemplative practice in the tradition is, one way or another, the eating bird glancing up. You cannot stop tasting the fruit — living means eating. But the moment of remembering that something in you is watching, undisturbed, is available in the middle of any experience whatsoever. Grief, the verse insists, ends not by improving the fruit but by noticing the other bird.',
        citation: 'Mundaka Upanishad 3.1.1–2; the image recurs at Shvetashvatara Upanishad 4.6–7',
      },
    ],
    reflectionQuestions: [
      'Recall today’s most charged moment. Can you replay it now from the watching bird’s branch — what does it look like from there?',
    ],
    sources: [
      { text: 'Mundaka Upanishad', locator: '3.1.1–2' },
      { text: 'Shvetashvatara Upanishad', locator: '4.6–7 (the same image)' },
    ],
  },
  {
    id: 'bhrigu',
    title: 'Bhrigu’s Five Answers',
    sanskritTitle: 'भृगुवल्ली',
    subtitle: 'A father who refused to hand over the answer',
    collection: 'upanishad',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'teach-me-brahman',
        title: '“Teach me Brahman, father”',
        storyText:
          'Bhrigu went to his father Varuna with the direct request every student dreams of making: teach me Brahman. Varuna gave him not an answer but a definition and a method. The definition: that from which all beings are born, by which they live, into which they return — seek to know that; that is Brahman. The method, repeated after every wrong answer his son would bring back: tapasa brahma vijijnasasva — seek it through tapas, through the heat of disciplined inquiry. “Tapas is Brahman.” Then the father said nothing more.',
        citation: 'Taittiriya Upanishad 3.1',
      },
      {
        id: 'the-ladder',
        title: 'Food, breath, mind',
        storyText:
          'Bhrigu went away and burned in thought. His first answer: food — matter. Everything is born from matter, lives by it, returns to it. He brought it to his father, who said only: seek further, through tapas. So Bhrigu contemplated again and returned: prana — the life-breath. Living things are born of life, live by it, return to it. Seek further. Mind, then. Seek further. Understanding — vijnana. Seek further. Each answer was true; the text never calls one false. Each was a rung.',
        citation: 'Taittiriya Upanishad 3.2–3.5',
        citationLink: 'concept:prana',
      },
      {
        id: 'ananda',
        title: 'The last rung: joy',
        storyText:
          'Then Bhrigu saw it: ananda — bliss. From joy all beings are born; by joy, once born, they live; into joy they return. This time he did not carry the answer back, and his father did not send him further. The text simply says he became established in it, and adds a promise: the one who knows this becomes firmly grounded, possessed of food, radiant, great in offspring, cattle, and the splendor of sacred knowledge.',
        citation: 'Taittiriya Upanishad 3.6',
      },
      {
        id: 'the-teaching',
        title: 'Why Varuna stayed silent',
        storyText:
          'Varuna knew the final answer on day one. He withheld it four times — not from stinginess, but because “everything is bliss” received secondhand is a slogan, while the same sentence arrived at through the burning-through of matter, breath, mind, and intellect is a realization. The Taittiriya seals the story with its famous ledger of joys, multiplying a hundredfold rung by rung from human happiness to the bliss of Brahman — and noting, at every rung, that the sage free of craving already has it all.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Wrong answers honestly earned are the curriculum, not the failure. Each of Bhrigu’s five answers was kept, deepened, and outgrown — the tradition’s model for how understanding actually moves: not from false to true, but from true to truer.',
        citation: 'Taittiriya Upanishad 3.1–3.10; the calculus of bliss at 2.8',
      },
    ],
    reflectionQuestions: [
      'Varuna answered every finding with “seek further.” What understanding are you holding right now that might be a rung rather than the top of the ladder?',
    ],
    sources: [
      { text: 'Taittiriya Upanishad', locator: 'Bhrigu Valli (chapter 3)' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Timeless kathas — the stories told at bedtimes and gatherings for millennia
// ---------------------------------------------------------------------------
const KATHA_STORIES: Story[] = [
  {
    id: 'vishwamitra-cow',
    title: 'Vishwamitra and the Cow of Plenty',
    sanskritTitle: 'विश्वामित्र',
    subtitle: 'The king who lost to a sage — and spent lifetimes becoming one',
    collection: 'katha',
    coverImage: RAMAYANA_COVER,
    sections: [
      {
        id: 'the-visit',
        title: 'A king visits a hermitage',
        storyText:
          'Vishwamitra was a king then — a great one, touring his realm with a full army. His route passed the ashram of the sage Vasishtha, who welcomed the entire host and then did something impossible: he fed it. Every soldier, every horse, delicacies without end — all of it flowing from one radiant cow, Shabala, the wish-fulfilling cow of the hermitage. The king watched an ascetic’s single animal outproduce his whole treasury, and wanted her with an intensity that surprised him.',
        citation: 'Valmiki Ramayana, Bala Kanda 51–52',
      },
      {
        id: 'the-demand',
        title: '“Name any price”',
        storyText:
          'A hundred thousand cows for this one, the king offered. Elephants, chariots, gold — my whole kingdom if you ask it. Vasishtha refused gently and completely: Shabala was not property; she was the hermitage’s life, the source of its offerings and its hospitality. He could no more sell her than sell his own austerity. So Vishwamitra took her by force — and discovered what force is worth. At Vasishtha’s word, Shabala herself brought forth warriors by the hundreds, and the king’s army broke against what one sage’s merit could summon.',
        citation: 'Valmiki Ramayana, Bala Kanda 53–54',
      },
      {
        id: 'the-realization',
        title: 'The sentence that changed him',
        storyText:
          'Vishwamitra returned with everything royal rage could raise — his hundred sons, celestial weapons earned through austerity of his own. It all failed against the sage’s staff, planted calmly in the earth. Standing in the ruin of his power, the king spoke the sentence the tradition never tired of repeating: “Dhig balam kshatriya-balam — shame on a warrior’s strength; the strength born of brahman is strength indeed.” He laid down his kingdom like a worn garment and walked away to acquire the only power that had beaten him.',
        citation: 'Valmiki Ramayana, Bala Kanda 55–56',
      },
      {
        id: 'the-becoming',
        title: 'The longest apprenticeship',
        storyText:
          'What followed took him thousands of years of the story’s time: austerities that alarmed the gods, falls from grace — a temper that kept costing him his accumulated merit, a nymph sent to break his focus who succeeded — and always the return to the discipline. Rung by rung the titles came: royal sage, sage, great sage. He refused to stop until Vasishtha himself — the man he had wronged, whose hundred sons his fury had destroyed — freely called him Brahmarshi. And Vasishtha did.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The story stages the tradition’s hierarchy of power in one afternoon: everything a kingdom can seize loses to what austerity has earned. But its deeper teaching is in the sequel — envy transmuted into aspiration. Vishwamitra is remembered not as the king who coveted a cow but as the seer of the Gayatri mantra: proof that wanting what a better person has can, pursued long enough, make you that person.',
        citation: 'Valmiki Ramayana, Bala Kanda 51–65; Vishwamitra as seer of the Gayatri: Rig Veda 3.62.10 tradition',
      },
    ],
    reflectionQuestions: [
      'Vishwamitra turned envy of Vasishtha into a path toward becoming him. Whose quality do you envy — and what would pursuing it, rather than resenting it, look like?',
    ],
    sources: [
      { text: 'Valmiki Ramayana', locator: 'Bala Kanda, sargas 51–65' },
    ],
  },
  {
    id: 'harishchandra',
    title: 'Harishchandra',
    sanskritTitle: 'हरिश्चन्द्र',
    subtitle: 'The king who would not lie — no matter the price',
    collection: 'katha',
    coverImage: DHARMA_COVER,
    sections: [
      {
        id: 'the-promise',
        title: 'A promise to a hard sage',
        storyText:
          'Harishchandra of Ayodhya had one reputation: he had never spoken an untruth. The sage Vishwamitra — testing, the tradition says, whether such a man could exist — extracted a promise of dakshina and then claimed it in full: the kingdom itself. Harishchandra handed over his throne without argument. But a gift, once given, requires a further fee — and to pay it, the king who owned nothing sold what remained: himself, his queen Taramati, and their small son, into servitude in Kashi.',
        citation: 'Markandeya Purana (the Harishchandra episode); the truth-test is told from Aitareya Brahmana 7 onward',
      },
      {
        id: 'the-cremation-ground',
        title: 'Keeper of the burning ghat',
        storyText:
          'The king became a cremation-ground keeper — the lowest work his world knew — collecting the toll on the dead for a harsh master, sleeping among the pyres. His wife served in a household across the city. Years of this. Then their son died of a snakebite, and Taramati carried the boy to the burning ghat at night — to the toll-keeper who was his father. The scene is the tradition’s most merciless test: the tax must be paid; she has nothing but the half-sari on her body; and the keeper who demands it recognizes his wife and his dead son.',
        citation: 'Markandeya Purana (the Harishchandra episode)',
      },
      {
        id: 'the-refusal',
        title: 'The rule held',
        storyText:
          'Everything in him screamed to waive the toll. But the toll was his master’s due, not his to forgive — and waiving it for his own family, in the dark, unseen, would be the first lie of his life: a lie in action. Husband and wife, destroyed and steady, prepared to pay with the last thing they had. At that moment the sky opened. Vishwamitra appeared with the gods — the test over, the kingdom restored, the boy alive. Even the hard sage conceded that truth had a king.',
        citation: 'Markandeya Purana (the Harishchandra episode)',
      },
      {
        id: 'the-legacy',
        title: 'The story that made a Mahatma',
        storyText:
          'Millennia later, a schoolboy in Gujarat watched a play about Harishchandra and could not stop thinking about it. “Why should not all be truthful like Harishchandra?” he wrote later. “To follow truth and to go through all the ordeals Harishchandra went through was the one ideal it inspired in me.” The boy was Mohandas Gandhi, and satyagraha — the force of truth — descends recognizably from a king at a cremation ground refusing the easy exception.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The story is deliberately extreme: it removes every cushion, then asks whether truth is a policy or an identity. A policy bends when the cost is your child. The tradition’s answer — that the universe itself ultimately rearranges around the person who will not bend — is less a promise about outcomes than a portrait of what integrity means when it is total.',
        citation: 'Gandhi on Harishchandra: An Autobiography, Part I',
      },
    ],
    reflectionQuestions: [
      'Harishchandra refused the exception no one would ever have discovered. Where do you currently permit yourself the unseen exception?',
    ],
    sources: [
      { text: 'Markandeya Purana', locator: 'Harishchandra episode (cantos 7–8)' },
      { text: 'Aitareya Brahmana', locator: 'Book 7 (the earliest Harishchandra material)' },
    ],
  },
  {
    id: 'dhruva',
    title: 'Dhruva, the Unmoving Star',
    sanskritTitle: 'ध्रुव',
    subtitle: 'A five-year-old’s wounded pride became the fixed point of the sky',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-lap',
        title: 'The lap he was lifted from',
        storyText:
          'Dhruva was five, the son of King Uttanapada by Queen Suniti — the less-favored wife. One day he climbed happily onto his father’s lap beside his half-brother, and the favored queen, Suruchi, lifted him off with words no child should hear: this lap is not for you; you were not born from me; go pray to be reborn as my son. His father said nothing. Dhruva went to his mother, shaking. Suniti, herself powerless at court, gave him the only counsel she had: only the Lord can grant what you weep for. And the five-year-old took her literally — he walked out to find Him.',
        citation: 'Bhagavata Purana, Canto 4, Chapter 8',
      },
      {
        id: 'the-forest',
        title: 'Six months in the forest',
        storyText:
          'The sage Narada intercepted the small runaway and tried to send him home — you are a child; austerity is hard even for sages. The child would not turn. So Narada gave him the method instead: a mantra — om namo bhagavate vasudevaya — and a place by the Yamuna. Dhruva’s tapas escalated month by month: fruit, then leaves, then water, then air, then standing on one leg, a five-year-old whose concentration began to alarm the cosmos. When he held his breath, the text says, the three worlds choked with him.',
        citation: 'Bhagavata Purana, Canto 4, Chapters 8–9',
      },
      {
        id: 'the-darshan',
        title: 'The Lord who came in person',
        storyText:
          'Vishnu came — not in a dream, in person. And the boy who had marched into the forest to win a better lap found that in the presence itself, the grievance had gone quiet. He is given the boon anyway, larger than his asking: a realm that does not move. But the Bhagavata records his confession first: “I sought fragments of glass and found a diamond.” He went home, was embraced by a repentant father — even Suruchi blessed him — ruled long and well, and at the end rose to the fixed point of the northern sky.',
        citation: 'Bhagavata Purana, Canto 4, Chapters 9 and 12',
      },
      {
        id: 'the-teaching',
        title: 'The pole star',
        storyText:
          'Every other light in the night sky wheels; Dhruva-tara holds still, and the wheeling sky turns around it. The tradition made the astronomy a theology: this is what becomes of a heart that stops orbiting approval.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The story is honest about its starting point — Dhruva’s quest began in humiliation and wounded pride, not holiness. The tradition does not require pure motives to begin; it requires that you actually begin. Walk far enough toward the Lord for a small enough reason, and the reason itself is what gets transformed on the way.',
        citation: 'Bhagavata Purana, Canto 4, Chapter 12 (Dhruva-loka)',
      },
    ],
    reflectionQuestions: [
      'Dhruva began for the wrong reason and it became the right one on the way. What worthy thing are you postponing until your motives feel purer?',
    ],
    sources: [
      { text: 'Bhagavata Purana', locator: 'Canto 4, Chapters 8–12' },
    ],
  },
  {
    id: 'markandeya',
    title: 'Markandeya and the Noose of Death',
    sanskritTitle: 'मार्कण्डेय',
    subtitle: 'Destined to die at sixteen — he embraced the deathless instead',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-choice',
        title: 'A short life, brightly lit',
        storyText:
          'The sage Mrikandu and his wife, childless for years, won a boon from Shiva — with a condition attached shaped like a blade: a mediocre son with a long life, or an extraordinary one who would die at sixteen. They chose the extraordinary boy. Markandeya grew exactly as promised — radiant, devoted, learned beyond his years — while his parents’ joy ran on a visible clock. As the sixteenth year approached, the boy noticed their faces and asked. They told him. He did not spend his last year grieving; he spent it in worship.',
        citation: 'Shiva Purana (the Markandeya episode); also told in the Skanda Purana',
      },
      {
        id: 'the-noose',
        title: 'The noose falls',
        storyText:
          'On the appointed day, Markandeya sat before the Shiva linga, arms wrapped around it, chanting the panchakshara — om namah shivaya. Yama’s messengers came and could not approach the boy. So Death came himself, mounted on his buffalo, and threw the noose. It settled over the boy — and over the linga he was embracing. The rope of Death had been thrown around Shiva.',
        citation: 'Shiva Purana (the Markandeya episode)',
        citationLink: 'deity:shiva',
      },
      {
        id: 'kalantaka',
        title: 'The Ender of the Ender',
        storyText:
          'The linga split open and Shiva emerged in fury — Kalantaka, the Ender of Time itself — and struck Yama down where he stood. The universe wobbled: with Death dead, the order of the worlds began to fail, and the gods pleaded. Shiva revived Yama on one condition: the boy is mine. Markandeya would remain sixteen forever — the age of his sentence became the age of his immortality. The tradition holds him alive still, one of the chiranjivis, the deathless ones.',
        citation: 'Shiva Purana (Shiva as Kalantaka); the chiranjivi tradition',
      },
      {
        id: 'the-teaching',
        title: 'What the embrace means',
        storyText:
          'The image the story leaves behind is precise: the noose could not take the boy without taking what the boy was holding. That is the whole theology of refuge, drawn in one picture.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Markandeya did not become strong enough to fight Death; he attached himself to what Death cannot touch. The tradition’s claim is not that devotion extends the lifespan — it is that a life wrapped around the deathless participates in it. His parents’ choice haunts the story productively: they chose depth over duration, and depth, it turned out, contained duration.',
        citation: 'Shiva Purana; the Mahamrityunjaya mantra tradition associates his rescue with Rig Veda 7.59.12',
      },
    ],
    reflectionQuestions: [
      'Given the parents’ choice — the long ordinary life or the short extraordinary one — which do your actual daily choices show you choosing?',
    ],
    sources: [
      { text: 'Shiva Purana', locator: 'The Markandeya episode' },
      { text: 'Skanda Purana', locator: 'Parallel telling' },
    ],
  },
  {
    id: 'ekalavya',
    title: 'Ekalavya’s Thumb',
    sanskritTitle: 'एकलव्य',
    subtitle: 'The greatest archer in the story — and the price he was made to pay',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-rejection',
        title: 'Turned away at the door',
        storyText:
          'Ekalavya, a Nishada — a boy of the forest tribes — came to Drona, teacher of princes, asking to learn archery. Drona refused him. The Mahabharata is candid about why: the master could not accept a tribal boy alongside Kuru princes, and he had promised Arjuna preeminence. Ekalavya bowed, touched the teacher’s feet, and walked back into the forest. What he did there is the part every Indian child knows: he shaped a clay image of Drona, installed it as his guru, and practiced before it with a discipline no living teacher was supervising.',
        citation: 'Mahabharata, Adi Parva (the Ekalavya episode)',
      },
      {
        id: 'the-discovery',
        title: 'Thirteen arrows in a barking mouth',
        storyText:
          'Years later the princes’ hunting dog ran ahead into the forest and came back silenced — its barking mouth stitched shut by seven arrows, placed so precisely the dog was unhurt. Arjuna stared at the shooting and felt the ground shift under his promised supremacy. They found the archer: a forest boy in deerskin who introduced himself, with devastating innocence, as a disciple of Drona. The teacher who had refused to teach him had taught him anyway — as clay, as absence, as an ideal held utterly.',
        citation: 'Mahabharata, Adi Parva (the Ekalavya episode)',
      },
      {
        id: 'the-dakshina',
        title: 'The fee',
        storyText:
          'Drona, with Arjuna’s eyes on him, went to the boy and invoked the teacher’s right: if I am your guru, pay my dakshina. Anything, said Ekalavya. “Your right thumb.” The Mahabharata does not soften what happens next: with a cheerful face — the text insists on the cheerful face — Ekalavya cut off the thumb that made him the greatest archer alive and placed it before the clay image’s original. He shot afterward with his remaining fingers. He was never again supreme. Arjuna’s promise was safe.',
        citation: 'Mahabharata, Adi Parva (the Ekalavya episode)',
      },
      {
        id: 'the-teaching',
        title: 'A wound the epic leaves open',
        storyText:
          'Here is what must be said honestly: the epic does not punish Drona for this, and does not pretend it was just. It simply shows you the perfect student, the compromised teacher, and the gatekeeping that maimed excellence to protect privilege — and lets the injustice stand in the record, where it has disturbed readers for two thousand years. Later tradition made Ekalavya a byword for devotion; modern India has equally made him a byword for what caste costs the gifted.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Two teachings share this story without resolving. One: devotion so complete that it learns from a teacher’s mere image — the inner guru is real, and Ekalavya proves it. The other: institutions that demand loyalty owe justice in return, and the epic preserves — perhaps deliberately — the case where they didn’t. Hold both. The tradition at its best does.',
        citation: 'Mahabharata, Adi Parva; Ekalavya’s later appearances: Sabha and Drona Parvas',
      },
    ],
    reflectionQuestions: [
      'Ekalavya’s story holds perfect devotion and plain injustice in one frame. Which half of it do you instinctively look away from — and why?',
    ],
    sources: [
      { text: 'Mahabharata', locator: 'Adi Parva, Sambhava sub-parva (the Ekalavya episode)' },
    ],
  },
  {
    id: 'shibi',
    title: 'King Shibi and the Dove',
    sanskritTitle: 'शिबि',
    subtitle: 'Refuge, weighed on a scale against a king’s own flesh',
    collection: 'katha',
    coverImage: DHARMA_COVER,
    sections: [
      {
        id: 'the-dove',
        title: 'A dove in the lap',
        storyText:
          'A dove burst into King Shibi’s court and dove into his lap, trembling — a hawk a wingbeat behind it. The dove begged refuge. The hawk landed and made its case, and the case was good: I am starving; this dove is my lawful food; by protecting it you rob me. Feed my hunger or you have merely transferred the injustice. Shibi accepted both claims completely — the dove’s right to refuge, the hawk’s right to food — and looked for the only currency that could satisfy both.',
        citation: 'Mahabharata, Vana Parva (the Shibi episode); also told in the Shibi Jataka',
      },
      {
        id: 'the-scale',
        title: 'Flesh for flesh',
        storyText:
          'A scale was brought. The dove sat in one pan; Shibi cut flesh from his own thigh into the other. The dove was heavier. He cut more — from his arms, his body — and the scale would not balance; the small gray bird outweighed everything a king could carve from himself. Understanding at last what was being weighed, Shibi stepped into the pan entire: take all of it. The court wept. The scale moved.',
        citation: 'Mahabharata, Vana Parva (the Shibi episode)',
      },
      {
        id: 'the-reveal',
        title: 'The gods in disguise',
        storyText:
          'The hawk blazed into Indra, the dove into Agni — gods, come to test the famous compassion of Shibi and finding it bottomless. His body was restored whole; his name entered the short list the epics reach for whenever generosity needs a superlative. The Buddhists kept the story too, as a Jataka of the Bodhisattva: some stories are too necessary for one tradition to hold alone.',
        citation: 'Mahabharata, Vana Parva; Shibi Jataka (Jataka 499)',
      },
      {
        id: 'the-teaching',
        title: 'What refuge costs',
        storyText:
          'The story’s engine is the hawk’s argument — protection that merely moves the harm elsewhere is not dharma but bookkeeping. Shibi’s greatness is that he accepts the full bill.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Sharanagati — giving refuge — is treated by the tradition as near-absolute: the one who surrenders to your protection acquires a claim on you that grows, not shrinks, as the price rises. And the scale’s arithmetic teaches the harder lesson: partial sacrifice kept trying to make the problem someone else’s. Only when Shibi offered the whole self did the weighing end.',
        citation: 'The refuge ethic across the epics; cf. Ramayana, Yuddha Kanda (Vibhishana’s refuge)',
      },
    ],
    reflectionQuestions: [
      'The hawk’s challenge: is your kindness ever just moving the cost to someone out of view? Trace one act of generosity to where its bill actually landed.',
    ],
    sources: [
      { text: 'Mahabharata', locator: 'Vana Parva (Shibi tested by Indra and Agni)' },
      { text: 'Jataka tales', locator: 'Shibi Jataka, no. 499' },
    ],
  },
  {
    id: 'sudama',
    title: 'Sudama’s Handful of Rice',
    sanskritTitle: 'सुदामा',
    subtitle: 'A poor man’s gift, and the friend who understood it',
    collection: 'katha',
    coverImage: KRISHNA_COVER,
    sections: [
      {
        id: 'the-friend',
        title: 'The friend from school',
        storyText:
          'Sudama and Krishna had shared a guru’s hut as boys — gathered firewood together, been soaked by the same rains. Then their roads forked absolutely: Krishna to the golden city of Dwaraka, Sudama to a brahmana’s poverty so complete his children went hungry. It was his wife who finally pushed him: your friend is the Lord of Dwaraka — go to him. Sudama agreed, on one condition of his own dignity: one does not visit a friend empty-handed. The house could afford exactly this: a few fistfuls of flattened rice, poha, tied in a rag.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 80',
      },
      {
        id: 'the-welcome',
        title: 'The king who washed his feet',
        storyText:
          'What happened at the palace gate is the scene painters never tire of: Krishna saw the road-worn brahmana from the terrace, ran — ran — down, embraced him, seated him on his own couch, and washed his feet with his own hands while queens fanned the guest. They talked all night about the guru’s hut and the storm they once weathered in a forest. And the whole time, Sudama kept the shameful little bundle hidden behind him — poha, in a palace of gold.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 80',
        citationLink: 'deity:krishna',
      },
      {
        id: 'the-bundle',
        title: '“What have you brought me?”',
        storyText:
          'Krishna knew, of course. “My friend, what have you brought me from home?” — and pulled the rag bundle out of hiding while Sudama died of embarrassment. Then the Lord of the universe ate a fistful of the flattened rice with unfeigned delight and reached for a second; the text says his queen caught his hand — enough, the first fistful had already signed over more than worlds. Sudama spent the visit unable to ask for anything, and left without asking. He walked home rehearsing how to explain to his wife that he had simply… forgotten.',
        citation: 'Bhagavata Purana, Canto 10, Chapter 81',
      },
      {
        id: 'the-return',
        title: 'The house that wasn’t there',
        storyText:
          'Where his hut had stood: a palace, gardens, his children fed and shining. Sudama understood in a single look, and the Bhagavata gives him the story’s real ending — wealth arrived, and he remained exactly the person who had hidden the bundle out of humility, unattached to the palace as he had been undestroyed by the hut.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The Gita’s promise — a leaf, a flower, water, offered with love, I accept — is this story in doctrine form. What moved Krishna was not the rice but the cost: poha was everything Sudama’s house could give, and the friendship asked for nothing. Grace, the story insists, reads the proportion, not the amount — and answers what was never asked aloud.',
        citation: 'Bhagavata Purana 10.81; the principle: Bhagavad Gita 9.26',
      },
    ],
    reflectionQuestions: [
      'Sudama gave what was everything to him and asked for nothing. When you last gave, was it measured by amount or by proportion — and did strings come attached?',
    ],
    sources: [
      { text: 'Bhagavata Purana', locator: 'Canto 10, Chapters 80–81' },
    ],
  },
  {
    id: 'gajendra',
    title: 'Gajendra’s Surrender',
    sanskritTitle: 'गजेन्द्रमोक्ष',
    subtitle: 'The elephant who fought for a thousand years — and won by giving up',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-lake',
        title: 'The king of elephants',
        storyText:
          'Gajendra led his herd through mountain forests like the monarch he was — strong past measuring, protector of hundreds. On a hot day he waded into a lotus lake to drink and play, and a crocodile took him by the leg. An elephant is mightier than a crocodile — on land. In the water, the crocodile’s home, the equation reverses. Gajendra pulled; the crocodile held. The herd gathered, trumpeted, tried, and could not help. Eventually — the Bhagavata says the struggle ran a thousand years — the herd went home. Strength was the whole of Gajendra’s identity, and strength was failing.',
        citation: 'Bhagavata Purana, Canto 8, Chapter 2',
      },
      {
        id: 'the-flower',
        title: 'The trunk that lifted a lotus',
        storyText:
          'At the very end of his strength, Gajendra did the two things left to a creature with nothing: with his trunk he lifted one lotus from the lake toward the sky, and he cried out — not to his herd, not to his own might, but to the refuge of the refugeless, the unborn Lord of all. The Bhagavata gives the drowning elephant a full hymn, verses of startling philosophy in the mouth of an animal: to Him who is the seer whom the seen cannot reach, the self of all — I bow.',
        citation: 'Bhagavata Purana, Canto 8, Chapter 3 (the Gajendra Stuti)',
      },
      {
        id: 'the-rescue',
        title: 'The Lord who came running',
        storyText:
          'Vishnu came at once — the texts emphasize the haste: Garuda left behind, the Lord arriving disheveled, discus already spinning. The crocodile was cut away; the elephant was lifted whole. And then the disclosures: the crocodile had been a gandharva under a curse, freed by the touch; Gajendra himself had been a great devotee-king in a former life, whose old devotion ripened in the moment the lotus went up. Nothing in the story, it turns out, was only what it looked like.',
        citation: 'Bhagavata Purana, Canto 8, Chapter 4',
      },
      {
        id: 'the-teaching',
        title: 'Where self-effort ends',
        storyText:
          'The tradition recites Gajendra Moksha in the morning, and in hospital corridors, and whenever strength has done all it can. The sequence is the teaching: the cry was not the first resort but the last — and it worked instantly, where a thousand years of magnificent effort had not.',
        sectionHeader: 'What this teaches',
        teachingText:
          'This is the tradition’s cleanest picture of sharanagati, surrender: not laziness — Gajendra fought longer than anyone could ask — but the honest recognition of the boundary where my power ends. The lotus matters too: even at the bottom of his strength, the offering went up with the cry. Empty hands can still hold one flower.',
        citation: 'Bhagavata Purana, Canto 8, Chapters 2–4; the offering principle: Bhagavad Gita 9.26',
      },
    ],
    reflectionQuestions: [
      'Gajendra cried out only after a thousand years of self-reliance. What are you still fighting alone past the point where fighting alone works?',
    ],
    sources: [
      { text: 'Bhagavata Purana', locator: 'Canto 8, Chapters 2–4 (Gajendra Moksha)' },
    ],
  },
  {
    id: 'prahlada-full',
    title: 'Prahlada and the Pillar',
    sanskritTitle: 'प्रह्लाद',
    subtitle: 'The boy whose faith outlasted poison, elephants, fire — and his father',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-house',
        title: 'Born in the wrong house',
        storyText:
          'Hiranyakashipu had austerity-earned boons that made him nearly unkillable — not by man or beast, not indoors or outdoors, not by day or night, not on earth or in sky, by no weapon — and a grievance: Vishnu had slain his brother. He outlawed the Lord’s name in his own realm and demanded worship of himself. Into this house his son Prahlada was born — and came home from his first lessons praising Vishnu. The teachers were changed. The lessons were corrected. The boy, sweetly and immovably, kept praising.',
        citation: 'Bhagavata Purana, Canto 7, Chapters 4–5',
      },
      {
        id: 'the-attempts',
        title: 'Everything a tyrant could try',
        storyText:
          'What follows is a catalogue the tradition tells with dark humor: poison, that failed; war elephants, that knelt; serpents; cliffs; and the bonfire with aunt Holika, she of the fireproof boon, who burned while the boy in her lap walked out singing — the night Holi still remembers. Between attempts, the father demanded: where is this Vishnu of yours? And Prahlada gave the answer that doomed the tyrant: everywhere. In this wall? In that pillar? “In the pillar, and in the smallest twig.”',
        citation: 'Bhagavata Purana, Canto 7, Chapters 5–8; Holika: the Holi tradition',
        citationLink: 'festival:holi-2025',
      },
      {
        id: 'narasimha',
        title: 'The pillar answers',
        storyText:
          'Hiranyakashipu struck the pillar to mock the claim — and the pillar split. What came out was Narasimha: man-lion, neither man nor beast; at twilight, neither day nor night; on the palace threshold, neither indoors nor out; who laid the king across his lap, neither earth nor sky; and opened him with claws, no weapon at all. Every clause of the boon honored; the boon useless. The rage that followed would not cool until the gods sent the one being Narasimha had done it all for — the boy, who walked up and touched the man-lion’s mane.',
        citation: 'Bhagavata Purana, Canto 7, Chapter 8',
      },
      {
        id: 'the-teaching',
        title: 'The boon and the loophole',
        storyText:
          'Offered any blessing, Prahlada asked for nothing — and then, pressed, asked for one thing: liberation for his father. He was made king of the asuras and ruled as the tradition’s proof that where you are born does not decide what you are.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Hiranyakashipu’s boon is the tradition’s parable about control: he legislated every case he could imagine, and reality arrived through the cases he couldn’t. Prahlada is the counter-figure — no protections at all, only trust, and untouchable. The story asks which security you are building.',
        citation: 'Bhagavata Purana, Canto 7, Chapters 9–10',
      },
    ],
    reflectionQuestions: [
      'Hiranyakashipu closed every loophole and lost; Prahlada held none and was safe. Which of the two strategies does your planning more resemble?',
    ],
    sources: [
      { text: 'Bhagavata Purana', locator: 'Canto 7, Chapters 4–10' },
    ],
  },
  {
    id: 'savitri-full',
    title: 'Savitri and Yama',
    sanskritTitle: 'सावित्री',
    subtitle: 'She followed Death down the road — and out-argued him',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-choice',
        title: 'A bride who chose knowingly',
        storyText:
          'Princess Savitri, sent to choose her own husband, came home having chosen Satyavan — a prince living in forest exile with his blind, dethroned father. The sage Narada delivered the verdict on her choice: perfect in every virtue, and fated to die in exactly one year. Her father begged her to choose again. Her answer became the model of resolve the tradition quotes: a choice is made once. She married him, counted the days in secret, and for the last three fasted and stood vigil.',
        citation: 'Mahabharata, Vana Parva (the Pativrata-mahatmya, chapters 293–294)',
      },
      {
        id: 'the-day',
        title: 'The appointed day',
        storyText:
          'On the day itself she would not leave his side; she walked with him into the forest to cut wood. Mid-swing, Satyavan complained of a splitting pain, lay down with his head in her lap, and stopped. Then Savitri saw what the living do not see: a figure of dark majesty with a noose, drawing something thumb-sized and radiant out of her husband’s body. Yama himself had come — the prince deserved the courtesy. He carried the soul south. Savitri set her husband’s head gently on the earth and followed.',
        citation: 'Mahabharata, Vana Parva, chapter 296',
      },
      {
        id: 'the-argument',
        title: 'The debate on the road of the dead',
        storyText:
          '“Turn back,” said Death. “This is the way of the dead, and your debt to him is paid.” Savitri answered with dharma — on friendship with the good, on the duties of the virtuous, on mercy — each speech so precise that Yama, delighted despite himself, granted a boon: anything but the life. Her father-in-law’s sight. His kingdom. A hundred sons for her own father. Still she followed, still she argued, until Yama granted one boon more, unconditional this time — and she asked for a hundred sons *by Satyavan*. Death stood checkmated by his own generosity: no consistent universe could grant it and keep the man. Yama laughed, and untied the noose.',
        citation: 'Mahabharata, Vana Parva, chapters 296–297',
      },
      {
        id: 'the-teaching',
        title: 'What Savitri won with',
        storyText:
          'Satyavan woke in her lap as from a sleep. Every boon unfolded on their walk home — the sight, the kingdom, all of it. The epic gives the victory not to a warrior or a sage but to a young woman armed with clear thinking and a refusal to stop walking.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Savitri never once asks Death for an exception; she reasons within the rules until the rules themselves return her husband. The tradition holds her up not for dying devotion but for the rarer thing — devotion that thinks. Love, argued flawlessly and refused nothing less than everything, is the strongest force in the epic’s universe.',
        citation: 'Mahabharata, Vana Parva, chapters 293–299; Vat Savitri vrat: living tradition',
      },
    ],
    reflectionQuestions: [
      'Savitri prevailed by reasoning inside the rules, not pleading for exceptions. Where are you pleading for an exception when you could be constructing a better argument?',
    ],
    sources: [
      { text: 'Mahabharata', locator: 'Vana Parva, chapters 293–299 (Pativrata-mahatmya)' },
    ],
  },
  {
    id: 'ganesha-moon',
    title: 'Ganesha and the Moon’s Laughter',
    sanskritTitle: 'गणेश-चन्द्र',
    subtitle: 'Why you don’t look at the moon on Ganesh Chaturthi',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-feast',
        title: 'Too many modaks',
        storyText:
          'On his birthday feast, Ganesha ate as only Ganesha can — modak after modak, until his belly was drum-tight — then set off home through the night on his mouse. A snake slid across the path; the mouse startled; the god of auspicious beginnings tumbled off, and his overfull belly split, spilling modaks across the road. Ganesha, unbothered, gathered them back, packed them in, and tied the snake around his middle as a belt. From the night sky came a sound: Chandra, the beautiful moon, was laughing at him.',
        citation: 'Puranic tradition (told in the Ganesha Purana tradition); the snake-belt is standard Ganesha iconography',
      },
      {
        id: 'the-curse',
        title: 'The curse on beauty',
        storyText:
          'Ganesha’s response was instant and precise: you, so proud of your loveliness that you mock others’ bodies — vanish. Let no one see you at all. The moon went dark, and the nights went wrong; the tides, the calendars, the night-blooming world all staggered. The gods interceded, and Chandra apologized. Ganesha softened the sentence: the moon would wax and wane forever — beauty on a schedule of humility — and on one night alone, Ganesh Chaturthi, looking at him would bring false accusation on the looker.',
        citation: 'Puranic tradition; the waxing-waning etiology as traditionally told',
      },
      {
        id: 'krishna-and-the-jewel',
        title: 'Even Krishna wasn’t exempt',
        storyText:
          'The tradition tells that Krishna himself glimpsed the Chaturthi moon in a dish of milk — and was promptly accused, falsely, of stealing the Syamantaka jewel. It took recovering the gem in battle to clear his name; the Bhagavata carries the jewel story in full. The custom survives across India: on Ganesha’s festival night, eyes down — and if you slip, the remedy is to hear the Syamantaka tale, which the tradition prescribes as the cure for moon-glance misfortune.',
        citation: 'The Syamantaka episode: Bhagavata Purana, Canto 10, Chapters 56–57; its Chaturthi linkage: Puranic tradition',
      },
      {
        id: 'the-teaching',
        title: 'A folk tale with a spine',
        storyText:
          'It is a bedtime story — a tumbling god, a giggling moon, a snake for a belt — and it carries a serious spine: the story never mocks Ganesha’s body. The mockery is the transgression; the pot-bellied, elephant-headed god is the standard of the sacred.',
        sectionHeader: 'What this teaches',
        teachingText:
          'The tradition put its anti-body-shaming lesson in the sky, on a repeating schedule: the moon’s monthly thinning is beauty doing penance for laughing at a body it thought lesser. And Ganesha’s own response to his tumble — repack the modaks, belt on the snake, carry on — is the working definition of dignity the story actually recommends.',
        citation: 'Told as Puranic and folk tradition, cited honestly as such',
      },
    ],
    reflectionQuestions: [
      'The moon lost its light for laughing at a body. What do you privately mock that this story would put on your own account?',
    ],
    sources: [
      { text: 'Ganesha Purana tradition', locator: 'The Chandra episode (folk and Puranic telling)' },
      { text: 'Bhagavata Purana', locator: 'Canto 10, Chapters 56–57 (Syamantaka)' },
    ],
  },
  {
    id: 'samudra-manthan-full',
    title: 'The Churning of the Ocean',
    sanskritTitle: 'समुद्रमन्थन',
    subtitle: 'Poison first, nectar last — the full story of the great churning',
    collection: 'katha',
    coverImage: GENERIC_COVER,
    sections: [
      {
        id: 'the-setup',
        title: 'A curse, a truce, a mountain',
        storyText:
          'The sage Durvasa’s slighted garland became a curse, and the gods began to age and lose to the asuras. Vishnu’s counsel was strange: make peace with your enemies — you will need their arms. So gods and demons together uprooted Mount Mandara for a churning rod, coaxed the serpent king Vasuki into service as the rope, and set the mountain in the ocean of milk — where it promptly began to sink, until Vishnu descended as Kurma, the tortoise, and bore the mountain on his back. The greatest of collaborations rested on the back of a helper no one could see.',
        citation: 'Bhagavata Purana, Canto 8, Chapters 5–7; Vishnu Purana 1.9',
      },
      {
        id: 'the-poison',
        title: 'Halahala',
        storyText:
          'They churned — demons at the head of the snake, gods at the tail — and the first thing the ocean yielded was not treasure. Halahala rose: a poison thick enough to end every world, and both armies fled what they had made together. It was Shiva — outside the whole enterprise, wanting nothing from the ocean — who cupped the poison and drank, and Parvati who pressed his throat so it would go no further down. It lodged there, staining his throat blue forever: Neelakantha. The churning resumed only because someone absorbed what it produced.',
        citation: 'Bhagavata Purana, Canto 8, Chapter 7',
        citationLink: 'deity:shiva',
      },
      {
        id: 'the-treasures',
        title: 'Fourteen treasures',
        storyText:
          'Then the ocean began to give: the wish-cow Kamadhenu; the moon, which Shiva took for his hair; the seven-headed horse and the white elephant Airavata; the Kaustubha gem; the wish-tree; the apsaras; Varuni; and then Lakshmi herself, radiant on a lotus, who surveyed both armies and chose Vishnu’s chest for her eternal home. Last came Dhanvantari, physician of the gods, carrying the pot of amrita — and the truce died on the spot: the asuras seized the pot and ran.',
        citation: 'Bhagavata Purana, Canto 8, Chapter 8',
      },
      {
        id: 'mohini',
        title: 'The enchantress and the eclipse',
        storyText:
          'Vishnu became Mohini — beauty that ended the argument — and offered to distribute the nectar fairly. The asuras, enchanted, agreed to rows. She served the gods first; one asura, Rahu, saw through it and sat among the gods. The sun and moon pointed him out just as the nectar touched his lips, and Mohini’s discus took his head — now immortal, and swallowing the informants at intervals ever since: the tradition’s account of the eclipse. Four drops of amrita, tradition adds, fell at Prayag, Haridwar, Ujjain, and Nashik — where the Kumbh Mela gathers to this day.',
        sectionHeader: 'What this teaches',
        teachingText:
          'Every serious effort churns up poison before nectar — and the poison must be swallowed by someone willing, usually someone who wanted nothing from the project. The treasures come mid-effort and are all distractions before the last one. And the amrita arrives only after the partnership collapses, through wisdom wearing an unexpected form. It is the tradition’s complete theory of great undertakings, told as one story.',
        citation: 'Bhagavata Purana, Canto 8, Chapters 8–12; the Kumbh drops: Puranic tradition',
      },
    ],
    reflectionQuestions: [
      'In your current great churning, which stage are you at — the poison, the distracting treasures, or the fight over the nectar — and who is your Kurma, bearing weight unseen?',
    ],
    sources: [
      { text: 'Bhagavata Purana', locator: 'Canto 8, Chapters 5–12' },
      { text: 'Vishnu Purana', locator: '1.9' },
    ],
  },
];

export const ALL_STORIES: Story[] = [...UPANISHAD_STORIES, ...KATHA_STORIES];

export const getStoryById = (id: string): Story | undefined =>
  ALL_STORIES.find(s => s.id === id);

export const getStoriesByCollection = (collection: StoryCollection): Story[] =>
  ALL_STORIES.filter(s => s.collection === collection);

// Journey Module 2 additions, in teaching order (appended after Gita 18 —
// existing journey positions never move; this list is append-only).
export const UPANISHAD_JOURNEY_ORDER: string[] = [
  'nachiketa',
  'svetaketu-salt',
  'satyakama',
  'maitreyi',
  'gargi',
  'indra-virochana',
  'two-birds',
  'bhrigu',
];
