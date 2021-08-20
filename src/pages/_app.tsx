import { AppProps } from 'next/app';

import Root from '@/components/Root';

import '@/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  );
}
