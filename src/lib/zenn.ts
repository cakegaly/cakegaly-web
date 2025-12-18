import { cache } from 'react';

export interface ZennArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export const getZennArticles = cache(
  async (username: string = 'cakegaly'): Promise<ZennArticle[]> => {
    try {
      const response = await fetch(`https://zenn.dev/${username}/feed?all=1`, {
        cache: 'force-cache',
      });

      if (!response.ok) {
        console.error('Failed to fetch Zenn RSS:', response.statusText);
        return [];
      }

      const xml = await response.text();
      const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
      const articles: ZennArticle[] = [];

      for (const match of itemMatches) {
        const itemContent = match[1];

        const titleMatch = itemContent.match(
          /<title><!\[CDATA\[(.*?)\]\]><\/title>/
        );
        const title = titleMatch?.[1] || '';

        const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
        const link = linkMatch?.[1] || '';

        const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
        const pubDate = pubDateMatch?.[1] || '';

        const descriptionMatch = itemContent.match(
          /<description><!\[CDATA\[(.*?)\]\]><\/description>/
        );
        const description = descriptionMatch?.[1] || '';

        if (title && link && pubDate) {
          articles.push({
            title,
            link,
            pubDate,
            description,
          });
        }
      }

      return articles;
    } catch (error) {
      console.error('Error fetching Zenn RSS:', error);
      return [];
    }
  }
);
