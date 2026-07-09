# Bhagavad Gita — Chapter Cover Image Specs

Image generation spec for the 18 chapter cover images of the Bhagavad Gita section of the Dharma app. Each prompt below is self-contained — an image-generation agent should be able to work from a single chapter's section without needing the rest of this document, other than the shared style guide, which applies to every chapter.

## Why this spec exists

The app currently ships one real chapter image (Chapter 1, `assets/images/chapters/chapter-1-battlefield.png`) plus three "cover" images for the Gita/Krishna/Dharma sections (`assets/images/covers/*.png`). Chapters 2–18 have no artwork. Those three existing images establish a Rajput/Pahari-Mughal miniature painting style — jewel tones, gold linework, ornate borders — but they are visually **dense**: crowds of tiny figures, wall-to-wall micro-patterning. That reads fine as a static poster but doesn't work well cropped small onto a chapter-list card or a reading-screen hero banner, and it doesn't help a reader quickly grasp what a chapter is about.

This spec keeps the same miniature-painting visual language (so the new images still feel like they belong in this app) but simplifies every composition down to one clear focal idea — a gesture, an emotion, a setting — so each chapter's art does real narrative work instead of just being decoration.

## Shared style guide (applies to every chapter below)

**Format**: 1:1 square master image, 2048×2048px minimum. This matches the existing asset convention (`krishna-cover.png`, `dharma-cover.png` are both 2048×2048). The app's UI center-crops this square down to roughly a 2.2:1 landscape strip for the chapter-list card and ~1.8:1 for the reading-screen hero, both with a dark gradient overlaid on the bottom edge for title text. **Keep the focal subject in the upper two-thirds of the frame**, and keep the bottom third visually simple (open sky, plain ground, unpatterned fabric) so it still reads well once cropped and text is overlaid.

**Art style**: Traditional Rajput/Pahari-Mughal miniature painting — flat narrative perspective (no photographic depth-of-field), fine gold linework, rich saturated jewel-tone color fields, traditional iconography for divine figures (crown, jewelry, subtle halo). Border: a **slender** decorative gold/floral trim, thinner and simpler than the thick, densely patterned borders on the existing cover images — it should frame the scene without competing with it.

**Composition rule — keep it simple**: Maximum 1–3 figures per image. One clear focal gesture or action per image — a reader should be able to tell what's happening in under two seconds. Generous negative space (plain sky, still water, open ground) instead of dense background patterning. Background elements limited to one or two symbolic motifs (a single tree, a suggested mountain silhouette, a few stars) rather than fully rendered landscapes or crowds.

**Recurring characters** — render consistently across all 18 images:
- **Krishna**: blue-toned skin, peacock-feather crown, yellow/gold dhoti, serene half-smile, subtle golden halo. Gesture varies by chapter (raised teaching hand, flute, open palm) but his face and dress stay consistent.
- **Arjuna**: warrior build, saffron or white dhoti with light armor, the bow Gandiva as a recurring prop (strung, unstrung, held, or set aside depending on the chapter's emotional beat).

**Palette**: Draw from the app's design-system colors — Deep Saffron `#E65100`, Turmeric Yellow `#FFC107`, Peacock Teal `#00796B`, Indigo Blue `#303F9F`, Lotus Pink `#E91E63`, Sacred Vermillion `#DC143C`, Banyan Green `#388E3C`. Each chapter below is assigned a two-color gradient pair (continuing the `colorTheme` convention already used for Chapters 1–6 in the app's data layer).

**Avoid in every image**: full armies or crowds, weapons clashing or violence, photorealism or 3D rendering, dense micro-patterning that reads as noise at small sizes, any baked-in text or typography, more than 3 named figures, exact devotional icon reproductions (these are original illustrations inspired by the tradition, not copies of specific temple murals).

**Continuity arc**: Chapter 1 opens at a saffron sunset (Arjuna's despair); Chapter 18 closes at a golden sunrise (his resolve) — a deliberate visual bookend across the full reading journey. Chapter 11 (Krishna's cosmic form) is the one chapter allowed a bigger sense of scale and light, but even there the cosmic form stays a single luminous abstract silhouette rather than a busy multi-figure collage.

