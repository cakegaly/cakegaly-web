'use client';

import * as React from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            'bg-muted text-on-muted hover:bg-muted-hovered focus-visible:bg-muted-active',
            'absolute top-3 right-2 z-10',
            className
          )}
          onClick={() => {
            copyToClipboardWithMeta(value);
            setHasCopied(true);
          }}
          {...props}
        >
          {hasCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? 'コピーしました！' : 'クリップボードにコピー'}
      </TooltipContent>
    </Tooltip>
  );
}
