import { AppProps } from 'next/app';

import Root from '@/components/layout/root';

import '@/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  );
}
