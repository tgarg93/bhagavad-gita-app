# Foundations (Jigyasu) — narration script (ElevenLabs v3)

The full spoken text for all 8 parts of the Jigyasu course, formatted for **eleven_v3**.
Every card is recorded as **its own clip**, named for the card's section id
(`f-name-river` → `f-name-river.mp3`), keyed one MP3 per section id in
`scripts/generate-foundations-audio.mjs` and `src/data/foundationsAudioManifest.ts`.

## How to record (v3)

- **Model:** `eleven_v3`. **Voice:** Oliver. **Stability:** *Natural* (default) — bump to
  *Creative* for the dramatic clips (tat-tvam-asi, Shakti, the Gita). *Robust* is flat, like v2.
- **Pronunciation → IPA.** Sanskrit/Hindi terms are written as **IPA inside `"/…/"`** — v3's
  method (phoneme/SSML tags do **not** work in v3). See the key below. Only keyed terms are
  wrapped; each occurrence keeps its IPA.
- **Pacing → no `<break>` tags.** v3 ignores them. Pauses come from **ellipses `…`**,
  **`[short pause]` / `[long pause]`**, and **line breaks** (the takeaway is its own line,
  the body follows).
- **Intonation → audio tags.** Bracketed tags set delivery: `[thoughtful]`, `[warmly]`,
  `[curious]`, `[reassuring]`, `[cautiously]`, and for the big beats `[dramatically]`,
  `[whispers]`. Default is a **warm teacher**; a handful of clips lean dramatic. Keep it to a
  few tags per clip — overusing them makes v3 unstable.
- Highlight still maps by **sentence** to the on-screen card, so the IPA/tags in the recording
  don't break read-along.

## IPA key (validate/tweak by ear)

**Concepts:** Brahman `/ˈbrɑːmən/` · atman `/ˈɑːtmən/` · Sanatana Dharma **suh-NAA-tuh-nuh DHUR-muh** *(phonetic — IPA underperformed here)* ·
dharma `/ˈdɑːrmə/` · karma `/ˈkɑːrmə/` · moksha `/ˈmoʊkʃə/` · maya **Maaya** *(phonetic — the IPA `/ˈmɑːjɑː/` read badly)* · prana `/ˈprɑːnə/` ·
gunas `/ˈɡuːnɑːs/` · sattva `/ˈsɑːtvə/` · rajas `/ˈrɑːdʒəs/` · tamas `/ˈtɑːməs/` · samsara `/səmˈsɑːrə/` ·
ahimsa `/əˈhɪmsɑː/` · purusharthas `/ˌpʊrʊˈʃɑːrtəs/` · artha `/ˈɑːrtə/` · kama `/ˈkɑːmə/` ·
ishta-devata `/ˈɪʃtə ˈdeɪvətɑː/` · jnana `/ˈɡjɑːnə/` · bhakti `/ˈbʌkti/` · raja `/ˈrɑːdʒə/` ·
Trimurti `/trɪˈmuːrti/` · avatar `/ˈɑːvətɑːr/` · Shakti `/ˈʃʌkti/` · shruti `/ˈʃruːti/` · smriti `/ˈsmrɪti/` ·
murti `/ˈmuːrti/` · puja `/ˈpuːdʒɑː/` · prasad `/prəˈsɑːd/` · darshan `/ˈdɑːrʃən/` · Samskrita `/ˈsʌmskrɪtə/` ·
tat tvam asi `/tʌt tvʌm ˈʌsi/` · triguna **tree-GOO-nuh** *(phonetic)* · mrigatrishna **mrig-uh-TRISH-naa** *(phonetic)* ·
namaste `/ˌnʌməsˈteɪ/` · himsa **HIM-saa** *(phonetic)* · shodasha upachara **SHOH-duh-shuh oo-puh-CHAA-ruh** *(phonetic)* ·
Vedas `/ˈveɪdəz/` · Upanishads `/uːˈpʌnɪʃədz/` · Puranas `/pʊˈrɑːnəz/` · Sindhu `/ˈsɪnduː/`

**Deities / nouns:** Shiva `/ˈʃɪvə/` · Vishnu `/ˈvɪʃnuː/` · Brahma `/ˈbrɑːmɑː/` · Krishna `/ˈkrɪʃnə/` ·
Rama `/ˈrɑːmə/` · Ganesha `/ɡəˈneɪʃə/` · Hanuman `/ˈhənʊmɑːn/` · Parvati `/ˈpɑːrvəti/` · Durga `/ˈdʊrɡɑː/` ·
Kali `/ˈkɑːli/` · Sita `/ˈsiːtɑː/` · Ravana `/ˈrɑːvənə/` · Arjuna `/ˈɑːrdʒʊnə/` · Devi `/ˈdeɪvi/` ·
Uddalaka **ood-DAA-luh-kuh** · Shvetaketu **shvay-tuh-KAY-too** · Chandogya **chaan-DOHG-yuh** · Mundaka **MOON-duh-kuh** ·
Lakshmi **LUCK-shmee** · Bhishma **BHEESH-muh** · Drona **DROH-nuh** · Bharata **BAH-ruh-tuh** *(all phonetic)* ·
Vaishnava `/ˈvaɪʃnəvə/` · Shaiva `/ˈʃaɪvə/` · Shakta `/ˈʃɑːktə/` · Smarta `/ˈsmɑːrtə/`

**Texts / festivals:** Mahabharata `/ˌmɑːhɑːˈbɑːrətə/` · Ramayana `/rɑːˈmɑːjənə/` ·
Bhagavad Gita `/ˈbɑːɡəvəd ˈɡiːtɑː/` · Gita `/ˈɡiːtɑː/` · Diwali `/dɪˈvɑːli/` · Holi `/ˈhoʊli/` ·
Navaratri `/ˌnʌvəˈrɑːtri/` · Janmashtami `/dʒənˈmɑːʃtəmi/`

(Common English-adopted words — yoga, guru, Sanskrit — are left plain; the voice handles them.)

## ⚠️ Pending re-record

- *(resolved July 2026)* The **maya** IPA issue: all Part 3–7 clips and **`f-capstone-recap.mp3`**
  were regenerated with the **Maaya** respelling in the depth-rework re-record. Parts 1–2 keep
  their original takes (their text did not change).

---

## Part 1 — What Hinduism Is

**`f-name-no-founder.mp3`**
> [thoughtful] Hinduism has no founder… no single book… and no one in charge.
>
> Let's start with what Hinduism is not. Think of Christianity, with Jesus… Islam, with Muhammad… Buddhism, with the Buddha — each has a founder you can name.
>
> Hinduism has none. Nobody started it. Instead, many local traditions grew up side by side across India over more than three thousand years… and only much later were they gathered under one name — mostly by outsiders, to keep things simple.
>
> [warmly] So what you're left with is this: no founder — no single person who began it… no one holy book — a whole library instead… and no central authority. Nobody decides what counts as correct.

**`f-name-river.mp3`**
> [curious] Even the name isn't its own… it's a river, mispronounced.
>
> So where did the word Hindu even come from? Not from Hindus. It began as the name of a river.
>
> In Sanskrit, the great river to the northwest was called the "/ˈsɪnduː/". Persians living west of it couldn't manage the S, and said Hindu instead — they just meant "the people over there," past the river. Later, the Greeks dropped the H too.
>
> [warmly] That single river-name became three words we still use: Hindu… India… and Indus. For most of history, Hindu pointed to a place — not a religion.

**`f-name-sanatana.mp3`**
> The name it gives itself is suh-NAA-tuh-nuh DHUR-muh — the eternal way. [short pause]
>
> If outsiders supplied the word Hindu, what do followers call it themselves? suh-NAA-tuh-nuh DHUR-muh — usually translated as "the eternal way."
>
> The idea behind the name: this isn't a club you sign up for. It's more like a natural order that was always here, and always will be… something you wake up to, and live by — not something you join.
>
> [warmly] That's also why there's no founder. Nobody invents the sunrise… you just notice it.

