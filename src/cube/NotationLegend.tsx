import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoveHint, moveLabel } from './MoveHint';

const EXAMPLES = [
  { base: 'U', amount: 1 as const },
  { base: 'U', amount: -1 as const },
  { base: 'U', amount: 2 as const },
  { base: 'R', amount: 1 as const },
  { base: 'F', amount: 1 as const },
  { base: 'L', amount: 1 as const },
  { base: 'D', amount: 1 as const },
  { base: 'B', amount: 1 as const },
  { base: 'f', amount: 1 as const },
  { base: 'r', amount: 1 as const },
  { base: 'M', amount: 1 as const },
  { base: 'y', amount: 1 as const },
];

export function NotationLegend() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-lg bg-ink-900 border border-ink-800 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink-200"
      >
        <span>{t('legend.title')}</span>
        <span className="text-ink-500">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-xs text-ink-500">{t('legend.intro')}</p>
          <div className="grid grid-cols-3 gap-2">
            {EXAMPLES.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-2 rounded bg-ink-950">
                <MoveHint move={m} size={42} />
                <div className="text-[10px] text-ink-500 text-center leading-tight">{moveLabel(m)}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-500">{t('legend.suffixes')}</p>
        </div>
      )}
    </section>
  );
}
