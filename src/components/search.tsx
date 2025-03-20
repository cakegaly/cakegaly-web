'use client';

import { Tag } from 'lucide-react';
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
        className="gap-3 text-muted-foreground"
        size="sm"
        onClick={() => setOpen(true)}
      >
        検索
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
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
                <Tag />
                <span>{tags[slug].name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
