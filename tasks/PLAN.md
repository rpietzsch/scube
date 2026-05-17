# scube — CFOP Tutor (PWA)

A Progressive Web App that teaches the **CFOP** speedcubing method (Cross → F2L → OLL → PLL) along a clear progression ladder, from absolute beginner to full one-look last layer.

scube is a **tutor**, not a timer: speed metrics exist only to confirm an algorithm has stuck, not as the primary loop.

---

## 1. The CFOP ladder

scube models progress as a fixed ladder. Each stage has a "starter" form (small, learnable in a weekend) and a "full" form (the speedcubing standard).

| # | Stage | Starter | Full |
|---|-------|---------|------|
| 1 | **Cross** | white-cross-on-bottom, intuitive, ≤ 8 moves | colour-neutral cross, planned in inspection |
| 2 | **F2L** | **intuitive F2L** — recognise the 3 basic insert shapes and figure out the rest | **advanced F2L** — all 41 cases as algorithms, plus tricks (multi-slotting, empty-slot tricks, X-cross) |
| 3 | **OLL** | **2-Look OLL** — 10 algs (3 edge orientation + 7 corner orientation) | **Full OLL** — 57 algs, one-look |
| 4 | **PLL** | **2-Look PLL** — 6 algs (2 corner perms + 4 edge perms) | **Full PLL** — 21 algs, one-look |

Total path: a few algs to start solving CFOP-style → **10 + 6 = 16 algs to "respectable CFOP"** → **41 F2L + 57 OLL + 21 PLL = 119 algs for full CFOP**.

References used for content seeding (with attribution):
- Cubelelo — CFOP from beginner to advanced
- Wikipedia — CFOP method
- SpeedCube.com.au — PLL algorithms
- Cube Academy — 3×3 algorithms overview

## 2. Product principles

- **Linear when you want it, free when you don't.** A "Path" view walks you through the ladder; a "Library" view lets you jump anywhere.
- **Always show one prerequisite stage above and the unlocked stage below**, so the learner sees where they are and where they're going.
- **One algorithm at a time.** Lessons focus on a single alg; comparisons and alternates are a secondary tab.
- **Recognition first, execution second.** Many beginners can perform algs but can't recognise the case in 0.5 s. Drills weight recognition heavily.
- **Promote when ready, never gate harshly.** The Library is browsable at any time; the Path simply suggests the next lesson.

## 3. Stage detail

### Cross
- **Lesson content**: efficient cross planning, edge orientation awareness, why colour-neutral matters, "look-ahead to first F2L pair".
- **Drills**: cross-in-≤8 challenges, planned-cross-in-inspection drills.
- **Algs**: none (intuitive).

### F2L
- **Intuitive (starter)**: teach the three universal insert positions
  1. corner in top, edge in top, pair joined
  2. corner in top, edge in top, pair split
  3. corner or edge already in slot (extract first, then re-insert)
- **Advanced (full)**: 41 named cases. Each case gets:
  - target state ("pair joined, ready to insert" vs "directly inserted")
  - the standard alg
  - 1–3 alternate algs (mirror, rotation-free, OH-friendly)
  - fingertrick notes

### OLL
- **2-Look OLL (10 algs)**:
  - *Edge orientation* (3 algs): dot, L-shape, line → all edges oriented
  - *Corner orientation* (7 algs, the "OCLL" subset): Sune, Anti-Sune, H, Pi, L, T, U
- **Full OLL (57 algs)**: organised by visual group (dot / I / L / lightning / fish / awkward / knight / square / corners-only / edges-only / H / Pi / T / U / W / Z).

### PLL
- **2-Look PLL (6 algs)**:
  - *Corners first* (2 algs): A-perm + E-perm (or A + Y, depending on user preference — both routes supported)
  - *Then edges* (4 algs): Ua, Ub, H, Z
- **Full PLL (21 algs)**: A(a,b) · E · F · G(a,b,c,d) · J(a,b) · N(a,b) · R(a,b) · T · U(a,b) · V · Y · H · Z.

## 4. Pedagogical model

