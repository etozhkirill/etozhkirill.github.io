import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import NoteFileContent from '@/types/NoteFileContent';

const notesFolderPath = path.join(process.cwd(), 'content/notes');

export async function getNotes(): Promise<NoteFileContent[]> {
  const noteFolderNames = await fs.readdir(notesFolderPath);
  const noteContentsPromises = noteFolderNames.map(async (noteFolderName) => {
    const noteFileName = await getNoteFileName(noteFolderName);
    if (!noteFileName) return null;

    const noteFilePath = path.join(
      notesFolderPath,
      noteFolderName,
      noteFileName
    );
    const noteFileContent = await fs.readFile(noteFilePath, 'utf8');
    const { content, data } = matter(noteFileContent);

    return { slug: noteFolderName, content, data };
  });

  const noteContents = await Promise.all(noteContentsPromises);

  return noteContents.filter(filterByNull);
}

export async function getNote(
  noteFolderName: string
): Promise<NoteFileContent | null> {
  const noteFileName = await getNoteFileName(noteFolderName);
  if (!noteFileName) return null;

  const noteFilePath = path.join(notesFolderPath, noteFolderName, noteFileName);
  const noteFileContent = await fs.readFile(noteFilePath, 'utf8');
  const { content, data } = matter(noteFileContent);

  return { slug: noteFolderName, content, data };
}

export async function getNoteSlugs(): Promise<string[]> {
  const noteFolderNames = await fs.readdir(notesFolderPath);
  const resultNoteFolderNamesPromises = noteFolderNames.map(
    async (noteFolderName) => {
      const noteFileName = await getNoteFileName(noteFolderName);
      if (!noteFileName) return null;

      return noteFolderName;
    }
  );

  const resultNoteFolderNames = await Promise.all(
    resultNoteFolderNamesPromises
  );

  return resultNoteFolderNames.filter(filterByNull);
}

async function getNoteFileName(noteFolderName): Promise<string | null> {
  const noteFolderPath = path.join(notesFolderPath, noteFolderName);
  const noteFolderPathStat = await fs.lstat(noteFolderPath);
  if (!noteFolderPathStat.isDirectory()) return null;

  const noteFolderFiles = await fs.readdir(noteFolderPath);
  const noteFileName = noteFolderFiles.find((noteFolderFile) =>
    /.md$/i.test(noteFolderFile)
  );
  if (!noteFileName) return null;

  return noteFileName;
}

function filterByNull(val) {
  return val != null;
}
