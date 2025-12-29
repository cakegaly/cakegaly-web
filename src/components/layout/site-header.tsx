import Link from 'next/link';

import { buttonVariants } from '@/components/base-ui/button';
import { CommandMenu } from '@/components/cmdk/command-menu';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { SiteLogo } from '@/components/shared/site-logo';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function SiteHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header className={cn('z-50', className)} {...props}>
      <div className="container-wrapper">
        <div className="bg-canvas container max-w-none">
          <div className="flex h-14 items-center">
            <Link
              href="/"
              className={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
            >
              <SiteLogo className="size-8" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
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