For each *case* the learner has a mastery score across these phases:
1. **Watch** — see it animated, read the why.
2. **Mimic** — perform it with the alg visible.
3. **Recall** — perform from memory.
4. **Recognise** — identify the case among look-alikes in < 2 s.
5. **Fluent** — N consecutive sub-X executions (X is per-case target, generous).

Promotion within a stage requires the *case* to reach Fluent. Promotion to the next stage's *full* form requires the starter to be complete (e.g. 2-Look PLL fluent → unlock Full PLL).

Spaced repetition (SM-2-lite) keeps learned cases from decaying.

## 5. Core flows

1. **Path** — "What should I learn next?" — single tap continues the ladder.
2. **Library** — browse any stage / case at any time.
3. **Case detail** — current state · target state · the algorithm(s) for this case, with notes.
4. **Lesson** — step-through tutor (Watch → Mimic → Recall) with adjustable speed.
5. **Recognition drill** — flashcard style, identify case from LL pattern.
6. **Fluency drill** — short timed execution to confirm an alg has stuck.
7. **Manual entry** — paint your physical cube's stickers, app finds the case and offers the path forward.

## 6. Architecture

- **Stack**: Vite + React + TypeScript, Tailwind, Zustand, Dexie (IndexedDB), vite-plugin-pwa, react-three-fiber for animated 3D playback, SVG for 2D nets and last-layer thumbnails.
- **Cube model**: 54-sticker array (URFDLB order). Pure move functions for U/R/F/D/L/B and inverses/doubles, wide turns, x/y/z rotations.
- **Algorithm library**: bundled JSON per stage. Each entry:
  ```ts
  Case   { id, stage, subset, name, recognitionTags, stickers, thumbnail }
  Alg    { id, caseId, notation, moveCount, scope: "2-look"|"full", ergonomics, attribution, notes }
  ```
- **Recognition**: state → canonical case ID via face/rotation/AUF normalisation + lookup. No solver required.
- **Animation**: queue of `Move` tokens; speed 0.25×–2×, step-through.
- **Persistence**: per-(case, phase) mastery, SRS queue, custom algs, settings.

## 6a. Internationalisation (EN + DE from day one)

- **Languages at v1**: English (`en`) and German (`de`). Architecture supports adding more later without refactor.
- **Library**: `react-i18next` + `i18next-browser-languagedetector`. Namespaces per area (`common`, `path`, `library`, `lesson`, `cases`).
- **Translation files**: `src/i18n/{en,de}/*.json`. Bundled with the app (offline-first; no runtime fetch).
- **Move notation stays language-neutral**: `R U R' U'` is universal. Don't translate notation tokens.
- **Translate**:
  - UI chrome, lesson prose, stage/phase names, ergonomics tags, fingertrick notes, tooltips.
  - Case names where convention differs: e.g. "Sune" stays "Sune" (proper noun), but descriptive labels like "Pair joined in top" → "Paar oben verbunden".
  - Settings, error and empty states.
- **Don't translate**: alg notation, case codes (OLL 27, Ja-perm), attribution names.
- **Language switcher**: in Settings; default = browser language with DE fallback to EN when a key is missing.
- **Pluralisation & number formatting**: use ICU/i18next plural rules; `Intl.NumberFormat` for times/counts. German decimals use comma (e.g. `2,34 s`).
- **PWA manifest**: per-language `name`/`short_name` via `lang` attribute; ship two manifests or use dynamic injection at install time.
- **A11y**: set `<html lang>` reactively so screen readers switch pronunciation.
- **Content authoring**: keep alg/case data (`Case`, `Alg`) language-neutral; UI strings (`name`, `notes`, `recognitionDescription`) live as keys resolved via i18n. New stage detail field:
  ```ts
  Case { id, stage, subset, nameKey, recognitionTagKeys, stickers, thumbnail }
  Alg  { id, caseId, notation, moveCount, scope, ergonomicsKeys, attribution, notesKey }
  ```

## 7. PWA specifics

- Manifest (standalone, theme colour, maskable icons).
- Service worker precaches shell, all alg JSON, and the 3D model assets. Fully offline after first load.
- iOS "Add to Home Screen" hint card; respects safe areas.

## 6b. Repository hygiene

