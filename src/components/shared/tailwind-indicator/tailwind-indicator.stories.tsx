import type { Meta, StoryObj } from '@storybook/react';

import { TailwindIndicator } from './tailwind-indicator';

const meta = {
  component: TailwindIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof TailwindIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Note: If an error occurs with the value of process.env.NODE_ENV, change it to the following:
// export const Default: Story = {
//   render: () => (
//     <div className="fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
//       <div className="block sm:hidden">xs</div>
//       <div className="hidden sm:max-md:block">sm</div>
//       <div className="hidden md:max-lg:block">md</div>
//       <div className="hidden lg:max-xl:block">lg</div>
//       <div className="hidden xl:max-2xl:block">xl</div>
//       <div className="hidden 2xl:block">2xl</div>
//     </div>
//   ),
// };
