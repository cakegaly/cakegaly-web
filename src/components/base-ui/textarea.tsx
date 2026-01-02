import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'bg-background placeholder:text-on-muted flex min-h-16 w-full rounded-md text-base md:text-sm',
        'field-sizing-content px-3 py-2 shadow-xs transition-[color,box-shadow]',
        'outline-border outline-1 outline-offset-1',
        'focus-visible:outline-selected focus-visible:bg-background focus-visible:outline-2',
        'aria-invalid:outline-destructive/20 aria-invalid:bg-background',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
