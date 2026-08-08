// Extract narrated section text from a content .ts file WITHOUT executing it
// (the data modules `require()` image assets, which Node can't load). We parse
// the TypeScript AST and pull the string fields directly.
//
// Returns sections in source order: { id, kind, takeaway, storyText, bullets[],
// teachingText, openingVerseMeaning, sectionHeader }. A "section" is any object
// literal that has an `id` plus at least one narrated field.

import { readFileSync } from 'node:fs';
import ts from 'typescript';

const STRING_FIELDS = ['id', 'kind', 'takeaway', 'storyText', 'teachingText', 'sectionHeader'];

function strOf(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return undefined;
}
function propName(p) {
  if (!p.name) return undefined;
  if (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) return p.name.text;
  return undefined;
}

export function extractSections(tsPath) {
  const src = readFileSync(tsPath, 'utf8');
  const sf = ts.createSourceFile(tsPath, src, ts.ScriptTarget.Latest, true);
  const sections = [];

  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const fields = {};
      let hasId = false;
      let hasNarration = false;
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const name = propName(p);
        if (!name) continue;
        if (name === 'id') { fields.id = strOf(p.initializer); hasId = !!fields.id; }
        else if (STRING_FIELDS.includes(name)) {
          const v = strOf(p.initializer);
          if (v !== undefined) { fields[name] = v; if (['takeaway', 'storyText', 'teachingText'].includes(name)) hasNarration = true; }
        } else if (name === 'banked') {
          fields.banked = p.initializer.kind === ts.SyntaxKind.TrueKeyword;
        } else if (name === 'bullets' && ts.isArrayLiteralExpression(p.initializer)) {
          const arr = p.initializer.elements.map(strOf).filter((s) => s !== undefined);
          if (arr.length) { fields.bullets = arr; hasNarration = true; }
        } else if (name === 'openingVerse' && ts.isObjectLiteralExpression(p.initializer)) {
          for (const q of p.initializer.properties) {
            if (ts.isPropertyAssignment(q) && propName(q) === 'meaning') {
              fields.openingVerseMeaning = strOf(q.initializer);
            }
          }
        }
      }
      if (hasId && (hasNarration || fields.openingVerseMeaning)) sections.push(fields);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return sections;
}
