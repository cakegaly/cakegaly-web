'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/base-ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="bg-canvas flex min-h-svh flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-on-canvas text-6xl leading-none font-medium tracking-tighter">
          500
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">
            ページを正しく読み込めませんでした
          </p>
          <p className="text-on-muted">
            現在、このページには一時的にアクセスできません。時間を置いて再度アクセスいただくか、以下の方法をご確認ください。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="ghost" onClick={reset}>
            再読み込み
          </Button>
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>
            <HomeIcon className="size-4" />
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
