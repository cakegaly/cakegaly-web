import { TextLink } from '@/components/base-ui/text-link';
import { getBlogs } from '@/features/blog/lib/blog';
import { BlogQuery } from '@/features/blog/types';

export async function BlogList({ limit, withZenn, tagSlug }: BlogQuery) {
  const allPosts = await getBlogs({ limit, withZenn, tagSlug });

  return (
    <div className="@container flex flex-col gap-4">
      {allPosts.map((blog, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 @md:flex-row @md:justify-between"
        >
          <TextLink href={blog.link} size="sm" className="min-w-0">
            {blog.title}
          </TextLink>
          <span className="text-on-muted shrink-0 text-xs">{blog.pubDate}</span>
        </div>
      ))}
    </div>
  );
}
