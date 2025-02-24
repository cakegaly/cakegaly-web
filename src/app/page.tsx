import { BlogCard } from '@/components/blog-card';
import { siteConfig } from '@/config/site';
import { getBlogPosts } from '@/lib/mdx';
import { blurImageUrl } from '@/lib/utils';

export default async function TopPage() {
  const contents = await getBlogPosts();
  const articles = await Promise.all(
    // TODO: pagination or categorize
    contents.map(async (post) => ({
      ...post,
      blurDataURL: await blurImageUrl(
        post.metadata.thumbnail ?? siteConfig.ogImage
      ),
    }))
  );

  return (
    <section className="container max-w-screen-lg py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <BlogCard key={index} data={article} priority={index <= 2} />
        ))}
      </div>
    </section>
  );
}
