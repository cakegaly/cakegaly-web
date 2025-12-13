import { PaletteIcon, TypeIcon } from 'lucide-react';

export const siteConfig = {
  name: 'cakegaly.com',
  description: '技術のことや日々のことを、のんびりと書き残すブログです。',
  url: 'https://cakegaly.com',
  ogImage: 'https://cakegaly.com/og.png',
  links: {
    twitter: 'https://twitter.com/cakegaly',
    x: 'https://twitter.com/cakegaly',
    github: 'https://github.com/cakegaly',
  },
  copyRight: 'cakegaly',
  email: 'cakegaly@gmail.com',
  author: {
    slug: 'cakegaly',
    name: 'cakegaly',
    image: 'https://github.com/cakegaly.png',
    bio: 'Software Engineer',
  },
  navItems: [
    {
      title: '文字数カウント',
      description: '入力されたテキストの文字数を数えます。',
      href: '/char-counter',
      icon: TypeIcon,
    },
    {
      title: 'カラーコード変換',
      description: 'hex, hsl, rgb, oklch でカラーコードを変換します。',
      href: '/color-converter',
      icon: PaletteIcon,
    },
  ],
};

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#202226',
};

export const INTERNAL_BLOG_TAGS = [
  { slug: 'eslint', name: 'ESLint' },
  { slug: 'jamstack', name: 'Jamstack' },
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'react', name: 'React' },
  { slug: 'tailwindcss', name: 'Tailwind CSS' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'vercel', name: 'Vercel' },
  { slug: 'vscode', name: 'VSCode' },
  { slug: 'wordpress', name: 'WordPress' },
];
