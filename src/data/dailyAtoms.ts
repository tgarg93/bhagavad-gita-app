// Daily Chai atoms: one small, cited piece of wisdom per day. Each atom hands
// the thread to Krishna, and — where the app actually holds the cited text —
// links to it. Selection is deterministic per date so the brief is stable
// across the day and across devices.
//
// Citation standard matches the rest of the app: every claim traces to a
// named text (famous, publicly verifiable loci only); practices without a
// scriptural source say so and cite the tradition honestly.
import { getFestivalLensFor } from './festivals';
import { hasReaderContent } from './readerContent';
import { getDailyVerse } from './dailyVerse';

export type AtomType =
  | 'why'
  | 'saying'
  | 'word'
  | 'story'
  | 'question'
  | 'verse'
  | 'festival'
  | 'compare'
  | 'discovery';

export const ATOM_TAGS: Record<AtomType, string> = {
  why: 'Why do we…?',
  saying: 'A saying to carry',
  word: 'Sanskrit word',
  story: 'Story moment',
  question: 'A question to sit with',
  verse: "Today's verse",
  festival: 'Festival lens',
  compare: 'Across traditions',
  // Fallback label only; a discovery atom always carries a kind-specific
  // `tagOverride` ("Meet a deity", "An idea to explore", …) built by
  // dailyPickService, which the card prefers over this.
  discovery: 'Something to discover',
};

export interface DailyAtom {
  id: string;
  type: AtomType;
  hook: string; // the question or line that opens the day
  body: string; // 2-4 sentences, English-first
  citation: string;
  // Where the CITED text lives in the app, in the permanent content-ref form,
  // with an optional `#fragment` naming the exact spot:
  //   'gita:2#47'                                 → chapter 2, verse 47
  //   'scripture:isha-upanishad#isha-first-verse' → that section of the reader
  // Set this ONLY when the app really holds the cited text. Roughly half the
  // atoms cite Puranas, the Rig Veda, Brihadaranyaka or the Mahabharata, none of
  // which have a reader — those leave it unset and the citation stays plain
  // text. Do not substitute a loosely-related concept: this replaced an
  // `AtomLink` "further reading" field that did exactly that, so a card citing
  // the Isha Upanishad opened Karma.
  sourceRef?: string;
  // Overrides ATOM_TAGS[type] in the card's eyebrow row. Only discovery atoms
  // set this, so the tag can name the specific content kind ("Meet a deity")
  // rather than a generic "Something to discover".
  tagOverride?: string;
  krishnaPrompt: string; // pre-seeded question for Ask Krishna
  // Structured Sanskrit for the word/saying/verse card treatments (and their
  // narration): the Devanagari is displayed prominently and spoken with the
  // Hindi voice; hook/body stay English-first for notifications & Krishna.
  sanskrit?: {
    devanagari: string;
    transliteration: string;
    meaning?: string; // one-line gloss under the transliteration (word cards)
  };
}

