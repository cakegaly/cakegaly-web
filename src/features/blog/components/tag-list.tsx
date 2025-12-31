import Link from 'next/link';

import { badgeVariants } from '@/components/base-ui/badge';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';

export function TagList({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={badgeVariants({
          variant: activeSlug === 'all' ? 'neutral' : 'outline',
        })}
      >
        All
      </Link>
      {INTERNAL_BLOG_TAGS.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tag/${tag.slug}`}
          className={badgeVariants({
            variant: activeSlug === tag.slug ? 'neutral' : 'outline',
          })}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
