import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { CASES, casesByStage } from '../data/cases';
import { CaseData, Stage } from '../data/types';
import { LLThumbnail } from '../cube/CubeNet';
import { deriveState } from '../cube/derive';
import { useMastery, isDue } from '../store/mastery';

type Mode = 'recognition' | 'fluency';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(target: CaseData, pool: CaseData[], n: number): CaseData[] {
  return shuffle(pool.filter((c) => c.id !== target.id)).slice(0, n);
}

export default function DrillPage() {
  const { setId = 'oll2look' } = useParams();
  const { t } = useTranslation();
  const { byCase, success, failure } = useMastery();
  const [mode, setMode] = useState<Mode>('recognition');

  const pool = useMemo<CaseData[]>(() => {
    if (setId === 'due') return CASES.filter((c) => isDue(byCase[c.id]));
    return casesByStage(setId as Stage);
  }, [setId, byCase]);

  const queue = useMemo(() => shuffle(pool).slice(0, Math.min(pool.length, 10)), [pool]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  if (pool.length === 0) {
    return (
      <div className="p-4 space-y-3">
        <Link to="/" className="text-xs text-ink-500">← Path</Link>
        <p className="text-ink-500">{t('path.noNext')}</p>
      </div>
    );
  }

  if (idx >= queue.length) {
    return (
      <div className="p-4 space-y-4 text-center">
        <h1 className="text-2xl font-bold">{t('drill.finished')}</h1>
        <p>{t('drill.score', { correct, total: queue.length })}</p>
        <Link to="/" className="inline-block px-4 py-2 rounded bg-cube-U text-ink-950 font-semibold">
          ← {t('nav.path')}
        </Link>
      </div>
    );
  }

  const current = queue[idx];

  // For recognition mode: build 4 options (target + 3 distractors).
  const options = useMemo(() => shuffle([current, ...pickDistractors(current, pool, 3)]), [current, pool]);

  const onPick = (opt: CaseData) => {
    if (picked) return;
    setPicked(opt.id);
    const ok = opt.id === current.id;
    if (ok) { setCorrect((c) => c + 1); success(current.id); } else { failure(current.id); }
  };

  const onNext = () => { setPicked(null); setIdx((i) => i + 1); };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-baseline justify-between">
        <Link to="/" className="text-xs text-ink-500">← {t('nav.path')}</Link>
        <span className="text-xs text-ink-500">{idx + 1} / {queue.length}</span>
      </div>

      <div className="flex gap-2">
        {(['recognition', 'fluency'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded text-sm ${mode === m ? 'bg-cube-U text-ink-950' : 'bg-ink-800 text-ink-200'}`}
          >
            {t(`drill.${m}`)}
          </button>
        ))}
      </div>

      {mode === 'recognition' ? (
        <Recognition current={current} options={options} picked={picked} onPick={onPick} onNext={onNext} />
      ) : (
        <Fluency current={current} onResult={(ok) => { if (ok) { setCorrect((c) => c + 1); success(current.id); } else failure(current.id); onNext(); }} />
      )}

      <div className="h-2 rounded bg-ink-800 overflow-hidden">
        <div className="h-full bg-cube-F" style={{ width: `${(idx / queue.length) * 100}%` }} />
      </div>
    </div>
  );
}

function Recognition({
  current, options, picked, onPick, onNext,
}: {
  current: CaseData;
  options: CaseData[];
  picked: string | null;
  onPick: (c: CaseData) => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const state = deriveState(current.solve, current.context);

  return (
    <div className="space-y-4">
      <div className="flex justify-center bg-ink-900 rounded-lg p-4 border border-ink-800">
        <LLThumbnail state={state} cell={22} />
      </div>
      <h2 className="text-center text-sm text-ink-500">{t('drill.whichCase')}</h2>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => {
          const isPicked = picked === o.id;
          const isAnswer = o.id === current.id;
          const cls = picked == null
            ? 'bg-ink-900 border-ink-800 hover:border-cube-U'
            : isAnswer
              ? 'bg-cube-F/30 border-cube-F text-ink-200'
              : isPicked
                ? 'bg-cube-R/30 border-cube-R text-ink-200'
                : 'bg-ink-900 border-ink-800 opacity-60';
          return (
            <button
              key={o.id}
              disabled={picked != null}
              onClick={() => onPick(o)}
              className={`p-3 rounded-lg border text-sm font-semibold ${cls}`}
            >
              {o.name}
            </button>
          );
        })}
      </div>
      {picked && (
        <button onClick={onNext} className="w-full py-3 rounded bg-cube-U text-ink-950 font-semibold">
          {t('drill.next')} →
        </button>
      )}
    </div>
  );
}

function Fluency({ current, onResult }: { current: CaseData; onResult: (ok: boolean) => void }) {
  const { t } = useTranslation();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [stopped, setStopped] = useState(false);
  const state = deriveState(current.solve, current.context);

  // simple timer using rAF emulated with setInterval to keep it light
  useMemo(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed(start ? Date.now() - start : 0);
    }, 50);
    return () => clearInterval(id);
  }, [running, start]);

  const startTimer = () => { setStart(Date.now()); setElapsed(0); setRunning(true); setStopped(false); };
  const stopTimer = () => { setRunning(false); setStopped(true); };

  return (
    <div className="space-y-4">
      <div className="flex justify-center bg-ink-900 rounded-lg p-4 border border-ink-800">
        <LLThumbnail state={state} cell={22} />
      </div>
      <div className="text-center font-mono text-4xl text-cube-U">{(elapsed / 1000).toFixed(2)}s</div>
      {!running && !stopped && (
        <button onClick={startTimer} className="w-full py-4 rounded bg-cube-F text-ink-950 font-semibold">
          ▶ Start
        </button>
      )}
      {running && (
        <button onClick={stopTimer} className="w-full py-4 rounded bg-cube-R text-ink-200 font-semibold">
          ■ Stop
        </button>
      )}
      {stopped && (
        <div className="space-y-2">
          <p className="text-center text-sm text-ink-500">{t('drill.selfRate')}</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onResult(true)} className="py-3 rounded bg-cube-F/30 border border-cube-F text-ink-200">👍 {t('drill.fluent')}</button>
            <button onClick={() => onResult(true)} className="py-3 rounded bg-cube-U/30 border border-cube-U text-ink-200">🤔 {t('drill.hesitant')}</button>
            <button onClick={() => onResult(false)} className="py-3 rounded bg-cube-R/30 border border-cube-R text-ink-200">❌ {t('drill.missed')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
