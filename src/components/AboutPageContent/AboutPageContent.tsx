import classnames from 'classnames/bind';
import dayjs from 'dayjs';
import React from 'react';

import photo from '@/assets/images/photo.jpeg';
import Col from '@/components/Col';
import Container from '@/components/Container';
import LazyImage from '@/components/LazyImage';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';

import styles from './AboutPageContent.module.scss';

const cx = classnames.bind(styles);

export default function AboutPageContent({
  className,
  ...props
}: GenericProps): React.ReactElement {
  const age = getAge('1992-06-01');

  return (
    <div className={cx('about-page-content-wrapper', className)} {...props}>
      <Container className={cx('about-page-content')}>
        <Row className={cx('about-page-content__row')}>
          <Col className={cx('about-page-content__col')}>
            <h1 className={cx('title')}>Обо мне</h1>
          </Col>
        </Row>
        <Row className={cx('about-page-content__row')}>
          <Col xs={12} md={6} className={cx('about-page-content__col')}>
            <div className={cx('photo')}>
              <LazyImage height="464px" adaptHeight src={photo.src} />
            </div>
          </Col>
          <Col xs={12} md={6} className={cx('about-page-content__col')}>
            <div className={cx('content')}>
              <p className={cx('content__paragraph')}>
                Привет! Меня зовут Кирилл. Мне {age}. Живу в{' '}
                <span className={cx('previous')}>Кирове</span> →{' '}
                <span className={cx('current')}>Санкт-Петербурге</span>, работаю
                в{' '}
                <a
                  className={cx('previous')}
                  href="https://studio107.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Studio107
                </a>{' '}
                →{' '}
                <a
                  className={cx('previous')}
                  href="https://mobirise.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mobirise
                </a>{' '}
                →{' '}
                <a
                  className={cx('previous')}
                  href="https://www.tradesoft.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Трэйдсофт
                </a>{' '}
                →{' '}
                <a
                  className={cx('current')}
                  href="https://koshelek.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Кошелёк
                </a>
                , занимаюсь фронтэнд разработкой.
              </p>
              <p className={cx('content__paragraph')}>
                C 2017 года веду блог по веб разработке, пишу и перевожу статьи
                на данном сайте.
              </p>
              <p className={cx('content__paragraph')}>
                <div>
                  <a
                    href="https://github.com/kvashonin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/kvashonin
                  </a>{' '}
                  - гитхаб
                </div>
                <div>
                  <a
                    href="https://t.me/kvashonin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://t.me/kvashonin
                  </a>{' '}
                  - телеграм
                </div>
                <div>
                  <a
                    href="https://twitter.com/kvashonin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://twitter.com/kvashonin
                  </a>{' '}
                  - твиттер
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/k.kvashonin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.instagram.com/k.kvashonin
                  </a>{' '}
                  - инстаграм
                </div>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function getAge(birthDate: string) {
  const now = dayjs(new Date());
  const age = now.diff(birthDate, 'y');

  let ageText: string;

  if (age >= 5 && age <= 20) {
    ageText = 'год';
  } else {
    const count = age % 10;

    if (count === 1) {
      ageText = 'год';
    } else if (count >= 2 && count <= 4) {
      ageText = 'года';
    } else {
      ageText = 'лет';
    }
  }

  return `${age} ${ageText}`;
}
