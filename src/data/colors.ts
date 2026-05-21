export const FACE_HEX: Record<string, string> = {
  white:  '#FAFAFA',
  yellow: '#FDD835',
  green:  '#43A047',
  blue:   '#1E88E5',
  red:    '#E53935',
  orange: '#FB8C00',
};

export const ALL_COLORS = ['white', 'yellow', 'green', 'blue', 'red', 'orange'] as const;
export type CubeColor = typeof ALL_COLORS[number];

const OPPOSITE: Record<string, string> = {
  white: 'yellow', yellow: 'white',
  green: 'blue',   blue:   'green',
  red:   'orange', orange: 'red',
};

/** The four side faces when `top` is on the U face */
export function sideFaces(top: string): string[] {
  const bottom = OPPOSITE[top] ?? '';
  return ALL_COLORS.filter(c => c !== top && c !== bottom);
}

// ── Orientation computation ────────────────────────────────────────────────

// Base face layout for each top color (before any y-rotation), as [U,D,F,B,R,L].
// Derived from the standard orientation (white top, green front) by the minimal
// rotation that brings each color to U.
const BASES: Record<string, [string, string, string, string, string, string]> = {
  white:  ['white',  'yellow', 'green',  'blue',   'red',    'orange'], // identity
  yellow: ['yellow', 'white',  'blue',   'green',  'red',    'orange'], // x2
  green:  ['green',  'blue',   'yellow', 'white',  'red',    'orange'], // x
  blue:   ['blue',   'green',  'white',  'yellow', 'red',    'orange'], // x'
  red:    ['red',    'orange', 'green',  'blue',   'yellow', 'white' ], // z'
  orange: ['orange', 'red',    'green',  'blue',   'white',  'yellow'], // z
};

// y CW from above (same direction as a U turn): new F = old R
function applyY(f: [string,string,string,string,string,string]): [string,string,string,string,string,string] {
  const [U, D, F, B, R, L] = f;
  return [U, D, R, L, B, F];
}

/** Full face color assignment for a given top + front color. */
export function computeOrientation(top: string, front: string) {
  let faces = (BASES[top] ?? BASES.white) as [string,string,string,string,string,string];
  for (let i = 0; i < 4; i++) {
    if (faces[2] === front) break;
    faces = applyY(faces);
  }
  const [U, D, F, B, R, L] = faces;
  return { U, D, F, B, R, L };
}

/** Hex color map for the 6 faces given a top + front configuration. */
export function getCubeColors(top: string, front: string): Record<string, string> {
  const o = computeOrientation(top, front);
  return { U: FACE_HEX[o.U], D: FACE_HEX[o.D], F: FACE_HEX[o.F], B: FACE_HEX[o.B], R: FACE_HEX[o.R], L: FACE_HEX[o.L] };
}
