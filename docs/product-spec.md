# Dharma — Product Spec

Behavior contracts for shipped features: what the app is *supposed* to do, where the code alone wouldn't tell you. **Maintenance rule: this file updates in the same commit as the feature it describes.** Companion docs: `docs/release-checklist.md` (test cases), `docs/dharma-illustration-spec.md` (art), repo-root `CLAUDE.md` (conventions & invariants).

Last synced: July 2026 (commit series through the onboarding family-stream change).

---

## 1. Onboarding

Eleven steps in one state machine (`OnboardingScreen`), Krishna asking each question via `KrishnaGuide`. Renders **outside the navigator** (App.tsx swaps it for AppNavigator until `profile.onboarded`).

**Steps are named, not numbered.** `step` indexes into an ordered `StepId[]`; every branch tests `id === 'name'` rather than `step === 2`. It used to be a bare index hardcoded in seven places with no shared source of truth, so inserting a screen meant renumbering by hand. Adding a screen is now one line in one array.

**Two intros come first, and they are skipped on replay.** `mode='edit'` (passed by the Profile tab's "Edit my answers") filters `introApp` and `introKrishna` out of the sequence — a returning user changing their daily goal should not be re-introduced to the app or to Krishna.

| Step (`StepId`) | Content | Writes |
|---|---|---|
| `introApp` | **Dharma says what it is for**, revealed line by line (lotus → three questions → body → the promise last and alone). Lotus, then three questions the app actually answers — *Why do we light lamps at Diwali? Why is Ganesha greeted first? What does karma actually mean?* — then *"You have probably been asked. You may have guessed. **Dharma is where you stop guessing — and become the one who knows.**"* **Krishna does not appear on this screen** (`KrishnaGuide` is gated off it): the app speaks first. | — |
| `introKrishna` | **Krishna introduces himself.** *"Namaste. I am Krishna. When Arjuna lost his way, I guided him. That conversation became the Gita. I will do the same for you — at every step, and whenever you ask."* Names the Gita as credential without retelling it. | — |
| `name` | "So — what may I call you?" (skippable: "I'd rather not say") | `name` (first name only; skip preserves any earlier name) |
| `familiarity` | Familiarity (new / some / deep) | `familiarity` |
| `intentions` | Intentions (multi-select, 5 options) | `intentions` |
| `familyStream` | **Family stream** — "Growing up, whose face was closest in your home?" (single-select: Krishna, Shiva, The Goddess, Ganesha, Rama & Hanuman, A mix of many, Not sure) | `familyStream` |
| `goal` | Daily goal (5/10/15/20 min) — CTA "I'm committed" | `dailyGoalMinutes` |
| `identity` | **Jigyasu identity card**: 🪷 "YOU BEGIN AS Jigyasu — The Curious · Level 1 of 7" + `LEVEL_MEANINGS[1]` + the rung strip (outlined current rung, empty). CTA "See your journey →" — the card **morphs** (rise/shrink/fade, skipped under reduce-motion) into… | — |
| `journey` | **Your Spiritual Journey** finale: path view (rail + milestones), entered with the Jigyasu milestone settling in (`entrance` prop) → Continue | — |
| `chai` | Daily rhythm: Krishna introduces Daily Chai; live preview of today's unified chai card → Continue | — |
| `sendoff` | **Auto-advances** (~2.5s) into the first lesson ("Getting started with '{next step}'…" + spinner) via `setPendingStart()` + finish. Only escape: "I'll explore on my own" text link → Home | `onboarded: true` |

- **Krishna types.** Every one of his onboarding lines reveals a character at a time (`KrishnaGuide`'s `typewriter` prop, ~22ms/char). Tapping the bubble completes it instantly and **Continue is never blocked** — nothing is locked behind an animation. Reduce-motion renders the full text at once. The full string is rendered invisibly underneath to reserve the bubble's final height, so it doesn't jump on every line wrap.
- **He asks, then the answers arrive.** A step's content — the name field, the option chips, the Jigyasu card, the journey path, the chai preview — waits for Krishna's line to finish typing, then rises in (chips staggered ~70ms apart). Driven by `KrishnaGuide`'s `onTypingDone` → a `krishnaDone` flag that resets on every step change and **starts true on the steps where he says nothing** (`introApp`, which animates itself, and `sendoff`) — otherwise their content would wait on a callback that never fires. The journey path is *mounted* late rather than faded in, because `JourneyPathView`'s own `entrance` stagger runs on its mount and would otherwise be spent behind the typing.
- **One avatar size throughout.** The avatar is fixed-width next to a `flex: 1` bubble, so a larger one on the intro squeezed the text column to ~200pt. `KrishnaGuide`'s `typewriter` is **off by default**: the Profile tab's greeting card re-renders on focus and would otherwise re-type on every visit.
- **Animations are keyed on content, not on mount.** OnboardingScreen re-renders on every keystroke of the name field, so the app intro is its own component (mounts once) and the typewriter keys its effect on the message string. Get this wrong and both replay mid-name.
- `finish()` **merges** the patch (never overwrites the rolling summary/knowledge). Completing onboarding is the warm moment for the notification-permission ask.
- **Begin handoff**: onboarding can't navigate (outside navigator) → `journeyService.setPendingStart()`; HomeScreen's focus effect consumes the flag and opens the first unfinished item. Skip lands on Home.
- `interests` remains in the profile schema but is no longer asked — filled opportunistically from chat + editable in the profile card.

## 2. Guided journey

**The journey is a curriculum, not a table of contents.** It used to contain everything the app had (82 items). It now contains only what a learner must walk to reach the next stage — **65 items** — and everything cut remains fully browsable in the Learn tab. *The journey curates; browse shows all.*

Six stages (`JOURNEY_MODULES`, `ALL_MODULES`), built by `buildJourneyPath()`. Each states **what you can do when you finish it** (`MODULE_OBJECTIVES`, rendered on the stage card as "After this you can…"), and each **ends with a capstone whose rubric IS that objective** — so the promise is tested, not merely asserted.

| Stage | Contents | Ends with | Confers |
|---|---|---|---|
| **0 · Foundations** | 8 parts (§ 2.1) | `foundations:capstone` | **Shishya** |
| **1 · The Core Ideas** | dharma, karma, samsara, moksha, brahman-atman, maya, three-gunas, ahimsa | `capstone:ideas` | **Sadhaka** |
| **2 · The Gods** | krishna, rama, shiva, ganesha, hanuman, durga, parvati | `capstone:gods` | **Bhakta** |
| **3 · The Gita** | all 18 chapters | `capstone:gita` | **Jnani** |
| **4 · The Stories** | 7 Ramayana kandas + nachiketa, svetaketu-salt, two-birds, maitreyi | `capstone:stories` | **Rishi** |
| **5 · Living It** | 3 yoga paths + diwali, holi, navratri, janmashtami, ganesh-chaturthi | `capstone:living` | **Guru** |

**Objectives** — 0: *Explain what Hinduism is to a friend.* · 1: *Explain karma, dharma and moksha properly — and correct someone who thinks karma means fate.* · 2: *Walk into a temple and know who you're looking at, and how they're related.* · 3: *Read the Gita end to end, and say what Krishna actually tells Arjuna to do.* · 4: *Tell the Ramayana. Know why Nachiketa questioned Death.* · 5: *Keep the festival year, know what puja is, and know which of the four paths fits how you're built.*

**Cut to self-serve** (all reachable from Learn): `hinduism-overview` and `branches-of-hinduism` (Foundations Parts 1–2 now cover exactly this ground), `prana`, `guru`, `bhakti-paths`; `brahma`, `lakshmi`, `saraswati`; the 6 raw Upanishad texts; 4 Upanishad dialogues; the 12 kathas; 4 minor festivals. Prayers were never on the path.

> **Before cutting anything from the path, check it is reachable from `contentAggregator.getContentSections()`.** `getMajorDeities()` used to filter to `category === 'major'`, which silently hid Parvati, Lakshmi and Saraswati from the Learn tab — they were reachable *only* via the journey, so trimming the journey would have orphaned them with no entry point anywhere in the app. It is now `getAllDeities()`.

### 2.1 Foundations — the Jigyasu track (Module 0)

- **What it is**: the first thing a new user walks. Seven parts of bite-sized cards plus a capstone, ~35–40 min, resumable — each part is its own journey item. Content lives in `src/data/foundations.ts`.

| # | Journey id (**permanent**) | Title |
|---|---|---|
| 1 | `foundations:name` | What Hinduism Is |
| 2 | `foundations:thread` | What Makes Someone Hindu |
| 3 | `foundations:claim` | Core Beliefs |
| 4 | `foundations:wheel` | Karma & Rebirth |
| 5 | `foundations:faces` | The Gods |
| 6 | `foundations:library` | The Scriptures |
| 7 | `foundations:living` | Rituals & Festivals |
| 8 | `foundations:capstone` | Explain It Yourself |

  The **ids no longer track the titles** — the titles were renamed for clarity (users couldn't tell what "The Thread" or "The Faces" would teach), and the ids can't be, because completion is keyed on them. Don't "fix" the slugs. The user-facing word is **Part** ("Foundations · Part 3 of 8"); the internal type is still `FoundationsAct`.
- **Why it exists**: user testing said the content was overwhelming and progress was invisible. `hinduism-overview` alone was 12 sections / 1,224 words / 15 swipes, and completing journey items awarded **zero** points, so walking Module 1 as designed moved no needle at all.
- **One idea per page.** A card is a `NarrativeSection` carrying a `takeaway` (the sentence the reader banks — it must stand alone, because part celebrations replay it), ~60 words of body, an optional Sanskrit block, an optional figure, and an optional `deeper` ref into the existing long-form content. **Nothing was deleted**: the eight core concepts are Stage 1 (read whole), and the five cut ones are self-serve — all of them are `deeper` targets from the cards.
- **The test**: at the end a friend asks "so what actually is Hinduism?" and the reader answers in their own words. Krishna (Gemini) marks it against a six-point rubric, generously; **4 of 6 passes**.
- **Part celebrations**: each part ends on the standard `JourneyCelebration`, which additionally replays that part's banked takeaways ("You can now say…") and shows the `handoff` — the question the *next* part answers — directly above the next-step button. The celebration is wrapped in a `ScrollView` (flexGrow, not flex) because that extra content overflows a fixed page; short celebrations still centre exactly as before.
- **Existing users are not rewound.** Foundations was inserted at the head of the path, so `foundationsService.init()` (called from HomeScreen before `getNextUnfinished`) silently marks all eight parts complete for anyone with ≥3 prior completions. The stage stays visible and re-openable; no rite is granted, so they can still take the capstone.

### 2.2 Knowledge checks (app-wide capability)

- `src/data/checkTypes.ts`. Any content whose sections are `NarrativeSection[]` can attach `checks` to a section; they render as their own pages **immediately after** it. Foundations is the first consumer — Gita chapters, deities and festivals can adopt them with no schema change.
- Three kinds. **`mcq`**: tap, instant feedback, and the `why` shows for a *wrong* answer too — the check teaches, it does not gate, and **a wrong answer still advances** (nothing is locked). **`recall`**: free text, graded by `checkService.gradeRecall`. **`reflect`**: points at an index in the content's existing `reflectionQuestions[]`, so it renders through the existing reflection page and `ChapterReflection` — one code path, one persistence path, and it still scores via the reflections × 15 term.
- **Grading never happens in the model.** `checkService` asks Gemini only which rubric points are *present*; the verdict is `hit.length >= passCount`, computed in code. If the grader is unreachable it returns `null` and the UI reveals the model answer and lets the reader self-mark — the capstone must never be the one screen that blocks a level-up.


- **The celebration is not a reading position.** Reaching it marks completion, but the index is never persisted — saving it meant re-opening a finished item restored you onto "COMPLETED" with the reading behind you and no way back into it. Readers also clamp on restore, so positions already poisoned by that bug heal on the next open.
- **A completed item re-opens at its cover** (re-reading starts at the top). An unfinished one still resumes exactly where it was left.
- **The celebration offers "Read it again"** (pages back to the cover — it's the same pager, so no navigation) **and "Done"** (`goBack()`, returning you to the journey path you came from). "Done" used to be "Back to Learn", which jumped to the Scriptures tab and popped the path off the stack — that, plus the position bug, made completed content genuinely unreachable.
- **Completion = reaching an item's celebration page** (viewability callback fires `journeyService.markCompleted(id)`). First completion wins; id-keyed, permanent.
- **Next = first unfinished in path order** (wraps). Home's Continue card, notifications, and celebrations all derive from it.
- **Celebration page** (last page of every reader): entrance choreography (ring settle → checkmark spring → staggered text) + one-shot marigold shower (16 petals, ~2.5s, respects reduce-motion). Fires when the page scrolls into view, **once per arrival**. Next button turns the page to the next journey item; chapter→chapter stays inline in the Gita player.
- **Progress strip on the celebration** (`ProgressRungs`, shared with onboarding): current rung outlined + inner fill at `progressToNext`, completed rungs small solid, ahead rungs small track-tinted; only current + next rungs are large and named. Readers snapshot `getProgression().points` on mount so the fill animates from where the session started; line reads "+N points · M to {next}" (plain "points"; "+0" omitted; at Guru: "The path's last name is yours").
- **Level-up ceremony**: when `getProgression().level > level_last_celebrated` (AsyncStorage, default 1) at celebration time, a full takeover overlay rises after the entrance (~1.9s): gold identity card — old name struck through, new name + english + `LEVEL_MEANINGS[n]` + rung strip — its own marigold shower, and "Continue as {name} →" to dismiss. The level is persisted immediately so it never re-fires. Note: users who out-leveled their last ceremony (incl. pre-feature users) get one catch-up ceremony on their next completion — intended.
- **Path screen** (`JourneyPath` route) + onboarding finale share `JourneyPathView`: one continuous vertical **rail** (teal behind the walker, pale saffron ahead — the rail itself carries "where you are"; no marker pill). On the rail: six **spiritual-title milestones** in consistent "Name — The English" form (Jigyasu start, Shishya/Sadhaka/Bhakta/Jnani between stages, Guru at the end; dot+label teal once the level is actually attained) and five **accordion stage cards** (emoji, stage eyebrow, name, one-line italic rationale — no per-stage counts or rings; the ONLY numeric tracker is the screen subtitle "n of m steps walked"). Cards expand to the item checklists: 40px cover tiles (done = faded + teal tick; next = saffron frame + NEXT pill; Gita tiles get chapter-number overlays). Current stage is saffron-framed and auto-expands. Titles are earned by engagement, so milestone placement is soft by design. Nothing is locked.
- Home Continue card: body resumes next item; separate full-width footer band "View full path · n of m ›" opens the path screen (mistap-safe two-band design — keep bands separated).

## 3. Daily Chai (the daily loop)

- Home IS the brief: under the status row sits **ONE unified Daily Chai card** (`DailyChaiCard`, shared with the onboarding preview); reading requires zero taps. Opening Home marks the day's chai read (`daily_chai_last_opened`) and credits activity.
- **Rotation** (`getDailyAtom`, deterministic per date): weekday → type — Sun **verse**, Mon why, Tue saying, Wed **compare**, Thu story, Fri **question**, Sat word. Within a type the pick rotates **weekly** (`floor(localDayNumber/7) % pool` — the old dayOfYear hash froze each weekday on one atom all year). 109 authored atoms: 60 why (7 ritual-etiquette originals + the 53-question "always wondered" canon — iconography, the gods, nature, practice, beliefs, interleaved so consecutive Mondays vary), 18 compare, 10 story (4 link into the new story library via `story:` refs), 7 each saying/word/question.
- **Across traditions (`compare`, Wednesdays)**: Hinduism set beside other faiths (Trimurti vs Trinity, karma vs sin, Om/Amen/Amin, reincarnation vs resurrection…). Framing rules: curiosity never superiority; Hindu locus cited precisely; other faiths characterized respectfully at intro level; differences stated without ranking. Card renders with the hook/body layout and an indigo accent.
- **Sensitive questions** (caste, women & scripture, swastika, vegetarianism) are included deliberately — they are the most-asked questions about Hinduism — and answered with the citation discipline: what scripture says vs. what is later social history, stated honestly. Customs without scripture (right hand, 108, shoes off) say so on the card.
- **Verse days** synthesize the atom from `getDailyVerse` (deterministic from 701 bundled verses): English-first hierarchy, Devanagari beneath, 📖 opens that Gita chapter. The standalone verse card is gone.
- **Festival override**: within 7 days of the next festival, the slot becomes a generated countdown atom from festival data.
- **Per-type treatments** (one shared frame; per-type inner layout + accent border/tag tint): word = large centered Devanagari + transliteration + gloss (saffron); saying = quote glyph + Devanagari + "WHAT IT MEANS" interpretation (teal); question = airy centered italic question + short insight (violet); verse = quote + Sanskrit line (gold); story/why/festival = original hook/body (saffron). Structured Sanskrit lives in the optional `atom.sanskrit {devanagari, transliteration, meaning?}` field.
- **Voice mode**: ▶ on every card (toggle — tap again stops). Sanskrit-bearing cards speak the Devanagari first in the Hindi voice (slower/lower, same settings as reader narration), then the English; **verse cards stay English-first**. No Hindi voice installed → Sanskrit part is skipped silently (`speakSequence` in `audioNarrationService`; a cancellation token stops mid-sequence chains).
- Card actions are **bare icons** in the header row (no chips/circles); card bodies are not tappable. No chat-bubble action — today's `krishnaPrompt` (present on all types, incl. synthesized verse atoms) leads Ask Krishna's suggestions instead.

## 4. Notifications (local today; remote push specced in § 4.1 for wave 2)

All current notifications are **local** — scheduled on-device, no backend, no APNs. Idempotent reschedule-all on every app open. "Fires only after absence" = one-shots scheduled for future days, cancelled+rescheduled on each open.

| Type | When | Content | Deep link |
|---|---|---|---|
| Daily Chai | 8:00 daily (7 one-shots) | "☕ Your chai is ready" + that day's atom hook | Home tab |
| Journey nudge | 19:00 on days 1/3/7 of absence | next step title | JourneyPath |
| Festival | 9:00 three days before + 8:30 day-of (next 2 festivals) | name/countdown/significance | FestivalDetail |
| Streak protection | 21:00 tomorrow if streak ≥ 1 | "n-day streak on the line" | JourneyPath |

Tap handling: `navigationRef` + response listener in App.tsx (incl. cold-start via `getLastNotificationResponseAsync`). Permission is requested only at warm moments (onboarding finish, celebrations) and never re-nagged.

### 4.1 Remote push (future — wave 2, not implemented)

**Why**: local one-shots exhaust ~7 days after the last app open — the lapsed user, the one notifications exist for, hears nothing after that. Remote push is the only complete fix. The cheap interim (no backend) is extending the local horizon: ~28 Daily Chai one-shots + absence nudges at days 14/21/28 ≈ 40 pending, comfortably under iOS's 64-pending limit.

**Requires**:
- Backend + device push-token registry — build alongside accounts in wave 2; until accounts land, tokens key to the local anonymous id.
- Delivery: start with the **Expo Push Service** (`getExpoPushTokenAsync`, server POSTs to Expo's push API — no APNs plumbing). Direct APNs/FCM is the later opt-out path if Expo's service becomes a constraint.
- Credentials: APNs key on the Apple team that owns `com.tushargarg.dharma` (managed via EAS credentials); FCM key for Android. The push entitlement arrives with the build config — nothing manual in Xcode.
- Server-side scheduler that reproduces atom content: `getDailyAtom(date)` is deterministic per date, but atoms live in bundled TS — needs a build step exporting atoms to JSON for the server, so local and remote say the same thing on the same day for free.

**Unlocks**: win-back after 7+ days of silence; festival-day pushes regardless of last open; announcements/content drops; server-side timezone correctness.

**Coexistence rules** (the contract future work must honor):
- Local notifications remain the primary channel — offline and no-account users keep working unchanged.
- No double-fire: the server only sends what the device cannot have pending — i.e., remote takes over after N days of silence, inferred from an app-open heartbeat, and never duplicates the locally scheduled week.
- Same deep-link payload shape (`{url, festivalId?}`) so App.tsx tap handling works unchanged for both channels.
- Permission UX unchanged (warm-moment ask, never re-nagged); token registration happens only after grant. New AsyncStorage keys for token/consent — append-only, as always.

## 5. Readers

- **Anatomy** (both readers): horizontal paged FlatList — cover (art, title, meta, Begin) → one section per page → one reflection question per page (skippable) → celebration. Resume position stored per item.
- **Reflection questions**: one plain, concrete question per item (two only when the content genuinely has two distinct hooks) — answerable from ordinary daily life in a sentence, no stacked metaphors. The page build is count-agnostic.
- **Citations**: sections carry an optional one-line `citation` footnote (hairline rule, small italic) at the page foot; the full `SourcesCard` bibliography rides at the bottom of the **last text page**. No standalone sources page. Citations and sources whose subject exists in the app carry a content ref (`citationLink` / `appLink`, e.g. `gita:2`, `deity:krishna`, `festival:janmashtami-2025`) and render a tappable "Read in app ›" affordance — resolved by `routeForContentRef`/`navigateToContentRef` (journeyPath.ts), pushed as a fresh reader instance. Refs to texts not in the app stay plain text.
- **Section subtitles**: left-aligned under the title, one shared treatment across readers (bodyLG italic, soft ash) — matching the Gita chapter subtitle.
- **Narration**: expo-speech; Indian-English voice preferred, Hindi voice for Sanskrit (skipped if unavailable); plays under the iOS silent switch (session activated by a silent WAV once per session). Transport: play/pause, prev/next section, ±10s. Skip buttons move voice AND page together. **The playback bar appears only inside content** (verse/section and reflection pages — never covers or celebrations). **Begin on a cover turns the page AND starts narration automatically**; play pressed mid-content starts from the current page (start segment resolved by id, not arithmetic).
- **Ask Krishna about this**: both readers seed `krishnaContext.setCurrentContent` and jump to the chat tab.

### 5.1 Prayer learn player (`PrayerPlayerScreen`)

The "skills" content shape: liturgical text learned by repetition, not read once. Data in `src/data/prayers.ts` (`prayer:<id>` ids are permanent — completion keys on them).

- **Anatomy**: paged like the readers — cover (attribution, verse/lesson count, "First lessons" badge while `complete: false`) → intro pages (origin story; last one carries when-to-recite) → **one verse per page** → celebration.
- **Verse page (recitation-first)**: hero text is the script being recited from — the **Aa/अ header toggle** swaps transliteration-first ↔ Devanagari-first; meaning sits below a hairline divider; a **mala-bead row** shows position (beads grouped by lesson, current bead enlarged).
- **Modes**: **Learn** (default) — stay on the verse, ▶ loops its audio ×1/×3/∞ (loop pill). **Listen** — the whole prayer flows, audio auto-advancing the pages to the end. Manual page turns stop a playing verse; the loop pill is disabled in Listen.
- **Audio**: existing TTS pipeline, Devanagari as `sanskrit` segments (Hindi voice, slow rate; silently skipped when no Hindi voice — same rule as everywhere).
- **Progress**: resume via the shared reader-positions map (key `prayer:<id>`); finishing a **complete** prayer writes `prayer:<id>` to `content_completion` and increments `prayer_recitations` (append-only key; times-recited shown on the celebration). Incomplete prototypes celebrate the lesson but persist nothing. Points formula untouched.
- **Editorial**: scriptural mantras cite their locus (Mahamrityunjaya: Rig Veda 7.59.12); compositions name author and century (Chalisa: Tulsidas, 16th c.; Om Jai Jagdish Hare: Shardha Ram Phillauri, 1870s); legends told as legends. Every "how to practice" intro ends with "This is one common way — ask your family how they do it."
- **Surfaces**: "Prayers & Mantras" section in Learn (category `mantras` → PrayerPlayer); `prayer:` refs resolve via `routeForContentRef`; Ask Krishna header action seeds `type: 'prayer'` context.
- **v1 library (shipped)**: Hanuman Chalisa (flagship, 43 verses / 11 lessons of 4, `complete`), Om Jai Jagdish Hare, Sukhkarta Dukhharta (Ganesha), Aarti Kunj Bihari (Krishna), Mahamrityunjaya, Om Namah Shivaya, Shanti Mantras (Saha Navavatu + Purnamadah). All `complete: true`. The `complete` flag gates completion-writing, so a partially-authored prayer can ship and teach without marking done.

### 5.2 Story library (`src/data/stories.ts` → ContentReader)

Standalone kathas and Upanishad dialogues in the reader's `NarrativeSection[]` shape — no new screen. One schema, one `collection` tag (`'upanishad' | 'katha'`); `story:<id>` ids are permanent.

- **Adapter**: `readerContent.ts` gains a `story` branch; `detailRoute` is now **optional** and stories omit it, so the reader's ⋮ menu hides "Details & practices" (its only reader-code change). `readerLabel` is "Upanishad Story" / "Story".
- **Upanishad collection (8)** — Nachiketa & Death, Svetaketu & the salt (tat tvam asi), Satyakama Jabala, Yajnavalkya & Maitreyi, Gargi's debate, Indra & Virochana, the two birds, Bhrigu's five sheaths. **Appended to journey Module 2** after Gita 18 via `UPANISHAD_JOURNEY_ORDER` (append-only — existing item positions never move).
- **Katha collection (12)** — Vishwamitra & Vasishtha's cow, Harishchandra, Dhruva, Markandeya vs. death, Ekalavya, King Shibi & the dove, Sudama's rice, Gajendra's surrender, Prahlada, Savitri, Ganesha & the moon, the churning of the ocean. **Browse-only** (Learn tab), off the journey.
- **Surfaces**: two Learn sections ("Stories of the Upanishads", "Timeless Kathas", category `stories` → ContentReader); `story:` kind in `routeForContentRef`; 4 Daily Chai story atoms link in (Nachiketa, the salt, Ekalavya, Gajendra).
- **Editorial**: per-section `citation` footnotes with `citationLink` refs where the subject is in-app (e.g. Prahlada → `festival:holi-2025`, Markandeya → `deity:shiva`); folk episodes (Ganesha & the moon) cited as tradition honestly; injustice left visible where the source leaves it (Ekalavya).

### 5.3 Multi-part scriptures (`src/data/scriptureTexts.ts` → ContentReader)

Long texts read in the **Gita reading pattern** but via the shared reader (no full verse JSON like the Gita's). One schema serves both collections: a `ScriptureCollection` (Ramayana, Principal Upanishads) holds ordered `ScripturePart`s (kandas / individual Upanishads), each a reader item. `scripture:<partId>` ids are globally unique and permanent; parts are authored at Gita-chapter depth (`NarrativeSection`s with cited `openingVerse`/`keyVerse` shlokas, story + teaching voice, per-section `citation`, cross-linked to episode-stories via `citationLink` e.g. Katha → `story:nachiketa`).

- **Surfacing**: the existing "Ramayana" / "Principal Upanishads" scripture cards route (via `collectionForCardId`) to **`ScriptureContentsScreen`** — a contents list (collection blurb + ordered part rows with completion ticks) → each part opens `ContentReader`. Other scriptures still use `ScriptureDetail`; `bhagavad-gita` still opens the Gita player.
- **Reader adapter**: `readerContent.ts` gains a `scripture` branch (no `detailRoute`; `readerLabel` = collection title); `scripture:` kind in `routeForContentRef`; `ReflectionContentType` + Krishna `CurrentContent.type` gain `'scripture'` (append-only unions).
- **Journey**: Ramayana kandas append to Module 2, Upanishad texts to Module 1, via `RAMAYANA_JOURNEY_ORDER` / `UPANISHAD_JOURNEY_ORDER` (append-only — existing positions never move).
- **v1 scope**: Ramayana = 7 kandas (Bala…Uttara); Upanishads = Core 6 (Isha, Kena, Katha, Mundaka, Mandukya, Taittiriya). Phase A shipped Bala Kanda + Katha Upanishad; remaining parts land in follow-up passes. Per-part cover art is a follow-up (illustration spec); parts reuse existing covers for now.

## 6. Ask Krishna

- Gemini 2.5 Flash; persona + compact context block: profile (name, familiarity, intentions, interests, family stream — "Not sure" excluded), progression level/stats, rolling profile summary, structured knowledge facts, and current content when arriving from a reader.
- Chat bubbles = the shared reflection `Bubble` (avatar outside: Krishna left, user photo right). Suggested prompts: today's chai `krishnaPrompt` first, then persona starters.
- Knowledge system: opportunistic extraction from conversation into structured fields + rolling ≤120-word summary; profile card shows completion and allows edits.

## 7. Progression & profile

- **Levels**: Jigyasu(0) → Shishya(100) → Sadhaka(300) → Bhakta(700) → Jnani(1500) → Rishi(3000) → Guru(5000 pts).
- **Points = versesRead×2 + chaptersCompleted×30 + reflections×15 + cardsBanked×1 + checksPassed×4 + ritesPassed×30 + journeyItemsCompleted×30.** The first three terms are the original invariant and are untouched. The last three are **additive only** — a user with no Foundations activity has all three at zero and therefore *exactly* the point total they had before, so the change re-levels nobody. Never add a term that can subtract.
- **`journeyItemsCompleted` EXCLUDES Foundations and capstone items.** Foundations is already scored per card (75 points), and the 75-under-100 gap is what makes its capstone the thing that tips a reader into Shishya; paying another 8×30 there would destroy that gate. Capstones pay a rite instead. **Completing a journey item used to be worth zero** — which is why a user could finish every festival and every practice and move no needle at all.
- **A rite is a floor, never a ceiling.** `level = max(levelForPoints(points), highest conferred rite level)`. There are **six rites — one per stage.** This is the only reason Rishi and Guru are reachable: the old journey topped out at 2,962 points against thresholds of 3,000 and 5,000, so the top two levels could not be earned by any amount of reading. Guru remains above the point ceiling **by design** — it is conferred by the final capstone, not ground out. Implemented as a ceiling (`min(...)`) this would demote every existing user above 100 points and trap Gita readers at Jigyasu forever — hence the floor: a rite can only *raise* a level, so nobody is demoted and nothing is locked.
- **The gate is curriculum tuning, not enforcement.** The Foundations track sums to **75 points** (32 cards + 7 graded checks + 1 reflection) — deliberately short of the 100 for Shishya, so a reader who does every card and skips the capstone sits visibly short of it. Passing the capstone confers the level *and* adds 30 (→105), so it then holds on points alone. **Adding a card or a second reflection pushes the track over 100 and the reader levels up mid-track, deflating the capstone.** If the content changes, redo the sum (the arithmetic is commented at the top of `foundations.ts`).
- **Reflections are deduped on a stable id** (`refl-gita-{ch}-{qi}` / `refl-{type}-{id}-{qi}`). `ChapterReflection` used to mint `refl-${Date.now()}-${random}` on every mount, so re-answering a question you had already answered appended a *second* entry — and since progression counts entries × 15, points were farmable indefinitely by reopening a page and typing again.
- `progressToNext` is clamped at **both** ends. A rite conferring level 2 at 75 points makes `points - level.minPoints` negative, which renders a backwards progress bar without the lower clamp.
- **`LEVEL_MEANINGS`** (progressionService): one meaning paragraph per level — the single copy source for the onboarding Jigyasu card, every level-up ceremony, and (future) the Profile card. The path screen is titled **"Your Spiritual Journey"**.
- Home leads with the status row (🪷 level name → Profile tab). Profile tab: Partiful-style photo (also the tab icon), level card, "what Krishna knows" completion card, reminders toggles, dev tools (__DEV__).
- No streak display anywhere (product decision: noisy); streak feeds only the protection notification.

## 8. Editorial standard (all content)

- Four content shapes: **courses** (reader items on the journey), **atoms** (Daily Chai), **skills** (future: mantra learn-by-repetition), **discussions** (future: audio/voice-mentor renderings).
- Every item/section opens with the **human question it answers**, not a definition.
- **Bite-sized pages**: one idea per page — split into more sections rather than compressing; a course may span many pages like a Gita chapter. Stories are told as **scenes**, never summarized ("what actually happened," not "the story goes").
- **Readable formatting**: `**bold**` the key terms a reader should retain (rendered via RichText; markers stripped for narration/highlighting); use the section `bullets` field for any enumeration of 3+ items. Prose paragraphs stay short (2–4 sentences), separated by blank lines. *(Applied across all concepts, deities, and festivals — July 2026 rollout.)*
- **Citations**: famous, publicly verifiable loci only; public-domain translations named (Sivananda/Gita, Müller/Upanishads, Griffith/Rig Veda, Ganguli/Mahabharata); practices without scripture say "tradition" honestly; later-tradition stories labeled as such (e.g., Hanuman's opened chest).
- Ritual/practice pages end with the standing line: **"This is one common way — ask your family how they walk it."**
- Plurality is doctrine: no single "correct" Hinduism; branches taught explicitly. Comparative-religion content: last priority, expert-reviewed first, framed as shared questions before differing answers.

## 9. Known gaps (deliberate, tracked)

Built-but-dark (ship-or-delete pending): starter-pack commerce data, child-friendly Gita reader, Vapi voice path, inert AuthContext (plaintext passwords — delete before Wave 2 rebuilds auth). Absent by design until later waves: accounts/sync (all AsyncStorage), analytics, traditions vault, ElevenLabs narration. The Gemini API key ships in the bundle (acceptable for family beta; Wave 2 proxies it).
