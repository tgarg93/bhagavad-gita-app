#!/usr/bin/env node
// Precompute the deterministic Daily Chai atom for a rolling window of future
// dates, so the remote win-back push (supabase/functions/send-winback-push) can
// send the SAME atom the app would show on that day — without running any RN
// code server-side. Reproduces getDailyAtom(date) exactly (product-spec §4.1).
//
// Usage:  node scripts/generate-winback-atoms.mjs [days]     (default 400)
// Output: supabase/functions/send-winback-push/atoms.json
//         { generatedOn, title, days: { "YYYY-MM-DD": { body, data } } }
//
// Regenerate + redeploy the function whenever atom content changes (same
// native/asset-change cadence as the bundled narration). Bundles
// scripts/winbackAtomsEntry.ts via `npx esbuild` with image/audio requires
// stubbed to 'empty' (getDailyAtom never reads the asset values) — the exact
// pattern scripts/export-review-packets.mjs uses.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DAYS = Number(process.argv[2]) || 400;
const OUT_DIR = path.join(root, 'supabase', 'functions', 'send-winback-push');
const OUT_FILE = path.join(OUT_DIR, 'atoms.json');

// Must match notificationService's local Daily Chai title exactly.
const TITLE = '☕ Your chai is ready';

// --- 1. Bundle the picker for node (asset requires stubbed) ------------------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dharma-winback-'));
const bundlePath = path.join(tmp, 'atoms.cjs');
execFileSync(
  'npx',
  [
    '--yes',
    'esbuild',
    path.join(root, 'scripts', 'winbackAtomsEntry.ts'),
    '--bundle',
    '--platform=node',
    '--format=cjs',
    `--outfile=${bundlePath}`,
    '--loader:.png=empty',
    '--loader:.jpg=empty',
    '--loader:.jpeg=empty',
    '--loader:.gif=empty',
    '--loader:.webp=empty',
    '--loader:.mp3=empty',
    '--loader:.wav=empty',
    '--loader:.m4a=empty',
    '--log-level=warning',
  ],
  { stdio: 'inherit', cwd: root }
);

const { getDailyAtom } = createRequire(import.meta.url)(bundlePath);

// --- 2. Walk the window, keyed by local calendar date ------------------------
// getDailyAtom keys off the date's local Y/M/D (localDayNumber), so build each
// day at local noon to pin the calendar date unambiguously. The deep-link
// payload MUST match notificationService: sourceRef → contentref, else Home.
const pad = (n) => String(n).padStart(2, '0');
const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const days = {};
const start = new Date();
start.setHours(12, 0, 0, 0);
for (let i = 0; i < DAYS; i++) {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  const atom = getDailyAtom(d);
  days[dayKey(d)] = {
    body: atom.hook,
    data: atom.sourceRef
      ? { url: 'contentref', ref: atom.sourceRef }
      : { url: 'dailychai' },
  };
}

// --- 3. Write + report -------------------------------------------------------
fs.mkdirSync(OUT_DIR, { recursive: true });
const payload = {
  generatedOn: new Date().toISOString().slice(0, 10),
  title: TITLE,
  days,
};
fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n');
fs.rmSync(tmp, { recursive: true, force: true });

const keys = Object.keys(days);
console.log(
  `Wrote ${keys.length} days (${keys[0]} → ${keys[keys.length - 1]}) to ${path.relative(root, OUT_FILE)}`
);
