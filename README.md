# scube

A Progressive Web App that teaches the **CFOP** speedcubing method (Cross → F2L → OLL → PLL) along a clear progression ladder. Tutor, not timer.

Bilingual from day one (EN + DE), fully offline-capable, deploys to GitHub Pages.

> Status: **M0–M3 complete** (skeleton, cube engine, 2-Look OLL + 2-Look PLL content, recognition + fluency drills, SRS). See [tasks/PLAN.md](tasks/PLAN.md) for the full roadmap.

## Quick start

```sh
task install   # install deps
task dev       # http://localhost:5173
task build     # production build to ./dist
```

Without [Task](https://taskfile.dev): `npm install`, `npm run dev`, `npm run build`.

## Tech

- Vite 5 · React 18 · TypeScript · Tailwind
- `vite-plugin-pwa` (manifest + service worker + offline precache)
- `react-i18next` with bundled EN/DE JSON
- `zustand` + `persist` for mastery/SRS in localStorage
- HashRouter (GitHub Pages friendly)

## Project layout

```
src/
  cube/          54-sticker model, move engine, WCA parser, SVG net + playback
  data/          cases, primary algs, prose lessons
  pages/         Path · Library · Case · Lesson · Drill · Settings
  store/         mastery + SM-2-lite SRS
  locales/       en/ de/ translation JSON
tasks/           PLAN.md and ASCII mockups
scripts/         cube-test.mts (engine sanity tests)
```

## Common tasks

| Task | What |
|------|------|
| `task dev` | Vite dev server |
| `task typecheck` | TS check (no emit) |
| `task test:cube` | Run cube engine sanity tests |
| `task build` | Production PWA build |
| `task preview` | Serve `./dist` locally |
| `task deploy:check` | typecheck → tests → build |
| `task clean` | Remove `dist/`, `dev-dist/`, `.vite/` |
| `task reset` | Wipe `node_modules/` + caches and reinstall |

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `./dist` to GitHub Pages. The site is served at `https://<user>.github.io/scube/`; Vite's `base` is set to `/scube/` in production and SW scope follows.

## License

TBD.
