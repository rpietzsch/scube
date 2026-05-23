import { CaseData } from './types';

// Context: Sune scrambles the top layer so the LL stays unsolved after the alg.
const CTX = "R U R' U R U2 R'";

/**
 * Beginner LBL cases — 8 algorithms covering steps 3–5 of the 5-step method.
 * Step 1 (white cross) is intuitive; step 2 (white corners) is intuitive.
 * Source: SpeedcubeDB beginner section (https://speedcubedb.com/beginner).
 */
export const BEGINNER_CASES: CaseData[] = [

  // ============================================================
  // STEP 3 · Middle-layer edge inserts (2)
  // ============================================================
  {
    id: 'beg-mid-right',
    stage: 'beginnerMiddle',
    group: 'middleInsert',
    name: 'Right insert',
    descriptionKey: 'cases.begMidRight.desc',
    recognitionTagKeys: ['tags.edgeColorFront'],
    context: CTX,
    solve: "U R U' R' U' F' U F",
  },
  {
    id: 'beg-mid-left',
    stage: 'beginnerMiddle',
    group: 'middleInsert',
    name: 'Left insert',
    descriptionKey: 'cases.begMidLeft.desc',
    recognitionTagKeys: ['tags.edgeColorLeft'],
    context: CTX,
    solve: "U' L' U L U F U' F'",
  },

  // ============================================================
  // STEP 4 · Top-layer orientation — 3 edge cases + 1 corner alg (4)
  // ============================================================
  {
    id: 'beg-top-dot',
    stage: 'beginnerTopOrientation',
    group: 'edgeCross',
    name: 'Dot',
    descriptionKey: 'cases.eoDot.desc',
    recognitionTagKeys: ['tags.noEdgesOriented'],
    solve: "F R U R' U' F' f R U R' U' f'",
  },
  {
    id: 'beg-top-line',
    stage: 'beginnerTopOrientation',
    group: 'edgeCross',
    name: 'Line',
    descriptionKey: 'cases.eoLine.desc',
    recognitionTagKeys: ['tags.lineHorizontal'],
    solve: "F R U R' U' F'",
  },
  {
    id: 'beg-top-lshape',
    stage: 'beginnerTopOrientation',
    group: 'edgeCross',
    name: 'L-shape',
    descriptionKey: 'cases.eoL.desc',
    recognitionTagKeys: ['tags.lShape'],
    solve: "f R U R' U' f'",
  },
  {
    id: 'beg-top-sune',
    stage: 'beginnerTopOrientation',
    group: 'cornerOrient',
    name: 'Sune',
    descriptionKey: 'cases.begSune.desc',
    recognitionTagKeys: ['tags.oneCornerOriented'],
    solve: "R U R' U R U2 R'",
  },

  // ============================================================
  // STEP 5 · Top-layer permutation — corners then edges (2)
  // ============================================================
  {
    id: 'beg-top-cperm',
    stage: 'beginnerTopPermutation',
    group: 'cornerPerm',
    name: 'A-perm',
    descriptionKey: 'cases.aPerm.desc',
    recognitionTagKeys: ['tags.threeCornerCycle'],
    solve: "x R' U R' D2 R U' R' D2 R2 x'",
  },
  {
    id: 'beg-top-eperm',
    stage: 'beginnerTopPermutation',
    group: 'edgePerm',
    name: 'Ua-perm',
    recognitionTagKeys: ['tags.threeEdgeCycle'],
    solve: "M2 U M U2 M' U M2",
  },
];
