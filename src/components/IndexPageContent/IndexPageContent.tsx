import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';

import memojiImg from '@/assets/images/memoji.png';
import Col from '@/components/Col';
import Container from '@/components/Container';
import LazyImage from '@/components/LazyImage';
import NoteCard from '@/components/NoteCard';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';
import { NoteFileShortContent } from '@/types/NoteFileContent';

import styles from './IndexPageContent.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  notes: NoteFileShortContent[];
}

export default function IndexPageContent({
  className,
  notes,
  ...props
}: Props): React.ReactElement {
  return (
    <div className={cx('index-page-content', className)} {...props}>
      <div className={cx('index-page-content__jumbotron')}>
        <Container className={cx('jumbotron')}>
          <Row className={cx('jumbotron__row')}>
            <Col xs={12} sm={6} md={7} className={cx('jumbotron__col')}>
              <div className={cx('content')}>
                <h1 className={cx('content__title')}>
                  Привет! <br />
                  Меня зовут Кирилл.
                </h1>
                <div className={cx('content__description')}>
                  В этом блоге я пишу о веб разработке, перевожу технические
                  статьи и другое.
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={5} className={cx('jumbotron__col')}>
              <div className={cx('content')}>
                <div className={cx('content__image')}>
                  <img src={memojiImg.src} alt="memoji" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={cx('index-page-content__last-notes')}>
        <Container>
          <Row>
            <Col>
              <h3 className={cx('last-notes-title')}>Последние записи</h3>
            </Col>
          </Row>
          <Row>{renderLatestNotes()}</Row>
        </Container>
      </div>
    </div>
  );

  function renderLatestNotes() {
    return notes.map((note, index) => (
      <Col xs={12} lg={4} key={index} className={cx('notes-list-col')}>
        <NoteCard note={note} />
      </Col>
    ));
  }
}
