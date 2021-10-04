import { InferGetStaticPropsType, GetStaticProps } from 'next';
import React from 'react';

import NotesPageContent from '@/components/NotesPageContent';
import Page from '@/components/Page';
import noteService from '@/services/NoteService';
import BreadcrumbsLink from '@/types/BreadcrumbsLink';
import { NoteFileShortContent } from '@/types/NoteFileContent';

const breadcrumbs: BreadcrumbsLink[] = [
  { href: '/', name: 'Главная' },
  { href: '/notes', name: 'Блог' }
];

export default function NotesPage({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page breadcrumbs={breadcrumbs}>
      <NotesPageContent notes={notes} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<{ notes: NoteFileShortContent[] }> =
  async () => {
    const notes = await noteService.getNoteList();

    return { props: { notes } };
  };
