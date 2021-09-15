import classnames from 'classnames/bind';
import React from 'react';

import logoBlackImg from '@/assets/images/logo_black.svg';
import logoWhiteImg from '@/assets/images/logo_white.svg';
import { useThemeContext } from '@/contexts/theme';
import GenericProps from '@/types/GenericProps';

import styles from './Logo.module.scss';

interface Props extends GenericProps {
  showText?: boolean;
}

const cx = classnames.bind(styles);

export default function Logo({
  className,
  showText = true,
  ...props
}: Props): React.ReactElement {
  const { activeThemeName } = useThemeContext();
  const logoSrc =
    activeThemeName === 'dark' ? logoWhiteImg.src : logoBlackImg.src;

  return (
    <a className={cx('logo', className)} href="/" {...props}>
      <img className={cx('logo__image')} src={logoSrc} alt="Блог" />
      {showText && <span className={cx('logo__text')}>Кирилл Квашонин</span>}
    </a>
  );
}
