import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';

import LazyImage from '@/components/LazyImage';
import formatDate from '@/helpers/formatDate';
import GenericProps from '@/types/GenericProps';
import { NoteFileShortContent } from '@/types/NoteFileContent';

import styles from './NoteCardSecondary.module.scss';

const cx = classnames.bind(styles);

interface Props extends GenericProps {
  note: NoteFileShortContent;
}

export default function NoteCardSecondary({
  className,
  note,
  ...props
}: Props): React.ReactElement {
  return (
    <Link href={`/notes/${note.slug}`}>
      <a className={cx('note-card-link', className)} {...props}>
        <div className={cx('note-card-secondary')}>
          <h2 className={cx('note-card-secondary__title')}>
            {note.data.title}
          </h2>
          <div className={cx('note-card-secondary__date')}>
            {formatDate(note.data.date)}
          </div>
          <div className={cx('note-card-secondary__content', 'content')}>
            <div className={cx('content__image')}>
              <LazyImage
                height="240px"
                type="background-image"
                src={`/notes/${note.slug}/${note.data.image}`}
              />
            </div>
            <div className={cx('content__description')}>
              <div className={cx('content__description-text')}>
                {note.data.description}
              </div>
              <div className={cx('content__description-more')}>Читать</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
