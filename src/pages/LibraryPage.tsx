import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseGroupsByStage, casesByStage, lessonsByStage } from '../data/cases';
import { CaseData, LessonData, Stage } from '../data/types';
import { CubeNet, LLThumbnail } from '../cube/CubeNet';
import { CubeIso } from '../cube/CubeIso';
import { deriveState } from '../cube/derive';
import { f2lContextMask, stageKindFor, stageMask } from '../cube/highlight';
import { involvedMaskFor } from '../cube/movement';
import { parseAlg } from '../cube/parser';
import { useSettings } from '../store/settings';
import { OrientationPicker } from '../cube/OrientationPicker';
import { OrientationHint } from '../cube/OrientationHint';
import PageNav from '../components/PageNav';

type Tab = 'cross' | 'beginner' | 'f2l' | 'oll' | 'pll' | 'roux';
const TABS: Tab[] = ['cross', 'beginner', 'f2l', 'oll', 'pll', 'roux'];

const WITH_ORIENTATION: Stage[] = [
  'f2lIntuitive', 'f2lAdvanced', 'f2lExpert', 'oll2look', 'ollFull', 'pll2look', 'pllFull',
  'beginnerFirstLayerCorners', 'beginnerMiddle', 'beginnerTopOrientation', 'beginnerTopPermutation',
  'rouxBlock1', 'rouxBlock2', 'rouxCmll', 'rouxLse',
];

interface Section { header: string; cases: CaseData[] }

function toTab(splat: string): Tab {
  if ((TABS as string[]).includes(splat)) return splat as Tab;
  if (splat.startsWith('beginner') || splat === 'beginnerFirstLayerCorners') return 'beginner';
  if (splat.startsWith('f2l')) return 'f2l';
  if (splat.startsWith('oll')) return 'oll';
  if (splat.startsWith('pll')) return 'pll';
  if (splat.startsWith('roux')) return 'roux';
  return 'oll';
}

export default function LibraryPage() {
  const { '*': splat } = useParams();
  const tab = toTab(splat ?? '');
  const { t } = useTranslation();
  const { visualAid: aid, topColor, frontColor } = useSettings();
  const showOrient = tab !== 'cross';


  // Build ordered section list for the active tab
  const sections: Section[] = (() => {
    if (tab === 'cross') {
      const cases = casesByStage('cross');
      return cases.length ? [{ header: 'Cross', cases }] : [];
    }
    if (tab === 'beginner') {
      return ([
        { header: 'LBL · First layer corners', cases: casesByStage('beginnerFirstLayerCorners') },
        { header: 'LBL · Middle layer',        cases: casesByStage('beginnerMiddle') },
        { header: 'LBL · Top orientation',     cases: casesByStage('beginnerTopOrientation') },
        { header: 'LBL · Top permutation',     cases: casesByStage('beginnerTopPermutation') },
      ] as Section[]).filter((s) => s.cases.length > 0);
    }
    if (tab === 'f2l') {
      const result: Section[] = [];
      const advCases = casesByStage('f2lAdvanced');
      const basicInsert = advCases.filter((c) => c.group === 'basicInsert');
      if (basicInsert.length) {
        result.push({ header: `F2L intuitive · ${t('path.group.f2l.basicInsert')}`, cases: basicInsert });
      }
      for (const g of caseGroupsByStage('f2lAdvanced').filter((g) => g !== 'basicInsert')) {
        const gc = advCases.filter((c) => c.group === g);
        if (gc.length) result.push({ header: `F2L · ${t(`path.group.f2l.${g}`)}`, cases: gc });
      }
      const expCases = casesByStage('f2lExpert');
      for (const g of caseGroupsByStage('f2lExpert')) {
        const gc = expCases.filter((c) => c.group === g);
        if (gc.length) result.push({ header: `F2LA · ${t(`path.group.f2l.${g}`)}`, cases: gc });
      }
      return result;
    }
    if (tab === 'oll') {
      return ([
        { header: 'OLL · 2-Look', cases: casesByStage('oll2look') },
        { header: 'OLL · Full',   cases: casesByStage('ollFull') },
      ] as Section[]).filter((s) => s.cases.length > 0);
    }
    if (tab === 'pll') {
      return ([
        { header: 'PLL · 2-Look', cases: casesByStage('pll2look') },
        { header: 'PLL · Full',   cases: casesByStage('pllFull') },
      ] as Section[]).filter((s) => s.cases.length > 0);
    }
    return ([
      { header: 'Roux · Block 1', cases: casesByStage('rouxBlock1') },
      { header: 'Roux · Block 2', cases: casesByStage('rouxBlock2') },
      { header: 'Roux · CMLL',    cases: casesByStage('rouxCmll') },
      { header: 'Roux · LSE',     cases: casesByStage('rouxLse') },
    ] as Section[]).filter((s) => s.cases.length > 0);
  })();

  // Prose lessons shown above case grids for stages that have them.
  const lessons: LessonData[] = (() => {
    if (tab === 'cross') return lessonsByStage('cross');
    if (tab === 'f2l') return lessonsByStage('f2lIntuitive');
    return [];
  })();

  return (
    <div>
      <PageNav>
        {showOrient && (
          <div className="rounded-lg bg-ink-900 border border-ink-800 px-4 py-2">
            <OrientationPicker />
          </div>
        )}
      </PageNav>

      {/* Scrollable content */}
      <div className="px-4 pb-4 space-y-4">
        {lessons.length === 0 && sections.length === 0 && (
          <p className="text-ink-500 text-sm">{t('path.comingSoon')}</p>
        )}

        {lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}

        {sections.map((sec) => (
          <section key={sec.header} className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider text-ink-500 pt-2">
              {sec.header}
              <span className="ml-2 text-ink-700 normal-case font-normal">({sec.cases.length})</span>
            </h2>
            <CaseGrid cases={sec.cases} aid={aid} topColor={topColor} frontColor={frontColor} />
          </section>
        ))}
      </div>
    </div>
  );
}

