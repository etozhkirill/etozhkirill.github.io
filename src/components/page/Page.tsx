import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props): React.ReactElement {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
