import { CommandDialog } from '@/components/cmdk/command-dialog';
import { getBlogPosts } from '@/features/blog/lib/blog';

export async function CommandMenu() {
  const blogPosts = await getBlogPosts();

  return <CommandDialog blogPosts={blogPosts} />;
}
