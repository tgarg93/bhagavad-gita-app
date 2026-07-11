---
name: verify
description: Build/launch/drive recipe for verifying Dharma app changes in the iOS simulator.
---

# Verifying Dharma in the iOS simulator

## Handle

- A dev-client build is installed on the simulator under bundle id **`com.dharma.app`**
  (the old dev bundle id — release builds use com.tushargarg.dharma, but the sim dev
  client predates the switch). No `main.jsbundle` inside; it loads JS from metro.
- Metro usually already runs on **port 8081** (check `curl -s localhost:8081/status`).
  If not: `npx expo start` (background). Don't fight the port prompt — a 200 from
  8081 means a metro for this project is already serving.
- Launch: `xcrun simctl launch booted com.dharma.app` — it reconnects to the last
  metro automatically. JS-only changes need **no rebuild**; ~20-30s after launch the
  fresh bundle is up.
- Avoid `simctl openurl ...expo-development-client...` while the app is already
  connected — it raises a springboard "Open in Dharma?" dialog that survives app
  relaunches. If you trigger it anyway, clear with:
  `xcrun simctl spawn booted launchctl kickstart -k system/com.apple.SpringBoard`
  (wait ~6s, then relaunch the app).

## Drive

No idb/applesimutils on this machine — you cannot tap. Drive with `// TEMP-VERIFY`
hooks (repo-sanctioned; ALL removed before commit, `grep -rn "TEMP-VERIFY" src App.tsx`
must be clean):

- **Auto-navigate**: in `App.tsx`'s mount effect, poll `navigationRef.isReady()` then
  `navigate(route, params)` after ~2.5s. Also `setNeedsOnboarding(false)` in case the
  sim profile isn't onboarded.
- **Reader paging**: `ContentReaderScreen`/`GitaVersePlayerScreen` build a horizontal
  FlatList (`listRef`); add an effect gated on `ready` + a custom route param that
  `scrollToIndex`s to the page under test (ContentReader: cover=0, sections=1..N,
  reflections, celebration).
- **Below-the-fold content** (citation footnote, SourcesCard): section pages wrap
  content in a vertical ScrollView — attach a ref that `scrollToEnd`s after ~1.8s.
- **Button behavior**: auto-fire the same handler the button calls from a timer
  (visual affordance is verified by screenshot).
- Stage changes between screenshots by editing the TEMP-VERIFY params; terminate +
  relaunch the app to re-run cold (`xcrun simctl terminate booted com.dharma.app`).

## Capture

`xcrun simctl io booted screenshot /path/shot.png` then Read the PNG.

## Gotchas

- `npx tsc --noEmit` has a pre-existing error baseline (see CLAUDE.md) — count before
  and after, hold the number.
- Readers resume from stored positions on this sim (may open mid-content, not covers).
