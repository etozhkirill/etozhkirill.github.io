import { InferGetStaticPropsType, GetStaticProps } from 'next';
import React from 'react';

import IndexPageContent from '@/components/IndexPageContent';
import Page from '@/components/Page';
import { getNotes } from '@/helpers/notes';
import NoteFileContent from '@/types/NoteFileContent';

export default function IndexPage({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <IndexPageContent notes={notes} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<{ notes: NoteFileContent[] }> =
  async () => {
    const notes = await getNotes();

    return { props: { notes } };
  };
