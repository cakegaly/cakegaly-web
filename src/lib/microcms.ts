import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

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

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  thumbnail?: MicroCMSImage;
} & MicroCMSDate;

export async function getBlogPosts(queries?: MicroCMSQueries) {
  const response = await client.getList<BlogPost>({
    customRequestInit: {
      next: {
        revalidate: false,
      },
    },
    endpoint: 'blog-posts',
    queries,
  });
  return response;
}

export async function getBlogPost(
  contentId: string,
  queries?: MicroCMSQueries
) {
  const response = await client.getListDetail<BlogPost>({
    customRequestInit: {
      next: {
        revalidate: false,
      },
    },
    endpoint: 'blog-posts',
    contentId,
    queries,
  });
  return response;
}
