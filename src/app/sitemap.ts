import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/features/blog/lib/blog';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';
import { tools } from '@/features/tool/lib/config';
import { siteConfig } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  const posts = await getBlogPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
  }));

  const tagPages = INTERNAL_BLOG_TAGS.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
  }));

  const staticPages = [
    {
      url: baseUrl,
    },
    {
      url: `${baseUrl}/blog`,
    },
  ];

  return [...staticPages, ...blogPages, ...tagPages, ...toolPages];
}
