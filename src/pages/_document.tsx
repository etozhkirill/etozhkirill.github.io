import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import { defaultThemeClassName } from '@/constants/themeClassNames';

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* disable auto creating links on Safari for strings of digits that appear to the telephone numbers */}
          <meta name="format-detection" content="telephone=no" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body className={defaultThemeClassName}>
          <script src="/scripts/detecting-theme.js" />
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && renderAnalytics()}
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

function renderAnalytics() {
  const { YM_COUNTER_ID } = process.env;

  return (
    YM_COUNTER_ID && (
      <React.Fragment>
        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(${YM_COUNTER_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </React.Fragment>
    )
  );
}
