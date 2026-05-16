import { useEffect, useMemo, useRef, useState } from 'react';
import { CubeNet } from './CubeNet';
import { CubeState, clone } from './types';
import { applyMove, Move } from './moves';
import { formatMove, parseAlg } from './parser';

interface PlaybackProps {
  /** Starting cube state */
  initial: CubeState;
  /** Algorithm to play. Either a notation string or pre-parsed moves. */
  alg: string | Move[];
  /** Cell size for the SVG net. */
  cell?: number;
  /** Playback speed in moves per second. Default 1.5. */
  speed?: number;
  /** Whether to auto-play on mount. */
  autoplay?: boolean;
}

export function CubePlayback({ initial, alg, cell = 22, speed = 1.5, autoplay = false }: PlaybackProps) {
  const moves: Move[] = useMemo(() => (typeof alg === 'string' ? parseAlg(alg) : alg), [alg]);
  const [step, setStep] = useState(0); // number of moves applied
  const [playing, setPlaying] = useState(autoplay);
  const stepRef = useRef(step);
  stepRef.current = step;

  const state = useMemo(() => {
    const s = clone(initial);
    for (let i = 0; i < step; i++) applyMove(s, moves[i]);
    return s;
  }, [initial, moves, step]);

  useEffect(() => {
    if (!playing) return;
    if (step >= moves.length) {
      setPlaying(false);
      return;
    }
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

  return (
    <div className="flex flex-col items-center gap-3">
      <CubeNet state={state} cell={cell} />
      <div className="flex items-center gap-2 text-sm">
        <button onClick={reset} aria-label="Reset" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">↺</button>
        <button onClick={stepBack} aria-label="Step back" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">◀</button>
        <button onClick={playPause} className="px-4 py-1 rounded bg-cube-F text-ink-950 font-semibold">
          {playing ? '⏸' : step >= moves.length ? '↺ ▶' : '▶'}
        </button>
        <button onClick={stepFwd} aria-label="Step forward" className="px-3 py-1 rounded bg-ink-800 hover:bg-ink-700">▶</button>
      </div>
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
      <div className="text-xs text-ink-500">{step} / {moves.length}</div>
    </div>
  );
}
