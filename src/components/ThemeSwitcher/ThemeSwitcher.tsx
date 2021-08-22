import classnames from 'classnames/bind';
import React from 'react';

import GenericProps from '@/types/GenericProps';

import styles from './ThemeSwitcher.module.scss';

const cx = classnames.bind(styles);

export default function ThemeSwitcher({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return (
    <div className={cx('theme-switcher', className)} {...props}>
      <input type="checkbox" />
    </div>
  );
}
