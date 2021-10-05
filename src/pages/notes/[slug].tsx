import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import NotePageContent from '@/components/NotePageContent';
import Page from '@/components/Page';
import noteService from '@/services/NoteService';
import BreadcrumbsLink from '@/types/BreadcrumbsLink';
import { NoteFileContent } from '@/types/NoteFileContent';

export default function NotePage({
  note
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs: BreadcrumbsLink[] = [
    { href: '/', name: 'Главная' },
    { href: '/notes', name: 'Блог' },
    { href: `/notes/${note.slug}`, name: note.data.title }
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <NotePageContent note={note} />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const noteSlugs = await noteService.getNoteSlugList();

  const paths = noteSlugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ note: NoteFileContent }> =
  async ({ params }) => {
    const { slug } = params;
    const noteFolderName = Array.isArray(slug) ? slug[0] : slug;
    const note = await noteService.getNote(noteFolderName);

    return { props: { note } };
  };
