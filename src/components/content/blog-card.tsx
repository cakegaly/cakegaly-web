import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  data: Pick<BlogPost, 'metadata' | 'slug'>;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex items-center justify-between gap-4 py-3"
    >
      <div className="flex-1">
        <h2 className="line-clamp-1 font-medium">{metadata.title}</h2>
        <time
          dateTime={metadata.date}
          className="text-on-muted mt-0.5 block text-xs"
        >
          {formatDate(metadata.date)}
        </time>
      </div>
      <ArrowRightIcon className="text-on-muted size-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
