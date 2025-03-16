import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from './site-footer';

const meta: Meta<typeof SiteFooter> = {
  title: 'Layout/SiteFooter',
  component: SiteFooter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {},
};

export const WithBorder: Story = {
  args: {
    className: 'border-t',
  },
};
