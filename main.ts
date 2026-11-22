// Asteroid Dodge — make.fun entry for "The agent builds a game from one prompt".
//
// What this program does: it hands the house the address of the X post that
// carries the entry video. The house reads POST.json from the repository,
// this program copies it to the output directory, and the house reads the
// post itself from X (its views, likes, reposts, quotes and replies decide
// the places). Nothing written here about the post is scored.
//
// Runs on Node 22 with the standard library only — no network, no wall
// clock, no files outside the repository. The two runs of an entry must
// write the same bytes, so this copies the file byte for byte.
//
// Local check, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Outside the grader's sandbox these two stand in for /bot and /output.
const REPO_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(REPO_DIR, 'POST.json');
const TARGET = join(OUT_DIR, 'POST.json');

let raw: Buffer;
try {
  raw = readFileSync(SOURCE);
} catch (err) {
  console.error(`cannot read ${SOURCE}: ${(err as Error).message}`);
  process.exit(1);
}

// The post file must be a JSON object naming one X post address.
let post: unknown;
try {
  post = JSON.parse(raw.toString('utf8'));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  console.error('POST.json must be a JSON object, e.g. {"url": "https://x.com/<handle>/status/<id>"}');
  process.exit(1);
}

if (typeof (post as { url?: unknown }).url !== 'string') {
  console.error('POST.json must carry a "url" string naming the X post');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(TARGET, raw);