function LessonCard({ lesson }: { lesson: LessonData }) {
  const { t } = useTranslation();
  return (
    <Link
      to={`/lesson/lesson:${lesson.id}`}
      className="flex items-center justify-between gap-3 p-4 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-U"
    >
      <div className="min-w-0">
        <div className="font-semibold text-sm">{t(lesson.titleKey)}</div>
        <div className="text-xs text-ink-500 mt-0.5 line-clamp-2">{t(lesson.bodyKey)}</div>
      </div>
      <span className="text-ink-500 shrink-0">→</span>
    </Link>
  );
}

function CaseGrid({ cases, aid, topColor, frontColor }: {
  cases: CaseData[];
  aid: boolean;
  topColor?: string;
  frontColor?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {cases.map((c) => {
        const state = deriveState(c.solve, c.context);
        const kind = stageKindFor(c.stage);
        const hl = aid ? stageMask(kind) : undefined;
        const involved = aid ? involvedMaskFor(state, parseAlg(c.solve), c.stage) : undefined;
        const useLL = kind === 'oll' || kind === 'pll';
        const useIso = kind === 'f2l';
        const isoHl = useIso ? f2lContextMask() : hl;
        const hasOrient = WITH_ORIENTATION.includes(c.stage);
        return (
          <Link
            key={c.id}
            to={`/case/${c.id}`}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-ink-900 border border-ink-800 hover:border-cube-U"
          >
            {useLL
              ? <LLThumbnail state={state} cell={14} highlight={hl} involved={involved} ollMode={kind === 'oll'} />
              : useIso
                ? <CubeIso state={state} cell={13} highlight={isoHl} involved={involved} />
                : <CubeNet state={state} cell={10} highlight={hl} involved={involved} />
            }
            <div className="text-xs text-center font-semibold mt-1">{c.name}</div>
            {hasOrient && topColor && frontColor && (
              <OrientationHint topColor={topColor} frontColor={frontColor} compact />
            )}
          </Link>
        );
      })}
    </div>
  );
}
