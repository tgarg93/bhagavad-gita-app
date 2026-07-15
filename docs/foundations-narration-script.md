# Foundations (Jigyasu) — narration script

The full spoken text for all 8 parts of the Jigyasu course, written for the ear.
Every card is recorded as **its own clip**, named for the card's section id
(`f-name-river` → `f-name-river.mp3`). This mirrors `scripts/generate-foundations-audio.mjs`
and `src/data/foundationsAudioManifest.ts`, which key one MP3 per section id.

**How to use this**
- Each `**`f-…​.mp3`**` heading below is one file; the blockquote under it is the
  exact narration for that clip. Record each block as its own file.
- Every clip reads the card's **takeaway headline first, then its body** (including
  any on-screen bullets, read as a spoken list) — verbatim with what's on screen, in
  the card's reading order, so the sentence-by-sentence highlight lines up.
- Sanskrit is spelled **phonetically** (Sanatana Dharma, not सनातन धर्म; ishta-devata,
  not इष्टदेवता) so the voice pronounces it instead of stumbling. Numbers are spelled
  out (seven hundred, not 700) for the same reason. If any term still sounds off,
  tweak its spelling here — that's faster than changing voices.
- The Sanskrit key-verses shown on screen are **not** narrated; only the takeaway and
  the body prose (and bullets) are.
- Whole module ≈ 3,800 words across 32 card clips ≈ 24–26 minutes at a calm pace.

**Pacing & pauses.** ElevenLabs runs sentences together, which is what made the
read feel rushed. Fix it with two levers:
- **`<break time="0.8s" />` tags** — the reliable one. They sit in the text sent to
  the API and are never spoken. Put a break after the takeaway headline (before the
  body) and between paragraphs. Keep each 0.3–1.5s, and only a handful per clip —
  overusing them (or going past ~3s) makes the voice unstable.
- **Punctuation & short sentences** — periods and em-dashes already give small
  pauses; an ellipsis (…) gives a longer, reflective one. The rewrite is
  short-sentenced on purpose, so it paces itself.
- Optional global lever: lower `speed` in the generator from `1.0` to ~`0.92`.

Convention below: `<break time="0.9s" />` after the takeaway, `0.6s` between
paragraphs, `0.4s` between items in a spoken list. Caveat: the read-along highlight
times each sentence by its share of the clip length, so keep breaks ≤ ~1s or the
highlight drifts ahead of the voice.

**The runnable source is `scripts/generate-foundations-audio.mjs`** — its `SCRIPTS`
object holds these exact strings, break tags and all. Re-run it to regenerate. The
blockquotes here mirror it for reading (break tags shown in `code` so they render);
**file names never change** — they're keyed to the permanent section ids, so only the
text is updated. Acts 2–8 below are the teaching-voice rewrite (Jul 2026); extend
`SCRIPTS` from these blocks to regenerate their clips.

---

## Part 1 — What Hinduism Is  *(rewritten — teaching voice, Jul 2026)*

**Recorded one clip per card**, in the card's own reading order: the takeaway
headline first, then the body (including any on-screen bullets, read as a spoken
list). This matches what's on screen so the sentence highlight lines up. Record each
of the four blocks below as its own file.

**`f-name-no-founder.mp3`**
> Hinduism has no founder, no single book, and no one in charge. `<break time="0.9s" />` Let's start with what Hinduism is not. Think of Christianity (Jesus), Islam (Muhammad), or Buddhism (the Buddha) — each has a founder you can name. `<break time="0.6s" />` Hinduism has none. Nobody started it. Instead, many local traditions grew up side by side across India over more than three thousand years. Only much later were they gathered under one name — mostly by outsiders, to keep things simple. `<break time="0.6s" />` So what you're left with is: no founder, no single person who began it; `<break time="0.4s" />` no one holy book, a whole library instead; `<break time="0.4s" />` and no central authority — nobody decides what counts as correct.

**`f-name-river.mp3`**
> Even the name isn't its own — it's a river, mispronounced. `<break time="0.9s" />` So where did the word Hindu even come from? Not from Hindus. It began as the name of a river. `<break time="0.6s" />` In Sanskrit, the great river to the northwest was called the Sindhu. Persians living west of it couldn't pronounce the S and said Hindu instead — they just meant the people over there, past the river. Later, the Greeks dropped the H too. `<break time="0.6s" />` That single river-name became three words we still use: Hindu, India, and Indus. For most of history, Hindu pointed to a place — not a religion.

