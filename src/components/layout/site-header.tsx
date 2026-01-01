import { CommandMenu } from '@/components/cmdk/command-menu';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { cn } from '@/lib/utils';

export function SiteHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header className={cn('z-50', className)} {...props}>
      <div className="container-wrapper">
        <div className="container max-w-none">
          <div className="flex h-14 items-center">
            {/* <Link
              href="/"
              className={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
            >
              <SiteLogoSmile className="size-8" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link> */}
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
