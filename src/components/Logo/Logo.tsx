import classnames from 'classnames/bind';
import React from 'react';

import logoImg from '@/assets/images/logo.svg';
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
  return (
    <a className={cx('logo', className)} href="/" {...props}>
      <img className={cx('logo__image')} src={logoImg.src} alt="Блог" />
      {showText && <span className={cx('logo__text')}>Кирилл Квашонин</span>}
    </a>
  );
}
