// Batch-generate ElevenLabs narration for the Ramayana (Oliver voice).
//
// One MP3 per section (keyed by the section's stable id), written into
// assets/audio/ramayana/. The app bundles those and plays one per reader page
// via src/data/scriptureAudioManifest.ts — same pipeline as the Foundations
// read-along (see scripts/generate-foundations-audio.mjs).
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs         # all
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs bala    # just Bala Kanda
//
// Re-running overwrites the files, so it's safe to iterate on the voice.
//
// Text is TRANSFORMED FROM THE ON-SCREEN PROSE (scriptureTexts.ts), kept verbatim
// with the page so the sentence-highlight stays in sync: **bold** markup stripped,
// » dialogue read as the spoken line only, openingVerse read as its English meaning
// (not chanted), and tricky Sanskrit names respelled phonetically (v3's fallback,
// like the Foundations "Maaya"), since Oliver is a British reader.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'assets', 'audio', 'ramayana');

// The same preferred voice as Foundations (Oliver — clean, British, steady).
const VOICE_ID = 'L1aJrPa7pLJEyYlh3Ilq';
const MODEL_ID = 'eleven_v3';
const OUTPUT_FORMAT = 'mp3_44100_128';
const VOICE_SETTINGS = {
  stability: 0.5, // "Natural"
  similarity_boost: 1.0,
  use_speaker_boost: true,
};

