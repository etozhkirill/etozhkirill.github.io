import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import IndexPageContent from '@/components/index-page-content';

export default function IndexPage() {
  return (
    <React.Fragment>
      <Header />
      <IndexPageContent />
      <Footer />
    </React.Fragment>
  );
}
