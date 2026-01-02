'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PenLineIcon, SearchIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/base-ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/cmdk/command-base';
import { siteConfig } from '@/lib/config';
import type { BlogPost } from '@/lib/mdx';

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
      <DialogTrigger
        className={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <SearchIcon />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] overflow-hidden p-0 shadow-2xl sm:max-w-lg"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for blog posts and tools</DialogDescription>
        </DialogHeader>
        <Command className="rounded-none">
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
                  <PenLineIcon />
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
