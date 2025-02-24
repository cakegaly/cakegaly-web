import { MetadataRoute } from 'next';

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // top page
  sitemapEntries.push({
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  });

  // blog page
  // const posts = await getPosts();
  // ...

  return sitemapEntries;
}
