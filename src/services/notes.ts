import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { NoteFileContent, NoteFileShortContent } from '@/types/NoteFileContent';

const notesFolderPath = path.join(process.cwd(), 'content/notes');

export async function getNoteList(): Promise<NoteFileShortContent[]> {
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
    const { data } = matter(noteFileContent);

    return { slug: noteFolderName, data };
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
  const matterResult = matter(noteFileContent);
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug: noteFolderName,
    content: contentHtml,
    data: matterResult.data
  };
}

export async function getNoteSlugList(): Promise<string[]> {
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
