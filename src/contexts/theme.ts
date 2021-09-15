import React from 'react';

import ThemeName from '@/types/ThemeName';

export interface ThemeContextState {
  activeThemeName: ThemeName;
  setActiveThemeName: (key: ThemeName) => void;
}

export const ThemeContext = React.createContext<ThemeContextState | null>(null);

/** use only in no ssr components */
export function useThemeContext() {
  return React.useContext(ThemeContext);
}