**`f-name-sanskrit.mp3`**
> An eternal way still has to be carried — so Sanskrit was built to be remembered, not read. [short pause]
>
> But it still had to be passed down somehow. For centuries there was no book to keep it in — writing wasn't used for it yet.
>
> So how did it survive? People memorized it, word for word, and recited it aloud — one generation teaching the next. The language they used is Sanskrit — "/ˈsʌmskrɪtə/" — meaning "put together properly."
>
> [thoughtful] It was practically built for the ear: exact rhythm, so a wrong word breaks the beat… exact pitch, fixed for every syllable… and repetition, woven in as a backup.
>
> [warmly] The result? Two reciters a thousand miles apart would land on the very same syllable. These spoken texts are the "/ˈveɪdəz/" — chanted for centuries before anyone finally wrote them down.

---

## Part 2 — What Makes Someone Hindu

**`f-thread-practice.mp3`**
> [thoughtful] What makes someone Hindu isn't a belief… it's what they practice. [short pause]
>
> If there's no founder, no single book, and no one in charge — what makes someone a Hindu at all?
>
> Here's the surprising part: it isn't what they believe. There's no creed to sign, and no moment of conversion. A Hindu can hold that God is one… or many… or everything… or an entirely open question — and still be a Hindu in good standing, with nobody calling them a heretic.
>
> [warmly] What holds it all together is practice — how you live, what you do at the shrine, how you mark the year. Practice is the membership. That single idea… is the hinge the whole tradition turns on.

**`f-thread-compare.mp3`**
> Judaism, Christianity, and Islam ask what you believe… Hinduism asks what you do. [short pause]
>
> Line Hinduism up against Judaism, Christianity, and Islam, and the real difference isn't the number of gods.
>
> Each of those three turns on a founder… a single book… a confession of faith… and a judgement, at the end of time. Judaism comes closest to Hinduism — it too is a practice and a people, more than a set of beliefs — but it still has Sinai, a covenant, and one God.
>
> [thoughtful] Hinduism has none of those fixed anchors. And instead of ending in one final judgement… it pictures time as a wheel that keeps turning.

**`f-thread-streams.mp3`**
> [curious] Because practice holds it together, Hinduism could branch into four streams… without ever splitting. [short pause]
>
> If no one polices belief, you might expect Hinduism to have split into rival churches, the way Christianity did. It never did.
>
> There was no council with the power to expel anyone, so nobody was expelled. It simply branched — into four broad streams, each centered on a different face of the divine. Most Hindus never announce which one they belong to… the shrine at home quietly shows you.
>
> "/ˈvaɪʃnəvə/"s center on "/ˈvɪʃnuː/" — and so on "/ˈrɑːmə/" and "/ˈkrɪʃnə/"… "/ˈʃaɪvə/"s center on "/ˈʃɪvə/"… "/ˈʃɑːktə/"s center on the Goddess, "/ˈdeɪvi/"… and "/ˈsmɑːrtə/"s keep several at once, treating them as faces of one reality.

**`f-thread-ishta.mp3`**
> [warmly] Nobody assigns you a god — you choose the one you love. That is your "/ˈɪʃtə ˈdeɪvətɑː/". [short pause]
>
> So which stream are you? In Hinduism… nobody hands you the answer.
>
> Your "/ˈɪʃtə ˈdeɪvətɑː/" is your chosen deity — the form of the divine you feel closest to. You pick it, and your worship reaches the one reality through that face.
>
> A grandmother keeps "/ˈkrɪʃnə/"… her son keeps "/ˈʃɪvə/"… her granddaughter keeps "/ˈdʊrɡɑː/" — all under one roof, and nothing is wrong. [warmly] That isn't the system straining to cope. That is the system… working exactly as designed.

---

## Part 3 — Core Beliefs

**`f-claim-intro.mp3`**
> [warmly] This part is the deep end of the whole tradition, and it is friendlier than it sounds. There are six ideas. We will take them one at a time, and I will check each one off with you as we go.

**`f-claim-brahman.mp3`**
> Behind every god and every form is a single reality. It is called "/ˈbrɑːmən/". [short pause]
> 
> Behind the thousands of gods, is there one thing? Hinduism says yes, and it has a name for it.
> 
> Start with a picture. Imagine the whole universe as one huge ocean. Waves rise and fall on it. Foam gathers and scatters. Drops leap into the air and land again. Every one of those is a shape the water takes for a while, and every one of them is water.
> 
> "/ˈbrɑːmən/" is the ocean. "/ˈbrɑːmən/" is not a god sitting somewhere in the sky, watching you. "/ˈbrɑːmən/" is the single reality that everything is made of, including every person, every object, and every god.
> 
> The oldest scripture Hindus have, the Rig Veda, says it in a single line:
> 
> Truth is one; the wise call it by many names.
> 
> The gods are the many names. Everything you will ever meet is a wave, and "/ˈbrɑːmən/" is the water underneath every one of them.

**`f-claim-term-brahman.mp3`**
> The key word here is "/ˈbrɑːmən/"… meaning: the one reality. [short pause]
> 
> Be careful with two look-alike words. "/ˈbrɑːmɑː/" is a god, one face among many, and you will meet him in Part 5. Brahmin is a social class, a human category.
> 
> "/ˈbrɑːmən/" is neither of those. "/ˈbrɑːmən/" is the one reality that everything is made of, gods included.

**`f-claim-brahman-faces.mp3`**
> The gods are not rivals to the one reality — they are its faces, shaped for human hands. [short pause]
> 
> If there is only one reality, why are there so many gods? The answer is sitting in the room with you.
> 
> One electric current runs through your home. You have never seen it, and you never will. What you see is a lamp, a fan, a kettle. Each one takes the same invisible current and gives it a shape you can actually use.
> 
> The gods work the same way. "/ˈbrɑːmən/" is the current, and each god is a lamp. The one reality is given a form that a person can love, pray to, and hold onto, because the formless is hard to love and a face is not.
> 
> So many gods never meant many truths. It has always been one current, shining through many lamps.

**`f-claim-atman.mp3`**
> The same one reality is also what looks out from inside you — your true self, "/ˈɑːtmən/". [short pause]
> 
> "/ˈbrɑːmən/" is the ocean out there. But what about in here? Who is reading this sentence right now?
> 
> Watch your own mind for a moment. A thought arrives, stays a little while, and leaves. The thoughts keep changing, but the watching of them does not. Your body keeps changing too. And still you say “when I was eight,” and the word I keeps pointing at the same someone.
> 
> Hinduism has a name for that someone. It is "/ˈɑːtmən/", your true self. "/ˈɑːtmən/" is not your thoughts, and it is not your body. "/ˈɑːtmən/" is the one who has been watching them both, the whole time.

**`f-claim-atman-drop.mp3`**
> Take one drop from the ocean: smaller than the sea, yet nothing in it but sea. That is "/ˈɑːtmən/". [short pause]
> 
> So there is "/ˈbrɑːmən/", the ocean, and there is you. How are the two of you related? Go back to the water.
> 
> Take a single drop out of the ocean. The drop is small and the ocean is vast. But look inside the drop. It is the same water, the same salt, the same taste. Nothing in the drop is anything other than ocean.
> 
> "/ˈɑːtmən/" is that drop. Your deepest self is not a fragment that broke off the one reality, and it is not a visitor sent from it. "/ˈɑːtmən/" is "/ˈbrɑːmən/", in a drop-sized shape.
> 
> Hold onto the drop. The next pages give this exact idea its three famous words.

**`f-claim-term-atman.mp3`**
> The key word here is "/ˈɑːtmən/"… meaning: the self… the one who is aware. [short pause]
> 
> Run a quick checklist for this word. Your body changes. Your personality changes. Your moods change by the hour.
> 
> "/ˈɑːtmən/" is what is left when you take away everything that changes. It is the watcher that stays.

