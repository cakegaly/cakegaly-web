import fs from 'fs';
import path from 'path';

import { tags } from '@/config/blog';
import { getAllBlogPosts } from '@/lib/mdx';

const OUTPUT_PATH = path.join(
  process.cwd(),
  'public',
  'search',
  'search-index.json'
);

(async function generateSearchIndex() {
  const allPosts = await getAllBlogPosts();

  const posts = allPosts.map((post) => ({
    title: post.metadata.title,
    slug: post.slug,
    description: post.metadata.description || '',
    tags: post.metadata.tags || [],
  }));

  const usedTags = allPosts
    .flatMap((post) => post.metadata.tags || [])
    .reduce<Record<string, { name: string; count: number }>>((acc, tagSlug) => {
      if (tags[tagSlug]) {
        if (!acc[tagSlug]) {
          acc[tagSlug] = { name: tags[tagSlug].name, count: 0 };
        }
        acc[tagSlug].count++;
      }
      return acc;
    }, {});

  const indexData = {
    posts,
    tags: usedTags,
    lastUpdated: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(indexData, null, 2), 'utf-8');

  console.log(`✅ search index generated successfully: ${OUTPUT_PATH}`);
})();
