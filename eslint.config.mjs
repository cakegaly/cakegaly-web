// @ts-check

import js from '@eslint/js';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import tsEslint from 'typescript-eslint';

import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

export default [
  // Base configuration
  { files: ['*.js', '*.jsx', '*.ts', '*.tsx'] },
  {
    ignores: [
      '**/build/',
      '**/bin/',
      '**/dist/',
      '**/obj/',
      '**/out/',
      '**/.next/',
      '**/node_modules/',
      '**/storybook-static/',
    ],
  },

  // TypeScript configuration
  {
    name: 'eslint/recommended',
    rules: js.configs.recommended.rules,
  },
  ...tsEslint.configs.recommended,

  // React configuration
  {
    name: 'react/jsx-runtime',
    plugins: {
      react: eslintPluginReact,
    },
    rules: eslintPluginReact.configs['jsx-runtime'].rules,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'react-hooks/recommended',
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },

  // Next.js configuration
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
    },
  },

  // Tailwind CSS
  {
    name: 'tailwindcss/rules',
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
    },
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },

  // Storybook plugin
  {
    name: 'storybook/rules',
    files: ['**/*.stories.@(ts|tsx)', '**/*.story.@(ts|tsx)'],
    plugins: {
      storybook: eslintPluginStorybook,
    },
    rules: {
      'storybook/await-interactions': 'warn',
      'storybook/default-exports': 'warn',
    },
  },

  // Prettier compatibility
  {
    name: 'prettier/config',
    ...eslintConfigPrettier,
  },

  // Project config files
  {
    files: ['postcss.config.js', 'next.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        module: 'writable',
        require: 'readonly',
      },
    },
  },
  {
    files: ['tailwind.config.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Project custom rules
  {
    name: 'project-custom',
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
