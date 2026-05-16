import { CubeState, clone, SOLVED } from './types';
import { applyAlg } from './moves';
import { invertAlg, parseAlg } from './parser';

const cache = new Map<string, CubeState>();

/**
 * Derive a case state.
 * 1. Start from a solved cube.
 * 2. Optionally apply a `context` (e.g. a pre-OLL state, so F2L examples
 *    don't show a fully solved last layer in the "after" view).
 * 3. Apply the inverse of the solving algorithm.
 *
 * Applying `solve` to this state returns the cube to the context state
 * (= SOLVED if no context). Memoised.
 */
export function deriveState(solve: string, context = ''): CubeState {
  const key = `${context}|${solve}`;
  const hit = cache.get(key);
  if (hit) return clone(hit);
  const s = clone(SOLVED);
  if (context) applyAlg(s, parseAlg(context));
  applyAlg(s, invertAlg(parseAlg(solve)));
  cache.set(key, clone(s));
  return s;
}

/** Compute the cube state that the `solve` alg leads to (= the context state). */
export function deriveTarget(context = ''): CubeState {
  const s = clone(SOLVED);
  if (context) applyAlg(s, parseAlg(context));
  return s;
}
