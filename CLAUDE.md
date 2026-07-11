# Dharma — working conventions

Expo SDK 53 / React Native 0.79 Hindu learning companion. Specs that govern this repo:
- **docs/product-spec.md** — behavior contracts for every feature (update it in the same commit as the feature it describes)
- **docs/release-checklist.md** — manual smoke tests before every TestFlight upload
- **docs/dharma-illustration-spec.md** — all cover/interior artwork

## Architecture map

Data (static TS, all content bundled):
- `src/data/journeyPath.ts` — the guided journey: 5 modules, ordered ids; `navigateToJourneyItem` handles routing
- `src/data/philosophyAndTeachings.ts`, `godsAndDeities.ts`, `festivals.ts` — content with `sections: NarrativeSection[]`, `sources`, `reflectionQuestions`
- `src/data/readerContent.ts` — adapter: any concept/deity/festival with sections becomes reader content
- `src/data/dailyAtoms.ts` — Daily Chai atoms + deterministic `getDailyAtom(date)`
- `src/data/gitaVerses.json` (701 verses) + `bhagavadGitaContent.ts` (narrative edition) + `gitaChapterCovers.ts`

Services (singletons, AsyncStorage-local via `localStorageService`):
- `journeyService` — completion map, next-unfinished, activity streak, pending-start handoff
- `progressionService` — points/levels (see invariants)
- `krishnaContextService` — context block fed to Gemini (profile + progression + current content)
- `audioNarrationService` — expo-speech TTS; segment queue + `speakOnce`/`stopSpeaking` for one-offs
- `notificationService` — 4 local notification types, idempotent reschedule-all on app open

Screens: paged readers are `GitaVersePlayerScreen` (Gita) and `ContentReaderScreen` (everything else) — horizontal FlatList, cover → sections → reflections → celebration.

## Working rules

- **tsc baseline**: `npx tsc --noEmit` currently has **116 pre-existing errors**. Hold or improve; never add new ones. (Style-union errors from spreading `typography.sizes.*` into Text styles are the common trap — write fontSize/lineHeight explicitly in new styles.)
- **TEMP-VERIFY discipline**: simulator verification hacks (initialRoute overrides, auto-press timers, forced state) are marked `// TEMP-VERIFY` and ALL removed before commit (`grep -rn "TEMP-VERIFY" src App.tsx` must be clean).
- **Verified citations**: every content claim traces to a named public text; famous loci only; practices without scripture say so honestly. Per-section `citation` footnotes + item-level `sources`.
- **Long-form content opens in the paged reader** (Gita-player pattern), never a plain scroll view.
- **Status over streaks**: no streak counters or daily-pressure UI; progression surfaces as identity (Jigyasu→Guru levels). Streak logic exists only for the streak-protection notification.
- **Nothing locked**: the journey suggests order, never enforces it.
- Image styles inside `StyleSheet.create` hit union errors — define them as `const xStyle = {...} as const` outside.
- npm installs need `--legacy-peer-deps` (daily-js peer conflict).

## Invariants (do not change casually)

- **Points formula**: versesRead×2 + chaptersCompleted×30 + reflections×15 (`progressionService`). Changing it re-levels every user.
- **Journey completion** (`content_completion` map, id-keyed) is a parallel system to points — reaching a celebration page marks completion.
- **AsyncStorage keys are append-only** — never rename/repurpose existing keys (users' devices hold data under them).
- **Journey item ids** (`concept:karma`, `gita:3`…) are permanent — completion is keyed on them.
- **Bundle id is `com.tushargarg.dharma`** (com.dharma.app is stranded on an old team — never revert).

## Release

TestFlight recipe (Xcode 26.1 via DEVELOPER_DIR, upload commands, gotchas) lives in the project memory `testflight-release-recipe` and in docs/release-checklist.md. Bump `CFBundleVersion` in ios/Dharma/Info.plist before each upload.
