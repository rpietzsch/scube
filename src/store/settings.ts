import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  /** Show visual aids: greyed inactive stickers, per-move hints, notation legend. */
  visualAid: boolean;
  setVisualAid: (v: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      visualAid: true,
      setVisualAid: (v) => set({ visualAid: v }),
    }),
    { name: 'scube.settings' },
  ),
);