// All seven kandas. Ids match scriptureTexts.ts section ids exactly.
const SCRIPTS = {
  'bala-preface':
    `[warmly] The Rah-MAH-yuh-nuh is one of India's two great epics, and for millions of people it is the very first story they ever learn. It follows Rama, a prince of Ah-YOHD-yuh — a kingdom in northern India — through a wedding, a sudden exile, the kidnapping of his wife, and a long war to win her back.\n\nThis first book is the Bala Kanda, the Book of Childhood. It is the origin story: how the poem itself came to be written, how Rama came to be born at all, and the day he won his wife, Sita. We will follow the events as the poet Vaal-MEE-kee tells them… stopping now and then to notice what they mean.`,

  'bala-question':
    `[thoughtful] Who in this world today is truly good and truly strong — one who knows what is right, remembers every kindness, speaks only truth, and holds firm to his vows?\n\nThe whole epic begins not with a battle but with a question. A poet named Vaal-MEE-kee asks a wandering sage named NAH-ruh-duh whether a truly good person exists anywhere in the world.\n\nIs there a man alive who is genuinely good — brave and truthful and kind all at once, and unshakable?\n\nNAH-ruh-duh did not hesitate.\n\nThere is. His name is Rama, of the house of Ick-SHVAH-koo.\n\n[warmly] Everything that follows is the poem trying to show what that one name means… once a real life has to carry it.`,

  'bala-birthless-poem':
    `Soon after, Vaal-MEE-kee was walking beside a river when a hunter shot down one of a pair of birds in the middle of their courtship. The surviving bird's cry of grief cut straight through him, and to his own surprise his grief came back out of his mouth already shaped into rhythm — the first SHLOH-kuh, a verse couplet, ever spoken.\n\nThen the creator-god BRAH-mah appeared before him.\n\n[gently] That meter came to you for a reason. Now use it. Tell the whole story of Rama.\n\nThe Sanskrit keeps the two words a breath apart: grief is SHOH-kuh… and the verse it turned into is SHLOH-kuh.`,

  'bala-why-start':
    `[thoughtful] It is worth pausing on how the epic opens. Not with a hero, but with a longing: someone asking out loud whether goodness this complete is even possible. And not with triumph, but with grief. The poem admits that its very first note came from refusing to look away from one small creature's death. Before Rama lifts a finger, we have already been told what kind of story this is going to be.`,

  'bala-term-adikavya':
    `The key word here is AH-dee KAAV-yuh — the first poem. [short pause]\n\nBecause of that morning by the river, the Rah-MAH-yuh-nuh is called the AH-dee KAAV-yuh, the first poem: not the oldest story ever told, but the first one composed as deliberate poetry, in the SHLOH-kuh meter that grief handed to Vaal-MEE-kee.`,

  'bala-birth':
    `Far to the north, in Ah-YOHD-yuh, King Duh-shuh-RUT-huh had everything a ruler could want except the one thing he wanted most: a child. At last he performed the poo-truh-kuh-MESH-tee — a great fire-sacrifice for a son — and out of the flames rose a shining figure holding a bowl of sacred PAH-yuh-sum, a sweet rice pudding, for his queens to share.\n\nAt that very moment, far away, the gods were desperate. A demon-king named RAH-vuh-nuh had grown unstoppable, and they went to Vishnu, the god who preserves the world, for help.\n\nRAH-vuh-nuh torments all three worlds, and the boon he holds has made him deaf to any fear. Only you can end this.\n\n[resolute] Then I will go down myself, and be born as a man.\n\nSo when Duh-shuh-RUT-huh's queens drank the PAH-yuh-sum, it was Vishnu himself quietly entering the world. Rama was born… along with his three brothers.`,

  'bala-blindspot':
    `[thoughtful] Here is the hinge the whole epic turns on. RAH-vuh-nuh's boon had made him untouchable by gods and demons, but in his pride he had never bothered to include humans on the list. Why fear something so small? That single blind spot is why God comes down through the one door left open, born as an ordinary man. Pride tends to guard against its equals… and forget about the ordinary.`,

  'bala-vishwamitra':
    `Years passed, and one day a fierce sage named Vish-wuh-MEE-truh strode into the court with a demand no father wants to hear.\n\nDemons are fouling my forest rituals. Send your son Rama to guard them.\n\n[pleading] He is barely more than a boy. Take my whole army instead, take me — but not him.\n\nIt must be Rama. No one else.\n\nDuh-shuh-RUT-huh had waited a lifetime for this son. But you do not refuse a sage like Vish-wuh-MEE-truh, and so Rama and his brother Lakshmana walked into the forest. There the boy's real education began: he faced down a demoness named TAH-tuh-kuh, was taught to use celestial weapons, and stood guard over the sage's fire.`,

  'bala-ahalya':
    `On that same journey, they came upon a strange grey shape lying beside the path. It was Uh-HULL-yuh — a woman who, after a bitter scandal of blame, had been cursed to lie as a stone for years, unseen and unforgiven.\n\n[warmly] Rama simply stepped up to her and offered his respect… and the curse broke. She rose out of the stone and back into her life.`,

  'bala-drawn-out':
    `[thoughtful] Two quiet things get set up in the forest. First, Rama's greatness is never something he generates alone. It gets drawn out of him by teachers who ask more of him than his own parents dared, while his father's hardest act of love is letting his cherished son walk toward danger.\n\nSecond, notice what the very first use of Rama's power is, long before any war: he gives someone frozen by shame her life back. Hold onto that. His is the power that restores… not only the power that destroys.`,

  'bala-term-svayamvara':
    `The key word here is swuh-YUM-vuh-ruh — a bride's own choosing. [short pause]\n\nA swuh-YUM-vuh-ruh is an old custom in which a bride chooses her own husband, often by way of a test the suitors must pass. The word means, literally, self-choice. Sita's hand comes with a test almost no one can pass, which is how the story makes sure the right man is the one who wins her.`,

  'bala-bow':
    `[thoughtful] Then the radiant Rama, best of men, took up Shiva's bow… and in the sight of all the mighty, bent it until it broke.\n\nIn the kingdom of MITH-ih-luh, King JUN-uh-kuh had set a single condition for his daughter's marriage.\n\nWhoever can lift the great bow of the god Shiva, and string it, may marry my daughter Sita.\n\nThe bow was an heirloom so massive that grown kings had failed even to make it shift on its stand. And Sita herself was no ordinary bride. Years earlier, JUN-uh-kuh had found her as a baby lying in a furrow of a freshly plowed field — a daughter of the earth itself.\n\n[warmly] Rama walked up to the bow, lifted it as though it weighed nothing, and as he bent it to string, it snapped clean in two with a crack like thunder. Sita chose him. The weddings of all four brothers followed, and the Book of Childhood came to a close… on a day of celebration.`,

  'bala-quiet-power':
    `[thoughtful] Watch how Rama passes the test, not just that he passes it. There is no straining, no showing off. The strength is simply complete, and the whole thing is over in a moment. The epic will keep drawing him exactly this way: powerful without ever needing to prove it.\n\nAnd Sita, born of the earth, is matched to the one man who can lift what the earth's own weight resists. The bond that the rest of this long story will tear apart and then slowly reunite… is founded right here.`,

  // ===== Ayodhya Kanda (Book 2) =====
  'ayodhya-where':
    `[thoughtful] The Bala Kanda closed on a wedding: Rama had won Sita, and the four brothers of Ah-YOHD-yuh were married. Years have passed, and Rama has grown into the prince everyone hoped he would be. His old father is finally ready to hand him the crown.\n\nThis book is about the morning that was supposed to happen and did not. In a single conversation, Rama loses the throne, and we watch what a genuinely steady person does when everything is taken away.`,

  'ayodhya-eve':
    `King Duh-shuh-RUT-huh, old and tired, named Rama his heir, and all of Ah-YOHD-yuh lit up for the coronation. But long ago the king had granted his youngest queen, Kai-KAY-ee, two wishes she had never spent. Now her maid MUN-tuh-ruh poured poison in her ear.\n\nOnce Rama is king, you and your son are nothing. Spend your two wishes tonight, while you still can.\n\nSo on the eve of the crowning, Kai-KAY-ee went to the king and named her price.\n\nGive the throne not to Rama but to my son BHUH-ruh-tuh. And send Rama into the forest for fourteen years.\n\nDuh-shuh-RUT-huh had given his word years ago, and a king's word cannot be unsaid. He broke where he stood, undone not by an enemy but by his own old promise.`,

  'ayodhya-equanimity':
    `When they told Rama — no crown, fourteen years of exile instead — everyone watched his face for the collapse. It never came. The text is careful about this: the news of losing a kingdom moved him no more than the news of gaining it had.\n\nHe touched his father's feet and went to calm his weeping mother, Kow-SHULL-yuh.\n\nA son's whole duty is to make his father's word come true, whatever it costs the son. I am going gladly.\n\nHis calm frightened people more than anger would have.`,

  'ayodhya-equanimity-note':
    `[thoughtful] This is the Gita's great idea shown as a story, long before the Gita ever spelled it out: Rama meets gain and loss with the same face. He is not hiding his grief so much as refusing to let the outcome own him. The throne was never the thing he was living for, so losing it cannot unmake him.`,

  'ayodhya-term-dharma':
    `The key word here is DHUR-muh — your duty, the right thing to do. [short pause]\n\nRama's whole choice here turns on one word: DHUR-muh. It means the right thing to do — your duty, what is owed. Rama's DHUR-muh as a son is to honor his father's word, and he holds to it even when it costs him a kingdom.`,

  'ayodhya-companions':
    `Rama meant to go into the forest alone. Sita would not hear of it.\n\nA wife's place is beside her husband. A palace without you is the real wilderness; the forest with you is home.\n\nHis brother Lakshmana refused too, and took up his bow to serve Rama through every one of the fourteen years. Rama argued — the forest is danger, hardship, snakes and demons — and it only made them more certain. So three of them walked out of Ah-YOHD-yuh in bark and deerskin, where a king should have ridden out in gold, and the whole city followed them weeping to the river's edge.`,

  'ayodhya-love-note':
    `[thoughtful] Sita and Lakshmana quietly change what the exile even is. What was meant as Rama's punishment becomes their chosen loyalty. The epic's picture of love is not staying comfortable together; it is refusing to let the person you love suffer alone. Here, devotion is measured by exactly what it is willing to walk into.`,

  'ayodhya-sandals':
    `Duh-shuh-RUT-huh died of grief within days. BHUH-ruh-tuh, the son the throne was stolen for, had been away through all of it. He came home to find his father dead and his brother banished in his name, and he was horrified. He refused the crown completely and marched to the forest to bring Rama back.\n\nThe throne is yours. Come home and rule. I will not touch what was taken from you.\n\nOur father gave his word, and it must stand. Go back and hold the kingdom until my fourteen years are done.\n\nSo BHUH-ruh-tuh took Rama's sandals, carried them home, and set them on the throne. For fourteen years he ruled not as king but as a caretaker for his brother's footwear, living like a hermit outside the capital.`,

  'ayodhya-power-note':
    `[thoughtful] BHUH-ruh-tuh is the epic's portrait of power turned down. Handed a whole kingdom, he wants none of it that is not rightfully his brother's, and he turns the throne into a seat of waiting. The sandals become the Rah-MAH-yuh-nuh's emblem of authority held in trust: leadership as service to an absent, rightful claim, not a prize grabbed because it happened to be offered.`,

  // ===== Aranya Kanda (Book 3) =====
  'aranya-where':
    `[thoughtful] Rama, Sita, and Lakshmana have spent years deep in the forest now, moving among the huts of the sages. It has been a long, quiet exile.\n\nThis book is where the quiet ends: a wounded pride far to the south, a temptation too lovely to doubt, and the moment Sita is carried off, which turns a family's exile into a war.`,

  'aranya-forest':
    `For over a decade the three lived among the forest hermits, who begged Rama for protection from the RUCK-shuh-suhs, the demons, that hunted them. Rama gave his word to clear the forest of them, and kept it, until word of this reached the demon-city of LUNG-kuh.\n\nIt began, as these things do, with an insult. A demoness named Shoorp-uh-NUK-ha, sister of the demon-king RAH-vuh-nuh, saw Rama and wanted him. When he turned her away, and Lakshmana too, she lunged at Sita in a rage. Lakshmana cut off her nose and ears, and she fled shrieking to her brother.`,

  'aranya-war-note':
    `[thoughtful] The war that ends the epic starts with a small cruelty and a fair response that pride cannot accept. Shoorp-uh-NUK-ha's humiliation is real. But her brother's reaction turns a wound to his family's vanity into a cosmic war. The Rah-MAH-yuh-nuh watches closely how an injury to the ego swells out of all proportion when power refuses to simply absorb it.`,

  'aranya-dharma-embodied':
    `[thoughtful] Rama is DHUR-muh itself given a body — virtuous, true in valor; king of all the world as Indra is king of the gods.\n\nInflamed by his sister and by tales of Sita's beauty, RAH-vuh-nuh went to a demon named MAH-ree-chuh with a plan to steal her. MAH-ree-chuh had felt Rama's arrow once and survived, and he tried to talk his king out of it.\n\nListen to me. Rama is not just a strong man. He is DHUR-muh itself walking in a body. To move against him is to move against the order of the world. It will be the end of us.\n\nRAH-vuh-nuh would not hear it. MAH-ree-chuh decided that fear of his own furious king was worse than fear of Rama, and agreed to help, knowing it would kill him.`,

  'aranya-enemy-note':
    `[thoughtful] Notice where the epic's deepest praise of its hero comes from: the very demon sent to destroy him. The Rah-MAH-yuh-nuh lets a RUCK-shuh-suh be the one to name Rama DHUR-muh embodied. And it shows tyranny's oldest move — silencing the advisor who tells you the truth, because the truth is inconvenient.`,

  'aranya-term-maya':
    `The key word here is MAH-yaa — illusion, a magical disguise. [short pause]\n\nWhat MAH-ree-chuh does next is pure MAH-yaa. He becomes a deer of gold and silver, beautiful enough that no one would doubt it is real. In the epics, MAH-yaa is exactly this: something that looks completely real and is not, set in your path to pull you where someone wants you to go.`,

  'aranya-golden-deer':
    `MAH-ree-chuh became a deer of gold dappled with silver, and grazed near the hut until Sita longed for it. Rama went to catch it, warning Lakshmana to guard her. When Rama's arrow finally struck it, the dying deer cried out in Rama's own voice.\n\nSita! Lakshmana! Help me!\n\nSita, terrified, drove Lakshmana to go after Rama, though he knew it was a trap. Before he left, he drew a line around the hut.\n\nDo not cross this line, whatever happens, and you will be safe.\n\nThen RAH-vuh-nuh came, disguised as a wandering holy beggar, and with a beggar's plea coaxed her across the line. He seized her and flew south for LUNG-kuh.`,

  'aranya-evil-note':
    `[thoughtful] The abduction needs three things and gets all three: a desire too lovely to doubt, a cry that turns love itself into a weapon, and a good deed — kindness to a holy man — twisted into the trap. Evil in the Rah-MAH-yuh-nuh rarely breaks down the gate. It wears something you were right to want and something you were right to honor, and it waits for you to step across your own line.`,

  'aranya-jatayu':
    `As RAH-vuh-nuh carried Sita south through the sky, an aged vulture-king named Juh-TAH-yoo, an old friend of Duh-shuh-RUT-huh, heard her cries and rose to stop him. It was hopeless, one old bird against the lord of the demons. Juh-TAH-yoo fought anyway, tore RAH-vuh-nuh's chariot apart and wounded him, and was cut down for it, his wings severed, left dying on the ground.\n\nHe held on just long enough for Rama to find him.\n\nSouth. He took her south, to LUNG-kuh. I could not stop him, but I saw.\n\nThen he died, and Rama cremated him with the honors owed to a father.`,

  'aranya-fight-note':
    `[thoughtful] Juh-TAH-yoo had no chance and rose anyway. The Rah-MAH-yuh-nuh honors the fight you cannot win when it is the fight your DHUR-muh asks of you. His failure is not really failure, because the one true thing an old bird could still do — tell Rama which way Sita was taken — is exactly what he stayed alive to give. Some duties are measured not by whether you win, but by whether you got up.`,

  // ===== Kishkindha Kanda (Book 4) =====
  'kishkindha-where':
    `[thoughtful] Rama has one thing to go on: a dying vulture's word that Sita was carried south, to the island of LUNG-kuh. He has no army and no allies, only his brother Lakshmana and his grief.\n\nThis book is where he starts to build a war, and he builds it out of others as broken as he is.`,

  'kishkindha-meeting':
    `Searching south, Rama and Lakshmana reached Kish-KIN-duh, kingdom of the VAH-nuh-ruhs, the forest people, a race of monkeys. There they met HUH-noo-mahn, wisest of them, minister to a deposed monkey-king named Soo-GREE-vuh. HUH-noo-mahn brought them to Soo-GREE-vuh, himself an exile: his own brother VAH-lee had driven him out and taken his wife.\n\nTwo dispossessed kings recognized each other, and over a sacred fire they swore an alliance.\n\nWin me back Sita, and I will win you back your throne.\n\nKill VAH-lee and set me back in Kish-KIN-duh, and every VAH-nuh-ruh I have will search the earth for your wife.\n\nGrief made them allies before anything else did.`,

  'kishkindha-broken-note':
    `[thoughtful] Rama does not arrive at the war with an army. He builds one out of the equally broken. The alliance with Soo-GREE-vuh is founded on shared loss, not on strength — the epic's quiet claim that people who have been dispossessed understand one another, and that help most often comes from the ones who also need it.`,

  'kishkindha-term-vanara':
    `The key word here is VAH-nuh-ruh — the forest people, a race of monkeys. [short pause]\n\nThe VAH-nuh-ruhs are the forest people, a race of monkeys with speech, kings, and cities of their own. They carry the whole middle of the epic: it is a VAH-nuh-ruh, HUH-noo-mahn, who finds Sita, and a VAH-nuh-ruh army that builds the bridge to LUNG-kuh.`,

  'kishkindha-vali':
    `To keep his side of the pact, Rama had to defeat VAH-lee — and VAH-lee was the stronger of the two. When Soo-GREE-vuh challenged his brother to a fight, Rama shot VAH-lee from hiding. The dying VAH-lee was bitter.\n\nIs this DHUR-muh? You are called the most righteous of princes, and you kill a man from concealment while he fights another?\n\nYou seized your brother's wife and ruled by force. Justice was owed, and a king's justice does not always come from the front.\n\nThe tradition has argued over this killing ever since. The Rah-MAH-yuh-nuh does not tidy it away.`,

  'kishkindha-vali-note':
    `[thoughtful] Here the epic lets its hero do a troubling thing, and lets the victim say so out loud. Rama is DHUR-muh embodied, and he still acts in a way people have argued about for two thousand years. That is the Rah-MAH-yuh-nuh's kind of honesty: it keeps the discomfort in the story instead of smoothing it over. You are allowed to sit with the question.`,

  'kishkindha-forgetting':
    `With Soo-GREE-vuh restored to his throne, the VAH-nuh-ruhs spread across the world to search. The southern party reached the edge of the ocean and lost heart: a hundred YOH-juh-nuhs of sea lay between them and LUNG-kuh, and no one could cross it.\n\nThen old JUM-buh-vahn, the wise bear-king, turned to HUH-noo-mahn, who had sat silent the whole time, and reminded him of what a boyhood curse had made him forget.\n\nYou are the son of the wind. No distance can hold you. You have simply forgotten what you are.\n\nAs JUM-buh-vahn spoke, HUH-noo-mahn began to grow.`,

  'kishkindha-forgetting-note':
    `[thoughtful] The epic's most beloved figure spends most of it not knowing what he can do. HUH-noo-mahn does not lack the strength to cross the ocean; he lacks the memory of it, until a friend says plainly what he is. The Rah-MAH-yuh-nuh suggests that much of what stops us is not weakness but forgetting — and that the great service one person does another is to remind them who they are.`,

  // ===== Sundara Kanda (Book 5) =====
  'sundara-where':
    `[thoughtful] Reminded of who he is, HUH-noo-mahn has grown vast. Now he will do alone what a whole army could not: cross the ocean to LUNG-kuh to find Sita.\n\nThis is the book the tradition loves most and recites most often — the Sundara Kanda, the Beautiful Book. Its beauty is that its hero is not Rama or RAH-vuh-nuh, but a servant carrying out an errand for someone he loves.`,

  'sundara-leap':
    `HUH-noo-mahn climbed a mountain, pressed it flat beneath his feet, and hurled his body across a hundred YOH-juh-nuhs of open ocean toward LUNG-kuh. The sea sent up monsters and mountains to test him along the way, and he passed each one — bursting through one, honoring another, outwitting a third. Alone, unaided, he crossed what an army could not.`,

  'sundara-beautiful-note':
    `[thoughtful] The most celebrated book of the whole Rah-MAH-yuh-nuh centers not on the hero or the villain but on a servant running an errand. Its beauty, the tradition says, is exactly that: devotion in motion, a mind so fixed on the work of the one it loves that an ocean becomes a single step. Greatness here is not rank. It is wholehearted service.`,

  'sundara-term-bhakti':
    `The key word here is BHUK-tee — loving devotion. [short pause]\n\nWhat carries HUH-noo-mahn across the sea is BHUK-tee. Not duty done grudgingly, but love so complete that the hardest task feels light. HUH-noo-mahn is the tradition's clearest picture of it: the servant whose devotion makes him greater than kings.`,

  'sundara-ashoka':
    `Shrunk now to the size of a cat, HUH-noo-mahn searched RAH-vuh-nuh's city all night, and found Sita at last in the Uh-SHOH-kuh grove — thin with grief, ringed by demon-guards, refusing RAH-vuh-nuh's threats and pleas alike, choosing death over dishonor. From the trees, HUH-noo-mahn let Rama's ring fall into her lap. She wept to know Rama was alive and coming.\n\nHUH-noo-mahn offered to carry her home himself, that instant, on his shoulders.\n\nNo. Rama must come himself and win me back, so that his honor and mine both stand whole. Carry him my message, not me.\n\nHe took her jewel and her words instead.`,

  'sundara-captive-note':
    `[thoughtful] Sita in the grove is not a prize waiting to be collected. She is a will that RAH-vuh-nuh cannot bend and that even her rescuer cannot override. Her refusal of the easy escape — insisting that Rama come himself — is her own claim on her dignity: she will be won back rightly, or not at all. The Rah-MAH-yuh-nuh's captive is its most unbreakable character.`,

  'sundara-burning':
    `To take RAH-vuh-nuh's measure before he left, HUH-noo-mahn let himself be captured and hauled before the throne. RAH-vuh-nuh ordered him killed, but his own brother Vih-BHEE-shuh-nuh stopped it.\n\nYou cannot kill a messenger. It is against all law.\n\nSo instead they wrapped HUH-noo-mahn's tail in cloth and set it alight to shame him. It was a mistake. HUH-noo-mahn slipped his bonds and, leaping roof to roof with his burning tail, set LUNG-kuh ablaze — a warning written in fire across the demon-king's own capital. Then he quenched the flame in the sea and leapt home to lay Sita's jewel in Rama's hands.`,

  'sundara-pride-note':
    `[thoughtful] The punishment meant to humiliate HUH-noo-mahn becomes the instrument of RAH-vuh-nuh's own warning. The Rah-MAH-yuh-nuh keeps showing pride arrange its own downfall: the fire lit to mock a servant announces, in letters no one in LUNG-kuh can miss, that the reckoning has already crossed the sea.`,

  // ===== Yuddha Kanda (Book 6) =====
  'yuddha-where':
    `[thoughtful] HUH-noo-mahn is back with news: Sita lives, held in LUNG-kuh across the sea. Now Rama gathers his VAH-nuh-ruh army and marches south to the water's edge.\n\nThis is the last book of the war — the crossing, the long siege, the fall of RAH-vuh-nuh, and a homecoming fourteen years in the making.`,

  'yuddha-refuge':
    `As the war neared, RAH-vuh-nuh's own brother Vih-BHEE-shuh-nuh urged him to give Sita back and be spared. RAH-vuh-nuh spurned him and cast him out. So Vih-BHEE-shuh-nuh crossed to Rama's camp and asked for shelter. Some of Rama's advisors warned it was a trap — the enemy's own brother, at the door.\n\nRama overruled them with a vow that defines him.\n\nWhoever comes to me even once, saying 'I am yours' and seeking shelter, I will protect against all beings. This is my unbreakable rule.\n\nHe granted Vih-BHEE-shuh-nuh refuge, and promised him the throne of LUNG-kuh whatever the war's outcome.`,

  'yuddha-refuge-note':
    `[thoughtful] At the edge of the decisive war, Rama's defining act is not a weapon but a mercy: shelter given to the enemy's brother, against his own advisors' fear. The Rah-MAH-yuh-nuh makes shuh-ruh-NAH-guh-tee — the absolute protection of anyone who surrenders — the deepest expression of DHUR-muh, higher than caution, higher even than winning.`,

  'yuddha-term-sharanagati':
    `The key word here is shuh-ruh-NAH-guh-tee — taking refuge, surrender. [short pause]\n\nShuh-ruh-NAH-guh-tee means taking refuge — surrendering yourself to someone's protection. Rama's vow to shelter anyone who asks, even his enemy's brother, makes it the highest form of DHUR-muh in the epic. Whole paths of devotion were later built on this single idea: that the divine never turns away the one who surrenders.`,

  'yuddha-bridge':
    `The ocean itself barred the way to LUNG-kuh. Rama sat in appeal to the sea for three days, and when it would not answer, he took up his bow in anger. The sea-god appeared and offered a plan.\n\nI cannot part myself. But your VAH-nuh-ruhs can build across me. Let them.\n\nSo the monkey-army raised a causeway of boulders and tree-trunks across the water — the SAY-too — stone by stone, each name-inscribed rock floating where it should have sunk. Across it the whole army poured, and the siege of LUNG-kuh began.`,

  'yuddha-bridge-note':
    `[thoughtful] The bridge is the epic's image of the impossible made crossable by many hands. What one leap did by a single hero's power, the army does by collective labor — and the war is won not by a lone champion but by the patient, unglamorous work of countless ordinary hands, laying one stone at a time.`,

  'yuddha-ravana':
    `The war was long and terrible. Soo-GREE-vuh fought, Lakshmana was struck down and revived by a Himalayan herb that HUH-noo-mahn carried back mountain and all, and the demon-ranks fell one by one, until only RAH-vuh-nuh was left.\n\nRama and RAH-vuh-nuh faced each other at last. Every head Rama cut from the ten-headed king grew back as fast as it fell, until Rama loosed the divine weapon the sages had given him, and it found RAH-vuh-nuh's heart. The ten-headed king — scholar, devotee, and tyrant all at once — fell.\n\nAnd then, remarkably, Rama ordered his enemy honored in death.\n\nA great one has died. Enmity ends at the pyre. Give him the rites of a king.`,

  'yuddha-ravana-note':
    `[thoughtful] RAH-vuh-nuh is no cartoon. He was a brilliant scholar and a genuine devotee of Shiva, undone by a single ungoverned appetite. The Rah-MAH-yuh-nuh kills him and then honors him, insisting that enmity belongs to the living and that greatness gone wrong is still greatness worth mourning. Evil here is not the absence of gifts. It is gifts cut loose from restraint.`,

  'yuddha-return':
    `Sita was recovered — but not before an ordeal the epic records without flinching. Mindful of what his people would whisper about a queen who had lived in another man's city, Rama asked her to prove her purity by walking into fire. She did, and the flames refused to touch her; the fire-god himself gave her back unharmed. The tradition has questioned that demand ever since.\n\nVih-BHEE-shuh-nuh was crowned in LUNG-kuh. And with the fourteen years exactly spent, Rama, Sita, and Lakshmana flew home to Ah-YOHD-yuh, where BHUH-ruh-tuh waited with the sandals and the whole city, told they were coming, lit every lamp it had to guide them in. That night of lamps for a homecoming is the night the tradition still keeps as Diwali.`,

  'yuddha-return-note':
    `[thoughtful] The exile ends not in triumph but in return: to family, to the waiting brother, to a city that kept its light burning. The Rah-MAH-yuh-nuh's deepest reward is not the throne regained but the coming home. And the lamps of Ah-YOHD-yuh became a festival because the tradition understood that the return of the good is worth lighting up the whole world for.`,

  // ===== Uttara Kanda (Book 7) =====
  'uttara-where':
    `[thoughtful] The war is won. Rama is home in Ah-YOHD-yuh at last, crowned king, the exile finally behind him. This should be where the story ends happily.\n\nBut the Rah-MAH-yuh-nuh has one more book, and it is the hardest one — about what victory costs, and about a queen who finally answers injustice by going home.`,

  'uttara-ramarajya':
    `Rama's rule became the name the tradition never let go of: Rahm RAHJ-yuh, the kingdom where DHUR-muh stands whole. The rains came on time and the earth gave freely; no parent buried a child; no one lied or went without. For a while the last book simply lets the ideal exist — a realm so justly ordered that reformers ever after, Gandhi among them, would invoke Rahm RAHJ-yuh as the name of the society still worth building.`,

  'uttara-ramarajya-note':
    `[thoughtful] The Rah-MAH-yuh-nuh pauses on the reward: a whole society at peace because its ruler holds himself to the strictest account. Rahm RAHJ-yuh endures as an ideal precisely because it locates good governance not in power or wealth but in a leader's unbending fidelity to DHUR-muh. And it is against that very standard that the book's coming tragedy will measure Rama himself.`,

  'uttara-term-ramrajya':
    `The key word here is Rahm RAHJ-yuh — the reign of Rama, an ideal just society. [short pause]\n\nRahm RAHJ-yuh means, literally, the reign of Rama — and it became the tradition's word for a perfectly just society, where DHUR-muh holds and no one is wronged. It is less a memory of the past than a standard for the future: the kind of world worth trying to build.`,

  'uttara-banishment':
    `Then the book turns bleak. A washerman, quarreling with his wife, threw out a cruel line that spread through the city.\n\nI am not Rama, to take back a wife who has lived in another man's house.\n\nThe whisper grew until it reached the throne. And Rama — the one king whose whole duty was to be above reproach in his people's eyes — banished the pregnant, innocent Sita to the forest, to protect the good name of the crown.\n\nIt is the Rah-MAH-yuh-nuh's most painful passage, and the text does not excuse it. The perfect man, by the cold logic of a king's reputation, commits a deep injustice against the person most loyal to him.`,

  'uttara-banishment-note':
    `[thoughtful] Having shown Rama as DHUR-muh embodied, the Uttara Kanda shows DHUR-muh's own duties colliding — the king's duty to his people's trust against the husband's duty to his innocent wife — and lets Rama choose in a way that has troubled and angered readers for centuries. The epic's honesty is that it records the wound instead of healing it. It does not ask you to approve. It asks you to see clearly.`,

  'uttara-sons':
    `Sita took refuge in the hermitage of Vaal-MEE-kee — the poet who had composed the Rah-MAH-yuh-nuh itself — and there she bore Rama twin sons, LUH-vuh and KOO-shuh. Vaal-MEE-kee taught the boys the great poem, and years later they sang it, not knowing whose story it was, before Rama's own court. Rama saw his own face in theirs, and heard the truth in their song. He sent for Sita, asking her to prove her purity once more before the assembly so that he could take her back.`,

  'uttara-poem-note':
    `[thoughtful] The story turns back on itself here: Rama's own children learn his life as a song from the poet who wrote it, and carry it back to the man who lived it. The Rah-MAH-yuh-nuh becomes, for a moment, a story about the power of its own telling — that a life recounted truthfully returns to teach even the one who lived it.`,

  'uttara-earth':
    `Sita had had enough of tests. Asked to prove herself one final time before the court, she gave a different answer. She had been born of a furrow in a plowed field, the earth's own daughter; now she called on her mother to take her back.\n\nIf I have been true, let the earth that bore me open and receive me.\n\nThe ground split, a throne rose from it, and Sita descended into the earth and was gone — beyond any court's judgment, forever. Rama ruled on without her, bereft, until his own time came and he too laid down his human life. There the story closes.`,

  'uttara-earth-note':
    `[thoughtful] Sita's last act is a refusal dressed as a return: she will not be tested again, and she takes herself beyond the reach of a world that keeps demanding she prove her worth. The Rah-MAH-yuh-nuh ends not in tidy reunion but in a loss the hero cannot undo — the tradition's honest acknowledgment that even a life lived by DHUR-muh does not escape sorrow, and that the earth's own daughter answered injustice by going home.`,
};

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY. Run:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-ramayana-audio.mjs bala');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const filter = process.argv[2];
const entries = Object.entries(SCRIPTS).filter(([id]) => !filter || id.includes(filter));
if (entries.length === 0) {
  console.error(`No sections match "${filter}". Known ids:\n  ${Object.keys(SCRIPTS).join('\n  ')}`);
  process.exit(1);
}
console.log(`Generating ${entries.length} clip(s)${filter ? ` matching "${filter}"` : ''} with voice ${VOICE_ID}…\n`);

for (const [id, text] of entries) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  });

  if (!res.ok) {
    console.error(`✗ ${id}: ${res.status} ${res.statusText}\n${await res.text()}`);
    process.exit(1);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const file = join(OUT_DIR, `${id}.mp3`);
  writeFileSync(file, buf);
  console.log(`✓ ${id}.mp3  (${(buf.length / 1024).toFixed(0)} KB)`);
}

console.log(`\nDone. ${entries.length} clips in assets/audio/ramayana/.`);
