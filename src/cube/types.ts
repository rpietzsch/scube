// 54-sticker cube state.
// Face order: U (0..8), R (9..17), F (18..26), D (27..35), L (36..44), B (45..53)
// Within a face, indices 0..8 read top-left to bottom-right when looking at that face.
export type Face = 'U' | 'R' | 'F' | 'D' | 'L' | 'B';
export const FACES: Face[] = ['U', 'R', 'F', 'D', 'L', 'B'];

export type Sticker = Face; // canonical sticker = its solved face
export type CubeState = Sticker[]; // length 54

export const SOLVED: CubeState = FACES.flatMap((f) => Array<Sticker>(9).fill(f));

export function clone(s: CubeState): CubeState {
  return s.slice();
}

export function equals(a: CubeState, b: CubeState): boolean {
  for (let i = 0; i < 54; i++) if (a[i] !== b[i]) return false;
  return true;
}
