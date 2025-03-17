import type { Meta, StoryObj } from '@storybook/react';

import { Icons, SocialIcons, TechIcons } from '.';

const meta = {
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const renderIcons = (iconSet: Record<string, any>) => (
  <div className="flex flex-wrap gap-4 p-4">
    {Object.entries(iconSet).map(([name, Icon]) => (
      <div key={name} className="flex w-16 flex-col items-center space-y-2">
        <Icon className="h-6 w-6" />
        <span className="break-words text-center text-xs text-muted-foreground">
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const LucideIconList: Story = { render: () => renderIcons(Icons) };

export const SocialIconList: Story = {
  render: () => renderIcons(SocialIcons),
};

export const TechIconList: Story = { render: () => renderIcons(TechIcons) };
