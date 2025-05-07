'use client';

import * as React from 'react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

const NavigationMenu = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
        data-testid="navigation-menu"
        {...props}
    >
        {children}
        <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
);

const NavigationMenuList = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
        data-testid="navigation-menu-list"
        {...props}
    />
);

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

const NavigationMenuTrigger = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>) => (
    <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), 'group', className)}
        data-testid="navigation-menu-trigger"
        {...props}
    >
        {children}{' '}
        <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </NavigationMenuPrimitive.Trigger>
);

const NavigationMenuContent = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
            'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-full md:absolute md:w-auto ',
            className
        )}
        data-testid="navigation-menu-content"
        {...props}
    />
);

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>) => (
    <div className={cn('absolute left-0 top-full flex justify-center')}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]',
                className
            )}
            data-testid="navigation-menu-viewport"
            ref={ref}
            {...props}
        />
    </div>
);

const NavigationMenuIndicator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
            className
        )}
        data-testid="navigation-menu-indicator"
        {...props}
    >
        <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
);

export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
};
