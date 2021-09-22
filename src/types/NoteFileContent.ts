export interface NoteFileContent {
  slug: string;
  data: {
    title?: string;
    description?: string;
    image?: string;
    date?: string;
  };
  content: string;
}

export type NoteFileShortContent = Omit<NoteFileContent, 'content'>;
