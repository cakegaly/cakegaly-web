import Link from 'next/link';

import { CommandMenu } from '@/components/cmdk/command-menu';
import { GitHubLink } from '@/components/shared/github-link';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { SiteLogo } from '@/components/shared/site-logo';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import type { BlogPost } from '@/lib/mdx';

interface SiteHeaderProps {
  blogPosts: BlogPost[];
}

export function SiteHeader({ blogPosts }: SiteHeaderProps) {
  return (
    <header className="bg-canvas sticky top-0 z-50">
      <div className="container-wrapper">
        <div className="flex h-14 items-center">
          <Button asChild variant="ghost" size="icon-md">
            <Link href="/">
              <SiteLogo className="size-8" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <CommandMenu blogPosts={blogPosts} />
            <GitHubLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
