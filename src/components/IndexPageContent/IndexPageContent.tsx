import classnames from 'classnames/bind';
import React from 'react';

import memojiImg from '@/assets/images/memoji.png';
import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';
import NoteFileContent from '@/types/NoteFileContent';

import styles from './IndexPageContent.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  notes: NoteFileContent[];
}

export default function IndexPageContent({
  className,
  notes,
  ...props
}: Props): React.ReactElement {
  return (
    <div className={cx('index-page-content', className)} {...props}>
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
        <Row>
          <Col>
            {notes.map((note, index) => (
              <div key={index}>
                <div>{note.data.title}</div>
                <div>{note.data.description}</div>
                <div>{note.data.date}</div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
