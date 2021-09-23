import { InferGetStaticPropsType, GetStaticProps } from 'next';
import React from 'react';

import IndexPageContent from '@/components/IndexPageContent';
import Page from '@/components/Page';
import { getNoteList } from '@/services/notes';
import { NoteFileShortContent } from '@/types/NoteFileContent';

export default function IndexPage({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <IndexPageContent notes={notes} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<{ notes: NoteFileShortContent[] }> =
  async () => {
    const notes = await getNoteList();

    return { props: { notes } };
  };
