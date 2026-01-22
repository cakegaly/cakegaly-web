import { NavDrawer } from '@/components/layout/nav-drawer';
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
            <div className="ml-auto flex items-center gap-1">
              <NavDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
