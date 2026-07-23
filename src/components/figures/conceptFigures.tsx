// Section figures for the Module 1 concepts — the other half of the registry
// that `SectionFigure.tsx` assembles (Foundations' half is `FoundationFigure.tsx`).
//
// House style, per docs/dharma-illustration-spec.md:
//  • Authored 1:1 — SceneFigure at 390 wide (full-bleed), InsetFigure at 342.
//  • No tap-to-enlarge: at 1:1 the labels are readable on glass.
//  • Arrival staging only, via BuildIn. No ambient loops.
//  • react-native-svg renders gradients and layered opacity but NOT SVG filters —
//    glow is stacked translucent shapes and radial gradients.
//
// Every figure has a stated job: "this makes visible that ___" or "this stops the
// reader thinking ___". A figure that can only be described as "a picture of X"
// is decoration and does not belong here.
import React from 'react';

export const CONCEPT_FIGURES: Record<string, React.FC<{ active?: boolean }>> = {
  // Concept figures land here per the section-figure program (dharma first).
};
