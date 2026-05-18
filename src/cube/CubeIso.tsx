/**
 * CubeIso — isometric SVG cube view.
 *
 * Renders the cube from the upper-front-right corner, showing three faces:
 *   U (top), F (front-left in view), R (front-right in view)
 *
 * This matches the "3D corner view" used by cuberoot.me and speedsolving.com
 * wiki for case diagrams. The full unfolded net (CubeNet) is kept for the
 * animated step-through playback; this component is for the static case image.
 *
 * World coord system used here:
 *   x: 0=left, 3=right
 *   y: 0=bottom, 3=top
 *   z: 0=back,  3=front (toward viewer)
 *
 * The isometric projection:
 *   screen_x = (x − z) · cos30 · scale
 *   screen_y = ((x + z) · sin30 − y) · scale
 */

import { CubeState, Face } from './types';

const COS30 = Math.sqrt(3) / 2;
const SIN30 = 0.5;

const COLORS: Record<Face, string> = {
  U: '#FAFAFA', // white
  D: '#FDD835', // yellow (cross)
  F: '#43A047', // green
  B: '#1E88E5', // blue
  R: '#E53935', // red
  L: '#FB8C00', // orange
};
const MUTED = '#4a5a6b';   // medium grey — clearly visible against dark bg
const MUTED_ALPHA = 0.85;  // fully legible grey for non-involved stickers
// reserved for future source/target border rendering
// const SOURCE_STROKE = '#f472b6';
// const TARGET_STROKE = '#67e8f9';
const FACE_BG = '#131e35';        // dark face background

interface CubeIsoProps {
  state: CubeState;
  cell?: number;
  /** Stage-relevance mask — stickers outside it are muted (irrelevant). */
  highlight?: boolean[];
  /** Moving-piece mask — only these stickers are at full brightness. */
  involved?: boolean[];
  /** Piece-label maps (n = source, n′ = target). */
  topLeftLabels?: Record<number, string>;
  bottomRightLabels?: Record<number, string>;
}

// ---------- helpers ----------

function project(x: number, y: number, z: number, s: number): [number, number] {
  return [(x - z) * COS30 * s, ((x + z) * SIN30 - y) * s];
}

function polyStr(corners: [number, number, number][], s: number, ox: number, oy: number): string {
  return corners
    .map(([x, y, z]) => {
      const [px, py] = project(x, y, z, s);
      return `${(px + ox).toFixed(1)},${(py + oy).toFixed(1)}`;
    })
    .join(' ');
}

function centerPt(corners: [number, number, number][], s: number, ox: number, oy: number): [number, number] {
  const pts = corners.map(([x, y, z]) => project(x, y, z, s));
  const cx = pts.reduce((acc, p) => acc + p[0], 0) / pts.length + ox;
  const cy = pts.reduce((acc, p) => acc + p[1], 0) / pts.length + oy;
  return [cx, cy];
}

// ---------- component ----------

