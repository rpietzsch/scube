import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateScramble, formatScramble } from '../scramble/generator';
import { applyAlgToSolved } from '../cube/moves';
import { CubeNet } from '../cube/CubeNet';
import { CubeColorsContext } from '../cube/CubeColorsContext';
import { MoveGuideCell } from '../cube/MoveGuide';
import { getCubeColors } from '../data/colors';
import type { Move } from '../cube/moves';

// Scrambles are always defined from the WCA reference orientation — white top,
// green front — regardless of what the user has set in Settings.
const WCA_COLORS = getCubeColors('white', 'green');

export default function ScramblePage() {
  const { t } = useTranslation();
  const [moves, setMoves] = useState<Move[]>([]);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const newScramble = useCallback(() => {
    setMoves(generateScramble(20));
    setSelectedStep(null);
    setCopied(false);
  }, []);

  useEffect(() => { newScramble(); }, [newScramble]);

  const displayState = useMemo(() => {
    const subset = selectedStep !== null ? moves.slice(0, selectedStep + 1) : moves;
    return applyAlgToSolved(subset);
  }, [moves, selectedStep]);

  const handleCopy = useCallback(() => {
    const text = formatScramble(moves);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [moves]);

  const handleTokenClick = useCallback((idx: number) => {
    setSelectedStep((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-10 bg-ink-950 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <Link to="/library" className="text-xs text-ink-500 hover:text-ink-200">
            ← {t('library.title')}
          </Link>
          <Link
            to="/settings"
            className="text-ink-500 hover:text-ink-200 text-xl leading-none p-1"
            aria-label={t('nav.settings')}
          >
            ⚙
          </Link>
        </div>
        <h1 className="text-xl font-bold">{t('scramble.title')}</h1>
      </header>

      <div className="px-4 space-y-6 mt-2">
        {/* Move sequence */}
        <section className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={newScramble}
              className="px-4 py-2 rounded-lg bg-cube-U text-ink-950 text-sm font-semibold hover:opacity-90"
            >
              {t('scramble.generate')}
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg border border-ink-700 text-ink-200 text-sm hover:border-ink-400"
            >
              {copied ? t('scramble.copied') : t('scramble.copy')}
            </button>
          </div>

          <div
            className="rounded-lg bg-ink-900 border border-ink-800 px-4 py-3 flex flex-wrap gap-3"
            role="list"
            aria-label={t('scramble.title')}
          >
            {moves.map((move, idx) => {
              const isSelected = selectedStep === idx;
              const isPast = selectedStep !== null && idx < selectedStep;
              return (
                <button
                  key={idx}
                  role="listitem"
                  onClick={() => handleTokenClick(idx)}
                  aria-pressed={isSelected}
                  className={`rounded-lg p-1 transition-all ${
                    isSelected
                      ? 'ring-2 ring-cube-U bg-ink-800'
                      : isPast
                        ? 'opacity-30'
                        : 'hover:bg-ink-800'
                  }`}
                >
                  <MoveGuideCell
                    move={move}
                    size={52}
                    labelClassName={`text-sm font-mono font-bold leading-none ${isPast ? 'text-ink-500' : 'text-cube-U'}`}
                  />
                </button>
              );
            })}
          </div>

          {selectedStep !== null && (
            <p className="text-xs text-ink-500 text-center">
              {t('scramble.stepHint', { step: selectedStep + 1, total: moves.length })}
            </p>
          )}
        </section>

        {/* Cube state */}
        <section className="space-y-2">
          <h2 className="text-xs uppercase tracking-wider text-ink-500">
            {selectedStep !== null
              ? t('scramble.stateAfterStep', { step: selectedStep + 1 })
              : t('scramble.scrambledState')}
          </h2>
          <div className="rounded-lg bg-ink-900 border border-ink-800 p-4 flex justify-center">
            <CubeColorsContext.Provider value={WCA_COLORS}>
              <CubeNet state={displayState} cell={18} showFaceLabels />
            </CubeColorsContext.Provider>
          </div>
        </section>

        {/* Instruction */}
        <p className="text-xs text-ink-500 leading-relaxed pb-4">
          {t('scramble.instruction')}
        </p>
      </div>
    </div>
  );
}
