#!/usr/bin/env node
// Export the app's content corpus into four Markdown review packets for the
// expert content-review pass (docs/diwali-launch-plan.md, Workstream 1):
//   A — Gita & Scripture   B — Festivals & Everyday Practice
//   C — Foundations & Philosophy   D — Deities & Stories
//
// Usage: node scripts/export-review-packets.mjs
// Output: docs/review-packets/*.md (gitignored — point-in-time artifacts;
// regenerate after content changes). Bundles scripts/reviewPacketEntry.ts via
// npx esbuild with image/audio requires stubbed, then renders every
// content-bearing field, including check answers, rubrics, and citations —
// reviewers must see every claim the app makes.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs', 'review-packets');
const generatedOn = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// 1. Bundle the data modules for node
// ---------------------------------------------------------------------------

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dharma-review-'));
const bundlePath = path.join(tmp, 'content.cjs');
execFileSync(
  'npx',
  [
    '--yes',
    'esbuild',
    path.join(root, 'scripts', 'reviewPacketEntry.ts'),
    '--bundle',
    '--platform=node',
    '--format=cjs',
    `--outfile=${bundlePath}`,
    '--loader:.png=empty',
    '--loader:.jpg=empty',
    '--loader:.jpeg=empty',
    '--loader:.gif=empty',
    '--loader:.mp3=empty',
    '--log-level=warning',
  ],
  { stdio: 'inherit', cwd: root }
);

const data = createRequire(import.meta.url)(bundlePath);

// ---------------------------------------------------------------------------
// 2. Markdown helpers
// ---------------------------------------------------------------------------

let out; // current packet buffer

const w = (line = '') => out.push(line);

const para = (text) => {
  if (text) {
    w(String(text).trim());
    w();
  }
};

const bulletList = (items, prefix = '') => {
  for (const item of items || []) w(`- ${prefix}${item}`);
  if (items?.length) w();
};

const humanize = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());

const renderVerse = (v, label) => {
  if (!v) return;
  if (label) w(`**${label}**`);
  w();
  const src = v.source ? `  \n— *${v.source}*` : '';
  w(`> ${v.sanskrit}  \n> *${v.transliteration}*  \n> ${v.meaning}${src}`);
  w();
};

