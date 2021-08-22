import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Row from '@/components/Row';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import GenericProps from '@/types/GenericProps';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

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
                <ThemeSwitcher />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
