import { CaseData } from './types';

/**
 * Advanced F2L — 42 cases visible from the cuberoot.me/alg/3x3/adv-f2l PDF
 * (page capture May 2026). 12 cases were cut off at page edges and are noted
 * as TODO: AF2L 4, 8, 13, 17, 21, 28, 32, 36, 40.
 *
 * Sections / groups:
 *   trappedCorner      — corner stuck in the FR slot, edge in U or also trapped
 *   trappedEdge        — edge stuck in the FR slot, corner in U or also trapped
 *   bothPiecesTrapped  — corner AND edge both stuck in the FR slot
 *
 * Primary alg: first non-rotation (no leading y/y'/x/x') alg listed by cuberoot.
 * Context = Sune state so the LL remains unsolved after the alg.
 *
 * Note: algs using Fw/Rw notation are normalised to f/r by the move parser.
 */
const CTX = "R U R' U R U2 R'";

export const F2L_EXPERT_CASES: CaseData[] = [

  // ============================================================
  // TRAPPED CORNER
  // ============================================================
  { id: 'af2l-1', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 1 · trapped corner', context: CTX,
    solve: "S R' S'" },
  { id: 'af2l-2', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 2 · trapped corner', context: CTX,
    solve: "L F' U2 F L'" },
  { id: 'af2l-3', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 3 · trapped corner', context: CTX,
    solve: "R U' R' U F' r U r'" },
  // AF2L 4 — cut off in PDF, TODO
  { id: 'af2l-5', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 5 · trapped corner', context: CTX,
    solve: "R U R' U L U L'" },
  { id: 'af2l-6', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 6 · trapped corner', context: CTX,
    solve: "R U R' F U F'" },
  { id: 'af2l-7', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 7 · trapped corner', context: CTX,
    solve: "U' F' U' f R S'" },
  // AF2L 8 — cut off in PDF, TODO
  { id: 'af2l-9', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 9 · trapped corner', context: CTX,
    solve: "U R' F R F' R' F R" },  // skip leading-y' first alg
  { id: 'af2l-1a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 1a · trapped corner', context: CTX,
    solve: "U2 R U' R' U R U' R'" },
  { id: 'af2l-2a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 2a · trapped corner', context: CTX,
    solve: "R' F R F' L U2 L'" },
  { id: 'af2l-4a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 4a · trapped corner', context: CTX,
    solve: "U R U R2 U2 R" },
  { id: 'af2l-5a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 5a · trapped corner', context: CTX,
    solve: "U L' U' F2 U L'" },  // skip leading-y first alg
  { id: 'af2l-6a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 6a · trapped corner', context: CTX,
    solve: "U R L' U L R'" },
  { id: 'af2l-8a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 8a · trapped corner', context: CTX,
    solve: "U2 R U' R' d L' U L" },
  { id: 'af2l-9a', stage: 'f2lExpert', group: 'trappedCorner',
    name: 'AF2L 9a · trapped corner', context: CTX,
    solve: "U2 R U' R' L' U L" },

  // ============================================================
  // TRAPPED EDGE
  // ============================================================
  { id: 'af2l-10', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 10 · trapped edge', context: CTX,
    solve: "U' R U R2 U' R" },
  { id: 'af2l-11', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 11 · trapped edge', context: CTX,
    solve: "U' R U' R' L U' L'" },
  { id: 'af2l-12', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 12 · trapped edge', context: CTX,
    solve: "U2 R U R' L' U L" },
  // AF2L 13 — cut off in PDF, TODO
  { id: 'af2l-14', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 14 · trapped edge', context: CTX,
    solve: "U' F R' F' R U L U L'" },
  { id: 'af2l-15', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 15 · trapped edge', context: CTX,
    solve: "U R' F R2 U' R U2 F'" },
  { id: 'af2l-16', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 16 · trapped edge', context: CTX,
    solve: "U' F' R' U R F" },
  // AF2L 17 — cut off in PDF, TODO
  { id: 'af2l-18', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 18 · trapped edge', context: CTX,
    solve: "U F' U2 F L' U' L" },
  { id: 'af2l-19', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 19 · trapped edge', context: CTX,
    solve: "U' R U2 R' f R f'" },
  { id: 'af2l-20', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 20 · trapped edge', context: CTX,
    solve: "U R U R' L U L'" },
  // AF2L 21 — cut off in PDF, TODO
  { id: 'af2l-22', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 22 · trapped edge', context: CTX,
    solve: "R U' R2 U R" },
  { id: 'af2l-23', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 23 · trapped edge', context: CTX,
    solve: "L F' U F L'" },
  { id: 'af2l-24', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 24 · trapped edge', context: CTX,
    solve: "R U' R' U2 L' U L" },
  { id: 'af2l-11a', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 11a · trapped edge', context: CTX,
    solve: "U' R U R' U' f' L' f" },  // skip leading-y' variant
  { id: 'af2l-12a', stage: 'f2lExpert', group: 'trappedEdge',
    name: 'AF2L 12a · trapped edge', context: CTX,
    solve: "U' R U' R' U2 F' r U r'" },

  // ============================================================
  // BOTH PIECES TRAPPED
  // ============================================================
  { id: 'af2l-25', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 25 · both trapped', context: CTX,
    solve: "F' U R' U2 R F" },
  { id: 'af2l-26', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 26 · both trapped', context: CTX,
    solve: "L R U2 R' L'" },
  { id: 'af2l-27', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 27 · both trapped', context: CTX,
    solve: "R' F R2 U R' F'" },
  // AF2L 28 — cut off in PDF, TODO
  { id: 'af2l-29', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 29 · both trapped', context: CTX,
    solve: "F' U L' U L U' L U L' F" },
  { id: 'af2l-30', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 30 · both trapped', context: CTX,
    solve: "R U' R' U' L U L U L' U' L" },
  { id: 'af2l-31', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 31 · both trapped', context: CTX,
    solve: "R U R' U' R U R' U' R U' R'" },
  // AF2L 32 — cut off in PDF, TODO
  { id: 'af2l-33', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 33 · both trapped', context: CTX,
    solve: "R U' R' U' L U' L' U' L U L" },
  { id: 'af2l-34', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 34 · both trapped', context: CTX,
    solve: "F' R U R U' R U' R F" },
  { id: 'af2l-35', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 35 · both trapped', context: CTX,
    solve: "R U' R' U R U' R' L U' L'" },
  // AF2L 36 — cut off in PDF, TODO
  { id: 'af2l-37', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 37 · both trapped', context: CTX,
    solve: "R U R' U2 R U' R' f R f'" },
  { id: 'af2l-38', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 38 · both trapped', context: CTX,
    solve: "R U' R' U R U2 R' L U2 L'" },
  { id: 'af2l-39', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 39 · both trapped', context: CTX,
    solve: "R U R' d L U' L' U L U L'" },
  // AF2L 40 — cut off in PDF, TODO
  { id: 'af2l-41', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 41 · both trapped', context: CTX,
    solve: "R U' R' d R' U2 R L' U L" },
  { id: 'af2l-42', stage: 'f2lExpert', group: 'bothPiecesTrapped',
    name: 'AF2L 42 · both trapped', context: CTX,
    solve: "R U' R' U2 L' U L U2 L' U L" },
];

export const F2L_EXPERT_GROUP_ORDER = [
  'trappedCorner',
  'trappedEdge',
  'bothPiecesTrapped',
] as const;
