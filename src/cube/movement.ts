import { CubeState, clone } from './types';
import { applyAlg, Move } from './moves';

/**
 * Sticker indices that make up each piece slot.
 * Pieces are physical cubies: 8 corners (3 stickers each) and 12 edges (2 stickers each).
 */
export const CORNER_POSITIONS: number[][] = [
  [8, 20, 9],   // URF: U[8], F[2], R[0]
  [2, 11, 45],  // URB: U[2], R[2], B[0]
  [0, 36, 47],  // ULB: U[0], L[0], B[2]
  [6, 18, 38],  // ULF: U[6], F[0], L[2]
  [29, 26, 15], // DRF: D[2], F[8], R[6]
  [35, 17, 51], // DRB: D[8], R[8], B[6]
  [33, 44, 53], // DLB: D[6], L[8], B[8]
  [27, 24, 42], // DLF: D[0], F[6], L[6]
];

export const EDGE_POSITIONS: number[][] = [
  [7, 19],   // UF
  [5, 10],   // UR
  [1, 46],   // UB
  [3, 37],   // UL
  [23, 12],  // FR
  [21, 41],  // FL
  [48, 14],  // BR
  [50, 39],  // BL
  [28, 25],  // DF
  [31, 16],  // DR
  [34, 52],  // DB
  [30, 43],  // DL
];

function sortedJoin(xs: string[]): string {
  return xs.slice().sort().join('');
}

/** Find the slot whose stickers carry the given multiset of colours. */
function findPieceByColors(state: CubeState, colours: string[], slots: number[][]): number[] | null {
  const key = sortedJoin(colours);
  for (const slot of slots) {
    if (sortedJoin(slot.map((i) => state[i] as string)) === key) return slot;
  }
  return null;
}

export interface MovementMasks {
  source: boolean[]; // positions of pieces *about to move* (blue dashed)
  target: boolean[]; // positions where they will land (green dashed)
}

function emptyMasks(): MovementMasks {
  return { source: new Array<boolean>(54).fill(false), target: new Array<boolean>(54).fill(false) };
}

/**
 * F2L FR-slot specific: the "pair" is the DRF corner (colours D,F,R) and
 * the FR edge (colours F,R). Source = wherever they currently sit; target =
 * their canonical home positions in the FR slot.
 *
 * This focuses the visualisation on the pair — the U-layer shuffle around it
 * is left unmarked, which matches the way F2L tutorials annotate their
 * diagrams.
 */
export function f2lFrMovementMasks(state: CubeState): MovementMasks {
  const m = emptyMasks();

  const corner = findPieceByColors(state, ['D', 'F', 'R'], CORNER_POSITIONS);
  if (corner) for (const i of corner) m.source[i] = true;

  const edge = findPieceByColors(state, ['F', 'R'], EDGE_POSITIONS);
  if (edge) for (const i of edge) m.source[i] = true;

  // canonical FR slot: DRF corner (29,26,15) + FR edge (23,12)
  for (const i of [29, 26, 15, 23, 12]) m.target[i] = true;

  return m;
}

/**
 * F2L FR-slot specific: piece-label form. Two pieces always:
 *   1 = DRF corner (white/D + green/F + red/R)
 *   2 = FR edge   (green/F + red/R)
 * Sources = current positions in the cube; targets = canonical slot
 * positions. Suitable for the numbered-label visualisation used uniformly
 * across F2L / OLL / PLL.
 */
export function f2lFrPieces(state: CubeState): PieceLabel[] {
  const pieces: PieceLabel[] = [];
  const corner = findPieceByColors(state, ['D', 'F', 'R'], CORNER_POSITIONS);
  if (corner) pieces.push({ n: 1, sources: corner, targets: [29, 26, 15] });
  const edge = findPieceByColors(state, ['F', 'R'], EDGE_POSITIONS);
  if (edge) pieces.push({ n: 2, sources: edge, targets: [23, 12] });
  return pieces;
}

/**
 * Generic: for any algorithm, list the stickers whose piece moves. Source =
 * piece's BEFORE positions, target = AFTER positions. For cyclic permutations
 * (typical of cube algs) the two sets overlap heavily — that's expected.
 */
export function pieceMovementMasks(before: CubeState, alg: Move[]): MovementMasks {
  const m = emptyMasks();
  const after = clone(before);
  applyAlg(after, alg);

  for (const slots of [CORNER_POSITIONS, EDGE_POSITIONS]) {
    for (const pos of slots) {
      const colours = pos.map((i) => before[i] as string);
      // where does this piece end up?
      let dst: number[] | null = null;
      for (const aPos of slots) {
        if (sortedJoin(aPos.map((i) => after[i] as string)) === sortedJoin(colours)) {
          dst = aPos;
          break;
        }
      }
      if (!dst) continue;
      const samePos = pos.length === dst.length && pos.every((p, i) => p === dst![i]);
      const sameOri = pos.every((i) => before[i] === after[i]);
      if (samePos && sameOri) continue; // piece did not move
      for (const i of pos) m.source[i] = true;
      for (const i of dst) m.target[i] = true;
    }
  }

  return m;
}