**`f-claim-tat-tvam-asi.mp3`**
> [thoughtful] "/ˈbrɑːmən/" and "/ˈɑːtmən/" are not two things — they are one. That is the whole claim. [short pause]
> 
> The drop is ocean. Now say the same thing about yourself. "/ˈbrɑːmən/" is the one reality out there, and "/ˈɑːtmən/" is the watcher in here. The whole tradition turns on what comes next.
> 
> [dramatically] They are not two things. The reality out there and the watcher in here are one and the same. The "/uːˈpʌnɪʃədz/" say it in three Sanskrit words:
> 
> "/tʌt tvʌm ˈʌsi/". [short pause] [warmly] You are that.
> 
> This does not mean you are close to that, and it does not mean a piece of that lives inside you. It is plain identity. The drop is not near the ocean, and it is not on loan from it. The drop simply is water. [warmly] You are that.

**`f-claim-term-tat-tvam-asi.mp3`**
> The key word here is "/tʌt tvʌm ˈʌsi/"… meaning: You are that.. [short pause]
> 
> tat… that: the one reality, "/ˈbrɑːmən/"… 
> tvum… you: the watcher, "/ˈɑːtmən/"… 
> uh-see… are: not “are near,” not “contain.” Are.

**`f-claim-tta-salt.mp3`**
> You cannot find the salt anywhere in the water — and there is nowhere in the water it isn’t. [short pause]
> 
> Where do those three words come from? They come from a father teaching his son, in the chaan-DOHG-yuh "/uːˈpʌnɪʃəd/".
> 
> shvay-tuh-KAY-too comes home at twenty-four, proud of twelve years of schooling. His father, ood-DAA-luh-kuh, asks him one question. “Did they teach you the one thing by which everything is known?” The son does not even understand the question.
> 
> So the father teaches him. “Put this lump of salt in water, and come back in the morning.” In the morning he says, “Bring me the salt.” shvay-tuh-KAY-too reaches into the bowl, and the salt is gone. “Sip from this side. From the middle. From that side.” Salty, salty, salty.
> 
> “You cannot see it, but it is everywhere in the water. The finest essence of everything is like that. And "/tʌt tvʌm ˈʌsi/", shvay-tuh-KAY-too. [whispers] You are that.”

**`f-claim-tta-pot.mp3`**
> Break the pot and nothing is set free — there was only ever one space, briefly shaped. [short pause]
> 
> There is one more picture worth carrying, and this one explains why you feel separate when you are not.
> 
> Picture a clay pot standing in the open air. There is space inside the pot, and there is the great space of the sky. They look like two different spaces, one small and one endless. But look again. The pot has walls. The space never did.
> 
> Now break the pot. Nothing spills out, and nothing is set free, because there was only ever one space. The walls just made it look like two.
> 
> You are the space inside the pot. The body and its story are the walls. The walls are real, but the separateness they suggest is not.

**`f-claim-tta-so-what.mp3`**
> If you are that, so is everyone else — and the tradition built its daily greeting to say so. [short pause]
> 
> If those three words are true, what actually changes? Start with the person across from you.
> 
> The same one reality looks out from behind their eyes too. It is the same sky, sitting in a different pot. Take that seriously about a difficult person for one minute, and notice how much harder it becomes to hold onto contempt.
> 
> Hinduism folded this idea into its everyday hello. "/ˌnʌməsˈteɪ/", said with the palms together and a small bow, is often translated as “the divine in me bows to the divine in you.” That is not poetry invented for yoga studios. It is "/tʌt tvʌm ˈʌsi/", exchanged twice a day, with everyone you meet.
> 
> What you are, everyone else is too. The greeting simply says it out loud.

**`f-claim-maya.mp3`**
> [curious] Why doesn't oneness feel true? Because the world is misread, not unreal — that misreading is Maaya. [short pause]
> 
> Why does the oneness not feel true? The tradition answers with an experience you may know from any long drive on a hot day.
> 
> Far ahead, the road is shining with water. You can see it clearly. But when you reach that spot, the road is dry, and now the water is shining farther ahead.
> 
> The road is real. The light is real. Only the reading was wrong, because there was never any water.
> 
> Sanskrit has a word built on this exact picture. mrig-uh-TRISH-naa means “deer’s thirst,” for the deer that chases that water until it drops. The world is not fake. The mistake is in what you take it to be. That mistake is Maaya.

**`f-claim-maya-teaches.mp3`**
> The shimmer stays even after you know the road is dry. Knowing about Maaya does not switch it off. [short pause]
> 
> “Maaya means the world is an illusion.” You will hear that sentence often, and it is the mistranslation that has done the most damage. The mirage shows what is wrong with it.
> 
> The road was never fake, and the light was never fake. Only your reading of them was false. Maaya works the same way. The world is real. What is false is how you read it, as many separate things, with you as one more separate thing among them, small and apart.
> 
> The road has one more lesson. Even after you know the shimmer is not water, it still looks like water. Knowing about Maaya does not switch it off. That is why oneness can be true and still not feel true, and why the tradition built practices instead of stopping at arguments.
> 
> So Maaya, said plainly, is not a fake world. It is a real one, misread.

**`f-claim-term-maya.mp3`**
> The key word here is Maaya… meaning: the misreading… not the thing. [short pause]
> 
> Test every translation you meet against the mirage. “Illusion” says the road itself is fake. Maaya says the road is real, and that calling it water was your mistake.
> 
> In the same way, the world is the road, and the separateness is the water.

**`f-claim-prana.mp3`**
> One living current runs through all of it — breath, body, wind. It is called "/ˈprɑːnə/". [short pause]
> 
> Set Maaya aside for a moment and feel something instead. Feel your breath. It has been going all day without any help from you.
> 
> Hinduism’s name for the current behind it is "/ˈprɑːnə/". "/ˈprɑːnə/" means breath, but it does not only mean the air. "/ˈprɑːnə/" is the life energy that the breath rides on, the same aliveness that moves in a body, in a tree, and in a gust of wind.
> 
> breath… the life that moves
> 
> Why give it a name at all? Because the breath is the one place where you can actually touch everything this part has been saying. Steady the breath, and the mind steadies with it. That is why nearly every Hindu practice, from yoga to meditation to chanting, begins there.

**`f-claim-prana-try.mp3`**
> The breath is the one current that is both automatic and steerable — that is why every practice starts there. [short pause]
> 
> The fastest proof of "/ˈprɑːnə/" takes about thirty seconds, and you can run it right now.
> 
> First, notice your next breath. Do not change it, just watch it. It arrives on its own and it leaves on its own. You never decided to take it. Something in you is breathing whether you pay attention or not.
> 
> Now change it on purpose. Take one slow breath in, and let out a slower breath. Do that twice, and notice the small drop in your shoulders.
> 
> You have just used the one lever in the body that is both automatic and steerable. The breath is the handle where the body and the mind meet, and in Part 7, every practice you see will pick it up first.

**`f-claim-term-prana.mp3`**
> The key word here is "/ˈprɑːnə/"… meaning: the life-current the breath rides on. [short pause]
> 
> The word is bigger than “breath” and smaller than “soul.” "/ˈprɑːnə/" is the aliveness that moves, in your lungs, in a tree, and in the wind. The breath is simply the place where you can take hold of it.

**`f-claim-gunas.mp3`**
> Everything nature makes is woven from three strands — the three "/ˈɡuːnɑːs/". [short pause]
> 
> Why does the same day feel so different at different hours? You woke up foggy. By noon you were racing. On the evening walk, everything felt clear and light. It was the same you all day, moving through three kinds of weather.
> 
> Hinduism says that every mood, every person, and every thing nature makes is woven from three strands. They are called the "/ˈɡuːnɑːs/", which is simply the Sanskrit word for strands:
> 
> "/ˈsɑːtvə/" — clarity, lightness, balance. The evening-walk feeling.
> "/ˈrɑːdʒəs/" — heat, drive, restlessness. The racing noon.
> "/ˈtɑːməs/" — inertia, heaviness, fog. The 7 a.m. blanket.
> 
> All three strands run in everyone, all the time, and only the mix changes. The "/ˈɡuːnɑːs/" are not three types of people. They are the three threads that every moment is woven from.

