import { CaseData, AlgData, LessonData } from './types';

// === Cross & F2L (intuitive) — prose lessons only in v1 ===
export const LESSONS: LessonData[] = [
  { id: 'cross-intro', stage: 'cross', titleKey: 'lessons.crossIntro.title', bodyKey: 'lessons.crossIntro.body' },
  { id: 'cross-planning', stage: 'cross', titleKey: 'lessons.crossPlanning.title', bodyKey: 'lessons.crossPlanning.body' },
  { id: 'f2l-three-shapes', stage: 'f2lIntuitive', titleKey: 'lessons.f2lShapes.title', bodyKey: 'lessons.f2lShapes.body' },
  { id: 'f2l-joined', stage: 'f2lIntuitive', titleKey: 'lessons.f2lJoined.title', bodyKey: 'lessons.f2lJoined.body' },
  { id: 'f2l-split', stage: 'f2lIntuitive', titleKey: 'lessons.f2lSplit.title', bodyKey: 'lessons.f2lSplit.body' },
  { id: 'f2l-stuck', stage: 'f2lIntuitive', titleKey: 'lessons.f2lStuck.title', bodyKey: 'lessons.f2lStuck.body' },
];

// `solve` is the canonical primary alg. The case state is derived by applying its inverse.
export const CASES: CaseData[] = [
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
];

// Primary alg = the case's `solve`. Additional alternates can be added here.
export const ALGS: AlgData[] = CASES.map((c) => ({
  id: `${c.id}-primary`,
  caseId: c.id,
  notation: c.solve,
  primary: true,
}));

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
