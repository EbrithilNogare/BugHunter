# BugHunter

[LINK TO GAME](https://ebrithilnogare.github.io/BugHunter/)

A browser game disguised as a GitHub pull request code review.

Scroll through the fake PR diff and hunt down 10 bug icons hidden across the code. Center the highlighted active line on the bug and hover over it for 1 second to catch it. Your score is how fast you find all 10. Top times are saved to a local leaderboard.

## How to play

1. Click **Start Hunt**
2. Scroll up/down — the center line is the active line
3. Follow the red arrow badge (top/bottom) to find where the bug is hiding
4. Position the bug on the active line and hover over it for 1 second to catch it
5. Repeat until all 10 bugs are caught

## Development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build   # outputs to /out (static export)
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages automatically.
