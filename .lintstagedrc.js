module.exports = {
  'src/**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,js,jsx,ts,tsx,md,html,css,scss}': 'prettier --write'
};
