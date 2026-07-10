// Full-bleed cover images for the Gita book player.
// The user will supply per-chapter art. React Native requires static, existing
// require() paths, so until those images land, every chapter falls back to the
// shared Bhagavad Gita cover. To add real art: drop chapter-N.png into
// assets/gita-covers/ and replace that chapter's entry below with
//   N: require('../../assets/gita-covers/chapter-N.png'),
import { ImageSourcePropType } from 'react-native';

const FALLBACK: ImageSourcePropType = require('../../assets/images/covers/bhagavad-gita-cover.png');

// Key 0 = the "Before You Begin" preface cover.
const CHAPTER_COVERS: { [key: number]: ImageSourcePropType } = {
  0: FALLBACK,
  1: require('../../assets/gita-covers/chapter-1.jpg'),
  2: require('../../assets/gita-covers/chapter-2.jpg'),
  3: require('../../assets/gita-covers/chapter-3.jpg'),
  4: FALLBACK,
  5: FALLBACK,
  6: FALLBACK,
  7: FALLBACK,
  8: FALLBACK,
  9: FALLBACK,
  10: FALLBACK,
  11: FALLBACK,
  12: FALLBACK,
  13: FALLBACK,
  14: FALLBACK,
  15: FALLBACK,
  16: FALLBACK,
  17: FALLBACK,
  18: FALLBACK,
};

export const getChapterCover = (chapterNumber: number): ImageSourcePropType =>
  CHAPTER_COVERS[chapterNumber] ?? FALLBACK;
