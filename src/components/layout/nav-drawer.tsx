'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PanelBottomCloseIcon, PanelBottomOpenIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/base-ui/drawer';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={cn(
          'relative',
          buttonVariants({ variant: 'ghost', size: 'sm' })
        )}
      >
        {open ? <PanelBottomCloseIcon /> : <PanelBottomOpenIcon />}
        Menu
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHandle />
        <div className="mx-auto max-w-lg">
          <DrawerTitle className="sr-only">{siteConfig.name}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {siteConfig.author.bio}
          </DrawerDescription>
          <div className="flex flex-wrap gap-2">
            {siteConfig.navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <DrawerClose
                  key={i}
                  nativeButton={false}
                  render={(props) => (
                    <Link
                      {...props}
                      href={item.href}
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                      })}
                    >
                      <Icon />
                      {item.title}
                    </Link>
                  )}
                />
              );
            })}
          </div>
          <div className="mt-auto flex flex-col gap-2 p-4">
            <ModeSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
