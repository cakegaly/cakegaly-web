import type { Meta, StoryObj } from '@storybook/react';

import { PageHeader } from './page-header';

const meta = {
  component: PageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '説明文ありのタイトルだよ',
    description: 'ここに説明文が入るよ',
  },
};

export const NoDescription: Story = {
  args: {
    title: '説明文なしのタイトルだよ',
  },
};
