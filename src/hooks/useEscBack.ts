import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Press Escape to navigate back (mirrors the browser back button). */
export function useEscBack() {
  const navigate = useNavigate();
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
}
