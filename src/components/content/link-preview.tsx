import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { getOGData } from '@/actions/fetch-og-metadata';
import { getBlogPostBySlug } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface LinkCardProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
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
                <span>{hostname.replace(/^www\./, '')}</span>
                <ExternalLink className="size-3 text-muted-foreground/70" />
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <div className="size-4 rounded-full bg-primary/10">
                  <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-primary">
                    B
                  </span>
                </div>
                <span>Blog Post</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
            {title || 'Untitled'}
          </h3>
          {description && (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {image ? (
        <div className="hidden w-[148px] shrink-0 sm:block">
          <div className="relative h-full w-full">
            <Image
              src={image || '/placeholder.svg'}
              alt={title || ''}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 148px"
            />
          </div>
        </div>
      ) : (
        <div className="hidden w-[148px] shrink-0 bg-muted/30 sm:block">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl text-muted-foreground/20">
              {isExternal ? '🔗' : '📝'}
            </span>
          </div>
        </div>
      )}
    </>
  );

  const cardClasses = cn(
    'group my-4 flex overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:bg-accent/5 hover:shadow-md',
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

async function InternalLinkCard({ url }: { url: string }) {
  const slug = getSlugFromUrl(url);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <LinkCard
        url={url}
        title="Blog Post Not Found"
        description="This post may have been removed or the URL is incorrect."
      />
    );
  }

  return (
    <LinkCard
      url={url}
      title={post.metadata.title}
      description={post.metadata.description}
      image={post.metadata.thumbnail || '/images/blog-placeholder.jpg'}
    />
  );
}

async function ExternalLinkCard({ url }: { url: string }) {
  const ogData = await getOGData(url);

  return (
    <LinkCard
      url={url}
      title={ogData.title}
      description={ogData.description}
      image={ogData.image}
    />
  );
}

export function LinkPreview({ url, className }: LinkPreviewProps) {
  const isInternal = !url.startsWith('http') || isInternalBlogLink(url);

  return (
    <Suspense
      fallback={
        <div className="my-4 h-[124px] animate-pulse rounded-lg border bg-muted/50" />
      }
    >
      {isInternal ? (
        <InternalLinkCard url={url} />
      ) : (
        <ExternalLinkCard url={url} />
      )}
    </Suspense>
  );
}
