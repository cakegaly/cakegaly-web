// import { MetadataRoute } from 'next';

// /**
//  * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
//  */
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const sitemapEntries: MetadataRoute.Sitemap = [];

//   // top page
//   sitemapEntries.push({
//     url: `${process.env.NEXT_PUBLIC_APP_URL}`,
//   });

//   // blog page
//   // const posts = await getPosts();
//   // ...

//   return sitemapEntries;
// }
import { siteConfig } from '@/config/site';
import { getBlogPosts } from '@/lib/mdx';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  const posts = await getBlogPosts();

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  return [...staticPages, ...blogEntries];
}
