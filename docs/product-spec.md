# Dharma — Product Spec

Behavior contracts for shipped features: what the app is *supposed* to do, where the code alone wouldn't tell you. **Maintenance rule: this file updates in the same commit as the feature it describes.** Companion docs: `docs/release-checklist.md` (test cases), `docs/dharma-illustration-spec.md` (art), repo-root `CLAUDE.md` (conventions & invariants).

Last synced: July 2026 (commit series through the onboarding family-stream change).

---

## 1. Onboarding

Six steps in one state machine (`OnboardingScreen`), Krishna asking each question via `KrishnaGuide`. Renders **outside the navigator** (App.tsx swaps it for AppNavigator until `profile.onboarded`).

| Step | Question | Writes |
|---|---|---|
| 0 | Name (skippable: "I'd rather not say") | `name` (first name only; skip preserves any earlier name) |
| 1 | Familiarity (new / some / deep) | `familiarity` |
| 2 | Intentions (multi-select, 5 options) | `intentions` |
| 3 | **Family stream** — "Growing up, whose face was closest in your home?" (single-select: Krishna, Shiva, The Goddess, Ganesha, Rama & Hanuman, A mix of many, Not sure) | `familyStream` |
| 4 | Daily goal (5/10/15/20 min) — CTA "I'm committed" | `dailyGoalMinutes` |
| 5 | Journey finale: path view (rail + milestones) → Continue | — |
| 6 | **Daily rhythm send-off**: Krishna introduces Daily Chai + the verse; live mini-preview of today's chai card; then **auto-advances** (~4s) into the first lesson ("Let's get started with '{next step}'…" + spinner) via `setPendingStart()` + finish. Only escape: "I'll explore on my own" text link → Home | `onboarded: true` |

- `finish()` **merges** the patch (never overwrites the rolling summary/knowledge). Completing onboarding is the warm moment for the notification-permission ask.
- **Begin handoff**: onboarding can't navigate (outside navigator) → `journeyService.setPendingStart()`; HomeScreen's focus effect consumes the flag and opens the first unfinished item. Skip lands on Home.
- `interests` remains in the profile schema but is no longer asked — filled opportunistically from chat + editable in the profile card.

## 2. Guided journey

- One ordered path through all content: 5 modules (`JOURNEY_MODULES`), built by `buildJourneyPath()`. 53 steps as of this sync (13 concepts, 18 Gita chapters, 10 deities, 3 practices, 9 festivals).
- **Completion = reaching an item's celebration page** (viewability callback fires `journeyService.markCompleted(id)`). First completion wins; id-keyed, permanent.
- **Next = first unfinished in path order** (wraps). Home's Continue card, notifications, and celebrations all derive from it.
- **Celebration page** (last page of every reader): entrance choreography (ring settle → checkmark spring → staggered text) + one-shot marigold shower (16 petals, ~2.5s, respects reduce-motion). Fires when the page scrolls into view, **once per arrival**. Next button turns the page to the next journey item; chapter→chapter stays inline in the Gita player.
- **Path screen** (`JourneyPath` route) + onboarding finale share `JourneyPathView`: one continuous vertical **rail** (teal behind the walker, pale saffron ahead — the rail itself carries "where you are"; no marker pill). On the rail: six **spiritual-title milestones** in consistent "Name — The English" form (Jigyasu start, Shishya/Sadhaka/Bhakta/Jnani between stages, Guru at the end; dot+label teal once the level is actually attained) and five **accordion stage cards** (emoji, stage eyebrow, name, one-line italic rationale — no per-stage counts or rings; the ONLY numeric tracker is the screen subtitle "n of m steps walked"). Cards expand to the item checklists: 40px cover tiles (done = faded + teal tick; next = saffron frame + NEXT pill; Gita tiles get chapter-number overlays). Current stage is saffron-framed and auto-expands. Titles are earned by engagement, so milestone placement is soft by design. Nothing is locked.
- Home Continue card: body resumes next item; separate full-width footer band "View full path · n of m ›" opens the path screen (mistap-safe two-band design — keep bands separated).

