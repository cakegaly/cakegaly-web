'use client';

import * as React from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/base-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/base-ui/tooltip';
import { cn } from '@/lib/utils';

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
}) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <Tooltip>
      <TooltipTrigger
        data-slot="copy-button"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
          'bg-muted text-on-muted hover:bg-muted-hovered focus-visible:bg-muted-active',
          'absolute top-3 right-2 z-10',
          className
        )}
        onClick={() => {
          copyToClipboardWithMeta(value);
          setHasCopied(true);
        }}
        aria-label="Copy"
        {...props}
      >
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? 'コピーしました！' : 'クリップボードにコピー'}
      </TooltipContent>
    </Tooltip>
  );
}
