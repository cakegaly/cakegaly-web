import Image from 'next/image';
import Link from 'next/link';

import profilePic from '@/assets/images/cakegaly.webp';
import { Search } from '@/components/search';
import { tags } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/lib/mdx';

export async function SiteHeader() {
  const allPosts = await getAllBlogPosts();
  return (
    <header className="container sticky top-0 z-40 border-b bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md p-2 hover:bg-accent/20"
          aria-label="トップページに戻る"
          title="トップページに戻る"
        >
          <Image
            src={profilePic}
            alt="cakegaly icon"
            width={32}
            height={32}
            className="rounded-full ring-1 ring-border"
            priority={true}
          />
          <span className="hidden font-mono text-sm md:block">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Search posts={allPosts} tags={tags} />
        </div>
      </div>
    </header>
  );
}
