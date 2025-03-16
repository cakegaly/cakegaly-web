import type { Meta, StoryObj } from '@storybook/react';

import { ModeSwitch } from './mode-switch';

const meta = {
  component: ModeSwitch,
  tags: ['autodocs'],
} satisfies Meta<typeof ModeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
