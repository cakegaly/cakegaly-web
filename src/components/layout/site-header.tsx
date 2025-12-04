import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';
import { Button } from '@/components/ui/button';
import { CommandPalette } from '@/components/cmdk/command-palette';
import { GitHubLink } from '@/components/shared/github-link';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { SiteLogo } from '@/components/shared/site-logo';

export async function SiteHeader() {
  const blogPosts = await getAllBlogPosts();

  return (
    <header className="bg-canvas sticky top-0 z-50">
      <div className="content-wrapper max-w-none px-6">
        <div className="content-inner flex h-14 max-w-none items-center">
          <Button asChild variant="ghost" size="icon-md">
            <Link href="/">
              <SiteLogo className="size-8" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <CommandPalette blogPosts={blogPosts} />
            <GitHubLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
