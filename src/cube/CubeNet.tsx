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
// Source/target borders use colours that are (a) complementary (~150° hue apart)
// and (b) far from any cube face colour, so neither blends with stickers nor
// each other.
const SOURCE_STROKE = '#f472b6'; // pink-400 — "moves from here"
const TARGET_STROKE = '#67e8f9'; // cyan-300 — "lands here"

const FACE_OFFSET: Record<Face, number> = { U: 0, R: 9, F: 18, D: 27, L: 36, B: 45 };

interface FaceGridProps {
  state: CubeState;
  face: Face;
  x: number;
  y: number;
  cell: number;
  highlight?: boolean[];
  source?: boolean[];
  target?: boolean[];
  /** Stickers that belong to a moving piece — these stay at full strength; other lit stickers are dimmed to 50%. */
  involved?: boolean[];
  topLeftLabels?: Record<number, string>;
  bottomRightLabels?: Record<number, string>;
}

function FaceGrid({ state, face, x, y, cell, highlight, source, target, involved, topLeftLabels, bottomRightLabels }: FaceGridProps) {
  const base = FACE_OFFSET[face];
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = base + row * 3 + col;
      const inStage = highlight ? highlight[idx] : true;
      const isInvolved = !!involved?.[idx];
      // A sticker that's part of a moving piece is always shown in full colour
      // even when it sits on a face the stage mask would otherwise grey out —
      // otherwise the third sticker of a corner that wanders onto the back
      // face would disappear together with its label.
      const lit = inStage || isInvolved;
      const sx = x + col * cell;
      const sy = y + row * cell;
      const sw = cell - 2;
      const sh = cell - 2;
      const isSrc = lit && source?.[idx];
      const isTgt = lit && target?.[idx];
      const tlLabel = lit ? topLeftLabels?.[idx] : undefined;
      const brLabel = lit ? bottomRightLabels?.[idx] : undefined;
      const fontSize = Math.max(8, Math.round(cell * 0.42));
      // Three-tier opacity:
      //   outside stage and not involved → MUTED grey, 0.55
      //   in stage but not a moving-piece sticker → real colour at 0.65 (slight dim)
      //   part of a moving piece → real colour at 1.0
      const dim = lit && involved && !isInvolved;
      const fillColor = lit ? COLORS[state[idx]] : MUTED;
      const fillOpacity = lit ? (dim ? 0.65 : 1) : 0.55;

      cells.push(
        <g key={idx}>
          <rect
            x={sx}
            y={sy}
            width={sw}
            height={sh}
            rx={3}
            fill={fillColor}
            opacity={fillOpacity}
            stroke="#0b1020"
            strokeWidth={1.5}
          />
          {isSrc && (
            <rect
              x={sx + 1.5}
              y={sy + 1.5}
              width={sw - 3}
              height={sh - 3}
              rx={2}
              fill="none"
              stroke={SOURCE_STROKE}
              strokeWidth={2.2}
              strokeDasharray="3 2"
            />
          )}
          {isTgt && (
            <rect
              x={sx + (isSrc ? 4.5 : 1.5)}
              y={sy + (isSrc ? 4.5 : 1.5)}
              width={sw - (isSrc ? 9 : 3)}
              height={sh - (isSrc ? 9 : 3)}
              rx={2}
              fill="none"
              stroke={TARGET_STROKE}
              strokeWidth={2.2}
              strokeDasharray="3 2"
            />
          )}
          {tlLabel && (
            <text
              x={sx + 2}
              y={sy + fontSize}
              fontSize={fontSize}
              fontWeight={700}
              fill="#ffffff"
              stroke="#0b1020"
              strokeWidth={2.2}
              paintOrder="stroke"
              style={{ pointerEvents: 'none' }}
            >
              {tlLabel}
            </text>
          )}
          {brLabel && (
            <text
              x={sx + sw - 2}
              y={sy + sh - 2}
              fontSize={fontSize}
              fontWeight={700}
              fill="#ffffff"
              stroke="#0b1020"
              strokeWidth={2.2}
              paintOrder="stroke"
              textAnchor="end"
              style={{ pointerEvents: 'none' }}
            >
              {brLabel}
            </text>
          )}
        </g>,
      );
    }
  }
  return <g>{cells}</g>;
}

interface CubeNetProps {
  state: CubeState;
  cell?: number;
  highlight?: boolean[];
  source?: boolean[];
  target?: boolean[];
  involved?: boolean[];
  topLeftLabels?: Record<number, string>;
  bottomRightLabels?: Record<number, string>;
  className?: string;
}

/**
 * Unfolded net layout:
 *         U
 *     L   F   R   B
 *         D
 */
export function CubeNet({ state, cell = 24, highlight, source, target, involved, topLeftLabels, bottomRightLabels, className }: CubeNetProps) {
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

  const props = { highlight, source, target, involved, topLeftLabels, bottomRightLabels };
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={className} role="img" aria-label="Cube state">
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} {...props} />
      <FaceGrid state={state} face="L" x={lx} y={my} cell={cell} {...props} />
      <FaceGrid state={state} face="F" x={fx} y={my} cell={cell} {...props} />
      <FaceGrid state={state} face="R" x={rx} y={my} cell={cell} {...props} />
      <FaceGrid state={state} face="B" x={bx} y={my} cell={cell} {...props} />
      <FaceGrid state={state} face="D" x={fx} y={dy} cell={cell} {...props} />
    </svg>
  );
}

/**
 * Last-layer thumbnail: U face plus the three top-row stickers of F/R/B/L
 * shown as flaps around it. Used for OLL/PLL recognition thumbnails.
 */
export function LLThumbnail({ state, cell = 16, highlight, involved }: { state: CubeState; cell?: number; highlight?: boolean[]; involved?: boolean[] }) {
  const face = cell * 3;
  const flap = cell;
  const w = face + 2 * flap + 8;
  const h = face + 2 * flap + 8;
  const ux = flap + 4;
  const uy = flap + 4;

  const sideRect = (sticker: Face, lit: boolean, dim: boolean, x: number, y: number, w: number, h: number, key: string) => (
    <rect
      key={key}
      x={x}
      y={y}
      width={w}
      height={h}
      fill={lit ? COLORS[sticker] : MUTED}
      opacity={lit ? (dim ? 0.65 : 1) : 0.55}
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
      const inStage = highlight ? highlight[i] : true;
      const isInvolved = !!involved?.[i];
      const lit = inStage || isInvolved;
      const dim = lit && !!involved && !isInvolved;
      const [x, y, w, h] = positions[k];
      return sideRect(state[i] as Face, lit, dim, x, y, w, h, `${face}${k}`);
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
      <FaceGrid state={state} face="U" x={ux} y={uy} cell={cell} involved={involved} />
    </svg>
  );
}
