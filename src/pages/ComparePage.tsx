import { Link, useSearchParams } from 'react-router-dom';
import { useEscBack } from '../hooks/useEscBack';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { caseById, algsFor, casesByStage } from '../data/cases';
import { CubeWithMovement } from '../cube/CubeWithMovement';
import { deriveState } from '../cube/derive';
import { stageKindFor, stageMask } from '../cube/highlight';
import { parseAlg } from '../cube/parser';
import { useSettings } from '../store/settings';

/**
 * Two-case comparison. URL: /compare?a=<caseIdA>&b=<caseIdB>.
 *
 * Lays the two cubes vertically on mobile, horizontally on wider screens.
 * Each side uses the same CubeWithMovement visualisation so the learner can
 * cross-reference algorithm length, ergonomics, and the resulting state.
 */
export default function ComparePage() {
  useEscBack();
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const aid = useSettings((s) => s.visualAid);

  const idA = params.get('a') ?? '';
  const idB = params.get('b') ?? '';
  const caseA = caseById(idA);
  const caseB = caseById(idB);

  const movesA = useMemo(() => (caseA ? parseAlg(caseA.solve) : []), [caseA]);
  const movesB = useMemo(() => (caseB ? parseAlg(caseB.solve) : []), [caseB]);

  return (
    <div className="p-4 space-y-5">
      <header>
        <Link to="/" className="text-xs text-ink-500">← {t('nav.path')}</Link>
        <h1 className="text-2xl font-bold mt-1">{t('compare.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('compare.intro')}</p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <CasePicker label="A" current={idA} onChange={(v) => setParams({ a: v, b: idB })} />
        <CasePicker label="B" current={idB} onChange={(v) => setParams({ a: idA, b: v })} />
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        {caseA && <CompareSide tag="A" caseData={caseA} aid={aid} />}
        {caseB && <CompareSide tag="B" caseData={caseB} aid={aid} />}
      </div>

      {caseA && caseB && (
        <section className="bg-ink-900 rounded-lg p-4 border border-ink-800">
          <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-3">{t('compare.moveCount')}</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-cube-U">{movesA.length}</div>
              <div className="text-xs text-ink-500">{caseA.name}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cube-F">{movesB.length}</div>
              <div className="text-xs text-ink-500">{caseB.name}</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function CompareSide({ tag, caseData, aid }: { tag: string; caseData: ReturnType<typeof caseById> & {}; aid: boolean }) {
  const { t } = useTranslation();
  const algs = algsFor(caseData.id);
  const primary = algs.find((a) => a.primary) ?? algs[0];
  const state = useMemo(() => deriveState(caseData.solve, caseData.context), [caseData]);
  if (!primary) return null;
  const mask = aid ? stageMask(stageKindFor(caseData.stage)) : undefined;

  return (
    <div className="flex-1 bg-ink-900 rounded-lg p-4 border border-ink-800 space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wider text-ink-500">
          {t('compare.side', { tag })}
        </span>
        <Link to={`/case/${caseData.id}`} className="text-xs text-cube-U">
          {t('lesson.openCase')} →
        </Link>
      </div>
      <h2 className="text-lg font-semibold">{caseData.name}</h2>
      <div className="text-[11px] uppercase tracking-wider text-ink-500">
        {t(`path.stage.${caseData.stage}`)}
      </div>
      <CubeWithMovement state={state} alg={primary.notation} highlight={mask} stage={caseData.stage} cell={18} />
    </div>
  );
}

function CasePicker({ label, current, onChange }: { label: string; current: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  // Offer all cases grouped by stage
  const stages: Array<'oll2look' | 'pll2look' | 'ollFull' | 'pllFull' | 'f2lIntuitive' | 'f2lAdvanced'> = [
    'f2lIntuitive', 'oll2look', 'pll2look', 'ollFull', 'pllFull', 'f2lAdvanced',
  ];

  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs uppercase tracking-wider text-ink-500">{t('compare.case', { label })}</span>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="bg-ink-950 border border-ink-800 rounded px-2 py-2 text-ink-200"
      >
        <option value="">{t('compare.pick')}</option>
        {stages.map((s) => {
          const list = casesByStage(s);
          if (list.length === 0) return null;
          return (
            <optgroup key={s} label={t(`path.stage.${s}`)}>
              {list.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </label>
  );
}