**`f-claim-gunas-day.mp3`**
> None of the three strands is the enemy. The practice is noticing which one is steering you right now. [short pause]
> 
> What do the strands look like in an ordinary day? Watch one go by, hour by hour.
> 
> 7:00 a.m. The alarm rings and your body votes no. Everything feels heavy, slow, and fogged. That is "/ˈtɑːməs/" in the lead. "/ˈtɑːməs/" is not evil. It is also the strand that lets you sleep, rest, and heal.
> 
> 11:30 a.m. A deadline, a coffee, three arguments open in your head. Your heart is quick and your thoughts are quicker. Now "/ˈrɑːdʒəs/" has taken over, and "/ˈrɑːdʒəs/" is not evil either. Nothing gets built without it.
> 
> 9:00 p.m. A walk after dinner. The mind is quiet, kind, and clear, with "/ˈsɑːtvə/" out in front. This is the strand the practices try to feed.
> 
> The teaching is not that you should be sattvic all day and never rest or strive. The teaching is simply to notice which strand is steering you right now, because once you can see it, you can work with it.

**`f-claim-term-gunas.mp3`**
> The key word here is tree-GOO-nuh… meaning: the three strands of nature. [short pause]
> 
> "/ˈsɑːtvə/"… clarity, lightness, balance… 
> "/ˈrɑːdʒəs/"… heat, drive, restlessness… 
> "/ˈtɑːməs/"… weight, inertia, rest
> 
> These are not good, better, and best. They are three threads in one weave, all running in you right now, and only the mix changes.

## Part 4 — Karma & Rebirth

**`f-wheel-intro.mp3`**
> [warmly] Part 3 gave you the picture. There is one ocean, and you are a drop of it. This part is about the machinery. It explains how one life leads to another, what steers that, and where the way off is. There are seven ideas here, and they are the ones your friends will ask you about first.

**`f-wheel-samsara.mp3`**
> If the witness is what you truly are, death changes the clothes, not the wearer. [short pause]
> 
> So what happens when the body dies? Part 3 said that you are the watcher, not the body. If you take that seriously, death changes its meaning.
> 
> Death is not the end of the watcher. It is a change of clothes. The body wears out, and the one inside it steps into another. The "/ˈbɑːɡəvəd ˈɡiːtɑː/" says it in a single image:
> 
> As one casts off worn-out clothes and puts on new ones…
> 
> This endless round of birth, a life, death, and birth again is called "/səmˈsɑːrə/", the wheel. "/səmˈsɑːrə/" is not a punishment, and it is not a reward. It is simply how things are. The wheel turns, until one day it doesn’t.

**`f-wheel-term-samsara.mp3`**
> The key word here is "/səmˈsɑːrə/"… meaning: the wheel… birth, death, and birth again. [short pause]
> 
> The word literally means wandering through. A soul in "/səmˈsɑːrə/" moves from life to life the way a traveler moves from town to town.
> 
> Hold onto the wheel image, because everything in this part is about that wheel. First what turns it, and then how to step off.

**`f-wheel-carryover.mp3`**
> The body stays behind; the record travels. What carries over is what you did. [short pause]
> 
> If the clothes change, does anything come along for the ride? One thing does, and it sets up the next idea.
> 
> Think of moving between schools as a child. You leave behind the building, the desks, and the uniform. What moves with you is your report card, the record of how you worked.
> 
> Rebirth works the same way. The body, the house, and the name all stay behind. What travels is the record of your actions. The tradition has a name for that record, and it is the next word: "/ˈkɑːrmə/".

**`f-wheel-karma.mp3`**
> [curious] What steers the wheel is what you do. "/ˈkɑːrmə/" means action, not fate. [short pause]
> 
> So what steers the wheel? Who decides what the next life looks like?
> 
> Nobody does. There is no judge keeping score. There is only "/ˈkɑːrmə/".
> 
> "/ˈkɑːrmə/" is a Sanskrit word, and it simply means action. Something you do. Hindus believe that every action has consequences, and that those consequences do not end when this life ends. They travel with you into the next life, just like the report card that followed you from one school to the next.
> 
> Once you see this, a common saying falls apart. People sigh and say, “It is my "/ˈkɑːrmə/", there is nothing I can do.” That has the word backwards. "/ˈkɑːrmə/" is not something that happens to you. "/ˈkɑːrmə/" is what you do. And what you do is the one thing in your life that is always yours to change.

**`f-wheel-term-karma.mp3`**
> The key word here is "/ˈkɑːrmə/"… meaning: action… the deed itself. [short pause]
> 
> People misread this word in two ways. "/ˈkɑːrmə/" is not fate, because fate is what you cannot change, and "/ˈkɑːrmə/" is what you do. And "/ˈkɑːrmə/" is not cosmic revenge, because nobody is punishing you. Consequences are simply growing from seeds you planted.
> 
> "/ˈkɑːrmə/" is the verb of your life.

**`f-wheel-seed.mp3`**
> Plant a mango seed and mangoes come up. Actions grow true to their kind — that is the whole mechanism. [short pause]
> 
> How do actions carry their consequences forward? The oldest picture the tradition has for it belongs to a farmer.
> 
> Plant a mango seed, and mangoes come up. Not apples, and not thorns. The harvest is true to the seed, every single time. And the harvest is never instant, because you plant in one season and reap in another.
> 
> "/ˈkɑːrmə/" works like that field. A kind action grows into something kind, and a cruel one grows into something cruel. The growing takes time, sometimes longer than one life. Nobody is sentencing you. You are farming.

**`f-wheel-dharma.mp3`**
> The real question isn't “what is the rule?” but “what is mine to do?” That is "/ˈdɑːrmə/". [short pause]
> 
> If your actions steer the wheel, the next question matters a great deal. Which actions are the right ones? Hinduism answers with a question of its own.
> 
> The question is not “what is the rule?” The question is “what is mine to do?” That question, together with its answer for your particular life, is "/ˈdɑːrmə/".
> 
> "/ˈdɑːrmə/" is not a set of ten commandments handed to everyone alike. A soldier’s "/ˈdɑːrmə/" and a mother’s "/ˈdɑːrmə/" are genuinely different, and both are right. The right thing depends on who you are, where you stand, and who depends on you.

**`f-wheel-term-dharma.mp3`**
> The key word here is "/ˈdɑːrmə/"… meaning: what upholds… the right thing, for you, here. [short pause]
> 
> The root of the word means to uphold. Your "/ˈdɑːrmə/" is whatever upholds the people and the world that rest on you, and that is why it changes when your role changes.
> 
> The easiest way to use it is as a question. What is mine to do?

**`f-wheel-roles.mp3`**
> In one afternoon you owe three different things to three different people — and meeting each one is "/ˈdɑːrmə/". [short pause]
> 
> Maybe “it depends on your role” sounds slippery to you. If it does, watch yourself for one afternoon.
> 
> At three o’clock you are a parent, and your duty is patience with a child who is learning slowly. At four you are an employee, and your duty is honest work, delivered on time. At six you are a driver in traffic, and your duty is to pull aside and let the ambulance pass, even though you are late.
> 
> That is three hours, three roles, and three different right things. You already navigate all of it without calling it philosophy. "/ˈdɑːrmə/" simply says that this is what ethics really is. Not one rule for everybody, but the right thing for the role you are standing in.

**`f-wheel-ahimsa.mp3`**
> One duty comes close to universal: cause no harm you don't have to. That is "/əˈhɪmsɑː/". [short pause]
> 
> If duty changes with your role, is anything constant across all of them? One thing comes closest, and it is called "/əˈhɪmsɑː/".
> 
> "/əˈhɪmsɑː/" literally means non-harming. It asks you to cause no harm you do not have to cause. It is the nearest thing the tradition has to a commandment, and the "/ˌmɑːhɑːˈbɑːrətə/" ranks it above everything else:
> 
> Non-harming is the highest duty.
> 
> "/əˈhɪmsɑː/" is a discipline rather than a mood. It is harmlessness deliberately chosen by someone who is perfectly capable of doing otherwise. Gandhi built a whole freedom movement on it. Cause no harm you don’t have to. That is the entire rule.

