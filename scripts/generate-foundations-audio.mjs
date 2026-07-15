// Batch-generate ElevenLabs narration for the Foundations course.
//
// One MP3 per section (keyed by the section's stable id), written into
// assets/audio/foundations/. The app bundles those and plays one per reader
// page — see src/data/foundationsAudioManifest.ts.
//
// Run it (it uses YOUR key and bills YOUR account). An optional last arg filters by
// section id, so you can regenerate one act at a time:
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs            # all
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs f-thread    # just Part 2
//
// Re-running overwrites the files, so it's safe to iterate on the voice.
// SCRIPTS holds Parts 1–2 so far; add more sections to extend.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'assets', 'audio', 'foundations');

// The voice you chose (Oliver — Clean, British and Steady).
const VOICE_ID = 'L1aJrPa7pLJEyYlh3Ilq';

// v3: expressiveness comes from the audio tags + IPA in the script (not from
// settings). stability 0.5 = "Natural" (0.0 = Creative, 1.0 = Robust/flat).
const MODEL_ID = 'eleven_v3';
const OUTPUT_FORMAT = 'mp3_44100_128'; // 128 kbps mono — good for bundling
const VOICE_SETTINGS = {
  stability: 0.5, // "Natural"; drop toward 0.0 for the more dramatic clips
  similarity_boost: 1.0,
  use_speaker_boost: true,
};

