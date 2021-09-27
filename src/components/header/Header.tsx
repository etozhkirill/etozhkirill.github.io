import classnames from 'classnames/bind';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import burgerMenuIcon from '@/assets/icons/burgerMenu.svg';
import Col from '@/components/Col';
import Container from '@/components/Container';
import Icon from '@/components/Icon';
import MobileMenu from '@/components/MobileMenu';
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
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = React.useState(false);

  return (
    <React.Fragment>
      <div className={cx('header-wrapper', className)} {...props}>
        <Container>
          <Row>
            <Col>
              <div className={cx('header')}>
                <div className={cx('header__logo')}>
                  <Link href="/">
                    <a>Кирилл Квашонин</a>
                  </Link>
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
                <div className={cx('header__burger-button')}>
                  <button
                    className={cx('burger-button')}
                    type="button"
                    onClick={() => setMobileMenuIsVisible(true)}
                  >
                    <Icon
                      width="24"
                      height="24"
                      href={`${burgerMenuIcon.src}#shape`}
                    />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <MobileMenu
        show={mobileMenuIsVisible}
        onClose={() => setMobileMenuIsVisible(false)}
      />
    </React.Fragment>
  );
}
