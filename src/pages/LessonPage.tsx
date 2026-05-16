import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { caseById, algsFor, LESSONS } from '../data/cases';
import { CubePlayback } from '../cube/CubePlayback';
import { deriveState } from '../cube/derive';
import { useMastery } from '../store/mastery';

export default function LessonPage() {
  const { caseId = '' } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Prose-lesson route: /lesson/lesson:<id>
  if (caseId.startsWith('lesson:')) {
    return <ProseLesson id={caseId.slice('lesson:'.length)} />;
  }

  const c = caseById(caseId);
  const algs = algsFor(caseId);
  const primary = algs.find((a) => a.primary) ?? algs[0];
  const [speed, setSpeed] = useState(1.5);
  const [showAlg, setShowAlg] = useState(true);
  const advance = useMastery((s) => s.advance);
  const success = useMastery((s) => s.success);
  const initial = useMemo(() => (c ? deriveState(c.solve) : null), [c]);

  if (!c || !primary || !initial) return <div className="p-4 text-ink-500">Case not found.</div>;

  return (
    <div className="p-4 space-y-5">
      <header className="flex items-baseline justify-between">
        <Link to={`/case/${c.id}`} className="text-xs text-ink-500">← {c.name}</Link>
        <span className="text-xs text-ink-500">{t('lesson.title')}</span>
      </header>

      <h1 className="text-2xl font-bold">{c.name}</h1>

      <CubePlayback initial={initial} alg={primary.notation} speed={speed} cell={22} />

      <section className="flex items-center gap-2 text-sm">
        <span className="text-ink-500">{t('lesson.speed')}</span>
        {[0.5, 1, 1.5, 2.5].map((v) => (
          <button
            key={v}
            onClick={() => setSpeed(v)}
            className={`px-2 py-1 rounded ${speed === v ? 'bg-cube-U text-ink-950' : 'bg-ink-800 text-ink-200'}`}
          >
            {v}×
          </button>
        ))}
      </section>

      <section className="bg-ink-900 p-4 rounded-lg border border-ink-800">
        <button
          onClick={() => setShowAlg((v) => !v)}
          className="text-xs uppercase tracking-wider text-ink-500 mb-2"
        >
          {showAlg ? t('lesson.hideAlg') : t('lesson.showAlg')}
        </button>
        {showAlg && (
          <code className="block font-mono text-cube-U">{primary.notation}</code>
        )}
        {primary.notesKey && showAlg && (
          <p className="text-sm text-ink-500 mt-2">{t(primary.notesKey)}</p>
        )}
      </section>

      <div className="flex gap-2">
        <button
          onClick={() => { advance(c.id); success(c.id); navigate(`/case/${c.id}`); }}
          className="flex-1 px-4 py-3 rounded bg-cube-F text-ink-950 font-semibold"
        >
          {t('lesson.iPerformedIt')}
        </button>
      </div>
      <button
        onClick={() => navigate(`/drill/${c.stage}`)}
        className="w-full px-4 py-2 rounded bg-ink-800 text-ink-200 text-sm"
      >
        ▶ {t('case.openDrill')}
      </button>
    </div>
  );
}

function ProseLesson({ id }: { id: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === id);
  const completeLesson = useMastery((s) => s.completeLesson);

  if (!lesson) return <div className="p-4 text-ink-500">Lesson not found.</div>;

  return (
    <div className="p-4 space-y-5">
      <Link to={`/library/${lesson.stage}`} className="text-xs text-ink-500">← {t(`path.stage.${lesson.stage}`)}</Link>
      <h1 className="text-2xl font-bold">{t(lesson.titleKey)}</h1>
      <p className="text-ink-200 leading-relaxed">{t(lesson.bodyKey)}</p>
      <button
        onClick={() => { completeLesson(lesson.id); navigate(`/library/${lesson.stage}`); }}
        className="w-full px-4 py-3 rounded bg-cube-F text-ink-950 font-semibold"
      >
        ✓ {t('lesson.markFluent')}
      </button>
    </div>
  );
}
