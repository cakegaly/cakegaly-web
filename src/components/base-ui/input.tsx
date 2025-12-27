import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'bg-background h-12 w-full min-w-0 rounded-xl text-base',
        'px-3 py-1 shadow-xs transition-[color,box-shadow,background-color]',
        'outline-1 -outline-offset-1',
        'placeholder:text-muted-foreground',
        'hover:bg-background-hovered active:bg-background-active',
        'focus-visible:outline-focused focus-visible:bg-background focus-visible:outline-2',
        'aria-invalid:outline-destructive aria-invalid:bg-background aria-invalid:outline-2',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
        'file:text-on-background file:inline-flex file:h-12 file:bg-transparent file:text-sm file:font-bold file:outline-none',
        className
      )}
      {...props}
    />
  );
}

export { Input };
