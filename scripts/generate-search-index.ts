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
  }));

  const usedTags = allPosts
    .flatMap((post) => post.metadata.tags || [])
    .reduce<Record<string, { name: string }>>((acc, tagSlug) => {
      if (tags[tagSlug] && !acc[tagSlug]) {
        acc[tagSlug] = { name: tags[tagSlug].name };
      }
      return acc;
    }, {});

  const indexData = {
    posts,
    tags: usedTags,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(indexData, null, 2), 'utf-8');

  console.log(`✅ search-index.json を生成しました: ${OUTPUT_PATH}`);
})();
