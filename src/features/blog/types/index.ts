import type { MDXData } from '@/lib/mdx';

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
}>;

export interface Article {
  title: string;
  link: string;
  pubDate: string;
}
