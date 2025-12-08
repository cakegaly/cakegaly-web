import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const textLinkVariants = cva(
  'inline-flex items-center gap-1 text-link font-normal leading-normal transition-all hover:underline focus-visible:outline-2 focus-visible:outline-focused focus-visible:outline-offset-2 visited:text-link-visited',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
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
        <ExternalLinkIcon className="size-5 shrink-0" />
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
