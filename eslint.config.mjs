// @ts-check
import js from '@eslint/js';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tsEslint from 'typescript-eslint';

import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  // JavaScript base config
  js.configs.recommended,

  // TypeScript config
  tsEslint.configs.recommended,
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // React, Next.js, React Hooks
  eslintPluginReact.configs.recommended,
  eslintPluginReact.configs['jsx-runtime'],
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      '@next': eslintPluginNext,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
      'react/prop-types': 'off',
    },
  },

  // Import / Unused imports / Tailwind CSS
  {
    plugins: {
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      tailwindcss,
    },
    rules: {
      // Unused
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'unused-imports/no-unused-imports': 'error',

      // Import sort (fallback, prettierで制御)
      'import/order': 'warn',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Tailwind
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',

      // Style
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Default export制限（ただし stories は除外）
      'import/no-default-export': 'error',
    },
  },

  // Storybook override
  {
    files: ['**/*.stories.@(ts|tsx)', '**/*.story.@(ts|tsx)'],
    plugins: {
      storybook: eslintPluginStorybook,
    },
    rules: {
      'storybook/await-interactions': 'warn',
      'storybook/context-in-play-function': 'warn',
      'storybook/default-exports': 'warn',
      'import/no-default-export': 'off',
    },
  },

  // Prettier compatibility
  eslintConfigPrettier,
];
