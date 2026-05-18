import { CaseData } from './types';

/**
 * F2L — 37 cases from cuberoot.me/alg/3x3/f2l (PDF, May 2026).
 * Cases #1–#4 (FREE PAIRS) live in `f2lIntuitive` (f2l-bi-1 to f2l-bi-4).
 * This file covers #5–#41 organised by cuberoot's section headers.
 *
 * Sections:
 *   disconnectedPairs  (10) — #5–10, #19–22
 *   connectedPairs     (10) — #11–18, #23–24
 *   cornerInSlot        (6) — #25–30
 *   edgeInSlot          (6) — #31–36
 *   piecesInSlot        (5) — #37–41
 *
 * Primary alg: first non-rotation alg (no leading y/y'/x/x').
 * Context = Sune state so the LL remains unsolved after the alg.
 */
const CTX = "R U R' U R U2 R'";

export const F2L_ADVANCED_CASES: CaseData[] = [

  // ============================================================
  // DISCONNECTED PAIRS (10) — #5–10, #19–22
  // ============================================================
  { id: 'f2l-w-plus',  stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 5',  context: CTX, solve: "U' R U R' U2 R U' R'" },
  { id: 'f2l-w-minus', stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 6',  context: CTX, solve: "U' r U' R' U R U r'" },
  { id: 'f2l-m-plus',  stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 7',  context: CTX, solve: "U' R U2 R' U' R U2 R'" },
  { id: 'f2l-m-minus', stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 8',  context: CTX, solve: "r' U2 R2 U R2 U r" },
  { id: 'f2l-r-minus', stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 9',  context: CTX, solve: "U' R U' R' U F' U' F" },
  { id: 'f2l-r-plus',  stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 10', context: CTX, solve: "U' R U R' U R U R'" },
  { id: 'f2l-q-plus',  stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 19', context: CTX, solve: "U R U2 R' U R U' R'" },
  { id: 'f2l-q-minus', stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 20', context: CTX, solve: "U' F' U2 F U' F' U F" },  // skip y' first alg
  { id: 'f2l-p-plus',  stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 21', context: CTX, solve: "U2 R U R' U R U' R'" },
  { id: 'f2l-p-minus', stage: 'f2lAdvanced', group: 'disconnectedPairs',
    name: 'F2L 22', context: CTX, solve: "r U' r' U2 r U r'" },

  // ============================================================
  // CONNECTED PAIRS (10) — #11–18, #23–24
  // ============================================================
  { id: 'f2l-x-minus', stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 11', context: CTX, solve: "U' R U2 R' U F' U' F" },
  { id: 'f2l-x-plus',  stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 12', context: CTX, solve: "R U' R' U R U' R' U2 R U' R'" },
  { id: 'f2l-k-minus', stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 13', context: CTX, solve: "M' U' R U R' U2 R U' r'" },  // skip y' first alg
  { id: 'f2l-k-plus',  stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 14', context: CTX, solve: "U' R U' R' U R U R'" },
  { id: 'f2l-i-plus',  stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 15', context: CTX, solve: "R' D' R U' R' D R U R U' R'" },
  { id: 'f2l-i-minus', stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 16', context: CTX, solve: "R U' R' U2 F' U' F" },
  { id: 'f2l-h-plus',  stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 17', context: CTX, solve: "R U2 R' U' R U R'" },
  { id: 'f2l-h-minus', stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 18', context: CTX, solve: "F' U2 F U F' U' F" },  // skip y'/y algs
  { id: 'f2l-g-plus',  stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 23', context: CTX, solve: "U R U' R' U' R U' R' U R U' R'" },
  { id: 'f2l-g-minus', stage: 'f2lAdvanced', group: 'connectedPairs',
    name: 'F2L 24', context: CTX, solve: "F U R U' R' F' R U' R'" },

  // ============================================================
  // CORNER IN SLOT (6) — #25–30
  // ============================================================
  { id: 'f2l-e-plus',  stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 25', context: CTX, solve: "U' R' F R F' R U R'" },
  { id: 'f2l-e-minus', stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 26', context: CTX, solve: "U R U' R' F R' F' R" },
  { id: 'f2l-j-plus',  stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 27', context: CTX, solve: "R U' R' U R U' R'" },
  { id: 'f2l-j-minus', stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 28', context: CTX, solve: "R U R' U' F R' F' R" },
  { id: 'f2l-l-minus', stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 29', context: CTX, solve: "R' F R F' U R U' R'" },
  { id: 'f2l-l-plus',  stage: 'f2lAdvanced', group: 'cornerInSlot',
    name: 'F2L 30', context: CTX, solve: "R U R' U' R U R'" },

  // ============================================================
  // EDGE IN SLOT (6) — #31–36
  // ============================================================
  { id: 'f2l-t',       stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 31',  context: CTX, solve: "U' R' F R F' R U' R'" },
  { id: 'f2l-s',       stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 32',  context: CTX, solve: "U R U' R' U R U' R' U R U' R'" },
  { id: 'f2l-u-plus',  stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 33', context: CTX, solve: "U' R U' R' U2 R U' R'" },
  { id: 'f2l-u-minus', stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 34', context: CTX, solve: "U R U R' U2 R U R'" },
  { id: 'f2l-v-plus',  stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 35', context: CTX, solve: "U' R U R' U F' U' F" },
  { id: 'f2l-v-minus', stage: 'f2lAdvanced', group: 'edgeInSlot',
    name: 'F2L 36', context: CTX, solve: "U F' U' F U R U' R'" },

  // ============================================================
  // PIECES IN SLOT (5) — #37–41
  // ============================================================
  { id: 'f2l-f',       stage: 'f2lAdvanced', group: 'piecesInSlot',
    name: 'F2L 37',  context: CTX, solve: "R2 U2 F R2 F' U2 R' U R'" },
  { id: 'f2l-d-plus',  stage: 'f2lAdvanced', group: 'piecesInSlot',
    name: 'F2L 38', context: CTX, solve: "R U' R' U' R U R' U2 R U' R'" },
  { id: 'f2l-d-minus', stage: 'f2lAdvanced', group: 'piecesInSlot',
    name: 'F2L 39', context: CTX, solve: "R U' R' U R U2 R' U R U' R'" },
  { id: 'f2l-c-plus',  stage: 'f2lAdvanced', group: 'piecesInSlot',
    name: 'F2L 40', context: CTX, solve: "r U' r' U2 r U r' R U R'" },
  { id: 'f2l-c-minus', stage: 'f2lAdvanced', group: 'piecesInSlot',
    name: 'F2L 41', context: CTX, solve: "R U' R' r U' r' U2 r U r'" },
];

export const F2L_ADVANCED_GROUP_ORDER = [
  'disconnectedPairs',
  'connectedPairs',
  'cornerInSlot',
  'edgeInSlot',
  'piecesInSlot',
] as const;
