import { CaseData } from './types';

// Context: Sune scrambles the top layer so the LL stays unsolved after the alg.
const CTX = "R U R' U R U2 R'";

/**
 * Beginner LBL cases — 11 algorithms covering steps 2–5 of the 5-step method.
 * Step 1 (white cross) is handled by prose lessons in the Cross stage.
 * Source: SpeedcubeDB beginner section (https://speedcubedb.com/beginner).
 */
export const BEGINNER_CASES: CaseData[] = [

  // ============================================================
  // STEP 2 · First-layer corner inserts (3)
  // Hold with empty slot at UFR. D-color = bottom-face color.
  // ============================================================
  {
    id: 'beg-fc-right',
    stage: 'beginnerFirstLayerCorners',
    group: 'cornerInsert',
    name: 'D-color on R',
    descriptionKey: 'cases.begFcRight.desc',
    recognitionTagKeys: ['tags.cornerDcolorR'],
    context: CTX,
    solve: "R U R'",
  },
  {
    id: 'beg-fc-front',
    stage: 'beginnerFirstLayerCorners',
    group: 'cornerInsert',
    name: 'D-color on F',
    descriptionKey: 'cases.begFcFront.desc',
    recognitionTagKeys: ['tags.cornerDcolorF'],
    context: CTX,
    solve: "F' U' F",
  },
  {
    id: 'beg-fc-top',
    stage: 'beginnerFirstLayerCorners',
    group: 'cornerInsert',
    name: 'D-color on top',
    descriptionKey: 'cases.begFcTop.desc',
    recognitionTagKeys: ['tags.cornerDcolorU'],
    context: CTX,
    solve: "R U2 R' U' R U R'",
  },

  // ============================================================
  // STEP 3 · Middle-layer edge inserts (2)
  // ============================================================
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

  // ============================================================
  // STEP 4 · Top-layer — make yellow cross, then place edges (2)
  // Source: speedcube.com.au #step4
  // ============================================================
  {
    id: 'beg-top-cross',
    stage: 'beginnerTopOrientation',
    group: 'yellowCross',
    name: 'Yellow Cross',
    descriptionKey: 'cases.begTopCross.desc',
    recognitionTagKeys: ['tags.noCross'],
    solve: "F R U R' U' F'",
  },
  {
    id: 'beg-top-edgeswap',
    stage: 'beginnerTopOrientation',
    group: 'edgeSwap',
    name: 'Place Edges',
    descriptionKey: 'cases.begTopEdgeSwap.desc',
    recognitionTagKeys: ['tags.edgesNotPlaced'],
    solve: "R U R' U R U2 R' U",
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
