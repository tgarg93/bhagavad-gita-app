# Illustration Generation Queue — Phase 1 (42 images)

**Working file, not a spec.** `docs/dharma-illustration-spec.md` is the source of truth. This file exists only to make generation mechanical: each entry below is a **complete, paste-ready prompt** (shared style preamble + the item's scene, already composed), plus its exact target filename. Delete this file once Phase 1 is generated and wired.

If a prompt needs changing, **change it in the spec** and re-compose here — not the other way round.

## How to use

1. Copy the **Style Preamble** below once. Every prompt in this file already assumes it and repeats it — the prompts are self-contained, so you can paste any single one on its own.
2. Generate a **1:1 square**, target 2048×2048, floor 1254×1254, JPEG q≈85, **≤1.5 MB**. Anything below 1024px on a side is a fail (see spec Part 6).
3. Save to the exact filename given. Gita chapters → `assets/gita-covers/`. Everything else → `assets/images/covers/`.
4. Tick the box. When a round is complete, the wiring step for that round can run.

## Style Preamble (baked into every prompt below)

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting and Mughal manuscript art. Fine hand-painted outlines, delicate ornamental detailing, crisp readable silhouettes, mostly flat perspective with mild depth layering. Hand-painted gouache texture on soft parchment with visible brush character — never glossy, never 3D, never photorealistic, never cinematic. Soft natural light. Rich but restrained jewel tones, never oversaturated. A slender gold-and-floral border frames the scene without competing with it. 1:1 square composition with the focal subject in the upper two-thirds and a visually simple bottom third (open sky, still water, or plain ground) that survives cropping. Absolutely no text, numbers, Sanskrit, English, logos, signatures, or watermarks anywhere in the image.

---

# Round 1 — The Bhagavad Gita (16 images)

Chapters 1–3 are already done. Generate **preface, 11, and 18 first** (the arc's opening page, its climax, and the bookend that closes Chapter 1's saffron sunset), then fill in 4–10 and 12–17.

**Character canon — Krishna** (paste into any prompt where he appears): *muted peacock-blue skin, gentle oval face, long dark wavy hair, a single peacock feather, gold crown, soft golden halo, floral garland, saffron-gold garments, calm compassionate expression, elegant proportions — never hyper-muscular, never exaggerated.*

**Character canon — Arjuna**: *athletic build, bronze-gold armor, white dhoti, red sash, the bow Gandiva, expressive eyes, human vulnerability. He grows across the book — visibly unresolved and slack early, composed and upright by Chapter 18.*

---

- [ ] **`assets/gita-covers/chapter-0.jpg` — Before You Begin (preface)**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, flat decorative perspective, gouache texture on parchment, soft natural light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds, simple bottom third. No text or watermarks of any kind.
> Scene: an empty chariot stands still at the edge of a wide, bare plain at first light. The reins rest loose across the rail. No horses are harnessed, no driver, no warrior, nobody at all. The plain ahead is open and featureless. The journey has not begun.
> Emotion: a held breath before departure.
> Palette: Warm Ivory `#FFF8E7` sky, Indigo `#303F9F` plain, Gold `#D4AF37` rim-light along the chariot.
> Exclude: any figure, any book, any weapon.

- [ ] **`assets/gita-covers/chapter-11.jpg` — The Universal Form**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Arjuna — athletic, bronze-gold armor, white dhoti, red sash — is tiny at the very bottom of the frame, on his knees, one arm raised to shield his eyes. Above and around him fills a vast luminous abstract form: not a figure with limbs and faces, but suggestion — concentric burning wheels, countless faint eyes, whole worlds visible inside the light. This is the one image in the system permitted overwhelming scale.
> Emotion: terrified wonder — awe, never horror.
> Palette: Indigo `#303F9F` to Peacock Teal `#00796B` ground, a vermillion-and-gold burst at the center.
> Exclude: gore, devouring mouths, crushed bodies, any legible face on the cosmic form.

- [ ] **`assets/gita-covers/chapter-18.jpg` — Liberation and Surrender**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, soft natural light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Arjuna (bronze-gold armor, white dhoti, red sash, the bow Gandiva) and Krishna (peacock-blue skin, peacock feather, gold crown, saffron-gold garments) stand side by side seen from behind, small against a wide golden sunrise and an open horizon. Arjuna holds the bow loosely at his side — not raised, not dropped, simply carried. His posture is fully resolved and upright. The chariot waits unremarked at the frame's edge.
> Emotion: quiet resolve; the argument is over.
> Palette: Deep Saffron `#E65100` into Turmeric Yellow `#FFC107`.
> Exclude: battle, drawn bow, any third figure. This image is the deliberate bookend to Chapter 1's saffron sunset and collapsed posture — same two figures, same bow, opposite stance, opposite light.

- [ ] **`assets/gita-covers/chapter-4.jpg` — Krishna's Secret**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Krishna (muted peacock-blue skin, peacock feather, gold crown, golden halo, saffron-gold garments, calm expression) stands luminous and alone in a warm golden void, one hand raised in a teaching mudra. Behind him, three faint translucent silhouettes of earlier forms recede into the light like after-images, each less distinct than the last.
> Emotion: a secret older than the listener.
> Palette: Gold `#D4AF37` void, Krishna's peacock-blue, Turmeric `#FFC107` halo.
> Exclude: throne, chariot, Arjuna, any background architecture.

- [ ] **`assets/gita-covers/chapter-5.jpg` — Peace in Action**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: an extreme close-up of a single lotus **leaf** resting on still dark water. One perfect droplet of water beads on its surface, about to roll off, leaving no trace behind it.
> Emotion: engaged, yet untouched.
> Palette: Banyan Green `#388E3C` leaf, Indigo `#303F9F` water, one Warm Ivory highlight on the droplet.
> Exclude: any hand, any figure, and critically **no lotus flower or petals** — this is the leaf, not the bloom.

- [ ] **`assets/gita-covers/chapter-6.jpg` — The Art of Meditation**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single yogi sits beneath one broad, ordinary upright tree on an otherwise empty hillside, spine straight, eyes closed. Seen from a middle distance so the figure is small and the negative space is large.
> Emotion: steady attention.
> Palette: Peacock Teal `#00796B` hillside, Turmeric `#FFC107` light, Banyan Green `#388E3C` tree.
> Exclude: birds, water, a second figure, any ornament. The tree is upright and unremarkable.

- [ ] **`assets/gita-covers/chapter-7.jpg` — Knowledge of the Divine**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Krishna (peacock-blue, peacock feather, gold crown, saffron-gold garments) stands in silhouette at the edge of a vast still lake at sunrise, seen from far back and low. One hand just touches the water's surface, sending a single ring of ripples spreading outward across the entire frame.
> Emotion: the one behind the many.
> Palette: Turmeric `#FFC107` sky, Peacock Teal `#00796B` water.
> Exclude: Arjuna, boats, buildings, any second ripple source.

- [ ] **`assets/gita-covers/chapter-8.jpg` — The Imperishable**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single steady flame burns inside a niche cut into an old stone wall. The wall itself is visibly crumbling — its edges dissolving into drifting sand and dust — while the flame stands perfectly upright and completely untouched.
> Emotion: what decays, and what does not.
> Palette: Indigo-charcoal wall, Deep Saffron `#E65100` flame, Gold `#D4AF37` drifting dust.
> Exclude: any figure, shrine, offering, or deity. The subject is the decaying wall, not the lamp.

- [ ] **`assets/gita-covers/chapter-9.jpg` — The Royal Secret**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: two hands meet at the center of an otherwise empty warm-ivory frame — one offering a single small flower, the other receiving it with an open palm. Both hands are cropped at the wrist. The hands are still, and meeting.
> Emotion: the divine accepts what is small.
> Palette: Vermillion `#DC143C` sleeve, Lotus Pink `#E91E63` flower, Warm Ivory `#FFF8E7` ground.
> Exclude: faces, bodies, background detail of any kind, and any sense of motion or release.

- [ ] **`assets/gita-covers/chapter-10.jpg` — Divine Splendor**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Krishna (peacock-blue, gold crown, peacock feather, calm expression) sits at the center of a radiating sun-disc. Its rays extend outward and resolve, at their very tips, into tiny suggestions of the things he says he is — one mountain peak, one river, one tree, one star — each rendered as a small icon no larger than a fingernail.
> Emotion: the infinite hidden in the everyday.
> Palette: Turmeric `#FFC107` into Deep Saffron `#E65100`, Gold `#D4AF37` linework.
> Exclude: crowds, a second figure, any large secondary subject competing with the disc.

- [ ] **`assets/gita-covers/chapter-12.jpg` — The Path of Love**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, soft warm light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Krishna and Arjuna stand at plain human scale, facing each other, close and quiet. Arjuna's hand rests over his own heart; Krishna simply watches him, unhurried. Deliberately the smallest, most human, least grand image in the entire book — it follows the cosmic vision and answers it with intimacy.
> Emotion: relief; the near, not the vast.
> Palette: Lotus Pink `#E91E63` into Vermillion `#DC143C`, soft Warm Ivory ground.
> Exclude: halo, cosmic scale, chariot, radiance, crowds.

- [ ] **`assets/gita-covers/chapter-13.jpg` — The Field and Its Knower**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: one seated silhouette, rendered as a perfect vertical split. The left half of the body is filled entirely with a tilled field — furrows, crops, worked earth, all inside the outline. The right half is empty and unlit, with a single still point of gold light where the heart would be.
> Emotion: the watcher inside the worked ground.
> Palette: Banyan Green `#388E3C` field, Indigo `#303F9F` void, Gold `#D4AF37` point of light.
> Exclude: a face, any facial features, a second figure.

- [ ] **`assets/gita-covers/chapter-14.jpg` — Three Threads of Nature**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a seated figure seen from behind wears a plain cloth visibly **woven** from three colored threads — turmeric gold, vermillion red, and charcoal indigo. One thread has been drawn loose from the weave and is held lightly in the figure's hand, being examined. The cloth is the person; the loose thread is the recognition.
> Emotion: seeing what you are made of.
> Palette: Turmeric `#FFC107`, Vermillion `#DC143C`, Indigo-charcoal.
> Exclude: a braided circle of threads with no figure — that is the separate Three Gunas concept cover and these two must not resemble each other. This image has a figure and a woven cloth.

- [ ] **`assets/gita-covers/chapter-15.jpg` — The Supreme Person**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: the cosmic tree hangs **upside down**. Its roots reach up into golden light at the top of the frame; its branches and leaves spread downward toward the earth below. One small figure stands at the very bottom, looking up. The inversion should be unmistakable — the composition should feel briefly wrong.
> Emotion: the source is above, not below.
> Palette: Banyan Green `#388E3C` foliage, Turmeric `#FFC107` root-light.
> Exclude: any upright tree. This is the only inverted tree in the system and the inversion is the whole point.

- [ ] **`assets/gita-covers/chapter-16.jpg` — Divine and Demonic Natures**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single figure stands at a fork in a plain dirt path, seen from behind, at ground level. The left branch is lit and strewn with scattered petals; the right recedes into flat shadow, bare. Neither is dramatized — no monsters, no fire, no threat. Just two ordinary paths, and the choosing.
> Emotion: an unremarkable, decisive moment.
> Palette: Turmeric `#FFC107` lit path against Indigo-charcoal shadow.
> Exclude: demons, flames, skulls, any supernatural threat; and no wide mountain vista of many converging paths (that is the Dharma concept cover).

- [ ] **`assets/gita-covers/chapter-17.jpg` — Three Kinds of Faith**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: three small offerings laid out side by side on plain ground, and nothing else in the frame. The first is arranged with care on clean cloth. The second is showy and over-decorated, arranged to be seen. The third is dropped carelessly, half-spilled. The same act, three intentions — the offerings alone tell it.
> Emotion: the same act, three intentions.
> Palette: Gold `#D4AF37`, Vermillion `#DC143C`, and a dull gray-ochre.
> Exclude: any figure, any shrine, and **no lamp or flame** — that motif is reserved for other items.

---

# Round 2 — Regenerate the six low-res concept covers (6 images)

Same prompts as before; the only defect is output size. Current files are **408×617** — non-square and a sixth of target. Overwrite each existing file, but note the extension change to `.jpg` (the old `.png` files should be deleted during wiring).

- [ ] **`assets/images/covers/dharma-cover.jpg` — Dharma**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: several thin paths of different colors wind up one mountainside from its base, converging at a single point of gold light at the summit. Seen wide.
> Emotion: quiet order.
> Palette: Banyan Green `#388E3C` slopes, Gold `#D4AF37` summit.
> Exclude: any figures on the paths; any rivers (rivers belong to the Bhakti Paths cover).

- [ ] **`assets/images/covers/moksha-cover.jpg` — Moksha**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single bird rises past the open top of an ornate gold cage that hangs suspended with no ground beneath it, its wings just clearing the bars, open pale sky above.
> Emotion: release.
> Palette: Warm Ivory `#FFF8E7` sky, Gold `#D4AF37` cage, Peacock Teal `#00796B` bird.
> Exclude: any figure, any second bird, any tree or branch.

- [ ] **`assets/images/covers/three-gunas-cover.jpg` — The Three Gunas**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: three ribbon-thin threads — turmeric gold, vermillion red, charcoal indigo — braid slowly around each other in a perfect circle against an empty ground.
> Emotion: balanced tension.
> Palette: Turmeric `#FFC107`, Vermillion `#DC143C`, Indigo-charcoal.
> Exclude: **any figure, any person, any cloth or garment** — the threads are bare and the center of the circle is empty. (Gita Chapter 14 uses these same three threads woven into a seated figure's clothing; these two images must not resemble each other.)

- [ ] **`assets/images/covers/ahimsa-cover.jpg` — Ahimsa**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single open palm faces the viewer in extreme close-up, fingers relaxed. Just behind it, the faint outline of a closed fist dissolves into gold light.
> Emotion: restraint chosen, not weakness.
> Palette: Warm Ivory `#FFF8E7`, Banyan Green `#388E3C` accent line.
> Exclude: any face, any weapon, any second hand.

- [ ] **`assets/images/covers/samsara-cover.jpg` — Samsara**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a wheel formed from four seasonal motifs — a spring shoot, a summer flame, an autumn leaf, a winter star — turns around one still, unlit point at its center. Daylight.
> Emotion: motion around stillness.
> Palette: Banyan Green, Vermillion, Turmeric and Indigo arranged around a Warm Ivory center.
> Exclude: any figure; any river (a river bent into a circle belongs to the Vishnu Purana cover).

- [ ] **`assets/images/covers/bhakti-paths-cover.jpg` — Bhakti & the Paths of Yoga**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: several thin rivers of different jewel tones converge from a wide horizon into one calm, gold-lit ocean at the bottom of the frame.
> Emotion: many ways, one arrival.
> Palette: Lotus Pink `#E91E63`, Peacock Teal `#00796B`, Gold `#D4AF37` ocean.
> Exclude: devotees, temples, any figure; and no mountain paths (those belong to the Dharma cover). Rivers are this item's vehicle alone.

---

# Round 3 — The six unillustrated concepts (6 images)

Generate **What is Hinduism? first** — it is the literal first content item a new user opens.

- [ ] **`assets/images/covers/hinduism-overview-cover.jpg` — What is Hinduism?**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, bird's-eye view, simple bottom third. No text or watermarks.
> Scene: a circular temple courtyard seen from directly above, open to a clear sky. Many doorways of different sizes and architectural styles pierce the courtyard's outer wall all the way around — every one of them standing open, every one leading into the same single empty courtyard.
> Emotion: many ways in, one place.
> Palette: Warm Ivory `#FFF8E7` courtyard, Deep Saffron `#E65100` and Peacock Teal `#00796B` doorways, Gold `#D4AF37` linework.
> Exclude: figures, idols, crowds; and no rivers, no mountain paths, no tree — doorways are this item's vehicle alone.

- [ ] **`assets/images/covers/branches-of-hinduism-cover.jpg` — The Four Great Streams**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: one old banyan tree seen straight on, a single broad trunk dividing into exactly four great boughs of equal weight. Each bough's foliage is a different jewel tone — teal, vermillion, gold, deep green — while the trunk and roots are one continuous unbroken color.
> Emotion: one root, four canopies.
> Palette: Peacock Teal, Vermillion, Turmeric and Banyan Green foliage over a Warm Ivory sky, Gold `#D4AF37` trunk linework.
> Exclude: figures, temples; the tree is **upright** (an inverted tree belongs to Gita Chapter 15) and has **no yogi beneath it** (that is Chapter 6). Despite the item's name, use no rivers or streams.

- [ ] **`assets/images/covers/maya-cover.jpg` — Maya**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, dusk light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a coiled rope lies across a path at dusk. Where the fading light falls on it, it is unmistakably rope — fiber, twist, a frayed end. Where the shadow deepens, the very same coil reads as a serpent, raised and alive. One object, two readings, rendered as a single continuous form so the eye cannot settle on either.
> Emotion: not fake — misread.
> Palette: Indigo `#303F9F` shadow, Deep Saffron `#E65100` low light, Warm Ivory `#FFF8E7` path.
> Exclude: any figure; a snake's face or fangs; and do not illustrate maya as a veil, a mask, or a mirage — the rope-and-serpent is the canonical image and carries the actual doctrine.

- [ ] **`assets/images/covers/brahman-atman-cover.jpg` — Brahman & Atman**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single plain clay pot stands on open ground under a vast night sky. The space inside the pot and the space of the sky beyond it are painted as one continuous, unbroken field of the same deep indigo — and the pot's walls thin to nothing toward the rim, so it becomes impossible to say where the inside ends and the outside begins.
> Emotion: the boundary was never there.
> Palette: Indigo `#303F9F` continuous field, warm terracotta pot, Gold `#D4AF37` rim.
> Exclude: any figure; any water, salt, or dissolving substance (the salt-in-water image belongs to the Svetaketu story).

- [ ] **`assets/images/covers/prana-cover.jpg` — Prana**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, dawn light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a wide, quiet landscape at dawn in which a single invisible current is made visible as pale flowing lines. A field of grass bends along it; one bird aloft rides it; one seated figure at the frame's edge breathes it in. All three move on the same continuous line of air, and the line never breaks between them.
> Emotion: one movement in all things.
> Palette: Warm Ivory `#FFF8E7` dawn, Peacock Teal `#00796B` current, Banyan Green `#388E3C` grass.
> Exclude: a gold thread running out of a person's chest (that belongs to a different item); any anatomical or medical diagram; any chakra illustration.

- [ ] **`assets/images/covers/guru-cover.jpg` — The Guru**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, warm daylight, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: two plain oil lamps rest side by side on a simple surface in warm daylight. One is lit; the second is not yet. A hand tips the lit lamp gently toward the unlit one, and the flame is caught in the instant of passing — belonging to neither lamp, in between. The lit lamp is not diminished.
> Emotion: what is given away is not lost.
> Palette: Warm Ivory `#FFF8E7` ground, Gold `#D4AF37` lamps, Deep Saffron `#E65100` flame.
> Exclude: faces; a seated teacher and student (that composition belongs solely to the Upanishads scripture cover); darkness or night — this is the only lamp image in the system set in **daylight**, and the only one with **two** lamps.

---

# Round 4 — The four remaining deities (4 images)

Highest collision risk in the system. **Parvati must not read as Durga; Saraswati must not read as Lakshmi.** Generate the pairs together and compare them side by side at thumbnail size before accepting.

- [ ] **`assets/images/covers/brahma-cover.jpg` — Brahma**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Brahma sits on an open lotus rising from dark still water — aged and serene rather than powerful, warm ochre-rose skin, white beard. He has four faces turned to the four directions, but the composition shows only two fully, with a third implied in profile. A single **closed** manuscript rests on his lap; a plain water-pot sits beside him. Nothing else.
> Emotion: creation, at rest.
> Palette: Warm Ivory `#FFF8E7` robes, Gold `#D4AF37` lotus, Indigo `#303F9F` water.
> Exclude: Vishnu; a navel-lotus cosmogony scene; a fifth head; a flat frontal display of all four faces; an **open** book (open books belong to Ganesha and Basant Panchami). The lotus here is a seat, not the subject.

- [ ] **`assets/images/covers/parvati-cover.jpg` — Parvati**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, cool light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Parvati sits alone in tapas on a bare Himalayan rock, utterly still, in falling snow — warm ochre skin, two arms, plainly dressed, minimal jewelry, hair simply bound. Beside her, a single green shoot has pushed up through a crack in the rock.
> Emotion: love as patience, not passion.
> Palette: cool gray-white rock and snow, Banyan Green `#388E3C` shoot, one Lotus Pink `#E91E63` accent.
> Exclude: **a lion, a crown, weapons, extra arms, and gold-and-vermillion robes** — every one of those belongs to Durga, and Parvati must not be confusable with her at card size. Also exclude Shiva, any wedding scene, and any Ardhanarishvara composite.

- [ ] **`assets/images/covers/lakshmi-cover.jpg` — Lakshmi**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single lotus opens on still water, seen from just above the surface. Beneath the water, at its roots, gold coins rest half-buried in the silt — visible but submerged, holding the flower up. Nothing falls from the sky.
> Emotion: abundance that has roots.
> Palette: Lotus Pink `#E91E63` bloom, Gold `#D4AF37` beneath the water, Peacock Teal `#00796B` water.
> Exclude: **falling or showering coins, and elephants spraying water** — these are the clichés the entire system exists to avoid. Also exclude lamps (Diwali's), and any close-up of a lotus *leaf* with a droplet (Gita Chapter 5's).

- [ ] **`assets/images/covers/saraswati-cover.jpg` — Saraswati**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: Saraswati sits on plain rock at a river's edge in unbleached white cloth with almost no ornament — deliberately the least decorated figure in the entire system. The veena rests across her lap, unplayed, her hands still. One swan sits calm on the water beside her.
> Emotion: knowledge, before it is spoken.
> Palette: Warm Ivory `#FFF8E7`, Peacock Teal `#00796B` river, Gold `#D4AF37` veena inlay.
> Exclude: a lotus seat (that is Lakshmi's and Brahma's); **any yellow** (yellow belongs to her festival, Basant Panchami, not to her); Brahma; heavy ornament; any book; and any sense of performance — the veena is at rest.

---

# Round 5 — Festivals (7 images)

Calendar order, not doc order. Janmashtami and Ram Navami are *wrong*, not merely missing — they currently display another content item's artwork.

- [ ] **`assets/images/covers/janmashtami-cover.jpg` — Krishna Janmashtami**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, night, slender gold-and-floral border. 1:1 square, ground-level view. No text or watermarks.
> Scene: a single small barred window glows with warm lamplight from within a dark prison wall at midnight. No figure is visible through the window. One small star sits directly above the wall outside. The whole frame is the wall; the light is tiny.
> Emotion: divinity arriving unnoticed by the powerful.
> Palette: Indigo-charcoal wall, Deep Saffron `#E65100` window-glow.
> Exclude: **Krishna himself, an infant, any figure** — this cover currently wrongly borrows Krishna's deity portrait, and that is exactly the collision being fixed.

- [ ] **`assets/images/covers/ganesh-chaturthi-cover.jpg` — Ganesh Chaturthi**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a small unpainted clay figure sits gently on a plain doorstep threshold, one marigold garland looped beside it, the home's dark doorway open just behind. The clay is raw and unfinished — it has not been painted, and it will be returned to water.
> Emotion: welcoming the one who removes obstacles.
> Palette: warm terracotta, Gold `#D4AF37`, Turmeric `#FFC107` marigold.
> Exclude: a broken tusk or an open book (those are the Ganesha deity cover); crowds; processions; a finished painted idol.

- [ ] **`assets/images/covers/makar-sankranti-cover.jpg` — Makar Sankranti**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a single kite lifts off the bottom edge of the frame into a sky that brightens from indigo dawn to gold as it rises.
> Emotion: turning toward the light.
> Palette: Indigo `#303F9F` into Turmeric `#FFC107`.
> Exclude: children, rooftops, crowds, other kites, a visible string-holder.

- [ ] **`assets/images/covers/basant-panchami-cover.jpg` — Basant Panchami**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: one yellow mustard-flower bloom rests beside a single open, unmarked book, with a few loose petals scattered near the spine. A plain surface, nothing else.
> Emotion: new knowledge, new season.
> Palette: Turmeric `#FFC107`, Warm Ivory `#FFF8E7`.
> Exclude: Saraswati herself, a veena, a swan — those belong to her deity cover, which deliberately carries no yellow. This festival owns the yellow.

- [ ] **`assets/images/covers/maha-shivratri-cover.jpg` — Maha Shivratri**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, total darkness, slender gold-and-floral border. 1:1 square, extreme close-up. No text or watermarks.
> Scene: a single small oil lamp burns before a plain, unmarked stone in complete darkness, its light barely reaching the stone's surface.
> Emotion: stillness offered to the formless.
> Palette: Indigo-charcoal ground, Deep Saffron `#E65100` flame.
> Exclude: Shiva himself, a trident, a serpent, a crescent moon, any shrine architecture, any figure. This is the only lamp image in the system set in **total darkness** and the only one with a bare stone.

- [ ] **`assets/images/covers/holi-cover.jpg` — Holi**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, pale early-spring light, slender gold-and-floral border. 1:1 square, panoramic. No text or watermarks.
> Scene: loose clouds of colored powder — pink, gold, teal, vermillion — drift and cross in open air against a pale early-spring sky, with only the barest suggestion of upturned hands at the very bottom edge.
> Emotion: joyful release; forgiveness.
> Palette: **the one image in the entire system permitted this many colors at once** — Lotus Pink, Turmeric, Peacock Teal, Vermillion — because the festival's meaning *is* the color.
> Exclude: faces, crowd detail, water guns, any modern element.

- [ ] **`assets/images/covers/ram-navami-cover.jpg` — Ram Navami**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, dawn light, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: dawn light breaks over a plain palace courtyard, empty except for a single lit lamp at its center. The birth is suggested by the courtyard filling with light, not by any figure.
> Emotion: a promise-keeper's arrival.
> Palette: Deep Saffron `#E65100` into Gold `#D4AF37`.
> Exclude: **Rama himself, an infant, parents, a crowd** — this cover currently wrongly borrows the Ramayana scripture cover, and Rama's own deity cover is separate again.

---

# Round 6 — Raja Yoga (1 image)

Currently a bare string path in `yogaAndPractices.ts` — React Native renders nothing at all for it.

- [ ] **`assets/images/covers/raja-yoga-cover.jpg` — Raja Yoga**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a perfectly still lake fills the lower half of the frame, reflecting eight faint gold steps that rise from the water's surface into open sky — leading inward rather than to any visible destination.
> Emotion: disciplined ascent.
> Palette: Indigo `#303F9F` water, Gold `#D4AF37` steps.
> Exclude: any figure; any staircase touching solid ground; any temple or building at the top.

---

# Round 7 — Scriptures (2 images)

Both are bare string paths today. Lowest priority — scriptures are outside the guided journey and reached only through the Wisdom Hub.

- [ ] **`assets/images/covers/upanishads-cover.jpg` — The Upanishads**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, slender gold-and-floral border. 1:1 square, focal subject in the upper two-thirds. No text or watermarks.
> Scene: a student sits close before a seated teacher beneath one spreading tree, both figures small against a wide expanse of warm parchment negative space. A single oil lamp sits on the ground between them — the only light source, and the only object in the frame besides the two figures.
> Emotion: quiet inquiry.
> Palette: Warm Ivory `#FFF8E7` ground, Gold `#D4AF37` linework, Deep Saffron `#E65100` flame.
> Note: this is the **canonical teacher-and-student composition** for the whole app. No other item may use it.

- [ ] **`assets/images/covers/vishnu-purana-cover.jpg` — Vishnu Purana**

> Modern Editorial Miniature: contemporary editorial illustration inspired by Rajput and Pahari miniature painting. Fine hand-painted outlines, gouache texture on parchment, night, slender gold-and-floral border. 1:1 square, cosmic scale. No text or watermarks.
> Scene: a slow, wide river bends fully around itself into a complete closed circle against a star-flecked indigo sky. No boats, no banks, no figures — endless cycles of creation and dissolution.
> Emotion: vast calm.
> Palette: Indigo `#303F9F` into Peacock Teal `#00796B`, gold linework tracing the circle.
> Exclude: Vishnu himself; any seasonal or elemental wheel (a wheel of four seasonal motifs belongs to the Samsara concept cover). This one is a river, at night, and empty.

---

## Progress

| Round | Items | Done |
|---|---|---|
| 1 — Gita | 16 | 0 |
| 2 — Concept regen | 6 | 0 |
| 3 — New concepts | 6 | 0 |
| 4 — Deities | 4 | 0 |
| 5 — Festivals | 7 | 0 |
| 6 — Raja Yoga | 1 | 0 |
| 7 — Scriptures | 2 | 0 |
| **Total** | **42** | **0** |

Phase 2 (40 more: 7 Ramayana kandas, 6 Upanishads, 20 stories, 7 prayers) is scoped in spec Part 5 with tier/archetype/palette assigned per item; compose its prompts into this file once Phase 1 is wired.
