import type { MDXData } from '@/lib/mdx';

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
}>;

export interface Blog {
  title: string;
  link: string;
  pubDate: string;
}

export interface BlogQuery {
  limit?: number;
  withZenn?: boolean;
}
