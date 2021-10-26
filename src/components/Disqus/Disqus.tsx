import { DiscussionEmbed } from 'disqus-react';
import React from 'react';

import { useThemeContext } from '@/contexts/theme';
import { NoteFileContent } from '@/types/NoteFileContent';

interface Props {
  note: NoteFileContent;
}

export default function Disqus({ note }: Props): React.ReactElement {
  const [render, setRender] = React.useState(false);
  const { activeThemeName } = useThemeContext();

  // force reload disqus on changing theme
  React.useEffect(() => {
    setRender(false);
    setTimeout(() => setRender(true), 0);
  }, [activeThemeName]);

  if (!render) return null;

  return (
    <DiscussionEmbed
      shortname="kirillurgant"
      config={{
        language: 'ru',
        identifier: note.slug,
        title: note.data.title
      }}
    />
  );
}
