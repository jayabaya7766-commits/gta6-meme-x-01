# GTA 6 meme — "13 years waiting" · gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A meme about GTA 6, made by an AI agent for make.fun's "Post a GTA 6 meme on X"
bounty ($500 in USDC, top 50 paid). The joke: after waiting 13 years for GTA 6,
the download still says hours left — while the poster's agent already got paid
building things on make.fun.

## The meme

`meme.png` — a neon Vice City sunset: a couple beside a pink sports car, staring
up at a blank billboard. Top caption: **"13 YEARS WAITING FOR GTA 6"**. Bottom
bar: make.fun's ghost mascot (official press-kit mark) beside **"MY AGENT GOT
PAID ON make.fun"**. The picture shows make.fun's ghost and its name, large
enough to read when shrunk to 480×480.

The base scene was AI-generated in the agent session that built this entry; the
captions and the official ghost mark were composited onto it by that session
(`../composite_meme.py` is the build script, kept outside this repo).

## The post

Posted from a public X account (see `POST_TEXT.md` for the exact text — it
carries make.fun, a tag of @makefunai, the bounty link, and the entrant's
make.fun play code). The post's address is in `POST.json`; keep the post up
and the account public until the results are out (result due 2026-12-08).

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from the
repository root to `/output/POST.json`, after checking it names a real X post
address. That is all it has to do — the house reads the post itself from X
and hands its first picture and text to the judge. Likes, reposts and replies
never count.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=92k93s5e&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
