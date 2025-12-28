import Link from 'next/link';

import { BrandIcons } from '@/components/shared/brand-icons';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';

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
