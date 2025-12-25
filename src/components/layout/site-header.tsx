import Link from 'next/link';

import { Button } from '@/components/base-ui/button';
import { CommandMenu } from '@/components/cmdk/command-menu';
import { GitHubLink } from '@/components/shared/github-link';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { SiteLogo } from '@/components/shared/site-logo';
import { siteConfig } from '@/lib/config';

export function SiteHeader() {
  return (
    <header className="bg-canvas sticky top-0 z-50">
      <div className="container-wrapper">
        <div className="flex h-14 items-center">
          <Button
            variant="ghost"
            size="icon-md"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <SiteLogo className="size-8" />
            <span className="sr-only">{siteConfig.name}</span>
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <CommandMenu />
            <GitHubLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
