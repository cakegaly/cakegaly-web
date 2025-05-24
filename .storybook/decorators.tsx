import React from 'react';

import { fontMono, fontSans } from '../src/assets/fonts';
import { ThemeProvider } from '../src/components/layout/theme-provider';
import { cn } from '../src/lib/utils';

import '../src/styles/globals.css';

import { ReactNode } from 'react';

export const withProviders = (Story: () => ReactNode) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <div
      className={cn(
        'bg-background p-8 font-sans antialiased',
        fontSans.variable,
        fontMono.variable
      )}
    >
      <Story />
    </div>
  </ThemeProvider>
);