---

## Chapter 1 — Arjuna Vishada Yoga ("The Warrior's Despair")

**Prompt**: A traditional Rajput miniature painting. Arjuna, a warrior in saffron dhoti and light armor, sits collapsed on the edge of his chariot, his bow Gandiva slipping loose from his trembling hand toward the floor. Krishna stands beside him as charioteer, half-turned toward Arjuna, one hand resting gently on the chariot rail, his expression calm and watchful — not intervening yet, simply present. The battlefield is only suggested in the soft, blurred distance: a couple of faint banners on the horizon, no visible armies or crowds. Warm saffron sunset light. Slender gold floral border. Focal subject (both figures) sits in the upper two-thirds of the frame; the lower third is simple chariot floor and soft ground.

**Emotion**: Grief, paralysis, doubt — the crisis that opens the whole story.

**Palette**: Saffron `#FF6B35` → muted grey-blue.

**Note**: This replaces the existing `chapter-1-battlefield.png`, which is a wide, busy panorama of two full armies — this version deliberately narrows to an intimate two-figure moment instead.

---

## Chapter 2 — Sankhya Yoga ("The Eternal Soul")

**Prompt**: A traditional Rajput miniature painting. Krishna, seated beside Arjuna in the now-still chariot, teaches with one hand raised in a gentle instructive gesture, while his other hand cups a small glowing golden flame of light — representing the eternal soul. Arjuna sits upright now, listening intently, his bow set down beside him rather than in hand. The battlefield and armies are entirely absent from the frame; only open sky surrounds the chariot. Calm, even morning light. Slender gold floral border.

**Emotion**: Clarity dawning, reassurance.

**Palette**: Krishna Blue `#4A90E2` → Lotus Pink `#E91E63`.

---

## Chapter 3 — Karma Yoga ("Action Without Attachment")

**Prompt**: A traditional Rajput miniature painting, close composition. Two hands — Krishna's — open and release a small scatter of flower petals and grain into a gentle wind, not watching where they fall. The scene is set on simple open ground near a riverbank, no chariot, no other figures visible except the hands and a suggestion of Krishna's dhoti sleeve. Soft daylight. Slender gold floral border, plenty of open space around the central gesture.

**Emotion**: Purposeful calm — duty performed freely, without attachment to outcome.

**Palette**: Marigold `#FFB627` → Saffron `#FF6B35`.

---

## Chapter 4 — Jnana Karma Sannyasa Yoga ("Krishna's Secret")

**Prompt**: A traditional Rajput miniature painting. Krishna stands alone, luminous, gold halo prominent, in a soft golden void with minimal background detail. Behind him, one or two faint ghostly outlines of past incarnations are barely visible — translucent, not detailed, just enough to suggest "I have appeared many times before." Krishna's own figure is the clear focal point; the echoes stay subtle and secondary. Slender gold border.

**Emotion**: Quiet revelation, timelessness.

**Palette**: Krishna Blue `#4A90E2` → Marigold `#FFB627`.

---

## Chapter 5 — Karma Sannyasa Yoga ("Peace in Action")

**Prompt**: A traditional Rajput miniature painting, close and intimate. Krishna's hand hovers near a single lotus leaf floating on still water, with one droplet of water beading off its surface, untouched — the classic image of acting in the world without being wetted by it (verse 5.10). No other figures in frame; just the hand, the leaf, and calm water filling most of the composition. Soft, still light. Slender gold border framing the water's edge.

**Emotion**: Serene detachment.

**Palette**: Lotus Pink `#E91E63` → Krishna Blue `#4A90E2`.

---

## Chapter 6 — Atma Samyama Yoga ("The Art of Meditation")

**Prompt**: A traditional Rajput miniature painting. A single yogi figure (Arjuna, transformed for this moment into a meditator) sits cross-legged beneath one tree on a quiet riverbank, spine straight, eyes closed, hands resting in a meditation mudra on his knees. No other figures. Soft dawn light filters through the single tree's leaves. The background is otherwise empty — open ground, calm river in the distance. Slender gold border.