**`f-wheel-term-ahimsa.mp3`**
> The key word here is "/əˈhɪmsɑː/"… meaning: non-harming… chosen, not accidental. [short pause]
> 
> The a- at the front of the word is a negation. HIM-saa is harm, and "/əˈhɪmsɑː/" is its deliberate absence.
> 
> Mildness is not the point here. Strength held back is the point. A person with no power to harm is merely harmless. "/əˈhɪmsɑː/" is what you call it when the powerful choose not to.

**`f-wheel-surgeon.mp3`**
> "/əˈhɪmsɑː/" is not “never cause pain.” It is “cause no harm you don’t have to” — and the last four words carry the weight. [short pause]
> 
> Does non-harming mean a surgeon must never cut? Look closely at the cut, because the answer is in it.
> 
> A surgeon’s knife and an attacker’s knife can leave the same wound. What separates them is everything "/əˈhɪmsɑː/" cares about. One thing is the intention behind the hand. The other is whether the harm was necessary at all.
> 
> The surgeon cuts to heal, cuts as little as possible, and would rather not cut at all. That is harm, and it is still "/əˈhɪmsɑː/", because none of it is harm the surgeon did not have to cause.
> 
> So read the rule with its last four words attached. Cause no harm you don’t have to. The discipline lives in checking, each time, whether you really have to.

**`f-wheel-moksha.mp3`**
> [thoughtful] The goal is not heaven. It is getting off the wheel altogether — "/ˈmoʊkʃə/". [short pause]
> 
> So where does all this steering lead? What is the finish line? The answer surprises most newcomers, because the answer is not heaven.
> 
> In this picture, even heaven is temporary. It is a pleasant stop that you eventually have to leave, which makes it just another turn of the wheel. The real goal is "/ˈmoʊkʃə/", which means release from the wheel altogether.
> 
> "/ˈmoʊkʃə/" is waking up out of the whole round of birth and death, because you finally see what you always were. You were the drop, and the drop was never separate from the ocean. There is no next costume and no next classroom. You are home.

**`f-wheel-term-moksha.mp3`**
> The key word here is "/ˈmoʊkʃə/"… meaning: release… the way off the wheel. [short pause]
> 
> The word comes from the root mooch, which means to let go. "/ˈmoʊkʃə/" is not a place you travel to. It is a seeing that sets you loose, the way waking up ends a dream without moving you an inch.
> 
> Heaven, in this picture, is just a better seat on the wheel. "/ˈmoʊkʃə/" is stepping off.

**`f-wheel-river.mp3`**
> As rivers lose their names in the sea, the freed one loses the walls — the drop comes home to the ocean. [short pause]
> 
> What does release actually look like? The "/uːˈpʌnɪʃədz/" answer with a picture you already own.
> 
> Watch a river reach the sea. For a thousand miles it had a name, two banks, and a shape of its own. At the mouth, the banks fall away, and the water does not die. It simply stops being the river and goes back to being water.
> 
> The MOON-duh-kuh "/uːˈpʌnɪʃəd/" says exactly this. As flowing rivers merge into the sea and lose their name and form, the one who knows is freed.
> 
> You met all of this in Part 3, in the drop, the pot, and the walls. "/ˈmoʊkʃə/" is the walls coming down. It is not the end of you. It is the end of the smallness you mistook for you.

**`f-wheel-aims.mp3`**
> You are not required to sprint for the exit — pleasure and prosperity are proper goals too. [short pause]
> 
> Now that you know the exit exists, must you rush for it? Should you renounce everything, starting tomorrow? Hinduism’s answer is a comfortable no.
> 
> The tradition names four proper aims of a human life, and together they are called the "/ˌpʊrʊˈʃɑːrtəs/". Read the list, and pay attention to what made it on:
> 
> "/ˈdɑːrmə/" — to live rightly.
> "/ˈɑːrtə/" — to prosper, to build and provide for others.
> "/ˈkɑːmə/" — to enjoy: desire, pleasure, love, beauty.
> "/ˈmoʊkʃə/" — to be free of the whole cycle.
> 
> Prosperity is on the list, and so is pleasure. This is not an ascetic religion that grudgingly tolerates the world. It is a world-affirming religion that keeps an exit door open at the back.

**`f-wheel-term-aims.mp3`**
> The key word here is "/ˌpʊrʊˈʃɑːrtə/"… meaning: the four proper aims of a life. [short pause]
> 
> "/ˈdɑːrmə/"… to live rightly… 
> "/ˈɑːrtə/"… to prosper and provide… 
> "/ˈkɑːmə/"… to enjoy: desire, love, beauty… 
> "/ˈmoʊkʃə/"… to be free of the wheel
> 
> Four aims, and no apology for any of them. The first three are the world lived well. The fourth is the door out, and it stands open whenever you are ready for it.

**`f-wheel-permission.mp3`**
> A tradition that lists pleasure among life’s proper aims is not a trap-escape religion — the world is a life to live rightly. [short pause]
> 
> Think about what this list does to the stereotype. The stereotype says that Eastern religion means renouncing everything, and it comes with a cave, a beard, and wanting nothing.
> 
> The "/ˌpʊrʊˈʃɑːrtəs/" say otherwise. Build a business honestly, and that is "/ˈɑːrtə/", an aim fulfilled. Fall in love, cook a feast, enjoy something beautiful, and that is "/ˈkɑːmə/", another aim fulfilled. Neither one needs an apology, as long as "/ˈdɑːrmə/" frames them.
> 
> The cave is real, but it is a stage of life, not the whole syllabus. Most Hindu lives are lived inside the first three aims, with the fourth kept like a door at the back of the house. It is known, it is respected, and it is walked through when its time comes.

**`f-wheel-yogas.mp3`**
> There are four roads to that exit, each matched to the kind of person you already are. [short pause]
> 
> When you are ready for that door, which way do you walk? This is the tradition’s most practical kindness, because there is no single way. There are four roads, called the yogas, and each one fits a different kind of person:
> 
> "/ˈbʌkti/" — the path of love and devotion, if your heart leads.
> "/ˈkɑːrmə/" yoga — the path of selfless work, if you would rather act than sit.
> "/ˈɡjɑːnə/" — the path of knowledge, if you must reason it through.
> "/ˈrɑːdʒə/" — the path of meditation, if you can sit still.
> 
> None of the four outranks the others. You do not have to become someone else to arrive. You take the road that fits how you are already built.

**`f-wheel-term-yoga.mp3`**
> The key word here is yoga… meaning: a road to the exit… literally, a yoking. [short pause]
> 
> "/ˈbʌkti/"… love and devotion, if your heart leads… 
> "/ˈkɑːrmə/" yoga… selfless action, if you’d rather do than sit… 
> "/ˈɡjɑːnə/"… knowledge, if you must reason it through… 
> "/ˈrɑːdʒə/"… meditation, if you can sit still
> 
> The word that became a fitness class actually means yoking. It is about hitching your everyday self to the biggest thing there is. The postures you know are one small corner of one of the four roads.

**`f-wheel-mountain.mp3`**
> Four trails climb one mountain. Arguing about the best trail misses the point — the summit is the same. [short pause]
> 
> Why four roads and not one? Picture a mountain with a temple at the top.
> 
> From the east, a trail climbs up through villages, and the pilgrims walk it singing. That is "/ˈbʌkti/". From the west there is a service road, built and maintained by people who love to work. That is "/ˈkɑːrmə/" yoga. From the north there is a steep scramble for those who have to see the truth for themselves. That is "/ˈɡjɑːnə/". And from the south there is a silent switchback for those who climb best alone. That is "/ˈrɑːdʒə/".
> 
> Four trails, one summit. A lover of God, a tireless volunteer, a philosopher, and a meditator are not four different religions. They are four hikers, and they meet at the top.

## Part 5 — The Gods

**`f-faces-intro.mp3`**
> [warmly] You have the one ocean. Now come the faces, the gods themselves. Most beginners drown in the names, so we will build the map before we meet the crowd. There are four ideas, and once you have them, the whole cast becomes readable.

