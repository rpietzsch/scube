import { Move } from './moves';

const TOKEN = /([URFDLBurfdlbxyzMES])(2|')?/g;

export function parseAlg(alg: string): Move[] {
  const moves: Move[] = [];
  for (const m of alg.matchAll(TOKEN)) {
    const base = m[1];
    const suf = m[2];
    const amount: Move['amount'] = suf === '2' ? 2 : suf === "'" ? -1 : 1;
    moves.push({ base, amount });
  }
  return moves;
}

export function invertAlg(moves: Move[]): Move[] {
  return [...moves]
    .reverse()
    .map((m) => ({ base: m.base, amount: m.amount === 1 ? -1 : m.amount === -1 ? 1 : 2 }));
}

export function formatMove(m: Move): string {
  return m.base + (m.amount === 2 ? '2' : m.amount === -1 ? "'" : '');
}
