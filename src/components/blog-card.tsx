import type { BlogPost } from '@/lib/mdx';
import Link from 'next/link';

import BlurImage from '@/components/blur-image';
import { blurPlaceHolder, cn, formatDate } from '@/lib/utils';

import Author from '@/components/author';
import { siteConfig } from '@/config/site';

interface BlogCardProps {
  data: BlogPost & {
    blurDataURL: string;
  };
  priority?: boolean;
  variant?: 'vertical' | 'horizontal';
}

export function BlogCard({
  data,
  priority,
  variant = 'vertical',
}: BlogCardProps) {
  const thumbnail = siteConfig.ogImage;

  return (
    <article
      className={cn(
        'group relative',
        variant === 'horizontal'
          ? 'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6'
          : 'flex flex-col space-y-2'
      )}
    >
      {thumbnail && (
        <div className="w-full overflow-hidden rounded-xl border">
          <BlurImage
            alt={data.metadata.title}
            blurDataURL={data.blurDataURL ?? blurPlaceHolder}
            className={cn(
              'size-full object-cover object-center',
              variant === 'horizontal' ? 'lg:h-72' : null
            )}
            width={800}
            height={400}
            priority={priority}
            placeholder="blur"
            src={thumbnail}
            sizes="(max-width: 768px) 750px, 600px"
          />
        </div>
      )}
      <div
        className={cn(
          'flex flex-1 flex-col',
          variant === 'horizontal' ? 'justify-center' : 'justify-between'
        )}
      >
        <div className="w-full">
          <h2 className="my-1.5 line-clamp-2 text-2xl font-bold">
            {data.metadata.title}
          </h2>
          {data.metadata.description && (
            <p className="line-clamp-2 text-muted-foreground">
              {data.metadata.description}
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <div className="flex items-center -space-x-2">
            <Author imageOnly />
          </div>

          {data.metadata.date && (
            <p className="text-sm text-muted-foreground">
              {formatDate(data.metadata.date)}
            </p>
          )}
        </div>
      </div>
      <Link href={`blog/${data.slug}`} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}