**`f-faces-trimurti.mp3`**
> Nobody falls in love with a philosophy — so it grew faces. Start with the great three. [short pause]
> 
> Part 3 ended with lamps. The one current is given faces that a person can love. Now it is time to meet those faces, starting with the greatest three, who are together called the "/trɪˈmuːrti/".
> 
> "/ˈbrɑːmɑː/" creates the universe. "/ˈvɪʃnuː/" preserves it. "/ˈʃɪvə/" dissolves it. These are three jobs, not three ranks. No one of them outranks the others, because a universe needs all three motions.
> 
> There is one oddity worth knowing. "/ˈbrɑːmɑː/", the creator, is barely worshiped anywhere today. Making the world, it seems, was the easy part.

**`f-faces-term-trimurti.mp3`**
> The key word here is "/trɪˈmuːrti/"… meaning: the three forms… one motion, three jobs. [short pause]
> 
> "/ˈbrɑːmɑː/"… creates… 
> "/ˈvɪʃnuː/"… preserves… 
> "/ˈʃɪvə/"… dissolves, to make room
> 
> Be careful with the look-alikes from Part 3. "/ˈbrɑːmən/" is the one reality. "/ˈbrɑːmɑː/" is one face on it, with one job. One letter separates them, and a world of difference.

**`f-faces-breath.mp3`**
> Destruction is not evil here — it is the out-breath that makes the next in-breath possible. [short pause]
> 
> Why give dissolution a god at all? Because of what ending actually does.
> 
> Watch a gardener prune a rose bush. She cuts living wood, and the cutting is not cruelty. It is exactly what lets the bush bloom again next spring. Without the pruning, there is no bloom.
> 
> In this picture, the universe breathes. Creation is the in-breath, preservation is the long holding, and dissolution is the out-breath. Then it breathes in again. "/ˈʃɪvə/"’s job is the out-breath. Ending is not the opposite of creating. It is what makes room for it.

**`f-faces-avatar.mp3`**
> When the world goes badly wrong, "/ˈvɪʃnuː/" comes down into it. Each descent is an "/ˈɑːvətɑːr/". [short pause]
> 
> Of the three, "/ˈvɪʃnuː/" the preserver has one remarkable habit. When the world tips badly into chaos, he does not fix it from a distance. He comes down into it. He is born in a body, and he walks in the mess.
> 
> Each of those descents is called an "/ˈɑːvətɑːr/". The Sanskrit word "/ˌɑːvəˈtɑːrə/" literally means a crossing-down. And "/ˈvɪʃnuː/" announces the policy himself, in the "/ˈɡiːtɑː/":
> 
> Whenever "/ˈdɑːrmə/" declines, O BAH-ruh-tuh… then I come forth.
> 
> Hold onto one fact and half of a beginner’s confusion clears at once. "/ˈrɑːmə/" is "/ˈvɪʃnuː/", and "/ˈkrɪʃnə/" is "/ˈvɪʃnuː/". They are not rival gods. They are the same god, come down twice, into two different emergencies.

**`f-faces-term-avatar.mp3`**
> The key word here is "/ˌɑːvəˈtɑːrə/"… meaning: a crossing-down… god descended into a body. [short pause]
> 
> The word your phone borrowed for a profile picture means something enormous here. It means the divine, entering the world in person, when the world needs it.
> 
> Ten classical "/ˈɑːvətɑːrz/" are counted for "/ˈvɪʃnuː/". "/ˈrɑːmə/" and "/ˈkrɪʃnə/" are the two that the stories orbit.

**`f-faces-lifeguard.mp3`**
> A lifeguard does not shout instructions from the chair when someone is drowning. He dives. That is the "/ˈɑːvətɑːr/" idea. [short pause]
> 
> Why would the preserver of the universe take a body at all? Picture a lifeguard.
> 
> On a calm day he sits high up on his chair, watching. He is present, but apart. Then someone starts drowning. He does not shout advice from above. He dives into the same water, swims through the same waves, and pulls the swimmer out from inside the danger.
> 
> That is the "/ˈɑːvətɑːr/"’s logic. When "/ˈdɑːrmə/" is drowning, "/ˈvɪʃnuː/" does not repair the world by remote control. He is born into it, once as a prince sent into exile, once as a cowherd in a violent kingdom, and he sets it right from within.

**`f-faces-shakti.mp3`**
> [dramatically] Not one of the gods can act without her. The Goddess is power itself — "/ˈʃʌkti/". [short pause]
> 
> So far, the faces have all been male. Now comes the correction, and it changes everything. Not one of those gods can act without her.
> 
> "/ˈʃʌkti/" means power. It is energy, capability, the very ability to do anything at all. She is not a god’s wife standing politely to the side. She is the force his actions are made of. The tradition says it bluntly. "/ˈʃɪvə/" without his "/ˈʃʌkti/" is a corpse.
> 
> And she is one Goddess who wears many tempers. "/ˈpɑːrvəti/" is "/ˈdʊrɡɑː/" is "/ˈkɑːli/". She is the gentle wife, and the lion-riding warrior, and the terrifying one who ends things. For millions of Hindus, She is the supreme reality, full stop.

**`f-faces-term-shakti.mp3`**
> The key word here is "/ˈʃʌkti/"… meaning: power… the ability to act at all. [short pause]
> 
> In most traditions, the god has power. Here it is the other way around. Power is her, and the god is what she moves.
> 
> "/ˈpɑːrvəti/", "/ˈdʊrɡɑː/", and "/ˈkɑːli/" are one power, in three kinds of weather.

**`f-faces-fire.mp3`**
> Fire and its heat are not two things — take the heat away and only a picture of fire is left. So it is with god and "/ˈʃʌkti/". [short pause]
> 
> How can power itself be a person? The classical image is the nearest fire.
> 
> Think of a flame and its heat. They are not two objects. You cannot point at the flame here and its heat over there. And yet, if you could take the heat away, what remained would not be fire at all. It would only be a picture of fire.
> 
> "/ˈʃʌkti/" is the heat. The god is the flame’s shape, and she is what makes it actually burn. That is why the fiercest forms of the Goddess, like "/ˈdʊrɡɑː/" on her lion and "/ˈkɑːli/" with her garland, are not departures from the gentle "/ˈpɑːrvəti/". They are the same heat, turned up to what the moment demands.

**`f-faces-family.mp3`**
> Learn six names and how they connect, and almost any Hindu story becomes readable. [short pause]
> 
> Now put the whole cast on one page. It comes down to six names and how they connect, because the relationships are what make the stories readable.
> 
> Every god is paired with a goddess. "/ˈvɪʃnuː/" comes down as "/ˈrɑːmə/" and as "/ˈkrɪʃnə/". "/ˈʃɪvə/" and "/ˈpɑːrvəti/" have a son named "/ɡəˈneɪʃə/", the elephant-headed one, who is greeted first before anything begins.
> 
> And off to the side stands "/ˈhənʊmɑːn/", who can do absolutely anything, and who wants nothing except to serve "/ˈrɑːmə/". The tradition holds him up as its ideal, and that tells you exactly what it admires.

**`f-faces-read-one.mp3`**
> Six names in, you can walk past a festival poster and read it like a sentence. [short pause]
> 
> Does the map actually work? Test it on the next festival poster you pass.
> 
> An elephant-headed figure holds a plate of sweets. That is "/ɡəˈneɪʃə/", which means something new is being launched, and he was greeted first. A blue cowherd plays a flute. That is "/ˈkrɪʃnə/", so it is his birthday, or someone is quoting the "/ˈɡiːtɑː/". A monkey kneels with a mountain balanced on one palm. That is "/ˈhənʊmɑːn/", caught mid-rescue, serving "/ˈrɑːmə/".
> 
> A month ago, that poster was decoration to you. Now it is a sentence, and you can read it. That is what the map buys you. Not trivia, but literacy.

## Part 6 — The Scriptures

**`f-library-intro.mp3`**
> [warmly] You know the cast now. This short part is about where their stories live. There is one library with two shelves, two great epics, and one conversation that outgrew the war it interrupted.

