import type { Meta, StoryObj } from '@storybook/react';

import { TechIcons } from '@/components/icons';
import { BlogCard } from './blog-card';

const meta = {
  component: BlogCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const createMockData = (icon: keyof typeof TechIcons, title?: string) => ({
  metadata: {
    title: title || `サンプル記事: ${icon}`,
    description: 'これはサンプル記事の説明文です。',
    date: '2024-04-01',
    tags: ['react', 'nextjs'],
    icon,
  },
  slug: `${icon}-sample-post`,
});

export const Default: Story = {
  args: {
    data: createMockData('react'),
  },
};

export const Icon_ESLint: Story = { args: { data: createMockData('eslint') } };

export const Icon_Jamstack: Story = {
  args: { data: createMockData('jamstack') },
};

export const Icon_Nextjs: Story = { args: { data: createMockData('nextjs') } };

export const Icon_React: Story = { args: { data: createMockData('react') } };

export const Icon_TailwindCSS: Story = {
  args: { data: createMockData('tailwindcss') },
};

export const Icon_TypeScript: Story = {
  args: { data: createMockData('typescript') },
};

export const Icon_Vercel: Story = { args: { data: createMockData('vercel') } };

export const Icon_VSCode: Story = { args: { data: createMockData('vscode') } };

export const Icon_WordPress: Story = {
  args: { data: createMockData('wordpress') },
};