// ---------------------------------------------------------------------------
// Why do we…? — the questions people get asked at family gatherings
// ---------------------------------------------------------------------------
const WHY_ATOMS: DailyAtom[] = [
  {
    id: 'why:charan-sparsh',
    type: 'why',
    hook: 'Why do we touch our elders’ feet?',
    body:
      'Charan sparsh is a physical act of humility — you lower the highest part of yourself to the humblest part of someone whose years hold wisdom, and receive their ashirvada, their blessing, in return. The Upanishads make the reverence formal: honor your mother, your father, and your teacher as you would the divine.',
    citation: 'Taittiriya Upanishad 1.11 — “matru devo bhava, pitru devo bhava, acharya devo bhava”',
    sourceRef: 'scripture:taittiriya-upanishad#taittiriya-convocation',
    krishnaPrompt: 'Why does Hinduism place so much weight on honoring elders — and how do I do it sincerely, not just as a ritual?',
  },
  {
    id: 'why:diya-at-dusk',
    type: 'why',
    hook: 'Why do we light a lamp at dusk?',
    body:
      'The diya is the tradition’s oldest metaphor made physical: a single flame standing against the dark. Lighting it at the day’s turning is a small daily enactment of one of the Upanishads’ most loved prayers — lead me from darkness to light.',
    citation: 'Brihadaranyaka Upanishad 1.3.28 — “tamaso ma jyotir gamaya”',
    krishnaPrompt: 'What does the lamp actually stand for — and is there a right way to light one at home?',
  },
  {
    id: 'why:prasad',
    type: 'why',
    hook: 'Why do we eat prasad?',
    body:
      'Food offered first and eaten after is food transformed: the meal stops being fuel and becomes grace returned. The Gita puts it sharply — those who eat what was first offered are freed; those who cook only for themselves, it says, “eat their own sin.”',
    citation: 'Bhagavad Gita 3.13',
    sourceRef: 'gita:3#13',
    krishnaPrompt: 'What makes offered food different from ordinary food? Is the change in the food or in me?',
  },
  {
    id: 'why:coconut',
    type: 'why',
    hook: 'Why do we break a coconut at the temple?',
    body:
      'A hard, rough shell; soft white flesh; sweet water hidden inside. Breaking it before the deity is a temple tradition of South India in which the coconut stands for the ego — cracked open so what is pure inside can be offered. The instinct is straight from the Gita: what matters in an offering is never the object, but the surrender.',
    citation: 'South Indian temple tradition; the spirit of offering is Bhagavad Gita 9.26 — “a leaf, a flower, a fruit, or water”',
    sourceRef: 'gita:9#26',
    krishnaPrompt: 'If the offering is really about surrender, what should I be “breaking open” in daily life?',
  },
  {
    id: 'why:fasting',
    type: 'why',
    hook: 'Why do we fast on festival days?',
    body:
      'A vrat is not a hunger strike against the body — it is an experiment in who is in charge. For one day, appetite asks and you answer no, and the tradition claims something subtle: when the senses quiet down, what you actually long for becomes audible.',
    citation: 'Vrata tradition; the principle is Bhagavad Gita 2.59 — objects recede for the abstinent, and even the taste for them fades on seeing the Supreme',
    sourceRef: 'gita:2#59',
    krishnaPrompt: 'I find fasting hard. What is it supposed to be teaching me beyond willpower?',
  },
  {
    id: 'why:rangoli',
    type: 'why',
    hook: 'Why do we draw rangoli at the doorstep?',
    body:
      'Rice flour and colored powder, laid down at dawn, walked over and gone by night — and redrawn the next morning anyway. The threshold art welcomes guests and goddess alike, and quietly teaches the tradition’s hardest lesson: make something beautiful, then let it go.',
    citation: 'Pan-Indian folk tradition (kolam, muggu, alpana); the non-attachment it enacts is Bhagavad Gita 2.14',
    sourceRef: 'gita:2#14',
    krishnaPrompt: 'Why does so much Hindu art get deliberately destroyed — rangoli, sand mandalas, visarjan? What is that teaching?',
  },
  {
    id: 'why:tilak',
    type: 'why',
    hook: 'Why do we wear a tilak on the forehead?',
    body:
      'The mark sits where the tradition locates the inner eye — the point between the brows a meditator returns to. Its shapes are a quiet declaration of path: the upward lines of Vishnu’s devotees, the three horizontal lines of ash for Shiva’s. One glance at a forehead once told you someone’s whole spiritual lineage.',
    citation: 'Sampradaya tradition; the Shaiva tripundra is described in the Brihajjabala Upanishad',
    krishnaPrompt: 'What do the different tilak marks mean, and does wearing one matter if my family never did?',
  },
  // The always-wondered canon: the questions people carry for years without
  // asking — iconography, the gods, nature, practice, beliefs. Ordered to
  // interleave themes so consecutive weeks don’t sit in one category.
  {
    id: 'why:blue-gods',
    type: 'why',
    hook: 'Why are Krishna and Shiva blue?',
    body:
      'Two different blues. Krishna is ghana-shyama — dark as a monsoon cloud, the color of the rain that saves India, of the sky and the sea: depth without a visible bottom. Shiva’s blue is only his throat — he drank the world’s poison to save it and holds it there still. One blue is infinity; the other is a scar worn as an ornament.',
    citation: 'Krishna’s cloud-dark form: Bhagavata Purana, Canto 10; Shiva’s throat: Bhagavata Purana, Canto 8',
    krishnaPrompt: 'Is there a deeper meaning to your blue skin, or is it just how artists paint you?',
  },
  {
    id: 'why:33-gods',
    type: 'why',
    hook: 'Are there really 33 crore gods?',
    body:
      'The Upanishads stage this exact question. “How many gods are there, Yajnavalkya?” asks the challenger. Three thousand three hundred and six, he answers — then, pressed again and again: thirty-three. Six. Three. Two. One and a half. One. The many were always faces; the count was always one.',
    citation: 'Brihadaranyaka Upanishad 3.9.1',
    krishnaPrompt: 'If all the gods are one Brahman, why worship different forms at all?',
  },
  {
    id: 'why:cow',
    type: 'why',
    hook: 'Why is the cow revered?',
    body:
      'She gives more than she takes: milk for the children, ghee for the lamps and the yajna, fuel for the hearth — and asks only grass. The oldest scripture already calls her aghnya, “not to be harmed,” and Krishna, the tradition’s most beloved face, chose to grow up a cowherd. Reverence for the gentlest giver became the emblem of reverence for all life.',
    citation: 'Rig Veda (the cow as aghnya); Bhagavad Gita 10.28 — “among cows I am Kamadhenu”',
    sourceRef: 'gita:10#28',
    krishnaPrompt: 'Is the cow sacred in herself, or a symbol of something — and how should I hold that reverence today?',
  },
  {
    id: 'why:bindi',
    type: 'why',
    hook: 'Why the dot on the forehead?',
    body:
      'It sits on the ajna — the point between the brows where meditators rest their attention; a third eye you can wear. Across centuries a bindi has meant a blessing, a marriage, an identity carried on the skin, or simply beauty. The location was never arbitrary; the meaning has always belonged to the wearer.',
    citation: 'The between-the-brows locus: Bhagavad Gita 8.10; the ornament itself is custom, worn many ways',
    sourceRef: 'gita:8#10',
    krishnaPrompt: 'Bindi, tilak, sindoor — what do the forehead marks each mean, and who wears which?',
  },
  {
    id: 'why:after-death',
    type: 'why',
    hook: 'What actually happens when we die?',
    body:
      'The Gita answers with a wardrobe: as a person discards worn-out clothes and puts on new ones, so the self discards worn-out bodies. Death is real for the garment and irrelevant to the wearer. The Katha Upanishad goes further — its teacher on the subject is Death himself, tutoring a boy who refused to stop asking.',
    citation: 'Bhagavad Gita 2.22; Katha Upanishad 1.1 (Nachiketa and Yama)',
    sourceRef: 'gita:2#22',
    krishnaPrompt: 'Walk me through rebirth: what carries over from one life to the next, and what doesn’t?',
  },
  {
    id: 'why:many-arms',
    type: 'why',
    hook: 'Why do the gods have so many arms?',
    body:
      'Nobody believes the gods grow extra limbs — the arms are a visual sentence. Each hand holds one capacity: a weapon to protect, a lotus for grace, an open palm for blessing — powers exercised all at once, which no single pair of hands could say. When Arjuna is shown the real thing, he sees arms without end, and begs it to stop.',
    citation: 'Bhagavad Gita 11 (the Vishvarupa)',
    sourceRef: 'gita:11',
    krishnaPrompt: 'When you showed Arjuna the universal form, what was he actually seeing?',
  },
  {
    id: 'why:poly-mono',
    type: 'why',
    hook: 'Is Hinduism polytheistic or monotheistic?',
    body:
      'Neither box closes properly. There is one reality — Brahman — and endlessly many true ways it wears a face. The Rig Veda settled the grammar three thousand years ago: “ekam sat, vipra bahudha vadanti” — truth is one; the wise call it by many names.',
    citation: 'Rig Veda 1.164.46',
    krishnaPrompt: 'How do I explain to a friend whether Hindus worship one God or many?',
  },
  {
    id: 'why:ganga',
    type: 'why',
    hook: 'Why is the Ganga holy — and why do ashes go to her?',
    body:
      'She is the river that fell from heaven, brought down by Bhagiratha’s generations of austerity to redeem his ancestors, her impact broken on Shiva’s hair so the earth would survive it. Every drop is understood as that descent still happening. Ashes are given to her so the departed travel with a goddess whose whole purpose is carrying souls home.',
    citation: 'Valmiki Ramayana, Bala Kanda 42–44; Bhagavata Purana, Canto 9',
    sourceRef: 'scripture:bala-kanda',
    krishnaPrompt: 'Can a river really wash away karma? What do sacred waters actually do?',
  },
  {
    id: 'why:bell',
    type: 'why',
    hook: 'Why ring the bell at the temple door?',
    body:
      'The ghanta announces you to the deity — and interrupts you to yourself. One clean strike scatters the mind’s traffic, and in the hum that follows you can hear a lesson in miniature: sound rising out of silence and dissolving back into it. You enter on the fading of the note.',
    citation: 'Temple liturgy of the Agama tradition',
    krishnaPrompt: 'Why do sound and vibration matter so much in Hindu worship — bells, conches, Om?',
  },
  {
    id: 'why:heaven-hell',
    type: 'why',
    hook: 'Do Hindus believe in heaven and hell?',
    body:
      'Yes — and here is the surprise: both are temporary. Svarga is a splendid resort where good karma is spent; when the account empties, you are reborn, and the hells likewise exhaust their sentences. The Gita says it dryly: the virtuous enjoy the vast heaven, and when the merit runs out, they return. The goal was never a better afterlife — it is moksha, no more tickets anywhere.',
    citation: 'Bhagavad Gita 9.20–21',
    sourceRef: 'gita:9#20',
    krishnaPrompt: 'If even heaven is temporary, what exactly is moksha — and why is it better?',
  },
  {
    id: 'why:third-eye',
    type: 'why',
    hook: 'Why does Shiva have a third eye?',
    body:
      'The two eyes see the world; the third sees through it. It is the eye of direct knowing — and the tradition keeps it closed for a reason: when it opened, it burned Kama, the god of desire, to ash where he stood. Insight, the image warns, is not gentle.',
    citation: 'Shiva Purana (the burning of Kama); retold in Kalidasa’s Kumarasambhava',
    krishnaPrompt: 'What would it mean for me to open the “third eye” — is that a real practice or a metaphor?',
  },
  {
    id: 'why:murti',
    type: 'why',
    hook: 'Do Hindus worship idols?',
    body:
      'A murti is not believed to be God — it is a form God is invited into, the way a flag is not the country and you still won’t let it touch the ground. The Gita concedes the honest reason: fixing the mind on the formless is exceedingly hard for embodied beings. The image is a ramp, not the destination.',
    citation: 'Bhagavad Gita 12.5',
    sourceRef: 'gita:12#5',
    krishnaPrompt: 'When I pray before a murti, is God there? Where should my attention actually be?',
  },
  {
    id: 'why:lotus',
    type: 'why',
    hook: 'Why is the lotus in every god’s hand?',
    body:
      'It roots in mud, rises through murk, and opens untouched above the waterline — a complete philosophy in one flower. The Gita makes it a working instruction: act in the world “like a lotus leaf, untouched by water.” Brahma is born from one; Lakshmi stands on one; the feet of the gods are compared to nothing else so often.',
    citation: 'Bhagavad Gita 5.10',
    sourceRef: 'gita:5#10',
    krishnaPrompt: 'How do I live “like a lotus leaf” — fully engaged but unstained?',
  },
  {
    id: 'why:108',
    type: 'why',
    hook: 'Why is everything 108?',
    body:
      'Mala beads, mantra counts, sun salutations — the tradition’s favorite number, and it never settled on one official reason. There are 108 Upanishads by the traditional count; the moon’s 27 mansions times four phases; readings of 1-0-8 as one, nothing, everything. The honest answer: 108 is sacred because generations agreed to make it so — which is how sacredness mostly works.',
    citation: '108 Upanishads: the Muktika canon; the other reckonings are traditional, offered as such',
    krishnaPrompt: 'Does the number of times I repeat a mantra actually matter?',
  },
  {
    id: 'why:no-founder',
    type: 'why',
    hook: 'Why is there no founder, no pope, no single book?',
    body:
      'Because the tradition claims to be found, not founded: sanatana dharma, the way things are — like gravity, discovered rather than decreed. The Vedas are called apaurusheya, authorless, heard by rishis in deep attention. No founder means no founding date, no headquarters, no excommunication — and three thousand years of room to argue.',
    citation: 'The shruti (“heard”) standing of the Vedas — Vedanta tradition',
    krishnaPrompt: 'With no central authority, how does Hinduism decide what is true?',
  },
  {
    id: 'why:elephant-head',
    type: 'why',
    hook: 'Why does Ganesha have an elephant head?',
    body:
      'The story is a father’s terrible mistake: Shiva beheaded the boy guarding Parvati’s door, then repaired what grief could not undo with the first head found — an elephant’s. The symbol outgrew the story: the god of wisdom wears the largest head in the room, ears wide enough to hear everyone, eyes small enough to focus, a trunk that can uproot a tree or lift a needle.',
    citation: 'Shiva Purana, Rudra Samhita (Kumara Khanda)',
    krishnaPrompt: 'Was Ganesha’s elephant head a punishment or a gift? What is the symbol teaching?',
  },
  {
    id: 'why:brahma',
    type: 'why',
    hook: 'Why does almost nobody worship Brahma, the creator?',
    body:
      'He made everything — and has one major temple, at Pushkar. The Puranas tell it as a curse earned by a lie during a contest with Shiva. Underneath the story is a clean piece of theology: creation is finished. What you need day to day is what sustains you and what transforms you — so those altars stayed lit.',
    citation: 'Shiva Purana (the pillar-of-light episode); Pushkar: Padma Purana',
    krishnaPrompt: 'Why would the creator god be the one the tradition let fade? What happened with Brahma?',
  },
  {
    id: 'why:peepal',
    type: 'why',
    hook: 'Why is the peepal tree never cut?',
    body:
      'The Gita names it first among trees — “of trees, I am the ashvattha” — and the Upanishads made it the world-tree, roots in heaven, branches down here. Under one of them, a prince named Siddhartha sat down and became the Buddha. India’s oldest conservation law wore a sacred thread instead of a statute.',
    citation: 'Bhagavad Gita 10.26; Katha Upanishad 6.1',
    sourceRef: 'gita:10#26',
    krishnaPrompt: 'Trees, rivers, mountains — why does Hinduism keep declaring nature sacred?',
  },
  {
    id: 'why:cremation',
    type: 'why',
    hook: 'Why do Hindus cremate their dead?',
    body:
      'The body is a garment of five borrowed elements, and fire is the fastest way to return them all. “As a person discards worn-out clothes and puts on new ones” — the Gita’s image for death — cremation enacts within hours. Nothing is kept for the soul to linger over; the fire is a door held open.',
    citation: 'Bhagavad Gita 2.22; the antyeshti (last rite) tradition',
    sourceRef: 'gita:2#22',
    krishnaPrompt: 'What does the tradition say happens in the days after someone dies — and how should the living grieve?',
  },
  {
    id: 'why:karma-ledger',
    type: 'why',
    hook: 'Who keeps track of karma?',
    body:
      'No one has to. Karma is not a courtroom with a judge and a ledger; it is cause and effect running through character. “As is your desire, so is your will; as is your will, so is your deed; as is your deed, so is your destiny.” The bookkeeping is built into you. You are the record.',
    citation: 'Brihadaranyaka Upanishad 4.4.5',
    krishnaPrompt: 'If no one is judging, why be good? What actually enforces karma?',
  },
  {
    id: 'why:kali-tongue',
    type: 'why',
    hook: 'Why is Kali’s tongue out — and why is she standing on Shiva?',
    body:
      'The most misread image in Hinduism. Kali’s battle-fury had grown so total that no god could stop her — until Shiva lay down in her path. The moment her foot touched her own beloved’s chest, she bit her tongue: the gesture every Indian grandmother still makes at “enough — too far.” Rage halted not by force, but by recognition.',
    citation: 'Kali’s fury: Devi Mahatmya 8; the halted dance on Shiva: later Shakta tradition, told as such',
    krishnaPrompt: 'Kali honestly frightens me. How is a goddess of destruction also called Mother?',
  },
  {
    id: 'why:supreme-god',
    type: 'why',
    hook: 'Who is the supreme god — Shiva, Vishnu, or someone else?',
    body:
      'Whole libraries crown different names — Shaiva texts say Shiva, Vaishnava say Vishnu, Shakta say the Goddess — and the tradition let all of them stand. Its working answer is the ishta devata: the form your own heart opens to is your door. The Gita has Krishna promise to steady any sincere faith, whatever face it turns toward.',
    citation: 'Bhagavad Gita 7.21',
    sourceRef: 'gita:7#21',
    krishnaPrompt: 'How do I find my ishta devata — the form of the divine that fits me?',
  },
  {
    id: 'why:tulsi',
    type: 'why',
    hook: 'Why is there a tulsi plant in the courtyard?',
    body:
      'One plant in the tradition is treated not as sacred to the goddess but as the goddess — watered daily, greeted by name, and every autumn ceremonially married to Vishnu in the Tulsi Vivah. A household’s smallest shrine, and its most faithful: no offering to Vishnu, the texts say, is complete without her leaf.',
    citation: 'Padma Purana (Tulsi Mahatmya); the wedding rite is living tradition',
    krishnaPrompt: 'Why does Hinduism treat plants as divine — is that literal, or a way of seeing?',
  },
  {
    id: 'why:aarti',
    type: 'why',
    hook: 'Why do we circle the flame in aarti?',
    body:
      'In a dark sanctum you cannot see the whole deity at once — so the lamp travels, revealing the form limb by limb, the way attention actually works. Then the flame that touched the divine face is brought out to you, and you cup it toward your eyes: light that saw God, passed on to your seeing.',
    citation: 'Temple liturgy of the Agama tradition',
    krishnaPrompt: 'What should I actually be doing — and feeling — during aarti?',
  },
  {
    id: 'why:bible',
    type: 'why',
    hook: 'Do Hindus have a Bible?',
    body:
      'A library, not a book — and the library has wings. Shruti, “the heard”: Vedas and Upanishads, the bedrock. Smriti, “the remembered”: the epics, the Puranas, the law books — great, human, revisable. If you may carry only one volume, the tradition’s own habit answers: for centuries, the book pressed into a seeker’s hands has been the Gita.',
    citation: 'The shruti/smriti division of the canon',
    krishnaPrompt: 'In what order should I actually read the scriptures — where does a beginner start?',
  },
  {
    id: 'why:broken-tusk',
    type: 'why',
    hook: 'Why is Ganesha’s tusk broken?',
    body:
      'When the sage Vyasa needed a scribe who could keep pace with the Mahabharata, Ganesha agreed — and when his pen failed mid-verse, he snapped off his own tusk and kept writing. The god of wisdom is shown forever incomplete: knowledge costs something, and the wise pay it without pausing.',
    citation: 'Mahabharata, Adi Parva (the scribe tradition)',
    krishnaPrompt: 'Ganesha broke his own tusk to finish the writing. What does the tradition say about what knowledge should cost?',
  },
  {
    id: 'why:goddess',
    type: 'why',
    hook: 'Why are goddesses so central in Hinduism?',
    body:
      'Almost alone among the world’s major living religions, Hinduism never stopped worshiping God as her. Knowledge is Saraswati; wealth is Lakshmi; and power itself — shakti — is not something the Goddess has but something she is. When the demon Mahisha could not be stopped, the gods did not send a stronger god. They pooled their fire, and it took a woman’s form.',
    citation: 'Devi Mahatmya 2 (the emergence of Durga)',
    krishnaPrompt: 'What does it mean that power itself is feminine in Hinduism?',
  },
  {
    id: 'why:snakes',
    type: 'why',
    hook: 'Why are snakes worshiped, not just feared?',
    body:
      'On Nag Panchami, the creature most traditions cast as the villain gets milk and marigolds. Krishna, dancing on the serpent Kaliya’s hoods, chose to banish him, not destroy him. The tradition’s steady instinct: what cannot be removed from the world — venom, fear, death itself — must be honored into balance instead.',
    citation: 'Bhagavata Purana 10.16 (Kaliya); Nag Panchami is living tradition',
    krishnaPrompt: 'What does it mean to honor what frightens me instead of trying to destroy it?',
  },
  {
    id: 'why:ganesha-first',
    type: 'why',
    hook: 'Why does every puja begin with Ganesha?',
    body:
      'By his parents’ own boon, the remover of obstacles is worshiped before any other god — even, charmingly, before his own father. The psychology under the myth is sound: begin any undertaking by first honoring the wisdom that clears the path, or spend the whole undertaking tripping over what you didn’t.',
    citation: 'Shiva Purana, Rudra Samhita',
    krishnaPrompt: 'What are the “obstacles” Ganesha removes — outer ones, or inner?',
  },
  {
    id: 'why:fatalism',
    type: 'why',
    hook: 'If karma explains everything, is it all just fate?',
    body:
      'The tradition rebutted its own misreading. What you were dealt is prarabdha — karma already in motion; what you do with it is purushartha, effort, and that is entirely live. The Gita is one long argument against resignation: Arjuna wanted to fold his hand, and Krishna spends eighteen chapters saying play it. “Lift yourself by yourself.”',
    citation: 'Bhagavad Gita 6.5; 2.47',
    sourceRef: 'gita:6#5',
    krishnaPrompt: 'Where is the line between accepting my karma and fighting to change my life?',
  },
  {
    id: 'why:shiva-adornments',
    type: 'why',
    hook: 'Why does Shiva wear a snake, a crescent moon, and a river?',
    body:
      'He is the god who adopts what everyone else fears or discards. The cobra at his neck is death, worn as jewelry; the waning moon in his hair is time, kept as an ornament; the Ganga crashing onto his head is the flood no one else could survive, broken gently on his locks. Nothing has to be exiled — everything can be worn.',
    citation: 'Shiva Purana; the Ganga’s descent: Valmiki Ramayana, Bala Kanda 43',
    krishnaPrompt: 'Shiva wears everything people run from — death, time, poison. What is that teaching me about my own fears?',
  },
  {
    id: 'why:buddha-avatar',
    type: 'why',
    hook: 'Is the Buddha an avatar of Vishnu?',
    body:
      'The Bhagavata Purana lists him among the avatars — which means Hinduism looked at its most formidable internal critic, the teacher who rejected the Vedas outright, and made him family. Buddhists respectfully decline the adoption. Both positions are worth sitting with.',
    citation: 'Bhagavata Purana 1.3.24',
    krishnaPrompt: 'The Buddha rejected the Vedas — why did Hinduism embrace him as an avatar anyway?',
  },
  {
    id: 'why:vegetarian',
    type: 'why',
    hook: 'Are Hindus required to be vegetarian?',
    body:
      'No — and the honest answer is better than a rule. Vast numbers of Hindus eat meat and always have; vast numbers don’t, and their reason is ahimsa carried all the way to the plate: the wish to live off the least harm possible. The Gita adds its food-and-mind theory; the Mahabharata calls non-violence the highest dharma. The tradition holds out an ideal and leaves the kitchen door unlocked.',
    citation: 'Ahimsa: Mahabharata, Anushasana Parva 117.37; food and the gunas: Bhagavad Gita 17.8–10',
    sourceRef: 'gita:17#8',
    krishnaPrompt: 'I’m considering vegetarianism. What does the tradition actually ask of me?',
  },
  {
    id: 'why:caste',
    type: 'why',
    hook: 'Is caste in the scriptures?',
    body:
      'The honest answer has two halves. The Gita speaks of four varnas created “by qualities and by work” — guna and karma, not birth. The rigid hereditary hierarchy, with untouchability at its bottom, is later social history — and reformers from Basava to Gandhi to Ambedkar fought it, several of them armed with scripture itself. A card this small can’t settle it; it can refuse to be dishonest about it.',
    citation: 'Bhagavad Gita 4.13 (“guna-karma-vibhagashah”); the contested hymn in the debate is Rig Veda 10.90',
    sourceRef: 'gita:4#13',
    krishnaPrompt: 'Give me the honest history of caste — what scripture says, what society built, and what the reformers fought.',
  },
  {
    id: 'why:vahana',
    type: 'why',
    hook: 'Why does every god ride an animal?',
    body:
      'Each vahana is the deity’s teaching in miniature — usually the very force that deity has mastered. Wisdom rides a mouse: restless, gnawing desire, tamed into transport. Durga rides the lion: raw power turned to courage. Look at any deity’s mount and you are reading their syllabus.',
    citation: 'Puranic iconography — the pairings are told across the Puranas',
    krishnaPrompt: 'Go through the vahanas for me — what is each god’s mount teaching?',
  },
  {
    id: 'why:sindoor',
    type: 'why',
    hook: 'Why do married women wear sindoor?',
    body:
      'The line of vermilion in the parting is among the oldest visible vows on earth — worn, the tellings say, by Parvati for Shiva and by Sita for Rama, protection and declaration at once. No scripture commands it; it is custom polished by centuries. Today it means what the woman wearing it means by it — devotion kept, culture carried, or simply a red line of belonging.',
    citation: 'Living tradition (the solah shringar); the epic associations are told in tradition, not scriptural mandates',
    krishnaPrompt: 'How much of Hindu practice is scripture and how much is culture — and does the difference matter?',
  },
  {
    id: 'why:women-scripture',
    type: 'why',
    hook: 'Could women study the scriptures?',
    body:
      'In the oldest layer, they wrote some. The Rig Veda holds hymns by women rishis; in the Upanishads, Gargi debates the sage Yajnavalkya before a hall of scholars, and Maitreyi receives one of the tradition’s deepest teachings. The restrictions came later, from society — and are argued against today with the oldest texts in hand.',
    citation: 'Brihadaranyaka Upanishad 3.8 (Gargi) and 2.4 (Maitreyi); Lopamudra: Rig Veda 1.179',
    krishnaPrompt: 'Tell me about the women sages — Gargi, Maitreyi, Lopamudra. What did they teach?',
  },
  {
    id: 'why:vishnu-serpent',
    type: 'why',
    hook: 'Why is Vishnu asleep on a snake in an ocean?',
    body:
      'Between one universe and the next, the preserver rests on the coils of Ananta — the serpent whose name means Endless — afloat on the ocean of milk, the next creation waiting as a lotus from his navel. The image is a whole cosmology: the world breathes in cycles, and even God rests between exhale and inhale.',
    citation: 'Bhagavata Purana; Vishnu Purana 1.2',
    krishnaPrompt: 'If Vishnu preserves the universe, what does it mean that he is shown resting?',
  },
  {
    id: 'why:visarjan',
    type: 'why',
    hook: 'Why do we make idols with such love — then immerse them?',
    body:
      'For ten days the clay Ganesha is bathed, dressed, fed, and adored; then the whole neighborhood walks him to the water, sings, and lets him dissolve. It is the tradition’s boldest teaching device, performed annually: love the form completely, and release it completely. The form was a visit; what visited never left.',
    citation: 'The utsava (festival image) tradition; the non-attachment it enacts is Bhagavad Gita 2.14',
    sourceRef: 'gita:2#14',
    krishnaPrompt: 'Visarjan makes me unexpectedly sad. What is the immersion supposed to teach?',
  },
  {
    id: 'why:convert',
    type: 'why',
    hook: 'Can you convert to Hinduism?',
    body:
      'There is no baptism because there is no membership roll: dharma is understood as something lived, not joined. That is also why no missionary ever knocked on your door — a tradition holding “truth is one, the wise call it by many names” has nothing to convert you from. Those who adopt the path simply begin practicing it. The door was never locked; it was never even a door.',
    citation: 'Rig Veda 1.164.46; the absence of a conversion rite is itself the tradition',
    krishnaPrompt: 'If someone wants to live as a Hindu, where do they actually start?',
  },
  {
    id: 'why:divine-couples',
    type: 'why',
    hook: 'Are the gods really married?',
    body:
      'Yes — and the marriages are theology. Shiva is pure consciousness and Parvati is shakti, energy: the tradition says flatly that without her, shiva is shava — a corpse. Vishnu preserves the world and Lakshmi is its flourishing; Saraswati is the knowledge creation needs. Every divine couple is one truth split into two so it can be seen.',
    citation: 'Saundarya Lahari 1 — only united with Shakti is Shiva able to act',
    krishnaPrompt: 'What do the divine couples teach about actual human marriage?',
  },
  {
    id: 'why:fire',
    type: 'why',
    hook: 'Why is fire at the center of every Hindu rite?',
    body:
      'The first word of the first hymn of the oldest scripture on earth is Agni — fire. He is the mouth of the gods: whatever is poured into him, he carries upward, making every havan a courier between worlds that has run for three thousand years. Weddings circle him; funerals end in him. The tradition’s oldest technology is still lit.',
    citation: 'Rig Veda 1.1.1 — “agnim ile purohitam”',
    krishnaPrompt: 'What is actually happening in a havan — what do the offerings and mantras do?',
  },
  {
    id: 'why:kali-yuga',
    type: 'why',
    hook: 'Are we really living in the worst age?',
    body:
      'By the Puranic clock, yes — this is Kali Yuga, the fourth quarter, when dharma stands on one leg. But the same texts hide a consolation the tradition loves to quote: in this age, liberation comes easiest. What took a thousand years of austerity in the golden age, says the Bhagavata, is gained here by simple, sincere remembrance. The worst age has the best exchange rate.',
    citation: 'Bhagavata Purana 12.3.51–52',
    krishnaPrompt: 'What is Kali Yuga actually like in the texts — and how should knowing about it change how I live?',
  },
  {
    id: 'why:weapons',
    type: 'why',
    hook: 'Why do benevolent gods carry weapons?',
    body:
      'Durga’s ten hands hold a small armory; gentle Vishnu carries a discus that never misses. The weapons are aimed at demons — and the demons, the stories keep hinting, are drawn from the inside: ego, ignorance, cruelty grown too strong to reason with. Compassion without an edge, the images say, cannot protect anything it loves.',
    citation: 'Devi Mahatmya 2 (the gods arm Durga); Bhagavad Gita 4.8',
    krishnaPrompt: 'The gods fight demons in every story. What are the demons, really?',
  },
  {
    id: 'why:swastika',
    type: 'why',
    hook: 'What does the swastika actually mean?',
    body:
      'Su-asti: “it is well.” For thousands of years before Europe stole and tilted it, the swastika was drawn on doorways, ledgers, and wedding cards as a wish for wellbeing — its four arms read as the four directions, the four Vedas, the four aims of life. Hindus never stopped drawing it, and never will; the original meaning outlives the theft.',
    citation: 'Sanskrit svasti (“well-being”), a blessing found from the Vedas onward; the mark is attested across ancient India',
    krishnaPrompt: 'How do I explain the Hindu swastika to friends who only know its stolen version?',
  },
  {
    id: 'why:hanuman-monkey',
    type: 'why',
    hook: 'Is Hanuman a monkey or a god?',
    body:
      'Both — and the order matters. The Ramayana’s vanara is devotion wearing an ordinary creature’s body: forgetful of his own power, boundless the moment he remembers it in Rama’s service. The tradition’s claim is quietly radical — divinity is not about what you are born as, but what you give yourself to.',
    citation: 'Valmiki Ramayana, Sundara Kanda',
    sourceRef: 'scripture:sundara-kanda',
    krishnaPrompt: 'Hanuman is worshiped as a god but calls himself a servant. What does his path say about mine?',
  },
  {
    id: 'why:pradakshina',
    type: 'why',
    hook: 'Why walk clockwise around the shrine?',
    body:
      'Pradakshina keeps the deity always on your right — the side of honor — while you make yourself the moving one. For a few slow circles, God is the fixed center and you are the orbit: the exact reversal of how we walk through the rest of the day.',
    citation: 'Temple rite of the Agama tradition',
    krishnaPrompt: 'Rituals like circling a shrine feel mechanical to me. How do I make them mean something?',
  },
  {
    id: 'why:shoes',
    type: 'why',
    hook: 'Why do we take off our shoes?',
    body:
      'The threshold is a real line: outside is the world’s dust, inside is where the divine — or the family hearth — lives. Bare feet are honesty; you bring in nothing you picked up out there. The body performs the boundary so the mind remembers to draw it.',
    citation: 'Purity custom across temple and home — tradition, not scripture, and worn proudly as such',
    krishnaPrompt: 'What counts as “pure” and “impure” in Hindu practice — and what is the principle underneath?',
  },
  {
    id: 'why:onion-garlic',
    type: 'why',
    hook: 'Why do some kitchens skip onion and garlic?',
    body:
      'The Gita sorts food the way it sorts everything — by guna, the quality it feeds. Sattvic food steadies; rajasic food agitates; tamasic food dulls. Onion and garlic are traditionally classed as heat and agitation, so kitchens cooking for stillness — temple kitchens, fasting kitchens — leave them out. Not a commandment; a tuning.',
    citation: 'Bhagavad Gita 17.8–10',
    sourceRef: 'gita:17#8',
    krishnaPrompt: 'Does what I eat really affect my mind? What would a sattvic day of eating look like?',
  },
  {
    id: 'why:right-hand',
    type: 'why',
    hook: 'Why only the right hand for eating and giving?',
    body:
      'This one is honest housekeeping that hardened into etiquette: in an old world without plumbing, the two hands divided labor, and the right became the hand of food, gifts, and blessings. No scripture commands it. Some rules are hygiene wearing the costume of holiness — and the tradition, at its best, knows the difference.',
    citation: 'Custom, not scripture — no shastric mandate; said honestly',
    krishnaPrompt: 'How do I tell which Hindu customs are sacred and which are just old habits?',
  },
  {
    id: 'why:head-shave',
    type: 'why',
    hook: 'Why shave the head at Tirupati?',
    body:
      'Hair is the vanity we grow ourselves — free, renewable, and surprisingly hard to part with. Offering it is the smallest sacrifice that still costs the ego something real, which is why it marks the great thresholds: a baby’s first mundan, a renunciate’s vows, a pilgrim’s promise kept at the temple gate.',
    citation: 'The mundan samskara and the Tirumala vow — tradition, offered as such',
    krishnaPrompt: 'Why does letting go of something physical change something internal?',
  },
  {
    id: 'why:garbhagriha',
    type: 'why',
    hook: 'Why is the deity kept in a small, dark room?',
    body:
      'The grandest temple narrows to a chamber called the garbhagriha — literally “womb house” — no windows, one door, room for almost no one. The architecture is a body, and this is its heart. The message built into the stone: the divine is not met in spectacle. You go inward, in the dark, nearly alone.',
    citation: 'Temple canon of the Agamas and Shilpa Shastras',
    krishnaPrompt: 'Temples are loud outside and silent inside. How should I actually spend my time in one?',
  },
  {
    id: 'why:festival-dates',
    type: 'why',
    hook: 'Why do festival dates move every year?',
    body:
      'Hindu festivals ride a lunisolar calendar: months track the moon, years track the sun, and an extra month is added every few years to square the two. So Diwali drifts against the Gregorian grid but never misses its own appointment — the new-moon night of Kartika. The dates aren’t moving; you’re reading them off the wrong calendar.',
    citation: 'The Panchanga (Hindu lunisolar calendar) tradition',
    krishnaPrompt: 'How does the Hindu calendar work — tithis, lunar months, and why do some years have two of the same month?',
  },
];