/** Pick the right movement mask for a stage. */
export function movementMasksFor(state: CubeState, alg: Move[], stage: string): MovementMasks {
  if (stage.startsWith('f2l')) return f2lFrMovementMasks(state);
  return pieceMovementMasks(state, alg);
}

/**
 * Boolean mask of sticker positions that belong to a moving piece (either as
 * source or target). Used by CubeNet/LLThumbnail to keep these stickers at
 * full strength while dimming the rest. Returns `undefined` if no piece
 * moves (no dimming applied).
 */
export function involvedMaskFor(state: CubeState, alg: Move[], stage: string): boolean[] | undefined {
  const isF2L = stage.startsWith('f2l');
  const all = isF2L ? f2lFrPieces(state) : piecesThatMove(state, alg);
  const pieces =
    stage === 'beginnerFirstLayerCorners' || stage === 'beginnerMiddle'
      ? beginnerInsertPiece(all, stage)
      : all;
  if (pieces.length === 0) return undefined;
  const m = new Array<boolean>(54).fill(false);
  for (const p of pieces) {
    for (const i of p.sources) m[i] = true;
  }
  return m;
}

export interface PieceLabel {
  /** 1-indexed identifier shown on the cube. */
  n: number;
  /** Sticker indices the piece currently occupies. */
  sources: number[];
  /** Sticker indices it will occupy after the algorithm. */
  targets: number[];
}

/**
 * List the pieces that actually change (position or orientation) between
 * BEFORE and AFTER. Each piece gets a sequential numeric label so the
 * visualisation can show "1 lives here, 1′ lands there".
 */
export function piecesThatMove(before: CubeState, alg: Move[]): PieceLabel[] {
  const after = clone(before);
  applyAlg(after, alg);

  const pieces: PieceLabel[] = [];
  let n = 1;

  for (const slots of [CORNER_POSITIONS, EDGE_POSITIONS]) {
    for (const pos of slots) {
      const colours = pos.map((i) => before[i] as string);
      let dst: number[] | null = null;
      for (const aPos of slots) {
        if (sortedJoin(aPos.map((i) => after[i] as string)) === sortedJoin(colours)) {
          dst = aPos;
          break;
        }
      }
      if (!dst) continue;
      const samePos = pos.length === dst.length && pos.every((p, i) => p === dst![i]);
      const sameOri = pos.every((i) => before[i] === after[i]);
      if (samePos && sameOri) continue;

      pieces.push({ n, sources: pos.slice(), targets: dst.slice() });
      n++;
    }
  }
  return pieces;
}

/**
 * For beginner insert stages, filter the full `piecesThatMove` list to only
 * the single piece that lands in the target slot. Returns one PieceLabel
 * (re-numbered n=1) so only that piece lights up and gets labeled.
 *
 * - beginnerFirstLayerCorners: corner → DRF slot [29, 26, 15]
 * - beginnerMiddle:            edge   → FR slot [23, 12] or FL slot [21, 41]
 */
export function beginnerInsertPiece(pieces: PieceLabel[], stage: string): PieceLabel[] {
  const match = (targets: number[], set: Set<number>): boolean =>
    targets.length === set.size && targets.every((i) => set.has(i));

  let found: PieceLabel | undefined;
  if (stage === 'beginnerFirstLayerCorners') {
    const drf = new Set([29, 26, 15]);
    found = pieces.find((p) => match(p.targets, drf));
  } else if (stage === 'beginnerMiddle') {
    const fr = new Set([23, 12]);
    const fl = new Set([21, 41]);
    found = pieces.find((p) => match(p.targets, fr) || match(p.targets, fl));
  }
  if (!found) return [];
  return [{ n: 1, sources: found.sources, targets: found.targets }];
}

/**
 * For PLL-style visualisation: label *every* sticker of each piece so the
 * cycle is readable on the side flaps too, not just on the U-face. Source
 * stickers carry `n`, targets carry `n′`. A position can receive both when
 * it's source for one piece and target for another in a cycle.
 */
export function pieceLabelMaps(pieces: PieceLabel[]): {
  topLeft: Record<number, string>;
  bottomRight: Record<number, string>;
} {
  const topLeft: Record<number, string> = {};
  const bottomRight: Record<number, string> = {};

  for (const p of pieces) {
    for (const i of p.sources) topLeft[i] = `${p.n}`;
    for (const i of p.targets) bottomRight[i] = `${p.n}′`;
  }

  return { topLeft, bottomRight };
}
