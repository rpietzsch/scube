import { CubeState, clone, SOLVED } from './types';

// Index helpers for a single face (0..8 within face f)
const U = 0, R = 9, F = 18, D = 27, L = 36, B = 45;

// Rotate the 9 stickers of one face 90° clockwise (viewed from outside).
function rotateFaceCW(s: CubeState, base: number) {
  const a = s[base + 0], b = s[base + 1], c = s[base + 2];
  const d = s[base + 3], f = s[base + 5];
  const g = s[base + 6], h = s[base + 7], i = s[base + 8];
  // new layout:
  // g d a
  // h _ b
  // i f c
  s[base + 0] = g; s[base + 1] = d; s[base + 2] = a;
  s[base + 3] = h; /* center fixed */ s[base + 5] = b;
  s[base + 6] = i; s[base + 7] = f; s[base + 8] = c;
}

// Apply a cycle of 4 sticker indices (a→b→c→d→a) clockwise.
function cycle4(s: CubeState, a: number, b: number, c: number, d: number) {
  const t = s[a];
  s[a] = s[d];
  s[d] = s[c];
  s[c] = s[b];
  s[b] = t;
}

// Apply three parallel 4-cycles for the four side-strips of a face turn.
function sideCycle(
  s: CubeState,
  // each strip is 3 sticker indices on a neighbouring face,
  // ordered so that strip1 → strip2 → strip3 → strip4 → strip1 is a clockwise turn
  s1: [number, number, number],
  s2: [number, number, number],
  s3: [number, number, number],
  s4: [number, number, number],
) {
  for (let k = 0; k < 3; k++) cycle4(s, s1[k], s2[k], s3[k], s4[k]);
}

// --- Quarter turns (CW, viewed from the named face) ---

export function turnU(s: CubeState) {
  rotateFaceCW(s, U);
  // F top row → L top row → B top row → R top row → F top row
  sideCycle(
    s,
    [F + 0, F + 1, F + 2],
    [L + 0, L + 1, L + 2],
    [B + 0, B + 1, B + 2],
    [R + 0, R + 1, R + 2],
  );
}

export function turnD(s: CubeState) {
  rotateFaceCW(s, D);
  // F bottom row → R bottom row → B bottom row → L bottom row → F bottom row
  sideCycle(
    s,
    [F + 6, F + 7, F + 8],
    [R + 6, R + 7, R + 8],
    [B + 6, B + 7, B + 8],
    [L + 6, L + 7, L + 8],
  );
}

export function turnR(s: CubeState) {
  rotateFaceCW(s, R);
  // U right col → B left col (reversed) → D right col → F right col → U right col
  // U: 2,5,8 ; F: 2,5,8 ; D: 2,5,8 ; B: 6,3,0 (because B is mirrored)
  sideCycle(
    s,
    [U + 2, U + 5, U + 8],
    [B + 6, B + 3, B + 0],
    [D + 2, D + 5, D + 8],
    [F + 2, F + 5, F + 8],
  );
}

export function turnL(s: CubeState) {
  rotateFaceCW(s, L);
  // U left col → F left col → D left col → B right col (reversed) → U left col
  sideCycle(
    s,
    [U + 0, U + 3, U + 6],
    [F + 0, F + 3, F + 6],
    [D + 0, D + 3, D + 6],
    [B + 8, B + 5, B + 2],
  );
}

export function turnF(s: CubeState) {
  rotateFaceCW(s, F);
  // U bottom row → R left col → D top row (reversed) → L right col (reversed) → U bottom row
  sideCycle(
    s,
    [U + 6, U + 7, U + 8],
    [R + 0, R + 3, R + 6],
    [D + 2, D + 1, D + 0],
    [L + 8, L + 5, L + 2],
  );
}

export function turnB(s: CubeState) {
  rotateFaceCW(s, B);
  // U top row → L left col (reversed) → D bottom row (reversed) → R right col → U top row
  sideCycle(
    s,
    [U + 2, U + 1, U + 0],
    [L + 0, L + 3, L + 6],
    [D + 6, D + 7, D + 8],
    [R + 8, R + 5, R + 2],
  );
}

const QUARTER: Record<string, (s: CubeState) => void> = {
  U: turnU, D: turnD, R: turnR, L: turnL, F: turnF, B: turnB,
};

// Whole-cube rotations: x (about R axis), y (about U axis), z (about F axis).
// A whole-cube rotation moves all three layers in the same direction. The
// middle slice cycle must match the direction of the outer faces (which we
// can verify by checking turnU/turnR's sideCycle: U turn moves F → L, R turn
// moves U → B).
export function rotateY(s: CubeState) {
  turnU(s);                           // U direction (CW from above, F → L)
  turnD(s); turnD(s); turnD(s);       // D' matches U direction
  // Middle slice: same direction as U turn → F → L → B → R → F.
  cycle4(s, F + 3, L + 3, B + 3, R + 3);
  cycle4(s, F + 4, L + 4, B + 4, R + 4);
  cycle4(s, F + 5, L + 5, B + 5, R + 5);
}

