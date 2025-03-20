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

interface SearchProps {
  posts: BlogPost[];
  tags: Record<
    string,
    {
      name: string;
      icon: keyof typeof TechIcons;
    }
  >;
}

export function Search({ posts, tags }: SearchProps) {
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
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="ブログ">
            {posts.map((post) => (
              <CommandItem key={post.slug}>
                <Icons.fileHeart />
                <span>{post.metadata.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="タグ">
            {Object.keys(tags).map((slug) => (
              <CommandItem key={slug}>
                <Icons.tag />
                <span>{tags[slug].name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
