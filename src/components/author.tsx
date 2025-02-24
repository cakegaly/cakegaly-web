import Link from 'next/link';

import BlurImage from '@/components/blur-image';
import { author } from '@/config/blog';
import { blurImageUrl } from '@/lib/utils';

export default async function Author({ imageOnly }: { imageOnly?: boolean }) {
  return imageOnly ? (
    <BlurImage
      src={author.image}
      alt={author.name}
      width={32}
      height={32}
      priority
      placeholder="blur"
      blurDataURL={await blurImageUrl(author.image!)}
      className="size-8 rounded-full transition-all group-hover:brightness-90"
    />
  ) : (
    <Link
      href={`https://twitter.com/${author.twitter}`}
      className="group flex w-max items-center space-x-2.5"
      target="_blank"
      rel="noopener noreferrer"
    >
      <BlurImage
        src={author.image}
        alt={author.name}
        width={40}
        height={40}
        priority
        placeholder="blur"
        blurDataURL={await blurImageUrl(author.image!)}
        className="size-8 rounded-full transition-all group-hover:brightness-90 md:size-10"
      />
      <div className="flex flex-col -space-y-0.5">
        <p className="font-semibold text-foreground max-md:text-sm">
          {author.name}
        </p>
        <p className="text-sm text-muted-foreground">@{author.twitter}</p>
      </div>
    </Link>
  );
}
