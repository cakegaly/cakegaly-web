import Image from 'next/image';
import Link from 'next/link';

import profilePic from '@/assets/images/cakegaly.webp';
import { ModeSwitch } from '@/components/layout/mode-switch';
import { siteConfig } from '@/config/site';

export function SiteHeader() {
  return (
    <header className="container sticky top-0 z-40 border-b bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-md items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md p-2 hover:bg-accent/20"
        >
          <Image
            src={profilePic}
            alt="cakegaly icon"
            width={32}
            height={32}
            className="rounded-full ring-1 ring-border"
            priority={true}
          />
          <span className="font-mono text-sm">{siteConfig.name}</span>
        </Link>
        <ModeSwitch />
      </div>
    </header>
  );
}
