import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

export type Article = {
  id: string;
  title: string;
  description: string;
  thumbnail?: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export async function getPosts(queries?: MicroCMSQueries) {
  try {
    const articles = await client.getList<Article>({
      customRequestInit: {
        next: {
          revalidate: 3600,
        },
      },
      endpoint: 'blog-posts',
      queries,
    });
    return articles;
  } catch (error) {
    return notFound();
  }
}

export async function getPost(contentId: string, queries?: MicroCMSQueries) {
  try {
    const post = await client.getListDetail<Article>({
      customRequestInit: {
        next: {
          revalidate: 3600,
        },
      },
      endpoint: 'blog-posts',
      contentId,
      queries,
    });
    return post;
  } catch (error) {
    return notFound();
  }
}
