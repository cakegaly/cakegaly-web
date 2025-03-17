import type { Meta, StoryObj } from '@storybook/react';

import { Callout } from './callout';

const meta = {
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'note', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'info',
    title: '情報',
    children: 'ここに内容が入ります。',
  },
};

export const Note: Story = {
  args: {
    type: 'note',
    title: 'メモ',
    children: 'ここにメモ書きが入ります。',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: '警告',
    children: 'ここに注意すべき内容が入ります。',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    title: '危険',
    children: 'ここに重大または危険な内容が入ります。',
  },
};
