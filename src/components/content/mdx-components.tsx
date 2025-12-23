import Image from 'next/image';

import { CopyButton } from '@/components/content/copy-button';
import { LinkPreview } from '@/components/content/link-preview';
import { getIconForLanguageExtension } from '@/components/shared/brand-icons';
import { Callout } from '@/components/shared/callout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TextLink } from '@/components/ui/text-link';
import { cn } from '@/lib/utils';

export const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-28 text-2xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'border-accent/50 mt-12 scroll-m-20 border-b pb-2 text-xl font-medium tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-lg font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<'h4'>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-base font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, children, ...props }: React.ComponentProps<'a'>) => {
    if (!href) {
      return (
        <a className={cn('underline underline-offset-4', className)} {...props}>
          {children}
        </a>
      );
    }

    return (
      <TextLink
        href={href}
        className={className}
        {...(props as Omit<React.ComponentProps<'a'>, 'href' | 'children'>)}
      >
        {children}
      </TextLink>
    );
  },
  p: ({ className, ...props }: React.ComponentProps<'p'>) => (
    <p
      className={cn(
        'text-base leading-7 [&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn('font-medium', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<'hr'>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<'table'>) => (
    <div className="my-6">
      <Table className={className} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<'thead'>) => (
    <TableHeader className={className} {...props} />
  ),
  tbody: ({ className, ...props }: React.ComponentProps<'tbody'>) => (
    <TableBody className={className} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
    <TableRow className={className} {...props} />
  ),
  th: ({ className, align, ...props }: React.ComponentProps<'th'>) => (
    <TableHead
      className={className}
      align={align as 'left' | 'center' | 'right' | undefined}
      {...props}
    />
  ),
  td: ({ className, align, ...props }: React.ComponentProps<'td'>) => (
    <TableCell
      className={className}
      align={align as 'left' | 'center' | 'right' | undefined}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<'pre'>) => {
    return (
      <pre
        className={cn(
          'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none',
          'has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  figure: ({ className, ...props }: React.ComponentProps<'figure'>) => {
    return <figure className={cn(className)} {...props} />;
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<'figcaption'>) => {
    const iconExtension =
      'data-language' in props && typeof props['data-language'] === 'string'
        ? getIconForLanguageExtension(props['data-language'])
        : null;

    return (
      <figcaption
        className={cn(
          'text-on-muted [&_svg]:text-on-muted flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70',
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  code: ({
    className,
    __raw__,
    __src__,
    ...props
  }: React.ComponentProps<'code'> & {
    __raw__?: string;
    __src__?: string;
  }) => {
    // Inline Code
    if (typeof props.children === 'string') {
      return (
        <code
          className={cn(
            'bg-muted relative rounded-xs px-[0.3rem] py-[0.2rem] font-mono text-[0.9rem] outline-none',
            className
          )}
          {...props}
        />
      );
    }

    // Default Code Block
    return (
      <>
        {__raw__ && <CopyButton value={__raw__} src={__src__} />}
        <code {...props} />
      </>
    );
  },
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<'img'>) => (
    <Image
      className={cn('mt-6 rounded-md border', className)}
      src={typeof src === 'string' ? src : ''}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ''}
      {...props}
    />
  ),
  Callout: ({ className, ...props }: React.ComponentProps<typeof Callout>) => (
    <Callout className={cn('mt-6', className)} {...props} />
  ),
  LinkPreview,
};
