// Krishna's end-of-chapter dialogues: a guided, Socratic conversation that closes
// a concept. Krishna asks, the reader taps a stance, Krishna responds — every path
// is valid (no "wrong" answers), all authored (no AI calls, works offline).
//
// A dialogue is a GRAPH of nodes. A choice carries its own reply and points to the
// next node (branching); a node-level `reply` is used when every choice converges
// on the same answer. A node may instead be a free-text `input` (the reader names
// their own murti), and a terminal node may carry a `practice` — one concrete
// "try this week" beat.
//
// Pure data + types: no imports (same rule as checkTypes.ts). Text uses the app's
// inline markup — `**term**` renders bold (see RichText); the dialogue component
// renders Krishna's lines through RichText so key words stand out.

export interface DialogueChoice {
  text: string; // what the reader taps (their stance)
  // Krishna's reply to THIS choice. Omit to fall back to the node's shared `reply`
  // (the any-answer-converges case).
  reply?: string;
  next: string | null; // id of the next node; null ends the dialogue
}

// A free-text node: the reader types (e.g. names their ishta-devata) and Krishna
// answers with `template`, `{answer}` replaced by what they wrote.
export interface DialogueInput {
  placeholder: string;
  template: string;
  next: string | null;
  // Persist the typed answer to the profile. 'familyStream' feeds
  // krishnaContextService so Krishna remembers their murti in later chats.
  saveTo?: 'familyStream';
}

export interface DialogueNode {
  id: string;
  krishna: string[]; // one or more bubbles opening the node (may carry **bold**)
  // A footnote shown AFTER the reply — a self-explanatory gloss, never a bare
  // "(2.22)" inside Krishna's speech.
  citation?: string;
  choices?: DialogueChoice[]; // a multiple-choice branch
  reply?: string; // shared reply when every choice converges
  input?: DialogueInput; // OR a free-text node
  // Terminal only: a "Try this week" beat. Optional — omitted where it would feel
  // forced. (A future version may let a tap SET it as an intention/reminder.)
  practice?: string;
  end?: boolean; // terminal node (closing line, no choices)
}

export interface KrishnaDialogue {
  id: string; // PERMANENT — telemetry key
  start: string; // id of the first node
  nodes: Record<string, DialogueNode>;
}

