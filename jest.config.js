const esModules = ['lowlight', 'fault', 'hast-util-to-text'].join('|');

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
  https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})/.*`,
    '^.+\\.module\\.(css|sass|scss)$'
  ]
};
