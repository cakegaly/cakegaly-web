import profilePic from '@/assets/images/cakegaly.webp';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { SearchCommand } from '@/components/search-command';

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 md:top-6">
      <div className="container flex h-14 max-w-screen-sm items-center justify-between rounded-full border bg-background/50 backdrop-blur-md">
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
          <SearchCommand />
        </div>
      </div>
    </header>
  );
}
