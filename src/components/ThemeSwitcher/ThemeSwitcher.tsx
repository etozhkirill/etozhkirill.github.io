import classnames from 'classnames/bind';
import React from 'react';

import { useThemeContext } from '@/contexts/theme';
import GenericProps from '@/types/GenericProps';
import ThemeName from '@/types/ThemeName';
import Icon from '@/components/Icon';
import lightModeIcon from '@/assets/icons/lightMode.svg';
import darkModeIcon from '@/assets/icons/darkMode.svg';
import autoModeIcon from '@/assets/icons/autoMode.svg';

import styles from './ThemeSwitcher.module.scss';

const cx = classnames.bind(styles);

export default function ThemeSwitcher({
  className,
  ...props
}: GenericProps): React.ReactElement {
  const { activeThemeName, setActiveThemeName } = useThemeContext();

  const themes = {
    light: {
      iconSrc: lightModeIcon.src,
      text: 'светлая'
    },
    dark: {
      iconSrc: darkModeIcon.src,
      text: 'темная'
    },
    auto: {
      iconSrc: autoModeIcon.src,
      text: 'системная'
    }
  };

  return (
    <fieldset className={cx('theme-switcher', className)} {...props}>
      <legend className={cx('theme-switcher__legend')}>
        {`Тема: ${themes[activeThemeName].text}`}
      </legend>

      {Object.keys(themes).map((themeName) => (
        <React.Fragment key={themeName}>
          <input
            className={cx('theme-switcher__radio')}
            type="radio"
            name="theme-switcher"
            id={themeName}
            value={themeName}
            checked={activeThemeName === themeName}
            onChange={handleChange}
          />
          <label
            className={cx('theme-switcher__label', {
              'theme-switcher__label_active': activeThemeName === themeName
            })}
            htmlFor={themeName}
            title={themes[themeName].text}
          >
            <Icon
              className={cx('label-icon')}
              width="24"
              height="24"
              href={`${themes[themeName].iconSrc}#shape`}
            />
          </label>
        </React.Fragment>
      ))}
    </fieldset>
  );

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const themeName = evt.target.value as ThemeName;
    setActiveThemeName(themeName);
  }
}
