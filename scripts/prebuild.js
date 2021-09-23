const fs = require('fs').promises;
const path = require('path');

const buildFolderPath = path.join(process.cwd(), 'build');

(async () => {
  console.log('Start removing old build...');

  try {
    await fs.rm(buildFolderPath, { recursive: true, force: true });
  } catch (err) {
    console.error(error);
  }

  console.log('Old build was removed.');
})();
