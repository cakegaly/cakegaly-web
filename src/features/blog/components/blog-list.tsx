import { TextLink } from '@/components/base-ui/text-link';
import { getAllPosts } from '@/features/blog/lib/blog';

export async function BlogList() {
  const allPosts = await getAllPosts();

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
    </div>
  );
}
