import { CaseData } from './types';

/**
 * Full PLL — all 21 last-layer permutation cases.
 *
 * Algorithms are well-known canonical ones (speedsolving.com wiki / J. Perm).
 * Alternative ergonomic variants can be added later as additional ALGS entries.
 */
export const PLL_FULL_CASES: CaseData[] = [
  // Corner perms (1 piece cycle = identity is solved, so 5 corner cases)
  { id: 'pll-aa', stage: 'pllFull', name: 'Aa-perm', recognitionTagKeys: ['tags.threeCornerCycle'],
    solve: "x R' U R' D2 R U' R' D2 R2 x'" },
  { id: 'pll-ab', stage: 'pllFull', name: 'Ab-perm', recognitionTagKeys: ['tags.threeCornerCycle'],
    solve: "x R2 D2 R U R' D2 R U' R x'" },
  { id: 'pll-e',  stage: 'pllFull', name: 'E-perm',  recognitionTagKeys: ['tags.diagonalCornerSwap'],
    solve: "x' R U' R' D R U R' D' R U R' D R U' R' D' x" },

  // Edge perms (3 edge cases beyond 2-Look)
  { id: 'pll-ua', stage: 'pllFull', name: 'Ua-perm', recognitionTagKeys: ['tags.threeEdgeCycle'],
    solve: "M2 U M U2 M' U M2" },
  { id: 'pll-ub', stage: 'pllFull', name: 'Ub-perm', recognitionTagKeys: ['tags.threeEdgeCycle'],
    solve: "M2 U' M U2 M' U' M2" },
  { id: 'pll-h',  stage: 'pllFull', name: 'H-perm',  recognitionTagKeys: ['tags.oppositeEdgeSwap'],
    solve: "M2 U M2 U2 M2 U M2" },
  { id: 'pll-z',  stage: 'pllFull', name: 'Z-perm',  recognitionTagKeys: ['tags.adjacentEdgeSwap'],
    solve: "M2 U M2 U M' U2 M2 U2 M'" },

  // Corner-and-edge perms — G family (4)
  { id: 'pll-ga', stage: 'pllFull', name: 'Ga-perm',
    solve: "R2 U R' U R' U' R U' R2 U' D R' U R D'" },
  { id: 'pll-gb', stage: 'pllFull', name: 'Gb-perm',
    solve: "R' U' R U D' R2 U R' U R U' R U' R2 D" },
  { id: 'pll-gc', stage: 'pllFull', name: 'Gc-perm',
    solve: "R2 U' R U' R U R' U R2 U D' R U' R' D" },
  { id: 'pll-gd', stage: 'pllFull', name: 'Gd-perm',
    solve: "D R U R' U' D' R2 U' R U' R' U R' U R2" },

  // J-perms (2 — corner+edge swap)
  { id: 'pll-ja', stage: 'pllFull', name: 'Ja-perm',
    solve: "R' U L' U2 R U' R' U2 R L" },
  { id: 'pll-jb', stage: 'pllFull', name: 'Jb-perm',
    solve: "R U R' F' R U R' U' R' F R2 U' R'" },

  // N-perms (2 — diagonal corner swap + edges)
  { id: 'pll-na', stage: 'pllFull', name: 'Na-perm',
    solve: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'" },
  { id: 'pll-nb', stage: 'pllFull', name: 'Nb-perm',
    solve: "R' U R U' R' F' U' F R U R' F R' F' R U' R" },

  // R-perms (2)
  { id: 'pll-ra', stage: 'pllFull', name: 'Ra-perm',
    solve: "R U' R' U' R U R D R' U' R D' R' U2 R'" },
  { id: 'pll-rb', stage: 'pllFull', name: 'Rb-perm',
    solve: "R' U2 R U2 R' F R U R' U' R' F' R2" },

  // T, V, Y, F
  { id: 'pll-t',  stage: 'pllFull', name: 'T-perm',
    solve: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  { id: 'pll-v',  stage: 'pllFull', name: 'V-perm',
    solve: "R' U R' U' y R' F' R2 U' R' U R' F R F" },
  { id: 'pll-y',  stage: 'pllFull', name: 'Y-perm',
    solve: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  { id: 'pll-f',  stage: 'pllFull', name: 'F-perm',
    solve: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R" },
];
