'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-canvas flex min-h-svh flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-on-canvas text-6xl leading-none font-medium tracking-tighter">
          404
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">ページが見つかりません</p>
          <p className="text-on-muted">
            アドレスが変更されたか、ページが削除された可能性があります。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/">
              <HomeIcon />
              ホームに戻る
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeftIcon />
            前のページに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
