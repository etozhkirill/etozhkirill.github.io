import classnames from 'classnames/bind';
import React from 'react';

import GenericProps from '@/types/GenericProps';

import styles from './Col.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export default function Col({
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}: Props): React.ReactElement {
  const cols = { xs, sm, md, lg, xl };

  const modifiers = Object.keys(cols).reduce((acc, key) => {
    const colSize = cols[key];
    if (colSize) acc.push(`col_${key}_${colSize}`);

    return acc;
  }, []);

  return <div className={cx('col', modifiers, className)} {...props} />;
}
