import { RssIcon } from 'lucide-react';

import { siteConfig } from '@/lib/config';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/shared/brand-icons';

export function ProfileCard() {
  const { author, links } = siteConfig;

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <div className="flex items-center gap-4">
        <Avatar src={author.image} alt={author.name} size="lg" />
        <div className="flex flex-col gap-1">
          <span className="font-bold">{author.name}</span>
          <p className="text-on-muted text-sm">{author.bio}</p>
          <div className="flex items-center gap-1">
            <Button asChild size="icon-md" variant="ghost">
              <a href={links.x} target="_blank" rel="noopener noreferrer">
                <BrandIcons.x />
              </a>
            </Button>
            <Button asChild size="icon-md" variant="ghost">
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <BrandIcons.gitHub />
              </a>
            </Button>
            <Button asChild size="icon-md" variant="ghost">
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                <RssIcon />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
