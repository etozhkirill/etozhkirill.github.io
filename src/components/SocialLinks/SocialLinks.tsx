import classnames from 'classnames/bind';
import React from 'react';

import githubIcon from '@/assets/icons/github.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import telegramIcon from '@/assets/icons/telegram.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import Icon from '@/components/Icon';
import GenericProps from '@/types/GenericProps';

import styles from './SocialLinks.module.scss';

const cx = classnames.bind(styles);

const socials = [
  {
    link: 'https://github.com/kvashonin',
    iconSrc: githubIcon.src
  },
  {
    link: 'https://t.me/kvashonin',
    iconSrc: telegramIcon.src
  },
  {
    link: 'https://twitter.com/kvashonin',
    iconSrc: twitterIcon.src
  },
  {
    link: 'https://www.instagram.com/k.kvashonin',
    iconSrc: instagramIcon.src
  }
];

export default function SocialLinks({
  className,
  ...props
}: GenericProps): React.ReactElement {
  return (
    <div className={cx('social-links', className)} {...props}>
      {socials.map((social, index) => (
        <a
          key={index}
          className={cx('social-links__item')}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon width="24" height="24" href={`${social.iconSrc}#shape`} />
        </a>
      ))}
    </div>
  );
}
