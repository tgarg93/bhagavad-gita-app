# Foundations (Jigyasu) — narration script

The full spoken text for all 8 parts of the Jigyasu course, written for the ear.
Every card is recorded as **its own clip**, named for the card's section id
(`f-name-river` → `f-name-river.mp3`). This mirrors `scripts/generate-foundations-audio.mjs`
and `src/data/foundationsAudioManifest.ts`, which key one MP3 per section id.

**How to use this**
- Each `**`f-…​.mp3`**` heading below is one file; the blockquote under it is the
  exact narration for that clip. Record each block as its own file.
- Every clip reads the card's **takeaway headline first, then its body** — verbatim
  with what's on screen, in the card's reading order, so the sentence-by-sentence
  highlight lines up during read-along.
- Sanskrit is spelled **phonetically** (Sanatana Dharma, not सनातन धर्म; ishta-devata,
  not इष्टदेवता) so the voice pronounces it instead of stumbling. Numbers are spelled
  out (seven hundred, not 700) for the same reason. If any term still sounds off,
  tweak its spelling here — that's faster than changing voices.
- The Sanskrit key-verses shown on screen are **not** narrated; only the takeaway and
  the body prose are.
- Whole module ≈ 3,000 words across 32 card clips ≈ 20–22 minutes at a calm pace.

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
text is updated.

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

## Part 2 — What Makes Someone Hindu

**Recorded one clip per card** — the four blocks below, takeaway first then body.

**`f-thread-practice.mp3`**
> What holds it together is not a belief. It is what you do. There is no creed to sign, no conversion moment, no belief that gets you thrown out. A Hindu may hold that God is one, or many, or everything, or an entirely open question — and remain a Hindu in perfectly good standing. Practice is the membership. This is the hinge the whole tradition turns on.

**`f-thread-compare.mp3`**
> Judaism, Christianity and Islam ask what you believe. This one asks what you do. Set them side by side and the real difference is not the number of gods. Those three turn on a founder, a book, a confession, and a judgement at the end. Judaism comes closest — it too is a practice and a people more than a creed — but it still has Sinai, a covenant, and one God. Hinduism has none of those. And instead of ending, it goes round.

**`f-thread-streams.mp3`**
> Held together by practice rather than creed, it could branch without ever breaking. There was no council to expel anyone, so nobody was expelled. Vaishnavas centre Vishnu — and so Rama and Krishna. Shaivas centre Shiva. Shaktas centre the Goddess. Smartas keep several at once and treat them as faces of one thing. Most Hindus never announce which they are — the shrine at home simply tells you.

**`f-thread-ishta.mp3`**
> And nobody hands you a branch. You choose the face you love. Your ishta-devata is your chosen deity. A grandmother keeps Krishna, her son keeps Shiva, her granddaughter keeps Durga, all under one roof, and nothing is wrong. That is not the system straining to accommodate them. That is the system working exactly as designed.

---

## Part 3 — Core Beliefs

**Recorded one clip per card** — the six blocks below, takeaway first then body.

**`f-claim-brahman.mp3`**
> Behind every face there is one reality. It is called Brahman. All four branches are reaching for this. Not a god sitting somewhere, watching — the ground of everything that is: awareness itself, without edges and without a face. Every deity you are about to meet is a face put on this, so that a human being has something to love.

**`f-claim-atman.mp3`**
> And the same reality is what is looking out of you. That is atman. Turn the telescope around. Notice that you can watch your own thoughts arrive — whatever is doing the watching is atman. Not the body, which changes. Not the mood, which passes. The witness that has been there the whole time.

**`f-claim-tat-tvam-asi.mp3`**
> Those two are not two. That is the whole claim. The space inside a clay pot and the space of the sky are not two spaces. The pot has walls; the space does not. Break the pot and nothing is released — there was only ever one space, briefly shaped. You are not near the divine. You are made of it, and have forgotten.

**`f-claim-maya.mp3`**
> So why does it not feel that way? Because the world is misread, not fake. That is maya. "The world is an illusion" is the mistranslation that has done the most damage. A coiled rope at dusk is a rope — and you saw a serpent, and ran. The rope was never unreal. Your reading of it was. Maya is the misreading, not the thing; and the fear it produces is entirely genuine while it lasts.

**`f-claim-prana.mp3`**
> What the misreading hides is a single live current running through all of it: prana. Prana is breath — but not only breath. It is the animating current in a body, a tree, a wind: the tradition's bridge between the physical and the spiritual. It is also the most practical idea here, and the reason nearly every Hindu practice begins at the breath. Steady the breath and you have a handle on the mind.

**`f-claim-gunas.mp3`**
> And everything that current moves through is woven from three strands — the gunas. Sattva: clarity, light, balance. Rajas: heat, drive, restlessness. Tamas: inertia, heaviness, fog. Not good, better and best — and not three types of person. Three threads in every person, every mood, every meal, at shifting ratios. You do not eliminate any of them. You notice which one is currently running you.

