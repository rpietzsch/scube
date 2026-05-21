import type { Move } from './moves';
import { formatMove } from './parser';

// SVG constants — 80×80 viewBox, 48×48 grid at (16,16)
const G = 16;
const CS = 16;
const GS = CS * 3; // 48
const CX = G + GS / 2; // 40 — horizontal center
const CY = G + GS / 2; // 40 — vertical center
const AH = 5; // arrowhead half-size

const MOVE_DESC: Record<string, string> = {
  U: 'top', D: 'bottom', R: 'right', L: 'left',
  F: 'front', B: 'back', E: 'equator', M: 'mid vert.',
  S: 'standing', X: 'x-axis', Y: 'y-axis', Z: 'z-axis',
  u: 'top wide', d: 'bottom wide', r: 'right wide', l: 'left wide',
  f: 'front wide', b: 'back wide',
};

function arrowHeadPts(tx: number, ty: number, dx: number, dy: number): string {
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  const nx = -uy, ny = ux;
  const bx = tx - ux * AH, by = ty - uy * AH;
  return `${bx + nx * AH * 0.5},${by + ny * AH * 0.5} ${tx},${ty} ${bx - nx * AH * 0.5},${by - ny * AH * 0.5}`;
}

function SingleArrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polyline points={arrowHeadPts(x2, y2, x2 - x1, y2 - y1)} fill="none" />
    </>
  );
}

// Two sequential arrows along the direction of motion — for half-turns (×2).
// The span is split in half with a gap in the middle so the two moves read
// one after the other rather than side by side.
const SEQ_GAP = 10;
const SEQ_A = G + GS / 2 - SEQ_GAP / 2; // = 35  inner edge of gap
const SEQ_B = G + GS / 2 + SEQ_GAP / 2; // = 45  outer edge of gap

function TwiceH({ y, leftward }: { y: number; leftward: boolean }) {
  return leftward ? (
    <>
      <SingleArrow x1={G + GS} y1={y} x2={SEQ_B}  y2={y} />
      <SingleArrow x1={SEQ_A}  y1={y} x2={G}      y2={y} />
    </>
  ) : (
    <>
      <SingleArrow x1={G}     y1={y} x2={SEQ_A}  y2={y} />
      <SingleArrow x1={SEQ_B} y1={y} x2={G + GS} y2={y} />
    </>
  );
}

function TwiceV({ x, upward }: { x: number; upward: boolean }) {
  return upward ? (
    <>
      <SingleArrow x1={x} y1={G + GS} x2={x} y2={SEQ_B} />
      <SingleArrow x1={x} y1={SEQ_A}  x2={x} y2={G}     />
    </>
  ) : (
    <>
      <SingleArrow x1={x} y1={G}     x2={x} y2={SEQ_A}  />
      <SingleArrow x1={x} y1={SEQ_B} x2={x} y2={G + GS} />
    </>
  );
}

function ArcArrow({ cw, r, cx = CX, cy = CY }: { cw: boolean; r: number; cx?: number; cy?: number }) {
  const dir = cw ? 1 : -1;
  const sa = -Math.PI / 2;
  const sw = Math.PI * 1.5;
  const ea = sa + dir * sw;
  const x1 = cx + r * Math.cos(sa);
  const y1 = cy + r * Math.sin(sa);
  const x2 = cx + r * Math.cos(ea);
  const y2 = cy + r * Math.sin(ea);
  const d = `M ${x1} ${y1} A ${r} ${r} 0 1 ${cw ? 1 : 0} ${x2} ${y2}`;
  const tang = ea + dir * (Math.PI / 2);
  const tang2 = tang;
  const phx = x2 - AH * 1.2 * Math.cos(tang2);
  const phy = y2 - AH * 1.2 * Math.sin(tang2);
  return (
    <>
      <path d={d} fill="none" />
      <polyline points={arrowHeadPts(x2, y2, x2 - phx, y2 - phy)} fill="none" />
    </>
  );
}

