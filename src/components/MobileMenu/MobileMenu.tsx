import classnames from 'classnames/bind';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import closeIcon from '@/assets/icons/close.svg';
import Icon from '@/components/Icon';
import SocialLinks from '@/components/SocialLinks';
import GenericProps from '@/types/GenericProps';

import styles from './MobileMenu.module.scss';

const cx = classnames.bind(styles);

const DynamicThemeSwitcher = dynamic(
  () => import('@/components/ThemeSwitcher'),
  { ssr: false }
);

interface Props extends GenericProps {
  show?: boolean;
  onClose?: () => void;
}

export default function MobileMenu({
  className,
  show,
  onClose,
  ...props
}: Props): React.ReactElement {
  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        enterActive: styles['slide-enter-active'],
        enter: styles['slide-enter'],
        exit: styles['slide-exit'],
        exitActive: styles['slide-exit-active']
      }}
      unmountOnExit
    >
      <div className={cx('mobile-menu', className)} {...props}>
        <div className={cx('mobile-menu__header', 'header')}>
          <div className={cx('header__logo')}>
            <Link href="/">
              <a>Кирилл Квашонин</a>
            </Link>
          </div>
          <div className={cx('header__close-button')}>
            <button
              className={cx('close-button')}
              type="button"
              onClick={onClose}
            >
              <Icon width="24" height="24" href={`${closeIcon.src}#shape`} />
            </button>
          </div>
        </div>
        <div className={cx('mobile-menu__theme-switcher')}>
          <DynamicThemeSwitcher />
        </div>
        <div className={cx('mobile-menu__nav', 'nav')}>
          <div className={cx('nav__item')}>
            <Link href="/notes">
              <a>Блог</a>
            </Link>
          </div>
          <div className={cx('nav__item')}>
            <Link href="/about">
              <a>Обо мне</a>
            </Link>
          </div>
        </div>
        <div className={cx('mobile-menu__footer', 'footer')}>
          <SocialLinks />
        </div>
      </div>
    </CSSTransition>
  );
}
