import { CaseData } from './types';

/**
 * Advanced F2L — representative cases for the FR slot.
 *
 * The standard speedcubing literature lists 41 named F2L cases; we ship a
 * starter set here (M6) that covers each of the main families — joined,
 * split, and pieces-in-slot — and leave the remainder for v1.x.
 *
 * All cases use the FR slot as the active slot, which keeps them compatible
 * with the F2L visualisation (UFR-corner view + DRF/FR slot focus). The
 * context is set to a typical post-F2L state (a Sune-like OLL) so the
 * result still shows an unsolved last layer.
 */
const CTX = "R U R' U R U2 R'"; // shared "pre-OLL" context

export const F2L_ADVANCED_CASES: CaseData[] = [
  // Pair joined in top, slot empty.
  { id: 'f2l-a-01', stage: 'f2lAdvanced', name: 'F2L · joined, insert front',
    recognitionTagKeys: ['tags.pairJoinedTop'], context: CTX, solve: "U R U' R'" },
  { id: 'f2l-a-02', stage: 'f2lAdvanced', name: 'F2L · joined, insert back',
    recognitionTagKeys: ['tags.pairJoinedTop'], context: CTX, solve: "y' U' R' U R" },
  { id: 'f2l-a-03', stage: 'f2lAdvanced', name: 'F2L · joined mirror',
    recognitionTagKeys: ['tags.pairJoinedTop'], context: CTX, solve: "U' L' U L" },

  // Pair split in top.
  { id: 'f2l-a-04', stage: 'f2lAdvanced', name: 'F2L · split, sledgehammer',
    recognitionTagKeys: ['tags.pairSplitTop'], context: CTX, solve: "F' U F U R U' R'" },
  { id: 'f2l-a-05', stage: 'f2lAdvanced', name: 'F2L · split, hedgeslammer',
    recognitionTagKeys: ['tags.pairSplitTop'], context: CTX, solve: "R U' R' U F' U' F" },

  // Pair stuck in the slot (one piece in slot, wrong; other in top).
  { id: 'f2l-a-06', stage: 'f2lAdvanced', name: 'F2L · stuck corner, edge top',
    recognitionTagKeys: ['tags.pairStuckSlot'], context: CTX, solve: "R U' R' U R U' R'" },
  { id: 'f2l-a-07', stage: 'f2lAdvanced', name: 'F2L · stuck edge, corner top',
    recognitionTagKeys: ['tags.pairStuckSlot'], context: CTX, solve: "R U R' U' R U R'" },
  { id: 'f2l-a-08', stage: 'f2lAdvanced', name: 'F2L · pair in slot, wrong',
    recognitionTagKeys: ['tags.pairStuckSlot'], context: CTX, solve: "R U' R' U2 R U' R'" },
];
