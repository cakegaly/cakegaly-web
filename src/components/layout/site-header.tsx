import Link from 'next/link';

import { CommandMenu } from '@/components/cmdk/command-menu';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { SiteLogo } from '@/components/shared/site-logo';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function SiteHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header className={cn('z-50', className)} {...props}>
      <div className="container-wrapper">
        <div className="bg-background/50 container max-w-sm rounded-xl px-4 shadow-sm backdrop-blur-sm">
          <div className="flex h-14 items-center">
            <Button asChild variant="ghost" size="icon-md">
              <Link href="/">
                <SiteLogo className="size-8" />
                <span className="sr-only">{siteConfig.name}</span>
              </Link>
            </Button>
            <div className="ml-auto flex items-center gap-1">
              <CommandMenu />
              <ModeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
