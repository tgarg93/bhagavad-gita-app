# Diwali 2026 Launch — Workback Plan

Ship Dharma to the App Store and hold a launch party by **Diwali — Sunday, November 8, 2026**. Plan approved July 19, 2026 (16 weeks out). Decisions locked at approval:

- **Expert review is volunteer/advisory** (named credit, no pay), with a paid-stipend fallback gate on Aug 21.
- **iOS only** for Diwali; Android is a named fast-follow.
- **Launch free**; monetization ships as a plan document (`docs/monetization-plan.md`), not code.
- **Website + launch video are built in-house** (Claude builds site and scripts/storyboards video; Tushar records).

Companion docs: `docs/launch/expert-outreach.md` (reviewer recruiting), `docs/launch/user-interview-guide.md`, `docs/launch/pmf-metrics.md`. Review packets regenerate with `node scripts/export-review-packets.mjs` (output gitignored — regenerate after any content change).

## Hard dates (working backward from Nov 8)

| Date | Milestone |
|---|---|
| **Nov 8 (Diwali)** | Launch party; app publicly live; video public |
| Nov 4–5 | Manual App Store release (live *before* the party so guests can download) |
| **Oct 20–21** | Submit to App Store (buffer for one rejection cycle; review is 1–7 days) |
| **Oct 16** | Feature freeze + release-candidate build; full `docs/release-checklist.md` pass |
| **Oct 9** | Expert review returns due; final content-fix window opens |
| Sep 29 | App Store asset work starts (screenshots, description, privacy labels) |
| **Sep 1** | Expert review packets distributed; review window opens (5–6 weeks) |
| **Aug 21** | **GO/NO-GO on volunteer experts** — if <2 confirmed reviewers, switch to stipend fallback that day |
| **Jul 21 (Mon)** | Expert outreach begins; TestFlight build 9 goes out |

## Workstream 1 — Expert content review (critical path)

The claim being earned: **"Content reviewed by scholars of Hindu studies"** with named credits in-app, on the website, and in the App Store description.

- **Scope**: 134k words in four packets (A: Gita & scripture ~23k · B: festivals & practice ~42k · C: Foundations & philosophy ~40k · D: deities & stories ~29k). Each packet is ~8–14 hours of annotating review; one reviewer takes one packet.
- **Week of Jul 21**: send outreach (see `docs/launch/expert-outreach.md`) to 8–10 prospects; aim to land 3–4. Primary targets: GTU Berkeley (Shingal Center for Dharma Studies — best single fit), UC Berkeley South Asian Studies, Harvard Divinity, UT Austin, Columbia/Chicago religion, Hindu Students Council chapters; temple scholars as a secondary tier.
- **Aug 21 — go/no-go**: <2 confirmed → offer $300–500/packet stipend (~$1.5k total budget).
- **Sep 1 – Oct 9 — review window**: packets as Google Docs, reviewers annotate in place; weekly check-ins; fixes applied rolling. Content-only fixes are OTA-safe. **Any Foundations change: redo the 87-point sum** (see CLAUDE.md invariants).
- **Oct 9–16**: reviewer names/affiliations shipped in-app (credits screen), on the website, and in the App Store description — each reviewer signs off on their credit line.
- **Scope control**: reviewers verify *accuracy, citations, and framing* — not prose style. Contested-tradition flags get the standing editorial rule ("this is one common way — ask your family how they do it").

## Workstream 2 — Engineering to submission

Continues the production plan's C4→D sequence, now with dates:

