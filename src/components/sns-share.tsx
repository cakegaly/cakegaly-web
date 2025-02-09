'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { absoluteUrl } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';

type SnsShareProps = {
  articleId: string;
  articleTitle: string;
};

export function SnsShare({ articleId, articleTitle }: SnsShareProps) {
  const encodedUrl = encodeURIComponent(absoluteUrl(`/article/${articleId}`));
  const encodedTitle = encodeURIComponent(articleTitle);

  const isBrowser = typeof window !== 'undefined';
  const urlCopyHandler = async () => {
    if (!isBrowser) return;
    try {
      await navigator.clipboard
        .writeText(absoluteUrl(`/article/${articleId}`))
        .then(() => {
          toast(
            <div className="text-lg text-tertiary">
              この記事のリンクをコピーしました！
            </div>,
            { position: 'bottom-center' },
          );
        });
    } catch {
      console.error('記事URLのコピーに失敗しました。');
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">シェアお願いします！</h3>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex h-5 items-center space-x-6 text-sm">
            <Link
              className="rounded-[6px] bg-primary p-1"
              href={`https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.twitter className="size-6" />
              <span className="sr-only">Xに投稿する</span>
            </Link>
            <Link
              href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.line className="size-8" />
              <span className="sr-only">LINEでシェア</span>
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.facebook className="size-8" />
              <span className="sr-only">Facebookでシェア</span>
            </Link>
            <Separator orientation="vertical" />
            <Button
              variant="outline"
              onClick={urlCopyHandler}
              className="rounded-[6px] border-none p-1 hover:bg-gray-200"
            >
              <Icons.clip className="size-8" />
              <span className="sr-only">リンクをコピー</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
