import { CubeState, clone, SOLVED } from './types';
import { applyAlg } from './moves';
import { invertAlg, parseAlg } from './parser';

const cache = new Map<string, CubeState>();

/** Apply the inverse of a solving alg to a solved cube to derive a case's state. Memoised. */
export function deriveState(solve: string): CubeState {
  const hit = cache.get(solve);
  if (hit) return clone(hit);
  const s = clone(SOLVED);
  applyAlg(s, invertAlg(parseAlg(solve)));
  cache.set(solve, clone(s));
  return s;
}
