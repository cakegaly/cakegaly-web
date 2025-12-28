import { MailIcon, RssIcon } from 'lucide-react';

import profilePic from '~/images/avatars/cakegaly.webp';

import { BrandIcons } from '@/components/shared/brand-icons';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';

export function ProfileCard() {
  const { author, links } = siteConfig;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Avatar src={profilePic.src} alt={author.name} size="lg" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-base font-bold">{author.name}</p>
          <p className="text-on-muted text-xs">{author.bio}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button asChild size="icon-sm" variant="ghost">
          <a
            href={links.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            title="X (Twitter) (@cakegaly)"
          >
            <BrandIcons.x />
          </a>
        </Button>
        <Button asChild size="icon-sm" variant="ghost">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub (/cakegaly)"
          >
            <BrandIcons.gitHub />
          </a>
        </Button>
        <Button asChild size="icon-sm" variant="ghost">
          <a
            href={`mailto:${siteConfig.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email (cakegaly -at- gmail -dot- com)"
          >
            <MailIcon />
          </a>
        </Button>
        <Button asChild size="icon-sm" variant="ghost">
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS"
            title="RSS Feed (cakegaly -dot- com)"
          >
            <RssIcon />
          </a>
        </Button>
      </div>
    </div>
  );
}
