// The section-figure lookup. Keyed on a card's section id, so content carries no
// figure config at all: if a figure exists for that id it renders, if not the card
// is text-only and nothing breaks.
//
// Never Foundations-specific despite where it started — any card-mode content
// (concepts, deities) can carry a figure. The registry is assembled from:
//   FoundationFigure.tsx        — Module 0, the `f-*` ids
//   figures/conceptFigures.tsx  — Module 1 concepts
//
// Section ids are permanent (see CLAUDE.md invariants), so a registry key never
// needs to change once added.
import React from 'react';
import { FOUNDATIONS_FIGURES } from './FoundationFigure';
import { CONCEPT_FIGURES } from './figures/conceptFigures';

const FIGURES: Record<string, React.FC<{ active?: boolean }>> = {
  ...FOUNDATIONS_FIGURES,
  ...CONCEPT_FIGURES,
};

// `active` (the section is the visible page) triggers the arrival staging; static
// figures simply ignore it.
const SectionFigure: React.FC<{ sectionId: string; active?: boolean }> = ({ sectionId, active }) => {
  const Fig = FIGURES[sectionId];
  return Fig ? <Fig active={active} /> : null;
};

export default SectionFigure;
