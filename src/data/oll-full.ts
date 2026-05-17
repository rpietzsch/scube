import { CaseData } from './types';

/**
 * Full OLL — all 57 last-layer orientation cases.
 *
 * Algorithms are canonical (speedsolving.com wiki / J. Perm standard).
 * Numbering follows the conventional OLL 1–57 layout. Cases 21–27 (OCLL)
 * overlap with the 2-Look OLL set but are kept independently here so users
 * see the full 57 in `ollFull`.
 */
export const OLL_FULL_CASES: CaseData[] = [
  // Dot cases (0 edges oriented) — OLL 1–4
  { id: 'oll-01', stage: 'ollFull', name: 'OLL 1 · Bunny',
    solve: "R U2 R2 F R F' U2 R' F R F'" },
  { id: 'oll-02', stage: 'ollFull', name: 'OLL 2 · Zamboni',
    solve: "F R U R' U' F' f R U R' U' f'" },
  { id: 'oll-03', stage: 'ollFull', name: 'OLL 3',
    solve: "f R U R' U' f' U' F R U R' U' F'" },
  { id: 'oll-04', stage: 'ollFull', name: 'OLL 4',
    solve: "f R U R' U' f' U F R U R' U' F'" },

  // Squares — OLL 5, 6
  { id: 'oll-05', stage: 'ollFull', name: 'OLL 5 · Right Square',
    solve: "l' U2 L U L' U l" },
  { id: 'oll-06', stage: 'ollFull', name: 'OLL 6 · Left Square',
    solve: "r U2 R' U' R U' r'" },

  // Small lightning bolts — OLL 7, 8
  { id: 'oll-07', stage: 'ollFull', name: 'OLL 7 · Sm. Lightning R',
    solve: "r U R' U R U2 r'" },
  { id: 'oll-08', stage: 'ollFull', name: 'OLL 8 · Sm. Lightning L',
    solve: "l' U' L U' L' U2 l" },

  // Fish — OLL 9, 10
  { id: 'oll-09', stage: 'ollFull', name: 'OLL 9 · Fish back',
    solve: "R U R' U' R' F R2 U R' U' F'" },
  { id: 'oll-10', stage: 'ollFull', name: 'OLL 10 · Fish front',
    solve: "R U R' U R' F R F' R U2 R'" },

  // Big lightning bolts — OLL 11, 12
  { id: 'oll-11', stage: 'ollFull', name: 'OLL 11 · Big Lightning R',
    solve: "r U R' U R' F R F' R U2 r'" },
  { id: 'oll-12', stage: 'ollFull', name: 'OLL 12 · Big Lightning L',
    solve: "F R U R' U' F' U F R U R' U' F'" },

  // Knight-move shapes — OLL 13–16
  { id: 'oll-13', stage: 'ollFull', name: 'OLL 13 · Knight 1',
    solve: "F U R U' R2 F' R U R U' R'" },
  { id: 'oll-14', stage: 'ollFull', name: 'OLL 14 · Knight 2',
    solve: "R' F R U R' F' R F U' F'" },
  { id: 'oll-15', stage: 'ollFull', name: 'OLL 15 · Knight 3',
    solve: "l' U' l L' U' L U l' U l" },
  { id: 'oll-16', stage: 'ollFull', name: 'OLL 16 · Knight 4',
    solve: "r U r' R U R' U' r U' r'" },

  // I-shape — OLL 17–20
  { id: 'oll-17', stage: 'ollFull', name: 'OLL 17',
    solve: "R U R' U R' F R F' U2 R' F R F'" },
  { id: 'oll-18', stage: 'ollFull', name: 'OLL 18 · Crown',
    solve: "F R U R' U y' R' U2 R' F R F'" },
  { id: 'oll-19', stage: 'ollFull', name: 'OLL 19',
    solve: "M U R U R' U' M' R' F R F'" },
  { id: 'oll-20', stage: 'ollFull', name: 'OLL 20 · Awkward',
    solve: "M U R U R' U' M2 U R U' r'" },

  // All edges oriented — OCLL — OLL 21–27 (overlaps with 2-Look OCLL)
  { id: 'oll-21', stage: 'ollFull', name: 'OLL 21 · H',          recognitionTagKeys: ['tags.opposites'],
    solve: "R U R' U R U' R' U R U2 R'" },
  { id: 'oll-22', stage: 'ollFull', name: 'OLL 22 · Pi',         recognitionTagKeys: ['tags.barTwoCorners'],
    solve: "R U2 R2 U' R2 U' R2 U2 R" },
  { id: 'oll-23', stage: 'ollFull', name: 'OLL 23 · U-bar',      recognitionTagKeys: ['tags.frontTwoCorners'],
    solve: "R2 D R' U2 R D' R' U2 R'" },
  { id: 'oll-24', stage: 'ollFull', name: 'OLL 24 · T',
    solve: "r U R' U' r' F R F'" },
  { id: 'oll-25', stage: 'ollFull', name: 'OLL 25 · Bowtie',     recognitionTagKeys: ['tags.diagonal'],
    solve: "F' r U R' U' r' F R" },
  { id: 'oll-26', stage: 'ollFull', name: 'OLL 26 · Anti-Sune',  recognitionTagKeys: ['tags.oneCornerOriented'],
    solve: "R U2 R' U' R U' R'" },
  { id: 'oll-27', stage: 'ollFull', name: 'OLL 27 · Sune',       recognitionTagKeys: ['tags.oneCornerOriented'],
    solve: "R U R' U R U2 R'" },

  // L-shape edges — OLL 28–32
  { id: 'oll-28', stage: 'ollFull', name: 'OLL 28',
    solve: "r U R' U' r' R U R U' R'" },
  { id: 'oll-29', stage: 'ollFull', name: 'OLL 29',
    solve: "R U R' U' R U' R' F' U' F R U R'" },
  { id: 'oll-30', stage: 'ollFull', name: 'OLL 30',
    solve: "F R' F R2 U' R' U' R U R' F2" },
  { id: 'oll-31', stage: 'ollFull', name: 'OLL 31',
    solve: "R' U' F U R U' R' F' R" },
  { id: 'oll-32', stage: 'ollFull', name: 'OLL 32',
    solve: "L U F' U' L' U L F L'" },

  // T-shape — OLL 33–34
  { id: 'oll-33', stage: 'ollFull', name: 'OLL 33 · T',          recognitionTagKeys: ['tags.adjacent'],
    solve: "R U R' U' R' F R F'" },
  { id: 'oll-34', stage: 'ollFull', name: 'OLL 34',
    solve: "R U R2 U' R' F R U R U' F'" },

  // Fish — OLL 35–37
  { id: 'oll-35', stage: 'ollFull', name: 'OLL 35',
    solve: "R U2 R2 F R F' R U2 R'" },
  { id: 'oll-36', stage: 'ollFull', name: 'OLL 36',
    solve: "L' U' L U' L' U L U L F' L' F" },
  { id: 'oll-37', stage: 'ollFull', name: 'OLL 37',
    solve: "F R' F' R U R U' R'" },

  // W-shape / lightning continued — OLL 38–39
  { id: 'oll-38', stage: 'ollFull', name: 'OLL 38',
    solve: "R U R' U R U' R' U' R' F R F'" },
  { id: 'oll-39', stage: 'ollFull', name: 'OLL 39',
    solve: "L F' L' U' L U F U' L'" },

  // Lightning / awkward — OLL 40–42
  { id: 'oll-40', stage: 'ollFull', name: 'OLL 40',
    solve: "R' F R U R' U' F' U R" },
  { id: 'oll-41', stage: 'ollFull', name: 'OLL 41',
    solve: "R U R' U R U2 R' F R U R' U' F'" },
  { id: 'oll-42', stage: 'ollFull', name: 'OLL 42',
    solve: "R' U' R U' R' U2 R F R U R' U' F'" },

  // P-shape — OLL 43–44 (and 45 is the EO Line)
  { id: 'oll-43', stage: 'ollFull', name: 'OLL 43',
    solve: "f' L' U' L U f" },
  { id: 'oll-44', stage: 'ollFull', name: 'OLL 44 · L-shape',    recognitionTagKeys: ['tags.lShape'],
    solve: "f R U R' U' f'" },
  { id: 'oll-45', stage: 'ollFull', name: 'OLL 45 · Line',       recognitionTagKeys: ['tags.lineHorizontal'],
    solve: "F R U R' U' F'" },

  // C-shape — OLL 46
  { id: 'oll-46', stage: 'ollFull', name: 'OLL 46',
    solve: "R' U' R' F R F' U R" },

  // L-shape OLLs continued — OLL 47–48
  { id: 'oll-47', stage: 'ollFull', name: 'OLL 47',
    solve: "F' L' U' L U L' U' L U F" },
  { id: 'oll-48', stage: 'ollFull', name: 'OLL 48',
    solve: "F R U R' U' R U R' U' F'" },

  // OLL 49–52
  { id: 'oll-49', stage: 'ollFull', name: 'OLL 49',
    solve: "R B' R2 F R2 B R2 F' R" },
  { id: 'oll-50', stage: 'ollFull', name: 'OLL 50',
    solve: "R' F R2 B' R2 F' R2 B R'" },
  { id: 'oll-51', stage: 'ollFull', name: 'OLL 51',
    solve: "F U R U' R' U R U' R' F'" },
  { id: 'oll-52', stage: 'ollFull', name: 'OLL 52',
    solve: "R U R' U R U' B U' B' R'" },

  // OLL 53–56
  { id: 'oll-53', stage: 'ollFull', name: 'OLL 53',
    solve: "l' U2 L U L' U' L U L' U l" },
  { id: 'oll-54', stage: 'ollFull', name: 'OLL 54',
    solve: "r U2 R' U' R U R' U' R U' r'" },
  { id: 'oll-55', stage: 'ollFull', name: 'OLL 55',
    solve: "R U2 R2 U' R U' R' U2 F R U R' U' F'" },
  { id: 'oll-56', stage: 'ollFull', name: 'OLL 56',
    solve: "r' U' r U' R' U R U' R' U R r' U r" },

  // EO dot — OLL 57 (just a non-OLL: the no-OLL case where edges are mixed in 4-bar pattern)
  { id: 'oll-57', stage: 'ollFull', name: 'OLL 57',
    solve: "R U R' U' M' U R U' r'" },
];
