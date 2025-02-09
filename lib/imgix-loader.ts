import { ImageLoaderProps } from 'next/image';

export default function imgixLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = new URL(src);
  const params = url.searchParams;

  params.set('w', Math.min(width, 640).toString());
  params.set('fit', params.get('fit') || 'max');
  params.set('q', (quality || 50).toString());

  if (!src.endsWith('.gif')) {
    params.set('fm', 'webp');
  }

  return url.href;
}
