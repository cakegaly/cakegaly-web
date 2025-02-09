import { Icons } from '@/components/icons';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="container sticky top-0 z-40 border-b bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="/" className="rounded-sm p-2">
          <Icons.logo />
          <span className="sr-only">Home</span>
        </Link>
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
}
