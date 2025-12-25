import Link from 'next/link';

import { Button } from '@/components/base-ui/button';
import { BrandIcons } from '@/components/shared/brand-icons';
import { siteConfig } from '@/lib/config';

export function GitHubLink() {
  return (
    <Button
      size="icon-md"
      variant="ghost"
      render={
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        />
      }
      nativeButton={false}
    >
      <BrandIcons.gitHub />
    </Button>
  );
}
