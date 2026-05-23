import { CaseData } from './types';

const CTX = "R U R' U R U2 R'";

/**
 * Roux method cases — 14 total covering the four Roux steps.
 * Block-building steps (1–2) use a few illustrative algs; CMLL and LSE
 * cover the main pattern families.
 *
 * CMLL algs here are the OCLL-equivalent orientations (7 cases).
 * Full one-look CMLL (42 cases) is a future milestone.
 *
 * LSE covers the main EO patterns and basic permutation cycles.
 */
export const ROUX_CASES: CaseData[] = [

  // ============================================================
  // BLOCK 1 · First 1×2×3 block (left side) — illustrative (2)
  // ============================================================
  {
    id: 'roux-b1-pair',
    stage: 'rouxBlock1',
    group: 'basic',
    name: 'Block 1 · pair ready',
    descriptionKey: 'cases.rouxB1Pair.desc',
    context: CTX,
    solve: "U R U' R'",
  },
  {
    id: 'roux-b1-split',
    stage: 'rouxBlock1',
    group: 'basic',
    name: 'Block 1 · split pair',
    descriptionKey: 'cases.rouxB1Split.desc',
    context: CTX,
    solve: "R U2 R' U' R U' R'",
  },

  // ============================================================
  // BLOCK 2 · Second 1×2×3 block (right side) — illustrative (2)
  // ============================================================
  {
    id: 'roux-b2-pair',
    stage: 'rouxBlock2',
    group: 'basic',
    name: 'Block 2 · pair ready',
    descriptionKey: 'cases.rouxB2Pair.desc',
    context: CTX,
    solve: "U' R' U R",
  },
  {
    id: 'roux-b2-split',
    stage: 'rouxBlock2',
    group: 'basic',
    name: 'Block 2 · split pair',
    descriptionKey: 'cases.rouxB2Split.desc',
    context: CTX,
    solve: "R' U2 R U R' U R",
  },

  // ============================================================
  // CMLL · Corners of the Last Layer — orientation (7)
  // These are the OCLL-equivalent patterns; M-slice edges are ignored
  // during recognition.  Full one-look CMLL (42 cases) follows later.
  // ============================================================
  {
    id: 'roux-cmll-sune',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'Sune',
    recognitionTagKeys: ['tags.oneCornerOriented'],
    solve: "R U R' U R U2 R'",
  },
  {
    id: 'roux-cmll-antisune',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'Anti-Sune',
    recognitionTagKeys: ['tags.oneCornerOriented'],
    solve: "R U2 R' U' R U' R'",
  },
  {
    id: 'roux-cmll-h',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'H',
    recognitionTagKeys: ['tags.opposites'],
    solve: "R U R' U R U' R' U R U2 R'",
  },
  {
    id: 'roux-cmll-pi',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'Pi',
    recognitionTagKeys: ['tags.barTwoCorners'],
    solve: "R U2 R2 U' R2 U' R2 U2 R",
  },
  {
    id: 'roux-cmll-u',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'U',
    recognitionTagKeys: ['tags.frontTwoCorners'],
    solve: "R2 D' R U2 R' D R U2 R",
  },
  {
    id: 'roux-cmll-t',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'T',
    recognitionTagKeys: ['tags.adjacent'],
    solve: "R U R' U' R' F R F'",
  },
  {
    id: 'roux-cmll-l',
    stage: 'rouxCmll',
    group: 'orient',
    name: 'L (Bowtie)',
    recognitionTagKeys: ['tags.diagonal'],
    solve: "F R' F' r U R U' r'",
  },

  // ============================================================
  // LSE · Last Six Edges — EO then permutation (4)
  // ============================================================
  {
    id: 'roux-lse-arrow-l',
    stage: 'rouxLse',
    group: 'eo',
    name: 'Arrow (left)',
    descriptionKey: 'cases.rouxLseArrow.desc',
    solve: "M U2 M'",
  },
  {
    id: 'roux-lse-arrow-r',
    stage: 'rouxLse',
    group: 'eo',
    name: 'Arrow (right)',
    descriptionKey: 'cases.rouxLseArrow.desc',
    solve: "M' U2 M",
  },
  {
    id: 'roux-lse-cycle-cw',
    stage: 'rouxLse',
    group: 'perm',
    name: 'Edge cycle CW',
    descriptionKey: 'cases.rouxLseCycle.desc',
    solve: "M2 U M2 U2 M2 U M2",
  },
  {
    id: 'roux-lse-cycle-ccw',
    stage: 'rouxLse',
    group: 'perm',
    name: 'Edge cycle CCW',
    descriptionKey: 'cases.rouxLseCycle.desc',
    solve: "M2 U' M2 U2 M2 U' M2",
  },
];
