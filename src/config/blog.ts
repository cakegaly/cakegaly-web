import { AuthorConfig } from '@/types';

import type { TechIcons } from '@/components/icons';

export const author: AuthorConfig = {
  slug: 'cakegaly',
  name: 'cakegaly',
  image: 'https://github.com/cakegaly.png',
  twitter: 'cakegaly',
};

export const tags: Record<
  string,
  { name: string; icon: keyof typeof TechIcons }
> = {
  eslint: { name: 'ESLint', icon: 'eslint' },
  jamstack: { name: 'Jamstack', icon: 'jamstack' },
  nextjs: { name: 'Next.js', icon: 'nextjs' },
  react: { name: 'React', icon: 'react' },
  tailwindcss: { name: 'Tailwind CSS', icon: 'tailwindcss' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  vercel: { name: 'Vercel', icon: 'vercel' },
  vscode: { name: 'VSCode', icon: 'vscode' },
  wordpress: { name: 'WordPress', icon: 'wordpress' },
};

export const ellyTheme = {
  name: 'elly',
  type: 'dark',
  colors: {
    'editor.background': '#111A1F',
    'editor.foreground': '#C4C4C4',
  },
  tokenColors: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#6A6A6A',
      },
    },
    {
      scope: ['string'],
      settings: {
        foreground: '#98A982',
      },
    },
    {
      scope: ['keyword'],
      settings: {
        foreground: '#89B8D3',
      },
    },
    {
      scope: ['variable', 'constant'],
      settings: {
        foreground: '#AD9876',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#93ACBC',
      },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: {
        foreground: '#BBB277',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#A6ABAD',
      },
    },
  ],
};