export function CubeIso({
  state,
  cell = 24,
  highlight,
  involved,
  topLeftLabels,
  bottomRightLabels,
}: CubeIsoProps) {
  const s = cell;
  const G = 0.08; // inset gap (world units) between stickers

  // Compute SVG bounding box from all 8 cube corners
  const cubeVerts: [number, number, number][] = [
    [0,0,0],[3,0,0],[0,3,0],[3,3,0],
    [0,0,3],[3,0,3],[0,3,3],[3,3,3],
  ];
  let mnX = Infinity, mxX = -Infinity, mnY = Infinity, mxY = -Infinity;
  for (const [x, y, z] of cubeVerts) {
    const [px, py] = project(x, y, z, s);
    mnX = Math.min(mnX, px); mxX = Math.max(mxX, px);
    mnY = Math.min(mnY, py); mxY = Math.max(mxY, py);
  }
  const pad = s * 0.5;
  const W = mxX - mnX + pad * 2;
  const H = mxY - mnY + pad * 2;
  const ox = -mnX + pad;  // offset so all projected coords are positive
  const oy = -mnY + pad;

  // Face backgrounds (drawn behind stickers)
  const bgU = polyStr([[0,3,0],[3,3,0],[3,3,3],[0,3,3]], s, ox, oy);
  const bgF = polyStr([[0,0,3],[3,0,3],[3,3,3],[0,3,3]], s, ox, oy);
  const bgR = polyStr([[3,0,0],[3,0,3],[3,3,3],[3,3,0]], s, ox, oy);

  // Sticker opacity / fill helpers
  // Three-tier rendering:
  //  1. involved (moving pieces)          → actual color, full brightness
  //  2. in-stage but not involved         → actual face color, dimmed (context)
  //  3. not in stage and not involved     → visible grey (no distraction)
  const fill = (idx: number): string => {
    if (involved?.[idx]) return COLORS[state[idx] as Face] ?? MUTED;
    const inStage = highlight ? highlight[idx] : true;
    return inStage ? (COLORS[state[idx] as Face] ?? MUTED) : MUTED;
  };
  const alpha = (idx: number): number => {
    if (involved?.[idx]) return 1;
    const inStage = highlight ? highlight[idx] : true;
    return inStage ? 0.45 : MUTED_ALPHA;
  };

  const fontSize = Math.max(7, Math.round(s * 0.38));

  type Sticker = {
    idx: number;
    corners: [number, number, number][];
    depth: number;
  };

  const stickers: Sticker[] = [];

  // ── U face ──  y = 3
  // Row r=0 → back (z=0..1), r=2 → front (z=2..3).  Col c=0 → left, c=2 → right.
  // Index: r*3 + c
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      stickers.push({
        idx: r * 3 + c,
        corners: [
          [c + G,   3, r + G  ],
          [c+1-G,   3, r + G  ],
          [c+1-G,   3, r+1-G  ],
          [c + G,   3, r+1-G  ],
        ],
        depth: (c + r),          // back stickers (small r,c) paint first
      });
    }
  }

  // ── F face ──  z = 3
  // Row r=0 → top (y=3..2), r=2 → bottom (y=1..0).  Col c=0 → left, c=2 → right.
  // Index: 18 + r*3 + c
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      stickers.push({
        idx: 18 + r * 3 + c,
        corners: [
          [c + G,   3 - r - G,   3],
          [c+1-G,   3 - r - G,   3],
          [c+1-G,   2 - r + G,   3],
          [c + G,   2 - r + G,   3],
        ],
        depth: 3 + r * 3 + c + 100, // F face renders after U
      });
    }
  }

  // ── R face ──  x = 3
  // Row r=0 → top (y=3..2), r=2 → bottom (y=1..0).
  // Col c=0 → front-side (z=2..3), c=2 → back-side (z=0..1).
  // Index: 9 + r*3 + c
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      stickers.push({
        idx: 9 + r * 3 + c,
        corners: [
          [3, 3 - r - G,   3 - c - G],
          [3, 3 - r - G,   2 - c + G],
          [3, 2 - r + G,   2 - c + G],
          [3, 2 - r + G,   3 - c - G],
        ],
        depth: 3 + r * 3 + c + 200, // R face renders after F
      });
    }
  }

  stickers.sort((a, b) => a.depth - b.depth);

  return (
    <svg
      viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`}
      width={W.toFixed(1)}
      height={H.toFixed(1)}
      style={{ display: 'block' }}
      role="img"
      aria-label="Cube state"
    >
      {/* Face backgrounds */}
      <polygon points={bgU} fill={FACE_BG} />
      <polygon points={bgF} fill={FACE_BG} />
      <polygon points={bgR} fill={FACE_BG} />

      {stickers.map(({ idx, corners }) => {
        const pts = polyStr(corners, s, ox, oy);
        const [cx, cy] = centerPt(corners, s, ox, oy);
        const tlLabel = topLeftLabels?.[idx];
        const brLabel = bottomRightLabels?.[idx];
        const lit = (highlight ? highlight[idx] : true) || !!involved?.[idx];

        return (
          <g key={idx}>
            <polygon
              points={pts}
              fill={fill(idx)}
              opacity={alpha(idx)}
              stroke="#0a0f1e"
              strokeWidth={0.8}
            />
            {lit && (tlLabel || brLabel) && (
              <>
                {tlLabel && (
                  <text
                    x={cx}
                    y={cy + fontSize * 0.35}
                    fontSize={fontSize}
                    fontWeight={700}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={1.8}
                    paintOrder="stroke"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none', userSelect: 'none' } as React.CSSProperties}
                  >
                    {tlLabel}
                  </text>
                )}
                {brLabel && !tlLabel && (
                  <text
                    x={cx}
                    y={cy + fontSize * 0.35}
                    fontSize={fontSize}
                    fontWeight={700}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={1.8}
                    paintOrder="stroke"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none', userSelect: 'none' } as React.CSSProperties}
                  >
                    {brLabel}
                  </text>
                )}
                {brLabel && tlLabel && (
                  <text
                    x={cx}
                    y={cy + fontSize * 0.35}
                    fontSize={fontSize * 0.8}
                    fontWeight={700}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={1.5}
                    paintOrder="stroke"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none', userSelect: 'none' } as React.CSSProperties}
                  >
                    {tlLabel}/{brLabel}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}

      {/* Cube outline edges */}
      {[
        [[0,3,0],[3,3,0]], [[3,3,0],[3,3,3]], [[3,3,3],[0,3,3]], [[0,3,3],[0,3,0]], // U perimeter
        [[0,3,3],[0,0,3]], [[3,3,3],[3,0,3]],  // F verticals
        [[0,0,3],[3,0,3]],                       // F bottom
        [[3,3,0],[3,3,3]],                       // shared UFR edge (already drawn)
        [[3,3,0],[3,0,0]], [[3,0,0],[3,0,3]],   // R edges
        [[3,0,3],[3,0,0]],                       // R bottom
      ].map(([a, b], i) => (
        <line
          key={i}
          x1={(project(...(a as [number,number,number]), s)[0] + ox).toFixed(1)}
          y1={(project(...(a as [number,number,number]), s)[1] + oy).toFixed(1)}
          x2={(project(...(b as [number,number,number]), s)[0] + ox).toFixed(1)}
          y2={(project(...(b as [number,number,number]), s)[1] + oy).toFixed(1)}
          stroke="#0a0f1e"
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}
