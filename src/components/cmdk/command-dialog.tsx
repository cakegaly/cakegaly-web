'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FileTextIcon, SearchIcon } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/cmdk/command-base';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { siteConfig } from '@/lib/config';
import type { BlogPost } from '@/lib/mdx';
import { cn } from '@/lib/utils';

export function CommandDialog({ blogPosts }: { blogPosts: BlogPost[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((callback: () => void) => {
    setOpen(false);
    callback();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-md"
          onClick={() => setOpen(true)}
          aria-label="Search"
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="overflow-hidden p-0 shadow-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for blog posts and tools</DialogDescription>
        </DialogHeader>
        <Command
          className={cn(
            'rounded-none bg-transparent',
            '**:[[cmdk-group-heading]]:text-on-muted **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-group]]:px-2',
            '[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5',
            '**:[[cmdk-input]]:h-12',
            '**:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3',
            '[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'
          )}
        >
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Blog Posts">
              {blogPosts.map((post) => (
                <CommandItem
                  key={post.slug}
                  value={post.metadata.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/blog/${post.slug}`));
                  }}
                >
                  <FileTextIcon />
                  <span>{post.metadata.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Tools">
              {siteConfig.navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    onSelect={() => {
                      runCommand(() => router.push(item.href));
                    }}
                  >
                    <Icon />
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
