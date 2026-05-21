import { createContext, useContext, type ReactNode } from 'react';
import { useSettings } from '../store/settings';
import { getCubeColors, FACE_HEX } from '../data/colors';

const DEFAULT_COLORS: Record<string, string> = {
  U: FACE_HEX.white,  D: FACE_HEX.yellow,
  F: FACE_HEX.green,  B: FACE_HEX.blue,
  R: FACE_HEX.red,    L: FACE_HEX.orange,
};

export const CubeColorsContext = createContext<Record<string, string>>(DEFAULT_COLORS);

export function useCubeColors() {
  return useContext(CubeColorsContext);
}

/** Reads topColor/frontColor from settings and provides the computed color map. */
export function CubeColorsProvider({ children }: { children: ReactNode }) {
  const { topColor, frontColor } = useSettings();
  const colors = getCubeColors(topColor, frontColor);
  return <CubeColorsContext.Provider value={colors}>{children}</CubeColorsContext.Provider>;
}
