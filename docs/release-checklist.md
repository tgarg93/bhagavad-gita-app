# Release checklist — TestFlight uploads

Manual smoke tests until automated coverage lands (Wave 2). Run the **Simulator pass** for every upload; run the **Device pass** on the TestFlight build itself for anything hardware-dependent. Check items off in a scratch copy — this file stays pristine.

## Pre-flight (code)

- [ ] `npx tsc --noEmit` — at or below the current baseline (116); no new errors
- [ ] `grep -rn "TEMP-VERIFY" src App.tsx` — clean
- [ ] `CFBundleVersion` bumped in `ios/Dharma/Info.plist` (every upload needs a new build number)
- [ ] `docs/product-spec.md` reflects everything in this release
- [ ] All work committed and pushed

## Simulator pass

**Fresh install** (delete app from simulator first):
- [ ] Splash: cream throughout, no white flash, no stray dots
- [ ] Onboarding: all 6 steps advance; name skip works; family-stream question single-selects; step 5 shows path with intro card
- [ ] **Begin the path** → lands in "What is Hinduism?" reader
- [ ] Fresh install again → **Skip for now** → lands on Home

**Home:**
- [ ] Status row shows level (Jigyasu for fresh) → taps to Profile tab
- [ ] Daily Chai card (ONE card): correct type for today's weekday (Sun/Wed verse, Mon why, Tue saying, Thu story, Fri question, Sat word) with that type's layout + accent tint; citation line; 📖 opens the linked content (only when link exists)
- [ ] Chai ▶: plays and **toggles off on second tap** — on word/saying days the Devanagari speaks first (Hindi voice), then the English; verse days English-first; stop mid-Sanskrit kills the whole sequence
- [ ] Verse day: 📖 opens that Gita chapter
- [ ] Continue card body → next journey item; **View full path** footer → path screen

**Journey:**
- [ ] Path screen: intro card, correct totals, current module expanded, NEXT framed item; rows navigate
- [ ] Complete an item (swipe to its end) → marigold celebration plays once (not again on swipe-back); checkmark appears on path; Continue card advances

**Readers:**
- [ ] Content reader: cover → sections with footnote citations → last text page ends with Sources card → reflections (skippable) → celebration
- [ ] Gita player: cover art for ch 1–3; transport prev/next moves voice AND page; ±10s works
- [ ] "Ask Krishna about this" (⋮ menu) → chat opens seeded with the content

**Ask Krishna:**
- [ ] Greeting renders in reflection-style bubbles (avatar outside)
- [ ] First suggested prompt = today's chai question
- [ ] A reply arrives (Gemini key valid, quota OK)

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
