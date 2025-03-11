import type { TechIcons } from '@/components/icons';
import { AuthorConfig } from '@/types';

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
  react: { name: 'react', icon: 'react' },
  tailwindcss: { name: 'Tailwind CSS', icon: 'tailwindcss' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  wordpress: { name: 'WordPress', icon: 'wordpress' },
  vercel: { name: 'vercel', icon: 'vercel' },
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
