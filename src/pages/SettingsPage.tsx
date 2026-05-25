import { useTranslation } from 'react-i18next';
import { useEscBack } from '../hooks/useEscBack';
import PageNav from '../components/PageNav';
import { useMastery } from '../store/mastery';
import { useSettings } from '../store/settings';
import pkg from '../../package.json';

export default function SettingsPage() {
  useEscBack();
  const { t, i18n } = useTranslation();
  const reset = useMastery((s) => s.reset);
  const { visualAid, setVisualAid } = useSettings();

  const setLang = (lng: string) => { void i18n.changeLanguage(lng); };

  return (
    <div>
      <PageNav />
      <div className="p-4 space-y-6">

      <section>
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('settings.language')}</h2>
        <div className="flex gap-2">
          {(['en', 'de'] as const).map((lng) => (
            <button
              key={lng}
              onClick={() => setLang(lng)}
              className={`px-4 py-2 rounded ${i18n.resolvedLanguage === lng ? 'bg-cube-U text-ink-950' : 'bg-ink-800 text-ink-200'}`}
            >
              {t(`settings.language${lng === 'en' ? 'En' : 'De'}`)}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-ink-500 mb-2">{t('settings.visualAid')}</h2>
        <label className="flex items-center gap-3 p-3 rounded bg-ink-900 border border-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={visualAid}
            onChange={(e) => setVisualAid(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="flex-1">
            <span className="block text-ink-200">{t('settings.visualAidLabel')}</span>
            <span className="block text-xs text-ink-500 mt-1">{t('settings.visualAidDesc')}</span>
          </span>
        </label>
      </section>

      <section>
        <button
          onClick={() => { if (confirm(t('settings.resetConfirm'))) reset(); }}
          className="px-4 py-2 rounded bg-ink-800 text-cube-R"
        >
          {t('settings.resetMastery')}
        </button>
      </section>

      <footer className="text-xs text-ink-500 pt-6 border-t border-ink-800">
        <p>{t('settings.version', { version: pkg.version })}</p>
        <p>{t('settings.offlineReady')}</p>
      </footer>
      </div>
    </div>
  );
}
