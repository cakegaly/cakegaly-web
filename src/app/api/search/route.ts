import { tags } from '@/config/blog';
import { getAllBlogPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const allPosts = await getAllBlogPosts();

  return NextResponse.json({
    posts: allPosts,
    tags,
  });
}
