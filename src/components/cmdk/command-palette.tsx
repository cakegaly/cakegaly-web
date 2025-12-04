'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileTextIcon,
  HomeIcon,
  PaletteIcon,
  TagIcon,
  TypeIcon,
} from 'lucide-react';

import type { BlogPost } from '@/lib/mdx';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/cmdk/command-base';

interface CommandPaletteProps {
  blogPosts?: BlogPost[];
}

export function CommandPalette({ blogPosts = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="コマンドパレット"
      description="ページやブログ記事を検索"
    >
      <CommandInput placeholder="検索..." />
      <CommandList>
        <CommandEmpty>結果が見つかりませんでした。</CommandEmpty>

        <CommandGroup heading="ページ">
          <CommandItem
            onSelect={() => handleSelect(() => router.push('/'))}
            value="home ホーム"
          >
            <HomeIcon />
            <span>ホーム</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => router.push('/blog'))}
            value="blog ブログ 記事"
          >
            <FileTextIcon />
            <span>ブログ</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="ツール">
          <CommandItem
            onSelect={() =>
              handleSelect(() => router.push('/tools/char-counter'))
            }
            value="char-counter 文字数カウント もじすうかうんと テキスト"
          >
            <TypeIcon />
            <span>文字数カウント</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() => router.push('/tools/color-converter'))
            }
            value="color-converter カラーコード変換 からーこーどへんかん 色 hex rgb hsl oklch"
          >
            <PaletteIcon />
            <span>カラーコード変換</span>
          </CommandItem>
        </CommandGroup>

        {blogPosts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="ブログ記事">
              {blogPosts.slice(0, 10).map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() =>
                    handleSelect(() => router.push(`/blog/${post.slug}`))
                  }
                  value={`${post.metadata.title} ${post.metadata.description} ${post.metadata.tags?.join(' ') || ''}`}
                >
                  {post.metadata.tags && post.metadata.tags.length > 0 ? (
                    <TagIcon className="text-on-muted" />
                  ) : (
                    <FileTextIcon className="text-on-muted" />
                  )}
                  <div className="flex flex-col">
                    <span>{post.metadata.title}</span>
                    {post.metadata.description && (
                      <span className="text-on-muted text-xs">
                        {post.metadata.description.length > 60
                          ? `${post.metadata.description.slice(0, 60)}...`
                          : post.metadata.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
