'use server';

import { parse } from 'node-html-parser';
import { cache } from 'react';

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const getOGData = cache(
  async (url: string): Promise<Partial<OGData>> => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'bot',
        },
      });

      const html = await response.text();
      const root = parse(html);

      const getMetaContent = (property: string) => {
        const element = root.querySelector(
          `meta[property="${property}"], meta[name="${property}"]`
        );
        return element?.getAttribute('content');
      };

      return {
        title:
          getMetaContent('og:title') || root.querySelector('title')?.text || '',
        description:
          getMetaContent('og:description') ||
          getMetaContent('description') ||
          '',
        image: getMetaContent('og:image') || '',
        url,
      };
    } catch (error) {
      console.error('Error fetching OG data:', error);
      return { url };
    }
  }
);
