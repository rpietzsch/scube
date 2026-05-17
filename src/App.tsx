import { NavLink, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PathPage from './pages/PathPage';
import LibraryPage from './pages/LibraryPage';
import CasePage from './pages/CasePage';
import LessonPage from './pages/LessonPage';
import DrillPage from './pages/DrillPage';
import ComparePage from './pages/ComparePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { t } = useTranslation();

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 py-3 text-center text-sm ${isActive ? 'text-ink-200 border-t-2 border-cube-U' : 'text-ink-500 border-t-2 border-transparent'}`;

  return (
    <div className="min-h-full flex flex-col max-w-screen-sm mx-auto">
      <main className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<PathPage />} />
          <Route path="/library/*" element={<LibraryPage />} />
          <Route path="/case/:caseId" element={<CasePage />} />
          <Route path="/lesson/:caseId" element={<LessonPage />} />
          <Route path="/drill/:setId" element={<DrillPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <nav className="fixed bottom-0 inset-x-0 max-w-screen-sm mx-auto bg-ink-900 border-t border-ink-800 flex">
        <NavLink to="/" className={tabClass} end>{t('nav.path')}</NavLink>
        <NavLink to="/library" className={tabClass}>{t('nav.library')}</NavLink>
        <NavLink to="/settings" className={tabClass}>{t('nav.settings')}</NavLink>
      </nav>
    </div>
  );
}
