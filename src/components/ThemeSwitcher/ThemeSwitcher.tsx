import classnames from 'classnames/bind';
import React from 'react';

import { useThemeContext } from '@/contexts/theme';
import GenericProps from '@/types/GenericProps';
import ThemeName from '@/types/ThemeName';

import styles from './ThemeSwitcher.module.scss';

const cx = classnames.bind(styles);

export default function ThemeSwitcher({
  className,
  ...props
}: GenericProps): React.ReactElement {
  const { activeThemeName, setActiveThemeName } = useThemeContext();

  return (
    <fieldset className={cx('theme-switcher', className)} {...props}>
      <legend>Тема</legend>

      <input
        type="radio"
        name="theme-switcher"
        id="light"
        value="light"
        checked={activeThemeName === 'light'}
        onChange={handleChange}
      />
      <label htmlFor="light">Светлая</label>

      <input
        type="radio"
        name="theme-switcher"
        id="dark"
        value="dark"
        checked={activeThemeName === 'dark'}
        onChange={handleChange}
      />
      <label htmlFor="dark">Темная</label>

      <input
        type="radio"
        name="theme-switcher"
        id="auto"
        value="auto"
        checked={activeThemeName === 'auto'}
        onChange={handleChange}
      />
      <label htmlFor="auto">Системная</label>
    </fieldset>
  );

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const themeName = evt.target.value as ThemeName;
    setActiveThemeName(themeName);
  }
}
