import classnames from 'classnames/bind';
import React from 'react';

import GenericProps from '@/types/GenericProps';

import styles from './Row.module.scss';

const cx = classnames.bind(styles);

export default function Row({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return <div className={cx('row', className)} {...props} />;
}
