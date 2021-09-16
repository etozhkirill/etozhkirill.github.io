import classnames from 'classnames/bind';
import dynamic from 'next/dynamic';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

const DynamicThemeSwitcher = dynamic(
  () => import('@/components/ThemeSwitcher'),
  { ssr: false }
);

export default function Header({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return (
    <div className={cx('header-wrapper', className)} {...props}>
      <Container>
        <Row>
          <Col>
            <div className={cx('header')}>
              <div className={cx('header__logo')}>
                <Logo />
              </div>
              <nav className={cx('header__nav', 'nav')}>
                <a className={cx('nav__item')} href="#">
                  Блог
                </a>{' '}
                <a className={cx('nav__item')} href="#">
                  Обо мне
                </a>
              </nav>
              <div className={cx('header__theme-switcher')}>
                <DynamicThemeSwitcher />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
