import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import LazyImage from '@/components/LazyImage';
import Row from '@/components/Row';
import formatDate from '@/helpers/formatDate';
import GenericProps from '@/types/GenericProps';
import { NoteFileContent } from '@/types/NoteFileContent';

import styles from './NotePageContent.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  note: NoteFileContent;
}

export default function NotePageContent({
  className,
  note,
  ...props
}: Props): React.ReactElement {
  return (
    <div className={cx('note-page-content-wrapper', className)} {...props}>
      <Container>
        <Row>
          <Col>
            <div className={cx('note-page-content')}>
              <h1 className={cx('note-page-content__title')}>
                {note.data.title}
              </h1>
              <div className={cx('note-page-content__date')}>
                {formatDate(note.data.date)}
              </div>
              <div className={cx('note-page-content__image')}>
                <LazyImage
                  height={'100%'}
                  /*src={note.data.image}*/ src="https://kirillurgant.com/uploads/making-the-move-from-jquery-to-vue/2019-4-5_22-50-3.jpeg"
                />
              </div>
              <div
                className={cx('note-page-content__content')}
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
