import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

import { TechIcons } from '@/components/icons';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  data: BlogPost;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;
  const Icon = TechIcons[metadata.eyecatch ?? 'fileHeart'];

  return (
    <article className="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/5">
      <Link
        href={`/blog/${slug}`}
        className="block p-6 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Tech Icon */}
        <div className="mb-4 inline-flex rounded-lg bg-muted/50 p-3">
          <Icon className="size-6 text-accent" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {metadata.title}
          </h2>

          {metadata.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {metadata.description}
            </p>
          )}

          {/* Metadata */}
          <div className="pt-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <time dateTime={metadata.date}>
                  {formatDate(metadata.date)}
                </time>
              </div>

              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="size-4" />
                  <div className="flex gap-1">
                    {metadata.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {metadata.tags.length > 2 && (
                      <span className="text-xs">
                        +{metadata.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
