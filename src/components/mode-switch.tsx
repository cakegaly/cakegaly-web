'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { LucideIcons } from '@/components/icons';
import { Switch } from '@/components/ui/switch';

export function ModeSwitch() {
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
      <LucideIcons.sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
        aria-label="Toggle dark mode"
      />
      <LucideIcons.moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
}
