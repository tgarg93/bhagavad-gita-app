# Release checklist — TestFlight uploads

Manual smoke tests until automated coverage lands (Wave 2). Run the **Simulator pass** for every upload; run the **Device pass** on the TestFlight build itself for anything hardware-dependent. Check items off in a scratch copy — this file stays pristine.

## Pre-flight (code)

- [ ] `npx tsc --noEmit` — at or below the current baseline (77); no new errors
- [ ] `grep -rn "TEMP-VERIFY" src App.tsx` — clean
- [ ] `CFBundleVersion` bumped in `ios/Dharma/Info.plist` (every upload needs a new build number)
- [ ] `docs/product-spec.md` reflects everything in this release
- [ ] All work committed and pushed

## Simulator pass

**Fresh install** (delete app from simulator first):
- [ ] Splash: cream throughout, no white flash, no stray dots
- [ ] Onboarding: all 9 steps advance; name skip works; family-stream question single-selects; step 5 = Jigyasu identity card (outlined empty rung, labels aligned under rungs); "See your journey →" morphs the card into the path (first milestone settles in); path step titled YOUR SPIRITUAL JOURNEY
- [ ] **Begin the path** → lands in "What is Hinduism?" reader
- [ ] Fresh install again → **Skip for now** → lands on Home

**Home:**
- [ ] Status row shows level (Jigyasu for fresh) → taps to Profile tab
- [ ] Daily Chai card (ONE card): correct type for today's weekday (Sun/Wed verse, Mon why, Tue saying, Thu story, Fri question, Sat word) with that type's layout + accent tint; citation line; 📖 opens the linked content (only when link exists)
- [ ] Chai ▶: plays and **toggles off on second tap** — on word/saying days the Devanagari speaks first (Hindi voice), then the English; verse days English-first; stop mid-Sanskrit kills the whole sequence
- [ ] Verse day: 📖 opens that Gita chapter
- [ ] Continue card body → next journey item; **View your journey** footer → path screen

**Journey:**
- [ ] Path screen (titled "Your Spiritual Journey"): intro card, correct totals, current module expanded, NEXT framed item; rows navigate
- [ ] Complete an item (swipe to its end) → marigold celebration plays once (not again on swipe-back); checkmark appears on path; Continue card advances
- [ ] Celebration shows the rung progress strip: "+N points · M to {next}" with the fill animating from the session's starting position (no "+0" when nothing was earned)
- [ ] Level-up: dev-preset points just below a threshold (Profile → dev tools), finish a lesson crossing it → gold takeover overlay with the new name + meaning + marigolds; "Continue as {name}" dismisses; does NOT re-fire on the next lesson

**Readers:**
- [ ] Content reader: cover → sections with footnote citations → last text page ends with Sources card → reflections (skippable) → celebration
- [ ] Gita player: cover art for ch 1–3; transport prev/next moves voice AND page; ±10s works
- [ ] Krishna FAB floats bottom-right above the playback bar in all three players (content / Gita / prayer); dims during a swipe; doesn't collide with the cover's Begin button
- [ ] Tap FAB → chat sheet rises with the correct context chip and a page-aware first suggestion; **keyboard opens without the input row jumping or hiding** (KAV-in-Modal); dismiss via grip, backdrop, X, and (Android) back
- [ ] Thread continuity: send a message in the sheet → open the Ask Krishna tab → same conversation

**Ask Krishna:**
- [ ] Greeting renders in reflection-style bubbles (avatar outside)
- [ ] First suggested prompt = today's chai question
- [ ] A reply arrives (Gemini key valid, quota OK) and **streams in word-by-word** (not one big delayed block); first words appear within ~1-2s
- [ ] Daily limit: counter reads "N of 5 questions left today" on tab AND sheet; after the 5th send both surfaces show Krishna's closing bubble and disable the input (chips hidden); reflections still work after exhaustion
- [ ] `gemini-proxy` deployed (`npx supabase functions deploy gemini-proxy --use-api`) before shipping — streaming/warm live server-side, not in the JS bundle

**Profile:**
- [ ] Level card matches Home status row; photo upload works and updates the tab icon

## Device pass (TestFlight build)

- [ ] Narration audible with the **silent switch on**
- [ ] Notification permission prompt appears at onboarding finish; next-morning "☕ Your chai is ready" arrives at 8:00 and **deep-links to Home**
- [ ] Journey nudge deep-links to the path (test: set device clock or wait)
- [ ] App icon, display name, splash correct on the home screen

## Ship

- [ ] Archive + upload (recipe: memory `testflight-release-recipe` — Xcode 26.1 via `DEVELOPER_DIR`, `build/exportOptions.plist`)
- [ ] Build attached to the **Family** external group; public link still enabled
- [ ] Release notes filled in TestFlight ("What to Test")