- A `.gitignore` lives at the repo root from day one and is **kept in sync** with the toolchain. Whenever a new tool/framework is added that produces generated, machine-specific, or secret files, the corresponding entries go into `.gitignore` in the **same commit** that introduces the tool — not later.
- Current coverage: Node/npm/yarn/pnpm artefacts, `dist/` and Vite build output, PWA-generated SW/workbox files, `.vite/` cache, test coverage, editor/OS cruft (`.vscode` allow-list, `.idea`, `.DS_Store`, swap files), logs, `.env*`, TypeScript `*.tsbuildinfo`, agent scratch (`.claude/`).
- Never commit: `node_modules`, build output, `.env*`, secrets, `*.local`, IDE per-user settings.
- Always commit: lockfile (`package-lock.json` / `pnpm-lock.yaml`), shared `.vscode/extensions.json` and `.vscode/settings.json` (allow-listed), CI config, this plan and mockups.

## 7a. Hosting (GitHub Pages)

scube is a fully client-side PWA, so GitHub Pages (static + HTTPS) is sufficient. Bake the following in from M0 to avoid a refactor later.

- **Subpath base**: repo pages serve at `https://<user>.github.io/scube/`.
  - `vite.config.ts`: `base: process.env.NODE_ENV === 'production' ? '/scube/' : '/'`.
  - `vite-plugin-pwa`: `scope: '/scube/'`, `start_url: '/scube/'`, relative icon paths.
  - All asset/router links relative or base-aware.
- **SPA routing**: GitHub Pages has no server rewrites; deep-link refresh would 404.
  - v1: **HashRouter** (`/scube/#/library`) — simplest, zero infra.
  - Later: switch to BrowserRouter + `404.html` redirect trick if/when a custom domain is added.
- **Service worker scope**: must match `base`. SW served from `/scube/sw.js`, registered with `scope: '/scube/'`. vite-plugin-pwa handles this automatically once `base` is set.
- **Deployment**: GitHub Action using `actions/deploy-pages`, builds `dist/` on push to `main`. Add an empty `.nojekyll` to `dist/` so underscore-prefixed files aren't filtered.
- **PWA manifest**: per-language `name`/`short_name` resolved at build (see §6a); `start_url` and `scope` must include the `/scube/` prefix in production.

## 8. Milestones

| M | Scope | Output | Status |
|---|-------|--------|--------|
| M0 | Vite+PWA skeleton, manifest, SW, routing, i18n scaffold (EN+DE), `.gitignore`, GH Pages deploy workflow | Installable shell, language switch works, deploys on push to `main` | ✅ done |
| M1 | Cube model (54-sticker) · move engine (UDRLFB + xyz + wide + MES slices) · WCA notation parser · 2D SVG net renderer · animated playback (step / play / pause / speed). **Note: 3D playback deferred** — 2D net is the v1 primary visualisation; 3D moved to post-v1 (deps & bundle weight not justified yet) | Render any state, play any alg; 17/17 engine sanity tests pass | ✅ done |
| M2 | Path view with the CFOP ladder · Library with stage tabs · Case detail (state + algs + mastery bar) · Lesson screen (animated playback + speed control + "I performed it") · Cross + Intuitive F2L prose lessons · 2-Look OLL (10) + 2-Look PLL (6) cases & algs · EN + DE strings for everything | A beginner can browse the whole CFOP path and learn 16 algorithms end-to-end | ✅ done |
| M3 | Recognition drill (4-option flashcard from LL thumbnail) · fluency drill (timer + 3-way self-rate) · per-case mastery (Watch→Mimic→Recall→Recognise→Fluent) · SM-2-lite SRS · "Due for review" entry on Path · persisted via zustand+localStorage (Dexie deferred until data volume warrants) | Practice loop closes; cases decay and resurface on the Path | ✅ done |
| M4 | Full OLL (57) library + lessons | Unlock one-look OLL | ✅ done |
| M5 | Full PLL (21) library + lessons | Unlock one-look PLL | ✅ done |
| M6 | Advanced F2L (starter set 8 cases — full 41 deferred) · compare view · manual state entry (deferred) · polish · a11y | v1 release | 🟡 partial |
| post | Full Advanced F2L (remaining 33 cases) · manual state entry · alternate-alg variants per case · 3D playback (react-three-fiber) · X-cross · OH-specific algs · cross-colour neutrality coach · smart-cube BLE · cloud sync | v1.x | pending |