**Emotion**: Stillness, inner discipline.

**Palette**: Krishna Blue `#4A90E2` → Lotus Pink `#E91E63`.

---

## Chapter 7 — Jnana Vijnana Yoga ("Knowledge of the Divine")

**Prompt**: A traditional Rajput miniature painting. Krishna stands alone at the edge of still water at sunrise, the sun rising directly behind him so his silhouette is haloed in gold and orange light, one hand reaching down to touch the water's surface. The composition uses just three elements — Krishna's figure, the rising sun, and the water — to suggest his presence pervading nature (sun, water, all things), without listing every example literally. Slender gold border.

**Emotion**: Reverence, cosmic intimacy.

**Palette**: Turmeric Yellow `#FFC107` → Peacock Teal `#00796B`.

---

## Chapter 8 — Akshara Brahma Yoga ("The Imperishable")

**Prompt**: A traditional Rajput miniature painting, night scene. A single diya (oil lamp) burns steadily in darkness at the center of the composition. Krishna's face is softly illuminated beside it, eyes closed in quiet meditation, as though remembering or being remembered at a moment of transition. The night sky above has only a few scattered stars — not a dense starfield. The lamp is the sole warm light source against the cool indigo darkness. Slender gold border.

**Emotion**: Solemn peace, transcendence.

**Palette**: Indigo Blue `#303F9F` → Turmeric Yellow `#FFC107`.

---

## Chapter 9 — Raja Vidya Raja Guhya Yoga ("The Royal Secret")

**Prompt**: A traditional Rajput miniature painting, close composition centered entirely on two hands meeting: Arjuna's hand offering a single flower, and Krishna's open palm receiving it (echoing verse 9.26 — a leaf, a flower, a fruit, or water, offered with love, is enough). The background is plain and unadorned, with no other figures or scenery visible — the entire image is the gesture itself, rendered large and clear. Slender gold border.

**Emotion**: Intimacy, humility, warmth.

**Palette**: Sacred Vermillion `#DC143C` → Lotus Pink `#E91E63`.

---

## Chapter 10 — Vibhuti Yoga ("Divine Splendor")

**Prompt**: A traditional Rajput miniature painting. Krishna's crowned head and shoulders are haloed by a radiant sun directly behind him, and a single mountain peak is suggested faintly in silhouette below — one clear emblem (sun among lights, a great peak among mountains) rather than a crowded list of every "best of" example from the verse. Open sky fills most of the frame around him. Slender gold border.

**Emotion**: Awe and grandeur, but composed rather than overwhelming — that intensity is saved for Chapter 11.

**Palette**: Turmeric Yellow `#FFC107` → Deep Saffron `#E65100`.

---

## Chapter 11 — Vishvarupa Darshana Yoga ("The Universal Form")

**Prompt**: A traditional Rajput miniature painting — the one chapter permitted greater scale and intensity, as the emotional climax of the set. Arjuna appears small in the foreground, one arm raised to shield his eyes, the other hand near his chest in a gesture of awe and terror. Behind and above him, filling the sky, is a single massive luminous form — rendered as abstract radiant light with only a few faint overlapping outlines of additional arms or heads suggested within the glow, not drawn out in literal, itemized detail. The battlefield ground below stays simple and dim so all visual weight sits in the cosmic light above. Slender gold border, though the light may softly overflow it at the very top edge.

**Emotion**: Overwhelming awe, reverence, fear — the peak of the entire chapter sequence.

**Palette**: Indigo `#303F9F` → Peacock Teal `#00796B`, with a vermillion-and-gold light burst at the core of the luminous form.

---

## Chapter 12 — Bhakti Yoga ("The Path of Love")

**Prompt**: A traditional Rajput miniature painting. After the cosmic vision, Krishna and Arjuna are shown back at ordinary human scale, close together in a simple, warm, intimate composition. Arjuna's hand rests on his own chest, over his heart; Krishna's gaze toward him is gentle and reassuring. No chariot, no battlefield, no other figures — just the two of them against a plain warm-toned background. Slender gold border.

