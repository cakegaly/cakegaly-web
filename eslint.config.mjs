// @ts-ignore

import eslint from '@eslint/js';
import eslintConfigNext from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tsEslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  eslintConfigNext(),
  tsEslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/', '.next/', 'public/'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  tailwindcss,
  eslintConfigPrettier,
];
