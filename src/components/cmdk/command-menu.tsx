import { CommandDialog } from '@/components/cmdk/command-dialog';
import { getAllBlogPosts } from '@/lib/mdx';

export async function CommandMenu() {
  const blogPosts = await getAllBlogPosts();

  return <CommandDialog blogPosts={blogPosts} />;
}
