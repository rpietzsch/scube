import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CubeNet, LLThumbnail } from './CubeNet';
import { CubeIso } from './CubeIso';
import { CubeState } from './types';
import { parseAlg } from './parser';
import { f2lFrPieces, pieceLabelMaps, piecesThatMove } from './movement';
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
  const { t } = useTranslation();
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
  // OLL: no piece labels — orientation pattern (white/grey) is self-explanatory.
  // PLL: U-face sticker only per piece (all 3 corner stickers in the LL flap zone
  //      would produce ~20 labels for a full PLL which is unreadable).
  // F2L: all stickers labelled — only U+F+R visible in iso, 2 pieces = 5 labels max.
  const labels = useMemo(() => {
    if (isOLL) return { topLeft: {}, bottomRight: {} };
    if (isPLL) {
      const tl: Record<number, string> = {};
      const br: Record<number, string> = {};
      for (const p of pieces) {
        const srcU = p.sources.find(i => i < 9);
        const tgtU = p.targets.find(i => i < 9);
        if (srcU !== undefined) tl[srcU] = `${p.n}`;
        if (tgtU !== undefined) br[tgtU] = `${p.n}′`;
      }
      return { topLeft: tl, bottomRight: br };
    }
    return pieceLabelMaps(pieces);
  }, [pieces, isOLL, isPLL]);
  const involved = useMemo(() => {
    if (pieces.length === 0) return undefined;
    const m = new Array<boolean>(54).fill(false);
    for (const p of pieces) {
      for (const i of p.sources) m[i] = true;
      for (const i of p.targets) m[i] = true;
    }
    return m;
  }, [pieces]);

  // F2L: isometric 3D corner view.
  // OLL: top-down LL diagram, white = oriented / grey = not oriented.
  // PLL: top-down LL diagram with actual colours (permutation is colour-based).
  const cubeEl = isF2L ? (
    <CubeIso
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
      topLeftLabels={labels.topLeft}
      bottomRightLabels={labels.bottomRight}
    />
  ) : (isOLL || isPLL) ? (
    <LLThumbnail
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
      ollMode={isOLL}
      topLeftLabels={labels.topLeft}
      bottomRightLabels={labels.bottomRight}
    />
  ) : (
    <CubeNet
      state={state}
      cell={cell}
      highlight={effectiveHighlight}
      involved={involved}
      topLeftLabels={labels.topLeft}
      bottomRightLabels={labels.bottomRight}
    />
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-center">{cubeEl}</div>
      <p className="text-[11px] text-ink-500 text-center px-2">{t('movement.labelsHint')}</p>
      <div className="flex justify-center">
        <code className="font-mono text-sm text-cube-U bg-ink-950 px-3 py-1.5 rounded">{alg}</code>
      </div>
    </div>
  );
}
