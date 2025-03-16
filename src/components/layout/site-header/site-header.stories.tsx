import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from './site-header';

const meta: Meta<typeof SiteHeader> = {
  title: 'Layout/SiteHeader',
  component: SiteHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};
