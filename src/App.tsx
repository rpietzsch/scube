import { Navigate, Route, Routes } from 'react-router-dom';
import { CubeColorsProvider } from './cube/CubeColorsContext';
import LibraryPage from './pages/LibraryPage';
import NotationPage from './pages/NotationPage';
import CasePage from './pages/CasePage';
import LessonPage from './pages/LessonPage';
import ComparePage from './pages/ComparePage';
import SettingsPage from './pages/SettingsPage';
import ScramblePage from './pages/ScramblePage';

export default function App() {
  return (
    <CubeColorsProvider>
      <div className="h-screen flex flex-col max-w-screen-sm mx-auto">
        <main className="flex-1 overflow-y-auto pb-4">
          <Routes>
            <Route path="/" element={<Navigate to="/library" replace />} />
            <Route path="/library/*" element={<LibraryPage />} />
            <Route path="/notation" element={<NotationPage />} />
            <Route path="/case/:caseId" element={<CasePage />} />
            <Route path="/lesson/:caseId" element={<LessonPage />} />
<Route path="/compare" element={<ComparePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/scramble" element={<ScramblePage />} />
          </Routes>
        </main>
      </div>
    </CubeColorsProvider>
  );
}
