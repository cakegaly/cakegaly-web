'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { Switch } from '@/components/shadcn-ui/switch';

export function ModeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Icons.sun className="h-4 w-4" />
      <Switch
        checked={resolvedTheme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
        aria-label="Toggle dark mode"
        title="テーマを切り替える"
      />
      <Icons.moon className="h-4 w-4" />
    </div>
  );
}
