import classnames from 'classnames/bind';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';

import { loadImage } from '@/helpers/lazyLoading';

import styles from './LazyImage.module.scss';

const cx = classnames.bind(styles);

interface Props {
  className?: string;
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  adaptHeight?: boolean;
  type?: 'image' | 'background-image';
}

export default function LazyImage({
  className,
  src,
  alt,
  width = '100%',
  height = '200px',
  adaptHeight,
  type = 'image'
}: Props): React.ReactElement {
  const [layoutRef, inView] = useInView({ triggerOnce: true });
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false);

  const memoizedHeight = React.useMemo(computeHeight, [
    adaptHeight,
    height,
    imageIsLoaded,
    type
  ]);

  React.useEffect(loadImageEffect, [inView, src]);

  return (
    <div
      ref={layoutRef}
      className={cx('lazy-image', className)}
      style={{ width, height: `${memoizedHeight}` }}
    >
      {renderImage()}
      <CSSTransition
        in={!imageIsLoaded}
        timeout={200}
        classNames={{
          enterActive: styles['fade-enter-active'],
          enter: styles['fade-enter'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active']
        }}
        unmountOnExit
      >
        <div className={cx('lazy-image__placeholder')} />
      </CSSTransition>
    </div>
  );

  function renderImage() {
    if (!imageIsLoaded) return null;

    if (type === 'image') {
      return (
        <img
          className={cx('lazy-image__image', {
            'lazy-image__image_adapt-height': adaptHeight
          })}
          src={src}
          alt={alt}
        />
      );
    }

    return (
      <div
        className={cx('lazy-image__background-image')}
        style={{ backgroundImage: `url(${src})` }}
      />
    );
  }

  function loadImageEffect() {
    if (!inView) return;

    loadImage(src).then(() => setImageIsLoaded(true));
  }

  function computeHeight() {
    if (imageIsLoaded && type === 'image' && adaptHeight) return 'auto';

    return height;
  }
}
