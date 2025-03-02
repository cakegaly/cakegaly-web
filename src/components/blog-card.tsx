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
    <article className="group relative flex gap-4">
      <div className="inline-flex size-24 items-center justify-center rounded-sm bg-muted/50">
        <Icon className="size-12" />
        <span className="sr-only">{'expression icon'}</span>
      </div>
      <div className="flex-1">
        <div className="font-bold">{metadata.title}</div>
        <div className="mt-2 inline-flex items-center gap-2 text-xs">
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
        </div>
      </div>
      <Link
        href={`/blog/${slug}`}
        className="absolute inset-0 rounded-lg ring-1 ring-inset ring-transparent transition-all group-hover:ring-accent/50"
      >
        <span className="sr-only">{'記事を読む'}</span>
      </Link>
    </article>
  );
}
