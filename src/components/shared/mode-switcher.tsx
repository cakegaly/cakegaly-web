'use client';

import * as React from 'react';
import { SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/base-ui/button';
import { useMetaColor } from '@/hooks/use-meta-color';

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor, metaColor } = useMetaColor();

  React.useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="group/toggle extend-touch-target fixed right-1 bottom-1 z-50"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <SunMoonIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
