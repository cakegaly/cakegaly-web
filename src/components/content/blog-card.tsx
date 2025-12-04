import Link from 'next/link';

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
      className="group inline-flex items-center justify-between gap-2 rounded-xl p-2 transition-colors"
    >
      <span className="line-clamp-1 text-sm font-medium group-hover:underline">
        {metadata.title}
      </span>
      <span className="text-xs">{formatDate(metadata.date)}</span>
    </Link>
  );
}
