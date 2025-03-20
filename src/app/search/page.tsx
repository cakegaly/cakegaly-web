import { Search } from '@/components/search';
import { tags } from '@/config/blog';
import { getAllBlogPosts } from '@/lib/mdx';

export default async function SearchPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <div className="container max-w-screen-md py-6 md:py-12">
      <Search posts={allPosts} tags={tags} />
    </div>
  );
}
