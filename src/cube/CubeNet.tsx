import { CubeState, Face } from './types';

// Display convention matches cuberoot.me / most F2L reference sites: cross is
// built on YELLOW (D = yellow), with WHITE on top (U). This puts the cross
// face on the bottom of the unfolded net, where it visually belongs for F2L.
const COLORS: Record<Face, string> = {
  U: '#FAFAFA', // white (top)
  D: '#FDD835', // yellow (cross)
  F: '#43A047', // green
  B: '#1E88E5', // blue
  R: '#E53935', // red
  L: '#FB8C00', // orange
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
      //   in stage but not a moving-piece sticker → real colour at 0.5 (dimmed)
      //   part of a moving piece → real colour at 1.0
      const dim = lit && involved && !isInvolved;
      const fillColor = lit ? COLORS[state[idx]] : MUTED;
      const fillOpacity = lit ? (dim ? 0.5 : 1) : 0.55;

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
/**
 * LLThumbnail — last-layer diagram (top-down with 4 side flaps).
 *
 * `ollMode = true`: U face stickers are shown as the cross colour (white) if
 * oriented (state = 'U'), grey otherwise — matching the speedsolving wiki OLL
 * diagram convention. Side flaps keep actual colours for case recognition.
 *
 * Labels (topLeft/bottomRight) are rendered on every sticker that has an entry.
 */
export function LLThumbnail({
  state, cell = 16, highlight, involved, ollMode = false,
  topLeftLabels, bottomRightLabels,
}: {
  state: CubeState; cell?: number; highlight?: boolean[]; involved?: boolean[];
  ollMode?: boolean;
  topLeftLabels?: Record<number, string>;
  bottomRightLabels?: Record<number, string>;
}) {
  const face = cell * 3;
  const flap = cell;
  const w = face + 2 * flap + 8;
  const h = face + 2 * flap + 8;
  const ux = flap + 4;
  const uy = flap + 4;
  const GREY = '#4a5a6b';
  const fontSize = Math.max(7, Math.round(cell * 0.42));

  // ── Side flap rendering ───────────────────────────────────────────────────
  const stripIdx = (f: 'F' | 'R' | 'B' | 'L'): number[] =>
    f === 'F' ? [18, 19, 20] : f === 'R' ? [9, 10, 11] : f === 'B' ? [45, 46, 47] : [36, 37, 38];

  const drawFlap = (
    f: 'F' | 'R' | 'B' | 'L',
    positions: Array<[number, number, number, number]>,
    reverse = false,
  ) => {
    const idxs = reverse ? stripIdx(f).slice().reverse() : stripIdx(f);
    return idxs.map((i, k) => {
      const isInvolved = !!involved?.[i];
      const inStage = highlight ? highlight[i] : true;
      const lit = inStage || isInvolved;
      const dim = lit && !!involved && !isInvolved;
      // OLL: every sticker is either white (= U-colour) or neutral grey
      const fill = ollMode
        ? ((state[i] as Face) === 'U' ? COLORS.U : GREY)
        : lit ? COLORS[state[i] as Face] : MUTED;
      const opacity = ollMode ? 1 : lit ? (dim ? 0.5 : 1) : 0.55;
      const [rx, ry, rw, rh] = positions[k];
      const tlLabel = topLeftLabels?.[i];
      const brLabel = bottomRightLabels?.[i];
      return (
        <g key={`${f}${k}`}>
          <rect x={rx} y={ry} width={rw} height={rh} fill={fill} opacity={opacity}
                stroke="#0b1020" strokeWidth={1} rx={2} />
          {lit && tlLabel && (
            <text x={rx + rw / 2} y={ry + rh / 2 + fontSize * 0.35}
                  fontSize={fontSize * 0.9} fontWeight={700} fill="#fff" stroke="#000"
                  strokeWidth={1.8} paintOrder="stroke" textAnchor="middle"
                  style={{ pointerEvents: 'none' as const }}>{tlLabel}</text>
          )}
          {lit && brLabel && !tlLabel && (
            <text x={rx + rw / 2} y={ry + rh / 2 + fontSize * 0.35}
                  fontSize={fontSize * 0.9} fontWeight={700} fill="#fff" stroke="#000"
                  strokeWidth={1.8} paintOrder="stroke" textAnchor="middle"
                  style={{ pointerEvents: 'none' as const }}>{brLabel}</text>
          )}
        </g>
      );
    });
  };

  // ── U face rendering ──────────────────────────────────────────────────────
  const uStickers = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const isInvolved = !!involved?.[idx];
      const inStage = highlight ? highlight[idx] : true;

      let fill: string;
      let opacity = 1;
      if (ollMode) {
        // OLL: purely orientation-based — white = oriented, grey = not oriented.
        // `involved` only affects labels, never the fill colour on the U face.
        fill = (state[idx] as Face) === 'U' ? COLORS.U : GREY;
      } else {
        const lit = inStage || isInvolved;
        const dim = lit && !!involved && !isInvolved;
        fill = lit ? COLORS[state[idx] as Face] : MUTED;
        opacity = lit ? (dim ? 0.5 : 1) : 0.55;
      }

      const sx = ux + c * cell;
      const sy = uy + r * cell;
      const sw = cell - 2;
      const sh = cell - 2;
      const tlLabel = topLeftLabels?.[idx];
      const brLabel = bottomRightLabels?.[idx];
      uStickers.push(
        <g key={`u${idx}`}>
          <rect x={sx} y={sy} width={sw} height={sh} rx={3}
                fill={fill} opacity={opacity} stroke="#0b1020" strokeWidth={1.5} />
          {tlLabel && (
            <text x={sx + 2} y={sy + fontSize} fontSize={fontSize} fontWeight={700}
                  fill="#fff" stroke="#0b1020" strokeWidth={2.2} paintOrder="stroke"
                  style={{ pointerEvents: 'none' as const }}>{tlLabel}</text>
          )}
          {brLabel && (
            <text x={sx + sw - 2} y={sy + sh - 2} fontSize={fontSize} fontWeight={700}
                  fill="#fff" stroke="#0b1020" strokeWidth={2.2} paintOrder="stroke"
                  textAnchor="end" style={{ pointerEvents: 'none' as const }}>{brLabel}</text>
          )}
        </g>
      );
    }
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label="Last layer">
      {drawFlap('F', [
        [ux + 0 * cell, uy - flap, cell - 2, flap - 4],
        [ux + 1 * cell, uy - flap, cell - 2, flap - 4],
        [ux + 2 * cell, uy - flap, cell - 2, flap - 4],
      ])}
      {drawFlap('R', [
        [ux + face + 2, uy + 0 * cell, flap - 4, cell - 2],
        [ux + face + 2, uy + 1 * cell, flap - 4, cell - 2],
        [ux + face + 2, uy + 2 * cell, flap - 4, cell - 2],
      ])}
      {drawFlap('B', [
        [ux + 0 * cell, uy + face + 2, cell - 2, flap - 4],
        [ux + 1 * cell, uy + face + 2, cell - 2, flap - 4],
        [ux + 2 * cell, uy + face + 2, cell - 2, flap - 4],
      ], true)}
      {drawFlap('L', [
        [ux - flap, uy + 0 * cell, flap - 4, cell - 2],
        [ux - flap, uy + 1 * cell, flap - 4, cell - 2],
        [ux - flap, uy + 2 * cell, flap - 4, cell - 2],
      ], true)}
      {uStickers}
    </svg>
  );
}
