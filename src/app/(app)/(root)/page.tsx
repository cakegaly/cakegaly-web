import { ProfileCard } from '@/components/shared/profile-card';
import { BlogList } from '@/features/blog/components/blog-list';
import { ToolList } from '@/features/tool/components/tool-list';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-12">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col">
              <h1 className="sr-only">{siteConfig.name}</h1>
              <ProfileCard />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-medium">Writing</h2>
                <BlogList withZenn limit={5} showMore />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-medium">Tools</h2>
                <ToolList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
