import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { casesByStage, lessonsByStage } from '../data/cases';
import { Stage } from '../data/types';
import { LLThumbnail } from '../cube/CubeNet';
import { deriveState } from '../cube/derive';
import { useMastery, isLearned, isDue } from '../store/mastery';

const STAGES: Stage[] = ['cross', 'f2lIntuitive', 'f2lAdvanced', 'oll2look', 'ollFull', 'pll2look', 'pllFull'];

export default function LibraryPage() {
  const { '*': splat } = useParams();
  const stage = (splat as Stage) || 'oll2look';
  const { t } = useTranslation();
  const { byCase, lessonsCompleted } = useMastery();

  const cases = casesByStage(stage);
  const lessons = lessonsByStage(stage);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{t('library.title')}</h1>

      <nav className="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4">
        {STAGES.map((s) => {
          const empty = casesByStage(s).length === 0 && lessonsByStage(s).length === 0;
          return (
            <Link
              key={s}
              to={`/library/${s}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${
                s === stage ? 'bg-cube-U text-ink-950 border-cube-U' : 'border-ink-700 text-ink-200'
              } ${empty ? 'opacity-50' : ''}`}
            >
              {t(`path.stage.${s}`)}
            </Link>
          );
        })}
      </nav>

      {lessons.length > 0 && (
        <section className="space-y-2">
          {lessons.map((l) => (
            <Link
              key={l.id}
              to={`/lesson/lesson:${l.id}`}
              className="block p-3 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-U"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-semibold text-ink-200">{t(l.titleKey)}</div>
                {lessonsCompleted[l.id] && <span className="text-xs text-cube-F">✓</span>}
              </div>
              <p className="text-sm text-ink-500 mt-1 line-clamp-2">{t(l.bodyKey)}</p>
            </Link>
          ))}
        </section>
      )}

      {cases.length > 0 && (
        <section>
          <div className="grid grid-cols-3 gap-3">
            {cases.map((c) => {
              const m = byCase[c.id];
              const state = deriveState(c.solve);
              return (
                <Link
                  key={c.id}
                  to={`/case/${c.id}`}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-U"
                >
                  <LLThumbnail state={state} cell={14} />
                  <div className="text-xs text-center font-semibold mt-1">{c.name}</div>
                  <div className="text-[10px] text-ink-500">
                    {isLearned(m) ? '✓' : isDue(m) ? '●' : m?.phase ?? ''}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {cases.length === 0 && lessons.length === 0 && (
        <p className="text-ink-500 text-sm">{t('path.comingSoon')}</p>
      )}

      {cases.length > 0 && (
        <Link
          to={`/drill/${stage}`}
          className="block w-full text-center mt-4 px-4 py-3 rounded-lg bg-cube-F text-ink-950 font-semibold"
        >
          ▶ {t('case.openDrill')}
        </Link>
      )}
    </div>
  );
}
