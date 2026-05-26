import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

type LibTab = 'cross' | 'beginner' | 'f2l' | 'oll' | 'pll' | 'roux';
const LIB_TABS: LibTab[] = ['cross', 'beginner', 'f2l', 'oll', 'pll', 'roux'];
const LIB_TAB_LABEL: Record<LibTab, string> = {
  cross: 'Cross', beginner: 'LBL', f2l: 'F2L', oll: 'OLL', pll: 'PLL', roux: 'Roux',
};

function pathToLibTab(pathname: string): LibTab | null {
  if (!pathname.startsWith('/library')) return null;
  const seg = pathname.slice('/library/'.length);
  if (!seg) return 'oll';
  if (['cross', 'beginner', 'f2l', 'oll', 'pll', 'roux'].includes(seg)) return seg as LibTab;
  if (seg.startsWith('beginner')) return 'beginner';
  if (seg.startsWith('f2l')) return 'f2l';
  if (seg.startsWith('oll')) return 'oll';
  if (seg.startsWith('pll')) return 'pll';
  if (seg.startsWith('roux')) return 'roux';
  return 'oll';
}

export default function PageNav({ children }: { children?: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const isNotation = pathname === '/notation';
  const isScramble = pathname === '/scramble';
  const activeLibTab = pathname.startsWith('/library') ? pathToLibTab(pathname) : null;

  const title = isNotation
    ? t('notation.title')
    : isScramble
      ? t('scramble.title')
      : t('library.title');

  const toggleLang = useCallback(() => {
    void i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en');
  }, [i18n]);

  const langLabel = i18n.resolvedLanguage === 'de' ? '🇩🇪 de' : '🇬🇧 en';

  return (
    <div className="sticky top-0 z-10 bg-ink-950 px-4 pt-4 pb-3 space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={toggleLang}
          className="text-sm leading-none px-2 py-1 rounded transition-colors text-ink-400 hover:text-ink-100 hover:bg-ink-800"
          aria-label={t('nav.switchLang')}
        >
          {langLabel}
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto pb-1 -mx-4 px-4">
        <Link
          to="/notation"
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${
            isNotation ? 'bg-cube-U text-ink-950 border-cube-U' : 'border-ink-700 text-ink-200'
          }`}
        >
          {t('notation.title')}
        </Link>
        <Link
          to="/scramble"
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${
            isScramble ? 'bg-cube-U text-ink-950 border-cube-U' : 'border-ink-700 text-ink-200'
          }`}
        >
          {t('scramble.title')}
        </Link>
        {LIB_TABS.map((tabItem) => (
          <Link
            key={tabItem}
            to={`/library/${tabItem}`}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${
              activeLibTab === tabItem ? 'bg-cube-U text-ink-950 border-cube-U' : 'border-ink-700 text-ink-200'
            }`}
          >
            {LIB_TAB_LABEL[tabItem]}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
