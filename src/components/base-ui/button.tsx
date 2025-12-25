import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-focused focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        neutral:
          'bg-neutral text-on-neutral hover:bg-neutral-hovered active:bg-neutral-active',
        outline:
          'bg-background outline-1 outline-solid -outline-offset-1 outline-border text-on-background hover:bg-background-hovered active:bg-background-active',
        ghost:
          'text-on-background hover:bg-background-hovered active:bg-background-active',
      },
      size: {
        sm: 'min-h-8 px-4 has-[>svg]:px-3 text-xs',
        md: 'min-h-10 px-6 has-[>svg]:px-4 text-sm',
        lg: 'min-h-12 px-6 has-[>svg]:px-4 text-sm',
        'icon-sm': 'size-8 [&_svg]:size-5',
        'icon-md': 'size-10 [&_svg]:size-6',
        'icon-lg': 'size-12 [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
