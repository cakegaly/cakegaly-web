import Link from 'next/link';

import { tags } from '@/config/blog';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/shadcn-ui/badge';
import { TechIcons } from '@/components/icons';

interface BlogCardProps {
  data: Pick<BlogPost, 'metadata' | 'slug'>;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;
  const Icon = TechIcons[metadata.icon ?? 'default'];

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex items-start gap-4 overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:bg-accent/5 hover:shadow-md"
    >
      {/* Eyecatch (TechIcon) */}
      <div className="size-16 flex-shrink-0 rounded-md p-3 transition-colors">
        <Icon className="size-10 transition-colors" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-2">
        {/* Title */}
        <h2 className="line-clamp-2 font-heading text-base font-medium tracking-tight md:text-lg">
          {metadata.title}
        </h2>

        {/* Description */}
        {metadata.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <time className="font-mono" dateTime={metadata.date}>
              {formatDate(metadata.date)}
            </time>
          </div>

          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                {metadata.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} className="px-2 py-0.5 text-xs font-medium">
                    {tags[tag]?.name}
                  </Badge>
                ))}
                {metadata.tags.length > 2 && (
                  <span className="text-xs">+{metadata.tags.length - 2}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