// Highlighted rect [x, y, w, h] showing which layer(s) a move affects
const LAYER_RECT: Record<string, [number, number, number, number]> = {
  // Single face moves — 1 layer
  U: [G,          G,          GS,     CS    ], // top row
  D: [G,          G + CS * 2, GS,     CS    ], // bottom row
  R: [G + CS * 2, G,          CS,     GS    ], // right column
  L: [G,          G,          CS,     GS    ], // left column
  F: [G,          G,          GS,     GS    ], // whole face (depth = full grid)
  B: [G,          G,          GS,     GS    ],
  // Slice moves — 1 middle layer
  M: [G + CS,     G,          CS,     GS    ], // centre column
  E: [G,          G + CS,     GS,     CS    ], // centre row
  S: [G,          G,          GS,     GS    ], // standing (like F)
  // Wide moves — 2 layers
  u: [G,          G,          GS,     CS * 2],
  d: [G,          G + CS,     GS,     CS * 2],
  r: [G + CS,     G,          CS * 2, GS    ],
  l: [G,          G,          CS * 2, GS    ],
  f: [G,          G,          GS,     GS    ],
  b: [G,          G,          GS,     GS    ],
  // Whole-cube rotations — all 3 layers
  x: [G, G, GS, GS],
  y: [G, G, GS, GS],
  z: [G, G, GS, GS],
};

// Centre of the highlighted strip — arrows live here instead of outside the grid
function stripY(base: string): number {
  const lr = LAYER_RECT[base];
  return lr ? lr[1] + lr[3] / 2 : CY;
}
function stripX(base: string): number {
  const lr = LAYER_RECT[base];
  return lr ? lr[0] + lr[2] / 2 : CX;
}

function GridLines({ moveBase }: { moveBase?: string }) {
  const lines = Array.from({ length: 4 }, (_, i) => [
    <line key={`h${i}`} x1={G} y1={G + i * CS} x2={G + GS} y2={G + i * CS} />,
    <line key={`v${i}`} x1={G + i * CS} y1={G} x2={G + i * CS} y2={G + GS} />,
  ]).flat();
  const lr = moveBase ? LAYER_RECT[moveBase] ?? LAYER_RECT[moveBase.toUpperCase()] : null;
  return (
    <>
      <g strokeWidth={0.75} opacity={0.35}>{lines}</g>
      {lr && (
        <rect x={lr[0]} y={lr[1]} width={lr[2]} height={lr[3]}
          fill="currentColor" fillOpacity={0.07}
          strokeWidth={1.5} strokeDasharray="3 2" opacity={0.7} rx={1} />
      )}
    </>
  );
}

