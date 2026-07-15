# Sanskrit voice test

Sanskrit-dense passages pulled from the app, for auditioning how an ElevenLabs
voice handles Sanskrit before committing to the Foundations narration.

**Why two versions of each.** The app stores Sanskrit in **IAST** (with diacritics:
ṁ, ṣ, ṛ, ā, ī, ū…). Most English TTS voices don't know IAST and will flatten or
mangle the marks, so each passage is given twice — the app's IAST, and a **plain
phonetic respelling** (what we'd actually feed the voice if it stumbles). Paste
both and compare: the gap tells us how much respelling the real clips need.

Listen especially for the retroflexes and long vowels (ṛ, ṣ, ṇ, ā/ī/ū) — that's
where a voice usually gives itself away.

> Note: the agreed Foundations narration speaks Sanskrit only as **woven key terms**
> (Sanatana Dharma, ishta-devata, tat tvam asi, moksha…), not full shlokas. This
> file over-tests on purpose — mantras and full verses are the hardest case, so a
> voice that handles these will sail through the key terms.

---

## 1. Mahamrityunjaya Mantra
*Classical Vedic Sanskrit — the densest test.*

**IAST**
```
om tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam
urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt
```

**Phonetic**
```
Om tryam-bakam ya-jaa-ma-he sugandhim pushti-vardhanam
ur-vaa-rukam iva bandhanaan mrityor muksheeya maam-ritaat
```

---

## 2. Two Gita shlokas
*Classical Sanskrit — the register inside the course.*

**IAST — Gita 2.47**
```
karmaṇy-evādhikāras te mā phaleṣhu kadāchana
mā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi
```

**Phonetic — Gita 2.47**
```
karman-ye-vaadhi-kaaras te maa phale-shu kadaachana
maa karma-phala-hetur bhoor maa te sango stva-karmani
```

**IAST — Gita 4.7**
```
yadā yadā hi dharmasya glānir bhavati bhārata
abhyutthānam adharmasya tadātmānaṁ sṛijāmyaham
```

**Phonetic — Gita 4.7**
```
yadaa yadaa hi dharmasya glaanir bhavati bhaarata
abhyut-thaanam adharmasya tadaat-maanam sri-jaamy-aham
```

---

## 3. Hanuman Chalisa — opening
*Flowing devotional Awadhi — tests a longer sustained chunk (two dohas + two chaupais).*

**IAST**
```
śrī guru charana saroja raja, nija manu mukuru sudhāri
baranaũ raghubara bimala jasu, jo dāyaku phala chāri
buddhi-hīna tanu jānike, sumirauṁ pavana-kumāra
bala budhi bidyā dehu mohiṁ, harahu kalesa bikāra
jaya hanumāna jñāna guna sāgara, jaya kapīsa tihuṁ loka ujāgara
rāma dūta atulita bala dhāmā, añjani-putra pavana-suta nāmā
```

**Phonetic**
```
shree guru charana saroja raja, nija manu mukuru sudhaari
baranau raghubara bimala jasu, jo daayaku phala chaari
buddhi-heena tanu jaanike, sumirau pavana-kumaara
bala budhi bidyaa dehu mohi, harahu kalesa bikaara
jaya hanumaana gyaana guna saagara, jaya kapeesa tihu loka ujaagara
raama doota atulita bala dhaamaa, anjani-putra pavana-suta naamaa
```

---

Between these you cover all three registers the app contains: a Vedic mantra,
classical Gita Sanskrit, and flowing devotional verse.
