import Link from 'next/link';

import { Icons } from '@/components/icons';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  data: BlogPost;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata } = data;
  // const EyecatchIcon = Icons[metadata.eyecatch ?? 'fileText'] ?? Icons.fileText;
  const EyecatchIcon = Icons.calendar;

  return (
    <article className="group relative flex gap-4">
      <div className="inline-flex size-24 items-center justify-center rounded-sm">
        <EyecatchIcon className="size-12" />
        <span className="sr-only">{'expression icon'}</span>
      </div>
      <div className="flex-1">
        <div className="font-bold group-hover:underline">{metadata.title}</div>
        <div className="mt-2 inline-flex items-center gap-2 text-xs">
          <Icons.calendar className="size-4" />
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
        </div>
      </div>
      <Link href={`/blog/${data.slug}`} className="absolute inset-0">
        <span className="sr-only">{'記事を読む'}</span>
      </Link>
    </article>
  );
}
