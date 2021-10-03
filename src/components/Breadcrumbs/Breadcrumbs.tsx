import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';

import BreadcrumbsLink from '@/types/BreadcrumbsLink';
import GenericProps from '@/types/GenericProps';

import styles from './Breadcrumbs.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  links: BreadcrumbsLink[];
}

export default function Breadcrumbs({
  className,
  links,
  ...props
}: Props): React.ReactElement {
  return (
    <ul className={cx('breadcrumbs', className)} {...props}>
      {links.map(({ name, ...link }, index) => (
        <li className={cx('breadcrumbs__item')} key={index}>
          <Link {...link}>
            <a
              onClick={
                index === links.length - 1
                  ? (evt) => evt.preventDefault()
                  : undefined
              }
            >
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
