import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import LazyImage from '@/components/LazyImage';
import formatDate from '@/helpers/formatDate';
import GenericProps from '@/types/GenericProps';
import { NoteFileShortContent } from '@/types/NoteFileContent';

import styles from './NoteCard.module.scss';

const cx = classnames.bind(styles);

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

interface Props extends GenericProps {
  note: NoteFileShortContent;
}

export default function NoteCard({
  className,
  note,
  ...props
}: Props): React.ReactElement {
  return (
    <Link href={`/notes/${note.slug}`}>
      <a className={cx('note-card-link', className)} {...props}>
        <div className={cx('note-card')}>
          <div className={cx('note-card__image')}>
            <LazyImage
              height="180px"
              type="background-image"
              src={`/notes/${note.slug}/${note.data.image}`}
            />
          </div>
          <div className={cx('note-card__content')}>
            <div className={cx('note-card__title')}>
              <ResponsiveEllipsis
                text={note.data.title}
                maxLine={2}
                ellipsis=" ..."
              />
            </div>
            <div className={cx('note-card__description')}>
              <ResponsiveEllipsis
                text={note.data.description}
                maxLine={6}
                ellipsis=" ..."
              />
            </div>
            <div className={cx('note-card__footer', 'footer')}>
              <div className={cx('footer__date')}>
                {formatDate(note.data.date)}
              </div>
              <div className={cx('footer__more')}>Читать</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
