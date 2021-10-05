import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';

import styles from './NotFoundPageContent.module.scss';

const cx = classnames.bind(styles);

export default function NotFoundPageContent({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return (
    <div className={cx('wrapper', className)} {...props}>
      <Container>
        <Row>
          <Col>
            <h1 className={cx('title')}>404</h1>
            <p className={cx('description')}>Страница не найдена.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
