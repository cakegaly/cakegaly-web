import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {`${new Date().getFullYear()} ${siteConfig.copyRight}`}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {siteConfig.links.twitter && (
            <Link
              href={siteConfig.links.twitter}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              aria-label="Twitter"
              title="Twitter (@cakegaly)"
            >
              <Icons.twitter className="size-4" />
            </Link>
          )}
          {siteConfig.email && (
            <Link
              href={`mailto:${siteConfig.email}`}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              aria-label="Email"
              title="Email (cakegaly -at- gmail -dot- com)"
            >
              <Icons.mail className="size-4" />
            </Link>
          )}
          {siteConfig.links.github && (
            <Link
              href={siteConfig.links.github}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              aria-label="GitHub"
              title="GitHub (/cakegaly)"
            >
              <Icons.gitHub className="size-4" />
            </Link>
          )}
          <Link
            href="#"
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
            aria-label="RSS"
            title="RSS Feed (cakegaly -dot- com)"
          >
            <Icons.rss className="size-4" />
          </Link>
        </div>
        {/* <ModeToggle /> */}
      </div>
    </footer>
  );
}
