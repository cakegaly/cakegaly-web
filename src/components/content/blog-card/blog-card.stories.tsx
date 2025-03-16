import type { Meta, StoryObj } from '@storybook/react';

import { TechIcons } from '@/components/icons';
import { BlogCard } from './blog-card';

const meta = {
  component: BlogCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockData = {
  metadata: {
    title: 'サンプル記事タイトル',
    description: 'これはサンプル記事の説明文です。',
    date: '2024-04-01',
    tags: ['react', 'nextjs'],
    icon: 'react' as keyof typeof TechIcons,
  },
  slug: 'sample-post',
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
