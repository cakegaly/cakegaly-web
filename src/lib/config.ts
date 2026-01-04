import { HomeIcon, PaletteIcon, PenLineIcon, TypeIcon } from 'lucide-react';

export const siteConfig = {
  name: 'cakegaly.com',
  description: '技術のことや日々のことを、のんびりと書き残すブログです。',
  url: 'https://cakegaly.com',
  ogImage: 'https://cakegaly.com/og.png',
  links: {
    twitter: 'https://twitter.com/cakegaly',
    x: 'https://twitter.com/cakegaly',
    github: 'https://github.com/cakegaly',
    zenn: 'https://zenn.dev/cakegaly',
  },
  copyRight: 'cakegaly',
  email: 'cakegaly@gmail.com',
  author: {
    name: 'cakegaly',
    bio: 'Software Engineer',
  },
  navItems: [
    {
      title: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      title: 'Writing',
      href: '/blog',
      icon: PenLineIcon,
    },
    {
      title: 'Char Counter',
      href: '/char-counter',
      icon: TypeIcon,
    },
    {
      title: 'Color Converter',
      href: '/color-converter',
      icon: PaletteIcon,
    },
  ],
};

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#202226',
};
