import Image from 'next/image';
import Link from 'next/link';
import profilePic from '@/assets/images/cakegaly.webp';

import { siteConfig } from '@/config/site';

import { SearchCommand } from '@/components/search-command';

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 md:top-6">
      <div className="bg-background/50 container flex h-14 max-w-screen-sm items-center justify-between rounded-full border backdrop-blur-md">
        <Link
          href="/"
          className="hover:bg-accent/20 flex items-center gap-2 rounded-md p-2"
          aria-label="トップページに戻る"
          title="トップページに戻る"
        >
          <Image
            src={profilePic}
            alt="cakegaly icon"
            width={32}
            height={32}
            className="ring-border rounded-full ring-1"
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
