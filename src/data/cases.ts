import { CaseData, AlgData, LessonData } from './types';
import { OLL_FULL_CASES } from './oll-full';
import { PLL_FULL_CASES } from './pll-full';
import { F2L_ADVANCED_CASES, F2L_ADVANCED_GROUP_ORDER } from './f2l-advanced';
import { F2L_EXPERT_CASES, F2L_EXPERT_GROUP_ORDER } from './f2l-expert';

// === Cross & F2L (intuitive) — prose lessons with illustrative examples ===
export const LESSONS: LessonData[] = [
  { id: 'cross-intro', stage: 'cross', titleKey: 'lessons.crossIntro.title', bodyKey: 'lessons.crossIntro.body' },
  { id: 'cross-planning', stage: 'cross', titleKey: 'lessons.crossPlanning.title', bodyKey: 'lessons.crossPlanning.body' },
  { id: 'f2l-three-shapes', stage: 'f2lIntuitive', titleKey: 'lessons.f2lShapes.title', bodyKey: 'lessons.f2lShapes.body',
    examples: ['f2l-bi-1', 'f2l-ex-split', 'f2l-ex-stuck'] },
  { id: 'f2l-joined', stage: 'f2lIntuitive', titleKey: 'lessons.f2lJoined.title', bodyKey: 'lessons.f2lJoined.body',
    examples: ['f2l-bi-1'] },
  { id: 'f2l-split',  stage: 'f2lIntuitive', titleKey: 'lessons.f2lSplit.title',  bodyKey: 'lessons.f2lSplit.body',
    examples: ['f2l-ex-split'] },
  { id: 'f2l-stuck',  stage: 'f2lIntuitive', titleKey: 'lessons.f2lStuck.title',  bodyKey: 'lessons.f2lStuck.body',
    examples: ['f2l-ex-stuck'] },
];

