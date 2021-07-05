import { AppProps } from 'next/app';

import Root from '@src/components/layout/root';

import '@src/styles/main.scss';

export default function App({Component, pageProps}: AppProps) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  );
}
