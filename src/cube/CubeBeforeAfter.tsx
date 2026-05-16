import { CubeNet } from './CubeNet';
import { CubeState, clone } from './types';
import { applyAlg } from './moves';
import { parseAlg } from './parser';
import { useTranslation } from 'react-i18next';

interface Props {
  /** State the learner starts in. */
  initial: CubeState;
  /** The algorithm whose effect we want to show. */
  alg: string;
  /** Relevance mask — stickers outside it are greyed out in BOTH nets. */
  highlight?: boolean[];
  cell?: number;
  beforeLabelKey?: string;
  afterLabelKey?: string;
}

export function CubeBeforeAfter({ initial, alg, highlight, cell = 16, beforeLabelKey = 'beforeAfter.before', afterLabelKey = 'beforeAfter.after' }: Props) {
  const { t } = useTranslation();
  const after = clone(initial);
  applyAlg(after, parseAlg(alg));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <figure className="flex flex-col items-center gap-2">
          <CubeNet state={initial} cell={cell} highlight={highlight} />
          <figcaption className="text-[10px] uppercase tracking-wider text-ink-500">
            {t(beforeLabelKey)}
          </figcaption>
        </figure>
        <div className="text-cube-U text-2xl">→</div>
        <figure className="flex flex-col items-center gap-2">
          <CubeNet state={after} cell={cell} highlight={highlight} />
          <figcaption className="text-[10px] uppercase tracking-wider text-ink-500">
            {t(afterLabelKey)}
          </figcaption>
        </figure>
      </div>
      <div className="flex justify-center">
        <code className="font-mono text-sm text-cube-U bg-ink-950 px-3 py-1.5 rounded">
          {alg}
        </code>
      </div>
    </div>
  );
}
