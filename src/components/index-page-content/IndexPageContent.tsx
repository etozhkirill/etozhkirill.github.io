import classnames from 'classnames/bind';

import memojiImg from '@/assets/images/memoji.png';

import styles from './IndexPageContent.module.scss';

const cx = classnames.bind(styles);

export default function IndexPageContent() {
  return (
    <div>
      <img src={memojiImg.src} alt="ava" />
      <div className={styles.block} />
    </div>
  );
}
