import { getOGData } from '@/actions/fetch-og-metadata';
import { Suspense } from 'react';
import { LinkCard } from './link-card';

interface LinkPreviewProps {
  url: string;
}

async function LinkPreviewCard({ url }: LinkPreviewProps) {
  const ogData = await getOGData(url);

  return (
    <LinkCard
      url={url}
      title={ogData.title}
      description={ogData.description}
      image={ogData.image}
    />
  );
}

export function LinkPreview(props: LinkPreviewProps) {
  return (
    <Suspense
      fallback={
        <div className="my-4 h-[124px] animate-pulse rounded-lg border bg-muted/50" />
      }
    >
      <LinkPreviewCard {...props} />
    </Suspense>
  );
}