// ---------------------------------------------------------------------------
// A saying to carry — mahavakyas and lines the tradition never stopped quoting
// ---------------------------------------------------------------------------
const SAYING_ATOMS: DailyAtom[] = [
  {
    id: 'saying:tat-tvam-asi',
    type: 'saying',
    hook: '“Tat tvam asi” — You are That.',
    body:
      'Three words a father, Uddalaka, repeats nine times to his son Svetaketu in the Chandogya Upanishad. “That” is Brahman — the reality behind everything. The claim is staggering: the divine you search for outside is what you already are. Much of Hindu philosophy is a two-thousand-year response to this one sentence.',
    citation: 'Chandogya Upanishad 6.8.7',
    krishnaPrompt: 'If I am already “That,” why do I feel so ordinary? What is tat tvam asi actually asking me to see?',
    sanskrit: { devanagari: 'तत्त्वमसि', transliteration: 'tat tvam asi' },
  },
  {
    id: 'saying:aham-brahmasmi',
    type: 'saying',
    hook: '“Aham Brahmasmi” — I am Brahman.',
    body:
      'Not a boast — a discovery. The Brihadaranyaka Upanishad places these words at the moment a seeker realizes the self they have been protecting and polishing was never separate from the whole. It is one of the four “great sayings” every school of Vedanta must wrestle with.',
    citation: 'Brihadaranyaka Upanishad 1.4.10',
    krishnaPrompt: 'How is “I am Brahman” different from arrogance? Where does the ego end and this truth begin?',
    sanskrit: { devanagari: 'अहं ब्रह्मास्मि', transliteration: 'ahaṁ brahmāsmi' },
  },
  {
    id: 'saying:tena-tyaktena',
    type: 'saying',
    hook: '“Tena tyaktena bhunjithah” — Renounce, and enjoy.',
    body:
      'The very first verse of the Isha Upanishad hands you a paradox: everything belongs to the divine, so give it up — and in that letting go, enjoy it fully. Gandhi said that if all the scriptures vanished and only this verse survived, Hinduism would live on.',
    citation: 'Isha Upanishad, verse 1',
    sourceRef: 'scripture:isha-upanishad#isha-first-verse',
    krishnaPrompt: 'How can renouncing something let me enjoy it more? Give me an everyday example.',
    sanskrit: { devanagari: 'तेन त्यक्तेन भुञ्जीथाः', transliteration: 'tena tyaktena bhuñjīthāḥ' },
  },
  {
    id: 'saying:deep-desire',
    type: 'saying',
    hook: '“You are what your deep, driving desire is.”',
    body:
      'The Brihadaranyaka traces a straight line: as your desire is, so is your will; as your will, so your deed; as your deed, so your destiny. Karma begins long before action — it begins in what you quietly want most.',
    citation: 'Brihadaranyaka Upanishad 4.4.5',
    krishnaPrompt: 'How do I find out what my deepest desire actually is — and change it if I don’t like the answer?',
  },
  {
    id: 'saying:vasudhaiva',
    type: 'saying',
    hook: '“Vasudhaiva kutumbakam” — The world is one family.',
    body:
      'Small-minded people ask “ours or theirs?”, says the verse; for the large-hearted, the whole earth is kin. Coined in Sanskrit centuries ago, it now hangs in the halls of India’s parliament — the tradition’s answer to every tribalism, ancient and modern.',
    citation: 'Maha Upanishad 6.71–73; also Hitopadesha 1.3.71',
    krishnaPrompt: 'How do I actually treat strangers as family without being naive about the world?',
    sanskrit: { devanagari: 'वसुधैव कुटुम्बकम्', transliteration: 'vasudhaiva kuṭumbakam' },
  },
  {
    id: 'saying:ahimsa-paramo',
    type: 'saying',
    hook: '“Ahimsa paramo dharmah” — Non-violence is the highest duty.',
    body:
      'The Mahabharata — an epic about a war — is also the text that declares non-violence the highest dharma. That tension is the point: the tradition holds both the battlefield and the vow of harmlessness, and asks you to know which one your moment calls for.',
    citation: 'Mahabharata, Anushasana Parva 117.37',
    krishnaPrompt: 'If non-violence is the highest dharma, why does the Gita tell Arjuna to fight?',
    sanskrit: { devanagari: 'अहिंसा परमो धर्मः', transliteration: 'ahiṁsā paramo dharmaḥ' },
  },
  {
    id: 'saying:satyameva',
    type: 'saying',
    hook: '“Satyameva jayate” — Truth alone triumphs.',
    body:
      'You have seen these words your whole life without noticing: they sit beneath the lion capital on every Indian passport and rupee note. They come from the Mundaka Upanishad, which continues — by truth the path of the gods is laid, the path the sages walk to reach the highest.',
    citation: 'Mundaka Upanishad 3.1.6',
    sourceRef: 'scripture:mundaka-upanishad#mundaka-satyameva',
    krishnaPrompt: 'Truth doesn’t always seem to win in real life. What does “satyameva jayate” really claim?',
    sanskrit: { devanagari: 'सत्यमेव जयते', transliteration: 'satyameva jayate' },
  },
];

