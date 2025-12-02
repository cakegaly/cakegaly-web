import { TagIcon } from 'lucide-react';

import { tags } from '@/lib/blog';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { BlogCard } from '@/components/content/blog-card';

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return Object.keys(tags).map((slug) => ({
    slug: slug,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPostsByTagSlug(slug);

  return (
    <div className="flex flex-1 flex-col">
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
              <TagIcon className="text-on-muted size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-on-background text-2xl font-bold">
                {tags[slug].name}
              </h1>
              <p className="text-on-muted text-sm">{posts.length}件の記事</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex flex-col gap-1">
            {posts.map((blog, index) => (
              <BlogCard key={index} data={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
