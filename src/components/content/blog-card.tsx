import Link from 'next/link';

import { tags } from '@/lib/blog';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TechIcons } from '@/components/shared/tech-icons';

interface BlogCardProps {
  data: Pick<BlogPost, 'metadata' | 'slug'>;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;
  const Icon = TechIcons[metadata.icon ?? 'default'];
  const displayTags = metadata.tags?.slice(0, 2) ?? [];
  const remainingCount = (metadata.tags?.length ?? 0) - 2;

  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-background hover:bg-background-hovered flex gap-4 rounded-xl p-5"
    >
      <div className="flex size-16 shrink-0 items-center justify-center">
        <Icon className="size-10" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 className="line-clamp-2 text-base font-medium tracking-tight md:text-lg">
          {metadata.title}
        </h2>

        {metadata.description && (
          <p className="text-on-muted line-clamp-2 text-xs md:text-sm">
            {metadata.description}
          </p>
        )}

        <div className="text-on-muted flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs">
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>

          {displayTags.length > 0 && (
            <div className="flex items-center gap-1.5">
              {displayTags.map((tag) => (
                <Badge key={tag}>{tags[tag]?.name}</Badge>
              ))}
              {remainingCount > 0 && <span>+{remainingCount}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