// ---------------------------------------------------------------------------
// Sanskrit word — the vocabulary you already half-know
// ---------------------------------------------------------------------------
const WORD_ATOMS: DailyAtom[] = [
  {
    id: 'word:guru',
    type: 'word',
    hook: 'Guru — the one who removes darkness',
    body:
      'Gu, darkness; ru, its remover. Not merely “teacher” — a guru is anyone whose presence dispels your not-knowing. The word you hear in yoga studios carries a whole theory of how wisdom moves: it cannot be downloaded, only handed over, person to person.',
    citation: 'Traditional etymology given in the Advayataraka Upanishad 16',
    krishnaPrompt: 'Do I need a guru to grow spiritually, or can books and apps be enough?',
    sanskrit: { devanagari: 'गुरु', transliteration: 'guru', meaning: 'the one who removes darkness' },
  },
  {
    id: 'word:namaste',
    type: 'word',
    hook: 'Namaste — the bow you say out loud',
    body:
      'Namas, a bow (from nam, to bend), plus te, to you: “I bow to you.” The folded hands are the word made visible. The traditional gloss deepens it: the light in me recognizes the light in you — a theology of equality hiding inside a greeting.',
    citation: 'Sanskrit etymology (nam, “to bow”); namas as reverence appears throughout the Vedas, e.g. the Rudram’s repeated “namah”',
    krishnaPrompt: 'When I say namaste, what am I actually acknowledging in the other person?',
    sanskrit: { devanagari: 'नमस्ते', transliteration: 'namaste', meaning: 'I bow to you' },
  },
  {
    id: 'word:karma',
    type: 'word',
    hook: 'Karma — the word everyone uses and no one defines',
    body:
      'From kri, “to do.” Karma is simply action — and the tradition’s claim that no action ends when it ends. Every deed plants something. What the West turned into cosmic payback, the Gita treats as physics of the soul: you choose the act, never the fruit.',
    citation: 'Root kri (“to do”); the law of action articulated in Bhagavad Gita 2.47',
    sourceRef: 'gita:2#47',
    krishnaPrompt: 'Is karma punishment, or cause and effect? How should it change what I do today?',
    sanskrit: { devanagari: 'कर्म', transliteration: 'karma', meaning: 'action — and what it leaves behind' },
  },
  {
    id: 'word:yoga',
    type: 'word',
    hook: 'Yoga — it never meant stretching',
    body:
      'From yuj, “to yoke, to join.” Yoga is union — of the small self with the vast one — and the disciplines that get you there. The Gita names several: the yoga of action, of devotion, of knowledge. The mat came four thousand years later.',
    citation: 'Root yuj (“to yoke”); the Gita’s working definition at 2.48 — “evenness of mind is called yoga”',
    sourceRef: 'gita:2#48',
    krishnaPrompt: 'Which yoga fits my temperament — action, devotion, or knowledge? How do I tell?',
    sanskrit: { devanagari: 'योग', transliteration: 'yoga', meaning: 'union — to yoke together' },
  },
  {
    id: 'word:om',
    type: 'word',
    hook: 'Om — the syllable the universe hums in',
    body:
      'The Mandukya Upanishad devotes itself entirely to this one sound: A-U-M, mapped to waking, dreaming, and deep sleep — and the silence after it, to what you are beyond all three. “Om is all this,” the text begins. Every mantra in the tradition rides on it.',
    citation: 'Mandukya Upanishad 1',
    sourceRef: 'scripture:mandukya-upanishad#mandukya-om',
    krishnaPrompt: 'What is actually happening when I chant Om? Why this sound and not another?',
    sanskrit: { devanagari: 'ॐ', transliteration: 'om (a-u-m)', meaning: 'the syllable that holds all this' },
  },
  {
    id: 'word:avatar',
    type: 'word',
    hook: 'Avatar — a word that descended into English',
    body:
      'Ava-tri: “to cross down.” An avatar is the divine descending into the world when it is needed most. Krishna states the job description himself: whenever dharma declines, “I send myself forth, age after age.” Silicon Valley borrowed the word; the Gita wrote its contract.',
    citation: 'Bhagavad Gita 4.7–8',
    sourceRef: 'gita:4#7',
    krishnaPrompt: 'Why does the divine descend as avatars instead of just fixing the world directly?',
    sanskrit: { devanagari: 'अवतार', transliteration: 'avatāra', meaning: 'the divine, crossing down' },
  },
  {
    id: 'word:mantra',
    type: 'word',
    hook: 'Mantra — an instrument for the mind',
    body:
      'Man, the mind; tra, a tool — or, by another reading, that which protects. A mantra is a phrase engineered to be repeated until it steadies the one repeating it. The tradition’s insight is practical: the mind will chatter regardless, so give it something worth saying.',
    citation: 'Traditional etymology (man + tra); mantra practice runs from the Rig Veda’s hymns to japa in the Gita (10.25 — “of sacrifices I am japa”)',
    sourceRef: 'gita:10#25',
    krishnaPrompt: 'How do I start a simple mantra practice — which one, and what should I expect?',
    sanskrit: { devanagari: 'मन्त्र', transliteration: 'mantra', meaning: 'an instrument for the mind' },
  },
];

