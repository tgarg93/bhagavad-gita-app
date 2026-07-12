# Dharma Illustration Spec

**Version:** 3.0
**Status:** Production Ready
**Supersedes:** `bhagavad-gita-chapter-images.md` v1 (Gita chapters only) and the standalone "Dharma Design System v2.0" style guide — both are folded into this one document, which is now the canonical spec for **every** piece of cover, icon, and interior artwork in the app.

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

Characters are visual anchors, not mandatory — if a stronger symbolic image exists, prioritize the symbol. Every character below must render consistently across every surface they appear on (chapter covers, deity covers, festival covers) — a reader should recognize Krishna instantly whether he's on a Gita chapter cover or the Janmashtami festival cover.

**Krishna** — muted peacock-blue skin; gentle oval face; long dark wavy hair; single peacock feather; gold crown; soft golden halo; floral garland; saffron-gold garments; calm compassionate expression; graceful mudras; elegant proportions. Never hyper-muscular, never exaggerated.

**Arjuna** — athletic build; bronze-gold armor; white dhoti; red sash; the bow Gandiva; expressive eyes; human vulnerability. Grows emotionally across the Gita — his art should read as visibly less resolved in early chapters, more resolved by Chapter 18.

**Rama** — warm bronze-gold skin, deliberately distinct from Krishna's peacock-blue; plain dark hair, no crown in forest scenes, a plain gold circlet only in palace scenes; the Kodanda bow always near at hand; plain white or unbleached dhoti — his signature is restraint, not ornament; minimal jewelry. Never shown mid-battle or drawing the bow in anger; never as ornamented as Krishna.

**Ganesha** — warm gold-ochre elephant head, gentle rounded features; a single tusk (the other set aside, never dramatized); soft rounded body; a slender crescent moon in the crown; one lotus and one modak held lightly, not a full arsenal of attributes; warm, unhurried, faintly amused expression. Never fierce, never cluttered with every traditional attribute at once.

**Shiva** — ash-pale or moonlit blue-white skin; matted hair (jata) crowned with a slender crescent moon; a single stylized serpent at the throat, a thin blue river-thread from the hair; the trishula held at rest, never raised; simple tiger-skin or plain cloth wrap; eyes closed or half-closed. Never shown with an active third eye, never wrathful, never surrounded by cremation-ground imagery — this system's Shiva is the ascetic at rest, not Bhairava.

**Hanuman** — deep vermillion-orange figure; folded hands (anjali mudra) as the default pose; the mace (gada) held at rest, never mid-swing; simple dhoti, minimal ornament; tail rendered as a graceful line, not a cartoon flourish; eyes calm and lowered in devotion. Reserve mid-leap, mountain-carrying poses for the one narrative moment that calls for them — never his default portrait.

**Durga** — radiant gold-and-vermillion palette; crowned, at rest, never mid-battle; a graceful few arms (four is enough), each holding one symbol, never all ten traditional weapons; a lion present but calm at her side, never lunging; expression serene and protective. Never shown with the slaying of Mahishasura depicted literally — illustrate the protection she offers, not the myth's violence.

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

The most important principle in the system: a user scrolling quickly through any list — chapters, deities, concepts, practices, festivals — should recognize each item within three seconds, even without reading its title. Every illustration needs a unique silhouette, composition, rhythm, and symbolic identity within its category, while remaining unmistakably part of the Dharma visual language. If two items in the same list could be confused at a glance, redesign one of them. This takes precedence over literal storytelling.

## Cross-Category Collision Check

