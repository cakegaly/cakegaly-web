import { getAllBlogPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/content/blog-card';
import { ProfileCard } from '@/components/content/profile-card';

export const revalidate = false;
export const dynamic = 'force-static';

export default async function IndexPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <div className="flex flex-1 flex-col">
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <ProfileCard />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="text-2xl font-bold">Blog</div>
          <div className="flex flex-col gap-6">
            {allPosts.map((blog, index) => (
              <BlogCard key={index} data={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