**`f-library-shelves.mp3`**
> There is no one holy book. There is a library — and it has just two shelves. [short pause]
> 
> So where are the gods’ stories actually written down? Part 1 warned you that there is no single holy book. There is a whole library, and knowing its two shelves is most of what a beginner needs.
> 
> The top shelf is called "/ˈʃruːti/", which means “heard.” It holds the "/ˈveɪdəz/" and, at their end, the "/uːˈpʌnɪʃədz/". These texts were received rather than authored, and they carry the deepest authority. Everything in Core Beliefs came from this shelf, including "/ˈbrɑːmən/", "/ˈɑːtmən/", and you are that.
> 
> The bottom shelf is called "/ˈsmrɪti/", which means “remembered.” It holds the "/ˈɡiːtɑː/", the two epics, and the "/pʊˈrɑːnəz/", all retold, adapted, and argued with for centuries. The deepest authority sits on the top shelf, but the stories everyone actually knows live on the bottom one.

**`f-library-term-shelves.mp3`**
> The key word here is "/ˈʃruːti/" · "/ˈsmrɪti/"… meaning: heard… and remembered. [short pause]
> 
> "/ˈʃruːti/"… “heard”: "/ˈveɪdəz/", "/uːˈpʌnɪʃədz/"… received, authoritative… 
> "/ˈsmrɪti/"… “remembered”: "/ˈɡiːtɑː/", epics, "/pʊˈrɑːnəz/"… retold, beloved
> 
> A rule of thumb that rarely fails. If a text is famous enough that your friends have heard of it, it is probably "/ˈsmrɪti/". The top shelf is quieter, and it is where the philosophy came from.

**`f-library-kitchen.mp3`**
> What is “heard” at the stove outranks the cookbook — and the cookbook is what everyone actually uses. [short pause]
> 
> Why would “heard” outrank “written”? Think of a family kitchen.
> 
> The real recipes were never written down. They were heard, standing at the stove, watching a grandmother’s hands, receiving what she herself once received. When a dispute breaks out about the dish, hers is the voice that settles it.
> 
> The cookbook on the shelf is the remembered version. It was written later, then adapted, expanded, and splattered with daily use. Everyone cooks from the cookbook, and nobody claims it outranks the grandmother.
> 
> "/ˈʃruːti/" is the stove, and "/ˈsmrɪti/" is the cookbook. The kitchen runs on both.

**`f-library-epics.mp3`**
> Two great epics sit on that second shelf: one man does right at any cost; one family destroys itself. [short pause]
> 
> Two great epics sit on that remembered shelf, and between them they hold most of the stories you will ever hear. The fastest way to keep them apart is this.
> 
> The "/rɑːˈmɑːjənə/" is the tidy one. One man, "/ˈrɑːmə/", does the right thing at any cost. He is exiled unjustly and goes without complaint. His wife "/ˈsiːtɑː/" is stolen by the demon king "/ˈrɑːvənə/". "/ˈhənʊmɑːn/" finds her, and "/ˈrɑːvənə/" falls. It is a story about duty, held all the way down.
> 
> The "/ˌmɑːhɑːˈbɑːrətə/" is the messy one. Two halves of one family go to war over a throne, and almost everyone loses. It is longer, murkier, and far more honest about how people actually are. One epic shows you the ideal. The other shows you the mirror.

**`f-library-two-scenes.mp3`**
> Carry one scene from each: "/ˈrɑːmə/" walking into exile without complaint; a kingdom gambled away at a dice game. [short pause]
> 
> If you carry just one scene from each epic, you will have the flavor of both.
> 
> Take this one from the "/rɑːˈmɑːjənə/". On the morning "/ˈrɑːmə/" is to be crowned king, the order suddenly changes. He is to spend fourteen years in exile instead, because of a promise his father once made. "/ˈrɑːmə/" hears the news, and he walks out of the palace the same hour, without argument. That is the whole epic in one motion. Duty is held, whatever it costs.
> 
> Now take this one from the "/ˌmɑːhɑːˈbɑːrətə/". A king sits down to a friendly game of dice. Throw after throw, he loses his wealth, then his kingdom, then his brothers, then himself, and finally his wife’s honor, while a hall full of elders watches in silence. That is the whole epic in one scene. Good people slide into catastrophe, one compromise at a time.

**`f-library-gita.mp3`**
> [dramatically] Inside that messy epic, a soldier lays down his bow — and gets a 700-verse answer. [short pause]
> 
> Buried inside the "/ˌmɑːhɑːˈbɑːrətə/" is the most-read text in all of Hinduism, and it begins with a collapse.
> 
> On the morning of the great battle, the warrior "/ˈɑːrdʒʊnə/" rides out between the two armies. He looks across the field and sees his own cousins, his teachers, and his friends standing on the other side. His bow slips from his hand. He sits down in the chariot and says that he will not fight.
> 
> What his charioteer says next, to talk him through it, is the "/ˈbɑːɡəvəd ˈɡiːtɑː/". And the charioteer is "/ˈkrɪʃnə/", who is "/ˈvɪʃnuː/" descended, as you now know. The most-read text in Hinduism is seven hundred verses of a man being gently talked out of a breakdown. That is exactly why it travels.

**`f-library-bow.mp3`**
> Everyone, sooner or later, stands where "/ˈɑːrdʒʊnə/" stands: between two duties, with no clean choice. [short pause]
> 
> Slow the scene down, because the scene is the point.
> 
> "/ˈɑːrdʒʊnə/" is not afraid of dying. He is the best archer alive. What breaks him is seeing. He sees his grandfather BHEESH-muh, who raised him. He sees DROH-nuh, who taught him to hold the very bow in his hand. He sees cousins he grew up beside. To win this war means killing them. To walk away means abandoning his brothers and leaving injustice on the throne.
> 
> Two duties, family and justice, are pulling him in opposite directions, and every path costs something he cannot afford.
> 
> You do not need a battlefield to stand where he stands. Think of a job that feeds your family but hollows you out, or a parent who needs care and a career that cannot wait. The "/ˈɡiːtɑː/" is read at kitchen tables because "/ˈɑːrdʒʊnə/"’s field is anywhere a person freezes between two rights.

## Part 7 — Rituals & Festivals

**`f-living-intro.mp3`**
> [warmly] Everything so far has been about what Hindus think. This part is about what they do, in a room, across a year, and in the hard conversations. There are four ideas, and once you have them, the doing makes sense.

**`f-living-murti.mp3`**
> None of this is a religion you read. It is one you do — starting by welcoming a guest. [short pause]
> 
> Remember the first thing this track taught you. Being Hindu is about what you practice, not what you profess. So what does the practicing actually look like? It begins in front of a "/ˈmuːrti/", the sculpted form of a god.
> 
> Calling a "/ˈmuːrti/" an “idol” gets the grammar of the thing completely wrong, and one look at "/ˈpuːdʒɑː/", which is the word for worship, shows why:
> 
> a form… something given shape so it can be met
> 
> In "/ˈpuːdʒɑː/", the "/ˈmuːrti/" is bathed, dressed, fed, sung to, and put to bed at night. That is exactly the care you would offer an honored guest in your home. So the question was never whether the statue is God. The real question is warmer and simpler. Has the guest been welcomed properly?

**`f-living-term-murti.mp3`**
> The key word here is "/ˈmuːrti/"… meaning: a form… shaped so the formless can be met. [short pause]
> 
> Part 3 said it first. The formless is hard to love, and a face is not. A "/ˈmuːrti/" is that idea, carved in stone or bronze.
> 
> It is not an idol claiming to be god. It is a form where god agrees to be met.

**`f-living-guest.mp3`**
> Sixteen services of "/ˈpuːdʒɑː/", and every one is something you would do for a beloved guest: a seat, water, food, a lamp. [short pause]
> 
> If worship is hosting, then the ritual should look like hospitality. Watch it happen.
> 
> A guest arrives at your home. You invite them in and offer them a seat. You bring water, so they can wash the journey off. You bring something to eat and drink. There is good conversation, and maybe a song. When the evening ends, you light their way out.
> 
> Now read the classical list. "/ˈpuːdʒɑː/" names sixteen services, the SHOH-duh-shuh oo-puh-CHAA-ruh, and they describe the same evening. The deity is invited, seated, offered water, bathed, dressed, fed, entertained with song, and honored with light.
> 
> Nothing in the list is magic. All of it is manners. And this is one common way, so ask your family how they walk it.

