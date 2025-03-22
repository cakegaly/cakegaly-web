'use client';

import * as React from 'react';

import { Icons, TechIcons } from '@/components/icons';
import { Button } from '@/components/shadcn-ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import { BlogPost } from '@/lib/mdx';

type SearchData = {
  posts: BlogPost[];
  tags: Record<
    string,
    {
      name: string;
      icon: keyof typeof TechIcons;
    }
  >;
};

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<SearchData | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Fetch data only when the command dialog is opened
  React.useEffect(() => {
    if (open && !data && !loading) {
      setLoading(true);
      fetch('/api/search')
        .then((res) => res.json())
        .then((searchData: SearchData) => {
          setData(searchData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch search data:', err);
          setLoading(false);
        });
    }
  }, [open, data, loading]);

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
        <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-90 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="検索" />
        <CommandList>
          {loading ? (
            <div className="py-6 text-center text-sm">Loading...</div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              {data && (
                <>
                  <CommandGroup heading="ブログ">
                    {data.posts.map((post) => (
                      <CommandItem
                        key={post.slug}
                        onSelect={() => {
                          window.location.href = `/blog/${post.slug}`;
                          setOpen(false);
                        }}
                      >
                        <Icons.fileHeart className="mr-2 size-4" />
                        <span>{post.metadata.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="タグ">
                    {Object.keys(data.tags).map((slug) => (
                      <CommandItem
                        key={slug}
                        onSelect={() => {
                          window.location.href = `/tag/${slug}`;
                          setOpen(false);
                        }}
                      >
                        <Icons.tag className="mr-2 size-4" />
                        <span>{data.tags[slug].name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
