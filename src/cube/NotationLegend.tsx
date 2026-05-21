import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoveGuideCell } from './MoveGuide';
import { parseAlg } from './parser';

interface NotationLegendProps {
  alg?: string;
}

export function NotationLegend({ alg }: NotationLegendProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const moves = useMemo(() => {
    if (!alg) return null;
    const parsed = parseAlg(alg);
    const seen = new Set<string>();
    return parsed.filter((m) => {
      const key = `${m.base}${m.amount}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [alg]);

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
        <div className="px-4 pb-4">
          {moves ? (
            <div className="flex flex-wrap gap-4 justify-start pt-1 text-ink-200">
              {moves.map((m, i) => (
                <MoveGuideCell key={i} move={m} size={64} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-ink-500 pt-1">{t('legend.suffixes')}</p>
          )}
        </div>
      )}
    </section>
  );
}
