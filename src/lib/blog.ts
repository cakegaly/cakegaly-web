import type { TechIcons } from '@/components/shared/tech-icons';

export const author = {
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
