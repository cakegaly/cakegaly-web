'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { Switch } from '@/components/ui/switch';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Icons.sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
        aria-label="Toggle dark mode"
      />
      <Icons.moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
}
