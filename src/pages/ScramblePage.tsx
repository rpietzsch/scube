import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEscBack } from '../hooks/useEscBack';
import { useTranslation } from 'react-i18next';
import { generateScramble, formatScramble } from '../scramble/generator';
import { applyAlgToSolved } from '../cube/moves';
import { CubeNet } from '../cube/CubeNet';
import { CubeColorsContext } from '../cube/CubeColorsContext';
import { MoveGuideCell } from '../cube/MoveGuide';
import { getCubeColors } from '../data/colors';
import { parseAlg } from '../cube/parser';
import type { Move } from '../cube/moves';

// Scrambles are always defined from the WCA reference orientation — white top,
// green front — regardless of what the user has set in Settings.
const WCA_COLORS = getCubeColors('white', 'green');

export default function ScramblePage() {
  useEscBack();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialise from ?s= URL param so shared links reproduce the same scramble.
  const [moves, setMoves] = useState<Move[]>(() => {
    const encoded = searchParams.get('s');
    if (encoded) {
      try {
        const parsed = parseAlg(encoded);
        if (parsed.length > 0) return parsed;
      } catch { /* ignore malformed param */ }
    }
    return generateScramble(20);
  });

  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const startScramble = useCallback((length: number) => {
    const next = generateScramble(length);
    setMoves(next);
    setSelectedStep(null);
    setCopied(false);
    setCopiedLink(false);
    setSearchParams({ s: formatScramble(next) }, { replace: true });
  }, [setSearchParams]);

  const newScramble = useCallback(() => startScramble(20), [startScramble]);
  const newQuickScramble = useCallback(() => startScramble(10), [startScramble]);

  const displayState = useMemo(() => {
    const subset = selectedStep !== null ? moves.slice(0, selectedStep + 1) : moves;
    return applyAlgToSolved(subset);
  }, [moves, selectedStep]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(formatScramble(moves)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [moves]);

  const handleCopyLink = useCallback(() => {
    // Strip any existing ?s= from the hash path, then append the current scramble.
    // Works with HashRouter: window.location.hash === '#/scramble' (or '#/scramble?s=...')
    const hashPath = window.location.hash.split('?')[0]; // '#/scramble'
    const url =
      window.location.origin +
      window.location.pathname +
      hashPath +
      '?s=' +
      encodeURIComponent(formatScramble(moves));
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
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
          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={newScramble}
              className="px-4 py-2 rounded-lg bg-cube-U text-ink-950 text-sm font-semibold hover:opacity-90"
            >
              20×
            </button>
            <button
              onClick={newQuickScramble}
              className="px-4 py-2 rounded-lg border border-cube-U text-cube-U text-sm font-semibold hover:bg-cube-U hover:text-ink-950 transition-colors"
            >
              10×
            </button>
            <button
              onClick={handleCopy}
              aria-label={copied ? t('scramble.copied') : t('scramble.copy')}
              title={copied ? t('scramble.copied') : t('scramble.copy')}
              className={`p-2 rounded-lg border transition-colors ${copied ? 'border-cube-U text-cube-U' : 'border-ink-700 text-ink-400 hover:border-ink-400 hover:text-ink-200'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <button
              onClick={handleCopyLink}
              aria-label={copiedLink ? t('scramble.copiedLink') : t('scramble.copyLink')}
              title={copiedLink ? t('scramble.copiedLink') : t('scramble.copyLink')}
              className={`p-2 rounded-lg border transition-colors ${copiedLink ? 'border-cube-U text-cube-U' : 'border-ink-700 text-ink-400 hover:border-ink-400 hover:text-ink-200'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
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
