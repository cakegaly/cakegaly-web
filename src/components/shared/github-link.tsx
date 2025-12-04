import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { BrandIcons } from '@/components/shared/brand-icons';
import { Button } from '@/components/ui/button';

export function GitHubLink() {
  return (
    <Button asChild size="icon-md" variant="ghost">
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <BrandIcons.gitHub />
      </Link>
    </Button>
  );
}
