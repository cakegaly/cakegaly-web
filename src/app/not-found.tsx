'use client';

import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/shadcn-ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] max-w-screen-lg flex-col items-center justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
        <h1 className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
          404
        </h1>

        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            ページが見つかりません
          </h2>
          <p className="text-muted-foreground">
            アドレスが変更されたか、ページが削除された可能性があります。
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              ホームに戻る
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            前のページに戻る
          </Button>
        </div>

        <div className="mt-8 text-8xl font-bold opacity-10">{':('}</div>
      </div>
    </div>
  );
}
