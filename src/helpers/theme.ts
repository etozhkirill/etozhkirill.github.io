import { darkModifierClassName } from '@/constants/themeClassNames';
import isServer from '@/helpers/isServer';
import ThemeName from '@/types/ThemeName';

export function getThemeFromLocalStorage(): ThemeName {
  if (isServer()) return;

  const localStorageThemeName = window.localStorage.getItem('theme-name');
  if (!localStorageThemeName) return 'auto';

  const localStorageThemeNameIsValid = ['light', 'dark', 'auto'].some(
    (themeName) => localStorageThemeName === themeName
  );
  if (localStorageThemeNameIsValid) {
    return localStorageThemeName as ThemeName;
  }

  return 'auto';
}

export function setThemeNameToBody(themeName: ThemeName): void {
  if (isServer()) return;

  let resultThemeName = themeName;
  if (themeName === 'auto') {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) resultThemeName = 'dark';
  }

  document.body.classList.toggle(
    darkModifierClassName,
    resultThemeName === 'dark'
  );
}
