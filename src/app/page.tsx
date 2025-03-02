import { BlogCard } from '@/components/blog-card';
import { getBlogPosts } from '@/lib/mdx';

export default async function TopPage() {
  const allPosts = await getBlogPosts();

  return (
    <section className="container max-w-screen-lg py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {allPosts.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
    </section>
  );
}
