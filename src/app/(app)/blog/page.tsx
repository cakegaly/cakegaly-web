import { Metadata } from 'next';

import { BlogList } from '@/features/blog/components/blog-list';
import { TagList } from '@/features/blog/components/tag-list';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'All Blogs';

export const metadata: Metadata = {
  title,
};

export default async function BlogListPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-bold">{title}</h1>
            <TagList activeSlug="all" />
            <BlogList withZenn />
          </div>
        </div>
      </div>
    </div>
  );
}
