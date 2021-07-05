import memojiImg from '@src/assets/images/memoji.png';

import styles from './styles.module.scss';

export default function IndexPageContent() {
  return (
    <div>
      <img src={memojiImg.src} alt="ava" />
      <div className={styles.block} />
    </div>
  );
}
