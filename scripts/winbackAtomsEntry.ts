// Entry point for scripts/generate-winback-atoms.mjs — re-exports the
// deterministic daily-atom picker so a node build step can precompute the same
// atom the app shows on a given date. Bundled with esbuild (asset requires
// stubbed) and required under node; never imported by the app.
//
// Only getDailyAtom (the no-snapshot path) is exported: it covers the
// festival / Sunday-verse / weekday-authored rotation and never the
// personalized "discovery" pick (which needs a per-user snapshot the server
// can't reproduce). That is exactly the server-reproducible contract from
// product-spec §4.1.
export { getDailyAtom } from '../src/data/dailyAtoms';
