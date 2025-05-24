import type { Preview } from '@storybook/react';

import { withProviders } from './decorators';

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#111A1F' },
        { name: 'light', value: '#F5F7F9' },
      ],
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default preview;
