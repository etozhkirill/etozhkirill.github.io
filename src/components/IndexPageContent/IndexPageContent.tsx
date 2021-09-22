import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';

import memojiImg from '@/assets/images/memoji.png';
import Col from '@/components/Col';
import Container from '@/components/Container';
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
        <Container>
          <Row className={cx('row')}>
            <Col className={cx('col')}>
              <div className={cx('content')}>
                <h1 className={cx('content__title')}>
                  Привет! <br />
                  Меня зовут Кирилл.
                </h1>
                <div className={cx('content__description')}>
                  В этом блоге я пишу о веб разработке, перевожу технические
                  статьи и другое.
                </div>
              </div>
            </Col>
            <Col className={cx('col')}>
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
              <div className={cx('latest-notes__title')}>Последние записи</div>
              <div className={cx('latest-notes__list')}>
                {renderLatestNotes()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );

  function renderLatestNotes() {
    return notes.map((note, index) => (
      <Link key={index} href={`/notes/${note.slug}`}>
        <a>
          <div className={cx('note')}>
            <div className={cx('note__title')}>{note.data.title}</div>
            <div className={cx('note__description')}>
              {note.data.description}
            </div>
            <div className={cx('note__date')}>{note.data.date}</div>
          </div>
        </a>
      </Link>
    ));
  }
}
