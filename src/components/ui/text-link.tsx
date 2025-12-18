import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const textLinkVariants = cva(
  'inline-flex gap-1 underline decoration-border underline-offset-2 hover:decoration-accent focus-visible:outline-focused leading-normal font-normal transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      size: {
        sm: 'text-sm [&_svg]:size-4',
        md: 'text-base [&_svg]:size-5',
        lg: 'text-lg [&_svg]:size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

function TextLink({
  className,
  size,
  href,
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  VariantProps<typeof textLinkVariants> & {
    href: string;
    children: React.ReactNode;
  }) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(textLinkVariants({ size, className }))}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <ExternalLinkIcon className="pointer-events-none shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(textLinkVariants({ size, className }))}
      {...props}
    >
      {children}
    </a>
  );
}

export { TextLink, textLinkVariants };
