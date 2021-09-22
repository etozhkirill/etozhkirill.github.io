import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import Col from '@/components/Col';
import Container from '@/components/Container';
import Page from '@/components/Page';
import Row from '@/components/Row';
import { getNote, getNoteSlugs } from '@/services/notes';
import { NoteFileContent } from '@/types/NoteFileContent';

export default function NotePage({
  note
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <Container>
        <Row>
          <Col>
            <h1>{note.data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </Col>
        </Row>
      </Container>
    </Page>
  );
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