- **Jul 21–25**: TestFlight **build 9** (native — Sentry). Starts the 2-week push-only sync soak. Clear outstanding manual actions: `eas login`, confirm old Gemini key revoked, delete VAPI account, taste-test the Krishna persona on `gemini-flash-latest`.
- **Jul 28 – Aug 8**: **C4 pull+merge** — unit tests first (the repo's first; per-key monotone merge rules), land behind soak evidence. TestFlight build 10.
- **Aug 11–22**: **C5 Sign in with Apple** (Apple Developer portal + Supabase Apple provider) and **C6 account deletion** (App Store requirement given accounts).
- **Aug 25 – Sep 5**: buffer + orphaned-feature decision: the unreachable data-export screens either get wired in alongside C6 or deleted before submission.
- **Sep 29 – Oct 10**: **submission package** — screenshots (6.7"/6.1"), description with the expert-review claim, keywords, privacy nutrition labels (Sentry/PostHog/Supabase; telemetry is ids/counts only), age-rating questionnaire (**Ask Krishna is AI chat — answer the AI-content questions honestly; expect 12+/13+**), support URL (new website), privacy policy page.
- **Oct 16**: feature freeze; RC build; full manual smoke per `docs/release-checklist.md`; `grep -rn "TEMP-VERIFY" src App.tsx` clean; tsc ≤ 77.
- **Oct 20–21**: submit with **manual release**. A rejection still leaves a full fix cycle before Nov 4.

## Workstream 3 — User testing / PMF proof

- **Week of Jul 28**: metric definitions live in PostHog (see `docs/launch/pmf-metrics.md`): activation = Foundations Part 1 complete; D7 retention; journey items/week; Krishna messages/user. Funnels + dashboard built.
- **Aug 4–15**: **Beta wave 1** — grow TestFlight to ~25–30 target-segment users (diaspora Hindus reconnecting) via personal network, r/hinduism, HSC chapters, temple WhatsApp groups; public TestFlight link.
- **Aug 18–29**: **Interview round 1** — 8–10 conversations using `docs/launch/user-interview-guide.md`; findings feed content/UX fixes before freeze.
- **Sep 8–19**: **Beta wave 2** (~75–100 users) + in-app **Sean Ellis survey** ("how disappointed if Dharma went away?" — ≥40% "very" is the PMF signal).
- **Oct**: findings frozen into the launch narrative; testimonials collected with permission.

## Workstream 4 — Website + launch video

- **Aug 25 – Sep 12**: static marketing site (no backend; Vercel). Pages: home (hero + App Store link), the expert-review story with reviewer credits, privacy policy (required for submission), press kit. **Domain purchased by ~Sep 1.**
- **Sep 15–26**: video script + storyboard — 60–90s: the "why" (diaspora reconnection), three hero moments (Foundations reader with narration, Ask Krishna, level identity), the expert-review trust beat, Diwali CTA.
- **Sep 29 – Oct 17**: record screen captures + voiceover; edit (CapCut/DaVinci). **Locked by Oct 17** so it's available for submission-week marketing.
- **Oct 20 – Nov 7**: video unlisted for the party; social teasers.

## Workstream 5 — Monetization plan (document only)

- **Week of Sep 22**: draft `docs/monetization-plan.md` — recommended model (leading candidate: free core + supporter tier or one-time unlock for premium narration/kid mode, honoring the "nothing locked" principle for the journey), pricing research, RevenueCat sketch, v1.1 timeline keyed to post-launch retention data. Launch narrative: "free at launch, sustainably supported later."

## Workstream 6 — Launch party + go-to-market

- **Sep 15**: venue + date locked (party Sat Nov 7 or Diwali evening Nov 8); rough guest list.
- **Oct 6**: invites out (Diwali-season calendars fill early); Partiful/Luma page.
- **Oct 27 – Nov 7**: demo stations (2–3 devices, live app), video on loop, QR download cards, a thank-you moment for the expert reviewers — invite them.
- **Nov 4–8 GTM**: r/hinduism + diaspora subreddit posts, personal LinkedIn/X launch post, WhatsApp groups, beta users asked for day-one App Store reviews; Product Hunt optional.

## Top risks

1. **Volunteer reviewers flake** → over-recruit 8–10, hard gate Aug 21, ~$1.5k stipend fallback. The only workstream that can silently kill the "expert reviewed" claim.
2. **App Store rejection on AI chat** → honest age-rating answers; document the Ask Krishna moderation story (client persona guardrails + server-side 10/min · 60/day rate limits); submit Oct 20 leaving a full fix cycle.
3. **C4 pull+merge regression** (riskiest code change) → unit tests mandatory; lands early August so it soaks 8+ weeks before public launch.
4. **PMF signal late or negative** → beta waves start early August precisely so September findings can still change content/UX before the Oct 16 freeze.
