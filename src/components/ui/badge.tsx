import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 min-h-6 rounded-sm text-[11px] font-normal leading-3 px-2 transition-all [&>svg]:size-4 [&_svg]:shrink-0 [&>svg]:pointer-events-none focus-visible:outline-2 focus-visible:outline-selected focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        neutral:
          'bg-neutral text-on-neutral [a&]:hover:bg-neutral-hovered [a&]:active:bg-neutral-active',
        outline:
          'outline-border bg-background text-on-background [a&]:hover:bg-background-hovered [a&]:active:bg-background-active outline-1 -outline-offset-1 outline-solid',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
