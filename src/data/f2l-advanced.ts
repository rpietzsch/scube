import { CaseData } from './types';

/**
 * Advanced F2L — full case set, organised by the categories used on
 * speedsolving.com/wiki/First_Two_Layers:
 *
 *   - repositionEdge         (~4)
 *   - repositionEdgeFlipCorner (~9)
 *   - splitPairOver          (~4)
 *   - pairOnSide             (~4)
 *   - weird                  (~2)
 *   - cornerInPlaceEdgeUp    (~8)
 *   - edgeInPlaceCornerUp    (~6)
 *   - bothInPlace            (~5)
 *
 * Basic Inserts (F2L 1–4) live in `f2lIntuitive` per the wiki taxonomy — see
 * cases.ts. Numbering continues into advanced as F2L 7 … 48 (5–6 are the
 * intuitive shape examples).
 *
 * All cases target the FR slot so the F2L UFR-corner-view visualisation
 * stays consistent. Context is the Sune-like pre-OLL state so the result
 * shows F2L solved with the last layer still pending.
 */
const CTX = "R U R' U R U2 R'";

export const F2L_ADVANCED_CASES: CaseData[] = [
  // ============================================================
  // Reposition Edge — edge sits in U at the wrong slot,
  // corner ready; pair forms after a U adjust.
  // ============================================================
  { id: 'f2l-re-1', stage: 'f2lAdvanced', group: 'repositionEdge',
    name: 'F2L 7 · reposition · U',
    context: CTX, solve: "U R U2 R' U' R U R'" },
  { id: 'f2l-re-2', stage: 'f2lAdvanced', group: 'repositionEdge',
    name: "F2L 8 · reposition · U'",
    context: CTX, solve: "U' R U R' U R U' R'" },
  { id: 'f2l-re-3', stage: 'f2lAdvanced', group: 'repositionEdge',
    name: 'F2L 9 · reposition · U2',
    context: CTX, solve: "U2 R U R' U R U' R'" },
  { id: 'f2l-re-4', stage: 'f2lAdvanced', group: 'repositionEdge',
    name: 'F2L 10 · reposition · across',
    context: CTX, solve: "U R U' R' U' R U R'" },

  // ============================================================
  // Reposition Edge and Flip Corner — edge wrong AND corner needs
  // a re-orientation cycle; longer than basic inserts.
  // ============================================================
  { id: 'f2l-ref-1', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 11 · reposition + flip',
    context: CTX, solve: "R U' R' U F' U' F" },
  { id: 'f2l-ref-2', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 12 · reposition + flip',
    context: CTX, solve: "F' U F U' R U R'" },
  { id: 'f2l-ref-3', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 13 · reposition + flip',
    context: CTX, solve: "U R U R' U R U' R'" },
  { id: 'f2l-ref-4', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 14 · reposition + flip',
    context: CTX, solve: "U' R U' R' U R U R'" },
  { id: 'f2l-ref-5', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 15 · reposition + flip',
    context: CTX, solve: "U F' U F U' R U R'" },
  { id: 'f2l-ref-6', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 16 · reposition + flip',
    context: CTX, solve: "U F' U2 F U' R U R'" },
  { id: 'f2l-ref-7', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 17 · reposition + flip',
    context: CTX, solve: "U' R U' R' U R U' R'" },
  { id: 'f2l-ref-8', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 18 · reposition + flip',
    context: CTX, solve: "U2 F' U' F U' R U R'" },
  { id: 'f2l-ref-9', stage: 'f2lAdvanced', group: 'repositionEdgeFlipCorner',
    name: 'F2L 19 · reposition + flip',
    context: CTX, solve: "U R U R' U2 R U' R'" },

  // ============================================================
  // Split Pair by Going Over — pieces meet on the side via an
  // F/F'-style "going over" sequence (sledge/hedge).
  // ============================================================
  { id: 'f2l-sp-1', stage: 'f2lAdvanced', group: 'splitPairOver',
    name: 'F2L 20 · sledgehammer',
    recognitionTagKeys: ['tags.pairSplitTop'],
    context: CTX, solve: "F' U F U R U' R'" },
  { id: 'f2l-sp-2', stage: 'f2lAdvanced', group: 'splitPairOver',
    name: 'F2L 21 · hedgeslammer',
    recognitionTagKeys: ['tags.pairSplitTop'],
    context: CTX, solve: "R U' R' U F' U' F" },
  { id: 'f2l-sp-3', stage: 'f2lAdvanced', group: 'splitPairOver',
    name: 'U+ #33 · split · over',  // cuberoot.me exact-alg match
    context: CTX, solve: "U' R U' R' U2 R U' R'" },
  { id: 'f2l-sp-4', stage: 'f2lAdvanced', group: 'splitPairOver',
    name: 'F2L 23 · split · over',
    context: CTX, solve: "U' F' U F U2 R U R'" },

  // ============================================================
  // Pair Made on Side — pair forms at the L/R sides before the
  // final insert.
  // ============================================================
  { id: 'f2l-ps-1', stage: 'f2lAdvanced', group: 'pairOnSide',
    name: 'F2L 24 · pair on side',
    context: CTX, solve: "U F' U' F U' R U R'" },
  { id: 'f2l-ps-2', stage: 'f2lAdvanced', group: 'pairOnSide',
    name: 'Q+ #19 · pair on side',  // cuberoot.me exact-alg match
    context: CTX, solve: "U R U2 R' U R U' R'" },
  { id: 'f2l-ps-3', stage: 'f2lAdvanced', group: 'pairOnSide',
    name: 'F2L 26 · pair on side',
    context: CTX, solve: "F' U2 F U F' U' F" },
  { id: 'f2l-ps-4', stage: 'f2lAdvanced', group: 'pairOnSide',
    name: 'H+ #17 · pair on side',  // cuberoot.me exact-alg match
    context: CTX, solve: "R U2 R' U' R U R'" },

  // ============================================================
  // Weird — uncommon configurations that need setup moves before
  // the standard insert.
  // ============================================================
  { id: 'f2l-w-1', stage: 'f2lAdvanced', group: 'weird',
    name: 'F2L 28 · weird',
    context: CTX, solve: "R U' R' U2 F' U2 F" },
  { id: 'f2l-w-2', stage: 'f2lAdvanced', group: 'weird',
    name: 'F2L 29 · weird',
    context: CTX, solve: "R U2 R' U F' U' F" },

  // ============================================================
  // Corner in Place, Edge in U Face — corner correctly in the slot
  // (just oriented wrong), edge somewhere on top.
  // ============================================================
  { id: 'f2l-ce-1', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'J+ #27 · corner in slot',  // cuberoot.me exact-alg match
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: CTX, solve: "R U' R' U R U' R'" },
  { id: 'f2l-ce-2', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'L+ #30 · corner in slot',  // cuberoot.me exact-alg match
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: CTX, solve: "R U R' U' R U R'" },
  { id: 'f2l-ce-3', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 32 · corner in slot · edge top',
    context: CTX, solve: "R U2 R' U R U' R'" },
  { id: 'f2l-ce-4', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 33 · corner in slot · edge top',
    context: CTX, solve: "R U' R' U' R U R'" },
  { id: 'f2l-ce-5', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 34 · corner in slot · edge top',
    context: CTX, solve: "F' U F U R U R'" },
  { id: 'f2l-ce-6', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 35 · corner in slot · edge top',
    context: CTX, solve: "U R U2 R2 F R F'" },
  { id: 'f2l-ce-7', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 36 · corner in slot · edge top',
    context: CTX, solve: "R' F R F' R U' R'" },
  { id: 'f2l-ce-8', stage: 'f2lAdvanced', group: 'cornerInPlaceEdgeUp',
    name: 'F2L 37 · corner in slot · edge top',
    context: CTX, solve: "R U' R' U R U2 R'" },

  // ============================================================
  // Edge in Place, Corner in U Face
  // (f2l-ec-1 and f2l-ec-2 removed — exact duplicates of f2l-ce-2 and f2l-sp-3)
  // ============================================================
  { id: 'f2l-ec-3', stage: 'f2lAdvanced', group: 'edgeInPlaceCornerUp',
    name: 'F2L 40 · edge in slot · corner top',
    context: CTX, solve: "U R U R' U' R U R'" },
  { id: 'f2l-ec-4', stage: 'f2lAdvanced', group: 'edgeInPlaceCornerUp',
    name: 'F2L 41 · edge in slot · corner top',
    context: CTX, solve: "U F' U F R U' R'" },
  { id: 'f2l-ec-5', stage: 'f2lAdvanced', group: 'edgeInPlaceCornerUp',
    name: 'F2L 42 · edge in slot · corner top',
    context: CTX, solve: "R U2 R' U' R U' R'" },
  { id: 'f2l-ec-6', stage: 'f2lAdvanced', group: 'edgeInPlaceCornerUp',
    name: 'F2L 43 · edge in slot · corner top',
    context: CTX, solve: "F R' F' R U R U' R'" },

  // ============================================================
  // Edge and Corner both in Place — both pieces in slot but wrong;
  // requires extracting both then re-inserting as basic case.
  // ============================================================
  { id: 'f2l-bp-1', stage: 'f2lAdvanced', group: 'bothInPlace',
    name: 'F2L 44 · both in slot · wrong',
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: CTX, solve: "R U' R' U2 R U' R'" },
  { id: 'f2l-bp-2', stage: 'f2lAdvanced', group: 'bothInPlace',
    name: 'F2L 45 · both in slot · wrong',
    recognitionTagKeys: ['tags.pairStuckSlot'],
    context: CTX, solve: "R U R' U' R U R' U' R U R'" },
  { id: 'f2l-bp-3', stage: 'f2lAdvanced', group: 'bothInPlace',
    name: 'F2L 46 · both in slot · wrong',
    context: CTX, solve: "R U2 R' U2 R U' R'" },
  { id: 'f2l-bp-4', stage: 'f2lAdvanced', group: 'bothInPlace',
    name: 'F2L 47 · both in slot · wrong',
    context: CTX, solve: "F' U' F U R U R'" },
  { id: 'f2l-bp-5', stage: 'f2lAdvanced', group: 'bothInPlace',
    name: 'F2L 48 · both in slot · wrong',
    context: CTX, solve: "R U' R' U R U2 R' U R U' R'" },
];

/** Wiki-order rendering of the F2L Advanced groups (basic inserts live in intuitive). */
export const F2L_ADVANCED_GROUP_ORDER = [
  'repositionEdge',
  'repositionEdgeFlipCorner',
  'splitPairOver',
  'pairOnSide',
  'weird',
  'cornerInPlaceEdgeUp',
  'edgeInPlaceCornerUp',
  'bothInPlace',
] as const;
