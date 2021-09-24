import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';

import { NoteFileContent, NoteFileShortContent } from '@/types/NoteFileContent';

export class NoteService {
  private notesFolderPath: string;

  constructor(notesFolderPath = path.join(process.cwd(), 'content/notes')) {
    this.notesFolderPath = notesFolderPath;
  }

  private async getNoteFileName(noteFolderName): Promise<string | null> {
    const noteFolderPath = path.join(this.notesFolderPath, noteFolderName);
    const noteFolderPathStat = await fs.lstat(noteFolderPath);
    if (!noteFolderPathStat.isDirectory()) return null;

    const noteFolderFiles = await fs.readdir(noteFolderPath);
    const noteFileName = noteFolderFiles.find((noteFolderFile) =>
      /.md$/i.test(noteFolderFile)
    );
    if (!noteFileName) return null;

    return noteFileName;
  }

  async getNoteList(): Promise<NoteFileShortContent[]> {
    const noteFolderNames = await fs.readdir(this.notesFolderPath);
    const noteContentsPromises = noteFolderNames.map(async (noteFolderName) => {
      const noteFileName = await this.getNoteFileName(noteFolderName);
      if (!noteFileName) return null;

      const noteFilePath = path.join(
        this.notesFolderPath,
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

  async getNote(noteFolderName: string): Promise<NoteFileContent | null> {
    const noteFileName = await this.getNoteFileName(noteFolderName);
    if (!noteFileName) return null;

    const noteFilePath = path.join(
      this.notesFolderPath,
      noteFolderName,
      noteFileName
    );
    const noteFileContent = await fs.readFile(noteFilePath, 'utf8');
    const matterResult = matter(noteFileContent);
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug: noteFolderName,
      content: contentHtml,
      data: matterResult.data
    };
  }

  async getNoteSlugList(): Promise<string[]> {
    const noteFolderNames = await fs.readdir(this.notesFolderPath);
    const resultNoteFolderNamesPromises = noteFolderNames.map(
      async (noteFolderName) => {
        const noteFileName = await this.getNoteFileName(noteFolderName);
        if (!noteFileName) return null;

        return noteFolderName;
      }
    );

    const resultNoteFolderNames = await Promise.all(
      resultNoteFolderNamesPromises
    );

    return resultNoteFolderNames.filter(filterByNull);
  }
}

export default new NoteService();

function filterByNull(val) {
  return val != null;
}
