import { CubeState, Face } from './types';

const COLORS: Record<Face, string> = {
  U: '#FDD835',
  D: '#FAFAFA',
  F: '#43A047',
  B: '#1E88E5',
  R: '#E53935',
  L: '#FB8C00',
};

interface FaceGridProps {
  state: CubeState;
  face: Face;
  x: number;
  y: number;
  cell: number;
}

const FACE_OFFSET: Record<Face, number> = { U: 0, R: 9, F: 18, D: 27, L: 36, B: 45 };

function FaceGrid({ state, face, x, y, cell }: FaceGridProps) {
  const base = FACE_OFFSET[face];
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = base + row * 3 + col;
      cells.push(
        <rect
          key={idx}
          x={x + col * cell}
          y={y + row * cell}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={COLORS[state[idx]]}
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
  className?: string;
}

/**
 * Unfolded net layout:
 *         U
 *     L   F   R   B
 *         D
 */
export function CubeNet({ state, cell = 24, className }: CubeNetProps) {
  const face = cell * 3;
  const gap = 2;
  const width = 4 * face + 3 * gap;
  const height = 3 * face + 2 * gap;
  const fx = face + gap; // F column x
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
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} />
      <FaceGrid state={state} face="L" x={lx} y={my} cell={cell} />
      <FaceGrid state={state} face="F" x={fx} y={my} cell={cell} />
      <FaceGrid state={state} face="R" x={rx} y={my} cell={cell} />
      <FaceGrid state={state} face="B" x={bx} y={my} cell={cell} />
      <FaceGrid state={state} face="D" x={fx} y={dy} cell={cell} />
    </svg>
  );
}

/**
 * Last-layer thumbnail: U face plus the three top-row stickers of F/R/B/L
 * shown as flaps around it. Used for OLL/PLL recognition thumbnails.
 */
export function LLThumbnail({ state, cell = 16 }: { state: CubeState; cell?: number }) {
  const face = cell * 3;
  const flap = cell;
  const w = face + 2 * flap + 8;
  const h = face + 2 * flap + 8;
  const ux = flap + 4;
  const uy = flap + 4;

  const sideRect = (sticker: Face, x: number, y: number, w: number, h: number, key: string) => (
    <rect key={key} x={x} y={y} width={w} height={h} fill={COLORS[sticker]} stroke="#0b1020" strokeWidth={1} rx={2} />
  );

  const stripFront = [state[18], state[19], state[20]]; // F top row
  const stripRight = [state[9], state[10], state[11]]; // R top row
  const stripBack = [state[45], state[46], state[47]]; // B top row
  const stripLeft = [state[36], state[37], state[38]]; // L top row

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label="Last layer">
      {/* Top (F strip) */}
      {stripFront.map((s, i) => sideRect(s, ux + i * cell, uy - flap, cell - 2, flap - 4, `f${i}`))}
      {/* Right (R strip) — drawn vertically to the right of U */}
      {stripRight.map((s, i) => sideRect(s, ux + face + 2, uy + i * cell, flap - 4, cell - 2, `r${i}`))}
      {/* Bottom (B strip — reversed) */}
      {stripBack.slice().reverse().map((s, i) => sideRect(s, ux + i * cell, uy + face + 2, cell - 2, flap - 4, `b${i}`))}
      {/* Left (L strip — reversed) */}
      {stripLeft.slice().reverse().map((s, i) => sideRect(s, ux - flap, uy + i * cell, flap - 4, cell - 2, `l${i}`))}
      {/* U face */}
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} />
    </svg>
  );
}
