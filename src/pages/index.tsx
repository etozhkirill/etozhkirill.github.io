import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import IndexPageContent from '@/components/IndexPageContent';

export default function IndexPage() {
  return (
    <React.Fragment>
      <Header />
      <IndexPageContent />
      <Footer />
    </React.Fragment>
  );
}
