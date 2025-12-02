import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/content/blog-card';
import { ProfileCard } from '@/components/content/profile-card';
import { ToolCard } from '@/components/content/tool-card';

export const revalidate = false;
export const dynamic = 'force-static';

export default async function IndexPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <div className="flex flex-1 flex-col">
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex flex-col gap-6">
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex flex-col">
            {allPosts.map((blog, i) => (
              <BlogCard key={i} data={blog} />
            ))}
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.navItems.map((tool, i) => (
              <ToolCard
                key={i}
                href={tool.href}
                title={tool.title}
                description={tool.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
