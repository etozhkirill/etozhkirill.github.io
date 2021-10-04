import classnames from 'classnames/bind';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import NoteCardSecondary from '@/components/NoteCardSecondary';
import Row from '@/components/Row';
import GenericProps from '@/types/GenericProps';
import { NoteFileShortContent } from '@/types/NoteFileContent';

import styles from './NotesPageContent.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  notes: NoteFileShortContent[];
}

export default function NotesPageContent({
  className,
  notes,
  ...props
}: Props): React.ReactElement {
  return (
    <div className={cx('notes-page-content', className)} {...props}>
      <Container>
        <Row>
          <Col>
            <div className={cx('notes-list')}>
              {notes.map((note, index) => (
                <div key={index} className={cx('notes-list__item')}>
                  <NoteCardSecondary note={note} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
