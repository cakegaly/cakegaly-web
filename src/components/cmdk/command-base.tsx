'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        'bg-background text-on-background flex h-full w-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...props}
    />
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex h-11 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-40" />
      <CommandPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden',
          'placeholder:text-on-muted',
          'disabled:cursor-not-allowed disabled:opacity-40',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        'text-on-background overflow-hidden p-1',
        '**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5',
        '**:[[cmdk-group-heading]]:text-on-muted **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium',
        className
      )}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        'relative flex cursor-default items-start gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
        'data-[selected=true]:bg-muted data-[selected=true]:text-on-muted',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40',
        "[&_svg:not([class*='text-'])]:text-on-muted [&_svg]:pointer-events-none [&_svg]:mt-0.75 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
};
