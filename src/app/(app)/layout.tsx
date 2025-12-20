import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { getAllBlogPosts } from '@/lib/mdx';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="bg-canvas relative z-10 flex min-h-svh flex-col">
      <SiteHeader blogPosts={blogPosts} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
