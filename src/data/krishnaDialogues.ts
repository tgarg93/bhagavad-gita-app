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
          'And here’s the part that trips everyone: it’s different for different people. A soldier’s dharma and a mother’s dharma aren’t the same, and both are right. So the real question was never “what’s the rule?” It’s “what’s mine to do, here, as who I am?”',
          'Most of the time that’s quiet and obvious. The trouble starts when two of them pull against each other. Have you ever been stuck between two right things?',
        ],
        choices: [
          { text: 'Yeah, more than once', reply: 'Then you already know the real problem with dharma. It isn’t telling right from wrong. It’s when two things are both right, and only one of them fits the moment.', next: 'arjuna' },
          { text: 'Not that I can think of', reply: 'You will. Everyone hits it eventually. It’s the knot at the center of dharma: not right against wrong, but one right against another.', next: 'arjuna' },
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
          { text: 'Do the harder, less selfish one', reply: 'There’s something to that. Self-interest is usually the thumb on the scale. But harder isn’t always right. Sometimes the loving thing is also the easy thing. This was never about punishing yourself.', next: 'svadharma' },
          { text: 'Honestly, I wouldn’t know', reply: 'Good, because there’s no formula, and anyone who sells you one is lying. What I gave Arjuna wasn’t a rule. It was a question steady enough to stand on.', next: 'svadharma' },
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
        krishna: ['So that’s **dharma**. It isn’t a rulebook you memorize. It’s the honest question underneath a hard choice: what’s actually mine to hold up here? Ask it plainly, and most of the time you already know.'],
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
};
