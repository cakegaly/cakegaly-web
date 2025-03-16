import type { Meta, StoryObj } from '@storybook/react';
import { ModeSwitch } from './mode-switch';

const meta: Meta<typeof ModeSwitch> = {
  title: 'Layout/ModeSwitch',
  component: ModeSwitch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModeSwitch>;

export const Default: Story = {};
