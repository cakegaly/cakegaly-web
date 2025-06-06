import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/preview/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
