import React from 'react';

import { ThemeContext } from '@/contexts/theme';
import { getThemeFromLocalStorage, setThemeNameToBody } from '@/helpers/theme';
import GenericProps from '@/types/GenericProps';
import ThemeName from '@/types/ThemeName';

export default function ThemeProvider(props: GenericProps): React.ReactElement {
  const [activeThemeName, rawSetActiveThemeName] = React.useState(
    getThemeFromLocalStorage()
  );

  React.useEffect(setupMatchMediaEffect, [activeThemeName]);

  return (
    <ThemeContext.Provider
      value={{ activeThemeName, setActiveThemeName }}
      {...props}
    />
  );

  function setupMatchMediaEffect() {
    if (activeThemeName !== 'auto') return;

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', handleChangeMq);

    return () => darkThemeMq.removeEventListener('change', handleChangeMq);

    function handleChangeMq(evt) {
      const resultThemeName = evt.matches ? 'dark' : 'light';
      setThemeNameToBody(resultThemeName);
    }
  }

  function setActiveThemeName(themeName: ThemeName) {
    rawSetActiveThemeName(themeName);
    window.localStorage.setItem('theme-name', themeName);
    setThemeNameToBody(themeName);
  }
}
