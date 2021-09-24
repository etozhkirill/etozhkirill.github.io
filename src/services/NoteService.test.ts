import path from 'path';

import { NoteService } from './NoteService';

describe('notes service', () => {
  describe('invalid notes folder path', () => {
    const noteService = createNoteService('src/mocks/mockNotes/invalidpath');

    it('getNoteList should throw', async () => {
      await expect(noteService.getNoteList()).rejects.toThrow();
    });

    it('getNote should throw', async () => {
      await expect(noteService.getNote('test')).rejects.toThrow();
    });

    it('getNoteSlugList should throw', async () => {
      await expect(noteService.getNoteSlugList()).rejects.toThrow();
    });
  });

  describe('empty notes folder', () => {
    const noteService = createNoteService(
      'src/mocks/mockNotes/emptyNotesFolder'
    );

    it('getNoteList should return empty list', async () => {
      await expect(noteService.getNoteList()).resolves.toHaveLength(0);
    });

    it('getNoteSlugList should return empty list', async () => {
      await expect(noteService.getNoteSlugList()).resolves.toHaveLength(0);
    });
  });

  describe('notes folder with one empty note', () => {
    const noteService = createNoteService(
      'src/mocks/mockNotes/notesFolderWithOneEmptyNote'
    );

    it('getNoteList should return empty list', async () => {
      await expect(noteService.getNoteList()).resolves.toHaveLength(0);
    });

    it('getNoteSlugList should return empty list', async () => {
      await expect(noteService.getNoteSlugList()).resolves.toHaveLength(0);
    });
  });

  describe('notes folder with one empty note and two valid notes', () => {
    const noteService = createNoteService(
      'src/mocks/mockNotes/notesFolderWithOneEmptyNoteAndTwoValid'
    );

    it('getNoteList should return 2 note', async () => {
      await expect(noteService.getNoteList()).resolves.toHaveLength(2);
    });

    it('getNoteSlugList should return 2 slug', async () => {
      await expect(noteService.getNoteSlugList()).resolves.toHaveLength(2);
    });

    it('getNote should return null', async () => {
      await expect(noteService.getNote('empty')).resolves.toBeNull();
    });

    it('getNote should return note', async () => {
      const note = await noteService.getNote('note1');
      expect(note.data).toBeDefined();
      expect(note.content).toBeDefined();
      expect(note.slug).toBeDefined();
    });

    it('getNote should return note', async () => {
      const note = await noteService.getNote('note2');
      expect(note.data).toBeDefined();
      expect(note.content).toBeDefined();
      expect(note.slug).toBeDefined();
    });
  });
});

function createNoteService(relativeNotesFolderPath) {
  const mockNotesFolderPath = path.join(process.cwd(), relativeNotesFolderPath);

  return new NoteService(mockNotesFolderPath);
}