const renderCheck = (check, reflectionQuestions) => {
  if (check.kind === 'mcq') {
    w(`> **Check (multiple choice${check.practice ? ', practice' : ''}):** ${check.prompt}`);
    for (const opt of check.options) w(`> - ${opt.correct ? '**✓** ' : ''}${opt.text}`);
    w(`> *Why:* ${check.why}`);
  } else if (check.kind === 'recall') {
    w(`> **Check (free recall):** ${check.prompt}`);
    w(`> *A good answer includes (${check.passCount} of ${check.rubric.length}):*`);
    for (const r of check.rubric) w(`> - ${r}`);
    w(`> *Model answer:* ${check.modelAnswer}`);
  } else if (check.kind === 'reflect') {
    const q = reflectionQuestions?.[check.questionIndex];
    w(`> **Reflection prompt:** ${q ?? `(reflection question #${check.questionIndex + 1})`}`);
  }
  w();
};

const renderCapstone = (c) => {
  w(`### Capstone: ${c.prompt}`);
  w();
  w(`*Passing requires ${c.passCount} of ${c.rubric.length} ideas:*`);
  w();
  c.rubric.forEach((r, i) => {
    const src = c.rubricSource?.[i] ? ` *(taught in: ${c.rubricSource[i]})*` : '';
    w(`- ${r}${src}`);
  });
  w();
  para(`**Model answer:** ${c.modelAnswer}`);
};

const renderSections = (sections, reflectionQuestions) => {
  for (const s of sections || []) {
    const kind = s.kind ? ` *(${s.kind} page)*` : '';
    w(`### ${s.title}${s.subtitle ? ` — ${s.subtitle}` : ''}${kind}`);
    w();
    if (s.takeaway) para(`**Takeaway:** ${s.takeaway}`);
    renderVerse(s.openingVerse, 'Opening verse');
    para(s.storyText);
    bulletList(s.bullets);
    if (s.sectionHeader) para(`**${s.sectionHeader}**`);
    renderVerse(s.keyVerse, 'Key verse');
    para(s.teachingText);
    if (s.reappears) para(`*Reappears:* ${s.reappears}`);
    if (s.citation) para(`*Citation:* ${s.citation}`);
    for (const check of s.checks || []) renderCheck(check, reflectionQuestions);
  }
};

const renderSources = (sources) => {
  if (!sources?.length) return;
  w(`**Sources (verified against):**`);
  w();
  for (const s of sources) {
    const tr = s.translation ? ` · tr. ${s.translation}` : '';
    w(`- ${s.text}, ${s.locator}${tr}`);
  }
  w();
};

const renderReflections = (questions) => {
  if (!questions?.length) return;
  w(`**Reflection questions:**`);
  w();
  bulletList(questions);
};

// Media/app-plumbing fields that carry no reviewable claims.
const SKIP_KEYS = new Set([
  'id', 'order', 'coverImage', 'imageUrl', 'heroImageUrl', 'galleryImages',
  'images', 'videoUrl', 'audioUrl', 'audioGuide', 'audioGuides', 'videoGuides',
  'podcastEpisodes', 'emoji', 'colors', 'difficulty', 'importance', 'category',
  'dateType', 'duration', 'date', 'occurrences', 'relatedFestivals',
  'relatedConcepts', 'relatedPractices', 'starterPack', 'complete',
  'lessonSize', 'deityRef', 'sourceRef', 'citationLink', 'deeper', 'learnIndex',
  'banked', 'suitableFor', 'timeCommitment',
]);

// Generic deep renderer for the encyclopedic shapes (festival, deity, concept,
// practice) — walks every field so no claim is silently dropped, with the
// shared shapes (sections/sources/reflections) handed to their renderers.
const renderGeneric = (obj, depth = 4) => {
  for (const [key, value] of Object.entries(obj)) {
    if (SKIP_KEYS.has(key) || value == null) continue;
    if (key === 'sections') {
      renderSections(value, obj.reflectionQuestions);
      continue;
    }
    if (key === 'sources') { renderSources(value); continue; }
    if (key === 'reflectionQuestions') { renderReflections(value); continue; }
    if (key === 'capstone') { renderCapstone(value); continue; }
    if (typeof value === 'string') {
      if (['name', 'title'].includes(key)) continue; // already in the heading
      para(`**${humanize(key)}:** ${value}`);
    } else if (Array.isArray(value)) {
      if (!value.length) continue;
      if (typeof value[0] === 'string') {
        w(`**${humanize(key)}:**`);
        w();
        bulletList(value);
      } else {
        w(`**${humanize(key)}:**`);
        w();
        for (const item of value) {
          const title = item.name || item.title || item.situation || item.text || '';
          if (title) w(`${'#'.repeat(Math.min(depth + 1, 6))} ${title}`);
          w();
          renderGeneric(item, depth + 1);
        }
      }
    } else if (typeof value === 'object') {
      w(`**${humanize(key)}:**`);
      w();
      renderGeneric(value, depth + 1);
    }
  }
};

const packetHeader = (letter, title, contents) => {
  w(`# Dharma review packet ${letter} — ${title}`);
  w();
  w(`*Generated ${generatedOn} from the app's content files. For reviewer instructions — what to check, how to annotate — see the accompanying project brief.*`);
  w();
  w(`**In this packet:** ${contents}`);
  w();
  w(`**How to read this document:** every heading is a screen or card in the app; block quotes are verses or knowledge checks exactly as the reader sees them (✓ marks the answer the app treats as correct). *Citation* lines and **Sources** lists are the provenance the app displays — please flag citations that are wrong or too weak to carry the claim, not just factual errors.`);
  w();
  w('---');
  w();
};

// ---------------------------------------------------------------------------
// 3. The four packets
// ---------------------------------------------------------------------------

const packets = [];
const startPacket = (file, letter, title, contents) => {
  out = [];
  packets.push({ file, letter, title, lines: out });
  packetHeader(letter, title, contents);
};

// ——— Packet A — Gita & Scripture ———
startPacket(
  'packet-a-gita-and-scripture.md',
  'A',
  'Gita & Scripture',
  'the Bhagavad Gita narrative edition (18 chapters), the Ramayana and Principal Upanishads readers, and the prayer library (full liturgical texts with translations).'
);

w(`## Bhagavad Gita — narrative edition`);
w();
para(`*${data.gitaPreface.subtitle}*`);
const renderGitaBlocks = (blocks) => {
  for (const b of blocks) {
    if (b.type === 'header') { w(`**${b.text}**`); w(); }
    else if (b.type === 'verse') renderVerse(b.verse, `Verse ${b.verse.reference}`);
    else para(b.text);
  }
};
renderGitaBlocks(data.gitaPreface.blocks);
for (const ch of data.gitaChapters) {
  w(`## Gita Chapter ${ch.number} — ${ch.subtitle}`);
  w();
  renderGitaBlocks(ch.blocks);
  renderReflections(ch.reflectionQuestions || data.gitaReflections[ch.number]);
}
w(`## Per-verse insights (shown under key verses)`);
w();
for (const [ref, insight] of Object.entries(data.gitaVerseInsights)) {
  para(`**${ref}:** ${insight}`);
}
for (const collection of data.COLLECTIONS) {
  w(`## ${collection.title} (${collection.sanskritName})`);
  w();
  para(collection.blurb);
  for (const part of data.ALL_SCRIPTURE_PARTS.filter((p) => p.collection === collection.id)) {
    w(`## ${collection.title}: ${part.name}${part.sanskritName ? ` (${part.sanskritName})` : ''} — ${part.subtitle}`);
    w();
    renderSections(part.sections, part.reflectionQuestions);
    renderReflections(part.reflectionQuestions);
    renderSources(part.sources);
  }
}
w(`## Prayer library`);
w();
for (const prayer of data.PRAYERS) {
  w(`## Prayer: ${prayer.title} — ${prayer.subtitle}`);
  w();
  para(`**Attribution (as shown in-app):** ${prayer.attribution}`);
  para(`**When to recite:** ${prayer.whenToRecite}`);
  for (const page of prayer.intro) {
    w(`### ${page.title}`);
    w();
    para(page.text);
  }
  for (const v of prayer.verses) {
    renderVerse(
      { sanskrit: v.devanagari, transliteration: v.transliteration, meaning: v.meaning },
      v.label
    );
  }
}

// ——— Packet B — Festivals & Everyday Practice ———
startPacket(
  'packet-b-festivals-and-practice.md',
  'B',
  'Festivals & Everyday Practice',
  'every festival entry (story, mythology, traditions, rituals, regional variations), the yoga & spiritual-practices library, and the Daily Chai cards (bite-sized daily facts with citations).'
);
for (const f of data.festivalData) {
  w(`## Festival: ${f.name}${f.sanskritName ? ` (${f.sanskritName})` : ''}`);
  w();
  renderGeneric(f);
}
w(`## Yoga & spiritual practices`);
w();
for (const p of data.yogaPracticesData) {
  w(`## Practice: ${p.name} (${p.sanskritName})`);
  w();
  renderGeneric(p);
}
w(`## Daily Chai cards`);
w();
para(
  'One card is shown per day. Each card is a hook line, a 2–4 sentence body, and the citation the app displays under it.'
);
for (const atom of [...data.ALL_AUTHORED_ATOMS, data.ONBOARDING_ATOM]) {
  w(`### ${atom.hook}`);
  w();
  if (atom.sanskrit) {
    renderVerse({
      sanskrit: atom.sanskrit.devanagari,
      transliteration: atom.sanskrit.transliteration,
      meaning: atom.sanskrit.meaning || '',
    });
  }
  para(atom.body);
  para(`*Citation:* ${atom.citation}`);
}

// ——— Packet C — Foundations & Philosophy ———
startPacket(
  'packet-c-foundations-and-philosophy.md',
  'C',
  'Foundations & Philosophy',
  'the Foundations course (8 parts + capstone — the app\'s guided introduction to Hinduism) and the philosophy library (core concepts, spiritual paths, ethical values).'
);
for (const act of data.FOUNDATIONS_ACTS) {
  w(`## Foundations Part ${act.order}: ${act.title} — ${act.subtitle}`);
  w();
  para(`*${act.kicker}*`);
  for (const p of act.intro) para(p);
  if (act.learnItems?.length) {
    w(`**In this part:**`);
    w();
    bulletList(act.learnItems);
  }
  renderSections(act.sections, act.reflectionQuestions);
  renderReflections(act.reflectionQuestions);
  if (act.capstone) renderCapstone(act.capstone);
  renderSources(act.sources);
}
w(`## Philosophy library`);
w();
for (const c of data.philosophyData) {
  w(`## Concept: ${c.name} (${c.sanskritName})`);
  w();
  renderGeneric(c);
}

// ——— Packet D — Deities & Stories ———
startPacket(
  'packet-d-deities-and-stories.md',
  'D',
  'Deities & Stories',
  'every deity entry (mythology, iconography, mantras, worship, stories) and the story library (Upanishad dialogues and kathas told in the app\'s narrative reader).'
);
for (const d of data.deitiesData) {
  w(`## Deity: ${d.name} (${d.sanskritName})`);
  w();
  renderGeneric(d);
}
w(`## Story library`);
w();
for (const s of data.ALL_STORIES) {
  w(`## Story: ${s.title}${s.sanskritTitle ? ` (${s.sanskritTitle})` : ''} — ${s.subtitle}`);
  w();
  para(`*Collection: ${s.collection === 'upanishad' ? 'Stories of the Upanishads' : 'Kathas'}*`);
  renderSections(s.sections, s.reflectionQuestions);
  renderReflections(s.reflectionQuestions);
  renderSources(s.sources);
}

// ---------------------------------------------------------------------------
// 4. Write files + report
// ---------------------------------------------------------------------------

fs.mkdirSync(outDir, { recursive: true });
let totalWords = 0;
for (const p of packets) {
  const text = p.lines.join('\n');
  fs.writeFileSync(path.join(outDir, p.file), text);
  const words = text.split(/\s+/).filter(Boolean).length;
  totalWords += words;
  console.log(
    `Packet ${p.letter} — ${p.title}: ${words.toLocaleString()} words (~${Math.round(words / 3000)}h at annotating-review pace) → ${path.relative(root, path.join(outDir, p.file))}`
  );
}
console.log(`Total: ${totalWords.toLocaleString()} words across ${packets.length} packets.`);
fs.rmSync(tmp, { recursive: true, force: true });
