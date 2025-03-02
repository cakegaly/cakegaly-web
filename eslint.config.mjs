// @ts-check

import eslintPluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tailwindcss from 'eslint-plugin-tailwindcss';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
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
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      '@next': eslintPluginNext,
    },
    ...eslintPluginReactHooks.configs.recommended.rules,
    ...eslintPluginNext.configs.recommended.rules,
    ...eslintPluginNext.configs['core-web-vitals'].rules,
    '@next/next/no-img-element': 'error',
    'react/prop-types': 'off',
  },
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
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            // React imports
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react/**', group: 'builtin', position: 'before' },

            // Next.js imports
            { pattern: 'next', group: 'builtin', position: 'before' },
            { pattern: 'next/**', group: 'builtin', position: 'before' },

            // Types
            { pattern: 'types', group: 'type', position: 'before' },

            // Project imports by path alias - adjusted for src/ directory
            { pattern: '@/env*', group: 'internal', position: 'before' },
            { pattern: '@/types/**', group: 'internal', position: 'before' },
            { pattern: '@/config/**', group: 'internal', position: 'before' },
            { pattern: '@/lib/**', group: 'internal', position: 'before' },
            { pattern: '@/hooks/**', group: 'internal', position: 'before' },
            {
              pattern: '@/components/ui/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            { pattern: '@/styles/**', group: 'internal', position: 'before' },
            { pattern: '@/app/**', group: 'internal', position: 'before' },
            { pattern: '@/assets/**', group: 'internal', position: 'before' },
            { pattern: '@/content/**', group: 'internal', position: 'before' },

            // For direct imports from src/ directory (if any)
            { pattern: 'src/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'never',
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
  eslintConfigPrettier,
];
