# Dharma — working conventions

Expo SDK 53 / React Native 0.79 Hindu learning companion. Specs that govern this repo:
- **docs/product-spec.md** — behavior contracts for every feature (update it in the same commit as the feature it describes)
- **docs/release-checklist.md** — manual smoke tests before every TestFlight upload
- **docs/dharma-illustration-spec.md** — all cover/interior artwork

## Architecture map

Data (static TS, all content bundled):
- `src/data/journeyPath.ts` — the guided journey: 6 modules (0 = Foundations), ordered ids; `navigateToJourneyItem` handles routing
- `src/data/stageCapstones.ts` — the five stage capstones (Stages 1-5). Each rubric IS that stage's objective; passing confers the stage's level
- `src/data/foundations.ts` — the Jigyasu track: 8 parts, 32 bite-sized cards, the capstone. **The 87-point sum at the top of that file is load-bearing** — see invariants. The `foundations:*` ids deliberately no longer match their titles (`faces` → "The Gods") — the titles were renamed for clarity, the ids can't be
- `src/data/checkTypes.ts` — app-wide knowledge checks (mcq / recall / reflect); any `NarrativeSection` can carry `checks`
- `src/data/philosophyAndTeachings.ts`, `godsAndDeities.ts`, `festivals.ts` — content with `sections: NarrativeSection[]`, `sources`, `reflectionQuestions`
- `src/data/readerContent.ts` — adapter: any concept/deity/festival/story/scripture/foundations act with sections becomes reader content. **Its last branch is an unguarded festival fallthrough — new content types go ABOVE it** or they silently resolve as a festival
- `src/data/dailyAtoms.ts` — Daily Chai atoms + deterministic `getDailyAtom(date)`
- `src/data/gitaVerses.json` (701 verses) + `bhagavadGitaContent.ts` (narrative edition) + `gitaChapterCovers.ts`

Services (singletons, AsyncStorage-local via `localStorageService`):
- `journeyService` — completion map, next-unfinished, activity streak, pending-start handoff
- `progressionService` — points/levels (see invariants)
- `foundationsService` — banked cards, check results, capstone; owns `foundations_progress`. `init()` runs from HomeScreen **before** `getNextUnfinished` so existing users aren't rewound into Foundations
- `checkService` — grades free-recall answers against a rubric via Gemini; returns `null` when unreachable so callers fall back to self-marking
- `krishnaContextService` — context block fed to Gemini (profile + progression + current content)
- `audioNarrationService` — expo-speech TTS; segment queue + `speakOnce`/`stopSpeaking` for one-offs
- `notificationService` — 4 local notification types, idempotent reschedule-all on app open

Screens: paged readers are `GitaVersePlayerScreen` (Gita) and `ContentReaderScreen` (everything else) — horizontal FlatList, cover → sections (+ any inline checks) → reflections → capstone → celebration. Narration maps a segment back to a page via `pageIndexForSection`, **never `1 + sectionIndex`** — that assumption breaks the moment a section carries a check.

## Working rules

- **tsc baseline**: `npx tsc --noEmit` currently has **83 pre-existing errors**. Hold or improve; never add new ones. (Style-union errors from spreading `typography.sizes.*` into Text styles are the common trap — write fontSize/lineHeight explicitly in new styles.)
- **TEMP-VERIFY discipline**: simulator verification hacks (initialRoute overrides, auto-press timers, forced state) are marked `// TEMP-VERIFY` and ALL removed before commit (`grep -rn "TEMP-VERIFY" src App.tsx` must be clean).
- **Verified citations**: every content claim traces to a named public text; famous loci only; practices without scripture say so honestly. Per-section `citation` footnotes + item-level `sources`.
- **Long-form content opens in the paged reader** (Gita-player pattern), never a plain scroll view.
- **Status over streaks**: no streak counters or daily-pressure UI; progression surfaces as identity (Jigyasu→Guru levels). Streak logic exists only for the streak-protection notification.
- **Nothing locked**: the journey suggests order, never enforces it.
- Image styles inside `StyleSheet.create` hit union errors — define them as `const xStyle = {...} as const` outside.
- npm installs need `--legacy-peer-deps` (daily-js peer conflict).

## Invariants (do not change casually)

- **Points formula**: versesRead×2 + chaptersCompleted×30 + reflections×15 + cardsBanked×1 + checksPassed×2 + ritesPassed×30 + journeyItemsCompleted×30 (`progressionService`; check value lives in `CHECK_POINTS`). **Only ever add terms that are additive and non-negative, and never raise a threshold** — either one demotes somebody. (A check is worth 2, retuned down from 4 pre-launch so 2–3 questions per part fit under the Shishya gate; safe only because there were no users yet.) `journeyItemsCompleted` excludes Foundations and capstone items (see below).
- **A rite is a floor, never a ceiling**: `level = max(levelForPoints(points), conferred rite level)`. **Six rites — one per journey stage** (`stageCapstones.ts` + Foundations'). This is the only reason Rishi and Guru are reachable at all; the old journey topped out 38 points below Rishi. A ceiling would demote existing users and trap Gita readers at Jigyasu — hence the floor.
- **The Foundations track sums to 87 points** (32 cards + 20 graded checks × 2 + 1 reflection) — deliberately under the 100 for Shishya, so the capstone is what tips the reader over. Add a reflection (×15), or enough checks to cross 100, and the user levels up mid-track and the capstone is deflated. Checks are worth 2, so ~26 fit under the gate. **Redo the sum in `foundations.ts` if the content changes.**
- **Journey completion** (`content_completion` map, id-keyed) is a parallel system to points — reaching a celebration page marks completion.
- **AsyncStorage keys are append-only** — never rename/repurpose existing keys (users' devices hold data under them).
- **Journey item ids** (`concept:karma`, `gita:3`, `foundations:name`, `capstone:gods`…) are permanent — completion is keyed on them.
- **The journey is a curriculum, not a table of contents.** 65 curated items; everything else is self-serve in the Learn tab. **Before cutting an item from `journeyPath.ts`, confirm it is reachable from `contentAggregator.getContentSections()`** or you orphan it — `getMajorDeities()` was silently hiding three goddesses, who were journey-only.
- **Bundle id is `com.tushargarg.dharma`** (com.dharma.app is stranded on an old team — never revert).

## Release

TestFlight recipe (Xcode 26.1 via DEVELOPER_DIR, upload commands, gotchas) lives in the project memory `testflight-release-recipe` and in docs/release-checklist.md. Bump `CFBundleVersion` in ios/Dharma/Info.plist before each upload.

**`react-native-svg` (added July 2026, for the Foundations diagrams) is a native dependency** — the next TestFlight build cannot be a JS-only/OTA update, and any fresh simulator dev client must be rebuilt (`cd ios && pod install && npx expo run:ios`) or every figure renders as "Unimplemented component".

**Bundled Foundations narration audio** (`assets/audio/foundations/*.mp3`, ElevenLabs, Act 1 only so far) ships in the binary, so builds that add/change clips are **native, not OTA**. Regenerate with `ELEVENLABS_API_KEY=… node scripts/generate-foundations-audio.mjs` (or hand-make from `docs/foundations-narration-script.md`, one clip per section keyed by section id). The read-along plays one clip per section and highlights sentence-by-sentence off playback position (`PrerecordedController` in `audioNarrationService`); the manifest (`foundationsAudioManifest.ts`) is the on/off switch, everything else stays on TTS.
