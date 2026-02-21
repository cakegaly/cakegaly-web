import { Suspense } from 'react';
import { ExternalLinkIcon, LinkIcon } from 'lucide-react';

import { getBlogPostBySlug } from '@/features/blog/lib/blog';
import { getOGData } from '@/features/blog/lib/og';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

interface LinkPreviewProps {
  url: string;
  className?: string;
}

async function resolveMetadata(url: string) {
  if (url.startsWith('/blog/')) {
    const slug = url.split('/').pop() || '';
    const post = await getBlogPostBySlug(slug);
    if (!post) return null;
    return {
      title: post.metadata.title,
      description: post.metadata.description,
    };
  }

  try {
    const og = await getOGData(url);
    if (!og?.title) return null;
    return { title: og.title, description: og.description || '' };
  } catch {
    return null;
  }
}

async function LinkPreviewCard({ url, className }: LinkPreviewProps) {
  const metadata = await resolveMetadata(url);
  const isExternal = url.startsWith('http');
  const hostname = isExternal ? new URL(url).hostname : '';

  const content = (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="text-on-muted flex items-center gap-1.5 text-xs font-medium">
        {isExternal ? (
          <>
            <LinkIcon className="size-4" />
            <span>{hostname}</span>
            <ExternalLinkIcon className="size-3" />
          </>
        ) : (
          <span className="flex items-center gap-1.5">
            <div className="bg-neutral/10 size-4 rounded-full">
              <span className="text-neutral flex h-full w-full items-center justify-center text-[10px]">
                B
              </span>
            </div>
            <span>{siteConfig.name}</span>
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-on-background group-hover:text-accent line-clamp-1 leading-tight font-semibold transition-colors">
          {metadata?.title || 'Page Not Found'}
        </h3>
        <p className="text-on-muted mt-1.5 line-clamp-1 text-sm">
          {metadata?.description || 'This page may have been moved or deleted.'}
        </p>
      </div>
    </div>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group bg-muted hover:bg-muted-hovered active:bg-muted-active flex overflow-hidden rounded-lg',
        'my-4',
        !metadata && 'border-border/50 bg-background/50',
        className
      )}
    >
      {content}
    </a>
  );
}

export function LinkPreview({ url, className }: LinkPreviewProps) {
  return (
    <Suspense fallback={<LinkPreviewSkeleton className={className} />}>
      <LinkPreviewCard url={url} className={className} />
    </Suspense>
  );
}

function LinkPreviewSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-muted my-4 flex h-[108px] rounded-lg', className)}>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="bg-muted/50 h-4 w-24 animate-pulse rounded" />
        <div className="bg-muted/50 mt-2 h-5 w-3/4 animate-pulse rounded" />
        <div className="bg-muted/50 mt-1.5 h-4 w-full animate-pulse rounded" />
      </div>
    </div>
  );
}
