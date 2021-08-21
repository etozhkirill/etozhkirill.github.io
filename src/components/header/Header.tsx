import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
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
              <div className={cx('header__logo')}>logo here</div>
              <nav className={cx('header__nav', 'nav')}>
                <a href="#">Блог</a> <a href="#">Обо мне</a>
              </nav>
              <div className={cx('header__theme-switcher')}>
                theme switcher here
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
