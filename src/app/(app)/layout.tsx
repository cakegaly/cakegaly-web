import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-canvas relative z-10 flex min-h-svh flex-col">
      <SiteHeader className="sticky top-4" />
      <main className="flex flex-1 flex-col pt-4">{children}</main>
      <SiteFooter />
    </div>
  );
}
