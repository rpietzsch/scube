import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { caseById, algsFor } from '../data/cases';
import { CubeWithMovement } from '../cube/CubeWithMovement';
import { deriveState } from '../cube/derive';
import { stageMask, stageKindFor } from '../cube/highlight';
import { MoveGuideCell } from '../cube/MoveGuide';
import { OrientationPicker } from '../cube/OrientationPicker';
import { parseAlg } from '../cube/parser';
import { useSettings } from '../store/settings';

const WITH_ORIENTATION = [
  'f2lIntuitive', 'f2lAdvanced', 'f2lExpert', 'oll2look', 'ollFull', 'pll2look', 'pllFull',
  'beginnerMiddle', 'beginnerTopOrientation', 'beginnerTopPermutation',
  'rouxBlock1', 'rouxBlock2', 'rouxCmll', 'rouxLse',
];

export default function CasePage() {
  const { caseId = '' } = useParams();
  const { t } = useTranslation();
  const c = caseById(caseId);
  const algs = algsFor(caseId);
  const { visualAid: aid } = useSettings();
  const showOrient = WITH_ORIENTATION.includes(c?.stage ?? '');
  const [showAlternates, setShowAlternates] = useState(false);

  if (!c) return <div className="p-4 text-ink-500">Case not found.</div>;

  const state = deriveState(c.solve, c.context);
  const mask = aid ? stageMask(stageKindFor(c.stage)) : undefined;
  const primary = algs.find((a) => a.primary) ?? algs[0];
  const alternates = algs.filter((a) => a !== primary);

  return (
    <div className="p-4 space-y-5">
      <header>
        <Link to={`/library/${c.stage}`} className="text-xs text-ink-500">← {t(`path.stage.${c.stage}`)}</Link>
        <h1 className="text-2xl font-bold mt-1">{c.name}</h1>
        {c.descriptionKey && <p className="text-sm text-ink-500 mt-1">{t(c.descriptionKey)}</p>}
        {c.recognitionTagKeys && (
          <div className="flex flex-wrap gap-1 mt-2">
            {c.recognitionTagKeys.map((k) => (
              <span key={k} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-ink-800 text-ink-500">
                {t(k)}
              </span>
            ))}
          </div>
        )}
      </header>

      {showOrient && (
        <div className="rounded-lg bg-ink-900 border border-ink-800 px-4 py-2">
          <OrientationPicker />
        </div>
      )}

      {primary && (
        <section className="bg-ink-900 rounded-lg p-4 border border-ink-800">
          <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-3">{t('case.fromTo')}</h2>
          <CubeWithMovement state={state} alg={primary.notation} highlight={mask} stage={c.stage} cell={22} />
          {aid && (
            <p className="text-xs text-ink-500 mt-3 text-center">{t('case.highlightHint')}</p>
          )}
        </section>
      )}

      {primary && (
        <section className="bg-ink-900 rounded-lg p-4 border border-ink-800 space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-ink-500">{t('case.algorithm')}</h2>
          <div className="flex flex-wrap gap-4">
            {parseAlg(primary.notation).map((m, i) => (
              <MoveGuideCell key={i} move={m} size={64} labelClassName="text-base font-mono font-bold leading-none text-cube-U" />
            ))}
          </div>
          {primary.notesKey && <p className="text-sm text-ink-500">{t(primary.notesKey)}</p>}
        </section>
      )}

      {alternates.length > 0 && (
        <section className="rounded-lg bg-ink-900 border border-ink-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAlternates((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink-200"
            aria-expanded={showAlternates}
          >
            <span>
              {t('case.alternates')}
              <span className="ml-2 text-ink-500">({alternates.length})</span>
            </span>
            <span className="text-ink-500">{showAlternates ? '▾' : '▸'}</span>
          </button>
          {showAlternates && (
            <div className="px-4 pb-4 space-y-3">
              <p className="text-xs text-ink-500">{t('case.alternatesIntro')}</p>
              <ul className="space-y-2">
                {alternates.map((a) => {
                  const htm = parseAlg(a.notation).length;
                  return (
                    <li key={a.id} className="bg-ink-950 p-3 rounded border border-ink-800 space-y-2">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <code className="font-mono text-sm text-cube-U break-all">{a.notation}</code>
                        <span className="text-[10px] text-ink-500 whitespace-nowrap">
                          {t('case.moveCountHTM', { count: htm })}
                        </span>
                      </div>
                      {a.ergonomicsKeys && a.ergonomicsKeys.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {a.ergonomicsKeys.map((k) => (
                            <span key={k} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-ink-800 text-ink-500">
                              {t(k)}
                            </span>
                          ))}
                        </div>
                      )}
                      {a.notesKey && <p className="text-xs text-ink-500">{t(a.notesKey)}</p>}
                      {a.attribution && <p className="text-[10px] text-ink-700">— {a.attribution}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
