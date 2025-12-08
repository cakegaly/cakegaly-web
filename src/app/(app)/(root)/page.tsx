import Link from 'next/link';
import { WrenchIcon } from 'lucide-react';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TextLink } from '@/components/ui/text-link';
import { ProfileCard } from '@/components/content/profile-card';

export const revalidate = false;
export const dynamic = 'force-static';

export default async function IndexPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <ProfileCard />
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-2">
            {allPosts.map((blog, i) => (
              <div key={i} className="flex w-full justify-between">
                <TextLink
                  href={`/blog/${blog.slug}`}
                  size="sm"
                  className="line-clamp-1"
                >
                  {blog.metadata.title}
                </TextLink>
                <span className="text-on-muted shrink-0 text-xs">
                  {formatDate(blog.metadata.date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-1">
            {allPosts.map((blog, i) => (
              <BlogCard key={i} data={blog} />
            ))}
          </div>
        </div>
      </div> */}
      <div className="container-wrapper">
        <div className="container py-6">
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
