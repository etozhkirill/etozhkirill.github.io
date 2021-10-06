import NextHead from 'next/head';
import React from 'react';

interface Props {
  meta: Record<string, string>;
}

export default function Head({ meta }: Props): React.ReactElement {
  return (
    <NextHead>
      {Object.keys(meta).map((metaKey) => {
        const metaValue = meta[metaKey];

        if (metaKey === 'title') {
          return <title key={metaKey}>{metaValue}</title>;
        }

        return <meta name={metaKey} content={metaValue} key={metaKey} />;
      })}
    </NextHead>
  );
}