**`f-name-sanatana.mp3`**
> The name it gives itself is Sanatana Dharma — the eternal way. `<break time="0.9s" />` If outsiders supplied the word Hindu, what do followers call it themselves? Sanatana Dharma — usually translated as the eternal way. `<break time="0.6s" />` The idea behind the name: this isn't a club you sign up for. It's more like a natural order that was always here and always will be — something you wake up to and live by, not something you join. `<break time="0.6s" />` That's also why there's no founder. Nobody invents the sunrise; you just notice it.

**`f-name-sanskrit.mp3`**
> An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. `<break time="0.9s" />` But it still had to be passed down somehow. For centuries there was no book to keep it in — writing wasn't used for it yet. `<break time="0.6s" />` So how did it survive? People memorized it, word for word, and recited it aloud — one generation teaching the next. The language they used is Sanskrit — Samskrita, meaning put together properly. `<break time="0.6s" />` It was practically built for the ear: exact rhythm, so a wrong word breaks the beat; `<break time="0.4s" />` exact pitch, fixed for every syllable; `<break time="0.4s" />` and repetition woven in as a backup. `<break time="0.6s" />` The result: two reciters a thousand miles apart would land on the very same syllable. These spoken texts are the Vedas — chanted for centuries before anyone finally wrote them down.

---

## Part 2 — What Makes Someone Hindu  *(rewritten — teaching voice, Jul 2026)*

**`f-thread-practice.mp3`**
> What makes someone Hindu isn't a belief — it's what they practise. `<break time="0.9s" />` If there's no founder, no single book, and no one in charge, what makes someone a Hindu at all? `<break time="0.6s" />` Here's the surprising part: it isn't what they believe. There's no creed to sign and no moment of conversion. A Hindu can hold that God is one, or many, or everything, or an open question — and still be a Hindu in good standing, with nobody calling them a heretic. `<break time="0.6s" />` What holds it all together is practice — how you live, what you do at the shrine, how you mark the year. Practice is the membership. That single idea is the hinge the whole tradition turns on.

**`f-thread-compare.mp3`**
> Judaism, Christianity, and Islam ask what you believe; Hinduism asks what you do. `<break time="0.9s" />` Line Hinduism up against Judaism, Christianity, and Islam, and the real difference isn't the number of gods. `<break time="0.6s" />` Each of those three turns on a founder, a single book, a confession of faith, and a judgement at the end of time. Judaism comes closest to Hinduism — it too is a practice and a people more than a set of beliefs — but it still has Sinai, a covenant, and one God. `<break time="0.6s" />` Hinduism has none of those fixed anchors. And instead of ending in one final judgement, it pictures time as a wheel that keeps turning.

**`f-thread-streams.mp3`**
> Because practice holds it together, Hinduism could branch into four streams without ever splitting. `<break time="0.9s" />` If no one polices belief, you might expect Hinduism to have split into rival churches, the way Christianity did. It never did. `<break time="0.6s" />` There was no council with the power to expel anyone, so nobody was expelled. It simply branched — into four broad streams, each centred on a different face of the divine. Most Hindus never announce which one they belong to; the shrine at home quietly shows you. `<break time="0.6s" />` Vaishnavas centre on Vishnu — and so on Rama and Krishna. `<break time="0.4s" />` Shaivas centre on Shiva. `<break time="0.4s" />` Shaktas centre on the Goddess, Devi. `<break time="0.4s" />` Smartas keep several at once, treating them as faces of one reality.

**`f-thread-ishta.mp3`**
> Nobody assigns you a god — you choose the one you love. That is your ishta-devata. `<break time="0.9s" />` So which stream are you? In Hinduism, nobody hands you the answer. `<break time="0.6s" />` Your ishta-devata is your chosen deity — the form of the divine you feel closest to. You pick it, and your worship reaches the one reality through that face. `<break time="0.6s" />` A grandmother keeps Krishna, her son keeps Shiva, her granddaughter keeps Durga — all under one roof, and nothing is wrong. That isn't the system straining to cope. That is the system working exactly as designed.

---

## Part 3 — Core Beliefs  *(rewritten — teaching voice, Jul 2026)*

**`f-claim-brahman.mp3`**
> Behind every god and every form is a single reality. It is called Brahman. `<break time="0.9s" />` So what is behind all those faces? The four streams are all reaching for the same thing. `<break time="0.6s" />` They call it Brahman — not a god sitting somewhere watching you, but the ground of everything that is: pure awareness, without edges and without a face. `<break time="0.6s" />` Every deity you're about to meet is a face placed on Brahman, so that a human being has something to love and hold onto. The formless is hard to pray to; a face is not.