// Keyed by content ref (`${contentType}:${contentId}`), data-presence-driven —
// mirrors how learnItems / handoff light up in readerContent.ts. Note the Brahman
// concept's id is `brahman-atman` (STAGE_1_CONCEPTS), not `brahman`.
export const KRISHNA_DIALOGUES: Record<string, KrishnaDialogue> = {
  'concept:samsara': {
    id: 'dlg:samsara',
    start: 'lived',
    nodes: {
      lived: {
        id: 'lived',
        krishna: ['Before you close this out, let me ask you something honest. Does it feel like this life is the only one you’ve ever had?'],
        choices: [
          { text: 'Yeah, just this one', next: 'clothes' },
          { text: 'Maybe not', next: 'clothes' },
          { text: 'I’ve honestly never thought about it', next: 'clothes' },
        ],
        reply: 'Most people never stop to ask. There’s an image I once gave Arjuna, back when he was afraid of dying. Let me show you.',
      },
      clothes: {
        id: 'clothes',
        krishna: ['I told him the body is like clothing. When a shirt is worn out, what do you do with it?'],
        citation: 'Bhagavad Gita 2.22 — the self changes bodies the way we change worn-out clothes.',
        choices: [
          { text: 'Throw it out, get a new one', reply: 'Right. And that’s what the self does too. It sets down a worn-out body and picks up a fresh one. The one wearing the clothes doesn’t go anywhere.', next: 'wheel' },
          { text: 'Try to keep wearing it', reply: 'You could, but not for long once it’s falling apart. Eventually you get a new one. The self is the same way: it sets down a worn body and picks up a fresh one. The one wearing the clothes doesn’t go anywhere.', next: 'wheel' },
        ],
      },
      wheel: {
        id: 'wheel',
        krishna: ['So life after life, the self keeps changing clothes. That turning has a name: **samsara**. When you hear it put that way, how does it land for you?'],
        choices: [
          { text: 'Honestly, kind of exhausting', reply: 'I get that. Round and round can sound tiring. But nobody’s spinning the wheel to punish you. It just turns, the way the seasons do: you’re born, you grow, things end, and it comes around again.', next: 'selfcheck' },
          { text: 'Kind of comforting, actually', reply: 'That’s a rare and honest read. It isn’t a punishment. It’s just the natural turning: you’re born, you grow, things end, and it comes around again, like the seasons.', next: 'selfcheck' },
          { text: 'I’m not sure how it lands', reply: 'That’s fair. Here’s the short version: it isn’t a sentence you’re serving. It’s just the turning, like the seasons: you’re born, you grow, things end, and it comes around again.', next: 'selfcheck' },
        ],
      },
      selfcheck: {
        id: 'selfcheck',
        krishna: ['Here’s what I actually want you to sit with. Think back to when you were five years old. Your body’s different now, your ideas, nearly everything. But does it still feel like the same ‘you’ looking out from behind your eyes?'],
        choices: [
          { text: 'Yeah, still me', reply: 'That ‘you’ is the thread. Bodies change, lives change, even worlds change, but the one looking out doesn’t. That’s the part of you that rides the wheel without being spun by it.', next: 'close' },
          { text: 'Huh. I never noticed that', reply: 'Most people don’t, until they stop and look. Everything about you has changed since you were five, and yet something has quietly stayed ‘you’ the whole way. That’s the part that rides the wheel without being spun by it.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['That steady ‘you’ is what the next few chapters are really about. You’re not the wheel. You’re the one it turns around.'],
        practice: 'When something changes on you this week, a plan falls apart, a mood turns, see if you can catch the ‘you’ that’s just watching it happen, the same one who’s been there since you were five. You don’t have to do anything about it. Just notice it’s there.',
        end: true,
      },
    },
  },

  'concept:karma': {
    id: 'dlg:karma',
    start: 'word',
    nodes: {
      word: {
        id: 'word',
        krishna: ['People throw the word **karma** around all the time. When something bad happens to someone, and a friend goes ‘well, that’s karma’ — what do they usually mean by it?'],
        choices: [
          { text: 'That they had it coming', reply: 'Right, that’s the everyday version: payback. It’s not entirely wrong, but it misses the heart of it. The word itself means something much simpler.', next: 'meaning' },
          { text: 'That it was meant to be', reply: 'That’s the common read too, karma as destiny. But that’s almost the opposite of what it means. At its root the word is simpler than either.', next: 'meaning' },
          { text: 'Something about cause and effect', reply: 'You’re close. Cause and effect is in there. But the word itself starts somewhere even plainer.', next: 'meaning' },
        ],
      },
      meaning: {
        id: 'meaning',
        krishna: [
          'Here’s the root of it: **karma** just means action. What you do. And every action plants something, the way a seed does. Put a mango pit in the ground and you get a mango tree, never a lemon.',
          'So let me ask you a real one. If everything you do already carries its result inside it like that, is it worth pouring your energy into worrying about the results?',
        ],
        citation: 'Bhagavad Gita 2.47 — “a right to your actions, never to their fruits.”',
        choices: [
          { text: 'Yeah, isn’t that the point?', reply: 'That’s the trap, though. I told Arjuna once: you have a right to your actions, but never to their results. Do the thing well, then let go of how it turns out. Clutching at the outcome is what steals your peace.', next: 'now' },
          { text: 'No, just do it well and let go', reply: 'That’s exactly what I told Arjuna: you have a right to your actions, but never to their results. Put your care into the doing, then loosen your grip on how it lands.', next: 'now' },
        ],
      },
      now: {
        id: 'now',
        krishna: ['One more. If karma isn’t some punishment waiting for you down the road, where does it actually live? When do you get to shape it?'],
        choices: [
          { text: 'In the past, from what I’ve done', reply: 'The past planted what you’re standing in, sure. But you can’t go back and replant it. The only place you ever get to act is right now, and the next seed is always in your hand.', next: 'realistic' },
          { text: 'Right now', reply: 'Exactly. Not the past, not fate, right now. Whatever’s already been planted, the next seed is always in your hands. You’re never stuck at the end of the story.', next: 'realistic' },
        ],
      },
      realistic: {
        id: 'realistic',
        krishna: ['Before you go, one honest question tends to come up here. In real life, results do matter. Bills, a job, people counting on you. So does ‘act without clinging to the outcome’ actually hold up out there?'],
        choices: [
          { text: 'Honestly, I’m not sure it does', reply: 'Fair. So here’s the honest version. I wasn’t preaching to a monk on a mountain. I was talking to Arjuna, a soldier who had to fight a war he didn’t even want. I never told him to drop his sword or stop caring. I told him to do his work fully and stop being wrecked by the part he couldn’t control. Same for you: plan, work hard, care about it. Just don’t hand the result the power to ruin you.', next: 'close' },
          { text: 'Yeah, that actually makes sense', reply: 'Good, you’ve really got it then. And notice it never asks you to care less. Arjuna still had to fight, and fight well. You still plan, still work hard. You just stop letting an outcome you can’t fully control decide whether you’re okay.', next: 'close' },
          { text: 'So I should still try hard?', reply: 'As hard as you can. Not caring was never the goal. Arjuna still had to fight well. The shift is small but it changes everything: pour yourself into the doing, then loosen your grip on an outcome you were never fully in charge of anyway.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So that’s **karma**. It isn’t a scoreboard keeping count of you, and it isn’t a punishment. It’s just the seeds you keep planting, today and tomorrow. So plant them with a little care.'],
        practice: 'Pick one thing you normally do for the payoff, the thanks, the credit, the result, and this week do it once purely for the doing. Then let the outcome be whatever it turns out to be. Notice how that feels.',
        end: true,
      },
    },
  },

  'concept:dharma': {
    id: 'dlg:dharma',
    start: 'word',
    nodes: {
      word: {
        id: 'word',
        krishna: ['People translate **dharma** as “duty,” and it starts to sound like a rulebook someone hands you. When you hear “do your dharma,” what does it land as for you?'],
        choices: [
          { text: 'Follow the rules, do what’s expected', reply: 'That’s the usual read, and it’s exactly where dharma turns into a weight. But it was never one rulebook handed to everyone the same. Look at what the word actually points at.', next: 'yours' },
          { text: 'Be a good person, basically', reply: 'Warmer than the rulebook version, and closer. But dharma is more specific than “be good.” It’s about what’s yours to do in particular, that nobody else can do quite the same way.', next: 'yours' },
          { text: 'Honestly, I’m not sure', reply: 'That’s a fair place to start. Most people carry the word around for years without anyone telling them what it means. Let me.', next: 'yours' },
        ],
      },
      yours: {
        id: 'yours',
        krishna: [
          'The root of **dharma** means to hold up, to support. So your dharma is just the piece of the world that’s yours to hold up. A parent holds up a child. A doctor holds up the sick. A friend holds up you.',
          'And here’s the part that trips everyone: it’s different for different people. A soldier’s dharma and a mother’s dharma pull in different directions, and both are right. So the real question is always the same one: what’s mine to do here, as who I am?',
          'Most of the time that’s quiet and obvious. The trouble starts when two of them pull against each other. Have you ever been stuck between two right things?',
        ],
        choices: [
          { text: 'Yeah, more than once', reply: 'Then you already know the hard part. Nobody agonizes over whether to rob a bank. We agonize when two right things pull opposite ways and we can only honor one.', next: 'arjuna' },
          { text: 'Not that I can think of', reply: 'You will, everyone hits it eventually. It’s the knot at the center of dharma: two right things, wanting opposite moves from you, and only room for one.', next: 'arjuna' },
        ],
      },
      arjuna: {
        id: 'arjuna',
        krishna: [
          'Let me tell you where I first heard this question, really heard it. A soldier named **Arjuna** stood on a battlefield, bow in hand, and looked across at the other army. There they were: his cousins, his teachers, the grandfather who raised him.',
          'His duty as a warrior said fight, this is a just war. His love said these are my people, I can’t. Two dharmas, tearing him in half. He sat down in the chariot and said he’d rather do nothing at all.',
          'So when two duties collide like that, what do you think actually settles it?',
        ],
        citation: 'Bhagavad Gita 1–2 — Arjuna’s collapse between his duty and his love.',
        choices: [
          { text: 'Pick the one that hurts fewer people', reply: 'That’s a real instinct, and it often points the right way. Dharma does lean toward whatever holds up the most life. But it isn’t only arithmetic, or you could talk yourself into almost anything.', next: 'svadharma' },
          { text: 'Do the harder, less selfish one', reply: 'There’s something to that, self-interest is usually the thumb on the scale. Though be careful, the harder road isn’t automatically the right one. Sometimes the kind thing and the easy thing are the same thing, and choosing it is allowed.', next: 'svadharma' },
          { text: 'Honestly, I wouldn’t know', reply: 'Good, because there’s no formula, and anyone who sells you one is lying. So I didn’t hand Arjuna a rule. I gave him a question steady enough to stand on.', next: 'svadharma' },
        ],
      },
      svadharma: {
        id: 'svadharma',
        krishna: [
          'Here’s what I told him. Don’t grab someone else’s dharma to escape your own. A warrior who runs from a just fight to go play the monk hasn’t become holy. He’s just dropped the thing that was his to carry.',
          'Better to do your own part imperfectly than to perform someone else’s perfectly. Your life, your roles, the people actually leaning on you, that’s your ground. Stand there.',
          'So does any of this touch a regular Tuesday? Or does it only matter on battlefields?',
        ],
        citation: 'Bhagavad Gita 3.35 — better your own dharma, imperfectly done, than another’s done well.',
        choices: [
          { text: 'Feels a bit epic for my life', reply: 'I get that. But swap the battlefield for a group chat, a hospital waiting room, a decision about an aging parent. Same knot, smaller stage. You face little versions of that battlefield all the time.', next: 'close' },
          { text: 'No, I feel this all the time', reply: 'You do. Job against family. Honesty against keeping the peace. What you owe your parents against what you owe your kids. Every one of those is Arjuna’s chariot, just quieter.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So that’s **dharma**. Underneath every hard choice, it comes down to one honest question: what’s actually mine to hold up here? Ask it plainly, and most of the time you already know the answer.'],
        practice: 'Catch yourself in one real tug-of-war this week, two people or duties pulling opposite ways. Don’t ask “what’s the rule?” Ask “which choice actually holds up the people depending on me?” Do that one, and let the guilt about the other go.',
        end: true,
      },
    },
  },

  'concept:maya': {
    id: 'dlg:maya',
    start: 'mirage',
    nodes: {
      mirage: {
        id: 'mirage',
        krishna: ['You’re driving on a hot day, and up ahead the road looks wet, like there’s a puddle shimmering across it. You get closer and it’s bone dry. There was never any water. But you did see something: the road really was shimmering. So what actually fooled you there?'],
        choices: [
          { text: 'There was nothing there at all', reply: 'Not quite, and this is the whole point. Something real was there: the road, the heat, the shimmer where hot air bends the light. You didn’t see nothing. You read something real as water. That gap is the heart of **maya**.', next: 'claim' },
          { text: 'I read the shimmer as water', reply: 'Exactly. Something real was there, the road shimmering in the heat, and your eyes slapped the label ‘water’ on it. A real thing read wrong. That’s the heart of **maya**.', next: 'claim' },
        ],
      },
      claim: {
        id: 'claim',
        krishna: ['So people say ‘the world is **maya**, it’s all an illusion.’ Thinking about that mirage, what do you figure that’s actually claiming?'],
        choices: [
          { text: 'That the world isn’t real', reply: 'That’s the misread I want to save you from. The road was real, the heat was real, the world is real. Maya isn’t saying nothing’s there. It’s saying we read what’s there wrong, the way you read shimmer as water.', next: 'self' },
          { text: 'That we misread what’s really there', reply: 'Yeah, that’s it. The road was real; ‘water’ was just the wrong label your eyes reached for. Maya isn’t ‘the world is fake.’ It’s the wrong story we lay over something that’s genuinely there.', next: 'self' },
          { text: 'Not sure', reply: 'Let the mirage answer it. The road was really there and really shimmering, so the world isn’t fake. What fooled you was calling that shimmer ‘water.’ That’s maya: the misreading, not nothingness.', next: 'self' },
        ],
      },
      self: {
        id: 'self',
        krishna: ['Now here’s the mirage that actually matters, and it isn’t out on the road. It’s the one you look at every day: you. When you say ‘me,’ what do you usually point to?'],
        choices: [
          { text: 'My body, my face', reply: 'That’s a wave, not the sea. Your body is real, but it’s completely different from when you were a child, and it’ll keep changing. If that were all of ‘you,’ there’d be nothing steady to even call yourself. So that’s the shimmer, not the ground under it.', next: 'ocean' },
          { text: 'My thoughts and moods', reply: 'Those are real too, but watch how they come and go: happy by noon, low by evening. If you were only your moods, you’d be a different person every hour. That’s the shimmer, not the ground under it.', next: 'ocean' },
          { text: 'Honestly, what else is there?', reply: 'Fair question, and it’s the whole point. You’ve been shown the body and the moods your entire life and told ‘that’s you.’ But those are the shimmer. There’s something steadier underneath them.', next: 'ocean' },
        ],
      },
      ocean: {
        id: 'ocean',
        krishna: ['Picture the sea. The waves rise and fall, each one different, but they’re all just the one ocean moving. Your body and your moods are waves. The real you is the ocean under them, what the sages call the Self, or **Brahman**. So what do you think the deepest **maya** of all is?'],
        choices: [
          { text: 'Mistaking a wave for the whole sea', reply: 'That’s it exactly. The deepest illusion isn’t about roads and water. It’s taking the little wave, this body, this mood, this passing self, to be all you are, and forgetting you were the whole ocean the entire time.', next: 'veil' },
          { text: 'Thinking the ocean isn’t there', reply: 'Close. It’s subtler than that: the ocean is right there, it’s just hidden under the waves you keep staring at. You take one wave, this body, this mood, to be the whole of you, and forget you’re the sea it’s rising from.', next: 'veil' },
        ],
      },
      veil: {
        id: 'veil',
        krishna: ['I once called this whole thing my own veil, hard to see past because it’s woven out of the world’s own dazzle. Now that you know what’s hiding behind it, why would it be worth crossing?'],
        citation: 'Bhagavad Gita 7.14 — the veil of maya is hard to cross, but not for those who hold to me.',
        choices: [
          { text: 'To see who I really am', reply: 'That’s it. I told Arjuna this veil of mine is hard to cross, but the ones who hold on to me make it through. See past the shimmer of body and mood, and the ocean was there the whole time. That ocean is you.', next: 'close' },
          { text: 'So I stop shrinking myself', reply: 'Exactly. I told Arjuna the veil is hard to cross, but the ones who hold on to me get through it. Let go of the small wave you took yourself to be, and the whole sea is still there. That sea is you.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So don’t call the world a lie, and don’t call yourself a small thing. Both are truer and vaster than they look. Just keep looking past the shimmer.'],
        practice: 'Next time a strong mood grabs you, anger, worry, whatever it is, pause for one breath and tell yourself: ‘this is a wave, not the sea.’ You don’t have to fix the mood. Just remember you’re the ocean watching it pass through.',
        end: true,
      },
    },
  },

  'concept:brahman-atman': {
    id: 'dlg:brahman',
    start: 'feel',
    nodes: {
      feel: {
        id: 'feel',
        krishna: ['So. You’ve heard my secret now — that deep down, you and I are made of the same thing. Tell me honestly: do you feel like that’s true?'],
        choices: [
          { text: 'Not really', next: 'saltWhere' },
          { text: 'Sometimes, a little', next: 'saltWhere' },
          { text: 'I don’t know', next: 'saltWhere' },
        ],
        reply: 'Good — that’s honest. Even great sages felt that way. Knowing a secret and feeling it are different things, remember?',
      },
      saltWhere: {
        id: 'saltWhere',
        krishna: ['Let me check something. In the story, the father stirred salt into water — and it vanished. Where did it go?'],
        choices: [
          { text: 'It disappeared forever', reply: 'Ah — that’s what the boy thought too. But his father said: sip it. This side, salty. That side, salty. The middle, salty. You can’t always see what’s really there.', next: 'saltHow' },
          { text: 'It was still in the water', reply: 'Yes — invisible, but everywhere. That’s the thing about what’s real: you can’t always see it, and it’s there all the same.', next: 'saltHow' },
          { text: 'Remind me?', reply: 'Ah — the father stirred it in and it seemed to vanish. But then he said: sip it. This side, salty. That side, salty. The middle, salty. You can’t always see what’s really there.', next: 'saltHow' },
        ],
      },
      saltHow: {
        id: 'saltHow',
        krishna: ['So how did the boy know it was really there?'],
        choices: [
          { text: 'His father told him', next: 'prayer' },
          { text: 'He tasted it', next: 'prayer' },
        ],
        reply: 'He tasted it. His father’s words weren’t enough — words never are.',
      },
      prayer: {
        id: 'prayer',
        krishna: ['Now — the real question. When you fold your hands and pray to me, or to Ganesha, or to the goddess your grandmother loves… what do you think you’re doing?'],
        choices: [
          { text: 'Asking for help', reply: 'You can ask me for help — I like when you do. But here’s the secret of every prayer: you’re taking a sip. I’m not far away at all. I’m the salt in the water. The gods are the spoons; prayer is how you taste.', next: 'tricky' },
          { text: 'Talking to someone far away', reply: 'You can talk to me all you like. But I’m not far away at all — I’m the salt in the water. Every prayer is a sip. The gods are the spoons; that is how you taste the one ocean.', next: 'tricky' },
          { text: 'Taking a sip', reply: 'You’ve got it. Ganesha, Kali, me — not a crowd of rival gods hiding the truth. We’re the spoons. Every prayer is a taste of the same ocean.', next: 'tricky' },
        ],
      },
      tricky: {
        id: 'tricky',
        krishna: ['Last question — the tricky one. If you and I were already one… do you pray because the secret is false? Or to find out it’s true?'],
        choices: [
          { text: 'To find out it’s true', reply: 'That’s exactly it.', next: 'ishta' },
          { text: 'Wait — say that again?', reply: 'Think of the boy. Was the salt a lie before he sipped? No — it was there all along. The sip didn’t make it true. The sip is how he found out.', next: 'ishta' },
        ],
      },
      ishta: {
        id: 'ishta',
        krishna: ['That’s the whole secret of the many gods. One ocean, many spoons.', 'Which spoon is yours? Whose picture or murti does your family keep at home?'],
        citation: 'Chandogya Upanishad 6.13 — tat tvam asi, “you are That.”',
        input: {
          placeholder: 'Type a name — Krishna, Ganesha, Durga…',
          template: 'Then {answer} is your river to the ocean — and every time you bow, know what you’re really doing. You’re taking a sip. **Tat tvam asi** — you are That. Now go take one.',
          next: null,
          saveTo: 'familyStream',
        },
      },
    },
  },

  'concept:moksha': {
    id: 'dlg:moksha',
    start: 'escape',
    nodes: {
      escape: {
        id: 'escape',
        krishna: ['One word left before you go: **moksha**. Freedom, liberation. When you hear it, where do you picture it happening?'],
        choices: [
          { text: 'Somewhere else, after you die', reply: 'That’s the usual picture, some place you reach once this is all over. Let me offer you a different one. Moksha might be less about going somewhere and more about waking up.', next: 'river' },
          { text: 'Like an escape from all this', reply: 'Escape from the wheel, yeah, that’s the hope. But maybe not escape to somewhere else. Maybe just waking up, right where you’re standing. Here’s the old image for it.', next: 'river' },
        ],
      },
      river: {
        id: 'river',
        krishna: ['The old sages pictured a river flowing down toward the sea. When it finally reaches the ocean, what happens to the river?'],
        citation: 'Mundaka Upanishad 3.2.8 — rivers reaching the sea lose their name and become it.',
        choices: [
          { text: 'It disappears', reply: 'Looks that way. But it didn’t end, it became the ocean. The old text puts it just like that: the one who knows, freed of name and shape, meets the divine the way rivers meet the sea. Not erased. Made bigger.', next: 'already' },
          { text: 'It becomes the ocean', reply: 'Right. It gives up its name and its banks and becomes the whole sea. The old text says the freed one meets the divine in exactly that way. Not erased. Made bigger.', next: 'already' },
        ],
      },
      already: {
        id: 'already',
        krishna: ['Now here’s the part that catches people off guard. If you’re already a drop of that ocean, the way you learned with the salt, then does becoming free turn you into something new? Or does it just show you something that was already true?'],
        choices: [
          { text: 'Turns me into something new', reply: 'Not quite. The river didn’t turn into water when it hit the sea. It was water the whole way down. Freedom doesn’t add anything to you. It wakes you up to what you already are.', next: 'who' },
          { text: 'Shows me something already true', reply: 'Yes. The river was always water; the sea just let it stop pretending to be small. Freedom doesn’t add a thing. It wakes you up to what you’ve always been.', next: 'who' },
          { text: 'Wait, can you say that again?', reply: 'Sure. Think about the river. It didn’t become water when it reached the sea, it was water the entire time. **Moksha** isn’t turning into something new. It’s finally seeing what you already are.', next: 'who' },
        ],
      },
      who: {
        id: 'who',
        krishna: ['I can feel the next thought coming. Okay, but who actually pulls this off? Has anyone really, and if almost no one does, what’s the point for someone like me?'],
        citation: 'Bhagavad Gita 3.20 — “It was through action alone that Janaka and others reached perfection.”',
        choices: [
          { text: 'Yeah — has anyone really?', reply: 'They have. There’s even a word for it: jivanmukti, free while you’re still alive and walking around. And it’s not just forest hermits. King Janaka ran a whole kingdom, raised a family, made hard calls, and was free the entire time. I pointed Arjuna to him by name. As for the point: it isn’t all-or-nothing at some finish line. Every time you catch yourself as the ocean instead of the wave, that’s a real taste of it, and it’s available right now.', next: 'close' },
          { text: 'It feels impossible for someone like me', reply: 'That fear is fair, so hear this: the very first person I taught this to was Arjuna, in armor, on a battlefield he dreaded. Not a monk. King Janaka reached it running a kingdom. This was never reserved for people who leave the world behind. And you don’t have to touch the far shore to gain anything: every glimpse of yourself as the ocean is already freedom, today.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So freedom isn’t some far-off shore. It’s the ocean remembering it was never only a drop. You’ve walked the whole wheel now, so take it easy. **Tat tvam asi** — that’s you.'],
        practice: 'You don’t have to wait for some far shore. Once today, just for a moment, notice that you’re already part of something huge, the way the drop is already the ocean. That noticing, small as it feels, is a real taste of freedom.',
        end: true,
      },
    },
  },

  'concept:ahimsa': {
    id: 'dlg:ahimsa',
    start: 'word',
    nodes: {
      word: {
        id: 'word',
        krishna: ['**Ahimsa** gets translated as “non-violence,” and right away people picture something soft. A pushover, someone who lets the world walk over them. When you hear it, does it sound a little like weakness to you?'],
        choices: [
          { text: 'Yeah, kind of passive', reply: 'That’s the usual picture, and it’s almost backwards. Ahimsa takes more strength than throwing a punch, not less. Let me show you why.', next: 'gates' },
          { text: 'No, I think it’s strength', reply: 'You’re ahead of most people. It is strength, the hardest kind. But there’s a twist in it that even fans of the idea usually miss.', next: 'gates' },
          { text: 'Not sure what it really means', reply: 'Fair. Most people only know the Gandhi-postcard version. The word itself is sharper than that.', next: 'gates' },
        ],
      },
      gates: {
        id: 'gates',
        krishna: [
          'Break the word open. **Himsa** means harm. The “a” in front flips it: **ahimsa**, no harm. But here’s the part that stings. Harm doesn’t only come out of your fists. It comes through three gates: the hand, the word, and even the thought.',
          'Most of us never raise a hand to anyone, so we call ourselves gentle. Then we cut someone down with a single sentence. So, honestly, which gate does your harm usually sneak out of?',
        ],
        citation: 'Bhagavad Gita 16.2 & 17.14 — harmlessness counted across body, speech, and mind.',
        choices: [
          { text: 'The word, definitely', reply: 'You’re in good company. For most of us it’s the tongue. A punch heals in a week. The right cruel sentence can sit in someone for years.', next: 'strength' },
          { text: 'Honestly, the thought', reply: 'An honest one, and a real gate. The contempt you rehearse in private leaks out in a hundred small ways, even when you never say it out loud.', next: 'strength' },
          { text: 'I try not to harm at all', reply: 'Good aim. And notice how often it slips through anyway, a sharp reply, a quiet judgment. Ahimsa is less a finish line than something you keep practicing.', next: 'strength' },
        ],
      },
      strength: {
        id: 'strength',
        krishna: [
          'Now the part most people miss. A rabbit isn’t gentle, it just has no claws. Real ahimsa is a person who could wound and chooses not to.',
          'The old texts even say that around someone truly settled in it, the hostility in others starts to drain away, and not because they’re soft. There’s just nothing left in them to push against.',
          'So does that mean you should never cause any harm at all? Even to protect someone?',
        ],
        citation: 'Yoga Sutras of Patanjali 2.35 — near one established in ahimsa, hostility falls away.',
        choices: [
          { text: 'That can’t be right', reply: 'It isn’t. Ahimsa asks for something narrower than “never cause pain.” It asks you to cause no harm you don’t have to. A surgeon cuts, and that’s still ahimsa, because it heals and there was no gentler way. The only test is whether the harm was truly necessary.', next: 'inward' },
          { text: 'I guess sometimes harm is needed', reply: 'Right. Same rule as before: cause no harm you don’t have to. Protect the child, of course, but use the least force the moment truly needs, and not a bit more. That “not a bit more” is the whole discipline.', next: 'inward' },
        ],
      },
      inward: {
        id: 'inward',
        krishna: [
          'One last gate, and it’s the one people forget completely. Yourself. The cruelest voice most people meet all day is the one inside their own head.',
          'Ahimsa points inward too. The same gentleness you’d give a friend who messed up, you’re allowed to give yourself. Talk to your own mind the way you’d talk to someone you’re trying to help back onto their feet.',
        ],
        citation: 'Bhagavad Gita 6.5 — lift yourself by yourself; be your own friend, not your own enemy.',
        choices: [
          { text: 'That’s the one I need', reply: 'A lot of people do. You can be endlessly patient with everyone but you. Let some of that patience turn around.', next: 'close' },
          { text: 'I’m harder on myself than anyone', reply: 'Then that’s exactly where your ahimsa begins. Not with strangers, with the voice in your own head.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So that’s **ahimsa**. More than just keeping your fists down, it’s watching all three gates, hand, word, and thought, and causing no harm you don’t truly have to. Yourself included.'],
        practice: 'Catch one sharp thing before it leaves your mouth this week, a cutting reply you could land but don’t need to. Let it go unsaid. And once, when you catch yourself being cruel in your own head, answer back the way you would to a friend.',
        end: true,
      },
    },
  },

  'concept:three-gunas': {
    id: 'dlg:three-gunas',
    start: 'day',
    nodes: {
      day: {
        id: 'day',
        krishna: ['Ever notice the same day can feel like three different days? You wake up foggy and heavy. By noon you’re wired and restless. On an evening walk, everything’s suddenly calm and clear. Same you, same day. What do you figure actually changed?'],
        choices: [
          { text: 'Just my mood, I guess', reply: 'That’s what we usually call it. But the tradition names it more precisely, and once you can name it, you can start to work with it.', next: 'strands' },
          { text: 'Coffee and blood sugar, honestly', reply: 'Ha, partly, sure. But underneath the coffee there’s a pattern people mapped out a very long time ago. Three of them, actually.', next: 'strands' },
          { text: 'No idea, it just happens', reply: 'It does feel like weather that just rolls in. The tradition gave that weather three names.', next: 'strands' },
        ],
      },
      strands: {
        id: 'strands',
        krishna: [
          'The tradition says three strands run through everything, and every moment is some braid of them. They’re called the **gunas**. Think of them as three kinds of weather in your mind.',
          '**Tamas** is the heavy one, the 7am fog, the couch you can’t get off. **Rajas** is the fire, the restless noon drive. **Sattva** is the clear one, the calm evening where things just make sense. All three are in you right now. Only the mix changes.',
          'One thing people get wrong, though. Does this mean some people are simply sattvic, calm and wise, and others are stuck being tamasic, dull and lazy?',
        ],
        citation: 'Bhagavad Gita 14.5 — sattva, rajas, and tamas, the three strands born of nature.',
        choices: [
          { text: 'Yeah, isn’t that personality?', reply: 'That’s the common mistake. But nobody is one guna. All three run in everyone, all day. The wisest person has foggy mornings, and the laziest gets flashes of clarity. The mix keeps shifting, so no single label ever really sticks.', next: 'feed' },
          { text: 'No, it shifts around', reply: 'Exactly. Nobody’s just one. All three run in everyone, and the mix moves hour to hour. That’s the good news, really, because a mix can be changed.', next: 'feed' },
        ],
      },
      feed: {
        id: 'feed',
        krishna: [
          'Here’s the useful part. When you’re stuck in the fog, what most people do is fight it. Push, scold themselves, try to force clarity. It almost never works.',
          'You can’t punch fog. What you can do is light a small fire nearby. A short walk, a cold splash of water, one tiny finished task, a little sunlight, each one feeds a bit of sattva. Tend that fire, and the fog lifts on its own.',
        ],
        citation: 'Bhagavad Gita 17.8–10 — the foods and acts that grow each strand.',
        choices: [
          { text: 'So stop fighting the fog', reply: 'Right. Fighting it just stacks rajas on top, now you’re foggy AND frustrated. Feed one small bit of sattva instead, and let it spread on its own.', next: 'close' },
          { text: 'What actually feeds sattva?', reply: 'Simple, unglamorous stuff. Light, movement, real food, calm company, finishing one small thing. Nothing mystical. The mind clears the way a room brightens when you open one shade.', next: 'close' },
        ],
      },
      close: {
        id: 'close',
        krishna: ['So that’s the **gunas**: three kinds of weather moving through you all day, and you’re not stuck in any of them for long. Name the weather, and if you don’t like it, feed a little of the strand you’d rather be in.'],
        practice: 'Each morning this week, name your weather in one word, foggy, restless, or clear. Don’t judge it, just name it. Then on a heavy day, feed one small bit of sattva: step outside, finish one tiny thing, splash cold water. Watch the mix move.',
        end: true,
      },
    },
  },

  'concept:hinduism-overview': {
    id: 'dlg:hinduism-overview',
    start: 'many',
    nodes: {
      many: {
        id: 'many',
        krishna: ['You just met a lot of gods in there, Brahma, Vishnu, Shiva, Durga, and plenty more. If a friend leaned over and said “so you guys worship, what, a few hundred gods?”, what would you say back?'],
        choices: [
          { text: 'Honestly, I’d fumble it', reply: 'Most people do, and it’s not your fault. The overview just handed you the real answer, so let me pull it to the front.', next: 'one' },
          { text: 'Something about one God underneath', reply: 'That’s exactly the thread. You’ve got it. Let’s make it something you could actually say out loud.', next: 'one' },
          { text: 'I’d just say yeah, many gods', reply: 'You could, and on the surface you wouldn’t be wrong. But there’s a deeper answer that lands better, and it happens to be truer.', next: 'one' },
        ],
      },
      one: {
        id: 'one',
        krishna: [
          'Three thousand years ago the Rig Veda already said the quiet part out loud: what exists is one, and the wise simply call it by many names. So underneath Vishnu, Shiva, Durga, all of them, Hindus point to a single reality. They call it **Brahman**.',
          'Picture one white light behind a stained-glass window. A red pane, a blue pane, a gold pane. Different colors, one light. The gods are the panes. Brahman is the light.',
          'So when a Hindu grandmother bows before a small Krishna statue at home, what do you figure she believes she’s bowing to?',
        ],
        citation: 'Rig Veda 1.164.46 — “Truth is one; the wise call it by many names.”',
        choices: [
          { text: 'The statue itself, I assumed', reply: 'That’s the outsider’s read, and it misses her completely. To her, that statue is a doorway she walks through. She’s using a face she loves to reach the one reality behind it.', next: 'thread' },
          { text: 'The one reality, through that form', reply: 'Exactly. The form is just a doorway she walks through. She loves that particular face because a face is something you can actually love, where the formless is hard to hold onto.', next: 'thread' },
        ],
      },
      thread: {
        id: 'thread',
        krishna: [
          'So here’s the whole overview in one breath, for when someone asks. Hinduism is a huge family of traditions with no single founder, held together by a few old questions, that sees one reality wearing many faces, and lets you reach it through the face you love most.',
          'You don’t have to memorize the rest. Hold that one thread, and every god, festival, and story you meet later just hangs off it.',
        ],
        practice: 'Next time someone asks “why so many gods?”, try one sentence: “Most Hindus see one reality behind all of them, and each god is a different face of it.” Say it out loud once this week, even just to yourself, and notice how much less tangled the whole thing feels.',
        end: true,
      },
    },
  },

  'concept:branches-of-hinduism': {
    id: 'dlg:branches-of-hinduism',
    start: 'sects',
    nodes: {
      sects: {
        id: 'sects',
        krishna: ['You just met the four big streams, Vaishnava, Shaiva, Shakta, Smarta. If you grew up around churches, that might ring a bell, like Catholics and Protestants and Baptists. So are these Hindu streams basically rival denominations?'],
        choices: [
          { text: 'Yeah, sounds the same', reply: 'It’s the natural comparison, and it’s where most people land. But something here is different, and it changes the whole picture. Let me show you.', next: 'split' },
          { text: 'I figured they must disagree', reply: 'They do disagree, plenty. But watch what they never did, the thing Christian denominations famously did.', next: 'split' },
          { text: 'No idea how it works', reply: 'Fair, it’s genuinely strange from the outside. Here’s the piece that makes it click.', next: 'split' },
        ],
      },
      split: {
        id: 'split',
        krishna: [
          'Christianity split. Councils met, lines got drawn, and people who landed on the wrong side were called heretics and pushed out. That’s how you get separate churches.',
          'Hinduism never had that machinery. There was no council with the power to expel anyone, so nobody was ever expelled. It branched the way a tree grows new limbs, but it never split into rival institutions. Same tree, different branches.',
          'So picture a home where the grandmother keeps Shiva and her grandson keeps Krishna. In that house, who’s right?',
        ],
        citation: 'Sampradaya (“handing over”): authority passes through teacher-lineages, not one central church.',
        choices: [
          { text: 'They’d have to argue it out', reply: 'You’d think so, but they don’t. Both are right, and everyone in the house knows it. She reaches the one reality through Shiva, he reaches the same reality through Krishna. Different doors into the same house.', next: 'yours' },
          { text: 'Both, I’m guessing', reply: 'Exactly. Both, and nobody in the house finds it strange. She reaches the one reality through Shiva, he reaches the same one through Krishna. Different doors into the same house.', next: 'yours' },
        ],
      },
      yours: {
        id: 'yours',
        krishna: [
          'So the streams are really just the different wings of one big family, each with a favorite face of the divine. You can walk between the wings, and plenty of families keep more than one.',
          'You don’t have to pick a stream to belong. Most Hindus never announce one at all. The little shrine at home quietly shows which way they lean, and that’s plenty.',
        ],
        practice: 'If you meet a Hindu this week, try gently asking which deity their family keeps at home. It’s a warm question, really, which face of the one they love most. Most people light up at it.',
        end: true,
      },
    },
  },

  'festival:diwali-2025': {
    id: 'dlg:diwali',
    start: 'outside',
    nodes: {
      outside: {
        id: 'outside',
        krishna: ['Diwali, from the outside, can look like fireworks, shopping, and a mountain of sweets. If someone asked you what it’s actually about, what would you tell them?'],
        choices: [
          { text: 'Lights, and Rama coming home', reply: 'That’s the story on the surface, and a good start. But there’s a reason that particular story became a festival of lamps, and it’s about you as much as about Rama.', next: 'light' },
          { text: 'Honestly, not sure', reply: 'Most people aren’t, even people who celebrate it every year. Let me give you the one line that ties the whole thing together.', next: 'light' },
          { text: 'Something about good beating evil', reply: 'Right on the nose. Now let me show you where that battle actually happens, because it’s closer to home than a battlefield.', next: 'light' },
        ],
      },
      light: {
        id: 'light',
        krishna: [
          'Every lamp on Diwali is lit on **Amavasya**, the darkest night of the month, when there’s no moon at all. That’s the whole point. Nobody lights a lamp at noon. You light it exactly when the dark is deepest.',
          'The Upanishads gave the night its prayer three thousand years ago: “from darkness, lead me to light.” The Ramayana gave the darkness a face, fourteen years of exile, and Rama finally coming home to a city that lit every window to guide him back. But that lamp was always pointing at something inside you too.',
          'So when you light a diya this year, what do you figure it’s really meant to push back?',
        ],
        citation: 'Brihadaranyaka Upanishad 1.3.28 — “tamaso mā jyotir gamaya,” from darkness lead me to light.',
        choices: [
          { text: 'The literal dark outside', reply: 'That’s where it starts, a light in the window. But the tradition means the other darkness too, the fear and the fog you’ve been carrying. One lamp says: not in here, not tonight.', next: 'home' },
          { text: 'Something in me', reply: 'Yes. The fear, the grudge, the heaviness you’ve been carrying around. The lamp is small on purpose. One small flame is enough to say the dark doesn’t get the last word tonight.', next: 'home' },
        ],
      },
      home: {
        id: 'home',
        krishna: [
          'There’s a reason families scrub and light the whole house first. **Lakshmi**, abundance herself, is said to enter a home that’s clean and glowing, and walk right past one that’s shut and dark. Make a little room for the good, and it tends to show up.',
          'How your own family does all of this, the sweets, the rangoli, the prayers, is theirs to teach you. Ask them. That’s part of the festival too.',
        ],
        practice: 'This Diwali, before the noise starts, light one diya on your own. As you light it, name one bit of darkness you’re done carrying, a worry, a grudge, a fear. You don’t have to solve it. Just let the small flame stand for choosing light over it, once, on purpose.',
        end: true,
      },
    },
  },

  'festival:holi-2025': {
    id: 'dlg:holi',
    start: 'fight',
    nodes: {
      fight: {
        id: 'fight',
        krishna: ['Holi mostly shows up online as a giant, joyful color fight, strangers drenching each other in pink and green. Fun, sure. But is there anything underneath all that powder, you think?'],
        choices: [
          { text: 'Probably, I just don’t know it', reply: 'There is, and it’s two things really, hiding in plain sight. A fire the night before, and then the color. Let me take them in order.', next: 'fire' },
          { text: 'Feels like just a party', reply: 'It is a party, a glorious one. But it’s built on top of an old story and an older idea, and both are worth having.', next: 'fire' },
          { text: 'Isn’t it a Krishna thing?', reply: 'Krishna’s in there, he’s why there’s color at all. But the night before the color there’s a fire, and the fire comes first for a reason.', next: 'fire' },
        ],
      },
      fire: {
        id: 'fire',
        krishna: [
          'The night before, people light a big bonfire, **Holika Dahan**. It comes from the story of **Prahlada**, a boy who kept loving God even though his own father, a tyrant king, tried everything to stop him, including fire.',
          'His aunt **Holika**, who believed she couldn’t burn, carried the boy into the flames to kill him. She burned. He walked out untouched. So the bonfire every year carries one message: cruelty burns itself out, and what’s true in you survives the fire.',
          'So before the color comes the fire. What do you figure you’re meant to throw into it?',
        ],
        citation: 'Prahlada and Holika: Bhagavata Purana, Canto 7.',
        choices: [
          { text: 'No idea what I’d burn', reply: 'Fair, most people just enjoy the flames. But the tradition offers a use: the grudge you’ve been feeding, the version of yourself you’re tired of. The fire’s a place to set it down.', next: 'color' },
          { text: 'The stuff I’m carrying', reply: 'That’s it exactly. The grudge, the old anger, the version of yourself you’re done being. The fire’s an old, honest place to let it go.', next: 'color' },
        ],
      },
      color: {
        id: 'color',
        krishna: [
          'Then, in the morning, the color. And here’s the quiet genius of it: once everyone’s smeared head to toe in pink and green, you can’t tell the rich from the poor, the elder from the kid, your friend from the person you’ve been feuding with. For one day, the ranks just wash out.',
          'That’s why people settle old scores with a handful of color instead of a fight. You smear your rival, they smear you, and somewhere in the laughing it gets hard to stay angry. Holi is the year’s reset button.',
        ],
        practice: 'You don’t need the festival to use it. This week, pick one small grudge you’ve been quietly carrying, and let it go, the way you’d let it burn in the Holika fire. If you can, do one warm thing toward the person. That’s Holi, powder optional.',
        end: true,
      },
    },
  },

  'festival:navratri-2025': {
    id: 'dlg:navratri',
    start: 'dance',
    nodes: {
      dance: {
        id: 'dance',
        krishna: ['Navratri is nine nights of music and dancing in circles, and from the outside it can look like one long, colorful party. But nine nights is a lot to set aside. What do you think it’s actually marking?'],
        choices: [
          { text: 'A goddess, I think?', reply: 'Yes, the Goddess, and specifically a fight she won that nobody else could. Let me tell you who she beat, because it says something surprising about power.', next: 'durga' },
          { text: 'No clue, honestly', reply: 'Most people just dance and enjoy it. But underneath is one of the boldest ideas in the whole tradition. Here it is.', next: 'durga' },
          { text: 'Isn’t it just about dancing?', reply: 'The dancing is real and joyful. But it circles something, literally, and what it circles is worth knowing.', next: 'durga' },
        ],
      },
      durga: {
        id: 'durga',
        krishna: [
          'There was a demon, **Mahishasura**, that no god could defeat. One by one the great gods tried and lost. So they did something they had never done: they poured all their power into a single being, and out of that combined force rose **Durga**, the Goddess, riding a lion.',
          'She fought him for nine nights and won on the tenth. Sit with the claim buried in that: when the gods needed power itself, power turned out to be her. That’s why the dancers circle a single lamp, the light in the center is the Mother, and everyone turns around her.',
          'So the nine nights are really nine nights of facing something down. Is there a Mahishasura in your life right now, something you keep losing to?',
        ],
        citation: 'Durga and Mahishasura: Devi Mahatmya (Markandeya Purana), Chapters 2–3.',
        choices: [
          { text: 'Yeah, more than one', reply: 'Then Navratri is aimed right at you. The whole promise of the story is that the power to face your demon is already in you, the way it was already in the gods. Not borrowed, not somewhere else. Yours.', next: 'door' },
          { text: 'Not really sure', reply: 'Maybe a habit, a fear, a temper you keep meaning to master. The nine nights are a good window to pick one and turn toward it, with the Mother’s nerve.', next: 'door' },
        ],
      },
      door: {
        id: 'door',
        krishna: [
          'One more piece, and it’s my favorite. Near the end, families invite young girls into the home and honor them with food and gifts, because the Goddess is seen as present in them. The divine itself, sitting at your table as a nine-year-old, not a statue and not a faraway heaven.',
          'That’s the whole festival in a gesture: the power that beat the undefeatable demon is also the girl at your door. Fierce and near, both at once.',
        ],
        practice: 'Pick one Mahishasura of your own for these nine nights, one habit or fear you keep losing to. Each night, take one small step against it, however tiny. You don’t have to win by the tenth day. The practice is just turning toward it each night, with the Mother’s nerve, instead of away.',
        end: true,
      },
    },
  },

  'festival:dussehra-2025': {
    id: 'dlg:dussehra',
    start: 'effigy',
    nodes: {
      effigy: {
        id: 'effigy',
        krishna: ['On Dussehra, towns build a giant effigy of **Ravana**, the ten-headed demon king, and set it on fire while everyone cheers. He lost his war thousands of years ago. So why burn him again every single year?'],
        choices: [
          { text: 'To celebrate Rama winning', reply: 'That’s the surface of it, and it’s true. But if it were only history, we’d have gotten bored of it centuries ago. There’s a reason it stays urgent.', next: 'heads' },
          { text: 'Honestly, no idea', reply: 'A fair thing to wonder while the sparks fly. The answer is hiding in his ten heads.', next: 'heads' },
          { text: 'Tradition, I guess?', reply: 'It is tradition, but a pointed one. Look closely at those ten heads, that’s where the meaning lives.', next: 'heads' },
        ],
      },
      heads: {
        id: 'heads',
        krishna: [
          'Ravana had ten heads, and a favorite reading says each one is a fault every person carries: ego, greed, anger, lust, jealousy, and the rest. He was no distant monster. Brilliant, powerful, deeply learned, and undone by the one thing he refused to master in himself.',
          'So the effigy burns every year for a living reason: those ten heads grow back, in you, in me, in everyone. Setting him alight is a nudge to go after your own.',
          'If you had to name just one of your own ten heads, the fault that trips you up most, which would it be?',
        ],
        citation: 'Ravana’s fall: Valmiki Ramayana, Yuddha Kanda; the ten-heads-as-vices reading: popular tradition.',
        choices: [
          { text: 'Anger, probably', reply: 'A common one, and an honest pick. Anger feels powerful in the moment, which is exactly how it runs its Ravanas. Naming it is already the first cut.', next: 'burn' },
          { text: 'Ego, if I’m honest', reply: 'The hardest to admit, so good on you. Ego was Ravana’s real downfall, the one head that grew all the others. Just naming it loosens its grip.', next: 'burn' },
          { text: 'I’d rather not say', reply: 'That’s alright, you don’t have to say it out loud. Just knowing which one it is, quietly, is enough to start.', next: 'burn' },
        ],
      },
      burn: {
        id: 'burn',
        krishna: [
          'Remember how Rama actually won. One well-aimed arrow, straight to the one weak spot. Your faults have weak spots too: a moment of honesty, a pause before you react, one small honest choice.',
          'That’s Dussehra, really. You cheer the hero from long ago, sure, and you also take one clean shot at the thing in you that keeps growing back.',
        ],
        practice: 'This Dussehra, name one “head” of your own, one fault you’re tired of, and take a single clean shot at it this week. Not the whole war, just one arrow: skip the thing once, pause once, choose the better move once. That’s how the effigy actually burns.',
        end: true,
      },
    },
  },

  'festival:janmashtami-2025': {
    id: 'dlg:janmashtami',
    start: 'midnight',
    nodes: {
      midnight: {
        id: 'midnight',
        krishna: ['My own birthday, Janmashtami, gets celebrated at midnight, and the story sets it not in a temple but in a prison cell. Odd place for a party, right? Any guess why my arrival is put there?'],
        choices: [
          { text: 'No, that is strange', reply: 'It is meant to be. The where and the when are the whole message. Let me set the scene.', next: 'prison' },
          { text: 'Something symbolic, I bet', reply: 'Exactly the instinct. The prison and the midnight are a picture of something, not just history. Here it is.', next: 'prison' },
          { text: 'Wasn’t there a wicked king?', reply: 'There was, Kamsa, and his fear is what put me in that cell to begin with. Let me tell it.', next: 'prison' },
        ],
      },
      prison: {
        id: 'prison',
        krishna: [
          'A prophecy told King **Kamsa** that his sister’s eighth child would kill him. So he locked her in a cell and killed each baby as it came, fear doing what fear does, harming the very people closest to it.',
          'And then, on the darkest night of the month, in that locked cell, to a prisoner with everything against her, I was born. The guards slept, the chains fell open, and my father carried me across a flooded river to safety. Hope arrived exactly where it looked impossible.',
        ],
        citation: 'Krishna’s birth: Bhagavata Purana, Canto 10, Chapters 1–4.',
        choices: [
          { text: 'So light shows up in the dark', reply: 'That’s the whole of it. Not in the palace, not on a bright afternoon. In the cell, at midnight, in chains. That’s where the story insists the divine chooses to be born.', next: 'lamp' },
          { text: 'Feels a bit hopeful for a prison', reply: 'That’s exactly why it’s set in one. Anyone can feel held up on a good day. The story is built for the locked-in nights, when hope runs lowest.', next: 'lamp' },
        ],
      },
      lamp: {
        id: 'lamp',
        krishna: [
          'So the prison is any heart shut tight by fear, and midnight is any hour when hope runs low. Janmashtami’s quiet instruction is to keep one lamp lit in that darkness, because that’s exactly the moment something new tends to arrive.',
          'And notice how the story ends, not in solemn prayer but in stolen butter and songs sung too loud. Once the fear is behind it, the whole thing tips into joy. Delight, it turns out, is also a way to worship.',
        ],
        practice: 'Think of one “prison” you’re in right now, a worry, a stuck situation, a fear on a loop. This week light one small lamp against it: a hopeful act, a kindness, a moment of joy you choose on purpose. You don’t have to break the cell open. Just keep one light on inside it.',
        end: true,
      },
    },
  },

  'festival:ganesh-chaturthi-2025': {
    id: 'dlg:ganesh-chaturthi',
    start: 'guest',
    nodes: {
      guest: {
        id: 'guest',
        krishna: ['Here’s a strange one from the outside. On Ganesh Chaturthi a family brings home a clay statue of **Ganesha**, treats him as an honored houseguest for days, feeds and sings to him, then carries him out and lets him dissolve in the sea. Why go to all that trouble just to let him go?'],
        choices: [
          { text: 'No idea, seems sad', reply: 'It looks sad, and there are real tears at the water. But the letting-go is the whole teaching, not an accident. Let me walk you through it.', next: 'made' },
          { text: 'Some ritual thing?', reply: 'It’s ritual, yes, but one built to teach a single hard, useful thing. Watch what it points at.', next: 'made' },
          { text: 'Isn’t he the elephant god?', reply: 'He is, the remover of obstacles, greeted first before anything begins. And how he got that elephant head is worth hearing, it’s part of the point.', next: 'made' },
        ],
      },
      made: {
        id: 'made',
        krishna: [
          'The old story: **Parvati** shaped a boy out of turmeric to guard her door. **Shiva** came home, did not recognize the child blocking his way, and in a flash of temper struck off his head. Then, seeing Parvati’s grief, he brought the boy back with the head of the first creature he found, an elephant.',
          'Sit with that. A new, wiser life came through a break, through loss. The god you greet at every beginning got his own beginning out of something ending.',
        ],
        citation: 'Ganesha’s origin: Shiva Purana, Rudra Samhita, Kumara Khanda.',
        choices: [
          { text: 'So endings make room', reply: 'That’s it. And the festival makes you rehearse exactly that. You build him, love him, then hand him back to the water with your own hands.', next: 'water' },
          { text: 'Why let the murti go, though?', reply: 'Because holding on forever was never the lesson. You made him from clay, loved him fully, and now you let the clay return to the river. The releasing is the skill being taught.', next: 'water' },
        ],
      },
      water: {
        id: 'water',
        krishna: [
          'The chant as he goes into the water carries both halves at once: come, beloved Ganesha, and come again soon. Grief and trust in one breath. The clay came from the riverbed, and back it goes, and the family walks home lighter.',
          'That’s the whole festival in a gesture. Welcome fully, host fully, release fully, and trust it comes back around. It’s rehearsal for every real goodbye a life will ask of you.',
        ],
        practice: 'Pick one thing you’re gripping a little too tight this week, a plan, an outcome, even a good mood you wish would stay. Try the Ganesha move: enjoy it fully while it’s here, and when it’s time, open your hand and let it go to the water. Notice you’re still standing.',
        end: true,
      },
    },
  },

  'festival:maha-shivratri-2025': {
    id: 'dlg:maha-shivratri',
    start: 'awake',
    nodes: {
      awake: {
        id: 'awake',
        krishna: ['On Maha Shivratri people stay up the whole night, no sleep, one lamp burning. A festival whose main practice is basically not falling asleep. What do you suppose staying awake has to do with **Shiva**?'],
        choices: [
          { text: 'Genuinely no idea', reply: 'A fair thing to wonder at 3 a.m. with your eyes burning. The answer is that Shiva is what the wakefulness is pointing at.', next: 'still' },
          { text: 'Some test of devotion?', reply: 'People treat it that way, but it’s less a test than a practice, and what it practices is worth knowing.', next: 'still' },
          { text: 'Isn’t Shiva the destroyer?', reply: 'That’s his loud title. Underneath the drama he’s something much quieter, and the vigil is aimed at that quiet thing.', next: 'still' },
        ],
      },
      still: {
        id: 'still',
        krishna: [
          'Under all the stories, Shiva is stillness itself, pure awareness, the silent watcher that’s there whether you’re busy or bored. So the night vigil is a small rehearsal: stay awake, stay aware, right when everything in you wants to dull out and drift off.',
          'There’s a gentle story here too. A hunter, stuck up a tree all night, kept nervously dropping leaves that happened to land on a Shiva stone below. He wasn’t even trying to pray, and Shiva was moved anyway, because a wakeful, sincere heart reaches him, polished ritual or not.',
        ],
        citation: 'The hunter’s vigil: Shiva Purana, Shivratri mahatmya.',
        choices: [
          { text: 'So it’s about being present', reply: 'That’s the heart of it. Not the perfect prayer, just staying awake and sincere. That alone gets through to him.', next: 'wedding' },
          { text: 'I’m bad at staying present', reply: 'Everyone is, that’s why it’s a practice and not a talent. The hunter was no saint. He just happened to stay awake and mean it, and that was enough.', next: 'wedding' },
        ],
      },
      wedding: {
        id: 'wedding',
        krishna: [
          'One more piece: Shivratri also marks Shiva’s wedding to **Parvati**. She is Shakti, the power that acts. He is the stillness that watches. The night celebrates the two of them becoming one.',
          'And that’s the quiet lesson. You need both in you: the awareness to see clearly, and the energy to actually do something with it. Stillness alone just sits. Power alone runs wild. Together they make a life that works.',
        ],
        practice: 'You don’t need to pull an all-nighter. This week pick one ordinary moment, washing a dish, waiting in a line, and instead of drifting into your phone or your worries, stay fully awake to it for sixty seconds. That small wakefulness is the whole vigil, in miniature.',
        end: true,
      },
    },
  },

  'festival:ram-navami-2025': {
    id: 'dlg:ram-navami',
    start: 'noon',
    nodes: {
      noon: {
        id: 'noon',
        krishna: ['Here’s a small thing most people never notice. **Krishna**, that’s me, is born at midnight, hidden away in a prison. **Rama** is born at high noon, sun blazing over the city. Same divine, two very different entrances. Why do you suppose the tradition lights Rama up in full daylight?'],
        choices: [
          { text: 'No idea, but now I’m curious', reply: 'Good, because the daylight is the whole clue. Rama is the divine you can see clearly, in the open, all the time. Let me show you what that means.', next: 'ideal' },
          { text: 'Because he’s the good example?', reply: 'That’s exactly it. Rama is the one held up as the model, and a model has to be visible. Here’s what he models.', next: 'ideal' },
          { text: 'Solar dynasty thing?', reply: 'Yes, he’s of the sun line, born with the sun at its peak. And that fits what he stands for perfectly. Watch.', next: 'ideal' },
        ],
      },
      ideal: {
        id: 'ideal',
        krishna: [
          'Rama is what the tradition calls **maryada purushottam**, roughly, the perfect man of conduct. On the very morning he is to be crowned king, the order flips: fourteen years of exile instead, over a promise his father once made. Rama hears it and walks out the same hour, no argument, no bitterness.',
          'That is his whole character in one motion. He does the right thing when it costs him everything, in plain sight, with no one forcing him. Where my path is play and closeness, his is the straight, bright example of dharma held all the way down.',
        ],
        citation: 'Rama’s exile and character: Valmiki Ramayana, Ayodhya Kanda.',
        choices: [
          { text: 'That’s a high bar', reply: 'It is, and it is meant to be. You don’t clear it in a day. But you can aim at it, one honest choice at a time, which is all Rama ever asks.', next: 'daylight' },
          { text: 'Feels almost too perfect', reply: 'People say that. Think of him less as a scold and more as a fixed star: something true to steer by, useful even on the nights you wander off course.', next: 'daylight' },
        ],
      },
      daylight: {
        id: 'daylight',
        krishna: [
          'So Rama’s noon is the festival’s quiet claim: some goodness is meant to be done in the open, in full daylight, when nobody is making you and everybody can see.',
          'You already know the feeling. The moment where the easy thing and the right thing part ways, and only you would know if you took the shortcut. That’s your bit of Ayodhya.',
        ],
        practice: 'This week, catch one small “nobody would know” moment, where you could cut a corner and no one would see. Do the Rama thing instead: the honest, upright choice, made quietly, in the full daylight of your own conscience. Notice how it sits with you afterward.',
        end: true,
      },
    },
  },

  'festival:makar-sankranti-2025': {
    id: 'dlg:makar-sankranti',
    start: 'turn',
    nodes: {
      turn: {
        id: 'turn',
        krishna: ['Almost every Hindu festival rides the moon, so the dates wander year to year. Makar Sankranti is the odd one out, it rides the sun, and lands on nearly the same date every January. What do you figure a whole festival built around the sun is actually celebrating?'],
        choices: [
          { text: 'The sun, literally?', reply: 'Partly, yes, but a specific thing the sun does on this day. And that thing turns out to be a lesson about your whole life. Here it is.', next: 'degree' },
          { text: 'No clue, honestly', reply: 'Fair, it’s an easy one to miss. What it marks is tiny and enormous at the same time. Let me show you.', next: 'degree' },
          { text: 'Isn’t it the kite one?', reply: 'That’s the one, kites everywhere. But under the kites is a quieter idea, and it’s worth having.', next: 'degree' },
        ],
      },
      degree: {
        id: 'degree',
        krishna: [
          'On this day the sun turns north, and the days start getting longer. The word **sankranti** just means “transition.” Notice what the festival honors: not an arrival, not a finish line, but the turn itself, the exact moment the direction changes.',
          'And here is why that matters. The turn is almost nothing on the day, a few seconds of extra light, imperceptible. But it compounds. That is what real turnarounds look like: no drama on the day, just a changed direction that adds up by summer.',
        ],
        citation: 'Uttarayana, the sun’s northern turn: Bhagavad Gita 8.24.',
        choices: [
          { text: 'So small turns, big results', reply: 'Exactly. You almost never feel the day you turn. You feel it months later, when the light is everywhere and you realize you’ve been climbing the whole time.', next: 'sweet' },
          { text: 'Wish my turnarounds felt bigger', reply: 'They rarely feel like anything on the day, that’s the trap. The turn is quiet. One degree, held for six months, is how a winter becomes a summer.', next: 'sweet' },
        ],
      },
      sweet: {
        id: 'sweet',
        krishna: [
          'There is a sweet custom too. People hand each other little sesame-and-jaggery treats and say, in effect, take this sweet and speak sweetly. It’s a yearly, edible peace treaty, a nudge to mend what soured over the cold months.',
          'So the day carries two gifts: turn your direction by a degree, and sweeten one thing that went bitter. Both small. Both compound.',
        ],
        practice: 'Pick one direction in your life you want to turn, just one degree this week, not a whole transformation. Then do the tilgul move: reach out to one person things went cold with, and offer something sweet, a kind word, a small gesture. Small turns, held, are how a year changes.',
        end: true,
      },
    },
  },

  'festival:basant-panchami-2025': {
    id: 'dlg:basant-panchami',
    start: 'white',
    nodes: {
      white: {
        id: 'white',
        krishna: ['On Basant Panchami, everyone wears yellow and honors **Saraswati**. Here’s the odd detail: unlike the gods of wealth or power, she carries no weapon and wears plain white, just a book and a **veena**, a stringed instrument. What do you think a goddess dressed like that is the goddess of?'],
        choices: [
          { text: 'Learning, maybe?', reply: 'Exactly right. She is knowledge itself, music, speech, study, wisdom. And the way she’s dressed says something the modern world half-forgets.', next: 'sacred' },
          { text: 'Not sure, honestly', reply: 'She is the goddess of knowledge, learning, and music. And her plain white robes carry a claim worth hearing.', next: 'sacred' },
          { text: 'Art and music?', reply: 'Close, and included. She covers all of it: music, speech, study, the whole life of the mind. And notice what she does not carry.', next: 'sacred' },
        ],
      },
      sacred: {
        id: 'sacred',
        krishna: [
          'No sword, no gold, no crown. Just an instrument and a book. The tradition is making a quiet, radical claim: **learning itself is sacred**. Holy in its own right, worth reverence the way wealth or power is, and not merely because it lands you a paycheck.',
          'That’s why on this day even books get a holiday, set down before the goddess and honored. And it’s why a child’s very first lesson is treated as a religious event.',
        ],
        citation: 'Saraswati, goddess of learning: Puranic tradition; the river hymn, Rig Veda 6.61.',
        choices: [
          { text: 'What’s the child’s first lesson?', reply: 'The sweetest custom of the day. A little one sits in a grandparent’s lap and traces their first letters in a tray of rice, everyone clapping as if a kingdom were won. It is called vidyarambha, the beginning of knowledge.', next: 'begin' },
          { text: 'Learning as holy is a nice idea', reply: 'It changes how you hold it. On this day a child even traces their first letters in a tray of rice, in a grandparent’s lap, blessed and applauded. The beginning is made an occasion, not a test.', next: 'begin' },
        ],
      },
      begin: {
        id: 'begin',
        krishna: [
          'The wisdom in that custom is simple: your whole relationship with learning is shaped by its first emotional taste. So the tradition made that first taste sweet on purpose, lap, laughter, blessing, and no judgment for the first clumsy stroke.',
          'And it is not only for children. Whatever you’ve been meaning to learn, the language, the instrument in its case, the skill you keep postponing, has its own first letters waiting.',
        ],
        practice: 'Pick one “first letters” of your own, something you’ve wanted to learn and kept putting off. This week, begin it the vidyarambha way: start small, be kind to the first clumsy attempt, and treat the beginning as something to celebrate rather than judge. Beginnings deserve ceremony.',
        end: true,
      },
    },
  },

  'festival:hanuman-jayanti-2025': {
    id: 'dlg:hanuman-jayanti',
    start: 'wind',
    nodes: {
      wind: {
        id: 'wind',
        krishna: ['**Hanuman** is the strongest figure in the whole tradition, he lifts mountains, leaps oceans, walks through fire unharmed. But here’s the strange part: the most famous moment in his story is when he forgot he could do any of it. Guess what fixed that?'],
        choices: [
          { text: 'Someone reminded him?', reply: 'Exactly. Let me tell you the scene, because it’s the whole point of him.', next: 'shore' },
          { text: 'No idea', reply: 'No new power, no magic weapon. Just a friend, and a few words. Here’s the moment.', next: 'shore' },
          { text: 'Isn’t he the monkey god?', reply: 'He is, son of the wind, devoted to Rama. And his greatest feat started with him sitting on a beach, feeling useless. Watch.', next: 'shore' },
        ],
      },
      shore: {
        id: 'shore',
        krishna: [
          'The army reached the sea. Rama’s wife was held captive on an island across a vast stretch of open water, and someone had to leap it. Hanuman, who could have cleared it easily, sat there discouraged, because a curse in his childhood had made him forget his own strength.',
          'Then an old bear named **Jambavan** simply reminded him: you are the son of the wind, you have crossed skies, this ocean is nothing to you. As he listened, Hanuman grew, remembered, and cleared the whole sea in a single leap.',
        ],
        citation: 'Hanuman’s leap: Valmiki Ramayana, Kishkindha and Sundara Kandas.',
        choices: [
          { text: 'Yeah, definitely', reply: 'Most people have. And often what breaks the spell isn’t a lecture, it’s one person who sees you clearly and says it out loud. Stay near those people, and be that person when you can.', next: 'serve' },
          { text: 'Maybe right now', reply: 'Then you’re on Hanuman’s beach. The kindness of the story is that he didn’t have to manufacture new power. He just needed reminding of what was already his. Who’s your Jambavan?', next: 'serve' },
        ],
      },
      serve: {
        id: 'serve',
        krishna: [
          'One more thing about Hanuman, and it’s why he’s so loved. All that power, and he wanted nothing for himself. Every bit of it went to serving Rama, something he loved beyond his own ego.',
          'The tradition holds him up as the ideal for exactly that: enormous strength, placed entirely in the service of something larger than himself.',
        ],
        practice: 'Two small moves this week. First, name one strength you’ve been forgetting you have, and use it once, on purpose. Second, be someone’s Jambavan: tell one person, plainly, a strength you see in them that they seem to have forgotten.',
        end: true,
      },
    },
  },

  'festival:ratha-yatra-2025': {
    id: 'dlg:ratha-yatra',
    start: 'out',
    nodes: {
      out: {
        id: 'out',
        krishna: ['Most of the year a temple’s main deity sits deep in an inner sanctum, and historically not everyone was allowed in to see him. Ratha Yatra flips that completely. For one day, the god leaves the temple. Any idea why that’s such a big deal?'],
        choices: [
          { text: 'So everyone can see him?', reply: 'Exactly, that’s the heart of it. Let me show you what it looks like.', next: 'chariot' },
          { text: 'Not sure', reply: 'Because it turns the usual arrangement inside out. The one who was hard to reach comes looking for you. Here’s the scene.', next: 'chariot' },
          { text: 'Isn’t this the giant chariot one?', reply: 'That’s the one, chariots so huge the English word “juggernaut” came from them. And what rides out on them matters even more than their size.', next: 'chariot' },
        ],
      },
      chariot: {
        id: 'chariot',
        krishna: [
          '**Jagannath**, a form of Krishna, is pulled through the streets of Puri on a chariot so massive it takes thousands of hands on the ropes. And here’s the thing: anyone can grab a rope. Every caste, every stranger, every person who could never enter the inner sanctum, all pulling the same god down the same road.',
          'There’s even a moment where the king himself, the highest man present, sweeps the chariot platform with a golden broom. Before the god on the open road, the mighty and the lowly stand on the same ground.',
        ],
        citation: 'Ratha Yatra: Skanda Purana, Purushottama Kshetra Mahatmya; the king’s sweeping, Puri tradition.',
        choices: [
          { text: 'Kind of moving, actually', reply: 'It is. The message is simple and huge: you don’t have to earn your way into the sanctum. Once a year at least, the sanctum comes out to the street to find you.', next: 'unfinished' },
          { text: 'Why does that matter?', reply: 'Because so much of religion can feel like a locked room you’re not holy enough to enter. Ratha Yatra says the opposite, on wheels: the god will come to you, wherever you happen to be standing.', next: 'unfinished' },
        ],
      },
      unfinished: {
        id: 'unfinished',
        krishna: [
          'One last detail I love. The Jagannath murti is deliberately left **unfinished**, stumpy arms, huge round eyes, no fine features. Some say the sculptor was interrupted; the tradition kept it that way on purpose.',
          'The quiet message: the divine doesn’t wait to be polished and perfect before it shows up for you. It rolls out into the street half-carved, wide-eyed, and available. So can you.',
        ],
        practice: 'This week, notice where you’ve been waiting to be “finished” before you show up, more ready, more worthy, more polished, before you reach out or start or let someone really see you. Take the Jagannath approach once: roll out unfinished anyway.',
        end: true,
      },
    },
  },

  'festival:guru-purnima-2025': {
    id: 'dlg:guru-purnima',
    start: 'teacher',
    nodes: {
      teacher: {
        id: 'teacher',
        krishna: ['Guru Purnima is, on the surface, a day to honor teachers, which might sound a bit like a greeting-card holiday. But the word **guru** carries something much bigger than “teacher.” Want to guess what it literally breaks down to?'],
        choices: [
          { text: 'No idea', reply: 'Gu means darkness, ru means remover. A guru is anyone who removes a bit of your darkness. That’s a very different job than teaching facts.', next: 'darkness' },
          { text: 'Something about light?', reply: 'Close, from the other side: darkness. Gu is darkness, ru is its remover. A guru dispels a patch of your not-knowing.', next: 'darkness' },
          { text: 'Just “teacher,” no?', reply: 'That’s the usual translation, but it’s thinner than the word. Gu is darkness, ru is remover. Removing darkness is more than handing over information.', next: 'darkness' },
        ],
      },
      darkness: {
        id: 'darkness',
        krishna: [
          'So a **guru** isn’t only the person at the front of a classroom. It’s anyone whose presence lifts a bit of your ignorance, a mentor, a grandmother, even a hard experience that taught you what no book could.',
          'And here’s why the tradition takes it so seriously. For most of history there were no books to learn the deep things from. It all passed hand to hand, teacher to student, a living chain called **parampara**. Lose a link and a whole line of knowledge could vanish. The teacher was the bridge, the only way across.',
        ],
        citation: 'Guru (gu-ru, darkness-remover): Guru Gita tradition; approaching a teacher, Bhagavad Gita 4.34.',
        choices: [
          { text: 'A few people, yeah', reply: 'Good. Those are your gurus, whether they ever held the title or not. The festival mostly exists to make sure they get thanked out loud, which almost never happens on its own.', next: 'thanks' },
          { text: 'Hadn’t thought about it', reply: 'Most people haven’t, because a guru rarely announces themselves. Someone just quietly made you less lost than you were. Today is the day to notice who.', next: 'thanks' },
        ],
      },
      thanks: {
        id: 'thanks',
        krishna: [
          'The other half of the day is staying a student yourself. Even **Vyasa**, the sage who arranged the Vedas and wrote the Mahabharata, is honored today as the great teacher, and the tradition still calls itself a student before him. Nobody outgrows learning.',
          'So that’s the posture Guru Purnima asks for: grateful to those who taught you, and humble enough to keep being taught.',
        ],
        practice: 'This week, actually thank one guru of yours, out loud or in writing, not just in your head. A teacher, a mentor, a parent, anyone who removed some darkness for you. Name the specific thing they helped you see. It lands harder than you’d expect.',
        end: true,
      },
    },
  },

  'festival:ugadi-gudi-padwa-2025': {
    id: 'dlg:ugadi',
    start: 'spoon',
    nodes: {
      spoon: {
        id: 'spoon',
        krishna: ['Ugadi, the new year across much of the south, opens with a very odd dish: a single spoonful of chutney, the **pachadi**, made on purpose to taste sweet, sour, bitter, salty, spicy, and tangy all at once. Why start a fresh year with bitter mixed right into the sweet?'],
        choices: [
          { text: 'To taste everything?', reply: 'Exactly the instinct. It’s a picture of the year you’re walking into. Let me spell it out.', next: 'taste' },
          { text: 'No idea, sounds gross', reply: 'It’s a bit of a shock to the tongue, on purpose, and that shock is the teaching. Here’s what it means.', next: 'taste' },
          { text: 'Some new-year ritual?', reply: 'It is, and a wise one. It sets the expectation for a whole year in a single bite. Watch.', next: 'taste' },
        ],
      },
      taste: {
        id: 'taste',
        krishna: [
          'Each taste stands for something the year will bring. Sweet for joy, bitter for grief, sour for the things that don’t go your way, spice for the surprises. You take them together, in one spoon, at the very start.',
          'Notice what it refuses to promise: a year of only sweet. It hands you the whole flavor of a real life up front, and asks you to swallow it with a kind of cheerful readiness.',
        ],
        citation: 'Ugadi pachadi: festival tradition of the Deccan new year.',
        choices: [
          { text: 'That’s weirdly comforting', reply: 'It is, isn’t it. There’s relief in being told the truth on day one: it won’t all be sweet, and that’s not a failure. That’s just the recipe.', next: 'ready' },
          { text: 'Bit pessimistic, no?', reply: 'It’s the opposite, really. It makes peace with all of it in advance, so the bitter days land as part of the recipe instead of a betrayal.', next: 'ready' },
        ],
      },
      ready: {
        id: 'ready',
        krishna: [
          'So the whole festival is one wise spoonful: the year will be sweet and bitter and everything between, and you meet it whole, without demanding only the good bits.',
          'People who can taste the bitter without spitting out the spoon tend to be the ones who stay steady when a year turns hard. That steadiness is what Ugadi is trying to hand you.',
        ],
        practice: 'At the start of this week, name the six tastes of your life right now, out loud or on paper: one sweet thing, one bitter, one sour, and so on. Don’t fix them or rank them. Just take the whole spoon, and notice you can hold all of it at once.',
        end: true,
      },
    },
  },

  'festival:raksha-bandhan-2025': {
    id: 'dlg:raksha-bandhan',
    start: 'thread',
    nodes: {
      thread: {
        id: 'thread',
        krishna: ['Raksha Bandhan looks like a sweet, simple thing: a sister ties a colorful thread on her brother’s wrist, he gives a gift, everyone eats sweets. But the name means “the bond of protection.” What do you think the thread is actually for?'],
        choices: [
          { text: 'A promise of some kind?', reply: 'Exactly. The thread is the easy part; the promise it stands for is the real thing. And it started out bigger than brothers and sisters.', next: 'origin' },
          { text: 'Just a sibling tradition?', reply: 'That’s what it’s become, and it’s lovely. But the oldest versions weren’t sibling stories at all. Let me show you.', next: 'origin' },
          { text: 'No clue, honestly', reply: 'It’s a vow, tied in string. And its first tellings had nothing to do with brothers and sisters. Here they are.', next: 'origin' },
        ],
      },
      origin: {
        id: 'origin',
        krishna: [
          'In one old story a queen ties a blessed thread on her husband before he rides into a war he’s losing, protection sent along in a strand of cotton. In another, **Draupadi** tears a strip from her sari to wrap my bleeding finger, and I promise to repay that scrap without limit, which, years later, I do, when she needs shielding most.',
          'So the thread was never really about gender or blood. It’s a portable vow: I’m tying this to say I’ve got you, and you’ve got me.',
        ],
        citation: 'The Indra-Shachi and Krishna-Draupadi rakhis: Bhavishya Purana and Mahabharata tradition.',
        choices: [
          { text: 'So it’s mutual', reply: 'That’s the heart of it. One ties, one protects, and often it runs both ways. More and more, people tie rakhis to friends, cousins, whoever they mean to promise.', next: 'promise' },
          { text: 'Nice, but does string do anything?', reply: 'The string does nothing. The named promise does everything. That’s why the wise version of this festival has people say the promise out loud, not just tie the knot.', next: 'promise' },
        ],
      },
      promise: {
        id: 'promise',
        krishna: [
          'Here’s what most people miss on the day. The thread frays and falls off within a week. What lasts, if anything does, is a specific promise: I’ll call every month, I’ll show up in the hard season, I’ll be reachable when it counts.',
          'A vow you can name is worth a hundred pretty threads. The rakhi is just the reminder, tied where you can see it.',
        ],
        practice: 'Pick one person you’d protect, a sibling, a friend, anyone. This week don’t just feel it, name it: tell them one concrete thing you’ll actually do for them this year. A monthly call, a standing invitation, help with the thing they dread. Say the promise out loud. That’s the real rakhi.',
        end: true,
      },
    },
  },

  'festival:onam-2025': {
    id: 'dlg:onam',
    start: 'welcome',
    nodes: {
      welcome: {
        id: 'welcome',
        krishna: ['Onam is Kerala’s biggest festival, flower carpets, a giant feast, boat races, all to welcome a returning king named **Mahabali**. Here’s the twist: he’s a king the gods actually defeated and sent away. Why throw a joyful party every year for a banished ruler?'],
        choices: [
          { text: 'Because they loved him?', reply: 'Exactly. He was that good. Let me tell you what kind of king earns a welcome even after he’s gone.', next: 'king' },
          { text: 'That is strange', reply: 'It is, until you hear who he was. This isn’t mourning a loss, it’s keeping faith with someone beloved. Here’s the story.', next: 'king' },
          { text: 'Isn’t there a dwarf god?', reply: 'There is, Vamana, and he’s the one who sent Mahabali away. But even that story bends over backwards to honor the king. Watch.', next: 'king' },
        ],
      },
      king: {
        id: 'king',
        krishna: [
          'Under **Mahabali**, the songs say, everyone was equal, no one went hungry, and no one lied. A golden age. He was also generous to a fault, which is exactly what got used.',
          'A small boy, **Vamana**, one of my own forms, came begging just three paces of land. Mahabali, ever generous, agreed. The boy grew vast: two steps spanned all the worlds, and the third gently pressed the king below. Moved by his goodness, though, they granted him one visit home each year. Onam is that visit.',
        ],
        citation: 'Mahabali and Vamana: Bhagavata Purana, Canto 8; the Maveli song, Kerala tradition.',
        choices: [
          { text: 'So even the “loser” is honored', reply: 'That’s the beauty of it. The story humbles his pride but never his goodness. A whole people spend a week making the place worthy of a good man’s return.', next: 'home' },
          { text: 'Why humble a good king at all?', reply: 'It was his pride that needed the touch, not his kindness. The third step was a gentle right-sizing, and it came with a gift: come home every year and see your people happy.', next: 'home' },
        ],
      },
      home: {
        id: 'home',
        krishna: [
          'So Onam is a whole people preparing a welcome. The flower carpet at the door, the feast laid out, the house made beautiful, all so a beloved, humbled, generous king finds things well when he arrives.',
          'And there’s a quiet question folded into it: if someone who loved you came back to see how you’re living, would they find you kind? Onam makes a whole state answer that once a year.',
        ],
        practice: 'This week, get one small corner of your life “ready for Mahabali,” as if someone who believed in your goodness were coming to visit. Clean the corner, mend the quarrel, set one thing right. Live a single day as if a good king were coming to see how you turned out.',
        end: true,
      },
    },
  },

  'festival:karva-chauth-2025': {
    id: 'dlg:karva-chauth',
    start: 'fast',
    nodes: {
      fast: {
        id: 'fast',
        krishna: ['Karva Chauth is a day when, traditionally, a wife fasts from dawn until moonrise for her husband’s long life. I’ll be honest, to a modern ear that can land as pretty one-sided. Does it strike you that way?'],
        choices: [
          { text: 'Yeah, a little', reply: 'Fair, and worth saying plainly. The old form is gendered, no pretending otherwise. But under the form is something real, and many couples now do it together. Let me get at the real part.', next: 'choose' },
          { text: 'Not sure', reply: 'It’s worth looking at honestly. The traditional shape is one-directional, and plenty of couples now fast for each other. Strip the gender off, though, and something worthwhile is left. Here it is.', next: 'choose' },
          { text: 'It’s romantic, I think', reply: 'For many it deeply is. And there’s a real thing under the romance, one that doesn’t depend on who fasts for whom. Let me name it.', next: 'choose' },
        ],
      },
      choose: {
        id: 'choose',
        krishna: [
          'A freely chosen hardship is one of the oldest ways humans say “you matter to me.” Going without food all day, and meaning it, puts love into the body, not just into words. That part is real, whoever does the fasting.',
          'And the story told on the day, of **Savitri**, is no tale of a meek wife. It’s about a woman who followed Death himself and out-argued him to win her husband back. The devotion here has spine.',
        ],
        citation: 'The Karwa Chauth vrat katha; Savitri and Yama: Mahabharata, Vana Parva.',
        choices: [
          { text: 'So it’s about commitment', reply: 'That’s the durable core. A chosen, embodied “I’ve got you.” And it lands best when it’s mutual, two people each willing to go without something for the other.', next: 'mutual' },
          { text: 'Still feels dated to me', reply: 'The one-way version can be, and you’re allowed to think so. Keep the marrow, a chosen sacrifice that says you matter, and let it flow both ways. Plenty of couples already have.', next: 'mutual' },
        ],
      },
      mutual: {
        id: 'mutual',
        krishna: [
          'So the keepable heart of Karva Chauth is simple: love gets realer when it costs you something you chose to give. Which way the fast runs is the disposable part.',
          'A gift that costs nothing is easy to doubt. One that cost you a day of hunger, or an evening of your own comfort, is hard to mistake.',
        ],
        practice: 'This week, do one small chosen “fast” for someone you love, and ideally ask them to do one back. Give up something real for a day, an hour of your time, a comfort, a habit, as a way of saying you matter without using words. Let it go both directions.',
        end: true,
      },
    },
  },

  'festival:chhath-puja-2025': {
    id: 'dlg:chhath-puja',
    start: 'sun',
    nodes: {
      sun: {
        id: 'sun',
        krishna: ['Chhath Puja is four days of serious austerity, standing waist-deep in cold water, no priest, everything done by your own hands, all to worship the **Sun**. But here’s the detail that stops me every time: the first great offering goes to the setting sun, the evening before the sunrise one. Why thank the sun as it’s leaving?'],
        choices: [
          { text: 'Huh, that is unusual', reply: 'It really is. Almost everyone worships the sunrise. Chhath bows first to the sunset, and that choice is the whole heart of it. Let me open it up.', next: 'setting' },
          { text: 'No idea', reply: 'Most sun worship greets the dawn. Chhath greets the going-down first, and that flip is the teaching. Here it is.', next: 'setting' },
          { text: 'Isn’t new light the point?', reply: 'You’d think so, and the rising sun does get its offering the next morning. But the setting sun comes first, on purpose. Watch why.', next: 'setting' },
        ],
      },
      setting: {
        id: 'setting',
        krishna: [
          'Think about what the setting sun is. It’s the one that already gave, all day, warmth and light and every growing thing, and is now spent and going down. Chhath turns to that sun first and says thank you, before it’s gone.',
          'Gratitude that only shows up for the sunrise is cheap. Anyone can cheer what’s rising. It takes something deeper to honor what’s fading, the giver on its way out.',
        ],
        citation: 'Chhath’s arghya to the setting and rising sun: Bihar and Mithila tradition; Surya hymn, Rig Veda 1.50.',
        choices: [
          { text: 'That’s quietly beautiful', reply: 'It is. And notice the rigor around it, no priest, no shortcut, everything by your own hand, standing in the cold water yourself. Some thanks you don’t outsource.', next: 'hands' },
          { text: 'Why all the hardship, though?', reply: 'Because the difficulty is part of the message. Cold water at dawn, days of fasting, all of it by your own hand, it makes the gratitude cost something. And costly gratitude is the kind that changes you.', next: 'hands' },
        ],
      },
      hands: {
        id: 'hands',
        krishna: [
          'So Chhath does two quietly radical things at once: it thanks what’s declining, not only what’s rising, and it does so with your own hands, nobody standing in between.',
          'It’s a festival for everything in your life that gave and is now going, a season, a chapter, a person who carried you and is stepping back. Turn and thank it before it sets.',
        ],
        practice: 'This week, thank one “setting sun” in your life, something or someone that gave a lot and is now fading or stepping back: a finished chapter, an aging mentor, a friendship quietly winding down. Don’t wait for it to be gone. Offer the thanks now, while the light is still on the water.',
        end: true,
      },
    },
  },

  'deity:krishna': {
    id: 'dlg:deity-krishna',
    start: 'me',
    nodes: {
      me: {
        id: 'me',
        krishna: ['Alright, this one’s a little strange for me, it’s my own chapter. So let me ask you the question people always trip over: which one am I, really? The butter-stealing kid with the flute, or the one who showed Arjuna the whole universe inside my mouth?'],
        choices: [
          { text: 'The cowherd, mostly', reply: 'That’s the one most people fall for first, and I don’t mind a bit. But hold that thought, because the flute and the universe are the same me, and that’s the whole point.', next: 'both' },
          { text: 'The cosmic one, I guess', reply: 'The grand version, sure. But if I were only that, you’d admire me and keep your distance. The flute is there so you don’t. Let me explain.', next: 'both' },
          { text: 'Aren’t they different?', reply: 'That’s exactly the puzzle. They look like two gods. They’re one, and that’s the most interesting thing about me. Here’s why.', next: 'both' },
        ],
      },
      both: {
        id: 'both',
        krishna: [
          'Most gods stand for one big thing. I insisted on being all of it at once: the baby you scold for stealing butter, and the force the whole universe runs on. Both true, both me.',
          'And there’s a reason for it, not just showing off. A God you can only bow to stays far away. A God you can also tease, argue with, and feed gets close. I made myself easy to love on purpose.',
        ],
        citation: 'Krishna as the complete avatar: Bhagavata Purana, Canto 10.',
        choices: [
          { text: 'Honestly, far off', reply: 'Then start with the flute, not the cosmic form. Talk to me like a friend who’s in the room. That closeness is the front door I built for you.', next: 'friend' },
          { text: 'Pretty close, actually', reply: 'Good. That closeness is the whole invitation. The grandeur is real, but you don’t have to earn your way up to it. You start as a friend and the rest unfolds.', next: 'friend' },
        ],
      },
      friend: {
        id: 'friend',
        krishna: [
          'That’s really all I want you to take from my chapter. You don’t have to approach the biggest thing there is on your knees and trembling. You can approach it the way you’d approach someone who loves you.',
          'The Gita, the cosmos, all of that is here too. But it started with a boy, a flute, and a pasture full of friends. Start there.',
        ],
        practice: 'This week, try talking to the divine the way you’d talk to a close friend, out loud, plainly, no special voice. Tell it about your day. Complain, thank, ask. Notice whether the distance shrinks even a little. That informal closeness is the door I’m holding open.',
        end: true,
      },
    },
  },

  'deity:shiva': {
    id: 'dlg:deity-shiva',
    start: 'destroyer',
    nodes: {
      destroyer: {
        id: 'destroyer',
        krishna: ['Let me introduce you to **Shiva**, and clear up the scariest word attached to him first: “destroyer.” When you hear that, what do you picture?'],
        choices: [
          { text: 'Something frightening', reply: 'Most people do. But what he governs is endings, and an ending is really just the clearing that makes room for the next thing. Stay with me.', next: 'endings' },
          { text: 'Not sure, honestly', reply: 'Fair. The title does him a disservice. What he actually governs is endings, and endings turn out to be less the enemy than they sound. Let me show you.', next: 'endings' },
          { text: 'Isn’t he the meditation god?', reply: 'That too, the still one on the mountain. And that stillness and the “destroyer” turn out to be the same thing seen from two sides. Here’s how.', next: 'endings' },
        ],
      },
      endings: {
        id: 'endings',
        krishna: [
          'Think of a gardener pruning a plant, or a forest fire that lets new growth come. Something has to end for something to begin. Shiva is the god of that necessary ending, the out-breath of the whole universe.',
          'There’s a story that shows his heart. When the gods churned the ocean, out came a poison that could destroy everything. Someone had to drink it. Shiva did, and held it in his throat, which turned blue. He takes in what would ruin everyone else, and stays standing.',
        ],
        citation: 'The blue throat (Nilakantha): the churning of the ocean, Puranic tradition.',
        choices: [
          { text: 'Someone has to stay steady', reply: 'Exactly. When things are ending and everyone’s panicking, Shiva is the one sitting perfectly still in the middle of it. That stillness is a strength most people never build.', next: 'still' },
          { text: 'Not sure it does', reply: 'Think of the calmest person you know in a crisis, and how much you want them near when things fall apart. Shiva is that, turned all the way up. The stillness is the point.', next: 'still' },
        ],
      },
      still: {
        id: 'still',
        krishna: [
          'One more thing worth knowing: for all his fierceness, Shiva is famously the easiest god to please. No gold, no grand ritual, a little water on a plain stone and a sincere heart, and he’s moved. The tradition calls him Bholenath, the simple lord.',
          'So he’s a strange, wonderful mix: the one who sits calmly with endings and poison, and the one who melts at a cup of water offered honestly. Fierce with the big things, tender with the small.',
        ],
        practice: 'This week, find one thing in your life that’s genuinely ending, a habit, a role, a chapter, and instead of clinging, try sitting with it the way Shiva sits: still, unpanicked, letting it go so the next thing has room. Just one ending, met calmly.',
        end: true,
      },
    },
  },

  'deity:durga': {
    id: 'dlg:deity-durga',
    start: 'warrior',
    nodes: {
      warrior: {
        id: 'warrior',
        krishna: ['Meet **Durga**, and notice the first strange thing about her: a calm, almost gentle motherly face, sitting above ten arms each holding a weapon, riding a lion into battle. Serenity and ferocity in one figure. What do you make of that combination?'],
        choices: [
          { text: 'A protective mother?', reply: 'Exactly the read. There’s no fury like a mother’s when what she loves is threatened. But there’s something even bigger in how she was born. Let me tell you.', next: 'born' },
          { text: 'Kind of contradictory', reply: 'It looks that way until you’ve met a calm person who’s also completely unafraid to fight. That’s her. And her origin explains why. Here it is.', next: 'born' },
          { text: 'Isn’t she just a warrior?', reply: 'She’s that, but the serene face matters as much as the weapons. She fights without losing her center. Watch where she comes from.', next: 'born' },
        ],
      },
      born: {
        id: 'born',
        krishna: [
          'A demon named Mahishasura had a boon: no man and no god could kill him. One by one the great gods tried and failed. So they did something they had never done, they poured all their power into a single point, and out of that combined fire rose **Durga**.',
          'Sit with what that means. When the crisis was total and no one could face it alone, the power they created took the form of the Goddess. She is what pure power looks like when it stands up in a body.',
        ],
        citation: 'Durga’s birth and the Mahishasura battle: Devi Mahatmya, Chapters 2–3.',
        choices: [
          { text: 'That strength can be loving', reply: 'Yes. The fiercest force in the story is also the most protective. Her ten weapons are all in service of the ones she shelters, strength and tenderness in the same hands.', next: 'shelter' },
          { text: 'Hadn’t thought about it', reply: 'Most traditions picture ultimate power as a king or a father. This one looked at raw, world-saving strength and called it Mother. That choice says a lot about what strength is for.', next: 'shelter' },
        ],
      },
      shelter: {
        id: 'shelter',
        krishna: [
          'So Durga is what the tradition reaches for when things are truly threatening, not a distant judge but a mother who rides straight into the fight for her own, fierce precisely because she loves.',
          'And she points at something about your own strength: the worth of any power you have is in what it protects. Fury with nothing to guard is just wreckage. Hers always has someone behind it.',
        ],
        practice: 'This week, think of one person or thing you’d protect without hesitation, and let that sharpen your sense of your own strength. Do one concrete thing to guard or support them. Notice how different strength feels when it’s in service of something you love.',
        end: true,
      },
    },
  },

  'deity:ganesha': {
    id: 'dlg:deity-ganesha',
    start: 'first',
    nodes: {
      first: {
        id: 'first',
        krishna: ['**Ganesha** is the one Hindus call on before almost anything new, a wedding, a business, a journey, even the first page of a book. Elephant head, big belly, riding a tiny mouse. Why do you think he gets called first, before every fresh start?'],
        choices: [
          { text: 'He removes obstacles?', reply: 'Exactly, that’s his whole job. But there’s a beautiful story in how he got that elephant head, and it says why he’s the god of beginnings. Let me tell it.', next: 'remade' },
          { text: 'Not sure', reply: 'He’s the remover of obstacles, greeted first so the path ahead clears. And how he came to look the way he does is the heart of it. Here’s the story.', next: 'remade' },
          { text: 'The elephant thing is odd', reply: 'It is, and it’s the best part. That head came through a loss and a second chance, which is exactly why he guards beginnings. Watch.', next: 'remade' },
        ],
      },
      remade: {
        id: 'remade',
        krishna: [
          'Parvati shaped a boy from turmeric to guard her door. Shiva came home, didn’t know him, and in a flash of temper struck off his head. When he saw Parvati’s grief, he brought the boy back to life with the head of the first creature nearby, an elephant.',
          'So the god you greet at every beginning began with a loss and a remaking. He knows, in his own body, that a start can come straight out of a break. That’s part of why he’s so reassuring at the threshold of anything new.',
        ],
        citation: 'Ganesha’s origin: Shiva Purana, Rudra Samhita, Kumara Khanda.',
        choices: [
          { text: 'That cleverness beats speed', reply: 'Partly. But look closer: asked to race around the world, he skipped the obvious sprint and circled his parents, saying “you are my world.” He won by seeing what actually mattered. That kind of clear sight is how obstacles dissolve.', next: 'remove' },
          { text: 'Something about wisdom?', reply: 'Yes. In the famous race, his athletic brother sprinted off around the earth; Ganesha just circled his parents, “you are my world,” and won. His gift is seeing what’s really there, which is how most obstacles actually clear.', next: 'remove' },
        ],
      },
      remove: {
        id: 'remove',
        krishna: [
          'That’s the quiet truth about Ganesha. Most of what blocks us isn’t a wall out in the world. It’s a misunderstanding, a wrong assumption, running the wrong race. He clears the way by helping you see clearly, and then the path opens on its own.',
          'So calling on him first is less superstition than a small ritual of pausing before you begin, to ask: do I actually see this situation as it is?',
        ],
        practice: 'Before you start something new this week, take one Ganesha pause. Ask, honestly: what’s the real obstacle here, and is it out in the world or in how I’m seeing it? Name it plainly before you begin. Half the time, naming it is most of the way to clearing it.',
        end: true,
      },
    },
  },
};