// ---------------------------------------------------------------------------
// Story moment — three sentences that make you want the whole story
// ---------------------------------------------------------------------------
const STORY_ATOMS: DailyAtom[] = [
  {
    id: 'story:ganesha-race',
    type: 'story',
    hook: 'The race around the world',
    body:
      'Ganesha and his brother Kartikeya were challenged: whoever circles the world first wins the prize. Kartikeya launched at once on his peacock. Ganesha walked one slow circle around his parents, folded his hands, and said, “You are my world.” He won. What did the judges see that Kartikeya didn’t?',
    citation: 'Shiva Purana, Rudra Samhita',
    sourceRef: 'deity:ganesha#story-ganesha-race',
    krishnaPrompt: 'What does Ganesha’s trick in the race really teach — cleverness, or something deeper about what “the world” is?',
  },
  {
    id: 'story:ganesha-head',
    type: 'story',
    hook: 'The boy at the door',
    body:
      'Parvati shaped a boy from turmeric paste and set him to guard her door. He was so loyal he refused entry even to Shiva — who, not knowing this was his own son, struck off the child’s head in a rage. Shiva’s remorse remade him with an elephant’s head and a decree: this child would be worshipped first before every beginning. The boy who once blocked a god’s path became Ganesha — the one we now call on to clear our own.',
    citation: 'Shiva Purana, Rudra Samhita (Kumara Khanda)',
    sourceRef: 'deity:ganesha#story-ganesha-birth',
    krishnaPrompt: 'The Ganesha story starts with a terrible mistake by a god. Why does the tradition tell it that way?',
  },
  {
    id: 'story:hanuman-leap',
    type: 'story',
    hook: 'The leap he didn’t know he could make',
    body:
      'The ocean to Lanka was a hundred yojanas wide, and the monkeys despaired — until old Jambavan turned to Hanuman and reminded him of what a curse had made him forget: his own strength. Hanuman grew vast, pressed the mountain flat beneath his feet, and leapt. He had the power all along; he needed someone to say so.',
    citation: 'Valmiki Ramayana, Sundara Kanda 1 (the reminder: Kishkindha Kanda 66)',
    sourceRef: 'scripture:sundara-kanda',
    krishnaPrompt: 'Hanuman forgot his own strength until reminded. What strength might I be forgetting?',
  },
  {
    id: 'story:samudra-manthan',
    type: 'story',
    hook: 'The ocean that gave poison before nectar',
    body:
      'Gods and demons churned the cosmic ocean for the nectar of immortality — and the first thing to surface was halahala, a poison that could end the world. Shiva drank it and held it in his throat, which turned blue forever. The tradition’s quiet warning: every great churning yields poison before it yields nectar, and someone must be willing to swallow it.',
    citation: 'Bhagavata Purana, Canto 8; Vishnu Purana 1.9',
    sourceRef: 'story:samudra-manthan-full',
    krishnaPrompt: 'What does the churning of the ocean say about the hard middle of any worthwhile effort?',
  },
  {
    id: 'story:prahlada',
    type: 'story',
    hook: 'The boy who wouldn’t stop praying',
    body:
      'A demon king demanded to be worshiped as god; his own small son Prahlada kept praying to Vishnu instead. Poison, elephants, a bonfire in the arms of the fireproof aunt Holika — nothing touched the boy. Holika burned; Prahlada walked out singing. That bonfire is why Holi begins with one.',
    citation: 'Bhagavata Purana, Canto 7',
    sourceRef: 'story:prahlada-full',
    krishnaPrompt: 'Prahlada defied his own father out of devotion. How does the tradition think about faith versus family?',
  },
  {
    id: 'story:govardhan',
    type: 'story',
    hook: 'The mountain held up on a little finger',
    body:
      'When the villagers of Vraja skipped Indra’s worship, the storm god answered with a deluge meant to drown them. Krishna — a boy of seven — lifted Govardhan hill on the little finger of one hand and held it as an umbrella for seven days. The lesson under the miracle: shelter what shelters you, and old powers do not get worship merely for being old.',
    citation: 'Bhagavata Purana, Canto 10 (chapters 24–25)',
    sourceRef: 'deity:krishna#story-govardhan-lift',
    krishnaPrompt: 'Why did Krishna stop the worship of Indra? What was he teaching the villagers about worship itself?',
  },
  {
    id: 'story:savitri',
    type: 'story',
    hook: 'The woman who argued with Death',
    body:
      'Savitri married Satyavan knowing he had one year to live. When Yama, god of death, came to collect, she simply followed him — and debated dharma so flawlessly, step after step, that Yama granted her boons until the only consistent outcome left was her husband’s life. Death himself, out-reasoned by devotion.',
    citation: 'Mahabharata, Vana Parva (the Pativrata-mahatmya, ch. 293–299)',
    sourceRef: 'story:savitri-full',
    krishnaPrompt: 'Savitri won her husband back through reasoning with Death. What does her story say about persistence and dharma?',
  },
  {
    id: 'story:nachiketa',
    type: 'story',
    hook: 'The boy who waited three nights at Death’s door',
    body:
      'Given three wishes by Yama, lord of death, young Nachiketa refused the first two easy gifts and spent the third on the one question Death tried to buy back with sons, gold, and long life: what happens when we die? Only after he turned down every substitute did Death agree to teach him — because the truth cannot be heard by someone still bargaining.',
    citation: 'Katha Upanishad 1.1–1.3',
    sourceRef: 'scripture:katha-upanishad#katha-frame',
    krishnaPrompt: 'Nachiketa refused everything pleasant to get one real answer. What comfortable substitute am I accepting instead of a question I actually want answered?',
  },
  {
    id: 'story:salt',
    type: 'story',
    hook: 'The salt you can taste but never hold',
    body:
      'A proud young scholar came home, and his father dissolved a lump of salt in water. Sip from any side — salty; yet nothing left to grasp. “In just that way,” the father said, “you do not see Being here, but it is here all the same. That is the self of all this. Tat tvam asi — you are That.” Nine times he repeated it.',
    citation: 'Chandogya Upanishad 6.13',
    sourceRef: 'story:svetaketu-salt',
    krishnaPrompt: 'If the divine is dissolved in me like salt in water — everywhere, ungraspable — what would it mean to actually taste it?',
  },
  {
    id: 'story:ekalavya',
    type: 'story',
    hook: 'The archer who learned from a statue',
    body:
      'Refused a teacher because of his birth, the forest boy Ekalavya built a clay image of Drona and practiced before it until he surpassed the princes. Then the teacher who had turned him away claimed his fee: the right thumb that made him the greatest archer alive. Ekalavya cut it off with a cheerful face. The tradition holds this story open — perfect devotion and plain injustice in one frame.',
    citation: 'Mahabharata, Adi Parva',
    sourceRef: 'story:ekalavya',
    krishnaPrompt: 'Ekalavya’s story holds both perfect devotion and real injustice. Which half do I look away from — and why?',
  },
];

