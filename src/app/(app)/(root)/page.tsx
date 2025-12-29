import Link from 'next/link';

import { ProfileCard } from '@/components/content/profile-card';
import { buttonVariants } from '@/components/ui/button';
import { TextLink } from '@/components/ui/text-link';
import { getAllPosts } from '@/lib/articles';
import { siteConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function IndexPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <ProfileCard />
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold">Writing</h2>
              <div className="flex flex-col gap-4">
                {allPosts.map((blog, i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <TextLink href={blog.href} size="sm" className="min-w-0">
                      {blog.title}
                    </TextLink>
                    <span className="text-on-muted shrink-0 text-xs">
                      {formatDate(blog.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {siteConfig.navItems.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={i}
                      href={tool.href}
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                      })}
                    >
                      <Icon />
                      {tool.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
