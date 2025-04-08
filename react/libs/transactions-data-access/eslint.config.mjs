import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';
import jsonc from 'jsonc-eslint-parser';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
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
    rules: {},
  },
];