---

## Part 4 — Karma & Rebirth

**Recorded one clip per card** — the seven blocks below, takeaway first then body.

**`f-wheel-samsara.mp3`**
> If the witness is what you are, then death changes the clothes, not the wearer. This is samsara — the wheel. Birth, a life, death, birth again. The Gita says the self changes bodies "as a person changes worn-out clothes". It is not a horror and it is not a reward. It is simply how things are — until they are not.

**`f-wheel-karma.mp3`**
> The wheel is steered by what you do — and karma means action, not fate. The word literally means "doing". What you do plants what comes back: cause and effect, running on through lives instead of stopping politely at death. Nobody is sentencing you. Which is why "it's my karma, I can't change it" gets it exactly backwards — karma is precisely the part you can change.

**`f-wheel-dharma.mp3`**
> Which makes the urgent question not "what is the rule?" but "what is mine to do?" That question is dharma. Not ten commandments issued to everyone: a soldier's dharma and a mother's dharma are genuinely different, and both are right. It is why Hindu ethics feels situational to outsiders — it is situational, deliberately, because a rule that fits every life fits no life particularly well.

**`f-wheel-ahimsa.mp3`**
> One answer, though, comes close to universal: cause no harm you do not have to. Ahimsa — literally "non-harming". It is the nearest thing the tradition has to a commandment, and it is a discipline rather than a temperament: harmlessness chosen by someone perfectly capable of doing otherwise. Gandhi built a movement on it. The Jains push it further than any Hindu does.

**`f-wheel-moksha.mp3`**
> And the goal is not heaven. It is getting off the wheel altogether. Moksha — release. Waking up out of the whole round of birth and death, because you finally see what you always were. Heaven, in this system, is just another pleasant place you eventually have to leave. Moksha is the only exit.

**`f-wheel-aims.mp3`**
> Though you are not required to sprint for the exit — pleasure and prosperity are on the list too. The purusharthas, the four proper aims of a human life: dharma, do right; artha, prosper; kama, enjoy, desire, love; and moksha, be free. Look at what made the list. This is not an ascetic religion that grudgingly tolerates the world — it is a world-affirming one that also happens to keep a door open at the back.

**`f-wheel-yogas.mp3`**
> And there are four roads to that door, matched to the kind of person you already are. The yogas. Bhakti if you love. Karma if you would rather work. Jnana if you must reason it through. Raja if you can sit still. None outranks another; they are built for different temperaments. You are not required to become someone else in order to arrive.

---

## Part 5 — The Gods

**Recorded one clip per card** — the four blocks below, takeaway first then body.

**`f-faces-trimurti.mp3`**
> Nobody falls in love with a philosophy — so it grew faces. Start with three. The Trimurti: Brahma makes, Vishnu keeps, Shiva dissolves. Notice what that third job means — destruction here is not evil, it is what makes room. The universe breathes in, and out, and in. Oddly, Brahma the creator is barely worshipped anywhere. Making it, apparently, was the easy part.

**`f-faces-avatar.mp3`**
> One of the three has a habit: when things go badly wrong, Vishnu comes down. An avatara — literally a "crossing-down" into the world. And this single fact untangles half the confusion a beginner has: Rama is Vishnu. Krishna is Vishnu. They are not rival gods competing for your attention. They are the same god, twice, in two different emergencies.

**`f-faces-shakti.mp3`**
> And not one of them can act at all without her. Shakti is the power itself. Shakti means energy, capability, power — and Shiva without her is famously described as inert. She is one goddess with many tempers: Parvati is Durga is Kali — the wife, the warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.

**`f-faces-family.mp3`**
> Six names and their relationships, and any Hindu story becomes readable. Each god paired with a goddess. Vishnu descending as Rama and Krishna. Shiva and Parvati with a son — Ganesha, greeted first, before anything at all begins. And Hanuman, who can do absolutely anything and wants nothing except to serve Rama. That last one is held up as the ideal, which tells you a great deal about what the tradition actually admires.

---

## Part 6 — The Scriptures

**Recorded one clip per card** — the three blocks below, takeaway first then body.

**`f-library-shelves.mp3`**
> There is no one book. There is a library, and it has two shelves. Shruti — "heard" — is the Vedas and, at their end, the Upanishads: received rather than authored, and holding the real authority. Everything in Core Beliefs came from that shelf — Brahman, atman, "you are that". Smriti — "remembered" — is the Gita, the epics, the Puranas: retold, adapted, argued with. The stories everyone actually knows live on the second shelf.

**`f-library-epics.mp3`**
> On that second shelf sit two epics: one man does right at any cost, one family destroys itself. The Ramayana: Rama is exiled, Sita is taken, Hanuman finds her, Ravana falls — a story about holding to your duty when it costs you everything. The Mahabharata: two halves of one family go to war over a throne, and almost everyone loses. Far longer, far murkier, and far more honest about how people actually are.

