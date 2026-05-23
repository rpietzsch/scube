import { useMemo } from 'react';
import { CubeNet, LLThumbnail } from './CubeNet';
import { CubeIso } from './CubeIso';
import { CubeState } from './types';
import { parseAlg } from './parser';
import { f2lFrPieces, piecesThatMove } from './movement';
import { f2lContextMask } from './highlight';

interface Props {
  /** State the learner starts in. */
  state: CubeState;
  /** Algorithm whose effect we want to visualise. */
  alg: string;
  /** Stage relevance mask — greys out irrelevant stickers. */
  highlight?: boolean[];
  /** Stage of the case (e.g. "f2lIntuitive", "oll2look"). Drives which pieces get tracked. */
  stage: string;
  cell?: number;
}

/**
 * Single-image visualisation of an algorithm. Each piece that moves is
 * labelled with a number on every one of its stickers: `n` at the source
 * position, `n′` at the target. The numbered scheme works uniformly across
 * F2L (clear pair-to-slot movement) and OLL/PLL (cycles where source and
 * target sets overlap — numbers disambiguate which piece goes where).
 *
 * For F2L we track only the FR pair (corner + edge); other LL pieces churn
 * during the alg but aren't pedagogically relevant. For OLL/PLL we track
 * every piece that actually changes position or orientation.
 */
export function CubeWithMovement({ state, alg, highlight, stage, cell = 22 }: Props) {
  const moves = useMemo(() => parseAlg(alg), [alg]);
  const isF2L = stage.startsWith('f2l');
  const isOLL  = stage.startsWith('oll');
  const isPLL  = stage.startsWith('pll');
  // F2L: F+R faces (green/red) + U centre stay dimmed for orientation context;
  // U other stickers become visible grey; only moving pieces are fully bright.
  // OLL/PLL keep the stage mask unchanged.
  const effectiveHighlight = isF2L ? f2lContextMask() : highlight;

  const pieces = useMemo(
    () => (isF2L ? f2lFrPieces(state) : piecesThatMove(state, moves)),
    [state, moves, isF2L],
  );
  const involved = useMemo(() => {
    if (pieces.length === 0) return undefined;
    const m = new Array<boolean>(54).fill(false);
    for (const p of pieces) {
      for (const i of p.sources) m[i] = true;
      if (!isF2L) for (const i of p.targets) m[i] = true;
    }
    return m;
  }, [pieces, isF2L]);

  // F2L: isometric 3D corner view.
  // OLL: top-down LL diagram, white = oriented / grey = not oriented.
  // PLL: top-down LL diagram with actual colours (permutation is colour-based).
  const cubeEl = isF2L ? (
    <CubeIso
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
    />
  ) : (isOLL || isPLL) ? (
    <LLThumbnail
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
      ollMode={isOLL}
    />
  ) : (
    <CubeNet
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
    />
  );

  return <div className="flex justify-center">{cubeEl}</div>;
}
