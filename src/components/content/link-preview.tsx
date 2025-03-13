import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { getOGData } from '@/actions/fetch-og-metadata';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { getBlogPostBySlug } from '@/lib/mdx';
import { cn } from '@/lib/utils';

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
  image,
  className,
  error = false,
  hideImage = false,
}: LinkCardProps) {
  const isExternal = url.startsWith('http');
  const hostname = isExternal ? new URL(url).hostname : '';

  const CardContent = (
    <>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            {isExternal ? (
              <>
                <div className="relative size-4 overflow-hidden rounded-full bg-muted">
                  {hostname && (
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
                      alt=""
                      className="object-cover"
                      fill
                      sizes="16px"
                    />
                  )}
                </div>
                <span>{hostname.replace('/^[www./](http://www./)', '')}</span>
                <Icons.externalLink className="size-3 text-muted-foreground/70" />
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <div className="size-4 rounded-full bg-primary/10">
                  <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-primary">
                    B
                  </span>
                </div>
                <span>{siteConfig.name}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="line-clamp-1 font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
            {error ? 'Page Not Found' : title || 'Untitled'}
          </h3>
          {error ? (
            <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">
              This page may have been moved or deleted.
            </p>
          ) : description ? (
            <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* TODO: display og image */}
      {/* {!hideImage && (
        <div
          className={cn(
            'hidden w-[148px] shrink-0 sm:block',
            !image && 'bg-muted/30'
          )}
        >
          {image ? (
            <div className="relative h-full w-full">
              <ImageWithFallback
                src={image || '/placeholder.svg'}
                alt={title || 'Link preview'}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl text-muted-foreground/20">
                {isExternal ? '🔗' : '📝'}
              </span>
            </div>
          )}
        </div>
      )} */}
    </>
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
    <Suspense
      fallback={
        <LinkCardSkeleton className={className} hideImage={hideImage} />
      }
    >
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

function LinkCardSkeleton({
  className,
  hideImage,
}: {
  className?: string;
  hideImage?: boolean;
}) {
  return (
    <div
      className={cn('my-4 flex h-[108px] rounded-lg border bg-card', className)}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
        <div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-muted/50" />
        <div className="mt-1.5 h-4 w-full animate-pulse rounded bg-muted/50" />
      </div>

      {/* TODO: display og image */}
      {/* {!hideImage && (
        <div className="hidden w-[148px] animate-pulse bg-muted/50 sm:block" />
      )} */}
    </div>
  );
}