**`f-claim-atman.mp3`**
> The same one reality is also what looks out from inside you — your true self, atman. `<break time="0.9s" />` Now turn the telescope around, from the whole universe to you. `<break time="0.6s" />` Notice that you can watch your own thoughts arrive and pass. Whatever is doing the watching — the awareness behind your eyes — is atman, your true self. `<break time="0.6s" />` It isn't the body, which changes with age. It isn't your mood, which comes and goes. Atman is the witness that has been there the whole time, unchanged since you were a child.

**`f-claim-tat-tvam-asi.mp3`**
> Brahman and atman are not two things — they are one. That is the whole claim. `<break time="0.9s" />` Here is the turn the whole tradition is built on: Brahman, the one reality, and atman, your deepest self, are not two things. They are one and the same. `<break time="0.6s" />` Picture a clay pot sitting out in the open air. The space inside the pot and the vast space of the sky look separate, but they aren't. The pot has walls; the space doesn't. Break the pot and nothing is released, because there was only ever one space, briefly shaped. `<break time="0.6s" />` You are the space inside the pot. You are not standing near the divine — you are made of it, and have simply forgotten.

**`f-claim-maya.mp3`**
> Why doesn't oneness feel true? Because the world is misread, not unreal — that misreading is maya. `<break time="0.9s" />` If you really are one with everything, why doesn't it feel that way? The answer is maya. `<break time="0.6s" />` The idea that maya means the world is an illusion is the mistranslation that has done the most damage. Maya isn't fake. It is misreading — seeing something as what it isn't. `<break time="0.6s" />` Picture a coiled rope on the ground at dusk. You see a snake, your heart pounds, and you run. The rope was never unreal — your reading of it was. That is maya: the misreading, not the thing. And notice: the fear it gave you was completely real while it lasted.

**`f-claim-prana.mp3`**
> One living current runs through all of it — breath, body, wind. It is called prana. `<break time="0.9s" />` Behind the misreading, one living current runs through everything. It is called prana. `<break time="0.6s" />` Prana means breath — but not only breath. It is the animating energy in a body, a tree, a gust of wind: the tradition's bridge between the physical and the spiritual, the life that moves. `<break time="0.6s" />` It is also the most practical idea in this whole part. It is why nearly every Hindu practice — yoga, meditation, chanting — begins at the breath. Steady the breath, and you have a handle on the mind.

**`f-claim-gunas.mp3`**
> Everything nature makes is woven from three strands — the three gunas. `<break time="0.9s" />` Everything that current flows through — every person, every mood, every moment — is woven from three strands, called the gunas. `<break time="0.6s" />` They aren't three types of person, and they aren't good, better, and best. All three run in everyone at once; only the ratio shifts through the day. The work isn't to erase any of them — it is to notice which one is running you right now. `<break time="0.6s" />` Sattva — clarity, lightness, balance. `<break time="0.4s" />` Rajas — heat, drive, restlessness. `<break time="0.4s" />` Tamas — inertia, heaviness, fog.

---

## Part 4 — Karma & Rebirth  *(rewritten — teaching voice, Jul 2026)*

**`f-wheel-samsara.mp3`**
> If the witness is what you truly are, death changes the clothes, not the wearer. `<break time="0.9s" />` So what happens when the body dies? If atman, the witness, is what you really are, then death isn't the end of you. It is a change of clothes. `<break time="0.6s" />` This endless round is called samsara, the wheel: birth, a life, death, and birth again. The Gita puts it exactly this way — the self changes bodies as a person changes worn-out clothes. `<break time="0.6s" />` Samsara isn't a horror, and it isn't a reward. It is simply how things are — turning on and on, until one day they don't.

**`f-wheel-karma.mp3`**
> What steers the wheel is what you do. Karma means action, not fate. `<break time="0.9s" />` So what steers the wheel — what shapes the next life? Not a judge. Karma does. `<break time="0.6s" />` The word karma literally means action, or doing. What you do plants what comes back to you: cause and effect, carried on through lives instead of stopping politely at death. Nobody is sentencing you; you are planting seeds. `<break time="0.6s" />` That is why "it's my karma, I can't change it" gets it exactly backwards. Karma is your own action — so it is precisely the part you can change.

