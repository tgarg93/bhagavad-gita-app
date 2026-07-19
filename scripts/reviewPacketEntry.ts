// Entry point for scripts/export-review-packets.mjs — re-exports every content
// collection that goes into the expert review packets. Bundled with esbuild
// (asset requires stubbed) and required under node; never imported by the app.
export { festivalData } from '../src/data/festivals';
export { philosophyData } from '../src/data/philosophyAndTeachings';
export { FOUNDATIONS_ACTS } from '../src/data/foundations';
export { deitiesData } from '../src/data/godsAndDeities';
export {
  gitaPreface,
  gitaChapters,
  gitaReflections,
  gitaVerseInsights,
} from '../src/data/bhagavadGitaContent';
export { ALL_STORIES } from '../src/data/stories';
export { COLLECTIONS, ALL_SCRIPTURE_PARTS } from '../src/data/scriptureTexts';
export { ALL_AUTHORED_ATOMS, ONBOARDING_ATOM } from '../src/data/dailyAtoms';
export { PRAYERS } from '../src/data/prayers';
export { yogaPracticesData } from '../src/data/yogaAndPractices';
