import { useEffect, useMemo, useState } from 'react';
import { CubeNet } from './CubeNet';
import { CubeState, clone } from './types';
import { applyMove, Move } from './moves';
import { formatMove, parseAlg } from './parser';
import { movedMask } from './highlight';
import { MoveHint, moveLabel } from './MoveHint';
import { useSettings } from '../store/settings';

interface PlaybackProps {
  initial: CubeState;
  alg: string | Move[];
  cell?: number;
  speed?: number;
  autoplay?: boolean;
  /** Optional override; otherwise read from settings. */
  visualAid?: boolean;
}

export function CubePlayback({ initial, alg, cell = 22, speed = 1.5, autoplay = false, visualAid }: PlaybackProps) {
  const settingsAid = useSettings((s) => s.visualAid);
  const aid = visualAid ?? settingsAid;
  const moves: Move[] = useMemo(() => (typeof alg === 'string' ? parseAlg(alg) : alg), [alg]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(autoplay);

  // State BEFORE the current pending move (state after `step` moves applied).
  const beforeState = useMemo(() => {
    const s = clone(initial);
    for (let i = 0; i < step; i++) applyMove(s, moves[i]);
    return s;
  }, [initial, moves, step]);

  // Highlight which stickers the next move will move (preview).
  const previewMask = useMemo(() => {
    if (!aid || step >= moves.length) return undefined;
    return movedMask(beforeState, moves[step]);
  }, [aid, beforeState, moves, step]);

  // What's currently shown: if `playing`, show post-move state during the dwell.
  // Simpler: always show beforeState with previewMask, then advance.
  useEffect(() => {
    if (!playing) return;
    if (step >= moves.length) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1000 / speed);
    return () => clearTimeout(t);
  }, [playing, step, moves.length, speed]);

  const reset = () => { setStep(0); setPlaying(false); };
  const playPause = () => {
    if (step >= moves.length) setStep(0);
    setPlaying((p) => !p);
  };
  const stepBack = () => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); };
  const stepFwd = () => { setPlaying(false); setStep((s) => Math.min(moves.length, s + 1)); };

  const currentMove = step < moves.length ? moves[step] : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <CubeNet state={beforeState} cell={cell} highlight={previewMask} />

      {aid && currentMove && (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-ink-900 border border-ink-800">
          <MoveHint move={currentMove} size={48} active />
          <div className="text-left">
            <div className="font-mono font-bold text-ink-200">{formatMove(currentMove)}</div>
            <div className="text-xs text-ink-500">{moveLabel(currentMove)}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm">
        <button onClick={reset} aria-label="Reset" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">↺</button>
        <button onClick={stepBack} aria-label="Step back" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">◀</button>
        <button onClick={playPause} className="px-4 py-1 rounded bg-cube-F text-ink-950 font-semibold">
          {playing ? '⏸' : step >= moves.length ? '↺ ▶' : '▶'}
        </button>
        <button onClick={stepFwd} aria-label="Step forward" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">▶</button>
      </div>

      {aid ? (
        <div className="flex flex-wrap gap-1 justify-center max-w-full">
          {moves.map((m, i) => (
            <div key={i} className={i === step ? 'ring-2 ring-cube-U rounded' : ''}>
              <MoveHint move={m} size={i === step ? 36 : 28} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1 justify-center max-w-full font-mono text-xs">
          {moves.map((m, i) => (
            <span
              key={i}
              className={`px-1.5 py-0.5 rounded ${
                i < step ? 'bg-cube-F/30 text-ink-200'
                  : i === step ? 'bg-cube-U text-ink-950 font-bold'
                  : 'bg-ink-800 text-ink-500'
              }`}
            >
              {formatMove(m)}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-ink-500">{step} / {moves.length}</div>
    </div>
  );
}
