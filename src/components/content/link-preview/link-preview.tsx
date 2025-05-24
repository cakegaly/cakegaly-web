import { Suspense } from 'react';
import Link from 'next/link';
import { getOGData } from '@/actions/fetch-og-metadata';

import { siteConfig } from '@/config/site';
import { getBlogPostBySlug } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

interface LinkCardProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  error?: boolean;
  hideImage?: boolean;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
  hideImage?: boolean;
}

function isInternalBlogLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/blog/');
  } catch {
    return url.startsWith('/blog/');
  }
}

function getSlugFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    return parts[parts.length - 1];
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}

export function LinkCard({
  url,
  title,
  description,
  className,
  error = false,
}: LinkCardProps) {
  const isExternal = url.startsWith('http');
  const hostname = isExternal ? new URL(url).hostname : '';

  const CardContent = (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="flex items-center gap-1">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          {isExternal ? (
            <>
              <Icons.link className="text-muted-foreground/70 size-4" />
              <span>{hostname.replace('/^[www./](http://www./)', '')}</span>
              <Icons.externalLink className="text-muted-foreground/70 size-3" />
            </>
          ) : (
            <span className="flex items-center gap-1.5">
              <div className="bg-primary/10 size-4 rounded-full">
                <span className="text-primary flex h-full w-full items-center justify-center text-[10px]">
                  B
                </span>
              </div>
              <span>{siteConfig.name}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-foreground group-hover:text-accent line-clamp-1 leading-tight font-semibold transition-colors">
          {error ? 'Page Not Found' : title || 'Untitled'}
        </h3>
        {error ? (
          <p className="text-muted-foreground mt-1.5 line-clamp-1 text-sm">
            This page may have been moved or deleted.
          </p>
        ) : description ? (
          <p className="text-muted-foreground mt-1.5 line-clamp-1 text-sm">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );

  const cardClasses = cn(
    'group my-4 flex overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:bg-accent/5 hover:shadow-md',
    error && 'border-border/50 bg-card/50',
    className
  );

  return isExternal ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
    >
      {CardContent}
    </a>
  ) : (
    <Link href={url} className={cardClasses}>
      {CardContent}
    </Link>
  );
}

async function InternalLinkCard({
  url,
  className,
  hideImage,
}: {
  url: string;
  className?: string;
  hideImage?: boolean;
}) {
  const slug = getSlugFromUrl(url);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <LinkCard
        url={url}
        error={true}
        className={className}
        hideImage={hideImage}
      />
    );
  }

  return (
    <LinkCard
      url={url}
      title={post.metadata.title}
      description={post.metadata.description}
      image={post.metadata.thumbnail || siteConfig.ogImage}
      className={className}
      hideImage={hideImage}
    />
  );
}

async function ExternalLinkCard({
  url,
  className,
  hideImage,
}: {
  url: string;
  className?: string;
  hideImage?: boolean;
}) {
  try {
    const ogData = await getOGData(url);

    if (!ogData.title) {
      return (
        <LinkCard
          url={url}
          error={true}
          className={className}
          hideImage={hideImage}
        />
      );
    }

    return (
      <LinkCard
        url={url}
        title={ogData.title}
        description={ogData.description}
        image={ogData.image}
        className={className}
        hideImage={hideImage}
      />
    );
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return (
      <LinkCard
        url={url}
        error={true}
        className={className}
        hideImage={hideImage}
      />
    );
  }
}

export function LinkPreview({ url, className, hideImage }: LinkPreviewProps) {
  const isInternal = !url.startsWith('http') && isInternalBlogLink(url);

  return (
    <Suspense fallback={<LinkCardSkeleton className={className} />}>
      {isInternal ? (
        <InternalLinkCard
          url={url}
          className={className}
          hideImage={hideImage}
        />
      ) : (
        <ExternalLinkCard
          url={url}
          className={className}
          hideImage={hideImage}
        />
      )}
    </Suspense>
  );
}

function LinkCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('bg-card my-4 flex h-[108px] rounded-lg border', className)}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="bg-muted/50 h-4 w-24 animate-pulse rounded" />
        <div className="bg-muted/50 mt-2 h-5 w-3/4 animate-pulse rounded" />
        <div className="bg-muted/50 mt-1.5 h-4 w-full animate-pulse rounded" />
      </div>
    </div>
  );
}