**Emotion**: Tenderness, relief, devotion.

**Palette**: Lotus Pink `#E91E63` → Sacred Vermillion `#DC143C`.

---

## Chapter 13 — Kshetra Kshetrajna Vibhaga Yoga ("The Field and Its Knower")

**Prompt**: A traditional Rajput miniature painting, symbolic rather than narrative. A single human silhouette is rendered so that one half of the body reads as a tilled, growing field (soil furrows and small green shoots), representing the body (kshetra), while a small still point of glowing light sits at the figure's center/heart, representing the soul that knows the field (kshetrajna). No other figures. Minimal background — plain ground and open sky. Slender gold border.

**Emotion**: Contemplative calm.

**Palette**: Banyan Green `#388E3C` → Indigo Blue `#303F9F`.

---

## Chapter 14 — Gunatraya Vibhaga Yoga ("Three Threads of Nature")

**Prompt**: A traditional Rajput miniature painting. A single seated figure (Arjuna or a generic seeker) is shown from a slight distance, with three thin ribbon-like threads or flames — one white/gold (sattva, clarity), one red (rajas, passion), one dark indigo-charcoal (tamas, inertia) — gently braided together in the air just above or around the figure, showing the three qualities' pull without literal labeling. Minimal background. Slender gold border.

**Emotion**: Introspective tension — the pull of competing inner qualities.

**Palette**: Triad — Turmeric `#FFC107` (sattva), Vermillion `#DC143C` (rajas), Indigo-charcoal (tamas).

---

## Chapter 15 — Purushottama Yoga ("The Supreme Person")

**Prompt**: A traditional Rajput miniature painting. The famous inverted cosmic tree — roots reaching upward into golden light at the top of the frame, branches and leaves reaching downward toward the earth — rendered as one elegant, singular tree rather than a dense forest. One small figure stands at its base, looking up. Open sky fills the space around the tree. Slender gold border.

**Emotion**: Wonder, philosophical scale, calm.

**Palette**: Banyan Green `#388E3C` → Turmeric Yellow `#FFC107`.

---

## Chapter 16 — Daivasura Sampad Vibhaga Yoga ("Divine and Demonic Natures")

**Prompt**: A traditional Rajput miniature painting. A single figure stands at a fork in a path: one branch of the path is lit warmly and scattered with lotus petals (the divine qualities), the other recedes into cool shadow (the demonic qualities) — the figure has not yet stepped onto either side. No armies, no crowd, just the one figure and the simple forked path. Slender gold border.

**Emotion**: Moral choice, quiet tension.

**Palette**: Turmeric Yellow `#FFC107` (lit path) contrasted against Indigo-charcoal (shadowed path).

---

## Chapter 17 — Shraddhatraya Vibhaga Yoga ("Three Kinds of Faith")

**Prompt**: A traditional Rajput miniature painting. A single devotee kneels in prayer before a small shrine or lit flame, hands folded. A soft colored aura or glow surrounds the devotee, subtly suggesting the nature of their faith (this can echo the sattva/rajas/tamas triad tones from Chapter 14 for visual continuity, kept as a soft glow rather than distinct threads here). Minimal shrine setting, no crowd. Slender gold border.

**Emotion**: Devotional sincerity.

**Palette**: Sacred Vermillion `#DC143C` → Turmeric Yellow `#FFC107`.

---

## Chapter 18 — Moksha Sannyasa Yoga ("Liberation and Surrender")

**Prompt**: A traditional Rajput miniature painting — the closing image, a deliberate visual echo of Chapter 1. Arjuna stands tall in the chariot, bow Gandiva held with calm, steady resolve — not raised to fight, just held with quiet strength. Krishna stands beside him. Both face forward together toward the horizon, where a golden sunrise is breaking (mirroring Chapter 1's saffron sunset). No battlefield chaos, no other figures — just the two of them, upright and resolved, in warm morning light. Slender gold border.

**Emotion**: Resolve, peace, surrender transformed into quiet strength.

**Palette**: Deep Saffron `#E65100` → Turmeric Yellow `#FFC107` (sunrise gradient).
