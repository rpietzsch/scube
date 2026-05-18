import { Move } from './moves';
import { formatMove } from './parser';

// Matches CubeNet COLORS: U = white (top), D = yellow (cross-on-yellow).
const FACE_COLOR: Record<string, string> = {
  U: '#FAFAFA', // white
  D: '#FDD835', // yellow
  F: '#43A047',
  B: '#1E88E5',
  R: '#E53935',
  L: '#FB8C00',
  M: '#7c89b5',
  E: '#7c89b5',
  S: '#7c89b5',
  x: '#7c89b5',
  y: '#7c89b5',
  z: '#7c89b5',
};

const FACE_LABEL: Record<string, string> = {
  U: 'U · top',
  D: 'D · bottom',
  F: 'F · front',
  B: 'B · back',
  R: 'R · right',
  L: 'L · left',
  u: 'u · top wide',
  d: 'd · bottom wide',
  f: 'f · front wide',
  b: 'b · back wide',
  r: 'r · right wide',
  l: 'l · left wide',
  M: 'M · middle',
  E: 'E · equator',
  S: 'S · standing',
  x: 'x · rotate (R-axis)',
  y: 'y · rotate (U-axis)',
  z: 'z · rotate (F-axis)',
};

interface MoveHintProps {
  move: Move;
  size?: number;
  active?: boolean;
}

/**
 * Compact visual for a single move: a coloured face square with a curved arrow
 * showing rotation direction (CW for plain, CCW for prime, double-headed for 2).
 */
export function MoveHint({ move, size = 40, active = false }: MoveHintProps) {
  const base = move.base;
  const upper = base.toUpperCase();
  const color = FACE_COLOR[upper] ?? '#7c89b5';
  const isWide = base !== upper && upper in FACE_COLOR;
  const ccw = move.amount === -1;
  const half = move.amount === 2;

  const c = size / 2;
  const r = size * 0.32;

  // Arrow path: arc from 12 o'clock around to 9 o'clock (CW) or 3 o'clock (CCW).
  const startAngle = -Math.PI / 2;
  const sweep = half ? Math.PI : Math.PI / 1.5; // ~180 for double, 120 for quarter
  const dir = ccw ? -1 : 1;
  const endAngle = startAngle + dir * sweep;
  const x1 = c + r * Math.cos(startAngle);
  const y1 = c + r * Math.sin(startAngle);
  const x2 = c + r * Math.cos(endAngle);
  const y2 = c + r * Math.sin(endAngle);
  const largeArc = sweep > Math.PI ? 1 : 0;
  const sweepFlag = ccw ? 0 : 1;
  const arrowPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${x2} ${y2}`;

  // Arrow head — tip sits AT (x2, y2) pointing in the direction of motion;
  // the V's two back vertices sit *behind* the tip (opposite of motion),
  // splayed by ±0.5 rad. Earlier this had the sign flipped, which made the
  // arrow head appear to point backwards.
  const headLen = 6;
  const tangent = endAngle + dir * (Math.PI / 2);
  const hx1 = x2 - headLen * Math.cos(tangent - dir * 0.5);
  const hy1 = y2 - headLen * Math.sin(tangent - dir * 0.5);
  const hx2 = x2 - headLen * Math.cos(tangent + dir * 0.5);
  const hy2 = y2 - headLen * Math.sin(tangent + dir * 0.5);

  return (
    <div className={`inline-flex flex-col items-center ${active ? 'scale-110' : ''} transition-transform`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={formatMove(move)}>
        <rect
          x={size * 0.1}
          y={size * 0.1}
          width={size * 0.8}
          height={size * 0.8}
          rx={6}
          fill={color}
          opacity={isWide ? 0.85 : 1}
          stroke={active ? '#FDD835' : '#0b1020'}
          strokeWidth={active ? 2 : 1.5}
        />
        {isWide && (
          <rect
            x={size * 0.1}
            y={size * 0.1}
            width={size * 0.8}
            height={size * 0.8}
            rx={6}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1}
            strokeDasharray="3 2"
            opacity={0.7}
          />
        )}
        <path d={arrowPath} fill="none" stroke="#0b1020" strokeWidth={2.5} strokeLinecap="round" />
        <path d={arrowPath} fill="none" stroke="#ffffff" strokeWidth={1} strokeLinecap="round" />
        <polyline points={`${hx1},${hy1} ${x2},${y2} ${hx2},${hy2}`} fill="none" stroke="#0b1020" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        <text x={c} y={c + 4} textAnchor="middle" fontSize={size * 0.32} fontWeight={700} fill="#0b1020">
          {formatMove(move)}
        </text>
      </svg>
    </div>
  );
}

export function moveLabel(move: Move): string {
  return FACE_LABEL[move.base] ?? move.base;
}
