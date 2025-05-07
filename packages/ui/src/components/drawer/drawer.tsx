'use client';

import * as React from 'react';
import { cn } from '#lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} data-testid="drawer" {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger: typeof DrawerPrimitive.Trigger = DrawerPrimitive.Trigger;

const DrawerPortal: typeof DrawerPrimitive.Portal = DrawerPrimitive.Portal;

const DrawerClose: typeof DrawerPrimitive.Close = DrawerPrimitive.Close;

const DrawerOverlay: React.FC<React.ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>> = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>) => (
    <DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props} />
);

const DrawerContent: React.FC<React.ComponentPropsWithRef<typeof DrawerPrimitive.Content>> = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Content>) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={cn(
                'bg-card fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
                className
            )}
            data-testid="drawer-content"
            {...props}
        >
            <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
);

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
        data-testid="drawer-header"
        {...props}
    />
);

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} data-testid="drawer-footer" {...props} />
);

const DrawerTitle: React.FC<React.ComponentPropsWithRef<typeof DrawerPrimitive.Title>> = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Title>) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        data-testid="drawer-title"
        {...props}
    />
);

const DrawerDescription: React.FC<React.ComponentPropsWithRef<typeof DrawerPrimitive.Description>> = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Description>) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        data-testid="drawer-description"
        {...props}
    />
);

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