**`f-living-darshan.mp3`**
> You go to the temple to see the god — and to be seen by them. That is "/ˈdɑːrʃən/". [short pause]
> 
> So why go to a temple at all? The answer surprises people, because it is not mainly to ask for things.
> 
> You go for "/ˈdɑːrʃən/", which means seeing. You go to look at the deity, and just as much, to be looked at in return. That is why a "/ˈmuːrti/"’s eyes are carved large and open, and why the crowd surges forward when the curtain parts. The meeting runs both ways.
> 
> Ask a grandmother what she went to the temple for. She will not say that she went to request something. She will say she took "/ˈdɑːrʃən/". She saw, and she was seen.

**`f-living-term-darshan.mp3`**
> The key word here is "/ˈdɑːrʃənə/"… meaning: seeing… and being seen. [short pause]
> 
> It is one word for both directions of a gaze. You take "/ˈdɑːrʃən/" the way you take someone’s hand, because it only works if both sides are in it.
> 
> "/prəˈsɑːd/" (प्रसाद) is what you carry home afterward. It is food offered first to the deity, then handed back to you, and people describe it as grace made edible.

**`f-living-exchange.mp3`**
> You bring something, you see, you are seen, you carry something home. Worship here is a loop, not a letter of requests. [short pause]
> 
> Put the pieces together and look at the shape of a temple visit.
> 
> You arrive carrying something small, maybe fruit, or flowers, or a coconut. You give it. You stand before the "/ˈmuːrti/", you look, and you are looked at. That is "/ˈdɑːrʃən/". Then a portion of what was offered comes back to you as "/prəˈsɑːd/", the deity’s own share passed onward, which is exactly as intimate as it sounds. You eat it there, or you carry it home to someone who could not come.
> 
> Now trace the whole movement. You give, you see, you are seen, you receive, and you carry something home. It is a loop of hospitality, much closer to visiting a beloved elder than to filing a petition. Nobody leaves a request form. Everybody leaves with their hands full.

**`f-living-year.mp3`**
> Scale that hospitality from one room to a whole year, and the calendar becomes a story you can read. [short pause]
> 
> Now scale the welcome up from one room to a whole year. The Hindu calendar is crowded with festivals, and a month ago they would have been noise to you.
> 
> But you know the cast now, so each festival turns into a sentence you can read:
> 
> "/dɪˈvɑːli/" — lamps light the road home because "/ˈrɑːmə/" is returning from exile.
> "/ˈhoʊli/" — spring, color thrown in the streets, and old grudges forgiven.
> "/ˌnʌvəˈrɑːtri/" — nine nights for the Goddess, in all her forms.
> "/dʒənˈmɑːʃtəmi/" — "/ˈkrɪʃnə/", born at midnight in a prison cell.
> 
> The calendar is everything you just learned, told once a year, with food. You do not memorize it. You attend it.

**`f-living-diwali-read.mp3`**
> Read one festival closely and the method is yours: "/dɪˈvɑːli/" is the "/rɑːˈmɑːjənə/"’s last chapter, re-lit every autumn. [short pause]
> 
> Take the biggest festival of all and read it with everything you now know.
> 
> Start with the lamps of "/dɪˈvɑːli/", the rows of little flames on every windowsill. Why lamps? Because this night is the "/rɑːˈmɑːjənə/"’s final page. Fourteen years of exile are over, "/ˈrɑːvənə/" has fallen, and "/ˈrɑːmə/" is coming home tonight. The lamps are a whole city lighting his road back.
> 
> Inside the houses, families welcome LUCK-shmee, "/ˈvɪʃnuː/"’s goddess, who is abundance herself, because a homecoming is exactly when prosperity should walk in. Sweets travel between neighbors, and that is "/ˈkɑːmə/", one of the four aims of life, fulfilled right on schedule.
> 
> One festival used your whole education. It needed an "/ˈɑːvətɑːr/", an epic, a goddess, and an aim. Every other festival reads the same way now.

**`f-living-hard.mp3`**
> [thoughtful] Two questions have no tidy answer. Saying so honestly is the right move. [short pause]
> 
> One honest warning before you go. Within about ninety seconds of telling someone you are learning about Hinduism, one of two hard questions tends to arrive. Neither has a tidy answer, and pretending otherwise helps no one.
> 
> The first is caste. The old texts describe a fourfold ordering of society. What it hardened into was fixed at birth, brutally hierarchical, and defended with scripture. That is a real and unfinished injustice, and many Hindus have fought it from the inside for centuries. Do not defend it. Explain it.
> 
> The second is beef. The cow is honored as the animal that gives, in milk, without ever taking. Plenty of Hindus eat meat, but most will not eat beef.
> 
> “It is complicated, and here is how” is the honest answer, and it is a far better one than any slogan. A tradition confident enough to argue with itself for three thousand years does not need you to defend its worst chapters.

---

## Part 8 — Explain It Yourself

Part 8 is the capstone. Its one recorded card is the **recap page**, which replays every
takeaway the reader banked — the thirty-two lines below, in order. Record it as a single
file. The closing question that follows is the interactive capstone (answered aloud by the
reader) and is not a recorded card.

**`f-capstone-recap.mp3`**
> [warmly] You can say all of this now. Thirty-two sentences… and you arrived with none of them. [short pause]
>
> Hinduism has no founder, no single book, and no one in charge. Even the name isn't its own — it's a river, mispronounced. The name it gives itself is suh-NAA-tuh-nuh DHUR-muh — the eternal way. An eternal way still has to be carried — so Sanskrit was built to be remembered, not read.
>
> What makes someone Hindu isn't a belief — it's what they practice. Judaism, Christianity, and Islam ask what you believe; Hinduism asks what you do. Because practice holds it together, Hinduism could branch into four streams without ever splitting. Nobody assigns you a god — you choose the one you love.
>
> [thoughtful] Behind every god and every form is a single reality: "/ˈbrɑːmən/". The same one reality is also what looks out from inside you — "/ˈɑːtmən/". "/ˈbrɑːmən/" and "/ˈɑːtmən/" are not two things; they are one. The world only seems separate because it is misread, not unreal — that misreading is Maaya. One living current runs through all of it: "/ˈprɑːnə/". And everything nature makes is woven from three strands — the "/ˈɡuːnɑːs/".
>
> If the witness is what you truly are, death changes the clothes, not the wearer. What steers the wheel is what you do: "/ˈkɑːrmə/" means action, not fate. The real question isn't what is the rule, but what is mine to do — that is "/ˈdɑːrmə/". One duty comes close to universal: cause no harm you don't have to — "/əˈhɪmsɑː/". The goal is not heaven; it is getting off the wheel altogether — "/ˈmoʊkʃə/". You are not required to sprint for the exit — pleasure and prosperity are proper goals too. And there are four roads to that exit, matched to the kind of person you already are.
>
> Nobody falls in love with a philosophy — so it grew faces. Start with the great three. When the world goes badly wrong, "/ˈvɪʃnuː/" comes down into it as an "/ˈɑːvətɑːr/". Not one of the gods can act without her — the Goddess is power itself, "/ˈʃʌkti/". Learn six names and how they connect, and almost any Hindu story becomes readable.
>
> There is no one holy book — there is a library, and it has just two shelves. Two great epics sit on the second shelf: one man does right at any cost; one family destroys itself. And inside that messy epic, a soldier lays down his bow and gets a seven-hundred-verse answer.
>
> [warmly] None of this is a religion you read — it is one you do, starting by welcoming a guest. You go to the temple to see the god, and to be seen by them — "/ˈdɑːrʃən/". Scale that hospitality across a year, and the whole calendar becomes a story you can read. And two questions have no tidy answer — saying so, honestly, is the right move.

**The capstone question** *(interactive — not a recorded card)*
> A friend asks you, properly, for the first time: "So — what actually is Hinduism?" Tell them. In your own words, the way you would say it out loud. A few sentences is plenty. This is a conversation, not an exam.
