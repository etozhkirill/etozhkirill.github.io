import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import SocialLinks from '@/components/SocialLinks';
import GenericProps from '@/types/GenericProps';

import styles from './Footer.module.scss';

const cx = classnames.bind(styles);

export default function Footer({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return (
    <div className={cx('footer-wrapper', className)} {...props}>
      <Container>
        <Row>
          <Col>
            <div className={cx('footer')}>
              <div className={cx('footer__text')}>
                © Спроектировано и разработано{' '}
                <a
                  href="https://twitter.com/kvashonin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @kvashonin
                </a>{' '}
                2017 - {new Date().getFullYear()}.
              </div>
              <div className={cx('footer__social')}>
                <SocialLinks />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
