import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CubeNet } from './CubeNet';
import { CubeState } from './types';
import { parseAlg } from './parser';
import { f2lFrPieces, pieceLabelMaps, piecesThatMove } from './movement';

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

  const pieces = useMemo(
    () => (isF2L ? f2lFrPieces(state) : piecesThatMove(state, moves)),
    [state, moves, isF2L],
  );
  const labels = useMemo(() => pieceLabelMaps(pieces), [pieces]);
  const involved = useMemo(() => {
    if (pieces.length === 0) return undefined;
    const m = new Array<boolean>(54).fill(false);
    for (const p of pieces) {
      for (const i of p.sources) m[i] = true;
      for (const i of p.targets) m[i] = true;
    }
    return m;
  }, [pieces]);

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <CubeNet
          state={state}
          cell={cell}
          highlight={highlight}
          involved={involved}
          topLeftLabels={labels.topLeft}
          bottomRightLabels={labels.bottomRight}
        />
      </div>
      <p className="text-[11px] text-ink-500 text-center px-2">{t('movement.labelsHint')}</p>
      <div className="flex justify-center">
        <code className="font-mono text-sm text-cube-U bg-ink-950 px-3 py-1.5 rounded">{alg}</code>
      </div>
    </div>
  );
}