**`f-library-gita.mp3`**
> And inside the second epic, a soldier puts down his bow and gets a seven-hundred-verse answer. Arjuna sees his own cousins and teachers in the army opposite, and he cannot do it. What his charioteer says next is the Bhagavad Gita — and the charioteer is Krishna, who is Vishnu, as you now know. The most-read text in Hinduism is seven hundred verses of a man being talked out of a breakdown. Which is precisely why it travels.

---

## Part 7 — Rituals & Festivals

**Recorded one clip per card** — the four blocks below, takeaway first then body.

**`f-living-murti.mp3`**
> None of this is a religion you read. It is one you do — beginning with a guest. "Idol" gets the grammar completely wrong. In puja the image is bathed, dressed, fed, sung to, and put to bed — precisely the etiquette you would offer an honoured visitor in your home. The question was never "is the statue God?" The question is: has the guest been welcomed properly?

**`f-living-darshan.mp3`**
> And you go to see the guest, and to be seen by them. Darshan means "sight" — you go to look at the deity, and to be looked at in return. You come home with prasad: food that has already been offered, and tasted, by the god. Worship here is exchange and hospitality, not petition. Nobody is filing a request.

**`f-living-year.mp3`**
> Scale that from one room to one year, and the calendar becomes a story you can read. Diwali: lamps light the road because Rama is coming home. Holi: spring, colour, forgiveness. Navaratri: nine nights of the Goddess. Janmashtami: Krishna, born at midnight, in a prison cell. You know every one of these characters now — which means the whole year has just become legible.

**`f-living-hard.mp3`**
> And two questions have no tidy answer. Saying so is the honest move. Within about ninety seconds of telling anyone you are learning about Hinduism, one of these arrives. First, caste. The old texts describe a fourfold order; what it became — fixed at birth, brutally hierarchical, defended with scripture — is a real and unfinished injustice, and Hindus have fought it from the inside for centuries. Do not defend it. Explain it. Second, beef. The cow is honoured as the one who gives without ever taking; plenty of Hindus eat meat, but most will not eat beef. Here is what to actually say: "It is complicated, and here is how" is the honest answer — and a far better one than a slogan. A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.

---

## Part 8 — Explain It Yourself

Part 8 is the capstone. Its one recorded card is the **recap page**, which replays
every takeaway the reader banked — the same thirty-two lines, in order, that appear
on screen as bullets. Record it as a single file. The closing question that follows
it is the interactive capstone (the reader answers it aloud in their own words); it
is not a recorded card and stays on system narration.

**`f-capstone-recap.mp3`**
> You can say all of this now. Thirty-two sentences, and you arrived with none of them.
>
> Hinduism has no founder, no single book, and nobody in charge. Even the name is not its own. It is a river, mispronounced. The name it gives itself is Sanatana Dharma — the eternal way. An eternal way still has to be carried — so Sanskrit was built to be remembered, not read.
>
> What holds it together is not a belief. It is what you do. Judaism, Christianity and Islam ask what you believe. This one asks what you do. Held together by practice rather than creed, it could branch without ever breaking. And nobody hands you a branch. You choose the face you love.
>
> Behind every face there is one reality. It is called Brahman. And the same reality is what is looking out of you. That is atman. Those two are not two. That is the whole claim. So why does it not feel that way? Because the world is misread, not fake. That is maya. What the misreading hides is a single live current running through all of it: prana. And everything that current moves through is woven from three strands — the gunas.
>
> If the witness is what you are, then death changes the clothes, not the wearer. The wheel is steered by what you do — and karma means action, not fate. Which makes the urgent question not "what is the rule?" but "what is mine to do?" One answer, though, comes close to universal: cause no harm you do not have to. And the goal is not heaven. It is getting off the wheel altogether. Though you are not required to sprint for the exit — pleasure and prosperity are on the list too. And there are four roads to that door, matched to the kind of person you already are.
>
> Nobody falls in love with a philosophy — so it grew faces. Start with three. One of the three has a habit: when things go badly wrong, Vishnu comes down. And not one of them can act at all without her. Shakti is the power itself. Six names and their relationships, and any Hindu story becomes readable.
>
> There is no one book. There is a library, and it has two shelves. On that second shelf sit two epics: one man does right at any cost, one family destroys itself. And inside the second epic, a soldier puts down his bow and gets a seven-hundred-verse answer.
>
> None of this is a religion you read. It is one you do — beginning with a guest. And you go to see the guest, and to be seen by them. Scale that from one room to one year, and the calendar becomes a story you can read. And two questions have no tidy answer. Saying so is the honest move.

**The capstone question** *(interactive — not a recorded card)*
> A friend asks you, properly, for the first time: "So — what actually is Hinduism?" Tell them. In your own words, the way you would say it out loud. A few sentences is plenty. This is a conversation, not an exam.
