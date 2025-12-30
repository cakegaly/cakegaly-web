import { MailIcon, RssIcon } from 'lucide-react';

import profilePic from '~/images/avatars/cakegaly.webp';

import { Avatar } from '@/components/base-ui/avatar';
import { buttonVariants } from '@/components/base-ui/button';
import { BrandIcons } from '@/components/shared/brand-icons';
import { siteConfig } from '@/lib/config';

const links = [
  {
    title: 'X (Twitter) (@cakegaly)',
    label: 'Twitter',
    href: siteConfig.links.x,
    icon: BrandIcons.x,
  },
  {
    title: 'GitHub (/cakegaly)',
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: BrandIcons.gitHub,
  },
  {
    title: 'Zenn (/cakegaly)',
    label: 'Zenn',
    href: siteConfig.links.zenn,
    icon: BrandIcons.zenn,
  },
  {
    title: 'Email (cakegaly -at- gmail -dot- com)',
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: MailIcon,
  },
  {
    title: 'RSS Feed (cakegaly -dot- com)',
    label: 'RSS',
    href: '/rss.xml',
    icon: RssIcon,
  },
];

export function ProfileCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Avatar src={profilePic.src} alt={siteConfig.author.name} size="lg" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-base font-bold">{siteConfig.author.name}</p>
          <p className="text-on-muted text-xs">{siteConfig.author.bio}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.title}
              className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </div>
  );
}
