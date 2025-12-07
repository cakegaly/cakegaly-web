import Link from 'next/link';
import { WrenchIcon } from 'lucide-react';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';
import { Button } from '@/components/ui/button';
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
          <div className="flex flex-col gap-1">
            {allPosts.map((blog, i) => (
              <BlogCard key={i} data={blog} />
            ))}
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex flex-wrap gap-2">
            {siteConfig.navItems.map((tool, i) => (
              <Button key={i} variant="ghost" asChild>
                <Link href={tool.href}>
                  <WrenchIcon />
                  {tool.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
