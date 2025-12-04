import { siteConfig } from '@/lib/config';

export function SiteFooter() {
  return (
    <footer className="flex h-14 items-center justify-center">
      <p className="text-on-muted text-xs">
        &copy; {`${new Date().getFullYear()} ${siteConfig.copyRight}`}
      </p>
    </footer>
  );
}