function MoveArrows({ move }: { move: Move }) {
  const upper = move.base.toUpperCase();
  const ccw = move.amount === -1;
  const half = move.amount === 2;

  // E follows D: CW = → (right), CCW = ←
  const hArrow = (y: number) => half
    ? <TwiceH y={y} leftward={false} />
    : ccw
      ? <SingleArrow x1={G + GS} y1={y} x2={G}       y2={y} />  // E' CCW = ←
      : <SingleArrow x1={G}       y1={y} x2={G + GS} y2={y} />; // E  CW  = →

  // M follows L: CW = ↓ (down), CCW = ↑
  const vArrow = (x: number) => half
    ? <TwiceV x={x} upward={false} />
    : ccw
      ? <SingleArrow x1={x} y1={G + GS} x2={x} y2={G}       />  // M' CCW = ↑
      : <SingleArrow x1={x} y1={G}       x2={x} y2={G + GS} />; // M  CW  = ↓

  switch (upper) {
    // U: CW from top = front row goes left (←)
    case 'U': { const y = stripY(move.base); return half
      ? <TwiceH y={y} leftward={true} />
      : ccw
        ? <SingleArrow x1={G}       y1={y} x2={G + GS} y2={y} />   // U': →
        : <SingleArrow x1={G + GS}  y1={y} x2={G}      y2={y} />; } // U: ←

    // D: CW from bottom = front row goes right (→)
    case 'D': { const y = stripY(move.base); return half
      ? <TwiceH y={y} leftward={false} />
      : ccw
        ? <SingleArrow x1={G + GS}  y1={y} x2={G}      y2={y} />   // D': ←
        : <SingleArrow x1={G}       y1={y} x2={G + GS} y2={y} />; } // D: →

    // R: CW from right = right column goes up (↑)
    case 'R': { const x = stripX(move.base); return half
      ? <TwiceV x={x} upward={true} />
      : ccw
        ? <SingleArrow x1={x} y1={G}       x2={x} y2={G + GS} />   // R': ↓
        : <SingleArrow x1={x} y1={G + GS}  x2={x} y2={G}      />; } // R: ↑

    // L: CW from left = left column goes down (↓)
    case 'L': { const x = stripX(move.base); return half
      ? <TwiceV x={x} upward={false} />
      : ccw
        ? <SingleArrow x1={x} y1={G + GS}  x2={x} y2={G}      />   // L': ↑
        : <SingleArrow x1={x} y1={G}       x2={x} y2={G + GS} />; } // L: ↓

    // F/S: face or standing slice, curved CW/CCW
    case 'F':
    case 'S': return half ? (
      <>
        <ArcArrow cw={true} r={GS * 0.20} />
        <ArcArrow cw={true} r={GS * 0.34} />
      </>
    ) : <ArcArrow cw={!ccw} r={GS * 0.32} />;

    // B: CW from back = CCW visually from front
    case 'B': return half ? (
      <>
        <ArcArrow cw={false} r={GS * 0.20} />
        <ArcArrow cw={false} r={GS * 0.34} />
      </>
    ) : <ArcArrow cw={ccw} r={GS * 0.32} />;

    // E follows D direction: equator goes right (→)
    case 'E': return hArrow(CY);

    // M follows L direction: middle col goes down (↓)
    case 'M': return vArrow(CX);

    // y = full cube in U direction: all three rows ←
    case 'Y': return half ? (
      <>
        <TwiceH y={G + CS * 0.5} leftward={true} />
        <TwiceH y={CY}           leftward={true} />
        <TwiceH y={G + CS * 2.5} leftward={true} />
      </>
    ) : ccw ? (
      <>
        <SingleArrow x1={G} y1={G + CS * 0.5} x2={G + GS} y2={G + CS * 0.5} />
        <SingleArrow x1={G} y1={CY} x2={G + GS} y2={CY} />
        <SingleArrow x1={G} y1={G + CS * 2.5} x2={G + GS} y2={G + CS * 2.5} />
      </>
    ) : (
      <>
        <SingleArrow x1={G + GS} y1={G + CS * 0.5} x2={G} y2={G + CS * 0.5} />
        <SingleArrow x1={G + GS} y1={CY} x2={G} y2={CY} />
        <SingleArrow x1={G + GS} y1={G + CS * 2.5} x2={G} y2={G + CS * 2.5} />
      </>
    );

    // x = full cube in R direction: all three columns ↑
    case 'X': return half ? (
      <>
        <TwiceV x={G + CS * 0.5} upward={true} />
        <TwiceV x={CX}           upward={true} />
        <TwiceV x={G + CS * 2.5} upward={true} />
      </>
    ) : ccw ? (
      <>
        <SingleArrow x1={G + CS * 0.5} y1={G} x2={G + CS * 0.5} y2={G + GS} />
        <SingleArrow x1={CX} y1={G} x2={CX} y2={G + GS} />
        <SingleArrow x1={G + CS * 2.5} y1={G} x2={G + CS * 2.5} y2={G + GS} />
      </>
    ) : (
      <>
        <SingleArrow x1={G + CS * 0.5} y1={G + GS} x2={G + CS * 0.5} y2={G} />
        <SingleArrow x1={CX} y1={G + GS} x2={CX} y2={G} />
        <SingleArrow x1={G + CS * 2.5} y1={G + GS} x2={G + CS * 2.5} y2={G} />
      </>
    );

    // z = full cube in F direction: large curved
    case 'Z': return half ? (
      <>
        <ArcArrow cw={true} r={GS * 0.24} />
        <ArcArrow cw={true} r={GS * 0.40} />
      </>
    ) : <ArcArrow cw={!ccw} r={GS * 0.4} />;

    default: return null;
  }
}

interface MoveGuideCellProps {
  move: Move;
  size?: number;
}

export function MoveGuideCell({ move, size = 64 }: MoveGuideCellProps) {
  const label = formatMove(move);
  const upper = move.base.toUpperCase();
  const desc = MOVE_DESC[move.base] ?? MOVE_DESC[upper] ?? '';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        aria-label={label}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <GridLines moveBase={move.base} />
        <g strokeWidth={2.5}>
          <MoveArrows move={move} />
        </g>
      </svg>
      <span className="text-[11px] font-mono font-bold leading-none">{label}</span>
      {desc && <span className="text-[9px] opacity-50 leading-none">{desc}</span>}
    </div>
  );
}
