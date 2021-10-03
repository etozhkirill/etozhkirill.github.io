import classnames from 'classnames/bind';
import React from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import Col from '@/components/Col';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Row from '@/components/Row';
import BreadcrumbsLink from '@/types/BreadcrumbsLink';

import styles from './Page.module.scss';

const cx = classnames.bind(styles);

interface Props {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbsLink[];
}

export default function Page({
  children,
  breadcrumbs
}: Props): React.ReactElement {
  return (
    <React.Fragment>
      <Header />
      <main className={cx('main')}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={cx('main__breadcrumbs')}>
            <Container>
              <Row>
                <Col>
                  <Breadcrumbs links={breadcrumbs} />
                </Col>
              </Row>
            </Container>
          </div>
        )}
        <div className={cx('main__content')}>{children}</div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
