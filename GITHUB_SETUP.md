# GitHub Setup Checklist

> **Remove this file before or after completing setup.**

## 1. Create the GitHub repository

- Go to github.com → **New repository**
- Name it exactly: `BugHunter` (the `basePath` in `next.config.ts` is derived from the repo name automatically via `${{ github.event.repository.name }}` in the workflow)
- Set it to **Public** (GitHub Pages is free for public repos; private requires a paid plan)
- Do **not** initialize with README (you already have one)

## 2. Push your code

```bash
git remote add origin https://github.com/YOUR_USERNAME/BugHunter.git
git push -u origin main
```

## 3. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Save

That's it — no secrets needed. The workflow uses the built-in `GITHUB_TOKEN` with the `pages: write` and `id-token: write` permissions declared in `deploy.yml`.

## 4. Trigger the first deploy

The workflow runs automatically on every push to `main`. After your first push it will appear under the **Actions** tab. Wait for it to complete (usually ~1–2 min).

## 5. Visit your site

Once the workflow succeeds, your app will be live at:

```
https://YOUR_USERNAME.github.io/BugHunter/
```

## Troubleshooting

| Problem | Fix |
|---|---|
| 404 on the Pages URL | Wait a minute and refresh; first deploy can be slow |
| Build fails with `basePath` error | Verify `next.config.ts` has `output: "export"` and `basePath: process.env.NEXT_PUBLIC_BASE_PATH \|\| ""` |
| White screen on GitHub Pages | Check the browser console — likely an asset path issue; make sure `basePath` is set correctly |
| Actions tab shows no workflow | Ensure `.github/workflows/deploy.yml` was committed and pushed |
