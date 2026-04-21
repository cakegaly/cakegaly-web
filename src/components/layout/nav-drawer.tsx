'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { PanelBottomCloseIcon, PanelBottomOpenIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';
import { ModeSwitcher } from '@/components/shared/mode-switcher';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={setOpen}>
      <DrawerPrimitive.Trigger
        className={cn(
          'relative',
          buttonVariants({ variant: 'ghost', size: 'sm' })
        )}
      >
        {open ? <PanelBottomCloseIcon /> : <PanelBottomOpenIcon />}
        Menu
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Backdrop className="bg-overlay fixed inset-0 z-50" />
        <DrawerPrimitive.Viewport className="fixed inset-0 z-50">
          <DrawerPrimitive.Popup
            className={cn(
              'bg-background fixed right-0 bottom-0 left-0',
              'mt-24 flex h-fit flex-col rounded-t-2xl outline-none'
            )}
          >
            <div className="p-4">
              <div
                aria-hidden
                className="bg-muted mx-auto mb-8 h-2 w-24 shrink-0 rounded-full"
              />
              <div className="mx-auto max-w-lg">
                <DrawerPrimitive.Title className="sr-only">
                  {siteConfig.name}
                </DrawerPrimitive.Title>
                <DrawerPrimitive.Description className="sr-only">
                  {siteConfig.author.bio}
                </DrawerPrimitive.Description>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.navItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <DrawerPrimitive.Close
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
            </div>
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
