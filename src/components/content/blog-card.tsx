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
  const Icon = TechIcons[metadata.icon ?? 'default'];

  return (
    <article className="relative flex items-start gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:bg-accent/5 hover:shadow-md">
      {/* Tech Icon (左配置) */}
      <div className="size-12 flex-shrink-0 rounded-lg bg-muted/50 p-3">
        <Icon className="size-6 text-accent" />
      </div>

      <Link
        href={`/blog/${slug}`}
        className="flex flex-1 flex-col space-y-1 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {metadata.title}
        </h2>

        {/* Description */}
        {metadata.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
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
                  <span className="text-xs">+{metadata.tags.length - 2}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
