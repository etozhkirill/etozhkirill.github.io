import classnames from 'classnames/bind';
import React from 'react';

import GenericProps from '@/types/GenericProps';

import styles from './Container.module.scss';

const cx = classnames.bind(styles);

export default function Container({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return <div className={cx('container', className)} {...props} />;
}
