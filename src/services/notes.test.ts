import { getNoteSlugList } from './notes';

describe('notes service', () => {
  test('get slugs of notes', async () => {
    const noteSlugList = await getNoteSlugList();
    expect(noteSlugList.length).toBeGreaterThan(0);
  });
});
