import type { Meta, StoryObj } from '@storybook/react';

import { TechIcons } from '@/components/icons';
import { tags } from '@/config/blog';
import type { BlogPost } from '@/lib/mdx';
import { BlogCard } from './blog-card';

const meta = {
  component: BlogCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const createMockData = ({
  icon,
  title,
  tagList,
}: {
  icon: keyof typeof TechIcons;
  title?: string;
  tagList?: (keyof typeof tags)[];
}): Pick<BlogPost, 'metadata' | 'slug'> => ({
  metadata: {
    title: title || `サンプル記事: ${icon}`,
    description: 'これはサンプル記事の説明文です。',
    date: '2024-04-01',
    tags: tagList?.map(String) ?? [],
    icon,
  },
  slug: `${icon}-sample-post`,
});

export const Default: Story = {
  args: {
    data: createMockData({
      icon: 'react',
      tagList: ['react', 'nextjs'],
    }),
  },
};

export const WithManyTags: Story = {
  args: {
    data: createMockData({
      icon: 'react',
      tagList: ['react', 'nextjs', 'typescript', 'eslint'],
    }),
  },
};

export const WithLongTitle: Story = {
  args: {
    data: createMockData({
      title:
        'これは非常に長いサンプル記事タイトルで、たくさんの情報が含まれています。ユーザーが見た時に折り返しやレイアウト崩れをチェックするのに使います。',
      icon: 'react',
      tagList: ['react'],
    }),
  },
};

export const Icon_ESLint: Story = {
  args: {
    data: createMockData({
      icon: 'eslint',
      tagList: ['eslint'],
    }),
  },
};

export const Icon_Jamstack: Story = {
  args: {
    data: createMockData({
      icon: 'jamstack',
      tagList: ['jamstack'],
    }),
  },
};

export const Icon_Nextjs: Story = {
  args: {
    data: createMockData({
      icon: 'nextjs',
      tagList: ['nextjs'],
    }),
  },
};

export const Icon_React: Story = {
  args: {
    data: createMockData({
      icon: 'react',
      tagList: ['react'],
    }),
  },
};

export const Icon_TailwindCSS: Story = {
  args: {
    data: createMockData({
      icon: 'tailwindcss',
      tagList: ['tailwindcss'],
    }),
  },
};

export const Icon_TypeScript: Story = {
  args: {
    data: createMockData({
      icon: 'typescript',
      tagList: ['typescript'],
    }),
  },
};

export const Icon_Vercel: Story = {
  args: {
    data: createMockData({
      icon: 'vercel',
      tagList: ['vercel'],
    }),
  },
};

export const Icon_VSCode: Story = {
  args: {
    data: createMockData({
      icon: 'vscode',
      tagList: ['vscode'],
    }),
  },
};

export const Icon_WordPress: Story = {
  args: {
    data: createMockData({
      icon: 'wordpress',
      tagList: ['wordpress'],
    }),
  },
};