### M0–M3 deltas worth noting

- **Persistence**: localStorage (via `zustand/persist`) is enough for v1 volumes (~120 cases × small mastery record). Dexie reserved for when we add per-attempt history.
- **3D vs 2D**: the unfolded 2D net plus animated move highlighting turned out to be clearer for a teaching-first app than a 3D cube on small screens; 3D becomes optional later.
- **Data correctness**: each case stores its canonical `solve` alg; the case state is derived by applying the inverse to a solved cube. This guarantees by construction that `setup + solve = identity` (verified by automated tests).

### M4 / M5 deltas

- **Case totals after M4 + M5**: 106 cases shipped — 3 F2L examples + 10 2-Look OLL + 6 2-Look PLL + 57 Full OLL + 21 Full PLL + 8 starter Advanced F2L; every one passes the `task test:cube` round-trip test.
- **Data location**: full sets live in dedicated files [`src/data/oll-full.ts`](../src/data/oll-full.ts), [`src/data/pll-full.ts`](../src/data/pll-full.ts), [`src/data/f2l-advanced.ts`](../src/data/f2l-advanced.ts) and are merged into the main `CASES` array in [`src/data/cases.ts`](../src/data/cases.ts). Keeps `cases.ts` legible while letting big sets evolve independently.
- **Context for F2L**: every advanced-F2L case uses the same Sune-like context (`R U R' U R U2 R'`) so the result honestly shows F2L finished with an unsolved last layer.
- **Alg sourcing**: canonical algorithms from speedsolving.com wiki / J. Perm. Some longer cases (Na, Nb, F, V) use 17–20 HTM standard variants — ergonomic alternates can be added as additional `ALGS` entries later without changing case state.

### M6 deltas

- **Compare view** ([`/compare?a=<id>&b=<id>`](../src/pages/ComparePage.tsx)): two-cube layout that stacks vertically on mobile, side-by-side on `md+`. Each side reuses the existing `CubeWithMovement` so it inherits the stage mask, dimming, and piece labels automatically. Move-count summary at the bottom for at-a-glance ergonomics comparison. Reachable from any Case Detail via the new "Vergleichen" button.
- **Advanced F2L scope**: 8 representative cases (one per shape family + a couple of standard sledgehammer/hedgeslammer/extract-reinsert patterns). Full 41-case set deferred to v1.x because each case ideally wants 2–3 alg variants and detailed recognition tags, and pedagogically v1 already covers the route from beginner to full one-look OLL/PLL.
- **Manual state entry**: deferred to v1.x. Requires a painted-cube UI (palette, tap-to-flip) plus a normalising state→case-id recogniser; both are non-trivial and don't gate the core teach-by-stage experience.
- **A11y / polish (light pass)**: `lang` updates on language change, `aria-label`s on SVG cube nets, semantic `<figure>/<figcaption>` for before/after, keyboard-reachable nav. Deeper a11y (full keyboard play in `CubePlayback`, screen-reader move announcements) is post-v1.

## 9. Open questions (defaults in brackets)

- Which 2-Look PLL corner pair to teach first — A+E or A+Y? [present both; let user pick; default A+E] -> present both + let user pick
- Colour neutrality — push from the start, or after 2-Look PLL is done? -> after — too many simultaneous changes for beginners
- Source attribution UI — inline per alg, or one credits page? -> inline tag + one credits page
- Ship advanced F2L in M2 or later? -> later (M6) — intuitive first

## 10. Files in this folder

- `PLAN.md` — this file
- `mockups/01-home.txt` — Path / progress overview
- `mockups/02-library.txt` — stage browser
- `mockups/03-case-detail.txt` — current state · target · algs
- `mockups/04-lesson.txt` — step-through tutor
- `mockups/05-compare.txt` — side-by-side alg comparison
- `mockups/06-manual-entry.txt` — paint cube to find the case
- `mockups/07-drill.txt` — recognition + fluency drill
- `mockups/08-settings.txt` — settings
- `mockups/cube-net.txt` — 2D net rendering reference
