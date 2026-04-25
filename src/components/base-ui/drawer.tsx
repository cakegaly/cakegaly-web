'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ className, ...props }: DrawerPrimitive.Trigger.Props) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      className={className}
      {...props}
    />
  );
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        '[--backdrop-opacity:0.2] dark:[--backdrop-opacity:0.7]',
        'fixed inset-0 z-50 min-h-dvh bg-black',
        'opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]',
        'transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'data-swiping:duration-0',
        'data-starting-style:opacity-0',
        'data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]',
        className
      )}
      {...props}
    />
  );
}

const drawerContentVariants = cva('', {
  variants: {
    side: {
      bottom: cn(
        'inset-x-0 bottom-0 rounded-t-2xl',
        '-mb-[var(--bleed)] max-h-[calc(80vh+var(--bleed))]',
        'pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--bleed))]',
        '[transform:translateY(var(--drawer-swipe-movement-y))]',
        'data-[starting-style]:[transform:translateY(calc(100%-var(--bleed)+2px))]',
        'data-[ending-style]:[transform:translateY(calc(100%-var(--bleed)+2px))]'
      ),
      top: cn(
        'inset-x-0 top-0 rounded-b-2xl',
        '-mt-[var(--bleed)] max-h-[calc(80vh+var(--bleed))]',
        'pt-[calc(1.5rem+env(safe-area-inset-top,0px)+var(--bleed))]',
        '[transform:translateY(var(--drawer-swipe-movement-y))]',
        'data-[starting-style]:[transform:translateY(calc(-100%+var(--bleed)-2px))]',
        'data-[ending-style]:[transform:translateY(calc(-100%+var(--bleed)-2px))]'
      ),
      left: cn(
        'inset-y-0 left-0 rounded-r-2xl',
        '-ml-[var(--bleed)] w-[calc(20rem+var(--bleed))] max-w-[calc(100vw-3rem+var(--bleed))]',
        'pl-[calc(1.5rem+var(--bleed))]',
        '[transform:translateX(var(--drawer-swipe-movement-x))]',
        'data-[starting-style]:[transform:translateX(calc(-100%+var(--bleed)-2px))]',
        'data-[ending-style]:[transform:translateX(calc(-100%+var(--bleed)-2px))]'
      ),
      right: cn(
        'inset-y-0 right-0 rounded-l-2xl',
        '-mr-[var(--bleed)] w-[calc(20rem+var(--bleed))] max-w-[calc(100vw-3rem+var(--bleed))]',
        'pr-[calc(1.5rem+var(--bleed))]',
        '[transform:translateX(var(--drawer-swipe-movement-x))]',
        'data-[starting-style]:[transform:translateX(calc(100%-var(--bleed)+2px))]',
        'data-[ending-style]:[transform:translateX(calc(100%-var(--bleed)+2px))]'
      ),
    },
  },
  defaultVariants: {
    side: 'bottom',
  },
});

const drawerViewportVariants = cva('fixed inset-0 z-50 flex', {
  variants: {
    side: {
      bottom: 'items-end justify-center',
      top: 'items-start justify-center',
      left: 'items-stretch justify-start',
      right: 'items-stretch justify-end',
    },
  },
  defaultVariants: {
    side: 'bottom',
  },
});

function DrawerContent({
  className,
  side = 'bottom',
  children,
  ...props
}: DrawerPrimitive.Popup.Props & VariantProps<typeof drawerContentVariants>) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className={drawerViewportVariants({ side })}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            '[--bleed:3rem]',
            'bg-background w-full',
            'px-6 pt-4',
            'touch-auto overflow-y-auto overscroll-contain',
            'transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
            'data-[swiping]:select-none',
            'data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]',
            drawerContentVariants({ side }),
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-on-muted text-sm', className)}
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      className={className}
      {...props}
    />
  );
}

function DrawerHandle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden
      data-slot="drawer-handle"
      className={cn(
        'bg-muted mx-auto mb-8 h-2 w-24 shrink-0 rounded-full',
        className
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  drawerContentVariants,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
