# scube — Speedcubing Tutor (PWA)

A Progressive Web App that teaches multiple speedcubing methods — from the **beginner layer-by-layer (LBL)** approach through full **CFOP** and the block-building **Roux** method — along clear progression ladders.

scube is a **tutor**, not a timer: speed metrics exist only to confirm an algorithm has stuck, not as the primary loop.

---

## 0. Notation reference

### Face names

| Symbol | Face  |
|--------|-------|
| U      | Up    |
| D      | Down  |
| F      | Front |
| B      | Back  |
| L      | Left  |
| R      | Right |

> B = **Back** (not Bottom). D = Down.

### Sticker numbering

Each face is numbered 1–9 reading **left-to-right, top-to-bottom**
when looking straight at that face:

```text
1 2 3
4 5 6
7 8 9
```

`X5` is always the center sticker of face X. This matches the de facto
convention used by cubing software (ksolve, Cube Explorer, TNoodle).
WCA regulations do not define a sticker numbering scheme.

**Example — UFR corner:**

| Face | Sticker | Position           |
|------|---------|-------------------|
| U    | U9      | bottom-right of U |
| R    | R1      | top-left of R     |
| F    | F3      | top-right of F    |

---

## 1. Methods and ladders

scube teaches three methods. Each has its own library section; learners can follow any one independently.

### 1a. Beginner Layer-by-Layer (LBL)

The universal entry point — solve one layer at a time, top to bottom. ~6 algorithms total. Learnable in an afternoon.

| # | Step | How |
|---|------|-----|
| 1 | **White Cross** | Intuitive — place four white-edge pieces correctly |
| 2 | **First-Layer Corners** | Intuitive — slot white corners into the bottom layer |
| 3 | **Middle-Layer Edges** | Two mirror algorithms (Right Insert / Left Insert) |
| 4 | **Top-Layer Orientation** | 4 algs: edge-line `F R U R' U' F'`, edge-L `f R U R' U' f'`, Sune, Anti-Sune |
| 5 | **Top-Layer Permutation** | 2 algs: corner-cycle + edge-cycle |

Total: **6 algorithms** (steps 1–2 intuitive, steps 3–5 algorithmic).

