'use client';

import * as React from 'react';
import { Menubar as MenubarPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Check, ChevronRight, Circle } from 'lucide-react';

const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof MenubarPrimitive.Root>) => (
    <MenubarPrimitive.Root
        ref={ref}
        className={cn('bg-card flex h-10 items-center space-x-1 rounded-md border p-1', className)}
        data-testid="menubar"
        {...props}
    />
);

const MenubarTrigger = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof MenubarPrimitive.Trigger>) => (
    <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none',
            className
        )}
        data-testid="menubar-trigger"
        {...props}
    />
);

const MenubarSubTrigger = ({
    ref,
    className,
    inset,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) => (
    <MenubarPrimitive.SubTrigger
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
            inset && 'pl-8',
            className
        )}
        data-testid="menubar-sub-trigger"
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
);

const MenubarSubContent = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.SubContent>) => (
    <MenubarPrimitive.SubContent
        ref={ref}
        className={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1',
            className
        )}
        data-testid="menubar-sub-content"
        {...props}
    />
);

const MenubarContent = ({
    ref,
    className,
    align = 'start',
    alignOffset = -4,
    sideOffset = 8,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.Content>) => (
    <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
            ref={ref}
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md',
                className
            )}
            data-testid="menubar-content"
            {...props}
        />
    </MenubarPrimitive.Portal>
);

const MenubarItem = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.Item> & { inset?: boolean }) => (
    <MenubarPrimitive.Item
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            className
        )}
        data-testid="menubar-item"
        {...props}
    />
);

const MenubarCheckboxItem = ({
    ref,
    className,
    children,
    checked,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.CheckboxItem>) => (
    <MenubarPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        checked={checked}
        data-testid="menubar-checkbox-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
    </MenubarPrimitive.CheckboxItem>
);

const MenubarRadioItem = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.RadioItem>) => (
    <MenubarPrimitive.RadioItem
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        data-testid="menubar-radio-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
    </MenubarPrimitive.RadioItem>
);

const MenubarLabel = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.Label> & { inset?: boolean }) => (
    <MenubarPrimitive.Label
        ref={ref}
        className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
        data-testid="menubar-label"
        {...props}
    />
);

const MenubarSeparator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive.Separator>) => (
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn('bg-muted -mx-1 my-1 h-px', className)}
        data-testid="menubar-separator"
        {...props}
    />
);

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
            data-testid="menubar-shortcut"
            {...props}
        />
    );
};

export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarLabel,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarPortal,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarGroup,
    MenubarSub,
    MenubarShortcut,
};
