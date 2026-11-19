// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry itself is the X post: a GTA 6 meme whose first picture is
// meme.png (Vice City sunset, "13 YEARS WAITING FOR GTA 6" / "MY AGENT
// GOT PAID ON make.fun" with make.fun's ghost), posted from a public
// account with make.fun and the play code in its text. POST.json at the
// repository root names that post's address. This program's only job is
// to hand that address to the gate: it reads POST.json, checks it is a
// well-formed X post address, and copies it byte for byte to
// /output/POST.json, where the house reads it and fetches the post
// itself. Nothing this program writes about the post is judged.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post address as X shows it: https://x.com/<handle>/status/<id>
// (twitter.com, www./mobile. prefixes and /i/web/status/<id> also read).
const POST_URL =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/(?:i\/web\/)?status\/\d+$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const source = join(BOT_DIR, 'POST.json');
let raw: string;
try {
  raw = readFileSync(source, 'utf8');
} catch (err) {
  fail(`POST.json could not be read from ${source}: ${(err as Error).message}`);
}
// The gate refuses a POST.json over 16384 bytes, so refuse it here too.
if (Buffer.byteLength(raw, 'utf8') > 16384) {
  fail(`POST.json is ${Buffer.byteLength(raw, 'utf8')} bytes, over the 16384-byte limit.`);
}
let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  fail(`POST.json could not be read as JSON from ${source}: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('POST.json must be a JSON object with a "url" field.');
}
const url = (parsed as Record<string, unknown>).url;
if (typeof url !== 'string' || !POST_URL.test(url)) {
  fail(`POST.json "url" is not an X post address: ${String(url)}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  fail(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

console.log(`main.ts: POST.json copied to ${OUTPUT_DIR} (post: ${url})`);
