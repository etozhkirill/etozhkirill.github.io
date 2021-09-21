import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import Page from '@/components/Page';
import { getNote, getNoteSlugs } from '@/helpers/notes';
import NoteFileContent from '@/types/NoteFileContent';

export default function NotePage({
  note
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Page>{note.data.title}</Page>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const noteSlugs = await getNoteSlugs();

  const paths = noteSlugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ note: NoteFileContent }> =
  async ({ params }) => {
    const { slug } = params;
    const noteFolderName = Array.isArray(slug) ? slug[0] : slug;
    const note = await getNote(noteFolderName);

    return { props: { note } };
  };
