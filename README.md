# BugHunter

**[▶ Play now](https://ebrithilnogare.github.io/BugHunter/)**

A browser game disguised as a GitHub pull request review. Hunt down hidden bugs buried inside real-looking code diffs — as fast as you can.

---

<img width="600" height="346" alt="Screenshot 2026-04-05 at 15 49 02" src="https://github.com/user-attachments/assets/0a691e76-0faf-40c3-8ac8-db2daa35168b" />

## What is it?

BugHunter drops you into a fake GitHub PR. The code looks like any other diff you'd review on a Monday morning — except somewhere in those lines, a 🐞 is hiding. Your job is to find all 10 bugs as quickly as possible.

There's no clicking, no menus, just you and the code. Your final score is your total time. Top times are saved to a local leaderboard.

---

## How to play

<!-- Screenshot: active line highlight with bug centered on it -->
<!-- ![Catching a bug](screenshots/catch.png) -->

**1. Scroll through the code**
Use your mouse wheel or arrow keys to scroll. The blue highlighted band in the center of the screen is your active line — that's your "cursor".

**2. Find the bug**
A small arrow badge appears at the top or bottom edge of the screen, pointing toward where the bug is hiding. Navigate toward it by scrolling up or down.

**3. Lock on and wait**
Once the bug is on your active line, hold still for 1 second. A red ring sweeps around the bug — when it completes, you've caught it.

**4. Repeat**
A new bug spawns somewhere else in the diff. Find all 10 to finish.

<!-- Screenshot: leaderboard / done screen -->
<!-- ![Done screen](screenshots/done.png) -->

---

## Tips

- The bug is embedded somewhere *within* the line, not always at the start — read carefully.
- Scroll acceleration builds up — slow down before the bug or you'll overshoot.
- Adjust scroll sensitivity in ⚙ Settings if the default speed feels off.

---

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
```

Pushing to `main` auto-deploys to GitHub Pages via GitHub Actions.
