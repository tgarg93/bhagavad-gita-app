# PMF metrics — PostHog definitions (beta, Aug–Oct 2026)

Workstream 3 of `docs/diwali-launch-plan.md`. All events already fire from `telemetryService` capture points (ids/counts/levels only — never content). Build these as saved insights + one "Beta PMF" dashboard in PostHog during the week of Jul 28.

## Star metrics

| Metric | Definition (PostHog) | Beta target |
|---|---|---|
| **Activation** | % of users with `onboarding_completed` who fire `journey_item_completed` with a `foundations:*` id within 72h of first open | ≥ 40% |
| **D7 retention** | % of activated users with any event on day 7 (±1) after first open | ≥ 25% |
| **Learning velocity** | median `journey_item_completed` per active user per week | ≥ 2 |
| **Krishna engagement** | % of weekly actives with ≥1 `krishna_message_sent`; median messages among them | ≥ 30% |
| **Sean Ellis** | survey (below), "very disappointed" share | **≥ 40%** |

## Supporting funnels

1. **Onboarding → activation**: `onboarding_completed` → `content_reader_opened` → first `journey_item_completed` — where do people stall?
2. **Foundations completion curve**: `journey_item_completed` by `foundations:*` id in order — which part bleeds readers?
3. **Daily loop**: `daily_chai_viewed` → any same-day learning event — does the daily card actually pull people deeper?
4. **Level-up reachability**: `capstone_passed` and level-up counts — is anyone reaching Shishya in beta? (If zero by Sep 1, the progression story needs work before launch.)

## Sean Ellis survey (beta wave 2, Sep 8–19)

One in-app prompt (or emailed Typeform to wave-2 testers after ≥2 weeks of usage): "How would you feel if you could no longer use Dharma?" — Very disappointed / Somewhat disappointed / Not disappointed, plus "What would you miss most?" free text. ≥40% "very" = the PMF signal we cite at launch; segment the answer by activated vs not before believing it.

## Hygiene

- Exclude internal users (your own device ids) from every insight.
- Check weekly during beta; screenshot the dashboard into the launch narrative doc at freeze (Oct 16).
- New events wanted (e.g. reflection_started) go through `telemetryService` and follow the ids/counts-only rule — update CLAUDE.md's capture-point list in the same commit.