// `solve` is the canonical primary alg. The case state is derived by applying its inverse.
export const CASES: CaseData[] = [
  // --- F2L intuitive: the 4 canonical Basic Inserts (speedsolving wiki F2L 1–4)
  //     plus 2 illustrative shape examples (split, stuck) referenced by the
  //     prose lessons. Names use the F2L N convention consistently. ---
  // Context = "Sune" (a typical OLL case) so the resulting cube shows F2L
  // solved with an unsolved last layer — honest for a "First Two Layers" step.

  // Naming follows cuberoot.me/alg/3x3/f2l "A+ #N" convention.
  // F2L 1 / A+: corner in slot oriented, edge in U ready to pair
  { id: 'f2l-bi-1', stage: 'f2lIntuitive', name: 'F2L 1 · pair ready',
    descriptionKey: 'cases.f2lJoined.desc',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "U R U' R'" },
  // F2L 2 / A-: edge needs repositioning before insertion.
  // Cuberoot lists "U' (F' U F)" and "y' U' (R' U R)" as equivalent. We use the
  // non-rotation variant so the visualisation stays in the standard FR-slot
  // frame; otherwise the y' rotates the cube and the DRF-corner tracking ends
  // up on what looks like a different slot to the learner.
  { id: 'f2l-bi-2', stage: 'f2lIntuitive', name: 'F2L 2 · edge to reposition',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "U' F' U F" },
  // F2L 3 / B-: corner sits in slot with wrong orientation, edge ready in U
  { id: 'f2l-bi-3', stage: 'f2lIntuitive', name: 'F2L 3 · corner wrong',
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: "R U R' U R U2 R'", solve: "F' U' F" },
  // F2L 4: pair joined in U layer, simple insert
  { id: 'f2l-bi-4', stage: 'f2lIntuitive', name: 'F2L 4 · pair on top',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "R U R'" },

  // Two extra illustrative shapes for the prose lessons. They're not in the
  // wiki Basic-Inserts list per se, so they keep an "F2L N · shape" label
  // continuing the numbering sequence inside intuitive.
  { id: 'f2l-ex-split',  stage: 'f2lIntuitive', name: 'F2L 5 · split pair',
    descriptionKey: 'cases.f2lSplit.desc',
    recognitionTagKeys: ['tags.pairSplitTop'],
    context: "R U R' U R U2 R'", solve: "R U' R'" },
  { id: 'f2l-ex-stuck',  stage: 'f2lIntuitive', name: 'F2L 6 · stuck in slot',
    descriptionKey: 'cases.f2lStuck.desc',
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: "R U R' U R U2 R'", solve: "R U' R' U R U' R' U R U R'" },

  // --- 2-Look OLL: Edge orientation (3) ---
  { id: 'oll2-eo-dot',    stage: 'oll2look', name: 'Dot',     descriptionKey: 'cases.eoDot.desc',  recognitionTagKeys: ['tags.noEdgesOriented'], solve: "F R U R' U' F' f R U R' U' f'" },
  { id: 'oll2-eo-line',   stage: 'oll2look', name: 'Line',    descriptionKey: 'cases.eoLine.desc', recognitionTagKeys: ['tags.lineHorizontal'],  solve: "F R U R' U' F'" },
  { id: 'oll2-eo-lshape', stage: 'oll2look', name: 'L-shape', descriptionKey: 'cases.eoL.desc',    recognitionTagKeys: ['tags.lShape'],          solve: "f R U R' U' f'" },
  // --- 2-Look OLL: Corner orientation (OCLL, 7) ---
  { id: 'oll2-oc-sune',     stage: 'oll2look', name: 'Sune',       recognitionTagKeys: ['tags.oneCornerOriented'], solve: "R U R' U R U2 R'" },
  { id: 'oll2-oc-antisune', stage: 'oll2look', name: 'Anti-Sune',  recognitionTagKeys: ['tags.oneCornerOriented'], solve: "R U2 R' U' R U' R'" },
  { id: 'oll2-oc-h',        stage: 'oll2look', name: 'H',          recognitionTagKeys: ['tags.opposites'],          solve: "R U R' U R U' R' U R U2 R'" },
  { id: 'oll2-oc-pi',       stage: 'oll2look', name: 'Pi',         recognitionTagKeys: ['tags.barTwoCorners'],      solve: "R U2 R2 U' R2 U' R2 U2 R" },
  { id: 'oll2-oc-l',        stage: 'oll2look', name: 'Bowtie (L)', recognitionTagKeys: ['tags.diagonal'],           solve: "F R' F' r U R U' r'" },
  { id: 'oll2-oc-t',        stage: 'oll2look', name: 'T',          recognitionTagKeys: ['tags.adjacent'],           solve: "R U R' U' R' F R F'" },
  { id: 'oll2-oc-u',        stage: 'oll2look', name: 'U',          recognitionTagKeys: ['tags.frontTwoCorners'],    solve: "R2 D' R U2 R' D R U2 R" },

  // --- 2-Look PLL: Corners (2) ---
  { id: 'pll2-a-perm', stage: 'pll2look', name: 'A-perm', descriptionKey: 'cases.aPerm.desc', recognitionTagKeys: ['tags.threeCornerCycle'],     solve: "x R' U R' D2 R U' R' D2 R2 x'" },
  { id: 'pll2-y-perm', stage: 'pll2look', name: 'Y-perm', descriptionKey: 'cases.yPerm.desc', recognitionTagKeys: ['tags.diagonalCornerSwap'],   solve: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  // --- 2-Look PLL: Edges (4) ---
  { id: 'pll2-ua', stage: 'pll2look', name: 'Ua-perm', recognitionTagKeys: ['tags.threeEdgeCycle'],     solve: "M2 U M U2 M' U M2" },
  { id: 'pll2-ub', stage: 'pll2look', name: 'Ub-perm', recognitionTagKeys: ['tags.threeEdgeCycle'],     solve: "M2 U' M U2 M' U' M2" },
  { id: 'pll2-h',  stage: 'pll2look', name: 'H-perm',  recognitionTagKeys: ['tags.oppositeEdgeSwap'],   solve: "M2 U M2 U2 M2 U M2" },
  { id: 'pll2-z',  stage: 'pll2look', name: 'Z-perm',  recognitionTagKeys: ['tags.adjacentEdgeSwap'],   solve: "M2 U M2 U M' U2 M2 U2 M'" },

  // === Full OLL (57) — M4 ===
  ...OLL_FULL_CASES,

  // === Full PLL (21) — M5 ===
  ...PLL_FULL_CASES,

  // === F2L (37 cases organised by speedsolving wiki groups) — M7 ===
  ...F2L_ADVANCED_CASES,
  // === F2L Expert (placeholder ≈5 cases; full 54 pending cuberoot sourcing) — M8 ===
  ...F2L_EXPERT_CASES,
];

// Primary alg (rank 1) is derived from `case.solve`; any `case.alternates`
// follow as rank 2+ in the same case's alg list.
export const ALGS: AlgData[] = CASES.flatMap((c) => {
  const primary: AlgData = {
    id: `${c.id}-primary`,
    caseId: c.id,
    notation: c.solve,
    primary: true,
  };
  const alts: AlgData[] = (c.alternates ?? []).map((alt, i) => ({
    id: `${c.id}-alt-${i + 1}`,
    caseId: c.id,
    notation: alt.notation,
    notesKey: alt.notesKey,
    ergonomicsKeys: alt.ergonomicsKeys,
    attribution: alt.attribution,
    primary: false,
  }));
  return [primary, ...alts];
});

export function caseById(id: string): CaseData | undefined {
  return CASES.find((c) => c.id === id);
}

export function algsFor(caseId: string): AlgData[] {
  return ALGS.filter((a) => a.caseId === caseId);
}

export function casesByStage(stage: string): CaseData[] {
  return CASES.filter((c) => c.stage === stage);
}

export function lessonsByStage(stage: string): LessonData[] {
  return LESSONS.filter((l) => l.stage === stage);
}

/**
 * Ordered list of subcategory slugs that have at least one case in this
 * stage. Currently only `f2lAdvanced` uses a wiki-defined order; other
 * stages return a single null bucket if no `group` is set.
 */
export function caseGroupsByStage(stage: string): string[] {
  const cases = casesByStage(stage);
  const seen = new Set<string>();
  for (const c of cases) if (c.group) seen.add(c.group);

  if (stage === 'f2lAdvanced') {
    // Render in the canonical wiki order; skip any group with no cases.
    return F2L_ADVANCED_GROUP_ORDER.filter((g) => seen.has(g));
  }
  if (stage === 'f2lExpert') {
    return F2L_EXPERT_GROUP_ORDER.filter((g) => seen.has(g));
  }
  return [...seen];
}