## 3. Daily Chai (the daily loop)

- Home IS the brief: under the status row sit the **atom card** and the **verse card**; reading requires zero taps. Opening Home marks the day's chai read (`daily_chai_last_opened`) and credits activity.
- **Atom selection** (`getDailyAtom`, deterministic per date): weekday → type (Sun story, Mon why, Tue saying, Wed word, Thu story, Fri why, Sat word); hash(dayOfYear+year) picks within type. 28 authored atoms (7 × why/saying/word/story), each: hook, 2–4 sentence body, citation, optional deep link, `krishnaPrompt`.
- **Festival override**: within 7 days of the next festival, the atom slot becomes a generated countdown atom from festival data.
- **Verse slot**: `getDailyVerse` (deterministic from 701 bundled verses), **English-first** hierarchy; ▶ narrates (toggle — tap again stops), 📖 opens that Gita chapter.
- Card actions are **bare icons** in the header row (no chips/circles); card bodies are not tappable. No chat-bubble action — today's `krishnaPrompt` leads Ask Krishna's suggestions instead.

## 4. Notifications (all local, no backend)

Idempotent reschedule-all on every app open. "Fires only after absence" = one-shots scheduled for future days, cancelled+rescheduled on each open.

| Type | When | Content | Deep link |
|---|---|---|---|
| Daily Chai | 8:00 daily (7 one-shots) | "☕ Your chai is ready" + that day's atom hook | Home tab |
| Journey nudge | 19:00 on days 1/3/7 of absence | next step title | JourneyPath |
| Festival | 9:00 three days before + 8:30 day-of (next 2 festivals) | name/countdown/significance | FestivalDetail |
| Streak protection | 21:00 tomorrow if streak ≥ 1 | "n-day streak on the line" | JourneyPath |

Tap handling: `navigationRef` + response listener in App.tsx (incl. cold-start via `getLastNotificationResponseAsync`). Permission is requested only at warm moments (onboarding finish, celebrations) and never re-nagged.

## 5. Readers

- **Anatomy** (both readers): horizontal paged FlatList — cover (art, title, meta, Begin) → one section per page → one reflection question per page (skippable) → celebration. Resume position stored per item.
- **Citations**: sections carry an optional one-line `citation` footnote (hairline rule, small italic) at the page foot; the full `SourcesCard` bibliography rides at the bottom of the **last text page**. No standalone sources page.
- **Narration**: expo-speech; Indian-English voice preferred, Hindi voice for Sanskrit (skipped if unavailable); plays under the iOS silent switch (session activated by a silent WAV once per session). Transport: play/pause, prev/next section, ±10s. Skip buttons move voice AND page together. **The playback bar appears only inside content** (verse/section and reflection pages — never covers or celebrations). **Begin on a cover turns the page AND starts narration automatically**; play pressed mid-content starts from the current page (start segment resolved by id, not arithmetic).
- **Ask Krishna about this**: both readers seed `krishnaContext.setCurrentContent` and jump to the chat tab.

## 6. Ask Krishna

- Gemini 2.5 Flash; persona + compact context block: profile (name, familiarity, intentions, interests, family stream — "Not sure" excluded), progression level/stats, rolling profile summary, structured knowledge facts, and current content when arriving from a reader.
- Chat bubbles = the shared reflection `Bubble` (avatar outside: Krishna left, user photo right). Suggested prompts: today's chai `krishnaPrompt` first, then persona starters.
- Knowledge system: opportunistic extraction from conversation into structured fields + rolling ≤120-word summary; profile card shows completion and allows edits.

## 7. Progression & profile

- **Levels**: Jigyasu(0) → Shishya(100) → Sadhaka(300) → Bhakta(700) → Jnani(1500) → Rishi(3000) → Guru(5000 pts). **Points = versesRead×2 + chaptersCompleted×30 + reflections×15 — INVARIANT.**
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
