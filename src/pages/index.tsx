import { InferGetStaticPropsType } from 'next';
import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import IndexPageContent from '@/components/IndexPageContent';
import { getNotes } from '@/helpers/notes';

export default function IndexPage({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <React.Fragment>
      <Header />
      <IndexPageContent notes={notes} />
      <Footer />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const notes = await getNotes();

  return { props: { notes } };
}
