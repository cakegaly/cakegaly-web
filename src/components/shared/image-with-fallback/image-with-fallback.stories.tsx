import type { Meta, StoryObj } from '@storybook/react';

import { ImageWithFallback } from './image-with-fallback';

const meta = {
  component: ImageWithFallback,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-[300px] border p-4">
        {/* ✅ Story 専用 decorator で幅制限 */}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageWithFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/non-existent-image.jpg',
    fallbackSrc: '/placeholder.svg',
    alt: 'フォールバック画像の表示',
  },
};

export const Small: Story = {
  args: {
    src: '/non-existent-image.jpg',
    alt: '小サイズのフォールバック画像',
    className: 'max-w-[150px]',
  },
};

export const NoFallback: Story = {
  args: {
    src: '/apple-touch-icon.png',
    alt: 'フォールバックなし (画像を参照できたとき)',
  },
};
