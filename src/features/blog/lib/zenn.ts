import 'server-only';

import type { Article } from '@/features/blog/types';

const ZENN_FEED_URL = 'https://zenn.dev/cakegaly/feed?all=1';

export async function getZennArticles() {
  const xml = await fetchZennRssFeed(ZENN_FEED_URL);
  if (!xml) return [];

  return parseZennRss(xml);
}

async function fetchZennRssFeed(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      // next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch zenn feed: ${res.status} ${res.statusText}`
      );
    }
    return await res.text();
  } catch (error) {
    console.error('Error fetching zenn feed: ', error);
    return null;
  }
}

function parseZennRss(xml: string): Article[] {
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map(
    (m) => m[1] ?? ''
  );

  const articles: Article[] = [];

  for (const item of items) {
    const title = getTagText(item, 'title');
    const link = getTagText(item, 'link');
    const pubDate = getTagText(item, 'pubDate');

    if (title && link && pubDate) {
      articles.push({ title, link, pubDate });
    }
  }

  return articles;
}

function getTagText(xml: string, tag: string): string {
  const cdata = xml.match(
    new RegExp(
      `<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`,
      'i'
    )
  )?.[1];

  if (cdata != null) return cdata.trim();

  const normal = xml.match(
    new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*<\\/${tag}>`, 'i')
  )?.[1];

  if (normal == null) return '';

  return decodeBasicEntities(normal.trim());
}

function decodeBasicEntities(s: string): string {
  return s
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');
}