Sources: [SpeedCube.com.au 5-step guide](https://de.speedcube.com.au/de/pages/how-to-solve-a-rubiks-cube) · [SpeedcubeDB beginner](https://speedcubedb.com/beginner) (SpeedcubeDB notation preferred — provides actual move strings vs. diagrams-only on speedcube.com.au).

### 1b. The CFOP ladder

scube models CFOP progress as a fixed ladder. Each stage has a "starter" form (small, learnable in a weekend) and a "full" form (the speedcubing standard).

| # | Stage | Starter | Full |
|---|-------|---------|------|
| 1 | **Cross** | white-cross-on-bottom, intuitive, ≤ 8 moves | colour-neutral cross, planned in inspection |
| 2 | **F2L** | **intuitive F2L** — recognise the 3 basic insert shapes and figure out the rest | **advanced F2L** — all 41 cases as algorithms, plus tricks (multi-slotting, empty-slot tricks, X-cross) |
| 3 | **OLL** | **2-Look OLL** — 10 algs (3 edge orientation + 7 corner orientation) | **Full OLL** — 57 algs, one-look |
| 4 | **PLL** | **2-Look PLL** — 6 algs (2 corner perms + 4 edge perms) | **Full PLL** — 21 algs, one-look |

Total path: a few algs to start solving CFOP-style → **10 + 6 = 16 algs to "respectable CFOP"** → **41 F2L + 57 OLL + 21 PLL = 119 algs for full CFOP**.

### 1c. Roux Method

Block-building approach — highly intuitive, fewer algorithms than CFOP, popular among solvers who prefer spatial thinking over memorisation.

| # | Step | How |
|---|------|-----|
| 1 | **First 1×2×3 Block** | Intuitive block-build on one side (left) |
| 2 | **Second 1×2×3 Block** | Intuitive block-build on the opposite side (right) — leaves a 2×3 column on top |
| 3 | **CMLL** (Corners of the Last Layer) | ~42 algorithms — the most algorithm-heavy step |
| 4 | **LSE** (Last Six Edges) | Mostly intuitive M-slice manipulation; a handful of edge-case algs |

Average solve: ~50 STM (vs. CFOP's ~55–60). CMLL can be learned in a reduced subset (e.g. orient-then-permute) similar to 2-Look OLL/PLL, reducing initial alg load to ~10–15.

Sources: [Wikipedia — Roux-Methode](https://de.wikipedia.org/wiki/Methoden_zum_L%C3%B6sen_des_Zauberw%C3%BCrfels#Roux-Methode)

---

References used for content seeding (with attribution):
- Cubelelo — CFOP from beginner to advanced
- Wikipedia — CFOP method, Roux method
- SpeedCube.com.au — PLL algorithms, 5-step beginner guide
- SpeedcubeDB — beginner method with notation
- Cube Academy — 3×3 algorithms overview

## 2. Product principles

- **Linear when you want it, free when you don't.** A "Path" view walks you through the ladder; a "Library" view lets you jump anywhere.
- **Always show one prerequisite stage above and the unlocked stage below**, so the learner sees where they are and where they're going.
- **One algorithm at a time.** Lessons focus on a single alg; comparisons and alternates are a secondary tab.
- **Recognition first, execution second.** Many beginners can perform algs but can't recognise the case in 0.5 s. Drills weight recognition heavily.
- **Promote when ready, never gate harshly.** The Library is browsable at any time; the Path simply suggests the next lesson.

## 3. Stage detail

### Beginner LBL

Steps 1 and 2 (white cross, first-layer corners) are handled by the existing **Cross** stage — no new data needed. New content covers steps 3–5.

#### Step 3 — Middle Layer Edges (`beginnerMiddle`)
- **Lesson**: "Look at the top-layer edges; find one with no yellow. Align it above the matching centre, then use one of two inserts."
- **Algs** (2):
  - Right insert: `U R U' R' U' F' U F`
  - Left insert (mirror): `U' L' U L U F U' F'`
- **Recognition**: top-layer edge colour matches a side centre → pick left or right variant.

#### Step 4 — Top-Layer Orientation (`beginnerTopOrientation`)
- **Lesson**: "Get all yellow pieces facing up in two sub-steps: edges first, then corners."
- **Algs** (4):
  - Edge-line (headlights): `F R U R' U' F'`
  - Edge-L shape: `f R U R' U' f'`
  - Sune (corners CW): `R U R' U R U2 R'`
  - Anti-Sune (corners CCW): `R U2 R' U' R U' R'`
- **Sub-steps**: (a) make yellow cross on top using edge algs until line or L → yellow cross; (b) orient corners using Sune/Anti-Sune until all yellow up.

#### Step 5 — Top-Layer Permutation (`beginnerTopPermutation`)
- **Lesson**: "All yellow faces up; now move pieces to the right positions."
- **Algs** (2):
  - Corner cycle: `R U R' U' R' F R2 U' R' U' R U R' F'`
  - Edge cycle (U-perm-like): `R2 U R U R' U' R' U' R' U R'`
- **Sub-steps**: (a) cycle corners until all are in correct position (rotation may differ); (b) cycle edges until solved.

---

### Roux

#### Stage 1 — First Block (`rouxBlock1`)
- **Lesson**: Build a 1×2×3 block on the left side. No algorithms — pure block-building intuition.
- **Drills**: given a scramble, find and place the left block in ≤ N moves.
- **Algs**: none (intuitive).

#### Stage 2 — Second Block (`rouxBlock2`)
- **Lesson**: Build the second 1×2×3 block on the right side without disturbing the first. Uses only R and U moves; intuitive.
- **Drills**: given a partial cube (block 1 done), place block 2.
- **Algs**: none (intuitive).

#### Stage 3 — CMLL (`rouxCmll`)
- **Lesson**: All four UR/UL corners must be solved (oriented + permuted) in one look. Similar recognition to OLL/PLL corners but with 6 permutation variants × 7 orientation cases = 42 cases.
- **Starter set**: 2-look CMLL (orient then permute separately) — reduces to ~10 algs.
- **Full set**: 42 algs (one-look CMLL), organised by recognition group (same visual language as OLL).
- **Data model**: each `CaseData` carries `stage: 'rouxCmll'`; thumbnails show UF/UB edge gaps (not solved).

#### Stage 4 — LSE (Last Six Edges) (`rouxLse`)
- **Lesson**: Solve the remaining six edges (UF, UB, DF, DB, LF, RB are already done by blocks) and centre pieces using only M and U moves.
- **Sub-steps**:
  1. **EO** (Edge Orientation) — orient all edges so they can be solved without M' moves. Pure inspection + M/U intuition; no fixed algs but a handful of common patterns.
  2. **ULUR** (Solve UL + UR edges) — insert the two top-layer side edges into their slots.
  3. **4c** (Last four edges: UF, UB, DF, DB) — permute via M U2 M' patterns; fully algorithmic but only a few cases.
- **Algs**: ~5–8 4c patterns; rest intuitive.

---

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
| M6 | Advanced F2L (starter set 8 cases) · compare view · manual state entry (deferred) · polish · a11y | v1 release | 🟡 partial (manual entry → v1.x) |
| M7 | Full Advanced F2L (~46 cases) grouped by speedsolving wiki categories · alternate-algorithm slot on Case Detail · grouped Library sections · ergonomics tag vocabulary | v1 advanced complete | ✅ done |
| M8 | cuberoot.me alignment: 3-stage F2L · `f2lExpert` stage + nav · cuberoot code labels for 6 exact-alg matches · 33 cuberoot codes documented · cross-alg equivalence test refuted cuberoot's alternates · colour convention D=yellow | structural alignment + label pass | 🟡 partial (structural + 6 label matches ✅; full 41-case remap requires case-state matching ⏭; cuberoot "alternates" rejected as non-equivalent) |
| M9 | Library-first redesign: remove Path tab · Settings → cogwheel · sticky Hold bar · simplified case detail (no Mastery, no Open Lesson, no Compare; algo + orientation together) | Cleaner, library-centric UX | ✅ done |
| M10 | **Beginner LBL** section — new Library tab "Beginner" between Cross and F2L · 3 new stages (`beginnerMiddle`, `beginnerTopOrientation`, `beginnerTopPermutation`) · 8 cases total (2+4+2) · EN+DE strings · notation legend on each case | Absolute beginners can solve the cube end-to-end from the app | ✅ done |
| M11 | **Roux Method** section — new Library tab "Roux" after PLL · 4 stages (`rouxBlock1`, `rouxBlock2`, `rouxCmll`, `rouxLse`) · 2 illustrative block cases each + 7 CMLL orientation + 4 LSE patterns · EN+DE strings | Alternative method for spatial/intuitive learners | ✅ done |
| M12 | **Before/after sticker labels** — annotate visualisations with (n) for the "before" position and (n') for the "after" position; roll out to LBL and F2L first | Learner sees which piece moves where without reading prose | ✅ done |
| M13 | **Fill Cross section** — yellow flower (daisy) approach: Step 1 gather white edges to U (intuitive), Step 2 fold each down with F2 after aligning; prose lesson + animated alg | Beginners have a concrete, zero-memorisation cross method | ✅ done |
| M14 | **LBL 1st layer corners** — new `beginnerFirstLayerCorners` stage with `R U R' U'` trigger cases (white-front, white-right, white-up, corner stuck in slot); fills the gap between cross and middle-layer edges | LBL path complete from scratch | ✅ done |
| M15 | **Fix LBL insert coloring** — applies to `beginnerFirstLayerCorners` and `beginnerMiddle`: only the single piece being inserted is bright (labeled `1`/`1'`); context centers dimmed; all other stickers gray | Visualization matches pedagogical intent | ✅ done |
| M16 | **WCA Scramble mode** — generate a legal random scramble and display the move sequence so two or more people can race on the same puzzle state | Competitive/group practice mode | pending |
| post | Manual state entry · curated alternate algs sourced from cuberoot (41 + 54 with `A+/A-/B+/B-…` codes) · 3D playback (react-three-fiber) · X-cross · OH-specific algs · cross-colour neutrality coach · smart-cube BLE · cloud sync | v1.x | pending |

### M0–M3 deltas worth noting

- **Persistence**: localStorage (via `zustand/persist`) is enough for v1 volumes (~120 cases × small mastery record). Dexie reserved for when we add per-attempt history.
- **3D vs 2D**: the unfolded 2D net plus animated move highlighting turned out to be clearer for a teaching-first app than a 3D cube on small screens; 3D becomes optional later.
- **Data correctness**: each case stores its canonical `solve` alg; the case state is derived by applying the inverse to a solved cube. This guarantees by construction that `setup + solve = identity` (verified by automated tests).

### M4 / M5 deltas

- **Case totals after M4 + M5**: 106 cases shipped — 3 F2L examples + 10 2-Look OLL + 6 2-Look PLL + 57 Full OLL + 21 Full PLL + 8 starter Advanced F2L; every one passes the `task test:cube` round-trip test.
- **Data location**: full sets live in dedicated files [`src/data/oll-full.ts`](../src/data/oll-full.ts), [`src/data/pll-full.ts`](../src/data/pll-full.ts), [`src/data/f2l-advanced.ts`](../src/data/f2l-advanced.ts) and are merged into the main `CASES` array in [`src/data/cases.ts`](../src/data/cases.ts). Keeps `cases.ts` legible while letting big sets evolve independently.
- **Context for F2L**: every advanced-F2L case uses the same Sune-like context (`R U R' U R U2 R'`) so the result honestly shows F2L finished with an unsolved last layer.
- **Alg sourcing**: canonical algorithms from speedsolving.com wiki / J. Perm. Some longer cases (Na, Nb, F, V) use 17–20 HTM standard variants — ergonomic alternates can be added as additional `ALGS` entries later without changing case state.

### M7 deltas

- **F2L case total**: 46 cases. The wiki's *Basic Inserts* category (4 cases) lives in **`f2lIntuitive`** alongside the 3 illustrative prose-lesson cases (7 cases total in intuitive); the remaining 8 wiki categories (42 cases) live in **`f2lAdvanced`** as grouped sections. Every primary algorithm round-trips through `task test:cube` (now 144 tests).
- **Basic-insert algs aligned to wiki F2L 1–4**: `U R U' R'`, `y' U' R' U R`, `F' U' F`, `R U R'` (corrected from my earlier mirror-variant interpretation which solved different slots, not the same case).
- **Library grouping**: `caseGroupsByStage(stage)` returns an ordered list of subcategory slugs; `LibraryPage` renders one labelled section per group with a 2/3-column responsive grid. Other stages (OLL/PLL/Cross/F2L Intuitive) keep their flat layout.
- **Alternate algorithms wired**: `CaseData.alternates` + `AlgAlternate` type carry notation, notes, ergonomics tags, and attribution. The auto-generated `ALGS` array picks up alternates as rank 2+. Case Detail renders them in a collapsed-by-default expandable section showing notation, HTM count, ergonomic tags, and notes.
- **Initial alternate set is empty by design**: cubing literature presents "alternate algorithms" as different *case orientations* (e.g. the FR-slot vs FL-slot mirror), which on the cube engine are *different cases*, not algebraic equivalents of the same case. The round-trip test would correctly reject them as wrong-for-this-case. Genuine equivalents (same starting state, same end state, different sequence) are rare enough that we intentionally ship zero alternates in v1; curated alternates per case are queued for v1.x as a separate research pass.
- **Ergonomics vocabulary**: 8 ergonomic tag keys (`ergo.OHFriendly`, `regripFree`, `leftHandMirror`, `wideVariant`, `shorterHTM`, `beginnerFriendly`, `rotation`, `MSlice`) translated EN + DE — ready for use once alternates land.
- **Test invariant strengthened**: `task test:cube` now iterates over every alg (primary AND alternates) and verifies each takes the case state back to the context baseline. Catches typos in alternate notation before they ship.

---

### M8 deltas (after second pass with cuberoot PDFs)

**Cuberoot PDF parse — key finding**: cuberoot's catalogue labels groups of related cases with codes like `A+ #1`, `A- #2`, `B+ #4`, but each code's listed algorithms are NOT mathematically equivalent to each other. They're catalogue entries for slightly different AUF variants / sticker configurations that all share a similar pedagogical recognition. A round-trip test (`primary + alt = identity on same case-state`) FAILS for every cross-alg pair I tested (3 of 3). So adding cuberoot's algs as `alternates` in our strict `setup + alg = context` model would break the test loop.

Decision: don't import cuberoot's secondary algs as alternates. Each cuberoot "code" represents a HIGHER-LEVEL case category; the exact case state varies by which alg defines it.

**What shipped in M8 (data pass)**:

- **Cuberoot code labels applied to 6 exact-alg matches**: cases where MY primary alg is literally one of cuberoot's listed algs for that code (so my case-state = their case-state for that code):

  | My ID | New name | Cuberoot code | Section |
  |-------|----------|---------------|---------|
  | f2l-bi-1 | A+ #1 · pair ready | A+ #1 | Free Pairs |
  | f2l-bi-2 | A- #2 · edge to reposition | A- #2 | Free Pairs |
  | f2l-bi-3 | B- #3 · corner wrong | B- #3 | Free Pairs |
  | f2l-sp-3 | U+ #33 · split, over | U+ #33 | Edge in Slot |
  | f2l-ps-2 | Q+ #19 · pair on side | Q+ #19 | Disconnected Pairs |
  | f2l-ps-4 | H+ #17 · pair on side | H+ #17 | Connected Pairs |
  | f2l-ce-1 | J+ #27 · corner in slot | J+ #27 | Corner in Slot |
  | f2l-ce-2 | L+ #30 · corner in slot | L+ #30 | Corner in Slot |

- **Two duplicates surfaced in my own data**: `f2l-sp-3` ↔ `f2l-ec-2` and `f2l-ce-2` ↔ `f2l-ec-1` share the same primary alg (and therefore the same case state). They're real duplicates from M7's group-by-pattern approach — same case classified into two wiki categories. Marked as deferred cleanup (changing a stage's case list affects mastery localStorage; safer to schedule with a migration plan).

**What shipped in M8 (structural)**:

- **New `f2lExpert` stage** in [src/data/types.ts](../src/data/types.ts), wired through [LibraryPage](../src/pages/LibraryPage.tsx) and [PathPage](../src/pages/PathPage.tsx) — the CFOP ladder now has 8 stages: cross · F2L intuitive · F2L · F2L advanced · OLL 2-Look · OLL Full · PLL 2-Look · PLL Full.
- **Label rename**: `f2lAdvanced` UI label changed from "F2L · advanced/fortgeschritten" to just "F2L" (37 standard cases). The "advanced" label moves to `f2lExpert` (the future 54 cuberoot cases).
- **`f2l-expert.ts`** with 4 placeholder cases (winterVariation, vls, keyhole) so the new stage isn't empty and the test loop covers it.
- **Group order helper** extended: `caseGroupsByStage('f2lExpert')` returns the expert groups in render order.
- **Cuberoot naming codes**: `A+ #1 · pair ready` and `A- #2 · edge to reposition` applied to the two cases the user explicitly confirmed. Remaining cases keep `F2L #N` (sequential) pending the manual cuberoot mapping pass.
- **Colour convention** (already in M7 patch): `D = yellow` (cuberoot's cross-on-yellow convention) matches reference screenshots.
- **Test invariant**: round-trip extended to 147 cases (was 143 in M7) with the 4 placeholder expert cases.

What did NOT ship (deferred):

- **Real cuberoot 41 + 54 data**: cuberoot.me serves its case catalogue via a SPA loaded asynchronously; programmatic extraction returns the React shell only, not the algorithm strings. Sourcing requires either (a) manually copying from each cuberoot case page (≈95 cases × 2-4 algs ≈ 250 entries), or (b) reverse-engineering their data API. Both are out of scope for this M8 pass.
- **Full A+/A-/B+/B-/… code mapping**: ditto, requires cuberoot's reference. The data model is ready; codes can be backfilled when sourcing happens.
- **Populated `alternates` arrays**: the structural support is in place (M7); the data is empty until sourcing.

Next concrete step for v1.x: a focused "cuberoot import" session that walks every case page, copies algs into the data files, and verifies via the round-trip test. Each transcription typo will surface as a failing test row.

---

### M8 — cuberoot.me alignment: full F2L (41 + 54) + alternative algs (proposed, kept for reference)

The previously-implemented Advanced F2L (M7) used my own grouping and primary algorithms. The reference site [cuberoot.me/alg/3x3/f2l](https://cuberoot.me/alg/3x3/f2l) ships a comprehensive catalogue with:

- **41 regular F2L cases** (Free Pairs section) organised by slot and case type
- **54 advanced F2L cases** ([adv-f2l](https://cuberoot.me/alg/3x3/adv-f2l))
- **Multiple alternative algorithms per case** (typical: 2–4 variants)
- A consistent naming convention using letter+sign+number codes like `A+ #1`, `A- #2`, etc.

M8 aligns the app to this reference.

#### Restructure

| Stage | Now | After M8 |
|-------|-----|----------|
| `f2lIntuitive` | 4 basic inserts + 2 illustrative | First 4 of cuberoot's 41 (the wiki-named "Basic Inserts") |
| `f2lAdvanced` | 42 cases organised in 8 wiki groups (my M7 set) | **Renamed to "F2L"**; holds the remaining 37 of cuberoot's 41, organised by cuberoot's groups |
| `f2lExpert` (new) | — | Cuberoot's 54 advanced cases |

#### Data work

1. Replace `f2l-advanced.ts` with a new `f2l.ts` carrying all 41 cases, using cuberoot's exact codes (`A+ #1`, `A- #2`, `B+ #3`, etc.) and group labels.
2. Add `f2l-expert.ts` for the 54 advanced cases.
3. Each case gets a populated `alternates: AlgAlternate[]` field with 1–3 variants per case, sourced from cuberoot.
4. Add a new `Stage` value `f2lExpert` with its own translation keys.
5. Update navigation in Library to surface the three F2L levels: intuitive → F2L → F2L advanced.

#### UI changes

- Library: extend the stage tab list with `f2lExpert`.
- Path view: extend the CFOP ladder to include the expert step (post-v1 typically, but the ladder can simply show it as locked until prior steps complete).
- Case Detail: the existing collapsible alternates section already renders alternates — no further UI work needed beyond data population.

#### Color convention

Already aligned (M7 patch): `U = white`, `D = yellow`. Cross is built on yellow per cuberoot/wiki convention. This makes screenshot comparisons against cuberoot match 1:1.

#### Alg verification

Round-trip `task test:cube` continues to validate every primary + alternate. With ~95 cases × ~2.5 algs average = ~240 alg tests after M8.

#### Risks / open questions

- **Slot orientation**: cuberoot lists cases for all four slots (FR / FL / BL / BR). Each case is essentially the same problem at a different slot. Do we treat all four slot variants as separate cases, or canonicalise on FR? Decision: canonicalise on FR, since our `f2lFrPieces` and the F2L UFR-corner-view visualisation are FR-specific. Users learn FR-slot algorithms; mirroring to other slots is a separate skill (and only matters in real solves).
- **Naming**: cuberoot's code (`A+ #1`) is opaque to beginners. Keep both the code AND the descriptive label: `A+ #1 · pair ready`.
- **Alternate equivalence**: cuberoot's alternates ARE all genuine equivalents for the same starting state (different solving paths, same end state). The round-trip test will catch any errors.

#### Effort estimate

~600 lines of case data (95 cases × ~6 lines each), ~50 lines of UI/translation tweaks. Major risk is alg-transcription typos — round-trip test mitigates.

---

### M7 — Full F2L + alternative algorithms (original proposal kept for reference)

The M6 ship leaves Advanced F2L at a starter set of 8 cases and exposes only the primary algorithm per case. M7 fills that gap by importing the structure used by [speedsolving.com wiki/First_Two_Layers](https://www.speedsolving.com/wiki/index.php?title=First_Two_Layers).

#### Goals

1. **Complete the "intuitive" basic inserts** in `f2lIntuitive` — currently 3 illustrative shapes (joined / split / stuck); the wiki lists 4 named basic inserts. Add the missing one(s) so the intuitive stage matches the canonical beginner set.
2. **Full Advanced F2L**, organised into the wiki's named groups inside `f2lAdvanced`:
   - Basic Inserts (~4 cases)
   - Reposition Edge (~4)
   - Reposition Edge and Flip Corner (~9)
   - Split Pair by Going Over (~4)
   - Pair Made on Side (~4)
   - Weird Cases (~2)
   - Corner in Place, Edge in U Face (~8)
   - Edge in Place, Corner in U Face (~6)
   - Edge and Corner in Place (~5)
3. **Alternative algorithms per case** — keep one primary alg shown prominently; surface the well-known alternatives (mirror, OH-friendly, regrip-free, wide variant) in a collapsed expandable section on the Case Detail page.

#### Data model changes

- `CaseData` gains an optional `group?: string` field — the F2L subcategory slug (e.g. `"basicInsert"`, `"repositionEdge"`). Drives Library grouping.
- `CaseData` gains an optional `alternates?: AlgAlternate[]` field:
  ```ts
  interface AlgAlternate {
    notation: string;
    notesKey?: string;
    ergonomicsKeys?: string[];   // e.g. ['ergo.OHFriendly', 'ergo.regripFree']
    attribution?: string;
  }
  ```
- `ALGS` auto-generation extends to include alternates (rank 2+), so the existing `algsFor(caseId)` API keeps working.
- A new helper `caseGroupsByStage(stage)` returns the ordered list of group slugs that have cases — Library uses it to render section headers.

#### UI changes

- **Library** (F2L Advanced tab): grouped layout — each subcategory gets its own labelled section with a thumbnail grid. Sections render in the canonical wiki order. (Other tabs stay flat — only F2L Advanced needs grouping.)
- **Case Detail**: below the primary-algorithm card, add a collapsible "Alternative Algorithmen" / "Alternative algorithms" section. Closed by default. Each entry shows notation, move count (HTM), ergonomic tags (if any), and notes.
- **Settings**: no new entries; if users want alternates always open, that's a v1.x preference.

#### Translation keys to add

- `path.group.f2l.basicInsert`, `…repositionEdge`, `…repositionEdgeFlipCorner`, `…splitPairOver`, `…pairOnSide`, `…weird`, `…cornerInPlaceEdgeUp`, `…edgeInPlaceCornerUp`, `…bothInPlace`
- `case.alternates`, `case.alternatesIntro`, `case.expandAlternates`, `case.collapseAlternates`
- `ergo.OHFriendly`, `ergo.regripFree`, `ergo.leftHandMirror`, `ergo.wideVariant`, `ergo.shorterHTM`, `ergo.beginnerFriendly`

#### Test plan

- Every primary AND alternate alg must round-trip through `task test:cube` (extends the existing 106-case test loop to whatever the new total is — likely ~140–160 with alternates).
- Visual spot-check of one case per group via `task dev` to confirm the rendered state matches the wiki's named case.
- TypeScript + production build must stay green.

#### Implementation steps

1. Extend `CaseData` / `AlgData` types in [src/data/types.ts](../src/data/types.ts).
2. Add `caseGroupsByStage` helper to [src/data/cases.ts](../src/data/cases.ts) and update `ALGS` derivation to include alternates.
3. Rewrite [src/data/f2l-advanced.ts](../src/data/f2l-advanced.ts) with all ~41 cases organised by group, plus a curated set of alternates for the most-taught cases (basic inserts, the most common sledgehammer/hedgeslammer variants).
4. Update [src/pages/LibraryPage.tsx](../src/pages/LibraryPage.tsx) to render grouped sections for F2L Advanced.
5. Update [src/pages/CasePage.tsx](../src/pages/CasePage.tsx) to render the collapsible alternates section.
6. Add EN + DE translation keys.
7. Run `task test:cube` — fix alg errors. Run `task build` — fix TS errors.
8. Update PLAN.md to flip M7 from "proposed" to "✅ done".

#### Out of scope for M7 (deferred to v1.x)

- Detailed per-case prose explanations (just name + recognition tags suffice).
- Side-by-side comparison of two alternates *within the same case* (the existing `/compare` view compares two different cases; an alt-vs-alt view can come later).
- User-added custom algs / "my algs" feature.
- Manual cube state entry (still deferred from M6).

#### Effort estimate

~250–400 lines of F2L data (41 cases × 1 primary + ~2 alternates for popular cases), ~50 lines of UI changes, ~40 lines of translations. Roughly one focused session.

#### Risks

- **Alg correctness**: the round-trip test confirms an alg parses and is internally consistent, but does NOT confirm it matches its named case. The only safeguard is sourcing from a trusted reference (speedsolving wiki) and spot-checking visually. If an alg ends up labelled with the wrong case name, the visualisation will still look "correct" mathematically but pedagogically wrong — a future bug to watch for.
- **Group ordering**: wiki page may evolve; we freeze the order at implementation time.

---

### M6 deltas

- **Compare view** ([`/compare?a=<id>&b=<id>`](../src/pages/ComparePage.tsx)): two-cube layout that stacks vertically on mobile, side-by-side on `md+`. Each side reuses the existing `CubeWithMovement` so it inherits the stage mask, dimming, and piece labels automatically. Move-count summary at the bottom for at-a-glance ergonomics comparison. Reachable from any Case Detail via the new "Vergleichen" button.
- **Advanced F2L scope**: 8 representative cases (one per shape family + a couple of standard sledgehammer/hedgeslammer/extract-reinsert patterns). Full 41-case set deferred to v1.x because each case ideally wants 2–3 alg variants and detailed recognition tags, and pedagogically v1 already covers the route from beginner to full one-look OLL/PLL.
- **Manual state entry**: deferred to v1.x. Requires a painted-cube UI (palette, tap-to-flip) plus a normalising state→case-id recogniser; both are non-trivial and don't gate the core teach-by-stage experience.
- **A11y / polish (light pass)**: `lang` updates on language change, `aria-label`s on SVG cube nets, semantic `<figure>/<figcaption>` for before/after, keyboard-reachable nav. Deeper a11y (full keyboard play in `CubePlayback`, screen-reader move announcements) is post-v1.

---

## M10 — Beginner Layer-by-Layer (LBL) section (proposed)

### Goal

Give absolute beginners a complete solve path before they touch CFOP. 6 algorithms, no prerequisites beyond knowing what a Rubik's cube is. Fits in the Library as a new tab **"Beginner"** placed between Cross and F2L.

### Why a separate section, not part of Cross

The Cross stage already teaches the white cross (LBL step 1). LBL steps 2–5 cover corner insertion, middle edges, and the last layer — topics that overlap awkwardly with CFOP stages but differ in method. Keeping them in a dedicated "Beginner" tab makes the distinction clear: **start here, then graduate to CFOP**.

### New stages

| Stage ID | LBL step | Content | Alg count |
|----------|----------|---------|-----------|
| `beginnerMiddle` | Step 3 — Middle edges | Right insert + Left insert | 2 |
| `beginnerTopOrientation` | Step 4 — Top orientation | Edge-line, edge-L, Sune, Anti-Sune | 4 |
| `beginnerTopPermutation` | Step 5 — Top permutation | Corner cycle + edge cycle | 2 |

### Algorithms (sourced from SpeedcubeDB — notation verified)

| Case | Alg |
|------|-----|
| Middle-right insert | `U R U' R' U' F' U F` |
| Middle-left insert | `U' L' U L U F U' F'` |
| Top edge — line | `F R U R' U' F'` |
| Top edge — L | `f R U R' U' f'` |
| Top corners — Sune | `R U R' U R U2 R'` |
| Top corners — Anti-Sune | `R U2 R' U' R U' R'` |
| Top corner cycle | `R U R' U' R' F R2 U' R' U' R U R' F'` |
| Top edge cycle | `R2 U R U R' U' R' U' R' U R'` |

Note: Sune and Anti-Sune are reused from 2-Look OLL — no new data needed, just reference the existing case IDs with a `beginner` scope tag.

### Library UI changes

- Add **"Beginner"** tab to the Library bar (position: after Cross, before F2L).
- New `Tab` value: `'beginner'`.
- Sections within the tab:
  - Beginner · Middle layer (2 cases, flat grid)
  - Beginner · Top orientation (4 cases, flat grid)
  - Beginner · Top permutation (2 cases, flat grid)
- No OrientationPicker needed (beginner method uses white-on-top / green-front convention; could hard-code or just omit the hold bar).

### Data model

- Three new `Stage` values: `beginnerMiddle`, `beginnerTopOrientation`, `beginnerTopPermutation`.
- Each case carries `stage`, `name`, `solve` alg (verified via `task test:cube`), `context` (solved cube), and basic `recognitionTagKeys`.
- No `group` field needed (each stage is a single flat section).

### Translation keys to add

- `path.stage.beginnerMiddle`, `…beginnerTopOrientation`, `…beginnerTopPermutation`
- `path.tabLabel.beginner` (tab bar label)
- Case names + description keys per the existing pattern.

### Risks / open questions

| # | Question | Default |
|---|----------|---------|
| 1 | Should steps 1–2 (cross + corners) be shown as read-only reference cards in the Beginner tab, linking to the existing Cross stage? | Yes — two non-algorithmic prose cards at the top |
| 2 | Does the beginner tab need its own drill mode, or reuse the existing drill system? | Reuse — `drillStage: 'beginnerTopOrientation'` etc. works as-is |
| 3 | Should Sune / Anti-Sune in `beginnerTopOrientation` be separate case records or soft-links to the OLL cases? | Separate records in `beginnerTopOrientation` stage — simpler data, avoids cross-stage dependencies |

---

## M11 — Roux Method section (proposed)

### Goal

Add a complete Roux method track to the Library as a new tab **"Roux"** placed after PLL. Targets learners who prefer spatial thinking over algorithm memorisation.

### Why Roux is a good second method to add

- Second most popular competitive method after CFOP.
- Shares no algorithmic content with CFOP (CMLL is distinct from OLL/PLL) — minimal reuse risk.
- Block-building stages are intuitive → fits the app's "recognition first" principle.
- Average solve is ~50 STM vs. CFOP's ~55–60 — efficient enough to motivate advanced learners.

### New stages

| Stage ID | Roux step | Content | Alg count |
|----------|-----------|---------|-----------|
| `rouxBlock1` | First 1×2×3 block (left) | Prose lesson — no algs | 0 |
| `rouxBlock2` | Second 1×2×3 block (right) | Prose lesson — no algs | 0 |
| `rouxCmll` | Corners of Last Layer | 2-look starter: ~10 algs; Full: 42 algs | 10 / 42 |
| `rouxLse` | Last Six Edges (EO + ULUR + 4c) | ~6 4c pattern algs; rest prose | ~6 |

### CMLL staging

CMLL has 42 cases organised by 7 orientation groups × 6 permutation cases. A 2-look approach (orient first using a Sune-like subset, then permute) reduces initial load to ~10 algs — a reasonable starter. Full CMLL is the expert upgrade, mirroring the OLL 2-look → Full pattern already in the app.

| CMLL scope | Cases | Approach |
|------------|-------|----------|
| Starter ("2-look CMLL") | ~10 | Orient corners (subset of CMLL-O) then permute with cycle alg |
| Full CMLL | 42 | One-look recognition by orientation + permutation group |

### LSE breakdown

LSE uses only M and U moves (M, M', M2, U, U', U2). Three sub-steps:
1. **EO** — orient all 6 remaining edges so M-moves don't flip them. ~4 patterns; rest intuitive inspection.
2. **ULUR** — place UL and UR edges. Intuitive with M/U.
3. **4c** — solve UF/UB/DF/DB. ~6 distinct cases (including skip); all short M-U sequences.

### Library UI changes

- Add **"Roux"** tab to the Library bar (position: after PLL).
- New `Tab` value: `'roux'`.
- Sections within the tab:
  - Roux · First block (prose cards, no case grid)
  - Roux · Second block (prose cards)
  - Roux · CMLL — 2-look (case grid, ~10 cases)
  - Roux · CMLL — Full (case grid, 42 cases)
  - Roux · LSE (case grid, ~6 cases)
- OrientationPicker: yes (CMLL and LSE visualisations need cube orientation context).

### Visualisation notes

- **Block stages**: no case grid; show a 3D isometric diagram of the target block shape (similar to F2L iso view), plus prose steps.
- **CMLL**: last-layer thumbnail (same renderer as OLL/PLL) — the two unsolved edge columns (UF/UB) are simply not in the mask.
- **LSE**: the cube state is partially solved — only U face + M-slice edges matter. A custom "LSE view" (top-down + M-slice strip) may be needed, or reuse the existing CubeNet with a custom mask.

### Risks / open questions

| # | Question | Default |
|---|----------|---------|
| 1 | CMLL thumbnail: should unsolved UF/UB positions be shown as grey or hidden? | Grey (same dimming treatment as F2L's non-FR pieces) |
| 2 | LSE visualisation: reuse CubeNet with custom mask or build a dedicated view? | Reuse CubeNet first; build dedicated view only if it looks confusing in testing |
| 3 | Should rouxBlock1/2 have any algorithm cases at all, or be pure prose? | Pure prose lessons only — drills are not useful at this stage |
| 4 | Source for CMLL algorithms? | speedsolving.com wiki CMLL page; verify all 42 via `task test:cube` |
| 5 | 2-look CMLL starter: which 10 algs? | CMLL orientation set (7 cases) + one adjacents-swap + one diagonal-swap + one skip = 9–10 cases |

---

## M9 — Library-first redesign

### Motivation

People use the Library to build their own learning path, not the Path view. The current three-tab nav (Path · Library · Settings) buries the most useful screen. This milestone makes Library the top-level experience, simplifies the case detail to reduce clutter, and keeps the Hold-orientation context always visible while browsing.

---

### Step A — Navigation restructure

**Goal:** Two-item nav → one primary destination. Settings moves out of the nav bar.

**Changes:**

| File | What changes |
|------|-------------|
| `src/App.tsx` | Default route `/` redirects to `/library`. The Path page route (`/`) is preserved but no longer linked from nav — it can be removed entirely in a follow-up or kept as an easter-egg entry point. |
| Bottom nav component (wherever the 3-tab bar lives) | Remove the **Path** tab. Remove the **Settings** tab. Keep only the **Library** entry (or remove the bar entirely if Library is now always active). |
| `src/pages/LibraryPage.tsx` | Add a cogwheel `⚙` icon button in the Library header (top-right of the stage-filter row). Tapping it navigates to `/settings`. |

**Open question:** Should the Path page be deleted or just unlinked? Keeping the route (but not the tab) means direct-link access is still possible. Lean towards **keeping the route**, deleting the tab. Decision needed before implementation.

---

### Step B — Sticky Hold bar in Library

**Goal:** The OrientationPicker ("Hold with top / front" selectors) stays pinned to the top of the viewport as the user scrolls through the case grid, so colour context is never lost.

**Current state:** `OrientationPicker` renders as an ordinary block inside the page scroll container (`LibraryPage.tsx` ~line 58–62). It scrolls away as soon as the user moves down.

**Changes:**

| File | What changes |
|------|-------------|
| `src/pages/LibraryPage.tsx` | Wrap the `OrientationPicker` (and the stage-tab row above it, since both should pin together) in a `sticky top-0 z-10` container with a solid background (e.g. `bg-ink-950`) so scrolling content slides beneath it without showing through. |
| `src/cube/OrientationPicker.tsx` | Likely no changes needed; the stickiness is a layout concern in the parent. |

**Risk:** The sticky container height must be subtracted from the scrollable area or cases near the top will appear under the pinned bar. Tailwind's `pt-[N]` on the grid container, or a spacer div, handles this. Measure the bar height at runtime (or fix it at a known value) rather than guessing.

---

### Step C — Case detail: simplified algorithm view

**Goal:** The case detail page (`CasePage`) focuses on one thing — the algorithm and how to hold the cube. All navigation and progress chrome is removed.

**Current state (CasePage.tsx):**
- `~line 49`: `<OrientationHint c={c} />` — orientation shown, but visually separate
- `~lines 65–75`: Mastery progress bar (Watch → Mimic → Recall → Recognise → Fluent)
- `~lines 78–96`: Algorithm notation block + two action buttons
  - `▶ Open lesson` → `/lesson/${c.id}`
  - `⇄ Compare` → `/compare?a=${c.id}`
- Below: collapsible alternates section

**What to remove:**
- ❌ Mastery section (the progress bar and its header)
- ❌ `▶ Open lesson` button
- ❌ `⇄ Compare` button

**What to keep / adjust:**
- ✅ Algorithm notation block — **increase font size** so the move tokens (`R U R' U'`) are visually the same weight as the orientation icon labels. Current size is `font-mono` at default; target something like `text-lg` or `text-xl` (exact size to be confirmed visually).
- ✅ Orientation hint — move it to sit **directly adjacent to the notation block** (above or inline) so the reader sees the hold context and the algorithm together without scanning up.
- ✅ Cube state visualisation (the before/after net or thumbnail) — keep as-is.
- ❓ Alternates section — currently collapsed by default. With lesson and compare gone, alternates are more useful, not less. **Leave the collapsible alternates in place** (no change needed). Open question: should alternates be expanded by default now? Lean towards **keeping collapsed** to avoid overwhelming newcomers.

**Files:**

| File | What changes |
|------|-------------|
| `src/pages/CasePage.tsx` | Delete mastery section block. Delete Open Lesson `<Link>`. Delete Compare `<Link>`. Move/reorganise `<OrientationHint>` to be adjacent to the notation card. Increase notation font size. |

---

### Step D — Hold bar also visible in each case card (Library grid)

**Current state:** Library grid cards show a compact `<OrientationHint compact>` for OLL/PLL stages (LibraryPage.tsx ~line 172). F2L cards do not show one.

**Goal:** The orientation context is visible on every card, not just OLL/PLL. This ensures the user always knows how to hold the cube for whatever stage they are browsing.

**Changes:**

| File | What changes |
|------|-------------|
| `src/pages/LibraryPage.tsx` (CaseGrid function) | Extend the compact `<OrientationHint>` to show for **all stages that have an OrientationPicker** (i.e. the existing `WITH_ORIENTATION` list: f2lIntuitive, f2lAdvanced, f2lExpert, oll2look, ollFull, pll2look, pllFull). The compact hint already exists; it just needs to be rendered for F2L stages too. |

**Risk:** F2L cards are smaller (no last-layer thumbnail); the compact hint adds a line. Check that the card height stays consistent across the grid. If F2L cards look cramped, the hint can be a hover/tooltip instead of always-visible — but try always-visible first.

---

### Step E — Remove Mastery from Library grid cards

**Current state:** Each case card shows a mastery status pill (`✓` / `●` / phase name) at the bottom.

**Goal:** Remove this — Library becomes a clean reference, not a tracker.

**Changes:**

| File | What changes |
|------|-------------|
| `src/pages/LibraryPage.tsx` (CaseGrid function, ~line 169) | Delete the mastery status expression (`isLearned(m) ? '✓' : isDue(m) ? '●' : m?.phase ?? ''`) and its containing element. |

**Note:** Mastery data in the store is not deleted — the underlying SRS and drill systems still use it. Only the visual indicator in the Library is removed.

---

### Risks and open questions

| # | Question | Decision |
|---|----------|---------|
| 1 | Keep the Path page route or delete it entirely? | **Deleted** — PathPage.tsx removed; `/` redirects to `/library`. |
| 2 | Should alternates on CasePage be expanded by default now that the lesson button is gone? | **Collapsed** — same default as before. |
| 3 | Exact font size for algo notation? | **Unchanged** — same `text-base text-cube-U font-mono` as before. |
| 4 | Should the drill button in Library move now that nav is restructured? | **No change** — drill entry point stays at the bottom of the case grid. |

---

### Implementation order

Run the steps in this sequence so each is independently reviewable:

1. **Step A** (nav) — smallest surface, high impact, easy to verify
2. **Step E** (remove mastery from cards) — pure deletion, zero risk
3. **Step D** (hold bar on all cards) — extends existing compact hint
4. **Step B** (sticky hold bar) — layout/CSS only
5. **Step C** (case detail cleanup) — most line changes, but contained to one file

---

## 9. Open questions (defaults in brackets)

- Which 2-Look PLL corner pair to teach first — A+E or A+Y? [present both; let user pick; default A+E] -> present both + let user pick
- Colour neutrality — push from the start, or after 2-Look PLL is done? -> after — too many simultaneous changes for beginners
- Source attribution UI — inline per alg, or one credits page? -> inline tag + one credits page
- Ship advanced F2L in M2 or later? -> later (M6) — intuitive first

---

## M12 — Before (n) / after (n') sticker labels

### Goal

Annotate case visualisations with numbered labels that show piece movement:

- **(n)** — where a sticker is **before** the algorithm (current position)
- **(n')** — where that sticker **lands after** the algorithm (target position)

### Rationale

The §0 numbering grid lets us name positions precisely. But a learner
watching an animation still needs to understand *which piece moves where*.
Displaying `(1)` on F2 and `(1')` on F6 makes the relationship explicit
without any prose.

### Roll-out order

1. **LBL middle layer** (M15) — clearest win; exactly two stickers matter
   per insert
2. **LBL corner insertion** (M14) — three stickers per corner
3. **F2L intuitive** — four stickers per pair
4. **F2L advanced** — optional; OLL/PLL less useful (too many pieces move)

### Implementation (done)

`pieceLabelMaps(pieces)` in `movement.ts` was already building the label
maps; `CubeIso` / `CubeNet` / `LLThumbnail` already accepted
`topLeftLabels` / `bottomRightLabels`. The only missing wire was in
`CubeWithMovement.tsx`: it computed `pieces` but never called
`pieceLabelMaps` and never forwarded the result to `CubeIso`.

Change: added a `labelMaps` memo (only when `isF2LView`) and passed
`topLeftLabels` / `bottomRightLabels` to `CubeIso`.

- **beginnerMiddle**: `piecesThatMove` finds the insert edge; both
  source stickers (top position) and target stickers (FR slot) are in
  `involved` → both `n` and `n′` labels render at full brightness.
- **f2l\***: `f2lFrPieces` tracks the corner (1) and edge (2); source
  stickers only in `involved` → `1`, `2` labels on piece positions; slot
  targets not lit so `n′` labels are withheld (slot stickers are already
  visually distinct by context color).

No `CaseData` changes needed — the existing movement analysis produces
correct labels for every case automatically.

---

## M13 — Fill Cross section (yellow flower approach)

### Goal

Replace the Cross stage's placeholder prose with a concrete 2-step method
that requires zero algorithm memorisation.

### The yellow flower (daisy) method

**Step 1 — Build the daisy (intuitive)**
Bring all 4 white edges to the U face with the white sticker facing **up**.
The result looks like a daisy: yellow U5 center with 4 white petals.
No fixed algorithm — learner hunts pieces and uses any move that brings
a white edge to U without disturbing already-placed petals.

Common patterns:

- White edge in bottom layer: `F2` flips it up (then rotate U and repeat)
- White edge in middle layer: `F U F'` or `R' U' R` depending on side

**Step 2 — Fold down**
For each petal on U, rotate U until the non-white color of that edge
matches the center directly below, then press it into place with `F2`
(double-front). Repeat for all 4 edges.

Total to memorise: **nothing** — just the `F2` press × 4.

### Case data

- 1 canonical "fold-down" case (alg: `F2`); the remaining 3 positions
  are the same case at `y` / `y2` / `y'` orientations
- Context: daisy built (4 white edges on U, white facing up)
- Lesson flow:
  1. Intro card — "build in two steps"
  2. Step 1 card — prose + example animation (no alg to memorise)
  3. Step 2 card — `U` align + `F2` press animated × 4
  4. Recognition drill — "which face press places this edge?"
     (F2 / R2 / B2 / L2, 4-option flashcard)

---

## M14 — LBL 1st layer corner algorithms

### Goal

Fill the gap between White Cross (step 1) and Middle Edges (step 3):
inserting white corners into the first layer (step 2).

### Current state

M10 shipped `beginnerMiddle`, `beginnerTopOrientation`,
`beginnerTopPermutation` (steps 3–5). Steps 1–2 were marked "intuitive"
but step 2 needs at least one algorithm for learners who get stuck.

### Algorithm

The universal corner-insertion trigger is `R U R' U'` ("sexy move").
Repeated from the correct starting position it inserts any white corner.

**Starting position**: hold so the target slot is at UFR. Align the white
corner above the slot, repeat `R U R' U'` until it drops in (1–5 reps).

**Corner stuck in bottom slot**: `R U R'` kicks it out; then re-insert.

### New stage: `beginnerFirstLayerCorners`

Position: between Cross intro cards and `beginnerMiddle` in the Beginner
Library tab.

| Case | State | Alg |
|------|-------|-----|
| Corner in U, white facing F | above slot, white on F | `(R U R' U') × 3` |
| Corner in U, white facing R | above slot, white on R | `R U R'` |
| Corner in U, white facing U | above slot, white on U | `R U2 R' U' R U R'` |
| Corner stuck in D slot | piece at DFR wrong orientation | `R U R'` → re-insert |

Alg count: **1 trigger** (`R U R' U'`), one "kick-out" variant.
EN + DE strings follow the existing `beginnerMiddle` pattern.

---

## M15 — Fix LBL middle layer coloring scheme

### Goal

Correct the sticker highlight scheme for `beginnerMiddle` visualisations
so exactly the right piece and its destination are visible — nothing else.

### Target scheme

Sticker positions use the §0 numbering (1–9 per face, left-to-right,
top-to-bottom):

| Sticker | Rendering | Role |
|---------|-----------|------|
| F5, U5, R5 | **Dimmed** (semi-transparent, full color) | Center orientation anchors |
| F2 | **Bright** (full color, bold border, labeled `1`) | Edge being inserted — before position |
| F6 | **Highlighted** (target color, dashed border, labeled `1'`) | Destination for right insert `U R U' R' U' F' U F` |
| F4 | **Highlighted** (target color, dashed border, labeled `1'`) | Destination for left insert `U' L' U L U F U' F'` |
| All others | **Gray** (color stripped) | Not relevant to this step |

Right insert uses F6 as the destination; left insert uses F4.
Both show only their relevant destination sticker highlighted — not both
simultaneously.

### Dependency

Implement after M12 so the `(1)` / `(1')` label infrastructure is
available.

---

## M16 — WCA Scramble mode

### Goal

Add a **Scramble** screen to the app that generates a legal WCA-style random scramble and displays the move sequence so two or more people can apply the same scramble to their physical cubes and race to solve the same puzzle state.

Reference: [WCA Scramble Regulations](https://www.worldcubeassociation.org/regulations/scrambles/)

### What a WCA scramble is

WCA competitions use **random-state scrambles**: a target cube state is chosen uniformly at random from all ~43 quintillion possible states, then the shortest (or near-shortest) sequence of moves that reaches that state from solved is computed. This guarantees full randomness without biasing toward easy or hard positions.

For a web app without a bundled solver, the practical approach is a **random-move scramble** that approximates this:

- Generate a sequence of 20 random moves (WCA's standard length for 3×3 in competition is also generated by such sequences via TNoodle).
- Constraints to avoid trivially redundant moves:
  - Never repeat the same face twice in a row (e.g. `R R'` → no-op).
  - Never place an opposite-face move after the current face when the previous two moves are already on the same axis (e.g. `R L R` is redundant).
- Do **not** start with a rotation (`x`, `y`, `z`) — WCA scrambles are applied from a fixed orientation (white top, green front).

This yields scrambles that are uniformly hard and practically indistinguishable from optimal random-state scrambles at the level of human solving.

### UI

A new route `/scramble` (or a modal overlay from anywhere) with:

1. **Move sequence display** — large, monospace, WCA-notation tokens (`R U2 L' F B' D …`). At least 20 tokens, one per step.
2. **Visual cube state** — the scrambled cube rendered as a 2D net using the existing `CubeNet` component, so players can verify they applied the scramble correctly.
3. **Generate** button — produces a new random scramble. Regenerate at any time.
4. **Copy** button — copies the move sequence to the clipboard (e.g. `R U2 L' F B' D …`) for sharing via chat/message.
5. **Step-through mode** — tap a move token to highlight it; players can step through one move at a time.

Navigation: add a **Scramble** entry to the top-right header (next to the cogwheel Settings icon) or expose it as a tab. Exact placement TBD at implementation.

### Data and logic

| Concern | Approach |
|---------|----------|
| Scramble generation | Pure TS function `generateScramble(length = 20): Move[]` in a new `src/scramble/generator.ts`. Uses `Math.random`; no external dependency. |
| Move representation | Reuse the existing `Move` type from the cube engine (`face + modifier`). |
| Apply to cube state | Reuse the existing `applyMoves(solved, moves)` engine. The resulting state feeds directly into `CubeNet`. |
| WCA orientation | White on top, green in front — the app's default orientation; no special handling needed. |
| Notation display | Reuse the existing move-notation formatter already used in alg cards. |

### Scramble generation algorithm

```ts
const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;
const MODIFIERS = ['', "'", '2'] as const;
const OPPOSITE: Record<string, string> = { U:'D', D:'U', F:'B', B:'F', L:'R', R:'L' };

function generateScramble(length = 20): Move[] {
  const moves: Move[] = [];
  let lastFace = '';
  let secondLastFace = '';
  for (let i = 0; i < length; i++) {
    let face: string;
    do {
      face = FACES[Math.floor(Math.random() * 6)];
    } while (
      face === lastFace ||
      (face === OPPOSITE[lastFace] && OPPOSITE[face] === secondLastFace)
    );
    const mod = MODIFIERS[Math.floor(Math.random() * 3)];
    moves.push({ face, modifier: mod });
    secondLastFace = lastFace;
    lastFace = face;
  }
  return moves;
}
```

### Sharing

- **Copy to clipboard**: the move sequence as a plain string (e.g. `R U2 L' F B' D2 …`). Web Clipboard API, with a fallback text-select for older iOS.
- **sharable-url** encode the scramble in URL so it is directly linkable (query param that takes the move sequence URL-encoded)

### Translation keys

- `scramble.title` — "Scramble" / "Mischen"
- `scramble.generate` — "New scramble" / "Neu mischen"
- `scramble.copy` — "Copy" / "Kopieren"
- `scramble.copied` — "Copied!" / "Kopiert!"
- `scramble.stepThrough` — "Step through" / "Schritt für Schritt"
- `scramble.instruction` — "Apply these moves to a solved cube, starting with white on top and green in front." / "Wende diese Züge auf einen gelösten Würfel an, mit Weiß oben und Grün vorne."

### Risks / open questions

| # | Question | Default |
|---|----------|---------|
| 1 | 20-move random-move vs. true random-state scramble? | 20-move random-move for v1 — simpler, no solver needed, indistinguishable at human level. |
| 2 | Where does Scramble live in navigation? | Top-right header button alongside Settings cogwheel. Can be promoted to a tab later. |
| 3 | Should step-through mode animate moves (like alg playback) or just highlight? | moves / notation + cube-net preview of the puzzle created by the scramble |
| 4 | Share via URL hash? | shared by query param that represents the move-sequence |

### Implementation steps

1. Create `src/scramble/generator.ts` with `generateScramble(length)`.
2. Add `/scramble` route in `src/App.tsx`.
3. Create `src/pages/ScramblePage.tsx` with generate + display + copy + step-through.
4. Wire `CubeNet` with the scrambled cube state.
5. Add Scramble entry to the header / nav.
6. Add EN + DE translation keys.
7. Run `task build` — confirm zero TS errors.

---

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
