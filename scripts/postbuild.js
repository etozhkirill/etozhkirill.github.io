const fs = require('fs').promises;
const path = require('path');
const cpy = require('cpy');

const notesFolderPath = path.join(process.cwd(), 'content/notes');
const buildFolderPath = path.join(process.cwd(), 'build');
const assetsFolderName = 'assets';

(async () => {
  console.log('Start copying assets of notes to build...');

  const noteFolderNames = await fs.readdir(notesFolderPath);
  const copyingPromises = noteFolderNames.map(async (noteFolderName) => {
    const assetsFolderSrc = path.join(
      notesFolderPath,
      noteFolderName,
      assetsFolderName
    );
    const assetsFolderDest = path.join(
      buildFolderPath,
      'notes',
      noteFolderName,
      assetsFolderName
    );

    try {
      await fs.access(assetsFolderSrc);
    } catch {
      return null;
    }

    return cpy(assetsFolderSrc, assetsFolderDest);
  });

  await Promise.all(copyingPromises);

  console.log('Assets were copied to build.');

  console.log('Copy 404 page...');
  await fs.copyFile(
    path.join(buildFolderPath, '404/index.html'),
    path.join(buildFolderPath, '404.html')
  );
})();
