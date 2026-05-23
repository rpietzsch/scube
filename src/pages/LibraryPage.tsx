import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseGroupsByStage, casesByStage } from '../data/cases';
import { CaseData, Stage } from '../data/types';
import { CubeNet, LLThumbnail } from '../cube/CubeNet';
import { CubeIso } from '../cube/CubeIso';
import { deriveState } from '../cube/derive';
import { f2lContextMask, stageKindFor, stageMask } from '../cube/highlight';
import { involvedMaskFor } from '../cube/movement';
import { parseAlg } from '../cube/parser';
import { useSettings } from '../store/settings';
import { OrientationPicker } from '../cube/OrientationPicker';
import { OrientationHint } from '../cube/OrientationHint';

type Tab = 'cross' | 'f2l' | 'oll' | 'pll';
const TABS: Tab[] = ['cross', 'f2l', 'oll', 'pll'];
const TAB_LABEL: Record<Tab, string> = { cross: 'Cross', f2l: 'F2L', oll: 'OLL', pll: 'PLL' };

const WITH_ORIENTATION: Stage[] = ['f2lIntuitive', 'f2lAdvanced', 'f2lExpert', 'oll2look', 'ollFull', 'pll2look', 'pllFull'];

interface Section { header: string; cases: CaseData[]; drillStage: Stage }

function toTab(splat: string): Tab {
  if ((TABS as string[]).includes(splat)) return splat as Tab;
  if (splat.startsWith('f2l')) return 'f2l';
  if (splat.startsWith('oll')) return 'oll';
  if (splat.startsWith('pll')) return 'pll';
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
      return cases.length ? [{ header: 'Cross', cases, drillStage: 'cross' as Stage }] : [];
    }
    if (tab === 'f2l') {
      const result: Section[] = [];
      const advCases = casesByStage('f2lAdvanced');
      // f2lIntuitive → basicInsert group from f2lAdvanced
      const basicInsert = advCases.filter((c) => c.group === 'basicInsert');
      if (basicInsert.length) {
        result.push({
          header: `F2L intuitive · ${t('path.group.f2l.basicInsert')}`,
          cases: basicInsert,
          drillStage: 'f2lAdvanced',
        });
      }
      // f2lAdvanced → remaining groups
      for (const g of caseGroupsByStage('f2lAdvanced').filter((g) => g !== 'basicInsert')) {
        const gc = advCases.filter((c) => c.group === g);
        if (gc.length) result.push({ header: `F2L · ${t(`path.group.f2l.${g}`)}`, cases: gc, drillStage: 'f2lAdvanced' });
      }
      // f2lExpert → all groups
      const expCases = casesByStage('f2lExpert');
      for (const g of caseGroupsByStage('f2lExpert')) {
        const gc = expCases.filter((c) => c.group === g);
        if (gc.length) result.push({ header: `F2LA · ${t(`path.group.f2l.${g}`)}`, cases: gc, drillStage: 'f2lExpert' });
      }
      return result;
    }
    if (tab === 'oll') {
      return ([
        { header: 'OLL · 2-Look', cases: casesByStage('oll2look'), drillStage: 'oll2look' as Stage },
        { header: 'OLL · Full',   cases: casesByStage('ollFull'),  drillStage: 'ollFull'  as Stage },
      ] as Section[]).filter((s) => s.cases.length > 0);
    }
    // pll
    return ([
      { header: 'PLL · 2-Look', cases: casesByStage('pll2look'), drillStage: 'pll2look' as Stage },
      { header: 'PLL · Full',   cases: casesByStage('pllFull'),  drillStage: 'pllFull'  as Stage },
    ] as Section[]).filter((s) => s.cases.length > 0);
  })();

  return (
    <div>
      {/* Sticky header: title + cogwheel, tab bar, hold bar */}
      <div className="sticky top-0 z-10 bg-ink-950 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{t('library.title')}</h1>
          <Link to="/settings" className="text-ink-500 hover:text-ink-200 text-xl leading-none p-1" aria-label={t('nav.settings')}>⚙</Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-1 -mx-4 px-4">
          <Link
            to="/notation"
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs border border-ink-700 text-ink-200"
          >
            {t('notation.title')}
          </Link>
          {TABS.map((tabItem) => (
            <Link
              key={tabItem}
              to={`/library/${tabItem}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${
                tabItem === tab ? 'bg-cube-U text-ink-950 border-cube-U' : 'border-ink-700 text-ink-200'
              }`}
            >
              {TAB_LABEL[tabItem]}
            </Link>
          ))}
        </nav>

        {showOrient && (
          <div className="rounded-lg bg-ink-900 border border-ink-800 px-4 py-2">
            <OrientationPicker />
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="px-4 pb-4 space-y-4">
        {sections.length === 0 && (
          <p className="text-ink-500 text-sm">{t('path.comingSoon')}</p>
        )}

        {sections.map((sec, i) => {
          // Drill button appears once, after the last section sharing the same drillStage
          const isLastForStage = !sections.slice(i + 1).some((s) => s.drillStage === sec.drillStage);
          return (
            <section key={sec.header} className="space-y-2">
              <h2 className="text-sm uppercase tracking-wider text-ink-500 pt-2">
                {sec.header}
                <span className="ml-2 text-ink-700 normal-case font-normal">({sec.cases.length})</span>
              </h2>
              <CaseGrid cases={sec.cases} aid={aid} topColor={topColor} frontColor={frontColor} />
              {isLastForStage && (
                <Link
                  to={`/drill/${sec.drillStage}`}
                  className="block w-full text-center mt-2 px-4 py-3 rounded-lg bg-cube-F text-ink-950 font-semibold"
                >
                  ▶ {t('case.openDrill')}
                </Link>
              )}
            </section>
          );
        })}
      </div>
    </div>
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
