import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sideFaces } from '../data/colors';

interface SettingsState {
  /** Show visual aids: greyed inactive stickers, per-move hints, notation legend. */
  visualAid: boolean;
  setVisualAid: (v: boolean) => void;
  /** U face color when executing OLL/PLL (default: white — app uses white-top convention). */
  topColor: string;
  /** F face color at the start of OLL/PLL algorithms (default: green). */
  frontColor: string;
  setTopColor: (v: string) => void;
  setFrontColor: (v: string) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      visualAid: true,
      setVisualAid: (v) => set({ visualAid: v }),
      topColor: 'white',
      frontColor: 'green',
      setTopColor: (v) => set((state) => {
        const sides = sideFaces(v);
        return {
          topColor: v,
          frontColor: sides.includes(state.frontColor) ? state.frontColor : sides[0],
        };
      }),
      setFrontColor: (v) => set({ frontColor: v }),
    }),
    { name: 'scube.settings' },
  ),
);