// ---------------------------------------------------------------------------
// A question to sit with — one reflective question, two quiet sentences
// ---------------------------------------------------------------------------
const QUESTION_ATOMS: DailyAtom[] = [
  {
    id: 'question:whose-work',
    type: 'question',
    hook: 'Whose work were you doing today — and did the work know?',
    body:
      'The Gita’s test for any effort is not its size but its offering. Hanuman crossed an ocean and called it Rama’s work; the crossing cost him nothing.',
    citation: 'cf. Bhagavad Gita 3.9',
    sourceRef: 'gita:3#9',
    krishnaPrompt: 'How do I turn ordinary work into an offering without pretending I don’t need the paycheck?',
  },
  {
    id: 'question:rehearsal',
    type: 'question',
    hook: 'What did your mind rehearse today without you choosing it?',
    body:
      'Whatever the mind practices remembering, it remembers under pressure. The tradition calls spiritual practice rehearsal — re-aiming the arrow before it must fly.',
    citation: 'cf. Bhagavad Gita 8.6',
    sourceRef: 'gita:8#6',
    krishnaPrompt: 'My idle thoughts default to worry and grievance. How do I retrain what my mind rehearses?',
  },
  {
    id: 'question:rope-snake',
    type: 'question',
    hook: 'Which of your fears might be a rope, misread at dusk?',
    body:
      'The traveler leapt from a snake that was never there — and the terror was real anyway. Maya’s question is not “is this real?” but “is this the rope, or my snake?”',
    citation: 'The rope-snake teaching: Advaita tradition',
    krishnaPrompt: 'Help me examine a fear I have — how do I tell the rope from the snake?',
  },
  {
    id: 'question:weather',
    type: 'question',
    hook: 'Which weather woke up with you this morning — clarity, restlessness, or fog?',
    body:
      'The Gita says three strands dye every hour: sattva, rajas, tamas. Naming the weather is the first step to not being the storm.',
    citation: 'cf. Bhagavad Gita 14.5–17',
    sourceRef: 'gita:14#5',
    krishnaPrompt: 'I woke up foggy and unmotivated today. What does the guna teaching say I should actually do?',
  },
  {
    id: 'question:jambavan',
    type: 'question',
    hook: 'Who reminds you of your strength — and who is waiting for you to remind them?',
    body:
      'Hanuman sat silent at the ocean because a curse hid his own power from him. Jambavan’s reminder was not flattery; it was testimony.',
    citation: 'cf. Valmiki Ramayana, Kishkindha Kanda 66',
    sourceRef: 'scripture:kishkindha-kanda',
    krishnaPrompt: 'Someone I love has forgotten their own strength. How do I remind them the way Jambavan did?',
  },
  {
    id: 'question:open-palm',
    type: 'question',
    hook: 'What outcome are you gripping that was never yours to hold?',
    body:
      'Effort is yours; the fruit never was. The Gita’s most quoted verse is a surgical distinction, not a shrug — pour yourself into the work, and open the palm.',
    citation: 'cf. Bhagavad Gita 2.47',
    sourceRef: 'gita:2#47',
    krishnaPrompt: 'I can’t stop obsessing over a result I’m waiting on. Walk me through what 2.47 asks of me.',
  },
  {
    id: 'question:one-lamp',
    type: 'question',
    hook: 'If your practice were stripped to one leaf and a palmful of water, what would remain?',
    body:
      'Shiva is Bholenath, the easily pleased — unimpressible by production value. The bare act, meant fully, is already complete.',
    citation: 'cf. Bhagavad Gita 9.26',
    sourceRef: 'gita:9#26',
    krishnaPrompt: 'My spiritual life feels like apps and checklists. What is the barest practice that still counts?',
  },
];

