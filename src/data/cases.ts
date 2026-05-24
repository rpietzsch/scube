import { CaseData, AlgData, LessonData } from './types';
import { OLL_FULL_CASES } from './oll-full';
import { PLL_FULL_CASES } from './pll-full';
import { F2L_ADVANCED_CASES, F2L_ADVANCED_GROUP_ORDER } from './f2l-advanced';
import { F2L_EXPERT_CASES, F2L_EXPERT_GROUP_ORDER } from './f2l-expert';
import { BEGINNER_CASES } from './beginner';
import { ROUX_CASES } from './roux';

// === Cross & F2L (intuitive) — prose lessons with illustrative examples ===
export const LESSONS: LessonData[] = [
  { id: 'cross-intro', stage: 'cross', titleKey: 'lessons.crossIntro.title', bodyKey: 'lessons.crossIntro.body' },
  { id: 'cross-daisy-intro', stage: 'cross', titleKey: 'lessons.crossDaisyIntro.title', bodyKey: 'lessons.crossDaisyIntro.body' },
  { id: 'cross-daisy-step1', stage: 'cross', titleKey: 'lessons.crossDaisyStep1.title', bodyKey: 'lessons.crossDaisyStep1.body' },
  { id: 'cross-daisy-step2', stage: 'cross', titleKey: 'lessons.crossDaisyStep2.title', bodyKey: 'lessons.crossDaisyStep2.body' },
  { id: 'cross-planning', stage: 'cross', titleKey: 'lessons.crossPlanning.title', bodyKey: 'lessons.crossPlanning.body' },
  // examples reference cases from f2lAdvanced (f2l-w-plus = W+ #5 disconnected = split,
  // f2l-j-plus = J+ #27 corner-in-slot = stuck)
  { id: 'f2l-three-shapes', stage: 'f2lIntuitive', titleKey: 'lessons.f2lShapes.title', bodyKey: 'lessons.f2lShapes.body',
    examples: ['f2l-bi-1', 'f2l-w-plus', 'f2l-j-plus'] },
  { id: 'f2l-joined', stage: 'f2lIntuitive', titleKey: 'lessons.f2lJoined.title', bodyKey: 'lessons.f2lJoined.body',
    examples: ['f2l-bi-1'] },
  { id: 'f2l-split',  stage: 'f2lIntuitive', titleKey: 'lessons.f2lSplit.title',  bodyKey: 'lessons.f2lSplit.body',
    examples: ['f2l-w-plus'] },
  { id: 'f2l-stuck',  stage: 'f2lIntuitive', titleKey: 'lessons.f2lStuck.title',  bodyKey: 'lessons.f2lStuck.body',
    examples: ['f2l-j-plus'] },
];

// `solve` is the canonical primary alg. The case state is derived by applying its inverse.
export const CASES: CaseData[] = [
  // --- F2L intuitive: lessons only (like 'cross').
  //     F2L 1–4 live in f2lAdvanced (basicInsert group) so the complete 41-case
  //     F2L library is under one tab. The prose lessons here reference those
  //     advanced cases for their example illustrations.
  //
  //     NOTE: f2l-ex-split and f2l-ex-stuck have been REMOVED — they conflicted
  //     with cuberoot's F2L #5 (W+) and #6 (W-) numbering. The split/stuck prose
  //     lessons now reference W+ #5 and J+ #27 from f2lAdvanced instead.
  // --- (no cases in f2lIntuitive — lessons only) ---

  // === F2L 1–4 (Basic Inserts): also live in f2lAdvanced for the full library ===
  // Context = Sune so the LL stays unsolved after the alg.
  { id: 'f2l-bi-1', stage: 'f2lAdvanced', group: 'basicInsert', name: 'F2L 1 · pair ready',
    descriptionKey: 'cases.f2lJoined.desc',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "U R U' R'" },
  { id: 'f2l-bi-2', stage: 'f2lAdvanced', group: 'basicInsert', name: 'F2L 2 · edge to reposition',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "U' F' U F" },
  { id: 'f2l-bi-3', stage: 'f2lAdvanced', group: 'basicInsert', name: 'F2L 3 · corner wrong',
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: "R U R' U R U2 R'", solve: "F' U' F" },
  { id: 'f2l-bi-4', stage: 'f2lAdvanced', group: 'basicInsert', name: 'F2L 4 · pair on top',
    recognitionTagKeys: ['tags.pairJoinedTop'],
    context: "R U R' U R U2 R'", solve: "R U R'" },

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

  // === Beginner LBL (8 cases: middle insert + top orient + top perm) — M10 ===
  ...BEGINNER_CASES,

  // === Roux method (14 cases: blocks + CMLL + LSE) — M11 ===
  ...ROUX_CASES,
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
