import baseConfig from './eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/package.json'],
    // Override or add rules here
    rules: {
      '@nx/dependency-checks': 'error'
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
