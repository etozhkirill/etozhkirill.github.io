import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
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
              © Спроектировано и разработано{' '}
              <a
                href="https://github.com/etozhkirill"
                target="_blank"
                rel="noopener noreferrer"
              >
                @etozhkirill
              </a>{' '}
              2017..2021.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
