import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 min-h-6 rounded-sm text-[11px] font-normal leading-3 px-2 transition-all [&>svg]:size-4 [&_svg]:shrink-0 [&>svg]:pointer-events-none focus-visible:outline-2 focus-visible:outline-focused focus-visible:outline-offset-2',
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
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
