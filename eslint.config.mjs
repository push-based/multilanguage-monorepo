import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Temporary disabled
    // rules: {
    //   '@nx/enforce-module-boundaries': [
    //     'error',
    //     {
    //       enforceBuildableLibDependency: true,
    //       allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
    //       depConstraints: [
    //         {
    //           sourceTag: 'lang:react',
    //           onlyDependOnLibsWithTags: ['lang:react'],
    //         },
    //         {
    //           sourceTag: 'lang:dotnet',
    //           onlyDependOnLibsWithTags: ['lang:dotnet'],
    //         },
    //         {
    //           sourceTag: 'scope:transactions',
    //           onlyDependOnLibsWithTags: ['scope:transactions', 'scope:shared'],
    //         },
    //         {
    //           sourceTag: 'scope:shared',
    //           onlyDependOnLibsWithTags: ['scope:shared'],
    //         },
    //       ],
    //     },
    //   ],
    // },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
