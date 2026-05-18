import { CaseData } from './types';

/**
 * Advanced F2L — all 54 cases from cuberoot.me/alg/3x3/adv-f2l (PDF, May 2026).
 *
 * Sections:
 *   trappedCorner      (18) — AF2L 1–9  + AF2L 1a–9a
 *   trappedEdge        (18) — AF2L 10–24 + AF2L 10a–12a
 *   bothPiecesTrapped  (18) — AF2L 25–42
 *
 * Primary alg: first non-rotation alg (skipping algs starting with y/y'/x/x').
 * All Fw/Rw notation normalised to f/r by the parser.
 * Context = Sune state so the LL stays unsolved after the alg.
 */
const CTX = "R U R' U R U2 R'";

export const F2L_EXPERT_CASES: CaseData[] = [

  // ============================================================
  // TRAPPED CORNER (18 cases: AF2L 1–9 + AF2L 1a–9a)
  // ============================================================
  { id: 'af2l-1',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 1',  context: CTX, solve: "S R' S'" },
  { id: 'af2l-2',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 2',  context: CTX, solve: "L F' U2 F L'" },
  { id: 'af2l-3',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 3',  context: CTX, solve: "R U' R' U F' r U r'" },
  { id: 'af2l-4',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 4',  context: CTX, solve: "F R' F' R U R' U2 R" },
  { id: 'af2l-5',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 5',  context: CTX, solve: "R U R' U L U L'" },
  { id: 'af2l-6',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 6',  context: CTX, solve: "R U R' F U F'" },
  { id: 'af2l-7',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 7',  context: CTX, solve: "U' F' U' f R S'" },
  { id: 'af2l-8',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 8',  context: CTX, solve: "U' R' F R F' U2 L U L'" },
  { id: 'af2l-9',  stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 9',  context: CTX, solve: "U R' F' R F R' F' R" },  // skip leading y'
  { id: 'af2l-1a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 1a', context: CTX, solve: "U2 R U' R' U R U' R'" },
  { id: 'af2l-2a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 2a', context: CTX, solve: "R' F R F' L U2 L'" },
  { id: 'af2l-3a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 3a', context: CTX, solve: "R' F R2 U' R' U F'" },
  { id: 'af2l-4a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 4a', context: CTX, solve: "U R U2 R2 U R" },
  { id: 'af2l-5a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 5a', context: CTX, solve: "U l U' F2 U l'" },  // skip leading y
  { id: 'af2l-6a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 6a', context: CTX, solve: "U R L' U L R'" },
  { id: 'af2l-7a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 7a', context: CTX, solve: "R U2 R' U' R U' R'" },
  { id: 'af2l-8a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 8a', context: CTX, solve: "U2 R U' R' d L' U L" },
  { id: 'af2l-9a', stage: 'f2lExpert', group: 'trappedCorner', name: 'AF2L 9a', context: CTX, solve: "U2 R U' R' L' U L" },

  // ============================================================
  // TRAPPED EDGE (18 cases: AF2L 10–24 + AF2L 10a–12a)
  // ============================================================
  { id: 'af2l-10',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 10',  context: CTX, solve: "U' R U R2 U' R" },
  { id: 'af2l-11',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 11',  context: CTX, solve: "U' R U' R' L U' L'" },
  { id: 'af2l-12',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 12',  context: CTX, solve: "U' R U R2 F R U F'" },
  { id: 'af2l-13',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 13',  context: CTX, solve: "U R' F R F' R' U' R" },
  { id: 'af2l-14',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 14',  context: CTX, solve: "U R U' R' U R U' R' L U2 L'" },
  { id: 'af2l-15',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 15',  context: CTX, solve: "U R' F R2 U' R U2 F'" },
  { id: 'af2l-16',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 16',  context: CTX, solve: "U' F' R' U R F" },
  { id: 'af2l-17',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 17',  context: CTX, solve: "U' R U R' U' f' L' f" },  // skip leading y
  { id: 'af2l-18',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 18',  context: CTX, solve: "U r' F' D' F D r" },
  { id: 'af2l-19',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 19',  context: CTX, solve: "U' R U2 R' f R f'" },
  { id: 'af2l-20',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 20',  context: CTX, solve: "U R U R' L U L'" },
  { id: 'af2l-21',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 21',  context: CTX, solve: "U R F U F' R'" },
  { id: 'af2l-22',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 22',  context: CTX, solve: "R U' R2 U R" },
  { id: 'af2l-23',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 23',  context: CTX, solve: "L F' U F L'" },
  { id: 'af2l-24',  stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 24',  context: CTX, solve: "R U' R' U2 L' U L" },
  { id: 'af2l-10a', stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 10a', context: CTX, solve: "U' R U' R' U f R' f'" },
  { id: 'af2l-11a', stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 11a', context: CTX, solve: "U' R U R' U' f' L' f" },  // skip leading y'
  { id: 'af2l-12a', stage: 'f2lExpert', group: 'trappedEdge', name: 'AF2L 12a', context: CTX, solve: "U' R U' R' U2 F' r U r'" },

  // ============================================================
  // BOTH PIECES TRAPPED (18 cases: AF2L 25–42)
  // ============================================================
  { id: 'af2l-25', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 25', context: CTX, solve: "R' F R F' U' R' U2 R" },
  { id: 'af2l-26', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 26', context: CTX, solve: "R U' R' U2 L U L'" },
  { id: 'af2l-27', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 27', context: CTX, solve: "R' F R2 U R' F'" },
  { id: 'af2l-28', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 28', context: CTX, solve: "R U' R2 U' R U' R' U' R" },
  { id: 'af2l-29', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 29', context: CTX, solve: "F' U F L U L' U L' F' U' L U' F" },
  { id: 'af2l-30', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 30', context: CTX, solve: "R U' R' U' L U L U L' U' L" },
  { id: 'af2l-31', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 31', context: CTX, solve: "R U R' U' R U R' U' R U' R'" },
  { id: 'af2l-32', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 32', context: CTX, solve: "R U R' U R U R' f' L' f" },
  { id: 'af2l-33', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 33', context: CTX, solve: "R U' R' U' L U' L' U' L U L" },
  { id: 'af2l-34', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 34', context: CTX, solve: "R U' R' U R U' R' r' U' R U M'" },
  { id: 'af2l-35', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 35', context: CTX, solve: "R U' R' U R U' R' L U' L'" },
  { id: 'af2l-36', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 36', context: CTX, solve: "R' F R2 U' R' U' R U R' U2 F'" },
  { id: 'af2l-37', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 37', context: CTX, solve: "R U R' U2 R U' R' f R f'" },
  { id: 'af2l-38', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 38', context: CTX, solve: "R U' R' U L U2 L' U' L U' L'" },
  { id: 'af2l-39', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 39', context: CTX, solve: "R U R' d L U' L' U L U L'" },
  { id: 'af2l-40', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 40', context: CTX, solve: "R U' R2 U2 R U R' U2 R" },
  { id: 'af2l-41', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 41', context: CTX, solve: "R U' R' d R' U2 R L' U L" },
  { id: 'af2l-42', stage: 'f2lExpert', group: 'bothPiecesTrapped', name: 'AF2L 42', context: CTX, solve: "R U' R' U2 L' U L U2 L' U L" },
];

export const F2L_EXPERT_GROUP_ORDER = [
  'trappedCorner',
  'trappedEdge',
  'bothPiecesTrapped',
] as const;
