import { useTranslation } from 'react-i18next';
import { useEscBack } from '../hooks/useEscBack';
import { MoveGuideCell } from '../cube/MoveGuide';
import type { Move } from '../cube/moves';
import PageNav from '../components/PageNav';
import { useScrollRestore } from '../hooks/useScrollRestore';

const m = (base: string, amount: 1 | -1 | 2): Move => ({ base, amount });

const GROUPS: Array<{
  titleKey: string;
  noteKey?: string;
  rows: Array<Move[]>;
}> = [
  {
    titleKey: 'notation.faceMoves',
    rows: [
      [m('U', 1), m('U', -1), m('U', 2)],
      [m('D', 1), m('D', -1), m('D', 2)],
      [m('R', 1), m('R', -1), m('R', 2)],
      [m('L', 1), m('L', -1), m('L', 2)],
      [m('F', 1), m('F', -1), m('F', 2)],
      [m('B', 1), m('B', -1), m('B', 2)],
    ],
  },
  {
    titleKey: 'notation.wideMoves',
    noteKey: 'notation.wideNote',
    rows: [
      [m('u', 1), m('u', -1)],
      [m('d', 1), m('d', -1)],
      [m('r', 1), m('r', -1)],
      [m('l', 1), m('l', -1)],
      [m('f', 1), m('f', -1)],
      [m('b', 1), m('b', -1)],
    ],
  },
  {
    titleKey: 'notation.sliceMoves',
    rows: [
      [m('M', 1), m('M', -1), m('M', 2)],
      [m('E', 1), m('E', -1), m('E', 2)],
      [m('S', 1), m('S', -1), m('S', 2)],
    ],
  },
  {
    titleKey: 'notation.rotations',
    rows: [
      [m('x', 1), m('x', -1), m('x', 2)],
      [m('y', 1), m('y', -1), m('y', 2)],
      [m('z', 1), m('z', -1), m('z', 2)],
    ],
  },
];

export default function NotationPage() {
  useEscBack();
  useScrollRestore('notation');
  const { t } = useTranslation();

  return (
    <div>
      <PageNav />
      <div className="p-4 space-y-6">
      <p className="text-sm text-ink-400 leading-relaxed">{t('notation.intro')}</p>

      {GROUPS.map((group) => (
        <section key={group.titleKey} className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm uppercase tracking-wider text-ink-500">
              {t(group.titleKey)}
            </h2>
            {group.noteKey && (
              <p className="text-[10px] text-ink-600 max-w-[55%] text-right leading-tight">{t(group.noteKey)}</p>
            )}
          </div>

          <div className="rounded-lg bg-ink-900 border border-ink-800 overflow-hidden">
            <div className="grid grid-cols-3 px-4 pt-2 pb-0 text-[9px] uppercase tracking-wider text-ink-600">
              <span className="text-center">{t('notation.cw')}</span>
              <span className="text-center">{t('notation.ccw')}</span>
              <span className="text-center">{group.rows[0].length > 2 ? t('notation.half') : ''}</span>
            </div>
            {group.rows.map((row, ri) => (
              <div
                key={ri}
                className={`flex items-center gap-3 px-4 py-3 text-ink-200 ${
                  ri > 0 ? 'border-t border-ink-800' : ''
                }`}
              >
                {row.map((move, mi) => (
                  <div key={mi} className="flex-1 flex justify-center">
                    <MoveGuideCell move={move} size={60} />
                  </div>
                ))}
                {row.length < 3 && <div className="flex-1" />}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-lg bg-ink-900 border border-ink-800 p-4 space-y-1">
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">
          {t('notation.suffixesTitle')}
        </h2>
        <p className="text-xs text-ink-400 leading-relaxed">{t('notation.suffixesBody')}</p>
      </section>
      </div>
    </div>
  );
}
