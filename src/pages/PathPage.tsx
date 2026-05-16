import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CASES, casesByStage, lessonsByStage } from '../data/cases';
import { Stage } from '../data/types';
import { useMastery, isLearned, isDue } from '../store/mastery';

const STAGES: Stage[] = [
  'cross',
  'f2lIntuitive',
  'f2lAdvanced',
  'oll2look',
  'ollFull',
  'pll2look',
  'pllFull',
];

interface Progress { done: number; total: number; }

function progressFor(stage: Stage, byCase: Record<string, any>, lessonsCompleted: Record<string, boolean>): Progress {
  const cases = casesByStage(stage);
  const lessons = lessonsByStage(stage);
  if (cases.length === 0 && lessons.length === 0) return { done: 0, total: 0 };
  const doneCases = cases.filter((c) => isLearned(byCase[c.id])).length;
  const doneLessons = lessons.filter((l) => lessonsCompleted[l.id]).length;
  return { done: doneCases + doneLessons, total: cases.length + lessons.length };
}

function nextItem(byCase: Record<string, any>, lessonsCompleted: Record<string, boolean>) {
  for (const stage of STAGES) {
    for (const l of lessonsByStage(stage)) {
      if (!lessonsCompleted[l.id]) return { kind: 'lesson' as const, id: l.id, stage, title: l.titleKey };
    }
    for (const c of casesByStage(stage)) {
      const m = byCase[c.id];
      if (!isLearned(m)) return { kind: 'case' as const, id: c.id, stage, title: c.name };
    }
  }
  return null;
}

export default function PathPage() {
  const { t } = useTranslation();
  const { byCase, lessonsCompleted } = useMastery();
  const dueCount = CASES.filter((c) => isDue(byCase[c.id])).length;
  const next = nextItem(byCase, lessonsCompleted);

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-ink-200">{t('app.name')}</h1>
        <span className="text-xs text-ink-500">{t('app.tagline')}</span>
      </header>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-3">{t('path.title')}</h2>
        <ol className="space-y-2">
          {STAGES.map((stage, i) => {
            const p = progressFor(stage, byCase, lessonsCompleted);
            const empty = p.total === 0;
            const done = p.total > 0 && p.done === p.total;
            return (
              <li key={stage}>
                <Link
                  to={`/library/${stage}`}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg bg-ink-900 hover:bg-ink-800 border border-ink-800"
                >
                  <span className="w-6 text-center text-ink-500">{i + 1}.</span>
                  <span className="flex-1">
                    <div className="text-ink-200">{t(`path.stage.${stage}`)}</div>
                    {!empty && (
                      <div className="mt-1 h-1.5 rounded bg-ink-800 overflow-hidden">
                        <div
                          className="h-full bg-cube-F"
                          style={{ width: `${Math.round((p.done / p.total) * 100)}%` }}
                        />
                      </div>
                    )}
                  </span>
                  <span className="text-xs text-ink-500 min-w-[3rem] text-right">
                    {empty ? t('path.comingSoon') : done ? '✓ ' + t('path.done') : t('path.count', { done: p.done, total: p.total })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('path.nextLesson')}</h2>
        {next ? (
          <Link
            to={next.kind === 'lesson' ? `/library/${next.stage}` : `/case/${next.id}`}
            className="block p-4 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-U"
          >
            <div className="text-xs text-ink-500 mb-1">{t(`path.stage.${next.stage}`)}</div>
            <div className="text-lg font-semibold text-ink-200">
              {next.kind === 'lesson' ? t(next.title as string) : next.title}
            </div>
            <div className="mt-3 inline-block px-3 py-1.5 rounded bg-cube-U text-ink-950 text-sm font-semibold">
              ▶ {t('path.start')}
            </div>
          </Link>
        ) : (
          <p className="text-ink-500 text-sm">{t('path.noNext')}</p>
        )}
      </section>

      {dueCount > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('path.due')}</h2>
          <Link
            to="/drill/due"
            className="block p-3 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-R"
          >
            <span className="text-ink-200">{dueCount} {t('drill.recognition')}</span>
          </Link>
        </section>
      )}
    </div>
  );
}
