import { getAllBlogPosts } from '@/lib/mdx';

import { BlogCard } from '@/components/content/blog-card';

export default async function TopPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <section className="container max-w-screen-md py-6 md:py-12">
      <div className="space-y-6">
        {allPosts.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
    </section>
  );
}
