import { Move } from './moves';

const TOKEN = /([URFDLBurfdlbxyzMES])(2|')?/g;
// Normalize WCA wide-move suffix notation used by some sources:
// Rw→r, Lw→l, Fw→f, Bw→b, Uw→u, Dw→d (and their inverses/doubles)
const normWide = (alg: string) =>
  alg.replace(/([RLFBUDrlbfud])w(['2]?)/g, (_, c: string, s: string) =>
    c.toLowerCase() + s);

export function parseAlg(alg: string): Move[] {
  const moves: Move[] = [];
  for (const m of normWide(alg).matchAll(TOKEN)) {
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
