'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';
import { cn } from '@/lib/utils';

import searchIndex from '@/../public/search/search-index.json';

type SearchData = typeof searchIndex;

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const data: SearchData = searchIndex;
  const router = useRouter();

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        aria-label="検索"
        title="検索"
        onClick={() => setOpen(true)}
      >
        <Icons.search className="size-3" />
        <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-90 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            'top-20 translate-y-0 p-0 shadow-lg sm:top-1/2 sm:translate-y-[-50%]'
          )}
        >
          <Command>
            <CommandInput placeholder="検索" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="ブログ">
                {data.posts.map((post) => (
                  <CommandItem
                    key={post.slug}
                    onSelect={() => {
                      router.push(`/blog/${post.slug}`);
                      setOpen(false);
                    }}
                  >
                    <Icons.fileHeart className="mr-2 size-4" />
                    <span>{post.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="タグ">
                {Object.entries(data.tags).map(([slug, tag]) => (
                  <CommandItem
                    key={slug}
                    onSelect={() => {
                      router.push(`/tag/${slug}`);
                      setOpen(false);
                    }}
                  >
                    <Icons.tag className="mr-2 size-4" />
                    <span>{tag.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
