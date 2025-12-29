'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="bg-background relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t font-bold [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'data-[state=selected]:bg-background-active border-b transition-colors',
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  align = 'left',
  ...props
}: React.ComponentProps<'th'> & {
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-on-background h-10 px-2 align-middle font-bold whitespace-nowrap',
        '[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  align = 'left',
  ...props
}: React.ComponentProps<'td'> & {
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap',
        '[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-on-muted mt-4 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
