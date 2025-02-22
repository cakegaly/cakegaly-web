// @ts-ignore

import eslint from '@eslint/js';
import eslintConfigNext from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tsEslint from 'typescript-eslint';

export default [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  },
  {
    ignores: [
      '**/build/',
      '**/bin/',
      '**/dist/',
      '**/obj/',
      '**/out/',
      '**/.next/',
      '**/node_modules/',
    ],
  },
  eslint.configs.recommended,
  eslintConfigNext(),
  tsEslint.configs.recommended,
  {
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
