# Dharma Illustration Spec

**Version:** 4.1
**Status:** Production Ready
**Supersedes:** v3.0, `bhagavad-gita-chapter-images.md` v1 (Gita chapters only), and the standalone "Dharma Design System v2.0" style guide — all folded into this one document, which is the canonical spec for **every** piece of cover, icon, and interior artwork in the app.

**What changed in 4.1.** The Foundations track (the Jigyasu track — Module 0 of the guided journey, `src/data/foundations.ts`: 8 acts + a capstone) shipped after v4.0 and the spec never caught up with it. Two gaps. First, all nine acts declare a `coverImage` that currently resolves to `generic-cover.jpg` — nine appearances of the fallback, and `foundations.ts` carries a TODO cover shopping list pointing straight at this document. **Module 0 is now literally the first content a new user opens**, ahead of the "What is Hinduism?" concept that v4.0 called the first cover — so these nine are the new highest-priority slice. They are added to Part 5 as their own category, with a governing rule that keeps them clear of the Module 1 concepts they overlap. Second, Foundations shipped the app's first **in-body** illustration — but as code-drawn schematic SVG diagrams (`FoundationFigure.tsx`), not commissioned raster art. Part 4's "cover-only" stance for commissioned art is unchanged and correct; a new **Part 4a** records the figure layer so nobody commissions raster section art for it or is surprised it exists.

**What changed in 4.0.** v3.0 drifted out of sync with the repo in both directions. It listed work as outstanding that had already shipped (Gita chapters 1–3; all six deity covers; the six Module 1 concept covers), and it had no entry at all for the ~114 content items added by the content-expansion commit (20 stories, 7 prayers, 13 scripture parts) or for six philosophy concepts and four deities that were in the data layer all along. Meanwhile the art that *did* ship broke two of the spec's own rules — six concept covers landed at 408×617px against a mandated 2048² master, and files landed as `.jpg` against a mandated `.png`. This version restates every status against the actual data layer, blesses `.jpg` with a real size budget, adds prompts for every outstanding item on a user-reachable surface, and adds a Phase 2 backlog for stories, prayers, and scripture parts.

Image generation spec for all illustration in the Dharma app. Each per-item prompt is self-contained — an image-generation agent should be able to work from a single item's entry without needing the rest of this document, other than the shared style guide in Part 1, which applies to everything.

---

# Part 1 — Shared Style Guide

## Vision

Dharma illustrations communicate timeless spiritual truths through a modern editorial interpretation of Indian miniature painting. Rather than functioning as literal storybook illustrations, every image distills the central teaching into a single memorable visual. The artwork should evoke contemplation before the user reads any text.

## Design Principles

Every illustration should be timeless, symbolic, elegant, calm, spiritually uplifting, visually distinct, instantly recognizable, mobile-first, and museum quality. Avoid sensationalism, excessive drama, or fantasy aesthetics.

## Artistic Style — "Modern Editorial Miniature"

Inspired by Rajput miniature painting, Pahari miniature painting, Mughal manuscript illustration, and contemporary editorial illustration. The goal is not historical recreation — it's a premium visual language equally at home in a museum, a printed art book, and a mobile app.

**Line work**: fine hand-painted outlines, delicate ornamental detailing, crisp silhouettes, decorative but readable.
**Perspective**: mostly flat, mild depth layering, minimal foreshortening, decorative spatial composition.
**Texture**: hand-painted gouache appearance, soft parchment texture, visible brush character — never glossy or digital-looking.
**Lighting**: soft and natural — sunrise, sunset, golden hour, diffused daylight, or moonlight for contemplative scenes. Avoid cinematic lighting.

## Color Palette

Rich but restrained jewel tones, pulled from the app's own design system plus a small set of illustration-only extensions:

| Name | Hex | Source |
|---|---|---|
| Deep Saffron | `#E65100` | app design system |
| Turmeric Yellow | `#FFC107` | app design system |
| Peacock Teal | `#00796B` | app design system |
| Indigo Blue | `#303F9F` | app design system |
| Lotus Pink | `#E91E63` | app design system |
| Banyan Green | `#388E3C` | app design system |
| Sacred Vermillion | `#DC143C` | illustration-only |
| Gold | `#D4AF37` | illustration-only |
| Warm Ivory | `#FFF8E7` | illustration-only |

Never oversaturate. Each item below is assigned a two- or three-color pairing from this table.

## Editorial Philosophy

**Do not illustrate the event. Illustrate the idea.** Instead of "what happened," always ask "what truth is this teaching?" Bad: Krishna speaking inside a chariot. Good: humanity joyfully performing selfless work.

## Illustration Hierarchy

Each item should sit at the highest tier it can:

- **Tier 1 — Philosophical Visualization (preferred)**: illustrate the teaching itself (karma, meditation, devotion, the three gunas).
- **Tier 2 — Symbolic Narrative**: illustrate an important story while emphasizing symbolism over historical realism (Vishvarupa communicates infinity, not documentary accuracy).
- **Tier 3 — Historical Narrative**: only when the event itself is essential (Arjuna dropping his bow, Krishna driving the chariot).

## Character System

Characters are visual anchors, not mandatory — if a stronger symbolic image exists, prioritize the symbol. Every character below must render consistently across every surface they appear on (chapter covers, deity covers, festival covers, story covers) — a reader should recognize Krishna instantly whether he's on a Gita chapter cover or the Janmashtami festival cover.

**Krishna** — muted peacock-blue skin; gentle oval face; long dark wavy hair; single peacock feather; gold crown; soft golden halo; floral garland; saffron-gold garments; calm compassionate expression; graceful mudras; elegant proportions. Never hyper-muscular, never exaggerated.

**Arjuna** — athletic build; bronze-gold armor; white dhoti; red sash; the bow Gandiva; expressive eyes; human vulnerability. Grows emotionally across the Gita — his art should read as visibly less resolved in early chapters, more resolved by Chapter 18.

**Rama** — warm bronze-gold skin, deliberately distinct from Krishna's peacock-blue; plain dark hair, no crown in forest scenes, a plain gold circlet only in palace scenes; the Kodanda bow always near at hand; plain white or unbleached dhoti — his signature is restraint, not ornament; minimal jewelry. Never shown mid-battle or drawing the bow in anger; never as ornamented as Krishna.

**Ganesha** — warm gold-ochre elephant head, gentle rounded features; a single tusk (the other set aside, never dramatized); soft rounded body; a slender crescent moon in the crown; one lotus and one modak held lightly, not a full arsenal of attributes; warm, unhurried, faintly amused expression. Never fierce, never cluttered with every traditional attribute at once.

**Shiva** — ash-pale or moonlit blue-white skin; matted hair (jata) crowned with a slender crescent moon; a single stylized serpent at the throat, a thin blue river-thread from the hair; the trishula held at rest, never raised; simple tiger-skin or plain cloth wrap; eyes closed or half-closed. Never shown with an active third eye, never wrathful, never surrounded by cremation-ground imagery — this system's Shiva is the ascetic at rest, not Bhairava.

**Hanuman** — deep vermillion-orange figure; folded hands (anjali mudra) as the default pose; the mace (gada) held at rest, never mid-swing; simple dhoti, minimal ornament; tail rendered as a graceful line, not a cartoon flourish; eyes calm and lowered in devotion. Reserve mid-leap, mountain-carrying poses for the one narrative moment that calls for them — never his default portrait.

**Durga** — radiant gold-and-vermillion palette; crowned, at rest, never mid-battle; a graceful few arms (four is enough), each holding one symbol, never all ten traditional weapons; a lion present but calm at her side, never lunging; expression serene and protective. Never shown with the slaying of Mahishasura depicted literally — illustrate the protection she offers, not the myth's violence.

**Brahma** — aged and serene rather than powerful; warm ochre-rose skin; four faces turned to the four directions, of which only two or three are ever visible at once (never a flat frontal display of all four, and never the discarded fifth head); white beard; a lotus seat; a single closed manuscript and a plain water-pot as his only attributes. Never shown with Vishnu, never emerging from a navel-lotus — this system's Brahma is the creator at rest, not a scene from a cosmogony.

**Parvati** — warm ochre skin; two arms; simple mountain dress, minimal jewelry; hair plainly bound; no weapons and **no lion** — she must never be confusable with Durga, whose palette is gold-and-vermillion and who always has a lion. Parvati's register is cool: Himalayan rock, snow, green shoot. Her signature is patience, not power. Never shown as half of an Ardhanarishvara composite, and never in a wedding scene.

**Lakshmi** — rose-gold and Lotus Pink; two arms (four at most), one lotus held, one palm open in giving; seated on or beside an open lotus, always in contact with still water; unhurried, gently amused expression. **Never a shower of falling coins, never flanked by spraying elephants** — the cliché the whole system exists to avoid. Abundance here is rooted and quiet, not raining.

**Saraswati** — plain white or unbleached cloth, almost no ornament — the least ornamented figure in the entire canon, deliberately; two arms; the veena held or resting, never mid-performance; a single swan, calm on water; seated on plain rock or plain ground, **never on a lotus** (that is Lakshmi's seat and Brahma's). Never shown with Brahma. Never yellow-clad — the yellow belongs to her festival, Basant Panchami, not to her.

## Environment Library

Approved: Kurukshetra battlefield, sacred rivers, lotus ponds, banyan groves, Himalayan foothills, forest hermitages, temple courtyards, village life, palace architecture, celestial realms, home thresholds and courtyards (for festivals). Nature should feel idealized, never photorealistic.

## Border System

