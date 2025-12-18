import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const textLinkVariants = cva(
  'hover:border-accent focus-visible:outline-focused inline-flex items-center gap-1 border-b border-solid leading-normal font-normal no-underline transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2',
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
        <span className="min-w-0 truncate">{children}</span>
        <ExternalLinkIcon className="shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(textLinkVariants({ size, className }))}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
    </a>
  );
}

export { TextLink, textLinkVariants };
