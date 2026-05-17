import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseById, algsFor } from '../data/cases';
import { CubeWithMovement } from '../cube/CubeWithMovement';
import { deriveState } from '../cube/derive';
import { stageMask, stageKindFor } from '../cube/highlight';
import { NotationLegend } from '../cube/NotationLegend';
import { useMastery, PHASE_ORDER } from '../store/mastery';
import { useSettings } from '../store/settings';

export default function CasePage() {
  const { caseId = '' } = useParams();
  const { t } = useTranslation();
  const c = caseById(caseId);
  const algs = algsFor(caseId);
  const mastery = useMastery((s) => s.byCase[caseId]);
  const aid = useSettings((s) => s.visualAid);

  if (!c) return <div className="p-4 text-ink-500">Case not found.</div>;

  const state = deriveState(c.solve, c.context);
  const mask = aid ? stageMask(stageKindFor(c.stage)) : undefined;
  const primary = algs.find((a) => a.primary) ?? algs[0];
  const others = algs.filter((a) => a !== primary);
  const phaseIdx = mastery ? PHASE_ORDER.indexOf(mastery.phase) : 0;

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

      {primary && (
        <section className="bg-ink-900 rounded-lg p-4 border border-ink-800">
          <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-3">{t('case.fromTo')}</h2>
          <CubeWithMovement state={state} alg={primary.notation} highlight={mask} stage={c.stage} cell={22} />
          {aid && (
            <p className="text-xs text-ink-500 mt-3 text-center">{t('case.highlightHint')}</p>
          )}
        </section>
      )}

      <section>
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('case.mastery')}</h2>
        <div className="flex gap-1">
          {PHASE_ORDER.map((p, i) => (
            <div
              key={p}
              className={`flex-1 h-1.5 rounded ${i <= phaseIdx ? 'bg-cube-F' : 'bg-ink-800'}`}
              title={t(`lesson.${p}Phase`, { defaultValue: p })}
            />
          ))}
        </div>
      </section>

      {primary && (
        <section className="bg-ink-900 rounded-lg p-4 border border-ink-800 space-y-3">
          <h2 className="text-sm uppercase tracking-wider text-ink-500">{t('case.algorithm')}</h2>
          <code className="block font-mono text-base text-cube-U bg-ink-950 p-3 rounded">{primary.notation}</code>
          {primary.notesKey && <p className="text-sm text-ink-500">{t(primary.notesKey)}</p>}
          <div className="flex gap-2 flex-wrap">
            <Link
              to={`/lesson/${c.id}`}
              className="inline-block px-4 py-2 rounded bg-cube-F text-ink-950 font-semibold"
            >
              ▶ {t('case.openLesson')}
            </Link>
            <Link
              to={`/compare?a=${c.id}`}
              className="inline-block px-4 py-2 rounded bg-ink-800 text-ink-200 text-sm"
            >
              ⇄ {t('case.compare')}
            </Link>
          </div>
        </section>
      )}

      <NotationLegend />

      {others.length > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('case.algorithmOther')}</h2>
          <ul className="space-y-2">
            {others.map((a) => (
              <li key={a.id} className="bg-ink-900 p-3 rounded border border-ink-800">
                <code className="font-mono text-sm text-ink-200">{a.notation}</code>
                {a.notesKey && <p className="text-xs text-ink-500 mt-1">{t(a.notesKey)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
