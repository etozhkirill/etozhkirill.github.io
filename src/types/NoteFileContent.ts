export default interface NoteFileContent {
  slug: string;
  data: {
    title?: string;
    description?: string;
    date?: string;
  };
  content: string;
}