**`f-wheel-dharma.mp3`**
> The real question isn't "what is the rule?" but "what is mine to do?" That is dharma. `<break time="0.9s" />` If you can change your karma by acting well, the next question is obvious: what is the right action? Hinduism gives a surprising answer. `<break time="0.6s" />` The question — what is right for me to do? — is dharma. It isn't ten commandments handed to everyone alike. A soldier's dharma and a mother's dharma are genuinely different, and both are right. `<break time="0.6s" />` This is why Hindu ethics can feel situational to outsiders. It is situational, on purpose — because a single rule that fits every life ends up fitting no life particularly well.

**`f-wheel-ahimsa.mp3`**
> One duty comes close to universal: cause no harm you don't have to. That is ahimsa. `<break time="0.9s" />` If duty depends on who you are, is anything close to a universal rule? One thing comes closest: ahimsa. `<break time="0.6s" />` Ahimsa means literally non-harming — causing no harm you don't have to. It is the nearest thing the tradition has to a commandment. `<break time="0.6s" />` And it is a discipline, not a mood: harmlessness deliberately chosen by someone perfectly capable of doing otherwise. Gandhi built a freedom movement on it. The Jains carry it further than any Hindu does.

**`f-wheel-moksha.mp3`**
> The goal is not heaven. It is getting off the wheel altogether — moksha. `<break time="0.9s" />` So where does it all lead — what is the point of the turning wheel? Not heaven. The goal is moksha: getting off the wheel entirely. `<break time="0.6s" />` Moksha means release. It is waking up out of the whole round of birth and death, because you finally see what you always were — that space inside the pot, one with everything. `<break time="0.6s" />` Even heaven, in this system, is just another pleasant place you eventually have to leave. Moksha is the only real exit.

**`f-wheel-aims.mp3`**
> You are not required to sprint for the exit — pleasure and prosperity are proper goals too. `<break time="0.9s" />` You might expect the goal to be renouncing everything and racing for moksha. It isn't. `<break time="0.6s" />` Hinduism names four proper aims of a human life — the purusharthas. Look at what made the list: this is not an ascetic religion that grudgingly tolerates the world. It is a world-affirming one that simply keeps an exit door open at the back. `<break time="0.6s" />` Dharma — to live rightly. `<break time="0.4s" />` Artha — to prosper, to build and provide for others. `<break time="0.4s" />` Kama — to enjoy: desire, pleasure, love, beauty. `<break time="0.4s" />` Moksha — to be free of the whole cycle.

**`f-wheel-yogas.mp3`**
> There are four roads to that exit, each matched to the kind of person you already are. `<break time="0.9s" />` And there isn't just one road to that exit. There are four — called the yogas — and each suits a different kind of person. `<break time="0.6s" />` None outranks the others. You don't have to become someone else to arrive; you simply take the road that fits how you are already built. `<break time="0.6s" />` Bhakti — the path of love and devotion, if your heart leads. `<break time="0.4s" />` Karma yoga — the path of selfless work, if you would rather act than sit. `<break time="0.4s" />` Jnana — the path of knowledge, if you must reason it through. `<break time="0.4s" />` Raja — the path of meditation, if you can sit still.

---

## Part 5 — The Gods  *(rewritten — teaching voice, Jul 2026)*

**`f-faces-trimurti.mp3`**
> Nobody falls in love with a philosophy — so it grew faces. Start with the great three. `<break time="0.9s" />` All that philosophy is true — but nobody falls in love with an abstraction. So Hinduism grew faces: gods you can picture, name, and pray to. Start with the great three, the Trimurti. `<break time="0.6s" />` Brahma creates the universe, Vishnu preserves it, and Shiva dissolves it. Notice what that third job means: destruction here isn't evil — it is what makes room for the next world. The universe breathes in, and out, and in. `<break time="0.6s" />` One oddity: Brahma, the creator, is barely worshipped anywhere today. Making the world, apparently, was the easy part.

**`f-faces-avatar.mp3`**
> When the world goes badly wrong, Vishnu comes down into it. Each descent is an avatar. `<break time="0.9s" />` Of the three, Vishnu the preserver has a particular habit: when the world tips into chaos, he comes down into it, born in a body to set things right. `<break time="0.6s" />` Each of those descents is an avatar — literally a crossing-down into the world. And this one fact clears up half of a beginner's confusion. `<break time="0.6s" />` Rama is Vishnu. Krishna is Vishnu. They aren't rival gods competing for your attention — they are the same god, come down twice, into two different emergencies.

