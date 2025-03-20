import fs from 'fs';
import path from 'path';

import { getAllBlogPosts } from '@/lib/mdx';

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'search-index.json');

(async function generateIndex() {
  const posts = await getAllBlogPosts();

  const searchIndex = posts.map((post) => ({
    title: post.metadata.title,
    slug: post.slug,
    description: post.metadata.description,
    tags: post.metadata.tags,
    date: post.metadata.date,
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(searchIndex, null, 2));
  console.log(`✅ Search index generated: ${OUTPUT_PATH}`);
})();