Every illustration uses the canonical Dharma border: floral vines, lotus motifs, gold ornament, decorative corners, thin elegant framing. Border thickness stays consistent across the whole product — **slender**, framing the scene without competing with it (thinner than the dense, heavy borders on the app's earliest cover images).

## Ornament & Symbol Library

Ornaments: lotus, peacock feather, conch, wheel, temple bells, garland, sacred geometry, floral scrollwork, hanging lamps. Never overcrowd.

Symbols, and the single idea each should carry: lotus → spiritual unfolding · river → flow of life · sunrise → awakening · moon → contemplation · lamp → knowledge · tree → wisdom · mountain → permanence · wheel → dharma · roots/seed → hidden cause and karma · birds → liberation · bridge → transition · mirror → self-awareness · path → spiritual journey. Every illustration should intentionally choose symbols that reinforce its specific lesson — not a generic assortment.

## Composition Diversity & Camera Language

Archetypes to rotate between: Narrative, Portrait, Panorama, Landscape, Mandala, Diagrammatic, Vertical, Split Composition, Triptych, Cosmic, Symbolic Still Life. No two *consecutive* items within the same category (chapters, deities, festivals, etc.) should share an archetype. Rotate camera viewpoints the same way — close portrait, wide panorama, bird's-eye, ground level, cross-section, circular framing — never repeating the same viewpoint twice in a row within a category.

## Mobile-First Composition & Crop Safety

Artwork is designed primarily for landscape cards, cropped from a square master. Requirements: strong focal point, large readable figures, clear silhouette, minimal clutter, crop-safe composition, balanced negative space. **Keep the focal subject in the upper two-thirds of the frame**; keep the bottom third visually simple (open sky, still water, plain ground) so it survives cropping and a title overlay.

## Text & Signature Rules

Artwork must contain no titles, chapter numbers, Sanskrit, English, logos, signatures, or watermarks. The app UI provides all text; the illustration communicates purely visually.

## Emotional Language

Wisdom → symmetry, gold, sunrise. Devotion → folded hands, flowers, soft light. Meditation → still water, trees, negative space. Courage → forward movement, diagonals, open horizon. Compassion → rounded poses, warm colors, gentle expressions. Liberation → birds, open sky, mountains. Wonder → cosmic scale, celestial light, radiant halos.

## The Three-Second Rule

The most important principle in the system: a user scrolling quickly through any list — chapters, deities, concepts, practices, festivals, stories — should recognize each item within three seconds, even without reading its title. Every illustration needs a unique silhouette, composition, rhythm, and symbolic identity within its category, while remaining unmistakably part of the Dharma visual language. If two items in the same list could be confused at a glance, redesign one of them. This takes precedence over literal storytelling.

## Cross-Category Collision Check

The Three-Second Rule is usually applied *within* one list (don't confuse Chapter 3 with Chapter 4). But this app reuses the same words and images across unrelated content types — "Karma" is a philosophy concept, "Karma Yoga" is a separate practice, and Chapter 3 of the Gita is *about* karma yoga narratively. A reader can land on any of these from different parts of the app and should never see the same picture twice. **Before finalizing any illustration, check it against every other item in the app that shares a word, symbol, or theme cluster — not just its own list.**

Known **word/theme clusters**:

- Karma (concept) / Karma Yoga (practice) / Gita Chapter 3
- Bhakti Paths (concept) / Bhakti Yoga (practice) / Gita Chapter 12
- Three Gunas (concept) / Gita Chapter 14 — *the chapter is literally about the concept; see both prompts for how they are split*
- Any deity / any festival built around that deity (Krishna ↔ Janmashtami, Durga ↔ Navratri, Rama ↔ Ram Navami, Ganesha ↔ Ganesh Chaturthi, Shiva ↔ Maha Shivratri, Saraswati ↔ Basant Panchami)
- Any scripture / any festival or story drawn from it (Ramayana ↔ Ram Navami ↔ the seven kandas; Katha Upanishad ↔ the Nachiketa story)
- Any deity / any prayer addressed to that deity (Hanuman ↔ Hanuman Chalisa, Shiva ↔ Om Namah Shivaya ↔ Mahamrityunjaya, Ganesha ↔ Sukhkarta Dukhharta, Krishna ↔ Aarti Kunj Bihari)

Known **visual clusters** — different content, same picture if you're not careful. These are the ones that actually bite:

- **The "many become one" shape.** Hinduism Overview, The Four Great Streams, Dharma, and Bhakti Paths are all "many things converging into one." Each is assigned a *different vehicle* and they may not swap: Overview = many doorways into one courtyard · Four Streams = one tree, four boughs · Dharma = many paths, one summit · Bhakti Paths = many rivers, one ocean. Never illustrate any of the four with another's vehicle.
- **The lamp in darkness.** Maha Shivratri, The Guru, Gita Chapter 8, and Diwali all want a flame against dark. Assigned splits: Shivratri = one lamp before a bare stone, complete darkness · Guru = flame *passing* between two lamps, warm daylight · Chapter 8 = a flame in a niche whose wall is crumbling · Diwali = many lamps, already done. No other item may use a lamp as its primary subject.
- **Books.** Ganesha, Basant Panchami, and Brahma each hold or sit beside a book. Ganesha's is open and unmarked; Basant Panchami's is open with mustard petals scattered; Brahma's is **closed**. No fourth book anywhere.
- **Lotus on water.** Lakshmi, Gita Chapter 5, and Brahma's seat. Lakshmi = a lotus opening, coins beneath the water at its roots · Chapter 5 = extreme close-up of a leaf with one droplet beading off · Brahma = the lotus is a seat, not the subject.
- **Trees.** The Four Great Streams (upright banyan, four boughs), Gita Chapter 15 (the *inverted* cosmic tree, roots up), Gita Chapter 6 (one tree, one yogi beneath it), The Two Birds story (two birds on one branch). Silhouettes must not rhyme.
- **Teacher and student, seated.** The Upanishads scripture cover, the Katha Upanishad part, the Satyakama story, and the Guru concept. Only the Upanishads cover gets the canonical two-figures-and-a-lamp composition; the other three must find another way in.
- **The Foundations acts double every concept.** Each Module 0 act (Part 5's Foundations section) teaches the same ideas as a Module 1 concept and reuses that concept's vehicle in an in-body figure (Part 4a) — so the streams-tree, the pot, the rope, the three threads, the samsara-wheel, the caged bird, the doorways, books, shelves, lamps and deity figures are all *doubly* spoken for. A Foundations act cover may use none of them; it must be an establishing image instead. This is the widest collision surface in the app — see the governing rule in Part 5.

---

# Part 2 — Image Types & Where They're Used

Every content item in the app (a Gita chapter, a deity, a philosophy concept, a yoga practice, a festival, a scripture, a story, a prayer, a Foundations act) carries an image field in the data layer — `images.heroImage` for concepts/deities/practices, `heroImageUrl` for festivals, `coverImage` for stories/prayers/scripture parts and Foundations acts, and a chapter-number lookup for the Gita. This spec produces art for all of them, reasons through a third not-yet-built option (Part 4), and records the one in-body exception that has already shipped (Part 4a).

### 1. Cover — build this for everything

Full illustration, 1:1 square master. See Part 6 for resolution and file-size rules. This is what the paged reader shows as its opening page — the "cover → pages → reflection → sources → celebration" pattern used by both `GitaVersePlayerScreen` and `ContentReaderScreen` (the shared reader for concepts, deities, festivals, stories, and scripture parts). The UI center-crops this square to roughly 2.2:1 for list cards and ~1.8:1 for the reading-screen hero, with a dark gradient at the bottom edge for title text — hence the upper-two-thirds focal-subject rule in Part 1.

### 2. Icon (`iconImage`) — spec it, but it's not urgent

Several content types declare an `iconImage` field intended for small list/grid/search thumbnails. **No screen in the app renders `iconImage` anywhere** — it's a schema ahead of its UI, and every one of those fields currently holds a broken bare-string path. Don't commission separate artwork for it: an icon should simply be a **tighter crop of the same cover master**, centered on its focal subject. No new prompts are needed for icons; when the UI that consumes them gets built, generate the crop from the existing cover file rather than commissioning new art.

### 3. Interior / section art — don't build this yet (see Part 4 for why)

---

# Part 3 — Bhagavad Gita: 18 Chapter Covers + Preface

**Status**: chapters **1, 2 and 3 are done** (`assets/gita-covers/chapter-{1,2,3}.jpg`, wired into `CHAPTER_COVERS` in `src/data/gitaChapterCovers.ts`). **Chapters 4–18 and the preface (map key `0`) are outstanding** — all sixteen currently render the same shared `bhagavad-gita-cover.png`, so sixteen of the nineteen pages in the Gita player show one identical image. This is the largest single visual defect in the app.

The app also still ships one legacy image (`assets/images/chapters/chapter-1-battlefield.png`, a busy multi-figure panorama that predates this spec) — retire it once chapter 1's real cover is confirmed in use.

**Format**: 1:1 square. See Part 6.

**Composition rule**: maximum 1–3 figures per image, one clear focal gesture, generous negative space, one or two symbolic background motifs at most.

**Avoid**: full armies or crowds, weapons clashing or violence, photorealism or 3D rendering, dense micro-patterning, baked-in text, more than 3 named figures, exact devotional icon reproductions.

**Continuity arc**: Chapter 1 opens at a saffron sunset (Arjuna's despair); Chapter 18 closes at a golden sunrise (his resolve) — a deliberate bookend across the ~700 verses the reader pages through between them. Chapter 11 (the cosmic form) is the one chapter permitted greater scale and light. Arjuna is rendered progressively more resolved as the chapters advance (Part 1, character canon).

## The ledger

| Ch | Title | Status |
|---|---|---|
| — | Before You Begin (preface, map key `0`) | 🆕 |
| 1 | Arjuna's Despair | ✅ `chapter-1.jpg` |
| 2 | The Eternal Soul | ✅ `chapter-2.jpg` |
| 3 | Action Without Attachment | ✅ `chapter-3.jpg` |
| 4 | Krishna's Secret | 🆕 |
| 5 | Peace in Action | 🆕 |
| 6 | The Art of Meditation | 🆕 |
| 7 | Knowledge of the Divine | 🆕 |
| 8 | The Imperishable | 🆕 |
| 9 | The Royal Secret | 🆕 |
| 10 | Divine Splendor | 🆕 |
| 11 | The Universal Form | 🆕 |
| 12 | The Path of Love | 🆕 |
| 13 | The Field and Its Knower | 🆕 |
| 14 | Three Threads of Nature | 🆕 |
| 15 | The Supreme Person | 🆕 |
| 16 | Divine and Demonic Natures | 🆕 |
| 17 | Three Kinds of Faith | 🆕 |
| 18 | Liberation and Surrender | 🆕 |

## Prompts

**Preface — "Before You Begin"** (`chapter-0.jpg`) — Tier 1, Landscape. *An empty chariot stands still at the edge of a wide, bare plain at first light, reins resting loose across the rail, no horses harnessed, no driver, no warrior. The plain ahead is open and featureless. The journey has not begun.* Emotion: a held breath before departure. Palette: Warm Ivory sky, Indigo `#303F9F` plain, Gold `#D4AF37` rim-light on the chariot.
*Collision guard: no book — the "unopened book" belongs to Ganesha, Basant Panchami and Brahma.*

**Chapter 4 — Krishna's Secret** — Tier 2, Portrait. *Krishna stands luminous and alone in a warm golden void, hand raised in a teaching mudra. Behind him, three faint translucent silhouettes of earlier forms recede into the light like after-images, each less distinct than the last. No throne, no chariot, no Arjuna.* Emotion: a secret older than the listener. Palette: Gold `#D4AF37` void, Krishna's peacock-blue, Turmeric `#FFC107` halo.

**Chapter 5 — Peace in Action** — Tier 1, Symbolic Still Life (extreme close). *An extreme close-up of a single lotus leaf resting on still dark water. One perfect droplet of water beads on its surface, about to roll off, leaving no trace. No hand, no flower, no figure — just the leaf, the droplet, and the water.* Emotion: engaged, untouched. Palette: Banyan Green `#388E3C` leaf, Indigo `#303F9F` water, one Warm Ivory highlight.
*Collision guard: this is the leaf, not the bloom. Lakshmi gets the opening lotus flower; this image must not show petals.*

**Chapter 6 — The Art of Meditation** — Tier 1, Vertical. *A single yogi sits beneath one broad tree on an otherwise empty hillside, spine straight, eyes closed, seen from a middle distance so the figure is small and the negative space large. Nothing else in the frame — no birds, no water, no second figure.* Emotion: steady attention. Palette: Peacock Teal `#00796B` hillside, Turmeric `#FFC107` light, Banyan Green `#388E3C` tree.
*Collision guard: the tree is upright and ordinary — Chapter 15's tree is inverted, and the Four Streams' tree has four distinct boughs.*

**Chapter 7 — Knowledge of the Divine** — Tier 1, Panorama. *Krishna stands in silhouette at the edge of a vast still lake at sunrise, one hand just touching the water's surface, sending a single ring of ripples outward across the whole frame. Seen from far back and low. No Arjuna.* Emotion: the one behind the many. Palette: Turmeric `#FFC107` sky, Peacock Teal `#00796B` water.

**Chapter 8 — The Imperishable** — Tier 1, Portrait (close). *A single steady flame burns inside a niche cut in an old stone wall. The wall itself is visibly crumbling — its edges dissolving into drifting sand and dust — while the flame stands perfectly upright and untouched. No figure, no shrine, no offering.* Emotion: what decays and what does not. Palette: Indigo-charcoal wall, Deep Saffron `#E65100` flame, Gold `#D4AF37` dust.
*Collision guard: the lamp cluster. This flame's subject is the decaying wall; Maha Shivratri's is a bare stone in total darkness; the Guru's is a flame passing between two lamps in daylight. Keep them apart.*

**Chapter 9 — The Royal Secret** — Tier 1, Symbolic Still Life (extreme close). *Two hands meet at the center of an otherwise empty warm-ivory frame — one offering a single small flower, the other receiving it with an open palm. Cropped at the wrists; no faces, no bodies, no background detail at all.* Emotion: the divine accepts what is small. Palette: Vermillion `#DC143C` sleeve, Lotus Pink `#E91E63` flower, Warm Ivory ground.
*Collision guard: Karma Yoga's cover is also hands — but hands releasing into a current. These hands are still, and meeting.*

**Chapter 10 — Divine Splendor** — Tier 1, Mandala. *Krishna at the center of a radiating sun-disc, its rays extending outward and resolving, at their tips, into tiny suggestions of the things he says he is — one mountain peak, one river, one tree, one star — each rendered as a small icon in the ray-ends, none larger than a fingernail.* Emotion: the infinite in the everyday. Palette: Turmeric `#FFC107` → Deep Saffron `#E65100`, Gold `#D4AF37` linework.

**Chapter 11 — The Universal Form** — Tier 2, Cosmic. *Arjuna is tiny at the very bottom of the frame, on his knees, one arm raised to shield his eyes. Above and around him fills a vast luminous abstract form — not a figure with limbs and faces, but suggestion: concentric burning wheels, countless faint eyes, worlds visible inside the light. The single image in this system permitted overwhelming scale.* Emotion: terrified wonder. Palette: Indigo `#303F9F` → Peacock Teal `#00796B` ground, vermillion-gold burst at center.
*This is the one chapter allowed to break the "calm" default. Awe, not horror — no gore, no crushing bodies, no devouring mouths.*

**Chapter 12 — The Path of Love** — Tier 1, Portrait. *Krishna and Arjuna stand at plain human scale, facing each other, close and quiet. Arjuna's hand rests over his own heart; Krishna simply watches him, unhurried. No halo, no cosmic scale, no chariot — after Chapter 11's enormity, this is deliberately the smallest, most human image in the book.* Emotion: relief; the near, not the vast. Palette: Lotus Pink `#E91E63` → Vermillion `#DC143C`, soft Warm Ivory ground.
*Collision guard: Bhakti Yoga's practice cover and Bhakti Paths' concept cover are both non-figurative. This one is the figures. Keep it that way.*

**Chapter 13 — The Field and Its Knower** — Tier 1, Split Composition. *One seated silhouette rendered as a perfect vertical split: the left half is a tilled field, furrows and crops filling the body's outline; the right half is empty, unlit, with a single still point of light where the heart would be. No face.* Emotion: the watcher inside the worked ground. Palette: Banyan Green `#388E3C` field, Indigo `#303F9F` void, Gold `#D4AF37` point.

**Chapter 14 — Three Threads of Nature** — Tier 1, Portrait. *A seated figure, seen from behind, wears a plain cloth woven visibly from three colored threads — turmeric gold, vermillion red, charcoal indigo. One thread has been drawn loose from the weave and is held lightly in the figure's hand, examined. The cloth is the person; the loose thread is the recognition.* Emotion: seeing what you are made of. Palette: Turmeric `#FFC107` / Vermillion `#DC143C` / Indigo-charcoal.
*Collision guard — critical. The Three Gunas **concept** cover is the same three threads braided in a bare circle with no figure at all. This chapter is the same threads **woven into a person's cloth**, with a figure. A reader can reach both; they must not rhyme.*

**Chapter 15 — The Supreme Person** — Tier 1, Vertical (inverted). *The cosmic tree hangs upside down: its roots reach up into golden light at the top of the frame, its branches and leaves spread downward toward the earth below. One small figure stands at the very bottom, looking up. Unmistakably inverted — the composition should feel briefly wrong.* Emotion: the source is above, not below. Palette: Banyan Green `#388E3C` foliage, Turmeric `#FFC107` root-light.
*Collision guard: the tree cluster. This is the only inverted tree in the system.*

**Chapter 16 — Divine and Demonic Natures** — Tier 1, Split Composition. *A single figure stands at a fork in a plain path, seen from behind. The left branch is lit and strewn with scattered petals; the right recedes into flat shadow, petal-less. Neither is dramatized — no monsters, no fire, no threat. Just two ordinary paths, and the choosing.* Emotion: an unremarkable, decisive moment. Palette: Turmeric `#FFC107` lit path vs. Indigo-charcoal shadow.
*Collision guard: Dharma's cover is also paths — but many paths climbing to a summit, seen wide, with no figure. This is one figure at one fork, at ground level.*

**Chapter 17 — Three Kinds of Faith** — Tier 1, Symbolic Still Life (diagrammatic). *Three small offerings laid out side by side on plain ground, nothing else in the frame: the first arranged with care on clean cloth; the second showy and over-decorated, arranged to be seen; the third dropped carelessly, half-spilled. No figure, no shrine, no lamp — the offerings alone tell it.* Emotion: the same act, three intentions. Palette: Gold `#D4AF37` / Vermillion `#DC143C` / dull gray-ochre.
*Collision guard: no lamp here. The lamp cluster is already full (Chapter 8, Maha Shivratri, The Guru, Diwali).*

**Chapter 18 — Liberation and Surrender** — Tier 3, Landscape. *Arjuna and Krishna stand side by side facing a wide golden sunrise, seen from behind, small against the open horizon. Arjuna holds the Gandiva loosely at his side — not raised, not dropped: simply carried. His posture is fully resolved, the opposite of Chapter 1's collapse. The chariot waits, unremarked, at the frame's edge.* Emotion: quiet resolve; the argument is over. Palette: Deep Saffron `#E65100` → Turmeric `#FFC107` sunrise.
*This closes the arc opened by Chapter 1's saffron sunset. Same two figures, same bow, opposite posture, opposite light. Generate it in the same session as Chapter 1's cover is reviewed, so the bookend actually reads.*

---

# Part 4 — In-Body Illustration: should content have images *inside* it, not just on the cover?

Short answer, unchanged from v3.0: **no, not per-section — keep illustration to the cover, with at most one deliberate exception per item, and only once the cover backlog in Part 5 is actually done.**

### What "inside the content" would mean today

The reading experience for every non-Gita content type is `ContentReaderScreen`, which pages through `content.sections: NarrativeSection[]` — and `NarrativeSection` (`src/data/narrativeTypes.ts`) has no image field at all today. The shared renderer, `NarrativeSections.tsx`, is pure text. The Gita's own reader, `GitaVersePlayerScreen`, is the same pattern one level more granular — it pages through individual **verses**. So "add an image inside the content" means choosing between two very different scales of commitment:

- **One image per verse-page**: hundreds of illustrations just for the Gita, thousands across the app. Not viable at "museum quality," and directly against the Three-Second-Rule spirit of "one unforgettable idea" — an image every 20 seconds of reading stops being memorable and starts being wallpaper.
- **One image per section**: a typical concept runs 5–8 sections; a story runs 3–5. Across ~150 content items this is easily 600+ additional illustrations, before the ~80 covers still missing today.

### Why cover-only is the right default

1. **Production reality**: the app hasn't finished the cheaper, more valuable tier. Roughly 9 real illustrations exist against a demand of ~90. Section art is a luxury on top of an unfinished foundation.
2. **The system's own rule**: "communicate one unforgettable idea." A cover *is* that idea. Sprinkling three more images through the same content dilutes which one the reader remembers, and multiplies the Cross-Category Collision surface for no gain.
3. **Reading rhythm**: this is a text-and-verse reading app — its pacing already resembles a book, not a picture book. A cover sets the mood before reading starts; that's the moment illustration earns its keep here.

### The one exception worth allowing

If a content item contains one section that is *itself* a Tier-1/Tier-2 idea distinct enough from its own cover to deserve a second image, allow **at most one** optional interior illustration per item, never more. The clearest candidate is Gita Chapter 11's Vishvarupa. This is a nice-to-have, not a recommendation to build now.

### If this is ever pursued: build it as a schema, not a one-off

Per how this app is built elsewhere (concepts/deities/festivals/stories already share one `NarrativeSection` type and one `NarrativeSections` renderer), this must not be added per content type. It would be a single optional field — `image?: { source: ImageSourcePropType; caption?: string }` — added once to `NarrativeSection` in `narrativeTypes.ts`, with one render branch added once to `NarrativeSections.tsx`. Every content type gets the capability for free; none get it as a default.

---

# Part 4a — In-body illustration that *did* ship: the Foundations schematic figures

The Foundations track broke the cover-only default on purpose — but not with the art this spec commissions. Its in-body illustrations are **code-drawn schematic SVG diagrams** (`src/components/FoundationFigure.tsx`, on `react-native-svg`), not raster miniature paintings. They are a different medium doing a different job, and they sit **outside** this spec's art pipeline:

- **What they are.** ~10 line-and-label diagrams — an etymology chain, a comparison table, the four-stream tree, the pot-and-space, the rope-and-serpent, the three gunas, the samsara wheel, the trimurti, the family map, the two shelves. Each is keyed on a card's section id (`f-name-river`, `f-thread-streams`, `f-claim-maya`, …) via the `FIGURES` map; a card with no matching id is text-only. Some draw themselves in when their page becomes active (the `active` prop). A tap opens the same vector large and rotated to landscape.
- **Why they are not in this backlog.** They explain *structure* (how ideas relate, how a word changed, what sits on which shelf) — the one thing the "one unforgettable image" raster style is deliberately bad at. They render from code, cost nothing per unit, restyle instantly from `DharmaDesignSystem` tokens, and stay crisp at any size. Commissioning miniature-painting versions of them would be strictly worse.
- **The rule this creates.** **Never commission raster section art for a Foundations act.** Its interior illustration need is already met by the figure layer. If a *new* Foundations card wants a diagram, it's a `FoundationFigure` addition (code), not an entry in Part 5.
- **The rule it does *not* change.** The cover-only default for commissioned raster art (Part 4) stands for every content type, Foundations included — the schematic figures are interior *diagrams*, the raster covers below are the *cover*. They coexist; they don't compete.
- **The collision it *does* create — critical.** Every Foundations figure uses the canonical vehicle of the concept it teaches (the streams figure *is* the four-bough tree; the maya figure *is* the rope-and-serpent; the samsara figure *is* the wheel). So a Foundations act cover may not reuse that vehicle either — it is now spoken for twice (the Module 1 concept cover **and** the act's own in-body figure). This is the governing constraint on the covers in Part 5's Foundations section.

---

# Part 5 — Cover Art Backlog

Every status below was checked directly against the data layer (`foundations.ts`, `godsAndDeities.ts`, `philosophyAndTeachings.ts`, `yogaAndPractices.ts`, `expandedScriptures.ts`, `festivals.ts`, `stories.ts`, `prayers.ts`, `scriptureTexts.ts`). Four kinds of entry:

- **✅ Done** — a real, distinct asset exists and is correctly wired.
- **⚠️ Regenerate** — real art exists but fails this spec (below the resolution floor in Part 6). Prompt unchanged; only the output size changes.
- **🆕 Needs art** — currently the generic fallback, a broken bare-string path, or (worst) a real image borrowed from a *different* content item. Full prompt provided.
- **⏸ Reserved** — no reader content shipped, so no screen would render the art. Don't generate.

Format for every 🆕 entry: 1:1 square, see Part 6. Border: slender gold/floral. No text.

## Foundations (Jigyasu Track — Module 0) — first 4 acts delivered; 5 covers still on the generic fallback

`src/data/foundations.ts` ships 8 acts plus a capstone, each declaring `coverImage`. **The first four acts now carry bespoke covers** — `foundations-{name,thread,claim,wheel}-cover.jpg`, wired via `require()` (`COVER_NAME`/`COVER_THREAD`/`COVER_CLAIM`/`COVER_WHEEL`). The remaining five (`faces`, `library`, `living`, `capstone`, plus the capstone reader item) still resolve to `generic-cover.jpg`, which today is the **Tree of Life** fallback (see App-wide fallback, below). Because that tree reads as intentional rather than as a placeholder, those acts *look* illustrated in the simulator while sharing one image — the repetition is only obvious in a list, where the thumbnails are identical but for a completion tint. This is **Module 0**: the first content a new user opens, ahead of everything in Module 1, so the remaining fallbacks stay the highest-priority slice of the backlog. Filenames follow the shopping list already written into `foundations.ts`: `foundations-{name,thread,claim,wheel,faces,library,living,capstone}-cover.jpg`. (Note the deliberate id/title drift flagged in CLAUDE.md: the file id is `faces`, the act title is "The Gods" — the filename stays `foundations-faces-cover.jpg`.) **Note on the delivered four:** they ship as pre-framed non-square establishing plates (2:3 / 3:2, not the 1:1 master the budget assumes) — the reader center-crops them full-bleed, so the two landscape plates (name, claim) lose their left/right border on a portrait screen. Accepted as delivered.

**The governing rule for this set — read before generating any of the nine.** Each act teaches 4–5 ideas that *already own a canonical image twice over*: once as a Module 1 concept cover (Dharma, Maya, Samsara, Brahman & Atman, Three Gunas, The Four Great Streams, What is Hinduism?…), and once as the act's own in-body schematic figure (Part 4a). **An act cover may never use any of those concept-vehicles** — not the doorways, the four-bough tree, the pot, the rope, the three threads, the wheel, the caged bird, a book, a shelf, a lamp-as-subject, a deity figure. Instead every act cover is an **establishing image** — a place, an object, or a quality of light that sets the act's subject and mood *without* illustrating any single idea inside it. Told this way the nine become a coherent Module 0 series: eight quiet establishing plates for a primer, warming and cooling along a loose dawn-to-golden-hour arc (like the seven kandas), then one human-scale close. No figures appear until the capstone, deliberately.

| Act | id / order | Cover | Status |
|---|---|---|---|
| What Hinduism Is | `name` · 1 | `foundations-name-cover.jpg` | ✅ done — river at dawn (1536×1024) |
| What Makes Someone Hindu | `thread` · 2 | `foundations-thread-cover.jpg` | ✅ done — footprints in stone (1024×1536) |
| Core Beliefs | `claim` · 3 | `foundations-claim-cover.jpg` | ✅ done — window onto open sky (1536×1024) |
| Karma & Rebirth | `wheel` · 4 | `foundations-wheel-cover.jpg` | ✅ done — stone stair up a hill (1024×1536) |
| The Gods | `faces` · 5 | `foundations-faces-cover.jpg` | 🆕 generic fallback |
| The Scriptures | `library` · 6 | `foundations-library-cover.jpg` | 🆕 generic fallback |
| Rituals & Festivals | `living` · 7 | `foundations-living-cover.jpg` | 🆕 generic fallback |
| Explain It Yourself | `capstone` · 8 | `foundations-capstone-cover.jpg` | 🆕 generic fallback |

**What Hinduism Is** (`foundations-name-cover.jpg`) — Tier 1, Panorama, first light. *A wide, slow river curves through a bare open plain at dawn, open at both edges of the frame — never closing on itself. No boat, no temple, no figure. This is the Sindhu, the river the whole tradition was misnamed after, before it had a name.* Emotion: origin, older than the word. Palette: Warm Ivory dawn sky, Peacock Teal `#00796B` water, Gold `#D4AF37` rim-light.
*Collision guard: Vishnu Purana's river closes into a complete circle at night and is empty — this one is open, and at dawn. The act's own in-body Etymology figure owns the Sindhu→Hindū→India word-chain; the cover is the river as landscape, never as diagram.*

**What Makes Someone Hindu** (`foundations-thread-cover.jpg`) — Tier 1, Portrait (close, from just above), early morning. *A single broad temple threshold-stone, worn smooth and bowed in the middle by centuries of bare feet, seen close from above. One faint set of damp footprints crosses it. No door, no figure, no object set upon it.* Emotion: you belong by what you do, repeatedly — not by what you profess. Palette: warm stone-gray, Deep Saffron `#E65100` low light, Warm Ivory.
*Collision guard: the four-bough tree belongs both to the Four Great Streams concept and to this act's own in-body Streams figure — the cover must not use a tree. Ganesh Chaturthi's threshold holds a clay figure; this threshold is bare worn stone with footprints alone.*

**Core Beliefs** (`foundations-claim-cover.jpg`) — Tier 1, Landscape, midday. *Looking out from a dim interior through one small window cut in a thick pale wall onto a vast bright sky — the little framed opening and the enormous sky beyond it are painted as one continuous field of light, so the small window seems to hold the whole outside. No pot, no lamp, no rope, no threads, no figure.* Emotion: the small self is an opening onto the whole — never two. Palette: Warm Ivory wall, Indigo `#303F9F` → Turmeric `#FFC107` sky, Gold `#D4AF37` sill.
*Collision guard — heavy. This act teaches brahman/atman (the pot, owned by the Brahman & Atman concept cover and the in-body PotSpace figure), maya (the rope), and the gunas (three threads) — the cover uses none of them. The window-onto-sky is a coordinated variant of the pot's inside-equals-outside doctrine: same idea, different object, deliberately split. Janmashtami is a barred window glowing at night from outside; this is an open window seen from inside in daylight.*

**Karma & Rebirth** (`foundations-wheel-cover.jpg`) — Tier 1, Vertical, afternoon. *A single flight of worn stone steps climbs a bare hillside and disappears over a rise into soft light — you cannot see where it goes, but it plainly continues. No fork, no summit, no figure.* Emotion: what happens next, and that you are already walking it. Palette: Banyan Green `#388E3C` hillside, Warm Ivory light, Gold `#D4AF37` step-edges.
*Collision guard: Samsara owns the wheel (concept cover **and** this act's in-body Samsara figure); Moksha owns the caged bird — the cover uses neither. Dharma's cover is many colored paths converging on a summit; Chapter 16 is one figure at a fork. This is one continuous stepped path — no fork, no convergence, no figure.*

**The Gods** (`foundations-faces-cover.jpg`) — Tier 1, Cosmic, night. *A deep indigo night sky in which a handful of the brightest stars are joined by fine gold lines into a single constellation — a shape you only see once someone draws the lines. No deity, no face, no figure.* Emotion: the gods are not a crowd — they are a pattern, once you see how they relate. Palette: Indigo `#303F9F` sky, Gold `#D4AF37` lines, one Turmeric `#FFC107` bright star.
*Collision guard: no deity may appear — this act sits beside all ten deity covers and its own in-body Trimurti and Family-Map figures. Dhruva's story is one fixed star with the others smeared into trails; Samsara is a wheel of seasonal motifs. This is a static, linked constellation.*

**The Scriptures** (`foundations-library-cover.jpg`) — Tier 1, Diagrammatic (perspective), late afternoon. *One deep stone archway opens onto a receding corridor of ever-smaller archways, each framed inside the last, dissolving into warm shadow — the depth of a tradition, one opening into the next. No book, no shelf, no text, no figure.* Emotion: not one book — a corridor without end. Palette: warm sandstone, Deep Saffron `#E65100` depth-light, Gold `#D4AF37` arch-edges.
*Collision guard: the book cluster is full (Ganesha open, Basant Panchami open, Brahma closed), and this act's own in-body Shelves figure owns the two literal shelves — the cover uses neither book nor shelf. Hinduism-overview's doorways are many, seen bird's-eye, opening on one courtyard; this is a single axis of nested arches receding in perspective at ground level.*

**Rituals & Festivals** (`foundations-living-cover.jpg`) — Tier 1, Symbolic Still Life (bird's-eye), evening. *A brass puja thali seen from directly above on a plain floor — a few grains of rice, a small heap of vermilion, one marigold, a twist of incense smoke rising off the edge. The ordinary kit of daily worship, mid-use. No hands, no figure.* Emotion: the faith as it is actually done, in a room, in a year. Palette: Gold `#D4AF37` brass, Vermillion `#DC143C`, Turmeric `#FFC107` marigold, Warm Ivory floor.
*Collision guard — the lamp cluster is full, so keep an oil-lamp off the plate; the incense smoke, vermilion and rice carry it instead. Sukhkarta Dukhharta's prayer cover is an aarti plate seen from below, lighting a crowd's hands; Om Jai Jagdish is a swinging aarti lamp. This plate is still, seen from directly above, with no hands. Ganesh Chaturthi's threshold and Diwali's many lamps stay clear.*

**Explain It Yourself** (`foundations-capstone-cover.jpg`) — Tier 2, Portrait, golden hour. *Two ordinary people sit facing each other on a plain rooftop or step at golden hour — one leaning in mid-question, the other open-handed mid-answer. Seen from behind and at a distance so they read small and faceless, two warm silhouettes in low gold light. No temple, no book, no deity.* Emotion: you can say all of it now, in your own words, to someone who asked. Palette: Deep Saffron `#E65100` → Gold `#D4AF37` golden hour, Warm Ivory ground.
*Collision guard: the only Foundations cover with figures, and the only one at plain human scale — deliberately, to mark the track's end (the way Gita Chapter 12 is the smallest, most human image after the cosmic ones). This is **not** the teacher-and-student-with-a-lamp composition (that belongs to the Upanishads cover) — these two are equals, outdoors, no lamp — nor the Guru concept's flame passing between two lamps.*

## Scriptures

| Item | Status | Notes |
|---|---|---|
| Bhagavad Gita | ✅ `bhagavad-gita-cover.png` | over the file-size budget — recompress, don't regenerate |
| Ramayana | ✅ `ramayana-cover.png` | same; also see the seven kandas below, which all currently borrow this one file |
| Upanishads | 🆕 | `expandedScriptures.ts` holds a bare string path — renders nothing |
| Vishnu Purana | 🆕 | same |
| Mahabharata | ⏸ Reserved | no reader content |

**Upanishads** (`upanishads-cover.jpg`) — Tier 1, Portrait. *A student sits close before a seated teacher beneath one spreading tree, both small against a wide expanse of warm parchment negative space. A single oil lamp sits on the ground between them — the only light source, the only object in the frame besides the two figures.* Emotion: quiet inquiry. Palette: Warm Ivory ground, Gold `#D4AF37` linework, Deep Saffron `#E65100` flame.
*This is the canonical teacher-and-student composition for the whole app. Nothing else may use it — see the collision cluster in Part 1.*

**Vishnu Purana** (`vishnu-purana-cover.jpg`) — Tier 1, Cosmic. *A slow, wide river bends fully around itself into a complete closed circle against a star-flecked indigo sky — no boats, no banks, no figures — describing endless cycles of creation and dissolution.* Emotion: vast calm. Palette: Indigo `#303F9F` → Peacock Teal `#00796B`, gold linework tracing the circle.
*Collision guard: Samsara's cover is also a circle of recurrence — but a seasonal wheel of four motifs, in daylight. This one is a river, at night, and empty.*

**Mahabharata** (reserved) — Tier 1, Split Composition. *Two identical carved thrones side by side in an empty court; one holds a single seated figure in shadow, the other stands empty and sunlit. No armies, no chariots.* Emotion: sober, unresolved tension. Palette: Peacock Teal `#00796B` vs. Turmeric `#FFC107`.

## Deities

| Item | Status | Notes |
|---|---|---|
| Krishna | ✅ `krishna-cover.jpg` | |
| Rama | ✅ `rama-cover.jpg` | |
| Ganesha | ✅ `ganesha-cover.jpg` | |
| Shiva | ✅ `shiva-cover.jpg` | |
| Hanuman | ✅ `hanuman-cover.jpg` | |
| Durga | ✅ `durga-cover.jpg` | |
| Brahma | 🆕 | generic fallback |
| Parvati | 🆕 | generic fallback |
| Lakshmi | 🆕 | generic fallback |
| Saraswati | 🆕 | generic fallback |

All four new deities need their canonical descriptions from Part 1's character system applied exactly — that canon was extended in v4.0 specifically for them, and Parvati/Durga and Lakshmi/Saraswati are the two pairs most at risk of drifting into each other.

**Brahma** (`brahma-cover.jpg`) — Tier 1, Portrait. *Brahma sits on an open lotus rising from dark still water, aged and serene, four faces turned to four directions but composed so only two are fully visible and a third is implied in profile. A single closed manuscript rests on his lap; a plain water-pot sits beside him. Nothing else — no Vishnu, no navel, no cosmos.* Emotion: creation, at rest. Palette: Warm Ivory robes, Gold `#D4AF37` lotus, Indigo `#303F9F` water.
*Collision guard: the book is closed — Ganesha's and Basant Panchami's are open. The lotus is a seat, not the subject — that's Lakshmi's.*

**Parvati** (`parvati-cover.jpg`) — Tier 1, Vertical. *Parvati sits alone in tapas on a bare Himalayan rock, utterly still, in falling snow, plainly dressed, two arms, hair simply bound. Beside her, a single green shoot has pushed up through a crack in the rock. No lion, no weapons, no Shiva.* Emotion: love as patience, not passion. Palette: cool gray-white rock and snow, Banyan Green `#388E3C` shoot, one Lotus Pink `#E91E63` accent.
*Collision guard — critical. Durga is gold-and-vermillion, crowned, with a lion. Parvati is cool, plain, alone. If these two read as the same woman at card size, redo Parvati.*

**Lakshmi** (`lakshmi-cover.jpg`) — Tier 1, Symbolic Still Life. *A single lotus opens on still water, seen from just above the surface. Beneath the water, at its roots, gold coins rest half-buried in the silt — visible but submerged, holding the flower up. Nothing falls from the sky.* Emotion: abundance that has roots. Palette: Lotus Pink `#E91E63` bloom, Gold `#D4AF37` beneath, Peacock Teal `#00796B` water.
*Collision guard: no falling coins, no spraying elephants — the cliché this system exists to avoid. Also keep clear of Diwali's lamps and Chapter 5's leaf-and-droplet.*

**Saraswati** (`saraswati-cover.jpg`) — Tier 1, Portrait. *Saraswati sits on plain rock at a river's edge in unbleached white cloth with almost no ornament — deliberately the least decorated figure in the whole system. The veena rests across her lap, unplayed, her hands still. One swan sits calm on the water beside her. No lotus seat, no yellow, no Brahma.* Emotion: knowledge before it is spoken. Palette: Warm Ivory, Peacock Teal `#00796B` river, Gold `#D4AF37` veena inlay.
*Collision guard: her festival, Basant Panchami, owns the yellow and the mustard bloom. She does not.*

## Philosophy Concepts

| Item | Status | Notes |
|---|---|---|
| Karma | ✅ `karma-cover.png` | |
| Dharma | ⚠️ Regenerate | `dharma-cover.png` is 408×617 — below the floor |
| Moksha | ⚠️ Regenerate | 408×617 |
| Three Gunas | ⚠️ Regenerate | 408×617 |
| Ahimsa | ⚠️ Regenerate | 408×617 |
| Samsara | ⚠️ Regenerate | 408×617 |
| Bhakti Paths | ⚠️ Regenerate | 408×617 |
| What is Hinduism? | 🆕 | generic fallback — and it is the **first content item a new user opens** |
| The Four Great Streams | 🆕 | generic fallback |
| Maya | 🆕 | generic fallback |
| Brahman & Atman | 🆕 | generic fallback |
| Prana | 🆕 | generic fallback |
| The Guru | 🆕 | generic fallback |

### Regenerate — prompts unchanged, output size fixed

**Dharma** (`dharma-cover.jpg`) — Tier 1, Vertical. *Several thin paths of different colors wind up one mountainside from its base, converging at a single point of gold light at the summit. No figures on the paths.* Emotion: quiet order. Palette: Banyan Green `#388E3C` slopes, Gold `#D4AF37` summit.

**Moksha** (`moksha-cover.jpg`) — Tier 1, Landscape. *A single bird rises past the open top of an ornate gold cage suspended with no ground beneath it, wings just clearing the bars, open pale sky above. No figure, no other birds.* Emotion: release. Palette: Warm Ivory sky, Gold `#D4AF37` cage, Peacock Teal `#00796B` bird.

**Three Gunas** (`three-gunas-cover.jpg`) — Tier 1, Mandala. *Three ribbon-thin threads — turmeric gold, vermillion red, charcoal indigo — braid slowly around each other in a perfect circle. No figure at the center, no cloth, no person.* Emotion: balanced tension. Palette: Turmeric `#FFC107` / Vermillion `#DC143C` / Indigo-charcoal.
*Collision guard — critical: see Gita Chapter 14, which uses the same three threads **woven into a seated figure's cloth**. This one has no figure at all.*

**Ahimsa** (`ahimsa-cover.jpg`) — Tier 1, Portrait (extreme close). *A single open palm faces the viewer, fingers relaxed, the faint outline of a closed fist dissolving into gold light just behind it. No face, no weapon.* Emotion: restraint chosen, not weakness. Palette: Warm Ivory, Banyan Green `#388E3C` accent line.

**Samsara** (`samsara-cover.jpg`) — Tier 1, Mandala. *A wheel formed from four seasonal motifs — a spring shoot, a summer flame, an autumn leaf, a winter star — turns around one still, unlit point at the center. No figure.* Emotion: motion around stillness. Palette: Banyan Green / Vermillion / Turmeric / Indigo around an ivory center.

**Bhakti Paths** (`bhakti-paths-cover.jpg`) — Tier 1, Panorama. *Several thin rivers of different jewel tones converge from a wide horizon into one calm gold-lit ocean at the bottom of the frame. No devotees, no temple.* Emotion: many ways, one arrival. Palette: Lotus Pink `#E91E63`, Peacock Teal `#00796B`, Gold `#D4AF37` ocean.
*Collision guard: rivers are this item's vehicle and no other's — see the "many become one" cluster in Part 1.*

### New

**What is Hinduism?** (`hinduism-overview-cover.jpg`) — Tier 1, Mandala (bird's-eye). *A circular temple courtyard seen from directly above, open to a clear sky. Many doorways of different sizes and styles pierce the courtyard's outer wall all the way around — every one of them standing open, every one leading into the same single empty courtyard. No figures, no idols, no crowd.* Emotion: many ways in, one place. Palette: Warm Ivory courtyard, Deep Saffron `#E65100` and Peacock Teal `#00796B` doorways, Gold `#D4AF37` linework.
*This is the first cover a new user ever sees — it carries more weight than any other item in Module 1. Collision guard: doorways are its vehicle, not rivers (Bhakti Paths), not paths (Dharma), not boughs (Four Streams).*

**The Four Great Streams** (`branches-of-hinduism-cover.jpg`) — Tier 1, Vertical. *One old banyan seen straight on, a single broad trunk dividing into exactly four great boughs of equal weight. Each bough's foliage is a different jewel tone — teal, vermillion, gold, deep green — while the trunk and roots are one continuous color. No figures, no temple, no text.* Emotion: one root, four canopies. Palette: the four tones above over a Warm Ivory sky, Gold `#D4AF37` trunk linework.
*Collision guard: the tree cluster. This tree is upright with four distinct boughs; Chapter 15's is inverted; Chapter 6's has a yogi beneath it.*

**Maya** (`maya-cover.jpg`) — Tier 1, Portrait (close, dusk). *A coiled rope lies across a path at dusk. Where the fading light falls on it, it is unmistakably rope — fiber, twist, frayed end. Where the shadow deepens, the same coil reads as a serpent, raised and alive. One object, two readings, rendered in a single continuous form so the eye cannot decide. No figure, no snake's face.* Emotion: not fake — misread. Palette: Indigo `#303F9F` shadow, Deep Saffron `#E65100` low light, Warm Ivory path.
*The canonical Advaita rope-and-serpent image. Do not illustrate maya as a veil, a mask, or a mirage — this is the one that carries the actual doctrine: the world is real, the reading is wrong.*

**Brahman & Atman** (`brahman-atman-cover.jpg`) — Tier 1, Symbolic Still Life. *A single plain clay pot stands on open ground under a vast night sky. The space inside the pot and the space of the sky beyond it are painted as one continuous field of the same deep indigo, unbroken — and the pot's walls thin to nothing toward the rim, so it is impossible to say where the inside ends. No figure, no water, no salt.* Emotion: the boundary was never there. Palette: Indigo `#303F9F` continuous field, warm terracotta pot, Gold `#D4AF37` rim.
*Collision guard: the salt-in-water image belongs to the Svetaketu story (Phase 2). This concept gets the pot-space (ghatakasha) analogy instead — same doctrine, different picture.*

**Prana** (`prana-cover.jpg`) — Tier 1, Panorama. *A wide, quiet landscape at dawn in which one invisible current is made visible as pale flowing lines: a field of grass bends along it, a single bird aloft rides it, and one seated figure at the frame's edge breathes it in — all three moving on the same continuous line of air. The line never breaks between them.* Emotion: one movement in all things. Palette: Warm Ivory dawn, Peacock Teal `#00796B` current, Banyan Green `#388E3C` grass.
*Collision guard: not a gold thread from the chest — that belongs to the reserved Meditation prompt. This current runs through the whole landscape, not out of one person.*

**The Guru** (`guru-cover.jpg`) — Tier 1, Symbolic Still Life (close). *Two plain oil lamps rest side by side on a simple surface in warm daylight. One is lit; the second is not yet. A hand tips the lit lamp gently toward the unlit one and the flame is caught in the instant of passing — belonging to neither lamp, between them. The lit lamp is not diminished. No faces, no seated teacher, no student.* Emotion: what is given away is not lost. Palette: Warm Ivory ground, Gold `#D4AF37` lamps, Deep Saffron `#E65100` flame.
*Collision guard — two clusters at once. (1) The lamp cluster: this is the only lamp image in **daylight** and the only one with **two** lamps. (2) The teacher-student cluster: the canonical two-seated-figures composition belongs to the Upanishads scripture cover. This concept must be told with objects alone.*

## Yoga & Practices

| Item | Status | Notes |
|---|---|---|
| Bhakti Yoga | ✅ `bhakti-yoga-cover.png` | |
| Karma Yoga | ✅ `karma-yoga-cover.png` | |
| Raja Yoga | 🆕 | `heroImage` is a bare string path — React Native renders nothing |
| Jnana Yoga | ⏸ Reserved | referenced by `relatedPractices`, but no entry of its own |
| Meditation / mantra practice | ⏸ Reserved | same |
| Hatha Yoga | ⏸ Reserved | same |

**Raja Yoga** (`raja-yoga-cover.jpg`) — Tier 1, Diagrammatic. *A perfectly still lake fills the lower half of the frame, reflecting eight faint gold steps that rise from the water's surface into open sky, leading inward rather than to any visible destination. No figure.* Emotion: disciplined ascent. Palette: Indigo `#303F9F` water, Gold `#D4AF37` steps.

**Jnana Yoga** (reserved) — Tier 1, Portrait (extreme close). *A round hand-mirror held at arm's length clears from mist at its center outward; the clear center shows only calm gold light, not a reflected face.* Palette: Warm Ivory, Peacock Teal `#00796B` mist.

**Meditation** (reserved) — Tier 1, Quiet Landscape. *A single thin gold thread runs from a small seated figure's chest out into a still, empty sky, disappearing into soft light rather than connecting to any object.* Palette: Indigo dusk, Gold `#D4AF37` thread.

**Hatha Yoga** (reserved) — Tier 1, Portrait. *A single seated figure rendered as if carved from pale stone that is very slowly, at the edges only, turning to warm gold light — the body itself as the instrument being tuned.* Palette: stone-gray → Gold `#D4AF37`.

## Festivals

| Item | Status | Notes |
|---|---|---|
| Navratri | ✅ `navratri-cover.png` | |
| Diwali | ✅ `diwali-cover.png` | |
| Janmashtami | 🆕 — **fix required** | borrows `krishna-cover.jpg` (the deity's own cover) |
| Ram Navami | 🆕 — **fix required** | borrows `ramayana-cover.png` (the scripture's own cover) |
| Ganesh Chaturthi | 🆕 | generic fallback |
| Makar Sankranti | 🆕 | generic fallback |
| Basant Panchami | 🆕 | generic fallback |
| Maha Shivratri | 🆕 | generic fallback |
| Holi | 🆕 | generic fallback |

**Janmashtami** (`janmashtami-cover.jpg`) — Tier 2, Narrative (ground level). *A single small barred window glows with warm lamplight from within a dark prison wall at midnight. No figure is visible through the window. One small star sits directly above the wall outside. The whole frame is the wall; the light is tiny.* Emotion: divinity arriving unnoticed by the powerful. Palette: Indigo-charcoal wall, Deep Saffron `#E65100` window-glow.
*Collision guard: Krishna himself must not appear — that is exactly the collision being fixed.*

**Ganesh Chaturthi** (`ganesh-chaturthi-cover.jpg`) — Tier 1, Symbolic Still Life. *A small unpainted clay figure sits gently on a plain doorstep threshold, one marigold garland looped beside it, the home's dark doorway open just behind. The clay is raw and unfinished — it has not yet been painted, and it will be returned to water.* Emotion: welcoming what removes obstacles. Palette: warm terracotta, Gold `#D4AF37`, Turmeric `#FFC107` marigold.
*Collision guard: the Ganesha deity cover is a broken tusk and a book. This is clay and a threshold.*

**Makar Sankranti** (`makar-sankranti-cover.jpg`) — Tier 1, Landscape. *A single kite lifts off the bottom edge of the frame into a sky that brightens from indigo dawn to gold as it rises. No child, no rooftop, no other kites, no string-holder.* Emotion: turning toward light. Palette: Indigo `#303F9F` → Turmeric `#FFC107`.

**Basant Panchami** (`basant-panchami-cover.jpg`) — Tier 1, Symbolic Still Life. *One yellow mustard-flower bloom rests beside a single open, unmarked book, a few loose petals scattered near the spine. Plain surface, nothing else.* Emotion: new knowledge, new season. Palette: Turmeric `#FFC107`, Warm Ivory.
*Collision guard: Saraswati's own cover has the veena and the swan, and no yellow. This festival owns the yellow.*

**Maha Shivratri** (`maha-shivratri-cover.jpg`) — Tier 1, Portrait (extreme close, night). *A single small oil lamp burns before a plain, unmarked stone in complete darkness, its light barely reaching the stone's surface. No figure, no shrine architecture, no serpent, no trident.* Emotion: stillness offered to the formless. Palette: Indigo-charcoal ground, Deep Saffron `#E65100` flame.
*Collision guard: the lamp cluster — this is the only one in total darkness, and the only one with a bare stone. Shiva himself must not appear.*

**Holi** (`holi-cover.jpg`) — Tier 1, Panorama. *Loose clouds of colored powder — pink, gold, teal, vermillion — drift and cross in open air against a pale early-spring sky, with only the barest suggestion of upturned hands at the very bottom edge. No faces, no crowd detail.* Emotion: joyful release, forgiveness. Palette: **the one image in the whole system permitted this many colors at once** — Lotus Pink, Turmeric, Peacock Teal, Vermillion — because the festival's meaning *is* the color.

**Ram Navami** (`ram-navami-cover.jpg`) — Tier 2, Narrative. *Dawn light breaks over a plain palace courtyard, empty except for a single lit lamp at its center. The birth is suggested by the courtyard filling with light, not by any figure — no infant, no parents, no crowd.* Emotion: a promise-keeper's arrival. Palette: Deep Saffron `#E65100` → Gold `#D4AF37`.
*Collision guard — two at once. Rama himself must not appear (that's the deity cover, which this festival currently wrongly borrows), and the Bala Kanda scripture part (Phase 2) also covers the birth — that one must find a different image entirely.*

## Stories — Phase 2 (20 items, all currently on the generic fallback or borrowing another item's art)

`stories.ts` shipped 20 stories with zero dedicated art. Eight are Upanishad dialogues that sit inside Module 2 of the guided journey; twelve are browse-only kathas. **Dedicated art per story** — no shared "story" template. Full prompts are authored in Phase 2; the table below fixes each story's tier, archetype and palette *now* so the set is designed as a set and no two land on the same composition.

The governing constraint: stories are the app's most collision-prone category, because each one overlaps a deity, a scripture part, and often a concept. Every story prompt must be checked against all three.

### Upanishad dialogues (Module 2 journey items)

| Story | Tier | Archetype | Core image direction | Guard against |
|---|---|---|---|---|
| Nachiketa and Death | 2 | Narrative | A boy seated calmly opposite a still, unfrightening figure; three unlit fires between them | Katha Upanishad part; the Upanishads teacher-student composition |
| Svetaketu and the Salt | 1 | Symbolic Still Life | A cup of clear water, salt dissolving in a visible plume, invisible at the bottom | Brahman & Atman (which gets the pot, not the salt) |
| Satyakama Jabala | 2 | Panorama | One boy alone with four hundred lean cows on an open plain | Upanishads cover; Krishna's cowherd imagery |
| Yajnavalkya and Maitreyi | 2 | Portrait | Two figures and a divided estate laid between them, untouched | Svetaketu (no salt twice) |
| Gargi's Challenge | 2 | Narrative | One standing woman, a seated assembly reduced to silhouettes, two arrows at her feet | Saraswati; Durga |
| Indra and Virochana | 1 | Split Composition | Two students at one still pool; one sees a reflection, one sees through it | Maya's rope-and-serpent |
| The Two Birds | 1 | Portrait | Two birds on one branch — one eating fruit, one motionless, watching | Moksha's caged bird; Chapter 15's tree |
| Bhrigu's Five Answers | 1 | Diagrammatic | Five nested sheaths, the innermost lit | Taittiriya Upanishad part (same doctrine — split them) |

### Kathas (browse-only)

| Story | Tier | Archetype | Core image direction | Guard against |
|---|---|---|---|---|
| Vishwamitra and the Cow of Plenty | 2 | Narrative | A king's dropped crown beside a sage's bare footprints | Rama; Bala Kanda |
| Harishchandra | 2 | Vertical | A crowned figure descending stone steps into a cremation ground, holding nothing | Dharma concept |
| Dhruva, the Unmoving Star | 1 | Cosmic | One fixed star; every other star smeared into a circular trail around it | Samsara's wheel |
| Markandeya and the Noose of Death | 2 | Portrait | A boy's arms wrapped around a plain stone lingam, a noose slack on the ground | Maha Shivratri (which has no figure) |
| Ekalavya's Thumb | 3 | Symbolic Still Life | A bow laid down, a clay teacher's figure, one thumb print in the clay | The Guru concept (which is lamps, not people) |
| King Shibi and the Dove | 2 | Diagrammatic | A balance scale: a dove on one pan, and the other pan holding a king's own weight | Ahimsa's open palm |
| Sudama's Handful of Rice | 2 | Narrative | A worn cloth bundle of rice held out; a palace door opening behind it | Chapter 9's two hands (which are cropped at the wrist) |
| Gajendra's Surrender | 2 | Narrative | An elephant chest-deep in water, trunk raised, holding one lotus — no crocodile shown | Lakshmi's lotus |
| Prahlada and the Pillar | 2 | Vertical | A single cracked stone pillar, light escaping the crack — no Narasimha depicted | Chapter 8's crumbling niche |
| Savitri and Yama | 2 | Narrative | A woman walking a forest road behind a figure who has not turned around | Nachiketa (both are Yama — split them hard) |
| Ganesha and the Moon's Laughter | 1 | Cosmic | A full moon with a faint crescent of shadow across it, seen over a rooftop | Ganesha deity; Ganesh Chaturthi |
| The Churning of the Ocean | 2 | Panorama | An ocean churned into a spiral; poison rising as dark cloud before the nectar | Vishnu Purana's circling river |

## Prayers — Phase 2 (7 items, all currently on the generic fallback)

`prayers.ts` shipped 7 prayers, all sharing `generic-cover.jpg` — including Hanuman Chalisa, which doesn't even reuse the Hanuman cover. **Dedicated art per prayer.** The overriding rule for this category: a prayer's cover must **never** be its deity's cover, nor resemble it. A prayer is an act, not a person — illustrate the *act of saying it*, or what it asks for.

| Prayer | Tier | Archetype | Core image direction | Guard against |
|---|---|---|---|---|
| Mahamrityunjaya Mantra | 1 | Symbolic Still Life | A cucumber-vine gourd parting from its stem, ripe and released — the mantra's own image of dying free of fear | Om Namah Shivaya; Maha Shivratri |
| Hanuman Chalisa | 1 | Diagrammatic | Forty small identical marks, made one at a time, ascending — a devotion counted, not performed | `hanuman-cover.jpg` — no Hanuman figure at all |
| Om Namah Shivaya | 1 | Mandala | Five syllables as five concentric rings of ash-white on indigo, the center empty | Shiva's cover; Mahamrityunjaya |
| Shanti Mantras | 1 | Panorama | The same still horizon repeated three times as three bands — invoking peace threefold | Meditation; Raja Yoga |
| Om Jai Jagdish Hare | 2 | Narrative | A hanging aarti lamp mid-swing, its arc traced in gold light, the room dark behind | Diwali; the lamp cluster — this one is **moving** |
| Sukhkarta Dukhharta | 2 | Portrait | A crowd's raised hands lit from below by a single aarti plate, no faces | Ganesha; Ganesh Chaturthi |
| Aarti Kunj Bihari Ki | 2 | Panorama | A grove of trees at night with lamplight moving between the trunks, no figures | Krishna; Janmashtami |

## Scripture parts — Phase 2 (13 items)

The single worst repetition in the app: **all seven Ramayana kandas render the same `ramayana-cover.png`.** A reader paging through Module 2 sees the identical image seven consecutive times. This is the highest-value slice of Phase 2 and should be generated before the stories or prayers.

### The seven kandas — a deliberate arc

Treat these as one continuous sequence, not seven independent covers. The light moves from palace-warmth through forest-shadow to ocean-dawn and back to a hard, cold homecoming — the reader should feel the arc even scrolling past.

| Kanda | Tier | Archetype | Core image direction |
|---|---|---|---|
| Bala Kanda — childhood, the bow, the marriage | 2 | Symbolic Still Life | A great bow, broken cleanly in two, resting on a palace floor. No figures. *Must not be the birth — Ram Navami owns that.* |
| Ayodhya Kanda — the coronation undone | 2 | Split Composition | An empty throne, fully lit; a pair of forest sandals placed on its seat |
| Aranya Kanda — the golden deer, the line, the abduction | 2 | Landscape | A drawn line in the dust across a forest threshold, crossed. No deer, no demon, no Sita |
| Kishkindha Kanda — an alliance of the broken | 2 | Portrait | Two hands clasped in alliance across a fire, one human, one not |
| Sundara Kanda — the leap | 3 | Panorama | Hanuman mid-leap, tiny, over a vast dark ocean — the **one** narrative moment where the character canon's "never mid-leap" default is lifted |
| Yuddha Kanda — the bridge, the fall, the homecoming | 2 | Panorama | A causeway of stones reaching across water toward a distant lit shore. No battle |
| Uttara Kanda — the hard aftermath | 1 | Landscape | Furrowed earth opening; a single ornament left on the ground. The saddest image in the app — let it be |

### The six Principal Upanishads

| Upanishad | Tier | Archetype | Core image direction |
|---|---|---|---|
| Katha — the boy and Death | 2 | Vertical | A chariot with the reins held, seen from behind — the Katha's own body-as-chariot image. *Not the Nachiketa story's fires* |
| Isha — renounce and enjoy | 1 | Landscape | A hand releasing a fruit back onto the branch it was picked from |
| Kena — "by whom?" | 1 | Portrait | An eye, and behind it a second faint eye that is doing the seeing |
| Mundaka — two knowledges, two birds | 1 | Diagrammatic | Two arrows, one striking, one still on the string. *Not the two birds — that's the story's* |
| Mandukya — A, U, M, and the silence | 1 | Mandala | Three rings and a fourth, unmarked space larger than all three |
| Taittiriya — five sheaths, reality as bliss | 1 | Cosmic | Five translucent shells, each larger than the last, dissolving outward into light. *Coordinate with Bhrigu's Five Answers — same doctrine; give the story the figure and the Upanishad the abstraction* |

## App-wide fallback

`assets/images/covers/generic-cover.jpg` is the real fallback, wired as `FALLBACK_COVER` in `src/data/readerContent.ts` and `src/data/journeyPath.ts` and used by `contentAggregator.ts`. (v3.0 wrongly named `dharma-cover.png` here — that file is now the *real* Dharma concept cover, not a fallback.)

**What the file actually is (corrected in 4.1):** not the abstract lotus/diya/wheel motif prior versions described, but an elaborate, museum-quality **Tree of Life** — a dense banyan teeming with animals, sages, birds and roots into water. It is bespoke-grade art, and that is a **problem**, not a feature: a fallback that looks intentional *masks the backlog*. All eight Foundations acts render this single tree (`journeyPath.ts` → `act.coverImage` → the fallback), and because it reads as deliberate, the missing covers went unnoticed for a full release — the whole point of a fallback is to look like a gap so gaps get filled.

The guidance therefore stands and the current file violates it: keep the generic cover **deliberately abstract** — a lotus/diya/wheel motif, no specific character or story — precisely so it reads as a placeholder rather than a bespoke choice. Replacing today's tree-of-life fallback with a true placeholder is its own small backlog item. Until then, remember that an item "having art" in the simulator is not evidence it is off this backlog — check the data layer, not the screen. **Every appearance of the fallback is a bug in the backlog above.**
*(Collision note: because the fallback is itself a tree, it reinforces why no Foundations act cover — nor the Four Great Streams concept's near-neighbor — may lean on a tree; see the Foundations governing rule.)*

---

# Part 6 — File & Naming Conventions

**Location.** Bundled covers live in `assets/images/covers/`. Gita chapter covers are the one exception: `assets/gita-covers/chapter-N.jpg`, registered in the `CHAPTER_COVERS` map in `src/data/gitaChapterCovers.ts` (the preface is key `0` → `chapter-0.jpg`).

**Wiring.** Always `require()`, e.g. `require('../../assets/images/covers/karma-yoga-cover.png')` — **never a bare string path**. React Native renders nothing for a string, silently. Several items in Part 5 are exactly this mistake (`raja-yoga`, `upanishads-collection`, `vishnu-purana`, and every `iconImage` in the codebase), and the fallback machinery in `readerContent.ts` (`typeof img === 'number' ? img : FALLBACK_COVER`) hides it — a string path doesn't error, it just quietly becomes the generic cover.

**Naming.** `{content-id}-cover.jpg`, where `{content-id}` matches the item's `id` in its data file (`karma`, `karma-yoga`, `durga`). Drop year suffixes for filenames: `maha-shivratri-2025` → `maha-shivratri-cover.jpg`.

**Format.** New art ships as **`.jpg`**. (v3.0 mandated `.png` but every real asset since has landed as `.jpg` — the convention is being corrected to match practice, not the other way around.) Existing `.png` covers stay as they are; do not rename them, the churn buys nothing.

**Size budget.**

| | Rule |
|---|---|
| Aspect | 1:1 square master, always |
| Target | 2048 × 2048 px |
| Floor | 1254 × 1254 px (the current generator's native square output) |
| Hard fail | anything below 1024 px on a side, or any non-square master |
| Encoding | JPEG, quality ≈ 85 |
| File size | **≤ 1.5 MB** |

The floor exists because six concept covers shipped at **408 × 617** — a sixth of the target, non-square, and visibly soft rendered full-bleed on a phone. That is a fail, and those six are marked ⚠️ Regenerate in Part 5.

The ceiling exists because `bhagavad-gita-cover.png` (9.7 MB) and `ramayana-cover.png` (9.6 MB) are each larger than the entire rest of the cover set combined. Recompress them to budget; no regeneration needed, the art is fine.

---

# Part 7 — Quality Checklist

Every illustration must pass:

**Artistic** — consistent style, premium craftsmanship, elegant ornamentation, balanced composition.

**Character** — matches its canonical design from Part 1 exactly (skin tone, dress, attributes, expression); consistent proportions. Check the two high-risk pairs: Parvati must not read as Durga; Saraswati must not read as Lakshmi.

**Storytelling** — one clear philosophical message; instantly recognizable; memorable visual metaphor.

**Collision** — checked against every other item sharing its word, symbol, or theme cluster (Part 1's Cross-Category Collision Check), not just its own list. In particular, check the visual clusters — "many become one," the lamp in darkness, books, lotus on water, trees, teacher-and-student.

**Mobile** — readable at card size; strong silhouette; crop-safe; clear focal point within the upper two-thirds.

**Technical** — square, ≥ 1254², ≤ 1.5 MB, `.jpg`, named `{content-id}-cover.jpg`, wired with `require()`. (Part 6.)

**Editorial** — would this feel at home as the cover of a premium philosophy magazine? If not, simplify until it does.

---

# Part 8 — Generation Sequence

Sequenced by what a user actually hits first (`journeyPath.ts` module order), then by whether the current image is *wrong* rather than merely missing — a borrowed image is worse for trust than a bland fallback, so those go first within their round.

## Phase 1 — core surfaces (51 images)

**Round 0 — Foundations, Module 0 (9).** The eight act covers plus the capstone (Part 5's Foundations section). These now precede the Gita and Module 1 in real reading order — Foundations is the first track a new user walks — and all nine currently show the generic fallback. Generate as one designed series so the dawn-to-golden-hour arc reads; obey the governing rule (no act cover reuses a concept-vehicle or an in-body figure). If batching, do **`name`, `faces`, and `capstone` first** — `name` is the very first cover in the app, `faces` is where beginners most often drown, and `capstone` closes the track.

**Round 1 — the Gita (16).** Chapters 4–18 plus the preface. Sixteen of the nineteen pages in the Gita player currently show one identical image; this is the app's largest visual defect and Module 2 is the longest stretch of the journey. If batching: generate **11, 18, and the preface first** — Chapter 11 is the book's climax, Chapter 18 closes the continuity arc opened by the already-finished Chapter 1, and the preface is the first page of the whole reading experience. Then fill 4–10 and 12–17 in order.

**Round 2 — regenerate the six low-res concept covers (6).** Dharma, Moksha, Three Gunas, Ahimsa, Samsara, Bhakti Paths. Same prompts, correct output size. These are Module 1 — the first content any new user touches — and they are currently the *worst-looking* art in the app despite being nominally done.

**Round 3 — the six unillustrated concepts (6).** What is Hinduism?, The Four Great Streams, Maya, Brahman & Atman, Prana, The Guru. Do **What is Hinduism? first** — it is the first content item in Module 1 (now behind Module 0's Foundations track, Round 0), and it currently shows the generic fallback. Completing rounds 2 and 3 makes Module 1 the first fully-illustrated module in the app.

**Round 4 — the four remaining deities (4).** Brahma, Parvati, Lakshmi, Saraswati. Completes Module 3. Apply the new character canon from Part 1 exactly — Parvati/Durga and Saraswati/Lakshmi are the highest collision risk in the whole system.

**Round 5 — festivals (7), in calendar order from today, not doc order.** Janmashtami and Ganesh Chaturthi first (nearest on the calendar, and Janmashtami is *wrong*, borrowing Krishna's deity cover). Then the next cycle: Makar Sankranti, Basant Panchami, Maha Shivratri, Holi, Ram Navami (also wrong, borrowing the Ramayana cover). A festival's art earns its keep in the weeks before the festival appears in the calendar — don't burn effort on Holi in July.

**Round 6 — Raja Yoga (1).** Its `heroImage` is a bare string path — silently broken, not merely unfinished. Completes Module 4.

**Round 7 — scriptures (2).** Upanishads and Vishnu Purana, both bare string paths. Last because scriptures aren't in the guided journey at all — they're reached only through the Wisdom Hub.

## Phase 2 — the content expansion's backlog (40 images)

Generated after Phase 1, in this order:

1. **The seven Ramayana kandas (7)** — the worst repetition in the app, seven consecutive identical covers inside Module 2. Highest value in Phase 2 by a wide margin.
2. **The six Principal Upanishads (6)** — same problem, smaller blast radius.
3. **The eight Upanishad dialogue stories (8)** — Module 2 journey items.
4. **The twelve kathas (12)** — browse-only, lower traffic.
5. **The seven prayers (7)** — lowest priority of the four; the prayer player is a narrower surface.

## Not scheduled

**Icon crops** — no screen renders `iconImage`. Revisit once that UI exists; crop from the cover master rather than commissioning new art.

**Reserved items** — Mahabharata, Jnana Yoga, Meditation, Hatha Yoga. Prompts are written and waiting in Part 5, but no reader content exists, so nothing would display the art. Generate when the content ships, not before.

**Journey module covers** — the five modules in `journeyPath.ts` have no image field at all. Adding one is a feature, not an art task; if it's ever built, the module covers should be abstract compositions (no characters) so they don't collide with any of the ~90 item covers beneath them.
