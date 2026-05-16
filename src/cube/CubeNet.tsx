import { CubeState, Face } from './types';

const COLORS: Record<Face, string> = {
  U: '#FDD835',
  D: '#FAFAFA',
  F: '#43A047',
  B: '#1E88E5',
  R: '#E53935',
  L: '#FB8C00',
};

const MUTED = '#2a3358'; // ink-700

const FACE_OFFSET: Record<Face, number> = { U: 0, R: 9, F: 18, D: 27, L: 36, B: 45 };

interface FaceGridProps {
  state: CubeState;
  face: Face;
  x: number;
  y: number;
  cell: number;
  highlight?: boolean[]; // length 54; if absent, every sticker is shown in full colour
}

function FaceGrid({ state, face, x, y, cell, highlight }: FaceGridProps) {
  const base = FACE_OFFSET[face];
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = base + row * 3 + col;
      const lit = highlight ? highlight[idx] : true;
      cells.push(
        <rect
          key={idx}
          x={x + col * cell}
          y={y + row * cell}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={lit ? COLORS[state[idx]] : MUTED}
          opacity={lit ? 1 : 0.55}
          stroke="#0b1020"
          strokeWidth={1.5}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}

interface CubeNetProps {
  state: CubeState;
  cell?: number;
  highlight?: boolean[];
  className?: string;
}

/**
 * Unfolded net layout:
 *         U
 *     L   F   R   B
 *         D
 */
export function CubeNet({ state, cell = 24, highlight, className }: CubeNetProps) {
  const face = cell * 3;
  const gap = 2;
  const width = 4 * face + 3 * gap;
  const height = 3 * face + 2 * gap;
  const fx = face + gap;
  const ux = fx;
  const lx = 0;
  const rx = fx + face + gap;
  const bx = rx + face + gap;
  const uy = 0;
  const my = face + gap;
  const dy = my + face + gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Cube state"
    >
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} highlight={highlight} />
      <FaceGrid state={state} face="L" x={lx} y={my} cell={cell} highlight={highlight} />
      <FaceGrid state={state} face="F" x={fx} y={my} cell={cell} highlight={highlight} />
      <FaceGrid state={state} face="R" x={rx} y={my} cell={cell} highlight={highlight} />
      <FaceGrid state={state} face="B" x={bx} y={my} cell={cell} highlight={highlight} />
      <FaceGrid state={state} face="D" x={fx} y={dy} cell={cell} highlight={highlight} />
    </svg>
  );
}

/**
 * Last-layer thumbnail: U face plus the three top-row stickers of F/R/B/L
 * shown as flaps around it. Used for OLL/PLL recognition thumbnails.
 */
export function LLThumbnail({ state, cell = 16, highlight }: { state: CubeState; cell?: number; highlight?: boolean[] }) {
  const face = cell * 3;
  const flap = cell;
  const w = face + 2 * flap + 8;
  const h = face + 2 * flap + 8;
  const ux = flap + 4;
  const uy = flap + 4;

  const sideRect = (sticker: Face, lit: boolean, x: number, y: number, w: number, h: number, key: string) => (
    <rect
      key={key}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={lit ? COLORS[sticker] : MUTED}
      opacity={lit ? 1 : 0.55}
      stroke="#0b1020"
      strokeWidth={1}
      rx={2}
    />
  );

  const stripIdx = (face: 'F' | 'R' | 'B' | 'L'): number[] =>
    face === 'F' ? [18, 19, 20] : face === 'R' ? [9, 10, 11] : face === 'B' ? [45, 46, 47] : [36, 37, 38];

  const draw = (face: 'F' | 'R' | 'B' | 'L', positions: Array<[number, number, number, number]>, reverse = false) => {
    const idxs = reverse ? stripIdx(face).slice().reverse() : stripIdx(face);
    return idxs.map((i, k) => {
      const lit = highlight ? highlight[i] : true;
      const [x, y, w, h] = positions[k];
      return sideRect(state[i] as Face, lit, x, y, w, h, `${face}${k}`);
    });
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label="Last layer">
      {draw('F', [
        [ux + 0 * cell, uy - flap, cell - 2, flap - 4],
        [ux + 1 * cell, uy - flap, cell - 2, flap - 4],
        [ux + 2 * cell, uy - flap, cell - 2, flap - 4],
      ])}
      {draw('R', [
        [ux + face + 2, uy + 0 * cell, flap - 4, cell - 2],
        [ux + face + 2, uy + 1 * cell, flap - 4, cell - 2],
        [ux + face + 2, uy + 2 * cell, flap - 4, cell - 2],
      ])}
      {draw('B', [
        [ux + 0 * cell, uy + face + 2, cell - 2, flap - 4],
        [ux + 1 * cell, uy + face + 2, cell - 2, flap - 4],
        [ux + 2 * cell, uy + face + 2, cell - 2, flap - 4],
      ], true)}
      {draw('L', [
        [ux - flap, uy + 0 * cell, flap - 4, cell - 2],
        [ux - flap, uy + 1 * cell, flap - 4, cell - 2],
        [ux - flap, uy + 2 * cell, flap - 4, cell - 2],
      ], true)}
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} highlight={highlight} />
    </svg>
  );
}