**`f-faces-shakti.mp3`**
> Not one of the gods can act without her. The Goddess is power itself — Shakti. `<break time="0.9s" />` So far the gods have been male. Here is the twist: not one of them can act without her. `<break time="0.6s" />` Shakti means energy, capability, power — the very ability to do anything at all. Shiva without his Shakti is famously pictured as inert, a corpse. She is the force behind every god's action. `<break time="0.6s" />` And she is one Goddess with many tempers: Parvati is Durga is Kali — the gentle wife, the lion-riding warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.

**`f-faces-family.mp3`**
> Learn six names and how they connect, and almost any Hindu story becomes readable. `<break time="0.9s" />` You now have the main cast. The last trick is seeing how they connect — because the relationships are what make the stories readable. The chart shows them laid out; here is the shape of it. `<break time="0.6s" />` Every god is paired with a goddess. Vishnu comes down as Rama and Krishna. Shiva and Parvati have a son — Ganesha, the elephant-headed one, greeted first before anything at all begins. `<break time="0.6s" />` And off to the side stands Hanuman, who can do absolutely anything and wants nothing except to serve Rama. That he is held up as the ideal tells you a great deal about what the tradition actually admires.

---

## Part 6 — The Scriptures  *(rewritten — teaching voice, Jul 2026)*

**`f-library-shelves.mp3`**
> There is no one holy book. There is a library — and it has just two shelves. `<break time="0.9s" />` So where are all these gods and ideas actually written down? There is no single Bible. There is a whole library — but knowing its two shelves is most of what a beginner needs. `<break time="0.6s" />` The top shelf is shruti, meaning heard. It holds the Vedas and, at their end, the Upanishads — received rather than authored, and carrying the real authority. Everything back in Core Beliefs came from this shelf: Brahman, atman, you are that. `<break time="0.6s" />` The bottom shelf is smriti, meaning remembered — the Gita, the two epics, the Puranas: retold, adapted, and argued with over centuries. The stories everyone actually knows live on this second shelf.

**`f-library-epics.mp3`**
> Two great epics sit on that second shelf: one man does right at any cost; one family destroys itself. `<break time="0.9s" />` Two great epics sit on that second shelf, and between them they hold most of the stories you will ever hear. `<break time="0.6s" />` The Ramayana is the tidy one. Rama is exiled, his wife Sita is stolen by the demon king Ravana, Hanuman finds her, and Ravana falls. At heart it is a story about holding to your duty even when it costs you everything. `<break time="0.6s" />` The Mahabharata is the messy one. Two halves of one family go to war over a throne, and almost everyone loses. It is far longer, far murkier, and far more honest about how people actually are.

**`f-library-gita.mp3`**
> Inside that messy epic, a soldier lays down his bow — and gets a seven-hundred-verse answer. `<break time="0.9s" />` Buried inside the Mahabharata is its most famous moment. On the eve of battle, a warrior named Arjuna looks across the field, sees his own cousins, teachers, and friends in the enemy army — and simply cannot do it. He lays down his bow. `<break time="0.6s" />` What his charioteer says next, to talk him through it, is the Bhagavad Gita. And the charioteer is Krishna — who is Vishnu, as you now know. `<break time="0.6s" />` So the most-read text in all of Hinduism is seven hundred verses of a man being gently talked out of a breakdown. That is precisely why it travels: everyone, sooner or later, freezes at a choice like Arjuna's.

---

## Part 7 — Rituals & Festivals  *(rewritten — teaching voice, Jul 2026)*

**`f-living-murti.mp3`**
> None of this is a religion you read. It is one you do — starting by welcoming a guest. `<break time="0.9s" />` Remember the very first idea: Hinduism is something you do, not something you sign up to believe. So what does the doing look like? It begins in front of a murti — the sculpted image of a god. `<break time="0.6s" />` Calling a murti an idol gets the grammar completely wrong. In puja, worship, the image is bathed, dressed, fed, sung to, and put to bed at night — exactly the etiquette you would offer an honoured guest in your home. `<break time="0.6s" />` So the question was never, is the statue God? The real question is warmer and simpler: has the guest been welcomed properly?

**`f-living-darshan.mp3`**
> You go to the temple to see the god — and to be seen by them. That is darshan. `<break time="0.9s" />` So why go to a temple at all? Not mainly to ask for things. You go for darshan. `<break time="0.6s" />` Darshan means seeing. You go to look at the deity — and, just as much, to be looked at in return. The meeting runs both ways. `<break time="0.6s" />` You come home carrying prasad: food that has first been offered to the god and tasted by them, then handed back to you. Worship here is exchange and hospitality, not petition. Nobody is filing a request.