// Parts 1–2 for v3. Text mirrors docs/foundations-narration-script.md: IPA in
// "/…/" for pronunciation, [audio tags] for delivery, and ellipses / [short pause]
// / line breaks for pacing (v3 ignores <break> tags). Backtick strings so the IPA's
// double quotes and the apostrophes survive. Add more acts here from the doc.
const SCRIPTS = {
  'f-name-no-founder':
    `[thoughtful] Hinduism has no founder… no single book… and no one in charge.\n\nLet's start with what Hinduism is not. Think of Christianity, with Jesus… Islam, with Muhammad… Buddhism, with the Buddha — each has a founder you can name.\n\nHinduism has none. Nobody started it. Instead, many local traditions grew up side by side across India over more than three thousand years… and only much later were they gathered under one name — mostly by outsiders, to keep things simple.\n\n[warmly] So what you're left with is this: no founder — no single person who began it… no one holy book — a whole library instead… and no central authority. Nobody decides what counts as correct.`,
  'f-name-river':
    `[curious] Even the name isn't its own… it's a river, mispronounced.\n\nSo where did the word Hindu even come from? Not from Hindus. It began as the name of a river.\n\nIn Sanskrit, the great river to the northwest was called the "/ˈsɪnduː/". Persians living west of it couldn't manage the S, and said Hindu instead — they just meant "the people over there," past the river. Later, the Greeks dropped the H too.\n\n[warmly] That single river-name became three words we still use: Hindu… India… and Indus. For most of history, Hindu pointed to a place — not a religion.`,
  'f-name-sanatana':
    `The name it gives itself is suh-NAA-tuh-nuh DHUR-muh — the eternal way. [short pause]\n\nIf outsiders supplied the word Hindu, what do followers call it themselves? suh-NAA-tuh-nuh DHUR-muh — usually translated as "the eternal way."\n\nThe idea behind the name: this isn't a club you sign up for. It's more like a natural order that was always here, and always will be… something you wake up to, and live by — not something you join.\n\n[warmly] That's also why there's no founder. Nobody invents the sunrise… you just notice it.`,
  'f-name-sanskrit':
    `An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. [short pause]\n\nBut it still had to be passed down somehow. For centuries there was no book to keep it in — writing wasn't used for it yet.\n\nSo how did it survive? People memorized it, word for word, and recited it aloud — one generation teaching the next. The language they used is Sanskrit — "/ˈsʌmskrɪtə/" — meaning "put together properly."\n\n[thoughtful] It was practically built for the ear: exact rhythm, so a wrong word breaks the beat… exact pitch, fixed for every syllable… and repetition, woven in as a backup.\n\n[warmly] The result? Two reciters a thousand miles apart would land on the very same syllable. These spoken texts are the "/ˈveɪdəz/" — chanted for centuries before anyone finally wrote them down.`,

  // Part 2 — "What Makes Someone Hindu".
  'f-thread-practice':
    `[thoughtful] What makes someone Hindu isn't a belief… it's what they practise. [short pause]\n\nIf there's no founder, no single book, and no one in charge — what makes someone a Hindu at all?\n\nHere's the surprising part: it isn't what they believe. There's no creed to sign, and no moment of conversion. A Hindu can hold that God is one… or many… or everything… or an entirely open question — and still be a Hindu in good standing, with nobody calling them a heretic.\n\n[warmly] What holds it all together is practice — how you live, what you do at the shrine, how you mark the year. Practice is the membership. That single idea… is the hinge the whole tradition turns on.`,
  'f-thread-compare':
    `Judaism, Christianity, and Islam ask what you believe… Hinduism asks what you do. [short pause]\n\nLine Hinduism up against Judaism, Christianity, and Islam, and the real difference isn't the number of gods.\n\nEach of those three turns on a founder… a single book… a confession of faith… and a judgement, at the end of time. Judaism comes closest to Hinduism — it too is a practice and a people, more than a set of beliefs — but it still has Sinai, a covenant, and one God.\n\n[thoughtful] Hinduism has none of those fixed anchors. And instead of ending in one final judgement… it pictures time as a wheel that keeps turning.`,
  'f-thread-streams':
    `[curious] Because practice holds it together, Hinduism could branch into four streams… without ever splitting. [short pause]\n\nIf no one polices belief, you might expect Hinduism to have split into rival churches, the way Christianity did. It never did.\n\nThere was no council with the power to expel anyone, so nobody was expelled. It simply branched — into four broad streams, each centred on a different face of the divine. Most Hindus never announce which one they belong to… the shrine at home quietly shows you.\n\n"/ˈvaɪʃnəvə/"s centre on "/ˈvɪʃnuː/" — and so on "/ˈrɑːmə/" and "/ˈkrɪʃnə/"… "/ˈʃaɪvə/"s centre on "/ˈʃɪvə/"… "/ˈʃɑːktə/"s centre on the Goddess, "/ˈdeɪvi/"… and "/ˈsmɑːrtə/"s keep several at once, treating them as faces of one reality.`,
  'f-thread-ishta':
    `[warmly] Nobody assigns you a god — you choose the one you love. That is your "/ˈɪʃtə ˈdeɪvətɑː/". [short pause]\n\nSo which stream are you? In Hinduism… nobody hands you the answer.\n\nYour "/ˈɪʃtə ˈdeɪvətɑː/" is your chosen deity — the form of the divine you feel closest to. You pick it, and your worship reaches the one reality through that face.\n\nA grandmother keeps "/ˈkrɪʃnə/"… her son keeps "/ˈʃɪvə/"… her granddaughter keeps "/ˈdʊrɡɑː/" — all under one roof, and nothing is wrong. [warmly] That isn't the system straining to cope. That is the system… working exactly as designed.`,

  // Part 3 — "Core Beliefs".
  'f-claim-brahman':
    `[thoughtful] Behind every god and every form… is a single reality. It is called "/ˈbrɑːmən/". [short pause]\n\nSo what is behind all those faces? The four streams are all reaching for the same thing.\n\nThey call it "/ˈbrɑːmən/" — not a god sitting somewhere, watching you… but the ground of everything that is: pure awareness, without edges, and without a face.\n\n[warmly] Every deity you're about to meet is a face placed on "/ˈbrɑːmən/"… so that a human being has something to love, and hold onto. The formless is hard to pray to. A face is not.`,
  'f-claim-atman':
    `[thoughtful] The same one reality is also what looks out from inside you — your true self… "/ˈɑːtmən/". [short pause]\n\nNow turn the telescope around — from the whole universe… to you.\n\nNotice that you can watch your own thoughts arrive, and pass. Whatever is doing the watching — the awareness behind your eyes — is "/ˈɑːtmən/", your true self.\n\nIt isn't the body, which changes with age. It isn't your mood, which comes and goes. [warmly] "/ˈɑːtmən/" is the witness that has been there the whole time… unchanged, since you were a child.`,
  'f-claim-tat-tvam-asi':
    `"/ˈbrɑːmən/" and "/ˈɑːtmən/" are not two things — they are one. That is the whole claim. [short pause]\n\nHere is the turn the whole tradition is built on: "/ˈbrɑːmən/", the one reality… and "/ˈɑːtmən/", your deepest self… are not two things. They are one, and the same.\n\nPicture a clay pot, sitting out in the open air. The space inside the pot, and the vast space of the sky, look separate — but they aren't. The pot has walls. The space does not. Break the pot… and nothing is released — because there was only ever one space, briefly shaped.\n\n[dramatically] You are the space inside the pot. [whispers] You are not standing near the divine. [warmly] You are made of it… and have simply forgotten.`,
  'f-claim-maya':
    `[curious] Why doesn't oneness feel true? Because the world is misread, not unreal — that misreading is "/ˈmɑːjɑː/". [short pause]\n\nIf you really are one with everything… why doesn't it feel that way? The answer is "/ˈmɑːjɑː/".\n\nThe idea that "/ˈmɑːjɑː/" means "the world is an illusion" is the mistranslation that has done the most damage. "/ˈmɑːjɑː/" isn't "fake." It is misreading — seeing something as what it isn't.\n\n[thoughtful] Picture a coiled rope on the ground at dusk. You see a snake… your heart pounds… and you run. The rope was never unreal — your reading of it was. That is "/ˈmɑːjɑː/": the misreading, not the thing. And notice — the fear it gave you was completely real… while it lasted.`,
  'f-claim-prana':
    `One living current runs through all of it — breath, body, wind. It is called "/ˈprɑːnə/". [short pause]\n\nBehind the misreading, one living current runs through everything. It is called "/ˈprɑːnə/".\n\n"/ˈprɑːnə/" means breath — but not only breath. It is the animating energy in a body, a tree, a gust of wind… the tradition's bridge between the physical and the spiritual: the life that moves.\n\n[warmly] It is also the most practical idea in this whole part. It's why nearly every Hindu practice — yoga, meditation, chanting — begins at the breath. Steady the breath… and you have a handle on the mind.`,
  'f-claim-gunas':
    `Everything nature makes is woven from three strands — the three "/ˈɡuːnɑːs/". [short pause]\n\nEverything that current flows through — every person, every mood, every moment — is woven from three strands, called the "/ˈɡuːnɑːs/".\n\nThey aren't three types of person, and they aren't good, better, and best. All three run in everyone at once — only the ratio shifts, through the day. The work isn't to erase any of them… it's to notice which one is running you, right now.\n\n"/ˈsɑːtvə/" — clarity, lightness, balance… "/ˈrɑːdʒəs/" — heat, drive, restlessness… "/ˈtɑːməs/" — inertia, heaviness, fog.`,

  // Part 4 — "Karma & Rebirth".
  'f-wheel-samsara':
    `[thoughtful] If the witness is what you truly are… death changes the clothes, not the wearer. [short pause]\n\nSo what happens when the body dies? If "/ˈɑːtmən/" — the witness — is what you really are, then death isn't the end of you. It is a change of clothes.\n\nThis endless round is called "/səmˈsɑːrə/" — the wheel: birth… a life… death… and birth again. The "/ˈɡiːtɑː/" puts it exactly this way — the self changes bodies as a person changes worn-out clothes.\n\n[thoughtful] "/səmˈsɑːrə/" isn't a horror… and it isn't a reward. It is simply how things are — turning on, and on… until one day, they don't.`,
  'f-wheel-karma':
    `[curious] What steers the wheel is what you do. "/ˈkɑːrmə/" means action… not fate. [short pause]\n\nSo what steers the wheel — what shapes the next life? Not a judge. "/ˈkɑːrmə/" does.\n\nThe word "/ˈkɑːrmə/" literally means action, or doing. What you do plants what comes back to you — cause and effect, carried on through lives, instead of stopping politely at death. Nobody is sentencing you. You are planting seeds.\n\n[reassuring] That is why "it's my "/ˈkɑːrmə/", I can't change it" gets it exactly backwards. "/ˈkɑːrmə/" is your own action — so it is precisely the part you can change.`,
  'f-wheel-dharma':
    `The real question isn't "what is the rule?" but "what is mine to do?" That is "/ˈdɑːrmə/". [short pause]\n\nIf you can change your "/ˈkɑːrmə/" by acting well, the next question is obvious: what is the right action? Hinduism gives a surprising answer.\n\nThe question — "what is right for me to do?" — is "/ˈdɑːrmə/". It isn't ten commandments handed to everyone alike. A soldier's "/ˈdɑːrmə/", and a mother's "/ˈdɑːrmə/", are genuinely different — and both are right.\n\n[thoughtful] This is why Hindu ethics can feel situational to outsiders. It is situational — on purpose. Because a single rule that fits every life… ends up fitting no life particularly well.`,
  'f-wheel-ahimsa':
    `One duty comes close to universal: cause no harm you don't have to. That is "/əˈhɪmsɑː/". [short pause]\n\nIf duty depends on who you are, is anything close to a universal rule? One thing comes closest: "/əˈhɪmsɑː/".\n\n"/əˈhɪmsɑː/" means, literally, "non-harming" — causing no harm you don't have to. It is the nearest thing the tradition has to a commandment.\n\n[warmly] And it is a discipline, not a mood: harmlessness — deliberately chosen — by someone perfectly capable of doing otherwise. Gandhi built a freedom movement on it. The Jains carry it further than any Hindu does.`,
  'f-wheel-moksha':
    `The goal is not heaven. It is getting off the wheel altogether — "/ˈmoʊkʃə/". [short pause]\n\nSo where does it all lead — what is the point of the turning wheel? Not heaven. The goal is "/ˈmoʊkʃə/": getting off the wheel entirely.\n\n"/ˈmoʊkʃə/" means release. It is waking up, out of the whole round of birth and death — because you finally see what you always were… that space inside the pot, one with everything.\n\n[warmly] Even heaven, in this system, is just another pleasant place you eventually have to leave. "/ˈmoʊkʃə/"… is the only real exit.`,
  'f-wheel-aims':
    `[curious] You are not required to sprint for the exit — pleasure and prosperity are proper goals too. [short pause]\n\nYou might expect the goal to be renouncing everything and racing for "/ˈmoʊkʃə/". It isn't.\n\nHinduism names four proper aims of a human life — the "/ˌpʊrʊˈʃɑːrtəs/". Look at what made the list: this is not an ascetic religion, that grudgingly tolerates the world. It is a world-affirming one — that simply keeps an exit door open, at the back.\n\n"/ˈdɑːrmə/" — to live rightly… "/ˈɑːrtə/" — to prosper, to build and provide for others… "/ˈkɑːmə/" — to enjoy: desire, pleasure, love, beauty… and "/ˈmoʊkʃə/" — to be free of the whole cycle.`,
  'f-wheel-yogas':
    `There are four roads to that exit — each matched to the kind of person you already are. [short pause]\n\nAnd there isn't just one road to that exit. There are four — called the yogas — and each suits a different kind of person.\n\nNone outranks the others. [warmly] You don't have to become someone else to arrive. You simply take the road that fits how you're already built.\n\n"/ˈbʌkti/" — the path of love and devotion, if your heart leads… "/ˈkɑːrmə/" yoga — the path of selfless work, if you'd rather act than sit… "/ˈɡjɑːnə/" — the path of knowledge, if you must reason it through… "/ˈrɑːdʒə/" — the path of meditation, if you can sit still.`,

  // Part 5 — "The Gods".
  'f-faces-trimurti':
    `Nobody falls in love with a philosophy — so it grew faces. Start with the great three. [short pause]\n\nAll that philosophy is true — but nobody falls in love with an abstraction. So Hinduism grew faces: gods you can picture, name, and pray to. Start with the great three — the "/trɪˈmuːrti/".\n\n"/ˈbrɑːmɑː/" creates the universe… "/ˈvɪʃnuː/" preserves it… and "/ˈʃɪvə/" dissolves it. [thoughtful] Notice what that third job means: destruction, here, isn't evil — it is what makes room, for the next world. The universe breathes in… and out… and in.\n\nOne oddity: "/ˈbrɑːmɑː/", the creator, is barely worshipped anywhere today. Making the world, apparently… was the easy part.`,
  'f-faces-avatar':
    `When the world goes badly wrong, "/ˈvɪʃnuː/" comes down into it. Each descent is an "/ˈɑːvətɑːr/". [short pause]\n\nOf the three, "/ˈvɪʃnuː/" the preserver has a particular habit: when the world tips into chaos, he comes down into it — born in a body — to set things right.\n\nEach of those descents is an "/ˈɑːvətɑːr/" — literally, a "crossing-down," into the world. And this one fact clears up half of a beginner's confusion.\n\n[warmly] "/ˈrɑːmə/" is "/ˈvɪʃnuː/". "/ˈkrɪʃnə/" is "/ˈvɪʃnuː/". They aren't rival gods, competing for your attention — they are the same god, come down twice, into two different emergencies.`,
  'f-faces-shakti':
    `[dramatically] Not one of the gods can act without her. The Goddess is power itself — "/ˈʃʌkti/". [short pause]\n\nSo far, the gods have been male. Here is the twist: not one of them can act, without her.\n\n"/ˈʃʌkti/" means energy, capability, power — the very ability to do anything at all. "/ˈʃɪvə/", without his "/ˈʃʌkti/", is famously pictured as inert — a corpse. She is the force behind every god's action.\n\n[dramatically] And she is one Goddess, with many tempers: "/ˈpɑːrvəti/" is "/ˈdʊrɡɑː/" is "/ˈkɑːli/" — the gentle wife… the lion-riding warrior… and the terrifying one who ends things. [warmly] For millions of Hindus, She is the supreme reality. Full stop.`,
  'f-faces-family':
    `Learn six names and how they connect — and almost any Hindu story becomes readable. [short pause]\n\nYou now have the main cast. The last trick is seeing how they connect — because the relationships are what make the stories readable. The chart shows them laid out; here is the shape of it.\n\nEvery god is paired with a goddess. "/ˈvɪʃnuː/" comes down as "/ˈrɑːmə/" and "/ˈkrɪʃnə/". "/ˈʃɪvə/" and "/ˈpɑːrvəti/" have a son — "/ɡəˈneɪʃə/", the elephant-headed one, greeted first, before anything at all begins.\n\n[warmly] And off to the side stands "/ˈhənʊmɑːn/" — who can do absolutely anything, and wants nothing… except to serve "/ˈrɑːmə/". That he is held up as the ideal tells you a great deal about what the tradition actually admires.`,

  // Part 6 — "The Scriptures".
  'f-library-shelves':
    `There is no one holy book. There is a library — and it has just two shelves. [short pause]\n\nSo where are all these gods and ideas actually written down? There is no single Bible. There is a whole library — but knowing its two shelves is most of what a beginner needs.\n\nThe top shelf is "/ˈʃruːti/" — meaning "heard." It holds the "/ˈveɪdəz/", and, at their end, the "/uːˈpʌnɪʃədz/" — received rather than authored, and carrying the real authority. Everything back in Core Beliefs came from this shelf: "/ˈbrɑːmən/"… "/ˈɑːtmən/"… "you are that."\n\n[warmly] The bottom shelf is "/ˈsmrɪti/" — meaning "remembered": the "/ˈɡiːtɑː/", the two epics, the "/pʊˈrɑːnəz/" — retold, adapted, argued with, over centuries. The stories everyone actually knows… live on this second shelf.`,
  'f-library-epics':
    `Two great epics sit on that second shelf: one man does right at any cost… one family destroys itself. [short pause]\n\nTwo great epics sit on that second shelf — and between them, they hold most of the stories you'll ever hear.\n\nThe "/rɑːˈmɑːjənə/" is the tidy one. "/ˈrɑːmə/" is exiled… his wife "/ˈsiːtɑː/" is stolen by the demon king "/ˈrɑːvənə/"… "/ˈhənʊmɑːn/" finds her… and "/ˈrɑːvənə/" falls. At heart, it is a story about holding to your duty — even when it costs you everything.\n\n[thoughtful] The "/ˌmɑːhɑːˈbɑːrətə/" is the messy one. Two halves of one family go to war over a throne… and almost everyone loses. Far longer, far murkier — and far more honest about how people actually are.`,
  'f-library-gita':
    `Inside that messy epic, a soldier lays down his bow — and gets a seven-hundred-verse answer. [short pause]\n\n[dramatically] Buried inside the "/ˌmɑːhɑːˈbɑːrətə/" is its most famous moment. On the eve of battle, a warrior named "/ˈɑːrdʒʊnə/" looks across the field… sees his own cousins, his teachers, his friends — in the enemy army… and simply cannot do it. He lays down his bow.\n\nWhat his charioteer says next, to talk him through it, is the "/ˈbɑːɡəvəd ˈɡiːtɑː/". And the charioteer is "/ˈkrɪʃnə/" — who is "/ˈvɪʃnuː/", as you now know.\n\n[warmly] So the most-read text in all of Hinduism… is seven hundred verses of a man being gently talked out of a breakdown. And that is precisely why it travels: everyone, sooner or later, freezes at a choice like "/ˈɑːrdʒʊnə/"'s.`,

  // Part 7 — "Rituals & Festivals".
  'f-living-murti':
    `None of this is a religion you read. It is one you do — starting by welcoming a guest. [short pause]\n\nRemember the very first idea: Hinduism is something you do… not something you sign up to believe. So what does the doing look like? It begins in front of a "/ˈmuːrti/" — the sculpted image of a god.\n\nCalling a "/ˈmuːrti/" an "idol" gets the grammar completely wrong. In "/ˈpuːdʒɑː/" — worship — the image is bathed… dressed… fed… sung to… and put to bed at night — exactly the etiquette you would offer an honoured guest in your home.\n\n[warmly] So the question was never "is the statue God?" The real question is warmer, and simpler: has the guest been welcomed, properly?`,
  'f-living-darshan':
    `You go to the temple to see the god — and to be seen by them. That is "/ˈdɑːrʃən/". [short pause]\n\nSo why go to a temple at all? Not, mainly, to ask for things. You go for "/ˈdɑːrʃən/".\n\n"/ˈdɑːrʃən/" means "seeing." You go to look at the deity — and, just as much, to be looked at, in return. The meeting runs both ways.\n\n[warmly] You come home carrying "/prəˈsɑːd/": food that has first been offered to the god, and tasted by them, then handed back to you. Worship here is exchange and hospitality — not petition. Nobody is filing a request.`,
  'f-living-year':
    `Scale that hospitality from one room to a whole year — and the calendar becomes a story you can read. [short pause]\n\nNow scale that welcome up, from a single room… to a whole year. The Hindu calendar is packed with festivals — and because you now know the characters, each one has turned into a sentence you can read.\n\n"/dɪˈvɑːli/" — lamps light the road home, because "/ˈrɑːmə/" is returning from exile… "/ˈhoʊli/" — spring, colour thrown in the streets, and old grudges forgiven… "/ˌnʌvəˈrɑːtri/" — nine nights for the Goddess, in all her forms… "/dʒənˈmɑːʃtəmi/" — "/ˈkrɪʃnə/", born at midnight, in a prison cell.`,
  'f-living-hard':
    `[thoughtful] Two questions have no tidy answer. Saying so, honestly, is the right move. [short pause]\n\nOne honest warning before you go. Within about ninety seconds of telling someone you're learning about Hinduism… one of two hard questions tends to arrive. Neither has a tidy answer — and pretending otherwise helps no one.\n\n[cautiously] Caste. The old texts describe a fourfold ordering of society. What it hardened into — fixed at birth, brutally hierarchical, defended with scripture — is a real, and unfinished, injustice… one that many Hindus have fought, from the inside, for centuries. Don't defend it. Explain it.\n\nBeef. The cow is honoured as the animal that gives — in milk — without ever taking. Plenty of Hindus eat meat; most will not eat beef.\n\n[reassuring] Here is what to actually say. "It's complicated, and here's how" is the honest answer — and a far better one than any slogan. A tradition confident enough to argue with itself for three thousand years… does not need you to defend its worst chapters.`,

  // Part 8 — the capstone recap (replays the 32 takeaways).
  'f-capstone-recap':
    `[warmly] You can say all of this now. Thirty-two sentences… and you arrived with none of them. [short pause]\n\nHinduism has no founder, no single book, and no one in charge. Even the name isn't its own — it's a river, mispronounced. The name it gives itself is suh-NAA-tuh-nuh DHUR-muh — the eternal way. An eternal way still has to be carried — so Sanskrit was built to be remembered, not read.\n\nWhat makes someone Hindu isn't a belief — it's what they practise. Judaism, Christianity, and Islam ask what you believe; Hinduism asks what you do. Because practice holds it together, Hinduism could branch into four streams without ever splitting. Nobody assigns you a god — you choose the one you love.\n\n[thoughtful] Behind every god and every form is a single reality: "/ˈbrɑːmən/". The same one reality is also what looks out from inside you — "/ˈɑːtmən/". "/ˈbrɑːmən/" and "/ˈɑːtmən/" are not two things; they are one. The world only seems separate because it is misread, not unreal — that misreading is "/ˈmɑːjɑː/". One living current runs through all of it: "/ˈprɑːnə/". And everything nature makes is woven from three strands — the "/ˈɡuːnɑːs/".\n\nIf the witness is what you truly are, death changes the clothes, not the wearer. What steers the wheel is what you do: "/ˈkɑːrmə/" means action, not fate. The real question isn't what is the rule, but what is mine to do — that is "/ˈdɑːrmə/". One duty comes close to universal: cause no harm you don't have to — "/əˈhɪmsɑː/". The goal is not heaven; it is getting off the wheel altogether — "/ˈmoʊkʃə/". You are not required to sprint for the exit — pleasure and prosperity are proper goals too. And there are four roads to that exit, matched to the kind of person you already are.\n\nNobody falls in love with a philosophy — so it grew faces. Start with the great three. When the world goes badly wrong, "/ˈvɪʃnuː/" comes down into it as an "/ˈɑːvətɑːr/". Not one of the gods can act without her — the Goddess is power itself, "/ˈʃʌkti/". Learn six names and how they connect, and almost any Hindu story becomes readable.\n\nThere is no one holy book — there is a library, and it has just two shelves. Two great epics sit on the second shelf: one man does right at any cost; one family destroys itself. And inside that messy epic, a soldier lays down his bow and gets a seven-hundred-verse answer.\n\n[warmly] None of this is a religion you read — it is one you do, starting by welcoming a guest. You go to the temple to see the god, and to be seen by them — "/ˈdɑːrʃən/". Scale that hospitality across a year, and the whole calendar becomes a story you can read. And two questions have no tidy answer — saying so, honestly, is the right move.`,
};

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('Missing ELEVENLABS_API_KEY. Run:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-foundations-audio.mjs');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

// Optional CLI arg filters to sections whose id contains it, e.g.
//   node scripts/generate-foundations-audio.mjs f-thread   → just Part 2.
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

console.log(`\nDone. ${entries.length} clips in assets/audio/foundations/.`);
