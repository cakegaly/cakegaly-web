'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import searchIndex from '@/../public/search/search-index.json';
import Fuse from 'fuse.js';

import { cn } from '@/lib/utils';

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
import { Icons } from '@/components/icons';

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  const postsFuse = React.useMemo(
    () =>
      new Fuse(searchIndex.posts, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'tags', weight: 1.5 },
          { name: 'description', weight: 1 },
        ],
        threshold: 0.5,
        useExtendedSearch: true,
        ignoreLocation: true,
      }),
    []
  );

  const tagsFuse = React.useMemo(
    () =>
      new Fuse(
        Object.entries(searchIndex.tags).map(([slug, tag]) => ({
          slug,
          name: tag.name,
        })),
        {
          keys: ['name'],
          threshold: 0.3,
          includeScore: true,
        }
      ),
    []
  );

  const filteredPosts = React.useMemo(
    () =>
      query
        ? postsFuse.search(query).map((result) => result.item)
        : searchIndex.posts,
    [query, postsFuse]
  );

  const filteredTags = React.useMemo(
    () =>
      query
        ? tagsFuse.search(query).map((result) => result.item)
        : Object.entries(searchIndex.tags).map(([slug, tag]) => ({
            slug,
            name: tag.name,
          })),
    [query, tagsFuse]
  );

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
        <kbd className="ml-auto hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-90 select-none sm:flex">
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
            <CommandInput
              placeholder="検索"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {filteredPosts.length > 0 && (
                <CommandGroup heading="ブログ">
                  {filteredPosts.map((post) => (
                    <CommandItem
                      key={post.slug}
                      value={`${post.title} ${post.tags.join(' ')} ${post.description}`}
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
              )}

              {filteredTags.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="タグ">
                    {filteredTags.map((tag) => (
                      <CommandItem
                        key={tag.slug}
                        onSelect={() => {
                          router.push(`/tag/${tag.slug}`);
                          setOpen(false);
                        }}
                      >
                        <Icons.tag className="mr-2 size-4" />
                        <span>{tag.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
