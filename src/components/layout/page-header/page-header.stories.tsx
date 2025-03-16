import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './page-header';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'タイトルだよ',
    description: 'ここに説明文が入るよ',
  },
};

export const NoDescription: Story = {
  args: {
    title: 'タイトルだよ',
  },
};