// ---------------------------------------------------------------------------
// Across traditions — Hinduism set beside the world's other faiths.
// Framing rules: curiosity, never superiority; the Hindu locus cited
// precisely; other traditions characterized respectfully at intro level;
// overlaps celebrated as human, differences stated without ranking.
// ---------------------------------------------------------------------------
const COMPARE_ATOMS: DailyAtom[] = [
  {
    id: 'compare:ekam-sat',
    type: 'compare',
    hook: 'Truth is one; the wise call it by many names.',
    body:
      'The Rig Veda wrote Hinduism’s entire theology of other religions in one line, three thousand years before “interfaith” was a word. They call it Indra, Mitra, Varuna, Agni — the callings differ; the called does not. It is why Hindus historically felt no urge to convert anyone: other paths are not rivals, just other names.',
    citation: 'Rig Veda 1.164.46 — “ekam sat vipra bahudha vadanti”',
    krishnaPrompt: 'If all religions point at one truth, does it matter which path I follow?',
    sanskrit: { devanagari: 'एकं सत् विप्रा बहुधा वदन्ति', transliteration: 'ekaṁ sat viprā bahudhā vadanti' },
  },
  {
    id: 'compare:trimurti-trinity',
    type: 'compare',
    hook: 'Is the Trimurti like the Trinity?',
    body:
      'They rhyme on the surface — three-in-one — but run on different grammar. The Trinity is three persons of one God, co-eternal, a mystery of relationship. The Trimurti is three functions of one Brahman: creation, preservation, dissolution — less a family than a job description. The comparison is still worth making; it teaches both doctrines faster than either alone.',
    citation: 'The Trimurti: Puranic tradition (e.g., Vishnu Purana); the Trinity glossed respectfully at introduction level',
    krishnaPrompt: 'Break down the Trimurti for me — how do Brahma, Vishnu, and Shiva relate to Brahman?',
  },
  {
    id: 'compare:rebirth-resurrection',
    type: 'compare',
    hook: 'Reincarnation or resurrection?',
    body:
      'Two answers to the same grave. In the Abrahamic frame, you live once, die once, and are raised once — the self is a story whose ending is kept safe. In the dharmic frame, the self was never in danger: it changes bodies “as a person changes worn-out clothes.” One tradition promises the body back; the other says you were never the body.',
    citation: 'Bhagavad Gita 2.22',
    sourceRef: 'gita:2#22',
    krishnaPrompt: 'What difference does it make, practically, to live as if I will live again?',
  },
  {
    id: 'compare:karma-sin',
    type: 'compare',
    hook: 'Karma or sin — who is keeping score?',
    body:
      'In one frame, wrongdoing is an offense against God, weighed by a judge who can also forgive. In the other, no one needs to be watching: action ripens on its own, the way a planted seed requires no court. Forgiveness works differently too — karma cannot be pardoned, only exhausted or outgrown. Two moral physics; both take your choices completely seriously.',
    citation: 'Brihadaranyaka Upanishad 4.4.5',
    krishnaPrompt: 'Is there grace or forgiveness inside the karma framework, or only consequences?',
  },
  {
    id: 'compare:om-amen',
    type: 'compare',
    hook: 'Om, Amen, Amin.',
    body:
      'Three traditions sealed their prayers with one resonant syllable, and none chose a word with a dictionary meaning — all three are pure assent, sound standing in for what speech cannot finish. Hinduism went furthest: the Mandukya Upanishad spends its entire length on Om, mapping A-U-M to waking, dream, and deep sleep — and the silence after it to what you are.',
    citation: 'Mandukya Upanishad 1–12',
    sourceRef: 'scripture:mandukya-upanishad#mandukya-om',
    krishnaPrompt: 'Why does chanting Om feel different from saying a word — what is happening?',
  },
  {
    id: 'compare:beads',
    type: 'compare',
    hook: 'Why is every praying hand holding beads?',
    body:
      'The japa mala’s 108, the rosary’s decades, the tasbih’s 99: three faiths, no committee, one invention. The engineering insight is identical — give the hand the counting so the heart can stop keeping score. The Gita ranks the practice startlingly high: “of sacrifices,” says Krishna, “I am japa” — the quiet repetition outranks the grand ceremony.',
    citation: 'Bhagavad Gita 10.25',
    sourceRef: 'gita:10#25',
    krishnaPrompt: 'Teach me japa: which mantra, how many rounds, and what should happen inside?',
  },
  {
    id: 'compare:fasting',
    type: 'compare',
    hook: 'Every religion fasts. Why?',
    body:
      'Vrat, Ramadan, Lent, Yom Kippur — every tradition independently found the same lever. Appetite is the most frequent voice in a human day, so it is the cheapest thing to offer and the hardest. What differs is the dedication: a Hindu vrat is usually a vow to a chosen deity, personal and elective — the tradition preferring, as usual, the custom-fit to the commanded.',
    citation: 'The vrata tradition; its principle: Bhagavad Gita 2.59',
    sourceRef: 'gita:2#59',
    krishnaPrompt: 'Design a simple vrat with me — what would a meaningful personal fast look like?',
  },
  {
    id: 'compare:images',
    type: 'compare',
    hook: 'Why do Hindus bow to images while others forbid them?',
    body:
      'The deepest visual divide in religion. The aniconic traditions fear the image will replace God — a finite thing worshiped in place of the infinite. Hinduism runs the risk on purpose: the formless is a hard road for embodied minds, says the Gita, so let form be the ramp. One side protects God’s transcendence; the other trusts God’s availability. Both are arguments about love.',
    citation: 'Bhagavad Gita 12.5',
    sourceRef: 'gita:12#5',
    krishnaPrompt: 'Is there a danger of the murti becoming the destination instead of the door?',
  },
  {
    id: 'compare:light-festivals',
    type: 'compare',
    hook: 'Why does every faith light lamps against the dark?',
    body:
      'Diwali’s diyas, Hanukkah’s menorah, Christmas lights strung against the December night — different theologies, one reflex: when the dark is longest, make light and gather. Diwali’s version marks a homecoming — Ayodhya lit every lamp it had so Rama could find his way back. The instinct underneath is old as winter.',
    citation: 'Rama’s return: Valmiki Ramayana, Yuddha Kanda; Diwali as its festival: living tradition',
    sourceRef: 'scripture:yuddha-kanda',
    krishnaPrompt: 'What is Diwali actually celebrating — and why five days?',
  },
  {
    id: 'compare:sacred-water',
    type: 'compare',
    hook: 'Ganga snan and baptism — the same instinct?',
    body:
      'Immersion as rebirth may be religion’s oldest shared move: go under as one person, rise as another. Baptism does it once — a threshold crossed forever. The Ganga is entered again and again — a mother visited, not a line crossed. Both traditions caught the same truth: water is the only element you can be fully inside and still live.',
    citation: 'The Ganga’s redeeming descent: Valmiki Ramayana, Bala Kanda 42–44',
    sourceRef: 'scripture:bala-kanda',
    krishnaPrompt: 'Do I have to go to the Ganga, or can any water carry the intention?',
  },
  {
    id: 'compare:heaven-moksha',
    type: 'compare',
    hook: 'Heaven forever, or no more rebirth?',
    body:
      'The endgames genuinely differ, and it matters. The Abrahamic hope is eternal presence — you, perfected, with God, forever. Moksha is subtler: not a better place but the end of needing places. The Upanishad’s image is rivers reaching the sea, losing name and form in what they always were. One perfects the self; the other sees through it.',
    citation: 'Mundaka Upanishad 3.2.8; heaven as temporary: Bhagavad Gita 9.20–21',
    sourceRef: 'scripture:mundaka-upanishad',
    krishnaPrompt: 'Rivers losing their names in the sea — do “I” survive moksha? Be honest with me.',
  },
  {
    id: 'compare:buddha',
    type: 'compare',
    hook: 'Was the Buddha a Hindu?',
    body:
      'He was born into the dharma world, kept its deep grammar — karma, rebirth, liberation — and rejected its authorities: the Vedas, the rituals, even the soul itself. Hinduism answered a few centuries later by declaring him an avatar of Vishnu; Buddhism politely declined the embrace. History’s most interesting family argument, and both sides grew up arguing it.',
    citation: 'The Buddha in the avatar list: Bhagavata Purana 1.3.24',
    krishnaPrompt: 'What exactly did the Buddha accept and reject from the Vedic tradition?',
  },
  {
    id: 'compare:dharmic-family',
    type: 'compare',
    hook: 'Jains, Sikhs, Buddhists, Hindus — one family?',
    body:
      'Four traditions born on one subcontinent, sharing a vocabulary — karma, dharma, moksha, guru — the way siblings share a nose. Jainism radicalized ahimsa; Buddhism dropped the self; Sikhism fused fierce monotheism with the guru lineage. They are not branches of Hinduism, and they are not strangers: they are the dharmic family, arguing at the same table for 2,500 years.',
    citation: 'Historical overview at introduction level, offered as such',
    krishnaPrompt: 'Give me the family tree: how do the dharmic religions relate, and where do they part ways?',
  },
  {
    id: 'compare:guru-prophet',
    type: 'compare',
    hook: 'Guru or prophet?',
    body:
      'A prophet carries a message down the mountain: God spoke, and here is what was said. A guru walks you up the mountain: the seeing is yours to do, and the guru’s work — gu, darkness; ru, its remover — is to keep clearing the fog. One model treasures the message; the other insists the message cannot be delivered, only realized.',
    citation: 'Guru etymology: Advayataraka Upanishad 16',
    krishnaPrompt: 'Without prophets or tablets from a mountaintop, how does truth get passed down in Hinduism?',
  },
  {
    id: 'compare:who-knows',
    type: 'compare',
    hook: '“Who really knows?” — the scripture that shrugs',
    body:
      'Every tradition has a creation story; the Rig Veda has one that ends in a question mark. Whence this creation arose — perhaps it formed itself, perhaps not — “the one who surveys it in the highest heaven, only he knows. Or perhaps even he does not know.” Set beside Genesis’s confident opening line, the Nasadiya Sukta is the tradition’s most startling export: doubt, made sacred.',
    citation: 'Rig Veda 10.129 (the Nasadiya Sukta)',
    krishnaPrompt: 'Why would a scripture admit it doesn’t know how creation happened — and what does that make of faith?',
  },
  {
    id: 'compare:golden-rule',
    type: 'compare',
    hook: '“Do not do to another what you would not have done to yourself — that, in brief, is the whole of dharma.”',
    body:
      'The Mahabharata wrote it down centuries before the Sermon on the Mount — and **nearly every faith found the same rule on its own**. When traditions all converge on a single sentence like this, it stops looking like doctrine and starts looking like **discovery**.',
    citation: 'Mahabharata, Anushasana Parva 113.8',
    krishnaPrompt: 'If dharma is really that simple, why are the dharma texts so complicated?',
    sanskrit: { devanagari: 'आत्मनः प्रतिकूलानि परेषां न समाचरेत्', transliteration: 'ātmanaḥ pratikūlāni pareṣāṁ na samācaret' },
  },
  {
    id: 'compare:pilgrimage',
    type: 'compare',
    hook: 'Kumbh, Hajj, Camino — why the long walk?',
    body:
      'Every faith invented pilgrimage, because every faith noticed the same thing: some inner distances can only be crossed with the feet. The Hindu version scales past belief — the Kumbh Mela gathers more human beings than any other event on earth, visible from orbit, organized by nothing but a calendar and faith. No tickets, no registration. People just come.',
    citation: 'The Kumbh’s origin — the spilled drops of amrita from the samudra manthan: Puranic tradition',
    krishnaPrompt: 'What makes a place a tirtha — a crossing point? Can one place really be holier than another?',
  },
  {
    id: 'compare:time',
    type: 'compare',
    hook: 'Is time an arrow or a wheel?',
    body:
      'The Western clock runs a straight line: creation, history, judgment, end. The yugas run a circle vast beyond imagining — a single day of Brahma is over four billion human years, and after his night, the wheel turns again. Everything downstream changes: history stops being a countdown, “the end of the world” becomes a comma, and progress shares the road with return.',
    citation: 'Yuga cosmology: the Puranas (e.g., Vishnu Purana 1.3)',
    krishnaPrompt: 'If time is cyclical and vast, does anything I do matter? How does the tradition answer that?',
  },
];