export function rotateX(s: CubeState) {
  turnR(s);                           // R direction (CW from R view, U → B)
  turnL(s); turnL(s); turnL(s);       // L' matches R direction
  // Middle slice (M slice between L and R): same direction as R → U → B → D → F → U.
  cycle4(s, U + 1, B + 7, D + 1, F + 1);
  cycle4(s, U + 4, B + 4, D + 4, F + 4);
  cycle4(s, U + 7, B + 1, D + 7, F + 7);
}

export function rotateZ(s: CubeState) {
  // z = F + B'
  turnF(s);
  turnB(s); turnB(s); turnB(s);
  // S slice between F and B; rotates with F
  // U mid row → R mid col → D mid row (rev) → L mid col (rev) → U mid row
  cycle4(s, U + 3, R + 1, D + 5, L + 7);
  cycle4(s, U + 4, R + 4, D + 4, L + 4);
  cycle4(s, U + 5, R + 7, D + 3, L + 1);
}

const ROTATE: Record<string, (s: CubeState) => void> = {
  x: rotateX, y: rotateY, z: rotateZ,
};

// Slice moves: M follows L, E follows D, S follows F.
function sliceM(s: CubeState) {
  cycle4(s, U + 1, F + 1, D + 1, B + 7);
  cycle4(s, U + 4, F + 4, D + 4, B + 4);
  cycle4(s, U + 7, F + 7, D + 7, B + 1);
}
function sliceE(s: CubeState) {
  // E follows D direction = F → R → B → L → F (from turnD's sideCycle).
  cycle4(s, F + 3, R + 3, B + 3, L + 3);
  cycle4(s, F + 4, R + 4, B + 4, L + 4);
  cycle4(s, F + 5, R + 5, B + 5, L + 5);
}
function sliceS(s: CubeState) {
  cycle4(s, U + 3, R + 1, D + 5, L + 7);
  cycle4(s, U + 4, R + 4, D + 4, L + 4);
  cycle4(s, U + 5, R + 7, D + 3, L + 1);
}

const SLICE: Record<string, (s: CubeState) => void> = {
  M: sliceM, E: sliceE, S: sliceS,
};

// --- Move execution ---
export interface Move {
  /** Base axis letter: U R F D L B, or x y z, or wide variants u r f d l b */
  base: string;
  /** +1 = CW quarter, -1 = CCW (prime), 2 = double */
  amount: 1 | -1 | 2;
}

function applyQuarter(s: CubeState, base: string) {
  if (QUARTER[base]) { QUARTER[base](s); return; }
  if (ROTATE[base]) { ROTATE[base](s); return; }
  if (SLICE[base]) { SLICE[base](s); return; }
  const upper = base.toUpperCase();
  if (QUARTER[upper] && upper !== base) {
    // wide turn (lowercase): face + adjacent slice in same direction
    QUARTER[upper](s);
    applySlice(s, base);
    return;
  }
  throw new Error(`Unknown move base: ${base}`);
}

function applySlice(s: CubeState, base: string) {
  // Wide-equivalent slice (the middle layer adjacent to the face). The slice
  // rotates in the *same* direction as the wide-turn's outer face.
  switch (base) {
    case 'u':
      // u = U face + adjacent slice in U direction (F → L → B → R → F).
      cycle4(s, F + 3, L + 3, B + 3, R + 3);
      cycle4(s, F + 4, L + 4, B + 4, R + 4);
      cycle4(s, F + 5, L + 5, B + 5, R + 5);
      return;
    case 'd':
      // d = D face + adjacent slice in D direction (F → R → B → L → F).
      cycle4(s, F + 3, R + 3, B + 3, L + 3);
      cycle4(s, F + 4, R + 4, B + 4, L + 4);
      cycle4(s, F + 5, R + 5, B + 5, L + 5);
      return;
    case 'r':
      // M' direction
      cycle4(s, U + 1, B + 7, D + 1, F + 1);
      cycle4(s, U + 4, B + 4, D + 4, F + 4);
      cycle4(s, U + 7, B + 1, D + 7, F + 7);
      return;
    case 'l':
      cycle4(s, U + 1, F + 1, D + 1, B + 7);
      cycle4(s, U + 4, F + 4, D + 4, B + 4);
      cycle4(s, U + 7, F + 7, D + 7, B + 1);
      return;
    case 'f':
      // S direction
      cycle4(s, U + 3, R + 1, D + 5, L + 7);
      cycle4(s, U + 4, R + 4, D + 4, L + 4);
      cycle4(s, U + 5, R + 7, D + 3, L + 1);
      return;
    case 'b':
      cycle4(s, U + 3, L + 7, D + 5, R + 1);
      cycle4(s, U + 4, L + 4, D + 4, R + 4);
      cycle4(s, U + 5, L + 1, D + 3, R + 7);
      return;
    default:
      throw new Error(`Unknown slice base: ${base}`);
  }
}

export function applyMove(s: CubeState, m: Move) {
  const n = m.amount === -1 ? 3 : m.amount === 2 ? 2 : 1;
  for (let i = 0; i < n; i++) applyQuarter(s, m.base);
}

export function applyAlg(s: CubeState, moves: Move[]) {
  for (const m of moves) applyMove(s, m);
}

export function applyAlgToSolved(moves: Move[]): CubeState {
  const s = clone(SOLVED);
  applyAlg(s, moves);
  return s;
}
