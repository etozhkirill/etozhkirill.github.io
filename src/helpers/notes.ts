import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import NoteFileContent from '@/types/NoteFileContent';

export async function getNotes(): Promise<NoteFileContent[]> {
  const notesFolderPath = path.join(process.cwd(), 'src/notes');

  const noteFileNames = await fs.readdir(notesFolderPath);
  const noteFileContents = noteFileNames.map(async (noteFileName) => {
    const noteFileBasename = path.basename(noteFileName, '.md');
    const noteFilePath = path.join(notesFolderPath, noteFileName);
    const noteFileContent = await fs.readFile(noteFilePath, 'utf8');

    const { content, data } = matter(noteFileContent);

    return { slug: noteFileBasename, content, data };
  });

  return Promise.all(noteFileContents);
}
