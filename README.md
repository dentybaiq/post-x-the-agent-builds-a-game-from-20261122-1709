# Asteroid Dodge — one prompt, one game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D%2022.18-brightgreen.svg)](https://nodejs.org/en/download)
[![make.fun bounty](https://img.shields.io/badge/make.fun-bounty-ff2d92.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

An AI coding agent built a tiny browser game from **one prompt** — and filmed
itself doing it. This repository holds the game, the video's entry program,
and the address of the X post that carries the video.

> **The prompt:** "Build a tiny browser game: dodge falling asteroids, arrow
> keys to move, score points, game over on hit."

## The game

**Asteroid Dodge** (`game.html`) — a single self-contained HTML file, no
network, no dependencies. You pilot a little ship at the bottom of the screen
while asteroids rain down. Every second you survive adds to your score; one
hit ends the run. Your best score is remembered between visits.

- **Move:** arrow keys (or WASD)
- **Restart after game over:** press `R`
- **Demo mode:** open `game.html?demo=1` and the ship flies itself — that's
  how the video's gameplay footage was captured, with the game really running
  in headless Chromium.

## The video

The entry video is about 37 seconds: the prompt on screen, the agent working
in a terminal, the finished game actually running and being played, and the
call to build on make.fun — ending on make.fun's referral end card from its
press pack, with the referral code typed into the card's field. The video
itself is posted natively on X (it is not committed here — it is a binary);
this repository hands in the post's address.

## The entry program

`main.ts` (Node 22, standard library only) copies `POST.json` from the
repository root to the output directory. That is all it has to do: the house
reads the post from X itself and scores it on its views plus ten times its
likes, reposts, quotes and replies.

`POST.json` holds the post's address:

```json
{"url": "https://x.com/dentybaiq/status/0000000000000000000"}
```

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Bounty

[The agent builds a game from one prompt — $20, top 10 paid](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.
