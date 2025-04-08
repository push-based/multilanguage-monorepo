import cypress from 'eslint-plugin-cypress/flat';
import baseConfig from '../../../eslint.config.mjs';
import jsonc from 'jsonc-eslint-parser';

export default [
  cypress.configs['recommended'],
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': 'error'
    },
    languageOptions: {
      parser: jsonc
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {}
  },
];