**`f-living-year.mp3`**
> Scale that hospitality from one room to a whole year, and the calendar becomes a story you can read. `<break time="0.9s" />` Now scale that welcome up from a single room to a whole year. The Hindu calendar is packed with festivals — and because you now know the characters, each one has turned into a sentence you can read. `<break time="0.6s" />` Diwali — lamps light the road home because Rama is returning from exile. `<break time="0.4s" />` Holi — spring, colour thrown in the streets, and old grudges forgiven. `<break time="0.4s" />` Navaratri — nine nights for the Goddess, in all her forms. `<break time="0.4s" />` Janmashtami — Krishna, born at midnight in a prison cell.

**`f-living-hard.mp3`**
> Two questions have no tidy answer. Saying so honestly is the right move. `<break time="0.9s" />` One honest warning before you go. Within about ninety seconds of telling someone you are learning about Hinduism, one of two hard questions tends to arrive. Neither has a tidy answer, and pretending otherwise helps no one. `<break time="0.6s" />` Caste. The old texts describe a fourfold ordering of society. What it hardened into — fixed at birth, brutally hierarchical, defended with scripture — is a real and unfinished injustice, one that many Hindus have fought from the inside for centuries. Don't defend it. Explain it. `<break time="0.6s" />` Beef. The cow is honoured as the animal that gives, in milk, without ever taking. Plenty of Hindus eat meat; most will not eat beef. `<break time="0.6s" />` Here is what to actually say. "It is complicated, and here is how" is the honest answer — and a far better one than any slogan. A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.

---

## Part 8 — Explain It Yourself

Part 8 is the capstone. Its one recorded card is the **recap page**, which replays
every takeaway the reader banked — the same thirty-two lines, in order, that appear
on screen as bullets. Record it as a single file. The closing question that follows
it is the interactive capstone (the reader answers it aloud in their own words); it
is not a recorded card and stays on system narration.

**`f-capstone-recap.mp3`**
> You can say all of this now. Thirty-two sentences, and you arrived with none of them. `<break time="0.9s" />`
>
> Hinduism has no founder, no single book, and no one in charge. Even the name isn't its own — it's a river, mispronounced. The name it gives itself is Sanatana Dharma — the eternal way. An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. `<break time="0.6s" />`
>
> What makes someone Hindu isn't a belief — it's what they practise. Judaism, Christianity, and Islam ask what you believe; Hinduism asks what you do. Because practice holds it together, Hinduism could branch into four streams without ever splitting. Nobody assigns you a god — you choose the one you love. `<break time="0.6s" />`
>
> Behind every god and every form is a single reality: Brahman. The same one reality is also what looks out from inside you — atman. Brahman and atman are not two things; they are one. The world only seems separate because it is misread, not unreal — that misreading is maya. One living current runs through all of it: prana. And everything nature makes is woven from three strands — the gunas. `<break time="0.6s" />`
>
> If the witness is what you truly are, death changes the clothes, not the wearer. What steers the wheel is what you do: karma means action, not fate. The real question isn't what is the rule, but what is mine to do — that is dharma. One duty comes close to universal: cause no harm you don't have to, ahimsa. The goal is not heaven; it is getting off the wheel altogether, moksha. You are not required to sprint for the exit — pleasure and prosperity are proper goals too. And there are four roads to that exit, matched to the kind of person you already are. `<break time="0.6s" />`
>
> Nobody falls in love with a philosophy — so it grew faces. Start with the great three. When the world goes badly wrong, Vishnu comes down into it as an avatar. Not one of the gods can act without her — the Goddess is power itself, Shakti. Learn six names and how they connect, and almost any Hindu story becomes readable. `<break time="0.6s" />`
>
> There is no one holy book — there is a library, and it has just two shelves. Two great epics sit on the second shelf: one man does right at any cost; one family destroys itself. And inside that messy epic, a soldier lays down his bow and gets a seven-hundred-verse answer. `<break time="0.6s" />`
>
> None of this is a religion you read — it is one you do, starting by welcoming a guest. You go to the temple to see the god, and to be seen by them: darshan. Scale that hospitality across a year, and the whole calendar becomes a story you can read. And two questions have no tidy answer — saying so honestly is the right move.

**The capstone question** *(interactive — not a recorded card)*
> A friend asks you, properly, for the first time: "So — what actually is Hinduism?" Tell them. In your own words, the way you would say it out loud. A few sentences is plenty. This is a conversation, not an exam.
