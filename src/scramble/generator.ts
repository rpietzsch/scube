import { Move } from '../cube/moves';
import { formatMove } from '../cube/parser';

const FACES = ['U', 'D', 'R', 'L', 'F', 'B'] as const;
const AMOUNTS: Move['amount'][] = [1, -1, 2];
const AXIS: Record<string, string> = {
  U: 'UD', D: 'UD', R: 'RL', L: 'RL', F: 'FB', B: 'FB',
};

export function generateScramble(length = 20): Move[] {
  const moves: Move[] = [];
  let lastFace = '';
  let secondLastFace = '';
  for (let i = 0; i < length; i++) {
    let face: string;
    do {
      face = FACES[Math.floor(Math.random() * FACES.length)];
    } while (
      face === lastFace ||
      (AXIS[face] === AXIS[lastFace] && AXIS[face] === AXIS[secondLastFace])
    );
    const amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
    moves.push({ base: face, amount });
    secondLastFace = lastFace;
    lastFace = face;
  }
  return moves;
}

export function formatScramble(moves: Move[]): string {
  return moves.map(formatMove).join(' ');
}