const ATOMS_BY_TYPE: Record<Exclude<AtomType, 'festival' | 'verse' | 'discovery'>, DailyAtom[]> = {
  why: WHY_ATOMS,
  saying: SAYING_ATOMS,
  word: WORD_ATOMS,
  story: STORY_ATOMS,
  question: QUESTION_ATOMS,
  compare: COMPARE_ATOMS,
};

export const ALL_AUTHORED_ATOMS: DailyAtom[] = [
  ...WHY_ATOMS,
  ...SAYING_ATOMS,
  ...WORD_ATOMS,
  ...STORY_ATOMS,
  ...QUESTION_ATOMS,
  ...COMPARE_ATOMS,
];

// Weekday → atom type. One day per authored type; the Gita verse holds
// Sunday (the old second verse day, Wednesday, now belongs to the
// across-traditions comparisons).
const WEEKDAY_TYPE: Exclude<AtomType, 'festival' | 'discovery'>[] = [
  'verse', // Sun
  'why', // Mon
  'saying', // Tue
  'compare', // Wed
  'story', // Thu
  'question', // Fri
  'word', // Sat
];

// Local-calendar day number (timezone-safe): lets the pick rotate WEEKLY.
// (The old `dayOfYear + year` hash advanced by exactly 7 per week, so a given
// weekday resolved to the same atom index all year — invisible while types
// owned two weekdays, but fatal with one weekday per type.)
const localDayNumber = (date: Date): number =>
  Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);

// The verse-day atom is synthesized from the daily verse rather than authored:
// the verse rotation already covers all 701 verses deterministically.
const verseAtomFor = (date: Date): DailyAtom => {
  const v = getDailyVerse(date);
  return {
    id: `verse:${v.chapter}:${v.verse}`,
    type: 'verse',
    hook: v.english,
    body: '',
    citation: `${v.reference} · Sivananda translation`,
    // The exact verse, not the chapter cover — this atom has always known both
    // numbers, and used to throw the verse away.
    sourceRef: `gita:${v.chapter}#${v.verse}`,
    krishnaPrompt: `Today's verse is ${v.reference} — "${v.english}" What is it asking of me today?`,
    sanskrit: { devanagari: v.sanskrit, transliteration: v.transliteration },
  };
};

// On a festival's eve or principal day, the brief turns toward it: the
// festival's own hook, built from data rather than authored per-day. Bounded to
// those two days by getFestivalLensFor (see it for why the old "within 7 days"
// window let multi-day festivals like Ratha Yatra own the brief for ~16 days),
// and keyed off the passed `date` so notification pre-baking for future days is
// correct rather than stamping every day with today's festival.
const festivalAtomFor = (date: Date): DailyAtom | null => {
  const lens = getFestivalLensFor(date);
  if (!lens) return null;
  const { festival, days } = lens;
  const when = days === 0 ? 'is today' : 'is tomorrow';
  return {
    id: `festival:${festival.id}:${days}`,
    type: 'festival',
    hook: `${festival.name} ${when}`,
    body: festival.significance
      ? `${festival.significance.replace(/([^.!?])$/, '$1.')} Read the story now, so the day itself needs no explaining.`
      : `${festival.name} is approaching — read its story now so the day itself needs no explaining.`,
    citation: 'From the festival guide',
    // routeForContentRef falls back to the festival calendar when there is no
    // reader for it, so this is safe either way.
    sourceRef: `festival:${festival.id}`,
    krishnaPrompt: `What should I know about ${festival.name} before it arrives — and how do I celebrate it well?`,
  };
};

// Shown ONLY in the onboarding chai preview (OnboardingScreen), never in the
// daily rotation — it's not in any ATOMS_BY_TYPE pool, so getDailyAtom can't
// pick it. A fixed, short, welcoming first taste so the preview reads clean on
// any date rather than truncating whatever the day's atom happens to be.
export const ONBOARDING_ATOM: DailyAtom = {
  id: 'onboarding:welcome',
  type: 'word',
  hook: 'Namaste',
  body: 'namaḥ, “I bow,” plus te, “to you” — many read it as the divine in one honoring the divine in the other.',
  citation: 'A traditional Sanskrit greeting — namaḥ (I bow) + te (to you).',
  krishnaPrompt: 'What does “namaste” really mean?',
  sanskrit: { devanagari: 'नमस्ते', transliteration: 'namaste', meaning: 'I bow to you' },
};

// A targeted discovery pick: one specific, unseen piece of content the reader
// hasn't explored yet. dailyPickService builds and ranks these (unseen + blend
// of interests / journey position / level) into `pool`; buildDailyAtom just
// walks the ranked pool one entry per discovery-day. Everything here is a plain
// content ref so the card's "Read More ›" and the notification tap can route to
// it (see routeForContentRef / navigateToContentRef).
export interface DiscoveryCandidate {
  ref: string; // permanent content-ref, e.g. 'deity:hanuman', 'concept:maya'
  tag: string; // kind-specific eyebrow, e.g. 'Meet a deity'
  hook: string; // card headline + notification body, e.g. 'Meet Hanuman'
  body: string; // teaser (1–2 sentences)
  citation: string; // footer line, e.g. 'From the guide to the gods'
  krishnaPrompt: string;
}

// A once-read snapshot of user state, so atom selection stays SYNCHRONOUS: the
// notification scheduler reads it once, then computes 28 future days without
// awaiting. `discoveryPool` is already filtered (unseen) and ranked.
export interface DailyPickSnapshot {
  discoveryPool: DiscoveryCandidate[];
}

// ~half of the non-verse days are discovery days. localDayNumber parity drifts
// against the weekday (7 is odd), so over any two weeks every authored type and
// a discovery pick both land — the blend the user asked for, without dropping
// any authored format.
const isDiscoveryDay = (date: Date): boolean => localDayNumber(date) % 2 === 0;

// Monotone index into the ranked discovery pool: consecutive discovery days
// (localDayNumber apart by ≥2) map to consecutive pool entries, so day-to-day
// picks differ and honor the ranking. `% pool.length` at the call site means it
// never runs dry — by the time it wraps, months have passed and completed items
// have dropped out of a freshly rebuilt pool.
const discoveryOrdinal = (date: Date): number => Math.floor(localDayNumber(date) / 2);

const discoveryAtomFor = (date: Date, snapshot: DailyPickSnapshot): DailyAtom | null => {
  const pool = snapshot.discoveryPool;
  if (pool.length === 0) return null;
  const cand = pool[discoveryOrdinal(date) % pool.length];
  return {
    id: `discovery:${cand.ref}`,
    type: 'discovery',
    hook: cand.hook,
    body: cand.body,
    citation: cand.citation,
    sourceRef: cand.ref,
    tagOverride: cand.tag,
    krishnaPrompt: cand.krishnaPrompt,
  };
};

// Deterministic pick for a date, given an optional user snapshot:
//   1. festival eve/principal day → the festival lens (bounded, see above);
//   2. Sunday → the daily verse;
//   3. with a snapshot, ~half the remaining days → a targeted discovery pick;
//   4. otherwise → the weekday's authored type, rotating its pool week by week.
// Called by HomeScreen with today's date and by notificationService 28× with
// one shared snapshot, so the card and each notification agree for a given day.
export const buildDailyAtom = (date: Date, snapshot?: DailyPickSnapshot): DailyAtom => {
  const festival = festivalAtomFor(date);
  if (festival) return festival;
  const type = WEEKDAY_TYPE[date.getDay()];
  if (type === 'verse') return verseAtomFor(date);
  if (snapshot && isDiscoveryDay(date)) {
    const discovery = discoveryAtomFor(date, snapshot);
    if (discovery) return discovery;
  }
  const pool = ATOMS_BY_TYPE[type];
  const index = Math.floor(localDayNumber(date) / 7) % pool.length;
  return pool[index];
};

// Synchronous fallback: festival + authored rotation only, no personalization.
// Kept for callers that cannot await a snapshot (and existing imports/tests).
// The personalized path is buildDailyAtom(date, snapshot) via dailyPickService.
export const getDailyAtom = (date: Date = new Date()): DailyAtom => buildDailyAtom(date);
