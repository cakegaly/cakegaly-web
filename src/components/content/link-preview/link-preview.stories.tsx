import type { Meta, StoryObj } from '@storybook/react';

import { siteConfig } from '@/config/site';

import { LinkCard } from './link-preview';

const meta = {
  component: LinkCard,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExternalLink: Story = {
  args: {
    url: 'https://example.com',
    title: 'Example Site',
    description: 'これは外部サイトの例です。',
    image: 'https://via.placeholder.com/150',
  },
};

export const InternalLink: Story = {
  args: {
    url: '/blog/sample-post',
    title: '内部ブログ記事',
    description: '内部リンク (このサイト内のブログページ) の例です。',
    image: siteConfig.ogImage,
  },
};

export const ErrorCard: Story = {
  args: {
    url: '/blog/invalid-post',
    error: true,
  },
};
