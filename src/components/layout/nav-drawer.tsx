'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PanelBottomCloseIcon, PanelBottomIcon } from 'lucide-react';
import { Drawer } from 'vaul';

import { buttonVariants } from '@/components/base-ui/button';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger
        className={cn(
          'relative',
          buttonVariants({ variant: 'ghost', size: 'sm' })
        )}
      >
        {open ? <PanelBottomCloseIcon /> : <PanelBottomIcon />}
        Menu
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-overlay fixed inset-0 z-50" />
        <Drawer.Content
          className={cn(
            'bg-background fixed right-0 bottom-0 left-0 z-50',
            'mt-24 flex h-fit flex-col rounded-t-2xl outline-none'
          )}
        >
          <div className="p-4">
            <div
              aria-hidden
              className="bg-muted mx-auto mb-8 h-2 w-24 shrink-0 rounded-full"
            />
            <div className="mx-auto max-w-lg">
              <Drawer.Title className="sr-only">{siteConfig.name}</Drawer.Title>
              <Drawer.Description className="sr-only">
                {siteConfig.author.bio}
              </Drawer.Description>
              <div className="flex flex-wrap gap-2">
                {siteConfig.navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Drawer.Close key={i} onClick={() => setOpen(false)}>
                      <Link
                        href={item.href}
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                        })}
                      >
                        <Icon />
                        {item.title}
                      </Link>
                    </Drawer.Close>
                  );
                })}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
