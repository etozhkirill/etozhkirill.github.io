import classnames from 'classnames/bind';
import React from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import Col from '@/components/Col';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Head from '@/components/Head';
import Header from '@/components/Header';
import Row from '@/components/Row';
import BreadcrumbsLink from '@/types/BreadcrumbsLink';

import styles from './Page.module.scss';

const cx = classnames.bind(styles);

interface Props {
  children: React.ReactNode;
  meta?: Record<string, string>;
  breadcrumbs?: BreadcrumbsLink[];
}

const defaultMeta = {
  title: 'Кирилл Квашонин: блог о веб разработке.',
  description:
    'Привет! Меня зовут Кирилл. В этом блоге я пишу о веб разработке, перевожу технические статьи и другое.',
  author: 'Кирилл Квашонин',
  'og:title': 'Кирилл Квашонин: блог о веб разработке.',
  'og:description':
    'Привет! Меня зовут Кирилл. В этом блоге я пишу о веб разработке, перевожу технические статьи и другое.',
  'og:image': `${process.env.LOCATION_ORIGIN}/og_image.png`
};

export default function Page({
  children,
  meta,
  breadcrumbs
}: Props): React.ReactElement {
  return (
    <React.Fragment>
      <Head meta={meta || defaultMeta} />
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
