import { CubeState, SOLVED } from './types';
import { applyMove, Move } from './moves';

/** Stickers that differ from the reference state. Default reference = solved. */
export function diffMask(s: CubeState, reference: CubeState = SOLVED): boolean[] {
  return s.map((v, i) => v !== reference[i]);
}

export type StageKind = 'cross' | 'f2l' | 'oll' | 'pll';

/** Map a `Stage` (data type) to the visual stage kind. */
export function stageKindFor(stage: string): StageKind {
  if (stage === 'cross') return 'cross';
  if (stage === 'beginnerMiddle') return 'f2l';
  if (stage === 'beginnerTopOrientation') return 'oll';
  if (stage === 'beginnerTopPermutation') return 'pll';
  if (stage === 'rouxBlock1' || stage === 'rouxBlock2') return 'f2l';
  if (stage === 'rouxCmll') return 'oll';
  if (stage === 'rouxLse') return 'pll';
  if (stage.startsWith('f2l')) return 'f2l';
  if (stage.startsWith('oll')) return 'oll';
  if (stage.startsWith('pll')) return 'pll';
  return 'oll';
}

/**
 * Relevance mask per CFOP stage — which stickers belong to the part the
 * learner is currently working on. Stickers outside the mask render grey,
 * meaning "irrelevant or already settled". Follows the standard tutorial
 * conventions (J. Perm, Cubeskills, speedsolving.com wiki):
 *
 * - cross: D face + bottom row of side faces — the cross is built on D, so
 *          tutorials zoom the bottom of the cube; surrounding cubies appear
 *          but the upper layers are not part of the lesson
 * - f2l:   3D UFR-corner view → U, F, R faces fully visible; L, B and D
 *          entirely greyed out. This matches the standard F2L diagram and
 *          conveys "the algorithm works on this corner area; the rest of
 *          the cube doesn't change"
 * - oll/pll: last layer only — U face + top row of side faces (the classic
 *          LL flap-diagram). F2L below is already solved
 */
export function stageMask(kind: StageKind): boolean[] {
  const m = new Array<boolean>(54).fill(false);

  if (kind === 'cross') {
    // D face + bottom row of all four side faces
    for (let i = 27; i < 36; i++) m[i] = true;
    for (const base of [9, 18, 36, 45]) {
      m[base + 6] = m[base + 7] = m[base + 8] = true;
    }
    return m;
  }
  if (kind === 'f2l') {
    // U + R + F (the three faces visible from the UFR corner in a 3D view),
    // plus D[2] so the FR-slot's bottom (D-colour) sticker is also visible.
    // Without D[2] the target would show only 4 stickers while the source
    // shows 5 (the corner's U/F/R stickers in the top layer), which looks
    // asymmetric.
    for (let i = 0; i < 27; i++) m[i] = true;
    m[29] = true; // D[2]
    return m;
  }
  // oll | pll — last-layer focus
  for (let i = 0; i < 9; i++) m[i] = true;
  for (const base of [9, 18, 36, 45]) {
    m[base + 0] = m[base + 1] = m[base + 2] = true;
  }
  return m;
}

/** Stickers belonging to the last layer (U face + top row of F/R/B/L). */
export function lastLayerMask(): boolean[] {
  return stageMask('oll');
}

/**
 * F2L isometric context mask — sticker numbering 1–9 per face (row-major, 1=top-left):
 *
 *   F face (green): stickers 4,5,7,8  — rows 1–2, cols 0–1 → indices 21,22,24,25
 *     Stickers 6 and 9 are the actual slot positions on F; left to `involved`.
 *   R face (red):   stickers 5,6,8,9  — rows 1–2, cols 1–2 → indices 13,14,16,17
 *     Stickers 4 and 7 are the actual slot positions on R; left to `involved`.
 *   U[4] centre (white) — orientation reference
 *
 * Moving pieces override to full brightness via the `involved` prop in CubeIso.
 */
export function f2lContextMask(): boolean[] {
  const m = new Array<boolean>(54).fill(false);
  for (const i of [21, 22, 24, 25]) m[i] = true; // F face: stickers 4,5,7,8 (rows 1–2, cols 0–1)
  for (const i of [13, 14, 16, 17]) m[i] = true; // R face: stickers 5,6,8,9 (rows 1–2, cols 1–2)
  m[4] = true;                                     // U centre
  return m;
}

/** Combine two masks with logical OR. */
export function unionMask(a: boolean[], b: boolean[]): boolean[] {
  return a.map((v, i) => v || b[i]);
}

/** Stickers that move when the given move is applied (excluding centres). */
export function movedMask(stateBefore: CubeState, move: Move): boolean[] {
  const after = stateBefore.slice();
  applyMove(after, move);
  return diffMask(after, stateBefore);
}
