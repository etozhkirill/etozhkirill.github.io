import classnames from 'classnames/bind';
import React from 'react';

import GenericProps from '@/types/GenericProps';

import styles from './Icon.module.scss';

interface Props extends GenericProps {
  href: string;
  viewBox?: string;
}

const cx = classnames.bind(styles);

export default function Icon({
  className,
  href,
  ...props
}: Props): React.ReactElement {
  return (
    <svg className={cx('icon', className)} {...props}>
      <use href={href} />
    </svg>
  );
}
