import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';
import { TextLink } from '@/components/base-ui/text-link';
import { getBlogs } from '@/features/blog/lib/blog';
import { BlogQuery } from '@/features/blog/types';

export async function BlogList({
  limit,
  withZenn,
  tagSlug,
  showMore,
}: BlogQuery & { showMore?: boolean }) {
  const allPosts = await getBlogs({ limit, withZenn, tagSlug });

  return (
    <div className="flex flex-col gap-4">
      {allPosts.map((blog, i) => (
        <div key={i} className="flex justify-between gap-2">
          <TextLink href={blog.link} size="sm" className="min-w-0">
            {blog.title}
          </TextLink>
          <span className="text-on-muted shrink-0 text-xs">{blog.pubDate}</span>
        </div>
      ))}
      {showMore && (
        <div className="inline-flex items-center justify-end">
          <Link
            href="/blog"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            All
            <ArrowRightIcon />
          </Link>
        </div>
      )}
    </div>
  );
}
