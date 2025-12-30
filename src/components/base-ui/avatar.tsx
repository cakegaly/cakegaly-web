'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { UserRoundIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'bg-muted text-on-muted relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold [&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'size-6 text-xs [&_svg]:size-5',
        md: 'size-8 text-sm [&_svg]:size-6',
        lg: 'size-10 text-base [&_svg]:size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

function Avatar({
  src,
  alt = 'Avatar',
  size,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    src: string;
    alt?: string;
  }) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="aspect-square size-full object-cover"
      />
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        <UserRoundIcon />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export { Avatar, avatarVariants };