The Three-Second Rule is usually applied *within* one list (don't confuse Chapter 3 with Chapter 4). But this app reuses the same words across unrelated content types — "Karma" is a philosophy concept, "Karma Yoga" is a separate practice, and Chapter 3 of the Gita is *about* karma yoga narratively. A reader can land on any of these three from different parts of the app and should never see the same picture twice. **Before finalizing any illustration, check it against every other item in the app that shares a word or theme cluster, not just its own list.** Known clusters to watch:

- Karma (concept) / Karma Yoga (practice) / Gita Chapter 3
- Bhakti Paths (concept) / Bhakti Yoga (practice)
- Any deity / any festival built around that deity (Krishna ↔ Janmashtami, Durga ↔ Navratri, Rama ↔ Ram Navami)
- Any scripture / any festival drawn from that scripture (Ramayana ↔ Ram Navami)

---

# Part 2 — Image Types & Where They're Used

Every content item in the app (a Gita chapter, a deity, a philosophy concept, a yoga practice, a festival, a scripture) carries the same two-field image schema already present in the data layer (`heroImage` + `iconImage`, see `godsAndDeities.ts`, `philosophyAndTeachings.ts`, `yogaAndPractices.ts`, `expandedScriptures.ts`, `festivals.ts`). This spec produces art for both fields, plus reasons through a third, not-yet-built option.

### 1. Cover (`heroImage`) — build this for everything

Full illustration, 1:1 square master, **2048×2048px minimum** (matches the existing asset convention). This is what the paged reader shows as its opening page — the "cover → pages → reflection → sources → celebration" pattern used by both `GitaVersePlayerScreen` and `ContentReaderScreen` (the shared reader for concepts, deities, and festivals). The UI center-crops this square to roughly 2.2:1 for list cards and ~1.8:1 for the reading-screen hero, with a dark gradient at the bottom edge for title text — hence the upper-two-thirds focal-subject rule in Part 1.

### 2. Icon (`iconImage`) — spec it, but it's not urgent

Every content type's data already declares an `iconImage` field, intended for small list/grid/search thumbnails. **As of this spec, no screen in the app actually renders `iconImage` anywhere** — it's a schema ahead of its UI. Don't commission separate artwork for it: an icon should simply be a **tighter crop of the same cover master**, centered on its focal subject (the same principle already governing hero crops, just cropped further in). No new prompts are needed for icons; when the UI that consumes them gets built, generate the crop from the existing cover file rather than commissioning new art.

### 3. Interior / section art — don't build this yet (see Part 4 for why)

---

# Part 3 — Bhagavad Gita: 18 Chapter Covers

**Status**: none of these exist yet. The app ships one legacy image (`assets/images/chapters/chapter-1-battlefield.png`, a busy multi-figure panorama that predates this spec and should be retired) and otherwise every chapter falls back to the generic `bhagavad-gita-cover.png` (see `src/data/gitaChapterCovers.ts`). The 18 prompts below are unchanged from the prior version of this spec — they already follow the "one clear focal idea, generous negative space" rule this document generalizes in Part 1. Read their character description as pointing at the canonical Krishna/Arjuna designs in Part 1 rather than the shorter version originally written alongside them.

**Format**: 1:1 square, 2048×2048px. Same crop rule as Part 2 — focal subject in the upper two-thirds.

**Composition rule**: maximum 1–3 figures per image, one clear focal gesture, generous negative space, one or two symbolic background motifs at most.

**Avoid**: full armies or crowds, weapons clashing or violence, photorealism or 3D rendering, dense micro-patterning, baked-in text, more than 3 named figures, exact devotional icon reproductions.

**Continuity arc**: Chapter 1 opens at a saffron sunset (Arjuna's despair); Chapter 18 closes at a golden sunrise (his resolve) — a deliberate bookend across all ~700 verses the reader pages through between them. Chapter 11 (the cosmic form) is the one chapter permitted greater scale and light.

| Ch | Title | Primary Visual | Palette |
|---|---|---|---|
| 1 | Arjuna's Despair | Arjuna collapsed at the chariot's edge, bow slipping; Krishna present but not yet intervening | Saffron `#FF6B35` → grey-blue |
| 2 | The Eternal Soul | Krishna cups a small glowing flame while teaching; Arjuna's bow set down | Krishna Blue `#4A90E2` → Lotus Pink |
| 3 | Action Without Attachment | Hands releasing flower petals and grain into wind, not watching where they fall | Marigold `#FFB627` → Saffron |
| 4 | Krishna's Secret | Krishna luminous in a golden void, faint translucent past incarnations behind him | Krishna Blue → Marigold |
| 5 | Peace in Action | A hand near a lotus leaf on still water, one droplet beading off, untouched | Lotus Pink → Krishna Blue |
| 6 | The Art of Meditation | A single yogi beneath one tree, spine straight, eyes closed | Krishna Blue → Lotus Pink |
| 7 | Knowledge of the Divine | Krishna silhouetted in sunrise light at water's edge, hand touching the surface | Turmeric → Peacock Teal |
| 8 | The Imperishable | A single diya burning in darkness; Krishna's face softly lit beside it | Indigo → Turmeric |
| 9 | The Royal Secret | Two hands meeting — Arjuna offering a flower, Krishna receiving it | Vermillion → Lotus Pink |
| 10 | Divine Splendor | Krishna haloed by a radiant sun, one mountain peak suggested in silhouette | Turmeric → Deep Saffron |
| 11 | The Universal Form | Arjuna small and shielding his eyes before a massive luminous abstract form | Indigo → Peacock Teal, vermillion-gold burst |
| 12 | The Path of Love | Krishna and Arjuna at human scale, Arjuna's hand at his own heart | Lotus Pink → Vermillion |
| 13 | The Field and Its Knower | One silhouette, half tilled field, half a still point of light at the heart | Banyan Green → Indigo |
| 14 | Three Threads of Nature | A seated figure with three braided threads — gold, red, indigo — above them | Turmeric / Vermillion / Indigo-charcoal |
| 15 | The Supreme Person | The inverted cosmic tree, roots reaching up into gold light, one small figure below | Banyan Green → Turmeric |
| 16 | Divine and Demonic Natures | A figure at a fork — one lit path scattered with petals, one receding into shadow | Turmeric vs. Indigo-charcoal |
| 17 | Three Kinds of Faith | A devotee kneeling before a lamp, a soft colored aura suggesting their faith | Vermillion → Turmeric |
| 18 | Liberation and Surrender | Arjuna and Krishna facing a golden sunrise, bow held with quiet resolve | Deep Saffron → Turmeric |

Full per-chapter prompt text (unchanged from the prior spec version) lives in the project's asset-generation history; regenerate from the table above plus Part 1's character canon if the original prompt text is needed verbatim.

---

# Part 4 — In-Body Illustration: should content have images *inside* it, not just on the cover?

This is the question that prompted this rewrite — using Karma Yoga as the example. Short answer: **no, not per-section — keep illustration to the cover, with at most one deliberate exception per item, and only once the cover backlog below is actually done.**

### What "inside the content" would mean today

The reading experience for every non-Gita content type (concepts, deities, festivals) is `ContentReaderScreen`, which pages through `content.sections: NarrativeSection[]` — and `NarrativeSection` (`src/data/narrativeTypes.ts`) has no image field at all today: `id`, `title`, `subtitle`, `openingVerse`, `storyText`, `sectionHeader`, `keyVerse`, `teachingText`. The shared renderer, `NarrativeSections.tsx`, is pure text. The Gita's own reader, `GitaVersePlayerScreen`, is the same pattern one level more granular — it pages through individual **verses**, not sections, and a single chapter can run to dozens of verse-pages (the Gita is ~700 verses across 18 chapters). So "add an image inside the content" really means choosing between two very different scales of commitment:

- **One image per verse-page**: hundreds of illustrations just for the Gita, thousands across the whole app. Not viable at "museum quality," and directly against the Three-Second-Rule spirit of "one unforgettable idea" — an image every 20 seconds of reading stops being memorable and starts being wallpaper.
- **One image per section**: Karma Yoga alone has four sections (intro, nishkama karma, seva, yajna buddhi); a typical philosophy concept runs 5–8. Multiply that across 18 chapters + 7 concepts + 6 deities + 9 festivals + 6 practices and this is easily 150–250 additional illustrations, before any of the 24 covers actually missing today (Part 5) exist.

### Why cover-only is the right default

1. **Production reality**: the app hasn't finished even the cheaper, more valuable tier — a third of covers are still missing or wrongly duplicated (Part 5). Section art is a luxury on top of an unfinished foundation.
2. **The system's own rule**: "never summarize an entire chapter — communicate one unforgettable idea." A cover is that one idea. Sprinkling three or four more images through the same content dilutes which one the reader remembers, and multiplies the Cross-Category Collision Check surface area for no real gain.
3. **Reading rhythm**: this is a text-and-verse reading app (audio narration, highlighting, reflections) — its pacing already resembles a book, not a picture book. A cover sets the mood before reading starts; that's the moment illustration earns its keep here.

### The one exception worth allowing

If a content item contains one section that is *itself* a Tier-1/Tier-2 idea distinct enough from its own cover to deserve a second image — the clearest existing example is Gita Chapter 11's Vishvarupa, which already gets outsized visual treatment within its own cover concept — allow **at most one** optional interior illustration per item, never more, and only when the section is genuinely a second unforgettable idea rather than a continuation of the cover's. For Karma Yoga specifically: the cover already covers the practice as a whole; the "nishkama karma" (desireless action) section is the strongest candidate for a second image if this is ever pursued, because it's the one idea inside that piece that's hardest to convey in text and easiest to convey in one symbolic image (hands releasing a boat into a current, not watching where it drifts) — but this is a nice-to-have, not a recommendation to build now.

### If this is ever pursued: build it as a schema, not a one-off

Per how this app has been built elsewhere (concepts/deities/festivals already share one `NarrativeSection` type and one `NarrativeSections` renderer rather than each having their own bespoke reading screen), this must not be added per content type. It would be a single optional field —`image?: { source: ImageSourcePropType; caption?: string }` — added once to `NarrativeSection` in `narrativeTypes.ts`, with one render branch added once to `NarrativeSections.tsx`. Every content type gets the capability for free; none of them get it as a default. This is a follow-up engineering task, not part of this art-production pass.

---

# Part 5 — Cover Art Backlog: Scriptures, Deities, Concepts, Practices, Festivals

This part is the actual commissioning list, grounded in what the data layer currently points at (checked directly in `godsAndDeities.ts`, `philosophyAndTeachings.ts`, `yogaAndPractices.ts`, `expandedScriptures.ts`, `festivals.ts`). Two kinds of entries:

- **✅ Already dedicated** — a real, distinct asset exists; no new prompt.
- **🆕 Needs art** — currently a broken placeholder path, the generic fallback, or (worse) a wrong-but-real image borrowed from a different content item. Full prompt provided.

Format for every 🆕 entry: 1:1 square, 2048×2048px, same crop rule as Part 1. Border: slender gold/floral. No text, no baked-in titles.

## Scriptures

| Item | Status | Notes |
|---|---|---|
| Bhagavad Gita | ✅ `bhagavad-gita-cover.png` | fine as-is |
| Ramayana | ✅ `ramayana-cover.png` | fine as-is, but see Festivals — Ram Navami below, which currently borrows this same file |
| Upanishads | 🆕 | see prompt |
| Vishnu Purana | 🆕 | see prompt |
| Mahabharata | 🆕 (reserved — no reader content shipped yet) | see prompt |

**Upanishads** — Tier 1. *A student sits close before a seated teacher beneath one spreading tree, both small against a wide expanse of warm parchment negative space. A single oil lamp sits on the ground between them — the only light source, the only object in the frame besides the two figures.* Composition: Portrait. Emotion: quiet inquiry. Palette: Warm Ivory ground, Gold linework, Deep Saffron `#E65100` flame.

**Vishnu Purana** — Tier 1, Cosmic. *A slow, wide river bends fully around itself into a complete circle against a star-flecked indigo sky — no boats, no banks, no figures, describing endless cycles of creation and dissolution.* Emotion: vast calm. Palette: Indigo `#303F9F` → Peacock Teal `#00796B`, gold linework tracing the circle.

**Mahabharata** — Tier 1, Split Composition. *Two identical carved thrones sit side by side in an otherwise empty court; one holds a single seated figure in shadow, the other stands empty and sunlit. No armies, no chariots, no named figures.* Emotion: sober, unresolved tension. Palette: Peacock Teal `#00796B` (shadowed throne) vs. Turmeric `#FFC107` (empty, lit throne).

## Deities

| Item | Status | Notes |
|---|---|---|
| Krishna | ✅ `krishna-cover.png` | fine as-is |
| Rama | ✅ `rama-cover.png` | fine as-is |
| Ganesha | 🆕 | currently falls back to the generic Dharma cover |
| Shiva | 🆕 | currently falls back to the generic Dharma cover |
| Hanuman | 🆕 — **fix required** | currently wrongly points at `ramayana-cover.png` (the scripture's cover) |
| Durga | 🆕 — **fix required** | currently wrongly points at `navratri-cover.png` (the festival's cover) |

**Ganesha** — Tier 1, Symbolic Still Life. *A single broken tusk rests beside an open, unmarked book and one lotus bloom on a plain warm surface; Ganesha's own figure appears only as a soft gold silhouette in the negative space above, seated, one hand resting near the tusk.* Emotion: warm, unhurried wisdom. Palette: Gold `#D4AF37`, Warm Ivory, Turmeric `#FFC107` accent.

**Shiva** — Tier 1, Mandala. *A single still ascetic figure sits at the exact center of a slow, radiating spiral of stars and moonlight, eyes closed, trident resting flat across his lap. The spiral suggests the turning universe; he alone stays motionless at its center.* Emotion: stillness at the center of motion. Palette: moonlit Indigo `#303F9F`, ash-white figure, Peacock Teal `#00796B` river-thread.

**Hanuman** — Tier 1, Portrait. *Hanuman kneels, hands folded in anjali mudra, eyes lowered, small in the frame — behind him, faint and silhouette-only, looms a mountain-sized shadow of the same folded-hands pose. The mace rests untouched on the ground beside him.* Emotion: humble strength. Palette: Vermillion `#DC143C` figure, pale dawn-gold background.

**Durga** — Tier 1, Hero Portrait. *Durga stands at rest, four arms each holding one symbol (lotus, conch, disc, one open empty palm rather than a weapon), a calm lion seated — not lunging — beside her. No demon, no battle.* Emotion: protection without violence. Palette: Gold `#D4AF37` and Vermillion `#DC143C`.

## Philosophy Concepts

| Item | Status | Notes |
|---|---|---|
| Karma | ✅ `karma-cover.png` | fine as-is — keep it distinct from Karma Yoga (practice) and Gita Ch. 3 if ever regenerated |
| Dharma | 🆕 | falls back to generic Dharma cover |
| Moksha | 🆕 | falls back to generic Dharma cover |
| Three Gunas | 🆕 | falls back to generic Dharma cover |
| Ahimsa | 🆕 | falls back to generic Dharma cover |
| Samsara | 🆕 | falls back to generic Dharma cover |
| Bhakti Paths | 🆕 — **fix required** | currently wrongly points at `bhakti-yoga-cover.png` (the practice's cover) |

**Dharma** — Tier 1, Vertical. *Several thin paths of different colors wind up one mountainside from its base, converging at a single point of gold light at the summit. No figures on the paths.* Emotion: quiet order. Palette: Banyan Green `#388E3C` slopes, Gold `#D4AF37` summit.

**Moksha** — Tier 1, Landscape/Liberation. *A single bird rises past the open top of an ornate gold cage suspended with no ground beneath it, wings just clearing the bars, open pale sky above. No figure, no other birds.* Emotion: release. Palette: Warm Ivory sky, Gold `#D4AF37` cage, Peacock Teal `#00796B` bird.

**Three Gunas** — Tier 1, Circular Symbolic. *Three ribbon-thin threads — turmeric gold, vermillion red, charcoal indigo — braid slowly around each other in a perfect circle, no figure at the center.* Emotion: balanced tension. Palette: Turmeric `#FFC107` / Vermillion `#DC143C` / Indigo-charcoal.

**Ahimsa** — Tier 1, Portrait (extreme close). *A single open palm faces the viewer, fingers relaxed, the faint outline of a closed fist dissolving into gold light just behind it. No face, no weapon.* Emotion: restraint chosen, not weakness. Palette: Warm Ivory, Banyan Green `#388E3C` accent line.

**Samsara** — Tier 1, Mandala. *A wheel formed from four seasonal motifs — a spring shoot, a summer flame, an autumn leaf, a winter star — turns around one still, unlit point at the center. No figure.* Emotion: motion around stillness. Palette: Banyan Green / Vermillion / Turmeric / Indigo around an ivory center.

**Bhakti Paths** — Tier 1, Panorama. *Several thin rivers of different jewel tones converge from a wide horizon into one calm gold-lit ocean at the bottom of the frame. No devotees, no temple.* Must not resemble Karma Yoga's hands-and-current imagery. Emotion: many ways, one arrival. Palette: Lotus Pink `#E91E63`, Peacock Teal `#00796B`, Gold `#D4AF37` ocean.

## Yoga & Practices

| Item | Status | Notes |
|---|---|---|
| Bhakti Yoga | ✅ `bhakti-yoga-cover.png` | fine as-is |
| Karma Yoga | ✅ `karma-yoga-cover.png` | fine as-is |
| Raja Yoga | 🆕 | currently a broken web placeholder path, renders nothing |
| Jnana Yoga | 🆕 (reserved — no reader content shipped yet) | referenced by other practices' `relatedPractices` but has no entry of its own yet |
| Meditation / mantra practice | 🆕 (reserved) | same — referenced, not yet built |
| Hatha Yoga | 🆕 (reserved) | same — referenced, not yet built |

**Raja Yoga** — Tier 1, Diagrammatic. *A perfectly still lake fills the lower half of the frame, reflecting eight faint gold steps rising from the water's surface into open sky, leading inward rather than to a visible destination. No figure.* Emotion: disciplined ascent. Palette: Indigo `#303F9F` water, Gold `#D4AF37` steps.

**Jnana Yoga** — Tier 1, Portrait (extreme close). *A round hand-mirror held at arm's length clears from mist at its center outward; the clear center shows only calm gold light, not a reflected face.* Emotion: discernment. Palette: Warm Ivory, Peacock Teal `#00796B` mist.

**Meditation** — Tier 1, Quiet Landscape. *A single thin gold thread runs from a small seated figure's chest out into a still, empty sky, disappearing into soft light rather than connecting to any object.* Emotion: inward attention. Palette: Indigo dusk, Gold `#D4AF37` thread.

**Hatha Yoga** — Tier 1, Portrait. *A single seated figure rendered as if carved from pale stone that is very slowly, at the edges only, turning to warm gold light — the body itself as the instrument being tuned.* Emotion: patient discipline. Palette: stone-grey transitioning to Gold `#D4AF37`.

## Festivals

| Item | Status | Notes |
|---|---|---|
| Navratri | ✅ `navratri-cover.png` | fine as-is |
| Diwali | ✅ `diwali-cover.png` | fine as-is |
| Makar Sankranti | 🆕 | falls back to generic Dharma cover |
| Basant Panchami | 🆕 | falls back to generic Dharma cover |
| Maha Shivratri | 🆕 | falls back to generic Dharma cover |
| Holi | 🆕 | falls back to generic Dharma cover |
| Ganesh Chaturthi | 🆕 | falls back to generic Dharma cover |
| Ram Navami | 🆕 — lower priority | currently borrows `ramayana-cover.png` (the scripture's cover); thematically close but still a collision |
| Janmashtami | 🆕 — lower priority | currently borrows `krishna-cover.png` (the deity's cover); same |

**Makar Sankranti** — Tier 1, Landscape. *A single kite lifts off the bottom edge of the frame into a sky that brightens from indigo dawn to gold as it rises. No child, no rooftop, no other kites.* Emotion: turning toward light. Palette: Indigo `#303F9F` → Turmeric `#FFC107`.

**Basant Panchami** — Tier 1, Symbolic Still Life. *One yellow mustard-flower bloom rests beside a single open, unmarked book, a few loose petals scattered near the spine.* Emotion: new knowledge, new season. Palette: Turmeric `#FFC107`, Warm Ivory.

**Maha Shivratri** — Tier 1, Portrait (extreme close, night). *A single small oil lamp burns before a plain, unmarked stone in complete darkness, its light barely reaching the stone. No figure, no shrine architecture.* Emotion: stillness offered to the formless. Palette: Indigo-charcoal ground, Deep Saffron `#E65100` flame.

**Holi** — Tier 1, Panorama. *Loose clouds of colored powder — pink, gold, teal, vermillion — drift and cross in open air against a pale early-spring sky, with only the barest suggestion of upturned hands at the very bottom edge. No faces, no crowd detail.* Emotion: joyful release, forgiveness. Palette: the one image in the whole system permitted this many colors at once — Lotus Pink, Turmeric, Peacock Teal, Vermillion — since the festival's meaning *is* the color.

**Ganesh Chaturthi** — Tier 1, Symbolic Still Life. *A small unpainted clay figure sits gently on a plain doorstep threshold, one marigold garland looped beside it, the home's dark doorway open just behind.* Emotion: welcoming what removes obstacles. Palette: warm terracotta, Gold `#D4AF37`.

**Ram Navami** — Tier 1, Narrative. *Dawn light breaks over a plain palace courtyard, empty except for a single lit lamp at its center — the birth suggested by the courtyard filling with light, not by any figure.* Emotion: a promise-keeper's arrival. Palette: Deep Saffron `#E65100` → Gold `#D4AF37`.

**Janmashtami** — Tier 1, Narrative (ground level). *A single small barred window glows with warm lamplight from within a dark prison wall at midnight — no figure visible through the window, one small star directly above the wall outside.* Emotion: divinity arriving unnoticed by the powerful. Palette: Indigo-charcoal wall, Deep Saffron `#E65100` window-glow.

## App-wide fallback

`dharma-cover.png` — the generic cover shown for any content whose dedicated art doesn't exist yet (currently most of the list above). Keep it deliberately abstract (a lotus/diya/wheel motif, no specific character or story) precisely so it's obviously a placeholder rather than a bespoke choice — it should never be mistaken for real content art once real art exists for that item.

---

# Part 6 — File & Naming Conventions

Bundled assets live in `assets/images/covers/` and are wired in with `require()`, e.g. `require('../../assets/images/covers/karma-yoga-cover.png')` — never a bare string path (those render nothing in React Native; several of the 🆕 entries above are exactly this mistake). Follow the existing naming pattern: `{content-id}-cover.png`, where `{content-id}` matches the item's `id` field in its data file (`karma`, `karma-yoga`, `durga`, `maha-shivratri-2025` → drop the year suffix for the filename, e.g. `maha-shivratri-cover.png`). Gita chapter covers are the one exception, following `src/data/gitaChapterCovers.ts`'s own convention: drop finished art into `assets/gita-covers/chapter-N.png` and update that file's `CHAPTER_COVERS` map.

---

# Part 7 — Quality Checklist

Every illustration must pass:

**Artistic** — consistent style, premium craftsmanship, elegant ornamentation, balanced composition.

**Character** — matches its canonical design from Part 1 exactly (skin tone, dress, attributes, expression); consistent proportions.

**Storytelling** — one clear philosophical message; instantly recognizable; memorable visual metaphor.

**Collision** — checked against every other item sharing its word or theme cluster (Part 1's Cross-Category Collision Check), not just its own list.

**Mobile** — readable at card size; strong silhouette; crop-safe; clear focal point within the upper two-thirds.

**Editorial** — would this feel at home as the cover of a premium philosophy magazine? If not, simplify until it does.

---

# Part 8 — Suggested Generation Sequence

Not "biggest category first" — sequenced by what a new user actually hits first (`src/data/journeyPath.ts`'s module order), whether the current image is *wrong* rather than just missing (worse for trust than a bland fallback — fix these first within their round), and, for festivals only, real calendar proximity rather than release order.

**Round 1 — Module 1, the very first thing any new user sees (6 images).** Dharma, Moksha, Three Gunas, Ahimsa, Samsara, Bhakti Paths. Today a new user's first seven pieces of content are one real image (Karma) and six that are either identical generic fallbacks or — Bhakti Paths — the wrong image entirely (it currently shows the Bhakti Yoga practice's cover). Do Bhakti Paths first in this round since it's actively misleading, not just bland. Finishing this round makes Module 1 the one fully-consistent module in the app.

**Round 2 — Module 2, the Gita (18 images).** This is the biggest lift, but also the single worst offender in the app today: every one of the 18 chapters plus the preface currently renders the *exact same* fallback cover — `gitaChapterCovers.ts` maps chapters 0–18 to one shared constant. If you want to batch this rather than do all 18 in one pass, generate Chapters 1, 11, and 18 first — the doc's own continuity arc (saffron sunset → cosmic climax → golden sunrise) makes these three the highest-value on their own and gives the reading journey visible bookends immediately, before filling in 2–10 and 12–17 in order.

**Round 3 — Module 3, deities (4 images).** Ganesha and Shiva have no dedicated art (generic fallback); Hanuman and Durga are actively wrong (Hanuman's page currently shows the Ramayana scripture cover, Durga's shows the Navratri festival cover). Fix Hanuman and Durga first in this round for the same reason as Bhakti Paths above. Krishna and Rama are already done — this round completes Module 3.

**Round 4 — Module 4, the one broken practice (1 image).** Raja Yoga's `heroImage` is a bare string path (`/images/practices/raja-yoga-hero.jpg`), which React Native can't render at all — it's not just unfinished, it's silently broken. Bhakti Yoga and Karma Yoga are already done. Skip Jnana Yoga, Meditation, and Hatha Yoga for now — none of them have reader content built yet, so there's no screen that would show the art even if you made it; generating covers for content that doesn't exist yet is effort spent before it can pay off.

**Round 5 — Module 5, festivals, in calendar order from today (2026-07-09), not doc order.** Navratri and Diwali are already done. Sequence the rest by whatever `getUpcomingFestivals()` currently returns as of today rather than the order they're listed in Part 5 — roughly: Janmashtami and Ganesh Chaturthi first (both fall in the next couple of months; Janmashtami is also currently wrong, borrowing Krishna's deity cover), then next year's cycle — Makar Sankranti, Basant Panchami, Maha Shivratri, Holi, Ram Navami (also currently wrong, borrowing the Ramayana scripture cover). A festival's art is most valuable in the weeks right before it appears in the Festival Calendar, so don't burn effort on Holi in July when Janmashtami is six weeks out.

**Round 6 — Scriptures (2 images; Mahabharata stays reserved).** Upanishads and Vishnu Purana are currently broken placeholder paths. This round is last because scriptures aren't part of the guided journey at all (`journeyPath.ts` has no scripture module) — they're lower-traffic, reached only through the Wisdom Hub. Mahabharata has no reader content yet, same reasoning as the reserved practices in Round 4 — skip until it ships.

**Not scheduled**: icon crops (Part 2) — no screen renders `iconImage` yet, so there's nothing to see even once generated. Revisit only after that UI gets built; when it does, crop from the relevant round's cover master rather than commissioning new art.
